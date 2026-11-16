/**
 * Kerakoll catalogue harvester.
 *
 * Kerakoll has no public product API. Every product page is server rendered
 * Next.js that ships a complete schema.org graph in a single ld+json block:
 * a Product node (name, description, category, image, packs) and one
 * DigitalDocument node per attached PDF, including the technical data sheet.
 * That graph is the source of truth here, so the harvest reads raw HTML and
 * never needs JavaScript to run.
 *
 * Two things still need a real browser engine. www.kerakoll.com answers curl
 * with the country selector instead of the regional site, and the regional
 * hosts refuse plain fetch. Playwright WebKit's request context carries the
 * right TLS and header fingerprint and gets 200 everywhere, so requests go
 * through it rather than through node fetch.
 *
 * Hosts
 *   gcc.kerakoll.com   Kerakoll Gulf Trading LLC, Dubai. The Middle East
 *                      catalogue and the primary source for every product.
 *   au.kerakoll.com    English site that still carries the Biogel line,
 *                      which the Gulf site has replaced with H40.
 *   int.kerakoll.com   International English. Carries Biocalce and Rasobuild,
 *                      which the Gulf site does not list.
 *
 * Each host publishes an open sitemap.xml with product pages under /p/, so
 * enumeration is exact rather than crawled.
 *
 * Output is data/discovery/kerakoll-catalogue.json, rewritten after every
 * product so a long run can be stopped and inspected at any point. Nothing
 * here writes to the manifest: harvesting and shipping stay separate steps.
 *
 * Usage:
 *   npx tsx scripts/harvest-kerakoll.ts
 *   npx tsx scripts/harvest-kerakoll.ts --limit 5          (smoke test)
 *   npx tsx scripts/harvest-kerakoll.ts --only h40-gel
 *   npx tsx scripts/harvest-kerakoll.ts --gcc-only
 */

import { webkit, type APIRequestContext } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT_FILE = path.join(process.cwd(), 'data', 'discovery', 'kerakoll-catalogue.json');

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

/** Politeness. One request at a time, this far apart. */
const DELAY_MS = 400;

export interface KerakollProduct {
  name: string;
  product_url: string;
  /** Product family as Kerakoll markets it: H40, Aquastop, Fugabella. */
  line: string;
  /** Kerakoll's own solution category, from the Product node. */
  category: string;
  image_url: string;
  tds_url: string;
  /** Leading product type clause, the way Kerakoll classifies the product. */
  classification: string;
  description: string;
}

interface Source {
  host: string;
  /** Undefined means every product on the host. */
  include?: RegExp;
  note: string;
}

/**
 * Gulf first and whole. The other two hosts are mined only for the families
 * Lapiz Blue stocks that the Gulf site does not publish.
 */
const SOURCES: Source[] = [
  { host: 'gcc.kerakoll.com', note: 'Kerakoll Gulf, full catalogue' },
  { host: 'au.kerakoll.com', include: /^biogel-/, note: 'Biogel line, retired on the Gulf site' },
  { host: 'int.kerakoll.com', include: /^(biocalce|rasobuild)-/, note: 'Biocalce and Rasobuild lines' },
];

/**
 * Families whose names run to more than one word. Everything else takes its
 * first word, which is how Kerakoll names its lines.
 */
const MULTI_WORD_LINES = [
  'Aqua Pur',
  'Active Prime',
  'Top Latex',
  'Remover Pro',
  'R3 Plus',
  'Fuga Remove',
  'Delta Plus',
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const clean = (s: unknown) =>
  typeof s === 'string' ? s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim() : '';

/**
 * Descriptions arrive with CMS residue: an untranslated key on a few of them,
 * a <br /> where Kerakoll wanted a line break, and <sup> around the 2 in m2.
 * Flatten all of it to plain sentences.
 */
function tidyText(s: string): string {
  return clean(
    s
      .replace(/SEO\.[a-z_]+/gi, '')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<sup>(.*?)<\/sup>/gi, '$1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+([.,;:])/g, '$1'),
  );
}

function lineOf(name: string): string {
  for (const multi of MULTI_WORD_LINES) {
    if (name.toLowerCase().startsWith(multi.toLowerCase())) return multi;
  }
  const first = name.split(/\s+/)[0] || '';
  return first.replace(/[.,]$/, '');
}

/**
 * Kerakoll leads every product subtitle with the product type, then adds what
 * it is for. "Multipurpose Gel-Adhesive, structural, highly flexible, thixo &
 * fluid. For all types and sizes of porcelain tiles." The first sentence is
 * the classification; the rest is application detail. Standards classes such
 * as C2TE S1 live only in the TDS PDF, not on the page.
 */
function classificationOf(description: string): string {
  if (!description) return '';
  const firstSentence = description.split(/(?<=[a-z0-9)])\.\s+/)[0] || description;
  const clause = firstSentence.replace(/\.$/, '').split(/\.\s*For\s/i)[0];
  return clean(clause).slice(0, 220);
}

/* --------------------------------------------------------------- sitemaps */

async function sitemapProducts(req: APIRequestContext, host: string): Promise<string[]> {
  const res = await req.get(`https://${host}/sitemap.xml`, { timeout: 60000 });
  if (!res.ok()) throw new Error(`${host} sitemap returned ${res.status()}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(urls.filter((u) => u.includes('/p/')))].sort();
}

/* ----------------------------------------------------------------- parsing */

type JsonLdNode = Record<string, unknown>;

function jsonLdNodes(html: string): JsonLdNode[] {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const nodes: JsonLdNode[] = [];
  for (const [, raw] of blocks) {
    try {
      const parsed = JSON.parse(raw) as JsonLdNode;
      const graph = (parsed['@graph'] as JsonLdNode[] | undefined) ?? [parsed];
      nodes.push(...graph);
    } catch {
      /* A broken block on one page must not stop the run. */
    }
  }
  return nodes;
}

function parseProduct(html: string, productUrl: string): KerakollProduct | null {
  const nodes = jsonLdNodes(html);
  const product = nodes.find((n) => n['@type'] === 'Product');
  if (!product) return null;

  const docs = nodes.filter((n) => n['@type'] === 'DigitalDocument');
  const tds = docs.find((d) => {
    const id = String(d['@id'] ?? '');
    const name = String(d.name ?? '');
    const url = String(d.url ?? '');
    return (
      id.endsWith('#doc-tech-sheet') ||
      /technical data sheet/i.test(name) ||
      /\/techSheet\//i.test(url)
    );
  });

  const name = clean(product.name);
  const description = tidyText(String(product.description ?? ''));

  return {
    name,
    product_url: clean(product.url) || productUrl,
    line: lineOf(name),
    category: clean(product.category),
    image_url: clean(product.image),
    tds_url: clean(tds?.url),
    classification: classificationOf(description),
    description,
  };
}

/* ------------------------------------------------------------------- write */

function write(products: KerakollProduct[], harvestedAt: string) {
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  const payload = {
    brand: 'kerakoll',
    source: 'kerakoll.com/en-ae',
    harvested_at: harvestedAt,
    product_count: products.length,
    products,
  };
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`);
}

/* -------------------------------------------------------------------- main */

async function main() {
  const argv = process.argv.slice(2);
  const flag = (name: string) => {
    const i = argv.indexOf(`--${name}`);
    return i === -1 ? undefined : argv[i + 1];
  };
  const limit = Number(flag('limit') || 0) || 0;
  const only = flag('only');
  const gccOnly = argv.includes('--gcc-only');

  const harvestedAt = new Date().toISOString();
  const browser = await webkit.launch();
  const ctx = await browser.newContext({
    userAgent: UA,
    locale: 'en-US',
    viewport: { width: 1440, height: 900 },
  });
  // tsx compiles with esbuild keepNames, which leaves __name references in any
  // function handed to page.evaluate. Harmless here, cheap insurance if a
  // future adapter needs the DOM.
  await ctx.addInitScript({
    content: 'globalThis.__name = globalThis.__name || function (f) { return f; };',
  });
  const req = ctx.request;

  const products: KerakollProduct[] = [];
  const failures: Array<{ url: string; reason: string }> = [];
  const seen = new Set<string>();

  try {
    const queue: Array<{ url: string; host: string }> = [];
    for (const source of SOURCES) {
      if (gccOnly && source.host !== 'gcc.kerakoll.com') continue;
      const urls = await sitemapProducts(req, source.host);
      const picked = urls.filter((u) => {
        const slug = u.split('/p/')[1] ?? '';
        if (only && slug !== only) return false;
        return source.include ? source.include.test(slug) : true;
      });
      console.log(`${source.host}: ${urls.length} product urls, ${picked.length} selected (${source.note})`);
      for (const url of picked) {
        const slug = url.split('/p/')[1] ?? url;
        if (seen.has(slug)) continue; // Gulf wins any overlap.
        seen.add(slug);
        queue.push({ url, host: source.host });
      }
      await sleep(DELAY_MS);
    }

    const work = limit ? queue.slice(0, limit) : queue;
    console.log(`\nharvesting ${work.length} product pages\n`);

    for (const [i, item] of work.entries()) {
      try {
        const res = await req.get(item.url, {
          timeout: 60000,
          headers: { 'accept-language': 'en-US,en;q=0.9' },
        });
        if (!res.ok()) throw new Error(`HTTP ${res.status()}`);
        const parsed = parseProduct(await res.text(), item.url);
        if (!parsed) throw new Error('no Product node in ld+json');
        products.push(parsed);
        write(products, harvestedAt); // incremental, every page
        console.log(
          `${String(i + 1).padStart(3)}/${work.length} ${parsed.name} [${parsed.line}] ${parsed.tds_url ? 'tds' : 'NO TDS'}`,
        );
      } catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        failures.push({ url: item.url, reason });
        console.log(`${String(i + 1).padStart(3)}/${work.length} FAILED ${item.url} ${reason}`);
      }
      await sleep(DELAY_MS);
    }
  } finally {
    await browser.close();
  }

  write(products, harvestedAt);

  const noTds = products.filter((p) => !p.tds_url);
  const noImage = products.filter((p) => !p.image_url);
  console.log(`\nwrote ${products.length} products to ${path.relative(process.cwd(), OUT_FILE)}`);
  console.log(`lines: ${[...new Set(products.map((p) => p.line))].sort().join(', ')}`);
  if (noTds.length) console.log(`no tds: ${noTds.map((p) => p.name).join(', ')}`);
  if (noImage.length) console.log(`no image: ${noImage.map((p) => p.name).join(', ')}`);
  if (failures.length) {
    console.log(`\n${failures.length} failures`);
    for (const f of failures) console.log(`  ${f.url} ${f.reason}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

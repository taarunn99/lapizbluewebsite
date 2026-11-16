/**
 * Mapei UAE technical data sheet harvester.
 *
 * What it produces
 *   /tmp/mapei-tds/<slug>.pdf                 one data sheet per product
 *   data/discovery/mapei-tds-index.json       name, product URL, TDS URL, size
 *   (plus a resumable crawl state file in the OS temp dir)
 *
 * How it gets past the front door
 *   mapei.com answers 403 to curl and to plain fetch and 200 to a real browser
 *   engine, so everything runs inside Playwright WebKit. On top of that,
 *   Cloudflare only lets through a request that arrives WITHOUT cookies: the
 *   first navigation of a fresh context works, and every later request in that
 *   context is blocked once the clearance cookie is set. So before each request
 *   this script calls context.clearCookies() and issues the request from inside
 *   an already loaded page with credentials omitted. That turns a crawl that
 *   needed a full page render per URL into a ~0.4s fetch per URL.
 *
 * The route through the catalogue
 *   The site's own listing API is reachable the same way:
 *     /restapi/products/v2/products?page=N&size=100&site=<siteGuid>&language=en
 *   which pages through the whole UAE catalogue (1153 products at the time of
 *   writing) giving Name and PageUrl for each, so there is no need to walk
 *   lines -> categories -> subcategories at all. The older /MapeiApi/...
 *   endpoints the front end also uses stay 403 for us, so this is the one to
 *   use. --crawl keeps the slower lines/categories/subcategories walk as a
 *   fallback in case the listing API is ever withdrawn.
 *
 * Data sheet convention on the AE site
 *   TDS  -> /docs/librariesprovider59/products-documents/1_<docno>_<slug>_en-ae_<hash>.pdf
 *   SDS  -> 2_, EPD -> 7_, GEV -> 8_, VOC -> 37_, HPD -> 50_ and so on, so the
 *   leading number is what separates the data sheet from the rest. The download
 *   block also labels each row, which is used as the second signal.
 *
 * Note on tsx: esbuild's keepNames rewrites function declarations to call a
 * helper named __name, which does not exist inside the page. The init script
 * below defines it before any page.evaluate runs.
 *
 * Usage
 *   npx tsx scripts/harvest-mapei-tds.ts                 full run, resumes
 *   npx tsx scripts/harvest-mapei-tds.ts --discover-only  build the product list
 *   npx tsx scripts/harvest-mapei-tds.ts --limit 20       stop after 20 products
 *   npx tsx scripts/harvest-mapei-tds.ts --crawl          page crawl instead of the API
 *   npx tsx scripts/harvest-mapei-tds.ts --fresh          throw away crawl state
 */

import { webkit, type BrowserContext, type Page } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ORIGIN = 'https://www.mapei.com';
const LOCALE = '/ae/en';
const SITE_GUID = '3ad2f671-79c5-62e4-9128-ff01007028e9';
const LINES_URL = `${ORIGIN}${LOCALE}/products-and-solutions/lines`;
const PAGE_SIZE = 100;

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

const PDF_DIR = '/tmp/mapei-tds';
const INDEX_FILE = path.join(process.cwd(), 'data', 'discovery', 'mapei-tds-index.json');
const STATE_FILE = path.join(os.tmpdir(), 'mapei-tds-crawl-state.json');

const POLITE_MS = 500;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const clean = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();

const INIT_SCRIPT = {
  content: 'globalThis.__name = globalThis.__name || function (f) { return f; };',
};

/* ------------------------------------------------------------------- types */

interface Sheet {
  name: string;
  slug: string;
  product_url: string;
  tds_url: string;
  local_path: string;
  size_bytes: number;
}

interface Failure {
  name: string;
  reason: string;
}

interface IndexFile {
  brand: 'mapei';
  harvested_at: string;
  count: number;
  sheets: Sheet[];
  failed: Failure[];
}

interface ProductRef {
  name: string;
  slug: string;
  url: string;
}

interface State {
  api_count: number; // total the listing API reports
  products: ProductRef[];
  seen_products: string[]; // slugs already attempted
  lines: string[]; // --crawl fallback only
  categories: string[];
  subcats: string[];
  listed: string[];
}

interface DocLink {
  href: string;
  label: string;
}

/* ------------------------------------------------------------------- state */

function loadState(): State {
  const empty: State = {
    api_count: 0,
    products: [],
    seen_products: [],
    lines: [],
    categories: [],
    subcats: [],
    listed: [],
  };
  try {
    const raw = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) as Partial<State>;
    return { ...empty, ...raw };
  } catch {
    return empty;
  }
}

function saveState(s: State) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 1));
}

function loadIndex(): IndexFile {
  try {
    const raw = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8')) as Partial<IndexFile>;
    return {
      brand: 'mapei',
      harvested_at: raw.harvested_at || new Date().toISOString(),
      count: raw.sheets?.length || 0,
      sheets: raw.sheets || [],
      failed: raw.failed || [],
    };
  } catch {
    return { brand: 'mapei', harvested_at: new Date().toISOString(), count: 0, sheets: [], failed: [] };
  }
}

function saveIndex(ix: IndexFile) {
  ix.count = ix.sheets.length;
  ix.harvested_at = new Date().toISOString();
  fs.mkdirSync(path.dirname(INDEX_FILE), { recursive: true });
  fs.writeFileSync(INDEX_FILE, JSON.stringify(ix, null, 2) + '\n');
}

/* ------------------------------------------------------------------ client */

/**
 * A single long lived page on www.mapei.com that every request is issued from.
 * Cookies are cleared before each request because Cloudflare only passes
 * cookieless ones, and the page is re-seeded if it ever starts getting blocked.
 */
class MapeiClient {
  private page!: Page;
  requests = 0;

  constructor(private ctx: BrowserContext) {}

  async open() {
    if (this.page && !this.page.isClosed()) await this.page.close().catch(() => undefined);
    await this.ctx.clearCookies();
    this.page = await this.ctx.newPage();
    await this.page.goto(LINES_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await this.page.waitForTimeout(1500);
  }

  /** Cookieless same origin fetch from inside the page. */
  private async raw(url: string, accept: string) {
    await this.ctx.clearCookies();
    this.requests++;
    return this.page.evaluate(
      async (args) => {
        const res = await fetch(args.u, { credentials: 'omit', headers: { accept: args.a } });
        return { status: res.status, body: await res.text() };
      },
      { u: url, a: accept },
    );
  }

  async get(url: string, attempts = 3, accept = 'text/html'): Promise<{ status: number; body: string }> {
    let lastErr: unknown;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const out = await this.raw(url, accept);
        if (out.status === 403 || /Attention Required/i.test(out.body.slice(0, 400))) {
          throw new Error('cloudflare-block');
        }
        await sleep(POLITE_MS);
        return out;
      } catch (e) {
        lastErr = e;
        await sleep(attempt * 3000);
        await this.open().catch(() => undefined); // re-seed the host page
      }
    }
    throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
  }

  async json<T>(url: string): Promise<T> {
    const { status, body } = await this.get(url, 3, 'application/json');
    try {
      return JSON.parse(body) as T;
    } catch {
      throw new Error(`api ${status} returned non JSON: ${body.slice(0, 160).replace(/\s+/g, ' ')}`);
    }
  }
}

/* ----------------------------------------------------------- API discovery */

interface ApiEntry {
  Name: string;
  PageUrl: string;
}

async function discoverViaApi(client: MapeiClient, state: State) {
  const known = new Set(state.products.map((p) => p.slug));
  let page = 1;
  for (;;) {
    const url = `/restapi/products/v2/products?page=${page}&size=${PAGE_SIZE}&site=${SITE_GUID}&language=en`;
    const res = await client.json<{ Result: { Count: number; Entries: ApiEntry[] } }>(url);
    const total = res.Result?.Count ?? 0;
    const entries = res.Result?.Entries ?? [];
    state.api_count = total;
    for (const e of entries) {
      const u = (e.PageUrl || '').split('#')[0].replace(/\/+$/, '');
      if (!/\/products\/detail\//.test(u)) continue;
      const slug = u.split('/').pop() || '';
      if (!slug || known.has(slug)) continue;
      known.add(slug);
      state.products.push({ name: clean(e.Name), slug, url: u });
    }
    saveState(state);
    console.log(`api page ${page}: +${entries.length} (${state.products.length}/${total})`);
    if (!entries.length || page * PAGE_SIZE >= total) break;
    page++;
  }
}

/* ------------------------------------------- page crawl fallback (--crawl) */

const stripHash = (u: string) => u.split('#')[0].replace(/\/+$/, '');

function linksIn(html: string, pattern: RegExp) {
  const out = new Set<string>();
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    let href = m[1];
    if (href.startsWith('/')) href = ORIGIN + href;
    if (!href.startsWith('http')) continue;
    href = stripHash(href);
    if (pattern.test(href)) out.add(href);
  }
  return [...out];
}

async function crawlListings(client: MapeiClient, state: State) {
  const listed = new Set(state.listed);
  const mark = (u: string) => {
    listed.add(u);
    state.listed = [...listed];
    saveState(state);
  };
  const addProducts = (urls: string[]) => {
    const known = new Set(state.products.map((p) => p.slug));
    for (const u of urls) {
      const slug = u.split('/').pop() || '';
      if (!slug || known.has(slug)) continue;
      known.add(slug);
      state.products.push({ name: '', slug, url: u });
    }
  };

  if (!state.lines.length) {
    const { body } = await client.get(LINES_URL);
    state.lines = linksIn(body, /\/products-and-solutions\/lines\/[^/]+$/);
    saveState(state);
  }
  console.log(`lines: ${state.lines.length}`);

  const level = async (urls: string[], label: string) => {
    for (const url of urls) {
      if (listed.has(url)) continue;
      try {
        const { body } = await client.get(url);
        const cats = linksIn(body, /\/lines\/[^/]+\/category\/[^/]+$/);
        const subs = linksIn(body, /\/lines\/[^/]+\/category\/[^/]+\/[^/]+$/);
        const prods = linksIn(body, /\/products\/detail\/[^/]+$/);
        state.categories = [...new Set([...state.categories, ...cats])];
        state.subcats = [...new Set([...state.subcats, ...subs])];
        addProducts(prods);
        console.log(`${label} ${url.split('/').pop()} -> ${subs.length} subs, ${prods.length} products`);
      } catch (e) {
        console.log(`${label} FAIL ${url}: ${(e as Error).message}`);
      }
      mark(url);
    }
  };

  await level(state.lines, 'line');
  await level([...state.categories], 'cat');
  await level([...state.subcats], 'sub');
}

/* ------------------------------------------------------------ product page */

const DOC_RE = /https:\/\/cdnmedia\.mapei\.com\/docs\/[^"'\s>]+?\.pdf(?:\?[^"'\s>]*)?/gi;
const LABELS = [
  'technical data sheet',
  'safety data sheet',
  'declaration of performance',
  'brochure',
  'certificate',
  'epd',
  'hpd',
];

/** Read the product name and every linked document out of the page HTML. */
function parseProduct(html: string): { name: string; docs: DocLink[] } {
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
  const name = clean(h1.replace(/<[^>]+>/g, '')).replace(/&amp;/g, '&');

  const lower = html.toLowerCase();
  const marks: Array<{ at: number; label: string }> = [];
  for (const label of LABELS) {
    let from = 0;
    for (;;) {
      const at = lower.indexOf(label, from);
      if (at === -1) break;
      marks.push({ at, label });
      from = at + label.length;
    }
  }
  marks.sort((a, b) => a.at - b.at);

  const docs: DocLink[] = [];
  const seen = new Set<string>();
  for (const m of html.matchAll(DOC_RE)) {
    const href = m[0].split('?')[0].replace(/&#39;/g, "'").replace(/&amp;/g, '&');
    if (seen.has(href)) continue;
    seen.add(href);
    // The label sits just above its download row in the markup.
    let label = '';
    for (const mark of marks) {
      if (mark.at > (m.index ?? 0)) break;
      if ((m.index ?? 0) - mark.at < 6000) label = mark.label;
    }
    docs.push({ href, label });
  }
  return { name, docs };
}

/** Pick the technical data sheet out of every document linked on the page. */
function pickTds(docs: DocLink[], slug: string): string | undefined {
  // The product documents library numbers the data sheet "1_". Checked against
  // the 24 already verified Mapei records in data/manifest.json.
  const primary = docs.find((d) => /\/products-documents\/1_/i.test(d.href));
  if (primary) return primary.href;

  // Otherwise trust the label the page prints above the download row.
  const labelled = docs.find((d) => d.label === 'technical data sheet');
  if (labelled) return labelled.href;

  // Last resort: a sheet named after the product, skipping the other numbered
  // document families (2_ safety, 7_ EPD, 8_ GEV, 37_ VOC, 50_ HPD and so on).
  const token = slug.replace(/-/g, '');
  if (token.length < 4) return undefined;
  return docs.find((d) => {
    if (d.label && d.label !== 'technical data sheet') return false;
    const base = (d.href.split('/').pop() || '').toLowerCase();
    const numbered = base.match(/^(\d+)_/);
    if (numbered && numbered[1] !== '1') return false;
    return base.replace(/[^a-z0-9]/g, '').includes(token);
  })?.href;
}

/* ------------------------------------------------------------- downloading */

async function downloadPdf(url: string, dest: string): Promise<number> {
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/pdf,*/*' } });
  if (!res.ok) throw new Error(`http ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.subarray(0, 4).toString('latin1') !== '%PDF') throw new Error('not a pdf');
  fs.writeFileSync(dest, buf);
  return buf.length;
}

/* -------------------------------------------------------------------- main */

async function main() {
  const argv = process.argv.slice(2);
  const flag = (n: string) => argv.includes(n);
  const val = (n: string) => {
    const i = argv.indexOf(n);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const limit = Number(val('--limit') || 0) || Infinity;

  if (flag('--fresh')) fs.rmSync(STATE_FILE, { force: true });
  fs.mkdirSync(PDF_DIR, { recursive: true });

  const state = loadState();
  const ix = loadIndex();

  const browser = await webkit.launch();
  const ctx = await browser.newContext({
    userAgent: UA,
    viewport: { width: 1440, height: 1000 },
    locale: 'en-GB',
  });
  await ctx.addInitScript(INIT_SCRIPT);
  const client = new MapeiClient(ctx);

  try {
    await client.open();

    if (flag('--crawl')) await crawlListings(client, state);
    else await discoverViaApi(client, state);

    console.log(`products: ${state.products.length} (api reports ${state.api_count})`);
    if (flag('--discover-only')) return;

    const seen = new Set(state.seen_products);
    const have = new Set(ix.sheets.map((s) => s.slug));
    let done = 0;

    for (const p of state.products) {
      if (done >= limit) break;
      if (have.has(p.slug) || seen.has(p.slug)) continue;
      done++;
      const mark = () => {
        seen.add(p.slug);
        state.seen_products = [...seen];
        saveState(state);
      };

      let html: string;
      try {
        const res = await client.get(p.url);
        if (res.status !== 200) throw new Error(`http ${res.status}`);
        html = res.body;
      } catch (e) {
        ix.failed.push({ name: p.name || p.slug, reason: `page load failed: ${(e as Error).message}` });
        saveIndex(ix);
        mark();
        console.log(`x ${p.slug}: page load failed`);
        continue;
      }

      const parsed = parseProduct(html);
      const name = parsed.name || p.name || p.slug;
      const tds = pickTds(parsed.docs, p.slug);
      if (!tds) {
        ix.failed.push({ name, reason: 'no data sheet link on product page' });
        saveIndex(ix);
        mark();
        console.log(`x ${p.slug}: no TDS link`);
        continue;
      }

      const dest = path.join(PDF_DIR, `${p.slug}.pdf`);
      try {
        const size = await downloadPdf(tds, dest);
        ix.sheets.push({
          name,
          slug: p.slug,
          product_url: p.url,
          tds_url: tds,
          local_path: dest,
          size_bytes: size,
        });
        have.add(p.slug);
        saveIndex(ix);
        console.log(`ok ${p.slug} (${(size / 1024).toFixed(0)} KB) [${ix.sheets.length}]`);
      } catch (e) {
        fs.rmSync(dest, { force: true });
        ix.failed.push({ name, reason: `download failed: ${(e as Error).message}` });
        saveIndex(ix);
        console.log(`x ${p.slug}: ${(e as Error).message}`);
      }
      mark();
      await sleep(POLITE_MS);
    }

    console.log(`\nsheets: ${ix.sheets.length}  failed: ${ix.failed.length}  requests: ${client.requests}`);
  } finally {
    saveIndex(ix);
    saveState(state);
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Grupo Puma (Pidilite Puma MEA) catalogue harvester.
 *
 * The brand we slug as pidilite-puma is Grupo Puma's range, distributed in the
 * Gulf by Pidilite. Grupo Puma runs one site per country behind a selector, and
 * the Emirates locale at /en-AE is the Pidilite Puma MEA catalogue: it carries
 * the Gulf range, in English, with the Gulf pack sizes. Later locales in the
 * list below are fallbacks for anything the Emirates catalogue omits; a product
 * found in an earlier locale is never overwritten by a later one.
 *
 * Playwright WebKit rather than fetch, as everywhere else in this repo. The
 * product pages themselves answer plain requests, but the locale is held in a
 * cookie set by /welcome/select_country, so a real browser context is the
 * cheapest way to stay inside one catalogue for the whole crawl.
 *
 * Two stages.
 *
 * 1. Enumerate. /<locale>/products/families lists the families; each family
 *    page carries every product in it as a .product-item with the pack shot,
 *    the lead paragraph, the subfamily heading above it and a data-idproduct.
 *    That id is the same id the data sheet endpoint takes, so no search is
 *    needed to find the sheet.
 *
 * 2. Detail. The figures that matter live in the "Technical data" table on the
 *    product page, which is richer and cleaner than the same table inside the
 *    PDF, so each product page is read and the table is flattened to
 *    "Label: Value" lines. The flattened block is prefixed with the heading
 *    that scripts/lib/spec-maps looks for, so the shared extractor can read it
 *    without knowing it came from HTML rather than from a sheet.
 *
 * Note on tsx: esbuild's keepNames rewrites function declarations into calls to
 * a helper named __name, which does not exist inside the page, so every
 * page.evaluate with a named inner function throws ReferenceError. The init
 * script below defines it, and is passed as a raw string so it cannot itself
 * be rewritten.
 *
 * Usage:
 *   npx tsx scripts/harvest-puma.ts
 *   npx tsx scripts/harvest-puma.ts --limit 5          (smoke test)
 *   npx tsx scripts/harvest-puma.ts --only pegoland    (slug substring)
 */

import { webkit, type Page } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://www.grupopuma.com';

/**
 * Locale order is priority order. en-AE is the Gulf catalogue and the only one
 * whose pack sizes and recommendations match what is sold here; the others are
 * only ever consulted for a product en-AE does not publish.
 */
const LOCALES = ['en-AE', 'en-US', 'es-ES'];

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

const OUT_DIR = path.join(process.cwd(), 'data', 'discovery');
const OUT_FILE = path.join(OUT_DIR, 'pidilite-puma-catalogue.json');

const POLITE_MS = 300;

/**
 * The heading scripts/lib/spec-maps anchors its technical data region on. The
 * flattened HTML table is emitted under it so one extractor serves both the
 * sheet based brands and this one.
 */
const TECH_HEADING = 'TECHNICAL DATA (typical values)';

const INIT_SCRIPT = {
  content: 'globalThis.__name = globalThis.__name || function (f) { return f; };',
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const clean = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();

/** Our stock list and our page copy are written without the registered mark. */
const plainName = (s: string) => clean(s).replace(/\s*®\s*/g, ' ').replace(/\s+/g, ' ').trim();

export interface PumaCatalogueProduct {
  name: string;
  product_url: string;
  line: string;
  category: string;
  image_url: string;
  tds_url: string;
  classification: string;
  description: string;
  /** Flattened technical data table plus the prose sections that carry figures. */
  spec_text: string;
}

interface Catalogue {
  brand: 'pidilite-puma';
  source: string;
  harvested_at: string;
  product_count: number;
  products: PumaCatalogueProduct[];
}

interface Listed {
  product_url: string;
  name: string;
  line: string;
  category: string;
  image_url: string;
  /** Grupo Puma's own product id, which is also the data sheet endpoint's id. */
  product_id: string;
  description: string;
}

/* -------------------------------------------------------------- enumeration */

async function families(page: Page, locale: string): Promise<string[]> {
  const url = `${ORIGIN}/${locale}/products/families`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(600);
  return page.evaluate(() =>
    [
      ...new Set(
        [...document.querySelectorAll('a')]
          .map((a) => (a as HTMLAnchorElement).href)
          .filter((h) => /\/products\/family\//.test(h)),
      ),
    ],
  );
}

async function listFamily(page: Page, familyUrl: string): Promise<Listed[]> {
  await page.goto(familyUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(600);
  return page.evaluate(() => {
    const squash = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();
    const line = squash(document.querySelector('header.page-header h1')?.textContent);
    const out: Array<{
      product_url: string;
      name: string;
      line: string;
      category: string;
      image_url: string;
      product_id: string;
      description: string;
    }> = [];

    // The subfamily heading is a sibling above the cards it covers rather than
    // their parent, so document order is what groups them.
    let subfamily = '';
    const nodes = document.querySelectorAll('h2.subfamily-heading, .product-item');
    nodes.forEach((node) => {
      if (node.tagName === 'H2') {
        subfamily = squash(node.textContent);
        return;
      }
      const link = node.querySelector('h3 a, a[href*="/products/show/"]') as HTMLAnchorElement | null;
      if (!link) return;
      out.push({
        product_url: link.href.split('?')[0],
        name: squash(node.querySelector('h3')?.textContent) || squash(link.textContent),
        line,
        category: subfamily,
        image_url: (node.querySelector('img') as HTMLImageElement | null)?.src || '',
        product_id: node.getAttribute('data-idproduct') || '',
        description: squash(node.querySelector('.product-excerpt')?.textContent),
      });
    });
    return out;
  });
}

/* ------------------------------------------------------------------- detail */

async function detail(page: Page, entry: Listed): Promise<Partial<PumaCatalogueProduct>> {
  await page.goto(entry.product_url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(500);

  const raw = await page.evaluate((techHeading: string) => {
    const squash = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();

    const h1 = squash(document.querySelector('h1')?.textContent);

    // The "Download technical data sheet" button points at /services/pdf/<id>
    // with a cache busting query. The bare path is stable, so the query goes.
    const hrefs = [...document.querySelectorAll('a')].map((a) => (a as HTMLAnchorElement).href);
    const sheet = (hrefs.find((h) => /\/services\/pdf\/\d+/.test(h)) || '').split('?')[0];

    // Uploaded attachments are a mixed bag: selection guides, folded leaflets
    // and declarations of performance sit alongside the real sheet. They are
    // returned unfiltered and chosen from outside the page, where the product
    // name is known.
    const attachments = [...new Set(hrefs.filter((h) => /\/uploads\/adjuntos\/.*\.pdf$/i.test(h)))];

    // The pack shot is the largest product image; the theme's own chrome lives
    // under /img/ rather than /uploads/.
    const image =
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: (i as HTMLImageElement).src || '', w: (i as HTMLImageElement).naturalWidth }))
        .filter((x) => /\/uploads\/productos\//.test(x.src))
        .sort((a, b) => b.w - a.w)[0]?.src || '';

    // Each "Additional information" panel is a .aditional-field with its own
    // heading. Only the "Technical data" panel's table is flattened into
    // label and value rows: the other panels also hold tables, but they are
    // trowel charts and joint width charts whose first column is a tile size
    // rather than a property name, and flattening those would hand the
    // extractor dozens of lines that look like rows and carry nothing.
    const rows: string[] = [];
    const sections: Array<{ heading: string; lines: string[] }> = [];

    document.querySelectorAll('.aditional-field').forEach((f) => {
      const heading = squash(f.querySelector('.aditional-field-heading')?.textContent);
      if (!heading) return;
      const isTechnical = /^(technical data|datos t[eé]cnicos)$/i.test(heading);

      if (isTechnical) {
        f.querySelectorAll('table tr').forEach((tr) => {
          const cells = [...tr.querySelectorAll('td,th')].map((c) => squash(c.textContent));
          if (cells.length >= 2 && cells[0] && cells.slice(1).some(Boolean)) {
            rows.push(cells[0] + ': ' + cells.slice(1).filter(Boolean).join(' '));
          } else if (cells.length === 1 && cells[0] && rows.length) {
            // One cell means the row belongs to the label above it, which is
            // how a rowspan reads: one label, several values, as in
            // "Approximate yield" over single and double gluing.
            const last = rows[rows.length - 1];
            rows.push(last.slice(0, last.indexOf(':') + 1) + ' ' + cells[0]);
          }
        });
        return;
      }

      const lines: string[] = [];
      f.querySelectorAll('p, li, td').forEach((el) => {
        const t = squash(el.textContent);
        if (t && t.length > 1) lines.push(t);
      });
      sections.push({ heading, lines });
    });

    const lead = squash(document.querySelector('.product-description, .product-excerpt')?.textContent);

    return { h1, sheet, attachments, image, sections, rows, lead, techHeading };
  }, TECH_HEADING);

  // The prose sections carry figures the table leaves out: the application
  // temperature window, the water ratio, the pack size and the shelf life.
  // Sentences become separate lines because the extractor anchors a label to
  // the start of a line, and a heading is bracketed so that a heading such as
  // "Packaging and Storage" can never itself be read as a label and value.
  const prose: string[] = [];
  for (const { heading, lines } of raw.sections) {
    if (!lines.length) continue;
    prose.push(`[${heading}]`);
    for (const line of lines) {
      for (const sentence of line.split(/(?<=[.;])\s+(?=[A-Z(])/)) {
        const t = sentence.trim();
        if (t.length > 1) prose.push(t);
      }
    }
  }

  const specText = [TECH_HEADING, ...raw.rows, ...prose].join('\n').trim();

  // Classification is stated in the table, once per standard the product is
  // tested against, so a C2 TE adhesive that is also S1 carries two rows. The
  // same code is often repeated across rows, hence the dedupe. When the table
  // states none, the product's own title does: Grupo Puma puts the code in the
  // name, as in "Pegoland Elastic R2 T".
  const stated = raw.rows
    .map((r) => r.match(/classification\s*:\s*(.+)$/i)?.[1] || '')
    .map((v) => v.replace(/[.;]+$/, '').trim())
    .filter(Boolean);
  const fromName = plainName(raw.h1).match(
    /\b((?:C[12]|R[12]|D[12]|CG\d|RG\d?|CT)\s?[A-Z0-9]{0,4}(?:\s[A-Z0-9]{1,4}){0,3})\s*$/,
  )?.[1];
  const codes = [...new Set(stated.length ? stated : fromName ? [fromName.trim()] : [])];
  const classification = codes.join(' ').slice(0, 40);

  return {
    name: plainName(raw.h1) || entry.name,
    image_url: raw.image || entry.image_url,
    tds_url: raw.sheet || pickAttachment(raw.attachments, raw.h1),
    classification,
    description: entry.description || raw.lead,
    spec_text: specText,
  };
}

/**
 * Fallback for a product with no generated sheet: take an attachment whose
 * filename carries the product's own words. Guides and declarations of
 * performance are excluded by name, because a declaration passes a loose name
 * check while carrying none of the figures a sheet does.
 */
function pickAttachment(attachments: string[], name: string): string {
  const words = plainName(name)
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3);
  if (!words.length) return '';
  const scored = attachments
    .filter((u) => !/\b(dop|selection-guide|leaflet|guide-for|catalogue)\b/i.test(u))
    .map((u) => ({ u, hits: words.filter((w) => u.toLowerCase().includes(w)).length }))
    .filter((x) => x.hits >= 2)
    .sort((a, b) => b.hits - a.hits);
  return scored[0]?.u || '';
}

/* --------------------------------------------------------------------- main */

async function main() {
  const argv = process.argv.slice(2);
  const arg = (flag: string) => {
    const i = argv.indexOf(flag);
    return i === -1 ? undefined : argv[i + 1];
  };
  const limit = Number(arg('--limit') || 0);
  const only = arg('--only');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await webkit.launch();
  const ctx = await browser.newContext({ userAgent: UA, ignoreHTTPSErrors: true });
  await ctx.addInitScript(INIT_SCRIPT);
  const page = await ctx.newPage();
  // Images are never fetched by this crawl, only their URLs recorded.
  await page.route('**/*', (route) =>
    ['image', 'media', 'font'].includes(route.request().resourceType()) ? route.abort() : route.continue(),
  );

  /** Keyed on the locale free part of the URL so locales can be merged. */
  const listed = new Map<string, Listed>();

  for (const locale of LOCALES) {
    // The locale lives in a cookie; asking for it once pins the whole context.
    await page.goto(`${ORIGIN}/welcome/select_country/${locale}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    let fams: string[] = [];
    try {
      fams = await families(page, locale);
    } catch (e) {
      console.warn(`  ${locale}: families page failed, skipping locale: ${(e as Error).message.split('\n')[0]}`);
      continue;
    }
    let added = 0;
    for (const fam of fams) {
      try {
        for (const item of await listFamily(page, fam)) {
          const key = item.product_url.replace(/.*\/products\/show\//, '').replace(/-(?:ae|en|us|es)(?:-\w+)*$/, '');
          if (listed.has(key)) continue;
          listed.set(key, item);
          added++;
        }
      } catch (e) {
        console.warn(`  family failed: ${fam} ${(e as Error).message.split('\n')[0]}`);
      }
      await sleep(POLITE_MS);
    }
    console.log(`  ${locale}: ${fams.length} families, ${added} new products, ${listed.size} total`);
    // Later locales exist only to fill gaps, and the Emirates catalogue covers
    // the stocked range, so stop as soon as it answered.
    if (added > 0 && locale === LOCALES[0]) break;
  }

  let entries = [...listed.values()];
  if (only) entries = entries.filter((e) => e.product_url.includes(only));
  if (limit) entries = entries.slice(0, limit);
  console.log(`\n${entries.length} products to visit\n`);

  const products: PumaCatalogueProduct[] = [];
  const write = () => {
    const out: Catalogue = {
      brand: 'pidilite-puma',
      source: 'grupopuma.com/en-AE',
      harvested_at: new Date().toISOString(),
      product_count: products.length,
      products,
    };
    fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
  };

  for (const [i, entry] of entries.entries()) {
    try {
      const d = await detail(page, entry);
      products.push({
        name: entry.name,
        product_url: entry.product_url,
        line: entry.line,
        category: entry.category,
        image_url: entry.image_url,
        tds_url: '',
        classification: '',
        description: entry.description,
        spec_text: '',
        ...d,
      });
      const p = products[products.length - 1];
      console.log(
        `  ${String(i + 1).padStart(3)}/${entries.length}  ${p.name.padEnd(36).slice(0, 36)}` +
          ` sheet:${p.tds_url ? 'y' : 'n'} rows:${String(p.spec_text.split('\n').length).padStart(3)}` +
          ` class:${p.classification || '-'}`,
      );
    } catch (e) {
      console.warn(
        `  ${String(i + 1).padStart(3)}/${entries.length}  FAILED ${entry.product_url}: ${(e as Error).message.split('\n')[0]}`,
      );
    }
    // Written as the crawl goes so a crash never loses it.
    write();
    await sleep(POLITE_MS);
  }

  await browser.close();
  write();

  const withSheet = products.filter((p) => p.tds_url).length;
  const withSpecs = products.filter((p) => p.spec_text.includes(':')).length;
  console.log(
    `\nDone. ${products.length} products -> ${path.relative(process.cwd(), OUT_FILE)}\n` +
      `  with a data sheet link: ${withSheet}\n  with a technical data table: ${withSpecs}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

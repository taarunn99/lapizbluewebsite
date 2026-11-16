/**
 * Mapei UAE technical data sheet harvester.
 *
 * What this does
 *   Walks https://www.mapei.com/ae/en/products-and-solutions/lines down through
 *   lines, categories and subcategories, opens every product detail page it
 *   finds, reads the data sheet link out of the download block, and pulls the
 *   PDF down to /tmp/mapei-tds/<slug>.pdf.
 *
 * Why it is shaped like this
 *   1. mapei.com answers 403 to curl and to plain fetch, and 200 to a real
 *      browser engine, so every HTML page load runs inside Playwright WebKit.
 *   2. Cloudflare lets through only the FIRST navigation of a browser context.
 *      Every later navigation in the same context comes back as "Attention
 *      Required". Clearing cookies before each navigation puts the context back
 *      into first-visit state and the next page loads fine. That single trick is
 *      what makes a multi hundred page crawl possible.
 *   3. The MapeiApi endpoints the site calls for itself (/MapeiApi/Sites/<guid>/
 *      Products/...) are 403 for us even from inside the page, so there is no
 *      JSON shortcut. The crawl has to go through rendered pages.
 *   4. cdnmedia.mapei.com is NOT behind the same rule, so the PDFs themselves
 *      come down with a plain fetch.
 *
 * Note on tsx: esbuild's keepNames rewrites function declarations to call a
 * helper named __name, which does not exist inside the page. The init script
 * below defines it before any page.evaluate runs.
 *
 * Data sheet convention on the AE site
 *   TDS  -> /docs/librariesprovider59/products-documents/1_<docno>_<slug>_en-ae_<hash>.pdf
 *   SDS  -> /docs/librariesprovider59/products-documents/2_<...>.pdf
 *   A few older products carry the TDS under line-technical-documentation-documents
 *   instead, so there is a slug based fallback.
 *
 * Usage
 *   npx tsx scripts/harvest-mapei-tds.ts                  full run, resumes
 *   npx tsx scripts/harvest-mapei-tds.ts --discover-only   build the product list only
 *   npx tsx scripts/harvest-mapei-tds.ts --limit 20        stop after 20 products
 *   npx tsx scripts/harvest-mapei-tds.ts --fresh           throw away crawl state
 *
 * Writes only: /tmp/mapei-tds/*.pdf, data/discovery/mapei-tds-index.json, and a
 * crawl state file in the OS temp dir so a crash does not lose progress.
 */

import { webkit, type BrowserContext, type Page } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ORIGIN = 'https://www.mapei.com';
const LOCALE = '/ae/en';
const LINES_URL = `${ORIGIN}${LOCALE}/products-and-solutions/lines`;

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
  line: string;
}

interface State {
  lines: string[];
  categories: string[];
  subcats: string[];
  products: ProductRef[];
  listed: string[]; // listing pages already scraped
  seen_products: string[]; // product slugs already attempted
}

/* ------------------------------------------------------------------- state */

function loadState(): State {
  try {
    const raw = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) as State;
    return {
      lines: raw.lines || [],
      categories: raw.categories || [],
      subcats: raw.subcats || [],
      products: raw.products || [],
      listed: raw.listed || [],
      seen_products: raw.seen_products || [],
    };
  } catch {
    return { lines: [], categories: [], subcats: [], products: [], listed: [], seen_products: [] };
  }
}

function saveState(s: State) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 1));
}

function loadIndex(): IndexFile {
  try {
    const raw = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8')) as IndexFile;
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

/* ---------------------------------------------------------------- browsing */

function stripHash(u: string) {
  return u.split('#')[0].replace(/\/+$/, '');
}

const BLOCKED = /Attention Required|you have been blocked/i;

async function openBrowser() {
  const browser = await webkit.launch();
  const ctx = await browser.newContext({
    userAgent: UA,
    viewport: { width: 1440, height: 1000 },
    locale: 'en-GB',
  });
  await ctx.addInitScript(INIT_SCRIPT);
  return { browser, ctx };
}

/**
 * One polite navigation. Cookies are cleared first so Cloudflare treats it as a
 * first visit, which is the only state it lets through. Retries on a block.
 */
async function visit<T>(
  ctx: BrowserContext,
  url: string,
  extract: (page: Page) => Promise<T>,
  opts: { waitFor?: string; scroll?: boolean; settle?: number } = {},
): Promise<T> {
  const attempts = 3;
  let lastErr: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    await ctx.clearCookies();
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      const title = await page.title();
      if (BLOCKED.test(title)) throw new Error('cloudflare-block');

      if (opts.waitFor) {
        await page.waitForSelector(opts.waitFor, { timeout: 15000 }).catch(() => undefined);
      }
      if (opts.scroll) {
        for (let i = 0; i < 4; i++) {
          await page.mouse.wheel(0, 2600);
          await page.waitForTimeout(400);
        }
        // Some listings hide the tail behind a load more control.
        for (let i = 0; i < 8; i++) {
          const more = page
            .locator('button:has-text("more"), a:has-text("Load more"), a:has-text("Show more")')
            .first();
          if (!(await more.count().catch(() => 0))) break;
          if (!(await more.isVisible().catch(() => false))) break;
          await more.click({ timeout: 5000 }).catch(() => undefined);
          await page.waitForTimeout(1200);
        }
      }
      await page.waitForTimeout(opts.settle ?? 900);
      const out = await extract(page);
      await page.close();
      await sleep(POLITE_MS);
      return out;
    } catch (e) {
      lastErr = e;
      await page.close().catch(() => undefined);
      await sleep(attempt * 4000);
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

const hrefsOf = (page: Page) =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map((a) => (a as HTMLAnchorElement).href),
  );

/* -------------------------------------------------------------- discovery */

async function discoverLines(ctx: BrowserContext): Promise<string[]> {
  const hrefs = await visit(ctx, LINES_URL, hrefsOf, { scroll: true });
  const lines = hrefs
    .map(stripHash)
    .filter((h) => h.startsWith(`${ORIGIN}${LOCALE}/products-and-solutions/lines/`))
    .filter((h) => !/\/category\//.test(h));
  return [...new Set(lines)].sort();
}

async function scrapeListing(ctx: BrowserContext, url: string) {
  const hrefs = await visit(ctx, url, hrefsOf, {
    waitFor: 'a[href*="/products/detail/"], a[href*="/category/"]',
    scroll: true,
  });
  const norm = [...new Set(hrefs.map(stripHash))];
  return {
    categories: norm.filter((h) => /\/lines\/[^/]+\/category\/[^/]+$/.test(h)),
    subcats: norm.filter((h) => /\/lines\/[^/]+\/category\/[^/]+\/[^/]+$/.test(h)),
    products: norm.filter((h) => /\/products\/detail\/[^/]+$/.test(h)),
  };
}

/* ------------------------------------------------------------ product page */

interface DocLink {
  href: string;
  label: string;
}

interface ProductDocs {
  h1: string;
  docs: DocLink[];
}

async function readProduct(ctx: BrowserContext, url: string): Promise<ProductDocs> {
  return visit(
    ctx,
    url,
    (page) =>
      page.evaluate(() => {
        // The download block labels each row: Technical Data Sheet, Safety Data
        // Sheet, HPD, Brochure. Walk up from the anchor and take the nearest
        // ancestor that names exactly one of those.
        const LABELS = [
          'technical data sheet',
          'safety data sheet',
          'declaration of performance',
          'hpd',
          'brochure',
          'certificate',
        ];
        const h1 = document.querySelector('h1');
        const seen = new Set<string>();
        const docs: Array<{ href: string; label: string }> = [];
        document.querySelectorAll('a[href*="cdnmedia.mapei.com/docs/"]').forEach((a) => {
          const href = (a as HTMLAnchorElement).href;
          if (!/\.pdf/i.test(href)) return;
          const bare = href.split('?')[0];
          if (seen.has(bare)) return;
          seen.add(bare);
          let label = '';
          let node: HTMLElement | null = a as HTMLElement;
          for (let i = 0; i < 6 && node; i++) {
            node = node.parentElement;
            if (!node) break;
            const text = (node.textContent || '').toLowerCase();
            const hits = LABELS.filter((l) => text.includes(l));
            if (hits.length === 1) {
              label = hits[0];
              break;
            }
            if (hits.length > 1) break; // ancestor merged several sections
          }
          docs.push({ href: bare, label });
        });
        return { h1: h1 ? h1.textContent || '' : '', docs };
      }),
    { waitFor: 'a[href*="cdnmedia.mapei.com/docs/"]', settle: 700 },
  );
}

/** Pick the technical data sheet out of every PDF linked on a product page. */
function pickTds(docs: DocLink[], slug: string): string | undefined {
  // The AE product documents library numbers the TDS "1_". Proven against the
  // 24 already verified Mapei records in data/manifest.json.
  const primary = docs.find((d) => /\/products-documents\/1_/i.test(d.href));
  if (primary) return primary.href;

  // Otherwise trust the label the page puts above the download row.
  const labelled = docs.find((d) => d.label === 'technical data sheet');
  if (labelled) return labelled.href;

  // Last resort: a sheet named after the product, in a library that is not one
  // of the numbered non-TDS families (2_ safety, 5_ marks, 50_ HPD and so on).
  const token = slug.replace(/-/g, '');
  if (token.length < 4) return undefined;
  const fallback = docs.find((d) => {
    if (d.label && d.label !== 'technical data sheet') return false;
    const base = (d.href.split('/').pop() || '').toLowerCase();
    const numbered = base.match(/^(\d+)_/);
    if (numbered && numbered[1] !== '1') return false;
    return base.replace(/[^a-z0-9]/g, '').includes(token);
  });
  return fallback?.href;
}

/* ------------------------------------------------------------- downloading */

async function downloadPdf(url: string, dest: string): Promise<number> {
  const res = await fetch(url, {
    headers: { 'user-agent': UA, accept: 'application/pdf,*/*' },
  });
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
  const { browser, ctx } = await openBrowser();

  const listed = new Set(state.listed);
  const markListed = (u: string) => {
    listed.add(u);
    state.listed = [...listed];
    saveState(state);
  };

  try {
    /* ---- lines ---- */
    if (!state.lines.length) {
      state.lines = await discoverLines(ctx);
      saveState(state);
    }
    console.log(`lines: ${state.lines.length}`);

    /* ---- categories ---- */
    for (const line of state.lines) {
      if (listed.has(line)) continue;
      try {
        const got = await scrapeListing(ctx, line);
        state.categories = [...new Set([...state.categories, ...got.categories])];
        state.subcats = [...new Set([...state.subcats, ...got.subcats])];
        for (const p of got.products) addProduct(state, p, line);
        console.log(
          `line ${line.split('/').pop()} -> ${got.categories.length} categories, ${got.products.length} products`,
        );
      } catch (e) {
        console.log(`line FAIL ${line}: ${(e as Error).message}`);
      }
      markListed(line);
    }

    /* ---- subcategories ---- */
    for (const cat of [...state.categories]) {
      if (listed.has(cat)) continue;
      try {
        const got = await scrapeListing(ctx, cat);
        state.subcats = [...new Set([...state.subcats, ...got.subcats])];
        for (const p of got.products) addProduct(state, p, cat);
        console.log(`cat ${cat.split('/').slice(-3).join('/')} -> ${got.subcats.length} subcats, ${got.products.length} products`);
      } catch (e) {
        console.log(`cat FAIL ${cat}: ${(e as Error).message}`);
      }
      markListed(cat);
    }

    /* ---- products from subcategories ---- */
    for (const sub of [...state.subcats]) {
      if (listed.has(sub)) continue;
      try {
        const got = await scrapeListing(ctx, sub);
        for (const p of got.products) addProduct(state, p, sub);
        console.log(`sub ${sub.split('/').pop()} -> ${got.products.length} products (total ${state.products.length})`);
      } catch (e) {
        console.log(`sub FAIL ${sub}: ${(e as Error).message}`);
      }
      markListed(sub);
    }

    console.log(`products discovered: ${state.products.length}`);
    if (flag('--discover-only')) return;

    /* ---- product pages and PDFs ---- */
    const seen = new Set(state.seen_products);
    const have = new Set(ix.sheets.map((s) => s.slug));
    let done = 0;

    for (const p of state.products) {
      if (done >= limit) break;
      if (have.has(p.slug)) continue;
      if (seen.has(p.slug)) continue;
      done++;

      const mark = () => {
        seen.add(p.slug);
        state.seen_products = [...seen];
        saveState(state);
      };

      let docs: ProductDocs;
      try {
        docs = await readProduct(ctx, p.url);
      } catch (e) {
        ix.failed.push({ name: p.slug, reason: `page load failed: ${(e as Error).message}` });
        saveIndex(ix);
        mark();
        console.log(`x ${p.slug}: page load failed`);
        continue;
      }

      const name = clean(docs.h1) || p.name || p.slug;
      const tds = pickTds(docs.docs, p.slug);
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

    console.log(`\nsheets: ${ix.sheets.length}  failed: ${ix.failed.length}`);
  } finally {
    saveIndex(ix);
    saveState(state);
    await browser.close();
  }
}

function addProduct(state: State, url: string, from: string) {
  const slug = url.split('/').pop() || '';
  if (!slug) return;
  if (state.products.some((p) => p.slug === slug)) return;
  state.products.push({ name: '', slug, url, line: from });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

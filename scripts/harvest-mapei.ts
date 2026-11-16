/**
 * Mapei UAE catalogue harvester.
 *
 * mapei.com answers 403 to curl and to plain fetch and 200 to a real browser
 * engine, so everything here runs inside Playwright WebKit. Even the JSON API
 * calls are issued from inside a loaded mapei page so they carry the same
 * cookies, origin and headers the site gives itself.
 *
 * Two stages.
 *
 * 1. Enumerate. The site has an undocumented but clean JSON tree:
 *      GET /restapi/products/v2/lines?Site=<guid>&Language=en
 *      GET /restapi/products/v2/categories?Site=&Language=&Line=
 *      GET /restapi/products/v2/subcategories?Site=&Language=&Line=&Category=
 *      GET /restapi/products/v2/products?Site=&Language=&Line=&Category=&Page=&Size=
 *    The products call returns Name, Description, ImageUrl and PageUrl. Called
 *    with no Line it returns the whole UAE catalogue, so the crawl asks per
 *    line and per category for the line and category attribution, then asks
 *    unfiltered to pick up anything that hangs off no classification at all.
 *    Subcategories are not walked: a category query already returns every
 *    product in its subcategories.
 *
 * 2. Detail. The technical data sheet URL and the ISO classification badges
 *    only exist in the server rendered product page, so each product page is
 *    read and parsed. Mapei's WAF allows one HTML response per cookie jar, so
 *    the cookies are dropped before each page; it backs off on 403 and is
 *    fully resumable, with progress in a sidecar under the OS temp dir and the
 *    catalogue file rewritten every 25 products.
 *
 * Note on tsx: esbuild's keepNames rewrites function declarations into calls to
 * a helper named __name, which does not exist inside the page. The init script
 * below defines it before any page.evaluate runs.
 *
 * Usage:
 *   npx tsx scripts/harvest-mapei.ts --enumerate        enumerate only
 *   npx tsx scripts/harvest-mapei.ts --details          detail pass only (resumable)
 *   npx tsx scripts/harvest-mapei.ts                    both
 *   npx tsx scripts/harvest-mapei.ts --details --limit 20
 *   npx tsx scripts/harvest-mapei.ts --recon <url>      log every API call a page makes
 *   npx tsx scripts/harvest-mapei.ts --probe <apiPath>  call one API path and print it
 */

import { webkit, type Browser, type BrowserContext, type Page } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ORIGIN = 'https://www.mapei.com';
const LOCALE = '/ae/en';
const SITE_GUID = '3ad2f671-79c5-62e4-9128-ff01007028e9';
const LINES_URL = `${ORIGIN}${LOCALE}/products-and-solutions/lines`;

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

const OUT_DIR = path.join(process.cwd(), 'data', 'discovery');
const OUT_FILE = path.join(OUT_DIR, 'mapei-catalogue.json');
/* Sidecar state lives outside the repo on purpose: the harvest writes exactly
   one file into the project. */
const TMP_DIR = path.join(os.tmpdir(), 'mapei-harvest');
const STATE_FILE = path.join(TMP_DIR, 'progress.json');

const POLITE_MS = 400;
/**
 * The WAF in front of mapei.com allows one HTML response per cookie jar: the
 * first page request from a fresh context returns 200 and every later one
 * returns 403, whatever the delay between them. Dropping the cookies before
 * each request resets that, and the crawl then runs happily at one page every
 * 400 ms. Measured, not guessed, so leave the clearCookies call in place.
 */
const DETAIL_GAP_MS = 400;
const BACKOFF_MS = [15000, 45000, 120000, 300000];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const clean = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();

/**
 * The products API hands back the thumbnail rendition, e.g.
 *   .../4_adesilex-p10-w_web_<hash>.tmb-mapei thum.png?Culture=en&sfvrsn=...
 * Dropping the ".tmb-<name>" transform and the query gives the original
 * upload, which is the form the earlier hand harvest in this repo recorded.
 *
 * Products with no photograph come back pointing at the theme's own
 * placeholderProduct.png. That is not a product image, so it is recorded as
 * nothing rather than passed on as if it were one.
 */
const fullImageUrl = (u: string) => {
  const url = (u || '')
    .split('?')[0]
    .replace(/\.tmb-[^.]*(?=\.[a-z0-9]+$)/i, '')
    .replace(/ /g, '%20');
  return /placeholderProduct\.(png|jpg|jpeg|webp)$/i.test(url) ? '' : url;
};

export interface CatalogueProduct {
  name: string;
  product_url: string;
  line: string;
  category: string;
  image_url: string;
  tds_url: string;
  classification: string;
  description: string;
}

interface Catalogue {
  brand: 'mapei';
  source: 'mapei.com/ae/en';
  harvested_at: string;
  product_count: number;
  products: CatalogueProduct[];
}

interface Progress {
  /** product_url -> true once the detail page has been visited, pass or fail. */
  detailed: Record<string, true>;
  failed: Record<string, string>;
}

const INIT_SCRIPT = {
  content: 'globalThis.__name = globalThis.__name || function (f) { return f; };',
};

/* ------------------------------------------------------------------- state */

function readCatalogue(): Catalogue | null {
  try {
    return JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')) as Catalogue;
  } catch {
    return null;
  }
}

function writeCatalogue(products: CatalogueProduct[]) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out: Catalogue = {
    brand: 'mapei',
    source: 'mapei.com/ae/en',
    harvested_at: new Date().toISOString(),
    product_count: products.length,
    /* Normalised on the way out so the file never carries a thumbnail URL,
       whichever stage wrote the entry. */
    products: products.map((p) => ({ ...p, image_url: fullImageUrl(p.image_url) })),
  };
  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
}

function readProgress(): Progress {
  try {
    const p = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) as Progress;
    return { detailed: p.detailed || {}, failed: p.failed || {} };
  } catch {
    return { detailed: {}, failed: {} };
  }
}

function writeProgress(p: Progress) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(p));
}

/* ----------------------------------------------------------------- browser */

async function newCtx(browser: Browser): Promise<BrowserContext> {
  const ctx = await browser.newContext({
    userAgent: UA,
    viewport: { width: 1440, height: 1000 },
    locale: 'en-GB',
  });
  await ctx.addInitScript(INIT_SCRIPT);
  return ctx;
}

/** A page parked on a real mapei page, from which same origin API calls work. */
async function anchorPage(ctx: BrowserContext): Promise<Page> {
  const page = await ctx.newPage();
  await page.goto(LINES_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  return page;
}

/* --------------------------------------------------------------------- api */

async function api<T = unknown>(page: Page, apiPath: string): Promise<T> {
  const call = () =>
    page.evaluate(
      async (p: string) => {
        const res = await fetch(p, {
          headers: { 'X-Requested-With': '', Accept: 'application/json' },
        });
        return { status: res.status, body: await res.text() };
      },
      apiPath,
    );

  let out = await call();
  if (out.status === 403 || out.status === 429) {
    await page.context().clearCookies();
    await sleep(2000);
    out = await call();
  }
  if (out.status !== 200) throw new Error(`${out.status} on ${apiPath}: ${out.body.slice(0, 200)}`);
  return JSON.parse(out.body) as T;
}

const qs = (o: Record<string, string | number | undefined>) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join('&');

interface ApiLine {
  Id: string;
  Title: string;
  PageUrl: string;
  Url: string;
}
interface ApiCategory {
  Id: string;
  Title: string;
  PageUrl?: string;
  Url?: string;
}
interface ApiProduct {
  Name: string;
  Description: string;
  ImageUrl: string;
  PageUrl: string;
}

async function getLines(page: Page): Promise<ApiLine[]> {
  const r = await api<{ Result: ApiLine[] | null }>(
    page,
    `/restapi/products/v2/lines?${qs({ Site: SITE_GUID, Language: 'en' })}`,
  );
  return r.Result || [];
}

async function getCategories(page: Page, lineId: string): Promise<ApiCategory[]> {
  const r = await api<{ Result: ApiCategory[] | null }>(
    page,
    `/restapi/products/v2/categories?${qs({ Site: SITE_GUID, Language: 'en', Line: lineId })}`,
  );
  return r.Result || [];
}

/** Pages through the products endpoint until every entry the Count promises is in. */
async function getProducts(
  page: Page,
  filter: { Line?: string; Category?: string },
): Promise<ApiProduct[]> {
  const size = 100;
  const all: ApiProduct[] = [];
  let p = 1;
  for (;;) {
    const r = await api<{ Result: { Count: number; Entries: ApiProduct[] } | null }>(
      page,
      `/restapi/products/v2/products?${qs({
        Site: SITE_GUID,
        Language: 'en',
        Page: p,
        Size: size,
        ...filter,
      })}`,
    );
    const res = r.Result;
    if (!res || !res.Entries || res.Entries.length === 0) break;
    all.push(...res.Entries);
    if (all.length >= res.Count || res.Entries.length < size) break;
    p += 1;
    await sleep(POLITE_MS);
  }
  return all;
}

/* -------------------------------------------------------- stage 1: enumerate */

async function enumerate(browser: Browser): Promise<CatalogueProduct[]> {
  const ctx = await newCtx(browser);
  const page = await anchorPage(ctx);

  /* Seed from any existing file so re-running the enumeration does not throw
     away a finished detail pass. */
  const byUrl = new Map<string, CatalogueProduct>();
  const previous = readCatalogue();
  if (previous) {
    for (const p of previous.products) byUrl.set(p.product_url, { ...p, image_url: fullImageUrl(p.image_url) });
    console.log(`seeded ${byUrl.size} products from the existing catalogue`);
  }

  const add = (p: ApiProduct, line: string, category: string) => {
    const url = (p.PageUrl || '').split('?')[0];
    if (!url) return;
    const existing = byUrl.get(url);
    if (existing) {
      /* Keep the first attribution but fill blanks, and let a product that
         appears in several lines list them all. */
      if (line && !existing.line) existing.line = line;
      else if (line && existing.line !== line && !existing.line.split('; ').includes(line))
        existing.line = `${existing.line}; ${line}`;
      if (category && !existing.category) existing.category = category;
      else if (
        category &&
        existing.category !== category &&
        !existing.category.split('; ').includes(category)
      )
        existing.category = `${existing.category}; ${category}`;
      if (!existing.description) existing.description = clean(p.Description);
      if (!existing.image_url) existing.image_url = fullImageUrl(p.ImageUrl);
      return;
    }
    byUrl.set(url, {
      name: clean(p.Name),
      product_url: url,
      line,
      category,
      image_url: fullImageUrl(p.ImageUrl),
      tds_url: '',
      classification: '',
      description: clean(p.Description),
    });
  };

  const lines = await getLines(page);
  console.log(`lines: ${lines.length}`);
  const failures: string[] = [];

  for (const line of lines) {
    await sleep(POLITE_MS);
    let cats: ApiCategory[] = [];
    try {
      cats = await getCategories(page, line.Id);
    } catch (e) {
      failures.push(`categories ${line.Title}: ${(e as Error).message}`);
    }

    /* Line level first, so every product in the line gets the line name even
       when it sits in no category. */
    try {
      await sleep(POLITE_MS);
      const lineProducts = await getProducts(page, { Line: line.Id });
      for (const p of lineProducts) add(p, line.Title, '');
      console.log(`  ${line.Title}: ${lineProducts.length} products, ${cats.length} categories`);
    } catch (e) {
      failures.push(`products ${line.Title}: ${(e as Error).message}`);
      console.log(`  ${line.Title}: FAILED ${(e as Error).message}`);
    }

    for (const cat of cats) {
      await sleep(POLITE_MS);
      try {
        const prods = await getProducts(page, { Line: line.Id, Category: cat.Id });
        for (const p of prods) add(p, line.Title, cat.Title);
        console.log(`    ${cat.Title}: ${prods.length}`);
      } catch (e) {
        failures.push(`products ${line.Title} / ${cat.Title}: ${(e as Error).message}`);
        console.log(`    ${cat.Title}: FAILED ${(e as Error).message}`);
      }
    }
    writeCatalogue([...byUrl.values()]);
  }

  /* Sweep: unfiltered, to catch products not reachable through any line. */
  try {
    await sleep(POLITE_MS);
    const everything = await getProducts(page, {});
    let novel = 0;
    for (const p of everything) {
      const url = (p.PageUrl || '').split('?')[0];
      if (url && !byUrl.has(url)) novel += 1;
      add(p, '', '');
    }
    console.log(`site sweep: ${everything.length} products, ${novel} outside any line`);
  } catch (e) {
    failures.push(`site sweep: ${(e as Error).message}`);
  }

  const products = [...byUrl.values()].sort((a, b) => a.name.localeCompare(b.name));
  writeCatalogue(products);
  console.log(`enumerated ${products.length} products -> ${OUT_FILE}`);
  if (failures.length) {
    console.log('enumeration failures:');
    failures.forEach((f) => console.log('  ' + f));
  }
  await ctx.close();
  return products;
}

/* ---------------------------------------------------------- stage 2: detail */

interface Detail {
  tds_url: string;
  classification: string;
  description: string;
}

/**
 * Pulls the TDS, the classification and the richer JSON-LD description out of
 * one server rendered product page.
 *
 * The page is fetched rather than navigated to: it is plain server HTML, the
 * fetch runs inside a loaded mapei page so it carries the right origin and
 * cookies, and it skips every image, font and script the real navigation would
 * pull from the CDN. That is the difference between 350 ms and 2 s per product.
 *
 * The visible download button is disabled until the page's own script runs, so
 * the real PDF URL is read off the language <select> instead, preferring the
 * UAE English option. Classification comes from the certificate badge
 * filenames, which encode the standard: 5_iso-13007-1-c2te-s1-in_<hash>.svg.
 */
async function readDetail(page: Page, url: string): Promise<Detail & { status: number }> {
  return page.evaluate(async (u: string) => {
    const blank = { status: 0, tds_url: '', classification: '', description: '' };
    const res = await fetch(u, { headers: { Accept: 'text/html' } });
    if (!res.ok) return { ...blank, status: res.status };
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');

    let tds = '';
    for (const box of Array.from(doc.querySelectorAll('.box-attached-documentation'))) {
      const heading = (box.querySelector('h5')?.textContent || '').replace(/\s+/g, ' ').trim();
      const sel = box.querySelector('select');
      const isTds =
        /technical data sheet/i.test(heading) ||
        !!(sel && sel.className.includes('tds-language-selector'));
      if (!isTds) continue;
      const opts = (
        Array.from(box.querySelectorAll('option')) as HTMLOptionElement[]
      ).filter((o) => o.value);
      if (opts.length) {
        const pick =
          opts.find((o) => o.defaultSelected) ||
          opts.find((o) => /_en-ae[._]/i.test(o.value)) ||
          opts.find((o) => /_en[._-]/i.test(o.value)) ||
          opts[0];
        tds = pick.value.split('?')[0];
      } else {
        /* Some products carry a single sheet with no language selector. */
        const a = box.querySelector('a[href*=".pdf"]') as HTMLAnchorElement | null;
        if (a) tds = (a.getAttribute('href') || '').split('?')[0];
      }
      if (tds) break;
    }

    /**
     * 5_iso-13007-1-c2te-s1-in -> "ISO 13007-1 C2TE S1".
     * The hyphen does double duty in these slugs: it separates words, but it
     * also sits inside a standard's number. Two adjacent all digit tokens
     * belong to the same number and keep their hyphen; everything else gets a
     * space. The trailing "-in" is a locale marker, not part of the standard.
     */
    const pretty = (slug: string) => {
      const tokens = slug.replace(/-in[0-9]*$/, '').split('-').filter(Boolean);
      return tokens
        .map((t, i) => {
          const token = /^[0-9]+$/.test(t) ? t : t.toUpperCase();
          if (i === 0) return token;
          const joiner = /^[0-9]+$/.test(t) && /^[0-9]+$/.test(tokens[i - 1]) ? '-' : ' ';
          return joiner + token;
        })
        .join('')
        .trim();
    };

    const badges = Array.from(doc.querySelectorAll('.box-cert img'))
      .map((i) => i.getAttribute('src') || '')
      .map((src) => {
        const m = src.match(/products-images\/5_(.+?)_[0-9a-f]{32}\.svg/i);
        return m ? pretty(m[1]) : '';
      })
      .filter(Boolean);

    const ldNode = Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).find(
      (n) => /"@type":\s*"Product"/.test(n.textContent || ''),
    );
    let ldDesc = '';
    if (ldNode) {
      try {
        ldDesc = ((JSON.parse(ldNode.textContent || '{}') as { description?: string }).description || '')
          .replace(/\s+/g, ' ')
          .trim();
      } catch {
        /* malformed JSON-LD is not worth failing over */
      }
    }

    return {
      status: 200,
      tds_url: tds,
      classification: Array.from(new Set(badges)).join(', '),
      description: ldDesc,
    };
  }, url);
}

async function details(browser: Browser, limit?: number) {
  const cat = readCatalogue();
  if (!cat) throw new Error(`no ${OUT_FILE}; run the enumerate stage first`);
  const progress = readProgress();

  const todo = cat.products.filter((p) => !progress.detailed[p.product_url]);
  const queue = limit ? todo.slice(0, limit) : todo;
  console.log(`details: ${queue.length} to do of ${cat.products.length} (${todo.length} outstanding)`);

  const byUrl = new Map(cat.products.map((p) => [p.product_url, p]));
  let ctx = await newCtx(browser);
  let page = await anchorPage(ctx);
  let consecutiveBlocks = 0;
  let done = 0;
  let withTds = 0;

  const reanchor = async () => {
    try {
      await ctx.close();
    } catch {
      /* already gone */
    }
    ctx = await newCtx(browser);
    page = await anchorPage(ctx);
  };

  for (const product of queue) {
    /* One HTML response per cookie jar; see DETAIL_GAP_MS above. */
    await ctx.clearCookies();

    let d: (Detail & { status: number }) | null = null;
    try {
      d = await readDetail(page, product.product_url);
    } catch (e) {
      progress.failed[product.product_url] = (e as Error).message.slice(0, 160);
      writeProgress(progress);
      await reanchor();
      await sleep(DETAIL_GAP_MS);
      continue;
    }

    if (d.status === 403 || d.status === 429) {
      const wait = BACKOFF_MS[Math.min(consecutiveBlocks, BACKOFF_MS.length - 1)];
      consecutiveBlocks += 1;
      console.log(`  ${d.status} on ${product.name}; backing off ${wait / 1000}s`);
      await reanchor();
      await sleep(wait);
      continue;
    }
    consecutiveBlocks = 0;

    if (d.status !== 200) {
      progress.failed[product.product_url] = `HTTP ${d.status}`;
      progress.detailed[product.product_url] = true;
      await sleep(DETAIL_GAP_MS);
      continue;
    }

    const target = byUrl.get(product.product_url)!;
    if (d.tds_url) {
      target.tds_url = d.tds_url;
      withTds += 1;
    }
    if (d.classification) target.classification = d.classification;
    if (d.description && d.description.length > target.description.length)
      target.description = d.description;
    delete progress.failed[product.product_url];
    progress.detailed[product.product_url] = true;
    done += 1;

    if (done % 25 === 0) {
      writeCatalogue(cat.products);
      writeProgress(progress);
      console.log(`  ${done}/${queue.length} read, ${withTds} with a TDS`);
    }
    await sleep(DETAIL_GAP_MS);
  }

  writeCatalogue(cat.products);
  writeProgress(progress);
  const totalTds = cat.products.filter((p) => p.tds_url).length;
  console.log(
    `details done: ${done} pages read this run, ${totalTds}/${cat.products.length} products now have a TDS`,
  );
  const stillFailed = Object.keys(progress.failed);
  if (stillFailed.length) console.log(`failed: ${stillFailed.length}`);
  try {
    await ctx.close();
  } catch {
    /* already gone */
  }
}

/* ------------------------------------------------------------------- recon */

async function recon(ctx: BrowserContext, target: string) {
  const page = await ctx.newPage();
  const hits: Array<Record<string, unknown>> = [];

  page.on('response', async (res) => {
    const url = res.url();
    if (!/MapeiApi|restapi|\/api\//i.test(url)) return;
    const ct = res.headers()['content-type'] || '';
    let body = '';
    try {
      if (/json|text/i.test(ct)) body = (await res.text()).slice(0, 4000);
    } catch {
      /* binary or already consumed */
    }
    hits.push({
      method: res.request().method(),
      status: res.status(),
      url,
      ct,
      post: res.request().postData()?.slice(0, 1200),
      body,
    });
  });

  await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(6000);
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 2200);
    await page.waitForTimeout(1200);
  }
  await page.waitForTimeout(2500);

  console.log('URL      ', page.url());
  console.log('TITLE    ', await page.title());
  console.log('API HITS ', hits.length);
  for (const h of hits) console.log('----\n' + JSON.stringify(h, null, 1));

  fs.mkdirSync(TMP_DIR, { recursive: true });
  const dump = path.join(TMP_DIR, 'recon.html');
  fs.writeFileSync(dump, await page.content());
  const links: string[] = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map((a) => (a as HTMLAnchorElement).href),
  );
  fs.writeFileSync(path.join(TMP_DIR, 'recon-links.json'), JSON.stringify([...new Set(links)], null, 2));
  console.log('DUMP     ', dump);
  await page.close();
}

async function probe(ctx: BrowserContext, apiPath: string) {
  const page = await anchorPage(ctx);
  const out = await page.evaluate(async (p: string) => {
    const r = await fetch(p, { headers: { 'X-Requested-With': '', Accept: 'application/json' } });
    return { status: r.status, ct: r.headers.get('content-type'), body: await r.text() };
  }, apiPath);
  console.log('STATUS', out.status, out.ct, 'len', out.body.length);
  console.log(out.body.slice(0, 8000));
  await page.close();
}

/* -------------------------------------------------------------------- main */

async function main() {
  const argv = process.argv.slice(2);
  const flag = (n: string) => argv.includes(n);
  const val = (n: string) => {
    const i = argv.indexOf(n);
    return i >= 0 ? argv[i + 1] : undefined;
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await webkit.launch();
  try {
    if (flag('--recon')) {
      const ctx = await newCtx(browser);
      await recon(ctx, val('--recon') || LINES_URL);
      return;
    }
    if (flag('--probe')) {
      const ctx = await newCtx(browser);
      await probe(ctx, val('--probe') as string);
      return;
    }

    const limit = val('--limit') ? Number(val('--limit')) : undefined;
    const onlyDetails = flag('--details');
    const onlyEnumerate = flag('--enumerate');

    if (!onlyDetails) await enumerate(browser);
    if (!onlyEnumerate) await details(browser, limit);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

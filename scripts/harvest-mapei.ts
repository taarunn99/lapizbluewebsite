/**
 * Mapei UAE catalogue harvester.
 *
 * mapei.com answers 403 to curl and to plain fetch, and 200 to a real browser
 * engine, so everything here runs inside Playwright WebKit. Even the "API"
 * calls are made from inside the page context so they carry the same session
 * and headers the site gives itself.
 *
 * Note on tsx: esbuild's keepNames rewrites function declarations to call a
 * helper named __name, which does not exist inside the page. The init script
 * below defines it before any page.evaluate runs.
 *
 * Usage:
 *   npx tsx scripts/harvest-mapei.ts --recon <categoryUrl>
 *   npx tsx scripts/harvest-mapei.ts --lines
 *   npx tsx scripts/harvest-mapei.ts
 *   npx tsx scripts/harvest-mapei.ts --limit 2
 */

import { webkit, type BrowserContext, type Page } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://www.mapei.com';
const LOCALE = '/ae/en';
const SITE_GUID = '3ad2f671-79c5-62e4-9128-ff01007028e9';
const LINES_URL = `${ORIGIN}${LOCALE}/products-and-solutions/lines`;

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

const OUT_DIR = path.join(process.cwd(), 'data', 'discovery');
const OUT_FILE = path.join(OUT_DIR, 'mapei-catalogue.json');
const STATE_FILE = path.join(OUT_DIR, '.mapei-catalogue.progress.json');

const POLITE_MS = 400;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const clean = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();

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

const INIT_SCRIPT = {
  content: 'globalThis.__name = globalThis.__name || function (f) { return f; };',
};

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

/* ------------------------------------------------------------------ recon */

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
      /* body already consumed or binary */
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

  const dump = path.join(OUT_DIR, '.recon.html');
  fs.writeFileSync(dump, await page.content());
  console.log('HTML     ', dump);

  const links: string[] = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map((a) => (a as HTMLAnchorElement).href),
  );
  fs.writeFileSync(path.join(OUT_DIR, '.recon-links.json'), JSON.stringify([...new Set(links)], null, 2));
  console.log('LINKS    ', new Set(links).size);
  await page.close();
}


/* ------------------------------------------------------------------ probe */

async function probe(ctx: BrowserContext, apiPath: string) {
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}${LOCALE}/products-and-solutions/lines`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  const out = await page.evaluate(async (p: string) => {
    const r = await fetch(p, { headers: { 'X-Requested-With': '', Accept: 'application/json' } });
    const t = await r.text();
    return { status: r.status, ct: r.headers.get('content-type'), body: t };
  }, apiPath);
  console.log('STATUS', out.status, out.ct, 'len', out.body.length);
  console.log(out.body.slice(0, 6000));
  await page.close();
}

/* ------------------------------------------------------------------- main */

async function main() {
  const argv = process.argv.slice(2);
  const flag = (n: string) => argv.includes(n);
  const val = (n: string) => {
    const i = argv.indexOf(n);
    return i >= 0 ? argv[i + 1] : undefined;
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const { browser, ctx } = await openBrowser();
  try {
    if (flag('--recon')) {
      await recon(ctx, val('--recon') || LINES_URL);
      return;
    }
    if (flag('--probe')) {
      await probe(ctx, val('--probe') as string);
      return;
    }
    console.log('nothing to do yet');
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

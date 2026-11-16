/**
 * Catalogue harvester.
 *
 * One Playwright WebKit crawler with a per brand adapter. WebKit rather than
 * fetch because several manufacturer sites sit behind bot protection that
 * returns 403 to curl and to plain fetch, and answers a real browser engine
 * normally. Mapei is the clearest case: 403 from curl, 200 from WebKit.
 *
 * Output is one file per brand at data/discovery/<brand>.json. Nothing here
 * writes to the manifest. Harvesting and shipping are deliberately separate
 * steps so the catalogue can be reviewed before anything becomes a page.
 *
 * Usage:
 *   npx tsx scripts/harvest.ts --brand vetonit
 *   npx tsx scripts/harvest.ts --brand vetonit --limit 5     (smoke test)
 *   npx tsx scripts/harvest.ts --brand vetonit --only tile-fix-universal
 */

import { webkit, type Page } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.join(process.cwd(), 'data', 'discovery');

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

export interface HarvestedProduct {
  /** Slug as the manufacturer publishes it. Our own slug is derived later. */
  source_slug: string;
  name: string;
  /** Manufacturer's own category label, mapped to our product lines later. */
  source_category: string;
  tagline: string;
  description: string;
  product_url: string;
  image_url: string;
  tds_url: string;
  sds_url: string;
  uses: string[];
  advantages: string[];
  /** Free text blocks that carry the real numbers: ratios, times, thicknesses. */
  usage: Record<string, string>;
  harvested_at: string;
}

interface Adapter {
  brand: string;
  /** Returns catalogue entries without visiting each product page. */
  listing(page: Page): Promise<Array<Pick<HarvestedProduct, 'source_slug' | 'name' | 'product_url' | 'image_url' | 'source_category'>>>;
  /** Enriches one entry by visiting its page. */
  detail(page: Page, entry: { product_url: string }): Promise<Partial<HarvestedProduct>>;
}

const clean = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ Saveto */

const SAVETO_ORIGIN = 'https://www.saveto.com';

/**
 * Saveto publishes a regional UAE catalogue and a larger global one. Lapiz
 * Blue sells the UAE range, so UAE wins on conflict, but the global site
 * carries products the UAE pages omit, so both are crawled and merged.
 */
const SAVETO_LISTINGS = [
  { base: `${SAVETO_ORIGIN}/ae/product-search`, pages: 4, region: 'ae' },
  { base: `${SAVETO_ORIGIN}/product-search`, pages: 6, region: 'global' },
];

const saveto: Adapter = {
  brand: 'vetonit',

  async listing(page) {
    const seen = new Map<string, Awaited<ReturnType<Adapter['listing']>>[number]>();

    for (const { base, pages, region } of SAVETO_LISTINGS) {
      for (let i = 0; i < pages; i++) {
        const url = `${base}?page=${i}`;
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
          await page.waitForTimeout(1200);
        } catch {
          console.warn(`  listing failed, skipping: ${url}`);
          continue;
        }

        const rows = await page.evaluate(() => {
          const squash = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();
          const out: Array<{ href: string; name: string; image: string; category: string }> = [];
          // Each card is an anchor to /products/<slug>; walk up to the card to
          // find its image and its category chip.
          document.querySelectorAll('a[href*="/products/"]').forEach((a) => {
            const href = a.getAttribute('href') || '';
            if (!/\/products\/[a-z0-9-]+$/.test(href)) return;
            let card: Element | null = a;
            for (let i = 0; i < 5 && card; i++) {
              if (card.querySelector('img')) break;
              card = card.parentElement;
            }
            const img = card?.querySelector('img')?.getAttribute('src') || '';
            const name = squash(a.textContent) || squash(card?.querySelector('h2,h3,h4')?.textContent);
            const texts = card ? [...card.querySelectorAll('span,div,p')].map((e) => squash(e.textContent)) : [];
            const category = texts.find((t) => t.length > 2 && t.length < 34 && t !== name) || '';
            out.push({ href, name, image: img, category });
          });
          return out;
        });

        for (const r of rows) {
          const slug = r.href.replace(/\/$/, '').split('/').pop() as string;
          const abs = r.href.startsWith('http') ? r.href : SAVETO_ORIGIN + r.href;
          const key = slug.replace(/-\d+$/, ''); // "-0" regional suffixes collide
          const existing = seen.get(key);
          // Prefer the UAE record; only fill gaps from the global catalogue.
          if (existing && region !== 'ae') continue;
          if (existing && existing.product_url.includes('/ae/')) continue;
          seen.set(key, {
            source_slug: slug,
            name: r.name || slug.replace(/-/g, ' '),
            product_url: abs,
            image_url: r.image ? (r.image.startsWith('http') ? r.image : SAVETO_ORIGIN + r.image) : '',
            source_category: r.category,
          });
        }
        console.log(`  ${region} page ${i}: ${rows.length} cards, ${seen.size} unique so far`);
      }
    }
    return [...seen.values()];
  },

  async detail(page, entry) {
    await page.goto(entry.product_url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(900);

    return page.evaluate(() => {
      const squash = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();

      const h1 = squash(document.querySelector('h1')?.textContent);

      // The pack shot is the only large non logo image on the page.
      const image =
        [...document.querySelectorAll('img')]
          .map((i) => ({ src: i.getAttribute('src') || '', w: i.naturalWidth }))
          .filter((x) => x.w > 200 && /\/files\//.test(x.src) && !/logo|flag|inline-images/i.test(x.src))
          .sort((a, b) => b.w - a.w)[0]?.src || '';

      // Bullet lists are not siblings of their heading on these pages, so the
      // lookup walks document order instead of the DOM tree: find the heading,
      // take the next list before the following heading.
      const flow = [...document.querySelectorAll('h2,h3,ul,ol')];
      const listUnder = (label: string): string[] => {
        const start = flow.findIndex(
          (e) => /^H[23]$/.test(e.tagName) && squash(e.textContent).toLowerCase() === label,
        );
        if (start === -1) return [];
        for (let j = start + 1; j < flow.length; j++) {
          if (/^H[23]$/.test(flow[j].tagName)) return [];
          if (flow[j].tagName === 'UL' || flow[j].tagName === 'OL') {
            return [...flow[j].querySelectorAll('li')].map((li) => squash(li.textContent)).filter(Boolean);
          }
        }
        return [];
      };

      // The usage panels are collapsed, so textContent is used rather than
      // innerText. These blocks carry the real numbers: water ratios, open
      // time, adjustability, thickness.
      const usage: Record<string, string> = {};
      for (const label of ['Surface Preparation', 'Mixing', 'Application', 'Cleaning', 'Curing', 'Priming']) {
        const node = [...document.querySelectorAll('h2,h3,h4,button,summary,span,div,a')].find(
          (x) => squash(x.textContent) === label && x.children.length === 0,
        );
        if (!node) continue;
        let n: Element | null = node.parentElement;
        for (let i = 0; i < 4 && n; i++) {
          const t = squash(n.textContent);
          if (t.length > label.length + 40) {
            usage[label.toLowerCase().replace(/\s+/g, '_')] = t.replace(new RegExp('^' + label + '\\s*'), '');
            break;
          }
          n = n.parentElement;
        }
      }

      // The paragraph between the tagline and the first heading is the
      // manufacturer's own description. Kept for reference only; our page copy
      // is written fresh, never copied from here.
      const paras = [...document.querySelectorAll('p')]
        .map((p) => squash(p.textContent))
        .filter((t) => t.length > 120);

      const headings = [...document.querySelectorAll('h2,h3,h4')].map((h) => squash(h.textContent));
      const tagline = headings.find((t) => /\.$/.test(t) && t.length < 90) || '';

      const hrefs = [...document.querySelectorAll('a')].map((a) => a.getAttribute('href') || '');
      const tds = hrefs.find((h) => /tds-download|\.pdf/i.test(h)) || '';
      const sds = hrefs.find((h) => /sds|safety/i.test(h)) || '';

      return {
        name: h1,
        tagline,
        description: paras[0] || '',
        image_url: image ? (image.startsWith('http') ? image : 'https://www.saveto.com' + image) : '',
        tds_url: tds ? (tds.startsWith('http') ? tds : 'https://www.saveto.com' + tds) : '',
        sds_url: sds ? (sds.startsWith('http') ? sds : 'https://www.saveto.com' + sds) : '',
        uses: listUnder('uses'),
        advantages: listUnder('advantages'),
        usage,
      };
    });
  },
};

const ADAPTERS: Record<string, Adapter> = { vetonit: saveto };

/* -------------------------------------------------------------------- main */

async function main() {
  const argv = process.argv.slice(2);
  const arg = (flag: string) => {
    const i = argv.indexOf(flag);
    return i === -1 ? undefined : argv[i + 1];
  };

  const brand = arg('--brand') || 'vetonit';
  const limit = Number(arg('--limit') || 0);
  const only = arg('--only');

  const adapter = ADAPTERS[brand];
  if (!adapter) {
    console.error(`No adapter for "${brand}". Available: ${Object.keys(ADAPTERS).join(', ')}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${brand}.json`);

  const browser = await webkit.launch();
  const ctx = await browser.newContext({ userAgent: UA, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  // tsx compiles through esbuild with keepNames, which rewrites functions to
  // call a __name helper. That helper exists in Node, not in the page, so any
  // evaluate() with a named inner function throws ReferenceError. Shim it.
  // Passed as a raw string so it cannot itself be rewritten.
  await ctx.addInitScript({ content: 'globalThis.__name = globalThis.__name || function (f) { return f; };' });
  // Images are never needed, and blocking them roughly halves crawl time.
  await page.route('**/*', (route) =>
    ['image', 'media', 'font'].includes(route.request().resourceType()) ? route.abort() : route.continue(),
  );

  console.log(`Harvesting ${brand}`);
  let entries = await adapter.listing(page);
  if (only) entries = entries.filter((e) => e.source_slug.includes(only));
  if (limit) entries = entries.slice(0, limit);
  console.log(`\n${entries.length} products to visit\n`);

  const products: HarvestedProduct[] = [];
  for (const [i, entry] of entries.entries()) {
    try {
      const detail = await adapter.detail(page, entry);
      products.push({
        source_slug: entry.source_slug,
        name: detail.name || entry.name,
        source_category: entry.source_category,
        tagline: '',
        description: '',
        product_url: entry.product_url,
        tds_url: '',
        sds_url: '',
        uses: [],
        advantages: [],
        usage: {},
        harvested_at: new Date().toISOString().slice(0, 10),
        ...detail,
        // The listing image is a thumbnail; the detail page has the full one.
        image_url: detail.image_url || entry.image_url,
      });
      const p = products[products.length - 1];
      console.log(
        `  ${String(i + 1).padStart(3)}/${entries.length}  ${p.name.padEnd(32).slice(0, 32)}` +
          ` img:${p.image_url ? 'y' : 'n'} uses:${String(p.uses.length).padStart(2)} usage:${Object.keys(p.usage).length}`,
      );
    } catch (e) {
      console.warn(`  ${String(i + 1).padStart(3)}/${entries.length}  FAILED ${entry.source_slug}: ${(e as Error).message.split('\n')[0]}`);
    }
    // Write as we go so a crash never loses the crawl.
    fs.writeFileSync(outPath, JSON.stringify({ brand, source: 'saveto.com', harvested_at: new Date().toISOString(), products }, null, 2) + '\n');
    await sleep(350);
  }

  await browser.close();

  const withImage = products.filter((p) => p.image_url).length;
  const withUsage = products.filter((p) => Object.keys(p.usage).length > 0).length;
  const withTds = products.filter((p) => p.tds_url).length;
  console.log(
    `\nDone. ${products.length} products -> ${path.relative(process.cwd(), outPath)}\n` +
      `  with image: ${withImage}\n  with usage detail: ${withUsage}\n  with a TDS link: ${withTds}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

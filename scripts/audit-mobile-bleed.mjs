/**
 * Zero bleed on mobile, measured rather than assumed.
 *
 * The test is whether the page actually scrolls sideways, not whether
 * scrollWidth is larger than clientWidth: a legitimate overflow-x container,
 * such as the section rail or a wide table, reports a larger scrollWidth and
 * is fine. So each page is asked to scroll to 9999 and then asked where it
 * ended up. Anything other than zero is a real bleed.
 *
 * Real WebKit, because this is the engine the owner's customers use and
 * because Chromium has been wrong about this before.
 *
 *   node scripts/audit-mobile-bleed.mjs [base url] [concurrency]
 */
import { webkit } from 'playwright';
import fs from 'node:fs';

const BASE = process.argv[2] ?? 'http://localhost:3210';
const LANES = Number(process.argv[3] ?? 6);
const WIDTHS = [320, 390];

const recs = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8')).filter(
  (r) => r.page_status === 'generated' || r.page_status === 'live',
);
const urls = recs.map((r) => `/brands/${r.brand}/${r.product_line}/${r.slug}`);

const browser = await webkit.launch();
const fails = [];
let done = 0;

async function lane(queue) {
  const ctx = await browser.newContext({ viewport: { width: 320, height: 800 } });
  const page = await ctx.newPage();
  for (let url = queue.pop(); url; url = queue.pop()) {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(BASE + url, { waitUntil: 'domcontentloaded' });
      // Park on the calculator too: its controls are the widest thing on the
      // page and only mount once the section is in view.
      const calc = page.locator('#calculator');
      if (await calc.count()) await calc.scrollIntoViewIfNeeded();
      const moved = await page.evaluate(() => {
        const el = document.scrollingElement;
        el.scrollLeft = 9999;
        const a = el.scrollLeft;
        el.scrollLeft = 0;
        document.body.scrollLeft = 9999;
        const bo = document.body.scrollLeft;
        document.body.scrollLeft = 0;
        return Math.max(a, bo);
      });
      if (moved !== 0) fails.push(`${url} at ${width}: scrolls ${moved}px sideways`);
    }
    done += 1;
    if (done % 50 === 0) console.log(`  ${done} of ${urls.length}`);
  }
  await ctx.close();
}

const queue = [...urls];
await Promise.all(Array.from({ length: LANES }, () => lane(queue)));
await browser.close();

console.log(`\n${done} pages at ${WIDTHS.join(' and ')} px, ${done * WIDTHS.length} combinations`);
if (fails.length) {
  console.log(`\n${fails.length} BLEEDING:`);
  for (const f of fails.slice(0, 30)) console.log(`  ${f}`);
  process.exit(1);
}
console.log('Zero horizontal movement on every one.');

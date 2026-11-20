/*
  Real WebKit sideways scroll check for any list of pages, plus word and heading
  counts. The product page sweep lives in audit-mobile-bleed.mjs; this one is
  for the hubs, brand pages and anything else that is not in the manifest.

  Usage: PAGES=/brands/mapei,/brands/weber node scripts/audit-page-bleed.mjs
*/
import { webkit } from 'playwright';
const base = process.env.BASE || 'http://localhost:3210';
const pages = (process.env.PAGES || '/brands/mapei,/brands/kerakoll,/brands/weber,/brands/laticrete,/brands/pidilite-puma,/brands/profilpas,/brands/akzonobel,/brands/fila,/brands/kalinga-stone').split(',');
const browser = await webkit.launch();
let bad = 0;
for (const w of [320, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  for (const p of pages) {
    const page = await ctx.newPage();
    await page.goto(base + p, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    const x = await page.evaluate(() => { window.scrollTo(9999, window.scrollY); return window.scrollX; });
    const words = await page.evaluate(() => document.querySelector('main')?.innerText.split(/\s+/).filter(Boolean).length);
    const h1 = await page.evaluate(() => document.querySelectorAll('h1').length);
    const h2 = await page.evaluate(() => document.querySelectorAll('h2').length);
    if (x !== 0) bad++;
    console.log(`${w}px ${p} scrollX=${x} words=${words} h1=${h1} h2=${h2}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(bad ? `${bad} bleed(s)` : 'no sideways movement');
process.exit(bad ? 1 : 0);

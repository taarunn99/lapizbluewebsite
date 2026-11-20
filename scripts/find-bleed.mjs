/*
  Names the elements that stick out past the right edge on a page, in WebKit.
  Usage: node scripts/find-bleed.mjs <url> [width]
*/
import { webkit } from 'playwright';
const url = process.argv[2];
const w = Number(process.argv[3] || 320);
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(500);
const out = await page.evaluate((w) => {
  const hits = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed') continue;
    if (r.right > w + 0.5) {
      const path = [];
      let n = el;
      for (let i = 0; n && i < 4; i++, n = n.parentElement) path.unshift(n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (n.className && typeof n.className === 'string' ? '.' + n.className.split(' ').slice(0, 3).join('.') : ''));
      hits.push({ right: Math.round(r.right), width: Math.round(r.width), path: path.join(' > ') });
    }
  }
  window.scrollTo(9999, window.scrollY);
  return { scrollX: window.scrollX, scrollWidth: document.documentElement.scrollWidth, hits: hits.slice(0, 15) };
}, w);
console.log(JSON.stringify(out, null, 1));
await browser.close();

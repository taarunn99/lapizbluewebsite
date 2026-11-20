/*
  Screenshot one section of a page at a given width, for a quick look.
  Usage: node scripts/shot-section.mjs <url> <css selector> <width> <out.png>
*/
import { webkit } from 'playwright';
const [url, sel, w, out] = process.argv.slice(2);
const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: 900 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), sel);
await page.waitForTimeout(1800);
const el = await page.$(sel);
await el.screenshot({ path: out });
await browser.close();
console.log('wrote', out);

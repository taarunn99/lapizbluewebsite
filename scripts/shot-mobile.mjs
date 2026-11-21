// Full page capture at phone width, with the cookie bar hidden.
// Usage: node scripts/shot-mobile.mjs <url> <out.png>
import { webkit } from "playwright";
const [url, out] = process.argv.slice(2);
const b = await webkit.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await p.goto(url, { waitUntil: "networkidle", timeout: 180000 });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 600) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(80); }
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
console.log("bleed", await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), "height", h);
await p.screenshot({ path: out, fullPage: true });
await b.close();

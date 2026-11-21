import { chromium } from "playwright";
const [url, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: "networkidle", timeout: 180000 });
await p.addStyleTag({ content: "[class*=cookie], #cookie-consent, .fixed.bottom-0 { display:none !important }" });
// scroll through so lazy content and in-view reveals fire
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 700) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
const secs = await p.$$eval("main > section, main > div > section, main section[aria-labelledby]", (els) => els.map((e) => ({ id: e.id, label: e.getAttribute("aria-labelledby") || e.querySelector("h2")?.textContent?.trim().slice(0, 60) || "", top: Math.round(e.getBoundingClientRect().top + window.scrollY), height: Math.round(e.getBoundingClientRect().height), words: (e.textContent || "").split(/\s+/).filter(Boolean).length })));
console.log(JSON.stringify(secs, null, 0));
await p.screenshot({ path: out, fullPage: true });
await b.close();

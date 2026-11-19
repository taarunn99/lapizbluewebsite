import { chromium } from 'playwright';
const url = process.argv[2];
const b = await chromium.launch({ channel: 'chrome', headless: false, args: ['--disable-blink-features=AutomationControlled'] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-AE' });
await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'commit', timeout: 90000 }).catch(() => {});
for (let i = 0; i < 10; i++) {
  await p.waitForTimeout(5000);
  const t = await p.title().catch(() => '');
  if (!/just a moment|verifying|attention required/i.test(t)) { console.log(`cleared after ${(i+1)*5}s, title: ${t}`); break; }
  if (i === 9) console.log('still challenged after 50s, title:', t);
}
const html = await p.content();
console.log('bytes', html.length);
const links = [...new Set([...html.matchAll(/href="(\/[^"]+)"/g)].map(m => m[1]))];
console.log('internal links:', links.length);
console.log(links.filter(l => !/user|node|admin|search/.test(l)).slice(0, 20).join('\n  '));
await b.close();

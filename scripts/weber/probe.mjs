import { chromium } from 'playwright';
const url = process.argv[2];
const headed = process.argv.includes('--headed');
const b = await chromium.launch({
  headless: !headed,
  args: ['--disable-blink-features=AutomationControlled', '--no-sandbox'],
});
const ctx = await b.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 900 },
  locale: 'en-AE',
});
await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
const p = await ctx.newPage();
const res = await p.goto(url, { waitUntil: 'commit', timeout: 70000 });
await p.waitForTimeout(12000);
const html = await p.content();
console.log('status', res?.status(), 'bytes', html.length, '| title:', await p.title());
const links = [...new Set([...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]))];
console.log('links total:', links.length);
console.log(links.filter(l => /product/i.test(l)).slice(0, 12).join('\n  '));
await b.close();

import { chromium } from 'playwright';
const url = process.argv[2] ?? 'https://www.mapei.com/profilpas/en/products/profiles-for-floors-and-coverings/category/stair-nosing-profiles';
const b = await chromium.launch();
const p = await b.newPage({ userAgent: 'Mozilla/5.0 (compatible; LapizBlueBot/1.0; +https://www.lapizblue.com)' });
// Consent and analytics never settle, and we do not need them to read a product list.
await p.route('**/*', (route) => {
  const u = route.request().url();
  if (/cookiebot|googletagmanager|google-analytics|doubleclick|hotjar|facebook|linkedin|youtube/i.test(u)) return route.abort();
  if (['image', 'media', 'font'].includes(route.request().resourceType())) return route.abort();
  return route.continue();
});
await p.goto(url, { waitUntil: 'commit', timeout: 60000 });
await p.waitForTimeout(10000);
const html = await p.content();
console.log('html bytes:', html.length);
const links = [...new Set([...html.matchAll(/href="([^"]*\/products\/[^"]*)"/g)].map(m => m[1]))]
  .filter(h => !h.includes('/category/') && h.split('/').filter(Boolean).length > 6);
console.log('product links:', links.length);
links.slice(0, 40).forEach(l => console.log('  ' + l));
await b.close();

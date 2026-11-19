import { chromium } from 'playwright';
const url = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
const calls = [];
p.on('response', r => { const u = r.url(); if (/restapi|MapeiApi|\.pdf/i.test(u)) calls.push(`${r.status()} ${u}`); });
await p.route('**/*', route => {
  const u = route.request().url();
  if (/cookiebot|googletagmanager|google-analytics|doubleclick|hotjar|facebook|linkedin|youtube/i.test(u)) return route.abort();
  if (['image','media','font'].includes(route.request().resourceType())) return route.abort();
  return route.continue();
});
await p.goto(url, { waitUntil: 'commit', timeout: 60000 });
await p.waitForTimeout(12000);
[...new Set(calls)].forEach(c => console.log(c));
await b.close();

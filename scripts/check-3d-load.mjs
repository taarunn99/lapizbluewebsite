/*
  Proves the 3D rule: no three.js at page load, the model mounts only when the
  explainer scrolls into view (or on tap). Run against a built server.
  Usage: node scripts/check-3d-load.mjs [url]
*/
import { chromium, webkit } from 'playwright';
const url = process.argv[2] || 'http://localhost:3210/brands/mapei';
for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch(name === 'chromium' ? { args: ['--use-gl=swiftshader', '--ignore-gpu-blocklist'] } : {});
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const js = [];
  page.on('request', (r) => { if (r.resourceType() === 'script') js.push(r.url()); });
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(800);
  const before = js.length;
  const hadCanvas = await page.$('canvas');
  // Scroll the explainer into view: autoload should bring three.js in after idle.
  await page.evaluate(() => document.querySelector('#hub-system-heading')?.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(4000);
  const canvas = await page.$('canvas');
  const after = js.length;
  const threeChunk = js.slice(before).filter((u) => /chunks/.test(u));
  console.log(`${name}: scripts at load ${before}, canvas before scroll ${!!hadCanvas}, canvas after scroll ${!!canvas}, extra chunks after scroll ${threeChunk.length}`);
  await browser.close();
}

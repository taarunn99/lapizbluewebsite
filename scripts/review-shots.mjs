import { webkit, devices } from 'playwright';
const urls = [
  ['mapeset-v2', '/brands/mapei/tile-adhesives-and-grouts/mapeset'],
];
const browser = await webkit.launch();
const outDir = process.argv[2];
for (const [name, path] of urls) {
  const url = 'http://localhost:3000' + path;
  const mctx = await browser.newContext({ ...devices['iPhone 14 Pro'] });
  const mp = await mctx.newPage();
  await mp.goto(url, { waitUntil: 'networkidle' });
  await mp.screenshot({ path: `${outDir}/${name}-mobile.png`, fullPage: true });
  await mctx.close();
  const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dp = await dctx.newPage();
  await dp.goto(url, { waitUntil: 'networkidle' });
  await dp.screenshot({ path: `${outDir}/${name}-desktop.png`, fullPage: true });
  await dctx.close();
}
await browser.close();
console.log('done');

import { webkit, devices } from 'playwright';
const pages = ['keraset', 'ultracolor-plus', 'kerapoxy'];
const browser = await webkit.launch();
const outDir = process.argv[2];
for (const slug of pages) {
  const url = `http://localhost:3000/brands/mapei/tile-adhesives-and-grouts/${slug}`;
  // iPhone profile
  const mctx = await browser.newContext({ ...devices['iPhone 14 Pro'] });
  const mp = await mctx.newPage();
  await mp.goto(url, { waitUntil: 'networkidle' });
  const bleed = await mp.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > docW + 1 || r.left < -1)) {
        const cs = getComputedStyle(el);
        if (cs.overflow !== 'hidden' && cs.position !== 'fixed') {
          bad.push(el.tagName + '.' + String(el.className).slice(0, 50) + ' right=' + Math.round(r.right) + ' left=' + Math.round(r.left) + ' docW=' + docW);
        }
      }
    });
    return { docScrollW: document.documentElement.scrollWidth, docClientW: document.documentElement.clientWidth, offenders: bad.slice(0, 8) };
  });
  console.log(slug, 'mobile bleed check:', JSON.stringify(bleed.docScrollW), 'vs', bleed.docClientW, bleed.offenders.length ? bleed.offenders : 'clean');
  await mp.screenshot({ path: `${outDir}/tds-${slug}-mobile.png`, fullPage: true });
  await mctx.close();
  const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dp = await dctx.newPage();
  await dp.goto(url, { waitUntil: 'networkidle' });
  await dp.screenshot({ path: `${outDir}/tds-${slug}-desktop.png`, fullPage: true });
  await dctx.close();
}
await browser.close();
console.log('done');

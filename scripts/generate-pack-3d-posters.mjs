// Renders every pack in data/discovery/pack-3d-plan.json as a static WebP
// poster. The poster is what the component falls back to, which is also what a
// crawler and a reduced motion visitor get, so it has to be the same fixed
// pose every time: globalThis.__pack3dPoster stops the idle rotation before
// any page script runs.
//
// The slug order comes from the plan file, and every canvas is found by the
// data-pack-slug attribute the bench page puts on it, so a screenshot can
// never end up saved under another product's name.
//
// Usage: node scripts/generate-pack-3d-posters.mjs <baseUrl> [debugDir]
// The app has to be built and served first: npm run build, then PORT=3100 npm start.
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const planPath = 'data/discovery/pack-3d-plan.json';
const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
const slugs = Object.keys(plan);
const base = process.argv[2] || 'http://localhost:3100';
const debugDir = process.argv[3];

const SIZE = 720;
const QUALITY = 82;

// A narrow viewport drops the bench grid to one column, so each canvas is
// rendered far larger than 720 and the poster is a downsample, never a blur up.
const VIEWPORT = { width: 620, height: 980 };

if (debugDir) fs.mkdirSync(debugDir, { recursive: true });

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });
const page = await ctx.newPage();
// esbuild/tsx shim, the poster pose flag, and the cookie consent key. Without
// the last one the site's consent bar sits across the bottom of the viewport
// and gets baked into any poster whose frame reaches that far down.
await page.addInitScript({
  content:
    'globalThis.__name = globalThis.__name || function (f) { return f; };' +
    'globalThis.__pack3dPoster = true;' +
    'try { localStorage.setItem("lapizblue-cookie-consent", "true"); } catch (e) {}',
});
page.on('console', (m) => {
  if (m.type() === 'error') console.log('console error:', m.text());
});
page.on('pageerror', (e) => console.log('pageerror:', e.message));

await page.goto(`${base}/dev/pack-3d`, { waitUntil: 'networkidle' });
await page.addStyleTag({ content: '[data-poster-hidden]{display:none !important;}' });

// Site chrome that floats over the page, the consent bar and the WhatsApp
// button among it, sits in front of the packs and gets baked into a poster.
// Anything that floats is marked here and hidden by the rule above.
const hideFloatingChrome = () =>
  page.evaluate(() => {
    document.querySelectorAll('body *').forEach((el) => {
      const pos = getComputedStyle(el).position;
      if (pos === 'fixed' || pos === 'sticky') el.setAttribute('data-poster-hidden', '');
    });
  });
await hideFloatingChrome();

let failures = 0;
let skipped = 0;
for (const slug of slugs) {
  // A product whose pack shot cannot produce an honest poster is marked in
  // the plan rather than left to be rediscovered. It keeps its flat pack shot
  // and no file is written here, so a bad poster cannot come back by accident.
  if (plan[slug].skipPoster) {
    console.log('skipPoster', slug, plan[slug].skipPosterReason || '');
    skipped += 1;
    continue;
  }

  const outFile = path.join('public', plan[slug].poster);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  const frame = page.locator(`[data-pack-slug="${slug}"]`);
  const count = await frame.count();
  if (count !== 1) {
    console.log('skip', slug, 'found', count, 'frames on the bench page');
    failures += 1;
    continue;
  }

  // Scrolling the frame into view is what mounts the renderer and starts the
  // loop, so every wait below happens after the element is already on screen.
  await frame.scrollIntoViewIfNeeded();
  const canvas = frame.locator('canvas');
  try {
    await canvas.waitFor({ state: 'visible', timeout: 30000 });
  } catch {
    console.log('skip', slug, 'no canvas appeared');
    failures += 1;
    continue;
  }
  // Texture decode, first paint, then a few more frames of settling. The pose
  // is frozen, so this only buys sharpness, never a different angle.
  await page.waitForTimeout(1800);
  // Chrome that mounted late still has to go before the shutter.
  await hideFloatingChrome();

  // The frame is aspect-square, so the capture has to be square too. On a cold
  // server the layout box has been seen settling late, and a non square capture
  // would be centre cropped by the resize below, which silently eats the top and
  // the bottom of the pack. Take it again rather than ship that.
  let buf = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const shot = await canvas.screenshot();
    const meta = await sharp(shot).metadata();
    if (Math.abs(meta.width - meta.height) <= 4) {
      buf = shot;
      break;
    }
    console.log('retry', slug, 'capture was', `${meta.width}x${meta.height}`, 'not square');
    await page.waitForTimeout(1200);
  }
  if (!buf) {
    console.log('skip', slug, 'never captured a square frame');
    failures += 1;
    continue;
  }

  if (debugDir) fs.writeFileSync(path.join(debugDir, `raw-${slug}.png`), buf);
  await sharp(buf).resize(SIZE, SIZE, { fit: 'cover' }).webp({ quality: QUALITY }).toFile(outFile);
  console.log('poster', slug, plan[slug].form, fs.statSync(outFile).size, 'bytes');
}

// Viewport only. The bench page is far too tall for a full page capture once
// every pack in the plan is on it, and the renderer refuses the screenshot.
if (debugDir) await page.screenshot({ path: path.join(debugDir, 'bench.png') });
await browser.close();

console.log(
  `done: ${slugs.length - failures - skipped}/${slugs.length} posters written, ` +
    `${skipped} skipped by the plan, ${failures} failed`,
);
if (failures > 0) process.exitCode = 1;

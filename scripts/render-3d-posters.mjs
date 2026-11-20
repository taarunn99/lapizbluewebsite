/*
  Renders the poster for every 3D scene and writes the poster index.

  Opens the bench page for each scene in headless Chromium (WebGL works there
  out of the box), waits for the first rendered frame, screenshots the canvas
  area, and encodes AVIF and WebP at 1200 and 640 wide into public/images/3d.
  Then writes src/data/scenes/posters.json listing only the scenes whose files
  are actually on disk, with a content hash as a cache busting version.

  Usage:  BASE=http://localhost:3211 node scripts/render-3d-posters.mjs [slug ...]
  Needs a running dev or built server on BASE.
*/
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = process.cwd();
const base = process.env.BASE || 'http://localhost:3211';
const outDir = path.join(root, 'public/images/3d');
const indexPath = path.join(root, 'src/data/scenes/posters.json');
fs.mkdirSync(outDir, { recursive: true });

// Scene slugs from the data file, without importing TS.
const src = fs.readFileSync(path.join(root, 'src/data/scenes/index.ts'), 'utf8');
const all = [...src.matchAll(/^\s{4}slug: "([^"]+)",/gm)].map((m) => m[1]);
const only = process.argv.slice(2);
const slugs = only.length ? all.filter((s) => only.includes(s)) : all;

const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 1300, height: 1000 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

let done = 0;
for (const slug of slugs) {
  const url = `${base}/dev/3d/${slug}?poster=1`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  // The bench lives inside the site layout; the header, footer, floating
  // button and cookie bar must not be in the capture.
  await page.addStyleTag({ content: 'body > *:not(:has(#scene)) { display: none !important } main { padding: 0 !important }' });
  await page.waitForSelector('[data-ready="1"]', { timeout: 60000, state: 'attached' });
  await page.waitForTimeout(300);
  const el = await page.$('#scene');
  if (!el) throw new Error(`no #scene on ${url}`);
  const png = await el.screenshot({ type: 'png', omitBackground: false });
  for (const w of [1200, 640]) {
    const img = sharp(png).resize(w, Math.round(w * 0.75), { fit: 'cover', background: '#ffffff' }).flatten({ background: '#ffffff' });
    await img.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${slug}-${w}.webp`));
    await img.clone().avif({ quality: 55 }).toFile(path.join(outDir, `${slug}-${w}.avif`));
  }
  done++;
  console.log(`${slug}: poster written`);
}
await browser.close();

// Index: only what exists on disk, for every known scene.
const index = {};
for (const slug of all) {
  const widths = [1200, 640].filter((w) => ['webp', 'avif'].every((e) => fs.existsSync(path.join(outDir, `${slug}-${w}.${e}`))));
  if (widths.length === 0) continue;
  const hash = crypto.createHash('sha1').update(fs.readFileSync(path.join(outDir, `${slug}-1200.webp`))).digest('hex').slice(0, 8);
  index[slug] = { widths, version: hash };
}
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');
const sizes = fs.readdirSync(outDir).map((f) => fs.statSync(path.join(outDir, f)).size);
console.log(`\n${done} rendered, ${Object.keys(index).length} of ${all.length} scenes in the index, ${sizes.length} files, ${Math.round(sizes.reduce((a, b) => a + b, 0) / 1024)} KB total`);

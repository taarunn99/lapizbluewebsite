#!/usr/bin/env node
// Turns the FILA pack shots the owner supplies into the site's pack shot
// format: white keyed out to transparency, trimmed, centred in a 600 by 600
// square, written as webp beside the ones already on disk.
//
// Usage: node scripts/fila-packshots.mjs [source folder]
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2] || `${process.env.HOME}/Downloads`;
const OUT = 'public/images/brands/fila';
const SIZE = 600;

// Supplied file to the product it belongs to. The file names come from FILA's
// own catalogue exports, so they are matched by hand once and kept here.
const MAP = {
  'cleanshine-ar.png': ['cleaners', 'clean-and-shine'],
  '47227506ING_DEEPCLEAN_FRNT.png': ['cleaners', 'deepclean'],
  '56750112ING_INSTANTREMOVER_750ML_FRNT.png': ['cleaners', 'instant-remover'],
  '47267506ING_MARBLEREFRESH_FRNT.png': ['cleaners', 'marble-refresh'],
  'images (2).jpeg': ['cleaners', 'max'],
  '47137506SPP_NODROPS_750ML_FRNT.png': ['cleaners', 'nodrops'],
  'norust-mul.png': ['cleaners', 'norust'],
  'nospot-mul.png': ['cleaners', 'nospot'],
  'phzero-ar.png': ['cleaners', 'phzero'],
  'zerosil-mul.png': ['cleaners', 'zerosil'],
  'Classic fila.jpg': ['sealers', 'classic'],
  'concretehydro-ar.png': ['sealers', 'concrete-hydro'],
  'concreteshield-mul-1.png': ['sealers', 'concrete-shield'],
  'contractorschoice-can.png': ['sealers', 'contractors-choice'],
  '47297506ING_FUGAPROOF_750ML_FRNT.png': ['sealers', 'fugaproof'],
  '70720012ING_HYDROREPECO_1L_FRNT.png': ['sealers', 'hydrorep-eco'],
  'longlife-en.png': ['sealers', 'longlife'],
  '60100006ING_MP90_1L_FRNT.png': ['sealers', 'mp90'],
  'mp90 eco extreme.jpeg': ['sealers', 'mp90-eco-xtreme'],
  '75100005ISP_PW10_5L_FRNT.png': ['sealers', 'pw10'],
  'stoneplus-en.png': ['sealers', 'stoneplus'],
  'STOPDIRT-SPA.png': ['sealers', 'stop-dirt'],
  '70100012ING_W68_1L_FRNT.png': ['sealers', 'w68'],
};

/** White background to transparency, with a soft ramp so the edges stay clean. */
async function keyWhite(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const distance = Math.max(255 - r, 255 - g, 255 - b);
    const alpha = Math.min(255, Math.max(0, (distance - 6) * 255 / 26));
    data[i + 3] = Math.min(data[i + 3], alpha);
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

let done = 0, missing = [];
for (const [file, [line, slug]] of Object.entries(MAP)) {
  const from = path.join(SRC, file);
  if (!fs.existsSync(from)) { missing.push(file); continue; }
  const keyed = await keyWhite(from);
  const trimmed = await sharp(keyed).trim({ threshold: 6 }).toBuffer();
  const m = await sharp(trimmed).metadata();
  const scale = Math.min((SIZE - 40) / m.width, (SIZE - 40) / m.height);
  const w = Math.max(1, Math.round(m.width * scale));
  const h = Math.max(1, Math.round(m.height * scale));
  const resized = await sharp(trimmed).resize(w, h).toBuffer();
  const to = path.join(OUT, line, `${slug}.webp`);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: resized, left: Math.round((SIZE - w) / 2), top: Math.round((SIZE - h) / 2) }])
    .webp({ quality: 86, alphaQuality: 92 })
    .toFile(to);
  const kb = Math.round(fs.statSync(to).size / 1024);
  console.log(`  ${slug.padEnd(20)} ${w}x${h} in ${SIZE}x${SIZE}  ${kb} kB`);
  done++;
}
console.log(`\n${done} pack shots written to ${OUT}`);
if (missing.length) console.log(`not found in ${SRC}: ${missing.join(', ')}`);

/**
 * Encode a hero image into the pre-rendered AVIF and WebP set that
 * StaticHeroPicture expects.
 *
 * The site never serves heroes through the on demand image optimizer, because
 * it is cold after every deploy and the hero is the LCP element. Instead each
 * hero ships as `${base}-${width}.avif` and `${base}-${width}.webp` at the five
 * widths the component asks for, plus a plain `${base}.webp` fallback that the
 * older next/image call sites still reference.
 *
 * Usage:
 *   npx tsx scripts/encode-hero-set.ts <source> <public-base-path>
 *   npx tsx scripts/encode-hero-set.ts --from-json heroes.json <public-dir>
 *
 * Example:
 *   npx tsx scripts/encode-hero-set.ts hero.png /images/brands/vetonit/hero
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const WIDTHS = [640, 828, 1200, 1440, 1920];

// Quality settings chosen so a 1920 wide hero lands comfortably under 200 KB
// in AVIF while staying visually clean on a large display.
const AVIF = { quality: 62, effort: 6 } as const;
const WEBP = { quality: 82, effort: 6 } as const;

async function encode(source: Buffer, publicBase: string): Promise<number> {
  const abs = path.join(process.cwd(), 'public', publicBase.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  let bytes = 0;
  for (const w of WIDTHS) {
    const resized = sharp(source).resize({ width: w, withoutEnlargement: true });
    const avifPath = `${abs}-${w}.avif`;
    const webpPath = `${abs}-${w}.webp`;
    await resized.clone().avif(AVIF).toFile(avifPath);
    await resized.clone().webp(WEBP).toFile(webpPath);
    bytes += fs.statSync(avifPath).size + fs.statSync(webpPath).size;
  }
  // Plain fallback for call sites that still point at the bare .webp.
  await sharp(source).resize({ width: 1440, withoutEnlargement: true }).webp(WEBP).toFile(`${abs}.webp`);
  bytes += fs.statSync(`${abs}.webp`).size;
  return bytes;
}

async function load(source: string): Promise<Buffer> {
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`fetch failed ${res.status} for ${source}`);
    return Buffer.from(await res.arrayBuffer());
  }
  return fs.readFileSync(source);
}

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === '--from-json') {
    // { "<name>": "<url or path>" } encoded into <dir>/<name>/hero
    const map: Record<string, string> = JSON.parse(fs.readFileSync(args[1], 'utf8'));
    const dir = args[2];
    if (!dir) throw new Error('usage: --from-json <file> <public-dir>');
    for (const [name, src] of Object.entries(map)) {
      const base = `${dir.replace(/\/$/, '')}/${name}/hero`;
      const bytes = await encode(await load(src), base);
      console.log(`  ${name.padEnd(28)} -> ${base}  ${(bytes / 1024).toFixed(0)} KB across 11 files`);
    }
    return;
  }

  const [source, base] = args;
  if (!source || !base) {
    console.error('usage: npx tsx scripts/encode-hero-set.ts <source> <public-base-path>');
    process.exit(1);
  }
  const bytes = await encode(await load(source), base);
  console.log(`${base}  ${(bytes / 1024).toFixed(0)} KB across 11 files`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

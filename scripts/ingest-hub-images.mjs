/*
  Encodes the generated brand photographs into the responsive sets the hub
  sections use, and writes the index the components read.

  Input: a folder of PNGs named mood-<n>.png and site-<n>.png where n is the
  brand index below. Output: public/images/brands/<slug>/hub-{mood,site}-{640,1200,1600}.{avif,webp}
  and src/data/hub-images.json listing what exists.

  Usage: node scripts/ingest-hub-images.mjs <folder>
*/
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const BRANDS = { 1: 'mapei', 2: 'kerakoll', 3: 'weber', 4: 'laticrete', 5: 'pidilite-puma', 6: 'profilpas', 7: 'akzonobel', 8: 'fila', 9: 'kalinga-stone' };
const root = process.cwd();
const src = process.argv[2];
if (!src) throw new Error('folder required');
const outIndexPath = path.join(root, 'src/data/hub-images.json');
const index = fs.existsSync(outIndexPath) ? JSON.parse(fs.readFileSync(outIndexPath, 'utf8')) : {};

for (const f of fs.readdirSync(src).filter((f) => /^(mood|site)-\d+\.png$/.test(f))) {
  const [, kind, n] = f.match(/^(mood|site)-(\d+)\.png$/);
  const slug = BRANDS[Number(n) % 10];
  if (!slug) continue;
  const dir = path.join(root, 'public/images/brands', slug);
  fs.mkdirSync(dir, { recursive: true });
  const ratio = kind === 'mood' ? 2 / 3 : 9 / 16;
  const widths = [640, 1200, 1600];
  for (const w of widths) {
    const img = sharp(path.join(src, f)).resize(w, Math.round(w * ratio), { fit: 'cover' }).withMetadata({});
    await img.clone().webp({ quality: 82 }).toFile(path.join(dir, `hub-${kind}-${w}.webp`));
    await img.clone().avif({ quality: 52 }).toFile(path.join(dir, `hub-${kind}-${w}.avif`));
  }
  index[slug] = { ...(index[slug] || {}), [kind]: { widths, ratio: kind === 'mood' ? '3:2' : '16:9' } };
  console.log(`${slug} ${kind}: encoded`);
}
fs.writeFileSync(outIndexPath, JSON.stringify(index, null, 2) + '\n');
const files = fs.readdirSync(path.join(root, 'public/images/brands'), { recursive: true }).filter((f) => /hub-(mood|site)-/.test(f));
console.log(`${files.length} files in the sets`);

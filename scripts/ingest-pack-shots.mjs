/*
  Take pack shots the owner has dropped in Downloads/<brand>/ and wire them in.

  Guards built from the misses on this job: case insensitive, recursive, and a
  filename has to name the product and nothing more, because loose matching
  had handed webercol Fix the file for Fix 401 and weberjoint the one for
  weberjoint Perfect, neither of which we sell.

  Encoded the way the product page consumes it. next/image is configured for
  avif then webp and resizes per breakpoint, so one clean source at twice the
  largest rendered size is the whole job: 1200 px, webp q85, white matted so a
  transparent source does not go grey in dark mode, metadata stripped.

  node scripts/ingest-pack-shots.mjs [brand ...] [--dry]
*/
import fs from 'fs';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const BRANDS = args.filter((a) => !a.startsWith('--'));
const DL = path.join(os.homedir(), 'Downloads');
const manifest = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));

function walk(dir, depth = 0) {
  if (depth > 3 || !fs.existsSync(dir)) return [];
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(full, depth + 1));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(e.name)) out.push(full);
  }
  return out;
}

const toks = (s) => s.toLowerCase()
  .replace(/_[0-9a-f]{24,}/gi, ' ')
  .replace(/\b(lapiz|copy|final|cropper|image|photo|product|tds|uae|new)\b/gi, ' ')
  // a dimension is two numbers however it is written: 20x10, 20*10, 20 x 10
  .replace(/(\d+)\s*[x*×]\s*(\d+)/g, '$1 $2')
  .replace(/[^a-z0-9]+/g, ' ')
  .split(' ').filter(Boolean);

const HARMLESS = new Set(['grey', 'gray', 'white', 'kg', 'lt', 'ltr', 'l', 'bag', 'pack',
  'jpeg', 'jpg', 'png', 'webp', 'avif', 'mapei', 'weber']);
const sig = (list) => new Set(list.filter((t) => !HARMLESS.has(t)));

let placed = [], ambiguous = [], unplaced = [];

for (const brand of BRANDS) {
  const files = walk(path.join(DL, brand));
  const need = manifest.filter((r) => r.brand === brand && r.image.status !== 'found');
  const claimed = new Set();

  for (const rec of need) {
    const want = sig(toks(rec.name));
    const exact = files.filter((f) => {
      const have = sig(toks(path.basename(f, path.extname(f))));
      return have.size === want.size && [...want].every((t) => have.has(t));
    });
    if (!exact.length) continue;
    if (exact.length > 1) ambiguous.push([rec.name, exact.map((f) => path.basename(f))]);
    placed.push([rec, exact[0]]);
    exact.forEach((f) => claimed.add(f));
  }
  files.filter((f) => !claimed.has(f)).forEach((f) => unplaced.push([brand, path.basename(f)]));
  const got = placed.filter(([r]) => r.brand === brand).length;
  console.log(`${brand}: ${files.length} images, ${got} place exactly, ${need.length - got} products still without one`);
}

if (ambiguous.length) {
  console.log('\nmore than one candidate, first taken:');
  ambiguous.forEach(([n, l]) => console.log(`  ${n}: ${l.join(', ')}`));
}
if (unplaced.length) {
  console.log(`\n${unplaced.length} image(s) matched no product that needs one:`);
  unplaced.forEach(([b, f]) => console.log(`  ${b}/${f}`));
}

if (DRY) { console.log('\ndry run, nothing written'); process.exit(0); }

let bytes = 0;
for (const [rec, src] of placed) {
  const dest = path.join('public/images/brands', rec.brand, rec.product_line, `${rec.slug}.webp`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(fs.readFileSync(src))
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .webp({ quality: 85, effort: 6 })
    .toFile(dest);
  rec.image = { status: 'found', path: `/${path.relative('public', dest)}`,
                source_url: `Supplied by the owner: ${path.basename(src)}` };
  bytes += fs.statSync(dest).size;
}
fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${placed.length} placed, ${(bytes / 1024).toFixed(0)} KB total, ${(bytes / 1024 / Math.max(1, placed.length)).toFixed(1)} KB average`);
for (const b of BRANDS) {
  const all = manifest.filter((r) => r.brand === b);
  console.log(`  ${b}: ${all.filter((r) => r.image.status === 'found').length} of ${all.length} now have a pack shot`);
}

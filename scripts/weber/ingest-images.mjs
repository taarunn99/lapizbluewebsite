/*
  Take whatever Weber pack shots are sitting in Downloads and wire them in.

  Written after three separate misses on this job, each one now guarded:
    - the first scan globbed weber* and so could not see Webercol_prime
    - it looked only at the top level and missed a WhatsApp subfolder
    - loose matching handed webercol Fix the file for webercol Fix 401,
      weberfloor Rapid the one for Rapid 40, and weberjoint the one for
      weberjoint Perfect, none of which are products we sell

  So: case insensitive, recursive, and a filename has to name the product and
  nothing more. Anything it cannot place is listed rather than guessed at.

  node scripts/weber/ingest-images.mjs [--dry]
*/
import fs from 'fs';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

const DRY = process.argv.includes('--dry');
const DL = path.join(os.homedir(), 'Downloads');
const manifest = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const weber = manifest.filter((r) => r.brand === 'weber');

/** Every image under Downloads, a couple of folders deep, any case. */
function walk(dir, depth = 0) {
  if (depth > 3) return [];
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(full, depth + 1));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name) && /weber/i.test(e.name)) out.push(full);
  }
  return out;
}

const toks = (s) => s.toLowerCase()
  .replace(/_[0-9a-f]{24,}/gi, ' ')          // Weber's CDN hash
  .replace(/\blapiz\b|\bcopy\b|\bfinal\b|\bcropper\b|\d+x\d+/gi, ' ')
  .replace(/[^a-z0-9]+/g, ' ')
  .split(' ').filter(Boolean);

/** Words in a filename that never change which product it is. */
const HARMLESS = new Set(['weber', 'grey', 'gray', 'white', 'kg', 'lt', 'ltr', 'bag',
  'pack', 'jpeg', 'jpg', 'png', 'webp', 'image', 'product', 'tds', 'uae']);
const sig = (list) => new Set(list.filter((t) => !HARMLESS.has(t)));

const files = fs.existsSync(DL) ? walk(DL) : [];
const placed = [];
const ambiguous = [];
const leftover = new Set(files);

for (const rec of weber) {
  if (rec.image.status === 'found') continue;
  const want = sig(toks(rec.name));
  const exact = files.filter((f) => {
    const have = sig(toks(path.basename(f, path.extname(f))));
    // same set both ways: the file names this product and nothing else
    return have.size === want.size && [...want].every((t) => have.has(t));
  });
  if (exact.length === 0) continue;
  if (exact.length > 1) ambiguous.push([rec.name, exact.map((f) => path.basename(f))]);
  placed.push([rec, exact[0]]);
  exact.forEach((f) => leftover.delete(f));
}

if (DRY) {
  console.log(`${files.length} Weber images under Downloads, ${placed.length} place exactly\n`);
  for (const [r, f] of placed) console.log(`  ${r.name.padEnd(26)} ${path.basename(f)}`);
  if (ambiguous.length) { console.log('\nmore than one candidate, first taken:'); ambiguous.forEach(([n, l]) => console.log(`  ${n}: ${l.join(', ')}`)); }
  const still = weber.filter((r) => r.image.status !== 'found' && !placed.find(([x]) => x === r));
  console.log(`\n${still.length} products still without a photo`);
  if (leftover.size) { console.log(`\n${leftover.size} image(s) matched no product:`); [...leftover].forEach((f) => console.log('  ', path.basename(f))); }
} else {
  for (const [rec, src] of placed) {
    const dest = path.join('public/images/brands/weber', rec.product_line, `${rec.slug}.webp`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    // next/image serves avif then webp off this, so one clean source at twice
    // the largest rendered size is the whole job
    await sharp(fs.readFileSync(src))
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#ffffff' })
      .webp({ quality: 85, effort: 6 })
      .toFile(dest);
    rec.image = { status: 'found', path: `/${path.relative('public', dest)}`,
                  source_url: `Supplied by the owner: ${path.basename(src)}` };
    console.log(`  ${rec.name.padEnd(26)} ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`);
  }
  fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  const have = weber.filter((r) => r.image.status === 'found').length;
  console.log(`\n${placed.length} placed. Weber pack shots now ${have} of ${weber.length}.`);
  if (leftover.size) { console.log(`\n${leftover.size} image(s) matched no product:`); [...leftover].forEach((f) => console.log('  ', path.basename(f))); }
}

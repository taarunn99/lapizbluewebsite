/*
  Host the Weber sheets and pack shots, and stamp each record with the hash
  and size of the file that actually landed, which check-manifest re-reads.

  node scripts/weber/fetch-assets.mjs
*/
import fs from 'fs'; import os from 'os'; import path from 'path'; import crypto from 'crypto';
import sharp from 'sharp';

const DL = path.join(os.homedir(), 'Downloads');
// The manifest is the live record; the staging file goes stale once images move.
const all = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const recs = all.filter((r) => r.brand === 'weber');
const verified = JSON.parse(fs.readFileSync('data/incoming/weber-verified.json', 'utf8'));
const images = JSON.parse(fs.readFileSync('/tmp/weber_images.json', 'utf8'));
const slugOf = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fileFor = new Map(verified.map((v) => [slugOf(v.product), v.file]));

fs.mkdirSync('public/tds/weber', { recursive: true });
let sheets = 0, shots = 0;

for (const r of recs) {
  if (r.tds.status === 'verified') {
    const src = path.join(DL, fileFor.get(r.slug) || '');
    if (fs.existsSync(src)) {
      const dest = path.join('public/tds/weber', `${r.slug}.pdf`);
      fs.copyFileSync(src, dest);
      const buf = fs.readFileSync(dest);
      r.tds.sha256 = crypto.createHash('sha256').update(buf).digest('hex');
      r.tds.size_bytes = buf.length;
      r.tds.source_url = `Supplied by the owner from Weber: ${path.basename(src)}`;
      sheets++;
    }
  }
  if (r.image.status === 'found') {
    const name = images[r.name];
    if (!name) { console.log(`  no source image for ${r.name}, skipped`); continue; }
    const src = path.join(DL, name);
    if (!fs.existsSync(src)) { console.log(`  missing ${name}, skipped`); continue; }
    const dest = path.join('public', r.image.path);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    await sharp(src)
      .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#ffffff' })
      .webp({ quality: 82 })
      .toFile(dest);
    shots++;
  }
}
fs.writeFileSync('data/manifest.json', JSON.stringify(all, null, 2) + '\n');
console.log(`${sheets} sheets hosted, ${shots} pack shots written`);

/*
  Put the Profilpas sheets and pack shots where the site serves them from, and
  stamp each record with the hash and size of the file that actually landed.

  check-manifest.ts re-reads every hosted PDF and fails the build if the hash
  or the byte count disagrees with the record, so these are computed from the
  written file rather than copied from the crawl.

  Images come from Profilpas's own CDN. The catalogue hands out a thumbnail;
  dropping the ".tmb-mapei thum" segment gives the original, which is what is
  resized here.

  Usage: node scripts/profilpas/fetch-assets.mjs
*/
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const records = JSON.parse(fs.readFileSync('data/incoming/profilpas-records.json', 'utf8'));
const crawl = JSON.parse(fs.readFileSync('data/discovery/profilpas-crawl.json', 'utf8'));
/** Records carry the tidied slug, the crawl carries Profilpas's raw one. */
const tidy = (s) => s.replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '');
const bySlug = Object.fromEntries(crawl.products.map((p) => [tidy(p.slug), p]));

fs.mkdirSync('public/tds/profilpas', { recursive: true });

let sheets = 0, images = 0, imageFails = [];

for (const rec of records) {
  const src = bySlug[rec.slug];

  // 1. the data sheet
  if (rec.tds.status === 'verified' && src?.tdsFile && fs.existsSync(src.tdsFile)) {
    const dest = path.join('public/tds/profilpas', `${rec.slug}.pdf`);
    fs.copyFileSync(src.tdsFile, dest);
    const buf = fs.readFileSync(dest);
    rec.tds.sha256 = crypto.createHash('sha256').update(buf).digest('hex');
    rec.tds.size_bytes = buf.length;
    sheets++;
  }

  // 2. the pack shot
  const outDir = path.join('public/images/brands/profilpas', rec.product_line);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${rec.slug}.webp`);
  if (fs.existsSync(outFile)) { images++; continue; }

  const thumb = src?.image;
  if (!thumb) { imageFails.push([rec.name, 'no image url in the catalogue']); continue; }
  const full = thumb.replace(/\.tmb-mapei[%20 ]+\w+\.jpg/i, '.jpg');

  let ok = false;
  for (const url of [full, thumb]) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(45000) });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 2000) continue;
      await sharp(buf)
        .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true, background: { r: 255, g: 255, b: 255 } })
        .flatten({ background: '#ffffff' })
        .webp({ quality: 82 })
        .toFile(outFile);
      ok = true;
      images++;
      break;
    } catch { /* fall through to the thumbnail, then report */ }
  }
  if (!ok) imageFails.push([rec.name, 'could not fetch or encode']);
  await sleep(350);
}

fs.writeFileSync('data/incoming/profilpas-records.json', JSON.stringify(records, null, 2) + '\n');
console.log(`${sheets} sheets hosted, ${images} of ${records.length} images written.`);
if (imageFails.length) {
  console.log(`\n${imageFails.length} image(s) not obtained:`);
  for (const [n, why] of imageFails) console.log(`  ${n}: ${why}`);
}

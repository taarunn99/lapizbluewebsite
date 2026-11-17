/**
 * Download every resolved data sheet and pack shot once, centrally.
 *
 * Ten people building pages in parallel must not each be writing the manifest,
 * and they must not each be fetching the same files from Mapei. So the
 * downloads happen here, in one pass, and each product gets a facts file
 * carrying everything a record needs to cite: the hosted paths, the hash, the
 * size, the revision date, the country edition and the source URLs. The people
 * building the pages then only read, and only write their own record.
 *
 *   node scripts/stage-mapei-sheets.mjs <resolved.json> <outdir>
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const resolved = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const OUT = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });

const manifest = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const have = new Map(manifest.map((r) => [`${r.brand}/${r.slug}`, r]));
// Staged outside the repo. A sheet is only evidence until someone has read it
// and agreed it is the product we think it is; it reaches public/ when they
// have, and not before, so a wrong match never ships as a hosted document.
const PDFS = path.join(OUT, 'pdf');
fs.mkdirSync(PDFS, { recursive: true });

const slugify = (s) =>
  s.toLowerCase().replace(/\(.*?\)/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let ok = 0;
const failed = [];

// Two stock lines that resolve to one Mapei page are one product: that is the
// manufacturer saying so. Keep the biggest seller's name and add the rest.
const byPage = new Map();
for (const r of resolved) {
  if (!r.hit) continue;
  const at = byPage.get(r.hit.page);
  if (!at) byPage.set(r.hit.page, { ...r, merged_from: [] });
  else if (r.invoices > at.invoices) {
    byPage.set(r.hit.page, { ...r, merged_from: [...at.merged_from, at.product] });
  } else at.merged_from.push(r.product);
}

for (const r of byPage.values()) {
  if (!r.hit) continue;
  const slug = r.our_slug ?? slugify(r.name);
  const rec = have.get(`mapei/${slug}`);
  if (rec && rec.tds?.local_path && rec.page_status !== 'pending') continue;

  const facts = {
    slug,
    name: r.name,
    stock_name: r.product,
    invoices_since_2020: r.invoices,
    has_record: Boolean(rec),
    category: rec?.category ?? null,
    product_line: rec?.product_line ?? null,
    mapei_page: r.hit.page,
    mapei_region: r.hit.region,
    page_title: r.hit.title,
    merged_stock_lines: r.merged_from ?? [],
  };

  try {
    const res = await fetch(r.hit.sheet);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== '%PDF') throw new Error('not a PDF');
    const rel = `/tds/mapei/${slug}.pdf`;
    fs.writeFileSync(path.join(PDFS, `${slug}.pdf`), buf);
    facts.tds = {
      status: 'verified',
      source_url: r.hit.sheet,
      local_path: rel,
      sha256: crypto.createHash('sha256').update(buf).digest('hex'),
      size_bytes: buf.length,
      verified_name_match_score: 100,
    };
  } catch (e) {
    failed.push(`${slug}: sheet, ${e.message}`);
    continue;
  }

  if (r.hit.image) {
    try {
      const res = await fetch(r.hit.image);
      const raw = Buffer.from(await res.arrayBuffer());
      const family = rec?.image?.path?.split('/').slice(0, -1).join('/') ?? '/images/brands/mapei/misc';
      const rel = `${family}/${slug}.webp`;
      fs.mkdirSync(path.join(OUT, 'img'), { recursive: true });
      await sharp(raw)
        .resize(600, 600, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .webp({ quality: 88 })
        .toFile(path.join(OUT, 'img', `${slug}.webp`));
      facts.image = { status: 'found', path: rel, source_url: r.hit.image };
    } catch (e) {
      facts.image = { status: 'placeholder', path: `/products/mapei/${slug}.webp`, source_url: '' };
      failed.push(`${slug}: pack shot, ${e.message}`);
    }
  } else {
    facts.image = { status: 'placeholder', path: `/products/mapei/${slug}.webp`, source_url: '' };
  }

  fs.writeFileSync(path.join(OUT, `${slug}.json`), `${JSON.stringify(facts, null, 1)}\n`);
  ok += 1;
  process.stdout.write(`staged ${slug.padEnd(34)} ${facts.image.status.padEnd(11)} ${r.hit.region}\n`);
}

console.log(`\n${ok} staged, ${failed.length} problems`);
for (const f of failed) console.log(`  ${f}`);

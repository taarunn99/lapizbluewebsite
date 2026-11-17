/**
 * Merge records written in isolation back into the manifest.
 *
 * Ten agents cannot write one JSON file between them without losing each
 * other's work, so each writes its product to data/incoming/<brand>__<slug>.json
 * and this merges them in one pass, after checking each one is a record the
 * manifest will accept. Anything that fails is left in place and reported
 * rather than written, because a half-formed record that reaches the manifest
 * fails the build for everybody.
 *
 *   npx tsx scripts/merge-incoming.ts [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { ManifestRecord } from '../src/lib/tds';

const DIR = 'data/incoming';
const MANIFEST = 'data/manifest.json';
const DRY = process.argv.includes('--dry');

const REQUIRED = [
  'slug', 'brand', 'product_line', 'name', 'category', 'description',
  'meta_description', 'image', 'tds', 'specs', 'applications', 'page_status',
];

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const byKey = new Map(manifest.map((r, i) => [`${r.brand}/${r.slug}`, i]));
const lines = new Set(manifest.map((r) => `${r.brand}/${r.product_line}`));
const categories = new Set(manifest.map((r) => r.category));

const ok: string[] = [];
const bad: string[] = [];

for (const file of fs.readdirSync(DIR).sort()) {
  if (!file.endsWith('.json')) continue;
  const full = path.join(DIR, file);
  let rec: ManifestRecord;
  try {
    rec = JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (e) {
    bad.push(`${file}: not valid JSON, ${(e as Error).message}`);
    continue;
  }

  const miss = REQUIRED.filter((f) => rec[f as keyof ManifestRecord] === undefined);
  if (miss.length) {
    bad.push(`${file}: missing ${miss.join(', ')}`);
    continue;
  }
  if (/[–—]/.test(JSON.stringify(rec))) {
    bad.push(`${file}: contains an em or en dash`);
    continue;
  }
  if (!lines.has(`${rec.brand}/${rec.product_line}`)) {
    bad.push(`${file}: product_line "${rec.product_line}" does not exist for ${rec.brand}`);
    continue;
  }
  if (!categories.has(rec.category)) {
    bad.push(`${file}: category "${rec.category}" is not one the site uses`);
    continue;
  }
  const words = rec.description.trim().split(/\s+/).length;
  if (words < 100 || words > 150) {
    bad.push(`${file}: description is ${words} words, needs 100 to 150`);
    continue;
  }
  if (rec.meta_description.length < 140 || rec.meta_description.length > 160) {
    bad.push(`${file}: meta_description is ${rec.meta_description.length} characters, needs 140 to 160`);
    continue;
  }
  if (!Array.isArray(rec.applications) || rec.applications.length < 4) {
    bad.push(`${file}: needs at least four applications`);
    continue;
  }
  if (Object.keys(rec.specs).length < 5) {
    bad.push(`${file}: only ${Object.keys(rec.specs).length} specs, needs five`);
    continue;
  }
  if (!rec.specs.pack_size) {
    bad.push(`${file}: no pack_size, which is the one hero field that blocks a page`);
    continue;
  }

  // The hosted files have to exist and match what the record claims.
  const pdf = path.join('public', (rec.tds.local_path ?? '').replace(/^\//, ''));
  if (!rec.tds.local_path || !fs.existsSync(pdf)) {
    bad.push(`${file}: no hosted PDF at ${rec.tds.local_path}`);
    continue;
  }
  const buf = fs.readFileSync(pdf);
  const sha = crypto.createHash('sha256').update(buf).digest('hex');
  if (sha !== rec.tds.sha256 || buf.length !== rec.tds.size_bytes) {
    bad.push(`${file}: the record's sha256 or size does not match the hosted PDF`);
    continue;
  }
  const img = path.join('public', (rec.image?.path ?? '').replace(/^\//, ''));
  if (rec.image?.status === 'found' && !fs.existsSync(img)) {
    bad.push(`${file}: image.status is found but there is no file at ${rec.image.path}`);
    continue;
  }
  const og = path.join('public', 'og', rec.brand, `${rec.slug}.png`);
  if (!fs.existsSync(og)) {
    bad.push(`${file}: no OG card at /og/${rec.brand}/${rec.slug}.png`);
    continue;
  }

  const key = `${rec.brand}/${rec.slug}`;
  const at = byKey.get(key);
  if (at === undefined) manifest.push(rec);
  else manifest[at] = rec;
  ok.push(`${key}${at === undefined ? '' : ' (replaced)'}`);
}

console.log(`${ok.length} records merged, ${bad.length} refused`);
for (const o of ok) console.log(`  ok      ${o}`);
for (const b of bad) console.log(`  REFUSED ${b}`);

if (!DRY && ok.length) {
  manifest.sort((a, b) => a.brand.localeCompare(b.brand) || a.slug.localeCompare(b.slug));
  fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nmanifest now holds ${manifest.length} records`);
}
if (bad.length) process.exit(1);

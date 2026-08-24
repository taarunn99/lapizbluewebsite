/*
  Pre-build definition of done validator (handover section 9). For every
  manifest record with page_status generated or live, checks: verified TDS
  with score >= 90, hosted PDF exists with matching sha256, hero fields
  complete, at least 5 spec fields, description 100 to 150 words,
  meta_description present, image real or an explicitly flagged placeholder,
  equivalents exact match, OG image present, and zero em or en dashes in any
  manifest string. Exit 1 on any failure.

  Usage: npx tsx scripts/check-manifest.ts
*/
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { ManifestRecord } from '../src/lib/tds';
import { heroFields } from './lib/spec-maps';

const REPO = process.cwd();
const manifest: ManifestRecord[] = JSON.parse(
  fs.readFileSync(path.join(REPO, 'data', 'manifest.json'), 'utf8')
);

let failures = 0;
const fail = (slug: string, msg: string) => {
  console.error(`FAIL ${slug}: ${msg}`);
  failures++;
};

const rawManifest = fs.readFileSync(path.join(REPO, 'data', 'manifest.json'), 'utf8');
if (/[–—]/.test(rawManifest)) {
  console.error('FAIL manifest: contains em or en dashes');
  failures++;
}

for (const rec of manifest) {
  if (rec.page_status !== 'generated' && rec.page_status !== 'live') continue;

  if (rec.tds.status !== 'verified') fail(rec.slug, `tds.status is ${rec.tds.status}, not verified`);
  if (rec.tds.verified_name_match_score < 90)
    fail(rec.slug, `verify score ${rec.tds.verified_name_match_score} below 90`);
  if (!rec.tds.source_url) fail(rec.slug, 'tds.source_url missing');

  const pdfPath = path.join(REPO, 'public', rec.tds.local_path.replace(/^\//, ''));
  if (!fs.existsSync(pdfPath)) {
    fail(rec.slug, `hosted PDF missing at ${rec.tds.local_path}`);
  } else {
    const buf = fs.readFileSync(pdfPath);
    if (buf.subarray(0, 4).toString() !== '%PDF') fail(rec.slug, 'hosted file is not a PDF');
    const sha = crypto.createHash('sha256').update(buf).digest('hex');
    if (sha !== rec.tds.sha256) fail(rec.slug, 'sha256 mismatch between manifest and hosted PDF');
  }

  const missingHero = heroFields(rec.category).filter(
    (f) => !rec.specs[f] && !(f === 'classification' && rec.classification)
  );
  if (missingHero.length > 0) fail(rec.slug, `hero fields missing: ${missingHero.join(', ')}`);
  if (Object.keys(rec.specs).length < 5)
    fail(rec.slug, `only ${Object.keys(rec.specs).length} spec fields (need >= 5)`);

  const wc = rec.description.trim().split(/\s+/).length;
  if (wc < 100 || wc > 150) fail(rec.slug, `description is ${wc} words (need 100 to 150)`);
  if (!rec.meta_description) fail(rec.slug, 'meta_description missing');

  if (rec.image.status === 'found') {
    const imgPath = path.join(REPO, 'public', rec.image.path.replace(/^\//, ''));
    if (!rec.image.path || !fs.existsSync(imgPath)) fail(rec.slug, `image file missing at ${rec.image.path}`);
  } else if (rec.image.status !== 'placeholder') {
    fail(rec.slug, `image.status is ${rec.image.status} (need found or placeholder)`);
  }

  for (const eq of rec.equivalents) {
    if (eq.classification !== rec.classification)
      fail(rec.slug, `equivalent ${eq.slug} classification ${eq.classification} is not an exact match`);
  }

  const ogPath = path.join(REPO, 'public', 'og', rec.brand, `${rec.slug}.png`);
  if (!fs.existsSync(ogPath)) fail(rec.slug, `OG image missing at /og/${rec.brand}/${rec.slug}.png`);
}

const shipping = manifest.filter((r) => r.page_status === 'generated' || r.page_status === 'live');
console.log(`\nDefinition of done: ${shipping.length} shipping records checked, ${failures} failures.`);
process.exit(failures > 0 ? 1 : 0);

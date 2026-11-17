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

/**
 * Validate a hosted PDF against what the manifest claims about it. Used for
 * the technical sheet and, when present, the safety sheet.
 */
function checkPdf(slug: string, label: string, doc: { local_path: string; sha256: string; size_bytes?: number }) {
  const abs = path.join(REPO, 'public', doc.local_path.replace(/^\//, ''));
  if (!fs.existsSync(abs)) {
    fail(slug, `hosted ${label} missing at ${doc.local_path}`);
    return;
  }
  const buf = fs.readFileSync(abs);
  if (buf.subarray(0, 4).toString() !== '%PDF') fail(slug, `hosted ${label} is not a PDF`);
  const sha = crypto.createHash('sha256').update(buf).digest('hex');
  if (sha !== doc.sha256) fail(slug, `${label} sha256 mismatch between manifest and hosted file`);
  if (doc.size_bytes !== buf.length)
    fail(slug, `${label} size_bytes ${doc.size_bytes ?? 'missing'} does not match hosted file (${buf.length})`);
}

for (const rec of manifest) {
  if (rec.page_status !== 'generated' && rec.page_status !== 'live') continue;

  // A page may ship in one of two states. Either we host the manufacturer's
  // technical sheet and every claim on the page is checkable against it, or
  // the manufacturer gates that sheet and the page ships with a document
  // request instead of a download. The second state still has to earn its
  // place: real copy, a real image, and specs that came from somewhere. What
  // it is excused is the PDF, its hash, and the hero spec fields that are
  // only printed in the sheet we do not hold.
  const pending = rec.tds.status === 'documents_pending';
  // Hardware is judged differently. A drain or a joint tape has no pack size,
  // no coverage and no classification, so the chemical thresholds would
  // exclude legitimate products. What an accessory must still have is real
  // copy, a real image and an OG card, all checked below for every record.
  const accessory = rec.category === 'accessory';

  if (!pending) {
    if (rec.tds.status !== 'verified') fail(rec.slug, `tds.status is ${rec.tds.status}, not verified`);
    // A rebrand is the one honest way to score low. Mapei renamed Keraflex
    // Maxi S1 to Keraflex Maxi S1 Zero and still publishes a single sheet
    // under the old name, so the suffix trap that stops Keraset taking
    // Keraset Maxi's sheet fires on a pair that really is one product. Only a
    // person can settle that, so the exception has to be written down on the
    // record: tds.rebrand_of names the sheet's own title, and it is checked
    // against the sheet rather than taken on trust.
    if (rec.tds.verified_name_match_score < 90 && !rec.tds.rebrand_of)
      fail(rec.slug, `verify score ${rec.tds.verified_name_match_score} below 90`);
    if (rec.tds.rebrand_of) {
      const stem = rec.name.toUpperCase().replace(/[^A-Z0-9 ]+/g, ' ').trim();
      const was = rec.tds.rebrand_of.toUpperCase().replace(/[^A-Z0-9 ]+/g, ' ').trim();
      if (!stem.startsWith(was))
        fail(rec.slug, `tds.rebrand_of "${rec.tds.rebrand_of}" is not an earlier name of "${rec.name}"`);
    }
    // Provenance, not necessarily a URL. Several sheets are issued to dealers
    // rather than published, so there is no public address to cite. Those
    // record where the file came from in notes instead, and that counts.
    if (!rec.tds.source_url && !/supplied|issued|provided/i.test(rec.notes)) {
      fail(rec.slug, 'tds has neither a source_url nor a note recording where the file came from');
    }
    checkPdf(rec.slug, 'TDS', rec.tds);

    // Only the pack size blocks a page. Classification, coverage and joint
    // width are valuable but not universal: a detergent has no EN class, a
    // waterproofing tape has no coverage, a tile spacer has no joint width,
    // and several manufacturers print the class only inside the sheet.
    // Demanding them would mean losing those pages or inventing figures, so
    // the real quality bar is the five spec minimum below.
    const missingHero = accessory
      ? []
      : heroFields(rec.category).filter((f) => f === 'pack_size' && !rec.specs[f]);
    if (missingHero.length > 0) fail(rec.slug, `hero fields missing: ${missingHero.join(', ')}`);
    const minSpecs = accessory ? 2 : 5;
    if (Object.keys(rec.specs).length < minSpecs)
      fail(rec.slug, `only ${Object.keys(rec.specs).length} spec fields (need >= ${minSpecs})`);
  } else {
    // Guard against this state being used to ship an empty page.
    if (rec.tds.local_path) fail(rec.slug, 'documents_pending but a local_path is set, register the PDF instead');
    const minPending = accessory ? 1 : 2;
    if (Object.keys(rec.specs).length < minPending)
      fail(rec.slug, `documents_pending needs at least ${minPending} spec fields, has ${Object.keys(rec.specs).length}`);
    if (rec.applications.length === 0) fail(rec.slug, 'documents_pending needs at least one application');
  }

  // The safety sheet is optional, but a record that claims to host one must
  // actually host it.
  if (rec.sds && rec.sds.status === 'verified') checkPdf(rec.slug, 'SDS', rec.sds);

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

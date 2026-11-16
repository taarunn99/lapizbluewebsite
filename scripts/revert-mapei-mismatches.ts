/**
 * Undo the data sheet attachments that gave a variant its parent's sheet.
 *
 * register-mapei-sheets joined our stock list names to Mapei's catalogue names
 * by stripping tokens that looked like noise. "Eco" and "ME" genuinely are:
 * Mapei's catalogue listing carries an Eco that the document itself does not,
 * and ME marks the Middle East edition of the same product. "Zero", "Plus",
 * "Maxi", "Fibre", "Spray", "Fast Track" and "Binder" are not noise. They name
 * a different product with its own sheet, and stripping them let Keraflex Maxi
 * S1 Zero take plain Keraflex Maxi S1's sheet and all five Ultraplan variants
 * take one ULTRAPLAN sheet between them.
 *
 * There is no Zero edition sheet anywhere in the 1,073 harvested, so these
 * products have no sheet on the Mapei UAE site and should say so rather than
 * host another product's document. Each record goes back to the state it had
 * before the join, which is documents_pending with only what the stock list
 * knows, and the reason goes into notes.
 *
 * Usage: npx tsx scripts/revert-mapei-mismatches.ts [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import type { ManifestRecord } from '../src/lib/tds';

const MANIFEST = 'data/manifest.json';
const beforeArg = process.argv.indexOf('--before');
if (beforeArg === -1) {
  console.error('Need --before <path to the manifest as it was before the join>. Produce it with: git show <commit>:data/manifest.json > /tmp/manifest-before.json');
  process.exit(1);
}
const BEFORE = process.argv[beforeArg + 1];
const dry = process.argv.includes('--dry');

/** slug, and the Mapei product whose sheet it wrongly received. */
const WRONG: Array<[string, string]> = [
  ['keraflex-maxi-s1-zero', 'Keraflex Maxi S1'],
  ['mapefer-1k-zero', 'Mapefer'],
  ['mapesil-ac-zero', 'Mapesil AC'],
  ['mapelastic-zero', 'Mapelastic'],
  ['mapelastic-aquadefense-zero', 'Mapelastic Aquadefense'],
  ['elastocolor-paint-zero', 'Elastocolor Pittura'],
  ['eco-prim-grip', 'Eco Prim Grip Plus'],
  ['ultraplan-eco', 'Ultraplan'],
  ['ultraplan-eco-20', 'Ultraplan'],
  ['ultraplan-fast-track', 'Ultraplan'],
  ['ultraplan-fiber', 'Ultraplan'],
  ['ultraplan-maxi-fibre', 'Ultraplan'],
  ['ultratop-binder', 'Ultratop'],
  ['ultratop-color-paste', 'Ultratop'],
  ['ultratop-outdoor', 'Ultratop'],
  ['ultracare-grout-cleaner-spray', 'UltraCare Grout Cleaner'],
  ['ultracare-grout-protector-spray', 'UltraCare Grout Protector'],
  ['ultracare-keranet', 'UltraCare Keranet Crystals'],
  ['ultracare-keranet-easy-spray', 'UltraCare Keranet Easy'],
  ['ultracare-smooth-silicone-spray', 'UltraCare Smooth Silicone'],
  ['mapeband-easy-h130', 'Mapeband'],
  ['mapeplan-d', 'Mapeplan T AF'],
  ['ultrabond-eco-tack', 'Ultrabond Tackifier TX ME'],
];

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const before: ManifestRecord[] = JSON.parse(fs.readFileSync(BEFORE, 'utf8'));
const beforeBySlug = new Map(before.filter((r) => r.brand === 'mapei').map((r) => [r.slug, r]));
const now = new Date().toISOString().slice(0, 10);

let reverted = 0, filesRemoved = 0;
for (const [slug, parent] of WRONG) {
  const rec = manifest.find((r) => r.brand === 'mapei' && r.slug === slug);
  if (!rec) { console.log(`no record for ${slug}`); continue; }
  if (rec.tds.status !== 'verified') { console.log(`${slug} already not verified, left alone`); continue; }

  const prior = beforeBySlug.get(slug);
  const localPath = rec.tds.local_path;

  rec.tds = prior
    ? prior.tds
    : {
        status: 'documents_pending',
        source_url: rec.tds.source_url,
        local_path: '',
        sha256: '',
        revision_date: '',
        verified_name_match_score: 0,
      };
  // Specs merged out of the parent's sheet describe the parent, so the record
  // goes back to what the stock list gave it.
  if (prior) rec.specs = prior.specs;
  else rec.specs = Object.fromEntries(
    Object.entries(rec.specs).filter(([field]) => field === 'pack_size' || field === 'colours'),
  );
  rec.page_status = 'pending';
  rec.notes = `${rec.notes.replace(/ Mapei catalogue name: [^.]+\./, '')} No sheet of its own on the Mapei UAE catalogue. Do not use the ${parent} sheet: that is a different product.`.replace(/\s+/g, ' ').trim();
  rec.updated_at = now;
  reverted++;

  // Remove the copied PDF unless the record legitimately held one before.
  const keep = prior?.tds.local_path ?? '';
  if (localPath && localPath !== keep) {
    const abs = path.join('public', localPath.replace(/^\//, ''));
    if (fs.existsSync(abs)) {
      if (!dry) fs.rmSync(abs);
      filesRemoved++;
    }
  }
  console.log(`${slug}: sheet detached (was ${parent}'s), specs back to ${Object.keys(rec.specs).length}`);
}

if (!dry) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${reverted} records reverted, ${filesRemoved} wrongly copied sheets ${dry ? 'would be ' : ''}removed.`);

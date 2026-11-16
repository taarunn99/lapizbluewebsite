/**
 * Hold back pages that would be duplicates of each other.
 *
 * Zoho sometimes carries one Mapei product under two names, "Ultraplan" and
 * "Ultraplan Eco", or "Ultrabond Eco V4 SP" and "Ultrabond Eco V4SP". Both
 * became records, both matched the same data sheet, and both would ship as
 * separate URLs with the same document and near identical copy. That is a
 * duplicate content problem on a site whose whole point is ranking.
 *
 * A shared sheet is not always a duplicate: Kerakoll publish one sheet for the
 * Aquaform D range, and those three are genuinely different products. So this
 * does not act on a shared sheet by itself. It takes an explicit list of pairs
 * that have been read and judged, keeps the better record, and holds the other
 * with the alias written into its notes so nobody re-creates it.
 *
 * Usage: npx tsx scripts/dedupe-shared-sheets.ts [--dry]
 */
import fs from 'node:fs';
import type { ManifestRecord } from '../src/lib/tds';

const dry = process.argv.includes('--dry');

/** keep, hold, and why this is one product rather than two. */
const PAIRS: Array<{ keep: string; hold: string; reason: string }> = [
  {
    keep: 'ultraplan',
    hold: 'ultraplan-eco',
    reason: 'Ultraplan and Ultraplan Eco are the same Mapei product under two stock list names, sharing one data sheet.',
  },
  {
    keep: 'ultrabond-eco-v4-sp',
    hold: 'ultrabond-eco-v4sp',
    reason: 'Ultrabond Eco V4 SP and Ultrabond Eco V4SP are the same product under two spellings, sharing one data sheet.',
  },
];

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const now = new Date().toISOString().slice(0, 10);
let held = 0;

for (const { keep, hold, reason } of PAIRS) {
  const keeper = manifest.find((r) => r.brand === 'mapei' && r.slug === keep);
  const held_ = manifest.find((r) => r.brand === 'mapei' && r.slug === hold);
  if (!keeper || !held_) { console.log(`pair ${keep} / ${hold} not both present`); continue; }

  if (keeper.tds.sha256 && keeper.tds.sha256 !== held_.tds.sha256) {
    console.log(`${keep} and ${hold} no longer share a sheet, left alone`);
    continue;
  }

  // Anything the held record knows that the keeper does not is worth moving
  // across before it goes quiet.
  let moved = 0;
  for (const [field, value] of Object.entries(held_.specs)) {
    if (!keeper.specs[field]) { keeper.specs[field] = value; moved++; }
  }
  if (!keeper.notes.includes('Also stocked as')) {
    keeper.notes = `${keeper.notes} Also stocked as "${held_.name}".`.trim();
  }
  keeper.updated_at = now;

  held_.page_status = 'pending';
  held_.notes = `${held_.notes} Held as a duplicate of ${keep}. ${reason}`.replace(/\s+/g, ' ').trim();
  held_.updated_at = now;
  held++;
  console.log(`held ${hold}, kept ${keep}${moved ? `, moved ${moved} spec fields across` : ''}`);
}

if (!dry) fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${held} duplicate pages ${dry ? 'would be ' : ''}held.`);

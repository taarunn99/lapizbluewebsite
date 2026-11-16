/**
 * Drop specification values that are plainly parse debris rather than data.
 *
 * The per category regexes in scripts/lib/spec-maps.ts sometimes catch the
 * words around a figure instead of the figure, so a bond strength reads "on
 * concrete" and a coverage reads "of the". A truncated value is worse than an
 * absent one: it renders on the page as fact, and a bad coverage string feeds
 * the consumption calculator. Clearing is always safe, because every component
 * drops a field it does not find. Nothing here guesses a replacement.
 *
 * Usage: npx tsx scripts/scrub-specs.ts [--dry]
 */
import fs from 'node:fs';
import type { ManifestRecord } from '../src/lib/tds';

const MANIFEST = 'data/manifest.json';

// Fields whose whole point is a number. A value with no digit in it is debris.
const NUMERIC_FIELDS = new Set([
  'coverage', 'pack_size', 'thickness', 'compressive_strength', 'flexural_strength',
  'bond_strength', 'pot_life', 'open_time', 'set_time', 'joint_width',
  'application_temperature', 'adjustment_time', 'mixing_ratio', 'movement_capability',
  'density', 'ph', 'shore_hardness', 'tensile_strength', 'cure_time', 'walkability',
  'grouting_time', 'water_demand', 'shelf_life', 'elongation', 'abrasion_resistance',
]);

// A value that is only a connective or a stray unit carries nothing.
const FRAGMENT = /^(with|of the|and|the|for|in|on|or|of|at|by|is|as|from|it|its|be|an|to|a|strength|installation|\(?(mpa|g\/m2?|kg\/m2?|mm|%)\s*\)?)$/i;

const dry = process.argv.includes('--dry');
const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

let cleared = 0;
const log: string[] = [];
for (const rec of manifest) {
  for (const [field, raw] of Object.entries(rec.specs)) {
    const value = String(raw).trim();
    const fragment = value.length < 2 || FRAGMENT.test(value);
    const missingNumber = NUMERIC_FIELDS.has(field) && !/\d/.test(value);
    // A classification is a code, so a single letter is a truncation too.
    const stubCode = field === 'classification' && value.length < 3;
    if (fragment || missingNumber || stubCode) {
      log.push(`${rec.brand}/${rec.slug}  ${field} = "${value}"`);
      if (!dry) delete rec.specs[field];
      cleared++;
    }
  }
}

for (const line of log) console.log(line);
if (!dry) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${cleared} specification values ${dry ? 'would be' : ''} cleared.`);

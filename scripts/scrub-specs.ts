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

// A colour field should name colours. These values are the sentence that
// happened to follow the word "colour" in the sheet, not a colour.
const NOT_A_COLOUR = /^(ed|ing|is|less|that|may|of|are)\b|obtained|vary from production|Packs must|lump-|slip-resistant/i;

// Leading filler the sheet's sentence structure leaves on a figure. "approx."
// is deliberately kept: it is the manufacturer's own qualifier, and dropping
// it would state a figure more precisely than the sheet does.
const LEADING_FILLER = /^(?:must be|will be|should be|is approximately|is about|is|are)\s+/i;
// "of" only counts as filler in front of a figure, not in front of a phrase
// like "of the mix: fluid", where removing it leaves nonsense.
const LEADING_OF = /^of\s+(?=[\u2248\d])/i;

// The sheets are extracted with the fl ligature read as fi. Only words where
// fl is the sole reading are listed, so nothing legitimate is rewritten.
const LIGATURE_FL: Array<[RegExp, string]> = [
  [/\bfiuid\b/gi, 'fluid'],
  [/\bsemi-fiuid\b/gi, 'semi-fluid'],
  [/\bfiexible\b/gi, 'flexible'],
  [/\bfiow\b/gi, 'flow'],
  [/\binfiuenced\b/gi, 'influenced'],
  [/\bfioor\b/gi, 'floor'],
  [/Mapefiex/g, 'Mapeflex'],
  [/Mapefioor/g, 'Mapefloor'],
];

// A phrase repeated back to back is the extractor catching a value twice.
const DOUBLED = /^(.{8,}?)\s+\1$/;

const dry = process.argv.includes('--dry');
const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

let cleared = 0;
let tidies = 0;
const log: string[] = [];
for (const rec of manifest) {
  for (const [field, raw] of Object.entries(rec.specs)) {
    const value = String(raw).trim();
    const fragment = value.length < 2 || FRAGMENT.test(value);
    const missingNumber = NUMERIC_FIELDS.has(field) && !/\d/.test(value);
    // A classification is a code, so a single letter is a truncation too.
    const stubCode = field === 'classification' && value.length < 3;
    if (fragment || missingNumber || stubCode || (field === 'colours' && NOT_A_COLOUR.test(value))) {
      log.push(`clear   ${rec.brand}/${rec.slug}  ${field} = "${value}"`);
      if (!dry) delete rec.specs[field];
      cleared++;
      continue;
    }

    // Short of clearing, two tidies that keep the figure and drop the noise.
    let tidied = value.replace(LEADING_FILLER, '').replace(LEADING_OF, '');
    for (const [pattern, fix] of LIGATURE_FL) tidied = tidied.replace(pattern, fix);
    const doubled = tidied.match(DOUBLED);
    if (doubled) tidied = doubled[1];
    tidied = tidied.replace(/^da\s+(\+?[\d.]+\s*\u00b0?C)\s+a\s+/i, 'from $1 to ');
    if (tidied !== value && tidied.length > 1) {
      log.push(`tidy    ${rec.brand}/${rec.slug}  ${field} = "${value}" -> "${tidied}"`);
      if (!dry) rec.specs[field] = tidied;
      tidies++;
    }
  }
}

for (const line of log) console.log(line);
if (!dry) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${cleared} specification values ${dry ? 'would be ' : ''}cleared, ${tidies} tidied.`);

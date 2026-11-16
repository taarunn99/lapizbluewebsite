/**
 * File Mapei's articles as accessories rather than as chemicals.
 *
 * The category classifier keys off the product line and the product's own
 * words, so a waterproofing tape landed in `waterproofing` and a carbon fabric
 * in `repair_mortar`. That is wrong on its own terms: these are articles, not
 * materials. A tape has no coverage, a mesh has no mixing ratio and a sheet
 * membrane has no pot life, so the five field minimum written for a chemical
 * can never be met by one, and `check-manifest.ts` already recognises this by
 * asking an accessory for two fields and no hero figures.
 *
 * Only the manifestly physical goods move. Anything mixed, poured, brushed or
 * dosed stays where it is.
 *
 * Usage: npx tsx scripts/recategorise-accessories.ts [--dry]
 */
import fs from 'node:fs';
import type { ManifestRecord } from '../src/lib/tds';

const dry = process.argv.includes('--dry');

/** slug, and what the thing physically is. */
const ARTICLES: Array<[string, string]> = [
  ['mapeband', 'rubber waterproofing tape'],
  ['mapeband-gasket', 'moulded drain outlet gasket'],
  ['mapeband-tpe', 'thermoplastic elastomer joint tape'],
  ['mapeguard-board', 'tile backer board'],
  ['mapeguard-um-35', 'uncoupling membrane'],
  ['mapeguard-wp-200', 'waterproofing membrane sheet'],
  ['mapenet-150', 'alkali resistant glass fibre mesh'],
  ['mapeplan-t-af', 'synthetic sheet membrane'],
  ['mapeplan-tu-s', 'synthetic sheet membrane'],
  ['mapeproof-al-tape-d10', 'aluminium faced detailing tape'],
  ['mapeproof-fbt-tape-600', 'bentonite detailing tape'],
  ['mapetex-50', 'non woven reinforcing fabric'],
  ['mapetex-sel', 'macro holed non woven fabric'],
  ['mapesilent', 'acoustic insulating mat'],
  ['ultrabond-turf-tape', 'synthetic grass seaming tape'],
  ['ultrabond-turf-tape-pro', 'synthetic grass seaming tape'],
  ['mapewrap-c-uni-ax', 'unidirectional carbon fibre fabric'],
  ['mapewrap-c-fiocco', 'carbon fibre cord'],
  ['mapegrout-aggregate', 'graded aggregate for extending a repair mortar'],
  ['mapecolor-metallic', 'metallic pigment for a decorative finish'],
  ['mapeglitter', 'decorative glitter for a resin finish'],
];

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const now = new Date().toISOString().slice(0, 10);
let moved = 0;

for (const [slug, what] of ARTICLES) {
  const rec = manifest.find((r) => r.brand === 'mapei' && r.slug === slug);
  if (!rec) { console.log(`no record for ${slug}`); continue; }
  if (rec.category === 'accessory') { console.log(`${slug} already an accessory`); continue; }
  console.log(`${slug}: ${rec.category} -> accessory  (${what})`);
  rec.category = 'accessory';
  if (!rec.notes.includes('Filed as an accessory')) {
    rec.notes = `${rec.notes} Filed as an accessory: it is a ${what}, not a mixed material.`.trim();
  }
  rec.updated_at = now;
  moved++;
}

if (!dry) fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${moved} records ${dry ? 'would be ' : ''}refiled as accessories.`);

/**
 * Make pack sizes readable, and throw out the ones that are not pack sizes.
 *
 * Zoho writes them compressed and unspaced, "25KG" and "15CMX20MT", which the
 * key specification bar renders at 24px in a half width cell. A nine character
 * unbroken token does not fit there on a 320px screen, which is what pushed
 * the product pages sideways. Spacing the units fixes the reading and lets the
 * text wrap.
 *
 * A handful are not pack sizes at all. The sheet extraction caught a whole
 * paragraph, image captions included, so one record carried 300 characters of
 * prose in the field. Those are cut back to the figures they contain, or
 * cleared when there is no figure to keep.
 *
 * Usage: npx tsx scripts/normalise-packs.ts [--dry]
 */
import fs from 'node:fs';
import type { ManifestRecord } from '../src/lib/tds';

const dry = process.argv.includes('--dry');

const UNITS: Array<[RegExp, string]> = [
  [/(\d)\s*KGS?\b/gi, '$1 kg'],
  [/(\d)\s*GMS?\b/gi, '$1 g'],
  [/(\d)\s*LTS?\b/gi, '$1 l'],
  [/(\d)\s*MTS?\b/gi, '$1 m'],
  [/(\d)\s*MM\b/gi, '$1 mm'],
  [/(\d)\s*CM\b/gi, '$1 cm'],
  [/(\d)\s*SM\b/gi, '$1 sqm'],
  [/(\d)\s*ML\b/gi, '$1 ml'],
];

/** A pack size is a figure, not a paragraph. */
const MAX = 90;
const FIGURES = /\d+(?:[.,]\d+)?\s*(?:kg|g|l|lt|ml|litres?|m|mm|cm)\b/gi;

function normalise(value: string): string {
  let out = value.trim();
  // "15CMX20MT" and "600X1300X7MM" use X as a dimension separator. The X can
  // follow a unit as well as a digit, and splitting it out first is what lets
  // the unit rules below see a word boundary after "CM".
  out = out.replace(/([0-9A-Za-z])\s*[xX]\s*(\d)/g, '$1 x $2');
  for (const [pattern, to] of UNITS) out = out.replace(pattern, to);
  // A lone unit left in capitals after a non digit, as in "440 KG".
  out = out.replace(/\b(KG|MT|LT|MM|CM|ML|SM)\b/g, (u) => (u === 'SM' ? 'sqm' : u === 'MT' ? 'm' : u === 'LT' ? 'l' : u.toLowerCase()));
  // Container nouns come off the stock list in capitals, as in "25 kg BAG".
  out = out.replace(/\b(BAGS?|KITS?|DRUMS?|BUCKETS?|PAILS?|TUBS?|CANS?|CARTRIDGES?|SACHETS?|ROLLS?|TINS?|JERRYCANS?|BOTTLES?|TOTES?|IBCS?|PALLETS?|BOXES?|TUBES?)\b/g,
    (word) => (word.toUpperCase() === 'IBCS' ? 'IBCs' : word.toUpperCase() === 'IBC' ? 'IBC' : word.toLowerCase()));
  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Five values ran to a whole paragraph and a generic trim read them wrongly:
 * taking every figure out of the Keralastic sentence gives "10 kg, 9.4 kg,
 * 0.6 kg, 5 kg", which looks like four pack sizes rather than two kits and
 * their components. These five are written out from their own sheets instead.
 */
const BY_HAND: Record<string, string> = {
  keralastic: '10 kg and 5 kg twin drum kits',
  'ultrabond-eco-pu-2k': '10 kg and 5 kg twin tub kits',
  'mapecolor-metallic': '90 g sachets',
  'dynamon-sr-1200': '200 litre drums, 1000 litre IBCs, or in bulk',
  'dynamon-sr-2400': 'bulk, or 200 litre drums and 1000 litre totes on request',
  mapesilent: 'pallets of 75 tiles, covering 75 m2',
};

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
let tidied = 0, trimmed = 0, cleared = 0;

for (const rec of manifest) {
  const value = rec.specs.pack_size;
  if (!value) continue;

  const byHand = rec.brand === 'mapei' ? BY_HAND[rec.slug] : undefined;
  if (byHand) {
    if (value !== byHand) {
      console.log(`by hand ${rec.brand}/${rec.slug}  ->  "${byHand}"`);
      if (!dry) rec.specs.pack_size = byHand;
      trimmed++;
    }
    continue;
  }

  if (value.length > MAX) {
    // Keep only the quantities, in the order the sheet gave them.
    const figures = [...value.matchAll(FIGURES)].map((m) => normalise(m[0]));
    const unique = [...new Set(figures)].slice(0, 4);
    if (unique.length === 0) {
      console.log(`clear   ${rec.brand}/${rec.slug}  "${value.slice(0, 60)}..."`);
      if (!dry) delete rec.specs.pack_size;
      cleared++;
    } else {
      const next = unique.join(', ');
      console.log(`trim    ${rec.brand}/${rec.slug}  "${value.slice(0, 50)}..."  ->  "${next}"`);
      if (!dry) rec.specs.pack_size = next;
      trimmed++;
    }
    continue;
  }

  const next = normalise(value);
  if (next !== value) {
    if (!dry) rec.specs.pack_size = next;
    tidied++;
  }
}

if (!dry) fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${tidied} pack sizes spaced out, ${trimmed} cut back to their figures, ${cleared} cleared.`);

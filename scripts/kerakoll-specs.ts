/**
 * Fill missing Kerakoll specification fields from the held data sheets.
 *
 * Kerakoll print a Technical Data table with a fixed set of row labels, which
 * the generic per category regexes miss because they were written against
 * Mapei's layout. This reads the rows by name, so the value is whatever the
 * sheet says against that label and nothing else.
 *
 * Every row is validated before it is accepted: a quantity where a quantity
 * belongs, an area rate where a rate belongs. A row that fails is left empty
 * rather than stored, because an absent field drops quietly off the page and a
 * wrong one renders as fact.
 *
 * Usage: npx tsx scripts/kerakoll-specs.ts [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { getDocumentProxy, extractText } from 'unpdf';
import { fixLigatures } from './lib/spec-maps';
import type { ManifestRecord } from '../src/lib/tds';

const dry = process.argv.includes('--dry');

// One validator per kind of field, because "contains a digit" is too weak: it
// let "(EN 12004-2)" through as a mixing ratio and "at +20 C EN ISO" as an
// open time, both of which are the standard reference, not the value.
const AREA_RATE = /\d+(?:[.,]\d+)?\s*(?:-|to)?\s*(?:\d+(?:[.,]\d+)?)?\s*(?:kg|g|l|ℓ|lt|ml|litres?)\s*\/\s*(?:m2|m²)/i;
const RATIO_OR_VOLUME = /\d\s*:\s*\d|\d+(?:[.,]\d+)?\s*(?:l|ℓ|litres?|ml)\b|\bparts?\b/i;
const TIME = /\d+(?:[.,]\d+)?\s*(?:-|to)?\s*(?:\d+(?:[.,]\d+)?)?\s*(?:min\b|mins\b|minutes?|h\b|hrs?\b|hours?|days?)/i;
const TEMPERATURE = /[+-]?\d+\s*°?\s*C\b/i;
const LENGTH = /\d+(?:[.,]\d+)?\s*(?:-|to|±)?\s*(?:\d+(?:[.,]\d+)?)?\s*(?:mm|cm|μm|micron)/i;
const DESCRIPTIVE = /^[^0-9]*[a-z]{4}/i;
// A colour row has to name a colour. "Specific weight of the mixture" sits
// next to it in the table and reads as prose to any looser test.
const COLOUR = /\b(white|black|grey|gray|red|blue|green|yellow|beige|brown|ivory|cream|anthracite|sand|silver|gold|transparent|translucent|neutral|natural|colou?red|pigmented|straw|ochre|terracotta|pink|orange|violet|purple|amber|bronze|graphite|slate|charcoal|mocha|RAL\s*\d+)\b/i;
// The standard reference is never the value.
const STANDARD = /^\(?\s*(?:EN|ISO|ASTM|DIN|UNI)\b/i;

// label in the sheet, field on the record, and what a good value looks like.
const ROWS: Array<{ label: RegExp; field: string; valid: RegExp }> = [
  { label: /\bAppearance\b/, field: 'consistency', valid: DESCRIPTIVE },
  { label: /\bMixing water\b/, field: 'mixing_ratio', valid: RATIO_OR_VOLUME },
  { label: /\bMixing ratio\b/, field: 'mixing_ratio', valid: RATIO_OR_VOLUME },
  { label: /\bWorkability\b/, field: 'open_time', valid: TIME },
  { label: /\bSet(?:ting)? time\b/, field: 'set_time', valid: TIME },
  { label: /\bPot life\b/, field: 'pot_life', valid: TIME },
  { label: /\bThickness\b/, field: 'thickness', valid: LENGTH },
  { label: /\bCoverage\b/, field: 'coverage', valid: AREA_RATE },
  { label: /\bTemperature range\b/, field: 'application_temperature', valid: TEMPERATURE },
  { label: /\bColou?rs?\b/, field: 'colours', valid: COLOUR },
];

// Tapes and sheet membranes have no bag or bucket, so their pack size is the
// roll. Both dimensions have to be present or the figure says nothing.
const ROLL_WIDTH = /\b(?:Roll\s+)?Width\s*:?\s*(\d+(?:[.,]\d+)?\s*(?:mm|cm|m)\b)/i;
const ROLL_LENGTH = /\b(?:Roll\s+)?length\s*:?\s*(\d+(?:[.,]\d+)?\s*(?:mm|cm|m)\b)/i;

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
  let filled = 0;
  const touched: string[] = [];

  for (const rec of manifest) {
    if (rec.brand !== 'kerakoll' || !rec.tds.local_path) continue;
    const abs = path.join('public', rec.tds.local_path.replace(/^\//, ''));
    if (!fs.existsSync(abs)) continue;

    let text = '';
    try {
      const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(abs)));
      const { text: t } = await extractText(pdf, { mergePages: true });
      text = fixLigatures(Array.isArray(t) ? t.join('\n') : String(t));
    } catch { continue; }

    const added: string[] = [];
    for (const row of ROWS) {
      if (rec.specs[row.field]) continue;
      // Read every occurrence of the label and take the first value that
      // validates, since the word also appears in the application notes.
      const pattern = new RegExp(`${row.label.source}\\s*:?\\s*([^\\n]{2,120})`, 'g');
      let value = '';
      for (const m of text.matchAll(pattern)) {
        const candidate = m[1]
          .replace(/\s+/g, ' ')
          .replace(/[–—]/g, '-')
          .replace(/ℓ/g, 'l')
          // Bullets and a dangling "of" are table formatting, not value.
          .replace(/^[-•]\s*/, '')
          .replace(/^of\s+/i, '')
          .replace(/^[\s:]+/, '')
          .trim();
        if (STANDARD.test(candidate)) continue;
        if (row.valid.test(candidate)) { value = candidate; break; }
      }
      // A temperature row often restates what it is a temperature of before
      // giving the range. The range is the value.
      if (row.field === 'application_temperature') {
        const from = value.search(/from\s*[+-]?\d/i);
        if (from > 0) value = value.slice(from);
      }
      if (!value) continue;
      if (!dry) rec.specs[row.field] = value;
      added.push(`${row.field}="${value}"`);
      filled++;
    }
    if (!rec.specs.pack_size) {
      const w = text.match(ROLL_WIDTH);
      const l = text.match(ROLL_LENGTH);
      if (w && l) {
        const roll = `roll ${w[1].replace(/\s+/g, ' ')} x ${l[1].replace(/\s+/g, ' ')}`;
        if (!dry) rec.specs.pack_size = roll;
        added.push(`pack_size="${roll}"`);
        filled++;
      }
    }
    if (added.length) touched.push(`${rec.slug}  ${added.join('  ')}`);
  }

  for (const line of touched) console.log(line);
  if (!dry) fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n${filled} fields ${dry ? 'would be ' : ''}filled across ${touched.length} records.`);
}

main().catch((e) => { console.error(e); process.exit(1); });

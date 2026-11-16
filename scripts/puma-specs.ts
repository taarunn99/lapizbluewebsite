/**
 * Fill missing Pidilite Puma specification fields from the held data sheets.
 *
 * Grupo Puma print a TECHNICAL DATA table whose row labels are their own
 * (Aspect, Approximate yield, Performance, Set to light foot traffic), and
 * they keep the pack size and the dilution out of that table altogether: the
 * pack is in PACKAGING AND STORAGE, the dilution only in APPLICATION
 * PROCEDURE. The generic per category regexes were written against Mapei's
 * layout, so they miss all of it. This reads the rows by name, the same way
 * scripts/kerakoll-specs.ts does, and adds two readers for the labelled lines
 * that sit outside the table.
 *
 * Every value is validated before it is accepted: an area rate where a rate
 * belongs, a quantity where a quantity belongs, a ratio where a ratio
 * belongs. A pack size can never land in coverage, because the coverage
 * validator demands a real rate unit over m2. A row that fails validation is
 * left empty rather than stored, since an absent field drops quietly off the
 * page and a wrong one renders as fact.
 *
 * Only empty fields are written. Nothing already on a record is overwritten.
 *
 * Usage: npx tsx scripts/puma-specs.ts [--dry] [--only=slug]
 */
import fs from 'node:fs';
import path from 'node:path';
import { getDocumentProxy, extractText } from 'unpdf';
import { fixLigatures } from './lib/spec-maps';
import type { ManifestRecord } from '../src/lib/tds';

const dry = process.argv.includes('--dry');
const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const only = onlyArg ? onlyArg.slice('--only='.length) : '';

// A coverage figure has to carry a real rate unit over an area. This is what
// stops "10 Kg jerry can" being stored as a yield.
const AREA_RATE = /\d+(?:[.,]\d+)?\s*(?:-|to)?\s*(?:\d+(?:[.,]\d+)?)?\s*(?:kg|g|l|lt|ml|litres?)\s*\/\s*(?:m2|m²)/i;
const TIME = /\d+(?:[.,]\d+)?\s*(?:-|to)?\s*(?:\d+(?:[.,]\d+)?)?\s*(?:h\b|hr\b|hrs\b|hours?|min\b|mins\b|minutes?|days?)/i;
const TEMPERATURE = /\d+\s*(?:º|°)?\s*C\b/i;
const LENGTH = /\d+(?:[.,]\d+)?\s*(?:-|to)?\s*(?:\d+(?:[.,]\d+)?)?\s*(?:mm|cm)\b/i;
const STRENGTH = /\d+(?:[.,]\d+)?\s*N\s*\/\s*mm2/i;
const CLASS = /\b(?:CT|CA|SR|AR|MC)\s*[CF]\d+/i;
const RATIO = /\b\d\s*:\s*\d\b/;
// A pack has a mass or a volume and a container, not a rate.
const PACK = /\d+(?:[.,]\d+)?\s*(?:kg|kilos?|g|l|lt|litres?|ml)\b/i;
const COLOUR =
  /\b(white|black|grey|gray|red|blue|green|yellow|beige|brown|ivory|cream|anthracite|sand|silver|transparent|translucent|neutral|natural|colourless|colorless|colou?red|pigmented|ochre|terracotta|pink|orange)\b/i;
// The standard reference is never the value.
const STANDARD = /^\(?\s*(?:EN|UNE|ISO|ASTM|DIN|VS)\b/i;

// label in the sheet, field on the record, and what a good value looks like.
const ROWS: Array<{ label: RegExp; field: string; valid: RegExp }> = [
  { label: /\bAspect\b/, field: 'colours', valid: COLOUR },
  { label: /\bColou?r\b/, field: 'colours', valid: COLOUR },
  { label: /\bPot life\b/, field: 'pot_life', valid: TIME },
  { label: /\bSetting starting time\b/, field: 'pot_life', valid: TIME },
  { label: /\bSet to light foot traffic\b/, field: 'set_time', valid: TIME },
  { label: /\bSanding time\b/, field: 'sanding_time', valid: TIME },
  { label: /\bWaiting time before subsequent bonding\b/, field: 'tiling_time', valid: TIME },
  { label: /\bDrying time\b/, field: 'drying_time', valid: TIME },
  { label: /\bApproximate yield\b/, field: 'coverage', valid: AREA_RATE },
  { label: /\bPerformance\b/, field: 'coverage', valid: AREA_RATE },
  { label: /\bCoverage\b/, field: 'coverage', valid: AREA_RATE },
  { label: /\bApplication thickness\b/, field: 'thickness', valid: LENGTH },
  { label: /\bAdherence to (?:concrete|cement)\b/, field: 'bond_strength', valid: STRENGTH },
  { label: /\bTensile strength\b/, field: 'bond_strength', valid: STRENGTH },
  { label: /\bResist(?:a|e)nce to compression\b/, field: 'compressive_strength', valid: STRENGTH },
  { label: /\bCompression strength\b/, field: 'compressive_strength', valid: STRENGTH },
  { label: /\bClassification\b/, field: 'classification', valid: CLASS },
  { label: /\bApplication temperature range\b/, field: 'application_temperature', valid: TEMPERATURE },
];

// Outside the table. Puma word the temperature limit either way round, so
// read both and store the range the sheet actually states.
const TEMP_NEGATIVE = /Do not apply (?:the product )?(?:in|under) temperatures (?:below|of)\s*(\d+\s*(?:º|°)?\s*C)\s*(?:nor|or)\s*above\s*(\d+\s*(?:º|°)?\s*C)/i;
// The dilution is a specification in its own right on a primer, and it is the
// first thing the reader needs, but Puma only print it in the method. Read the
// stated ratios in the order they appear and keep them distinct.
const DILUTION = /\bDilut(?:e|ed)\b[^\n.]{0,80}?\b(\d\s*:\s*\d)\b[^\n.]{0,40}?\bwater\b|\bdiluted\s*(\d\s*:\s*\d)\b/gi;
// The pack sits on the first line of PACKAGING AND STORAGE.
const PACKAGING = /PACKAGING AND\s*\n?([\s\S]{0,200}?)\n\s*(?:STORAGE|Storage|Shelf life)/;

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
  let filled = 0;
  const touched: string[] = [];

  for (const rec of manifest) {
    if (rec.brand !== 'pidilite-puma' || !rec.tds.local_path) continue;
    if (only && rec.slug !== only) continue;
    const abs = path.join('public', rec.tds.local_path.replace(/^\//, ''));
    if (!fs.existsSync(abs)) continue;

    let text = '';
    try {
      const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(abs)));
      const { text: t } = await extractText(pdf, { mergePages: true });
      text = fixLigatures(Array.isArray(t) ? t.join('\n') : String(t));
    } catch {
      continue;
    }

    const added: string[] = [];
    const put = (field: string, value: string) => {
      if (!dry) rec.specs[field] = value;
      added.push(`${field}="${value}"`);
      filled++;
    };

    for (const row of ROWS) {
      if (rec.specs[row.field]) continue;
      // Read every occurrence of the label and take the first value that
      // validates, since these words also appear in the method and the notes.
      const pattern = new RegExp(`${row.label.source}\\s*\\(?\\*?\\)?\\s*:?\\s*([^\\n]{2,120})`, 'g');
      let value = '';
      for (const m of text.matchAll(pattern)) {
        const candidate = m[1]
          .replace(/\s+/g, ' ')
          .replace(/[–—]/g, '-')
          .replace(/^[-•]\s*/, '')
          .replace(/^(?:of|is|according to)\s+/i, '')
          .replace(/^[\s:]+/, '')
          // A sentence full stop is punctuation from the bullet, not value.
          .replace(/\.$/, '')
          .trim();
        if (STANDARD.test(candidate)) continue;
        if (row.valid.test(candidate)) {
          value = candidate;
          break;
        }
      }
      if (row.field === 'application_temperature') {
        const from = value.search(/from\s*\d/i);
        if (from > 0) value = value.slice(from);
      }
      if (!value) continue;
      put(row.field, value);
    }

    if (!rec.specs.application_temperature) {
      const neg = text.match(TEMP_NEGATIVE);
      if (neg) put('application_temperature', `from ${neg[1].replace(/\s+/g, '')} to ${neg[2].replace(/\s+/g, '')}`);
    }

    if (!rec.specs.dilution) {
      const ratios: string[] = [];
      for (const m of text.matchAll(DILUTION)) {
        const r = (m[1] ?? m[2]).replace(/\s+/g, '');
        if (RATIO.test(r) && !ratios.includes(r)) ratios.push(r);
      }
      if (ratios.length) put('dilution', `${ratios.join(' or ')} with clean water`);
    }

    if (!rec.specs.pack_size) {
      const pack = text.match(PACKAGING);
      const line = (pack?.[1] ?? '')
        .split('\n')
        .map((l) => l.replace(/\s+/g, ' ').trim())
        .find((l) => PACK.test(l) && !AREA_RATE.test(l));
      if (line) put('pack_size', line);
    }

    if (added.length) touched.push(`${rec.slug}  ${added.join('  ')}`);
  }

  for (const line of touched) console.log(line);
  if (!dry) fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n${filled} fields ${dry ? 'would be ' : ''}filled across ${touched.length} records.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Fill missing Mapei specification fields from the held data sheets.
 *
 * Mapei print a "TECHNICAL DATA (typical values)" block and an "APPLICATION
 * DATA" block as plain "Label: value" lines. The per category regexes in
 * scripts/lib/spec-maps.ts were written for the figures a chemical publishes,
 * so they walk straight past the ones a coating, a cleaner or an article does:
 * density, dry solids, pH, elongation, tensile strength, fabric weight. Those
 * are the fields that leave a record short of the page gate.
 *
 * Every row is read by label and validated by kind, so a standard reference
 * cannot become a value and prose cannot become a figure. Scanning stops at
 * the WARNING heading, because everything after it is legal text.
 *
 * Usage: npx tsx scripts/mapei-specs.ts [--dry] [--only slug]
 */
import fs from 'node:fs';
import path from 'node:path';
import { getDocumentProxy, extractText } from 'unpdf';
import { fixLigatures } from './lib/spec-maps';
import type { ManifestRecord } from '../src/lib/tds';

const dry = process.argv.includes('--dry');
const onlyArg = process.argv.indexOf('--only');
const only = onlyArg === -1 ? '' : process.argv[onlyArg + 1];

const NUMBER = /\d/;
const PERCENT = /\d+(?:[.,]\d+)?\s*%/;
const TIME = /\d+(?:[.,]\d+)?\s*(?:-|to)?\s*(?:\d+(?:[.,]\d+)?)?\s*(?:min\b|mins\b|minutes?|h\b|hrs?\b|hours?|days?)/i;
const TEMPERATURE = /[+-]?\d+\s*°?\s*C\b/i;
const LENGTH = /\d+(?:[.,]\d+)?\s*(?:-|to|±)?\s*(?:\d+(?:[.,]\d+)?)?\s*(?:mm|cm|m\b|μm|micron)/i;
const FORCE = /\d+(?:[.,]\d+)?\s*(?:k?N)/;
const DENSITY = /\d+(?:[.,]\d+)?\s*(?:g\/cm|kg\/m|kg\/dm|g\/l)/i;
const RATIO = /\d\s*:\s*\d|\bparts?\b|\d+(?:[.,]\d+)?\s*(?:l|litres?|ml)\b/i;
const DESCRIPTIVE = /^[^0-9]*[a-z]{4}/i;
const COLOUR = /\b(white|black|grey|gray|red|blue|green|yellow|beige|brown|ivory|cream|anthracite|sand|silver|gold|transparent|translucent|neutral|natural|colou?red|pigmented|straw|ochre|terracotta|pink|orange|violet|purple|amber|bronze|graphite|slate|charcoal|mocha|RAL\s*\d+)\b/i;
const STANDARD = /^\(?\s*(?:EN|ISO|ASTM|DIN|UNI|according)\b/i;

/** label as printed, field on the record, and what a good value looks like. */
const ROWS: Array<{ label: RegExp; field: string; valid: RegExp }> = [
  { label: /\bAppearance\b/, field: 'consistency', valid: DESCRIPTIVE },
  { label: /\bPhysical state\b/, field: 'consistency', valid: DESCRIPTIVE },
  { label: /\bConsistency\b/, field: 'consistency', valid: DESCRIPTIVE },
  { label: /\bColou?rs?\b/, field: 'colours', valid: COLOUR },
  { label: /\bBulk density\b/, field: 'density', valid: DENSITY },
  { label: /\bDensity\b/, field: 'density', valid: DENSITY },
  { label: /\bDry solids content\b/, field: 'dry_solids', valid: PERCENT },
  { label: /\bpH\b/, field: 'ph', valid: NUMBER },
  { label: /\bElongation at break\b/, field: 'elongation', valid: PERCENT },
  { label: /\bUltimate elongation\b/, field: 'elongation', valid: PERCENT },
  { label: /\bTensile strength\b/, field: 'tensile_strength', valid: FORCE },
  { label: /\bBreaking load\b/, field: 'tensile_strength', valid: FORCE },
  { label: /\bTear resistance\b/, field: 'tear_resistance', valid: FORCE },
  { label: /\bThickness\b/, field: 'thickness', valid: LENGTH },
  { label: /\bWeight\b/, field: 'weight', valid: NUMBER },
  { label: /\bType of fibre\b/, field: 'fibre_type', valid: DESCRIPTIVE },
  { label: /\bTemperature when in use\b/, field: 'application_temperature', valid: TEMPERATURE },
  { label: /\bApplication temperature\b/, field: 'application_temperature', valid: TEMPERATURE },
  { label: /\bPot life\b/, field: 'pot_life', valid: TIME },
  { label: /\bOpen time\b/, field: 'open_time', valid: TIME },
  { label: /\bWaiting time\b/, field: 'set_time', valid: TIME },
  { label: /\bSet(?:ting)? time\b/, field: 'set_time', valid: TIME },
  { label: /\bMixing ratio\b/, field: 'mixing_ratio', valid: RATIO },
  { label: /\bDilution\b/, field: 'dilution', valid: RATIO },
  { label: /\bOdour\b/, field: 'odour', valid: DESCRIPTIVE },
  { label: /\bFlash point\b/, field: 'flash_point', valid: TEMPERATURE },
  { label: /\bDamp abrasion\b/, field: 'abrasion_resistance', valid: NUMBER },
  { label: /\bWater absorption\b/, field: 'water_absorption', valid: NUMBER },
  { label: /\bVapour diffusion strength coefficient\b/, field: 'vapour_resistance', valid: NUMBER },
  { label: /\bWater-vapour transmission resistance\b/, field: 'vapour_resistance', valid: NUMBER },
  { label: /\bAlkali resistance\b/, field: 'alkali_resistance', valid: DESCRIPTIVE },
  { label: /\bBehaviour in water\b/, field: 'water_behaviour', valid: DESCRIPTIVE },
  { label: /\bComposition\b/, field: 'composition', valid: DESCRIPTIVE },
];

// Mapei often put the unit in the row label, as in "Density (kg/dm3): 1.5",
// which leaves the value a bare number. A unit bearing label is therefore
// enough on its own, and the value only has to carry a figure.
const UNIT_IN_LABEL = /\(\s*[^)]*(?:kg|g|l|mm|cm|m|%|N|\u00b0C|cycles)[^)]*\)/i;

/**
 * A table row runs on past the end of the line, so the captured value can stop
 * mid clause. Cut it back to something that reads as a complete value, and
 * collapse the repeat a two component product's two columns produce.
 */
function tidy(value: string): string {
  // Curly quotes come out of the PDF; the house copy rules want straight ones.
  let out = value.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  // An unclosed parenthesis means the qualifier was cut off, so drop it.
  if ((out.match(/\(/g) ?? []).length > (out.match(/\)/g) ?? []).length) {
    out = out.slice(0, out.lastIndexOf('(')).trim();
  }
  // Trailing conjunctions and prepositions are the tail of a cut sentence.
  out = out.replace(/[\s,;]*\b(and|or|the|of|to|with|according|depending|in|on|by|for|from|a|an|obtained|used|based|mixed|added|applied|required|measured)\s*$/i, '');
  out = out.replace(/[\s,;:.]+$/, '');
  // "100% 100%" and "1.65 g/cm3 1.65 g/cm3" are one figure printed twice, once
  // per component column.
  const halves = out.split(/\s+/);
  if (halves.length % 2 === 0) {
    const a = halves.slice(0, halves.length / 2).join(' ');
    const b = halves.slice(halves.length / 2).join(' ');
    if (a === b) out = a;
  }
  return out.trim();
}

/**
 * Pack size lives in its own PACKAGING section rather than in the data table,
 * written as "<product> is available in 25 kg bags". The value must carry a
 * quantity, which is what stops a storage sentence being read as a pack.
 */
const PACKAGING = /\bPACKAGING\b([\s\S]{0,400})/;
const AVAILABLE = /\bis (?:available|supplied) in\s+([^.\n]{3,110})/i;
const QUANTITY = /\d+(?:[.,]\d+)?\s*(kg|g|l|lt|ml|litres?|liters?|m\b|mm)\b/i;

function packSizeFrom(text: string): string {
  const block = text.match(PACKAGING);
  const hunting = block ? block[1] : text;
  const hit = hunting.match(AVAILABLE);
  if (!hit) return '';
  const value = tidy(hit[1].replace(/\s+/g, ' ').trim());
  return QUANTITY.test(value) ? value : '';
}

/** Everything after this heading is legal boilerplate, not data. */
function dataSection(text: string): string {
  const start = text.search(/TECHNICAL DATA|CHEMICAL-PHYSICAL PROPERTIES|APPLICATION DATA/);
  const body = start === -1 ? text : text.slice(start);
  const end = body.search(/\n\s*(?:WARNING|LEGAL NOTICE)\b/);
  return end === -1 ? body : body.slice(0, end);
}

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
  let filled = 0;
  const touched: string[] = [];

  for (const rec of manifest) {
    if (rec.brand !== 'mapei' || !rec.tds.local_path) continue;
    if (only && rec.slug !== only) continue;
    const abs = path.join('public', rec.tds.local_path.replace(/^\//, ''));
    if (!fs.existsSync(abs)) continue;

    let text = '';
    let whole = '';
    try {
      const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(abs)));
      const { text: t } = await extractText(pdf, { mergePages: true });
      whole = fixLigatures(Array.isArray(t) ? t.join('\n') : String(t));
      text = dataSection(whole);
    } catch { continue; }

    const added: string[] = [];
    for (const row of ROWS) {
      if (rec.specs[row.field]) continue;
      // The label also appears in the application notes, so walk every
      // occurrence and take the first value that validates.
      const pattern = new RegExp(`(${row.label.source}[^:\\n]{0,40}):\\s*([^\\n]{1,110})`, 'g');
      let value = '';
      for (const m of text.matchAll(pattern)) {
        const unitInLabel = UNIT_IN_LABEL.test(m[1]);
        const candidate = m[2]
          .replace(/\s+/g, ' ')
          .replace(/[–—]/g, '-')
          .replace(/^[-•\s:]+/, '')
          .trim();
        if (!candidate || STANDARD.test(candidate)) continue;
        const accepts = row.valid.test(candidate) || (unitInLabel && NUMBER.test(candidate));
        if (!accepts) continue;
        let kept = tidy(candidate);
        // A bare number taken from a unit bearing label would render without
        // its unit, so carry the unit over from the label.
        // "approx. 1.58" has letters but no unit, so test for a unit rather
        // than for any letter at all.
        const HAS_UNIT = /\b(?:kg|g|l|ml|mm|cm|m|N|%|cycles)\b|\/|\u00b0C|g\/cm|kg\/m/i;
        if (unitInLabel && !HAS_UNIT.test(kept)) {
          // A label can carry two parentheses, the unit and the standard, as
          // in "Density (kg/dm3) (EN ISO 2811-1):". Take the one that is a
          // unit and never the standard reference.
          const groups = [...m[1].matchAll(/\(\s*([^)]+?)\s*\)/g)].map((g) => g[1]);
          const unit = groups.find((g) => !/^(?:EN|ISO|ASTM|DIN|UNI)\b/i.test(g) && /^[a-z%\u00b0\/\u00b2\u00b3 ]+$/i.test(g));
          if (unit) kept = `${kept} ${unit}`;
        }
        value = kept;
        break;
      }
      if (!value) continue;
      if (!dry) rec.specs[row.field] = value;
      added.push(`${row.field}="${value}"`);
      filled++;
    }
    if (!rec.specs.pack_size) {
      const pack = packSizeFrom(whole);
      if (pack) {
        if (!dry) rec.specs.pack_size = pack;
        added.push(`pack_size="${pack}"`);
        filled++;
      }
    }
    if (added.length) touched.push(`${rec.slug}\n    ${added.join('\n    ')}`);
  }

  for (const line of touched) console.log(line);
  if (!dry) fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n${filled} fields ${dry ? 'would be ' : ''}filled across ${touched.length} records.`);
}

main().catch((e) => { console.error(e); process.exit(1); });

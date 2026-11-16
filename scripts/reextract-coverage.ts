/**
 * Repair coverage figures from the held data sheets.
 *
 * The per category regexes often catch the sentence that introduces a
 * consumption table rather than the figure in it, so a record ends up with
 * "Consumption depends on the roughness of the substrate" and no rate. The
 * consumption calculator then falls back to a figure found in the product
 * copy, which is a worse authority than the sheet itself.
 *
 * This reads each product's own PDF and takes the first figure that carries a
 * real rate unit. A value with no rate unit is never accepted, which is what
 * stops a pack size being read as a coverage. Where the sheet gives a table by
 * coat or by trowel, the whole line is kept so the page shows the tiers.
 *
 * Usage: npx tsx scripts/reextract-coverage.ts [--dry] [--brand mapei]
 */
import fs from 'node:fs';
import path from 'node:path';
import { getDocumentProxy, extractText } from 'unpdf';
import { fixLigatures } from './lib/spec-maps';
import type { ManifestRecord } from '../src/lib/tds';

const MANIFEST = 'data/manifest.json';
const dry = process.argv.includes('--dry');
const brandArg = process.argv.indexOf('--brand');
const only = brandArg === -1 ? '' : process.argv[brandArg + 1];

// A rate always pairs a quantity with an area, in either direction. Anything
// without one of these units is not a consumption figure.
const RATE = /(\d+(?:[.,]\d+)?)\s*(?:-|to|–)?\s*(\d+(?:[.,]\d+)?)?\s*(kg|g|l|lt|ltr|litres?|liters?|kilograms?)\s*(?:\/|\s+per\s+)\s*(?:m2|m²|sq\.?\s*m)|(\d+(?:[.,]\d+)?)\s*(?:m2|m²)\s*\/\s*(kg|g|l|lt|ltr)/i;

// Mapei's table rows put the unit in the row label and the figure after it,
// as in "(kg/m2): 0.3-0.5 (per coat)". A value in that shape is already a
// good rate, so it must not be treated as missing one and overwritten.
const RATE_REVERSED = /\(?\s*(?:kg|g|l|lt|ltr)\s*\/\s*(?:m2|m²)[^)]*\)?\s*:?\s*\d/i;
const hasRate = (value: string) => RATE.test(value) || RATE_REVERSED.test(value);

// Where the kept line runs on into the next section of the sheet, cut it.
const TERMINATOR = /\s+(PACKAGING|PACKING|STORAGE|CLEANING|COLOURS?|SAFETY|WARNING|TECHNICAL DATA|Technical Data|APPLICATION PROCEDURE|SHELF LIFE|Values taken at|Data may vary|The substrate must|When applying|Drying times?|we recommend|We recommend|depending on the selected system)\b/;

// A CONSUMPTION section sometimes opens by quoting a different material in the
// system, as in "Consumption of the primer is around 200 g/m2" on a membrane
// sheet. That figure belongs to the primer, not to this product.
const BORROWED = /^(?:of|for)\s+the\s+(primer|adhesive|membrane|sealer|sealant|mortar|binder|topcoat|top coat|base coat|levelling|grout)/i;


// Sheets label it one of these ways. Taking the text after the label keeps the
// search away from density and mix water figures elsewhere on the page.
const LABELS = [
  /theoretical\s+consumption\s*:?\s*/i,
  /\bconsumption\s+rate\s*:?\s*/i,
  /\bCONSUMPTION\b\s*:?\s*/,
  /\bcoverage\b\s*:?\s*/i,
  /\bapproximate\s+(?:consumption|coverage)\s*:?\s*/i,
];

function rateFrom(text: string): string | null {
  for (const label of LABELS) {
    let from = 0;
    // A sheet can repeat the label, so walk every occurrence before giving up.
    for (;;) {
      const rest = text.slice(from);
      const m = rest.match(label);
      if (!m || m.index === undefined) break;
      const start = from + m.index + m[0].length;
      const window = text.slice(start, start + 320);
      const hit = window.match(RATE);
      // A labelled figure sits close to its label. Further out than this and
      // the match belongs to a different paragraph, which is how a grout whose
      // consumption is only given as a joint geometry table picked up a rate.
      if (hit && (hit.index ?? 0) < 140) {
        const opening = window.replace(/^[:\s.]+/, '');
        if (BORROWED.test(opening)) { from = start; continue; }
        // Keep the sentence or table line the figure sits in, trimmed, so the
        // page can show a tier by coat or by trowel rather than a bare number.
        let line = window.slice(0, Math.min(window.length, (hit.index ?? 0) + hit[0].length + 90));
        line = line.replace(/\s+/g, ' ').replace(/^[:\s.]+/, '').trim();
        const cut = line.match(TERMINATOR);
        if (cut && cut.index !== undefined && cut.index > 0) line = line.slice(0, cut.index).trim();
        // A full stop followed by a capital starts the next section of the
        // sheet, which has nothing to do with the rate.
        const sentence = line.match(/\.\s+[A-Z]/);
        if (sentence && sentence.index !== undefined && sentence.index > 10) line = line.slice(0, sentence.index + 1).trim();
        // Some sheets write decimals with a comma. Normalise only a comma
        // followed by one or two digits, so thousands separators survive.
        line = line.replace(/(\d),(\d{1,2})(?!\d)/g, '$1.$2');
        // The house rule bans en and em dashes, and the sheets use them for
        // ranges, so a range becomes a plain hyphen before it is stored.
        line = line.replace(/[\u2013\u2014\u2212]/g, '-');
        return line.replace(/[\s.,;(\u2013-]+$/, '').trim();
      }
      from = start;
    }
  }
  return null;
}

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  let repaired = 0, filled = 0, skipped = 0;

  for (const rec of manifest) {
    if (only && rec.brand !== only) continue;
    const local = rec.tds.local_path;
    if (!local) continue;
    const abs = path.join('public', local.replace(/^\//, ''));
    if (!fs.existsSync(abs)) continue;

    const current = rec.specs.coverage ?? '';
    if (hasRate(current)) { skipped++; continue; }

    let full = '';
    try {
      const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(abs)));
      const { text } = await extractText(pdf, { mergePages: true });
      full = fixLigatures(Array.isArray(text) ? text.join('\n') : String(text));
    } catch { continue; }

    const found = rateFrom(full);
    if (!found) continue;

    console.log(`${rec.brand}/${rec.slug}\n  was: ${current ? `"${current.slice(0, 70)}"` : '(none)'}\n  now: "${found.slice(0, 110)}"`);
    if (!dry) rec.specs.coverage = found;
    if (current) repaired++; else filled++;
  }

  if (!dry) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n${repaired} coverage strings replaced, ${filled} added where there was none, ${skipped} already carried a rate.`);
}

main().catch((e) => { console.error(e); process.exit(1); });

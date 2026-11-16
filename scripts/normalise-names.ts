/**
 * Title case the Mapei product names that came out of the catalogue in capitals.
 *
 * Mapei's listing API returns "ULTRALITE S1 QUICK", and that string is what the
 * page title, the breadcrumb, the search result, the JSON-LD and llms.txt all
 * render, so 27 products read as shouting next to the rest. The copy already
 * uses title case, so only the name field is out of step.
 *
 * Product codes must survive: S1, S2, 2K, P909, V4, CQ, FF, LVT and the rest
 * are not words and lose their meaning in title case. A token is left alone if
 * it is short and letter and digit shaped, or if it is a known abbreviation.
 * Slugs are untouched, so no URL changes.
 *
 * Usage: npx tsx scripts/normalise-names.ts [--dry]
 */
import fs from 'node:fs';
import type { ManifestRecord } from '../src/lib/tds';

const dry = process.argv.includes('--dry');

// Abbreviations of three letters or more that would otherwise be title cased.
const KEEP = new Set(['LVT', 'PU', 'ME', 'TNS', 'CPU', 'EPD', 'GEV', 'VOC', 'HPD', 'WPS', 'AL', 'TPE', 'FBT', 'SA', 'HR', 'UV']);

function titleCaseName(name: string): string {
  return name
    .split(' ')
    .map((token) => {
      if (KEEP.has(token)) return token;
      // A code rather than a word: one or two letters with optional digits
      // (S1, T, CQ), a letter then digits (P10, V4), or digits then letters (2K).
      if (/^[A-Z]{1,2}\d*$/.test(token)) return token;
      if (/^[A-Z]\d+$/.test(token)) return token;
      if (/^\d+[A-Z]+$/.test(token)) return token;
      if (/^\d+$/.test(token)) return token;
      return token.charAt(0) + token.slice(1).toLowerCase();
    })
    .join(' ');
}

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const now = new Date().toISOString().slice(0, 10);
let renamed = 0;

for (const rec of manifest) {
  if (rec.brand !== 'mapei') continue;
  if (rec.name !== rec.name.toUpperCase() || rec.name.length <= 3) continue;
  const next = titleCaseName(rec.name);
  if (next === rec.name) continue;
  console.log(`${rec.slug.padEnd(30)} "${rec.name}"  ->  "${next}"`);
  if (!dry) { rec.name = next; rec.updated_at = now; }
  renamed++;
}

// Two lightweight adhesives were filed as accessories by the classifier, which
// reads "lightweight" as hardware. They are C2 class adhesives.
for (const slug of ['ultralite-s1-quick', 'ultralite-s2-flex']) {
  const rec = manifest.find((r) => r.brand === 'mapei' && r.slug === slug);
  if (rec && rec.category === 'accessory') {
    rec.category = 'tile_adhesive';
    rec.updated_at = now;
    console.log(`${slug.padEnd(30)} accessory -> tile_adhesive`);
  }
}

if (!dry) fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${renamed} names title cased.`);

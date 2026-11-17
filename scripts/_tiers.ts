import fs from 'node:fs';
import type { ManifestRecord } from '../src/lib/tds';

/** A row of a manufacturer's consumption table. */
interface Tier { label: string; trowel: string; min: number; max: number }

const RATE = /(\d+(?:\.\d+)?)\s*(?:-|to|–)?\s*(\d+(?:\.\d+)?)?\s*kg\s*\/\s*m/i;
const TROWEL = /trowel\s*(?:no\.?|n\.?|#)?\s*([\d/]+)|(\d+)\s*mm\s*notch|notched?\s*trowel|spreader\s*(?:no\.?)?\s*([\d/]+)/i;

/**
 * Split a coverage string into the rows the sheet actually prints.
 *
 * Manufacturers write these as a bulleted run, sometimes with a heading in
 * front, and the separator varies: a black square, a middle dot, a semicolon,
 * or just a capital starting a new clause after a rate.
 */
function segments(text: string): string[] {
  let t = text.replace(/[▪·•]/g, '|');
  // "2.5-3 kg/m² Normal sizes (trowel..." has no separator at all, so break
  // after a rate when a new clause clearly starts.
  t = t.replace(/(kg\s*\/\s*m[²2]?)\s*(?=[A-Z][a-z])/gi, '$1|');
  t = t.replace(/;/g, '|');
  return t.split('|').map((s) => s.trim()).filter(Boolean);
}

function parseTiers(text: string): Tier[] {
  const out: Tier[] = [];
  for (const seg of segments(text)) {
    const rate = seg.match(RATE);
    if (!rate) continue;
    const trowel = seg.match(TROWEL);
    if (!trowel) continue;
    const min = parseFloat(rate[1]);
    const max = rate[2] ? parseFloat(rate[2]) : min;
    // The label is the words before the bracket, cleaned of leading headings.
    const label = seg
      .replace(/\(.*?\)/g, '')
      .replace(RATE, '')
      .replace(/^(?:bonding of|bonding|ceramic tiling|for)\s+/i, '')
      .replace(/[:,.\s]+$/, '')
      .replace(/^[:,.\s]+/, '')
      .replace(/\s+/g, ' ')
      .trim();
    const notch = trowel[1] ?? trowel[2] ?? trowel[3] ?? '';
    out.push({ label: label || 'As the sheet states', trowel: notch, min, max });
  }
  return out;
}

const m: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const ship = m.filter((r) => r.page_status === 'generated' || r.page_status === 'live');
let withTiers = 0;
const samples: string[] = [];
for (const r of ship) {
  const tiers = parseTiers(r.specs.coverage ?? '');
  if (tiers.length >= 2) {
    withTiers++;
    if (samples.length < 5) {
      samples.push(`${r.brand}/${r.slug}\n` + tiers.map((t) => `     trowel ${t.trowel.padEnd(5)} ${t.min}-${t.max} kg/m2   ${t.label.slice(0, 48)}`).join('\n'));
    }
  }
}
console.log(`${withTiers} of ${ship.length} shipping products parse into 2 or more tiers\n`);
for (const s of samples) console.log('  ' + s + '\n');

/**
 * Fill missing Kerakoll pack sizes from the held data sheets.
 *
 * Kerakoll's technical data table labels the field "Pack", not "Packaging",
 * and writes it as "monopack 10 kg (8.6 +1.4 kg)" or "bags 25 kg". The value
 * must carry a quantity, which is what stops a storage warning being read as
 * a pack size.
 *
 * Usage: npx tsx scripts/kerakoll-packs.ts [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { getDocumentProxy, extractText } from 'unpdf';
import { fixLigatures } from './lib/spec-maps';
import type { ManifestRecord } from '../src/lib/tds';

const dry = process.argv.includes('--dry');
// Global, because the word appears earlier in the application notes and only
// the row in the technical data table carries a quantity.
const PACK = /\bPack\b\s*:?\s*([^\n]{3,90})/g;
const QUANTITY = /\d+(?:[.,]\d+)?\s*(kg|g|l|lt|ml|litres?|liters?|kgs)\b/i;

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
  let filled = 0;

  for (const rec of manifest) {
    if (rec.brand !== 'kerakoll' || rec.specs.pack_size) continue;
    if (!rec.tds.local_path) continue;
    const abs = path.join('public', rec.tds.local_path.replace(/^\//, ''));
    if (!fs.existsSync(abs)) continue;

    let text = '';
    try {
      const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(abs)));
      const { text: t } = await extractText(pdf, { mergePages: true });
      text = fixLigatures(Array.isArray(t) ? t.join('\n') : String(t));
    } catch { continue; }

    let value = '';
    for (const m of text.matchAll(PACK)) {
      const candidate = m[1].replace(/\s+/g, ' ').replace(/[–—]/g, '-').trim();
      if (QUANTITY.test(candidate)) { value = candidate; break; }
    }
    if (!value) continue;

    console.log(`${rec.slug}  "${value}"`);
    if (!dry) rec.specs.pack_size = value;
    filled++;
  }

  if (!dry) fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n${filled} pack sizes ${dry ? 'would be ' : ''}filled from the sheets.`);
}

main().catch((e) => { console.error(e); process.exit(1); });

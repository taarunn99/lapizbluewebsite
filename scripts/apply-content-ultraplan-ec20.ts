/**
 * Rewrite Ultraplan Eco 20 against its own data sheet.
 *
 * It was first written while the record carried the parent ULTRAPLAN sheet, so
 * the copy stated 25 to 26 parts water and a twelve hour wait before wood. Its
 * real sheet is Mapei 00? ULTRAPLAN EC20, which says 24 to 25 parts, 5.5 to
 * 5.75 litres a 23 kg bag, and forty eight hours before wood. Every figure
 * below is from that sheet.
 *
 * Usage: npx tsx scripts/apply-content-ultraplan-ec20.ts
 */
import fs from 'node:fs';
import type { ManifestRecord } from '../src/lib/tds';

const description =
  'Depth is the first question with a smoothing compound, and this one answers it in layers. ' +
  'Ultraplan Eco 20 takes 1 to 10 mm in a single pour, and the sheet allows up to 20 mm only if ' +
  'about 30 per cent by weight of 0.5 mm graded sand goes into the mix. A 23 kg bag needs 5.5 to ' +
  '5.75 litres of clean water, left to stand two to three minutes and then re-stirred. A second ' +
  'layer can go straight onto the first while it is still only set to light foot traffic, roughly ' +
  'three hours at +23C. Once the first has dried out it has to be abraded and primed again. ' +
  'Ceramic follows after three hours, resilient and carpet after twenty four, wood after forty ' +
  'eight. On a UAE slab, read that moisture with a carbide hygrometer rather than trusting the clock.';

const meta_description =
  'Ultraplan Eco 20 self levelling compound, 1 to 10 mm per layer in 23 kg bags, with data sheet ' +
  'and coverage calculator. Mapei dealer, Lapiz Blue UAE.';

const applications = [
  'levelling and smoothing interior substrates from 1 to 10 mm',
  'preparing a substrate before ceramic, resilient, carpet or wood',
  'levelling anhydrite substrates after a suitable primer',
  'areas carrying wheeled service loads, at a minimum 3 mm',
  'smoothing over existing ceramic or natural stone once primed',
  'refurbishment where a ceramic covering follows the same day',
];

const words = description.trim().split(/\s+/).length;
if (words < 100 || words > 150) throw new Error(`description is ${words} words, needs 100 to 150`);
if (meta_description.length < 140 || meta_description.length > 165) {
  throw new Error(`meta is ${meta_description.length} characters, needs 140 to 165`);
}
for (const text of [description, meta_description, ...applications]) {
  if (/[–—]/.test(text)) throw new Error('em or en dash found');
}

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const rec = manifest.find((r) => r.brand === 'mapei' && r.slug === 'ultraplan-eco-20');
if (!rec) throw new Error('no ultraplan-eco-20 record');
if (rec.tds.status !== 'verified') throw new Error('no verified sheet on the record');

rec.description = description;
rec.meta_description = meta_description;
rec.applications = applications;
rec.page_status = 'generated';
rec.updated_at = new Date().toISOString().slice(0, 10);

fs.writeFileSync('data/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`ultraplan-eco-20 rewritten: ${words} words, meta ${meta_description.length} characters.`);

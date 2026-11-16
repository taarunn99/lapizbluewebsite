/*
  Editorial content for the second batch of the Mapei self levelling and
  microcement line: the stocked Ultraplan bag grades and the Ultratop
  components that are batched into a floor rather than laid as one.

  Original copy, 100 to 150 words per product, written from each record's own
  specs, the data sheet held at public/tds/mapei/<slug>.pdf and the Mapei
  catalogue classification.

  Usage: npx tsx scripts/apply-content-mapei-leveling-2.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

interface Entry {
  description: string;
  meta_description: string;
  applications?: string[];
  category?: TdsCategory;
}

const content: Record<string, Entry> = {
  'ultraplan-eco': {
    description:
      'Everything about this grade is decided by the 1 to 10 mm window it is built for. Ultraplan Eco is the 23 kg bag of fibre reinforced, ultra rapid hardening self levelling smoothing compound, classified CT C30 F7 A2fl-s1 and laid in a single layer with a large metal trowel, a squeegee or an automatic pressure pump over runs beyond 100 m. Below 1 mm there is nothing for it to do, and above 10 mm the sheet sends you to graded sand or to a Maxi grade instead. It takes ceramic coverings after three hours and resilient or wooden floors after twelve, at 1.6 kg/m² per mm of thickness, interior only. In UAE heat follow the hot weather routine the sheet sets out: shade the stored bags, mix with cool water, keep the pour out of the hottest hours.',
    meta_description:
      'Ultraplan Eco fibre reinforced self levelling compound for 1 to 10 mm layers, 23 kg bags, CT C30 F7. Request the data sheet and prices from Lapiz Blue UAE.',
    applications: [
      'Levelling concrete slabs and cementitious screeds',
      'Levelling Topcem and Mapecem Pronto based screeds',
      'Levelling anhydrite substrates',
      'Levelling over underfloor heating and cooling systems',
      'Levelling existing terrazzo, ceramic and natural stone floors',
      'Hospitals, hotels, theatres, schools and shopping centres',
    ],
  },
  'ultraplan-eco-20': {
    description:
      'Two coats are possible with this compound, and the data sheet is specific about how to get them. Ultraplan Eco 20 is a 23 kg bag of ultra rapid hardening self levelling smoothing compound for 1 to 10 mm per layer, mixed at 25 to 26 parts water per 100 parts powder, roughly 5.75 to 6 litres a bag, left to stand for two to three minutes and then restirred. A second layer goes on as soon as the first is set to light foot traffic, about three hours at +23°C; once the first has dried out completely it has to be primed again with diluted Primer G or Eco Prim T Plus before the next pour. Before wood is laid over a UAE slab, read the moisture with a carbide hygrometer rather than trusting the twelve hour figure.',
    meta_description:
      'Ultraplan Eco 20 ultra rapid hardening self levelling smoothing compound, 1 to 10 mm per layer in 23 kg bags. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Levelling new and existing interior substrates',
      'Levelling concrete slabs and cementitious screeds',
      'Levelling anhydrite substrates',
      'Levelling over underfloor heating and cooling systems',
      'Preparation before ceramic, resilient and wooden flooring',
      'Areas subject to wheeled loads such as chairs and trolleys',
    ],
  },
  'ultraplan-fast-track': {
    description:
      'Named for the programme rather than for the floor, Ultraplan Fast Track trades on how soon the next trade can follow it. Setting takes 45 to 60 minutes, the surface is set to light foot traffic after about three hours, ceramic can be fixed at three hours and resilient or wooden coverings at twelve, whatever the thickness within the 1 to 10 mm this grade covers. That window is the whole argument against a screed binder, which counts its drying in days rather than hours. It is supplied as 23 kg bags of grey fine powder, EMICODE EC1 Plus, classified CT C30 F7 A2fl-s1, used at 1.6 kg/m² per mm and for interior work only. Pot life is 20 to 30 minutes at +23°C and shortens as the temperature climbs, so on a UAE site mix only what the gang can lay.',
    meta_description:
      'Ultraplan Fast Track self levelling smoothing compound, ceramic at 3 hours and resilient or wood at 12, 1 to 10 mm layers. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Floors that must receive a covering quickly',
      'Levelling concrete slabs and cementitious screeds',
      'Levelling existing terrazzo, ceramic and natural stone floors',
      'Levelling over underfloor heating and cooling systems',
      'Preparation before all kinds of flooring',
      'Hospitals, hotels, theatres, schools and shopping centres',
    ],
  },
  'ultraplan-fiber': {
    description:
      'Fibre reinforcement is the reason a layer this thin can be poured in one pass and left alone. Ultraplan Fiber is supplied as a unit, a 23 kg bag with a 0.250 kg companion pack, and the fibre in the mix is what lets the compound be spread up to 10 mm per layer without shrinkage, cracking or crazing while it dries ultra fast. In an unreinforced levelling layer that speed of drying is exactly where crazing shows up. The rest follows the Ultraplan sheet: 1 to 10 mm per layer, 25 to 26 parts water per 100 parts powder, 1.6 kg/m² per mm, CT C30 F7 A2fl-s1, interior use only, and at least 3 mm of build up where wood is to be overlaid. Shield a fresh pour from wind and draughts, which on a UAE site means closing the openings.',
    meta_description:
      'Ultraplan Fiber fibre reinforced self levelling compound for 1 to 10 mm layers with no cracking or crazing, 23 kg unit. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Levelling concrete slabs and cementitious screeds',
      'Levelling Topcem Pronto and Mapecem based screeds',
      'Levelling anhydrite substrates',
      'Levelling existing terrazzo, ceramic and magnesite floors',
      'Levelling over underfloor heating and cooling systems',
      'Preparation before resilient and wooden flooring',
    ],
  },
  'ultraplan-maxi-fibre': {
    description:
      'Depth is what separates the Maxi grades from the rest of this range. Ultraplan Maxi Fibre comes as a unit of a 25 kg bag with a 0.250 kg companion pack, fibre reinforced in the same way as Ultraplan Fiber but held for slabs sitting further out of level than a thin compound is meant to correct. The Ultraplan sheet is blunt on that point: past 10 mm you either add graded sand to the mix or move to a product made for thicker sections, which is the decision this bag answers. Substrate work does not change, so expect a solid, dry, dust free surface, Primer G or Eco Prim T Plus over porous concrete, ceramic and anhydrite, and Eporip in the cracks. Confirm the layer thickness with us before ordering quantities for a UAE pour.',
    meta_description:
      'Ultraplan Maxi Fibre fibre reinforced self levelling smoothing compound for deeper levelling, 25 kg unit. Request the data sheet and prices from Lapiz Blue UAE.',
    applications: [
      'Levelling new and existing interior substrates',
      'Levelling concrete slabs and cementitious screeds',
      'Levelling anhydrite substrates',
      'Levelling existing terrazzo, ceramic and natural stone floors',
      'Levelling over underfloor heating and cooling systems',
      'Preparation before all kinds of flooring',
    ],
  },
  'ultratop-binder': {
    description:
      'White, and sold as the binder rather than as a finished shade, Ultratop Binder is a component of the Ultratop flooring system rather than a floor in its own right. The 25 kg bag carries the self levelling cementitious mortar itself, based on special hydraulic binders, classified CT C40 F10 A9 A2fl-s1 with adhesion to concrete above 1.5 N/mm² and laid 5 to 40 mm thick in a single pass. What it leaves open is colour, built on site with Ultratop Color Paste instead of ordered as a pre-coloured bag. Pot life is 15 minutes, light foot traffic follows in three to four hours, and consumption runs 16.5 to 17.5 kg/m² per centimetre of thickness. The sheet caps application at +35°C, which quietly rules out an unconditioned UAE slab through the summer.',
    meta_description:
      'Ultratop Binder white 25 kg component of the Ultratop self levelling flooring system, coloured on site, 5 to 40 mm. Data sheet from Lapiz Blue UAE.',
    applications: [
      'New floors in shopping centres, shops and showrooms',
      'Abrasion resistant floors on concrete and old terrazzo',
      'Polished floors in showrooms, restaurants and flats',
      'Terrazzo alla veneziana floors with natural aggregates',
      'Areas carrying rubber wheeled vehicle traffic',
      'Levelling new and existing concrete and ceramic substrates',
    ],
  },
  'ultratop-color-paste': {
    description:
      'Pigment and nothing else: Ultratop Color Paste comes in black and brown 1 kg packs, colours an Ultratop floor during mixing, and is never laid on its own. The reason to treat it carefully is a warning the Ultratop data sheet gives plainly, that the colour of a cementitious floor is not always uniform and that the differences are caused as much by how the material is applied as by the product. Paste dosed by eye from batch to batch, or a pour broken by long pauses, reads as banding across a continuous floor and cannot be corrected afterwards. With a 15 minute pot life and a mix that has to be cast in a regular continuous flow, set the mixing station out before the first bag is opened. On UAE work, order the paste for a whole floor in one delivery.',
    meta_description:
      'Ultratop Color Paste black and brown 1 kg pigment for colouring Ultratop self levelling floors during mixing. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Coloured floors in shops, restaurants and showrooms',
      'Polished floors in shopping centres and showrooms',
      'Terrazzo alla veneziana floors with natural aggregates',
      'Abrasion resistant floors on concrete and old terrazzo',
      'New floors in supermarkets and exhibition halls',
    ],
  },
  'ultratop-outdoor': {
    description:
      'Read the data sheet before this bag is specified outside. Ultratop Outdoor is the standard colour 25 kg grade of the Ultratop range, and the sheet held against it is the Ultratop sheet, which describes the mortar as used internally in public and industrial buildings to level concrete and ceramic substrates 5 to 40 mm thick for heavy pedestrian use. Every figure on that sheet applies here: CT C40 F10 A9 A2fl-s1, roughly 20 to 22 parts water per 100 parts powder, a 15 minute pot life, light foot traffic in three to four hours, 16.5 to 17.5 kg/m² per centimetre, and an application range that stops at +35°C. For an exposed UAE terrace or a deck in direct sun, confirm the exposure and the finishing system with us rather than reading those figures across.',
    meta_description:
      'Ultratop Outdoor standard colour 25 kg self levelling cementitious mortar for abrasion resistant floors, 5 to 40 mm. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Levelling new and existing concrete and ceramic substrates',
      'New floors in shopping centres, supermarkets and shops',
      'Abrasion resistant floors on ceramic tiles and natural stone',
      'Industrial floors later protected with epoxy coatings',
      'Heavy pedestrian areas in public and industrial buildings',
      'Areas carrying rubber wheeled vehicle traffic',
    ],
  },
};

function main() {
  let skipped = 0;
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);
  let written = 0;
  const warnings: string[] = [];

  for (const [slug, entry] of Object.entries(content)) {
    const rec = manifest.find((r) => r.brand === 'mapei' && r.slug === slug);
    if (!rec) {
      warnings.push(`no record for ${slug}`);
      continue;
    }
    // A Mapei record with no verified sheet of its own had a parent product's
    // sheet pulled off it, so its figures came from a different document.
    // Skip it here rather than ship copy sourced from the wrong sheet.
    if (rec.tds.status !== 'verified') {
      console.log(`skipped ${slug}: no data sheet of its own yet`);
      skipped++;
      continue;
    }
    const words = entry.description.trim().split(/\s+/).length;
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words`);
    if (entry.meta_description.length > 165) warnings.push(`${slug}: meta ${entry.meta_description.length} chars`);
    if (/[\u2013\u2014]/.test(entry.description + entry.meta_description)) warnings.push(`${slug}: em or en dash`);

    rec.description = entry.description;
    rec.meta_description = entry.meta_description;
    if (entry.applications) rec.applications = entry.applications;
    if (entry.category) rec.category = entry.category;
    rec.page_status = 'generated';
    rec.updated_at = now;
    written++;
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`${written} records updated.`);
  if (warnings.length) {
    console.log(`\n${warnings.length} warnings:`);
    for (const w of warnings) console.log(`  ${w}`);
  }
}

main();

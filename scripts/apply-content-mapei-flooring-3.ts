/*
  Editorial content for the last stocked Mapei flooring systems records that
  still had no copy: four Mapecoat TNS sports surfacing components, two
  Mapefloor resin layers, the Mapefloor floor detergent, the Mapesilent
  under screed acoustic panel and the two synthetic grass seaming tapes.

  Most of these are components of a system rather than a finished floor, so
  each description says which layer it is, what goes above and below it, and
  where a product cannot be used on its own at all.

  Original copy, 100 to 150 words per product, written from each record's own
  specs, from the data sheet held at public/tds/mapei/<slug>.pdf read with
  pdftotext, and from the classification carried in the Mapei catalogue. No
  figure appears here that is not in one of those three.

  Records whose sheet is not verified are skipped rather than written, so a
  record that lost its own document never picks up copy from another one.

  Usage: npx tsx scripts/apply-content-mapei-flooring-3.ts
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
  'mapecoat-tns-binder': {
    description:
      'Nothing here goes down neat. Mapecoat TNS Binder is an acrylic resin binder in water dispersion, diluted with 15 to 20 per cent water and then mixed with graded quartz sand to make the paste that actually builds a tennis court, a multi purpose pitch, a cycle track or a footpath. The ratio decides the layer: 40:60 binder to quartz for the one or two filling coats, 50:50 for an intermediate coat, 60:40 for the two or three final coats. Fine sand in the last layer gives a smoother, faster surface and coarse sand a slower one, so pace of play is settled at the mixing bucket. Allow 0.9 to 1.2 kg/m² of concentrated product and 12 to 24 hours between coats. Prime concrete with Mapecoat I 600 W diluted 1:1, and never apply above +35°C.',
    meta_description:
      'Mapecoat TNS Binder: acrylic binder in water dispersion mixed on site with quartz sand to build tennis and multi sport courts. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Indoor and outdoor tennis courts',
      'Multi purpose playing fields',
      'Basketball, volleyball and handball courts',
      'Five a side football pitches',
      'Cycle tracks and footpaths',
      'Resurfacing courts that are already painted',
    ],
  },
  'mapecoat-tns-color': {
    description:
      'Coat count is what separates the two jobs this product does. Mapecoat TNS Color is a fine grained acrylic coloured coating for the multi layer Mapecoat TNS systems, used either as a single filler undercoat closing the pores of Mapecoat TNS RP matting or as the coloured layer itself in two coats, three where a vivid shade will not cover. A 20 kg bucket is let down with one to two litres of water and laid with a rubber squeegee, a mohair roller or an HVLP spray gun. On porous substrates the first coat takes 0.8 to 1 kg/m², on non porous ones 0.2 to 0.4 kg/m² followed by 0.2 to 0.3 kg/m². Drying runs 12 to 24 hours. Cementitious substrates must be primed, and the substrate itself has to sit between +10°C and +50°C.',
    meta_description:
      'Mapecoat TNS Color: fine grained acrylic coloured coating for Mapecoat TNS multi layer sports surfacing systems. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Filler undercoat for Mapecoat TNS RP matting',
      'Basketball and volleyball court coatings',
      'Skating areas and velodromes',
      'Multi purpose sports surfaces indoors and out',
      'Restoring surfaces already coated with synthetic resins',
    ],
  },
  'mapecoat-tns-line': {
    description:
      'Marking out is the last operation on a court and the one everybody looks at. Mapecoat TNS Line is an acrylic paint in water dispersion with selected fillers, brushed, rolled or sprayed over fully dry Mapecoat TNS finishes in one or two coats at 0.2 to 0.4 kg/m² for the pair, with 12 to 24 hours between them. Brushing gives the cleanest edge and the most even film. It also marks uncoated paving: straight onto new bituminous conglomerate with no primer, or onto concrete after Mapecoat TNS Primer EPW diluted 1:0.5. Mapecoat TNS Line Seal underneath improves how well the line seals. Damp abrasion resistance is quoted above 10,000 cycles, yet Mapei rules the paint out on surfaces taking heavy traffic. Keep the substrate under +50°C, which on an exposed UAE court means a morning start.',
    meta_description:
      'Mapecoat TNS Line: acrylic water dispersion paint for marking playing lines on sports courts, paving and asphalt. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Playing lines on Mapecoat TNS surfaces',
      'Marking playing areas on uncoated paving',
      'Line marking directly on bituminous conglomerate',
      'Line marking on concrete after priming',
      'Painting small pedestrian areas',
    ],
  },
  'mapecoat-tns-paint': {
    description:
      'Above Mapecoat TNS Color sits the coat that carries both the colour and the wear. Mapecoat TNS Paint is a coloured waterborne acrylic coating with selected fillers for the multi layer Mapecoat TNS range, laid by rubber trowel, mohair roller or airless spray from 20 kg tubs let down with one to two litres of water per coat. Over Mapecoat TNS Color the first coat runs 0.20 to 0.25 kg/m², on a non porous substrate both coats run 0.20 to 0.25 kg/m², and on pervious concrete both rise to 0.3 to 0.4 kg/m². Elongation at break is 340 per cent and damp abrasion resistance better than 15,000 cycles. Drying takes 12 to 24 hours. Concrete must be primed, cured 28 days and under 3 per cent moisture, with the substrate between +10°C and +50°C.',
    meta_description:
      'Mapecoat TNS Paint: coloured waterborne acrylic coating for Mapecoat TNS sports surfaces, pedestrian areas and cycle lanes. Sheet from Lapiz Blue UAE.',
    applications: [
      'Basketball, volleyball and futsal court coatings',
      'Skating areas and velodromes',
      'Restoring sports surfaces coated with synthetic resins',
      'Colouring porous cementitious tennis courts',
      'Pedestrian areas and cycle lanes',
    ],
  },
  'mapefloor-cleaner-ed': {
    description:
      'This one is not a layer of the floor at all, it is how the floor is kept. Mapefloor Cleaner ED is a concentrated water soluble degreasing detergent built on low foaming surfactants, with terpinolene adding a solvent and deodorising action, supplied as a green liquid in 10 kg cans. It is diluted at 1 to 3 per cent, meaning 100 to 300 g in ten litres of water, and the concentration goes up on porous or heavily soiled surfaces. Mapei wrote it for resin floors such as the Mapefloor System and for the protective films on Ultratop decorative floors, by hand or by machine, and limits it to surfaces water cannot damage. The concentrate sits at pH 11.3 with 12 per cent active substances. Store between +10°C and +30°C, which in the UAE means a conditioned store rather than a site container.',
    meta_description:
      'Mapefloor Cleaner ED: concentrated degreasing detergent for routine cleaning of resin floors and Ultratop finishes. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Routine degreasing of resin floors',
      'Cleaning floors made with the Mapefloor System',
      'Protective films on Ultratop decorative floors',
      'Showrooms, shops and apartments',
      'Civil, public and industrial interiors',
    ],
  },
  'mapefloor-i-300-sl-me': {
    description:
      'Read this as the body of a floor rather than a coat on one. Mapefloor I 300 SL ME is a three component coloured epoxy of high solids content, poured out and spread with a V notched trowel to form a self levelling layer 2 to 4 mm thick, then back rolled with a spiked roller to drive out entrained air. It always follows Primer SN broadcast with Quartz 0.5 at about 0.3 kg/m², with roughly 3.7 kg/m² of resin for a 2 mm floor and a total never below 2.5 to 3.5 kg/m². The 47 kg kit splits 17, 5 and 25 kg. Compressive strength reaches 50 N/mm². Workability is 35 minutes at +20°C and foot traffic returns at 24 hours. Sunlight fades the colour without harming it, so keep this grade for interiors.',
    meta_description:
      'Mapefloor I 300 SL ME: three component self levelling epoxy floor coating from 2 to 4 mm thick for industrial interiors. Sheet from Lapiz Blue UAE.',
    applications: [
      'Floors in the chemical and pharmaceutical industries',
      'Floors in the foodstuffs industry',
      'Laboratories, sterile rooms and hospitals',
      'Aseptic rooms',
      'Mechanised warehouses',
      'Shopping centre floors',
    ],
  },
  'mapefloor-pu-460': {
    description:
      'Elasticity and quiet are what this resin is bought for. Mapefloor PU 460 is a two component aromatic polyurethane, coloured and self levelling, mixed 75 parts A to 25 parts B and spread by V notched trowel at a minimum of 2 mm, roughly 2.5 kg/m², then back rolled to release trapped air. It is the body layer of two builds: Mapefloor Comfort System AR over Primer SN broadcast with Quartz 0.5, or Comfort System AR/X over the 4 mm Mapecomfort FL rubber mat, which brings 16 dB of impact noise reduction to EN ISO 10140. It is not a finished floor alone, as Mapefloor Finish 59 W goes over it within 48 hours. Workability is 30 minutes and foot traffic 24 hours. Application runs +10°C to +30°C, so UAE work waits until the cooling is running.',
    meta_description:
      'Mapefloor PU 460: two component elastic self levelling polyurethane resin for Mapefloor Comfort System AR and AR/X. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Schools, nurseries and offices',
      'Hospitals and care homes',
      'Libraries, museums and showrooms',
      'Apartments',
      'Shops in general',
    ],
  },
  mapesilent: {
    description:
      'Acoustic failure between apartments is usually structural contact rather than a thin floor. Mapesilent Panel is a dry soundproofing tile one metre square and 13 mm thick, a bitumen and polymer elastoplastomeric membrane sandwiched with polyester fibre, laid fibre side down on the slab and screeded over. It belongs between the structure and the floating screed, never directly under the covering, where Mapesonic CR is the right product instead. Joints are sealed with Mapesilent Tape and the perimeter with Mapesilent Band R so that no acoustic bridge survives. Estimated footstep noise reduction is 31.1 dB, with up to 42.0 dB measured on site, and thermal resistance adds 0.313 m²K/W. A pallet of 75 tiles covers 75 m². Store out of direct sunlight, which on a UAE site rules out the open yard.',
    meta_description:
      'Mapesilent Panel: 13 mm dry soundproofing tile laid under floating screeds to cut footstep noise between homes. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Floating screeds over structural floor slabs',
      'Reducing footstep noise between housing units',
      'Soundproofing all types of floor slabs',
      'Under ceramic tile, stone and wood flooring',
      'Under resilient and textile floor coverings',
    ],
  },
  'ultrabond-turf-tape': {
    description:
      'A turf seam is carried by the strip underneath it, not by the grass. Ultrabond Turf Tape 100 is a spun bonded, coated non woven polyester fabric, white, 0.1 mm thick and supplied in rolls 300 m long by 0.4 m wide, laid beneath the joint between two turf sheets so the adhesive has something strong to bond both cut edges to. The tape carries no adhesive of its own and does nothing alone: it works only paired with a polyurethane adhesive from the Ultrabond Turf range, and that pairing is what meets the FIFA Quality Programme for Football Turf along with the FIGC-LND and World Rugby bonding requirements. Tensile strength is 2,050 kg/cm² lengthwise and 2,250 across, at 150 per cent elongation each way. Mapei rates it for very hot working conditions and storage life is unlimited.',
    meta_description:
      'Ultrabond Turf Tape 100: spun bonded polyester seaming tape for synthetic turf joints bonded with Ultrabond Turf adhesives. From Lapiz Blue UAE.',
    applications: [
      'Interior and exterior synthetic grass installations',
      'Synthetic turf on professional sports surfaces',
      'Seams bonded with Ultrabond Turf polyurethane adhesives',
      'Football turf to FIFA Quality Programme requirements',
      'Pitches to FIGC-LND and World Rugby bonding systems',
    ],
  },
  'ultrabond-turf-tape-pro': {
    description:
      'Pitch backings grew heavier, so the tape under the seam was rebuilt. Ultrabond Turf Tape Pro is a non woven polyester fabric formed by thermal calendering into a particularly tough film, 0.36 mm thick where the standard grade is 0.1 mm, and narrower at 0.3 m, in 300 m rolls at 100 g/m². It is the middle element of a three part bonding system: artificial grass above, tape below, and a polyurethane adhesive from the Ultrabond Turf range between them, which is the combination that satisfies the FIFA Quality Programme along with LND and IRB requirements. Tensile strength is 300 N per 50 mm lengthwise and 250 N across, with elongation at failure of 34 and 45 per cent. Storage time is unlimited, so a roll holds through a UAE summer in a dry store.',
    meta_description:
      'Ultrabond Turf Tape Pro: thermally calendered polyester seaming tape for pro grade artificial grass pitch joints. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Professional and amateur sports surfaces',
      'Installing artificial grass indoors and outdoors',
      'Pro grade artificial grass playing surfaces',
      'Landscaping turf in gardens and residential areas',
      'Artificial grass in shopping centres',
    ],
  },
};

function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);
  let written = 0;
  let skipped = 0;
  const warnings: string[] = [];

  for (const [slug, entry] of Object.entries(content)) {
    const rec = manifest.find((r) => r.brand === 'mapei' && r.slug === slug);
    if (!rec) {
      warnings.push(`no record for ${slug}`);
      continue;
    }
    if (rec.tds.status !== 'verified') {
      console.log(`skipped ${slug}: no data sheet of its own yet`);
      skipped++;
      continue;
    }
    const words = entry.description.trim().split(/\s+/).length;
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words`);
    if (entry.meta_description.length < 140 || entry.meta_description.length > 165)
      warnings.push(`${slug}: meta ${entry.meta_description.length} chars`);
    if (/[–—]/.test(entry.description + entry.meta_description)) warnings.push(`${slug}: em or en dash`);

    rec.description = entry.description;
    rec.meta_description = entry.meta_description;
    if (entry.applications) rec.applications = entry.applications;
    if (entry.category) rec.category = entry.category;
    rec.page_status = 'generated';
    rec.updated_at = now;
    written++;
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`${written} records updated, ${skipped} skipped.`);
  if (warnings.length) {
    console.log(`\n${warnings.length} warnings:`);
    for (const w of warnings) console.log(`  ${w}`);
  }
}

main();

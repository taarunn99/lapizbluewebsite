/*
  Editorial content for the Pidilite Puma tile adhesives and grouts line.

  Original copy, 100 to 150 words per product, written from the record specs,
  the hosted Grupo Puma data sheets in public/tds/pidilite-puma and the
  harvested catalogue in data/discovery/pidilite-puma-catalogue.json. Not
  manufacturer marketing, and nothing stated that is not supported by those
  three sources.

  The Pegoland range is a ladder of EN 12004 classes, so each description
  argues the choice against the grade either side of it: C1 for Classic and
  Uno, C1 TE for Uno Plus, C2 T for Dos, C2 TE for Dos Plus, C2 TE S1 for
  Flex, C2 TE S2 for Superflex, C2FTE S1 for Fast Flex and R2 T for Elastic.
  The three Morcemcolor records split the joint question between a CG2 A W
  cement grout, its water repellent flexible grade and an epoxy.

  Where a record note flags a disagreement between the stock list and the
  Grupo Puma sheet, the sheet wins, since the sheet is the document the page
  hosts.

  Usage: npx tsx scripts/apply-content-puma-tiling.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

interface Entry {
  description: string;
  meta_description: string;
  category?: TdsCategory;
  applications?: string[];
}

const content: Record<string, Entry> = {
  'pegoland-classic': {
    description:
      'C1 is the entry class in EN 12004, and Pegoland Classic sits there deliberately. Its sheet confines it to interior walls and floors plus exterior floors, laying ceramic tiles of medium to high absorption over conventional cement based substrates, and that boundary is the useful part: this is not the bag for porcelain, stone or a facade. Measured tensile adhesion runs from 1 to 1.44 N/mm2 against a C1 requirement of 0.5, so inside its remit it has margin. Vertical work is capped at 30 kg per square metre. Adjustment time is about 20 minutes and pot life about two hours, both shortening in heat, which is why the sheet asks for an absorbent or sun warmed UAE substrate to be damped and the water film allowed to vanish before combing out. Grey and white, 20 kg bags, 4 kg per square metre single bonded.',
    meta_description:
      'Pegoland Classic TDS: C1 cement based tile adhesive for absorbent ceramic on interior walls and floors and exterior floors. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Interior wall and floor tiling',
      'Exterior floor tiling',
      'Ceramic tiles of medium to high absorption',
      'Conventional cement based substrates',
      'Levelling up to 5 mm with the same product',
    ],
  },
  'pegoland-uno': {
    description:
      'Read next to Pegoland Classic, the Uno sheet describes the same job and the same C1 classification: interior walls and floors, exterior floors, absorbent ceramic over conventional cement based substrates, 30 kg per square metre maximum on a vertical face. Two things separate the pair on paper. Measured tensile adhesion is quoted from 1.1 to 1.79 N/mm2 against the 0.5 requirement, a little above the Classic figures, and the packaging line covers 20 and 25 kg bags rather than 20 alone. Neither moves it up the ladder. There is no T for reduced slip and no E for extended open time, so adjustment stays near 20 minutes and tiles must follow the trowel quickly, faster still in hot or windy UAE conditions where the sheet also wants the substrate damped first. Grey or white, 4 kg per square metre single bonded, one year shelf life.',
    meta_description:
      'Pegoland Uno TDS: C1 cement based tile adhesive for absorbent ceramic on interior walls and floors and exterior floors. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Interior wall and floor tiling',
      'Exterior floor tiling',
      'Ceramic tiles with medium to high absorption',
      'Conventional cement based screeds',
      'Tile formats up to 450 cm2 single bonded',
    ],
  },
  'pegoland-uno-plus': {
    description:
      'The two letters added to Pegoland Uno Plus are what the extra money buys. T is reduced slip, so a wall tile stays where it is placed, and E is extended open time, measured here at 30 minutes with tensile adhesion still recorded at 0.9 to 1.2 N/mm2 at that point. With them the scope widens from absorbent ceramic to all types of ceramic, porcelain, granite, marble and natural stone, adds plasterboard and gypsum board substrates, interior tile over tile and swimming pools, and lifts the vertical limit to 40 kg per square metre. Water retention is high enough that neither tile nor substrate needs wetting first, which removes a step easy to get wrong on a summer UAE site. Strength is still C1 though, and for slate the sheet sends you to Superflex. Grey and white, 25 kg bags, adjustable for roughly 30 minutes.',
    meta_description:
      'Pegoland Uno Plus TDS: C1 TE cement based adhesive with reduced slip and 30 minute open time for ceramic, porcelain and stone. Request it from Lapiz Blue UAE.',
    applications: [
      'All types of ceramic, porcelain and natural stone',
      'Interior wall and exterior floor coverings',
      'Plasterboard and gypsum board substrates',
      'Interior tile over tile installations',
      'Swimming pool tiling',
      'Granite and marble pieces',
    ],
  },
  'pegoland-dos': {
    description:
      'Moving from C1 to C2 doubles the adhesion requirement from 0.5 to 1 N/mm2, and Pegoland Dos is the first rung of this range to meet it, recording 1.5 to 2.1 N/mm2 at 28 days. That buys porcelain, natural stone, granite and marble on interior and exterior pavements, interior claddings and baseboards, swimming pools, pavements under heavy traffic and tile over tile on internal floors. What it does not buy is extended open time. Classified C2 T, its open time adhesion is quoted at 20 minutes, so in UAE heat the mortar should be spread two square metres at a time and tiled into at once; where the programme cannot work that way, Dos Plus is the honest answer. Service temperature spans -30 to 90 degrees. Grey and white, 25 kg bags, 40 kg per square metre on vertical surfaces.',
    meta_description:
      'Pegoland Dos TDS: C2 T cement based tile adhesive for porcelain, stone and marble on interior and exterior pavements. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Porcelain, natural stone, granite and marble',
      'Interior and exterior pavements',
      'Interior claddings and baseboards',
      'Swimming pool tiling',
      'Pavements with heavy traffic',
      'Tile over tile on internal floors',
    ],
  },
  'pegoland-dos-plus': {
    description:
      'Anyone weighing Pegoland Dos Plus against Pegoland Flex is really asking whether deformability is needed, because C2 strength and extended open time are common to both. Dos Plus is C2 TE and nothing more: polymer fortified, reduced slip, open time adhesion of 1.2 to 1.5 N/mm2 measured at 30 minutes, cleared for interior and exterior floors, interior walls, exterior baseboards, underfloor heating, pools and wet areas, heavy traffic pavements and internal tile over tile. Its sheet stops short of facades, slate and thin porcelain slabs, which is where the S classes begin. For porcelain and stone on sound screeds in a villa or a mall, the S1 grade adds cost without adding capability. The figures to plan a UAE programme around are that 30 minute window and the 40 kg per square metre wall limit. Grey, white and extrawhite, 25 kg bags.',
    meta_description:
      'Pegoland Dos Plus TDS: C2 TE cement based adhesive with reduced slip and 30 minute open time for porcelain, stone and tile over tile. From Lapiz Blue UAE.',
    applications: [
      'Interior and exterior floor coverings',
      'Interior wall coverings and exterior baseboards',
      'Glass mosaic, marble and granite',
      'Floors with underfloor heating',
      'Swimming pools and other wet areas',
      'Tile over tile on internal floors',
    ],
  },
  'pegoland-flex': {
    description:
      'Deformability gets specified out of habit far more often than it is needed, and the S1 rating on Pegoland Flex answers a specific list. The sheet recommends it for exterior facade work, large area flooring and underfloor heating, and widens the tile schedule to slate, glass mosaic and large format pieces, with trowel guidance running to slabs of 360 cm. It is also the first grade here cleared for tiling over cementitious waterproofing, which settles most UAE wet room and podium details. Classified C2 TE with S1 deformability to EN 12002, it records 1.6 to 2.61 N/mm2 at 28 days and holds 1.4 to 2.3 N/mm2 after a 30 minute open time. Mixing water is 23 to 25 per cent. Where none of those conditions apply, Dos Plus does the same work for less. Extrawhite, white and grey, 25 kg bags.',
    meta_description:
      'Pegoland Flex TDS: C2 TE S1 deformable adhesive for facades, large format tiles, slate and cementitious waterproofing. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Exterior facade installations',
      'Large area flooring with heavy traffic',
      'Large format tiles and slate',
      'Floors with underfloor heating',
      'Tiling over cementitious waterproofing',
      'Swimming pools and other wet areas',
    ],
  },
  'pegoland-superflex': {
    description:
      'The number that sets Pegoland Superflex apart is on the wall: 60 kg per square metre of tile or stone, against 40 for the grades below it. S2 deformability to EN 12002 is what allows that, and the sheet pairs it with facades, large format thin porcelain slabs, slate, pools and wet areas, heavy traffic floors and tiling over cementitious waterproofing. On strength it reads as a C2 TE adhesive, holding at least 1 N/mm2 initially and after water immersion, heat ageing and freeze thaw alike, with mixing water down at 17 to 21 per cent. Price it only after reading the facade clause: formats above 2400 cm2, a side over 60 cm, more than 40 kg per square metre or work above three metres all call for mechanical fixing alongside the adhesive, which covers most Dubai tower cladding. 25 kg bags, floors grouted after 48 hours.',
    meta_description:
      'Pegoland Superflex TDS: C2 TE S2 super deformable adhesive for facades, thin porcelain slabs and slate at 60 kg per square metre. From Lapiz Blue UAE.',
    applications: [
      'Facade tiling with mechanical fixing',
      'Large format thin porcelain slabs',
      'Slate and other natural stone',
      'Swimming pool and wet area tiling',
      'Tiling over cementitious waterproofing',
      'Heavy traffic floors over large areas',
    ],
  },
  'pegoland-fastflex': {
    description:
      'Pegoland Fast Flex is bought for the calendar rather than the tile. Pedestrian traffic is allowed at 6 hours, industrial use at 24 and tanks and pools at 3 days, which is why the sheet names shopping centres, airports and hospitals as its natural refurbishment work. Classified C2FTE with S1 deformability, the fast set costs nothing in class, and once hard it carries no soluble salts to stain stone or bloom as efflorescence on an exterior face, so it is the grade for marble and granite outdoors and the one other Pegoland sheets name for water sensitive tiles that might mark. Two UAE cautions sit in the text: pot life is only about 45 minutes, and application is capped at 30 degrees rather than the 40 allowed elsewhere in the range, so plan it for the early shift. Grey, 25 kg bags.',
    meta_description:
      'Pegoland Fast Flex TDS: C2FTE S1 fast setting deformable adhesive with 6 hour foot traffic for stone and refurbishment work. From Lapiz Blue UAE.',
    applications: [
      'Fast turnaround refurbishment work',
      'Exterior marble, granite and natural stone',
      'Floors with underfloor heating systems',
      'Swimming pool coverings and immersion',
      'Cooling chambers and overlays',
      'Insulating boards and aerated concrete blocks',
    ],
  },
  'pegoland-elastic': {
    description:
      'Metal, plywood, PVC, rubber and glass defeat a cementitious adhesive outright, and that gap is what Pegoland Elastic fills. A two component polyurethane epoxy hybrid classified R2 T, it is a reaction resin rather than a mortar, bonding tiles, stone, composites, engineered stone, metal and glass pieces to cement screeds, steel, aluminium, drywall, plywood, MDF, epoxy coatings and existing tiles, on interior and exterior floors and walls. Shear adhesion is recorded at 5 N/mm2 or more against a 2 N/mm2 requirement, it tolerates -40 to 100 degrees and takes heavy vibration, solvents, alkalis and oils. Open time, pot life and adjustability are each a minimum of 60 minutes, the practical argument for it on a large format external job in UAE heat. Mixed 100 to 10 by weight from an 8 kg pail, grouted at 24 hours, applied from 10 to 40 degrees.',
    meta_description:
      'Pegoland Elastic TDS: R2 T two component polyurethane epoxy adhesive for tiles on metal, plywood, drywall and glass. Request it from Lapiz Blue UAE.',
    applications: [
      'Metal, plywood and drywall substrates',
      'Glass and metal tiles',
      'Composite and engineered stone',
      'Interior and exterior floors and walls',
      'Surfaces subject to heavy vibration',
      'Areas exposed to solvents, alkalis and oils',
    ],
  },
  'morcemcolor-universal-grout': {
    description:
      'Joint widths of 2 to 15 mm are the working range of Morcemcolor Universal Grout, and inside that it is the default cement joint for ceramic and porcelain, interior or exterior, radiant heated floors included. Classified CG2 A W to EN 13888, it records compressive strength above 15 N/mm2, flexural above 2.5, abrasion under 1000 mm3 and water absorption under 2 g at 30 minutes and under 5 g at four hours. Absorption is the figure that decides most jobs, because a joint this tight does not need an epoxy to survive a bathroom or a mall concourse. It is not for expansion joints or anything carrying structural movement. In UAE heat the sheet asks for absorbent tiles and joints to be damped with clean water before filling, then cleaned off after 20 to 30 minutes. 5 kg bags, two year shelf life.',
    meta_description:
      'Morcemcolor Universal Grout TDS: CG2 A W cement grout for 2 to 15 mm joints in ceramic and low porosity porcelain tiling. From Lapiz Blue UAE.',
    applications: [
      'Joints from 2 to 15 mm',
      'Low porosity porcelain tiling',
      'Interior and exterior cladding',
      'Floors with radiant heating',
      'Ceramic wall and floor joints',
    ],
  },
  'morcemcolor-plus-flexible': {
    description:
      'Two grouts in this range share the CG2 A W classification, so the case for Morcemcolor Plus Flexible rests entirely on what has been added to it. Water repellency gives the joint a pearl effect against standing water, a bioactive package resists fungus and algae, and the mortar is flexible and tested after freeze thaw cycling with shrinkage held under 3 mm per metre. That points it at swimming pools, showers, kitchens and anywhere microorganisms take hold in a humid coastal UAE building, over underfloor heating as well. Strength matches the universal grade above 15 N/mm2 in compression and above 2.5 in flexure, in the same 2 to 15 mm joints. The limits are stated plainly: not for permanent immersion in sea water, thermal water or saline treated pools, where the sheet sends you to the epoxy, and never cleaned with acid. 5 kg bags.',
    meta_description:
      'Morcemcolor Plus Flexible TDS: CG2 A W water repellent antifungal cement grout for pools, wet areas and 2 to 15 mm joints. From Lapiz Blue UAE.',
    applications: [
      'Swimming pool joints',
      'Wet areas prone to microorganisms',
      'Low porosity porcelain joints',
      'Joints from 2 to 15 mm',
      'Floors with underfloor heating',
      'Interior and exterior tiling',
    ],
  },
  'morcemcolor-epoxi': {
    description:
      'An epoxy joint earns its price in four places, and the Morcemcolor Epoxi sheet names them: water submerged areas, surfaces holding aggressive chemicals, food, pharmaceutical and hygiene rooms, and floors under heavy traffic. Everywhere else a CG2 cement joint is the sensible purchase. The numbers behind the premium are compressive strength of at least 45 N/mm2, flexural of at least 30, abrasion under 250 mm3 and water absorption of 0.1 g or less at four hours, far tighter than the cementitious grades. It is two component, mixed 100 to 6.7, filling joints of 1 to 15 mm on ceramic, porcelain, vitrified tile, stone, glass mosaic and engineered stone. Two cautions matter in the UAE: pot life is 60 minutes at 25 degrees and shortens as temperature climbs, and an external substrate must be below 40 degrees before grouting starts. 5 kg packs.',
    meta_description:
      'Morcemcolor Epoxi TDS: two component epoxy tile grout for submerged, chemical, hygiene and heavy traffic joints of 1 to 15 mm. From Lapiz Blue UAE.',
    applications: [
      'Water submerged areas',
      'Food, pharmaceutical and hygiene areas',
      'Areas containing aggressive chemicals',
      'Heavy traffic and movement areas',
      'Glass mosaic and large format tiles',
      'Joints from 1 to 15 mm',
    ],
  },
};

function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);
  let written = 0;
  const warnings: string[] = [];

  for (const [slug, entry] of Object.entries(content)) {
    const rec = manifest.find((r) => r.brand === 'pidilite-puma' && r.slug === slug);
    if (!rec) {
      warnings.push(`no record for ${slug}`);
      continue;
    }
    const words = entry.description.trim().split(/\s+/).length;
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words, needs 100 to 150`);
    if (entry.meta_description.length > 165) warnings.push(`${slug}: meta is ${entry.meta_description.length} chars`);
    if (/[\u2013\u2014]/.test(entry.description + entry.meta_description)) warnings.push(`${slug}: contains an em or en dash`);

    rec.description = entry.description;
    rec.meta_description = entry.meta_description;
    if (entry.category) rec.category = entry.category;
    if (entry.applications) rec.applications = entry.applications;
    // The page ships once it has copy. The document state is separate: a
    // record with a hosted sheet offers a download, one without offers a
    // request, and both are shippable.
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

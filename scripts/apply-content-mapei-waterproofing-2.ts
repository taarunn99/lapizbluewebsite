/*
  Editorial content for the second pass over the Mapei waterproofing line: the
  system components rather than the membranes themselves. Tapes, gaskets,
  meshes, reinforcing fabrics, sheet membranes, a backer board, an uncoupling
  membrane and a bentonite sealing paste.

  Original copy, 100 to 150 words per product, written from each record's own
  specs, from the data sheet held at public/tds/mapei/<slug>.pdf read with
  pdftotext -layout, and from the classification in the Mapei catalogue. No
  figure appears here that is not in one of those three.

  An accessory is bought to solve a detail, so the copy is written around the
  detail: what the component is laid into, what it overlaps by, what it is
  used alongside, and what the detail does without it. Dimensions carry the
  weight here rather than chemistry, so roll widths, lengths, thicknesses,
  fabric weights, tensile strengths and elongations are quoted where the sheet
  gives them.

  Usage: npx tsx scripts/apply-content-mapei-waterproofing-2.ts
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
  /* Detailing tapes and gaskets for cementitious and liquid membranes */
  mapeband: {
    description:
      'A cementitious membrane cannot turn an internal corner on its own, and Mapeband is the tape that lets it. An alkali resistant rubber tape with felt edging, 0.58 mm thick and 120 mm wide, it is bedded fabric side down into a layer of Mapelastic, Mapelastic Smart, Mapelastic Turbo or Mapelastic AquaDefense at least 1 mm thick, with the membrane wetting both flanks. Ultimate elongation of at least 300 per cent and tear resistance of 100 N let a wall to floor junction move rather than split along the line, which is what an untaped junction eventually does. Over a movement joint the tape is set in an omega loop so it can be put in tension. Rolls run 50 m or 10 m, and joints between strips are sealed with Adesilex LP, not with the membrane. Service temperature reaches +60°C, enough for an exposed Dubai terrace.',
    meta_description:
      'Mapeband TDS: alkali resistant rubber tape with felt for waterproofing corners and expansion joints under Mapelastic. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing corners between adjacent walls',
      'Corners between walls and floors',
      'Flexible waterproofing of expansion joints on terraces and balconies',
      'Sealing pipes and drains in bathrooms, showers and kitchens',
      'Sealing expansion joints in precast panels',
    ],
  },
  'mapeband-gasket': {
    description:
      'The drain outlet is the commonest point of failure in a wet room, because the membrane has to stop dead at a hole and still be watertight. Mapeband Gasket is the preformed answer: a square of the same alkali resistant rubber used for Mapeband tape, supplied at 120 by 120 mm for pipes and 400 by 400 mm for drain outlets, pressed into fresh Mapelastic, Mapelastic Smart, Mapelastic Turbo or Mapelastic AquaDefense so the coating wets it on both faces. At 0.58 mm thick, with tensile strength above 2 N/mm² and tear resistance of 100 N, it holds the collar around a waste while the floor around it moves. Service temperature runs from -20°C to +60°C. On a UAE hotel bathroom refit, gasket every waste before the screed is tiled: nothing at that detail is reachable afterwards.',
    meta_description:
      'Mapeband Gasket TDS: preformed rubber gaskets at 120 and 400 mm for sealing pipes and drain outlets in wet rooms. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Sealing pipes in bathrooms, showers and kitchens',
      'Sealing drain outlets in wet rooms',
      'Mapelastic and Mapelastic Smart waterproofing systems',
      'Mapelastic Turbo and Mapelastic AquaDefense systems',
      'Waterproofing corners between walls and floors',
    ],
  },
  'mapeband-tpe': {
    description:
      'Two widths, two movement ratings, and choosing between them is most of the specification. Mapeband TPE is a thermoplastic polyolefin tape 1.2 mm thick with non woven polyester edging, supplied in 30 m rolls as either Mapeband TPE 170 at 17 cm wide, whose 50 mm expansion zone takes 5 mm of movement, or Mapeband TPE 325 at 32.5 cm wide, whose 165 mm zone takes 10 mm. It is bonded with Adesilex PG4 epoxy, 1 to 2 mm laid first, the tape pressed in, then a second layer over the fabric and a scatter of 0.5 Quartz. Elongation at break above 500 per cent and watertightness to 6 bar are what let it cross a joint that keeps working. Measure a UAE podium deck joint through a summer afternoon before deciding which grade is wide enough.',
    meta_description:
      'Mapeband TPE TDS: 1.2 mm TPE tape in 17 and 32.5 cm widths for sealing expansion joints up to 10 mm movement. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Flexible waterproofing seals of expansion joints subject to large movement',
      'Flexible waterproofing seals in tunnels and road works',
      'Sealing expansion joints in prefabricated panels',
      'Sealing structural joints in facades',
      'Sealing joints in hydraulic works, channels, basins and drains',
      'Waterproofing expansion joints in flat covering layers',
    ],
  },

  /* Boards, membranes and uncoupling layers */
  'mapeguard-board': {
    description:
      'Mapeguard Board replaces a rendered wall rather than coating one. It is a high density extruded polystyrene core faced both sides with a waterproof multi layer membrane, cut with a knife and bonded with a C2 cementitious adhesive, so a plumb, tileable and already waterproof surface is built in one operation. Panels come 60 by 130 cm in 7 and 10 mm and 60 by 260 cm in 10, 20, 30 and 48 mm, at a density of 33 kg/m³, with compressive strength of 300 kPa at 10 per cent deformation and bond strength of 0.3 N/mm² to EN 1348. The board is waterproof but the assembly is not until the joints are taped with Mapeguard ST and the corners, edges and pipes closed with Mapeguard IC, EC, PC and DH-U. Store it flat indoors on a UAE site: more than 30 days of direct sun is too much.',
    meta_description:
      'Mapeguard Board TDS: lightweight waterproof XPS backer panel for shower walls, partitions and tiled wet rooms. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Levelling out of plumb and unrendered walls',
      'Levelling deteriorated render or old tiling',
      'Room partitions and shower cabin walls',
      'Bathtub surrounds and sanitary ware supports',
      'Benches and seats in bathrooms and wellness centres',
      'Waterproofing surfaces before installing tiling',
    ],
  },
  'mapeguard-um-35': {
    description:
      'Tiles crack because the slab beneath them cracked first. Mapeguard UM 35 breaks that path: a blue honeycomb HDPE membrane with a polypropylene fabric backing, supplied in 30 m by 1 m rolls, bedded in a C2 adhesive so the covering above is mechanically keyed to it and uncoupled from the substrate below. Air channels on the underside let a damp or young screed carry on drying, which is why it is accepted on substrates not yet fully cured. Pull out strength with a C2 adhesive is 0.6 N/mm², and the Robinson wheel test to ASTM C 627 returns an extra heavy commercial rating. It will not bridge cracks wider than 3 mm or structural joints. Joints between sheets and the perimeter are sealed with Mapeband Easy and Mapeguard WP Adhesive. Useful where a UAE fit out programme tiles a screed earlier than it should.',
    meta_description:
      'Mapeguard UM 35 TDS: waterproofing, uncoupling and anti fracture membrane for cracked or damp screeds before tiling. Request it from Lapiz Blue UAE.',
    applications: [
      'Laying ceramic and stone on cracked substrates',
      'Substrates that are not fully cured',
      'Balconies and terraces',
      'Bathrooms and wet rooms',
      'Overlaying old ceramic, resin and wood flooring',
      'Heated cementitious and anhydrite screeds',
    ],
  },
  'mapeguard-wp-200': {
    description:
      'Thinness is the point of this one. Mapeguard WP 200 is a polyethylene foil 0.2 mm thick, faced both sides with non woven polypropylene for a total of roughly 0.44 to 0.48 mm and 251 to 266 g/m², so a bathroom gains a waterproof and anti fracture layer without gaining a build up. It goes into a C2 adhesive and takes ceramic, natural stone or LVT directly on top, with no smoothing layer over it. Sheets come 1 m wide in 30 m and 5 m rolls, overlapped by at least 5 cm and sealed with Mapeguard WP Adhesive, and in swimming pools the laps are taped with 24 cm Mapeguard ST Flex. Cracks wider than 0.2 mm are repaired with Eporip first. It is not permanently UV stable, so on a UAE site do not leave a sheeted area open to the sun between trades.',
    meta_description:
      'Mapeguard WP 200 TDS: thin alkali resistant waterproofing and anti fracture membrane under ceramic, stone and LVT. Request it from Lapiz Blue UAE.',
    applications: [
      'Domestic and hotel bathrooms',
      'Private and commercial showers',
      'Swimming pools',
      'Moisture sensitive gypsum plasters and calcium sulphate screeds',
      'Mineral surfaces such as concrete and cement screed',
      'Direct application under ceramic, stone and LVT',
    ],
  },

  /* Reinforcing meshes and fabrics */
  'mapenet-150': {
    description:
      'Reinforcement is what keeps a coating whole over a substrate that moves, and Mapenet 150 is the mesh that provides it. Alkali resistant glass fibre to the ETAG 004 guide, blue, 150 g/m² with a 4 by 4.5 mm aperture, it is laid into the fresh first layer of Mapelastic, Mapelastic Smart, Mapelastic Turbo or Monolastic and pressed in with a trowel until fully embedded, with each piece overlapped by at least 5 cm. Breaking strength is above 32 N/mm in warp and weft, and still at least 20 N/mm after ageing in alkaline solution, which matters because it spends its life inside cement. Besides holding cracks closed it helps the applicator keep the layer even. Rolls are 50 m by 1 m. On an exposed UAE terrace it also improves the system against the daily temperature swing and abrasion.',
    meta_description:
      'Mapenet 150 TDS: alkali resistant glass fibre mesh to ETAG 004 for reinforcing Mapelastic waterproofing layers. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Reinforcing Mapelastic and Mapelastic Smart waterproofing',
      'Terraces, balconies and swimming pools',
      'Baths and shower cubicles with ceramic or stone finishes',
      'Flexible smoothing layers on micro cracked cementitious substrates',
      'Products from the Plastimul range on micro cracked substrates',
      'Cementitious skim coats',
    ],
  },
  'mapetex-50': {
    description:
      'At 50 g/m² and 0.3 mm thick, Mapetex 50 is the lightest reinforcement on this line, and that is deliberate: a liquid membrane has to wet it through and close over it in two coats. Made from heat welded polypropylene threads, it is laid straight into the fresh first coat of Mapelastic AquaDefense, Mapegum WPS or an Aquaflex Roof product and pressed down with a flat trowel or spiked roller, then buried under a second even coat once the first is dry. Tensile strength is 1.4 kN/m lengthways and 1.2 kN/m across, with elongation at failure above 95 per cent in both directions. Sheets overlap by at least 5 cm. Rolls come 25 m long in 100 cm and 20 cm widths, and the narrow roll is the one to order for upstands around UAE roof plant plinths.',
    meta_description:
      'Mapetex 50 TDS: 50 g non woven polypropylene fabric for reinforcing Mapelastic AquaDefense and Mapegum WPS. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Reinforcing Mapelastic AquaDefense membranes',
      'Reinforcing Mapegum WPS on internal surfaces',
      'Aquaflex Roof liquid membrane systems',
      'Overlaps and forming around construction features',
      'External liquid applied waterproofing',
    ],
  },
  'mapetex-sel': {
    description:
      'Holes are the feature here, not a defect. Mapetex Sel is a needle punched polypropylene fabric perforated with 0.2 mm macro holes so the second coat of membrane can grip the first through the reinforcement instead of sitting on it. At 80 g/m² and 0.6 mm thick it is the heavier of the two Mapetex fabrics, with tensile strength of 3.9 kN/m lengthways and 4.1 kN/m across to EN ISO 10319, and it is embedded between two layers of Mapelastic Turbo or Mapelastic Smart each 1 to 2 mm thick, sheets overlapping by at least 5 cm. Toughness, puncture resistance, ultimate elongation and crack bridging all improve as a result. Rolls are 25 m by 1 m. Reach for it on UAE structures that deform most, a large containment basin or an exposed flat roof, rather than a small bathroom.',
    meta_description:
      'Mapetex Sel TDS: macro holed 80 g polypropylene fabric reinforcing Mapelastic Turbo and Smart on basins and roofs. Request it from Lapiz Blue UAE.',
    applications: [
      'Large scale containment basins',
      'Retaining walls and foundations',
      'Hanging gardens and flat roofs',
      'Swimming pools',
      'Bathrooms and shower cubicles',
      'Terraces',
    ],
  },

  /* Sheet membranes */
  'mapeplan-t-af': {
    description:
      'Reflectance is the first thing to read on this data sheet. Mapeplan T Af is a flexible polyolefin FPO/TPO roofing membrane, glass mat reinforced and fleece backed with 200 g/m² woven non woven polyester, and its Smart White top layer returns a solar reflectance index of 102 to ASTM E1980, which is the number that decides how hot a Dubai roof deck gets. Grades 15, 18 and 20 give effective thicknesses of 1.5, 1.8 and 2.0 mm at 1.6, 2.0 and 2.2 kg/m², in 2.10 m wide rolls of 20 m or 15 m. It is CE marked to EN 13956, bonded with Mapeplan ADS 100 onto plywood, concrete or insulation, and hot air welded at the laps, which hold at least 300 N per 50 mm in peel and 500 N in shear. UV exposure to EN 1297 passes 5000 hours at grade 0.',
    meta_description:
      'Mapeplan T Af TDS: FPO/TPO fleece backed roofing membrane to EN 13956 with high solar reflectance. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Adhered exposed roof systems',
      'Plywood roof substrates',
      'Concrete roof decks',
      'Bonding onto suitable thermal insulation panels',
      'Roofs permanently exposed to UV and weathering',
      'Overlaying aged bitumen surfaces',
    ],
  },
  'mapeplan-tu-s': {
    description:
      'Orange over black is a quality control device, not a colour choice. Mapeplan TU S is a PVC-P tunnel waterproofing membrane with a two colour signal layer, so a hole or a tear made while the sheet is being hung against the rock shows instantly as black through orange and gets welded before the lining is cast. Grades run from TU S 15 at 1.5 mm to TU S 31 above 3.0 mm, rolls 2.00 or 2.10 m wide in 20 m or 15 m lengths, at 2055 to 4247 g/m². Tensile strength at break is 17 N/mm² in both directions with elongation of at least 300 per cent, tearing resistance at least 45 kN/m, CBR puncture 2.0 to 3.4 kN and water permeability below 10 to the minus 6 m³/m² per day. It also resists root action and stray currents.',
    meta_description:
      'Mapeplan TU S TDS: PVC-P tunnel waterproofing membrane with orange and black signal layer for underground works. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Drill and blast tunnel waterproofing',
      'Open cut tunnel waterproofing',
      'Waterproofing underground structures',
      'Fluid barrier in tunnel waterproofing works',
      'Structures under permanent water pressure',
      'Linings exposed to stray currents',
    ],
  },

  /* Below grade jointing tapes and sealing paste */
  'mapeproof-al-tape-d10': {
    description:
      'Pre applied waterproofing is laid before the concrete, which means every lap in it has to survive the rebar fixers, then disappear under the pour. Mapeproof AL Tape D10 is the double sided tape that closes those laps: a polyethylene cored tape roughly 0.9 mm thick and at least 0.9 kg/m², supplied in 0.1 m by 20 m rolls, four to a box, pressed down with a roller and bonding both to Mapeproof AL AP membrane and to Mapeproof Liquid Membrane. It is cold applied, so no torch and no flame on a membrane. It cannot go down on standing water or ice, and the window to cover it is 50 days, cut to 40 in hot weather, which is the figure that governs a UAE basement programme. Stored sealed at +10°C to +30°C it stays stable for 15 months.',
    meta_description:
      'Mapeproof AL Tape D10 TDS: double sided tape jointing and sealing the Mapeproof AL AP pre applied system. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Jointing Mapeproof AL AP membrane sheets',
      'Sealing laps in pre applied below grade systems',
      'Repairing the Mapeproof AL AP membrane',
      'Strengthening membrane joints before concrete is poured',
      'Waterproofing underground structures',
    ],
  },
  'mapeproof-fbt-tape-600': {
    description:
      'Where two fully bonded membranes meet, the joint is the only part of the system a person made, and Mapeproof FBT Tape 600 is what makes it. The tape is 1.1 mm thick and at least 0.9 kg/m², dressed on its upper face with white non woven fabric so the concrete keys to it exactly as it keys to the membrane either side, and it comes in 0.15 m by 20 m rolls. It is bonded cold over the upward facing side of Mapeproof FBT or Mapeproof FBH sheets and worked down with a firm rubber roller, with every joint checked again before the reinforcement goes in. Concrete must follow within five weeks. Application runs from 0°C to +40°C and storage holds for 24 months at +10°C to +35°C, so keep UAE site stock off the open slab.',
    meta_description:
      'Mapeproof FBT Tape 600 TDS: fabric faced adhesive tape jointing Mapeproof FBT and FBH fully bonded membranes. Request it from Lapiz Blue UAE.',
    applications: [
      'Jointing adjacent Mapeproof FBT membranes',
      'Jointing Mapeproof FBH membranes',
      'Sealing the upper facing sides of fully bonded membranes',
      'Waterproofing joints in structures below ground level',
      'Pre applied below grade waterproofing',
    ],
  },
  'mapeproof-mastic': {
    description:
      'Bentonite seals by swelling, and Mapeproof Mastic is that behaviour in a form you can trowel into a gap. Half natural sodium bentonite and half non toxic plasticising agents, at a density of 1.5 kg/dm³, it is worked dry onto horizontal and vertical faces around everything the Mapeproof bentonite sheet cannot be cut neatly around: reinforcement rods in pile heads, piping, drainage wells and connector rods, which are grouted through the holes made for them. It also repairs damaged sheet locally and grouts the 10 cm overlap where a Mapeproof sheet under the raft meets Mapelastic Foundation or a Plastimul product on the wall above. Allow 1.5 kg/m² per millimetre of thickness from the 15 kg bucket. Mapei rules out application below +5°C or in wet weather, and the paste skins if left open, so close UAE pile head details in one visit.',
    meta_description:
      'Mapeproof Mastic TDS: sodium bentonite paste sealing pile head rods, pipes and laps in Mapeproof sheet systems. Request it from Lapiz Blue UAE.',
    applications: [
      'Sealing elements passing through Mapeproof bentonite sheets',
      'Reinforcement rods in pile heads',
      'Piping and drainage wells',
      'Grouting connector and reinforcement rods',
      'Localised repairs to damaged Mapeproof sheets',
      'Continuity between Mapeproof sheets and Mapelastic Foundation',
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
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words, needs 100 to 150`);
    if (entry.meta_description.length < 140 || entry.meta_description.length > 165)
      warnings.push(`${slug}: meta is ${entry.meta_description.length} chars, needs 140 to 165`);
    if (/[–—]/.test(entry.description + entry.meta_description))
      warnings.push(`${slug}: contains an em or en dash`);
    if (entry.applications && (entry.applications.length < 5 || entry.applications.length > 6))
      warnings.push(`${slug}: ${entry.applications.length} applications, needs 5 or 6`);

    rec.description = entry.description;
    rec.meta_description = entry.meta_description;
    if (entry.applications) rec.applications = entry.applications;
    if (entry.category) rec.category = entry.category;
    // The page ships once it has copy. The document state is separate: a
    // record with a hosted sheet offers a download, one without offers a
    // request, and both are shippable.
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

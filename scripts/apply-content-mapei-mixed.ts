/*
  Editorial content for a mixed slice of the Mapei range: the two outstanding
  tiling records, one rebar primer from the concrete line, two sealants, two
  Mapelastic membranes and the two Elastocolor Paint grades.

  Original copy, 100 to 150 words per product, written from each record's own
  specs, from the data sheet held at public/tds/mapei/<slug>.pdf read with
  pdftotext, and from the classification carried in the Mapei catalogue. No
  figure appears here that is not in one of those three.

  Kerabond T is the reference page for the whole product system, so it argues
  the C1T choice explicitly: where a normal cementitious adhesive is the right
  answer and where the specification needs a C2 such as Keraflex instead.

  The products carrying the Zero suffix are the offset carbon editions of
  products already stocked here. The copy says what the offset covers and what
  it leaves alone, so nobody reads them as a different material.

  Usage: npx tsx scripts/apply-content-mapei-mixed.ts
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
  'kerabond-t': {
    description:
      'Kerabond T is the C1T adhesive in the Mapei cementitious range, a grey or white powder with high grab and no vertical slip, so wall tiles can be set from the top down without spacer pegs. Where it stops is the useful part. Mapei keeps it to absorbent ceramic and mosaic over sound render, well aged concrete or primed gypsum, and rules it out for non-absorbent tiles over non-absorbent substrates, wood and plasterboard, and floors needing quick foot traffic. Porcelain, large formats, tile over tile, heated screeds and external work belong to a C2 such as Keraflex, or to Kerabond T gauged with Isolastic. Consumption follows the trowel: 2 to 3 kg per square metre on a No. 4 or 5, 4 to 5 kg on a No. 5 or 6, over 6 kg for large sizes and exteriors. Tiles adjust for 45 minutes; floors grout at 24 hours.',
    meta_description:
      'Kerabond T TDS: C1T slip resistant cementitious adhesive for absorbent ceramic tiles and mosaics up to 5 mm bed. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Indoor and outdoor ceramic tiles and mosaics',
      'Floors, walls and ceilings',
      'Conventional renders and cement mortar walls',
      'Well aged concrete and reinforced floating slabs',
      'Primed gypsum supports and anhydrite screeds',
      'Spot bonding insulating and sound deadening panels',
    ],
  },
  'eco-prim-grip': {
    description:
      'Rollered or brushed straight from the drum with no dilution, Eco Prim Grip is the bonding promoter that goes under render, smoothing compounds and cementitious adhesives. Its resin in water dispersion carries aggregate, so once dry it leaves a rough keying surface on material that offers none: ceramic, terrazzo and natural stone floors, epoxy or polyurethane resin, concrete, brickwork and vibro-compressed blocks. That is also its limit. On screeds, power trowelled concrete and absorbent surfaces in general Mapei specifies Eco Prim T Plus instead, and neither primer is for rising damp or permanently immersed surfaces. The wait before the next layer is 15 to 60 minutes according to temperature, humidity and absorption, which on a warm Dubai site sits at the short end of that range. Consumption is 0.20 to 0.30 kg per square metre. Apply between 5 and 35 degrees. Solvent free, almost odourless and EC1 Plus rated.',
    meta_description:
      'Eco Prim Grip TDS: ready to use grey bonding promoter primer for tile over tile, render and smoothing compounds. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Laying ceramic and stone over old ceramic floors',
      'Smoothing compounds on terrazzo and stone floors',
      'Under cementitious tile adhesives',
      'Render on concrete and brickwork',
      'Smooth, low absorbency substrates and resin surfaces',
      'Internal and external floors and walls',
    ],
    category: 'primer',
  },
  'ultracare-grout-protector-spray': {
    description:
      'Grout lines stain long before the tile does, and Ultracare Grout Protector Spray is the water dispersion aimed at exactly those: cementitious joints of CG class to EN 13888, and polished porcelain. The whole treatment is one product, sprayed from the 750 ml bottle and spread with a fleece applicator or microfibre cloth, leaving no film and no change to colour, gloss, breathability or slip resistance. Timing is the condition of use. Joints must be fully cured and already acid cleaned, and application is ruled out on surfaces hotter than 35 degrees, which through a UAE summer makes an unshaded terrace a morning job. Light foot traffic returns after two hours and damp rooms are ready in 12. One bottle covers up to 30 square metres of porcelain, or 800 linear metres treating joints alone. Treated surfaces are suitable for food contact and the product holds up under UV.',
    meta_description:
      'Ultracare Grout Protector Spray TDS: stain resistant protector for cementitious grout joints and polished porcelain tiles. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Joints sealed with cementitious grouts',
      'Polished porcelain tile floors and walls',
      'Renewable stain protection on grouted surfaces',
      'Surfaces in contact with foodstuffs',
      'Exterior areas needing UV stability',
    ],
    category: 'surface_treatment',
  },
  'mapefer-1k-zero': {
    description:
      'Exposed reinforcement is what brings a concrete repair back a second time, and Mapefer 1K Zero is the brush applied anti-corrosion layer that goes on before any Mapegrout mortar. Zero marks the offset carbon edition; the mortar is unchanged, so the certified figures still govern. Protection comes from three things: corrosion inhibitors, a mix alkalinity above pH 12.5 that restores passivity around the bar, and adhesion good enough that the coating doubles as a bonding promoter for the mortar over it. The sheet on file is the pre-dosed grade: three parts powder to one part liquid, no added water. Two brushed coats to 2 mm total, the second two hours after the first, then Mapegrout after about six hours. Allow 120 g per metre on 8 mm bar, 240 g on 16 mm. In UAE heat keep mixed product out of the sun, as the hour of pot life shortens.',
    meta_description:
      'Mapefer 1K Zero TDS: anti-corrosion cementitious coating to EN 1504-7 for steel reinforcement rods in concrete repair. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Anti-rust protection of concrete reinforcement rods',
      'Bonding promoter for concrete repair mortars',
      'Rebar exposed during concrete repair',
      'Use ahead of Mapegrout shrinkage compensated mortars',
      'Repairs below and above grade',
    ],
  },
  'mapesil-ac-zero': {
    description:
      'Matched to the Mapei coloured grout range so a silicone joint reads as part of the tiling rather than a repair, Mapesil AC Zero is the acetic cure sealant for joints moving up to 25 per cent of their width. Zero is the carbon accounting, not the chemistry: the same mould resistant BioBlock silicone, made without fossil resources, packed in a recycled 310 ml cartridge, with residual lifecycle emissions offset for 2026. It bonds unprimed to glass, ceramic and stainless steel, and takes Mapei Primerseal A or M on concrete, timber, mineral substrates and oxidisable metal. Two exclusions matter on UAE work: acid sensitive stone such as limestone needs a neutral silicone instead, and floor joints under heavy traffic need a polyurethane. Service temperature runs from -40 to +180 degrees, hardness is Shore 20, and one cartridge yields about a metre on a 25 mm joint.',
    meta_description:
      'Mapesil AC Zero TDS: acetic silicone sealant with BioBlock for joints moving up to 25 per cent, in 48 grout matched colours. Request it from Lapiz Blue UAE.',
    applications: [
      'Expansion, contraction and fillet joints to EN 15651',
      'Glass, ceramic and stainless steel surfaces',
      'Flexible waterproof seals between building elements',
      'Concrete, timber and mineral substrates with Primerseal',
      'Interior, exterior, wet and underwater environments',
    ],
  },
  'mapeflex-express-80-400': {
    description:
      'The name is the specification: Shore A 80 hardness with 400 per cent elongation. Mapeflex Express 80/400 is a two-component polyurea poured into horizontal joints and cracks that carry wheels, mixed one to one by volume through the static mixer on a 600 ml cartridge, so nothing is batched by hand. Speed is the reason it is bought. Hardening begins in 90 seconds, excess is sliced flat from 20 minutes, and the joint is open to traffic after 45, which lets a warehouse or car park repair finish inside one night shift. Keep it to its job: joints at least 6 mm wide, movement no more than 5 per cent of the width, falls under 4 per cent, and never in green concrete still shrinking. Application runs from 0 to 40 degrees, the full UAE working range, with tensile strength of 10 MPa and adhesion to concrete above 1 MPa.',
    meta_description:
      'Mapeflex Express 80/400 TDS: two-component polyurea joint sealant, self levelling, open to traffic in 45 minutes. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Horizontal joints and cracks with limited movement',
      'Floors taking heavy vehicle loads',
      'Resealing existing joints and sudden cracks',
      'Industrial maintenance inside a short shutdown',
      'Concrete and asphalt prepared for Mapecoat TNS flooring',
    ],
  },
  'mapelastic-aquadefense-zero': {
    description:
      'Nothing to mix: Mapelastic Aquadefense Zero is a ready to use membrane rolled, brushed or trowelled straight from the bucket in two thin coats of roughly 0.4 mm, at 1 kg per square metre for the pair. Zero refers to the offset carbon footprint, not to a different paste. Against two-component Mapelastic the trade is speed for substrate tolerance: the second coat follows the first in about an hour, tiles go down three to four hours later, and a wet room can be handed on within the day. What it will not accept is moisture from below, so screeds above 3 per cent residual humidity or subject to rising damp are out of scope, and the membrane must always finish under ceramic, stone or mosaic. On an exposed Dubai terrace Mapei calls for a C2S1 adhesive over it. Certified to EN 14891, with initial adhesion of 1.7 N/mm2.',
    meta_description:
      'Mapelastic Aquadefense Zero TDS: ready to use quick drying liquid membrane to EN 14891 for wet rooms, balconies and terraces. Request it from Lapiz Blue UAE.',
    applications: [
      'Bathrooms and shower cubicles',
      'Laundry rooms and saunas',
      'Balconies and terraces before tiling',
      'Concrete, screeds and cementitious render',
      'Old ceramic tiles, terrazzo and stone',
      'Plasterboard in interiors only',
    ],
  },
  'mapelastic-zero': {
    description:
      'Where the membrane also has to protect the concrete beneath it, Mapelastic Zero does more than keep water out. Gauged three parts powder to one part liquid and built to at least 2 mm final thickness, no more than 2 mm per coat, it is certified under EN 14891 for waterproofing beneath tiles and under EN 1504-2 as a surface protection system, blocking carbon dioxide, chlorides, sulfates and de-icing salts. Zero covers the offset carbon footprint; the mortar is the familiar one, flexible down to -20 degrees with 30 per cent elongation and resistance to UV. That combination suits coastal UAE structures in a salt laden atmosphere, and in dry, warm or windy weather Mapei asks for sheeting over fresh work to slow evaporation. Allow about 1.7 kg per square metre per millimetre by hand, and embed Mapenet 150 in the first coat on micro-cracked or stressed areas.',
    meta_description:
      'Mapelastic Zero TDS: two-component flexible cementitious waterproofing to EN 14891 and EN 1504-2 for pools, terraces and tanks. Request it from Lapiz Blue UAE.',
    applications: [
      'Waterproofing balconies, terraces and bathrooms',
      'Swimming pools and water containing basins',
      'Concrete structures, renders and cementitious screeds',
      'Flexible skimming on thin concrete sections',
      'Carbon dioxide protection for decks and pillars',
      'Concrete exposed to seawater and sulfate salts',
    ],
  },
  'elastocolor-paint': {
    description:
      'A render carrying hairline cracks will telegraph them through an ordinary masonry paint within a season. Elastocolor Paint is the elastomeric answer: a one-component acrylic in water dispersion that bridges micro-cracks, stays permeable to vapour while stopping liquid water, and blocks the carbon dioxide that carbonates concrete and corrodes the steel inside it. Testing to EN 15457 and EN 15458 records no growth of mould, fungi or algae, which is the reason it gets specified on shaded and humid elevations. Dilute 10 to 15 per cent with water and lay two coats over the correct primer, 12 to 24 hours apart, at 0.2 to 0.4 kg per square metre per coat. Mapei excludes it from horizontal waterproofing, immersed surfaces and anything walked on. Supplied in 20 kg drums in RAL shades, holding colour change under 2.5 delta E after 1,000 hours of accelerated weathering, which counts on a Gulf facade.',
    meta_description:
      'Elastocolor Paint TDS: crack bridging anti-carbonation elastomeric facade paint to EN 1504-2, mould and algae resistant. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Facades with cracks and micro-cracks',
      'Concrete structures subject to small deformation',
      'Anti-carbonation protection of concrete',
      'Render already painted and micro-cracked',
      'Elevations attacked by moulds and algae',
      'Indoor and outdoor wall surfaces',
    ],
    category: 'surface_treatment',
  },
  'elastocolor-paint-zero': {
    description:
      'Specifiers working to an embodied carbon figure on a facade can take Elastocolor Paint Zero, the same elastomeric acrylic coating with its residual greenhouse gas emissions offset for 2026 through forestry protection credits, supplied in recycled plastic drums. Nothing about the coating itself moves: permanent elasticity over micro-cracked render, anti-carbonation cover certified to EN 1504-2 under the PI, MC and IR principles, vapour permeability in Class I, and no mould, fungal or algal growth in EN 15457 and EN 15458 testing. It is stocked in white, the base for ColorMap tinting, and white carries the lowest VOC content in the range at 15 g per litre or less. Two coats at 0.2 to 0.4 kg per square metre, 12 to 24 hours apart, over the primer the substrate needs. Never apply above 35 degrees or in direct sun, which on a UAE elevation means following the shade around the building.',
    meta_description:
      'Elastocolor Paint Zero TDS: carbon offset edition of the crack bridging anti-carbonation elastomeric facade paint. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Painting cracked facades and render',
      'Concrete deforming under load',
      'Protection of concrete against carbonation',
      'North facing and humid elevations',
      'Surfaces already deteriorated by algae and mould',
    ],
    category: 'surface_treatment',
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

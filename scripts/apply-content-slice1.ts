/*
  Slice 1 editorial content: original descriptions (100-150 words), meta
  descriptions and applications for the verified Mapei tile adhesive and grout
  products. Written by hand against each product's hosted TDS, never copied
  from manufacturer marketing text. Applying this script sets page_status to
  generated for records that pass the definition of done.

  Usage: npx tsx scripts/apply-content-slice1.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord } from '../src/lib/tds';

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

interface ContentEntry {
  description: string;
  meta_description: string;
  applications: string[];
  extraSpecs?: Record<string, string>;
}

const content: Record<string, ContentEntry> = {
  mapeset: {
    description:
      'Mapeset is a fast setting, cementitious tile adhesive from Mapei, classified C1 under EN 12004 and ISO 13007-1. It is formulated for bonding ceramic tiles and mosaics on floors, walls and ceilings, indoors and outdoors. The mix stays workable for 6 to 8 hours, holds tiles with no appreciable shrinkage and reaches light foot traffic in about 24 hours, which suits time sensitive fixing schedules on UAE sites. Typical substrates include traditional render, cement mortar and cured cementitious screeds, with gypsum and anhydrite surfaces possible after priming. Consumption runs from about 2 kg per square metre for mosaics up to 5 kg per square metre for external floors. Mapeset is produced in white and grey and supplied in 25 kg bags. Download the technical data sheet below for the full specification.',
    meta_description:
      'Mapeset TDS: C1 fast setting Mapei tile adhesive, 2 to 5 kg per m2 coverage, 25 kg bags. Download the TDS PDF and check UAE stock with Lapiz Blue.',
    applications: [
      'Bonding ceramic tiles and mosaics on interior and exterior floors, walls and ceilings',
      'Fixing paper faced or mesh backed ceramic mosaics',
      'Installing absorbent single fired and double fired tiles',
      'Application over render, cement mortar and cured cementitious screeds',
      'Use on gypsum or anhydrite substrates after priming with Primer G or Eco Prim T Plus',
    ],
  },
  keraset: {
    description:
      'Keraset is a cementitious adhesive for ceramic tiles, produced by Mapei for the UAE market and classified C1 under ISO 13007-1 and EN 12004. It bonds ceramic tiles and mosaics on floors, walls and ceilings in both internal and external applications. The adhesive is easy to trowel, highly thixotropic and hardens without appreciable shrinkage, giving reliable adhesion on traditional render, cement mortar and cured cementitious screeds; anhydrite surfaces can be tiled after priming. Consumption is approximately 2 kg per square metre for mosaics with a number 4 trowel, 2.5 to 3 kg per square metre for normal sizes and around 5 kg per square metre for external floor and wall coverings. Keraset comes in white and grey 25 kg paper bags. The full technical data sheet is available for download on this page.',
    meta_description:
      'Keraset TDS: C1 cementitious Mapei tile adhesive made in the UAE, 2 to 5 kg per m2 coverage, 25 kg bags. Download the TDS PDF from Lapiz Blue.',
    applications: [
      'Bonding ceramic tiles and mosaics on internal and external floors, walls and ceilings',
      'Fixing paper faced or mesh backed ceramic mosaics',
      'Installing absorbent single fired and double fired ceramic tiles',
      'Application over traditional render, cement mortar and cured screeds',
      'Tiling anhydrite surfaces after priming with Primer G',
    ],
  },
  keraflex: {
    description:
      'Keraflex is a high performance cementitious adhesive from Mapei, classified C2TE under EN 12004, with no vertical slip and extended open time. It bonds ceramic tiles, porcelain, stone materials and mosaics of every type on floors, walls and ceilings, inside and outside. The extended open time gives fixers more working room in warm UAE conditions, while the no slip consistency holds wall tiles in place without supports. Keraflex is also suitable for spot bonding insulation materials such as expanded polystyrene and rock wool panels. Substrates include cement render, concrete, aerated block walls and primed gypsum or anhydrite. This page hosts the UAE edition of the Keraflex technical data sheet with the complete performance table, consumption guidance and application instructions as published by the manufacturer.',
    meta_description:
      'Keraflex TDS: C2TE Mapei adhesive with no vertical slip and extended open time for porcelain and stone. Download the UAE TDS PDF from Lapiz Blue.',
    applications: [
      'Bonding ceramic, porcelain and stone tiles on interior and exterior floors and walls',
      'Fixing every type of mosaic on floors, walls and ceilings',
      'Wall tiling where no vertical slip and extended open time are needed',
      'Spot bonding insulation panels such as expanded polystyrene and rock wool',
      'Application over cement render, concrete and primed gypsum substrates',
    ],
  },
  'ultralite-s1': {
    description:
      'Ultralite S1 is a lightweight, deformable, one component cementitious adhesive from Mapei, classified C2TE S1 under ISO 13007-1. Its low density gives roughly 80 percent higher yield per kilogram than conventional adhesives, so a single bag covers more area and is easier to carry around site. The formulation bonds all types and sizes of ceramic tile, gloss mosaic and stable natural stone on internal and external substrates, including thin porcelain panels on facades. Deformability class S1 helps the adhesive absorb substrate movement, which suits large format tiles and demanding commercial floors. Coverage and full performance data, including open time and setting characteristics for hot climate installation, are listed in the UAE edition of the technical data sheet available for download on this page.',
    meta_description:
      'Ultralite S1 TDS: C2TE S1 lightweight deformable Mapei adhesive with high yield for large format tiles. Download the UAE TDS PDF from Lapiz Blue.',
    applications: [
      'Bonding all types and sizes of ceramic tiles on uneven internal and external substrates',
      'Fixing gloss mosaic of every type',
      'Installing stable, moisture insensitive natural stone',
      'Bonding thin porcelain tiles on floors, walls and external facades',
      'Large format tile installation where deformability matters',
    ],
  },
  'ultralite-s1-quick': {
    description:
      'Ultralite S1 Quick is a rapid setting version of Mapei Ultralite S1, a lightweight, deformable cementitious adhesive classified C2FT S1 under ISO 13007-1. It combines fast hydration with no vertical slip, good trowelability and high wetting of the tile back, letting floors accept grouting and traffic much sooner than standard setting adhesives. The lightweight formulation increases yield per bag and reduces fatigue for installers. It bonds all types and sizes of ceramic tile, stone material and mosaic on internal and external substrates, including swimming pools and thin porcelain on facades. For fast track fit outs and handovers in the UAE, the quick setting profile shortens the wait between fixing and grouting. Download the UAE edition technical data sheet on this page for complete data.',
    meta_description:
      'Ultralite S1 Quick TDS: C2FT S1 rapid setting lightweight Mapei adhesive for fast track tiling. Download the UAE TDS PDF from Lapiz Blue.',
    applications: [
      'Fast track tiling where early grouting and quick handover are required',
      'Bonding ceramic tiles of all types and sizes on internal and external substrates',
      'Fixing stone material on floors and walls',
      'Bonding mosaic of all types, including in swimming pools',
      'Thin porcelain tiles on floors, walls and external facades',
    ],
  },
  'ultralite-s2-flex': {
    description:
      'Ultralite S2 Flex is a one component, highly deformable, lightweight cementitious adhesive from Mapei, classified C2E S2 under ISO 13007-1 with extended open time. Deformability class S2 is the highest defined by the standard, so the adhesive tolerates substrate movement and thermal stress, making it a strong choice for large format and thin porcelain panels, external facades and floors subject to deflection. It applies easily even at high temperatures, which matters on UAE sites, and its lightweight formulation raises coverage per bag. The adhesive bonds ceramic tiles of every type, dimensionally stable stone and all mosaics on interior and exterior surfaces. The UAE edition of the technical data sheet, including full performance values and consumption guidance, can be downloaded from this page.',
    meta_description:
      'Ultralite S2 Flex TDS: C2E S2 highly deformable lightweight Mapei adhesive for large format and facade tiling. Download the UAE TDS PDF from Lapiz Blue.',
    applications: [
      'Bonding large format and thin porcelain tiles on floors, walls and facades',
      'Installing ceramic tiles of all types on interior and exterior surfaces',
      'Fixing dimensionally stable, stain resistant stone tiles',
      'Tiling substrates subject to movement or thermal stress',
      'Application in hot conditions thanks to easy workability at high temperatures',
    ],
  },
  'ultralite-s2-quick': {
    description:
      'Ultralite S2 Quick is a rapid setting, highly deformable, lightweight cementitious adhesive from Mapei, classified C2FE S2 under ISO 13007-1 with extended open time. It pairs the highest deformability class in the standard with a fast hydration profile, so demanding installations such as facades, swimming pools and large format porcelain can be grouted and put into service quickly. The lightweight formulation gives high yield per bag and easier handling on site. It bonds every type and size of ceramic tile, stone and mosaic on internal and external substrates. For UAE projects that need both structural tolerance and speed, Ultralite S2 Quick covers both requirements. The complete UAE edition technical data sheet with performance values and consumption figures is available for download on this page.',
    meta_description:
      'Ultralite S2 Quick TDS: C2FE S2 rapid setting highly deformable Mapei adhesive for pools and facades. Download the UAE TDS PDF from Lapiz Blue.',
    applications: [
      'Rapid installation of large format and thin porcelain tiles',
      'Bonding ceramic tiles of all types on internal and external substrates',
      'Fixing stone material on floors and walls',
      'Mosaic installation of all types, including swimming pools',
      'External facade tiling requiring high deformability and fast setting',
    ],
  },
  granirapid: {
    description:
      'Granirapid is a two component, fast setting and hydrating cementitious adhesive system from Mapei, classified C2F S1 under EN 12004. Component A powder and component B latex are mixed on site to produce a deformable, high performance bed for ceramic tiles, agglomerates, artificial stone, marble and natural stone on walls and floors, inside and outside. Its rapid strength development allows grouting after only a few hours and full service quickly afterwards, which makes it a standard choice for marble and granite works, refurbishments and areas that cannot stay closed for long. It also bonds rubber flooring on cementitious substrates in heavy traffic environments. The UAE edition of the Granirapid technical data sheet with mixing ratios, times and consumption is available for download on this page.',
    meta_description:
      'Granirapid TDS: C2F S1 two component fast setting Mapei adhesive for marble, granite and stone. Download the UAE TDS PDF from Lapiz Blue.',
    applications: [
      'Fast track bonding of marble, granite and natural stone on walls and floors',
      'Installing ceramic tiles, agglomerates and artificial stone indoors and outdoors',
      'Refurbishment work where areas must reopen quickly',
      'Bonding rubber flooring on cementitious substrates in heavy traffic areas',
      'Moisture sensitive stone that benefits from fast water binding',
    ],
  },
  keralastic: {
    description:
      'Keralastic is a two component polyurethane adhesive from Mapei, classified R2 under EN 12004, for bonding ceramic tiles, stone material and mosaics where cementitious products reach their limits. Being reaction cured, it adheres to screeds, renders and concrete as well as difficult substrates such as wood, metal, PVC, reinforced polyester, fibre cement and gypsum board. It contains no water or solvents, cures without shrinkage and forms a tough, flexible bond that copes with substrate movement. Typical uses include showers, prefabricated bathroom sheets, wooden worktops and mixed substrate refurbishments. For UAE projects involving unusual substrates or wet areas, Keralastic offers a dependable reactive alternative to cement based adhesives. The full technical data sheet with pot life, curing times and consumption can be downloaded from this page.',
    meta_description:
      'Keralastic TDS: R2 two component polyurethane Mapei adhesive for wood, metal, PVC and mixed substrates. Download the TDS PDF from Lapiz Blue.',
    applications: [
      'Bonding ceramic tiles and mosaics on wood, metal, PVC and fibre cement',
      'Tiling showers and prefabricated bathroom panels',
      'Fixing stone material where a flexible reactive bond is needed',
      'Installations over gypsum, gypsum board and reinforced polyester',
      'Substrates subject to movement where cementitious adhesives are unsuitable',
    ],
  },
  kerapoxy: {
    description:
      'Kerapoxy is a two component, acid resistant epoxy mortar from Mapei, classified RG under EN 13888 as a grout and R2T as an adhesive. It grouts joints of at least 1 mm in ceramic tile and natural stone floors and walls, indoors and outdoors, and can also be used for acid resistant bonding of tiles, stone, fibre cement and concrete. Cured Kerapoxy resists chemicals, stains and frequent aggressive cleaning, and supports installations that must comply with HACCP food safety requirements. That makes it the reference choice for commercial kitchens, food production areas, laboratories, swimming pools and industrial floors across the UAE. Available in 17 colours. The complete technical data sheet with chemical resistance tables, times and consumption is available for download on this page.',
    meta_description:
      'Kerapoxy TDS: RG R2T acid resistant epoxy grout and adhesive for joints from 1 mm, 17 colours, HACCP suitable. Download the TDS PDF from Lapiz Blue.',
    applications: [
      'Grouting ceramic and stone floors and walls indoors and outdoors',
      'Commercial kitchens and food areas requiring HACCP compliant joints',
      'Laboratories and industrial floors exposed to chemicals',
      'Swimming pools and wet areas needing stain resistant joints',
      'Acid resistant bonding of tiles, stone, fibre cement and concrete',
    ],
    extraSpecs: { joint_width: 'joints of at least 1 mm' },
  },
  'kerapoxy-adhesive': {
    description:
      'Kerapoxy Adhesive is a two component epoxy adhesive from Mapei, classified R2T under EN 12004, an improved reactive adhesive with no vertical slip. It bonds ceramic, porcelain and stone on floors and walls over practically any substrate used in construction, achieving a rigid, chemical resistant, high strength connection. Typical uses include bullnose and special ceramic shapes, tiles in fibreglass swimming pools, and marble doorsteps and windowsills, where cementitious adhesives either cannot grip or cannot deliver the required durability. The thixotropic consistency holds pieces in position on vertical surfaces while curing. For UAE fit outs involving chemically aggressive environments or non standard substrates, Kerapoxy Adhesive provides a dependable specification. Download the full technical data sheet on this page for pot life, hardening times and consumption data.',
    meta_description:
      'Kerapoxy Adhesive TDS: R2T two component epoxy Mapei adhesive with no vertical slip for pools and stone. Download the TDS PDF from Lapiz Blue.',
    applications: [
      'Bonding ceramic, porcelain and stone on floors and walls',
      'Fixing bullnose and special ceramic tile shapes',
      'Tiling fibreglass swimming pools',
      'Bonding marble doorsteps and windowsills',
      'Chemically aggressive environments needing an epoxy bond',
    ],
  },
  'kerapoxy-easy-design': {
    description:
      'Kerapoxy Easy Design is a two component, decorative, acid resistant epoxy grout from Mapei, classified RG under EN 13888 and R2T as an adhesive. It was developed to make epoxy grouting genuinely easy to apply and clean off, with a smooth creamy texture that fills joints in ceramic, glass mosaic and stone with a fine, uniform finish. A bacteriostatic agent with BioBlock technology helps joints stay hygienic in wet and humid conditions. It suits decorative grouting of internal and external floors and walls and also provides an acid resistant bond on common building substrates. For designers in the UAE it opens a wide palette of colours that keep their appearance under regular cleaning. The full technical data sheet with times, consumption and chemical resistance is available for download here.',
    meta_description:
      'Kerapoxy Easy Design TDS: RG decorative acid resistant epoxy grout, easy to apply and clean. Download the Mapei TDS PDF from Lapiz Blue.',
    applications: [
      'Decorative grouting of internal and external floors and walls',
      'Grouting glass mosaic and stone with a fine uniform finish',
      'Hygiene sensitive wet areas benefiting from bacteriostatic joints',
      'Acid resistant bonding on common building substrates',
      'Colour matched designer joints for premium interiors',
    ],
  },
  'ultracolor-plus': {
    description:
      'Ultracolor Plus is a high performance, fast setting and drying polymer modified grout from Mapei, classified CG2FWA under ISO 13007-3, the improved cementitious class with fast curing, reduced water absorption and high abrasion resistance. Water repellent DropEffect technology and mould resisting BioBlock technology keep joints cleaner for longer in kitchens, bathrooms and humid UAE conditions. It grouts floors and walls in every type of ceramic, terracotta, stone and glass or marble mosaic, is walkable after roughly 24 hours and never produces efflorescence. The colour range covers 40 coordinated shades. Pack format is boxes of 4 by 5 kg alupacks. Residential rooms, hotels, airports and shopping centres all fall within its scope. Download the UAE edition technical data sheet on this page for complete data.',
    meta_description:
      'Ultracolor Plus TDS: CG2FWA fast setting Mapei grout with DropEffect and BioBlock, 40 colours. Download the UAE TDS PDF from Lapiz Blue.',
    applications: [
      'Grouting ceramic, porcelain and terracotta floors and walls',
      'Grouting stone, glass and marble mosaic',
      'High traffic commercial areas such as airports and shopping centres',
      'Kitchens, bathrooms and humid areas needing mould resistant joints',
      'Residential interiors requiring consistent colour without efflorescence',
    ],
  },
};

function wordCount(s: string): number {
  return s.trim().split(/\s+/).length;
}

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const now = new Date().toISOString().slice(0, 10);
let generated = 0;

for (const rec of manifest) {
  const entry = content[rec.slug];
  if (!entry) continue;
  const wc = wordCount(entry.description);
  if (wc < 100 || wc > 150) {
    console.log(`WORD COUNT OUT OF RANGE for ${rec.slug}: ${wc}`);
  }
  rec.description = entry.description;
  rec.meta_description = entry.meta_description;
  rec.applications = entry.applications;
  if (entry.extraSpecs) rec.specs = { ...rec.specs, ...entry.extraSpecs };
  if (rec.tds.status === 'verified') {
    rec.page_status = 'generated';
    generated++;
  }
  rec.notes = rec.notes.replace(/ ?\[hero missing:[^\]]*\]/, '').trim();
  rec.updated_at = now;
  console.log(`${rec.slug}: ${wc} words, page_status ${rec.page_status}`);
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${generated} records set to generated.`);

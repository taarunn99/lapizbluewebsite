/*
  Editorial content for the second batch of Mapei flooring systems records,
  all of them adhesives: acrylic and synthetic polymer dispersions, a contact
  adhesive, a two component reactive polyurethane, and the one component
  silane grades for LVT and for wood.

  Original copy, 100 to 150 words per product, written from the specs on each
  record and from the product data sheet in public/tds/mapei.

  Usage: npx tsx scripts/apply-content-mapei-flooring-2.ts
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
  'ultrabond-eco-380': {
    description:
      'Two bonding methods come out of one pail here. Ultrabond Eco 380 is a solvent free acrylic adhesive in water dispersion, used as a wet bed adhesive on absorbent screeds and as a transitional pressure sensitive adhesive on impervious, non absorbent substrates, where the film is left to air dry for 30 to 40 minutes until it is touch dry but still tacky. Open time is 60 to 70 minutes, stretching to 120 minutes on a non absorbent substrate, and the strong initial tack and excellent residual tack hold dimensionally stable PVC sheet without creep. Light foot traffic follows after three to five hours, and the floor is rated for chair castors to EN 12529. Walls are covered as well as floors. The application range stops at +25°C, so in the UAE the air conditioning needs to be running before any of it is spread.',
    meta_description:
      'Ultrabond Eco 380: solvent free acrylic dispersion adhesive for PVC floor and wall coverings, wet bed or pressure sensitive bonding. From Lapiz Blue UAE.',
    applications: [
      'PVC floorings in commercial projects',
      'Homogeneous and heterogeneous PVC sheet coverings',
      'CV and multilayer PVC floor coverings',
      'Semi flexible vinyl floor tiles',
      'Textile and flocked textile floor coverings',
      'PVC wall coverings',
    ],
  },
  'ultrabond-eco-520': {
    description:
      'Linoleum behaves nothing like vinyl. A jute backed sheet needs an adhesive that grabs while it is still wet and builds legs quickly, or the roll moves as it is pressed down. Ultrabond Eco 520 is a solvent free single coat adhesive based on synthetic polymers in water dispersion, for linoleum in sheets and panels up to 4 mm thick as well as cork linoleum and corkment underlay. Waiting time is 10 to 20 minutes and open time 20 to 30 minutes, with light foot traffic after three to five hours and full service in 24 to 48 hours. Consumption is 0.30 to 0.45 kg/m² through a TKB B1, B2 or Mapei no. 2 trowel. EC1 Plus covers very low emission, and the floor is rated for castors to EN 12529. It bonds only to dry absorbent substrates, so test a UAE screed for residual damp first.',
    meta_description:
      'Ultrabond Eco 520: solvent free single coat adhesive for linoleum sheets and panels up to 4 mm, cork linoleum and resilient wall coverings. Lapiz Blue UAE.',
    applications: [
      'Linoleum sheets and panels up to 4 mm thick',
      'Cork linoleum and corkment underlay',
      'Resilient wall coverings',
      'Underfloor heating systems',
      'Hospitals, shopping centres and airports',
      'Floors taking chair castors to EN 12529',
    ],
  },
  'ultrabond-eco-571-2k': {
    description:
      'Rubber backings and outdoor exposure both defeat a dispersion adhesive, and this is the grade that answers them. Ultrabond Eco 571 2K is a two component, low viscosity polyurethane adhesive free of solvent and water, mixed 86 parts A to 14 parts B, for bonding rubber tiles and sheeting with any backing, homogeneous and heterogeneous PVC, semi rigid vinyl and FRP wall panels, indoors or out, on absorbent and non absorbent substrates. Pot life is about 30 minutes, open time 40 to 50 minutes, and a covering can still be adjusted at 70 to 90 minutes, with light foot traffic after 12 to 24 hours and full set in roughly three days. Consumption runs 0.35 to 1 kg/m² depending on trowel size. Mapei advises laying during the cooler hours of the day in high temperatures, which on a UAE site means an early start.',
    meta_description:
      'Ultrabond Eco 571 2K: two component solvent and water free polyurethane adhesive for rubber and PVC flooring, indoors and outdoors. From Lapiz Blue UAE.',
    applications: [
      'Rubber tiles and sheeting with any backing',
      'Homogeneous and heterogeneous PVC floor coverings',
      'Semi rigid vinyl floor coverings',
      'FRP panels on walls as finishing elements',
      'Internal and external bonding work',
      'Areas subject to heavy and intense traffic',
    ],
  },
  'ultrabond-eco-contact': {
    description:
      'A stair nosing or a coving cannot be weighted down while an adhesive sets, which is why detail work is bonded by contact. Ultrabond Eco Contact is a solvent free contact adhesive applied by the double buttering method, roughly 150 to 200 g/m² per coat on each surface, using a Mapei no. 1 or TKB A1 to A2 trowel or a long haired or foam roller. Both films are left until they turn transparent and slightly sticky, anywhere from 30 minutes to about two hours, and the covering can go on up to 18 hours later. Once positioned it grips at once and cannot be moved, and the detail is in service immediately. EC1 Plus makes it a real alternative to solvent based polychloroprene adhesives in occupied UAE hospitals, offices and homes, where solvent odour would otherwise close the area down.',
    meta_description:
      'Ultrabond Eco Contact: solvent free contact adhesive for covings, skirtings, fillets, steps and corner pieces in PVC, rubber and cork. Lapiz Blue UAE.',
    applications: [
      'Steps, skirtings, fillets and corner pieces',
      'PVC floor and wall coverings',
      'All types of carpet',
      'Linoleum and cork details',
      'Rubber floor and wall coverings',
      'Closed interiors frequented by people',
    ],
  },
  'ultrabond-eco-fast-track': {
    description:
      'Renovation work is sold on downtime rather than on bond strength. Ultrabond Eco Fast Track is a synthetic resin adhesive in water dispersion with a very fast initial grab, laid at approximately 200 to 400 g/m² through a Mapei 1 or 2 or a TKB A2 to B1 notch. It takes light foot traffic after one hour and lets seams be welded or sealed after about three hours, against the 24 hours a conventional acrylic adhesive needs, and it is ready for full use in 12 hours. Open time is only 15 minutes, so it is spread one bay at a time. Peel strength exceeds 1.5 N/mm on homogeneous PVC and 1.2 N/mm on rubber, and the product is solvent free, APEO free and classified EC1. For a UAE shop or ward that has to reopen the same day, that one hour figure is the whole argument.',
    meta_description:
      'Ultrabond Eco Fast Track: fast set universal adhesive for resilient floor renovation, foot traffic in one hour, seam welding after three. Lapiz Blue UAE.',
    applications: [
      'Fast renovation of resilient floor coverings',
      'PVC, CV and LVT floor coverings',
      'Rubber flooring in sheets and tiles',
      'Skirtings, profiles, coves and steps',
      'Textile, needlepunch and flocked floorings',
      'Linoleum and polyolefin based coverings',
    ],
  },
  'ultrabond-eco-ms-4-lvt-wall-and-floor': {
    description:
      'Silane chemistry is the answer to LVT on a wall. Ultrabond Eco MS 4 LVT Wall and Floor is a one component silylated polymer adhesive that hardens by reacting with the moisture in the air, giving a tough film resistant to moisture, water and heat with nothing to mix and nothing wasted. It holds LVT, SPC and rigid LVT on a vertical surface without leaking or letting the tile slip, and its shear strength suits floors in direct sunlight, under forklift traffic, or constantly wet, such as communal kitchens and showers. Open time is 40 to 50 minutes, light foot traffic comes at five hours and full service at 24. EC1 Plus and Blauer Engel DE-UZ 113 are both carried. Coastal UAE humidity speeds a moisture cured adhesive up, so plan on the shorter end of that open time.',
    meta_description:
      'Ultrabond Eco MS 4 LVT Wall and Floor: one component silane adhesive for LVT, SPC and rigid LVT on walls and floors, wet areas included. Lapiz Blue UAE.',
    applications: [
      'LVT, SPC and rigid LVT in tiles and planks',
      'PVC floor and wall coverings',
      'Textile, needlepunch and flocked flooring',
      'Rubber floor and wall coverings',
      'FRP panels on walls as finishing elements',
      'Constantly wet areas such as kitchens and showers',
    ],
  },
  'ultrabond-eco-s948-1k': {
    description:
      'Board width decides the adhesive on a wood floor. Ultrabond Eco S948 1K is a one component silylated polymer adhesive, free of water, solvents, amines and epoxy resin, for all types of multi layer pre-finished wood flooring and for medium sized solid planks up to 15 cm wide. It bonds to cementitious and anhydrite screeds, to Mapecem and Topcem based screeds, and to old wood, ceramic, marble and terrazzo, heated substrates included. No catalyst and no mixing, and Mapei quotes 20 to 30 percent more yield than a conventional two component adhesive at 800 to 1,200 g/m². A skin forms at 40 minutes, boards can be adjusted for 100 minutes, and the floor is walkable in about 12 hours. Where a UAE screed still holds residual moisture, the sheet sends you to a waterproofing primer before this adhesive.',
    meta_description:
      'Ultrabond Eco S948 1K: one component silane adhesive for multi layer pre-finished wood flooring and solid planks to 15 cm wide. From Lapiz Blue UAE.',
    applications: [
      'Multi layer pre-finished wood flooring',
      'Solid wood planks up to 15 cm wide',
      'Cementitious and anhydrite screeds',
      'Mapecem and Topcem based screeds',
      'Old wood, ceramic, marble and terrazzo floors',
      'Heated substrates',
    ],
  },
  'ultrabond-eco-s955-1k': {
    description:
      'Where the S948 grade stops at medium planks, this one takes every format. Ultrabond Eco S955 1K is a one component silylated polymer adhesive for solid wooden floors and pre-finished multi layer floors of all types and formats, from lamparquet and slats through to floorboards, laid over cementitious or anhydrite screeds, old wood, ceramic, marble and terrazzo, and over heated substrates. It is the softer and more extensible of the two: Shore A hardness 45, elongation at break 120 percent, and a wood to concrete bond above 2 N/mm², which is what absorbs the movement of a wide solid board. Wood is laid within 50 to 60 minutes, adjustment runs to 120 minutes and the floor is walkable in roughly 12 hours. Consumption is 800 to 1,200 g/m². Low odour to ISO 16000-28 suits an occupied UAE villa.',
    meta_description:
      'Ultrabond Eco S955 1K: one component silane adhesive for solid and pre-finished parquet of all types and formats, low odour. Request it from Lapiz Blue UAE.',
    applications: [
      'Solid wooden floors of all types and formats',
      'Pre-finished multi layer wooden floors',
      'Lamparquet, slats and floorboards',
      'Cementitious and anhydrite screeds',
      'Old wood, ceramic, marble and terrazzo floors',
      'Heated substrates',
    ],
  },
};

function main() {
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

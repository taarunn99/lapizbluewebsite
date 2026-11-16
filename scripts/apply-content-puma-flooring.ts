/*
  Editorial content for the Pidilite Puma flooring line, covering the Paviland
  self levelling compounds, the three Paviland primers that go beneath them and
  the Morcem Dry flexible waterproofing coating.

  Original copy, 100 to 150 words per product, written from the specs and uses
  carried on each record and from the sheet each record hosts.

  Usage: npx tsx scripts/apply-content-puma-flooring.ts
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
  'morcem-dry-sf-plus': {
    description:
      'Two components, a 25 kg cementitious powder and a 10 kg latex, mix into a flexible crack bridging coating laid by trowel or roller at a total thickness of 2 to 2.5 mm including the reinforcing mesh. Morcem Dry SF Plus holds 5 bar of positive hydrostatic pressure to DIN 1048 and 3 bar negative, which is what qualifies it for swimming pools, concrete roof slabs, balconies, bathrooms, pile heads and shallow basement retaining walls where water can push from either side. Elongation of 40 per cent to ASTM D412-16 Method A gives it the movement to bridge cracking, tensile strength is above 1 N/mm2, and the cured film is non-toxic so it can line a potable water tank. Apply between 5 and 35 degrees Celsius, never more than 2 mm wet per layer, and pond test after seven days of curing.',
    meta_description:
      'Morcem Dry SF Plus two component flexible cementitious waterproofing coating, 5 bar positive pressure, for pools, roofs and bathrooms. Stocked by Lapiz Blue UAE.',
    applications: [
      'Waterproofing swimming pools',
      'Concrete roof slabs and balcony floor slabs',
      'Bathrooms and internal wet areas',
      'Shallow basement retaining walls',
      'Waterproofing pile heads',
      'Potable water tanks',
    ],
  },
  'paviland-sl-10': {
    description:
      'Classified CT C20 F6 to UNE EN 13813, Paviland SL 10 is the standard grade of the pair: a grey cementitious self levelling compound poured from 2 to 10 mm in a single layer over interior concrete and cementitious floors. A 25 kg bag takes 5.5 to 5.8 litres of water, gives 30 minutes of working time and spreads at 1.5 kg per square metre for every millimetre of thickness. It carries light foot traffic after 8 to 12 hours, and the covering follows later: ceramic or carpet 12 to 24 hours after the pour, parquet or synthetic cladding 24 to 48 hours. Compressive strength passes 5 N/mm2 in a day and 20 N/mm2 at 28 days. It is a levelling layer and never a finished floor, so it must be covered, and it wants Paviland Primer R underneath.',
    meta_description:
      'Paviland SL 10 cementitious self levelling compound for 2 to 10 mm interior floors, CT C20 F6, in 25 kg bags. Data sheet and Dubai stock from Lapiz Blue UAE.',
    applications: [
      'Levelling irregular interior floors',
      'Smoothing residential floors with moderate foot traffic',
      'Levelling concrete and cementitious substrates',
      'Preparation before ceramic tiles',
      'Preparation before parquet flooring',
      'Preparation before PVC and linoleum',
    ],
  },
  'paviland-sl-10r': {
    description:
      'Programme is the reason to choose the R grade. Paviland SL 10R covers the same 2 to 10 mm in one coat as Paviland SL 10 and is classified CT C25 F5, but it sets to light foot traffic in 3 to 4 hours rather than 8 to 12, can be sanded after 4 to 8 hours and takes tiles or fitted carpet from 8 to 12 hours, with subsequent bonding at 12 to 24 hours. Setting starts at 20 to 30 minutes, so the discharge area has to be planned and confined before the first bag is opened. It is pumpable, bonds above 2 N/mm2, passes 30 N/mm2 in compression and is rated for use over radiant heating. Mix 5.40 to 5.64 litres of water per 23 kg bag, interior only, between 5 and 40 degrees Celsius.',
    meta_description:
      'Paviland SL 10R fast drying self levelling compound, 2 to 10 mm, foot traffic in 3 to 4 hours, CT C25 F5. Data sheet and Dubai stock from Lapiz Blue UAE.',
    applications: [
      'Fast track indoor floor levelling',
      'Pumped levelling of larger interior floors',
      'Floors over radiant underfloor heating',
      'Levelling concrete and cementitious floors',
      'Preparation before tiles and fitted carpet',
      'Preparation before parquet and light floorings',
    ],
  },
  'paviland-primer-ceramic': {
    description:
      'A primer is chosen by what lies underneath, not by preference, and Paviland Primer Ceramic is the one for a floor that will not absorb anything: an existing ceramic or stoneware tile floor, stoneware, marble, stone, terrazzo, polished cement or very low porosity concrete. It is ready to use and must not be diluted, because the hard red film it leaves carries fine quartz aggregate that gives a cementitious levelling compound something mechanical to grip. Roll it thin and even with a medium pile roller and leave no puddles. Drying is about 90 minutes on a non-absorbent subfloor and 12 hours on calcium sulphate floors, gypsum fibre boards and sanded mastic asphalt screed. Coverage is 125 g/m2 from a 10 kg jerry can, applied between 15 and 35 degrees Celsius. Lay the levelling compound within 24 hours, while the film is still clean.',
    meta_description:
      'Paviland Primer Ceramic bonding primer for non absorbent tile, stone and terrazzo floors before levelling, 125 g/m2. Data sheet and stock from Lapiz Blue UAE.',
    applications: [
      'Priming existing ceramic and stoneware floors',
      'Priming marble, stone and terrazzo',
      'Priming polished cement and dense concrete',
      'Bonding primer for levelling compounds',
      'Floors with subfloor heating systems',
      'Mastic asphalt screeds and gypsum fibre boards',
    ],
  },
  'paviland-primer-epoxy': {
    description:
      'Reach for a resin primer when there is a reason, and here the reason is moisture. Paviland Primer Epoxy is a solvent free and water free two component epoxy that penetrates deeply, strengthens a weak substrate and reduces the vapour diffusion rate on cement and concrete floors holding residual moisture of up to 5 CM per cent, which a dispersion primer cannot do. Part B is poured into Part A, 2.85 kg into 7.15 kg, and the mix has 45 minutes at 25 degrees Celsius or 30 minutes at 30. The first coat is rolled at 400 g/m2, the second at 250 g/m2 once eight to ten hours have passed, and Paviland aggregate is broadcast into that wet second coat at 2 to 2.5 kg/m2 to key the levelling compound. Apply between 15 and 35 degrees Celsius.',
    meta_description:
      'Paviland Primer Epoxy two component epoxy primer and vapour barrier for cement floors with residual moisture. Data sheet and Dubai stock from Lapiz Blue UAE.',
    applications: [
      'Priming cement floors with residual moisture',
      'Reducing vapour diffusion beneath levelling compounds',
      'Strengthening weak or porous substrates',
      'Priming mastic asphalt and bonded screeds',
      'Priming calcium sulphate and gypsum fibre boards',
      'Sand broadcast key before self levelling compounds',
    ],
  },
  'paviland-primer-r': {
    description:
      'Dilution is how this primer adapts to the floor it is given. Paviland Primer R is a dispersion primer for the absorbent cementitious substrate, which is the ordinary case under a Paviland self levelling compound, and it both seals and binds: it penetrates, hardens a dusty screed and leaves an evenly absorbent surface, so the compound above keeps its own mixing water and does not blow pinholes or bubbles. On a moderately absorbent or non-porous floor, dilute 1:1 with clean water. On a medium to highly porous one, prime twice, 1:3 first and 1:1 second, at roughly 100 and 200 g/m2 in turn, from a 10 kg jerry can. Brush, roller and airless spray all work. It dries in one to two hours on an absorbent substrate, longer on a dense one, and is rated over underfloor heating.',
    meta_description:
      'Paviland Primer R dispersion bonding primer for absorbent cementitious floors before self levelling compounds. Data sheet and Dubai stock from Lapiz Blue UAE.',
    applications: [
      'Priming absorbent cementitious floors',
      'Sealing dusty screeds before levelling work',
      'Preventing pinholes and bubbles in levelling layers',
      'Priming concrete C 25 / 30 and cement based floors',
      'Priming calcium sulphate flow floors',
      'Wood, chipboard and gypsum fibre board subfloors',
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
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words`);
    if (entry.meta_description.length > 165) warnings.push(`${slug}: meta ${entry.meta_description.length} chars`);
    if (entry.meta_description.length < 140) warnings.push(`${slug}: meta ${entry.meta_description.length} chars, under 140`);
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
  console.log(`${written} records updated.`);
  if (warnings.length) {
    console.log(`\n${warnings.length} warnings:`);
    for (const w of warnings) console.log(`  ${w}`);
  }
}

main();

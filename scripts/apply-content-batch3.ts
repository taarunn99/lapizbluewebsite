/*
  Batch 3 editorial content: Ultrabond flooring adhesives under Mapei
  flooring-systems (owner decision 2026-08-29). Same rules as before:
  original 100 to 150 word descriptions written from each hosted TDS.

  Usage: npx tsx scripts/apply-content-batch3.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord } from '../src/lib/tds';

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

interface ContentEntry {
  description: string;
  meta_description: string;
  applications: string[];
}

const content: Record<string, ContentEntry> = {
  'ultrabond-eco-v4-sp': {
    description:
      'Ultrabond Eco V4 SP is a universal adhesive in water dispersion from Mapei, developed for PVC and rubber flooring in commercial projects and usable with all common floor covering types. It is a wet bed adhesive for level, absorbent substrates on interior floors and walls, including areas over underfloor heating, and its very low emission of volatile organic compounds supports healthy indoor air on offices, retail and healthcare fit outs. The adhesive handles static and dynamic loads, including intense foot traffic, which is why it is a standard specification for resilient flooring in UAE commercial interiors. Being solvent free, it is safe to apply in occupied buildings. Coverage per square metre depends on the trowel and covering type, as stated in the technical data sheet available for download on this page.',
    meta_description:
      'Ultrabond Eco V4 SP TDS: universal water dispersion Mapei adhesive for PVC, rubber and resilient floors. Download the TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Bonding PVC and rubber flooring in commercial projects',
      'Universal bonding of common resilient floor coverings',
      'Interior floors and walls on level, absorbent substrates',
      'Installations over underfloor heating systems',
      'Areas with static and dynamic loads including intense foot traffic',
    ],
  },
  'ultrabond-eco-p909-2k': {
    description:
      'Ultrabond Eco P909 2K is a two component epoxy polyurethane adhesive from Mapei for bonding all types and formats of wooden flooring, from mosaic parquet and solid lamparquet to tongue and groove solid elements, pre assembled hardwood boards and multilayer engineered parquet. It also bonds acoustic mats made of rubber or cork. The reactive cure is water free, so it never swells moisture sensitive wood, and the hardened bond stays firm under the daily movement of timber floors. Very low emission of volatile organic compounds keeps it suitable for occupied and certified buildings. For UAE villas, hotels and offices installing engineered or solid wood floors, this is the reference two component wood adhesive in the Mapei range. Download the complete technical data sheet from this page.',
    meta_description:
      'Ultrabond Eco P909 2K TDS: two component epoxy polyurethane Mapei adhesive for all wooden flooring. Download the TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Bonding mosaic parquet, lamparquet and solid parquet elements',
      'Pre assembled hardwood boards and multilayer engineered parquet',
      'Acoustic mats made of rubber or cork',
      'Wood floors over underfloor heating and absorbent substrates',
      'Occupied buildings needing very low emission adhesives',
    ],
  },
  'ultrabond-eco-4-lvt': {
    description:
      'Ultrabond Eco 4 LVT is a dispersion adhesive from Mapei formulated specifically for luxury vinyl tile flooring. It is highly shear resistant, hard setting and tolerant of high temperatures, the failure points that generic adhesives hit when LVT is installed behind glass facades or in warm UAE interiors where planks expand and contract. Reinforcing fibres in the formulation make it suitable for heavy wear in domestic, commercial and industrial locations. It is a wet bed adhesive for interior floors and walls on level, absorbent substrates and works over underfloor heating. Very low emission of volatile organic compounds supports green building certification. If a project involves LVT planks or tiles, this is the dedicated Mapei specification. The full technical data sheet is available for download on this page.',
    meta_description:
      'Ultrabond Eco 4 LVT TDS: shear resistant high temperature Mapei adhesive made for LVT floors. Download the TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Bonding luxury vinyl tiles and planks on interior floors and walls',
      'High temperature areas where LVT movement defeats generic adhesives',
      'Heavy wear domestic, commercial and industrial locations',
      'Level, absorbent substrates and underfloor heating systems',
      'Green building projects needing very low emission adhesives',
    ],
  },
  'ultrabond-p990-1k': {
    description:
      'Ultrabond P990 1K is a one component, ready to use polyurethane adhesive from Mapei for interlocking prefinished parquet with a multilayer support, in any format and wood species. It cures with ambient humidity into a tough, elastic bond that follows the natural movement of wood without transmitting stress to the substrate, and being one component there is no mixing and no waste. It is not intended for varnish backed prefinished solid wood or traditional solid parquet without interlocking, as the technical data sheet states. For UAE projects installing engineered click or tongue and groove prefinished floors, slats or planks, Ultrabond P990 1K keeps installation simple and reliable. Download the complete technical data sheet with consumption, working times and substrate requirements from this page.',
    meta_description:
      'Ultrabond P990 1K TDS: one component polyurethane Mapei adhesive for interlocking prefinished parquet. Download the TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Bonding interlocking prefinished multilayer parquet',
      'Engineered wood slats and planks of any format and species',
      'Projects needing a ready to use one component adhesive',
      'Wood floors where an elastic bond must absorb natural movement',
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
  if (wc < 100 || wc > 150) console.log(`WORD COUNT OUT OF RANGE for ${rec.slug}: ${wc}`);
  rec.description = entry.description;
  rec.meta_description = entry.meta_description;
  rec.applications = entry.applications;
  if (rec.tds.status === 'verified') {
    rec.page_status = 'generated';
    generated++;
  }
  rec.notes = rec.notes.replace(/ ?\[hero missing:[^\]]*\]/, '').trim();
  rec.updated_at = now;
  console.log(`${rec.slug}: ${wc} words, page_status ${rec.page_status}, tds ${rec.tds.status}`);
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${generated} records set to generated.`);

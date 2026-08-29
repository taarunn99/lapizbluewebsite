/*
  Batch 2 editorial content for verified Mapei products (2026-08-29 batch).
  Same rules as slice 1: original 100 to 150 word descriptions written from
  each product's hosted TDS, never manufacturer marketing copy.

  Usage: npx tsx scripts/apply-content-batch2.ts
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
  'keralastic-t': {
    description:
      'Keralastic T is a two component polyurethane adhesive from Mapei, classified R2 under EN 12004, with a thixotropic consistency that holds tiles on vertical surfaces without slip. It bonds ceramic tiles, stone material and mosaics indoors and outdoors on substrates that defeat cementitious adhesives: wood, metal, PVC, asphalt, reinforced polyester, fibre cement, gypsum and gypsum board as well as ordinary screeds, renders and concrete. The cured bond is strong yet flexible, absorbing the movement of mixed or deformable substrates. Typical UAE uses include showers, prefabricated bathroom sheets, worktops and refurbishments where the existing surface cannot be removed. Compared with standard Keralastic, the T version is the one to choose for walls and overhead work. The full technical data sheet is available for download on this page.',
    meta_description:
      'Keralastic T TDS: R2 thixotropic polyurethane Mapei adhesive for walls, wood, metal and PVC. Download the TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Bonding ceramic tiles, stone and mosaics on walls without slip',
      'Tiling over wood, metal, PVC, asphalt and reinforced polyester',
      'Showers and prefabricated bathroom panels',
      'Refurbishments over existing surfaces that cannot be removed',
      'Substrates subject to movement needing a flexible reactive bond',
    ],
  },
  'ultrabond-eco-pu-2k': {
    description:
      'Ultrabond Eco PU 2K is a two component polyurethane adhesive from Mapei, classified R2T under EN 12004, with very low emission of volatile organic compounds and no vertical slip. It bonds ceramic tiles, stone tiles and all types of mosaic on interior and exterior floors and walls, covering both ordinary substrates such as screeds, render, concrete and plasterboard and difficult ones such as metal, PVC and polyester. The reactive cure produces a high strength, deformable bond without water, which protects moisture sensitive stone. Its EMICODE EC1 Plus rating supports green building requirements on UAE projects. Choose it where a cementitious adhesive cannot grip or where indoor air quality certification matters. The complete technical data sheet with pot life, hardening times and consumption is available for download on this page.',
    meta_description:
      'Ultrabond Eco PU 2K TDS: R2T low emission polyurethane Mapei adhesive for difficult substrates. Download the TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Bonding ceramic, stone and mosaic on interior and exterior floors and walls',
      'Tiling metal, PVC, polyester and other difficult substrates',
      'Moisture sensitive stone needing a water free reactive bond',
      'Green building projects requiring EMICODE EC1 Plus products',
      'Vertical surfaces needing a no slip reactive adhesive',
    ],
  },
  'adesilex-p10': {
    description:
      'Adesilex P10 is a white cementitious adhesive from Mapei, classified C2TE under EN 12004, developed for glass, ceramic and marble mosaic. Its bright white colour keeps translucent glass mosaic true to tone, while the no slip, extended open time formulation lets installers work from the top of a wall downwards without tiles moving. It bonds normal and heavy weight mesh backed or paper faced mosaic on interior and exterior floors and walls, including non planar surfaces, and suits swimming pools when mixed with Isolastic latex in place of water. Cementitious renders, screeds and primed gypsum are all suitable substrates. For UAE pool and spa projects, Adesilex P10 is the standard specification for glass mosaic. The full technical data sheet is available for download on this page.',
    meta_description:
      'Adesilex P10 TDS: C2TE white Mapei mosaic adhesive with no vertical slip, pool suitable with Isolastic. Download the TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Bonding glass, ceramic and marble mosaic on floors and walls',
      'Wall installation from the top downwards without slip',
      'Swimming pools when mixed with Isolastic latex',
      'Mosaic on non planar substrates',
      'Interior and exterior mosaic over renders, screeds and primed gypsum',
    ],
  },
  'adesilex-p7': {
    description:
      'Adesilex P7 is a cementitious adhesive from Mapei, classified C2T under EN 12004, an improved class adhesive with no vertical slip. It bonds ceramic and porcelain tiles and mosaics on floors, walls and ceilings, interior and exterior, and is also suitable for wet areas and for spot bonding insulation materials such as expanded polystyrene and rock wool. The improved adhesion of class C2 covers low absorption porcelain that a basic C1 adhesive cannot hold reliably, while the T rating keeps wall tiles in place without supports. Substrates include cement render, mortar beds and cured screeds. For everyday porcelain fixing across UAE residential and commercial sites, Adesilex P7 is the workhorse specification. Download the complete technical data sheet with consumption and setting times on this page.',
    meta_description:
      'Adesilex P7 TDS: C2T improved Mapei adhesive with no vertical slip for porcelain and wet areas. Download the TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Bonding ceramic and porcelain tiles on floors, walls and ceilings',
      'Wet area tiling',
      'Mosaic installation indoors and outdoors',
      'Spot bonding insulation panels such as polystyrene and rock wool',
      'Porcelain fixing where a C1 adhesive is not sufficient',
    ],
  },
  'adesilex-p9': {
    description:
      'Adesilex P9 is a cementitious adhesive from Mapei, classified C2TE under EN 12004, combining improved adhesion, no vertical slip and extended open time. It bonds ceramic and porcelain tiles and mosaics on interior and exterior floors, walls and ceilings, plus moisture stable stone materials and spot bonded insulation panels. The extended open time is a practical advantage in UAE heat, where mortar beds skin quickly, and the no slip consistency holds wall tiles without wedges. Produced in the UAE, it is one of the most widely specified porcelain adhesives in the market for bathrooms, kitchens and general floor and wall tiling. Substrates include render, cement mortar and cured screeds. The UAE edition technical data sheet with full performance values is available for download on this page.',
    meta_description:
      'Adesilex P9 TDS: C2TE Mapei porcelain adhesive with extended open time, UAE production. Download the TDS PDF from Lapiz Blue.',
    applications: [
      'Bonding ceramic and porcelain tiles on floors, walls and ceilings',
      'Interior and exterior tiling over render and cured screeds',
      'Moisture stable stone materials',
      'Spot bonding insulation panels',
      'Hot climate fixing where extended open time matters',
    ],
  },
  'kerabond-plus': {
    description:
      'Kerabond Plus is a cementitious adhesive from Mapei, classified C2E under EN 12004, offering improved adhesion with extended open time. It bonds every common ceramic tile type, from porcelain and single fired tiles to terracotta, klinker and mosaic, on internal and external floors, walls and ceilings, and also spot bonds insulation materials such as foam polystyrene and rock wool. The extended open time keeps the adhesive workable longer after spreading, a real advantage on large floor areas and in warm UAE conditions. Damp stable stone can also be fixed. Substrates include renders, cement mortar beds and cured cementitious screeds. Produced in the UAE and supplied through Lapiz Blue with stock in Dubai, Abu Dhabi and Sharjah. Download the complete technical data sheet from this page.',
    meta_description:
      'Kerabond Plus TDS: C2E improved Mapei adhesive with extended open time, UAE production. Download the TDS PDF from Lapiz Blue.',
    applications: [
      'Bonding porcelain, ceramic, terracotta and klinker tiles',
      'Internal and external floors, walls and ceilings',
      'Large floor areas benefiting from extended open time',
      'Spot bonding insulation materials',
      'Damp stable stone fixing',
    ],
  },
  'kerapoxy-cq': {
    description:
      'Kerapoxy CQ is a two component, acid resistant epoxy grout from Mapei, classified RG under EN 13888, formulated with coloured quartz for easy application and easy cleaning. It grouts ceramic, stone and glass mosaic finishes internally and externally, and is particularly suited to large floor areas where conventional epoxy grouts slow crews down. Cured joints resist acids, stains and aggressive cleaning, and support HACCP compliant installations under EC Regulation 852/2004, which makes Kerapoxy CQ a first choice for commercial kitchens, food factories, breweries and shopping mall concourses across the UAE. The coloured quartz filler gives a full, even joint colour. The complete technical data sheet with chemical resistance data, times and consumption is available for download on this page.',
    meta_description:
      'Kerapoxy CQ TDS: RG acid resistant epoxy grout with coloured quartz, easy clean, HACCP suitable. Download the Mapei TDS PDF from Lapiz Blue UAE.',
    applications: [
      'Grouting ceramic, stone and glass mosaic floors and walls',
      'Large floor areas needing a fast working epoxy grout',
      'Commercial kitchens and food areas under HACCP requirements',
      'Environments exposed to acids and aggressive cleaning',
      'Interior and exterior grouting with full even colour',
    ],
  },
  'keracolor-ff': {
    description:
      'Keracolor FF is a high performance, polymer modified cementitious grout from Mapei, classified CG2WA under EN 13888, for joints up to 6 mm. Water repellent DropEffect technology reduces surface water absorption, helping joints shed dirt and stay cleaner in kitchens, bathrooms and pool surrounds. It grouts interior and exterior floor and wall tiling of every kind, from porcelain and klinker to natural stone, marble, granite and glass mosaic, and produces a smooth, compact fine finish suited to polished surfaces. The W and A ratings mark reduced water absorption and high abrasion resistance, the qualities that keep narrow joints presentable under heavy UAE foot traffic. Produced in the UAE and available in the Mapei coloured grout range. Download the full technical data sheet from this page.',
    meta_description:
      'Keracolor FF TDS: CG2WA fine finish Mapei grout with DropEffect for joints up to 6 mm. Download the UAE TDS PDF from Lapiz Blue.',
    applications: [
      'Grouting joints up to 6 mm in interior and exterior tiling',
      'Porcelain, klinker, stone and glass mosaic finishes',
      'Kitchens, bathrooms and pool surrounds needing water repellent joints',
      'Polished floors needing a smooth fine finish',
      'High traffic areas needing abrasion resistant joints',
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
  console.log(`${rec.slug}: ${wc} words, page_status ${rec.page_status}`);
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${generated} records set to generated.`);

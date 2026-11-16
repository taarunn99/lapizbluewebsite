/*
  Editorial content for the Kerakoll waterproofing line.

  Original copy, 100 to 150 words per product, written from the specs,
  classification sentences and catalogue data carried on each record.

  The line mixes liquid membranes, tapes, formed drains, a mesh, sealants and
  one site tool, so each description says plainly which of those the product is
  and what still has to be ordered alongside it.

  Usage: npx tsx scripts/apply-content-kerakoll-waterproofing.ts
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
  /* Aquaform accessories: profiles, drains and one tool */
  'aquaform-d': {
    description:
      'Aquaform D is a painted aluminium drip edging, which makes it a profile rather than a waterproofing material in its own right. It is fixed at the open edge of an external balcony or terrace and bonded into the Aquastop Nanoflex, Aquastop Flex or Aquastop Green membrane, so the exposed thickness of the substrate is closed and rainwater is thrown clear of the slab instead of running back underneath the tiling. Edges are where most balcony waterproofing fails, and extra coats of liquid membrane out on the flat will not compensate for an untreated one. Aquaform D is the standard section of three, alongside D Plus and D Small, all covered by one data sheet. On a UAE terrace with railings, set the profile out before tiles are ordered, because changing it later means lifting them.',
    meta_description:
      'Aquaform D TDS: painted aluminium drip edging for external surfaces with railings, used with Aquastop membranes. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing the exposed substrate thickness at an open edge',
      'Disposal of rainwater from external surfaces with railings',
      'Edge detailing with Aquastop Nanoflex and Aquastop Flex',
      'Edge detailing with Aquastop Green anti cracking membrane',
      'Balcony and terrace perimeters before tiling',
    ],
  },
  'aquaform-d-plus': {
    description:
      'Specifying the right edge profile is a detail decision, and Aquaform D Plus is one of three sections in the same painted aluminium drip edging family. Like Aquaform D and Aquaform D Small it is bedded into an Aquastop Nanoflex, Aquastop Flex or Aquastop Green membrane at the open edge of an external surface, closing the thickness of the substrate and shedding rainwater away from the slab face. What separates the three is the size of the section, so the build up depth at the edge and the height of the tile finish decide which one is ordered. Confirm the dimensions against the shared data sheet before release, as the three part names are easy to confuse. It is an accessory, not a membrane, so the liquid waterproofing product behind it is still a separate order.',
    meta_description:
      'Aquaform D Plus TDS: painted aluminium drip edging section for external surfaces with railings, used with Aquastop. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing the substrate thickness at an external open edge',
      'Rainwater disposal from terraces and balconies with railings',
      'Edge detailing with Aquastop Nanoflex and Aquastop Flex',
      'Edge detailing with Aquastop Green',
      'Deeper tile build ups where the standard section is too shallow',
    ],
  },
  'aquaform-d-small': {
    description:
      'Aquaform D Small is the compact section in the Aquaform painted aluminium drip edging range, intended for edges where a shallow tile build up leaves little room for a deeper profile. It does the same job as Aquaform D and Aquaform D Plus: fitted at the open edge of an external surface and bonded into Aquastop Nanoflex, Aquastop Flex or Aquastop Green, it waterproofs the exposed substrate thickness and carries rainwater off the slab rather than letting it track back under the tiles. Because it is a formed accessory and not a coating, it is ordered by length and section, which is a different exercise from working out membrane coverage. Measure the actual edge build up on site, since balcony screed depths in the UAE rarely match the drawing exactly.',
    meta_description:
      'Aquaform D Small TDS: compact painted aluminium drip edging for external edges, used with Aquastop membranes. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Shallow edge build ups on external balconies and terraces',
      'Waterproofing the substrate thickness at an open edge',
      'Rainwater disposal from external surfaces with railings',
      'Edge detailing with Aquastop Nanoflex, Flex and Green',
    ],
  },
  'aquaform-od-od-plus': {
    description:
      'A perimeter drain sits along the wall to floor junction, and Aquaform OD and OD Plus are the ASA bodied version Kerakoll supplies for that position. The sides run seamlessly across the change of plane, and they are coated in non woven polypropylene so the Aquastop Nanoflex mineral membrane keys onto the drain rather than merely touching it, with Aquastop Fix sealant and gel adhesives from the Biogel range completing the seal. Choose this over the Aquaform SD and VD central drains when the fall runs to a line at the edge of a wet room instead of to a single point. It is a drainage component, so the membrane remains a separate order. Set the drain level accurately first, because the screed falls are then built to it.',
    meta_description:
      'Aquaform OD - OD Plus TDS: ASA perimeter drain with non woven coated sides for Aquastop Nanoflex systems. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Perimeter drainage at the wall to floor junction',
      'Wet rooms and showers waterproofed with Aquastop Nanoflex',
      'Sealing to the membrane with Aquastop Fix',
      'Bonding with gel adhesives from the Biogel range',
      'Linear drainage where falls run to an edge rather than a point',
    ],
  },
  'aquaform-r': {
    description:
      'Aquaform R is a site tool rather than a material: a 37 cm wide roller on a stainless steel frame with a handle, carrying a dedicated space for one bag of adhesive as ballast, so the Green-Pro membrane is pressed down evenly and fully across its width. Rolling a sheet membrane by hand gives uneven contact, and the voids left behind the sheet are where water later travels. Weighting the roller to a consistent pressure is what the tool buys. One roller serves many installations, so it is bought once per crew and not by the square metre. It is listed within the waterproofing range because it belongs to that system, but it waterproofs nothing on its own. No data sheet is published for it, so order it by name.',
    meta_description:
      'Aquaform R: 37 cm stainless steel application roller that presses the Green-Pro membrane down evenly across its width. Order it through Lapiz Blue UAE.',
    applications: [
      'Pressing the Green-Pro membrane evenly onto the adhesive bed',
      'Even 37 cm wide coverage in one pass',
      'Weighted rolling using one bag of adhesive as ballast',
      'Kerakoll sheet membrane installation work',
    ],
  },
  'aquaform-sd-vd': {
    description:
      'Aquaform SD and VD are central drains, used where the floor falls to one point rather than to a line along a wall. The body is polypropylene and it comes with a waterproof polyethylene membrane coated on both sides with polypropylene fabric, which is the part that matters when ordering: the fabric faces let the drain be bonded into a Kerakoll waterproofing system so the drain and the membrane form one continuous seal rather than two components meeting at a joint. Pick these over the Aquaform OD perimeter drains according to how the falls have been set out. Make that decision before the screed is laid, since a point drain and a linear drain need different falls, and reworking falls in a finished UAE bathroom is expensive.',
    meta_description:
      'Aquaform SD - VD TDS: central polypropylene drain with fabric coated waterproof membrane for Kerakoll systems. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Central point drainage in wet rooms and bathrooms',
      'Bonding the drain into a Kerakoll waterproofing system',
      'Floors set out with falls to a single point',
      'Showers and balconies before tiling',
    ],
  },

  /* Aquastop tapes, mesh and joints */
  'aquastop-120': {
    description:
      'Aquastop 120 is a flexible NBR waterproofing joint, not a liquid membrane, and the two are ordered for different reasons. The tape treats perimeter joints and fractionizing joints, the lines where a floor meets a wall or where a large floor is divided, and it is worked into the waterproofing layer so movement along that line does not tear the membrane open. It bonds directly on application. Behind it a liquid product such as Aquastop Nanoflex or Aquastop Flex still has to cover the field of the floor. It is suitable under ceramic and porcelain tiles and natural stone. Order it by linear metre against the measured perimeter, and allow for corners and overlaps, because a run that falls short forces a joint in the wrong place.',
    meta_description:
      'Aquastop 120 TDS: flexible NBR waterproof joint tape for perimeter and fractionizing joints under tiles. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Perimeter joints in under tile waterproofing systems',
      'Fractionizing joints across large floor areas',
      'Under ceramic and porcelain tiles',
      'Under natural stone finishes',
      'Wall to floor junctions in wet areas',
    ],
  },
  'aquastop-ar1': {
    description:
      'Aquastop AR1 is a reinforcing mesh of alkali resistant glass fibre. Its job is tensile reinforcement inside a coating, not waterproofing: the mesh is embedded in the wet membrane so the cured film carries load across a weak line instead of relying on film thickness alone. Alkali resistance is the whole point of the specification, because ordinary glass fibre degrades in the high pH of cement based products and the reinforcement would then quietly disappear. Use it where a detail needs strengthening rather than everywhere, and keep it distinct from the tapes, which treat movement joints, and from the liquid membranes themselves. It is ordered by roll. Lap the mesh as the data sheet requires and work it fully into the first coat, since mesh left sitting on the surface reinforces nothing.',
    meta_description:
      'Aquastop AR1 TDS: alkali resistant glass fibre reinforcing mesh for embedding in Kerakoll waterproofing coatings. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Reinforcing waterproofing coatings at vulnerable details',
      'Embedding in the first coat of a cement based membrane',
      'Strengthening coatings over cement based substrates',
      'Detail reinforcement in Aquastop waterproofing systems',
    ],
  },
  'aquastop-bt': {
    description:
      'Aquastop BT is a self adhesive butyl tape, which separates it from an NBR joint bedded into adhesive. The butyl sticks on contact, the face is coated in high adhesion, non woven, alkali resistant polypropylene so a cement based membrane can bond to it, and a pre cut silicone film halfway along the back lets one half be released and fixed while the other stays protected. That is the detail which makes it usable at perimeter joints involving a bituminous sheath, PVC, wood, polycarbonate, glass, plastic or metal, surfaces where a cementitious product has nothing to grip. Choose it for mixed material junctions and keep Aquastop 120 for ordinary perimeter and fractionizing joints. Clean the non porous face thoroughly first, because dust and release oils defeat butyl adhesion.',
    meta_description:
      'Aquastop BT TDS: butyl adhesive tape with alkali resistant polypropylene face for perimeter joints on mixed materials. Request it from Lapiz Blue UAE.',
    applications: [
      'Perimeter joints that also involve a bituminous sheath',
      'Junctions with PVC, wood and polycarbonate',
      'Junctions with glass, plastic and metal materials',
      'Self adhesive detailing where a cementitious tape will not bond',
      'Mixed material wall to floor junctions in waterproofing systems',
    ],
  },

  /* Aquastop liquid membranes, sealants and topcoats */
  'aquastop-extreme': {
    description:
      'Aquastop Extreme is a reactive waterproofing product, meaning it cures by chemical reaction rather than by drying, and it is specified where the substrate deforms and where chemical attack is expected. High adhesion and high chemical resistance are the two properties Kerakoll puts first, and both point at the same situation: a surface that moves under load or temperature, carrying a finish that cannot be lifted later to make repairs. It is a liquid applied membrane covering the field of a floor or wall, so joints and junctions still need the Aquastop tapes alongside it. Pot life is one hour, so mix in batches matched to the area a crew can cover in that time. Shelf life is 18 months. On a hot UAE site, expect the usable working time to run short of the hour.',
    meta_description:
      'Aquastop Extreme TDS: reactive waterproofing with high chemical resistance and adhesion for deformable substrates. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing deformable substrates',
      'Surfaces exposed to chemical attack',
      'Liquid applied membrane over floors and walls',
      'Projects needing high adhesion to difficult substrates',
    ],
  },
  'aquastop-fix': {
    description:
      'Aquastop Fix is the sealant that joins the parts of an Aquastop installation together, supplied as a single component organic product in 6 kg buckets. It bonds and seals Aquastop tapes and membranes, and it is the material called for where a drain such as Aquaform OD meets the Aquastop Nanoflex membrane. Curing happens by reaction with atmospheric moisture, so the container wants closing as soon as the day requirement has been taken out of it. Open time is 20 minutes, which sets how long a bedded tape or component can still be adjusted before the bond begins to fix. Shelf life is 12 months. It does not waterproof an area by itself, so it is ordered alongside a membrane and tapes rather than instead of them.',
    meta_description:
      'Aquastop Fix TDS: single component moisture curing waterproof sealant for bonding Aquastop tapes and membranes. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Sealing and bonding Aquastop tapes',
      'Sealing Aquastop membranes at junctions',
      'Sealing Aquaform drains to the Aquastop Nanoflex membrane',
      'Detail work in under tile waterproofing systems',
    ],
    category: 'sealant',
  },
  'aquastop-flex': {
    description:
      'Two component mineral membranes are mixed on site from powder and liquid, and Aquastop Flex is the certified, anti alkali and chlorine resistant member of the Aquastop range. It is a flexible waterproofing layer applied to the substrate before tiles go down with adhesive, and the chlorine resistance is what makes it the choice for swimming pools and plant rooms rather than a general purpose coating. Adhesion and durability are both stated as high, so the tile bed sits on the membrane as part of one system. Classification is EN 1504-2. Supplied in a 12.5 kg bag, with coverage of about 2 kg per square metre and a pot life of one hour. Shelf life is 12 months. Mix only what the crew can place inside that hour.',
    meta_description:
      'Aquastop Flex TDS: certified two component chlorine resistant mineral waterproofing membrane, EN 1504-2, 2 kg/m2. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Flexible waterproofing of substrates before laying with adhesives',
      'Swimming pools and water retaining areas',
      'Areas exposed to alkalis and chlorine',
      'Wet areas, bathrooms and balconies before tiling',
      'Substrates needing high adhesion and durability',
    ],
  },
  'aquastop-green': {
    description:
      'Aquastop Green does two jobs at once: it waterproofs, and it decouples. As a decoupling layer it stops cracks in the substrate transferring up into the tile finish, the failure that shows as a straight line of cracked tiles following a crack in the screed below. It also waterproofs over substrates that are already cracked, not fully cured, or still carrying residual moisture and vapour pressure, so a programme need not wait for a screed to dry out completely. It goes down before ceramic tiles, natural stone or hardwood flooring. Applied thickness is 1 to 2 mm, and shelf life is 24 months. Choose it over a plain membrane when substrate movement, rather than water alone, is the risk being managed on that particular floor.',
    meta_description:
      'Aquastop Green TDS: anti cracking waterproof membrane and decoupling layer for tiles, stone and hardwood. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Decoupling tile finishes from substrate movement',
      'Waterproofing cracked or not fully cured substrates',
      'Substrates with residual moisture and vapour pressure',
      'Before laying ceramic tiles and natural stone',
      'Before laying hardwood flooring',
    ],
  },
  'aquastop-nanoflex': {
    description:
      'Breathability is what sets Aquastop Nanoflex apart from the other Aquastop mineral products. It is a certified, anti alkali and chlorine resistant mineral coating for the flexible waterproofing of substrates before tiles are laid with adhesive, and because it breathes it lets vapour out of the substrate instead of trapping it beneath a sealed film, which is the mechanism that lifts coatings off a young screed. Adhesion and durability are both stated as high. Supplied in 20 kg bags, with coverage of about 1.15 kg per square metre, an applied thickness of 2 to 3 mm and a pot life of one hour. Shelf life is 12 months. It covers the field only, so put Aquastop 120 or Aquastop BT for the perimeter joints on the same order.',
    meta_description:
      'Aquastop Nanoflex TDS: certified breathable chlorine resistant mineral waterproofing coating, 2 to 3 mm, 20 kg bags. Request it from Lapiz Blue UAE.',
    applications: [
      'Flexible waterproofing of substrates before laying with adhesives',
      'Breathable waterproofing over substrates holding moisture',
      'Areas exposed to alkalis and chlorine',
      'Wet areas and balconies before tiling',
      'Base membrane for Aquastop Traffic and Aquaform drains',
    ],
  },
  'aquastop-nanosil': {
    description:
      'Aquastop Nanosil is a neutral silane waterproof sealant in a 290 ml cartridge, so it is gun applied pointing material rather than anything that covers an area. Neutral cure matters because an acid curing sealant can stain natural stone and attack some metals, which is exactly where a waterproofing detail tends to end up. Use it for the sanitary and movement joints that finish a wet area, around trays, thresholds and penetrations, after the membrane and the tapes have done the waterproofing. Shelf life is 18 months. Order cartridges against the measured length of joint rather than by floor area, and treat it as a finishing item: it seals a gap, and it replaces neither Aquastop Nanoflex, Aquastop Flex nor an Aquastop tape anywhere in the system.',
    meta_description:
      'Aquastop Nanosil TDS: neutral silane waterproof sealant in a 290 ml cartridge for wet area joints. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Sanitary joints in bathrooms and wet areas',
      'Movement joints finished after waterproofing',
      'Sealing around trays, thresholds and penetrations',
      'Joints against natural stone where neutral cure is needed',
    ],
    category: 'sealant',
  },
  'aquastop-traffic': {
    description:
      'Aquastop Traffic is the covering that lets an Aquastop Nanoflex membrane stay exposed. It is a protective, non slip, water based coating applied over Nanoflex where no tile or stone finish will follow, on a plant deck, a service area or a walkway, and the non slip texture is why it is specified rather than simply leaving the membrane bare. Supplied in 10 kg buckets, with coverage of about 0.7 kg per square metre. Shelf life is 18 months. It is a topcoat and not a waterproofing layer in its own right, so Nanoflex remains the product that excludes water while Aquastop Traffic takes the wear. On an exposed UAE terrace or plant deck, that wear layer decides how long the membrane underneath lasts.',
    meta_description:
      'Aquastop Traffic TDS: protective non slip water based covering for exposed Aquastop Nanoflex membranes, 10 kg. Request it from Lapiz Blue UAE.',
    applications: [
      'Protecting exposed Aquastop Nanoflex membranes',
      'Non slip finish on walkways and service areas',
      'Plant decks and terraces left without a tile finish',
      'Water based topcoat over mineral waterproofing',
    ],
  },

  /* Resin and concrete protection */
  'ep21': {
    description:
      'EP21 is a resin with three distinct uses, which is why it turns up in more than one part of the Kerakoll range. It consolidates absorbent substrates, binding a weak or dusty surface so a finish can be laid over it. It forms finishings and epoxy screeds. And it waterproofs cement based substrates that still hold residual moisture, the use that gets it specified on a tight programme where a screed cannot be left to dry. Supplied in a 2.5 kg can, with coverage of about 0.2 kg per square metre, a pot life of 30 minutes and an open time of 30 minutes. Shelf life is 12 months. Thirty minutes is a short window in UAE summer conditions, so mix small quantities and keep the material out of the sun.',
    meta_description:
      'EP21 TDS: epoxy resin for consolidating substrates, epoxy screeds and waterproofing cement substrates with residual moisture. Request it from Lapiz Blue UAE.',
    applications: [
      'Consolidating absorbent substrates before laying',
      'Creating finishings and epoxy screeds',
      'Waterproofing cement based substrates with residual moisture',
      'Priming weak or dusty cement surfaces',
    ],
  },
  'metric-osmotic': {
    description:
      'Osmotic waterproofing works through the concrete rather than on top of it, and Metric Osmotic is the cement based version Kerakoll supplies for that purpose. It is applied as a waterproofing and protective product to concrete, and because the action is osmotic it suits structures where water pushes from the far face and a surface film would simply be driven off, so tanks, basements and lift pits. Classification is EN 1504-2, the standard for concrete surface protection, which is the line a consultant looks for on a repair specification. Supplied in 25 kg bags, with a pot life of one hour and a shelf life of 12 months. This is a concrete protection product, so it belongs with the structural repair materials on a job rather than with the under tile Aquastop system.',
    meta_description:
      'Metric Osmotic TDS: osmotic cement based waterproofing and protective product for concrete, EN 1504-2, 25 kg bags. Request it from Lapiz Blue UAE.',
    applications: [
      'Waterproofing and protecting concrete structures',
      'Osmotic waterproofing where water acts on the far face',
      'Water tanks, basements and lift pits',
      'Concrete surface protection to EN 1504-2',
      'Structural repair and protection works',
    ],
  },
  'nanodefense': {
    description:
      'Nanodefense is a certified, organic, water based waterproofing product for absorbent substrates in damp environments, and the words to notice are absorbent and water based. Being water based it is low odour and simple to clean up, which makes it workable inside occupied buildings; being formulated for absorbent substrates it is aimed at plaster, screed and board rather than dense or non porous surfaces. The typical use is a bathroom or shower wall and floor before tiling. Supplied in 5 kg buckets, with coverage of about 1.5 kg per square metre and a shelf life of 12 months. It is a liquid membrane for the field of the surface, so corners and floor to wall joints still want an Aquastop tape, which is where leaks in UAE wet rooms usually begin.',
    meta_description:
      'Nanodefense TDS: certified organic water based waterproofing for absorbent substrates in damp environments, 5 kg. Request it from Lapiz Blue UAE.',
    applications: [
      'Waterproofing absorbent substrates in damp environments',
      'Bathroom and shower walls and floors before tiling',
      'Plaster, screed and board substrates',
      'Interior wet areas where a water based product is preferred',
    ],
  },
};

function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);
  let written = 0;
  const warnings: string[] = [];

  for (const [slug, entry] of Object.entries(content)) {
    const rec = manifest.find((r) => r.brand === 'kerakoll' && r.slug === slug);
    if (!rec) {
      warnings.push(`no record for ${slug}`);
      continue;
    }
    const words = entry.description.trim().split(/\s+/).length;
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words, needs 100 to 150`);
    if (entry.meta_description.length > 165) warnings.push(`${slug}: meta is ${entry.meta_description.length} chars`);
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

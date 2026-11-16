/*
  Editorial content for the Mapei tile adhesives and grouts line.

  Original copy, 100 to 150 words per product, written from the specs and uses
  carried on each record. Not manufacturer marketing, and nothing stated that
  is not supported by the source data.

  Only products that already clear the shipping gate are written here. The
  Mapei tiling range is deep and the products sit close together, so each
  description argues the choice against its nearest neighbour in the range.

  Also corrects a handful of categories where the automatic classifier read
  the product type too literally: the UltraCare cleaners, sealers and
  protectors are surface treatments, not tile adhesives or grouts.

  Usage: npx tsx scripts/apply-content-mapei-tiling.ts
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
  'keraflex-maxi-s1-zero': {
    description:
      'Keraflex Maxi S1 Zero is the thick bed member of the Mapei deformable adhesive family, classified C2TE and supplied as the S1 grade for large and heavy tiles. Bed depth is the honest distinction against plain Keraflex: this one holds its shape at high thickness, so a large format slab does not sink into the mortar on a floor or slide down a wall as it sets. Against a C1 adhesive such as Kerabond T, the C2 grip plus deformability is what carries porcelain and stone over heated screeds, waterproofed surfaces and existing tiles. Open time runs beyond 30 minutes and a tile is still adjustable at roughly 45 minutes, which is the figure that counts on a UAE site where application is allowed up to 40 degrees. Grey and white, 25 kg bags, EC1 Plus rated.',
    meta_description:
      'Keraflex Maxi S1 Zero TDS: C2TE deformable cementitious adhesive for large format and heavy tiles at high bed thickness. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Large format porcelain and stone tiles',
      'Thick bed floor and wall installations',
      'Tiling over existing ceramic tiles',
      'Underfloor heating and waterproofed substrates',
      'Heavy slabs needing no vertical slip',
    ],
  },
  isolastic: {
    description:
      'Mixed in place of water, Isolastic turns an ordinary Mapei cementitious adhesive into a deformable one. Mapei states that Kerabond T, a C1T bag on its own, reaches class C2ES2 when gauged with this latex rather than water, so the real decision is whether to stock one adhesive plus an additive or several pre-blended grades. The additive route suits a mixed specification: full strength for heavy stone and movement, diluted one part to one with water for lighter work, plain water for straightforward ceramic. Working figures follow the adhesive, with open time of 20 to 30 minutes, around 45 minutes to adjust a tile and wall joints ready for grouting after 4 to 8 hours. A pinkish white liquid in 5 and 25 kg tanks, usable from 5 to 40 degrees, stable for 24 months.',
    meta_description:
      'Isolastic TDS: latex additive replacing mixing water to make Mapei cementitious tile adhesives deformable, up to C2ES2. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Upgrading Kerabond grade adhesives to deformable class',
      'Heavy natural stone and large tiles',
      'Substrates that move under load or heat',
      'Diluted one to one for intermediate performance',
      'Wall and floor tiling, interior and exterior',
    ],
  },
  fugolastic: {
    description:
      'Where a cement joint has to hold its colour and resist absorption, Fugolastic is the liquid polymer gauged into the Keracolor grout range in place of mixing water. It takes the joint to CG2, the improved cementitious class, without moving to a reactive product. The alternative inside the Mapei range is Kerapoxy, and that is the right answer only when the joint faces chemical attack or constant aggressive cleaning. For a bathroom, a villa floor or a mall concourse, a polymer modified cement joint is easier to place, easier to clean off the tile face and far cheaper per square metre. Pot life is around two hours and the joint sets in 24 hours. Supplied as a white liquid in 10 and 25 kg packs, used between 5 and 35 degrees, with 24 months of shelf life.',
    meta_description:
      'Fugolastic TDS: liquid polymer admixture that takes Mapei Keracolor tile grouts to CG2 class with lower water absorption. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Polymer modification of Keracolor grouts',
      'Joints needing reduced water absorption',
      'Bathrooms, kitchens and other wet areas',
      'Colour stable joints on floors and walls',
      'Commercial and residential tiling at volume',
    ],
  },
  'eco-prim-grip-plus': {
    description:
      'Smooth, low absorbency substrates are where a cementitious adhesive has nothing to key into, and Eco Prim Grip Plus exists to give it something. It is a grey, creamy bonding promoter for renders, smoothing compounds and cementitious adhesives, used indoors and outdoors on walls and floors, and it is the primer specified when tiles go over existing tiles. Worth separating from a thinned primer for dusty or absorbent screeds: that job is suction control, this one is grip on a closed surface, and the two are not interchangeable. Consumption sits between 0.20 and 0.30 kg per square metre according to absorption, from a 10 kg pack. Odourless and solvent free with EC1 Plus very low VOC emissions, which matters on a fit out running alongside occupied floors. Apply between 5 and 35 degrees.',
    meta_description:
      'Eco Prim Grip Plus TDS: solvent free adhesion promoter primer for tile on tile work, renders and smoothing compounds. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Laying tiles over existing tiles',
      'Priming smooth, low absorbency substrates',
      'Under cementitious tile adhesives',
      'Under renders and smoothing compounds',
      'Interior and exterior walls and floors',
    ],
    category: 'primer',
  },
  'ultracare-5-sides-sealer': {
    description:
      'Applied before the tile goes down rather than after, UltraCare 5 Sides Sealer is a water based treatment for the back and four edges of a slab, intended to stop surface efflorescence and staining driven by rising damp. That timing is the whole point of it. The UltraCare stain protectors treat the visible face once a floor is finished, while this one seals the faces nobody can reach again. It is the choice where a screed or slab will carry moisture and salts into an absorbent stone, a common story in UAE ground floor and landscaped areas. The finish is a natural look, with no change to how the material reads. Coverage runs at one litre per 10 to 15 square metres from a 5 kg pack, applied between 5 and 40 degrees and stored for 12 months.',
    meta_description:
      'UltraCare 5 Sides Sealer TDS: water based back and edge sealer that blocks efflorescence and rising damp stains in stone. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Back and edge sealing before laying',
      'Absorbent natural stone and slabs',
      'Preventing surface efflorescence',
      'Protection against rising damp staining',
      'Natural look finish with no colour change',
    ],
    category: 'surface_treatment',
  },
  'ultracare-acid-cleaner': {
    description:
      'UltraCare Acid Cleaner is the concentrated acid detergent in the range, bought to deal with cementitious residue a neutral product will not shift: hardened grout, salt and lime scale efflorescence, rust marks and organic dirt left after installation. It is cleared for ceramics, porcelain, glass mosaic and acid resistant natural stone, and that last qualifier decides everything. On polished marble, or any acid sensitive stone, the correct product is the neutral UltraCare Multicleaner instead, because an acid will dull the surface permanently. Dilution governs strength and therefore coverage, so a test area comes before the first wall. Hard water leaves heavy lime scale in UAE wet areas, which is exactly what this is good at. A transparent liquid in 1 and 5 litre packs, used from zero to 40 degrees, with four years of shelf life.',
    meta_description:
      'UltraCare Acid Cleaner TDS: concentrated acid detergent for hardened cement residue, efflorescence and lime scale on tiles. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Post installation cleaning after cementitious grouting',
      'Removing hardened cement and grout residue',
      'Salt and lime scale efflorescence',
      'Rust stains on ceramic and porcelain',
      'Glass mosaic and acid resistant natural stone',
    ],
    category: 'surface_treatment',
  },
  'ultracare-epoxy-off-gel': {
    description:
      'Hardened epoxy grout on a tile face is the problem UltraCare Epoxy Off Gel is built for. Its high viscosity is the specification that matters: the gel stays where it is put on a vertical surface and keeps softening the residue instead of running to the floor. Against UltraCare Kerapoxy Cleaner the division is timing and orientation. The ready to use cleaner handles fresh cleaning on the day of grouting, while this gel is what remains when epoxy has cured or a previous clean was left too late, and it is the one to reach for on walls and mosaic feature panels. One litre treats up to 15 square metres, depending on the surface and how dirty it is. An opalescent liquid in a 1 litre pack, used from zero to 40 degrees, stored for three years.',
    meta_description:
      'UltraCare Epoxy Off Gel TDS: high viscosity cleaner that removes cured epoxy grout residue from walls and tile faces. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Removing cured epoxy grout residue',
      'Vertical surfaces and wall tiling',
      'Mosaic and feature panel clean off',
      'Persistent residue left by a late clean',
      'Spot treatment on finished tile faces',
    ],
    category: 'surface_treatment',
  },
  'ultracare-fuga-fresca': {
    description:
      'Sound joints in a patchy colour do not justify raking out, and UltraCare Fuga Fresca is the polymeric paint that renews or changes the colour of cementitious grout lines on interior floors and wall coverings. The judgement call is simple. A joint that has failed, loosened or cracked needs replacing with a cementitious grout, and no coating will fix it. Where the joint is intact and only the colour reads badly, this evens it out and leaves a uniform line with reduced water absorption, which makes routine cleaning easier afterwards. Covering power is quoted as a contrast ratio of 96.93, so it works over a darker original. It dries in about two hours, comes in eight shades from 100 to 119, and is supplied in 0.16 and 1 kg packs for interior use.',
    meta_description:
      'UltraCare Fuga Fresca TDS: polymeric grout paint that renews or recolours cementitious joints on interior floors and walls. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Renewing faded cementitious grout joints',
      'Changing grout colour without regrouting',
      'Evening out colour inconsistency in joints',
      'Interior floors and wall coverings',
      'Reducing water absorption in existing joints',
    ],
  },
  'ultracare-grout-release': {
    description:
      'Dark cementitious grout against a thin polished tile is a staining risk, and UltraCare Grout Release is the water dispersion applied before grouting to reduce it. Prevention rather than cure is the argument here. UltraCare Acid Cleaner will take hardened residue off afterwards, but only on surfaces that tolerate acid, and a polished or porous face may already be marked by then. This treatment goes on the tile first, stops the grout gripping the surface and makes the clean off easier. It suits thin polished ceramic and porous materials such as cementine tiles and unglazed stone. Coverage reaches 40 square metres per litre in one coat, heavily influenced by how absorbent the substrate is. Colourless, EC1 Plus rated, in a 1 litre pack, applied between 5 and 35 degrees and stored for three years.',
    meta_description:
      'UltraCare Grout Release TDS: pre grouting protector that stops cementitious grout staining thin polished and porous tiles. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Pre grouting protection for porous tiles',
      'Thin polished ceramic and porcelain',
      'Cementine tiles and unglazed stone',
      'Dark grout on light or porous surfaces',
      'Easier post grouting clean off',
    ],
    category: 'surface_treatment',
  },
  'ultracare-hd-cleaner': {
    description:
      'Grease, organic soiling and old wax treatments call for an alkaline product, and UltraCare HD Cleaner is the concentrated professional degreaser in the UltraCare line. Keep the three cleaners straight and the choice becomes simple: acid for cement residue and lime scale, neutral Multicleaner for routine maintenance, alkaline HD Cleaner for grease, stains and water based or metallic waxes on resistant substrates. It earns its place before a tile on tile installation, where a greasy or waxed existing floor will defeat any primer and adhesive put over it, so it pairs naturally with Eco Prim Grip Plus on refurbishment work. Dilution sets the yield, roughly 200 square metres per litre at one to twenty and around 30 square metres at one to five. An opalescent liquid in 1 and 5 litre packs, stored for three years.',
    meta_description:
      'UltraCare HD Cleaner TDS: concentrated alkaline degreaser for deep cleaning ceramic and stone before tile on tile work. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Deep cleaning and degreasing before tiling',
      'Surface preparation for tile on tile work',
      'Removing water based and metallic wax',
      'Organic dirt and grease on resistant substrates',
      'Ceramic and natural stone floors',
    ],
    category: 'surface_treatment',
  },
  'ultracare-intensifier-s': {
    description:
      'Two colour enhancers sit in the UltraCare range and the substrate decides between them. UltraCare Intensifier S is the solvent based blend of polymers, and penetration is the reason to pay for it: the formulation absorbs into materials that are particularly compact or carry a polished finish, which the water based Intensifier W is not aimed at. It preserves and deepens the colour of natural stone, terracotta, terrazzo, marble chip tiles, cementine tiles and engineered stone, inside and outside, while protecting the surface. For a polished stone lobby floor or a honed marble feature wall, this is the grade that will take. Coverage reaches around 30 square metres per litre in one coat, strongly influenced by absorbency and finish. Transparent, in 1 litre packs, applied between 5 and 35 degrees, with three years unopened.',
    meta_description:
      'UltraCare Intensifier S TDS: solvent based colour enhancing protector that penetrates compact and polished natural stone. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Colour enhancement of natural stone',
      'Compact and polished stone finishes',
      'Terracotta, terrazzo and marble chip tiles',
      'Cementine tiles and engineered stone',
      'Interior and exterior floors and walls',
    ],
  },
  'ultracare-intensifier-w': {
    description:
      'UltraCare Intensifier W is the water based colour enhancer, a polymeric microemulsion that penetrates and protects while leaving the surface a bright finish. Absorbency is the dividing line against the solvent based Intensifier S. This grade is formulated for natural stone of medium to high absorbency, along with terracotta, terrazzo, marble chip tiles, cementine tiles and engineered stone, on walls and floors, indoors and out, while compact or polished material belongs to the other grade. The water based chemistry carries an EC1 Plus rating for very low emissions, which is what lets it be used in an occupied apartment or hotel room without the ventilation a solvent demands. One litre covers up to 30 square metres in a single coat. A milky white liquid in 1 litre packs, applied from 5 to 35 degrees.',
    meta_description:
      'UltraCare Intensifier W TDS: water based colour enhancing protector for absorbent natural stone, terracotta and terrazzo. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Colour enhancement of absorbent natural stone',
      'Terracotta, terrazzo and marble chip tiles',
      'Cementine tiles and engineered stone',
      'Occupied interiors needing low emissions',
      'Walls and floors, interior and exterior',
    ],
    category: 'surface_treatment',
  },
  'ultracare-kerapoxy-cleaner': {
    description:
      'Cleaning epoxy grout off the tile face is a same day job, and UltraCare Kerapoxy Cleaner is the ready to use product for it. No dilution and no mixing is the practical advantage: the tiler works with it straight from the pack on porcelain, ceramic and glass mosaic, on walls and floors, inside and out. Its counterpart, UltraCare Epoxy Off Gel, is thickened for cured residue on vertical surfaces, so the pair divides neatly between fresh cleaning and rescue work. On a UAE project grouting with Kerapoxy across a large wet area, having the 5 litre pack on site before grouting starts is what keeps a haze off the finished tile. Also supplied as a 0.75 litre spray. An opalescent liquid used from zero to 40 degrees, stored cool for up to 36 months.',
    meta_description:
      'UltraCare Kerapoxy Cleaner TDS: ready to use cleaner for fresh epoxy grout residue on porcelain, ceramic and glass mosaic. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Fresh cleaning during epoxy grouting',
      'Post installation epoxy residue removal',
      'Porcelain, ceramic and glass mosaic',
      'Walls and floors, interior and exterior',
      'Spray application from the 0.75 litre pack',
    ],
    category: 'surface_treatment',
  },
  'ultracare-multicleaner': {
    description:
      'Routine cleaning is where a protected surface quietly gets ruined, and UltraCare Multicleaner is the neutral concentrate that will not do that. Neutral pH is the point of difference: an acid cleaner etches polished natural stone and an alkaline degreaser strips treatments, while this one maintains both treated and untreated ceramic, stone and concrete day after day. It will also lift traces of cementitious product from acid sensitive surfaces, the safe route on polished marble where UltraCare Acid Cleaner must not go. Yield is the other argument. Diluted one part to 200, a single litre cleans approximately 1500 square metres, so it suits a facilities team maintaining a mall or a tower rather than a one off clean. A transparent liquid in 0.75, 1 and 5 litre packs, stored for three years.',
    meta_description:
      'UltraCare Multicleaner TDS: concentrated neutral cleaner for daily maintenance of treated and untreated tile, stone and concrete. Request it from Lapiz Blue UAE.',
    applications: [
      'Everyday cleaning of treated surfaces',
      'Maintenance of untreated tile and stone',
      'Concrete and ceramic floors',
      'Cement traces on acid sensitive polished stone',
      'High volume facilities management cleaning',
    ],
    category: 'surface_treatment',
  },
  'ultracare-stain-protector-s': {
    description:
      'Three stain protectors share the UltraCare name and this is the solvent based one, a polymer blend that reduces how much water, oil and grease a surface takes up while leaving a natural effect rather than a film. It is used on floors and wall coverings, work surfaces, kitchen tops and bathrooms. Worth knowing before specifying: the water based W and W Plus grades are the ones Mapei describes as suitable for surfaces in contact with food, so for a top that sees food preparation they are the safer reading of the data sheet. Choose this solvent based grade where penetration into the material is the priority. Drying takes about two hours. A light yellow liquid giving up to roughly 30 square metres per litre in one coat, in 1 litre packs, applied between 5 and 35 degrees.',
    meta_description:
      'UltraCare Stain Protector S TDS: solvent based oil and water repellent protector for floors, work surfaces and bathrooms. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Oil and water repellent treatment of floors',
      'Wall coverings and vertical surfaces',
      'Work surfaces and kitchen tops',
      'Bathroom floors and walls',
      'Natural effect finish with no film',
    ],
  },
  'ultracare-stain-protector-w': {
    description:
      'Unpolished absorbent surfaces are what UltraCare Stain Protector W was formulated to treat: cementine tiles, cementitious interlock paving, natural stone without a polish, brickwork and terracotta, inside and outside. It reduces water, oil and grease absorption without forming a film, leaves the original colour and breathability alone, and is described as suitable for surfaces in contact with food, which makes it usable on a kitchen top as well as a terrace. Against the W Plus grade the distinction is finish, since Plus also covers polished stone and yields more per litre, so W is the economical choice when nothing in the schedule is polished. Good UV stability matters on an exposed UAE terrace or driveway. Colourless and EC1 Plus rated, 10 to 20 square metres per litre, dry in two hours, in 1 litre packs.',
    meta_description:
      'UltraCare Stain Protector W TDS: water based protector for unpolished stone, terracotta, brickwork and interlock paving. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Unpolished natural stone and brickwork',
      'Cementine tiles and terracotta',
      'Cementitious interlock paving',
      'Work surfaces and kitchen tops',
      'External areas needing UV stability',
    ],
  },
  'ultracare-stain-protector-w-plus': {
    description:
      'UltraCare Stain Protector W Plus extends the water based protector to polished stone, which is the single clearest reason to choose it over the standard W grade. It is a natural effect polymer emulsion that reduces water, oil and grease absorption on floors and wall coverings, work surfaces, kitchen tops and bathrooms, forms no film, alters neither colour nor breathability, and is described as suitable for surfaces in contact with food. Yield is the second argument, at 30 square metres per litre in one coat against the lower figure quoted for W, so on a large polished marble floor the cost gap narrows. Good UV stability allows external use. For a UAE villa running polished marble indoors and stone outside, one product covers both. Colourless, EC1 Plus rated, dry in two hours, in 1 litre packs.',
    meta_description:
      'UltraCare Stain Protector W Plus TDS: water based stain protector rated for polished stone, kitchen tops and external areas. Request it from Lapiz Blue UAE.',
    applications: [
      'Polished natural stone floors and walls',
      'Work surfaces and kitchen tops',
      'Bathroom floors and wall coverings',
      'External surfaces needing UV stability',
      'Natural effect, breathable, film free finish',
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
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words, needs 100 to 150`);
    if (entry.meta_description.length > 165) warnings.push(`${slug}: meta is ${entry.meta_description.length} chars`);
    if (/[–—]/.test(entry.description + entry.meta_description)) warnings.push(`${slug}: contains an em or en dash`);

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

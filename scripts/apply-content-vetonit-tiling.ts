/*
  Editorial content for the Vetonit tiling and specialty adhesives line.

  Original copy, 100 to 150 words per product, written from the specs and uses
  carried on each record. Not manufacturer marketing, and nothing stated that
  is not supported by the source data.

  Also corrects a handful of categories where the automatic classifier read
  the product type too literally.

  Usage: npx tsx scripts/apply-content-vetonit-tiling.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

interface Entry {
  description: string;
  meta_description: string;
  category?: TdsCategory;
}

const content: Record<string, Entry> = {
  'vetoset-ca545': {
    description:
      'Vetoset CA545 is the most deformable tile adhesive in the Vetonit range, a two component polymer modified cementitious system classified C2TE S2. The S2 rating is what separates it from an ordinary C2: it accommodates substrate movement that would crack a rigid bed, which is why it is specified for heated screeds, tile over tile work and large format heavy slabs on external elevations. It handles marble, granite, natural stone, glass mosaic and porcelain alike, at bed thicknesses from 2 to 6 mm, and sets firm within about an hour. Supplied as a 27 kg kit of powder and liquid polymer, mixed on site, with tools cleaned in water before the material hardens. Use it where the substrate moves, the tile is heavy, or both.',
    meta_description:
      'Vetoset CA545 TDS: C2TE S2 two component deformable tile adhesive for large format and heated screeds. Request the data sheet from Lapiz Blue UAE.',
  },
  'porcelain-plus-green': {
    description:
      'Porcelain Plus Green is a premixed deformable tile adhesive classified C2TES1, formulated for porcelain slabs and large format tiles while carrying a lower embodied carbon than a conventional cementitious adhesive. Porcelain absorbs almost nothing, so the bond is mechanical rather than suction driven, and the S1 deformability absorbs the movement a large tile transmits as it expands and contracts. The same bed suits marble, granite, mosaic and ceramic, which makes it a practical single adhesive on a mixed specification. It arrives as a dry powder in 25 kg bags and needs only clean water on site. Tools wash in water before it sets. Specify it where a project carries a sustainability target and the tiling schedule is dominated by large porcelain formats.',
    meta_description:
      'Porcelain Plus Green TDS: C2TES1 deformable premixed adhesive for porcelain slabs and large format tiles. Request the data sheet from Lapiz Blue UAE.',
  },
  'tile-fix-universal': {
    description:
      'Tile Fix Universal is the workhorse of the Vetonit tiling range, a water resistant polymer modified cementitious adhesive classified C2TE. The C2 rating gives it the grip porcelain needs, the T suppresses vertical slip so heavy wall tiles stay where they are placed, and the E extends open time, which matters in UAE summer conditions where a standard adhesive skins over before the tiler reaches the end of the spread. It takes porcelain, ceramic, natural stone and mosaic on concrete, plastered walls and screeds, internally and externally, in dry and wet areas, at bed thicknesses from 3 to 12 mm. A 25 kg bag mixes with 6 to 7 litres of clean water and allows 10 to 15 minutes to adjust a tile after placing.',
    meta_description:
      'Tile Fix Universal TDS: C2TE water resistant tile adhesive for porcelain, stone and mosaic, 3 to 12 mm. Request the data sheet from Lapiz Blue UAE.',
  },
  'premium-fix': {
    description:
      'Premium Fix is a water resistant cementitious adhesive classified C1T, intended for absorbent ceramic tiles on internal walls and floors. C1 suits tiles that draw water from the bed, which is how the bond forms, so it is the correct and economical choice for standard ceramic work and the wrong one under porcelain, which absorbs almost nothing. The T rating resists vertical slip, so wall tiles hold position during setting. It bonds to smooth concrete, plastered walls and screeds, works in dry and humid internal conditions, and is laid at 3 to 10 mm with 10 to 15 minutes to adjust a tile after placing. Supplied as a dry powder in 25 kg bags, mixed with clean water, with tools washed before the material hardens.',
    meta_description:
      'Premium Fix TDS: C1T water resistant cementitious adhesive for internal ceramic tiling, 3 to 10 mm. Request the data sheet from Lapiz Blue UAE.',
  },
  'vetoset-ua456': {
    description:
      'Vetoset UA456 is a two component semi rigid polyurethane adhesive for substrates that cement will not hold. It bonds artificial grass, PVC, sandwich panels, glass, cement boards, metal, wood, rubber, fibre cement and mineral wool, which puts it in industrial and commercial work rather than ordinary tiling. It is also used as a tile adhesive laid horizontally onto steel, a situation where a cementitious bed has nothing to key into and no tolerance for the movement steel undergoes with temperature. Supplied as a 10 kg kit of resin and hardener, mixed on site in the stated ratio, with a working life that starts the moment the two parts meet. Tools are cleaned with Vetonit Solvent XX400 before the adhesive hardens, after which removal is mechanical only.',
    meta_description:
      'Vetoset UA456 TDS: two component semi rigid PU adhesive for metal, PVC, glass and artificial grass. Request the data sheet from Lapiz Blue UAE.',
    category: 'resilient_adhesive',
  },
  'vetoset-ua457': {
    description:
      'Vetoset UA457 is the high viscosity version of the Vetonit two component polyurethane adhesive, and the difference is what it can do on a wall. The heavier body resists sag, so it is used vertically as well as horizontally on steel substrates, where a cementitious adhesive has nothing to key into. It bonds the same difficult materials as the lower viscosity grade: artificial grass, PVC, sandwich panels, glass, cement boards, metal, wood, rubber, fibre cement and mineral wool, across industrial and commercial applications. Supplied as a 10 kg kit of resin and hardener mixed on site. Clean tools with Vetonit Solvent XX400 before the material cures, because once hardened it comes off by mechanical means only. Choose this grade when the application is vertical or overhead.',
    meta_description:
      'Vetoset UA457 TDS: high viscosity two component PU adhesive for vertical bonding on steel and panels. Request the data sheet from Lapiz Blue UAE.',
    category: 'resilient_adhesive',
  },
  'vetofix-parquet': {
    description:
      'Vetofix Parquet is a single component, solvent free, ready to use elastic polyurethane adhesive for wood flooring. Elasticity is the point: timber moves with humidity and temperature, and a rigid adhesive transmits that movement into the board as cupping or an open joint. This one absorbs it. It bonds pre-finished boards and pinwheel patterns onto cementitious screeds, over existing wooden floors, and alongside ceramic and marble where a project mixes finishes in the same space. Being solvent free, it can be laid in occupied or partially occupied buildings without the ventilation a solvent system demands. Supplied ready to use in a 15 kg bucket, so there is no mixing ratio to get wrong and no pot life running from the moment the lid comes off.',
    meta_description:
      'Vetofix Parquet TDS: single component solvent free elastic PU adhesive for parquet and wood flooring. Request the data sheet from Lapiz Blue UAE.',
    category: 'resilient_adhesive',
  },
  'vetofix-vinyl': {
    description:
      'Vetofix Vinyl is a single component acrylic adhesive for resilient floor and wall coverings, supplied ready to use with an extended open time that gives a fitter room to position a large sheet before it grabs. It suits textile coverings with latex, PVC or polyurethane backings in interior areas, and holds up under medium to heavy traffic in residential, commercial and industrial settings. It is laid on level absorbent substrates such as concrete, screeds and levelling compounds, and is rated for use over underfloor heating, which rules out adhesives that soften as the floor warms. It withstands both static and dynamic loading under intensive service. Supplied in a 24 kg drum. The substrate has to be level and absorbent, so a levelling compound usually comes first.',
    meta_description:
      'Vetofix Vinyl TDS: ready to use acrylic adhesive for vinyl and textile floor coverings, extended open time. Request the data sheet from Lapiz Blue UAE.',
    category: 'resilient_adhesive',
  },
  'vetofill-eg455': {
    description:
      'Vetofill EG455 is a three component epoxy tile grout for joints that would destroy cement. It is waterproof, chemically resistant and cleanable with water during application, which is the practical difference between a workable epoxy and one that punishes the applicator. It fills joints on virtually any tile up to 10 mm and is specified in chemical processing and pharmaceutical plants, industrial kitchens, food plants and hospitals, swimming pools and aquariums, and heavy traffic public spaces such as malls, schools and customer service areas. Cement based grout erodes under repeated chemical cleaning and holds contamination in its pores; an epoxy joint does neither. Supplied as an 8 kg kit of resin, hardener and filler, mixed on site, with tools washed in water before the material sets hard.',
    meta_description:
      'Vetofill EG455 TDS: three component water cleanable epoxy tile grout for joints up to 10 mm. Request the data sheet from Lapiz Blue UAE.',
  },
  'vetofill-ug458': {
    description:
      'Vetofill UG458 is a two component polyurethane tile grout, a reactive joint filler for work where appearance is scrutinised and cement would disappoint. It is used where the finish carries a high aesthetic requirement, in showers and bathrooms, in thermal facilities, and in swimming pools, and it bonds to fibreglass and PVC substrates that a cementitious grout cannot hold. Polyurethane gives a dense non porous joint that resists staining and keeps its colour, without the mixing discipline and short working window of a full epoxy. Supplied as a small 2 kg kit, which suits the joint volumes involved and avoids mixing more than can be used. Mix only what the working time allows, and clean the tile face as the work proceeds rather than afterwards.',
    meta_description:
      'Vetofill UG458 TDS: two component PU tile grout for showers, pools and high specification finishes. Request the data sheet from Lapiz Blue UAE.',
    category: 'epoxy_grout',
  },
  'vetoset-ea454': {
    description:
      'Vetoset EA454 is a three component epoxy tile adhesive, water cleanable, chemically resistant and waterproof. It lays virtually any tile onto cementitious and metal substrates, which is the capability that distinguishes it: a cementitious adhesive has nothing to key into on steel. It is specified where chemical resistance is required, where foot traffic is heavy, and in industrial, healthcare and food processing facilities whose cleaning regimes would strip a cement bed over time. It also suits fast track repair and re-tiling during renovation, where the programme does not allow a long cure. Supplied as an 8 kg kit of resin, hardener and filler mixed on site. Clean tools and tile faces with water while the material is still fresh, because cured epoxy comes off mechanically.',
    meta_description:
      'Vetoset EA454 TDS: three component epoxy tile adhesive for chemical resistance and steel substrates. Request the data sheet from Lapiz Blue UAE.',
  },
  'vetonit-grout-pure': {
    description:
      'Vetonit Grout Pure is a high performance unsanded cement based tile grout classified CG2 WA, polymer modified so the set joint is non absorbent and resists dirt. Unsanded is the key characteristic: with no aggregate to bridge, it compacts properly into joints up to 10 mm and will not scratch a polished tile face during application. The WA designation marks reduced water absorption, which is why it holds colour in humid areas rather than darkening and staining. It suits ceramic, porcelain, terrazzo and marble, works in dry and humid conditions on walls and floors, and is compatible with cementitious adhesives across the Saveto range. Supplied in 5 kg bags and mixed with 0.6 to 0.8 litres of clean water. Available in selected colours.',
    meta_description:
      'Vetonit Grout Pure TDS: CG2 WA unsanded polymer modified tile grout for joints up to 10 mm. Request the data sheet from Lapiz Blue UAE.',
  },
  'vetonit-tile-grout-tgf120': {
    description:
      'Vetonit Tile Grout TGF120 is a water resistant sanded cementitious grout classified CG1, intended for general purpose tiling on walls and floors. The sand is what makes it suitable for wider joints, in the 3 to 5 mm range, where an unsanded grout would shrink and crack as it dries. It handles the varying dry and humid conditions a UAE building moves through, suits ceramic, porcelain, terrazzo and marble, and is compatible with the Saveto tile adhesive range so the bed and the joint behave as one system. Recommended for internal and external use. Supplied in 5 and 20 kg bags, mixed with 5.2 to 5.5 litres of water per bag. On a polished or soft tile face, test an area first, because sanded grout can mark.',
    meta_description:
      'Vetonit Tile Grout TGF120 TDS: CG1 sanded cementitious grout for 3 to 5 mm joints, internal and external. Request the sheet from Lapiz Blue UAE.',
  },
  'vetofill-cg550': {
    description:
      'Vetofill CG550 is a professional grade cementitious tile grout for joints from 2 up to 10 mm, supplied in 20 kg bags for work at volume rather than the small bag sizes aimed at a single bathroom. It fills joints on virtually any tile type and is used across commercial and residential projects, from shopping malls and office buildings to palaces and private houses, as well as wet areas including kitchens, bathrooms and swimming pools. It also fills glass block joints, where the grout has to sit against a non absorbent face and still hold. Mixed with clean water on site and cleaned from the tile face with water before it hardens. For a hospital or food production area, the hygienic grade CG551 is the better specification.',
    meta_description:
      'Vetofill CG550 TDS: professional grade cementitious tile grout for 2 to 10 mm joints, 20 kg bags. Request the data sheet from Lapiz Blue UAE.',
  },
  'vetofill-cg551': {
    description:
      'Vetofill CG551 is a polymer modified cementitious tile grout with antimicrobial performance, formulated for environments where the joint itself is part of the hygiene regime. It is specified in hospitals, clinics, health centres, kitchens and food processing plants, where a standard grout becomes a reservoir for contamination in its pores and is scrubbed hard enough to erode. The polymer modification reduces absorption so there is less for organisms to colonise, and the antimicrobial action addresses what does reach the surface. It fills joints on virtually all tile types up to 10 mm and performs in wet areas including kitchens and bathrooms. Supplied as a single component powder in 20 kg bags, mixed with clean water, with tools and tile faces washed before the material hardens.',
    meta_description:
      'Vetofill CG551 TDS: antimicrobial polymer modified cementitious grout for hospitals, clinics and kitchens. Request the sheet from Lapiz Blue UAE.',
  },
};

function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);
  let written = 0;
  const warnings: string[] = [];

  for (const [slug, entry] of Object.entries(content)) {
    const rec = manifest.find((r) => r.brand === 'vetonit' && r.slug === slug);
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

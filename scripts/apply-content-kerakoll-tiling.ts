/*
  Editorial content for the Kerakoll tile adhesives and grouts line.

  Original copy, 100 to 150 words per product, written from the specs and the
  product type Kerakoll states on each record. Not manufacturer marketing, and
  nothing stated that is not supported by the source data. Garbled coverage
  figures in the harvest are left out rather than repeated.

  Also corrects a handful of categories where the automatic classifier placed a
  detergent, a sealant or an additive in the tiling buckets.

  Six accessory records are deliberately left alone: fuga-remove, spacers,
  sponges, spreader-for-grouting, spreaders-for-laying-ceramic-tiles and
  spreaders-for-hardwood-floors-and-resilient-materials-laying. Their source
  data is a single noun phrase, and 100 words about a PVC spacer would be
  invention rather than description.

  Usage: npx tsx scripts/apply-content-kerakoll-tiling.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

interface Entry {
  description: string;
  meta_description: string;
  applications: string[];
  category?: TdsCategory;
}

const content: Record<string, Entry> = {
  'delta-plus': {
    description:
      'Delta Plus is a water based acid detergent for the residues that spoil a finished tile floor: cement and lime films left after grouting, plus the salt and calcareous deposits that appear where hard water has been used. Being acidic, it works by dissolving those mineral films rather than lifting them mechanically, so the choice turns on the tile and the grout. Acid sensitive surfaces such as polished marble and other calcareous stones react to it, and a cement based joint can be attacked if the detergent is left to dwell. Test a small hidden area first and rinse thoroughly. Supplied in 1 kg cans with a stated shelf life of 12 months. On UAE sites the calcareous bloom this product targets is common wherever mains or well water has been used for washing down.',
    meta_description:
      'Delta Plus TDS: water based acid detergent that removes cement and lime film, salt and calcareous deposits from tiling. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Removing cement film after grouting',
      'Lifting lime residues from tiles',
      'Clearing salt deposits',
      'Treating calcareous bloom',
      'Pre handover tile clean down',
    ],
    category: 'surface_treatment',
  },
  epofill: {
    description:
      'A hyperfluid epoxy injection system, Epofill is made to travel into cracks in concrete and fill them, and it is also used for grouting on concrete. Its CE marking is to EN 1504-5, the European standard for concrete injection products, which tells a specifier it has been tested as a crack filling resin rather than sold on description alone. Hyperfluid matters because a resin that will not flow leaves voids behind, and a partly filled crack restores nothing. Pot life is stated as 80 minutes, so a batch has to be placed inside that window. Supplied in a 0.66 kg bucket with a 12 month shelf life. In UAE conditions the stated pot life shortens as material and ambient temperatures rise, so mix small quantities and keep the unmixed components out of direct sun.',
    meta_description:
      'Epofill TDS: hyperfluid epoxy injection system to EN 1504-5 for filling cracks and grouting on concrete, 80 minute pot life. Sheet available from Lapiz Blue UAE.',
    applications: [
      'Injection of cracks in concrete',
      'Grouting on concrete',
      'Concrete repair to EN 1504-5',
      'Filling fine cracks before overlay',
    ],
    category: 'repair_mortar',
  },
  'fuga-shock': {
    description:
      'Fuga-Shock is a ready to use cleaner for a narrow and awkward job: taking cured residues and streaks of epoxy resin off a tiled surface after grouting. Epoxy haze is nothing like cement film. It does not dissolve in water or answer to an acid wash, so without a product formulated for it the only options left are abrasive and risk marking the tile. Ready to use means there is no dilution to judge, which helps because the window for easy removal closes as the resin hardens. Shelf life is stated as 24 months. The practical point is timing. Clean epoxy grout residue as the work proceeds, bay by bay, and keep this on site for the streaks found afterwards rather than relying on it to rescue a whole floor.',
    meta_description:
      'Fuga-Shock TDS: ready to use cleaner that removes cured epoxy resin residues and streaks from tiled surfaces after grouting. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Removing epoxy resin residues',
      'Clearing epoxy streaks from tiles',
      'Clean down after epoxy grouting',
      'Spot cleaning hardened resin haze',
    ],
    category: 'surface_treatment',
  },
  'fuga-soap': {
    description:
      'Where a Fugalite resin grout has been used, Fuga-Soap is the detergent formulated to take the streaks off afterwards. Resin grouts leave a thin film across the tile face as they are worked into the joint, and that film sets along with the grout. A general purpose floor cleaner will not shift it, which is why Kerakoll supplies a matched detergent for its own system rather than leaving the choice open. Because it is specific to Fugalite residue, it is the wrong product for cement grout haze, which calls for an acid detergent instead. Shelf life is stated as 24 months. On site the sequence decides the result: wash the tile face while the grout is still fresh, then use this to deal with whatever streaking is left.',
    meta_description:
      'Fuga-Soap TDS: detergent formulated to remove Fugalite resin grout streaks from tile and mosaic faces after grouting. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Removing Fugalite streaks',
      'Clean down after resin grouting',
      'Tile face cleaning on mosaic work',
      'Finishing clean before handover',
    ],
    category: 'surface_treatment',
  },
  'fuga-wash': {
    description:
      'Fuga-Wash is an additive rather than a cleaner in its own right. It goes into the water used to clean Fugalite grout during application, so the wash itself carries something that holds resin residue in suspension instead of smearing it back across the tile. That makes it a product for the grouting operation, not the clean down afterwards: the aim is to avoid leaving a film at all rather than to remove one later. Shelf life is stated as 24 months. Judge the need by the tile face. A textured or lightly polished porcelain holds resin residue in a way a glazed ceramic does not, and that is where washing water with this additive earns its place. Keep the matched detergents on site for anything the wash leaves behind.',
    meta_description:
      'Fuga-Wash TDS: detergent additive for the water used to clean Fugalite resin grout during application, keeping tile faces film free. From Lapiz Blue UAE.',
    applications: [
      'Additive for Fugalite cleaning water',
      'Washing down during resin grouting',
      'Reducing resin film on tile faces',
      'Grouting glass mosaic and porcelain',
    ],
    category: 'surface_treatment',
  },
  'fugabella-color': {
    description:
      'Fugabella Color is a resin and cement grout for ceramic tiles, mosaics and natural stone, classified CG2 WA. The CG2 part marks it as an improved cementitious grout rather than a basic one, and WA is the designation that matters most in a wet area: reduced water absorption, which is why the joint holds its colour instead of darkening and staining. Kerakoll describes it as easy to work with a high aesthetic finish, and the resin content is what delivers that, a denser and smoother joint than plain cement gives. Supplied in 3 kg bags with a 24 month shelf life, so colour consistency across a large floor is a matter of ordering enough of one batch. On a long UAE tiling programme, order the grout with the tile rather than after it.',
    meta_description:
      'Fugabella Color TDS: CG2 WA decorative resin cement grout for ceramic tiles, mosaics and natural stone in wet areas. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Grouting ceramic tiles',
      'Grouting glass and ceramic mosaics',
      'Grouting natural stone',
      'Joints in wet areas',
      'Decorative coloured joints',
    ],
  },
  fugaflex: {
    description:
      'Fugaflex is not a grout. It is a water based flexibilising agent added to mineral grouts, replacing some or all of the mixing water so the hardened joint can take a degree of movement instead of cracking at the first sign of it. That makes it the answer to a specific problem: a cement grout specified for a floor that moves more than cement will tolerate, such as a large format bay, a heated screed or a substrate still settling. Rather than changing the grout, the mix is upgraded. Supplied in 1 kg cans with a 12 month shelf life. Two cautions apply on site. Follow the stated dosage, because more is not better with a polymer, and keep the dosage identical in every batch or the joint colour will vary bay by bay.',
    meta_description:
      'Fugaflex TDS: water based flexibilising agent that upgrades mineral grouts for substrates subject to movement. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Flexibilising mineral grouts',
      'Grouting over heated screeds',
      'Grouting large format tiling',
      'Joints on substrates subject to movement',
    ],
    category: 'bonding_agent',
  },
  'fugalite-color': {
    description:
      'Fugalite Color is a waterproof decorative resin that both grouts and bonds tiles, mosaics and natural stone, classified RG, the designation for a reaction resin grout. That classification is the buying decision in itself: a resin joint is non porous, so it cleans easily and resists staining in a way a cement joint cannot, and it is specified where the finish is scrutinised or the area is permanently wet. It fills joints from 0 up to 10 mm, and the same material can bed the tile, which simplifies a mosaic installation. Pot life is stated as 45 minutes and shelf life as 24 months. The 45 minutes is the figure to plan around on a hot UAE site. Mix small, work a limited area, and clean the tile face as you go.',
    meta_description:
      'Fugalite Color TDS: RG waterproof decorative resin for grouting and bonding tiles, mosaics and stone, joints 0 to 10 mm. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Grouting tiles and mosaics',
      'Grouting natural stone',
      'Bonding mosaic and tile',
      'Joints from 0 to 10 mm',
      'Stain resistant joints in wet areas',
    ],
    category: 'epoxy_grout',
  },
  'fugalite-invisibile': {
    description:
      'Glass mosaic and very thin ceramic set a problem no ordinary grout solves: the joint is visible through the tile, so its colour changes the look of the finished surface. Fugalite Invisibile answers that with a waterproof photochromatic decorative resin that grouts and bonds glass mosaic and low thickness ceramic, made to keep the surface reading as one continuous material rather than a grid of joints. It is a resin system, so the joint is non porous and suits permanently wet areas such as pool and feature walls. Pot life is stated as 45 minutes and shelf life as 24 months. Because this product is chosen for appearance, build a small sample panel with the actual mosaic and have it signed off before the main area starts.',
    meta_description:
      'Fugalite Invisibile TDS: waterproof photochromatic resin for grouting and bonding glass mosaic and thin ceramic tiles. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Grouting glass mosaic',
      'Grouting low thickness ceramic',
      'Bonding glass mosaic',
      'Swimming pool and feature walls',
      'Joints where colour continuity matters',
    ],
    category: 'epoxy_grout',
  },
  'geolite-gel': {
    description:
      'Geolite Gel is a thixotropic adhesive for structural bonding and grouting, CE marked to EN 1504-4. That standard covers structural bonding for concrete, so this is a load bearing adhesive rather than a tiling product, used where a new element has to be bonded to existing concrete and the joint is expected to carry force. Thixotropic means it holds its shape once applied, which is what allows work on a vertical face or a soffit without the material slumping out of the joint. Pot life is stated as 100 minutes, the pack is a 5 kg bucket and shelf life is 12 months. Keep both components shaded before mixing. Pot life figures are quoted at laboratory temperature, and a resin mixed in UAE summer heat stiffens well before the stated time is up.',
    meta_description:
      'Geolite Gel TDS: thixotropic structural bonding and grouting adhesive to EN 1504-4, 100 minute pot life, 5 kg bucket. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Structural bonding to concrete',
      'Grouting on concrete',
      'Vertical and overhead bonding',
      'Concrete repair to EN 1504-4',
    ],
    category: 'bonding_agent',
  },
  'h40-advanced': {
    description:
      'H40 Advanced is the fast setting member of the H40 gel adhesive range, classified C2F: improved adhesion with rapid setting. The F is the reason to choose it, because it allows grouting and foot traffic sooner than a standard adhesive, which matters when a tiling bay sits on the critical path. Kerakoll describes it as structural, highly flexible and both thixotropic and fluid, suitable for all types and sizes of porcelain, ceramic and natural stone, and it replaces Biogel Revolution in the current range. Coverage is stated at 1 to 1.2 kg per square metre and pot life at 40 minutes, with a 12 month shelf life. Treat the 40 minutes as a planning limit. Mix only what the gang can lay inside it, and expect less in UAE summer conditions.',
    meta_description:
      'H40 Advanced TDS: C2F rapid setting gel adhesive for porcelain, ceramic and natural stone of all sizes, 40 minute pot life. Sheet available from Lapiz Blue UAE.',
    applications: [
      'Laying porcelain tiles',
      'Laying ceramic tiles',
      'Laying natural stone',
      'Large format tile work',
      'Fast track tiling programmes',
    ],
  },
  'h40-extreme': {
    description:
      'Of the H40 gel adhesives, Extreme is the one built around working time. Kerakoll states a pot life of 110 minutes and an open time of 180 minutes, an unusually long window and the reason to specify it: a large format slab can still be adjusted well after placing, and a spread bed does not skin over before the tiler reaches the end of it. It is described as a hybrid, structural, multipurpose, extra flexible and extra workable gel adhesive for all types and sizes of porcelain, ceramic and natural stone, and it replaces Biogel Extreme. Shelf life is 24 months. The long open time is worth paying for on UAE sites in particular, where heat and air movement cut the practical life of a standard bed to a fraction of its stated figure.',
    meta_description:
      'H40 Extreme TDS: hybrid extra flexible gel adhesive with 110 minute pot life and 180 minute open time for large format tiling. Sheet from Lapiz Blue UAE.',
    applications: [
      'Large format porcelain slabs',
      'Laying ceramic tiles',
      'Laying natural stone',
      'Tiling in hot conditions',
      'Work needing a long open time',
    ],
  },
  'h40-gel': {
    description:
      'H40 Gel is the general purpose adhesive in the H40 range, classified C2 TE S1. Every letter earns its place. C2 is improved adhesion, which porcelain needs because it absorbs almost nothing, T is no vertical slip so wall tiles hold position, E is extended open time, and S1 is deformability, meaning the bed absorbs the movement a large tile transmits instead of passing it into the joint. Kerakoll describes it as structural, highly flexible and both thixotropic and fluid, for all types and sizes of porcelain, ceramic and natural stone, and it replaces Biogel No Limits. Supplied in 25 kg bags with a pot life of 6 hours, an open time of 60 minutes and a 12 month shelf life. Pot life is the bucket. Open time is the shorter and more critical figure.',
    meta_description:
      'H40 Gel TDS: C2 TE S1 deformable gel adhesive for porcelain, ceramic and natural stone, 25 kg bags, 60 minute open time. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Laying porcelain of all sizes',
      'Laying ceramic tiles',
      'Laying natural stone',
      'Wall tiling with no vertical slip',
      'Substrates with slight movement',
    ],
  },
  'h40-icon': {
    description:
      'H40 Icon sits a step below the deformable grades, classified C2 TE. It gives the improved adhesion porcelain requires, resistance to vertical slip for wall work, and extended open time, but without the S1 or S2 deformability rating the other H40 products carry. That makes it the right choice on a sound, stable substrate and the wrong one over a heated screed or where the slab is still moving. Kerakoll describes it as a multipurpose, structural, flexible gel adhesive, thixotropic and fluid, for all types and sizes of porcelain, ceramic and natural stone. Supplied in 25 kg bags with a pot life of 4 hours, an open time of 60 minutes and a 12 month shelf life. Specify by substrate first. Where there is movement to absorb, move up the range rather than relying on C2 grip alone.',
    meta_description:
      'H40 Icon TDS: C2 TE flexible gel adhesive for porcelain, ceramic and natural stone on stable substrates, 25 kg bags. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Laying porcelain tiles',
      'Laying ceramic tiles',
      'Laying natural stone',
      'Wall tiling on stable substrates',
      'General floor tiling',
    ],
  },
  'h40-tech': {
    description:
      'H40 Tech carries the highest deformability in the range, classified C2 TE S2. S2 is the specification that separates it from a standard C2 adhesive: the hardened bed accommodates substrate movement that would crack a rigid one, which is why an S2 grade is called for over heated screeds, on tile over tile work and under large heavy slabs on external elevations. Kerakoll describes it as a multipurpose, ultra flexible, structural gel adhesive, thixotropic and fluid, and the T and E in the code mean no vertical slip and extended open time. Supplied in 20 kg bags with a pot life of 5 hours and a 12 month shelf life. Note the bag size, because it differs from the 25 kg bags used elsewhere in the H40 range and changes how a bulk order is calculated.',
    meta_description:
      'H40 Tech TDS: C2 TE S2 ultra flexible gel adhesive for heated screeds, tile over tile and large format slabs. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Tiling over heated screeds',
      'Tile over tile work',
      'Large format heavy slabs',
      'External elevations',
      'Laying porcelain and natural stone',
    ],
  },
  joint: {
    description:
      'Joint is neither an adhesive nor a grout but the compressible layer that goes into a movement joint before it is sealed. It is made of closed cell expanded polyethylene, free of CFCs and HCFCs, and is supplied in different degrees of expansion so it serves both as static filling and in joints that have to move. Closed cell is the important property, because the material does not take up water, so it keeps working in a wet area and does not hold moisture against the sealant. Its other job is to control sealant depth, which is what lets a sealed joint stretch properly instead of splitting. On a UAE terrace or facade the movement joints are where tiling fails first, so size and place these before tiling starts rather than filling the gap afterwards.',
    meta_description:
      'Joint TDS: closed cell expanded polyethylene sub joint layer for static filling and dynamic movement joints in tiling. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Backing static filling joints',
      'Backing dynamic movement joints',
      'Controlling sealant depth',
      'Perimeter joints in wet areas',
      'Terrace and facade movement joints',
    ],
    category: 'sealant',
  },
  'neutro-color': {
    description:
      'Neutro Color is a decorative sealant intended for marble and natural stone. The distinction matters, because marble and other calcareous stones can be stained at the edge of a joint by the wrong sealant, which bleeds oils into the stone and leaves a dark halo that will not clean off. A sealant formulated for stone avoids that, and the colour range lets a movement joint read as part of the finish rather than a line through it. Supplied in 310 ml cartridges with an 18 month shelf life, shorter than the silicone products in the same range, so order to the quantity actually needed. Use it on the joints a stone floor needs, at perimeters, at changes of plane and over structural movement joints, and keep grout for everything in between.',
    meta_description:
      'Neutro Color TDS: decorative sealant formulated for marble and natural stone joints without edge staining, 310 ml cartridges. Sheet from Lapiz Blue UAE.',
    applications: [
      'Sealing joints in marble',
      'Sealing joints in natural stone',
      'Perimeter and corner joints',
      'Changes of plane in stone floors',
      'Movement joints in stone finishes',
    ],
    category: 'sealant',
  },
  'pragma-easy': {
    description:
      'Pragma Easy is the entry point of the Pragma mineral adhesives, classified C1 E. C1 marks normal rather than improved adhesion, which suits absorbent ceramic tiles that draw water from the bed as the bond forms, and makes it the economical answer for standard ceramic work. It is the wrong choice under porcelain, which absorbs almost nothing and needs a C2 grade. The E is extended open time, stated at 30 minutes, and that is the practical benefit on a large floor where a standard adhesive skins over before the tiler gets back to it. Supplied in 25 kg bags with a pot life of 4 hours and a 12 month shelf life. Store the bags off the floor and away from humidity, because a mineral adhesive that has taken up moisture will not reach its stated strength.',
    meta_description:
      'Pragma Easy TDS: C1 E mineral tile adhesive with high adhesion and 30 minute open time for ceramic tiling, 25 kg bags. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Laying absorbent ceramic tiles',
      'Internal wall tiling',
      'Internal floor tiling',
      'Large floors needing extended open time',
    ],
  },
  'pragma-flex': {
    description:
      'Among the Pragma mineral adhesives, Flex is the high performance grade, classified C2 TE and rated by Kerakoll for porcelain tiles, ceramic tiles and natural stone. The C2 gives the improved adhesion porcelain needs, since a tile that absorbs almost no water cannot bond by suction, the T means no vertical slip so wall tiles stay where they are set, and the E extends open time to a stated 30 minutes. Coverage is given as 1.25 kg per square metre, pot life as 4 hours and shelf life as 12 months, in 25 kg bags. Note what the code does not include. There is no S1 or S2 deformability rating here, so for a heated screed or a moving substrate specify a deformable adhesive from the H40 or Biogel ranges instead.',
    meta_description:
      'Pragma Flex TDS: C2 TE mineral adhesive with no vertical slip and 30 minute open time for porcelain, ceramic and stone. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Laying porcelain tiles',
      'Laying ceramic tiles',
      'Laying natural stone',
      'Wall tiling with no vertical slip',
      'Floors on stable substrates',
    ],
  },
  'pragma-special': {
    description:
      'Pragma Special is a C2 TE mineral adhesive that Kerakoll positions for laying ceramic tiles, with high adhesion, no vertical slip and a long open time. Stated at 30 minutes of open time and a 4 hour pot life, it gives a tiler room to spread ahead of the gang and still adjust tiles afterwards, which is where most of the lost time on a ceramic floor goes. Coverage is given as 1.25 kg per square metre and it is supplied in 25 kg bags with a 12 month shelf life. The C2 rating means it is not limited to absorbent tiles the way a C1 adhesive is. Where the schedule also includes porcelain or natural stone, Pragma Flex is the grade Kerakoll rates for those, so read the tile schedule before settling on one adhesive.',
    meta_description:
      'Pragma Special TDS: C2 TE mineral tile adhesive with high adhesion, no vertical slip and long open time for ceramic tiling. Sheet available from Lapiz Blue UAE.',
    applications: [
      'Laying ceramic tiles',
      'Wall tiling with no vertical slip',
      'Large internal floors',
      'Work needing a long open time',
    ],
  },
  refresher: {
    description:
      'Refresher is a maintenance product rather than an installation one, a nourishing wax for continuous floors, meaning seamless surfaces such as resin and cement based finishes that have no joints to hide wear. Those floors lose their appearance gradually across the whole surface, and a wax restores the sheen and gives the finish something to take the abrasion instead of the floor itself. Treat it as part of a cleaning regime, applied periodically to a surface that is already clean and dry, not as a repair for a floor that has been damaged. Shelf life is stated as 12 months. On a UAE project, agree the maintenance regime with the client before handover, because a continuous floor cleaned with the wrong products for a year will look worse than the tiling next to it.',
    meta_description:
      'Refresher TDS: nourishing wax for the routine maintenance of continuous resin and cement floors, restoring sheen. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Maintaining continuous floors',
      'Restoring sheen on resin floors',
      'Periodic floor care',
      'Post handover maintenance regimes',
    ],
    category: 'surface_treatment',
  },
  silicone: {
    description:
      'Silicone is the transparent sealant in the Kerakoll tiling range, for joints in tile and mosaic work where the sealant should not be seen. Transparent is the honest choice in two situations: against a glass mosaic, where any coloured line reads as a flaw, and on a veined or multicoloured tile that no single sealant colour will match. It is supplied in 310 ml cartridges with a 24 month shelf life. The practical point is where sealant belongs. Perimeters, internal corners, changes of plane and movement joints all need a flexible sealant rather than grout, because that is where the tiling has to move. Cut those joints into the setting out at the start. Grouting them solid and sealing over afterwards is what produces the cracked line along a shower wall.',
    meta_description:
      'Silicone TDS: transparent sealant for tile and mosaic joints where the joint should stay invisible, 310 ml cartridges. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Sealing joints in tile work',
      'Sealing joints in mosaic',
      'Perimeter and corner joints',
      'Glass mosaic joints',
      'Movement joints in wet areas',
    ],
    category: 'sealant',
  },
  'silicone-color': {
    description:
      'Silicone Color is the coloured version of the sealant, offered for ceramics, mosaics and swimming pools. The pool rating is the part worth noting, because a sealant in a pool is permanently immersed and under attack from the water treatment, a harder service than a bathroom joint. Matching the sealant to the grout colour is the point of the range, since the flexible joints at perimeters and internal corners then read as part of the grout pattern instead of a stripe through it. Supplied in 310 ml cartridges with a 24 month shelf life. Order the sealant and the grout together and against the same colour reference. Matching a cartridge to grout already on the wall, on a site where it has dried lighter than the sample, is a job nobody wins.',
    meta_description:
      'Silicone Color TDS: decorative coloured sealant for ceramics, mosaics and swimming pool joints, 310 ml cartridges. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Sealing joints in ceramics',
      'Sealing joints in mosaic',
      'Swimming pool joints',
      'Colour matched perimeter joints',
      'Internal corners in wet areas',
    ],
    category: 'sealant',
  },
  'silmat-color': {
    description:
      'Silmat Color is an elastic decorative sealant with an ultra matt finish, which is a deliberate choice rather than a detail. A standard silicone cures to a slight sheen, and on matt porcelain, honed stone or a microcement wall that sheen catches the light and draws the eye to exactly the line you wanted to disappear. A matt sealant does not. It stays elastic, so it still does the work a sealed joint has to do, taking the movement that would crack a grouted one. Supplied in 290 ml cartridges, a different size from the 310 ml silicones in the range, with a 24 month shelf life. Specify it wherever the tile or wall finish is matt, and check it against the actual material, because matt levels vary from one finish to another.',
    meta_description:
      'Silmat Color TDS: ultra matt elastic decorative sealant for joints alongside matt tile, honed stone and microcement, 290 ml. Sheet from Lapiz Blue UAE.',
    applications: [
      'Sealing joints in matt finishes',
      'Perimeter and corner joints',
      'Movement joints in tiling',
      'Joints alongside honed stone',
      'Decorative colour matched joints',
    ],
    category: 'sealant',
  },
  supersoap: {
    description:
      'Supersoap is a neutral detergent for the routine cleaning and care of all types of floor, scented with lavender extract. Neutral is the specification that matters. A pH neutral cleaner will not etch a calcareous stone the way an acid product can, and will not dull a polished surface or strip a sealer the way an alkaline degreaser does, which is what makes it usable in a building whose floors are a mixture of porcelain, stone and resin. It is a maintenance product, so it belongs in the handover pack rather than the installation schedule. Shelf life is stated as 12 months. The practical step on a UAE job is to hand the client a named cleaner, because most damage to a new floor in its first year comes from a cleaning contractor using whatever was cheapest.',
    meta_description:
      'Supersoap TDS: pH neutral lavender scented detergent for the routine cleaning and care of every floor type. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Routine cleaning of tiled floors',
      'Care of natural stone floors',
      'Maintenance of continuous floors',
      'Post handover floor cleaning',
      'Daily cleaning in occupied buildings',
    ],
    category: 'surface_treatment',
  },
  'top-latex': {
    description:
      'Top Latex is an additive, not an adhesive. It is a water based elastic agent mixed into normal and rapid setting mineral adhesives, and the classification quoted against it, C2 E S2, is what the adhesive and the latex achieve together as a system rather than a property of the latex on its own. That upgrade is the reason to use it. S2 deformability means the bed absorbs substrate movement that would crack a rigid one, so a standard adhesive already on site can be brought up to the grade a heated screed or a large format slab demands. Supplied in a 25 kg pack with a 12 month shelf life. Dose it exactly as stated and keep the dose identical in every batch, because a bed mixed at varying latex content will not behave consistently across a floor.',
    meta_description:
      'Top Latex TDS: water based elastic agent that upgrades mineral tile adhesives to C2 E S2 deformability on site. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Upgrading mineral adhesives',
      'Tiling over heated screeds',
      'Large format tile beds',
      'Rapid setting adhesive mixes',
      'Substrates subject to movement',
    ],
    category: 'bonding_agent',
  },
  'biogel-extreme': {
    description:
      'Biogel Extreme is the long working time grade of the Biogel gel adhesives, a hybrid product Kerakoll describes as highly deformable and workable and as tested under the most extreme working conditions. The figures justify the name: a pot life of 110 minutes and an open time of 180 minutes, with coverage of 1.45 kg per square metre and a 24 month shelf life. Open time is the figure that governs a large format job, because it sets how long a spread bed stays able to wet the back of a tile. Deformability matters for the same tiles, since a large slab moves more than a small one. In the current Kerakoll range H40 Extreme is the replacement for this product, so check availability before specifying it by name.',
    meta_description:
      'Biogel Extreme TDS: hybrid highly deformable gel adhesive, 110 minute pot life and 180 minute open time for large format tiling. Sheet from Lapiz Blue UAE.',
    applications: [
      'Large format tile and slab work',
      'Laying porcelain and ceramic',
      'Laying natural stone',
      'Tiling in hot conditions',
      'Work needing a long open time',
    ],
  },
  'biogel-no-limits': {
    description:
      'Classified C2 TE S1, Biogel No Limits is the flexible multipurpose adhesive in the Biogel range, built on the Kerakoll geo-binder and rated by them for bonding all types of material on all substrates. The S1 rating is the one to read, because the hardened bed is deformable and takes up movement a rigid adhesive would pass straight into the tile, while C2 gives the adhesion porcelain needs, T prevents vertical slip and E extends the open time, stated at 30 minutes. Coverage is 1.25 kg per square metre, pot life 4 hours and shelf life 12 months. H40 Gel is the current range equivalent, so confirm what is actually in stock before writing this name into a specification. Both carry the same classification, which makes a substitution easy to justify.',
    meta_description:
      'Biogel No Limits TDS: C2 TE S1 structural flexible gel adhesive for all tile types and substrates, 30 minute open time. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Laying porcelain tiles',
      'Laying ceramic tiles',
      'Laying natural stone',
      'Mixed substrate tiling',
      'Substrates with slight movement',
    ],
  },
  'biogel-ready': {
    description:
      'Unlike the rest of the Biogel range, Ready arrives mixed. It is a ready to use gel adhesive for high adhesion and high deformation laying with no vertical slip, so there is no water ratio to get wrong and no mixed bucket going off while the gang works elsewhere. That suits small areas, repairs and occupied buildings where mixing powder is a nuisance. Coverage is stated at 1.6 kg per square metre, higher than the powder adhesives in the range, and open time at 30 minutes, with a 24 month shelf life. Two things follow on site. Allow for the higher coverage figure when ordering, and keep the tub closed between uses, because a ready mixed adhesive skins over in the pail in UAE heat as readily as on the wall.',
    meta_description:
      'Biogel Ready TDS: ready to use gel adhesive for high adhesion, high deformation laying with no vertical slip. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Small area tiling',
      'Tile repairs and making good',
      'Wall tiling with no slip',
      'Work in occupied buildings',
      'Jobs where mixing is impractical',
    ],
  },
  'biogel-revolution': {
    description:
      'Biogel Revolution is the rapid setting grade of the range, classified C2F, meaning improved adhesion with fast setting. That is a programme decision more than a technical one, since an adhesive that sets quickly lets grouting and foot traffic follow the same day instead of the next, which is worth having when tiling holds up the trades behind it. Kerakoll describes it as a multi-purpose flexible structural gel adhesive with longer workability and accelerated adhesion, for all types of material on any substrate. Coverage is 1.25 kg per square metre, pot life 40 minutes and shelf life 12 months. The 40 minute pot life is the discipline this product demands, and it is shorter again in UAE summer heat. H40 Advanced replaces it in the current range.',
    meta_description:
      'Biogel Revolution TDS: C2F flexible structural gel adhesive with accelerated adhesion for same day grouting. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Fast track tiling programmes',
      'Laying porcelain and ceramic',
      'Laying natural stone',
      'Same day grouting',
      'Mixed substrate tiling',
    ],
  },
  'rasobuild-eco-stucco-rp': {
    description:
      'Rasobuild Eco Stucco RP is a finishing product, a mineral and organic grout used to close up and smooth a surface rather than to fill tile joints. Kerakoll describes the result as highly flexible with an ultra smooth final finish, and flexibility is what keeps a thin skim from crazing over a substrate that moves slightly. It is supplied in 1 kg buckets with a 12 month shelf life, a pack size that tells you the intended use: making good, filling and finishing localised areas rather than skimming a whole elevation. The eco-friendly label is Kerakoll\'s own designation, so ask for the current documentation if a project needs it toward a green building credit. Work it in thin passes, because a flexible filler applied too thick in UAE heat skins while the body below is still soft.',
    meta_description:
      'Rasobuild Eco Stucco RP TDS: eco-friendly mineral organic grout for a flexible, ultra smooth finish on localised making good. Sheet from Lapiz Blue UAE.',
    applications: [
      'Smoothing and finishing surfaces',
      'Making good localised areas',
      'Filling before decoration',
      'Flexible skim over slight movement',
    ],
    category: 'plaster',
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
    if (/[–—]/.test(entry.description + entry.meta_description)) warnings.push(`${slug}: contains an em or en dash`);

    rec.description = entry.description;
    rec.meta_description = entry.meta_description;
    rec.applications = entry.applications;
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

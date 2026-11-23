/*
  Build the FILA product records and merge them into data/manifest.json.

  FILA shipped two line pages and no product pages, while every other brand on
  the site has a page per product. The 34 products transcribed from the FILA
  Easy Guide 2023 into src/data/fila-products.json are the source of every
  figure here: the purpose, the surfaces, the printed dilutions, the printed
  coverage and the pack sizes. Nothing is inferred. Where the guide prints no
  dilution or no coverage, the record says so rather than carrying a number
  from somewhere else.

  FILA gates its technical data sheets, so every record ships as
  documents_pending: the page carries the request for the sheet instead of a
  download, which is the same state 62 Kerakoll and Mapei records already use.
  Registering a PDF later moves a record to verified with no change to the
  page.

  Idempotent: every record with brand "fila" is dropped and rebuilt, so the
  script can be run again after an edit to the copy or the source JSON.

  Usage: node scripts/fila-manifest.mjs [--dry]
*/
import fs from 'node:fs';
import path from 'node:path';

const REPO = process.cwd();
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');
const SOURCE_PATH = path.join(REPO, 'src', 'data', 'fila-products.json');
const PUBLIC_DIR = path.join(REPO, 'public');
const TODAY = '2026-11-23';
const dry = process.argv.includes('--dry');

/* The name as FILA writes it, minus the FILA prefix the guide drops too.
   Codes keep their printed case; words are set in the same title case the
   rest of the manifest uses. */
const NAMES = {
  'cleaner-pro': 'Cleaner Pro',
  cr10: 'CR10',
  'deterdek-pro': 'Deterdek Pro',
  'instant-remover': 'Instant Remover',
  max: 'Max',
  norust: 'Norust',
  nospot: 'Nospot',
  phzero: 'PHZero',
  'ps87-pro': 'PS87 Pro',
  sr95: 'SR95',
  zerosil: 'Zerosil',
  'concrete-shield': 'Concrete Shield',
  'concrete-hydro': 'Concrete Hydro',
  'contractors-choice': "Contractor's Choice",
  'fob-xtreme': 'FOB Xtreme',
  hydrorep: 'Hydrorep',
  'hydrorep-eco': 'Hydrorep Eco',
  mp90: 'MP90',
  'mp90-eco-xtreme': 'MP90 Eco Xtreme',
  pw10: 'PW10',
  stoneplus: 'Stoneplus',
  'stoneplus-eco': 'Stoneplus Eco',
  'stop-dirt': 'Stop Dirt',
  w68: 'W68',
  'wet-eco': 'Wet Eco',
  classic: 'Classic',
  longlife: 'Longlife',
  'clean-and-shine': 'Clean&Shine',
  deepclean: 'Deepclean',
  fuganet: 'Fuganet',
  'marble-refresh': 'Marble Refresh',
  nodrops: 'Nodrops',
  rapidsan: 'Rapidsan',
  fugaproof: 'Fugaproof',
};

/* The middle clause of the meta description. The name goes in front of it and
   the Dubai, Abu Dhabi and Sharjah tail behind it, which is the pattern every
   other product page on the site already follows. */
const META = {
  'cleaner-pro': 'neutral maintenance detergent for mixed floors',
  cr10: 'cleaner for epoxy grout residue on porcelain and glass mosaic',
  'deterdek-pro': 'end of work acid wash for porcelain and terracotta',
  'instant-remover': 'spray that removes fresh cement grout haze',
  max: 'solvent based wax remover for terracotta and concrete floors',
  norust: 'rust stain remover for marble, granite and porcelain',
  nospot: 'spray stain remover for terracotta and natural stone',
  phzero: 'strong acid descaler for terracotta and porcelain tiles',
  'ps87-pro': 'professional degreasing cleaner for stone and concrete',
  sr95: 'stain remover for porcelain, stone and concrete floors',
  zerosil: 'silicone remover for porcelain, marble, glass and metal',
  'concrete-shield': 'colour enhancing stain proof sealer for concrete',
  'concrete-hydro': 'consolidating water repellent for concrete and brick',
  'contractors-choice': 'sealer for concrete, pavers and grout joints',
  'fob-xtreme': 'extreme water and oil repellent for stone and concrete',
  hydrorep: 'water repellent for unpolished stone and concrete',
  'hydrorep-eco': 'eco water repellent for stone, brick and terracotta',
  mp90: 'water and oil repellent for polished porcelain and marble',
  'mp90-eco-xtreme': 'eco stain protector for polished porcelain and stone',
  pw10: 'pre laying treatment against efflorescence on stone',
  stoneplus: 'water and oil repellent that revives natural stone',
  'stoneplus-eco': 'colour enhancing protector for stone and marble',
  'stop-dirt': 'dirt repellent for textured and lappato porcelain tiles',
  w68: 'stain protector for unpolished stone, terracotta and concrete',
  'wet-eco': 'wet look colour enhancer for stone and terracotta',
  classic: 'eco friendly liquid wax for marble, stone and terracotta',
  longlife: 'glossy protective wax for terracotta and resilient floors',
  'clean-and-shine': 'ready to use spray cleaner for tile, glass and steel',
  deepclean: 'descaling spray for porcelain, glass, taps and chrome',
  fuganet: 'grout cleaning spray for every type of grout joint',
  'marble-refresh': 'polishing spray that renews marble and quartz tops',
  nodrops: 'water mark protection for shower glass and mirrors',
  rapidsan: 'eco disinfectant spray for every surface in the home',
  fugaproof: 'grout protector spray for every type of grout joint',
};

/* The page copy. Written by hand per product, in the house voice, from the
   guide and nothing else: the surfaces it is listed for, what it does, the
   printed dilution and the printed coverage with the surface each applies
   to, the pack sizes, and the fact that the sheet travels with the quote.
   check-manifest holds every description to 100 to 150 words. */
const DESC = {
  'cleaner-pro': `Cleaner Pro is FILA's neutral maintenance detergent, the one concentrate that covers a mixed floor. The Easy Guide lists it for porcelain and ceramic tiles, concrete, wood, marble, granite and natural stone, plastic laminates and LVT, linoleum, rubber and PVC, terracotta and quarry tiles, which is most of what a hotel or a mall corridor is laid with. Two dilutions are printed. Routine maintenance runs at 1:200 and reaches about 1500 square metres per litre of concentrate. The first wash of a stone floor runs stronger, at 1:30, and reaches about 50 square metres per litre. Supplied in 1 litre bottles in boxes of 12 and 5 litre cans in boxes of 4. The FILA data sheet travels with the quotation.`,

  cr10: `CR10 is the cleaner FILA publishes for epoxy residues, the film an epoxy grout leaves behind when it has gone off harder than the washing allowed for. The Easy Guide lists it for porcelain tiles, glazed ceramic tiles, glass mosaic and polished quarry tiles, so it belongs to the finishing trades rather than the cleaning cupboard. No dilution is printed, and coverage on all of those surfaces is about 10 square metres per litre, which tells you this is a remedial product used on a defined area and not a floor wash. Supplied in 1 litre bottles in boxes of 12. On a UAE site epoxy grout sets faster than the programme assumes, so keep a bottle on hand before grouting starts. The FILA data sheet travels with the quotation.`,

  'deterdek-pro': `Deterdek Pro is FILA's end of work wash, the clean that takes cement haze and site dirt off a new floor without etching it. The Easy Guide lists it for porcelain tiles, glazed ceramic tiles, acid resistant materials, terracotta and quarry tiles. Dilution depends on what is underfoot: 1:5 on terracotta, 1:5 to 1:10 on porcelain tiles, and 1:5 to 1:10 on natural stone. Coverage follows the same split, about 10 to 20 square metres per litre on terracotta, 40 to 80 on porcelain tiles and 20 to 35 on natural stone. Supplied in 1 litre bottles in boxes of 12 and 5 litre cans in boxes of 4. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,

  'instant-remover': `Instant Remover is the spray FILA publishes for grout residue that is still fresh, including grouts carrying additives that are harder to wash off once they have set. The Easy Guide lists it for porcelain tiles, ceramic tiles, glass mosaic and quarry tiles. No dilution is printed because it is used as it comes. Coverage depends on how much joint there is: about 350 square metres per litre on large format tile, dropping to about 15 square metres per litre on mosaic, where the joint is most of the surface. Supplied in 750 ml spray bottles in boxes of 12. It is a same day product, so it belongs on the tiler's trolley rather than in the store. The FILA data sheet travels with the quotation.`,

  max: `Max is FILA's solvent based wax remover, for taking an old wax or polish layer off a floor before anything new goes down. The Easy Guide lists it for terracotta, quarry tiles, porcelain tiles, unpolished stone and agglomerates, glazed ceramic tiles and concrete. One dilution is printed, 1:5 on all of those surfaces, with coverage of about 20 square metres per litre of concentrate. That makes it a preparation product, used once over an area rather than weekly. Supplied in 5 litre cans in boxes of 4. Being solvent based it wants ventilation, which on a UAE fit out means planning it in before the glazing is sealed up. The FILA data sheet travels with the quotation.`,

  norust: `Norust is FILA's rust stain remover, for the brown marks a steel offcut, a scaffold foot or a planter leaves on a finished floor. The Easy Guide lists it for marble, granite, natural stone, agglomerates, porcelain tiles, ceramic tiles, terracotta and concrete, an unusually wide list for a stain remover and one that includes polished stone. No dilution and no coverage figure are printed, because it is dosed on the stain rather than over an area. Supplied in 75 ml bottles in boxes of 12, a size that tells you it is kept for snagging rather than ordered by the drum. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,

  nospot: `Nospot is FILA's spray stain remover for absorbent floors, the one that lifts a mark out of a surface rather than off it. The Easy Guide lists it for terracotta, quarry tiles, marble, granite and natural stone, agglomerates and concrete. No dilution and no coverage figure are printed, because this kind of remover is applied to the mark and left to work, not spread over an area. Supplied in 200 ml cans in boxes of 12. On a villa terrace or a stone driveway the stain that matters is usually a single one, which is why this comes in a can and not a drum. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,

  phzero: `PHZero is the strong acid descaler in the FILA range, kept for cement residue and limescale that a neutral wash will not move. The Easy Guide lists it for terracotta, quarry tiles and porcelain tiles, and that short list is the point: it is not a product for polished marble or any other acid sensitive stone. Dilution is 1:5 on both terracotta and porcelain tiles, with coverage of about 20 square metres per litre on terracotta and about 40 on porcelain tiles. Supplied in 5 litre cans in boxes of 4. Hard water in the UAE makes scale a recurring job in wet areas, so a descaler usually earns its place in the store. The FILA data sheet travels with the quotation.`,

  'ps87-pro': `PS87 Pro is FILA's professional degreaser, a cleaner strong enough to strip as well as wash. The Easy Guide lists it for porcelain tiles, unpolished stone and agglomerates, glazed ceramic tiles, concrete, linoleum and PVC, terracotta and quarry tiles. Four strengths are printed. Maintenance runs at 1:20 and reaches about 200 square metres per litre, dewaxing at 1:5 and about 20 square metres per litre, the first wash of a stone floor at 1:5 and about 30 square metres per litre, and stubborn stains on porcelain floor tiles are tackled undiluted. Supplied in 1 litre bottles in boxes of 12 and 5 litre cans in boxes of 4. The FILA data sheet travels with the quotation.`,

  sr95: `SR95 is FILA's stain remover for oil and grease marks that have soaked in rather than sat on top. The Easy Guide lists it for porcelain tiles, stone and agglomerates, glazed ceramic tiles and concrete. No dilution and no coverage figure are printed, because the product is worked onto the mark and allowed to draw it out, which is a quantity set by the stain and not by the floor area. Supplied in 75 ml bottles in boxes of 12. Kitchens, car park bays and food courts are where this is usually asked for, and the small bottle is deliberate: it is a snagging product, not a maintenance one. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,

  zerosil: `Zerosil is FILA's silicone remover, for cured sealant smears left on a finished surface after a joint has been run. The Easy Guide lists it for porcelain tiles, ceramic tiles, marble, glass and metal, which covers the shower screen, the vanity top and the frame around them. No dilution and no coverage figure are printed, because it is used neat on the smear and not spread over an area. Supplied in 250 ml cans, twelve to a box. Silicone is the last wet trade in a bathroom and the easiest to smear onto everything already finished, so this is a handover product. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,
};

Object.assign(DESC, {
  'concrete-shield': `Concrete Shield is FILA's colour enhancing stain proof sealer for concrete, a treatment that deepens the tone of the slab while closing it to stains. The Easy Guide lists it for concrete, stamped concrete, interlocking pavers and marble chip cement tile, so it belongs on driveways, pool surrounds and landscaped areas rather than indoors. No dilution is printed, and coverage on concrete is about 10 to 15 square metres per litre, which is a sealer rate rather than a wash rate. Supplied in 5 litre cans in boxes of 4. Decorative concrete is common on UAE villa plots and it is the surface that shows a stain longest, so the sealer is worth planning into the handover. The FILA data sheet travels with the quotation.`,

  'concrete-hydro': `Concrete Hydro is FILA's consolidating water repellent, a treatment that binds a weak surface as well as shedding water off it. The Easy Guide lists it for concrete, plaster, brick and tuff, the family of porous mineral surfaces that chalk and dust when they are left exposed. No dilution is printed, and coverage across concrete, plaster, brick and tuff is about 8 square metres per litre, the lowest figure in the protector range and a sign of how much the substrate drinks. Supplied in 5 litre cans in boxes of 4. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,

  'contractors-choice': `Contractor's Choice is the sealer FILA packs for contract quantities, listed in the Easy Guide for concrete, stamped concrete, interlocking pavers and marble chip cement tile. No dilution is printed. Two coverage figures are given and they sit far apart: about 33 square metres per litre on natural stone, and about 90 to 185 square metres per litre when the product is run into cement grout joints alone, where only the joint takes any material. Supplied in 3.78 litre cans in boxes of 4. The joint figure is the one to use when a specification asks for grout protection across a large tiled area, because sealing the joints is a fraction of the work of sealing the field. The FILA data sheet travels with the quotation.`,

  'fob-xtreme': `FOB Xtreme is the strongest water and oil repellent FILA publishes in this range, an impregnator that leaves the look of the surface alone while closing it to both water and oil. The Easy Guide lists it for natural stone and agglomerates, marble and granite, concrete, tuff, WPC, terracotta and quarry tiles. No dilution is printed. Coverage is about 10 to 30 square metres per litre on stone, about 15 to 20 on rustic Tuscan and polished terracotta, and about 10 on handmade terracotta, so the more open the surface the more it drinks. Supplied in 1 litre bottles in boxes of 6 and 5 litre cans in boxes of 4. The FILA data sheet travels with the quotation.`,

  hydrorep: `Hydrorep is FILA's solvent based water repellent for surfaces that are porous and not polished. The Easy Guide lists it for unpolished marble and granite, unpolished stone and agglomerates, concrete and manufactured stone. No dilution is printed. Coverage is about 10 to 20 square metres per litre on natural stone and about 5 square metres per litre on concrete, the heaviest draw in the range and worth allowing for when a large terrace is being priced. Supplied in 1 litre bottles in boxes of 12 and 5 litre cans in boxes of 4. Water repellent, not waterproofing: it keeps rain and irrigation out of the surface, and a tanking membrane still does the membrane's job. The FILA data sheet travels with the quotation.`,

  'hydrorep-eco': `Hydrorep Eco is the water based version of FILA's water repellent, for projects where a solvent is not wanted on site. The Easy Guide lists it for unpolished stone and agglomerates, concrete, terracotta, exposed bricks, quarry tiles, plaster and tuff. No dilution is printed. Coverage is about 10 to 20 square metres per litre on terracotta, exposed brick walls, quarry tiles, stone and plaster, and about 8 to 10 square metres per litre on concrete. Supplied in 1 litre bottles in boxes of 12 and 5 litre cans in boxes of 4. An eco compatible repellent is usually the one that clears an occupied building or a green rated fit out. The FILA data sheet travels with the quotation.`,

  mp90: `MP90 is FILA's water and oil repellent impregnator for surfaces that are already polished, the treatment specified when a stone has to be protected without any change to how it looks. The Easy Guide lists it for polished porcelain tiles, marble and granite, stone and agglomerates. No dilution is printed. Coverage is about 30 square metres per litre on marble and granite, about 30 to 40 on porcelain, and about 30 on Venetian terrazzo. Supplied in 1 litre bottles in boxes of 6 and 5 litre cans in boxes of 4. Polished porcelain is cut open by the polishing itself, which is why a floor that looks sealed still takes a stain and still wants this. The FILA data sheet travels with the quotation.`,

  'mp90-eco-xtreme': `MP90 Eco Xtreme is the water based stain protector at the top of FILA's eco range, a repellent for polished surfaces that works without a solvent carrier. The Easy Guide lists it for polished porcelain tiles, marble and granite, natural stone and agglomerates, and concrete. No dilution is printed. Coverage is about 30 to 50 square metres per litre on polished porcelain tiles, about 20 to 30 on polished marble and granite, and about 10 to 20 on matte polished stone. Supplied in 1 litre bottles in boxes of 6 and 5 litre cans in boxes of 4. On an occupied floor the eco compatible option is often the only one that can be applied in working hours. The FILA data sheet travels with the quotation.`,

  pw10: `PW10 is FILA's pre laying treatment against efflorescence, applied to the back of a slab before it is bedded rather than to the face afterwards. The Easy Guide lists it for the back of natural stone surfaces, granite, marble, agglomerates, terracotta and absorbent materials. No dilution is printed, and coverage on all of those is about 10 to 15 square metres per litre. Supplied in 5 litre cans in boxes of 4 and in 100 litre quantities for contract work. Salt pushed up through a stone by moisture from the bed is one of the hardest defects to put right once a floor is down, which is why this one is bought before the tiling starts. The FILA data sheet travels with the quotation.`,

  stoneplus: `Stoneplus is FILA's water and oil repellent with a reviving effect, a protector that lifts the colour of a tired stone as it closes it. The Easy Guide lists it for stone and agglomerates, marble and granite. No dilution is printed. Coverage is about 30 to 50 square metres per litre on polished stone and about 15 to 25 square metres per litre on untreated stone, which is the usual pattern: the more open the surface, the more it takes. Supplied in 1 litre bottles in boxes of 6 and 5 litre cans in boxes of 4. Reviving is a real change in appearance, so it is worth a sample panel before a whole floor is committed. The FILA data sheet travels with the quotation.`,

  'stoneplus-eco': `Stoneplus Eco is the water based colour enhancing protector in FILA's stone range, for a deeper tone without a solvent on site. The Easy Guide lists it for natural stone, marble and granite. No dilution is printed. Coverage is about 30 to 50 square metres per litre on polished stone and about 15 to 25 square metres per litre on untreated stone, so the finish of the slab decides the quantity more than the area does. Supplied in 1 litre bottles in boxes of 6 and 5 litre cans in boxes of 4. Colour enhancement is a design decision as much as a technical one, so try it on an offcut from the same batch first. The FILA data sheet travels with the quotation.`,

  'stop-dirt': `Stop Dirt is FILA's dirt repellent for porcelain that is not smooth, the one specified when a textured floor keeps holding dirt however often it is washed. The Easy Guide lists it for textured porcelain tiles, unpolished porcelain tiles and lappato porcelain tiles. No dilution is printed, and coverage on textured, natural and lappato porcelain tiles is about 70 square metres per litre, a high figure because the product sits in the surface texture rather than soaking into the body. Supplied in 500 ml bottles in boxes of 12. Anti slip porcelain around a pool or on a terrace is exactly the surface this was made for. The FILA data sheet travels with the quotation.`,

  w68: `W68 is FILA's stain protector for unpolished surfaces, an impregnator for floors open enough to take a mark before anyone reaches for a cloth. The Easy Guide lists it for unpolished stone and agglomerates, terracotta, quarry tiles and concrete. No dilution is printed. Coverage is about 15 to 20 square metres per litre on rustic Tuscan and polished terracotta, about 7 to 10 on concrete and on handmade, Spanish, hollow tile and brick terracotta, and about 10 to 20 on stone. Supplied in 1 litre bottles in boxes of 12 and 5 litre cans in boxes of 4. The spread in those figures is the substrate talking, so measure the real area. The FILA data sheet travels with the quotation.`,

  'wet-eco': `Wet Eco is FILA's wet look colour enhancer, a water based protector that leaves a stone reading as though it has just been rained on. The Easy Guide lists it for unpolished natural stones, unpolished agglomerates and terracotta. No dilution is printed. Coverage is about 10 to 20 square metres per litre on unpolished stones and agglomerates and about 7 to 20 square metres per litre on terracotta, where the range is wide because handmade terracotta drinks far more than a pressed tile. Supplied in 1 litre bottles in boxes of 12 and 5 litre cans in boxes of 4. A wet look is a permanent design decision, so sample it before the whole area goes ahead. The FILA data sheet travels with the quotation.`,

  classic: `Classic is FILA's eco friendly liquid wax, a finish that protects and gives a floor a soft sheen rather than a hard gloss. The Easy Guide lists it for marble, Venetian terrazzo, grit, natural stone, terracotta and cement tiles, the traditional floors that were always waxed. No dilution is printed. Coverage is about 30 square metres per litre on terracotta and about 30 to 40 square metres per litre on stone. Supplied in 1 litre bottles in boxes of 12 and 5 litre cans in boxes of 4. A wax is a maintenance finish rather than a sealer: it is renewed on a cycle, and FILA publishes a remover for taking it back off. The FILA data sheet travels with the quotation.`,

  longlife: `Longlife is FILA's glossy protective wax, the finish chosen when the brief asks for shine as well as protection. The Easy Guide lists it for terracotta, quarry tiles, slate, stone and agglomerates, rubber and PVC, plastic laminates, linoleum, resin and vinyl surfaces, which takes it well beyond stone and into resilient flooring. On rubber and PVC, plastic laminates, linoleum and resin it is used undiluted. Coverage is about 30 square metres per litre on terracotta, about 30 to 40 on stone, and about 30 on those resilient surfaces used undiluted. Supplied in 1 litre bottles in boxes of 12. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,

  'clean-and-shine': `Clean&Shine is FILA's ready to use spray for everyday cleaning, the bottle that goes into a handover pack rather than a site store. The Easy Guide lists it for porcelain tiles, glazed ceramic tiles, stone, glass mirrors, leather, plastic laminates and rubber, steel, marble and granite, quartz and agglomerates, which is the whole of a finished apartment in one product. There is no dilution to work out because it is supplied ready to use, and the guide prints no coverage figure for a trigger spray. Supplied in 750 ml bottles with a spray nozzle in boxes of 6. It is the product to hand a client who asks what to clean a new marble vanity with. The FILA data sheet travels with the quotation.`,

  deepclean: `Deepclean is FILA's ready to use descaling spray, for the limescale that builds on a shower wall and on the fittings around it. The Easy Guide lists it for porcelain tiles, ceramic tiles, mosaics, glass, and taps and chrome plated elements. It needs no dilution because it comes ready to use, and the guide prints no coverage figure for a trigger spray. Supplied in 750 ml bottles with a spray nozzle in boxes of 6. UAE water leaves scale quickly, so in practice this is the bathroom product that keeps a glass screen and a chrome mixer looking new between deep cleans. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,

  fuganet: `Fuganet is FILA's ready to use grout cleaner, made for the joint rather than the tile. The Easy Guide lists it for all types of grouting and gives a coverage of about 850 square metres per litre, a high figure because the spray goes onto the joint lines and not over the whole floor. It needs no dilution. Supplied in 750 ml bottles with a spray nozzle in boxes of 6. A grout line is the part of a tiled floor that shows dirt first and the part a client points at, so a joint specific cleaner answers a complaint that a general floor wash never quite does. The FILA data sheet travels with the quotation.`,

  'marble-refresh': `Marble Refresh is FILA's ready to use polish for worktops, made to bring a dulled surface back rather than to clean it. The Easy Guide lists it for marble, granite, natural stone, agglomerates, marble resin, quartz resin and marble concrete composites, and quartz, which is most of what a kitchen island is cut from. It needs no dilution and the guide prints no coverage figure for a trigger spray. Supplied in 750 ml bottles with a spray nozzle in boxes of 6. A marble top loses its lustre where it is used most, around the hob and the sink, and this is the product that answers that without a grinding machine. The FILA data sheet travels with the quotation.`,

  nodrops: `Nodrops is FILA's ready to use water mark protection, applied to glass so that water beads and runs off instead of drying into a spot. The Easy Guide lists it for shower cubicles, glass, glass mosaic, glazed ceramic tiles and mirrors. It needs no dilution and the guide prints no coverage figure for a trigger spray. Supplied in 750 ml bottles with a spray nozzle in boxes of 6. Hard water in the UAE is what turns a new shower screen cloudy within months, and treating the glass is far easier than polishing the marks off later. Lapiz Blue stocks it in Dubai, Abu Dhabi and Sharjah, and the data sheet travels with the quotation.`,

  rapidsan: `Rapidsan is FILA's eco disinfectant, a ready to use spray listed in the Easy Guide for all surfaces, which is the whole point of it: one bottle for a worktop, a handle, a tap and a tiled wall without a different product for each. It needs no dilution and the guide prints no coverage figure for a trigger spray. Supplied in 750 ml bottles with a spray nozzle in boxes of 6. An eco disinfectant matters where a surface is touched often and cleaned often, which in a UAE project usually means a clinic, a nursery, a gym or a shared kitchen. The FILA data sheet travels with the quotation.`,

  fugaproof: `Fugaproof is FILA's ready to use grout protector, the companion to the grout cleaner in the same range. The Easy Guide lists it for all types of grouting and gives a coverage of about 850 square metres per litre, a high figure because the product is run along the joint lines rather than spread across the tile. It needs no dilution. Supplied in 750 ml bottles with a spray nozzle in boxes of 6. Protecting the joint is the cheapest way to keep a tiled floor looking clean, because the joint is where the dirt gets a hold and where a client's eye goes first. The FILA data sheet travels with the quotation.`,
});

/* ------------------------------------------------------------------------ */

/* House style on a string lifted from the guide. The figures are untouched;
   only the typography changes. Numeric ranges become "10 to 20" so the page
   never carries a dash the SEO gate would flag, compound adjectives lose
   their hyphens the way the rest of the site writes them, and a slash becomes
   the word it stands for. */
function house(s) {
  return s
    .replace(/(\d)\s*-\s*(\d)/g, '$1 to $2')
    .replace(/([A-Za-z])-(?=\s)/g, '$1')
    .replace(/([A-Za-z])-([A-Za-z])/g, '$1 $2')
    .replace(/(\d)-([A-Za-z])/g, '$1 $2')
    .replace(/\s*\/\s*/g, ' and ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* "1 litre: boxes of 12" is how the guide tabulates a pack. On the page it
   reads as a sentence. */
function packs(list) {
  return list
    .map((p) =>
      p
        .replace(/(\d)(ml|L)\b/g, '$1 $2')
        .replace(/:\s*boxes of/i, ' in boxes of')
        .replace(/:\s*(\d+)\s*pc box/i, ' in boxes of $1')
    )
    .map(house)
    .join(', ');
}

function coverageSpec(p) {
  if (!p.coverage || p.coverage.length === 0) return '';
  return p.coverage
    .map((c) => {
      const v = Array.isArray(c.sqmPerLitre)
        ? `${c.sqmPerLitre[0]} to ${c.sqmPerLitre[1]}`
        : String(c.sqmPerLitre);
      return `${house(c.surface)}: ${v} m² per litre`;
    })
    .join('; ');
}

function dilutionSpec(p) {
  if (p.dilutions.length > 0) {
    return p.dilutions.map((d) => `${house(d.label)}: ${house(d.ratio)}`).join('; ');
  }
  // The guide marks the trigger sprays ready to use. Everything else simply
  // prints no dilution, and a record that prints nothing says nothing.
  return p.ready ? 'Ready to use, no dilution' : '';
}

const VERB = { cleaner: 'Cleaning', protector: 'Protecting', finish: 'Finishing' };
const STAGE = {
  Maintenance: 'Routine maintenance washing',
  'Initial stone wash': 'First wash of a new stone floor',
  Dewaxing: 'Stripping old wax',
};
/* A dilution row whose label is just the surface adds nothing the surface
   list has not already said. */
const SKIP_LABEL = /^(all listed surfaces|terracotta|porcelain tiles|natural stone|rubber)/i;

function applications(p) {
  const out = [house(p.purpose)];
  for (const s of p.surfaces.slice(0, 5)) {
    const t = house(s);
    const lower = t.charAt(0).toLowerCase() + t.slice(1);
    out.push(/^back of/i.test(t) ? `Treating the ${lower}` : `${VERB[p.category]} ${lower}`);
  }
  for (const d of p.dilutions) {
    if (SKIP_LABEL.test(d.label)) continue;
    const label = STAGE[d.label] ?? house(d.label);
    out.push(d.ratio === 'undiluted' ? `${label} undiluted` : `${label} at ${house(d.ratio)}`);
  }
  return [...new Set(out)];
}

/* A cleaner sits in the cleaners line; a protector and a finish both sit in
   sealers. Both lines already exist in brandConfigs. */
const LINE_OF = { cleaner: 'cleaners', protector: 'sealers', finish: 'sealers' };

/* A pack shot already in the repository under the product's own slug, or the
   line photograph as a stand in. Never a path that is not on disk: the build
   and audit-alts both fail on a missing image. */
function resolveImage(slug, line, name) {
  const own = `/images/brands/fila/${line}/${slug}.webp`;
  if (fs.existsSync(path.join(PUBLIC_DIR, own.slice(1)))) {
    return {
      status: 'found',
      path: own,
      source_url: `FILA pack shot already in the repository at ${own}`,
    };
  }
  const line_hero = `/images/brands/fila/${line}/hero.webp`;
  if (!fs.existsSync(path.join(PUBLIC_DIR, line_hero.slice(1)))) {
    throw new Error(`neither ${own} nor ${line_hero} is on disk`);
  }
  return {
    status: 'placeholder',
    path: line_hero,
    source_url: `FILA ${line} line photograph, standing in until the ${name} pack shot is supplied`,
  };
}

function buildRecord(p) {
  const name = NAMES[p.slug];
  if (!name) throw new Error(`no name for ${p.slug}`);
  const desc = DESC[p.slug];
  if (!desc) throw new Error(`no description for ${p.slug}`);
  const mid = META[p.slug];
  if (!mid) throw new Error(`no meta clause for ${p.slug}`);

  const line = LINE_OF[p.category];
  const coverage = coverageSpec(p);
  const dilution = dilutionSpec(p);
  const second = coverage ? 'coverage' : 'surfaces';

  const specs = { product_type: house(p.purpose), surfaces: house(p.surfaces.join(', ')) };
  if (dilution) specs.dilution = dilution;
  if (coverage) specs.coverage = coverage;
  specs.pack_size = packs(p.packSizes);
  specs.supplied_by = 'Lapiz Blue, authorised FILA distributor in the UAE';

  return {
    slug: p.slug,
    brand: 'fila',
    product_line: line,
    name,
    category: 'surface_treatment',
    classification: '',
    description: desc,
    meta_description: `${name} TDS: ${mid}. Data sheet, ${second} and packs from Lapiz Blue in Dubai, Abu Dhabi and Sharjah.`,
    image: resolveImage(p.slug, line, name),
    tds: {
      status: 'documents_pending',
      source_url: 'https://www.filasolutions.com/mee/',
      local_path: '',
      sha256: '',
      revision_date: '',
      verified_name_match_score: 0,
    },
    specs,
    applications: applications(p),
    equivalents: [],
    page_status: 'generated',
    notes: `Figures transcribed from the FILA Easy Guide 2023, page ${p.page}, held in src/data/fila-products.json. FILA issues its technical data sheets to dealers rather than publishing them, so this record ships documents_pending and the page carries the sheet request until the PDF is registered.`,
    updated_at: TODAY,
  };
}

const source = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
const records = source.products.map(buildRecord).sort((a, b) => a.name.localeCompare(b.name));

/* Report and gate. Anything the project's own checks would reject is printed
   here rather than discovered after a build. */
const TITLE_TAIL = ' TDS | FILA Surface Treatment | Lapiz Blue UAE';
let problems = 0;
console.log(
  ['slug', 'line', 'words', 'meta', 'title', 'image'].join('\t').toUpperCase()
);
for (const r of records) {
  const words = r.description.trim().split(/\s+/).length;
  const meta = r.meta_description.length;
  const title = (r.name + TITLE_TAIL).length;
  const flag = (ok) => (ok ? '' : '  <-- CHECK');
  const bad =
    words < 100 || words > 140 || meta < 140 || meta > 170 || r.image.status === 'missing';
  if (bad) problems++;
  console.log(
    [
      r.slug,
      r.product_line,
      words,
      meta,
      title,
      `${r.image.status} ${r.image.path.replace('/images/brands/fila/', '')}`,
    ].join('\t') + flag(!bad)
  );
}
const dashes = records.filter((r) => /[–—]/.test(JSON.stringify(r)));
if (dashes.length > 0) {
  problems += dashes.length;
  console.log(`\nem or en dashes in: ${dashes.map((r) => r.slug).join(', ')}`);
}
const longTitles = records.filter((r) => (r.name + TITLE_TAIL).length >= 60);
if (longTitles.length > 0) {
  console.log(
    `\n${longTitles.length} titles at or over 60 characters, from the shared route template: ` +
      longTitles.map((r) => `${r.name} (${(r.name + TITLE_TAIL).length})`).join(', ')
  );
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const kept = manifest.filter((r) => r.brand !== 'fila');
const merged = [...kept, ...records];
if (!dry) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(merged, null, 2) + '\n');
}
console.log(
  `\n${records.length} FILA records built, ${manifest.length - kept.length} replaced, ${merged.length} records in the manifest${dry ? ' (dry run, nothing written)' : ''}.`
);
console.log(problems === 0 ? 'No copy or image problems.' : `${problems} problem(s) above.`);
process.exit(problems > 0 ? 1 : 0);

/*
  Editorial content for the Mapei flooring systems line, covering resin
  flooring systems, polyurethane cement mortars, finishes and topcoats,
  adhesives for resilient, textile, wood and synthetic turf coverings,
  primers and sports surface coatings.

  Original copy, 100 to 150 words per product, written from the specs and
  classifications carried on each record.

  Usage: npx tsx scripts/apply-content-mapei-flooring.ts
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
  'ultrabond-eco-p909-2k': {
    description:
      'Wood coverings move with humidity, so the adhesive beneath them has to hold a board that is trying to change shape. Ultrabond Eco P909 2K is a two component reactive polyurethane adhesive for parquet and engineered boards, spread at 800 to 1,000 g/m² with a Mapei parquet trowel, or at 350 to 450 g/m² with a no. 1 or no. 2 notched trowel when it bonds an acoustic mat above or below. The working windows are generous for a reactive product: 40 to 50 minutes of pot life, 60 minutes of open time, 70 to 90 minutes in which a board can still be shifted, and a set floor after 24 hours. EC1 R Plus covers very low emission interiors. Mix small batches in a UAE summer, because heat shortens every one of those windows.',
    meta_description:
      'Ultrabond Eco P909 2K: two component polyurethane adhesive for parquet and engineered wood, 60 minute open time, EC1 R Plus. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Parquet and engineered wood boards',
      'Pre assembled wood panels',
      'Bonding above or below acoustic matting',
      'Laminate and wood flooring installation',
      'Interiors needing very low emission adhesives',
    ],
  },
  'adesilex-g19': {
    description:
      'Rubber, polyolefin and polyurethane backings shed ordinary dispersion adhesives, which is the gap a reactive product fills. Adesilex G19 is a two component epoxy polyurethane adhesive for resilient and textile coverings, mixed 94 parts A to 6 parts B and applied between +10°C and +30°C. Trowel choice sets consumption: 350 to 450 g/m² through a no. 1, rising to 550 to 750 g/m² through a no. 3 where the backing is deeply profiled. Pot life runs 50 to 60 minutes, open time 60 minutes, and a covering can still be adjusted at 90 minutes, with the floor set in 12 to 24 hours. A conductive shade covers static dissipative build ups, and the same adhesive installs athletic track surfaces. Keep the 10 kg kit out of the sun before mixing.',
    meta_description:
      'Adesilex G19: two component epoxy polyurethane adhesive for rubber, polyolefin and textile coverings, conductive shade available. Sheet from Lapiz Blue UAE.',
    applications: [
      'Resilient and LVT floor coverings',
      'Textile and carpet coverings',
      'Rubber, polyolefin and polyurethane backed materials',
      'Installation of athletic tracks',
      'Static dissipative flooring build ups',
    ],
  },
  'adesilex-gp': {
    description:
      'Not every layer in a floor build up is a covering. Adesilex GP is a high strength two component thixotropic epoxy bedding and repair mortar, mixed three parts A to one part B and used for structural bonding and for rebuilding concrete where a floor has broken down. Being thixotropic it stays where it is placed on a vertical face or an overhead soffit rather than sagging out of the detail. Consumption is 1.80 kg/m² per millimetre of thickness, so the 10 kg pack is sized for detail work rather than whole areas, and pot life is 60 minutes once the components meet. The application window of +15°C to +45°C is unusually wide and covers an open UAE site in summer, although the hotter the substrate the faster that hour disappears.',
    meta_description:
      'Adesilex GP: high strength two component thixotropic epoxy bedding and repair mortar for structural bonding, usable to +45°C. Sheet from Lapiz Blue UAE.',
    applications: [
      'Structural bonding of concrete elements',
      'Repairing damaged concrete floors',
      'Bedding mortar for precast and steel fixings',
      'Vertical and overhead repair details',
      'Hot weather site repair work',
    ],
  },
  'adesilex-mt-32': {
    description:
      'Wall coverings sit in the same trade as resilient flooring and follow the same logic one plane up. Adesilex MT 32 is a single component adhesive in water dispersion for wall coverings, a creamy white paste applied with a trowel, roller or brush. Consumption follows the tool: roughly 150 g/m² by brush, about 200 g/m² by roller, 200 to 250 g/m² through a Mapei no. 1 trowel and 150 to 250 g/m² through a TKB A1 to A4 notch. Open time is a maximum of 30 minutes and the application range is +10°C to +35°C. EC1 Plus marks it as very low emission for occupied interiors. Shelf life is 12 months, shorter than most of this range, so check the batch date before committing to a large UAE fit out order.',
    meta_description:
      'Adesilex MT 32: single component water dispersion adhesive for wall coverings, trowel, roller or brush applied, EC1 Plus. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Wall coverings in water dispersion adhesive',
      'Resilient and textile wall finishes',
      'Trowel, roller or brush application',
      'Occupied interiors needing low emission adhesives',
      'Commercial fit out wall covering work',
    ],
  },
  'mapecoat-i-600-w': {
    description:
      'Primers decide whether a resin floor lasts, and a water based one widens where it can be used. Mapecoat I 600 W is a two component transparent epoxy primer in water dispersion, mixed 2.3 parts A to 3.6 parts B and applied at 0.15 to 0.50 kg/m² depending on how absorbent and rough the substrate is. It primes industrial resin flooring, sports surface, car park and waterproofing systems, and doubles as an impregnating, salt resistant and dust proof treatment. Vapour permeability is the reason to choose it over a solvent epoxy: it lets a slab release moisture instead of trapping it under the coat. The +8°C to +35°C window suits night work in a UAE summer, when a slab surface sits well above air temperature by mid afternoon.',
    meta_description:
      'Mapecoat I 600 W: two component water based transparent epoxy primer, vapour permeable, for resin floors and car park decks. Sheet from Lapiz Blue UAE.',
    applications: [
      'Priming industrial resin flooring systems',
      'Vapour permeable epoxy resin systems',
      'Multi storey car park coating systems',
      'Preparation of sports surface subbases',
      'Impregnating, salt resistant and dust proof treatments',
    ],
  },
  'mapecoat-pu-20': {
    description:
      'A waterproofing membrane needs a topcoat above it, and on an exposed deck that topcoat does the ultraviolet work. Mapecoat PU 20 is a two component coloured aliphatic polyurethane topcoat for membranes in the Purtop range, mixed 4.3 parts A to 0.7 parts B and rolled at 0.15 to 0.2 kg/m² per coat in RAL 7042. Aliphatic chemistry is what holds the colour rather than chalking, which is why it goes on top while an aromatic grade stays below. Its solar reflectance index of 108 matters on a Gulf roof or podium, because a reflective finish runs cooler and puts less thermal load on everything beneath it. The 15 kg kit cures in 24 hours and the application range is +10°C to +35°C.',
    meta_description:
      'Mapecoat PU 20: two component aliphatic polyurethane topcoat for Purtop membranes, SRI 108 reflective finish in RAL 7042. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Topcoat for Purtop waterproofing membranes',
      'Balconies and terraces',
      'Bridge decks and hydraulic structures',
      'Cold applied liquid membrane systems',
      'Reflective roof and podium finishes',
    ],
  },
  'mapecoat-universal': {
    description:
      'One binder, three jobs, three consumption rates. Mapecoat Universal is a two component transparent epoxy binder mixed two parts A to one part B, used across the Mapefloor Compact System decorative range. At 0.2 to 0.4 kg/m² it works as an adhesion promoter; at 1.4 to 1.6 kg/m² it binds a Compact System MF floor of about 3 mm; at 2.0 to 2.5 kg/m² it binds a Compact System HD floor of about 7 mm. Bond strength to EN 13892-8 is quoted at 1.5 and 3.0 N/mm², and the system is CE marked to EN 13813 as SR B2.0 AR0.5 EFL. Epoxy is the right binder for a coloured quartz floor indoors, where hardness and chemical resistance matter more than movement. Work between +10°C and +30°C.',
    meta_description:
      'Mapecoat Universal: two component transparent epoxy binder for Mapefloor Compact System decorative quartz floors and adhesion promotion. From Lapiz Blue UAE.',
    applications: [
      'Binder for Mapefloor Compact System MF and HD',
      'Decorative coloured quartz flooring',
      'Adhesion promoter on cementitious substrates',
      'Industrial resin flooring interiors',
      'Decorative resin flooring interiors',
    ],
  },
  'mapecoat-tns-base-coat': {
    description:
      'Between a primed court and its coloured playing surface sits a build layer, and this is it. Mapecoat TNS Base Coat is a concentrated acrylic resin base coat in water dispersion for the multi layer Mapecoat TNS systems used on tennis, padel, pickleball and multi sport areas. Its job is to even out the substrate and give the finish coats something uniform to sit on, so the colour and the pace of the court come out as specified rather than as the asphalt beneath dictates. Bond strength is quoted above 0.8 N/mm. Shades are Base T, Grey, White and White HV, in 20 kg and 5 kg packs. On a UAE court, programme application for the cooler end of the day so the dispersion is not flashing off as it is laid.',
    meta_description:
      'Mapecoat TNS Base Coat: concentrated acrylic base coat in water dispersion for multi layer Mapecoat TNS sports court systems. Sheet from Lapiz Blue UAE.',
    applications: [
      'Tennis, padel and pickleball court systems',
      'Multi sport area installation',
      'Intermediate build layer in Mapecoat TNS systems',
      'Levelling bituminous and cementitious court substrates',
      'Outdoor sports surface construction',
    ],
  },
  'mapecoat-tns-extreme': {
    description:
      'Driveways and cycle lanes are coated for grip and colour, not for looks alone. Mapecoat TNS Extreme is a two component quick drying epoxy acrylic resin in water dispersion with selected fillers, mixed 4 parts A to 96 parts B and laid at roughly 1.5 kg/m² in two coats over bituminous conglomerate. It is certified to EN 1504-2 as a protective coating for concrete, with pull off adhesion to EN 1542 of at least 1.5 N/mm², and it keeps its slip resistance when wet. Pot life is six hours, long for a reactive coating and useful across a large area. Eight RAL shades plus a light grey are listed. Quick drying earns its place in the UAE, where a trafficked area can be handed back the same day instead of closed overnight.',
    meta_description:
      'Mapecoat TNS Extreme: two component quick drying epoxy acrylic coating for driveways, cycle lanes and pedestrian areas, EN 1504-2. From Lapiz Blue UAE.',
    applications: [
      'Colouring of driveways and vehicle traffic areas',
      'Cycle lanes and pedestrian areas',
      'Protective coating for concrete to EN 1504-2',
      'Multi sport area surfacing',
      'Surfaces needing wet slip resistance',
    ],
  },
  'mapecoat-tns-finish-1': {
    description:
      'Court pace is a specification, not an accident. Mapecoat TNS Finish 1 is a coloured coating with selected aggregates for the multi layer Mapecoat TNS systems, classified ITF 1 at the slow end of the International Tennis Federation pace scale, where the aggregate loading is what holds the ball up. Over asphalt the first coat runs 0.8 to 1 kg/m² and the second 0.4 to 0.5 kg/m²; over an existing TNS system or a cementitious substrate both coats run 0.4 to 0.5 kg/m². Pull off adhesion to EN 1542 is at least 0.8 N/mm². Eight shades are listed, from white and dark grey through to sea blue. Supplied in 20 kg pails. Settle the pace classification with the UAE club before ordering, because the finish is what fixes it.',
    meta_description:
      'Mapecoat TNS Finish 1: ITF 1 slow pace coloured court coating with selected aggregates for Mapecoat TNS systems. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Tennis, padel and pickleball court finishes',
      'ITF 1 slow pace court specifications',
      'Finish coats over Mapecoat TNS systems',
      'Direct application on asphalt courts',
      'Coating cementitious court substrates',
    ],
  },
  'mapecoat-tns-finish-3': {
    description:
      'Where a heavily filled finish slows a ball and a smoother one speeds it up, this is the middle setting. Mapecoat TNS Finish 3 is a coloured coating with selected aggregates for the multi layer Mapecoat TNS range, classified ITF 3 for medium court pace. Both coats run 0.3 to 0.35 kg/m², whether it is finishing a TNS system or going over an existing coating or a cementitious substrate, and consumption rises with the roughness beneath. It is supplied in 20 kg pails in Base T and White, Base T being the tintable shade. Shelf life is 24 months between +5°C and +30°C. Store pails inside on a UAE site rather than in a yard, because a closed container standing in direct sun passes the top of that range easily.',
    meta_description:
      'Mapecoat TNS Finish 3: ITF 3 medium pace coloured court coating with selected aggregates, Base T and White shades. Request it from Lapiz Blue UAE.',
    applications: [
      'Tennis, padel and pickleball court finishes',
      'ITF 3 medium pace court specifications',
      'Finish coats over Mapecoat TNS systems',
      'Recoating existing court coatings',
      'Coating cementitious court substrates',
    ],
  },
  'mapecoat-tns-finish-4': {
    description:
      'Mapecoat TNS Finish 4 is the medium fast step in the Mapecoat TNS finish range, classified ITF 4, with a lighter aggregate loading than the slower grades and a correspondingly lower consumption of 0.3 kg/m² in each of two coats. It finishes multi layer TNS systems and also goes over existing coatings or cementitious substrates, with consumption strongly influenced by how rough the surface beneath it is. Eight shades are listed in the RAL design system, so a court can be matched to a club scheme rather than to a standard palette. Supplied in 20 kg pails with a 24 month shelf life. Settle pace, colour and slip before the base coat goes down, because changing the finish later means recoating a whole UAE court rather than patching it.',
    meta_description:
      'Mapecoat TNS Finish 4: ITF 4 medium fast coloured court coating in eight RAL shades for Mapecoat TNS systems. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Tennis, padel and pickleball court finishes',
      'ITF 4 medium fast court specifications',
      'Finish coats over Mapecoat TNS systems',
      'Recoating existing court coatings',
      'RAL colour matched sports surfaces',
    ],
  },
  'mapecoat-tns-primer-epw': {
    description:
      'Acrylic and polyurethane court coatings need a primer that will bond to whatever is already there. Mapecoat TNS Primer EPW is a solvent free two component epoxy primer in water dispersion, mixed one part A to four parts B and applied diluted at 0.1 to 0.2 kg/m² on a homogeneous substrate. It is the primer under the TNS and PU resin ranges, and it is also used for general surface preparation and for colouring work on cycle lanes, pedestrian areas and driveways. Being solvent free and water based, it can be used where ventilation is limited and people are still about. The application range is +8°C to +35°C, so on a UAE site an early start keeps the substrate inside it. Shelf life is 12 months above +5°C.',
    meta_description:
      'Mapecoat TNS Primer EPW: solvent free two component water based epoxy primer for TNS and PU resin court coatings. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Priming under TNS and PU resin coatings',
      'Surface preparation for sports flooring',
      'Cycle lane and pedestrian area coating systems',
      'Driveway colouring systems',
      'Work where solvent free products are required',
    ],
  },
  'mapecoat-tns-race-track': {
    description:
      'Line marking on a racing circuit has to survive what the circuit does to it. Mapecoat TNS Race Track is an acrylic waterborne top coating with selected fillers in water dispersion, rapid film forming, used for coloured line marking on motorsport circuits. It stays non slip in the wet, which is the reason a filled coating is used rather than a paint, and it is offered in a wide range of shades through the ColorMap system including custom colours. Supplied in 15 litre buckets of recycled plastic with a 12 month shelf life between +5°C and +30°C, and applied at ambient temperatures from +5°C to +35°C. Rapid film forming is the operational point in the Gulf: a circuit or kart track can be marked and reopened inside a short overnight window.',
    meta_description:
      'Mapecoat TNS Race Track: acrylic waterborne rapid film forming coloured coating for motorsport circuit line marking, non slip wet. From Lapiz Blue UAE.',
    applications: [
      'Line marking on motorsport circuits',
      'Kart track and race track surfacing',
      'Coloured top coating with selected fillers',
      'Surfaces needing wet slip resistance',
      'ColorMap custom shade sports surfaces',
    ],
  },
  'mapefloor-binder-930': {
    description:
      'Resin bound paving is a mortar mixed on site from aggregate and binder, and the binder decides how it behaves. Mapefloor Binder 930 is a one component aliphatic polyurethane binder for decorative floors, colourless and transparent so the natural aggregate shows rather than a pigment. Consumption is roughly 0.8 to 1.0 kg/m² per centimetre of mortar thickness, depending on the type and absorbency of the aggregate, and it is batched by weight against 2 to 4 mm stone. Aliphatic chemistry keeps it from yellowing outdoors. Careful traffic is possible after eight hours. Supplied in 5 kg packs with a 12 month shelf life above +5°C. In the UAE it suits permeable landscape paving, where surface water drains through the mortar instead of running to a gully.',
    meta_description:
      'Mapefloor Binder 930: one component aliphatic polyurethane binder for resin bound decorative mortar and permeable paving. Sheet from Lapiz Blue UAE.',
    applications: [
      'Resin bound decorative mortar with natural aggregates',
      'Permeable paving and urban landscaping',
      'Decorative resin flooring',
      'Exterior work needing non yellowing binders',
      'Pedestrian paths and courtyards',
    ],
  },
  'mapefloor-decor-700': {
    description:
      'Decorative resin floors are judged on the finish rather than the figures, but the figures still have to hold. Mapefloor Decor 700 is a two component solvent free epoxy paste in water dispersion, mixed one part A to four parts B and laid at 1 to 1.5 kg/m² per layer to give a trowel effect or mottled finish. Colour comes from Mapecolor Paste rather than a fixed range. Compressive strength to EN 196-1 reaches 50 N/mm² after seven days and flexural strength 25 N/mm², with bond strength to EN 13892-8 of at least 1.5 N/mm². It sets in about 12 hours at +23°C and 50% relative humidity. Water based and solvent free suits occupied interiors, which is where most trowel finish floors in the UAE are specified.',
    meta_description:
      'Mapefloor Decor 700: two component solvent free water based epoxy paste for trowel effect and mottled decorative floors. Sheet from Lapiz Blue UAE.',
    applications: [
      'Trowel effect and mottled decorative floors',
      'Decorative cementitious and resin flooring',
      'Industrial resin flooring interiors',
      'Floors coloured with Mapecolor Paste',
      'Occupied interiors needing solvent free resins',
    ],
  },
  'mapefloor-ep-19-me': {
    description:
      'When a floor has to be rebuilt rather than coated, the layer needed is a screed. Mapefloor EP 19 ME is a three component epoxy screed for wear resistant floors, also used as a repair compound where concrete has broken away. Consumption is 22 kg/m² per centimetre of thickness, so it is priced and planned by volume rather than by coat, with Primer SN beneath it at 0.3 to 0.5 kg/m² depending on absorption. Flexural strength to BS 6319-3 reaches 40 N/mm² after seven days and bond strength exceeds 2 N/mm², the point at which the concrete fails before the joint does. It sets in six hours and is applied from +5°C to +35°C. Two years of shelf life helps on a phased UAE industrial programme.',
    meta_description:
      'Mapefloor EP 19 ME: three component epoxy screed for wear resistant industrial floors and concrete repair, 22 kg/m² per cm. From Lapiz Blue UAE.',
    applications: [
      'Wear resistant industrial epoxy screeds',
      'Repair compound for damaged concrete floors',
      'Levelling and priming of substrates',
      'Heavy duty factory and workshop floors',
      'Industrial resin flooring construction',
    ],
  },
  'mapefloor-fc-200-me': {
    description:
      'A coating either follows a sound slab or fails trying to correct it, so build thickness is the variable to settle first. Mapefloor FC 200 ME is a high build epoxy resin floor coating, mixed 22 parts A to 3.5 parts B and rolled in a multi layer structured finish at about 0.32 kg/m² per coat, over Primer SN at 0.15 to 0.25 kg/m² where the substrate needs it. Adhesion to ASTM D4541 is at least 1.5 N/mm². Epoxy is the choice where chemical resistance, hardness and a cleanable surface matter more than movement. Pot life is 35 to 45 minutes and the floor sets in 24 hours. Eight RAL shades are listed. In UAE heat that pot life shortens, so mix to the area a gang can genuinely roll out.',
    meta_description:
      'Mapefloor FC 200 ME: high build two component epoxy floor coating for industrial areas, roll or structured finish, RAL shades. From Lapiz Blue UAE.',
    applications: [
      'High build epoxy coatings for industrial floors',
      'Multi layer roll coat and structured finishes',
      'Production, assembly and workshop floors',
      'Floors needing a hard cleanable surface',
      'Industrial resin flooring construction',
    ],
  },
  'mapefloor-finish-415-me': {
    description:
      'Finishes in a resin build up split into two families, and this one belongs indoors or beneath another coat. Mapefloor Finish 415 ME is a two component aromatic polyurethane finish, coloured, flexible and wear resistant, mixed 80 parts A to 20 parts B and applied at a theoretical 0.3 to 0.8 kg/m². Aromatic chemistry is tough but not ultraviolet stable, so it belongs on intermediate car park decks and enclosed industrial floors rather than on an exposed top deck where an aliphatic grade is required. Flexibility is why polyurethane is used here instead of epoxy: it moves with a deck instead of cracking along it. Gel time is 60 minutes at +23°C and set time 24 hours. Store the 12.5 kg kit between +15°C and +35°C, not in a UAE yard.',
    meta_description:
      'Mapefloor Finish 415 ME: two component aromatic polyurethane finish, flexible and wear resistant, for car park and industrial decks. From Lapiz Blue UAE.',
    applications: [
      'Intermediate multi storey car park decks',
      'Industrial resin flooring finishes',
      'Flexible wear resistant polyurethane coats',
      'Enclosed decks not exposed to sunlight',
      'Coloured industrial floor finishes',
    ],
  },
  'mapefloor-finish-450-me': {
    description:
      'On a top deck the sun is the design load. Mapefloor Finish 450 ME is a two component aliphatic polyurethane finish, coloured, elastic and resistant to both wear and ultraviolet light, mixed 84 parts A to 16 parts B and applied as a fluid paste. Aliphatic is the distinction that decides it: the colour holds outdoors where an aromatic finish chalks, so this is the grade for an exposed car park deck or any industrial floor open to the sky. It stays elastic, bridging the small movements a suspended deck makes under traffic and thermal cycling. Pot life is four hours and set time 24 hours, with application from +10°C to +35°C. A long pot life is worth having on a large Gulf deck coated in a single visit.',
    meta_description:
      'Mapefloor Finish 450 ME: two component aliphatic polyurethane finish, elastic and UV resistant, for exposed car park decks. Sheet from Lapiz Blue UAE.',
    applications: [
      'Exposed multi storey car park decks',
      'Industrial resin flooring finishes',
      'UV resistant coloured polyurethane topcoats',
      'Decks subject to thermal movement',
      'Traffic coating systems',
    ],
  },
  'mapefloor-finish-451': {
    description:
      'Polyaspartic sits beside polyurethane and trades working time for speed. Mapefloor Finish 451 is a two component aliphatic polyaspartic finish, coloured, elastic and resistant to wear and ultraviolet light, mixed 70 parts A to 30 parts B. Pot life is 40 minutes at +23°C, well short of the polyurethane finishes in this range, and the floor is set in 24 hours. That is the trade: a tighter window in exchange for a fast, hard, colour stable film on an exposed deck. Application runs from +10°C to +30°C, a lower ceiling than its neighbours, so a UAE deck in summer means night work or a very early start. Eight RAL shades are listed and the pack is 20 kg. Mix only what the gang can lay off inside the 40 minutes.',
    meta_description:
      'Mapefloor Finish 451: two component aliphatic polyaspartic finish, elastic, UV resistant, 40 minute pot life, eight RAL shades. From Lapiz Blue UAE.',
    applications: [
      'Fast return to service deck finishes',
      'Exposed multi storey car park decks',
      'UV resistant coloured topcoats',
      'Industrial resin flooring finishes',
      'Night and shutdown window applications',
    ],
  },
  'mapefloor-finish-460-me': {
    description:
      'Mapefloor Finish 460 ME is a two component aliphatic polyurethane finish, coloured, elastic and resistant to wear and ultraviolet light, mixed by weight at 70 parts A to 30 parts B and supplied in 14 kg kits. It is the top layer of industrial resin floors and multi storey car park systems, the coat that takes the traffic and the sunlight so the layers beneath it do not. Consumption depends on substrate roughness, ambient temperature and the tool used, and the quoted figures assume a substrate between +15°C and +35°C, with lower temperatures pushing consumption up. Pot life is about 60 minutes and the finish sets in 24 hours. Seven RAL shades are listed. Twelve months of shelf life between +15°C and +35°C means a UAE store room, not a site container.',
    meta_description:
      'Mapefloor Finish 460 ME: two component aliphatic polyurethane finish, elastic and UV resistant, for industrial floors and car parks. From Lapiz Blue UAE.',
    applications: [
      'Topcoat for industrial resin flooring',
      'Multi storey car park deck systems',
      'UV resistant coloured polyurethane finishes',
      'Decks subject to traffic and thermal movement',
      'Exposed exterior resin floors',
    ],
  },
  'mapefloor-finish-52-w': {
    description:
      'Dust and oil are the two things that spoil a working floor between cleans. Mapefloor Finish 52 W is a two component polyurethane finishing product in water dispersion, mixed 87 parts A to 13 parts B and rolled at 50 to 150 g/m² per coat as an anti dust and anti oil treatment. It is formulated with low yellowing properties, so the opalescent straw coloured film stays close to how it looked on the day it went down. At that consumption it is a thin protective layer rather than a build coat, applied over a sound floor or resin system to make it easier to clean and harder to mark. It sets in 12 hours. Water dispersion means low odour, which decides it for an occupied UAE warehouse or workshop.',
    meta_description:
      'Mapefloor Finish 52 W: two component water based polyurethane finish for anti dust and anti oil treatment of floors, low yellowing. From Lapiz Blue UAE.',
    applications: [
      'Anti dust treatment of concrete floors',
      'Anti oil protection of working floors',
      'Protective finish over resin systems',
      'Industrial resin flooring maintenance',
      'Occupied warehouses and workshops',
    ],
  },
  'mapefloor-finish-53-w': {
    description:
      'Protecting a finished resin or cementitious floor is a separate decision from building it. Mapefloor Finish 53 W is a two component aliphatic polyurethane finish in water dispersion, transparent and mixed ten parts A to one part B by volume, applied at 0.1 to 0.2 kg/m² per coat. Bond strength to EN 13892-8 is quoted at B1.5 and B2.0. Being aliphatic it resists yellowing, and being water based it keeps odour low enough for interiors that stay in use. The real advantage here is speed: it sets in six to seven hours, so a floor coated at the end of a shift is ready the next morning. Supplied in 11 litre units with a 12 month shelf life between +12°C and +30°C. Keep it off a hot UAE loading bay.',
    meta_description:
      'Mapefloor Finish 53 W: two component aliphatic water based transparent polyurethane finish for resin and cementitious floors. From Lapiz Blue UAE.',
    applications: [
      'Protective finish over resin flooring systems',
      'Protection of cementitious floors',
      'Transparent non yellowing topcoats',
      'Industrial resin flooring interiors',
      'Overnight recoating in occupied buildings',
    ],
  },
  'mapefloor-finish-58-w': {
    description:
      'Microcement and decorative resin floors need sealing, and gloss is often the wrong answer. Mapefloor Finish 58 W is a two component aliphatic water based polyurethane finish, transparent and matt, mixed ten parts A to one part B by weight and applied at 0.1 to 0.2 kg/m² per coat depending on how rough and porous the surface is. A matt film keeps a decorative floor reading as a surface rather than a varnish, while still taking the wear and the cleaning. Aliphatic chemistry resists yellowing and the water base keeps odour down for interiors that stay occupied. It sets in 12 hours. Supplied in 5.5 kg units stored between +12°C and +30°C, which in the UAE means a conditioned store rather than a site lock up.',
    meta_description:
      'Mapefloor Finish 58 W: two component aliphatic water based transparent matt polyurethane finish for microcement and resin floors. From Lapiz Blue UAE.',
    applications: [
      'Sealing microcement floors',
      'Decorative cementitious and resin flooring',
      'Matt transparent protective topcoats',
      'Industrial resin flooring interiors',
      'Occupied interiors needing low odour finishes',
    ],
  },
  'mapefloor-finish-htr': {
    description:
      'Car park floors are stained by the cars, not by the traffic. Plasticisers migrating out of warm tyres mark a resin floor permanently in the parking bays, and Mapefloor Finish HTR answers exactly that. It is a two component aliphatic polyurethane finish, transparent, glossy and elastic, with high resistance to tyre plasticisers, mixed 70 parts A to 30 parts B and applied at 0.050 to 0.150 kg/m² per coat. That is a thin sacrificial layer over a finished system rather than a build coat. It sets in a minimum of 12 hours at +23°C and 50% relative humidity and is applied between +10°C and +30°C. In a UAE multi storey car park, where tyres sit hot for hours, it earns its line in the specification.',
    meta_description:
      'Mapefloor Finish HTR: two component aliphatic polyurethane finish, transparent and glossy, resistant to tyre plasticisers. Sheet from Lapiz Blue UAE.',
    applications: [
      'Car park bays exposed to tyre plasticisers',
      'Industrial resin flooring finishes',
      'Transparent glossy protective topcoats',
      'Multi storey car park deck systems',
      'Elastic finishes over resin floors',
    ],
  },
  'mapefloor-i-300-sl-trp': {
    description:
      'Some decorative floors need the layers beneath them to stay visible. Mapefloor I 300 SL TRP is a two component transparent non yellowing epoxy coating applied at about 1 mm, using roughly 1.1 kg/m² to reach that thickness, mixed 100 parts A to 50 parts B by weight. It is a finishing coat over epoxy resin systems, used where a coloured quartz, flake or decorative layer has to read through a clear seamless surface. Self levelling at that thickness means no trowel marks and no joints for dirt to collect in. Non yellowing is the detail that protects the appearance of what is underneath. Supplied in 12 kg and 6 kg units with 24 months of shelf life, ideally stored between +15°C and +20°C rather than in a UAE site store.',
    meta_description:
      'Mapefloor I 300 SL TRP: two component transparent non yellowing epoxy coating at 1 mm for finishing decorative resin floors. From Lapiz Blue UAE.',
    applications: [
      'Finishing coats on epoxy resin systems',
      'Decorative cementitious and resin flooring',
      'Self levelling transparent resin compounds',
      'Coloured quartz and flake floor finishes',
      'Industrial resin flooring interiors',
    ],
  },
  'mapefloor-i-360-as': {
    description:
      'Where static has to be drained away rather than allowed to build, the floor becomes part of the electrical design. Mapefloor I 360 AS is a two component self levelling epoxy resin for electrically conductive systems, mixed 80 parts A to 20 parts B by weight and applied at a maximum of 2.4 kg/m². Bond strength to EN 13892-8 is quoted at B1.5 and B2.5. It forms the body of an antistatic build up, where the conductive layer beneath has to stay connected through to earth, so the stated consumption is a ceiling and not a guide. Finished in RAL 7035 and applied from +8°C to +35°C. On a UAE fit out, agree the earthing detail with the electrical contractor before the resin goes down, not afterwards.',
    meta_description:
      'Mapefloor I 360 AS: two component self levelling epoxy resin for electrically conductive and antistatic flooring systems. Sheet from Lapiz Blue UAE.',
    applications: [
      'Electrically conductive flooring systems',
      'Antistatic resin flooring build ups',
      'Self levelling epoxy body coats',
      'Industrial resin flooring construction',
      'Areas where static must be earthed',
    ],
  },
  'mapefloor-i-500-w': {
    description:
      'A slab that still holds moisture will lift an ordinary epoxy, and that is the problem this resin is built around. Mapefloor I 500 W is a water based epoxy for vapour permeable resin flooring systems, mixed one part A to twelve parts B and used as the base layer of Mapefloor System 51, a slip resistant multi layer floor of about 3 mm. In that system it follows Mapecoat I 600 W primer at 0.15 to 0.50 kg/m² with a light quartz broadcast, then goes down at 2.5 kg/m². It carries the HACCP mark and a low odour classification to ISO 16000-28 for food industry floors. Pot life is only 20 minutes, which in UAE heat means small batches and a gang standing ready before anything is mixed.',
    meta_description:
      'Mapefloor I 500 W: water based epoxy for vapour permeable slip resistant resin flooring systems, HACCP marked for food plants. From Lapiz Blue UAE.',
    applications: [
      'Flooring systems for the food industry',
      'Vapour permeable epoxy resin systems',
      'Slip resistant multi layer resin floors',
      'Slabs with residual moisture',
      'Low odour work in occupied buildings',
    ],
  },
  'mapefloor-pu-406': {
    description:
      'Polyurethane is chosen over epoxy when a floor has to move. Mapefloor PU 406 is a two component coloured self levelling elastic polyurethane resin, mixed five parts A to one part B and finished in RAL 7042. Self levelling gives a seamless plane with no trowel marks, and the elasticity is what lets the floor take thermal movement and minor substrate cracking that would telegraph straight through a rigid epoxy. It is used in industrial and decorative resin flooring, including terrazzo style finishes. Application runs from +8°C to +35°C and the floor sets in 24 hours. Supplied in 15 kg and 3 kg kits with a 12 month shelf life between +10°C and +30°C. In the UAE the top of that storage range is the one to watch, not the bottom.',
    meta_description:
      'Mapefloor PU 406: two component coloured self levelling elastic polyurethane resin for industrial and decorative floors. Sheet from Lapiz Blue UAE.',
    applications: [
      'Self levelling elastic polyurethane floors',
      'Industrial resin flooring construction',
      'Decorative cementitious and resin flooring',
      'Terrazzo style decorative finishes',
      'Floors subject to thermal movement',
    ],
  },
  'mapefloor-pu-410': {
    description:
      'Car park decks have to be waterproof and trafficked at once, and that combination rules out a rigid floor. Mapefloor PU 410 is a two component self levelling polyurethane binder used as the waterproof wear resistant membrane layer of Mapefloor Parking System WD, applied at 1.0 kg/m² with Mapecolor Paste, followed by 0.3 kg/m² of Quartz 0.25 ME and an excess broadcast of 4.0 kg/m² of coarser quartz. It is CE marked to EN 13813 as SR B1.5 AR0.5 IR4 BFL S1 and to EN 1504-2, with bond strength to EN 13892-8 of at least B1.5. Polyurethane stays elastic, so it bridges deck movement instead of cracking over it. It sets in 24 hours. On a Gulf deck, broadcast while the resin is still open.',
    meta_description:
      'Mapefloor PU 410: two component self levelling polyurethane binder for waterproof wear resistant car park deck membranes. From Lapiz Blue UAE.',
    applications: [
      'Waterproof wear resistant car park membranes',
      'Mapefloor Parking System WD build ups',
      'Multi storey car park deck coatings',
      'Industrial resin flooring construction',
      'Decks requiring crack bridging elasticity',
    ],
  },
  'mapefloor-cpu-cove': {
    description:
      'A hygienic floor fails at the wall junction first, because a square internal corner cannot be cleaned. Mapefloor CPU+/Cove is a polyurethane cement mortar for covings and details, thixotropic so it holds the fillet shape while it cures instead of slumping out of it. Consumption is about 2 kg per litre of detail, working out at 0.9 kg per metre for a 3 cm by 3 cm coving, 1.6 kg per metre at 4 cm and 2.5 kg per metre at 5 cm. It is classified CT C40 F10 AR0.5 EFL with bond strength of at least 2 N/mm², and carries HACCP and Indoor Air Comfort Gold marks for food and pharmaceutical work. Pot life is 20 minutes at +23°C, so on a UAE site the coving gang works one bay at a time.',
    meta_description:
      'Mapefloor CPU+/Cove: polyurethane cement mortar for hygienic covings and floor details, HACCP marked for food and pharma plants. From Lapiz Blue UAE.',
    applications: [
      'Covings at floor to wall junctions',
      'Creation of joints and fillets',
      'Flooring systems for the food industry',
      'Flooring systems for the chemical and pharmaceutical industry',
      'Detail work in polyurethane cement systems',
    ],
  },
  'mapefloor-cpu-mf': {
    description:
      'Polyurethane cement exists because epoxy cannot survive a washdown floor. Hot water, steam cleaning and organic acids put a food plant floor through thermal shock and chemical attack at the same time, and a rigid epoxy debonds. Mapefloor CPU+/MF is a self smoothing polyurethane cement mortar laid from 3 to 6 mm, classified CE CT C50 F15 A6 BFL S1 with bond strength of at least 2 N/mm², and marked HACCP and Indoor Air Comfort Gold. Consumption runs about 5.5 kg/m² at 3 mm, 7 kg/m² at 4 mm and 10 kg/m² at 6 mm, with roughly 1.7 kg/m² for a 1 mm scratch coat beneath. Pot life is 15 minutes at +23°C, and that is the real constraint on a UAE dairy or bakery floor: batch small, place fast.',
    meta_description:
      'Mapefloor CPU+/MF: self smoothing polyurethane cement mortar from 3 to 6 mm for food and pharmaceutical plant floors. Sheet from Lapiz Blue UAE.',
    applications: [
      'Flooring systems for the food industry',
      'Flooring systems for the chemical and pharmaceutical industry',
      'Self smoothing polyurethane cement floors from 3 to 6 mm',
      'Washdown and steam cleaned areas',
      'Industrial resin flooring construction',
    ],
  },
  'mapefloor-cpu-primer': {
    description:
      'A polyurethane cement floor is primed with polyurethane cement, not with epoxy. Mapefloor CPU+/Primer is the three part primer for the Mapefloor CPU+ systems, applied at roughly 0.3 to 0.4 kg/m², with consumption rising on a rough or absorbent slab. Its job is to wet the concrete, control suction and give the mortar above it a uniform surface to bond to, which is what keeps a food plant floor in service rather than lifting at the edges. It shares the HACCP, Indoor Air Comfort Gold and low odour ISO 16000-28 marks of the system it belongs to. Pot life is 15 minutes at +23°C, so it is mixed in small lots and brushed out at once. Part C is sensitive to humidity, which matters in a coastal UAE store.',
    meta_description:
      'Mapefloor CPU+/Primer: three part polyurethane cement primer for Mapefloor CPU+ flooring systems, HACCP marked, 0.3 to 0.4 kg/m². From Lapiz Blue UAE.',
    applications: [
      'Priming under Mapefloor CPU+ systems',
      'Flooring systems for the food industry',
      'Flooring systems for the chemical and pharmaceutical industry',
      'Suction control on absorbent concrete slabs',
      'Polyurethane cement flooring build ups',
    ],
  },
  'mapefloor-cpu-rt': {
    description:
      'Between a self smoothing mortar and a deep screed sits a mid range build, and this is it. Mapefloor CPU+/RT is a high performance polyurethane cement mortar for screeds from 6 to 9 mm, semi fluid in consistency and classified CE EN 13813 CT C50 F10 AR0.5 BFL S1, with bond strength to EN 13892-8 at B1.5 and B2.0. Consumption is about 2.0 kg/m² per millimetre, giving 12 kg/m² at 6 mm and 18 kg/m² at 9 mm. Polyurethane cement is specified where thermal shock, washdown and wheeled traffic all land on the same floor, which is the normal condition in food and pharmaceutical production. Pot life is 15 minutes at +23°C, so in UAE summer conditions a shaded mixing station is worth setting up properly.',
    meta_description:
      'Mapefloor CPU+/RT: polyurethane cement mortar for screeds from 6 to 9 mm in food and pharmaceutical plants, CE EN 13813. From Lapiz Blue UAE.',
    applications: [
      'Polyurethane cement screeds from 6 to 9 mm',
      'Flooring systems for the food industry',
      'Flooring systems for the chemical and pharmaceutical industry',
      'Washdown areas and wheeled traffic floors',
      'Industrial resin flooring construction',
    ],
  },
  'mapefloor-cpu-tc': {
    description:
      'The top layer of a polyurethane cement floor is a separate product, and it also goes up the wall. Mapefloor CPU+/TC is the topcoat for Mapefloor CPU+ flooring systems, applied at 0.4 to 1.2 kg/m² over concrete or over the CPU+ range depending on how rough the surface beneath it is. It is classified C40 and F7 with bond strength of at least 2 N/mm², and carries the HACCP, Indoor Air Comfort Gold and low odour ISO 16000-28 marks a food or pharmaceutical specification asks for. Using it on walls as well as floors lets a washdown area be finished in one chemistry, with no change of material at the coving. Pot life is 15 minutes at +23°C. Protect part C from humidity before mixing on a coastal UAE site.',
    meta_description:
      'Mapefloor CPU+/TC: polyurethane cement topcoat for CPU+ flooring systems and washdown walls, HACCP marked. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Topcoat for Mapefloor CPU+ flooring systems',
      'Wall finishes in washdown areas',
      'Flooring systems for the food industry',
      'Flooring systems for the chemical and pharmaceutical industry',
      'Topcoat directly on concrete',
    ],
  },
  'mapefloor-cpu-ud': {
    description:
      'The deepest build in this family goes down where the concrete beneath is poor or the duty is severe. Mapefloor CPU+/UD is a high performance polyurethane cement mortar for screeds from 6 to 12 mm, semi fluid, classified C50 and F10 with bond strength of at least 2 N/mm². Consumption is about 2.0 kg/m² per millimetre, giving 12 kg/m² at 6 mm, 18 kg/m² at 9 mm and 24 kg/m² at 12 mm. Extra thickness is what carries point loads and absorbs the thermal shock of a washdown cycle without debonding, which is why food and pharmaceutical plants specify polyurethane cement rather than epoxy. Pot life is 15 minutes at +23°C. Order against a measured UAE area, because at 24 kg/m² a survey error gets expensive quickly.',
    meta_description:
      'Mapefloor CPU+/UD: polyurethane cement mortar for heavy duty screeds from 6 to 12 mm in food and pharmaceutical plants. From Lapiz Blue UAE.',
    applications: [
      'Polyurethane cement screeds from 6 to 12 mm',
      'Flooring systems for the food industry',
      'Flooring systems for the chemical and pharmaceutical industry',
      'Heavy duty washdown and point loaded floors',
      'Industrial resin flooring construction',
    ],
  },
  'mapelux-lucida': {
    description:
      'The last layer of a floor build up is the one that gets renewed. Mapelux Lucida is a cross linked high strength metallic wax with a shiny finish, applied at 50 g/m² as part of routine cleaning and maintenance rather than as part of the floor itself. A sacrificial wax takes the scuffing and the cleaning chemicals so the resin or cementitious surface beneath it does not, and it is stripped and reapplied on a cycle instead of being repaired. Cross linking is what gives it enough strength to be worth applying on a commercial floor at all. It is applied between +10°C and +30°C and supplied in 10 kg units with a 12 month shelf life. For a UAE retail unit, set the renewal cycle against footfall, not the calendar.',
    meta_description:
      'Mapelux Lucida: cross linked high strength metallic wax with a shiny finish for routine protection of resin and cementitious floors. From Lapiz Blue UAE.',
    applications: [
      'Routine cleaning and floor maintenance',
      'Protecting resin and cementitious floors',
      'Sacrificial gloss wax layers',
      'Retail and commercial floor care',
      'Periodic strip and reapply regimes',
    ],
  },
  'mapelux-opaca': {
    description:
      'Gloss is a maintenance decision as much as a design one, and this is the matt option. Mapelux Opaca is a cross linked high strength metallic wax with a matt finish, applied at 50 g/m² as part of a routine cleaning and protection regime. It does the same sacrificial job as the shiny grade: it absorbs the scuffs and the cleaning chemicals, then gets stripped and reapplied rather than mended. A matt film also hides scratching and uneven light far better than gloss, which is why it suits a large open floor under strong lighting. Application runs from +10°C to +30°C, in 10 kg units with a 12 month shelf life. In the UAE, matt also means less glare from sunlight coming through a shopfront.',
    meta_description:
      'Mapelux Opaca: cross linked high strength metallic wax with a matt finish for routine protection of resin and cementitious floors. From Lapiz Blue UAE.',
    applications: [
      'Routine cleaning and floor maintenance',
      'Protecting resin and cementitious floors',
      'Sacrificial matt wax layers',
      'Large open floors under strong lighting',
      'Periodic strip and reapply regimes',
    ],
  },
  'ultrabond-p980-1k': {
    description:
      'One component adhesives remove the mixing error, and for laminate that matters more than raw strength. Ultrabond P980 1K is a ready mixed one component polyurethane adhesive for engineered laminated parquet, pre assembled panels and laminate on all types of substrate, with no solvent, free amine or epoxy resin content and an EC1 Plus emission classification. It is spread at 800 to 1,000 g/m² and particularly recommended over heated sublayers. Working times are long for a reactive adhesive: a skin forms at 110 minutes, boards can be adjusted for three hours and the floor sets in about 12 hours. The application range is +10°C to +25°C, narrower than most of this range and the one UAE detail to plan around, because the air conditioning has to be running before the first board goes down.',
    meta_description:
      'Ultrabond P980 1K: ready mixed one component polyurethane adhesive for laminate and engineered parquet, heated sublayers. From Lapiz Blue UAE.',
    applications: [
      'Engineered laminated parquet',
      'Pre assembled wood panels',
      'All types and formats of laminate',
      'Installation over heated sublayers',
      'Installers avoiding epoxy polyurethane adhesives',
    ],
  },
  'ultrabond-eco-375': {
    description:
      'Vinyl sheet is laid in long runs, and a short open time turns that into a race. Ultrabond Eco 375 is a vinyl floor adhesive with a 40 to 50 minute open time, long enough to spread a bay, lay the sheet and work the air out without fighting the adhesive. Consumption follows the trowel: about 200 g/m² by roller, 250 to 300 g/m² through a Mapei no. 1 and 350 to 450 g/m² through a no. 2. It sets in three to five hours, and carries an EC1 Plus very low emission classification with a low odour rating to ISO 16000-28, so it suits occupied buildings. Application runs from +15°C to +35°C. On a UAE handover, confirm the air conditioning is running before the first run is spread.',
    meta_description:
      'Ultrabond Eco 375: vinyl floor adhesive with a 40 to 50 minute open time, EC1 Plus very low emission and low odour. Sheet from Lapiz Blue UAE.',
    applications: [
      'Vinyl sheet and vinyl tile flooring',
      'Resilient and LVT floor coverings',
      'Long run installations needing extended open time',
      'Occupied buildings needing low odour adhesives',
      'Commercial fit out flooring work',
    ],
  },
  'ultrabond-eco-fix': {
    description:
      'Not every covering should be stuck down permanently. Ultrabond Eco Fix is an adhesive and fixative with high residual tack for loose lay floorings, applied at 80 to 150 g/m² by roller or trowel, a fraction of what a fully bonded installation uses. High residual tack means the film stays grippy rather than curing hard, so planks and tiles hold position under traffic but can be lifted and replaced individually later. The floor is in service immediately after installation. It carries an EC1 very low emission classification, a low odour rating to ISO 16000-28 and marine approval MED 0474. Application runs from +15°C to +35°C. For a UAE office with churn, a replaceable floor is usually worth more than a permanent bond.',
    meta_description:
      'Ultrabond Eco Fix: high residual tack adhesive and fixative for loose lay flooring at 80 to 150 g/m², EC1 and marine approved. From Lapiz Blue UAE.',
    applications: [
      'Loose lay vinyl and LVT flooring',
      'Replaceable tile and plank installations',
      'Multipurpose fixative applications',
      'Marine flooring to MED 0474',
      'Offices and interiors with frequent churn',
    ],
  },
  'ultrabond-eco-tx-2': {
    description:
      'Carpet and textile coverings need grab before they need strength. Ultrabond Eco TX 2 is an adhesive for textile floorings with high initial grab and a long open time of 20 to 30 minutes, so a broadloom run can be positioned and then held without creeping. Consumption depends on the trowel: roughly 300 to 350 g/m² through a TKB B1, and 350 to 450 g/m² through a Mapei no. 2 or no. 3 or a TKB B2. It sets in three to five hours and is applied between +15°C and +35°C as a creamy light beige paste. Supplied in 16 kg pails. On a UAE fit out keep pails out of the sun, because a warm paste spreads thinner than the trowel notch intends.',
    meta_description:
      'Ultrabond Eco TX 2: high initial grab adhesive for textile and carpet flooring with a 20 to 30 minute open time. Request it from Lapiz Blue UAE.',
    applications: [
      'Broadloom carpet and textile flooring',
      'Carpet tiles and textile coverings',
      'Adhesives and tackifiers for textile flooring',
      'Commercial fit out flooring work',
      'Installations needing high initial grab',
    ],
  },
  'ultrabond-eco-v4sp': {
    description:
      'A universal adhesive earns its name by covering the awkward backings. Ultrabond Eco V4SP bonds resilient and carpet coverings including rubber, polyolefin and polyurethane backed materials, and is used on wall coverings as well as floors, so one pail can cover a fit out instead of three. Open time is 30 to 40 minutes and the covering sets in three to five hours. Consumption runs about 200 g/m² by roller, 250 to 300 g/m² through a Mapei no. 1 and 350 to 400 g/m² through a no. 2. It is offered in a conductive shade for static dissipative build ups, carries a low odour rating to ISO 16000-28 and marine approval MED 0474, and is applied from +15°C to +35°C in UAE interiors.',
    meta_description:
      'Ultrabond Eco V4SP: universal adhesive for resilient, carpet and rubber backed coverings and wall coverings, conductive grade. From Lapiz Blue UAE.',
    applications: [
      'Resilient and LVT floor coverings',
      'Carpet and textile coverings',
      'Rubber, polyolefin and polyurethane backed materials',
      'Wall coverings as well as floors',
      'Static dissipative flooring build ups',
    ],
  },
  'ultrabond-eco-vs60': {
    description:
      'Mixed coverings on one job usually mean mixed adhesives, which is what a multi purpose grade avoids. Ultrabond Eco VS60 is a strong tack adhesive for vinyl, textile, linoleum and LVT, on floors and on wall coverings, so a fit out with several finishes can run on a single product. Open time is 20 to 30 minutes and the covering sets in three to five hours. Consumption follows the tool: roughly 200 g/m² by roller, 250 to 300 g/m² through a Mapei no. 1, and 350 to 450 g/m² through a no. 2 or no. 3. It is a creamy pale beige paste applied from +15°C to +35°C, supplied in 16 kg pails. In the UAE check the substrate is dry before any resilient covering is bonded.',
    meta_description:
      'Ultrabond Eco VS60: multi purpose strong tack adhesive for vinyl, textile, linoleum and LVT floor coverings and wall coverings. Data sheet from Lapiz Blue UAE.',
    applications: [
      'Vinyl, linoleum and LVT floor coverings',
      'Textile and carpet coverings',
      'Wall coverings as well as floors',
      'Multipurpose fit out adhesive applications',
      'Commercial interiors with mixed finishes',
    ],
  },
  'ultrabond-eco-vs90-plus': {
    description:
      'Service temperature is the specification most people forget when choosing a flooring adhesive. Ultrabond Eco VS90 Plus is a high temperature universal adhesive for resilient and textile floorings, including rubber, polyolefin and polyurethane backed materials, formulated to keep its hold where a standard dispersion adhesive would soften. Open time is 20 to 30 minutes, the covering sets in three to five hours, and consumption runs about 200 g/m² by roller, 250 to 300 g/m² through a Mapei no. 1 and 350 to 450 g/m² through a no. 2. It carries a low odour rating to ISO 16000-28 and is applied from +15°C to +35°C in 16 kg pails. This is the grade for a UAE floor behind glazing, where solar gain lifts the surface well above room air.',
    meta_description:
      'Ultrabond Eco VS90 Plus: high temperature universal adhesive for resilient and textile flooring and rubber backed coverings. From Lapiz Blue UAE.',
    applications: [
      'Resilient and LVT floor coverings',
      'Textile and carpet coverings',
      'Rubber, polyolefin and polyurethane backed materials',
      'Floors exposed to elevated service temperatures',
      'Glazed areas with high solar gain',
    ],
  },
  'ultrabond-turf-2-stars': {
    description:
      'Synthetic turf is not glued to the ground, it is joined to itself. Ultrabond Turf 2 Stars is a two component solvent free polyurethane adhesive mixed 90 parts A to 10 parts B and used to bond seaming tape between turf sheets, at roughly 0.4 to 0.5 kg per linear metre of 40 cm tape, which is 5 kg of product for every 10 linear metres. Pot life is about 30 minutes, open time 40 to 45 minutes, and the seam is set in 12 to 24 hours. It carries an EC1 Plus very low emission classification and is applied from +5°C to +35°C. Protect component B from heat as well as frost on a UAE site, and keep the mixed adhesive shaded while the seam is being closed.',
    meta_description:
      'Ultrabond Turf 2 Stars: two component solvent free polyurethane adhesive for synthetic turf seaming tape, EC1 Plus. Sheet from Lapiz Blue UAE.',
    applications: [
      'Installation of synthetic turf',
      'Bonding seaming tape between turf sheets',
      'Sports pitch construction',
      'Solvent free adhesive specifications',
      'Outdoor installation from +5°C to +35°C',
    ],
  },
  'ultrabond-turf-2-stars-pro': {
    description:
      'Newer turf systems carry heavier backings and longer pile, and the seam has to match them. Ultrabond Turf 2 Stars Pro is a two component solvent free polyurethane adhesive for latest generation artificial turf sports surfaces, mixed 90 parts A to 10 parts B. Consumption is set by the tape width: 0.4 to 0.5 kg per metre on 40 cm seaming tape, or 0.3 to 0.4 kg per metre on 30 cm tape. Pot life is about 30 minutes, open time about 45 minutes, and the seam sets in 12 to 24 hours. EC1 Plus covers very low emission and the application range is +5°C to +35°C. On a Gulf pitch, seam early in the day, because a turf backing lying in full sun runs far hotter than the air above it.',
    meta_description:
      'Ultrabond Turf 2 Stars Pro: two component solvent free polyurethane adhesive for latest generation artificial turf sports surfaces. From Lapiz Blue UAE.',
    applications: [
      'Installation of synthetic turf',
      'Latest generation artificial turf sports surfaces',
      'Bonding 30 cm and 40 cm seaming tape',
      'Sports pitch construction',
      'Solvent free adhesive specifications',
    ],
  },
  'ultrabond-turf-pu-1k': {
    description:
      'Two component adhesives are stronger on paper and slower in practice, which is why a one component grade exists for seams. Ultrabond Turf PU 1K is a ready to use one component polyurethane adhesive for bonding jointing strips between synthetic grass sheets, applied at roughly 0.23 to 0.26 kg per metre of 30 cm seaming tape with a no. 3 or no. 4 notched trowel. There is nothing to measure and nothing wasted when a pail is left standing. A surface skin forms at 30 minutes and the seam sets in about 12 hours. It has been tested against the F.I.G.C. and L.N.D. specifications for sports pitches. Coastal UAE humidity suits a moisture curing adhesive, but it also shortens that skin time.',
    meta_description:
      'Ultrabond Turf PU 1K: ready to use one component polyurethane adhesive for bonding jointing strips between synthetic grass sheets. From Lapiz Blue UAE.',
    applications: [
      'Installation of synthetic turf',
      'Bonding jointing strips between grass sheets',
      'Sports pitch construction',
      'Ready to use single component seaming',
      'Pitches tested to F.I.G.C. and L.N.D. specifications',
    ],
  },
  'ultrabond-turf-pu-1k-lc': {
    description:
      'Decorative turf is laid by landscapers rather than pitch contractors, and the working time has to suit that. Ultrabond Turf PU 1K LC is a one component polyurethane adhesive for bonding decorative synthetic turf, applied at 0.23 to 0.26 kg per metre of 30 cm seaming tape with a no. 3 or no. 4 notched trowel. A skin forms at 60 minutes, double the window of the sports grade, which is what a small team working around planting, edges and awkward shapes actually needs. The seam sets in about 12 hours. Supplied ready to use in 15 kg pails in green, with at least 12 months of shelf life in a dry store. In the UAE that covers villa gardens, balconies and roof terraces where turf replaces grass.',
    meta_description:
      'Ultrabond Turf PU 1K LC: one component polyurethane adhesive for decorative synthetic turf with a 60 minute skin time. Request it from Lapiz Blue UAE.',
    applications: [
      'Bonding decorative synthetic turf',
      'Installation of synthetic turf',
      'Villa gardens, balconies and roof terraces',
      'Landscaping and soft landscape detailing',
      'Ready to use single component seaming',
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

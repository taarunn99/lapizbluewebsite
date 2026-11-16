/*
  Editorial content for the Mapei waterproofing line.

  Original copy, 100 to 150 words per product, written from the specs and
  classifications carried on each record and the catalogue entry behind it.

  The line runs from cementitious and liquid applied membranes through sheet
  membranes, detailing tapes, primers, sealants and protective coatings, so
  every description says which of those a product is and which element it suits.

  Only products carrying five or more spec fields are written here. Thinner
  records stay pending until their data sheets are parsed again.

  Usage: npx tsx scripts/apply-content-mapei-waterproofing.ts
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
  /* Cementitious membranes and mortars */
  'mapelastic-easy': {
    description:
      'Mapelastic Easy is a two component acrylic modified cementitious waterproof coating, the straightforward member of the Mapelastic family and the one aimed at balconies, terraces and bathrooms. Cementitious membranes of this kind bond directly to concrete and screed and take tile adhesive over the top, so the waterproofing and the finish behave as one build up instead of two trades working past each other. Crack bridging is rated at no less than 0.75 mm to EN 14891, which covers the hairline movement a balcony slab develops rather than a structural joint. Powder and liquid mix at 3 parts A to 1 part B and go on by trowel or roller at about 1.9 kg per square metre for each millimetre of thickness, from a 24 kg kit. Dampen a hot absorbent UAE screed first so the mix is not robbed of its water.',
    meta_description:
      'Mapelastic Easy TDS: two component flexible cementitious waterproof coating for balconies, terraces and bathrooms. Request it from Lapiz Blue UAE.',
    applications: [
      'Waterproofing balconies and terraces',
      'Bathrooms and internal wet areas',
      'Cementitious substrates beneath tile adhesive',
      'Trowel or roller applied waterproofing',
      'Flexible coating over hairline cracked concrete',
    ],
  },
  'mapelastic-smart': {
    description:
      'Where a slab moves more than a standard cementitious coating can follow, Mapelastic Smart is the high flexibility answer: a two component cementitious mortar whose crack bridging is measured at 2.8 mm, well past the 0.75 mm minimum of EN 14891. That elasticity is why it is specified on balconies and terraces that expand and contract through the day, and on swimming pools, hydraulic structures, tanks, reservoirs and sewer pipes where the water is permanent rather than occasional. It mixes at 2 parts A to 1 part B and goes on by trowel or roller at about 1.6 kg per square metre per millimetre, or by rendering machine at about 2.2, from a 30 kg kit. An exposed UAE terrace swings a long way between night and afternoon, which makes the flexible grade the sensible specification over a rigid one.',
    meta_description:
      'Mapelastic Smart TDS: two component cementitious waterproofing with 2.8 mm crack bridging for pools and terraces. Request it from Lapiz Blue UAE.',
    applications: [
      'Waterproofing balconies and terraces',
      'Swimming pools and hydraulic structures',
      'Tanks, reservoirs and sewer pipes',
      'Highly flexible waterproofing over moving substrates',
      'Trowel, roller or spray application',
    ],
  },
  'mapelastic-foundation': {
    description:
      'Buried concrete is the hardest case on this line, because water pushes from the far side of the wall. Mapelastic Foundation is the two component flexible cementitious mortar built for it, rated for both positive and negative water pressure, and Mapei lists it for foundation walls, retaining walls, underground car parks, lift pits, cellars, basins, channels and swimming pools. Crack bridging reaches 2.0 mm against an EN 14891 minimum of 0.75 mm, so it tolerates the movement a buried structure shows without splitting. Components mix at 2.2 parts A to 1 part B with about 60 minutes of pot life, and consumption is roughly 1.65 kg per square metre per millimetre by roller, or up to 2.1 by rendering machine on rough surfaces. Where the UAE water table sits close and saline, waterproof the lift pit before the pit starts filling.',
    meta_description:
      'Mapelastic Foundation TDS: flexible cementitious mortar for buried concrete under positive and negative water pressure. From Lapiz Blue UAE.',
    applications: [
      'Waterproofing foundation and retaining walls',
      'Underground car parks, cellars and lift pits',
      'Basins, channels and reservoirs',
      'Swimming pool structures',
      'Surfaces subject to negative water pressure',
      'Roller or spray applied below grade waterproofing',
    ],
  },
  'planiseal-288': {
    description:
      'Planiseal 288 is a two component cementitious waterproofing mortar for structures that hold water or keep it out, rated to a maximum of 1.5 bar of counterpressure. Mapei lists lift pits, ornamental tanks, swimming pools, basins and reservoirs, and it also covers balconies and small exposed walkable surfaces, so it spans buried work and light foot traffic. It can be applied to the internal or external face of concrete and masonry underground structures, which matters when only one side is reachable. Components mix at 4 parts A to 1 part B and consumption is about 1.9 kg per square metre for each millimetre of thickness, from 5 kg units that suit small pits and local repairs. It meets the requirements of EN 1504-2. Check that counterpressure limit against the UAE water table before specifying it.',
    meta_description:
      'Planiseal 288 TDS: two component cementitious waterproofing mortar for lift pits, tanks, basins and pools. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing lift pits and underground structures',
      'Tanks, basins and reservoirs',
      'Swimming pool structures',
      'Internal or external waterproofing of concrete and masonry',
      'Balconies and small walkable exposed surfaces',
    ],
  },
  'planiseal-88': {
    description:
      'An osmotic mortar works differently from a flexible coating. Planiseal 88 is a cementitious powder that seals masonry and concrete by forming crystals within the pores of the substrate itself, which is why it is suitable for contact with drinking water and classified to EN 1504-2 as MC IR. It suits stable structures such as potable water tanks and below grade walls rather than a roof or balcony that moves, because an osmotic mortar is rigid by nature. Mix 100 parts powder with 21 to 23 parts water, 5.25 to 5.75 litres per bag, allow about an hour of pot life and 1.5 kg per square metre per millimetre of thickness, from 25 kg bags. The application range reaches +40°C, generous for the Gulf, but shelf life shortens in heat and humidity, so rotate stock.',
    meta_description:
      'Planiseal 88 TDS: osmotic cementitious waterproofing mortar suitable for contact with drinking water. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing potable water tanks',
      'Masonry and concrete structures below grade',
      'Osmotic waterproofing of water retaining structures',
      'Tank linings in contact with drinking water',
      'Concrete protection to EN 1504-2',
    ],
  },
  'lamposilex-me': {
    description:
      'Few products on this line are bought for a single moment, but Lamposilex ME is one of them. It is an ultra fast setting hydraulic binder for stopping water leaks, a grey fine powder gauged in small amounts and pressed into a live leak in concrete or masonry, where it sets while the water is still running. Pot life at +20°C is about one minute, so the operative mixes what fits in a gloved hand and no more. Two figures to work from: 1.8 kg fills a one litre cavity, and it is sold in 5 kg packs that keep for twelve months stored indoors. Its place is post applied below grade waterproofing, where a leak has to be killed before the permanent system goes on. Keep a sealed pack in the site store before basement work starts, not after.',
    meta_description:
      'Lamposilex ME TDS: ultra fast setting hydraulic binder that stops running water leaks in concrete and masonry. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Stopping running water leaks in concrete and masonry',
      'Below grade structures and post applied waterproofing',
      'Filling cavities where water is flowing',
      'Emergency sealing ahead of a permanent repair',
      'Small batch hand application',
    ],
  },

  /* Liquid applied membranes */
  'mapegum-wps': {
    description:
      'For an internal wet room, the quickest route to a continuous waterproof layer under tiles is a liquid membrane, and Mapegum WPS is the quick drying flexible one in the Mapei range. It arrives as a ready to use red paste, applied in two coats with about 60 minutes between them once the first is touch dry, and builds roughly 0.8 mm wet for 0.5 mm dry at a consumption near 1.2 kg per square metre. Being flexible and seamless, it follows the awkward geometry of a shower or kitchen floor where sheet materials have to be cut and lapped. This is an internal product, not a coating for an exposed roof. EMICODE EC1 Plus suits green building fit outs. Those consumption figures assume a flat surface, so allow extra over a rough UAE screed.',
    meta_description:
      'Mapegum WPS TDS: quick drying flexible liquid membrane for waterproofing internal bathrooms and wet areas. Download the sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing internal bathroom and shower surfaces',
      'Wet areas beneath tile adhesive',
      'Kitchen floors and walls',
      'Internal surfaces needing a seamless flexible membrane',
      'Fit outs requiring very low emission materials',
    ],
  },
  'mapeproof-liquid-membrane': {
    description:
      'Sheet membranes are strong on long flat runs and weak at penetrations, and Mapeproof Liquid Membrane is the two component polyurethane elastomer that finishes those details. It is thixotropic, so it stays where it is put on a vertical face, and it seals, fills and details Mapeproof AL and Mapethene HT and LT membranes at pipes, corners and terminations. Elongation at failure is 440 per cent to ISO 37 and bond strength to concrete is 2 N per square millimetre to EN 1542, which is why it can be trusted at the junction between two systems. Mix at 100 parts A to 25 parts B, allow about 1.2 kg per square metre per millimetre on smooth concrete and build at least 2.5 mm on system details. Finish every detail before protection boards go up: none of it is reachable once concrete arrives.',
    meta_description:
      'Mapeproof Liquid Membrane TDS: two component polyurethane liquid membrane for sealing and detailing below grade sheet systems. From Lapiz Blue UAE.',
    applications: [
      'Sealing and detailing Mapeproof AL membranes',
      'Detailing Mapethene HT and LT membranes',
      'Filling and sealing around pipe penetrations',
      'Corners, upstands and terminations below grade',
      'Pre applied and post applied below grade waterproofing',
    ],
  },

  /* Sheet membranes and detailing tapes */
  'mapeproof-al': {
    description:
      'Mapeproof AL is a sheet membrane rather than a coating: a self adhesive HDPE waterproofing membrane that bonds fully to concrete cast against it, used to waterproof underground structures after the pour. The value of a fully bonded sheet below grade is that water cannot track sideways between membrane and concrete, so a puncture stays a local problem instead of wetting the whole wall. Elongation above 500 per cent to ASTM D 412 gives it the give a buried structure needs, and it is CE marked to EN 13967. Rolls are 1 metre by 20 metres, covering 20 square metres each. Shelf life is 15 months stored between +10°C and +25°C, which is short enough that rolls should be ordered to programme rather than stacked in an uncooled UAE site store.',
    meta_description:
      'Mapeproof AL TDS: self adhesive HDPE sheet membrane for fully bonded post applied below grade waterproofing, to EN 13967. From Lapiz Blue UAE.',
    applications: [
      'Waterproofing underground structures after concrete pouring',
      'Fully bonded below grade sheet waterproofing',
      'Basement walls and slabs',
      'Post applied waterproofing of buried concrete',
      'Structures where lateral water migration must be prevented',
    ],
  },
  'mapeband-flex-roll': {
    description:
      'Movement joints and live cracks are where most waterproofing fails, and Mapeband Flex Roll exists to cover them properly. It is a light grey flexible tape, 2.0 mm thick and supplied in 20 metre rolls, bedded into the waterproofing system over expansion joints and cracks so the membrane can carry on across a gap that keeps moving. Elongation at failure is at least 400 per cent both lengthways and across, which is what lets it absorb movement instead of resisting it. Mapei lists it for hydraulic structures, tanks, reservoirs, sewer pipes, bridge decks and post applied below grade waterproofing, so this is detailing material for heavy civil and water retaining work rather than a bathroom tape. Store the rolls dry, dust free and away from aggressive chemicals, which on a UAE site means off the slab and out of the sun.',
    meta_description:
      'Mapeband Flex Roll TDS: 2.0 mm flexible waterproofing tape for expansion joints and cracks, 20 metre rolls. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Flexible waterproofing of expansion joints',
      'Bridging live cracks within a waterproofing system',
      'Hydraulic structures and water retaining works',
      'Tanks, reservoirs and sewer pipes',
      'Bridge decks',
      'Post applied below grade waterproofing',
    ],
    category: 'accessory',
  },
  'mapeband-pe-120': {
    description:
      'Liquid applied membranes need a reinforced detail at every corner, upstand and junction, and Mapeband PE 120 is the rubber tape made for that job. About 0.70 mm thick and supplied in 50 metre rolls, it is laid into the waterproofing system so the weakest geometry in a wet room is backed by a material that stretches rather than cracks. Mapei places it in bathrooms and wet areas, which is exactly where a floor to wall junction moves slightly and a brittle coating splits along the line. It carries EMICODE EC1 Plus for very low emission, useful on fit outs chasing a green building rating. Keep the rolls in their original packaging until use, because site dust on the bonding face is the usual reason a taped corner later lets go.',
    meta_description:
      'Mapeband PE 120 TDS: rubber detailing tape for liquid applied waterproofing in bathrooms and wet areas. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Reinforcing details in liquid applied waterproofing systems',
      'Floor to wall junctions in bathrooms',
      'Wet area corners and upstands',
      'Internal wet rooms and showers',
      'Projects requiring very low emission materials',
    ],
    category: 'accessory',
  },
  'mapeguard-wp-adhesive': {
    description:
      'Not every product in a waterproofing system is the membrane itself. Mapeguard WP Adhesive is the two component, rapid drying, elastic cementitious adhesive that joins one, used to bond and seal the overlaps of Mapeguard WP 200 sheets and the joints between Mapeguard UM 35 and Mapeband Easy with their matching special pieces. A sheet system is only as waterproof as its laps, so this is the material that decides whether a balcony or wet room detail holds. Powder and liquid mix at 1 part A to 0.9 part B with about 45 minutes of pot life, and consumption is roughly 100 g per metre on a 5 cm sheet overlap. Apply between +5°C and +35°C. In UAE summer conditions that pot life shortens in practice, so gauge small and keep the mixed pail out of direct sun.',
    meta_description:
      'Mapeguard WP Adhesive TDS: two component elastic cementitious adhesive for Mapeguard membrane laps and joints. Request it from Lapiz Blue UAE.',
    applications: [
      'Bonding and sealing overlaps of Mapeguard WP 200',
      'Joints between Mapeguard UM 35 and Mapeband Easy',
      'Fixing special pieces in the Mapeguard system',
      'Balconies and terraces',
      'Bathrooms and wet areas',
    ],
  },

  /* Protective coatings and water repellent treatments */
  'mapecoat-dw-25': {
    description:
      'Mapecoat DW 25 is a two component epoxy paint for concrete, formulated non toxic and anti acid so it can be used on surfaces in contact with drinking water. That places it in the protective coating part of this line rather than the membrane part: it is specified for potable water tanks, reservoirs and sewer pipes, and as an anti carbonation coating where the aim is to keep carbon dioxide and aggressive water away from the reinforcement. Components mix at 4 parts A to 1 part B, pot life is 30 to 40 minutes, and 400 to 600 g per square metre in two coats gives roughly 300 to 450 microns dry. Pot life is the real constraint on a hot UAE tank job, so gauge small batches and keep both components shaded before they are mixed.',
    meta_description:
      'Mapecoat DW 25 TDS: two component non toxic epoxy coating for potable water tanks and concrete protection. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Coating potable water tanks and reservoirs',
      'Sewer pipes and water retaining structures',
      'Anti carbonation protection of concrete',
      'Anti acid coating on concrete surfaces',
      'Surfaces in contact with drinking water',
    ],
  },
  'planiseal-wr-100': {
    description:
      'Planiseal WR 100 protects reinforced concrete without covering it. A ready mixed, pure silane based hydrophobising liquid, it migrates into the surface and leaves a water repellent zone inside the concrete, so chloride bearing water is kept out while the surface keeps its appearance. That makes it a durability treatment for structures exposed to aggressive agents, chlorides in particular, which is the mechanism behind most reinforcement corrosion in coastal Gulf concrete. It goes onto vertical and horizontal surfaces, onto porous or compact concrete, onto new work and onto concrete already repaired, at roughly 0.1 to 0.2 kg per square metre per coat from 5 kg units. It is CE marked to EN 1504-2. Treat the surface once repairs have cured and the concrete is dry, because a silane needs open pores to migrate into.',
    meta_description:
      'Planiseal WR 100 TDS: silane based water repellent impregnation protecting reinforced concrete from chlorides. Request it from Lapiz Blue UAE.',
    applications: [
      'Water repellent protection of reinforced concrete',
      'Structures exposed to chlorides',
      'Vertical and horizontal concrete surfaces',
      'New concrete and repaired concrete',
      'Porous and compact concrete substrates',
      'Durability protection to EN 1504-2',
    ],
  },
  'antipluviol': {
    description:
      'Antipluviol is an impregnating water repellent rather than a membrane, and that distinction decides where it belongs. Water based and transparent, it soaks into very absorbent masonry and leaves a hydrophobic barrier inside the pores, so driving rain is shed while the wall still breathes and looks unchanged. Exposed brickwork, aerated concrete, renders, skim coats and natural or artificial stone are its substrates, which makes it a facade product and not something for a tank or a buried wall. Consumption follows absorbency, roughly 0.2 to 1 litre per square metre, with render or skim coat nearer 0.20 to 0.80 and tuff stone 0.50 to 1.00. The application window is +5°C to +35°C, so on a UAE site work the shaded elevation and follow the sun round rather than treating a wall that is already baking.',
    meta_description:
      'Antipluviol TDS: water based impregnating water repellent for very absorbent brick, render and stone facades. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Protecting very absorbent brickwork from driving rain',
      'Aerated concrete walls',
      'Renders and skim coats',
      'Natural and artificial stone facades',
      'Restoration of historic buildings',
      'Facades that must stay breathable and unchanged in appearance',
    ],
    category: 'surface_treatment',
  },
  'antipluviol-w': {
    description:
      'Sitting between the other two grades, Antipluviol W is the water based high penetration repellent for absorbent surfaces. It is milky in the pail and dries into the substrate rather than on top of it, forming a hydrophobic barrier through the pores of brickwork, aerated concrete, renders, skim coats and natural or artificial stone. Because no film is left behind, the wall keeps its breathability and its appearance, which is why treatments like this are accepted on restoration work where a coating would be refused. This is facade protection against driving rain, not a membrane for wet rooms, tanks or buried structures. Consumption runs from about 0.2 to 1 litre per square metre depending on absorbency. Test a panel first on a UAE job: dusty, salt laden elevations need washing and drying before anything is applied.',
    meta_description:
      'Antipluviol W TDS: water based high penetration water repellent for absorbent brick, render and stone. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Water repellent protection for absorbent masonry',
      'Exposed brickwork and aerated concrete',
      'Renders and skim coats',
      'Natural and artificial stone facades',
      'Restoration of historic buildings',
      'Facades exposed to driving rain',
    ],
    category: 'surface_treatment',
  },
  'antipluviol-s': {
    description:
      'Choosing between the Antipluviol grades comes down to how absorbent the surface is, and Antipluviol S is the solvent based one for the tight surfaces. Its extremely high penetration gets it into compact natural stone such as marble, granite, limestone, sandstone and split face stone, and into unglazed ceramic tiles, where a water based repellent would struggle to enter at all. It builds a hydrophobic barrier within the material instead of a surface film, so rain is repelled without altering the appearance or the breathability of the cladding. Consumption is low on dense stone, around 0.10 to 0.15 litre per square metre on Carrara marble and Sardinian granite and 0.15 to 0.20 on compact sandstone. Being solvent based, ventilate enclosed UAE balconies and shafts while applying, and mask adjacent glazing and polished finishes first.',
    meta_description:
      'Antipluviol S TDS: solvent based high penetration water repellent for marble, granite and compact stone cladding. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Water repellent protection for compact natural stone',
      'Marble, granite, limestone and sandstone cladding',
      'Split face stone facades',
      'Unglazed ceramic tiled elevations',
      'Restoration of historic buildings',
      'Low absorbency surfaces exposed to driving rain',
    ],
  },
  'silancolor-base-coat': {
    description:
      'Silancolor Base Coat belongs to the protective coating end of this line rather than the membrane end. It is a coloured silicone resin base paint in water dispersion, loaded with micro granular quartz and selected aggregates, applied to cementitious surfaces to even out absorbency and give the Silancolor finish above it something consistent to bond to. On a facade that matters twice over: patchy suction reads as patchy colour, and a scratch effect finish laid over bare render lets the substrate show through. Tinted close to the final shade, it also helps bright colours cover. Consumption is 0.3 to 0.5 kg per square metre per coat, from 20 kg buckets, applied between +5°C and +35°C. On a UAE elevation work the shaded face, because a hot wall skins the coat before it can be laid off evenly.',
    meta_description:
      'Silancolor Base Coat TDS: coloured silicone resin base paint that evens absorbency before Silancolor finishes. Request it from Lapiz Blue UAE.',
    applications: [
      'Preparing cementitious surfaces before Silancolor finishes',
      'Evening out substrate absorbency',
      'Promoting bond for coloured finishes and dressing materials',
      'Covering small surface imperfections',
      'Base coat beneath scratch effect finishes',
      'Finishing coats for external thermal insulation systems',
    ],
  },
  'silancolor-primer': {
    description:
      'Before a silicone resin facade paint goes on, the wall has to stop drinking unevenly, and Silancolor Primer is the product that settles it. A milky white, high penetration silicone resin primer in water dispersion, it consolidates the surface, evens out the absorption of the substrate and acts as a bonding promoter for Silancolor Paint above it. Skip it and the finish coat dries at different rates across the elevation, which shows as shading that no second coat fully hides. Consumption is 0.10 to 0.15 kg per square metre depending on the porosity of the substrate, from 10 kg drums, applied between +5°C and +35°C. It is odourless and free of solvents, so it can be used in closed or poorly ventilated spaces, which is useful in a UAE stairwell, shaft or plant room.',
    meta_description:
      'Silancolor Primer TDS: solvent free silicone resin primer that evens absorption before Silancolor Paint. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Priming cementitious surfaces before Silancolor Paint',
      'Evening out substrate absorption',
      'Consolidating the surfaces to be treated',
      'Preparation of substrates on facades',
      'Finishing coats for external thermal insulation systems',
      'Closed or poorly ventilated interiors',
    ],
  },
  'silancolor-primer-plus': {
    description:
      'Silancolor Primer Plus is the protective grade of the Silancolor primers, a siloxane based liquid formulated to resist mildew and mould. The difference tells on shaded, damp or poorly ventilated elevations, where spores colonise a primed surface and bloom through the finish within a season. Supplied ready to use as a milky fluid, it is applied by roller, brush or spray at 0.10 to 0.15 kg per square metre from 10 kg packs, between +5°C and +35°C, with other products following after 24 hours. Like the standard primer it evens out the suction of the substrate, so the coloured finish above dries uniformly. In the UAE it earns its place on shaded walls, plant room externals and anywhere condensation or irrigation spray keeps the render damp for part of the day.',
    meta_description:
      'Silancolor Primer Plus TDS: siloxane primer with mildew and mould resistance for damp or shaded facades. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Priming facades before Silancolor finishes',
      'Mildew and mould resistant surface preparation',
      'Shaded or damp elevations',
      'Evening out substrate absorption',
      'Finishing coats for external thermal insulation systems',
    ],
  },

  /* Primers and sealants */
  'mapeproof-primer': {
    description:
      'Mapeproof Primer does a job that sits slightly apart from the rest of this line. It is a one component, ready to use PVDC based dispersion membrane, green in colour, applied over a screed to suppress residual construction moisture up to 4.5 CM-%, equivalent to 95% relative humidity, so floor coverings can be laid before the slab has fully dried. Without it, moisture rising through a young screed lifts vinyl and debonds timber weeks after handover. It dries rapidly to a waterproof surface film and is then overlaid with the flooring adhesive. Consumption is around 60 to 70 g per square metre diluted one to one, 120 to 130 g undiluted, or about 250 g applied in two coats. Programme pressure on UAE fit outs is exactly why this exists, but confirm the screed moisture reading before relying on it.',
    meta_description:
      'Mapeproof Primer TDS: rapid drying PVDC moisture barrier membrane for screeds before floor coverings. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Suppressing residual moisture in screeds',
      'Preparation of floor substrates before covering',
      'Moisture barrier beneath floor coverings',
      'Early installation of finishes over young screeds',
      'Rapid drying waterproof film under flooring adhesives',
    ],
  },
  'mapeproof-sa-primer': {
    description:
      'A self adhesive membrane sticks to whatever the concrete surface offers it, which on a site finished slab is usually dust. Mapeproof SA Primer settles that: a one component, rapid drying primer, a golden yellow thick liquid applied to the substrate before any self adhesive sheet from the Mapeproof or Mapethene ranges goes down, binding loose fines and giving the membrane a consistent surface to grip. Consumption is around 200 g per square metre depending on how absorbent the concrete is, and it comes in 10 kg packs with a twelve month shelf life stored between +15°C and +25°C. Its place is post applied below grade waterproofing, under basement walls and slabs. On a dusty UAE site, prime only the area that can be sheeted the same day, because fresh primer collects the dust it was meant to beat.',
    meta_description:
      'Mapeproof SA Primer TDS: rapid drying primer for Mapeproof and Mapethene self adhesive membranes. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Priming concrete before self adhesive membranes',
      'Preparation for Mapeproof range membranes',
      'Preparation for Mapethene range membranes',
      'Post applied below grade waterproofing',
      'Binding dusty or absorbent concrete surfaces',
    ],
    category: 'primer',
  },
  'mapeproof-swell': {
    description:
      'Pipes and conduits passing through a waterproofed wall are a known leak path, and Mapeproof Swell is the hydrophilic sealant made for them. Supplied as a light grey thixotropic paste in 320 ml tubes and extruded with a standard gun, it is hydro expansive: it takes up water and swells against the gap it occupies, so the seal tightens under the very conditions that defeat a passive one. Elongation above 700 per cent to DIN 53504 lets it move with the structure, and one tube runs to roughly three linear metres of bead. Mapei lists it for swimming pools, hydraulic structures, tanks, reservoirs, sewer pipes and post applied below grade waterproofing. Confine the bead as the sheet shows, and store the tubes between +15°C and +25°C, which on a UAE site means the office rather than the container.',
    meta_description:
      'Mapeproof Swell TDS: hydro expansive hydrophilic sealant paste for pipe penetrations and construction joints. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Sealing pipes and elements passing through walls',
      'Construction joints in water retaining structures',
      'Swimming pools and hydraulic structures',
      'Tanks, reservoirs and sewer pipes',
      'Post applied below grade waterproofing',
    ],
    category: 'sealant',
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

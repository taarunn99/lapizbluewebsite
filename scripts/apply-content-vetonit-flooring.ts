/*
  Editorial content for the Vetonit flooring line, including self levelling
  underlayments, screeds, epoxy and polyurethane systems, primers and
  hardeners.

  Original copy, 100 to 150 words per product, written from the specs and uses
  carried on each record.

  Usage: npx tsx scripts/apply-content-vetonit-flooring.ts
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
  'vetotop-cl530': {
    description:
      'Vetotop CL530 is a premixed cementitious self levelling underlayment for build ups from 2 to 10 mm, the thin end of the range and the one most refurbishment work needs. It flows out to a flat plane without trowelling, which is the point: a hand floated screed cannot reach the flatness that large format tile, vinyl or a resin system demands. It levels concrete slabs before tiles and resinous finishes, and acts as the substrate under vinyl tiles, parquet and carpet where the covering will show every ripple beneath it. Supplied as a dry powder in 25 kg bags, mixed with clean water, with tools washed before it sets. Prime the slab first. An unprimed slab pulls water out of the mix and leaves a weak dusty surface that the covering then fails from.',
    meta_description:
      'Vetotop CL530 TDS: premixed cementitious self levelling underlayment, 2 to 10 mm. Request the data sheet from Lapiz Blue UAE.',
  },
  'vetotop-cl531': {
    description:
      'Vetotop CL531 is a polymer modified self levelling underlayment for build ups from 8 to 20 mm, the grade to reach for when the slab is further out of level than a thin compound can correct. The polymer modification gives it better flexural strength and adhesion at that depth than a plain cementitious mix would hold. It levels concrete slabs before tiles and resinous systems and forms the substrate for vinyl, parquet and carpet, where super flat tolerances are specified. A 25 kg bag mixes with 4.25 to 5 litres of clean water, and the floor is ready for its covering within 1 to 3 days depending on thickness and site conditions. Prime first, and do not exceed the stated thickness in one pour, because depth generates heat and heat causes cracking.',
    meta_description:
      'Vetotop CL531 TDS: polymer modified self levelling underlayment, 8 to 20 mm build ups. Request the data sheet from Lapiz Blue UAE.',
  },
  'vetotop-cs536': {
    description:
      'Vetotop CS536 is a premixed cementitious screed for build ups from 30 to 100 mm, the depth at which a self levelling compound is the wrong tool and a true screed is needed. It levels concrete slabs before a floor covering is laid, screeds over hollow core precast planks, and is used to form falls so water reaches the drain rather than standing on the floor. Being premixed removes the main variable in site screeding: a sand and cement mix batched by eye changes from gang to gang and shows as a change in strength and finish. A 50 kg bag takes 5 to 6 litres of water. Full strength is reached at 28 days, so programme the covering around that rather than the day it is walkable.',
    meta_description:
      'Vetotop CS536 TDS: premixed cementitious screed for 30 to 100 mm build ups and falls to drains. Request the sheet from Lapiz Blue UAE.',
  },
  'quick-floor-fix': {
    description:
      'Quick Floor Fix is a rapid setting cementitious levelling mortar for build ups from 10 to 80 mm, specified when the floor has to go back into service quickly. It repairs and patches substrates where old tiles have been lifted, levels and forms falls, and suits areas that need to be reopened to the public as soon as the work is done, which is the usual constraint in retail and hospitality refurbishment where a standard screed would cost a fortnight of closure. The rapid set is a working constraint as much as a benefit: mix only what can be placed and finished within the working time, because it will not wait. Supplied as a dry powder in 25 kg bags, mixed with clean water, with tools washed before the material hardens.',
    meta_description:
      'Quick Floor Fix TDS: rapid set cementitious levelling mortar, 10 to 80 mm, for fast reopening. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotop-es459': {
    description:
      'Vetotop ES459 is a three component epoxy floor screed for heavy duty work, laid from 3 to 25 mm. An epoxy screed is specified where a cementitious one would be ground away: industrial engineering plants and steelworks, vehicle factories, car parks and areas taking trailer traffic. It also repairs damaged concrete floors and rebuilds the broken edges of expansion joints, which is where a trafficked floor usually fails first because every wheel strikes the arris. The three component system is resin, hardener and graded filler, mixed on site in the stated proportions, and the working time runs from the moment they meet. Supplied as a 28 kg kit. Substrate preparation is mechanical, not chemical: the slab has to be sound, dry and abraded to expose a clean profile.',
    meta_description:
      'Vetotop ES459 TDS: three component heavy duty epoxy floor screed, 3 to 25 mm, for industrial floors. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotop-xt538': {
    description:
      'Vetotop XT538 is a non metallic dry shake floor hardener, broadcast onto fresh concrete and power floated into the surface while the slab is still green. That timing is everything: applied correctly it becomes monolithic with the concrete, and applied late it sits on top and delaminates under traffic. It raises the abrasion resistance of a concrete floor, improves surface properties generally, and suppresses fibres at the surface of fibre reinforced slabs where they would otherwise stand proud and catch. Being non metallic it does not rust or stain, which rules out the iron based hardeners for anything visible or wet. Supplied in 25 kg bags. Coverage per square metre depends on the specified duty, so confirm the rate against the data sheet before ordering for a large pour.',
    meta_description:
      'Vetotop XT538 TDS: non metallic dry shake monolithic floor hardener for abrasion resistant concrete. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotop-xt423': {
    description:
      'Vetotop XT423 is a ready to use liquid floor hardener and dust proofer, applied to new or existing concrete to stop the surface breaking down into dust. Untreated concrete abrades constantly under traffic, and the dust it sheds is both a housekeeping problem and a nuisance in any warehouse holding stock. The treatment reacts within the surface to harden it rather than forming a film that can peel, which is why it suits warehouse and hangar floors, garages and similar areas where a coating would be damaged and a sealed film would eventually lift. It is supplied ready to use in 20 litre pails, so there is nothing to mix. Full effect develops over about 14 days as the reaction completes. It works on old floors as well as new.',
    meta_description:
      'Vetotop XT423 TDS: ready to use liquid floor hardener and dust proofer for warehouse and garage floors. Request it from Lapiz Blue UAE.',
  },
  'vetotop-ec495': {
    description:
      'Vetotop EC495 is a two component solvent based epoxy topping applied thin, and it is self priming, which removes a separate primer coat and a day from the programme. It coats floors and walls across industrial settings including production and assembly areas, workshops, dairies, bottling plants, breweries, kitchens and showrooms, and also works as a sealer over other systems. Being thin it follows the substrate rather than correcting it, so it suits a floor that is already flat and sound and needs a durable cleanable surface rather than a rebuild. The solvent base means ventilation during application and curing, which rules it out of occupied buildings where a solvent free grade should be used instead. Supplied as a 15 litre kit, touch dry in about 24 hours.',
    meta_description:
      'Vetotop EC495 TDS: two component self priming thin epoxy topping for industrial floors and walls. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotop-el492': {
    description:
      'Vetotop EL492 is a two component self smoothing epoxy floor topping laid from 0.8 to 2 mm, the thinnest of the three self smoothing grades in this range. Self smoothing means it flows to a seamless level finish with no trowel marks and no joints for contamination to collect in, which is why it is specified in industrial kitchens and food processing plants, clean rooms and laboratories, and in vehicle factories and car parks. At under 2 mm it suits a sound flat slab needing a hygienic hard wearing surface rather than a floor that has to be rebuilt. Supplied as a 15 litre kit mixed on site. Prime the slab first, check its moisture content against the data sheet, and plan the pour so wet edges meet.',
    meta_description:
      'Vetotop EL492 TDS: two component self smoothing epoxy floor topping, 0.8 to 2 mm, seamless and hygienic. Request it from Lapiz Blue UAE.',
  },
  'vetotop-el499': {
    description:
      'Vetotop EL499 is a two component self smoothing epoxy floor topping laid from 2 to 4 mm, the middle grade where more build is needed than a thin topping provides. The extra thickness buys greater impact and wear resistance and a better chance of absorbing minor irregularities in the slab beneath. Applications are the demanding hygienic and industrial ones: industrial kitchens and food processing plants, vehicle factories and car parks, clean rooms and laboratories. The finish is seamless, so there are no joints to harbour contamination and nothing for a cleaning regime to work around. Supplied as a 15 litre kit mixed on site in the stated ratio. Prime first and verify slab moisture, because an epoxy seals the floor and trapped moisture has nowhere to go but the bond line.',
    meta_description:
      'Vetotop EL499 TDS: two component self smoothing epoxy floor topping, 2 to 4 mm, for kitchens and clean rooms. Request it from Lapiz Blue UAE.',
  },
  'vetotop-el699': {
    description:
      'Vetotop EL699 is the heaviest of the self smoothing epoxy toppings in this range, laid from 3 to 5 mm where wear, impact and chemical exposure are at their most severe. The additional thickness is what carries point loads and resists the damage a dropped tool or a pallet corner inflicts on a thinner film. It is used in industrial kitchens and food processing plants, vehicle factories and car parks, and clean rooms and laboratories, giving a seamless surface with no joints for contamination and nothing to catch during cleaning. Supplied as a 15 litre kit mixed on site. At this build the pour has to be planned so wet edges meet and the material is spread before it starts to thicken, which happens faster in UAE summer temperatures.',
    meta_description:
      'Vetotop EL699 TDS: two component self smoothing epoxy floor topping, 3 to 5 mm, heavy duty seamless finish. Request it from Lapiz Blue UAE.',
  },
  'vetoprime-ep490': {
    description:
      'Vetoprime EP490 is a two component solvent based epoxy primer, the universal primer beneath the Vetonit resin flooring and concrete repair systems. A primer does three things on a concrete floor: it wets and penetrates the surface so the system above bonds mechanically, it controls suction so the topping does not lose its resin into the slab, and it suppresses pinholing caused by air escaping from the concrete as the topping cures. Skipping it is the single most common reason a resin floor has to be taken up. It also serves alone as a sealer and surface hardener, and as a dust proofer on cementitious surfaces. Supplied as a 15 litre kit mixed on site. The solvent base needs ventilation, so use the solvent free grade in an occupied building.',
    meta_description:
      'Vetoprime EP490 TDS: two component solvent based universal epoxy primer, sealer and dust proofer. Request the sheet from Lapiz Blue UAE.',
  },
  'vetoprime-ep491': {
    description:
      'Vetoprime EP491 is the solvent free version of the Vetonit universal epoxy primer, and the absence of solvent is what lets it be used in occupied or partially occupied buildings without the ventilation a solvent system demands. It primes beneath resin flooring and concrete repair systems, and is specified particularly under screeds and self smoothing toppings where suction control and pinhole suppression decide whether the finished floor is sound or pitted. It also works alone as a sealer and surface hardener and as a dust proofer on cementitious surfaces. Supplied as a 15 litre kit of resin and hardener mixed on site in the stated proportions. Apply it to a mechanically prepared slab, not a swept one, and lay the system above within the overcoating window the sheet gives.',
    meta_description:
      'Vetoprime EP491 TDS: solvent free two component epoxy primer for resin floors and concrete repair. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotop-ec498': {
    description:
      'Vetotop EC498 is a two component solvent free high build epoxy flooring system, applied thicker than a thin topping to give a durable cleanable surface across demanding industrial areas: production and assembly, workshops, dairies, bottling plants, breweries, pharmaceutical plants, kitchens and showrooms. It also suits aircraft hangars and anti static specifications. High build means the coat carries real film thickness, so it tolerates wear and cleaning that would wear through a thin system, while staying solvent free so it can be applied where ventilation is limited and occupants remain. Supplied as a 15 litre kit mixed on site, with tools cleaned using Vetonit Solvent XX400 before cure. The slab needs mechanical preparation and a moisture check first, and a primer beneath unless the specification says otherwise.',
    meta_description:
      'Vetotop EC498 TDS: solvent free high build two component epoxy flooring system for industrial areas. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotop-ec698': {
    description:
      'Vetotop EC698 is a solvent free high build two component epoxy flooring system for industrial floors, used across production and assembly areas, workshops, dairies, bottling plants, breweries, pharmaceutical plants, kitchens and showrooms, and to build the coloured or specialist finishes those environments call for. The high build film gives the wear and chemical resistance a working floor needs, and the absence of solvent keeps it usable in buildings that cannot be fully vented or vacated. Supplied as a 15 litre kit mixed on site in the stated ratio, with tools cleaned in Vetonit Solvent XX300 before the material cures. As with every resin floor in this range, the outcome is decided before the first coat: mechanical preparation, a moisture check against the sheet, and the correct primer.',
    meta_description:
      'Vetotop EC698 TDS: solvent free high build epoxy flooring system for production, pharma and food plants. Request it from Lapiz Blue UAE.',
  },
  'vetotop-uc363': {
    description:
      'Vetotop UC363 is a two component aromatic polyurethane membrane used as the base coat of a waterproof flooring build up, specified where the floor has to be both trafficked and watertight. That combination is what defines its applications: car park decks and traffic coating systems, food and pharmaceutical flooring, and aircraft hangars. Polyurethane is chosen over epoxy here because it stays flexible, so it bridges movement and thermal cycling in a deck rather than cracking along it. Being aromatic it is not UV stable on its own, which is why it is a base coat: a UV resistant top coat such as Vetotop UC370 goes over it in the complete system. Supplied as a 15 litre kit mixed on site, with tools cleaned in Vetonit Solvent XX300 before cure.',
    meta_description:
      'Vetotop UC363 TDS: two component flexible waterproof PU flooring membrane base coat for car park decks. Request it from Lapiz Blue UAE.',
    category: 'flooring_system',
  },
  'vetotop-uc373': {
    description:
      'Vetotop UC373 is a two component UV resistant polyurethane line marking coating for trafficked floors. Ordinary line marking paint on a car park deck fades, chalks and is worn off by tyres within a season; a two component polyurethane cures to a hard film that survives both the traffic and the sunlight. It is used for line marking over the Vetotop range and car park deck coating systems, over general epoxy and polyurethane coated decks, and on car park flooring. UV resistance is what keeps the colour legible rather than bleached, which matters when the lines are doing a safety job. Supplied as a 4 litre kit, a size that suits the volumes line marking actually uses. Clean tools with Vetonit Solvent XX300 before the coating cures.',
    meta_description:
      'Vetotop UC373 TDS: two component UV resistant PU line marking coating for car parks and coated decks. Request it from Lapiz Blue UAE.',
  },
  'vetotop-us172': {
    description:
      'Vetotop US172 is a three component heavy duty polyurethane hybrid flooring system, the specification for floors facing mechanical and chemical attack at the same time. Its natural home is food and beverage production: dairies, cheese and milk production, meat, fish and poultry processing, along with laboratories and general factory floors. Those environments combine hot washdown, aggressive cleaning chemicals, organic acids and constant wheeled traffic, a set of conditions that will lift an epoxy through thermal shock alone. A polyurethane hybrid tolerates the temperature swing while keeping the chemical resistance and the seamless hygienic finish. Supplied as a 30 kg kit of resin, hardener and filler mixed on site, with tools cleaned in Vetonit Solvent XX300 before cure. Specify the finish and slip resistance before ordering, not after.',
    meta_description:
      'Vetotop US172 TDS: three component heavy duty PU hybrid flooring for food, beverage and laboratory floors. Request it from Lapiz Blue UAE.',
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
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words`);
    if (entry.meta_description.length > 165) warnings.push(`${slug}: meta ${entry.meta_description.length} chars`);
    if (/[–—]/.test(entry.description + entry.meta_description)) warnings.push(`${slug}: em or en dash`);

    rec.description = entry.description;
    rec.meta_description = entry.meta_description;
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

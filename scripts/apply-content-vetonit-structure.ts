/*
  Editorial content for the Vetonit microcement, precision grout and concrete
  repair, and bonding agent lines.

  Original copy, 100 to 150 words per product. Also corrects three categories
  the automatic classifier placed by wording rather than function, writes
  applications for two products whose sheets arrived without a catalogue page,
  and clears two spec values that the PDF extractor captured mid sentence.

  Usage: npx tsx scripts/apply-content-vetonit-structure.ts
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
  specs?: Record<string, string>;
  dropSpecs?: string[];
}

const content: Record<string, Entry> = {
  /* Microcement system */
  'vetotop-uc370': {
    description:
      'Vetotop UC370 is a two component UV resistant trafficable polyurethane coating, used as the top coat that protects and finishes a floor system rather than as a system on its own. It gives long term protection to car parks, factory floors, warehouses, laboratories, loading decks and ramps, and to showers, kitchens, dairies and breweries where wet conditions and cleaning chemicals attack the surface. In the Decofloor microcement build up it is the final layer, the one that makes a decorative microcement floor trafficable and keeps it colour stable under daylight. UV resistance is the reason it sits on top: the aromatic base coats beneath it are not light stable and would yellow. Supplied as a 15 litre kit mixed on site, with tools cleaned in Vetonit Solvent XX300 before cure.',
    meta_description:
      'Vetotop UC370 TDS: two component UV resistant trafficable PU top coat for microcement and deck systems. Request it from Lapiz Blue UAE.',
    category: 'flooring_system',
  },
  'vetoprime-decor': {
    description:
      'Vetoprime Decor is a single component pure acrylic penetrating primer, supplied ready to use, that prepares a surface before a decorative finish goes on. It penetrates rather than forming a film, which is what suits it to porous and slightly chalky substrates where a surface film would simply peel away with the dust it is sitting on. It primes concrete, masonry and plaster for interior and exterior use, and is the specified primer beneath the Vetotouch Decor decorative range. Priming matters more on a decorative finish than on anything else, because an uneven substrate suction shows as a patchy colour in the finish coat and cannot be corrected afterwards without taking it off. Supplied in 20 kg pails. Full cure develops over 28 days.',
    meta_description:
      'Vetoprime Decor TDS: single component pure acrylic penetrating primer for porous and chalky surfaces. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotop-microcement-base': {
    description:
      'Vetotop Microcement Base is the body of the Decofloor system, a decorative microcement base coat applied from 2 to 5 mm. It builds the thickness, takes up minor irregularities in the substrate and provides the key for the fine coat above it. The finished system is seamless and joint free, which is what people buy microcement for: a continuous floor or wall with no grout lines to clean and no tile module to design around. It restores and unifies the appearance of existing concrete floors and surfaces and renovates existing walls and floors without demolition, because at this build the finished level barely changes. Supplied as a dry powder in 25 kg bags, mixed with clean water. The primer below and the finish and sealer above are not optional.',
    meta_description:
      'Vetotop Microcement Base TDS: decorative microcement base coat, 2 to 5 mm, seamless and joint free. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotop-microcement-finish': {
    description:
      'Vetotop Microcement Finish is the fine coat of the Decofloor system, applied up to 2 mm over the base to give the surface its final texture and colour. This is the layer people actually see and touch, so application technique shows in it more than in any other product in this range, and a sample panel agreed on site is worth more than a colour reference. It completes a seamless joint free finish, restores and unifies the appearance of concrete floors and surfaces, and renovates existing walls and floors without demolition. Supplied as a dry powder in 25 kg bags, mixed with clean water. The UV resistant polyurethane sealer goes over it: without that coat the finish is neither trafficable nor protected, and will mark.',
    meta_description:
      'Vetotop Microcement Finish TDS: decorative microcement fine coat up to 2 mm for seamless walls and floors. Request it from Lapiz Blue UAE.',
  },

  /* Precision grout and concrete repair */
  'vetogrout-cg510': {
    description:
      'Vetogrout CG510 is a single component multipurpose non shrink cementitious grout, placed from 5 to 50 mm. Non shrink is the whole point: an ordinary cement mix contracts as it cures and leaves the base plate it was meant to support bearing on nothing. It grouts and anchors structural steel and precast concrete members, fills voids and tie rod holes, and handles under plate grouting and light machine beds. For a statically loaded base plate this is the standard specification; where the load is dynamic, an epoxy grout is the right answer instead. Supplied as a dry powder in 25 kg bags needing only clean water, which keeps site mixing simple on a pour that has to be continuous. Twelve month shelf life in sealed bags stored dry.',
    meta_description:
      'Vetogrout CG510 TDS: single component non shrink cementitious grout for base plates and anchoring, 5 to 50 mm. Download it from Lapiz Blue UAE.',
  },
  'vetogrout-cg519': {
    description:
      'Vetogrout CG519 is a high strength non shrink cementitious grout, reaching a compressive strength of 85 N per square millimetre, which is well above a structural concrete mix and is what allows a small bearing area to carry a large load. It is placed under machine bases and base plates where the design load is high and the gap is tight, and the non shrink behaviour ensures the hardened grout stays in full contact with both the plate above and the foundation below. Placement discipline decides the result: watertight formwork, a saturated surface dry substrate, continuous pouring from one side so air is driven out ahead of the grout, and air relief holes through the plate. Supplied as a dry powder in 25 kg bags, mixed with clean water.',
    meta_description:
      'Vetogrout CG519 TDS: high strength non shrink cementitious grout, 85 N/mm2, for machine bases. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Grouting machine bases and base plates under high design loads',
      'Under plate grouting where the bearing area is small',
      'Anchoring structural steel into concrete',
      'Filling voids where a high strength non shrink fill is specified',
    ],
    specs: { compressive_strength: '85 N/mm2' },
  },
  'vetogrout-eg340': {
    description:
      'Vetogrout EG340 is a three component epoxy grout formulated for dynamic loads, and that is the distinction that matters when choosing between it and a cementitious grout. A cementitious grout carries a static load well and breaks down under vibration and impact; an epoxy grout carries both. It grouts and anchors bridge bearings and pile caps, handles under plate grouting and heavy machine beds, and suits industrial applications needing chemical resistance and rapid strength development. It is also waterproof, which matters where the grout line sits in a wet or buried location. Supplied as a 30 kg kit of resin, hardener and graded filler, mixed on site in the stated proportions. The working time starts when the parts meet, so plan a continuous pour before mixing anything.',
    meta_description:
      'Vetogrout EG340 TDS: three component waterproof epoxy grout for dynamic loads, bridge bearings and machine beds. Request it from Lapiz Blue UAE.',
  },
  'vetogrout-er717': {
    description:
      'Vetogrout ER717 is a two component low viscosity epoxy injection resin, used to restore the structural integrity of cracked concrete rather than to cosmetically hide the crack. Low viscosity is what allows it to travel into a fine crack under injection pressure and bond both faces back together, which a thicker material cannot do. It is injected into retaining walls, beams, columns, shear walls and tanks, and used for grouting and static crack filling. The word static matters: injecting a crack that is still moving bonds the two faces and the structure simply cracks again alongside the repair, so the cause has to be dealt with first. Supplied as a 4 litre kit mixed on site in the stated ratio, placed through injection ports rather than poured.',
    meta_description:
      'Vetogrout ER717 TDS: two component low viscosity epoxy injection resin for structural crack repair. Request the sheet from Lapiz Blue UAE.',
  },
  'vetorep-cr520': {
    description:
      'Vetorep CR520 is a single component high strength structural repair mortar, applied by hand to broken concrete. Its defining figures are build thicknesses: up to 75 mm in a single layer vertically, and up to 20 mm overhead, which is the harder case because the material has to hold its own weight against gravity while it sets. It repairs broken structural concrete elements, the usual job being a spalled column or beam where the reinforcement has corroded and burst the cover off. The sequence decides the result: break back to sound concrete, clean and prime the exposed steel, saturate the substrate so the slab does not drink the mixing water, then build up in the stated layers. Supplied as a dry powder in 25 kg bags.',
    meta_description:
      'Vetorep CR520 TDS: single component high strength structural repair mortar, 75 mm vertical, 20 mm overhead. Request it from Lapiz Blue UAE.',
  },
  'vetorep-cr521': {
    description:
      'Vetorep CR521 is a single component non shrink flowable micro concrete, the product for a repair too large or too congested to be done by hand. Where reinforcement is densely packed, a hand applied mortar cannot be worked in behind the bars and leaves voids exactly where the repair is needed; a flowable micro concrete is poured into formwork and finds its own way around the steel. It repairs broken structural concrete elements where large segments are involved, handles heavy steel congestion, and suits repair thicknesses from 50 mm upwards. Supplied as a dry powder in 25 kg bags, mixed with clean water to a flowing consistency. Formwork has to be watertight and the pour continuous, because a cold joint inside a structural repair defeats its purpose.',
    meta_description:
      'Vetorep CR521 TDS: single component non shrink flowable micro concrete for deep and congested repairs. Request the sheet from Lapiz Blue UAE.',
  },
  'vetorep-cr523': {
    description:
      'Vetorep CR523 is a single component cementitious fairing coat, applied from a feather edge to 3 mm. A fairing coat is the finishing stage of a concrete repair rather than the repair itself: it fills surface blemishes, blowholes and hairline cracks, and unifies the colour of a patched surface so the repair stops being visible as a map of patches. It is also what gives a protective or decorative coating the smooth continuous substrate it needs, because a coating applied over an open blowhole will simply bridge it and fail there later. It fills plaster and concrete hair cracks cosmetically. Supplied as a dry powder in 25 kg bags, mixed with clean water. Apply it after the structural repair has cured, not as a substitute for one.',
    meta_description:
      'Vetorep CR523 TDS: single component cementitious fairing coat, feather edge to 3 mm, for concrete making good. Request it from Lapiz Blue UAE.',
  },
  'vetorep-er350': {
    description:
      'Vetorep ER350 is a two component epoxy putty used for sealing, anchoring and levelling where a cementitious material is not durable enough. It fills concrete surface pores and blemishes at feather edge thickness, seals surface cracks in aggressive environments and prepares them for injection repairs, and levels surface imperfections before a coating. Epoxy is chosen over a cementitious filler where chemicals, constant water or mechanical attack would erode cement, and where a very thin edge still has to hold. It also anchors into concrete. Supplied as a 5 kg kit of resin and hardener mixed on site in the stated ratio, reaching working hardness in about 24 hours. Mix only what can be used, because once the two parts meet the clock runs and the putty stiffens quickly.',
    meta_description:
      'Vetorep ER350 TDS: two component epoxy putty for sealing, anchoring and levelling concrete surfaces. Request the sheet from Lapiz Blue UAE.',
  },

  /* Bonding agents and soil stabilizer */
  'ready-mix-bond': {
    description:
      'Ready-Mix Bond is a multipurpose bonding agent and admixture supplied ready to use in 20 litre containers, applied neat without dilution. It is brushed or sprayed directly onto the substrate, and when a hand pump is used the sheet gives a spray rate of 4 to 6 square metres per litre, which is the figure to order against. Its job is to make new mortar, render or screed bond to existing concrete, a joint that will otherwise fail because fresh cementitious material does not adhere reliably to cured concrete on its own. Being ready to use removes the usual site error of over diluting a concentrate to stretch the drum, which quietly destroys the bond it was bought to create. Tools wash out in water before the material dries.',
    meta_description:
      'Ready-Mix Bond TDS: ready to use multipurpose bonding agent and admixture, 4 to 6 m2 per litre sprayed. Request it from Lapiz Blue UAE.',
  },
  'vetonit-bond-2': {
    description:
      'Vetonit Bond 2 is a low viscosity multipurpose bonding agent and admixture that does two jobs depending on how it is used. Diluted one part to two parts potable water it works as an admixture in plasters, lime and sand cement screeds, renders, mortars and cement grouts, improving adhesion and cohesion in the mix itself. Used as a bonding agent it is sprayed or brushed onto the substrate before the new material goes on. The most reliable approach is both at once: a bond coat on the prepared surface and the same polymer gauged into the mortar, so the two layers are chemically similar rather than merely pressed together. Low viscosity helps it penetrate a tight or dense surface. Supplied in 20 litre containers, with tools washed in water.',
    meta_description:
      'Vetonit Bond 2 TDS: low viscosity multipurpose bonding agent and admixture for plasters, screeds and mortars. Request it from Lapiz Blue UAE.',
  },
  'vetobond-pb433': {
    description:
      'Vetobond PB433 is a PVA based resin adhesive that works as a general adhesive, a cement modifier, a bonding agent and a sealer. It is used as a universal general purpose adhesive, as a primer over bituminous material before oil based paints are applied, and as a plaster bonding aid beneath tile and granolithic concrete toppings. One limitation decides where it belongs: PVA re emulsifies in water, so it is an internal product used in dry conditions, and specifying it on an external wall or in a permanently damp area is a known way to lose the bond months later. Where the location will ever be wet, the SBR based Vetobond PB434 is the correct choice instead. Supplied ready to use in 20 litre containers.',
    meta_description:
      'Vetobond PB433 TDS: PVA resin adhesive, cement modifier, bonding agent and sealer for internal use. Request the sheet from Lapiz Blue UAE.',
  },
  'vetobond-pb434': {
    description:
      'Vetobond PB434 is an SBR polymer bonding agent, waterproof mix enhancer and primer, and the SBR base is what makes it the external and permanently damp choice where a PVA product would re emulsify and fail. It produces high strength waterproof renders, screeds, cement slurries and mortars, enhances cementitious mixes including plasters, tile adhesives and screeds, and serves as a primer and surface treatment on prepared substrates. Gauged into a mix it raises both the strength and the water resistance of the hardened material rather than only improving the bond at the interface. Supplied ready to use in 20 litre containers, with tools washed in water before the material dries. Follow the dilution rate on the sheet rather than habit, because it differs across this range.',
    meta_description:
      'Vetobond PB434 TDS: SBR polymeric bonding agent, waterproof mix enhancer and primer for external work. Download it from Lapiz Blue UAE.',
    category: 'bonding_agent',
    dropSpecs: ['compressive_strength'],
  },
  'vetobond-ab432': {
    description:
      'Vetobond AB432 is an acrylic polymer cement modifier and bonding agent, used to improve renders, floor toppings and plasters and to prime before cementitious repair materials go on. It is the specified primer beneath the Vetorep repair range, and is used as a primer for renders and plasters on difficult substrates including fair faced concrete, where the surface is too dense and smooth for a mortar to key into on its own. Acrylic sits between PVA and SBR in behaviour: better water resistance than a PVA product, and easier to use than an SBR where conditions are not severe. Supplied ready to use in 20 litre containers. Work while the bond coat is still tacky unless the sheet says otherwise, because a fully dried coat becomes a release layer.',
    meta_description:
      'Vetobond AB432 TDS: acrylic polymer cement modifier and bonding agent for renders, toppings and repairs. Request the sheet from Lapiz Blue UAE.',
  },
  'vetobond-pb436': {
    description:
      'Vetobond PB436 is a polymeric soil stabilizer, applied to unbound ground to bind the surface rather than to bond one material to another, which sets it apart from everything else in this part of the range. Diluted and sprayed onto soil or an unsealed surface, the polymer binds the fine particles into a crust that controls dust and improves how the ground behaves under load. It is used on haul roads, laydown areas, unsealed compounds and exposed earthworks, where dust is both a nuisance and a safety and compliance issue on a UAE site. Supplied in 20 and 200 litre drums, the larger size reflecting the areas involved. Dilution and application rate depend on the soil and the duty, so confirm both against the data sheet before ordering.',
    meta_description:
      'Vetobond PB436 TDS: polymeric soil stabilizer for dust control and ground improvement, 20 and 200 litre drums. Download it from Lapiz Blue UAE.',
    applications: [
      'Stabilising unbound soil and unsealed surfaces',
      'Dust control on haul roads and laydown areas',
      'Improving load bearing behaviour of exposed ground',
      'Treating site compounds and earthworks',
    ],
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
    if (entry.applications) rec.applications = entry.applications;
    if (entry.category) rec.category = entry.category;
    if (entry.specs) rec.specs = { ...rec.specs, ...entry.specs };
    for (const key of entry.dropSpecs ?? []) delete rec.specs[key];
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

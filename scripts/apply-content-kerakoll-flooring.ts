/*
  Editorial content for the Kerakoll flooring systems line, covering primers
  and preparation coatings, mineral screeds and binders, hardwood adhesives
  and varnishes, and adhesives for resilient and textile coverings.

  Original copy, 100 to 150 words per product, written from the specs and
  product type carried on each record.

  Usage: npx tsx scripts/apply-content-kerakoll-flooring.ts
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
  'active-prime-fix': {
    description:
      'Between a prepared slab and whatever is laid over it sits a primer, and Active Prime Fix is Kerakoll’s rapid universal adhesion promoter for that layer. It is intended under self levelling products, cement based adhesives, finishing products and plasters or renders, so one bucket handles most of the preparation on a fit out instead of three separate primers. What decides whether it suits the job is the substrate: use it where the surface is absorbent and the coat above is cementitious, so suction is evened out and dust is bound in rather than left under the bond. Rapid is the operative word, because the floor can be worked on sooner. Supplied in 5 kg buckets with a 12 month shelf life. In UAE summer conditions a primer film dries quicker than the programme assumes, so confirm it is ready before pouring.',
    meta_description:
      'Active Prime Fix TDS: rapid universal adhesion promoter for self levelling compounds, cement based adhesives and renders. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Priming absorbent substrates before self levelling compounds',
      'Preparation under cement based tile adhesives',
      'Priming before finishing products',
      'Priming before plasters and renders',
      'Fit out work needing one universal primer',
      'Fast track preparation where the floor is covered sooner',
    ],
    category: 'primer',
  },
  'active-prime-grip': {
    description:
      'Active Prime Grip is the quartz finished version of Kerakoll’s rapid universal adhesion promoter, used under self levelling products, cement based adhesives, finishing products and plasters or renders. The quartz finish is the whole reason to choose it over the unfilled grade: on a dense or smooth surface, where there is little suction for a primer to work with, the texture gives the layer above a mechanical key instead of asking adhesion to do everything. So the substrate makes this decision, not the product going over it. It comes in 10 kg buckets and carries a 12 month shelf life. Store it inside rather than in a site container, because a summer in the Emirates will take months off the working life of any water based primer left to cook in the heat.',
    meta_description:
      'Active Prime Grip TDS: rapid universal adhesion promoter with a quartz finish for dense and smooth substrates. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Priming smooth or dense substrates before self levelling products',
      'Keying non porous surfaces under cement based adhesives',
      'Preparation before finishing products',
      'Preparation before plasters and renders',
      'Overlay work where a mechanical key is needed',
    ],
    category: 'primer',
  },
  'aqua-pur-basic': {
    description:
      'Once a hardwood floor is laid and sanded it still has to be protected, and Aqua-Pur Basic is the base coat in that final layer. A base coat is not a thinner version of the finish: it seals the timber, controls how much of the top coat the grain drinks, and settles the colour the finished boards will read as. Kerakoll classes it as a certified, water based varnish, so it is low odour next to a solvent system, which matters when a floor is finished in an occupied apartment or a tower on shared air handling. It carries a 12 month shelf life. Use it beneath an Aqua-Pur top coat rather than alone, and follow the sanding and recoat sequence on the data sheet, because adhesion between coats fails far more often than adhesion to the wood.',
    meta_description:
      'Aqua-Pur Basic TDS: certified water based base coat varnish sealing hardwood floors before the top coat. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Base coat varnish on new hardwood floors',
      'Sealing sanded timber before a top coat',
      'Controlling top coat absorption into the grain',
      'Low odour finishing in occupied buildings',
      'Preparation under an Aqua-Pur top coat',
    ],
    category: 'surface_treatment',
  },
  'aqua-pur-flex': {
    description:
      'Not every defect in a timber floor can be sanded away. Aqua-Pur Flex is a water based gel for filling defects and deep cracks, used after sanding and before the varnish goes on, so it belongs to the repair step of the finishing sequence rather than to the build up underneath. A gel suits the job better than a paste where the fault is deep or narrow, because it can be worked into the opening and will stay in it. The test is simple: shallow marks disappear under sanding, while anything that would still show through a varnish coat has to be filled first. Supplied in 2 litre cans with a 12 month shelf life. Let the boards acclimatise in the conditioned building before filling, or the gaps filled today will not be the gaps there next month.',
    meta_description:
      'Aqua-Pur Flex TDS: water based gel for filling defects and deep cracks in hardwood floors before varnishing. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Filling deep cracks in hardwood floors',
      'Repairing surface defects after sanding',
      'Preparation ahead of a water based varnish',
      'Narrow openings a paste filler cannot reach',
      'Refurbishment of existing timber floors',
    ],
    category: 'surface_treatment',
  },
  'aqua-pur-hpx': {
    description:
      'Aqua-Pur HPX is the treatment coat of the Aqua-Pur system, a certified water based varnish for hardwood floors and the layer that actually takes the traffic. Everything below it, the screed, the adhesive and the boards, is protected by this film, so the specification question is how hard the floor will be used and how often it can be taken out of service to be recoated. Being water based it is low odour, which keeps a fit out workable where a solvent finish would mean closing off and venting the area. It has a 12 month shelf life. Apply it over an Aqua-Pur base coat and respect the recoat window on the data sheet. In air conditioned buildings in the Emirates the surface skins quickly, so keep a wet edge and work in manageable bays.',
    meta_description:
      'Aqua-Pur HPX TDS: certified water based varnish treating and protecting hardwood floors under traffic. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Protective top coat on hardwood floors',
      'Finishing over an Aqua-Pur base coat',
      'Recoating existing timber floors',
      'Low odour finishing in occupied interiors',
      'Residential and commercial timber flooring',
    ],
    category: 'surface_treatment',
  },
  b3: {
    description:
      'B3 belongs to a floating floor rather than a bonded one. It is a certified, eco friendly organic adhesive used to secure the tongue and groove ends of floating hardwood and laminated floors, so it joins board to board instead of holding the floor down to the slab. That is the distinction that decides whether it is the right product: a glued down floor needs an L34 adhesive, while a floating floor over an underlay needs its joints bonded and nothing more. The open time is 5 minutes, which sets the pace of the work, since the joint has to be closed and the squeeze out cleaned off before it starts to skin. It has a 12 month shelf life. Clean the surplus from the board face as you go, because cured adhesive on a prefinished board is a repair, not a wipe.',
    meta_description:
      'B3 TDS: certified eco friendly adhesive bonding tongue and groove joints in floating hardwood and laminate floors. Request it from Lapiz Blue UAE.',
    applications: [
      'Bonding tongue and groove joints in floating hardwood floors',
      'Securing laminated floor joints',
      'Floating floor installations over an underlay',
      'Reinforcing board ends in long runs',
      'Low emission interior flooring work',
    ],
  },
  grinkol: {
    description:
      'Grinkol sits in the adhesive layer directly beneath a resilient or textile covering. Kerakoll classes it as a certified organic mineral adhesive for laying vinyl floors and carpet on absorbent substrates, and that last phrase is the specification test: it needs a surface that can draw water out of the adhesive, such as a cementitious screed or a levelling compound, not a sealed or dense one. Over a non absorbent surface a different chemistry is required. The open time is 90 minutes, which is generous and suits sheet goods laid in long runs where a short window would force the work into small bays. It has a 12 month shelf life. On a UAE site that open time shortens in an unconditioned space, so run the air conditioning before laying and not after.',
    meta_description:
      'Grinkol TDS: certified organic mineral adhesive for laying vinyl floors and carpet on absorbent substrates. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Laying vinyl floor coverings on absorbent substrates',
      'Bonding carpet over screeds and levelling compounds',
      'Sheet goods laid in long runs needing a long open time',
      'Interior flooring over cementitious substrates',
      'Low emission adhesive specifications',
    ],
  },
  'grintak-m': {
    description:
      'For linoleum and carpet the adhesive has to suit the backing as much as the floor, and Grintak M is Kerakoll’s certified organic mineral adhesive for laying linoleum along with standard and needle punched carpeting. It goes between the levelled substrate and the covering, which means the substrate must be finished to the flatness the covering will show, because linoleum and thin carpet telegraph every ridge beneath them. The open time is 25 minutes, noticeably shorter than the vinyl adhesives in this range, so spread only what can be covered and rolled within it. Supplied in 18 kg buckets with a 12 month shelf life. Heat shortens open time, so during a summer in the Emirates work from smaller spreads and keep the covering ready at the edge of the glue rather than across the room.',
    meta_description:
      'Grintak M TDS: certified organic mineral adhesive for linoleum, standard and needle punched carpeting. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Laying linoleum sheet and tile',
      'Bonding standard carpeting',
      'Bonding needle punched carpeting',
      'Interior floors over levelled cementitious substrates',
      'Contract flooring in offices and hospitality',
    ],
  },
  keracem: {
    description:
      'Keracem is a binder rather than a finished mortar, and that is the first thing to understand about it. Kerakoll describes it as a certified hydraulic, normal setting and rapid drying mineral binder for high performance screeds and heat radiant slabs, so it is batched with aggregate on site to form the screed layer between the structural slab and the floor covering. The reason to choose a binder over a bagged screed is volume: across a large area, mixing with local sand is cheaper and easier to get to the pour than hundreds of bags. Rapid drying is the other reason, since a conventional screed holds moisture long enough to delay every trade behind it. Supplied in 25 kg bags with a pot life of 3 hours and a 12 month shelf life. Confirm the mix proportions before the first batch.',
    meta_description:
      'Keracem TDS: certified rapid drying hydraulic mineral binder for high performance screeds and heated slabs. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Site batched high performance screeds',
      'Heat radiant floor slabs',
      'Large area screeding where bagged material is impractical',
      'Rapid drying screeds ahead of floor coverings',
      'Levelling structural slabs before a covering',
    ],
  },
  'keracem-pronto': {
    description:
      'Where Keracem is a binder to be mixed with sand, Keracem Pronto arrives ready to use: a certified, normal setting and rapid drying mineral screed designed to be covered with adhesives. It forms the screed layer over the structural slab, levelling it and carrying the adhesive and covering above. Ready to use earns its cost on a fit out, because it takes site batching out as a variable, and a screed mixed by eye varies in strength from one gang to the next. The phrase worth noting is covered with adhesives: this is a screed to bond a covering onto, not a wearing surface in itself. Supplied in 25 kg bags with a 3 hour pot life and a 12 month shelf life. Rapid drying is what shortens the wait before a covering can go down in a humid coastal climate.',
    meta_description:
      'Keracem Pronto TDS: certified ready to use rapid drying mineral screed to be covered with flooring adhesives. Request it from Lapiz Blue UAE.',
    applications: [
      'Ready to use screeds over structural slabs',
      'Screeding ahead of bonded floor coverings',
      'Fit out work where site batching is impractical',
      'Rapid drying screeds on tight programmes',
      'Levelling before tiling and resilient flooring',
    ],
  },
  'keracem-prontoplus': {
    description:
      'Keracem Prontoplus is the fibre reinforced member of the Keracem family, a certified ready to use, normal setting and rapid drying mineral screed to be covered with adhesives. It occupies the same layer as Keracem Pronto, between the structural slab and the floor covering, and the fibres are the reason to choose it: dispersed reinforcement controls the fine shrinkage cracking a screed is prone to across large bays and over services. If the screed will be thin, heated or broken up by a complicated floor plan, that matters. The pot life is 2 hours, an hour shorter than Pronto, so plan the pour in smaller sections. Supplied in 25 kg bags with a 12 month shelf life. Protect a fresh screed from direct sun and site draughts, which in the Emirates dry the surface long before the body has cured.',
    meta_description:
      'Keracem Prontoplus TDS: certified fibre reinforced ready to use rapid drying mineral screed for floor coverings. Request it from Lapiz Blue UAE.',
    applications: [
      'Fibre reinforced screeds over structural slabs',
      'Large bays where shrinkage cracking is a risk',
      'Screeding over services and heated elements',
      'Rapid drying screeds beneath bonded coverings',
      'Ready to use screeding on fit out programmes',
    ],
  },
  keradur: {
    description:
      'Keradur is applied before anything else in the build up. It is a certified water based deep consolidant for absorbent substrates, and consolidating is a different job from priming: a primer conditions a surface for the next coat, while a consolidant penetrates a weak, friable or dusty substrate and binds it back together so there is something sound to build on. Use it where a screed is chalky, over sanded or simply old and a primer alone would sit on loose material. If the substrate is already sound, a primer is the cheaper and correct choice. Supplied in 5 kg cans with a 12 month shelf life. On refurbishment work in the Emirates, old screeds under lifted tiles are often weaker than they look once the bed has been ground off, so test the surface before deciding which route to take.',
    meta_description:
      'Keradur TDS: certified water based deep consolidant strengthening weak and dusty absorbent substrates. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Consolidating weak or friable screeds',
      'Binding dusty absorbent substrates',
      'Refurbishment where old screeds are exposed',
      'Preparation before primers and levelling compounds',
      'Strengthening substrates before flooring work',
    ],
  },
  'keragrip-pulep': {
    description:
      'Non absorbent substrates are the awkward case in flooring, and Keragrip Pulep is made for them: an organic preparation coat for the treatment and cleaning of surfaces that will not take water in. Existing ceramic, resin and other sealed floors give an adhesive nothing to key into, and they usually carry a film of polish, oil or release agent as well. This product treats and cleans that surface so the layer above can bond, which puts it at the preparation step, below any primer or adhesive. A water drop decides it: if the substrate absorbs, use a consolidant or a primer instead. Supplied in 10 litre drums with a 12 month shelf life. Overlaying rather than removing an existing tiled floor is common on UAE fit outs, and this is the step that makes the overlay dependable.',
    meta_description:
      'Keragrip Pulep TDS: organic preparation coat treating and cleaning non absorbent substrates before flooring. Request it from Lapiz Blue UAE.',
    applications: [
      'Preparing existing ceramic and resin floors',
      'Treating non absorbent substrates before adhesives',
      'Cleaning sealed surfaces ahead of an overlay',
      'Tile over tile refurbishment work',
      'Preparation under levelling compounds on dense substrates',
    ],
  },
  kerarep: {
    description:
      'Kerarep is a repair product rather than a layer of its own: an extra fast acting bonding agent for gaps and cracks, used to stabilise a substrate before the floor goes over it. Cracks and open joints in a screed do not stay where they are once a covering is bonded across them, so they are either filled and bonded or they come back through the finish. Extra fast acting is the point, because this work falls in the gap between preparation and laying, and a product that needs a day to cure stops the whole sequence. Reach for it on localised faults, since a generally weak screed needs a consolidant instead. The shelf life is 18 months, longer than most of this range, so it is practical to keep a container on the van for cracks nobody saw until the old covering came up.',
    meta_description:
      'Kerarep TDS: extra fast acting bonding agent for repairing gaps and cracks in screeds and floor substrates. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Bonding and filling cracks in screeds',
      'Stabilising open joints before a covering is laid',
      'Localised substrate repairs on refurbishment work',
      'Fast turnaround repairs between preparation and laying',
      'Remedial work once an old covering has been lifted',
    ],
    category: 'bonding_agent',
  },
  'l34-evolution': {
    description:
      'L34 Evolution is the adhesive layer under a glued down hardwood floor, specified by Kerakoll as an odourless, two component organic mineral adhesive for high performance laying. Two components mean a reactive cure that does not depend on water leaving the adhesive, which is what lets hardwood be bonded over substrates and in board thicknesses where a water based adhesive would move the timber. Odourless is the practical differentiator: a hardwood floor is often laid late in a fit out, in a building that is already partly occupied, and odour decides whether that is possible at all. The pot life and open time are both 90 minutes, so a mixed batch and a spread bed give the same working window. It has a 12 month shelf life. Acclimatise the boards in the conditioned space before laying, never in a hot store.',
    meta_description:
      'L34 Evolution TDS: odourless two component organic mineral adhesive for high performance hardwood floor laying. Request it from Lapiz Blue UAE.',
    applications: [
      'Bonding hardwood floors to prepared substrates',
      'High performance laying of wide and thick boards',
      'Odour sensitive fit outs and occupied buildings',
      'Timber flooring where a water based adhesive is unsuitable',
      'Large areas needing a 90 minute working window',
    ],
  },
  'l34-flex': {
    description:
      'Supplied in a 290 ml cartridge rather than a bucket, L34 Flex is not a bedding adhesive for a whole floor but a certified, eco friendly elastic organic mineral adhesive for the high performance laying of hardwood, used where a gun is the right tool. Elastic is the characteristic that matters: the cured bond flexes, so it takes up movement between the boards and what they are fixed to instead of cracking along the joint. Use it for detail work, perimeters, repairs and fixings a trowelled bed cannot reach. The open time is 60 minutes and the shelf life is 12 months. Keep cartridges out of the sun on site, because a cartridge left on a hot slab in the Emirates will be stiff enough to be unusable by the time the fitter needs it.',
    meta_description:
      'L34 Flex TDS: certified elastic organic mineral cartridge adhesive for hardwood floor detail and repair work. Request it from Lapiz Blue UAE.',
    applications: [
      'Gun applied fixing of hardwood boards',
      'Perimeter and detail work on timber floors',
      'Localised repairs and replacement boards',
      'Elastic bonds where movement has to be accommodated',
      'Low emission timber flooring installations',
    ],
  },
  'l34-hybrid': {
    description:
      'Single component is the distinction that defines L34 Hybrid, an organic mineral adhesive for the high performance laying of hardwood floors. There is nothing to mix, so there is no ratio to get wrong and no mixed batch wasted if the day stops early, which is why a single component adhesive is often chosen for smaller areas and for work that proceeds in stages. It still occupies the same layer as the two component grades, bonding boards to the prepared substrate. The open time is 60 minutes, shorter than the mixed L34 adhesives, so spread the bed in sections the fitter can stay ahead of. Supplied in 16 kg buckets with a 12 month shelf life. Close the bucket between sessions, since a single component adhesive reacts with moisture in the air and coastal air in the UAE carries plenty of it.',
    meta_description:
      'L34 Hybrid TDS: single component organic mineral adhesive for high performance hardwood floor laying. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Bonding hardwood floors without site mixing',
      'Smaller areas and phased flooring work',
      'High performance laying over prepared substrates',
      'Installations where mixed adhesive would be wasted',
      'Timber flooring in residential and commercial interiors',
    ],
  },
  'l34-plus': {
    description:
      'L34 Plus is a certified organic mineral adhesive for the high performance laying of hardwood floors, the layer that holds the boards to the prepared screed. Its pot life of 90 minutes shows the material is mixed before use, and that figure, matched by a 90 minute open time, sets the size of bay a fitter should work in: mix no more than can be spread and covered within it. Against the Evolution grade it is the straightforward choice where low odour is not the deciding factor on site. As with every bonded timber floor the substrate decides the outcome, so the screed has to be flat, sound and dry to the figure on the data sheet before any adhesive is spread. It has a 12 month shelf life. Store it off the floor and out of direct heat.',
    meta_description:
      'L34 Plus TDS: certified organic mineral adhesive for the high performance laying of hardwood floors. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Bonding hardwood floors to screeds and levelled substrates',
      'High performance laying of solid and engineered boards',
      'Areas suited to a 90 minute open time',
      'Timber flooring in residential and contract interiors',
      'Work where a reactive adhesive is specified',
    ],
  },
  'primer-uni': {
    description:
      'Primer Uni is a universal consolidating adhesion promoter for mortars and plasters or renders, which puts it at the interface between a prepared substrate and the cementitious layer going over it. Consolidating is the useful word: it binds the surface as well as promoting adhesion, so it suits a substrate that is sound but dusty, where a plain bonding primer would simply seal the dust in place. Choose it where the coat above is a mortar, a render or a plaster; where the next layer is a self levelling compound or a tile adhesive, the Active Prime products are the intended match. Supplied in 5 kg buckets with a 12 month shelf life. Dusty substrates are a constant on UAE sites, so vacuum rather than sweep before priming, or the primer does its work on the dust instead of the slab.',
    meta_description:
      'Primer Uni TDS: universal consolidating adhesion promoter for mortars, plasters and renders on dusty substrates. Request it from Lapiz Blue UAE.',
    applications: [
      'Priming substrates before mortars',
      'Preparation before plasters and renders',
      'Consolidating sound but dusty surfaces',
      'Improving adhesion of cementitious layers',
      'General preparation on repair and finishing work',
    ],
  },
  'pu-70': {
    description:
      'Of the resilient adhesives in this range, PU 70 is the one that does not care whether the substrate absorbs. Kerakoll classes it as an organic mineral adhesive for laying rubber, PVC and carpet flooring and artificial turf on absorbent and non absorbent substrates, which is what makes it the answer over existing ceramic, resin or sealed surfaces where a water dispersion adhesive would never cure. Artificial turf is the other clue to its use: it holds coverings in places a dispersion adhesive cannot be trusted. The pot life is 1 hour and the open time 30 minutes, both short, so the work has to be organised before mixing starts. It has a 12 month shelf life. In UAE heat those times are an outside limit rather than an expectation, so mix small and keep the covering to hand.',
    meta_description:
      'PU 70 TDS: organic mineral adhesive for rubber, PVC, carpet and artificial turf on absorbent and non absorbent substrates, from Lapiz Blue UAE.',
    applications: [
      'Laying rubber floor coverings',
      'Bonding PVC flooring on sealed or dense substrates',
      'Carpet laying over non absorbent surfaces',
      'Fixing artificial turf',
      'Overlay work on existing ceramic and resin floors',
    ],
  },
  quarzo: {
    description:
      'Quarzo is not a layer by itself but the aggregate that makes other layers work: calibrated mineral quartz of controlled granulometry, washed and perfectly dry. Controlled grading and dryness are exactly what site sand does not offer, and both matter, because a filler of known particle size is what gives a primer or resin coat its texture, its build and its stability. It is broadcast into a primer to key the next layer, blended into mortars and resins where a filler is specified, and used wherever a clean dry quartz is called for in the build up. The decision is straightforward: where a data sheet specifies a graded quartz, local sand is not a substitute. Supplied in 25 kg bags. Keep bags sealed and off the ground on site, since damp quartz defeats the one property it was bought for.',
    meta_description:
      'Quarzo TDS: calibrated washed mineral quartz of controlled granulometry for broadcasting and filling. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Broadcasting into primers to key the next layer',
      'Graded filler for mortars and resin systems',
      'Building texture and slip resistance into coatings',
      'Preparation work needing a clean dry quartz',
      'Mixes where site sand is not acceptable',
    ],
  },
  'r3-plus': {
    description:
      'R3 Plus is the general purpose adhesive layer beneath thin resilient and textile coverings. Kerakoll specifies it as a certified organic mineral adhesive for laying PVC, LVT and rubber coverings up to a thickness of 3 mm, along with linoleum and carpet, on absorbent substrates. Two limits in that sentence decide whether it fits: the 3 mm thickness, above which a heavier duty adhesive is needed, and the absorbent substrate, which rules it out over sealed or dense surfaces where PU 70 is the alternative. Thin coverings also demand a properly levelled base, because they reveal every imperfection in it. The open time is 60 minutes and the shelf life 12 months. LVT is laid in volume across UAE retail and residential work, so match the trowel notch to the plank and roll the floor as the data sheet asks.',
    meta_description:
      'R3 Plus TDS: certified organic mineral adhesive for PVC, LVT, rubber up to 3 mm, linoleum and carpet. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Laying LVT planks and tiles',
      'Bonding PVC and rubber coverings up to 3 mm thick',
      'Linoleum installations on absorbent substrates',
      'Carpet laying over screeds and levelling compounds',
      'Retail and residential resilient flooring',
    ],
  },
  'remover-pro': {
    description:
      'Before anything is laid or bonded, a floor has to be clean in a way sweeping does not achieve. Remover Pro is a concentrated wax removing detergent for taking residual wax, oil and grease off resin, resilient, marble and ceramic floors, so it belongs to the preparation step and also serves the maintenance of a finished floor. Contamination is the quiet cause of adhesive and coating failure: a surface can look sound and still carry a film nothing will bond through, and over an existing non absorbent floor that film is almost always there. Being concentrated it is diluted to suit the job, so follow the dilution on the data sheet rather than using it neat. It has a 12 month shelf life. Rinse thoroughly and let the floor dry, because detergent residue is just another contaminant.',
    meta_description:
      'Remover Pro TDS: concentrated detergent removing residual wax, oil and grease from resin, resilient, marble and ceramic floors. From Lapiz Blue UAE.',
    applications: [
      'Removing residual wax from existing floors',
      'Degreasing resin and resilient surfaces',
      'Cleaning marble and ceramic before an overlay',
      'Preparation ahead of adhesives and coatings',
      'Deep cleaning as part of floor maintenance',
    ],
    category: 'surface_treatment',
  },
  tack: {
    description:
      'Tack is the adhesive for a covering that is not meant to be permanently bonded. It is an organic adhesive for fixing self laying PVC and rubber floor coverings on compact absorbent and non absorbent substrates, which means it holds the covering in place and resists movement while still allowing a tile or plank to be lifted and replaced. That is the whole basis for choosing it: where a floor has to stay maintainable, in a retail unit or an office over underfloor services, a permanent bond is a liability rather than a benefit. The word compact matters too, since a loose or dusty surface has to be consolidated first. The open time is 60 minutes and the shelf life 12 months. Supplied in 10 kg buckets. Confirm the covering is made for self laying before using it.',
    meta_description:
      'Tack TDS: organic adhesive fixing self laying PVC and rubber floor coverings on compact absorbent and non absorbent substrates. From Lapiz Blue UAE.',
    applications: [
      'Fixing self laying PVC tiles and planks',
      'Holding self laying rubber coverings in place',
      'Floors that have to stay liftable and replaceable',
      'Compact absorbent and non absorbent substrates',
      'Retail and office areas over underfloor services',
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
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words`);
    if (entry.meta_description.length > 165) warnings.push(`${slug}: meta ${entry.meta_description.length} chars`);
    if (/[–—]/.test(entry.description + entry.meta_description)) warnings.push(`${slug}: em or en dash`);

    rec.description = entry.description;
    rec.meta_description = entry.meta_description;
    rec.applications = entry.applications;
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

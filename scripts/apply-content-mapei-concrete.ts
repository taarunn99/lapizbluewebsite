/*
  Editorial content for the Mapei concrete additives and repair systems line and
  the Mapei sealants and anchoring line.

  Three different jobs live in these two lines and the copy keeps them apart:
  admixtures that go into the mix at the batching plant (Dynamon, Mapeair,
  Mapequick, Mapetard, Planicrete), repair materials applied to hardened
  concrete that has already failed (Mapegrout, Planitop, Mapefer, MapeWrap,
  Adesilex), and sealants, grouts and adhesives that fill a joint or fix
  something into the structure (Mapesil, Mapeflex, Mapefill, Ultrabond).

  Original copy, 100 to 150 words per product. Also writes the applications
  lists, which the harvest left empty, corrects a handful of categories the
  automatic classifier placed by wording rather than function, and clears or
  repairs spec values the PDF extractor captured mid sentence.

  Products with fewer than five spec fields are not included; they are held
  back by the gate until their sheets yield more data.

  Usage: npx tsx scripts/apply-content-mapei-concrete.ts
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
  /* Concrete admixtures: dosed into the mix at the batching plant */
  'dynamon-mr-2100': {
    description:
      'Dynamon MR2100 is a chloride free hyperplasticising admixture based on polymer modified polycarboxylate ether, added to the mix at the batching plant and not to be confused with anything applied to hardened concrete. It conforms to ASTM C494 as Type G and to EN 934-2, and is aimed at ready mix plants producing high performance concrete by cutting the water to cement ratio. What decides its use is the mix design rather than the structure: it is recommended with GGBS and tri-blend mixes, mass pours that need cohesion, piling mixes, raft foundations and precast work where high early and ultimate strengths are wanted. Normal dosage is 0.8 to 2.5 litres per 100 kg of total cementitious material. Pouring in hot climates is a listed use, which matters on a UAE summer programme.',
    meta_description:
      'Dynamon MR2100 TDS: chloride free polycarboxylate superplasticiser for ready mix concrete, 0.8 to 2.5 litres per 100 kg. Download it from Lapiz Blue UAE.',
    applications: [
      'High performance concrete needing exceptional workability and durability',
      'Precast elements requiring increased early and ultimate strengths',
      'Mixes containing fly ash, silica fume, GGBS and tri-blends',
      'Mass concrete pours needing improved cohesion',
      'Piling mixes and raft foundations',
      'Pouring in hot climates',
    ],
  },
  'dynamon-mr-3000': {
    description:
      'Specified where a ready mix plant needs the water content down without losing fluidity, Dynamon MR3000 is a chloride free hyperplasticising admixture formulated from polymer modified polycarboxylate ether. It conforms to ASTM C494 as Type G and to EN 934-2. Normal dosage is 0.5 to 2.5 litres per 100 kg of total cementitious material, and an overdose does not adversely affect setting times, which is a useful margin for a plant running several mixes a day. It is recommended with GGBS and tri-blend mixes, for precast and in situ concrete needing an exceptionally high level of finish, and for mass pours, piling mixes and raft foundations. The admixture goes in after 50 to 70 per cent of the mixing water through a calibrated dispenser, separately from any other admixture in the same mix.',
    meta_description:
      'Dynamon MR3000 TDS: chloride free hyperplasticiser for high performance ready mix concrete, 0.5 to 2.5 litres per 100 kg. Request it from Lapiz Blue UAE.',
    applications: [
      'High performance ready mix concrete with a reduced water to cement ratio',
      'Precast and in situ concrete requiring a high level of finish',
      'Fly ash, silica fume, GGBS and tri-blend mixes',
      'Mass concrete pours with improved cohesion',
      'Piling mixes and raft foundations',
      'Pouring in hot climates',
    ],
  },
  'dynamon-sr-1200': {
    description:
      'Dynamon SR1200 is a chloride free superplasticising admixture based on polymer modified polycarboxylate ether, dosed into the mix at the batching plant rather than applied to finished concrete. It complies with ASTM C494 as Type G and with EN 934-2. The choice between it and the rest of the Dynamon range rests on what the mix has to do: SR1200 is formulated for very low water to cement ratios with long slump retention in hot climates, so it suits self compacting concrete in heavily reinforced and congested sections, piling mixes, raft foundations and precast where early strength counts. Typical dosage is 0.5 to 2.0 litres per 100 kg of total cementitious material, with the optimum settled by site trials on the actual cement and aggregates. On a UAE summer pour, slump retention is what gets the last truck placed.',
    meta_description:
      'Dynamon SR1200 TDS: superplasticiser for low water cement ratios and long slump retention in hot climates. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Self compacting concrete in heavily reinforced and congested sections',
      'High performance concrete with very low water to cement ratios',
      'Precast elements requiring increased early and ultimate strengths',
      'Fly ash, silica fume, GGBS and tri-blend mixes',
      'Piling mixes and raft foundations',
      'Pouring in hot climates',
    ],
  },
  'dynamon-sr-2400': {
    description:
      'Dynamon SR2400 is a third generation chloride free hyperplasticising admixture based on polycarboxylate polymers, complying with ASTM C494 as Type G and with EN 934-2. Its distinguishing point within the range is that it is formulated for concrete made with aggregates containing clay, a common frustration where washed aggregate is not available and clay fines rob a conventional superplasticiser of its effect. Dosage runs from 0.5 to 1.5 litres per 100 kg of cementitious content for normal concrete and 0.8 to 2.0 litres for high performance mixes, confirmed by trial. It is used in high strength and ready mix concrete, fly ash, silica fume and slag mixes, mass concrete, pile mixes and raft foundations. One compatibility limit decides whether it can be used at all: it must never be combined with naphthalene based superplasticisers.',
    meta_description:
      'Dynamon SR2400 TDS: third generation superplasticiser for ready mix concrete and clay bearing aggregates. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'High strength and ready mix concrete',
      'Concrete made with aggregates containing clay',
      'Fly ash, silica fume and slag concrete',
      'Mass concrete pours',
      'Pile mixes and raft foundations',
      'Pouring in hot climates',
    ],
  },
  'mapeair-la-p': {
    description:
      'Mapeair LA/P is a powdered foaming agent that entrains a high volume of air into a cement mix, which puts it among the admixtures rather than the repair or sealing products. Added at mixing, it produces lightweight mortar, lightweight concrete and flowable fill: the entrained air cuts density, removes the risk of segregation and gives a mix that stays fluid at a low water content and pumps easily. Typical uses are mortar and concrete made with pumice, expanded clay or polystyrene aggregate for insulation value, super fluid mixes with a low modulus of elasticity, filling ground cuts after pipe laying, and inerting cavities. Average dosage is one 0.5 kg bag per cubic metre of mix. Store in closed containers away from frost and direct sunlight, which on a UAE site means out of the sun.',
    meta_description:
      'Mapeair LA/P TDS: foaming agent for lightweight mortar, lightweight concrete and flowable fill, one 0.5 kg bag per cubic metre. From Lapiz Blue UAE.',
    applications: [
      'Lightweight mortar and lightweight concrete',
      'Flowable fill and filling ground cuts after pipe laying',
      'Mixes with pumice, expanded clay or polystyrene aggregate',
      'Super fluid mixes with a low modulus of elasticity',
      'Filling spaces in hollow wall masonry',
      'Inerting cavities',
    ],
  },
  'mapequick-af-70': {
    description:
      'An accelerator rather than a repair product, Mapequick AF 70 is a liquid alkali free admixture dosed into sprayed concrete so that shotcrete sets quickly and gains strength after a very short curing time. It works in both wet mix and dry mix spray systems and conforms to ASTM C1141 and EN 934-5. The absence of alkali is the reason to choose it: concrete develops high mechanical resistance within minutes of placing with almost no loss of final strength against an unaccelerated mix, and the handling risk of an alkaline accelerator goes away. Dosage by weight is 3 to 10 kg per 100 kg of cement. Typical work is securing surfaces during tunnelling, consolidating rock and cliff faces, structural tunnel repairs and final linings. Shake the drum after long storage, because it is a suspension and will settle.',
    meta_description:
      'Mapequick AF 70 TDS: alkali free accelerator for sprayed concrete in wet and dry mix systems, 3 to 10 kg per 100 kg cement. Request it from Lapiz Blue UAE.',
    applications: [
      'Securing surfaces during tunnelling',
      'Sprayed concrete with high mechanical performance',
      'Consolidation of rock and cliff faces',
      'Sprayed concrete for structural tunnel repairs',
      'Final tunnel linings in sprayed concrete',
      'Wet mix and dry mix spray systems',
    ],
  },
  'mapetard-rcc-me': {
    description:
      'Mapetard RCC ME is a liquid retarding admixture with a plasticising effect, used to hold a cementitious mix workable rather than to speed anything up. Added at batching, it inhibits setting so that workability is maintained for up to 72 hours after the mix is batched, which is why it belongs with long transport runs, pumping from the surface, delays in injecting and any grout that cannot be placed in one shift. It conforms to ASTM C494. Supplied in bulk, in 1000 litre IBCs and in 25 kg jerrycans, with a two year shelf life in closed containers kept above 5 degrees and out of direct sunlight. Heat shortens the working life of every cementitious mix, so on a UAE site this admixture is doing in reverse exactly what the weather does, and it earns its place in summer grouting.',
    meta_description:
      'Mapetard RCC ME TDS: liquid retarding admixture with plasticising effect, workability maintained up to 72 hours. Download the sheet from Lapiz Blue UAE.',
    applications: [
      'Cementitious mixes that need long workability',
      'Offsetting long transportation times',
      'Pumping cementitious mixes from the surface',
      'Grouting where injection may be delayed',
      'Mixes batched in very hot conditions',
    ],
  },
  planicrete: {
    description:
      'Planicrete is a synthetic rubber latex gauged into cement mixes to improve their adhesion and mechanical performance, so it modifies a mortar rather than being one. It is used as an admixture in cement based screeds, renders and thin smoothing layers, and in highly adhesive cement bonding slurries. Typical work includes high strength screeds and renders inside and out, bonding slurries that let a new screed hold onto an existing one, cementitious slurry for laying natural stone with the Mapestone system, adhesive shotcrete for bonding renders, and mortars for filling holes and finishing precast elements. It is applied between 5 and 40 degrees, supplied in 25 kg and 5 kg containers, and keeps for 24 months unopened. Where the finished surface takes abrasion, such as a ramp or a channel, the latex earns its cost several times over.',
    meta_description:
      'Planicrete TDS: synthetic rubber latex admixture that improves adhesion of screeds, renders and bonding slurries. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Admixture for cement based screeds, renders and thin smoothing layers',
      'Highly adhesive cement bonding slurries',
      'High strength screeds and renders for interior and exterior use',
      'Bonding slurry for laying natural stone with the Mapestone system',
      'Adhesive shotcrete for bonding renders',
      'Mortars for filling holes and finishing precast elements',
    ],
    category: 'bonding_agent',
    specs: { consistency: 'fluid liquid' },
  },
  'planicrete-sp': {
    description:
      'Planicrete SP is a multipurpose latex additive for mortars and a component of cementitious mortar adhesives, which places it with the mix modifiers and not with the repair or sealing ranges. Gauged into a mix it produces high performance mortar, screeds and renders: high resistance screeds and levelling compounds for interior and exterior use, cement renders, high adhesion cement slurry for bonding new screeds onto existing screeds and concrete, and cement mortar adhesive for fixing ceramic tiles on walls and floors. It also lets a cement mortar be applied in thin layers. The mixed material has a pot life of about 90 minutes and an open time of 10 to 15 minutes, applied between 5 and 35 degrees. That short open time is the figure to watch on a hot, windy UAE site, where a skinned bed stops bonding.',
    meta_description:
      'Planicrete SP TDS: multipurpose latex additive for high performance mortar, screeds and renders, 90 minute pot life. Download it from Lapiz Blue UAE.',
    applications: [
      'High resistance screeds and levelling compounds, interior and exterior',
      'Cement renders for interior and exterior use',
      'High adhesion cement slurry for bonding new screeds to existing ones',
      'Cement mortar adhesive for ceramic tiles on walls and floors',
      'Modifying cement mortars applied in thin layers',
    ],
    category: 'bonding_agent',
    specs: { consistency: 'very pasty' },
    dropSpecs: ['bond_strength', 'coverage', 'mixing_ratio'],
  },

  /* Repair mortars and systems: applied to hardened concrete that has failed */
  'mapegrout-t60-me': {
    description:
      'Mapegrout T60 ME is a thixotropic, fibre reinforced structural repair mortar classified R4 under EN 1504-3, applied to concrete that has already deteriorated rather than added to a fresh mix. Thixotropic means hand applied: it is trowelled or sprayed onto vertical surfaces in layers up to 60 mm thick and overhead in layers up to 30 mm, with no formwork, from a minimum of 10 mm. Where a section is deeper, or the reinforcement too congested for mortar to be worked in behind the bars, a flowable micro concrete poured into formwork is the correct answer instead. Sulphate and chloride resistance is why it suits marine structures, sewerage, tunnels and water retaining works, and the UAE coastal and groundwater conditions that drove the corrosion in the first place. Pot life is about an hour, applied between 5 and 50 degrees.',
    meta_description:
      'Mapegrout T60 ME TDS: R4 thixotropic fibre reinforced repair mortar, hand applied 10 to 60 mm vertically, 30 mm overhead. From Lapiz Blue UAE.',
    applications: [
      'Reinstating cover to corroded reinforcing steel',
      'Repairs to manholes, sewerage structures and utilities',
      'Water retaining structures, tunnels and canal linings',
      'Industrial facilities including oil and gas and marine structures',
      'Filling rigid joints between base and column',
      'Repair of precast concrete elements',
    ],
    dropSpecs: ['bond_strength'],
  },
  'mapegrout-t80': {
    description:
      'Single component and fibre reinforced, Mapegrout T80 is a thixotropic repair mortar for hardened concrete, classified R4, with resistance to sulphate and chloride attack. It is hand applied: trowelled or sprayed onto vertical surfaces in layers up to 60 mm and overhead up to 30 mm, from a minimum of 10 mm, with no formwork needed. Its application list leans towards duty that other repair mortars struggle with, including floors that must resist oils and lubricants and take heavy abrasion in industrial settings, load bearing columns, pre-stressed and post-tensioned beams and slabs, canal linings, tunnels and manholes. Reinstating concrete cover lost to corroded reinforcement is the bread and butter job. Pot life is about an hour and the working range runs from 5 to 50 degrees, which covers most of a UAE year without special measures.',
    meta_description:
      'Mapegrout T80 TDS: single component R4 thixotropic repair mortar, sulphate and chloride resistant, 10 to 60 mm by trowel or spray. From Lapiz Blue UAE.',
    applications: [
      'Structural repairs applied by trowel or spray',
      'Industrial floors resisting oils, lubricants and heavy abrasion',
      'Repair of columns, pre-stressed and post-tensioned beams and slabs',
      'Canal linings, water retaining structures, tunnels and manholes',
      'Concrete in marine environments and chloride exposure',
      'Reinstating concrete cover damaged by corroded steel',
    ],
  },
  'mapegrout-tx-60-me': {
    description:
      'Mapegrout TX 60 ME is a single component, thixotropic, high strength fibre reinforced repair mortar, classified R4, for patching concrete that has failed. Coat thickness runs from 10 to 60 mm, trowelled or sprayed on vertical surfaces up to 60 mm and overhead up to 30 mm without formwork, so it covers the hand applied half of a repair specification. Deeper sections and heavily congested reinforcement want a poured micro concrete instead. The application list is full of aggressive environments: honeycombing in beams, columns, walls and slabs in high rise work, marine and water treatment structures, sewerage facilities, tunnels, pipes, cooling towers and chimneys, and oil and gas installations. Every 25 kg bag yields 13 litres of mixed mortar, which is the figure to order against. Chloride and sulphate resistance suits UAE coastal and below ground exposure.',
    meta_description:
      'Mapegrout TX 60 ME TDS: R4 single component thixotropic repair mortar, coat thickness 10 to 60 mm, 13 litres per bag. Request it from Lapiz Blue UAE.',
    applications: [
      'Honeycombing in beams, columns, walls and slabs in high rise work',
      'Marine, water treatment and sewerage structures',
      'Tunnels, pipes and below ground construction',
      'Cooling towers, chimneys and industrial environments',
      'Water retaining and excluding structures and canal linings',
      'Repair of precast concrete elements',
    ],
  },
  'mapegrout-sv-me': {
    description:
      'Mapegrout SV ME sits on the flowable side of the repair range: a fast setting, shrinkage compensated, easy flow mortar poured into formwork or a defined space in thicknesses up to 50 mm without segregating. Speed is the reason to choose it. Industrial floors, highways and airport works that have to be reopened to traffic quickly are its home ground, along with fixing inspection shafts, manholes, road signs, kerbstones, drain covers and concrete pylons. Pot life is 40 minutes at 23 degrees, and in a UAE summer it will be less, so batch only what can be placed, keep the water cool and never stretch a mix that has begun to stiffen. Consumption is 23 kg per square metre at 10 mm thickness, with each 25 kg bag yielding 12.25 litres. The working range is 5 to 40 degrees.',
    meta_description:
      'Mapegrout SV ME TDS: fast setting R4 easy flow repair mortar up to 50 mm, 40 minute pot life, reopen to traffic fast. Download from Lapiz Blue UAE.',
    applications: [
      'Badly damaged concrete needing a high flowing mortar',
      'Industrial floors in warehouses and shopping centres',
      'Concrete pavements and airport floors',
      'Rapid fixing of inspection shafts and manholes',
      'Fixing road signs, fencing and drain covers',
      'Anchoring kerbstones and protection barriers',
    ],
    specs: { mixing_ratio: '100 parts of Mapegrout SV ME with 12-13 parts of water' },
  },
  'mapegrout-me05': {
    description:
      'A poured repair rather than a hand applied one, Mapegrout ME05 is a high flow, shrinkage compensated micro concrete classified R4, placed in sections from 15 mm up to 220 mm. It is pumped or poured into formwork and finds its own way around dense reinforcement, which a trowelled mortar cannot do without leaving voids behind the bars. Typical work is pile top treatment and re profiling, column jacketing, structural reinstatement of beams and columns, honeycombed concrete, floor beams and slabs, and grouting of precast elements, machine and turbine baseplates, bridge bearings and crane rails. Mixing is 100 parts powder to 13 per cent water and each 25 kg bag yields 12.7 litres. Grout tight formwork and a continuous pour matter more here than anywhere else, because a cold joint inside a structural repair undoes the repair.',
    meta_description:
      'Mapegrout ME05 TDS: R4 high flow shrinkage compensated micro concrete for sections from 15 to 220 mm. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Pile top treatment and re profiling',
      'Column jacketing and structural reinstatement of beams',
      'Honeycombed concrete and areas of congested reinforcement',
      'Reinstatement of floor beams and slabs',
      'Grouting of precast elements',
      'Grouting machine baseplates, bridge bearings and crane rails',
    ],
    specs: { mixing_ratio: '100 parts by weight of Mapegrout ME05 with 13% water' },
  },
  'mapegrout-me06': {
    description:
      'Mapegrout ME06 is a high strength, shrinkage compensated super flow micro concrete for structural repairs where the section is deep: gaps from 30 mm to 250 mm, poured into formwork without the aggregate segregating. The depth range is the deciding factor. Below 30 mm, or on a vertical face with no formwork, a thixotropic hand applied mortar is the right product; above it, only a flowing micro concrete fills the space reliably. It reinstates reinforced concrete beams and pillars, floor beams and slabs after scarifying, industrial, road and airport floors, and grouts machine baseplates, bridge bearings and pile tops. Each 25 kg bag takes 3.1 to 3.4 litres of water, with a pot life of about one hour at 23 degrees. Formwork must be grout tight and preferably water tested, with standing water removed before the pour.',
    meta_description:
      'Mapegrout ME06 TDS: R4 super flow micro concrete for deep structural repairs and gaps from 30 to 250 mm. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Structural reinstatement of reinforced concrete beams and pillars',
      'Floor beams and slabs after scarification',
      'Restoring industrial, road and airport concrete floors',
      'Grouting machine baseplates and bridge bearings',
      'Repair and reprofiling of pile tops',
    ],
  },
  'mapegrout-pt-me': {
    description:
      'Mapegrout PT ME is a sand free, super fluid cementitious injection grout, mixed thin enough to be pumped long distances without bleeding or segregating. Its purpose is corrosion protection inside post-tensioning cable ducts, filling them horizontally and vertically in new work and repair grouting voids and cavities in existing ones. Because there is no sand in it, it also serves as a slurry for narrow cavities and cracks in rock or damaged concrete and for consolidating loose soil. Minimum application thickness is 2 mm, which tells you the gaps it is meant for. Mixing is 100 parts powder to 34 per cent water, and a 25 kg bag yields roughly 16 to 17 litres of grout depending on the water added. This is a specialist pumped grout and no substitute for a repair mortar on an exposed concrete face.',
    meta_description:
      'Mapegrout PT ME TDS: sand free super fluid injection grout for post-tensioning ducts, 16 to 17 litres per bag. Download the sheet from Lapiz Blue UAE.',
    applications: [
      'Filling post-tensioning cable ducts horizontally and vertically',
      'Repair grouting of voids and cavities in cable ducts',
      'Slurry for narrow cavities and cracks in rock or damaged concrete',
      'Consolidating loose soil',
      'Grout that must be pumped long distances without bleeding',
    ],
    category: 'precision_grout',
    specs: { classification: 'EN 1504-3, R4' },
  },
  mapefer: {
    description:
      'Mapefer is not a repair mortar but the step before one: a two component anti-corrosion cementitious coating brushed onto exposed reinforcement once the failed concrete has been broken out. It restores alkalinity around the bar, protects the steel against further corrosion and acts as a bonding promoter for the repair mortar that follows, whether from the Mapegrout range or a cement mortar modified with synthetic resin latex. Skipping it is why repairs fail twice, because the rust that burst the cover off keeps working behind a cosmetically perfect patch. Components mix at 3 parts A to 1 part B into a light blue slurry with about an hour of pot life, applied between 5 and 35 degrees, above or below grade. At a 2 mm coat, allow 120 g per metre on 8 mm bar and 240 g per metre on 16 mm bar.',
    meta_description:
      'Mapefer TDS: two component anti-corrosion cementitious coating for reinforcement rods to EN 1504-7. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Anti-rust protection of concrete reinforcement rods',
      'Restoring alkalinity around corroded reinforcement',
      'Bonding promoter for concrete repair mortars',
      'Preparation before repair with Mapegrout mortars',
      'Application above and below grade',
    ],
    specs: {
      colours: 'light blue',
      consistency: 'powder and liquid',
      coverage:
        '120 g/m for 8 mm diameter rebar and 240 g/m for 16 mm diameter rebar at a 2 mm thick coat.',
      storage_shelf_life:
        'Mapefer may be stored for up to 12 months in its original packaging in a dry place at a temperature of at least +5°C.',
    },
    dropSpecs: ['bond_strength'],
  },
  mapefinish: {
    description:
      'Mapefinish HD is a two component, highly sulphate resistant cementitious mortar for protecting and levelling concrete that takes heavy abrasion. It is a skim rather than a rebuild: a maximum of 2 mm in a single layer and never more than 4 mm in total, so anything deeper belongs to the Mapegrout or Planitop ranges. The jobs it suits are levelling defects on cast concrete, skimming repairs made with Mapegrout mortars, protecting concrete against weak aggressive agents in the surrounding environment, lining treatment plants and drain manifolds, and renewing the wear layer on industrial floors. Components mix at 6.25 parts A to 1 part B with a pot life of around 30 minutes, applied between 5 and 35 degrees. Consumption is 2.2 kg per square metre per millimetre. On a hot UAE slab, damp the substrate first and work in small panels.',
    meta_description:
      'Mapefinish HD TDS: two component sulphate resistant skimming mortar for abraded concrete, 2 mm per layer. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Levelling defects on the surface of cast concrete',
      'Skimming concrete repaired with the Mapegrout range',
      'Protecting concrete against weak aggressive agents',
      'Protecting depuration systems and drain manifolds',
      'Repairing the wear layer on industrial concrete floors',
    ],
    specs: {
      consistency: 'powder and liquid',
      mixing_ratio: '6.25 parts of Mapefinish HD component A with 1 part of component B',
    },
    dropSpecs: ['bond_strength'],
  },
  monofinish: {
    description:
      'Smoothing rather than structural repair is what Monofinish is for: a one component, normal setting cementitious mortar trowelled onto concrete and cement render at a maximum of 2 to 3 mm per coat. It evens out surface imperfections before painting, levels off concrete that has been repaired with mortars from the Mapegrout range, and smooths irregular render that is otherwise mechanically sound. The thickness limit is the selection rule. If the defect is deeper than a few millimetres the surface needs a reprofiling mortar first, because a fairing coat applied too thick will craze and debond. Consumption is 1.4 kg per square metre per millimetre of thickness, supplied in 22 kg bags with a twelve month shelf life in dry storage. On a UAE facade, work out of direct sun so the mortar does not flash off before it is closed.',
    meta_description:
      'Monofinish TDS: one component cementitious smoothing mortar for concrete and render, 2 to 3 mm per coat. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Smoothing surface imperfections in concrete before painting',
      'Levelling off concrete repaired with the Mapegrout range',
      'Smoothing irregular cement based renders',
      'Protection and smoothing of concrete surfaces',
    ],
    dropSpecs: ['bond_strength'],
  },
  'planitop-105-me': {
    description:
      'Planitop 105 ME is a one component cementitious blowhole filler and levelling mortar, classified R2, built up to 3 mm in as many layers as a smooth finish needs. Its work is cosmetic and preparatory: filling blowholes and surface blemishes in concrete before coating, making good precast units, dealing with minor honeycombing up to 3 mm deep, and smoothing render that has sound mechanical strength. It is not a structural repair material, and a coating applied over an unfilled blowhole will simply bridge the void and fail at that point later. Consumption is 1.2 kg per square metre per millimetre of thickness depending on the substrate, with each 20 kg bag yielding 14.3 litres. Shelf life is twelve months in dry conditions and shorter where a store runs hot and humid, which is worth checking on a UAE site.',
    meta_description:
      'Planitop 105 ME TDS: R2 cementitious blowhole filler and levelling mortar up to 3 mm in layers. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Smoothing surface imperfections and blemishes before coating',
      'Filling blowholes and surface defects in precast units',
      'Minor honeycombing up to 3 mm deep',
      'Smoothing irregular cement based renders',
    ],
  },
  'planitop-110-me': {
    description:
      'Where Planitop 105 ME builds up in layers, Planitop 110 ME is specified for protection, smoothing and levelling of concrete imperfections up to 2 mm in a single application, classified R1 under EN 1504-3 for external use. One pass is both its selling point and its limit: it is the quick fairing coat over blowholes, blemishes and precast surface defects, minor honeycombing and sound but irregular cement render, and it is not meant to be stacked to reach depth. Consumption is 1.2 kg per square metre per millimetre of thickness, each 20 kg bag yielding 15.3 litres. Dry storage gives twelve months. On a UAE project the usual sequence is Planitop 110 ME over a cured repair and then the protective or decorative coating, with the substrate dampened down before the mortar goes on.',
    meta_description:
      'Planitop 110 ME TDS: single component cementitious smoothing mortar, up to 2 mm in one application, R1 to EN 1504-3. Download the sheet from Lapiz Blue UAE.',
    applications: [
      'Smoothing concrete imperfections up to 2 mm in one pass',
      'Filling blowholes and surface defects in precast units',
      'Minor honeycombing up to 3 mm deep',
      'Smoothing irregular cement based renders',
    ],
    specs: { classification: 'EN 1504-3, R1' },
  },
  'planitop-220-me': {
    description:
      'Polymer modification is what separates Planitop 220 ME from the single component fairing coats: a two component mortar classified R2, applied in multiple layers up to 10 mm, so it covers both smoothing and light reprofiling. Use it for filling blowholes and surface imperfections in precast units, smoothing blemishes in concrete before coating, minor honeycombing and irregular cement render that still has sound strength. The extra build means a patched surface can be brought back to line without moving up to a structural repair mortar. Components mix at 1 part A to 0.3 parts B, with a pot life of about an hour and a working range of 5 to 40 degrees. Average consumption is 1.6 kg per square metre per millimetre. Mix only what the gang can place inside the pot life, which shortens as the day heats up.',
    meta_description:
      'Planitop 220 ME TDS: two component polymer modified fairing coat for concrete, up to 10 mm in layers, R2. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Smoothing and levelling concrete surface imperfections',
      'Blowhole filling in cast and precast concrete',
      'Reprofiling in multiple layers up to 10 mm',
      'Filling minor honeycombing',
      'Smoothing irregular cement based renders',
    ],
    specs: {
      classification: 'EN 1504-3, R2',
      consistency: 'component A powder, component B liquid',
      storage_shelf_life:
        'When stored in dry conditions in the original unopened bags, Planitop 220 ME component A has a shelf life of 12 months.',
    },
  },
  'planitop-400-me': {
    description:
      'Planitop 400 ME is a shrinkage controlled thixotropic mortar for levelling and restoring concrete, applied by hand in a single layer at any thickness between 2 and 30 mm. That span is unusually wide and is the reason to specify it: one product covers a feathered edge and a 30 mm reprofile on vertical or horizontal surfaces without formwork. Typical jobs are balcony corners and edges damaged by rusting reinforcement, repairs to beams, pillars and concrete panels, precast elements knocked about in transport or installation, damaged concrete piping, and surface defects in castings such as honeycombs, holes and cold joints. Mixing takes 15 to 16 parts water to 100 parts powder, which is 3.75 to 4 litres per 25 kg bag, with about an hour of pot life and a range of 5 to 45 degrees. Consumption is 18 kg per square metre per centimetre.',
    meta_description:
      'Planitop 400 ME TDS: R3 thixotropic levelling and restoration mortar, single layer from 2 to 30 mm. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Restoring balcony corners and edges damaged by rusting reinforcement',
      'Repairs to beams, pillars and concrete panels',
      'Precast elements damaged in transport or installation',
      'Repairs to damaged concrete piping',
      'Filling honeycombs, holes and cold joints in castings',
      'Deep levelling of vertical and horizontal concrete',
    ],
    specs: {
      mixing_ratio:
        '100 parts of Planitop 400 ME with 15-16 parts water (3.75-4.00 litres per 25 kg bag)',
    },
    dropSpecs: ['bond_strength'],
  },
  'planitop-fast-330': {
    description:
      'Planitop Fast 330 is a quick setting, fibre reinforced levelling mortar for internal and external floors and walls, applied from 3 to 30 mm to take out irregularities before something else goes on top. Speed is the point: substrates are ready for ceramic and stone after 4 hours at 20 degrees and for liquid or flexible cementitious waterproofing after 24 hours. It levels reinforced concrete in swimming pools ahead of the Mapelastic systems, smooths screeds and old ceramic and stone floors, and forms or repairs slopes on terraces and balconies. Consumption is about 1.55 kg per square metre per millimetre, so 15.5 kg per square metre at 10 mm, supplied in 25 kg vacuum packed bags that give better protection against accidental rain in storage. Note that this is a levelling mortar and not a structural repair product.',
    meta_description:
      'Planitop Fast 330 TDS: quick setting fibre reinforced levelling mortar for floors and walls, 3 to 30 mm. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Levelling pool shells before Mapelastic waterproofing systems',
      'Smoothing screeds before laying ceramic and stone',
      'Levelling old ceramic and stone floors',
      'Repairing or forming slopes on terraces and balconies',
      'Internal and external floors and walls from 3 to 30 mm',
    ],
    specs: {
      classification: 'EN 1504-2, MC IR, GP CS IV',
      storage_shelf_life:
        'Planitop Fast 330 may be stored up to 12 months in its original packaging. The 25 kg vacuum-packed polyethylene bags offer better protection from accidental rain.',
    },
  },
  'planitop-hdm-maxi': {
    description:
      'Planitop HDM Maxi is a two component, fibre reinforced pozzolanic mortar with two distinct roles. Combined with alkali resistant glass or basalt mesh from the Mapegrid range it forms a fibre reinforced cementitious matrix system that structurally strengthens stone, brick, tuff and mixed masonry, raising the shear and tensile strength of walls and of arched and vaulted faces. Used on its own it restores masonry texture and levels concrete and masonry surfaces, and it is part of the Mapetherm Tile System for tiling over external wall insulation. Component A comes in 25 kg bags and component B in 6.25 kg, mixed to a pot life of about an hour and applied between 5 and 35 degrees to a maximum of 25 mm. Consumption is 1.85 kg per square metre per millimetre. In the reinforced build up the mesh is bedded between two layers.',
    meta_description:
      'Planitop HDM Maxi TDS: two component fibre reinforced mortar for FRCM masonry strengthening with Mapegrid mesh. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Structural reinforcement of masonry with Mapegrid mesh',
      'Increasing shear and tensile strength of bay walls',
      'Strengthening arched and vaulted masonry elements',
      'Cladding facing walls and vaulted ceilings',
      'Levelling and repairing reinforced concrete structures',
      'Part of the Mapetherm Tile System for facades',
    ],
  },
  'planitop-hpc': {
    description:
      'Planitop HPC belongs to the flowable end of the repair range and to the strongest end of it: a two component, ultra high performance, shrinkage compensated fibre reinforced mortar with stiff steel fibres and high ductility, classified R4. It is poured where reinforced concrete has to be strengthened without adding much thickness or weight, up to 40 mm with no additional reinforcement mesh and thicker only where mesh is added. Work it suits includes seismic retrofitting of highly stressed elements, column and beam jacketing, repairs to the lower sections of pre-tensioned viaduct beams, rebuilding and levelling pier caps and bearings, and floor slabs scarified back to sound concrete. Consumption is roughly 20 kg per square metre per centimetre of thickness. Free flowing means formwork and a continuous pour, not a trowel and a tight corner.',
    meta_description:
      'Planitop HPC TDS: two component ultra high performance steel fibre repair mortar, R4, up to 40 mm. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Seismic retrofitting of highly stressed elements',
      'Column and beam jacketing',
      'Repairs to the lower sections of pre-tensioned viaduct beams',
      'Rebuilding and levelling pier caps and bearings',
      'Repairing floor slabs after scarifying damaged areas',
    ],
    dropSpecs: ['bond_strength'],
  },
  'planitop-hpc-floor': {
    description:
      'One component where Planitop HPC is two, Planitop HPC Floor is a fluid cementitious mortar with rigid steel fibres, shrinkage compensated, classified R4, and aimed squarely at horizontal work. It is cast as a thin compact layer up to 40 mm thick with no additional reinforcement mesh, strengthening floor slabs from the top, whether reinforced concrete, brick and cement, wood or mixed brick and steel beam construction. Other uses are seismic retrofitting of highly stressed elements, repairs to industrial, road and airport floors, rebuilding and levelling the upper parts of pier caps and bearings on viaducts, and reinstating slabs after damaged areas have been scarified away. Consumption is about 21 kg per square metre per centimetre. Being single component it mixes with water alone, which is simpler to control on site than a two part system in the heat.',
    meta_description:
      'Planitop HPC Floor TDS: one component fluid steel fibre reinforced mortar for strengthening slabs from the top, R4. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Strengthening floor slabs from the top in a thin layer',
      'Seismic retrofitting of highly stressed elements',
      'Repairs to industrial, road and airport concrete floors',
      'Rebuilding and levelling pier caps and bearings on viaducts',
      'Repairing floor slabs after scarifying damaged areas',
    ],
    dropSpecs: ['bond_strength'],
  },
  'mapewrap-21': {
    description:
      'MapeWrap 21 is a two component, super fluid epoxy resin used to impregnate MapeWrap fabrics immediately before they are placed on concrete, reinforced concrete or masonry for repair or strengthening. It belongs to the composite strengthening system rather than to the mortar or sealant ranges: the fabric carries the load, and the resin saturates it and bonds it to the prepared substrate. Super fluid consistency is what makes it the damp system resin, with the fabric wetted out as it goes on. Adhesion to concrete exceeds 3 N per square millimetre after 7 days at 23 degrees, with failure occurring in the concrete rather than at the bond line. The working range is 10 to 30 degrees, which on a UAE facade usually means early morning work. Supplied in 5 kg units with a 24 month shelf life.',
    meta_description:
      'MapeWrap 21 TDS: two component super fluid epoxy for impregnating MapeWrap fabrics by the damp system. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Impregnating MapeWrap fabrics using the damp system',
      'Strengthening concrete and reinforced concrete elements',
      'Strengthening masonry elements',
      'Composite repair of beams, columns and slabs',
    ],
    category: 'bonding_agent',
    specs: { colours: 'transparent yellow', consistency: 'liquid' },
    dropSpecs: ['coverage'],
  },
  'mapewrap-31': {
    description:
      'Used for the dry system, MapeWrap 31 is a two component epoxy adhesive of medium viscosity applied to the prepared surface so that the MapeWrap fabric is laid into it and rolled through, rather than being saturated beforehand. It serves the same purpose as the rest of the system, repairing or strengthening concrete, reinforced concrete and masonry elements with composite fabric, but the paste consistency of component A holds on a vertical face where a super fluid resin would run. Adhesion to concrete is greater than 3 N per square millimetre after 7 days, with failure in the concrete. The working range is 5 to 30 degrees and shelf life is 24 months at not below 5 degrees. Consumption depends entirely on which fabric is specified, so take it from the system schedule rather than estimating it.',
    meta_description:
      'MapeWrap 31 TDS: two component medium viscosity epoxy adhesive for MapeWrap fabrics by the dry system. Download the sheet from Lapiz Blue UAE.',
    applications: [
      'Impregnating MapeWrap fabrics using the dry system',
      'Repair and strengthening of concrete and reinforced concrete',
      'Strengthening masonry elements',
      'Composite reinforcement on vertical faces',
    ],
    category: 'bonding_agent',
    specs: {
      colours: 'component A yellow, component B transparent yellow',
      consistency: 'component A paste, component B liquid',
    },
    dropSpecs: ['coverage'],
  },
  'mapewrap-31-sp': {
    description:
      'MapeWrap 31 SP is a medium viscosity epoxy resin for impregnating MapeWrap C or G UNI-AX, BI-AX and QUADRI-AX fibre sheet in external structural repair, strengthening and upgrade work, using the dry system. The two components are mixed together with a slow speed drill and stirrer until the resin is uniform. Its gel consistency sets it apart within the range, and so does its temperature window of 10 to 35 degrees, wider at the top end than the other impregnation resins, which matters on a UAE strengthening job where a shaded facade still reads above 30 degrees by mid morning. Estimated coverage is around 950 g per square metre based on presaturating a 900 g fibre sheet. Supplied in 5 kg and 15 kg units with an 18 month shelf life in sealed original packaging.',
    meta_description:
      'MapeWrap 31 SP TDS: medium viscosity epoxy for impregnating MapeWrap carbon and glass fibre sheet, dry system. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Impregnating MapeWrap C and G UNI-AX fibre sheet',
      'Impregnating BI-AX and QUADRI-AX fibre sheet',
      'External structural repair and strengthening',
      'Structural upgrade of concrete and masonry elements',
    ],
    category: 'bonding_agent',
    specs: {
      consistency: 'component A gel, component B liquid',
      storage_shelf_life: '18 months in original sealed packaging.',
    },
    dropSpecs: ['bond_strength'],
  },
  'mapewrap-primer-1': {
    description:
      'Every MapeWrap application starts here. MapeWrap Primer 1 is a two component epoxy primer formulated for the system and used to prepare concrete, reinforced concrete or masonry before the fabrics are bonded, a step the system treats as necessary rather than optional. It consolidates the surface and gives the impregnating resin a sound base, which is why pull off results on the finished build up exceed 3 N per square millimetre after 7 days at 23 degrees with failure in the concrete. Consumption is 250 to 300 g per square metre, supplied in 2 kg units with a 24 month shelf life. The working range is 10 to 30 degrees. Prime, let the surface reach the stated condition, then carry on with the resin while the primer is still inside its overcoating window.',
    meta_description:
      'MapeWrap Primer 1 TDS: two component epoxy primer for the MapeWrap system, 250 to 300 g per square metre. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Priming concrete before bonding MapeWrap fabrics',
      'Priming reinforced concrete for composite strengthening',
      'Priming masonry surfaces for composite strengthening',
      'Surface preparation within the MapeWrap system',
    ],
    specs: { colours: 'transparent yellow', consistency: 'liquid' },
  },
  'adesilex-pg2': {
    description:
      'Adesilex PG2 is a two component thixotropic epoxy adhesive for structural bonding, which places it with the fixing and anchoring products rather than the repair mortars. It bonds and reinforces concrete, natural stone, mortar and brick with very low emissions of volatile organic compounds, certified EMICODE EC1 Plus. Typical work is structural reinforcement of beams and pillars by bonding steel or composite plates to concrete, rigid structural bonding of precast elements, sealing injection ports and surface damage before resin injection, sealing large cracks and repairing joint corners in trafficked industrial floors, bonding fibre reinforced cement slabs and pipes, and bonding TPE strips to concrete for joint waterproofing. Components mix at 3 parts A to 1 part B and consumption is 1.65 to 1.75 kg per square metre per millimetre. Thixotropic means it holds on a vertical face.',
    meta_description:
      'Adesilex PG2 TDS: two component thixotropic epoxy adhesive for structural bonding of concrete, stone and brick. Download it from Lapiz Blue UAE.',
    applications: [
      'Bonding steel or composite plates to concrete',
      'Rigid structural bonding of precast concrete elements',
      'Sealing injection ports and surface damage before resin injection',
      'Sealing large cracks and joint corners in trafficked floors',
      'Bonding fibre reinforced cement slabs and pipes',
      'Bonding TPE strips to concrete for joint waterproofing',
    ],
    category: 'bonding_agent',
    specs: {
      colours: 'grey',
      consistency: 'thixotropic paste',
      application_temperature: 'from +10°C to +30°C',
    },
    dropSpecs: ['bond_strength'],
  },
  'adesilex-pg2-tg': {
    description:
      'The TG in Adesilex PG2 TG stands for the temperature band it is built for: a two component thixotropic epoxy adhesive especially suitable for application between 25 and 50 degrees, where a standard structural epoxy would stiffen before it could be worked. For a UAE summer that is the whole argument. It bonds and reinforces concrete, natural stone, mortar and brick, carries steel or composite plates onto concrete, bonds precast elements rigidly, seals injection ports and large cracks in trafficked industrial flooring, bonds waterproofing strips and fills pinholes before epoxy and polyurethane flooring systems. It reprofiles large areas up to 3 mm and builds 1 cm in a single layer. Mixed at 3 parts A to 1 part B, consumption is 1.71 kg per square metre per millimetre, and pot life after preconditioning at 50 degrees is 20 minutes.',
    meta_description:
      'Adesilex PG2 TG TDS: thixotropic epoxy structural adhesive for application from +25°C to +50°C, built for hot climates. From Lapiz Blue UAE.',
    applications: [
      'Structural bonding at temperatures between +25°C and +50°C',
      'Bonding steel or composite plates to concrete',
      'Rigid structural bonding of precast elements',
      'Sealing large cracks in trafficked industrial flooring',
      'General reprofiling over large areas up to 3 mm',
      'Filling pinholes before epoxy and polyurethane flooring',
    ],
    category: 'bonding_agent',
    specs: {
      colours: 'grey',
      consistency: 'thick paste',
      pot_life: '20 minutes (after preconditioning at +50°C)',
    },
    dropSpecs: ['open_time'],
  },
  'adesilex-pg4': {
    description:
      'Adesilex PG4 is a two component thixotropic epoxy adhesive with modified rheology, CE marked to EN 1504-4 for structural bonding. The modified rheology is aimed at one job in particular: bonding synthetic waterproofing straps and strips, PVC, Hypalon, Mapeband and Mapeband TPE, onto concrete across wide joints. It also bonds precast concrete elements rigidly, seals large cracks in industrial floors subject to traffic, bonds slabs and pipes in concrete and fibre reinforced concrete, bonds steel to concrete and fixes metal or TPE drains. Bond strength to concrete tested to EN 12636 fails in the concrete rather than at the adhesive line. Components mix at 3 parts A to 1 part B, consumption is 1.60 to 1.65 kg per square metre per millimetre and the range is 5 to 30 degrees. It must not be used on joints subject to movement.',
    meta_description:
      'Adesilex PG4 TDS: EN 1504-4 thixotropic epoxy adhesive for bonding waterproofing straps and structural elements. Request it from Lapiz Blue UAE.',
    applications: [
      'Bonding PVC, Hypalon and Mapeband TPE strips to concrete',
      'Waterproofing wide joints with pre-formed straps',
      'Rigid structural bonding of precast concrete elements',
      'Sealing large cracks in trafficked industrial floors',
      'Bonding slabs and pipes in concrete and fibre reinforced concrete',
      'Bonding steel to concrete and fixing metal or TPE drains',
    ],
    category: 'bonding_agent',
    specs: {
      colours: 'grey',
      consistency: 'thick paste',
      bond_strength: 'to concrete (EN 12636): failure of the concrete',
      storage_shelf_life:
        '24 months if kept in the original packaging and stored at a temperature of between +5°C and +30°C.',
    },
  },
  'mapefill-gp-me': {
    description:
      'Mapefill GP ME is a general purpose, non shrink cementitious grout classified to EN 1504-6, used to fill the gap between something fixed and the structure holding it. Non shrink is the whole point: an ordinary cement mix contracts as it cures and leaves the base plate it was meant to support bearing on nothing. It grouts honeycombing in concrete, fills gaps in precast elements, beds base plates and bridge bearings, anchors machinery, steel bolts and metallic fixtures, fills rigid joints and serves underpinning and pressure grouting. For precast elements and rigid joints the thickness should not exceed 60 mm. A flowable mix takes 3.8 to 3.9 kg of water per bag, giving a flow of under 60 seconds to ASTM C939, and each 25 kg bag yields 13 to 14 litres. Pour from one side only so air is driven ahead of the grout.',
    meta_description:
      'Mapefill GP ME TDS: general purpose non shrink cementitious grout to EN 1504-6 for base plates and anchoring. Download it from Lapiz Blue UAE.',
    applications: [
      'Grouting base plates and bridge bearings',
      'Anchoring mechanical plant and machinery',
      'Anchoring steel bolts and other metallic fixtures',
      'Filling honeycombs and gaps in precast elements',
      'Filling rigid joints between concrete elements',
      'Underpinning and pressure grouting of concrete structures',
    ],
    specs: { classification: 'EN 1504-6' },
  },
  'mapefill-sp-me': {
    description:
      'Precision anchoring is what Mapefill SP ME is for: a premium, super flow, non shrink cementitious grout to EN 1504-6, with expansion in the hardened phase measured to ASTM C878 and very high early strength. The difference against a general purpose grout is flow, 20 to 30 seconds to ASTM C939 at 21.5 per cent water, which is what lets it travel under a large plate or into a tight annulus without help. It anchors turbines, presses, milling machines and generators, bolts and metallic fixtures, beds machinery baseplates, crane rails, bridge bearings and column bases, fills rigid joints between precast elements and serves underpinning and pressure grouting. For precast elements and rigid joints keep the thickness within 60 mm. Each 25 kg bag yields 13 to 14 litres, poured from one side in a continuous flow.',
    meta_description:
      'Mapefill SP ME TDS: premium super flow non shrink grout to EN 1504-6, flow 20 to 30 seconds, for precision anchoring. Request it from Lapiz Blue UAE.',
    applications: [
      'Precision anchoring of turbines, presses and generators',
      'Grouting machinery baseplates and crane rails',
      'Bridge bearings and column bases',
      'Anchoring bolts and other metallic fixtures',
      'Filling rigid joints between precast concrete elements',
      'Underpinning and pressure grouting of concrete structures',
    ],
  },

  /* Sealants, anchoring grouts and assembly adhesives */
  'mapeflex-ac4': {
    description:
      'Mapeflex AC4 is a paintable acrylic sealant for internal and external expansion and construction joints with a medium amount of movement, and for surface cracks in absorbent building materials. Two limits decide whether it fits. Movement capability is 12.5 per cent of joint width, classified F-EXT-INT class 12.5 P to EN 15651-1, so anything more active needs a polyurethane or silicone; and it is not for joints subject to foot traffic, where the sheet names Mapeflex PU 45 FT instead. Within those limits it seals between precast concrete panels, plaster, brickwork, lightweight cement, wood and natural stone, between wooden frames and masonry, around doors and roller blind caissons, and around insulation panels in thermal cladding. Shore A hardness is 20, applied between 5 and 40 degrees. Being paintable and happy on absorbent substrates makes it the decorator friendly choice indoors.',
    meta_description:
      'Mapeflex AC4 TDS: paintable acrylic sealant for joints with movement up to 12.5 per cent, class 12.5 P to EN 15651-1. Download it from Lapiz Blue UAE.',
    applications: [
      'Internal and external expansion and construction joints',
      'Joints between precast concrete panels with movement up to 12.5%',
      'Seals between concrete, plaster, brickwork, wood and natural stone',
      'Airtight and waterproof seals between wooden frames and masonry',
      'Joints around insulation panels in thermal cladding systems',
      'Sealing surface cracks in absorbent building materials',
    ],
    specs: {
      classification: 'EN 15651-1: F-EXT-INT, class 12.5 P',
      shore_hardness: '20 (ISO 7619-1)',
      storage_shelf_life:
        'Mapeflex AC4 is stable for 24 months if stored in a cool, dry place. Protect from frost.',
    },
  },
  'mapeflex-ms-45': {
    description:
      'Mapeflex MS 45 is a one component hybrid sealant and adhesive based on silylated polymer, classified F20 HM to ISO 11600, so it carries movement up to 20 per cent of joint width at a high modulus. Trafficked joints are within its scope, including civil and industrial floors subject to heavy vehicular traffic, and that is the dividing line between it and an acrylic sealant. It also seals traditional and ventilated facades, window and door fittings, cracks and splits, paintable joints, tin roofs and metalwork, and it tolerates damp substrates. Used as a flexible adhesive at 3 mm it bonds most building materials without primer, from metals and glass to ceramics and many plastics, replacing or supplementing mechanical fasteners. Shore A hardness is 43, applied between 5 and 35 degrees. Mould resistant and EMICODE EC1 Plus, supplied in 300 ml cartridges.',
    meta_description:
      'Mapeflex MS 45 TDS: hybrid high modulus sealant and adhesive, movement to 20 per cent, suits trafficked floor joints. Request it from Lapiz Blue UAE.',
    applications: [
      'Expansion, fillet and distribution joints on floors and walls',
      'Civil and industrial floors with heavy vehicular traffic',
      'Traditional and ventilated facades',
      'Window and door fittings',
      'Tin roofs and metalwork',
      'Flexible bonding of building elements at 3 mm thickness',
    ],
    specs: {
      classification: 'EN 15651-1: F-EXT-INT-CC, class 20 HM',
      shore_hardness: '43 (DIN 53505)',
      storage_shelf_life:
        'Mapeflex MS 45 may be stored for up to 15 months (300 ml cartridges) and 12 months (600 ml sausages) in its original packaging in a dry, cool place.',
    },
  },
  'mapeflex-ms-crystal': {
    description:
      'Mapeflex MS Crystal does the same work as the other hybrid sealants while staying invisible: a crystal clear, high modulus, paintable sealant and adhesive that seals and bonds without changing the appearance of what it is used on. Movement capability is 20 per cent of joint width, classified F20 HM to ISO 11600, which suits facades, internal and glass partition walls, the gap between skirting boards and floors, window and door fittings and shower booths. It is not a trafficked floor sealant. As an elastic adhesive, a thin layer bonds glass shelves, tops and objects along with cement based materials, brick, metals, gypsum, wood, ceramic and many plastics, and it accepts damp surfaces. Shore hardness is 35, applied between 5 and 40 degrees, EMICODE EC1 Plus, supplied in 300 ml cartridges with an 18 month shelf life.',
    meta_description:
      'Mapeflex MS Crystal TDS: crystal clear high modulus hybrid sealant and adhesive, movement up to 20 per cent. Request it from Lapiz Blue UAE.',
    applications: [
      'Transparent seals in facades and internal partition walls',
      'Glass partition walls and shower booths',
      'Filling gaps between skirting boards and floors',
      'Window and door fittings',
      'Bonding glass shelves, tops and glass objects',
      'Fillet and expansion joints with movement up to 20%',
    ],
    specs: {
      classification: 'EN 15651-1: F-EXT-INT; EN 15651-3: XS1',
      shore_hardness: '35 (ISO 868)',
      storage_shelf_life:
        'Mapeflex MS Crystal may be stored for 18 months in its original packaging in a cool, dry area at +5°C to +25°C and 50% R.H.',
    },
  },
  'mapeflex-psu-sl-me': {
    description:
      'Mapeflex PSU SL ME is the self levelling grade of a multi component polysulphide joint sealant, poured into horizontal joints in floors and other level surfaces where the level tolerance is within 3 per cent, rather than gunned onto a vertical face. Polysulphide gives a tough rubber like seal that accommodates continuous and pronounced cyclic movement of plus or minus 25 per cent, which is why the range is specified for movement joints in buildings, industrial floors, car parks, subways and infrastructure work. Joints from 5 to 50 mm wide can be sealed, and trafficked joints or those under hydrostatic pressure should be designed to around 20 mm. Shore A hardness runs from 17 to 22 and pot life is 120 minutes at 25 degrees. For a water retaining structure the non sag grade is specified instead of this one.',
    meta_description:
      'Mapeflex PSU SL ME TDS: pouring grade polysulphide joint sealant, plus or minus 25 per cent movement, joints 5 to 50 mm. From Lapiz Blue UAE.',
    applications: [
      'Pouring into movement joints in floors and horizontal surfaces',
      'Movement joints in buildings and infrastructure projects',
      'Industrial floor joints',
      'Car park joints',
      'Subway and civil engineering joints',
      'Trafficked joints designed to around 20 mm wide',
    ],
    specs: {
      shore_hardness: '17-22 Shore A at +25°C',
      pot_life: '120 minutes at +25°C',
      colours: 'grey',
      application_temperature: 'from +5°C to +50°C',
      coverage:
        'Litres per linear metre: 0.050 for a 10x5 mm joint, 0.200 for 20x10 mm, 0.800 for 40x20 mm and 1.250 for 50x25 mm. Joints may be between 5 and 50 mm wide.',
    },
  },
  'mapeflex-pu-45-ft': {
    description:
      'Heavy traffic is where Mapeflex PU 45 FT earns its place: a paintable, rapid, high modulus polyurethane sealant and adhesive for expansion and distribution joints in horizontal and vertical surfaces, including joints occasionally attacked by hydrocarbons. Movement capability is 20 per cent of joint width, classified F20 HM to ISO 11600, and the application list is explicit about traffic, covering industrial floors taking heavy vehicles, car parks, supermarkets, shopping centres and warehouses, and ceramic floors where fork lifts run. Its thixotropic consistency lets it hold in a vertical joint as well. Used as an adhesive up to 3 mm it bonds cement based materials, brick, metals, glass, gypsum, wood, ceramics and plastics. Shore A hardness is 40 and cartridges are 600 ml. Rapid hardening shortens the time a joint has to stay closed to site traffic.',
    meta_description:
      'Mapeflex PU 45 FT TDS: rapid high modulus polyurethane sealant for trafficked floor joints, movement to 20 per cent. Download it from Lapiz Blue UAE.',
    applications: [
      'Expansion and distribution joints in industrial floors with heavy traffic',
      'Car park, supermarket and warehouse floor joints',
      'Ceramic floors in areas where fork lifts run',
      'Concrete walls and vertical structures needing a thixotropic sealant',
      'Sealing cracks and general fillet joints',
      'Flexible bonding of building elements up to 3 mm',
    ],
    specs: {
      classification: 'EN 15651-1: F-EXT-INT-CC, class 20 HM; EN 15651-4: PW-EXT-INT-CC',
      shore_hardness: '40 (DIN 53505)',
      storage_shelf_life:
        'Mapeflex PU 45 FT may be stored for 12 months in a cool, dry place in its sealed, original packaging.',
    },
  },
  'mapeflex-pu-65': {
    description:
      'Mapeflex PU 65 is a two component castable polyurethane elastomeric sealant for road joints finished flush with the surface, developed for highway construction joints and for filling and sealing the anchoring heads of pre-formed rubber, reinforced rubber and steel road joints between adjacent decks and between deck and abutment. It is a trafficked product in the fullest sense, suitable for vehicles on roads, freeways and highways, and it also serves as a connection sealant between a prefabricated road joint and the adjoining bituminous conglomerate. Shore A hardness of 80 is the figure that sets it apart: this is for substrates subject to limited movement and heavy load rather than a flexing building joint. Set to foot traffic takes about 2 to 3 hours, the application range is 0 to 35 degrees, and mineral fillers may be added after mixing.',
    meta_description:
      'Mapeflex PU 65 TDS: two component castable polyurethane sealant for road joints flush with the surface, Shore A 80. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Highway construction joints finished flush with the surface',
      'Filling and sealing anchoring heads of pre-formed road joints',
      'Joints between adjacent decks and between deck and abutment',
      'Connection sealant between road joints and bituminous conglomerate',
      'Surface sealing of anchoring bolts in pre-formed rubber sections',
      'Road, railway and airport joints',
    ],
    specs: {
      shore_hardness: '80 (DIN 53505), components A+B',
      set_time: 'set to foot traffic approx. 2-3 hours (normal setting)',
      storage_shelf_life:
        'Mapeflex PU 65 may be stored up to 12 months in a cool, dry place. Component B must be kept above +5°C, below which it tends to crystallise.',
    },
  },
  'mapeflex-pu-70-sl': {
    description:
      'Fuel is the deciding factor with Mapeflex PU 70 SL, a two component free flowing elastic polyurethane sealant poured into expansion and contraction joints in concrete floors that come into accidental or intermittent contact with petrol, diesel, aviation spirit, lubricants and de-icing substances. It is a horizontal product, poured into joints with a slope of up to 2.5 per cent, and the joint has to be designed so that movement in service stays within 25 per cent of its initial width. Runways, car parks, service areas, mechanical workshops, roads, courtyards, ports and logistics areas with moving vehicles are its ground, along with run off tanks in refineries, fuel depots and petrochemical plants. Components mix at 66 to 34 by weight, Shore A hardness is 18, and Mapefoam backer cord sets the depth of the sealant.',
    meta_description:
      'Mapeflex PU 70 SL TDS: two component pourable polyurethane sealant for floor joints in contact with fuels. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Joints in concrete floors in contact with fuels and lubricants',
      'Sealing joints in runways',
      'Joints in car parks, service areas and mechanical workshops',
      'Joints in roads, courtyards, ports and logistics areas',
      'Run off tanks in refineries and fuel storage depots',
      'Petrochemical industry flooring joints',
    ],
    specs: {
      shore_hardness: '18 (Shore A)',
      consistency: 'component A thick paste, component B liquid',
      coverage:
        'The density of Mapeflex PU 70 SL is 1.45 g/cm³. Consumption depends on the width and depth of the joint; see the consumption table on the data sheet.',
    },
  },
  'mapeflex-pu-s25': {
    description:
      'Mapeflex PU S25 is a low modulus elastic polyurethane sealant developed for internal and external vertical expansion and construction joints, classified F-25 LM to ISO 11600. Low modulus is the selection point: it carries movement up to 25 per cent of joint width while putting very little stress back into the joint edge, with a modulus of elasticity of 0.20 N per square millimetre, which suits weaker or brittle substrates that a high modulus sealant would tear away. Its thixotropic consistency makes it quick to gun on a vertical face, and it can be painted over once hardened, subject to preliminary tests. Shore A hardness is 20, the working range 5 to 40 degrees, and cartridges hold 600 ml in beige, grey and white. For a trafficked floor joint choose a high modulus polyurethane instead of this one.',
    meta_description:
      'Mapeflex PU S25 TDS: low modulus polyurethane sealant, ISO 11600 class F-25 LM, movement up to 25 per cent. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Internal and external vertical expansion joints',
      'Construction joints subject to movement up to 25%',
      'Joints on weaker or brittle substrate edges',
      'Paintable joints after preliminary testing',
      'Joints in facades and around masonry openings',
    ],
    specs: {
      classification: 'ISO 11600: class F-25 LM',
      shore_hardness: '20 (DIN 53505)',
    },
  },
  'mapesil-ac': {
    description:
      'Mapesil AC is a pure acetic cross linking silicone sealant with BioBlock technology, mould resistant and rated for movement up to 25 per cent of the initial joint size to EN 15651. It bonds directly to glass, ceramics and stainless steel and to certain plastics and rubbers, and reaches concrete, wood, mineral substrates and oxidisable metals through the Mapei Primerseal adhesion promoters. What it is not is a floor sealant: for joints subject to heavy traffic the data sheet directs you to a polyurethane or epoxy product instead. Within that limit it forms flexible, waterproof seals in expansion, contraction and fillet joints across building, mechanical engineering and manufacturing work. Shore A hardness is 20, cartridges hold 310 ml, and the range runs to 48 colours plus transparent, so a joint can be matched to the grout beside it.',
    meta_description:
      'Mapesil AC TDS: acetic silicone sealant with BioBlock, movement up to 25 per cent, 48 colours plus transparent. Download it from Lapiz Blue UAE.',
    applications: [
      'Expansion, contraction and fillet joints with movement up to 25%',
      'Sealing glass, ceramics and stainless steel',
      'Waterproof seals between construction elements',
      'Sanitary and glazing joints',
      'Colour matched joints alongside tile grout',
      'Seals in mechanical engineering and manufacturing',
    ],
    specs: {
      classification: 'EN 15651-1, EN 15651-2, EN 15651-3, EN 15651-4',
      shore_hardness: '20 (ISO 868)',
    },
  },
  'mapesil-lm': {
    description:
      'Stone is the reason Mapesil LM exists: a neutral, solvent free silicone with a low modulus of elasticity, formulated so that no surface bleeding or plasticiser migration can stain marble, granite, sandstone or quartz. The same chemistry suits brick, cellular concrete and varnished or enamelled wood, and it generally bonds without primer to glass, ceramic, enamelled surfaces, metals and many plastics as well as to absorbent mineral substrates such as concrete and render. Maximum movement in service is 25 per cent of joint width with an elongation modulus of 0.35 N per square millimetre, covering prefabricated panels, window and door frames, pipes against vertical walls and joints between cladding elements, indoors and out. Traffic is the limit: floors with light pedestrian use only, and a polyurethane for anything busier. Shore A hardness is 21, in 310 ml cartridges.',
    meta_description:
      'Mapesil LM TDS: neutral low modulus silicone sealant for marble, granite and stone, non staining, 25 per cent movement. From Lapiz Blue UAE.',
    applications: [
      'Sealing joints in marble, granite, sandstone and quartz',
      'Joints in brick, cellular concrete and enamelled wood',
      'Prefabricated panel joints',
      'Window and door frames and wall openings',
      'Joints between pipes and vertical walls',
      'Floors with limited pedestrian traffic',
    ],
    specs: {
      classification: 'EN 15651-1: F-EXT-INT-CC',
      shore_hardness: '21 (DIN 53505)',
    },
  },
  'mapesil-z-plus': {
    description:
      'Mapesil Z Plus is a mould resistant acetic silicone sealant for sanitary fittings and permanently damp environments, forming waterproof seals and joints between construction elements in building, mechanical, naval, automotive and industrial work. Once polymerised it bonds well to glass, ceramic and painted metal and strongly resists mould growth, which is what keeps a bathroom joint from blackening within a season. Maximum permitted movement in service is 12.5 per cent, so it is a sanitary and glazing sealant rather than a structural movement joint product, and it is not for traffic. Typical work is bathrooms, kitchens, laundry rooms, baths, showers and saunas, greenhouses, U profile glass, joints between glass and window frames, and air and water vents. Skin forms in 25 minutes, Shore A hardness is 18 and cartridges hold 280 ml.',
    meta_description:
      'Mapesil Z Plus TDS: mould resistant acetic silicone sealant for sanitary fittings and damp rooms, skin in 25 minutes. Download it from Lapiz Blue UAE.',
    applications: [
      'Mould resistant seals in bathrooms, kitchens and laundry rooms',
      'Sealing sanitary fittings, bath tubs, showers and saunas',
      'Sealing between glass and window frames',
      'Sealing U profile glass',
      'Sealing greenhouses',
      'Seals in permanently damp environments',
    ],
    specs: {
      classification: 'EN 15651-1: F-EXT-INT-CC; EN 15651-3: XS1',
      shore_hardness: '18 (ISO 868)',
      open_time: 'formation of skin: 25 minutes',
    },
  },
  'ultrabond-575': {
    description:
      'Ultrabond 575 is a water dispersion adhesive with a strong, rapid initial hold, used in interiors to bond skirtings and profiles in rigid PVC, rubber, wood and carpet onto absorbent wall substrates. It is an adhesive and not a joint sealant, and the distinction matters when ordering: it fixes the trim, it does not seal the line behind it. Open time is 25 minutes and consumption works out at 325 ml every 12 metres, so a cartridge covers a room of skirting rather than a floor. It is solvent free, certified GEV EC1, resistant to water once set, and does not stain or mark light coloured skirting. The working range is 5 to 35 degrees, with 24 months of shelf life in sealed cartridges kept cool, which on a UAE site means storing it inside rather than in a site container.',
    meta_description:
      'Ultrabond 575 TDS: water dispersion adhesive for skirtings and profiles in PVC, rubber, wood and carpet, 325 ml per 12 m. From Lapiz Blue UAE.',
    applications: [
      'Bonding skirtings and profiles in rigid PVC',
      'Bonding rubber and wood profiles',
      'Bonding carpet profiles on absorbent wall substrates',
      'Interior installation on absorbent wall substrates',
    ],
  },
  'ultrabond-ms-rapid': {
    description:
      'Ultrabond MS Rapid is a one component silylated polymer assembly adhesive with high initial tack, the so called sucker effect, and rapid final hardening, used to bond and assemble building components instead of or alongside mechanical fasteners. It works internally and externally and on damp substrates, bonding cement based materials, brick, stone, wood, metals, painted surfaces, ceramics, glass and rigid and flexible plastics. Typical work is internal and external window ledges and stone sills, balcony elements, skirting, parquet, cable trunking, insulating and soundproofing panels, roofing tiles, door surrounds and prefabricated elements, and it is specifically recommended for bonding Idrostop Soft hydro-expansive jointing strip when waterproofing second pours. Adjustment time is five minutes, so position the component promptly. A 290 ml cartridge gives about 5 metres of a 10 by 10 mm triangular bead.',
    meta_description:
      'Ultrabond MS Rapid TDS: rapid setting silylated polymer assembly adhesive for interior and exterior use, damp substrates included. From Lapiz Blue UAE.',
    applications: [
      'Bonding internal and external window ledges and stone sills',
      'Bonding skirting, parquet and cable trunking',
      'Bonding insulating and soundproofing panels',
      'Fixing roofing tiles and prefabricated elements',
      'Bonding Idrostop Soft hydro-expansive jointing strip',
      'Replacing or supplementing mechanical fasteners',
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

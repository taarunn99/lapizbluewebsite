/*
  Editorial content for the Kerakoll plasters and masonry, surface treatments
  and grouts and concrete repair lines.

  Original copy, 100 to 150 words per product. The thread running through the
  Biocalce range is that it is natural hydraulic lime or lime putty rather than
  cement, which is the distinction that decides whether it belongs on a given
  wall, so the descriptions explain it. The Geolite and Metric products are
  technological mortars for structural concrete repair, a different job, and are
  written as such. Several coverage values in the source data lost their unit
  exponent in extraction, so no description quotes a coverage figure.

  Usage: npx tsx scripts/apply-content-kerakoll-surfaces.ts
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
  /* Grouts and concrete repair: geo-mortars for reinforced concrete */
  geolite: {
    description:
      'Geolite is a mineral geo-mortar with a geo-binder base, formulated for the monolithic repair of reinforced concrete and declared under EN 1504-3. The binder is the distinction worth understanding. This is not a lime plaster and not an ordinary cement patching mortar, but a technological mortar meant to become one body with the concrete it repairs, so that patch and parent section behave alike under load and temperature. The thixotropic consistency lets it be applied to vertical faces and soffits without slumping, and normal setting at eighty minutes gives a working window rather than a rush. Supplied in 25 kg bags. On a Gulf structure, where chloride laden moisture drives reinforcement corrosion, preparation matters as much as the mortar: cut back to sound concrete and treat the exposed steel before patching.',
    meta_description:
      'Geolite TDS: mineral geo-mortar with geo-binder base for monolithic reinforced concrete repair, EN 1504-3. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Monolithic repair of reinforced concrete',
      'Vertical faces and soffits where a mortar must not slump',
      'Structural repair work specified to EN 1504-3',
      'Reinstating cover concrete over treated reinforcement',
    ],
  },
  'geolite-magma': {
    description:
      'Pourable rather than trowelled, Geolite Magma is a mineral geo-mortar with a geo-binder base for the monolithic repair of reinforced concrete, declared under EN 1504-7, the part of the standard covering protection of reinforcement against corrosion. Being multipurpose and pourable, it is the grade for repairs that have to be placed into formwork or into a deep section where a thixotropic mortar cannot be worked in, such as a column head or a beam cut back to the steel. Normal setting is sixty minutes and pot life forty five minutes, so formwork, mortar and gang all have to be ready before mixing starts. Supplied in 25 kg bags. In UAE summer temperatures that pot life shortens, which makes an early morning or night pour the sensible choice.',
    meta_description:
      'Geolite Magma TDS: pourable mineral geo-mortar for monolithic reinforced concrete repair, EN 1504-7, 45 min pot life. Download it from Lapiz Blue UAE.',
    applications: [
      'Pourable monolithic repair of reinforced concrete',
      'Deep sections and formed repairs such as column heads',
      'Repairs where reinforcement needs corrosion protection to EN 1504-7',
      'Multipurpose structural repair on concrete frames',
    ],
  },
  'metric-track': {
    description:
      'Metric Track is a rapid setting, fibre reinforced, semi thixotropic mortar for road, industrial and urban maintenance work, declared under EN 1504-3. Rapid setting is the whole point of it. The repairs it is made for sit under traffic, and the real cost of the work is measured in how long the road, the yard or the loading bay stays closed rather than in the price of the bag. Fibre reinforcement controls the shrinkage cracking that a fast mortar is otherwise prone to, and the semi thixotropic consistency handles both horizontal patches and the vertical edge of a bay. Pot life is fifty minutes and shelf life six months, shorter than the rest of the range, so order it to the job. Supplied in 25 kg bags.',
    meta_description:
      'Metric Track TDS: rapid setting fibre reinforced repair mortar for roads, yards and urban maintenance, EN 1504-3. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Road and carriageway patch repairs',
      'Industrial floor and loading bay maintenance',
      'Urban maintenance work needing a fast return to service',
      'Horizontal patches and bay edges in one mortar',
      'Repairs specified to EN 1504-3',
    ],
  },

  /* Surface treatments: silicate coatings, consolidants and protective coats */
  'geolite-microsilicato': {
    description:
      'Geolite Microsilicato is a mineral geo-paint for the decorative protection of concrete, declared under EN 1504-2, the surface protection part of the standard. It does two things at once. It is breathable, so moisture inside the concrete can leave rather than build up behind a film, and it is anti carbonation, which slows the atmospheric carbon dioxide that lowers the alkalinity of the cover concrete and lets reinforcement begin to corrode. That is a protective function rather than a cosmetic one, and it is the reason a repaired structure is coated rather than left bare. The finish is a fine grain effect. On an exposed UAE structure, carbonation and chloride ingress work together, so apply the protective coat as soon as the repair mortar has cured.',
    meta_description:
      'Geolite Microsilicato TDS: breathable anti carbonation mineral geo-paint for decorative concrete protection, EN 1504-2. Request it from Lapiz Blue UAE.',
    applications: [
      'Decorative protection of concrete structures',
      'Anti carbonation coating over completed concrete repairs',
      'Breathable protective finish on exposed concrete facades',
      'Surface protection specified to EN 1504-2',
    ],
  },
  'biocalce-rinzaffo': {
    description:
      'Biocalce Rinzaffo is a WTA certified breathable mortar based on NHL 3.5 natural hydraulic lime, used as the rough coat that goes on before a dehumidifying plaster. It is the key layer of the system. Thrown on to leave a coarse open surface, it gives the plaster above something to grip and it regulates how moisture and salts move out of the wall. Natural hydraulic lime is chosen over cement here for a reason: lime stays vapour permeable and relatively soft, so damp can evaporate through the build up, whereas a cement rich coat blocks that path and drives the salts sideways into the masonry instead. WTA certification is the German restoration standard for that behaviour. Supplied in 25 kg bags. On salt affected ground floor walls the rough coat is not optional.',
    meta_description:
      'Biocalce Rinzaffo TDS: WTA certified NHL 3.5 natural hydraulic lime rough coat for masonry before dehumidifying plaster. Request it from Lapiz Blue UAE.',
    applications: [
      'Rough coat on masonry before a dehumidifying plaster',
      'Key layer for highly breathable lime plaster systems',
      'Damp affected and salt affected masonry restoration',
      'Work specified to the WTA restoration standard',
    ],
    category: 'plaster',
  },
  'biocalce-silicato-consolidante': {
    description:
      'A consolidant rather than a coating, Biocalce Silicato Consolidante is a natural, breathable, stabilising cortical consolidant based on pure stabilised potassium silicate, and it is solvent free. Cortical means it works within the outer skin of the substrate. The silicate penetrates the surface and reacts with the mineral it finds there, binding loose material back into a sound layer instead of gluing it down under a film. That matters because a weak chalking mineral surface takes any paint off with it when the paint eventually pulls away. Treated first, the surface holds. It stays breathable, which is why it suits old lime plasters and masonry rather than being limited to modern render. Supplied in 10 litre cans with a six month shelf life. Test an area first, since some substrates darken.',
    meta_description:
      'Biocalce Silicato Consolidante TDS: solvent free potassium silicate consolidant for weak chalking mineral surfaces. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Consolidating weak and chalking mineral surfaces',
      'Stabilising old lime plasters before decoration',
      'Preparing masonry for a breathable silicate build up',
      'Solvent free consolidation in occupied interiors',
    ],
  },
  'biocalce-silicato-fondo': {
    description:
      'Biocalce Silicato Fondo is a natural intermediate filling coat based on pure stabilised potassium silicate, the layer between a prepared substrate and a silicate paint or render. Filling is the clue to what it is for. It has body, so it evens out the fine porosity and minor texture that would otherwise show through a thin mineral paint as patches of different sheen and absorbency. Silicate chemistry binds chemically to mineral substrates rather than forming a film over them, which keeps the wall vapour permeable and keeps the whole build up compatible. Consumption is stated as 0.5 kg per square metre. Supplied in 14 litre buckets with a six month shelf life, so order it with the paint rather than ahead of the programme. Apply to a sound, dust free surface.',
    meta_description:
      'Biocalce Silicato Fondo TDS: natural potassium silicate intermediate filling coat, 0.5 kg per square metre. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Intermediate filling coat under silicate paint',
      'Evening out porosity and minor texture before decoration',
      'Breathable mineral build ups on lime and silicate plasters',
      'Preparing repaired or patchy walls for a thin mineral finish',
    ],
  },
  'biocalce-silicato-fondo-fino': {
    description:
      'Where the surface is already close to flat, Biocalce Silicato Fondo Fino is the lighter option: a natural uniforming intermediate coat based on pure stabilised potassium silicate. Uniforming rather than filling is the difference from the heavier grade. It evens out absorbency and colour so the silicate paint over it dries to one consistent appearance, without adding the body that a textured or repaired wall would need. Choosing between the two comes down to how much the substrate still has to be corrected. Like the rest of the silicate range it bonds chemically into the mineral substrate and leaves the wall vapour permeable, which is what keeps it compatible with old lime work. Supplied in 14 litre buckets with a six month shelf life. The substrate must be dry and sound.',
    meta_description:
      'Biocalce Silicato Fondo Fino TDS: natural potassium silicate uniforming intermediate coat for even silicate paint. Request it from Lapiz Blue UAE.',
    applications: [
      'Uniforming coat under natural silicate paint',
      'Evening out absorbency on walls that are already flat',
      'Breathable mineral decoration over lime plasters',
      'Interior and exterior mineral build ups',
    ],
  },
  'biocalce-silicato-puro-pittura': {
    description:
      'Biocalce Silicato Puro Pittura is a natural wall paint based on pure stabilised potassium silicate, coloured with natural earths and minerals. A silicate paint is not a film. It reacts with the mineral surface beneath and becomes part of it, which is why it does not peel away in sheets the way an organic paint does once moisture gets behind it, and why the wall stays vapour permeable. Mineral pigments also hold their colour under strong sunlight better than many organic colourants, which is worth something on a UAE elevation. The condition is compatibility: silicate paint needs a mineral substrate, so it belongs over lime and silicate plasters, not over existing plastic paint. Supplied in 14 litre buckets with a six month shelf life. Use the matching silicate undercoat rather than a general primer.',
    meta_description:
      'Biocalce Silicato Puro Pittura TDS: natural potassium silicate wall paint with mineral pigments, breathable. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Breathable wall paint over lime and silicate plasters',
      'Mineral decoration of restored masonry',
      'External elevations where colour fastness matters',
      'Interiors needing a natural solvent free finish',
    ],
  },

  /* Plasters and masonry: the Biocalce lime range and Rasobuild Eco finishes */
  'keraplast-p6': {
    description:
      'Keraplast P6 is a latex for mineral mortars and slurry keys, added to the mixing water rather than applied as a layer of its own. Its job is adhesion and cohesion. A slurry key gauged with latex grips a smooth dense substrate that a plain cement slurry would simply sit on, and a mineral mortar modified with it bonds better to the surrounding material. Because it changes the mortar rather than coating the wall, the dose follows the mortar being modified, so take it from the data sheet for the mix being gauged rather than by eye. Supplied in 1 kg cans with twelve months of shelf life, a size that suits site repairs and small areas. On a hot UAE site, latex gauged mixes stiffen quickly, so gauge only what the gang can place.',
    meta_description:
      'Keraplast P6 TDS: latex for mineral mortars and slurry keys, 1 kg cans, improves adhesion and cohesion. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Gauging slurry keys on smooth dense substrates',
      'Modifying mineral mortars for better adhesion',
      'Improving cohesion in site mixed repair work',
      'Small area and patch repairs',
    ],
    category: 'bonding_agent',
  },
  'biocalce-fondo': {
    description:
      'Biocalce Fondo is a certified mineral undercoat based on selected pure CL 90-S lime putty to EN 459-1, with selected inert materials, applied before a lime paint or lime finish. Its function is to make the wall uniform. Old plaster absorbs unevenly, and a lime paint taken straight onto it dries at different rates across the surface and reads as patchiness that no second coat fully cures. The undercoat equalises that suction and gives the finish a consistent key. Lime putty keeps the layer vapour permeable and chemically the same as the lime work above and below it, which is the point of staying inside one material family. Supplied in 14 litre buckets with twelve months of shelf life. Stir thoroughly before use, because the inert content settles in the pail.',
    meta_description:
      'Biocalce Fondo TDS: certified CL 90-S lime putty mineral undercoat to EN 459-1 for lime paints. Request the technical data sheet from Lapiz Blue UAE.',
    applications: [
      'Undercoat before natural lime paint',
      'Evening out absorbency on old plaster',
      'Breathable mineral decoration of restored walls',
      'Interior and exterior lime build ups',
    ],
    category: 'primer',
  },
  'biocalce-fondo-universale': {
    description:
      'The universal grade of the lime undercoat, Biocalce Fondo Universale is based on selected pure CL 90-S lime putty to EN 459-1 and contains natural micronised casein. Casein is a traditional binder, and it is what widens the range of surfaces this coat will hold on. Universal means it can be taken over substrates that pure lime alone grips poorly, which in practice is often what decides whether a lime finish can be used on an existing wall at all. Beyond that it does the same work as the standard undercoat, evening out absorbency so the lime paint or fine plaster above dries uniformly, and leaving the layer vapour permeable. Shelf life is twelve months. Check the existing finish before specifying it, because a sound mineral surface remains the condition for success.',
    meta_description:
      'Biocalce Fondo Universale TDS: CL 90-S lime putty undercoat with natural casein for difficult substrates. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Universal undercoat before lime paints and fine plasters',
      'Substrates that pure lime grips poorly',
      'Renovation work over existing wall finishes',
      'Breathable mineral decoration schemes',
    ],
    category: 'primer',
  },
  'biocalce-intonachino-colorato': {
    description:
      'Biocalce Intonachino Colorato is a certified fine mineral plaster based on selected pure CL 90-S lime putty to EN 459-1, with natural coloured minerals and marble fillers, used for the breathable decoration of plaster and render coats. The colour is in the material rather than painted on afterwards, so weathering changes it gradually instead of flaking, and a scuff shows the same colour underneath. Marble fillers give the fine texture. It belongs at the top of a lime build up, over a lime plaster and undercoat, where the whole wall stays vapour permeable from the masonry outwards. Supplied in 25 kg buckets with twelve months of shelf life. Agree colour and texture on a sample panel on site, because trowel technique affects both as much as the material does.',
    meta_description:
      'Biocalce Intonachino Colorato TDS: certified CL 90-S lime putty fine coloured plaster with marble fillers. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Breathable decoration of plaster and render coats',
      'Coloured lime finish on restored masonry',
      'Interior and exterior decorative lime build ups',
      'Facades where colour runs through the material',
    ],
  },
  'biocalce-intonachino-fino': {
    description:
      'For a fine grain finish over a conventional plaster, Biocalce Intonachino Fino is the breathable finishing product based on NHL 3.5 natural hydraulic lime. It is the last coat of a lime plaster system and it decides the texture the wall will read as, while leaving the build up vapour permeable from the masonry outwards. That permeability is the reason to choose lime over a cement skim on an older wall: moisture in the masonry can evaporate through the plaster instead of being trapped behind it and pushing the surface off. Fine grain suits internal walls and smooth elevations. Supplied in 25 kg bags with twelve months of shelf life. In UAE heat the lime has to be kept from drying too quickly, so shade and damp cure fresh work as the data sheet directs.',
    meta_description:
      'Biocalce Intonachino Fino TDS: breathable NHL 3.5 natural hydraulic lime fine grain finish for plasters and renders. Request it from Lapiz Blue UAE.',
    applications: [
      'Fine grain finishing of conventional plasters and renders',
      'Final coat of a breathable lime plaster system',
      'Internal walls and smooth external elevations',
      'Older masonry that needs to dry through the finish',
    ],
  },
  'biocalce-intonachino-granello': {
    description:
      'Biocalce Intonachino Granello is the medium grain version of the NHL 3.5 natural hydraulic lime finishing product, applied as the final coat over a conventional plaster or render. Grain size is a practical choice as well as a visual one. A coarser finish hides small irregularities in the coat beneath and reads as less flat under raking light, which is why it is often preferred on larger external elevations where a fine finish would show every variation in the plane. The lime binder keeps the surface breathable, so moisture in the wall can still escape through it rather than collecting behind. Supplied in 25 kg bags with twelve months of shelf life. Protect fresh work from direct sun and wind, because lime that dries before it has properly carbonated ends up weak and dusty.',
    meta_description:
      'Biocalce Intonachino Granello TDS: breathable NHL 3.5 natural hydraulic lime medium grain finish for renders. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Medium grain finishing of conventional plasters and renders',
      'Large external elevations where a fine finish shows variation',
      'Final coat of a breathable lime plaster system',
      'Restoration work on older masonry',
    ],
  },
  'biocalce-intonachino-tipo-00': {
    description:
      'Biocalce Intonachino Tipo 00 is the breathable NHL 3.5 natural hydraulic lime finishing product made for a polished finish, the closest to flat that the lime range goes. Tipo 00 denotes the finest grade, and a polished lime surface is worked rather than simply applied: it is compacted with the trowel as it stiffens, which closes the surface and gives it a soft sheen. That makes it a finish for considered internal work rather than for covering a rough coat. It still leaves the wall vapour permeable, which is what keeps it compatible with old masonry and with the lime plaster beneath. Supplied in 20 kg bags with twelve months of shelf life. The result depends on the applicator, so put the gang who will do the work onto the sample panel.',
    meta_description:
      'Biocalce Intonachino Tipo 00 TDS: breathable NHL 3.5 natural hydraulic lime finish for polished lime surfaces. Request it from Lapiz Blue UAE.',
    applications: [
      'Polished finishing of lime plasters and renders',
      'Fine interior finishes on restored masonry',
      'Final coat of a breathable lime plaster system',
      'Work where a closed, low sheen surface is wanted',
    ],
  },
  'biocalce-intonaco': {
    description:
      'Biocalce Intonaco is a WTA certified plaster based on NHL 3.5 natural hydraulic lime for highly breathable plastering and rendering. This is the body coat of a lime system, the layer that gives a wall its thickness and its plane. Lime behaves differently to cement on old masonry, and that is the reason to specify it. It is vapour permeable, so damp in the wall evaporates through the plaster, and it is softer than the masonry, so movement is taken up in the plaster rather than cracking the stone or brick behind it. Cement does the opposite on both counts. WTA certification is the German restoration standard. Supplied in 25 kg bags with twelve months of shelf life. Dampen absorbent masonry before applying, particularly on a summer site where the wall is already hot.',
    meta_description:
      'Biocalce Intonaco TDS: WTA certified NHL 3.5 natural hydraulic lime plaster for highly breathable rendering. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Highly breathable plastering and rendering of masonry',
      'Body coat of a lime plaster system',
      'Restoration of old stone and brick walls',
      'Work specified to the WTA restoration standard',
      'Walls where cement render would trap damp',
    ],
  },
  'biocalce-intonaco-fino': {
    description:
      'Biocalce Intonaco Fino is a plaster based on NHL 3.5 natural hydraulic lime for highly breathable plastering and rendering, the finer grade of the lime body coat. Where the standard grade builds thickness, the fine grade suits thinner applications and surfaces that need a closer texture before the finishing coat goes on, which means fewer passes to get from masonry to finish on a wall that is already reasonably true. The lime binder gives the same vapour permeability and the same compatibility with old masonry: moisture leaves the wall rather than being trapped, and the plaster stays softer than the substrate it covers. Supplied in 25 kg bags with twelve months of shelf life. Mix only what can be used, and keep fresh work out of direct sun while it cures.',
    meta_description:
      'Biocalce Intonaco Fino TDS: NHL 3.5 natural hydraulic lime fine plaster for highly breathable rendering. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Highly breathable plastering and rendering in thinner coats',
      'Walls already close to true that need a closer texture',
      'Restoration of old masonry in a lime build up',
      'Base for a lime finishing coat',
    ],
  },
  'biocalce-marmorino': {
    description:
      'Marmorino is a traditional lime finish, and Biocalce Marmorino is the certified version of it: a natural plaster based on selected pure CL 90-S lime putty to EN 459-1, containing natural coloured soils. It is decorative, laid thin and burnished in several passes to give the depth and slight translucency the finish is known for. The colour comes from mineral soils through the body of the material, so it does not sit on the surface as a paint film and cannot peel off as one. Being pure lime putty it stays vapour permeable, which suits old walls and lime build ups. Supplied in 25 kg buckets with twelve months of shelf life. This is an applicator dependent finish, so price the labour properly and approve a panel before the wall is started.',
    meta_description:
      'Biocalce Marmorino TDS: certified CL 90-S lime putty decorative plaster with natural coloured soils. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Decorative burnished lime finish on interior walls',
      'Breathable decoration over lime plaster systems',
      'Restoration work needing a traditional lime finish',
      'Feature surfaces coloured with natural soils',
    ],
  },
  'biocalce-muratura': {
    description:
      'Biocalce Muratura is a breathable mortar based on NHL 3.5 natural hydraulic lime for bedding masonry and dubbing out. Bedding mortar is structural, since it transfers load between units, and on an old wall it also has to be weaker than the units themselves so that any movement is absorbed in the joint rather than cracking the stone or brick. A cement mortar is harder than most historic masonry and does the damage the other way round. Lime also lets the wall dry out through its joints. Dubbing out is the same mortar used to bring an irregular wall roughly to plane before plastering. Supplied in 25 kg bags with twelve months of shelf life. Keep the joint profile consistent, and dampen dry absorbent units before laying in hot weather.',
    meta_description:
      'Biocalce Muratura TDS: breathable NHL 3.5 natural hydraulic lime mortar for bedding and dubbing out masonry. Request it from Lapiz Blue UAE.',
    applications: [
      'Bedding mortar for stone and brick masonry',
      'Dubbing out irregular walls before plastering',
      'Restoration work where cement mortar would damage the units',
      'Walls that need to dry out through their joints',
    ],
  },
  'biocalce-muratura-fino': {
    description:
      'Structural strengthening is what separates Biocalce Muratura Fino from the standard grade. It is a breathable NHL 3.5 natural hydraulic lime mortar for bedding and dubbing out masonry and also for strengthening it, the application where a lime mortar is used with reinforcement to improve how an existing wall carries load and resists movement. Keeping that work in lime matters, because a strengthened wall still has to breathe and a cement based intervention leaves the masonry stiffer in one area than another. The finer grade also works into tighter joints and smaller voids. Supplied in 25 kg bags with twelve months of shelf life. Strengthening is designed rather than specified off a data sheet, so take the detail from the engineer for the structure in question.',
    meta_description:
      'Biocalce Muratura Fino TDS: breathable NHL 3.5 lime mortar for bedding, dubbing out and masonry strengthening. Request it from Lapiz Blue UAE.',
    applications: [
      'Structural strengthening of existing masonry',
      'Bedding and dubbing out in a lime build up',
      'Tight joints and small voids needing a finer mortar',
      'Restoration work that has to stay vapour permeable',
    ],
  },
  'biocalce-pietra': {
    description:
      'Biocalce Pietra is a breathable NHL 3.5 natural hydraulic lime mortar for bedding and pointing exposed masonry, where the joint is part of the finished appearance rather than hidden behind plaster. Pointing an exposed wall carries two demands that pull against each other. The mortar has to weather in the open, and it has to stay more permeable and softer than the stone so that water leaves through the joint instead of through the face of the stone. Lime does both. A cement point sheds water onto the stone and erodes it instead. Joint colour and profile are visible here, so both are worth approving on a trial length. Supplied in 25 kg bags with twelve months of shelf life. Rake the old joint back to sound mortar before repointing.',
    meta_description:
      'Biocalce Pietra TDS: breathable NHL 3.5 natural hydraulic lime mortar for bedding and pointing exposed masonry. Request it from Lapiz Blue UAE.',
    applications: [
      'Pointing exposed stone and brick masonry',
      'Bedding mortar for fair faced masonry',
      'Repointing historic walls without cement',
      'Joints that have to weather and stay permeable',
    ],
  },
  'biocalce-silicato-puro': {
    description:
      'Biocalce Silicato Puro is a certified natural fine render based on pure stabilised potassium silicate, coloured throughout with natural soils and minerals. It sits at the top of a mineral build up as both the finish texture and the colour. Silicate binders work by reacting with the mineral substrate rather than drying as a film over it, which gives a bond that does not blister or peel and leaves the wall vapour permeable. The condition is that the substrate must be mineral, because over an existing organic paint there is nothing for the silicate to react with. Supplied in 25 kg buckets with a six month shelf life, shorter than the lime products, so plan deliveries around the programme. Use the matching silicate undercoat beneath it and approve the colour on a panel.',
    meta_description:
      'Biocalce Silicato Puro TDS: certified natural potassium silicate fine render coloured with mineral soils. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Fine mineral render coloured throughout',
      'Breathable finish over lime and silicate build ups',
      'External elevations needing a non peeling mineral surface',
      'Restoration work kept within one mineral family',
    ],
  },
  'biocalce-spatolato': {
    description:
      'Applied with a spreader or trowel, Biocalce Spatolato is a certified natural plaster based on selected pure CL 90-S lime putty to EN 459-1, containing natural coloured soils. It is a thin decorative lime finish built up in passes, and the look comes from how it is laid, since the trowel leaves the movement and shading that distinguish a spatolato surface from a flat painted wall. Colour runs through the material as mineral soil rather than sitting on top of it. Pure lime putty keeps the finish vapour permeable, so it belongs over lime plasters and undercoats rather than over a sealed modern surface. Supplied in 25 kg buckets with twelve months of shelf life. Approve a sample panel made by the gang who will do the wall, because technique governs the result.',
    meta_description:
      'Biocalce Spatolato TDS: certified CL 90-S lime putty trowel applied decorative plaster with natural coloured soils. Request it from Lapiz Blue UAE.',
    applications: [
      'Trowel applied decorative lime finish',
      'Interior feature walls over lime plaster',
      'Breathable decoration of restored masonry',
      'Finishes coloured with natural mineral soils',
    ],
  },
  'biocalce-tinteggio': {
    description:
      'Biocalce Tinteggio is a certified natural wall paint based on selected pure CL 90-S lime putty to EN 459-1 with naturally coloured pigments. Lime paint is the correct top coat for a lime plaster, and the reason is compatibility. It stays vapour permeable, so the moisture that a lime plaster is specified to let out is not stopped at the last fraction of a millimetre by a plastic film. A conventional emulsion over lime plaster traps that moisture and then blisters. Lime paint also carbonates into the surface rather than sitting on it. It works over lime plasters and the matching lime undercoat. Shelf life is twelve months. Expect the slight variation in tone that lime paint gives, which is part of the finish, and coat whole elevations in one go.',
    meta_description:
      'Biocalce Tinteggio TDS: certified CL 90-S lime putty natural wall paint with mineral pigments, breathable. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Breathable top coat over lime plasters',
      'Decoration of restored masonry interiors',
      'Natural mineral paint for heritage work',
      'Walls where an emulsion would trap moisture',
    ],
    category: 'surface_treatment',
  },
  'biocalce-zoccolatura': {
    description:
      'Biocalce Zoccolatura is a WTA certified dehumidifying plaster based on NHL 3.5 natural hydraulic lime, made for restoring masonry affected by damp. A dehumidifying plaster is not a waterproofer. It is deliberately porous, so that moisture rising through a wall evaporates within the thickness of the plaster and the salts it carries crystallise inside the pore structure rather than on the finished face. Blocking the damp instead, with a cement render or a tanking coat, only moves it higher up the wall. WTA certification is the German restoration standard for exactly this behaviour. Supplied in 25 kg bags with twelve months of shelf life. It goes over a rough coat and has to be built as a system, because a dehumidifying plaster finished with a dense skim stops working.',
    meta_description:
      'Biocalce Zoccolatura TDS: WTA certified NHL 3.5 natural hydraulic lime dehumidifying plaster for damp masonry. Request it from Lapiz Blue UAE.',
    applications: [
      'Dehumidifying plaster on damp affected masonry',
      'Restoring ground floor and plinth level walls',
      'Salt affected masonry where cement render has failed',
      'Work specified to the WTA restoration standard',
    ],
  },
  'rasobuild-eco-consolidante': {
    description:
      'Rasobuild Eco Consolidante is a stabilising agent used to strengthen old and fragmented plaster and render coats before anything is applied over them. It answers the question that decides most renovation jobs, which is whether the existing plaster can be kept or has to come off. A coat that is weak and crumbling at the surface but still sound behind can be consolidated and reused, saving the cost and the mess of hacking off. One that has lost its bond to the masonry cannot, and no consolidant will change that, so hammer test the wall first. Supplied in 5 kg cans with twenty four months of shelf life, the longest in this range. Apply to a clean, dust free surface and let it cure before the levelling coat goes on.',
    meta_description:
      'Rasobuild Eco Consolidante TDS: stabilising agent to strengthen old and fragmented plaster and render coats. Request it from Lapiz Blue UAE.',
    applications: [
      'Strengthening old and fragmented plaster coats',
      'Consolidating weak render before refinishing',
      'Renovation work where existing plaster is to be retained',
      'Preparing dusty mineral surfaces for a finishing coat',
    ],
    category: 'surface_treatment',
  },
  'rasobuild-eco-extrafino': {
    description:
      'Rasobuild Eco Extrafino is an eco friendly mineral plaster and render finish, the finest grade in the Rasobuild Eco range as the name indicates. It is a finishing coat rather than a body coat. It goes on thin over a levelled substrate to give the surface its final texture before decoration, and it follows the plane it is given, so the correction has to be done in the layer below it. Being mineral, it stays breathable and compatible with mineral substrates. Pot life is four hours, which is generous and makes it workable for a small gang across a large wall. Supplied in 20 kg bags with twelve months of shelf life. On a hot UAE site that pot life shortens in practice, so keep bags and mixing water out of the sun.',
    meta_description:
      'Rasobuild Eco Extrafino TDS: eco friendly extra fine mineral plaster and render finish, 4 h pot life. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Extra fine finishing of plaster and render coats',
      'Thin finishing layer before decoration',
      'Breathable mineral finishes on mineral substrates',
      'Interior walls needing the smoothest mineral surface',
    ],
  },
  'rasobuild-eco-fino': {
    description:
      'The standard fine grade of the range, Rasobuild Eco Fino is an eco friendly mineral plaster and render finish supplied in 25 kg bags. It is the finishing coat that takes a levelled wall to a smooth surface ready for decoration, and the choice between it and the extra fine grade comes down to how closed the finish has to be and how the wall will be painted or coated afterwards. A mineral finish keeps the build up vapour permeable, which matters when the substrate is itself mineral and needs to dry through. Pot life is four hours and shelf life twelve months. Build it in the coats the data sheet specifies rather than in one heavy pass, because a thick finishing coat shrinks and crazes as it dries.',
    meta_description:
      'Rasobuild Eco Fino TDS: eco friendly fine mineral plaster and render finish, 25 kg bags, 4 h pot life. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Fine finishing of plaster and render coats',
      'Smooth mineral surface before painting',
      'Breathable finishes on mineral substrates',
      'Interior and exterior renovation work',
    ],
  },
  'rasobuild-eco-granello': {
    description:
      'Rasobuild Eco Granello is the grained version of the Rasobuild Eco mineral plaster and render finish, which is the practical difference from the fine grades. A textured finish is more forgiving than a smooth one. It breaks up reflected light, so small variations in the coat beneath become far less visible, and on a long external elevation that is often the deciding factor. It remains a mineral finishing coat, breathable and compatible with mineral substrates. Pot life is four hours and shelf life twelve months, supplied in 25 kg bags. Texture depends on how the surface is worked as the material stiffens, so keep one applicator and one technique across an elevation, and agree the finish on a sample panel before the wall is started.',
    meta_description:
      'Rasobuild Eco Granello TDS: eco friendly grained mineral plaster and render finish, 25 kg bags, 4 h pot life. Request it from Lapiz Blue UAE.',
    applications: [
      'Grained finishing of plaster and render coats',
      'Long external elevations where a smooth finish shows variation',
      'Breathable textured mineral finishes',
      'Renovation work over levelled substrates',
    ],
  },
  'rasobuild-eco-top-fino': {
    description:
      'Rasobuild Eco Top Fino is an eco friendly mineral finishing coat, and what sets it apart from the plain finishing grades is its declaration under EN 1504-3, the concrete repair standard. That places it on repaired concrete rather than only on plaster. It is the smooth finishing layer taken over a structural repair mortar to bring a patched face back to one surface before a protective coating goes on. Specifiers working to EN 1504 need every layer in the build up declared, which is what this grade provides. Pot life is four hours and shelf life twelve months, supplied in 25 kg bags. Confirm compatibility with the repair mortar below and the protective coating above, because the three are meant to work together as one system.',
    meta_description:
      'Rasobuild Eco Top Fino TDS: eco friendly fine mineral finishing coat for concrete repairs, EN 1504-3. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Fine finishing coat over concrete repair mortars',
      'Bringing patched concrete faces back to one surface',
      'Build ups specified to EN 1504-3',
      'Preparation for an anti carbonation protective coating',
    ],
  },
  'rasobuild-eco-top-granello': {
    description:
      'Declared under EN 1504-3 like its fine grained counterpart, Rasobuild Eco Top Granello is an eco friendly mineral finishing coat with a grained texture, used over concrete repairs rather than over plaster alone. The reason to choose the grained version on a repaired structure is visual continuity. A patched elevation rarely comes back perfectly flat, and a texture conceals the ghosting of repair outlines that a smooth coat will show as soon as the sun crosses the facade. It is mineral and breathable, which keeps it compatible with the repair mortar beneath. Pot life is four hours and shelf life twelve months, supplied in 25 kg bags. Keep the texture consistent across the whole elevation rather than only over the repairs, or the patches stay readable.',
    meta_description:
      'Rasobuild Eco Top Granello TDS: eco friendly grained mineral finishing coat for concrete repairs, EN 1504-3. Request it from Lapiz Blue UAE.',
    applications: [
      'Grained finishing coat over concrete repair mortars',
      'Concealing repair outlines on patched elevations',
      'Build ups specified to EN 1504-3',
      'Preparation for a protective coating on concrete',
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

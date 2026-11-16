/*
  Editorial content for the Vetonit surface treatments and plasters lines,
  the last two of the nine.

  Original copy, 100 to 150 words per product. Also tidies several spec values
  the PDF extractor captured mid sentence, and moves the decorative finish
  coats out of the microcement category, which they were placed in by wording
  rather than by what they are.

  Usage: npx tsx scripts/apply-content-vetonit-surfaces.ts
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
  /* Surface treatments and finishes */
  'vetonit-putty-wr': {
    description:
      'Vetonit Putty WR is a water resistant premixed cementitious putty, the skim coat that gives a wall its final smooth surface before paint. Being cement based rather than a filler, it survives the damp that would break down an internal putty, which is what the WR designation marks. It is applied over plaster, concrete and blockwork to take out the fine texture a render leaves, and it is the layer that decides whether a painted wall reads as flat or shows every trowel mark under raking light. Consumption is 1.1 kg per square metre per millimetre of thickness. A 25 kg bag takes 10 to 11 litres of clean water, and a 40 kg bag 16 to 17.6 litres. Wet the wall before applying, as the sheet instructs.',
    meta_description:
      'Vetonit Putty WR TDS: water resistant premixed cementitious putty, 1.1 kg/m2/mm. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Smooth finishing of internal and external walls before paint',
      'Skimming over plaster, concrete and blockwork',
      'Areas exposed to humidity where an internal filler would break down',
      'Taking out fine texture left by a render coat',
    ],
    specs: { mixing_ratio: '10 to 11 litres of water per 25 kg bag' },
  },
  'vetonit-finish-wr-eg': {
    description:
      'Vetonit Finish WR EG is a water resistant premixed smooth cement coating for external walls, applied from 1 to 3 mm as the finishing layer over a base coat. External work is where a finish earns its keep: it has to hold colour and integrity through direct sun, wind driven dust and the humidity swing of a coastal UAE site, conditions that strip an internal grade within a season. It is applied to walls and other surfaces in dry to humid conditions, and suits smooth concrete and precast concrete surfaces where a conventional render struggles to key. Consumption is 1.5 kg per square metre per millimetre. A 25 kg bag takes 9.75 to 10.25 litres of clean water. Allow about 5 days before overcoating or exposing it to service conditions.',
    meta_description:
      'Vetonit Finish WR EG TDS: water resistant premixed smooth cement coating for external walls, 1 to 3 mm. Download it from Lapiz Blue UAE.',
    specs: { mixing_ratio: '9.75 to 10.25 litres of water per 25 kg bag' },
    dropSpecs: ['compressive_strength'],
  },
  'vetonit-base-wr-eg': {
    description:
      'Vetonit Base WR EG is a weather resistant premixed cement coating used as the base layer of an external wall finish, beneath Vetonit Finish WR EG. The base coat does the levelling and provides the key; the finish coat above gives the surface. Splitting the two is what allows a wall to be brought true and then finished smooth, rather than trying to do both in one pass and getting neither. It is applied externally to walls and other surfaces in dry and humid conditions, and suits concrete and precast concrete substrates. A 50 kg bag takes 7.5 to 8.5 litres of clean water. Allow about 5 days before the finish coat. On smooth dense concrete, a key coat goes on first or nothing will hold.',
    meta_description:
      'Vetonit Base WR EG TDS: weather resistant premixed cement base coating for external walls. Request the data sheet from Lapiz Blue UAE.',
  },
  'putty-fine': {
    description:
      'Putty Fine is a PVA based ready to use finishing putty for internal walls and ceilings, supplied in 20 kg pails so there is no mixing and no water ratio to judge. It levels minor surface undulations on concrete, plaster and precast surfaces that are already smooth, giving the flat uniform base a paint finish needs. The PVA base is what makes it easy to apply and sand, and also what confines it to dry internal conditions: PVA re emulsifies in water, so on an external wall or in a bathroom it will fail regardless of how well it was applied. For those locations the cement based water resistant putty is the correct product. Being ready to use, it can be opened, used and resealed without waste on small areas.',
    meta_description:
      'Putty Fine TDS: PVA based ready to use smooth finishing putty for internal walls and ceilings. Request the sheet from Lapiz Blue UAE.',
  },
  'vetonit-gypsum-joint-compound': {
    description:
      'Vetonit Gypsum Joint Compound is a premixed powder for jointing and finishing gypsum board, applied from 1 to 5 mm. Board jointing is its own discipline: the compound has to fill the recess, bed the tape, and feather out far enough either side that the joint disappears under paint, without shrinking back and leaving the tape edge visible. A compound formulated for the job does that; a general filler does not. It also levels minor surface undulations and works as a smooth skimming compound, and is used internally on both horizontal and vertical surfaces, which matters because ceiling work is where a heavy compound becomes unworkable. A 20 kg bag takes 7.5 to 8.8 litres of clean water. Build in the coats the sheet specifies rather than one thick pass.',
    meta_description:
      'Vetonit Gypsum Joint Compound TDS: premixed compound for gypsum board joints, 1 to 5 mm. Request the sheet from Lapiz Blue UAE.',
  },
  'vetogyps-compound': {
    description:
      'Vetogyps Compound is a multipurpose ready to use drywall joint compound supplied in 28 kg pails, mixed and ready to open. It serves as the finishing coat over cement and gypsum board joints, angles and fastener heads, and can be used for all three coats of a jointing system or as a skimming coat over dry gypsum board where a continuous smooth surface is wanted rather than a jointed one. Ready mixed removes the main inconsistency in board finishing, which is a compound mixed slightly differently each time and sanding differently as a result. The trade off is weight and shelf life once opened. Keep the lid sealed between uses. Allow each coat to dry fully before the next, because sanding a coat that is still damp tears rather than cuts.',
    meta_description:
      'Vetogyps Compound TDS: ready to use multipurpose drywall joint compound for boards, angles and skimming. Request it from Lapiz Blue UAE.',
  },
  'vetonit-crack-filler': {
    description:
      'Vetonit Crack Filler is a premixed cementitious filler for static cracks up to 4 mm, blowholes and minor surface undulations. The word static is the specification: a crack that is still moving will reopen through any filler, so the cause has to be addressed first and a movement joint formed if that is what the structure needs. Within that limit it does the making good that lets a wall take paint or a coating cleanly, filling the blowholes and hairline cracking that a render or a concrete pour leaves behind. It works internally and externally in wet and dry conditions, which is more than a gypsum based filler can claim. A 20 kg bag takes 7 to 8 litres of clean water. Open the crack out slightly before filling so the material has something to hold.',
    meta_description:
      'Vetonit Crack Filler TDS: premixed cementitious filler for static cracks up to 4 mm and blowholes. Request the sheet from Lapiz Blue UAE.',
  },
  'vetorel-xt420': {
    description:
      'Vetorel XT420 is a water based mould and formwork release agent, applied to wooden and metal shuttering before concrete is cast so the form strips cleanly. A release agent does more than save labour at striking: it minimises surface blemishes, blowholes and staining on the finished concrete, which matters a great deal on fair faced work where the concrete is the finish and there is no second chance. Being water based it carries no solvent odour and is easier to use in enclosed areas such as precast beds and basements. Supplied ready to use in 20 and 210 litre sizes, the drum size suiting a precast yard. Apply thinly and evenly: excess release agent is as damaging to the surface as too little, and it can interfere with anything applied afterwards.',
    meta_description:
      'Vetorel XT420 TDS: water based mould and formwork release agent for wooden and metal shuttering. Request the sheet from Lapiz Blue UAE.',
  },
  'vetorel-xt421': {
    description:
      'Vetorel XT421 is a chemical mould and formwork release agent for wooden and metal shuttering, the grade used where a water based product does not give the release or the surface quality required. It works by reacting at the interface rather than simply forming a barrier film, which produces a cleaner strip and fewer surface blemishes and blowholes on the cast face. That makes it the choice for fair faced and architectural concrete where the surface is the finished product. Supplied ready to use in 20 and 210 litre sizes. Apply thinly and uniformly, because a heavy film causes dusting and staining on the concrete face and can affect the bond of any coating applied later. Confirm compatibility before using it where the concrete will be painted or coated.',
    meta_description:
      'Vetorel XT421 TDS: chemical mould and formwork release agent for fair faced and architectural concrete. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotard-xt428': {
    description:
      'Vetotard XT428 is a water based surface retarder, used to produce exposed aggregate concrete by delaying the set of the cement paste at the surface only. Once the body of the concrete has hardened, the retarded skin is washed off to reveal the aggregate beneath, which is how an exposed aggregate finish is actually made rather than by grinding. It is used for exposed aggregate concrete and precast panels, in both face down and face up pours, and to leave a deliberately rough surface where a later layer has to bond to it. Supplied ready to use in 20 litre pails. Timing governs the result: wash off too early and the aggregate is undermined, too late and the retarded layer has set. Trial panels are the usual way to fix the window.',
    meta_description:
      'Vetotard XT428 TDS: water based surface retarder for exposed aggregate concrete and precast panels. Request the sheet from Lapiz Blue UAE.',
  },
  'vetoseal-xw770': {
    description:
      'Vetoseal XW770 is a silicone based polymeric water repellent, pore sealer and hardener for limestone, masonry and natural stone. It penetrates into the pore structure and lines it rather than forming a film across the face, so the substrate still breathes and trapped moisture can escape, while liquid water is shed. A film forming sealer on stone traps moisture behind it and eventually blows the surface off. It works as a universal limestone and masonry sealer and hardener, strengthens weak limestone and masonry facades, and acts as a dust proofer on cementitious surfaces. Supplied ready to use in 20 litre containers. The substrate must be dry and free of construction moisture before application, and a test area is worth doing because some stones darken slightly.',
    meta_description:
      'Vetoseal XW770 TDS: silicone based water repellent pore sealer and hardener for limestone and masonry. Request it from Lapiz Blue UAE.',
  },
  'vetoseal-xw771': {
    description:
      'Vetoseal XW771 is a water based silane siloxane water repellent, used to turn an absorbent construction surface into one that sheds water. Silane siloxane chemistry penetrates deeply and bonds within the pore, which gives longer service than a surface coating and leaves the appearance largely unchanged, so a facade is protected without being visibly treated. It is applied to cementitious substrates including block and brickwork, precast panels and plasters, and to natural stone. Reducing water uptake matters in the Gulf for more than rain: it limits the salt laden moisture that drives efflorescence and reinforcement corrosion. Supplied ready to use in 20 litre containers. Apply to a dry substrate, flood the surface rather than brushing it thin, and allow the stated cure before exposure.',
    meta_description:
      'Vetoseal XW771 TDS: water based silane siloxane water repellent for masonry, precast and plaster. Request the sheet from Lapiz Blue UAE.',
  },
  'vetoseal-xx777': {
    description:
      'Vetoseal XX777 is a silane acrylate surface treatment that seals, enhances and hardens limestone, concrete and masonry. The acrylate component strengthens the surface rather than only repelling water, which is why it is used on weak limestone and masonry floors that need to be consolidated before a resinous topping is applied over them. Without that consolidation the topping bonds to a friable layer and takes it off later. It also serves as a universal limestone and masonry sealer and hardener. Supplied ready to use in 20 litre containers. On a floor due to receive a coating, confirm compatibility between this treatment and the topping before applying either, because a sealer and a primer can work against each other if they were not specified as a system.',
    meta_description:
      'Vetoseal XX777 TDS: silane acrylate surface treatment, enhancer and hardener for limestone and concrete. Request it from Lapiz Blue UAE.',
  },

  /* Plasters and masonry */
  'vetonit-render-rnd310': {
    description:
      'Vetonit Render RND310 is a water and weather resistant levelling plaster and render, used internally and externally on plastered walls, block walls, concrete walls and ceilings, and on precast structures. Its job is geometry: bringing a wall true before a finish coat or paint goes on. A finish coat follows the plane it is given, so a wall that is out of true has to be corrected at this stage or not at all. Being premixed it removes the batch to batch variation of site mixed render, which shows as banding across a long elevation. It also suits quick plastering on renovation work. Supplied in 50 kg bags, mixed with clean water, reaching service condition in about 5 days. On smooth dense concrete, apply a key coat first.',
    meta_description:
      'Vetonit Render RND310 TDS: water and weather resistant levelling plaster and render for walls and ceilings. Request it from Lapiz Blue UAE.',
  },
  'plastermix-m': {
    description:
      'Plastermix M is a premixed cement plaster for manual application, laid from 5 to 20 mm internally and externally. It is the direct replacement for site mixed plaster, and the reason to change is consistency: a sand and cement mix batched by hand varies between gangs and between loads, and that variation shows up as different strength, different suction and visible banding on a finished wall. A premixed plaster is the same every bag. It is designed for hand application rather than a pump, which suits smaller areas, patch work and sites without rendering plant. A 50 kg bag takes 7 to 9 litres of clean water. Allow about 5 days before finishing. In summer, dampen the substrate and protect fresh work, or rapid drying will craze the surface.',
    meta_description:
      'Plastermix M TDS: manually applied premixed cement plaster, 5 to 20 mm, internal and external. Request the sheet from Lapiz Blue UAE.',
  },
  'plastermix-s-pls221': {
    description:
      'Plastermix-S PLS221 is a sprayable premixed cementitious plaster and render for concrete and concrete block walls, applied from 10 to 25 mm. Spray application is about output: a pump places far more material per day than a hand gang, which is what makes a large elevation viable on programme, and because the product is premixed the mix does not drift between batches across that elevation. It is used internally and externally and is rated for dry and wet areas. A 50 kg bag takes 6.5 to 7.5 litres of clean water. It needs the right pump and a trained operator, so it suits projects rather than patches. On smooth dense concrete a key coat is applied first, because the plaster has nothing to grip otherwise.',
    meta_description:
      'Plastermix-S PLS221 TDS: sprayable premixed cement plaster for concrete and block walls, 10 to 25 mm. Request it from Lapiz Blue UAE.',
  },
  'plastermix-s-pls222': {
    description:
      'Plastermix-S PLS222 is the sprayable premixed cementitious plaster formulated for autoclaved aerated concrete block walls, applied from 10 to 20 mm. The distinction from the standard grade matters: aerated block is light and highly absorbent, and it pulls water out of a conventional plaster so fast that the mix never hydrates properly, leaving a weak dusty layer that debonds. This grade is formulated around that absorbency. It is used internally and externally and is rated for dry and wet areas. A 50 kg bag takes 7 to 8 litres of clean water. Applied by pump, so it suits whole elevations rather than patch repairs. Dampen the blockwork as the sheet directs before spraying, particularly in summer when the wall is already hot.',
    meta_description:
      'Plastermix-S PLS222 TDS: sprayable premixed cement plaster for AAC block walls, 10 to 20 mm. Request the sheet from Lapiz Blue UAE.',
  },
  'premix-plaster-s': {
    description:
      'Premix Plaster S is a sprayable premixed cementitious plaster and render for concrete and concrete block walls, laid from 10 to 25 mm internally and externally. It is also rated for 3D printed walls, which is a genuinely new substrate: printed concrete has a ribbed layered surface and a different absorbency to cast concrete, and a plaster that cannot bridge that profile will crack along the print lines. A 50 kg bag takes 6 to 8 litres of clean water. As with every sprayable plaster, output is the advantage and plant is the requirement: a rendering pump and an operator who knows it. Premixing keeps the mix identical across a long elevation, which is where site batched plaster shows its inconsistency most clearly.',
    meta_description:
      'Premix Plaster S TDS: sprayable premixed cement plaster for concrete, block and 3D printed walls. Request the sheet from Lapiz Blue UAE.',
  },
  'gypsum-plaster': {
    description:
      'Gypsum Plaster is a sprayable premixed gypsum based plaster for internal walls, used on masonry including concrete masonry units and autoclaved aerated block, and on fair faced concrete and precast panels. Gypsum is chosen over cement internally because it gives a smoother finish in fewer passes and is easier to work, and because it contributes to thermal and fire resistance. It is strictly an internal product: gypsum softens in persistent damp, so it has no place on an external wall or in a wet area, where a cementitious plaster is the correct specification. A 40 kg bag takes 11.5 to 13 litres of clean water. Applied by pump for output. Allow the plaster to dry fully before decorating, because paint over damp gypsum will blister.',
    meta_description:
      'Gypsum Plaster TDS: sprayable premixed gypsum based plaster for internal masonry and concrete walls. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotherm-plaster': {
    description:
      'Vetotherm Plaster is a modified cementitious thermal insulating plaster applied from 25 to 100 mm, used to reduce heat transfer through the wall itself rather than by adding a separate insulation layer. In a UAE building the wall is a major cooling load, and an insulating plaster cuts the energy used to hold the inside temperature. It is used on residential and non residential concrete buildings, internally or externally, in wet and dry conditions. The thickness range is the specification: insulation value comes from depth, so the thickness has to be designed rather than taken as whatever the plasterer puts on. A 20 kg bag takes 6 to 7.4 litres of clean water, the light bag weight reflecting the low density. Allow about 5 days before finishing.',
    meta_description:
      'Vetotherm Plaster TDS: cementitious thermal insulating plaster, 25 to 100 mm, for energy efficient walls. Request it from Lapiz Blue UAE.',
  },
  'vetotherm-ultra': {
    description:
      'Vetotherm Ultra is a cementitious adhesive and base coat for external thermal insulation systems, the product that does two jobs in an EIFS or ETICS build up. It bonds expanded and extruded polystyrene and rock wool boards to cementitious substrates, masonry and gypsum boards, and then forms the fibre mesh reinforced base coat over them. That reinforced layer is what carries the system: it distributes stress across the board joints so the finish above does not crack along every seam, and it provides the impact resistance an insulated facade needs at low level. Supplied in 25 kg bags, mixed with clean water. Embed the mesh properly within the coat rather than pressing it onto the surface, which is the most common error on these systems.',
    meta_description:
      'Vetotherm Ultra TDS: cementitious adhesive and reinforced base coat for EIFS and ETICS systems. Request the sheet from Lapiz Blue UAE.',
  },
  'vetotouch-serene': {
    description:
      'Vetotouch Serene is a polymer modified cementitious decorative finish coat applied from 1 to 3 mm, giving a fine smooth finish on external and internal building facades. It is used as the finish coat of an EIFS or ETICS system, and over plastered walls, fair faced concrete and precast panels. As a cementitious decorative finish it behaves differently to paint: the colour is in the material rather than on it, so it does not peel, and weathering changes it gradually rather than in flakes. A 25 kg bag takes 9.5 to 11.5 litres of clean water, and the coat takes 5 to 7 days to reach service condition. Agree the colour and texture on a sample panel on site, because application technique affects both.',
    meta_description:
      'Vetotouch Serene TDS: polymer modified cementitious decorative finish coat, 1 to 3 mm, for facades and EIFS. Request it from Lapiz Blue UAE.',
    category: 'surface_treatment',
  },
  'vetotouch-graviatto': {
    description:
      'Vetotouch Graviatto is a cementitious decorative finish coat applied from 3 to 5 mm that produces a grooved graffito texture, worked into the surface while the material is still open. The texture is created by the applicator rather than printed, so each elevation is slightly individual and the technique has to be consistent across it. It is used internally and externally, as a finish coat for EIFS and ETICS systems, and over plastered and fair faced concrete surfaces and precast panels. A 25 kg bag takes 6.25 to 7 litres of clean water, and the coat reaches service condition in 5 to 7 days. Agree the texture on a sample panel before the elevation starts, because a grooved finish cannot be corrected afterwards without taking the coat off.',
    meta_description:
      'Vetotouch Graviatto TDS: grooved cementitious decorative finish coat, 3 to 5 mm, for facades and EIFS. Request it from Lapiz Blue UAE.',
    category: 'surface_treatment',
  },
  'vetotouch-textura': {
    description:
      'Vetotouch Textura is a polymer modified cementitious decorative finish coat applied from 5 to 20 mm, the heaviest of the Vetotouch range and the one that works as a textured decorative plaster or render in its own right. It is positioned as a substitute for the plaster and paint system: instead of rendering a wall and then painting it, the wall gets one material that provides both the build and the finished appearance, in natural colour effects rather than a paint film. That removes the repainting cycle, which on a Gulf facade is a real maintenance cost. A 50 kg bag takes 8 to 10 litres of clean water, reaching service condition in 5 to 7 days. Sample panels decide the texture, so agree them before the elevation begins.',
    meta_description:
      'Vetotouch Textura TDS: textured cementitious decorative plaster and render, 5 to 20 mm, replaces plaster and paint. Request it from Lapiz Blue UAE.',
    category: 'surface_treatment',
  },
  'spatter-dash-mc-sdm212': {
    description:
      'Spatter Dash-MC SDM212 is a weather resistant polymer modified cement based key coat, applied as a thin rough layer onto smooth dense concrete so that plaster has something to grip. It solves a specific and common failure: plaster applied directly to smooth dense concrete has no mechanical key, sounds hollow within months and eventually comes away in sheets. The key coat is thrown or sprayed on to leave a deliberately coarse open texture, and the plaster then bonds into it. The polymer modification gives the adhesion and the weather resistance needed for external elevations. Consumption is 1.6 to 1.8 kg per square metre per millimetre of thickness. Supplied in 50 kg bags, mixed with clean water. Allow it to cure before plastering over it.',
    meta_description:
      'Spatter Dash-MC SDM212 TDS: polymer modified cement key coat for smooth dense concrete, 1.6 to 1.8 kg/m2/mm. Download it from Lapiz Blue UAE.',
    applications: [
      'Key coat on smooth dense concrete before plastering',
      'Preparing fair faced and precast concrete to receive render',
      'External elevations needing a weather resistant bonding layer',
      'Any substrate where plaster has no mechanical key',
    ],
    specs: { coverage: '1.6-1.8 Kg/m2/mm thickness' },
  },
  'vetonit-masonry-mortar-mmr510': {
    description:
      'Vetonit Masonry Mortar MMR510 is a premixed cementitious mortar for laying concrete masonry units, covering solid, hollow and insulated blocks, and for filling walls and joints. Blockwork mortar is load bearing: the joint transfers compression between units, so a mortar mixed inconsistently on site produces a wall whose strength varies course by course. Premixing removes that variable, which matters most on tall or loaded walls where the design assumes a stated mortar strength. A 50 kg bag takes 6.5 to 8.5 litres of clean water. Mix only what can be laid within the working time, and keep the joint thickness consistent, because an over thick joint reduces wall strength as surely as a weak mix does. For aerated blocks, use the dedicated block adhesive instead.',
    meta_description:
      'Vetonit Masonry Mortar MMR510 TDS: premixed cementitious masonry mortar for concrete blocks and joints. Request the sheet from Lapiz Blue UAE.',
  },
  'vetoblock-mortar-aac': {
    description:
      'Vetoblock Mortar AAC is a thin bed adhesive mortar made specifically for autoclaved aerated concrete blocks and panels, internally and externally, and for other aerated block types. Aerated blocks are light and extremely absorbent, and a standard sand and cement mortar loses its water into the block within moments, which leaves a joint that never hydrates and a wall with poor adhesion and reduced strength. This mortar is formulated around that absorbency and is laid as a thin bed rather than a conventional thick joint, which also improves the thermal performance of the wall by reducing cold bridging through the mortar. Supplied in 50 kg bags, mixed with clean water. Lay with a notched trowel sized for the block and keep courses true.',
    meta_description:
      'Vetoblock Mortar AAC TDS: thin bed adhesive mortar for autoclaved aerated concrete blocks and panels. Request the sheet from Lapiz Blue UAE.',
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

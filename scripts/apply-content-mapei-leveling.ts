/*
  Editorial content for the Mapei self levelling and microcement line,
  including self levelling smoothing compounds, screeds and binders,
  decorative microcement toppings and the primers that go beneath them.

  Original copy, 100 to 150 words per product, written from the specs and uses
  carried on each record.

  Usage: npx tsx scripts/apply-content-mapei-leveling.ts
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
  'eco-prim-t-plus': {
    description:
      'Priming is the step most often skipped on a floor and most often the reason the levelling layer above it debonds. Eco Prim T Plus is a universal acrylic primer that works on absorbent and non-absorbent substrates alike, which is unusual: it regulates suction on a porous screed so the compound keeps its own mixing water, and it promotes adhesion on dense or already sealed surfaces where a cementitious compound has nothing to grip. It also fixes light dust and isolates gypsum from cement. Supplied as a fluid light blue liquid in 20 kg packs, consumption runs from 30 to 150 g/m² depending on the porosity of the substrate and how it is applied, between +5°C and +35°C. On UAE sites the power floated slab is the usual case, and that is precisely the surface a compound will not bond to unprimed.',
    meta_description:
      'Eco Prim T Plus universal acrylic primer for absorbent and non-absorbent floors before levelling compounds, 30 to 150 g/m². Data sheet from Lapiz Blue UAE.',
    applications: [
      'Priming before cementitious levelling compounds',
      'Very compact and smooth screeds and concrete floors',
      'Gypsum, anhydrite and wood based substrates',
      'Terrazzo, ceramic and natural stone surfaces',
      'Fixing residual dust on slightly dusty substrates',
      'Adhesion promoter under dispersion and cementitious adhesives',
    ],
  },
  nivorapid: {
    description:
      'Where a floor needs levelling but the material has to stay put rather than flow, Nivorapid is the answer: a thixotropic cementitious levelling compound for layers from 1 to 20 mm, usable on vertical surfaces as well as floors. That makes it a preparation and repair material rather than a finished surface, and it covers work no self levelling grade can do, including steps, landings, pillar arrises and holes in walls and ceilings. It sets to light foot traffic in about two hours, mixes at 21 to 23 parts water per 100 parts powder, and gives 15 minutes of workability. Coverage is 1.6 kg/m² per mm of thickness from 25 kg bags, classified CT C40 F10 and rated EC1 R Plus. In UAE summer heat those 15 minutes shrink, so mix small batches and keep bags out of the sun.',
    meta_description:
      'Nivorapid thixotropic cementitious levelling compound for 1 to 20 mm layers on floors, walls and steps, set in 2 hours. Data sheet from Lapiz Blue UAE today.',
    applications: [
      'Levelling interior floors and walls',
      'Smoothing terrazzo, ceramic and natural stone',
      'Repairing steps, landings and pillar edges',
      'Filling depressions and holes in floors and walls',
      'Smoothing heated floors',
      'Preparation before ceramic, resilient and wooden coverings',
    ],
    category: 'self_leveling',
  },
  'planiprep-4-lvt': {
    description:
      'Planiprep 4 LVT is a ready to use smoothing paste for one specific job: taking an existing ceramic or stone floor and making it flat enough for LVT. It fills the grout joints and levels from a feather edge upwards, so the tile pattern beneath does not telegraph through a thin vinyl plank, which is the usual complaint when LVT goes down over tile on tile. Being a levelling layer rather than a wearing surface, it always receives a covering. It comes as a white thick paste in 10 kg packs, needs no mixing with water, sets in about an hour and uses roughly 0.08 to 0.1 kg/m². Rated EC1 Plus for very low emissions and applied between +5°C and +35°C, which suits refurbishment inside occupied UAE buildings where a powder product would raise dust.',
    meta_description:
      'Planiprep 4 LVT ready to use smoothing paste that fills grout joints on tiled floors before LVT is laid, 10 kg packs. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Smoothing existing internal ceramic and stone surfaces',
      'Filling the joints between tiles before LVT',
      'Preparation for loose lay LVT tiles and planks',
      'Preparation for LVT bonded with reactive adhesives',
      'Levelling wood, gypsum and fibre cement boards',
    ],
    category: 'self_leveling',
  },
  'planiprep-fast-track': {
    description:
      'Programme pressure is what Planiprep Fast Track answers: an ultra rapid drying thixotropic skimming compound laid from a feather edge up to 3 mm, ready to take a floor covering in two hours rather than overnight. At that thinness it corrects surface texture and small deviations rather than level, and it always takes a covering on top. It is supplied as 4 kg sachets of grey fine powder mixed at 50 to 55 per cent water, about 2 to 2.2 litres per sachet, setting to light foot traffic in roughly an hour at 3 mm and using around 1.0 kg/m² per mm of thickness. Apply between +5°C and +30°C. For UAE retail and hotel refurbishment the sachet size earns its keep, because a gang can mix only what it will lay before set.',
    meta_description:
      'Planiprep Fast Track ultra rapid drying skimming compound from a feather edge to 3 mm, floors ready in 2 hours. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Repairing floors that must be ready for use quickly',
      'Levelling and skimming new and existing internal substrates',
      'Smoothing concrete slabs and cementitious screeds',
      'Skimming terrazzo, ceramic and natural stone',
      'Repairing steps, landings and the edges of pillars',
      'Preparation before resilient and textile coverings',
    ],
    category: 'self_leveling',
  },
  'primer-g': {
    description:
      'Primer G is a synthetic resin primer in water dispersion, and what it does explains why no levelling layer should be poured without one. It evens out the absorption of the substrate so the compound above does not lose its mixing water into the slab and cure weak and dusty, it binds residual dust, and on gypsum or anhydrite it forms a film that prevents the sulphate reaction with cement which otherwise separates the two layers. Use it before smoothing compounds on cementitious, anhydrite and gypsum surfaces, and between coats of smoothing compound once the first is dry. Supplied as a light blue liquid in 25 kg and 5 kg packs, consumption is 0.08 to 0.15 kg/m² depending on porosity, applied from +5°C to +35°C. Gypsum partitions are everywhere in UAE fit out work, so keep this primer on site.',
    meta_description:
      'Primer G synthetic resin primer in water dispersion for gypsum, anhydrite and cementitious floors before levelling. Data sheet on request from Lapiz Blue UAE.',
    applications: [
      'Treating gypsum surfaces before installing ceramic tiles',
      'Improving adhesion of smoothing compounds',
      'Providing uniform absorption on cementitious surfaces',
      'Priming anhydrite screeds before cement based products',
      'Priming between coats of smoothing compound',
      'Anchoring coat for gypsum based sprayable plasters',
    ],
  },
  topcem: {
    description:
      'Topcem is a binder rather than a finished mix, batched on site with graded aggregate at 200 to 250 kg per cubic metre to form bonded, unbonded and floating screeds. Screeds are the depth end of this range, which is why consumption is quoted at 2 to 2.5 kg per square metre per centimetre of thickness rather than per millimetre. Normal setting with fast drying and controlled shrinkage means the screed takes light foot traffic after about 12 hours, and it is classified EN 13813 C30 F6 A1 for interior and exterior use. Workability runs 60 minutes and application temperature spans +5°C to +40°C, the top of which is a real UAE condition: shade the stored bags, mix with cool water, and keep the pour out of the hottest hours of the day.',
    meta_description:
      'Topcem hydraulic binder for fast drying controlled shrinkage screeds, bonded, unbonded and floating, EN 13813 C30 F6 A1. Data sheet from Lapiz Blue UAE today.',
    applications: [
      'Bonded, unbonded and floating screeds',
      'Screeds before wood, PVC and linoleum flooring',
      'Screeds before ceramic tiles and natural stone',
      'Screeds incorporating underfloor heating or cooling',
      'Patching and repairing floor screeds',
      'Interior and exterior use',
    ],
  },
  'topcem-pronto': {
    description:
      'Supplied pre-blended rather than batched on site, Topcem Pronto removes the main variable in screeding, which is the aggregate grading and binder dosage a gang judges by eye. It is a ready mixed screed mortar with high thermal conductivity, making it the grade to specify over underfloor heating where the heat should reach the floor covering rather than sit in the screed. Classified C30 F6, with compressive strength to EN 13892-1 at C30 and flexural strength at F6, it is a load bearing levelling layer beneath a covering and not a finished surface. Consumption is about 18 to 20 kg/m² per centimetre of thickness depending on the degree of compaction, from 25 kg bags of grey powder. Order by area and depth together, because at screed thickness the bag count climbs quickly and a part delivery stalls the pour.',
    meta_description:
      'Topcem Pronto ready mixed screed mortar with high thermal conductivity for heated floors, classified C30 F6. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'High thermal conductivity heated screeds',
      'Bonded and unbonded screeds on new and existing slabs',
      'Quick drying screeds before wood and resilient flooring',
      'Screeds before ceramic tiles and natural stone',
      'Repairing screeds in shops, offices and residences',
    ],
  },
  ultraplan: {
    description:
      'Ultraplan is the self levelling smoothing compound to reach for when the build up has to begin thin: 1 to 10 mm per layer, fibre reinforced and ultra rapid hardening. It is a levelling layer beneath a covering, taking ceramic, natural stone, resilient and wooden floors, and it suits areas carrying wheeled loads such as trolleys and office chairs, which is why hospitals, hotels, schools and shopping centres are its usual home. Classified CT C30 F7 and rated EC1 Plus, it mixes at 25 to 26 parts water per 100 parts powder, gives 20 to 30 minutes of pot life and sets after about three hours. Coverage is 1.6 kg/m² per mm from 23 kg bags. It is interior only, so keep it off UAE balconies and terraces however sheltered they look.',
    meta_description:
      'Ultraplan fibre reinforced self levelling smoothing compound for 1 to 10 mm layers under any floor covering. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Levelling concrete slabs and cementitious screeds',
      'Levelling anhydrite substrates',
      'Levelling over underfloor heating and cooling systems',
      'Levelling existing terrazzo, ceramic and natural stone floors',
      'Preparation before ceramic, resilient and wooden flooring',
      'Hospitals, hotels, theatres, schools and shopping centres',
    ],
  },
  'ultraplan-contract': {
    description:
      'Sized for volume work, Ultraplan Contract is a self levelling smoothing compound for 1 to 10 mm per coat, the same thin build up as Ultraplan but formulated for the large site and for pumped application over long distances. It prepares new and existing substrates to receive any floor covering where resistance to loads and traffic is required, so it stays a levelling layer rather than a wearing surface. A 25 kg bag takes 20 to 21 per cent water, about 5 to 5.25 litres, gives 20 to 35 minutes of workability and sets in a minimum of three hours, at 1.7 kg/m² per mm of thickness. Classified EN 13813 C30 F6 A1 and applied from +5°C to +40°C. On a large UAE pour, plan the mixing station and pump run first, because wet edges have to meet.',
    meta_description:
      'Ultraplan Contract self levelling smoothing compound for 1 to 10 mm per coat, pumped on large floor areas. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Levelling large floor areas by pressure pump',
      'Levelling concrete slabs and cementitious screeds',
      'Levelling anhydrite substrates',
      'Levelling over underfloor heating systems',
      'Levelling existing terrazzo, ceramic and natural stone floors',
      'Interiors in the shipbuilding industry',
    ],
  },
  'ultraplan-maxi': {
    description:
      'When a slab sits further out of level than a thin compound can correct, Ultraplan Maxi covers 3 to 40 mm per layer, the widest single layer range in this group. The lower limit matters as much as the upper one: it cannot be feathered out, so a floor needing a 1 mm correction wants Ultraplan instead. It is a levelling layer under ceramic, stone, resilient and wooden coverings, suits wheeled service loads and works over underfloor heating and cooling. Classified CT C35 F7 and rated EC1 Plus, it mixes at roughly 18 to 19 parts water per 100 parts powder, offers 30 to 40 minutes of pot life and sets after three to twelve hours depending on thickness. Coverage is 1.7 kg/m² per mm from 25 kg bags. Interior use only, applied between +5°C and +40°C.',
    meta_description:
      'Ultraplan Maxi self levelling smoothing compound for 3 to 40 mm per layer, CT C35 F7, in 25 kg bags. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Levelling screeds before ceramic and natural stone tiles',
      'Levelling before PVC, linoleum, rubber and cork flooring',
      'Levelling before wood and textile flooring',
      'Levelling anhydrite substrates',
      'Levelling underfloor heating and cooling systems',
      'Hospitals, hotels, theatres, schools and shopping centres',
    ],
  },
  'ultraplan-trade': {
    description:
      'Ultraplan Trade handles 3 to 40 mm per coat and is set apart within the range by its thermal conductivity rating to EN 12664-1, which makes it the choice over heated screeds where the aim is to move heat into the floor covering rather than store it in the levelling layer. Like the rest of the Ultraplan family it is a levelling layer beneath a covering and not a finished floor, and it is for interior use only. Setting takes three to twelve hours depending on thickness, coverage is 1.75 kg/m² per mm from 25 kg bags of grey fine powder, and it is rated EC1 Plus and classified EN 13813 C25 F6 A1, applied from +5°C to +40°C. Where UAE villas run underfloor cooling rather than heating, the same conductivity argument applies in reverse.',
    meta_description:
      'Ultraplan Trade self levelling smoothing compound for 3 to 40 mm per coat, rated for heated screeds. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Levelling layers for heated screeds',
      'Levelling concrete slabs and cementitious screeds',
      'Levelling anhydrite substrates',
      'Levelling existing terrazzo, ceramic and natural stone floors',
      'Preparation before all types of flooring',
    ],
  },
  ultratop: {
    description:
      'Unlike the Ultraplan grades, Ultratop is allowed to stay visible. It is an ultra fast setting self levelling mortar for abrasion resistant floors from 5 to 40 mm thick, strong enough to be left exposed as the finished wearing surface in shopping centres, offices, shops and showrooms, including areas taking rubber tyred traffic. It can be dry polished with diamond discs for a reflective finish, or combined with natural aggregate for a terrazzo alla veneziana effect. Classified EN 13813 C40 F10 A9 A2FL S1 with bond strength above 1.5 N/mm², it comes in eight colours from Extra White to Signal Black, mixes at 20 to 22 parts water per 100 parts powder and gives 15 minutes of pot life. Consumption is 16.5 to 17.5 kg/m² per centimetre. Fifteen minutes is short in UAE heat, so staff the pour properly.',
    meta_description:
      'Ultratop self levelling cementitious mortar for abrasion resistant exposed floors, 5 to 40 mm, eight colours. Data sheet on request from Lapiz Blue UAE today.',
    applications: [
      'Exposed abrasion resistant floors in shopping centres and shops',
      'New floors in supermarkets, restaurants and showrooms',
      'Polished floors in offices, museums and apartments',
      'Terrazzo alla veneziana floors with natural aggregate',
      'Industrial floors later protected with epoxy coatings',
      'Levelling concrete, terrazzo, ceramic and stone substrates',
    ],
  },
  'ultratop-base-coat': {
    description:
      'Before a protective finish goes over an Ultratop, Ultratop Living or Ultratop Loft surface, Ultratop Base Coat prepares it, and that preparation decides how the finish will look. A decorative cementitious surface is unevenly porous, so a finish laid straight onto it is absorbed at different rates and dries patchy. This one component acrylic primer in water dispersion seals those pores and regulates absorption so the finish lies down evenly, and being transparent it does not alter the appearance of the coating beneath. Supplied ready to use as a milky white liquid in 10 kg packs, consumption is 50 to 80 g/m² depending on the porosity of the substrate, applied between +12°C and +30°C. The substrate must also sit above dew point, which in humid UAE conditions rules out a slab chilled overnight by air conditioning.',
    meta_description:
      'Ultratop Base Coat acrylic primer that seals pores on Ultratop and Ultratop Loft before protective finishes. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Base coat on Ultratop cementitious surfaces',
      'Base coat on Ultratop Living surfaces',
      'Base coat on Ultratop Loft decorative coatings',
      'Sealing surface porosity before protective finishes',
      'Regulating absorption before Mapefloor Finish treatments',
    ],
    category: 'primer',
  },
  'ultratop-easycolor': {
    description:
      'Ultratop Easycolor is not a flooring material in itself but the pigment system that colours one. Supplied as pre-dispersed liquid pigment, it is added to Ultratop Loft F or Ultratop Loft W during mixing at one 1.5 litre can per 5 kg of powder, so a 20 kg bag is split into four equal batches to hold the dose steady. That batching discipline is the whole job, because an inconsistent dose shows up as a visible change of shade across a continuous decorative floor and cannot be corrected afterwards. The range runs from Amber YO and Bamboo GN through Cocoa BR to Green Mountain GN, in 1.5 litre cans stable for 18 months sealed, applied between +5°C and +35°C. For UAE showroom and hotel work, order the pigment for the whole floor in one go.',
    meta_description:
      'Ultratop Easycolor pre-dispersed pigment for colouring Ultratop Loft F and Ultratop Loft W microcement floors. Request the sheet from Lapiz Blue UAE today.',
    applications: [
      'Colouring Ultratop Loft F cementitious paste',
      'Colouring Ultratop Loft W cementitious paste',
      'Colouring both the white and natural versions',
      'Decorative floors in civil and residential interiors',
      'Commercial and retail decorative coatings',
    ],
  },
  'ultratop-stucco': {
    description:
      'Ultratop Stucco belongs to the polishing sequence rather than the levelling one. When a hardened Ultratop floor is dry polished with a diamond disc, the first roughing pass opens micro-porosity at the surface, and those pores have to be filled before polishing continues or the finished floor will never read as a continuous reflecting plane. This grout of special hydraulic binders does the filling, and it is made in colours that match the mortar: Beige Rose, Coffee, Standard Grey, White and White Cream. Mix 30 to 40 parts clean water per 100 parts powder to the consistency wanted and spread it with a rubber float. Supplied in 10 kg packs, applied from +5°C to +35°C, with consumption set by how porous the surface actually is. Order the colour against the Ultratop, never by eye on site.',
    meta_description:
      'Ultratop Stucco colour matched grout that seals micro-porosity when polishing an Ultratop floor, 10 kg packs. Request the sheet from Lapiz Blue UAE today.',
    applications: [
      'Sealing micro-porosity on hardened Ultratop',
      'Dry polished Ultratop flooring',
      'Terrazzo alla veneziana polished effects',
      'Light reflecting polished floor finishes',
      'Colour matched grouting of Ultratop surfaces',
    ],
  },
  'ultratop-loft-f': {
    description:
      'Decorative rather than corrective, Ultratop Loft F is a one component coarse textured cementitious paste trowelled on in thin coats to create floors and walls with a trowelled or mottled finish. It is a finished wearing surface, not a levelling layer, and the thinness is the point: it renews an existing floor or wall without building up height at thresholds and door frames. The coarse aggregate gives the pronounced textured look, where Ultratop Loft W gives a smoother one, and the two are commonly used together on a job. Supplied in Natural and White in 20 kg and 5 kg bags, mixed at roughly 25 to 29 parts water per 100 parts powder or directly with Ultratop Easycolor pigment, setting in about three hours at 0.3 to 0.5 kg/m² per coat. Suits UAE retail, hotel and apartment interiors.',
    meta_description:
      'Ultratop Loft F coarse textured microcement paste for decorative trowelled floors and walls in thin coats. Request the data sheet from Lapiz Blue UAE today.',
    applications: [
      'Decorative floor coatings with a trowelled finish',
      'Decorative wall coatings with a mottled finish',
      'Bars, shops, restaurants and cafeterias',
      'Apartments, hotels and resort complexes',
      'Showrooms, museums and wellness areas',
      'Restoring old floor and wall coverings',
    ],
  },
  'ultratop-loft-w': {
    description:
      'Ultratop Loft W is the fine textured half of the Ultratop Loft microcement system, a one component cementitious paste trowelled in thin coats to form decorative floors and walls with a trowelled or mottled finish. Its aggregate is finer than that of Ultratop Loft F, so the surface reads as smoother, and the two grades are usually specified together on one job to control how much texture the finish carries. This is a finished surface in its own right, classified CT C25 F10 A9 with good abrasion resistance in a thin coat. It takes more water than the coarse grade, roughly 32 to 35 parts per 100 parts powder, sets in about three hours and uses 0.3 to 0.5 kg/m² per coat, in Natural and White in 20 kg and 5 kg bags. Apply between +5°C and +35°C.',
    meta_description:
      'Ultratop Loft W fine textured microcement paste for smooth decorative floor and wall coatings. Request the data sheet from Lapiz Blue UAE for full figures.',
    applications: [
      'Decorative floor coatings with a smooth trowelled finish',
      'Decorative wall coatings with a mottled finish',
      'Bars, shops, restaurants and cafeterias',
      'Apartments, hotels and resort complexes',
      'Showrooms, museums and wellness areas',
      'Restoring old floor and wall coverings',
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

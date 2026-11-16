/*
  Editorial content for the Vetonit waterproofing and sealants lines.

  Original copy, 100 to 150 words per product, written from the specs, uses
  and hosted data sheets carried on each record.

  Three products arrived as data sheets with no catalogue page, so their
  applications are written here from the Uses section of the sheet itself.

  Usage: npx tsx scripts/apply-content-vetonit-protection.ts
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
  /* Waterproofing */
  'vetoproof-s': {
    description:
      'Vetoproof S is a two component elastomeric cementitious waterproof membrane that bridges cracks rather than simply covering them. That elasticity is why it suits structures which move or already show hairline cracking, where a rigid coating would split along the same line within a season. It lines swimming pools beneath tiling, canals and similar water retaining structures, and seals wet areas before Vetonit tile adhesives go down, so the membrane and the bed are part of one system. It also protects concrete and masonry against chloride ingress and carbonation, which is the slow corrosion mechanism behind most reinforcement failure in Gulf conditions, and it resists negative hydrostatic pressure. Consumption is 1.7 kg per square metre per millimetre of thickness. Supplied as a 20 kg kit, reaching full cure at 28 days.',
    meta_description:
      'Vetoproof S TDS: two component elastomeric crack bridging cementitious membrane, 1.7 kg/m2/mm. Download the data sheet from Lapiz Blue UAE.',
  },
  'vetoproof-cm745': {
    description:
      'Vetoproof CM745 is a two component flexible cementitious waterproof coating for water retaining and water excluding structures. It lines tanks, dams and canals, waterproofs covered roofs and wet areas directly beneath tile adhesive, and protects concrete and masonry from chloride ingress and carbonation, the mechanism that corrodes reinforcement from within. It resists negative hydrostatic pressure, which matters in basements and lift pits where water pushes from the far side of the slab and a coating applied on the dry face has to hold against it. Crack bridging flexibility lets it accommodate the hairline movement a concrete structure develops without splitting. Consumption is about 1.7 kg per square metre. Supplied as a 28 kg kit of powder and polymer, mixed on site, reaching full cure in 7 days.',
    meta_description:
      'Vetoproof CM745 TDS: flexible crack bridging cementitious waterproof coating for tanks, roofs and wet areas. Request the sheet from Lapiz Blue UAE.',
  },
  'vetoproof-top': {
    description:
      'Vetoproof TOP is a single component acrylic copolymer waterproofing membrane for exposed surfaces, and its defining property is that it stays stable under direct sun. It is UV and colour stable, resists yellowing and dirt pickup, and reflects solar radiation well enough to work as a cool roof coating, which lowers the surface temperature of a roof deck and the cooling load beneath it. It waterproofs concrete, metal, cement and gypsum board, flashing details at roof edges, gardens and basements, corrugated sheets and sloped roofs, and serves as a decorative overlay on bituminous membranes or existing terrazzo. It also shields spray polyurethane foam insulation from UV. Coverage is 2.3 square metres per kilogram per coat at 300 microns, reaching 1 mm in two coats. Trafficable once cured.',
    meta_description:
      'Vetoproof TOP TDS: UV stable single component acrylic waterproofing membrane and cool roof coating. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing concrete, metal, cement and gypsum board surfaces',
      'Flashing roof edges, gardens and basements',
      'Protecting spray polyurethane foam insulation from UV',
      'Decorative overlay on bituminous membranes and existing terrazzo tiles',
      'Waterproofing corrugated sheets and sloped roofs',
      'Cool roof coating where solar reflection is wanted',
    ],
  },
  'vetoproof-azl': {
    description:
      'Vetoproof AZL is a single component hybrid polyurethane waterproofing membrane, supplied ready to use, for exposed roofs and wet areas in both new build and refurbishment. It is highly elastic and crack bridging, so it accommodates the movement an exposed roof undergoes daily between night and afternoon. Chemical resistance is broad, covering chlorides, sulfates, bacteria, oil and common fuels, and its solar reflectance reduces indoor temperature and the electricity used to control it. It waterproofs bathrooms, showers and kitchens, roofs, terraces, balconies and domes, aluminium sandwich panels and corrugated sheets, and exposed roofs in concrete, metal, cement or gypsum board. Consumption is 0.6 square metres per kilogram at 1 mm, which works out at about 1.67 kg per square metre per millimetre. Maximum thickness per coat applies.',
    meta_description:
      'Vetoproof AZL TDS: single component hybrid PU waterproofing membrane for exposed roofs and wet areas. Download the data sheet from Lapiz Blue UAE.',
    applications: [
      'Waterproofing bathrooms, showers and kitchens',
      'Roofs, terraces, balconies and domes',
      'Aluminium sandwich panels and corrugated sheets',
      'Exposed roofs in concrete, metal, cement and gypsum board',
      'New construction and refurbishment projects',
      'Areas needing resistance to chlorides, sulfates, oil and common fuels',
    ],
  },
  'vetoproof-cr747': {
    description:
      'Vetoproof CR747 is a rapid setting cementitious plugging mortar that stops running water in about 45 seconds. It exists for one situation: water is coming through concrete or masonry now and the structure cannot be dried out first. It is pressed into the leak by hand or trowel and sets hard against the flow, which is why it is kept on site during basement and tunnel work rather than ordered when needed. Typical use is temporary patching of flowing water through concrete and masonry, and emergency stopping at service entry points in manholes or broken cementitious pipes at low pressure. The formulation is chloride free, so it does not introduce the ions that corrode reinforcement. It works horizontally, vertically and overhead, and accepts an epoxy mortar overlay afterwards for a permanent repair.',
    meta_description:
      'Vetoproof CR747 TDS: rapid setting cementitious water plugging mortar, sets in 45 seconds, chloride free. Download the sheet from Lapiz Blue UAE.',
    applications: [
      'Temporary patching to stop flowing water through concrete and masonry',
      'Emergency water stopping at service entry points in manholes',
      'Sealing broken cementitious pipes at low pressure',
      'Horizontal, vertical and overhead application',
      'Preparation for a permanent repair by epoxy mortar overlining',
    ],
  },
  'vetoproof-ec720': {
    description:
      'Vetoproof EC720 is a two component waterproof epoxy coating for walls, floors and tanks, formulated non toxic and solvent free so it can be used where the stored contents or the occupants rule out a solvent system. It coats concrete, asbestos cement, steel and gypsum board, and is specified for water tanks and reservoirs, hospital clean rooms and food processing areas. In those settings the coating is doing two jobs: excluding water, and presenting a hard seamless surface with no pores for contamination to sit in and no joints for cleaning to miss. Supplied as a 15 litre kit of resin and hardener, mixed on site in the stated ratio, with tools cleaned using Vetonit Solvent XX400 before the material cures. Confirm the current certification before specifying it for potable water.',
    meta_description:
      'Vetoproof EC720 TDS: non toxic solvent free waterproof epoxy coating for tanks, clean rooms and food areas. Request the sheet from Lapiz Blue UAE.',
  },
  'vetoproof-ec722': {
    description:
      'Vetoproof EC722 is a two component epoxy polysulphide elastomeric coating, combining the chemical resistance of an epoxy with enough elasticity to tolerate movement that would craze a rigid epoxy film. It serves as an internal protective lining for potable water concrete tanks and for ponds and swimming pools, and as a hard wearing chemically resistant coating in heavy duty industrial settings including oil refineries, paper mills, garages and workshop floors. The polysulphide component is what buys the flexibility and the resistance to hydrocarbons that a straight epoxy does not have. Supplied as a 15 litre kit mixed on site. Substrate preparation governs the result here more than the product does: the concrete must be sound, clean and within the moisture limits the data sheet states before any coat is applied.',
    meta_description:
      'Vetoproof EC722 TDS: epoxy polysulphide elastomeric coating for potable tanks, pools and industrial floors. Request the sheet from Lapiz Blue UAE.',
  },
  'vetoproof-um766': {
    description:
      'Vetoproof UM766 is a cold liquid applied elastomeric polyurethane waterproofing membrane, supplied ready to use so there is no mixing ratio to get wrong on site. Being liquid applied it forms a seamless membrane that follows complex detailing, which is its advantage over sheet systems around penetrations, upstands and internal corners where most leaks actually begin. It waterproofs wet areas including kitchens, bathrooms and swimming pools, basements, tunnels, subways and culverts, inverted roofs, suspended slabs and balconies, and complete tanking systems. Elasticity lets it bridge movement in the structure beneath. It is touch dry and ready for the following coat in about 24 hours depending on conditions. Supplied in 20 litre pails. Detail the corners and penetrations with reinforcing tape before the main application.',
    meta_description:
      'Vetoproof UM766 TDS: cold liquid applied elastomeric PU waterproofing membrane for roofs, basements and tanking. Request it from Lapiz Blue UAE.',
  },
  'vetourea-pua791': {
    description:
      'Vetourea PUA791 is a two component polyurea waterproofing membrane applied cold by brush, which makes polyurea performance available without the heated spray plant the sprayed grades require. Polyurea is specified where toughness and abrasion resistance matter as much as waterproofing: protection for plant rooms and trafficable roof decks, areas exposed to high wind abrasion, and water features, pools, ponds, bridges, streets and tunnels where residual moisture in the substrate would defeat a conventional membrane. It also lines non potable water structures. The system is solvent free and flexible, and reaches full cure at 28 days. Supplied as an 18 litre kit of resin and hardener. Mix only what can be used within the working time, because a polyurea does not wait for the applicator.',
    meta_description:
      'Vetourea PUA791 TDS: two component cold brush applied polyurea waterproofing membrane, solvent free. Request the sheet from Lapiz Blue UAE.',
  },
  'vetourea-pua792': {
    description:
      'Vetourea PUA792 is a pure polyurea waterproofing membrane applied by heated plural component spray, the specification used where a large area has to be waterproofed fast and the finished membrane has to take punishment. It gels within seconds of leaving the gun and builds a seamless flexible film in a single pass, so a reservoir or a bridge deck can be coated and returned to service far quicker than any coat and recoat system allows. Applications include reservoirs, bridge decks, basins and aeration tanks, pickup and bed liners, ship coating and marine work, and foundation and curtain concrete. It is solvent free. Supplied in 440 kg sets. This is equipment dependent work: it needs a trained applicator with calibrated spray plant, not a brush and a roller.',
    meta_description:
      'Vetourea PUA792 TDS: two component spray applied pure polyurea membrane for reservoirs, bridge decks and marine work. Request it from Lapiz Blue UAE.',
  },

  /* Sealants and joints */
  'vetoflex-pu780': {
    description:
      'Vetoflex PU780 is a high performance single component elastomeric polyurethane sealant supplied in 600 ml sausages, the general purpose joint sealant of the Vetonit range. It seals precast panel joints and expansion joints without a primer on most substrates, which removes a step and a failure mode from the work. It also serves as an elastic adhesive between materials with different thermal expansion coefficients, where a rigid adhesive would be torn apart by the two moving at different rates. It handles both movement joints and static joints across general construction. Being single component there is no mixing and no pot life, so an operative can seal as much or as little as the day allows. Use a backing rod to control depth and prevent three sided adhesion, which is what causes most sealant tearing.',
    meta_description:
      'Vetoflex PU780 TDS: single component elastomeric PU sealant for precast and expansion joints, 600 ml sausage. Request it from Lapiz Blue UAE.',
  },
  'vetoflex-pu785': {
    description:
      'Vetoflex PU785 is a two component heavy duty epoxy urethane joint sealant for internal floor joints that take wheeled traffic. A general purpose elastic sealant extrudes under a loaded forklift wheel and tears at the joint arris; an epoxy urethane is formulated hard enough to support the wheel across the joint while retaining enough movement capability to work as a sealant rather than a filler. It is specified in factories, food processing areas, warehouses and maintenance facilities, and suits sawn joints in long strip flooring and other large internal floor areas. Supplied as a 4 litre kit mixed on site, so the working time starts when the two parts meet and only what can be placed should be mixed. Prepare the joint arrises properly, because that is where this sealant earns its cost.',
    meta_description:
      'Vetoflex PU785 TDS: two component epoxy urethane joint sealant for trafficked warehouse and factory floors. Request it from Lapiz Blue UAE.',
  },
  'vetoflex-pu789': {
    description:
      'Vetoflex PU789 is a two component high performance polyurethane joint sealant for joints subject to the expansion and contraction a structure undergoes through the day. The two component formulation cures predictably through its full depth rather than relying on atmospheric moisture, which matters in a deep joint and in low humidity where a single component sealant cures slowly from the surface inwards. It seals joints in concrete, masonry, marble, granite and brick, and against aluminium, glass, stucco, panel walls and curtain walls, which covers most of what meets at a facade expansion joint. Supplied as a 3 kg kit. Size the joint for the movement it will actually see, use a backing rod to set the depth to width ratio, and prime the faces where the sheet calls for it.',
    meta_description:
      'Vetoflex PU789 TDS: two component high performance PU joint sealant for facade and expansion joints. Request the sheet from Lapiz Blue UAE.',
  },
  'vetoflex-ps782': {
    description:
      'Vetoflex PS782 is a two component polysulphide trafficable joint sealant for heavy civil work. Polysulphide is chosen where fuels, oils and chemicals reach the joint and where traffic runs directly over it, conditions that degrade a standard polyurethane. It seals joints in bridges, roadways, concrete ponds, warehouse floors, dams, canals and culverts, and also serves as an elastic adhesive between materials whose thermal expansion coefficients differ enough that a rigid bond would fail. It accommodates movement in service rather than resisting it. Supplied as a 4 litre kit mixed on site in the stated ratio. As with every joint on this list, the preparation decides the outcome: clean dry faces, the correct backing rod, a primer where the sheet specifies one, and tooling before the surface skins.',
    meta_description:
      'Vetoflex PS782 TDS: two component polysulphide trafficable joint sealant for bridges, roads and dams. Request the sheet from Lapiz Blue UAE.',
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

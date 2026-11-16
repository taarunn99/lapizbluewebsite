/*
  Editorial content for the eleven Mapei records left pending with an empty
  description in the concrete additives and repair systems line and the tile
  adhesives and grouts line.

  It is a mixed set, so the organising idea changes from product to product.
  The MapeWrap carbon items are composite strengthening: the copy says what
  the cord or fabric is bonded with, what it is bonded to, and that the scheme
  is sized by the project engineer, never chosen off a shelf. Mapegrout
  Aggregate, Mapecolor Metallic and MapeGlitter are dosed into another named
  product, so the copy says which product and what the dose changes. The two
  UltraCare products are picked by what the stain is, so each says what it
  attacks and, just as usefully, what it will damage. Mapegrout Gunite 300 AF
  ME is sprayed and not hand applied, so the copy says what equipment that
  implies, down to the pumps Mapei names.

  Original copy, 100 to 150 words per product, written from each record's own
  specs, from the product's own data sheet held at public/tds/mapei/<slug>.pdf
  read with pdftotext -layout, and from the classification and one line
  description carried in data/discovery/mapei-catalogue.json. No figure
  appears here that is not in one of those three.

  Adesilex P9 Express is included even though its pack size was outstanding
  when this copy was written, so the page ships the moment the pack figure
  lands rather than waiting for another writing pass.

  Usage: npx tsx scripts/apply-content-mapei-concrete-2.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord } from '../src/lib/tds';

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

interface Entry {
  description: string;
  meta_description: string;
  applications?: string[];
}

const content: Record<string, Entry> = {
  /* Concrete additives and repair systems */
  'mapeair-foam': {
    description:
      'Dosed through a foam generator rather than straight into the mixer, Mapeair Foam is a ready to use liquid foaming agent for making lightweight foam concrete. Mapei recommends diluting one litre in 50 litres of water; foam produced at 3 bars air pressure has a density of 50 plus or minus 5 kg per cubic metre, so a litre of admixture yields around 1000 litres of foam. The foam is stable enough to be injected into a premixed mortar or grout without collapsing, and the result is self compacting and placed by chute, pipe or pump with no transfer equipment. Below 1000 kg per cubic metre it encases buried services and can be dug out again later; at about 1500 kg per cubic metre it backfills straight from the truck mixer. Protect the drums from direct sunlight.',
    meta_description:
      'Mapeair Foam TDS: liquid foaming agent for lightweight foam concrete, one litre of admixture makes about 1000 litres of foam. From Lapiz Blue UAE.',
    applications: [
      'Light insulating levelling layers on roofs and floors',
      'Pumped foam concrete in place of lightweight building materials',
      'Encasing infrastructure pipes below 1000 kg per cubic metre',
      'Backfilling concrete at around 1500 kg per cubic metre',
      'Trowel ready mortar and insulation mortar',
      'Polystyrene concrete and lightweight precast panels',
    ],
  },
  'mapegrout-aggregate': {
    description:
      'A bag of graded limestone rather than a mortar, Mapegrout Aggregate is dosed into mixes from the Mapegrout repair and Mapefill grout ranges when the section to be filled is too deep for mortar alone. The sheet is explicit about what the dose changes: it reduces the heat of hydration and improves the mechanical properties of the hardened material, which is the argument for using it on a thick summer pour in the UAE. The grading supplied is 2 to 3 mm. It goes in at the end of mixing and is blended for a further one or two minutes, and no extra water is added to carry it, so the water content of the host product stays as designed. Thick bed machine grouting with Mapefill and thick section repairs in free flowing Mapegrout micro concrete are its two standing uses.',
    meta_description:
      'Mapegrout Aggregate TDS: 2 to 3 mm limestone aggregate dosed into the Mapegrout and Mapefill ranges for deep fills. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Deep filling with the Mapegrout and Mapefill ranges',
      'Thick bed machine grouting using the Mapefill range',
      'Thick section fluid applied concrete repair',
      'Free flowing Mapegrout micro concrete in deep sections',
      'Reducing the heat of hydration in a thick pour',
      'Improving the mechanical properties of a repair mix',
    ],
  },
  'mapegrout-gunite-300-af-me': {
    description:
      'Sprayed, never trowelled: Mapegrout Gunite 300 AF ME is a prepacked one component fibre reinforced cementitious mortar with alkali free accelerated setting, and it can be placed solely with a dry mix spraying machine. The powder goes into the hopper dry and meets the water inside the nozzle, where it turns thixotropic and can be built up vertically or overhead at 10 to 15 cm per layer, with several coats above that. Hiring the right gear is part of the specification, since Mapei names the OCMER OCM-030 compact and OCM-045 as the pumps for it, and rebound of 5 to 12 per cent is why consumption is quoted at about 22 kg per square metre per centimetre once rebound is counted. Spray water on the surface for the first 24 hours; warm or windy weather cracks it.',
    meta_description:
      'Mapegrout Gunite 300 AF ME TDS: fibre reinforced dry mix shotcrete mortar with alkali free accelerated setting. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Repair of deteriorated concrete, stone and masonry by dry mix shotcrete',
      'Support to diggings in tunnels, foundations and outdoor shafts',
      'Repair of concrete lining in tunnels',
      'Lining of stone or masonry tunnels',
      'Repair of hydraulic works such as canals, shafts and basins',
      'Repair of industrial concrete structures',
    ],
  },
  'planitop-g40-me': {
    description:
      'Ceilings and soffits are the awkward repairs, and Planitop G40 ME is built for them: a low shrinkage, polymer modified cementitious mortar that turns thixotropic once mixed and is trowelled or sprayed onto overhead and vertical surfaces from 10 mm to 50 mm per layer with no formwork. Mapei sets its ceiling honestly at light to medium load bearing duty and rules it out twice over, not for anchoring, where Mapefill SP ME, Mapefill GP ME or Planigrout 300 belong, and not for pumping into formwork, where Mapegrout Hi-Flow or Mapegrout ME06 do. Mixing takes 4.25 to 4.75 litres of water per 25 kg bag for a trowelling consistency, and consumption is about 16 kg per square metre per 10 mm. Under arid conditions the sheet recommends Mapecure SRA at up to 0.25 per cent, cutting drying shrinkage by 20 to 50 per cent.',
    meta_description:
      'Planitop G40 ME TDS: low shrinkage polymer modified repair mortar for overhead and vertical work, 10 to 50 mm. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Repair of damaged concrete on vertical, horizontal and overhead surfaces',
      'Overhead repairs to ceilings and soffits of beams',
      'Reinstating concrete cover lost to corroded reinforcement',
      'Reprofiling undulations in concrete and masonry',
      'Making good exposed aggregate and formwork tie-rod holes',
      'Filling rigid joints between base and column',
    ],
  },

  /* Composite strengthening: sized by the engineer, supplied to the schedule */
  'mapewrap-c-fiocco': {
    description:
      'Structural connections are the whole job of MapeWrap C FIOCCO, a unidirectional high strength carbon fibre cord inside a protective gauze sheath, supplied in 6, 8, 10 and 12 mm diameters on 10 m rolls. One end is impregnated with MapeWrap 21 super fluid epoxy, broadcast with dry quartz sand and pushed into a drilled hole already filled with MapeWrap epoxy grout or a Mapefix chemical anchor; the free end is splayed out and bonded over the element being tied, in concrete, stone, brick or tuff. It anchors Mapegrid mesh and MapeWrap or Carboplate strengthening so the reinforcement cannot peel away. Fibre tensile strength is 4,830 N per square millimetre, but hole size, cord diameter and spacing come from the strengthening design and only the project engineer sets them. Over coat the finished system, since the listed coatings screen UV in direct sunlight.',
    meta_description:
      'MapeWrap C FIOCCO TDS: high strength carbon fibre cord for structural connections, impregnated with MapeWrap 21. Request the sheet from Lapiz Blue UAE.',
    applications: [
      'Structural connections placed inside old masonry',
      'Structural and functional restoration of concrete and masonry elements',
      'Anchoring Mapegrid mesh systems on vaulted structures',
      'Anchoring mesh strengthening on brick, stone and tuff facing walls',
      'Connections between old perimeter facing walls and Carboplate sheets',
      'Connections to MapeWrap fabrics strengthening beams and floor slabs',
    ],
  },
  'mapewrap-c-uni-ax': {
    description:
      'Which weight to order is a design decision, not a counter decision. MapeWrap C UNI-AX is a high strength unidirectional carbon fibre fabric with a high modulus of elasticity, supplied on 50 m rolls in thirteen weights from 230 to 1200 g per square metre. It is bonded onto prepared reinforced concrete, masonry, steel or timber by one of two methods, wet with the fabric pre-impregnated in MapeWrap 21, or dry with the fabric laid into MapeWrap 31 or 31 T, and MapeWrap Primer 1 with the MapeWrap 11 and 12 levelling grouts is recommended on rough or heavy work. Bond strength to concrete under EN 1542 is greater than 3 MPa with failure in the concrete. In the UAE the commonest call is a change of use loading a member beyond its original design, and only the engineer sizes that scheme.',
    meta_description:
      'MapeWrap C UNI-AX TDS: high strength unidirectional carbon fibre fabric for structural strengthening, 230 to 1200 g per square metre. From Lapiz Blue UAE.',
    applications: [
      'Repair and structural strengthening of under-dimensioned or damaged concrete',
      'Static and seismic upgrading where shear and tensile strength need enhancing',
      'Confining pillars, bridge piles and chimneys to improve load bearing capacity',
      'Seismic upgrading and restoration of arched and vaulted structures',
      'Repairing structures damaged by fire',
      'Strengthening load bearing members after a change of use',
    ],
  },

  /* Tile adhesives, decorative admixtures and UltraCare surface care */
  'adesilex-p9-express': {
    description:
      'Speed without slip is what Adesilex P9 Express is sold on, an improved, fast setting, slip resistant cementitious adhesive of class C2FT to ISO 13007-1. It carries ceramic, porcelain and mosaic indoors and out on floors, walls and ceilings, takes tile over tile up to 900 square centimetres, and holds heavy or large format tiles on a vertical surface without sagging. The programme is the reason to pay for it: 60 minutes of workability, wall joints grouted after 4 hours, floor joints after 6, light foot traffic at about 6 hours and full use after about 3 days. Open time is 20 minutes, and the sheet warns that strong sunlight, a drying wind or high temperature can cut that to a few minutes, so on a UAE site shade the bed and rework any skin with the notched trowel instead of wetting it.',
    meta_description:
      'Adesilex P9 Express TDS: C2FT fast setting slip resistant tile adhesive, walls grouted after 4 hours. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Interior and exterior ceramic, porcelain and mosaic on floors, walls and ceilings',
      'Stone materials that are not sensitive to moisture',
      'Conventional renders, cementitious mortar walls and cured screeds',
      'Gypsum, anhydrite and building board after priming',
      'Underfloor heating and cooling installations',
      'Tile over tile on existing floors up to 900 square centimetres',
    ],
  },
  'mapecolor-metallic': {
    description:
      'What this one changes is appearance, not performance. Mapecolor Metallic is a powder pigment based on very high quality pearlescent mica, dosed into mixed Kerapoxy Easy Design epoxy grout at up to 3 per cent by weight, which is exactly what one 90 g sachet gives on a 3 kg drum. Five tones are offered, Moonlight like platinum, Sahara like gold, Shining like silver, Red Clay like copper and Stardust like dark silver, and the most even result comes off the translucent Kerapoxy Easy Design 700 base. Go over the dose and the workability of the grout suffers. The powder is extremely fine and volatile, so Mapei asks for it to be blended outdoors in a spot sheltered from draughts, which on a UAE site means a screened bay, and the mix used within 45 minutes.',
    meta_description:
      'Mapecolor Metallic TDS: pearlescent mica powder pigment dosed at 3 per cent into Kerapoxy Easy Design for metallic grout. From Lapiz Blue UAE.',
    applications: [
      'Metallic effect grout mortar mixed into Kerapoxy Easy Design',
      'Grouting metallic tiles',
      'Grouting ceramic tiles with a metallic effect',
      'Grouting glass and ceramic mosaic',
      'Grouting glass tiles',
    ],
  },
  mapeglitter: {
    description:
      'Two host products take MapeGlitter and the dose differs for each. It is a metallic coloured glitter based on polyester, aluminium and epoxy resin, offered in silver and gold in 100 g sachets. Added to mixed Kerapoxy Easy Design at up to 6 per cent by weight it gives grout lines a sparkling metallic finish, which is why it is recommended for metallic tiles and for vitreous tile and mosaic. Added instead to Mapelux Lucida wax at 1 to 3 per cent, the wax itself gauged with about 5 per cent water, it puts the same sparkle on an internal wall finish. More than the stated dose spoils the workability of the grout, and the blend has to be applied within 45 minutes of mixing. A UAE terrace or pool surround is out of scope: the sheet rules out external work and swimming pools.',
    meta_description:
      'MapeGlitter TDS: silver and gold metallic glitter dosed into Kerapoxy Easy Design or Mapelux Lucida for interiors. Request it from Lapiz Blue UAE.',
    applications: [
      'Sparkling metallic grout mortar mixed into Kerapoxy Easy Design',
      'Grouting metallic tiles',
      'Grouting vitreous tiles and mosaic',
      'Sparkling finishes on internal walls with Mapelux Lucida',
      'Interior grout lines dosed up to 6 per cent by weight',
    ],
  },
  'ultracare-rust-remover': {
    description:
      'Rust is the only stain this bottle is for. UltraCare Rust Remover is a fast acting, acid free cleaner in aqueous solution with a slightly alkaline pH of 7.5, and that is precisely why it can be used on acid sensitive materials such as limestone, polished limestone included, where an acidic descaler would etch the surface beyond saving. Polished limestone and marble are the floor in half the lobbies in the UAE, so the distinction matters. Dampen the surface, lay on a coat 1 to 3 mm thick and watch it turn purple as it reacts with the iron. Rinse as soon as that colour shows, and inside five minutes on anything non absorbent, because left too long it leaves a purple halation that then needs peroxide and bicarbonate to shift. One 125 ml bottle covers about half a square metre.',
    meta_description:
      'UltraCare Rust Remover TDS: acid free thick cleaner at pH 7.5 for rust stains on acid sensitive stone. Request the data sheet from Lapiz Blue UAE.',
    applications: [
      'Removing surface and deep rust stains',
      'Rust removal from acid sensitive materials',
      'Rust stains on limestone, including polished limestone',
      'Repeat treatment of deep or stubborn rust staining',
      'Spot treatment on absorbent and non absorbent surfaces',
    ],
  },
  'ultracare-stain-remover': {
    description:
      'Oil and grease, not rust, are what UltraCare Stain Remover pulls out. It is a thick aqueous paste at pH 12 that emulsifies an organic stain, drags it to the surface and traps it in absorbent mineral thickeners, so the dirt lifts away with the dried residue. The surfaces it suits are the absorbent ones, terracotta, natural and engineered stone and cementitious floors, and it also strips water based and metallic wax. Its exclusion list is the part worth reading twice: never on polished or waxed surfaces, wood, linoleum, rubber, PVC, resin coatings or anything already treated with a protective compound. Apply 1 to 3 mm on a dry surface, leave it 12 to 24 hours until it has hardened and changed colour, then scrape off and rinse. One millimetre over a square metre takes roughly a litre.',
    meta_description:
      'UltraCare Stain Remover TDS: thick alkaline paste cleaner that draws oil and grease out of absorbent stone and terracotta. From Lapiz Blue UAE.',
    applications: [
      'Removing organic stains from terracotta',
      'Removing organic stains from natural and engineered stone',
      'Removing organic stains from cementitious surfaces',
      'Removing greasy stains from absorbent surfaces',
      'Removing water based and metallic wax',
    ],
  },
};

function main() {
  let skipped = 0;
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
    // A Mapei record with no verified sheet of its own had a parent product's
    // sheet pulled off it, so its figures came from a different document.
    // Skip it here rather than ship copy sourced from the wrong sheet.
    if (rec.tds.status !== 'verified') {
      console.log(`skipped ${slug}: no data sheet of its own yet`);
      skipped++;
      continue;
    }
    const words = entry.description.trim().split(/\s+/).length;
    if (words < 100 || words > 150) warnings.push(`${slug}: ${words} words`);
    if (entry.meta_description.length < 140 || entry.meta_description.length > 165)
      warnings.push(`${slug}: meta ${entry.meta_description.length} chars`);
    if (/[\u2013\u2014]/.test(entry.description + entry.meta_description))
      warnings.push(`${slug}: em or en dash`);

    rec.description = entry.description;
    rec.meta_description = entry.meta_description;
    if (entry.applications) rec.applications = entry.applications;
    rec.page_status = 'generated';
    rec.updated_at = now;
    written++;
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`${written} records updated, ${skipped} skipped.`);
  if (warnings.length) {
    console.log(`\n${warnings.length} warnings:`);
    for (const w of warnings) console.log(`  ${w}`);
  }
}

main();

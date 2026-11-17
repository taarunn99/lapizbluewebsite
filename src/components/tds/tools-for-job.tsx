import Image from 'next/image';
import Link from 'next/link';
import type { ManifestRecord, TdsCategory } from '@/lib/tds';
import { getToolConfig } from '@/data/toolConfigs';

/**
 * Tools for this job.
 *
 * The reference site runs a strip of the tools you need alongside the product.
 * We already carry six tool brands, so this is that strip built only out of
 * tool pages that exist, images that exist and products the brand actually
 * lists. Nothing here is invented: a pick that cannot be resolved against
 * toolConfigs is dropped, and a category with nothing honest to show renders
 * no section at all.
 *
 * A pick names a tool brand, one of its product line pages, and optionally a
 * single featured product inside that line when one specific tool is meant
 * rather than the whole line. The link always goes to the product line page,
 * because that is the page a tool has on this site.
 */

interface ToolPick {
  /** toolConfigs key. */
  brand: string;
  /** Product line slug under /tools/<brand>/. */
  line: string;
  /** Exact featuredProducts name, when one specific tool is meant. */
  product?: string;
  /** Why a tiler reaches for it on this product. One line. */
  note: string;
}

export interface ResolvedTool {
  title: string;
  brandName: string;
  note: string;
  href: string;
  image: string;
  alt: string;
}

/**
 * Category to tool, with the reason for each pick.
 *
 * Read as: what comes out of the van for this material. Picks are limited to
 * what Lapiz Blue stocks, and each note is written against the picture the
 * line actually shows, not against the tool you might wish we carried. So
 * Peygran's Cement Tools is the notched trowel and float line, Keiser's Mixing
 * Applications is the mixing station, Keiser's Grinders and Polishing covers
 * the grinder and the dust extractor together, and Keiser's Plaster Tools is a
 * rendering machine rather than a hand trowel. We carry no caulking gun and no
 * rollers or brushes at all, which is why the sealant strip is one item and
 * why no pick claims a roller.
 */
const TOOLS_BY_CATEGORY: Partial<Record<TdsCategory, ToolPick[]>> = {
  // Comb the bed, mix it right, hold the tiles flush, cut to the setting out
  // line. The four things a tiler does with a bag of adhesive.
  tile_adhesive: [
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'Notched trowels comb the bed to an even depth, so the coverage under the tile is the coverage on the sheet.',
    },
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'A paddle mix at the water ratio the sheet states is where the open time and the grab come from.',
    },
    {
      brand: 'peygran',
      line: 'levelling',
      note: 'Levelling clips and wedges hold two tiles flush to each other while the adhesive sets.',
    },
    {
      brand: 'montolit',
      line: 'tile-cutters-and-blades',
      product: 'Masterpiuma P5',
      note: 'Cuts large format porcelain to the setting out line before the bed goes down.',
    },
  ],

  // A grout joint is packed with a float and washed off with water, and the
  // joint width was decided by the spacer long before that.
  cementitious_grout: [
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'A grouting float packs the joint without voids, and a cleaning float takes the haze off before it hardens.',
    },
    {
      brand: 'peygran',
      line: 'spacers',
      note: 'The spacer sets the joint width, which decides the grout grade and how much of it the job takes.',
    },
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'Mixing to the same water every time is what keeps the colour even from batch to batch.',
    },
  ],

  // Epoxy is unforgiving twice: it must be mixed to the whole pack, and it
  // must come off the tile face before it sets.
  epoxy_grout: [
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'A dense rubber float to pack it and a cleaning float to wash it back. Epoxy left on the face does not come off later.',
    },
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'Two part epoxy is mixed to the full pack. A part pack mixed by eye will not cure.',
    },
  ],

  // Sheet vinyl and LVT: a fine notch for the thin bed, and a knife for the
  // trimming that takes longer than the sticking.
  resilient_adhesive: [
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'A fine notched trowel for the thin bed that sheet vinyl and LVT are laid into.',
    },
    {
      brand: 'dewalt',
      line: 'hand-tools',
      product: 'Utility Knife with Blade Storage',
      note: 'Trimming sheet and plank to the wall line, with the spare blades in the handle.',
    },
  ],

  // Break out the loose concrete, mix the mortar, work it in. Patching onto
  // unsound substrate is the usual reason a repair comes back.
  repair_mortar: [
    {
      brand: 'hilti',
      line: 'power-tools',
      product: 'TE 500-22 Cordless Chipping Hammer',
      note: 'Breaking back to sound concrete and squaring the edges of the patch before anything is mixed.',
    },
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'Repair mortars are mixed to a stated consistency, not to whatever looks right in the bucket.',
    },
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'Trowels and finishing floats to work the mortar into the prepared edges and bring it flush with the surround.',
    },
  ],

  // Free flowing grout only flows if the water is measured, and someone has
  // to strike off the shoulder once the plate is bedded.
  precision_grout: [
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'Flow is a function of water. Mix to the stated ratio or the grout will not travel under the plate.',
    },
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'Trowels to form the dam and strike off the shoulder once the baseplate is bedded.',
    },
  ],

  // Liquid applied membranes go on by spray over any real area, the
  // cementitious ones are trowelled, and both want a sound substrate first.
  waterproofing: [
    {
      brand: 'keiser',
      line: 'electric-paint-sprayers',
      note: 'Airless spray puts a liquid applied membrane down at an even film thickness over a large area.',
    },
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'Trowels and floats for the two coat cementitious slurry membranes.',
    },
    {
      brand: 'keiser',
      line: 'grinders-and-polishing',
      note: 'Grinding back to sound concrete and vacuuming it clean. A membrane is only as good as what it is stuck to.',
    },
  ],

  // We stock no caulking gun, so this is the one honest pick: the knife that
  // opens the cartridge and trims the bead.
  sealant: [
    {
      brand: 'dewalt',
      line: 'hand-tools',
      product: 'Utility Knife with Blade Storage',
      note: 'Cutting the nozzle to the joint width and trimming the cured bead back square.',
    },
  ],

  // Resin flooring is nine tenths preparation and one tenth mixing, and both
  // of those we stock.
  flooring_system: [
    {
      brand: 'keiser',
      line: 'grinders-and-polishing',
      note: 'Diamond grinding and dust extraction together, which is how the slab gets the profile a resin system keys into.',
    },
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'Resin systems are mixed to the full unit and then used inside the pot life.',
    },
  ],

  // A levelling screed forgives nothing about water, nothing about laitance
  // and nothing about the datum.
  self_leveling: [
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'Mix at the stated water. Too much and the screed segregates, too little and it will not flow out.',
    },
    {
      brand: 'keiser',
      line: 'grinders-and-polishing',
      note: 'Taking the laitance off and vacuuming the slab down before anything is poured on it.',
    },
    {
      brand: 'hilti',
      line: 'laser-measuring-tools-and-scanners',
      product: 'PR 30-HVS Rotating Laser',
      note: 'Sets and checks the finished floor datum the screed is poured to.',
    },
  ],

  // Microcement is built up in thin coats, flattened between them, and mixed
  // in small batches.
  microcement: [
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'Finishing floats for the thin coats microcement is built up in, and for closing the surface.',
    },
    {
      brand: 'keiser',
      line: 'grinders-and-polishing',
      note: 'Flattening between coats and taking the dust off before the next one goes on.',
    },
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'Small batches mixed the same way each time, so the colour holds across the floor.',
    },
  ],

  // Render and plaster: the machine for the area, the float for the finish.
  plaster: [
    {
      brand: 'keiser',
      line: 'plaster-tools',
      note: 'A rendering machine mixes and sprays the coat onto the wall, which is how a facade gets covered without a gang of hands.',
    },
    {
      brand: 'peygran',
      line: 'cement-tools',
      note: 'Finishing floats to rule the coat off and close the surface once it has taken up.',
    },
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'A forced mix at the stated water gives the board life the sheet quotes.',
    },
  ],

  // Sealers, impregnators and polishes: get the surface right, then lay the
  // coat down evenly.
  surface_treatment: [
    {
      brand: 'keiser',
      line: 'grinders-and-polishing',
      note: 'Grinding and polishing the surface first, because a sealer locks in whatever is under it.',
    },
    {
      brand: 'keiser',
      line: 'electric-paint-sprayers',
      note: 'Airless spray lays a sealer down evenly, without the lap marks a second pass leaves.',
    },
  ],

  // A bond coat is a prepared substrate plus a properly mixed slurry.
  bonding_agent: [
    {
      brand: 'keiser',
      line: 'grinders-and-polishing',
      note: 'Grinding the substrate open and vacuuming it, so the bond coat keys in rather than sitting on dust.',
    },
    {
      brand: 'keiser',
      line: 'mixing-applications',
      note: 'Slurry bond coats are mixed to a workable consistency and used fresh, not revived with water.',
    },
  ],

  // Priming a floor is a prepared, vacuumed slab and an even coat on it.
  primer: [
    {
      brand: 'keiser',
      line: 'grinders-and-polishing',
      note: 'Grinding and vacuuming the slab, so the primer soaks into concrete rather than sitting on dust.',
    },
    {
      brand: 'keiser',
      line: 'electric-paint-sprayers',
      note: 'Airless spray primes a large floor in one pass at a consistent rate.',
    },
  ],

  // accessory: tapes, waterstops, aggregates, glitters and carbon fibre. No
  // single tool belongs to that set, so the section does not render for it.
};

/**
 * Resolve the picks for a category against toolConfigs, dropping anything that
 * does not exist. The page uses the length to decide whether to render the
 * section and its nav anchor at all.
 */
export function toolsForJob(category: TdsCategory): ResolvedTool[] {
  const picks = TOOLS_BY_CATEGORY[category];
  if (!picks) return [];

  const out: ResolvedTool[] = [];
  for (const pick of picks) {
    const tool = getToolConfig(pick.brand);
    if (!tool || tool.category !== 'tool') continue;

    const line = tool.productLines.find((pl) => pl.slug === pick.line);
    if (!line) continue;

    const featured = line.featuredProducts ?? line.content?.featuredProducts ?? [];

    if (pick.product) {
      const product = featured.find((f) => f.name === pick.product);
      if (!product || !product.image) continue;
      out.push({
        title: product.name,
        brandName: tool.name,
        note: pick.note,
        href: `/tools/${tool.slug}/${line.slug}`,
        image: product.image,
        alt: `${tool.name} ${product.name}`,
      });
      continue;
    }

    const image = line.images?.[0] ?? featured[0]?.image;
    if (!image) continue;
    out.push({
      title: line.name,
      brandName: tool.name,
      note: pick.note,
      href: `/tools/${tool.slug}/${line.slug}`,
      image,
      alt: `${tool.name} ${line.name} for tile and floor installation`,
    });
  }
  return out;
}

/**
 * How wide the strip runs. A short strip is held to a narrower measure rather
 * than stretched across the page, so two cards do not become two billboards
 * with a taller picture than the pack shot in the hero.
 */
const STRIP_WIDTH: Record<number, string> = {
  1: 'max-w-sm grid-cols-1',
  2: 'max-w-3xl grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function ToolsForJob({ rec }: { rec: ManifestRecord }) {
  const tools = toolsForJob(rec.category);
  if (tools.length === 0) return null;

  const width = STRIP_WIDTH[Math.min(tools.length, 4)] ?? STRIP_WIDTH[4];

  return (
    <ul className={`grid gap-5 ${width}`}>
      {tools.map((tool) => (
        <li key={tool.href + tool.title}>
          <Link
            href={tool.href}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#161925]/12 bg-white transition-colors hover:border-[var(--brand-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)]"
          >
            <div className="relative aspect-[4/3] w-full bg-[#F6F8FA]">
              <Image
                src={tool.image}
                alt={tool.alt}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                className="object-contain p-5"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="label-sh text-[#161925]/65">{tool.brandName}</p>
              <p className="mt-2 font-outfit text-lg font-bold leading-tight text-[#161925] group-hover:text-[var(--brand-ink)]">
                {tool.title}
              </p>
              <p className="mt-3 font-manrope text-sm leading-relaxed text-[#161925]/80">
                {tool.note}
              </p>
              <span className="label-sh mt-5 inline-flex items-center gap-2 text-[var(--brand-ink)]">
                View the range
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

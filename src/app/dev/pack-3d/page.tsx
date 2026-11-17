import type { Metadata } from "next";
import { Pack3D } from "@/components/tds/pack-3d";
import type { PackForm } from "@/components/tds/pack-3d.client";
import plan from "../../../../data/discovery/pack-3d-plan.json";

// Prototype bench. Never indexed, never linked, not in the sitemap and not in
// public/llms.txt. Every Pidilite Puma pack in the plan is rendered here in
// plan order, which is also the order the poster script screenshots them in,
// so the filenames and the canvases cannot drift apart.
export const metadata: Metadata = {
  title: "Pack 3D prototype",
  robots: { index: false, follow: false },
};

interface PlanEntry {
  form: string;
  src: string;
  poster: string;
  name: string;
  pack: string;
}

const PLAN = plan as Record<string, PlanEntry>;
const SLUGS = Object.keys(PLAN);

const FORM_WORD: Record<PackForm, string> = {
  bag: "bag",
  bucket: "pail",
  kit: "kit",
  jerrycan: "jerrycan",
  "bag-and-can": "bag and can",
};

/** A two component pack already names its own components, so leave it alone. */
function packSizeLabel(pack: string, form: PackForm): string {
  if (pack.includes("component")) return pack;
  return `${pack} ${FORM_WORD[form]}`;
}

const COUNTS = SLUGS.reduce(
  (acc, slug) => {
    const form = PLAN[slug].form as PackForm;
    acc[form] += 1;
    return acc;
  },
  { bag: 0, bucket: 0, kit: 0, jerrycan: 0, 'bag-and-can': 0 } as Record<PackForm, number>,
);

export default function Pack3DPrototypePage() {
  return (
    <main className="bg-[#F6F8FA]">
      {/* Intro block holds the whole first screen so nothing 3D is ever
          above the fold, which is the point of the mount rule. */}
      <section className="mx-auto w-full max-w-[1200px] px-5 pt-16 pb-24 sm:px-8 lg:pt-28 lg:pb-40">
        <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.22em] text-[#406E8E]">
          Prototype bench
        </p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.618fr_1fr] lg:items-end">
          <h1 className="font-outfit text-[clamp(2.1rem,6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#161925]">
            Pack shots, turned into packs.
          </h1>
          <p className="font-manrope text-[15px] leading-[1.7] text-[#23395B]">
            Every Pidilite Puma pack built as real geometry, each one wearing
            its own pack shot. Nothing here is wired into a product page. This
            page exists so the renderer can be seen and so one static poster can
            be captured per product in a single fixed pose.
          </p>
        </div>
        <dl className="mt-16 grid gap-10 border-t border-[#23395B]/15 pt-12 sm:grid-cols-3 lg:mt-24 lg:pt-16">
          <div>
            <dt className="font-outfit text-[clamp(2rem,5vw,3rem)] font-semibold leading-none text-[#161925]">
              {SLUGS.length}
            </dt>
            <dd className="mt-2 font-manrope text-[13px] text-[#23395B]">
              Pidilite Puma packs in the plan, all rendered below
            </dd>
          </div>
          <div>
            <dt className="font-outfit text-[clamp(2rem,5vw,3rem)] font-semibold leading-none text-[#161925]">
              4
            </dt>
            <dd className="mt-2 font-manrope text-[13px] text-[#23395B]">
              Pack forms: {COUNTS.bag} bags, {COUNTS.bucket} pails,{" "}
              {COUNTS.jerrycan} jerrycans, {COUNTS.kit + COUNTS["bag-and-can"]}{" "}
              two component packs
            </dd>
          </div>
          <div>
            <dt className="font-outfit text-[clamp(2rem,5vw,3rem)] font-semibold leading-none text-[#161925]">
              100
            </dt>
            <dd className="mt-2 font-manrope text-[13px] text-[#23395B]">
              The Lighthouse score this has to leave alone
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-[#23395B]/10 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24 lg:pt-32">
          <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.22em] text-[#406E8E]">
            Drag to turn
          </p>
          <h2 className="mt-4 max-w-[22ch] font-outfit text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-[#161925]">
            The whole range, lit the way the site is lit.
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {SLUGS.map((slug) => {
              const entry = PLAN[slug];
              const form = entry.form as PackForm;
              return (
                <div key={slug} data-pack-slug={slug}>
                  <Pack3D
                    src={entry.src}
                    poster={entry.poster}
                    form={form}
                    name={entry.name}
                    packSize={packSizeLabel(entry.pack, form)}
                  />
                  <p className="mt-2 font-manrope text-[12px] leading-[1.6] text-[#406E8E]">
                    {slug}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-12 max-w-[60ch] font-manrope text-[13px] leading-[1.7] text-[#406E8E]">
            A visitor who asks for reduced motion never loads the renderer at
            all. They keep the static poster, which is the same image a crawler
            reads in the server rendered markup.
          </p>
        </div>
      </section>

      <section className="bg-[#161925]">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8">
          <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.22em] text-[#BFD7EA]">
            Tail block
          </p>
          <p className="mt-4 max-w-[52ch] font-manrope text-[15px] leading-[1.7] text-white/80">
            Scroll past the packs and the render loop stops. Scroll back and it
            resumes. Nothing animates off screen.
          </p>
        </div>
      </section>
    </main>
  );
}

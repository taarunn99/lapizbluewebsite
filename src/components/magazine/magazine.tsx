import Link from "next/link";
import { brandConfigs } from "@/data/brandConfigs";
import { getBrandHub } from "@/data/brand-hub";
import { hubFigures } from "@/components/brands/hub/brand-hub-sections";
import { BRAND_SCENE } from "@/data/scenes";
import SceneFrame, { hasPoster } from "@/components/three/scene-frame";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SpreadReveal, SpreadRule } from "./spread-reveal.client";
import { SpotlightCard } from "./spotlight-card.client";

/**
 * The brands page as an issue of a magazine: a contents page, then one spread
 * per brand. Each spread is the brand hub's own answer, figures and letter,
 * the brand photograph, and the system poster, laid out on the golden ratio
 * with running heads and page numbers. Everything links down into the hub,
 * which is where the ranking lives; this page is the cover that sells it.
 */

export const ISSUE = [
  { slug: "mapei", name: "Mapei", strap: "The reference. Tile adhesives, grouts, waterproofing, repair." },
  { slug: "kerakoll", name: "Kerakoll", strap: "GreenBuilding chemistry, GCC product names." },
  { slug: "weber", name: "Weber Saint-Gobain", strap: "Made in the region for the region." },
  { slug: "laticrete", name: "Laticrete", strap: "254 Platinum, Spectralock, Hydro Ban." },
  { slug: "pidilite-puma", name: "Pidilite Puma", strap: "Pegoland, made in the UAE, short lead times." },
  { slug: "profilpas", name: "Profilpas", strap: "Italian profiles, our number one by volume." },
  { slug: "akzonobel", name: "AkzoNobel Dulux", strap: "Interior, exterior, floor and metal coatings." },
  { slug: "fila", name: "FILA", strap: "The handover step: clean, seal, maintain." },
  { slug: "kalinga-stone", name: "Kalinga Stone", strap: "Engineered quartz, marble and terrazzo." },
] as const;

const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12";
const pad = (n: number) => String(n).padStart(2, "0");

function BrandPhoto({ slug, alt, eager = false }: { slug: string; alt: string; eager?: boolean }) {
  const base = `/images/brands/${slug}/hero`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-828.avif 828w, ${base}-1200.avif 1200w`} sizes="(max-width: 1024px) 100vw, 560px" />
      <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-828.webp 828w, ${base}-1200.webp 1200w`} sizes="(max-width: 1024px) 100vw, 560px" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}-828.webp`} alt={alt} width={828} height={552} loading={eager ? "eager" : "lazy"} decoding="async" className="block aspect-[3/2] w-full rounded-2xl object-cover" />
    </picture>
  );
}

/** Contents: the nine spreads as a numbered list, the way an issue opens. */
export function MagazineContents() {
  return (
    <section className="bg-[#161925] text-white" aria-labelledby="contents-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16">
          <div>
            <p className="label-sh text-[#BFD7EA]">Issue 2026 to 2027</p>
            <h2 id="contents-heading" className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-6xl mt-3 leading-[1.02]">
              In this issue
            </h2>
            <p className="font-manrope text-white/75 text-lg mt-5 max-w-[42ch]">
              Nine manufacturers, each with the letter that appoints Lapiz Blue, the system drawn layer by layer, and the
              figures a buyer wants before the quotation.
            </p>
            <p className="label-sh mt-10 text-[#F3DFC1]">Outstanding Construction Material Wholesaler, 2026 Dubai Local Awards</p>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {ISSUE.map((b, i) => (
              <li key={b.slug}>
                <a href={`#spread-${b.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-4 transition-colors hover:text-[#BFD7EA]">
                  <span className="font-outfit font-semibold text-2xl sm:text-3xl text-[#F3DFC1] tabular-nums">{pad(i + 1)}</span>
                  <span className="min-w-0">
                    <span className="block font-outfit font-semibold text-xl sm:text-2xl leading-snug">{b.name}</span>
                    <span className="block font-manrope text-sm text-white/65">{b.strap}</span>
                  </span>
                  <span className="label-sh text-white/50 group-hover:text-[#BFD7EA]">p. {pad(i + 1)}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** One spread per brand. */
export function MagazineSpreads() {
  return (
    <div>
      {ISSUE.map((b, i) => {
        const cfg = brandConfigs[b.slug as keyof typeof brandConfigs];
        const hub = getBrandHub(b.slug);
        if (!cfg || !hub) return null;
        const figures = hubFigures(hub).slice(0, 3);
        const scene = BRAND_SCENE[b.slug];
        const flip = i % 2 === 1;
        return (
          <section key={b.slug} id={`spread-${b.slug}`} className={`scroll-mt-[75px] ${i % 2 ? "bg-[#F6F8FA]" : "bg-white"}`} aria-labelledby={`spread-${b.slug}-heading`}>
            <div className={`${wrap} py-16 lg:py-24`}>
              <SpreadReveal>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="label-sh text-[#161925]/60">{b.name}</p>
                  <p className="label-sh text-[#161925]/60">Spread {pad(i + 1)} of {pad(ISSUE.length)}</p>
                </div>
                <SpreadRule className="mt-3" />
              </SpreadReveal>

              <div className={`mt-10 grid grid-cols-1 gap-10 lg:gap-16 ${flip ? "lg:grid-cols-[1fr_1.618fr]" : "lg:grid-cols-[1.618fr_1fr]"}`}>
                <SpreadReveal delay={0.1} className={flip ? "lg:order-2" : ""}>
                  <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">{hub.eyebrow}</p>
                  <h2 id={`spread-${b.slug}-heading`} className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight text-[#161925] max-w-[18ch]">
                    {hub.heading}
                  </h2>
                  <p className="font-manrope text-[#161925]/80 text-lg leading-relaxed mt-6 max-w-[62ch]">{hub.answer[0]}</p>

                  <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                    {figures.map((f) => {
                      const n = Number(f.value);
                      return (
                        <SpotlightCard key={f.label} className="p-4 sm:p-5">
                          <dd className="font-outfit font-semibold text-3xl sm:text-4xl text-[#161925] tabular-nums leading-none">
                            {Number.isFinite(n) && n > 0 && n < 100000 && !/^\d{4}$/.test(f.value) ? <AnimatedCounter end={n} /> : f.value}
                          </dd>
                          <dt className="font-manrope text-[#161925]/70 text-xs sm:text-sm mt-2 leading-snug">{f.label}</dt>
                        </SpotlightCard>
                      );
                    })}
                  </dl>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link href={`/brands/${b.slug}`} className="inline-flex min-h-[2.75rem] items-center rounded-full bg-[#161925] px-6 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90">
                      Open the {b.name} page
                    </Link>
                    {hub.credential ? (
                      <a href={hub.credential.file} target="_blank" rel="noopener" className="font-manrope text-sm font-semibold text-[#406E8E] underline underline-offset-4">
                        {hub.credential.title}
                      </a>
                    ) : (
                      <Link href="/credentials" className="font-manrope text-sm font-semibold text-[#406E8E] underline underline-offset-4">
                        Appointment letters
                      </Link>
                    )}
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {cfg.productLines.slice(0, 6).map((pl) => (
                      <li key={pl.slug}>
                        <Link href={`/brands/${b.slug}/${pl.slug}`} className="font-manrope text-sm text-[#161925]/75 underline-offset-4 hover:text-[#406E8E] hover:underline">
                          {pl.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </SpreadReveal>

                <SpreadReveal delay={0.2} className={`grid gap-4 self-start ${flip ? "lg:order-1" : ""}`}>
                  <BrandPhoto slug={b.slug} alt={cfg.hero.alt} />
                  {scene && hasPoster(scene) ? (
                    <SceneFrame scene={scene} sizes="(max-width: 1024px) 100vw, 560px" />
                  ) : null}
                </SpreadReveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

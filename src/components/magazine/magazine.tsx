import Link from "next/link";
import { brandConfigs } from "@/data/brandConfigs";
import { getBrandHub } from "@/data/brand-hub";
import { hubFigures } from "@/components/brands/hub/brand-hub-sections";
import { BRAND_SCENE } from "@/data/scenes";
import { hasPoster, posterSrc } from "@/components/three/scene-frame";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SpreadReveal } from "./spread-reveal.client";
import { BrandStackDeck } from "./brand-stack.client";
import { ContentsIndex, type ContentsItem } from "./contents-row.client";
import Image from "next/image";
import hubImages from "@/data/hub-images.json";

/**
 * The brands page as an issue of a magazine: a contents page, then one spread
 * per brand. Each spread is the brand hub's own answer, figures and letter,
 * the brand photograph, and the system poster, laid out on the golden ratio
 * with running heads and page numbers. Everything links down into the hub,
 * which is where the ranking lives; this page is the cover that sells it.
 */

export const ISSUE = [
  { slug: "mapei", name: "Mapei", strap: "The reference. Tile adhesives, grouts, waterproofing, repair.", logo: "/images/brands/logos/mapei-new.webp" },
  { slug: "kerakoll", name: "Kerakoll", strap: "GreenBuilding chemistry, GCC product names.", logo: "/images/brands/logos/kerakoll-new.webp" },
  { slug: "weber", name: "Weber Saint-Gobain", strap: "Made in the region for the region.", logo: "/images/brands/logos/weber-new.webp" },
  { slug: "laticrete", name: "Laticrete", strap: "254 Platinum, Spectralock, Hydro Ban.", logo: "/images/brands/logos/laticrete-new.webp" },
  { slug: "pidilite-puma", name: "Pidilite Puma", strap: "Pegoland, made in the UAE, short lead times.", logo: "/images/brands/logos/pidilite-puma-new.webp" },
  { slug: "profilpas", name: "Profilpas", strap: "Italian profiles, our number one by volume.", logo: "/images/brands/logos/profilpas-new.webp" },
  { slug: "akzonobel", name: "AkzoNobel Dulux", strap: "Interior, exterior, floor and metal coatings.", logo: "/images/brands/logos/akzonobel-new.webp" },
  { slug: "fila", name: "FILA", strap: "The handover step: clean, seal, maintain.", logo: "/images/brands/logos/fila-new.webp" },
  { slug: "kalinga-stone", name: "Kalinga Stone", strap: "Engineered quartz, marble and terrazzo.", logo: "/images/brands/logos/kalinga-stone.webp" },
] as const;

const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12";
const pad = (n: number) => String(n).padStart(2, "0");

const HERO_SET = new Set(["mapei", "kerakoll", "weber", "laticrete", "profilpas", "akzonobel", "fila", "kalinga-stone"]);

/** Brands whose hero is a wide banner get a dedicated 3:2 card image (640, 1200, 1600). */
const CARD_SET: Record<string, string> = { profilpas: "/images/brands/profilpas/card", akzonobel: "/images/brands/akzonobel/hub-mood" };

function BrandPhoto({ slug, alt, eager = false, className = "block aspect-[3/2] w-full rounded-2xl object-cover" }: { slug: string; alt: string; eager?: boolean; className?: string }) {
  const sizes = "(max-width: 1024px) 100vw, 760px";
  if (CARD_SET[slug] || (!HERO_SET.has(slug) && (hubImages as Record<string, { mood?: unknown }>)[slug]?.mood)) {
    const base = CARD_SET[slug] || `/images/brands/${slug}/hub-mood`;
    return (
      <picture>
        <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1200.avif 1200w, ${base}-1600.avif 1600w`} sizes={sizes} />
        <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w, ${base}-1600.webp 1600w`} sizes={sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${base}-1200.webp`} alt={alt} width={1200} height={800} loading={eager ? "eager" : "lazy"} decoding="async" className={className} />
      </picture>
    );
  }
  const base = `/images/brands/${slug}/hero`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-828.avif 828w, ${base}-1200.avif 1200w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-828.webp 828w, ${base}-1200.webp 1200w`} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}-828.webp`} alt={alt} width={828} height={552} loading={eager ? "eager" : "lazy"} decoding="async" className={className} />
    </picture>
  );
}

/** Contents: the nine spreads as a numbered list, the way an issue opens. */
const LOGO_TONE: Record<string, ContentsItem["tone"]> = { weber: "on-white", laticrete: "on-white", fila: "on-white", "pidilite-puma": "on-dark" };
const previewSrc = (slug: string) => (slug === "pidilite-puma" ? "/images/brands/pidilite-puma/hub-mood-1200.webp" : `/images/brands/${slug}/hero-828.webp`);
/**
 * Where the mark sits inside each logo file, as fractions, measured once from
 * the alpha channel (or the background colour for the two flat files; the
 * Pidilite Puma box is its wordmark band). The index slot is 124 by 32 px and
 * the mark is scaled to fill it and right aligned, so a padded square file
 * reads at the same size as a tight wide one.
 */
const LOGO_BOX: Record<string, { r: number; x0: number; x1: number; y0: number; y1: number }> = {
  mapei: { r: 1.6, x0: 0.0059, x1: 0.9956, y0: 0.3105, y1: 0.6895 },
  kerakoll: { r: 4.5552, x0: 0.0203, x1: 0.9797, y0: 0.0498, y1: 0.9253 },
  weber: { r: 2.8519, x0: 0.0466, x1: 0.9531, y0: 0.1328, y1: 0.8663 },
  laticrete: { r: 1.4081, x0: 0.0707, x1: 0.9625, y0: 0.0754, y1: 0.984 },
  "pidilite-puma": { r: 1, x0: 0.075, x1: 0.924, y0: 0.568, y1: 0.676 },
  profilpas: { r: 2.5181, x0: 0, x1: 1, y0: 0, y1: 1 },
  akzonobel: { r: 1.7778, x0: 0.0193, x1: 0.9805, y0: 0.0069, y1: 0.9931 },
  fila: { r: 1.5291, x0: 0, x1: 1, y0: 0, y1: 1 },
  "kalinga-stone": { r: 1, x0: 0.0458, x1: 0.9533, y0: 0.3367, y1: 0.6625 },
};
const SLOT_W = 124;
const SLOT_H = 32;
function logoStyle(slug: string): ContentsItem["logoStyle"] {
  const b = LOGO_BOX[slug] ?? { r: 3, x0: 0, x1: 1, y0: 0, y1: 1 };
  const fw = b.x1 - b.x0;
  const fh = b.y1 - b.y0;
  const width = Math.min(SLOT_W / fw, (SLOT_H * b.r) / fh);
  const height = width / b.r;
  const left = SLOT_W - width * b.x1;
  const top = SLOT_H / 2 - (height * (b.y0 + b.y1)) / 2;
  const px = (n: number) => `${Math.round(n * 100) / 100}px`;
  return { width: px(width), height: px(height), left: px(left), top: px(top) };
}

export function MagazineContents() {
  const items: ContentsItem[] = ISSUE.map((b) => ({
    slug: b.slug,
    name: b.name,
    strap: b.strap,
    logo: b.logo,
    tone: LOGO_TONE[b.slug] ?? "alpha",
    logoStyle: logoStyle(b.slug),
    preview: previewSrc(b.slug),
  }));
  return (
    <section className="bg-[#161925] text-white" aria-labelledby="contents-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="label-sh text-[#BFD7EA]">Issue 2026 to 2027</p>
            <h2 id="contents-heading" className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-6xl mt-3 leading-[1.02]">
              In this issue
            </h2>
            <p className="font-manrope text-white/75 text-lg mt-5 max-w-[42ch]">
              Nine manufacturers, each with the letter that appoints Lapiz Blue, the system drawn layer by layer, and the
              figures a buyer wants before the quotation.
            </p>
            <p className="mt-10">
              <span className="label-sh inline-flex max-w-full items-center gap-2 rounded-full border border-[#F3DFC1]/35 bg-[#F3DFC1]/10 px-4 py-2.5 leading-[1.5] text-[#F3DFC1]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F3DFC1]" aria-hidden="true" />
                Outstanding Construction Material Wholesaler, 2026 Dubai Local Awards
              </span>
            </p>
            <p className="label-sh mt-8 hidden items-center gap-3 text-white/70 lg:flex" aria-hidden="true">
              <span className="h-px w-10 bg-white/25" />
              Scroll the index
            </p>
          </div>
          <ContentsIndex items={items} />
        </div>
      </div>
    </section>
  );
}

/** One spread per brand. */
export function MagazineSpreads() {
  return (
    <section className="bg-[#161925]" aria-labelledby="brand-stack-heading">
      <div className={`${wrap} pt-16 lg:pt-24 pb-6`}>
        <SpreadReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-manrope text-[#BFD7EA] text-sm uppercase tracking-widest">By brand</p>
              <h2 id="brand-stack-heading" className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-6xl mt-2 leading-none text-white">The index.</h2>
            </div>
            <p className="label-sh text-white/60">Nine brands, one card each, tap any card</p>
          </div>
          <div className="mt-6 h-px w-full bg-white/15" aria-hidden="true" />
        </SpreadReveal>
      </div>
      <div className={`${wrap} pb-16 lg:pb-24`}>
        <BrandStackDeck>
          {ISSUE.map((b, i) => {
            const cfg = brandConfigs[b.slug as keyof typeof brandConfigs];
            const hub = getBrandHub(b.slug);
            if (!cfg || !hub) return null;
            const figures = hubFigures(hub).slice(0, 3);
            const scene = BRAND_SCENE[b.slug];
            return (
              <article
                key={b.slug}
                id={`spread-${b.slug}`}
                className="scroll-mt-[88px] overflow-hidden rounded-3xl bg-white text-[#161925] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] will-change-transform lg:h-[calc(100vh-7.5rem)] lg:min-h-[600px] lg:max-h-[860px] grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] origin-top"
                aria-labelledby={`spread-${b.slug}-heading`}
              >
                <div className="flex flex-col p-6 sm:p-8 lg:p-10 lg:overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <Image src={b.logo} alt={`${b.name} logo`} width={220} height={72} className="h-12 w-auto max-w-[200px] object-contain object-left sm:h-14" loading={i < 2 ? "eager" : "lazy"} />
                    <span className="font-outfit font-semibold text-4xl sm:text-5xl text-[#406E8E] tabular-nums leading-none">{pad(i + 1)}</span>
                  </div>
                  <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest mt-8">{hub.eyebrow}</p>
                  <h3 id={`spread-${b.slug}-heading`} className="font-outfit font-semibold text-2xl sm:text-3xl xl:text-4xl mt-2 leading-tight max-w-[20ch]">
                    {hub.heading}
                  </h3>
                  <p className="font-manrope text-[#161925]/75 text-base leading-relaxed mt-4 max-w-[58ch] lg:line-clamp-4">{hub.answer[0]}</p>

                  <ul className="mt-6 grid grid-cols-3 gap-3" aria-label="Figures">
                    {figures.map((f) => {
                      const n = Number(f.value);
                      return (
                        <li key={f.label} className="rounded-xl bg-[#F6F8FA] p-3 sm:p-4">
                          <span className="block font-outfit font-semibold text-2xl sm:text-3xl tabular-nums leading-none">
                            {Number.isFinite(n) && n > 0 && n < 100000 && !/^\d{4}$/.test(f.value) ? <AnimatedCounter end={n} /> : f.value}
                          </span>
                          <span className="block font-manrope text-[#161925]/65 text-xs mt-2 leading-snug">{f.label}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                      {cfg.productLines.slice(0, 6).map((pl) => (
                        <li key={pl.slug}>
                          <Link href={`/brands/${b.slug}/${pl.slug}`} className="font-manrope text-sm text-[#161925]/70 underline-offset-4 hover:text-[#406E8E] hover:underline">
                            {pl.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-0 bg-[#F6F8FA]">
                  <BrandPhoto slug={b.slug} alt={cfg.hero.alt} eager={i === 0} className="absolute inset-0 h-full w-full object-cover" />
                  {scene && hasPoster(scene) ? (
                    <Link href={`/brands/${b.slug}#system`} className="absolute bottom-4 right-4 hidden w-[42%] max-w-[300px] overflow-hidden rounded-2xl bg-white shadow-lg sm:block" aria-label={`Turn it in 3D: the ${b.name} system on the brand page`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={posterSrc(scene, 640)} alt={`${b.name} system, layer by layer, rendered in 3D`} width={640} height={480} loading="lazy" decoding="async" className="block aspect-[4/3] w-full object-cover" />
                      <span className="label-sh absolute bottom-2 left-3 text-[#161925]/70">Turn it in 3D</span>
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </BrandStackDeck>
      </div>
    </section>
  );
}

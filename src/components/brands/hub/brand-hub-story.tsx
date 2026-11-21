import type { ReactNode } from "react";
import { SpreadReveal } from "@/components/magazine/spread-reveal.client";
import hubImages from "@/data/hub-images.json";

/**
 * The brand's story, on one spread.
 *
 * Replaces the run of template sections every hub used to carry (about the
 * brand, why Lapiz Blue, the sector icon row, key products, applications,
 * trust signals, awards): the same words, one layout. A photograph with the
 * awards or figures under it, the story beside it, the sectors as a row of
 * pills, the applications as a compact index, and the long form material
 * folded under a disclosure so it stays in the HTML without filling the
 * screen. Server rendered; the only motion is the in view reveal.
 */

export interface StoryAward { year: string; title: string }
export interface StoryItem { title: string; description: string }

interface Props {
  slug: string;
  brandName: string;
  story: string;
  why: string;
  whyTitle?: string;
  /** Short sector labels, shown as pills. */
  sectors?: string[];
  applications?: { sector: string; description: string }[];
  trustSignals?: StoryItem[];
  certifications?: string[];
  customSections?: { id: string; title: string; content: string }[];
  awards?: StoryAward[];
  unique?: { title: string; subtitle?: string; items: StoryItem[] };
  /** Extra content rendered inside the band, after the index (a PDF link block, for instance). */
  children?: ReactNode;
}

const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12";
const HERO_SET = new Set(["mapei", "kerakoll", "weber", "laticrete", "profilpas", "akzonobel", "fila", "kalinga-stone"]);

const STORY_PHOTO: Record<string, string> = { "kalinga-stone": "/images/brands/kalinga-stone/gcb/quartz-decor-production-line" };

function StoryPhoto({ slug, alt }: { slug: string; alt: string }) {
  const sizes = "(max-width: 1024px) 100vw, 760px";
  if (STORY_PHOTO[slug]) {
    const base = STORY_PHOTO[slug];
    return (
      <picture>
        <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1200.avif 1200w, ${base}-1600.avif 1600w`} sizes={sizes} />
        <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w, ${base}-1600.webp 1600w`} sizes={sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${base}-1200.webp`} alt={alt} width={1200} height={800} loading="lazy" decoding="async" className="block aspect-[3/2] w-full rounded-2xl object-cover" />
      </picture>
    );
  }
  const img = (hubImages as Record<string, { site?: unknown }>)[slug];
  if (!HERO_SET.has(slug) && img?.site) {
    const base = `/images/brands/${slug}/hub-site`;
    return (
      <picture>
        <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1200.avif 1200w, ${base}-1600.avif 1600w`} sizes={sizes} />
        <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w, ${base}-1600.webp 1600w`} sizes={sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${base}-1200.webp`} alt={alt} width={1200} height={675} loading="lazy" decoding="async" className="block aspect-[3/2] w-full rounded-2xl object-cover" />
      </picture>
    );
  }
  const base = `/images/brands/${slug}/hero`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-828.avif 828w, ${base}-1200.avif 1200w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-828.webp 828w, ${base}-1200.webp 1200w`} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}-828.webp`} alt={alt} width={828} height={552} loading="lazy" decoding="async" className="block aspect-[3/2] w-full rounded-2xl object-cover" />
    </picture>
  );
}

export function BrandHubStory({ slug, brandName: fullName, story, why, whyTitle, sectors = [], applications = [], trustSignals = [], certifications = [], customSections = [], awards = [], unique, children }: Props) {
  const brandName = fullName.replace(/\s*\(.*?\)\s*/g, " ").trim();
  const pills = sectors.length ? sectors : applications.map((a) => a.sector);
  const hasIndex = applications.length > 0 || trustSignals.length > 0 || (unique && unique.items.length > 0);
  return (
    <section className="bg-[#F6F8FA]" aria-labelledby="hub-story-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.618fr] lg:gap-16">
          <SpreadReveal>
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">About {brandName}</p>
            <h2 id="hub-story-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight text-[#161925] max-w-[16ch]">
              Who makes it, and why it comes through Lapiz Blue
            </h2>
            <p className="font-manrope text-[#161925]/80 text-lg leading-relaxed mt-6">{story}</p>
            <blockquote className="mt-8 border-l-4 border-[#F3DFC1] pl-5">
              <p className="label-sh text-[#161925]/60">{whyTitle || `Why Lapiz Blue for ${brandName}`}</p>
              <p className="font-manrope text-[#161925] text-base leading-relaxed mt-2">{why}</p>
            </blockquote>
          </SpreadReveal>

          <SpreadReveal delay={0.1} className="self-start">
            <StoryPhoto slug={slug} alt={`${brandName} material on a UAE project supplied by Lapiz Blue`} />
            {awards.length > 0 && (
              <ul className="mt-5 grid grid-cols-3 gap-3" aria-label={`${brandName} awards to Lapiz Blue`}>
                {awards.map((a) => (
                  <li key={a.year} className="rounded-xl bg-[#161925] p-4 text-white">
                    <span className="block font-outfit font-semibold text-3xl text-[#F3DFC1] tabular-nums leading-none">{a.year}</span>
                    <span className="block font-manrope text-white/80 text-xs sm:text-sm mt-2 leading-snug">{a.title}</span>
                  </li>
                ))}
              </ul>
            )}
            {pills.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Where it is used">
                {pills.map((s) => (
                  <li key={s} className="rounded-full border border-[#161925]/15 bg-white px-3.5 py-1.5 font-manrope text-sm text-[#161925]">{s.replace(/\n/g, " ")}</li>
                ))}
              </ul>
            )}
          </SpreadReveal>
        </div>

        {hasIndex && (
          <SpreadReveal delay={0.15} className="mt-14 lg:mt-20 border-t border-[#161925]/15 pt-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
              {applications.length > 0 && (
                <div className={unique || trustSignals.length ? "" : "lg:col-span-3"}>
                  <p className="label-sh text-[#161925]/60">Applications</p>
                  <dl className={`mt-4 ${unique || trustSignals.length ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4"}`}>
                    {applications.map((a) => (
                      <div key={a.sector}>
                        <dt className="font-outfit font-semibold text-base text-[#161925]">{a.sector}</dt>
                        <dd className="font-manrope text-[#161925]/70 text-sm leading-relaxed mt-0.5">{a.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {unique && unique.items.length > 0 && (
                <div>
                  <p className="label-sh text-[#161925]/60">{unique.title}</p>
                  <ol className="mt-4 space-y-4">
                    {unique.items.map((it, i) => (
                      <li key={it.title} className="grid grid-cols-[auto_1fr] gap-x-4">
                        <span className="font-outfit font-semibold text-xl text-[#406E8E] tabular-nums leading-none pt-0.5">0{i + 1}</span>
                        <div>
                          <p className="font-outfit font-semibold text-base text-[#161925]">{it.title}</p>
                          <p className="font-manrope text-[#161925]/70 text-sm leading-relaxed mt-0.5">{it.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {trustSignals.length > 0 && (
                <div>
                  <p className="label-sh text-[#161925]/60">What you get from Lapiz Blue</p>
                  <ul className="mt-4 space-y-4">
                    {trustSignals.map((t) => (
                      <li key={t.title}>
                        <p className="font-outfit font-semibold text-base text-[#161925]">{t.title}</p>
                        <p className="font-manrope text-[#161925]/70 text-sm leading-relaxed mt-0.5">{t.description}</p>
                      </li>
                    ))}
                  </ul>
                  {certifications.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Certifications">
                      {certifications.map((c) => (
                        <li key={c} className="rounded-full bg-[#161925] px-3 py-1 font-manrope text-xs font-semibold text-white">{c}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </SpreadReveal>
        )}

        {customSections.length > 0 && (
          <div className="mt-10 divide-y divide-[#161925]/10 border-y border-[#161925]/10">
            {customSections.map((cs) => (
              <details key={cs.id} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-outfit font-semibold text-lg text-[#161925] [&::-webkit-details-marker]:hidden">
                  {cs.title}
                  <span className="shrink-0 font-manrope text-xs uppercase tracking-widest text-[#406E8E] group-open:hidden">Read</span>
                  <span className="hidden shrink-0 font-manrope text-xs uppercase tracking-widest text-[#406E8E] group-open:inline">Close</span>
                </summary>
                <p className="font-manrope text-[#161925]/75 text-base leading-relaxed mt-3 max-w-[70ch]">{cs.content}</p>
              </details>
            ))}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

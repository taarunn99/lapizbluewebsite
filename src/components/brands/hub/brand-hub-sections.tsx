import Link from "next/link";
import type { BrandHubCopy, BrandHubFigure } from "@/data/brand-hub/types";
import { BRANCHES } from "@/lib/org-schema";
import { getShippable } from "@/lib/tds";
import { BRAND_SCENE, getScene } from "@/data/scenes";
import SceneFrame, { hasPoster } from "@/components/three/scene-frame";
import hubImages from "@/data/hub-images.json";
import { SpreadRule } from "@/components/magazine/spread-reveal.client";
import { FigureRibbon, LiftIn, ParallaxFrame, WordReveal } from "./hub-motion.client";
import { HubQuestionsScroll } from "./hub-questions-scroll.client";
import { BorderBeam } from "./hub-border-beam.client";

type HubImageIndex = Record<string, { mood?: { widths: number[] }; site?: { widths: number[] } }>;
const IMAGES = hubImages as HubImageIndex;

/** A responsive picture from the generated brand set, or nothing if the brand has none. */
function HubPicture({ slug, kind, alt, className = "", sizes = "(max-width: 1024px) 100vw, 50vw", eager = false }: { slug: string; kind: "mood" | "site"; alt: string; className?: string; sizes?: string; eager?: boolean }) {
  const set = IMAGES[slug]?.[kind];
  if (!set) return null;
  const base = `/images/brands/${slug}/hub-${kind}`;
  const srcSet = (ext: string) => set.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const largest = Math.max(...set.widths);
  const h = kind === "mood" ? Math.round(largest * 2 / 3) : Math.round(largest * 9 / 16);
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}-${largest}.webp`} alt={alt} width={largest} height={h} loading={eager ? "eager" : "lazy"} decoding="async" className={className} />
    </picture>
  );
}

/** Where the signage sits in each branch photograph, so the 3:2 crop keeps the building, not the sky. */
const BRANCH_FOCUS: Record<string, string> = { dubai: "center 82%", "abu-dhabi": "center 35%", sharjah: "center 22%" };

const BRANCH_PHOTO: Record<string, string> = {
  dubai: "/images/brands/dubai-lapizblue.webp",
  "abu-dhabi": "/images/brands/abudhabi-lapizblue.webp",
  sharjah: "/images/locations/sharjah-lapizblue.webp",
};

/**
 * The sections that make a brand page rank for "brand distributor" and
 * "brand near me", lifted from the pattern the five supplier hub pages use.
 *
 * All server rendered, all additive: each page keeps every section and link
 * it had and gains these. Nothing here animates on first paint.
 */

/** "Weber (Saint-Gobain)" is the legal form; headings use the short name. */
const shortName = (n: string) => n.replace(/\s*\(.*?\)\s*/g, " ").trim();

interface Props {
  copy: BrandHubCopy;
  brandName: string;
  /** Contrast safe brand colour for small accents. Defaults to the house blue. */
  accent?: string;
}

const eyebrow = "font-manrope text-[#406E8E] text-sm uppercase tracking-widest";
const h2 = "font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight text-[#161925]";
const body = "font-manrope text-[#161925]/80 text-lg leading-relaxed";
const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12";

/** Figures from the manifest for brands with sheets, else the copy's own. */
export function hubFigures(copy: BrandHubCopy): BrandHubFigure[] {
  if (copy.figures && copy.figures.length > 0) return copy.figures;
  const recs = getShippable(copy.slug);
  const sheets = recs.filter((r) => r.tds.status === "verified").length;
  const lines = new Set(recs.map((r) => r.product_line)).size;
  return [
    { value: String(recs.length), label: "product pages" },
    { value: String(sheets), label: "data sheets to download" },
    { value: String(lines), label: lines === 1 ? "product line" : "product lines" },
    { value: "3", label: "branches in the UAE" },
  ];
}

/**
 * The liftable answer, directly under the hero, as a magazine opener: the
 * heading arrives a word at a time, the passage lifts without ever fading (it
 * is the answer a search engine reads), the figures sit in one ribbon, and the
 * photograph is a tall editorial frame drifting a few percent with the scroll.
 */
export function BrandHubAnswer({ copy, brandName: fullName }: Props) {
  const brandName = shortName(fullName);
  const figures = hubFigures(copy);
  const hasPhoto = Boolean(IMAGES[copy.slug]?.mood);
  return (
    <section className="bg-white" aria-labelledby="hub-answer-heading">
      <div className={`${wrap} pt-14 lg:pt-20 pb-14 lg:pb-20`}>
        <div className={`grid grid-cols-1 gap-10 lg:gap-16 ${hasPhoto ? "lg:grid-cols-[1.618fr_1fr]" : ""}`}>
          <div className="flex flex-col">
            <p className={eyebrow}>{copy.eyebrow}</p>
            <WordReveal id="hub-answer-heading" text={copy.heading} className={`${h2} max-w-[20ch]`} />
            {/* The passage a search engine can lift whole. Transform only: it is never hidden. */}
            <LiftIn className="mt-6 space-y-5 max-w-[66ch]">
              {copy.answer.map((p, i) => (
                <p key={i} className={body}>
                  {p}
                </p>
              ))}
            </LiftIn>
            <LiftIn delay={0.1} className="mt-10 lg:mt-auto lg:pt-12">
              <FigureRibbon figures={figures} />
            </LiftIn>
          </div>
          {hasPhoto && (
            <figure className="flex flex-col self-start lg:self-stretch">
              <ParallaxFrame head={brandName} className="aspect-[3/2] w-full lg:aspect-[4/5] lg:flex-1">
                <HubPicture slug={copy.slug} kind="mood" alt={`${brandName} material on a UAE site, as Lapiz Blue supplies it`} className="block h-full w-full object-cover" />
              </ParallaxFrame>
              <figcaption className="spec-sh mt-3 shrink-0 text-[#161925]/60">{brandName} on site. Delivered next working day across Dubai, Abu Dhabi and Sharjah.</figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

/** Where to buy: the three branches, crawlable, with the near me sentence per emirate. */
export function BrandHubWhereToBuy({ copy, brandName: fullName }: Props) {
  const brandName = shortName(fullName);
  const near: Record<string, string> = {
    dubai: copy.whereToBuy.dubai,
    "abu-dhabi": copy.whereToBuy.abuDhabi,
    sharjah: copy.whereToBuy.sharjah,
  };
  return (
    <section className="bg-[#F6F8FA]" aria-labelledby="hub-where-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <p className={eyebrow}>Where to buy</p>
        <h2 id="hub-where-heading" className={`${h2} max-w-[22ch]`}>
          Where to buy {brandName} in Dubai, Abu Dhabi and Sharjah
        </h2>
        <p className={`${body} mt-5 max-w-[62ch]`}>{copy.whereToBuy.intro}</p>
        <SpreadRule className="mt-8" />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BRANCHES.map((b) => (
            <article key={b.key} className="overflow-hidden rounded-2xl border border-[#161925]/10 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BRANCH_PHOTO[b.key]} alt={`Lapiz Blue ${b.emirate} branch, ${b.area}`} width={1200} height={800} loading="lazy" decoding="async" className="block aspect-[3/2] w-full object-cover" style={{ objectPosition: BRANCH_FOCUS[b.key] }} />
              <div className="p-6 sm:p-7">
              <h3 className="font-outfit font-semibold text-2xl leading-tight text-[#161925]">
                {brandName} in {b.emirate}
              </h3>
              <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-3">{near[b.key]}</p>
              <address className="not-italic font-manrope text-[#161925] text-base mt-5 space-y-1">
                <div>{b.address}</div>
                <div>
                  <a href={b.phoneHref} className="text-[#406E8E] underline underline-offset-4">
                    {b.phone}
                  </a>
                </div>
                <div>
                  <a href={b.map} target="_blank" rel="noopener" className="text-[#406E8E] underline underline-offset-4">
                    Open the {b.emirate} branch in Google Maps
                  </a>
                </div>
              </address>
              </div>
            </article>
          ))}
        </div>
        <p className="font-manrope text-[#161925]/70 text-sm mt-8">
          Open Monday to Saturday, 8 am to 6 pm. Orders placed before 3 pm are delivered the next working day.
        </p>
      </div>
    </section>
  );
}

/** Four buyer questions as H2s under the dusk photograph, pinned intro beside them, each arriving as the reader reaches it. */
export function BrandHubQuestions({ copy, brandName: fullName }: Props) {
  const brandName = shortName(fullName);
  const hasSite = Boolean(IMAGES[copy.slug]?.site);
  return (
    <section className="bg-[#161925] text-white" aria-labelledby="hub-questions-heading">
      {hasSite && (
        <div className="relative">
          <HubPicture slug={copy.slug} kind="site" alt={`A finished luxury interior in the UAE, the kind of project ${brandName} material from Lapiz Blue goes into`} sizes="100vw" className="block h-[52vh] min-h-[320px] max-h-[640px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161925] via-[#161925]/40 to-transparent" aria-hidden="true" />
          <div className={`${wrap} absolute inset-x-0 bottom-0 pb-10 lg:pb-14`}>
            <p className="font-manrope text-[#BFD7EA] text-sm uppercase tracking-widest">Before you order</p>
            <p id="hub-questions-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-6xl mt-2 leading-[1.02] max-w-[16ch]">
              What buyers ask us about {brandName}
            </p>
          </div>
        </div>
      )}
      <div className={`${wrap} py-14 lg:py-20`}>
        {!hasSite && (
          <div className="mb-10">
            <p className="font-manrope text-[#BFD7EA] text-sm uppercase tracking-widest">Before you order</p>
            <p id="hub-questions-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
              What buyers ask us about {brandName}
            </p>
          </div>
        )}
        <HubQuestionsScroll
          questions={copy.questions}
          intro="The four questions that come in most on WhatsApp, answered the way we answer them on the counter, with the pages to check."
          hours="Monday to Saturday, 8 am to 6 pm. Next working day to site for orders before 3 pm."
        />
      </div>
    </section>
  );
}

/** The appointment letter as a letter on a desk: a navy card with a cream light running round its edge. */
export function BrandHubCredential({ copy }: Props) {
  const c = copy.credential;
  if (!c) return null;
  return (
    <section className="bg-white" aria-labelledby="hub-credential-heading">
      <div className={`${wrap} py-12 lg:py-16`}>
        <div className="group relative overflow-hidden rounded-3xl bg-[#161925] text-white ring-1 ring-inset ring-white/10 p-7 sm:p-10 lg:p-12">
          <BorderBeam radius={24} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#406E8E]/25 blur-3xl transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
            {/* The letter itself, lifting off the desk under the pointer. */}
            <div aria-hidden="true" className="relative h-[108px] w-[84px] shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:-rotate-2">
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-sm bg-[#406E8E]/30 blur-sm transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-4" />
              <svg viewBox="0 0 84 108" className="relative h-full w-full" fill="none">
                <path d="M2 2h58l22 22v82H2z" fill="#F6F8FA" />
                <path d="M60 2v22h22" fill="#BFD7EA" />
                <path d="M60 2v22h22" stroke="#161925" strokeOpacity="0.25" />
                <rect x="14" y="38" width="46" height="2.5" rx="1" fill="#161925" fillOpacity="0.75" />
                <rect x="14" y="48" width="56" height="2" rx="1" fill="#161925" fillOpacity="0.35" />
                <rect x="14" y="56" width="52" height="2" rx="1" fill="#161925" fillOpacity="0.35" />
                <rect x="14" y="64" width="44" height="2" rx="1" fill="#161925" fillOpacity="0.35" />
                <rect x="14" y="72" width="54" height="2" rx="1" fill="#161925" fillOpacity="0.35" />
                <circle cx="62" cy="88" r="9" fill="#406E8E" />
                <circle cx="62" cy="88" r="5.5" stroke="#F3DFC1" strokeWidth="1.2" />
                <rect x="14" y="90" width="26" height="2" rx="1" fill="#161925" fillOpacity="0.5" />
              </svg>
            </div>
            <div>
              <p className="label-sh text-[#BFD7EA]">Credential</p>
              <h2 id="hub-credential-heading" className="font-outfit font-semibold text-2xl sm:text-3xl lg:text-4xl mt-3 leading-tight text-white max-w-[24ch]">
                {c.title}
              </h2>
              <p className="font-manrope text-white/75 text-base leading-relaxed mt-4 max-w-[60ch]">{c.detail}</p>
            </div>
            <a
              href={c.file}
              target="_blank"
              rel="noopener"
              className="group/pdf inline-flex min-h-[2.75rem] items-center justify-center gap-3 self-start rounded-full bg-[#F3DFC1] pl-6 pr-5 font-manrope text-sm font-semibold text-[#161925] transition-colors duration-300 hover:bg-white whitespace-nowrap lg:self-center"
            >
              Open the letter (PDF)
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover/pdf:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>
        <p className="mt-5 font-manrope text-sm text-[#161925]/70">
          Every appointment letter, the trade licence and the TRN certificate are together on the{" "}
          <Link href="/credentials" className="text-[#406E8E] underline underline-offset-4">
            credentials page
          </Link>
          , with a vendor registration pack to download.
        </p>
      </div>
    </section>
  );
}

/**
 * The system in 3D: what goes under the tile, the membrane, the coating.
 * Poster first; the live model loads when the section scrolls into view.
 * Renders nothing until the scene has a poster on disk, so every brand page
 * gets it on the same day or none does.
 */
export function BrandSystemExplainer({ copy, brandName: fullName }: Props) {
  const brandName = shortName(fullName);
  const slug = BRAND_SCENE[copy.slug];
  const scene = slug ? getScene(slug) : undefined;
  if (!slug || !scene || !hasPoster(slug)) return null;
  return (
    <section id="system" className="bg-white scroll-mt-[75px]" aria-labelledby="hub-system-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className={eyebrow}>The system, layer by layer</p>
            <h2 id="hub-system-heading" className={`${h2} max-w-[18ch]`}>
              {scene.title}
            </h2>
            <p className={`${body} mt-5 max-w-[52ch]`}>{scene.intro}</p>
            <ol className="mt-8 divide-y divide-[#161925]/10 border-y border-[#161925]/10">
              {[...scene.layers].reverse().map((l) => (
                <li key={l.name} className="grid grid-cols-[1fr_auto] gap-4 py-3">
                  <span>
                    <span className="block font-manrope text-sm font-semibold text-[#161925]">{l.name}</span>
                    {l.product ? <span className="block font-manrope text-sm text-[#406E8E]">{l.product}</span> : null}
                  </span>
                  <span className="spec-sh text-[#161925]/70">{l.mm < 1 ? `${l.mm * 1000} µm` : `${l.mm} mm`}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-manrope text-sm text-[#161925]/60">
              Thicknesses are nominal, for {brandName} systems as specified in the UAE. The data sheet governs.
            </p>
          </div>
          <SceneFrame scene={slug} autoload sizes="(max-width: 1024px) 100vw, 840px" />
        </div>
      </div>
    </section>
  );
}

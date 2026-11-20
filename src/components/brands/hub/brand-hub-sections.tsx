import Link from "next/link";
import type { BrandHubCopy, BrandHubFigure } from "@/data/brand-hub/types";
import { BRANCHES } from "@/lib/org-schema";
import { getShippable } from "@/lib/tds";
import { BRAND_SCENE, getScene } from "@/data/scenes";
import SceneFrame, { hasPoster } from "@/components/three/scene-frame";

/**
 * The sections that make a brand page rank for "brand distributor" and
 * "brand near me", lifted from the pattern the five supplier hub pages use.
 *
 * All server rendered, all additive: each page keeps every section and link
 * it had and gains these. Nothing here animates on first paint.
 */

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

/** The liftable answer, directly under the hero. */
export function BrandHubAnswer({ copy }: Props) {
  const figures = hubFigures(copy);
  return (
    <section className="bg-white" aria-labelledby="hub-answer-heading">
      <div className={`${wrap} pt-14 lg:pt-20 pb-12 lg:pb-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16">
          <div>
            <p className={eyebrow}>{copy.eyebrow}</p>
            <h2 id="hub-answer-heading" className={`${h2} max-w-[20ch]`}>
              {copy.heading}
            </h2>
            {/* The passage a search engine can lift whole. */}
            <div className="mt-6 space-y-5 max-w-[66ch]">
              {copy.answer.map((p, i) => (
                <p key={i} className={body}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-end border-t border-[#161925]/10 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            {figures.map((f) => (
              <div key={f.label}>
                <dd className="font-outfit font-semibold text-4xl sm:text-5xl text-[#161925] tabular-nums leading-none">
                  {f.value}
                </dd>
                <dt className="font-manrope text-[#161925]/70 text-sm mt-2">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Where to buy: the three branches, crawlable, with the near me sentence per emirate. */
export function BrandHubWhereToBuy({ copy, brandName }: Props) {
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
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BRANCHES.map((b) => (
            <article key={b.key} className="rounded-2xl border border-[#161925]/10 bg-white p-6 sm:p-7">
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

/** Four buyer questions as H2s, each answered in one paragraph with links down into the catalogue. */
export function BrandHubQuestions({ copy, brandName }: Props) {
  return (
    <section className="bg-[#161925] text-white" aria-labelledby="hub-questions-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16">
          <div>
            <p className="font-manrope text-[#BFD7EA] text-sm uppercase tracking-widest">Before you order</p>
            <p id="hub-questions-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
              What buyers ask us about {brandName}
            </p>
            <p className="font-manrope text-white/75 text-lg mt-5 max-w-[46ch]">
              The four questions that come in most on WhatsApp, answered the way we answer them on the counter.
            </p>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {copy.questions.map((q, i) => (
              <li key={q.h2} className="grid grid-cols-[auto_1fr] gap-x-6 py-7">
                <span className="font-outfit font-semibold text-3xl sm:text-4xl text-[#F3DFC1] tabular-nums leading-none pt-1">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="font-outfit font-semibold text-xl sm:text-2xl leading-snug">{q.h2}</h2>
                  <p className="font-manrope text-white/80 text-base leading-relaxed mt-3">{q.body}</p>
                  {q.links.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {q.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="font-manrope text-sm font-semibold text-[#BFD7EA] underline underline-offset-4 hover:text-white">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** The appointment letter as a card, only where the page does not already show one. */
export function BrandHubCredential({ copy }: Props) {
  const c = copy.credential;
  if (!c) return null;
  return (
    <section className="bg-white" aria-labelledby="hub-credential-heading">
      <div className={`${wrap} py-12 lg:py-16`}>
        <div className="rounded-2xl border border-[#161925]/10 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className={eyebrow}>Credential</p>
            <h2 id="hub-credential-heading" className="font-outfit font-semibold text-2xl sm:text-3xl mt-2 text-[#161925]">
              {c.title}
            </h2>
            <p className={`${body} mt-3 max-w-[60ch] text-base`}>{c.detail}</p>
          </div>
          <a
            href={c.file}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[#161925] px-7 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
          >
            Open the letter (PDF)
          </a>
        </div>
        <p className="mt-4 font-manrope text-sm text-[#161925]/70">
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
export function BrandSystemExplainer({ copy, brandName }: Props) {
  const slug = BRAND_SCENE[copy.slug];
  const scene = slug ? getScene(slug) : undefined;
  if (!slug || !scene || !hasPoster(slug)) return null;
  return (
    <section className="bg-white" aria-labelledby="hub-system-heading">
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

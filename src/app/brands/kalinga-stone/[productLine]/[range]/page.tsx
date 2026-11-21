import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KalingaQuoteSection } from "@/components/brands/kalinga-stone/kalinga-sections";
import { Reveal, Rule } from "@/components/brands/kalinga-stone/gcb/gcb-motion.client";
import { SITE, breadcrumbNode, graph, jsonLd, organizationNode, webPageNode } from "@/lib/org-schema";
import {
  BRAND_SLUG,
  MATERIAL_WORD,
  QUOTE_PRODUCT,
  allRangeParams,
  getRange,
  getShade,
  lineHref,
  photoSrcSet,
  rangeHref,
  sampleSrcSet,
  shadeHref,
  shadesOf,
  swatchSrcSet,
  type Range,
} from "@/components/brands/kalinga-stone/gcb/catalogue";
import {
  ClosingBar,
  GcbBreadcrumb,
  GlobalClassicBand,
  LineSwitcher,
  RangeCards,
  ShadeGrid,
  SwatchPicture,
  WhatsAppButton,
  buttonDark,
  buttonOutline,
  eyebrowLight,
  h2Light,
  muted,
  serif,
  wrap,
} from "@/components/brands/kalinga-stone/gcb/catalogue-ui";

/**
 * One page per KalingaStone colour range or terrazzo collection, plus the
 * fluting programme: the range intro from gcbuae.com, every shade in the range
 * as a swatch card linking to its own page, the sibling ranges, the Global
 * Classic stock partner band and the quote form. Set in the same gcbuae.com
 * family as the line page above it.
 */

const LINE_NAMES: Record<string, string> = { "engineered-quartz": "Engineered Quartz", "engineered-marble": "Engineered Marble", terrazzo: "Terrazzo" };

export const dynamicParams = false;

export async function generateStaticParams() {
  return allRangeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ productLine: string; range: string }> }): Promise<Metadata> {
  const { productLine, range } = await params;
  const hit = getRange(productLine, range);
  if (!hit) return { title: "Range not found - Lapiz Blue" };
  const url = `${SITE}${rangeHref(productLine, range)}`;
  const first = shadesOf(hit.range)[0];
  const image = first ? `${SITE}${swatchSrcSet(first).fallback}` : undefined;
  return {
    title: hit.range.title,
    description: hit.range.description,
    alternates: { canonical: url },
    openGraph: { title: hit.range.title, description: hit.range.description, url, siteName: "Lapiz Blue", type: "website", ...(image ? { images: [image] } : {}) },
    twitter: { card: "summary_large_image", title: hit.range.title, description: hit.range.description, ...(image ? { images: [image] } : {}) },
  };
}

function FlutingSamples({ range }: { range: Range }) {
  const samples = range.samples ?? [];
  return (
    <section className="bg-[#F7F8F5]" aria-labelledby="fluting-samples-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <Reveal>
          <p className={eyebrowLight}>{range.samplesHeading?.[0] ?? "The catalogued samples"}</p>
          <h2 id="fluting-samples-heading" className={`${h2Light} max-w-[22ch]`}>{range.samplesHeading?.[1] ?? "Nine flutes, one technology."}</h2>
          <Rule className="mt-6 max-w-[560px]" />
          <p className={`mt-6 max-w-[64ch] text-sm leading-relaxed ${muted}`}>Groove pitch and aggregate scale vary sample to sample; Ceppo alone is catalogued in three flute variants. Where the base shade is part of the 24 shade range, the card links to it.</p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          {samples.map((smp, i) => {
            const base = smp.base ? getShade(smp.base) : undefined;
            const src = sampleSrcSet(smp.image);
            const card = (
              <>
                <div className="overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]/30" style={{ aspectRatio: "3 / 2" }}>
                  <picture>
                    <source type="image/avif" srcSet={src.avif} sizes="(max-width: 640px) 50vw, 33vw" />
                    <source type="image/webp" srcSet={src.webp} sizes="(max-width: 640px) 50vw, 33vw" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src.fallback} alt={smp.alt} width={960} height={640} loading="lazy" decoding="async" className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </picture>
                </div>
                <h3 className={`${serif} mt-3 text-xl leading-none text-[#0C1510]`}>{smp.name}</h3>
                <p className="mt-1.5 spec-sh text-[#0C1510]/60">{base ? `Base shade: ${base.name}, ${base.series}` : smp.note ?? "Fluting programme"}</p>
              </>
            );
            return (
              <li key={smp.name} className="list-none min-w-0">
                <Reveal delay={(i % 3) * 0.06}>{base ? <Link href={shadeHref(base)} className="group block">{card}</Link> : <div>{card}</div>}</Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default async function KalingaRangePage({ params }: { params: Promise<{ productLine: string; range: string }> }) {
  const { productLine, range: rangeSlug } = await params;
  const hit = getRange(productLine, rangeSlug);
  if (!hit) notFound();
  const { material, entry, range } = hit;
  const shades = shadesOf(range);
  const url = `${SITE}${rangeHref(productLine, rangeSlug)}`;
  const materialWord = MATERIAL_WORD[material];
  const isFluting = range.kind === "fluting";
  const lineName = LINE_NAMES[productLine] ?? entry.name;
  const hero = shades.slice(0, 4);
  const microbanCount = shades.filter((s) => s.microban).length;
  const formats = [...new Set(shades.map((s) => s.format))];
  const seriesList = [...new Set(shades.map((s) => s.series))];

  const breadcrumbId = `${url}#breadcrumb`;
  const schema = graph([
    breadcrumbNode(breadcrumbId, [
      { name: "Home", item: SITE },
      { name: "Brands", item: `${SITE}/brands` },
      { name: "Kalinga Stone", item: `${SITE}/brands/${BRAND_SLUG}` },
      { name: lineName, item: `${SITE}${lineHref(productLine)}` },
      { name: range.name, item: url },
    ]),
    { ...webPageNode({ url, name: range.title, description: range.description, image: hero[0] ? `${SITE}${swatchSrcSet(hero[0]).fallback}` : undefined, breadcrumbId }), "@type": ["WebPage", "CollectionPage"] },
    {
      "@type": "ItemList",
      "@id": `${url}#shades`,
      name: `${range.name} KalingaStone ${entry.label} shades`,
      numberOfItems: shades.length,
      itemListElement: shades.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: `KalingaStone ${materialWord} ${s.name}`, url: `${SITE}${shadeHref(s)}` })),
    },
    organizationNode({ brand: { name: "KalingaStone", url: "https://www.kalingastone.com" } }),
  ]);

  const quoteNote = isFluting ? "Fluted terrazzo panels" : `Range: ${range.name}`;

  return (
    <main className="font-manrope bg-[#F7F8F5] text-[#0C1510]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />

      <GcbBreadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Brands", href: "/brands" },
          { name: "Kalinga Stone", href: `/brands/${BRAND_SLUG}` },
          { name: lineName, href: lineHref(productLine) },
          { name: range.name },
        ]}
      />

      {/* Hero: no opening animation */}
      <header className={`${wrap} pb-12 pt-8 lg:pb-16 lg:pt-12`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.618fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <p className={eyebrowLight}>
              KalingaStone {entry.label}, {isFluting ? "the fluting programme" : entry.rangeWord}
            </p>
            <h1 className={`${serif} mt-4 text-[2.5rem] leading-[1.05] tracking-[-0.025em] text-[#0C1510] sm:text-[3.25rem] lg:text-[3.75rem] max-w-[18ch]`}>{range.h1}</h1>
            {range.intro.map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-7" : "mt-4"} max-w-[62ch] text-base leading-relaxed ${muted} sm:text-[1.0625rem]`}>
                {p}
              </p>
            ))}
            {range.sub.length > 0 && (
              <dl className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {range.sub.map((s) => (
                  <div key={s.name} className="border-l border-[#355E4D]/40 pl-4">
                    <dt className={`${serif} text-2xl text-[#0C1510]`}>{s.name}</dt>
                    <dd className={`mt-1 text-sm leading-relaxed ${muted}`}>{s.body}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-[#0C1510]/80">
              {isFluting ? `${range.samples?.length ?? 0} catalogued samples` : `${shades.length} shades in this ${entry.rangeWord}`}
              {" "}
              <span aria-hidden="true">&middot;</span>{" "}
              <Link href={lineHref(productLine)} className="font-medium text-[#355E4D] underline underline-offset-4">
                all {entry.count} KalingaStone {entry.label} shades
              </Link>
              . Slabs are held by our sister company Global Classic Building Materials at Al Sajaa, Sharjah; Lapiz Blue quotes, reserves and delivers from Dubai, Abu Dhabi and Sharjah.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#kalinga-quote" className={buttonDark}>Request availability</a>
              <Link href={lineHref(productLine)} className={buttonOutline}>All {entry.label} shades</Link>
            </div>
          </div>
          {isFluting && range.feature ? (
            <div className="overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]" style={{ aspectRatio: "4 / 5" }}>
              <picture>
                <source type="image/avif" srcSet={photoSrcSet(range.feature.image).avif} sizes="(max-width: 1024px) 100vw, 38vw" />
                <source type="image/webp" srcSet={photoSrcSet(range.feature.image).webp} sizes="(max-width: 1024px) 100vw, 38vw" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoSrcSet(range.feature.image).fallback} alt={range.feature.alt} width={1200} height={1500} fetchPriority="high" decoding="async" className="block h-full w-full object-cover" />
              </picture>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3" aria-label={`Four ${range.name} shades`}>
              {hero.map((s, i) => (
                <li key={s.slug} className="list-none min-w-0">
                  <Link href={shadeHref(s)} className="group block">
                    <div className="overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]/30" style={{ aspectRatio: "1 / 1" }}>
                      <SwatchPicture shade={s} sizes="(max-width: 1024px) 50vw, 19vw" priority={i < 2} />
                    </div>
                    <p className={`${serif} mt-2 text-lg leading-none text-[#0C1510] group-hover:text-[#355E4D]`}>{s.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stat strip */}
        <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]/40 lg:mt-16 lg:grid-cols-4">
          {(
            [
              [isFluting ? String(range.samples?.length ?? 0) : String(shades.length), isFluting ? "catalogued fluted samples" : `shades in the ${range.name} ${entry.rangeWord}`],
              [formats.length === 1 ? formats[0].replace(/ x 20 mm$/, "") : String(formats.length), formats.length === 1 ? (material === "quartz" ? "mm, 20 mm thick, one format" : "one slab format, every shade") : "slab formats in this range"],
              [String(seriesList.length), seriesList.length === 1 ? `tier, ${seriesList[0]}` : `series tiers, ${seriesList[seriesList.length - 1]} to ${seriesList[0]}`],
              [material === "terrazzo" ? "A1" : microbanCount > 0 ? String(microbanCount) : "20 mm", material === "terrazzo" ? "fire class to EN 13501-1" : microbanCount > 0 ? `shades with Microban${material === "marble" ? " as an option" : ""}` : "one thickness, every shade"],
            ] as [string, string][]
          ).map(([value, label], i) => (
            <div key={label} className={`px-5 py-6 sm:px-7 ${i % 2 === 1 ? "border-l border-[#D2D4C8]" : ""} ${i >= 2 ? "border-t border-[#D2D4C8] lg:border-t-0 lg:border-l" : ""}`}>
              <dt className="sr-only">{label}</dt>
              <dd className={`${serif} text-[2rem] leading-none text-[#0C1510] sm:text-[2.5rem] tabular-nums`}>{value}</dd>
              <dd className={`mt-2 text-xs ${muted}`}>{label}</dd>
            </div>
          ))}
        </dl>

        <LineSwitcher current={productLine} />
      </header>

      {isFluting && <FlutingSamples range={range} />}

      {/* Every shade in the range */}
      <section className={`bg-[#F7F8F5] ${isFluting ? "border-t border-[#0C1510]/12" : ""}`} aria-labelledby="shades-heading">
        <div className={`${wrap} py-16 lg:py-24`}>
          <Reveal>
            <p className={eyebrowLight}>{isFluting ? "Base shades" : "Every shade, with its own page"}</p>
            <h2 id="shades-heading" className={`${h2Light} max-w-[22ch]`}>
              {isFluting ? `The ${shades.length} stocked shades the flutes are cut from.` : `${shades.length} ${range.name} shades, stocked at Al Sajaa.`}
            </h2>
            <Rule className="mt-6 max-w-[560px]" />
            <p className={`mt-6 max-w-[64ch] text-sm leading-relaxed ${muted}`}>
              {isFluting
                ? "Fluting is machined into slabs from the standard terrazzo range, so colour, format and the A1 fire class are those of the base shade. Tap a shade for its full specification."
                : `Tap a shade for its specification, applications, finishes and the quote form preset to it. Series is the design tier: ${seriesList.length === 1 ? `every shade here is ${seriesList[0]}` : `this range runs from ${seriesList[seriesList.length - 1]} to ${seriesList[0]}`}.`}
            </p>
          </Reveal>
          <ShadeGrid shades={shades} className="mt-10" />

          {/* Compare */}
          {!isFluting && (
            <Reveal className="mt-14 rounded-xl border border-[#D2D4C8] bg-white p-6 sm:p-8">
              <p className={eyebrowLight}>Compare</p>
              <p className={`${serif} mt-3 text-2xl leading-tight text-[#0C1510]`}>How to compare {range.name.toLowerCase()} shades like for like.</p>
              <p className={`mt-3 max-w-[70ch] text-sm leading-relaxed ${muted}`}>
                {material === "quartz"
                  ? `Every shade here is 20 mm thick; ${formats.length === 1 ? `all ${shades.length} come as ${formats[0]} slabs` : `the slab format is ${formats.join(" or ")}`}, so compare slab counts, not just square metres. The series number sets the design tier and the price band: compare within a series for like for like pricing, and across series when the veining matters more than the budget.`
                  : material === "marble"
                    ? `Every shade is the same 304 x 125 cm slab, polished past 85 percent gloss and repolishable in situ, so the comparison is colour, veining and series. The series number sets the design tier and the price band; Microban is an option on ${microbanCount} of these ${shades.length}.`
                    : `Every shade is the same 304 x 125 cm slab with the A1 fire class, supplied as tiles, full slabs or cut to size, so the comparison is chip scale, colour and the collection's pattern language. ${microbanCount > 0 ? `${microbanCount} of these ${shades.length} carry Microban protection.` : "Ask for samples of two or three side by side."}`}{" "}
                Samples of any stocked shade are free for trade; ask for two or three on the form and view the full slabs at Al Sajaa before the finishes schedule is fixed.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Fluting: where it works, with the installed photograph */}
      {isFluting && range.where && range.where.length > 0 && (
        <section className="bg-[#0C1510] text-[#F7F8F5]" aria-labelledby="where-heading">
          <div className={`${wrap} grid grid-cols-1 gap-10 py-16 lg:grid-cols-[1fr_1.618fr] lg:gap-16 lg:py-24`}>
            <Reveal>
              <p className="label-sh text-[#6F8F78]">Where it works</p>
              <h2 id="where-heading" className={`${serif} mt-3 text-[2rem] leading-[1.1] text-[#F7F8F5] sm:text-[2.25rem] lg:text-[2.75rem] max-w-[18ch]`}>{range.where[0]}</h2>
              <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-[#F7F8F5]/80">{range.where[1]}</p>
              <a href="#kalinga-quote" className="mt-8 inline-flex min-h-[3rem] items-center rounded-full bg-[#F7F8F5] px-7 label-sh text-[#0C1510] transition-opacity hover:opacity-90">Request fluting samples</a>
            </Reveal>
            {range.lifestyle && (
              <Reveal delay={0.1} className="overflow-hidden rounded-xl border border-[#F7F8F5]/15" >
                <picture>
                  <source type="image/avif" srcSet={photoSrcSet(range.lifestyle.image).avif} sizes="(max-width: 1024px) 100vw, 60vw" />
                  <source type="image/webp" srcSet={photoSrcSet(range.lifestyle.image).webp} sizes="(max-width: 1024px) 100vw, 60vw" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoSrcSet(range.lifestyle.image).fallback} alt={range.lifestyle.alt} width={1200} height={800} loading="lazy" decoding="async" className="block h-full w-full object-cover" style={{ aspectRatio: "3 / 2" }} />
                </picture>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* The other ranges of this material */}
      <section className="border-t border-[#0C1510]/12 bg-[#F7F8F5]" aria-labelledby="ranges-heading">
        <div className={`${wrap} py-16 lg:py-24`}>
          <Reveal>
            <p className={eyebrowLight}>By {material === "terrazzo" ? "collection" : "colour"}</p>
            <h2 id="ranges-heading" className={`${h2Light} max-w-[22ch]`}>
              {entry.ranges.length} {material === "terrazzo" ? "collections" : "colour ranges"}, each with its own page.
            </h2>
          </Reveal>
          <div className="mt-8">
            <RangeCards entry={entry} current={range.slug} />
          </div>
          <p className={`mt-6 text-sm ${muted}`}>
            Or browse <Link href={lineHref(productLine)} className="font-medium text-[#355E4D] underline underline-offset-4">all {entry.count} KalingaStone {entry.label} shades</Link> on the {lineName.toLowerCase()} page, or go back to <Link href={`/brands/${BRAND_SLUG}`} className="font-medium text-[#355E4D] underline underline-offset-4">Kalinga Stone at Lapiz Blue</Link>.
          </p>
        </div>
      </section>

      <GlobalClassicBand materialWord={entry.label} />

      <KalingaQuoteSection product={QUOTE_PRODUCT[material]} variant="gcb" note={quoteNote} />

      <ClosingBar title={`Specifying ${range.name} KalingaStone ${entry.label}?`} back={`Back to ${lineName}`} backHref={lineHref(productLine)} />
      <WhatsAppButton label={`WhatsApp Lapiz Blue about ${range.name} KalingaStone ${entry.label}`} />
    </main>
  );
}

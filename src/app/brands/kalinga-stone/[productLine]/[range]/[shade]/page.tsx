import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KalingaQuoteSection } from "@/components/brands/kalinga-stone/kalinga-sections";
import { Reveal, Rule } from "@/components/brands/kalinga-stone/gcb/gcb-motion.client";
import { LEGAL_NAME, ORG_ID, SITE, breadcrumbNode, graph, jsonLd, organizationNode, webPageNode } from "@/lib/org-schema";
import {
  BRAND_SLUG,
  MATERIAL_WORD,
  QUOTE_PRODUCT,
  SCHEMA_MATERIAL,
  allShadeParams,
  getRange,
  getShade,
  getShadeAt,
  lineHref,
  photoSrcSet,
  rangeHref,
  shadeHref,
  shadesOf,
  swatchSrcSet,
} from "@/components/brands/kalinga-stone/gcb/catalogue";
import {
  ClosingBar,
  GcbBreadcrumb,
  GlobalClassicBand,
  Pills,
  ShadeCard,
  SwatchPicture,
  WhatsAppButton,
  buttonDark,
  buttonOutline,
  eyebrowDark,
  eyebrowLight,
  h2Dark,
  h2Light,
  muted,
  serif,
  wrap,
} from "@/components/brands/kalinga-stone/gcb/catalogue-ui";

/**
 * One page per KalingaStone shade, 128 in all: the swatch at full width, the
 * series, format and range, the three paragraphs from gcbuae.com, the
 * applications and finishes as numbered lists, the installed photograph where
 * the catalogue has one, four related shades, previous and next, and the quote
 * form preset to the material with the shade in the notes.
 */

const LINE_NAMES: Record<string, string> = { "engineered-quartz": "Engineered Quartz", "engineered-marble": "Engineered Marble", terrazzo: "Terrazzo" };

export const dynamicParams = false;

export async function generateStaticParams() {
  return allShadeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ productLine: string; range: string; shade: string }> }): Promise<Metadata> {
  const { productLine, range, shade } = await params;
  const s = getShadeAt(productLine, range, shade);
  if (!s) return { title: "Shade not found - Lapiz Blue" };
  const url = `${SITE}${shadeHref(s)}`;
  const image = `${SITE}${swatchSrcSet(s).fallback}`;
  return {
    title: s.title,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: s.title, description: s.metaDescription, url, siteName: "Lapiz Blue", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: s.title, description: s.metaDescription, images: [image] },
  };
}

export default async function KalingaShadePage({ params }: { params: Promise<{ productLine: string; range: string; shade: string }> }) {
  const { productLine, range: rangeSlug, shade: shadeSlug } = await params;
  const s = getShadeAt(productLine, rangeSlug, shadeSlug);
  const hit = getRange(productLine, rangeSlug);
  if (!s || !hit) notFound();
  const { material, entry, range } = hit;
  const materialWord = MATERIAL_WORD[material];
  const lineName = LINE_NAMES[productLine] ?? entry.name;
  const url = `${SITE}${shadeHref(s)}`;
  const swatch = swatchSrcSet(s);

  // Four related shades from the same range, as the catalogue lists them, topped up from the range if short.
  const related = s.related.map((slug) => getShade(slug)).filter((x): x is NonNullable<typeof x> => Boolean(x) && x!.slug !== s.slug);
  for (const x of shadesOf(range)) {
    if (related.length >= 4) break;
    if (x.slug !== s.slug && !related.some((r) => r.slug === x.slug)) related.push(x);
  }
  const prev = s.prev ? getShade(s.prev) : undefined;
  const next = s.next ? getShade(s.next) : undefined;

  const breadcrumbId = `${url}#breadcrumb`;
  const images = [`${SITE}${swatch.fallback}`, ...(s.lifestyle ? [`${SITE}${photoSrcSet(s.lifestyle).fallback}`] : [])];
  const schema = graph([
    breadcrumbNode(breadcrumbId, [
      { name: "Home", item: SITE },
      { name: "Brands", item: `${SITE}/brands` },
      { name: "Kalinga Stone", item: `${SITE}/brands/${BRAND_SLUG}` },
      { name: lineName, item: `${SITE}${lineHref(productLine)}` },
      { name: range.name, item: `${SITE}${rangeHref(productLine, rangeSlug)}` },
      { name: s.name, item: url },
    ]),
    webPageNode({ url, name: s.title, description: s.metaDescription, image: images[0], breadcrumbId }),
    {
      "@type": "Product",
      "@id": `${url}#product`,
      name: `KalingaStone ${materialWord} ${s.name}`,
      brand: { "@type": "Brand", name: "KalingaStone" },
      material: SCHEMA_MATERIAL[material],
      image: images,
      description: s.description[0],
      sku: s.slug,
      size: s.format,
      category: `${range.name} KalingaStone ${entry.label}`,
      url,
      additionalProperty: [
        { "@type": "PropertyValue", name: "Series", value: s.series },
        { "@type": "PropertyValue", name: "Slab format", value: s.format },
        { "@type": "PropertyValue", name: material === "terrazzo" ? "Collection" : "Colour range", value: s.rangeName },
        { "@type": "PropertyValue", name: "Finishes", value: s.finishes.join(", ") },
        ...(s.microban ? [{ "@type": "PropertyValue", name: "Microban antibacterial protection", value: material === "marble" ? "Optional" : "Yes" }] : []),
      ],
      offers: {
        "@type": "Offer",
        url,
        availability: "https://schema.org/InStock",
        priceCurrency: "AED",
        itemCondition: "https://schema.org/NewCondition",
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
        seller: { "@id": ORG_ID, "@type": "Organization", name: LEGAL_NAME },
      },
    },
    organizationNode({ brand: { name: "KalingaStone", url: "https://www.kalingastone.com" } }),
  ]);

  const rangeWord = material === "terrazzo" ? "collection" : "range";

  return (
    <main className="font-manrope bg-[#F7F8F5] text-[#0C1510]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <link rel="preload" as="image" type="image/avif" imageSrcSet={swatch.avif} imageSizes="(max-width: 1400px) 100vw, 1336px" fetchPriority="high" />

      <GcbBreadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Brands", href: "/brands" },
          { name: "Kalinga Stone", href: `/brands/${BRAND_SLUG}` },
          { name: lineName, href: lineHref(productLine) },
          { name: range.name, href: rangeHref(productLine, rangeSlug) },
          { name: s.name },
        ]}
      />

      {/* Hero: name, specification and the swatch at full width. No opening animation. */}
      <header className={`${wrap} pb-12 pt-8 lg:pb-16 lg:pt-12`}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.618fr_1fr] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <p className={eyebrowLight}>
              KalingaStone {entry.label} <span aria-hidden="true">&middot;</span>{" "}
              <Link href={rangeHref(productLine, rangeSlug)} className="underline underline-offset-4 hover:text-[#0C1510]">
                {s.rangeName}
              </Link>
            </p>
            <h1 className={`${serif} mt-4 text-[2.75rem] leading-[1.02] tracking-[-0.025em] text-[#0C1510] sm:text-[3.5rem] lg:text-[4.25rem]`}>{s.name}</h1>
          </div>
          <div className="min-w-0">
            <Pills shade={s} />
            <p className={`mt-4 text-sm leading-relaxed ${muted}`}>
              {s.series}, {s.format}{material === "terrazzo" ? ", tiles, slabs or cut to size" : ""}. Stocked at Al Sajaa, Sharjah, by our sister company; quoted and delivered by Lapiz Blue from Dubai, Abu Dhabi and Sharjah.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]/30 lg:mt-10" style={{ aspectRatio: "3 / 2" }}>
          <SwatchPicture shade={s} sizes="(max-width: 1400px) 100vw, 1336px" priority />
        </div>
        <p className={`mt-3 spec-sh ${muted}`}>{s.swatchAlt}. Slab surface as photographed for the KalingaStone catalogue; view the full slabs and lot at Al Sajaa before confirming.</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#kalinga-quote" className={buttonDark}>Request this shade</a>
          <Link href={rangeHref(productLine, rangeSlug)} className={buttonOutline}>
            All {range.shades.length} {s.rangeName} shades
          </Link>
          <Link href={lineHref(productLine)} className="inline-flex min-h-[3rem] items-center px-2 label-sh text-[#355E4D] underline underline-offset-4">
            Full {entry.count} shade {entry.label} range
          </Link>
        </div>
      </header>

      {/* The description and the specification */}
      <section className="border-t border-[#0C1510]/12 bg-[#F7F8F5]" aria-labelledby="about-heading">
        <div className={`${wrap} grid grid-cols-1 gap-10 py-16 lg:grid-cols-[1.618fr_1fr] lg:gap-16 lg:py-24`}>
          <div>
            <Reveal>
              <p className={eyebrowLight}>The shade</p>
              <h2 id="about-heading" className={`${h2Light} max-w-[22ch]`}>
                {s.name}, in the {s.rangeName.toLowerCase()} {rangeWord}.
              </h2>
              <Rule className="mt-6 max-w-[560px]" />
            </Reveal>
            {s.description.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className={`mt-6 max-w-[66ch] text-base leading-relaxed ${i === 0 ? "text-[#0C1510]/85 sm:text-[1.0625rem]" : muted}`}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-[#0C1510]/12 rounded-xl border border-[#D2D4C8] bg-white px-6">
              {(
                [
                  ["Material", `KalingaStone ${entry.label}`],
                  ["Series", s.series],
                  ["Slab format", s.format],
                  [material === "terrazzo" ? "Collection" : "Colour range", s.rangeName],
                  ["Finishes", s.finishes.join(", ")],
                  ["Supply", material === "terrazzo" ? "Tiles, full slabs or cut to size" : "Full slabs, cutting by the fabricator"],
                  ["Microban", s.microban ? (material === "marble" ? "Available as an option" : "Built in at manufacture") : "Not on this shade"],
                  ["Stock", "Al Sajaa, Sharjah, ex stock"],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                  <dt className="label-sh pt-0.5 text-[#0C1510]/60">{k}</dt>
                  <dd className="text-sm leading-relaxed text-[#0C1510]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className={`mt-4 text-xs leading-relaxed ${muted}`}>Specification transcribed from the KalingaStone catalogue as published by Global Classic Building Materials on gcbuae.com. Confirm against the manufacturer datasheet for contractual use.</p>
          </Reveal>
        </div>
      </section>

      {/* Applications and finishes */}
      <section className="bg-[#0C1510] text-[#F7F8F5]" aria-labelledby="uses-heading">
        <div className={`${wrap} py-16 lg:py-24`}>
          <Reveal>
            <p className={eyebrowDark}>Versatility of application</p>
            <h2 id="uses-heading" className={`${h2Dark} max-w-[22ch]`}>Where {s.name} goes, and how it is finished.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[1.618fr_1fr]">
            <div>
              <p className="label-sh text-[#D2D4C8]">Typical applications</p>
              <ol className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {s.applications.map((a, i) => (
                  <li key={a} className="list-none border-t border-[#F7F8F5]/15 py-4">
                    <Reveal delay={i * 0.05}>
                      <span className="spec-sh text-[#6F8F78]">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-1.5 text-sm font-medium text-[#F7F8F5]">{a.charAt(0).toUpperCase() + a.slice(1)}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="label-sh text-[#D2D4C8]">Finishes</p>
              <ol className="mt-4">
                {s.finishes.map((f, i) => (
                  <li key={f} className="list-none border-t border-[#F7F8F5]/15 py-4">
                    <Reveal delay={i * 0.05}>
                      <span className="spec-sh text-[#6F8F78]">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-1.5 text-sm font-medium text-[#F7F8F5]">
                        {f}
                        {i === 0 && <span className="text-[#F7F8F5]/55"> , as standard</span>}
                        {i > 0 && <span className="text-[#F7F8F5]/55"> , on request</span>}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>
              {material === "quartz" && <p className="mt-4 text-xs leading-relaxed text-[#F7F8F5]/60">Any of the collection's 21 edge profiles, from straight eased to cove dupont, cut by the fabricator.</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Installed photograph */}
      {s.lifestyle && s.lifestyleAlt && (
        <section className="bg-[#F7F8F5]" aria-labelledby="installed-heading">
          <div className={`${wrap} py-16 lg:py-24`}>
            <Reveal>
              <p className={eyebrowLight}>Installed</p>
              <h2 id="installed-heading" className={`${h2Light} max-w-[22ch]`}>{s.name}, in place.</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]/30">
              <picture>
                <source type="image/avif" srcSet={photoSrcSet(s.lifestyle).avif} sizes="(max-width: 1400px) 100vw, 1336px" />
                <source type="image/webp" srcSet={photoSrcSet(s.lifestyle).webp} sizes="(max-width: 1400px) 100vw, 1336px" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoSrcSet(s.lifestyle).fallback} alt={s.lifestyleAlt} width={1200} height={800} loading="lazy" decoding="async" className="block w-full object-cover" style={{ aspectRatio: "16 / 9" }} />
              </picture>
            </Reveal>
            <p className={`mt-3 spec-sh ${muted}`}>{s.lifestyleAlt}.</p>
          </div>
        </section>
      )}

      {/* Related shades */}
      <section className="border-t border-[#0C1510]/12 bg-[#F7F8F5]" aria-labelledby="related-heading">
        <div className={`${wrap} py-16 lg:py-24`}>
          <Reveal>
            <p className={eyebrowLight}>Related shades</p>
            <h2 id="related-heading" className={`${h2Light} max-w-[22ch]`}>More from the {s.rangeName.toLowerCase()} {rangeWord}.</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.slice(0, 4).map((r, i) => (
              <li key={r.slug} className="list-none min-w-0">
                <ShadeCard shade={r} delay={i * 0.06} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={rangeHref(productLine, rangeSlug)} className={buttonOutline}>
              All {range.shades.length} {s.rangeName} shades
            </Link>
            <Link href={lineHref(productLine)} className="inline-flex min-h-[3rem] items-center px-2 label-sh text-[#355E4D] underline underline-offset-4">
              All {entry.count} KalingaStone {entry.label} shades
            </Link>
          </div>

          {/* Previous and next, in catalogue order */}
          <nav aria-label="Previous and next shade" className="mt-14 grid grid-cols-1 gap-3 border-t border-[#0C1510]/12 pt-6 sm:grid-cols-2">
            {prev ? (
              <Link href={shadeHref(prev)} className="group flex items-center gap-4 rounded-xl border border-[#D2D4C8] bg-white p-3 transition-colors hover:border-[#355E4D]">
                <div className="w-20 shrink-0 overflow-hidden rounded-lg" style={{ aspectRatio: "3 / 2" }}>
                  <SwatchPicture shade={prev} sizes="80px" />
                </div>
                <div className="min-w-0">
                  <p className="label-sh text-[#0C1510]/60">&larr; Previous shade</p>
                  <p className={`${serif} mt-1 truncate text-xl text-[#0C1510] group-hover:text-[#355E4D]`}>{prev.name}</p>
                  <p className="spec-sh text-[#0C1510]/60">{prev.rangeName}</p>
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={shadeHref(next)} className="group flex items-center justify-end gap-4 rounded-xl border border-[#D2D4C8] bg-white p-3 text-right transition-colors hover:border-[#355E4D]">
                <div className="min-w-0">
                  <p className="label-sh text-[#0C1510]/60">Next shade &rarr;</p>
                  <p className={`${serif} mt-1 truncate text-xl text-[#0C1510] group-hover:text-[#355E4D]`}>{next.name}</p>
                  <p className="spec-sh text-[#0C1510]/60">{next.rangeName}</p>
                </div>
                <div className="w-20 shrink-0 overflow-hidden rounded-lg" style={{ aspectRatio: "3 / 2" }}>
                  <SwatchPicture shade={next} sizes="80px" />
                </div>
              </Link>
            )}
          </nav>
        </div>
      </section>

      <GlobalClassicBand materialWord={entry.label} />

      {/* Need this shade for a project? */}
      <section className="bg-[#F7F8F5]" aria-labelledby="need-heading">
        <div className={`${wrap} pt-16 lg:pt-24`}>
          <Reveal>
            <p className={eyebrowLight}>Availability and pricing</p>
            <h2 id="need-heading" className={`${h2Light} max-w-[22ch]`}>Need {s.name} for a project?</h2>
            <p className={`mt-5 max-w-[62ch] text-base leading-relaxed ${muted}`}>
              Slab availability, free trade samples and AED pricing from Al Sajaa stock, usually within one working day. The form below is preset to KalingaStone {entry.label} with {s.name} in the notes; add the square metres and the emirate.
            </p>
          </Reveal>
        </div>
      </section>
      <KalingaQuoteSection product={QUOTE_PRODUCT[material]} variant="gcb" note={`Shade: ${s.name}`} />

      <ClosingBar title={`Specifying ${s.name} for a project?`} back={`Back to ${s.rangeName}`} backHref={rangeHref(productLine, rangeSlug)} />
      <WhatsAppButton label={`WhatsApp Lapiz Blue about KalingaStone ${s.name}`} />
    </main>
  );
}

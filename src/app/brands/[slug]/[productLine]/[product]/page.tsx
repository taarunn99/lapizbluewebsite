import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import { getBrandConfig, getProductLine } from "@/data/brandConfigs";
import { getShippable, getTdsProduct, getRelatedProducts, isShippable, TDS_CATEGORY_LABELS } from "@/lib/tds";
import { SITE_URL } from "@/lib/site-constants";
import { buildBreadcrumbJsonLd, buildProductJsonLd, buildFaqJsonLd, jsonLdString } from "@/lib/tds-schema";
import { buildTdsFaqs } from "@/lib/tds-faq";
import { BackButton } from "@/components/ui/back-button";
import { ProductLineFAQSection } from "@/components/brands/product-line-faq-section";
import { TdsCover } from "@/components/tds/tds-cover";
import { SpecTable } from "@/components/tds/spec-table";
import { StandardsChips } from "@/components/tds/standards-chips";
import { ConsumptionScale } from "@/components/tds/consumption-scale";
import { WhatsAppBand } from "@/components/tds/whatsapp-band";
import { RelatedProducts } from "@/components/tds/related-products";
import { ToolsForJob, toolsForJob } from "@/components/tds/tools-for-job";
import { EquivalentsSection } from "@/components/tds/equivalents-section";
import { ConsumptionCalculator } from "@/components/tds/calculator/index.client";
import { LayerScheduleTable } from "@/components/tds/calculator/layer-schedule";
import { SectionNav, type PageSection } from "@/components/tds/section-nav.client";
import { DocumentsPanel } from "@/components/tds/documents-panel";
import { WhereUsed } from "@/components/tds/where-used";
import { OnSite } from "@/components/tds/on-site";
import { BoqClause } from "@/components/tds/boq-clause.client";
import { ProductPrevNext } from "@/components/tds/product-prev-next";
import { buildBoqClause, buildBoqRows, rowsToCsv } from "@/lib/boq";
import { brandThemeStyle } from "@/lib/brand-theme";
import { consumptionTiers } from "@/lib/tds";
import { calcConfig } from "@/lib/calculator";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const dynamicParams = false;

export async function generateStaticParams() {
  return getShippable().map((rec) => ({
    slug: rec.brand,
    productLine: rec.product_line,
    product: rec.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productLine: string; product: string }>;
}): Promise<Metadata> {
  const { slug, productLine, product } = await params;
  const rec = getTdsProduct(slug, productLine, product);
  const brand = getBrandConfig(slug);
  if (!rec || !brand || !isShippable(rec)) {
    return { title: "Product Not Found - Lapiz Blue" };
  }
  const title = `${rec.name} TDS | ${brand.name} ${TDS_CATEGORY_LABELS[rec.category]} | Lapiz Blue UAE`;
  const url = `${SITE_URL}/brands/${slug}/${productLine}/${product}`;
  const ogImage = `${SITE_URL}/og/${slug}/${product}.png`;
  return {
    title,
    description: rec.meta_description,
    openGraph: {
      title,
      description: rec.meta_description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      url,
      siteName: "Lapiz Blue",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: rec.meta_description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

/**
 * One anchored section. The eyebrow and heading pair is the page's only
 * heading pattern, so every section reads the same way, and scroll-mt clears
 * the sticky site header when a chip jumps here.
 */
function Section({
  id,
  eyebrow,
  heading,
  tinted,
  printHidden,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  tinted?: boolean;
  /** Left off the printed sheet. Anything interactive or cross selling. */
  printHidden?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[9.5rem] py-16 sm:py-24 print:break-inside-avoid print:py-6 ${
        tinted ? "bg-[#F6F8FA]" : "bg-white"
      } ${printHidden ? "print:hidden" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-manrope text-[11px] uppercase tracking-[0.22em] text-[#161925]/65">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-outfit font-bold text-[#161925] tracking-tight text-3xl sm:text-4xl lg:text-5xl print:text-xl">
          {heading}
        </h2>
        <div className="mt-10 sm:mt-14 print:mt-4">{children}</div>
      </div>
    </section>
  );
}

export default async function TdsProductPage({
  params,
}: {
  params: Promise<{ slug: string; productLine: string; product: string }>;
}) {
  const { slug, productLine: productLineSlug, product } = await params;
  const rec = getTdsProduct(slug, productLineSlug, product);
  const brand = getBrandConfig(slug);
  const productLine = getProductLine(slug, productLineSlug);
  if (!rec || !brand || !productLine || !isShippable(rec)) {
    notFound();
  }

  const faqs = buildTdsFaqs(rec);
  const related = getRelatedProducts(rec, 6);
  const hasScale = consumptionTiers(rec).length >= 2;
  // The calculator comes from the transcribed per product index, never from a
  // regex over the spec text at render time. A product absent from the index,
  // or whose sheet publishes no usable rate, shows no calculator at all: a
  // hidden section is honest, an invented rate is not.
  const calc = calcConfig(rec.brand, rec.slug);
  const hasCalc = calc !== null && calc.model !== "none";
  const pageUrl = `${SITE_URL}/brands/${slug}/${productLineSlug}/${product}`;

  const schemas = [
    buildBreadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Brands", url: `${SITE_URL}/brands` },
      { name: brand.name, url: `${SITE_URL}/brands/${slug}` },
      { name: productLine.name, url: `${SITE_URL}/brands/${slug}/${productLineSlug}` },
      { name: rec.name, url: pageUrl },
    ]),
    buildProductJsonLd(rec, brand.name),
    ...(faqs.length > 0 ? [buildFaqJsonLd(faqs)] : []),
  ];

  const boqRows = buildBoqRows(rec, brand.name);

  // Where this product sits in its line, for the No. N / M counter in the
  // hero. Same ordering as the previous and next links use, so the two agree.
  const siblings = getShippable(brand.slug, productLineSlug).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const position = {
    index: Math.max(1, siblings.findIndex((s) => s.slug === rec.slug) + 1),
    total: siblings.length,
  };

  // The hero prints the opening sentences. Anything after them goes under the
  // About heading rather than being repeated.
  const sentences = rec.description.split(/(?<=\.)\s+/);
  const restOfDescription = sentences.slice(2).join(" ").trim();

  // The tools a tiler would use with this material, mapped from the product's
  // category. Only tool pages that exist resolve, so a category with nothing
  // honest to show gets no section and no chip.
  const tools = toolsForJob(rec.category);

  // The chip bar only lists sections that actually render, so it never points
  // at an anchor that is not on the page.
  const sections: PageSection[] = [
    { id: "documents", label: "Documents" },
    ...(hasCalc ? [{ id: "calculator", label: "Calculator" }] : []),
    { id: "where-to-use", label: "Where to use" },
    { id: "technical-data", label: "Technical" },
    { id: "on-site", label: "On site" },
    { id: "boq-clause", label: "BOQ" },
    ...(tools.length > 0 ? [{ id: "tools", label: "Tools" }] : []),
  ];

  return (
    <main
      className={`${manrope.className} bg-white text-[#161925]`}
      style={brandThemeStyle(brand.slug, brand.theme?.primary)}
    >
      {/* How far down a long sheet you are. Pure CSS, scroll driven, and gone
          under reduced motion or on paper. See .tds-progress in globals.css. */}
      <div className="tds-progress print:hidden" aria-hidden="true" />

      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav className="bg-white print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <Link href="/" className="text-gray-500 hover:text-[#406E8E] transition-colors">
                Home
              </Link>
              <span className="text-[#161925]/45">/</span>
              <Link href="/brands" className="text-gray-500 hover:text-[#406E8E] transition-colors">
                Brands
              </Link>
              <span className="text-[#161925]/45">/</span>
              <Link
                href={`/brands/${brand.slug}`}
                className="text-gray-500 hover:text-[#406E8E] transition-colors"
              >
                {brand.name}
              </Link>
              <span className="text-[#161925]/45">/</span>
              <Link
                href={`/brands/${brand.slug}/${productLineSlug}`}
                className="text-gray-500 hover:text-[#406E8E] transition-colors"
              >
                {productLine.name}
              </Link>
              <span className="text-[#161925]/45">/</span>
              <span className="font-medium text-[#23395B]">{rec.name}</span>
            </div>
            <BackButton href={`/brands/${brand.slug}/${productLineSlug}`} label="Back" />
          </div>
        </div>
      </nav>

      <TdsCover
        rec={rec}
        brandName={brand.name}
        productLineName={productLine.name}
        position={position}
      />

      <SectionNav sections={sections} />

      {/* Overview. The hero shows the opening sentences; this carries the
          rest, so nothing is printed twice and a crawler still gets the whole
          description. */}
      {restOfDescription ? (
        <section className="py-14 md:py-20 print:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-[72ch]">
              <h2 className="font-outfit font-bold text-[#161925] tracking-tight text-3xl sm:text-4xl print:text-xl">
                About {rec.name}
              </h2>
              <p className="mt-6 font-manrope text-base md:text-lg leading-[1.8] text-[#161925]/85 print:mt-3 print:text-sm print:leading-relaxed">
                {restOfDescription}
              </p>
            </div>
          </div>
        </section>
      ) : null}


      {/* Every section renders at once and the chip bar only scrolls to it.
          A product page is a reference document: people read it through and
          print it as often as they jump around it, and hiding four fifths
          behind a tab fights both. scroll-mt clears the sticky header. */}

      <Section id="documents" eyebrow="Documentation" heading="Related documentation" printHidden>
        <DocumentsPanel rec={rec} />
      </Section>

      {hasCalc && calc ? (
        <Section
          id="calculator"
          eyebrow={calc.model === "layer_schedule" ? "Coverage" : "Coverage calculator"}
          heading="How much you need."
          tinted
          printHidden
        >
          {calc.model === "layer_schedule" ? (
            <LayerScheduleTable cfg={calc} name={rec.name} />
          ) : (
            <ConsumptionCalculator rec={rec} cfg={calc} brandName={brand.name} />
          )}
        </Section>
      ) : null}

      <Section id="where-to-use" eyebrow="Application" heading="Where it is used.">
        <WhereUsed rec={rec} />
      </Section>

      <Section id="technical-data" eyebrow="Specification" heading="Technical data." tinted>
        <StandardsChips rec={rec} />
        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 print:grid-cols-[1.618fr_1fr] print:gap-8">
          <div>
            <SpecTable rec={rec} />
            <p className="mt-4 font-manrope text-sm text-[#161925]/65 max-w-[62ch]">
              Typical values as {brand.name} prints them in the data sheet for {rec.name}.
              Manufacturers revise their sheets, so ask us for the current edition before you
              specify.
            </p>
          </div>
          {hasScale ? (
            <div>
              <h3 className="font-manrope text-[11px] uppercase tracking-[0.22em] text-[#161925]/65 mb-4">
                Consumption by trowel
              </h3>
              <ConsumptionScale rec={rec} />
            </div>
          ) : null}
        </div>
      </Section>

      <Section id="on-site" eyebrow="On site" heading="Packs, mixing and storage.">
        <OnSite rec={rec} />
      </Section>

      <Section
        id="boq-clause"
        eyebrow="For quantity surveyors"
        heading="BOQ clause."
        tinted
        printHidden
      >
        <BoqClause
          productName={rec.name}
          clause={buildBoqClause(rec, brand.name)}
          rows={boqRows}
          csv={rowsToCsv(boqRows)}
        />
      </Section>

      <EquivalentsSection rec={rec} />

      {/* The FAQ is an accordion, so on paper it is a list of questions with
          the answers folded away. It comes off the printed sheet. */}
      {faqs.length > 0 ? (
        <div className="print:hidden">
          <ProductLineFAQSection faqs={faqs} brandColor="var(--brand-ink)" />
        </div>
      ) : null}

      <ProductPrevNext rec={rec} />

      <RelatedProducts products={related} primaryColor="var(--brand-ink)" />

      {tools.length > 0 ? (
        <Section id="tools" eyebrow="On the van" heading="Tools for this job." printHidden>
          <ToolsForJob rec={rec} />
        </Section>
      ) : null}

      <WhatsAppBand productName={rec.name} brandName={brand.name} />
    </main>
  );
}

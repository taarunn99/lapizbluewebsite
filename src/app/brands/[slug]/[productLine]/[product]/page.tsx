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
import { ConsumptionScale } from "@/components/tds/consumption-scale";
import { WhatsAppBand } from "@/components/tds/whatsapp-band";
import { RelatedProducts } from "@/components/tds/related-products";
import { EquivalentsSection } from "@/components/tds/equivalents-section";
import { ConsumptionCalculator } from "@/components/tds/consumption-calculator.client";
import { KeySpecsBar } from "@/components/tds/key-specs-bar";
import { SectionNav, type PageSection } from "@/components/tds/section-nav.client";
import { DocumentsPanel } from "@/components/tds/documents-panel";
import { WhereUsed } from "@/components/tds/where-used";
import { OnSite } from "@/components/tds/on-site";
import { BoqClause } from "@/components/tds/boq-clause.client";
import { ProductPrevNext } from "@/components/tds/product-prev-next";
import { buildBoqClause, buildBoqRows, rowsToCsv } from "@/lib/boq";
import { consumptionTiers, consumptionModel } from "@/lib/tds";

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
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-16 sm:py-24 ${tinted ? "bg-[#F6F8FA]" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-manrope text-[11px] uppercase tracking-[0.22em] text-[#161925]/65">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-outfit font-bold text-[#161925] tracking-tight text-3xl sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <div className="mt-10 sm:mt-14">{children}</div>
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
  const calcModel = consumptionModel(rec);
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

  // The chip bar only lists sections that actually render, so it never points
  // at an anchor that is not on the page.
  const sections: PageSection[] = [
    { id: "documents", label: "Documents" },
    ...(calcModel ? [{ id: "calculator", label: "Calculator" }] : []),
    { id: "where-to-use", label: "Where to use" },
    { id: "technical-data", label: "Technical" },
    { id: "on-site", label: "On site" },
    { id: "boq-clause", label: "BOQ" },
  ];

  return (
    <main className={`${manrope.className} bg-white text-[#161925]`}>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
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

      <TdsCover rec={rec} brandName={brand.name} productLineName={productLine.name} />

      <KeySpecsBar rec={rec} />

      <WhatsAppBand productName={rec.name} brandName={brand.name} />

      {/* Overview. Kept out of the tabs so the page still opens with prose
          that explains the product, which is what a first time visitor and a
          crawler both need. */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[72ch]">
            <h2 className="font-outfit font-bold text-[#161925] tracking-tight text-3xl sm:text-4xl">
              About {rec.name}
            </h2>
            <p className="mt-6 font-manrope text-base md:text-lg leading-[1.8] text-[#161925]/85">
              {rec.description}
            </p>
          </div>
        </div>
      </section>

      <SectionNav sections={sections} />

      {/* Every section renders at once and the chip bar only scrolls to it.
          A product page is a reference document: people read it through and
          print it as often as they jump around it, and hiding four fifths
          behind a tab fights both. scroll-mt clears the sticky header. */}

      <Section id="documents" eyebrow="Documentation" heading="Related documentation">
        <DocumentsPanel rec={rec} />
      </Section>

      {calcModel ? (
        <Section
          id="calculator"
          eyebrow="Coverage calculator"
          heading="How much you need."
          tinted
        >
          <ConsumptionCalculator rec={rec} model={calcModel} />
        </Section>
      ) : null}

      <Section id="where-to-use" eyebrow="Application" heading="Where it is used.">
        <WhereUsed rec={rec} />
      </Section>

      <Section id="technical-data" eyebrow="Specification" heading="Technical data." tinted>
        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16">
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

      <Section id="boq-clause" eyebrow="For quantity surveyors" heading="BOQ clause." tinted>
        <BoqClause
          productName={rec.name}
          clause={buildBoqClause(rec, brand.name)}
          rows={boqRows}
          csv={rowsToCsv(boqRows)}
        />
      </Section>

      <EquivalentsSection rec={rec} />

      {faqs.length > 0 ? <ProductLineFAQSection faqs={faqs} brandColor="#23395B" /> : null}

      <ProductPrevNext rec={rec} />

      <RelatedProducts products={related} primaryColor="#23395B" />
    </main>
  );
}

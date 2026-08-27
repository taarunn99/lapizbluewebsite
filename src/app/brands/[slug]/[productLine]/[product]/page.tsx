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
import { consumptionTiers } from "@/lib/tds";

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

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b-2 border-[#161925] pb-3 mb-8">
      <span className="text-[11px] font-bold tabular-nums tracking-[0.18em] text-[#FFCC00] bg-[#161925] px-2 py-1">
        {number}
      </span>
      <h2 className="text-xl md:text-2xl font-bold text-[#161925] uppercase tracking-tight">
        {title}
      </h2>
    </div>
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

  let sectionNo = 0;
  const next = () => {
    sectionNo += 1;
    return String(sectionNo).padStart(2, "0");
  };

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
              <span className="text-gray-400">/</span>
              <Link href="/brands" className="text-gray-500 hover:text-[#406E8E] transition-colors">
                Brands
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href={`/brands/${brand.slug}`}
                className="text-gray-500 hover:text-[#406E8E] transition-colors"
              >
                {brand.name}
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href={`/brands/${brand.slug}/${productLineSlug}`}
                className="text-gray-500 hover:text-[#406E8E] transition-colors"
              >
                {productLine.name}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="font-medium text-[#23395B]">{rec.name}</span>
            </div>
            <BackButton href={`/brands/${brand.slug}/${productLineSlug}`} label="Back" />
          </div>
        </div>
      </nav>

      <TdsCover rec={rec} brandName={brand.name} productLineName={productLine.name} />

      {/* 01 Overview */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[70ch]">
            <SectionHeading number={next()} title={`About ${rec.name}`} />
            <p className="text-base md:text-lg leading-[1.75] text-gray-700">{rec.description}</p>
          </div>
        </div>
      </section>

      {/* 02 Technical data */}
      <section className="pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16">
            <div>
              <SectionHeading number={next()} title="Technical data" />
              <SpecTable rec={rec} />
              <p className="mt-4 text-xs text-gray-500">
                Values from the manufacturer&apos;s TDS. Download the PDF for the complete document.
              </p>
            </div>
            {/* 03 Consumption figure */}
            <div>
              {hasScale ? (
                <>
                  <SectionHeading number={next()} title="Consumption" />
                  <ConsumptionScale rec={rec} />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      {rec.applications.length > 0 ? (
        <section className="pb-14 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading number={next()} title="Applications" />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl">
              {rec.applications.map((app, i) => (
                <li key={app} className="flex items-baseline gap-4 border-b border-[#161925]/10 pb-4">
                  <span className="text-[11px] font-bold tabular-nums text-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <EquivalentsSection rec={rec} />

      <WhatsAppBand productName={rec.name} brandName={brand.name} />

      {/* FAQ */}
      {faqs.length > 0 ? <ProductLineFAQSection faqs={faqs} brandColor="#23395B" /> : null}

      <RelatedProducts products={related} primaryColor="#23395B" />
    </main>
  );
}

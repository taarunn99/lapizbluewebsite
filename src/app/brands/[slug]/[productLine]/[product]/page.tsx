import type { Metadata } from "next";
import Image from "next/image";
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
import { HeroFacts } from "@/components/tds/hero-facts";
import { SpecTable } from "@/components/tds/spec-table";
import { DownloadTdsCta } from "@/components/tds/download-tds-cta";
import { TdsWhatsAppCta } from "@/components/tds/tds-whatsapp-cta";
import { RelatedProducts } from "@/components/tds/related-products";
import { EquivalentsSection } from "@/components/tds/equivalents-section";

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

  const primaryColor = brand.theme.primary || "#23395B";
  const faqs = buildTdsFaqs(rec);
  const related = getRelatedProducts(rec, 6);
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

  return (
    <main className={`${manrope.className} bg-white text-[#23395B]`}>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
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
              <span className="font-medium" style={{ color: primaryColor }}>
                {rec.name}
              </span>
            </div>
            <BackButton href={`/brands/${brand.slug}/${productLineSlug}`} label="Back" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <p
                className="text-sm font-semibold uppercase tracking-wide mb-3"
                style={{ color: primaryColor }}
              >
                {brand.name} {productLine.name}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#161925] leading-tight mb-4">
                {rec.name} Technical Data Sheet (TDS)
              </h1>
              {rec.classification ? (
                <div className="flex flex-wrap gap-2 mb-5">
                  {rec.classification.split(",").map((code) => (
                    <span
                      key={code}
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {code.trim()}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="text-gray-700 leading-relaxed mb-6">{rec.description}</p>
              <div className="mb-6">
                <HeroFacts rec={rec} primaryColor={primaryColor} />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <DownloadTdsCta rec={rec} primaryColor={primaryColor} />
                <TdsWhatsAppCta productName={rec.name} brandName={brand.name} />
              </div>
            </div>
            <div className="lg:col-span-2">
              {rec.image.path ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center justify-center">
                  <div className="relative w-full aspect-square max-w-sm">
                    <Image
                      src={rec.image.path}
                      alt={`${rec.name} ${TDS_CATEGORY_LABELS[rec.category].toLowerCase()} pack by ${brand.name}`}
                      fill
                      sizes="(max-width: 1024px) 90vw, 400px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-2">
            {rec.name} Specifications
          </h2>
          <p className="text-gray-600 mb-8">
            Key technical data from the manufacturer&apos;s TDS. Download the PDF above for the
            complete document.
          </p>
          <SpecTable rec={rec} />
        </div>
      </section>

      {/* Applications */}
      {rec.applications.length > 0 ? (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-8">Applications</h2>
            <ul className="space-y-3">
              {rec.applications.map((app) => (
                <li key={app} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{ color: primaryColor }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-gray-700">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <EquivalentsSection rec={rec} />

      {/* FAQ */}
      {faqs.length > 0 ? (
        <ProductLineFAQSection faqs={faqs} brandColor={primaryColor} />
      ) : null}

      <RelatedProducts products={related} primaryColor={primaryColor} />
    </main>
  );
}

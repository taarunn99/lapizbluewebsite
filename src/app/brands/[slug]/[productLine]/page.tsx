import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandConfig, getProductLine, getAllBrands } from "@/data/brandConfigs";
import { BrandProductNavResponsive } from "@/components/ui/brand-product-nav";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Generate static params for all product lines
export async function generateStaticParams() {
  const brands = getAllBrands();
  const params: Array<{ slug: string; productLine: string }> = [];

  brands.forEach((brand) => {
    brand.productLines.forEach((pl) => {
      params.push({
        slug: brand.slug,
        productLine: pl.slug,
      });
    });
  });

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productLine: string }>;
}): Promise<Metadata> {
  const { slug, productLine: productLineSlug } = await params;
  const brand = getBrandConfig(slug);
  const productLine = getProductLine(slug, productLineSlug);

  if (!brand || !productLine) {
    return {
      title: "Product Not Found - Lapiz Blue",
    };
  }

  return {
    title: `${productLine.name} - ${brand.name} | Lapiz Blue`,
    description: productLine.metaDescription,
    openGraph: {
      title: `${productLine.name} - ${brand.name}`,
      description: productLine.metaDescription,
      images: productLine.images.length > 0 ? [productLine.images[0]] : [],
      url: `/brands/${slug}/${productLineSlug}`,
    },
    alternates: {
      canonical: `/brands/${slug}/${productLineSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductLinePage({
  params,
}: {
  params: Promise<{ slug: string; productLine: string }>;
}) {
  const { slug, productLine: productLineSlug } = await params;
  const brand = getBrandConfig(slug);
  const productLine = getProductLine(slug, productLineSlug);

  if (!brand || !productLine) {
    notFound();
  }

  return (
    <main className={`${manrope.className} bg-white text-[#23395B]`}>
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#1E6BA8] transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/brands"
              className="text-gray-500 hover:text-[#1E6BA8] transition-colors"
            >
              Brands
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/brands/${brand.slug}`}
              className="text-gray-500 hover:text-[#1E6BA8] transition-colors"
            >
              {brand.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#23395B] font-medium">{productLine.name}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Brand Logo */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-xl bg-white p-4 shadow-md border border-gray-100">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={150}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Product Line Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#23395B] leading-tight mb-6">
              {productLine.name}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
              {productLine.description}
            </p>

            {/* Official Website Link */}
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E6BA8]/10 px-6 py-3 text-sm font-semibold text-[#1E6BA8] transition-all hover:bg-[#1E6BA8]/20 hover:scale-105 border border-[#1E6BA8]/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Visit {brand.name} Official Website
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Product Line Navigation - Static, No Scroll Animation */}
      <div className="relative -mt-8 pb-12">
        <BrandProductNavResponsive
          brand={brand}
          currentProductLine={productLineSlug}
        />
      </div>

      {/* Image Gallery Section */}
      {productLine.images && productLine.images.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid gap-6 ${
                productLine.images.length === 1
                  ? "grid-cols-1 max-w-4xl mx-auto"
                  : productLine.images.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {productLine.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={image}
                    alt={`${productLine.name} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    quality={85}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section (if available) */}
      {productLine.features && productLine.features.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-8 text-center">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {productLine.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm"
                >
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5"
                    style={{ color: brand.theme.primary }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Downloads Section (if available) */}
      {productLine.downloads && productLine.downloads.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-8 text-center">
              Technical Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {productLine.downloads.map((download, index) => (
                <a
                  key={index}
                  href={download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
                >
                  <svg
                    className="w-10 h-10 flex-shrink-0"
                    style={{ color: brand.theme.primary }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[#23395B]">{download.title}</h3>
                    <p className="text-sm text-gray-500">{download.type}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: `${brand.theme.primary}15` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-4">
            Need Expert Guidance?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our technical team is here to help you choose the right {productLine.name.toLowerCase()} for your project.
            Get in touch for personalized recommendations and quotations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-lg transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: brand.theme.primary }}
            >
              Contact Our Team
            </Link>
            <a
              href="https://wa.me/971488855257"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border-2 rounded-lg transition-all duration-200 hover:shadow-lg"
              style={{
                borderColor: brand.theme.primary,
                color: brand.theme.primary,
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Back to Brand Link */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/brands/${brand.slug}`}
            className="inline-flex items-center text-gray-600 hover:text-[#1E6BA8] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to {brand.name} Product Lines
          </Link>
        </div>
      </section>
    </main>
  );
}

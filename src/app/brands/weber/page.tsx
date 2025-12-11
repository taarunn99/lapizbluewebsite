import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBrandConfig } from "@/data/brandConfigs";
import { BrandProductNavResponsive } from "@/components/ui/brand-product-nav";
import { Manrope } from "next/font/google";
import { BrandInfoSection } from "@/components/ui/brand-info-section";
import { WeberSolutionsSection } from "@/components/brands/weber-solutions-section";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Get Weber brand config
const brand = getBrandConfig("weber")!;

export const metadata: Metadata = {
  title: `${brand.name} Products | Lapiz Blue`,
  description: brand.metaDescription,
  openGraph: {
    title: `${brand.name} - Lapiz Blue`,
    description: brand.metaDescription,
    images: [brand.hero.src],
    url: `/brands/weber`,
  },
  alternates: {
    canonical: `/brands/weber`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WeberPage() {
  return (
    <main className={`${manrope.className} bg-white text-[#1A1A1A]`}>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/brands/weber/hero.webp"
            alt={brand.hero.alt}
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority
          />
          {/* Overlay gradient - Weber Yellow/Black theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          {/* Brand Logo */}
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-xl">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={200}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl uppercase">
            Saint-Gobain Weber
          </h1>
          <p className="max-w-2xl text-lg text-white md:text-xl lg:text-2xl mb-6 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg">
            {brand.description}
          </p>

          {/* Official Website Link */}
          {brand.website && (
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFCC00] px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-[#FFD633] hover:scale-105 shadow-lg"
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
              Visit Official Website
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
      </section>

      {/* Brand Info Section */}
      <BrandInfoSection
        brandName="Weber"
        brandDescription="Saint-Gobain Weber is a global leader in construction mortars and facade systems, backed by over 100 years of expertise. As part of the Saint-Gobain Group, Weber provides innovative building solutions that combine performance with sustainability. From tile adhesives and waterproofing systems to repair mortars and self-leveling compounds, Weber products are trusted by professionals worldwide for their reliability and consistent quality."
        whyLapizBlueTitle="Why Lapiz Blue for Weber?"
        whyLapizBlueContent="Lapiz Blue is your authorized Weber distributor in the UAE, bringing Saint-Gobain's world-class construction solutions to projects across Dubai, Abu Dhabi, and Sharjah. Our expert team provides technical support and reliable delivery, ensuring you get the right Weber product for every application. Experience German engineering and French innovation with Lapiz Blue."
        accentColor="#FFCC00"
      />

      {/* Product Line Navigation */}
      <div className="relative py-12 bg-gray-50">
        <BrandProductNavResponsive brand={brand} />
      </div>

      {/* Solutions Section */}
      <WeberSolutionsSection />

      {/* Brand Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Our Product Lines
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of {brand.name} products. Click on any
              product line above to learn more.
            </p>
          </div>

          {/* Product Lines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brand.productLines.map((productLine) => (
              <Link
                key={productLine.slug}
                href={`/brands/${brand.slug}/${productLine.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-md transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-[#FFCC00]/40"
              >
                <div className="mb-4">
                  <div className="inline-flex rounded-full p-3 bg-[#FFCC00]/10 group-hover:bg-[#FFCC00]/20 transition-colors">
                    <svg
                      className="h-6 w-6 text-[#1A1A1A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-[#1A1A1A] group-hover:text-[#B38F00] transition-colors">
                  {productLine.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {productLine.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#FFCC00] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#FFCC00] to-[#FFD633]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-lg text-[#1A1A1A]/80 mb-8 max-w-2xl mx-auto">
            Our technical experts are ready to assist you with product selection,
            specifications, and project recommendations for Weber products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#1A1A1A] rounded-lg transition-all duration-200 hover:bg-black hover:shadow-lg hover:scale-105"
            >
              Contact Our Team
            </Link>
            <a
              href="https://wa.me/971488855257"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-lg transition-all duration-200 hover:bg-[#1A1A1A] hover:text-white hover:shadow-lg hover:scale-105"
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

      {/* Back to All Brands */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/brands"
            className="inline-flex items-center text-gray-600 hover:text-[#B38F00] transition-colors"
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
            Back to All Brands
          </Link>
        </div>
      </section>
    </main>
  );
}

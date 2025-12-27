import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBrandConfig } from "@/data/brandConfigs";
import { BrandProductNavResponsive } from "@/components/ui/brand-product-nav";
import { BackButton } from "@/components/ui/back-button";
import { Manrope } from "next/font/google";
import { MapeiVideoSection } from "@/components/brands/mapei-video-section";
import { BrandInfoSection } from "@/components/ui/brand-info-section";
import { MapeiSolutionsSection } from "@/components/brands/mapei-solutions-section";
import { MapeiAwardsSection } from "@/components/brands/mapei-awards-section";
import { MapeiGroutCalculator } from "@/components/brands/mapei-grout-calculator";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Get Mapei brand config
const brand = getBrandConfig("mapei")!;

export const metadata: Metadata = {
  title: "Mapei Products | Lapiz Blue UAE",
  description: "Explore Mapei tile adhesives, grouts, and waterproofing systems at Lapiz Blue. World-leading construction chemicals with expert support across UAE.",
  openGraph: {
    title: "Mapei Products | Lapiz Blue UAE",
    description: "Explore Mapei tile adhesives, grouts, and waterproofing systems at Lapiz Blue. Expert support across UAE.",
    images: [brand.hero.src],
    url: "https://www.lapizblue.com/brands/mapei",
    siteName: "Lapiz Blue",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapei Products | Lapiz Blue UAE",
    description: "Explore Mapei tile adhesives, grouts, and waterproofing systems at Lapiz Blue. Expert support across UAE.",
    images: [brand.hero.src],
  },
  alternates: {
    canonical: "https://www.lapizblue.com/brands/mapei",
  },
};

export default function MapeiPage() {
  return (
    <main className={`${manrope.className} bg-white text-[#23395B]`}>
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#406E8E] transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/brands" className="text-gray-500 hover:text-[#406E8E] transition-colors">
              Brands
            </Link>
            <span className="text-gray-400">/</span>
            <span style={{ color: brand.theme.primary }} className="font-medium">
              {brand.name}
            </span>
          </div>
          <BackButton href="/brands" label="Back" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={brand.hero.src}
            alt={brand.hero.alt}
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority
          />
          {/* Overlay gradient - darkened for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          {/* Brand Logo */}
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-xl">
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
            {brand.name}
          </h1>
          <p className="max-w-2xl text-lg text-white md:text-xl lg:text-2xl mb-6 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg">
            {brand.description}
          </p>

          {/* Official Website Link */}
          {brand.website && (
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:scale-105 border border-white/20"
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

      {/* Video Section */}
      <MapeiVideoSection />

      {/* Brand Info Section */}
      <BrandInfoSection
        brandName="Mapei"
        brandDescription="Mapei is a global leader in adhesives, sealants and chemical products for the building industry, trusted on everything from homes and hotels to airports and infrastructure worldwide. Founded in Italy in 1937, the brand is known for long-lasting, high-performance systems that support sustainable, modern construction – from tile and stone installation to waterproofing, flooring, concrete repair and more. When you see Mapei on site, you know the project team has chosen proven technology backed by decades of research, innovation and real jobsite experience."
        whyLapizBlueTitle="Why Lapiz Blue for Mapei?"
        whyLapizBlueContent="Lapiz Blue is an authorised Mapei distributor across UAE, delivering premium construction chemicals trusted by professionals worldwide. From tile adhesives and grouts to waterproofing and concrete repair, we offer certified Mapei solutions backed by expert support. Build better with Mapei – powered by Lapiz Blue."
        accentColor="#23395B"
      />

      {/* Product Line Navigation */}
      <div className="relative py-12">
        <BrandProductNavResponsive brand={brand} />
      </div>

      {/* Solutions Section */}
      <MapeiSolutionsSection />

      {/* Grout Calculator Section */}
      <MapeiGroutCalculator />
      <div className="text-center mt-4 pb-8">
        <Link
          href="/mapei-grout-calculator"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Open calculator in full page &rarr;
        </Link>
      </div>

      {/* Brand Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#23395B] mb-4">
              Our Product Lines
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of {brand.name} products. Click on any
              product line above to learn more.
            </p>
          </div>

          {/* Product Lines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brand.productLines.map((productLine) => (
              <Link
                key={productLine.slug}
                href={`/brands/${brand.slug}/${productLine.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-md transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-[#23395B]/20"
              >
                <div className="mb-4">
                  <div className="inline-flex rounded-full p-3 bg-[#23395B]/10 group-hover:bg-[#23395B]/20 transition-colors">
                    <svg
                      className="h-6 w-6 text-[#23395B]"
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

                <h3 className="mb-2 text-xl font-semibold text-[#23395B] group-hover:text-[#1E6BA8] transition-colors">
                  {productLine.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {productLine.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#23395B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <MapeiAwardsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#BFD7EA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#23395B] mb-4">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-lg text-[#23395B]/80 mb-8 max-w-2xl mx-auto">
            Our technical experts are ready to assist you with product selection,
            specifications, and project recommendations for {brand.name} products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#23395B] rounded-lg transition-all duration-200 hover:bg-[#1a2a45] hover:shadow-lg hover:scale-105"
            >
              Contact Our Team
            </Link>
            <a
              href="https://wa.me/971488855257"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border-2 border-[#23395B] text-[#23395B] rounded-lg transition-all duration-200 hover:bg-[#23395B] hover:text-white hover:shadow-lg hover:scale-105"
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
            Back to All Brands
          </Link>
        </div>
      </section>
    </main>
  );
}

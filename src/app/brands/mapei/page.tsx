import type { Metadata } from "next";
import { StaticHeroPicture, HeroPreload } from "@/components/ui/static-hero-picture";
import Image from "next/image";
import Link from "next/link";
import { getBrandConfig } from "@/data/brandConfigs";
import { BrandProductNavResponsive } from "@/components/ui/brand-product-nav";
import { BackButton } from "@/components/ui/back-button";
import { MapeiVideoSection } from "@/components/brands/mapei-video-section";
import { MapeiAwardsSection } from "@/components/brands/mapei-awards-section";
import { BrandHubStory } from "@/components/brands/hub/brand-hub-story";
import { MapeiGroutCalculator } from "@/components/brands/mapei-grout-calculator";
import { BrandHubAnswer, BrandHubWhereToBuy, BrandHubQuestions, BrandHubCredential, BrandSystemExplainer } from "@/components/brands/hub/brand-hub-sections";
import { getBrandHub } from "@/data/brand-hub";
import { BrandHubProducts } from "@/components/brands/hub/brand-hub-products";
import { generateBrandJsonLd } from "@/lib/brand-schema";
import { HubFaq } from "@/components/brands/hub/hub-faq";
import { resolveBrandTheme } from "@/lib/brand-theme";

// Get Mapei brand config
const brand = getBrandConfig("mapei")!;

const hub = getBrandHub("mapei")!;
const jsonLd = generateBrandJsonLd(brand, "mapei", hub.faqs);

const LIVE_TITLE = "Mapei Products | Authorized Distributor UAE | Lapiz Blue";
const LIVE_DESCRIPTION =
  "Explore Mapei tile adhesives, grouts, and waterproofing systems at Lapiz Blue. World-leading construction chemicals with expert support across UAE.";

export const metadata: Metadata = {
  // The live title and description, kept word for word: this page already ranks
  // and the owner's standing rule is zero rank loss on anything that does.
  title: LIVE_TITLE,
  description: LIVE_DESCRIPTION,
  openGraph: {
    title: LIVE_TITLE,
    description: LIVE_DESCRIPTION,
    images: [brand.hero.src],
    url: "https://www.lapizblue.com/brands/mapei",
    siteName: "Lapiz Blue",
  },
  twitter: {
    card: "summary_large_image",
    title: LIVE_TITLE,
    description: LIVE_DESCRIPTION,
    images: [brand.hero.src],
  },
  alternates: {
    canonical: "https://www.lapizblue.com/brands/mapei",
  },
};

export default function MapeiPage() {
  return (
    <main className={`font-manrope bg-white text-[#23395B]`}>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

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
            <span style={{ color: resolveBrandTheme(brand.theme.primary).brandInk }} className="font-medium">
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
          <HeroPreload base={brand.hero.src.replace(/\.webp$/, "")} />
          <StaticHeroPicture base={brand.hero.src.replace(/\.webp$/, "")} alt={brand.hero.alt} />
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
            {brand.h1 ?? brand.name}
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

      <BrandHubAnswer copy={hub} brandName={brand.name} />
      <BrandSystemExplainer copy={hub} brandName={brand.name} />
      <BrandHubProducts brand={brand} />

      {/* Video Section */}
      <MapeiVideoSection />

      <BrandHubStory
        slug="mapei"
        brandName="Mapei"
        story="Mapei is a global leader in adhesives, sealants and chemical products for the building industry, trusted on everything from homes and hotels to airports and infrastructure worldwide. Founded in Italy in 1937, the brand is known for long-lasting, high-performance systems that support sustainable, modern construction - from tile and stone installation to waterproofing, flooring, concrete repair and more. When you see Mapei on site, you know the project team has chosen proven technology backed by decades of research, innovation and real jobsite experience."
        whyTitle="Why Lapiz Blue for Mapei?"
        why="Lapiz Blue is an authorised Mapei distributor across UAE, delivering premium construction chemicals trusted by professionals worldwide. From tile adhesives and grouts to waterproofing and concrete repair, we offer certified Mapei solutions backed by expert support. Build better with Mapei - powered by Lapiz Blue."
        sectors={["New building", "Restoration", "Commercial building", "Sports and urban fitting", "Private spaces", "Industrial infrastructure", "Marine"]}
      />


      {/* Product Line Navigation */}
      <div className="relative py-12">
        <BrandProductNavResponsive brand={brand} />
      </div>


      {/* Grout Calculator Section */}
      <MapeiGroutCalculator />
      <div className="text-center mt-4 pb-8">
        <Link
          href="/mapei-grout-calculator"
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          Open calculator in full page &rarr;
        </Link>
      </div>




      {/* Awards Section */}
      <MapeiAwardsSection />

      <BrandHubWhereToBuy copy={hub} brandName={brand.name} />
      <BrandHubQuestions copy={hub} brandName={brand.name} />
      <BrandHubCredential copy={hub} brandName={brand.name} />
      <HubFaq faqs={hub.faqs} brandName={brand.name} slug={"mapei"} />

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
              href="https://wa.me/971502814338"
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

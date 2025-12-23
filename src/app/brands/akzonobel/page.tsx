import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBrandConfig } from "@/data/brandConfigs";
import { BrandProductNavResponsive } from "@/components/ui/brand-product-nav";
import { BackButton } from "@/components/ui/back-button";
import { AkzoNobelVideoSection } from "@/components/brands/akzonobel/akzonobel-video-section";
import { BrandInfoSection } from "@/components/ui/brand-info-section";
import { FlipLogoCard } from "@/components/brands/akzonobel/flip-logo-card";
import { AkzoNobelProductCards } from "@/components/brands/akzonobel/akzonobel-product-cards";

// Get AkzoNobel brand config
const brand = getBrandConfig("akzonobel")!;

// SEO Metadata
export const metadata: Metadata = {
  title: "AkzoNobel & Dulux Paints | Official UAE Distributor | Lapiz Blue",
  description:
    "Shop AkzoNobel and Dulux paints in UAE. Premium interior & exterior paints, Weathershield, Professional range. Official distributor with branches in Dubai, Abu Dhabi & Sharjah.",
  keywords: [
    "AkzoNobel UAE",
    "Dulux paints Dubai",
    "Dulux Weathershield",
    "interior paint UAE",
    "exterior paint Dubai",
    "paint supplier UAE",
    "Lapiz Blue AkzoNobel",
  ],
  openGraph: {
    title: "AkzoNobel & Dulux Paints | Lapiz Blue UAE",
    description:
      "Premium AkzoNobel and Dulux paints. Interior, exterior, and professional coating solutions. Official UAE distributor.",
    url: "https://www.lapizblue.com/brands/akzonobel",
    siteName: "Lapiz Blue",
    images: [
      {
        url: "/images/brands/akzonobel/hero.webp",
        width: 1920,
        height: 384,
        alt: "AkzoNobel Dulux Paints - Colours that Inspire",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AkzoNobel & Dulux Paints | Lapiz Blue UAE",
    description:
      "Premium AkzoNobel and Dulux paints. Interior, exterior, and professional coating solutions.",
    images: ["/images/brands/akzonobel/hero.webp"],
  },
  alternates: {
    canonical: "https://www.lapizblue.com/brands/akzonobel",
  },
};

export default function AkzoNobelPage() {
  return (
    <main className="font-manrope bg-white text-[#1a2b5f]">
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
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full bg-white flex items-center justify-center">
        {/* Background Image - natural aspect ratio centered with white padding */}
        <div className="relative w-full">
          <Image
            src="/images/brands/akzonobel/hero.webp"
            alt="AkzoNobel Dulux Paints - Colours that Inspire"
            width={1920}
            height={384}
            sizes="100vw"
            className="w-full h-auto"
            quality={90}
            priority
          />
          {/* Overlay gradient - AkzoNobel brand blue tones */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2b5f]/70 via-[#1a2b5f]/50 to-[#1a2b5f]/30" />

          {/* Hero Content - positioned over the image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          {/* Flip Logo Card - AkzoNobel & Dulux (Client Component) */}
          <div className="mb-6">
            <FlipLogoCard
              akzoNobelLogo={brand.logo}
              duluxLogo="/images/brands/akzonobel/dulux-logo.webp"
              className="w-[220px] h-[100px] sm:w-[260px] sm:h-[110px] md:w-[300px] md:h-[120px]"
            />
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl uppercase">
            {brand.name}
          </h1>
          <p className="max-w-2xl text-lg text-white md:text-xl lg:text-2xl mb-6 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg">
            Global leader in paints and coatings. Home of Dulux in UAE.
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
                aria-hidden="true"
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
                aria-hidden="true"
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

      {/* Video Section (Client Component) */}
      <AkzoNobelVideoSection />

      {/* Brand Info Section (Client Component) */}
      <BrandInfoSection
        brandName="AkzoNobel & Dulux"
        brandDescription="If you've ever walked into a beautifully painted home or admired the finish on a landmark building, chances are you've seen AkzoNobel's work. Since 1792, this Dutch company has been perfecting the art and science of paints and coatings. Their most famous brand? Dulux - the name that's become synonymous with quality paint across the Middle East and beyond. What makes Dulux special isn't just the colours (though they have thousands). It's the understanding that paint needs to perform differently in our climate - handling humidity, heat, and dust while still looking fresh years later."
        whyLapizBlueTitle="Why Lapiz Blue for Dulux Paints?"
        whyLapizBlueContent="We're not just another distributor - we're your colour partners. When you work with Lapiz Blue, you get access to the full Dulux range plus something harder to find: people who actually understand paint. Need help picking the right shade for a villa in Abu Dhabi? We've got you. Specifying coatings for a commercial tower in Dubai? Our technical team has seen it all. We stock everything from Dulux Weathershield for exteriors to Dulux Professional for large-scale projects, with delivery across the UAE from our branches in Dubai, Abu Dhabi, and Sharjah."
        accentColor="#1a2b5f"
      />

      {/* Product Line Navigation (Client Component) */}
      <div className="relative py-12">
        <BrandProductNavResponsive brand={brand} />
      </div>

      {/* Product Cards Section (Client Component) */}
      <AkzoNobelProductCards />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1a2b5f] to-[#2a4080]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Choosing the Right Colour?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our colour experts are ready to assist you with product selection,
            colour matching, and project recommendations for AkzoNobel and Dulux products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[#1a2b5f] bg-white rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-lg hover:scale-105"
            >
              Contact Our Team
            </Link>
            <a
              href="https://wa.me/971502814338"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border-2 border-white text-white rounded-lg transition-all duration-200 hover:bg-white hover:text-[#1a2b5f] hover:shadow-lg hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
            className="inline-flex items-center text-gray-600 hover:text-[#1a2b5f] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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

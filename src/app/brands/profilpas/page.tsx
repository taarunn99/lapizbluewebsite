import type { Metadata } from "next";
import Link from "next/link";
import { getBrandConfig } from "@/data/brandConfigs";
import { BrandProductNavResponsive } from "@/components/ui/brand-product-nav";
import { BackButton } from "@/components/ui/back-button";
import { BrandInfoSection } from "@/components/ui/brand-info-section";
import { ProfilpasFeaturesSection } from "@/components/brands/profilpas-features-section";
import { ProfilpasHeroSection } from "@/components/brands/profilpas-hero-section";
import { ProfilpasProductGrid } from "@/components/brands/profilpas-product-grid";
import { ProfilpasCtaSection } from "@/components/brands/profilpas-cta-section";

// Get Profilpas brand config
const brand = getBrandConfig("profilpas")!;

export const metadata: Metadata = {
  title: "Profilpas Tile Profiles UAE | Italian Tile Trims & Profiles - Lapiz Blue",
  description:
    "Profilpas UAE - Italian tile profiles, tile trims, corner profiles, stair nosings, movement joints, skirting boards & shower drains. Official distributor Lapiz Blue. Dubai, Abu Dhabi, Sharjah.",
  keywords: [
    "Profilpas UAE",
    "tile profiles UAE",
    "tile trims Dubai",
    "corner profiles UAE",
    "stair nosing Dubai",
    "movement joints UAE",
    "skirting boards Dubai",
    "shower drain UAE",
    "Italian tile profiles",
    "Profilpas distributor UAE",
    "tile edge profiles",
    "Lapiz Blue"
  ],
  openGraph: {
    title: "Profilpas Tile Profiles UAE | Italian Tile Trims - Lapiz Blue",
    description:
      "Profilpas Italian tile profiles from Lapiz Blue - official UAE distributor. Corner profiles, stair nosings, movement joints, skirting boards. Dubai, Abu Dhabi, Sharjah.",
    images: [brand.hero.src],
    url: "/brands/profilpas",
    type: "website",
    siteName: "Lapiz Blue",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profilpas Tile Profiles UAE | Lapiz Blue",
    description:
      "Official Profilpas distributor in UAE. Italian tile trims, corner profiles, stair nosings, skirting boards & shower drains. Dubai, Abu Dhabi, Sharjah.",
    images: [brand.hero.src],
  },
  alternates: {
    canonical: "/brands/profilpas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProfilpasPage() {
  return (
    <main className="font-[family-name:var(--font-manrope)] bg-white text-[#395c56]">
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

      {/* Hero Section with Animations */}
      <ProfilpasHeroSection
        heroAlt={brand.hero.alt}
        logo={brand.logo}
        brandName={brand.name}
        website={brand.website}
      />

      {/* Brand Info Section */}
      <BrandInfoSection
        brandName="Profilpas"
        brandDescription="Since 1976, Profilpas has specialised in designing technical and decorative profiles for wall and floor finishes in materials like ceramic, marble, wood, laminate, LVT, and carpet. Their extensive product range also features skirting profiles, bathroom drainage systems, linear shower channels, lighting trims, edge protectors for balconies, terraces, stair nosings, installation tools, and pedestals for raised outdoor flooring. With a diverse material selection that includes aluminium, stainless steel, brass, and PVC, Profilpas products combine durability with refined aesthetics. Their solutions are widely used across residential interiors, commercial properties, hospitality spaces, healthcare facilities, schools, spas, and even maritime environments."
        whyLapizBlueTitle="Why Lapiz Blue for Profilpas?"
        whyLapizBlueContent="Lapiz Blue is an authorised Profilpas distributor across UAE, delivering premium Italian profiles and finishing solutions trusted by architects and contractors worldwide. From decorative trims and skirting boards to shower channels and stair nosings, we offer certified Profilpas products backed by expert technical support. Achieve flawless finishes with Profilpas – powered by Lapiz Blue."
        accentColor="#395c56"
      />

      {/* Product Line Navigation */}
      <div className="relative py-12">
        <BrandProductNavResponsive brand={brand} />
      </div>

      {/* Features Section */}
      <ProfilpasFeaturesSection />

      {/* Product Lines Grid with Animations */}
      <ProfilpasProductGrid
        productLines={brand.productLines}
        brandSlug={brand.slug}
        brandName={brand.name}
      />

      {/* CTA Section with Animations */}
      <ProfilpasCtaSection brandName={brand.name} />

      {/* Back to All Brands */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/brands"
            className="inline-flex items-center text-gray-600 hover:text-[#395c56] transition-colors"
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

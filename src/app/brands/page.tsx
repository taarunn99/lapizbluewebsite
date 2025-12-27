import type { Metadata } from "next";
import { BrandsHeroSection } from '@/components/ui/brands-hero-section';
import { BrandsLocationMap } from '@/components/ui/brands-location-map';
import { BrandsStatsSection } from '@/components/ui/brands-stats-section';
import { BrandsShowcaseSection } from '@/components/ui/brands-showcase-section';
import { BrandsGridSection } from '@/components/ui/brands-grid-section';
import { ConstructionToolsSection } from '@/components/ui/construction-tools-section';
import { OurProjectsSection } from '@/components/ui/our-projects-section';
import { CompanyProfileSection } from '@/components/ui/company-profile-section';
import { ScrollPositionRestorer } from '@/components/ui/scroll-position-restorer';

export const metadata: Metadata = {
  title: "Our Brands | Mapei, Weber, AkzoNobel & More | Lapiz Blue",
  description: "Explore 25+ premium construction brands including Mapei, Weber, AkzoNobel Dulux, Laticrete & Profilpas. Authorized distributor serving UAE contractors.",
  alternates: {
    canonical: "https://www.lapizblue.com/brands",
  },
  openGraph: {
    title: "Our Brands | Lapiz Blue UAE",
    description: "Explore 25+ premium construction brands including Mapei, Weber, AkzoNobel, Laticrete & Profilpas. Authorized distributor serving UAE.",
    url: "https://www.lapizblue.com/brands",
    siteName: "Lapiz Blue",
    images: ["/images/brands/brandspagehero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Brands | Lapiz Blue UAE",
    description: "Explore 25+ premium construction brands including Mapei, Weber, AkzoNobel, Laticrete & Profilpas. Authorized distributor serving UAE.",
    images: ["/images/brands/brandspagehero.webp"],
  },
};

export default function BrandsPage() {
  return (
    <main className="w-full">
      <ScrollPositionRestorer />
      <BrandsHeroSection
        logo={{
          url: "/logos/lapizbluelogodarkblue.svg",
          alt: "Lapiz Blue Logo",
          text: "Lapiz Blue",
        }}
        slogan="AUTHENTIC CONSTRUCTION EXCELLENCE"
        title={
          <>
            We Stock Icons <br />
            <span className="text-[#406E8E]">Not Imitations</span>
          </>
        }
        subtitle="From Mapei and Profilpas to AkzoNobel and beyond - we represent 25+ powerhouse brands that lead the global construction industry, not just follow it."
        backgroundImage="/images/brands/brandspagehero.webp"
        contactInfo={{
          website: "lapizblue.com",
          instagram: "@lapizblue.dxb",
          address: "Dubai, Abu Dhabi & Sharjah",
        }}
      />

      <BrandsLocationMap />

      <BrandsGridSection />

      <ConstructionToolsSection />

      <BrandsShowcaseSection />

      <BrandsStatsSection />

      <OurProjectsSection />

      <CompanyProfileSection />
    </main>
  );
}

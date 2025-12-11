import type { Metadata } from "next";
import { BrandsHeroSection } from '@/components/ui/brands-hero-section';
import { BrandsLocationMap } from '@/components/ui/brands-location-map';
import { BrandsStatsSection } from '@/components/ui/brands-stats-section';
import { BrandsShowcaseSection } from '@/components/ui/brands-showcase-section';
import { BrandsGridSection } from '@/components/ui/brands-grid-section';
import { ConstructionToolsSection } from '@/components/ui/construction-tools-section';
import { OurProjectsSection } from '@/components/ui/our-projects-section';
import { CompanyProfileSection } from '@/components/ui/company-profile-section';

export const metadata: Metadata = {
  title: "Our Brands | Lapiz Blue - Premium Construction Materials UAE & GCC",
  description: "Explore 25+ premium building material brands across UAE & GCC. Authorized supplier of Mapei, Weber, AkzoNobel Dulux paints, Laticrete tile adhesives, waterproofing solutions & professional construction tools for contractors.",
  keywords: ["building materials UAE", "construction materials GCC", "Mapei UAE", "Weber GCC", "AkzoNobel Dulux paints", "tile adhesives", "waterproofing UAE", "construction tools", "Laticrete GCC", "Profilpas profiles", "building materials Dubai", "construction supplier Abu Dhabi"],
  openGraph: {
    title: "Our Brands | Lapiz Blue - Building Materials Supplier UAE & GCC",
    description: "Authorized distributor of 25+ world-class construction brands including Mapei, Weber, AkzoNobel, Laticrete. Premium tile adhesives, waterproofing, paints & tools across UAE, Saudi Arabia & GCC region.",
    images: ["/images/brands/brandspagehero.svg"],
  },
};

export default function BrandsPage() {
  return (
    <main className="w-full">
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
        backgroundImage="/images/brands/brandspagehero.svg"
        contactInfo={{
          website: "lapizblue.com",
          phone: "+971 50 281 4338",
          address: "Dubai, Abu Dhabi & Sharjah",
        }}
      />

      <BrandsLocationMap />

      <BrandsStatsSection />

      <BrandsShowcaseSection />

      <BrandsGridSection />

      <ConstructionToolsSection />

      <OurProjectsSection />

      <CompanyProfileSection />
    </main>
  );
}

'use client';

import { BrandsHeroSection } from '@/components/ui/brands-hero-section';
import { BrandsLocationMap } from '@/components/ui/brands-location-map';
import { BrandsStatsSection } from '@/components/ui/brands-stats-section';
import { BrandsShowcaseSection } from '@/components/ui/brands-showcase-section';
import { BrandsGridSection } from '@/components/ui/brands-grid-section';
import { ConstructionToolsSection } from '@/components/ui/construction-tools-section';
import { OurProjectsSection } from '@/components/ui/our-projects-section';
import { CompanyProfileSection } from '@/components/ui/company-profile-section';

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

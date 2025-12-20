import type { Metadata } from "next";
import Image from "next/image";
import { Dancing_Script, Manrope } from "next/font/google";
import { PhotoGallery } from "@/components/ui/gallery";
import { MDSection } from "@/components/MDSection.client";
import { MissionVisionSection } from "@/components/MissionVisionSection.client";
import { CertificatesSection } from "@/components/CertificatesSection.client";
import { TeamSection } from "@/components/TeamSection.client";
import { GreenInitiativeSection } from "@/components/GreenInitiativeSection.client";
import { LapizGroupSection } from "@/components/LapizGroupSection";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dancing-script",
  display: "swap",
  preload: true,
  fallback: ["cursive", "system-ui"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "About Us - Lapiz Blue",
  description:
    "From the dust of today, we craft the foundation of tomorrow. Built on trust, powered by people, and driven by solutions.",
  openGraph: {
    images: ["/images/about/aboutpageimages/hero-flowers-1920.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main className={`${manrope.variable} ${dancingScript.variable} bg-white text-[#161925]`}>
      {/* ===== HERO + CONTENT COMBINED SECTION ===== */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0 w-full h-[85vh] sm:h-[90vh] md:h-[95vh]">
          <Image
            src="/images/about/aboutpageimages/hero-flowers-1920.jpg"
            alt="About Lapiz Blue As a Team"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 pt-32 sm:pt-40 md:pt-48 lg:pt-56 xl:pt-64 pb-8">
          <h1
            className="text-center max-w-[1000px] mx-auto
                       text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                       leading-snug sm:leading-snug md:leading-snug
                       text-[#161925] font-normal"
            style={{ fontFamily: 'var(--font-dancing-script)' }}
          >
            From the dust of today, we craft the foundation of tomorrow — one layer, one bond, one dream at a time.
          </h1>
        </div>

        {/* Blue Box with Overlapping Image - Anchored to Right Edge */}
        <div className="relative z-20 w-full mt-20 sm:mt-24 md:mt-28 lg:mt-36 xl:mt-44">
          {/* Container anchored to right */}
          <div className="relative ml-auto w-full lg:w-[85%] xl:w-[80%] pl-4 sm:pl-6 md:pl-8">
            {/* Blue Card - bleeds off right edge */}
            <div className="relative bg-[#406E8E] rounded-l-[20px] lg:rounded-[20px] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 lg:mr-[-100px]">
              <div className="lg:grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_520px] gap-6">
                {/* Left column - text content */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl leading-tight">
                    Behind Every Build, There's a Team That Cares
                  </h2>

                  {/* First part of paragraph - goes above image */}
                  <p className="text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                    At Lapiz Blue, we don't just sell materials — we build relationships. Our backbone? A powerhouse team of 50+ skilled professionals who bring deep technical know-how, a passion for problem-solving, and a relentless drive to deliver results.
                  </p>

                  {/* Second paragraph */}
                  <p className="text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                    Whether you're looking for tile profiles, Mapei construction chemicals, PVC trims, or vacuum elevators, our experts are here to help — not just sell. With over 2,800 satisfied customers worldwide, we've earned more than just business — we've earned trust.
                  </p>

                  <ul className="text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl space-y-1.5 pl-0 list-none">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Fast responses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Reliable stock</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Solution-driven support</span>
                    </li>
                  </ul>
                </div>

                {/* Right column - image */}
                <div className="relative mt-6 lg:mt-0 px-4 lg:px-0">
                  <div className="relative rounded-[20px] overflow-hidden aspect-[13/17] shadow-2xl">
                    <Image
                      src="/images/about/aboutpageimages/aboutus6.jpg"
                      alt="Inside the Lapiz Blue office with team at work"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 520px"
                      quality={95}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right Text - More spacing to avoid overlap */}
          <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40 pb-16 sm:pb-20 md:pb-24 flex justify-center lg:justify-end px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <p className="text-[#161925] font-medium text-center lg:text-right
                         text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                         leading-relaxed max-w-[800px]">
              We&apos;re proud to be a leading name in the building materials industry, known not just for products — but for people who care.{" "}
              <span className="font-bold text-[#406E8E]">Lapiz Blue</span>{" "}
              isn&apos;t just a supplier. We&apos;re your construction partner — every step of the way.
            </p>
          </div>
        </div>

        {/* Lapiz Group of Companies */}
        <LapizGroupSection />

        {/* Photo Gallery Section */}
        <PhotoGallery animationDelay={0.3} />
      </section>

      {/* Managing Director Section */}
      <MDSection />

      {/* Mission & Vision Section */}
      <MissionVisionSection />

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Team Section */}
      <TeamSection />

      {/* Green Initiative Section */}
      <GreenInitiativeSection />
    </main>
  );
}

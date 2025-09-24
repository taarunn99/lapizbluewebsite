// app/about/page.tsx  (STEP 1: hero only, fully SSR)
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us - Lapiz Blue",
  description:
    "Built on trust, powered by people, and driven by solutions. Learn how Lapiz Blue delivers world-class construction materials across the UAE.",
  openGraph: {
    images: ["/images/about/aboutpageimages/aboutus1.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/about/aboutpageimages/image3.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white text-[#23395B]">
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-[60svh] md:min-h-[70svh]">
        <Image
          src="/images/about/aboutpageimages/aboutus1.png"
          alt="About hero background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1
            className="px-4 text-center text-white font-semibold leading-tight
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-[1100px]"
          >
            From the dust of today, we craft the foundation of tomorrow — one layer, one bond, one dream at a time.
          </h1>
        </div>
      </section>

      {/* ===== SECTION A: Left copy card + Right image ===== */}
      <section className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-start">
          {/* Copy card */}
          <div className="rounded-2xl bg-[#3F6585] text-white p-6 sm:p-8 lg:p-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Behind Every Build, There’s a Team That Cares
            </h2>
            <p className="leading-7 mb-4">
              At Lapiz Blue, we don’t just sell materials — we build relationships.
              Our backbone? A powerhouse team of 50+ skilled professionals who bring deep technical know-how, a passion for problem-solving, and a relentless drive to deliver results.
            </p>
            <p className="leading-7 mb-4">
              Whether you’re looking for tile profiles, Mapei construction chemicals, PVC trims, or vacuum elevators,
              our experts are here to help — not just sell. With over 2,800 satisfied customers worldwide, we’ve earned more than just business — we’ve earned trust.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fast responses</li>
              <li>Reliable stock</li>
              <li>Solution-driven support</li>
            </ul>
          </div>

          {/* Right image */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/5]">
            <Image
              src={"/images/about/aboutpageimages/image3.png"}
              alt="Modern interior in calm blue tones"
              fill
              className="object-cover"
              sizes="(min-width:1200px) 600px, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== SECTION B: Bottom-left tile panel + Right paragraph ===== */}
      <section className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8 pb-20 md:pb-28">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 items-start">
          {/* Left big blue panel with bathroom image & 'from slab' text */}
          <div className="relative rounded-2xl bg-[#CFE0F4] p-3 sm:p-4 md:p-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src={"/images/about/aboutpageimages/aboutus-bathroom.png"}
                alt="Luxury bathroom with marble tiles"
                fill
                className="object-cover"
                sizes="(min-width:1200px) 560px, 50vw"
                loading="lazy"
              />
            </div>
            <div className="absolute left-6 sm:left-8 bottom-6 sm:bottom-8 text-white font-semibold uppercase leading-[0.9] tracking-[-0.02em]
                            text-5xl sm:text-6xl md:text-7xl select-none pointer-events-none">
              from<br />slab
            </div>
          </div>

          {/* Right paragraph block */}
          <div className="flex items-center">
            <p className="max-w-prose text-[17px] md:text-lg leading-8">
              We’re proud to be a leading name in the building materials industry, known not just for products — but for people who care.{" "}
              <a
                href="/"
                className="text-[#3b27b9] font-semibold hover:underline focus:underline underline-offset-4"
              >
                Lapiz Blue
              </a>{" "}
              isn’t just a supplier. We’re your construction partner — every step of the way.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


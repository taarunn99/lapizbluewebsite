import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Brands - Lapiz Blue",
    description:
      "Brands that we offer and partner up with - Lapiz Blue. Get a FREE Quote today!",
  };

export default function Hero() {
  return (
    <main className="w-full text-white">
      {/* ===================== HERO ===================== */}
      <section className="relative mx-auto w-full max-w-[1920px] h-[calc(100svh-75px)]">
        <Image
          src="/images/brands/brandspageimages/brandspagehero.jpg"
          alt="Lapiz Blue hero"
          fill
          priority
          fetchPriority="high"
          sizes="(min-width:1920px) 1920px, 100vw"
          className="object-cover"
        />

        {/* headline (kept near your Figma placement) */}
        <h1 className="absolute top-[205px] left-1/2 -translate-x-[584px] font-semibold text-transparent bg-clip-text [background:linear-gradient(180deg,#535e8b,#161925)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] w-[1139px] leading-tight text-4xl md:text-5xl lg:text-6xl">
          We Stock Icons, Not Imitations.
        </h1>

        {/* brand nav hint (right top links were moved to your global Navbar) */}

        {/* subheadline block */}
        <p className="absolute top-[838px] left-[390px] font-semibold text-transparent bg-clip-text [background:linear-gradient(180deg,#535e8b,#161925)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] w-[1139px] leading-tight text-3xl md:text-4xl">
          We Stock Icons, Not Imitations.
        </p>
      </section>

      {/* ===================== STATS / PILLARS ===================== */}
      <section className="relative mx-auto w-full max-w-[1920px] px-4 md:px-8 py-16 md:py-24 text-[#23395B]">
        {/* lead line */}
        <h2 className="text-center font-semibold text-transparent bg-clip-text [background:linear-gradient(180deg,#23395b,#406e8e)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-3xl md:text-4xl mb-8">
          Explore
        </h2>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* left stat card */}
          <div className="relative rounded-2xl bg-[#517fa4] text-white shadow-md min-h-[500px] overflow-hidden">
            <div className="absolute inset-0">
              {/* optional background art */}
              {/* <Image src="/images/home/homepageimages/stat-left.png" alt="" fill className="object-cover opacity-20" /> */}
            </div>
            <div className="relative p-10">
              <p className="text-6xl md:text-7xl font-semibold bg-gradient-to-b from-[#bfd7ea] to-white bg-clip-text text-transparent">
                6,000+
              </p>
              <p className="mt-2 text-5xl font-semibold bg-gradient-to-b from-[#bfd7ea] to-white bg-clip-text text-transparent">
                400+
              </p>
              <div className="mt-6 text-[28px]/[34px] max-w-[460px]">
                <p className="font-semibold text-white/95">customer base.</p>
                <p className="text-white/90">resellers.</p>
                <p className="text-white/90">Backed by proven delivery and support.</p>
              </div>
            </div>
          </div>

          {/* right image tile (light blue) */}
          <div className="relative rounded-2xl bg-[#cfe0f4] min-h-[500px]">
            <Image
              src="/images/home/homepageimages/homepagebathroom.png"
              alt="Showcase bathroom"
              fill
              className="object-cover rounded-2xl"
              sizes="(min-width:1920px) 960px, 100vw"
              loading="lazy"
            />
          </div>
        </div>

        {/* copy line under stats */}
        <p className="mt-10 mx-auto max-w-[1510px] text-center text-lg md:text-xl font-light text-[#6b7280]">
          a curated selection of top-tier building materials from industry-leading brands – chosen for their strength,
          style, and proven performance across every stage of construction.
        </p>

        {/* brand strip (left & center tiles from your Figma) */}
        <div className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
            <Image
              src="/images/home/homepageimages/left-vertical.jpg"
              alt="Vertical product tile"
              fill
              className="object-cover"
              sizes="(min-width:1024px) 33vw, 100vw"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col gap-6 md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[1/1]">
              <Image
                src="/images/home/homepageimages/mid-square.jpg"
                alt="Mid square tile"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 66vw, 100vw"
                loading="lazy"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
              <Image
                src="/images/home/homepageimages/wide.jpg"
                alt="Wide strip"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1024px) 66vw, 100vw"
              />
            </div>
          </div>
        </div>

        {/* mid copy */}
        <p className="mt-8 text-black text-2xl max-w-5xl ml-auto">
          From <span className="text-[#3b82f6]">Mapei</span> and <span className="text-[#3b82f6]">Profilpas</span> to{" "}
          <span className="text-[#3b82f6]">AkzoNobel</span> and beyond — we represent{" "}
          <span className="text-[#3b82f6] font-semibold">25+</span> powerhouse brands that lead the global construction
          industry, not just follow it.
        </p>

        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[10px] bg-gradient-to-b from-[#161925] to-[#535e8b] px-8 h-[70px] text-white text-2xl font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* ===================== BRANDS x PARTNERS ===================== */}
      <section className="mx-auto w-full max-w-[1920px] px-4 md:px-8 py-16 text-[#23395B]">
        <h2 className="text-center font-semibold text-transparent bg-clip-text [background:linear-gradient(180deg,#535e8b,#161925)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-3xl md:text-4xl">
          Brands x Partners
        </h2>
        <div className="mx-auto mt-4 h-px w-full max-w-[1355px] bg-black/10" />

        {/* logo bar (replace file names with your actual logos) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
          <div className="relative h-[90px]">
            <Image
              src="/images/home/homepageimages/brands/mapei.svg"
              alt="Mapei"
              fill
              className="object-contain"
              sizes="200px"
              loading="lazy"
            />
          </div>
          <div className="relative h-[90px]">
            <Image
              src="/images/home/homepageimages/brands/profilpas.svg"
              alt="Profilpas"
              fill
              className="object-contain"
              sizes="200px"
              loading="lazy"
            />
          </div>
          <div className="relative h-[90px]">
            <Image
              src="/images/home/homepageimages/brands/akzonobel.svg"
              alt="AkzoNobel"
              fill
              className="object-contain"
              sizes="200px"
              loading="lazy"
            />
          </div>
          <div className="relative h-[90px]">
            <Image
              src="/images/home/homepageimages/brands/forbo.svg"
              alt="Forbo"
              fill
              className="object-contain"
              sizes="200px"
              loading="lazy"
            />
          </div>
          <div className="relative h-[90px]">
            <Image
              src="/images/home/homepageimages/brands/xchem.svg"
              alt="X-Chem"
              fill
              className="object-contain"
              sizes="200px"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===================== CONTACT PREVIEW PANEL ===================== */}
      <section className="relative mx-auto w-full max-w-[1920px] px-4 md:px-8 py-20">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* left text */}
          <div>
            <h3 className="text-[#0f172a] text-4xl font-semibold">Precision Starts With a Hello.</h3>
            <p className="mt-4 text-[#6b7280] text-xl max-w-[660px]">
              We’d love to hear from you — whether it’s a product query, a collaboration idea, or just a curious hello.
              Our team’s always just a message away.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-6 w-6 bg-gray-300" aria-hidden />
              <span className="text-[#334155] text-lg">agree to the boring t&c</span>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-gradient-to-b from-[#161925] to-[#535e8b] px-8 h-[70px] text-white text-2xl font-semibold"
            >
              Fire Away
            </Link>
          </div>

          {/* right glass panel (visual only) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[520px]">
            <Image
              src="/images/meshgradientbase.png"
              alt="Contact background"
              fill
              className="object-cover opacity-80"
              sizes="(min-width:1024px) 50vw, 100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 p-6">
              <div className="absolute inset-0 rounded-2xl bg-black/10" />
              <div className="absolute top-12 left-8 right-8 rounded-2xl bg-gray-300/20 h-[116px]" />
              <div className="absolute top-40 left-8 right-8 rounded-2xl bg-gray-300/20 h-[116px]" />
              <div className="absolute top-4 left-8 right-8 rounded-2xl bg-gray-300/20 h-[116px]" />
              <div className="absolute top-[330px] left-8 right-8 rounded-2xl bg-gray-300/20 h-[326px]" />
              <p className="absolute top-[300px] left-16 text-black/80 text-lg">Write your message...</p>
              <p className="absolute top-[180px] left-16 text-black/80 text-lg">E-mail</p>
              <p className="absolute top-[240px] left-16 text-black/80 text-lg">Phone</p>
              <p className="absolute top-[70px] left-16 text-black/80 text-lg">Full Name and Company Name</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

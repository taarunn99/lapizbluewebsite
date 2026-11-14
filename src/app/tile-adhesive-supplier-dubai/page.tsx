import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StaticHeroPicture, HeroPreload } from "@/components/ui/static-hero-picture";
import { BrandsLocationMap } from "@/components/ui/brands-location-map";

// Category page for "tile adhesive supplier in Dubai", a child of the
// construction chemicals hub. Every product, class and claim here is taken
// from the tile-adhesives-and-grouts product lines in src/data/brandConfigs.ts
// for Mapei, Laticrete, Weber and Kerakoll, and every company figure from the
// hub and the waterproofing category page.

const PAGE_URL = "https://www.lapizblue.com/tile-adhesive-supplier-dubai";
const HUB_URL = "https://www.lapizblue.com/construction-chemicals-dubai";
const ORG_ID = "https://www.lapizblue.com/#organization";
const COVER = "/images/brands/mapei/tile-adhesives/tile-adhesives-hero";
const COVER_WIDTHS = [640, 828, 1200, 1440, 1920];
const WHATSAPP =
  "https://api.whatsapp.com/send?phone=971502814338&text=" +
  encodeURIComponent("Hi Lapiz Blue, I need a quote for tile adhesive in Dubai.");

export const metadata: Metadata = {
  title: "Tile Adhesive Supplier in Dubai, UAE | Lapiz Blue",
  description:
    "Lapiz Blue General Trading LLC supplies Mapei, Laticrete, Weber and Kerakoll tile adhesives and grouts ex stock in Dubai, with TDS, SDS and next day delivery.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tile Adhesive Supplier in Dubai, UAE | Lapiz Blue",
    description:
      "Authorized distributor of Mapei, Laticrete, Weber and Kerakoll tile adhesives and grouts: C1, C2, S1, S2 and epoxy classes for porcelain, stone and wet areas, from three UAE distribution centres.",
    url: PAGE_URL,
    siteName: "Lapiz Blue",
    type: "website",
    images: [`${COVER}-1440.webp`],
  },
};

const LINES = {
  mapei: { label: "Mapei tile adhesives and grouts", href: "/brands/mapei/tile-adhesives-and-grouts" },
  laticrete: { label: "Laticrete tile adhesives and grouts", href: "/brands/laticrete/tile-adhesives-and-grouts" },
  weber: { label: "Weber tile adhesives and grouts", href: "/brands/weber/tile-adhesives-and-grouts" },
  kerakoll: { label: "Kerakoll tile adhesives and grouts", href: "/brands/kerakoll/tile-adhesives-and-grouts" },
};

// Adhesive and grout classes held, each backed by named products in brandConfigs
const CLASSES = [
  {
    name: "C1 standard adhesives",
    body: "Weber webercol fix 401 is the standard C1T cementitious adhesive for basic ceramic tile installations on walls and floors.",
  },
  {
    name: "C2 improved adhesives",
    body: "Weber webercol pro (C2TE), Mapei Kerabond T and Laticrete 254 Platinum are improved cementitious adhesives for porcelain tiles and larger formats that need stronger bond strength than a C1 product.",
  },
  {
    name: "S1 deformable adhesives",
    body: "Weber webercol premium (C2TES1), Mapei Keraflex Maxi S1 Zero and Laticrete 335 Pro Premium Flexible add deformability for substrates with thermal movement, heated floors and large format tiles.",
  },
  {
    name: "S2 highly deformable adhesives",
    body: "Weber webercol flex (C2TES2) is the most deformable adhesive in the range, specified for large format panels and facade tiling where movement is greatest.",
  },
  {
    name: "Epoxy adhesives and grouts",
    body: "Mapei Kerapoxy, Weber weberepox easy and Laticrete SpectraLock Pro Premium are two component epoxy systems for swimming pools, commercial kitchens and other chemically aggressive sites.",
  },
];

const SCENARIOS = [
  {
    name: "Large format porcelain and gauged panels",
    body: "Large tiles and gauged porcelain panels need an adhesive engineered for full coverage without voids. Laticrete LHT mortars such as 325 Premium are built for tiles up to 3 metres, Weber webercol flex is the C2TES2 highly deformable adhesive for panels 60x120cm and larger, Mapei Keraflex Maxi S1 Zero is a no vertical slip adhesive with extended open time for large format tiles, and Kerakoll Biogel No Limits is a gel adhesive that bonds any material to any substrate for the most demanding jobs.",
    links: [LINES.laticrete, LINES.weber, LINES.mapei, LINES.kerakoll],
  },
  {
    name: "Natural stone and marble",
    body: "Marble and natural stone need an adhesive selected for the stone type to avoid staining and bleed through. Laticrete offers white thin-set mortars that prevent bleed through on light coloured stones, Kerakoll Biogel formulations suit moisture sensitive stones such as green marble, and Mapei recommends Tile Adhesive for Marbles and Tile Glue for Marbles based on stone type, thickness and installation area.",
    links: [LINES.laticrete, LINES.kerakoll, LINES.mapei],
  },
  {
    name: "Renovation over existing tiles",
    body: "Where demolition is not an option, Kerakoll Biogel gel adhesives are designed for renovation directly over existing dimensionally stable ceramic coverings, and Laticrete PRIME-N-BOND primer allows a new thin-set to bond to clean, sound existing tile. Both approaches remove the need to strip the old finish before retiling.",
    links: [LINES.kerakoll, LINES.laticrete],
  },
  {
    name: "Wet areas, bathrooms and kitchens",
    body: "Bathrooms, kitchens and commercial wet areas need a grout that will not stain or harbour bacteria under frequent cleaning. Mapei Kerapoxy and Kerapoxy Easy Design are two component epoxy grouts for hygiene sensitive spaces, Weber weberepox easy is the epoxy grout and adhesive for commercial kitchens and food areas, and Laticrete PermaColor cementitious grout with Water Dispersion Technology resists staining in residential and light commercial bathrooms.",
    links: [LINES.mapei, LINES.weber, LINES.laticrete],
  },
  {
    name: "Swimming pools and water features",
    body: "Permanent submersion and chlorine rule out a standard cementitious grout. Laticrete SpectraLock epoxy grout is formulated for swimming pools, fountains and spas with permanent water exposure, Weber weberepox easy resists pool chemicals and salt water, and Kerakoll Fugalite Bio is chlorine resistant and waterproof for pool and spa tiling.",
    links: [LINES.laticrete, LINES.weber, LINES.kerakoll],
  },
  {
    name: "Exterior facades and terraces",
    body: "Thermal movement on facades and terraces calls for a deformable adhesive, not a rigid one. Weber webercol flex (C2TES2) and webercol premium (C2TES1) are the S1 and S2 deformable adhesives Weber specifies for external applications in UAE climate conditions, and Mapei Keraflex Maxi S1 Zero gives the same deformability for large format exterior tiling.",
    links: [LINES.weber, LINES.mapei],
  },
  {
    name: "Heated floor systems",
    body: "Heated floors move as they cycle through temperature, so the adhesive and grout both need to flex with the substrate. Weber specifies S1 or S2 deformable adhesives such as webercol premium or webercol flex for heated floor installations, with a flexible grout used at the perimeters once the system has been commissioned and cycled before tiling.",
    links: [LINES.weber],
  },
];

const BRANDS = [
  {
    name: "Mapei",
    body: "Cementitious, deformable and epoxy adhesives and grouts for ceramic, porcelain and natural stone, with the TDS published on every Mapei product page.",
    products: ["Kerabond T", "Keraflex Maxi S1 Zero", "Mapeset", "Kerapoxy Adhesive", "Ultracolor Plus"],
    image: "/images/brands/mapei/tile-adhesives/kerabond-t.webp",
    alt: "Mapei Kerabond T cementitious tile adhesive",
    link: LINES.mapei,
  },
  {
    name: "Laticrete",
    body: "American thin-set, LHT and epoxy systems including PERMACOLOR and SpectraLock grouts, engineered for large format tiles, pools and commercial wet areas.",
    products: ["254 Platinum", "325 Premium", "335 Pro Premium Flexible", "PermaColor Grout", "SpectraLock Pro Premium"],
    image: "/images/brands/laticrete/tile-adhesives/254-platinum.webp",
    alt: "Laticrete 254 Platinum multipurpose thin-set tile adhesive",
    link: LINES.laticrete,
  },
  {
    name: "Weber (Saint-Gobain)",
    body: "EN12004 classified webercol adhesives from C1 to S2, plus weberepox easy epoxy grout, giving a clear performance rating for every tile size and exposure.",
    products: ["webercol fix 401", "webercol pro", "webercol premium", "webercol flex", "weberepox easy"],
    image: "/images/brands/weber/tile-adhesives/webercol-premium.webp",
    alt: "Weber webercol premium S1 deformable tile adhesive",
    link: LINES.weber,
  },
  {
    name: "Kerakoll",
    body: "Italian Biogel gel adhesives and Fugalite resin grouts with GreenBuilding certification, built for renovation over existing tiles and chemically demanding sites.",
    products: ["Biogel No Limits", "Biogel Extreme", "Biofast", "H40 Gel", "Fugalite Color"],
    image: "/images/brands/kerakoll/tile-adhesives/biogel-no-limits.webp",
    alt: "Kerakoll Biogel No Limits universal gel tile adhesive",
    link: LINES.kerakoll,
  },
];

const BRANCHES = [
  {
    emirate: "Dubai",
    heading: "Tile adhesive supplier in Dubai",
    address: "Shop 12 to 14, 4 Street, Al Quoz Industrial Area 4, Dubai",
    phone: "+971 4 885 5257",
    phoneHref: "tel:+97148855257",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
    body: "Head office and main warehouse in Al Quoz, serving Dubai, Jebel Ali and Dubai South. Same day collection for stock tile adhesive and grout, and next day site delivery across Dubai for orders placed before 3 pm.",
  },
  {
    emirate: "Abu Dhabi",
    heading: "Tile adhesive supplier in Abu Dhabi",
    address: "Shop 2, Mussafah Industrial Area 40, Abu Dhabi",
    phone: "+971 2 886 7753",
    phoneHref: "tel:+97128867753",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/@24.345846,54.488503,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e40e6c4e8e8e7:0x240c2ef83a9e23d6!8m2!3d24.345846!4d54.488503!16s%2Fg%2F11x7xg6svr?entry=ttu",
    body: "Open since 2021 with the same Mapei, Laticrete and Weber tile adhesive and grout ranges for Abu Dhabi city, Mussafah, Al Reem, Yas, Saadiyat and Al Ain, including the Al Wathba resort and Al Maya Island works we supplied.",
  },
  {
    emirate: "Sharjah",
    heading: "Tile adhesive supplier in Sharjah",
    address: "Al Sajaa Industrial Area, Sharjah",
    phone: "+971 6 569 5001",
    phoneHref: "tel:+97165695001",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Sharjah+Branch/@25.3492232,55.6497402,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef5f3e6ac46ac73:0x684ebefeb76de0ce!8m2!3d25.3492232!4d55.6497402!16s%2Fg%2F11x7xg6svq?entry=ttu",
    body: "From Al Sajaa we cover Sharjah, Ajman, Umm Al Quwain and Ras Al Khaimah, on the same industrial estate as the surfaces showroom of our sister company Global Classic Building Materials.",
  },
];

const CHECKLIST = [
  [
    "Authorized by the manufacturer",
    "Lapiz Blue buys Mapei, Laticrete, Weber and Kerakoll tile adhesives and grouts directly from the manufacturer or its regional company, so every bag is genuine and batch traceable. The Mapei authorization certificate is published on the About page.",
  ],
  [
    "The right class for the tile, not just a colour match",
    "A tile adhesive is classified C1 or C2 for bond strength and S1 or S2 for deformability under movement, with epoxy reserved for chemicals or permanent water. Ask for the class, not only the brand name, especially for large format tiles, facades and heated floors.",
  ],
  [
    "Grout chosen for exposure",
    "Cementitious grout suits most interiors, but swimming pools, commercial kitchens and other chemically aggressive areas need an epoxy or resin grout such as Kerapoxy, weberepox easy, SpectraLock or Fugalite Bio.",
  ],
  [
    "TDS, SDS and submittals with the quote",
    "Every quotation comes with the manufacturer's technical data sheet and safety data sheet for each product, plus submittal support for consultant approval where a project needs it.",
  ],
  [
    "Stock in Dubai and delivery you can plan around",
    "Fast moving adhesives and grouts are held in Al Quoz, Mussafah and Al Sajaa. Orders placed before 3 pm are delivered the next working day across Dubai, Abu Dhabi and Sharjah, and stock lines can be collected the same day.",
  ],
];

const FAQS = [
  {
    q: "Which tile adhesive is best for large format porcelain in Dubai?",
    a: "For large format porcelain and gauged panels, use an adhesive engineered for full coverage without voids. Laticrete LHT mortars such as 325 Premium are built for tiles up to 3 metres, Weber webercol flex (C2TES2) is the highly deformable adhesive for panels 60x120cm and larger, Mapei Keraflex Maxi S1 Zero is a no vertical slip adhesive with extended open time for large format tiles, and Kerakoll Biogel No Limits is a gel adhesive that bonds any material to any substrate for the most demanding jobs.",
  },
  {
    q: "What is the difference between C1 and C2 tile adhesive?",
    a: "C1 is a standard cementitious adhesive such as Weber webercol fix 401, suitable for basic ceramic tile installations on walls and floors. C2 is an improved cementitious adhesive with stronger bond strength, such as Weber webercol pro, Mapei Kerabond T and Laticrete 254 Platinum, needed for porcelain tiles and larger formats where a C1 bond may fail under stress.",
  },
  {
    q: "What is the difference between S1 and S2 deformable tile adhesive?",
    a: "S1 and S2 describe how much an adhesive can flex under substrate movement. S1 adhesives such as Weber webercol premium (C2TES1), Mapei Keraflex Maxi S1 Zero and Laticrete 335 Pro Premium Flexible suit external work, heated floors and large format tiles. S2 adhesives such as Weber webercol flex (C2TES2) are the most deformable, specified for the largest panels and facade tiling where movement is greatest.",
  },
  {
    q: "Can tile adhesive be installed directly over existing tiles?",
    a: "Yes, with the right product. Kerakoll Biogel gel adhesives are designed for renovation directly over existing dimensionally stable ceramic coverings, and Laticrete PRIME-N-BOND primer allows a new thin-set to bond to clean, sound existing tile. Both approaches remove the need to strip the old finish before retiling.",
  },
  {
    q: "Which tile adhesive and grout suit a swimming pool?",
    a: "Pools need a system formulated for permanent submersion and chlorine, not a standard wet area product. Laticrete SpectraLock epoxy grout is formulated for swimming pools, fountains and spas, Weber weberepox easy resists pool chemicals and salt water, and Kerakoll Fugalite Bio is chlorine resistant and waterproof for pool and spa tiling.",
  },
  {
    q: "Do tile adhesives work on heated floor systems?",
    a: "Yes, with the correct class. Weber specifies S1 or S2 deformable adhesives such as webercol premium or webercol flex for heated floor installations, with a flexible grout used at the perimeters once the system has been commissioned and cycled before tiling.",
  },
  {
    q: "When should epoxy grout be used instead of cementitious grout?",
    a: "Use epoxy grout where chemical resistance, permanent water exposure or strict hygiene matter, such as swimming pools, commercial kitchens and food processing areas. Mapei Kerapoxy, Weber weberepox easy and Laticrete SpectraLock Pro Premium are the epoxy options Lapiz Blue supplies, while cementitious grout remains the usual choice for most residential and general commercial interiors.",
  },
  {
    q: "Does Lapiz Blue deliver tile adhesive across Dubai, Abu Dhabi and Sharjah?",
    a: "Yes. Lapiz Blue holds tile adhesive and grout stock in three distribution centres, at Al Quoz Industrial Area 4 in Dubai, Mussafah Industrial Area 40 in Abu Dhabi and Al Sajaa Industrial Area in Sharjah, and delivers to all seven Emirates. Orders placed before 3 pm are delivered the next working day in Dubai, Abu Dhabi and Sharjah, and stock lines can be collected the same day.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Tile Adhesive Supplier in Dubai, UAE",
      description: metadata.description,
      isPartOf: { "@id": "https://www.lapizblue.com/#website" },
      about: { "@id": ORG_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: `https://www.lapizblue.com${COVER}-1440.webp` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lapizblue.com" },
        { "@type": "ListItem", position: 2, name: "Construction Chemicals Distributor in Dubai", item: HUB_URL },
        { "@type": "ListItem", position: 3, name: "Tile Adhesive Supplier in Dubai", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Tile adhesive and grout supply",
      serviceType: "Tile adhesive supplier",
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Tile adhesive and grout classes supplied by Lapiz Blue",
        itemListElement: CLASSES.map((c) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: c.name, description: c.body },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function TileAdhesiveSupplierDubaiPage() {
  return (
    <main className="bg-white text-[#161925]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroPreload base={COVER} widths={COVER_WIDTHS} />

      {/* ---------- Cover: editorial copy block, then the tile installation photo as a full width band ---------- */}
      <section className="relative w-full bg-[#161925] text-white overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-12 lg:pt-20">
          <nav aria-label="Breadcrumb" className="font-manrope text-sm text-white/60 mb-8">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/construction-chemicals-dubai" className="hover:text-white">Construction chemicals distributor in Dubai</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Tile adhesive supplier in Dubai</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="font-manrope text-[#BFD7EA] text-sm sm:text-base uppercase tracking-widest">
                Mapei, Laticrete, Weber and Kerakoll, ex stock
              </p>
              <h1 className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] mt-3 max-w-[15ch]">
                Tile Adhesive Supplier in Dubai
              </h1>

              {/* Answer block: self contained, 134 to 167 words, the passage a search engine can lift */}
              <p className="font-manrope text-white/85 text-lg sm:text-xl leading-relaxed mt-8 max-w-[62ch]">
                Lapiz Blue General Trading LLC is a tile adhesive supplier in Dubai, United Arab Emirates, and the authorized distributor of
                Mapei, Laticrete, Weber (Saint-Gobain) and Kerakoll tile fixing systems. The range covers standard C1 cementitious adhesives
                such as webercol fix 401, improved C2 adhesives such as Kerabond T and webercol pro, S1 deformable adhesives such as Keraflex
                Maxi S1 Zero and webercol premium for substrates with movement, S2 highly deformable adhesives such as webercol flex for large
                format panels and facades, and epoxy adhesives and grouts such as Kerapoxy, weberepox easy and SpectraLock Pro Premium for
                pools, kitchens and chemically aggressive sites. Stock is held in three distribution centres, in Al Quoz (Dubai), Mussafah (Abu
                Dhabi) and Al Sajaa (Sharjah), with next day delivery across the three Emirates for orders placed before 3 pm. Every quotation
                includes the manufacturer&apos;s technical data sheet and safety data sheet. Customers rate Lapiz Blue 4.7 out of 5 across 179
                Google reviews.
              </p>
            </div>

            <div className="lg:pb-2">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                {[
                  ["4", "tile adhesive brands held ex stock"],
                  ["3", "distribution centres in the UAE"],
                  ["4.7", "Google rating, 179 reviews"],
                  ["2020", "supplying UAE sites since"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-outfit font-semibold text-5xl lg:text-6xl leading-none tabular-nums">{v}</dt>
                    <dd className="font-manrope text-white/65 text-sm sm:text-base mt-2">{l}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-3 rounded-full bg-[#F3DFC1] text-[#161925] font-manrope font-semibold text-base sm:text-lg px-6 py-3.5 hover:bg-white transition-colors"
                >
                  Get a quote on WhatsApp <span aria-hidden="true">→</span>
                </a>
                <Link href="/construction-chemicals-dubai" className="font-manrope text-[#BFD7EA] underline underline-offset-4 text-base sm:text-lg">
                  Every construction chemical we distribute
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full width photo band */}
        <div className="relative mt-12 lg:mt-16 w-full h-[42vw] max-h-[560px] min-h-[220px] overflow-hidden">
          <StaticHeroPicture
            base={COVER}
            widths={COVER_WIDTHS}
            alt="Mapei tile adhesive being trowelled on site before setting porcelain tiles"
            className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
          />
        </div>
      </section>

      {/* ---------- Application ledger: which class for which job ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="scenarios-heading">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Specification</p>
            <h2 id="scenarios-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
              Which tile adhesive for which job?
            </h2>
            <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[46ch]">
              Tile size, substrate movement and exposure decide the class, not the brand. Five classes cover almost every tile fixing
              requirement on a UAE site, each backed by named products across the four brands we stock.
            </p>
            <ul className="mt-8 divide-y divide-[#161925]/10 border-y border-[#161925]/10">
              {CLASSES.map((c) => (
                <li key={c.name} className="py-4">
                  <h3 className="font-outfit font-semibold text-lg">{c.name}</h3>
                  <p className="font-manrope text-[#161925]/70 text-sm leading-relaxed mt-1">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <ol className="divide-y divide-[#161925]/10 border-y border-[#161925]/10">
            {SCENARIOS.map((s, i) => (
              <li key={s.name} className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 py-7">
                <span className="font-manrope text-sm text-[#406E8E] tabular-nums pt-1">0{i + 1}</span>
                <div>
                  <h3 className="font-outfit font-semibold text-xl sm:text-2xl">{s.name}</h3>
                  <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-2">{s.body}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {s.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="font-manrope text-[#406E8E] underline underline-offset-4 text-sm sm:text-base">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Brands: four authorized tile adhesive lines ---------- */}
      <section aria-labelledby="brands-heading" className="bg-[#F6F8FA]">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Authorized distribution</p>
          <h2 id="brands-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
            Tile adhesive brands we are authorized to distribute
          </h2>
          <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[62ch]">
            Lapiz Blue General Trading LLC buys directly from the manufacturer or its regional company, so every bag and pail is genuine,
            batch traceable and covered by the manufacturer&apos;s warranty. The Mapei authorization certificate is published on the{" "}
            <Link href="/about" className="text-[#406E8E] underline underline-offset-4">About page</Link>.
          </p>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {BRANDS.map((b) => (
              <li key={b.name} className="rounded-2xl bg-white border border-[#161925]/10 overflow-hidden flex flex-col">
                <div className="relative w-full h-48 bg-[#F6F8FA]">
                  <Image
                    src={b.image}
                    alt={b.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-contain p-4"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-outfit font-semibold text-2xl leading-tight">{b.name}</h3>
                  <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-3">{b.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {b.products.map((p) => (
                      <li key={p} className="font-manrope text-sm text-[#23395B] bg-[#F6F8FA] rounded-full px-3 py-1">
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={b.link.href} className="mt-auto pt-5 font-manrope text-[#406E8E] underline underline-offset-4 text-base">
                    {b.link.label} and data sheets
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Where: crawlable NAP, then the interactive map the site already uses ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-16 lg:pt-24" aria-labelledby="where-heading">
        <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Where we supply</p>
        <h2 id="where-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
          Where to buy tile adhesive in Dubai, Abu Dhabi and Sharjah
        </h2>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BRANCHES.map((b) => (
            <article key={b.emirate} className="rounded-2xl border border-[#161925]/10 p-6 sm:p-7">
              <h3 className="font-outfit font-semibold text-2xl leading-tight">{b.heading}</h3>
              <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-3">{b.body}</p>
              <address className="not-italic font-manrope text-[#161925] text-base mt-5 space-y-1">
                <div>{b.address}</div>
                <div><a href={b.phoneHref} className="text-[#406E8E] underline underline-offset-4">{b.phone}</a></div>
                <div>
                  <a href={b.map} target="_blank" rel="noopener" className="text-[#406E8E] underline underline-offset-4">
                    Open the {b.emirate} branch in Google Maps
                  </a>
                </div>
              </address>
            </article>
          ))}
        </div>
      </section>
      <BrandsLocationMap />

      {/* ---------- Buyer's checklist ---------- */}
      <section className="bg-[#161925] text-white" aria-labelledby="choose-heading">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16">
            <div>
              <p className="font-manrope text-[#BFD7EA] text-sm uppercase tracking-widest">Buyer&apos;s checklist</p>
              <h2 id="choose-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
                How to choose a tile adhesive supplier in Dubai
              </h2>
              <p className="font-manrope text-white/75 text-lg mt-5 max-w-[46ch]">
                A hollow tile shows up long after the invoice is paid. These five checks decide whether the adhesive performs and whether
                the manufacturer stands behind it.
              </p>
            </div>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {CHECKLIST.map(([check, how], i) => (
                <li key={check} className="grid grid-cols-[auto_1fr] gap-x-6 py-6">
                  <span className="font-outfit font-semibold text-3xl sm:text-4xl text-[#F3DFC1] tabular-nums leading-none pt-1">0{i + 1}</span>
                  <div>
                    <h3 className="font-outfit font-semibold text-xl sm:text-2xl">{check}</h3>
                    <p className="font-manrope text-white/80 text-base leading-relaxed mt-2">{how}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-[#F6F8FA]" aria-labelledby="faq-heading">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Questions contractors ask</p>
          <h2 id="faq-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
            Tile adhesives in Dubai, answered
          </h2>
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9">
            {FAQS.map((f, i) => (
              <li key={f.q} className="grid grid-cols-[auto_1fr] gap-x-4">
                <span className="font-manrope text-sm text-[#406E8E] tabular-nums pt-1" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-outfit font-semibold text-xl text-[#161925] leading-snug">{f.q}</h3>
                  <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-2">{f.a}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Close: the one call to action ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        <div className="rounded-3xl bg-[#406E8E] text-white p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl max-w-[18ch] leading-tight">Send the tile adhesive BOQ, get a priced quote today</h2>
            <p className="font-manrope text-white text-lg mt-4 max-w-[52ch]">
              WhatsApp the tile type, size, substrate and square metres, or the bill of quantities, and the Dubai team replies with the
              right adhesive and grout, pricing, stock and data sheets the same working day.
            </p>
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#F3DFC1] text-[#161925] font-manrope font-semibold text-lg px-7 py-4 hover:bg-white transition-colors"
          >
            WhatsApp +971 50 281 4338
          </a>
        </div>
        <p className="font-manrope text-[#161925]/60 text-sm mt-8 max-w-[70ch]">
          Tile adhesive is one of eight product families from Lapiz Blue General Trading LLC, the{" "}
          <Link href="/construction-chemicals-dubai" className="underline underline-offset-4">construction chemicals distributor in Dubai</Link>{" "}
          behind waterproofing, repair mortars, screeds, flooring and sealants for the same sites. Application is handled by our sister
          company <a href="https://www.60newton.com" className="underline underline-offset-4">Sixty Newton Technical Services</a>.
        </p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StaticHeroPicture, HeroPreload } from "@/components/ui/static-hero-picture";
import { BrandsGridSection } from "@/components/ui/brands-grid-section";
import { BrandsLocationMap } from "@/components/ui/brands-location-map";
import { OurProjectsSection } from "@/components/ui/our-projects-section";

// Hub page for the primary query "construction chemicals distributor in Dubai"
// and its Abu Dhabi, Sharjah and UAE variants. One query, one page. Crawlable
// HTML first: every figure here is also stated on the About, Brands or award
// pages, and the entity name is the exact trade name used site wide.

const PAGE_URL = "https://www.lapizblue.com/construction-chemicals-dubai";
const ORG_ID = "https://www.lapizblue.com/#organization";
const COVER = "/images/stores/abudhabi-lapizblue";
const WHATSAPP =
  "https://api.whatsapp.com/send?phone=971502814338&text=" +
  encodeURIComponent("Hi Lapiz Blue, I need a quote for construction chemicals in Dubai.");

export const metadata: Metadata = {
  title: "Construction Chemicals Distributor in Dubai, UAE | Lapiz Blue",
  description:
    "Lapiz Blue General Trading LLC is an authorized construction chemicals distributor in Dubai, Abu Dhabi and Sharjah: Mapei, Laticrete, Weber, Kerakoll, Pidilite and more, ex stock with next day delivery.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Construction Chemicals Distributor in Dubai, UAE | Lapiz Blue",
    description:
      "Authorized distributor of Mapei, Laticrete, Weber, Kerakoll, Pidilite and FILA construction chemicals. Three UAE distribution centres, next day delivery, TDS and SDS with every quote.",
    url: PAGE_URL,
    siteName: "Lapiz Blue",
    type: "website",
    images: [`${COVER}-1360.webp`],
  },
};

const CATEGORIES = [
  {
    name: "Tile adhesives and grouts",
    body: "Cementitious and reactive adhesives from C1 to S2 class, cementitious and epoxy grouts, and primers for porcelain, ceramic, natural stone and large format tiles. Mapei, Laticrete, Weber and Kerakoll ranges held ex stock in Dubai.",
    image: "/images/brands/mapei/tile-adhesives/tile-adhesives-hero.webp",
    links: [
      { label: "Mapei tile adhesives and grouts", href: "/brands/mapei/tile-adhesives-and-grouts" },
      { label: "Laticrete", href: "/brands/laticrete/tile-adhesives-and-grouts" },
      { label: "Weber", href: "/brands/weber/tile-adhesives-and-grouts" },
    ],
  },
  {
    name: "Waterproofing",
    body: "Cementitious, polyurethane, bituminous and liquid applied membranes for wet areas, roofs, basements, swimming pools and water tanks, with matching tapes, primers and crystalline treatments.",
    image: "/images/brands/mapei/waterproofing/waterproofing-hero.webp",
    links: [
      { label: "Waterproofing supplier in Dubai", href: "/waterproofing-supplier-dubai" },
      { label: "Mapei waterproofing", href: "/brands/mapei/waterproofing" },
      { label: "Laticrete waterproofing", href: "/brands/laticrete/waterproofing" },
      { label: "Kerakoll waterproofing", href: "/brands/kerakoll/waterproofing" },
    ],
  },
  {
    name: "Concrete repair and admixtures",
    body: "Structural and cosmetic repair mortars, bonding agents, corrosion inhibitors, non shrink grouts and concrete admixtures for new pours, remedial works and anchoring.",
    image: "/images/brands/mapei/concrete-additives/concrete-additives-hero.webp",
    links: [
      { label: "Mapei concrete additives and repair", href: "/brands/mapei/concrete-additives-and-repair-systems" },
      { label: "Weber repair and anchoring", href: "/brands/weber/repair-and-anchoring" },
    ],
  },
  {
    name: "Self levelling screeds and microcement",
    body: "Pumpable and hand applied self levelling compounds, rapid screeds and decorative microcement systems for floors that need to be flat, fast and finished.",
    image: "/images/brands/mapei/self-leveling/self-leveling-hero.webp",
    links: [
      { label: "Mapei self levelling and microcement", href: "/brands/mapei/self-leveling-and-microcement" },
      { label: "Laticrete self levelling and screed", href: "/brands/laticrete/self-leveling-and-screed" },
      { label: "Pidilite Puma self levelling", href: "/brands/pidilite-puma/self-leveling" },
    ],
  },
  {
    name: "Epoxy and resin flooring",
    body: "Epoxy and polyurethane flooring systems for warehouses, car parks, kitchens and clean rooms, plus epoxy repair products for damaged slabs.",
    image: "/images/brands/mapei/flooring-systems/flooring-systems-hero.webp",
    links: [
      { label: "Mapei flooring systems", href: "/brands/mapei/flooring-systems" },
      { label: "Pidilite Puma", href: "/brands/pidilite-puma" },
    ],
  },
  {
    name: "Sealants, anchoring and fixing",
    body: "Silicone, polyurethane and hybrid sealants, chemical anchors and anchoring grouts for joints, facades and structural fixings.",
    image: "/images/brands/mapei/sealants-and-anchoring/sealants-hero.webp",
    links: [{ label: "Mapei sealants and anchoring", href: "/brands/mapei/sealants-and-anchoring" }],
  },
  {
    name: "Tile profiles, trims and movement joints",
    body: "Profilpas aluminium and stainless steel profiles: corner trims, stair nosings, movement joints, skirting, balcony edges and shower profiles that finish tiled surfaces properly.",
    image: "/images/brands/profilpas/hero.webp",
    links: [{ label: "Profilpas profiles", href: "/brands/profilpas" }],
  },
  {
    name: "Paints, protective coatings and surface care",
    body: "AkzoNobel Dulux interior, exterior, floor and metal coatings, and FILA sealers and cleaners for stone, tile and grout protection after installation.",
    image: "/images/brands/akzonobel/exterior.webp",
    links: [
      { label: "AkzoNobel Dulux", href: "/brands/akzonobel" },
      { label: "FILA sealers and cleaners", href: "/brands/fila" },
    ],
  },
];

const BRANCHES = [
  {
    emirate: "Dubai",
    heading: "Construction chemicals distributor in Dubai",
    address: "Shop 12 to 14, 4 Street, Al Quoz Industrial Area 4, Dubai",
    phone: "+971 4 885 5257",
    phoneHref: "tel:+97148855257",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
    body: "Head office and main warehouse in Al Quoz, serving Dubai, Jebel Ali and Dubai South. Same day collection for stock lines and next day site delivery across Dubai for orders placed before 3 pm.",
  },
  {
    emirate: "Abu Dhabi",
    heading: "Construction chemicals supplier in Abu Dhabi",
    address: "Shop 2, Mussafah Industrial Area 40, Abu Dhabi",
    phone: "+971 2 886 7753",
    phoneHref: "tel:+97128867753",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/@24.345846,54.488503,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e40e6c4e8e8e7:0x240c2ef83a9e23d6!8m2!3d24.345846!4d54.488503!16s%2Fg%2F11x7xg6svr?entry=ttu",
    body: "Open since 2021 with the same Mapei, Laticrete and Weber systems for Abu Dhabi city, Mussafah, Al Reem, Yas, Saadiyat and Al Ain, including the Al Wathba resort and Al Maya Island works we supplied.",
  },
  {
    emirate: "Sharjah",
    heading: "Construction chemicals supplier in Sharjah",
    address: "Al Sajaa Industrial Area, Sharjah",
    phone: "+971 6 569 5001",
    phoneHref: "tel:+97165695001",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Sharjah+Branch/@25.3492232,55.6497402,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef5f3e6ac46ac73:0x684ebefeb76de0ce!8m2!3d25.3492232!4d55.6497402!16s%2Fg%2F11x7xg6svq?entry=ttu",
    body: "From Al Sajaa we cover Sharjah, Ajman, Umm Al Quwain and Ras Al Khaimah, on the same industrial estate as the surfaces showroom of our sister company Global Classic Building Materials.",
  },
];

const CHECKLIST = [
  ["Authorized by the manufacturer", "Appointment letters from Mapei, Kerakoll and Pidilite Puma are published on our brand pages, so stock is genuine and batch traceable."],
  ["Stock held locally, not ordered in", "Fast moving adhesives, grouts, waterproofing and repair mortars are held across three warehouses in Dubai, Abu Dhabi and Sharjah."],
  ["Technical data with every quote", "Every quotation comes with the TDS and SDS for each product, plus a method statement when a system needs one."],
  ["Site support, not just sales", "Our technical team specifies the right system for the substrate and conditions, and can bring in the manufacturer's specialist for complex details."],
  ["Delivery you can plan around", "Next day delivery across Dubai, Abu Dhabi and Sharjah for orders placed before 3 pm, same day collection for stock lines."],
  ["Trade terms", "Trade pricing for contractors and resellers, credit accounts for approved customers, and project pricing on bills of quantities."],
];

const FAQS = [
  {
    q: "Who is the best construction chemicals distributor in Dubai?",
    a: "Lapiz Blue General Trading LLC is one of the highest rated construction chemicals distributors in Dubai. Customers rate it 4.7 out of 5 across 179 Google reviews, and it was named Outstanding Construction Material Wholesaler in the 2026 Dubai Local Awards, an award that fewer than one in four Dubai construction material wholesalers qualify for.",
  },
  {
    q: "What construction chemicals does Lapiz Blue supply?",
    a: "Lapiz Blue supplies tile adhesives and grouts, waterproofing membranes, concrete repair mortars and admixtures, self levelling screeds, epoxy and resin flooring, sealants and chemical anchors, tile profiles and movement joints, protective paints and stone care, from Mapei, Laticrete, Weber, Kerakoll, Pidilite Puma, Profilpas, AkzoNobel Dulux and FILA.",
  },
  {
    q: "Is Lapiz Blue an authorized Mapei distributor in the UAE?",
    a: "Yes. Lapiz Blue General Trading LLC is an authorized Mapei distributor in the UAE. The Mapei authorization certificate is published on the About page, and Mapei products are supplied with batch traceability and the official Mapei technical data sheets.",
  },
  {
    q: "Which areas of the UAE does Lapiz Blue deliver to?",
    a: "Lapiz Blue delivers construction chemicals across all seven Emirates from three distribution centres: Al Quoz Industrial Area 4 in Dubai, Mussafah Industrial Area 40 in Abu Dhabi, and Al Sajaa Industrial Area in Sharjah. Orders placed before 3 pm are delivered the next working day in Dubai, Abu Dhabi and Sharjah.",
  },
  {
    q: "Does Lapiz Blue provide technical data sheets and safety data sheets?",
    a: "Yes. Every quotation from Lapiz Blue includes the manufacturer's technical data sheet (TDS) and safety data sheet (SDS) for each product, and the Mapei product pages on this website carry the current TDS as a downloadable PDF.",
  },
  {
    q: "Can contractors get trade pricing and credit terms?",
    a: "Yes. Lapiz Blue offers trade pricing to contractors, applicators and resellers, project pricing against a bill of quantities, and credit accounts for approved customers. Send the BOQ by WhatsApp or email to receive a priced quotation.",
  },
  {
    q: "What is the difference between a construction chemicals distributor and a manufacturer?",
    a: "A manufacturer such as Mapei or Laticrete produces the product. A distributor such as Lapiz Blue holds that product in local stock, supplies it in project quantities with the manufacturer's documentation, and provides specification advice and delivery. Buying from an authorized distributor keeps the manufacturer's warranty and traceability intact.",
  },
  {
    q: "Which tile adhesive should I use for large format porcelain in the UAE?",
    a: "For large format porcelain in UAE conditions, use a C2 class deformable adhesive (C2TE S1 or S2 under EN 12004), applied with the back buttering method, over a sound and primed substrate. Lapiz Blue stocks suitable Mapei, Laticrete, Weber and Kerakoll adhesives and can confirm the right one for your tile size, substrate and exposure.",
  },
  {
    q: "Does Lapiz Blue supply projects in Abu Dhabi and Sharjah, or only Dubai?",
    a: "Lapiz Blue supplies all three. The Abu Dhabi branch in Mussafah has served projects such as the Al Wathba resort and Al Maya Island since 2021, and the Sharjah branch in Al Sajaa covers the northern Emirates. Dubai projects supplied include DAMAC Lagoons and Royal Atlantis.",
  },
  {
    q: "Can Lapiz Blue also apply the products it supplies?",
    a: "Application is handled by our sister company Sixty Newton Technical Services LLC, an approved applicator for Mapei, Laticrete, Weber, Kerakoll and AkzoNobel systems. Lapiz Blue supplies the materials and Sixty Newton can install waterproofing, flooring, tiling and coatings on site.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Construction Chemicals Distributor in Dubai, UAE",
      description: metadata.description,
      isPartOf: { "@id": "https://www.lapizblue.com/#website" },
      about: { "@id": ORG_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: `https://www.lapizblue.com${COVER}-1360.webp` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lapizblue.com" },
        { "@type": "ListItem", position: 2, name: "Construction Chemicals Distributor in Dubai", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Construction chemicals distribution",
      serviceType: "Construction chemicals distributor",
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Construction chemicals supplied by Lapiz Blue",
        itemListElement: CATEGORIES.map((c) => ({
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

export default function ConstructionChemicalsDubaiPage() {
  return (
    <main className="bg-white text-[#161925]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroPreload base={COVER} widths={[640, 828, 1200, 1360]} />

      {/* ---------- Cover: editorial copy block, then the Abu Dhabi warehouse as a full width band ---------- */}
      <section className="relative w-full bg-[#161925] text-white overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-12 lg:pt-20">
          <nav aria-label="Breadcrumb" className="font-manrope text-sm text-white/60 mb-8">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Construction chemicals distributor in Dubai</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="font-manrope text-[#BFD7EA] text-sm sm:text-base uppercase tracking-widest">
                Dubai, Abu Dhabi and Sharjah, since 2020
              </p>
              <h1 className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] mt-3 max-w-[15ch]">
                Construction Chemicals Distributor in Dubai
              </h1>

              {/* Answer block: self contained, 134 to 167 words, the passage a search engine can lift */}
              <p className="font-manrope text-white/85 text-lg sm:text-xl leading-relaxed mt-8 max-w-[62ch]">
                Lapiz Blue General Trading LLC is a construction chemicals distributor in Dubai, United Arab Emirates, founded in 2020 and
                headquartered in Al Quoz Industrial Area 4. It is the authorized distributor of Mapei, Laticrete, Weber (Saint-Gobain),
                Kerakoll, Pidilite Puma, Profilpas, AkzoNobel Dulux and FILA, supplying tile adhesives and grouts, waterproofing, concrete
                repair and admixtures, self levelling screeds, epoxy flooring, sealants, tile profiles and protective coatings to contractors,
                applicators and resellers. Stock is held in three distribution centres, in Dubai, Abu Dhabi (Mussafah) and Sharjah (Al Sajaa),
                with next day delivery across the three Emirates for orders placed before 3 pm. Every quotation includes the manufacturer's
                technical and safety data sheets. Customers rate Lapiz Blue 4.7 out of 5 across 179 Google reviews, and it was named
                Outstanding Construction Material Wholesaler in the 2026 Dubai Local Awards.
              </p>
            </div>

            <div className="lg:pb-2">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                {[
                  ["3", "distribution centres in the UAE"],
                  ["15", "brands held ex stock"],
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
                <Link href="/brands" className="font-manrope text-[#BFD7EA] underline underline-offset-4 text-base sm:text-lg">
                  Browse every brand we distribute
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full width photo band: the whole sign stays in frame at every width */}
        <div className="relative mt-12 lg:mt-16 w-full h-[42vw] max-h-[560px] min-h-[220px] overflow-hidden">
          <StaticHeroPicture
            base={COVER}
            widths={[640, 828, 1200, 1360]}
            alt="Lapiz Blue General Trading LLC warehouse front with the company signage"
            className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
          />
        </div>
      </section>

      {/* ---------- Supply index: numbered ledger with product photography ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="supply-heading">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">What we supply</p>
            <h2 id="supply-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
              What a construction chemicals distributor in Dubai should hold in stock
            </h2>
            <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[46ch]">
              Eight product families cover almost every wet trade and finishing package on a UAE site. Each line is held in Al Quoz and
              linked to its product pages, where the technical data sheets live.
            </p>
          </div>
          <ol className="divide-y divide-[#161925]/10 border-y border-[#161925]/10">
            {CATEGORIES.map((c, i) => (
              <li key={c.name} className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-5 sm:gap-x-8 gap-y-4 py-7">
                <span className="font-manrope text-sm text-[#406E8E] tabular-nums pt-1">0{i + 1}</span>
                <div>
                  <h3 className="font-outfit font-semibold text-xl sm:text-2xl">{c.name}</h3>
                  <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-2">{c.body}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="font-manrope text-[#406E8E] underline underline-offset-4 text-sm sm:text-base">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-2 sm:col-span-1 relative w-full sm:w-36 h-28 sm:h-28 rounded-xl overflow-hidden bg-[#F6F8FA]">
                  <Image src={c.image} alt={c.name} fill sizes="(max-width: 640px) 100vw, 144px" className="object-cover" loading="lazy" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Brands: the site's own grid ---------- */}
      <section aria-labelledby="brands-heading" className="bg-[#F6F8FA]">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-16 lg:pt-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Authorized distribution</p>
          <h2 id="brands-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
            Which construction chemical brands is Lapiz Blue authorized to distribute?
          </h2>
          <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[62ch]">
            Lapiz Blue General Trading LLC buys directly from the manufacturer or its regional company, so every bag, pail and cartridge is
            genuine, batch traceable and covered by the manufacturer's warranty. Appointment letters from Mapei, Kerakoll and Pidilite Puma
            are published on the brand pages and the{" "}
            <Link href="/about" className="text-[#406E8E] underline underline-offset-4">About page</Link>. Tools from Montolit, DeWalt and
            Hilti are on the <Link href="/tools" className="text-[#406E8E] underline underline-offset-4">tools pages</Link>.
          </p>
        </div>
        <BrandsGridSection />
      </section>

      {/* ---------- Where: crawlable NAP, then the interactive map the site already uses ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-16 lg:pt-24" aria-labelledby="where-heading">
        <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Where we supply</p>
        <h2 id="where-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
          Construction chemicals supply across Dubai, Abu Dhabi and Sharjah
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
              <p className="font-manrope text-[#BFD7EA] text-sm uppercase tracking-widest">Buyer's checklist</p>
              <h2 id="choose-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
                How to choose a construction chemicals distributor in Dubai
              </h2>
              <p className="font-manrope text-white/75 text-lg mt-5 max-w-[46ch]">
                Price per bag is the last thing to compare. These six checks decide whether a product performs on site and whether the
                manufacturer stands behind it.
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

      {/* ---------- Proof: award, then the site's projects section ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-16 lg:pt-24" aria-labelledby="proof-heading">
        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Proof</p>
            <h2 id="proof-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[18ch] leading-tight">
              Sites that run on materials from Lapiz Blue
            </h2>
            <p className="font-manrope text-[#161925]/80 text-lg leading-relaxed mt-5 max-w-[58ch]">
              Since 2020 Lapiz Blue has supplied construction chemicals to residential, hospitality and infrastructure projects across the
              UAE, including DAMAC Lagoons and Royal Atlantis in Dubai, and the Al Wathba resort and Al Maya Island in Abu Dhabi, working
              with developers such as DAMAC and Nakheel and the contractors who build for them.
            </p>
          </div>
          <div className="rounded-2xl bg-[#161925] text-white p-6 sm:p-8">
            <p className="font-manrope text-[#BFD7EA] text-sm uppercase tracking-widest">Recognition</p>
            <h3 className="font-outfit font-semibold text-2xl sm:text-3xl mt-2 leading-tight">
              Outstanding Construction Material Wholesaler, 2026 Dubai Local Awards
            </h3>
            <p className="font-manrope text-white/80 text-base leading-relaxed mt-4">
              Decided by customer reviews, not a panel. A construction material wholesaler needs at least 100 reviews and a rating of 4.0
              or higher to qualify, and fewer than one in four in Dubai do. Lapiz Blue qualified with a 4.7 rating from 179 reviews, 87
              percent of them five star.
            </p>
            <Link href="/about#dubai-local-awards-2026" className="inline-block font-manrope text-[#F3DFC1] underline underline-offset-4 mt-5">
              See the award and what customers said
            </Link>
          </div>
        </div>
      </section>
      <OurProjectsSection />

      {/* ---------- FAQ ---------- */}
      <section className="bg-[#F6F8FA]" aria-labelledby="faq-heading">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Questions contractors ask</p>
          <h2 id="faq-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
            Construction chemicals in Dubai, answered
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
            <h2 className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl max-w-[18ch] leading-tight">Send the BOQ, get a priced quote today</h2>
            <p className="font-manrope text-white text-lg mt-4 max-w-[52ch]">
              WhatsApp the bill of quantities or the product list and the Dubai team replies with pricing, stock and data sheets the same
              working day.
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
          Lapiz Blue General Trading LLC is part of the Lapiz Group of Companies, alongside{" "}
          <a href="https://www.gcbuae.com" className="underline underline-offset-4">Global Classic Building Materials</a> for stone slabs and
          bathware and <a href="https://www.60newton.com" className="underline underline-offset-4">Sixty Newton Technical Services</a> for
          application and installation works.
        </p>
      </section>
    </main>
  );
}

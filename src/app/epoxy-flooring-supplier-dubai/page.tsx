import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StaticHeroPicture, HeroPreload } from "@/components/ui/static-hero-picture";
import { BrandsLocationMap } from "@/components/ui/brands-location-map";

// Category page for "epoxy flooring supplier in Dubai", a child of the
// construction chemicals hub. Every product, application and claim here is
// taken from the Mapei flooring-systems product line, the Laticrete flooring
// product line, and the AkzoNobel flooring (CRAFCO Traffic Deck) product line
// in src/data/brandConfigs.ts, plus the NAP and company figures already
// published on the waterproofing-supplier-dubai page. Pidilite Puma's epoxy
// repair line is commented out as a draft in brandConfigs.ts and is not used.

const PAGE_URL = "https://www.lapizblue.com/epoxy-flooring-supplier-dubai";
const HUB_URL = "https://www.lapizblue.com/construction-chemicals-dubai";
const ORG_ID = "https://www.lapizblue.com/#organization";
const COVER = "/images/brands/mapei/flooring-systems/flooring-systems-hero";
const COVER_WIDTHS = [640, 828, 1200, 1440, 1920];
const WHATSAPP =
  "https://api.whatsapp.com/send?phone=971502814338&text=" +
  encodeURIComponent("Hi Lapiz Blue, I need a quote for epoxy flooring in Dubai.");

export const metadata: Metadata = {
  title: "Epoxy Flooring Supplier in Dubai, UAE | Lapiz Blue",
  description:
    "Lapiz Blue General Trading LLC supplies Mapei and Laticrete epoxy, polyurethane and coating flooring systems in Dubai, with TDS, SDS and next day delivery.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Epoxy Flooring Supplier in Dubai, UAE | Lapiz Blue",
    description:
      "Authorized distributor of Mapei and Laticrete epoxy flooring, plus AkzoNobel CRAFCO Traffic Deck coatings: self levelling, trowelled, polyurethane and coating systems from three UAE distribution centres.",
    url: PAGE_URL,
    siteName: "Lapiz Blue",
    type: "website",
    images: [`${COVER}-1440.webp`],
  },
};

const LINES = {
  mapei: { label: "Mapei flooring systems", href: "/brands/mapei/flooring-systems" },
  laticrete: { label: "Laticrete flooring", href: "/brands/laticrete/flooring" },
  akzonobel: { label: "AkzoNobel floor coatings", href: "/brands/akzonobel/flooring" },
};

// System types held, each backed by named products in brandConfigs
const SYSTEMS = [
  {
    name: "Self levelling epoxy coatings",
    body: "Mapefloor I 300 SL is Mapei's self-levelling epoxy coating for industrial floors that need high mechanical and chemical resistance, laid flat and seamless across large warehouse and production areas.",
  },
  {
    name: "Trowelled and decorative quartz systems",
    body: "Laticrete SPARTACOTE Quartz System is a decorative blended quartz flooring system trowelled onto prepared concrete for durable, slip resistant surfaces in commercial spaces.",
  },
  {
    name: "Polyurethane floor coatings",
    body: "Mapefloor PU 418 is Mapei's polyurethane floor coating, chosen for high flexibility and resistance to abrasion and chemicals where the slab moves or sees constant wheeled traffic.",
  },
  {
    name: "Protective and traffic deck coatings",
    body: "Mapefloor FC 200 ME is a two component epoxy floor coating formulated for Middle East climates, Mapecoat TNS is a textured acrylic coating for walkways and decorative outdoor flooring, and AkzoNobel CRAFCO Traffic Deck is an elastomeric, UV stable epoxy coating system built for car parks and vehicular traffic areas.",
  },
  {
    name: "Primers and moisture barriers",
    body: "Primer G, Primer MF, Primer SN and Ecoprim Grip Plus prepare absorbent, non absorbent and smooth concrete substrates for Mapei flooring systems, and Laticrete VAPOR BAN E and VAPOR BAN Primer ER Kit are epoxy moisture vapor barriers for substrates with high MVER readings.",
  },
];

const AREAS = [
  {
    name: "Warehouses and logistics floors",
    body: "Forklift and pallet traffic needs a seamless, high mechanical and chemical resistance surface. Mapei flooring systems cover exactly this use case, with Mapefloor I 300 SL as the self-levelling epoxy option for industrial floors, Laticrete flooring systems for warehouses and manufacturing with heavy loads and forklift traffic, and AkzoNobel floor coatings for warehouse and logistics facilities with forklift traffic and heavy pallet loads.",
    links: [LINES.mapei, LINES.laticrete, LINES.akzonobel],
  },
  {
    name: "Car parks and ramps",
    body: "Multi storey car parks, ramps and turning circles see concentrated tyre wear, vibration and UV exposure that standard floor paint cannot survive. AkzoNobel CRAFCO Traffic Deck is an elastomeric, UV stable, chemical resistant coating system engineered for car parks and vehicular traffic areas, with multiple RAL colours for bay markings and safety zones, and Mapei flooring systems also cover parking areas, ramps and service corridors where slip resistance may be required.",
    links: [LINES.akzonobel, LINES.mapei],
  },
  {
    name: "Commercial kitchens",
    body: "Wash zones and back of house areas need frequent cleaning without the floor dusting, staining or turning slippery. Mapei flooring systems are supplied for commercial kitchens and wash zones that need frequent cleaning, and AkzoNobel floor coatings are supplied for commercial kitchens and food processing areas requiring hygienic, easy-clean surfaces.",
    links: [LINES.mapei, LINES.akzonobel],
  },
  {
    name: "Clean rooms and healthcare facilities",
    body: "Hospital corridors, operating rooms and pharmaceutical facilities need flooring that supports hygiene and infection control. Laticrete flooring adhesives with Microban antimicrobial protection inhibit bacteria and mold growth at the adhesive layer, supporting the cleanroom standards healthcare facilities require, combined with seamless sheet vinyl welding for hygienic sheet vinyl and rubber flooring.",
    links: [LINES.laticrete],
  },
  {
    name: "Showrooms and retail floors",
    body: "Retail, showrooms and lobbies need appearance and durability together. Mapei flooring systems are supplied for retail, showrooms and lobbies where appearance matters but durability still comes first, and AkzoNobel floor coatings are supplied for showrooms and display areas where appearance matters alongside durability.",
    links: [LINES.mapei, LINES.akzonobel],
  },
  {
    name: "Workshops and industrial production floors",
    body: "Factories and workshops exposed to oils, chemicals and abrasion need a coating that resists both impact and spills. Mapefloor FC 200 ME is Mapei's two component epoxy floor coating formulated for Middle East climates, supplied for factories and workshops exposed to oils, chemicals and abrasion, and AkzoNobel floor coatings are supplied for industrial production floors exposed to chemicals, oils and aggressive cleaning.",
    links: [LINES.mapei, LINES.akzonobel],
  },
];

const BRANDS = [
  {
    name: "Mapei",
    body: "Epoxy, polyurethane and acrylic flooring systems for warehouses, workshops, retail, kitchens and back of house areas, matched to traffic, chemical exposure and finish.",
    products: ["Mapefloor I 300 SL", "Mapefloor FC 200 ME", "Mapefloor PU 418", "Mapecoat TNS", "Primer MF"],
    image: "/images/brands/mapei/flooring-systems/mapefloor-i300-sl.webp",
    alt: "Mapei Mapefloor I 300 SL self levelling epoxy coating for industrial floors",
    link: LINES.mapei,
  },
  {
    name: "Laticrete",
    body: "Epoxy floor coatings, a decorative quartz broadcast system and epoxy moisture vapor barriers, built as a complete system for commercial and industrial floors.",
    products: ["Guard EP", "SPARTACOTE Quartz System", "VAPOR BAN E", "VAPOR BAN Primer ER Kit"],
    image: "/images/brands/laticrete/flooring/guard-ep.webp",
    alt: "Laticrete Guard EP high performance epoxy floor coating",
    link: LINES.laticrete,
  },
];

const BRANCHES = [
  {
    emirate: "Dubai",
    heading: "Epoxy flooring supplier in Dubai",
    address: "Shop 12 to 14, 4 Street, Al Quoz Industrial Area 4, Dubai",
    phone: "+971 4 885 5257",
    phoneHref: "tel:+97148855257",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
    body: "Head office and main warehouse in Al Quoz, serving Dubai, Jebel Ali and Dubai South. Same day collection for stock lines and next day site delivery across Dubai for orders placed before 3 pm.",
  },
  {
    emirate: "Abu Dhabi",
    heading: "Epoxy flooring supplier in Abu Dhabi",
    address: "Shop 2, Mussafah Industrial Area 40, Abu Dhabi",
    phone: "+971 2 886 7753",
    phoneHref: "tel:+97128867753",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/@24.345846,54.488503,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e40e6c4e8e8e7:0x240c2ef83a9e23d6!8m2!3d24.345846!4d54.488503!16s%2Fg%2F11x7xg6svr?entry=ttu",
    body: "Open since 2021 with the same Mapei and Laticrete flooring systems for Abu Dhabi city, Mussafah, Al Reem, Yas, Saadiyat and Al Ain, including the Al Wathba resort and Al Maya Island works we supplied.",
  },
  {
    emirate: "Sharjah",
    heading: "Epoxy flooring supplier in Sharjah",
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
    "Lapiz Blue buys Mapei and Laticrete flooring systems directly from the manufacturer or its regional company, so every pail and kit is genuine and batch traceable. The Mapei authorization certificate is published on the About page.",
  ],
  [
    "Substrate moisture testing before any epoxy goes down",
    "Installing over wet concrete causes adhesive and coating failure, bubbling and peeling. Laticrete recommends calcium chloride (MVER) and relative humidity (RH) testing before flooring, and AkzoNobel's own guidance flags trapped moisture in concrete as the main cause of coating failure.",
  ],
  [
    "System selected by load, not by looks",
    "Confirm whether the floor sees foot traffic only, trolleys, forklifts or heavy vehicles before the system is chosen. A self-levelling epoxy for an industrial floor, a traffic deck coating for a car park ramp and a decorative quartz system for a showroom are different products for different loads.",
  ],
  [
    "TDS, SDS and submittals with the quote",
    "Every quotation comes with the manufacturer's technical data sheet and safety data sheet for each product, plus submittal support and datasheets for consultant review and approvals where a project needs it.",
  ],
  [
    "Stock in Dubai and delivery you can plan around",
    "Fast moving flooring products are held in Al Quoz, Mussafah and Al Sajaa. Orders placed before 3 pm are delivered the next working day across Dubai, Abu Dhabi and Sharjah, and stock lines can be collected the same day.",
  ],
];

const FAQS = [
  {
    q: "What is epoxy flooring used for in Dubai?",
    a: "Epoxy flooring is used to upgrade concrete floors with systems suited to wear, cleaning, chemicals and moisture, depending on the area and performance need. Lapiz Blue supplies Mapei and Laticrete epoxy flooring for warehouses, workshops, retail, commercial kitchens and back of house areas, matched to each site's traffic, chemical exposure and finish requirement.",
  },
  {
    q: "What is the difference between epoxy, polyurethane and cementitious flooring?",
    a: "Epoxy is commonly chosen for durability and chemical resistance. Polyurethane, such as Mapei Mapefloor PU 418, is often selected where flexibility or comfort is important. Cementitious systems are used when a more mineral finish or specific performance is needed. The right choice depends on exposure and use, and Lapiz Blue advises on the fit before quoting.",
  },
  {
    q: "Do you supply epoxy flooring for warehouses and industrial areas?",
    a: "Yes. Mapei Mapefloor I 300 SL is a self-levelling epoxy coating for industrial floors requiring high mechanical and chemical resistance, and AkzoNobel floor coatings are supplied for warehouse and logistics facilities with forklift traffic and heavy pallet loads. Share the site use, traffic type and substrate details and Lapiz Blue recommends a suitable epoxy system with the right finish options.",
  },
  {
    q: "How long does epoxy flooring take to cure in UAE conditions?",
    a: "It depends on the system and area size. For AkzoNobel CRAFCO Traffic Deck, a typical car park deck needs 2 to 3 days for preparation, priming and coating application, plus curing time before traffic, and fast cure systems are available when downtime is critical. Lapiz Blue can advise on realistic timelines once the area and system are confirmed.",
  },
  {
    q: "What is CRAFCO Traffic Deck and is it used for car park epoxy flooring?",
    a: "CRAFCO Traffic Deck is an AkzoNobel floor coating system built specifically for car parks and vehicular traffic areas. It is elastomeric, UV stable and chemical resistant, with primers, base coats and top coats engineered to work together, and it is available in multiple RAL colours for bay markings and safety zones. Lapiz Blue supplies it from the Dubai, Abu Dhabi and Sharjah branches.",
  },
  {
    q: "Can epoxy floor coatings handle forklift traffic?",
    a: "Yes, with the right system. Standard floor paint will not survive forklift traffic, but industrial floor coatings with the appropriate thickness, hardness and abrasion resistance are designed for this use, such as Mapei Mapefloor I 300 SL. Share your equipment types and traffic intensity and Lapiz Blue will specify an appropriate system.",
  },
  {
    q: "Do you supply epoxy flooring for commercial kitchens and food processing areas?",
    a: "Yes. Mapei flooring systems are supplied for commercial kitchens, wash zones and back of house areas that need frequent cleaning, and AkzoNobel floor coatings are supplied for commercial kitchens and food processing areas requiring hygienic, easy-clean surfaces. Tell Lapiz Blue the cleaning routine and slip risk and the team will suggest a suitable system and texture.",
  },
  {
    q: "Does every epoxy flooring quotation include the TDS and SDS?",
    a: "Yes. Lapiz Blue General Trading LLC includes the manufacturer's technical data sheet and safety data sheet with every epoxy flooring quotation, and can share further documents and supporting datasheets needed for consultant review and approvals where a project requires them.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Epoxy Flooring Supplier in Dubai, UAE",
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
        { "@type": "ListItem", position: 3, name: "Epoxy Flooring Supplier in Dubai", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Epoxy flooring materials supply",
      serviceType: "Epoxy flooring supplier",
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Epoxy flooring systems supplied by Lapiz Blue",
        itemListElement: SYSTEMS.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: s.name, description: s.body },
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

export default function EpoxyFlooringSupplierDubaiPage() {
  return (
    <main className="bg-white text-[#161925]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroPreload base={COVER} widths={COVER_WIDTHS} />

      {/* ---------- Cover: editorial copy block, then the flooring photo as a full width band ---------- */}
      <section className="relative w-full bg-[#161925] text-white overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-12 lg:pt-20">
          <nav aria-label="Breadcrumb" className="font-manrope text-sm text-white/60 mb-8">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/construction-chemicals-dubai" className="hover:text-white">Construction chemicals distributor in Dubai</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Epoxy flooring supplier in Dubai</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="font-manrope text-[#BFD7EA] text-sm sm:text-base uppercase tracking-widest">
                Mapei and Laticrete epoxy, ex stock
              </p>
              <h1 className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] mt-3 max-w-[15ch]">
                Epoxy Flooring Supplier in Dubai
              </h1>

              {/* Answer block: self contained, 134 to 167 words, the passage a search engine can lift */}
              <p className="font-manrope text-white/85 text-lg sm:text-xl leading-relaxed mt-8 max-w-[62ch]">
                Lapiz Blue General Trading LLC is an epoxy flooring supplier in Dubai, United Arab Emirates, and the
                authorized distributor of Mapei and Laticrete flooring systems, alongside AkzoNobel CRAFCO Traffic
                Deck coatings. The range covers self levelling epoxy such as Mapefloor I 300 SL, trowelled decorative
                quartz systems such as Laticrete SPARTACOTE Quartz System, polyurethane coatings such as Mapefloor PU
                418, and protective traffic deck coatings such as AkzoNobel CRAFCO Traffic Deck and Mapefloor FC 200
                ME, together with the primers and moisture barriers that complete a system. Stock is held in three
                distribution centres, in Al Quoz (Dubai), Mussafah (Abu Dhabi) and Al Sajaa (Sharjah), with next day
                delivery across the three Emirates for orders placed before 3 pm. Every quotation includes the
                manufacturer&apos;s technical data sheet and safety data sheet. Customers rate Lapiz Blue 4.7 out of 5
                across 179 Google reviews.
              </p>
            </div>

            <div className="lg:pb-2">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                {[
                  ["2", "epoxy flooring brands held ex stock"],
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
            alt="Mapei epoxy flooring system applied on a prepared concrete warehouse floor"
            className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
          />
        </div>
      </section>

      {/* ---------- Application ledger: which system for which space ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="areas-heading">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Specification</p>
            <h2 id="areas-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
              Which epoxy flooring system for which space?
            </h2>
            <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[46ch]">
              Traffic, chemical exposure, moisture and finish decide the system, not the brand. Six spaces cover
              almost every epoxy flooring package on a UAE site, each linked to the brand pages where the technical
              data sheets live.
            </p>
            <ul className="mt-8 divide-y divide-[#161925]/10 border-y border-[#161925]/10">
              {SYSTEMS.map((s) => (
                <li key={s.name} className="py-4">
                  <h3 className="font-outfit font-semibold text-lg">{s.name}</h3>
                  <p className="font-manrope text-[#161925]/70 text-sm leading-relaxed mt-1">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <ol className="divide-y divide-[#161925]/10 border-y border-[#161925]/10">
            {AREAS.map((a, i) => (
              <li key={a.name} className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 py-7">
                <span className="font-manrope text-sm text-[#406E8E] tabular-nums pt-1">0{i + 1}</span>
                <div>
                  <h3 className="font-outfit font-semibold text-xl sm:text-2xl">{a.name}</h3>
                  <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-2">{a.body}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {a.links.map((l) => (
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

      {/* ---------- Brands: two authorized epoxy flooring lines ---------- */}
      <section aria-labelledby="brands-heading" className="bg-[#F6F8FA]">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Authorized distribution</p>
          <h2 id="brands-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
            Epoxy flooring brands we are authorized to distribute
          </h2>
          <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[62ch]">
            Lapiz Blue General Trading LLC buys directly from the manufacturer or its regional company, so every
            pail and kit is genuine, batch traceable and covered by the manufacturer&apos;s warranty. The Mapei
            authorization certificate is published on the{" "}
            <Link href="/about" className="text-[#406E8E] underline underline-offset-4">About page</Link>. We also
            supply <Link href="/brands/akzonobel/flooring" className="text-[#406E8E] underline underline-offset-4">AkzoNobel CRAFCO Traffic Deck coatings</Link>{" "}
            for car parks and traffic areas.
          </p>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRANDS.map((b) => (
              <li key={b.name} className="rounded-2xl bg-white border border-[#161925]/10 overflow-hidden flex flex-col">
                <div className="relative w-full h-48 bg-[#F6F8FA]">
                  <Image
                    src={b.image}
                    alt={b.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
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
          Where to buy epoxy flooring in Dubai, Abu Dhabi and Sharjah
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
                How to choose an epoxy flooring supplier in Dubai
              </h2>
              <p className="font-manrope text-white/75 text-lg mt-5 max-w-[46ch]">
                A floor that blisters or wears through shows up long after the invoice is paid. These five checks
                decide whether the system performs and whether the manufacturer stands behind it.
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
            Epoxy flooring in Dubai, answered
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
            <h2 className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl max-w-[18ch] leading-tight">Send the floor area and use, get a priced quote today</h2>
            <p className="font-manrope text-white text-lg mt-4 max-w-[52ch]">
              WhatsApp the area type, traffic, substrate and square metres, or the bill of quantities, and the Dubai
              team replies with the right epoxy system, pricing, stock and data sheets the same working day.
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
          Epoxy flooring is one of eight product families from Lapiz Blue General Trading LLC, the{" "}
          <Link href="/construction-chemicals-dubai" className="underline underline-offset-4">construction chemicals distributor in Dubai</Link>{" "}
          behind tile adhesives, waterproofing, repair mortars, screeds and sealants for the same sites. Application
          is handled by our sister company <a href="https://www.60newton.com" className="underline underline-offset-4">Sixty Newton Technical Services</a>.
        </p>
      </section>
    </main>
  );
}

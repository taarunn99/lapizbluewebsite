import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StaticHeroPicture, HeroPreload } from "@/components/ui/static-hero-picture";
import { BrandsLocationMap } from "@/components/ui/brands-location-map";

// Category page for "waterproofing supplier in Dubai", a child of the
// construction chemicals hub. Every product, application and claim here is
// taken from the waterproofing product lines in src/data/brandConfigs.ts for
// Mapei, Laticrete, Weber and Kerakoll, and every company figure from the hub.

const PAGE_URL = "https://www.lapizblue.com/waterproofing-supplier-dubai";
const HUB_URL = "https://www.lapizblue.com/construction-chemicals-dubai";
const ORG_ID = "https://www.lapizblue.com/#organization";
const COVER = "/images/brands/mapei/waterproofing/waterproofing-hero";
const COVER_WIDTHS = [640, 828, 1200, 1440, 1920];
const WHATSAPP =
  "https://api.whatsapp.com/send?phone=971502814338&text=" +
  encodeURIComponent("Hi Lapiz Blue, I need a quote for waterproofing in Dubai.");

export const metadata: Metadata = {
  title: "Waterproofing Supplier in Dubai, UAE | Lapiz Blue",
  description:
    "Lapiz Blue General Trading LLC supplies Mapei, Laticrete, Weber and Kerakoll waterproofing membranes ex stock in Dubai, with TDS, SDS and next day delivery.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Waterproofing Supplier in Dubai, UAE | Lapiz Blue",
    description:
      "Authorized distributor of Mapei, Laticrete, Weber and Kerakoll waterproofing: cementitious, polyurethane, liquid applied and sheet membranes from three UAE distribution centres.",
    url: PAGE_URL,
    siteName: "Lapiz Blue",
    type: "website",
    images: [`${COVER}-1440.webp`],
  },
};

const LINES = {
  mapei: { label: "Mapei waterproofing", href: "/brands/mapei/waterproofing" },
  laticrete: { label: "Laticrete waterproofing", href: "/brands/laticrete/waterproofing" },
  weber: { label: "Weber waterproofing", href: "/brands/weber/waterproofing" },
  kerakoll: { label: "Kerakoll waterproofing", href: "/brands/kerakoll/waterproofing" },
};

// Membrane types held, each backed by named products in brandConfigs
const SYSTEMS = [
  {
    name: "Cementitious membranes",
    body: "Two component polymer modified coatings for under tile wet areas, basements and tanks: Mapelastic Smart, Planiseal 88, weberdry 116 FX, weberdry 130 PR and HYDRO BAN Cementitious.",
  },
  {
    name: "Polyurethane membranes",
    body: "Single and two component liquid polyurethane for terraces, balconies and exposed roofs: Purtop Easy, Purtop 500N, weberdry 360 PU and weberdry 365 MPU.",
  },
  {
    name: "Liquid applied membranes",
    body: "Ready to use brush or roller membranes for bathrooms, showers and roofs: Laticrete HYDRO BAN, Mapelastic Aquadefense Zero, Mapelastic Easy and Aquaflex Roof HR.",
  },
  {
    name: "Sheet and bituminous membranes",
    body: "HYDRO BAN Sheet Membrane for steam rooms and vapour control, Weber BIRAP PL torch applied bituminous sheet, weberdry RBE and weberdry prime SB for foundations.",
  },
  {
    name: "Breathable mineral membranes",
    body: "Kerakoll Aquastop Nanoflex, Aquastop Flex and Aquastop Extreme block liquid water while letting vapour escape, and can be applied over existing tiles.",
  },
];

const AREAS = [
  {
    name: "Wet areas under tiles",
    body: "Bathrooms, showers, kitchens and utility rooms need a seamless membrane under the tiles, with the wall to floor joint, drains and pipe penetrations detailed before any adhesive goes down. Mapelastic Aquadefense Zero and Mapelastic Easy are ready to use liquid membranes for this, Laticrete HYDRO BAN cures to a 0.5 to 0.8 mm load bearing film that can be flood tested after 2 hours, and weberdry cementitious coatings and Kerakoll Aquastop give the same protection in mineral form.",
    links: [LINES.mapei, LINES.laticrete, LINES.weber, LINES.kerakoll],
  },
  {
    name: "Balconies and terraces",
    body: "Movement and thermal cycling make balconies and terraces the most common place for cracked tiles and seepage into the slab below. Mapelastic Smart and Purtop Easy bridge cracks under tiles or exposed, Kerakoll Aquastop Flex is the two component system for terraces and pools, and HYDRO BAN XP covers exterior tiled surfaces in UAE heat.",
    links: [LINES.mapei, LINES.kerakoll, LINES.laticrete],
  },
  {
    name: "Roofs and parapets",
    body: "Exposed roofs need a continuous, UV stable barrier that carries up and over the parapet, with slope and drainage planned before the first coat. Aquaflex Roof HR and Purtop 500N from Mapei and weberdry 360 PU and weberdry roof from Weber are liquid applied roof membranes, and Weber BIRAP PL is the torch applied bituminous sheet for roofs and foundations.",
    links: [LINES.mapei, LINES.weber],
  },
  {
    name: "Basements and below grade",
    body: "Below grade walls and foundations face groundwater pushing from behind the membrane, so the coating has to resist negative as well as positive hydrostatic pressure. weberdry 130 PR is Weber's cement based tanking coating for exactly this, weberdry RBE is the rubberised bitumen protective coat for foundation walls, and Planiseal 88 is Mapei's two component cementitious mortar for basements, foundations and tanks.",
    links: [LINES.weber, LINES.mapei],
  },
  {
    name: "Swimming pools and water features",
    body: "Pools and fountains mean permanent submersion and chlorine, so a standard wet area membrane is the wrong product. Laticrete HYDRO BAN XP is formulated for permanent submersion, Kerakoll Aquastop Nanoflex is anti alkali and chlorine resistant, and Mapelastic Smart is indicated for basins, swimming pools and wet areas.",
    links: [LINES.laticrete, LINES.kerakoll, LINES.mapei],
  },
  {
    name: "Potable water tanks",
    body: "Drinking water tanks, reservoirs and cisterns can only be coated with a product certified for potable water contact. Weber documents weberdry 110 FX for exactly that use, a two component polymer modified cementitious coating that also resists positive and negative pressure. Tell us the tank holds drinking water when you enquire and we quote the certified system only.",
    links: [LINES.weber],
  },
  {
    name: "Renovation over existing tiles",
    body: "Where demolition is not an option, some membranes bond directly to sound existing ceramic and marble. Kerakoll Aquastop systems are designed to be applied over existing dimensionally stable tiles, and Laticrete HYDRO BAN bonds to properly prepared existing tile with a thin profile that keeps floor heights down, with HYDRO BARRIER Plus adding crack isolation for renovation substrates.",
    links: [LINES.kerakoll, LINES.laticrete],
  },
];

const BRANDS = [
  {
    name: "Mapei",
    body: "Flexible cementitious, liquid and polyurethane membranes for wet areas, balconies, roofs, pools and below grade, with the TDS published on every Mapei product page.",
    products: ["Mapelastic Smart", "Mapelastic Aquadefense Zero", "Purtop Easy", "Aquaflex Roof HR", "Planiseal 88"],
    image: "/images/brands/mapei/waterproofing/mapelastic-smart.webp",
    alt: "Mapei Mapelastic Smart two component cementitious waterproofing membrane",
    link: LINES.mapei,
  },
  {
    name: "Laticrete",
    body: "HYDRO BAN liquid rubber membranes with a 2 hour flood test, Microban antimicrobial protection and a colour change indicator, plus a sheet membrane for steam rooms.",
    products: ["HYDRO BAN", "HYDRO BAN XP", "HYDRO BAN Quick Cure", "HYDRO BAN Cementitious", "HYDRO BAN Sheet Membrane"],
    image: "/images/brands/laticrete/waterproofing/hydro-ban.webp",
    alt: "Laticrete HYDRO BAN liquid waterproofing membrane",
    link: LINES.laticrete,
  },
  {
    name: "Weber (Saint-Gobain)",
    body: "weberdry cementitious and polyurethane membranes, bituminous sheets and primers, from potable water tanks and basement tanking to exposed roofs, with less than 10 g/l VOC.",
    products: ["weberdry 116 FX", "weberdry 130 PR", "weberdry 360 PU", "weberdry 365 MPU", "Weber BIRAP PL"],
    image: "/images/brands/weber/waterproofing/weberdry-116-fx.webp",
    alt: "Weber weberdry 116 FX two component cementitious waterproofing slurry",
    link: LINES.weber,
  },
  {
    name: "Kerakoll",
    body: "Breathable Aquastop mineral membranes with GreenBuilding certification that block liquid water, let vapour escape, and can be applied over existing tiles.",
    products: ["Aquastop Nanoflex", "Aquastop Flex", "Aquastop Extreme", "Aquastop Fix", "Nanodefense Eco"],
    image: "/images/brands/kerakoll/waterproofing/aquastop-nanoflex.webp",
    alt: "Kerakoll Aquastop Nanoflex breathable mineral waterproofing membrane",
    link: LINES.kerakoll,
  },
];

const BRANCHES = [
  {
    emirate: "Dubai",
    heading: "Waterproofing supplier in Dubai",
    address: "Shop 12 to 14, 4 Street, Al Quoz Industrial Area 4, Dubai",
    phone: "+971 4 885 5257",
    phoneHref: "tel:+97148855257",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
    body: "Head office and main warehouse in Al Quoz, serving Dubai, Jebel Ali and Dubai South. Same day collection for stock membranes and next day site delivery across Dubai for orders placed before 3 pm.",
  },
  {
    emirate: "Abu Dhabi",
    heading: "Waterproofing supplier in Abu Dhabi",
    address: "Shop 2, Mussafah Industrial Area 40, Abu Dhabi",
    phone: "+971 2 886 7753",
    phoneHref: "tel:+97128867753",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/@24.345846,54.488503,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e40e6c4e8e8e7:0x240c2ef83a9e23d6!8m2!3d24.345846!4d54.488503!16s%2Fg%2F11x7xg6svr?entry=ttu",
    body: "Open since 2021 with the same Mapei, Laticrete and Weber waterproofing systems for Abu Dhabi city, Mussafah, Al Reem, Yas, Saadiyat and Al Ain, including the Al Wathba resort and Al Maya Island works we supplied.",
  },
  {
    emirate: "Sharjah",
    heading: "Waterproofing supplier in Sharjah",
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
    "Lapiz Blue buys Mapei, Laticrete, Weber and Kerakoll waterproofing directly from the manufacturer or its regional company, so every pail and bag is genuine and batch traceable. The Mapei authorization certificate is published on the About page.",
  ],
  [
    "Membrane and tile adhesive from one system",
    "A membrane only performs with a compatible primer, tape and adhesive on top of it. We supply the matching tile adhesive and grout from the same brand, so there is one documented system and one manufacturer behind the whole build up.",
  ],
  [
    "Flood test and curing time that fit the programme",
    "Ask how soon the membrane can be flood tested and tiled. Laticrete HYDRO BAN can be flood tested after 2 hours at 21°C and turns dark green when ready, weberdry 110 FX typically needs 24 to 48 hours before adhesive, and the TDS states the figure for every other product.",
  ],
  [
    "TDS, SDS and submittals with the quote",
    "Every quotation comes with the manufacturer's technical data sheet and safety data sheet for each product, plus submittal support for consultant approval where a project needs it.",
  ],
  [
    "Stock in Dubai and delivery you can plan around",
    "Fast moving membranes are held in Al Quoz, Mussafah and Al Sajaa. Orders placed before 3 pm are delivered the next working day across Dubai, Abu Dhabi and Sharjah, and stock lines can be collected the same day.",
  ],
];

const FAQS = [
  {
    q: "What is the best waterproofing for bathrooms in Dubai?",
    a: "For bathrooms and showers in Dubai, use a seamless under tile membrane applied before the adhesive, with the wall to floor joint, drain and pipe penetrations detailed. Lapiz Blue supplies Mapei Mapelastic Aquadefense Zero and Mapelastic Easy as ready to use liquid membranes, Laticrete HYDRO BAN as a thin load bearing liquid rubber membrane that can be flood tested after 2 hours, and Weber weberdry and Kerakoll Aquastop cementitious options, all with the matching tile adhesive from the same brand.",
  },
  {
    q: "Can waterproofing be applied over existing tiles?",
    a: "Yes, with the right product. Kerakoll Aquastop membranes can be applied directly over existing dimensionally stable ceramic and marble tiles, removing the need for demolition, and Laticrete HYDRO BAN bonds to properly prepared existing tile with a 0.5 to 0.8 mm profile that keeps floor heights down. The existing tiles must be sound and clean, and the TDS for each product states the preparation required.",
  },
  {
    q: "How long before tiling after a cementitious membrane?",
    a: "It depends on the product and site conditions, and the technical data sheet is the reference. Weber states that weberdry 110 FX should cure fully, typically 24 to 48 hours depending on conditions, before tile adhesive is applied. Laticrete HYDRO BAN liquid membrane can be flood tested after 2 hours at 21°C and turns dark green when it is ready for tiling. Lapiz Blue sends the TDS with every quotation so the programme can be planned around the real figure.",
  },
  {
    q: "Is Lapiz Blue an authorized Mapei waterproofing distributor?",
    a: "Yes. Lapiz Blue General Trading LLC is an authorized Mapei distributor in the UAE, and the Mapei authorization certificate is published on the About page. Mapei waterproofing products such as Mapelastic Smart, Mapelastic Aquadefense Zero, Purtop Easy, Aquaflex Roof HR and Planiseal 88 are supplied with batch traceability and the official Mapei technical data sheets from the Dubai, Abu Dhabi and Sharjah branches.",
  },
  {
    q: "Which waterproofing is suitable for swimming pools?",
    a: "Swimming pools need a membrane formulated for permanent submersion and chlorine, not a standard wet area product. Lapiz Blue supplies Laticrete HYDRO BAN XP for pools, fountains and spas, Kerakoll Aquastop Nanoflex, which is anti alkali and chlorine resistant, and Mapei Mapelastic Smart, which is indicated for basins, swimming pools and wet areas.",
  },
  {
    q: "Which waterproofing can be used inside a drinking water tank?",
    a: "Only a product certified for potable water contact. Weber documents weberdry 110 FX as certified for contact with drinking water, so it is the system Lapiz Blue quotes for potable water tanks, reservoirs and cisterns. It is a two component polymer modified cementitious coating that also resists positive and negative hydrostatic pressure, which suits below grade tanks.",
  },
  {
    q: "What is the difference between cementitious and polyurethane waterproofing?",
    a: "Cementitious membranes such as weberdry 116 FX, Mapelastic Smart and Planiseal 88 bond to concrete and masonry and are the usual choice under tiles, in basements and in tanks. Polyurethane membranes such as Mapei Purtop Easy and Weber weberdry 360 PU bond to a wider range of substrates, stay highly elastic and bridge cracks, and are used exposed on terraces, balconies and flat roofs where UV resistance matters. Lapiz Blue stocks both and confirms the right type for the substrate, finish and exposure.",
  },
  {
    q: "Does Lapiz Blue deliver waterproofing materials across Dubai and the UAE?",
    a: "Yes. Lapiz Blue holds waterproofing stock in three distribution centres, at Al Quoz Industrial Area 4 in Dubai, Mussafah Industrial Area 40 in Abu Dhabi and Al Sajaa Industrial Area in Sharjah, and delivers to all seven Emirates. Orders placed before 3 pm are delivered the next working day in Dubai, Abu Dhabi and Sharjah, and stock lines can be collected the same day.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Waterproofing Supplier in Dubai, UAE",
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
        { "@type": "ListItem", position: 3, name: "Waterproofing Supplier in Dubai", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Waterproofing materials supply",
      serviceType: "Waterproofing materials supplier",
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Waterproofing systems supplied by Lapiz Blue",
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

export default function WaterproofingSupplierDubaiPage() {
  return (
    <main className="bg-white text-[#161925]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroPreload base={COVER} widths={COVER_WIDTHS} />

      {/* ---------- Cover: editorial copy block, then the waterproofing application photo as a full width band ---------- */}
      <section className="relative w-full bg-[#161925] text-white overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-12 lg:pt-20">
          <nav aria-label="Breadcrumb" className="font-manrope text-sm text-white/60 mb-8">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/construction-chemicals-dubai" className="hover:text-white">Construction chemicals distributor in Dubai</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Waterproofing supplier in Dubai</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="font-manrope text-[#BFD7EA] text-sm sm:text-base uppercase tracking-widest">
                Mapei, Laticrete, Weber and Kerakoll, ex stock
              </p>
              <h1 className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] mt-3 max-w-[15ch]">
                Waterproofing Supplier in Dubai
              </h1>

              {/* Answer block: self contained, 134 to 167 words, the passage a search engine can lift */}
              <p className="font-manrope text-white/85 text-lg sm:text-xl leading-relaxed mt-8 max-w-[62ch]">
                Lapiz Blue General Trading LLC is a waterproofing supplier in Dubai, United Arab Emirates, and the authorized distributor of
                Mapei, Laticrete, Weber (Saint-Gobain) and Kerakoll waterproofing systems. The range covers cementitious membranes such as
                Mapelastic Smart and weberdry 116 FX, polyurethane membranes such as Purtop Easy and weberdry 360 PU, liquid applied
                membranes such as Laticrete HYDRO BAN and Mapelastic Aquadefense Zero, sheet and bituminous membranes such as HYDRO BAN
                Sheet Membrane and Weber BIRAP PL, and breathable mineral membranes such as Kerakoll Aquastop Nanoflex, together with the
                primers, tapes and crystalline treatments that complete a system. Stock is held in three distribution centres, in Al Quoz
                (Dubai), Mussafah (Abu Dhabi) and Al Sajaa (Sharjah), with next day delivery across the three Emirates for orders placed
                before 3 pm. Every quotation includes the manufacturer&apos;s technical data sheet and safety data sheet. Customers rate
                Lapiz Blue 4.7 out of 5 across 179 Google reviews.
              </p>
            </div>

            <div className="lg:pb-2">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                {[
                  ["4", "waterproofing brands held ex stock"],
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
            alt="Mapei waterproofing membrane being applied on site before tiling"
            className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
          />
        </div>
      </section>

      {/* ---------- Application ledger: which system for which area ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="areas-heading">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Specification</p>
            <h2 id="areas-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
              Which waterproofing system for which area?
            </h2>
            <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[46ch]">
              Water pressure, substrate, movement and finish decide the membrane, not the brand. Seven areas cover almost every waterproofing
              package on a UAE site, each linked to the brand pages where the technical data sheets live.
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

      {/* ---------- Brands: four authorized waterproofing lines ---------- */}
      <section aria-labelledby="brands-heading" className="bg-[#F6F8FA]">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Authorized distribution</p>
          <h2 id="brands-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
            Waterproofing brands we are authorized to distribute
          </h2>
          <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[62ch]">
            Lapiz Blue General Trading LLC buys directly from the manufacturer or its regional company, so every pail, bag and roll is genuine,
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
          Where to buy waterproofing in Dubai, Abu Dhabi and Sharjah
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
                How to choose a waterproofing supplier in Dubai
              </h2>
              <p className="font-manrope text-white/75 text-lg mt-5 max-w-[46ch]">
                A leak shows up long after the invoice is paid. These five checks decide whether the membrane performs and whether the
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

      {/* ---------- FAQ ---------- */}
      <section className="bg-[#F6F8FA]" aria-labelledby="faq-heading">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Questions contractors ask</p>
          <h2 id="faq-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
            Waterproofing in Dubai, answered
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
            <h2 className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl max-w-[18ch] leading-tight">Send the waterproofing BOQ, get a priced quote today</h2>
            <p className="font-manrope text-white text-lg mt-4 max-w-[52ch]">
              WhatsApp the area type, substrate, finish and square metres, or the bill of quantities, and the Dubai team replies with the
              right system, pricing, stock and data sheets the same working day.
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
          Waterproofing is one of eight product families from Lapiz Blue General Trading LLC, the{" "}
          <Link href="/construction-chemicals-dubai" className="underline underline-offset-4">construction chemicals distributor in Dubai</Link>{" "}
          behind tile adhesives, repair mortars, screeds, flooring and sealants for the same sites. Application is handled by our sister
          company <a href="https://www.60newton.com" className="underline underline-offset-4">Sixty Newton Technical Services</a>.
        </p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StaticHeroPicture, HeroPreload } from "@/components/ui/static-hero-picture";
import { BrandsLocationMap } from "@/components/ui/brands-location-map";

// Category page for "concrete repair supplier in Dubai", a child of the
// construction chemicals hub. Every product, application and claim here is
// taken from the concrete-additives-and-repair-systems line (Mapei) and the
// repair-and-anchoring line (Weber) in src/data/brandConfigs.ts, and every
// company figure from the hub and waterproofing pages. Pidilite Puma's
// epoxy-repair line in brandConfigs.ts is commented out as a draft with no
// live page or images, so it is not used here.

const PAGE_URL = "https://www.lapizblue.com/concrete-repair-supplier-dubai";
const HUB_URL = "https://www.lapizblue.com/construction-chemicals-dubai";
const ORG_ID = "https://www.lapizblue.com/#organization";
const COVER = "/images/brands/mapei/concrete-additives/concrete-additives-hero";
const COVER_WIDTHS = [640, 828, 1200, 1440, 1920];
const WHATSAPP =
  "https://api.whatsapp.com/send?phone=971502814338&text=" +
  encodeURIComponent("Hi Lapiz Blue, I need a quote for concrete repair products in Dubai.");

export const metadata: Metadata = {
  title: "Concrete Repair Supplier in Dubai, UAE | Lapiz Blue",
  description:
    "Lapiz Blue General Trading LLC supplies Mapei and Weber concrete repair mortars, grouts and admixtures ex stock in Dubai, with TDS, SDS and next day delivery.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Concrete Repair Supplier in Dubai, UAE | Lapiz Blue",
    description:
      "Authorized distributor of Mapei and Weber (Saint-Gobain) concrete repair systems: structural and cosmetic repair mortars, bonding agents, corrosion inhibitors, non shrink grouts, admixtures and anchoring from three UAE distribution centres.",
    url: PAGE_URL,
    siteName: "Lapiz Blue",
    type: "website",
    images: [`${COVER}-1440.webp`],
  },
};

const LINES = {
  mapei: { label: "Mapei concrete repair and admixtures", href: "/brands/mapei/concrete-additives-and-repair-systems" },
  weber: { label: "Weber repair and anchoring", href: "/brands/weber/repair-and-anchoring" },
};

// Product categories held, each backed by named products in brandConfigs
const SYSTEMS = [
  {
    name: "Structural repair mortars",
    body: "Fiber reinforced, high strength mortars for beams, columns and slabs: Mapegrout ME05, Mapegrout ME06 and webertec 306 EHS.",
  },
  {
    name: "Cosmetic and non shrink mortars",
    body: "Shrinkage compensated mortars for honeycombing and shallow patching: Planitop 105 ME, Planitop 400 ME and weberep ST.",
  },
  {
    name: "Bonding agents and corrosion inhibitors",
    body: "Primers and passivating coats that treat rusting rebar and bond new mortar to old concrete, from both the Mapei and Weber ranges.",
  },
  {
    name: "Non shrink grouts",
    body: "Pourable grouts for voids, anchors and machine base plates: Mapefill GP ME, weberep 350 NSG and webertec grout FG.",
  },
  {
    name: "Admixtures and chemical anchors",
    body: "Dynamon SX superplasticiser for new concrete pours, and weberanc 405 BFX and weberanc 435 VE chemical anchors for structural fixings.",
  },
];

const AREAS = [
  {
    name: "Spalling and rebar corrosion",
    body: "Spalled concrete usually means the rebar underneath is corroding and expanding, so the steel has to be treated before the patch goes on. Weber pairs a corrosion inhibiting primer with weberep 331 TX thixotropic mortar for overhead and vertical facade repairs, and Mapei follows the same sequence, cleaning and priming exposed rebar before Mapegrout structural mortar goes on. Skipping the rebar step is the most common reason a patch repair fails again within a year.",
    links: [LINES.weber, LINES.mapei],
  },
  {
    name: "Cracks",
    body: "Not every crack needs the same treatment: a structural crack has to transfer load across the gap, while a crack that only needs sealing can use a simpler resin. Mapei supplies injection resins and grouts for structural crack bonding or waterproofing intent, and the right choice depends on crack width, depth and whether load transfer is required. Weber's fiber reinforced repair mortars add crack resistance where a wider patch is moving under traffic or thermal cycling.",
    links: [LINES.mapei, LINES.weber],
  },
  {
    name: "Honeycombing",
    body: "Honeycombed concrete, where the mix has not consolidated around the formwork or reinforcement, leaves voids that trap moisture and weaken the cover. Mapei's non shrink repair mortars, Planitop 105 ME and Planitop 400 ME, are formulated to patch these surface defects without shrinking away from the substrate once they cure. Surface prep, cleaning, roughening and priming, decides whether the patch bonds for the long term.",
    links: [LINES.mapei],
  },
  {
    name: "Structural strengthening",
    body: "When a beam, column or slab has to carry load again, not just look repaired, the mortar has to meet engineered strength and bonding requirements rather than a generic patch. Weber's webertec 306 EHS is an extra high strength repair mortar for load bearing structural repairs, and Mapei's structural grade Mapegrout mortars are built to restore sections of beams, columns and slabs. Both ranges are fiber reinforced for the crack resistance that dynamic structural loading needs.",
    links: [LINES.weber, LINES.mapei],
  },
  {
    name: "Machine base grouting",
    body: "Machinery base plates and anchor bolts need a pourable grout that fills the void completely and does not shrink away as it cures, or the equipment moves out of alignment. Weber's weberep 350 NSG is a non shrink grout made for precision anchoring and machine base plate grouting, and webertec grout FG is the fine grain version for tight spaces. Mapei's Mapefill GP ME is the equivalent pourable, non shrink grout for anchoring and filling voids in Middle East heat.",
    links: [LINES.weber, LINES.mapei],
  },
  {
    name: "Surface levelling after repair",
    body: "Once a damaged area is structurally repaired, the floor still has to be brought back flat and fast before the floor covering goes down. Mapei's Topcem Pronto is a quick setting, ready to use binder for fast track screeds that lets floor coverings go down within 24 hours. It is the levelling step that follows a repair, not a replacement for the repair mortar itself.",
    links: [LINES.mapei],
  },
];

const BRANDS = [
  {
    name: "Mapei",
    body: "Admixtures for new concrete, non shrink repair mortars for spalling and honeycombing, and pourable grouts for anchoring, from the concrete additives and repair systems line with the TDS published on every Mapei product page.",
    products: ["Dynamon SX", "Mapegrout ME05", "Mapegrout ME06", "Planitop 400 ME", "Mapefill GP ME"],
    image: "/images/brands/mapei/concrete-additives/mapegrout-me05.webp",
    alt: "Mapei Mapegrout ME05 structural concrete repair mortar",
    link: LINES.mapei,
  },
  {
    name: "Weber (Saint-Gobain)",
    body: "weberep structural and cosmetic repair mortars, webertec bonding slurries and non shrink grouts, and weberanc chemical anchors, from a 58 product repair range engineered by Saint-Gobain for Gulf conditions.",
    products: ["weberep 331 TX", "weberep 360 FFR", "webertec 306 EHS", "webertec grout FG", "weberanc 405 BFX"],
    image: "/images/brands/weber/repair-anchoring/weberep-331-tx.webp",
    alt: "Weber weberep 331 TX thixotropic concrete repair mortar",
    link: LINES.weber,
  },
];

const BRANCHES = [
  {
    emirate: "Dubai",
    heading: "Concrete repair supplier in Dubai",
    address: "Shop 12 to 14, 4 Street, Al Quoz Industrial Area 4, Dubai",
    phone: "+971 4 885 5257",
    phoneHref: "tel:+97148855257",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
    body: "Head office and main warehouse in Al Quoz, serving Dubai, Jebel Ali and Dubai South. Same day collection for stock repair mortars and grouts, and next day site delivery across Dubai for orders placed before 3 pm.",
  },
  {
    emirate: "Abu Dhabi",
    heading: "Concrete repair supplier in Abu Dhabi",
    address: "Shop 2, Mussafah Industrial Area 40, Abu Dhabi",
    phone: "+971 2 886 7753",
    phoneHref: "tel:+97128867753",
    map: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/@24.345846,54.488503,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e40e6c4e8e8e7:0x240c2ef83a9e23d6!8m2!3d24.345846!4d54.488503!16s%2Fg%2F11x7xg6svr?entry=ttu",
    body: "Open since 2021 with the same Mapei and Weber repair systems for Abu Dhabi city, Mussafah, Al Reem, Yas, Saadiyat and Al Ain, including the Al Wathba resort and Al Maya Island works we supplied.",
  },
  {
    emirate: "Sharjah",
    heading: "Concrete repair supplier in Sharjah",
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
    "Lapiz Blue buys Mapei and Weber concrete repair products directly from the manufacturer or its regional company, so every bag and pail is genuine and batch traceable. The Mapei authorization certificate is published on the About page.",
  ],
  [
    "Rebar corrosion treated before patching",
    "Repairing concrete over corroding steel leads to repeat failure within a year. Expose the rebar, remove rust and loose concrete, clean the steel, then apply a corrosion inhibiting primer before any Mapegrout or weberep mortar goes on.",
  ],
  [
    "Non shrink mortar matched to the parent concrete",
    "A repair mortar that shrinks as it cures pulls away from the substrate, and one weaker than the parent concrete becomes the next point of failure. weberep ST and Mapei's Planitop and Mapegrout mortars are shrinkage compensated and should match or exceed the compressive strength of the concrete around them.",
  ],
  [
    "TDS, SDS and submittals with the quote",
    "Every quotation comes with the manufacturer's technical data sheet and safety data sheet for each product, plus EN and BS compliance references and submittal support where a consultant needs them.",
  ],
  [
    "Stock in Dubai and delivery you can plan around",
    "Fast moving repair mortars, grouts and admixtures are held in Al Quoz, Mussafah and Al Sajaa. Orders placed before 3 pm are delivered the next working day across Dubai, Abu Dhabi and Sharjah, and stock lines can be collected the same day.",
  ],
];

const FAQS = [
  {
    q: "What is a non shrink repair mortar and when do I use it?",
    a: "A non shrink repair mortar is designed to fill voids and patch surface defects without shrinking away from the substrate as it cures. Mapei's Planitop 105 ME and Planitop 400 ME are formulated this way for cosmetic repairs, honeycombing and shallow patching where structural performance is not the priority, and Weber's weberep ST mortar mixes with water only to the same non shrink, high adhesion result.",
  },
  {
    q: "When do I need structural repair mortar instead of a cosmetic patch?",
    a: "Use structural repair mortar when the repair has to carry load or restore structural integrity, such as beam soffits, column corners or slab sections. Mapei's Mapegrout ME05 and Mapegrout ME06 meet higher strength and bonding requirements for exactly this, and Weber's webertec 306 EHS is formulated as an extra high strength mortar for load bearing structural repairs.",
  },
  {
    q: "How do I treat corroded rebar before concrete repair?",
    a: "Expose the rebar, remove rust and loose concrete, clean the steel thoroughly, then apply a corrosion inhibiting primer before the repair mortar goes on. Skipping this step is the most common reason a patch repair fails again within a year. Both Mapei and Weber supply the primers and passivating coats needed before Mapegrout or weberep mortar is applied.",
  },
  {
    q: "What is the difference between repair mortar and micro concrete?",
    a: "Repair mortars such as weberep ST are fine aggregate products for surface repairs up to 50 mm deep per layer. Micro concrete such as weberep 311 MC contains coarse aggregate for deep section repairs and void filling, suitable for repairs from 50 mm to over 100 mm per pour.",
  },
  {
    q: "What makes an epoxy repair mortar different from a cementitious one?",
    a: "Weber's weberep epo 410 is a three component fast setting epoxy mortar with exceptional chemical resistance. It resists petroleum, oil, grease, acids, alkalis, solvents and salt water where cementitious mortars would deteriorate, and it bonds to steel, concrete and bricks with high adhesion.",
  },
  {
    q: "Can Weber repair products be used for anchoring applications?",
    a: "Yes. Weber offers both cementitious and epoxy anchoring grouts. Cementitious grouts such as weberep 350 NSG and webertec grout FG suit static anchors and machine base plates in dry conditions, while epoxy grouts such as weberep epo 410 provide higher strength and chemical resistance for more demanding anchor applications.",
  },
  {
    q: "Is Lapiz Blue an authorized Mapei distributor for concrete repair products?",
    a: "Yes. Lapiz Blue General Trading LLC is an authorized Mapei distributor in the UAE, and the Mapei authorization certificate is published on the About page. Mapei concrete repair products such as Mapegrout ME05, Planitop 400 ME, Mapefill GP ME and Dynamon SX admixtures are supplied with batch traceability and the official Mapei technical data sheets from the Dubai, Abu Dhabi and Sharjah branches.",
  },
  {
    q: "Does Lapiz Blue deliver concrete repair materials across Dubai, Abu Dhabi and Sharjah?",
    a: "Yes. Lapiz Blue holds concrete repair stock in three distribution centres, at Al Quoz Industrial Area 4 in Dubai, Mussafah Industrial Area 40 in Abu Dhabi and Al Sajaa Industrial Area in Sharjah, and delivers to all seven Emirates. Orders placed before 3 pm are delivered the next working day in Dubai, Abu Dhabi and Sharjah, and stock lines can be collected the same day.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Concrete Repair Supplier in Dubai, UAE",
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
        { "@type": "ListItem", position: 3, name: "Concrete Repair Supplier in Dubai", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Concrete repair products supply",
      serviceType: "Concrete repair products supplier",
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Concrete repair systems supplied by Lapiz Blue",
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

export default function ConcreteRepairSupplierDubaiPage() {
  return (
    <main className="bg-white text-[#161925]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroPreload base={COVER} widths={COVER_WIDTHS} />

      {/* ---------- Cover: editorial copy block, then the concrete repair photo as a full width band ---------- */}
      <section className="relative w-full bg-[#161925] text-white overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-12 lg:pt-20">
          <nav aria-label="Breadcrumb" className="font-manrope text-sm text-white/60 mb-8">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/construction-chemicals-dubai" className="hover:text-white">Construction chemicals distributor in Dubai</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Concrete repair supplier in Dubai</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="font-manrope text-[#BFD7EA] text-sm sm:text-base uppercase tracking-widest">
                Mapei and Weber (Saint-Gobain), ex stock
              </p>
              <h1 className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] mt-3 max-w-[15ch]">
                Concrete Repair Supplier in Dubai
              </h1>

              {/* Answer block: self contained, 134 to 167 words, the passage a search engine can lift */}
              <p className="font-manrope text-white/85 text-lg sm:text-xl leading-relaxed mt-8 max-w-[62ch]">
                Lapiz Blue General Trading LLC is a concrete repair supplier in Dubai, United Arab Emirates, and the authorized
                distributor of Mapei and Weber (Saint-Gobain) concrete repair systems. The range covers structural repair mortars
                such as Mapegrout ME05 and webertec 306 EHS, cosmetic and non shrink repair mortars such as Planitop 400 ME and
                weberep 331 TX, bonding agents and corrosion inhibiting primers for rebar treatment, non shrink grouts such as
                Mapefill GP ME and weberep 350 NSG for anchoring and machine base plates, and Dynamon SX admixtures for new
                concrete pours. Stock is held in three distribution centres, in Al Quoz (Dubai), Mussafah (Abu Dhabi) and Al
                Sajaa (Sharjah), with next day delivery across the three Emirates for orders placed before 3 pm. Every quotation
                includes the manufacturer&apos;s technical data sheet and safety data sheet. Customers rate Lapiz Blue 4.7 out of
                5 across 179 Google reviews.
              </p>
            </div>

            <div className="lg:pb-2">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                {[
                  ["58", "Weber repair mortars and grouts held"],
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
            alt="Mapei concrete repair system application on structural element"
            className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
          />
        </div>
      </section>

      {/* ---------- Application ledger: which system for which defect ---------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="areas-heading">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Specification</p>
            <h2 id="areas-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
              Which concrete repair system for which defect?
            </h2>
            <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[46ch]">
              The defect and the structural intent decide the mortar, not the brand. Five product categories cover almost every
              concrete repair package on a UAE site, each linked to the brand pages where the technical data sheets live.
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

      {/* ---------- Brands: two authorized concrete repair lines ---------- */}
      <section aria-labelledby="brands-heading" className="bg-[#F6F8FA]">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Authorized distribution</p>
          <h2 id="brands-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
            Concrete repair brands we are authorized to distribute
          </h2>
          <p className="font-manrope text-[#161925]/75 text-lg mt-5 max-w-[62ch]">
            Lapiz Blue General Trading LLC buys directly from the manufacturer or its regional company, so every bag, pail and
            cartridge is genuine, batch traceable and covered by the manufacturer&apos;s warranty. The Mapei authorization
            certificate is published on the{" "}
            <Link href="/about" className="text-[#406E8E] underline underline-offset-4">About page</Link>.
          </p>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[920px]">
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
          Where to buy concrete repair materials in Dubai, Abu Dhabi and Sharjah
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
                How to choose a concrete repair supplier in Dubai
              </h2>
              <p className="font-manrope text-white/75 text-lg mt-5 max-w-[46ch]">
                A patch that fails shows up long after the invoice is paid. These five checks decide whether the repair holds and
                whether the manufacturer stands behind it.
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
            Concrete repair in Dubai, answered
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
            <h2 className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl max-w-[18ch] leading-tight">Send the concrete repair BOQ, get a priced quote today</h2>
            <p className="font-manrope text-white text-lg mt-4 max-w-[52ch]">
              WhatsApp the defect type, substrate, area or depth and the bill of quantities, and the Dubai team replies with the
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
          Concrete repair is one of eight product families from Lapiz Blue General Trading LLC, the{" "}
          <Link href="/construction-chemicals-dubai" className="underline underline-offset-4">construction chemicals distributor in Dubai</Link>{" "}
          behind tile adhesives, waterproofing, screeds, flooring and sealants for the same sites. Application is handled by our
          sister company <a href="https://www.60newton.com" className="underline underline-offset-4">Sixty Newton Technical Services</a>.
        </p>
      </section>
    </main>
  );
}

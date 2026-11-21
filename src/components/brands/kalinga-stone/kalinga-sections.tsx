import Link from "next/link";
import { KalingaQuoteForm } from "./quote-form.client";

/**
 * The sections the Kalinga Stone pages gained for the Google Ads campaign:
 * who we sell to, the three materials with the warehouse photographs from
 * gcbuae.com, the documents a consultant asks for, the technical data from
 * the printed catalogue, and the quote form. All server rendered except the
 * form. Shared by the hub and the four line pages.
 */

const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12";
const eyebrow = "font-manrope text-[#406E8E] text-sm uppercase tracking-widest";
const h2 = "font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight text-[#161925]";

/**
 * The four line pages are set in the gcbuae.com family (limestone ground,
 * Cormorant headlines, verde and midnight). `variant="gcb"` swaps the
 * palette and type of a section; the hub keeps the house look by default.
 */
export type KalingaVariant = "house" | "gcb";
const TONES = {
  house: {
    eyebrow,
    h2,
    paper: "bg-[#F6F8FA]",
    white: "bg-white",
    card: "rounded-2xl border border-[#161925]/10 bg-white",
    ink: "text-[#161925]",
    body: "text-[#161925]/75",
    soft: "text-[#161925]/60",
    h3: "font-outfit font-semibold",
    button: "rounded-full border border-[#161925]/25 px-5 font-manrope text-sm font-semibold text-[#161925] transition-colors hover:border-[#161925] hover:bg-[#161925] hover:text-white",
    rule: "border-[#161925]/10",
    ruleStrong: "border-[#161925]/20",
  },
  gcb: {
    eyebrow: "label-sh text-[#355E4D]",
    h2: "font-[family-name:var(--font-cormorant)] font-light text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] mt-3 leading-[1.1] text-[#0C1510]",
    paper: "bg-[#F7F8F5] border-t border-[#0C1510]/12",
    white: "bg-[#F7F8F5] border-t border-[#0C1510]/12",
    card: "rounded-xl border border-[#D2D4C8] bg-white",
    ink: "text-[#0C1510]",
    body: "text-[#0C1510]/66",
    soft: "text-[#0C1510]/60",
    h3: "font-[family-name:var(--font-cormorant)] font-normal",
    button: "rounded-full border border-[#0C1510]/25 px-5 label-sh text-[#0C1510] transition-colors hover:border-[#0C1510] hover:bg-[#0C1510] hover:text-[#F7F8F5]",
    rule: "border-[#0C1510]/12",
    ruleStrong: "border-[#0C1510]/25",
  },
} as const;

function GcbPicture({ name, alt, className = "", sizes = "(max-width: 1024px) 100vw, 33vw", ratio = "3/2" }: { name: string; alt: string; className?: string; sizes?: string; ratio?: string }) {
  const base = `/images/brands/kalinga-stone/gcb/${name}`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1200.avif 1200w, ${base}-1600.avif 1600w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w, ${base}-1600.webp 1600w`} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}-1200.webp`} alt={alt} width={1200} height={800} loading="lazy" decoding="async" className={`block w-full object-cover ${className}`} style={{ aspectRatio: ratio }} />
    </picture>
  );
}

export const KALINGA_RANGES = [
  { slug: "engineered-quartz", name: "Quartz", shades: 69, line: "Seven series, 20 mm, up to the 3300 x 2000 mm superjumbo. NSF food safe, Microban options.", image: "kalingastone-quartz-hero" },
  { slug: "engineered-marble", name: "Engineered marble", shades: 35, line: "Five series in 304 x 125 cm slabs, polished past 85 percent gloss, repolishable in situ.", image: "kalingastone-marble-hero" },
  { slug: "terrazzo", name: "Terrazzo", shades: 24, line: "Five collections, class A1 fire rated, exterior grade, with fluted panel options.", image: "kalingastone-terrazzo-hero" },
];

/** The three materials, with the slabs on the racks at Al Sajaa. */
export function KalingaRanges() {
  return (
    <section className="bg-white" aria-labelledby="kalinga-ranges-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <p className={eyebrow}>One brand, three materials, 128 shades in stock</p>
        <h2 id="kalinga-ranges-heading" className={`${h2} max-w-[22ch]`}>Which Kalinga Stone material for which part of the project?</h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {KALINGA_RANGES.map((r, i) => (
            <li key={r.slug} className="group overflow-hidden rounded-2xl border border-[#161925]/10 bg-white">
              <Link href={`/brands/kalinga-stone/${r.slug}`} className="block">
                <GcbPicture name={r.image} alt={`Kalinga Stone ${r.name.toLowerCase()} slabs on the racks at the Al Sajaa warehouse`} className="transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-outfit font-semibold text-2xl text-[#161925]">{r.name}</h3>
                    <span className="font-outfit font-semibold text-3xl text-[#406E8E] tabular-nums">{r.shades}<span className="label-sh ml-2 text-[#161925]/60">shades</span></span>
                  </div>
                  <p className="font-manrope text-[#161925]/75 text-sm leading-relaxed mt-3">{r.line}</p>
                  <span className="mt-4 inline-block font-manrope text-sm font-semibold text-[#406E8E] underline underline-offset-4">0{i + 1} Enter the range</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="font-manrope text-[#161925]/70 text-sm mt-6">
          Elixir, the premium curated collection, is quoted against current stock at Al Sajaa:{" "}
          <Link href="/brands/kalinga-stone/elixir" className="text-[#406E8E] underline underline-offset-4">see the Elixir page</Link>.
        </p>
      </div>
    </section>
  );
}

const PROJECTS = [
  { name: "Burj Khalifa International", place: "Dubai" },
  { name: "Il Villaggio", place: "Dubai" },
  { name: "Pullman twin towers", place: "Doha" },
  { name: "Netflix Headquarters", place: "Los Angeles, terrazzo" },
  { name: "Hong Kong International Airport", place: "quartz" },
  { name: "Gaomad Mall", place: "Beijing, marble" },
];

const BUYERS = [
  { who: "Main contractors and fit out companies", what: "Slab counts and BOQ pricing per package: vanities, lobbies, cladding, reception desks. Call offs released against the programme, delivered to site or to the workshop." },
  { who: "Fabricators and joinery workshops", what: "Full slabs on racks, viewed and tagged by lot before purchase. Supply only pricing, cutting, edges and cutouts stay with your workshop. Collection from Al Sajaa or delivery to you." },
  { who: "Developers and facility managers", what: "One shade across a tower or a hotel, held in stock for the whole programme, with replacement slabs from the same series years later." },
  { who: "Consultants and designers", what: "Samples for client approval, the reseller letter for the submittal, the technical data per material, and a named contact for the specification." },
  { who: "Traders and resellers", what: "Wholesale AED pricing from Sharjah stock, with approved trade accounts up to 30 days." },
];

/** Who buys Kalinga Stone from Lapiz Blue, named. */
export function KalingaBuyers() {
  return (
    <section className="bg-[#161925] text-white" aria-labelledby="kalinga-buyers-heading">
      <div className={`${wrap} py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16`}>
        <div>
          <p className="font-manrope text-[#BFD7EA] text-sm uppercase tracking-widest">Who we supply</p>
          <h2 id="kalinga-buyers-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">Kalinga Stone, bought by the project</h2>
          <p className="font-manrope text-white/75 text-lg mt-5 max-w-[42ch]">
            Slabs are held at the Global Classic Building Materials warehouse in Al Sajaa, Sharjah. Lapiz Blue quotes and supplies from Dubai, Abu Dhabi and Sharjah. We supply; application is through Sixty Newton Technical Services LLC or your own fabricator.
          </p>
          <a href="#kalinga-quote" className="mt-8 inline-flex min-h-[3rem] items-center rounded-full bg-[#F3DFC1] px-7 font-manrope text-sm font-semibold text-[#161925] transition-opacity hover:opacity-90">Send the BOQ for pricing</a>
          <div className="mt-12">
            <p className="label-sh text-[#BFD7EA]">Where the brand is already installed</p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {PROJECTS.map((pr) => (
                <li key={pr.name} className="font-manrope text-sm text-white/85 border-l border-[#F3DFC1]/50 pl-3">
                  <span className="font-semibold text-white">{pr.name}</span>
                  <span className="text-white/60">, {pr.place}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ol className="divide-y divide-white/10 border-y border-white/10">
          {BUYERS.map((b, i) => (
            <li key={b.who} className="grid grid-cols-[auto_1fr] gap-x-6 py-6">
              <span className="font-outfit font-semibold text-3xl text-[#F3DFC1] tabular-nums leading-none pt-1">0{i + 1}</span>
              <div>
                <h3 className="font-outfit font-semibold text-xl sm:text-2xl leading-snug">{b.who}</h3>
                <p className="font-manrope text-white/80 text-base leading-relaxed mt-2">{b.what}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const DOCS = [
  { title: "Kalinga Stone authorised reseller letter", detail: "Names Global Classic Building Materials Trading LLC, a Lapiz Group company, as the authorised KalingaStone reseller for the Northern Emirates. For the consultant submittal.", href: "/certificates/kalingastone-authorized-reseller.pdf", kind: "PDF" },
  { title: "Technical data, quartz, marble and terrazzo", detail: "Density, absorption, flexural and compressive strength, hardness, fire class, slip and chemical resistance with the test standard for each, transcribed from the printed catalogue.", href: "#kalinga-technical-data", kind: "On this page" },
  { title: "Global Classic company profile", detail: "The sister company that holds the Kalinga Stone stock: ranges, warehouse, selected projects, 15 pages.", href: "/documents/global-classic-profile.pdf", kind: "PDF" },
  { title: "Lapiz Blue trade licence, TRN and letters", detail: "Everything a vendor registration asks for, in one pack.", href: "/credentials", kind: "Page" },
];

/** The downloads a consultant asks for. */
export function KalingaDownloads({ variant = "house" }: { variant?: KalingaVariant } = {}) {
  const t = TONES[variant];
  return (
    <section className={t.paper} aria-labelledby="kalinga-docs-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <p className={t.eyebrow}>For the submittal</p>
        <h2 id="kalinga-docs-heading" className={`${t.h2} max-w-[22ch]`}>Documents for consultant approval and vendor registration</h2>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {DOCS.map((d) => (
            <li key={d.href} className={`flex flex-col p-6 ${t.card}`}>
              <p className={`label-sh ${t.soft}`}>{d.kind}</p>
              <h3 className={`${t.h3} text-xl mt-2 leading-snug ${t.ink}`}>{d.title}</h3>
              <p className={`font-manrope ${t.body} text-sm leading-relaxed mt-2 grow`}>{d.detail}</p>
              <a href={d.href} {...(d.href.endsWith(".pdf") ? { target: "_blank", rel: "noopener" } : {})} className={`mt-5 inline-flex min-h-[2.75rem] w-fit items-center ${t.button}`}>
                {d.href.endsWith(".pdf") ? "Open the PDF" : "Open"}
              </a>
            </li>
          ))}
        </ul>
        <p className={`font-manrope ${t.body} text-sm mt-6`}>Samples of any stocked shade are free for trade, for client approval; ask on the form below.</p>
      </div>
    </section>
  );
}

type Row = [string, string, string];
const TECH: { material: string; rows: Row[] }[] = [
  {
    material: "Quartz",
    rows: [
      ["Apparent density", "ASTM C 97 / EN 14617-1", "over 2.1 kg/dm3"],
      ["Water absorption", "ASTM C 97 / EN 14617-1", "under 0.05 percent"],
      ["Flexural strength", "ASTM C 880 / EN 14617-2", "40 to 60 MPa"],
      ["Compressive strength", "ASTM C 170 / EN 14617-15", "150 to 250 MPa"],
      ["Surface hardness", "EN 101 (Mohs)", "6.0 to 7.0"],
      ["Chemical resistance", "EN 14617-10", "Class C4"],
      ["Boiling water, high temperature", "NEMA LD3-3.5 / 3.6", "Pass, no effect"],
      ["Fire classification", "EN 13501-1", "Wall B-s1-d0, floor B-fl-S1"],
      ["Slip resistance, honed", "DIN 51130", "R9"],
      ["Food contact", "NSF", "Certified"],
    ],
  },
  {
    material: "Engineered marble",
    rows: [
      ["Polished gloss", "", "over 85 percent, repolishable in situ"],
      ["Surface hardness", "EN 101 (Mohs)", "4.0 to 5.0"],
      ["Water absorption", "EN 14617-1", "under 0.1 percent"],
      ["Fire classification", "EN 13501-1", "Class B"],
      ["Slab format", "", "304 x 125 cm"],
    ],
  },
  {
    material: "Terrazzo",
    rows: [
      ["Apparent density", "EN 14617-1", "2.40 to 2.6 kg/dm3"],
      ["Water absorption", "EN 14617-1", "under 0.2 percent"],
      ["Flexural strength", "EN 14617-2", "10 to 18 MPa"],
      ["Compressive strength", "EN 14617-15", "95 to 110 MPa"],
      ["Surface hardness", "EN 101 (Mohs)", "3.0 to 4.0"],
      ["Fire classification", "EN 13501-1", "Wall A1-S1-d0, floor A1-fl-S1"],
      ["Slip resistance", "EN 14231", "Wet over 3, dry over 35 SRV"],
      ["Thermal shock", "EN 14617-6", "No defects after 20 cycles"],
      ["Slab format", "", "304 x 125 cm, cut to size on request"],
    ],
  },
];

/** The technical data, on the page, with the standard beside each figure. */
export function KalingaTechnicalData({ only, variant = "house" }: { only?: string; variant?: KalingaVariant }) {
  const sets = only ? TECH.filter((t) => t.material === only) : TECH;
  const tone = TONES[variant];
  return (
    <section id="kalinga-technical-data" className={`${tone.white} scroll-mt-[75px]`} aria-labelledby="kalinga-tech-heading">
      <div className={`${wrap} py-16 lg:py-24`}>
        <p className={tone.eyebrow}>Technical data</p>
        <h2 id="kalinga-tech-heading" className={`${tone.h2} max-w-[22ch]`}>What the catalogue certifies, with the standard beside it</h2>
        <div className={`mt-10 grid grid-cols-1 gap-8 ${sets.length > 1 ? "lg:grid-cols-3" : ""}`}>
          {sets.map((t) => (
            <div key={t.material} className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <caption className={`${tone.h3} text-xl ${tone.ink} text-left pb-3`}>{t.material}</caption>
                <thead>
                  <tr className={`border-b ${tone.ruleStrong}`}>
                    <th scope="col" className={`label-sh py-2 pr-4 ${tone.soft}`}>Property</th>
                    <th scope="col" className={`label-sh py-2 pr-4 ${tone.soft}`}>Standard</th>
                    <th scope="col" className={`label-sh py-2 ${tone.soft}`}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map(([p, s, r]) => (
                    <tr key={p} className={`border-b ${tone.rule} align-top`}>
                      <th scope="row" className={`py-2.5 pr-4 font-manrope text-sm font-semibold ${tone.ink}`}>{p}</th>
                      <td className={`py-2.5 pr-4 spec-sh ${tone.soft}`}>{s}</td>
                      <td className={`py-2.5 font-manrope text-sm ${tone.ink}`}>{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <p className={`font-manrope ${tone.soft} text-xs mt-6 max-w-[80ch]`}>Values transcribed from the Kalinga Stone printed catalogue as published by Global Classic Building Materials. Confirm against the manufacturer datasheet for contractual use; the Dubai desk sends the current sheet with every quotation.</p>
      </div>
    </section>
  );
}

/** The quote form with the BOQ upload, the conversion Google Ads learns from. */
export function KalingaQuoteSection({ product, variant = "house", note }: { product?: string; variant?: KalingaVariant; note?: string }) {
  const t = TONES[variant];
  return (
    <section id="kalinga-quote" className={`${t.paper} scroll-mt-[75px]`} aria-labelledby="kalinga-quote-heading">
      <div className={`${wrap} py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16`}>
        <div>
          <p className={t.eyebrow}>Project quote</p>
          <h2 id="kalinga-quote-heading" className={`${t.h2} max-w-[16ch]`}>Send the square metres, get slab availability and AED pricing</h2>
          <p className={`font-manrope ${variant === "gcb" ? "text-[#0C1510]/80" : "text-[#161925]/80"} text-lg mt-5 max-w-[46ch]`}>
            Tell us the company, the project, the material and the area. Attach the BOQ or the drawing if you have one. The Dubai desk replies within one working day with the slab count, the stock position at Al Sajaa, pricing and the reseller letter.
          </p>
          <ul className={`mt-8 space-y-2 font-manrope text-sm ${t.body}`}>
            <li>Ex stock on the 128 stocked shades; 4 to 6 weeks from Silvassa for anything else</li>
            <li>Supply only, or through Sixty Newton Technical Services LLC for application</li>
            <li>Approved trade accounts up to 30 days</li>
          </ul>
        </div>
        <div className={`${t.card} p-6 sm:p-8`}>
          <KalingaQuoteForm product={product} note={note} />
        </div>
      </div>
    </section>
  );
}

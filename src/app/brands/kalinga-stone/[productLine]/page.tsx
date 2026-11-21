import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandConfig, getProductLine } from "@/data/brandConfigs";
import { TdsLineIndex } from "@/components/tds/tds-line-index";
import { BRANCHES, branchNode, organizationNode, standalone } from "@/lib/org-schema";
import { LINE_SCENE } from "@/data/scenes";
import { hasPoster, posterSrc } from "@/components/three/scene-frame";
import { StaticHeroPicture, HeroPreload } from "@/components/ui/static-hero-picture";
import { KalingaQuoteSection, KalingaDownloads, KalingaTechnicalData } from "@/components/brands/kalinga-stone/kalinga-sections";
import { Reveal, Rule, ParallaxBleed, SlabFormats, type SlabFormat } from "@/components/brands/kalinga-stone/gcb/gcb-motion.client";
import { getMaterial } from "@/components/brands/kalinga-stone/gcb/catalogue";
import { CatalogueByRange, RangeCards } from "@/components/brands/kalinga-stone/gcb/catalogue-ui";

/**
 * The four Kalinga Stone line pages, set in the family of gcbuae.com, the
 * sister company that holds the slabs at Al Sajaa: limestone ground,
 * Cormorant headlines, a stat strip, a full bleed warehouse photograph, the
 * dark "why specifiers choose it" band, the range as swatches, the slab
 * formats to scale, and the Global Classic stock partner band. Metadata,
 * H1, JSON-LD and every internal link match what the generic line page
 * emitted, so nothing the pages rank for moves.
 */

const SLUG = "kalinga-stone";
const LINE_SLUGS = ["elixir", "engineered-quartz", "engineered-marble", "terrazzo"] as const;
type LineSlug = (typeof LINE_SLUGS)[number];

export async function generateStaticParams() {
  return LINE_SLUGS.map((productLine) => ({ productLine }));
}

export async function generateMetadata({ params }: { params: Promise<{ productLine: string }> }): Promise<Metadata> {
  const { productLine: productLineSlug } = await params;
  const slug = SLUG;
  const brand = getBrandConfig(slug);
  const productLine = getProductLine(slug, productLineSlug);

  if (!brand || !productLine) {
    return { title: "Product Not Found - Lapiz Blue" };
  }

  const title = productLine.content?.seoTitle || `${productLine.name} - ${brand.name} | Lapiz Blue`;
  const lineScene = LINE_SCENE[`${slug}/${productLineSlug}`];
  const ogImages =
    productLine.images.length > 0
      ? [productLine.images[0]]
      : lineScene && hasPoster(lineScene)
        ? [posterSrc(lineScene, 1200)]
        : [];

  return {
    title,
    description: productLine.metaDescription,
    openGraph: {
      title: productLine.content?.seoTitle || `${productLine.name} - ${brand.name}`,
      description: productLine.metaDescription,
      images: ogImages,
      url: `https://www.lapizblue.com/brands/${slug}/${productLineSlug}`,
      siteName: "Lapiz Blue",
    },
    twitter: {
      card: "summary_large_image",
      title: productLine.content?.seoTitle || `${productLine.name} | ${brand.name} | Lapiz Blue`,
      description: productLine.metaDescription,
      images: ogImages,
    },
    alternates: {
      canonical: `https://www.lapizblue.com/brands/${slug}/${productLineSlug}`,
    },
  };
}

function generateJsonLd(brand: ReturnType<typeof getBrandConfig>, productLine: ReturnType<typeof getProductLine>, slug: string, productLineSlug: string) {
  const baseUrl = "https://www.lapizblue.com";
  const schemas = [];

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Brands", item: `${baseUrl}/brands` },
      { "@type": "ListItem", position: 3, name: brand?.name, item: `${baseUrl}/brands/${slug}` },
      { "@type": "ListItem", position: 4, name: productLine?.name, item: `${baseUrl}/brands/${slug}/${productLineSlug}` },
    ],
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: productLine?.content?.seoTitle || `${productLine?.name} - ${brand?.name}`,
    description: productLine?.metaDescription,
    url: `${baseUrl}/brands/${slug}/${productLineSlug}`,
    isPartOf: { "@type": "WebSite", name: "Lapiz Blue", url: baseUrl },
  });

  if (productLine?.content?.faqs && productLine.content.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: productLine.content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  schemas.push(standalone(organizationNode()));
  schemas.push(standalone({ ...branchNode(BRANCHES[0]), department: BRANCHES.slice(1).map(branchNode) }));

  return schemas;
}

/* ------------------------------------------------------------------------ */
/* The gcbuae.com palette and type, for these four pages only.               */
/* ------------------------------------------------------------------------ */

const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12";
const serif = "font-[family-name:var(--font-cormorant)] font-light";
const eyebrowLight = "label-sh text-[#355E4D]";
const eyebrowDark = "label-sh text-[#6F8F78]";
const h2Light = `${serif} text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] leading-[1.1] text-[#0C1510] mt-3`;
const h2Dark = `${serif} text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] leading-[1.1] text-[#F7F8F5] mt-3`;
const muted = "text-[#0C1510]/66";

type Why = { icon: "shield" | "drop" | "flame" | "layers" | "gloss" | "refresh" | "fire" | "strength" | "stock" | "book"; title: string; body: string };

type LineSpec = {
  short: string;
  eyebrow: string;
  stats: [string, string][];
  portrait: { base: string; widths: number[]; alt: string };
  bleed: { name: string; alt: string };
  whyTitle: string;
  why: Why[];
  rangeTitle: string;
  rangeIntro: string;
  swatchFormat: string;
  formatsTitle: string;
  formats: SlabFormat[];
  formatsNote: string;
  product: string;
  material?: string;
};

const QUARTZ_FORMATS: SlabFormat[] = [
  { w: 3150, h: 1450, label: "3150 x 1450 mm", sub: "Most shades. 20 mm thick." },
  { w: 3250, h: 1650, label: "3250 x 1650 mm", sub: "Thirteen shades. 20 mm thick." },
  { w: 3300, h: 2000, label: "3300 x 2000 mm", sub: "Superjumbo, Carrara Marmi. 20 mm thick." },
];
const SLAB_304: SlabFormat[] = [{ w: 3040, h: 1250, label: "304 x 125 cm", sub: "One format, every shade." }];

const LINES: Record<LineSlug, LineSpec> = {
  "engineered-quartz": {
    short: "Quartz",
    eyebrow: "KalingaStone Quartz, 69 shades stocked in the UAE",
    stats: [
      ["69", "shades across seven series"],
      ["20 mm", "one thickness, every shade"],
      ["3", "slab formats, up to the superjumbo"],
      ["NSF", "certified food safe"],
    ],
    portrait: { base: "/images/brands/kalinga-stone/gcb/portrait-quartz", widths: [640, 800], alt: "A stack of KalingaStone quartz samples in whites, greys and beiges" },
    bleed: { name: "kalingastone-quartz-hero", alt: "Veined KalingaStone quartz slabs standing on steel A frame racks at the Global Classic warehouse in Al Sajaa, Sharjah" },
    whyTitle: "Beauty with a certificate behind it.",
    why: [
      { icon: "shield", title: "Food safe", body: "Certified by NSF International as a safe surface for food preparation, which is why it goes into hotel kitchens, staff canteens and residential towers." },
      { icon: "drop", title: "Stain and scratch resistant", body: "Non porous with water absorption under 0.05 percent, lower than natural granite, and Mohs 6 to 7 on the surface, so stains never take hold." },
      { icon: "flame", title: "Impervious to heat", body: "Passes the NEMA LD3 boiling water and high temperature tests. Trivets are still specified under hot pans at a joint." },
      { icon: "layers", title: "Homogeneous", body: "Benchmark consistency in shade, thickness and texture, slab after slab, batch after batch, so a vanity programme reads the same in room 12 and room 412." },
    ],
    rangeTitle: "Sixty-nine shades, seven series, three formats.",
    rangeIntro: "Series is the design tier: 7 carries the premium veined Calacattas, 1 the essential particulates. Eight shades carry Microban antibacterial protection. Every one of the 69 is below, grouped by colour range and each with its own page; all 69 stand on the racks at Al Sajaa.",
    swatchFormat: "Quartz, 20 mm",
    formatsTitle: "Slab formats, to scale.",
    formats: QUARTZ_FORMATS,
    formatsNote: "Drawn to scale against a 1750 mm figure. The 3300 x 2000 mm superjumbo covers a full kitchen island or a double height lift lobby panel with one joint free slab. The format of each shade is listed on the quotation.",
    product: "Quartz",
    material: "Quartz",
  },
  "engineered-marble": {
    short: "Marble",
    eyebrow: "KalingaStone Marble, 35 shades stocked in the UAE",
    stats: [
      ["35", "shades across five series"],
      ["85%", "gloss, the highest of the three ranges"],
      ["304 x 125", "cm, one slab format for every shade"],
      ["In situ", "repolishable, restored not replaced"],
    ],
    portrait: { base: "/images/brands/kalinga-stone/gcb/portrait-marble", widths: [640, 960], alt: "KalingaStone Cristallo engineered marble on a lobby floor and wall" },
    bleed: { name: "kalingastone-marble-hero", alt: "White and cream veined KalingaStone engineered marble slabs fanned on display racks at the Global Classic warehouse in Al Sajaa, Sharjah" },
    whyTitle: "The language of opulence, engineered.",
    why: [
      { icon: "layers", title: "Homogeneous", body: "Benchmark consistency in shade, thickness and texture. The engineered block guarantees what a quarry cannot: no lot variation across a floor plate." },
      { icon: "drop", title: "Resistant to stain", body: "Natural marble aggregate bound in resin, with water absorption under 0.1 percent, lower than natural granite, so soap, cosmetics and spills sit on the surface." },
      { icon: "refresh", title: "Repolishable", body: "The surface is restored in situ past 85 percent gloss by a stone contractor. High traffic floors are revived, not lifted." },
      { icon: "gloss", title: "Above 85 percent gloss", body: "The highest polish of the three KalingaStone ranges, off SIMEC (Italy) lines with 36 polishing heads at the Silvassa plant." },
    ],
    rangeTitle: "Thirty-five shades, five series, one slab.",
    rangeIntro: "Four colour families, white, cream and beige, grey, and gold and emperador, from Candy White in Series 1 to Bianco Thassos in Series 5B. Eight shades carry Microban antibacterial protection. Every one of the 35 is below, grouped by colour range and each with its own page; all 35 stand on the racks at Al Sajaa.",
    swatchFormat: "Engineered marble, 304 x 125 cm",
    formatsTitle: "Slab format, to scale.",
    formats: SLAB_304,
    formatsNote: "Drawn to scale against a 1750 mm figure. One 304 x 125 cm slab runs the full length of a vanity or a lift lobby panel; cutting is by the fabricator.",
    product: "Engineered marble",
    material: "Engineered marble",
  },
  terrazzo: {
    short: "Terrazzo",
    eyebrow: "KalingaStone Terrazzo, 24 shades stocked in the UAE",
    stats: [
      ["24", "shades across five collections"],
      ["A1", "fire class to EN 13501-1, wall and floor"],
      ["304 x 125", "cm, one slab format for every shade"],
      ["75%", "gloss on polished slabs"],
    ],
    portrait: { base: "/images/brands/kalinga-stone/gcb/portrait-terrazzo", widths: [640, 960], alt: "KalingaStone Elite terrazzo on a floor and wall in a bright interior" },
    bleed: { name: "kalingastone-terrazzo-hero", alt: "Colourful KalingaStone terrazzo slabs standing on steel A frame racks at the Global Classic warehouse in Al Sajaa, Sharjah" },
    whyTitle: "Colour your world, with a fire certificate.",
    why: [
      { icon: "shield", title: "Hygienic surface", body: "A dense block form surface with water absorption under 0.2 percent that cleans with a pH neutral mop, with Microban antibacterial protection on four shades." },
      { icon: "strength", title: "High strength", body: "95 to 110 MPa compressive strength, around three times structural concrete, for floors, treads and cladding." },
      { icon: "layers", title: "Five finishes", body: "Polished above 75 percent gloss, Honed and River Wash for wet floors, Distress, Urban and Leather for texture on walls and facades." },
      { icon: "fire", title: "Fire resistant", body: "Class A1 to EN 13501-1, A1-S1-d0 for wall cladding and A1-fl-S1 for flooring, the top non combustible classification, where quartz at Class B cannot be used." },
    ],
    rangeTitle: "Twenty-four shades, five collections, one slab.",
    rangeIntro: "Roma and Cafe share Series 6, Palladiana and Venetian share Series 7, and Elite is Series 8, a mix of big and small mosaic patterns. Seven bases are also made as fluted panels. Every one of the 24 is below, grouped by collection and each with its own page; all 24 stand on the racks at Al Sajaa.",
    swatchFormat: "Terrazzo, 304 x 125 cm",
    formatsTitle: "Slab format, to scale.",
    formats: SLAB_304,
    formatsNote: "Drawn to scale against a 1750 mm figure. Supplied as full slabs, cut to size or as tiles on request, so treads, vanities and cladding panels come from the same slab without pattern breaks.",
    product: "Terrazzo",
    material: "Terrazzo",
  },
  elixir: {
    short: "Elixir",
    eyebrow: "KalingaStone Elixir, the premium curated collection",
    stats: [
      ["1", "curated tier above the standard ranges"],
      ["128", "standard shades stocked beside it at Al Sajaa"],
      ["20 mm", "quartz slabs, format confirmed per design"],
      ["1", "working day to a priced slab count"],
    ],
    portrait: { base: "/images/brands/kalinga-stone/gcb/portrait-elixir", widths: [640, 960], alt: "A veined KalingaStone quartz surface in a lit interior" },
    bleed: { name: "kalingastone-quartz-hero", alt: "Veined KalingaStone quartz slabs standing on steel A frame racks at the Global Classic warehouse in Al Sajaa, Sharjah" },
    whyTitle: "Depth, where the standard ranges give breadth.",
    why: [
      { icon: "book", title: "Curated", body: "A short, designer led tier with fewer designs and more complex veining and tonal depth, for the one feature surface in a scheme that everything else is judged against." },
      { icon: "drop", title: "Non porous", body: "Made on the same automated quartz lines at Silvassa as the standard ranges: no sealing, a damp cloth and a pH neutral cleaner is the whole routine." },
      { icon: "layers", title: "Book matched", body: "Sequential slabs from one lot are book matched for feature walls and lobby panels. Release the full count in one order and tag the slabs at Al Sajaa." },
      { icon: "stock", title: "Confirmed against stock", body: "Elixir availability changes by container. Lapiz Blue confirms the current list at Al Sajaa before any quotation, and unstocked designs come from Silvassa in four to six weeks." },
    ],
    rangeTitle: "The curated tier, confirmed against stock.",
    rangeIntro: "Where the standard ranges give a project breadth, with 69 quartz, 35 marble and 24 terrazzo shades held at Al Sajaa, Elixir gives it depth. The designs below are a selection; ask for the current Al Sajaa list before the finishes schedule is fixed.",
    swatchFormat: "Elixir, format on quotation",
    formatsTitle: "Slab formats, to scale.",
    formats: QUARTZ_FORMATS,
    formatsNote: "Drawn to scale against a 1750 mm figure. KalingaStone quartz slabs are 20 mm in these three formats; the format of each Elixir design is confirmed on the quotation.",
    product: "Elixir",
  },
};

function Icon({ name }: { name: Why["icon"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "shield":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "drop":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /></svg>;
    case "flame":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-1.5.5-2.5 1-3.5.5 1 1.5 1.5 2 1.5 0-3 .5-5 1-7z" /></svg>;
    case "layers":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M12 4l8 4-8 4-8-4 8-4z" /><path d="M4 12l8 4 8-4" /><path d="M4 16l8 4 8-4" /></svg>;
    case "gloss":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><circle cx="12" cy="12" r="8" /><path d="M8 10a4 4 0 0 1 4-3" /></svg>;
    case "refresh":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v5h-5" /></svg>;
    case "fire":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M4 20h16" /><path d="M12 4c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1-3.5.5 1 1.5 1.5 2 1.5 0-2.5.5-4.5 1-6.5z" /></svg>;
    case "strength":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M4 9h16v6H4z" /><path d="M8 9V6M16 9V6M8 18v-3M16 18v-3" /></svg>;
    case "stock":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M3 20V9l9-5 9 5v11" /><path d="M7 20v-6h4v6M13 20v-9h4v9" /></svg>;
    case "book":
      return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true" {...common}><path d="M12 6c-2-1.5-5-1.5-8-1v13c3-.5 6-.5 8 1 2-1.5 5-1.5 8-1V5c-3-.5-6-.5-8 1z" /><path d="M12 6v13" /></svg>;
  }
}

function GcbPicture({ name, alt, sizes = "100vw" }: { name: string; alt: string; sizes?: string }) {
  const base = `/images/brands/kalinga-stone/gcb/${name}`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1200.avif 1200w, ${base}-1600.avif 1600w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w, ${base}-1600.webp 1600w`} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}-1200.webp`} alt={alt} width={1200} height={800} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
    </picture>
  );
}

function splitItem(item: string): [string, string | undefined] {
  const i = item.indexOf(" - ");
  return i === -1 ? [item, undefined] : [item.slice(0, i), item.slice(i + 3)];
}

const WORDS: Record<number, string> = { 3: "Three", 4: "Four", 5: "Five", 6: "Six" };
const PRESETS: Record<string, string> = { "engineered-quartz": "Quartz", "engineered-marble": "Engineered marble", terrazzo: "Terrazzo", elixir: "Elixir" };

export default async function KalingaLinePage({ params }: { params: Promise<{ productLine: string }> }) {
  const { productLine: productLineSlug } = await params;
  if (!(LINE_SLUGS as readonly string[]).includes(productLineSlug)) notFound();
  const lineSlug = productLineSlug as LineSlug;

  const brand = getBrandConfig(SLUG);
  const productLine = getProductLine(SLUG, lineSlug);
  if (!brand || !productLine) notFound();

  const content = productLine.content;
  const spec = LINES[lineSlug];
  const jsonLdSchemas = generateJsonLd(brand, productLine, SLUG, lineSlug);
  const applications = (content?.applications?.items ?? []).map(splitItem);
  const swatches = content?.featuredProducts ?? [];
  const faqs = content?.faqs ?? [];
  // The three materials show the whole catalogue by range; Elixir keeps its featured list.
  const catalogueEntry = lineSlug === "elixir" ? undefined : getMaterial(lineSlug);

  return (
    <main className="font-manrope bg-[#F7F8F5] text-[#0C1510]">
      {jsonLdSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <HeroPreload base={spec.portrait.base} widths={spec.portrait.widths} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className={`${wrap} pt-7 lg:pt-10`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 label-sh text-[#0C1510]/60">
          <li><Link href="/" className="inline-flex min-h-[2.75rem] items-center transition-colors hover:text-[#355E4D]">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/brands" className="inline-flex min-h-[2.75rem] items-center transition-colors hover:text-[#355E4D]">Brands</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/brands/${SLUG}`} className="inline-flex min-h-[2.75rem] items-center transition-colors hover:text-[#355E4D]">{brand.name}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-[#0C1510]" aria-current="page">{spec.short}</li>
        </ol>
      </nav>

      {/* Hero: no opening animation, static picture */}
      <header className={`${wrap} pb-12 pt-8 lg:pb-16 lg:pt-12`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.618fr_1fr] lg:gap-16">
          <div className="min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brands/kalinga-stone/kalingastone-logo.svg" alt="KalingaStone, Italian design, terrazzo, marble and quartz collection" width={746} height={270} className="h-12 w-auto sm:h-14" />
            <p className={`${eyebrowLight} mt-8`}>{spec.eyebrow}</p>
            <h1 className={`${serif} mt-4 text-[2.5rem] leading-[1.05] tracking-[-0.025em] text-[#0C1510] sm:text-[3.25rem] lg:text-[3.75rem] max-w-[18ch]`}>
              {content?.h1 || productLine.name}
            </h1>
            <p className={`mt-7 max-w-[62ch] text-base leading-relaxed ${muted} sm:text-[1.0625rem]`}>
              {content?.intro || productLine.description}
            </p>
            <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-[#0C1510]/80">
              The slabs are held by <a href="https://www.gcbuae.com" target="_blank" rel="noopener noreferrer" className="font-medium text-[#355E4D] underline underline-offset-4">Global Classic Building Materials</a>, our sister company and the authorised KalingaStone reseller, at Al Sajaa in Sharjah. Lapiz Blue quotes, reserves and delivers from Dubai, Abu Dhabi and Sharjah.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#kalinga-quote" className="inline-flex min-h-[3rem] items-center rounded-full bg-[#0C1510] px-7 label-sh text-[#F7F8F5] transition-opacity hover:opacity-85">Request availability</a>
              <Link href={`/brands/${SLUG}`} className="inline-flex min-h-[3rem] items-center rounded-full border border-[#0C1510]/25 px-7 label-sh text-[#0C1510] transition-colors hover:border-[#0C1510]">All KalingaStone lines</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]" style={{ aspectRatio: "4 / 5" }}>
            <StaticHeroPicture base={spec.portrait.base} widths={spec.portrait.widths} alt={spec.portrait.alt} fetchPriority="high" />
          </div>
        </div>

        {/* Stat strip */}
        <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]/40 lg:mt-16 lg:grid-cols-4">
          {spec.stats.map(([value, label], i) => (
            <div key={label} className={`px-5 py-6 sm:px-7 ${i % 2 === 1 ? "border-l border-[#D2D4C8]" : ""} ${i >= 2 ? "border-t border-[#D2D4C8] lg:border-t-0 lg:border-l" : ""}`}>
              <dt className="sr-only">{label}</dt>
              <dd className={`${serif} text-[2rem] leading-none text-[#0C1510] sm:text-[2.5rem] tabular-nums`}>{value}</dd>
              <dd className={`mt-2 text-xs ${muted}`}>{label}</dd>
            </div>
          ))}
        </dl>

        {/* The four lines */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#0C1510]/12 pt-5 label-sh text-[#0C1510]/60">
          <span>KalingaStone lines</span>
          {LINE_SLUGS.map((s) => (
            <Link key={s} href={`/brands/${SLUG}/${s}`} aria-current={s === lineSlug ? "page" : undefined} className={`inline-flex min-h-[2.75rem] items-center transition-colors hover:text-[#355E4D] ${s === lineSlug ? "text-[#0C1510] underline underline-offset-4 decoration-[#355E4D]" : ""}`}>
              {LINES[s].short}
            </Link>
          ))}
        </div>
      </header>

      {/* Full bleed warehouse photograph with slow parallax */}
      <ParallaxBleed className="h-[60vw] max-h-[720px] min-h-[280px] w-full">
        <GcbPicture name={spec.bleed.name} alt={spec.bleed.alt} />
      </ParallaxBleed>

      {/* Why specifiers choose it */}
      <section className="bg-[#0C1510] text-[#F7F8F5]" aria-labelledby="why-heading">
        <div className={`${wrap} py-16 lg:py-24`}>
          <Reveal>
            <p className={eyebrowDark}>Why specifiers choose it</p>
            <h2 id="why-heading" className={`${h2Dark} max-w-[22ch]`}>{spec.whyTitle}</h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {spec.why.map((w, i) => (
              <li key={w.title} className="list-none">
                <Reveal delay={i * 0.08}>
                  <span className="text-[#D2D4C8]"><Icon name={w.icon} /></span>
                  <h3 className={`${serif} mt-4 text-2xl text-[#F7F8F5]`}>{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#F7F8F5]/70">{w.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          {applications.length > 0 && (
            <div className="mt-16">
              <Reveal>
                <p className={eyebrowDark}>{content?.applications?.title || "Versatility of application"}</p>
              </Reveal>
              <ol className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {applications.map(([title, detail], i) => (
                  <li key={title} className="list-none border-t border-[#F7F8F5]/15 py-4">
                    <Reveal delay={i * 0.05}>
                      <span className="spec-sh text-[#6F8F78]">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-1.5 text-sm font-medium text-[#F7F8F5]">{title}</p>
                      {detail && <p className="mt-1 text-xs leading-relaxed text-[#F7F8F5]/60">{detail}</p>}
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* The range */}
      <section className="bg-[#F7F8F5]" aria-labelledby="range-heading">
        <div className={`${wrap} py-16 lg:py-24`}>
          <Reveal>
            <p className={eyebrowLight}>The range, analysed</p>
            <h2 id="range-heading" className={`${h2Light} max-w-[22ch]`}>{spec.rangeTitle}</h2>
            <Rule className="mt-6 max-w-[560px]" />
            <p className={`mt-6 max-w-[64ch] text-sm leading-relaxed ${muted}`}>{spec.rangeIntro}</p>
          </Reveal>
          {catalogueEntry ? (
            <>
              <div className="mt-10">
                <RangeCards entry={catalogueEntry} heading={`${WORDS[catalogueEntry.ranges.length] ?? catalogueEntry.ranges.length} ${lineSlug === "terrazzo" ? "collections" : "colour ranges"}, each with its own page`} />
              </div>
              <CatalogueByRange entry={catalogueEntry} />
            </>
          ) : swatches.length > 0 && (
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {swatches.map((s, i) => (
                <li key={s.name} className="list-none">
                  <Reveal delay={(i % 4) * 0.06}>
                    <div className="overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]/30" style={{ aspectRatio: "4 / 3" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.image} alt={`${s.name}, KalingaStone ${spec.short.toLowerCase()} swatch`} width={1200} height={600} loading="lazy" decoding="async" className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                    </div>
                    <h3 className={`${serif} mt-3 text-xl leading-none text-[#0C1510]`}>{s.name}</h3>
                    <p className="mt-1.5 spec-sh text-[#0C1510]/60">{spec.swatchFormat}</p>
                    <p className={`mt-2 text-xs leading-relaxed ${muted}`}>{s.description}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Slab formats, to scale */}
      <section className="border-t border-[#0C1510]/12 bg-[#F7F8F5]" aria-labelledby="formats-heading">
        <div className={`${wrap} py-16 lg:py-24`}>
          <Reveal>
            <p className={eyebrowLight}>Formats</p>
            <h2 id="formats-heading" className={`${h2Light} max-w-[22ch]`}>{spec.formatsTitle}</h2>
          </Reveal>
          <div className="mt-10">
            <SlabFormats formats={spec.formats} />
          </div>
          <p className={`mt-6 max-w-[64ch] text-sm leading-relaxed ${muted}`}>{spec.formatsNote}</p>
        </div>
      </section>

      {/* Stock partner: Global Classic */}
      <section className="bg-[#355E4D] text-[#F7F8F5]" aria-labelledby="gcb-heading">
        <div className={`${wrap} grid grid-cols-1 gap-10 py-16 lg:grid-cols-[1.618fr_1fr] lg:gap-16 lg:py-24`}>
          <Reveal>
            <p className="label-sh text-[#D2D4C8]">Stock partner</p>
            <h2 id="gcb-heading" className={`${serif} mt-3 text-[2rem] leading-[1.1] text-[#F7F8F5] sm:text-[2.25rem] lg:text-[2.75rem] max-w-[20ch]`}>Held in stock by Global Classic, Al Sajaa.</h2>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-[#F7F8F5]/85">
              Global Classic Building Materials is the place to see KalingaStone {spec.short === "Elixir" ? "Elixir" : spec.short.toLowerCase()} before you buy it. Our sister company holds the full slabs on racks at its warehouse and showroom in Al Sajaa Industrial Area, Sharjah, beside the Lapiz Blue Sharjah branch, and is certified through the official KalingaStone channel as the authorised reseller for the Northern Emirates. Visit, view the exact slabs and lot under daylight, tag them for your project, and Lapiz Blue quotes, reserves and delivers to site or to the workshop.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="https://www.gcbuae.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[3rem] items-center rounded-full bg-[#F7F8F5] px-7 label-sh text-[#0C1510] transition-opacity hover:opacity-90">gcbuae.com</a>
              <a href="#kalinga-quote" className="inline-flex min-h-[3rem] items-center rounded-full border border-[#F7F8F5]/40 px-7 label-sh text-[#F7F8F5] transition-colors hover:border-[#F7F8F5]">Request a quotation</a>
              <Link href={`/brands/${SLUG}`} className="inline-flex min-h-[3rem] items-center px-2 label-sh text-[#F7F8F5]/85 underline underline-offset-4 transition-colors hover:text-[#F7F8F5]">Kalinga Stone at Lapiz Blue</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center justify-center rounded-xl border border-[#F7F8F5]/20 bg-[#F7F8F5] p-8 sm:p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brands/kalinga-stone/global-classic-logo.svg" alt="Global Classic Building Materials, Al Sajaa, Sharjah" width={368} height={261} className="h-auto w-full max-w-[260px]" loading="lazy" decoding="async" />
          </Reveal>
        </div>
      </section>

      <KalingaQuoteSection product={PRESETS[lineSlug]} variant="gcb" />
      <KalingaDownloads variant="gcb" />
      {spec.material && <KalingaTechnicalData only={spec.material} variant="gcb" />}

      {/* FAQ, in plain terms */}
      {faqs.length > 0 && (
        <section className="bg-[#F7F8F5]" aria-labelledby="faq-heading">
          <div className={`${wrap} py-16 lg:py-24`}>
            <Reveal>
              <p className={eyebrowLight}>Questions, answered</p>
              <h2 id="faq-heading" className={`${h2Light} max-w-[22ch]`}>KalingaStone {spec.short === "Elixir" ? "Elixir" : spec.short.toLowerCase()} in the UAE, in plain terms.</h2>
            </Reveal>
            <div className="mt-10 max-w-[760px] border-t border-[#0C1510]/15">
              {faqs.map((faq, i) => (
                <details key={faq.question} open={i === 0} className="group border-b border-[#0C1510]/15">
                  <summary className={`${serif} flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-xl text-[#0C1510] sm:text-[1.375rem] [&::-webkit-details-marker]:hidden`}>
                    <span>{faq.question}</span>
                    <span aria-hidden="true" className="mt-1 shrink-0 font-manrope text-lg leading-none text-[#355E4D] transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className={`pb-6 pr-8 text-sm leading-relaxed ${muted}`}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <TdsLineIndex brandSlug={SLUG} productLineSlug={lineSlug} primaryColor="#0C1510" />

      {/* Closing bar */}
      <section className="bg-[#0C1510] text-[#F7F8F5]">
        <div className={`${wrap} flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between`}>
          <div>
            <p className={`${serif} text-2xl`}>Specifying KalingaStone {spec.short === "Elixir" ? "Elixir" : spec.short.toLowerCase()} for a project?</p>
            <p className="mt-1 text-sm text-[#F7F8F5]/66">Slab availability, samples and AED pricing from Al Sajaa stock, usually within one working day.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#kalinga-quote" className="inline-flex min-h-[3rem] items-center rounded-full bg-[#F7F8F5] px-6 label-sh text-[#0C1510] transition-opacity hover:opacity-90">Request availability</a>
            <Link href="/contact" className="inline-flex min-h-[3rem] items-center rounded-full border border-[#F7F8F5]/35 px-6 label-sh text-[#F7F8F5] transition-colors hover:border-[#F7F8F5]">Email the Dubai desk</Link>
            <Link href={`/brands/${SLUG}`} className="inline-flex min-h-[3rem] items-center px-2 label-sh text-[#F7F8F5]/85 underline underline-offset-4 hover:text-[#F7F8F5]">Back to {brand.name}</Link>
          </div>
        </div>
      </section>

      {/* WhatsApp, the dark circle */}
      <a
        href="https://wa.me/971502814338"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Lapiz Blue about KalingaStone"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#F7F8F5]/20 bg-[#0C1510] text-[#F7F8F5] shadow-lg transition-transform hover:scale-105"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}

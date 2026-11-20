/**
 * The one description of Lapiz Blue that every page's structured data draws
 * from.
 *
 * Before this file there were four: the homepage graph, the brand page
 * generator, the product line pages and the tools pages, and they disagreed on
 * the street, the area number and the telephone. Search engines and the
 * answer engines on top of them score an entity on consistency, so the fix is
 * not to patch four files but to have one.
 *
 * Nothing in here is a guess. Addresses, phones, map places and coordinates
 * are the ones printed on the five supplier hub pages and used in the branch
 * cards; the opening hours are the ones the homepage has carried since 2025.
 */

export const SITE = "https://www.lapizblue.com";
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const LOGO_URL = `${SITE}/logos/lapizbluelogodarkblue.webp`;

export const LEGAL_NAME = "Lapiz Blue General Trading LLC";
export const MAIN_PHONE = "+971 4 885 5257";
export const MAIN_EMAIL = "info@lapizblue.com";

export interface Branch {
  key: "dubai" | "abu-dhabi" | "sharjah";
  /** JSON-LD node id. Dubai keeps the id the homepage has always used. */
  id: string;
  name: string;
  emirate: string;
  streetAddress: string;
  /** The address as printed on the hub pages, for prose. */
  address: string;
  phone: string;
  phoneHref: string;
  lat: number;
  lng: number;
  /** Stable Google Maps link by place cid, usable as hasMap and sameAs. */
  map: string;
  /** Industrial area name, for the "near me" sentence. */
  area: string;
}

export const BRANCHES: Branch[] = [
  {
    key: "dubai",
    id: `${SITE}/#localbusiness`,
    name: "Lapiz Blue General Trading LLC, Dubai",
    emirate: "Dubai",
    streetAddress: "Shop 12 to 14, 4 Street, Al Quoz Industrial Area 4",
    address: "Shop 12 to 14, 4 Street, Al Quoz Industrial Area 4, Dubai",
    phone: "+971 4 885 5257",
    phoneHref: "tel:+97148855257",
    lat: 25.116596,
    lng: 55.223913,
    map: "https://www.google.com/maps?cid=13546971216854844081",
    area: "Al Quoz",
  },
  {
    key: "abu-dhabi",
    id: `${SITE}/#branch-abu-dhabi`,
    name: "Lapiz Blue General Trading LLC, Abu Dhabi",
    emirate: "Abu Dhabi",
    streetAddress: "Shop 2, Mussafah Industrial Area 40",
    address: "Shop 2, Mussafah Industrial Area 40, Abu Dhabi",
    phone: "+971 2 886 7753",
    phoneHref: "tel:+97128867753",
    lat: 24.345846,
    lng: 54.488503,
    map: "https://www.google.com/maps?cid=2597502728756143062",
    area: "Mussafah",
  },
  {
    key: "sharjah",
    id: `${SITE}/#branch-sharjah`,
    name: "Lapiz Blue General Trading LLC, Sharjah",
    emirate: "Sharjah",
    streetAddress: "Al Sajaa Industrial Area",
    address: "Al Sajaa Industrial Area, Sharjah",
    phone: "+971 6 569 5001",
    phoneHref: "tel:+97165695001",
    lat: 25.3492232,
    lng: 55.6497402,
    map: "https://www.google.com/maps?cid=7516154829336338638",
    area: "Al Sajaa",
  },
];

export const OPENING_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "08:00",
  closes: "18:00",
};

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/lapizblue.dxb",
  "https://www.facebook.com/LapizBlueLLC",
  "https://www.linkedin.com/company/lapizblue",
];

/** The manufacturers Lapiz Blue is appointed for, as schema.org Brand nodes. */
export const DISTRIBUTED_BRANDS = [
  { name: "Mapei", url: "https://www.mapei.com" },
  { name: "Kerakoll", url: "https://gcc.kerakoll.com/" },
  { name: "Weber Saint-Gobain", url: "https://www.middleeast.weber/" },
  { name: "Laticrete", url: "https://laticrete.com" },
  { name: "Pidilite Puma", url: "https://www.grupopuma.com/en-AE" },
  { name: "Profilpas", url: "https://www.profilpas.com" },
  { name: "AkzoNobel Dulux", url: "https://www.akzonobel.com" },
  { name: "FILA", url: "https://www.filasolutions.com/mee/" },
  { name: "Kalinga Stone", url: "https://www.kalingastone.com/" },
];

export const AREA_SERVED = [
  { "@type": "City", name: "Dubai" },
  { "@type": "City", name: "Abu Dhabi" },
  { "@type": "City", name: "Sharjah" },
  { "@type": "Country", name: "United Arab Emirates" },
];

type Node = Record<string, unknown>;

const postalAddress = (b: Branch) => ({
  "@type": "PostalAddress",
  streetAddress: b.streetAddress,
  addressLocality: b.emirate,
  addressRegion: b.emirate,
  addressCountry: "AE",
});

/**
 * The Organization node. Identical on every page that carries it, which is the
 * point. `brand` can be narrowed to the one manufacturer a brand page is about.
 */
export function organizationNode(opts: { brand?: { name: string; url?: string } } = {}): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Lapiz Blue",
    legalName: LEGAL_NAME,
    alternateName: ["Lapiz Blue General Trading", "Lapiz Group", "Lapiz Group of Companies"],
    url: SITE,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    image: LOGO_URL,
    description:
      "Construction chemicals and building materials distributor in the UAE since 2020, authorised for Mapei, Kerakoll, Weber, Laticrete, Pidilite Puma, Profilpas, AkzoNobel Dulux and FILA, with branches in Dubai, Abu Dhabi and Sharjah.",
    award: "Outstanding Construction Material Wholesaler, 2026 Dubai Local Awards (DXB Local)",
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 21 },
    address: BRANCHES.map(postalAddress),
    location: BRANCHES.map((b) => ({ "@id": b.id })),
    telephone: MAIN_PHONE,
    email: MAIN_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: MAIN_PHONE,
      contactType: "sales",
      email: MAIN_EMAIL,
      areaServed: ["AE", "SA", "OM", "QA", "KW", "BH"],
      availableLanguage: ["en", "ar"],
    },
    areaServed: AREA_SERVED,
    sameAs: [...SOCIAL_PROFILES, ...BRANCHES.map((b) => b.map)],
    brand: opts.brand
      ? { "@type": "Brand", name: opts.brand.name, ...(opts.brand.url ? { url: opts.brand.url } : {}) }
      : DISTRIBUTED_BRANDS.map((b) => ({ "@type": "Brand", name: b.name, url: b.url })),
    knowsAbout: [
      "tile adhesives",
      "cementitious and epoxy grouts",
      "waterproofing membranes",
      "concrete repair mortars",
      "self levelling screeds",
      "epoxy and polyurethane flooring",
      "sealants and chemical anchors",
      "tile profiles and movement joints",
      "technical data sheets and BOQ specification",
    ],
    subOrganization: [
      {
        "@type": "Organization",
        name: "Global Classic Building Materials",
        legalName: "Global Classic Building Materials Trading LLC",
        url: "https://www.gcbuae.com",
        sameAs: ["https://www.google.com/search?kgmid=/g/11yjnf04d5"],
      },
      { "@type": "Organization", name: "Sixty Newton Technical Services LLC", url: "https://www.60newton.com" },
      { "@type": "Organization", name: "Montolite Building Materials LLC" },
      { "@type": "Organization", name: "Alsama Metal Coatings & Ind LLC" },
    ],
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE,
    name: "Lapiz Blue",
    alternateName: ["Lapiz Blue General Trading", "Lapiz Group"],
    publisher: { "@id": ORG_ID },
    inLanguage: "en-AE",
  };
}

/** One LocalBusiness per branch, each with its own geo and map. */
export function branchNode(b: Branch): Node {
  return {
    "@type": ["LocalBusiness", "HardwareStore"],
    "@id": b.id,
    name: b.name,
    image: LOGO_URL,
    url: SITE,
    telephone: b.phone,
    email: MAIN_EMAIL,
    priceRange: "$$",
    parentOrganization: { "@id": ORG_ID },
    address: postalAddress(b),
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    hasMap: b.map,
    openingHoursSpecification: OPENING_HOURS,
    areaServed: { "@type": "City", name: b.emirate },
  };
}

export function branchNodes(): Node[] {
  return BRANCHES.map(branchNode);
}

export function breadcrumbNode(id: string, items: { name: string; item: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.item })),
  };
}

export function faqPageNode(id: string, faqs: { question: string; answer: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function webPageNode(p: { url: string; name: string; description?: string; image?: string; breadcrumbId?: string }): Node {
  return {
    "@type": "WebPage",
    "@id": `${p.url}#webpage`,
    url: p.url,
    name: p.name,
    ...(p.description ? { description: p.description } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(p.image ? { primaryImageOfPage: { "@type": "ImageObject", url: p.image } } : {}),
    ...(p.breadcrumbId ? { breadcrumb: { "@id": p.breadcrumbId } } : {}),
    inLanguage: "en-AE",
  };
}

/** Wrap nodes in a graph with the context, ready for JSON.stringify. */
export function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** A single node with its own context, for pages that emit one script per node. */
export function standalone(node: Node): Node {
  return { "@context": "https://schema.org", ...node };
}

/** Escape for dangerouslySetInnerHTML inside a script tag. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

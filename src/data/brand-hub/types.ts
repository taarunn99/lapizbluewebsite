/**
 * The copy that turns a brand page into a distributor page.
 *
 * Every field here is read by one of the hub sections in
 * src/components/brands/hub. The shape mirrors what makes the five supplier
 * hub pages rank: a query phrased heading, an answer an engine can lift whole,
 * a where to buy block with the three branches, buyer questions as H2s, and
 * transactional FAQs. Product technical FAQs stay in src/data/brand-content.
 */
export interface BrandHubLink {
  label: string;
  /** Site relative, must resolve to a page that exists. */
  href: string;
}

export interface BrandHubQuestion {
  /** A question a buyer types, used as the H2 verbatim. */
  h2: string;
  /** 60 to 110 words. Plain sentences, no dashes. */
  body: string;
  /** One to three links into the brand's line or product pages. */
  links: BrandHubLink[];
}

export interface BrandHubFaq {
  question: string;
  answer: string;
}

export interface BrandHubFigure {
  value: string;
  label: string;
}

export interface BrandHubCopy {
  slug: string;
  /** Small caps line above the heading. */
  eyebrow: string;
  /** The query, as an H2: "Mapei distributor in Dubai, Abu Dhabi and Sharjah". */
  heading: string;
  /** Two or three paragraphs, 140 to 170 words in total, self contained. */
  answer: string[];
  /**
   * Figures for the strip under the answer. For brands with sheets on the site
   * the component computes them from the manifest; set this only for brands
   * that have no product pages (AkzoNobel, FILA, Kalinga Stone).
   */
  figures?: BrandHubFigure[];
  whereToBuy: {
    /** One paragraph, 50 to 80 words. */
    intro: string;
    /** One sentence each, the "near me" answer for that emirate. */
    dubai: string;
    abuDhabi: string;
    sharjah: string;
  };
  /** Exactly four. */
  questions: BrandHubQuestion[];
  /** Eight to ten, all about buying from Lapiz Blue, not about chemistry. */
  faqs: BrandHubFaq[];
  /** The appointment letter, when the brand page does not already show one. */
  credential?: {
    title: string;
    detail: string;
    file: string;
  };
}

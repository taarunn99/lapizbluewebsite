import { HubFaqItem } from "./hub-faq-item.client";
import { HubFaqPortrait, type HubFaqPhoto } from "./hub-faq-portrait.client";

/** Brands with a photograph beside their FAQ (public/images/brands/<slug>/faq-{640,960}). */
const FAQ_PHOTO = new Set(["mapei", "kerakoll", "weber", "laticrete", "pidilite-puma", "akzonobel", "fila", "kalinga-stone"]);

const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12";

type Props = {
  faqs: { question: string; answer: string }[];
  brandName: string;
  slug?: string;
  /** Heading text; defaults to "Frequently asked questions about {brandName}". */
  heading?: string;
  /** Eyebrow above the heading; defaults to "Before you order". */
  eyebrow?: string;
  /** The id the section's aria-labelledby points at; defaults to "hub-faq-heading". */
  headingId?: string;
  /** Intro paragraph under the heading. */
  intro?: string;
  /** A photograph used in place of the slug lookup. */
  photo?: HubFaqPhoto;
  /** Anything to print under the accordion, a footnote with a link for instance. */
  footnote?: React.ReactNode;
};

/**
 * The transactional FAQs as a single accordion beside a pinned introduction.
 * Native details rows, so every answer is in the HTML for the FAQPage schema
 * and a crawler; the first row is open on arrival.
 */
export function HubFaq({
  faqs,
  brandName,
  slug,
  heading,
  eyebrow = "Before you order",
  headingId = "hub-faq-heading",
  intro = "Stock, delivery, payment and support, answered the way we answer them on the counter. Anything not covered here, send it to us and a person replies.",
  photo,
  footnote,
}: Props) {
  if (!faqs || faqs.length === 0) return null;
  const cleanName = brandName.replace(/\s*\(.*?\)\s*/g, " ").trim();
  const portrait = photo ? <HubFaqPortrait brandName={cleanName} photo={photo} /> : slug && FAQ_PHOTO.has(slug) ? <HubFaqPortrait slug={slug} brandName={cleanName} /> : null;
  return (
    <section className="bg-[#F6F8FA]" aria-labelledby={headingId}>
      <div className={`${wrap} py-16 lg:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-[88px]">
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">{eyebrow}</p>
            <h2 id={headingId} className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight text-[#161925] max-w-[16ch]">
              {heading ?? <>Frequently asked questions about {brandName}</>}
            </h2>
            <p className="font-manrope text-[#161925]/75 text-lg leading-relaxed mt-5 max-w-[40ch]">{intro}</p>
            <a
              href="https://wa.me/971502814338"
              target="_blank"
              rel="noopener"
              className="group/wa mt-8 inline-flex min-h-[2.75rem] items-center gap-3 rounded-full bg-[#161925] pl-6 pr-5 font-manrope text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#406E8E]"
            >
              Ask on WhatsApp
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover/wa:translate-x-1">&rarr;</span>
            </a>
            {portrait}
          </div>
          <div>
            <div className="border-t border-[#161925]/12">
              {faqs.map((f, i) => (
                <HubFaqItem key={f.question} question={f.question} answer={f.answer} defaultOpen={i === 0} />
              ))}
            </div>
            {footnote}
          </div>
        </div>
      </div>
    </section>
  );
}

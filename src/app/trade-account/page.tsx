import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm.client";
import { Toaster } from "@/components/ui/sonner";
import { HubFaq } from "@/components/brands/hub/hub-faq";
import { ConicBorderBeam } from "@/components/trade/conic-border-beam";
import { BRANCHES, SITE, breadcrumbNode, faqPageNode, graph, jsonLd, organizationNode, webPageNode } from "@/lib/org-schema";

const PAGE_URL = `${SITE}/trade-account`;

export const metadata: Metadata = {
  title: "Trade Account for Contractors in Dubai | Lapiz Blue",
  description:
    "Open a trade account with Lapiz Blue in Dubai: trade pricing, project pricing against a BOQ and credit terms on approval for contractors, applicators and resellers.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Trade Account for Contractors in Dubai | Lapiz Blue",
    description:
      "Trade pricing, project pricing against a bill of quantities and credit accounts on approval, from three UAE branches.",
    url: PAGE_URL,
    siteName: "Lapiz Blue",
    type: "website",
  },
};

const TERMS = [
  ["Trade pricing", "A trade price list for contractors, applicators and resellers across Mapei, Kerakoll, Weber, Laticrete, Pidilite Puma, Profilpas, AkzoNobel Dulux and FILA, reviewed against volume every quarter."],
  ["Project pricing", "Send the bill of quantities and the quotation is priced for the project, line by line, with the data sheet for every product and the stock position per branch."],
  ["Credit accounts", "Thirty day credit on approval for registered companies, against the trade licence and TRN. Limits are set with the accounts team and grow with the account."],
  ["Call off deliveries", "Material held against your order and released to site in the quantities the programme needs, next working day across Dubai, Abu Dhabi and Sharjah for calls before 3 pm."],
  ["Documents with every order", "Technical data sheet and safety data sheet for every line, the manufacturer authorisation letter for the submittal, and a method statement for the common systems."],
  ["One desk, three branches", "One account manager for the company, with collection or delivery from Al Quoz, Mussafah and Al Sajaa."],
] as const;

const STEPS = [
  ["Apply", "Company name, TRN, the trade licence as a PDF or an image, and the person the accounts team should speak to."],
  ["Approval", "The accounts team confirms the trade pricing tier and, where credit is requested, the opening limit. Usually within two working days."],
  ["Order", "Send the BOQ or the product list on WhatsApp, by email or through the quote list on this site. Every quotation carries the data sheets."],
] as const;

const FIGURES = [
  ["8", "manufacturer brands on trade price"],
  ["3", "branches, one account"],
  ["30", "day credit on approval"],
  ["3 pm", "cut off for next day delivery"],
] as const;

const COUNTER = "/images/stores/abudhabi-lapizblue";
const COUNTER_ALT = "The Lapiz Blue branch in Mussafah, Abu Dhabi, where trade accounts collect";
const COUNTER_SET = () => `${COUNTER}-640.webp 640w, ${COUNTER}-828.webp 828w, ${COUNTER}-1200.webp 1200w, ${COUNTER}-1360.webp 1360w`;
const COUNTER_SIZES = "(max-width: 1023px) calc(100vw - 2rem), (max-width: 1400px) 36vw, 500px";

const FAQS = [
  { question: "Who can open a trade account with Lapiz Blue?", answer: "Registered UAE companies that buy construction chemicals or building materials for projects: main contractors, subcontractors and applicators, fit out companies, facility management companies, developers and resellers. A trade licence and a TRN are needed." },
  { question: "What does trade pricing cover?", answer: "Every brand Lapiz Blue is appointed for: Mapei, Kerakoll, Weber Saint-Gobain, Laticrete, Pidilite Puma, Profilpas, AkzoNobel Dulux and FILA, plus tools from Montolit and Hilti. The tier is set by expected volume and reviewed against actual purchases." },
  { question: "How is project pricing different from trade pricing?", answer: "Project pricing is quoted against a specific bill of quantities for one site, so large lines can be priced below the trade list and held for the duration of the project. Send the BOQ and the quotation comes back priced line by line." },
  { question: "Can I get credit terms?", answer: "Yes, on approval. Thirty day terms are the standard for approved companies, against the trade licence and TRN, with an opening limit set by the accounts team. Cash and card accounts are available immediately." },
  { question: "Do I need an account to get a quotation?", answer: "No. Anyone can send a BOQ or a product list and receive a priced quotation with data sheets. The account adds trade pricing, credit and a named account manager." },
  { question: "Does the account work at all three branches?", answer: "Yes. One account covers collection and delivery from Al Quoz in Dubai, Mussafah in Abu Dhabi and Al Sajaa in Sharjah." },
  { question: "How fast is delivery to site?", answer: "Orders placed before 3 pm are delivered the next working day across Dubai, Abu Dhabi and Sharjah. Stock lines can be collected the same day from any branch. Scheduled call offs are arranged against the programme." },
  { question: "What documents come with an order?", answer: "The manufacturer technical data sheet and safety data sheet for every line, the authorisation letter for consultant submittals, and a method statement for the common waterproofing, flooring and tiling systems." },
];

const schema = graph([
  webPageNode({ url: PAGE_URL, name: "Trade account for contractors, applicators and resellers", description: metadata.description ?? undefined, breadcrumbId: `${PAGE_URL}#breadcrumb` }),
  breadcrumbNode(`${PAGE_URL}#breadcrumb`, [
    { name: "Home", item: SITE },
    { name: "Trade account", item: PAGE_URL },
  ]),
  organizationNode(),
  faqPageNode(`${PAGE_URL}#faq`, FAQS),
]);

export default function TradeAccountPage() {
  return (
    <main className="bg-white text-[#161925]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Toaster position="top-right" richColors />

      <link rel="preload" as="image" type="image/webp" fetchPriority="high" imageSrcSet={COUNTER_SET()} imageSizes={COUNTER_SIZES} />

      <section className="relative overflow-hidden bg-[#161925] text-white">
        {/* A soft brand blue light behind the photograph, the only decoration on the dark ground. */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-[#406E8E]/20 blur-3xl" />
        <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-12 lg:pt-20 pb-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="font-manrope text-sm text-white/60 mb-8">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Trade account</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] lg:grid-rows-[auto_auto] gap-x-16 gap-y-10 lg:gap-y-12">
            <div className="lg:col-start-1 lg:row-start-1">
              <p className="label-sh text-[#BFD7EA]">For contractors, applicators and resellers</p>
              <h1 className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] mt-4 max-w-[14ch]">
                Trade account for contractors in Dubai
              </h1>
              <p className="font-manrope text-white/85 text-lg sm:text-xl leading-relaxed mt-6 max-w-[62ch]">
                A trade account with Lapiz Blue General Trading LLC gives a registered UAE company trade pricing across eight manufacturer
                brands, project pricing against a bill of quantities, thirty day credit on approval, and one account manager for collection
                or delivery from Al Quoz, Mussafah and Al Sajaa. Apply with the trade licence and TRN below; the accounts team usually
                confirms within two working days.
              </p>
              <a
                href="#apply"
                className="group/cta mt-8 inline-flex min-h-[3rem] items-center gap-3 rounded-full bg-[#F3DFC1] pl-7 pr-6 font-manrope text-sm font-semibold text-[#161925] transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFD7EA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#161925]"
              >
                Apply for a trade account
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">&rarr;</span>
              </a>
            </div>

            {/* The photograph: a 3:2 frame with a running head and a light travelling round its edge. */}
            <figure className="relative lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
              <div className="relative overflow-hidden rounded-2xl bg-[#23395B] ring-1 ring-inset ring-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
                <div className="aspect-[3/2]">
                  <picture>
                    <source type="image/webp" srcSet={COUNTER_SET()} sizes={COUNTER_SIZES} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${COUNTER}-1360.webp`}
                      alt={COUNTER_ALT}
                      width={1600}
                      height={1063}
                      fetchPriority="high"
                      decoding="async"
                      className="block h-full w-full object-cover"
                    />
                  </picture>
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#161925]/55 via-transparent to-transparent" />
                <div aria-hidden="true" className="absolute left-5 right-5 top-5 flex items-center gap-4 sm:left-6 sm:right-6 sm:top-6">
                  <span className="label-sh text-[#F3DFC1]">Mussafah, Abu Dhabi</span>
                  <span className="h-px flex-1 bg-[#F3DFC1]/70" />
                </div>
                <ConicBorderBeam />
              </div>
              <figcaption className="sr-only">{COUNTER_ALT}</figcaption>
            </figure>

            {/* The four figures as one ribbon, cream numerals divided by hairlines. */}
            <dl
              aria-label="Figures"
              className="lg:col-start-1 lg:row-start-2 lg:self-end grid grid-cols-2 sm:grid-cols-4 border-y border-white/15 [&>div]:border-white/15 [&>div:nth-child(odd)]:border-r [&>div:nth-child(-n+2)]:border-b sm:[&>div]:border-b-0 sm:[&>div]:border-r sm:[&>div:last-child]:border-r-0"
            >
              {FIGURES.map(([v, l]) => (
                <div key={l} className="flex flex-col px-4 py-6 sm:px-5 sm:py-7 [&:nth-child(odd)]:pl-0 sm:pl-5 sm:[&:first-child]:pl-0">
                  <dt className="order-2 mt-3 font-manrope text-xs sm:text-sm leading-snug text-white/65">{l}</dt>
                  <dd className="font-outfit font-semibold text-4xl sm:text-5xl text-[#F3DFC1] tabular-nums leading-none">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="terms-heading">
        <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">What the account gives you</p>
        <h2 id="terms-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
          What trade terms does Lapiz Blue offer?
        </h2>
        <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {TERMS.map(([t, b], i) => (
            <li key={t} className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-[#161925]/10 pt-6">
              <span className="font-outfit font-semibold text-3xl text-[#406E8E] tabular-nums leading-none pt-1">0{i + 1}</span>
              <div>
                <h3 className="font-outfit font-semibold text-xl sm:text-2xl">{t}</h3>
                <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-2">{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="apply" className="bg-[#F6F8FA] scroll-mt-20" aria-labelledby="apply-heading">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16">
          <div>
            <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Apply</p>
            <h2 id="apply-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
              How do I open a trade account?
            </h2>
            <ol className="mt-8 space-y-6">
              {STEPS.map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[auto_1fr] gap-x-5">
                  <span className="font-outfit font-semibold text-2xl text-[#406E8E] tabular-nums leading-none pt-1">{i + 1}</span>
                  <div>
                    <h3 className="font-outfit font-semibold text-lg sm:text-xl">{t}</h3>
                    <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-1">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="font-manrope text-[#161925]/70 text-sm mt-8">
              Prefer to talk first? Call the Dubai desk on <a href={BRANCHES[0].phoneHref} className="text-[#406E8E] underline underline-offset-4">{BRANCHES[0].phone}</a>, Monday to Saturday, 8 am to 6 pm.
            </p>
          </div>
          {/* The same light gradient the contact page puts under the form, so its navy type and placeholders read. */}
          <div className="relative overflow-hidden rounded-[24px] p-3 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: "url(/images/meshgradientbase-1200.webp)" }} />
            <div className="relative">
              <ContactForm variant="trade-account" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="branches-heading">
        <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Where the account works</p>
        <h2 id="branches-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
          Three counters in Dubai, Abu Dhabi and Sharjah
        </h2>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BRANCHES.map((b) => (
            <article key={b.key} className="rounded-2xl border border-[#161925]/10 p-6 sm:p-7">
              <h3 className="font-outfit font-semibold text-2xl leading-tight">{b.emirate}</h3>
              <address className="not-italic font-manrope text-[#161925] text-base mt-4 space-y-1">
                <div>{b.address}</div>
                <div><a href={b.phoneHref} className="text-[#406E8E] underline underline-offset-4">{b.phone}</a></div>
                <div><a href={b.map} target="_blank" rel="noopener" className="text-[#406E8E] underline underline-offset-4">Open in Google Maps</a></div>
              </address>
            </article>
          ))}
        </div>
      </section>

      <HubFaq
        faqs={FAQS}
        brandName="Lapiz Blue"
        heading="Trade accounts, answered"
        eyebrow="Questions"
        headingId="faq-heading"
        intro="Pricing, credit, documents and delivery, answered the way the accounts desk answers them. Anything not covered here, send it over and a person replies."
        photo={{ base: "/images/stores/abudhabi-portrait", alt: COUNTER_ALT, head: "Mussafah, Abu Dhabi" }}
        footnote={
          <p className="font-manrope text-[#161925]/80 text-base mt-10">
            Need the appointment letters and the trade licence for your vendor file? They are on the{" "}
            <Link href="/credentials" className="text-[#406E8E] underline underline-offset-4">credentials page</Link>.
          </p>
        }
      />
    </main>
  );
}

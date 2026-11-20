import type { Metadata } from "next";
import Link from "next/link";
import { OurProjectsSection } from "@/components/ui/our-projects-section";
import { SITE, breadcrumbNode, faqPageNode, graph, jsonLd, organizationNode, webPageNode } from "@/lib/org-schema";

const PAGE_URL = `${SITE}/credentials`;

export const metadata: Metadata = {
  title: "Credentials and Authorisation Letters | Lapiz Blue",
  description:
    "Lapiz Blue General Trading LLC trade licence, TRN and manufacturer appointment letters for Mapei, Kerakoll, Weber, Laticrete, Pidilite Puma and AkzoNobel, Dubai, in one vendor pack.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Credentials and Authorisation Letters | Lapiz Blue",
    description: "Trade licence, TRN and every manufacturer appointment letter, for consultant submittals and vendor registration.",
    url: PAGE_URL,
    siteName: "Lapiz Blue",
    type: "website",
  },
};

interface Doc {
  title: string;
  issuer: string;
  use: string;
  file: string;
  kind: "PDF" | "JPEG";
}

const COMPANY: Doc[] = [
  { title: "Trade licence 2026 to 2027", issuer: "Dubai Department of Economy and Tourism", use: "Vendor registration and prequalification.", file: "/certificates/trade-license-2026.pdf", kind: "PDF" },
  { title: "TRN certificate", issuer: "Federal Tax Authority", use: "Tax registration number for invoicing and vendor files.", file: "/certificates/trn-certificate.pdf", kind: "PDF" },
  { title: "Company profile 2026 to 2027", issuer: "Lapiz Blue General Trading LLC", use: "Brands, branches, projects and the team, 32 pages.", file: "/documents/lapizblue-company-profile.pdf", kind: "PDF" },
];

const BRANDS: (Doc & { brand: string; hub: string })[] = [
  { brand: "Mapei", hub: "/brands/mapei", title: "Mapei authorisation letter", issuer: "Mapei", use: "Names Lapiz Blue as an authorised Mapei distributor in the UAE. Attach to the consultant submittal.", file: "/certificates/mapei-authorization.pdf", kind: "PDF" },
  { brand: "Kerakoll", hub: "/brands/kerakoll", title: "Kerakoll dealer certificate", issuer: "Kerakoll", use: "Authorised Kerakoll dealer appointment for the UAE.", file: "/certificates/kerakoll-dealer-certificate.pdf", kind: "PDF" },
  { brand: "Weber", hub: "/brands/weber", title: "Weber Saint-Gobain distributor letter", issuer: "Saint-Gobain Weber", use: "Appointed Weber distributor for the UAE.", file: "/certificates/weber-distributor-letter.pdf", kind: "PDF" },
  { brand: "Weber", hub: "/brands/weber", title: "Weber authorisation", issuer: "Saint-Gobain Weber", use: "Supply chain partnership notice.", file: "/certificates/weber-authorization.jpeg", kind: "JPEG" },
  { brand: "Laticrete", hub: "/brands/laticrete", title: "Laticrete distributor certificate", issuer: "Laticrete", use: "Authorised Laticrete distributor for the UAE.", file: "/certificates/laticrete-distributor-certificate.pdf", kind: "PDF" },
  { brand: "Pidilite Puma", hub: "/brands/pidilite-puma", title: "Pidilite Puma distributor letter", issuer: "Pidilite", use: "Appointed Pidilite Puma distributor for the UAE.", file: "/certificates/pidilite-puma-distributor-letter.pdf", kind: "PDF" },
  { brand: "AkzoNobel Dulux", hub: "/brands/akzonobel", title: "AkzoNobel Dulux distributor certificate", issuer: "AkzoNobel", use: "Authorised AkzoNobel Dulux distributor for the UAE.", file: "/certificates/akzonobel-distributor-certificate.pdf", kind: "PDF" },
];

const FAQS = [
  { question: "What goes in a consultant submittal for a construction chemical?", answer: "The manufacturer technical data sheet, the safety data sheet, the distributor authorisation letter naming Lapiz Blue General Trading LLC, and where the system needs one, a method statement. Every product page on this site carries the data sheet; the letters are on this page." },
  { question: "Is Lapiz Blue an authorised distributor or a reseller?", answer: "An authorised distributor, appointed in writing by Mapei, Kerakoll, Weber Saint-Gobain, Laticrete, Pidilite Puma and AkzoNobel. The appointment letters are published above and are the same documents sent with quotations." },
  { question: "What is in the vendor registration pack?", answer: "The trade licence, the TRN certificate, the six manufacturer appointment letters, the Weber authorisation notice and the 2026 to 2027 company profile, as one zip file of about 12 MB." },
  { question: "Can you send the letters for a specific project?", answer: "Yes. Ask for the submittal pack from any product page and the data sheet, safety data sheet and the relevant letter arrive together on WhatsApp or by email, addressed to the project if the consultant needs that." },
  { question: "Which projects has Lapiz Blue supplied?", answer: "Etihad Railways, Abu Dhabi Port, DAMAC Lagoons, Royal Atlantis, St Regis, Jumeirah Avenue Mall, Vida Mall Carrefour, Adani Tower, IBIS Hotel, Atachi Gold Refinery, Jawaharlal Nehru Stadium and Crocodile Park, among others listed below." },
  { question: "What is the 2026 Dubai Local Awards recognition?", answer: "Lapiz Blue was named Outstanding Construction Material Wholesaler in the 2026 Dubai Local Awards, based on verified Google reviews, a 4.7 rating across 179 reviews at the time of judging." },
];

const schema = graph([
  webPageNode({ url: PAGE_URL, name: "Credentials and authorisation letters", description: metadata.description ?? undefined, breadcrumbId: `${PAGE_URL}#breadcrumb` }),
  breadcrumbNode(`${PAGE_URL}#breadcrumb`, [
    { name: "Home", item: SITE },
    { name: "Credentials", item: PAGE_URL },
  ]),
  organizationNode(),
  faqPageNode(`${PAGE_URL}#faq`, FAQS),
]);

function DocCard({ d }: { d: Doc }) {
  return (
    <li className="flex flex-col rounded-2xl border border-[#161925]/10 bg-white p-6">
      <p className="label-sh text-[#161925]/60">{d.issuer}</p>
      <h3 className="font-outfit font-semibold text-xl mt-2 leading-snug">{d.title}</h3>
      <p className="font-manrope text-[#161925]/75 text-sm leading-relaxed mt-2 grow">{d.use}</p>
      <a
        href={d.file}
        target="_blank"
        rel="noopener"
        className="mt-5 inline-flex min-h-[2.75rem] w-fit items-center rounded-full border border-[#161925]/25 px-5 font-manrope text-sm font-semibold text-[#161925] transition-colors hover:border-[#161925] hover:bg-[#161925] hover:text-white"
      >
        Open the {d.kind}
      </a>
    </li>
  );
}

export default function CredentialsPage() {
  return (
    <main className="bg-white text-[#161925]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />

      <section className="bg-[#161925] text-white">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-12 lg:pt-20 pb-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="font-manrope text-sm text-white/60 mb-8">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Credentials</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="font-manrope text-[#BFD7EA] text-sm sm:text-base uppercase tracking-widest">For the vendor file and the submittal</p>
              <h1 className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] mt-3 max-w-[14ch]">
                Credentials and authorisation letters
              </h1>
              <p className="font-manrope text-white/85 text-lg sm:text-xl leading-relaxed mt-6 max-w-[62ch]">
                Every document a consultant, a procurement team or a prequalification form asks for, in one place: the Dubai trade
                licence and TRN of Lapiz Blue General Trading LLC, and the letters by which Mapei, Kerakoll, Weber Saint-Gobain,
                Laticrete, Pidilite Puma and AkzoNobel appoint Lapiz Blue as their distributor in the UAE. Open any one, or take the
                whole set as a vendor registration pack.
              </p>
              <a
                href="/documents/lapizblue-vendor-registration-pack.zip"
                className="mt-8 inline-flex min-h-[3rem] items-center rounded-full bg-[#F3DFC1] px-7 font-manrope text-base font-semibold text-[#161925] transition-opacity hover:opacity-90"
              >
                Download the vendor registration pack (zip, 12 MB)
              </a>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {[["6", "manufacturer appointments"], ["3", "branches licensed in the UAE"], ["4.7", "Google rating, 179 reviews"], ["2026", "Dubai Local Awards winner"]].map(([v, l]) => (
                <div key={l}>
                  <dd className="font-outfit font-semibold text-4xl sm:text-5xl text-[#F3DFC1] tabular-nums leading-none">{v}</dd>
                  <dt className="font-manrope text-white/70 text-sm mt-2">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="company-heading">
        <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">The company</p>
        <h2 id="company-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
          Which company documents do you need for vendor registration?
        </h2>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMPANY.map((d) => <DocCard key={d.file} d={d} />)}
        </ul>
      </section>

      <section className="bg-[#F6F8FA]" aria-labelledby="letters-heading">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">The manufacturers</p>
          <h2 id="letters-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[24ch] leading-tight">
            Which brands is Lapiz Blue authorised to distribute?
          </h2>
          <p className="font-manrope text-[#161925]/80 text-lg mt-5 max-w-[62ch]">
            Each letter below is the manufacturer's own appointment. It is what makes a quotation from Lapiz Blue acceptable to a
            consultant, and what keeps the manufacturer warranty intact on site. Profilpas, FILA and Kalinga Stone are supplied
            directly and their technical sheets ship with every quotation.
          </p>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRANDS.map((d) => (
              <li key={d.file} className="flex flex-col rounded-2xl border border-[#161925]/10 bg-white p-6">
                <p className="label-sh text-[#161925]/60">{d.issuer}</p>
                <h3 className="font-outfit font-semibold text-xl mt-2 leading-snug">{d.title}</h3>
                <p className="font-manrope text-[#161925]/75 text-sm leading-relaxed mt-2 grow">{d.use}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a href={d.file} target="_blank" rel="noopener" className="inline-flex min-h-[2.75rem] items-center rounded-full border border-[#161925]/25 px-5 font-manrope text-sm font-semibold text-[#161925] transition-colors hover:border-[#161925] hover:bg-[#161925] hover:text-white">
                    Open the {d.kind}
                  </a>
                  <Link href={d.hub} className="font-manrope text-sm font-semibold text-[#406E8E] underline underline-offset-4">
                    {d.brand} products
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="projects-heading">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-16 lg:pt-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Track record</p>
          <h2 id="projects-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 max-w-[22ch] leading-tight">
            Sites that run on materials from Lapiz Blue
          </h2>
        </div>
        <OurProjectsSection />
      </section>

      <section className="bg-[#F6F8FA]" aria-labelledby="faq-heading">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Questions</p>
          <h2 id="faq-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight">
            Credentials, answered
          </h2>
          <ol className="mt-10 divide-y divide-[#161925]/10 border-y border-[#161925]/10 max-w-[80ch]">
            {FAQS.map((f) => (
              <li key={f.question} className="py-6">
                <h3 className="font-outfit font-semibold text-xl sm:text-2xl">{f.question}</h3>
                <p className="font-manrope text-[#161925]/80 text-base leading-relaxed mt-2">{f.answer}</p>
              </li>
            ))}
          </ol>
          <p className="font-manrope text-[#161925]/80 text-base mt-10">
            Buying for a company? Trade pricing and credit terms are on the{" "}
            <Link href="/trade-account" className="text-[#406E8E] underline underline-offset-4">trade account page</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

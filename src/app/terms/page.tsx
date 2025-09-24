import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — Lapiz Blue",
  description:
    "Terms governing the use of lapizblue.com, including copyright, acceptable use, deliveries, and liability.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms & Conditions — Lapiz Blue",
    description:
      "Terms governing the use of lapizblue.com, including copyright, acceptable use, deliveries, and liability.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="bg-white text-[#23395B]">
      <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-24 md:pt-14">
        {/* Heading (Lapiz Blue links home) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          Terms &amp; Conditions{" "}
          <Link href="/" className="text-[#1E6BA8] hover:underline focus:outline-none focus:ring-2 focus:ring-[#1E6BA8]/30">
            of Lapiz Blue.
          </Link>
        </h1>

        {/* Intro (domain links to /) */}
        <p className="mt-6 leading-relaxed max-w-3xl">
          Welcome to{" "}
          <Link href="/" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            lapizblue.com
          </Link>{" "}
          (the “Website”), owned and operated by Lapiz Blue General Trading LLC. By accessing or
          using our Website, you agree to the terms set out below. If you do not agree, please do
          not use the Website.
        </p>

        {/* 1 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">1. Ownership and Coverage</h2>
        <p className="max-w-3xl">
          These Terms &amp; Conditions apply to www.lapizblue.com and all related sub-pages,
          including brand sections such as Mapei, Profilpas, Forbo, and others managed by Lapiz
          Blue.
        </p>

        {/* 2 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">2. Copyright and Trademarks</h2>
        <p className="max-w-3xl">
          All content on this Website — including text, images, graphics, documents, layouts,
          trademarks, and logos — is protected by copyright and intellectual property laws.
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>
            <strong>Strict copyright policy:</strong> No content may be copied, reproduced,
            modified, distributed, or displayed without prior written permission from Lapiz Blue.
          </li>
          <li>
            <strong>Third-party rights:</strong> Logos, trademarks, and images of brands such as
            Mapei, Profilpas, Forbo, Kerakoll, and others remain the property of their respective
            owners. Lapiz Blue uses these assets only with authorization or for informational
            purposes.
          </li>
        </ul>
        <p className="mt-3 max-w-3xl">
          Downloading or using materials is only allowed where expressly stated, and solely for
          personal, non-commercial use.
        </p>

        {/* 3 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">3. Website Information and Liability</h2>
        <p className="max-w-3xl">
          Lapiz Blue strives to ensure that all information on the Website is accurate and up to
          date. However, we cannot guarantee completeness or absolute accuracy at all times.
        </p>
        <p className="mt-3">We are not responsible for:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Errors, omissions, or outdated information</li>
          <li>Service interruptions due to internet issues, power supply, or technical failures</li>
          <li>Damage to IT equipment or data from downloading materials or browsing</li>
        </ul>
        <p className="mt-3 max-w-3xl">
          The Website may contain links to external sites. Lapiz Blue has no control over
          third-party websites and accepts no responsibility for their content, products, or
          services.
        </p>

        {/* 4 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">4. Use of the Website</h2>
        <p className="max-w-3xl">
          Users agree to use this Website only for lawful purposes and without violating the rights
          of Lapiz Blue or any third party. This includes respecting regulations on data
          protection, intellectual property, IT security, and telecommunications.
        </p>

        {/* 5 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">5. Communications and Submissions</h2>
        <p className="max-w-3xl">
          Any inquiries, messages, documents, or uploads sent through the Website will not be
          treated as confidential. By sending such material, you confirm it can be published,
          adapted, or used by Lapiz Blue without restrictions.
        </p>
        <p className="mt-3">Users are responsible for ensuring that any material submitted:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Has been lawfully obtained</li>
          <li>Does not infringe on third-party rights</li>
          <li>Does not contain harmful or unlawful content</li>
        </ul>
        <p className="mt-3 max-w-3xl">
          Lapiz Blue disclaims responsibility for any claims or damages arising from user-submitted
          material.
        </p>

        {/* 6 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">6. Deliveries and Orders</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Orders placed before 3:00 pm are usually delivered the next working day, subject to
            traffic, location, order size, and customer loyalty.
          </li>
          <li>Regular customers may qualify for free delivery under these same conditions.</li>
          <li>
            Overnight or late-night deliveries may be arranged at extra cost, which is passed
            directly to drivers in recognition of their additional time and effort.
          </li>
          <li>
            While we aim to meet delivery commitments, delays may occur due to external factors
            beyond our control.
          </li>
        </ul>

        {/* 7 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">7. Blogs and Technical Information</h2>
        <p className="max-w-3xl">
          Our blogs and website articles are primarily written for SEO and educational purposes.
          While the information is correct and fact-checked, it may not cover every project’s
          unique technical details.
        </p>
        <p className="mt-3 max-w-3xl">
          <strong>For precise recommendations:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Please consult our technical team, who can provide free quotations and tailored advice.
          </li>
          <li>
            We encourage clients to rely on professional consultation before making final
            decisions.
          </li>
        </ul>

        {/* 8 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">8. Suspension or Interruption</h2>
        <p className="max-w-3xl">
          Lapiz Blue reserves the right to suspend or permanently block access to the Website if we
          believe its use violates these Terms or applicable laws.
        </p>

        {/* 9 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">9. Privacy and Cookies</h2>
        <p className="max-w-3xl">
          Your personal data is handled according to our Privacy Policy and Cookie Policy,
          available on the Website.
        </p>

        {/* 10 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">
          10. Governing Law and Jurisdiction
        </h2>
        <p className="max-w-3xl">
          These Terms &amp; Conditions are governed by the laws of the United Arab Emirates. Any
          disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
        </p>

        {/* 11 */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">11. Changes to Terms</h2>
        <p className="max-w-3xl">
          Lapiz Blue may update these Terms &amp; Conditions at any time. Updates will be posted on
          this page with the latest revision date.
        </p>
        <p className="text-sm text-black/60 mt-1">Last updated: August 2025</p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Lapiz Blue",
  description:
    "Read the terms and conditions governing your use of Lapiz Blue services and website. Clear guidelines for our business relationship.",
  alternates: { canonical: "https://www.lapizblue.com/terms" },
  openGraph: {
    title: "Terms & Conditions | Lapiz Blue",
    description: "Read the terms and conditions governing your use of Lapiz Blue services and website.",
    url: "https://www.lapizblue.com/terms",
    siteName: "Lapiz Blue",
    images: [{ url: "/images/home/homepageimages/hero.jpg", width: 1920, height: 1080, alt: "Lapiz Blue" }],
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | Lapiz Blue",
    description: "Read the terms and conditions governing your use of Lapiz Blue services and website.",
  },
};

export default function TermsPage() {
  return (
    <main className="bg-white text-[#23395B]">
      <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-24 md:pt-14">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          Terms &amp; Conditions – lapizblue.com
        </h1>

        {/* Intro */}
        <p className="mt-2 text-sm font-medium">
          Terms &amp; Conditions of Lapiz Blue General Trading LLC
        </p>
        <p className="text-sm text-black/60 mt-1">Last updated: August 2025</p>

        <p className="mt-6 leading-relaxed max-w-3xl">
          Welcome to{" "}
          <Link href="/" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            lapizblue.com
          </Link>{" "}
          (the "Website"), owned and operated by Lapiz Blue General Trading LLC ("Lapiz Blue", "we", "us", or "our"). By accessing or using this Website, you agree to be bound by these Terms &amp; Conditions ("Terms"). If you do not agree, please stop using the Website.
        </p>

        <p className="mt-3 max-w-3xl leading-relaxed">
          These Terms apply to{" "}
          <Link href="/" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            www.lapizblue.com
          </Link>{" "}
          and all related sub-pages, including brand sections such as Mapei, Profilpas, Forbo, and other pages managed by Lapiz Blue.
        </p>

        {/* 1. Who we are */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">1. Who we are</h2>
        <p className="max-w-3xl leading-relaxed">
          Lapiz Blue General Trading LLC is a UAE based building-materials and construction-chemicals supplier serving contractors, resellers, consultants, and project owners from branches in Dubai, Abu Dhabi, and Sharjah.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          We specialise in products such as tile adhesives, grouts, waterproofing systems, flooring solutions, trims, movement joints, and related construction materials.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed font-medium">Registered address:</p>
        <p className="max-w-3xl leading-relaxed">
          Lapiz Blue General Trading LLC<br />
          14 4 Street, Al Quoz Industrial 4<br />
          Dubai, United Arab Emirates
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Email:{" "}
          <a href="mailto:info@lapizblue.com" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            info@lapizblue.com
          </a>
        </p>
        <p className="max-w-3xl leading-relaxed">
          Telephone:{" "}
          <a href="tel:+97148855257" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            +971 4 885 5257
          </a>
        </p>

        {/* 2. Acceptance of these Terms */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">2. Acceptance of these Terms</h2>
        <p className="max-w-3xl leading-relaxed">
          By browsing, accessing, or using this Website, you:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Confirm that you are at least 18 years old or using the Website under the supervision of a parent or legal guardian.</li>
          <li>Agree to be bound by these Terms, our Privacy Policy, and any other policies or notices posted on the Website.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          If you use the Website on behalf of a company or organisation, you confirm that you are authorised to accept these Terms on its behalf.
        </p>

        {/* 3. Permitted use of the Website */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">3. Permitted use of the Website</h2>
        <p className="max-w-3xl leading-relaxed">
          You may use the Website only for lawful purposes and in line with these Terms. In particular, you agree not to:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Use the Website in any way that violates applicable laws or regulations.</li>
          <li>Copy, scrape, or harvest data from the Website for resale, competitor analysis, or any unauthorised commercial use.</li>
          <li>Upload or transmit any harmful code, malware, or attempt to gain unauthorised access to our systems.</li>
          <li>Interfere with or disrupt the security, performance, or availability of the Website.</li>
          <li>Impersonate any person or entity, or misrepresent your affiliation with Lapiz Blue or our partners.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          We reserve the right to monitor use of the Website and to suspend or block access if we believe these Terms are being breached.
        </p>

        {/* 4. Intellectual property and brand usage */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">4. Intellectual property and brand usage</h2>
        <p className="max-w-3xl leading-relaxed">
          All content on this Website is protected by copyright and other intellectual property laws. This includes, without limitation:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Text, copy, product descriptions, brochures, and downloadable documents</li>
          <li>Images, videos, graphics, layouts, and icons</li>
          <li>Logos, trademarks, and trade names</li>
          <li>Code, design, and structure of the Website</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Unless expressly allowed, you may not copy, reproduce, modify, adapt, translate, publish, distribute, or create derivative works from any part of the Website without prior written permission from Lapiz Blue.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed font-medium">Third-party brands</p>
        <p className="max-w-3xl leading-relaxed">
          Logos, products, and trademarks of partners such as Mapei, Profilpas, Forbo, Kerakoll, Laticrete, Saint-Gobain Weber, XCalibur, FILA, Hilti, DeWalt, and others remain the property of their respective owners. Lapiz Blue uses these assets under authorisation, distribution agreements, or for informational reference only. Nothing on this Website grants you any licence to use these marks.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Downloading or using materials from the Website is only allowed where this is clearly permitted, and then solely for personal, non-commercial use.
        </p>

        {/* 5. Website information, products, and technical content */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">5. Website information, products, and technical content</h2>
        <p className="max-w-3xl leading-relaxed">
          We work hard to keep information accurate and useful, particularly for technical topics like waterproofing, tile adhesives, grouts, flooring systems, substrate preparation, and building-materials selection. However:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Product data, availability, pack sizes, and colours may change without notice.</li>
          <li>Technical information, blog posts, and guides are general in nature and may not cover every project condition or site constraint.</li>
          <li>Final design and installation decisions should always be based on official technical data sheets (TDS), local regulations, and professional advice.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">You agree that:</p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Information on the Website is provided "as is" for general guidance only.</li>
          <li>Lapiz Blue is not responsible for any loss or damage arising from reliance on Website content without consulting our technical team, brand-owner documentation, or qualified professionals.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          For precise recommendations, please contact our technical or sales team for a project-specific review and written proposal.
        </p>

        {/* 6. Orders, quotations, and deliveries */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">6. Orders, quotations, and deliveries</h2>
        <p className="max-w-3xl leading-relaxed">
          In some cases you may submit quote requests, purchase enquiries, or delivery instructions through the Website, email, or WhatsApp.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Unless stated in a separate written agreement:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Quotes are indicative and subject to stock availability, site access, technical approval, and credit status.</li>
          <li>Orders placed before 3:00 pm are usually scheduled for delivery the next working day within Dubai, Abu Dhabi, or Sharjah, subject to traffic, route planning, and order size.</li>
          <li>Regular customers may qualify for free delivery according to our internal logistics and credit policy.</li>
          <li>Evening or late-night deliveries may be arranged at an extra charge, usually paid directly to drivers for the additional time and effort.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          We aim to honour delivery commitments, but delays may occur due to traffic, customs, weather, supplier issues, or other events outside our control. In such cases, Lapiz Blue is not liable for indirect losses such as loss of profit, project delay penalties, or labour downtime beyond the value of the delayed goods and any statutory rights.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Any product warranties are subject to the manufacturer's terms and conditions.
        </p>

        {/* 7. User submissions, forms, and communications */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">7. User submissions, forms, and communications</h2>
        <p className="max-w-3xl leading-relaxed">
          When you submit a form, send us a message, upload a document, or contact us via WhatsApp, email, or social media, you are responsible for the accuracy and legality of the information you provide.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          By submitting content to Lapiz Blue, you confirm that:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>The information is correct to the best of your knowledge.</li>
          <li>You have the right to share any documents or media you upload.</li>
          <li>Your content does not infringe the rights of third parties, including intellectual property or privacy rights.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Unless we specifically agree otherwise, inquiries, feedback, and testimonials may be used to improve our services, train staff, or, with your consent, appear as anonymised case studies or success stories.
        </p>

        {/* 8. Third-party links and services */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">8. Third-party links and services</h2>
        <p className="max-w-3xl leading-relaxed">
          The Website may include links to third-party websites, catalogues, videos, or tools, including manufacturer resources, technical libraries, map services, or social-media platforms.
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>These external websites are not controlled by Lapiz Blue.</li>
          <li>We are not responsible for their content, security, availability, or privacy practices.</li>
          <li>Accessing third-party sites is at your own risk and subject to their own terms and policies.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Where we embed tools or content from third parties, such as YouTube videos, map widgets, or chat tools, your use of those features may involve separate data processing by those providers.
        </p>

        {/* 9. Disclaimers */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">9. Disclaimers</h2>
        <p className="max-w-3xl leading-relaxed">
          To the fullest extent permitted by law:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>The Website is provided on an "as is" and "as available" basis.</li>
          <li>We make no guarantees that the Website will be uninterrupted, error free, or completely secure.</li>
          <li>We do not warrant that any defects will be corrected, or that the Website or its servers will always be free of viruses or other harmful components.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Nothing in these Terms affects any non-excludable statutory warranties or rights under applicable UAE law.
        </p>

        {/* 10. Limitation of liability */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">10. Limitation of liability</h2>
        <p className="max-w-3xl leading-relaxed">
          To the maximum extent allowed by law, Lapiz Blue, its directors, employees, and partners will not be liable for:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Any indirect, incidental, consequential, special, or punitive damages.</li>
          <li>Loss of profits, revenue, data, business, goodwill, or anticipated savings.</li>
          <li>Any loss resulting from your use or inability to use the Website, or from reliance on any content or materials on the Website.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Where liability cannot be excluded, it will be limited to the amount you have paid to Lapiz Blue in connection with the event giving rise to the claim, or to the minimum extent required by applicable law.
        </p>

        {/* 11. Indemnity */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">11. Indemnity</h2>
        <p className="max-w-3xl leading-relaxed">
          You agree to indemnify and hold harmless Lapiz Blue, its officers, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to your:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Breach of these Terms</li>
          <li>Misuse of the Website</li>
          <li>Violation of any law or the rights of a third party</li>
        </ul>

        {/* 12. Suspension and termination */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">12. Suspension and termination</h2>
        <p className="max-w-3xl leading-relaxed">
          We may suspend or terminate your access to the Website at any time, without notice, if:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>We believe you have breached these Terms or applicable laws.</li>
          <li>We need to protect the security, integrity, or reputation of the Website, our systems, or our customers.</li>
          <li>We discontinue or significantly modify the Website or its features.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Upon termination, your right to use the Website will immediately cease. Sections that by their nature should survive termination will continue to apply, including those on intellectual property, disclaimers, limitation of liability, and governing law.
        </p>

        {/* 13. Privacy and cookies */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">13. Privacy and cookies</h2>
        <p className="max-w-3xl leading-relaxed">
          Your use of the Website is also governed by our Privacy Policy and any Cookie Policy we publish. These explain how we collect, use, and protect personal data, and how cookies and similar technologies are used for analytics and advertising.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          By using the Website, you acknowledge that you have read and understood these policies.
        </p>

        {/* 14. Governing law and jurisdiction */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">14. Governing law and jurisdiction</h2>
        <p className="max-w-3xl leading-relaxed">
          These Terms are governed by the laws of the United Arab Emirates.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Any disputes arising from or related to these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
        </p>

        {/* 15. Changes to these Terms */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">15. Changes to these Terms</h2>
        <p className="max-w-3xl leading-relaxed">
          We may update these Terms from time to time. When we make changes, we will:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Post the updated version on this page, and</li>
          <li>Update the "Last updated" date at the top.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          By continuing to use the Website after changes are posted, you accept the revised Terms.
        </p>

        {/* 16. Severability and waiver */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">16. Severability and waiver</h2>
        <p className="max-w-3xl leading-relaxed">
          If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Our failure to exercise or enforce any right or provision in these Terms does not constitute a waiver of that right or provision.
        </p>

        {/* 17. Contact us */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">17. Contact us</h2>
        <p className="max-w-3xl leading-relaxed">
          If you have any questions about these Terms, please contact us:
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Email:{" "}
          <a href="mailto:info@lapizblue.com" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            info@lapizblue.com
          </a>
        </p>
        <p className="max-w-3xl leading-relaxed">
          Phone:{" "}
          <a href="tel:+97148855257" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            +971 4 885 5257
          </a>
        </p>
        <p className="max-w-3xl leading-relaxed">
          Or via the contact form on our{" "}
          <Link href="/contact" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            Contact Us
          </Link>{" "}
          page.
        </p>
      </section>
    </main>
  );
}

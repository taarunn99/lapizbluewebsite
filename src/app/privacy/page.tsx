import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Lapiz Blue",
  description:
    "How Lapiz Blue collects, uses, and protects personal data when you use our website or services in the UAE.",
  openGraph: {
    title: "Privacy Policy — Lapiz Blue",
    description:
      "How Lapiz Blue collects, uses, and protects personal data when you use our website or services in the UAE.",
    url: "/privacy",
  },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="bg-white text-[#23395B]">
      <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-24 md:pt-14">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          Privacy Policy – lapizblue.com
        </h1>

        {/* Intro */}
        <p className="mt-2 text-sm font-medium">
          Privacy Policy of Lapiz Blue General Trading LLC
        </p>
        <p className="text-sm text-black/60 mt-1">Last updated: August 2025</p>

        <p className="mt-6 leading-relaxed max-w-3xl">
          At Lapiz Blue General Trading LLC ("Lapiz Blue", "we", "us", "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and what choices you have when you use our website or services.
        </p>

        <p className="mt-3 max-w-3xl leading-relaxed">
          This Policy applies to:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>
            Our Website at{" "}
            <Link href="/" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
              www.lapizblue.com
            </Link>{" "}
            and related sub-pages
          </li>
          <li>Forms, quotes, and inquiries submitted through the Website</li>
          <li>Communications with us via email, phone, WhatsApp, or social media related to the Website</li>
        </ul>

        {/* 1. Who we are */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">1. Who we are</h2>
        <p className="max-w-3xl leading-relaxed">
          Lapiz Blue General Trading LLC<br />
          14 4 Street, Al Quoz Industrial 4<br />
          Dubai, United Arab Emirates
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Branches in Dubai, Abu Dhabi, and Sharjah.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Contact email:{" "}
          <a href="mailto:info@lapizblue.com" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            info@lapizblue.com
          </a>
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          We supply building materials and construction chemicals such as tile adhesives, grouts, waterproofing systems, flooring products, trims, and related products to contractors, resellers, and project owners.
        </p>

        {/* 2. Data we collect */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">2. Data we collect</h2>
        <p className="max-w-3xl leading-relaxed">
          We may collect and process the following categories of data:
        </p>

        <p className="mt-3 max-w-3xl leading-relaxed font-medium">a) Contact details</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Name</li>
          <li>Company name and role</li>
          <li>Email address</li>
          <li>Phone number or WhatsApp number</li>
          <li>Project details, delivery address, or site location where provided</li>
        </ul>

        <p className="mt-3 max-w-3xl leading-relaxed font-medium">b) Usage and technical data</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Pages you visit and actions you take on the Website</li>
          <li>Time spent on pages, clicks, scrolls, and navigation paths</li>
          <li>Device information such as browser type, operating system, and screen size</li>
          <li>IP address and approximate location (city or country level)</li>
          <li>
            Referring websites or campaigns that led you to{" "}
            <Link href="/" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
              lapizblue.com
            </Link>
          </li>
        </ul>

        <p className="mt-3 max-w-3xl leading-relaxed font-medium">c) Service and communication data</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Messages, files, or documents you send through forms, email, or WhatsApp</li>
          <li>Details relating to quotation requests, enquiries, or customer support</li>
          <li>Notes we add internally to handle your request or project</li>
        </ul>

        <p className="mt-3 max-w-3xl leading-relaxed font-medium">d) Cookies and similar technologies</p>
        <p className="max-w-3xl leading-relaxed">We use cookies, pixels, and similar technologies to:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Remember your preferences and improve navigation</li>
          <li>Measure Website performance and traffic</li>
          <li>Support advertising and remarketing campaigns where used</li>
          <li>Understand which pages, brands, and products are most interesting to visitors</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          You can control cookies through your browser settings. Some features may not function correctly if certain cookies are disabled.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          We do not collect sensitive personal data such as health information, payment card details via this Website, or data revealing your religion or political opinions.
        </p>

        {/* 3. How we use your data */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">3. How we use your data</h2>
        <p className="max-w-3xl leading-relaxed">
          We use your data for the following purposes:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>To respond to enquiries, quote requests, and technical questions</li>
          <li>To prepare offers, submit proposals, and coordinate deliveries or collections</li>
          <li>To provide after-sales support and handle complaints or warranty questions</li>
          <li>To improve our Website design, content, and user experience</li>
          <li>To send you product information, updates, or offers where you have requested these or where permitted by law</li>
          <li>To manage our customer and supplier relationships in our CRM and accounting tools</li>
          <li>To protect the security of our Website and systems, and to prevent misuse or fraud</li>
          <li>To comply with legal obligations such as tax, accounting, and regulatory requirements</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed font-medium">
          We do not sell your personal data.
        </p>

        {/* 4. Legal bases for processing */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">4. Legal bases for processing</h2>
        <p className="max-w-3xl leading-relaxed">
          Depending on your location and the activity, we rely on one or more of the following legal bases:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>
            <strong>Your consent</strong> – for example, when you opt in to receive marketing emails or accept non-essential cookies.
          </li>
          <li>
            <strong>Performance of a contract or steps before entering a contract</strong> – for example, when you request a quotation, place an order, or ask us to prepare a technical proposal.
          </li>
          <li>
            <strong>Legitimate interests</strong> – such as improving our services, securing our Website, or promoting our products to existing customers, provided your rights are not overridden.
          </li>
          <li>
            <strong>Legal obligations</strong> – where we must keep certain records for tax, accounting, or regulatory reasons.
          </li>
        </ul>

        {/* 5. Advertising, analytics, cookies and Google services */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">5. Advertising, analytics, cookies and Google services</h2>
        <p className="max-w-3xl leading-relaxed">
          We may use analytics and advertising tools to understand visitor behaviour and to show relevant ads for Lapiz Blue products and services. These tools may include:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Google Analytics or similar analytics platforms</li>
          <li>Google Ads and Google AdSense (or other advertising networks)</li>
          <li>Meta (Facebook / Instagram) ads or pixels</li>
          <li>LinkedIn or other B2B marketing platforms</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          These services use cookies and similar identifiers to:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Measure visits, page views, and conversions</li>
          <li>Understand which campaigns or keywords bring visitors to our Website</li>
          <li>Show ads based on your visits to our Website and other websites that use the same advertising networks</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          In particular, third-party vendors, including Google, may use cookies to show ads based on your previous visits to{" "}
          <Link href="/" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            lapizblue.com
          </Link>{" "}
          or other websites. Their advertising cookies allow them and their partners to display ads tailored to your interests across the internet.
        </p>

        <p className="mt-3 max-w-3xl leading-relaxed font-medium">
          Your choices about personalised ads
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>
            You can manage your preferences for Google advertising, including opting out of personalised ads, by visiting{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#1E6BA8]/40 underline-offset-2"
            >
              Google's Ads Settings page
            </a>
            .
          </li>
          <li>
            You can also manage many third-party advertising cookies through industry tools such as{" "}
            <a
              href="https://www.youronlinechoices.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#1E6BA8]/40 underline-offset-2"
            >
              youronlinechoices.eu
            </a>{" "}
            or{" "}
            <a
              href="https://www.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#1E6BA8]/40 underline-offset-2"
            >
              aboutads.info
            </a>{" "}
            (where available in your region).
          </li>
          <li>
            You can block or delete cookies through your browser settings. Doing so may affect how some Website features work but will not stop you from using the Website entirely.
          </li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Where required by law, we will ask for your consent before placing non-essential cookies, including certain analytics and advertising cookies.
        </p>

        {/* 6. Data sharing and third parties */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">6. Data sharing and third parties</h2>
        <p className="max-w-3xl leading-relaxed">
          We may share your data with trusted third parties that help us operate our business, strictly on a need-to-know basis:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li><strong>Logistics and delivery partners</strong> – to deliver materials to your site or warehouse.</li>
          <li><strong>IT and hosting providers</strong> – to host the Website, databases, and email.</li>
          <li><strong>CRM, marketing, and communication tools</strong> – to manage customer records, send emails, or handle WhatsApp and chat communications.</li>
          <li><strong>Analytics and advertising providers</strong> – as described above, to measure usage and run campaigns.</li>
          <li><strong>Professional advisers</strong> – such as auditors, lawyers, or consultants where needed.</li>
          <li><strong>Authorities and regulators</strong> – where we are legally required to share information.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          These partners are required to handle your data securely and use it only for the agreed purposes.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed font-medium">
          We do not permit third parties to sell your data.
        </p>

        {/* 7. International data transfers */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">7. International data transfers</h2>
        <p className="max-w-3xl leading-relaxed">
          Some of our service providers may be located outside the country where you are based. This can mean your data is transferred to or stored in other countries.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Where we transfer personal data internationally, we take reasonable steps to ensure that:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>The receiving country offers an adequate level of data protection, or</li>
          <li>Appropriate safeguards are in place, such as contractual clauses or equivalent mechanisms.</li>
        </ul>

        {/* 8. How long we keep your data */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">8. How long we keep your data</h2>
        <p className="max-w-3xl leading-relaxed">
          We keep personal data only for as long as necessary for the purposes described in this Policy, including:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>For active customers and suppliers, while we maintain a business relationship and for a reasonable time afterwards for legal and operational reasons.</li>
          <li>For enquiries and quote requests, for a period that allows us to follow up and track history, usually a few years.</li>
          <li>For accounting and tax records, as required by applicable UAE law.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          When data is no longer needed, we will delete it or anonymise it.
        </p>

        {/* 9. Your rights */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">9. Your rights</h2>
        <p className="max-w-3xl leading-relaxed">
          Depending on your location and applicable law, you may have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Request access to the personal data we hold about you.</li>
          <li>Ask us to correct inaccurate or incomplete information.</li>
          <li>Request deletion of your data, where there is no legitimate reason for us to keep it.</li>
          <li>Object to or restrict certain types of processing, including direct marketing.</li>
          <li>Withdraw consent where processing is based on consent, such as marketing communications or certain cookies.</li>
          <li>Request a copy of your data in a commonly used, machine-readable format where technically feasible.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:info@lapizblue.com" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            info@lapizblue.com
          </a>
          . We may ask you to verify your identity before fulfilling your request.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          If you believe your rights have been violated, you may also have the right to lodge a complaint with your local data protection authority, where applicable.
        </p>

        {/* 10. Marketing communications */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">10. Marketing communications</h2>
        <p className="max-w-3xl leading-relaxed">
          If you subscribe to our newsletter or marketing list, we may send you emails or messages about:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>New products or systems</li>
          <li>Technical updates and training opportunities</li>
          <li>Promotions, events, and company news</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          You can unsubscribe at any time by using the link included in our emails or by contacting us at{" "}
          <a href="mailto:info@lapizblue.com" className="underline decoration-[#1E6BA8]/40 underline-offset-2">
            info@lapizblue.com
          </a>
          . We will then stop sending marketing communications, although we may still contact you about active orders or important service messages.
        </p>

        {/* 11. Children's privacy */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">11. Children's privacy</h2>
        <p className="max-w-3xl leading-relaxed">
          Our Website and services are not directed to children under the age of 13, and we do not knowingly collect personal data from children under 13.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          If you are a parent or guardian and believe that your child has provided us with personal data, please contact us. If we become aware that we have collected such data, we will delete it as soon as reasonably possible.
        </p>

        {/* 12. Security */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">12. Security</h2>
        <p className="max-w-3xl leading-relaxed">
          We take reasonable technical and organisational measures to protect your personal data from loss, misuse, unauthorised access, disclosure, alteration, or destruction. These measures include:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Access controls for staff and systems</li>
          <li>Secure hosting and encryption where appropriate</li>
          <li>Regular monitoring and maintenance of our systems</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security, but we do our best to protect your data.
        </p>

        {/* 13. Links to other websites */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">13. Links to other websites</h2>
        <p className="max-w-3xl leading-relaxed">
          Our Website may contain links to other websites, including brand owners, partners, or distributors. We are not responsible for the privacy practices or content of those external sites.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed">
          We recommend that you read the privacy policy of each website you visit.
        </p>

        {/* 14. Changes to this Privacy Policy */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">14. Changes to this Privacy Policy</h2>
        <p className="max-w-3xl leading-relaxed">
          We may update this Privacy Policy from time to time to reflect:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Changes in our services or internal processes</li>
          <li>Updates to laws and regulations</li>
          <li>Improvements in how we explain our practices</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          When we make changes, we will:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Post the updated Policy on this page, and</li>
          <li>Update the "Last updated" date at the top.</li>
        </ul>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Your continued use of the Website after a new version is posted will be taken as acceptance of the updated Policy.
        </p>

        {/* 15. Contact us */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">15. Contact us</h2>
        <p className="max-w-3xl leading-relaxed">
          If you have any questions, requests, or concerns about this Privacy Policy or how we handle your data, please contact us:
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

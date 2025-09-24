import type { Metadata } from "next";

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
        {/* Heading (matches your design: large, bold, with blue accent on trailing words) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          Privacy Policy{" "}
          <span className="text-[#1E6BA8]">of Lapiz Blue.</span>
        </h1>

        {/* Intro */}
        <p className="mt-6 leading-relaxed max-w-3xl">
          At Lapiz Blue, we respect your privacy. This policy explains what
          personal data we collect, how we use it, and what rights you have when
          you use our website or services.
        </p>

        {/* Who we are */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">Who we are</h2>
        <div className="space-y-1">
          <p>Lapiz Blue General Trading LLC</p>
          <p>Branches in Dubai, Abu Dhabi, and Sharjah</p>
          <p>
            Email:{" "}
            <a
              className="underline decoration-[#1E6BA8] underline-offset-2"
              href="mailto:info@lapizblue.com"
            >
              info@lapizblue.com
            </a>
          </p>
        </div>

        {/* Data we collect */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">Data we collect</h2>
        <p className="mb-3">
          We may collect the following types of information:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Contact details:</strong> name, email, phone number,
            address, company name
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, clicks, time on site,
            device and browser information, IP address, location (city level)
          </li>
          <li>
            <strong>Service data:</strong> messages you send us through forms,
            WhatsApp, or email
          </li>
          <li>
            <strong>Cookies:</strong> small files that help us understand site
            usage and improve your experience
          </li>
        </ul>
        <p className="mt-3">
          You can choose not to share some data, but certain services (like
          quotes or deliveries) may not work without it.
        </p>

        {/* How we use your data */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">How we use your data</h2>
        <p className="mb-3">We use your information to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Provide quotes, deliveries, and after-sales support</li>
          <li>Improve our website and digital services</li>
          <li>Send you requested product information, updates, or offers</li>
          <li>Respond to questions or complaints</li>
          <li>Comply with legal requirements</li>
        </ul>
        <p className="mt-3 font-medium">We never sell your data.</p>

        {/* Processing & storage */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">
          How we process and store data
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Your data is stored securely in our offices and on trusted service
            providers’ systems.
          </li>
          <li>
            Access is limited to authorized staff and partners who help us run
            our services.
          </li>
          <li>
            Data is kept only as long as needed for the purpose it was
            collected, or longer if required by law.
          </li>
        </ul>

        {/* Cookies */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">Cookies and tracking</h2>
        <p className="mb-3">We use cookies and similar tools to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Measure how people use our website</li>
          <li>Improve navigation and design</li>
          <li>Support digital marketing campaigns</li>
        </ul>
        <p className="mt-3">
          You can disable cookies in your browser at any time, though some
          features may not work as expected.
        </p>

        {/* Your rights */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">Your rights</h2>
        <p className="mb-3">
          Under GDPR and UAE privacy standards, you have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access the data we hold about you</li>
          <li>Ask for corrections if data is wrong</li>
          <li>Request deletion of your data</li>
          <li>Limit or object to how we use your data</li>
          <li>Receive a copy of your data in a portable format</li>
          <li>
            Withdraw consent at any time (for example, unsubscribing from
            emails)
          </li>
          <li>File a complaint with your local data authority</li>
        </ul>
        <p className="mt-3">
          To exercise these rights, contact us at{" "}
          <a
            className="underline decoration-[#1E6BA8] underline-offset-2"
            href="mailto:info@lapizblue.com"
          >
            info@lapizblue.com
          </a>
          .
        </p>

        {/* Data sharing */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">Data sharing</h2>
        <p className="mb-3">We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Logistics partners for deliveries</li>
          <li>Technical providers (hosting, IT, CRM, email)</li>
          <li>Legal or regulatory authorities if required by law</li>
        </ul>
        <p className="mt-3">
          All partners follow confidentiality and security rules.
        </p>

        {/* Changes */}
        <h2 className="mt-10 mb-3 text-xl font-semibold">Changes to this policy</h2>
        <p className="mb-1">
          We may update this Privacy Policy from time to time. Any changes will
          be published on this page with the latest update date.
        </p>
        <p className="text-sm text-black/60">Latest update: August 2025</p>
      </section>
    </main>
  );
}


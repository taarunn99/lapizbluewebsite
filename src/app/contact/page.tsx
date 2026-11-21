import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm.client";
import { Toaster } from "@/components/ui/sonner";
import ReachOutSection from "@/components/ReachOutSection.client";
import ContactDetails from "@/components/ContactDetails";
import CareersSection from "@/components/CareersSection.client";

export const metadata: Metadata = {
  title: "Contact Us | Lapiz Blue UAE",
  description:
    "Get in touch with Lapiz Blue. Visit our offices in Dubai, Abu Dhabi & Sharjah or reach us via WhatsApp. Expert support for all your construction material needs.",
  alternates: {
    canonical: "https://www.lapizblue.com/contact",
  },
  openGraph: {
    title: "Contact Us | Lapiz Blue UAE",
    description: "Get in touch with Lapiz Blue. Visit our offices in Dubai, Abu Dhabi & Sharjah or reach us via WhatsApp.",
    url: "https://www.lapizblue.com/contact",
    siteName: "Lapiz Blue",
    images: ["/images/meshgradientbase.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Lapiz Blue UAE",
    description: "Get in touch with Lapiz Blue. Visit our offices in Dubai, Abu Dhabi & Sharjah or reach us via WhatsApp.",
    images: ["/images/meshgradientbase.webp"],
  },
};

export default function ContactPage() {
  return (
    <main className="bg-white text-[#23395B]">
      <Toaster position="top-right" richColors />
      <section id="enquiry" className="relative mx-auto w-full max-w-[1920px] scroll-mt-[75px]">
          <Image
            src="/images/meshgradientbase.webp"
            alt="Multiple ways to reach us for enquiries"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover opacity-90"
          />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 sm:px-8 lg:px-12 py-8 lg:py-10 lg:items-center">
          {/* LEFT */}
          <div className="flex flex-col justify-center lg:pl-[64px] xl:pl-[96px]">
            <div className="flex items-center gap-3 text-[#BFD7EA] md:text-[#406E8E]">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              <span className="label-sh">Send an enquiry</span>
            </div>

            <h1 className="mt-4 max-w-[654px] font-outfit text-white md:text-[#161925] font-semibold leading-[1.05] tracking-[-0.01em] text-3xl sm:text-4xl md:text-[40px] lg:text-[44px]">
              Precision Starts With a Hello.
            </h1>

            <p className="mt-5 max-w-[560px] font-manrope text-[15px] sm:text-base leading-relaxed text-white/90 md:text-[#23395B]">
              Send the bill of quantities, the product list or the job description. The Dubai desk
              replies within one working day with price, stock per branch, delivery date and the
              data sheet for every line. Trade pricing, project pricing and credit accounts for
              contractors, applicators and resellers.
            </p>

            {/* IMPORTANT: associate this checkbox to the form on the right */}
            <label htmlFor="agree" className="mt-6 flex items-center gap-3 text-white md:text-[#334155]">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                form="lapiz-contact"
                required           // ← needed for HTML validity
                className="h-5 w-5 rounded border-white/30 bg-white/10 accent-[#23395B]"
              />
              <span className="text-[15px]">I agree to be contacted about this enquiry and to the <a href="/terms" className="underline underline-offset-2">terms</a>.</span>
            </label>

            <div className="mt-5" />
          </div>

          {/* RIGHT - client form */}
          <ContactForm />
        </div>
      </section>

      {/* REACH OUT SECTION - Animated */}
      <ReachOutSection />

      {/* CONTACT DETAILS SECTION */}
      <ContactDetails />

      {/* CAREERS SECTION - Scroll Expansion */}
      <CareersSection />
    </main>
  );
}


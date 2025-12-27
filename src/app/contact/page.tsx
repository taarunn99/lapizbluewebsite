// import type { Metadata } from "next";
// import Image from "next/image";
// import ContactForm from "../../components/ContactForm.client";

// export const metadata: Metadata = {
//   title: "Contact Us – Lapiz Blue",
//   description:
//     "Reach out for product queries, collaborations, or support. We're here to help.",
//   openGraph: { images: ["/images/meshgradientbase.webp"] },
//   twitter: { card: "summary_large_image" },
// };

// export default function ContactPage() {
//   return (
//     <main className="bg-white text-[#23395B]">
//       {/* Section height is viewport minus 75px navbar; centered 1920px canvas like Figma */}
//       <section className="relative mx-auto w-full max-w-[1920px] min-h-[calc(100svh-75px)]">
//         <Image
//           src="/images/meshgradientbase.webp"
//           alt="Mesh gradient background"
//           fill
//           priority
//           fetchPriority="high"
//           sizes="100vw"
//           className="object-cover opacity-90"
//         />

//         {/* Overlay content */}
//         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 sm:px-8 lg:px-12 py-10">
//           {/* Left static copy — this stays SSR for SEO */}
//           <div className="max-w-[560px]">
//             <h1 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-[#23395B]">
//               Precision Starts With a Hello.
//             </h1>
//             <p className="mt-4 text-[15px] sm:text-base text-[#ffffff]">
//               We’d love to hear from you - whether it’s a product query, a collaboration idea, or just a curious hello.
//               Our team’s always just a message away.
//             </p>

//             {/* The checkbox + CTA is inside the client form (below) but visually appears here.
//                 We keep spacing here so the layout matches Figma. */}
//             <div className="mt-6 h-[28px]" />
//             <div className="mt-5 h-[70px]" />
//           </div>

//           {/* Right side: interactive form (glass card) */}
//           <ContactForm />
//         </div>
//       </section>
//     </main>
//   );
// }
// import type { Metadata } from "next";
// import Image from "next/image";
// import ContactForm from "../../components/ContactForm.client";

// export const metadata: Metadata = {
//   title: "Contact Us – Lapiz Blue",
//   description:
//     "Reach out for product queries, collaborations, or support. We're here to help.",
//   openGraph: { images: ["/images/meshgradientbase.webp"] },
//   twitter: { card: "summary_large_image" },
// };

// export default function ContactPage() {
//   return (
//     <main className="bg-white text-[#23395B]">
//       <section className="relative mx-auto w-full max-w-[1920px] min-h-[calc(100svh-75px)]">
//         <Image
//           src="/images/meshgradientbase.webp"
//           alt="Mesh gradient background"
//           fill
//           priority
//           fetchPriority="high"
//           sizes="100vw"
//           className="object-cover opacity-90"
//         />

//         {/* 2-col canvas, left content vertically centered */}
//         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 sm:px-8 lg:px-12 py-10">
//           {/* LEFT — matches Figma widths/spacing */}
//           <div className="flex flex-col justify-center lg:pl-[64px] xl:pl-[96px]">
//             <h1 className="max-w-[654px] text-[#23395B] font-semibold leading-[1.05] tracking-[-0.01em] text-3xl sm:text-4xl md:text-[32px]">
//               Precision Starts With a Hello.
//             </h1>

//             <p className="mt-4 max-w-[654px] text-[15px] sm:text-base leading-8 text-[#23395B]/90">
//               We’d love to hear from you — whether it’s a product query, a
//               collaboration idea, or just a curious hello. Our team’s always
//               just a message away.
//             </p>

//             {/* Checkbox and CTA live on the left, but submit the right form via form="lapiz-contact" */}
//             <label
//               htmlFor="agree"
//               className="mt-6 flex items-center gap-3 text-[#334155]"
//             >
              
//               <span className="text-[15px]">agree to the boring t&amp;c</span>
//             </label>

//             <div className="mt-5">
              
//             </div>
//           </div>

//           {/* RIGHT — interactive form (glass card) */}
//           <ContactForm />
//         </div>
//       </section>
//     </main>
//   );
// }
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
      <section className="relative mx-auto w-full max-w-[1920px] min-h-[calc(100svh-75px)]">
          <Image
            src="/images/meshgradientbase.webp"
            alt="Multiple ways to reach us for enquiries"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover opacity-90"
          />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 sm:px-8 lg:px-12 py-10">
          {/* LEFT */}
          <div className="flex flex-col justify-center lg:pl-[64px] xl:pl-[96px]">
            <h1 className="max-w-[654px] text-white md:text-[#23395B] font-semibold leading-[1.05] tracking-[-0.01em] text-3xl sm:text-4xl md:text-[32px]">
              Precision Starts With a Hello.
            </h1>

            <p className="mt-4 max-w-[654px] text-[15px] sm:text-base leading-8 text-white/90 md:text-[#23395B]/90">
              We'd love to hear from you - whether it's a product query, a
              collaboration idea, or just a curious hello. Our team's always
              just a message away.
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
              <span className="text-[15px]">agree to the boring t&amp;c</span>
            </label>

            <div className="mt-5" />
          </div>

          {/* RIGHT — client form */}
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


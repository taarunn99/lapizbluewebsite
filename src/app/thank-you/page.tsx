import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Lapiz Blue",
  description: "Thank you for your enquiry. Our experts will get back to you shortly.",
  robots: "noindex, nofollow",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-[calc(100vh-75px)] flex items-center justify-center px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-bold text-[#17212f] mb-4">
          Thank You!
        </h1>

        {/* Subtitle */}
        <p className="font-outfit text-xl sm:text-2xl text-[#17212f]/80 mb-4">
          Your enquiry is with us now.
        </p>

        {/* Body */}
        <p className="font-manrope text-base sm:text-lg text-[#17212f]/70 mb-6 sm:mb-8">
          Our experts will get back to you at the earliest.
        </p>

        {/* Business Flex */}
        <div className="bg-gradient-to-br from-[#161925]/5 to-[#535e8b]/10 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10">
          <p className="font-manrope text-sm sm:text-base text-[#17212f]/80 leading-relaxed">
            As the <span className="font-semibold text-[#17212f]">UAE&apos;s leading supplier</span> of
            world-class construction materials and chemicals, your enquiry is in expert hands.
            We partner with global brands like <span className="font-semibold">Mapei</span>,
            <span className="font-semibold"> Profilpas</span>, and <span className="font-semibold">Laticrete</span> to
            deliver solutions that build excellence.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#161925,#535e8b)] px-8 h-[56px] text-white text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-[10px] border-2 border-[#17212f]/20 bg-white px-8 h-[56px] text-[#17212f] text-lg font-semibold transition-all duration-300 hover:border-[#17212f]/40 hover:scale-105"
          >
            Contact Us Again
          </Link>
          <Link
            href="/brands"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-[10px] border-2 border-[#17212f]/20 bg-white px-8 h-[56px] text-[#17212f] text-lg font-semibold transition-all duration-300 hover:border-[#17212f]/40 hover:scale-105"
          >
            Explore Our Brands
          </Link>
        </div>
      </div>
    </main>
  );
}

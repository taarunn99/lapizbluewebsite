"use client";

import { useState } from "react";
import Image from "next/image";

const faqData = [
  {
    question: "What does Lapiz Blue do?",
    answer:
      "We provide construction chemicals, building materials, and finishing profiles. Key lines include tile adhesives, grouts, waterproofing, epoxy flooring, trims and movement joints, skirting, shower drains, and floor profiles.",
  },
  {
    question: "Why choose Lapiz Blue for Mapei solutions?",
    answer: `At Lapiz Blue, our partnership with Mapei brings world-class expertise, innovation, and sustainability to projects across the UAE and GCC. We combine authentic supply with hands-on technical support so your job is faster, safer, and compliant.

What you get:
• Direct supply from Mapei with 100% authenticity and batch traceability
• Dedicated experts who specify the right system and can consult Mapei specialists when needed
• Deep, ready stock of adhesives, grouts, waterproofing, and more for immediate delivery
• Regional coverage with branches in Dubai, Abu Dhabi, and Sharjah, plus same-day pickup options
• Seamless operations: quick quotes, TDS/SDS on hand, method statements, and reliable after-sales
• Service that stands out backed by smart digital support and clear communication`,
  },
  {
    question: "Why choose Lapiz Blue?",
    answer: `We make building simple and safe. Lapiz Blue brings you real Mapei products and Profilpas profiles, straight from the source. We supply across the UAE and GCC, with branches in Dubai, Abu Dhabi, and Sharjah.
    
What that means for you:
• Real products only. No fakes.
• Friendly experts help you pick the right adhesive, grout, waterproofing, or trim.
• Big stock ready to go, so your site never waits.
• Next-day delivery on orders placed before 3 pm.
• Free delivery for regular customers. Terms and conditions apply.
• 24/7 support when you need help fast.
• Clear guides and short, human explanations you can actually use.

In short, we help you finish better and faster, with gear you can trust.`,
  },
  {
    question: "What brands do you keep?",
    answer:
      "Mapei (adhesives, grout, waterproofing, epoxy flooring, concrete repair) and Profilpas (tile trims, skirting, movement joints, shower drains) — with select partner lines on request across Dubai, Abu Dhabi, and Sharjah.",
  },
  {
    question: "Are you an authorized distributor?",
    answer:
      "Yes — we're an authorized distributor for Mapei and Profilpas in the UAE, supplying genuine, fresh stock with full manufacturer support.",
  },
  {
    question: "Do you provide TDS and SDS?",
    answer:
      "Yes — we share official Technical Data Sheets (TDS) and Safety Data Sheets (SDS) for every product, on demand or with your order.",
  },
  {
    question: "Do you offer trade pricing or credit terms?",
    answer:
      "Yes — trade pricing for verified businesses and project accounts; credit terms available upon approval.",
  },
  {
    question: "Who is Lapiz Blue the best fit for?",
    answer:
      "Contractors, consultants, engineers, developers, facility managers, and retail distributors who need fast, reliable supply and technical backing in the UAE.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Determine font size based on answer length
  const getAnswerFontSize = () => {
    const answerLength = faqData[activeIndex].answer.length;
    // Short answers (< 250 chars): 48px
    // Medium answers (250-500 chars): 36px
    // Long answers (> 500 chars): 28px
    if (answerLength < 250) return "text-[48px] leading-[66px]";
    if (answerLength < 500) return "text-[36px] leading-[50px]";
    return "text-[28px] leading-[40px]";
  };

  return (
    <section className="relative mx-auto w-full max-w-[1920px] min-h-screen bg-white z-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
        {/* LEFT SIDE - FAQ List */}
        <div className="relative flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 lg:py-24">
          {/* Title */}
          <h2 className="font-outfit font-semibold text-[#406E8E] text-5xl sm:text-6xl lg:text-[128px] leading-tight mb-4">
            FAQs
          </h2>

          {/* Subtitle */}
          <p className="font-outfit font-light text-[#23395B] text-lg sm:text-2xl lg:text-[36px] leading-snug mb-8 lg:mb-12 max-w-[661px]">
            Quick answers to what everyone asks about Lapiz Blue.
          </p>

          {/* Divider Line */}
          <div className="w-full max-w-[355px] h-[1px] bg-black mb-8 lg:mb-12" />

          {/* FAQ Items */}
          <div className="flex flex-col gap-4 lg:gap-6 max-w-[640px]">
            {faqData.map((faq, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-4 px-6 py-6 bg-white text-left transition-all ${
                  activeIndex === index
                    ? "shadow-[0px_0px_1px_1px_rgba(0,0,0,0.15)]"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                {/* Dot Indicator */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full ${
                    activeIndex === index ? "bg-[#406E8E]" : "bg-[#8E8E93]"
                  }`}
                />

                {/* Question Text */}
                <span className="flex-1 font-inter text-base leading-6 text-black">
                  {faq.question}
                </span>

                {/* Chevron Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#0088FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Answer Display */}
        <div className="relative flex items-center justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-24 bg-white lg:bg-transparent overflow-hidden">
          {/* Background - Mesh Gradient (only visible on desktop) */}
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src="/images/meshgradientbase.png"
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="50vw"
            />
          </div>

          {/* Question Mark Decorations (25% opacity) - Positioned to not overlap text */}
          <div className="absolute inset-0 hidden lg:block pointer-events-none">
            {/* Question Mark 1 - Top Right area */}
            <div className="absolute top-[5%] right-[8%] w-[220px] h-[340px]">
              <Image
                src="/images/home/homepageimages/originals/questionmark-beige.svg"
                alt=""
                fill
                className="opacity-25 object-contain"
                style={{
                  transform: "rotate(-30deg)"
                }}
              />
            </div>

            {/* Question Mark 2 - Bottom Left area */}
            <div className="absolute bottom-[8%] left-[5%] w-[220px] h-[340px]">
              <Image
                src="/images/home/homepageimages/originals/questionmark-beige.svg"
                alt=""
                fill
                className="opacity-25 object-contain"
                style={{
                  transform: "rotate(30deg)"
                }}
              />
            </div>
          </div>

          {/* Answer Text */}
          <div className="relative z-10 max-w-[740px] flex items-center justify-center h-full">
            <p className={`font-manrope text-[#161925] ${getAnswerFontSize()} text-center whitespace-pre-line`}>
              {faqData[activeIndex].answer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

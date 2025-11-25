"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
}

const moreBrands: Brand[] = [
  {
    name: "Kerakoll",
    logo: "/images/brands/logos/kerakoll.png",
  },
  {
    name: "Pidilite Puma",
    logo: "/images/brands/logos/pidilite-puma.jpg",
  },
  {
    name: "Innobit",
    logo: "/images/brands/logos/innobit.png",
  },
];

export function BrandsCarouselSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % moreBrands.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + moreBrands.length) % moreBrands.length);
  };

  // Calculate visible brands based on screen size
  const getVisibleBrands = () => {
    // On desktop, show 3 brands; on tablet, show 2; on mobile, show 1
    return moreBrands;
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-white flex items-center justify-center px-6 sm:px-8 lg:px-16 py-20"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="font-outfit font-bold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4">
            More Brands. Zero Compromises.
          </h2>
          <div className="w-full h-px bg-[#161925]/20 mt-6"></div>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Carousel Content */}
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {/* Previous Arrow - Hidden on mobile if first item */}
              <button
                onClick={prevSlide}
                className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#406E8E] hover:bg-[#406E8E]/80 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                aria-label="Previous brand"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Brand Display - Mobile: 1, Tablet: 2, Desktop: 3 */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Mobile: Show only current */}
                <div className="sm:hidden">
                  <BrandCard brand={moreBrands[currentIndex]} />
                </div>

                {/* Tablet: Show current and next */}
                <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6 w-full">
                  <BrandCard brand={moreBrands[currentIndex]} />
                  <BrandCard brand={moreBrands[(currentIndex + 1) % moreBrands.length]} />
                </div>

                {/* Desktop: Show all 3 */}
                <div className="hidden lg:grid grid-cols-3 gap-8 w-full">
                  {moreBrands.map((brand, index) => (
                    <BrandCard key={index} brand={brand} />
                  ))}
                </div>
              </div>

              {/* Next Arrow - Hidden on mobile if last item */}
              <button
                onClick={nextSlide}
                className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#406E8E] hover:bg-[#406E8E]/80 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                aria-label="Next brand"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dots Indicator - Mobile/Tablet Only */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {moreBrands.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#406E8E] w-8" : "bg-[#406E8E]/30"
                }`}
                aria-label={`Go to brand ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="relative w-full aspect-[3/2] bg-white flex items-center justify-center p-6 md:p-8">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

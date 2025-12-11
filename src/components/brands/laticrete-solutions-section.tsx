"use client";

import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const solutions = [
  { name: "Swimming Pools", icon: "/images/brands/laticrete/icons/pool.svg" },
  { name: "Wet Areas", icon: "/images/brands/laticrete/icons/wet-areas.svg" },
  { name: "Commercial\nFloors", icon: "/images/brands/laticrete/icons/commercial.svg" },
  { name: "Exterior\nInstallations", icon: "/images/brands/laticrete/icons/exterior.svg" },
  { name: "Heavy\nTraffic Areas", icon: "/images/brands/laticrete/icons/heavy-traffic.svg" },
];

// Fallback icons using inline SVG when custom icons aren't available
const FallbackIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactElement> = {
    "Swimming Pools": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M8 48C12 44 16 48 20 44C24 48 28 44 32 48C36 44 40 48 44 44C48 48 52 44 56 48" stroke="#0072CE" strokeWidth="3" strokeLinecap="round"/>
        <path d="M8 56C12 52 16 56 20 52C24 56 28 52 32 56C36 52 40 56 44 52C48 56 52 52 56 56" stroke="#0072CE" strokeWidth="3" strokeLinecap="round"/>
        <rect x="12" y="16" width="40" height="24" rx="4" stroke="#0072CE" strokeWidth="3"/>
        <path d="M22 28V24M32 28V20M42 28V24" stroke="#0072CE" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    "Wet Areas": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M32 8C32 8 16 24 16 36C16 44.837 23.163 52 32 52C40.837 52 48 44.837 48 36C48 24 32 8 32 8Z" stroke="#0072CE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 40C26.343 40 25 38.657 25 37C25 34 28 31 28 31C28 31 31 34 31 37C31 38.657 29.657 40 28 40Z" fill="#0072CE"/>
        <path d="M38 36C36.343 36 35 34.657 35 33C35 30 38 27 38 27C38 27 41 30 41 33C41 34.657 39.657 36 38 36Z" fill="#0072CE"/>
      </svg>
    ),
    "Commercial\nFloors": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="12" width="48" height="40" stroke="#0072CE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 32H56" stroke="#0072CE" strokeWidth="2"/>
        <path d="M8 42H56" stroke="#0072CE" strokeWidth="2"/>
        <path d="M8 22H56" stroke="#0072CE" strokeWidth="2"/>
        <path d="M20 12V52M32 12V52M44 12V52" stroke="#0072CE" strokeWidth="2"/>
      </svg>
    ),
    "Exterior\nInstallations": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M32 8L8 24V56H56V24L32 8Z" stroke="#0072CE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 56V40H40V56" stroke="#0072CE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="28" r="6" stroke="#0072CE" strokeWidth="3"/>
        <path d="M4 24L32 4L60 24" stroke="#0072CE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "Heavy\nTraffic Areas": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="14" y="20" width="36" height="28" rx="4" stroke="#0072CE" strokeWidth="3"/>
        <circle cx="22" cy="48" r="6" stroke="#0072CE" strokeWidth="3"/>
        <circle cx="42" cy="48" r="6" stroke="#0072CE" strokeWidth="3"/>
        <path d="M14 32H50" stroke="#0072CE" strokeWidth="2"/>
        <path d="M20 12H44L50 20H14L20 12Z" stroke="#0072CE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 20V32" stroke="#0072CE" strokeWidth="2"/>
      </svg>
    ),
  };

  return icons[name] || icons["Swimming Pools"];
};

export function LaticreteSolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-[#0072CE] to-[#005BA3]">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Laticrete Logo */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="bg-white rounded-xl p-4">
            <Image
              src="/images/brands/logos/laticrete-new.webp"
              alt="Laticrete Logo"
              width={180}
              height={60}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6"
          variants={itemVariants}
        >
          <span className="text-white">Proven Solutions for</span>{" "}
          <span className="text-[#B3E0FF]">Demanding Applications</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-center text-white/90 text-base md:text-lg max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed"
          variants={itemVariants}
        >
          Lapiz Blue brings Laticrete&apos;s industry-leading tile and stone installation systems to the UAE.
          From high-performance waterproofing to fast-setting adhesives, our products are engineered
          for the most challenging environments – delivering durability that lasts.
        </motion.p>

        {/* Icons Grid */}
        <motion.div
          className="w-full"
          variants={itemVariants}
        >
          {/* Desktop View - 5 icons in one row */}
          <div className="hidden md:flex justify-center items-start gap-8 lg:gap-12 xl:gap-16">
            {solutions.map((solution) => (
              <div
                key={solution.name}
                className="flex flex-col items-center w-24 lg:w-28 xl:w-32 group cursor-pointer"
              >
                <div className="h-20 lg:h-24 xl:h-28 w-full flex items-end justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white/10 rounded-xl p-3 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                    <FallbackIcon name={solution.name} />
                  </div>
                </div>
                <span className="text-white text-xs lg:text-sm font-medium text-center whitespace-pre-line leading-tight group-hover:text-[#B3E0FF] transition-colors">
                  {solution.name}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile View - 3 + 2 format */}
          <div className="md:hidden">
            {/* First row - 3 icons */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {solutions.slice(0, 3).map((solution) => (
                <div key={solution.name} className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center mb-2 bg-white/10 rounded-lg p-2">
                    <FallbackIcon name={solution.name} />
                  </div>
                  <span className="text-white text-[10px] font-medium text-center leading-tight whitespace-pre-line">
                    {solution.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Second row - 2 icons centered */}
            <div className="flex justify-center gap-8">
              {solutions.slice(3).map((solution) => (
                <div key={solution.name} className="flex flex-col items-center w-20">
                  <div className="w-14 h-14 flex items-center justify-center mb-2 bg-white/10 rounded-lg p-2">
                    <FallbackIcon name={solution.name} />
                  </div>
                  <span className="text-white text-[10px] font-medium text-center leading-tight whitespace-pre-line">
                    {solution.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

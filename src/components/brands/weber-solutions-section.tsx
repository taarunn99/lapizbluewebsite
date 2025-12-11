"use client";

import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const solutions = [
  { name: "Residential", icon: "/images/brands/weber/icons/residential.svg" },
  { name: "Commercial", icon: "/images/brands/weber/icons/commercial.svg" },
  { name: "Industrial", icon: "/images/brands/weber/icons/industrial.svg" },
  { name: "Infrastructure", icon: "/images/brands/weber/icons/infrastructure.svg" },
  { name: "Renovation", icon: "/images/brands/weber/icons/renovation.svg" },
];

// Fallback icons using inline SVG when custom icons aren't available
const FallbackIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactElement> = {
    Residential: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M32 8L6 28V56H26V40H38V56H58V28L32 8Z" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 40H38V56H26V40Z" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Commercial: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="16" width="48" height="40" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 24H24V32H16V24Z" stroke="#FFCC00" strokeWidth="2"/>
        <path d="M28 24H36V32H28V24Z" stroke="#FFCC00" strokeWidth="2"/>
        <path d="M40 24H48V32H40V24Z" stroke="#FFCC00" strokeWidth="2"/>
        <path d="M16 38H24V46H16V38Z" stroke="#FFCC00" strokeWidth="2"/>
        <path d="M28 38H36V46H28V38Z" stroke="#FFCC00" strokeWidth="2"/>
        <path d="M40 38H48V46H40V38Z" stroke="#FFCC00" strokeWidth="2"/>
        <path d="M8 16L32 4L56 16" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Industrial: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M8 56V32L20 24V56" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 56V24L32 32V56" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 56V32L56 20V56" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="40" r="2" fill="#FFCC00"/>
        <circle cx="26" cy="44" r="2" fill="#FFCC00"/>
        <circle cx="44" cy="40" r="2" fill="#FFCC00"/>
      </svg>
    ),
    Infrastructure: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M4 56H60" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round"/>
        <path d="M8 56V36H20V56" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 56V36H56V56" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 36H56" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round"/>
        <path d="M20 36L32 8L44 36" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 36V28M38 36V28" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Renovation: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M12 56V24L32 12L52 24V56H12Z" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 56V42H38V56" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 32H28V38H20V32Z" stroke="#FFCC00" strokeWidth="2"/>
        <path d="M36 32H44V38H36V32Z" stroke="#FFCC00" strokeWidth="2"/>
        <path d="M52 36L60 44M60 44L52 52M60 44H40" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  return icons[name] || icons.Residential;
};

export function WeberSolutionsSection() {
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
    <section ref={ref} className="py-16 md:py-24 bg-[#1A1A1A]">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Weber Logo */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <Image
            src="/images/brands/logos/weber-new.webp"
            alt="Weber Logo"
            width={180}
            height={60}
            className="object-contain"
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6"
          variants={itemVariants}
        >
          <span className="text-[#FFCC00]">Solutions</span>{" "}
          <span className="text-white">for every application</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-center text-gray-300 text-base md:text-lg max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed"
          variants={itemVariants}
        >
          At Lapiz Blue, we bring Saint-Gobain Weber&apos;s complete range of construction solutions to the UAE market.
          From tile adhesives to waterproofing systems, our products are designed to meet the specific demands
          of residential, commercial, and industrial projects across the region.
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
                  <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
                    <FallbackIcon name={solution.name} />
                  </div>
                </div>
                <span className="text-white text-xs lg:text-sm font-medium text-center whitespace-pre-line leading-tight group-hover:text-[#FFCC00] transition-colors">
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
                  <div className="w-14 h-14 flex items-center justify-center mb-2">
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
                  <div className="w-14 h-14 flex items-center justify-center mb-2">
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

"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const solutions = [
  { name: "New Building", icon: "/images/brands/mapei/icons/new-building.svg" },
  { name: "Restoration", icon: "/images/brands/mapei/icons/restoration.svg" },
  { name: "Commercial\nBuilding", icon: "/images/brands/mapei/icons/commercial.svg" },
  { name: "Sports and\nUrban Fitting", icon: "/images/brands/mapei/icons/sports-urban.svg" },
  { name: "Private\nSpaces", icon: "/images/brands/mapei/icons/private-spaces.svg" },
  { name: "Industrial\nInfrastructure", icon: "/images/brands/mapei/icons/industrial.svg" },
  { name: "Marine", icon: "/images/brands/mapei/icons/marine.svg" },
];

export function MapeiSolutionsSection() {
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
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#f8f9fa]">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Mapei Logo */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <Image
            src="/images/brands/logos/mapei-new.png"
            alt="Mapei Logo"
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
          <span className="text-[#0070BB]">Solutions</span>{" "}
          <span className="text-[#23395B]">for every type of site</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-center text-gray-600 text-base md:text-lg max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed"
          variants={itemVariants}
        >
          At Lapiz Blue, we understand that every project comes with its own set of challenges.
          That's why we offer Mapei solutions tailored to specific site conditions and applications –
          ensuring construction professionals across the UAE and GCC get the right product,
          right when they need it.
        </motion.p>

        {/* Icons Grid */}
        <motion.div
          className="w-full"
          variants={itemVariants}
        >
          {/* Desktop View - All 7 icons in one row */}
          <div className="hidden md:flex justify-center items-start gap-6 lg:gap-8 xl:gap-12">
            {solutions.map((solution) => (
              <div
                key={solution.name}
                className="flex flex-col items-center w-24 lg:w-28 xl:w-32"
              >
                <div className="h-20 lg:h-24 xl:h-28 w-full flex items-end justify-center mb-4">
                  <Image
                    src={solution.icon}
                    alt={solution.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain"
                  />
                </div>
                <span className="text-[#23395B] text-xs lg:text-sm font-medium text-center whitespace-pre-line leading-tight">
                  {solution.name}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile View - 4 + 3 format */}
          <div className="md:hidden">
            {/* First row - 4 icons */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {solutions.slice(0, 4).map((solution) => (
                <div key={solution.name} className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center mb-2">
                    <Image
                      src={solution.icon}
                      alt={solution.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[#23395B] text-[10px] font-medium text-center leading-tight whitespace-pre-line">
                    {solution.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Second row - 3 icons centered */}
            <div className="flex justify-center gap-6">
              {solutions.slice(4).map((solution) => (
                <div key={solution.name} className="flex flex-col items-center w-20">
                  <div className="w-14 h-14 flex items-center justify-center mb-2">
                    <Image
                      src={solution.icon}
                      alt={solution.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[#23395B] text-[10px] font-medium text-center leading-tight whitespace-pre-line">
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

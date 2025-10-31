"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function GreenInitiativeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform green layer position based on scroll
  const greenLayerY = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-24 py-20 lg:py-32 overflow-hidden"
    >
      {/* Green Background Layer - Controlled by scroll */}
      <motion.div
        className="absolute inset-0 bg-[#D6E2CC] z-0"
        style={{ y: greenLayerY }}
      />
      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl w-full mx-auto space-y-12 lg:space-y-16">
        {/* Heading */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="font-outfit font-bold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
            Lapiz Blue, Goes Green
          </h2>
          <p className="font-manrope font-semibold text-[#2D5016] text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed">
            At Lapiz Blue, sustainability isn't a trend — it's our responsibility.
          </p>
        </motion.div>

        {/* Main Description */}
        <motion.p
          className="font-manrope font-medium text-[#161925] text-center text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          We prioritize eco-friendly construction materials, partner with manufacturers who share our environmental values, and support projects that reduce environmental impact.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-24 h-1 bg-[#2D5016] mx-auto"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Key Points - Flowing Text */}
        <motion.div
          className="space-y-8 lg:space-y-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.p
            className="font-manrope font-normal text-[#161925] text-center text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            From promoting <span className="font-bold text-[#2D5016]">low-VOC adhesives</span> to encouraging{" "}
            <span className="font-bold text-[#2D5016]">responsible sourcing</span> and{" "}
            <span className="font-bold text-[#2D5016]">waste reduction</span>, we're committed to building a greener, more conscious future.
          </motion.p>

          <motion.p
            className="font-manrope font-semibold text-[#2D5016] text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            One project at a time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ImageAutoSlider } from "./ui/image-auto-slider";

export function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const teamImages = [
    "/images/team/team-1.jpg",
    "/images/team/team-2.jpg",
    "/images/team/team-3.jpg",
    "/images/team/team-4.jpg",
    "/images/team/team-5.jpg",
    "/images/team/team-6.jpg",
  ];

  const teamImages2 = [
    "/images/team/team-7.jpg",
    "/images/team/team-8.jpg",
    "/images/team/team-9.jpg",
    "/images/team/team-10.jpg",
    "/images/team/team-11.jpg",
    "/images/team/team-12.jpg",
  ];

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[60vh] bg-white flex flex-col items-center justify-center py-16 lg:py-24"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-12 lg:mb-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <h2 className="font-outfit font-semibold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-4">
          Our Team
        </h2>
        <p className="font-manrope font-normal text-[#406E8E] text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto">
          The people behind our success — together, building the future.
        </p>
      </motion.div>

      {/* First Image Slider - Right to Left */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <ImageAutoSlider images={teamImages} speed={25} />
      </motion.div>

      {/* White Space */}
      <div className="h-12 lg:h-16" />

      {/* Second Image Slider - Left to Right (Reverse) */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <ImageAutoSlider images={teamImages2} speed={25} reverse={true} />
      </motion.div>
    </section>
  );
}

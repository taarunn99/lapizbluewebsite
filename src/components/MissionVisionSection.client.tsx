"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function MissionVisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#406E8E] via-[#5B8AAE] to-[#BFD7EA]"
    >
      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-24 min-h-screen flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20">
          {/* LEFT: OUR VISION */}
          <motion.div
            className="flex flex-col space-y-6 lg:space-y-8"
            variants={itemVariants}
          >
            {/* Heading */}
            <div className="space-y-3 lg:space-y-4">
              <motion.h2
                className="font-outfit font-semibold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px] leading-tight whitespace-nowrap"
                variants={itemVariants}
              >
                OUR VISION
              </motion.h2>
              <motion.p
                className="font-manrope font-medium text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug"
                variants={itemVariants}
              >
                Crafting Tomorrow, Today.
              </motion.p>
            </div>

            {/* Body Text */}
            <motion.div
              className="space-y-5 lg:space-y-6"
              variants={itemVariants}
            >
              <p className="font-manrope font-normal text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                To be the most trusted and forward-thinking building materials
                partner in the UAE and GCC — known not just for what we supply,
                but how we empower projects to rise higher, last longer, and
                look better.
              </p>
              <p className="font-manrope font-normal text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                At Lapiz Blue, we're not chasing titles — we're earning trust.
              </p>
              <p className="font-manrope font-normal text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                We're driven by a belief that quality isn't a choice — it's a
                responsibility, and that every structure, tile, profile, joint,
                or finish we deliver contributes to a space that's meant to
                endure.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: OUR MISSION */}
          <motion.div
            className="flex flex-col space-y-6 lg:space-y-8"
            variants={itemVariants}
          >
            {/* Heading */}
            <div className="space-y-3 lg:space-y-4">
              <motion.h2
                className="font-outfit font-semibold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px] leading-tight whitespace-nowrap"
                variants={itemVariants}
              >
                OUR MISSION
              </motion.h2>
              <motion.p
                className="font-manrope font-medium text-[#161925] text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug"
                variants={itemVariants}
              >
                Guidance. Quality. Seamless Delivery.
              </motion.p>
            </div>

            {/* Body Text */}
            <motion.div
              className="space-y-5 lg:space-y-6"
              variants={itemVariants}
            >
              <p className="font-manrope font-normal text-[#161925] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                To make sourcing construction materials simpler, faster, and
                more reliable — by offering expert-curated products, proactive
                service, and technical guidance tailored to real-world site
                challenges.
              </p>
              <p className="font-manrope font-normal text-[#161925] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                With active distribution from our stores in Dubai, Abu Dhabi,
                and Sharjah, we're focused on building partnerships, not just
                transactions — so that every order, every profile, and every
                detail adds value where it matters most.
              </p>
              <p className="font-manrope font-normal text-[#161925] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                Our mission is to bridge the gap between complexity and clarity
                in construction supply — with materials that are ready, support
                that's responsive, and solutions that work beyond the shelf.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

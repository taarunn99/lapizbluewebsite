"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function BrandsShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
          <h2 className="font-outfit font-bold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Explore
          </h2>
          <p className="font-manrope font-normal text-[#161925] text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            A curated selection of top-tier building materials from industry-leading brands – chosen for their strength, style, and proven performance across every stage of construction.
          </p>
        </motion.div>

        {/* Content Grid - Mobile: Stack, Desktop: Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="font-manrope font-normal text-[#161925] text-base sm:text-lg md:text-xl leading-relaxed">
              LapizBlue is the UAE's leading authorized distributor of premium construction chemicals and building materials, serving Dubai, Abu Dhabi, and Sharjah with strategically located warehouses in Al Quoz and Mussafah. As official partners of industry-leading brands including Mapei, Profilpas, AkzoNobel, Dulux, and Pneumatic Vacuum Elevators (PVE), we supply high-quality waterproofing solutions, concrete repair systems, expansion joint treatments, luxury tiles from Mosaico+, and comprehensive application tools. Our certified in-house applicators specialize in concrete design flooring, building waterproofing, and crack injection services. With ready stock maintained for bulk quantities and short-notice delivery, we serve construction projects and maintenance companies across the GCC, providing top-tier products with complete installation support and after-sales service.
            </p>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="order-1 lg:order-2 relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/images/brands/brandspageimages/brand-product.jpg"
              alt="Construction products showcase"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

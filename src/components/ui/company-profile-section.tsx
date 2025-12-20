"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ShimmerButton } from "./shimmer-button";

export function CompanyProfileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isMounted, setIsMounted] = useState(false);

  // Only enable scroll tracking after mount (SSR-safe)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform background layer position based on scroll (comes from bottom)
  const backgroundY = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);

  const handleDownload = () => {
    // Open PDF in new tab for viewing/download
    window.open("/documents/lapizblue-company-profile.pdf", "_blank");
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[80vh] lg:min-h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Background Layer - Controlled by scroll */}
      <motion.div
        className="absolute inset-0 z-0"
        style={isMounted ? {
          y: backgroundY,
          backgroundColor: "#406E8E",
        } : {
          y: "100%",
          backgroundColor: "#406E8E",
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Side - Company Profile Preview (Full Image) with Book Hover Effect */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-start"
            style={{ perspective: "1000px" }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              className="relative w-full max-w-[420px] shadow-2xl rounded-lg overflow-hidden cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{
                rotateY: -15,
                rotateX: 5,
                scale: 1.05,
                boxShadow: "25px 25px 50px rgba(0,0,0,0.3), -5px -5px 20px rgba(255,255,255,0.1)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src="/documents/company-profile-preview.png"
                alt="Download the official Lapiz Blue company profile"
                width={1620}
                height={2160}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
                priority
              />
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 pointer-events-none"
                whileHover={{ opacity: 1, x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Heading - Manrope Bold with underline */}
            <div>
              <h2 className="font-manrope font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
                Company Profile
              </h2>
              <div className="w-full h-[2px] bg-white/60 mt-4" />
            </div>

            {/* Description - Manrope Extra Light */}
            <p className="font-manrope font-extralight text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl">
              Discover the complete story of our brands in one place. The Lapiz
              Blue Brand Catalogue features over 25 global names and 5000
              products, ready for your projects.
            </p>

            <p className="font-manrope font-extralight text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl">
              Check it out to find the right systems for your site and connect
              with our team for pricing and support across the UAE.
            </p>

            {/* Shimmer Button - Same style as about page */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <ShimmerButton
                onClick={handleDownload}
                shimmerColor="#87CEEB"
                shimmerSize="0.15em"
                shimmerDuration="2.5s"
                borderRadius="1rem"
                background="#161925"
                className="px-12 py-6 md:px-16 md:py-7 text-base md:text-lg lg:text-xl font-semibold hover:scale-105 transition-transform duration-300"
              >
                <span className="flex items-center gap-4">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Company Profile / Download
                </span>
              </ShimmerButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

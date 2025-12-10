"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BrandInfoSectionProps {
  brandName: string;
  brandDescription: string;
  whyLapizBlueTitle: string;
  whyLapizBlueContent: string;
  accentColor?: string;
}

export function BrandInfoSection({
  brandName,
  brandDescription,
  whyLapizBlueTitle,
  whyLapizBlueContent,
  accentColor = "#23395B",
}: BrandInfoSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Brand Story Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="flex items-start gap-6 md:gap-8">
            {/* Animated Icon */}
            <motion.div
              className="flex-shrink-0 hidden sm:flex"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}10` }}
              >
                <svg
                  className="w-8 h-8 md:w-10 md:h-10"
                  style={{ color: accentColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div
                  className="w-8 h-[2px]"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: accentColor }}
                >
                  About {brandName}
                </span>
              </motion.div>

              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light">
                {brandDescription}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider with animation */}
        <motion.div
          className="relative h-px bg-gray-200 mb-20"
          variants={itemVariants}
        >
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: "30%" } : { width: "0%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Why Lapiz Blue Section */}
        <motion.div variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Title and Icon */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div
                  className="w-8 h-[2px]"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: accentColor }}
                >
                  Partnership
                </span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#23395B] mb-6 leading-tight">
                {whyLapizBlueTitle}
              </h2>

              {/* Animated checkmarks */}
              <div className="space-y-4">
                {[
                  "Authorized Distributor",
                  "Expert Technical Support",
                  "UAE-Wide Coverage",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}15` }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <svg
                        className="w-4 h-4"
                        style={{ color: accentColor }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <span className="text-gray-600 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Content Card */}
            <motion.div
              className="relative"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute -inset-1 rounded-3xl opacity-20 blur-xl"
                style={{ backgroundColor: accentColor }}
              />
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-lg">
                {/* Decorative element */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-5 rounded-bl-full"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="relative">
                  {/* Lapiz Blue logo icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: accentColor }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </motion.div>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {whyLapizBlueContent}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className="mt-8 h-1 rounded-full"
                    style={{ backgroundColor: accentColor }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "40%" } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

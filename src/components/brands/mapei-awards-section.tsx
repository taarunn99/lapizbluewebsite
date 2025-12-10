"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";

const awards = [
  {
    year: "2022",
    text: "Honored with the Service Champions Award in",
    suffix: "for our technical expertise, and product knowledge.",
  },
  {
    year: "2023",
    text: "Recognized as Highest Potential Reseller in",
    suffix: ".",
  },
  {
    year: "2024",
    text: "Proud recipient of the Best Reseller Award in",
    suffix: ", reflecting trusted partnership with Mapei.",
  },
];

export function MapeiAwardsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  useEffect(() => {
    if (isInView && !hasTriggeredConfetti) {
      setHasTriggeredConfetti(true);

      // Trigger confetti burst
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ["#0070BB", "#23395B", "#FFD700", "#FF6B6B", "#4ECDC4", "#BFD7EA"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Initial burst
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
      });

      frame();
    }
  }, [isInView, hasTriggeredConfetti]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Mapei Logo */}
        <motion.div
          className="flex justify-center mb-6"
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

        {/* Horizontal Line */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-12"
          variants={itemVariants}
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left - Trophy Image */}
          <motion.div
            className="flex justify-center md:justify-end"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-md">
              <Image
                src="/images/brands/mapei/trophy-celebration.png"
                alt="Trophy Celebration"
                width={500}
                height={500}
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
          >
            {/* Official Distributor Badge */}
            <motion.div
              className="flex items-start gap-3"
              variants={itemVariants}
            >
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-8 h-8 text-[#0070BB]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#23395B]">
                Official authorised distributor of Mapei
              </h3>
            </motion.div>

            {/* Awards List */}
            {awards.map((award, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 mt-1">
                  {/* Medal Icon */}
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="9" r="6" fill="#FFB800" />
                    <circle cx="12" cy="9" r="4" fill="#FFD54F" />
                    <path
                      d="M8 14L6 22L12 19L18 22L16 14"
                      fill="#E53935"
                    />
                    <path
                      d="M10 14L8 22L12 19"
                      fill="#C62828"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {award.text}{" "}
                  <span className="text-[#0070BB] font-semibold">{award.year}</span>
                  {award.suffix}
                </p>
              </motion.div>
            ))}

            {/* Contact Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-[#23395B] rounded-lg transition-all duration-200 hover:bg-[#1a2a45] hover:shadow-lg hover:scale-105"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

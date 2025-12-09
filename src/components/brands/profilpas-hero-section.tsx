"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProfilpasHeroSectionProps {
  heroAlt: string;
  logo: string;
  brandName: string;
  website?: string;
}

export function ProfilpasHeroSection({
  heroAlt,
  logo,
  brandName,
  website,
}: ProfilpasHeroSectionProps) {
  // Use optimized WebP hero image
  const heroSrc = "/images/brands/profilpas/hero.webp";
  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
      {/* Background Image with subtle zoom animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Brand Logo */}
        <motion.div
          className="mb-6 flex items-center justify-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-xl">
            <Image
              src={logo}
              alt={`${brandName} logo`}
              width={200}
              height={80}
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {brandName}
        </motion.h1>

        <motion.p
          className="max-w-3xl text-lg text-white md:text-xl lg:text-2xl mb-6 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Crafted to last, designed to impress. Profiling excellence across every surface.
        </motion.p>

        {/* Official Website Link */}
        {website && (
          <motion.a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:scale-105 border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            Visit Official Website
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

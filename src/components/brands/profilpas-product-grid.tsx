"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ProductLine {
  slug: string;
  name: string;
  description: string;
}

interface ProfilpasProductGridProps {
  productLines: ProductLine[];
  brandSlug: string;
  brandName: string;
}

// Map product line slugs to their optimized WebP images
const productLineImages: Record<string, string> = {
  "corner-profiles": "/images/brands/profilpas/product-lines/cornerprofiles.webp",
  "decorative-profiles": "/images/brands/profilpas/product-lines/decorativeprofiles.webp",
  "bathroom-profiles": "/images/brands/profilpas/product-lines/bathroomprofiles.webp",
  "flooring-profiles": "/images/brands/profilpas/product-lines/flooringprofiles.webp",
  "movement-and-stairnosing": "/images/brands/profilpas/product-lines/movementandstairnosing.webp",
  "balcony-and-terrace-profiles": "/images/brands/profilpas/product-lines/balconyandterraceprofiles.webp",
  "wooden-laminate-and-lvt-floor-profiles": "/images/brands/profilpas/product-lines/woodenlaminateandlvtfloorprofiles.webp",
  "skirting-boards": "/images/brands/profilpas/product-lines/skirtingboard.webp",
  "prolight-and-tile-trims": "/images/brands/profilpas/product-lines/prolightandtiletrims.webp",
};

export function ProfilpasProductGrid({
  productLines,
  brandSlug,
  brandName,
}: ProfilpasProductGridProps) {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);

  // Only enable scroll tracking after mount (SSR-safe)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll-based line animation
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section ref={ref} className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#395c56] mb-6">
            Profilpas Product Line
          </h2>

          {/* Scroll-animated line */}
          <div ref={lineRef} className="flex justify-center mb-6">
            <motion.div
              className="h-[2px] bg-gradient-to-r from-transparent via-[#395c56] to-transparent"
              style={isMounted ? { width: lineWidth } : { width: "0%" }}
            />
          </div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of {brandName} products
          </p>
        </motion.div>

        {/* Product Lines Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {productLines.map((productLine) => {
            const imageUrl = productLineImages[productLine.slug];

            return (
              <motion.div key={productLine.slug} variants={itemVariants}>
                <Link
                  href={`/brands/${brandSlug}/${productLine.slug}`}
                  className="group relative block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={productLine.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#395c56]/20 to-[#395c56]/40 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-[#395c56]/50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#395c56]/0 group-hover:bg-[#395c56]/10 transition-all duration-300" />
                  </div>

                  {/* Title */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#395c56] group-hover:text-[#2d4a45] transition-colors text-center">
                      {productLine.name}
                    </h3>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#395c56] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

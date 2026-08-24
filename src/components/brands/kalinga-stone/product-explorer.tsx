"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const products = [
  { name: "ELIXIR", slug: "elixir", image: "/images/brands/kalinga-stone/elixir.webp" },
  { name: "QUARTZ", slug: "engineered-quartz", image: "/images/brands/kalinga-stone/quartz.webp" },
  { name: "TERRAZZO", slug: "terrazzo", image: "/images/brands/kalinga-stone/terrazzo.webp" },
  { name: "MARBLE", slug: "engineered-marble", image: "/images/brands/kalinga-stone/marble.webp" },
];

export function KalingaStoneProductExplorer() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-[#FAF9F7] py-16 md:py-24">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm uppercase tracking-widest text-[#C5A572]">
          EXPLORE KALINGA STONE
        </p>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Four premium surface collections - from curated luxury quartz to
          artisan terrazzo
        </p>
      </div>

      {/* Desktop view */}
      <div
        className="mx-auto mt-12 hidden items-center justify-center gap-8 px-4 md:flex"
        style={{ height: 480 }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {products.map((product, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative shrink-0 overflow-hidden"
              style={{
                width: isHovered ? 280 : 180,
                height: isHovered ? 420 : 180,
                borderRadius: isHovered ? 16 : "50%",
                transition:
                  "width 400ms cubic-bezier(0.4, 0, 0.2, 1), height 400ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 300ms ease",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <Link
                href={`/brands/kalinga-stone/${product.slug}`}
                className="relative block h-full cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Name label */}
                <div
                  className="absolute bottom-6 left-0 right-0 text-center transition-opacity duration-300"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  <span className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
                    {product.name}
                  </span>
                  <div className="mx-auto mt-2 h-0.5 w-8 bg-[#C5A572]" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile view */}
      <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-6 px-6 md:hidden">
        {products.map((product, index) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/brands/kalinga-stone/${product.slug}`}
              className="flex flex-col items-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
              <span className="mt-3 text-center text-sm font-medium uppercase tracking-widest text-[#1A3A5C]">
                {product.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Brand {
  name: string;
  logo: string;
  slug: string;
}

const brands: Brand[] = [
  {
    name: "Mapei",
    logo: "/images/brands/logos/mapei-new.png",
    slug: "mapei",
  },
  {
    name: "AkzoNobel",
    logo: "/images/brands/logos/akzonobel-new.webp",
    slug: "akzonobel",
  },
  {
    name: "Profilpas",
    logo: "/images/brands/logos/profilpas-new.webp",
    slug: "profilpas",
  },
  {
    name: "Laticrete",
    logo: "/images/brands/logos/laticrete-new.webp",
    slug: "laticrete",
  },
  {
    name: "Weber Saint-Gobain",
    logo: "/images/brands/logos/weber-new.webp",
    slug: "weber",
  },
  {
    name: "Grani Marmo Classic",
    logo: "/images/brands/logos/grani-marmo.svg",
    slug: "granimarmo-classic",
  },
  {
    name: "Pidilite Puma",
    logo: "/images/brands/logos/pidilite-puma-new.webp",
    slug: "pidilite-puma",
  },
  {
    name: "Fila Surface Care Solutions",
    logo: "/images/brands/logos/fila-new.webp",
    slug: "fila",
  },
  {
    name: "Kerakoll",
    logo: "/images/brands/logos/kerakoll-new.webp",
    slug: "kerakoll",
  },
];

export function BrandsGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
          <h2 className="font-outfit font-bold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4">
            Brands x Partners
          </h2>
          <div className="w-full h-px bg-[#161925]/20 mt-6"></div>
        </motion.div>

        {/* Brands Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {brands.map((brand, index) => (
            <BrandCard
              key={brand.slug}
              brand={brand}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BrandCardProps {
  brand: Brand;
  index: number;
  isInView: boolean;
}

function BrandCard({ brand, index }: BrandCardProps) {
  const isSvg = brand.logo.endsWith('.svg');
  // Load first 6 images eagerly (visible on most screens)
  const isEagerLoad = index < 6;

  const handleClick = () => {
    // Save scroll position before navigating
    sessionStorage.setItem("brandsScrollPosition", String(window.scrollY));
  };

  return (
    <Link href={`/brands/${brand.slug}`} onClick={handleClick}>
      <div
        className="relative w-full aspect-[3/2] bg-white flex items-center justify-center p-6 md:p-8 cursor-pointer group hover:scale-105 transition-transform duration-300"
      >
        {/* Logo */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={isEagerLoad ? "eager" : "lazy"}
            priority={isEagerLoad}
            unoptimized={isSvg}
          />
        </div>
      </div>
    </Link>
  );
}

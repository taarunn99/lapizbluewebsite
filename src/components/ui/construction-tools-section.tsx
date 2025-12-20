"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ConstructionTool {
  name: string;
  slug: string;
  logo: string;
}

const constructionTools: ConstructionTool[] = [
  {
    name: "Montolit",
    slug: "montolit",
    logo: "/images/construction-tools/montolit.png",
  },
  {
    name: "DeWalt",
    slug: "dewalt",
    logo: "/images/construction-tools/dewalt.png",
  },
  {
    name: "Hilti",
    slug: "hilti",
    logo: "/images/construction-tools/hilti.png",
  },
  {
    name: "Peygran",
    slug: "peygran",
    logo: "/images/construction-tools/peygran.png",
  },
  {
    name: "Keiser",
    slug: "keiser",
    logo: "/images/construction-tools/keiser.png",
  },
  {
    name: "Bihui",
    slug: "bihui",
    logo: "/images/construction-tools/bihui.png",
  },
];

export function ConstructionToolsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleToolClick = () => {
    // Save scroll position before navigating
    sessionStorage.setItem("brandsScrollPosition", String(window.scrollY));
  };

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
            Construction Tools & Equipments
          </h2>
          <div className="w-full h-px bg-[#161925]/20 mt-6"></div>
        </motion.div>

        {/* Asymmetric Grid - Exact layout from screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 md:gap-8 auto-rows-fr">
          {/* Montolit - Large, left side, spans 2 rows */}
          <motion.div
            className="lg:col-span-2 lg:row-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.6,
              delay: 0 * 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <Link href={`/tools/${constructionTools[0].slug}`} onClick={handleToolClick}>
              <motion.div
                className="relative w-full h-full min-h-[300px] lg:min-h-[500px] bg-white border-2 border-[#161925]/10 flex items-center justify-center p-8 md:p-12 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={constructionTools[0].logo}
                    alt={`${constructionTools[0].name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* DeWalt - Top middle */}
          <motion.div
            className="lg:col-span-2 lg:row-span-1"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.6,
              delay: 1 * 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <Link href={`/tools/${constructionTools[1].slug}`} onClick={handleToolClick}>
              <motion.div
                className="relative w-full h-full min-h-[200px] lg:min-h-[240px] bg-white border-2 border-[#161925]/10 flex items-center justify-center p-6 md:p-8 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={constructionTools[1].logo}
                    alt={`${constructionTools[1].name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Hilti - Top right */}
          <motion.div
            className="lg:col-span-2 lg:row-span-1"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.6,
              delay: 2 * 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <Link href={`/tools/${constructionTools[2].slug}`} onClick={handleToolClick}>
              <motion.div
                className="relative w-full h-full min-h-[200px] lg:min-h-[240px] bg-white border-2 border-[#161925]/10 flex items-center justify-center p-6 md:p-8 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={constructionTools[2].logo}
                    alt={`${constructionTools[2].name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Peygran - Bottom left (next to Montolit) */}
          <motion.div
            className="lg:col-span-2 lg:row-span-1"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.6,
              delay: 3 * 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <Link href={`/tools/${constructionTools[3].slug}`} onClick={handleToolClick}>
              <motion.div
                className="relative w-full h-full min-h-[200px] lg:min-h-[240px] bg-white border-2 border-[#161925]/10 flex items-center justify-center p-6 md:p-8 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={constructionTools[3].logo}
                    alt={`${constructionTools[3].name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Keiser - Bottom middle */}
          <motion.div
            className="lg:col-span-1 lg:row-span-1"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.6,
              delay: 4 * 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <Link href={`/tools/${constructionTools[4].slug}`} onClick={handleToolClick}>
              <motion.div
                className="relative w-full h-full min-h-[200px] lg:min-h-[240px] bg-white border-2 border-[#161925]/10 flex items-center justify-center p-6 md:p-8 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={constructionTools[4].logo}
                    alt={`${constructionTools[4].name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Bihui - Bottom right */}
          <motion.div
            className="lg:col-span-1 lg:row-span-1"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.6,
              delay: 5 * 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <Link href={`/tools/${constructionTools[5].slug}`} onClick={handleToolClick}>
              <motion.div
                className="relative w-full h-full min-h-[200px] lg:min-h-[240px] bg-white border-2 border-[#161925]/10 flex items-center justify-center p-6 md:p-8 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={constructionTools[5].logo}
                    alt={`${constructionTools[5].name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

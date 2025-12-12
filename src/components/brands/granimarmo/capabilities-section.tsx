"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CapabilityItem } from "@/data/brandConfigs";

// Icons for capabilities without images
const CompassIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" stroke="#C5A572" strokeWidth="2" fill="none" />
    <circle cx="32" cy="32" r="4" fill="#C5A572" />
    <path d="M32 8V16" stroke="#C5A572" strokeWidth="2" />
    <path d="M32 48V56" stroke="#C5A572" strokeWidth="2" />
    <path d="M8 32H16" stroke="#C5A572" strokeWidth="2" />
    <path d="M48 32H56" stroke="#C5A572" strokeWidth="2" />
    <path d="M32 32L20 20" stroke="#C5A572" strokeWidth="2" />
    <path d="M32 32L44 44" stroke="#C5A572" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

const DiamondIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 4L56 24L32 60L8 24L32 4Z" stroke="#C5A572" strokeWidth="2" fill="none" />
    <path d="M8 24H56" stroke="#C5A572" strokeWidth="1.5" />
    <path d="M20 4L16 24L32 60" stroke="#C5A572" strokeWidth="1" strokeOpacity="0.5" />
    <path d="M44 4L48 24L32 60" stroke="#C5A572" strokeWidth="1" strokeOpacity="0.5" />
    <path d="M32 4V24" stroke="#C5A572" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

interface CapabilitiesProps {
  intro: string;
  items: CapabilityItem[];
}

export function GranimarmoCapabilitiesSection({ intro, items }: CapabilitiesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="w-full py-16 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Intro */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-outfit">
            {intro}
          </p>
          <div className="w-24 h-px bg-[#C5A572] mx-auto mt-8" />
        </motion.div>

        {/* Capability Cards */}
        <div className="space-y-16 md:space-y-24">
          {items.map((item, index) => (
            <CapabilityCard
              key={item.title}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CapabilityCardProps {
  item: CapabilityItem;
  index: number;
  isInView: boolean;
}

function CapabilityCard({ item, index, isInView }: CapabilityCardProps) {
  const hasImage = !!item.image;
  const isEven = index % 2 === 0;

  // For items with images, alternate layout
  if (hasImage) {
    return (
      <motion.div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          isEven ? "" : "lg:flex-row-reverse"
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
      >
        {/* Text Content */}
        <div className={`${!isEven ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-[#C5A572]" />
            <span className="text-sm uppercase tracking-widest text-[#C5A572] font-medium font-outfit">
              {item.subtitle}
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-light text-[#161925] mb-6 font-outfit">
            {item.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg font-outfit">
            {item.content}
          </p>
        </div>

        {/* Image */}
        <div className={`${!isEven ? "lg:order-1" : ""}`}>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={item.image!}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // For items without images, show icon
  const Icon = index === 0 ? CompassIcon : DiamondIcon;

  return (
    <motion.div
      className="max-w-3xl mx-auto text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white rounded-full shadow-sm">
          <Icon />
        </div>
      </div>

      {/* Subtitle */}
      <span className="text-sm uppercase tracking-widest text-[#C5A572] font-medium font-outfit">
        {item.subtitle}
      </span>

      {/* Title */}
      <h3 className="text-3xl md:text-4xl font-light text-[#161925] mt-3 mb-6 font-outfit">
        {item.title}
      </h3>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed text-base md:text-lg font-outfit">
        {item.content}
      </p>

      {/* Decorative line */}
      <div className="w-16 h-px bg-[#C5A572] mx-auto mt-8" />
    </motion.div>
  );
}

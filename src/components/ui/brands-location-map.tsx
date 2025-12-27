"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Location {
  name: string;
  position: { top: string; left: string };
  delay: number;
  mapsUrl: string;
  phone: string;
  image: string;
}

const locations: Location[] = [
  {
    name: "Abu Dhabi",
    position: { top: "60%", left: "59%" },
    delay: 0.3,
    mapsUrl: "https://google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/data=!4m2!3m1!1s0x0:0x240c2ef83a9e23d6?sa=X&ved=1t:2428&ictx=111",
    phone: "+971 2 886 7753",
    image: "/images/brands/abudhabi-lapizblue.webp",
  },
  {
    name: "Dubai",
    position: { top: "41%", left: "65%" },
    delay: 0.5,
    mapsUrl: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
    phone: "+971 4 885 5257",
    image: "/images/brands/dubai-lapizblue.webp",
  },
  {
    name: "Sharjah",
    position: { top: "32%", left: "68%" },
    delay: 0.7,
    mapsUrl: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Sharjah+Branch/@25.3492232,55.6497402,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef5f3e6ac46ac73:0x684ebefeb76de0ce!8m2!3d25.3492232!4d55.6497402!16s%2Fg%2F11x7xg6svq?entry=ttu",
    phone: "+971 6 569 5001",
    image: "/images/locations/sharjah-lapizblue.webp",
  },
];

export function BrandsLocationMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden py-16 md:py-20"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-12 md:mb-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <h2 className="font-outfit font-bold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4">
          We&apos;re Everywhere You Build
        </h2>
        <p className="font-manrope font-medium text-[#406E8E] text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Dubai • Abu Dhabi • Sharjah
        </p>
      </motion.div>

      {/* Map Container - Full Width */}
      <motion.div
        className="relative w-full h-[70vh] md:h-[80vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
      >
        {/* Map Image */}
        <div className="relative w-full h-full">
          <Image
            src="/images/brands/uae-map.webp"
            alt="Store locator with branches in major UAE cities"
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>

        {/* Location Pins */}
        {locations.map((location) => (
          <LocationPin
            key={location.name}
            location={location}
            isInView={isInView}
            isActive={activeLocation === location.name}
            onActivate={() => setActiveLocation(location.name)}
            onDeactivate={() => setActiveLocation(null)}
          />
        ))}
      </motion.div>
    </section>
  );
}

interface LocationPinProps {
  location: Location;
  isInView: boolean;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

function LocationPin({ location, isInView, isActive, onActivate, onDeactivate }: LocationPinProps) {
  const { name, position, delay, mapsUrl, phone, image } = location;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    onActivate();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Check if mouse is still within the expanded hover area
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Add padding to keep card visible when moving to it
      const padding = 20;
      if (
        mouseX >= rect.left - padding &&
        mouseX <= rect.right + padding &&
        mouseY >= rect.top - padding &&
        mouseY <= rect.bottom + padding
      ) {
        return; // Don't deactivate if still in padded area
      }
    }
    onDeactivate();
  };

  const handleClick = () => {
    window.open(mapsUrl, "_blank");
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isInView
          ? { scale: 1, opacity: 1 }
          : { scale: 0, opacity: 0 }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      {/* Larger invisible hover area */}
      <div
        className="absolute -inset-8 md:-inset-12 cursor-pointer z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* Pin Icon */}
      <div className="relative flex flex-col items-center pointer-events-none">
        {/* Animated Ping Effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#406E8E] rounded-full opacity-75"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.75, 0, 0.75],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: delay + 0.5,
          }}
        />

        {/* Main Pin */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#406E8E"
          className={`w-8 h-8 md:w-10 md:h-10 relative z-10 drop-shadow-lg transition-transform duration-200 ${isActive ? 'scale-125' : ''}`}
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>

        {/* City Label */}
        <motion.div
          className={`mt-2 px-3 py-1.5 rounded-lg shadow-lg transition-colors duration-200 ${isActive ? 'bg-[#406E8E]' : 'bg-[#161925]'}`}
          initial={{ opacity: 0, y: -5 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
        >
          <p className="font-manrope font-semibold text-xs md:text-sm whitespace-nowrap text-white">
            {name}
          </p>
        </motion.div>
      </div>

      {/* Hover Card - appears above the pin */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 pointer-events-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => onDeactivate()}
        >
          <div
            className="bg-white rounded-xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-shadow duration-200"
            style={{ width: '280px' }}
            onClick={handleClick}
          >
            {/* Image */}
            <div className="relative h-32 w-full overflow-hidden">
              <Image
                src={image}
                alt={`Lapiz Blue ${name} Branch`}
                fill
                className="object-cover object-top"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-manrope font-bold text-[#161925] text-lg mb-1">
                {name} Branch
              </h3>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-[#406E8E] hover:text-[#2d5a7a] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium text-sm">{phone}</span>
              </a>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Click to view on Google Maps
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

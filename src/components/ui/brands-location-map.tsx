"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Location {
  name: string;
  position: { top: string; left: string };
  delay: number;
  mapsUrl: string;
}

const locations: Location[] = [
  {
    name: "Abu Dhabi",
    position: { top: "62%", left: "45%" },
    delay: 0.3,
    mapsUrl: "https://google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/data=!4m2!3m1!1s0x0:0x240c2ef83a9e23d6?sa=X&ved=1t:2428&ictx=111",
  },
  {
    name: "Dubai",
    position: { top: "52%", left: "68%" },
    delay: 0.5,
    mapsUrl: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
  },
  {
    name: "Sharjah",
    position: { top: "46%", left: "70%" },
    delay: 0.7,
    mapsUrl: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Sharjah+Branch/@25.3492232,55.6497402,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef5f3e6ac46ac73:0x684ebefeb76de0ce!8m2!3d25.3492232!4d55.6497402!16s%2Fg%2F11x7xg6svq?entry=ttu",
  },
];

export function BrandsLocationMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
          We're Everywhere You Build
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
            src="/images/brands/uae-map.svg"
            alt="Store locator with branches in major UAE cities"
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>

        {/* Location Pins */}
        {locations.map((location, index) => (
          <LocationPin
            key={location.name}
            name={location.name}
            position={location.position}
            delay={location.delay}
            mapsUrl={location.mapsUrl}
            isInView={isInView}
          />
        ))}
      </motion.div>
    </section>
  );
}

interface LocationPinProps {
  name: string;
  position: { top: string; left: string };
  delay: number;
  mapsUrl: string;
  isInView: boolean;
}

function LocationPin({ name, position, delay, mapsUrl, isInView }: LocationPinProps) {
  const handleClick = () => {
    window.open(mapsUrl, "_blank");
  };

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -100%)",
      }}
      initial={{ scale: 0, y: -20, opacity: 0 }}
      animate={
        isInView
          ? { scale: 1, y: 0, opacity: 1 }
          : { scale: 0, y: -20, opacity: 0 }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      onClick={handleClick}
    >
      {/* Pin Icon */}
      <div className="relative flex flex-col items-center">
        {/* Animated Ping Effect */}
        <motion.div
          className="absolute top-0 w-8 h-8 md:w-10 md:h-10 bg-[#406E8E] rounded-full opacity-75"
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
          className="w-8 h-8 md:w-10 md:h-10 relative z-10 drop-shadow-lg transition-transform group-hover:scale-110"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>

        {/* Label */}
        <motion.div
          className="mt-2 bg-[#161925] text-white px-3 py-1.5 rounded-lg shadow-lg group-hover:bg-[#406E8E] transition-colors"
          initial={{ opacity: 0, y: -5 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
        >
          <p className="font-manrope font-semibold text-xs md:text-sm whitespace-nowrap">
            {name}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

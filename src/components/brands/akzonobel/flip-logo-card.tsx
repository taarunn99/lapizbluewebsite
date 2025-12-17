"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FlipLogoCardProps {
  akzoNobelLogo: string;
  duluxLogo: string;
  className?: string;
}

export function FlipLogoCard({
  akzoNobelLogo,
  duluxLogo,
  className = "",
}: FlipLogoCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run auto-flip when not hovered
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsFlipped((prev) => !prev); // Flip on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: "1000px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - AkzoNobel Logo */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-xl flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={akzoNobelLogo}
            alt="AkzoNobel logo"
            width={200}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Back - Dulux Logo */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-xl flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src={duluxLogo}
            alt="Dulux logo"
            width={200}
            height={80}
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LocationCardProps {
  name: string;
  address: string;
  phone: string;
  image: string;
  mapsUrl: string;
  onClose: () => void;
}

export function LocationCard({
  name,
  address,
  phone,
  image,
  mapsUrl,
  onClose,
}: LocationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      // Calculate distance from cursor to card center
      const distanceX = e.clientX - cardCenterX;
      const distanceY = e.clientY - cardCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Define radius: card width/2 + extra padding (150px buffer)
      const closeRadius = cardRect.width / 2 + 150;

      // Close if cursor is outside the radius
      if (distance > closeRadius) {
        onClose();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [onClose]);

  const handleCardClick = () => {
    window.open(mapsUrl, "_blank");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      onClick={handleBackdropClick}
    >
      {/* Meshgradient backdrop */}
      <div className="absolute inset-0">
        <Image
          src="/images/meshgradientbase.webp"
          alt="Store location marker"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        onClick={handleCardClick}
      >
        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/40">
          {/* Store Image */}
          <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden mb-6 shadow-lg">
            <Image
              src={image}
              alt={`${name} Store`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 500px"
            />
          </div>

          {/* Location Name */}
          <h2 className="text-center font-outfit font-bold text-2xl md:text-3xl text-[#2C2C2C] mb-6">
            {name}, UAE
          </h2>

          {/* Address */}
          <p className="text-center font-manrope font-normal text-base md:text-lg text-[#2C2C2C] leading-relaxed mb-4">
            {address}
          </p>

          {/* Phone */}
          <div className="text-center mb-6">
            <p className="font-manrope font-medium text-sm text-[#406E8E] mb-1">
              Tel No.
            </p>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="font-outfit font-semibold text-xl md:text-2xl text-[#2C2C2C] hover:text-[#406E8E] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {phone}
            </a>
          </div>

          {/* Tap hint */}
          <div className="text-center">
            <p className="text-xs md:text-sm text-[#406E8E]/70 font-manrope">
              Tap card to open in Google Maps
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

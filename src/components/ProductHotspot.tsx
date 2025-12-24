'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300'],
  display: 'swap',
});

interface ProductHotspotProps {
  x: number; // percentage from left
  y: number; // percentage from top
  productName: string;
  productDescription?: string;
  productImage: string;
  href: string;
  cardPosition?: 'left' | 'right' | 'top' | 'bottom'; // where card appears relative to hotspot
}

export default function ProductHotspot({
  x,
  y,
  productName,
  productDescription,
  productImage,
  href,
  cardPosition = 'right',
}: ProductHotspotProps) {
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Close on outside click/tap for mobile
  useEffect(() => {
    if (!isTouchDevice || !isActive) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isTouchDevice, isActive]);

  // Determine card positioning classes based on cardPosition prop
  // On mobile, prefer positioning that stays within viewport
  const getCardPositionClasses = () => {
    // On mobile, calculate safe position based on hotspot location
    // If hotspot is too close to edges, adjust card position
    const isNearLeftEdge = x < 20;
    const isNearRightEdge = x > 80;
    const isNearBottom = y > 75;
    const isNearTop = y < 25;

    // Mobile positioning - avoid bleeding outside viewport
    let mobileTransform = '-translate-x-1/2'; // default: center
    if (isNearLeftEdge) {
      mobileTransform = 'translate-x-0 left-0'; // align to left edge of hotspot
    } else if (isNearRightEdge) {
      mobileTransform = '-translate-x-full right-0'; // align to right edge of hotspot
    }

    const mobilePosition = isNearBottom ? 'bottom-full mb-3' : 'top-full mt-3';
    const mobileClasses = `${mobilePosition} ${isNearLeftEdge || isNearRightEdge ? mobileTransform : 'left-1/2 -translate-x-1/2'}`;

    switch (cardPosition) {
      case 'left':
        return `${mobileClasses} md:left-auto md:translate-x-0 md:right-full md:mr-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:mb-0`;
      case 'right':
        return `${mobileClasses} md:left-full md:ml-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:mb-0`;
      case 'top':
        return `bottom-full mb-3 ${isNearLeftEdge ? 'left-0' : isNearRightEdge ? 'right-0 -translate-x-0' : 'left-1/2 -translate-x-1/2'}`;
      case 'bottom':
        return `top-full mt-3 ${isNearLeftEdge ? 'left-0' : isNearRightEdge ? 'right-0 -translate-x-0' : 'left-1/2 -translate-x-1/2'}`;
      default:
        return `${mobileClasses} md:left-full md:ml-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:mb-0`;
    }
  };

  const handleInteraction = () => {
    if (isTouchDevice) {
      setIsActive(!isActive);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute ${isActive ? 'z-30' : 'z-20'}`}
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => !isTouchDevice && setIsActive(true)}
      onMouseLeave={() => !isTouchDevice && setIsActive(false)}
    >
      {/* Hotspot Icon - smaller on mobile */}
      <button
        onClick={handleInteraction}
        className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[61px] lg:h-[61px] cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
        aria-label={`View ${productName}`}
        aria-expanded={isActive}
      >
        {/* Pulse animation ring for mobile visibility */}
        <span className={`absolute inset-0 rounded-full bg-white/30 ${isActive ? 'animate-ping' : 'animate-pulse'}`} />

        <svg
          viewBox="0 0 61 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <path
            opacity="0.85"
            d="M61 30.5C61 47.3447 47.3447 61 30.5 61C13.6553 61 0 47.3447 0 30.5C0 13.6553 13.6553 0 30.5 0C47.3447 0 61 13.6553 61 30.5Z"
            fill="#161925"
          />
          <path
            opacity="0.9"
            d="M22.12 34.6V30.6H39.76V34.6H22.12ZM28.92 23.36H33V41.8H28.92V23.36Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Hover/Tap Card - smaller on mobile */}
      <Link
        href={href}
        onClick={(e) => {
          // On touch devices, first tap shows card, second tap navigates
          if (isTouchDevice && !isActive) {
            e.preventDefault();
          }
        }}
        className={`absolute ${getCardPositionClasses()} w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] transition-all duration-300 ${
          isActive
            ? 'opacity-100 visible scale-100'
            : 'opacity-0 invisible scale-95 pointer-events-none'
        }`}
      >
        <div
          className={`${manrope.className} bg-[#406e8e] rounded-lg overflow-hidden shadow-xl`}
        >
          {/* Product Image */}
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={productImage}
              alt={productName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
            />
          </div>

          {/* Product Info - more compact on mobile */}
          <div className="p-3 md:p-4">
            <h4 className="text-white font-extralight text-xs sm:text-sm md:text-base leading-snug">
              {productName}
            </h4>
            {productDescription && (
              <p className="text-white/70 font-extralight text-[10px] sm:text-xs md:text-sm mt-1.5 md:mt-2 leading-relaxed line-clamp-3 md:line-clamp-none">
                {productDescription}
              </p>
            )}
            {/* Tap hint for mobile */}
            <p className="text-white/50 text-[10px] mt-2 md:hidden">
              Tap again to view →
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

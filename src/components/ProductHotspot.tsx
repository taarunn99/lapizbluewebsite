'use client';

import { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  // Determine card positioning classes based on cardPosition prop
  const getCardPositionClasses = () => {
    switch (cardPosition) {
      case 'left':
        return 'right-full mr-4 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-4 top-1/2 -translate-y-1/2';
      case 'top':
        return 'bottom-full mb-4 left-1/2 -translate-x-1/2';
      case 'bottom':
        return 'top-full mt-4 left-1/2 -translate-x-1/2';
      default:
        return 'left-full ml-4 top-1/2 -translate-y-1/2';
    }
  };

  return (
    <div
      className="absolute z-20"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hotspot Icon */}
      <button
        className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[61px] lg:h-[61px] cursor-pointer transition-transform duration-300 hover:scale-110"
        aria-label={`View ${productName}`}
      >
        <svg
          viewBox="0 0 61 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            opacity="0.8"
            d="M61 30.5C61 47.3447 47.3447 61 30.5 61C13.6553 61 0 47.3447 0 30.5C0 13.6553 13.6553 0 30.5 0C47.3447 0 61 13.6553 61 30.5Z"
            fill="#161925"
          />
          <path
            opacity="0.8"
            d="M22.12 34.6V30.6H39.76V34.6H22.12ZM28.92 23.36H33V41.8H28.92V23.36Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Hover Card */}
      <Link
        href={href}
        className={`absolute ${getCardPositionClasses()} w-[200px] md:w-[240px] lg:w-[280px] transition-all duration-300 ${
          isHovered
            ? 'opacity-100 visible scale-100'
            : 'opacity-0 invisible scale-95'
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
              sizes="280px"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h4 className="text-white font-extralight text-sm md:text-base leading-snug">
              {productName}
            </h4>
            {productDescription && (
              <p className="text-white/70 font-extralight text-xs md:text-sm mt-2 leading-relaxed">
                {productDescription}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

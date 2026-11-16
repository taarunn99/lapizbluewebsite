'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const cardRef = useRef<HTMLAnchorElement>(null);
  // Horizontal correction, in px, applied only when the card would otherwise
  // cross the edge of the screen. Zero on every layout that already fits, so
  // existing placement is untouched.
  const [shift, setShift] = useState(0);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Keep the card on screen.
  //
  // The placement below picks a side from percentage thresholds, but the card
  // is a fixed width, so on a narrow screen a card anchored near an edge can
  // still spill past it. That spill widens the document and shows as a
  // horizontal bleed even when the card is invisible, because the inactive
  // state only fades and scales it, which still occupies layout.
  //
  // So measure the real box and nudge it back inside. Tailwind v4 drives its
  // own offsets through the standalone `translate` property, so writing
  // `transform` here composes with the placement instead of overriding it.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const GUTTER = 12;

    const measure = () => {
      setShift((prev) => {
        const rect = el.getBoundingClientRect();
        // The inactive card is scaled to 95%, so the painted box is smaller
        // than the box that drives layout. Undo the scale about the centre,
        // which is where the scale originates, to get the layout box back.
        const scale = parseFloat(getComputedStyle(el).scale) || 1;
        const centre = rect.left + rect.width / 2;
        const width = rect.width / scale;
        // Subtract the shift already applied, so repeated runs settle instead
        // of chasing their own correction.
        const left = centre - width / 2 - prev;
        const right = centre + width / 2 - prev;
        const vw = document.documentElement.clientWidth;

        let next = 0;
        if (width > vw - GUTTER * 2) next = GUTTER - left; // wider than the screen, pin left
        else if (left < GUTTER) next = GUTTER - left;
        else if (right > vw - GUTTER) next = vw - GUTTER - right;

        return Math.abs(next - prev) < 0.5 ? prev : next;
      });
    };

    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
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
        return `${mobileClasses} md:left-auto md:translate-x-0 md:right-full md:mr-4 md:top-full md:mt-2 md:bottom-auto md:mb-0`;
      case 'right':
        return `${mobileClasses} md:left-full md:ml-4 md:top-full md:mt-2 md:bottom-auto md:mb-0`;
      case 'top':
        return `bottom-full mb-4 ${isNearLeftEdge ? 'left-0' : isNearRightEdge ? 'right-0 -translate-x-0' : 'left-1/2 -translate-x-1/2'}`;
      case 'bottom':
        return `top-full mt-4 ${isNearLeftEdge ? 'left-0' : isNearRightEdge ? 'right-0 -translate-x-0' : 'left-1/2 -translate-x-1/2'}`;
      default:
        return `${mobileClasses} md:left-full md:ml-4 md:top-full md:mt-2 md:bottom-auto md:mb-0`;
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
        className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-[61px] lg:h-[61px] cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
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
        ref={cardRef}
        style={shift ? { transform: `translateX(${shift}px)` } : undefined}
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
          className={`font-manrope bg-[#406e8e] rounded-lg overflow-hidden shadow-xl`}
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
              <p className="text-white/90 font-extralight text-[10px] sm:text-xs md:text-sm mt-1.5 md:mt-2 leading-relaxed line-clamp-3 md:line-clamp-none">
                {productDescription}
              </p>
            )}
            {/* Tap hint for mobile */}
            <p className="text-white/80 text-[10px] mt-2 md:hidden">
              Tap again to view →
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

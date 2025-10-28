// src/components/HeroCtas.client.tsx
"use client";

import Link from "next/link";

export default function HeroCtas() {
  return (
    <div className="absolute z-10 top-[38%]
                    left-1/2 -translate-x-1/2 md:left-auto md:right-[5%] md:translate-x-0
                    flex flex-row items-center justify-center md:justify-end gap-3
                    w-[90%] md:w-auto px-4 md:px-0">

      {/* EXPLORE BRANDS - Normal: gradient 180deg, Hover: gradient 182.54deg */}
      <Link
        href="/brands"
        className="flex items-center justify-center rounded-[10px]
                   text-white font-manrope text-center
                   transition-all duration-200 ease-out
                   bg-gradient-to-b from-[#110F11] to-[#131313]
                   hover:bg-gradient-to-b hover:from-[#110F11] hover:to-[#23395B]
                   hover:scale-[1.02]"
        style={{
          width: 'clamp(140px, 14vw, 200px)',
          height: 'clamp(45px, 5vw, 70px)',
          opacity: 0.7,
          fontSize: 'clamp(0.8rem, 1.4vw, 1.25rem)',
          textShadow: '0px 1px 4px rgba(12, 12, 13, 0.05)'
        }}
      >
        Explore Brands
      </Link>

      {/* VIEW STORIES - Normal: gradient 180deg (matches non-hover state) */}
      <Link
        href="/blog"
        className="flex items-center justify-center rounded-[10px]
                   text-white font-manrope text-center
                   transition-all duration-200 ease-out
                   bg-gradient-to-b from-[#110F11] to-[#131313]
                   hover:bg-gradient-to-b hover:from-[#110F11] hover:to-[#23395B]
                   hover:scale-[1.02]"
        style={{
          width: 'clamp(140px, 14vw, 200px)',
          height: 'clamp(45px, 5vw, 70px)',
          opacity: 0.7,
          fontSize: 'clamp(0.8rem, 1.4vw, 1.25rem)'
        }}
      >
        View Stories
      </Link>
    </div>
  );
}


// src/components/HeroCtas.client.tsx
"use client";

import Link from "next/link";

const baseBtn =
  "inline-flex items-center justify-center px-6 py-3 rounded-[10px] " +
  "text-white text-base font-outfit font-normal " +
  "bg-[#110f11]/70 " +
  "transition-all duration-150 ease-out " +
  "outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 " +
  "hover:scale-[1.02] hover:bg-[linear-gradient(180deg,#110f11_0%,#23395b_100%)]";

export default function HeroCtas() {
  return (
    <div className="absolute z-10 top-[42%] sm:top-[48%] lg:top-[36%] left-1/2 lg:left-auto lg:right-[5%]
                    -translate-x-1/2 lg:translate-x-0
                    flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
      {/* EXPLORE BRANDS */}
      <Link
        href="/brands"
        className={baseBtn}
      >
        <span className="whitespace-nowrap">
          Explore Brands
        </span>
      </Link>

      {/* VIEW STORIES */}
      <Link
        href="/blog"
        className={baseBtn}
      >
        <span className="whitespace-nowrap">
          View Stories
        </span>
      </Link>
    </div>
  );
}


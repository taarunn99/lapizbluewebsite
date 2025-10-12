// src/components/HeroCtas.client.tsx
"use client";

import Link from "next/link";

const baseBtn =
  "relative isolate block w-[249px] h-[85px] rounded-[14px] " +
  "text-white text-3xl font-plus-jakarta-sans leading-[85px] " +
  "text-center select-none " +
  // default dark pill background (Figma)
  "bg-[linear-gradient(180deg,#110f11_0%,#131313_100%)] " +
  // soft bottom shadow
  "shadow-[0_10px_24px_rgba(0,0,0,0.35)] " +
  // subtle inner highlight at top
  "before:content-[''] before:absolute before:inset-x-1 before:top-1 before:h-[2px] before:rounded-full before:bg-white/10 " +
  // focus
  "outline-none focus-visible:ring-2 focus-visible:ring-white/40";

export default function HeroCtas() {
  return (
    <>
      {/* EXPLORE BRANDS — blue on hover */}
      <div className="absolute top-[400px] right-[450px]">
        <Link
          href="/brands"
          className={
            baseBtn +
            " transition-all duration-300 " +
            // hover → blue gradient pill (your Figma “Brands page” effect)
            "hover:bg-[linear-gradient(182.54deg,#110f11_0%,#23395b_100%)] " +
            "hover:shadow-[0_14px_28px_rgba(35,57,91,0.45)]"
          }
        >
          <span className="relative z-10 [text-shadow:0_1px_4px_rgba(12,12,13,0.25)]">
            Explore Brands
          </span>
        </Link>
      </div>

      {/* VIEW STORIES — stays dark; just lifts a bit on hover */}
      <div className="absolute top-[397px] right-[146px]">
        <Link
          href="/blog"
          className={
            baseBtn +
            " transition-all duration-300 " +
            "hover:translate-y-[-2px] hover:shadow-[0_14px_28px_rgba(0,0,0,0.45)]"
          }
        >
          <span className="relative z-10 [text-shadow:0_1px_4px_rgba(12,12,13,0.25)]">
            View Stories
          </span>
        </Link>
      </div>
    </>
  );
}


"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ReachOutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    let lastProgress = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Cancel any pending RAF
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Use RAF for smooth updates
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;

        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress (0 to 1)
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // Progress from 0 (bottom of viewport) to 1 (top of viewport)
        const rawProgress = Math.max(
          0,
          Math.min(
            1,
            (windowHeight - sectionTop) / (windowHeight + sectionHeight)
          )
        );

        // Smooth interpolation to reduce jank
        const smoothedProgress = lastProgress + (rawProgress - lastProgress) * 0.15;
        lastProgress = smoothedProgress;

        setScrollProgress(smoothedProgress);
      });
    };

    handleScroll(); // Initial calculation
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Image moves from bottom (showing bottom of skyline) to top (showing top of skyline)
  // translateY goes from +20% (bottom) to -10% (top)
  const imageTranslateY = 20 - scrollProgress * 30;

  // Text moves from top to center
  // translateY goes from -30% to 0%
  const textTranslateY = -30 + scrollProgress * 30;

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-[1920px] mx-auto h-screen overflow-hidden bg-white"
    >
      {/* Dubai Skyline Background - Moves Up */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: `translate3d(0, ${imageTranslateY}%, 0)`,
          willChange: "transform",
        }}
      >
        <Image
          src="/images/contactus/contactuspageimages/reach-out-1920.png"
          alt="Reach out background"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
          loading="lazy"
          priority={false}
        />
      </div>

      {/* REACH OUT Text - Moves Down */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 will-change-transform"
        style={{
          transform: `translate3d(0, ${textTranslateY}%, 0)`,
          willChange: "transform",
        }}
      >
        <div className="flex items-center justify-center w-full gap-16 sm:gap-24 md:gap-32 lg:gap-48 xl:gap-64 px-4">
          <h2 className="font-outfit font-semibold text-[#23395B] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[128px] leading-none -ml-8 sm:-ml-12 md:-ml-16 lg:-ml-24 xl:-ml-32">
            REACH
          </h2>
          <h2 className="font-outfit font-semibold text-[#23395B] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[128px] leading-none">
            OUT
          </h2>
        </div>
      </div>
    </section>
  );
}

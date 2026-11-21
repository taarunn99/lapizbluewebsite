"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * REACH OUT: the big bold words sit still in the sky while the skyline rises
 * under them on scroll and a band of clouds drifts left to right without
 * end. The clouds are one wide photograph laid four times, every second copy
 * mirrored so the seams never show, carried by a CSS keyframe; reduced
 * motion holds them still.
 */
export default function ReachOutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let rafId = 0;
    let lastProgress = 0;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const raw = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        lastProgress = lastProgress + (raw - lastProgress) * 0.15;
        setScrollProgress(lastProgress);
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Skyline rises from +20% to -10%; the words settle from -30% to 0.
  const imageTranslateY = 20 - scrollProgress * 30;
  const textTranslateY = -30 + scrollProgress * 30;

  return (
    <section ref={sectionRef} className="relative mx-auto h-screen w-full max-w-[1920px] overflow-hidden bg-white">
      {/* Clouds, drifting left to right for as long as the page is open */}
      <div className="reach-clouds pointer-events-none absolute inset-x-0 top-[6%] h-[46%] opacity-90" aria-hidden="true">
        <motion.div
          className="flex h-full w-[400%]"
          animate={reduced ? { x: "-25%" } : { x: ["-50%", "0%"] }}
          transition={reduced ? { duration: 0 } : { duration: 140, ease: "linear", repeat: Infinity }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative h-full w-1/4" style={{ transform: i % 2 ? "scaleX(-1)" : undefined }}>
              <Image src="/images/contactus/contactuspageimages/clouds-1920.webp" alt="Clouds drifting over the Dubai skyline" fill sizes="100vw" className="object-cover object-bottom" loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dubai skyline, cut out on transparency, rising on scroll */}
      <div className="absolute inset-0 h-full w-full will-change-transform" style={{ transform: `translate3d(0, ${imageTranslateY}%, 0)` }}>
        <Image
          src="/images/contactus/contactuspageimages/skyline-cut-3840.webp"
          alt="The Dubai skyline, where Lapiz Blue supplies construction chemicals to site"
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          loading="lazy"
          priority={false}
        />
      </div>

      {/* REACH OUT, unchanged */}
      <div className="absolute inset-0 z-10 flex items-center justify-center will-change-transform" style={{ transform: `translate3d(0, ${textTranslateY}%, 0)` }}>
        <div className="flex w-full items-center justify-center gap-16 px-4 sm:gap-24 md:gap-32 lg:gap-48 xl:gap-64">
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

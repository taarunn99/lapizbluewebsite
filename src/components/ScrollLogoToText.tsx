// src/components/ScrollLogoToText.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ScrollLogoToText() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Skip animation for reduced motion preference
    if (prefersReducedMotion) return;

    let ctx: { revert: () => void } | null = null;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Initial states - use only GPU-accelerated properties (transform, opacity)
        gsap.set('.lb-logo', {
          opacity: 1,
          scale: 1,
          transformOrigin: '50% 50%'
        });
        gsap.set('.lb-text', {
          opacity: 0,
          y: 30,
          visibility: 'hidden'
        });
        gsap.set('.lb-heading', {
          opacity: 1,
          y: 0
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current!,
            start: 'top top',
            end: '+=200vh', // Reduced from 260vh for snappier feel
            scrub: 0.8, // Reduced from 1.5 for faster response
            pin: true,
            anticipatePin: 1, // Helps prevent jump on pin
            fastScrollEnd: true, // Better handling of fast scrolls
            preventOverlaps: true
          }
        });

        // Animation timeline - using ONLY transform and opacity (GPU-accelerated)
        tl.to('.lb-logo', {
          scale: 2.5, // Slightly reduced for performance
          ease: 'none',
          duration: 1.0
        }, 0)
          .to('.lb-logo', {
            opacity: 0,
            duration: 0.4,
            ease: 'power1.out'
          }, 0.7)
          .to('.lb-heading', {
            opacity: 0,
            y: -15,
            duration: 0.3,
            ease: 'power1.out'
          }, 0.75)
          .set('.lb-text', {
            visibility: 'visible'
          }, 0.8)
          .to('.lb-text', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          }, 0.8);
      }, stageRef);
    };

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [prefersReducedMotion]);

  // Reduced motion fallback - show text immediately
  if (prefersReducedMotion) {
    return (
      <section ref={stageRef} className="relative bg-white text-black">
        <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-black uppercase tracking-tight text-center mb-6">
            Building Materials & Construction Chemicals.
          </h1>
          <p className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-neutral-700 text-center">
            <span>Lapiz Blue</span> is a UAE supplier and authorized distributor for Mapei, Laticrete, Weber, Profilpas, AkzoNobel Dulux, Granimarmo, Pidilite Puma, FILA, Kerakoll, Montolit, DeWalt, Hilti, and Bihui.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={stageRef}
      className="relative bg-white text-black"
      style={{
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <p
          className="lb-heading text-center text-xl sm:text-2xl md:text-3xl font-medium mb-4 font-horizon gpu-layer"
          style={{ color: '#406e8e' }}
        >
          Your search for all premium construction chemicals, ends here.
        </p>

        <div
          className="lb-logo mt-2 z-20 gpu-layer"
          style={{
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
          <div className="relative w-[48vw] max-w-[620px] aspect-[3/1]">
            <Image
              src="/logos/lapizbluelogodarkblue.svg"
              alt="Lapiz Blue logo animation"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 48vw, (max-width: 1024px) 48vw, 620px"
              priority
            />
          </div>
        </div>

        <div
          className="lb-text absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 text-center gpu-layer"
          style={{
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
          {/* Decorative elements - simplified for performance */}
          <div
            className="absolute top-1/4 left-4 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-[#406e8e]/20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-1/4 right-4 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-b-2 border-[#406e8e]/20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-full">
            <h1 className="text-[5.5vw] leading-[1.1] font-black uppercase tracking-[-0.02em] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[3vw] mb-2 px-2 break-words">
              Building Materials & Construction Chemicals.
            </h1>

            {/* Decorative underline accent */}
            <div
              className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-[#406e8e]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <p
              className="mt-8 max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-neutral-700 px-2"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <span itemProp="name">Lapiz Blue</span> is a <span itemProp="areaServed">UAE</span> supplier and authorized distributor for <span itemProp="brand">Mapei</span>, <span itemProp="brand">Laticrete</span>, <span itemProp="brand">Weber</span>, <span itemProp="brand">Profilpas</span>, <span itemProp="brand">AkzoNobel Dulux</span>, <span itemProp="brand">Granimarmo</span>, <span itemProp="brand">Pidilite Puma</span>, <span itemProp="brand">FILA</span>, <span itemProp="brand">Kerakoll</span>, <span itemProp="brand">Montolit</span>, <span itemProp="brand">DeWalt</span>, <span itemProp="brand">Hilti</span>, and <span itemProp="brand">Bihui</span>, serving <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="addressLocality">Dubai</span>, <span itemProp="addressLocality">Abu Dhabi</span>, <span itemProp="addressLocality">Sharjah</span>, and <span itemProp="addressLocality">Al Sajaa</span></span>. We stock premium construction chemicals, building materials, and construction tools including <strong>waterproofing</strong>, <strong>tile adhesives and grout</strong>, <strong>epoxy flooring</strong>, <strong>concrete repair systems</strong>, and <strong>tile trims and profiles</strong>. Expect ready stock, fast dispatch from Al Quoz, Mussafah 40, and Al Sajaa, in-house applicators & technical teams for installation and repairs, official TDS and SDS on request, trade pricing, and competitive pricing with even better services for our customers. Your single source for reliable materials, technical support, and on-time delivery in the UAE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/ScrollLogoToText.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollLogoToText() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.lb-logo', { opacity: 1, scale: 1, transformOrigin: '50% 50%' });
      gsap.set('.lb-text', { opacity: 0, y: 20, filter: 'blur(6px)' });
      gsap.set('.lb-heading', { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current!,
          start: 'top top',
          end: '+=260vh',
          scrub: 1.5,
          pin: true
        }
      });

      tl.to('.lb-logo', { scale: 2.8, ease: 'none', duration: 1.0 }, 0)
        .to('.lb-logo', { opacity: 0, duration: 0.45, ease: 'power1.out' }, 0.75)
        // fade heading away BEFORE text shows
        .to('.lb-heading', { opacity: 0, y: -10, duration: 0.35, ease: 'power1.out' }, 0.85)
        .to('.lb-text', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' }, 0.9);
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={stageRef} className="relative bg-white text-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <p className="lb-heading text-center text-xl sm:text-2xl md:text-3xl font-medium mb-4 font-horizon" style={{ color: '#406e8e' }}>
          Your search for all premium construction chemicals, end here.
        </p>

        <div className="lb-logo mt-2 will-change-transform z-20">
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

        <div className="lb-text absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 text-center">
          {/* Decorative elements - subtle and minimal */}
          <div className="absolute top-1/4 left-4 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-[#406e8e]/20 opacity-0 lb-text pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-4 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-b-2 border-[#406e8e]/20 opacity-0 lb-text pointer-events-none"></div>
          <div className="absolute top-1/3 right-8 sm:right-12 w-2 h-2 bg-[#406e8e]/30 rounded-full opacity-0 lb-text pointer-events-none"></div>
          <div className="absolute bottom-1/3 left-8 sm:left-12 w-2 h-2 bg-[#406e8e]/30 rounded-full opacity-0 lb-text pointer-events-none"></div>

          <div className="relative z-10 max-w-full">
            <h1 className="text-[5.5vw] leading-[1.1] font-black uppercase tracking-[-0.02em] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[3vw] mb-2 px-2 break-words">
              Building Materials & Construction Chemicals.
            </h1>

            {/* Decorative underline accent */}
            <div className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-[#406e8e]/40 to-transparent pointer-events-none"></div>

            <p className="mt-8 max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-neutral-700 px-2" itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">Lapiz Blue</span> is a <span itemProp="areaServed">UAE</span> supplier and authorized distributor for <span itemProp="brand">Mapei</span>, <span itemProp="brand">Profilpas</span>, <span itemProp="brand">AkzoNobel Dulux</span>, and <span itemProp="brand">Forbo</span>, serving <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="addressLocality">Dubai</span>, <span itemProp="addressLocality">Abu Dhabi</span>, and <span itemProp="addressLocality">Sharjah</span></span>. We stock premium construction chemicals and building materials including <strong>waterproofing</strong>, <strong>tile adhesives and grout</strong>, <strong>epoxy flooring</strong>, <strong>concrete repair systems</strong>, and <strong>tile trims and profiles</strong>, plus Pneumatic Vacuum Elevators. Expect ready stock, fast dispatch from Al Quoz and Mussafah 40, certified applicator tie-ups for installation and repairs, official TDS and SDS on request, and trade pricing with credit terms for approved accounts. Your single source for reliable materials, technical support, and on-time delivery in the UAE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


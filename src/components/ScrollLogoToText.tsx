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
      gsap.set('.lb-logo', { opacity: 1, scale: 1 });
      gsap.set('.lb-text', { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current!,
          start: 'top top',
          end: '+=120vh',
          scrub: 1,
          pin: true,
        },
      });

      tl.to('.lb-logo', { opacity: 0, scale: 0.9, duration: 0.6 }, 0)
        .to('.lb-text', { opacity: 1, y: 0, duration: 0.6 }, 0.15);
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={stageRef} className="relative min-h-[120vh] bg-white text-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Layer 1 - Lapiz Blue logo on white */}
        <div className="lb-logo absolute inset-0 flex items-center justify-center">
          <div className="relative w-[56vw] max-w-[720px] aspect-[3/1]">
            <Image
              src="/logos/lapizbluelogodarkblue.svg"
              alt="Lapiz Blue"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Layer 2 - Reveal text */}
        <div className="lb-text px-6 text-center">
          <h1 className="text-[12vw] leading-[0.9] font-black uppercase tracking-[-0.02em] sm:text-[10vw] md:text-[9vw]">
            Lorem Ipsum
          </h1>
          <h2 className="mt-2 text-[12vw] leading-[0.9] font-black uppercase tracking-[-0.02em] sm:text-[10vw] md:text-[9vw]">
            Dolor Sit
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-neutral-600">
            Placeholder copy - change whenever you decide.
          </p>
        </div>
      </div>
    </section>
  );
}

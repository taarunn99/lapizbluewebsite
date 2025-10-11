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
        <p className="lb-heading text-center text-xl sm:text-2xl md:text-3xl font-medium text-neutral-700 mb-4">
          Your main heading goes here
        </p>

        <div className="lb-logo mt-2 will-change-transform z-20">
          <div className="relative w-[48vw] max-w-[620px] aspect-[3/1]">
            <Image
              src="/logos/lapizbluelogodarkblue.svg"
              alt="Lapiz Blue"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="lb-text pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
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


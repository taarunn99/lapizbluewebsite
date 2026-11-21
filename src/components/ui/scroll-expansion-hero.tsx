'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * The careers opener on the contact page.
 *
 * The old version hijacked the wheel, locked the page while a state machine
 * decided whether the picture had expanded, and once it let go there was no
 * way back. This one is driven by the real scroll position: a 100vh stage
 * pinned inside a tall track, the picture growing from a card to the full
 * frame as the track scrolls through, the title parting to either side. Scroll
 * up and it folds back exactly the way it opened. The form is ordinary content
 * under the track, so it is always reachable, and the button on the stage
 * scrolls straight to it. Under reduced motion, and on phones, the stage is a
 * static header with the picture already open.
 */

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({ mediaSrc, bgImageSrc, title, subtitle, tagline, scrollToExpand, children }: ScrollExpandMediaProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  // 0 at the top of the track, 1 once the picture is fully open.
  const width = useTransform(scrollYProgress, [0, 1], ['min(320px, 80vw)', 'min(1200px, 94vw)']);
  const height = useTransform(scrollYProgress, [0, 1], ['36vh', '54vh']);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 16]);
  const shade = useTransform(scrollYProgress, [0, 1], [0.45, 0.15]);
  const bg = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const leftX = useTransform(scrollYProgress, [0, 1], ['0vw', '-18vw']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0vw', '18vw']);
  const hint = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const cta = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  const scrollToForm = () => {
    const el = document.getElementById('careers-form');
    el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white">
      {/* The track. On desktop it is twice the viewport so the stage has room to pin and the picture to open. */}
      <div ref={trackRef} className={reduced ? '' : 'md:h-[200vh]'}>
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden md:sticky md:top-0 md:h-[100vh] md:min-h-0">
          <motion.div className="absolute inset-0 z-0" style={{ opacity: reduced ? 0.4 : bg }} aria-hidden="true">
            <Image src={bgImageSrc} alt="" width={1920} height={1080} className="h-full w-full object-cover" priority={false} />
          </motion.div>

          <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4 py-12 md:gap-6 md:pt-[75px] md:pb-0">
            <div className="flex w-full flex-col items-center gap-2 text-center md:gap-4">
              {title && (
                <motion.h2 className="font-outfit font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-[#23395B]" style={{ x: reduced ? 0 : leftX }}>
                  {title}
                </motion.h2>
              )}
              {subtitle && (
                <motion.p className="font-outfit font-light text-xl md:text-2xl lg:text-3xl text-[#23395B]" style={{ x: reduced ? 0 : rightX }}>
                  {subtitle}
                </motion.p>
              )}
              {tagline && <p className="font-outfit font-light text-base md:text-lg lg:text-xl text-[#23395B]/70 max-w-2xl mt-2">{tagline}</p>}
            </div>

            {/* The picture: a card on phones and under reduced motion, otherwise it opens with the scroll. */}
            <motion.div
              className="relative z-10 w-[min(1200px,94vw)] overflow-hidden shadow-2xl md:w-auto"
              style={reduced ? { borderRadius: 16 } : { width, height, borderRadius: radius }}
            >
              <Image src={mediaSrc} alt={title || 'Careers at Lapiz Blue'} width={1280} height={720} className="h-full w-full object-cover aspect-[16/9] md:aspect-auto" />
              <motion.div className="absolute inset-0 bg-black" style={{ opacity: reduced ? 0.15 : shade }} aria-hidden="true" />
              {scrollToExpand && !reduced && (
                <motion.p className="absolute bottom-4 left-0 right-0 hidden text-center font-manrope text-sm text-white md:block" style={{ opacity: hint }}>
                  {scrollToExpand}
                </motion.p>
              )}
            </motion.div>

            <motion.div style={{ opacity: reduced ? 1 : cta }} className="md:absolute md:bottom-10">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex min-h-[3rem] items-center rounded-full bg-[#161925] px-7 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Open the application form
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* The form is ordinary content under the track: always in the page, never gated on the animation. */}
      <section id="careers-form" className="w-full scroll-mt-[75px] bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-16 lg:py-20">
        {children}
      </section>
    </div>
  );
};

export default ScrollExpandMedia;

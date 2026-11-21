'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from 'framer-motion';

/**
 * The careers opener on the contact page.
 *
 * A 100vh stage pinned inside a 300vh track, every value a function of the real
 * scroll position so the whole thing plays backwards when you scroll up:
 *
 *   0.00 to 0.28  the title and subtitle start as jumbled digits and symbols and
 *                 resolve left to right into the real words, then hold readable
 *   0.42 to 0.78  the picture grows from a 320px card under the text to the
 *                 full viewport, the text and the mesh fading out from 0.50 to 0.62
 *   0.84 to 1.00  the full bleed picture dissolves into the page and scales to 1.04;
 *                 the form, pulled up under the stage, fades in from 0.85
 *
 * Nothing touches the wheel. The stage is sticky, the form is ordinary content
 * below the track, and the button on the stage scrolls straight to it.
 *
 * Every animated value is written as a CSS custom property on the track and only
 * consumed by `md:` classes, so phones and reduced motion get a static header
 * (real text, the picture as a card, the form visible) from the same markup.
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

const GLYPHS = '0123456789#%&*';
const RESOLVE_END = 0.28;

/** Small integer hash so the jumble is deterministic for a given character and scroll step. */
function hash(i: number, step: number): number {
  let h = (i * 374761393 + step * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}

/**
 * The reactbits DecryptedText idea, driven by scroll instead of time. Each
 * character resolves left to right between 0 and RESOLVE_END; before its turn
 * it shows a glyph picked from the hash of its index and the scroll step, so
 * the jumble flickers as you move and re-scrambles identically on the way back.
 */
function scramble(text: string, progress: number): string {
  const n = text.length;
  const step = Math.floor(progress * 120);
  let out = '';
  for (let i = 0; i < n; i++) {
    const ch = text[i];
    if (ch === ' ') {
      out += ' ';
      continue;
    }
    const resolveAt = (RESOLVE_END * (i + 1)) / n;
    out += progress >= resolveAt ? ch : GLYPHS[hash(i, step) % GLYPHS.length];
  }
  return out;
}

function ScrambleText({ text, progress, animated }: { text: string; progress: MotionValue<number>; animated: boolean }) {
  const jumbled = useTransform(progress, (p) => scramble(text, p));
  if (!animated) return <>{text}</>;
  return (
    <>
      <span className="md:sr-only">{text}</span>
      <motion.span aria-hidden="true" className="hidden md:inline" data-scramble="">
        {jumbled}
      </motion.span>
    </>
  );
}

const ScrollExpandMedia = ({ mediaSrc, bgImageSrc, title, subtitle, tagline, scrollToExpand, children }: ScrollExpandMediaProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const animated = !reduced;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  // Every value below is a plain number written to a CSS variable on the track.
  const grow = useTransform(scrollYProgress, [0.42, 0.78], [0, 1]);
  const picY = useTransform(scrollYProgress, [0.42, 0.78], [120, 0]);
  const picOpacity = useTransform(scrollYProgress, [0.84, 1], [1, 0]);
  const picScale = useTransform(scrollYProgress, [0.84, 1], [1, 1.04]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.62], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0.28, 0.42], [1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const ctaPointer = useTransform(scrollYProgress, (p) => (p >= 0.9 ? 'auto' : 'none'));
  const formOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.85, 1], [32, 0]);

  const trackVars = {
    '--grow': grow,
    '--pic-y': picY,
    '--pic-o': picOpacity,
    '--pic-s': picScale,
    '--text-o': textOpacity,
    '--hint-o': hintOpacity,
    '--cta-o': ctaOpacity,
    '--cta-pe': ctaPointer,
  } as unknown as MotionStyle;

  const formVars = { '--form-o': formOpacity, '--form-y': formY } as unknown as MotionStyle;

  const scrollToForm = () => {
    const el = document.getElementById('careers-form');
    el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white">
      {/* The track: three viewports tall on desktop so the stage can pin while the scroll drives the scene. */}
      <motion.div ref={trackRef} className={animated ? 'md:h-[300vh]' : undefined} style={animated ? trackVars : undefined}>
        <section
          data-careers-stage=""
          className={[
            'relative overflow-hidden bg-white',
            animated ? 'md:sticky md:top-0 md:h-[100vh]' : '',
          ].join(' ')}
        >
          {/* Mesh background, fading with the text on desktop. */}
          <div
            aria-hidden="true"
            className={['absolute inset-0 bg-cover bg-center opacity-40', animated ? 'md:opacity-[calc(0.4_*_var(--text-o,1))]' : ''].join(' ')}
            style={{ backgroundImage: `url(${bgImageSrc})` }}
          />

          <div className={['relative z-10 flex flex-col items-center gap-6 px-4 pt-[75px] pb-10', animated ? 'md:static md:gap-0 md:p-0' : 'md:pb-16'].join(' ')}>
            {/* Title block: in flow on phones, pinned to the upper part of the stage on desktop, under the picture so the card grows over it as it fades. */}
            <div
              data-careers-text=""
              className={[
                'flex w-full flex-col items-center gap-3 text-center md:gap-4',
                animated ? 'md:absolute md:inset-x-0 md:top-[14vh] md:z-10 md:px-8 md:opacity-[var(--text-o,1)]' : '',
              ].join(' ')}
            >
              {title && (
                <h2 className="font-outfit text-4xl font-bold text-[#23395B] md:text-6xl lg:text-7xl xl:text-8xl">
                  <ScrambleText text={title} progress={scrollYProgress} animated={animated} />
                </h2>
              )}
              {subtitle && (
                <p className="font-outfit text-xl font-light text-[#23395B] md:text-2xl lg:text-3xl">
                  <ScrambleText text={subtitle} progress={scrollYProgress} animated={animated} />
                </p>
              )}
              {tagline && <p className="mt-2 max-w-2xl font-outfit text-base font-light text-[#23395B]/70 md:text-lg lg:text-xl">{tagline}</p>}
            </div>

            {/* The picture: a card on phones and under reduced motion; on desktop it grows from a 320px card to the full frame, then dissolves. */}
            <div
              data-careers-picture=""
              className={[
                'relative z-10 aspect-[16/10] w-full max-w-[560px] overflow-hidden rounded-[24px] shadow-2xl',
                animated
                  ? [
                      'md:absolute md:left-1/2 md:top-1/2 md:z-20 md:aspect-auto md:max-w-none',
                      'md:w-[calc(320px_+_(100vw_-_320px)_*_var(--grow,0))]',
                      'md:h-[calc(220px_+_(100vh_-_220px)_*_var(--grow,0))]',
                      'md:rounded-[calc(24px_*_(1_-_var(--grow,0)))]',
                      'md:opacity-[var(--pic-o,1)]',
                      'md:[transform:translate(-50%,calc(-50%_+_var(--pic-y,120)_*_1px))_scale(var(--pic-s,1))]',
                    ].join(' ')
                  : 'md:mt-8 md:max-w-[1200px] md:aspect-[16/9]',
              ].join(' ')}
            >
              <Image src={mediaSrc} alt={title || 'Careers at Lapiz Blue'} fill sizes="100vw" className="object-cover" />
            </div>

            {/* Scroll hint, desktop only, gone by a quarter of the track. */}
            {scrollToExpand && animated && (
              <p
                data-careers-hint=""
                className="hidden md:absolute md:inset-x-0 md:bottom-10 md:z-20 md:block md:text-center md:font-manrope md:text-sm md:text-[#23395B] md:opacity-[var(--hint-o,1)]"
              >
                {scrollToExpand}
              </p>
            )}

            {/* The button: static on phones, appears at the end of the track on desktop. */}
            <div
              data-careers-cta=""
              className={[
                'md:absolute md:inset-x-0 md:bottom-10 md:z-30 md:flex md:justify-center',
                animated ? 'md:opacity-[var(--cta-o,0)] md:[pointer-events:var(--cta-pe,none)]' : '',
              ].join(' ')}
            >
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex min-h-[3rem] items-center rounded-full bg-[#161925] px-7 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Open the application form
              </button>
            </div>
          </div>
        </section>
      </motion.div>

      {/* The form is ordinary content under the track: always in the DOM, its visual arriving once the picture has dissolved. */}
      <section id="careers-form" className="relative z-10 w-full scroll-mt-[75px] bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:-mt-[88vh] md:py-16 lg:py-20">
        <motion.div
          data-careers-form=""
          className={animated ? 'md:opacity-[var(--form-o,1)] md:[translate:0_calc(var(--form-y,0)_*_1px)]' : undefined}
          style={animated ? formVars : undefined}
        >
          {children}
        </motion.div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;

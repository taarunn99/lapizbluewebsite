'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface PageSection {
  id: string;
  label: string;
}

/**
 * On this page.
 *
 * A rail of same page anchors, not tabs. Every section it points at is rendered
 * at the same time; this only scrolls to them. A product page is a reference
 * document, and a specifier reads it through or prints it as often as they jump
 * around it, so hiding four fifths behind a tab would fight both.
 *
 * It is deliberately not a bar. The previous version was a full bleed tinted
 * strip with a border top and bottom, which read as a second navbar sitting
 * under the real one. What makes this read as navigation instead is the pill
 * that slides to the section you are in, not a slab of chrome behind it. So:
 * no fill, no border above, one hairline below, and the items carry no borders
 * of their own. The white is opaque rather than translucent: a blurred panel
 * over body copy is exactly the glassy slab that reads as chrome, and on a
 * white page an opaque white strip is invisible anyway.
 *
 * The pill is a single element moved between items by Framer Motion's shared
 * layout animation. The spring is slightly overdamped, so it glides into place
 * and never bounces past.
 */

/** Slightly overdamped: quick, and it settles without overshooting. */
const PILL_SPRING = { type: 'spring' as const, stiffness: 480, damping: 40, mass: 0.7 };

export function SectionNav({ sections }: { sections: PageSection[] }) {
  const [current, setCurrent] = useState<string>(sections[0]?.id ?? '');
  const railRef = useRef<HTMLUListElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    // A band across the middle of the viewport decides what counts as current.
    // Giving it height rather than using a single line is what stops the pill
    // flickering when a heading sits right on the boundary: a section has to
    // cross the whole band before the pill moves.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  // On a phone the rail scrolls sideways rather than wrapping to three rows, so
  // the active item is brought back into view when it would otherwise be off
  // the end.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const item = rail.querySelector<HTMLElement>(`[data-section="${current}"]`);
    if (!item || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({
      left: item.offsetLeft - (rail.clientWidth - item.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [current, reduceMotion]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[75px] z-30 border-b border-[#161925]/10 bg-white print:hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul
          ref={railRef}
          className="flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s, index) => {
            const active = s.id === current;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  data-section={s.id}
                  aria-current={active ? 'true' : undefined}
                  className={`relative inline-flex min-h-[2.75rem] items-center gap-2 rounded-xl px-3.5 font-manrope text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] ${
                    active ? 'text-white' : 'text-[#161925]/75 hover:bg-[#161925]/5 hover:text-[#161925]'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="section-nav-pill"
                      transition={reduceMotion ? { duration: 0 } : PILL_SPRING}
                      className="absolute inset-0 rounded-[inherit] bg-[var(--brand)]"
                    />
                  ) : null}
                  <span
                    className={`label-sh relative ${active ? 'text-white/70' : 'text-[#161925]/45'}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="relative font-medium">{s.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

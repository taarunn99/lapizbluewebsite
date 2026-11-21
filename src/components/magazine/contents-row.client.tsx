"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * The contents page of the issue as a cinematic index. Each row is a plain
 * anchor to its spread; on hover the brand mark slides in from the right in
 * white, the title steps 12 px to the right, the folio turns cream and a cream
 * rule draws under the row. On a desktop with a real pointer a 16:9 card with
 * the brand photograph rides the cursor (the 21st.dev hover image reveal, on a
 * spring). Touch devices and reduced motion get the list without the card.
 * The rows arrive in a stagger the first time the list scrolls into view.
 */

export type ContentsItem = {
  slug: string;
  name: string;
  strap: string;
  logo: string;
  /** How to turn the mark white: alpha logos go to a pure silhouette, the two flat ones are keyed by luminance. */
  tone: "alpha" | "on-white" | "on-dark";
  /** Absolute placement of the file inside the 124 by 32 slot so the mark itself fills it. */
  logoStyle: { width: string; height: string; left: string; top: string };
  preview: string;
};

const EASE = [0.25, 0.4, 0.25, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

const LOGO_FILTER: Record<ContentsItem["tone"], string> = {
  alpha: "brightness(0) invert(1)",
  "on-white": "grayscale(1) invert(1) contrast(1.6)",
  "on-dark": "grayscale(1) contrast(3)",
};

const CARD_W = 300;
const CARD_H = Math.round((CARD_W * 9) / 16);

export function ContentsIndex({ items }: { items: ContentsItem[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(listRef, { once: true, amount: 0.15 });
  const shown = reduced || inView;

  const [fine, setFine] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const preloaded = useRef(false);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setFine(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const card = fine && !reduced;

  const move = (e: React.PointerEvent) => {
    if (!card) return;
    x.set(e.clientX + 28);
    y.set(e.clientY - CARD_H / 2);
  };

  const enterList = () => {
    if (!card || preloaded.current) return;
    preloaded.current = true;
    for (const it of items) {
      const img = new Image();
      img.src = it.preview;
    }
  };

  const activeItem = items.find((i) => i.slug === active) ?? null;

  return (
    <>
      <ol
        ref={listRef}
        className="relative border-t border-white/10"
        onPointerEnter={enterList}
        onPointerMove={move}
        onPointerLeave={() => setActive(null)}
      >
        {items.map((b, i) => (
          <motion.li
            key={b.slug}
            className="relative border-b border-white/10"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.65, delay: reduced ? 0 : 0.08 * i, ease: EASE }}
            onPointerEnter={() => setActive(b.slug)}
            onFocusCapture={() => setActive(b.slug)}
            onBlurCapture={() => setActive(null)}
          >
            <a
              href={`#spread-${b.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-4 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-x-5 sm:py-5 outline-none focus-visible:bg-white/[0.04]"
            >
              <span className="font-outfit font-semibold text-2xl sm:text-3xl tabular-nums leading-none text-white/40 [@media(hover:none)]:text-[#F3DFC1] transition-colors duration-300 group-hover:text-[#F3DFC1] group-focus-visible:text-[#F3DFC1] motion-reduce:transition-none">
                {pad(i + 1)}
              </span>
              <span className="min-w-0 pr-2 transition-transform duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transition-none">
                <span className="block font-outfit font-semibold text-xl sm:text-2xl leading-snug text-white">{b.name}</span>
                <span className="block font-manrope text-sm text-white/65 mt-0.5">{b.strap}</span>
              </span>
              <span className="relative hidden h-8 w-[124px] overflow-hidden sm:block" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.logo}
                  alt={`${b.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="absolute max-w-none translate-x-8 opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  style={{ ...b.logoStyle, filter: LOGO_FILTER[b.tone], mixBlendMode: "screen" }}
                />
              </span>
              <span className="label-sh text-white/50 transition-colors duration-300 group-hover:text-[#F3DFC1] group-focus-visible:text-[#F3DFC1] motion-reduce:transition-none">
                p. {pad(i + 1)}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-[#F3DFC1] transition-transform duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
            </a>
          </motion.li>
        ))}
      </ol>

      {card ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 overflow-hidden rounded-xl bg-[#161925] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/15"
          style={{ x: sx, y: sy, width: CARD_W, height: CARD_H }}
          initial={false}
          animate={activeItem ? { opacity: 1, scale: 1, rotate: -1.5 } : { opacity: 0, scale: 0.92, rotate: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <AnimatePresence initial={false}>
            {activeItem ? (
              <motion.img
                key={activeItem.slug}
                src={activeItem.preview}
                alt={`${activeItem.name} preview`}
                width={CARD_W}
                height={CARD_H}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.08, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            ) : null}
          </AnimatePresence>
          {activeItem ? (
            <span className="label-sh absolute bottom-2.5 left-3 rounded-full bg-[#161925]/70 px-2.5 py-1.5 text-[#F3DFC1] backdrop-blur-sm">
              {activeItem.name}
            </span>
          ) : null}
        </motion.div>
      ) : null}
    </>
  );
}

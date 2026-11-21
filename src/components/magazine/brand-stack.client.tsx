"use client";

import { Children, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * The card deck on the brands page: each card pins under the header while the
 * next one rides up over it, the way gcbuae.com stacks its product lines. The
 * cards themselves are server rendered children; this wrapper only measures
 * the next card's top on scroll and settles the pinned card back and dimmer.
 * Below the lg breakpoint, and under reduced motion, the cards simply stack.
 */
const PIN = 88; // px under the fixed navigation

export function BrandStackDeck({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const paint = () => {
      raf = 0;
      const nodes = refs.current;
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        const card = el?.firstElementChild as HTMLElement | null;
        if (!el || !card) continue;
        if (!mq.matches) { card.style.transform = ""; card.style.filter = ""; continue; }
        const next = nodes[i + 1];
        let p = 0;
        if (next) {
          const h = el.getBoundingClientRect().height;
          const nextTop = next.getBoundingClientRect().top;
          p = Math.min(1, Math.max(0, (PIN + h - nextTop) / h));
        }
        card.style.transform = p ? `scale(${1 - p * 0.06}) translateY(${-p * 12}px)` : "";
        card.style.filter = p ? `brightness(${1 - p * 0.35})` : "";
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduced, items.length]);

  return (
    <ol className="list-none p-0 m-0">
      {items.map((child, i) => (
        <li key={i} ref={(n) => { refs.current[i] = n; }} className="lg:sticky lg:top-[88px] mb-6 lg:mb-0 lg:pb-6" style={{ zIndex: i + 1 }}>
          {child}
        </li>
      ))}
    </ol>
  );
}

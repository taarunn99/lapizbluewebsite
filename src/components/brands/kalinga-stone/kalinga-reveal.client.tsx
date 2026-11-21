"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The two motion pieces of the Kalinga capabilities band. Everything else in
 * that band is server rendered; these only add the once-on-scroll reveal and
 * the slow photograph parallax, both switched off under reduced motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** One numbered capability: a brand blue rule draws down its left edge as the copy lifts in. */
export function KalingaReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const shown = inView || reduce === true;

  return (
    <li ref={ref} className={`relative ${className}`}>
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[#406E8E]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: shown ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: EASE }}
      />
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 18 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay + 0.1, ease: EASE }}
      >
        {children}
      </motion.div>
    </li>
  );
}

/** A photograph frame whose picture drifts a few percent against the scroll. */
export function KalingaParallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}

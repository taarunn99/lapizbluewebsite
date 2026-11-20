"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * A magazine spread turning into view: the page lifts and settles once, below
 * the fold only, with the house curve. Under reduced motion it is simply there.
 */
export function SpreadReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const shown = reduced || inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** A rule that draws itself across the spread as it arrives, the running head above it. */
export function SpreadRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div ref={ref} className={`h-px w-full bg-[#161925]/15 ${className}`} aria-hidden="true">
      <motion.div
        className="h-px bg-[#161925]"
        initial={reduced ? { width: "100%" } : { width: 0 }}
        animate={reduced || inView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
      />
    </div>
  );
}

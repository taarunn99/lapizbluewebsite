"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * A numbered list with one continuous rule down its left edge. The brand
 * blue fill follows the scroll exactly, drawing down as the reader goes and
 * retracting when they come back up. Each item carries a bullet on the rule
 * that lights and blinks the moment the fill crosses it and dims again when
 * the fill retracts above it. Reduced motion: full rule, bullets lit, still.
 */
const EASE = [0.25, 0.4, 0.25, 1] as const;

export function ScrollRuleList({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  // The tip of the fill sits on the 70% line of the viewport; bullets light on the same line.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <ol ref={ref} className={`relative ${className}`}>
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-white/10">
        <motion.span
          className="block w-0.5 bg-[#406E8E] shadow-[0_0_12px_rgba(191,215,234,0.6)]"
          style={{ height: reduced ? "100%" : fill }}
        />
      </span>
      {children}
    </ol>
  );
}

export function ScrollRuleItem({ children, className = "", bulletTop = "2.4rem" }: { children: ReactNode; className?: string; bulletTop?: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  // Lit while the top of the item is above the 70% line, including once it has scrolled past.
  const crossed = useInView(ref, { margin: "10000px 0px -30% 0px" });
  const lit = reduced || crossed;
  return (
    <motion.li
      ref={ref}
      className={`relative ${className}`}
      initial={false}
      animate={{ opacity: lit ? 1 : 0.82, y: lit ? 0 : 16 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-0 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-2 ring-[#161925]"
        style={{ top: bulletTop }}
        initial={false}
        animate={
          lit
            ? { scale: reduced ? 1 : [1, 1.8, 1, 1.4, 1], backgroundColor: "#F3DFC1", boxShadow: "0 0 0 5px rgba(243,223,193,0.22), 0 0 22px rgba(191,215,234,0.95)" }
            : { scale: 1, backgroundColor: "rgba(255,255,255,0.28)", boxShadow: "0 0 0 0px rgba(243,223,193,0)" }
        }
        transition={{ duration: reduced ? 0 : 0.9, ease: EASE, times: [0, 0.25, 0.5, 0.75, 1] }}
      />
      {children}
    </motion.li>
  );
}

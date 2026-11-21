"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * The motion pieces of the gcbuae.com style Kalinga Stone line pages: an in
 * view reveal for everything below the fold, a slow parallax on the full bleed
 * warehouse photograph, and the slab formats drawing that inks its outlines
 * in. All three are still under reduced motion.
 */

const EASE = [0.25, 0.4, 0.25, 1] as const;

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const shown = reduced || inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself across as it arrives. */
export function Rule({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div ref={ref} className={`h-px w-full ${dark ? "bg-[#F7F8F5]/15" : "bg-[#0C1510]/12"} ${className}`} aria-hidden="true">
      <motion.div
        className={`h-px ${dark ? "bg-[#6F8F78]" : "bg-[#355E4D]"}`}
        initial={reduced ? { width: "100%" } : { width: 0 }}
        animate={reduced || inView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </div>
  );
}

/** The full bleed photograph drifts a little slower than the page. */
export function ParallaxBleed({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={reduced ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

export type SlabFormat = { w: number; h: number; label: string; sub: string };

/**
 * Slab formats drawn to scale against a 1750 mm figure. Every card shares
 * one viewBox in millimetres, so the rectangles compare across cards and the
 * drawing scales cleanly down to a phone column. Outlines ink in on arrival.
 */
export function SlabFormats({ formats, dark = false }: { formats: SlabFormat[]; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const draw = reduced || inView;
  const VW = 4300;
  const VH = 2300;
  const base = 2150;
  const stroke = dark ? "#D2D4C8" : "#0C1510";
  const fill = dark ? "rgba(247,248,245,0.06)" : "rgba(210,212,200,0.35)";
  const ink = dark ? "text-[#F7F8F5]" : "text-[#0C1510]";
  const muted = dark ? "text-[#F7F8F5]/66" : "text-[#0C1510]/66";
  const border = dark ? "border-[#F7F8F5]/15" : "border-[#D2D4C8]";

  const Figure = ({ x }: { x: number }) => {
    const top = base - 1750;
    const d = [
      `M ${x} ${top + 200} v 850`,
      `M ${x} ${top + 1050} l -220 700`,
      `M ${x} ${top + 1050} l 220 700`,
      `M ${x} ${top + 330} l -260 560`,
      `M ${x} ${top + 330} l 260 560`,
    ].join(" ");
    return (
      <g>
        <motion.circle
          cx={x}
          cy={top + 100}
          r={100}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={draw ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={draw ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
        />
        <text x={x + 150} y={top + 40} fontSize={120} fill={stroke} opacity={0.6} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" letterSpacing={6}>
          1750 MM
        </text>
      </g>
    );
  };

  return (
    <div ref={ref} className={`grid grid-cols-1 gap-6 ${formats.length > 1 ? "md:grid-cols-3" : "md:grid-cols-[2fr_1fr]"}`}>
      {formats.map((f, i) => {
        const x = 150;
        const y = base - f.h;
        return (
          <div key={f.label} className={`rounded-xl border ${border} p-4 sm:p-5`}>
            <svg viewBox={`0 0 ${VW} ${VH}`} className="block w-full h-auto" role="img" aria-label={`${f.label} slab drawn to scale beside a 1750 mm figure`}>
              <motion.rect
                x={x}
                y={y}
                width={f.w}
                height={f.h}
                rx={30}
                fill={fill}
                stroke={stroke}
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                animate={draw ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.4, delay: i * 0.15, ease: EASE }}
              />
              <text x={x + 90} y={y + 200} fontSize={130} fill={stroke} opacity={0.7} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" letterSpacing={6}>
                {f.w} x {f.h}
              </text>
              <line x1={0} y1={base} x2={VW} y2={base} stroke={stroke} strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <Figure x={x + f.w + 450} />
            </svg>
            <p className={`mt-4 font-[family-name:var(--font-cormorant)] text-2xl leading-none ${ink}`}>{f.label}</p>
            <p className={`mt-1.5 font-manrope text-xs ${muted}`}>{f.sub}</p>
          </div>
        );
      })}
    </div>
  );
}

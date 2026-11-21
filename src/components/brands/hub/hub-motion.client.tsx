"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const ease = [0.25, 0.4, 0.25, 1] as const;

/**
 * A heading that arrives one word at a time, the TextReveal idea in a dozen
 * lines. The text stays whole in the HTML: every word is a span and the
 * spaces between them are plain text nodes, so textContent is unchanged.
 */
export function WordReveal({ text, id, className = "" }: { text: string; id: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shown = reduced || inView;
  const words = text.split(" ");
  return (
    <h2 id={id} ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="inline-block"
              initial={reduced ? false : { opacity: 0, y: "0.6em" }}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.6em" }}
              transition={{ duration: 0.7, delay: 0.04 * i, ease }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}

/**
 * A transform only lift for text a search engine must read. Opacity is never
 * touched, so the passage is fully visible in the HTML and to any crawler.
 */
export function LiftIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const shown = reduced || inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { y: 28 }}
      animate={shown ? { y: 0 } : { y: 28 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The editorial frame: a tall crop with the photograph drifting a few percent
 * against the scroll, a cream rule and running head laid over the top edge.
 */
export function ParallaxFrame({ children, head, className = "" }: { children: React.ReactNode; head: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-2xl bg-[#161925] ${className}`}>
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-x-0 -top-[7%] h-[114%] [&_picture]:block [&_picture]:h-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
      >
        {children}
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#161925]/45 via-transparent to-[#161925]/20" />
      <div aria-hidden="true" className="absolute left-5 right-5 top-5 flex items-center gap-4 sm:left-7 sm:right-7 sm:top-7">
        <span className="label-sh text-[#F3DFC1]">{head}</span>
        <span className="h-px flex-1 bg-[#F3DFC1]/70" />
      </div>
    </div>
  );
}

/**
 * The figures as a single ribbon: four big numerals divided by hairlines.
 * Each cell fills navy under the pointer with a soft cream light following it,
 * the spotlight card idea applied to a strip instead of four loose boxes.
 */
export function FigureRibbon({ figures }: { figures: { value: string; label: string }[] }) {
  return (
    <ul
      aria-label="Figures"
      className="grid grid-cols-2 lg:grid-cols-4 border-y border-[#161925]/12 [&>li]:border-[#161925]/12 [&>li:nth-child(odd)]:border-r [&>li:nth-child(-n+2)]:border-b lg:[&>li]:border-b-0 lg:[&>li]:border-r lg:[&>li:last-child]:border-r-0"
    >
      {figures.map((f) => (
        <FigureCell key={f.label} value={f.value} label={f.label} />
      ))}
    </ul>
  );
}

function FigureCell({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const n = Number(value);
  const count = Number.isFinite(n) && n > 0 && n < 100000 && !/^\d{4}$/.test(value);
  return (
    <li
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setPos(null)}
      className="group/fig relative overflow-hidden px-4 py-6 sm:px-6 sm:py-7 transition-colors duration-500 hover:bg-[#161925]"
    >
      {pos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, rgba(243,223,193,0.22), transparent 60%)` }}
        />
      )}
      <span className="relative block font-outfit font-semibold text-4xl sm:text-5xl text-[#161925] tabular-nums leading-none transition-colors duration-500 group-hover/fig:text-[#F3DFC1]">
        {count ? <AnimatedCounter end={n} className="block" /> : value}
      </span>
      <span className="relative mt-3 block font-manrope text-xs sm:text-sm leading-snug text-[#161925]/65 transition-colors duration-500 group-hover/fig:text-[#BFD7EA]">
        {label}
      </span>
    </li>
  );
}

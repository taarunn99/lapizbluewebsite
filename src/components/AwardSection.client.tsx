"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

// 2026 Dubai Local Awards, Outstanding Construction Material Wholesaler.
// Every figure below is taken from the public award page and the DXB Local
// profile (ratings sourced from Google Maps as of 1 November 2026).
const AWARD_URL =
  "https://dxblocal.ae/awards/2026/lapiz-blue-general-trading-llc-dubai-branch-t4ucalw";
const RATING = 4.7;
const REVIEWS = 179;
const DISTRIBUTION = [
  { stars: 5, pct: 87 },
  { stars: 4, pct: 5 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 3 },
];

const REASONS = [
  {
    key: "mapei",
    title: "Mapei range",
    body: "Customers highlight a huge variety of Mapei products, making this a practical stop for Mapei-focused purchasing.",
    quote: "Mapei products, Dulux paints and construction chemical materials",
    quoteLabel: "Most praised in reviews",
    href: "/brands/mapei",
    hrefLabel: "Browse the Mapei range",
  },
  {
    key: "guidance",
    title: "Technical guidance",
    body: "Staff are praised for explaining how different products should be used, not simply selling them.",
    quote: "guides you also on how to use different products",
    quoteLabel: "Google review",
  },
  {
    key: "breadth",
    title: "Product breadth",
    body: "Reviews describe a one-stop source for construction chemicals and other building materials.",
    quote: "their concrete seamless coating product is fantastic",
    quoteLabel: "Google review",
    href: "/brands",
    hrefLabel: "See every brand we stock",
  },
  {
    key: "service",
    title: "Helpful, fast service",
    body: "Customers describe the team as helpful and polite, with short delivery turnarounds when it matters.",
    quote: "Staff here was very helpful and polite",
    quoteLabel: "Google review",
  },
];

const CONFETTI_COLORS = ["#A80E18", "#406E8E", "#BFD7EA", "#F3DFC1", "#FFFFFF"];

function useCountUp(target: number, active: boolean, duration = 1600, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(parseFloat((target * eased).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, decimals]);
  return value;
}

function Star({ fill, delay }: { fill: number; delay: number }) {
  const id = `star-${delay}`;
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <motion.rect
            x="0"
            y="0"
            height="24"
            initial={{ width: 0 }}
            animate={{ width: 24 * fill }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
          />
        </clipPath>
      </defs>
      <path
        d="M12 2.5l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.3l-6 3.3 1.3-6.6L2.4 9.4l6.7-.8L12 2.5z"
        fill="none"
        stroke="#F3DFC1"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path
        d="M12 2.5l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.3l-6 3.3 1.3-6.6L2.4 9.4l6.7-.8L12 2.5z"
        fill="#F3DFC1"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}

export function AwardSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(REASONS[0].key);
  const firedRef = useRef(false);

  const rating = useCountUp(RATING, isInView, 1600, 1);
  const reviews = useCountUp(REVIEWS, isInView, 1600, 0);

  const fireConfetti = (origin: { x: number; y: number }, big: boolean) => {
    if (reduceMotion) return;
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: big ? 140 : 40,
        spread: big ? 80 : 60,
        startVelocity: big ? 42 : 28,
        scalar: 0.9,
        ticks: 220,
        origin,
        colors: CONFETTI_COLORS,
        disableForReducedMotion: true,
      });
    });
  };

  const rosetteOrigin = () => {
    // Two rosettes exist (mobile and desktop placement); use the one on screen.
    const el = Array.from(document.querySelectorAll<HTMLElement>("[data-award-rosette]")).find(
      (n) => n.offsetParent !== null
    );
    if (!el) return { x: 0.75, y: 0.5 };
    const r = el.getBoundingClientRect();
    return {
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height / 2) / window.innerHeight,
    };
  };

  // One celebration when the section first comes into view, then a small pop
  // every time someone taps the rosette.
  useEffect(() => {
    if (!isInView || firedRef.current) return;
    firedRef.current = true;
    const t = setTimeout(() => fireConfetti(rosetteOrigin(), true), 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const current = REASONS.find((r) => r.key === active) ?? REASONS[0];

  return (
    <section
      ref={ref}
      id="dubai-local-awards-2026"
      aria-labelledby="award-heading"
      className="relative w-full overflow-hidden bg-[#161925] text-white"
    >
      {/* Soft spotlight behind the rosette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-[#406E8E]/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-start">
          {/* ---------- Left: the proof ---------- */}
          <div>
            <p className="font-manrope text-[#BFD7EA] text-sm sm:text-base uppercase tracking-widest">
              2026 Dubai Local Awards
            </p>
            <h2
              id="award-heading"
              className="font-outfit font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-3"
            >
              Outstanding Construction Material Wholesaler
            </h2>
            <p className="font-manrope text-white/75 text-lg sm:text-xl lg:text-2xl mt-5 max-w-[34ch]">
              Not chosen by a panel. Chosen by the people who buy from us. The Dubai Local Awards read
              every customer review in the city and this is what ours said.
            </p>

            {/* Rosette on mobile sits here, between headline and figures */}
            <div className="lg:hidden mt-8 flex justify-center">
              <Rosette show={isInView} reduceMotion={!!reduceMotion} onTap={() => fireConfetti(rosetteOrigin(), false)} />
            </div>

            {/* Figures */}
            <div className="mt-10 grid grid-cols-[auto_1fr] sm:grid-cols-[auto_auto_1fr] gap-x-8 gap-y-6 items-end">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-outfit font-semibold text-6xl sm:text-7xl lg:text-8xl leading-none tabular-nums">
                    {rating.toFixed(1)}
                  </span>
                  <span className="font-manrope text-white/60 text-lg">/ 5</span>
                </div>
                <div className="mt-2 flex gap-1" aria-label={`${RATING} out of 5 stars`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      fill={Math.max(0, Math.min(1, (isInView ? RATING : 0) - i))}
                      delay={0.3 + i * 0.18}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="font-outfit font-semibold text-5xl sm:text-6xl lg:text-7xl leading-none tabular-nums">
                  {reviews}
                </span>
                <p className="font-manrope text-white/60 text-base sm:text-lg mt-2">customer reviews</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-outfit font-semibold text-5xl sm:text-6xl lg:text-7xl leading-none tabular-nums">
                  87<span className="text-3xl sm:text-4xl align-top">%</span>
                </span>
                <p className="font-manrope text-white/60 text-base sm:text-lg mt-2">gave five stars</p>
              </div>
            </div>

            {/* Distribution bars: the receipts */}
            <div className="mt-10 max-w-[520px]" role="img" aria-label="Star rating distribution: 87 percent five stars, 5 percent four stars, 3 percent three stars, 1 percent two stars, 3 percent one star">
              {DISTRIBUTION.map((row, i) => (
                <div key={row.stars} className="flex items-center gap-3 py-1.5">
                  <span className="font-manrope text-white/70 text-sm w-8 tabular-nums">{row.stars}★</span>
                  <div className="h-2.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[#F3DFC1]"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${row.pct}%` } : { width: 0 }}
                      transition={{ duration: 1.1, delay: 0.5 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                    />
                  </div>
                  <span className="font-manrope text-white/70 text-sm w-10 text-right tabular-nums">{row.pct}%</span>
                </div>
              ))}
              <p className="font-manrope text-white/45 text-xs sm:text-sm mt-3">
                Ratings from Google Maps as of 1 November 2026. Award accepted 14 November 2026.
              </p>
            </div>

            <p className="font-manrope text-white/75 text-base sm:text-lg mt-8 max-w-[52ch]">
              Fewer than one in four Dubai construction material wholesalers qualify. There is no entry
              form, no fee and no judging panel, only what customers wrote.
            </p>
          </div>

          {/* ---------- Right: the celebration and the why ---------- */}
          <div className="lg:pt-6">
            <div className="hidden lg:flex justify-center mb-10">
              <Rosette show={isInView} reduceMotion={!!reduceMotion} onTap={() => fireConfetti(rosetteOrigin(), false)} />
            </div>

            <h3 className="font-outfit font-semibold text-2xl sm:text-3xl">Why we won, in their words</h3>
            <p className="font-manrope text-white/60 text-base mt-1">Tap a reason to read what customers actually said.</p>

            <div className="mt-6 grid grid-cols-2 gap-2" role="tablist" aria-label="Reasons customers gave">
              {REASONS.map((r, i) => {
                const on = r.key === active;
                return (
                  <button
                    key={r.key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(r.key)}
                    className={`text-left rounded-2xl px-4 py-3 sm:px-5 sm:py-4 border transition-colors duration-200 ${
                      on
                        ? "bg-[#F3DFC1] border-[#F3DFC1] text-[#161925]"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    <span className={`font-manrope text-xs tabular-nums ${on ? "text-[#161925]/60" : "text-white/50"}`}>
                      0{i + 1}
                    </span>
                    <span className="block font-outfit font-semibold text-base sm:text-lg leading-tight mt-1">
                      {r.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={current.key}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
            >
              <p className="font-manrope text-white/80 text-base sm:text-lg leading-relaxed">{current.body}</p>
              <blockquote className="mt-4 border-l-4 border-[#F3DFC1] pl-4">
                <p className="font-manrope italic text-white text-lg sm:text-xl leading-snug">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="font-manrope text-white/50 text-sm mt-2">{current.quoteLabel}</footer>
              </blockquote>
              {current.href ? (
                <Link
                  href={current.href}
                  className="inline-block font-manrope text-[#BFD7EA] underline underline-offset-4 decoration-[#BFD7EA]/50 hover:decoration-[#BFD7EA] text-base mt-4"
                >
                  {current.hrefLabel}
                </Link>
              ) : null}
            </motion.div>

            {/* The one CTA */}
            <a
              href={AWARD_URL}
              target="_blank"
              rel="noopener"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#F3DFC1] text-[#161925] font-manrope font-semibold text-base sm:text-lg px-6 py-3.5 hover:bg-white transition-colors"
            >
              See the award on DXB Local
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rosette({ show, reduceMotion, onTap }: { show: boolean; reduceMotion: boolean; onTap: () => void }) {
  const hidden = { y: -120, opacity: 0, rotate: -8 };
  const shown = { y: 0, opacity: 1, rotate: 0 };
  return (
    <motion.div
      initial={reduceMotion ? false : hidden}
      animate={reduceMotion || show ? shown : hidden}
      transition={{ type: "spring", stiffness: 120, damping: 11, mass: 0.9 }}
      className="relative"
    >
      {/* Hanging thread */}
      <div aria-hidden="true" className="hidden lg:block absolute left-1/2 -top-24 h-24 w-px bg-white/20" />
      <motion.a
        data-award-rosette=""
        href={AWARD_URL}
        target="_blank"
        rel="noopener"
        onClick={(e) => {
          // Tap plays the celebration, second tap opens the award page.
          const el = e.currentTarget;
          if (el.dataset.popped !== "1") {
            e.preventDefault();
            el.dataset.popped = "1";
            onTap();
          }
        }}
        className="block w-[180px] sm:w-[210px] lg:w-[240px] drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] origin-top"
        animate={reduceMotion ? undefined : { rotate: [0, 1.6, -1.2, 0.6, 0] }}
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        title="Open our award page on DXB Local"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/awards/dxb-local-2026-outstanding-construction-material-wholesaler.svg"
          width={240}
          height={256}
          alt="Outstanding Construction Material Wholesaler in Al Quoz, Dubai - 2026 Dubai Local Awards by DXB Local"
          className="w-full h-auto"
          loading="lazy"
        />
      </motion.a>
    </motion.div>
  );
}

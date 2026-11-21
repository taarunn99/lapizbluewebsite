"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BrandHubQuestion } from "@/data/brand-hub/types";

const ease = [0.25, 0.4, 0.25, 1] as const;

/**
 * The four buyer questions as a sticky scroll reveal, the Aceternity pattern
 * written in. On large screens the intro pins at the top of the viewport with
 * a cream numeral that counts as each question arrives; the questions come in
 * one at a time as the reader reaches them, the left rule of each drawing down
 * in brand blue. Every question is in the HTML at all times; only opacity and
 * a small lift change. Below lg the columns stack and reveal in sequence.
 *
 * The rule beside the questions is one continuous line whose brand blue fill
 * follows the scroll position exactly, so it draws down as the reader goes
 * and retracts when they come back up. A bullet sits on the line at every
 * question; the moment the fill crosses it the bullet lights and blinks, and
 * it dims again when the fill retracts above it.
 */
export function HubQuestionsScroll({ questions, intro, hours }: { questions: BrandHubQuestion[]; intro: string; hours: string }) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState<boolean[]>(() => questions.map(() => false));

  useEffect(() => {
    if (reduced) setRevealed(questions.map(() => true));
  }, [reduced, questions]);

  const reveal = useCallback((i: number) => {
    setRevealed((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));
  }, []);

  // The question crossing the middle of the viewport, so the numeral follows
  // the reader up as well as down. Falls back to the last one revealed.
  const [centred, setCentred] = useState<number>(-1);
  const centre = useCallback((i: number, on: boolean) => {
    setCentred((prev) => (on ? i : prev === i ? -1 : prev));
  }, []);

  const lastShown = revealed.lastIndexOf(true);
  const active = centred >= 0 ? centred : Math.max(0, lastShown);
  const anyShown = lastShown >= 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16 items-start">
      <div className="lg:sticky lg:top-[88px]">
        <p className="font-manrope text-white/75 text-lg max-w-[42ch]">{intro}</p>
        <p className="font-manrope text-white/50 text-sm mt-6">{hours}</p>
        <div aria-hidden="true" className="hidden lg:block mt-14">
          <div className="relative h-[0.95em] overflow-hidden font-outfit font-semibold text-[8rem] leading-none text-[#F3DFC1] tabular-nums">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={active}
                className="absolute left-0 top-0 block"
                initial={reduced ? false : { y: "70%", opacity: 0 }}
                animate={{ y: 0, opacity: anyShown ? 1 : 0.7 }}
                exit={reduced ? undefined : { y: "-70%", opacity: 0 }}
                transition={{ duration: 0.55, ease }}
              >
                0{active + 1}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex gap-2">
            {questions.map((q, i) => (
              <span
                key={q.h2}
                className={`h-px transition-all duration-500 ${i === active && anyShown ? "w-12 bg-[#F3DFC1]" : "w-6 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <QuestionList questions={questions} revealed={revealed} reveal={reveal} centre={centre} reduced={Boolean(reduced)} />
    </div>
  );
}

function QuestionList({ questions, revealed, reveal, centre, reduced }: { questions: BrandHubQuestion[]; revealed: boolean[]; reveal: (i: number) => void; centre: (i: number, on: boolean) => void; reduced: boolean }) {
  const listRef = useRef<HTMLOListElement>(null);
  // 0 when the top of the list reaches 70% down the viewport, 1 when its bottom does:
  // the tip of the fill is always on that 70% line, which is also where the bullets light.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 70%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <ol ref={listRef} className="relative">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-white/10">
        <motion.span className="block w-0.5 bg-[#406E8E] shadow-[0_0_12px_rgba(191,215,234,0.6)]" style={{ height: reduced ? "100%" : fill }} />
      </span>
      {questions.map((q, i) => (
        <QuestionItem key={q.h2} q={q} index={i} revealed={revealed[i]} onReveal={reveal} onCentre={centre} reduced={reduced} />
      ))}
    </ol>
  );
}

function QuestionItem({ q, index, revealed, onReveal, onCentre, reduced }: { q: BrandHubQuestion; index: number; revealed: boolean; onReveal: (i: number) => void; onCentre: (i: number, on: boolean) => void; reduced: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const atCentre = useInView(ref, { margin: "-45% 0px -45% 0px" });
  // Lit while the top of the item sits above the 70% line, where the fill tip is.
  const crossed = useInView(ref, { margin: "10000px 0px -30% 0px" });
  const lit = reduced || crossed;
  useEffect(() => {
    if (inView) onReveal(index);
  }, [inView, index, onReveal]);
  useEffect(() => {
    onCentre(index, atCentre);
  }, [atCentre, index, onCentre]);
  return (
    <motion.li
      ref={ref}
      className="relative grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7 py-8 lg:py-10 pl-6 sm:pl-8"
      initial={false}
      animate={{ opacity: lit ? 1 : 0.82, y: lit || revealed ? 0 : 24 }}
      transition={{ duration: reduced ? 0 : 0.6, ease }}
    >
      {/* The bullet on the line: lights and blinks once the fill crosses it, dims when it retracts. */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-[2.45rem] lg:top-[2.95rem] z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-2 ring-[#161925]"
        initial={false}
        animate={
          lit
            ? { scale: reduced ? 1 : [1, 1.9, 1, 1.5, 1], backgroundColor: "#F3DFC1", boxShadow: "0 0 0 5px rgba(243,223,193,0.22), 0 0 22px rgba(191,215,234,0.95)" }
            : { scale: 1, backgroundColor: "rgba(255,255,255,0.25)", boxShadow: "0 0 0 0px rgba(243,223,193,0)" }
        }
        transition={{ duration: reduced ? 0 : 0.9, ease, times: [0, 0.25, 0.5, 0.75, 1] }}
      />
      <span className="font-outfit font-semibold text-3xl sm:text-4xl text-[#F3DFC1] tabular-nums leading-none pt-1">0{index + 1}</span>
      <div>
        <h2 className="font-outfit font-semibold text-xl sm:text-2xl leading-snug">{q.h2}</h2>
        <p className="font-manrope text-white/80 text-base leading-relaxed mt-3">{q.body}</p>
        {q.links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {q.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-manrope text-sm font-semibold text-[#BFD7EA] underline underline-offset-4 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}

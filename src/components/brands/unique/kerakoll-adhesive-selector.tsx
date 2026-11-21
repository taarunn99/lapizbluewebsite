"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";

/**
 * Which Kerakoll adhesive? Three choices resolve to one stock product and its
 * EN 12004 class. Products and classes are the ones named on the Kerakoll hub
 * copy (H40 Gel C2 TE S1, H40 Tech C2 TE S2, H40 Extreme R2 T, Biogel No
 * Limits C2 TE S1, Pragma Flex C2 TE); the data sheet governs the order.
 */

type Tile = "ceramic" | "porcelain" | "large";
type Sub = "screed" | "tiles" | "board" | "heated" | "facade";
type Loc = "floor" | "wall" | "wet" | "exterior";

const TILES: { id: Tile; label: string; hint: string }[] = [
  { id: "ceramic", label: "Ceramic", hint: "up to 30 cm" },
  { id: "porcelain", label: "Porcelain", hint: "30 to 60 cm" },
  { id: "large", label: "Large format", hint: "over 60 cm or slabs" },
];
const SUBS: { id: Sub; label: string }[] = [
  { id: "screed", label: "Cement screed" },
  { id: "tiles", label: "Existing tiles" },
  { id: "board", label: "Plasterboard" },
  { id: "heated", label: "Heated screed" },
  { id: "facade", label: "Facade render" },
];
const LOCS: { id: Loc; label: string }[] = [
  { id: "floor", label: "Interior floor" },
  { id: "wall", label: "Wall" },
  { id: "wet", label: "Wet area" },
  { id: "exterior", label: "Exterior" },
];

interface Pick {
  product: string;
  cls: string;
  why: string;
  /** Deformability the class guarantees, mm, EN 12004 (S1 2.5 or more, S2 5 or more). */
  deform: number;
  checks: string[];
}

function resolve(t: Tile, s: Sub, l: Loc): Pick {
  const outside = l === "exterior" || s === "facade";
  const checks: string[] = [];
  if (t === "large") checks.push("Back butter every slab so the bed is full, no voids.");
  if (s === "screed" || s === "heated") checks.push("Prime absorbent screed with Primer Uni before the bed goes down.");
  if (s === "heated") checks.push("Run the heating cycle before tiling and leave movement joints at the bays.");
  if (l === "wet") checks.push("Two coats of Aquastop Nanoflex with the tape in every angle, under the adhesive.");
  if (outside) checks.push("Movement joints at the perimeter and every 9 to 12 m2 outside.");
  if (s === "tiles") checks.push("Degrease and abrade the old glaze, then test adhesion on a sample tile.");
  if (s === "board") checks.push("Check the board is rated for the tile weight and the room is not a pool.");

  if (s === "tiles") return { product: "Biogel No Limits", cls: "C2 TE S1", deform: 2.5, why: "The gel for mixed and difficult substrates, including tile over tile.", checks: checks.slice(0, 3) };
  if (outside || t === "large" || s === "heated") {
    if (t === "large" && (outside || s === "heated")) return { product: "H40 Tech", cls: "C2 TE S2", deform: 5, why: "Slabs that move with the sun every day want the S2 deformability.", checks: checks.slice(0, 3) };
    return { product: "H40 Gel", cls: "C2 TE S1", deform: 2.5, why: "Extended open time for a hot slab, no slip on walls, S1 for terraces.", checks: checks.slice(0, 3) };
  }
  if (l === "wet" || l === "wall" || t === "porcelain") return { product: "H40 Gel", cls: "C2 TE S1", deform: 2.5, why: "One bag for porcelain floors, walls and wet rooms indoors.", checks: checks.slice(0, 3) };
  return { product: "Pragma Flex", cls: "C2 TE", deform: 0, why: "Standard ceramic indoors on a sound screed does not need a deformable bed.", checks: checks.slice(0, 3) };
}

function useCountUp(target: number, ms = 700) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(target);
  useEffect(() => {
    if (reduce) { setV(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      setV(from + (target - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, reduce]);
  return v;
}

function Pills<T extends string>({ name, items, value, onChange }: { name: string; items: { id: T; label: string; hint?: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(it.id)}
            className={`relative min-h-[2.75rem] rounded-full px-4 py-2 text-left font-manrope text-sm transition-colors ${on ? "text-[#161925]" : "text-[#161925]/70 hover:text-[#161925]"}`}
          >
            {on && <motion.span layoutId={`pill-${name}`} className="absolute inset-0 rounded-full bg-[#F3DFC1]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            {!on && <span className="absolute inset-0 rounded-full border border-[#161925]/15" />}
            <span className="relative font-semibold">{it.label}</span>
            {it.hint && <span className="relative ml-1.5 text-xs text-[#23395B]/80">{it.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function KerakollAdhesiveSelector() {
  const [tile, setTile] = useState<Tile>("porcelain");
  const [sub, setSub] = useState<Sub>("screed");
  const [loc, setLoc] = useState<Loc>("floor");
  const pick = useMemo(() => resolve(tile, sub, loc), [tile, sub, loc]);
  const openTime = useCountUp(pick.cls.includes("E") ? 30 : 20);
  const deform = useCountUp(pick.deform);
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#F6F8FA] py-20 lg:py-28" aria-labelledby="kerakoll-selector-h">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <p className="label-sh text-[#406E8E]">Adhesive selector</p>
        <h2 id="kerakoll-selector-h" className="mt-3 font-outfit text-3xl font-semibold leading-tight text-[#161925] sm:text-4xl lg:text-5xl">Which Kerakoll adhesive?</h2>
        <p className="mt-4 max-w-2xl font-manrope text-lg leading-relaxed text-[#161925]/75">Three choices, one bag. The rule is the EN 12004 class: C2 for porcelain, T for walls, E for a hot slab, S1 for a terrace and S2 for slabs that move with the sun.</p>

        <LayoutGroup>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.618fr_1fr]">
            <div className="space-y-8">
              {[
                { n: "01", name: "Tile and size", el: <Pills name="tile" items={TILES} value={tile} onChange={setTile} /> },
                { n: "02", name: "Substrate", el: <Pills name="substrate" items={SUBS} value={sub} onChange={setSub} /> },
                { n: "03", name: "Where it goes", el: <Pills name="location" items={LOCS} value={loc} onChange={setLoc} /> },
              ].map((step) => (
                <div key={step.n} className="grid gap-3 sm:grid-cols-[6.5rem_1fr]">
                  <div>
                    <span className="font-outfit text-3xl font-semibold text-[#406E8E]">{step.n}</span>
                    <p className="label-sh mt-1 text-[#23395B]">{step.name}</p>
                  </div>
                  {step.el}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={pick.product + pick.cls}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-[#161925] p-7 text-white sm:p-9"
              >
                <p className="label-sh text-[#BFD7EA]">Recommended</p>
                <h3 className="mt-3 font-outfit text-3xl font-semibold leading-tight sm:text-4xl">
                  <Link href="/brands/kerakoll/tile-adhesives-and-grouts" className="underline decoration-[#F3DFC1]/60 underline-offset-4 hover:decoration-[#F3DFC1]">{pick.product}</Link>
                </h3>
                <p className="mt-1 font-manrope text-sm text-[#BFD7EA]">{pick.cls}, EN 12004</p>
                <p className="mt-4 font-manrope leading-relaxed text-white/80">{pick.why}</p>

                <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                  <div>
                    <dd className="font-outfit text-4xl font-semibold text-[#F3DFC1]">{Math.round(openTime)}<span className="ml-1 text-lg">min</span></dd>
                    <dt className="mt-1 font-manrope text-xs text-white/60">open time the class guarantees</dt>
                  </div>
                  <div>
                    <dd className="font-outfit text-4xl font-semibold text-[#F3DFC1]">{pick.deform ? deform.toFixed(1) : "0"}<span className="ml-1 text-lg">mm</span></dd>
                    <dt className="mt-1 font-manrope text-xs text-white/60">deformability, {pick.deform ? "at least" : "not rated"}</dt>
                  </div>
                </dl>

                <p className="label-sh mt-7 text-[#BFD7EA]">Check before ordering</p>
                <ul className="mt-3 space-y-2 font-manrope text-sm leading-relaxed text-white/85">
                  {pick.checks.map((c) => (
                    <li key={c} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F3DFC1]" />{c}</li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
          </div>
        </LayoutGroup>

        <p className="mt-8 font-manrope text-sm text-[#23395B]">Rule used: E means at least 30 minutes open time, S1 at least 2.5 mm and S2 at least 5 mm deformability under EN 12004. The Kerakoll data sheet governs the specification and the quotation.</p>
      </div>
    </section>
  );
}

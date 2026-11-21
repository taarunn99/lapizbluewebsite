"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Concrete repair quantity. Area and average depth become kilograms and
 * 25 kg bags for the weberep sequence on the Weber column scene: 314 RD on
 * the bar and the concrete, 331 TX as the fill, 332 FR as the fairing coat.
 * Consumption is an assumed 1.9 kg per m2 per mm of cementitious mortar; the
 * Weber data sheet governs the order.
 */

const DENSITY = 1.9; // kg per m2 per mm, assumed for cementitious repair mortars
const WASTE = 0.1;
const BAG = 25;

type Line = "314" | "331" | "332";
const LINES: { id: Line; name: string; role: string; mm: (depth: number) => number; tone: string }[] = [
  { id: "314", name: "weberep 314 RD", role: "bar primer and bonding slurry", mm: () => 1, tone: "#BFD7EA" },
  { id: "331", name: "weberep 331 TX", role: "thixotropic R4 repair mortar", mm: (d) => d, tone: "#406E8E" },
  { id: "332", name: "weberep 332 FR", role: "fairing coat", mm: () => 2, tone: "#F3DFC1" },
];

const fmt = (n: number, d = 0) => n.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

export default function WeberRepairEstimator() {
  const [area, setArea] = useState(12);
  const [depth, setDepth] = useState(30);
  const [line, setLine] = useState<Line>("331");
  const reduce = useReducedMotion();

  const rows = useMemo(
    () =>
      LINES.map((l) => {
        const mm = l.mm(depth);
        const kg = area * mm * DENSITY * (1 + WASTE);
        return { ...l, mm, kg, bags: Math.ceil(kg / BAG) };
      }),
    [area, depth],
  );
  const active = rows.find((r) => r.id === line)!;
  const totalBags = rows.reduce((s, r) => s + r.bags, 0);

  // Cross section geometry: a 300 mm deep column face, repair scaled to depth.
  const H = 260;
  const scale = 1.6; // px per mm
  const fill = Math.min(depth, 80) * scale;

  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="weber-repair-h">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <p className="label-sh text-[#406E8E]">Repair estimator</p>
        <h2 id="weber-repair-h" className="mt-3 font-outfit text-3xl font-semibold leading-tight text-[#161925] sm:text-4xl lg:text-5xl">Concrete repair quantity</h2>
        <p className="mt-4 max-w-2xl font-manrope text-lg leading-relaxed text-[#161925]/75">Measure the broken out area and the average depth to sound concrete. The estimator returns the bags for each step of the weberep sequence, with wastage built in.</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.618fr]">
          <div className="space-y-8">
            <label className="block">
              <span className="label-sh text-[#23395B]">Repair area, m2</span>
              <input type="number" min={0.5} step={0.5} value={area} onChange={(e) => setArea(Math.max(0, Number(e.target.value)))} className="mt-3 w-full rounded-xl border border-[#161925]/15 bg-[#F6F8FA] px-4 py-3 font-outfit text-2xl text-[#161925] outline-none focus:border-[#406E8E]" />
            </label>
            <label className="block">
              <span className="flex items-baseline justify-between">
                <span className="label-sh text-[#23395B]">Average depth</span>
                <span className="font-outfit text-2xl font-semibold text-[#161925]">{depth} <span className="text-base font-normal text-[#23395B]">mm</span></span>
              </span>
              <input type="range" min={10} max={80} step={5} value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="mt-3 w-full accent-[#406E8E]" aria-label="Average repair depth in millimetres" />
              <span className="mt-1 flex justify-between font-manrope text-xs text-[#23395B]/80"><span>10 mm</span><span>80 mm, build up in layers above 40</span></span>
            </label>
            <div role="radiogroup" aria-label="Line to price" className="grid gap-2">
              {rows.map((r) => (
                <button key={r.id} type="button" role="radio" aria-checked={r.id === line} onClick={() => setLine(r.id)} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${r.id === line ? "border-[#406E8E] bg-[#F6F8FA]" : "border-[#161925]/10 hover:border-[#161925]/30"}`}>
                  <span>
                    <span className="block font-manrope text-sm font-semibold text-[#161925]">{r.name}</span>
                    <span className="block font-manrope text-xs text-[#23395B]">{r.role}, {r.mm} mm</span>
                  </span>
                  <span className="font-outfit text-2xl font-semibold text-[#161925]">{r.bags}<span className="ml-1 text-xs font-normal text-[#23395B]">bags</span></span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
            <figure className="rounded-3xl bg-[#161925] p-5">
              <svg viewBox={`0 0 240 ${H}`} className="h-auto w-full" role="img" aria-label={`Cross section of a column face with ${depth} mm of repair mortar`}>
                <rect x="0" y="0" width="240" height={H} fill="#161925" />
                {/* sound concrete */}
                <rect x="0" y="0" width={110} height={H} fill="#23395B" />
                <g stroke="#161925" strokeWidth="0.6" opacity="0.5">{[30, 70, 110, 150, 190, 230].map((y) => <line key={y} x1="8" y1={y} x2="100" y2={y + 6} />)}</g>
                {/* rebar */}
                <circle cx={104} cy={H / 2} r="7" fill="#F6F8FA" stroke="#BFD7EA" strokeWidth="2" />
                {/* 314 RD slurry */}
                <rect x={110} y="0" width={3} height={H} fill="#BFD7EA" />
                {/* 331 TX fill */}
                <motion.rect x={113} y="0" height={H} fill="#406E8E" initial={false} animate={{ width: fill }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 26 }} />
                {/* 332 FR fairing */}
                <motion.rect y="0" width={4} height={H} fill="#F3DFC1" initial={false} animate={{ x: 113 + fill }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 26 }} />
                <motion.g initial={false} animate={{ x: 113 + fill + 4 }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 26 }}>
                  <line x1="0" y1="18" x2="0" y2={H - 18} stroke="#F6F8FA" strokeDasharray="3 4" strokeWidth="1" />
                  <text x="8" y={H / 2 + 4} fill="#F6F8FA" fontSize="11" fontFamily="var(--font-manrope)">{depth} mm</text>
                </motion.g>
              </svg>
              <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-manrope text-xs text-white/70">
                <span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#23395B] align-middle" />sound concrete</span>
                <span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#BFD7EA] align-middle" />314 RD</span>
                <span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#406E8E] align-middle" />331 TX</span>
                <span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#F3DFC1] align-middle" />332 FR</span>
              </figcaption>
            </figure>

            <div className="flex flex-col justify-between rounded-3xl border border-[#161925]/10 bg-[#F6F8FA] p-7">
              <div>
                <p className="label-sh text-[#406E8E]">{active.name}</p>
                <p className="mt-3 font-outfit text-6xl font-semibold leading-none text-[#161925]">{active.bags}</p>
                <p className="mt-2 font-manrope text-sm text-[#23395B]">bags of {BAG} kg, {fmt(active.kg)} kg with wastage</p>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-[#161925]/10 pt-6">
                <div><dd className="font-outfit text-3xl font-semibold text-[#161925]">{totalBags}</dd><dt className="font-manrope text-xs text-[#23395B]">bags, all three steps</dt></div>
                <div><dd className="font-outfit text-3xl font-semibold text-[#161925]">{fmt(area * depth / 1000, 2)}</dd><dt className="font-manrope text-xs text-[#23395B]">m3 of fill</dt></div>
              </dl>
              <Link href="/brands/weber/repair-and-anchoring" className="mt-8 inline-flex min-h-[3rem] items-center justify-center rounded-full bg-[#161925] px-6 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90">Weber repair and anchoring</Link>
            </div>
          </div>
        </div>

        <p className="mt-8 font-manrope text-sm text-[#23395B]">Formula: kg = area × thickness in mm × {DENSITY} kg per m2 per mm × 1.10 wastage, rounded up to {BAG} kg bags. The {DENSITY} figure is an assumed density for cementitious repair mortars; the weberep data sheet governs the consumption and the quotation.</p>
      </div>
    </section>
  );
}

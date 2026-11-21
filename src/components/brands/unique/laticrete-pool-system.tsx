"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Build the pool tiling system. A wall section in SVG, one layer per Laticrete
 * product on the pool scene and the waterproofing line: HYDRO BAN XP, 254
 * Platinum, Spectralock Pro Premium Grout, Latasil at the movement joints.
 * Hover or tap a layer for product, thickness and the wait before the next
 * step, and the total days before the pool can be filled.
 */

interface Layer {
  id: string;
  name: string;
  product?: string;
  /** Label short enough for the drawing. */
  short: string;
  mm: number;
  tone: string;
  waitDays: number;
  wait: string;
  note: string;
  /** Cures alongside the grout rather than before it. */
  parallel?: boolean;
}

const LAYERS: Layer[] = [
  { id: "shell", name: "Shotcrete shell", short: "Shotcrete shell", mm: 250, tone: "#161925", waitDays: 28, wait: "28 days cure, then water test", note: "Water tested before any finish goes on." },
  { id: "render", name: "Waterproof render", short: "Render", mm: 15, tone: "#F6F8FA", waitDays: 7, wait: "7 days before the membrane", note: "Shapes the shell and takes the membrane." },
  { id: "membrane", name: "Waterproofing membrane", product: "HYDRO BAN XP", short: "HYDRO BAN XP", mm: 2, tone: "#BFD7EA", waitDays: 1, wait: "Flood test after 2 hours, tile next day", note: "Rated for permanent submersion and chlorine." },
  { id: "adhesive", name: "Adhesive bed", product: "Laticrete 254 Platinum", short: "254 Platinum", mm: 6, tone: "#406E8E", waitDays: 1, wait: "Grout after 24 hours", note: "Polymer fortified thin set, full bed, back buttered." },
  { id: "tile", name: "Mosaic or porcelain", short: "Mosaic", mm: 8, tone: "#F3DFC1", waitDays: 0, wait: "No wait of its own", note: "Set within the open time of the bed." },
  { id: "grout", name: "Epoxy grout", product: "Laticrete Spectralock Pro Premium Grout", short: "Spectralock Pro", mm: 8, tone: "#23395B", waitDays: 7, wait: "7 days before immersion", note: "Stain proof, chlorine resistant, no sealing." },
  { id: "sealant", name: "Movement joint sealant", product: "Latasil", short: "Latasil", mm: 8, tone: "#406E8E", waitDays: 7, wait: "7 days cure, cures with the grout", note: "Silicone at the coping, the corners and every change of plane. Ordered against the project.", parallel: true },
];

export default function LaticretePoolSystem() {
  const [active, setActive] = useState<string>("membrane");
  const [newShell, setNewShell] = useState(true);
  const reduce = useReducedMotion();

  const shown = useMemo(() => (newShell ? LAYERS : LAYERS.filter((l) => l.id !== "shell")), [newShell]);
  const total = useMemo(() => {
    const sequential = shown.filter((l) => !l.parallel && l.id !== "grout").reduce((s, l) => s + l.waitDays, 0);
    const tail = Math.max(...shown.filter((l) => l.id === "grout" || l.parallel).map((l) => l.waitDays));
    return sequential + tail;
  }, [shown]);
  const cur = LAYERS.find((l) => l.id === active) ?? LAYERS[2];

  // Section geometry: thin layers get a minimum height so they can be tapped.
  const H = 300;
  const px = (mm: number) => Math.max(14, Math.min(120, mm * 0.42));
  const heights = shown.map((l) => px(l.mm));
  const sum = heights.reduce((a, b) => a + b, 0);
  const k = H / sum;

  return (
    <section className="bg-[#F6F8FA] py-20 lg:py-28" aria-labelledby="laticrete-pool-h">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <p className="label-sh text-[#406E8E]">Pool system</p>
        <h2 id="laticrete-pool-h" className="mt-3 font-outfit text-3xl font-semibold leading-tight text-[#161925] sm:text-4xl lg:text-5xl">Build the pool tiling system</h2>
        <p className="mt-4 max-w-2xl font-manrope text-lg leading-relaxed text-[#161925]/75">Seven layers from the shell to the sealant, each with its product and the wait before the next crew starts. Tap a layer to read it; the total at the bottom is the day the pool can be filled.</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.618fr]">
          <figure className="rounded-3xl bg-white p-5 shadow-[0_1px_0_rgba(22,25,37,0.08)]">
            <svg viewBox={`0 0 260 ${H}`} className="mx-auto h-auto w-full max-w-[420px]" role="img" aria-label="Pool wall section, pool water on the right, shell on the left">
              <rect x="0" y="0" width="260" height={H} fill="#F6F8FA" />
              <rect x="150" y="0" width="110" height={H} fill="#BFD7EA" opacity="0.35" />
              <text x="205" y="22" textAnchor="middle" fill="#23395B" fontSize="10" fontFamily="var(--font-manrope)">pool water</text>
              {(() => {
                let y = 0;
                return shown.map((l, i) => {
                  const h = heights[i] * k;
                  const node = (
                    <g key={l.id} onPointerEnter={() => setActive(l.id)} onClick={() => setActive(l.id)} className="cursor-pointer" role="button" tabIndex={0} aria-label={`${l.name}${l.product ? ", " + l.product : ""}`} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(l.id); } }}>
                      <motion.rect x="0" y={y} width="150" height={h} fill={l.tone} stroke="#F6F8FA" strokeWidth="1" initial={false} animate={{ opacity: active === l.id ? 1 : 0.55 }} transition={{ duration: reduce ? 0 : 0.25 }} />
                      {active === l.id && <motion.rect x="150" y={y} width="4" height={h} fill="#F3DFC1" initial={reduce ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: "50%" }} transition={{ duration: 0.25 }} />}
                      {h > 18 && <text x="8" y={y + h / 2 + 4} fill={l.tone === "#F6F8FA" || l.tone === "#F3DFC1" || l.tone === "#BFD7EA" ? "#161925" : "#FFFFFF"} fontSize="10" fontFamily="var(--font-manrope)">{l.short}</text>}
                    </g>
                  );
                  y += h;
                  return node;
                });
              })()}
            </svg>
            <figcaption className="mt-3 font-manrope text-xs text-[#23395B]">Thin layers are drawn thicker than true so they can be tapped. Thickness in the card is the nominal figure.</figcaption>
          </figure>

          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.article key={cur.id} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="rounded-3xl bg-[#161925] p-7 text-white sm:p-9">
                <p className="label-sh text-[#BFD7EA]">{cur.name}</p>
                <h3 className="mt-3 font-outfit text-3xl font-semibold leading-tight sm:text-4xl">{cur.product ?? cur.name}</h3>
                <p className="mt-4 font-manrope leading-relaxed text-white/80">{cur.note}</p>
                <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                  <div><dd className="font-outfit text-4xl font-semibold text-[#F3DFC1]">{cur.mm}<span className="ml-1 text-lg">mm</span></dd><dt className="mt-1 font-manrope text-xs text-white/60">nominal thickness</dt></div>
                  <div><dd className="font-outfit text-4xl font-semibold text-[#F3DFC1]">{cur.waitDays}<span className="ml-1 text-lg">{cur.waitDays === 1 ? "day" : "days"}</span></dd><dt className="mt-1 font-manrope text-xs text-white/60">{cur.wait}</dt></div>
                </dl>
              </motion.article>
            </AnimatePresence>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center rounded-3xl border border-[#161925]/10 bg-white p-7">
              <div>
                <p className="label-sh text-[#406E8E]">Days before filling</p>
                <p className="mt-2 font-outfit text-6xl font-semibold leading-none text-[#161925]">{total}</p>
                <p className="mt-2 font-manrope text-sm text-[#23395B]">{newShell ? "from the shotcrete pour" : "from the first coat of render on an existing shell"}</p>
              </div>
              <label className="flex items-center gap-3 font-manrope text-sm text-[#161925]">
                <input type="checkbox" checked={newShell} onChange={(e) => setNewShell(e.target.checked)} className="h-5 w-5 accent-[#406E8E]" />
                New shotcrete shell
              </label>
            </div>
            <Link href="/brands/laticrete" className="inline-flex min-h-[3rem] w-fit items-center rounded-full bg-[#161925] px-6 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90">Laticrete products and data sheets</Link>
          </div>
        </div>

        <p className="mt-8 font-manrope text-sm text-[#23395B]">Rule used: waits are added in sequence from shell to adhesive; the grout and the sealant cure together, so the longer of the two is added once. Waits are typical figures at 21 degrees; the Laticrete data sheet for each product governs, and hot weather shortens pot life, not cure.</p>
      </div>
    </section>
  );
}

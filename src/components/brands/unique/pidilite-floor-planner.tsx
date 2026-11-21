"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Self levelling thickness and bags. Area and thickness give Paviland SL 10
 * bags and Paviland Primer R litres, the two products on the Pidilite Puma
 * floor scene. Consumption is an assumed 1.6 kg per m2 per mm for the
 * compound and 0.15 litres per m2 for one coat of primer; the data sheet
 * governs the order.
 */

const DENSITY = 1.6; // kg per m2 per mm, assumed for a CT C20 F6 self levelling compound
const PRIMER = 0.15; // litres per m2, one coat on a cementitious screed, assumed
const BAG = 25;
const WASTE = 0.05;

type Product = "sl10" | "sl10r";
const PRODUCTS: { id: Product; name: string; note: string }[] = [
  { id: "sl10", name: "Paviland SL 10", note: "CT C20 F6, 2 to 10 mm in one pass" },
  { id: "sl10r", name: "Paviland SL 10R", note: "same thickness, faster set for a tight programme" },
];

const fmt = (n: number, d = 0) => n.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

export default function PidiliteFloorPlanner() {
  const [area, setArea] = useState(120);
  const [mm, setMm] = useState(5);
  const [product, setProduct] = useState<Product>("sl10");
  const reduce = useReducedMotion();

  const r = useMemo(() => {
    const kg = area * mm * DENSITY * (1 + WASTE);
    const bags = Math.ceil(kg / BAG);
    const primer = area * PRIMER;
    return { kg, bags, primer, m3: (area * mm) / 1000 };
  }, [area, mm]);
  const name = PRODUCTS.find((p) => p.id === product)!.name;
  const barMax = Math.max(40, Math.ceil(r.bags / 20) * 20);

  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="pidilite-floor-h">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <p className="label-sh text-[#406E8E]">Floor planner</p>
        <h2 id="pidilite-floor-h" className="mt-3 font-outfit text-3xl font-semibold leading-tight text-[#161925] sm:text-4xl lg:text-5xl">Self levelling thickness and bags</h2>
        <p className="mt-4 max-w-2xl font-manrope text-lg leading-relaxed text-[#161925]/75">Vinyl, LVT and thin tile want a flat floor. Set the area and the pour thickness and the planner returns the compound and the primer as one system from one factory.</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.618fr]">
          <div className="space-y-8">
            <label className="block">
              <span className="label-sh text-[#23395B]">Floor area, m2</span>
              <input type="number" min={1} step={5} value={area} onChange={(e) => setArea(Math.max(0, Number(e.target.value)))} className="mt-3 w-full rounded-xl border border-[#161925]/15 bg-[#F6F8FA] px-4 py-3 font-outfit text-2xl text-[#161925] outline-none focus:border-[#406E8E]" />
            </label>
            <label className="block">
              <span className="flex items-baseline justify-between">
                <span className="label-sh text-[#23395B]">Pour thickness</span>
                <span className="font-outfit text-2xl font-semibold text-[#161925]">{mm} <span className="text-base font-normal text-[#23395B]">mm</span></span>
              </span>
              <input type="range" min={3} max={10} step={1} value={mm} onChange={(e) => setMm(Number(e.target.value))} className="mt-3 w-full accent-[#406E8E]" aria-label="Pour thickness in millimetres" />
              <span className="mt-1 flex justify-between font-manrope text-xs text-[#23395B]/80"><span>3 mm</span><span>10 mm, the top of the range</span></span>
            </label>
            <div role="radiogroup" aria-label="Compound" className="grid gap-2">
              {PRODUCTS.map((p) => (
                <button key={p.id} type="button" role="radio" aria-checked={p.id === product} onClick={() => setProduct(p.id)} className={`rounded-xl border px-4 py-3 text-left transition-colors ${p.id === product ? "border-[#406E8E] bg-[#F6F8FA]" : "border-[#161925]/10 hover:border-[#161925]/30"}`}>
                  <span className="block font-manrope text-sm font-semibold text-[#161925]">{p.name}</span>
                  <span className="block font-manrope text-xs text-[#23395B]">{p.note}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#161925] p-7 text-white sm:p-9">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="label-sh text-[#BFD7EA]">{name}</p>
                <p className="mt-3 font-outfit text-7xl font-semibold leading-none text-[#F3DFC1]">{r.bags}</p>
                <p className="mt-2 font-manrope text-sm text-white/70">bags of {BAG} kg, {fmt(r.kg)} kg mixed</p>
              </div>
              <div>
                <p className="label-sh text-[#BFD7EA]">Paviland Primer R</p>
                <p className="mt-3 font-outfit text-7xl font-semibold leading-none text-[#F3DFC1]">{fmt(r.primer, 1)}</p>
                <p className="mt-2 font-manrope text-sm text-white/70">litres, one coat on the screed</p>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-baseline justify-between font-manrope text-xs text-white/60">
                <span>bags on the pallet</span>
                <span>{barMax}</span>
              </div>
              <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-white/10" role="meter" aria-valuemin={0} aria-valuemax={barMax} aria-valuenow={r.bags} aria-label="Bags required against the pallet scale">
                <motion.div className="h-full rounded-full bg-[#406E8E]" initial={false} animate={{ width: `${Math.min(100, (r.bags / barMax) * 100)}%` }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 24 }} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div><p className="font-outfit text-2xl font-semibold">{fmt(r.m3, 2)}</p><p className="font-manrope text-xs text-white/60">m3 poured</p></div>
                <div><p className="font-outfit text-2xl font-semibold">{fmt(mm * DENSITY, 1)}</p><p className="font-manrope text-xs text-white/60">kg per m2 at {mm} mm</p></div>
                <div><p className="font-outfit text-2xl font-semibold">{fmt(BAG / (mm * DENSITY), 1)}</p><p className="font-manrope text-xs text-white/60">m2 per bag</p></div>
              </div>
            </div>

            <Link href="/brands/pidilite-puma" className="mt-8 inline-flex min-h-[3rem] items-center rounded-full bg-[#F3DFC1] px-6 font-manrope text-sm font-semibold text-[#161925] transition-opacity hover:opacity-90">Pidilite Puma products and data sheets</Link>
          </div>
        </div>

        <p className="mt-8 font-manrope text-sm text-[#23395B]">Formula: kg = area × thickness in mm × {DENSITY} kg per m2 per mm × 1.05 wastage, rounded up to {BAG} kg bags; primer = area × {PRIMER} litres per m2. Both rates are assumed for a cementitious compound over a primed screed; the Paviland data sheet governs the consumption and the quotation.</p>
      </div>
    </section>
  );
}

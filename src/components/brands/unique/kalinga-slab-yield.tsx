"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Slabs from square metres. Area and material give the slab count for the
 * Kalinga Stone formats on the hub copy: quartz 3150 by 1450 and 3250 by
 * 1650 at 20 mm, the 3300 by 2000 superjumbo, and the 304 by 125 cm marble
 * and terrazzo slab. Wastage is 15 percent for worktops and 8 for floors.
 */

type Fmt = "q3150" | "q3250" | "q3300" | "marble" | "terrazzo";
type Use = "worktop" | "floor";

const FORMATS: { id: Fmt; label: string; size: string; w: number; h: number; mm: string }[] = [
  { id: "q3150", label: "Engineered quartz", size: "3150 × 1450 mm", w: 3.15, h: 1.45, mm: "20 mm, most of the 69 shades" },
  { id: "q3250", label: "Engineered quartz", size: "3250 × 1650 mm", w: 3.25, h: 1.65, mm: "20 mm, thirteen shades" },
  { id: "q3300", label: "Quartz superjumbo", size: "3300 × 2000 mm", w: 3.3, h: 2.0, mm: "20 mm, Carrara Marmi" },
  { id: "marble", label: "Engineered marble", size: "304 × 125 cm", w: 3.04, h: 1.25, mm: "35 shades, repolishable" },
  { id: "terrazzo", label: "Terrazzo", size: "304 × 125 cm", w: 3.04, h: 1.25, mm: "24 shades, also cut to size" },
];
const WASTE: Record<Use, number> = { worktop: 0.15, floor: 0.08 };

const fmt = (n: number, d = 0) => n.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

export default function KalingaSlabYield() {
  const [area, setArea] = useState(48);
  const [format, setFormat] = useState<Fmt>("q3150");
  const [use, setUse] = useState<Use>("worktop");
  const reduce = useReducedMotion();

  const f = FORMATS.find((x) => x.id === format)!;
  const r = useMemo(() => {
    const slabArea = f.w * f.h;
    const gross = area * (1 + WASTE[use]);
    const slabs = Math.ceil(gross / slabArea);
    return { slabArea, gross, slabs, usable: slabs * slabArea };
  }, [area, f, use]);

  const cells = Math.min(r.slabs, 60);
  const cols = f.h >= 1.6 ? 6 : 8;

  return (
    <section className="bg-[#F6F8FA] py-20 lg:py-28" aria-labelledby="kalinga-yield-h">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <p className="label-sh text-[#406E8E]">Slab yield</p>
        <h2 id="kalinga-yield-h" className="mt-3 font-outfit text-3xl font-semibold leading-tight text-[#161925] sm:text-4xl lg:text-5xl">Slabs from square metres</h2>
        <p className="mt-4 max-w-2xl font-manrope text-lg leading-relaxed text-[#161925]/75">The fabricator nests, the quantity surveyor counts slabs. Enter the finished area and the format and read the slab count with cutting waste built in.</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.618fr]">
          <div className="space-y-8">
            <label className="block">
              <span className="label-sh text-[#23395B]">Finished area, m2</span>
              <input type="number" min={1} step={1} value={area} onChange={(e) => setArea(Math.max(0, Number(e.target.value)))} className="mt-3 w-full rounded-xl border border-[#161925]/15 bg-white px-4 py-3 font-outfit text-2xl text-[#161925] outline-none focus:border-[#406E8E]" />
            </label>
            <div role="radiogroup" aria-label="Material and slab format" className="grid gap-2">
              {FORMATS.map((x) => (
                <button key={x.id} type="button" role="radio" aria-checked={x.id === format} onClick={() => setFormat(x.id)} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${x.id === format ? "border-[#406E8E] bg-white" : "border-[#161925]/10 hover:border-[#161925]/30"}`}>
                  <span><span className="block font-manrope text-sm font-semibold text-[#161925]">{x.label}</span><span className="block font-manrope text-xs text-[#23395B]">{x.mm}</span></span>
                  <span className="font-outfit text-sm font-semibold text-[#23395B]">{x.size}</span>
                </button>
              ))}
            </div>
            <div role="radiogroup" aria-label="Use" className="flex gap-2">
              {(["worktop", "floor"] as Use[]).map((u) => (
                <button key={u} type="button" role="radio" aria-checked={use === u} onClick={() => setUse(u)} className={`min-h-[2.75rem] flex-1 rounded-full border px-4 font-manrope text-sm font-semibold transition-colors ${use === u ? "border-[#161925] bg-[#161925] text-white" : "border-[#161925]/15 text-[#161925]/75"}`}>{u === "worktop" ? "Worktops" : "Floors"}, {Math.round(WASTE[u] * 100)}% waste</button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#161925] p-7 text-white sm:p-9">
            <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end">
              <div>
                <p className="label-sh text-[#BFD7EA]">{f.label}, {f.size}</p>
                <p className="mt-3 font-outfit text-7xl font-semibold leading-none text-[#F3DFC1]">{r.slabs}</p>
                <p className="mt-2 font-manrope text-sm text-white/70">{r.slabs === 1 ? "slab" : "slabs"} to order</p>
              </div>
              <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
                <div><dd className="font-outfit text-2xl font-semibold">{fmt(r.slabArea, 2)}</dd><dt className="font-manrope text-xs text-white/60">net m2 per slab</dt></div>
                <div><dd className="font-outfit text-2xl font-semibold">{fmt(r.gross, 1)}</dd><dt className="font-manrope text-xs text-white/60">m2 with waste</dt></div>
                <div><dd className="font-outfit text-2xl font-semibold">{fmt(r.usable - area, 1)}</dd><dt className="font-manrope text-xs text-white/60">m2 of offcut</dt></div>
              </dl>
            </div>

            <div className="mt-8 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} role="img" aria-label={`${r.slabs} slabs drawn as a grid${r.slabs > cells ? ", first " + cells + " shown" : ""}`}>
              {Array.from({ length: cells }).map((_, i) => (
                <motion.span key={`${format}-${i}`} className="block rounded-[3px] bg-[#F3DFC1]" style={{ aspectRatio: `${f.w} / ${f.h}` }} initial={reduce ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25, delay: reduce ? 0 : Math.min(i * 0.02, 0.6) }} />
              ))}
            </div>
            {r.slabs > cells && <p className="mt-2 font-manrope text-xs text-white/60">Showing {cells} of {r.slabs}.</p>}

            <p className="mt-8 border-t border-white/10 pt-6 font-manrope text-sm leading-relaxed text-white/80">128 shades are held ex stock at Al Sajaa, Sharjah, and ship on the agreed date. Unstocked shades come from the Silvassa plant in four to six weeks, with the date written on the quotation.</p>
            <Link href="/brands/kalinga-stone#kalinga-quote" className="mt-6 inline-flex min-h-[3rem] items-center rounded-full bg-[#F3DFC1] px-6 font-manrope text-sm font-semibold text-[#161925] transition-opacity hover:opacity-90">Send this to the quote form</Link>
          </div>
        </div>

        <p className="mt-8 font-manrope text-sm text-[#23395B]">Formula: slabs = area × (1 + waste) ÷ (slab length × slab width), rounded up. Waste is 15 percent for worktops with cut outs and mitred aprons, 8 percent for floors laid from full slabs; a yield check against the shop drawings replaces both before the order is placed.</p>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Stone care routine builder. Material and stage give the FILA product, its
 * dilution and the interval, drawn as a timeline from handover to the daily
 * round. Products are the ones on the FILA hub copy and the stone care scene:
 * DETERDEK PRO, PS87 PRO, Cleaner PRO, MP90 ECO PLUS, FOB XTREME, Fuganet.
 * Dilutions are the ones the FILA copy states; the data sheet governs.
 */

type Material = "marble" | "terrazzo" | "porcelain" | "stone" | "quartz";
type Stage = "install" | "seal" | "daily" | "periodic";

const MATERIALS: { id: Material; label: string; acid: boolean }[] = [
  { id: "marble", label: "Marble", acid: true },
  { id: "terrazzo", label: "Terrazzo", acid: true },
  { id: "porcelain", label: "Porcelain", acid: false },
  { id: "stone", label: "Natural stone", acid: true },
  { id: "quartz", label: "Quartz", acid: false },
];
const STAGES: { id: Stage; label: string; when: string }[] = [
  { id: "install", label: "After installation", when: "7 to 10 days after grouting" },
  { id: "seal", label: "Sealing", when: "once the floor is clean and dry" },
  { id: "daily", label: "Daily", when: "every shift" },
  { id: "periodic", label: "Periodic", when: "monthly, or on the FM schedule" },
];

interface Step { product: string; dilution: string; interval: string; note: string }

function stepFor(m: Material, s: Stage): Step {
  const acid = MATERIALS.find((x) => x.id === m)!.acid;
  if (s === "install") {
    return acid
      ? { product: "PS87 PRO", dilution: "1:10 to 1:20, rinse", interval: "Once, at handover", note: "Alkaline, so it lifts site dirt and grout film without etching acid sensitive stone." }
      : { product: "DETERDEK PRO", dilution: "1:5 to 1:10, rinse before it dries", interval: "Once, at handover", note: "Acidic descaler for cement haze and efflorescence on porcelain and quartz. Never on marble." };
  }
  if (s === "seal") {
    if (m === "stone") return { product: "FOB XTREME", dilution: "Ready to use, two coats", interval: "Yearly, retest with a water drop", note: "Penetrates honed and textured stone and keeps water out of the bedding." };
    if (m === "porcelain") return { product: "MP90 ECO PLUS", dilution: "Ready to use, one coat on lapped faces", interval: "Yearly, light duty retest", note: "Only polished and lapped porcelain take a sealer; glazed faces take Groutproof on the joints instead." };
    return { product: "MP90 ECO PLUS", dilution: "Ready to use, one or two coats", interval: "Yearly, retest with a water drop", note: "Water based impregnator that sits in the pores, no film and no change in sheen." };
  }
  if (s === "daily") return { product: "Cleaner PRO", dilution: "1:200, no rinse", interval: "Every shift", note: "Neutral pH, so the seal is not stripped by the mop." };
  return acid
    ? { product: "Cleaner PRO", dilution: "1:30, rinse", interval: "Monthly, deep clean", note: "The neutral cleaner at its strong dilution; add Fuganet for discoloured grout." }
    : { product: "PS87 PRO", dilution: "1:10, rinse", interval: "Monthly, deep clean", note: "Degreaser for kitchens, back of house and loading bays; add Fuganet for the joints." };
}

export default function FilaCareRoutine() {
  const [material, setMaterial] = useState<Material>("marble");
  const [stage, setStage] = useState<Stage>("seal");
  const reduce = useReducedMotion();
  const steps = useMemo(() => STAGES.map((s) => ({ ...s, ...stepFor(material, s.id) })), [material]);
  const idx = STAGES.findIndex((s) => s.id === stage);
  const cur = steps[idx];

  const pill = (on: boolean) => `min-h-[2.75rem] rounded-full border px-4 py-2 font-manrope text-sm font-semibold transition-colors ${on ? "border-[#161925] bg-[#161925] text-white" : "border-[#161925]/15 text-[#161925]/75 hover:border-[#161925]/40"}`;

  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="fila-routine-h">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <p className="label-sh text-[#406E8E]">Care routine builder</p>
        <h2 id="fila-routine-h" className="mt-3 font-outfit text-3xl font-semibold leading-tight text-[#161925] sm:text-4xl lg:text-5xl">Stone care routine builder</h2>
        <p className="mt-4 max-w-2xl font-manrope text-lg leading-relaxed text-[#161925]/75">Four steps from the tiler leaving to the facility team mopping. Pick the material and the timeline draws the product, the dilution and the interval for each step.</p>

        <div className="mt-10">
          <p className="label-sh text-[#23395B]">Material</p>
          <div role="radiogroup" aria-label="Material" className="mt-3 flex flex-wrap gap-2">{MATERIALS.map((m) => <button key={m.id} type="button" role="radio" aria-checked={material === m.id} onClick={() => setMaterial(m.id)} className={pill(material === m.id)}>{m.label}</button>)}</div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.618fr_1fr]">
          <ol className="relative" aria-label="Care timeline">
            <div aria-hidden="true" className="absolute left-[11px] top-3 bottom-3 w-px bg-[#161925]/10" />
            <motion.div aria-hidden="true" className="absolute left-[11px] top-3 w-px origin-top bg-[#406E8E]" initial={false} animate={{ height: `calc(${(idx / (STAGES.length - 1)) * 100}% - 1.5rem)` }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 22 }} />
            {steps.map((s, i) => {
              const on = i === idx;
              const done = i <= idx;
              return (
                <li key={s.id} className="relative pl-10 pb-8 last:pb-0">
                  <button type="button" onClick={() => setStage(s.id)} aria-current={on ? "step" : undefined} className="group block w-full text-left">
                    <motion.span aria-hidden="true" className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white" initial={false} animate={{ borderColor: done ? "#406E8E" : "rgba(22,25,37,0.2)", scale: on ? 1.15 : 1 }} transition={{ duration: reduce ? 0 : 0.2 }}>
                      <motion.span className="h-2.5 w-2.5 rounded-full bg-[#406E8E]" initial={false} animate={{ scale: done ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.2 }} />
                    </motion.span>
                    <span className="label-sh text-[#406E8E]">{s.label}</span>
                    <span className={`mt-1 block font-outfit text-2xl font-semibold leading-tight transition-colors ${on ? "text-[#161925]" : "text-[#161925]/55 group-hover:text-[#161925]"}`}>{s.product}</span>
                    <span className="mt-1 block font-manrope text-sm text-[#23395B]">{s.dilution} <span aria-hidden="true">·</span> {s.interval}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <AnimatePresence mode="wait">
            <motion.article key={material + stage} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }} className="h-fit rounded-3xl bg-[#161925] p-7 text-white sm:p-9 lg:sticky lg:top-24">
              <p className="label-sh text-[#BFD7EA]">{cur.label}, {cur.when}</p>
              <h3 className="mt-3 font-outfit text-3xl font-semibold leading-tight sm:text-4xl">{cur.product}</h3>
              <p className="mt-4 font-manrope leading-relaxed text-white/80">{cur.note}</p>
              <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div><dd className="font-outfit text-2xl font-semibold text-[#F3DFC1]">{cur.dilution.split(",")[0]}</dd><dt className="mt-1 font-manrope text-xs text-white/60">dilution, {cur.dilution.split(",").slice(1).join(",").trim() || "as the sheet"}</dt></div>
                <div><dd className="font-outfit text-2xl font-semibold text-[#F3DFC1]">{cur.interval.split(",")[0]}</dd><dt className="mt-1 font-manrope text-xs text-white/60">interval{cur.interval.includes(",") ? ", " + cur.interval.split(",").slice(1).join(",").trim() : ""}</dt></div>
              </dl>
              <Link href="/brands/fila" className="mt-7 inline-flex min-h-[2.75rem] items-center rounded-full bg-[#F3DFC1] px-5 font-manrope text-sm font-semibold text-[#161925] transition-opacity hover:opacity-90">FILA products and data sheets</Link>
            </motion.article>
          </AnimatePresence>
        </div>

        <p className="mt-8 font-manrope text-sm text-[#23395B]">Rule used: acid sensitive stone (marble, terrazzo, limestone) never meets an acidic cleaner; porcelain and quartz take DETERDEK PRO at handover. Dilution is parts product to parts water. The FILA data sheet for each product governs the dilution, the dwell and the yield on the quotation.</p>
      </div>
    </section>
  );
}

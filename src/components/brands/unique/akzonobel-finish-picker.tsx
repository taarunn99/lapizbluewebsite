"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Pick the finish for the room. Room and traffic give the sheen and the Dulux
 * family named on the AkzoNobel hub copy: EasyClean, Velvet Touch,
 * Weathershield, Dulux Professional, the floor coating system. Coverage is
 * the 10 to 12 m2 per litre per coat the interior FAQ states, taken at the
 * low end; the data sheet governs the order.
 */

type Room = "lobby" | "corridor" | "bedroom" | "kitchen" | "facade" | "floor";
type Traffic = "light" | "normal" | "heavy";

const ROOMS: { id: Room; label: string }[] = [
  { id: "lobby", label: "Lobby" },
  { id: "corridor", label: "Corridor" },
  { id: "bedroom", label: "Bedroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "facade", label: "Exterior facade" },
  { id: "floor", label: "Warehouse floor" },
];
const TRAFFIC: { id: Traffic; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "normal", label: "Normal" },
  { id: "heavy", label: "Heavy" },
];

interface Pick { sheen: string; gloss: number; family: string; why: string; coverage: number | null; coats: number }

function resolve(room: Room, traffic: Traffic): Pick {
  if (room === "floor") return { sheen: "Gloss", gloss: 0.9, family: "Dulux floor coating system", why: "Primer, build coat and wear coat, quoted as a system for the traffic and the chemicals.", coverage: null, coats: 3 };
  if (room === "facade") return { sheen: traffic === "heavy" ? "Soft sheen" : "Matt", gloss: traffic === "heavy" ? 0.35 : 0.15, family: "Weathershield", why: "Formulated for surface heat, salt air and the ultraviolet load; two coats over Exterior Stucco and a sealer.", coverage: 10, coats: 2 };
  if (room === "lobby") return { sheen: "Soft sheen", gloss: 0.4, family: "Velvet Touch", why: "The premium finish for the floors a guest sees first, over a Stucco base.", coverage: 10, coats: 2 };
  if (room === "kitchen") return { sheen: "Satin", gloss: 0.55, family: "EasyClean", why: "Grease and splashes wipe off without burnishing the film; anti bacterial for food areas.", coverage: 10, coats: 2 };
  if (room === "corridor") return traffic === "light"
    ? { sheen: "Matt", gloss: 0.15, family: "Dulux Professional", why: "Large areas where coverage and economy matter more than finish.", coverage: 11, coats: 2 }
    : { sheen: "Soft sheen", gloss: 0.4, family: "EasyClean", why: "Scuffs from trolleys and luggage wipe off; the same tinted batch on every repaint.", coverage: 10, coats: 2 };
  return traffic === "heavy"
    ? { sheen: "Soft sheen", gloss: 0.4, family: "EasyClean", why: "A busy room with children or guests wants a washable film.", coverage: 10, coats: 2 }
    : { sheen: "Matt", gloss: 0.15, family: "Velvet Touch", why: "A calm, low sheen finish for a room that sees little wear.", coverage: 10, coats: 2 };
}

function Swatch({ gloss, sheen }: { gloss: number; sheen: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0.3, y: 0.3 });
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setP({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
      }}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#BFD7EA]"
      role="img"
      aria-label={`${sheen} swatch, a highlight that sharpens with the gloss`}
    >
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(${Math.round(90 - gloss * 60)}% ${Math.round(70 - gloss * 45)}% at ${p.x * 100}% ${p.y * 100}%, rgba(255,255,255,${0.25 + gloss * 0.6}), rgba(255,255,255,0) 70%)`, transition: reduce ? "none" : "background 120ms linear" }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `linear-gradient(160deg, rgba(22,25,37,${0.05 + gloss * 0.25}) 0%, rgba(22,25,37,0) 55%)` }} />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <span className="font-outfit text-3xl font-semibold text-[#161925]">{sheen}</span>
        <span className="hidden font-manrope text-xs text-[#23395B] sm:inline">move the mouse to catch the light</span>
      </div>
    </div>
  );
}

const fmt = (n: number, d = 0) => n.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

export default function AkzonobelFinishPicker() {
  const [room, setRoom] = useState<Room>("lobby");
  const [traffic, setTraffic] = useState<Traffic>("normal");
  const [wall, setWall] = useState(180);
  const [coats, setCoats] = useState(2);
  const reduce = useReducedMotion();
  const pick = useMemo(() => resolve(room, traffic), [room, traffic]);
  const litres = pick.coverage ? (wall * coats) / pick.coverage : null;

  const pill = (on: boolean) => `min-h-[2.75rem] rounded-full border px-4 py-2 font-manrope text-sm font-semibold transition-colors ${on ? "border-[#161925] bg-[#161925] text-white" : "border-[#161925]/15 text-[#161925]/75 hover:border-[#161925]/40"}`;

  return (
    <section className="bg-[#F6F8FA] py-20 lg:py-28" aria-labelledby="dulux-finish-h">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <p className="label-sh text-[#406E8E]">Finish picker</p>
        <h2 id="dulux-finish-h" className="mt-3 font-outfit text-3xl font-semibold leading-tight text-[#161925] sm:text-4xl lg:text-5xl">Pick the finish for the room</h2>
        <p className="mt-4 max-w-2xl font-manrope text-lg leading-relaxed text-[#161925]/75">Sheen is a trade off: the higher it is the more it washes and the more it shows the wall. Choose the room and the traffic and read the sheen, the Dulux family and the litres.</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.618fr]">
          <div className="space-y-8">
            <div>
              <p className="label-sh text-[#23395B]">Room</p>
              <div role="radiogroup" aria-label="Room" className="mt-3 flex flex-wrap gap-2">{ROOMS.map((r) => <button key={r.id} type="button" role="radio" aria-checked={room === r.id} onClick={() => setRoom(r.id)} className={pill(room === r.id)}>{r.label}</button>)}</div>
            </div>
            <div>
              <p className="label-sh text-[#23395B]">Traffic</p>
              <div role="radiogroup" aria-label="Traffic" className="mt-3 flex flex-wrap gap-2">{TRAFFIC.map((t) => <button key={t.id} type="button" role="radio" aria-checked={traffic === t.id} onClick={() => setTraffic(t.id)} className={pill(traffic === t.id)}>{t.label}</button>)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="label-sh text-[#23395B]">Wall area, m2</span>
                <input type="number" min={1} step={10} value={wall} onChange={(e) => setWall(Math.max(0, Number(e.target.value)))} className="mt-3 w-full rounded-xl border border-[#161925]/15 bg-white px-4 py-3 font-outfit text-2xl text-[#161925] outline-none focus:border-[#406E8E]" />
              </label>
              <label className="block">
                <span className="label-sh text-[#23395B]">Coats</span>
                <input type="number" min={1} max={3} value={coats} onChange={(e) => setCoats(Math.min(3, Math.max(1, Number(e.target.value))))} className="mt-3 w-full rounded-xl border border-[#161925]/15 bg-white px-4 py-3 font-outfit text-2xl text-[#161925] outline-none focus:border-[#406E8E]" />
              </label>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
            <Swatch gloss={pick.gloss} sheen={pick.sheen} />
            <AnimatePresence mode="wait">
              <motion.article key={pick.family + pick.sheen} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }} className="flex flex-col rounded-3xl bg-[#161925] p-7 text-white">
                <p className="label-sh text-[#BFD7EA]">Dulux family</p>
                <h3 className="mt-3 font-outfit text-3xl font-semibold leading-tight">{pick.family}</h3>
                <p className="mt-3 font-manrope text-sm leading-relaxed text-white/80">{pick.why}</p>
                <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                  <div><dd className="font-outfit text-4xl font-semibold text-[#F3DFC1]">{litres === null ? "Ask" : fmt(Math.ceil(litres))}</dd><dt className="mt-1 font-manrope text-xs text-white/60">{litres === null ? "system rate on the data sheet" : `litres for ${coats} ${coats === 1 ? "coat" : "coats"}`}</dt></div>
                  <div><dd className="font-outfit text-4xl font-semibold text-[#F3DFC1]">{pick.coverage ?? "sys"}</dd><dt className="mt-1 font-manrope text-xs text-white/60">{pick.coverage ? "m2 per litre per coat" : "primer, build, wear coat"}</dt></div>
                </dl>
                <Link href="/brands/akzonobel" className="mt-6 inline-flex min-h-[2.75rem] w-fit items-center rounded-full bg-[#F3DFC1] px-5 font-manrope text-sm font-semibold text-[#161925] transition-opacity hover:opacity-90">Dulux products and data sheets</Link>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 font-manrope text-sm text-[#23395B]">Formula: litres = wall area × coats ÷ coverage, with coverage at the low end of the 10 to 12 m2 per litre per coat a Dulux interior emulsion gives on a sound, primed wall. Textured render and strong colour changes use more; the AkzoNobel data sheet for the line governs the quotation.</p>
      </div>
    </section>
  );
}

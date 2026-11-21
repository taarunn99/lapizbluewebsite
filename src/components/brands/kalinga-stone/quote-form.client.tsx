"use client";

import { useState } from "react";
import { toast } from "sonner";
import { trackLead } from "@/lib/track";

/**
 * The Kalinga Stone project quote form.
 *
 * Google Ads needs one conversion it can learn from, and a submitted BOQ is
 * that conversion. So every Kalinga Stone page carries this form: company,
 * buyer type, project, product, square metres, thickness, emirate, and the
 * BOQ or drawing. It posts to the contact route as an RFQ, lands in Postgres
 * and the CRM, and pushes `form_submission` with form_name `kalinga_quote`.
 */

const BUYERS = ["Main contractor", "Fit out company", "Fabricator or joinery workshop", "Developer or facility manager", "Consultant or designer specifying", "Trader or reseller", "Other"] as const;
const PRODUCTS = ["Quartz", "Engineered marble", "Terrazzo", "Elixir", "Not decided, advise me"] as const;
const THICKNESS = ["20 mm slab (quartz)", "304 x 125 cm slab (marble or terrazzo)", "Cut to size or tiles", "Fluted terrazzo panels", "Not sure"] as const;
const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah", "Outside the UAE"] as const;
const MAX_MB = 8;

export function KalingaQuoteForm({ product: preset = "", source = "kalinga_quote", note = "" }: { product?: string; source?: string; note?: string }) {
  const [f, setF] = useState({ name: "", company: "", buyer: "", project: "", product: preset, sqm: "", thickness: "", emirate: "", email: "", phone: "", notes: note });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [sending, setSending] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((s) => ({ ...s, [k]: e.target.value }));

  const onFile = (x: File | null) => {
    setFileError("");
    if (x && x.size > MAX_MB * 1024 * 1024) { setFile(null); setFileError(`Keep the file under ${MAX_MB} MB, or send it on WhatsApp.`); return; }
    setFile(x);
  };
  const toBase64 = (x: File) => new Promise<string>((res, rej) => { const r = new FileReader(); r.readAsDataURL(x); r.onload = () => res(r.result as string); r.onerror = rej; });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setSending(true);
    const id = toast.loading("Sending the quote request");
    try {
      const attachment = file ? { name: file.name, data: await toBase64(file) } : undefined;
      const message = [
        `Kalinga Stone quote request`,
        `Buyer type: ${f.buyer}`,
        `Project: ${f.project}`,
        `Product: ${f.product}`,
        `Quantity: ${f.sqm} m2`,
        `Thickness or format: ${f.thickness}`,
        f.notes ? `Notes: ${f.notes}` : "",
      ].filter(Boolean).join("\n");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.name, company: f.company, role: f.buyer, emirate: f.emirate, email: f.email, phone: f.phone, message, attachment, channel: "rfq_form", pageUrl: window.location.href }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Could not send it. Please try again.", { id }); return; }
      toast.success("Received. Slab availability and AED pricing come back within one working day.", { id });
      trackLead("rfq_form", { company: f.company, role: f.buyer, emirate: f.emirate, product: `Kalinga Stone ${f.product}`, brand: "kalinga-stone", buttonLocation: source, name: f.name, email: f.email, phone: f.phone });
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "form_submission", form_name: "kalinga_quote", form_id: "kalinga-quote", product: f.product, quantity_sqm: Number(f.sqm) || 0, buyer_type: f.buyer, emirate: f.emirate });
      setF({ name: "", company: "", buyer: "", project: "", product: preset, sqm: "", thickness: "", emirate: "", email: "", phone: "", notes: note });
      setFile(null);
    } catch {
      toast.error("Could not send it. Please try again.", { id });
    } finally {
      setSending(false);
    }
  }

  const field = "w-full h-12 rounded-xl border border-[#161925]/15 bg-white px-4 font-manrope text-sm text-[#161925] placeholder:text-[#161925]/50 focus:border-[#406E8E] focus:outline-none";
  const label = "label-sh mb-1.5 block text-[#161925]/70";

  return (
    <form id="kalinga-quote" onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Kalinga Stone project quote">
      <div><label className={label} htmlFor="kq-company">Company</label><input id="kq-company" required value={f.company} onChange={set("company")} className={field} placeholder="Company name" autoComplete="organization" /></div>
      <div><label className={label} htmlFor="kq-buyer">Buyer type</label>
        <select id="kq-buyer" required value={f.buyer} onChange={set("buyer")} className={field}><option value="">Choose</option>{BUYERS.map((b) => <option key={b}>{b}</option>)}</select></div>
      <div><label className={label} htmlFor="kq-project">Project name</label><input id="kq-project" required value={f.project} onChange={set("project")} className={field} placeholder="Tower, hotel, villa, mall" /></div>
      <div><label className={label} htmlFor="kq-product">Product</label>
        <select id="kq-product" required value={f.product} onChange={set("product")} className={field}><option value="">Choose</option>{PRODUCTS.map((b) => <option key={b}>{b}</option>)}</select></div>
      <div><label className={label} htmlFor="kq-sqm">Quantity, square metres</label><input id="kq-sqm" required type="number" min={1} step={1} inputMode="numeric" value={f.sqm} onChange={set("sqm")} className={field} placeholder="For example 180" /></div>
      <div><label className={label} htmlFor="kq-thickness">Thickness or format</label>
        <select id="kq-thickness" required value={f.thickness} onChange={set("thickness")} className={field}><option value="">Choose</option>{THICKNESS.map((b) => <option key={b}>{b}</option>)}</select></div>
      <div><label className={label} htmlFor="kq-emirate">Emirate</label>
        <select id="kq-emirate" required value={f.emirate} onChange={set("emirate")} className={field}><option value="">Choose</option>{EMIRATES.map((b) => <option key={b}>{b}</option>)}</select></div>
      <div><label className={label} htmlFor="kq-name">Your name</label><input id="kq-name" required value={f.name} onChange={set("name")} className={field} autoComplete="name" /></div>
      <div><label className={label} htmlFor="kq-email">Work email</label><input id="kq-email" required type="email" value={f.email} onChange={set("email")} className={field} autoComplete="email" /></div>
      <div><label className={label} htmlFor="kq-phone">Phone or WhatsApp</label><input id="kq-phone" required type="tel" value={f.phone} onChange={set("phone")} className={field} autoComplete="tel" /></div>
      <div className="sm:col-span-2"><label className={label} htmlFor="kq-notes">Shades, finishes, dates (optional)</label><textarea id="kq-notes" rows={3} value={f.notes} onChange={set("notes")} className="w-full rounded-xl border border-[#161925]/15 bg-white px-4 py-3 font-manrope text-sm text-[#161925] placeholder:text-[#161925]/50 focus:border-[#406E8E] focus:outline-none" placeholder="Calacatta Lazza for the vanities, honed finish, required by March" /></div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="kq-file">BOQ, drawing or schedule (optional, up to {MAX_MB} MB)</label>
        <input id="kq-file" type="file" accept=".pdf,.xlsx,.xls,.csv,.docx,.doc,.dwg,.jpg,.jpeg,.png" onChange={(e) => onFile(e.target.files?.[0] ?? null)} className="block w-full font-manrope text-sm text-[#161925] file:mr-4 file:rounded-full file:border-0 file:bg-[#161925] file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-white" />
        {fileError && <p className="mt-1 font-manrope text-sm text-[#8a1c1c]">{fileError}</p>}
      </div>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={sending} className="inline-flex min-h-[3rem] items-center rounded-full bg-[#161925] px-7 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
          Request slab availability and pricing
        </button>
        <p className="font-manrope text-xs text-[#161925]/60">AED pricing and stock position at Al Sajaa, usually within one working day.</p>
      </div>
    </form>
  );
}

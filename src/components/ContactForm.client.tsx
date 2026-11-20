"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { trackLead } from "@/lib/track";

/**
 * The enquiry form, and the trade account application in its other variant.
 *
 * It used to take a name, an email, a phone and a message, with one field
 * doing duty as "name and company", which is why every lead arrived looking
 * the same and the sales desk could not tell a procurement engineer from a
 * passer by. Company, role and emirate are what the lead mix is measured on
 * in the CRM now, and a BOQ or a drawing can come with the message.
 */

export const ROLES = [
  "Main contractor",
  "Subcontractor or applicator",
  "Consultant or engineer",
  "Quantity surveyor or procurement",
  "Developer or facility manager",
  "Reseller or retailer",
  "Other",
] as const;

export const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah", "Outside the UAE"] as const;

const MAX_FILE_MB = 8;
const ACCEPT = ".pdf,.xlsx,.xls,.csv,.docx,.doc,.dwg,.jpg,.jpeg,.png";

interface Props {
  /** "enquiry" is the contact form; "trade-account" adds TRN and volume and asks for the trade licence. */
  variant?: "enquiry" | "trade-account";
}

export default function ContactForm({ variant = "enquiry" }: Props) {
  const router = useRouter();
  const trade = variant === "trade-account";

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [emirate, setEmirate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [trn, setTrn] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-spam honeypot
  const [sending, setSending] = useState(false);

  // this mirrors the LEFT checkbox that is outside the form
  const [agreeChecked, setAgreeChecked] = useState(false);

  // watch the left checkbox (#agree) and keep a mirror flag in state
  useEffect(() => {
    const el = document.getElementById("agree") as HTMLInputElement | null;
    if (!el) {
      // The trade account page has no outside checkbox; consent is the submit itself.
      setAgreeChecked(true);
      return;
    }
    const sync = () => setAgreeChecked(el.checked);
    sync();
    el.addEventListener("change", sync);
    return () => el.removeEventListener("change", sync);
  }, []);

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const isValid = useMemo(() => {
    const hasBasics = name.trim() && company.trim() && role && email.trim() && phone.trim() && (trade || message.trim());
    const tradeOk = !trade || (trn.trim() && file);
    return Boolean(hasBasics && tradeOk && agreeChecked && !fileError);
  }, [name, company, role, email, phone, message, trade, trn, file, agreeChecked, fileError]);

  const onFile = (f: File | null) => {
    setFileError("");
    if (!f) return setFile(null);
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setFile(null);
      setFileError(`Keep the file under ${MAX_FILE_MB} MB, or send it on WhatsApp.`);
      return;
    }
    setFile(f);
  };

  const toBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!isValid) {
      setTouched({ name: true, company: true, role: true, email: true, phone: true, message: true, trn: true, file: true });
      form.reportValidity();
      return;
    }

    setSending(true);
    const toastId = toast.loading(trade ? "Sending your application" : "Sending your enquiry");

    try {
      const attachment = file ? { name: file.name, data: await toBase64(file) } : undefined;
      const channel = trade ? "trade_account_form" : attachment ? "rfq_form" : "contact_form";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          role,
          emirate,
          email,
          phone,
          message: trade && !message.trim() ? `Trade account application. Expected monthly volume: ${monthlyVolume || "not stated"}.` : message,
          trn: trade ? trn : undefined,
          monthlyVolume: trade ? monthlyVolume : undefined,
          attachment,
          channel,
          pageUrl: window.location.href,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Could not send it. Please try again.", { id: toastId });
        return;
      }

      toast.success(trade ? "Application received. The accounts team will come back to you." : "Sent. The Dubai desk will come back to you within one working day.", { id: toastId });

      trackLead(channel, { company, role, emirate, name, email, phone, buttonLocation: trade ? "trade_account" : "contact_form" });
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "form_submission", form_name: channel, form_id: "lapiz-contact", role, emirate });

      setTimeout(() => {
        router.push("/thank-you");
      }, 1500);

      setName(""); setCompany(""); setRole(""); setEmirate(""); setEmail(""); setPhone(""); setMessage(""); setTrn(""); setMonthlyVolume(""); setFile(null);
      setTouched({});
      const checkboxEl = document.getElementById("agree") as HTMLInputElement | null;
      if (checkboxEl) checkboxEl.checked = false;
    } catch {
      toast.error("Could not send it. Please try again.", { id: toastId });
    } finally {
      setSending(false);
    }
  }

  const inputBase =
    "w-full h-[56px] rounded-[20px] px-5 text-[#17212f] placeholder-[#17212f]/80 outline-none ring-1 ring-white/20 focus:ring-white/40 bg-white/10";
  const selectBase = `${inputBase} appearance-none bg-white/10`;
  const err = "mt-1 text-sm text-white";

  return (
    <form id="lapiz-contact" onSubmit={handleSubmit} className="relative" noValidate={false}>
      {/* Honeypot - hidden from users, catches bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        aria-hidden="true"
      />
      <div className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-5 sm:p-6 md:p-7 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Your name" aria-label="Your name" autoComplete="name" className={inputBase} />
            {touched.name && !name.trim() && <p className={err}>Please enter your name.</p>}
          </div>
          <div>
            <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, company: true }))}
              placeholder="Company" aria-label="Company" autoComplete="organization" className={inputBase} />
            {touched.company && !company.trim() && <p className={err}>Please enter the company name.</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <select required value={role} onChange={(e) => setRole(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, role: true }))}
              aria-label="Your role" className={`${selectBase} ${role ? "" : "text-[#17212f]/80"}`}>
              <option value="">Your role</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {touched.role && !role && <p className={err}>Please pick the closest role.</p>}
          </div>
          <div>
            <select value={emirate} onChange={(e) => setEmirate(e.target.value)} aria-label="Emirate of the project" className={`${selectBase} ${emirate ? "" : "text-[#17212f]/80"}`}>
              <option value="">Emirate of the project (optional)</option>
              {EMIRATES.map((em) => (
                <option key={em} value={em}>{em}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="Work email" aria-label="Work email" autoComplete="email" className={inputBase} />
            {touched.email && !email.trim() && <p className={err}>Please enter your email.</p>}
          </div>
          <div>
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              placeholder="Phone or WhatsApp" aria-label="Phone or WhatsApp" autoComplete="tel" className={inputBase} />
            {touched.phone && !phone.trim() && <p className={err}>Please enter your phone number.</p>}
          </div>
        </div>

        {trade && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <input type="text" required value={trn} onChange={(e) => setTrn(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, trn: true }))}
                placeholder="TRN (15 digits)" aria-label="Tax registration number" inputMode="numeric" className={inputBase} />
              {touched.trn && !trn.trim() && <p className={err}>Please enter the company TRN.</p>}
            </div>
            <div>
              <select value={monthlyVolume} onChange={(e) => setMonthlyVolume(e.target.value)} aria-label="Expected monthly volume" className={`${selectBase} ${monthlyVolume ? "" : "text-[#17212f]/80"}`}>
                <option value="">Expected monthly volume</option>
                <option>Under AED 25,000</option>
                <option>AED 25,000 to 100,000</option>
                <option>AED 100,000 to 500,000</option>
                <option>Over AED 500,000</option>
              </select>
            </div>
          </div>
        )}

        <div className="mt-4">
          <textarea required={!trade} value={message} onChange={(e) => setMessage(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            placeholder={trade ? "Projects you are buying for, brands you need, anything the accounts team should know (optional)" : "Products and quantities, or describe the job: area, substrate, tile size, required by date"}
            aria-label={trade ? "Notes for the accounts team" : "Products, quantities and the job"} rows={trade ? 4 : 6}
            className="w-full rounded-[20px] px-5 py-4 text-[#17212f] placeholder-[#17212f]/80 outline-none ring-1 ring-white/20 focus:ring-white/40 bg-white/10" />
          {!trade && touched.message && !message.trim() && <p className={err}>Tell us what you need.</p>}
        </div>

        {/* The BOQ, the drawing, or the trade licence. Optional on an enquiry, required for an account. */}
        <div className="mt-4">
          <label className="block">
            <span className="block font-manrope text-sm text-white md:text-[#23395B] mb-2">
              {trade ? "Trade licence (PDF or image)" : "Attach the BOQ or a drawing (optional)"}
            </span>
            <input type="file" accept={ACCEPT} required={trade} onChange={(e) => onFile(e.target.files?.[0] ?? null)} onBlur={() => setTouched((t) => ({ ...t, file: true }))}
              aria-label={trade ? "Trade licence" : "BOQ or drawing"}
              className="block w-full text-sm text-[#17212f] file:mr-4 file:rounded-full file:border-0 file:bg-[#161925] file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:opacity-90" />
          </label>
          {fileError && <p className={err}>{fileError}</p>}
          {trade && touched.file && !file && !fileError && <p className={err}>Please attach the trade licence.</p>}
          <p className="mt-2 font-manrope text-xs text-white/80 md:text-[#23395B]/70">PDF, Excel, Word, DWG or an image, up to {MAX_FILE_MB} MB.</p>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={!isValid || sending}
            className="inline-flex items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#161925,#535e8b)] px-8 h-[56px] text-white text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {trade ? "Apply for a trade account" : "Send enquiry"}
          </button>
        </div>
      </div>
    </form>
  );
}

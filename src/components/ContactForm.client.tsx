"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
 *
 * Laid out as three numbered steps on a white panel, the same grammar as the
 * careers form, so the home page, the contact page and the trade account page
 * read as one family.
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

const NAVY = "#161925";
const BRAND = "#406E8E";
const CREAM = "#F3DFC1";
const ERROR = "#8a1c1c";

const inputBase =
  "w-full rounded-xl border border-[#161925]/15 bg-white px-4 font-manrope text-[15px] text-[#161925] placeholder:text-[#23395B]/45 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#406E8E] focus:ring-2 focus:ring-[#406E8E]/35";
const selectBase = `${inputBase} h-11 appearance-none pr-11`;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface Props {
  /** "enquiry" is the contact form; "trade-account" adds TRN and volume and asks for the trade licence. */
  variant?: "enquiry" | "trade-account";
}

/* One numbered step of the enquiry. Reveals once as it scrolls into view. */
function Step({
  number,
  title,
  children,
  last = false,
}: {
  number: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  const hidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
  const shown = { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`border-t border-[#161925]/10 pt-3 ${last ? "pb-0" : "pb-3.5"}`}
    >
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-outfit text-3xl font-light leading-none text-[#406E8E] md:text-4xl">{number}</span>
        <h2 className="font-outfit text-xl font-semibold leading-tight text-[#161925] md:text-2xl">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | null;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-manrope text-sm font-semibold text-[#161925]">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 font-manrope text-sm" style={{ color: ERROR }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* Chevron for the selects, drawn once so every select wears the same one. */
function Chevron() {
  return (
    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#23395B]" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );
}

export default function ContactForm({ variant = "enquiry" }: Props) {
  const router = useRouter();
  const trade = variant === "trade-account";

  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    company: `${uid}-company`,
    role: `${uid}-role`,
    emirate: `${uid}-emirate`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    trn: `${uid}-trn`,
    volume: `${uid}-volume`,
    message: `${uid}-message`,
    file: `${uid}-file`,
  };

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
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  /* A dropped file skips the picker's accept filter, so the same list is checked by extension here. */
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    setTouched((t) => ({ ...t, file: true }));
    const f = e.dataTransfer.files?.[0] ?? null;
    if (!f) return;
    const ext = `.${f.name.split(".").pop()?.toLowerCase() ?? ""}`;
    if (!ACCEPT.split(",").includes(ext)) {
      setFile(null);
      setFileError("PDF, Excel, Word, DWG or an image, please.");
      return;
    }
    onFile(f);
  };

  const openPicker = () => fileInputRef.current?.click();

  const clearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      if (fileInputRef.current) fileInputRef.current.value = "";
      const checkboxEl = document.getElementById("agree") as HTMLInputElement | null;
      if (checkboxEl) checkboxEl.checked = false;
    } catch {
      toast.error("Could not send it. Please try again.", { id: toastId });
    } finally {
      setSending(false);
    }
  }

  const fileRequiredError = trade && touched.file && !file && !fileError ? "Please attach the trade licence." : null;
  const fileMessage = fileError || fileRequiredError;
  const fileLabel = trade ? "Trade licence (PDF or image)" : "Attach the BOQ or a drawing (optional)";

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

      <div className="rounded-2xl border border-[#161925]/10 bg-white/95 p-5 shadow-[0_24px_60px_-32px_rgba(22,25,37,0.35)] backdrop-blur sm:p-6 lg:p-6">
        <Step number="01" title="Who is asking">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field id={ids.name} label="Your name" error={touched.name && !name.trim() ? "Please enter your name." : null}>
              <input
                id={ids.name}
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={touched.name && !name.trim() ? true : undefined}
                className={`${inputBase} h-11`}
              />
            </Field>
            <Field id={ids.company} label="Company" error={touched.company && !company.trim() ? "Please enter the company name." : null}>
              <input
                id={ids.company}
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, company: true }))}
                placeholder="Company"
                autoComplete="organization"
                aria-invalid={touched.company && !company.trim() ? true : undefined}
                className={`${inputBase} h-11`}
              />
            </Field>
            <Field id={ids.role} label="Your role" error={touched.role && !role ? "Please pick the closest role." : null}>
              <div className="relative">
                <select
                  id={ids.role}
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, role: true }))}
                  aria-invalid={touched.role && !role ? true : undefined}
                  className={`${selectBase} ${role ? "" : "text-[#23395B]/45"}`}
                >
                  <option value="">Choose the closest</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>
            <Field id={ids.emirate} label="Emirate of the project (optional)">
              <div className="relative">
                <select
                  id={ids.emirate}
                  value={emirate}
                  onChange={(e) => setEmirate(e.target.value)}
                  className={`${selectBase} ${emirate ? "" : "text-[#23395B]/45"}`}
                >
                  <option value="">Choose an emirate</option>
                  {EMIRATES.map((em) => (
                    <option key={em} value={em}>{em}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>
          </div>
        </Step>

        <Step number="02" title="How to reach you">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field id={ids.email} label="Work email" error={touched.email && !email.trim() ? "Please enter your email." : null}>
              <input
                id={ids.email}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="you@company.com"
                autoComplete="email"
                aria-invalid={touched.email && !email.trim() ? true : undefined}
                className={`${inputBase} h-11`}
              />
            </Field>
            <Field id={ids.phone} label="Phone or WhatsApp" error={touched.phone && !phone.trim() ? "Please enter your phone number." : null}>
              <input
                id={ids.phone}
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                placeholder="+971 50 000 0000"
                autoComplete="tel"
                aria-invalid={touched.phone && !phone.trim() ? true : undefined}
                className={`${inputBase} h-11`}
              />
            </Field>
          </div>
        </Step>

        <Step number="03" title={trade ? "The trade account" : "The enquiry"} last>
          <div className="space-y-3">
            {trade && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field id={ids.trn} label="TRN (15 digits)" error={touched.trn && !trn.trim() ? "Please enter the company TRN." : null}>
                  <input
                    id={ids.trn}
                    type="text"
                    required
                    value={trn}
                    onChange={(e) => setTrn(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, trn: true }))}
                    placeholder="100000000000003"
                    inputMode="numeric"
                    aria-invalid={touched.trn && !trn.trim() ? true : undefined}
                    className={`${inputBase} h-11`}
                  />
                </Field>
                <Field id={ids.volume} label="Expected monthly volume">
                  <div className="relative">
                    <select
                      id={ids.volume}
                      value={monthlyVolume}
                      onChange={(e) => setMonthlyVolume(e.target.value)}
                      className={`${selectBase} ${monthlyVolume ? "" : "text-[#23395B]/45"}`}
                    >
                      <option value="">Choose a range</option>
                      <option>Under AED 25,000</option>
                      <option>AED 25,000 to 100,000</option>
                      <option>AED 100,000 to 500,000</option>
                      <option>Over AED 500,000</option>
                    </select>
                    <Chevron />
                  </div>
                </Field>
              </div>
            )}

            <Field
              id={ids.message}
              label={trade ? "Notes for the accounts team (optional)" : "Products, quantities and the job"}
              error={!trade && touched.message && !message.trim() ? "Tell us what you need." : null}
            >
              <textarea
                id={ids.message}
                required={!trade}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                placeholder={trade ? "Projects you are buying for, brands you need, anything the accounts team should know (optional)" : "Products and quantities, or describe the job: area, substrate, tile size, required by date"}
                rows={2}
                aria-invalid={!trade && touched.message && !message.trim() ? true : undefined}
                className={`${inputBase} resize-y py-3 leading-relaxed`}
              />
            </Field>

            {/* The BOQ, the drawing, or the trade licence. Optional on an enquiry, required for an account. */}
            <div>
              <span id={`${ids.file}-label`} className="mb-2 block font-manrope text-sm font-semibold text-[#161925]">
                {fileLabel}
              </span>
              <input
                ref={fileInputRef}
                id={ids.file}
                type="file"
                accept={ACCEPT}
                required={trade}
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />
              <div
                role="button"
                tabIndex={0}
                aria-labelledby={`${ids.file}-label`}
                aria-describedby={fileMessage ? `${ids.file}-error` : `${ids.file}-hint`}
                onClick={openPicker}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPicker();
                  }
                }}
                onBlur={() => setTouched((t) => ({ ...t, file: true }))}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!dragging) setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`group flex min-h-[3.75rem] cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed bg-white px-5 py-5 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus-visible:border-[#406E8E] focus-visible:ring-2 focus-visible:ring-[#406E8E]/35 ${
                  dragging
                    ? "border-[#406E8E] bg-[#BFD7EA]/30"
                    : file
                      ? "border-[#406E8E]/60"
                      : "border-[#161925]/25 hover:border-[#406E8E]"
                }`}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: file ? NAVY : "#BFD7EA", color: file ? CREAM : NAVY }}
                    aria-hidden="true"
                  >
                    {file ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 16V4" />
                        <path d="m6 10 6-6 6 6" />
                        <path d="M4 20h16" />
                      </svg>
                    )}
                  </span>
                  <div className="min-w-0 font-manrope">
                    {file ? (
                      <>
                        <p className="truncate text-[15px] font-semibold text-[#161925]">{file.name}</p>
                        <p className="mt-0.5 text-sm text-[#23395B]">{formatBytes(file.size)}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-[15px] font-semibold text-[#161925]">
                          {trade ? "Drop the trade licence here or " : "Drop the file here or "}
                          <span style={{ color: BRAND }}>browse</span>
                        </p>
                        <p id={`${ids.file}-hint`} className="mt-0.5 text-sm text-[#23395B]">
                          PDF, Excel, Word, DWG or an image, up to {MAX_FILE_MB} MB.
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {file ? (
                  <button
                    type="button"
                    onClick={clearFile}
                    className="shrink-0 rounded-full px-3 py-1.5 font-manrope text-xs font-semibold text-[#23395B] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#406E8E]/35"
                  >
                    Replace
                  </button>
                ) : null}
              </div>
              {fileMessage ? (
                <p id={`${ids.file}-error`} role="alert" className="mt-2 font-manrope text-sm" style={{ color: ERROR }}>
                  {fileMessage}
                </p>
              ) : null}
            </div>
          </div>
        </Step>

        <div className="mt-4 flex flex-col gap-3 border-t border-[#161925]/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-manrope text-sm text-[#23395B]">
            {trade ? "The accounts team usually confirms within two working days." : "The Dubai desk replies within one working day."}
          </p>
          <button
            type="submit"
            disabled={!isValid || sending}
            className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#161925] pl-7 pr-6 font-manrope text-[15px] font-semibold text-white transition-[opacity,background-color] duration-200 hover:bg-[#23395B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#406E8E] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#161925]"
          >
            <span>{trade ? "Apply for a trade account" : "Send enquiry"}</span>
            <span
              className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
              style={{ backgroundColor: CREAM, color: NAVY }}
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

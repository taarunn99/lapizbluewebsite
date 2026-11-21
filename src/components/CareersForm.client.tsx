"use client";

import { useCallback, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { toast } from "sonner";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const NAVY = "#161925";
const BRAND = "#406E8E";
const CREAM = "#F3DFC1";
const ERROR = "#8a1c1c";

const inputBase =
  "w-full rounded-xl border border-[#161925]/15 bg-white px-4 font-manrope text-[15px] text-[#161925] placeholder:text-[#23395B]/45 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#406E8E] focus:ring-2 focus:ring-[#406E8E]/35";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* One numbered step of the application. Reveals once as it scrolls into view. */
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
      className={`border-t border-[#161925]/10 pt-7 ${last ? "pb-2" : "pb-9"}`}
    >
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-outfit text-3xl font-light leading-none text-[#406E8E] md:text-4xl">{number}</span>
        <h3 className="font-outfit text-xl font-semibold leading-tight text-[#161925] md:text-2xl">{title}</h3>
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

export default function CareersForm() {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    message: `${uid}-message`,
    resume: `${uid}-resume`,
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValid = useMemo(() => {
    const hasBasics = name.trim() && email.trim() && phone.trim() && message.trim();
    return Boolean(hasBasics && resume);
  }, [name, email, phone, message, resume]);

  /* Same checks as before: size first, then PDF or Word, with the same toasts. */
  const acceptFile = useCallback((file: File | undefined) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 20MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setResume(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    setTouched((t) => ({ ...t, resume: true }));
    acceptFile(e.dataTransfer.files?.[0]);
  };

  const openPicker = () => fileInputRef.current?.click();

  const clearResume = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValid) {
      setTouched({ name: true, email: true, phone: true, message: true, resume: true });
      return;
    }

    setIsSubmitting(true);

    // Convert file to base64
    const toBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const resumeBase64 = resume ? await toBase64(resume) : null;

      await toast.promise(
        fetch("/api/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
            resume: resumeBase64,
            resumeName: resume?.name,
          }),
        }).then(async (r) => {
          if (!r.ok) {
            const errorData = await r.json();
            throw new Error(errorData.error || "Failed to submit application");
          }
          return r.json();
        }),
        {
          loading: "Submitting your application…",
          success: "Success! Your application has been submitted. We'll review it and get back to you soon.",
          error: "Could not submit the application. Please try again.",
        }
      );

      // Clear form after successful submission
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setResume(null);
      setTouched({});
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === "development") {
        console.error("Submit error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  /* Left column photograph: a slow drift of a few percent as the spread scrolls. */
  const photoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const resumeError = touched.resume && !resume ? "Please upload your resume." : null;

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="grid grid-cols-1 gap-10 rounded-3xl bg-[#F6F8FA] p-5 sm:p-8 lg:grid-cols-[1fr_1.618fr] lg:gap-14 lg:p-12">
        {/* Left column: photograph and three short lines */}
        <aside className="min-w-0">
          <div
            ref={photoRef}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#23395B] lg:aspect-[2/3]"
          >
            <motion.div className="absolute inset-0 scale-[1.1]" style={{ y: reduced ? 0 : drift }}>
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/contactus/careers-office-640.avif 640w, /images/contactus/careers-office-1200.avif 1200w, /images/contactus/careers-office-1600.avif 1600w"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
                <source
                  type="image/webp"
                  srcSet="/images/contactus/careers-office-640.webp 640w, /images/contactus/careers-office-1200.webp 1200w, /images/contactus/careers-office-1600.webp 1600w"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
                <img
                  src="/images/contactus/careers-office-1200.webp"
                  alt="A desk at the Lapiz Blue office with drawings, stone samples and the Dubai skyline behind"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
            </motion.div>
            {/* Soft navy wash at the top so the cream running head reads over the sky */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#161925]/70 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute left-5 top-5 flex items-center gap-3">
              <span className="h-px w-6" style={{ backgroundColor: CREAM }} aria-hidden="true" />
              <span className="label-sh" style={{ color: CREAM }}>
                Careers at Lapiz Blue
              </span>
            </div>
          </div>

          <ul className="mt-6 space-y-3 font-manrope text-[15px] leading-snug text-[#23395B]">
            {[
              "Three branches, Dubai, Abu Dhabi, Sharjah",
              "Sales, logistics, technical and admin roles",
              "We reply to every application",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-[0.6em] h-px w-4 shrink-0 bg-[#406E8E]" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right column: the application in three numbered steps */}
        <form onSubmit={handleSubmit} noValidate className="min-w-0">
          <Step number="01" title="Who you are">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id={ids.name} label="Full name" error={touched.name && !name.trim() ? "Please enter your name." : null}>
                  <input
                    id={ids.name}
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    placeholder="Your name as it appears on your CV"
                    aria-invalid={touched.name && !name.trim() ? true : undefined}
                    className={`${inputBase} h-12`}
                  />
                </Field>
              </div>
              <Field id={ids.email} label="Email" error={touched.email && !email.trim() ? "Please enter your email." : null}>
                <input
                  id={ids.email}
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="you@example.com"
                  aria-invalid={touched.email && !email.trim() ? true : undefined}
                  className={`${inputBase} h-12`}
                />
              </Field>
              <Field id={ids.phone} label="Phone" error={touched.phone && !phone.trim() ? "Please enter your phone number." : null}>
                <input
                  id={ids.phone}
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  placeholder="+971 50 000 0000"
                  aria-invalid={touched.phone && !phone.trim() ? true : undefined}
                  className={`${inputBase} h-12`}
                />
              </Field>
            </div>
          </Step>

          <Step number="02" title="Why Lapiz Blue">
            <Field
              id={ids.message}
              label="Tell us about yourself and the role you are after"
              error={touched.message && !message.trim() ? "Please enter a message." : null}
            >
              <textarea
                id={ids.message}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                placeholder="A few lines on your experience and why you would be a good fit"
                rows={6}
                aria-invalid={touched.message && !message.trim() ? true : undefined}
                className={`${inputBase} resize-y py-3 leading-relaxed`}
              />
            </Field>
          </Step>

          <Step number="03" title="Your CV" last>
            <span id={`${ids.resume}-label`} className="mb-2 block font-manrope text-sm font-semibold text-[#161925]">
              Resume
            </span>
            <input
              ref={fileInputRef}
              id={ids.resume}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            />
            <div
              role="button"
              tabIndex={0}
              aria-labelledby={`${ids.resume}-label`}
              aria-describedby={resumeError ? `${ids.resume}-error` : `${ids.resume}-hint`}
              onClick={openPicker}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPicker();
                }
              }}
              onBlur={() => setTouched((t) => ({ ...t, resume: true }))}
              onDragOver={(e) => {
                e.preventDefault();
                if (!dragging) setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`group flex min-h-[7.5rem] cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed bg-white px-5 py-5 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus-visible:border-[#406E8E] focus-visible:ring-2 focus-visible:ring-[#406E8E]/35 ${
                dragging
                  ? "border-[#406E8E] bg-[#BFD7EA]/30"
                  : resume
                    ? "border-[#406E8E]/60"
                    : "border-[#161925]/25 hover:border-[#406E8E]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: resume ? NAVY : "#BFD7EA", color: resume ? CREAM : NAVY }}
                  aria-hidden="true"
                >
                  {resume ? (
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
                  {resume ? (
                    <>
                      <p className="truncate text-[15px] font-semibold text-[#161925]">{resume.name}</p>
                      <p className="mt-0.5 text-sm text-[#23395B]">{formatBytes(resume.size)}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[15px] font-semibold text-[#161925]">
                        Drop your CV here or <span style={{ color: BRAND }}>browse</span>
                      </p>
                      <p id={`${ids.resume}-hint`} className="mt-0.5 text-sm text-[#23395B]">
                        PDF or Word, up to 20 MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              {resume ? (
                <button
                  type="button"
                  onClick={clearResume}
                  className="shrink-0 rounded-full px-3 py-1.5 font-manrope text-xs font-semibold text-[#23395B] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#406E8E]/35"
                >
                  Replace
                </button>
              ) : null}
            </div>
            {resumeError ? (
              <p id={`${ids.resume}-error`} role="alert" className="mt-2 font-manrope text-sm" style={{ color: ERROR }}>
                {resumeError}
              </p>
            ) : null}
          </Step>

          <div className="mt-8 flex flex-col gap-4 border-t border-[#161925]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-manrope text-sm text-[#23395B]">
              Applications go to our HR team. We reply to every one.
            </p>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#161925] pl-7 pr-6 font-manrope text-[15px] font-semibold text-white transition-[opacity,background-color] duration-200 hover:bg-[#23395B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#406E8E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F8FA] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#161925]"
            >
              <span>{isSubmitting ? "Sending" : "Send the application"}</span>
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
        </form>
      </div>
    </div>
  );
}

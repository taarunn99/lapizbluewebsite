"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  // controlled inputs (keep your UI exactly as-is)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-spam honeypot

  // this mirrors the LEFT checkbox that is outside the form
  const [agreeChecked, setAgreeChecked] = useState(false);

  // watch the left checkbox (#agree) and keep a mirror flag in state
  useEffect(() => {
    const el = document.getElementById("agree") as HTMLInputElement | null;
    if (!el) return;
    const sync = () => setAgreeChecked(el.checked);
    sync();                              // set initial
    el.addEventListener("change", sync);
    return () => el.removeEventListener("change", sync);
  }, []);

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const isValid = useMemo(() => {
    const hasBasics = name.trim() && email.trim() && phone.trim() && message.trim();
    return Boolean(hasBasics && agreeChecked);
  }, [name, email, phone, message, agreeChecked]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!isValid) {
      setTouched({ name: true, email: true, phone: true, message: true });
      // also trigger native HTML validation (will include the left checkbox via form="lapiz-contact")
      form.reportValidity();
      return;
    }

    // Send email via API route with toast notifications
    const success = await toast.promise(
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, honeypot }),
      }).then(async (r) => {
        if (!r.ok) {
          const errorData = await r.json();
          throw new Error(errorData.error || "Failed to send enquiry");
        }
        return r.json();
      }),
      {
        loading: "Sending your enquiry…",
        success: "Success! Your enquiry has been sent. We'll get back to you at the earliest.",
        error: "Could not send the enquiry. Please try again.",
      }
    );

    // Fire Google Ads conversion tracking via GTM dataLayer
    if (success && typeof window !== "undefined") {
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "form_submission",
        form_name: "contact_form",
        form_id: "lapiz-contact",
      });
    }

    // Clear form after successful submission
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setTouched({});

    // Uncheck the external checkbox
    const checkboxEl = document.getElementById("agree") as HTMLInputElement | null;
    if (checkboxEl) checkboxEl.checked = false;
  }

  const inputBase =
    "w-full h-[56px] rounded-[20px] px-5 text-[#17212f] placeholder-[#17212f]/80 outline-none ring-1 ring-white/20 focus:ring-white/40 bg-white/10";

  return (
    <form
      id="lapiz-contact"                       // ← ties outside checkbox to this form
      onSubmit={handleSubmit}
      className="relative"
    >
      {/* Honeypot - hidden from users, catches bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        aria-hidden="true"
      />
      <div className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-5 sm:p-6 md:p-7 lg:p-8">
        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Full Name and Company Name"
            aria-label="Full Name and Company Name"
            className={inputBase}
          />
          {touched.name && !name.trim() && (
            <p className="mt-1 text-sm text-white">Please enter your name/company.</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="E-mail"
            aria-label="E-mail"
            className={inputBase}
          />
          {touched.email && !email.trim() && (
            <p className="mt-1 text-sm text-white">Please enter your email.</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder="Phone"
            aria-label="Phone"
            className={inputBase}
          />
          {touched.phone && !phone.trim() && (
            <p className="mt-1 text-sm text-white">Please enter your phone number.</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-2">
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            placeholder="Write your message..."
            aria-label="Write your message"
            rows={6}
            className="w-full rounded-[20px] px-5 py-4 text-[#17212f] placeholder-[#17212f]/80 outline-none ring-1 ring-white/20 focus:ring-white/40 bg-white/10"
          />
          {touched.message && !message.trim() && (
            <p className="mt-1 text-sm text-white">Please enter a message.</p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={!isValid}
            className="inline-flex items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#161925,#535e8b)] px-8 h-[56px] text-white text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Fire Away
          </button>
        </div>
      </div>
    </form>
  );
}

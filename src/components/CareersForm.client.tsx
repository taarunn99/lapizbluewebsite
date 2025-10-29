"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export default function CareersForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => {
    const hasBasics = name.trim() && email.trim() && phone.trim() && message.trim();
    return Boolean(hasBasics && resume);
  }, [name, email, phone, message, resume]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 20MB");
      e.target.value = "";
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      e.target.value = "";
      return;
    }

    setResume(file);
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

      // Clear file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputBase =
    "w-full h-[56px] rounded-[20px] px-5 text-[#17212f] placeholder-[#17212f]/60 outline-none border-2 border-white/30 focus:border-white/50 bg-white/10 transition-all";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-white/20 rounded-tl-3xl pointer-events-none" />
        <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-tr-3xl pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-white/20 rounded-bl-3xl pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-white/20 rounded-br-3xl pointer-events-none" />

        <div className="relative rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-5 sm:p-6 md:p-7 lg:p-8">
          {/* Top decorative line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Contact Information Section */}
          <div className="relative mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-gradient-to-r from-white/40 to-transparent" />
              <h3 className="text-sm font-semibold text-white/80 tracking-wider uppercase">Contact Details</h3>
            </div>

            {/* Name */}
            <div className="mb-4 relative group">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-white/0 via-white/30 to-white/0 group-focus-within:via-white/60 transition-all" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Full Name"
                aria-label="Full Name"
                className={inputBase}
              />
              {touched.name && !name.trim() && (
                <p className="mt-1 text-sm text-white">Please enter your name.</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4 relative group">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-white/0 via-white/30 to-white/0 group-focus-within:via-white/60 transition-all" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="Email"
                aria-label="Email"
                className={inputBase}
              />
              {touched.email && !email.trim() && (
                <p className="mt-1 text-sm text-white">Please enter your email.</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-0 relative group">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-white/0 via-white/30 to-white/0 group-focus-within:via-white/60 transition-all" />
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
          </div>

          {/* Application Section */}
          <div className="relative mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-gradient-to-r from-white/40 to-transparent" />
              <h3 className="text-sm font-semibold text-white/80 tracking-wider uppercase">Your Application</h3>
            </div>

            {/* Message */}
            <div className="relative group">
              <div className="absolute -left-3 top-8 w-1 h-32 bg-gradient-to-b from-white/0 via-white/30 to-white/0 group-focus-within:via-white/60 transition-all" />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                placeholder="Tell us about yourself and why you'd be a great fit..."
                aria-label="Write a message"
                rows={6}
                className="w-full rounded-[20px] px-5 py-4 text-[#17212f] placeholder-[#17212f]/60 outline-none border-2 border-white/30 focus:border-white/50 bg-white/10 transition-all"
              />
              {touched.message && !message.trim() && (
                <p className="mt-1 text-sm text-white">Please enter a message.</p>
              )}
            </div>
          </div>

          {/* Resume Upload Section */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-gradient-to-r from-white/40 to-transparent" />
              <h3 className="text-sm font-semibold text-white/80 tracking-wider uppercase">Resume</h3>
            </div>

            <div className="relative group">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-white/0 via-white/30 to-white/0 group-hover:via-white/60 transition-all" />
              <label className="block">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  onBlur={() => setTouched((t) => ({ ...t, resume: true }))}
                  className="hidden"
                  id="resume-upload"
                />
                <div className="flex items-center justify-between w-full h-[56px] rounded-[20px] px-5 border-2 border-white/30 hover:border-white/50 bg-white/10 cursor-pointer transition-all relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="text-[#17212f]/60 relative z-10 truncate pr-2">
                    {resume ? resume.name : "Upload Resume"}
                  </span>
                  <svg
                    className="w-5 h-5 text-[#17212f] relative z-10 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
              </label>
              {touched.resume && !resume && (
                <p className="mt-1 text-sm text-white">Please upload your resume.</p>
              )}
              <p className="mt-1 text-xs" style={{ color: '#bfd7ea' }}>PDF or Word document (Max 20MB)</p>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Submit Button - Outside form box */}
        <div className="mt-6 flex justify-center relative">
          {/* Side decorative lines */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent to-white/30" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-l from-transparent to-white/30" />

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="relative inline-flex items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#161925,#535e8b)] border-2 border-white/40 hover:border-white/60 px-10 h-[56px] text-white text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">{isSubmitting ? "Submitting..." : "Launch Your Career"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

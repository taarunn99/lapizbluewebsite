// src/components/ContactSectionWrapper.client.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import ContactForm from "./ContactForm.client";

interface ContactSectionWrapperProps {
  children?: ReactNode;
}

export default function ContactSectionWrapper({ children }: ContactSectionWrapperProps) {
  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={contactRef}
      id="contact-home"
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden"
    >
      {children}

      <motion.div
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 sm:px-8 lg:px-12 py-8 lg:py-10 lg:items-center"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={isContactInView ? {
          opacity: 1,
          scale: 1,
          y: 0
        } : {
          opacity: 0,
          scale: 0.95,
          y: 30
        }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.4, 0.25, 1]
        }}
      >
        <motion.div
          className="flex flex-col justify-center lg:pl-[64px] xl:pl-[96px]"
          initial={{ opacity: 0, x: -20 }}
          animate={isContactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="flex items-center gap-3 text-[#BFD7EA] md:text-[#406E8E]">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            <span className="label-sh">Send an enquiry</span>
          </div>

          <h2 className="mt-4 max-w-[654px] font-outfit text-white md:text-[#161925] font-semibold leading-[1.05] tracking-[-0.01em] text-3xl sm:text-4xl md:text-[40px] lg:text-[44px]">
            Precision Starts With a Hello.
          </h2>

          <p className="mt-5 max-w-[560px] font-manrope text-[15px] sm:text-base leading-relaxed text-white/90 md:text-[#23395B]">
            Send the bill of quantities, the product list or the job description. The Dubai desk
            replies within one working day with price, stock per branch, delivery date and the
            data sheet for every line. Trade pricing, project pricing and credit accounts for
            contractors, applicators and resellers.
          </p>

          <label htmlFor="agree" className="mt-6 flex items-center gap-3 text-white md:text-[#334155]">
            <input id="agree" name="agree" type="checkbox" form="lapiz-contact" required className="h-5 w-5 rounded border-white/30 bg-white/10 accent-[#23395B]" />
            <span className="text-[15px]">I agree to be contacted about this enquiry and to the <a href="/terms" className="underline underline-offset-2">terms</a>.</span>
          </label>
          <div className="mt-5" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isContactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <ContactForm />
        </motion.div>
      </motion.div>
    </section>
  );
}

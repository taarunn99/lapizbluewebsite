"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.25, 0.4, 0.25, 1] as const;

/**
 * One FAQ row on a native details element, so the answer is in the HTML for
 * the FAQPage schema whether open or shut. The open state animates
 * grid-template-rows from 0fr to 1fr; on close the row shrinks first and the
 * details closes when the shrink has finished.
 */
export function HubFaqItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState(defaultOpen);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (expanded) {
      setExpanded(false);
      if (reduced) setOpen(false);
    } else {
      setOpen(true);
      setExpanded(true);
    }
  };

  return (
    <details open={open} className="border-b border-[#161925]/12">
      <summary
        onClick={toggle}
        aria-expanded={expanded}
        className="group/sum flex cursor-pointer list-none items-start justify-between gap-6 py-6 sm:py-7 outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-[#406E8E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F6F8FA] rounded-sm"
      >
        <span className="relative font-outfit font-semibold text-xl sm:text-2xl leading-snug text-[#161925] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#406E8E] after:transition-transform after:duration-500 after:ease-out group-hover/sum:after:scale-x-100">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={`relative mt-0.5 h-10 w-10 shrink-0 rounded-full border border-[#161925]/15 text-[#161925] transition-[transform,background-color,border-color,color] duration-500 ease-out group-hover/sum:border-[#406E8E] group-hover/sum:bg-[#406E8E] group-hover/sum:text-white ${expanded ? "rotate-45 border-[#161925] bg-[#161925] text-white" : ""}`}
        >
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
        </span>
      </summary>
      <motion.div
        className="grid"
        initial={false}
        animate={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        transition={{ duration: reduced ? 0 : 0.55, ease }}
        onAnimationComplete={() => {
          if (!expanded) setOpen(false);
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="font-manrope text-[#161925]/80 text-base sm:text-lg leading-relaxed pb-7 sm:pb-8 pr-0 sm:pr-16 max-w-[62ch]">{answer}</p>
        </div>
      </motion.div>
    </details>
  );
}

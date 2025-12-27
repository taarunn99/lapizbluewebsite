"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function MDSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-12 py-16 lg:py-20"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: Image Card */}
        <motion.div
          className="relative w-full h-[580px] sm:h-[680px] lg:h-[780px] bg-[#161925] rounded-[30px] p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full h-full rounded-[24px] overflow-hidden">
            <Image
              src="/images/md-1200.jpg"
              alt="Portrait of Mr. Shariful Haque, Group General Manager"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              quality={100}
              priority={false}
            />
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center space-y-6 lg:space-y-8 order-1 lg:order-2">
          {/* Subtitle */}
          <motion.p
            className="text-[#406E8E] font-manrope font-medium text-sm sm:text-base uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Leadership
          </motion.p>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-[#161925] font-manrope font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">
              Meet Our Leader
            </h2>
            <h3 className="text-[#406E8E] font-manrope font-bold text-2xl sm:text-3xl lg:text-4xl">
              Mr. Shariful Haque
            </h3>
          </motion.div>

          {/* Quote 1 */}
          <motion.blockquote
            className="relative pl-6 border-l-4 border-[#406E8E]"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-[#161925] font-manrope font-medium text-base sm:text-lg lg:text-xl leading-relaxed italic">
              "In construction, there are no shortcuts. Every product we bring to the UAE has been tested and proven by professionals worldwide. We don't compromise - because the structures you build shouldn't either."
            </p>
          </motion.blockquote>

          {/* Quote 2 */}
          <motion.blockquote
            className="relative pl-6 border-l-4 border-[#BFD7EA]"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-[#161925] font-manrope font-medium text-base sm:text-lg lg:text-xl leading-relaxed italic">
              "I built Lapiz Blue on one principle: give contractors access to the same world-class materials that shaped iconic structures across Europe and America. When you partner with us, you're not just buying products - you're building something that lasts."
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}

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
        {/* Left: Image */}
        <motion.div
          className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-[30px] overflow-hidden shadow-2xl order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/md-800.jpg"
            alt="Managing Director - Azrat Razi"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
            quality={95}
          />
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
              About Our Managing Director
            </h2>
            <h3 className="text-[#406E8E] font-manrope font-bold text-2xl sm:text-3xl lg:text-4xl">
              Ashrat Razi
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
              "I've been moved by the zeal and dedication of our colleagues and staff members, who share the belief that society and business are better off when employees have meaningful ownership and input in their work."
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
              "We're dedicated to help our staff grow in a way that pushes them to grow and succeed while empowering and enhancing their capability to do amazing things. With regards to our loyal customers, we appreciate their trust in us, and we promise to uphold it as we move forward together."
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";

export function BrandsStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isMounted, setIsMounted] = useState(false);

  // Only enable scroll tracking after mount (SSR-safe)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track scroll progress of this section - only after mount
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform blue layer position based on scroll
  const blueLayerY = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);

  const stats = [
    {
      value: 6000,
      suffix: "+",
      label: "customer base.",
    },
    {
      value: 400,
      suffix: "+",
      label: "resellers.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-white flex items-center justify-center px-6 sm:px-8 lg:px-16 py-20 overflow-hidden"
    >
      {/* Blue Background Layer - Controlled by scroll, only animate after mount */}
      <motion.div
        className="absolute inset-0 bg-[#406E8E] z-0"
        style={isMounted ? { y: blueLayerY } : { y: "100%" }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
        >
          <h2 className="font-outfit font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            UAE's Source for Authorized
            <br />
            Construction Chemicals.
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.25, 0.4, 0.25, 1] as const,
              }}
            >
              {/* Number with Counter */}
              <div className="mb-2">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  startAnimation={isInView}
                />
              </div>

              {/* Label */}
              <p className="font-manrope font-medium text-white/95 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CounterProps {
  value: number;
  suffix?: string;
  startAnimation: boolean;
}

function Counter({ value, suffix = "", startAnimation }: CounterProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only start animation when startAnimation becomes true
    if (!startAnimation || hasAnimated.current) return;
    hasAnimated.current = true;

    let animationId: number;
    const startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [value, startAnimation]);

  return (
    <span className="font-outfit font-bold text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

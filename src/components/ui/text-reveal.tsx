"use client";

import { FC, ReactNode, useRef, useEffect, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Only enable scroll tracking after mount (SSR-safe)
  useEffect(() => {
    setIsMounted(true);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  useEffect(() => {
    if (!targetRef.current || prefersReducedMotion) return;

    // Dynamic import GSAP only when needed
    const initScrollTrigger = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const st = ScrollTrigger.create({
        trigger: targetRef.current,
        start: 'center center',
        end: '+=200vh',
        pin: true,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        fastScrollEnd: true
      });

      return () => st.kill();
    };

    const cleanup = initScrollTrigger();

    return () => {
      cleanup.then(fn => fn && fn());
    };
  }, [prefersReducedMotion]);

  // Reduced motion fallback - show all text immediately
  if (prefersReducedMotion) {
    return (
      <div className={cn("relative z-0 min-h-screen py-16", className)}>
        <div className="flex min-h-[50vh] w-full items-center justify-center bg-white px-4">
          <p className="text-center p-5 text-2xl font-bold text-black md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl max-w-4xl">
            {text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[200vh]", className)}
      style={{
        contain: 'layout style',
        isolation: 'isolate'
      }}
    >
      <div
        className="flex h-screen w-full items-center justify-center bg-white px-[1rem]"
      >
        <p
          className="flex flex-wrap justify-center text-center p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl max-w-4xl"
          style={{
            contain: 'content'
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} isMounted={isMounted}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isMounted: boolean;
}

const Word: FC<WordProps> = ({ children, progress, range, isMounted }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span
      className="xl:lg-3 relative mx-1 lg:mx-2.5"
      style={{
        contain: 'layout style'
      }}
    >
      <span className="absolute opacity-30" aria-hidden="true">{children}</span>
      <motion.span
        style={isMounted ? {
          opacity: opacity,
          willChange: 'opacity',
          backfaceVisibility: 'hidden'
        } : { opacity: 0 }}
        className="text-black"
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };

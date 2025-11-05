"use client";

import { FC, ReactNode, useRef, useEffect } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  useEffect(() => {
    if (!targetRef.current) return;

    const st = ScrollTrigger.create({
      trigger: targetRef.current,
      start: 'center center',
      end: '+=200vh',
      pin: true,
      pinSpacing: false,
      scrub: true,
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "flex h-screen w-full items-center justify-center bg-white px-[1rem]"
        }
      >
        <p
          className={
            "flex flex-wrap justify-center text-center p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl max-w-4xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
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
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };

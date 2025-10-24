"use client";

import { FC, ReactNode, useRef } from "react";
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

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[180vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-screen items-center justify-center bg-white px-6">
        <p className="flex flex-wrap justify-center text-center text-3xl font-medium tracking-wide text-black/15 md:text-4xl lg:text-5xl xl:text-6xl max-w-5xl">
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
    <span className="relative mx-1.5 lg:mx-2">
      <span className="absolute opacity-20">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className="text-[#161925]"
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };

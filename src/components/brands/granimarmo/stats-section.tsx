"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { StatItem } from "@/data/brandConfigs";

// SVG Icons for each stat type
const StonesIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g fill="#C5A572">
      <ellipse cx="12" cy="8" rx="4" ry="3" />
      <ellipse cx="24" cy="6" rx="5" ry="4" />
      <ellipse cx="36" cy="10" rx="4" ry="3" />
      <ellipse cx="8" cy="18" rx="5" ry="4" />
      <ellipse cx="20" cy="16" rx="4" ry="3" />
      <ellipse cx="32" cy="20" rx="5" ry="4" />
      <ellipse cx="40" cy="22" rx="4" ry="3" />
      <ellipse cx="14" cy="28" rx="4" ry="3" />
      <ellipse cx="26" cy="26" rx="5" ry="4" />
      <ellipse cx="38" cy="32" rx="4" ry="3" />
      <ellipse cx="10" cy="38" rx="5" ry="4" />
      <ellipse cx="22" cy="36" rx="4" ry="3" />
      <ellipse cx="34" cy="40" rx="5" ry="4" />
      <ellipse cx="44" cy="42" rx="3" ry="2" />
    </g>
  </svg>
);

const WoodIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="32" rx="4" stroke="#C5A572" strokeWidth="2" fill="none" />
    <path d="M12 16 Q20 14, 28 18 Q36 22, 40 20" stroke="#C5A572" strokeWidth="1.5" fill="none" />
    <path d="M8 24 Q16 22, 24 26 Q32 30, 40 28" stroke="#C5A572" strokeWidth="1.5" fill="none" />
    <path d="M12 32 Q20 30, 28 34 Q36 38, 40 36" stroke="#C5A572" strokeWidth="1.5" fill="none" />
    <circle cx="18" cy="20" r="3" fill="#C5A572" fillOpacity="0.3" stroke="#C5A572" strokeWidth="1" />
    <circle cx="32" cy="32" r="2" fill="#C5A572" fillOpacity="0.3" stroke="#C5A572" strokeWidth="1" />
  </svg>
);

const HomeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L6 22H12V40H20V30H28V40H36V22H42L24 6Z" stroke="#C5A572" strokeWidth="2" fill="none" />
    <rect x="20" y="30" width="8" height="10" fill="#C5A572" fillOpacity="0.2" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C24 4 8 18 8 28C8 36 15 42 24 42C33 42 40 36 40 28C40 18 24 4 24 4Z" stroke="#C5A572" strokeWidth="2" fill="none" />
    <path d="M14 28H34" stroke="#C5A572" strokeWidth="1.5" />
    <path d="M16 22H32" stroke="#C5A572" strokeWidth="1.5" />
    <path d="M18 34H30" stroke="#C5A572" strokeWidth="1.5" />
    <circle cx="24" cy="16" r="3" fill="#C5A572" />
  </svg>
);

const iconMap = {
  stones: StonesIcon,
  wood: WoodIcon,
  home: HomeIcon,
  building: BuildingIcon,
};

interface StatsProps {
  stats: StatItem[];
}

function AnimatedNumber({ value, isInView }: { value: string; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export function GranimarmoStatsSection({ stats }: StatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.iconType];
            const isLast = index === stats.length - 1;

            return (
              <motion.div
                key={stat.label}
                className={`flex flex-col items-center text-center relative ${
                  !isLast ? "lg:border-r lg:border-dashed lg:border-gray-300" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className="mb-4">
                  <IconComponent />
                </div>

                {/* Number */}
                <h3 className="text-4xl md:text-5xl font-light text-[#161925] mb-2 font-outfit">
                  <AnimatedNumber value={stat.value} isInView={isInView} />
                </h3>

                {/* Label */}
                <p className="text-sm md:text-base text-gray-600 max-w-[180px] font-outfit">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

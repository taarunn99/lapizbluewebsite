'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to track scroll progress within a specific range
 * Returns a value between 0 and 1 based on scroll position
 */
export function useScrollProgress(start: number, end: number) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY <= start) {
        setProgress(0);
      } else if (scrollY >= end) {
        setProgress(1);
      } else {
        const range = end - start;
        const currentProgress = (scrollY - start) / range;
        setProgress(currentProgress);
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [start, end]);

  return progress;
}

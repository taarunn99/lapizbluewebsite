"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function LocationPinCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Start with null to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Don't render during SSR
  if (!isMounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {/* Remove AnimatePresence - no need for entry animation on page load */}
      <motion.div
        style={{
          position: "fixed",
          top: mousePosition.y - 30,
          left: mousePosition.x - 15,
        }}
        // Just use a simple transition, no initial animation
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <div className="w-[50px] h-[50px] bg-[#4A9FD8] rounded-full flex items-center justify-center shadow-lg">
          {/* Location pin SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

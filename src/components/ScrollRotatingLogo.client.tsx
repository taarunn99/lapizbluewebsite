"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRotatingLogo() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!logoRef.current || !isDesktop) return;

    const logo = logoRef.current;

    // Create scroll-triggered rotation with increased speed (multiple rotations)
    const rotation = gsap.to(logo, {
      rotation: 360 * 5, // 5 full rotations for faster spinning
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Reduced scrub delay for more responsive rotation
        onUpdate: (self) => {
          // Rotate based on scroll direction with increased multiplier
          const rotation = self.direction === 1 ? 360 * 5 * self.progress : -360 * 5 * (1 - self.progress);
          gsap.set(logo, { rotation });
        },
      },
    });

    return () => {
      rotation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDesktop]);

  // Don't render on mobile/tablet
  if (!isDesktop) return null;

  return (
    <div
      className="fixed bottom-4 left-0 z-50 pointer-events-none"
      style={{ width: "140px", height: "140px" }}
    >
      <div ref={logoRef} className="w-full h-full">
        <Image
          src="/logos/lapiz-circle.svg"
          alt="Lapiz Blue Logo"
          width={140}
          height={140}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}

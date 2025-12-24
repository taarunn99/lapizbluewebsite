"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ScrollRotatingLogo() {
  const logoRef = useRef<HTMLDivElement>(null);
  // Start with null to avoid hydration mismatch - check on client only
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop(); // Initial check after mount
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!logoRef.current || !isDesktop) return;

    let rotation: { kill: () => void } | null = null;
    let scrollTriggerModule: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      scrollTriggerModule = ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const logo = logoRef.current;
      if (!logo) return;

      // Create scroll-triggered rotation with increased speed (multiple rotations)
      rotation = gsap.to(logo, {
        rotation: 360 * 5, // 5 full rotations for faster spinning
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Reduced scrub delay for more responsive rotation
          onUpdate: (self) => {
            // Rotate based on scroll direction with increased multiplier
            const rot = self.direction === 1 ? 360 * 5 * self.progress : -360 * 5 * (1 - self.progress);
            gsap.set(logo, { rotation: rot });
          },
        },
      });
    };

    initGSAP();

    return () => {
      if (rotation) rotation.kill();
      if (scrollTriggerModule) scrollTriggerModule.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDesktop]);

  // Don't render during SSR (null) or on mobile/tablet (false)
  if (!isDesktop) return null;

  return (
    <div
      className="fixed bottom-4 left-0 z-50 pointer-events-none"
      style={{ width: "140px", height: "140px" }}
    >
      <div ref={logoRef} className="w-full h-full">
        <Image
          src="/logos/lapiz-circle.svg"
          alt="Lapiz Blue rotating logo"
          width={140}
          height={140}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}

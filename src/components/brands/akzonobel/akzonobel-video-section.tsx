"use client";

import { useRef, useEffect } from "react";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export function AkzoNobelVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mount (handles autoplay restrictions)
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay was prevented, video will show first frame
        // User can interact to play
      });
    }
  }, []);

  return (
    <section
      className={`${manrope.className} relative w-full`}
      style={{ backgroundColor: "#1a2b5f" }} // AkzoNobel/Dulux brand blue
    >
      {/* Heading */}
      <div className="w-full py-10 md:py-14 lg:py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Lapiz Blue x AkzoNobel
          <span className="block mt-2 text-white/90">
            Colours that Inspire
          </span>
        </h2>
      </div>

      {/* Video Container */}
      <div className="relative w-full">
        <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14 lg:pb-16">
          <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
            {/* Aspect ratio container for responsive video */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/brands/akzonobel/hero.webp"
              >
                <source
                  src="/images/brands/akzonobel/hero-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

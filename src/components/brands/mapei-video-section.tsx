"use client";

import { useRef, useEffect, useState } from "react";

export function MapeiVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // The 13 MB file is only attached once the section is near the viewport, so
  // the page load does not pay for it. Behaviour on screen is unchanged: it
  // still autoplays muted on a loop as soon as it scrolls into range.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setReady(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setReady(true); io.disconnect(); } },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {
        // Autoplay was prevented, the poster stays until the user interacts
      });
    }
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className={`font-manrope relative w-full bg-[#406E8E]`}
      style={{ backgroundColor: "#406E8E" }}
    >
      {/* Heading */}
      <div className="w-full py-10 md:py-14 lg:py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Lapiz Blue x Mapei
          <span className="block mt-2 text-white/90">
            A Foundation You Can Trust
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
                preload="none"
                poster="/images/brands/mapei/video-poster.webp"
              >
                {ready ? (
                  <source
                    src="/videos/brands/mapei/corporate-video.mp4"
                    type="video/mp4"
                  />
                ) : null}
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

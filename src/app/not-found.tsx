"use client";

import Link from "next/link";
import { useEffect, useState, memo } from "react";
import Image from "next/image";

// Memoized cloud component to prevent re-renders
const CloudImage = memo(function CloudImage({ className }: { className?: string }) {
  return (
    <Image
      src="/images/404/clouds.webp"
      alt=""
      fill
      className={className}
      loading="lazy"
      sizes="400vw"
      quality={75}
    />
  );
});

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure page is interactive first
    const timer = requestIdleCallback
      ? requestIdleCallback(() => setIsLoaded(true))
      : setTimeout(() => setIsLoaded(true), 100);

    return () => {
      if (typeof timer === 'number') {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#87CEEB] via-[#B8DCF0] to-white">
      {/* Animated cloud image - moving left to right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[400%] h-full opacity-60"
          style={{
            animation: 'cloud-scroll 40s linear infinite',
            willChange: 'transform'
          }}
        >
          <CloudImage className="object-cover object-top" />
        </div>
      </div>

      {/* Large "404" watermark - 4s in #161925, 0 in white */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -translate-y-20 md:-translate-y-28">
        <div className="flex items-center" style={{ letterSpacing: '0.1em' }}>
          <span className="text-[40vw] md:text-[30vw] font-bold leading-none text-[#161925]">4</span>
          <span className="text-[40vw] md:text-[30vw] font-bold leading-none text-white">0</span>
          <span className="text-[40vw] md:text-[30vw] font-bold leading-none text-[#161925]">4</span>
        </div>
      </div>

      {/* Animated character video - topmost layer, lazy loaded */}
      <div className="relative z-30 w-[420px] sm:w-[480px] md:w-[800px] lg:w-[900px] -mt-16 md:-mt-24">
        {isLoaded && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-contain"
          >
            <source src="/videos/404/character.webm" type="video/webm" />
            <source src="/videos/404/character.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Cloud floor under character */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none opacity-60">
        <CloudImage className="object-cover object-center" />
      </div>

      {/* Text content */}
      <div className="relative z-20 text-center -mt-8 md:-mt-12 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-[#161925]">
          Oops, I think we&apos;re lost...
        </h1>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-6 md:mb-8">
          Let&apos;s get you back to somewhere familiar.
        </p>

        {/* Back Home button */}
        <Link
          href="/"
          prefetch={false}
          className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105 hover:bg-[#406E8E] text-[#161925] hover:text-white"
        >
          <span className="w-5 h-5 rounded-full border-2 border-[#161925] group-hover:border-white flex items-center justify-center transition-colors">
            <svg
              className="w-2.5 h-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </span>
          Back Home
        </Link>
      </div>

      {/* Optimized CSS animation in style tag */}
      <style jsx global>{`
        @keyframes cloud-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}

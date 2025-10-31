"use client";

import React from 'react';
import Image from 'next/image';

interface ImageAutoSliderProps {
  images: string[];
  speed?: number;
  reverse?: boolean;
}

export function ImageAutoSlider({ images, speed = 30, reverse = false }: ImageAutoSliderProps) {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full bg-white relative overflow-hidden py-8 lg:py-12">
      {/* Scrolling images container */}
      <div className="relative w-full flex items-center justify-center">
        <div className="scroll-container w-full">
          <div
            className="infinite-scroll flex gap-4 lg:gap-6 w-max"
            style={{
              animation: `${reverse ? 'scroll-left' : 'scroll-right'} ${speed}s linear infinite`,
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="image-item flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={image}
                  alt={`Team moment ${(index % images.length) + 1}`}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
}

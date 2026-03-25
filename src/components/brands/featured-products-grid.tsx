"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

interface FeaturedProduct {
  name: string;
  description: string;
  image: string;
  category?: string;
}

interface FeaturedProductsGridProps {
  products: FeaturedProduct[];
  primaryColor: string;
  productLineName: string;
}

export function FeaturedProductsGrid({
  products,
  primaryColor,
  productLineName,
}: FeaturedProductsGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [magnifier, setMagnifier] = useState<{
    visible: boolean;
    x: number;
    y: number;
    bgX: number;
    bgY: number;
  }>({ visible: false, x: 0, y: 0, bgX: 0, bgY: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const MAGNIFIER_SIZE = 180;
  const ZOOM = 2.5;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => {
    setLightboxIndex(null);
    setMagnifier((m) => ({ ...m, visible: false }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = imageContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    // Find the actual rendered image bounds (object-contain)
    const containerAspect = rect.width / rect.height;
    // Images are roughly 2:1 landscape
    const imgAspect = 2;
    let imgW: number, imgH: number, imgLeft: number, imgTop: number;
    if (containerAspect > imgAspect) {
      imgH = rect.height;
      imgW = imgH * imgAspect;
      imgLeft = rect.left + (rect.width - imgW) / 2;
      imgTop = rect.top;
    } else {
      imgW = rect.width;
      imgH = imgW / imgAspect;
      imgLeft = rect.left;
      imgTop = rect.top + (rect.height - imgH) / 2;
    }

    const cursorX = e.clientX;
    const cursorY = e.clientY;

    // Position relative to actual image (0-1)
    const relX = (cursorX - imgLeft) / imgW;
    const relY = (cursorY - imgTop) / imgH;

    // Only show magnifier when cursor is over the actual image
    if (relX < 0 || relX > 1 || relY < 0 || relY > 1) {
      setMagnifier((m) => ({ ...m, visible: false }));
      return;
    }

    setMagnifier({
      visible: true,
      x: cursorX,
      y: cursorY,
      bgX: relX * 100,
      bgY: relY * 100,
    });
  };

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % products.length);
  }, [lightboxIndex, products.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + products.length) % products.length);
  }, [lightboxIndex, products.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  // Group by category if any have categories
  const hasCategories = products.some((p) => p.category);
  const groupedProducts = hasCategories
    ? products.reduce(
        (acc, product) => {
          const cat = product.category || "Other";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(product);
          return acc;
        },
        {} as Record<string, FeaturedProduct[]>,
      )
    : { "": products };

  let globalIndex = 0;

  return (
    <>
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: primaryColor }}
            >
              Popular Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most trusted {productLineName.toLowerCase()} solutions
              for professional installations.
            </p>
          </div>

          {Object.entries(groupedProducts).map(([category, catProducts]) => (
            <div key={category} className={category ? "mb-10" : ""}>
              {category && (
                <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                  {category}
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {catProducts.map((product) => {
                  const idx = globalIndex++;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openLightbox(idx)}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 text-left cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading={idx < 4 ? "eager" : "lazy"}
                        />
                      </div>
                      <div className="p-4 border-t border-gray-100">
                        <h3
                          className="font-semibold text-lg mb-2"
                          style={{ color: primaryColor }}
                        >
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-10">
            <span className="text-white/70 text-sm">
              {lightboxIndex + 1} / {products.length}
            </span>
            <span className="text-white font-medium text-sm uppercase tracking-wider">
              {products[lightboxIndex].name}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="text-white/70 hover:text-white transition-colors p-2"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors p-2"
            aria-label="Previous"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors p-2"
            aria-label="Next"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Image with magnifier */}
          <div
            ref={imageContainerRef}
            className="relative w-[90vw] h-[80vh] max-w-6xl cursor-crosshair"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onMouseLeave={() =>
              setMagnifier((m) => ({ ...m, visible: false }))
            }
          >
            <Image
              src={products[lightboxIndex].image}
              alt={products[lightboxIndex].name}
              fill
              className="object-contain"
              sizes="90vw"
              quality={100}
              unoptimized
              priority
            />

            {/* Magnifying circle */}
            {magnifier.visible && (
              <div
                className="pointer-events-none fixed z-20 rounded-full border-2 border-white/80 shadow-2xl"
                style={{
                  width: MAGNIFIER_SIZE,
                  height: MAGNIFIER_SIZE,
                  left: magnifier.x - MAGNIFIER_SIZE / 2,
                  top: magnifier.y - MAGNIFIER_SIZE / 2,
                  backgroundImage: `url(${products[lightboxIndex].image})`,
                  backgroundSize: `${ZOOM * 100}% ${ZOOM * 100}%`,
                  backgroundPosition: `${magnifier.bgX}% ${magnifier.bgY}%`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
          </div>

          {/* Bottom description */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-4 text-center z-10">
            <p className="text-white/60 text-sm max-w-2xl mx-auto">
              {products[lightboxIndex].description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

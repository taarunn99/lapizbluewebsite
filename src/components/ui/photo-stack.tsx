"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface PhotoStackItem {
  src: string;
  name: string;
  website?: string;
}

export interface InteractivePhotoStackProps {
  items: PhotoStackItem[];
  title: React.ReactNode;
  className?: string;
}

// Generate deterministic horizontal poker-style spread (like cards on a table)
const generatePokerSpread = (count: number) => {
  const positions: string[] = [];
  const totalWidth = 60; // vw total spread
  const spacing = count > 1 ? totalWidth / (count - 1) : 0;
  const startX = -totalWidth / 2;
  // Fixed slight rotations for visual interest
  const rotations = [-6, -2, 2, 6, -4, 4];

  for (let i = 0; i < count; i++) {
    const x = count > 1 ? startX + (i * spacing) : 0;
    const r = rotations[i % rotations.length] || 0;
    positions.push(`translate(${x}vw, 0vh) rotate(${r}deg)`);
  }
  return positions;
};

const InteractivePhotoStack = React.forwardRef<
  HTMLDivElement,
  InteractivePhotoStackProps
>(({ items, title, className, ...props }, ref) => {
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);
  const [spreadTransforms, setSpreadTransforms] = React.useState<string[]>([]);
  const [isMobile, setIsMobile] = React.useState(false);

  const displayedItems = items.slice(0, 6);
  const baseRotations = [
    "rotate-0",
    "rotate-2",
    "-rotate-2",
    "rotate-3",
    "-rotate-3",
    "rotate-1",
  ];

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleExpand = () => {
    if (!isExpanded) {
      const newTransforms = generatePokerSpread(displayedItems.length);
      setSpreadTransforms(newTransforms);
      setIsExpanded(true);
    }
  };

  const handleCollapse = () => {
    if (!clickedIndex) {
      setIsExpanded(false);
    }
  };

  const handleCardClick = (index: number, website?: string) => {
    if (isExpanded) {
      if (website) {
        window.open(website, "_blank", "noopener,noreferrer");
        return;
      }
      setClickedIndex(index);
      setTimeout(() => {
        setIsExpanded(false);
        setTopCardIndex(index);
        setClickedIndex(null);
      }, 500);
    } else {
      if (isMobile) {
        handleExpand();
      } else {
        setTopCardIndex(index);
      }
    }
  };

  const handleContainerClick = () => {
    if (isMobile && isExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-8",
        className
      )}
      {...props}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#161925] font-outfit text-center">
        <span className="text-[#406E8E]">Lapiz</span> Group of Companies
      </h2>
      <p className="text-gray-500 text-sm md:text-base">
        {isMobile ? "Tap to explore" : "Hover to explore"}
      </p>

      {/* Card Stack Container */}
      <div
        className="relative h-[400px] md:h-[450px] w-full"
        onMouseEnter={!isMobile ? handleExpand : undefined}
        onMouseLeave={!isMobile ? handleCollapse : undefined}
        onClick={handleContainerClick}
      >
        <div className="relative left-1/2 top-1/2 h-72 w-56 md:h-80 md:w-64 -translate-x-1/2 -translate-y-1/2">
          {displayedItems.map((item, index) => {
            const isTopCard = index === topCardIndex;
            const numItems = displayedItems.length;
            let stackPosition = index - topCardIndex;
            if (stackPosition < 0) stackPosition += numItems;
            const isClicked = index === clickedIndex;

            const transform = isExpanded
              ? spreadTransforms[index]
              : `translateY(${stackPosition * 0.4}rem) scale(${1 - stackPosition * 0.03})`;

            return (
              <div
                key={item.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(index, item.website);
                }}
                className={cn(
                  "absolute inset-0 h-72 w-56 md:h-80 md:w-64 cursor-pointer rounded-2xl bg-white p-3 shadow-xl border border-gray-100 transition-all duration-500 ease-out",
                  {
                    "rotate-0": isExpanded,
                    [baseRotations[stackPosition]]:
                      !isExpanded && !isTopCard,
                    "hover:scale-105 hover:shadow-2xl": isExpanded && !isClicked,
                    "scale-110": isClicked,
                  }
                )}
                style={{
                  transform: transform,
                  zIndex: isClicked
                    ? 200
                    : isExpanded
                      ? 100
                      : isTopCard
                        ? numItems
                        : numItems - stackPosition,
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center">
                  {/* Logo Container */}
                  <div className="relative h-32 w-full md:h-40 flex items-center justify-center">
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={180}
                      height={120}
                      className="object-contain max-h-full"
                    />
                  </div>
                  {/* Company Name */}
                  <div className="flex flex-grow items-center justify-center px-2 mt-4">
                    <p className="text-sm md:text-base text-gray-700 text-center font-medium leading-tight">
                      {item.name}
                    </p>
                  </div>
                  {/* Website indicator */}
                  {item.website && isExpanded && (
                    <span className="text-xs text-[#406E8E] flex items-center gap-1 mb-2">
                      Visit
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

InteractivePhotoStack.displayName = "InteractivePhotoStack";

export { InteractivePhotoStack };

"use client";

import { Ref, forwardRef, useState, useEffect, memo, useRef, useMemo } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useMotionValue, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

// Hook to safely get screen size after hydration
function useScreenSize() {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize("desktop");
      } else if (width >= 640) {
        setScreenSize("tablet");
      } else {
        setScreenSize("mobile");
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return { screenSize, isMounted };
}

/**
 * PhotoGallery Component
 * Displays an animated photo gallery with interactive draggable photos
 * Fully responsive across all devices
 */
export const PhotoGallery = memo(({
  animationDelay = 0.5,
  photos,
}: {
  animationDelay?: number;
  photos?: Array<{
    src: string;
    alt: string;
  }>;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { screenSize, isMounted } = useScreenSize();

  useEffect(() => {
    if (isInView) {
      // Start the photo animations after the section comes into view
      const animationTimer = setTimeout(
        () => {
          setIsLoaded(true);
        },
        animationDelay * 1000
      );

      return () => {
        clearTimeout(animationTimer);
      };
    }
  }, [isInView, animationDelay]);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Animation variants for each photo
  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  };

  // Default photo configuration with responsive positioning
  // Each photo has its own aspect ratio based on actual image dimensions
  // Images with increased scattering while maintaining some overlap
  const defaultPhotos = [
    {
      id: 1,
      order: 0,
      x: { desktop: "-335px", tablet: "-240px", mobile: "-118px" },
      y: { desktop: "-25px", tablet: "-15px", mobile: "-12px" },
      zIndex: 50,
      direction: "left" as Direction,
      src: photos?.[0]?.src || "/images/office/office-1.jpg",
      alt: photos?.[0]?.alt || "Office space 1",
      aspectRatio: 3 / 4, // 1200x1600 - portrait
      width: { desktop: 280, tablet: 220, mobile: 140 },
    },
    {
      id: 2,
      order: 1,
      x: { desktop: "-180px", tablet: "-128px", mobile: "-63px" },
      y: { desktop: "50px", tablet: "35px", mobile: "23px" },
      zIndex: 40,
      direction: "left" as Direction,
      src: photos?.[1]?.src || "/images/office/office-2.webp",
      alt: photos?.[1]?.alt || "Office space 2",
      aspectRatio: 4 / 3, // 4160x3120 - landscape
      width: { desktop: 320, tablet: 250, mobile: 160 },
    },
    {
      id: 3,
      order: 2,
      x: { desktop: "0px", tablet: "0px", mobile: "0px" },
      y: { desktop: "-15px", tablet: "-10px", mobile: "-7px" },
      zIndex: 30,
      direction: "right" as Direction,
      src: photos?.[2]?.src || "/images/office/office-3.jpg",
      alt: photos?.[2]?.alt || "Office space 3",
      aspectRatio: 9 / 16, // 720x1280 - portrait
      width: { desktop: 260, tablet: 200, mobile: 130 },
    },
    {
      id: 4,
      order: 3,
      x: { desktop: "185px", tablet: "132px", mobile: "65px" },
      y: { desktop: "42px", tablet: "30px", mobile: "20px" },
      zIndex: 20,
      direction: "right" as Direction,
      src: photos?.[3]?.src || "/images/office/office-4.jpg",
      alt: photos?.[3]?.alt || "Office space 4",
      aspectRatio: 4 / 3, // 1280x960 - landscape
      width: { desktop: 320, tablet: 250, mobile: 160 },
    },
    {
      id: 5,
      order: 4,
      x: { desktop: "350px", tablet: "252px", mobile: "125px" },
      y: { desktop: "-28px", tablet: "-20px", mobile: "-14px" },
      zIndex: 10,
      direction: "left" as Direction,
      src: photos?.[4]?.src || "/images/office/office-5.jpg",
      alt: photos?.[4]?.alt || "Team photo",
      aspectRatio: 4 / 3, // 1280x960 - landscape
      width: { desktop: 340, tablet: 260, mobile: 170 },
    },
  ];

  return (
    <div ref={ref} className="mt-20 md:mt-32 lg:mt-40 relative">
      {/* Grid background - hidden on mobile for performance */}
      <div className="absolute inset-0 max-md:hidden top-[200px] -z-10 h-[300px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Header Section */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="lg:text-md my-2 text-center text-xs font-light uppercase tracking-widest text-slate-600 px-4"
      >
        A journey through visual stories
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="z-20 mx-auto max-w-2xl justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text py-3 text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-transparent px-4"
      >
        Welcome to our  <span className="text-[#406E8E]">Stories</span>
      </motion.h3>

      {/* Photo Gallery Container - Responsive heights */}
      <div className="relative mb-8 h-[320px] sm:h-[400px] md:h-[480px] lg:h-[550px] w-full flex items-center justify-center overflow-visible">
        <motion.div
          className="relative mx-auto flex w-full justify-center px-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div
            className="relative flex justify-center items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Responsive container for photos - centered */}
            <div className="relative h-[280px] w-[280px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px] mx-auto">
              {/* Render photos in reverse order for proper z-index layering */}
              {[...defaultPhotos].reverse().map((photo) => {
                // Use consistent desktop sizes for SSR, then update on client
                const getResponsiveData = () => {
                  if (screenSize === "desktop") {
                    return {
                      x: photo.x.desktop,
                      y: photo.y.desktop,
                      width: photo.width.desktop,
                    };
                  }
                  if (screenSize === "tablet") {
                    return {
                      x: photo.x.tablet,
                      y: photo.y.tablet,
                      width: photo.width.tablet,
                    };
                  }
                  return {
                    x: photo.x.mobile,
                    y: photo.y.mobile,
                    width: photo.width.mobile,
                  };
                };

                const { x, y, width } = getResponsiveData();
                const height = Math.round(width / photo.aspectRatio);

                return (
                  <motion.div
                    key={photo.id}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ zIndex: photo.zIndex }}
                    variants={photoVariants}
                    custom={{ x, y, order: photo.order }}
                  >
                    <Photo
                      width={width}
                      height={height}
                      sizes={`(max-width: 640px) ${photo.width.mobile}px, (max-width: 1024px) ${photo.width.tablet}px, ${photo.width.desktop}px`}
                      src={photo.src}
                      alt={photo.alt}
                      direction={photo.direction}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

PhotoGallery.displayName = "PhotoGallery";

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value");
  }
  return Math.random() * (max - min) + min;
}

const MotionImage = motion.create(
  forwardRef(function MotionImage(
    { alt, ...props }: ImageProps,
    ref: Ref<HTMLImageElement>
  ) {
    return <Image ref={ref} alt={alt || ""} {...props} />;
  })
);

type Direction = "left" | "right";

export const Photo = memo(({
  src,
  alt,
  className,
  direction,
  width,
  height,
  sizes,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
  sizes?: string;
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  useEffect(() => {
    const randomRotation =
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
    setRotation(randomRotation);
  }, [direction]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileTap={{ scale: 1.15, zIndex: 9999 }}
      whileHover={{
        scale: 1.08,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        perspective: 400,
        transform: `rotate(0deg) rotateX(0deg) rotateY(0deg)`,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
      aria-label={`Draggable photo: ${alt}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl">
        <MotionImage
          className={cn("rounded-2xl sm:rounded-3xl object-cover")}
          fill
          src={src}
          alt={alt}
          sizes={sizes || "(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 220px"}
          quality={85}
          priority={false}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          {...props}
          draggable={false}
        />
      </div>
    </motion.div>
  );
});

Photo.displayName = "Photo";

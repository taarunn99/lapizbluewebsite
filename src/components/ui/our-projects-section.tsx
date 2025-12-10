"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface Project {
  name: string;
  image: string;
  alt: string;
}

const projects: Project[] = [
  {
    name: "Etihad Railways",
    image: "/images/projects/etihad-railways.jpg",
    alt: "Etihad Railways infrastructure project featuring advanced anchoring solutions",
  },
  {
    name: "Jawaharlal Nehru Stadium",
    image: "/images/projects/nehru-stadium.webp",
    alt: "Jawaharlal Nehru Stadium sports facility with premium tile adhesive installation",
  },
  {
    name: "Abu Dhabi Port",
    image: "/images/projects/abu-dhabi-port.jpg",
    alt: "Abu Dhabi Port commercial infrastructure development",
  },
  {
    name: "Damac Lagoons",
    image: "/images/projects/damac-lagoons.webp",
    alt: "Damac Lagoons luxury residential project with high-performance adhesives and grouts",
  },
  {
    name: "Vida Mall Carrefour",
    image: "/images/projects/vida-mall.jpg",
    alt: "Vida Mall Carrefour retail space with specialized cleaning and adhesive systems",
  },
  {
    name: "Adani Tower",
    image: "/images/projects/adani-tower.jpg",
    alt: "Adani Tower commercial building with advanced waterproofing systems",
  },
  {
    name: "Crocodile Park",
    image: "/images/projects/crocodile-park.jpg",
    alt: "Crocodile Park entertainment venue with self-leveling flooring",
  },
  {
    name: "IBIS Hotel",
    image: "/images/projects/ibis-hotel.webp",
    alt: "IBIS Hotel hospitality project with premium flooring solutions",
  },
  {
    name: "Royal Atlantis",
    image: "/images/projects/royal-atlantis.jpg",
    alt: "Royal Atlantis luxury resort with high-end construction materials",
  },
  {
    name: "St Regis Hotel",
    image: "/images/projects/st-regis.jpg",
    alt: "St Regis Hotel five-star hospitality project",
  },
  {
    name: "Jumeirah Avenue Mall",
    image: "/images/projects/jumeirah-avenue.jpg",
    alt: "Jumeirah Avenue Mall retail development",
  },
  {
    name: "Atachi Gold Refinery",
    image: "/images/projects/atachi-gold-refinery.webp",
    alt: "Atachi Gold Refinery industrial facility with specialized construction solutions",
  },
];

export function OurProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayOptions = {
    delay: 3000,
    stopOnInteraction: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
    },
    [Autoplay(autoplayOptions)]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6 sm:px-8 lg:px-16 py-20 pb-32"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="font-outfit font-bold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Projects
          </h2>

          {/* Description */}
          <p className="font-outfit text-[#406E8E] text-base sm:text-lg md:text-xl max-w-5xl mx-auto leading-relaxed">
            From iconic developments to functional spaces, Lapiz Blue delivers high-performance
            results across diverse projects in the UAE and beyond. Partnering with leading
            construction brands of UAE, we supply and apply trusted systems for waterproofing, tile
            adhesives and grout, epoxy flooring, and concrete repair to meet demanding site
            standards. Every successful application reinforces our commitment to quality,
            innovation, and on-time delivery - and we&apos;re just getting started.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative mt-16">
          <div className="overflow-x-hidden overflow-y-visible" ref={emblaRef}>
            <div className="flex pb-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_50%] min-w-0 px-4"
                >
                  <div className="relative mb-6">
                    {/* Project Image Card */}
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
                        priority={index === selectedIndex}
                      />
                    </div>

                    {/* Project Name Label */}
                    <motion.div
                      className="mt-6 mx-auto max-w-[90%]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        index === selectedIndex
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0.7, y: 0 }
                      }
                      transition={{ duration: 0.4 }}
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl py-4 px-6 shadow-lg">
                        <h3 className="font-outfit font-semibold text-[#161925] text-lg md:text-xl text-center">
                          {project.name}
                        </h3>
                        <div className="w-24 h-1 bg-[#406E8E] mx-auto mt-2 rounded-full"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 sm:left-4 md:left-8 top-[40%] -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#161925] group-hover:text-[#406E8E] transition-colors" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-2 sm:right-4 md:right-8 top-[40%] -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#161925] group-hover:text-[#406E8E] transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}

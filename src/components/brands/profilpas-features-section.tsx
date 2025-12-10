"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const features = [
  {
    id: "production",
    title: "Production Technology",
    image: "/images/brands/profilpas/features/production-technology.webp",
    description:
      "The metal and PVC profiles are produced and finished in Profilpas' manufacturing facilities, in an area of more than 20,000 covered square metres. The management of the entire production cycle and the continuous investment in state-of-the-art plants and technologies allow for rapid and flexible work scheduling, as well as the direct control of each phase, ensuring compliance with the strict quality standards that characterize Profilpas products.",
  },
  {
    id: "quality",
    title: "Quality Innovation",
    image: "/images/brands/profilpas/features/quality-innovation.webp",
    description:
      "Profilpas continually invests in research and development to deliver innovative profile solutions that meet evolving market demands. Each product undergoes rigorous quality testing to ensure durability, precision, and performance. Their commitment to excellence has established Profilpas as a trusted name among architects, designers, and contractors worldwide.",
  },
  {
    id: "customisation",
    title: "Customization",
    image: "/images/brands/profilpas/features/customisation.webp",
    description:
      "With the Profilpas Digital System (PDS), customers can access customised finishing solutions tailored to their specific project requirements. From bespoke colours and finishes to custom lengths and profiles, Profilpas offers flexibility that enables designers and architects to bring their unique visions to life without compromise.",
  },
];

export function ProfilpasFeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedFeature) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedFeature]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <>
      <section ref={ref} className="py-16 md:py-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#395c56] mb-4">
              Choose Profilpas for Premium Finishes
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover why industry professionals trust Profilpas for their most demanding projects.
            </p>
          </motion.div>

          {/* 3 Images Side by Side */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="cursor-pointer group"
                onClick={() => setSelectedFeature(feature)}
              >
                {/* Image Card */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#395c56]/0 group-hover:bg-[#395c56]/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-[#395c56]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-center text-lg md:text-xl font-semibold text-[#395c56] mt-4 group-hover:text-[#2d4a45] transition-colors">
                  {feature.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setSelectedFeature(null)}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[#395c56]">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#C9A227]" />
              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#C9A227]" />
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                {/* Image */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={selectedFeature.image}
                      alt={selectedFeature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Title below image */}
                  <h3 className="text-white text-2xl md:text-3xl font-bold mt-6">
                    {selectedFeature.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="w-full md:w-1/2 flex items-center">
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                    {selectedFeature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShimmerButton } from "./ui/shimmer-button";

export function CertificatesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const certificates = [
    {
      title: "Trade License",
      subtitle: "Dubai 2025-2026",
      file: "/certificates/trade-license-2025.pdf",
      color: "#F3DFC1",
    },
    {
      title: "TRN Certificate",
      subtitle: "Tax Registration Number",
      file: "/certificates/trn-certificate.pdf",
      color: "#BFD7EA",
    },
    {
      title: "Mapei Authorization",
      subtitle: "Authorized Reseller 2025",
      file: "/certificates/mapei-authorization.pdf",
      color: "#406E8E",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#406E8E] via-[#5B8AAE] to-[#BFD7EA] flex items-center"
    >
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
          {/* Heading */}
          <motion.div
            className="lg:max-w-[45%]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="font-outfit font-semibold text-[#161925] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] leading-tight mb-4 lg:mb-6">
              Licensed.
              <br />
              Certified.
              <br />
              Trusted.
            </h2>
            <p className="font-manrope font-normal text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Proof? Oh, we brought receipts.
            </p>
          </motion.div>

          {/* Certificate Cards - Triangle Layout on Desktop */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Mobile/Tablet: Stack vertically */}
            <div className="lg:hidden space-y-6">
              {certificates.map((cert, index) => (
                <CertificateCard
                  key={index}
                  title={cert.title}
                  subtitle={cert.subtitle}
                  file={cert.file}
                  color={cert.color}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Desktop: Triangle pattern */}
            <div className="hidden lg:block relative h-[600px]">
              {/* Top card */}
              <div className="absolute top-0 right-0 w-[280px]">
                <CertificateCard
                  title={certificates[0].title}
                  subtitle={certificates[0].subtitle}
                  file={certificates[0].file}
                  color={certificates[0].color}
                  delay={0}
                />
              </div>
              {/* Middle card */}
              <div className="absolute top-[200px] right-[120px] w-[280px]">
                <CertificateCard
                  title={certificates[1].title}
                  subtitle={certificates[1].subtitle}
                  file={certificates[1].file}
                  color={certificates[1].color}
                  delay={0.1}
                />
              </div>
              {/* Bottom card */}
              <div className="absolute top-[400px] right-0 w-[280px]">
                <CertificateCard
                  title={certificates[2].title}
                  subtitle={certificates[2].subtitle}
                  file={certificates[2].file}
                  color={certificates[2].color}
                  delay={0.2}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface CertificateCardProps {
  title: string;
  subtitle: string;
  file: string;
  color: string;
  delay: number;
}

function CertificateCard({ title, subtitle, file, color, delay }: CertificateCardProps) {
  const handleDownload = () => {
    // Open PDF in new tab
    window.open(file, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="w-full"
    >
      <ShimmerButton
        onClick={handleDownload}
        shimmerColor="#87CEEB"
        shimmerSize="0.12em"
        shimmerDuration="2.5s"
        borderRadius="1rem"
        background="#161925"
        className="w-full h-full min-h-[180px] flex-col items-start justify-start p-5 text-left hover:scale-105 transition-transform duration-300"
      >
        {/* Document Icon */}
        <div className="mb-3">
          <svg
            className="w-8 h-8 text-white opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="mb-3">
          <h3 className="font-outfit font-semibold text-white text-lg lg:text-xl mb-1">
            {title}
          </h3>
          <p className="font-manrope font-normal text-white/80 text-xs lg:text-sm">
            {subtitle}
          </p>
        </div>

        {/* Download Indicator */}
        <div className="flex items-center text-white/90 mt-auto">
          <span className="font-manrope text-xs mr-2">Download</span>
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
      </ShimmerButton>
    </motion.div>
  );
}

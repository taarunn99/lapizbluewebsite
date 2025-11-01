'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function BrandsPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero height
  const heroHeight = 839;

  // Calculate smooth title movement from center to top
  const titleProgress = Math.min(scrollY / heroHeight, 1);

  // Title moves from 50% (center) to above content (15vh from top)
  // Smooth continuous movement without jumps
  const titleTop = `${50 - (titleProgress * 35)}vh`;

  // Parallax effect on hero image
  const heroImageY = scrollY * 0.5;

  // Content opacity - fade in after hero section
  // Only show content after scrolling past hero + small buffer
  const contentScrollTrigger = heroHeight + 150; // Reduced delay
  const contentProgress = Math.max(0, (scrollY - contentScrollTrigger) / 150); // Faster fade
  const contentOpacity = Math.min(contentProgress, 1);
  const contentTranslateY = (1 - contentOpacity) * 60;

  // Title visibility - fade out smoothly when content appears
  // As content fades in (0 to 1), title fades out (1 to 0)
  const titleOpacity = Math.max(0, 1 - (contentOpacity * 1.3)); // Fades out as content appears

  // Button animation - appears in center of viewport during reveal
  const buttonScrollTrigger = contentScrollTrigger + 50;
  const buttonProgress = Math.max(0, Math.min((scrollY - buttonScrollTrigger) / 100, 1));
  const buttonOpacity = buttonProgress;
  const buttonScale = 0.8 + (buttonProgress * 0.2); // Scale from 0.8 to 1
  const buttonY = (1 - buttonProgress) * 30; // Slide up

  return (
    <main className="w-full bg-white text-[#161925] overflow-x-hidden">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[839px] overflow-hidden">
        {/* Hero Image - with parallax */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${heroImageY}px)`,
          }}
        >
          <Image
            src="/images/brands/brandspageimages/brandspagehero.jpg"
            alt="Construction site with cranes"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Animated Title - moves from center to top */}
        <div
          className="fixed left-0 right-0 z-10 flex items-center justify-center pointer-events-none px-4"
          style={{
            top: titleTop,
            opacity: titleOpacity,
            transform: 'translateY(-50%)',
          }}
        >
          <h1
            className="font-outfit font-semibold text-[28px] sm:text-[40px] md:text-[56px] lg:text-[70px] xl:text-[80px] leading-[1.26] text-center bg-gradient-to-b from-[#535E8B] to-[#161925] bg-clip-text text-transparent px-4"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              maxWidth: '95vw',
            }}
          >
            We Stock Icons, Not Imitations.
          </h1>
        </div>
      </section>

      {/* Spacer to create scroll space before content appears */}
      <div className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px]" />

      {/* ===================== STATS SECTION ===================== */}
      <section
        className="relative w-full py-8 sm:py-16 md:py-24 lg:py-32"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentTranslateY}px)`,
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        }}
      >
        <div className="relative w-full overflow-hidden">
          {/* Responsive layout - stack on mobile, side-by-side on desktop */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 lg:gap-0 max-w-[2000px] mx-auto px-4 sm:px-6 md:px-8">

            {/* LEFT COLUMN: Blue stats box + Product image overlapping */}
            <div className="relative w-full sm:w-[400px] md:w-[480px] lg:w-[580px] flex-shrink-0">
              {/* Blue stats box - bleeds left on desktop, centered on mobile */}
              <div
                className="relative bg-[#406E8E] rounded-[20px] lg:rounded-r-[20px] h-auto sm:h-[400px] md:h-[450px] lg:h-[500px] shadow-[0px_8px_8px_rgba(0,0,0,0.25),0px_4px_4px_rgba(0,0,0,0.25)] mx-auto lg:mx-0"
                style={{
                  marginLeft: '0',
                  marginTop: '25px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  paddingTop: '32px',
                  paddingBottom: '32px',
                  width: '100%',
                  maxWidth: '697px',
                }}
              >
                {/* 6,000+ customer base */}
                <div className="mb-4 sm:mb-6">
                  <div className="font-outfit font-semibold text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[1.26] bg-gradient-to-b from-[#BFD7EA] to-[#FFFFFF] bg-clip-text text-transparent">
                    <AnimatedCounter end={6000} suffix="+" />
                  </div>
                  <p className="font-outfit font-semibold text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] leading-[1.27] text-white">
                    customer base.
                  </p>
                </div>

                {/* 400+ resellers */}
                <div className="mb-4 sm:mb-6">
                  <div className="font-outfit font-semibold text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[1.26] bg-gradient-to-b from-[#BFD7EA] to-[#FFFFFF] bg-clip-text text-transparent">
                    <AnimatedCounter end={400} suffix="+" />
                  </div>
                  <p className="font-outfit font-normal text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] leading-[1.27] text-white">
                    resellers.
                  </p>
                </div>

              </div>

              {/* Product image overlapping on the right edge - responsive positioning */}
              <div
                className="hidden lg:block absolute w-[180px] md:w-[220px] lg:w-[239px] h-[270px] md:h-[330px] lg:h-[358px] rounded-[20px] overflow-hidden shadow-[0px_8px_8px_rgba(0,0,0,0.25),0px_4px_4px_rgba(0,0,0,0.25)] z-10"
                style={{
                  top: '0px',
                  right: '-120px',
                }}
              >
                <Image
                  src="/images/brands/brandspageimages/brand-product.jpg"
                  alt="Building materials product"
                  fill
                  className="object-cover"
                  sizes="239px"
                  quality={90}
                />
              </div>
            </div>

            {/* CENTER COLUMN: Contact button only */}
            <div className="w-full lg:flex-1 px-4 sm:px-8 lg:pl-12 lg:pr-16 flex flex-col items-center justify-start py-8 lg:py-0" style={{ maxWidth: 'none', paddingTop: '0' }}>
              {/* Contact Us Button - Animated entrance with shimmer */}
              <div
                className="lg:mt-[600px]"
                style={{
                  opacity: buttonOpacity,
                  transform: `translateY(${buttonY}px) scale(${buttonScale})`,
                }}
              >
                <Link href="/contact">
                  <ShimmerButton
                    shimmerColor="#BFD7EA"
                    shimmerSize="0.1em"
                    shimmerDuration="2.5s"
                    borderRadius="10px"
                    background="#161925"
                    className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 font-manrope font-semibold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] bg-gradient-to-b from-[#161925] to-[#535E8B] shadow-[0px_8px_8px_rgba(0,0,0,0.25),0px_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0px_12px_16px_rgba(0,0,0,0.3),0px_8px_8px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105"
                  >
                    Contact Us
                  </ShimmerButton>
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Light blue box + Brand logo overlapping */}
            <div className="relative w-full sm:w-[400px] md:w-[480px] lg:w-[580px] flex-shrink-0">
              {/* Light blue box - centered on mobile, positioned lower on desktop */}
              <div
                className="relative bg-[#BFD7EA] rounded-[20px] lg:rounded-l-[20px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] shadow-[0px_8px_8px_rgba(0,0,0,0.25),0px_4px_4px_rgba(0,0,0,0.25)] mx-auto lg:mx-0"
                style={{
                  marginTop: '0',
                  marginRight: '0',
                  width: '100%',
                  maxWidth: '697px'
                }}
              />

              {/* Brand logo overlapping - hidden on mobile, visible on desktop */}
              <div
                className="hidden lg:block absolute w-[240px] md:w-[280px] lg:w-[325px] h-[240px] md:h-[280px] lg:h-[325px] rounded-[20px] overflow-hidden shadow-[0px_8px_8px_rgba(0,0,0,0.25),0px_4px_4px_rgba(0,0,0,0.25)] z-10"
                style={{
                  top: '157px',
                  left: '-120px',
                }}
              >
                <Image
                  src="/images/brands/brandspageimages/brand-logo-9.jpg"
                  alt="Brand showcase"
                  fill
                  className="object-cover"
                  sizes="325px"
                  quality={90}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== EXPLORE SECTION ===================== */}
      <section className="relative w-full px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto">
          {/* Explore heading */}
          <h2 className="font-outfit font-semibold text-[40px] sm:text-[52px] md:text-[64px] lg:text-[80px] leading-[1.26] bg-gradient-to-b from-[#23395B] via-[#23395B] to-[#406E8E] bg-clip-text text-transparent mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center lg:text-left">
            Explore
          </h2>

          {/* Curated selection description */}
          <p className="font-outfit font-light text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px] leading-[1.25] text-center text-[#161925] max-w-[1510px] mx-auto px-4">
            a curated selection of top-tier building materials from industry-leading brands – chosen for their strength, style, and proven performance across every stage of construction.
          </p>
        </div>
      </section>
    </main>
  );
}

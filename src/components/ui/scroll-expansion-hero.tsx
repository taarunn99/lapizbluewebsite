'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  bgImageSrc,
  title,
  subtitle,
  tagline,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollLockRef = useRef<boolean>(false);

  // Check if mobile - on mobile, show content immediately
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, skip animation and show content immediately
      if (mobile) {
        setScrollProgress(1);
        setShowContent(true);
        setIsActive(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Main scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Activate when section is near top of viewport
      if (rect.top <= windowHeight * 0.3 && rect.bottom > 0) {
        if (!isActive && scrollProgress < 1) {
          setIsActive(true);
        }
      } else {
        if (scrollProgress === 0) {
          setIsActive(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollProgress, isActive]);

  // Wheel handler for expansion - IMPROVED SENSITIVITY
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isActive || isMobile) return; // Skip on mobile
      if (scrollProgress >= 1) return; // Already expanded

      e.preventDefault();

      // Increased sensitivity: 0.002 instead of 0.001 for faster expansion
      const delta = e.deltaY * 0.002;
      setScrollProgress(prev => {
        const newProgress = Math.max(0, Math.min(1, prev + delta));

        // Lower threshold for showing content (0.5 instead of 1)
        if (newProgress >= 0.5) {
          setShowContent(true);
        } else if (newProgress < 0.3) {
          setShowContent(false);
        }

        // Release scroll lock when mostly expanded (0.9 instead of 1)
        if (newProgress >= 0.9) {
          setIsActive(false);
        }

        return newProgress;
      });
    };

    if (isActive && !isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [isActive, scrollProgress, isMobile]);

  // Touch handler - disabled on mobile since we show content immediately
  // Keeping for tablet/desktop touch devices
  useEffect(() => {
    if (isMobile) return; // Skip on mobile

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (!isActive) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isActive || scrollProgress >= 1) return;

      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 0.005; // Increased sensitivity

      e.preventDefault();

      setScrollProgress(prev => {
        const newProgress = Math.max(0, Math.min(1, prev + delta));

        if (newProgress >= 0.5) {
          setShowContent(true);
        } else if (newProgress < 0.3) {
          setShowContent(false);
        }

        if (newProgress >= 0.9) {
          setIsActive(false);
        }

        return newProgress;
      });

      touchStartY = touchY;
    };

    if (isActive) {
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });

      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [isActive, scrollProgress, isMobile]);

  const mediaWidth = 300 + scrollProgress * (isMobile ? 550 : 1150);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const maxTranslateX = isMobile ? 150 : 120;
  const textTranslateX = maxTranslateX * (1 - scrollProgress);

  return (
    <div className='overflow-x-hidden bg-white'>
      <section
        ref={sectionRef}
        className='relative flex flex-col items-center justify-start min-h-[100dvh]'
      >
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          {/* Background with fade */}
          <motion.div
            className='absolute inset-0 z-0 h-full'
            animate={{ opacity: isMobile ? 0 : (1 - scrollProgress * 0.8) }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen object-cover'
              priority={false}
            />
          </motion.div>

          {/* Main content container */}
          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            {/* Only show hero section on desktop */}
            {!isMobile && (
              <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative gap-8'>
                {/* Text content - ABOVE image */}
                <div
                  className={`flex flex-col items-center justify-center text-center gap-2 md:gap-4 w-full relative z-20 px-4 ${
                    textBlend ? 'mix-blend-difference' : ''
                  }`}
                >
                  {title && (
                    <motion.h2
                      className='font-outfit font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-[#23395B]'
                      style={{ transform: `translateX(-${textTranslateX}px)` }}
                    >
                      {title}
                    </motion.h2>
                  )}

                  {subtitle && (
                    <motion.p
                      className='font-outfit font-light text-xl md:text-2xl lg:text-3xl text-[#23395B]'
                      style={{ transform: `translateX(${textTranslateX}px)` }}
                    >
                      {subtitle}
                    </motion.p>
                  )}

                  {tagline && (
                    <motion.p
                      className='font-outfit font-light text-base md:text-lg lg:text-xl text-white max-w-2xl mt-2'
                      style={{ transform: `translateX(-${textTranslateX * 0.5}px)` }}
                    >
                      {tagline}
                    </motion.p>
                  )}
                </div>

                {/* Expanding Image - BELOW text */}
                <motion.div
                  className='relative rounded-2xl shadow-2xl z-10'
                  style={{
                    width: `${mediaWidth}px`,
                    height: `${mediaHeight}px`,
                    maxWidth: '95vw',
                    maxHeight: '60vh',
                  }}
                >
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-2xl'
                    />

                    {/* Overlay */}
                    <motion.div
                      className='absolute inset-0 bg-black/40 rounded-2xl'
                      animate={{ opacity: 0.4 - scrollProgress * 0.2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Scroll to expand text */}
                  {scrollToExpand && scrollProgress < 0.8 && (
                    <motion.div
                      className='absolute -bottom-12 left-1/2 -translate-x-1/2 text-center'
                      animate={{ opacity: 1 - scrollProgress * 2 }}
                    >
                      <p className='text-white font-light text-sm md:text-base'>
                        {scrollToExpand}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            )}

            {/* Mobile: Show simple header */}
            {isMobile && (
              <div className='w-full py-16 px-4 text-center'>
                {title && (
                  <h2 className='font-outfit font-bold text-4xl text-[#23395B] mb-4'>
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className='font-outfit font-light text-xl text-[#23395B] mb-2'>
                    {subtitle}
                  </p>
                )}
                {tagline && (
                  <p className='font-outfit font-light text-base text-[#23395B]/70 max-w-2xl mx-auto'>
                    {tagline}
                  </p>
                )}
              </div>
            )}

            {/* Children content - shows immediately on mobile, after expansion on desktop */}
            <motion.section
              className='w-full px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-16 lg:py-20 bg-white'
              initial={{ opacity: isMobile ? 1 : 0 }}
              animate={{ opacity: showContent ? 1 : (isMobile ? 1 : 0) }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;

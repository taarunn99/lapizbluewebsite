import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { ShimmerButton } from './shimmer-button';
import Link from 'next/link';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#406E8E]">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        phone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#406E8E]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#406E8E]">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};


// Prop types for the BrandsHeroSection component
interface BrandsHeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  backgroundImage: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const BrandsHeroSection = React.forwardRef<HTMLDivElement, BrandsHeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, backgroundImage, contactInfo, ...props }, ref) => {

    // Animation variants for the container to orchestrate children animations
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

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    // Animation variant for the decorative line
    const lineVariants = {
      hidden: { scaleX: 0, opacity: 0 },
      visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          delay: 0.4,
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-white text-[#161925]",
          "md:flex-row md:min-h-screen",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-6 sm:p-8 md:w-1/2 md:p-12 lg:p-16">
            {/* Top Section: Logo */}
            {logo && (
                <motion.header className="mb-8 md:mb-12" variants={itemVariants}>
                    <div className="flex items-center">
                        <img src={logo.url} alt={logo.alt} className="mr-3 h-6 md:h-8" />
                        <div>
                            {logo.text && <p className="text-base md:text-lg font-bold text-[#161925]">{logo.text}</p>}
                            {slogan && <p className="text-xs tracking-wider text-[#161925]/70">{slogan}</p>}
                        </div>
                    </div>
                </motion.header>
            )}

            {/* Middle Section: Main Content - Centered Vertically */}
            <motion.main className="flex-1 flex flex-col justify-center" variants={containerVariants}>
                <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#161925]" variants={itemVariants}>
                    {title}
                </motion.h1>
                <motion.div
                    className="my-4 md:my-6 h-1 w-16 md:w-20 bg-[#406E8E]"
                    variants={lineVariants}
                    style={{ originX: 0 }}
                ></motion.div>
                <motion.p className="mb-6 md:mb-8 max-w-md text-sm sm:text-base md:text-lg text-[#161925]/80 leading-relaxed" variants={itemVariants}>
                    {subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                    <Link href="/contact">
                        <ShimmerButton
                            shimmerColor="#87CEEB"
                            shimmerSize="0.15em"
                            shimmerDuration="2.5s"
                            borderRadius="1rem"
                            background="#161925"
                            className="px-8 py-4 text-sm md:text-base font-semibold hover:scale-105 transition-transform duration-300"
                        >
                            Contact Us
                        </ShimmerButton>
                    </Link>
                    <a
                        href="https://api.whatsapp.com/send?phone=971502814338&text=Hello!%20I'm%20interested%20in%20your%20construction%20materials%20and%20solutions."
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        onClick={() => {
                            // Track WhatsApp click for Google Ads conversion
                            if (typeof window !== 'undefined' && (window as any).gtag) {
                                (window as any).gtag('event', 'conversion', {
                                    send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
                                    event_category: 'engagement',
                                    event_label: 'whatsapp_brands_hero_click',
                                    value: 1.0,
                                    currency: 'AED'
                                });
                            }
                            // Google Tag Manager DataLayer
                            if (typeof window !== 'undefined' && (window as any).dataLayer) {
                                (window as any).dataLayer.push({
                                    event: 'whatsapp_click',
                                    eventCategory: 'Contact',
                                    eventAction: 'WhatsApp Hero Button Click',
                                    eventLabel: 'Brands Page Hero',
                                    contactMethod: 'whatsapp'
                                });
                            }
                        }}
                        data-whatsapp-business="true"
                        data-contact-method="whatsapp"
                        data-conversion-tracking="enabled"
                        aria-label="Chat with Lapiz Blue on WhatsApp Business"
                    >
                        <ShimmerButton
                            shimmerColor="#87CEEB"
                            shimmerSize="0.15em"
                            shimmerDuration="2.5s"
                            borderRadius="1rem"
                            background="#161925"
                            className="px-8 py-4 text-sm md:text-base font-semibold hover:scale-105 transition-transform duration-300"
                        >
                            WhatsApp Us
                        </ShimmerButton>
                    </a>
                </motion.div>
            </motion.main>

            {/* Bottom Section: Footer Info */}
            <motion.footer className="mt-8 md:mt-12 w-full" variants={itemVariants}>
                <div className="grid grid-cols-1 gap-4 md:gap-6 text-xs md:text-sm text-[#161925]/70 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center">
                        <InfoIcon type="website" />
                        <span>{contactInfo.website}</span>
                    </div>
                    <div className="flex items-center">
                        <InfoIcon type="phone" />
                        <span>{contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center sm:col-span-2 lg:col-span-1">
                        <InfoIcon type="address" />
                        <span>{contactInfo.address}</span>
                    </div>
                </div>
            </motion.footer>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="w-full min-h-[300px] sm:min-h-[400px] bg-cover bg-center md:w-1/2 md:min-h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
        </motion.div>
      </motion.section>
    );
  }
);

BrandsHeroSection.displayName = "BrandsHeroSection";

export { BrandsHeroSection };

import React from 'react';
import { cn } from "@/lib/utils";
import { ShimmerButton } from './shimmer-button';
import Link from 'next/link';
import Image from 'next/image';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'instagram' | 'address' }) => {
    const icons = {
        website: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 md:h-7 md:w-7 text-[#406E8E]">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        instagram: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 md:h-7 md:w-7 text-[#406E8E]">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
        ),
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 md:h-7 md:w-7 text-[#406E8E]">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-3 flex-shrink-0">{icons[type]}</div>;
};


// Prop types for the BrandsHeroSection component
interface BrandsHeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
    instagram: string;
    address: string;
  };
}

const BrandsHeroSection = React.forwardRef<HTMLDivElement, BrandsHeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, backgroundImage, contactInfo, ...props }, ref) => {

    return (
      <section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-white text-[#161925]",
          "md:flex-row md:min-h-screen",
          className
        )}
        {...props}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-6 sm:p-8 md:w-1/2 md:p-12 lg:p-16">
            {/* Top Section: Logo */}
            {logo && (
                <header className="mb-8 md:mb-12">
                    <div className="flex items-center">
                        <Image src={logo.url} alt={logo.alt} width={32} height={32} className="mr-3 h-6 md:h-8 w-auto" priority />
                        <div>
                            {logo.text && <p className="text-base md:text-lg font-bold text-[#161925]">{logo.text}</p>}
                            {slogan && <p className="text-xs tracking-wider text-[#161925]/70">{slogan}</p>}
                        </div>
                    </div>
                </header>
            )}

            {/* Middle Section: Main Content - Centered Vertically */}
            <main className="flex-1 flex flex-col justify-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#161925]">
                    {title}
                </h1>
                <div
                    className="my-4 md:my-6 h-1 w-16 md:w-20 bg-[#406E8E]"
                ></div>
                <p className="mb-6 md:mb-8 max-w-md text-sm sm:text-base md:text-lg text-[#161925]/80 leading-relaxed">
                    {subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
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
                </div>
            </main>

            {/* Bottom Section: Footer Info */}
            <footer className="mt-8 md:mt-12 w-full">
                <div className="grid grid-cols-1 gap-5 md:gap-8 text-sm md:text-base lg:text-lg text-[#161925]/80 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center">
                        <InfoIcon type="website" />
                        <span className="font-medium">{contactInfo.website}</span>
                    </div>
                    <div className="flex items-center">
                        <InfoIcon type="instagram" />
                        <span className="font-medium">{contactInfo.instagram}</span>
                    </div>
                    <div className="flex items-center sm:col-span-2 lg:col-span-1">
                        <InfoIcon type="address" />
                        <span className="font-medium">{contactInfo.address}</span>
                    </div>
                </div>
            </footer>
        </div>

        {/* Right Side: Image - Static, no clip-path animation */}
        <div
          className="relative w-full min-h-[300px] sm:min-h-[400px] md:w-1/2 md:min-h-full overflow-hidden"
          style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            priority
            fetchPriority="high"
            sizes="50vw"
            className="object-cover object-center"
          />
        </div>
      </section>
    );
  }
);

BrandsHeroSection.displayName = "BrandsHeroSection";

export { BrandsHeroSection };

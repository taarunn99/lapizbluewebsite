"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LocationPinCursor } from "./ui/location-pin-cursor";
import { LocationCard } from "./ui/location-card";

const locations = [
  {
    id: "abudhabi",
    name: "Abu Dhabi",
    address: "Shop 2 - Musaffah Industrial 40 - Abu Dhabi",
    phone: "+971 2 886 7753",
    image: "/images/stores/abudhabi-lapizblue.webp",
    imagePosition: "object-top",
    mapsUrl: "https://www.google.com/maps/dir//Shop+2+-+Musaffah+Industrial+40+-+Abu+Dhabi/@25.1082086,55.2148743,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3e5e41f6da170089:0x240c2ef83a9e23d6!2m2!1d54.4884806!2d24.3458438?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: "dubai",
    name: "Dubai",
    address: "Shop 12 - 14 4 Street - Al Quoz - Al Quoz Industrial Area 4 - Dubai",
    phone: "+971 4 885 5257",
    image: "/images/stores/dubai-lapizblue.webp",
    imagePosition: "object-[center_80%]",
    mapsUrl: "https://www.google.com/maps?sca_esv=5d00e0a4043178f7&rlz=1C5MACD_enIN1109IN1110&sxsrf=AE3TifPkKRlpEh3_fjcN3Mu457nRzE1Abg:1762256969494&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiEGxhcGl6IGJsdWUgZHVhYmkyBxAjGLACGCcyDRAuGIAEGMcBGA0YrwEyBhAAGBYYHjIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogQyHBAuGIAEGMcBGA0YrwEYlwUY3AQY3gQY4ATYAQFIuDxQ_wNY1TlwAngAkAEAmAGfA6ABhCmqAQcyLTkuNi4yuAEDyAEA-AEBmAIToALqKagCEMICCxAAGIAEGLADGKIEwgIHECMYJxjqAsICDRAjGIAEGCcYigUY6gLCAhQQABiABBiRAhi0AhiKBRjqAtgBAcICBBAjGCfCAgoQIxiABBgnGIoFwgILEAAYgAQYkQIYigXCAgoQABiABBhDGIoFwgIQEC4YgAQY0QMYQxjHARiKBcICERAuGIAEGJECGMcBGIoFGK8BwgINEAAYgAQYsQMYQxiKBcICGRAuGIAEGEMYxwEYmAUYmQUYigUYngUYrwHCAggQABiABBixA8ICBRAAGIAEwgILEC4YgAQYxwEYrwHCAgoQABiABBixAxgKwgINEC4YgAQYxwEYChivAcICBxAAGIAEGArCAggQABgWGAoYHsICGhAuGIAEGMcBGK8BGJcFGNwEGN4EGOAE2AEBwgICECbCAgsQABiABBiGAxiKBcICBRAhGKABwgIFECEYnwWYAwXiAwUSATEgQPEFfiwnlmdooi6IBgGQBgS6BgYIARABGAGSBwkyLjAuOC43LjKgB9rcAbIHBzItOC43LjK4B9opwgcGMC41LjE0yAdI&um=1&ie=UTF-8&fb=1&gl=ae&sa=X&geocode=KS-Xavnea18-MbECE_uLggC8&daddr=Shop+12+-+14+4+Street+-+Al+Quoz+-+Al+Quoz+Industrial+Area+4+-+Dubai",
  },
  {
    id: "sharjah",
    name: "Sharjah",
    address: "Al Sajaa - Sharjah",
    phone: "+971 6 569 5001",
    image: "/images/locations/sharjah-lapizblue.webp",
    imagePosition: "object-top",
    mapsUrl: "https://www.google.com/maps?sca_esv=5d00e0a4043178f7&rlz=1C5MACD_enIN1109IN1110&sxsrf=AE3TifN0FjhM0UizWBc2Xy16JQ4dNDndGQ:1762261808595&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiE2xhcGl6IGJsdWUgc2hhcmphaCAyBhAAGBYYHjIGEAAYFhgeMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIFEAAY7wVI2bIBUKkCWI97cAx4AJABAJgBsgOgAZwWqgEJMS4wLjQuNC4xuAEDyAEA-AEBmAIVoAL3FsICChAAGLADGNYEGEfCAhAQLhiABBjHARgnGIoFGK8BwgILEAAYgAQYhgMYigXCAh0QLhiABBjHARiKBRivARiXBRjcBBjeBBjgBNgBAcICBBAjGCfCAgsQLhiABBjHARivAcICBRAAGIAEwgIKECMYgAQYJxiKBcICERAuGIAEGJECGMcBGIoFGK8BwgIKEAAYgAQYFBiHAsICIBAuGIAEGJECGMcBGIoFGK8BGJcFGNwEGN4EGOAE2AEBwgIQEC4YgAQYFBiHAhjHARivAcICCBAAGBYYChgewgIaEC4YgAQYxwEYrwEYlwUY3AQY3gQY4ATYAQHCAgIQJpgDAOIDBRIBMSBAiAYBkAYEugYGCAEQARgUkgcKMTIuMC40LjQuMaAHwWKyBwcyLTQuNC4xuAfEFsIHBjAuNi4xNcgHUw&um=1&ie=UTF-8&fb=1&gl=ae&sa=X&geocode=KXOsRqzm8_U-Mc7gbbf-vk5o&daddr=Al+Sajaa+-+Sharjah",
  },
];

export default function LocationMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [showCursor, setShowCursor] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCursor(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(selectedLocation === locationId ? null : locationId);
  };

  const selectedLocationData = locations.find(
    (loc) => loc.id === selectedLocation
  );

  return (
    <>
      {/* Custom cursor - only when in viewport and not mobile */}
      {showCursor && !isMobile && <LocationPinCursor />}

      {/* Location card overlay */}
      <AnimatePresence>
        {selectedLocation && selectedLocationData && (
          <LocationCard
            name={selectedLocationData.name}
            address={selectedLocationData.address}
            phone={selectedLocationData.phone}
            image={selectedLocationData.image}
            imagePosition={selectedLocationData.imagePosition}
            mapsUrl={selectedLocationData.mapsUrl}
            onClose={() => setSelectedLocation(null)}
          />
        )}
      </AnimatePresence>

      <section
        ref={ref}
        className="relative w-full bg-[#F5F5F5] py-20 md:py-32 overflow-hidden"
        style={{ cursor: showCursor && !isMobile ? "none" : "auto" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Map visualization */}
        <motion.div
          className="relative w-full h-[300px] md:h-[400px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <svg
            viewBox="0 0 1200 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Main flowing curved path with loops - matching the image layout */}
            <motion.path
              d="M 150 250 
                 C 100 280, 100 200, 150 180
                 C 200 160, 250 160, 300 180
                 Q 400 200, 500 180
                 C 550 170, 600 160, 650 180
                 C 700 200, 750 220, 800 200
                 C 850 180, 900 160, 950 180
                 Q 1000 200, 1050 200"
              stroke="#2C2C2C"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
            />

            {/* Abu Dhabi - leftmost */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
              className="cursor-pointer"
              onMouseEnter={() => {
                if (!isMobile) {
                  setSelectedLocation("abudhabi");
                }
              }}
              onClick={() => {
                if (isMobile) {
                  handleLocationClick("abudhabi");
                } else {
                  setSelectedLocation("abudhabi");
                }
              }}
            >
              <circle cx="150" cy="230" r="20" fill="#406E8E" className="transition-all hover:fill-[#4A9FD8]" />
              <text
                x="150"
                y="280"
                textAnchor="middle"
                className="font-outfit font-medium text-lg md:text-xl fill-[#2C2C2C] pointer-events-none"
              >
                Abu Dhabi, UAE
              </text>
            </motion.g>

            {/* Dubai - center */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
              className="cursor-pointer"
              onMouseEnter={() => {
                if (!isMobile) {
                  setSelectedLocation("dubai");
                }
              }}
              onClick={() => {
                if (isMobile) {
                  handleLocationClick("dubai");
                } else {
                  setSelectedLocation("dubai");
                }
              }}
            >
              <circle cx="500" cy="180" r="20" fill="#406E8E" className="transition-all hover:fill-[#4A9FD8]" />
              <text
                x="500"
                y="140"
                textAnchor="middle"
                className="font-outfit font-medium text-lg md:text-xl fill-[#2C2C2C] pointer-events-none"
              >
                Dubai, UAE
              </text>
            </motion.g>

            {/* Sharjah - right of center */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
              className="cursor-pointer"
              onMouseEnter={() => {
                if (!isMobile) {
                  setSelectedLocation("sharjah");
                }
              }}
              onClick={() => {
                if (isMobile) {
                  handleLocationClick("sharjah");
                } else {
                  setSelectedLocation("sharjah");
                }
              }}
            >
              <circle cx="800" cy="200" r="20" fill="#406E8E" className="transition-all hover:fill-[#4A9FD8]" />
              <text
                x="800"
                y="250"
                textAnchor="middle"
                className="font-outfit font-medium text-lg md:text-xl fill-[#2C2C2C] pointer-events-none"
              >
                Sharjah, UAE
              </text>
            </motion.g>

            {/* Large location pin - rightmost */}
            <motion.g
              initial={{ scale: 0, opacity: 0, y: -20 }}
              animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 150 }}
            >
              <path
                d="M 1050 200 
                   C 1050 175, 1065 160, 1080 160
                   C 1095 160, 1110 175, 1110 200
                   C 1110 215, 1105 225, 1080 260
                   C 1055 225, 1050 215, 1050 200 Z"
                fill="#4A9FD8"
                className="drop-shadow-lg"
              />
              <circle cx="1080" cy="190" r="12" fill="white" />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </section>
    </>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface ProductCard {
  slug: string;
  heading: string;
  description: string;
  imgSrc: string;
}

const productCards: ProductCard[] = [
  {
    slug: "interior",
    heading: "Interior",
    description: "Transform your living spaces with Dulux interior paints - from feature walls to whole-home makeovers.",
    imgSrc: "/images/brands/akzonobel/interior.webp",
  },
  {
    slug: "exterior",
    heading: "Exterior",
    description: "Weather-resistant paints built for the UAE climate - protecting facades while looking fresh for years.",
    imgSrc: "/images/brands/akzonobel/exterior.webp",
  },
  {
    slug: "flooring",
    heading: "Flooring",
    description: "Industrial-strength floor coatings for warehouses, showrooms, and commercial spaces.",
    imgSrc: "/images/brands/akzonobel/flooring.webp",
  },
  {
    slug: "metal-surfaces",
    heading: "Metal Surfaces",
    description: "Protective coatings for steel structures, equipment, and architectural metalwork.",
    imgSrc: "/images/brands/akzonobel/metal-surfaces/hero.webp",
  },
];

export function AkzoNobelProductCards() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b5f] mb-4">
            Explore Our Range
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From homes to high-rises, we have the right paint for every surface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {productCards.map((card) => (
            <Card
              key={card.slug}
              slug={card.slug}
              heading={card.heading}
              description={card.description}
              imgSrc={card.imgSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  slug: string;
  heading: string;
  description: string;
  imgSrc: string;
}

// Placeholder gradients for missing images
const placeholderGradients: Record<string, string> = {
  exterior: "linear-gradient(135deg, #1a2b5f 0%, #3b5998 50%, #6b8cce 100%)",
  flooring: "linear-gradient(135deg, #2d3436 0%, #636e72 50%, #b2bec3 100%)",
  "metal-surfaces": "linear-gradient(135deg, #4a5568 0%, #718096 50%, #a0aec0 100%)",
};

const Card = ({ slug, heading, description, imgSrc }: CardProps) => {
  const hasImage = imgSrc && imgSrc.length > 0;
  const backgroundStyle = hasImage
    ? { backgroundImage: `url(${imgSrc})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: placeholderGradients[slug] || "#1a2b5f" };

  return (
    <Link href={`/brands/akzonobel/${slug}`}>
      <motion.div
        transition={{ staggerChildren: 0.035 }}
        whileHover="hover"
        className="group relative h-64 md:h-72 w-full cursor-pointer overflow-hidden rounded-xl"
      >
        {/* Background Image - B&W by default, color on hover */}
        <div
          className={`absolute inset-0 transition-all duration-500 group-hover:scale-110 ${hasImage ? "grayscale group-hover:grayscale-0" : ""}`}
          style={backgroundStyle}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-20 flex h-full flex-col justify-between p-5 md:p-6">
          <FiArrowRight className="ml-auto text-2xl md:text-3xl text-white/80 transition-all duration-500 group-hover:text-white group-hover:-rotate-45" />
          <div>
            <h4 className="mb-2">
              {heading.split("").map((letter, index) => (
                <AnimatedLetter letter={letter} key={index} />
              ))}
            </h4>
            <p className="text-sm md:text-base text-white/80 transition-colors duration-500 group-hover:text-white">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

interface AnimatedLetterProps {
  letter: string;
}

const letterVariants: Variants = {
  hover: {
    y: "-50%",
  },
};

const AnimatedLetter = ({ letter }: AnimatedLetterProps) => {
  return (
    <div className="inline-block h-[32px] md:h-[40px] overflow-hidden font-bold text-2xl md:text-3xl text-white">
      <motion.span
        className="flex min-w-[4px] flex-col"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.5 }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </div>
  );
};

export default AkzoNobelProductCards;

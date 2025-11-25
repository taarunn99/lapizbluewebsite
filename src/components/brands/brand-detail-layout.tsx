"use client";

import React from "react";
import { BrandData } from "@/types/brand";
import Image from "next/image";

interface BrandDetailLayoutProps {
  brand: BrandData;
}

/**
 * Reusable layout component for brand detail pages
 * This is a placeholder structure - actual design to be implemented later
 */
export function BrandDetailLayout({ brand }: BrandDetailLayoutProps) {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* Placeholder Hero Section */}
      <section className="relative w-full min-h-[60vh] bg-gradient-to-br from-[#161925] to-[#406E8E] flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Brand Logo */}
          <div className="relative w-48 h-24 mx-auto mb-8">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Brand Name */}
          <h1 className="font-outfit font-bold text-white text-5xl md:text-7xl mb-4">
            {brand.name}
          </h1>

          {/* Tagline */}
          <p className="font-outfit text-white/90 text-xl md:text-2xl max-w-3xl mx-auto">
            {brand.tagline}
          </p>

          {/* Placeholder Badge */}
          <div className="mt-8 inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <p className="text-white/80 text-sm font-medium">
              🚧 Page Under Construction - Design Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder Content Section */}
      <section className="relative w-full bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Description */}
          <div className="mb-12">
            <h2 className="font-outfit font-bold text-[#161925] text-3xl md:text-4xl mb-6">
              About {brand.name}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#161925]/80 leading-relaxed">{brand.description}</p>
            </div>
          </div>

          {/* Placeholder Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-outfit font-semibold text-[#161925] mb-2">SEO Title</h3>
              <p className="text-sm text-[#161925]/60">{brand.seo.metaTitle}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-outfit font-semibold text-[#161925] mb-2">Slug</h3>
              <p className="text-sm text-[#161925]/60">/{brand.slug}</p>
            </div>
            {brand.website && (
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-outfit font-semibold text-[#161925] mb-2">Website</h3>
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#406E8E] hover:underline"
                >
                  Visit Official Site →
                </a>
              </div>
            )}
          </div>

          {/* Placeholder Notice */}
          <div className="mt-16 p-8 bg-[#406E8E]/5 border-l-4 border-[#406E8E] rounded-r-lg">
            <h3 className="font-outfit font-semibold text-[#161925] text-xl mb-3">
              📝 Content Placeholder
            </h3>
            <p className="text-[#161925]/70 mb-4">
              This is a placeholder page for <strong>{brand.name}</strong>. The following sections
              will be added once the design is finalized:
            </p>
            <ul className="list-disc list-inside text-[#161925]/70 space-y-2">
              <li>Hero section with custom imagery</li>
              <li>Detailed brand description and history</li>
              <li>Product lines and categories</li>
              <li>Features and benefits showcase</li>
              <li>Contact and CTA section</li>
              <li>Related brands recommendations</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

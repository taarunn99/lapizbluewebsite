'use client';

import { useState } from "react";
import { Manrope, Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "500"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["100"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

interface BlogContentProps {
  posts: BlogPost[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = ["Products", "Brands", "Solution", "Mapei", "Profilpas"];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Filter posts based on selected categories
  const filteredPosts = selectedFilters.length === 0
    ? posts
    : posts.filter(post => selectedFilters.includes(post.category));

  return (
    <section className="relative w-full bg-white">
      {/* Blogs & Stories Heading */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-8 md:pt-12 lg:pt-16 pb-6">
        <h2
          className={`${manrope.className} text-[#23395B] font-extralight
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            leading-tight`}
        >
          Blogs & Stories
        </h2>
      </div>

      {/* Line under Blogs & Stories */}
      <div className="w-full h-[1px] bg-black" />

      {/* Main Content Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
          {/* Left Sidebar - Filters */}
          <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-8 lg:py-12 border-b lg:border-b-0 lg:border-r border-black">
            {/* Filters Heading */}
            <h3
              className={`${manrope.className} text-[#23395B] font-medium text-xl md:text-2xl lg:text-[36px] mb-4`}
            >
              Filters
            </h3>

            {/* Line under Filters */}
            <div className="w-full h-[1px] bg-black mb-6 lg:mb-8" />

            {/* Filter Checkboxes */}
            <div className="flex flex-row lg:flex-col gap-6 lg:gap-8">
              {filters.map((filter) => (
                <label
                  key={filter}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative w-[29px] h-[27px] flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter)}
                      onChange={() => toggleFilter(filter)}
                      className="appearance-none w-[29px] h-[27px] border border-black bg-[#D9D9D9] checked:bg-[#23395B] cursor-pointer transition-all"
                    />
                    {selectedFilters.includes(filter) && (
                      <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`${outfit.className} text-[#161925] font-thin text-lg md:text-xl lg:text-[32px] group-hover:text-[#23395B] transition-colors`}
                  >
                    {filter}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Right Side - Blog Cards Grid */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 lg:py-12">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No blog posts found for the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="relative w-full aspect-[450/550] bg-[#D9D9D9] overflow-hidden hover:opacity-90 transition-opacity">
                      {/* Blog post image */}
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      )}

                      {/* Overlay with post info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-center items-center p-6">
                        {/* Heading above line */}
                        <h3 className={`${outfit.className} text-white font-normal text-lg md:text-xl mb-4 line-clamp-2 text-center px-4`}>
                          {post.title}
                        </h3>

                        {/* Line inside card */}
                        <div className="w-3/4 h-[1px] bg-white/50 mb-4" />

                        {/* Description below line */}
                        <p className="text-white/80 text-sm line-clamp-2 text-center px-4">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Date and category at bottom corner */}
                      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                        <span className="text-white/60 text-xs">{post.date}</span>
                        <span className="text-white/60 text-xs">{post.category}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

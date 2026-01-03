"use client";

import React, { useState } from "react";
import Image from "next/image";
import { type SearchItem } from "@/data/searchIndex";

interface SearchResultItemProps {
  item: SearchItem;
  query: string;
  isActive: boolean;
  onClick: () => void;
}

// Category badge colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  brand: { bg: "bg-blue-100", text: "text-blue-700" },
  tool: { bg: "bg-orange-100", text: "text-orange-700" },
  blog: { bg: "bg-green-100", text: "text-green-700" },
  page: { bg: "bg-gray-100", text: "text-gray-700" },
  product: { bg: "bg-purple-100", text: "text-purple-700" },
  calculator: { bg: "bg-teal-100", text: "text-teal-700" },
};

// Highlight matching text in title
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-[#161925] rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// Fallback icon when no image
function FallbackIcon({ type }: { type: SearchItem["type"] }) {
  const icons: Record<string, React.ReactNode> = {
    page: (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    brand: (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    tool: (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    product: (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    blog: (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    calculator: (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
      {icons[type] || icons.page}
    </div>
  );
}

export function SearchResultItem({ item, query, isActive, onClick }: SearchResultItemProps) {
  const colors = categoryColors[item.type] || categoryColors.page;
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 text-left transition-colors rounded-lg ${
        isActive ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      role="option"
      aria-selected={isActive}
    >
      {/* Image or fallback */}
      {item.image && !imageError ? (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="48px"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <FallbackIcon type={item.type} />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Category badge */}
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-1 ${colors.bg} ${colors.text}`}>
          {item.category}
        </span>

        {/* Title with highlighted match */}
        <h4 className="font-manrope font-semibold text-sm text-[#161925] truncate">
          {highlightMatch(item.title, query)}
        </h4>

        {/* Description */}
        <p className="font-manrope text-xs text-gray-500 line-clamp-1">
          {item.description}
        </p>
      </div>

      {/* Arrow indicator */}
      <svg
        className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-1 transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

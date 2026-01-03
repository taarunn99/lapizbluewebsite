"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "./useSearch";
import { SearchResultItem } from "./SearchResultItem";

interface SearchDropdownProps {
  onClose: () => void;
}

export function SearchDropdown({ onClose }: SearchDropdownProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    results,
    isSearching,
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    navigateToResult,
    clearSearch,
  } = useSearch({ maxResults: 10 });

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle result click
  const handleResultClick = (index: number) => {
    const item = results[index];
    if (item) {
      navigateToResult(item);
      onClose();
    }
  };

  // Handle keyboard navigation with close
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      navigateToResult(results[activeIndex]);
      onClose();
    } else {
      handleKeyDown(e);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Dropdown */}
      <motion.div
        className="fixed z-50 left-0 right-0 md:left-auto md:right-4 lg:right-8 top-[72px] md:top-[80px] mx-4 md:mx-0 md:w-[480px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-label="Site search"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth={1.5} />
                <path d="M21 21l-4.35-4.35" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search pages, brands, tools..."
                className="w-full pl-10 pr-10 py-3 text-base font-manrope text-[#161925] bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#406E8E]/30 placeholder:text-gray-400"
                aria-label="Search"
              />
              {query && (
                <button
                  onClick={() => {
                    clearSearch();
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div
            className="max-h-[50vh] md:max-h-[400px] overflow-y-auto"
            role="listbox"
          >
            <AnimatePresence mode="wait">
              {/* Loading state */}
              {isSearching && query.trim() && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center"
                >
                  <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-[#406E8E] rounded-full animate-spin" />
                </motion.div>
              )}

              {/* Empty state - no query */}
              {!query.trim() && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center"
                >
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" strokeWidth={1.5} />
                    <path d="M21 21l-4.35-4.35" strokeWidth={1.5} strokeLinecap="round" />
                  </svg>
                  <p className="text-gray-500 font-manrope text-sm">
                    Start typing to search
                  </p>
                </motion.div>
              )}

              {/* No results */}
              {query.trim() && !isSearching && results.length === 0 && (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center"
                >
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 font-manrope text-sm">
                    No results found for &quot;{query}&quot;
                  </p>
                </motion.div>
              )}

              {/* Results list */}
              {!isSearching && results.length > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-2"
                >
                  {results.map((item, index) => (
                    <SearchResultItem
                      key={item.id}
                      item={item}
                      query={query}
                      isActive={index === activeIndex}
                      onClick={() => handleResultClick(index)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer hint */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-400 font-manrope">
              <span className="hidden md:flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">↓</kbd>
                <span>Navigate</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 ml-2">Enter</kbd>
                <span>Select</span>
              </span>
              <span className="md:hidden">Tap to select</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">Esc</kbd>
                <span>Close</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

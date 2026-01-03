"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { searchIndex, getSearchableText, type SearchItem } from '@/data/searchIndex';

interface UseSearchOptions {
  debounceMs?: number;
  maxResults?: number;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[];
  isSearching: boolean;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  navigateToResult: (item: SearchItem) => void;
  clearSearch: () => void;
}

// Score search results for relevance ranking
function scoreResult(item: SearchItem, normalizedQuery: string): number {
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const category = item.category.toLowerCase();
  const searchableText = getSearchableText(item);

  // Exact title match
  if (title === normalizedQuery) return 100;
  // Title starts with query
  if (title.startsWith(normalizedQuery)) return 80;
  // Title contains query
  if (title.includes(normalizedQuery)) return 60;
  // Category matches
  if (category.includes(normalizedQuery)) return 50;
  // Description contains query
  if (description.includes(normalizedQuery)) return 40;
  // Keywords contain query
  if (item.keywords.some(k => k.toLowerCase().includes(normalizedQuery))) return 30;
  // Any match in searchable text
  if (searchableText.includes(normalizedQuery)) return 20;

  return 0;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { debounceMs = 300, maxResults = 10 } = options;

  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Debounce the search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  // Filter and sort results
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const normalizedQuery = debouncedQuery.toLowerCase().trim();

    // Score and filter results
    const scoredResults = searchIndex
      .map(item => ({
        item,
        score: scoreResult(item, normalizedQuery),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(({ item }) => item);

    return scoredResults;
  }, [debouncedQuery, maxResults]);

  // Navigate to a search result
  const navigateToResult = useCallback((item: SearchItem) => {
    router.push(item.url);
    setQuery('');
    setActiveIndex(-1);
  }, [router]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          navigateToResult(results[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setQuery('');
        setActiveIndex(-1);
        break;
    }
  }, [results, activeIndex, navigateToResult]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setActiveIndex(-1);
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    navigateToResult,
    clearSearch,
  };
}

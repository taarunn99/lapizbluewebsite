"use client";

import { useEffect } from "react";

export function ScrollPositionRestorer() {
  useEffect(() => {
    // Restore scroll position if available
    const scrollPos = sessionStorage.getItem("brandsScrollPosition");
    if (scrollPos) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(scrollPos, 10));
        sessionStorage.removeItem("brandsScrollPosition");
      });
    }
  }, []);

  return null;
}

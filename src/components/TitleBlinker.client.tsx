"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Props = {
  /** Title to use when the tab is visible (fallbacks to document.title on first render). */
  visibleTitle?: string;
  /** Messages to alternate while the tab is hidden. */
  hiddenMessages?: string[];
  /** Blink speed in ms while hidden. */
  intervalMs?: number;
  /** Quick kill-switch if you ever want to disable it via env. */
  enabled?: boolean;
};

export default function TitleBlinker({
  visibleTitle,
  hiddenMessages = ["Get Free Quote", "Today!"],
  intervalMs = 1000,
  enabled = true,
}: Props) {
  const intervalId = useRef<number | null>(null);
  const originalTitle = useRef<string>("");
  const pathname = usePathname();

  // Keep original title in sync on route changes when visible
  useEffect(() => {
    if (typeof document !== "undefined" && !document.hidden) {
      originalTitle.current = visibleTitle || document.title;
      if (visibleTitle) document.title = visibleTitle; // enforce provided visible title
    }
  }, [pathname, visibleTitle]);

  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    // Capture baseline title once (from prop or current doc title)
    if (!originalTitle.current) {
      originalTitle.current = visibleTitle || document.title;
      if (visibleTitle) document.title = visibleTitle;
    }

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const stop = () => {
      if (intervalId.current !== null) {
        window.clearInterval(intervalId.current);
        intervalId.current = null;
      }
      document.title = originalTitle.current || document.title;
    };

    const start = () => {
      let i = 0;
      stop();
      intervalId.current = window.setInterval(() => {
        document.title = hiddenMessages[i++ % hiddenMessages.length];
      }, intervalMs);
    };

    const onVisibility = () => {
      if (reduce) return stop(); // accessibility: never blink
      if (document.hidden) start();
      else {
        // restore to the most recent intended visible title
        originalTitle.current = visibleTitle || document.title;
        stop();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    onVisibility(); // initialize for current state

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [enabled, hiddenMessages, intervalMs, visibleTitle]);

  return null;
}

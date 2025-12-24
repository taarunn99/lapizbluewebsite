"use client";

import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "lapizblue-cookie-consent";

export function CookieConsent() {
  // Start with null to avoid hydration mismatch - don't render until client check
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (hasConsented) {
      // User already consented, don't show
      setIsVisible(false);
    } else {
      // Small delay before showing for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Trigger animation after mount
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Save consent to localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");

    // Animate out
    setIsAnimating(false);

    // Remove from DOM after animation
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  // Don't render during SSR (null) or when hidden (false)
  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        isAnimating ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#406E8E] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Text */}
          <p className="text-white text-sm sm:text-base text-center sm:text-left">
            We use cookies to enhance your user experience. By using this website you accept cookies.
            We do not store your personal details.
          </p>

          {/* Accept Button - outlined, fills on hover */}
          <button
            onClick={handleAccept}
            className="flex-shrink-0 px-8 py-2.5 bg-transparent border-2 border-white text-white font-semibold text-sm uppercase tracking-wider rounded transition-all duration-200 hover:bg-[#161925] hover:border-[#161925] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#406E8E]"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
}

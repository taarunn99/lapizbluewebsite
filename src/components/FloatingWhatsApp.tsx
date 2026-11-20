"use client";

import Image from "next/image";
import { useEffect } from "react";
import { trackLead } from "@/lib/track";

export default function FloatingWhatsApp() {
  const phoneNumber = "971502814338";
  const defaultMessage = "Hello! I'm interested in your construction materials and solutions.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

  const handleWhatsAppClick = () => {
    trackLead("whatsapp_click", { buttonLocation: "floating", targetHref: whatsappUrl });
  };

  // Add structured data for SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'whatsapp-business-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lapiz Blue",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": `+${phoneNumber}`,
        "contactType": "Customer Service",
        "availableLanguage": ["English", "Arabic"],
        "areaServed": "AE"
      }
    });

    const existing = document.getElementById('whatsapp-business-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('whatsapp-business-schema');
      if (el) el.remove();
    };
  }, [phoneNumber]);

  return (
    // The button deliberately overhangs the right edge on a phone. WebKit
    // counts that overhang as scrollable overflow, so at 320px the page could
    // be dragged 7px sideways, against the house rule of no horizontal
    // movement at all. The fix is this wrapper: it is the fixed element, so it
    // becomes the containing block for the button, and the button is absolute
    // inside it. The 8px past the edge is then clipped rather than scrollable,
    // which is exactly what the eye already saw. The wrapper takes no pointer
    // events, so everything underneath behaves as before.
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="absolute bottom-16 -right-2 sm:bottom-20 sm:-right-1 md:bottom-24 md:right-0 group pointer-events-auto"
      aria-label="Chat with Lapiz Blue on WhatsApp"
      onClick={handleWhatsAppClick}
      data-lb-tracked="1"
      style={{ animation: "bounce-slow 3s ease-in-out infinite" }}
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 transition-transform duration-300 hover:scale-110 active:scale-95">
        <Image
          src="/logos/whatsappfavicon.svg"
          alt="Chat on WhatsApp"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      <div className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-20 group-hover:animate-ping whatsapp-auto-blink" />

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes whatsapp-blink {
          0%, 82% { opacity: 0; transform: scale(1); }
          85% { opacity: 0.3; transform: scale(1.12); }
          88% { opacity: 0; transform: scale(1.3); }
          89%, 90% { opacity: 0; transform: scale(1); }
          93% { opacity: 0.3; transform: scale(1.12); }
          96%, 100% { opacity: 0; transform: scale(1.3); }
        }
        .whatsapp-auto-blink {
          animation: whatsapp-blink 6s ease-in-out infinite;
        }
        .group:hover .whatsapp-auto-blink {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          opacity: 0.2;
        }
      `}</style>
    </a>
    </div>
  );
}

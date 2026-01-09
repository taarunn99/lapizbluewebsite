"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function FloatingWhatsApp() {
  const phoneNumber = "971502814338";
  const defaultMessage = "Hello! I'm interested in your construction materials and solutions.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

  // Handle click tracking via GTM dataLayer
  const handleWhatsAppClick = () => {
    if (typeof window === 'undefined') return;

    // Log to our database
    const urlParams = new URLSearchParams(window.location.search);
    fetch('/api/leads/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'whatsapp_click',
        pageUrl: window.location.href,
        utmSource: urlParams.get('utm_source') || undefined,
        utmMedium: urlParams.get('utm_medium') || undefined,
        utmCampaign: urlParams.get('utm_campaign') || undefined,
      }),
      keepalive: true,
    }).catch(() => {});

    // Push to GTM dataLayer
    const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'whatsapp_click',
      contact_method: 'whatsapp',
      button_location: 'floating',
      phone_number: phoneNumber,
    });
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
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="fixed bottom-16 -right-2 sm:bottom-20 sm:-right-1 md:bottom-24 md:right-0 z-50 group"
      aria-label="Chat with Lapiz Blue on WhatsApp"
      onClick={handleWhatsAppClick}
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
  );
}

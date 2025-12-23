"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

export default function FloatingWhatsApp() {
  const phoneNumber = "971502814338"; // Format: country code + number (no + or spaces)
  const businessName = "Lapiz Blue";
  const defaultMessage = "Hello! I'm interested in your construction materials and solutions.";

  // WhatsApp Business API URL with pre-filled message
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

  // Handle click tracking for Google Ads and Analytics
  const handleWhatsAppClick = () => {
    // Log to our database (fire and forget)
    if (typeof window !== 'undefined') {
      fetch('/api/leads/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'whatsapp_click',
          pageUrl: window.location.href,
        }),
        keepalive: true, // Ensures request completes even if page navigates
      }).catch((error) => {
        // Log error in development, silently fail in production
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to log WhatsApp click:', error);
        }
      });
    }

    // Track event in Google Analytics (gtag)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your Google Ads conversion ID
        event_category: 'engagement',
        event_label: 'whatsapp_chat_click',
        value: 1.0,
        currency: 'AED'
      });

      // Additional event for GA4
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'contact',
        event_label: 'floating_button',
        value: 1
      });
    }

    // Facebook Pixel tracking (if you use it)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: 'WhatsApp Chat',
        content_category: 'Lead Generation'
      });
    }

    // DataLayer push for Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'whatsapp_click',
        eventCategory: 'Contact',
        eventAction: 'WhatsApp Button Click',
        eventLabel: 'Floating WhatsApp Button',
        eventValue: 1,
        contactMethod: 'whatsapp',
        phoneNumber: phoneNumber
      });
    }

    // Custom event for Chrome extensions and tracking tools
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('whatsapp_business_click', {
        detail: {
          phoneNumber: phoneNumber,
          businessName: businessName,
          timestamp: new Date().toISOString(),
          source: 'floating_button'
        }
      }));
    }
  };

  // Add structured data for SEO
  useEffect(() => {
    // Add WhatsApp Business schema markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lapiz Blue",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": `+${phoneNumber}`,
        "contactType": "Customer Service",
        "availableLanguage": ["English", "Arabic"],
        "areaServed": "AE",
        "contactOption": "TollFree"
      },
      "sameAs": [
        `https://wa.me/${phoneNumber}`
      ]
    });
    script.id = 'whatsapp-business-schema';

    // Remove existing schema if present
    const existingSchema = document.getElementById('whatsapp-business-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    document.head.appendChild(script);

    return () => {
      const schemaElement = document.getElementById('whatsapp-business-schema');
      if (schemaElement) {
        schemaElement.remove();
      }
    };
  }, [phoneNumber]);

  return (
    <>
      {/* Meta tags for WhatsApp Business API detection */}
      <Script
        id="whatsapp-business-meta"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.whatsappBusinessConfig = {
              phoneNumber: '${phoneNumber}',
              businessName: '${businessName}',
              apiType: 'whatsapp-business-api',
              version: '2.0'
            };
          `
        }}
      />

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="fixed bottom-16 -right-2 sm:bottom-20 sm:-right-1 md:bottom-24 md:right-0 z-50 group animate-bounce-slow"
        aria-label="Chat with Lapiz Blue on WhatsApp Business"
        title="Contact us on WhatsApp - Click to start chat"
        onClick={handleWhatsAppClick}
        // Data attributes for tracking and SEO
        data-whatsapp-business="true"
        data-contact-method="whatsapp"
        data-phone-number={phoneNumber}
        data-business-name={businessName}
        data-conversion-tracking="enabled"
        data-event-category="contact"
        data-event-action="whatsapp_click"
        // Microdata for search engines
        itemScope
        itemType="https://schema.org/ContactPoint"
        style={{
          animation: "bounce-slow 3s ease-in-out infinite"
        }}
      >
        <meta itemProp="telephone" content={`+${phoneNumber}`} />
        <meta itemProp="contactType" content="customer service" />

        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 transition-transform duration-300 hover:scale-110 active:scale-95">
          <Image
            src="/logos/whatsappfavicon.svg"
            alt="Chat on WhatsApp icon"
            title="WhatsApp Business Chat"
            fill
            className="object-contain drop-shadow-2xl"
            priority
            loading="eager"
          />
        </div>

        {/* Pulse animation ring - Auto blinks every 5s + hover effect */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-20 group-hover:animate-ping whatsapp-auto-blink"></div>

        <style jsx>{`
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes whatsapp-blink {
            0%, 82% {
              opacity: 0;
              transform: scale(1);
            }
            /* First blink - slower rise */
            83% {
              opacity: 0.1;
              transform: scale(1.02);
            }
            84% {
              opacity: 0.25;
              transform: scale(1.08);
            }
            85% {
              opacity: 0.3;
              transform: scale(1.12);
            }
            /* First blink - slower fade */
            86% {
              opacity: 0.2;
              transform: scale(1.18);
            }
            87% {
              opacity: 0.1;
              transform: scale(1.25);
            }
            88% {
              opacity: 0;
              transform: scale(1.3);
            }
            /* Pause between heartbeats */
            89%, 90% {
              opacity: 0;
              transform: scale(1);
            }
            /* Second blink - slower rise */
            91% {
              opacity: 0.1;
              transform: scale(1.02);
            }
            92% {
              opacity: 0.25;
              transform: scale(1.08);
            }
            93% {
              opacity: 0.3;
              transform: scale(1.12);
            }
            /* Second blink - slower fade */
            94% {
              opacity: 0.2;
              transform: scale(1.18);
            }
            95% {
              opacity: 0.1;
              transform: scale(1.25);
            }
            96%, 100% {
              opacity: 0;
              transform: scale(1.3);
            }
          }

          .whatsapp-auto-blink {
            animation: whatsapp-blink 6s ease-in-out infinite;
          }

          /* Hover state overrides auto animation */
          .group:hover .whatsapp-auto-blink {
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
            opacity: 0.2;
          }
        `}</style>
      </a>
    </>
  );
}

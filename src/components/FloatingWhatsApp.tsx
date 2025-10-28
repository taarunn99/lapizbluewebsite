"use client";

import Image from "next/image";

export default function FloatingWhatsApp() {
  const phoneNumber = "971502814338"; // Format: country code + number (no + or spaces)
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 -right-2 sm:bottom-20 sm:-right-1 md:bottom-24 md:right-0 z-50 group animate-bounce-slow"
      aria-label="Chat on WhatsApp"
      style={{
        animation: "bounce-slow 3s ease-in-out infinite"
      }}
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 transition-transform duration-300 hover:scale-110 active:scale-95">
        <Image
          src="/logos/whatsappfavicon.svg"
          alt="WhatsApp"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Optional: Pulse animation ring */}
      <div className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </a>
  );
}

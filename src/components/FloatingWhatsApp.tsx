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
      className="fixed bottom-2 right-0 sm:bottom-3 sm:right-0 md:bottom-4 md:right-0 z-50 group animate-bounce-slow"
      aria-label="Chat on WhatsApp"
      style={{
        animation: "bounce-slow 3s ease-in-out infinite"
      }}
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 transition-transform duration-300 hover:scale-110 active:scale-95">
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

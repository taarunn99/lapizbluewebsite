"use client";

import Image from "next/image";

export default function EmailButton() {
  return (
    <a
      href="mailto:info@lapizblue.com"
      className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative cursor-pointer hover:scale-105 transition-transform block"
      aria-label="Email Us"
    >
      <Image
        src="/images/icons/contact/mail.svg"
        alt="Email contact icon"
        fill
        className="object-contain"
      />
    </a>
  );
}

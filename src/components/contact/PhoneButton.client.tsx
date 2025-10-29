"use client";

import Image from "next/image";

export default function PhoneButton() {
  return (
    <a
      href="tel:+97148855257"
      className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative cursor-pointer hover:scale-105 transition-transform block"
      aria-label="Call Us"
    >
      <Image
        src="/images/icons/contact/phone.svg"
        alt="Phone"
        fill
        className="object-contain"
      />
    </a>
  );
}

"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface BrandCardLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function BrandCardLink({ href, children, className }: BrandCardLinkProps) {
  const handleClick = () => {
    // Save scroll position before navigating to brand page
    sessionStorage.setItem("brandsScrollPosition", String(window.scrollY));
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

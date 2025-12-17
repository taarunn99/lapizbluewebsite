"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if current path matches or starts with the given path
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5">
        <nav className="mx-auto max-w-[1920px] h-[75px] flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" aria-label="Lapiz Blue - Home" className="flex items-center">
            <Image
              src="/logos/lapizbluelogo.svg"
              alt="Lapiz Blue logo"
              width={180}
              height={40}
              className="h-[40px] w-auto md:h-[48px]"
              priority
            />
          </Link>

          {/* Desktop Nav links - hidden on mobile */}
          <ul className="hidden md:flex gap-8 font-medium text-[#161925]">
            <li>
              <Link
                href="/"
                className={`relative py-1 transition-colors hover:text-[#406E8E] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#406E8E] after:transition-all after:duration-300 ${isActive("/") ? "text-[#406E8E] after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/brands"
                className={`relative py-1 transition-colors hover:text-[#406E8E] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#406E8E] after:transition-all after:duration-300 ${isActive("/brands") ? "text-[#406E8E] after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`relative py-1 transition-colors hover:text-[#406E8E] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#406E8E] after:transition-all after:duration-300 ${isActive("/blog") ? "text-[#406E8E] after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`relative py-1 transition-colors hover:text-[#406E8E] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#406E8E] after:transition-all after:duration-300 ${isActive("/about") ? "text-[#406E8E] after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`relative py-1 transition-colors hover:text-[#406E8E] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#406E8E] after:transition-all after:duration-300 ${isActive("/contact") ? "text-[#406E8E] after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger Menu Button - visible only on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            <span className={`block w-6 h-0.5 bg-[#161925] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#161925] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#161925] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Popup - visible only on mobile when open */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>

          {/* Menu Content */}
          <div className="absolute top-[75px] left-0 right-0 bg-white/95 backdrop-blur border-b border-black/10 shadow-lg">
            <ul className="flex flex-col font-medium text-[#161925]">
              <li className="border-b border-black/5">
                <Link
                  href="/"
                  className={`block px-6 py-4 transition-colors ${isActive("/") ? "bg-[#406E8E]/10 text-[#406E8E] font-semibold border-l-4 border-[#406E8E]" : "hover:bg-black/5"}`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="border-b border-black/5">
                <Link
                  href="/brands"
                  className={`block px-6 py-4 transition-colors ${isActive("/brands") ? "bg-[#406E8E]/10 text-[#406E8E] font-semibold border-l-4 border-[#406E8E]" : "hover:bg-black/5"}`}
                  onClick={closeMobileMenu}
                >
                  Brands
                </Link>
              </li>
              <li className="border-b border-black/5">
                <Link
                  href="/blog"
                  className={`block px-6 py-4 transition-colors ${isActive("/blog") ? "bg-[#406E8E]/10 text-[#406E8E] font-semibold border-l-4 border-[#406E8E]" : "hover:bg-black/5"}`}
                  onClick={closeMobileMenu}
                >
                  Blog
                </Link>
              </li>
              <li className="border-b border-black/5">
                <Link
                  href="/about"
                  className={`block px-6 py-4 transition-colors ${isActive("/about") ? "bg-[#406E8E]/10 text-[#406E8E] font-semibold border-l-4 border-[#406E8E]" : "hover:bg-black/5"}`}
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block px-6 py-4 transition-colors ${isActive("/contact") ? "bg-[#406E8E]/10 text-[#406E8E] font-semibold border-l-4 border-[#406E8E]" : "hover:bg-black/5"}`}
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

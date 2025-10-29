"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the hero section (approximately viewport height)
      const scrollThreshold = window.innerHeight * 0.8;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="mx-auto max-w-[1920px] h-[75px] flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" aria-label="Lapiz Blue - Home" className="flex items-center">
            <Image
              src="/logos/lapizbluelogo.svg"
              alt="Lapiz Blue logo"
              width={180}
              height={40}
              className="h-[40px] w-auto md:h-[48px]"
            />
          </Link>

          {/* Desktop Nav links - hidden on mobile */}
          <ul className="hidden md:flex gap-8 font-medium text-[#161925]">
            <li><Link href="/" className="hover:opacity-70 transition-opacity">Home</Link></li>
            <li><Link href="/brands" className="hover:opacity-70 transition-opacity">Brands</Link></li>
            <li><Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link></li>
            <li><Link href="/about" className="hover:opacity-70 transition-opacity">About</Link></li>
            <li><Link href="/contact" className="hover:opacity-70 transition-opacity">Contact Us</Link></li>
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
                  className="block px-6 py-4 hover:bg-black/5 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="border-b border-black/5">
                <Link
                  href="/brands"
                  className="block px-6 py-4 hover:bg-black/5 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Brands
                </Link>
              </li>
              <li className="border-b border-black/5">
                <Link
                  href="/blog"
                  className="block px-6 py-4 hover:bg-black/5 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Blog
                </Link>
              </li>
              <li className="border-b border-black/5">
                <Link
                  href="/about"
                  className="block px-6 py-4 hover:bg-black/5 transition-colors"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-6 py-4 hover:bg-black/5 transition-colors"
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

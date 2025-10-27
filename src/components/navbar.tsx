// "use client";

// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5">
//       <nav className="mx-auto max-w-[1920px] h-[75px] flex items-center justify-between px-6">
//         {/* Left: logo placeholder – if you have an <Image/>, drop it here */}
//         <Link href="/" className="block" aria-label="Lapiz Blue - Home">
//           {/* If you have a logo image, replace with <Image src="/logo.png" ... /> */}
//           <span className="font-semibold text-xl text-black">Lapiz Blue</span>
//         </Link>

//         {/* Right: links */}
//         <ul className="flex gap-10 text-black font-medium">
//           <li><Link href="/">Home</Link></li>
//           <li><Link href="/about">About</Link></li>
//           <li><Link href="/blog">Blog</Link></li>
//           <li><Link href="/brands">Brands</Link></li>
//           <li><Link href="/contact">Contact Us</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
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

        {/* Nav links - text color changes based on scroll */}
        <ul className="flex gap-8 font-medium text-[#161925]">
          <li><Link href="/" className="hover:opacity-70 transition-opacity">Home</Link></li>
          <li><Link href="/brands" className="hover:opacity-70 transition-opacity">Brands</Link></li>
          <li><Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link></li>
          <li><Link href="/about" className="hover:opacity-70 transition-opacity">About</Link></li>
          <li><Link href="/contact" className="hover:opacity-70 transition-opacity">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
}

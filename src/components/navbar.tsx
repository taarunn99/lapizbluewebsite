<<<<<<< HEAD
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

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5">
      <nav className="mx-auto max-w-[1920px] h-[75px] flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" aria-label="Lapiz Blue - Home" className="flex items-center">
          <Image
            src="/logos/lapizbluelogo.svg"
            alt="Lapiz Blue logo"
            width={180}               // intrinsic size for layout stability
            height={40}
            className="h-[40px] w-auto md:h-[48px]"  // fits inside 75px navbar
          />
        </Link>

        {/* Nav links */}
        <ul className="flex gap-8 text-black font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/brands">Brands</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
}

=======
console.log("This is Navbar")
>>>>>>> b4ecc708ac36c78fc233e45333688a87826bb0e8

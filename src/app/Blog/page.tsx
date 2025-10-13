// import Image from "next/image";
// import Link from "next/link";

// export default function BlogPage() {
//   return (
//     <main className="w-full bg-white text-[#23395B]">
//       {/* Hero Section */}
//       <section className="relative w-full h-[600px]">
//         <Image
//           src="/images/blogpagehero.jpg"   // ← fixed path
//           alt="Blog Page Hero"
//           fill
//           sizes="100vw"                     // good for CWV
//           className="object-cover"
//           priority
//         />

//         <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//           <h1 className="text-4xl md:text-5xl font-semibold text-white text-center max-w-3xl">
//             Every story begins with a seat, a view, and a moment worth telling.
//           </h1>
//         </div>
//       </section>

//       {/* Use <Link> for internal navigation */}
//       <nav className="flex justify-center gap-6 py-4 text-lg font-medium">
//         <Link href="/" className="hover:underline">Home</Link>
//         <Link href="/about" className="hover:underline">About</Link>
//         <Link href="/brands" className="hover:underline">Brands</Link>
//         <Link href="/blog" className="hover:underline">Blog</Link>
//         <Link href="/contact" className="hover:underline">Contact Us</Link>
//       </nav>

//       {/* Blog cards */}
//       <section className="py-12 px-4 md:px-12">
//         <h2 className="text-3xl font-bold mb-8">Blogs & Stories</h2>
//         <div className="mb-6 flex gap-6 text-sm text-gray-700">
//           <span className="cursor-pointer hover:underline">Products</span>
//           <span className="cursor-pointer hover:underline">Brands</span>
//           <span className="cursor-pointer hover:underline">Solution</span>
//         </div>
//         <div className="grid gap-8 md:grid-cols-3">
//           <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">Card 1</div>
//           <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">Card 2</div>
//           <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">Card 3</div>
//         </div>
//       </section>
//     </main>
//   );
// }


import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";


const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blogs - Lapiz Blue",
  description:
    "Stories and solutions that belong to Lapiz Blue .",
};

export default function BlogPage() {
  return (
    <main className="w-full bg-white text-[#23395B]">
      {/* Hero Section */}
      <section className="relative w-full h-[600px]">
        <Image
          src="/images/blog/blogpageimages/blogpagehero.jpg"   // <— new path: /public/images/blog/blogpagehero.jpg
          alt="Blog Page Hero"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-4xl md:text-5xl font-semibold text-white text-center max-w-3xl">
            Every story begins with a seat, a view, and a moment worth telling.
          </h1>
        </div>
      </section>

      {/* Use <Link> for internal navigation
      <nav className="flex justify-center gap-6 py-4 text-lg font-medium">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/brands" className="hover:underline">Brands</Link>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <Link href="/contact" className="hover:underline">Contact Us</Link>
      </nav> */}

      {/* Blog cards */}
      <section className="py-12 px-4 md:px-12">
        <h2 className="text-3xl font-bold mb-8">Blogs & Stories</h2>
        <div className="mb-6 flex gap-6 text-sm text-gray-700">
          <span className="cursor-pointer hover:underline">Products</span>
          <span className="cursor-pointer hover:underline">Brands</span>
          <span className="cursor-pointer hover:underline">Solution</span>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">Card 1</div>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">Card 2</div>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">Card 3</div>
        </div>
      </section>
    </main>
  );
}
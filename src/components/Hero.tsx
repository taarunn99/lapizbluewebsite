

// import type { NextPage } from "next";
// import Image from "next/image";
// import Link from "next/link";

// const Hero: NextPage = () => {
//   return (
//     <div className="w-full relative bg-white h-[8866px] overflow-hidden text-left text-[40px] text-white font-manrope">
//       {/* top strip (nav height already handled by layout padding) */}
//       <div className="absolute top-[0px] left-[0px] bg-white w-[1920px] h-[150px]" />

//       {/* HERO BACKDROP */}
//       <div className="absolute top-0 left-0 w-[1920px] h-[1080px]">
//         <Image
//           src="/images/hero.jpg"
//           alt="Lapiz Blue hero"
//           fill
//           sizes="100vw"
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Headline */}
//       <div className="absolute top-[188px] right-[-32px] font-light text-center inline-block w-[930px] h-[135px]">
//         Transforming Spaces with World-Class Construction Materials
//       </div>

//       {/* Overlay logo on hero (if needed) */}
//       <Image
//         src="/images/meshgradientbase.png"
//         alt="Mesh gradient"
//         width={357}
//         height={88}
//         sizes="100vw"
//         className="absolute top-[32px] left-[64px] w-[357px] h-[88px] object-cover opacity-[0.8]"
//         priority
//       />

//       {/* Subheadline */}
//       <div className="absolute top-[301px] right-[0px] text-[35px] font-light font-plus-jakarta-sans text-bisque text-center inline-block w-[837px] h-[142px]">
//         Curated Innovation. Homegrown Insight.
//       </div>

//       {/* CTA buttons */}
//       <div className="absolute top-[400px] right-[450px] w-[249px] h-[85px] text-center text-3xl font-plus-jakarta-sans">
//         <div className="absolute top-0 right-0 rounded-[10px] [background:linear-gradient(182.54deg,_#110f11,_#23395b)] w-[249px] h-[85px] opacity-[0.7]" />
//         <Link href="/brands" className="absolute top-[21px] right-[14px] [text-shadow:0px_1px_4px_rgba(12,_12,_13,_0.05)]">
//           Explore Brands
//         </Link>
//       </div>

//       <div className="absolute top-[397px] right-[146px] w-[249px] h-[85px] text-center text-3xl font-plus-jakarta-sans">
//         <div className="absolute top-0 right-0 rounded-[10px] [background:linear-gradient(180deg,_#110f11,_#131313)] w-[249px] h-[85px] opacity-[0.7]" />
//         <Link href="/blog" className="absolute top-[21px] right-[36px]">View Stories</Link>
//       </div>

//       {/* credit link */}
//       <a
//         className="absolute top-[1044px] left-[1851px] text-[10px] underline font-bold text-inherit text-center"
//         href="https://wsliving.ae/products/lama-modern-black-corner-sofa-l-shape-extendable-sofa?variant=49344314802482&pins_campaign_id=626755696539&pp=0&epik=dj0yJnU9QjFlR2ZCRXpHRnduVjlBMElWaFBXcGlWWUdvSzFGVG8mcD0xJm49VWRMdlUzTERaR0k3V0RSSGNOTjAtdyZ0PUFBQUFBR2h2dExZ"
//         target="_blank"
//         rel="noreferrer"
//       >
//         credits
//       </a>

//       {/* Secondary full-bleed image (example section) */}
//       <div className="absolute top-[1080px] left-0 w-[1920px] h-[1080px]">
//         <Image
//           src="/images/homepagebathroom.png"
//           alt="Showcase"
//           fill
//           sizes="100vw"
//           className="object-cover"
//         />
//       </div>

//       {/* Plus icons (kept structure; if you want actual icons, use a tiny PNG/SVG) */}
//       {/* ...your positioned plus blocks remain unchanged... */}

//       {/* Contact-like panel section example */}
//       <div className="absolute top-[2160px] left-0 w-[1920px] h-[1080px]">
//         <Image
//           src="/meshgradientbase.png"
//           alt="Subsection background"
//           fill
//           sizes="100vw"
//           className="object-cover opacity-90"
//         />
//       </div>

//       {/* Right-hand glass cards */}
//       <div className="absolute top-[calc(50%_-_2159px)] right-[52px] w-[1064px] h-[851.8px] text-black">
//         <div className="absolute top-[calc(50%_-_425.9px)] right-0 rounded-[20px] bg-black w-[1064px] h-[851.8px] opacity-[0.1]" />
//         <div className="absolute top-[calc(50%_-_232.84px)] right-[42px] rounded-[20px] bg-gainsboro w-[989px] h-[115.6px] opacity-[0.1]" />
//         <div className="absolute top-[calc(50%_-_85.6px)] right-[41px] rounded-[20px] bg-gainsboro w-[989px] h-[115.6px] opacity-[0.1]" />
//         <div className="absolute top-[calc(50%_-_380.09px)] right-[41px] rounded-[20px] bg-gainsboro w-[989px] h-[115.6px] opacity-[0.1]" />
//         <div className="absolute top-[calc(50%_+_87.82px)] right-[537px] font-light inline-block w-[465px] h-[60px] [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)]">
//           Write your message...
//         </div>
//         <div className="absolute top-[calc(50%_+_61.65px)] right-[41px] rounded-[20px] bg-gainsboro w-[980px] h-[326.1px] opacity-[0.1]" />
//         <div className="absolute top-[calc(50%_-_206.67px)] right-[537px] font-light inline-block w-[465px] h-[60px] [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)]">
//           E-mail
//         </div>
//         <div className="absolute top-[calc(50%_-_64.62px)] right-[537px] font-light inline-block w-[465px] h-[60px] [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)]">
//           Phone
//         </div>
//         <div className="absolute top-[calc(50%_-_352.82px)] right-[362px] font-light inline-block w-[640px] h-[60px] [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)]">
//           Full Name and Company Name
//         </div>
//       </div>

//       {/* Example: use location pin */}
//       <Image
//         src="/homepagelocationpin.jpg"
//         alt="Location pin"
//         width={61}
//         height={61}
//         className="absolute top-[calc(50%_-_357.5px)] left-[calc(50%_-_30.5px)] opacity-80"
//       />

//       {/* FAQs section (kept structure) */}
//       <div className="absolute top-[3240px] left-0 w-[1920px] h-[1080px] text-base text-black font-inter">
//         <div className="absolute top-0 left-0 bg-white w-[1920px] h-[1080px] overflow-hidden">
//           <div className="absolute top-[120px] left-[-5px] text-9xl font-semibold font-outfit text-steelblue text-center inline-block w-[851px] h-[137px]">
//             FAQs
//           </div>

//           <div className="absolute top-0 right-0 w-[1059px] h-[1080px]">
//             <Image
//               src="/meshgradientbase.png"
//               alt="FAQ side art"
//               fill
//               sizes="100vw"
//               className="object-cover"
//             />
//           </div>

//           <div className="absolute top-[259px] left-[90px] text-4xl font-light font-outfit text-darkslategray text-center inline-block w-[661px]">
//             Quick answers to what everyone asks about Lapiz Blue.
//           </div>

//           {/* cards, lines, and icons kept per your absolute layout... */}
//           {/* Right-hand description block */}
//           <div className="absolute top-[calc(50%_-_249px)] right-[143px] text-5xl font-manrope text-gray-200 text-center inline-block w-[740px] h-[560px]">
//             We provide construction chemicals, building materials, and finishing profiles. Key lines include tile adhesives, grouts, waterproofing, epoxy flooring, trims and movement joints, skirting, shower drains, and floor profiles.
//           </div>
//         </div>
//       </div>

//       {/* Managing Director card (uses md.png) */}
//       <div className="absolute top-[4433px] left-0 bg-white w-[1920px] h-[1080px] overflow-hidden text-center text-[32px] font-outfit">
//         {/* decorative blocks omitted for brevity; leaving your positions */}
//         <div className="absolute top-[252px] left-[856px] rounded-[20px] w-[451px] h-[558px] overflow-hidden">
//           <Image
//             src="/md.png"
//             alt="Managing Director - Mrs. Ashrat Razi"
//             fill
//             sizes="100vw"
//             className="object-cover"
//           />
//         </div>
//         <div className="absolute top-[829px] left-[913px] font-semibold text-left">Our Managing Director</div>
//         <div className="absolute top-[873px] left-[964px] font-semibold text-left">Mrs. Ashrat Razi</div>

//         <div className="absolute top-[135px] left-[64px] text-[64px] font-semibold text-darkslategray text-left inline-block w-[1619px] h-[137px]">
//           Crafting dreams into reality.
//         </div>
//       </div>

//       {/* ...continue mapping your remaining <Image/> tags to /public files the same way ... */}
//     </div>
//   );
// };

//  export default Hero;
 import Image from "next/image";
 import Link from "next/link";
 import HeroCtas from "./HeroCtas.client";

/**
 * CWV notes:
 * - Only the first, above-the-fold hero is priority (best LCP).
 * - Every fill image lives in a sized wrapper (vh/aspect) -> no CLS.
 * - `sizes` hints keep bandwidth tight on retina.
 */
 export default function Hero() {
   return (
     <main className="w-full">
       {/* ===== HERO (viewport height minus navbar 75px) ===== */}
       <section className="relative mx-auto w-full max-w-[1920px] h-[calc(100svh-75px)]">
         <Image
           src="/images/home/homepageimages/hero.jpg"                 // /public/images/hero.jpg
           alt="Lapiz Blue hero"
           fill
           priority
           fetchPriority="high"
           className="object-cover"
           sizes="(min-width:640px) 1920px, 100vw "
         />

         {/* Figma overlay items (kept positions) */}
         <div className="absolute top-[188px] right-[-32px] font-light text-center inline-block w-[930px] h-[135px] text-white">
           Transforming Spaces with World-Class Construction Materials
         </div>

        

         <div className="absolute top-[301px] right-0 text-[35px] font-light font-plus-jakarta-sans text-bisque text-center inline-block w-[837px] h-[142px]">
           Curated Innovation. Homegrown Insight.
         </div>

         {/* client-only buttons */}
         <HeroCtas />

         <a
           className="absolute bottom-3 right-4 text-[10px] underline font-bold text-white text-center"
           href="https://wsliving.ae/products/lama-modern-black-corner-sofa-l-shape-extendable-sofa?variant=49344314802482&pins_campaign_id=626755696539&pp=0&epik=dj0yJnU9QjFlR2ZCRXpHRnduVjlBMElWaFBXcGlWWUdvSzFGVG8mcD0xJm49VWRMdlUzTERaR0k3V0RSSGNOTjAtdyZ0PUFBQUFBR2h2dExZ"
           target="_blank"
           rel="noreferrer"
         >
           credits
         </a>
       </section>

       {/* ===== SECTION 2 (showcase, 16:9) ===== */}
       <section className="relative mx-auto w-full max-w-[1920px] aspect-[16/9]">
         <Image
           src="/images/home/homepageimages/homepagebathroom.png"     // /public/images/homepagebathroom.png
           alt="Showcase"
           fill
           className="object-cover"
           sizes="(min-width:1920px) 1920px, 100vw"
           loading="lazy"
         />
       </section>

       {/* ===== CONTACT-style PANEL (16:9) ===== */}
       <section className="relative mx-auto w-full max-w-[1920px] aspect-[16/9]">
         <Image
           src="/images/meshgradientbase.png"     // reused background
           alt="Subsection background"
           fill
           className="object-cover opacity-90"
           sizes="100vw"
           loading="lazy"
         />

         {/* Right glass cards – your original absolute positions */}
         <div className="absolute top-[calc(50%-2159px)] right-[52px] w-[1064px] h-[851.8px] text-black">
           <div className="absolute top-[calc(50%-425.9px)] right-0 rounded-[20px] bg-black w-[1064px] h-[851.8px] opacity-10" />
           <div className="absolute top-[calc(50%-232.84px)] right-[42px] rounded-[20px] bg-gainsboro w-[989px] h-[115.6px] opacity-10" />
           <div className="absolute top-[calc(50%-85.6px)] right-[41px] rounded-[20px] bg-gainsboro w-[989px] h-[115.6px] opacity-10" />
           <div className="absolute top-[calc(50%-380.09px)] right-[41px] rounded-[20px] bg-gainsboro w-[989px] h-[115.6px] opacity-10" />
           <div className="absolute top-[calc(50%+87.82px)] right-[537px] font-light inline-block w-[465px] h-[60px] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
             Write your message...
           </div>
           <div className="absolute top-[calc(50%+61.65px)] right-[41px] rounded-[20px] bg-gainsboro w-[980px] h-[326.1px] opacity-10" />
           <div className="absolute top-[calc(50%-206.67px)] right-[537px] font-light inline-block w-[465px] h-[60px] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
             E-mail
           </div>
           <div className="absolute top-[calc(50%-64.62px)] right-[537px] font-light inline-block w-[465px] h-[60px] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
             Phone
           </div>
           <div className="absolute top-[calc(50%-352.82px)] right-[362px] font-light inline-block w-[640px] h-[60px] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
             Full Name and Company Name
           </div>
         </div>

         {/* Location pin */}
         <Image
           src="/images/home/homepageimages/homepagelocationpin.jpg"  // /public/images/homepagelocationpin.jpg
           alt="Location pin"
           width={61}
           height={61}
           className="absolute top-[calc(50%-357.5px)] left-[calc(50%-30.5px)] opacity-80"
           loading="lazy"
         />
       </section>
       {/* ===== MANAGING DIRECTOR ===== */}
       <section className="relative mx-auto w-full max-w-[1920px] py-20">
         <div className="absolute top-[252px] left-[856px] rounded-[20px] w-[451px] h-[558px] overflow-hidden">
           <Image             src="/images/md.png"                 // /public/images/md.png
             alt="Managing Director - Mrs. Ashrat Razi"
             fill
             className="object-cover"
             sizes="(min-width:1920px) 451px, 40vw"
             loading="lazy"
           />
         </div>

         <div className="text-[64px] font-semibold text-darkslategray text-left inline-block w-[1619px] h-[137px] pl-[64px]">
           Crafting dreams into reality.
         </div>
         <div className="absolute top-[829px] left-[913px] font-semibold text-left">Our Managing Director</div>
         <div className="absolute top-[873px] left-[964px] font-semibold text-left">Mrs. Ashrat Razi</div>
       </section>
     </main>
   );
 }


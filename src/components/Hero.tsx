

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
//         src="/images/meshgradientbase.webp"
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
//             alt="Managing Director - Mr. Shariful Haque"
//             fill
//             sizes="100vw"
//             className="object-cover"
//           />
//         </div>
//         <div className="absolute top-[829px] left-[913px] font-semibold text-left">Our Group General Manager</div>
//         <div className="absolute top-[873px] left-[964px] font-semibold text-left">Mr. Shariful Haque</div>

//         <div className="absolute top-[135px] left-[64px] text-[64px] font-semibold text-darkslategray text-left inline-block w-[1619px] h-[137px]">
//           Crafting dreams into reality.
//         </div>
//       </div>

//       {/* ...continue mapping your remaining <Image/> tags to /public files the same way ... */}
//     </div>
//   );
// };

//  export default Hero;
 // src/components/Hero.tsx
import Image from "next/image";
import dynamic from "next/dynamic";
import HeroCtas from "./HeroCtas.client";
import ScrollLogoToText from "./ScrollLogoToText";
import KnowMoreButton from "./KnowMoreButton";
import ContactSectionWrapper from "./ContactSectionWrapper.client";
import ProductHotspot from "./ProductHotspot";

// Lazy load heavy below-the-fold components
const LocationMap = dynamic(() => import("./LocationMap"), {
  loading: () => <div className="w-full h-screen bg-gray-100 animate-pulse" />
});

const FAQSection = dynamic(() => import("./FAQSection.client"), {
  loading: () => <div className="w-full py-20 bg-white animate-pulse" />
});

const WhatsAppChatDemo = dynamic(() => import("./ui/whatsapp-chat-demo"), {
  loading: () => <div className="w-full min-h-screen bg-gray-50 animate-pulse" />
});

export default function Hero() {

  return (
    <main className="w-full">
      {/* ===== HERO (responsive, maintains aspect ratio) ===== */}
      <section className="relative mx-auto w-full max-w-[1920px] h-[calc(100vh-75px)] min-h-[600px] overflow-hidden">
        {/* Responsive hero image using picture element for optimal LCP */}
        <picture>
          {/* AVIF for supported browsers - best compression */}
          <source
            type="image/avif"
            media="(max-width: 640px)"
            srcSet="/images/home/homepageimages/hero-640.avif"
          />
          <source
            type="image/avif"
            media="(max-width: 828px)"
            srcSet="/images/home/homepageimages/hero-828.avif"
          />
          <source
            type="image/avif"
            media="(max-width: 1200px)"
            srcSet="/images/home/homepageimages/hero-1200.avif"
          />
          <source
            type="image/avif"
            srcSet="/images/home/homepageimages/hero-1920.avif"
          />
          {/* WebP fallback */}
          <source
            type="image/webp"
            media="(max-width: 640px)"
            srcSet="/images/home/homepageimages/hero-640.webp"
          />
          <source
            type="image/webp"
            media="(max-width: 828px)"
            srcSet="/images/home/homepageimages/hero-828.webp"
          />
          <source
            type="image/webp"
            media="(max-width: 1200px)"
            srcSet="/images/home/homepageimages/hero-1200.webp"
          />
          <source
            type="image/webp"
            srcSet="/images/home/homepageimages/hero-1920.webp"
          />
          {/* Fallback img */}
          <img
            src="/images/home/homepageimages/hero-1920.webp"
            alt="Elegant home interior showcasing quality flooring and wall design"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/* H1 - Responsive: Outfit 300, white, right-aligned on desktop, centered on mobile */}
        <div className="absolute z-10 top-[12%] md:top-[18%]
                        left-1/2 -translate-x-1/2 md:left-auto md:right-[5%] md:translate-x-0
                        w-[90%] md:w-[42%] max-w-[700px] px-4 md:px-0
                        text-center md:text-right font-outfit text-white font-light"
             style={{
               fontSize: 'clamp(1.25rem, 2.2vw, 2rem)',
               lineHeight: '1.25'
             }}>
          Transforming Spaces with World-Class Construction Materials.
        </div>

        {/* H2 - Responsive: Outfit 300, #F3DFC1, right-aligned on desktop, centered on mobile */}
        <div className="absolute z-10 top-[23%] md:top-[30%]
                        left-1/2 -translate-x-1/2 md:left-auto md:right-[5%] md:translate-x-0
                        w-[90%] md:w-[42%] max-w-[720px] px-4 md:px-0
                        text-center md:text-right font-outfit font-light"
             style={{
               fontSize: 'clamp(1rem, 1.8vw, 1.75rem)',
               lineHeight: '1.26',
               color: '#F3DFC1'
             }}>
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

      {/* ===== SCROLL LOGO → TEXT (pinned, then continue scrolling) ===== */}
      <ScrollLogoToText />

      {/* Contact section - after scroll logo */}
      <ContactSectionWrapper>
        <Image
          src="/images/meshgradientbase.webp"
          alt="Abstract gradient visual element"
          fill
          sizes="100vw"
          className="object-cover opacity-90"
          loading="lazy"
          quality={85}
        />
      </ContactSectionWrapper>

      {/* ===== SECTION 2 (showcase/bathroom - taller on mobile for better hotspot interaction) ===== */}
      <section className="relative mx-auto w-full max-w-[1920px] aspect-[2/3] sm:aspect-[4/3] md:aspect-[3/2] overflow-hidden">
        {/* Optimized picture element with AVIF + WebP + responsive srcset */}
        <picture>
          {/* AVIF - best compression, modern browsers */}
          <source
            type="image/avif"
            srcSet="
              /images/home/homepageimages/homepagebathroom-640.avif 640w,
              /images/home/homepageimages/homepagebathroom-828.avif 828w,
              /images/home/homepageimages/homepagebathroom-1200.avif 1200w,
              /images/home/homepageimages/homepagebathroom-1920.avif 1920w
            "
            sizes="(max-width: 640px) 100vw, (max-width: 828px) 100vw, (max-width: 1200px) 100vw, 1920px"
          />
          {/* WebP - fallback for older browsers */}
          <source
            type="image/webp"
            srcSet="
              /images/home/homepageimages/homepagebathroom-640.webp 640w,
              /images/home/homepageimages/homepagebathroom-828.webp 828w,
              /images/home/homepageimages/homepagebathroom-1200.webp 1200w,
              /images/home/homepageimages/homepagebathroom-1920.webp 1920w
            "
            sizes="(max-width: 640px) 100vw, (max-width: 828px) 100vw, (max-width: 1200px) 100vw, 1920px"
          />
          {/* Fallback img */}
          <img
            src="/images/home/homepageimages/homepagebathroom-1920.webp"
            alt="Luxury bathroom with marble-look tiles and seamless grout lines"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>

        {/* Interaction prompt heading - shows "Tap" on mobile, "Hover" on desktop */}
        <div className="absolute top-4 sm:top-6 md:top-10 left-1/2 -translate-x-1/2 z-30">
          <span className="font-outfit text-white/90 text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-lg bg-black/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
            <span className="md:hidden">Tap to explore</span>
            <span className="hidden md:inline">Hover to explore</span>
          </span>
        </div>

        {/* Product Hotspots - Interactive markers */}
        {/* Hotspot 1: Left wall - MP90 ECO PLUS (Fila) */}
        <ProductHotspot
          x={8}
          y={55}
          productName="MP90 ECO PLUS"
          productDescription="Water-based penetrating sealer for polished marble, granite, porcelain, and engineered quartz with invisible protection."
          productImage="/images/brands/fila/sealers/mp90-eco-plus.webp"
          href="/brands/fila/sealers"
          cardPosition="right"
        />

        {/* Hotspot 2: Upper left tile wall - SpectraLock Pro Premium (Laticrete) */}
        <ProductHotspot
          x={28}
          y={32}
          productName="SpectraLock Pro Premium"
          productDescription="High-performance epoxy grout for pools, kitchens, and areas requiring waterproof chemical-resistant joints."
          productImage="/images/brands/laticrete/tile-adhesives/spectralock-pro.webp"
          href="/brands/laticrete/tile-adhesives-and-grouts"
          cardPosition="right"
        />

        {/* Hotspot 3: Center tile wall - Keraflex Maxi S1 Zero (Mapei) */}
        <ProductHotspot
          x={48}
          y={42}
          productName="Keraflex Maxi S1 Zero"
          productDescription="Deformable, no-vertical-slip cementitious adhesive with extended open time for large-format tiles and natural stone."
          productImage="/images/brands/mapei/tile-adhesives/keraflex-maxi-s1-zero.webp"
          href="/brands/mapei/tile-adhesives-and-grouts"
          cardPosition="bottom"
        />

        {/* Hotspot 4: Right tile wall - Weber BIRAP PL */}
        <ProductHotspot
          x={72}
          y={38}
          productName="Weber BIRAP PL"
          productDescription="Torch-applied bituminous membrane reinforced with non-woven polyester for reliable roof and foundation waterproofing."
          productImage="/images/brands/weber/waterproofing/weber-birap-pl.webp"
          href="/brands/weber/waterproofing"
          cardPosition="left"
        />

        {/* Hotspot 5: Floor area - Mapelastic Smart */}
        <ProductHotspot
          x={78}
          y={82}
          productName="Mapelastic Smart"
          productDescription="Two-component flexible cementitious waterproofing membrane for balconies, wet areas, swimming pools, and under-tile applications."
          productImage="/images/brands/mapei/waterproofing/mapelastic-smart.webp"
          href="/brands/mapei/waterproofing"
          cardPosition="top"
        />

        {/* Hotspot 6: Shower profile - PP Drain Aqua */}
        <ProductHotspot
          x={55}
          y={94}
          productName="PP Drain Aqua"
          productDescription="Complete linear drainage system for floor-level showers with integrated waterproofing flange and multiple grate options."
          productImage="/images/brands/profilpas/bathroom-profiles/pp-drain-aqua.webp"
          href="/brands/profilpas/bathroom-profiles"
          cardPosition="top"
        />
      </section>

      {/* ===== FAQ SECTION ===== */}
      <FAQSection />

      {/* ===== GROUP GENERAL MANAGER SECTION ===== */}
      <section className="relative w-full max-w-[1920px] mx-auto bg-white min-h-screen flex flex-col lg:block px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Top Left Heading - Desktop */}
        <div className="lg:absolute lg:top-16 xl:top-20 lg:left-8 xl:left-12 lg:max-w-[700px] xl:max-w-[761px] mb-8 lg:mb-0 z-10">
          <h2 className="font-outfit font-semibold text-[#23395B] text-3xl sm:text-4xl lg:text-5xl xl:text-[64px] leading-tight mb-3 lg:mb-4">
            Crafting dreams into reality.
          </h2>
          <p className="font-outfit font-normal text-[#161925] text-lg sm:text-xl lg:text-2xl xl:text-[40px] leading-snug mb-6 lg:mb-8">
            Built on Trust. Powered by People.<br />
            Driven by Solutions.
          </p>
          <KnowMoreButton />
        </div>

        {/* Three Cards Layout - Desktop: bottom-right with equal spacing, Mobile: horizontal scroll */}
        <div className="relative lg:flex lg:items-end lg:justify-end lg:min-h-[750px] xl:min-h-[850px] lg:pt-56 xl:pt-64">
          {/* Desktop Layout (lg and up) */}
          <div className="hidden lg:flex gap-4 xl:gap-6 items-end justify-end pr-4 xl:pr-8 pb-8 xl:pb-12">
            {/* Card 1: Who We Are - Left Card (shorter) */}
            <div className="flex-shrink-0 w-[260px] lg:w-[280px] xl:w-[360px] 2xl:w-[420px] h-[420px] lg:h-[450px] xl:h-[520px] 2xl:h-[575px] bg-[#406E8E] rounded-[20px] p-6 lg:p-7 xl:p-10 2xl:p-12 flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
              <h3 className="font-outfit font-semibold text-[#161925] text-xl lg:text-2xl xl:text-3xl 2xl:text-[36px] mb-4 lg:mb-5 xl:mb-6">
                Who We Are
              </h3>
              <p className="font-outfit font-light text-white text-base lg:text-lg xl:text-xl 2xl:text-[28px] leading-relaxed xl:leading-[36px]">
                We're a leading force in the Building Materials Industry, known not just for the products we offer - but the trust we build along the way. Our work begins with people, grows through partnerships, and is rooted in performance.
              </p>
            </div>

            {/* Card 2: MD Image - Center Card (taller, more rounded) */}
            <div className="flex-shrink-0 w-[260px] lg:w-[280px] xl:w-[360px] 2xl:w-[420px] h-[500px] lg:h-[540px] xl:h-[620px] 2xl:h-[700px] bg-[#161925] rounded-[30px] p-5 lg:p-6 xl:p-7 2xl:p-8 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
              <div className="relative w-full flex-1 rounded-[25px] overflow-hidden">
                <Image
                  src="/images/md-800.webp"
                  alt="Portrait of Mr. Shariful Haque, Group General Manager"
                  fill
                  className="object-cover"
                  sizes="(min-width:1536px) 420px, (min-width:1280px) 360px, (min-width:1024px) 280px, 260px"
                  loading="lazy"
                  quality={95}
                />
              </div>
              <div className="text-center mt-3 lg:mt-4 xl:mt-5">
                <p className="font-outfit font-semibold text-white text-base lg:text-lg xl:text-xl 2xl:text-[28px] mb-1 lg:mb-2">
                  Our Group General Manager
                </p>
                <p className="font-outfit font-semibold text-white text-base lg:text-lg xl:text-xl 2xl:text-[28px]">
                  Mr. Shariful Haque
                </p>
              </div>
            </div>

            {/* Card 3: Features with Icons - Right Card (shorter, same as left) */}
            <div className="flex-shrink-0 w-[260px] lg:w-[280px] xl:w-[360px] 2xl:w-[420px] h-[420px] lg:h-[450px] xl:h-[520px] 2xl:h-[575px] bg-[#BFD7EA] rounded-[20px] p-5 lg:p-6 xl:p-7 2xl:p-8 flex flex-col justify-around transition-all duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
              {/* Icon 1: Delivery */}
              <div className="flex items-start gap-2 lg:gap-3">
                <div className="flex-shrink-0 w-12 lg:w-14 xl:w-16 2xl:w-[70px] h-12 lg:h-14 xl:h-16 2xl:h-[70px]">
                  <Image
                    src="/images/icons/md/delivery-truck.svg"
                    alt=""
                    role="presentation"
                    width={70}
                    height={70}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-manrope font-medium text-black text-sm lg:text-base xl:text-lg 2xl:text-[24px] leading-snug">
                    Next day deliveries.
                  </p>
                  <p className="font-manrope font-bold text-[#161925] text-xs lg:text-sm xl:text-base 2xl:text-[20px] leading-relaxed">
                    For orders before 3PM
                  </p>
                </div>
              </div>

              {/* Icon 2: Customer Support */}
              <div className="flex items-start gap-2 lg:gap-3">
                <div className="flex-shrink-0 w-12 lg:w-14 xl:w-16 2xl:w-[70px] h-12 lg:h-14 xl:h-16 2xl:h-[70px]">
                  <Image
                    src="/images/icons/md/customer-support.svg"
                    alt=""
                    role="presentation"
                    width={70}
                    height={70}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-manrope font-medium text-black text-sm lg:text-base xl:text-lg 2xl:text-[24px] leading-snug">
                    24x7 Customer Support.
                  </p>
                  <p className="font-manrope font-bold text-[#161925] text-xs lg:text-sm xl:text-base 2xl:text-[20px] leading-relaxed">
                    anytime and always.
                  </p>
                </div>
              </div>

              {/* Icon 3: Documentation */}
              <div className="flex items-start gap-2 lg:gap-3">
                <div className="flex-shrink-0 w-12 lg:w-14 xl:w-16 2xl:w-[70px] h-12 lg:h-14 xl:h-16 2xl:h-[70px]">
                  <Image
                    src="/images/icons/md/documentation.svg"
                    alt=""
                    role="presentation"
                    width={70}
                    height={70}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-manrope font-medium text-black text-sm lg:text-base xl:text-lg 2xl:text-[24px] leading-snug">
                    Minimal-paper operations.
                  </p>
                  <p className="font-manrope font-bold text-[#161925] text-xs lg:text-sm xl:text-base 2xl:text-[20px] leading-relaxed">
                    All processes are digital, except for delivery paperwork.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout (below lg) - Horizontal Scroll */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-4 min-w-max">
              {/* Card 1: Who We Are */}
              <div className="flex-shrink-0 w-[280px] sm:w-[340px] h-[420px] sm:h-[500px] bg-[#406E8E] rounded-[20px] p-6 sm:p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
                <h3 className="font-outfit font-semibold text-[#161925] text-2xl sm:text-3xl mb-4">
                  Who We Are
                </h3>
                <p className="font-outfit font-light text-white text-lg sm:text-xl leading-relaxed">
                  We're a leading force in the Building Materials Industry, known not just for the products we offer - but the trust we build along the way. Our work begins with people, grows through partnerships, and is rooted in performance.
                </p>
              </div>

              {/* Card 2: MD Image */}
              <div className="flex-shrink-0 w-[280px] sm:w-[340px] h-[450px] sm:h-[540px] bg-[#161925] rounded-[20px] p-4 sm:p-6 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
                <div className="relative w-full flex-1 rounded-[20px] overflow-hidden">
                  <Image
                    src="/images/md-800.webp"
                    alt="Portrait of Mr. Shariful Haque, Group General Manager"
                    fill
                    className="object-cover"
                    sizes="340px"
                    loading="lazy"
                    quality={95}
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-outfit font-semibold text-white text-lg sm:text-xl mb-1">
                    Our Group General Manager
                  </p>
                  <p className="font-outfit font-semibold text-white text-lg sm:text-xl">
                    Mr. Shariful Haque
                  </p>
                </div>
              </div>

              {/* Card 3: Features with Icons */}
              <div className="flex-shrink-0 w-[280px] sm:w-[340px] h-[450px] sm:h-[540px] bg-[#BFD7EA] rounded-[20px] p-5 sm:p-6 flex flex-col justify-around transition-all duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
                {/* Icon 1: Delivery */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 sm:w-14 h-12 sm:h-14">
                    <Image
                      src="/images/icons/md/delivery-truck.svg"
                      alt=""
                      role="presentation"
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-manrope font-medium text-black text-base sm:text-lg leading-snug">
                      Next day deliveries.
                    </p>
                    <p className="font-manrope font-bold text-[#161925] text-sm sm:text-base leading-relaxed">
                      For orders before 3PM
                    </p>
                  </div>
                </div>

                {/* Icon 2: Customer Support */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 sm:w-14 h-12 sm:h-14">
                    <Image
                      src="/images/icons/md/customer-support.svg"
                      alt=""
                      role="presentation"
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-manrope font-medium text-black text-base sm:text-lg leading-snug">
                      24x7 Customer Support.
                    </p>
                    <p className="font-manrope font-bold text-[#161925] text-sm sm:text-base leading-relaxed">
                      anytime and always.
                    </p>
                  </div>
                </div>

                {/* Icon 3: Documentation */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 sm:w-14 h-12 sm:h-14">
                    <Image
                      src="/images/icons/md/documentation.svg"
                      alt=""
                      role="presentation"
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-manrope font-medium text-black text-base sm:text-lg leading-snug">
                      Minimal-paper operations.
                    </p>
                    <p className="font-manrope font-bold text-[#161925] text-sm sm:text-base leading-relaxed">
                      All processes are digital, except for delivery paperwork.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATION MAP (UAE cities) ===== */}
      <LocationMap />

      {/* ===== WHATSAPP CHAT DEMO ===== */}
      <WhatsAppChatDemo />
    </main>
  );
}



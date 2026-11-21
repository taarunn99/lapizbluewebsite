"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ========= location helpers (Home button behavior) ========= */

type Branch = {
  name: "Dubai" | "Abu Dhabi" | "Sharjah";
  lat: number;
  lng: number;
  url: string;
};

const BRANCHES: Branch[] = [
  {
    name: "Dubai",
    lat: 25.116596,
    lng: 55.223913,
    url: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
  },
  {
    name: "Abu Dhabi",
    lat: 24.345846,
    lng: 54.488503,
    url: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/@24.345846,54.488503,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e40e6c4e8e8e7:0x240c2ef83a9e23d6!8m2!3d24.345846!4d54.488503!16s%2Fg%2F11x7xg6svr?entry=ttu",
  },
  {
    name: "Sharjah",
    lat: 25.3492232,
    lng: 55.6497402,
    url: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Sharjah+Branch/@25.3492232,55.6497402,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef5f3e6ac46ac73:0x684ebefeb76de0ce!8m2!3d25.3492232!4d55.6497402!16s%2Fg%2F11x7xg6svq?entry=ttu",
  },
];

const DUBAI_URL = BRANCHES.find(b => b.name === "Dubai")!.url;
const WITHIN_KM = 100;

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  // Haversine
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

async function handleHomeClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();

  if (!("geolocation" in navigator)) {
    window.open(DUBAI_URL, "_blank", "noopener,noreferrer");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const user = { lat: pos.coords.latitude, lng: pos.coords.longitude };

      // find nearest branch
      let nearest = BRANCHES[0];
      let min = distanceKm(user, nearest);

      for (let i = 1; i < BRANCHES.length; i++) {
        const d = distanceKm(user, BRANCHES[i]);
        if (d < min) {
          min = d;
          nearest = BRANCHES[i];
        }
      }

      const targetUrl = min <= WITHIN_KM ? nearest.url : DUBAI_URL;
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    },
    () => {
      // denied or error -> Dubai
      window.open(DUBAI_URL, "_blank", "noopener,noreferrer");
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

/* =========================================================== */

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const tlRef = useRef<{ kill: () => void } | null>(null);
  const stRef = useRef<{ kill: () => void } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // kill any previous animations/triggers (when navigating)
    tlRef.current?.kill();
    stRef.current?.kill();

    let fallbackTimer: NodeJS.Timeout;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // initial hidden states (avoid flash)
      gsap.set(el, { opacity: 0, y: 48 });
      gsap.set(el.querySelectorAll(".footer-icon"), { opacity: 0, y: 10 });

      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .to(el, { opacity: 1, y: 0, duration: reduce ? 0 : 1 })
        .to(
          el.querySelectorAll(".footer-icon"),
          { opacity: 1, y: 0, duration: reduce ? 0 : 0.5, stagger: reduce ? 0 : 0.08 },
          "-=0.35"
        );

      tlRef.current = tl;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom-=24",
        once: true,
        onEnter: () => tl.play(),
      });

      stRef.current = st;

      // short-page fallback + ensure measurements are fresh after nav
      if (typeof window !== "undefined" && window.innerHeight >= document.body.scrollHeight) {
        requestAnimationFrame(() => tl.play());
      }
      requestAnimationFrame(() => ScrollTrigger.refresh());

      // Fallback: ensure footer is visible after 3 seconds even if ScrollTrigger doesn't fire
      fallbackTimer = setTimeout(() => {
        if (el && getComputedStyle(el).opacity === '0') {
          tl.play();
        }
      }, 3000);
    };

    initGSAP();

    return () => {
      clearTimeout(fallbackTimer);
      stRef.current?.kill();
      tlRef.current?.kill();
    };
  }, [pathname]);

  return (
    <footer
      ref={ref}
      aria-label="Site footer"
      style={{ opacity: 0, transform: "translateY(48px)" }}
      className="relative mt-0 overflow-hidden bg-[#161925] text-white"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 pt-12 pb-6 sm:px-6 sm:pt-14 lg:px-12">
        {/* Row 1: the mark, and the four ways to reach us */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="self-start">
            <Image src="/logos/lapizbluelogo.svg" alt="Lapiz Blue General Trading LLC, home" width={180} height={48} className="h-11 w-auto brightness-0 invert sm:h-12" />
          </Link>
          <ul className="flex items-center gap-3">
            {CONTACTS.map(({ label, href, Icon, onClick }) => {
              const isExternal = href.startsWith("http");
              return (
                <li key={label} className="footer-icon">
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/70 focus-visible:outline-2 focus-visible:outline-[#BFD7EA]"
                  >
                    <Icon className="h-[19px] w-[19px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="label-sh mt-6 text-white/60">Three distribution centres: Al Quoz, Dubai. Mussafah, Abu Dhabi. Al Sajaa, Sharjah.</p>

        {/* Row 2: the brands we are appointed for, in their own colours on the navy, each logo sized to the same visual weight */}
        <nav aria-label="Brands" className="mt-8 border-t border-white/15 pt-8">
          <p className="label-sh text-[#BFD7EA]">Authorised distributor</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-5 lg:justify-between">
            {BRAND_LOGOS.map((b) => (
              <li key={b.href} className="flex items-center">
                <Link href={b.href} className="group flex items-center rounded-md px-1 outline-none" aria-label={`${b.name} products`}>
                  <Image
                    src={b.logo}
                    alt={`${b.name} logo`}
                    width={Math.round((b.w * b.h) / 120)}
                    height={b.h}
                    style={{ height: b.h, width: "auto" }}
                    className="w-auto object-contain transition-[filter,scale] duration-300 ease-out group-hover:[filter:drop-shadow(0_0_14px_rgba(191,215,234,0.85))] group-focus-visible:[filter:drop-shadow(0_0_14px_rgba(191,215,234,0.85))] motion-safe:group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Row 3: the sorted link columns. Two columns on a phone, four on a desktop. */}
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1.618fr]">
          {COLUMNS.map((col) => (
            <nav key={col.label} aria-labelledby={`footer-${col.id}`}>
              <p id={`footer-${col.id}`} className="label-sh text-[#BFD7EA]">{col.label}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map(([href, text]) => (
                  <li key={href}>
                    <Link href={href} className="text-white/80 underline-offset-4 hover:text-white hover:underline">{text}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-labelledby="footer-branches" className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p id="footer-branches" className="label-sh text-[#BFD7EA]">Branches</p>
            <ol className="mt-3 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-3 lg:grid-cols-1">
              {BRANCH_LIST.map((b, i) => (
                <li key={b.name} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="spec-sh text-[#BFD7EA]/80">{String(i + 1).padStart(2, "0")}</span>
                  <address className="not-italic">
                    <a href={b.url} target="_blank" rel="noopener noreferrer" className="block font-semibold text-white underline-offset-4 hover:underline">{b.name}</a>
                    <span className="block text-white/70">{b.address}</span>
                    <a href={b.tel} className="text-white/80 underline-offset-4 hover:underline">{b.phone}</a>
                  </address>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Row 4: legal, the group */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Lapiz Blue General Trading LLC
            <span className="mx-2 text-white/25">|</span>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span className="mx-2 text-white/25">|</span>
            <Link href="/terms" className="hover:text-white">Terms and Conditions</Link>
          </p>
          <p>
            Lapiz Group of Companies:{" "}
            <a href="https://www.gcbuae.com" target="_blank" rel="noopener" className="underline-offset-2 hover:text-white hover:underline">Global Classic</a>
            <span className="text-white/50"> (marble, quartz and terrazzo slabs, Sharjah)</span>
            <span className="mx-2 text-white/25">|</span>
            <a href="https://www.60newton.com" target="_blank" rel="noopener" className="underline-offset-2 hover:text-white hover:underline">Sixty Newton</a>
            <span className="text-white/50"> (specialist applicators, Dubai)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* The footer's data: every link the old footer had is still here, plus the sorted columns. */
const CONTACTS: { label: string; href: string; Icon: (p: IconProps) => React.JSX.Element; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }[] = [
  { label: "Call +971 50 281 4338", href: "tel:+971 50 281 4338", Icon: PhoneIcon },
  { label: "WhatsApp Lapiz Blue", href: "https://wa.me/971502814338?text=Hello%20Lapiz%20Blue%2C%20I%20need%20a%20quotation", Icon: WhatsAppIcon },
  { label: "Email info@lapizblue.com", href: "mailto:info@lapizblue.com", Icon: MailIcon },
  { label: "Website, nearest branch on the map", href: "#geo-home", Icon: HomeIcon, onClick: handleHomeClick },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/lapizblue/posts/?feedView=all", Icon: LinkedInIcon },
  { label: "Facebook", href: "https://www.facebook.com/LapizBlueLLC", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/lapizblue.dxb/", Icon: InstagramIcon },
];

/*
 * Footer logos are transparent, trimmed PNGs at 96 px tall built by scripts/logos-transparent.mjs.
 * `w` is the PNG width at that height so the intrinsic ratio is right before the image loads.
 * They are rendered as a white silhouette at 70 percent on the navy, and light up with a soft
 * light blue glow, a tighter white halo and a gentle lift on hover or keyboard focus.
 */
const BRAND_LOGOS = [
  { name: "Mapei", href: "/brands/mapei", logo: "/images/brands/logos/footer/colour/mapei.png", w: 501, h: 30 },
  { name: "Kerakoll", href: "/brands/kerakoll", logo: "/images/brands/logos/footer/colour/kerakoll.png", w: 599, h: 26 },
  { name: "Weber", href: "/brands/weber", logo: "/images/brands/logos/footer/colour/weber.png", w: 423, h: 32 },
  { name: "Laticrete", href: "/brands/laticrete", logo: "/images/brands/logos/footer/colour/laticrete.png", w: 166, h: 44 },
  { name: "Pidilite Puma", href: "/brands/pidilite-puma", logo: "/images/brands/logos/footer/colour/pidilite-puma.png", w: 286, h: 40 },
  { name: "Profilpas", href: "/brands/profilpas", logo: "/images/brands/logos/footer/colour/profilpas.png", w: 302, h: 40 },
  { name: "AkzoNobel Dulux", href: "/brands/akzonobel", logo: "/images/brands/logos/footer/colour/akzonobel.png", w: 208, h: 44 },
  { name: "FILA", href: "/brands/fila", logo: "/images/brands/logos/footer/colour/fila.png", w: 183, h: 42 },
  { name: "Kalinga Stone", href: "/brands/kalinga-stone", logo: "/images/brands/logos/footer/colour/kalinga-stone.png", w: 335, h: 38 },
];

/* Spelled out in full because the Tailwind scanner only picks up literal class names */
const LOGO_CLASS = [
  "h-[22px] w-auto object-contain sm:h-7",
  "opacity-70 transition-[opacity,filter,scale] duration-300 ease-out",
  "[filter:brightness(0)_invert(1)]",
  "group-hover:opacity-100 group-hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_14px_rgba(191,215,234,0.9))_drop-shadow(0_0_4px_rgba(255,255,255,0.85))]",
  "group-focus-visible:opacity-100 group-focus-visible:[filter:brightness(0)_invert(1)_drop-shadow(0_0_14px_rgba(191,215,234,0.9))_drop-shadow(0_0_4px_rgba(255,255,255,0.85))]",
  "motion-safe:group-hover:scale-[1.06] motion-safe:group-focus-visible:scale-[1.06]",
].join(" ");

const COLUMNS: { id: string; label: string; links: [string, string][] }[] = [
  {
    id: "navigate",
    label: "Navigate",
    links: [["/", "Home"], ["/brands", "Brands"], ["/tools", "Tools"], ["/blog", "Guides and blog"], ["/about", "About"], ["/contact", "Contact"], ["/trade-account", "Trade account"], ["/credentials", "Credentials"], ["/quote", "Quote list"]],
  },
  {
    id: "supply",
    label: "What we supply",
    links: [
      ["/construction-chemicals-dubai", "Construction chemicals"],
      ["/tile-adhesive-supplier-dubai", "Tile adhesives and grouts"],
      ["/waterproofing-supplier-dubai", "Waterproofing"],
      ["/epoxy-flooring-supplier-dubai", "Epoxy and resin flooring"],
      ["/concrete-repair-supplier-dubai", "Concrete repair"],
      ["/mapei-grout-calculator", "Grout calculator"],
    ],
  },
  {
    id: "brands",
    label: "Brands",
    links: [["/brands/mapei", "Mapei"], ["/brands/kerakoll", "Kerakoll"], ["/brands/weber", "Weber Saint-Gobain"], ["/brands/laticrete", "Laticrete"], ["/brands/pidilite-puma", "Pidilite Puma"], ["/brands/profilpas", "Profilpas"], ["/brands/akzonobel", "AkzoNobel Dulux"], ["/brands/fila", "FILA"], ["/brands/kalinga-stone", "Kalinga Stone"]],
  },
];

const BRANCH_LIST = [
  { name: "Dubai, head office and warehouse", address: "Shop 12 to 14, 4 Street, Al Quoz Industrial Area 4", phone: "+971 4 885 5257", tel: "tel:+97148855257", url: BRANCHES[0].url },
  { name: "Abu Dhabi", address: "Shop 2, Mussafah Industrial Area 40", phone: "+971 2 886 7753", tel: "tel:+97128867753", url: BRANCHES[1].url },
  { name: "Sharjah", address: "Al Sajaa Industrial Area", phone: "+971 6 569 5001", tel: "tel:+97165695001", url: BRANCHES[2].url },
];

/* Minimal inline icons */
type IconProps = React.SVGProps<SVGSVGElement>;
function LinkedInIcon(props: IconProps) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2.21 0-3.5 1.204-3.5 2.616V21h4v-6.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5V21h4v-7.5C22 10.57 20.43 9 18.5 9c-1.054 0-1.99.48-2.5 1.198C15.49 9.48 14.554 9 13.5 9h1z"/></svg>); }
function FacebookIcon(props: IconProps) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22 12.07C22 6.477 17.523 2 11.93 2 6.338 2 1.86 6.477 1.86 12.07c0 4.99 3.657 9.128 8.437 9.93v-7.02h-2.54v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33v7.02c4.78-.802 8.437-4.94 8.437-9.93z"/></svg>); }
function WhatsAppIcon(props: IconProps) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>); }
function HomeIcon(props: IconProps) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="m12 3 9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z"/></svg>); }
function InstagramIcon(props: IconProps) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm5.75-2.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>); }
function PhoneIcon(props: IconProps) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.37 2.28.57 3.58.57a1 1 0 0 1 1 1V20a2 2 0 0 1-2 2C10.85 22 2 13.15 2 2a2 2 0 0 1 2-2h3.49a1 1 0 0 1 1 1c0 1.3.2 2.48.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/></svg>); }
function MailIcon(props: IconProps) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 3-8 5L4 7V6l8 5 8-5z"/></svg>); }

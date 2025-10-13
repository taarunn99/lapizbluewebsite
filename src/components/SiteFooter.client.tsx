"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    // TODO: replace with exact branch coordinates if you have them
    lat: 24.4539,
    lng: 54.3773,
    url: "https://google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/data=!4m2!3m1!1s0x0:0x240c2ef83a9e23d6?sa=X&ved=1t:2428&ictx=111",
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
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // kill any previous animations/triggers (when navigating)
    tlRef.current?.kill();
    stRef.current?.kill();

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

    return () => {
      st.kill();
      tl.kill();
    };
  }, [pathname]);

  return (
    <footer
      ref={ref}
      aria-label="Site footer"
      style={{ opacity: 0, transform: "translateY(48px)" }}
      className="relative mt-24 border-t border-black/10 bg-white"
    >
      {/* soft backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/meshgradientbase.png"
          alt=""
          fill
          className="object-cover opacity-40"
          priority={false}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div className="text-[#23395B]">
            <p className="font-medium">Lapiz Blue General Trading LLC</p>
          </div>

          <ul className="flex items-center gap-5 text-[#23395B]">
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li className="text-black/20">|</li>
            <li><Link href="/terms" className="hover:underline">Terms and Conditions</Link></li>
          </ul>

          {/* Socials (with redirects + geolocation on Home) */}
          <ul className="flex items-center justify-start md:justify-end gap-3 md:gap-4">
            {[
              {
                label: "LinkedIn",
                svg: LinkedInIcon,
                href: "https://www.linkedin.com/company/lapizblue/posts/?feedView=all",
              },
              {
                label: "Facebook",
                svg: FacebookIcon,
                href: "https://www.facebook.com/LapizBlueLLC",
              },
              // HOME: use geolocation to pick branch (onClick)
              {
                label: "Website",
                svg: HomeIcon,
                href: "#geo-home",
                onClick: handleHomeClick,
              },
              {
                label: "Instagram",
                svg: InstagramIcon,
                href: "https://www.instagram.com/lapizblue.dxb/",
              },
              {
                label: "Call",
                svg: PhoneIcon,
                href: "tel:+971 50 281 4338",
              },
              {
                label: "Email",
                svg: MailIcon,
                href: "mailto:info@lapizblue.com",
              },
            ].map(({ label, svg: Icon, href, onClick }) => {
              const isExternal = href.startsWith("http");
              return (
                <li key={label} className="footer-icon">
                  <a
                    href={href}
                    aria-label={label}
                    onClick={onClick as any}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition hover:-translate-y-0.5"
                    role={onClick ? "button" : undefined}
                    title={label}
                  >
                    <Icon className="h-4 w-4 text-[#1E6BA8]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* Minimal inline icons (unchanged) */
function LinkedInIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2.21 0-3.5 1.204-3.5 2.616V21h4v-6.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5V21h4v-7.5C22 10.57 20.43 9 18.5 9c-1.054 0-1.99.48-2.5 1.198C15.49 9.48 14.554 9 13.5 9h1z"/></svg>); }
function FacebookIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22 12.07C22 6.477 17.523 2 11.93 2 6.338 2 1.86 6.477 1.86 12.07c0 4.99 3.657 9.128 8.437 9.93v-7.02h-2.54v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33v7.02c4.78-.802 8.437-4.94 8.437-9.93z"/></svg>); }
function HomeIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="m12 3 9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z"/></svg>); }
function InstagramIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm5.75-2.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>); }
function PhoneIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.37 2.28.57 3.58.57a1 1 0 0 1 1 1V20a2 2 0 0 1-2 2C10.85 22 2 13.15 2 2a2 2 0 0 1 2-2h3.49a1 1 0 0 1 1 1c0 1.3.2 2.48.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/></svg>); }
function MailIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 3-8 5L4 7V6l8 5 8-5z"/></svg>); }

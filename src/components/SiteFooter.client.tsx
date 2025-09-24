"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initial states BEFORE paint (prevents flash of visible footer)
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

    // Reveal when footer enters from the bottom of viewport (user reaches page end)
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom-=24", // play when footer top is ~24px from viewport bottom
      once: true,
      onEnter: () => tl.play(),
    });

    // Fallback: page is shorter than the viewport (footer visible on load)
    if (window.innerHeight >= document.body.scrollHeight) {
      requestAnimationFrame(() => tl.play());
    }

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <footer
      ref={ref}
      aria-label="Site footer"
      // SSR-safe hidden state (prevents FOUC if JS is slow to hydrate)
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

          {/* Socials (placeholder hrefs) */}
          <ul className="flex items-center justify-start md:justify-end gap-3 md:gap-4">
            {[
              { label: "LinkedIn", svg: LinkedInIcon },
              { label: "Facebook", svg: FacebookIcon },
              { label: "Website", svg: HomeIcon },
              { label: "Instagram", svg: InstagramIcon },
              { label: "Call", svg: PhoneIcon },
              { label: "Email", svg: MailIcon },
            ].map(({ label, svg: Icon }) => (
              <li key={label} className="footer-icon">
                <a
                  href="#"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4 text-[#1E6BA8]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* Minimal inline icons */
function LinkedInIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2.21 0-3.5 1.204-3.5 2.616V21h4v-6.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5V21h4v-7.5C22 10.57 20.43 9 18.5 9c-1.054 0-1.99.48-2.5 1.198C15.49 9.48 14.554 9 13.5 9h1z"/></svg>); }
function FacebookIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22 12.07C22 6.477 17.523 2 11.93 2 6.338 2 1.86 6.477 1.86 12.07c0 4.99 3.657 9.128 8.437 9.93v-7.02h-2.54v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33v7.02c4.78-.802 8.437-4.94 8.437-9.93z"/></svg>); }
function HomeIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="m12 3 9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z"/></svg>); }
function InstagramIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm5.75-2.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>); }
function PhoneIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.37 2.28.57 3.58.57a1 1 0 0 1 1 1V20a2 2 0 0 1-2 2C10.85 22 2 13.15 2 2a2 2 0 0 1 2-2h3.49a1 1 0 0 1 1 1c0 1.3.2 2.48.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/></svg>); }
function MailIcon(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 3-8 5L4 7V6l8 5 8-5z"/></svg>); }

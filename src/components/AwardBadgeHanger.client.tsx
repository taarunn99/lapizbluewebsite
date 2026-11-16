"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * The 2026 Dubai Local Awards rosette, hanging from the navbar on a cord.
 *
 * Real pendulum physics, not a CSS keyframe loop: angular acceleration is
 * -(g/L)sin(theta) minus damping, integrated per frame. That is why it settles
 * naturally and why flicking it feels like a real object.
 *
 * Deliberately not Three.js. At 56px a WebGL context plus the library would
 * cost roughly 600KB on the highest traffic page to animate one small object,
 * and the house rule is that Lighthouse stays at 100. This file is about 2KB
 * of logic and one 5KB image.
 *
 * Behaviour: drops in once on load, settles, then hangs completely still.
 * Scrolling is what sets it going, the way a hanging object lags behind its
 * mount. Once the page stops it swings down and stops too, and the animation
 * loop stops with it, so a still badge costs nothing on a slow phone.
 * Drag it and it swings. Tap it and it opens the Google listing to leave a
 * review. Pull it up (or press the hook) and it tucks behind the navbar, with
 * only a small hook left to pull it back down. That choice is remembered.
 */

// Opens Google's write a review dialog directly on the Dubai branch, rather
// than the listing. The hex pair is the same branch identifier the footer's
// Maps link uses, so it is verified to be the right business; the trailing
// !12e1 is what makes Google open the rating dialog instead of the place page.
// If the owner sends the g.page/r/<id>/review short link from Google Business
// Profile (Ask for reviews, copy link), swap it in here, it is tidier.
const REVIEW_URL =
  "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!12e1";

const STORAGE_KEY = "lapizblue-award-badge-tucked";
const NAVBAR_H = 75;

// Pendulum constants. CORD_LEN is in the same arbitrary units as gravity, tuned
// so the swing reads as a light object on a short cord rather than a wrecking ball.
const GRAVITY = 0.18;
const CORD_LEN = 1;
// Heavy enough that a scroll push dies out over a few swings instead of
// ringing on. Still far below the 2*sqrt(g/L) that would stop it oscillating
// at all, so it swings, it just does not swing forever.
const DAMPING = 0.05;
// How hard a scroll shoves the bob. Per pixel of scroll, so a normal flick of
// the wheel reads as a push and a long drag does not launch it into orbit.
// Raised alongside gravity, since a stiffer restoring force travels less for
// the same shove.
const SCROLL_COUPLING = 0.0003;
const MAX_VEL = 0.16;
// Below this it is called still: snapped to centre and the loop is stopped
// until the next scroll or drag.
const REST_ANGLE = 0.004;
const REST_VEL = 0.004;

export function AwardBadgeHanger() {
  const [mounted, setMounted] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [reduced, setReduced] = useState(false);
  // True once the drop-in CSS animation has finished and been cleared, which is
  // when the physics loop is allowed to own the transform.
  const [dropped, setDropped] = useState(false);

  const armRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0.16); // small starting lift, so arrival settles quickly
  const vel = useRef(0);
  const dragging = useRef(false);
  const dragAngle = useRef(0);
  const lastT = useRef(0);
  const raf = useRef(0);
  const movedWhileDragging = useRef(false);
  // Scroll distance banked since the last frame, consumed by the physics loop.
  const scrollImpulse = useRef(0);
  const lastScrollY = useRef(0);
  // Starts the physics loop again after it has stopped itself.
  const wakeRef = useRef<() => void>(() => {});

  // Mount only on the client and only after first paint, so nothing here can
  // touch the LCP of the hero image above it.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);

    let tuckedInitial = false;
    try {
      tuckedInitial = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // private mode or blocked storage, treat as not tucked
    }
    setTucked(tuckedInitial);

    const t = setTimeout(() => setMounted(true), 900);
    return () => {
      clearTimeout(t);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  // The page moving is what sets it going. A hanging object lags behind its
  // mount, so scrolling down throws the bob back and vice versa. Passive
  // listener, and it only banks a number: the physics loop does the work.
  useEffect(() => {
    if (!mounted || tucked || reduced) return;
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      scrollImpulse.current += y - lastScrollY.current;
      lastScrollY.current = y;
      wakeRef.current();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, tucked, reduced]);

  // The physics loop. It runs only while there is something to animate: once
  // the badge is hanging still it stops itself, and a scroll or a drag calls
  // wakeRef to start it again.
  useEffect(() => {
    if (!mounted || tucked || reduced || !dropped) return;
    const arm = armRef.current;
    if (!arm) return;

    let running = false;

    const step = (t: number) => {
      const dt = Math.min((t - (lastT.current || t)) / 16.67, 2.5);
      lastT.current = t;

      if (dragging.current) {
        angle.current = dragAngle.current;
        vel.current = 0;
      } else {
        const accel = -(GRAVITY / CORD_LEN) * Math.sin(angle.current) - DAMPING * vel.current;
        vel.current += accel * dt;

        // Scroll shove, spent over a few frames so it reads as a push rather
        // than a jolt, then clamped so nothing can wind it up endlessly.
        if (scrollImpulse.current !== 0) {
          vel.current -= scrollImpulse.current * SCROLL_COUPLING * dt;
          scrollImpulse.current *= 0.8;
          if (Math.abs(scrollImpulse.current) < 0.05) scrollImpulse.current = 0;
          vel.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, vel.current));
        }

        angle.current += vel.current * dt;
        angle.current = Math.max(-0.32, Math.min(0.32, angle.current));

        // Hanging still. Snap to centre, stop the loop, and wait for the next
        // scroll. Nothing feeds energy back in, so it stays still.
        if (
          scrollImpulse.current === 0 &&
          Math.abs(angle.current) < REST_ANGLE &&
          Math.abs(vel.current) < REST_VEL
        ) {
          angle.current = 0;
          vel.current = 0;
          arm.style.transform = 'rotate(0rad)';
          running = false;
          return;
        }
      }

      arm.style.transform = `rotate(${angle.current}rad)`;
      raf.current = requestAnimationFrame(step);
    };

    const wake = () => {
      if (running) return;
      running = true;
      lastT.current = 0; // so the first frame after a rest has a zero delta
      raf.current = requestAnimationFrame(step);
    };

    wakeRef.current = wake;
    wake(); // settle whatever lift the arrival left behind

    return () => {
      cancelAnimationFrame(raf.current);
      running = false;
      wakeRef.current = () => {};
    };
  }, [mounted, tucked, reduced, dropped]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    wakeRef.current();
    dragging.current = true;
    movedWhileDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const arm = armRef.current;
    if (!arm) return;
    const pivot = arm.getBoundingClientRect();
    const dx = e.clientX - (pivot.left + pivot.width / 2);
    const dy = Math.max(e.clientY - pivot.top, 24);
    const next = Math.atan2(dx, dy);
    if (Math.abs(next - dragAngle.current) > 0.012) movedWhileDragging.current = true;
    // Clamp so it cannot be swung into orbit or behind the navbar.
    dragAngle.current = Math.max(-0.32, Math.min(0.32, next));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    // Hand the drag angle back to the simulation with a little push, so letting
    // go mid swing carries momentum instead of stopping dead.
    vel.current = 0.045 * Math.sign(dragAngle.current || 1);
  }, []);

  const tuck = useCallback(() => {
    setTucked(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }, []);

  const untuck = useCallback(() => {
    angle.current = 0.3;
    vel.current = 0;
    setDropped(false); // replay the drop, then physics takes over again
    setTucked(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const openReview = useCallback((e: React.MouseEvent) => {
    // A drag should swing it, not navigate.
    if (movedWhileDragging.current) {
      e.preventDefault();
      movedWhileDragging.current = false;
    }
  }, []);

  if (!mounted) return null;

  // Tucked: only a small hook peeks below the navbar to pull it back down.
  if (tucked) {
    return (
      <button
        type="button"
        onClick={untuck}
        aria-label="Show the 2026 Dubai Local Awards badge"
        className="fixed left-5 z-40 h-6 w-10 rounded-b-full bg-[#A80E18] shadow-md transition-transform hover:translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E]"
        style={{ top: NAVBAR_H }}
      />
    );
  }

  return (
    <div
      className="fixed left-0 z-40 pointer-events-none"
      style={{ top: NAVBAR_H - 4, paddingLeft: 56 }}
      aria-hidden={false}
    >
      {/* The arm rotates about its top edge, so cord and rosette swing together.
          The drop-in animation MUST be cleared once it ends: a running CSS
          animation outranks inline styles in the cascade, so leaving it applied
          (fill-mode both) silently swallows every transform the physics loop
          writes and the badge hangs dead still. */}
      <div
        ref={armRef}
        className="origin-top will-change-transform"
        onAnimationEnd={() => setDropped(true)}
        style={{
          transform: reduced ? "rotate(0rad)" : undefined,
          animation:
            reduced || dropped
              ? undefined
              : "lb-badge-drop 900ms cubic-bezier(.22,1.2,.36,1) both",
        }}
      >
        {/* cord */}
        <div className="mx-auto h-4 sm:h-8 w-px bg-[#161925]/35" />

        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener"
          onClick={openReview}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          title="Rate Lapiz Blue on Google"
          aria-label="Winner, Outstanding Construction Material Wholesaler, 2026 Dubai Local Awards. Opens Google to rate Lapiz Blue."
          className="pointer-events-auto block w-20 sm:w-28 cursor-grab touch-none select-none drop-shadow-[0_8px_14px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-[1.18] active:scale-105 active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#406E8E]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/awards/rosette-224.webp"
            srcSet="/awards/rosette-160.webp 160w, /awards/rosette-224.webp 224w, /awards/rosette-336.webp 336w"
            sizes="(max-width: 640px) 80px, 112px"
            width={224}
            height={239}
            alt="Outstanding Construction Material Wholesaler in Al Quoz, Dubai - 2026 Dubai Local Awards by DXB Local"
            className="w-full h-auto"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>

      {/* Tuck control, offset so it never sits under the rosette itself */}
      <button
        type="button"
        onClick={tuck}
        aria-label="Hide the awards badge"
        className="pointer-events-auto absolute left-[86px] sm:left-[116px] top-0 grid h-6 w-6 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E]"
      >
        {/* 24px hit target for accessibility, 16px visible dot so it stays discreet */}
        <span className="grid h-4 w-4 place-items-center rounded-full bg-white/85 text-[#161925] shadow-sm ring-1 ring-black/10 text-[10px] leading-none transition hover:bg-white">
          &times;
        </span>
      </button>
    </div>
  );
}

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
 * Behaviour: drops in once on load, swings, settles to a near still idle sway.
 * Drag it and it swings. Tap it and it opens the Google listing to leave a
 * review. Pull it up (or press the hook) and it tucks behind the navbar, with
 * only a small hook left to pull it back down. That choice is remembered.
 */

// The Dubai branch listing, the same verified URL the footer uses.
// Replace with the g.page/r/<id>/review short link from Google Business Profile
// (Ask for reviews, copy link) to drop straight into the review form.
const REVIEW_URL =
  "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu";

const STORAGE_KEY = "lapizblue-award-badge-tucked";
const NAVBAR_H = 75;

// Pendulum constants. CORD_LEN is in the same arbitrary units as gravity, tuned
// so the swing reads as a light object on a short cord rather than a wrecking ball.
const GRAVITY = 0.45;
const CORD_LEN = 1;
const DAMPING = 0.012;
const IDLE_NUDGE = 0.00028;

export function AwardBadgeHanger() {
  const [mounted, setMounted] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [reduced, setReduced] = useState(false);

  const armRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0.26); // starting lift, so it swings in on arrival
  const vel = useRef(0);
  const dragging = useRef(false);
  const dragAngle = useRef(0);
  const lastT = useRef(0);
  const raf = useRef(0);
  const movedWhileDragging = useRef(false);

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

  // The physics loop.
  useEffect(() => {
    if (!mounted || tucked || reduced) return;
    const arm = armRef.current;
    if (!arm) return;

    const step = (t: number) => {
      const dt = Math.min((t - (lastT.current || t)) / 16.67, 2.5);
      lastT.current = t;

      if (dragging.current) {
        angle.current = dragAngle.current;
        vel.current = 0;
      } else {
        const accel = -(GRAVITY / CORD_LEN) * Math.sin(angle.current) - DAMPING * vel.current;
        vel.current += accel * dt;
        angle.current += vel.current * dt;

        // Once it has all but stopped, feed in a whisper of energy so it stays
        // alive rather than freezing dead. Small enough to read as air movement.
        if (Math.abs(angle.current) < 0.012 && Math.abs(vel.current) < 0.012) {
          vel.current += (Math.random() > 0.5 ? 1 : -1) * IDLE_NUDGE;
        }
      }

      arm.style.transform = `rotate(${angle.current}rad)`;
      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [mounted, tucked, reduced]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
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
    dragAngle.current = Math.max(-0.85, Math.min(0.85, next));
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
      style={{ top: NAVBAR_H - 4, paddingLeft: 14 }}
      aria-hidden={false}
    >
      {/* The arm rotates about its top edge, so cord and rosette swing together */}
      <div
        ref={armRef}
        className="origin-top will-change-transform"
        style={{
          transform: reduced ? "rotate(0rad)" : undefined,
          animation: reduced ? undefined : "lb-badge-drop 900ms cubic-bezier(.22,1.2,.36,1) both",
        }}
      >
        {/* cord */}
        <div className="mx-auto h-7 w-px bg-[#161925]/35" />

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
          aria-label="Winner, Outstanding Construction Material Wholesaler, 2026 Dubai Local Awards. Opens Google to leave a review."
          className="pointer-events-auto block w-11 sm:w-14 cursor-grab touch-none select-none drop-shadow-[0_6px_10px_rgba(0,0,0,0.28)] transition-transform hover:scale-105 active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#406E8E]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/awards/rosette-112.webp"
            srcSet="/awards/rosette-112.webp 112w, /awards/rosette-168.webp 168w"
            sizes="(max-width: 640px) 44px, 56px"
            width={112}
            height={119}
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
        className="pointer-events-auto absolute left-[42px] sm:left-[54px] top-0 grid h-6 w-6 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E]"
      >
        {/* 24px hit target for accessibility, 16px visible dot so it stays discreet */}
        <span className="grid h-4 w-4 place-items-center rounded-full bg-white/85 text-[#161925] shadow-sm ring-1 ring-black/10 text-[10px] leading-none transition hover:bg-white">
          &times;
        </span>
      </button>
    </div>
  );
}

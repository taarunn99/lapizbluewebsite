'use client';

// Prototype. Not wired into any shipping page.
//
// Mount rules, all non negotiable:
//   1. the three.js renderer arrives through dynamic(..., { ssr: false })
//   2. it is only mounted once the element has been seen in the viewport, so
//      it can never be part of the first screen or of Largest Contentful Paint
//   3. the static pre rendered WebP poster is the server rendered markup, so a
//      crawler, a no script visitor and a reduced motion visitor all get the
//      poster and nothing else
//   4. the render loop is cut the moment the element leaves the viewport

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PackForm } from './pack-3d.client';

const Pack3DCanvas = dynamic(() => import('./pack-3d.client').then((m) => m.Pack3DCanvas), {
  ssr: false,
});

export interface Pack3DProps {
  /** Pack shot, used as the front face texture. */
  src: string;
  /** Static pre rendered WebP poster. The fallback and the crawler's view. */
  poster: string;
  form: PackForm;
  name: string;
  packSize: string;
  className?: string;
}

export function Pack3D({ src, poster, form, name, packSize, className }: Pack3DProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  // Latches once the element has been seen, so the chunk is fetched once.
  const [mounted, setMounted] = useState(false);
  // Follows the element in and out of view, so the loop stops off screen.
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (motionQuery.matches) {
          setActive(false);
          return;
        }
        setActive(visible);
        if (visible) setMounted(true);
      },
      { rootMargin: '64px 0px', threshold: 0.12 },
    );
    observer.observe(el);

    const onMotionChange = () => {
      if (motionQuery.matches) setActive(false);
    };
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  return (
    <figure className={className}>
      <div
        ref={frameRef}
        className="relative aspect-square w-full overflow-hidden rounded-2xl"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 8%, #F6F8FA 0%, #F6F8FA 42%, #BFD7EA 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(35, 57, 91, 0.12)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt={`${name} ${packSize} pack`}
          width={720}
          height={720}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
          style={{ opacity: ready ? 0 : 1 }}
        />
        {mounted ? <Pack3DCanvas src={src} form={form} label={`${name} pack, 3D view`} active={active} onReady={onReady} /> : null}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-manrope text-[13px] text-[#23395B]">
        <span className="font-semibold text-[#161925]">{name}</span>
        <span className="text-[#406E8E]">{packSize}</span>
      </figcaption>
    </figure>
  );
}

export default Pack3D;

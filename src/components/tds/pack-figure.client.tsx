'use client';

/**
 * The pack figure on a product page, with the 3D view behind a tap.
 *
 * The pack shot is the Largest Contentful Paint element on this page, and the
 * five SEO pages score as they do because they ship no animation code, so the
 * renderer is never mounted on its own. What ships is the static 3D render as
 * an ordinary priority image, exactly where the flat pack shot used to be, and
 * a control underneath it. The three.js chunk is requested on the first tap
 * and never before, so a visitor who does not tap pays nothing at all, not
 * even on a lazy path.
 *
 * A reduced motion visitor is not offered the control, and a crawler and a no
 * script visitor get the poster, because the poster is the server markup.
 */

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PackForm } from '@/lib/pack-3d-index';

const Pack3DCanvas = dynamic(
  () => import('./pack-3d.client').then((m) => m.Pack3DCanvas),
  { ssr: false },
);

interface PackFigureProps {
  /** The 3D render, used as the figure's image. */
  poster: string;
  /** The flat pack shot, which the renderer maps onto the front face. */
  src: string;
  form: PackForm;
  name: string;
  alt: string;
  caption: string;
}

export function PackFigure({ poster, src, form, name, alt, caption }: PackFigureProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [offered, setOffered] = useState(false);

  // The control is only offered where motion is welcome, and the check runs on
  // the client so the server markup is the poster either way.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setOffered(!query.matches);
      if (query.matches) setActive(false);
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Once mounted, the loop follows the figure in and out of view, so nothing
  // runs while the reader is further down the page.
  useEffect(() => {
    if (!mounted) return;
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => setActive(entries.some((e) => e.isIntersecting)),
      { rootMargin: '64px 0px', threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  const turn = useCallback(() => {
    setMounted(true);
    setActive(true);
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  return (
    <figure className="order-1 lg:order-2">
      <div
        ref={frameRef}
        /* Every breakpoint needs a definite height here. Both the poster and
           the 3D canvas are absolutely positioned inside the box below, so
           nothing in that box has a height of its own: it is entirely
           height:100% of this one. At lg this read "h-full min-h-[420px]",
           and a percentage height against a figure of automatic height
           resolves to auto, which made the box zero tall and took the pack
           shot down with the model. 420px is what it measured anyway. */
        className="bg-[#F1F2F4] flex items-center justify-center p-8 lg:p-10 h-64 sm:h-80 lg:h-[420px]"
      >
        <div className="relative w-full h-full max-h-[420px]">
          <Image
            src={poster}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 90vw, 480px"
            className="object-contain transition-opacity duration-500"
            style={{ opacity: ready ? 0 : 1 }}
            priority
          />
          {mounted ? (
            <Pack3DCanvas
              src={src}
              form={form}
              label={`${name} pack, turn to view`}
              active={active}
              onReady={onReady}
            />
          ) : null}
        </div>
      </div>
      <figcaption className="border-t border-[#161925]/15 pt-2 mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500 flex justify-between gap-3">
        <span>Fig. 01</span>
        <span>{caption}</span>
      </figcaption>
      {offered && !mounted ? (
        <button
          type="button"
          onClick={turn}
          className="mt-3 inline-flex items-center gap-2 font-manrope text-[11px] uppercase tracking-[0.18em] text-[#406E8E] hover:text-[#23395B] transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
            <path d="M3 4v4.5h4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Turn the pack
        </button>
      ) : null}
    </figure>
  );
}

export default PackFigure;

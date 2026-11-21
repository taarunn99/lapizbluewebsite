/**
 * A light running round the edge of a frame, the Magic UI border beam idea
 * done in CSS alone: a conic gradient square turning behind a one pixel ring
 * mask, so the only thing painted is the border. No JavaScript, and the turn
 * is paused under reduced motion.
 */
const ring = "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)";

export function ConicBorderBeam({ duration = "9s", className = "" }: { duration?: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] p-px ${className}`}
      style={{ WebkitMask: ring, mask: ring, WebkitMaskComposite: "xor", maskComposite: "exclude" }}
    >
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin motion-reduce:[animation-play-state:paused] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_230deg,rgba(243,223,193,0.35)_300deg,#F3DFC1_330deg,rgba(243,223,193,0.35)_350deg,transparent_360deg)]"
        style={{ animationDuration: duration }}
      />
    </div>
  );
}

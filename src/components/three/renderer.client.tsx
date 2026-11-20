"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TONE_HEX, type SceneDef } from "@/data/scenes";

/**
 * The live three.js view of a layered scene.
 *
 * Loaded only after a tap or a scroll into view, never in the initial bundle.
 * Vanilla three with a hand rolled orbit so the examples bundle does not come
 * along. Layers are boxes stacked bottom first; the explode slider opens the
 * gaps so the stack reads; hovering or tapping a layer highlights it and the
 * list beside it. Everything is disposed on unmount.
 */

interface Props {
  scene: SceneDef;
  /** Fixed camera, no controls, no list: the frame the poster is taken from. */
  poster?: boolean;
  onReady?: () => void;
}

/** Vertical rise of the return on a shell scene and the drop of an apron, in scene units. */
const RETURN = 5.5;

const WIDTH = 10;
const DEPTH = 7;
/** Rendered height for a layer: compress the range so a 150 mm slab and a 1 mm sheet both read. */
function heightFor(mm: number, sheet?: boolean): number {
  if (sheet) return 0.16;
  return Math.max(0.28, Math.min(2.4, 0.3 * Math.log2(mm + 1)));
}

export default function SceneRenderer({ scene, poster = false, onReady }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [explode, setExplode] = useState(poster ? 0.45 : 0.55);
  const explodeRef = useRef(explode);
  explodeRef.current = explode;
  const activeRef = useRef<number | null>(null);
  activeRef.current = active;

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: poster });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";

    const three = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);

    three.add(new THREE.HemisphereLight(0xffffff, 0xbfd7ea, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(6, 10, 8);
    three.add(sun);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(-8, 4, -6);
    three.add(fill);

    const group = new THREE.Group();
    three.add(group);

    const meshes: THREE.Mesh[] = [];
    const baseHeights = scene.layers.map((l) => heightFor(l.mm, l.sheet));
    const total = baseHeights.reduce((a, b) => a + b, 0);
    const kind = scene.kind ?? "stack";
    const before = baseHeights.map((_, i) => baseHeights.slice(0, i).reduce((a, b) => a + b, 0));
    const topH = baseHeights[baseHeights.length - 1];
    // A shell nests: each layer's slab starts where the returns below it end.
    // An apron tucks: every layer under the top one is shorter by the apron.
    const depthOf = (i: number) =>
      kind === "shell" ? DEPTH - before[i] - baseHeights[i] : kind === "apron" && i < baseHeights.length - 1 ? DEPTH - topH : DEPTH;
    const zOf = (i: number) =>
      kind === "shell" ? (before[i] + baseHeights[i]) / 2 : kind === "apron" && i < baseHeights.length - 1 ? -topH / 2 : 0;

    scene.layers.forEach((layer, i) => {
      const h = baseHeights[i];
      const colour = new THREE.Color(TONE_HEX[layer.tone]);
      const mat = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.85, metalness: 0.02 });
      // Lighter tones need a visible edge against white.
      const layerGroup = new THREE.Group();
      const d = depthOf(i);
      const zc = zOf(i);
      if (layer.tiled) {
        // A grid of tiles with joints, so the tile layer looks tiled.
        const cols = 4, rows = 3, joint = 0.12;
        const tw = (WIDTH - joint * (cols - 1)) / cols;
        const td = (d - joint * (rows - 1)) / rows;
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const m = new THREE.Mesh(new THREE.BoxGeometry(tw, h, td), mat);
            m.position.set(-WIDTH / 2 + tw / 2 + c * (tw + joint), 0, zc - d / 2 + td / 2 + r * (td + joint));
            layerGroup.add(m);
          }
        }
        // The joint fill underneath, in the next layer's tone if it is a grout.
        const grout = scene.layers[i + 1];
        if (grout && /grout/i.test(grout.name)) {
          // Slightly inside the tile envelope on every face, so no two faces
          // are coplanar and nothing flickers.
          const g = new THREE.Mesh(
            new THREE.BoxGeometry(WIDTH - 0.04, h * 0.7, d - 0.04),
            new THREE.MeshStandardMaterial({ color: new THREE.Color(TONE_HEX[grout.tone]), roughness: 0.9 }),
          );
          g.position.set(0, -h * 0.14, zc);
          layerGroup.add(g);
        }
      } else {
        const m = new THREE.Mesh(new THREE.BoxGeometry(WIDTH, h, d), mat);
        m.position.z = zc;
        layerGroup.add(m);
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(m.geometry),
          new THREE.LineBasicMaterial({ color: 0x161925, transparent: true, opacity: 0.35 }),
        );
        edges.position.z = zc;
        layerGroup.add(edges);
      }
      // A shell turns the corner: each layer also runs up the back as a wall,
      // nested inside the one before it. An apron drops the top layer over the
      // front edge, the way a worktop slab does.
      if (kind === "shell" || (kind === "apron" && i === baseHeights.length - 1)) {
        const ret = new THREE.Mesh(new THREE.BoxGeometry(WIDTH, RETURN, h), mat);
        if (kind === "shell") ret.position.set(0, h / 2 + RETURN / 2, -DEPTH / 2 + before[i] + h / 2);
        else ret.position.set(0, -RETURN / 2 - h / 2, DEPTH / 2 - h / 2);
        layerGroup.add(ret);
        const re = new THREE.LineSegments(new THREE.EdgesGeometry(ret.geometry), new THREE.LineBasicMaterial({ color: 0x161925, transparent: true, opacity: 0.3 }));
        re.position.copy(ret.position);
        layerGroup.add(re);
      }
      const pick = new THREE.Mesh(new THREE.BoxGeometry(WIDTH, h, d), new THREE.MeshBasicMaterial({ visible: false }));
      pick.position.z = zc;
      pick.userData.index = i;
      layerGroup.add(pick);
      meshes.push(pick);
      layerGroup.userData.index = i;
      group.add(layerGroup);
    });

    // The grout layer in a tiled scene is drawn inside the tile layer, so it is
    // represented in the list but given no height of its own.
    const layout = () => {
      let y = -total / 2;
      const gap = explodeRef.current * 0.9;
      group.children.forEach((g, i) => {
        const layer = scene.layers[i];
        const prev = scene.layers[i - 1];
        const h = baseHeights[i];
        const merged = /grout/i.test(layer.name) && prev?.tiled;
        if (merged) {
          g.visible = false;
          return;
        }
        g.position.y = y + h / 2;
        y += h + gap;
      });
      // Highlight
      group.children.forEach((g, i) => {
        g.traverse((o) => {
          if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshStandardMaterial) {
            const on = activeRef.current === i || (activeRef.current != null && /grout/i.test(scene.layers[activeRef.current].name) && scene.layers[activeRef.current - 1]?.tiled && i === activeRef.current - 1);
            o.material.emissive.set(on ? 0x406e8e : 0x000000);
            o.material.emissiveIntensity = on ? 0.35 : 0;
          }
        });
      });
    };

    // A wall section stands the stack on its side: the first layer at the back, finishes toward the viewer.
    if (kind === "wall") group.rotation.x = Math.PI / 2;

    // Camera: three quarter view, framed to the stack.
    let theta = poster ? -0.62 : -0.55;
    let phi = poster ? 0.46 : 0.5;
    let radius = 22;
    const target = new THREE.Vector3(0, kind === "shell" ? RETURN / 2 : kind === "apron" ? -RETURN / 2 : 0, 0);
    const place = () => {
      camera.position.set(
        target.x + radius * Math.cos(phi) * Math.sin(theta),
        target.y + radius * Math.sin(phi),
        target.z + radius * Math.cos(phi) * Math.cos(theta),
      );
      camera.lookAt(target);
    };

    const resize = () => {
      const w = el.clientWidth || 600;
      const h = el.clientHeight || 450;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Keep the whole stack in frame whatever the aspect.
      const stackSpan = total + explodeRef.current * 0.9 * scene.layers.length;
      const kindSpan = kind === "stack" ? stackSpan : stackSpan + RETURN;
      const span = Math.max(WIDTH, kindSpan) * 1.15;
      radius = span / (2 * Math.tan((camera.fov * Math.PI) / 360)) / Math.min(1, camera.aspect) + 2;
      camera.updateProjectionMatrix();
      place();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Orbit by pointer, pinch to zoom, without the examples bundle.
    let dragging = false, lastX = 0, lastY = 0, pinch = 0;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pickAt = (x: number, y: number) => {
      const r = renderer.domElement.getBoundingClientRect();
      pointer.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(meshes, false)[0];
      return hit ? (hit.object.userData.index as number) : null;
    };
    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; renderer.domElement.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => {
      if (dragging && (e.buttons & 1)) {
        theta -= (e.clientX - lastX) * 0.008;
        phi = Math.max(0.12, Math.min(1.25, phi + (e.clientY - lastY) * 0.006));
        lastX = e.clientX; lastY = e.clientY;
        place();
      } else if (!poster && e.pointerType === "mouse") {
        const i = pickAt(e.clientX, e.clientY);
        if (i !== activeRef.current) setActive(i);
      }
    };
    const onUp = (e: PointerEvent) => {
      if (Math.abs(e.clientX - lastX) < 3 && Math.abs(e.clientY - lastY) < 3 && !poster) {
        const i = pickAt(e.clientX, e.clientY);
        setActive(i);
      }
      dragging = false;
    };
    const onWheel = (e: WheelEvent) => { e.preventDefault(); radius = Math.max(10, Math.min(40, radius + e.deltaY * 0.02)); place(); };
    const onTouchStart = (e: TouchEvent) => { if (e.touches.length === 2) pinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        radius = Math.max(10, Math.min(40, radius - (d - pinch) * 0.05));
        pinch = d; place(); e.preventDefault();
      }
    };
    if (!poster) {
      renderer.domElement.addEventListener("pointerdown", onDown);
      renderer.domElement.addEventListener("pointermove", onMove);
      renderer.domElement.addEventListener("pointerup", onUp);
      renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
      renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
      renderer.domElement.addEventListener("touchmove", onTouchMove, { passive: false });
    }

    let frame = 0;
    let alive = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let spinning = !poster && !reduced;
    const stopSpin = () => { spinning = false; };
    if (spinning) renderer.domElement.addEventListener("pointerdown", stopSpin, { once: true });
    let last = performance.now();
    const tick = (now = performance.now()) => {
      if (!alive) return;
      if (spinning) {
        theta -= ((now - last) / 1000) * 0.22;
        place();
      }
      last = now;
      layout();
      renderer.render(three, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();
    // One rendered frame later the poster is ready to be captured.
    requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove", onTouchMove);
      three.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
        if (o instanceof THREE.LineSegments) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
    // The scene is static for the life of the component; state is read through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, poster]);

  const layersTopFirst = scene.layers.map((l, i) => ({ ...l, i })).reverse();

  return (
    <div className={`grid gap-4 ${poster ? "" : "lg:grid-cols-[1.618fr_1fr]"}`}>
      <div className="relative">
        <div ref={host} id="scene" className="aspect-[4/3] w-full rounded-2xl bg-white" aria-label={scene.caption} role="img" />
        {!poster && (
          <label className="mt-3 flex items-center gap-3 font-manrope text-sm text-[#161925]/75">
            <span className="whitespace-nowrap">Open the layers</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={explode}
              onChange={(e) => setExplode(Number(e.target.value))}
              className="w-full accent-[#406E8E]"
              aria-label="Space between the layers"
            />
          </label>
        )}
      </div>
      {!poster && (
        <ol className="divide-y divide-[#161925]/10 border-y border-[#161925]/10" aria-label="Layers, top to bottom">
          {layersTopFirst.map((l) => (
            <li key={l.i}>
              <button
                type="button"
                onMouseEnter={() => setActive(l.i)}
                onFocus={() => setActive(l.i)}
                onClick={() => setActive(active === l.i ? null : l.i)}
                aria-pressed={active === l.i}
                className={`grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 px-2 py-3 text-left transition-colors ${active === l.i ? "bg-[#F6F8FA]" : "hover:bg-[#F6F8FA]/60"}`}
              >
                <span className="mt-1 h-3.5 w-3.5 shrink-0 rounded-sm border border-[#161925]/20" style={{ background: TONE_HEX[l.tone] }} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-manrope text-sm font-semibold text-[#161925]">{l.name}</span>
                  {l.product ? <span className="block font-manrope text-sm text-[#406E8E]">{l.product}</span> : null}
                  {active === l.i && l.note ? <span className="mt-1 block font-manrope text-sm text-[#161925]/75">{l.note}</span> : null}
                </span>
                <span className="spec-sh whitespace-nowrap text-[#161925]/70">{l.mm < 1 ? `${l.mm * 1000} µm` : `${l.mm} mm`}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

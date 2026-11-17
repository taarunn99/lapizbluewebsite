'use client';

// Prototype. Not wired into any shipping page.
//
// A single product pack rendered as a real 3D object: a bag, a bucket or a
// two component kit, with the product's own pack shot mapped onto the front
// face. Loaded through dynamic(..., { ssr: false }) and only ever mounted
// once the wrapper has seen the element enter the viewport, so none of this
// can touch Largest Contentful Paint.
//
// The render loop runs only while `active` is true. The wrapper sets that
// from an IntersectionObserver, and this component also stops on tab hide,
// so nothing animates off screen.

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type PackForm = 'bag' | 'bucket' | 'kit' | 'jerrycan' | 'bag-and-can';

export interface Pack3DCanvasProps {
  /** Pack shot used as the front face texture. */
  src: string;
  /** Which way the product is sold. */
  form: PackForm;
  /** Accessible name for the canvas. */
  label: string;
  /** False stops the render loop without unmounting. */
  active: boolean;
  /** Fired on the first painted frame so the poster can fade out. */
  onReady?: () => void;
}

// CLAUDE.md palette. Nothing outside this list is used in the scene.
const NAVY = 0x161925;
const DEEP_BLUE = 0x23395b;
const BRAND_BLUE = 0x406e8e;
const LIGHT_BLUE = 0xbfd7ea;
const CREAM = 0xf3dfc1;
const PAPER = 0xf6f8fa;

// How far the pack is turned away from the camera at rest. The poster pose and
// the starting pose of the live view are both this.
const REST_YAW = -0.3;

interface Crop {
  x: number;
  y: number;
  w: number;
  h: number;
  /** How much the far edge of the panel is foreshortened in the pack shot. */
  shear: number;
}

// The supplied pack shots are three quarter renders on white, all from the
// same Grupo Puma template, so one crop per form recovers the front panel.
const CROPS: Record<PackForm, Crop[]> = {
  bag: [{ x: 0.312, y: 0.082, w: 0.418, h: 0.845, shear: 0.26 }],
  bucket: [{ x: 0.155, y: 0.235, w: 0.70, h: 0.545, shear: 0.06 }],
  // Component A pail on the left, component B can on the right.
  kit: [
    { x: 0.095, y: 0.3, w: 0.46, h: 0.44, shear: 0.07 },
    { x: 0.545, y: 0.355, w: 0.255, h: 0.385, shear: 0.05 },
  ],
  // A jerrycan is shot nearly head on and the label is a flat panel stuck to
  // the front face, not a band wrapped round a body, so the crop is the label
  // itself and it comes back square with almost no un shearing to do.
  jerrycan: [{ x: 0.295, y: 0.345, w: 0.41, h: 0.46, shear: 0.02 }],
  // Component A bag on the left, component B can standing in front of it.
  'bag-and-can': [
    { x: 0.295, y: 0.095, w: 0.36, h: 0.835, shear: 0.26 },
    { x: 0.548, y: 0.44, w: 0.275, h: 0.42, shear: 0.05 },
  ],
};

// Where to read the pack's own body colour, so the faces the shot never
// shows are not invented. Inside the pack silhouette in every case.
const BODY_SAMPLES: Record<PackForm, Crop> = {
  bag: { x: 0.34, y: 0.28, w: 0.07, h: 0.16, shear: 0 },
  bucket: { x: 0.22, y: 0.285, w: 0.12, h: 0.055, shear: 0 },
  kit: { x: 0.155, y: 0.2, w: 0.1, h: 0.055, shear: 0 },
  jerrycan: { x: 0.215, y: 0.42, w: 0.05, h: 0.12, shear: 0 },
  'bag-and-can': { x: 0.33, y: 0.12, w: 0.05, h: 0.05, shear: 0 },
};

// The second pack in the forms that carry two. Without this the can would
// take the bag's colour, and a white can would come out the colour of cement.
const COMPANION_SAMPLES: Partial<Record<PackForm, Crop>> = {
  'bag-and-can': { x: 0.7, y: 0.47, w: 0.06, h: 0.05, shear: 0 },
};

// Screw caps are read off the pack like every other colour here. Guessing one
// out of the site palette would state something untrue about the pack.
const CAP_SAMPLES: Partial<Record<PackForm, Crop>> = {
  jerrycan: { x: 0.675, y: 0.085, w: 0.07, h: 0.03, shear: 0 },
  'bag-and-can': { x: 0.725, y: 0.395, w: 0.06, h: 0.025, shear: 0 },
};

/**
 * Cuts the front panel out of a pack shot and undoes the render's
 * foreshortening with a column slice stretch, so the panel reads flat when it
 * is mapped back onto geometry that supplies its own perspective.
 */
function panelCanvas(img: HTMLImageElement, crop: Crop): HTMLCanvasElement {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const sx = iw * crop.x;
  const sy = ih * crop.y;
  const sw = iw * crop.w;
  const sh = ih * crop.h;

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(sw);
  canvas.height = Math.round(sh);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const columns = 72;
  const colW = canvas.width / columns;
  for (let i = 0; i < columns; i += 1) {
    const t = (i + 0.5) / columns;
    // Near edge on the left keeps full height, far edge on the right is
    // compressed in the source, so sample less of it and draw it full height.
    const k = 1 - crop.shear * t;
    const srcH = sh * k;
    const srcY = sy + (sh - srcH) / 2;
    ctx.drawImage(
      img,
      sx + t * sw - colW / 2,
      srcY,
      colW + 1,
      srcH,
      i * colW,
      0,
      colW + 1,
      canvas.height,
    );
  }
  return canvas;
}

/** Reads the pack's own body colour out of a rect inside its silhouette. */
function bodyColour(img: HTMLImageElement, rect: Crop, fallback: number): THREE.Color {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(img.naturalWidth * rect.w));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * rect.h));
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return new THREE.Color(fallback);
  ctx.drawImage(
    img,
    img.naturalWidth * rect.x,
    img.naturalHeight * rect.y,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  } catch {
    return new THREE.Color(fallback);
  }
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let i = 0; i < data.length; i += 4) {
    const pr = data[i];
    const pg = data[i + 1];
    const pb = data[i + 2];
    // Drop the shot's paper background and any printed black.
    if (Math.max(pr, pg, pb) > 251 || Math.max(pr, pg, pb) < 26) continue;
    r += pr;
    g += pg;
    b += pb;
    n += 1;
  }
  if (n < 16) return new THREE.Color(fallback);
  return new THREE.Color(r / n / 255, g / n / 255, b / n / 255).convertSRGBToLinear();
}

/** Width over height of a recovered panel, so geometry can match its print. */
function panelAspect(canvas: HTMLCanvasElement): number {
  if (canvas.height < 1) return 0.78;
  return canvas.width / canvas.height;
}

function texFromCanvas(canvas: HTMLCanvasElement, maxAniso: number): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAniso;
  tex.needsUpdate = true;
  return tex;
}

/** Soft contact shadow. A gradient sprite is far cheaper than a shadow map. */
function groundTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
    grad.addColorStop(0, 'rgba(22, 25, 37, 0.42)');
    grad.addColorStop(0.45, 'rgba(35, 57, 91, 0.2)');
    grad.addColorStop(1, 'rgba(35, 57, 91, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Pillow deformation: sealed flat at the seams, full in the middle. */
function pillow(geo: THREE.BufferGeometry, w: number, h: number, d: number, amount: number) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const hw = w / 2;
  const hh = h / 2;
  const hd = d / 2;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const ty = Math.min(1, Math.abs(y) / hh);
    const tx = Math.min(1, Math.abs(x) / hw);
    const seam = Math.pow(ty, 5);
    const flat = 1 - 0.82 * seam;
    const bulge = (1 - ty * ty) * (1 - tx * tx * 0.85) * amount;
    const nz = z * flat + Math.sign(z) * bulge * (Math.abs(z) / hd);
    pos.setXYZ(i, x * (1 - 0.05 * seam), y, nz);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

function bagMesh(tex: THREE.Texture, body: THREE.Color, aspect: number): THREE.Object3D {
  const h = 2.05;
  // The front face has to carry the recovered panel at the panel's own aspect
  // ratio. A fixed width printed the brand name about 1.7 times too wide on
  // every bag, which is the one thing a pack image cannot get wrong.
  const w = h * THREE.MathUtils.clamp(aspect, 0.4, 0.95);
  // A filled cement bag is roughly this much deeper than it is thick on the
  // printed face. Tied to the width so the proportion holds at any aspect.
  const d = w * 0.42;
  const geo = new THREE.BoxGeometry(w, h, d, 10, 18, 6);
  pillow(geo, w, h, d, d * 0.25);

  const side = new THREE.MeshStandardMaterial({
    color: body.clone().multiplyScalar(0.92),
    roughness: 0.88,
    metalness: 0,
  });
  const front = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.82, metalness: 0 });
  const back = new THREE.MeshStandardMaterial({
    color: body.clone().multiplyScalar(0.8),
    roughness: 0.9,
    metalness: 0,
  });
  // Box material order: +x, -x, +y, -y, +z, -z.
  return new THREE.Mesh(geo, [side, side, side, side, front, back]);
}

function bucketMesh(tex: THREE.Texture, body: THREE.Color, scale: number): THREE.Group {
  const g = new THREE.Group();
  const rTop = 0.95;
  const rBottom = 0.78;
  const h = 1.5;

  const plastic = new THREE.MeshStandardMaterial({
    color: body.clone().multiplyScalar(0.95),
    roughness: 0.42,
    metalness: 0.02,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(PAPER),
    roughness: 0.38,
    metalness: 0.02,
  });
  const steel = new THREE.MeshStandardMaterial({
    color: new THREE.Color(LIGHT_BLUE),
    roughness: 0.3,
    metalness: 0.55,
  });

  const body3d = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, 56, 1), plastic);
  g.add(body3d);

  // Label band wrapped round the front of the pail. The whole pack is turned
  // by REST_YAW, so the band is turned back by the same amount: otherwise the
  // start of the brand name disappears round the left of the pail and the
  // poster reads as a sliced word.
  // The pack shot flattens the label across the whole face of the pail, so it
  // has to come back onto an arc the camera can still read. Wider than this
  // and the end of the brand name is already curving away from the viewer.
  const arc = 2.16;
  const bandH = h * 0.84;
  const bandY = -h * 0.03;
  // The band is shorter than the pail, so its own radii have to be read off
  // the pail's taper at the heights the band actually sits at. Taking the
  // pail's full height radii sank the bottom of the band inside the body and
  // the body's facets tore through it as a sawtooth along the label's foot.
  const radiusAt = (y: number) => rBottom + ((y + h / 2) / h) * (rTop - rBottom);
  const clear = 1.006;
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(
      radiusAt(bandY + bandH / 2) * clear,
      radiusAt(bandY - bandH / 2) * clear,
      bandH,
      64,
      1,
      true,
      -arc / 2,
      arc,
    ),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4, metalness: 0, side: THREE.DoubleSide }),
  );
  band.position.y = bandY;
  band.rotation.y = -REST_YAW;
  g.add(band);

  const lid = new THREE.Mesh(new THREE.CylinderGeometry(rTop * 1.03, rTop * 1.0, 0.11, 56), lidMat);
  lid.position.y = h / 2 + 0.03;
  g.add(lid);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(rTop * 1.02, 0.035, 8, 48), lidMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = h / 2 + 0.08;
  g.add(rim);

  const handle = new THREE.Mesh(new THREE.TorusGeometry(rTop * 1.03, 0.022, 6, 28, Math.PI), steel);
  handle.position.y = h / 2 + 0.02;
  handle.position.z = 0.02;
  g.add(handle);

  g.scale.setScalar(scale);
  return g;
}

function canMesh(tex: THREE.Texture, body: THREE.Color, cap?: THREE.Color): THREE.Group {
  const g = new THREE.Group();
  const w = 0.66;
  const h = 1.12;
  const d = 0.52;
  const geo = new THREE.BoxGeometry(w, h, d, 8, 10, 6);
  pillow(geo, w, h, d, 0.05);

  const shell = new THREE.MeshStandardMaterial({
    color: body.clone().lerp(new THREE.Color(PAPER), 0.55),
    roughness: 0.35,
    metalness: 0.02,
  });
  const front = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.36, metalness: 0 });
  g.add(new THREE.Mesh(geo, [shell, shell, shell, shell, front, shell]));

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.14, 20), shell);
  neck.position.set(w * 0.22, h / 2 + 0.06, 0);
  g.add(neck);

  const capMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.135, 0.135, 0.12, 20),
    new THREE.MeshStandardMaterial({
      color: cap ? cap.clone() : new THREE.Color(PAPER),
      roughness: 0.3,
      metalness: 0.02,
    }),
  );
  capMesh.position.set(w * 0.22, h / 2 + 0.18, 0);
  g.add(capMesh);

  return g;
}

/**
 * Pushes a box's walls out onto a superellipse, which rounds its four upright
 * edges. A moulded plastic pack has no sharp corners, and a box that keeps
 * them reads as a crate rather than a container.
 */
function roundUprightEdges(geo: THREE.BufferGeometry, w: number, d: number, power: number) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const hw = w / 2;
  const hd = d / 2;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const ax = Math.abs(x) / hw;
    const az = Math.abs(z) / hd;
    if (ax < 1e-6 && az < 1e-6) continue;
    const r = Math.pow(Math.pow(ax, power) + Math.pow(az, power), -1 / power);
    // Full effect on the walls, none at the middle of the top and bottom.
    const scale = 1 + (r - 1) * Math.max(ax, az);
    pos.setXYZ(i, x * scale, pos.getY(i), z * scale);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

/** Pulls the top of a box in, so a straight sided pack reads a moulded top. */
function taperTop(geo: THREE.BufferGeometry, h: number, kx: number, kz: number) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i += 1) {
    const y = pos.getY(i);
    const t = Math.min(1, Math.max(0, (y + h / 2) / h));
    pos.setXYZ(i, pos.getX(i) * (1 - (1 - kx) * t), y, pos.getZ(i) * (1 - (1 - kz) * t));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

/**
 * A 10 kg jerrycan: straight sided body, a moulded shoulder pulled in at the
 * top, an offset neck and screw cap, and a grab handle bridging the shoulder.
 * The label is a flat panel on the front face, carried at the proportion it
 * has on the real pack, so a square colour code stays square.
 */
function jerrycanMesh(tex: THREE.Texture, body: THREE.Color, cap: THREE.Color): THREE.Group {
  const g = new THREE.Group();
  // Read off the pack shot: the body is this much wider than it is deep, and
  // the shoulder takes the top sixth of the pack's height.
  const w = 1.4;
  const d = 0.73;
  const hShoulder = 0.38;
  const hBody = 1.57;
  const hTotal = hBody + hShoulder;

  const plastic = new THREE.MeshStandardMaterial({
    color: body.clone(),
    roughness: 0.45,
    metalness: 0.02,
  });

  const shellGeo = new THREE.BoxGeometry(w, hBody, d, 14, 6, 14);
  roundUprightEdges(shellGeo, w, d, 5);
  const shell = new THREE.Mesh(shellGeo, plastic);
  shell.position.y = -hShoulder / 2;
  g.add(shell);

  const shoulderGeo = new THREE.BoxGeometry(w, hShoulder, d, 14, 4, 14);
  roundUprightEdges(shoulderGeo, w, d, 5);
  taperTop(shoulderGeo, hShoulder, 0.8, 0.62);
  const shoulder = new THREE.Mesh(shoulderGeo, plastic);
  shoulder.position.y = hBody / 2;
  g.add(shoulder);

  const topY = hTotal / 2;

  // Neck and cap sit off to one side of the shoulder, the way they do on the
  // pack, which is what stops this reading as a plain box.
  const neckX = w * 0.36;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.15, 0.12, 20), plastic);
  neck.position.set(neckX, topY + 0.03, 0);
  g.add(neck);

  const capMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.158, 0.158, 0.16, 22),
    new THREE.MeshStandardMaterial({ color: cap.clone(), roughness: 0.34, metalness: 0.02 }),
  );
  capMesh.position.set(neckX, topY + 0.16, 0);
  g.add(capMesh);

  // Moulded grab handle, set over the other side of the shoulder from the
  // neck: two short posts carrying a grip bar, with daylight under the bar.
  // Without that gap the handle reads as a slab stuck on the lid.
  const handleX = -w * 0.11;
  const gripW = 0.56;
  const postW = 0.09;
  const postH = 0.21;
  [-1, 1].forEach((side) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(postW, postH, 0.2), plastic);
    post.position.set(handleX + (side * (gripW - postW)) / 2, topY + postH / 2 - 0.02, 0);
    g.add(post);
  });
  const grip = new THREE.Mesh(new THREE.BoxGeometry(gripW, 0.08, 0.2), plastic);
  grip.position.set(handleX, topY + postH + 0.02, 0);
  g.add(grip);

  // The label, at the size and the place it has on the pack.
  const labelW = w * 0.66;
  const labelH = hTotal * 0.535;
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(labelW, labelH),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.42, metalness: 0 }),
  );
  label.position.set(0, -hTotal * 0.087, d / 2 + 0.006);
  g.add(label);

  return g;
}

export function Pack3DCanvas({ src, form, label, active, onReady }: Pack3DCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(active);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;
  const startRef = useRef<(() => void) | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
    if (active) startRef.current?.();
    else stopRef.current?.();
  }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    const cleanups: Array<() => void> = [];

    const img = new Image();
    img.decoding = 'async';
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 60);
      camera.position.set(0, 0.4, 6.8);
      camera.lookAt(0, 0.02, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.setAttribute('role', 'img');
      renderer.domElement.setAttribute('aria-label', label);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.touchAction = 'pan-y';
      renderer.domElement.style.cursor = 'grab';
      renderer.domElement.tabIndex = 0;
      host.appendChild(renderer.domElement);

      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const crops = CROPS[form];
      const canvases = crops.map((crop) => panelCanvas(img, crop));
      const textures = canvases.map((canvas) => texFromCanvas(canvas, maxAniso));
      const body = bodyColour(img, BODY_SAMPLES[form], BRAND_BLUE);
      const companionSample = COMPANION_SAMPLES[form];
      const companion = companionSample ? bodyColour(img, companionSample, PAPER) : body;
      const capSample = CAP_SAMPLES[form];
      const cap = capSample ? bodyColour(img, capSample, PAPER) : undefined;

      // Editorial light rather than a showroom rig: cream key from the upper
      // right the way the site's photography is lit, light blue sky bounce,
      // brand blue rim to separate the pack from the paper ground.
      scene.add(new THREE.HemisphereLight(LIGHT_BLUE, PAPER, 1.35));
      scene.add(new THREE.AmbientLight(PAPER, 0.3));
      const key = new THREE.DirectionalLight(CREAM, 2.1);
      key.position.set(3.2, 4.4, 3.6);
      scene.add(key);
      const fill = new THREE.DirectionalLight(LIGHT_BLUE, 0.7);
      fill.position.set(-3.4, 1.2, 2.2);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(BRAND_BLUE, 1.1);
      rim.position.set(-1.6, 1.8, -3.4);
      scene.add(rim);

      const pivot = new THREE.Group();
      scene.add(pivot);

      if (form === 'bag') {
        pivot.add(bagMesh(textures[0], body, panelAspect(canvases[0])));
      } else if (form === 'bucket') {
        pivot.add(bucketMesh(textures[0], body, 1));
      } else if (form === 'jerrycan') {
        pivot.add(jerrycanMesh(textures[0], body, cap ?? new THREE.Color(PAPER)));
      } else if (form === 'bag-and-can') {
        // The pack shot stands the can in front of the bag's lower right.
        // The composition here is the same, which is also the only honest
        // way to use that shot: the part of the bag the can covers in the
        // photograph is not in the photograph to recover.
        const bag = bagMesh(textures[0], body, panelAspect(canvases[0]));
        bag.position.x = -0.26;
        pivot.add(bag);
        const can = canMesh(textures[1], companion, cap);
        can.scale.setScalar(1.18);
        can.position.set(0.42, -0.46, 0.52);
        pivot.add(can);
      } else {
        const pail = bucketMesh(textures[0], body, 0.86);
        pail.position.x = -0.5;
        pivot.add(pail);
        const can = canMesh(textures[1], body);
        can.position.set(0.82, -0.3, 0.22);
        pivot.add(can);
      }

      // Sit the pack on the ground and centre it in frame.
      const box = new THREE.Box3().setFromObject(pivot);
      const size = new THREE.Vector3();
      const centre = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(centre);
      pivot.children.forEach((child) => {
        child.position.x -= centre.x;
        child.position.y -= centre.y;
        child.position.z -= centre.z;
      });
      // Every pack fills the same share of the frame on its longest axis, so a
      // narrow bag and a wide kit read as the same size of photograph.
      const fit = 2.45 / Math.max(size.y, size.x);
      pivot.scale.setScalar(fit);

      const groundY = (-size.y / 2) * fit - 0.02;
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(5.2, 5.2),
        new THREE.MeshBasicMaterial({
          map: groundTexture(),
          transparent: true,
          depthWrite: false,
        }),
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = groundY;
      ground.scale.set(size.x * fit * 0.37, size.z * fit * 0.45, 1);
      scene.add(ground);

      pivot.position.y = 0.12;
      pivot.rotation.y = REST_YAW;
      pivot.rotation.x = 0.03;

      // Interaction. Drag to turn, release and it carries, then the slow
      // idle rotation picks back up.
      let velocity = 0;
      let idleFor = 0;
      let dragging = false;
      let lastX = 0;
      let pointerId = -1;
      const el = renderer.domElement;

      const onDown = (e: PointerEvent) => {
        dragging = true;
        pointerId = e.pointerId;
        lastX = e.clientX;
        idleFor = 0;
        velocity = 0;
        el.setPointerCapture(pointerId);
        el.style.cursor = 'grabbing';
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging || e.pointerId !== pointerId) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        const delta = dx * 0.0085;
        pivot.rotation.y += delta;
        velocity = delta * 52;
        idleFor = 0;
      };
      const onUp = (e: PointerEvent) => {
        if (e.pointerId !== pointerId) return;
        dragging = false;
        el.style.cursor = 'grab';
        try {
          el.releasePointerCapture(pointerId);
        } catch {
          // pointer already gone
        }
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        pivot.rotation.y += e.key === 'ArrowRight' ? 0.22 : -0.22;
        idleFor = 0;
      };
      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
      el.addEventListener('keydown', onKey);
      cleanups.push(() => {
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
        el.removeEventListener('keydown', onKey);
      });

      const resize = () => {
        if (!renderer) return;
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      // Set by the poster script so every poster is captured in one pose.
      const frozen = (window as unknown as { __pack3dPoster?: boolean }).__pack3dPoster === true;
      let announced = false;
      let last = 0;
      const frame = (now: number) => {
        if (!renderer || disposed) return;
        raf = requestAnimationFrame(frame);
        const dt = last === 0 ? 0.016 : Math.min(0.05, (now - last) / 1000);
        last = now;

        if (!dragging && !frozen) {
          velocity *= Math.pow(0.004, dt);
          if (Math.abs(velocity) < 0.002) velocity = 0;
          idleFor += dt;
          const idleSpeed = 0.28 * Math.min(1, Math.max(0, idleFor - 0.9));
          pivot.rotation.y += (velocity + idleSpeed) * dt;
        }

        renderer.render(scene, camera);
        if (!announced) {
          announced = true;
          readyRef.current?.();
        }
      };

      const start = () => {
        if (disposed || raf !== 0 || document.hidden) return;
        last = 0;
        raf = requestAnimationFrame(frame);
      };
      const stop = () => {
        if (raf !== 0) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };
      startRef.current = start;
      stopRef.current = stop;

      const onVisibility = () => {
        if (document.hidden) stop();
        else if (activeRef.current) start();
      };
      document.addEventListener('visibilitychange', onVisibility);
      cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));

      if (activeRef.current) start();

      cleanups.push(() => {
        stop();
        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            const standard = mat as THREE.MeshStandardMaterial;
            standard.map?.dispose();
            standard.dispose();
          });
        });
        textures.forEach((tex) => tex.dispose());
      });
    };

    img.src = src;

    return () => {
      disposed = true;
      startRef.current = null;
      stopRef.current = null;
      if (raf !== 0) cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      cleanups.forEach((fn) => fn());
      if (renderer) {
        renderer.domElement.remove();
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
    // src, form and label are fixed per instance on a product page.
  }, [src, form, label]);

  return <div ref={hostRef} className="absolute inset-0" />;
}

export default Pack3DCanvas;

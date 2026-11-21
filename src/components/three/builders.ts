import * as THREE from "three";
import { TONE_HEX, type SceneDef, type SceneLayer } from "@/data/scenes";

/**
 * Geometry per scene kind, so a concrete repair looks like a column with a
 * breakout, a roof looks like a roof, a grout joint looks like a joint. Each
 * builder returns one Group per layer, in layer order, each carrying
 * `userData.index` and a hidden pick mesh for the raycaster. The renderer owns
 * lights, camera, explode spacing and highlight; builders only own shape.
 */

export const WIDTH = 10;
export const DEPTH = 7;
export const RETURN = 5.5;

export interface Built {
  groups: THREE.Group[];
  /** How the explode slider moves a layer: a vector per layer, scaled by the slider. */
  explode: THREE.Vector3[];
  /** Where the camera looks. */
  target: THREE.Vector3;
  /** Rough bounding size for framing. */
  span: number;
  /** Starting orbit angles for the poster frame. */
  theta: number;
  phi: number;
}

export const mat = (tone: SceneLayer["tone"], extra: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
  new THREE.MeshStandardMaterial({ color: new THREE.Color(TONE_HEX[tone]), roughness: 0.85, metalness: 0.02, ...extra });

const edges = (geom: THREE.BufferGeometry, opacity = 0.32) =>
  new THREE.LineSegments(new THREE.EdgesGeometry(geom, 20), new THREE.LineBasicMaterial({ color: 0x161925, transparent: true, opacity }));

function box(w: number, h: number, d: number, m: THREE.Material, withEdges = true): THREE.Group {
  const g = new THREE.Group();
  const geom = new THREE.BoxGeometry(w, h, d);
  g.add(new THREE.Mesh(geom, m));
  if (withEdges) g.add(edges(geom));
  return g;
}

/** Place an object and hand it back, for one line adds. */
function at<T extends THREE.Object3D>(o: T, x: number, y: number, z: number): T {
  o.position.set(x, y, z);
  return o;
}

function pickBox(w: number, h: number, d: number, index: number): THREE.Mesh {
  const p = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ visible: false }));
  p.userData.index = index;
  return p;
}

export function heightFor(mm: number, sheet?: boolean): number {
  if (sheet) return 0.16;
  return Math.max(0.28, Math.min(2.4, 0.3 * Math.log2(mm + 1)));
}

/** A grid of tiles with joints, the joint fill in the grout tone when one follows. */
function tiledSlab(w: number, h: number, d: number, tile: SceneLayer, grout?: SceneLayer): THREE.Group {
  const g = new THREE.Group();
  const cols = 4, rows = 3, joint = 0.12;
  const tw = (w - joint * (cols - 1)) / cols;
  const td = (d - joint * (rows - 1)) / rows;
  const m = mat(tile.tone);
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(tw, h, td), m);
    t.position.set(-w / 2 + tw / 2 + c * (tw + joint), 0, -d / 2 + td / 2 + r * (td + joint));
    g.add(t);
  }
  if (grout) {
    const gm = new THREE.Mesh(new THREE.BoxGeometry(w - 0.04, h * 0.7, d - 0.04), mat(grout.tone, { roughness: 0.9 }));
    gm.position.y = -h * 0.14;
    g.add(gm);
  }
  return g;
}

/* ------------------------------------------------------------------ stack, wall, shell, apron */
export function buildStack(scene: SceneDef): Built {
  const kind = scene.kind ?? "stack";
  const hs = scene.layers.map((l) => heightFor(l.mm, l.sheet));
  const before = hs.map((_, i) => hs.slice(0, i).reduce((a, b) => a + b, 0));
  const total = hs.reduce((a, b) => a + b, 0);
  const topH = hs[hs.length - 1];
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  let y = -total / 2;
  scene.layers.forEach((layer, i) => {
    const h = hs[i];
    const d = kind === "shell" ? DEPTH - before[i] - h : kind === "apron" && i < hs.length - 1 ? DEPTH - topH : DEPTH;
    const zc = kind === "shell" ? (before[i] + h) / 2 : kind === "apron" && i < hs.length - 1 ? -topH / 2 : 0;
    const g = new THREE.Group();
    const grout = scene.layers[i + 1];
    const merged = /grout/i.test(layer.name) && scene.layers[i - 1]?.tiled;
    if (!merged) {
      const body = layer.tiled ? tiledSlab(WIDTH, h, d, layer, grout && /grout/i.test(grout.name) ? grout : undefined) : box(WIDTH, h, d, mat(layer.tone));
      body.position.z = zc;
      g.add(body);
      if (kind === "shell" || (kind === "apron" && i === hs.length - 1)) {
        const ret = box(WIDTH, RETURN, h, mat(layer.tone));
        if (kind === "shell") ret.position.set(0, h / 2 + RETURN / 2, -DEPTH / 2 + before[i] + h / 2);
        else ret.position.set(0, -RETURN / 2 - h / 2, DEPTH / 2 - h / 2);
        g.add(ret);
      }
      const pick = pickBox(WIDTH, h, d, i);
      pick.position.z = zc;
      g.add(pick);
    }
    g.visible = !merged;
    g.userData.index = i;
    g.position.y = y + h / 2;
    y += h;
    groups.push(g);
    explode.push(new THREE.Vector3(0, i, 0));
  });
  const built: Built = {
    groups,
    explode,
    target: new THREE.Vector3(0, kind === "shell" ? RETURN / 2 : kind === "apron" ? -RETURN / 2 : 0, 0),
    span: Math.max(WIDTH, total + (kind === "stack" ? 0 : RETURN)),
    theta: -0.62,
    phi: 0.46,
  };
  if (kind === "wall") {
    // Stand it on its side: first layer at the back, finishes toward the viewer.
    for (const g of groups) {
      const py = g.position.y;
      g.position.set(0, 0, py);
      g.rotation.x = Math.PI / 2;
    }
    built.explode = groups.map((_, i) => new THREE.Vector3(0, 0, i));
    built.theta = -0.5;
    built.phi = 0.3;
  }
  return built;
}

/* ------------------------------------------------------------------ column: a concrete repair */
export function buildColumn(scene: SceneDef): Built {
  // Layers expected in order: sound concrete, bar primer / bonding, repair mortar, fairing coat, protective coating.
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  const R = 2.2, H = 9;
  const [concrete, bond, mortar, fairing, coating] = scene.layers;
  // 0 concrete column with a breakout on the front face
  {
    const g = new THREE.Group();
    const col = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 48, 1), mat(concrete.tone));
    g.add(col);
    // the breakout: a darker pocket carved as a box intersecting the front
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.4, 1.6), new THREE.MeshStandardMaterial({ color: 0x0d1019, roughness: 1 }));
    pocket.position.set(0, 1.6, R - 0.5);
    g.add(pocket);
    // exposed reinforcement: three vertical bars and two links
    const barMat = new THREE.MeshStandardMaterial({ color: 0x406e8e, roughness: 0.5, metalness: 0.6 });
    for (const x of [-0.8, 0, 0.8]) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 2.6, 12), barMat);
      bar.position.set(x, 1.6, R - 0.35);
      g.add(bar);
    }
    for (const yy of [0.8, 2.3]) {
      const link = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.06, 8, 40), barMat);
      link.rotation.x = Math.PI / 2;
      link.position.set(0, yy, R - 0.35);
      link.scale.set(1, 1, 0.35);
      g.add(link);
    }
    g.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 24), new THREE.MeshBasicMaterial({ visible: false })), { userData: { index: 0 } }));
    g.userData.index = 0;
    groups.push(g); explode.push(new THREE.Vector3(0, 0, 0));
  }
  // 1 bonding slurry on the pocket faces (thin shell at the back of the pocket)
  if (bond) {
    const g = new THREE.Group();
    const sl = box(2.6, 2.4, 0.08, mat(bond.tone), false);
    sl.position.set(0, 1.6, R - 1.26);
    g.add(sl);
    g.add(at(pickBox(2.6, 2.4, 0.3, 1), 0, 1.6, R - 1.2));
    g.userData.index = 1;
    groups.push(g); explode.push(new THREE.Vector3(0, 0, 1.2));
  }
  // 2 repair mortar filling the pocket flush
  if (mortar) {
    const g = new THREE.Group();
    const m = box(2.56, 2.36, 1.2, mat(mortar.tone));
    m.position.set(0, 1.6, R - 0.8);
    g.add(m);
    g.add(at(pickBox(2.56, 2.36, 1.2, 2), 0, 1.6, R - 0.8));
    g.userData.index = 2;
    groups.push(g); explode.push(new THREE.Vector3(0, 0, 4.5));
  }
  // 3 fairing coat as a thin patch over the repair
  if (fairing) {
    const g = new THREE.Group();
    const f = box(3.0, 2.8, 0.1, mat(fairing.tone), false);
    f.position.set(0, 1.6, R - 0.15);
    g.add(f);
    g.add(at(pickBox(3.0, 2.8, 0.3, 3), 0, 1.6, R - 0.15));
    g.userData.index = 3;
    groups.push(g); explode.push(new THREE.Vector3(0, 0, 7));
  }
  // 4 protective coating: a sleeve already applied on the lower half of the column, the repair above it still open
  if (coating) {
    const g = new THREE.Group();
    const SH = H * 0.42;
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.07, R + 0.07, SH, 48, 1, true), mat(coating.tone, { transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
    sleeve.position.y = -H / 2 + SH / 2;
    g.add(sleeve);
    const lip = new THREE.Mesh(new THREE.TorusGeometry(R + 0.07, 0.04, 8, 64), mat(coating.tone));
    lip.rotation.x = Math.PI / 2; lip.position.y = -H / 2 + SH; g.add(lip);
    const pick = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.1, R + 0.1, SH, 24, 1, true), new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }));
    pick.userData.index = 4; pick.position.y = -H / 2 + SH / 2; g.add(pick);
    g.userData.index = 4;
    groups.push(g); explode.push(new THREE.Vector3(0, -1.2, 0));
  }
  return { groups, explode, target: new THREE.Vector3(0, 0.6, 0), span: H + 2, theta: 0.35, phi: 0.2 };
}

/* ------------------------------------------------------------------ roof: slab, parapet, membrane */
export function buildRoof(scene: SceneDef): Built {
  // Layers: slab, screed to falls, primer, membrane first coat, membrane second coat (optional), protection / finish (optional).
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  const W = WIDTH, D = DEPTH, P = 2.4, PT = 0.5;
  let y = 0;
  scene.layers.forEach((layer, i) => {
    const h = i === 0 ? 1.6 : heightFor(layer.mm, layer.sheet);
    const g = new THREE.Group();
    if (i === 0) {
      // the slab with a parapet on two sides
      g.add(box(W, h, D, mat(layer.tone)));
      const back = box(W, P, PT, mat(layer.tone)); back.position.set(0, h / 2 + P / 2, -D / 2 + PT / 2); g.add(back);
      const side = box(PT, P, D, mat(layer.tone)); side.position.set(-W / 2 + PT / 2, h / 2 + P / 2, 0); g.add(side);
      g.add(pickBox(W, h, D, 0));
    } else {
      // every later layer covers the roof inside the parapet and runs up the two parapet faces
      const inset = PT + 0.02 * i;
      const w = W - inset, d = D - inset;
      const slab = box(w, h, d, mat(layer.tone), !layer.sheet);
      slab.position.set(inset / 2, 0, inset / 2);
      g.add(slab);
      if (/membrane|coat|protection/i.test(layer.name)) {
        const up = P * 0.85;
        const backUp = box(w, up, h, mat(layer.tone), false); backUp.position.set(inset / 2, up / 2, -D / 2 + inset + h / 2 - 0.0); g.add(backUp);
        const sideUp = box(h, up, d, mat(layer.tone), false); sideUp.position.set(-W / 2 + inset + h / 2, up / 2, inset / 2); g.add(sideUp);
      }
      const pick = pickBox(w, h, d, i); pick.position.set(inset / 2, 0, inset / 2); g.add(pick);
    }
    g.userData.index = i;
    g.position.y = y + h / 2;
    y += h;
    groups.push(g);
    explode.push(new THREE.Vector3(0, i, 0));
  });
  // the drain
  const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.2, 24), new THREE.MeshStandardMaterial({ color: 0x161925, roughness: 0.6, metalness: 0.4 }));
  drain.position.set(W / 2 - 1.6, y + 0.1, D / 2 - 1.4);
  groups[groups.length - 1].add(drain);
  return { groups, explode, target: new THREE.Vector3(0, 1.2, 0), span: W + 2, theta: 0.55, phi: 0.5 };
}

/* ------------------------------------------------------------------ joint: grout in a tile joint, close up */
export function buildJoint(scene: SceneDef): Built {
  // Layers: screed, adhesive, tile, grout.
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  const J = 0.9;
  let y = 0;
  scene.layers.forEach((layer, i) => {
    const h = i === 0 ? 1.2 : /tile/i.test(layer.name) ? 1.1 : /grout/i.test(layer.name) ? 1.0 : 0.5;
    const g = new THREE.Group();
    if (/tile/i.test(layer.name)) {
      // two large tiles with a wide joint between them
      const tw = (WIDTH - J) / 2;
      for (const sx of [-1, 1]) {
        const t = box(tw, h, DEPTH, mat(layer.tone));
        t.position.x = sx * (tw / 2 + J / 2);
        g.add(t);
      }
    } else if (/grout/i.test(layer.name)) {
      // the grout filling the joint for most of its length, the last part still open
      const fill = box(J, h * 0.95, DEPTH * 0.72, mat(layer.tone, { roughness: 0.95 }), false);
      fill.position.set(0, -h * 0.02, -DEPTH * 0.14);
      g.add(fill);
      // a float resting on the tile, the way the joint gets filled
      const float = box(2.4, 0.18, 1.3, new THREE.MeshStandardMaterial({ color: 0x23395b, roughness: 0.7 }), false);
      float.position.set(2.2, 0.6, DEPTH * 0.32); float.rotation.y = -0.4; g.add(float);
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.4, 12), new THREE.MeshStandardMaterial({ color: 0xf3dfc1, roughness: 0.8 }));
      handle.position.set(2.2, 1.0, DEPTH * 0.32); handle.rotation.z = Math.PI / 2; handle.rotation.y = -0.4; g.add(handle);
      g.add(at(pickBox(J + 0.4, h, DEPTH, i), 0, 0, 0));
      g.userData.index = i;
      g.position.y = y - h / 2; // sits inside the tile layer
      groups.push(g); explode.push(new THREE.Vector3(0, i * 0.6, 0));
      return;
    } else {
      g.add(box(WIDTH, h, DEPTH, mat(layer.tone), !layer.sheet));
    }
    g.add(pickBox(WIDTH, h, DEPTH, i));
    g.userData.index = i;
    g.position.y = y + h / 2;
    y += h;
    groups.push(g); explode.push(new THREE.Vector3(0, i, 0));
  });
  return { groups, explode, target: new THREE.Vector3(0, 1, 0), span: WIDTH * 0.9, theta: -0.35, phi: 0.62 };
}

/* ------------------------------------------------------------------ profile: a tile edge with an L profile */
export function buildProfile(scene: SceneDef): Built {
  // Layers: screed, adhesive, flange (sheet), tile, profile edge.
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  let y = 0;
  const TILE_W = WIDTH * 0.62;
  scene.layers.forEach((layer, i) => {
    const h = /profile edge/i.test(layer.name) ? 1.15 : heightFor(layer.mm, layer.sheet);
    const g = new THREE.Group();
    if (/flange/i.test(layer.name)) {
      const fl = box(2.6, 0.08, DEPTH, mat(layer.tone), false); fl.position.x = -WIDTH / 2 + TILE_W + 0.2; g.add(fl);
      // perforations
      for (let k = -2; k <= 2; k++) {
        const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.1, 12), new THREE.MeshStandardMaterial({ color: 0x161925 }));
        hole.position.set(-WIDTH / 2 + TILE_W + 0.9, 0.0, k * 1.3); g.add(hole);
      }
      g.add(at(pickBox(2.6, 0.3, DEPTH, i), -WIDTH / 2 + TILE_W + 0.2, 0, 0));
    } else if (/tile/i.test(layer.name)) {
      const t = box(TILE_W, h, DEPTH, mat(layer.tone)); t.position.x = -WIDTH / 2 + TILE_W / 2; g.add(t);
      g.add(at(pickBox(TILE_W, h, DEPTH, i), -WIDTH / 2 + TILE_W / 2, 0, 0));
    } else if (/profile edge/i.test(layer.name)) {
      // an L section: the vertical face at the tile edge, the flange was the layer before
      const shape = new THREE.Shape();
      shape.moveTo(0, 0); shape.lineTo(0.35, 0); shape.lineTo(0.35, h); shape.lineTo(0.0, h); shape.lineTo(0, 0);
      const geom = new THREE.ExtrudeGeometry(shape, { depth: DEPTH, bevelEnabled: false });
      const m = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: new THREE.Color(TONE_HEX[layer.tone]), roughness: 0.35, metalness: 0.65 }));
      m.position.set(-WIDTH / 2 + TILE_W, -h / 2, -DEPTH / 2);
      g.add(m); g.add(at(edges(geom), m.position.x, m.position.y, m.position.z));
      g.add(at(pickBox(0.5, h, DEPTH, i), -WIDTH / 2 + TILE_W + 0.17, 0, 0));
    } else {
      g.add(box(WIDTH, h, DEPTH, mat(layer.tone), !layer.sheet));
      g.add(pickBox(WIDTH, h, DEPTH, i));
    }
    g.userData.index = i;
    if (/profile edge/i.test(layer.name)) g.position.y = y - heightFor(scene.layers[i - 1]?.mm ?? 10) / 2 + h / 2 - 0.0;
    else { g.position.y = y + h / 2; y += h; }
    groups.push(g); explode.push(new THREE.Vector3(/profile edge/i.test(layer.name) ? 0.5 : 0, /profile edge/i.test(layer.name) ? 0.4 : i * 0.6, 0));
  });
  return { groups, explode, target: new THREE.Vector3(-0.5, 1, 0), span: WIDTH * 0.9, theta: 0.5, phi: 0.45 };
}

/* ------------------------------------------------------------------ sealant: two blocks, a rod, a bead */
export function buildSealant(scene: SceneDef): Built {
  // Layers: concrete both faces, backer rod, primer (sheet), sealant.
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  const GAP = 1.1, H = 3.2, BW = (WIDTH - GAP) / 2;
  scene.layers.forEach((layer, i) => {
    const g = new THREE.Group();
    if (/concrete/i.test(layer.name)) {
      for (const sx of [-1, 1]) { const b = box(BW, H, DEPTH, mat(layer.tone)); b.position.x = sx * (BW / 2 + GAP / 2); g.add(b); }
      g.add(pickBox(WIDTH, H, DEPTH, i));
    } else if (/rod/i.test(layer.name)) {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(GAP * 0.5, GAP * 0.5, DEPTH, 24), mat(layer.tone, { roughness: 1 }));
      rod.rotation.x = Math.PI / 2; rod.position.y = H / 2 - 1.5; g.add(rod);
      g.add(at(pickBox(GAP, GAP, DEPTH, i), 0, H / 2 - 1.5, 0));
    } else if (/primer/i.test(layer.name)) {
      for (const sx of [-1, 1]) { const p = box(0.06, 1.1, DEPTH, mat(layer.tone), false); p.position.set(sx * (GAP / 2 - 0.03), H / 2 - 0.55, 0); g.add(p); }
      g.add(at(pickBox(GAP, 1.1, DEPTH, i), 0, H / 2 - 0.55, 0));
    } else {
      // the bead, tooled flush: a box the width of the joint, slightly below the arris
      const bead = box(GAP - 0.02, 0.6, DEPTH, mat(layer.tone, { roughness: 0.5 }), false);
      bead.position.y = H / 2 - 0.42; g.add(bead);
      g.add(at(pickBox(GAP, 0.6, DEPTH, i), 0, H / 2 - 0.42, 0));
    }
    g.userData.index = i;
    groups.push(g); explode.push(new THREE.Vector3(0, /concrete|rod/i.test(layer.name) ? 0 : /primer/i.test(layer.name) ? 0.6 : 1.6, 0));
  });
  return { groups, explode, target: new THREE.Vector3(0, 0.6, 0), span: WIDTH * 0.8, theta: -0.3, phi: 0.5 };
}

/* ------------------------------------------------------------------ pour: self levelling compound spreading */
export function buildPour(scene: SceneDef): Built {
  // Layers: slab, screed, primer (sheet), self levelling compound, (adhesive sheet), (finish).
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  let y = 0;
  scene.layers.forEach((layer, i) => {
    const h = heightFor(layer.mm, layer.sheet);
    const g = new THREE.Group();
    if (/levelling|leveling/i.test(layer.name)) {
      // a pour that has spread across most of the floor, its leading edge still rounded
      const sh = new THREE.Shape();
      sh.moveTo(-WIDTH / 2, -DEPTH / 2); sh.lineTo(WIDTH * 0.05, -DEPTH / 2);
      sh.bezierCurveTo(WIDTH * 0.42, -DEPTH / 2, WIDTH * 0.48, 0, WIDTH * 0.3, DEPTH * 0.1);
      sh.bezierCurveTo(WIDTH * 0.2, DEPTH * 0.16, WIDTH * 0.2, DEPTH / 2, -WIDTH * 0.05, DEPTH / 2);
      sh.lineTo(-WIDTH / 2, DEPTH / 2); sh.lineTo(-WIDTH / 2, -DEPTH / 2);
      const geom = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.08, bevelSegments: 3 });
      const m = new THREE.Mesh(geom, mat(layer.tone, { roughness: 0.25 }));
      m.rotation.x = -Math.PI / 2; m.position.y = -h / 2;
      g.add(m);
      // the bucket it came from
      const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.75, 1.6, 24), new THREE.MeshStandardMaterial({ color: 0x23395b, roughness: 0.6 }));
      bucket.position.set(WIDTH * 0.36, h / 2 + 0.7, -DEPTH * 0.22); bucket.rotation.z = 0.55; g.add(bucket);
      g.add(pickBox(WIDTH, h, DEPTH, i));
    } else {
      // Anything laid on top of the compound only covers the part that has cured: the left half.
      const after = scene.layers.findIndex((l) => /levelling|leveling/i.test(l.name));
      const partial = after >= 0 && i > after;
      const w = partial ? WIDTH * 0.42 : WIDTH;
      const b = box(w, h, DEPTH, mat(layer.tone), !layer.sheet);
      if (partial) b.position.x = -WIDTH / 2 + w / 2;
      g.add(b);
      const pick = pickBox(w, h, DEPTH, i); if (partial) pick.position.x = -WIDTH / 2 + w / 2; g.add(pick);
    }
    g.userData.index = i;
    g.position.y = y + h / 2; y += h;
    groups.push(g); explode.push(new THREE.Vector3(0, i, 0));
  });
  return { groups, explode, target: new THREE.Vector3(0, y / 2, 0), span: WIDTH, theta: -0.62, phi: 0.5 };
}

/* ------------------------------------------------------------------ resin: a glossy floor with broadcast */
export function buildResin(scene: SceneDef): Built {
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  let y = 0;
  scene.layers.forEach((layer, i) => {
    const h = i === 0 ? 1.6 : Math.max(0.14, heightFor(layer.mm, layer.sheet) * 0.8);
    const g = new THREE.Group();
    const top = i === scene.layers.length - 1;
    const material = top
      ? new THREE.MeshPhysicalMaterial({ color: new THREE.Color(TONE_HEX[layer.tone]), roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05, metalness: 0 })
      : mat(layer.tone);
    // each layer stops a little short of the one below, so the stack reads as a build up at the edge
    const w = WIDTH - i * 0.9, d = DEPTH - i * 0.5;
    const b = box(w, h, d, material, !top && !layer.sheet); b.position.set(-i * 0.45, 0, 0); g.add(b);
    if (/broadcast|quartz/i.test(layer.name)) {
      const grain = new THREE.MeshStandardMaterial({ color: 0xf3dfc1, roughness: 0.9 });
      for (let k = 0; k < 260; k++) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.05 + Math.random() * 0.04, 6, 6), grain);
        s.position.set(-i * 0.45 + (Math.random() - 0.5) * (w - 0.3), h / 2, (Math.random() - 0.5) * (d - 0.3));
        g.add(s);
      }
    }
    const pick = pickBox(w, h, d, i); pick.position.x = -i * 0.45; g.add(pick);
    g.userData.index = i;
    g.position.y = y + h / 2; y += h;
    groups.push(g); explode.push(new THREE.Vector3(0, i, 0));
  });
  return { groups, explode, target: new THREE.Vector3(0, y / 2, 0), span: WIDTH, theta: -0.7, phi: 0.42 };
}

/* ------------------------------------------------------------------ facade: slabs on a wall with fixings */
export function buildFacade(scene: SceneDef): Built {
  // Layers: wall, primer (sheet), adhesive, slabs, grout/joints.
  const groups: THREE.Group[] = [];
  const explode: THREE.Vector3[] = [];
  const H = 8.5;
  let z = -DEPTH / 2;
  scene.layers.forEach((layer, i) => {
    const t = i === 0 ? 1.8 : heightFor(layer.mm, layer.sheet) * 0.9;
    const g = new THREE.Group();
    if (layer.tiled) {
      // large format slabs, two by three, with mechanical fixings at the joints
      const cols = 2, rows = 3, joint = 0.14;
      const sw = (WIDTH - joint) / cols, sh = (H - joint * 2) / rows;
      for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
        const s = box(sw, sh, t, mat(layer.tone));
        s.position.set(-WIDTH / 2 + sw / 2 + c * (sw + joint), -H / 2 + sh / 2 + r * (sh + joint), 0);
        g.add(s);
      }
      const fixMat = new THREE.MeshStandardMaterial({ color: 0x406e8e, metalness: 0.7, roughness: 0.4 });
      for (let r = 1; r < rows; r++) for (const x of [-WIDTH / 4, WIDTH / 4]) {
        const f = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.9, 10), fixMat);
        f.rotation.x = Math.PI / 2; f.position.set(x, -H / 2 + r * (sh + joint) - joint / 2, -t / 2 - 0.2); g.add(f);
      }
    } else if (/grout|joint/i.test(layer.name)) {
      const jm = mat(layer.tone, { roughness: 0.95 });
      const vj = new THREE.Mesh(new THREE.BoxGeometry(0.14, H, t * 0.7), jm); g.add(vj);
      for (let r = 1; r < 3; r++) { const hj = new THREE.Mesh(new THREE.BoxGeometry(WIDTH, 0.14, t * 0.7), jm); hj.position.y = -H / 2 + r * ((H - 0.28) / 3 + 0.14) - 0.07; g.add(hj); }
    } else {
      g.add(box(WIDTH, H, t, mat(layer.tone), !layer.sheet));
    }
    g.add(pickBox(WIDTH, H, t, i));
    g.userData.index = i;
    const merged = /grout|joint/i.test(layer.name);
    g.position.z = merged ? z - t / 2 - 0.02 : z + t / 2;
    if (!merged) z += t;
    groups.push(g); explode.push(new THREE.Vector3(0, 0, merged ? i - 1 : i));
  });
  return { groups, explode, target: new THREE.Vector3(0, 0, 0), span: Math.max(WIDTH, H) + 1, theta: -0.55, phi: 0.18 };
}

export function build(scene: SceneDef): Built {
  switch (scene.kind) {
    case "column": return buildColumn(scene);
    case "roof": return buildRoof(scene);
    case "joint": return buildJoint(scene);
    case "profile": return buildProfile(scene);
    case "sealant": return buildSealant(scene);
    case "pour": return buildPour(scene);
    case "resin": return buildResin(scene);
    case "facade": return buildFacade(scene);
    default: return buildStack(scene);
  }
}

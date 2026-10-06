// Timed "film" version of the BIM → CAD presentation, rendered frame by frame
// into a video by render.mjs. window.film.render(t) draws the frame at t seconds.
//
//   0–19 s  close-up at the front wall while walls, doors and windows assemble
//           around the camera (walls rise course by course), then the camera pulls
//           back and orbits as the rest of the house builds; the roof drops in last.
//  19–21 s  the perspective flattens into an orthographic view.
//  21–45 s  the CAD tour: floor plan, a section walking through the house, the
//           front elevation, each landing on the actual AutoCAD drawing.
//  45–52 s  all three drawings side by side.

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const params = new URLSearchParams(location.search);
const LANG = params.get("lang") === "fr" ? "fr" : "en";
export const DURATION = 52;

const TEXT = {
  en: {
    model: ["BIM model", "Built element by element"],
    plan: ["Floor plan", "Cut at 4 ft, seen from above"],
    section: ["Section", "A walk through the building"],
    elevation: ["Elevation", "The front, as drawn"],
    gallery: ["One model, every deliverable.", "Plan · Section · Elevation"],
    galleryLabels: ["Floor plan", "Section", "Elevation"],
  },
  fr: {
    model: ["Modèle BIM", "Construit élément par élément"],
    plan: ["Plan", "Coupé à 4 pi, vu de haut"],
    section: ["Coupe", "Une traversée du bâtiment"],
    elevation: ["Élévation", "La façade, telle que dessinée"],
    gallery: ["Un modèle, tous les livrables.", "Plan · Coupe · Élévation"],
    galleryLabels: ["Plan", "Coupe", "Élévation"],
  },
}[LANG];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seg = (t, a, b) => clamp01((t - a) / (b - a));
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeOutBack = (x) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);
const lerp = (a, b, t) => a + (b - a) * t;
const deg = THREE.MathUtils.degToRad;

// Seeded random so every render of the film is identical
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

const BG = new THREE.Color("#ebe6da"), BG_CAD = new THREE.Color("#212830");

// ---------------------------------------------------------------------------
const stage = document.getElementById("stage");
const W = stage.clientWidth, H = stage.clientHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H);
renderer.localClippingEnabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
stage.prepend(renderer.domElement);

const scene = new THREE.Scene();
const persp = new THREE.PerspectiveCamera(50, W / H, 0.3, 6000);
const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 3000);

scene.add(new THREE.HemisphereLight("#ffffff", "#8a8070", 1.5));
const sun = new THREE.DirectionalLight("#fff1dc", 2.6);
sun.position.set(70, 110, 90);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -60, right: 60, top: 60, bottom: -60, near: 1, far: 400 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.02;
scene.add(sun);

const cutBelow = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1e4);
const sectionCut = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1e4);
const clipping = [cutBelow, sectionCut];

// ---------------------------------------------------------------------------
// Textures: concrete block running bond for exterior walls, soil for the terrain

function canvasTexture(draw, size = 512) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  draw(cv.getContext("2d"), size);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

// One tile = 2 blocks wide × 4 courses (16" × 8" blocks): 32" × 32"
const BLOCK_TILE_FT = 32 / 12;
const blockTex = canvasTexture((ctx, s) => {
  ctx.fillStyle = "#cfc9bd";
  ctx.fillRect(0, 0, s, s);
  const bw = s / 2, bh = s / 4, j = 3;
  for (let r = 0; r < 4; r++) {
    for (let c = -1; c < 3; c++) {
      const x = c * bw + (r % 2 ? bw / 2 : 0), y = r * bh;
      const shade = 200 + Math.floor(rand() * 26);
      ctx.fillStyle = `rgb(${shade},${shade - 4},${shade - 12})`;
      ctx.fillRect(x + j, y + j, bw - 2 * j, bh - 2 * j);
      for (let k = 0; k < 140; k++) { // grain
        ctx.fillStyle = `rgba(60,55,45,${rand() * 0.12})`;
        ctx.fillRect(x + j + rand() * (bw - 2 * j), y + j + rand() * (bh - 2 * j), 2, 2);
      }
    }
  }
});

const soilTex = canvasTexture((ctx, s) => {
  ctx.fillStyle = "#7d6750";
  ctx.fillRect(0, 0, s, s);
  for (let y = 0; y < s; y += 2) {
    const k = Math.sin(y * 0.055) * 10 + Math.sin(y * 0.016) * 14 + (rand() - 0.5) * 10;
    ctx.fillStyle = `rgba(${k > 0 ? "255,235,205" : "40,25,15"},${Math.min(0.22, Math.abs(k) / 90)})`;
    ctx.fillRect(0, y, s, 2);
  }
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(30,20,10,${rand() * 0.25})`;
    ctx.fillRect(rand() * s, rand() * s, 1 + rand() * 3, 1 + rand());
  }
});

// Box-projected UVs (in feet / tile size) so textures sit at true scale on any face
function boxUV(geometry, tile) {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  const pos = g.attributes.position, uv = new Float32Array(pos.count * 2);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i); b.fromBufferAttribute(pos, i + 1); c.fromBufferAttribute(pos, i + 2);
    n.subVectors(c, b).cross(new THREE.Vector3().subVectors(a, b)).normalize();
    const ax = Math.abs(n.x), ay = Math.abs(n.y), az = Math.abs(n.z);
    for (let k = 0; k < 3; k++) {
      const p = [a, b, c][k];
      const [u, v] = ay > ax && ay > az ? [p.x, p.z] : ax > az ? [p.z, p.y] : [p.x, p.y];
      uv[(i + k) * 2] = u / tile;
      uv[(i + k) * 2 + 1] = v / tile;
    }
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

// ---------------------------------------------------------------------------
// Model

let root, house = new THREE.Box3(), site = new THREE.Box3();
const pieces = []; // { mesh, cls, bb, reveal, centre, t0, kind, dur }

async function loadModel() {
  const gltf = await new GLTFLoader().loadAsync("house-elements.glb");
  root = gltf.scene;
  root.rotation.y = Math.PI; // main facade to the camera, as in the page
  root.updateMatrixWorld(true);
  const b = new THREE.Box3().setFromObject(root);
  const c = b.getCenter(new THREE.Vector3());
  root.position.set(-c.x, 0, -c.z);
  scene.add(root);
  root.updateMatrixWorld(true);

  const meshes = [];
  root.traverse((o) => { if (o.isMesh) meshes.push(o); });
  for (const m of meshes) {
    const bb = new THREE.Box3().setFromObject(m);
    if (/^Ifc(Wall|Roof)/.test(m.name)) house.union(bb);
    site.union(bb);
  }
  // Exterior walls (touching the outer wall line) get the block texture
  const env = house.clone();
  const onEnvelope = (bb) => bb.min.x - env.min.x < 1.6 || env.max.x - bb.max.x < 1.6 || bb.min.z - env.min.z < 1.6 || env.max.z - bb.max.z < 1.6;

  for (const m of meshes) {
    const cls = m.name.split("-")[0];
    const bb = new THREE.Box3().setFromObject(m);
    m.castShadow = m.receiveShadow = true;
    const mat = m.material.clone();
    const reveal = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1e4); // per element: walls rise behind it
    mat.clippingPlanes = [...clipping, reveal];
    mat.clipShadows = true;
    mat.side = THREE.DoubleSide;
    if (/^IfcWall/.test(cls) && onEnvelope(bb) && bb.max.y > 0.5) {
      m.geometry = boxUV(m.geometry, BLOCK_TILE_FT);
      mat.map = blockTex;
      mat.color.multiplyScalar(1.15);
    }
    mat.userData.opacity = mat.opacity;
    mat.userData.transparent = mat.transparent;
    m.material = mat;
    const local = new THREE.Box3().setFromBufferAttribute(m.geometry.attributes.position);
    pieces.push({ mesh: m, cls, bb, reveal, centre: bb.getCenter(new THREE.Vector3()) });
  }
  schedule();
  addTerrain();
  window.__house = { cx: house.getCenter(new THREE.Vector3()).x, front: house.max.z }; // for inspection previews
}

// When each element arrives. Site and basement first (mostly underground). Everything
// in the opening close-up assembles while the camera is there, done by ~4 s, so that
// shot never lingers on a half-built wall. Then the rest of the ground floor spreads
// out from there, then the upper parts, and the roof last.
function schedule() {
  const start = new THREE.Vector3(house.min.x + 12, 4, house.max.z);
  const closeUp = new THREE.Box3(new THREE.Vector3(house.min.x - 2, -0.5, house.max.z - 3), new THREE.Vector3(house.min.x + 30, 14, house.max.z + 4));
  const big = (p) => p.bb.getSize(new THREE.Vector3()).x > 60;
  const maxD = Math.max(...pieces.map((p) => p.centre.distanceTo(start)));
  const kindOf = (p) => /^Ifc(Wall|Column|Slab|Stair|Railing)/.test(p.cls) ? "grow"
    : /^Ifc(Door|Window|Plate|Member|CurtainWall)/.test(p.cls) ? "fly" : "drop";
  for (const p of pieces) {
    const d = p.centre.distanceTo(start) / maxD, j = rand() * 0.6;
    let t0, kind;
    if (big(p)) { t0 = -1; kind = "static"; } // site slab: already there
    else if (p.cls === "IfcRoof") { t0 = 14.2; kind = "drop"; }
    else if (p.bb.max.y > 0.3 && p.bb.intersectsBox(closeUp)) {
      t0 = 0.3 + clamp01(p.bb.min.y / 12) * 2 + j * 0.4; // bottom up, all in place by ~4 s
      kind = kindOf(p);
    }
    else if (p.bb.max.y < 0.3) { t0 = 0.2 + d * 1.6 + j * 0.5; kind = "grow"; } // basement
    else if (p.bb.min.y > 8.5) { t0 = 11 + d * 2.5 + j; kind = /^Ifc(Wall|Column)/.test(p.cls) ? "grow" : "drop"; }
    else {
      t0 = 2.5 + d * 8.5 + j;
      kind = kindOf(p);
    }
    if (/^IfcSlab/.test(p.cls) && p.bb.min.y > -1.5 && p.bb.max.y < 1) t0 = Math.min(t0, 1 + d * 2); // ground floor slab early
    Object.assign(p, { t0, kind, dur: kind === "grow" ? 1.4 : kind === "drop" && p.cls === "IfcRoof" ? 2.2 : 1.1 });
  }
}

function animatePieces(t) {
  for (const p of pieces) {
    const m = p.mesh, mat = m.material;
    if (p.kind === "static") continue;
    const x = seg(t, p.t0, p.t0 + p.dur);
    m.visible = x > 0;
    m.position.set(0, 0, 0);
    p.reveal.constant = 1e4;
    if (x <= 0 || x >= 1) {
      mat.opacity = mat.userData.opacity;
      mat.transparent = mat.userData.transparent;
      continue;
    }
    if (p.kind === "grow") {
      // Rise course by course (8" block courses) from the element's base. A clipping
      // plane reveals it rather than scaling, so door and window openings never move.
      const h = p.bb.max.y - p.bb.min.y;
      const courses = Math.max(1, Math.round(h / (8 / 12)));
      p.reveal.constant = p.bb.min.y + (h * Math.ceil(easeOut(x) * courses)) / courses;
      mat.opacity = mat.userData.opacity;
      mat.transparent = mat.userData.transparent;
    } else {
      const e = p.kind === "fly" ? easeOutBack(x) : easeOut(x);
      const lift = p.cls === "IfcRoof" ? 26 : p.kind === "fly" ? 3 : 6;
      m.position.y = lift * (1 - e);
      if (p.kind === "fly") m.position.z = -4 * (1 - e); // in from outside the front (local z is flipped)
      mat.transparent = true;
      mat.opacity = mat.userData.opacity * Math.min(1, x * 3);
    }
  }
}

function addTerrain() {
  const top = -1.02, bottom = site.min.y - 4;
  const w = site.max.x - site.min.x, d = site.max.z - site.min.z, h = top - bottom;
  const earth = new THREE.MeshStandardMaterial({ map: soilTex, roughness: 1, clippingPlanes: clipping, clipShadows: true, side: THREE.DoubleSide });
  earth.map = soilTex.clone();
  earth.map.repeat.set(w / 16, h / 16);
  earth.map.needsUpdate = true;
  const grass = new THREE.MeshStandardMaterial({ color: "#8e9a73", roughness: 1, clippingPlanes: clipping, side: THREE.DoubleSide });
  const under = new THREE.MeshStandardMaterial({ color: "#5c4a3a", roughness: 1, clippingPlanes: clipping, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [earth, earth, grass, under, earth, earth]);
  mesh.position.set((site.min.x + site.max.x) / 2, (top + bottom) / 2, (site.min.z + site.max.z) / 2);
  mesh.receiveShadow = true;
  scene.add(mesh);
  terrain = mesh;
}
let terrain;

// ---------------------------------------------------------------------------
// Drawings: inline SVG laid over the model through the orthographic camera

const drawings = {};
const overlay = document.getElementById("drawings");

async function loadDrawings() {
  const meta = await (await fetch("../drawings/drawings.json")).json();
  await Promise.all(Object.entries(meta).map(async ([key, m]) => {
    const svg = await (await fetch("../" + m.src)).text();
    const el = document.createElement("div");
    el.className = "drawing";
    el.style.width = `${m.width}px`;
    el.style.height = `${m.height}px`;
    el.innerHTML = svg;
    overlay.appendChild(el);
    const world = Object.fromEntries(["a", "b", "c"].map((k) => [k, root.localToWorld(new THREE.Vector3(...m[k]))]));
    drawings[key] = { el, meta: m, world, svg };
  }));
}

function drawingBox(key) {
  const { a, b, c } = drawings[key].world;
  return new THREE.Box3().setFromPoints([a, b, c, b.clone().add(c).sub(a)]);
}

// ---------------------------------------------------------------------------
// Cameras

const tmp = new THREE.Vector3();

// Orthographic camera framing `fit` from yaw/pitch (degrees); up follows the orbit
function placeOrtho(yaw, pitch, fit, margin = 1.1) {
  yaw = deg(yaw); pitch = deg(Math.min(pitch, 89.99));
  const dir = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
  const c = fit.getCenter(new THREE.Vector3());
  ortho.position.copy(c).addScaledVector(dir, 600);
  ortho.up.set(-Math.sin(yaw) * Math.sin(pitch), Math.cos(pitch), -Math.cos(yaw) * Math.sin(pitch));
  ortho.lookAt(c);
  ortho.updateMatrixWorld();
  const right = new THREE.Vector3().setFromMatrixColumn(ortho.matrixWorld, 0);
  const up = new THREE.Vector3().setFromMatrixColumn(ortho.matrixWorld, 1);
  let hx = 0, hy = 0;
  for (let i = 0; i < 8; i++) {
    tmp.set(i & 1 ? fit.max.x : fit.min.x, i & 2 ? fit.max.y : fit.min.y, i & 4 ? fit.max.z : fit.min.z).sub(c);
    hx = Math.max(hx, Math.abs(tmp.dot(right)));
    hy = Math.max(hy, Math.abs(tmp.dot(up)));
  }
  const half = Math.max(hy, hx / (W / H)) * margin;
  Object.assign(ortho, { left: -half * W / H, right: half * W / H, top: half, bottom: -half });
  ortho.updateProjectionMatrix();
  return { dir, c, half };
}

// Perspective path: time-keyed Catmull-Rom through camera positions and targets
function catmull(keys, t, field) {
  let i = keys.findIndex((k, n) => n < keys.length - 1 && t >= k.t && t <= keys[n + 1].t);
  if (i < 0) i = t < keys[0].t ? 0 : keys.length - 2;
  const k1 = keys[i], k2 = keys[i + 1];
  const k0 = keys[Math.max(0, i - 1)], k3 = keys[Math.min(keys.length - 1, i + 2)];
  const u = ease(clamp01((t - k1.t) / (k2.t - k1.t))) * 0.35 + clamp01((t - k1.t) / (k2.t - k1.t)) * 0.65;
  const p0 = k0[field], p1 = k1[field], p2 = k2[field], p3 = k3[field];
  const out = new THREE.Vector3();
  for (const a of ["x", "y", "z"]) {
    const v0 = p0[a], v1 = p1[a], v2 = p2[a], v3 = p3[a];
    out[a] = 0.5 * (2 * v1 + (-v0 + v2) * u + (2 * v0 - 5 * v1 + 4 * v2 - v3) * u * u + (-v0 + 3 * v1 - 3 * v2 + v3) * u * u * u);
  }
  return out;
}

let flyKeys;
function buildFlyPath() {
  const c = house.getCenter(new THREE.Vector3());
  const front = house.max.z, left = house.min.x;
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const orbit = (yaw, pitch, dist) => V(c.x + Math.sin(deg(yaw)) * Math.cos(deg(pitch)) * dist, 8 + Math.sin(deg(pitch)) * dist, c.z + Math.cos(deg(yaw)) * Math.cos(deg(pitch)) * dist);
  const look = V(c.x, 9, c.z);
  flyKeys = [
    { t: 0, pos: V(left + 7, 4.6, front + 7.5), look: V(left + 12, 5.4, front) },
    { t: 4.5, pos: V(left + 16, 5.2, front + 8.5), look: V(left + 20, 6.2, front) },
    { t: 8, pos: V(c.x + 6, 13, front + 34), look: V(c.x - 2, 7, c.z + 6) },
    { t: 11.5, pos: orbit(48, 18, 82), look },
    { t: 15, pos: orbit(10, 22, 92), look },
    { t: 19, pos: orbit(-34, 24, 100), look },
  ];
}

// ---------------------------------------------------------------------------
// Timeline

const cap = document.getElementById("caption");
const gallery = document.getElementById("gallery");
let galleryBuilt = false;

function caption(key, t, a, b) {
  return { key, o: seg(t, a, a + 0.6) * (1 - seg(t, b - 0.6, b)) };
}

function render(t) {
  seed = 7; // keep any per-frame randomness stable
  const flat = []; // (drawing key, opacity)
  let cam = persp;
  let cutY = 1e4, secC = 1e4, cad = 0;

  animatePieces(t);

  if (t < 19) {
    let pos = catmull(flyKeys, t, "pos"), look = catmull(flyKeys, t, "look");
    if (window.camAt) ({ pos, look } = window.camAt(t, pos, look)); // inspection hook (preview only)
    persp.fov = lerp(52, 40, seg(t, 4, 10));
    persp.near = 0.3;
    persp.far = 6000;
    persp.position.copy(pos);
    persp.up.set(0, 1, 0);
    persp.lookAt(look);
    persp.updateProjectionMatrix();
  } else if (t < 21) {
    // Flatten: keep the framing while the field of view closes, then hand over to ortho
    const fit = site.clone();
    const { dir, c, half } = placeOrtho(-34, 24, fit, 1.02);
    const x = ease(seg(t, 19, 21));
    const fov = lerp(40, 2, x);
    const dist = half / Math.tan(deg(fov) / 2);
    persp.fov = fov;
    persp.near = Math.max(0.3, dist - 250); // keep depth precision as the camera backs far away
    persp.far = dist + 250;
    persp.position.copy(c).addScaledVector(dir, dist);
    persp.up.set(0, 1, 0);
    persp.lookAt(c);
    persp.updateProjectionMatrix();
    if (x >= 1) cam = ortho;
  } else {
    cam = ortho;
    // CAD tour (seconds)
    const toPlan = ease(seg(t, 21, 24.5)), planIn = ease(seg(t, 24.5, 26)), planOut = ease(seg(t, 28.5, 29.3));
    const toSec = ease(seg(t, 28.5, 31.5)), sweep = ease(seg(t, 31, 34.2)), secIn = ease(seg(t, 34.2, 35.6));
    const secOut = ease(seg(t, 37.5, 38.3)), unsweep = ease(seg(t, 37.5, 39.5)), toElev = ease(seg(t, 37.5, 41));
    const elevIn = ease(seg(t, 41, 42.6));
    const planCut = toPlan * (1 - toSec);
    cutY = lerp(site.max.y + 1, 4, planCut);
    const secX = root.localToWorld(tmp.set(drawings.section.meta.cutX, 0, 0)).x;
    const secT = sweep * (1 - unsweep);
    secC = secT > 0 ? lerp(house.max.x + 1, secX, secT) : 1e4;
    const yaw = -34 - 146 * toPlan - 90 * toSec - 90 * toElev;
    const pitch = lerp(24, 90, toPlan) - 90 * toSec;
    const frames = { plan: toPlan * (1 - toSec), section: toSec * (1 - toElev), elevation: toElev };
    const wModel = Math.max(0, 1 - frames.plan - frames.section - frames.elevation);
    const fit = { min: site.min.clone().multiplyScalar(wModel), max: site.max.clone().multiplyScalar(wModel) };
    for (const k of ["plan", "section", "elevation"]) {
      if (!frames[k]) continue;
      const b = drawingBox(k);
      fit.min.addScaledVector(b.min, frames[k]);
      fit.max.addScaledVector(b.max, frames[k]);
    }
    placeOrtho(yaw, pitch, new THREE.Box3(fit.min, fit.max), lerp(1.02, 1.08, 1 - wModel));
    flat.push(["plan", planIn * (1 - planOut)], ["section", secIn * (1 - secOut)], ["elevation", elevIn * (1 - seg(t, 45, 46))]);
  }

  cutBelow.constant = cutY;
  sectionCut.constant = secC;
  const drawT = Math.max(0, ...flat.map(([, o]) => o));
  const galleryT = ease(seg(t, 45.2, 46.6));
  cad = Math.max(drawT, galleryT);

  // Shaded model ↔ drawings
  const bg = BG.clone().lerp(BG_CAD, cad);
  stage.style.background = `#${bg.getHexString()}`;
  renderer.setClearColor(bg);
  const modelO = 1 - Math.max(drawT, galleryT);
  root.traverse((o) => {
    if (!o.isMesh) return;
    const m = o.material;
    if (modelO < 1) { m.transparent = true; m.opacity = m.userData.opacity * modelO; }
    m.colorWrite = modelO > 0.001;
  });
  for (const m of terrain.material) { m.transparent = modelO < 1; m.opacity = modelO; m.colorWrite = modelO > 0.001; }

  renderer.render(scene, cam);

  // Drawing overlays
  for (const [key, o] of flat) {
    const d = drawings[key];
    d.el.style.opacity = o;
    d.el.style.visibility = o > 0 ? "visible" : "hidden";
    if (!o) continue;
    const s = (v) => { tmp.copy(v).project(ortho); return [(tmp.x * 0.5 + 0.5) * W, (-tmp.y * 0.5 + 0.5) * H]; };
    const [ax, ay] = s(d.world.a), [bx, by] = s(d.world.b), [cx, cy] = s(d.world.c);
    d.el.style.transform = `matrix(${(bx - ax) / d.meta.width},${(by - ay) / d.meta.width},${(cx - ax) / d.meta.height},${(cy - ay) / d.meta.height},${ax},${ay})`;
  }
  for (const [key, d] of Object.entries(drawings)) if (!flat.some(([k]) => k === key)) d.el.style.visibility = "hidden";

  // Final gallery
  if (!galleryBuilt) buildGallery();
  gallery.style.opacity = galleryT;
  gallery.querySelectorAll(".card").forEach((el, i) => {
    const x = easeOut(seg(t, 45.4 + i * 0.35, 46.6 + i * 0.35));
    el.style.opacity = x;
    el.style.transform = `translateY(${(1 - x) * 30}px)`;
  });

  // Captions
  const caps = [caption("model", t, 0.6, 18.6), caption("plan", t, 22, 29), caption("section", t, 30, 38), caption("elevation", t, 39, 45.2)];
  const active = caps.find((c) => c.o > 0);
  cap.style.opacity = active ? active.o : 0;
  if (active && cap.dataset.key !== active.key) {
    cap.dataset.key = active.key;
    cap.querySelector(".k").textContent = TEXT[active.key][0];
    cap.querySelector(".t").textContent = TEXT[active.key][1];
  }
  cap.classList.toggle("dark", cad > 0.5);
  document.getElementById("fade").style.opacity = 1 - seg(t, 0, 0.8) + seg(t, DURATION - 0.8, DURATION);
}

function buildGallery() {
  galleryBuilt = true;
  gallery.querySelector(".title").textContent = TEXT.gallery[0];
  gallery.querySelector(".sub").textContent = TEXT.gallery[1];
  const row = gallery.querySelector(".row");
  ["plan", "section", "elevation"].forEach((key, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<div class="sheet">${drawings[key].svg}</div><div class="label">${TEXT.galleryLabels[i]}</div>`;
    row.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
await loadModel();
buildFlyPath();
await loadDrawings();
window.film = { duration: DURATION, render, ready: true };
render(Number(params.get("t") || 0));

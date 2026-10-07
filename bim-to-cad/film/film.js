// Timed "film" version of the BIM → CAD presentation. window.film.render(t) draws
// the frame at t seconds; player.js plays it in real time (with the soundtrack
// from soundtrack.js), render.mjs renders it frame by frame. One continuous move,
// scan → BIM model → drawings, timed by CUE below:
//
//   0–4      the laser scan appears in a wave from the front corner while the
//            camera glides along the facade.
//   2.4–7.6  gold linework of the BIM model traces over the scan.
//   6.2–10.4 the model builds up from the ground behind a rising gold line,
//            replacing the scan as it goes.
//  11–14     the camera swings square to the front while the perspective flattens
//            and the shaded model drops away, leaving the linework.
//  14–16.6   the actual AutoCAD elevation takes over from the 3D linework.
//  16.6–23.4 the drawings as sheets, white on dark, moving on in a row; the section
//            and the plan draw themselves in.
//  23.4–31   the row pulls back to show all three, then the end card.

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { buildTerrain, footprintsFrom, rectOf } from "../terrain.js";
import { renderSoundtrack, toWav } from "./soundtrack.js";

const params = new URLSearchParams(location.search);
const LANG = params.get("lang") === "fr" ? "fr" : "en";

// Cue times in seconds, shared with the soundtrack
export const CUE = {
  scan: 0, lines: 2.4, build: 6.2, flatten: 11, ortho: 14, sheets: 16.6,
  section: 18.4, plan: 21, pull: 23.4, end: 27, duration: 31,
};
export const DURATION = CUE.duration;

const TEXT = {
  en: {
    scan: "From the 3D laser scan",
    model: "To the BIM model",
    drawing: "To every 2D drawing",
    all: "One model, every deliverable",
    end: "3D scanning · BIM · CAD",
    labels: { elevation: "Front elevation", section: "Section", plan: "Ground floor plan" },
  },
  fr: {
    scan: "À partir du relevé 3D",
    model: "Au modèle BIM",
    drawing: "Jusqu'à chaque plan 2D",
    all: "Un modèle, tous les livrables",
    end: "Numérisation 3D · BIM · DAO",
    labels: { elevation: "Élévation avant", section: "Coupe", plan: "Plan du rez-de-chaussée" },
  },
}[LANG];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seg = (t, a, b) => clamp01((t - a) / (b - a));
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const lerp = (a, b, t) => a + (b - a) * t;
const deg = THREE.MathUtils.degToRad;
const nocache = { cache: "no-cache" }; // always pick up a new deploy (Pages caches files for 10 min)

const BG = "#161c20";
const GOLD = new THREE.Color("#f0c255");

// ---------------------------------------------------------------------------
const stage = document.getElementById("stage");
const W = stage.clientWidth, H = stage.clientHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H);
renderer.setClearColor(BG);
renderer.autoClear = false; // two passes per frame, see render()
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false; // nothing moves: the shadow map is drawn once
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
stage.prepend(renderer.domElement);

const scene = new THREE.Scene();
const persp = new THREE.PerspectiveCamera(50, W / H, 0.3, 6000);
const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 3000);
const SCAN_LAYER = 1; // the scan and its occluder, drawn in the first pass

scene.add(new THREE.HemisphereLight("#c9d3dc", "#2e2924", 0.8));
const sun = new THREE.DirectionalLight("#ffe6c4", 3.2);
sun.position.set(-60, 85, 110);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -60, right: 60, top: 60, bottom: -60, near: 1, far: 400 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.02;
scene.add(sun);

// ---------------------------------------------------------------------------
// Concrete block running bond for the exterior walls

let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

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
// Linework: lines appear as a front sweeps out from `start`, with a bright leading edge

function lineMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uStart: { value: new THREE.Vector3() },
      uSweep: { value: 0 },
      uGlow: { value: 6 },
      uWhite: { value: 0 },
      uOpacity: { value: 1 },
      uGold: { value: GOLD.clone() },
    },
    vertexShader: `
      varying vec3 vW;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `
      uniform vec3 uStart, uGold;
      uniform float uSweep, uGlow, uWhite, uOpacity;
      varying vec3 vW;
      void main() {
        float d = distance(vW, uStart);
        if (d > uSweep) discard;
        float edge = 1.0 - smoothstep(0.0, uGlow, uSweep - d);
        vec3 col = mix(uGold, vec3(0.91, 0.93, 0.94), uWhite);
        col = mix(col, vec3(1.0, 0.96, 0.82), edge * (1.0 - uWhite));
        gl_FragColor = vec4(col, uOpacity * (0.8 + 0.2 * edge));
      }`,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
}

// ---------------------------------------------------------------------------
// Model

let root, house = new THREE.Box3(), site = new THREE.Box3(), sitePad = new THREE.Box3();
const INSIDE = /^(Ifc(FlowTerminal|FlowSegment|FurnishingElement|Covering|Stair|StairFlight|Railing)|IfcDoor-\d)/;
const INSIDE_GREY = new THREE.Color("#c9c4ba");
const shaded = []; // materials that fade away, leaving the linework
const maskPos = []; // the whole model and terrain as one triangle soup, for the masks below
let edges, edgeMat, terrain, cloud, cloudMat, depthMask, occluder;

function addMask(mesh) {
  mesh.updateMatrixWorld(true);
  const g = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry;
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i).applyMatrix4(mesh.matrixWorld);
    maskPos.push(v.x, v.y, v.z);
  }
}

// The model builds up from the ground: it exists only below a rising level, which
// it crosses as a gold line. The scan exists only above it.
const build = { uBuild: { value: -1e4 }, uBuildGold: { value: GOLD } };
function belowBuild(mat, band) {
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, build);
    sh.vertexShader = "varying float vBuildY;\n" + sh.vertexShader.replace("#include <project_vertex>",
      "#include <project_vertex>\n  vBuildY = (modelMatrix * vec4(transformed, 1.0)).y;");
    sh.fragmentShader = "varying float vBuildY;\nuniform vec3 uBuildGold;\nuniform float uBuild;\n" + sh.fragmentShader.replace("#include <dithering_fragment>",
      `float buildD = uBuild - vBuildY;
  if (buildD < 0.0) discard;
  ${band ? "gl_FragColor.rgb += uBuildGold * exp(-buildD * 1.6) * 0.8;" : ""}
  #include <dithering_fragment>`);
  };
  mat.customProgramCacheKey = () => (band ? "build-band" : "build");
}

// Background-coloured copy of the built part: hides lines behind its surfaces
const maskMat = new THREE.MeshBasicMaterial({ color: BG, toneMapped: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
belowBuild(maskMat, false);
// Depth only, the whole model: hides lines behind it before it is built
const depthMat = new THREE.MeshBasicMaterial({ colorWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
// Depth only, pushed back a few inches, in the scan's pass: hides scan points
// inside and behind the building, never the ones on its surfaces
const occluderMat = new THREE.MeshBasicMaterial({ colorWrite: false, side: THREE.DoubleSide });
occluderMat.onBeforeCompile = (sh) => {
  sh.vertexShader = sh.vertexShader.replace("gl_Position = projectionMatrix * mvPosition;",
    "mvPosition.xyz += normalize(mvPosition.xyz) * 0.35;\n  gl_Position = projectionMatrix * mvPosition;");
};

function fading(mat, band = true) {
  belowBuild(mat, band);
  mat.userData.opacity = mat.opacity;
  mat.transparent = true;
  mat.depthWrite = false; // depth comes from the masks, so only the front surface draws
  mat.side = THREE.DoubleSide;
  shaded.push(mat);
}

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
    if (/^Site/.test(m.name)) sitePad.union(bb);
  }
  const footprints = footprintsFrom(meshes.filter((m) => /^IfcWall/.test(m.name)));
  const env = house.clone();
  const onEnvelope = (bb) => bb.min.x - env.min.x < 1.6 || env.max.x - bb.max.x < 1.6 || bb.min.z - env.min.z < 1.6 || env.max.z - bb.max.z < 1.6;

  const linePos = [];
  const v = new THREE.Vector3();
  for (const m of meshes) {
    const cls = m.name.split("-")[0];
    if (cls === "Site") { m.visible = false; continue; } // replaced by the terrain's paving
    const bb = new THREE.Box3().setFromObject(m);
    m.castShadow = m.receiveShadow = true;
    const mat = m.material.clone();
    const exteriorWall = /^IfcWall/.test(cls) && onEnvelope(bb) && bb.max.y > 0.5;
    const inside = INSIDE.test(m.name) || (/^IfcWall/.test(cls) && !exteriorWall && bb.max.y > 0.5 && bb.max.y < 12);
    if (exteriorWall) {
      m.geometry = boxUV(m.geometry, BLOCK_TILE_FT);
      mat.map = blockTex;
      mat.color.multiplyScalar(1.15);
    } else if (inside) {
      mat.color.copy(INSIDE_GREY);
    } else if (cls === "IfcRoof") {
      mat.color.multiplyScalar(0.42); // darker roof, so the linework reads on it
    }
    fading(mat);
    m.material = mat;
    m.renderOrder = 1;
    addMask(m);
    // Linework: the envelope only (walls, roof, openings, slabs), as an elevation shows it
    if (!inside) {
      const eg = new THREE.EdgesGeometry(m.geometry, 25);
      const p = eg.attributes.position;
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld);
        linePos.push(v.x, v.y, v.z);
      }
    }
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
  edgeMat = lineMaterial();
  edges = new THREE.LineSegments(lg, edgeMat);
  edges.renderOrder = 3;
  edges.frustumCulled = false;
  scene.add(edges);

  // Terrain: only the paving shows (darker, for the night look); the earth stays as
  // a mask, still hiding the basement the way the drawing's earth hatch does
  terrain = buildTerrain({ ...footprints, site: rectOf(sitePad.isEmpty() ? site : sitePad), bottom: site.min.y - 4 });
  scene.add(terrain);
  terrain.traverse((o) => {
    if (!o.isMesh) return;
    o.receiveShadow = true;
    o.renderOrder = 1;
    if (o.name === "Terrain-paving") for (const mat of o.material) { mat.color.multiplyScalar(0.45); fading(mat, false); } // flat: a band would flash it all at once
    else o.material = o.material.map(() => new THREE.MeshBasicMaterial({ visible: false }));
    addMask(o);
  });

  const mg = new THREE.BufferGeometry();
  mg.setAttribute("position", new THREE.Float32BufferAttribute(maskPos, 3));
  const masks = new THREE.Mesh(mg, maskMat);
  depthMask = new THREE.Mesh(mg, depthMat);
  occluder = new THREE.Mesh(mg, occluderMat);
  occluder.layers.set(SCAN_LAYER);
  depthMask.renderOrder = -1;
  occluder.renderOrder = -1;
  for (const m of [masks, depthMask, occluder]) m.frustumCulled = false;
  scene.add(masks, depthMask, occluder);
}

// ---------------------------------------------------------------------------
// Laser scan: int16 positions in the model's coordinates plus a baked grey shade
// (tools/scan_to_web.py). Points appear in a wave, and give way to the model as
// it builds up.

async function loadScan() {
  const meta = await (await fetch("scan.json", nocache)).json();
  const buf = await (await fetch("scan.bin", nocache)).arrayBuffer();
  const n = meta.count;
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Int16Array(buf, 0, n * 3), 3));
  g.setAttribute("shade", new THREE.BufferAttribute(new Uint8Array(buf, n * 6, n), 1, true));
  cloudMat = new THREE.ShaderMaterial({
    uniforms: {
      uScale: { value: meta.scale },
      uOffset: { value: new THREE.Vector3(...meta.offset) },
      uStart: { value: new THREE.Vector3() },
      uAppear: { value: 0 },
      uBuild: build.uBuild,
      uSize: { value: 900 },
      uGold: { value: GOLD },
    },
    vertexShader: `
      attribute float shade;
      uniform float uScale, uSize, uAppear, uBuild;
      uniform vec3 uOffset, uStart;
      varying float vShade, vA, vB;
      void main() {
        vec4 w = modelMatrix * vec4(position * uScale + uOffset, 1.0);
        vA = uAppear - distance(w.xyz, uStart); // > 0 once the wave has passed
        vB = w.y - uBuild;                       // > 0 above the built part
        vShade = shade;
        vec4 mv = viewMatrix * w;
        gl_Position = (vA < 0.0 || vB < 0.0) ? vec4(2.0, 2.0, 2.0, 1.0) : projectionMatrix * mv;
        gl_PointSize = clamp(uSize * 0.06 / -mv.z, 1.5, 6.0);
      }`,
    fragmentShader: `
      uniform vec3 uGold;
      varying float vShade, vA, vB;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        if (dot(c, c) > 0.25) discard;
        vec3 col = vShade * vec3(0.92, 0.95, 1.0);
        col += uGold * (exp(-vA * 0.5) + 0.9 * exp(-vB * 1.6));
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  cloud = new THREE.Points(g, cloudMat);
  cloud.frustumCulled = false;
  cloud.layers.set(SCAN_LAYER);
  root.add(cloud); // same coordinates as the model
}

// ---------------------------------------------------------------------------
// Drawings

const drawings = {};
const overlay = document.getElementById("drawings");
const sheets = document.getElementById("sheets");
const ORDER = ["elevation", "section", "plan"];

async function loadDrawings() {
  const meta = await (await fetch("../drawings/drawings.json", nocache)).json();
  await Promise.all(Object.entries(meta).map(async ([key, m]) => {
    const svg = await (await fetch("../" + m.src, nocache)).text();
    const el = document.createElement("div");
    el.className = "drawing";
    el.style.width = `${m.width}px`;
    el.style.height = `${m.height}px`;
    el.innerHTML = svg;
    overlay.appendChild(el);
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = `${m.width}px`;
    card.style.height = `${m.height}px`;
    card.innerHTML = svg;
    sheets.appendChild(card);
    // Draw-on: every stroked path is dashed over its own length (pathLength 1)
    const paths = [...card.querySelectorAll("path")];
    const strokes = paths.filter((p) => (p.getAttribute("fill") ?? "none") === "none");
    for (const p of strokes) { p.setAttribute("pathLength", "1"); p.style.strokeDasharray = "1 1"; }
    const solids = [...paths.filter((p) => !strokes.includes(p)), ...card.querySelectorAll("text")];
    const label = document.createElement("div");
    label.className = "label";
    label.innerHTML = `<span>${TEXT.labels[key]}</span><i></i>`;
    sheets.appendChild(label);
    const world = Object.fromEntries(["a", "b", "c"].map((k) => [k, root.localToWorld(new THREE.Vector3(...m[k]))]));
    drawings[key] = { el, card, label, strokes, solids, meta: m, world };
  }));
}

function drawingBox(key) {
  const { a, b, c } = drawings[key].world;
  return new THREE.Box3().setFromPoints([a, b, c, b.clone().add(c).sub(a)]);
}

// Screen rectangle of a drawing laid over the model through the ortho camera
const tmp = new THREE.Vector3();
function overlayRect(key) {
  const d = drawings[key];
  const s = (v) => { tmp.copy(v).project(ortho); return [(tmp.x * 0.5 + 0.5) * W, (-tmp.y * 0.5 + 0.5) * H]; };
  const [ax, ay] = s(d.world.a), [bx] = s(d.world.b), [, cy] = s(d.world.c);
  return { x: ax, y: ay, w: bx - ax, h: cy - ay };
}

// ---------------------------------------------------------------------------
// Camera: keys in orbit terms (target, yaw, pitch, half-height of the view at the
// target, field of view). Distance follows from the half-height and the field of
// view, so closing the field of view flattens the picture without changing framing.

const V = (x, y, z) => new THREE.Vector3(x, y, z);
let keys, elevFrame;

function buildKeys() {
  const c = house.getCenter(new THREE.Vector3());
  const front = house.max.z, left = house.min.x;
  const k = (t, target, yaw, pitch, dist, fov) => ({ t, target, yaw, pitch, half: dist * Math.tan(deg(fov) / 2), fov });
  // Final framing: square to the front, the elevation drawing filling the screen
  const box = drawingBox("elevation");
  const ec = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const half = Math.max(size.y / 2, size.x / 2 / (W / H)) * 1.08;
  elevFrame = { c: ec, half };
  keys = [
    k(0, V(left + 9, 8, front), -56, 7, 30, 55),
    k(3.5, V(left + 16, 7, front), -44, 6, 20, 52),
    k(7, V(c.x - 1, 9, front - 2), -34, 10, 38, 48),
    k(10, V(c.x + 1, 12, c.z + 2), -26, 13, 72, 42),
    k(11.5, V(c.x, 13, c.z + 4), -18, 10, 96, 38),
    { t: CUE.ortho, target: ec, yaw: 0, pitch: 0, half, fov: 1 },
  ];
}

// Catmull-Rom over the key values, uniform in time within each span
function spline(t, f) {
  let i = keys.findIndex((k, n) => n < keys.length - 1 && t <= keys[n + 1].t);
  if (i < 0) i = keys.length - 2;
  const k1 = keys[i], k2 = keys[i + 1];
  const k0 = keys[Math.max(0, i - 1)], k3 = keys[Math.min(keys.length - 1, i + 2)];
  let u = clamp01((t - k1.t) / (k2.t - k1.t));
  if (i === keys.length - 2) u = 1 - Math.pow(1 - u, 2); // settle into the front view
  const p0 = f(k0), p1 = f(k1), p2 = f(k2), p3 = f(k3);
  return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);
}

function setCamera(t) {
  if (t >= CUE.ortho) {
    // Orthographic front view, pushing in steadily until the sheets take over
    const half = elevFrame.half / lerp(1, 1.1, seg(t, CUE.ortho, CUE.sheets + 1));
    ortho.position.copy(elevFrame.c).add(V(0, 0, 600));
    ortho.up.set(0, 1, 0);
    ortho.lookAt(elevFrame.c);
    Object.assign(ortho, { left: -half * W / H, right: half * W / H, top: half, bottom: -half });
    ortho.updateProjectionMatrix();
    ortho.updateMatrixWorld();
    return ortho;
  }
  const target = V(spline(t, (k) => k.target.x), spline(t, (k) => k.target.y), spline(t, (k) => k.target.z));
  const yaw = deg(spline(t, (k) => k.yaw)), pitch = deg(spline(t, (k) => k.pitch));
  const half = Math.exp(spline(t, (k) => Math.log(k.half)));
  const fov = Math.exp(spline(t, (k) => Math.log(k.fov)));
  const dist = half / Math.tan(deg(fov) / 2);
  const dir = V(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
  persp.fov = fov;
  persp.near = Math.max(0.3, dist - 300);
  persp.far = dist + 300;
  persp.position.copy(target).addScaledVector(dir, dist);
  persp.up.set(0, 1, 0);
  persp.lookAt(target);
  persp.updateProjectionMatrix();
  persp.updateMatrixWorld();
  return persp;
}

// ---------------------------------------------------------------------------
// Sheets: a row of cards that keeps moving

const CARD_H = 640, GAP = 220, ROW_Y = 470;
let elevStart; // the elevation's rect on screen when the sheets take over

function sheetLayout(t) {
  const sizes = ORDER.map((k) => ({ w: CARD_H * drawings[k].meta.width / drawings[k].meta.height, h: CARD_H }));
  let x = 0;
  const centres = sizes.map((s) => { const c = x + s.w / 2; x += s.w + GAP; return c; });
  const total = x - GAP;
  const focus = ease(seg(t, CUE.section, CUE.section + 1.2)) + ease(seg(t, CUE.plan, CUE.plan + 1.2));
  const fc = lerp(lerp(centres[0], centres[1], Math.min(1, focus)), centres[2], Math.max(0, focus - 1));
  const offset = 960 - fc - 30 * Math.max(0, t - CUE.sheets); // always drifting
  // Pull back to all three, still drifting slowly
  const z = ease(seg(t, CUE.pull, CUE.pull + 1.8));
  const fitS = lerp(1720, 1640, seg(t, CUE.pull, CUE.end + 1)) / total, fitOffset = (1920 - total * fitS) / 2;
  return ORDER.map((key, i) => {
    const e = 1 - Math.min(1, Math.abs(focus - i));
    const s = lerp(lerp(0.8, 1, e), fitS, z);
    const w = sizes[i].w * s, h = sizes[i].h * s;
    const cx = lerp(centres[i] + offset, fitOffset + centres[i] * fitS, z);
    const cy = lerp(ROW_Y, 450, z);
    return { key, rect: { x: cx - w / 2, y: cy - h / 2, w, h }, emph: lerp(e, 1, z) };
  });
}

function mixRect(a, b, x) {
  return { x: lerp(a.x, b.x, x), y: lerp(a.y, b.y, x), w: lerp(a.w, b.w, x), h: lerp(a.h, b.h, x) };
}

function placeCard(d, r, opacity, drawn) {
  const { card, label, meta } = d;
  const vis = opacity > 0.001;
  card.style.visibility = label.style.visibility = vis ? "visible" : "hidden";
  if (!vis) return;
  card.style.opacity = opacity;
  card.style.transform = `translate(${r.x}px, ${r.y}px) scale(${r.w / meta.width}, ${r.h / meta.height})`;
  const off = String(1 - drawn);
  for (const p of d.strokes) p.style.strokeDashoffset = off;
  const so = String(seg(drawn, 0.5, 1));
  for (const p of d.solids) p.style.opacity = so;
  const k = Math.max(0.6, r.h / CARD_H);
  label.style.opacity = opacity * seg(drawn, 0.3, 0.9);
  label.style.transform = `translate(${r.x + r.w / 2}px, ${r.y + r.h + 26 * k}px) translateX(-50%) scale(${k})`;
  label.querySelector("i").style.width = `${seg(drawn, 0.5, 1) * 100}%`;
}

// ---------------------------------------------------------------------------
// Timeline

const capEl = document.getElementById("caption");
const capText = capEl.querySelector("span");
const capBars = capEl.querySelectorAll("i");
const CAPTIONS = [["scan", 0.8, 5.6], ["model", 6, 10.6], ["drawing", 11.2, 16.4], ["all", 23.8, 26.8]];
const endEl = document.getElementById("end");
endEl.querySelector(".sub").textContent = TEXT.end;

function render(t) {
  const cam = setCamera(t);

  // The scan appears in a wave from the front corner, the linework sweeps out after
  // it, then the model builds up from the ground, replacing the scan
  const start = V(house.min.x, 0, house.max.z);
  cloudMat.uniforms.uStart.value.copy(start);
  cloudMat.uniforms.uAppear.value = lerp(0, 110, Math.pow(seg(t, 0.2, 4.4), 1.3));
  cloudMat.uniforms.uSize.value = H / (2 * Math.tan(deg(persp.fov) / 2));
  edgeMat.uniforms.uStart.value.copy(start);
  edgeMat.uniforms.uSweep.value = lerp(0, 120, Math.pow(seg(t, CUE.lines, CUE.build + 1.4), 1.2));
  build.uBuild.value = t < CUE.build ? -1e4 : lerp(-1.5, 40, ease(seg(t, CUE.build, CUE.build + 4.2)));
  edgeMat.uniforms.uWhite.value = ease(seg(t, CUE.flatten + 0.4, CUE.flatten + 2.4));
  edgeMat.uniforms.uOpacity.value = 1 - ease(seg(t, CUE.ortho + 0.8, CUE.ortho + 1.8));
  edges.visible = edgeMat.uniforms.uOpacity.value > 0;
  cloud.visible = occluder.visible = t < CUE.build + 4.4;

  // The shaded model drops away, leaving the hidden-line drawing
  const solid = 1 - ease(seg(t, CUE.flatten, CUE.flatten + 2));
  for (const m of shaded) { m.opacity = m.userData.opacity * solid; m.visible = solid > 0.001; }
  if (sun.castShadow !== solid > 0.001) { sun.castShadow = solid > 0.001; renderer.shadowMap.needsUpdate = true; }
  const show3d = t < CUE.ortho + 2;
  root.visible = terrain.visible = show3d;

  // Two passes: the scan with its own occluder, then the model and the linework on
  // top, so the lines sit on the scan without being nudged toward the camera (which
  // would let hidden lines show through)
  renderer.clear();
  if (show3d) {
    if (cloud.visible) {
      cam.layers.set(SCAN_LAYER);
      renderer.render(scene, cam);
      renderer.clearDepth();
    }
    cam.layers.set(0);
    renderer.render(scene, cam);
  }

  // The AutoCAD elevation takes over from the 3D linework
  const elev = drawings.elevation;
  const overlayO = t < CUE.sheets ? ease(seg(t, CUE.ortho + 0.1, CUE.ortho + 1.2)) : 0;
  elev.el.style.visibility = overlayO > 0 ? "visible" : "hidden";
  if (overlayO > 0) {
    const r = overlayRect("elevation");
    elev.el.style.opacity = overlayO;
    elev.el.style.transform = `translate(${r.x}px, ${r.y}px) scale(${r.w / elev.meta.width}, ${r.h / elev.meta.height})`;
  }

  // Sheets
  const out = ease(seg(t, CUE.end - 0.4, CUE.end + 0.8));
  const layout = t >= CUE.sheets ? sheetLayout(t) : null;
  ORDER.forEach((key, i) => {
    const d = drawings[key];
    if (!layout) return placeCard(d, null, 0, 0);
    let { rect, emph } = layout[i];
    let opacity = lerp(0.28, 1, emph), drawn = 1;
    if (key === "elevation") {
      rect = mixRect(elevStart, rect, ease(seg(t, CUE.sheets, CUE.sheets + 1.2)));
      opacity = lerp(1, opacity, seg(t, CUE.sheets, CUE.sheets + 1.2));
    } else {
      const at = CUE[key] - 0.5; // draws itself as it slides in
      opacity *= seg(t, at, at + 0.5);
      drawn = easeOut(seg(t, at + 0.1, at + 2.1));
    }
    rect = { ...rect, y: rect.y - 40 * out };
    placeCard(d, rect, opacity * (1 - 0.88 * out), drawn);
  });

  // End card, easing in and still growing slightly to the last frame
  endEl.style.opacity = ease(seg(t, CUE.end + 0.2, CUE.end + 1.4));
  endEl.style.transform = `translateY(${(1 - easeOut(seg(t, CUE.end + 0.2, CUE.end + 1.8))) * 24}px) scale(${lerp(1, 1.04, seg(t, CUE.end, DURATION))})`;

  // Caption: gold bars grow, then the words settle in
  const c = CAPTIONS.find(([, a, b]) => t >= a && t <= b);
  if (c) {
    const [key, a, b] = c;
    const bar = easeOut(seg(t, a, a + 0.4)), txt = easeOut(seg(t, a + 0.2, a + 0.9)), gone = seg(t, b - 0.4, b);
    if (capText.dataset.key !== key) { capText.dataset.key = key; capText.textContent = TEXT[key]; }
    capBars.forEach((el) => { el.style.transform = `scaleY(${bar})`; });
    capText.style.opacity = txt;
    capText.style.letterSpacing = `${lerp(14, 5, txt)}px`;
    capEl.style.opacity = 1 - gone;
  } else capEl.style.opacity = 0;

  document.getElementById("brand").style.opacity = seg(t, 0.6, 1.4) * (1 - seg(t, CUE.end - 0.6, CUE.end + 0.2));
  document.getElementById("fade").style.opacity = 1 - seg(t, 0, 0.6) + seg(t, DURATION - 0.8, DURATION);
}

// ---------------------------------------------------------------------------
await loadModel();
await Promise.all([loadScan(), loadDrawings()]);
buildKeys();
renderer.shadowMap.needsUpdate = true;
setCamera(CUE.sheets);
elevStart = overlayRect("elevation");
let score;
const soundtrack = () => (score ??= renderSoundtrack(CUE));
// The score as a base64 WAV, for render.mjs
const soundtrackWav = async () => {
  const bytes = toWav(await soundtrack());
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};
window.film = { duration: DURATION, cues: CUE, render, soundtrack, soundtrackWav, ready: true, poster: 5 };
render(Number(params.get("t") || 0));

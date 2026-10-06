// Scroll-driven "BIM model → CAD drawings" viewer.
// The page passes a progress value (0 → 1). With the real model and the AutoCAD
// drawings (drawings/drawings.json) it tours the deliverables:
//   1. the building rises from the basement through a moving section plane,
//   2. the cut drops to 4 ft, the camera looks straight down and the model
//      turns into the floor plan drawing,
//   3. a vertical section plane walks through the house and the cut turns
//      into the building section drawing,
//   4. the camera faces the front and the model turns into the elevation.
// Each drawing is the actual AutoCAD sheet (tools/dwf_to_svg.py), pinned to the
// model so it lands exactly on top of it.
// Without them (e.g. the stand-in model) it falls back to: build-up, turn to the
// front, and generated hidden-line linework with level tags.
//
// The model comes from the Revit IFC export, converted by tools/ifc_to_glb.py.
// If it can't be loaded (or CONFIG.model.url is null) a procedural stand-in of
// the house is shown instead.

import * as THREE from "three";
import { buildTerrain, footprintsFrom, rectOf } from "./terrain.js";

const CONFIG = {
  model: {
    url: "models/house.glb",
    // true: the file is already in feet at true elevations (tools/ifc_to_glb.py output).
    // false: any other export; it is scaled so its lowest point sits at bottomFt and
    // its highest point at topFt, whatever units the exporter used.
    feet: true,
    bottomFt: -9.083,
    topFt: 37.6,
    yawDeg: 180, // rotate the model so its main facade faces the camera at the end
  },
  // AutoCAD drawings pinned to the model (tools/dwf_to_svg.py)
  drawingsUrl: "drawings/drawings.json",
  planCutFt: 4, // height of the floor plan cut above the ground floor
  // Levels for the generated elevation (fallback only; feet, from the IFC storeys).
  // side: which end of the level line carries the tag.
  levels: [
    { name: "RIDGE", ft: 36.1157 },
    { name: "Tof of Roof", ft: 18 },
    { name: "1ST HIGHER CEILING", ft: 8.8614, side: "left" },
    { name: "1ST FLOOR LOWER CEILING", ft: 8.0323 },
    { name: "1ST FLOOR", ft: 0 },
    { name: "Basement Ceiling", ft: -0.5, side: "left" },
    { name: "Basement", ft: -9.0833 },
  ],
};

const COL = {
  bg3d: new THREE.Color("#ebe6da"),
  bgCad: new THREE.Color("#212830"),
  edge3d: new THREE.Color("#23282d"),
  ghost: new THREE.Color("#004227"),
  cut: new THREE.Color("#deb047"),
  level: "#f2d14b",
};

// CAD layer colours, borrowed from the AutoCAD elevation.
const CAD = {
  outline: "#f2f2f2",
  window: "#4fe3f0",
  door: "#f2d14b",
  eave: "#e04bd8",
  site: "#7a8188",
};

// Interior elements (fixtures, furniture, interior doors) keep their shading and
// the outline preview, but get no drawn edges: they never appear on an elevation,
// and the exported wall surfaces have hairline cracks their edges would show through.
// Interior doors are the IfcDoor meshes without "-ext" (see tools/ifc_to_glb.py).
const INTERIOR = /^(Ifc(FlowTerminal|FlowSegment|FurnishingElement|BuildingElementProxy)|IfcDoor-\d)/;
// Everything inside the house is shown in one neutral grey, so the envelope reads first
const GREY_INSIDE = /^(Ifc(FlowTerminal|FlowSegment|FurnishingElement|Covering|Stair|StairFlight|Railing)|IfcDoor-\d)/;
const INSIDE_GREY = new THREE.Color("#c9c4ba");

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

// 8.375 → 8'-4 1/2"
function feetInches(ft) {
  const sign = ft < 0 ? "-" : "";
  let eighths = Math.round(Math.abs(ft) * 96);
  const f = Math.floor(eighths / 96);
  eighths -= f * 96;
  const inch = Math.floor(eighths / 8);
  let frac = eighths % 8;
  let fracTxt = "";
  if (frac) {
    let den = 8;
    while (frac % 2 === 0) { frac /= 2; den /= 2; }
    fracTxt = ` ${frac}/${den}`;
  }
  return `${sign}${f}'-${inch}${fracTxt}"`;
}

// ---------------------------------------------------------------------------
// Stand-in model (feet, Y up, front facade facing +Z)
// ---------------------------------------------------------------------------

function buildStandIn() {
  const g = new THREE.Group();
  const M = {
    wall: new THREE.MeshStandardMaterial({ color: "#b9b1a3", roughness: 0.9 }),
    trim: new THREE.MeshStandardMaterial({ color: "#d9d3c7", roughness: 0.8 }),
    roof: new THREE.MeshStandardMaterial({ color: "#4b5866", roughness: 0.7, flatShading: true }),
    found: new THREE.MeshStandardMaterial({ color: "#8d8a84", roughness: 1 }),
    frame: new THREE.MeshStandardMaterial({ color: "#26303a", roughness: 0.5 }),
    glass: new THREE.MeshStandardMaterial({ color: "#7fa6bd", roughness: 0.1, metalness: 0.3 }),
    door: new THREE.MeshStandardMaterial({ color: "#c98d45", roughness: 0.6 }),
    vent: new THREE.MeshStandardMaterial({ color: "#2f3338", roughness: 0.6 }),
  };

  const box = (w, h, d, x, y, z, mat, cad = CAD.outline) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y + h / 2, z);
    m.userData.cad = cad;
    g.add(m);
    return m;
  };

  const W = 50, D = 50, H = 10.2, T = 1; // footprint, wall height, wall thickness
  const hw = W / 2, hd = D / 2;

  // Basement (front half of the footprint); the paving and earth come from terrain.js
  box(W, 8.4, 26, 0, -9.083, hd - 13, M.found);
  g.userData.footprints = { site: { minX: -32, maxX: 32, minZ: -29, maxZ: 33 }, footprint: { minX: -hw, maxX: hw, minZ: -hd, maxZ: hd }, basement: { minX: -hw, maxX: hw, minZ: hd - 26, maxZ: hd } };

  // Walls
  box(W, H, T, 0, 0, hd - T / 2, M.wall);
  box(W, H, T, 0, 0, -hd + T / 2, M.wall);
  box(T, H, D - 2 * T, -hw + T / 2, 0, 0, M.wall);
  box(T, H, D - 2 * T, hw - T / 2, 0, 0, M.wall);

  // Cornice band
  const cH = 0.8, cO = 0.45;
  box(W + 2 * cO, cH, cO, 0, H, hd + cO / 2, M.trim, CAD.eave);
  box(W + 2 * cO, cH, cO, 0, H, -hd - cO / 2, M.trim, CAD.eave);
  box(cO, cH, D, -hw - cO / 2, H, 0, M.trim, CAD.eave);
  box(cO, cH, D, hw + cO / 2, H, 0, M.trim, CAD.eave);

  // Hip roof: a square pyramid from the eave to the ridge
  const eave = H + cH, ridge = 36 + 1.375 / 12, half = hw + 0.7;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(half * Math.SQRT2, ridge - eave, 4, 1), M.roof);
  roof.rotation.y = Math.PI / 4;
  roof.position.y = eave + (ridge - eave) / 2;
  roof.userData.cad = CAD.outline;
  g.add(roof);

  // Openings. `face` is the wall the opening sits on; `u` runs left→right as seen from outside.
  const faces = {
    front: { n: new THREE.Vector3(0, 0, 1), r: new THREE.Vector3(1, 0, 0), d: hd },
    back: { n: new THREE.Vector3(0, 0, -1), r: new THREE.Vector3(-1, 0, 0), d: hd },
    right: { n: new THREE.Vector3(1, 0, 0), r: new THREE.Vector3(0, 0, -1), d: hw },
    left: { n: new THREE.Vector3(-1, 0, 0), r: new THREE.Vector3(0, 0, 1), d: hw },
  };

  function opening(face, u, sill, w, h, { cols = 1, rows = 1, door = false, dist = null, frameW = 0.25 } = {}) {
    const f = faces[face];
    const o = new THREE.Group();
    const depth = 0.35, fd = (dist ?? f.d) + depth / 2 - 0.05;
    const place = (mesh, du, dv, dz = 0) => {
      mesh.position.copy(f.n).multiplyScalar(fd + dz).addScaledVector(f.r, u + du).setY(sill + dv);
      mesh.lookAt(mesh.position.clone().add(f.n));
      o.add(mesh);
    };
    const cad = door ? CAD.door : CAD.window;
    const piece = (pw, ph, mat, du, dv, dz, pd = depth) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(pw, ph, pd), mat);
      m.userData.cad = cad;
      place(m, du, dv, dz);
    };
    // Frame
    piece(w, frameW, M.frame, 0, frameW / 2, 0);
    piece(w, frameW, M.frame, 0, h - frameW / 2, 0);
    piece(frameW, h, M.frame, -w / 2 + frameW / 2, h / 2, 0);
    piece(frameW, h, M.frame, w / 2 - frameW / 2, h / 2, 0);
    // Infill
    if (door) {
      const leaf = (w - 2 * frameW) / 2;
      piece(leaf - 0.05, h - frameW, M.door, -leaf / 2, (h - frameW) / 2, -0.05, 0.2);
      piece(leaf - 0.05, h - frameW, M.door, leaf / 2, (h - frameW) / 2, -0.05, 0.2);
    } else {
      piece(w - 2 * frameW, h - 2 * frameW, M.glass, 0, h / 2, -0.08, 0.1);
      const mw = 0.12;
      for (let c = 1; c < cols; c++) piece(mw, h - 2 * frameW, M.frame, -w / 2 + (w * c) / cols, h / 2, 0.02, 0.2);
      for (let r = 1; r < rows; r++) piece(w - 2 * frameW, mw, M.frame, 0, (h * r) / rows, 0.02, 0.2);
    }
    g.add(o);
  }

  // Front: double door flanked by four tall gridded windows
  opening("front", 0, 0, 6.4, 7.4, { door: true });
  for (const u of [-13.4, -6.6, 6.6, 13.4]) opening("front", u, 1.3, 3.4, 6.6, { cols: 3, rows: 7 });
  // Right side: french doors, a door and a window
  opening("right", -14, 0, 3, 7.4, { door: true });
  opening("right", -10, 0, 3, 7.4, { door: true });
  opening("right", -1, 0, 3, 7.4, { door: true });
  opening("right", 7.5, 0, 3.4, 7.4, { door: true });
  opening("right", 11.5, 3.4, 3.4, 4, { cols: 2 });
  opening("right", 16.5, 3.4, 4.6, 4, { cols: 2 });
  // Left side and back: tall windows
  for (const u of [-14, -10, -3]) opening("left", u, 0.6, 1.8, 7.6, { cols: 1, rows: 1 });
  for (const u of [-12, 0, 12]) opening("back", u, 1.3, 3.4, 6.6, { cols: 2, rows: 4 });

  // Front dormer sitting on the cornice, set back from the wall face
  const dz = hd - 2.6, dW = 10, dB = eave, dT = 21, dDepth = 10;
  box(dW, dT - dB, dDepth, 0, dB, dz - dDepth / 2, M.wall);
  box(dW + 1.2, 0.7, dDepth + 0.6, 0, dT, dz - dDepth / 2 + 0.3, M.trim, CAD.eave);
  opening("front", 0, 12.2, 8, 5.4, { cols: 2, rows: 3, dist: dz });

  // Roof vents and ridge vents
  box(1.3, 2.4, 1.3, -1.4, ridge - 2.2, 0.6, M.vent);
  box(1.3, 2.4, 1.3, 1.4, ridge - 2.2, -0.6, M.vent);
  for (const [x, y, z] of [[-11, 21.5, 8], [9, 17.5, 15], [16, 15, -3]]) box(0.7, 1.6, 0.7, x, y, z, M.vent);

  return g;
}

// ---------------------------------------------------------------------------
// Viewer
// ---------------------------------------------------------------------------

export function mount(container, opts = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.localClippingEnabled = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  container.appendChild(renderer.domElement);

  const labelLayer = document.createElement("div");
  labelLayer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden;font-family:'Neue Haas',sans-serif";
  container.appendChild(labelLayer);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 2000);

  scene.add(new THREE.HemisphereLight("#ffffff", "#8a8070", 1.6));
  const sun = new THREE.DirectionalLight("#fff4e0", 2.2);
  sun.position.set(60, 90, 70);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -70, right: 70, top: 70, bottom: -70, near: 1, far: 300 });
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  // Clipping: the rising section plane, and the grade plane that splits solid / hidden (dashed) edges.
  const cutBelow = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0); // keeps y < h
  const cutAbove = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);  // keeps y > h (ghost)
  const gradeAbove = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1e4);
  const gradeBelow = new THREE.Plane(new THREE.Vector3(0, -1, 0), -0.05);
  const sectionCut = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1e4); // keeps x < c (camera on +x)

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.18, depthWrite: false }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.62;
  ground.receiveShadow = true;
  scene.add(ground);

  const model = new THREE.Group();
  scene.add(model);

  const edgeMats = new Map(); // cad colour → { solid, dashed }
  const ghostMat = new THREE.LineBasicMaterial({ color: COL.ghost, transparent: true, opacity: 0.2, clippingPlanes: [cutAbove], depthWrite: false });
  const surfaceMats = new Set();
  let box = new THREE.Box3();
  let front = 25;

  function edgeMaterial(cad) {
    if (!edgeMats.has(cad)) {
      edgeMats.set(cad, {
        cad: new THREE.Color(cad),
        solid: new THREE.LineBasicMaterial({ transparent: true, clippingPlanes: [cutBelow, gradeAbove, sectionCut] }),
        dashed: new THREE.LineDashedMaterial({ color: cad, dashSize: 0.9, gapSize: 0.6, transparent: true, opacity: 0, clippingPlanes: [cutBelow, gradeBelow, sectionCut] }),
      });
    }
    return edgeMats.get(cad);
  }

  function prepare(root) {
    root.updateMatrixWorld(true);
    const meshes = [];
    root.traverse((o) => { if (o.isMesh) meshes.push(o); });
    for (const mesh of meshes) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        if (GREY_INSIDE.test(mesh.name) && m.color) m.color.copy(INSIDE_GREY);
        m.transparent = true;
        m.side = THREE.DoubleSide;
        m.clippingPlanes = [cutBelow, sectionCut];
        m.clipShadows = true;
        m.polygonOffset = true;
        m.polygonOffsetFactor = 1;
        m.polygonOffsetUnits = 1;
        m.userData.baseOpacity = m.opacity;
        surfaceMats.add(m);
      }
      mesh.castShadow = mesh.receiveShadow = true;
      mesh.renderOrder = 0;
      const cad = mesh.userData.cad || guessCad(mesh);
      const geo = new THREE.EdgesGeometry(mesh.geometry, 20);
      const { solid, dashed } = edgeMaterial(cad);
      const lines = new THREE.LineSegments(geo, solid);
      const hidden = new THREE.LineSegments(geo, dashed);
      const ghost = new THREE.LineSegments(geo, ghostMat);
      hidden.computeLineDistances();
      lines.renderOrder = hidden.renderOrder = 2;
      ghost.renderOrder = 3;
      if (INTERIOR.test(mesh.name)) mesh.add(ghost);
      else mesh.add(lines, hidden, ghost);
    }
  }

  // For an exported model, pick CAD colours from material / object names.
  function guessCad(mesh) {
    const n = `${mesh.name} ${mesh.material?.name || ""}`.toLowerCase();
    if (/glass|glaz|window|fen[eê]tre|vitr|ifcplate/.test(n)) return CAD.window;
    if (/door|porte/.test(n)) return CAD.door;
    if (/fascia|gutter|eave|soffit|cornice/.test(n)) return CAD.eave;
    return CAD.outline;
  }

  let house = new THREE.Box3();
  let glbRoot = null; // the loaded .glb scene, for drawing anchors (null for the stand-in)

  function setModel(root, fromGlb = null) {
    glbRoot = fromGlb;
    model.clear();
    model.add(root);
    prepare(root);
    box = new THREE.Box3().setFromObject(root);
    front = box.max.z;
    // The house itself (walls + roof), for sizing the gold cut indicators
    house = new THREE.Box3();
    root.traverse((o) => { if (o.isMesh && /^Ifc(Wall|Roof)/.test(o.name)) house.expandByObject(o); });
    if (house.isEmpty()) house.copy(box);
    addTerrain(root);
    buildLevels();
    placeDrawings();
    requestRender();
    opts.onReady?.();
  }

  // Paving and earth from terrain.js, replacing the Revit site pad: flat paving
  // 7" below the door thresholds, earth cut out around the basement. It is cut like
  // the model: it builds up from below and opens in section.
  function addTerrain(root) {
    let fp = root.userData.footprints;
    if (!fp) {
      const walls = [], sites = [];
      root.traverse((o) => { if (o.isMesh && /^IfcWall/.test(o.name)) walls.push(o); if (o.isMesh && /^Site/.test(o.name)) sites.push(o); });
      const site = new THREE.Box3();
      for (const m of sites) { site.expandByObject(m); m.visible = false; }
      fp = { ...footprintsFrom(walls), site: rectOf(site.isEmpty() ? box : site) };
    }
    const g = buildTerrain({ ...fp, bottom: box.min.y - 4 });
    model.add(g);
    prepare(g);
  }

  async function loadGlb(url) {
    const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
    const gltf = await new GLTFLoader().loadAsync(url);
    const root = gltf.scene;
    root.rotation.y = THREE.MathUtils.degToRad(opts.yawDeg ?? CONFIG.model.yawDeg);
    root.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(root);
    if (!CONFIG.model.feet) {
      root.scale.setScalar((CONFIG.model.topFt - CONFIG.model.bottomFt) / (b.max.y - b.min.y));
      root.updateMatrixWorld(true);
      b.setFromObject(root);
    }
    const c = b.getCenter(new THREE.Vector3());
    root.position.set(-c.x, CONFIG.model.feet ? 0 : CONFIG.model.bottomFt - b.min.y, -c.z);
    const wrap = new THREE.Group();
    wrap.add(root);
    return { wrap, root };
  }

  // Level lines + labels, and the earth hatch below grade
  const levelGroup = new THREE.Group();
  scene.add(levelGroup);
  const levelMat = new THREE.LineDashedMaterial({ color: COL.level, dashSize: 3.2, gapSize: 0.8, transparent: true, opacity: 0, depthTest: false });
  let labels = [];
  let hatch;

  function buildLevels() {
    levelGroup.clear();
    labelLayer.replaceChildren();
    const x0 = box.min.x - 5, x1 = box.max.x + 5, z = front + 2;
    labels = CONFIG.levels.map((lv) => {
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x0, lv.ft, z), new THREE.Vector3(x1, lv.ft, z)]);
      const line = new THREE.Line(geo, levelMat);
      line.computeLineDistances();
      line.renderOrder = 5;
      levelGroup.add(line);
      const el = document.createElement("div");
      el.style.cssText = `position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;color:${COL.level};font-size:10px;line-height:1.15;letter-spacing:.4px;white-space:nowrap;opacity:0;will-change:transform`;
      el.innerHTML = `<svg width="13" height="13" viewBox="0 0 14 14" style="flex:none"><circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M7 1.5V7H1.5A5.5 5.5 0 0 1 7 1.5ZM7 12.5V7h5.5A5.5 5.5 0 0 1 7 12.5Z" fill="currentColor"/></svg><span><span class="n">${lv.name}<br></span>${feetInches(lv.ft)}</span>`;
      labelLayer.appendChild(el);
      const left = lv.side === "left";
      if (left) el.style.flexDirection = "row-reverse";
      return { el, left, pos: new THREE.Vector3(left ? x0 : x1, lv.ft, z) };
    });

    const cv = document.createElement("canvas");
    cv.width = 256; cv.height = 128;
    const ctx = cv.getContext("2d");
    ctx.strokeStyle = "rgba(150,95,80,0.55)";
    ctx.lineWidth = 1;
    for (let y = 0; y < 128; y += 8) {
      ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(256, y + 0.5); ctx.stroke();
      for (let x = ((y / 8) % 2) * 8; x < 256; x += 16) { ctx.beginPath(); ctx.moveTo(x + 0.5, y); ctx.lineTo(x + 0.5, y + 8); ctx.stroke(); }
    }
    const tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    const hw = (box.max.x - box.min.x) / 2 + 6, depth = Math.max(4, -box.min.y + 3);
    tex.repeat.set((2 * hw) / 16, depth / 8);
    hatch = new THREE.Mesh(
      new THREE.PlaneGeometry(2 * hw, depth),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false })
    );
    hatch.position.set((box.min.x + box.max.x) / 2, -depth / 2 - 0.05, front + 1);
    hatch.renderOrder = 1;
    levelGroup.add(hatch);
  }

  // Gold indicators for the moving cuts: horizontal (build-up, plan) and vertical (section)
  function cutIndicator(rotate) {
    const g = new THREE.Group();
    const fill = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: COL.cut, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false }));
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1)), new THREE.LineBasicMaterial({ color: COL.cut, transparent: true }));
    for (const o of [fill, edge]) { rotate(o); o.renderOrder = 4; g.add(o); }
    scene.add(g);
    return g;
  }
  const cutGroup = cutIndicator((o) => (o.rotation.x = -Math.PI / 2));
  const secGroup = cutIndicator((o) => (o.rotation.y = Math.PI / 2));
  const cutLabel = document.createElement("div");
  cutLabel.style.cssText = "position:absolute;left:0;top:0;padding:3px 8px;border-radius:4px;background:#deb047;color:#004227;font-size:11px;font-weight:700;letter-spacing:.3px;white-space:nowrap;will-change:transform";
  container.appendChild(cutLabel);

  // AutoCAD drawings as inline SVG, laid over the model with a CSS matrix
  const drawings = {}; // key → { el, meta, world: { a, b, c } }
  const drawingLayer = document.createElement("div");
  drawingLayer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden";
  container.appendChild(drawingLayer);

  async function loadDrawings(url) {
    const meta = await (await fetch(url)).json();
    const base = new URL(url, location.href);
    await Promise.all(Object.entries(meta).map(async ([key, m]) => {
      const svg = await (await fetch(new URL(m.src.replace(/^drawings\//, ""), base))).text();
      const el = document.createElement("div");
      el.style.cssText = `position:absolute;left:0;top:0;width:${m.width}px;height:${m.height}px;transform-origin:0 0;opacity:0;visibility:hidden`;
      el.innerHTML = svg;
      const svgEl = el.querySelector("svg");
      svgEl.style.cssText = "display:block;width:100%;height:100%;overflow:visible";
      drawingLayer.appendChild(el);
      drawings[key] = { el, meta: m };
    }));
    placeDrawings();
    requestRender();
    opts.onReady?.();
  }

  // World positions of each drawing's corners (needs the real model's transform)
  function placeDrawings() {
    for (const d of Object.values(drawings)) {
      d.world = glbRoot && Object.fromEntries(["a", "b", "c"].map((k) => [k, glbRoot.localToWorld(new THREE.Vector3(...d.meta[k]))]));
    }
  }
  const tour = () => glbRoot && drawings.plan?.world && drawings.section?.world && drawings.elevation?.world;

  function drawingBox(key) {
    const { a, b, c } = drawings[key].world;
    const d = b.clone().add(c).sub(a);
    return new THREE.Box3().setFromPoints([a, b, c, d]);
  }

  // -------------------------------------------------------------------------
  let progress = 0, raf = 0, disposed = false, compact = false;
  let insets = opts.insets || { top: 0, bottom: 0 };
  const tmp = new THREE.Vector3();

  function requestRender() {
    if (!raf && !disposed) raf = requestAnimationFrame(render);
  }

  function fitCamera(yaw, pitch, fit, w, h) {
    const dir = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
    const c = fit.getCenter(new THREE.Vector3());
    camera.position.copy(c).addScaledVector(dir, 400);
    // "Up" follows the orbit so the camera can look straight down without flipping
    camera.up.set(-Math.sin(yaw) * Math.sin(pitch), Math.cos(pitch), -Math.cos(yaw) * Math.sin(pitch));
    camera.lookAt(c);
    camera.updateMatrixWorld();
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
    let hx = 0, hy = 0;
    for (let i = 0; i < 8; i++) {
      tmp.set(i & 1 ? fit.max.x : fit.min.x, i & 2 ? fit.max.y : fit.min.y, i & 4 ? fit.max.z : fit.min.z).sub(c);
      hx = Math.max(hx, Math.abs(tmp.dot(right)));
      hy = Math.max(hy, Math.abs(tmp.dot(up)));
    }
    const avail = Math.max(0.3, (h - insets.top - insets.bottom) / h);
    const aspect = w / h;
    const H = (Math.max(hy, hx / aspect) * (compact ? 1.02 : 1.08)) / avail;
    const s = ((insets.top - insets.bottom) / h) * H;
    Object.assign(camera, { left: -H * aspect, right: H * aspect, top: H + s, bottom: -H + s });
    camera.updateProjectionMatrix();
  }

  function toScreen(v, w, h) {
    tmp.copy(v).project(camera);
    return [(tmp.x * 0.5 + 0.5) * w, (-tmp.y * 0.5 + 0.5) * h];
  }

  // Timeline -------------------------------------------------------------------
  // Each returns where things stand at progress p: cut heights, camera angles,
  // how much each drawing is shown (0–1) and what the camera frames.
  const deg = THREE.MathUtils.degToRad;

  function legacyState(p) {
    const build = ease(seg(p, 0.03, 0.42));
    const turn = ease(seg(p, 0.42, 0.68));
    return {
      build, cutT: build, secT: 0,
      yaw: lerp(lerp(-52, -34, build), 0, turn), pitch: lerp(24, 0, turn),
      ghost: 1 - seg(p, 0.36, 0.46), cad: ease(seg(p, 0.64, 0.86)), show: {}, frame: {},
    };
  }

  function tourState(p) {
    const build = ease(seg(p, 0.03, 0.2));
    const toPlan = ease(seg(p, 0.2, 0.3)), planIn = ease(seg(p, 0.3, 0.36)), planOut = ease(seg(p, 0.4, 0.44));
    const toSec = ease(seg(p, 0.4, 0.5)), sweep = ease(seg(p, 0.5, 0.62)), secIn = ease(seg(p, 0.62, 0.68));
    const secOut = ease(seg(p, 0.72, 0.76)), unsweep = ease(seg(p, 0.72, 0.8));
    const toElev = ease(seg(p, 0.72, 0.84)), elevIn = ease(seg(p, 0.84, 0.92));
    return {
      build,
      cutT: build,              // 0 → 1: basement → above the ridge
      planCut: toPlan * (1 - toSec), // 0 → 1: drop to the plan cut height and back
      secT: sweep * (1 - unsweep),   // 0 → 1: section plane from outside to the section line
      yaw: lerp(-52, -34, build) + lerp(0, -146, toPlan) - 90 * toSec - 90 * toElev,
      pitch: lerp(24, 90, toPlan) - 90 * toSec,
      ghost: 1 - seg(p, 0.16, 0.22),
      cad: 0,
      show: { plan: planIn * (1 - planOut), section: secIn * (1 - secOut), elevation: elevIn },
      frame: { plan: toPlan * (1 - toSec), section: toSec * (1 - toElev), elevation: toElev },
    };
  }

  function render() {
    raf = 0;
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    compact = w < 560;
    const size = renderer.getSize(new THREE.Vector2());
    if (size.x !== w || size.y !== h) renderer.setSize(w, h, false);

    const touring = tour();
    const st = stateAt(progress);
    const drawT = Math.max(0, ...Object.values(st.show));
    const flat = Math.max(st.cad, drawT); // how far we are into a "drawing" look

    // Horizontal cut: build-up, then down to the plan cut height (4 ft) and back up
    const y0 = box.min.y - 0.3, y1 = box.max.y + 0.3;
    const cutY = lerp(lerp(y0, y1, st.cutT), CONFIG.planCutFt, st.planCut || 0);
    cutBelow.constant = cutY;
    cutAbove.constant = -cutY;
    const moving = (st.build > 0 && st.build < 1) || ((st.planCut || 0) > 0 && (st.planCut || 0) < 1);
    const cutVis = moving && drawT === 0;
    cutGroup.scale.set(house.max.x - house.min.x + 8, 1, house.max.z - house.min.z + 8);
    cutGroup.position.set((house.min.x + house.max.x) / 2, cutY, (house.min.z + house.max.z) / 2);
    cutGroup.visible = cutVis;
    ghostMat.opacity = 0.22 * st.ghost;

    // Vertical section plane, walking in from the camera side to the section line
    const secX = touring ? glbRoot.localToWorld(tmp.set(drawings.section.meta.cutX, 0, 0)).x : 0;
    const secC = lerp(house.max.x + 1, secX, st.secT); // starts just outside the house walls
    sectionCut.constant = st.secT > 0 ? secC : 1e4;
    secGroup.visible = st.secT > 0 && st.secT < 1;
    secGroup.scale.set(1, house.max.y - house.min.y + 4, house.max.z - house.min.z + 8);
    secGroup.position.set(secC, (house.min.y + house.max.y) / 2, (house.min.z + house.max.z) / 2);

    // Camera frames the model, or the drawing it is turning towards
    const fit = box.clone();
    if (touring) {
      const wModel = Math.max(0, 1 - st.frame.plan - st.frame.section - st.frame.elevation);
      const acc = { min: fit.min.clone().multiplyScalar(wModel), max: fit.max.clone().multiplyScalar(wModel) };
      for (const key of ["plan", "section", "elevation"]) {
        if (!st.frame[key]) continue;
        const b = drawingBox(key);
        acc.min.addScaledVector(b.min, st.frame[key]);
        acc.max.addScaledVector(b.max, st.frame[key]);
      }
      fit.set(acc.min, acc.max);
    } else if (st.cad > 0) {
      // Make room for the generated level lines and their tags
      const room = (side) => (compact || !labels.some((l) => l.left === (side === "left")) ? 0 : 15);
      const extra = new THREE.Box3(new THREE.Vector3(box.min.x - 5 - room("left"), box.min.y, box.min.z), new THREE.Vector3(box.max.x + 5 + room("right"), box.max.y, box.max.z));
      fit.min.lerp(extra.min, st.cad);
      fit.max.lerp(extra.max, st.cad);
    }
    fitCamera(deg(st.yaw), deg(Math.min(st.pitch, 89.99)), fit, w, h);

    // Shaded model ↔ drawing
    const bg = COL.bg3d.clone().lerp(COL.bgCad, flat);
    renderer.setClearColor(bg);
    container.style.background = `#${bg.getHexString()}`;
    for (const m of surfaceMats) {
      m.opacity = m.userData.baseOpacity * (1 - flat);
      m.colorWrite = flat < 0.999; // stays in the depth buffer to hide back edges
    }
    ground.material.opacity = 0.18 * (1 - flat);
    gradeAbove.constant = st.cad > 0.5 ? 0.05 : 1e4;
    for (const e of edgeMats.values()) {
      e.solid.color.copy(COL.edge3d).lerp(e.cad, st.cad);
      e.solid.opacity = lerp(0.22, 1, st.cad) * (1 - drawT); // faint in 3D: Revit geometry has many near-coincident steps
      e.dashed.opacity = seg(st.cad, 0.5, 1);
    }
    levelMat.opacity = st.cad;
    if (hatch) hatch.material.opacity = st.cad * 0.9;

    renderer.render(scene, camera);

    // HTML overlays: drawings, level tags, cut label
    for (const [key, d] of Object.entries(drawings)) {
      const t = (touring && st.show[key]) || 0;
      d.el.style.opacity = t;
      d.el.style.visibility = t > 0 ? "visible" : "hidden";
      if (!t) continue;
      const [ax, ay] = toScreen(d.world.a, w, h), [bx, by] = toScreen(d.world.b, w, h), [cx, cy] = toScreen(d.world.c, w, h);
      const W = d.meta.width, H = d.meta.height;
      d.el.style.transform = `matrix(${(bx - ax) / W},${(by - ay) / W},${(cx - ax) / H},${(cy - ay) / H},${ax},${ay})`;
    }
    for (const l of labels) {
      const [x, y] = toScreen(l.pos, w, h);
      l.el.style.opacity = st.cad;
      l.el.querySelector(".n").style.display = compact ? "none" : "";
      l.el.style.fontSize = compact ? "9px" : "10px";
      // Narrow screens: elevation only, sitting on top of the line's end
      l.el.style.transform = compact
        ? `translate(${x}px, ${y - 14}px)${l.left ? "" : " translateX(-100%)"}`
        : l.left ? `translate(${x - 6}px, ${y - 13}px) translateX(-100%)` : `translate(${x + 6}px, ${y - 13}px)`;
    }
    if (cutVis) {
      const [x, y] = toScreen(tmp.set(box.max.x + 3, cutY, box.max.z + 3), w, h);
      cutLabel.textContent = `▲ ${feetInches(cutY)}`;
      cutLabel.style.transform = `translate(${Math.min(Math.max(x + 8, 8), w - 90)}px, ${y - 11}px)`;
    }
    cutLabel.style.opacity = cutVis ? 1 : 0;
  }

  const stateAt = (p) => (tour() ? tourState(p) : legacyState(p));
  const flatAt = (p) => { const st = stateAt(p); return Math.max(st.cad, ...Object.values(st.show)); };

  // Lets the page match captions to the timeline in use
  function stage(p) {
    if (tour()) return p < 0.2 ? "model" : p < 0.4 ? "plan" : p < 0.72 ? "section" : "elevation";
    return p < 0.42 ? "model" : p < 0.66 ? "turn" : "drafting";
  }

  const ro = new ResizeObserver(requestRender);
  ro.observe(container);

  const url = opts.modelUrl ?? CONFIG.model.url;
  if (url) {
    box.set(new THREE.Vector3(-30, CONFIG.model.bottomFt, -30), new THREE.Vector3(30, CONFIG.model.topFt, 30));
    const loading = document.createElement("div");
    loading.textContent = "Loading model…";
    loading.style.cssText = "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#004227;font-size:13px;font-weight:600;letter-spacing:.4px";
    container.appendChild(loading);
    loadGlb(url)
      .then(({ wrap, root }) => !disposed && setModel(wrap, root))
      .catch((err) => { console.warn("model-to-cad: using stand-in model,", err); if (!disposed) setModel(buildStandIn()); })
      .finally(() => loading.remove());
  } else {
    setModel(buildStandIn());
  }

  loadDrawings(opts.drawingsUrl ?? CONFIG.drawingsUrl).catch((err) => console.warn("model-to-cad: no drawings,", err));

  return {
    setProgress(p) { progress = clamp01(p); requestRender(); },
    stage: () => stage(progress),
    stages: () => (tour() ? ["model", "plan", "section", "elevation"] : ["model", "turn", "drafting"]),
    dark: () => flatAt(progress) > 0.5,
    setInsets(i) { insets = i; requestRender(); },
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      renderer.forceContextLoss();
      container.replaceChildren();
    },
  };
}

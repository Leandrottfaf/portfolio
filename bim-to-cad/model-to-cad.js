// Scroll-driven "BIM model → CAD elevation" viewer.
// The page passes a progress value (0 → 1) and this module renders:
//   1. the building rising from the basement through a moving section plane,
//   2. the camera turning to a straight-on orthographic front view,
//   3. the shaded model dissolving into hidden-line CAD linework with level tags.
//
// Without a model file it builds a stand-in of the house procedurally.
// To use the real Revit model, export it to .glb (see README.md), drop it in
// models/ and set CONFIG.model.url below (or open the page with ?model=models/house.glb).

import * as THREE from "three";

const CONFIG = {
  model: {
    url: null, // e.g. "models/house.glb"
    // Real-world extent of the exported model, in feet. The .glb is scaled so its
    // lowest point sits at bottomFt and its highest point at topFt, whatever
    // units the exporter used.
    bottomFt: -9.083,
    topFt: 37.6,
    yawDeg: 0, // rotate the model so its main facade faces the camera at the end
  },
  // Levels as they appear on the CAD elevation (feet).
  levels: [
    { name: "RIDGE", ft: 36 + 1.375 / 12 },
    { name: "TOP OF ROOF", ft: 18 },
    { name: "1ST FLOOR LOWER CEILING", ft: 8 + 0.375 / 12 },
    { name: "1ST FLOOR", ft: 0 },
    { name: "BASEMENT", ft: -(9 + 1 / 12) },
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
    slab: new THREE.MeshStandardMaterial({ color: "#a29d94", roughness: 1 }),
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

  // Site slab and basement (front half of the footprint)
  box(64, 0.6, 62, 0, -0.6, 2, M.slab, CAD.site);
  box(W, 8.4, 26, 0, -9.083, hd - 13, M.found);

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
        solid: new THREE.LineBasicMaterial({ transparent: true, clippingPlanes: [cutBelow, gradeAbove] }),
        dashed: new THREE.LineDashedMaterial({ color: cad, dashSize: 0.9, gapSize: 0.6, transparent: true, opacity: 0, clippingPlanes: [cutBelow, gradeBelow] }),
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
        m.transparent = true;
        m.side = THREE.DoubleSide;
        m.clippingPlanes = [cutBelow];
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
      mesh.add(lines, hidden, ghost);
    }
  }

  // For an exported model, pick CAD colours from material / object names.
  function guessCad(mesh) {
    const n = `${mesh.name} ${mesh.material?.name || ""}`.toLowerCase();
    if (/glass|glaz|window|fen[eê]tre|vitr/.test(n)) return CAD.window;
    if (/door|porte/.test(n)) return CAD.door;
    if (/fascia|gutter|eave|soffit|cornice/.test(n)) return CAD.eave;
    return CAD.outline;
  }

  function setModel(root) {
    model.clear();
    model.add(root);
    prepare(root);
    box = new THREE.Box3().setFromObject(root);
    front = box.max.z;
    buildLevels();
    requestRender();
  }

  async function loadGlb(url) {
    const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
    const gltf = await new GLTFLoader().loadAsync(url);
    const root = gltf.scene;
    root.rotation.y = THREE.MathUtils.degToRad(CONFIG.model.yawDeg);
    root.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(root);
    const s = (CONFIG.model.topFt - CONFIG.model.bottomFt) / (b.max.y - b.min.y);
    root.scale.setScalar(s);
    root.updateMatrixWorld(true);
    b.setFromObject(root);
    const c = b.getCenter(new THREE.Vector3());
    root.position.set(-c.x, CONFIG.model.bottomFt - b.min.y, -c.z);
    const wrap = new THREE.Group();
    wrap.add(root);
    return wrap;
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
      return { el, pos: new THREE.Vector3(x1, lv.ft, z) };
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

  // Section plane indicator during the build-up
  const cutGroup = new THREE.Group();
  const cutFill = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: COL.cut, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false }));
  cutFill.rotation.x = -Math.PI / 2;
  const cutEdge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1)), new THREE.LineBasicMaterial({ color: COL.cut, transparent: true }));
  cutEdge.rotation.x = -Math.PI / 2;
  cutFill.renderOrder = cutEdge.renderOrder = 4;
  cutGroup.add(cutFill, cutEdge);
  scene.add(cutGroup);
  const cutLabel = document.createElement("div");
  cutLabel.style.cssText = "position:absolute;left:0;top:0;padding:3px 8px;border-radius:4px;background:#deb047;color:#004227;font-size:11px;font-weight:700;letter-spacing:.3px;white-space:nowrap;will-change:transform";
  container.appendChild(cutLabel);

  // -------------------------------------------------------------------------
  let progress = 0, raf = 0, disposed = false, compact = false;
  let insets = opts.insets || { top: 0, bottom: 0 };
  const tmp = new THREE.Vector3();

  function requestRender() {
    if (!raf && !disposed) raf = requestAnimationFrame(render);
  }

  function fitCamera(yaw, pitch, cadT, w, h) {
    const dir = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
    const fit = box.clone();
    // Make room for level lines and their tags in the drawing
    if (cadT > 0) {
      const tagRoom = compact ? 0 : 15;
      const extra = new THREE.Box3(new THREE.Vector3(box.min.x - 5, box.min.y, box.min.z), new THREE.Vector3(box.max.x + 5 + tagRoom, box.max.y, box.max.z));
      fit.min.lerp(extra.min, cadT);
      fit.max.lerp(extra.max, cadT);
    }
    const c = fit.getCenter(new THREE.Vector3());
    camera.position.copy(c).addScaledVector(dir, 400);
    camera.up.set(0, 1, 0);
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

  function render() {
    raf = 0;
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    compact = w < 560;
    const size = renderer.getSize(new THREE.Vector2());
    if (size.x !== w || size.y !== h) renderer.setSize(w, h, false);

    const p = progress;
    const build = ease(seg(p, 0.03, 0.42));
    const turn = ease(seg(p, 0.42, 0.68));
    const cadT = ease(seg(p, 0.64, 0.86));

    // 1. Build-up
    const y0 = box.min.y - 0.3, y1 = box.max.y + 0.3;
    const cutY = lerp(y0, y1, build);
    cutBelow.constant = cutY;
    cutAbove.constant = -cutY;
    const cutVis = build > 0 && build < 1 ? 1 : 0;
    const sx = box.max.x - box.min.x + 6, sz = box.max.z - box.min.z + 6;
    cutGroup.scale.set(sx, 1, sz);
    cutGroup.position.set((box.min.x + box.max.x) / 2, cutY, (box.min.z + box.max.z) / 2);
    cutGroup.visible = cutVis > 0;
    ghostMat.opacity = 0.22 * (1 - seg(p, 0.36, 0.46));

    // 2. Camera: iso → straight-on front, orthographic throughout
    const yaw = THREE.MathUtils.degToRad(lerp(lerp(-52, -34, build), 0, turn));
    const pitch = THREE.MathUtils.degToRad(lerp(24, 0, turn));
    fitCamera(yaw, pitch, cadT, w, h);

    // 3. Shaded model → hidden-line drawing
    const bg = COL.bg3d.clone().lerp(COL.bgCad, cadT);
    renderer.setClearColor(bg);
    container.style.background = `#${bg.getHexString()}`;
    for (const m of surfaceMats) {
      m.opacity = m.userData.baseOpacity * (1 - cadT);
      m.colorWrite = cadT < 0.999; // stays in the depth buffer to hide back edges
    }
    ground.material.opacity = 0.18 * (1 - cadT);
    gradeAbove.constant = cadT > 0.5 ? 0.05 : 1e4;
    for (const e of edgeMats.values()) {
      e.solid.color.copy(COL.edge3d).lerp(e.cad, cadT);
      e.solid.opacity = lerp(0.5, 1, cadT);
      e.dashed.opacity = seg(cadT, 0.5, 1);
    }
    levelMat.opacity = cadT;
    if (hatch) hatch.material.opacity = cadT * 0.9;

    renderer.render(scene, camera);

    // HTML overlays
    for (const l of labels) {
      const [x, y] = toScreen(l.pos, w, h);
      l.el.style.opacity = cadT;
      l.el.querySelector(".n").style.display = compact ? "none" : "";
      l.el.style.fontSize = compact ? "9px" : "10px";
      // Narrow screens: elevation only, sitting on the line's right end
      l.el.style.transform = compact ? `translate(${x}px, ${y - 14}px) translateX(-100%)` : `translate(${x + 6}px, ${y - 13}px)`;
    }
    if (cutVis) {
      const [x, y] = toScreen(tmp.set(box.max.x + 3, cutY, box.max.z + 3), w, h);
      cutLabel.textContent = `▲ ${feetInches(cutY)}`;
      cutLabel.style.transform = `translate(${Math.min(x + 8, w - 90)}px, ${y - 11}px)`;
    }
    cutLabel.style.opacity = cutVis;
  }

  const ro = new ResizeObserver(requestRender);
  ro.observe(container);

  setModel(buildStandIn());
  const url = opts.modelUrl ?? CONFIG.model.url;
  if (url) loadGlb(url).then((m) => !disposed && setModel(m)).catch((err) => console.warn("model-to-cad: kept stand-in model,", err));

  return {
    setProgress(p) { progress = clamp01(p); requestRender(); },
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

// Ground for the BIM → CAD page and film: flat exterior paving a few inches below
// the door thresholds, over a block of earth. The earth is cut out where the
// basement is (so openings in the ground floor look down into it, not onto soil)
// and fills solid under the rest of the ground floor.
//
// Plan rectangles are { minX, maxX, minZ, maxZ } in world feet.

import * as THREE from "three";

let soil;
function soilTexture() {
  if (soil) return soil;
  const cv = document.createElement("canvas");
  cv.width = cv.height = 512;
  const ctx = cv.getContext("2d");
  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  ctx.fillStyle = "#7d6750";
  ctx.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 2) { // soil strata with a little grain
    const k = Math.sin(y * 0.055) * 10 + Math.sin(y * 0.016) * 14 + (rand() - 0.5) * 10;
    ctx.fillStyle = `rgba(${k > 0 ? "255,235,205" : "40,25,15"},${Math.min(0.22, Math.abs(k) / 90)})`;
    ctx.fillRect(0, y, 512, 2);
  }
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(30,20,10,${rand() * 0.25})`;
    ctx.fillRect(rand() * 512, rand() * 512, 1 + rand() * 3, 1 + rand());
  }
  soil = new THREE.CanvasTexture(cv);
  soil.colorSpace = THREE.SRGBColorSpace;
  soil.wrapS = soil.wrapT = THREE.RepeatWrapping;
  soil.repeat.set(1 / 16, 1 / 16); // extrusion UVs are in feet: one tile per 16 ft
  return soil;
}

// Rectangle with optional rectangular holes, extruded from y0 up to y1
function slab(rect, holes, y0, y1, materials) {
  const shape = new THREE.Shape();
  // Shape space is (x, -z): the mesh is turned so the extrusion runs up the y axis
  shape.moveTo(rect.minX, -rect.minZ);
  shape.lineTo(rect.maxX, -rect.minZ);
  shape.lineTo(rect.maxX, -rect.maxZ);
  shape.lineTo(rect.minX, -rect.maxZ);
  shape.closePath();
  for (const h of holes) {
    const p = new THREE.Path();
    p.moveTo(h.minX, -h.minZ);
    p.lineTo(h.minX, -h.maxZ);
    p.lineTo(h.maxX, -h.maxZ);
    p.lineTo(h.maxX, -h.minZ);
    p.closePath();
    shape.holes.push(p);
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: y1 - y0, bevelEnabled: false });
  const mesh = new THREE.Mesh(geo, materials);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y0;
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * site: outer plan rectangle; footprint: the house's outer walls; basement: the
 * basement's outer walls (or null). floorY: ground floor level; drop: how far the
 * paving sits below it (ft); bottom: underside of the earth block.
 */
export function buildTerrain({ site, footprint, basement, floorY = 0, drop = 7 / 12, pave = 0.5, slabUnderside = -0.5, bottom }) {
  const earthSide = new THREE.MeshStandardMaterial({ map: soilTexture(), roughness: 1 });
  const earthCap = new THREE.MeshStandardMaterial({ color: "#5c4a3a", roughness: 1 });
  const paveTop = new THREE.MeshStandardMaterial({ color: "#d2cdc2", roughness: 0.95 });
  const paveSide = new THREE.MeshStandardMaterial({ color: "#b9b3a6", roughness: 0.95 });

  const top = floorY - drop, under = top - pave;
  // A hole sharing an edge with its outline breaks the triangulation: keep it a hair inside
  const inset = (h, r) => h && { minX: Math.max(h.minX, r.minX + 0.02), maxX: Math.min(h.maxX, r.maxX - 0.02), minZ: Math.max(h.minZ, r.minZ + 0.02), maxZ: Math.min(h.maxZ, r.maxZ - 0.02) };
  basement = inset(basement, footprint);
  const g = new THREE.Group();
  g.name = "Terrain";
  // Paving ring around the house
  const paving = slab(site, [footprint], under, top, [paveTop, paveSide]);
  paving.name = "Terrain-paving";
  // Earth under the paving and the house, open where the basement is
  const earth = slab(site, basement ? [basement] : [], bottom, under, [earthCap, earthSide]);
  earth.name = "Terrain-earth";
  // Fill under the ground floor slab, outside the basement
  const fill = slab(footprint, basement ? [basement] : [], under, floorY + slabUnderside, [earthCap, earthSide]);
  fill.name = "Terrain-fill";
  g.add(earth, fill, paving);
  return g;
}

// Footprints from the wall meshes: the house's outer walls on the ground floor, and
// the basement's (walls below floorY - 2 ft)
export function footprintsFrom(wallMeshes, floorY = 0) {
  const ground = new THREE.Box3(), base = new THREE.Box3(), v = new THREE.Vector3();
  for (const m of wallMeshes) {
    m.updateMatrixWorld(true);
    const pos = m.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      if (v.y > floorY + 0.5 && v.y < floorY + 8) ground.expandByPoint(v);
      else if (v.y < floorY - 2) base.expandByPoint(v);
    }
  }
  return { footprint: rectOf(ground), basement: base.isEmpty() ? null : rectOf(base) };
}

// Plan rectangle of a Box3
export const rectOf = (b) => ({ minX: b.min.x, maxX: b.max.x, minZ: b.min.z, maxZ: b.max.z });

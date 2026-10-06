"""Convert a Revit IFC export into the .glb used by the BIM → CAD page.

    pip install ifcopenshell trimesh numpy
    python3 tools/ifc_to_glb.py path/to/model.ifc models/house.glb
    python3 tools/ifc_to_glb.py path/to/model.ifc film/house-elements.glb --per-element

Output is in feet, Y up. Geometry is merged per IFC class and colour, and every
mesh is named after its class (IfcWall, IfcWindow, ...) so the viewer can pick
CAD colours. With --per-element, each element keeps its own meshes (named
"<class>-<n>|<element id>") so the film can bring them in one by one. Only geometry and colours are written: no properties or metadata.
Prints the building storeys so they can be copied into CONFIG.levels.
"""

import multiprocessing
import sys
from collections import defaultdict

import ifcopenshell
import ifcopenshell.geom
import ifcopenshell.util.element
import numpy as np
import trimesh

FT = 0.3048
SKIP = {"IfcOpeningElement", "IfcSpace", "IfcSite", "IfcAnnotation", "IfcGrid"}

# Fillers for gaps in the Revit model, as (min, max) corners in output coordinates
# (feet, Y up). Michel-Menard: on the front wall, left of the entry, the lower wall
# stops at 8'-2 3/8" and the upper one starts at 8'-10 5/8", leaving an open slot
# under the cornice. Merged into the wall mesh so it renders as wall.
WALL_PATCHES = [
    ((4.06, 8.20, -21.717), (25.39, 8.89, -20.717)),
]


def is_external(element):
    psets = ifcopenshell.util.element.get_psets(element)
    return any(p.get("IsExternal") is True for p in psets.values())


def main(src, dst, per_element=False):
    model = ifcopenshell.open(src)

    settings = ifcopenshell.geom.settings()
    settings.set("use-world-coords", True)
    settings.set("apply-default-materials", True)

    shapes = []
    it = ifcopenshell.geom.iterator(settings, model, multiprocessing.cpu_count())
    if it.initialize():
        while True:
            shape = it.get()
            element = model.by_id(shape.id)
            if element.is_a() not in SKIP:
                g = shape.geometry
                v = np.array(g.verts, dtype=np.float64).reshape(-1, 3) / FT
                v = v[:, [0, 2, 1]] * [1, 1, -1]  # Z up → Y up
                f = np.array(g.faces, dtype=np.int64).reshape(-1, 3)
                shapes.append((element, v, f, np.array(g.material_ids, dtype=np.int64), g.materials))
            if not it.next():
                break

    # Outer wall line (plan bounding box of all walls), used to tell exterior doors
    # from interior ones when Revit didn't export the IsExternal flag.
    wall_v = np.vstack([v for e, v, *_ in shapes if e.is_a().startswith("IfcWall")])
    env_lo, env_hi = wall_v.min(0), wall_v.max(0)

    def on_envelope(v, tol=1.5):
        lo, hi = v.min(0), v.max(0)
        return any(lo[a] - env_lo[a] < tol or env_hi[a] - hi[a] < tol for a in (0, 2))

    groups = defaultdict(lambda: {"v": [], "f": [], "n": 0})
    for element, v, f, mids, mats in shapes:
        cls = element.is_a()
        # Doors are split into exterior / interior: the viewer only outlines
        # exterior ones on the elevation.
        if cls == "IfcDoor" and (is_external(element) or on_envelope(v)):
            cls = "IfcDoor-ext"
        for mi in np.unique(mids):
            m = mats[mi] if 0 <= mi < len(mats) else None
            rgb = tuple(round(c, 3) for c in m.diffuse.components) if m else (0.7, 0.7, 0.7)
            t = m.transparency if m and m.transparency == m.transparency else 0  # NaN → opaque
            alpha = round(1 - t, 3)
            sel = f[mids == mi]
            used, inv = np.unique(sel, return_inverse=True)
            grp = groups[(cls, rgb, alpha, element.id() if per_element else 0)]
            grp["v"].append(v[used])
            grp["f"].append(inv.reshape(-1, 3) + grp["n"])
            grp["n"] += len(used)
    count = len(shapes)

    walls = max((k for k in groups if k[0] == "IfcWallStandardCase"), key=lambda k: groups[k]["n"], default=None)
    for k, (lo, hi) in enumerate(WALL_PATCHES if walls else []):
        b = trimesh.creation.box(bounds=[lo, hi])
        grp = groups[walls[:3] + (f"patch{k}",)] if per_element else groups[walls]
        grp["v"].append(b.vertices)
        grp["f"].append(b.faces + grp["n"])
        grp["n"] += len(b.vertices)

    scene = trimesh.Scene()
    for i, ((cls, rgb, alpha, eid), grp) in enumerate(sorted(groups.items(), key=lambda kv: tuple(map(str, kv[0])))):
        mesh = trimesh.Trimesh(np.vstack(grp["v"]), np.vstack(grp["f"]), process=True)
        color = [int(c * 255) for c in rgb] + [int(alpha * 255)]
        mesh.visual = trimesh.visual.TextureVisuals(
            material=trimesh.visual.material.PBRMaterial(
                name=f"{cls}-{i}", baseColorFactor=color, metallicFactor=0.0, roughnessFactor=0.85,
                alphaMode="BLEND" if alpha < 0.99 else "OPAQUE",
            )
        )
        name = f"{cls}-{i}|{eid}" if per_element else f"{cls}-{i}"
        scene.add_geometry(mesh, node_name=name, geom_name=name)
    scene.export(dst)

    lo, hi = scene.bounds
    print(f"{count} elements → {len(groups)} meshes, bounds (ft): {lo.round(2)} → {hi.round(2)}")
    for s in sorted(model.by_type("IfcBuildingStorey"), key=lambda s: s.Elevation or 0):
        print(f'  {{ name: "{s.Name}", ft: {s.Elevation:.4f} }},')


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], per_element="--per-element" in sys.argv[3:])

"""Cut the AutoCAD DWF sheet into the drawings used by the page, as SVG.

    python3 tools/dwf_to_svg.py path/to/Michel-Menard.dwf drawings/

Writes one SVG per view in VIEWS plus drawings.json, which pins each drawing to
the 3D model: for three corners of the SVG it gives the matching point in the
model's .glb coordinates (feet, Y up), so the viewer can lay the drawing exactly
over the model from any orthographic camera.

Sheet coordinates come from the W2D stream (16.613 units per foot on this
sheet). The anchors below were measured on the sheet: the roof apex, the level
lines and the outer walls, matched against the same points in house.glb.
"""

import json
import math
import os
import sys
import zipfile
from collections import defaultdict

from w2d import W2D

SHEET_X0 = 2147470000  # sheet x values are offset by this
HATCH_LAYERS = {"A-HATCH", "A-DETL-GENF"}  # wall/block grid and earth hatch
HATCH_OPACITY = 0.38
S = 16.613              # sheet units per foot
APEX = (0.342, 36.116, 3.318)  # roof apex in house.glb (x, y, z)

VIEWS = {
    # Front elevation (dormer + double door). Sheet X grows to the model's -x.
    # A-WALL and A-GENM are clipped at grade and C-TOPO (a grade line) left out:
    # footing lines, break marks and a stray line ran through or past the earth hatch.
    "elevation": {
        "region": (5470, 3900, 6720, 5010),
        "skip_layers": {"C-TOPO"},
        "layer_regions": {"A-WALL": (5470, 4372, 6720, 5010), "A-GENM": (5470, 4370, 6720, 5010)},
        "glb": lambda X, Y: (APEX[0] - (X - 6107) / S, (Y - 4377) / S, -23.0),
    },
    # Ground floor plan, front at the top. Sheet X grows to +x, Y to -z.
    # A-NOTE holds the section marks and their cut lines, which run off the plan.
    # A-DETL-HDLN (a dashed hidden line through the left room) and A-DETL-THIN (a
    # lone square next to it) are left out, and so are two stray A-WALL stubs
    # above the front wall.
    "plan": {
        "region": (4440, 2560, 5460, 3480),
        "skip_layers": {"A-NOTE", "A-DETL-HDLN", "A-DETL-THIN"},
        "drop": [("A-WALL", (4440, 3460, 5460, 3480))],
        "glb": lambda X, Y: (APEX[0] + (X - 4973) / S, 0.0, APEX[2] - (Y - 3017) / S),
    },
    # Building section through the dormer, front on the left. Sheet X grows to +z.
    "section": {
        "region": (4300, 960, 5470, 1810),
        "glb": lambda X, Y: (APEX[0], (Y - 1174) / S, APEX[2] + (X - 4909) / S),
        "cut_x": APEX[0],
    },
}


def clip_segment(a, b, box):
    """Liang–Barsky clip of segment ab to box (x0, y0, x1, y1)."""
    x0, y0, x1, y1 = box
    (ax, ay), (bx, by) = a, b
    dx, dy = bx - ax, by - ay
    t0, t1 = 0.0, 1.0
    for p, q in ((-dx, ax - x0), (dx, x1 - ax), (-dy, ay - y0), (dy, y1 - ay)):
        if p == 0:
            if q < 0:
                return None
        else:
            t = q / p
            if p < 0:
                t0 = max(t0, t)
            else:
                t1 = min(t1, t)
            if t0 > t1:
                return None
    return (ax + t0 * dx, ay + t0 * dy), (ax + t1 * dx, ay + t1 * dy)


def inside(p, box):
    return box[0] <= p[0] <= box[2] and box[1] <= p[1] <= box[3]


def drop_slope_tags(prims):
    """Remove roof-slope tags ("12/12" on A-NOTE) and their arrows: short diagonal
    strokes and small arrowheads right next to the label. The shingle hatch is made
    of horizontal and vertical strokes, so it is left alone."""
    tags = [p.points[0] for p in prims if p.kind == "text" and p.layer == "A-NOTE" and "/12" in p.data[2]]

    def near_tag(p):
        return any(all(math.dist(q, t) < 130 for q in p.points) for t in tags)

    def near(p, r):
        return any(all(math.dist(q, t) < r for q in p.points) for t in tags)

    def slope_mark(p):
        if p.kind == "text":
            return p.layer == "A-NOTE"
        if p.kind == "tri":  # arrowhead
            xs = [q[0] for q in p.points]; ys = [q[1] for q in p.points]
            return max(xs) - min(xs) < 14 and max(ys) - min(ys) < 14
        if p.kind in ("line", "poly") and len(p.points) == 2:
            (ax, ay), (bx, by) = p.points
            length = math.dist(p.points[0], p.points[1])
            sloped = abs(bx - ax) > 2 and abs(by - ay) > 2
            if sloped:  # the arrow, parallel to the roof it labels, and its short ticks
                return length < 110 and p.layer in ("A-ROOF", "A-NOTE", "A-DETL-THIN")
            return p.layer == "A-ROOF" and length < 25 and near(p, 60)  # its little tick
        return False

    return [p for p in prims if not (near_tag(p) and slope_mark(p))]


def write_svg(prims, box, path, layer_regions=None):
    X0, Y0, X1, Y1 = box
    layer_regions = layer_regions or {}
    W, H = X1 - X0, Y1 - Y0
    sx = lambda X: round(X - X0, 1)
    sy = lambda Y: round(Y1 - Y, 1)
    hexc = lambda c: "#%02x%02x%02x" % c

    strokes = defaultdict(list)  # (colour, heavy, faint) → path segments
    fills = defaultdict(list)
    texts = []
    for p in prims:
        pts = [(X - SHEET_X0, Y) for X, Y in p.points]
        col = hexc(p.color)
        heavy = p.weight > 0
        faint = p.layer in HATCH_LAYERS
        if p.kind in ("line", "poly") and not (p.kind == "poly" and p.fill):
            for a, b in zip(pts, pts[1:]):
                seg = clip_segment(a, b, layer_regions.get(p.layer, box))
                if seg:
                    (ax, ay), (bx, by) = seg
                    # roof shingles: the many short strokes on A-ROOF
                    hatch = faint or (p.layer == "A-ROOF" and math.dist(a, b) < 40)
                    strokes[(col, heavy, hatch)].append(f"M{sx(ax)} {sy(ay)}L{sx(bx)} {sy(by)}")
        elif p.kind == "poly" and p.fill and len(pts) > 2:
            if all(inside(q, box) for q in pts):
                fills[col].append("M" + "L".join(f"{sx(x)} {sy(y)}" for x, y in pts) + "Z")
        elif p.kind == "tri":
            if all(inside(q, box) for q in pts):
                for t in range(len(pts) - 2):
                    a, b, c = pts[t:t + 3]
                    fills[col].append(f"M{sx(a[0])} {sy(a[1])}L{sx(b[0])} {sy(b[1])}L{sx(c[0])} {sy(c[1])}Z")
        elif p.kind == "arc":
            (cx, cy), (r, a0, a1) = pts[0], p.data
            if not inside((cx, cy), box) or r <= 0:
                continue
            full = a0 == a1
            t0 = a0 / 65536 * 2 * math.pi
            t1 = a1 / 65536 * 2 * math.pi if not full else t0 + 2 * math.pi
            if t1 <= t0:
                t1 += 2 * math.pi
            steps = 2 if full else 1
            d = f"M{sx(cx + r * math.cos(t0))} {sy(cy + r * math.sin(t0))}"
            for k in range(1, steps + 1):
                t = t0 + (t1 - t0) * k / steps
                large = 1 if (t1 - t0) / steps > math.pi else 0
                d += f"A{r} {r} 0 {large} 0 {sx(cx + r * math.cos(t))} {sy(cy + r * math.sin(t))}"
            strokes[(col, heavy, False)].append(d)
        elif p.kind == "text":
            (x, y), (h, rot, text) = pts[0], p.data
            if inside((x, y), box):
                deg = -rot / 65536 * 360
                tr = f' transform="rotate({round(deg, 2)} {sx(x)} {sy(y)})"' if deg else ""
                esc = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                texts.append(f'<text x="{sx(x)}" y="{sy(y)}" font-size="{h}" fill="{col}"{tr}>{esc}</text>')

    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
           '<g fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">']
    for col, segs in fills.items():
        out.append(f'<path fill="{col}" stroke="{col}" stroke-width="0.6" vector-effect="non-scaling-stroke" d="{"".join(segs)}"/>')
    # Hatches first and faint, so outlines, openings and level lines read on top
    for (col, heavy, faint), segs in sorted(strokes.items(), key=lambda kv: not kv[0][2]):
        op = f' stroke-opacity="{HATCH_OPACITY}"' if faint else ""
        out.append(f'<path stroke="{col}" stroke-width="{1.6 if heavy else 1}"{op} vector-effect="non-scaling-stroke" d="{"".join(segs)}"/>')
    out.append("</g>")
    if texts:
        out.append('<g font-family="Arial, Helvetica, sans-serif">' + "".join(texts) + "</g>")
    out.append("</svg>")
    with open(path, "w") as f:
        f.write("\n".join(out))
    return W, H


def main(dwf, outdir):
    with zipfile.ZipFile(dwf) as z:
        name = next(n for n in z.namelist() if n.lower().endswith(".w2d"))
        sheet = W2D(z.read(name)).run()

    os.makedirs(outdir, exist_ok=True)
    meta = {}
    for key, view in VIEWS.items():
        box = view["region"]
        skip = view.get("skip_layers", set())
        drop = view.get("drop", [])
        dropped = lambda p: any(p.layer == layer and all(inside((X - SHEET_X0, Y), b) for X, Y in p.points) for layer, b in drop)
        mine = drop_slope_tags([p for p in sheet.prims if p.points and p.layer not in skip and not dropped(p)])
        W, H = write_svg(mine, box, os.path.join(outdir, f"{key}.svg"), view.get("layer_regions", {}))
        X0, Y0, X1, Y1 = box
        to_glb = view["glb"]
        meta[key] = {
            "src": f"drawings/{key}.svg",
            "width": W,
            "height": H,
            # SVG top-left, top-right and bottom-left corners in house.glb coordinates
            "a": [round(v, 4) for v in to_glb(X0, Y1)],
            "b": [round(v, 4) for v in to_glb(X1, Y1)],
            "c": [round(v, 4) for v in to_glb(X0, Y0)],
        }
        if "cut_x" in view:
            meta[key]["cutX"] = view["cut_x"]
        size = os.path.getsize(os.path.join(outdir, f"{key}.svg"))
        print(f"{key}: {W}×{H} units, {size // 1024} KB")
    with open(os.path.join(outdir, "drawings.json"), "w") as f:
        json.dump(meta, f, indent=2)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

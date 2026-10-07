"""Convert the laser scan (.laz) into the compact point file used by the film.

    pip install laspy lazrs numpy
    python3 tools/scan_to_web.py path/to/scan.laz film/scan.bin

The scan is moved into the model's coordinates (feet, Y up, same as house.glb),
thinned to one point per VOXEL, and written as:

    film/scan.bin   int16 x, y, z per point, then one uint8 shade per point
    film/scan.json  point count, and the scale and offset that turn the int16
                    values back into feet

The shade is the scan's grey value, levelled, times a fixed light from the
scan's own normals, so the points read as surfaces without lighting at runtime.
"""

import json
import os
import sys

import laspy
import numpy as np

FT = 0.3048
VOXEL = 0.012  # metres

# Scan (metres, Z up) → model (metres, Y up). Found by registering the scan's
# walls, floors and roof against the Revit model: same plan orientation as the
# IFC (its Y flips to -Z), floors 1.605 m apart.
#   model x =  scan x - 0.00104 scan y + 5.7962
#   model z = -0.00104 scan x - scan y - 7.6619
#   model y =  scan z + 1.6054
R = np.array([[0.999999, -0.001039], [-0.001039, -0.999999]])
T = np.array([5.7962, -7.6619])
DY = 1.6054

# Light baked into the shade, in model coordinates (the film's sun, which sits
# at (-60, 85, 110) in the film's world, after its 180° turn)
LIGHT = np.array([60.0, 85.0, -110.0])
LIGHT /= np.linalg.norm(LIGHT)


def main(src, dst):
    f = laspy.read(src)
    p = np.vstack([f.x, f.y, f.z]).T
    xz = p[:, :2] @ R.T + T
    pts = np.c_[xz[:, 0], p[:, 2] + DY, xz[:, 1]]

    dims = f.point_format.dimension_names
    if "NormalX" in dims:
        n = np.vstack([f.NormalX, f.NormalY, f.NormalZ]).T
        nxz = n[:, :2] @ R.T
        nrm = np.c_[nxz[:, 0], n[:, 2], nxz[:, 1]]
        lit = 0.4 + 0.6 * np.abs(nrm @ LIGHT)
    else:
        lit = np.full(len(pts), 0.8)
    if "red" in dims:
        grey = (np.asarray(f.red, float) + f.green + f.blue) / 3
    else:
        grey = np.asarray(f.intensity, float)
    lo, hi = np.percentile(grey, [2, 99.5])
    grey = np.clip((grey - lo) / (hi - lo), 0, 1) ** 0.7
    shade = 0.25 + 0.75 * grey * lit

    # One point per voxel
    key = np.floor(pts / VOXEL).astype(np.int64)
    _, keep = np.unique(key, axis=0, return_index=True)
    keep.sort()
    pts, shade = pts[keep] / FT, shade[keep]

    lo, hi = pts.min(0), pts.max(0)
    offset = (lo + hi) / 2
    scale = (hi - lo).max() / 2 / 32000
    q = np.round((pts - offset) / scale).astype(np.int16)
    with open(dst, "wb") as out:
        out.write(q.tobytes())
        out.write(np.round(shade * 255).astype(np.uint8).tobytes())
    meta = {"count": len(q), "scale": scale, "offset": offset.round(4).tolist()}
    with open(os.path.splitext(dst)[0] + ".json", "w") as out:
        json.dump(meta, out, indent=2)
    print(f"{len(p)} points → {len(q)} kept, {os.path.getsize(dst) / 1e6:.1f} MB, bounds (ft) {lo.round(2)} → {hi.round(2)}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

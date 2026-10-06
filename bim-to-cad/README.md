# BIM → CAD scroll presentation

A standalone page, separate from the main portfolio. As the visitor scrolls:

1. **BIM model**: the building rises from the basement to the ridge, cut by a moving section plane. A faint outline shows what's still to come.
2. **Orthographic view**: the camera turns from an isometric view to a straight-on orthographic front view.
3. **Drafting**: the shaded model dissolves into hidden-line CAD linework. Windows are cyan, doors yellow, hidden lines below grade are dashed, and dashed level lines carry level tags, all on a dark AutoCAD-style background.

The page shows the Michel-Menard Revit model, exported as IFC and converted to a web model. If the model can't load, a stand-in house built in code is shown instead.

| File | Purpose |
|---|---|
| `index.html` | The page: intro, scroll track, captions, FR/EN toggle |
| `model-to-cad.js` | three.js viewer: section cut, camera, CAD look, level tags |
| `models/Michel-Menard.ifc` | Source model, exported from Revit 2025 (IFC 2x3 Coordination View 2.0) |
| `models/house.glb` | Web model generated from the IFC (feet, Y up, ~7 MB) |
| `tools/ifc_to_glb.py` | IFC → `house.glb` converter |

Once GitHub Pages publishes it, the page is at `…/portfolio/bim-to-cad/`. Locally, run `python3 -m http.server` from the repo root and open `http://localhost:8000/bim-to-cad/`. Opening the HTML file directly with `file://` won't work, because browsers block ES modules there.

## Updating the model

1. In Revit, open the 3D view, go to *File → Export → IFC* and pick **IFC 2x3 Coordination View 2.0**. Under *Modify setup*, check *Export only elements visible in view*, leave *Export rooms… in 3D views* unchecked, and set the level of detail to *High*.
2. Convert it:
   ```
   pip install ifcopenshell trimesh numpy
   python3 tools/ifc_to_glb.py models/Michel-Menard.ifc models/house.glb
   ```
   The script prints the building storeys. Copy any you want drawn into `CONFIG.levels` in `model-to-cad.js`. `side: "left"` puts a tag on the left end of its line, for levels too close to their neighbours.
3. If the end view isn't the main facade, change `CONFIG.model.yawDeg` (0, 90, 180 or -90). You can try values without editing by adding `?yaw=90` to the page URL.

How the converter output is used:
- Geometry is merged per IFC class and colour. Each mesh is named after its class (`IfcWall…`, `IfcWindow…`, `IfcDoor-ext…`), and the viewer picks CAD colours from those names: windows and curtain panels cyan, doors yellow, everything else white.
- Doors on the outer wall line become `IfcDoor-ext`. Interior doors, fixtures and furniture are shaded in 3D but get no drawn edges, so the elevation only shows what a real elevation would.
- Only geometry and colours go into the `.glb`; IFC properties and metadata don't.

Any other `.glb` can be previewed with `?model=path/to/file.glb`. For a file that isn't in feet at true elevations, set `CONFIG.model.feet = false` and the model is scaled between `bottomFt` and `topFt`.

## Tuning

- **Timing:** in `render()` in `model-to-cad.js`, `seg(p, 0.03, 0.42)` is the build-up, `seg(p, 0.42, 0.68)` the camera turn and `seg(p, 0.64, 0.86)` the CAD fade. The caption thresholds in `index.html` (`0.42`, `0.66`) should follow them.
- **Scroll length:** `.track { height: 380vh }` in `index.html` (300vh on phones). Longer means slower.
- **Colours:** `COL` and `CAD` at the top of `model-to-cad.js`.

# BIM → CAD scroll presentation

A standalone page, separate from the main portfolio. As the visitor scrolls:

1. **BIM model**: the building rises from the basement to the ridge, cut by a moving section plane. A faint outline shows what's still to come.
2. **Orthographic view**: the camera turns from an isometric view to a straight-on orthographic front view.
3. **Drafting**: the shaded model dissolves into hidden-line CAD linework. Windows are cyan, doors yellow, eaves magenta, hidden lines below grade are dashed, and dashed level lines carry level tags, all on a dark AutoCAD-style background.

Until a real model is added, the page shows a stand-in house built in code. It matches the levels from the Revit/AutoCAD drawings: basement −9'‑1", 1st floor 0'‑0", ridge 36'‑1 3/8".

| File | Purpose |
|---|---|
| `index.html` | The page: intro, scroll track, captions, FR/EN toggle |
| `model-to-cad.js` | three.js viewer: stand-in model, section cut, camera, CAD look |
| `models/` | Put your exported `.glb` here |

Once GitHub Pages publishes it, the page is at `…/portfolio/bim-to-cad/`. Locally, run `python3 -m http.server` from the repo root and open `http://localhost:8000/bim-to-cad/`. Opening the HTML file directly with `file://` won't work, because browsers block ES modules there.

## Using the real Revit model

### 1. Export a .glb

**Option A: through Blender (free, reliable)**
1. In Revit, open a 3D view. Hide anything you don't want shown (furniture, the site, interior detail) with *Hide in View* or a section box.
2. Go to *File → Export → FBX* and save `house.fbx`.
3. In Blender, go to *File → Import → FBX* and pick `house.fbx`.
4. Go to *File → Export → glTF 2.0* and set **Format: glTF Binary (.glb)**. Leave **+Y Up** checked.
5. Save the file as `bim-to-cad/models/house.glb`.

**Option B:** a free glTF exporter add-in for Revit (search "glTF" on the Autodesk App Store) exports `.glb` straight from Revit.

Aim for a file under about 20 MB so it loads quickly. Leaving out interiors and furniture is usually enough.

### 2. Preview it
Open `…/bim-to-cad/?model=models/house.glb`. The `?model=` parameter loads any `.glb` without editing code.

### 3. Make it the default
In `model-to-cad.js`, edit `CONFIG`:

```js
model: {
  url: "models/house.glb",
  bottomFt: -9.083, // lowest point of the model (bottom of basement), in feet
  topFt: 37.6,      // highest point (top of chimneys / vents), in feet
  yawDeg: 0,        // turn the model if the end view isn't the main facade: try 90, 180, -90
},
levels: [ /* name + elevation in feet, as on the drawings */ ],
```

The viewer rescales the model so its lowest and highest points match `bottomFt` and `topFt`, whatever units the exporter used. With those two numbers right, the level lines land on the model.

**Line colours** on a real model come from object and material names: `glass`, `window` or `fenêtre` → cyan; `door` or `porte` → yellow; `fascia`, `gutter` or `eave` → magenta; everything else → white. Edit `guessCad()` in `model-to-cad.js` to change these rules.

## Tuning

- **Timing:** in `render()` in `model-to-cad.js`, `seg(p, 0.03, 0.42)` is the build-up, `seg(p, 0.42, 0.68)` the camera turn and `seg(p, 0.64, 0.86)` the CAD fade. The caption thresholds in `index.html` (`0.42`, `0.66`) should follow them.
- **Scroll length:** `.track { height: 380vh }` in `index.html` (300vh on phones). Longer means slower.
- **Colours:** `COL` and `CAD` at the top of `model-to-cad.js`.

# BIM → CAD scroll presentation

A standalone page, separate from the main portfolio. As the visitor scrolls, the Revit model turns into each deliverable, ending on the actual AutoCAD drawings:

1. **BIM model**: the building rises from the basement to the ridge, cut by a moving section plane. A faint outline of the whole model, interior included, shows what's still to come.
2. **Floor plan**: the cut drops to 4 ft and the camera tilts to look straight down. The model blends into the ground floor plan drawing.
3. **Section**: the camera turns to the side and a vertical section plane walks through the house. It stops on the section line, where the model blends into the building section drawing.
4. **Elevation**: the camera faces the front and the model blends into the hatched front elevation.

The model sits on flat exterior paving 7" below the door thresholds, over a block of earth (`terrain.js`, shared with the film). The Revit site pad is hidden in favour of it. The earth is cut out around the basement, so the stair opening looks down into the basement. Like the model, it fills in during the build-up, opens in section, and hides the basement in the front view, as the drawing's earth hatch does. Everything inside the house (interior walls, doors, fixtures, furniture, ceilings, stairs) is one neutral grey, so the envelope reads first.

The drawings are the real AutoCAD sheet, converted to vector SVG and pinned to the model, so each one lands exactly on top of it. If the model or the drawings can't load, the page falls back to a stand-in house and generated linework: build-up, turn to the front, and a CAD-style elevation with level tags.

| File | Purpose |
|---|---|
| `index.html` | The page: intro, scroll track, captions, FR/EN toggle |
| `model-to-cad.js` | three.js viewer: cuts, camera, drawing overlays, timeline |
| `terrain.js` | Paving and earth around the house (used by the page and the film) |
| `models/Michel-Menard.ifc` | Source model, exported from Revit 2025 (IFC 2x3 Coordination View 2.0) |
| `models/house.glb` | Web model generated from the IFC (feet, Y up, ~7 MB) |
| `film/` | The same story as a rendered video (see below) |
| `drawings/*.svg`, `drawings/drawings.json` | Plan, section and elevation from the AutoCAD sheet, with their anchors on the model |
| `tools/ifc_to_glb.py` | IFC → `house.glb` converter (`--per-element` for the film) |
| `tools/dwf_to_svg.py`, `tools/w2d.py` | DWF sheet → drawing SVGs (includes a small decoder for the DWF's W2D vector stream) |
| `tools/scan_to_web.py` | Laser scan (.laz) → `film/scan.bin`, aligned to the model |

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
- The site pad (any proxy wider than 60 ft) becomes `Site`; the viewers hide it and draw their own paving.
- Doors on the outer wall line become `IfcDoor-ext`. Interior doors, fixtures and furniture are shaded in 3D but get no drawn edges, so the elevation only shows what a real elevation would.
- Only geometry and colours go into the `.glb`; IFC properties and metadata don't.
- `WALL_PATCHES` in the converter fills gaps in the Revit model. Right now there's one: on the front wall, left of the entry, the lower wall stops at 8'-2 3/8" and the upper wall starts at 8'-10 5/8", which left an open slot under the cornice. Once the wall constraints are fixed in Revit, the patch can be removed.

Any other `.glb` can be previewed with `?model=path/to/file.glb`. For a file that isn't in feet at true elevations, set `CONFIG.model.feet = false` and the model is scaled between `bottomFt` and `topFt`.

## Updating the drawings

1. In AutoCAD, publish the model space to DWF (*Publish → DWF*, or *Plot → DWF6 ePlot.pc3*).
2. Convert it:
   ```
   python3 tools/dwf_to_svg.py path/to/Michel-Menard.dwf drawings/
   ```
3. `VIEWS` in `tools/dwf_to_svg.py` says where each view sits on the sheet, which layers to leave out or clip (the plan drops `A-NOTE`, the section marks and their long cut lines, plus a stray hidden line, square and wall stubs, using `drop` for clean-ups inside one layer; the elevation drops `C-TOPO` and clips `A-WALL` and `A-GENM` at grade; roof-slope tags such as "12/12" and their arrows are removed everywhere; hatch layers, and the short shingle strokes on `A-ROOF`, are drawn at reduced opacity so the outlines lead), and how each view maps onto the model. The mapping uses the sheet scale (16.613 units per foot), the roof apex, and the ground floor level line of each view. If the sheet layout changes, update the `region` boxes and those reference points; the comments in the file explain each one. `cut_x` is where the section plane stops, the section line in model coordinates.

The DWF itself isn't kept in the repo. Its metadata includes local project folder paths, while the SVGs only carry the drawing.

## Video

`film/` is a timed version of the presentation (about 42 s, 1920×1080): scan → BIM model → drawings, in one continuous move on a dark stage with no holds. It can be recorded two ways:

- **In your browser, in real time (fastest):** open `…/bim-to-cad/film/` (add `?lang=fr` for French). The player has play/pause (space), a scrubber, frame stepping (← →) and fullscreen (f). **● Record** plays the film once and saves the tab as a video, MP4 or WebM depending on the browser. Go fullscreen on a 1080p-or-larger screen first for a full-resolution file. OBS or any screen recorder works too.
- **Frame by frame, headless (slow, exact 30 fps):** `film/render.mjs`, see below.

The film covers:

1. **0–9 s:** the camera glides along the front wall while the laser scan appears in a wave from the front corner.
2. **4.5–12 s:** gold linework of the BIM model traces over the scan, and level lines run out past the house.
3. **9.5–15 s:** the model takes over from the scan behind a gold front, as the camera pulls back.
4. **16–19.5 s:** the camera swings square to the front while the perspective flattens: the field of view closes and the framing stays. The shaded model drops away and leaves a hidden-line drawing, which turns white.
5. **19.5–24 s:** the actual AutoCAD elevation takes over from the 3D linework.
6. **24–34.5 s:** the drawings as sheets, white on dark. The elevation slides into a row, and the section and the plan draw themselves in as the row moves on.
7. **34.5–42 s:** the row pulls back to show all three, then the end card.

### The scan

`film/scan.bin` and `film/scan.json` hold the laser scan (1.6 M points, about 11 MB), already moved into the model's coordinates:

```
pip install laspy lazrs numpy
python3 tools/scan_to_web.py path/to/scan.laz film/scan.bin
```

The transform from the scan's coordinates (metres, Z up) to the model's is at the top of `tools/scan_to_web.py`. It was found by registering the scan's walls, floors and roof against the Revit model; the scan's floors sit 1.605 m below the model's levels. A new scan from the same project (same registration) can reuse it; a scan in other coordinates needs a new one. The points are drawn grey, shaded from their normals with the film's sun baked in, since this scan has no photo colour. Thinning in CloudCompare before exporting keeps the file small; the converter also keeps at most one point per 1.2 cm.

The drawings are shown monochrome by CSS in `film/index.html` (strokes white, solid fills grey, hatches faint), so the SVGs themselves keep their AutoCAD colours.

| File | Purpose |
|---|---|
| `film/index.html`, `film/film.js` | The film; `window.film.render(t)` draws the frame at `t` seconds. Open `film/?t=12` to preview a moment. |
| `film/house-elements.glb` | The model with one mesh per element, which the film outlines and shades piece by piece (`python3 tools/ifc_to_glb.py models/Michel-Menard.ifc film/house-elements.glb --per-element`) |
| `film/scan.bin`, `film/scan.json` | The laser scan, in the model's coordinates (see above) |
| `film/player.js` | Real-time player and in-browser recorder (inactive when render.mjs drives the page) |
| `film/render.mjs` | Renders every frame with Playwright and pipes them to ffmpeg (libx264) |

```
python3 -m http.server 8000      # from the repo root
node bim-to-cad/film/render.mjs --url http://localhost:8000/bim-to-cad/film/ --out film.mp4 [--lang fr] [--step 4]
```

`--lang fr` renders the French captions; `--step 4` renders every 4th frame for a quick preview.

## Tuning

- **Timing:** `tourState()` in `model-to-cad.js` holds the scroll ranges for each move (build-up, plan, section, elevation); `stage()` below it maps them to captions. `legacyState()` is the fallback timeline.
- **Plan cut height:** `CONFIG.planCutFt` (4 ft).
- **Scroll length:** `.track { height: 560vh }` in `index.html` (440vh on phones). Longer means slower.
- **Colours:** `COL` and `CAD` at the top of `model-to-cad.js`.

# Lythos LE

<ProductHero id="le" />

**Limit equilibrium slope stability** in pure Python, with a browser front end. Lythos LE computes the factor of safety of slopes and embankments with the method of slices — the same class of analysis as Rocscience Slide or GeoStudio SLOPE/W. It searches for the critical slip surface, reports every classical method on it, and draws the section in the browser.

- **No dependencies.** The solver, the web server and the front end are standard library and vanilla JavaScript. `python -m lythosle serve` works on a bare Python 3.9+ install with nothing to `pip install`.
- **Eight methods**, from Fellenius to Morgenstern-Price, all built on one slice formulation — the differences between them are the assumptions, not the code.
- **Validated** against closed-form solutions, Taylor's stability numbers and the ACADS benchmark problem.

## What it does

| | |
| --- | --- |
| **Methods** | Ordinary (Fellenius), Bishop simplified, Janbu simplified and corrected, Corps of Engineers #1, Lowe-Karafiath, Spencer, Morgenstern-Price (half-sine, constant or trapezoidal interslice function) |
| **Surfaces** | Circular (grid-and-tangent search with adaptive box and refinement), a single specified circle, a user-defined non-circular surface, and non-circular optimisation from the critical circle |
| **Strength** | Effective stress (c′, φ′), undrained (s<sub>u</sub>, optionally increasing linearly with depth), impenetrable and no-strength materials |
| **Groundwater** | Piezometric water table, per-material pore pressure ratio r<sub>u</sub>, separate saturated unit weights, ponded water on the slope |
| **Loading** | Surface surcharges, pseudo-static k<sub>h</sub> and k<sub>v</sub>, reinforcement (nails, anchors, geosynthetics), tension cracks with optional water pressure |
| **Output** | Factor of safety per method, the critical surface, a full slice force table (CSV), the λ–FS plot for Spencer/Morgenstern-Price, the search grid, JSON for everything |

## Screenshots

<Gallery :items="[
  { src: '/img/le/screenshot-light.png', caption: 'Browser interface — light theme' },
  { src: '/img/le/screenshot-dark.png', caption: 'Browser interface — dark theme' }
]" />

## Quick start

```bash
pip install lythosle

lythosle serve --open         # browser interface on http://127.0.0.1:8000
lythosle example              # list the built-in examples
lythosle example homogeneous  # run one and print the report
```

Or straight from a clone, with nothing installed at all:

```bash
git clone https://github.com/hdaltuntas/lythosle
cd lythosle
python main.py                         # same interface
python main.py example homogeneous     # same commands
python -m unittest discover -s tests   # run the test suite
```

`HOST` and `PORT` override the address. If you prefer FastAPI, `uvicorn lythosle.web.app:app` serves exactly the same API.

## The browser interface

Build the geometry from a template or by typing coordinates, set up materials, groundwater and loading in the sidebar, then **Run analysis** (or Ctrl/Cmd + Enter). The section view shows the layers, the phreatic surface, the critical surface with its centre of rotation, the search grid coloured by factor of safety, the slices and the reinforcement. Results export as SVG, CSV and JSON. `?example=layered_water` and `?theme=dark` work as URL parameters.

The fonts (Inter and Newsreader) are bundled; nothing is fetched from a CDN at runtime, and the page looks the same offline.

## Next steps

- [Examples](./examples) — the six built-in examples, the command line, the Python API and a staged fill.
- [Reference](./reference) — model format, formulation, validation and limitations.

---
title: "LythosFEA — 2D finite element analysis of slopes and excavations"
description: "LythosFEA: open-source 2D finite element software for slopes, embankments and deep excavations. Strength reduction factor of safety, staged construction, DXF import."
---

# LythosFEA

<ProductHero id="fea" />

2D finite element analysis for geotechnical engineering: slopes, embankments and deep excavations, with factors of safety by strength reduction and internal forces in walls, piles and anchors.

![Slope failure mechanism](/img/fea/slope_strain.png)

## Scope

- **Slope stability** — factor of safety by shear strength reduction (SSR), with the critical slip surface falling out of the deviatoric strain field rather than being assumed circular.
- **Staged construction** — embankments raised in lifts, excavations dug in stages, structures and anchors installed when they are built.
- **Retaining structures** — bored pile rows, diaphragm walls, sheet piles and linings, specified by diameter, spacing and concrete grade, reporting axial force, shear and bending moment along the member.
- **Soil-structure interaction** — Mohr-Coulomb interfaces with wall friction, pre-stressed ground anchors, struts and surcharge loads.
- **Groundwater** — hydrostatic pore pressure below a phreatic surface, with the horizontal pressure gradient carried as a seepage force.
- **DXF import** — read the section, *and its construction sequence*, straight out of the CAD drawing instead of retyping coordinates.

Everything runs from an interactive interface in the browser, from the command line, or as a Python script.

## Screenshots

<Gallery :items="[
  { src: '/img/fea/gui.png', caption: 'The browser interface' },
  { src: '/img/fea/dxf_import.png', caption: 'A section imported from a CAD drawing' },
  { src: '/img/fea/dxf_staged.png', caption: 'A staged excavation read from a drawing' },
  { src: '/img/fea/wall_forces.png', caption: 'Axial force, shear and moment in the wall' },
  { src: '/img/fea/excavation_disp.png', caption: 'Total displacements in the excavation' },
  { src: '/img/fea/excavation_mesh.png', caption: 'Excavation mesh' },
  { src: '/img/fea/slope_ssr.png', caption: 'SSR curve: displacement against reduction factor' },
  { src: '/img/fea/slope_mesh.png', caption: 'Slope mesh' }
]" />

## Quick start

```bash
pip install lythosfea
lythos gui                          # interface: http://127.0.0.1:8777/
lythos import --sample -o m.json    # try the drawing that ships with it
```

The distribution is `lythosfea`; what you import and run is `lythos`:

```python
import lythos
```

Add `pip install "lythosfea[dxf]"` for binary DXF, splines or block references; plain ASCII DXF needs nothing extra.

From a clone, without installing:

```bash
python main.py                                   # the interface
python main.py run models/slope.json -o out      # = lythos run ...
```

Python 3.10+ with NumPy, SciPy and Matplotlib; if any is missing, `main.py` gives the command for your system rather than failing with an import error.

## The interface

Draw the soil layers, drop in a wall, set the construction stages and press **Run analysis**. The server listens on the loopback address only; nothing leaves your machine. The interface runs in a browser rather than a desktop toolkit, so it works the same over a remote session, in a container or on a machine with no display.

## What is inside

| Part | What it does |
| --- | --- |
| `lythos.core.mesher` | Delaunay refinement mesher; planarises the drawing, honours every layer and structural line, grades element size per region |
| `lythos.core.materials` | Mohr-Coulomb with non-associated flow and a tension cut-off, linear elastic, concrete; exact return mapping in principal stress space |
| `lythos.core.elements` | 6-node triangles, Timoshenko beams, zero-thickness interfaces, anchors |
| `lythos.core.solver` | Staged construction, adaptive sub-stepping, strength reduction |
| `lythos.core.pile` | Pile and wall sections from diameter, spacing and concrete grade |
| `lythos.viz.plots` | Contours, deformed meshes, plastic points, section force diagrams |
| `lythos.gui` | The browser interface |

## Next steps

- [Examples](./examples) — a slope factor of safety, an anchored deep excavation, a construction sequence from DXF, a pile wall section.
- [Reference](./reference) — DXF rules, the validation table and the limitations.

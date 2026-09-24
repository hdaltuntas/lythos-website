# Lythos Kinematic

<ProductHero id="kinematic" />

Rock slope kinematics and stability, two steps in one workflow:

1. **Kinematic screening** — the Markland test on a stereonet, pole density and a Monte Carlo probability of failure establish *which failure mechanism is possible*.
2. **Limit equilibrium** — for the mechanism found critical, compute *the factor of safety, the required support and the bolt design*.

The two steps are bridged: the most critical discontinuity or intersection found in screening is written into the limit-equilibrium inputs **with one click**.

## What it computes

**Kinematic screening**
- **Kinematic tests:** planar sliding, wedge sliding (Markland), flexural toppling (Goodman & Bray).
- **Stereonet:** equal-area (Schmidt) lower-hemisphere projection, pole density contour (Kamb counting cone), critical zone sweep, friction / sliding limit cone.
- **Monte Carlo:** overall and component-wise probability of failure accounting for discontinuity orientation uncertainty; runs on a background thread, the page stays live.

**Limit equilibrium**
- **Wedge (Swedge-like):** tetrahedral wedge geometry, Hoek & Bray vector limit equilibrium, 3D view and stereonet.
- **Planar (RocPlane-like):** tension crack, water pressure, seismic load, 2D section.
- **Toppling (RocTopple-like):** Goodman & Bray block toppling, water + seismic + toe anchor.
- **Support design:** the force required for a target FS, a clickable **bolt spacing × length matrix**, and a capacity/FS check for the design you pick.

**The bridge** — “→ Send critical result to limit equilibrium”:

| Screening mode | Transferred inputs |
| --- | --- |
| Planar | sliding plane ψ<sub>p</sub>, slope face ψ<sub>f</sub>, friction angle φ |
| Wedge | Joint 1 and Joint 2 dip/dip dir, slope face dip/dip dir, φ |
| Toppling | discontinuity dip ψ<sub>d</sub>, slope face ψ<sub>f</sub>, φ |

## Screenshots

<Gallery :items="[
  { src: '/img/kinematic/screening.png', caption: 'Kinematic screening and stereonet' },
  { src: '/img/kinematic/bolts.png', caption: 'Bolt spacing × length matrix' },
  { src: '/img/kinematic/probability.png', caption: 'Probabilistic analysis (Monte Carlo)' },
  { src: '/img/kinematic/wedge.png', caption: 'Wedge analysis' },
  { src: '/img/kinematic/english_dark.png', caption: 'English interface, dark theme' }
]" />

## Quick start

```bash
pip install lythoskinematic
lythos-kinematic                               # interface: http://127.0.0.1:8778/
```

```bash
lythos-kinematic example -o inputs.json
lythos-kinematic screen inputs.json --lang EN -o screening.pdf
lythos-kinematic run inputs.json --mode wedge --lang EN -o wedge.pdf
```

`--lang` takes `TR` or `EN` here; the default is Turkish.

::: info Background
Lythos Kinematic merges two desktop programs: **SlopeKinematics** (kinematics and probability, PyQt5) and **Kinematix** (limit equilibrium, bolting and reporting, PySide6). In the merge `mplstereonet` was replaced by one shared stereonet implementation, and a **radius normalisation bug in the equal-area projection** was fixed: horizontal lines (plunge = 0) landed at 70.7 % of the radius instead of on the primitive circle. The fix is pinned by `tests/test_stereonet.py`.
:::

## Next steps

- [Examples](./examples) — screening, Monte Carlo, wedge, planar sliding and toppling; the Python API.
- [Reference](./reference) — input fields, package layout, validation.

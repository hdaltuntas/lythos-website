---
title: "Lythos Settle — settlement and consolidation of foundations and embankments"
description: "Lythos Settle: settlement of foundations and embankments; Boussinesq stresses, Steinbrenner and Schmertmann immediate settlement, consolidation and time–settlement."
---

# Lythos Settle

<ProductHero id="settle" />

Works out **how much** and **how fast** a rectangular, strip or circular foundation — or an **embankment** given by its crest width, height and slope angles — settles on a layered soil profile.

## What it computes

1. **Stresses** — in-situ σ<sub>v0</sub>, u<sub>0</sub>, σ′<sub>v0</sub> and σ′<sub>p</sub>; the stress increase beneath the foundation by Boussinesq (Newmark's rectangle, the strip and the circle solutions) or by the 2:1 spread, at the centre, the characteristic point, the middle of the long edge and the corner. Under an embankment, **exactly** for its trapezoidal load, at the crest centre, the crest edge, the middle of the slope and the toe.
2. **Immediate settlement** — layered elastic (Steinbrenner) in every layer, or Schmertmann (1978) in the granular layers.
3. **Consolidation** — primary settlement of the clay layers from C<sub>c</sub>, C<sub>r</sub>, e<sub>0</sub> and σ′<sub>p</sub>, and secondary compression from C<sub>α</sub> up to the design life.
4. **Time** — Terzaghi's one-dimensional consolidation, each clay layer draining on its own; t<sub>50</sub>, t<sub>90</sub> and the time–settlement curve.
5. **Checks** — total settlement and angular distortion against their allowable values.

On top of it, a **parametric or reliability study** reports the probability of exceeding the allowable settlement or distortion, with a 95 % confidence interval and β.

## Screenshots

<Gallery :items="[
  { src: '/img/settle/settle_summary.png', caption: 'Results summary' },
  { src: '/img/settle/settle_time.png', caption: 'Time–settlement' },
  { src: '/img/settle/settle_depth_dark_tr.png', caption: 'Settlement with depth — dark theme, Turkish' },
  { src: '/img/settle/settle_study.png', caption: 'Reliability study' },
  { src: '/img/settle/settle_embankment.png', caption: 'Embankment on soft clay' },
  { src: '/img/settle/settle_embankment_profile.png', caption: 'Settlement across the embankment' }
]" />

## Quick start

```bash
pip install lythossettle
lythos-settle                                  # interface: http://127.0.0.1:8780/
```

```bash
lythos-settle example -o project.settle        # starter project: a raft on soft clay
lythos-settle run project.settle -o report.pdf
lythos-settle study project.settle -o samples.csv
```

## Figures

Section with the Boussinesq stress bulb · stresses with depth (σ′<sub>v0</sub>, σ′<sub>v0</sub> + Δσ, σ′<sub>p</sub> and the influence-depth criterion) · influence factors at each point with Schmertmann's I<sub>z</sub> · cumulative settlement with depth · time–settlement curve · settlement components at each point · settlement across the section (the trough under a footing or a fill). Study figures: one-at-a-time sweep, histogram, scatter, tornado.

## Next steps

- [Examples](./examples) — a raft, the choice of method, an embankment and a reliability study.
- [Reference](./reference) — inputs, expressions, modules.
- For the stability of a fill see [Lythos LE](/en/le/); for bearing capacity, [Lythos Bearing](/en/bearing/).

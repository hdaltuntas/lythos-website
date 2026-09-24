# Lythos SPWA

<ProductHero id="spwa" />

A cantilever or multi-anchored sheet pile wall is analysed **two ways** and the two are put side by side:

1. **Limit equilibrium** — the free-earth support method with Coulomb / Mononobe-Okabe earth pressures gives *the embedment depth, the anchor forces and the internal-force diagrams*.
2. **Beam-spring (Winkler)** — the wall as a beam on elastoplastic soil springs, built in stages, gives *the deflections and moments the sequence of construction actually produces*, with tension-only inclined anchors.

On top of either, a **parametric or reliability study** reports sensitivities, the probability of failure with a 95 % confidence interval, and the reliability index β.

## What it computes

**Limit equilibrium (free-earth support)**
- Coulomb (static) and Mononobe-Okabe (seismic) earth pressures for a vertical wall, with the cohesion term 2c√K and a tension cut-off on the active side.
- Embedment: moment equilibrium about the toe (cantilever, simplified method) or about the lowest anchor (free-earth), by root-finding. `D_design = round-up(1.2·D_req)`.
- Horizontal and axial force per anchor, and the vertical component.
- Net pressure, earth and water pressures, shear, moment, rotation and deflection diagrams.
- Checks: bending stress against f<sub>y</sub>/FS, deflection against H/120, H/100 or H/240, and an indicative vertical equilibrium check.

**Beam-spring (Winkler)**
- Euler-Bernoulli beam on elastoplastic springs bounded by the active and passive limits, starting from at-rest (K<sub>0</sub> = 1 − sin φ).
- **Staged construction, worked out automatically:** excavate to the anchor level plus the overdig, install the anchor, carry on to the final level; the springs keep their state between stages.
- Anchors as tension-only springs, k<sub>h</sub> = EA/(L<sub>free</sub>·s)·cos²α, with a lock-off load.
- Subgrade modulus k<sub>s</sub> entered directly, or from Ménard-Bourdon or Schmitt (1995).

**Seismic** — Mononobe-Okabe K<sub>AE</sub> / K<sub>PE</sub>; below the water table the inertia angle from γ<sub>sat</sub>/γ′ (restrained pore water); the Westergaard hydrodynamic pressure of the free water in front of the wall, 7/8·k<sub>h</sub>·γ<sub>w</sub>·√(H<sub>w</sub>·y).

## Screenshots

<Gallery :items="[
  { src: '/img/spwa/spwa_summary.png', caption: 'Results summary: limit equilibrium and beam-spring side by side' },
  { src: '/img/spwa/spwa_moment_dark.png', caption: 'Bending moment — dark theme' },
  { src: '/img/spwa/spwa_beam_spring.png', caption: 'Beam-spring (Winkler), stage by stage' },
  { src: '/img/spwa/spwa_study.png', caption: 'Reliability study' }
]" />

## Quick start

```bash
pip install lythosspwa
lythos-spwa                                    # interface: http://127.0.0.1:8779/
```

```bash
lythos-spwa example -o quay.spwa
lythos-spwa run quay.spwa -o report.pdf
lythos-spwa study quay.spwa -o samples.csv
```

::: info Background
Lythos SPWA is the desktop program **SPWA** (PyQt6 + Matplotlib) rebuilt as a web application. The analysis cores are the same code; the Qt interface has been replaced by a local server and a browser page, and the Qt-based PDF writer by ReportLab. Files written by SPWA v0.1 load with the defaults filled in.
:::

## Next steps

- [Examples](./examples) — a two-anchor quay wall, the effect of earthquake, limit equilibrium against beam-spring.
- [Reference](./reference) — method notes, inputs, modules.
- For the continuum and overall stability see [LythosFEA](/en/fea/).

# Lythos Bearing

<ProductHero id="bearing" />

A **rectangular, square, strip or circular** footing on a layered soil profile, under a vertical load, horizontal loads in two directions and moments, is checked by **every method an engineer is likely to be asked for, side by side**. The governing method is marked; the others stay in the table for comparison.

## What it computes

1. **The general bearing capacity equation** — the factor sets of Terzaghi (1943), Meyerhof (1963), Brinch Hansen (1970), Vesić (1973) and EN 1997-1 Annex D, and Skempton's (1951) undrained N<sub>c</sub>; each with its own shape, depth, load inclination, base tilt, ground slope and (Vesić) compressibility factors. Drained, undrained, or whichever governs; general or local shear.
2. **Eccentric and inclined loads** — Meyerhof's effective area B′ × L′, the contact pressure (trapezoid in the middle third, triangle outside it).
3. **Layered ground** — the strength averaged over the Prandtl failure zone, or the two-layer **punching** check of Meyerhof & Hanna and the **load-spread** check for a strong layer over a weak one.
4. **In-situ tests** — Meyerhof's SPT and CPT rules (as revised by Bowles) and Ménard's pressuremeter rule.
5. **Rock** — Hoek–Brown turned into an equivalent c′, φ′, and the CFEM discontinuity-spacing method.
6. **Earthquake** — the pseudo-static inertia of the structure, and Paolucci & Pecker's reduction for the inertia of the soil.
7. **Checks** — bearing, sliding and eccentricity, against a factor of safety or **EN 1997-1 Design Approaches 1, 2 and 3**; the **width** the foundation needs.

On top of it, a **parametric or reliability study** sweeps any input as a range or a distribution and reports the probability of failure in bearing, sliding and eccentricity with a 95 % confidence interval and the reliability index β.

## Screenshots

<Gallery :items="[
  { src: '/img/bearing/bearing_summary.png', caption: 'Results summary: six methods, the checks and the width required' },
  { src: '/img/bearing/bearing_comparison.png', caption: 'Comparison of the methods: ultimate and allowable pressure' },
  { src: '/img/bearing/bearing_schematic_dark_tr.png', caption: 'Section and Prandtl mechanism — dark theme, Turkish' },
  { src: '/img/bearing/bearing_width.png', caption: 'Capacity and factor of safety against width' },
  { src: '/img/bearing/bearing_envelope.png', caption: 'V–H failure envelope' },
  { src: '/img/bearing/bearing_study.png', caption: 'Reliability study' }
]" />

## Quick start

```bash
pip install lythosbearing
lythos-bearing                               # interface: http://127.0.0.1:8781/
```

In the **1 · Foundation and soil** tab enter the footing, the actions, the water table and the soil profile, and press **Analyse**. Results appear under **Summary**, **Results** and **Figures**; the **2 · Study** tab runs parametric and reliability studies. **Export report…** in the header writes PDF, HTML or Word.

The same from the command line:

```bash
lythos-bearing example -o project.bearing    # a starter project
lythos-bearing run project.bearing -o report.pdf
lythos-bearing study project.bearing -o samples.csv
```

## Figures

Section with the Prandtl failure mechanism · bearing capacity factors against φ′ for every method · comparison of the methods · the cohesion, surcharge and self-weight terms · contact pressure and effective area · capacity and factor of safety against width and depth · the V–H failure envelope. Study figures: one-at-a-time sweep, histogram, scatter, tornado.

## Next steps

- [Examples](./examples) — the starter project, a width sweep, EN 1997-1 and a reliability study.
- [Reference](./reference) — every input, the methods, the modules and the validation.
- The same factors are used by [Lythos MSEW](/en/msew/) for the bearing capacity under the wall.

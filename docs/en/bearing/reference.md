---
title: "Lythos Bearing reference — methods, inputs, validation"
description: "Lythos Bearing reference: The general equation, Inputs, What it computes, Checks and EN 1997-1, Project file (.bearing), Modules, Validation, Limits."
---

# Lythos Bearing — reference

## The general equation

```text
q_ult = c·Nc·sc·dc·ic·bc·gc·Fc  +  q·Nq·sq·dq·iq·bq·gq·Fq  +  ½·γ·B′·Nγ·sγ·dγ·iγ·bγ·gγ·Fγ
```

s, d, i, b, g and F are the shape, depth, load-inclination, base-tilt, ground-slope and compressibility corrections. Each method brings its own factors and its own corrections; a correction the method does not define is 1 and is reported as 1.

| Method | N<sub>q</sub> | N<sub>c</sub> | N<sub>γ</sub> | Corrections |
| --- | --- | --- | --- | --- |
| Terzaghi (1943) | e<sup>(3π/2 − φ)tan φ</sup> / (2 cos²(45 + φ/2)) | (N<sub>q</sub> − 1)cot φ; 5.7 at φ = 0 | Bowles's fit 2(N<sub>q</sub> + 1)tan φ / (1 + 0.4 sin 4φ) | shape only |
| Meyerhof (1963) | e<sup>π tan φ</sup>·tan²(45 + φ/2) | (N<sub>q</sub> − 1)cot φ; π + 2 at φ = 0 | (N<sub>q</sub> − 1)tan(1.4φ) | s, d, i |
| Brinch Hansen (1970) | as Meyerhof | as Meyerhof | 1.5(N<sub>q</sub> − 1)tan φ | s, d, i, b, g |
| Vesić (1973) | as Meyerhof | as Meyerhof | 2(N<sub>q</sub> + 1)tan φ | s, d, i, b, g, F |
| EN 1997-1 Annex D | as Meyerhof | as Meyerhof | 2(N<sub>q</sub> − 1)tan φ | s, i, b (d, g borrowed on request) |
| Skempton (1951) | — | 5(1 + 0.2B/L)(1 + 0.2D/B) ≤ 7.5(1 + 0.2B/L) | — | inside N<sub>c</sub> |

## Inputs

| Group | Fields |
| --- | --- |
| **Foundation** | shape (rectangle, square, strip, circle), B (diameter of a circle), L, depth D<sub>f</sub>, base tilt η, ground slope β |
| **Actions at the base** | V, horizontal loads along B and L, moments about both axes, the variable share of the actions (for the Eurocode's partial factors) |
| **Groundwater** | depth of the water table, γ<sub>w</sub> |
| **Soil profile** | from the surface down, one row per layer: thickness, granular or cohesive, γ, γ<sub>sat</sub>, c′, φ′, c<sub>u</sub>, E, ν |
| **Method** | the factor set; drained / undrained / whichever governs; general or local shear; each correction and the effective area on or off |
| **Layered ground** | averaging over the failure zone (with a depth factor), or the two-layer punching (K<sub>s</sub>, c<sub>a</sub>/c<sub>1</sub>) or load-spread (angle) check |
| **Earthquake** | k<sub>h</sub>, k<sub>v</sub>, soil inertia on or off |
| **In-situ test** | SPT N<sub>60</sub>, CPT q<sub>c</sub>, or pressuremeter p<sub>l</sub>, p<sub>0</sub> and soil category; the tolerable settlement of the SPT / CPT rules |
| **Rock** | σ<sub>ci</sub>, GSI, m<sub>i</sub>, D and the rock mass unit weight; or discontinuity spacing and aperture |
| **Verification** | factor of safety, or EN 1997-1 DA1 / DA2 / DA3; required FS against sliding; allowable eccentricity; base friction δ/φ′ |

## What it computes

| Quantity | Method |
| --- | --- |
| N<sub>c</sub>, N<sub>q</sub>, N<sub>γ</sub> | Terzaghi, Meyerhof, Hansen, Vesić, EN 1997-1 Annex D; Skempton's undrained N<sub>c</sub> |
| Shape, depth, inclination factors | each method's own; EN 1997-1 borrows Hansen's depth factors on request |
| Base tilt, ground slope | Hansen, Vesić, EN 1997-1 (base) |
| Compressibility | Vesić's rigidity index I<sub>r</sub> against I<sub>r,cr</sub> |
| Undrained, Hansen | the additive 5.14·c<sub>u</sub>·(1 + s′<sub>c</sub> + d′<sub>c</sub> − i′<sub>c</sub> − b′<sub>c</sub> − g′<sub>c</sub>) + q |
| Eccentricity | Meyerhof's effective area; Vesić's equivalent rectangle for a circle |
| Contact pressure | trapezoid in the middle third, triangle outside it |
| Layered profile | strength averaged over the Prandtl zone, (B′/2)·cos φ/cos(45 + φ/2)·e<sup>(π/4 + φ/2)tan φ</sup> |
| Strong over weak layer | Meyerhof & Hanna punching; load spread onto the weak layer |
| Earthquake | k<sub>h</sub>·V added to H, V(1 − k<sub>v</sub>); Paolucci & Pecker's (1 − k<sub>h</sub>/tan φ)<sup>0.35</sup> |
| SPT / CPT / PMT | Meyerhof (as revised by Bowles), Meyerhof, Ménard |
| Rock | Hoek–Brown 2002 equivalent c′, φ′; CFEM K<sub>sp</sub> |
| Checks | FS on the net capacity; sliding; e/B; EN 1997-1 DA1 / DA2 / DA3 |
| Required width | bisection on B until the check is met; a rectangle keeps L/B |

## Checks and EN 1997-1

- **Bearing:** FS = q<sub>net,ult</sub> / q<sub>net</sub> with q<sub>net</sub> = V/A′ − q; q<sub>all</sub> = q<sub>net,ult</sub>/FS + q.
- **Sliding:** R = V·tan δ + A′·c<sub>a</sub> (drained), R = A′·c<sub>u</sub> (undrained); FS = R/H.
- **Eccentricity:** e/B against the chosen limit (B/6 by default).
- **EN 1997-1 Annex A recommended values:**

| Set | γ<sub>G</sub> | γ<sub>Q</sub> | γ<sub>φ′</sub> | γ<sub>c′</sub> | γ<sub>cu</sub> | γ<sub>R;v</sub> | γ<sub>R;h</sub> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | 1.35 | 1.50 | | | | | |
| A2 | 1.00 | 1.30 | | | | | |
| M1 | | | 1.00 | 1.00 | 1.00 | | |
| M2 | | | 1.25 | 1.25 | 1.40 | | |
| R1 / R2 / R3 | | | | | | 1.0 / 1.4 / 1.0 | 1.0 / 1.1 / 1.0 |

DA1 checks A1+M1+R1 and A2+M2+R1, DA2 A1+M1+R2, DA3 A1+M2+R3.

## Project file (`.bearing`)

JSON. **Save** writes the inputs and the study definition; **Open…** reads them back. Missing entries keep their defaults. The keys are those of `forms.defaults()`:

```json
{
  "shape": "rectangle", "B": 2.5, "L": 4.0, "Df": 1.5,
  "V": 1700.0, "Hb": 150.0, "Mb": 300.0,
  "water_depth": 2.0, "method": "vesic", "analysis": "both",
  "approach": "fs", "FS": 3.0,
  "soil_profile": [
    {"name": "Fill", "thickness": 1.5, "behaviour": "granular", "gamma": 18.0,
     "gamma_sat": 19.5, "c": 0.0, "phi": 30.0, "cu": 0.0, "E": 15.0, "nu": 0.3}
  ]
}
```

## Modules

| File | Content |
| --- | --- |
| `factors.py` | Bearing capacity factors and every correction, per method |
| `capacity.py` | The general equation, effective area, contact pressure, failure zone, sliding |
| `layered.py` | Two-layer punching and load spread |
| `seismic.py` | Pseudo-static loads and soil-inertia factors |
| `insitu.py`, `rock.py` | SPT / CPT / pressuremeter rules; Hoek–Brown and K<sub>sp</sub> |
| `engine.py` | The analysis: profile, strength over the zone, all methods, checks, Eurocode, width |
| `study.py`, `study_plots.py` | Parametric and reliability studies |
| `report.py`, `pdf.py` | Calculation report: one HTML assembly, exported as PDF / HTML / DOCX |
| `web/` | The local HTTP server, the session and the browser interface |

## Validation

The tests check the factors against the published tables, the equation against hand calculations (Prandtl's 5.14·c<sub>u</sub>, a Vesić square footing term by term, the contact pressure trapezoid and triangle), each auxiliary method against its expression, the engine's checks and refusals, the report in all three formats, and the interface (session and HTTP layer).

```bash
pip install -e ".[dev]"
pytest -q
```

## Limits

- Shallow foundations: the equations lose meaning much beyond D/B ≈ 2–4.
- The failure zone average is a simplification for a layered profile; where a strong layer of limited thickness overlies a weak one, use the two-layer check.
- Settlement is not checked beyond the SPT/CPT rules — see [Lythos Settle](/en/settle/).
- Terzaghi's N<sub>γ</sub> is a fit (about 10 % low at φ′ = 20°), K<sub>s</sub> defaults to a conservative estimate, and the rock methods are empirical: each is flagged where it is used.

Full derivations and sources: [docs/theory.md](https://github.com/hdaltuntas/lythos-bearing/blob/main/docs/theory.md).

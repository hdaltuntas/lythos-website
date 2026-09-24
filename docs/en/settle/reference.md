# Lythos Settle — reference

## Inputs

| Group | Fields |
| --- | --- |
| **Foundation** | shape (rectangle, strip, circle), B (diameter of a circle), L, depth D<sub>f</sub>, gross bearing pressure q; optionally the excavated overburden is deducted (q<sub>net</sub> = q − σ<sub>v0</sub>(D<sub>f</sub>)) |
| **Embankment** (shape “embankment”) | crest width, height H, left and right slope angles, unit weight of the fill γ; the load is γ·H under the crest, falling linearly to zero at the toes |
| **Groundwater** | depth of the water table, γ<sub>w</sub> |
| **Soil profile** | from the surface down: thickness, granular or cohesive, γ, γ<sub>sat</sub>, E, ν; for the clays C<sub>c</sub>, C<sub>r</sub>, e<sub>0</sub>, OCR, c<sub>v</sub>, C<sub>α</sub> and single / double drainage. E is the drained modulus of a sand and the undrained modulus of a clay |
| **Options** | stress distribution, immediate-settlement method, flexible or rigid foundation, sublayer thickness, influence-depth ratio Δσ/σ′<sub>v0</sub>, design life, Schmertmann's creep factor |
| **Criteria** | allowable total settlement and angular distortion (1/x) |

## What it computes

| Quantity | Method |
| --- | --- |
| Δσ under a rectangle | Newmark's integration of Boussinesq, superposed for any point |
| Δσ under a strip / circle | closed form / exact one-dimensional integral over the polar angle |
| Δσ under an embankment | exact: Flamant's line load integrated over the piecewise-linear (trapezoidal) load |
| Δσ, approximate | 2:1 spread |
| Embankment, immediate | Steinbrenner in plane strain, the crest as one strip and each slope as 16 slices |
| Immediate settlement | Steinbrenner F<sub>1</sub>, F<sub>2</sub> on each layer (layered elastic), or Schmertmann (1978) with C<sub>1</sub>, C<sub>2</sub> and the L/B-interpolated influence diagram |
| Primary consolidation | C<sub>r</sub> up to σ′<sub>p</sub> = OCR·σ′<sub>v0</sub>, C<sub>c</sub> beyond it, sublayer by sublayer at each point |
| Secondary compression | C<sub>α</sub>/(1+e<sub>0</sub>)·H·log(t/t<sub>p</sub>) from U = 95 % to the design life; C<sub>α</sub>·C<sub>r</sub>/C<sub>c</sub> where the clay stays over-consolidated |
| Time | Terzaghi U(T<sub>v</sub>), per clay layer, H<sub>dr</sub> = H/2 or H |
| Rigid foundation | settlement of the characteristic point (0.74·B/2, 0.74·L/2; 0.845·R) |
| Angular distortion | (s<sub>centre</sub> − s<sub>edge</sub>) / (B/2) |

## Evaluation points

| Loading | Points |
| --- | --- |
| Rectangle, strip, circle | centre · characteristic point · middle of the long edge · corner |
| Embankment | crest centre · crest edge · middle of the slope · toe |

## Project file (`.settle`)

JSON. **Save** writes the inputs and the study definition; missing entries keep their defaults.

```json
{
  "shape": "rectangle", "B": 8.0, "L": 16.0, "Df": 1.5, "q": 100.0,
  "net_pressure": true, "water_depth": 2.0,
  "stress_method": "boussinesq", "immediate_method": "elastic", "rigidity": "flexible",
  "design_life": 50.0, "s_allow": 150.0, "distortion_allow": 500.0,
  "soil_profile": [
    {"name": "Soft clay", "thickness": 6.0, "behaviour": "cohesive", "gamma": 17.0,
     "gamma_sat": 17.5, "E": 6.0, "nu": 0.5, "Cc": 0.32, "Cr": 0.05, "e0": 1.05,
     "OCR": 1.3, "cv": 1.5, "Calpha": 0.01, "drainage": "double"}
  ]
}
```

Choices: `stress_method` ∈ {`boussinesq`, `two_to_one`}, `immediate_method` ∈ {`elastic`, `schmertmann`}, `rigidity` ∈ {`flexible`, `rigid`}, `shape` ∈ {`rectangle`, `strip`, `circle`, `embankment`}.

## Modules

| File | Content |
| --- | --- |
| `stress.py` | Boussinesq (rectangle, strip, circle), 2:1, Steinbrenner |
| `consolidation.py` | Terzaghi U(T<sub>v</sub>) and its inverse, compression of clay, secondary compression |
| `engine.py` | The settlement analysis: profile, sublayers, points, checks, time curve |
| `study.py`, `study_plots.py` | Parametric (one at a time) and reliability (LHS / Monte Carlo) studies, P of exceedance, Spearman sensitivities, CSV / XLSX |
| `plotting.py`, `render.py` | Matplotlib figures, theme-aware |
| `report.py`, `pdf.py` | Calculation report as PDF (ReportLab), HTML or DOCX |
| `forms.py`, `summary.py`, `i18n.py` | Input schema, result cards, bilingual text |
| `web/` | The local HTTP server and the browser interface |

## Validation

The tests check the stress solutions against published values and brute-force integrals, the engine against closed-form cases (a square on an elastic half-space, a one-dimensional clay layer, Schmertmann by hand), the report in all three formats, the input schema and its file round-trips, and the interface (session and HTTP layer).

## Limits

- Consolidation is one-dimensional (Terzaghi, uniform initial excess pore pressure). Each clay layer consolidates independently; interaction through a common drainage boundary is ignored. Vertical drains are not modelled.
- No Skempton–Bjerrum correction is applied; the one-dimensional value is conservative for over-consolidated clay under a narrow footing.
- Layered elastic immediate settlement is the difference of Steinbrenner brackets with each layer's own E and ν; in clay, with the undrained E and ν ≈ 0.5, it is the distortion settlement that precedes consolidation.
- Schmertmann is used in granular layers only; a strip is taken as a rectangle 200·B long, a circle as the square of the same area.
- Angular distortion is checked for a flexible foundation only; for a rigid one it is not checked.

Details: [docs/theory.md](https://github.com/hdaltuntas/lythos-settle/blob/main/docs/theory.md).

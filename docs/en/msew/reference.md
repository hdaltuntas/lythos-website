---
title: "Lythos MSEW reference — methods, inputs, validation"
description: "Lythos MSEW reference: What it computes, Inputs, Project file (.msew), Modules, Validation, Not included."
---

# Lythos MSEW — reference

## What it computes

| Quantity | Method |
| --- | --- |
| K<sub>a</sub> | Coulomb (AASHTO 3.11.5.3), θ = 90 + ω from a 10° batter on; δ = β behind the block, δ = 0 inside it |
| Forces | V<sub>1</sub> = γ<sub>r</sub>·H·L, the slope wedge over the block, F<sub>1</sub> = ½·K<sub>a</sub>·γ·h² and F<sub>2</sub> = K<sub>a</sub>·q·h at β, h = H + L·tan β |
| Sliding | the weakest of tan φ<sub>r</sub>, tan φ<sub>f</sub> + c·L and C<sub>ds</sub>·tan φ<sub>r</sub>; the live load over the block left out |
| Overturning, eccentricity | moments about the toe; e ≤ L/6 (ASD), L/3 (LRFD), L/4 (seismic ASD) |
| Bearing | B′ = L − 2e, σ<sub>v</sub> = ΣV/B′ against q<sub>ult</sub> by Terzaghi, Meyerhof, Hansen, Vesić, EN 1997-1 |
| T<sub>max</sub> | K<sub>r</sub>·σ<sub>v</sub>·S<sub>v</sub>, σ<sub>v</sub> = γ<sub>r</sub>·Z + σ<sub>2</sub> + q + Δσ<sub>v</sub> (2:1 strip load), K<sub>r</sub>/K<sub>a</sub> 1.7 → 1.2 over 6 m for strips |
| Active zone | Rankine 45 + φ/2 (extensible), bilinear 0.3·H<sub>1</sub> (inextensible) |
| Pullout | P<sub>r</sub> = F*·α·σ′<sub>v</sub>·L<sub>e</sub>·C·R<sub>c</sub>, C = 2, no live load; F* = C<sub>i</sub>·tan φ, or F*<sub>0</sub> → tan φ over 6 m |
| Strength | T<sub>ult</sub>/(RF<sub>ID</sub>·RF<sub>CR</sub>·RF<sub>D</sub>)·R<sub>c</sub>; F<sub>y</sub>·b·E<sub>c</sub>/S<sub>h</sub> with E<sub>c</sub> after zinc and steel corrosion |
| LRFD | EV 1.00/1.35, EH 1.50, ES 0.75/1.50, LS 1.75; φ as entered |
| Earthquake | A<sub>m</sub> = (1.45 − A)·A; P<sub>AE</sub> = 0.375·A<sub>m</sub>·γ·H² (M–O with a backslope) at 0.6·H, ½P<sub>AE</sub> + P<sub>IR</sub>; P<sub>i</sub> = A<sub>m</sub>·W<sub>a</sub> by L<sub>e</sub> |
| Required length | bisection on a uniform L until every external and pullout check holds |

## Inputs

| Group | Fields |
| --- | --- |
| **Wall** | design height H, embedment d, face batter ω, backslope β, slope in front of the toe, facing thickness |
| **Surcharges** | permanent and live (traffic) uniform surcharges; a strip load (P, width, offset from the face, permanent or live) |
| **Soils** | reinforced fill (γ, φ′), retained fill (γ, φ′), foundation soil (γ, γ<sub>sat</sub>, φ′, c′ — or φ = 0 and c<sub>u</sub>), the water table below the base |
| **Reinforcement types** (a table) | name, kind (steel strip, polymer strip, geogrid, geotextile); geosynthetics: T<sub>ult</sub>, RF<sub>ID</sub>, RF<sub>CR</sub>, RF<sub>D</sub>, R<sub>c</sub>, C<sub>i</sub>; steel strips: b, t, F<sub>y</sub>, S<sub>h</sub>, F*<sub>0</sub> at the top; all: scale correction α and connection strength ratio CR |
| **Layers** (a table) | height above the levelling pad z, length L, type — or the layout generator: first layer, S<sub>v</sub>, L = ratio·H (never below a shortest length) or a fixed L |
| **Corrosion** | design life, galvanising thickness, carbon steel loss rate |
| **Design method** | ASD (FS for sliding, overturning, eccentricity, bearing, tensile, pullout, connection; 0.55·F<sub>y</sub> for steel) or LRFD (φ); the minimum length beyond the active zone |
| **Bearing capacity** | the factor set; embedment and load inclination on or off; the direct sliding coefficient C<sub>ds</sub> of a geosynthetic |
| **Earthquake** | A, the reduction of F* under seismic loading |
| **Height study** | the range and the step |

## Project file (`.msew`)

JSON with every input, the tables included. A layer list and type table:

```json
{
  "H": 6.0, "embedment": 0.6, "q_live": 10.0,
  "gamma_r": 19.0, "phi_r": 34.0, "phi_b": 30.0, "phi_f": 30.0, "c_f": 5.0,
  "layout_z1": 0.375, "layout_Sv": 0.75, "layout_rule": "ratio", "layout_ratio": 0.9,
  "design": "asd", "bearing_method": "vesic", "design_life": 75.0,
  "reinforcement_types": [
    {"name": "Geogrid 80", "kind": "geogrid", "Tult": 80.0, "RFID": 1.1, "RFCR": 1.6,
     "RFD": 1.1, "Rc": 1.0, "Ci": 0.67, "alpha": 0.8, "CR": 0.8}
  ],
  "layers": [{"z": 0.375, "L": 5.4, "type": "Geogrid 80"}]
}
```

## Modules

| File | Content |
| --- | --- |
| `earth.py` | Coulomb, Rankine, Mononobe–Okabe, A<sub>m</sub> |
| `reinforcement.py` | Corrosion, long-term strength, K<sub>r</sub>/K<sub>a</sub>, F*, pullout |
| `catalog.py` | Typical market reinforcement |
| `factors.py`, `capacity.py` | Bearing capacity factors and the general equation (from Lythos Bearing) |
| `engine.py` | The wall: forces, external checks, bearing, internal checks, earthquake, required length, layout generator |
| `heights.py`, `height_plots.py` | The height study, its figures, CSV / XLSX |
| `report.py`, `pdf.py`, `web/` | Report and interface |

## Validation

The tests check the earth pressure coefficients against their closed forms; the corrosion and the strengths, the forces, the external checks, the bearing capacity, and the tension and pullout of a layer against hand calculations; the LRFD factors, the seismic forces, the required length as a boundary, the refusals and warnings, the report in all three formats and the interface.

## Not included

Global and compound stability, settlement and drainage. Details: [docs/theory.md](https://github.com/hdaltuntas/lythos-msew/blob/main/docs/theory.md).

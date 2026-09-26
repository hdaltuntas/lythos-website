---
title: "Lythos LE examples — limit equilibrium slope stability (Bishop, Spencer, Morgenstern-Price)"
description: "Lythos LE examples with real output: The built-in examples, The ACADS benchmark, Your own model from the command line, Earthquake and non-circular…"
---

# Lythos LE — examples

Every output is from a real run.

## 1. The built-in examples

```bash
lythosle example
```

| Key | Example |
| --- | --- |
| `homogeneous` | Homogeneous slope (ACADS 1a): 10 m high 2H:1V embankment, c′ = 3 kPa, φ′ = 19.6°, dry. Published reference FS = 1.00 |
| `layered_water` | Layered slope with a water table: a 15 m cut through weathered fill over stiff clay and dense sand, with a phreatic surface that daylights on the face |
| `soft_foundation` | Embankment on soft clay: s<sub>u</sub> = 12 + 1.8·z kPa, end of construction |
| `seismic` | Pseudo-static case: the layered slope with k<sub>h</sub> = 0.15 and a 20 kPa road surcharge on the crest |
| `reinforced` | Soil-nailed cut: a steep 9 m cut in silty sand over rock, four rows of nails at 40 kN/m each |
| `tension_crack` | Clay cutting with a tension crack: s<sub>u</sub> = 60 kPa, a water-filled crack at the crest, non-circular optimisation |

## 2. The ACADS benchmark

```bash
lythosle example homogeneous
```

```text
Lythos LE  -  limit equilibrium slope stability
==============================================================
Model            : Homogeneous slope
Units            : metric
Slope height     : 10.00
Average face     : 26.6 deg
Materials        : Embankment fill
Critical circle  : centre (9.14, 29.49), R = 29.49
Entry / exit     : x = 31.27 / 10.02
Sliding weight   : 897.5 per unit width
Slices           : 50

Method                                 FS  Equilibrium       lambda
--------------------------------------------------------------------
Ordinary / Fellenius                0.953  moment                 -
Bishop simplified                   0.985  moment                 -
Janbu corrected                     0.994  force                  -
Spencer                             0.985  moment + force    +0.434
Morgenstern-Price (half-sine)       0.984  moment + force    +0.532

Surfaces evaluated: 3773 (1735 rejected)

Notes
  - all factors of safety are reported for the critical surface of Bishop simplified
  - Janbu correction factor f0 = 1.048

Run time: 1.32 s
```

<div class="result">
<div><small>Published reference</small><strong>1.00</strong></div>
<div class="ok"><small>Bishop</small><strong>0.985</strong></div>
<div class="ok"><small>Spencer</small><strong>0.985</strong></div>
<div><small>Surfaces evaluated</small><strong>3 773</strong></div>
</div>

The expected relationships show: Ordinary is the most conservative; on a circular surface Bishop sits right next to Spencer; Morgenstern-Price needs a larger λ than Spencer because the half-sine function averages less than one.

## 3. Your own model from the command line

```bash
lythosle analyze model.json --method spencer --method morgenstern_price \
         --slices 60 --json result.json --csv slices.csv
```

With the `layered_water` model:

```text
Model            : Layered slope with groundwater
Materials        : Weathered fill, Stiff clay, Dense sand
Groundwater      : water table
Critical circle  : centre (21.74, 35.12), R = 35.44
Entry / exit     : x = 50.91 / 17.04

Method                                 FS  Equilibrium       lambda
--------------------------------------------------------------------
Spencer                             1.138  moment + force    +0.385
Morgenstern-Price (half-sine)       1.138  moment + force    +0.473
```

The slice table (CSV) holds each slice's weight, base angle, pore pressure, normal force and mobilised shear strength:

```text
index,x,width,alpha_deg,height,weight,base_length,u,cohesion,phi_deg,material,normal_force,normal_stress,shear_strength,shear_mobilised
1,17.2769,0.4821,-7.2415,0.0315,0.2730,0.4859,0.0,5.0,26.0,Weathered fill,1.8681,3.8445,6.8751,6.0388
```

`analyze` takes either a bare model file or a `{"model": ..., "options": ...}` file — exactly what the browser's **Download** button produces. The first `--method` drives the search.

## 4. Earthquake and non-circular optimisation

```bash
lythosle example seismic --optimize
```

```text
Model            : Pseudo-static analysis
Seismic          : kh = 0.15, kv = 0.0
Critical surface : non-circular, 61 vertices

Method                                 FS  Equilibrium       lambda
--------------------------------------------------------------------
Bishop simplified                   1.117  moment                 -
Janbu corrected                     1.084  force                  -
Spencer                             1.134  moment + force    +0.494
Morgenstern-Price (half-sine)       1.131  moment + force    +0.625

Notes
  - non-circular optimisation (Spencer): FS 1.137 -> 1.134 (0.3%) after 272 trial surfaces
  - moment-only method on a non-circular surface: the result depends on the moment axis
```

The optimisation starts from the critical circle and lowers the FS by 0.3 % over 272 trial surfaces. The program itself warns that moment-only methods (Bishop) depend on the moment axis on a non-circular surface — use Spencer or Morgenstern-Price there.

## 5. The Python API

```python
from lythosle import SlopeModel, AnalysisOptions, analyze

model = SlopeModel.from_dict({
    "profile": [[0, 0], [10, 0], [30, 10], [50, 10]],
    "materials": [{"name": "fill", "unit_weight": 20, "cohesion": 3,
                   "friction_angle": 19.6}],
    "layers": [{"material": "fill"}],
})

result = analyze(model, AnalysisOptions.from_dict({
    "methods": ["bishop", "spencer"],
    "n_slices": 60,
    "search": {"nx": 16, "ny": 16, "n_tangent": 16, "refine_passes": 4},
}))

print(result.critical_fs)              # 0.987
print(result.results["spencer"].lam)   # 0.431 — interslice force ratio
print(result.text_report())
```

Lower-level pieces are available too — all eight methods on a given circle:

```python
from lythosle import build_slices, circular_surface, solve_all

surface = circular_surface(model.canonical(), xc=20, yc=30, radius=28)
mass = build_slices(model.canonical(), surface, n_slices=50)
print({k: round(v.fs, 3) for k, v in solve_all(mass).items()})
```

```text
{'ordinary': 1.35, 'bishop': 1.406, 'janbu': 1.346, 'janbu_corrected': 1.417,
 'corps_engineers': 1.412, 'lowe_karafiath': 1.413, 'spencer': 1.405, 'morgenstern_price': 1.405}
```

## 6. A staged fill: a design question

The `soft_foundation` example (a 6 m fill on soft clay, s<sub>u</sub> = 12 + 1.8·z) fails if raised in one lift. Changing the height and the clay's strength tests staged construction:

```python
import json
from lythosle import SlopeModel, AnalysisOptions, analyze

case = json.load(open("docs/examples/soft_foundation.json"))
options = AnalysisOptions.from_dict(case["options"])

def fs(height, su):
    m = json.loads(json.dumps(case["model"]))
    run = 2 * height                          # 1V:2H side slopes
    m["profile"] = [[0, 0], [12, 0], [12 + run, height], [44, height],
                    [44 + run, 0], [70, 0]]
    m["materials"][1]["su"] = su
    return analyze(SlopeModel.from_dict(m), options).critical_fs

print(f"one lift, 6 m, su0 = 12 kPa : FS = {fs(6.0, 12.0):.3f}")
print(f"stage 1,  3 m, su0 = 12 kPa : FS = {fs(3.0, 12.0):.3f}")
print(f"stage 2,  6 m, su0 = 24 kPa : FS = {fs(6.0, 24.0):.3f}")
```

```text
one lift, 6 m, su0 = 12 kPa : FS = 0.896
stage 1,  3 m, su0 = 12 kPa : FS = 1.362
stage 2,  6 m, su0 = 24 kPa : FS = 1.366
```

If consolidation under the first stage raises the clay's surface strength to 24 kPa, the second stage is safe. That wait is estimated with [Lythos Settle](/en/settle/examples)'s t<sub>90</sub> — as in the [end-to-end example](/en/guide/workflow).

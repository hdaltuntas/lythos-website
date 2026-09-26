---
title: "Lythos Bearing examples — bearing capacity of shallow foundations"
description: "Lythos Bearing examples with real output: Running the starter project, A width sweep from Python, Reading the methods as a table, EN 1997-1 design…"
---

# Lythos Bearing — examples

Every command and script on this page was run and its output is quoted as it came. They all start from the same starter project: **a 2.5 × 4.0 m rectangular footing on layered ground**.

| Input | Value |
| --- | --- |
| Footing | rectangle, B = 2.5 m, L = 4.0 m, D<sub>f</sub> = 1.5 m |
| Actions | V = 1700 kN, H<sub>B</sub> = 150 kN, M<sub>B</sub> = 300 kNm |
| Water table | 2.0 m deep |
| Soil | 1.5 m fill (φ′ = 30°) / 5.0 m stiff clay (c′ = 5 kPa, φ′ = 24°, c<sub>u</sub> = 90 kPa) / 8.0 m dense sand (φ′ = 38°) |
| Criteria | FS ≥ 3.0 (bearing), ≥ 1.5 (sliding), e ≤ B/6 |

## 1. Running the starter project

```bash
lythos-bearing example -o project.bearing
lythos-bearing run project.bearing
```

```text
BEARING CAPACITY RESULTS
--------------------------------------------------------------------------------
Foundation: Rectangle, B = 2.50 m, L = 4.00 m, Df = 1.50 m
Actions: V = 1700.0 kN, H = 150.0 kN (5.0° from vertical)
Eccentricity: e_B = 0.176 m, e_L = 0.000 m → B' = 2.147 m, L' = 4.000 m, A' = 8.59 m²
Contact pressure: q_max = 242.0 kPa, q_min = 98.0 kPa (within the middle third)
Surcharge at the base: σv0 = 27.0 kPa, u = 0.0 kPa, σ'v0 = 27.0 kPa
Failure zone: 2.80 m below the base (Stiff clay)
Design strength: c' = 5.0 kPa, φ' = 24.0°, cu = 90.0 kPa, γ = 9.69 kN/m³

Bearing capacity by method
  Method                         Analysis        q_ult    q_net,ult           Nc           Nq           Nγ
  Terzaghi (1943)                 drained        516.8        489.8        23.36        11.40         7.90
  Meyerhof (1963)                 drained        466.0        439.0        19.32         9.60         5.72
  Brinch Hansen (1970)            drained        474.2        447.2        19.32         9.60         5.75
  Vesić (1973) *                  drained        533.5        506.5        19.32         9.60         9.44
  EN 1997-1 Annex D               drained        517.3        490.3        19.32         9.60         7.66
  Skempton (1951), undrain      undrained        594.9        567.9         6.31         1.00         0.00

The three terms of the governing method
  cohesion: 133.2 kPa (25 %)
  surcharge: 339.1 kPa (64 %)
  self weight: 61.2 kPa (11 %)

Checks
  Bearing: FS = 2.96 ≥ 3.00 — NOT OK
  Sliding: FS = 5.33 ≥ 1.50 — OK
  Eccentricity: e/B = 0.071 ≤ 0.167 — OK

  The bearing check is satisfied from B = 2.51 m
```

<div class="result">
<div><small>q<sub>ult</sub> (Vesić)</small><strong>533.5 kPa</strong></div>
<div class="bad"><small>Bearing FS</small><strong>2.96</strong></div>
<div class="ok"><small>Sliding FS</small><strong>5.33</strong></div>
<div><small>Width required</small><strong>2.51 m</strong></div>
</div>

**Reading the output.** The water table is 0.5 m below the base, so the effective unit weight in the failure zone drops to 9.69 kN/m³. Strength is averaged over the Prandtl zone reaching 2.80 m below the base, which stays entirely in the stiff clay. The moment moves the resultant 0.176 m along B and the effective width becomes 2.147 m. 64 % of the capacity comes from the surcharge term: the founding depth is the key parameter of this footing.

Add `-o report.pdf` (or `.html`, `.docx`) for a report; `--lang tr` gives the whole output in Turkish.

## 2. A width sweep from Python

```python
from lythosbearing import forms
from lythosbearing.web.session import Session

session = Session(lang="en")
values = forms.defaults()              # the starter project: 2.5 × 4.0 m footing

for B in (2.0, 2.5, 3.0, 3.5):
    values["B"] = B
    r = session.analyse(values)
    print(f"B = {B:.1f} m   q_ult = {r['q_ult']:6.1f} kPa   FS = {r['FS']:.2f}")
```

```text
B = 2.0 m   q_ult =  522.7 kPa   FS = 2.15
B = 2.5 m   q_ult =  533.5 kPa   FS = 2.96
B = 3.0 m   q_ult =  550.4 kPa   FS = 3.92
B = 3.5 m   q_ult =  569.7 kPa   FS = 5.02
```

q<sub>ult</sub> grows slowly with the width (the N<sub>γ</sub> term), but most of the gain comes from the drop in the applied pressure; the factor of safety therefore rises quickly.

## 3. Reading the methods as a table

The interface's table is `result["table"]`:

```python
r = Session(lang="en").analyse(forms.defaults())
for row in r["table"]["rows"]:
    method, analysis, q_ult, q_net, q_all, fs = row["cells"]
    print(f"{method:28s} {analysis:10s} q_ult = {q_ult:>7s} kPa  FS = {fs}")
```

```text
Terzaghi (1943)              drained    q_ult =   516.8 kPa  FS = 2.87
Meyerhof (1963)              drained    q_ult =   466.0 kPa  FS = 2.57
Brinch Hansen (1970)         drained    q_ult =   474.2 kPa  FS = 2.62
Vesić (1973)                 drained    q_ult =   533.5 kPa  FS = 2.96
EN 1997-1 Annex D            drained    q_ult =   517.3 kPa  FS = 2.87
Skempton (1951), undrained   undrained  q_ult =   594.9 kPa  FS = 3.32
```

The methods differ by 14 % for the same footing (Meyerhof 2.57 – Vesić 2.96). Knowing which method the specification asks for matters more than “which number is right”.

## 4. EN 1997-1 design approaches

To verify with partial factors instead of a factor of safety, change `approach`:

```python
values = forms.defaults()
for approach in ("fs", "da1", "da2", "da3"):
    values["approach"] = approach
    r = session.analyse(values)
    print(f"{approach:4s} B ≥ {r['required_width']:.2f} m")
```

```text
fs   B ≥ 2.51 m
da1  B ≥ 2.08 m
da2  B ≥ 2.13 m
da3  B ≥ 2.34 m
```

With DA1 selected the report adds both combinations:

```text
EN 1997-1 verification (EN 1997-1, Design Approach 1)
  DA1-1 (A1 + M1 + R1): Ed = 2372 kN ≤ Rd = 4570 kN, Λ = 0.52 — OK
    sliding: Hd = 209 kN ≤ Rd = 1099 kN — OK
  DA1-2 (A2 + M2 + R1): Ed = 1853 kN ≤ Rd = 2733 kN, Λ = 0.68 — OK
    sliding: Hd = 163 kN ≤ Rd = 694 kN — OK
```

For this footing the FS = 3.0 criterion is more conservative than any of the three Eurocode approaches. `variable_fraction` (0.3 by default) is the variable share of the actions and sets the A1/A2 factors.

## 5. Earthquake

With B = 2.6 m chosen, the effect of the pseudo-static horizontal coefficient:

```python
values = forms.defaults()
values["B"] = 2.6
for kh in (0.0, 0.1, 0.2):
    values["seismic_enabled"] = kh > 0
    values["kh"] = kh
    r = session.analyse(values)
    print(f"kh = {kh:.1f}   q_ult = {r['q_ult']:6.1f} kPa   FS = {r['FS']:.2f}")
```

```text
kh = 0.0   q_ult =  536.6 kPa   FS = 3.14
kh = 0.1   q_ult =  497.9 kPa   FS = 2.90
kh = 0.2   q_ult =  452.1 kPa   FS = 2.62
```

k<sub>h</sub>·V is added to the horizontal load (the load inclination grows) and, with `soil_inertia` on, Paolucci & Pecker's (1 − k<sub>h</sub>/tan φ)<sup>0.35</sup> reduction is applied.

## 6. A reliability study

The project written by `example` carries two study variables: V (lognormal, CoV = 0.15) and the stiff clay's φ′ (normal, CoV = 0.12). 300 Latin hypercube samples:

```bash
lythos-bearing study project.bearing -o samples.csv
```

```text
STUDY RESULTS
------------------------------------------------------------------------------
Method: Latin hypercube; samples: 300; successful: 300

Statistics of the outputs
                                  n        mean         std          P5         P50         P95
  Ultimate capacity (kPa)       300       519.3       111.7       322.8       531.9       642.1
  Factor of safety              300       2.916      0.7192       1.768       2.942       4.112
  Factor of safety, sliding     300       5.014      0.7633       3.717       5.118       6.266

Probability of failure
  Bearing capacity: 158 of 300, P = 0.527 (95 % CI 0.47 – 0.582), β = -0.07
  Sliding: 0 of 300, P = 0 (95 % CI 8.67e-19 – 0.0126), β = > 2.71
  Eccentricity: 0 of 300, P = 0 (95 % CI 8.67e-19 – 0.0126), β = > 2.71

Sensitivity of the factor of safety (Spearman ρ)
  Stiff clay · phi                    +0.851
  Actions · V                         -0.287
```

Here “failure” means **FS < 3.0**; for a design whose mean sits at the threshold a probability near 0.5 is expected. The real information is in the sensitivity: the clay's **φ′** drives the result, not the load (ρ = +0.85). A little more site investigation could be worth more than a wider footing.

::: tip Setting up a study in the interface
In the **2 · Study** tab add any input to the list, choose a range or a distribution, and run. Results are drawn as tornado, histogram and scatter plots; the samples export to CSV/XLSX and become a section of the report.
:::

## 7. An in-situ test (SPT)

With `insitu_enabled`, Meyerhof's SPT rule (as revised by Bowles, 25 mm tolerable settlement) is added to the “other methods”:

```python
values = forms.defaults()
values.update(insitu_enabled=True, test="spt", N60=20.0, settlement=25.0)
```

```text
Other methods
  SPT (Meyerhof), settlement …                       —            —        355.6
```

The SPT rule is a **settlement** criterion: 355.6 kPa is the net pressure that keeps the footing's settlement within 25 mm, not a failure load.

# Lythos SPWA — examples

Every output is from a real run. The starter project: **a quay wall with two rows of anchors**.

| Input | Value |
| --- | --- |
| Geometry | retained height H = 8 m, level backfill and dredge line, wall friction δ = 20° |
| Loads | surcharge 15 kPa; water 4 m deep on the active side, 7 m on the passive side |
| Soil | sloped sandy gravel, γ = 19.5, γ<sub>sat</sub> = 21 kN/m³, φ′ = 38°, c = 0, k<sub>s</sub> = 30 000 kN/m³ |
| Anchors | at 1.5 m and 4.0 m, 15° inclined, EA = 117 000 kN, free length 12 m, spacing 2.5 m |
| Section | NZ 26, S355 |
| Seismic | k<sub>h</sub> = 0.1, restrained pore water, Westergaard on |
| Safety | FS<sub>φ</sub> = FS<sub>c</sub> = 1.25, bending 1.5; deflection FHWA H/120 |

## 1. Limit equilibrium and beam-spring

```bash
lythos-spwa example -o quay.spwa
lythos-spwa run quay.spwa
```

```text
--- DESIGN RESULTS ---
Selected Section: NZ 26 (S355)
------------------------------------------------------------
Theoretical Required Embedment (D_req): 4.64 m
Design Embedment Depth (D_design):     6.00 m
Total Wall Length (L_total):          14.00 m

--- ANCHOR FORCES ---
  Anchor 1.50 m (15°): T_h = 39.2 kN/m | axial = 101.4 kN/anchor | V = 10.5 kN/m
  Anchor 4.00 m (15°): T_h = 292.4 kN/m | axial = 756.8 kN/anchor | V = 78.4 kN/m
  NOTE: multi-anchor distribution is approximate (free-earth method is exact for one anchor only).

--- SUMMARY OF RESULTS ---
(Diagrams evaluated over H + D_req = H + 4.64 m; D_design is the constructed length.)
Equilibrium check: M(toe) = -97.93 kNm/m (should be ~0)
Net Pressure:      Min=-134.62, Max=90.16 kPa
Shear Force:       Min=-258.00, Max=151.63 kN/m
Bending Moment:    Min=-559.61, Max=13.81 kNm/m
Rotation:          Min=-0.0119, Max=0.0129 rad
Deflection (mm):   Min=-51.49, Max=34.07 mm

--- STRESS CHECK ---
Max. Absolute Moment: 559.61 kNm/m
Actual Bending Stress (σ_actual):   214.6 MPa
Allowable Bending Stress (f_allowable): 236.7 MPa
STATUS: OK

--- DEFLECTION CHECK (FHWA (H/120)) ---
Actual Max. Deflection (Δ_actual):   51.5 mm
Allowable Deflection (Δ_allowable): 66.7 mm
STATUS: OK

--- VERTICAL EQUILIBRIUM (indicative) ---
Vertical anchor component ΣV: 88.8 kN/m
Skin friction on embedded length (both faces): 461.5 kN/m
STATUS: OK

--- BEAM-SPRING (WINKLER) ANALYSIS ---
Embedment used: D = 6.00 m (L = 14.00 m); 5 stages, 19 Newton iterations
  Subgrade moduli used:
    Sloped Sandy Gravel: kₛ = 30,000 kN/m³ (Manual)
  1. excavate to 2.00 m: w_max = 3.6 mm
  2. install anchor at 1.50 m
  3. excavate to 4.50 m: w_max = 17.9 mm, T(1.5 m)=44
  4. install anchor at 4.00 m
  5. excavate to 8.00 m: w_max = 73.3 mm, T(1.5 m)=103, T(4.0 m)=208

  Anchor 1.50 m (15°): T_h = 103.1 kN/m | axial = 266.7 kN/anchor | V = 27.6 kN/m
  Anchor 4.00 m (15°): T_h = 207.7 kN/m | axial = 537.6 kN/anchor | V = 55.7 kN/m
Max. Absolute Moment: 564.58 kNm/m   (LE: 559.61)
Actual Bending Stress (σ_actual):   216.5 MPa
STATUS: OK
Max. Deflection: 73.3 mm   (LE: 51.5)
STATUS: NOT OK - DEFLECTION EXCEEDED!
Vertical anchor component ΣV: 83.3 kN/m
Skin friction on embedded length (both faces): 461.5 kN/m
STATUS: OK
Passive resistance mobilized: 79%   |   retained face at the active limit: 96% of the height
```

<div class="result">
<div><small>D<sub>design</sub></small><strong>6.00 m</strong></div>
<div class="ok"><small>Max. moment (LE / BS)</small><strong>560 / 565</strong></div>
<div class="bad"><small>Deflection (BS), limit 66.7</small><strong>73.3 mm</strong></div>
<div><small>Anchors (BS), T<sub>h</sub></small><strong>103 / 208</strong></div>
</div>

### Why two analyses?

- **The moments are almost the same** (559.6 and 564.6 kNm/m) — limit equilibrium is enough to choose the section.
- **The anchor loads are shared very differently.** LE gives the top anchor only 39 kN/m and the lower one 292 kN/m; in the staged analysis the top anchor picks up load from the first excavation stage and reaches 103 kN/m. The program itself notes that the LE multi-anchor distribution is approximate.
- **The deflection limit is exceeded only in the staged analysis** (73.3 > 66.7 mm): the wall moves while it is dug to 4.5 m before the second anchor goes in, and that movement does not come back.

Options: a stiffer section, prestressed anchors (`prestress`), or a smaller overdig (`bs_overdig`, 0.5 m by default).

## 2. The effect of the seismic coefficient on embedment

```python
from lythosspwa import forms
from lythosspwa.web.session import Session

session = Session(lang="en")
values = forms.defaults()              # 8 m quay wall, two anchors, NZ 26

for kh in (0.0, 0.1, 0.2):
    values["kh"] = kh
    values["is_seismic"] = kh > 0
    r = session.analyse(values)
    print(f"kh = {kh:.1f}   D_req = {r['d_required']:.2f} m   "
          f"D_design = {r['d_design']:.2f} m   L = {r['length']:.2f} m")
```

```text
kh = 0.0   D_req = 3.59 m   D_design = 4.50 m   L = 12.50 m
kh = 0.1   D_req = 4.64 m   D_design = 6.00 m   L = 14.00 m
kh = 0.2   D_req = 6.92 m   D_design = 8.50 m   L = 16.50 m
```

Mononobe-Okabe K<sub>AE</sub> grows fast and K<sub>PE</sub> drops; below the water table the inertia angle is enlarged by γ<sub>sat</sub>/γ′, and the 1 m of water in front of the wall adds the Westergaard pressure. From k<sub>h</sub> = 0 to 0.2 the wall gets **4 m** longer.

## 3. A reliability study

In the interface's **Study** tab (or by adding `study_variables` to the project file) define any soil, anchor, geometry, load, seismic or factor input as a range or a distribution (normal, lognormal, uniform). Sampling can be one-at-a-time, a full grid, Latin hypercube or Monte Carlo; correlated inputs are supported through the API:

```python
Study(..., correlation={(a, b): rho})
```

The study runs in parallel (`study_workers`), with progress and cancellation; results export to CSV/XLSX and become section 7 of the report.

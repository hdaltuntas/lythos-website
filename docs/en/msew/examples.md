# Lythos MSEW — examples

Every output is from a real run. The starter project: **a 6 m MSE wall with steel strips**.

| Input | Value |
| --- | --- |
| Wall | H = 6.0 m, embedment 0.6 m, vertical face, level backfill, facing 0.14 m |
| Surcharge | live (traffic) 10 kPa |
| Soils | reinforced fill γ = 19, φ′ = 34°; retained fill γ = 18, φ′ = 30°; foundation γ = 18.5, φ′ = 30°, c′ = 5 kPa |
| Reinforcement | Strip 50×4 (b = 50 mm, t = 4 mm, F<sub>y</sub> = 450 MPa, S<sub>h</sub> = 0.5 m) |
| Layout | first layer 0.375 m, S<sub>v</sub> = 0.75 m, L = 0.9·H ≥ 2.4 m → 8 layers, L = 5.4 m |
| Design | ASD, design life 75 years, zinc 86 µm |

## 1. The starter wall

```bash
lythos-msew example -o wall.msew
lythos-msew run wall.msew
```

```text
MSE WALL RESULTS
------------------------------------------------------------------------------------------------
Wall: H = 6.00 m, d = 0.60 m, batter ω = 0.0°, backslope β = 0.0°, L = 5.40 m (8 layers)
Design method: ASD — factors of safety (FHWA-NHI-00-043)
Ka retained = 0.3333 (δ = β), Ka reinforced = 0.2827, θ = 90.0°
Forces per metre: ΣV = 615.6 kN, ΣH = 128.0 kN, M_R = 1662.1 kNm, M_O = 276.0 kNm, e = 0.448 m

External stability (FS)
                                   value    required
  Sliding                           2.99        1.50   OK
  Overturning                       6.02        2.00   OK
  Eccentricity e [m]               0.448       0.900   OK
  Bearing capacity                  7.51        2.50   OK
  sliding on the foundation soil

Bearing capacity of the foundation
  B' = L − 2e = 4.576 m, σv = ΣV / B' = 146.3 kPa, q_ult = 1098.9 kPa (Vesić (1973))
  Method                             Nc           Nq           Nγ    q_ult kPa    q_all kPa           FS
  Vesić (1973) *                  30.14        18.40        22.40      1,098.9        439.5         7.51
  Meyerhof (1963)                 30.14        18.40        15.67        813.8        325.5         5.56
  Brinch Hansen (1970)            30.14        18.40        15.07        788.5        315.4         5.39
  Terzaghi (1943)                 37.16        22.46        20.12      1,037.2        414.9         7.09
  EN 1997-1 Annex D               30.14        18.40        20.09      1,001.1        400.5         6.84

Internal stability, layer by layer (FS)
                                   value    required
  Tensile                           3.81        1.82   OK
      Governing layer: z = 0.375 m
  Pullout                           1.62        1.50   OK
      Governing layer: z = 5.625 m
  Connection                        3.81        1.82   OK
      Governing layer: z = 0.375 m
  Sliding along a layer             3.42        1.50   OK
      Governing layer: z = 0.375 m

          z m       type        L m       Sv m         Kr     σv kPa  Tmax kN/m  T_al kN/m       La m       Le m         F*    Pr kN/m    tensile    pullout
        0.375 Strip 50x4       5.40      0.750      0.348      116.9      30.51      116.3       0.22       5.18      0.757       83.8       3.81       2.75
        1.125 Strip 50x4       5.40      0.750      0.366      102.6      28.15      116.3       0.67       4.73      0.923       80.8       4.13       2.87
        1.875 Strip 50x4       5.40      0.750      0.383       88.4      25.41      116.3       1.12       4.28      1.089       73.0       4.58       2.87
        2.625 Strip 50x4       5.40      0.750      0.401       74.1      22.30      116.3       1.57       3.83      1.254       61.5       5.21       2.76
        3.375 Strip 50x4       5.40      0.750      0.419       59.9      18.81      116.3       1.80       3.60      1.420       51.0       6.18       2.71
        4.125 Strip 50x4       5.40      0.750      0.436       45.6      14.93      116.3       1.80       3.60      1.586       40.7       7.79       2.72
        4.875 Strip 50x4       5.40      0.750      0.454       31.4      10.69      116.3       1.80       3.60      1.751       27.0      10.88       2.52
        5.625 Strip 50x4       5.40      0.750      0.472       17.1       6.06      116.3       1.80       3.60      1.917        9.8      19.19       1.62

  Required uniform length: L = 5.13 m (FHWA minimum 4.20 m)
```

<div class="result">
<div class="ok"><small>Sliding</small><strong>2.99</strong></div>
<div class="ok"><small>Overturning</small><strong>6.02</strong></div>
<div class="ok"><small>Bearing capacity</small><strong>7.51</strong></div>
<div class="ok"><small>Pullout (top layer)</small><strong>1.62</strong></div>
<div><small>Length required</small><strong>5.13 m</strong></div>
</div>

**Reading the output.** z is the layer's height above the levelling pad; z = 0.375 m is the lowest and z = 5.625 m the top layer. The table shows two things plainly: **tension** governs at the bottom (largest σ<sub>v</sub>), **pullout** at the top (smallest overburden, even though F* rises towards 2.0 there). The tensile check asks for 1.82 because the allowable stress in steel is 0.55·F<sub>y</sub> (1/0.55 = 1.82). T<sub>al</sub> = 116.3 kN/m comes from the section left after 75 years of corrosion.

## 2. Changing the reinforcement

The same wall, the same layout, three reinforcements:

```python
from lythosmsew import forms
from lythosmsew.web.session import Session

session = Session(lang="en")
for kind in ("Strip 50x4", "Geogrid 80", "Geotextile 60"):
    values = forms.defaults()
    values["layout_type"] = kind
    values["layers"] = session.generate(values)["layers"]   # re-apply the layout rule
    r = session.analyse(values)
    print(f"{kind:14s} {r['headline']}")
```

```text
Strip 50x4     OK · Sliding FS = 2.99 · Bearing capacity FS = 7.51 · Pullout FS = 1.62 · L ≥ 5.13 m
Geogrid 80     NOT OK · Sliding FS = 2.60 · Bearing capacity FS = 7.51 · Pullout FS = 3.42 · L ≥ 4.20 m
Geotextile 60  NOT OK · Sliding FS = 2.60 · Bearing capacity FS = 7.51 · Pullout FS = 2.56 · L ≥ 4.40 m
```

The cards say what fails with the geosynthetics:

```text
Geogrid 80     Connection        FS = 1.33 ≥ 1.50 · layer z = 0.375 m
Geotextile 60  Tensile strength  FS = 1.08 ≥ 1.50 · layer z = 0.375 m
               Connection        FS = 0.86 ≥ 1.50 · layer z = 0.375 m
```

Geosynthetics are far better in **pullout** (a continuous sheet: R<sub>c</sub> = 1, whereas for strips R<sub>c</sub> = b/S<sub>h</sub>), but their long-term strength drops by T<sub>ult</sub>/(RF<sub>ID</sub>·RF<sub>CR</sub>·RF<sub>D</sub>) and the **facing connection** (CR = 0.8) governs at the lowest layer. Sliding falls from 2.99 to 2.60 as well: now the governing mode is **sliding along the lowest geosynthetic** (C<sub>ds</sub>·tan φ<sub>r</sub>). The fix: a closer S<sub>v</sub> at the bottom or a stronger product — the type table allows a different type per layer.

## 3. A taller wall with earthquake

```python
values = forms.defaults()
values.update(H=8.0, seismic_enabled=True, A=0.2)
values["layers"] = session.generate(values)["layers"]   # re-lay the layers for 8 m
r = session.analyse(values)
print(r["headline"])
```

```text
OK · Sliding FS = 3.05 · Bearing capacity FS = 7.49 · Pullout FS = 1.88 · L ≥ 6.71 m
10 layers, L = 7.2 m
```

The layout rule (L = 0.9·H) gives 10 layers of 7.2 m for 8 m. With A = 0.2, A<sub>m</sub> = (1.45 − 0.2)·0.2 = 0.25; P<sub>AE</sub> acts at 0.6·H and the internal inertia is shared among the layers by L<sub>e</sub>. In the seismic case ASD asks for 75 % of the static factors of safety (`seismic_ratio`).

## 4. A height study

Run the same design rule from 3 to 12 m:

```bash
lythos-msew heights wall.msew -o heights.xlsx
```

```text
HEIGHT STUDY
------------------------------------------------------------------------------------------------
19 heights from 3.00 to 12.00 m · ASD · rule: L = 0.90·H ≥ 2.40 m, Sv = 0.750 m, Strip 50x4
Every check holds for H = 6.00 – 12.00 m; the shaded heights fail.

           H m         L m      layers    L req. m     Sliding Overturning   Tensile     Pullout      status
          3.00        2.70           4        4.23        2.77        4.95      6.18        0.81      NOT OK
          4.00        3.60           5        4.66        2.87        5.43      4.97        1.04      NOT OK
          5.00        4.50           6        5.32        2.94        5.77      4.26        1.18      NOT OK
          5.50        4.95           7        5.11        2.96        5.91      4.01        1.43      NOT OK
          6.00        5.40           8        5.13        2.99        6.02      3.81        1.62          OK
          8.00        7.20          10        6.22        3.05        6.37      2.95        1.88          OK
         10.00        9.00          13        6.46        3.10        6.60      2.37        2.60          OK
         12.00       10.80          16        7.20        3.13        6.76      1.98        3.25          OK
```

An unexpected but instructive result: **the low walls fail.** The L = 0.9·H rule gives short walls very short reinforcement; the length beyond the active zone (L<sub>e</sub>) and the overburden of the top layers are not enough for pullout. For low walls use a fixed minimum length (`layout_rule = "fixed"`) or a larger `layout_L_min`.

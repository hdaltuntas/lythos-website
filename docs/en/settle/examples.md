# Lythos Settle — examples

Every output is from a real run. The starter project: **a flexible 8 × 16 m raft on soft clay**.

| Input | Value |
| --- | --- |
| Foundation | rectangle, B = 8 m, L = 16 m, D<sub>f</sub> = 1.5 m, q = 100 kPa (gross), excavated overburden deducted |
| Water table | 2.0 m |
| Profile | 1.5 m fill / 3.5 m medium dense sand (E = 25 MPa) / **6 m soft clay** (C<sub>c</sub> = 0.32, C<sub>r</sub> = 0.05, e<sub>0</sub> = 1.05, OCR = 1.3, c<sub>v</sub> = 1.5 m²/yr, C<sub>α</sub> = 0.01, double drainage) / 10 m dense sand |
| Criteria | s<sub>allow</sub> = 150 mm, angular distortion 1/500, design life 50 years |

## 1. Settlement of a raft

```bash
lythos-settle example -o raft.settle
lythos-settle run raft.settle
```

```text
SETTLEMENT ANALYSIS RESULTS
------------------------------------------------------------------------------
Foundation: Rectangle, B = 8.00 m, L = 16.00 m, Df = 1.50 m, Flexible
Gross pressure q = 100.0 kPa; overburden at the base σv0 = 27.0 kPa; net pressure q_net = 73.0 kPa
Stress distribution: Boussinesq (elastic); immediate settlement: Elastic (Steinbrenner)
Influence depth: 15.75 m below ground (14.25 m below the base)

Settlement at the evaluation points (mm)
  Point                            Immediate     Consol.   Secondary       Total
  Centre                                42.9        76.1        22.7       141.7
  Characteristic point                  27.3        32.2        14.7        74.1
  Middle of long edge                   24.7        32.6        16.5        73.8
  Corner                                11.8        10.5         4.0        26.3

Settlement by layer, centre (mm)
  Layer                            Immediate     Consol.   Secondary       Total
  Medium dense sand                      6.9         0.0         0.0         6.9
  Soft clay                             34.3        76.1        22.7       133.1
  Dense sand                             1.7         0.0         0.0         1.7

Consolidation time
  Soft clay: H_dr = 3.00 m, cv = 1.50 m²/yr, t50 = 1.2 years, t90 = 5.1 years
  Settlement after 50 years: 141.7 mm

Checks
  Total settlement 141.7 mm, allowable 150.0 mm: OK
  Angular distortion 1/59, allowable 1/500: NOT OK
```

<div class="result">
<div class="ok"><small>Centre, total</small><strong>141.7 mm</strong></div>
<div><small>t<sub>90</sub></small><strong>5.1 years</strong></div>
<div class="bad"><small>Angular distortion</small><strong>1/59</strong></div>
</div>

**Reading the output.** The total settlement is within the limit, but the difference between the centre and the edge of a **flexible** raft (141.7 − 73.8 mm over B/2 = 4 m) gives a distortion of 1/59. 94 % of the settlement comes from the soft clay. The net pressure is 73 kPa because the 1.5 m of excavated overburden is deducted.

## 2. The effect of the method

```python
from lythossettle import forms
from lythossettle.web.session import Session

session = Session(lang="en")
cases = {
    "Boussinesq, flexible": dict(stress_method="boussinesq", rigidity="flexible"),
    "2:1 spread, flexible": dict(stress_method="two_to_one", rigidity="flexible"),
    "Schmertmann in sand":  dict(immediate_method="schmertmann"),
}
for name, change in cases.items():
    values = forms.defaults()
    values.update(change)
    c = session.analyse(values)["points"]["center"]
    print(f"{name:22s} centre: immediate {c['immediate']:5.1f} + consolidation "
          f"{c['consolidation']:5.1f} + secondary {c['secondary']:4.1f} = {c['total']:6.1f} mm")
```

```text
Boussinesq, flexible   centre: immediate  42.9 + consolidation  76.1 + secondary 22.7 =  141.7 mm
2:1 spread, flexible   centre: immediate  42.5 + consolidation  36.9 + secondary 15.6 =   95.1 mm
Schmertmann in sand    centre: immediate  40.5 + consolidation  76.1 + secondary 22.7 =  139.3 mm
```

The 2:1 spread shares the load evenly over its area; it underestimates the stress under the centre compared with Boussinesq and halves the consolidation there. 2:1 is reasonable for an average settlement and misleading for the centre–edge difference.

**Rigid foundation:** with `rigidity="rigid"` the settlement is read at the characteristic point (0.74·B/2, 0.74·L/2) and the headline becomes `s = 74.1 mm`; the distortion problem disappears for a rigid raft, but the raft itself must now carry that difference in bending.

## 3. An embankment (trapezoidal load)

`shape="embankment"` replaces the foundation with a fill:

```python
values = forms.defaults()
values.update(shape="embankment", emb_crest=12.0, emb_height=4.0,
              emb_slope_left=26.57, emb_slope_right=26.57, emb_gamma=20.0)

r = Session(lang="en").analyse(values)
print(r["headline"])
for name, p in r["points"].items():
    print(f"{name:8s} total = {p['total']:6.1f} mm")
```

```text
s = 228.0 mm · t90 = 5.1 years · Settlement check: NOT OK
center   total =  228.0 mm
shoulder total =  190.6 mm
midslope total =  108.5 mm
toe      total =   17.0 mm
```

The 4 m fill (γH = 80 kPa) applies a bigger net load than the excavated raft; 228 mm exceeds the limit. The stress increase is exact — Flamant's line load integrated over the piecewise-linear load — and the immediate settlement is Steinbrenner in plane strain, the crest as one strip and each slope as 16 slices.

## 4. A reliability study

The starter project's study variables: the pressure q and the clay's C<sub>c</sub>. 500 LHS samples:

```bash
lythos-settle study raft.settle -o samples.csv
```

```text
Statistics of the outputs
                                           n      mean       std        P5       P50       P95
  Total settlement (mm)                  500       141      28.9      98.7       137       194
  Consolidation settlement (mm)          500      76.1      22.3        45      73.1       121
  Angular distortion (‰)                 500      16.9      3.46        12      16.4      23.1

Probability of exceeding the criteria
  Settlement > allowable: 175 of 500, P = 0.35 (95 % CI 0.309 – 0.393), β = 0.39
  Distortion > allowable: 500 of 500, P = 1 (95 % CI 0.992 – 1), β = −∞

Sensitivity of the total settlement (Spearman ρ)
  Foundation · q                          +0.86
  Soft clay · Cc                          +0.44
```

The deterministic answer, 141.7 mm, says “OK”; with the uncertainty, 150 mm is exceeded with a probability of **35 %** (β = 0.39). The distortion of the flexible raft is exceeded in every sample: that is not an uncertainty but a design decision (stiffness or ground improvement).

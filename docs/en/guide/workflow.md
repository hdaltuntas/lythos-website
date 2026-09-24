# A project end to end

This page uses all eight members of the Lythos family, one after another, on an imaginary **port expansion site**. Every step was **actually run** with the program's own starter project (or a small change to it), and the output is quoted as it came.

::: info About the numbers
Each step uses its own program's starter example; the soil profiles are not identical from step to step. The aim is not to finish one design but to show how the right tool answers the right question.
:::

<div class="steps">

### Office building footings — Lythos Bearing

A 2.5 × 4.0 m pad footing on layered ground (fill / stiff clay / dense sand); V = 1700 kN, H = 150 kN, M = 300 kNm.

```bash
lythos-bearing example -o office.bearing
lythos-bearing run office.bearing
```

```text
Checks
  Bearing: FS = 2.96 ≥ 3.00 — NOT OK
  Sliding: FS = 5.33 ≥ 1.50 — OK
  Eccentricity: e/B = 0.071 ≤ 0.167 — OK

  The bearing check is satisfied from B = 2.51 m
```

Vesić gives q<sub>ult</sub> = 533.5 kPa; Meyerhof is the most conservative (466.0 kPa). Decision: **B = 2.60 m**. → [Bearing examples](/en/bearing/examples)

### Preload fill for the warehouse yard — Lythos Settle

A 4 m high preload fill with a 12 m crest on soft clay:

```python
values = forms.defaults()
values.update(shape="embankment", emb_crest=12.0, emb_height=4.0, emb_gamma=20.0)
r = Session(lang="en").analyse(values)
```

```text
s = 228.0 mm · t90 = 5.1 years · Settlement check: NOT OK
center   total =  228.0 mm
shoulder total =  190.6 mm
midslope total =  108.5 mm
toe      total =   17.0 mm
```

90 % of the settlement takes **5.1 years** — too long for a preload. Vertical drains will clearly be needed. → [Settle examples](/en/settle/examples)

### Stability of the fill — Lythos LE

A 6 m fill on the same kind of soft clay (s<sub>u</sub> = 12 + 1.8·z kPa), raised in one lift:

```text
one lift, 6 m, su0 = 12 kPa : FS = 0.896
stage 1,  3 m, su0 = 12 kPa : FS = 1.362
stage 2,  6 m, su0 = 24 kPa : FS = 1.366
```

In one lift the fill fails (Bishop 0.896). Built in two stages, once consolidation under the first has raised s<sub>u0</sub> to 24 kPa, the second is safe at 1.37. Settle's t90 is the measure of that wait. → [LE examples](/en/le/examples)

### Warehouse piled foundation — Lythos Pile

A 3 × 3 group of bored piles, D = 0.80 m, L = 20 m, Q = 10 000 kN:

```text
CHECKS
  Single pile: FS = 4.31 (required 2.50) — OK
  Group: FS = 3.10 (required 2.50) — OK
  Settlement: 32.8 mm (allowed 40.0 mm) — OK

  Required length: L = 18.50 m (tip at 20.00 m)
```

A length sweep shows an interesting detail: at L = 18 m the FS is only 1.84; as soon as the tip enters the dense sand (L = 20 m) it jumps to 4.31. Founding the piles in the dense sand is what matters. → [Pile examples](/en/pile/examples)

### Quay wall — Lythos SPWA

An 8 m retained height, an NZ 26 sheet pile quay with two rows of anchors; k<sub>h</sub> = 0.1:

```text
Theoretical Required Embedment (D_req): 4.64 m
Design Embedment Depth (D_design):     6.00 m
...
Max. Absolute Moment: 564.58 kNm/m   (LE: 559.61)
Max. Deflection: 73.3 mm   (LE: 51.5)
STATUS: NOT OK - DEFLECTION EXCEEDED!
```

Limit equilibrium says the wall is adequate; the **staged beam-spring analysis** shows the deflection exceeding the H/120 = 66.7 mm limit. That is exactly the value of putting the two side by side: a stiffer section or prestressed anchors are needed. → [SPWA examples](/en/spwa/examples)

### Pumping station deep excavation — LythosFEA

An 8 m excavation behind a bored pile wall (D1000 @ 1.2 m) with two rows of prestressed anchors; six stages:

```text
stage 5/6: 5 - stress anchor row 2, excavate to 22.0 m
stage 6/6: 6 - factor of safety
lowest factor of safety: 2.034
```

<div class="result">
<div class="ok"><small>Factor of safety (SSR)</small><strong>2.03</strong></div>
<div><small>Wall max. moment</small><strong>219 kNm/m</strong></div>
<div><small>Wall max. deflection</small><strong>20.8 mm</strong></div>
<div><small>Anchor loads</small><strong>306 / 450 kN</strong></div>
</div>

→ [FEA examples](/en/fea/examples)

### Access ramp — Lythos MSEW

A 6 m MSE wall with 50×4 steel strips:

```text
External stability (FS)       value   required
  Sliding                      2.99      1.50   OK
  Overturning                  6.02      2.00   OK
  Bearing capacity             7.51      2.50   OK
Internal stability
  Pullout                      1.62      1.50   OK   (z = 5.625 m)
  Required uniform length: L = 5.13 m (FHWA minimum 4.20 m)
```

**Pullout** of the top layer governs — that is where the overburden is smallest. → [MSEW examples](/en/msew/examples)

### Fill quarry — Lythos Kinematic

Six joint sets are screened against a 20 m rock face in the quarry:

```text
Planar Sliding: 1 / 6
  E3               CRITICAL
```

The critical set goes to limit equilibrium: planar sliding with a tension crack, **FS = 0.891**. For FS = 1.5 the support required, at Hoek & Bray's optimum angle, is **697 kN/m**. → [Kinematic examples](/en/kinematic/examples)

</div>

## Summary

| Structure | Tool | Result | Decision |
| --- | --- | --- | --- |
| Office footing | Bearing | FS = 2.96 < 3.00 | B = 2.60 m |
| Preload fill | Settle | 228 mm, t90 = 5.1 years | Vertical drains |
| Fill stability | LE | 0.90 → 1.36 / 1.37 | Two-stage construction |
| Warehouse piles | Pile | FS 4.31 / group 3.10 | L ≥ 18.5 m |
| Quay wall | SPWA | δ = 73 mm > 67 mm | Stiffer section |
| Deep excavation | FEA | SSR = 2.03 | Adequate |
| Access ramp | MSEW | Every check OK | L ≥ 5.13 m |
| Quarry face | Kinematic | FS = 0.89 | 697 kN/m of bolting |

Each step's project file comes from the `example` command and re-runs with `run`; every number on this page can be reproduced on your own machine.

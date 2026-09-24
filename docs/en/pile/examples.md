# Lythos Pile — examples

Every output is from a real run. The starter project: **a 3 × 3 group of bored piles in layered ground**.

| Input | Value |
| --- | --- |
| Pile | circular, D = 0.80 m, L = 20 m, head at 1.5 m, bored / CFA, γ<sub>p</sub> = 25 kN/m³ |
| Group | 3 × 3 at 2.40 m (3D), Q = 10 000 kN, Converse–Labarre, block failure on |
| Water table | 2.5 m |
| Profile | 2 m fill / 6 m soft clay (c<sub>u</sub> = 35) / 7 m medium dense sand (φ′ = 32°) / 5 m stiff clay (c<sub>u</sub> = 120) / 12 m dense sand (φ′ = 36°, N<sub>60</sub> = 40) |
| Criteria | FS = 2.5, allowable settlement 40 mm |

## 1. A pile group

```bash
lythos-pile example -o group.pile
lythos-pile run group.pile
```

```text
PILE CAPACITY RESULTS
------------------------------------------------------------------------------------
Pile: Circular, D = 0.80 m, L = 20.00 m, head at 1.50 m, tip at 21.50 m; Bored / CFA
Base area Ab = 0.5027 m², perimeter p = 2.513 m
Group: 3 × 3 = 9 piles at 2.40 × 2.40 m; Q = 10,000 kN, 1,111 kN per pile
Water table at 2.50 m
Critical depth zc = 12.00 m (15·D)
In sand: K/K0 = 1.00, δ/φ' = 0.75

BASE RESISTANCE
  Tip in 'Dense sand' (Granular) at 21.50 m, σ'v0 = 228.6 kPa
  Meyerhof *                    Nq* = 168.0    6,184 kPa     3,108 kN
  Vesić                         Nq* = 114.9   14,970 kPa     7,525 kN
  Janbu                          Nq* = 37.8    4,919 kPa     2,473 kN
  SPT — Meyerhof                               3,040 kPa     1,528 kN

SHAFT FRICTION
  Layer                           Depth (m)      Qs (kN)
  Fill                            1.50–2.00         8 kN
  Soft clay                       2.00–8.00       357 kN
  Medium dense sand              8.00–15.00       437 kN
  Stiff clay                    15.00–20.00       939 kN
  Dense sand                    20.00–21.50       103 kN
  Shaft friction by clay method:
  α — API RP 2A *                  1,844 kN
  α — Kulhawy & Phoon              1,704 kN
  α — Sladen                       1,560 kN
  β — Burland                      1,962 kN
  λ — Vijayvergiya & Focht         1,776 kN
  SPT — Meyerhof                   1,815 kN

CAPACITY OF A SINGLE PILE
  Qs = 1,844 kN + Qb = 3,108 kN = Qult = 4,952 kN
  Pile weight W = 158 kN (subtracted: yes)
  Qult,net = 4,794 kN, FS = 2.50, Qall = 1,918 kN

PILE GROUP
  Converse–Labarre *              η = 0.727
  Los Angeles Group               η = 0.792
  Seiler–Keeney                   η = 0.887
  Feld                            η = 0.722
  η = 1                           η = 1.000
  η = 0.727: η·n·Qult = 0.727 · 9 · Qult = 32,396 kN
  Block 5.60 × 5.60 m: shaft 26,227 kN + base 193,925 kN = 220,151 kN
  Qg,ult = 32,396 kN (efficiency), Qg,ult − n·W = 30,978 kN, Qg,all = 12,391 kN

SETTLEMENT
  Single pile (Vesić): s1 = 1.20 + s2 = 12.27 + s3 = 0.74 = 14.20 mm
  Equivalent raft at 14.84 m, q = 318.9 kPa: consolidation 19.6 + elastic 12.2 + pile shortening 1.0 = 32.8 mm
  Vesić: s·√(Bg/D) = s·√(5.60/0.80) = 37.6 mm
  Meyerhof SPT: N60 = 40, I = 0.55, q = 318.9 kPa, sg = 10.0 mm

CHECKS
  Single pile: FS = 4.31 (required 2.50) — OK
  Group: FS = 3.10 (required 2.50) — OK
  Settlement: 32.8 mm (allowed 40.0 mm) — OK

  Required length: L = 18.50 m (tip at 20.00 m)

Warnings
  • Meyerhof's limit governs the base: qb = 0.5·pa·Nq*·tan φ' = 6,184 kPa.
  • Meyerhof's SPT rule was derived for driven piles; for a bored pile it is shown for comparison only.
  • Below the critical depth zc = 12.00 m the shaft friction and the base resistance in sand no longer grow with depth.
  • The stresses under the equivalent raft still matter at the foot of the profile (32.00 m); layers below it would settle too.
```

<div class="result">
<div><small>Q<sub>ult,net</sub></small><strong>4 794 kN</strong></div>
<div class="ok"><small>Single pile FS</small><strong>4.31</strong></div>
<div class="ok"><small>Group FS</small><strong>3.10</strong></div>
<div class="ok"><small>Group settlement</small><strong>32.8 mm</strong></div>
<div><small>Required length</small><strong>18.5 m</strong></div>
</div>

**Reading the output.** The base methods differ by more than a factor of three (Janbu 2 473 kN – Vesić 7 525 kN); Meyerhof's limiting value governs. In the group, the efficiency (0.727) matters far more than block failure. The **Warnings** are among the program's most valuable output: they say where each assumption is being stretched.

## 2. A length sweep

```python
from lythospile import forms
from lythospile.web.session import Session

session = Session(lang="en")
values = forms.defaults()              # 3 × 3 bored group, D = 0.8 m, Q = 10 000 kN

for L in (16.0, 18.0, 20.0, 22.0):
    values["L"] = L
    r = session.analyse(values)
    print(f"L = {L:4.1f} m   Qult,net = {r['Q_ult_net']:7.0f} kN   FS = {r['FS']:.2f}")
```

```text
L = 16.0 m   Qult,net =    1671 kN   FS = 1.50
L = 18.0 m   Qult,net =    2041 kN   FS = 1.84
L = 20.0 m   Qult,net =    4794 kN   FS = 4.31
L = 22.0 m   Qult,net =    4917 kN   FS = 4.43
```

With the head at 1.5 m, at L = 18.5 m the tip reaches 20 m — the **dense sand** — and the capacity jumps there. The required length (`r["required_length"]` = 18.5 m) is the search that finds that jump; the capacity–length curve is stepped for the same reason.

## 3. Group efficiency methods

`efficiency` selects which efficiency the group capacity uses: `converse_labarre`, `los_angeles`, `seiler_keeney`, `feld` or `unity` (η = 1, the group as n single piles). The report always lists them all; the chosen one is starred. Closer spacing than 2.4 m (3D) lowers the efficiencies and brings block failure forward — sweep `sx` and `sy` with a **study**.

## 4. A rock socket

The starter project also carries a rock socket: D = 1.0 m, head at 1 m, rock at 12 m, a 4 m socket, Q = 9 000 kN, q<sub>u</sub> = 20 MPa.

```bash
lythos-pile socket group.pile
```

```text
ROCK-SOCKETED PILE
------------------------------------------------------------------------------------
D = 1.00 m, head at 1.00 m, rock at 12.00 m (overburden 11.00 m), socket Ls = 4.00 m, Q = 9,000 kN
qu = 20.0 MPa (side shear with 20.0 MPa, f'c = 30.0 MPa), Em = 5,940 MPa, Em/Ei = 0.297, αE = 0.698
Hoek–Brown: GSI = 60, mi = 10.0, mb = 2.397, s = 1.17e-02

UNIT SIDE SHEAR AND SOCKET LENGTH
  Correlation                                fs (kPa)    Ls needed (m)  Qall at Ls (kN)
  Rosenberg & Journeaux (1976)                  1,754             2.67           11,922
  Horvath & Kenney (1979)                         939             5.01            7,826
  Meigh & Wolski (1979)                         1,328             3.53            9,778
  Williams et al. (1980)                        1,294             3.62            9,608
  Reynolds & Kaderabek (1980) †                 6,000             0.78           33,264
  Gupton & Logan (1984) †                       4,000             1.17           23,211
  Rowe & Armitage (1987)                        2,012             2.32           13,221
  Carter & Kulhawy (1988)                         894             5.26            7,601
  Toh et al. (1989) †                           5,000             0.93           28,238
  Zhang & Einstein (1998)                       1,789             2.62           12,097
  O'Neill & Reese (1999) / AASHTO                 646             7.32            6,350
  Kulhawy et al. (2005)                         1,424             3.29           10,260
  9 correlations in range: mean 1,342, median 1,328, 646 – 2,012 kPa
  † fitted to weak rock; out of range above qu = 5.0 MPa

UNIT BASE RESISTANCE
  Coates (1967)                                             3·qu               60.00 MPa
  Rowe & Armitage (1987)                                  2.7·qu               54.00 MPa
  Carter & Kulhawy (1988), Hoek–Brown       [√s + √(m√s + s)]·qu               12.59 MPa
  Zhang & Einstein (1998)                           4.83·qu^0.51               22.26 MPa
  AASHTO / O'Neill & Reese                                2.5·qu               50.00 MPa
  CFEM (Ladanyi & Roy)                                3·Ksp·d·qu               45.85 MPa

DESIGN
  fs = 1,342 kPa, qb = 12.59 MPa, FSside = 2.50, FSbase = 3.00
  Socket length needed 3.49 m, minimum 1.00 m → design Ls = 3.49 m
  At Ls = 4.00 m: Qs = 16,866, Qb = 9,886, W = 191, Qall = 9,851 kN against Q = 9,000 kN (Q/Qall = 0.91) — OK

ELASTIC SETTLEMENT AT Ls = 4.00 m
  Shortening through the overburden: 4.20 mm
  Randolph & Wroth, side and base: 5.00 mm (10 % through the base)
  Randolph & Wroth, side only: 5.03 mm
  Vesić: 6.01 mm
```

<div class="result">
<div><small>Design f<sub>s</sub> (mean)</small><strong>1 342 kPa</strong></div>
<div><small>Design q<sub>b</sub> (minimum)</small><strong>12.6 MPa</strong></div>
<div><small>Socket required</small><strong>3.49 m</strong></div>
<div class="ok"><small>Q/Q<sub>all</sub> (L<sub>s</sub> = 4 m)</small><strong>0.91</strong></div>
</div>

**Reading the output.** For the same rock the twelve correlations give between 646 and 6 000 kPa of side shear. The three fitted to weak rock (†) are left out of the statistics above q<sub>u</sub> = 5 MPa. The design side shear is the **mean** of the remaining nine (`design = "mean"`); the base uses the smallest (`base_design = "min"`). The lengths needed range from 2.3 to 7.3 m — again, knowing which correlation the specification asks for is what decides.

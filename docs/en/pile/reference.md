---
title: "Lythos Pile reference — methods, inputs, validation"
description: "Lythos Pile reference: Shaft friction, Base resistance, Weight, capacity and the check, Groups, Settlement, Rock socket, Inputs, Modules, Validation."
---

# Lythos Pile — reference

## Shaft friction

Q<sub>s</sub> = Σ f<sub>s</sub>·p·Δz; the shaft is cut into slices no thicker than 0.25 m that never straddle a layer boundary.

**Granular layers:** f<sub>s</sub> = K·σ′<sub>v</sub>·tan δ, K = (K/K<sub>0</sub>)·K<sub>0</sub>, K<sub>0</sub> = 1 − sin φ′, δ = (δ/φ′)·φ′. K/K<sub>0</sub> is 1.0 for a bored pile, 1.2 for a small-displacement and 1.4 for a large-displacement driven pile, unless entered. With the critical depth on, σ′<sub>v</sub> in sand is held at its value at z<sub>c</sub> = 15·D.

**Cohesive layers:**

| Method | f<sub>s</sub> |
| --- | --- |
| API RP 2A (1987) | α·c<sub>u</sub>, α = 0.5·ψ<sup>−0.5</sup> (ψ ≤ 1), 0.5·ψ<sup>−0.25</sup> (ψ > 1), ψ = c<sub>u</sub>/σ′<sub>v</sub>, α ≤ 1 |
| Kulhawy & Phoon (1993) | α·c<sub>u</sub>, α = 0.21 + 0.26·p<sub>a</sub>/c<sub>u</sub> ≤ 1 |
| Sladen (1992) | α·c<sub>u</sub>, α = C·(σ′<sub>v</sub>/c<sub>u</sub>)<sup>0.45</sup> ≤ 1; C = 0.4 bored, 0.5 driven |
| β — Burland (1973) | (1 − sin φ′)·tan φ′·√OCR·σ′<sub>v</sub> |
| λ — Vijayvergiya & Focht (1972) | λ·(σ′<sub>v</sub> + 2c<sub>u</sub>), λ from the pile's penetration |

**SPT (Meyerhof 1976):** f<sub>s</sub> = 0.02·p<sub>a</sub>·N<sub>60</sub> (large displacement), 0.01·p<sub>a</sub>·N<sub>60</sub> otherwise.

## Base resistance

| Soil | Method | q<sub>b</sub> |
| --- | --- | --- |
| Sand | Meyerhof (1976) | σ′<sub>v</sub>·N<sub>q</sub>* ≤ 0.5·p<sub>a</sub>·N<sub>q</sub>*·tan φ′ |
| Sand | Vesić (1977) | σ′<sub>v</sub>·N<sub>q</sub>*(I<sub>rr</sub>) |
| Sand | Janbu (1976) | σ′<sub>v</sub>·N<sub>q</sub>*, N<sub>q</sub>* = (tan φ′ + √(1 + tan²φ′))²·e<sup>2η′·tan φ′</sup> |
| Clay | Skempton / Meyerhof | 9·c<sub>u</sub> |
| Clay | Vesić | N<sub>c</sub>*·c<sub>u</sub>, N<sub>c</sub>* = 4/3·(ln I<sub>r</sub> + 1) + π/2 + 1 |
| Clay | Janbu, φ = 0 | N<sub>c</sub>* = 2 + 2η′ (5.14 at η′ = 90°) |
| Either | SPT (Meyerhof 1976) | 0.4·p<sub>a</sub>·N<sub>60</sub>·L<sub>b</sub>/D ≤ 4·p<sub>a</sub>·N<sub>60</sub> |

A weaker layer within 3·D below the tip is reported.

## Weight, capacity and the check

```text
W = Ab·[γp·(length above the water table) + (γp − γw)·(length below it)]
Qult = Qs + Qb,   Qult,net = Qult − W,   Qall = Qult,net / FS
```

Every combination of a shaft method with a base method is reported; the chosen pair makes the checks.

## Groups

B<sub>g</sub> × L<sub>g</sub> = [(n<sub>1</sub> − 1)s<sub>x</sub> + D] × [(n<sub>2</sub> − 1)s<sub>y</sub> + D].

| Method | η |
| --- | --- |
| Converse–Labarre | 1 − θ·[(n<sub>1</sub> − 1)n<sub>2</sub> + (n<sub>2</sub> − 1)n<sub>1</sub>]/(90·n<sub>1</sub>·n<sub>2</sub>), θ = arctan(D/s) [°] |
| Los Angeles Group | 1 − D/(π·s·n<sub>1</sub>·n<sub>2</sub>)·[n<sub>1</sub>(n<sub>2</sub> − 1) + n<sub>2</sub>(n<sub>1</sub> − 1) + √2(n<sub>1</sub> − 1)(n<sub>2</sub> − 1)] |
| Seiler–Keeney | 1 − [36s/(75s² − 7)]·(n<sub>1</sub> + n<sub>2</sub> − 2)/(n<sub>1</sub> + n<sub>2</sub> − 1) + 0.3/(n<sub>1</sub> + n<sub>2</sub>) |
| Feld | 1 − (number of neighbours, straight and diagonal)/16, averaged over the group |

**Block failure:** the group as one block; f<sub>s</sub> = c<sub>u</sub> in clay and K<sub>0</sub>·σ′<sub>v</sub>·tan φ′ in sand; the base with Skempton's N<sub>c</sub> in clay.

```text
Qg,ult = min(η·n·Qult, Qblock),   Qg,all = (Qg,ult − n·W) / FS,   Q ≤ Qg,all
```

## Settlement

| Case | Method |
| --- | --- |
| Single pile | Vesić (1977): s<sub>1</sub> (shaft shortening) + s<sub>2</sub> (tip) + s<sub>3</sub> (along the shaft) |
| Group | equivalent raft at 2/3·L, 2:1 spread; clays consolidate with C<sub>c</sub>, C<sub>r</sub>, e<sub>0</sub>, OCR, the rest compress elastically |
| Group | Vesić s·√(B<sub>g</sub>/D) |
| Group | Meyerhof's SPT rule |

## Rock socket

| Quantity | Method |
| --- | --- |
| Side shear | 12 correlations: Rosenberg & Journeaux, Horvath & Kenney, Meigh & Wolski, Williams et al., Reynolds & Kaderabek, Gupton & Logan, Rowe & Armitage, Carter & Kulhawy, Toh et al., Zhang & Einstein, O'Neill & Reese / AASHTO, Kulhawy et al.; q<sub>u</sub> ≤ f′<sub>c</sub>; the weak-rock rules left out above a limit |
| Base | Coates, Rowe & Armitage, Carter & Kulhawy (Hoek–Brown), Zhang & Einstein, AASHTO, CFEM |
| Socket length | Q<sub>s</sub>/FS<sub>side</sub> + Q<sub>b</sub>/FS<sub>base</sub> − W = Q, by bisection, per correlation and for the design |
| Rock mass modulus | from RQD (Gardner), from GSI (Hoek & Diederichs), or entered |
| Settlement | Randolph & Wroth with and without the base; Vesić; plus the shortening through the overburden |

The design statistic `design` ∈ {`mean`, `median`, `lower`, `upper`} or a single correlation; the base `base_design` ∈ {`none`, `min`, `mean`} or a single method.

## Inputs

| Group | Fields |
| --- | --- |
| **Pile** | circular / square, D, L, depth of the pile head, installation (`bored`, `driven_low`, `driven_high`), γ<sub>p</sub>, E<sub>p</sub> |
| **Load** | the vertical load on the group at the underside of the cap |
| **Group** | piles along B and L, spacings, the efficiency method, block failure on / off (1 × 1 is a single pile) |
| **Soil profile** | thickness, granular / cohesive, γ, γ<sub>sat</sub>, φ′, c<sub>u</sub>, OCR, N<sub>60</sub>, E, ν, C<sub>c</sub>, C<sub>r</sub>, e<sub>0</sub> |
| **Methods** | clay method, base method, K/K<sub>0</sub> and δ/φ′ in sand, critical depth, Janbu's η′, Sladen's C, the SPT rule; weight subtracted / buoyant |
| **Settlement** | the method for the check, the raft depth, the load spread, the distribution of the shaft friction |
| **Criteria** | FS, allowable settlement, the length search |
| **Rock socket** | diameter and length, head and rock surface depths, load; q<sub>u</sub>, modulus (RQD / GSI / direct), GSI, m<sub>i</sub>, D, ν, joint spacing and aperture; f′<sub>c</sub>, E<sub>c</sub>; design statistic and factors of safety |

## Modules

| File | Content |
| --- | --- |
| `profile.py` | The layered column and its stresses, slices and averages |
| `axial.py` | Unit shaft friction and base resistance, per method |
| `group.py` | Group layout, efficiencies, Skempton's N<sub>c</sub> of the block |
| `settlement.py` | Vesić's single-pile settlement, the equivalent raft, the group rules |
| `socket.py` | Rock sockets: correlations, base, length, Randolph & Wroth |
| `engine.py` | The pile analysis: shaft, base, weight, group, settlement, length |
| `study.py`, `report.py`, `web/` | Studies, report, interface |

## Validation

Every formula is checked against a hand calculation: the α, β and λ methods, Meyerhof's table and limit, Vesić's and Janbu's factors, the four efficiencies, Feld's count, Vesić's settlement term by term, the consolidation of a clay, the equivalent raft, each of the twelve socket correlations and the six base methods, Randolph & Wroth's rigid limits. The engine is tested on simple cases worked by hand (a clay pile, a sand pile, the weight, the water table, a block failure, the required length).

Details: [docs/theory.md](https://github.com/hdaltuntas/lythos-pile/blob/main/docs/theory.md).

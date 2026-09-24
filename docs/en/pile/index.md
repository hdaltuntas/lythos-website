# Lythos Pile

<ProductHero id="pile" />

Axial capacity, group action and settlement of piles in layered ground, and the length of a rock socket. A circular or square pile — bored, or driven with a small or a large displacement — alone or in a rectangular group under a cap, is checked by **every method an engineer is likely to be asked for, side by side**.

## What it computes

1. **Shaft friction** — in clay by the **α methods** of API RP 2A, Kulhawy & Phoon and Sladen, the **β method** (Burland) and the **λ method** (Vijayvergiya & Focht); in sand by **K·σ′<sub>v</sub>·tan δ** with Meyerhof's **critical depth**; and Meyerhof's **SPT** rule.
2. **Base resistance** — **Meyerhof**, **Vesić** (rigidity index) and **Janbu**; 9·c<sub>u</sub>, Vesić's and Janbu's N<sub>c</sub>* in clay; Meyerhof's SPT rule.
3. **The pile's weight** — buoyant below the water table — taken off the ultimate capacity: Q<sub>ult,net</sub> = Q<sub>s</sub> + Q<sub>b</sub> − W, Q<sub>all</sub> = Q<sub>ult,net</sub> / FS.
4. **Group action** — the efficiency of **Converse–Labarre**, **Los Angeles Group**, **Seiler–Keeney** and **Feld**, and **block failure**; the group capacity is the smaller.
5. **Required length** — the shortest pile that passes both the single-pile and the group check, with the capacity drawn against the length.
6. **Settlement** — a single pile by **Vesić**; the group by the **equivalent raft** at 2/3·L, by **Vesić's** √(B<sub>g</sub>/D) rule and by **Meyerhof's** SPT rule.
7. **Rock-socketed piles** — the unit side shear of **twelve published correlations**, the base resistance of six more, the **socket length each of them needs**, a design length from their mean, median or bounds, and the elastic settlement by **Randolph & Wroth** and by Vesić.

On top of it, a **parametric or reliability study** reports the probability that the pile, the group or the settlement fails, with a confidence interval and β.

## Screenshots

<Gallery :items="[
  { src: '/img/pile/pile_summary.png', caption: 'Pile group — summary' },
  { src: '/img/pile/socket_summary.png', caption: 'Rock socket — summary' },
  { src: '/img/pile/pile_profile_dark_tr.png', caption: 'Stresses and shaft friction — dark theme, Turkish' },
  { src: '/img/pile/pile_length.png', caption: 'Capacity against length' },
  { src: '/img/pile/pile_group.png', caption: 'Group plan and efficiency' },
  { src: '/img/pile/socket_length.png', caption: 'Socket length by correlation' },
  { src: '/img/pile/pile_section.png', caption: 'Section with the critical depth and the equivalent raft' },
  { src: '/img/pile/pile_settlement.png', caption: 'Stresses under the raft and settlement by method' }
]" />

## Quick start

Lythos Pile is not on PyPI yet; install it from GitHub:

```bash
pip install git+https://github.com/hdaltuntas/lythos-pile
lythos-pile                                    # interface: http://127.0.0.1:8783/
```

```bash
lythos-pile example -o project.pile
lythos-pile run project.pile -o report.pdf            # the pile and its group
lythos-pile run project.pile --socket -o report.pdf   # … with the rock socket as well
lythos-pile socket project.pile -o socket.pdf         # the rock socket alone
lythos-pile study project.pile -o samples.csv
```

## Figures

Section through the group with the critical depth and the equivalent raft · σ′<sub>v</sub>, u<sub>0</sub>, the unit shaft friction of every method and the load down the shaft · shaft and base resistance by method · capacity against length with the required length · plan of the group and the efficiency of every method · the stresses under the raft and the settlement by method. Rock socket: section · side shear by correlation · socket length by correlation · head settlement against socket length.

## Next steps

- [Examples](./examples) — a bored pile group, a length sweep, group efficiency, a rock socket.
- [Reference](./reference) — expressions, inputs, modules.

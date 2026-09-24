# Lythos MSEW

<ProductHero id="msew" />

Mechanically stabilised earth (MSE) walls — a facing, layers of **steel strips, geogrids or geotextiles** in a compacted fill, and the retained soil behind it — designed and checked the way FHWA-NHI-10-024 and AASHTO LRFD 11.10 do it, and the way the MSEW program made familiar.

## What it computes

1. **Earth pressure** — Coulomb / Rankine K<sub>a</sub> of the retained and the reinforced fill, with a battered face and a sloping backfill.
2. **External stability** — sliding on the base (through the fill, on the foundation soil, or along a geosynthetic), overturning about the toe, the eccentricity of the resultant.
3. **Bearing capacity** of the foundation under the effective width B′ = L − 2e by **Terzaghi, Meyerhof, Brinch Hansen, Vesić and EN 1997-1**, side by side (the factors are [Lythos Bearing](/en/bearing/)'s); with the water table, the embedment, the load inclination and a slope in front of the toe.
4. **Internal stability, layer by layer** — the maximum tension by AASHTO's Simplified Method (K<sub>r</sub>/K<sub>a</sub> of 1.7 → 1.2 for strips, 1 for geosynthetics), then each layer's **tensile**, **pullout** (F*, α, L<sub>e</sub> beyond the active zone), **connection** and **sliding** checks.
5. **Reinforcement** — the strips' **width, thickness, yield strength and spacing** (the section left after zinc and steel corrosion over the design life is worked out), or a geosynthetic's **ultimate strength and reduction factors** RF<sub>ID</sub>·RF<sub>CR</sub>·RF<sub>D</sub>.
6. **Earthquake** — the pseudo-static method: A<sub>m</sub> = (1.45 − A)·A, the dynamic thrust P<sub>AE</sub> and the inertia P<sub>IR</sub> externally, the inertia of the active zone shared among the layers internally.
7. **ASD or LRFD** — factors of safety, or load factors (EV, EH, ES, LS) and resistance factors φ.
8. **The length the wall needs** — the shortest uniform reinforcement length that satisfies the external and pullout checks, beside FHWA's minimum (0.7·H, 2.4 m).

On top of it, a **height study** runs the same design rule over a range of wall heights and shows where every check holds.

## Screenshots

<Gallery :items="[
  { src: '/img/msew/msew_summary.png', caption: 'Results summary' },
  { src: '/img/msew/msew_layers.png', caption: 'Internal stability, layer by layer' },
  { src: '/img/msew/msew_section_dark_tr.png', caption: 'Section — dark theme, Turkish' },
  { src: '/img/msew/msew_bearing_dark_tr.png', caption: 'Bearing capacity by method' },
  { src: '/img/msew/msew_heights_figure.png', caption: 'Height study' },
  { src: '/img/msew/msew_length.png', caption: 'Checks against the reinforcement length' },
  { src: '/img/msew/msew_catalog_tr.png', caption: 'Reinforcement catalogue' },
  { src: '/img/msew/msew_heights.png', caption: 'Height study table' }
]" />

## Quick start

Lythos MSEW is not on PyPI yet; install it from GitHub:

```bash
pip install git+https://github.com/hdaltuntas/lythos-msew
lythos-msew                                    # interface: http://127.0.0.1:8782/
```

```bash
lythos-msew example -o wall.msew
lythos-msew run wall.msew -o report.pdf
lythos-msew heights wall.msew -o heights.xlsx
```

## Reinforcement catalogue

Typical market products are added to the type table in one click: ribbed galvanised steel strips (HA 40×4 to 60×5 in S355, 50×4 in Grade 65), polymer strips (PET core, PE sheath, 20–100 kN per strip), uniaxial HDPE and PET geogrids (35–200 kN/m), woven PET and PP geotextiles — with FHWA's typical reduction factors and pullout parameters.

::: warning
Catalogue values are generic starting values; check them against the datasheet of the product specified.
:::

## Not included

Global and compound stability, settlement and drainage are **not** included; check them separately — global stability with [Lythos LE](/en/le/), settlement with [Lythos Settle](/en/settle/).

---
title: "Lythos Kinematic reference — methods, inputs, validation"
description: "Lythos Kinematic reference: Package layout, Command line, The input file, Kinematic criteria, Validation."
---

# Lythos Kinematic — reference

## Package layout

```text
main.py                    run from a clone without installing
lythoskinematic/
  cli.py                   command line (web · screen · run · example)
  i18n.py                  language switch; bilingual text helper T("tr", "en")
  forms.py                 input schema and readers — one definition per field
  stereonet.py             shared lower-hemisphere projection (no extra deps)
  render.py                figures as PNG, for the browser and the report alike
  kinematics/              screening core — independent of the interface
    engine.py              Markland criteria + Monte Carlo
    plots.py               screening stereonet
    report.py              screening PDF report
  rockslope/               limit-equilibrium core — independent of the interface
    wedge.py planar.py toppling.py bolts.py core.py report.py
  web/
    server.py              HTTP routes (standard library only)
    session.py             the one working session: analyses, figures, reports
    static/                index.html · style.css · app.js
```

Forms are generated from `forms.py`: a field's key, label, unit, range and default are written once, in Python, and the page renders whatever the server sends. Switching language simply re-fetches the schema.

## Command line

| Command | What it does |
| --- | --- |
| `lythos-kinematic` | opens the interface (port 8778) |
| `lythos-kinematic web --port 9000 --lang EN --no-browser` | the interface, with options |
| `lythos-kinematic example -o inputs.json` | a starter input file |
| `lythos-kinematic screen inputs.json -o screening.pdf` | kinematic screening, optional PDF |
| `lythos-kinematic run inputs.json --mode wedge -o wedge.pdf` | limit equilibrium: `wedge`, `planar` or `toppling` |

## The input file

The input file is the JSON the interface saves. The main groups:

| Prefix | Meaning |
| --- | --- |
| `slope_dip`, `slope_dir`, `friction`, `lateral`, `mode`, `trials` | screening: slope face, friction, lateral limit, mode, Monte Carlo trials |
| `joints[]` | `label`, `dip`, `dipdir`, `std` (orientation uncertainty) |
| `j1_*`, `j2_*`, `face_*`, `up_*`, `tc_*`, `H`, `gamma`, `water_mode`, `ah` | wedge: two joints (dip, direction, c, φ), face, upper slope, tension crack, height, water, seismic |
| `p_*` | planar: H, ψ<sub>f</sub>, ψ<sub>p</sub>, ψ<sub>s</sub>, c, φ, γ, tension crack, water, seismic, support |
| `t_*` | toppling: face, upper slope, discontinuity and base angles, Δx, block counts, φ |
| `b_*` | bolts: capacity, diameter, bond strength, FS, minimum length, spacing limits |
| `rp_*` | report title block: project, location, chainage, prepared / checked / approved by |

## Kinematic criteria

| Mode | Critical when |
| --- | --- |
| Planar | dip direction within ±lateral limit of the slope direction; φ ≤ dip ≤ slope dip |
| Wedge | trend of the intersection line within ±lateral limit; φ ≤ plunge ≤ the slope's apparent dip in that direction |
| Flexural toppling | dip direction within ±lateral limit of the opposite of the slope direction; pole plunge (90° − dip) ≤ slope dip − φ |

The Monte Carlo applies normally distributed uncertainty to dip and dip direction and checks the chosen mechanism in every trial, fully vectorised. Risk class: P < 5 % low, < 15 % moderate, otherwise high.

## Validation

```bash
pip install -e ".[dev]"
pytest
```

- **Wedge** — matches the Hoek & Bray closed-form short solution exactly (dry 1.696 / flooded 1.065).
- **Planar** — c = 0, dry: tan φ / tan ψ<sub>p</sub>.
- **Toppling** — Wyllie & Mah Chapter 9 example (block heights, failure modes, φ ≈ 38°).
- **Kinematics** — the intersection line is cross-checked against the independent vector implementation in the limit-equilibrium core; with zero uncertainty the Monte Carlo result must reduce to the deterministic 0/100 answer.
- **Stereonet** — projection radii against the analytical Schmidt/Wulff values, poles against being perpendicular to the dip vector.
- **i18n** — every summary follows the language, the fixed-width label column stays aligned in both, the numbers never change.
- **Web** — the schema covers every field, the session's analyses reproduce the validated results, background jobs finish without deadlocking the state poll, and the HTTP routes return PNG figures, PDF reports and plain error messages rather than stack traces.

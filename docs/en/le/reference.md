---
title: "Lythos LE reference — methods, inputs, validation"
description: "Lythos LE reference: Model format, Formulation, Command line, Validation, Limitations, Project layout."
---

# Lythos LE — reference

## Model format

Coordinates are `[x, y]` with y as elevation, in any consistent unit set (kN/m³ and kPa, or pcf and psf). Full reference: [docs/model-format.md](https://github.com/hdaltuntas/lythosle/blob/main/docs/model-format.md).

```json
{
  "name": "Layered slope",
  "units": "metric",
  "profile": [[0, 0], [18, 0], [48, 15], [75, 15]],
  "materials": [
    {"name": "Fill",  "unit_weight": 18, "sat_unit_weight": 19.5,
     "cohesion": 5, "friction_angle": 26, "color": "#C4A883"},
    {"name": "Clay",  "unit_weight": 19, "strength_model": "undrained",
     "su": 40, "su_gradient": 1.5, "su_datum": 0}
  ],
  "layers": [
    {"material": "Fill"},
    {"material": "Clay", "boundary": [[0, -4], [75, 7]]}
  ],
  "water_table": [[0, -2], [30, 3.5], [75, 9.5]],
  "seismic": {"kh": 0.15, "kv": 0},
  "surcharges": [{"x1": 50, "x2": 70, "pressure": 20}],
  "supports": [{"name": "Nail 1", "x1": 14, "y1": 1.5,
                "x2": 28, "y2": -0.2, "capacity": 40}],
  "tension_crack": {"enabled": true, "depth": 3, "water_fill": 1.0}
}
```

- Layers are listed from the top down. The first starts at the ground surface; each one below carries the boundary that forms its top. Boundaries and the water table are extended horizontally beyond their end points.
- The slope may face either way: the solver mirrors the model internally (crest on the right) and mirrors every result back. Set `"direction": "left" | "right"` in the options to analyse a chosen face of a two-sided embankment.

## Formulation

Every method is built on the same slice equations; the only differences are which equilibrium conditions are satisfied and what is assumed about the interslice forces, `X = λ·f(x)·E`:

| Method | Moment | Force | Interslice shear |
| --- | :-: | :-: | --- |
| Ordinary / Fellenius | ● | | ignored entirely |
| Bishop simplified | ● | | X = 0 |
| Janbu simplified / corrected | | ● | X = 0 (corrected applies Janbu's f<sub>0</sub>) |
| Corps of Engineers #1 | | ● | parallel to the entry-exit chord |
| Lowe-Karafiath | | ● | average of ground and base inclination |
| Spencer | ● | ● | constant inclination, solved for |
| Morgenstern-Price | ● | ● | f(x) shape, λ solved for |

The base normal force comes from vertical equilibrium of each slice:

```text
N = [ W (1 + kv) + (X_right − X_left) − (c l − u l tan φ) sin(α) / F ] / m_α
m_α = cos(α) + sin(α) tan(φ) / F
```

The factor of safety comes from moment equilibrium about the centre of rotation or from horizontal force equilibrium of the whole mass. Spencer and Morgenstern-Price iterate on λ until the two agree — the crossing point on the λ–FS plot in the interface.

Sign conventions, pore pressure, seismic loads, reinforcement, tension cracks and the search algorithms: [docs/theory.md](https://github.com/hdaltuntas/lythosle/blob/main/docs/theory.md).

## Command line

| Command | What it does |
| --- | --- |
| `lythosle serve [--port 8000] [--open]` | the browser interface |
| `lythosle example [name] [--optimize]` | list the examples, or run one |
| `lythosle analyze model.json` | analyse a model |
| `lythosle methods` | list the method keys |

`analyze` options: `--options`, `--method` (repeatable; the first drives the search), `--slices`, `--direction {auto,left,right}`, `--optimize`, `--json`, `--csv`, `--no-render`, `--fs-only`, `--quiet`.

Method keys: `ordinary`, `bishop`, `janbu`, `janbu_corrected`, `corps_engineers`, `lowe_karafiath`, `spencer`, `morgenstern_price`.

## Validation

`tests/test_methods.py` checks the solver against results that do not come from this code:

| Check | Reference | Result |
| --- | --- | --- |
| Circular arc in φ = 0 soil | direct integration of c L R / M | within 0.002 of the closed form; identical across Ordinary, Bishop, Spencer and M-P |
| Long planar surface | infinite slope, FS = tan φ′ / tan β | within 1 % for Bishop, Janbu, Spencer and M-P |
| Toe circles, φ = 0, β = 53–75° | Taylor (1937) stability numbers | within 1.5 % |
| ACADS problem 1(a) | published FS = 1.00 | Bishop 0.985, Spencer 0.984 |
| Mirrored geometry | the same slope drawn facing the other way | identical FS and λ |
| Slice refinement | 20 to 200 slices | converges monotonically, < 0.002 change past 100 slices |

## Limitations

- Two-dimensional analysis only, per unit width out of plane.
- The slice weight uses the mid-ordinate of each slice, so strongly curved boundaries need more slices (the default 50 is enough for typical sections).
- Moment-only methods (Ordinary, Bishop) on a **non-circular** surface depend on the choice of moment axis; the result is reported with a warning.
- Spencer and Morgenstern-Price have no solution when F<sub>m</sub> and F<sub>f</sub> never intersect (reinforcement large enough to satisfy force equilibrium by itself); this is reported as “no solution” with both values rather than inventing a number.
- Reinforcement is applied as a known force where it crosses the slip surface; pull-out capacity along the anchored length is not calculated — put the design force in.
- Negative effective normal forces are clipped to zero, and surfaces with a very small m<sub>α</sub> are flagged as poorly conditioned.
- Probabilistic analysis, rapid drawdown, anisotropic strength and 3D effects are not implemented.

## Project layout

```text
main.py          run the interface, or anything the CLI does
lythosle/
  geometry.py    polylines, intersections, polygon helpers
  materials.py   strength models
  model.py       geometry, stratigraphy, groundwater, loading, mirroring
  slices.py      slip surfaces and the slicing of the sliding mass
  methods.py     the eight limit equilibrium solvers
  search.py      grid-and-tangent search and non-circular optimisation
  analysis.py    the driver, reporting and drawing data
  examples.py    six worked examples
  cli.py         command line interface
  web/           API, standard library server, optional FastAPI app, front end
tests/           70 tests, ~60 s
```

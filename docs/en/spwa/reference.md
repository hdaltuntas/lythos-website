# Lythos SPWA — reference

## Method notes

- **Limit equilibrium:** moment equilibrium about the toe (cantilever, simplified method) or the lowest anchor (free-earth). Internal forces are evaluated at the theoretical depth D<sub>req</sub>; D<sub>design</sub> = round-up(1.2·D<sub>req</sub>) is the constructed length. For more than one anchor the LE distribution is approximate — the beam-spring results should govern.
- **Seismic:** Mononobe-Okabe with K<sub>AE</sub> / K<sub>PE</sub> (vertical wall); below the water table θ uses γ<sub>sat</sub>/γ′ (restrained pore water); the Westergaard hydrodynamic pressure of the free water in front of the wall is applied as a driving load. Both corrections can be switched off.
- **Beam-spring:** p = clip(p<sub>ref</sub> ± k<sub>s</sub>·Δw, p<sub>a</sub>, p<sub>p</sub>) per node, at-rest start; anchors T = max(0, P<sub>0</sub>·cos α/s + k<sub>h</sub>·Δw); moment from the element curvature (EI·w″).
- **Vertical check (indicative):** ΣT<sub>h</sub>·tan α against the skin friction ∫(p<sub>a</sub> + p<sub>p</sub>)·tan δ over the embedded length; no end bearing.

## Inputs

| Group | Fields |
| --- | --- |
| **Geometry** | retained height H, backfill slope β, dredge line slope α, wall friction δ |
| **Loads and water** | uniform surcharge; water levels on the active and passive sides, γ<sub>w</sub> |
| **Soil profile** | per layer: thickness, γ, γ<sub>sat</sub>, φ, cohesion, k<sub>s</sub> and its method (manual, Ménard-Bourdon, Schmitt), E<sub>M</sub> |
| **Anchors** | depth, angle, EA, free length, horizontal spacing, prestress |
| **Section** | manufacturer, section model (I and W from the database), steel grade |
| **Safety** | FS<sub>φ</sub>, FS<sub>c</sub>, bending FS, embedment increase factor (1.2), rounding increment |
| **Seismic** | on/off, k<sub>h</sub>, k<sub>v</sub>, submerged θ, hydrodynamic pressure |
| **Beam-spring** | on/off, staged, overdig, embedment (0 = D<sub>design</sub>), water mode (final stage / as given) |
| **Deflection criterion** | FHWA H/120, H/100 or H/240 |

## Project file (`.spwa`)

```json
{
  "excavation_depth_H": 8.0, "surcharge_load": 15.0, "wall_friction_delta": 20.0,
  "water_level_active": 4.0, "water_level_passive": 7.0,
  "is_seismic": true, "kh": 0.1, "kv": 0.0,
  "selected_section_model": "NZ 26", "selected_steel_grade": "S355",
  "bs_enabled": true, "bs_staged": true, "bs_overdig": 0.5,
  "soil_profile": [
    {"name": "Sloped Sandy Gravel", "thickness": 25.0, "gamma": 19.5, "gamma_sat": 21.0,
     "phi": 38, "cohesion": 0, "k_s": 30000.0, "k_s_method": "manual"}
  ],
  "anchors": [
    {"depth": 1.5, "angle": 15.0, "EA": 117000.0, "free_length": 12.0, "spacing": 2.5, "prestress": 0.0},
    {"depth": 4.0, "angle": 15.0, "EA": 117000.0, "free_length": 12.0, "spacing": 2.5, "prestress": 0.0}
  ]
}
```

## Modules

| File | Content |
| --- | --- |
| `analysis_engine.py` | Free-earth support: Coulomb / Mononobe-Okabe pressures, embedment (brentq), anchor forces, diagrams at D<sub>req</sub>, stress / deflection / vertical checks |
| `beam_spring.py` | Winkler beam on elastoplastic springs with staged construction, tension-only inclined anchors, k<sub>s</sub> from Ménard-Bourdon or Schmitt |
| `study.py`, `study_plots.py` | Parametric (OAT / grid) and reliability (LHS / Monte Carlo) studies: optional Gaussian-copula correlation, parallel runner, sensitivities, P<sub>f</sub> with 95 % CI and β |
| `plotting.py`, `plot_style.py` | Figures (schematic + diagrams, 4-panel beam-spring), theme-aware |
| `report.py`, `pdf.py` | Calculation report: PDF, HTML, DOCX |
| `config.py`, `section_database.json` | Defaults, theme, translations; I [m⁴/m] and W [m³/m] of sheet pile sections |
| `web/` | The local HTTP server, the session and the browser interface |

## Validation

106 tests: engine, beam-spring, report, study, forms, web and packaging. The analysis cores are checked against closed-form and published cases, the report in all three formats, the interface through its session and HTTP layer.

```bash
pip install -e ".[dev]"
pytest -q
```

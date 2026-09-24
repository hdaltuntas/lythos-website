# LythosFEA — reference

## Command line

| Command | What it does |
| --- | --- |
| `lythos gui` | the browser interface (port 8777) |
| `lythos examples -o models` | write the worked examples as model files |
| `lythos mesh model.json` | mesh statistics, without analysing |
| `lythos run model.json -o out` | analyse, write an HTML report and JSON |
| `lythos import drawing.dxf -o model.json [--plot p.png] [--keep-coordinates]` | a model from DXF |
| `lythos import --sample -o model.json` | import the drawing that ships with the package |

From a clone every command also runs as `python main.py …`.

## DXF import

Which drawing layer becomes what is decided by its name, matched case-insensitively and ignoring hyphens, underscores and spaces — `SU-SEVIYESI` and `su seviyesi` both read as the water table.

| Drawing layer contains | becomes |
| --- | --- |
| `soil`, `clay`, `sand`, `rock`, `fill`, `zemin`, `kil`, `kum`, `tabaka`, … | a soil layer |
| `wall`, `pile`, `sheet`, `diaphragm`, `perde`, `kazık`, … | a wall or pile row |
| `water`, `phreatic`, `gwl`, `su seviyesi`, … | the water table |
| `load`, `surcharge`, `yük`, … | a line load |
| `anchor`, `strut`, `prop`, `ankraj`, … | an anchor |
| `text`, `dim`, `hatch`, `grid`, `defpoints`, `ölçü`, … | ignored |
| anything else | soil if the outline is closed, a structure if not |

Soil regions are recovered as the faces of the planar arrangement the lines make, so **both usual CAD conventions work**: each stratum as its own closed polyline, or one outer boundary plus the lines dividing it.

### The construction sequence

**A number at the end of a layer name is the step at which that thing happens:**

| Layer | Meaning |
| --- | --- |
| `WALL-1` | the wall is built at step 1 |
| `EXC-2`, `KAZI-2` | this region is dug out at step 2 |
| `ANCHOR-3` | the anchor is stressed to its lock-off load at step 3 |
| `SURCHARGE-1` | the load is applied at step 1 |
| `SOIL-CLAY` | no number: present from the start, never removed |

Excavation regions can be drawn either way: as closed outlines of each lift, or as the dig **levels** drawn from the wall outwards. Drawing units are read from `$INSUNITS` (a drawing in millimetres arrives in metres). Survey coordinates are moved to the origin and the shift is reported; `--keep-coordinates` turns that off.

## Validation

Every claim below is a test in `tests/`:

| Check | Reference | Lythos |
| --- | --- | --- |
| Mohr-Coulomb failure deviator, plane strain | σ<sub>1</sub> = σ<sub>3</sub>K<sub>p</sub> + 2c√K<sub>p</sub> | within 0.5 % |
| Active earth pressure, zero lateral strain | K<sub>a</sub>σ<sub>v</sub> + 2c√K<sub>a</sub> | exact |
| Geostatic stress and settlement under self weight | γz, γH²/2E | exact |
| Patch test, linear displacement field | constant stress | exact to 1e-12 |
| Cantilever tip deflection | PL³/3EI + PL/GA | within 0.2 % |
| Slender beam, h/L = 1/1000 | no shear locking | within 2 % |
| 2:1 slope factor of safety | 1.377, independent Bishop search | 1.381 on a 471-element mesh |
| Algorithmic tangent | numerical derivative | within 4e-4 of E, everywhere |

```bash
pytest                    # the quick suite
pytest -m slow            # the full analyses as well
```

Full table: [docs/validation.md](https://github.com/hdaltuntas/lythos/blob/main/docs/validation.md); formulation: [docs/theory.md](https://github.com/hdaltuntas/lythos/blob/main/docs/theory.md).

## Limitations

Worth knowing before trusting a number to a design:

- Drained or total-stress (undrained) analysis only; there is no consolidation, no transient flow and no coupled pore pressure. Undrained behaviour is modelled by giving a layer `phi = 0` and `c = su`.
- Pore pressure is hydrostatic below the phreatic surface. There is no seepage analysis, though the horizontal gradient of an inclined phreatic surface is carried as a seepage body force.
- Small strain throughout; no updated-mesh or large-displacement option.
- Elastic-perfectly plastic soil. There is no hardening model, so settlement predictions under working loads are only as good as the single stiffness chosen for the stress range that matters.
- A row of piles is smeared into an equivalent plate, the usual plane-strain idealisation; it says nothing about arching between the piles.
- Quadratic triangles are much better than linear ones under constant-volume plastic flow, but not immune to volumetric locking. Undrained (`phi = 0`) collapse loads are slightly on the high side; refine, and treat an undrained factor of safety from a coarse mesh with particular suspicion.
- Strength reduction reports the factor at which equilibrium is lost. Like any such analysis it is sensitive to how the failure criterion is judged, so the displacement-versus-factor curve is reported alongside it and should be looked at.

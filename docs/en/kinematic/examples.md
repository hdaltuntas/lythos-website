# Lythos Kinematic — examples

Every output is from a real run. The input file written by `example` carries one workflow from start to finish.

## The inputs

```bash
lythos-kinematic example -o inputs.json
```

Slope face **72° / 230°** (dip / dip direction), friction angle **31°**, lateral limit **±20°**. Six joint sets, each with its orientation uncertainty (standard deviation):

| Set | Dip | Dip direction | σ |
| --- | --- | --- | --- |
| T2 | 73° | 152° | 2.5° |
| T1 | 69° | 189° | 3.0° |
| E3 | 34° | 232° | 2.0° |
| E1 | 28° | 104° | 2.5° |
| E2 | 21° | 303° | 2.0° |
| J6 | 50° | 60° | 3.0° |

## 1. Kinematic screening

The mode is read from the file's `mode` field (`planar`, `wedge`, `toppling`):

```bash
lythos-kinematic screen inputs.json --lang EN -o screening.pdf
```

```text
Planar Sliding: 1 / 6
  T2               Safe
  T1               Safe
  E3               CRITICAL
  E1               Safe
  E2               Safe
  J6               Safe
```

The same sets for wedges and toppling:

```text
Wedge Sliding: 1 / 15
  T2 × T1          Safe
  T2 × E3          CRITICAL
  ...
Flexural Toppling: 1 / 6
  J6               CRITICAL
```

**Reading the output.** E3 faces almost the same way as the slope (232° against 230°) and dips steeper than the friction angle but shallower than the face (31° < 34° < 72°): classic planar sliding. J6 dips steeply the other way (60°): toppling. Of the fifteen intersections only T2 × E3 allows wedge sliding.

## 2. Limit equilibrium of the critical plane

In the interface, “→ Send critical result to limit equilibrium” carries E3 into the planar analysis (ψ<sub>p</sub> = 34°, ψ<sub>f</sub> = 72°, φ = 31°). The input file already holds this case: H = 20 m, γ = 25 kN/m³, a tension crack 6 m behind the crest.

```bash
lythos-kinematic run inputs.json --mode planar --lang EN
```

```text
==============================================================
  PLANAR SLIDING ANALYSIS  (Hoek & Bray, 1 m slope length)
==============================================================
Slope: H = 20.00 m, ψf = 72.0°, ψp = 34.0°, ψs = 0.0°
Block area            :    132.302 m²
Block weight W        :    3307.54 kN/m
Sliding plane length  :     15.076 m
Tension crack         : depth z = 11.57 m, in the upper slope (x = 12.50 m)
--------------------------------------------------------------
Water height zw       :       0.00 m
Water force U (plane) :       0.00 kN/m
Water force V (crack) :       0.00 kN/m
Seismic force (horiz.):       0.00 kN/m
Support force T       :       0.00 kN/m  @ 0.0° (active)
--------------------------------------------------------------
Effective normal force:    2742.07 kN/m
Driving force         :    1849.55 kN/m
Resisting force       :    1647.60 kN/m
==============================================================
FACTOR OF SAFETY (FS) : 0.891
==============================================================
```

<div class="result">
<div class="bad"><small>Planar FS (dry)</small><strong>0.891</strong></div>
<div><small>Block weight</small><strong>3 308 kN/m</strong></div>
<div><small>Support for FS = 1.5</small><strong>697 kN/m</strong></div>
</div>

On a cohesionless, dry plane FS = tan φ / tan ψ<sub>p</sub> = tan 31° / tan 34° = 0.891 — exactly Hoek & Bray's closed form.

## 3. Wedge and toppling

```bash
lythos-kinematic run inputs.json --mode wedge --lang EN
```

```text
Wedge volume          :  13151.053 m³
Wedge weight          :  328776.31 kN
Intersection (J1∩J2)  : trend  157.7°, plunge  31.2°
...
FACTOR OF SAFETY (FS) : 1.696
```

This is Hoek & Bray's closed-form “short solution” example (dry 1.696, flooded 1.065), pinned exactly by the tests.

```bash
lythos-kinematic run inputs.json --mode toppling --lang EN
```

```text
==================================================================
  BLOCK TOPPLING ANALYSIS  (Goodman & Bray 1976, 1 m slope length)
==================================================================
ψf = 56.6°, ψs = 4.0°, ψd = 60.0° (ψp = 30.0°), ψb = 35.8°, Δx = 10.0 m
Number of blocks      : 10 (below crest) + 6 (above crest)
------------------------------------------------------------------
Block   y (m)  y/Δx      W kN     U kN     V kN Mode         P(n-1)
    1    3.99  0.40       998        0        0 stable          0.0
    2    7.98  0.80      1996        0        0 stable          0.0
    3   11.98  1.20      2994        0        0 sliding       681.9
    4   15.97  1.60      3992        0        0 sliding      2091.2
    5   19.96  2.00      4990        0        0 toppling     3970.2
  ...
   13   22.24  2.22      5560        0        0 toppling      307.4
   14   16.35  1.63      4087        0        0 stable          0.0
------------------------------------------------------------------
Toe block residual force P0     :       0.0 kN/m  (in equilibrium)
Required friction angle φ_req   :     37.60°  (current 38.15°)
==================================================================
FACTOR OF SAFETY (FS = tanφ / tanφ_req) : 1.020
==================================================================
```

This is Wyllie & Mah's Chapter 9 example: block heights, failure modes and limit equilibrium at φ ≈ 38°. Going down from the crest the blocks follow the sequence *toppling → sliding → stable*.

## 4. The Python API

The screening and limit-equilibrium cores are independent of the interface and can be used directly:

```python
from lythoskinematic.kinematics.engine import screen, run_monte_carlo, WEDGE
from lythoskinematic.rockslope.wedge import Joint, Plane, WedgeInput, Water, analyze

# 1 — kinematic screening of three joint sets against a 65°/185° face
labels, dips, dirs = ["J1", "J2", "J3"], [45, 70, 60], [105, 235, 20]
res = screen(labels, dips, dirs, slope_dip=65, slope_dir=185,
             friction=30, lateral_limit=20, mode=WEDGE)
for item in res.items:
    print(f"{item.name:8s} plunge {item.value1:5.1f}°  trend {item.value2:6.1f}°  "
          f"{'CRITICAL' if item.critical else 'safe'}")

mc = run_monte_carlo(dips, dirs, [5, 5, 5], 65, 185, 30, 20, WEDGE, n_trials=10000)
print(f"probability of failure: {mc.pof:.1f} %  ({mc.risk_level()})")

# 2 — limit equilibrium of the wedge, dry and flooded
wedge = WedgeInput(
    joint1=Joint(dip=45, dipdir=105, cohesion=24, friction=20),
    joint2=Joint(dip=70, dipdir=235, cohesion=48, friction=30),
    slope_face=Plane(dip=65, dipdir=185),
    upper_slope=Plane(dip=12, dipdir=195),
    slope_height=40, unit_weight=25,
)
print("FS dry     :", round(analyze(wedge).factor_of_safety, 3))
wedge.water = Water(mode="filled")
print("FS flooded :", round(analyze(wedge).factor_of_safety, 3))
```

```text
J1 × J2  plunge  31.2°  trend  157.7°  safe
J1 × J3  plunge  41.9°  trend   78.8°  safe
J2 × J3  plunge  32.5°  trend  311.6°  safe
probability of failure: 3.4 %  (low)
FS dry     : 1.696
FS flooded : 1.065
```

**A detail worth noticing:** deterministically the J1 × J2 intersection is “safe” — its trend (157.7°) is 27° off the slope direction (185°), outside the ±20° lateral limit. But with 5° of uncertainty on the orientations, **3.4 %** of the samples fall inside the limit. Limit equilibrium then says the wedge has a factor of safety of 1.70 dry and 1.07 flooded. Risk classes: below 5 % low, below 15 % moderate, above that high.

Planar sliding and the support required:

```python
from lythoskinematic.rockslope.planar import PlanarInput, planar_analyze, planar_required_support

slope = PlanarInput(slope_height=20, face_angle=72, plane_angle=34,
                    friction=31, unit_weight=25, tc_distance=6)
r = planar_analyze(slope)
print(f"FS = {r.factor_of_safety:.3f}, W = {r.weight:.0f} kN/m, crack depth {r.tc_depth:.2f} m")

T, angle, fs_now = planar_required_support(slope, target_fs=1.5)
print(f"T = {T:.0f} kN/m at {angle:.1f}° (current FS {fs_now:.3f})")
```

```text
FS = 0.891, W = 3308 kN/m, crack depth 11.57 m
T = 697 kN/m at -12.2° (current FS 0.891)
```

With no angle given the optimum support angle follows Hoek & Bray, tan(ψ<sub>p</sub> + θ) = tan φ / FS<sub>target</sub>; a negative angle means the bolt rises from the horizontal.

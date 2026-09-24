# Which tool, when?

The Lythos family deliberately contains tools that answer the same question two ways: a slope can be solved by limit equilibrium (LE) or by finite elements (FEA); a sheet pile wall by limit equilibrium or by beam-spring. The table below maps typical engineering questions to the right tool.

## By question

| Your question | Tool | Why |
| --- | --- | --- |
| What is this slope's factor of safety, and where is the critical slip surface? | [Lythos LE](/en/le/) | Eight methods and thousands of surfaces in seconds; the standard route for reports and comparisons. |
| What if the slip surface isn't circular, or there is soil-structure interaction? | [LythosFEA](/en/fea/) | Under strength reduction the mechanism falls out of the deviatoric strain field. |
| How far does the wall move during excavation, and what happens to the anchor loads? | [LythosFEA](/en/fea/) or [Lythos SPWA](/en/spwa/) | FEA solves the continuum; SPWA is faster and makes the sheet pile design checks. |
| Is the sheet pile's embedment and section enough? | [Lythos SPWA](/en/spwa/) | Free-earth support + staged Winkler, stress and deflection checks, a section database. |
| Which failure do the joints in this rock slope allow? | [Lythos Kinematic](/en/kinematic/) | Markland test, stereonet, Monte Carlo probability. |
| How many bolts, how long, for the critical rock wedge? | [Lythos Kinematic](/en/kinematic/) | Wedge/planar/toppling limit equilibrium and a bolt spacing × length matrix. |
| Can this footing carry this load, and how wide must it be? | [Lythos Bearing](/en/bearing/) | Six factor sets side by side, EN 1997-1 design approaches, the width required. |
| How much, and how fast, will the raft / fill settle? | [Lythos Settle](/en/settle/) | Immediate + consolidation + secondary, t50/t90, angular distortion. |
| How long must the pile be, what does the group carry, how much does it settle? | [Lythos Pile](/en/pile/) | α/β/λ, four group efficiencies, block failure, required length, equivalent raft. |
| How long must the rock socket be? | [Lythos Pile](/en/pile/) | Twelve published correlations and a design length. |
| Is the reinforcement of this MSE wall enough? | [Lythos MSEW](/en/msew/) | FHWA/AASHTO external and internal stability, ASD or LRFD, the required length. |

## Shared code between siblings

The family shares code, too:

- **MSEW's bearing capacity factors are Lythos Bearing's.** The bearing capacity of the wall's base is computed with the same `factors.py` and `capacity.py`.
- **Kinematic's two modules plot on one stereonet.** Screening and limit equilibrium use the same projection, and the most critical component found in screening goes to limit equilibrium in one click.
- **LE and FEA check each other.** FEA's 2:1 slope test is made against an independently written Bishop search (1.377 against 1.381).

## By analysis type

| | FEA | LE | Kinematic | Bearing | Settle | Pile | SPWA | MSEW |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Limit equilibrium | | ● | ● | ● | | ● | ● | ● |
| Finite elements / springs | ● | | | | | | ● | |
| Deformation / settlement | ● | | | | ● | ● | ● | |
| Staged construction | ● | | | | | | ● | |
| Earthquake (pseudo-static) | | ● | ● | ● | | | ● | ● |
| Groundwater | ● | ● | ● | ● | ● | ● | ● | ● |
| Reliability / probability | | | ● | ● | ● | ● | ● | |
| PDF / HTML report | HTML | JSON/CSV/SVG | PDF | ● | ● | ● | ● | ● |
| Turkish interface | | | ● | ● | ● | ● | ● | ● |
| DXF import | ● | | | | | | | |

::: warning A calculation program does not replace engineering judgement
Read the limitations on each program's **Reference** page. LythosFEA, for example, has no consolidation and no hardening soil model; Lythos MSEW does not check global and compound stability — use Lythos LE for that.
:::

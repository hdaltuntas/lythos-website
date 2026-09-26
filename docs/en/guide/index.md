---
title: "What is Lythos? — open-source geotechnical software family"
description: "Lythos: a family of eight open-source geotechnical engineering programs for slopes, foundations and retaining structures; shared principles and where to start."
---

# What is Lythos?

**Lythos** is an open-source family of eight programs for the everyday calculations of geotechnical engineering. The name comes from the Greek *lithos*, stone. Each member does one job in depth; together they cover the slope, foundation and retaining-structure design of a whole project.

<SectionPanorama />

## The family

| Program | What it does | Package |
| --- | --- | --- |
| [LythosFEA](/en/fea/) | 2D finite elements: slope factor of safety (SSR), staged excavation and fill, forces in walls and anchors, DXF import | `lythosfea` |
| [Lythos LE](/en/le/) | Limit equilibrium slope stability by the method of slices; eight methods, critical surface search | `lythosle` |
| [Lythos Kinematic](/en/kinematic/) | Markland screening, Monte Carlo probability, wedge / planar / toppling analysis and bolt design for rock slopes | `lythoskinematic` |
| [Lythos Bearing](/en/bearing/) | Bearing capacity of shallow foundations; six factor sets side by side, EN 1997-1 | `lythosbearing` |
| [Lythos Settle](/en/settle/) | Settlement of foundations and embankments; immediate, consolidation, secondary and time | `lythossettle` |
| [Lythos Pile](/en/pile/) | Pile capacity, group action, settlement and rock sockets | `lythospile` |
| [Lythos SPWA](/en/spwa/) | Sheet pile walls: free-earth support and staged Winkler beam-spring | `lythosspwa` |
| [Lythos MSEW](/en/msew/) | External and internal stability of MSE walls, FHWA / AASHTO | `lythosmsew` |

## Shared principles

Every member of the family is written to the same few principles:

- **Every method, side by side.** Rather than one “right” answer, every published method an engineer is likely to be asked for is computed from the same inputs and compared. The governing one is marked.
- **Numbers with a source.** Each expression's source and limits are written down in `docs/theory.md`; the tests pin them to published tables, hand calculations and closed-form solutions.
- **Limits stated plainly.** Every program's documentation has a “limitations” section: know what the model does not do before trusting a number from it.
- **Your data stays with you.** The interface is a server on your own machine that listens on the loopback address only; nothing is sent anywhere.
- **English and Turkish.** Interface, results, figures and reports in both languages, switchable while the program runs.

## Where to start

<div class="steps">

### Install

[Installation](./installation) gives each package's one-line install and how to run from a clone.

### Pick the right tool

[Which tool, when?](./choosing) maps typical engineering questions to the right program.

### Run an example

Every program's **Examples** page has commands and scripts that were actually run, with their output. Try the [Lythos Bearing examples](/en/bearing/examples).

### See the whole picture

[A project end to end](./workflow) uses the family together on one site.

</div>

::: tip Author
Lythos is developed by Hasan Deniz Altuntaş and released under the GNU Affero General Public License v3.0 (AGPL-3.0). The source is at [github.com/hdaltuntas](https://github.com/hdaltuntas).
:::

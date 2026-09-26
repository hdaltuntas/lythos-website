---
title: "Shared architecture — browser interface, command line, Python"
description: "The Lythos family’s shared architecture: a local browser interface, command line, Python scripting, JSON project files, PDF/HTML/Word reports and studies."
---

# Shared architecture

All eight members of the Lythos family share one architecture; Lythos LE implements the same idea with a dependency-free core. Learn one and you can use them all.

## Layers

```text
package/
  engine.py            the calculation — independent of the interface, plain functions
  forms.py             input schema: each field's key, label, unit, range and default
  summary.py           results as cards and text — shared by the browser and the CLI
  study.py             parametric and reliability studies
  plotting.py          Matplotlib figures, theme-aware, off-screen (Agg)
  report.py · pdf.py   one HTML assembly → PDF, HTML, DOCX
  i18n.py              every text in English and Turkish, side by side
  cli.py               web · run · study · example
  web/
    server.py          HTTP server, standard library only
    session.py         the one working session: analyses, figures, reports
    static/            index.html · style.css · app.js
main.py                run from a clone without installing
```

**Forms are defined once.** A field's label, unit, range and default are written only in `forms.py`, in Python; the page renders whatever the server sends. There is no second copy of the labels in JavaScript, and switching language simply re-fetches the schema.

## Why a browser?

The interface is a small HTTP server on your own machine that listens on `127.0.0.1` only. The reasons:

- A desktop toolkit (Qt and the like) needs a display; a browser interface works the same **over a remote session, in a container or on a headless server**.
- It costs no dependency beyond the standard library.
- Data never leaves the machine: no cloud, no account, no telemetry.

Lythos SPWA and Lythos Kinematic began as PyQt desktop programs; their calculation cores moved to this architecture unchanged.

## Four commands

Bearing, Settle, Pile, MSEW and SPWA share one command layout (Kinematic and FEA are very close):

```bash
lythos-<name>                                  # the interface (the default)
lythos-<name> web --port 9000 --lang tr --no-browser
lythos-<name> example -o project.<ext>         # a starter project file
lythos-<name> run project.<ext> -o report.pdf  # analyse, print the results, write a report
lythos-<name> study project.<ext> -o samples.csv
```

`run` and `study` read the same file the interface writes with **Save**: a case set up in the browser re-runs unattended and reproducibly.

## Project files

Project files are readable JSON: `.bearing`, `.settle`, `.pile`, `.msew`, `.spwa`. Missing entries keep their defaults, so older files open in newer versions. They are easy to keep under version control and to `diff`.

## Scripting from Python

The session object behind the interface can be imported directly. The pattern is the same across the family:

```python
from lythosbearing import forms
from lythosbearing.web.session import Session

values = forms.defaults()          # the interface's starter project, a plain dict
values["B"] = 3.0                  # change any input

session = Session(lang="en")
result = session.analyse(values)   # cards, tables, text and numbers
print(result["headline"])
session.report("pdf", "report.pdf") # or "html", "docx"
```

`result["text"]` is exactly what the command line prints; `result["cards"]` and the tables are what the interface shows; the numeric fields (`q_ult`, `FS`, `required_width` …) can be used directly in your own calculations.

## Reports

Reports are assembled once as HTML and exported three ways: **PDF** (ReportLab), **self-contained HTML** (every figure embedded) and **Word**. All three say the same thing. A report carries the inputs, every method's result, the checks, the figures, the warnings, the method notes and — if one was run — the study, in whichever language the interface is in.

## Parametric and reliability studies

In Bearing, Settle, Pile and SPWA the **Study** tab sweeps any input:

- **A range** — one-at-a-time sweep or a full grid,
- **A distribution** — normal, lognormal or uniform, with a mean and a coefficient of variation; sampled by Latin hypercube (LHS) or Monte Carlo.

Results: Spearman rank sensitivities, tornado charts, histograms and scatter plots, the **probability of failure (or of exceedance)** with a 95 % confidence interval, and the **reliability index β**. Samples export to CSV or XLSX and become a section of the report. MSEW has a **wall height study** instead.

## Theme and fonts

The interfaces follow the system's light/dark setting; the toggle in the header pins it. Figures are drawn to match the theme. The family shares one visual language — ivory and charcoal surfaces, a clay accent, serif headings — and so does this site.

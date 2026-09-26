---
title: "Installation — Lythos geotechnical software"
description: "Installing the Lythos programs: pip from PyPI or GitHub, dependencies, running from a clone, virtual environments and the default port of each program."
---

# Installation

Every Lythos program is a pure Python package and installs the same way. All you need is **Python 3.10 or later** (3.9 is enough for Lythos LE).

## One command

Packages published on PyPI:

```bash
pip install lythosfea          # LythosFEA        → command: lythos
pip install lythosle           # Lythos LE        → command: lythosle
pip install lythoskinematic    # Lythos Kinematic → command: lythos-kinematic
pip install lythosbearing      # Lythos Bearing   → command: lythos-bearing
pip install lythossettle       # Lythos Settle    → command: lythos-settle
pip install lythosspwa         # Lythos SPWA      → command: lythos-spwa
```

Those not yet on PyPI install straight from GitHub:

```bash
pip install git+https://github.com/hdaltuntas/lythos-pile   # → lythos-pile
pip install git+https://github.com/hdaltuntas/lythos-msew   # → lythos-msew
```

Running the command with no arguments opens the interface in your browser:

```bash
lythos-bearing
```

```text
Lythos Bearing 0.1.0 — http://127.0.0.1:8781/
```

## Dependencies

| Program | Required | Optional |
| --- | --- | --- |
| LythosFEA | NumPy, SciPy, Matplotlib | `ezdxf` — binary DXF, splines and blocks: `pip install "lythosfea[dxf]"` |
| Lythos LE | **none** — standard library only | FastAPI + uvicorn |
| Kinematic, SPWA | NumPy, SciPy, Matplotlib, ReportLab | — |
| Bearing, Settle, Pile, MSEW | NumPy, Matplotlib, ReportLab | `python-docx` (Word reports), `openpyxl` (Excel export) |

Word reports and Excel export are extras:

```bash
pip install "lythosbearing[docx,xlsx]"
```

The interface offers only the formats that are installed; without `python-docx` the Word option is not shown.

## From a clone, without installing

Each repository ships a `main.py` that runs from a fresh clone with nothing installed beyond the scientific stack:

```bash
git clone https://github.com/hdaltuntas/lythos-bearing
cd lythos-bearing
pip install numpy matplotlib reportlab
python main.py                       # the interface
python main.py run project.bearing   # every command-line command works too
```

`main.py` puts its own directory first on the import path, so the clone's code is what runs even when the package is also installed. An editor such as Thonny may warn that the folder is “shadowing the library module” — that is the intended arrangement.

## A virtual environment (recommended)

Arch, Debian and Fedora refuse a system-wide `pip install` outright (PEP 668). Use a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate           # Windows: .venv\Scripts\activate
pip install lythosbearing lythossettle lythosspwa
```

To use your distribution's NumPy: `python -m venv --system-site-packages .venv`.

## The whole family

To install the whole family in one environment:

```bash
pip install lythosfea lythosle lythoskinematic lythosbearing lythossettle lythosspwa \
  git+https://github.com/hdaltuntas/lythos-pile \
  git+https://github.com/hdaltuntas/lythos-msew
```

Each program uses its own port, so they can all be open at once:

| Program | Command | Port |
| --- | --- | --- |
| LythosFEA | `lythos gui` | 8777 |
| Lythos Kinematic | `lythos-kinematic` | 8778 |
| Lythos SPWA | `lythos-spwa` | 8779 |
| Lythos Settle | `lythos-settle` | 8780 |
| Lythos Bearing | `lythos-bearing` | 8781 |
| Lythos MSEW | `lythos-msew` | 8782 |
| Lythos Pile | `lythos-pile` | 8783 |
| Lythos LE | `lythosle serve --open` | 8000 |

## For development

```bash
git clone https://github.com/hdaltuntas/lythos-pile
cd lythos-pile
pip install -e ".[dev]"
pytest -q
ruff check .
```

The test suites exercise the engine, the report (in all three formats) and the interface's HTTP layer together — the browser is tested without a browser.

---
title: "Kurulum — Lythos geoteknik yazılımları"
description: "Lythos yazılımlarının kurulumu: PyPI veya GitHub’dan pip ile kurulum, bağımlılıklar, klondan çalıştırma, sanal ortam ve her yazılımın varsayılan portu."
---

# Kurulum

Bütün Lythos yazılımları saf Python paketleridir ve aynı şekilde kurulur. Gereken tek şey **Python 3.10 veya üzeri** (Lythos LE için 3.9 yeterli).

## Tek komutla

PyPI’da yayımlanan paketler:

```bash
pip install lythosfea          # LythosFEA      → komut: lythos
pip install lythosle           # Lythos LE      → komut: lythosle
pip install lythoskinematic    # Lythos Kinematic → komut: lythos-kinematic
pip install lythosbearing      # Lythos Bearing → komut: lythos-bearing
pip install lythossettle       # Lythos Settle  → komut: lythos-settle
pip install lythosspwa         # Lythos SPWA    → komut: lythos-spwa
```

Henüz PyPI’da olmayanlar doğrudan GitHub’dan kurulur:

```bash
pip install git+https://github.com/hdaltuntas/lythos-pile   # → lythos-pile
pip install git+https://github.com/hdaltuntas/lythos-msew   # → lythos-msew
```

Kurulumdan sonra komutu parametresiz çalıştırmak arayüzü tarayıcıda açar:

```bash
lythos-bearing
```

```text
Lythos Bearing 0.1.0 — http://127.0.0.1:8781/
```

## Bağımlılıklar

| Yazılım | Gerekenler | İsteğe bağlı |
| --- | --- | --- |
| LythosFEA | NumPy, SciPy, Matplotlib | `ezdxf` — ikili DXF, spline ve bloklar: `pip install "lythosfea[dxf]"` |
| Lythos LE | **hiçbiri** — yalnızca standart kütüphane | FastAPI + uvicorn |
| Kinematic, SPWA | NumPy, SciPy, Matplotlib, ReportLab | — |
| Bearing, Settle, Pile, MSEW | NumPy, Matplotlib, ReportLab | `python-docx` (Word rapor), `openpyxl` (Excel çıktısı) |

Word raporu ve Excel dışa aktarımı ekstra paket olarak gelir:

```bash
pip install "lythosbearing[docx,xlsx]"
```

Arayüz yalnızca kurulu biçimleri sunar; `python-docx` yoksa Word seçeneği görünmez.

## Klondan, kurmadan

Her depo `main.py` ile gelir; klonladıktan sonra hiçbir şey kurmadan çalışır (bilimsel yığın dışında):

```bash
git clone https://github.com/hdaltuntas/lythos-bearing
cd lythos-bearing
pip install numpy matplotlib reportlab
python main.py                       # arayüz
python main.py run project.bearing   # komut satırının her komutu da çalışır
```

`main.py` kendi klasörünü içe aktarma yolunun başına koyar; paket ayrıca kurulu olsa bile çalışan kod klonunkidir. Thonny gibi bir düzenleyici bu yüzden “kütüphane modülünü gölgeliyor” uyarısı verebilir — bu kasıtlıdır.

## Sanal ortam (önerilir)

Arch, Debian ve Fedora sistem genelinde `pip install`’ı reddeder (PEP 668). Bir sanal ortam kullanın:

```bash
python -m venv .venv
source .venv/bin/activate           # Windows: .venv\Scripts\activate
pip install lythosbearing lythossettle lythosspwa
```

Dağıtımın NumPy’ını kullanmak isterseniz: `python -m venv --system-site-packages .venv`.

## Ailenin tamamı

Bütün aileyi tek ortamda kurmak için:

```bash
pip install lythosfea lythosle lythoskinematic lythosbearing lythossettle lythosspwa \
  git+https://github.com/hdaltuntas/lythos-pile \
  git+https://github.com/hdaltuntas/lythos-msew
```

Her yazılım kendi portunu kullandığı için hepsi aynı anda açık olabilir:

| Yazılım | Komut | Port |
| --- | --- | --- |
| LythosFEA | `lythos gui` | 8777 |
| Lythos Kinematic | `lythos-kinematic` | 8778 |
| Lythos SPWA | `lythos-spwa` | 8779 |
| Lythos Settle | `lythos-settle` | 8780 |
| Lythos Bearing | `lythos-bearing` | 8781 |
| Lythos MSEW | `lythos-msew` | 8782 |
| Lythos Pile | `lythos-pile` | 8783 |
| Lythos LE | `lythosle serve --open` | 8000 |

## Geliştirme için

```bash
git clone https://github.com/hdaltuntas/lythos-pile
cd lythos-pile
pip install -e ".[dev]"
pytest -q
ruff check .
```

Test paketleri motoru, raporu (üç biçimde) ve arayüzün HTTP katmanını birlikte çalıştırır; tarayıcı olmadan tarayıcı sınanır.

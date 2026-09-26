---
title: "LythosFEA örnekleri — 2B sonlu elemanlar ile şev ve derin kazı analizi"
description: "LythosFEA ile gerçekten çalıştırılmış örnekler ve çıktıları: Şev güvenlik sayısı — Python betiği, Ankrajlı derin kazı — komut satırı, CAD çiziminden inşaat…"
---

# LythosFEA — örnekler

Bütün çıktılar ve şekiller gerçek çalıştırmalardan alınmıştır.

## 1. Şev güvenlik sayısı — Python betiği

10 m yüksekliğinde 2Y:1D yarma şev, siltli kil (c′ = 10 kPa, φ′ = 20°, γ = 20 kN/m³):

```python
from lythos.core.materials import MohrCoulomb
from lythos.core.model import Model, SoilLayer, Stage
from lythos.report import run_and_report

clay = MohrCoulomb(name="silty clay", E=1e5, nu=0.3, c=10.0, phi=20.0, gamma=20.0)
slope = [(0, 0), (40, 0), (40, 10), (25, 10), (5, 0)]

model = Model(
    name="cut slope",
    layers=[SoilLayer("silty clay", slope, clay, mesh_size=2.0)],
    stages=[
        Stage("1 - self weight", kind="initial"),
        Stage("2 - factor of safety", kind="ssr"),
    ],
    initial_stress="gravity",
)

summary = run_and_report(model, out_dir="out/slope")
print(summary["stages"][-1]["factor_of_safety"])
```

```text
report written to out/slope/report.html
1.414
```

`run_and_report`, bütün şekilleri gömülü, kendi başına açılan bir HTML rapor ve sayıları JSON olarak yazar (`mesh.png`, `stage2_deviatoric_strain.png`, `stage2_ssr.png`, `summary.json` …). SSR eğrisi azaltma katsayısına karşı deplasmanı gösterir; 1.414’te denge korunur, ötesinde deplasman hızla büyür:

```text
SRF    0.80   1.25   1.375  1.406  1.414  1.422  1.438   1.50
u mm   0.0    1.33   4.42   9.81   18.45  19.10  55.97   125.60
```

<Gallery :cols="2" :items="[
  { src: '/img/fea/ex_slope_strain.png', caption: 'Göçmede deviatorik birim deformasyon: kayma yüzeyi kendiliğinden belirir' },
  { src: '/img/fea/ex_slope_ssr.png', caption: 'SSR eğrisi' }
]" />

Aynı şevin bağımsız bir Bishop araması 1.377 verir; ince ağda SSR 1.381’e yakınsar (bkz. [doğrulama](./reference#dogrulama)). Buradaki 1.414, `mesh_size = 2.0` ile kaba ağın sonucudur — **ağı inceltin** ve güvenlik sayısının yakınsadığını görün.

::: tip Düzenleyiciden çalıştırmak
`examples/thonny_analysis.py` (bütün analiz düz Python olarak) ve `examples/thonny_gui.py` (arayüzü açar) Thonny, IDLE ya da VS Code’da açılıp **Run** ile çalıştırılmak için yazılmıştır.
:::

## 2. Ankrajlı derin kazı — komut satırı

Yerleşik örnekleri model dosyası olarak yazın ve kazıyı çalıştırın:

```bash
lythos examples -o models          # slope, embankment, pile_wall, excavation
lythos mesh models/slope.json      # analiz etmeden ağ istatistikleri
lythos run models/excavation.json -o out/excavation
```

Model: sıkı kum üzerinde katı kil, üstte 8 m kum dolgu; D1000 @ 1.2 m kazık perde; 350 ve 450 kN ön germeli iki sıra ankraj; 20 kPa saha sürşarjı; üç kazı kademesi.

```text
mesh: 1250 elements, 2651 nodes, 5325 degrees of freedom
  stage 1/6: 1 - initial stresses
  stage 2/6: 2 - install wall
  stage 3/6: 3 - excavate to 27.0 m
  stage 4/6: 4 - stress anchor row 1, excavate to 24.0 m
  stage 5/6: 5 - stress anchor row 2, excavate to 22.0 m
  stage 6/6: 6 - factor of safety
      trial SRF 0.800: equilibrium found, 71.6 mm, 8 iterations, 0.2 s
      trial SRF 1.100: equilibrium found, 71.6 mm, 37 iterations, 2.2 s
      trial SRF 1.550: equilibrium found, 119.6 mm, 90 iterations, 7.3 s
      trial SRF 2.050: no equilibrium, 4748.2 mm, 594 iterations, 46.2 s
      trial SRF 1.800: equilibrium found, 227.0 mm, 50 iterations, 3.4 s
      trial SRF 1.925: equilibrium found, 327.3 mm, 44 iterations, 2.9 s
      trial SRF 1.988: equilibrium found, 426.5 mm, 46 iterations, 3.4 s
      trial SRF 2.019: equilibrium found, 712.4 mm, 47 iterations, 3.6 s
      trial SRF 2.034: equilibrium found, 1739.0 mm, 356 iterations, 34.8 s
      trial SRF 2.042: no equilibrium, 1739.1 mm, 430 iterations, 45.2 s
report written to out/excavation/report.html
lowest factor of safety: 2.034
```

`summary.json` aşama aşama perde kuvvetlerini ve ankraj yüklerini verir:

| Aşama | Maks. deplasman | Perde maks. M | Perde deplasmanı | Ankraj 1 | Ankraj 2 |
| --- | --- | --- | --- | --- | --- |
| 2 — perde | 15.5 mm | 28 kNm/m | 3.0 mm | — | — |
| 3 — 27.0 m’ye kazı | 34.1 mm | 83 kNm/m | 10.0 mm | — | — |
| 4 — ankraj 1, 24.0 m | 59.3 mm | 164 kNm/m | 16.8 mm | 350.0 kN | — |
| 5 — ankraj 2, 22.0 m | 71.6 mm | 219 kNm/m | 20.8 mm | 305.8 kN | 450.0 kN |
| 6 — SSR | | | | **GS = 2.034** | |

Moment kapasitesi 1 257 kNm/m olduğundan son aşamada kullanım oranı 0.174’tür. İkinci ankraj gerildiğinde birinci sıra 350’den 306 kN’a gevşer — bu etkileşimi yalnızca aşamalı bir analiz gösterebilir.

<Gallery :cols="2" :items="[
  { src: '/img/fea/ex_exc_wall.png', caption: '5. aşamada perde kesit kuvvetleri: eksenel, kesme, moment' },
  { src: '/img/fea/ex_exc_disp.png', caption: '5. aşamada toplam deplasmanlar' },
  { src: '/img/fea/ex_exc_strain.png', caption: 'SSR göçmesinde deviatorik birim deformasyon; ankraj kök bölgeleri görünür' },
  { src: '/img/fea/ex_exc_ssr.png', caption: 'Kazının SSR eğrisi' }
]" />

## 3. CAD çiziminden inşaat sırası

```bash
lythos import --sample -o kazi.json
# ya da kendi çiziminiz:
lythos import kesit.dxf -o kesit.json --plot kesit.png
```

```text
  layer 'ANCHOR-3' -> anchor
  layer 'ANCHOR-5' -> anchor
  layer 'DIM-LEVELS' -> ignored
  layer 'EXC-2' -> excavation
  layer 'EXC-4' -> excavation
  layer 'EXC-6' -> excavation
  layer 'SOIL-DENSE-SAND' -> soil
  layer 'SOIL-FILL' -> soil
  layer 'SOIL-STIFF-CLAY' -> soil
  layer 'SURCHARGE-1' -> load
  layer 'TEXT-NOTES' -> ignored
  layer 'WALL-1' -> structure
  layer 'WATER-TABLE' -> water
  soil region 'SOIL-DENSE-SAND': 480.00 m2
  soil region 'SOIL-STIFF-CLAY': 840.00 m2
  ...
  step 1: build WALL-1; apply SURCHARGE-1
  step 2: excavate EXC-2
  step 3: stress ANCHOR-3
  step 4: excavate EXC-4
  step 5: stress ANCHOR-5
  step 6: excavate EXC-6
  warning: line loads were imported with zero magnitude; set q before running
  warning: 3 region(s), 320.0 m2 in all, are excavated by the end of the sequence. ...
```

Bu sekiz aşamalı bir model olur: başlangıç gerilmeleri, altı adım ve bir güvenlik sayısı. **Katman adının sonundaki sayı, o şeyin olduğu adımdır** — bütün kural bu. Çizim yalnızca geometriyi belirler; zemin özellikleri, kesit boyutları ve yük büyüklükleri sonra girilir (uyarılar bunu hatırlatır). Kurallar: [DXF içe aktarma](./reference#dxf-ice-aktarma).

![Çizimden okunan aşamalı kazı](/img/fea/dxf_staged.png)

## 4. Kazık perde kesiti

Kazıklar tasarlandıkları gibi verilir; eşdeğer plak rijitlikleri hesaplanır:

```python
from lythos.core.pile import PileSection

piles = PileSection(diameter=1.0, spacing=1.2, fck=32.0,
                    rho_s=0.012, stiffness_factor=0.7)   # çatlamış eğilme için 0.7
print(piles.describe())
```

```text
{'name': 'pile', 'diameter_m': 1.0, 'spacing_m': 1.2, 'fck_MPa': 32.0,
 'E_kPa': 33345764.46, 'area_m2': 0.7854, 'inertia_m4': 0.04909,
 'EA_kN_per_m': 21824751.8, 'EI_kNm2_per_m': 954832.9,
 'weight_kN_per_m2': 16.36, 'Mp_kNm_per_m': 1256.6}
```

Beton modülü EN 1992-1-1’den gelir (E<sub>cm</sub> = 22000·(f<sub>cm</sub>/10)<sup>0.3</sup> MPa). Bütün yapısal çıktılar perdenin metre boyu başınadır; tek bir kazıktaki kuvvet için aralığa (1.2 m) bölün.

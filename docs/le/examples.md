# Lythos LE — örnekler

Bütün çıktılar gerçek çalıştırmalardır.

## 1. Yerleşik örnekler

```bash
lythosle example
```

| Anahtar | Örnek |
| --- | --- |
| `homogeneous` | Homojen şev (ACADS 1a): 10 m yüksek 2Y:1D dolgu, c′ = 3 kPa, φ′ = 19.6°, kuru. Yayımlanmış referans GS = 1.00 |
| `layered_water` | Su tablalı tabakalı şev: ayrışmış dolgu / katı kil / sıkı kum içinde 15 m’lik yarma, şev yüzünde çıkan freatik yüzey |
| `soft_foundation` | Yumuşak kil üzerinde dolgu: s<sub>u</sub> = 12 + 1.8·z kPa, inşaat sonu durumu |
| `seismic` | Psödo-statik durum: tabakalı şev, k<sub>h</sub> = 0.15 ve tepede 20 kPa yol sürşarjı |
| `reinforced` | Zemin çivili yarma: kaya üzerinde siltli kumda 9 m dik kazı, dört sıra çivi, her biri 40 kN/m |
| `tension_crack` | Çekme çatlaklı kil yarması: s<sub>u</sub> = 60 kPa, tepede su dolu çatlak, dairesel olmayan optimizasyon |

## 2. ACADS karşılaştırma problemi

```bash
lythosle example homogeneous
```

```text
Lythos LE  -  limit equilibrium slope stability
==============================================================
Model            : Homogeneous slope
Units            : metric
Slope height     : 10.00
Average face     : 26.6 deg
Materials        : Embankment fill
Critical circle  : centre (9.14, 29.49), R = 29.49
Entry / exit     : x = 31.27 / 10.02
Sliding weight   : 897.5 per unit width
Slices           : 50

Method                                 FS  Equilibrium       lambda
--------------------------------------------------------------------
Ordinary / Fellenius                0.953  moment                 -
Bishop simplified                   0.985  moment                 -
Janbu corrected                     0.994  force                  -
Spencer                             0.985  moment + force    +0.434
Morgenstern-Price (half-sine)       0.984  moment + force    +0.532

Surfaces evaluated: 3773 (1735 rejected)

Notes
  - all factors of safety are reported for the critical surface of Bishop simplified
  - Janbu correction factor f0 = 1.048

Run time: 1.32 s
```

<div class="result">
<div><small>Yayımlanmış referans</small><strong>1.00</strong></div>
<div class="ok"><small>Bishop</small><strong>0.985</strong></div>
<div class="ok"><small>Spencer</small><strong>0.985</strong></div>
<div><small>Taranan yüzey</small><strong>3 773</strong></div>
</div>

Beklenen yöntem ilişkileri görünür: Fellenius en tutucudur; dairesel yüzeyde Bishop, Spencer’a çok yakındır; Morgenstern-Price, yarım sinüs fonksiyonunun ortalaması 1’den küçük olduğu için Spencer’dan büyük bir λ ister.

## 3. Komut satırından kendi modeliniz

```bash
lythosle analyze model.json --method spencer --method morgenstern_price \
         --slices 60 --json sonuc.json --csv dilimler.csv
```

`layered_water` modeliyle:

```text
Model            : Layered slope with groundwater
Materials        : Weathered fill, Stiff clay, Dense sand
Groundwater      : water table
Critical circle  : centre (21.74, 35.12), R = 35.44
Entry / exit     : x = 50.91 / 17.04

Method                                 FS  Equilibrium       lambda
--------------------------------------------------------------------
Spencer                             1.138  moment + force    +0.385
Morgenstern-Price (half-sine)       1.138  moment + force    +0.473
```

Dilim tablosu (CSV), her dilim için ağırlığı, taban açısını, boşluk suyu basıncını, normal kuvveti ve mobilize kesme dayanımını içerir:

```text
index,x,width,alpha_deg,height,weight,base_length,u,cohesion,phi_deg,material,normal_force,normal_stress,shear_strength,shear_mobilised
1,17.2769,0.4821,-7.2415,0.0315,0.2730,0.4859,0.0,5.0,26.0,Weathered fill,1.8681,3.8445,6.8751,6.0388
```

`analyze`, ya düz bir model dosyası ya da `{"model": ..., "options": ...}` dosyası alır — tarayıcıdaki **Download** düğmesinin ürettiği tam da budur. İlk `--method` aramayı yönetir.

## 4. Deprem ve dairesel olmayan optimizasyon

```bash
lythosle example seismic --optimize
```

```text
Model            : Pseudo-static analysis
Seismic          : kh = 0.15, kv = 0.0
Critical surface : non-circular, 61 vertices

Method                                 FS  Equilibrium       lambda
--------------------------------------------------------------------
Bishop simplified                   1.117  moment                 -
Janbu corrected                     1.084  force                  -
Spencer                             1.134  moment + force    +0.494
Morgenstern-Price (half-sine)       1.131  moment + force    +0.625

Notes
  - non-circular optimisation (Spencer): FS 1.137 -> 1.134 (0.3%) after 272 trial surfaces
  - moment-only method on a non-circular surface: the result depends on the moment axis
```

Optimizasyon kritik daireden başlar ve 272 deneme yüzeyiyle GS’yi %0.3 düşürür. Program, moment-yalnız yöntemlerin (Bishop) dairesel olmayan yüzeyde moment eksenine bağlı olduğunu kendisi uyarır — orada Spencer ya da Morgenstern-Price kullanın.

## 5. Python API

```python
from lythosle import SlopeModel, AnalysisOptions, analyze

model = SlopeModel.from_dict({
    "profile": [[0, 0], [10, 0], [30, 10], [50, 10]],
    "materials": [{"name": "fill", "unit_weight": 20, "cohesion": 3,
                   "friction_angle": 19.6}],
    "layers": [{"material": "fill"}],
})

result = analyze(model, AnalysisOptions.from_dict({
    "methods": ["bishop", "spencer"],
    "n_slices": 60,
    "search": {"nx": 16, "ny": 16, "n_tangent": 16, "refine_passes": 4},
}))

print(result.critical_fs)              # 0.987
print(result.results["spencer"].lam)   # 0.431 — dilimler arası kuvvet oranı
print(result.text_report())
```

Alt düzey parçalar da kullanılabilir — belirli bir daire için sekiz yöntemin hepsi:

```python
from lythosle import build_slices, circular_surface, solve_all

surface = circular_surface(model.canonical(), xc=20, yc=30, radius=28)
mass = build_slices(model.canonical(), surface, n_slices=50)
print({k: round(v.fs, 3) for k, v in solve_all(mass).items()})
```

```text
{'ordinary': 1.35, 'bishop': 1.406, 'janbu': 1.346, 'janbu_corrected': 1.417,
 'corps_engineers': 1.412, 'lowe_karafiath': 1.413, 'spencer': 1.405, 'morgenstern_price': 1.405}
```

## 6. Aşamalı dolgu: bir tasarım sorusu

`soft_foundation` örneği (yumuşak kil üzerinde 6 m dolgu, s<sub>u</sub> = 12 + 1.8·z) tek seferde yükseltilirse göçer. Yükseklik ve kilin dayanımı değiştirilerek aşamalı inşaat sınanabilir:

```python
import json
from lythosle import SlopeModel, AnalysisOptions, analyze

case = json.load(open("docs/examples/soft_foundation.json"))
options = AnalysisOptions.from_dict(case["options"])

def fs(height, su):
    m = json.loads(json.dumps(case["model"]))
    run = 2 * height                          # 1D:2Y şev
    m["profile"] = [[0, 0], [12, 0], [12 + run, height], [44, height],
                    [44 + run, 0], [70, 0]]
    m["materials"][1]["su"] = su
    return analyze(SlopeModel.from_dict(m), options).critical_fs

print(f"one lift, 6 m, su0 = 12 kPa : FS = {fs(6.0, 12.0):.3f}")
print(f"stage 1,  3 m, su0 = 12 kPa : FS = {fs(3.0, 12.0):.3f}")
print(f"stage 2,  6 m, su0 = 24 kPa : FS = {fs(6.0, 24.0):.3f}")
```

```text
one lift, 6 m, su0 = 12 kPa : FS = 0.896
stage 1,  3 m, su0 = 12 kPa : FS = 1.362
stage 2,  6 m, su0 = 24 kPa : FS = 1.366
```

İlk aşamanın konsolidasyonu kilin yüzey dayanımını 24 kPa’ya çıkarırsa, ikinci aşama güvenlidir. Bu bekleme süresi [Lythos Settle](/settle/examples)’ın t<sub>90</sub>’ı ile tahmin edilir — [uçtan uca örnekte](/guide/workflow) olduğu gibi.

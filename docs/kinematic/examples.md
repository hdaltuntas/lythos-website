# Lythos Kinematic — örnekler

Bütün çıktılar gerçek çalıştırmalardır. `example` komutunun yazdığı girdi dosyası tek bir iş akışını baştan sona taşır.

## Girdiler

```bash
lythos-kinematic example -o girdiler.json
```

Şev yüzü **72° / 230°** (eğim / eğim yönü), sürtünme açısı **31°**, yanal sınır **±20°**. Altı süreksizlik takımı, her biri yönelim belirsizliğiyle (standart sapma):

| Takım | Eğim | Eğim yönü | σ |
| --- | --- | --- | --- |
| T2 | 73° | 152° | 2.5° |
| T1 | 69° | 189° | 3.0° |
| E3 | 34° | 232° | 2.0° |
| E1 | 28° | 104° | 2.5° |
| E2 | 21° | 303° | 2.0° |
| J6 | 50° | 60° | 3.0° |

## 1. Kinematik tarama

Mod girdi dosyasındaki `mode` alanından okunur (`planar`, `wedge`, `toppling`):

```bash
lythos-kinematic screen girdiler.json --lang EN -o tarama.pdf
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

Aynı takımlar kama ve devrilme için:

```text
Wedge Sliding: 1 / 15
  T2 × T1          Safe
  T2 × E3          CRITICAL
  ...
Flexural Toppling: 1 / 6
  J6               CRITICAL
```

**Okuma notları.** E3, şev yüzüyle neredeyse aynı yöne (232° – 230°) ve sürtünme açısından büyük, yüzden küçük bir açıyla (31° < 34° < 72°) eğimlidir: klasik düzlemsel kayma. J6 ters yöne (60°) dik eğimlidir: devrilme. On beş kesişimden yalnızca T2 × E3 kama kaymasına izin verir.

## 2. Kritik düzlem için limit denge

Arayüzde “→ Kritik sonucu limit dengeye gönder” E3’ü düzlemsel analize aktarır (ψ<sub>p</sub> = 34°, ψ<sub>f</sub> = 72°, φ = 31°). Girdi dosyası bu durumu zaten içerir: H = 20 m, γ = 25 kN/m³, tepeden 6 m içeride çekme çatlağı.

```bash
lythos-kinematic run girdiler.json --mode planar
```

```text
==============================================================
  DÜZLEMSEL KAYMA ANALİZİ  (Hoek & Bray, 1 m şev uzunluğu)
==============================================================
Şev: H = 20.00 m, ψf = 72.0°, ψp = 34.0°, ψs = 0.0°
Blok alanı            :    132.302 m²
Blok ağırlığı W       :    3307.54 kN/m
Kayma düzlemi uzunluğu:     15.076 m
Çekme çatlağı         : derinlik z = 11.57 m, üst şevde (x = 12.50 m)
--------------------------------------------------------------
Su yüksekliği zw      :       0.00 m
Su kuvveti U (düzlem) :       0.00 kN/m
Su kuvveti V (çatlak) :       0.00 kN/m
Sismik kuvvet (yatay) :       0.00 kN/m
Destek kuvveti T      :       0.00 kN/m  @ 0.0° (aktif)
--------------------------------------------------------------
Etkin normal kuvvet   :    2742.07 kN/m
Kaydırıcı kuvvet      :    1849.55 kN/m
Direnç kuvveti        :    1647.60 kN/m
==============================================================
GÜVENLİK SAYISI (FS)  : 0.891
==============================================================
```

<div class="result">
<div class="bad"><small>Düzlemsel GS (kuru)</small><strong>0.891</strong></div>
<div><small>Blok ağırlığı</small><strong>3 308 kN/m</strong></div>
<div><small>GS = 1.5 için destek</small><strong>697 kN/m</strong></div>
</div>

Kohezyonsuz, kuru bir düzlemde GS = tan φ / tan ψ<sub>p</sub> = tan 31° / tan 34° = 0.891 — Hoek & Bray’in kapalı formu birebir.

## 3. Kama ve devrilme

```bash
lythos-kinematic run girdiler.json --mode wedge --lang EN
```

```text
Wedge volume          :  13151.053 m³
Wedge weight          :  328776.31 kN
Intersection (J1∩J2)  : trend  157.7°, plunge  31.2°
...
FACTOR OF SAFETY (FS) : 1.696
```

Bu, Hoek & Bray’in kapalı form “kısa çözüm” örneğidir (kuru 1.696, dolu 1.065) ve testlerde birebir sabitlenmiştir.

```bash
lythos-kinematic run girdiler.json --mode toppling --lang EN
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

Bu, Wyllie & Mah’ın 9. bölüm örneğidir: blok yükseklikleri, göçme modları ve φ ≈ 38°’lik limit denge. Tepe altındaki bloklar tepeden aşağı doğru *devrilme → kayma → stabil* sırasını izler.

## 4. Python API

Tarama ve limit denge çekirdekleri arayüzden bağımsızdır ve doğrudan kullanılabilir:

```python
from lythoskinematic.kinematics.engine import screen, run_monte_carlo, WEDGE
from lythoskinematic.rockslope.wedge import Joint, Plane, WedgeInput, Water, analyze

# 1 — 65°/185° yüze karşı üç takımın kinematik taraması
labels, dips, dirs = ["J1", "J2", "J3"], [45, 70, 60], [105, 235, 20]
res = screen(labels, dips, dirs, slope_dip=65, slope_dir=185,
             friction=30, lateral_limit=20, mode=WEDGE)
for item in res.items:
    print(f"{item.name:8s} plunge {item.value1:5.1f}°  trend {item.value2:6.1f}°  "
          f"{'CRITICAL' if item.critical else 'safe'}")

mc = run_monte_carlo(dips, dirs, [5, 5, 5], 65, 185, 30, 20, WEDGE, n_trials=10000)
print(f"probability of failure: {mc.pof:.1f} %  ({mc.risk_level()})")

# 2 — kamanın limit dengesi, kuru ve su dolu
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

**İlginç bir ayrıntı:** J1 × J2 kesişimi deterministik olarak “güvenli”dir — dalım yönü (157.7°) şev yönünden (185°) 27° sapar ve ±20°’lik yanal sınırın dışında kalır. Ama yönelimlere 5°’lik belirsizlik verildiğinde örneklerin **%3.4**’ünde sınırın içine girer. Limit denge ise kamanın kuru iken 1.70, su dolu iken 1.07 güvenlik sayısına sahip olduğunu söyler. Risk sınıfları: < %5 düşük, < %15 orta, üstü yüksek.

Düzlemsel kayma ve gerekli destek:

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

Açı verilmezse optimum destek açısı Hoek & Bray’e göre tan(ψ<sub>p</sub> + θ) = tan φ / GS<sub>hedef</sub> ile bulunur; negatif açı, bulonun yataydan yukarı doğru eğimli olması demektir.

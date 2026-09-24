# Lythos Bearing — örnekler

Bu sayfadaki bütün komutlar ve betikler çalıştırılmış, çıktılar olduğu gibi aktarılmıştır. Hepsi aynı başlangıç projesinden yola çıkar: **tabakalı zemin üzerinde 2.5 × 4.0 m’lik dikdörtgen temel**.

| Girdi | Değer |
| --- | --- |
| Temel | dikdörtgen, B = 2.5 m, L = 4.0 m, D<sub>f</sub> = 1.5 m |
| Yükler | V = 1700 kN, H<sub>B</sub> = 150 kN, M<sub>B</sub> = 300 kNm |
| Su tablası | 2.0 m derinlikte |
| Zemin | 1.5 m dolgu (φ′ = 30°) / 5.0 m katı kil (c′ = 5 kPa, φ′ = 24°, c<sub>u</sub> = 90 kPa) / 8.0 m sıkı kum (φ′ = 38°) |
| Kontrol | GS ≥ 3.0 (taşıma), ≥ 1.5 (kayma), e ≤ B/6 |

## 1. Başlangıç projesini çalıştırmak

```bash
lythos-bearing example -o proje.bearing
lythos-bearing run proje.bearing --lang tr
```

```text
TAŞIMA GÜCÜ SONUÇLARI
--------------------------------------------------------------------------------
Temel: Dikdörtgen, B = 2.50 m, L = 4.00 m, Df = 1.50 m
Yükler: V = 1700.0 kN, H = 150.0 kN (düşeyden 5.0°)
Dışmerkezlik: e_B = 0.176 m, e_L = 0.000 m → B' = 2.147 m, L' = 4.000 m, A' = 8.59 m²
Taban basıncı: q_maks = 242.0 kPa, q_min = 98.0 kPa (orta üçte bir içinde)
Taban sürşarjı: σv0 = 27.0 kPa, u = 0.0 kPa, σ'v0 = 27.0 kPa
Göçme bölgesi: tabanın 2.80 m altına kadar (Stiff clay)
Hesap dayanımı: c' = 5.0 kPa, φ' = 24.0°, cu = 90.0 kPa, γ = 9.69 kN/m³

Yönteme göre taşıma gücü
  Yöntem                           Analiz        q_ult    q_net,ult           Nc           Nq           Nγ
  Terzaghi (1943)                drenajlı        516.8        489.8        23.36        11.40         7.90
  Meyerhof (1963)                drenajlı        466.0        439.0        19.32         9.60         5.72
  Brinch Hansen (1970)           drenajlı        474.2        447.2        19.32         9.60         5.75
  Vesić (1973) *                 drenajlı        533.5        506.5        19.32         9.60         9.44
  EN 1997-1 Ek D                 drenajlı        517.3        490.3        19.32         9.60         7.66
  Skempton (1951), drenajs      drenajsız        594.9        567.9         6.31         1.00         0.00

Belirleyici yöntemin üç terimi
  kohezyon: 133.2 kPa (%25)
  sürşarj: 339.1 kPa (%64)
  zati ağırlık: 61.2 kPa (%11)

Kontroller
  Taşıma gücü: GS = 2.96 ≥ 3.00 — UYGUN DEĞİL
  Kayma: GS = 5.33 ≥ 1.50 — UYGUN
  Dışmerkezlik: e/B = 0.071 ≤ 0.167 — UYGUN

  Taşıma gücü kontrolü B = 2.51 m'den itibaren sağlanıyor
```

<div class="result">
<div><small>q<sub>ult</sub> (Vesić)</small><strong>533.5 kPa</strong></div>
<div class="bad"><small>Taşıma GS</small><strong>2.96</strong></div>
<div class="ok"><small>Kayma GS</small><strong>5.33</strong></div>
<div><small>Gerekli genişlik</small><strong>2.51 m</strong></div>
</div>

**Okuma notları.** Su tablası taban seviyesinin 0.5 m altında olduğundan göçme bölgesinde etkin birim hacim ağırlık 9.69 kN/m³’e düşer. Dayanım, tabanın 2.80 m altına uzanan Prandtl bölgesi üzerinde ortalanır; bu bölge tamamen katı kilde kalır. Moment tabanı B doğrultusunda 0.176 m kaydırır ve etkin genişlik 2.147 m olur. Terimlerin %64’ü sürşarjdan gelir: temel derinliği bu temelde kilit parametredir.

Rapor almak için `-o rapor.pdf` (ya da `.html`, `.docx`) ekleyin.

## 2. Python’dan genişlik taraması

Gerekli genişliği görmek için B’yi tarayın:

```python
from lythosbearing import forms
from lythosbearing.web.session import Session

session = Session(lang="en")
values = forms.defaults()              # the starter project: 2.5 × 4.0 m footing

for B in (2.0, 2.5, 3.0, 3.5):
    values["B"] = B
    r = session.analyse(values)
    print(f"B = {B:.1f} m   q_ult = {r['q_ult']:6.1f} kPa   FS = {r['FS']:.2f}")
```

```text
B = 2.0 m   q_ult =  522.7 kPa   FS = 2.15
B = 2.5 m   q_ult =  533.5 kPa   FS = 2.96
B = 3.0 m   q_ult =  550.4 kPa   FS = 3.92
B = 3.5 m   q_ult =  569.7 kPa   FS = 5.02
```

q<sub>ult</sub> genişlikle yavaş artar (N<sub>γ</sub> terimi), ama asıl kazanç uygulanan basıncın düşmesinden gelir; güvenlik sayısı bu yüzden hızla yükselir.

## 3. Yöntemleri tablo olarak okumak

Arayüzdeki tablo `result["table"]` içindedir:

```python
r = Session(lang="en").analyse(forms.defaults())
for row in r["table"]["rows"]:
    method, analysis, q_ult, q_net, q_all, fs = row["cells"]
    print(f"{method:28s} {analysis:10s} q_ult = {q_ult:>7s} kPa  FS = {fs}")
```

```text
Terzaghi (1943)              drained    q_ult =   516.8 kPa  FS = 2.87
Meyerhof (1963)              drained    q_ult =   466.0 kPa  FS = 2.57
Brinch Hansen (1970)         drained    q_ult =   474.2 kPa  FS = 2.62
Vesić (1973)                 drained    q_ult =   533.5 kPa  FS = 2.96
EN 1997-1 Annex D            drained    q_ult =   517.3 kPa  FS = 2.87
Skempton (1951), undrained   undrained  q_ult =   594.9 kPa  FS = 3.32
```

Aynı temel için yöntemler arasında %14’lük bir fark vardır (Meyerhof 2.57 – Vesić 2.96). Hangi yöntemin şartnamede istendiğini bilmek, “hangi sayı doğru” sorusundan daha önemlidir.

## 4. EN 1997-1 tasarım yaklaşımları

Güvenlik sayısı yerine kısmi katsayılarla doğrulama için `approach` alanını değiştirin:

```python
values = forms.defaults()
for approach in ("fs", "da1", "da2", "da3"):
    values["approach"] = approach
    r = session.analyse(values)
    print(f"{approach:4s} B ≥ {r['required_width']:.2f} m")
```

```text
fs   B ≥ 2.51 m
da1  B ≥ 2.08 m
da2  B ≥ 2.13 m
da3  B ≥ 2.34 m
```

DA1 seçildiğinde rapora iki kombinasyon eklenir:

```text
EN 1997-1 verification (EN 1997-1, Design Approach 1)
  DA1-1 (A1 + M1 + R1): Ed = 2372 kN ≤ Rd = 4570 kN, Λ = 0.52 — OK
    sliding: Hd = 209 kN ≤ Rd = 1099 kN — OK
  DA1-2 (A2 + M2 + R1): Ed = 1853 kN ≤ Rd = 2733 kN, Λ = 0.68 — OK
    sliding: Hd = 163 kN ≤ Rd = 694 kN — OK
```

GS = 3.0 ölçütü bu temelde Eurocode’un üç yaklaşımından da tutucudur. `variable_fraction` (varsayılan 0.3) yüklerin değişken payıdır ve A1/A2 katsayılarını belirler.

## 5. Deprem

B = 2.6 m seçildikten sonra psödo-statik yatay ivme katsayısının etkisi:

```python
values = forms.defaults()
values["B"] = 2.6
for kh in (0.0, 0.1, 0.2):
    values["seismic_enabled"] = kh > 0
    values["kh"] = kh
    r = session.analyse(values)
    print(f"kh = {kh:.1f}   q_ult = {r['q_ult']:6.1f} kPa   FS = {r['FS']:.2f}")
```

```text
kh = 0.0   q_ult =  536.6 kPa   FS = 3.14
kh = 0.1   q_ult =  497.9 kPa   FS = 2.90
kh = 0.2   q_ult =  452.1 kPa   FS = 2.62
```

k<sub>h</sub>·V yatay yüke eklenir (yük eğimi artar) ve `soil_inertia` açıkken Paolucci & Pecker’in (1 − k<sub>h</sub>/tan φ)<sup>0.35</sup> azaltması uygulanır.

## 6. Güvenilirlik çalışması

`example` komutunun yazdığı proje iki çalışma değişkeni içerir: V (lognormal, CoV = 0.15) ve katı kilin φ′’si (normal, CoV = 0.12). Latin hiperküp ile 300 örnek:

```bash
lythos-bearing study proje.bearing -o ornekler.csv
```

```text
STUDY RESULTS
------------------------------------------------------------------------------
Method: Latin hypercube; samples: 300; successful: 300

Statistics of the outputs
                                  n        mean         std          P5         P50         P95
  Ultimate capacity (kPa)       300       519.3       111.7       322.8       531.9       642.1
  Factor of safety              300       2.916      0.7192       1.768       2.942       4.112
  Factor of safety, sliding     300       5.014      0.7633       3.717       5.118       6.266

Probability of failure
  Bearing capacity: 158 of 300, P = 0.527 (95 % CI 0.47 – 0.582), β = -0.07
  Sliding: 0 of 300, P = 0 (95 % CI 8.67e-19 – 0.0126), β = > 2.71
  Eccentricity: 0 of 300, P = 0 (95 % CI 8.67e-19 – 0.0126), β = > 2.71

Sensitivity of the factor of safety (Spearman ρ)
  Stiff clay · phi                    +0.851
  Actions · V                         -0.287
```

Burada “göçme”, **GS < 3.0** demektir; ortalaması eşik civarında olan bir tasarımda olasılığın ~0.5 çıkması beklenir. Asıl bilgi duyarlılıktadır: sonucu yük değil, kilin **φ′’si** belirliyor (ρ = +0.85). Ek bir arazi/laboratuvar programı, genişliği büyütmekten daha verimli olabilir.

::: tip Çalışmayı arayüzde kurmak
**2 · Çalışma** sekmesinde herhangi bir girdiyi listeye ekleyin, aralık ya da dağılım seçin ve çalıştırın. Sonuçlar tornado, histogram ve saçılım olarak çizilir; örnekler CSV/XLSX’e aktarılır ve raporun bir bölümü olur.
:::

## 7. Arazi deneyi (SPT)

`insitu_enabled` açıldığında, Meyerhof’un SPT kuralı (Bowles düzeltmesiyle, izin verilen oturma 25 mm) “diğer yöntemler” tablosuna eklenir:

```python
values = forms.defaults()
values.update(insitu_enabled=True, test="spt", N60=20.0, settlement=25.0)
```

```text
Other methods
  SPT (Meyerhof), settlement …                       —            —        355.6
```

SPT kuralı bir **oturma** ölçütüdür: 355.6 kPa, 25 mm oturma için izin verilen net basınçtır, göçme yükü değildir.

# Lythos Settle — örnekler

Bütün çıktılar gerçek çalıştırmalardır. Başlangıç projesi: **yumuşak kil üzerinde 8 × 16 m’lik esnek radye**.

| Girdi | Değer |
| --- | --- |
| Temel | dikdörtgen, B = 8 m, L = 16 m, D<sub>f</sub> = 1.5 m, q = 100 kPa (brüt), kazılan örtü düşülür |
| Su tablası | 2.0 m |
| Profil | 1.5 m dolgu / 3.5 m orta sıkı kum (E = 25 MPa) / **6 m yumuşak kil** (C<sub>c</sub> = 0.32, C<sub>r</sub> = 0.05, e<sub>0</sub> = 1.05, OCR = 1.3, c<sub>v</sub> = 1.5 m²/yıl, C<sub>α</sub> = 0.01, çift drenaj) / 10 m sıkı kum |
| Ölçütler | s<sub>izin</sub> = 150 mm, açısal distorsiyon 1/500, tasarım ömrü 50 yıl |

## 1. Radye oturması

```bash
lythos-settle example -o radye.settle
lythos-settle run radye.settle --lang tr
```

```text
OTURMA ANALİZİ SONUÇLARI
------------------------------------------------------------------------------
Temel: Dikdörtgen, B = 8.00 m, L = 16.00 m, Df = 1.50 m, Esnek
Brüt basınç q = 100.0 kPa; taban seviyesinde örtü yükü σv0 = 27.0 kPa; net basınç q_net = 73.0 kPa
Gerilme dağılımı: Boussinesq (elastik); ani oturma: Elastik (Steinbrenner)
Etki derinliği: zeminden 15.75 m (taban altında 14.25 m)

Hesap noktalarında oturma (mm)
  Nokta                                  Ani     Konsol.     İkincil      Toplam
  Merkez                                42.9        76.1        22.7       141.7
  Karakteristik nokta                   27.3        32.2        14.7        74.1
  Uzun kenar ortası                     24.7        32.6        16.5        73.8
  Köşe                                  11.8        10.5         4.0        26.3

Tabakalara göre oturma, merkez (mm)
  Tabaka                                 Ani     Konsol.     İkincil      Toplam
  Medium dense sand                      6.9         0.0         0.0         6.9
  Soft clay                             34.3        76.1        22.7       133.1
  Dense sand                             1.7         0.0         0.0         1.7

Konsolidasyon süresi
  Soft clay: H_dr = 3.00 m, cv = 1.50 m²/yıl, t50 = 1.2 yıl, t90 = 5.1 yıl
  50 yıl sonundaki oturma: 141.7 mm

Kontroller
  Toplam oturma 141.7 mm, izin verilen 150.0 mm: UYGUN
  Açısal distorsiyon 1/59, izin verilen 1/500: UYGUN DEĞİL
```

<div class="result">
<div class="ok"><small>Merkez, toplam</small><strong>141.7 mm</strong></div>
<div><small>t<sub>90</sub></small><strong>5.1 yıl</strong></div>
<div class="bad"><small>Açısal distorsiyon</small><strong>1/59</strong></div>
</div>

**Okuma notları.** Toplam oturma sınırın altında, ama **esnek** bir radyenin merkezi ile kenarı arasındaki fark (141.7 − 73.8 mm, B/2 = 4 m üzerinde) 1/59’luk bir distorsiyon verir. Oturmanın %94’ü yumuşak kil tabakasından gelir. Net basınç, kazılan 1.5 m’lik örtü düşüldüğü için 73 kPa’dır.

## 2. Yöntem seçimlerinin etkisi

```python
from lythossettle import forms
from lythossettle.web.session import Session

session = Session(lang="en")
cases = {
    "Boussinesq, flexible": dict(stress_method="boussinesq", rigidity="flexible"),
    "2:1 spread, flexible": dict(stress_method="two_to_one", rigidity="flexible"),
    "Schmertmann in sand":  dict(immediate_method="schmertmann"),
}
for name, change in cases.items():
    values = forms.defaults()
    values.update(change)
    c = session.analyse(values)["points"]["center"]
    print(f"{name:22s} centre: immediate {c['immediate']:5.1f} + consolidation "
          f"{c['consolidation']:5.1f} + secondary {c['secondary']:4.1f} = {c['total']:6.1f} mm")
```

```text
Boussinesq, flexible   centre: immediate  42.9 + consolidation  76.1 + secondary 22.7 =  141.7 mm
2:1 spread, flexible   centre: immediate  42.5 + consolidation  36.9 + secondary 15.6 =   95.1 mm
Schmertmann in sand    centre: immediate  40.5 + consolidation  76.1 + secondary 22.7 =  139.3 mm
```

2:1 yayılması yükü bütün alana eşit dağıtır; merkezdeki gerilmeyi Boussinesq’e göre düşük tahmin eder ve merkez konsolidasyonunu yarıya indirir. 2:1, ortalama oturma için makul, merkez–kenar farkı için yanıltıcıdır.

**Rijit temel:** `rigidity="rigid"` seçildiğinde oturma karakteristik noktada (0.74·B/2, 0.74·L/2) okunur ve başlık `s = 74.1 mm` olur; rijit bir radyede distorsiyon sorunu ortadan kalkar, ama radyenin kendisi bu farkı eğilmeyle karşılamak zorundadır.

## 3. Dolgu (trapez yük)

`shape="embankment"` ile temel yerine dolgu tanımlanır:

```python
values = forms.defaults()
values.update(shape="embankment", emb_crest=12.0, emb_height=4.0,
              emb_slope_left=26.57, emb_slope_right=26.57, emb_gamma=20.0)

r = Session(lang="en").analyse(values)
print(r["headline"])
for name, p in r["points"].items():
    print(f"{name:8s} total = {p['total']:6.1f} mm")
```

```text
s = 228.0 mm · t90 = 5.1 years · Settlement check: NOT OK
center   total =  228.0 mm
shoulder total =  190.6 mm
midslope total =  108.5 mm
toe      total =   17.0 mm
```

4 m’lik dolgu (γH = 80 kPa) kazılmış bir radyeden daha büyük net yük uygular; 228 mm sınırı aşar. Gerilme artışı, Flamant çizgi yükünün parçalı doğrusal yük üzerinde integraliyle kesin hesaplanır; ani oturma tepe için bir şerit, her şev için 16 dilimle düzlem şekil değiştirmede Steinbrenner’dir.

## 4. Güvenilirlik çalışması

Başlangıç projesinin çalışma değişkenleri: basınç q ve kilin C<sub>c</sub>’si. LHS ile 500 örnek:

```bash
lythos-settle study radye.settle -o ornekler.csv
```

```text
Statistics of the outputs
                                           n      mean       std        P5       P50       P95
  Total settlement (mm)                  500       141      28.9      98.7       137       194
  Consolidation settlement (mm)          500      76.1      22.3        45      73.1       121
  Angular distortion (‰)                 500      16.9      3.46        12      16.4      23.1

Probability of exceeding the criteria
  Settlement > allowable: 175 of 500, P = 0.35 (95 % CI 0.309 – 0.393), β = 0.39
  Distortion > allowable: 500 of 500, P = 1 (95 % CI 0.992 – 1), β = −∞

Sensitivity of the total settlement (Spearman ρ)
  Foundation · q                          +0.86
  Soft clay · Cc                          +0.44
```

Deterministik hesap 141.7 mm ile “uygun” der, ama belirsizlikle **%35** olasılıkla 150 mm aşılır (β = 0.39). Esnek radyede distorsiyon ise her örnekte aşılır: sorun bir belirsizlik değil, tasarım kararıdır (rijitlik ya da zemin iyileştirme).

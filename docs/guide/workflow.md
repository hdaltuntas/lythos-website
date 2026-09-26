---
title: "Uçtan uca geoteknik tasarım örneği — bir liman sahası"
description: "Uçtan uca geoteknik tasarım: bir liman sahasında temel, önyükleme dolgusu, şev, kazık, rıhtım perdesi, derin kazı, MSE duvar ve kaya şevi, sekiz Lythos aracıyla."
---

# Uçtan uca bir proje

Bu sayfa, hayali bir **liman genişletme sahasında** Lythos ailesinin sekiz üyesini sırayla kullanır. Her adım, ilgili yazılımın kendi örnek projesiyle (ya da ona yapılmış küçük bir değişiklikle) **gerçekten çalıştırılmış** ve çıktılar olduğu gibi aktarılmıştır.

::: info Sayılar hakkında
Her adım kendi yazılımının başlangıç örneğini kullanır; zemin profilleri adımlar arasında birebir aynı değildir. Amaç tek bir tasarımı bitirmek değil, doğru aracın doğru soruyu nasıl yanıtladığını göstermektir.
:::

<div class="steps">

### İdari bina temelleri — Lythos Bearing

Tabakalı zemin (dolgu / katı kil / sıkı kum) üzerinde 2.5 × 4.0 m’lik tekil temel; V = 1700 kN, H = 150 kN, M = 300 kNm.

```bash
lythos-bearing example -o idari.bearing
lythos-bearing run idari.bearing --lang tr
```

```text
Kontroller
  Taşıma gücü: GS = 2.96 ≥ 3.00 — UYGUN DEĞİL
  Kayma: GS = 5.33 ≥ 1.50 — UYGUN
  Dışmerkezlik: e/B = 0.071 ≤ 0.167 — UYGUN

  Taşıma gücü kontrolü B = 2.51 m'den itibaren sağlanıyor
```

Vesić yöntemiyle q<sub>ult</sub> = 533.5 kPa; Meyerhof en tutucu (466.0 kPa). Karar: **B = 2.60 m**. → [Bearing örnekleri](/bearing/examples)

### Depo alanı önyükleme dolgusu — Lythos Settle

Yumuşak kil üzerinde 4 m yüksekliğinde, 12 m tepe genişliğinde bir önyükleme dolgusu:

```python
values = forms.defaults()
values.update(shape="embankment", emb_crest=12.0, emb_height=4.0, emb_gamma=20.0)
r = Session(lang="en").analyse(values)
```

```text
s = 228.0 mm · t90 = 5.1 years · Settlement check: NOT OK
center   total =  228.0 mm
shoulder total =  190.6 mm
midslope total =  108.5 mm
toe      total =   17.0 mm
```

Oturmanın %90’ı **5.1 yılda** tamamlanıyor — önyükleme süresi için fazla. Düşey dren gerekeceği açık. → [Settle örnekleri](/settle/examples)

### Dolgunun duraylılığı — Lythos LE

Aynı türden yumuşak kil (s<sub>u</sub> = 12 + 1.8·z kPa) üzerinde 6 m’lik dolgu tek seferde yükseltilirse:

```text
one lift, 6 m, su0 = 12 kPa : FS = 0.896
stage 1,  3 m, su0 = 12 kPa : FS = 1.362
stage 2,  6 m, su0 = 24 kPa : FS = 1.366
```

Tek aşamada dolgu göçer (Bishop 0.896). İki aşamalı inşaatta, ilk aşamanın konsolidasyonuyla s<sub>u0</sub> 24 kPa’ya çıktığında ikinci aşama 1.37 ile güvenli. Settle’ın verdiği t90, bu bekleme süresinin ölçüsüdür. → [LE örnekleri](/le/examples)

### Depo kazıklı temeli — Lythos Pile

3 × 3 fore kazık grubu, D = 0.80 m, L = 20 m, Q = 10 000 kN:

```text
KONTROLLER
  Tek kazık: GS = 4.31 (gerekli 2.50) — UYGUN
  Grup: GS = 3.10 (gerekli 2.50) — UYGUN
  Oturma: 32.8 mm (izin verilen 40.0 mm) — UYGUN

  Gerekli boy: L = 18.50 m (uç 20.00 m'de)
```

Boy taraması ilginç bir ayrıntı gösterir: L = 18 m’de GS yalnızca 1.84; uç sıkı kuma girdiği anda (L = 20 m) 4.31’e sıçrar. Kazıkları sıkı kuma soketlemek belirleyicidir. → [Pile örnekleri](/pile/examples)

### Rıhtım perdesi — Lythos SPWA

8 m kazı yüksekliğinde, iki sıra ankrajlı NZ 26 palplanş rıhtım; k<sub>h</sub> = 0.1:

```text
Teorik Gerekli Gömülme Derinliği (D_req): 4.64 m
Tasarım Gömülme Derinliği (D_design):     6.00 m
...
Maksimum Mutlak Moment: 564.58 kNm/m   (LE: 559.61)
Maks. Deplasman: 73.3 mm   (LE: 51.5)
DURUM: NOT OK - DEFLECTION EXCEEDED!
```

Limit denge perdenin yeterli olduğunu söylerken, **aşamalı kiriş-yay analizi** deplasmanın H/120 = 66.7 mm sınırını aştığını gösterir. İki analizi yan yana koymanın değeri tam olarak budur: daha rijit bir kesit ya da ön germeli ankraj gerekir. → [SPWA örnekleri](/spwa/examples)

### Pompa istasyonu derin kazısı — LythosFEA

Kazık perdeli (D1000 @ 1.2 m), iki sıra ön germeli ankrajlı 8 m’lik kazı; altı aşama:

```text
stage 5/6: 5 - stress anchor row 2, excavate to 22.0 m
stage 6/6: 6 - factor of safety
lowest factor of safety: 2.034
```

<div class="result">
<div class="ok"><small>Güvenlik sayısı (SSR)</small><strong>2.03</strong></div>
<div><small>Perde maks. moment</small><strong>219 kNm/m</strong></div>
<div><small>Perde maks. deplasman</small><strong>20.8 mm</strong></div>
<div><small>Ankraj kuvvetleri</small><strong>306 / 450 kN</strong></div>
</div>

→ [FEA örnekleri](/fea/examples)

### Erişim rampası — Lythos MSEW

6 m yüksekliğinde, 50×4 çelik şeritli donatılı zemin duvar:

```text
Dış duraylılık (GS)          değer   gerekli
  Kayma                       2.99      1.50   UYGUN
  Devrilme                    6.02      2.00   UYGUN
  Taşıma gücü                 7.51      2.50   UYGUN
İç duraylılık
  Sıyrılma                    1.62      1.50   UYGUN   (z = 5.625 m)
  Gerekli eşit boy: L = 5.13 m (FHWA en küçüğü 4.20 m)
```

Belirleyici olan en üst tabakanın **sıyrılması** — orada örtü gerilmesi en küçüktür. → [MSEW örnekleri](/msew/examples)

### Dolgu malzemesi ocağı — Lythos Kinematic

Taş ocağındaki 20 m’lik kaya şevinde altı süreksizlik takımı taranır:

```text
Planar Sliding: 1 / 6
  E3               CRITICAL
```

Kritik takım limit dengeye aktarılır: çekme çatlaklı düzlemsel kayma **GS = 0.891**. GS = 1.5 için gerekli destek, Hoek & Bray’in optimum açısıyla **697 kN/m**. → [Kinematic örnekleri](/kinematic/examples)

</div>

## Özet

| Yapı | Araç | Sonuç | Karar |
| --- | --- | --- | --- |
| İdari bina temeli | Bearing | GS = 2.96 < 3.00 | B = 2.60 m |
| Önyükleme dolgusu | Settle | 228 mm, t90 = 5.1 yıl | Düşey dren |
| Dolgu duraylılığı | LE | 0.90 → 1.36 / 1.37 | İki aşamalı inşaat |
| Depo kazıkları | Pile | GS 4.31 / grup 3.10 | L ≥ 18.5 m |
| Rıhtım perdesi | SPWA | δ = 73 mm > 67 mm | Daha rijit kesit |
| Derin kazı | FEA | SSR = 2.03 | Uygun |
| Erişim rampası | MSEW | Bütün kontroller uygun | L ≥ 5.13 m |
| Ocak şevi | Kinematic | GS = 0.89 | 697 kN/m bulon |

Her adımın proje dosyası `example` komutuyla üretilir ve `run` ile yeniden çalıştırılır; bu sayfadaki bütün sayılar kendi makinenizde tekrar üretilebilir.

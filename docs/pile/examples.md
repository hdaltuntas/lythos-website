# Lythos Pile — örnekler

Bütün çıktılar gerçek çalıştırmalardır. Başlangıç projesi: **tabakalı zeminde 3 × 3 fore kazık grubu**.

| Girdi | Değer |
| --- | --- |
| Kazık | dairesel, D = 0.80 m, L = 20 m, baş 1.5 m’de, fore / CFA, γ<sub>p</sub> = 25 kN/m³ |
| Grup | 3 × 3, aralık 2.40 m (3D), Q = 10 000 kN, Converse–Labarre, blok göçme açık |
| Su tablası | 2.5 m |
| Profil | 2 m dolgu / 6 m yumuşak kil (c<sub>u</sub> = 35) / 7 m orta sıkı kum (φ′ = 32°) / 5 m katı kil (c<sub>u</sub> = 120) / 12 m sıkı kum (φ′ = 36°, N<sub>60</sub> = 40) |
| Ölçütler | GS = 2.5, izin verilen oturma 40 mm |

## 1. Kazık grubu

```bash
lythos-pile example -o grup.pile
lythos-pile run grup.pile --lang tr
```

```text
KAZIK TAŞIMA GÜCÜ SONUÇLARI
------------------------------------------------------------------------------------
Kazık: Dairesel, D = 0.80 m, L = 20.00 m, baş 1.50 m'de, uç 21.50 m'de; Fore / CFA
Uç alanı Ab = 0.5027 m², çevre p = 2.513 m
Grup: 3 × 3 = 9 kazık, 2.40 × 2.40 m aralıkla; Q = 10,000 kN, kazık başına 1,111 kN
Su tablası 2.50 m'de
Kritik derinlik zc = 12.00 m (15·D)
Kumda: K/K0 = 1.00, δ/φ' = 0.75

UÇ DİRENCİ
  Uç 'Dense sand' (Granüler) tabakasında, 21.50 m'de, σ'v0 = 228.6 kPa
  Meyerhof *                    Nq* = 168.0    6,184 kPa     3,108 kN
  Vesić                         Nq* = 114.9   14,970 kPa     7,525 kN
  Janbu                          Nq* = 37.8    4,919 kPa     2,473 kN
  SPT — Meyerhof                               3,040 kPa     1,528 kN

ÇEVRE SÜRTÜNMESİ
  Tabaka                       Derinlik (m)      Qs (kN)
  Fill                            1.50–2.00         8 kN
  Soft clay                       2.00–8.00       357 kN
  Medium dense sand              8.00–15.00       437 kN
  Stiff clay                    15.00–20.00       939 kN
  Dense sand                    20.00–21.50       103 kN
  Kil yöntemine göre çevre sürtünmesi:
  α — API RP 2A *                  1,844 kN
  α — Kulhawy & Phoon              1,704 kN
  α — Sladen                       1,560 kN
  β — Burland                      1,962 kN
  λ — Vijayvergiya & Focht         1,776 kN
  SPT — Meyerhof                   1,815 kN

TEK KAZIĞIN TAŞIMA GÜCÜ
  Qs = 1,844 kN + Qb = 3,108 kN = Qult = 4,952 kN
  Kazık ağırlığı W = 158 kN (düşüldü: evet)
  Qult,net = 4,794 kN, GS = 2.50, Qall = 1,918 kN

KAZIK GRUBU
  Converse–Labarre *              η = 0.727
  Los Angeles Group               η = 0.792
  Seiler–Keeney                   η = 0.887
  Feld                            η = 0.722
  η = 1                           η = 1.000
  η = 0.727: η·n·Qult = 0.727 · 9 · Qult = 32,396 kN
  Blok 5.60 × 5.60 m: çevre 26,227 kN + taban 193,925 kN = 220,151 kN
  Qg,ult = 32,396 kN (verim), Qg,ult − n·W = 30,978 kN, Qg,all = 12,391 kN

OTURMA
  Tek kazık (Vesić): s1 = 1.20 + s2 = 12.27 + s3 = 0.74 = 14.20 mm
  Eşdeğer radye 14.84 m'de, q = 318.9 kPa: konsolidasyon 19.6 + elastik 12.2 + kazık kısalması 1.0 = 32.8 mm
  Vesić: s·√(Bg/D) = s·√(5.60/0.80) = 37.6 mm
  Meyerhof SPT: N60 = 40, I = 0.55, q = 318.9 kPa, sg = 10.0 mm

KONTROLLER
  Tek kazık: GS = 4.31 (gerekli 2.50) — UYGUN
  Grup: GS = 3.10 (gerekli 2.50) — UYGUN
  Oturma: 32.8 mm (izin verilen 40.0 mm) — UYGUN

  Gerekli boy: L = 18.50 m (uç 20.00 m'de)

Uyarılar
  • Uçta Meyerhof sınırı belirleyici: qb = 0.5·pa·Nq*·tan φ' = 6,184 kPa.
  • Meyerhof SPT kuralı çakma kazıklar için türetilmiştir; fore kazıkta yalnızca karşılaştırma için gösterilir.
  • Kritik derinlik zc = 12.00 m altında kumdaki çevre sürtünmesi ve uç direnci derinlikle artmaz.
  • Eşdeğer radye altındaki gerilmeler profilin tabanında (32.00 m) hâlâ önemli; daha derindeki tabakalar da oturur.
```

<div class="result">
<div><small>Q<sub>ult,net</sub></small><strong>4 794 kN</strong></div>
<div class="ok"><small>Tek kazık GS</small><strong>4.31</strong></div>
<div class="ok"><small>Grup GS</small><strong>3.10</strong></div>
<div class="ok"><small>Grup oturması</small><strong>32.8 mm</strong></div>
<div><small>Gerekli boy</small><strong>18.5 m</strong></div>
</div>

**Okuma notları.** Uç yöntemleri arasında üç kattan fazla fark vardır (Janbu 2 473 kN – Vesić 7 525 kN); Meyerhof’un sınır değeri belirleyicidir. Grupta verim (0.727) blok göçmesinden çok daha kritiktir. **Uyarılar** bölümü programın en değerli çıktılarından biridir: her varsayımın nerede zorlandığını söyler.

## 2. Boy taraması

```python
from lythospile import forms
from lythospile.web.session import Session

session = Session(lang="en")
values = forms.defaults()              # 3 × 3 bored group, D = 0.8 m, Q = 10 000 kN

for L in (16.0, 18.0, 20.0, 22.0):
    values["L"] = L
    r = session.analyse(values)
    print(f"L = {L:4.1f} m   Qult,net = {r['Q_ult_net']:7.0f} kN   FS = {r['FS']:.2f}")
```

```text
L = 16.0 m   Qult,net =    1671 kN   FS = 1.50
L = 18.0 m   Qult,net =    2041 kN   FS = 1.84
L = 20.0 m   Qult,net =    4794 kN   FS = 4.31
L = 22.0 m   Qult,net =    4917 kN   FS = 4.43
```

Kazık başı 1.5 m’de olduğu için L = 18.5 m’de uç 20 m’ye, yani **sıkı kuma** ulaşır; kapasite orada sıçrar. Gerekli boy (`r["required_length"]` = 18.5 m) bu sıçramayı bulan aramanın sonucudur — kapasite–boy eğrisi bu yüzden basamaklıdır.

## 3. Grup verimi yöntemleri

`efficiency` alanı grup kapasitesinde hangi verimin kullanılacağını seçer: `converse_labarre`, `los_angeles`, `seiler_keeney`, `feld` veya `unity` (η = 1, grup n tekil kazık). Rapor her zaman hepsini listeler; seçilen yıldızla işaretlenir. Aralığı 2.4 m’den (3D) daha sık yapmak verimleri düşürür ve blok göçmesini öne çıkarır — bir **çalışma** ile `sx`, `sy` taranabilir.

## 4. Kaya soketi

Başlangıç projesi bir kaya soketi de içerir: D = 1.0 m, baş 1 m’de, kaya 12 m’de, soket 4 m, Q = 9 000 kN, q<sub>u</sub> = 20 MPa.

```bash
lythos-pile socket grup.pile
```

```text
ROCK-SOCKETED PILE
------------------------------------------------------------------------------------
D = 1.00 m, head at 1.00 m, rock at 12.00 m (overburden 11.00 m), socket Ls = 4.00 m, Q = 9,000 kN
qu = 20.0 MPa (side shear with 20.0 MPa, f'c = 30.0 MPa), Em = 5,940 MPa, Em/Ei = 0.297, αE = 0.698
Hoek–Brown: GSI = 60, mi = 10.0, mb = 2.397, s = 1.17e-02

UNIT SIDE SHEAR AND SOCKET LENGTH
  Correlation                                fs (kPa)    Ls needed (m)  Qall at Ls (kN)
  Rosenberg & Journeaux (1976)                  1,754             2.67           11,922
  Horvath & Kenney (1979)                         939             5.01            7,826
  Meigh & Wolski (1979)                         1,328             3.53            9,778
  Williams et al. (1980)                        1,294             3.62            9,608
  Reynolds & Kaderabek (1980) †                 6,000             0.78           33,264
  Gupton & Logan (1984) †                       4,000             1.17           23,211
  Rowe & Armitage (1987)                        2,012             2.32           13,221
  Carter & Kulhawy (1988)                         894             5.26            7,601
  Toh et al. (1989) †                           5,000             0.93           28,238
  Zhang & Einstein (1998)                       1,789             2.62           12,097
  O'Neill & Reese (1999) / AASHTO                 646             7.32            6,350
  Kulhawy et al. (2005)                         1,424             3.29           10,260
  9 correlations in range: mean 1,342, median 1,328, 646 – 2,012 kPa
  † fitted to weak rock; out of range above qu = 5.0 MPa

UNIT BASE RESISTANCE
  Coates (1967)                                             3·qu               60.00 MPa
  Rowe & Armitage (1987)                                  2.7·qu               54.00 MPa
  Carter & Kulhawy (1988), Hoek–Brown       [√s + √(m√s + s)]·qu               12.59 MPa
  Zhang & Einstein (1998)                           4.83·qu^0.51               22.26 MPa
  AASHTO / O'Neill & Reese                                2.5·qu               50.00 MPa
  CFEM (Ladanyi & Roy)                                3·Ksp·d·qu               45.85 MPa

DESIGN
  fs = 1,342 kPa, qb = 12.59 MPa, FSside = 2.50, FSbase = 3.00
  Socket length needed 3.49 m, minimum 1.00 m → design Ls = 3.49 m
  At Ls = 4.00 m: Qs = 16,866, Qb = 9,886, W = 191, Qall = 9,851 kN against Q = 9,000 kN (Q/Qall = 0.91) — OK

ELASTIC SETTLEMENT AT Ls = 4.00 m
  Shortening through the overburden: 4.20 mm
  Randolph & Wroth, side and base: 5.00 mm (10 % through the base)
  Randolph & Wroth, side only: 5.03 mm
  Vesić: 6.01 mm
```

<div class="result">
<div><small>Tasarım f<sub>s</sub> (ortalama)</small><strong>1 342 kPa</strong></div>
<div><small>Tasarım q<sub>b</sub> (en küçük)</small><strong>12.6 MPa</strong></div>
<div><small>Gerekli soket</small><strong>3.49 m</strong></div>
<div class="ok"><small>Q/Q<sub>all</sub> (L<sub>s</sub> = 4 m)</small><strong>0.91</strong></div>
</div>

**Okuma notları.** On iki korelasyon, aynı kaya için 646 ile 6 000 kPa arasında yan sürtünme verir. Zayıf kaya için türetilmiş üçü (†) q<sub>u</sub> = 5 MPa sınırının üzerinde istatistikten çıkarılır. Tasarım yan sürtünmesi kalan dokuzun **ortalamasıdır** (`design = "mean"`); uç için en küçüğü (`base_design = "min"`) kullanılır. Gerekli boylar 2.3–7.3 m arasında dağılır; hangi korelasyonun şartnamede istendiğini bilmek yine belirleyicidir.

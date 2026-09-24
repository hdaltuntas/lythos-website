# Lythos MSEW — örnekler

Bütün çıktılar gerçek çalıştırmalardır. Başlangıç projesi: **çelik şeritli, 6 m yüksekliğinde MSE duvar**.

| Girdi | Değer |
| --- | --- |
| Duvar | H = 6.0 m, gömülme 0.6 m, düşey yüz, yatay arka dolgu, yüz kalınlığı 0.14 m |
| Sürşarj | hareketli (trafik) 10 kPa |
| Zeminler | donatılı dolgu γ = 19, φ′ = 34°; tutulan dolgu γ = 18, φ′ = 30°; temel zemini γ = 18.5, φ′ = 30°, c′ = 5 kPa |
| Donatı | Strip 50×4 (b = 50 mm, t = 4 mm, F<sub>y</sub> = 450 MPa, S<sub>h</sub> = 0.5 m) |
| Yerleşim | ilk tabaka 0.375 m, S<sub>v</sub> = 0.75 m, L = 0.9·H ≥ 2.4 m → 8 tabaka, L = 5.4 m |
| Tasarım | ASD, tasarım ömrü 75 yıl, çinko 86 µm |

## 1. Başlangıç duvarı

```bash
lythos-msew example -o duvar.msew
lythos-msew run duvar.msew --lang tr
```

```text
DONATILI ZEMİN DUVAR SONUÇLARI
------------------------------------------------------------------------------------------------
Duvar: H = 6.00 m, d = 0.60 m, yüz eğimi ω = 0.0°, arka şev β = 0.0°, L = 5.40 m (8 tabaka)
Tasarım yöntemi: ASD — güvenlik sayıları (FHWA-NHI-00-043)
Ka arka dolgu = 0.3333 (δ = β), Ka donatılı dolgu = 0.2827, θ = 90.0°
Metre başına kuvvetler: ΣV = 615.6 kN, ΣH = 128.0 kN, M_R = 1662.1 kNm, M_O = 276.0 kNm, e = 0.448 m

Dış duraylılık (GS)
                                   değer     gerekli
  Kayma                             2.99        1.50   UYGUN
  Devrilme                          6.02        2.00   UYGUN
  Dışmerkezlik e [m]               0.448       0.900   UYGUN
  Taşıma gücü                       7.51        2.50   UYGUN
  kayma temel zemini üzerinde

Temel zemininin taşıma gücü
  B' = L − 2e = 4.576 m, σv = ΣV / B' = 146.3 kPa, q_ult = 1098.9 kPa (Vesić (1973))
  Yöntem                             Nc           Nq           Nγ    q_ult kPa     q_em kPa           GS
  Vesić (1973) *                  30.14        18.40        22.40      1,098.9        439.5         7.51
  Meyerhof (1963)                 30.14        18.40        15.67        813.8        325.5         5.56
  Brinch Hansen (1970)            30.14        18.40        15.07        788.5        315.4         5.39
  Terzaghi (1943)                 37.16        22.46        20.12      1,037.2        414.9         7.09
  EN 1997-1 Ek D                  30.14        18.40        20.09      1,001.1        400.5         6.84

İç duraylılık, tabaka tabaka (GS)
                                   değer     gerekli
  Çekme                             3.81        1.82   UYGUN
      Belirleyici tabaka: z = 0.375 m
  Sıyrılma                          1.62        1.50   UYGUN
      Belirleyici tabaka: z = 5.625 m
  Bağlantı                          3.81        1.82   UYGUN
      Belirleyici tabaka: z = 0.375 m
  Tabaka boyunca kayma              3.42        1.50   UYGUN
      Belirleyici tabaka: z = 0.375 m

          z m        tür        L m       Sv m         Kr     σv kPa  Tmax kN/m  T_al kN/m       La m       Le m         F*    Pr kN/m      çekme   sıyrılma
        0.375 Strip 50x4       5.40      0.750      0.348      116.9      30.51      116.3       0.22       5.18      0.757       83.8       3.81       2.75
        1.125 Strip 50x4       5.40      0.750      0.366      102.6      28.15      116.3       0.67       4.73      0.923       80.8       4.13       2.87
        1.875 Strip 50x4       5.40      0.750      0.383       88.4      25.41      116.3       1.12       4.28      1.089       73.0       4.58       2.87
        2.625 Strip 50x4       5.40      0.750      0.401       74.1      22.30      116.3       1.57       3.83      1.254       61.5       5.21       2.76
        3.375 Strip 50x4       5.40      0.750      0.419       59.9      18.81      116.3       1.80       3.60      1.420       51.0       6.18       2.71
        4.125 Strip 50x4       5.40      0.750      0.436       45.6      14.93      116.3       1.80       3.60      1.586       40.7       7.79       2.72
        4.875 Strip 50x4       5.40      0.750      0.454       31.4      10.69      116.3       1.80       3.60      1.751       27.0      10.88       2.52
        5.625 Strip 50x4       5.40      0.750      0.472       17.1       6.06      116.3       1.80       3.60      1.917        9.8      19.19       1.62

  Gerekli eşit boy: L = 5.13 m (FHWA en küçüğü 4.20 m)
```

<div class="result">
<div class="ok"><small>Kayma</small><strong>2.99</strong></div>
<div class="ok"><small>Devrilme</small><strong>6.02</strong></div>
<div class="ok"><small>Taşıma gücü</small><strong>7.51</strong></div>
<div class="ok"><small>Sıyrılma (en üst tabaka)</small><strong>1.62</strong></div>
<div><small>Gerekli boy</small><strong>5.13 m</strong></div>
</div>

**Okuma notları.** z, tabakanın tesviye tabanından yüksekliğidir; z = 0.375 m en alt, z = 5.625 m en üst tabakadır. Tablo iki şeyi açıkça gösterir: **çekme** altta belirleyicidir (σ<sub>v</sub> en büyük), **sıyrılma** üstte (örtü gerilmesi en küçük; F* yukarı doğru 2.0’a yaklaşsa da). Çekmede gerekli GS 1.82’dir çünkü çelik için izin verilen gerilme 0.55·F<sub>y</sub>’dir (1/0.55 = 1.82). T<sub>al</sub> = 116.3 kN/m, 75 yıllık korozyondan sonra kalan kesitten hesaplanır.

## 2. Donatı türünü değiştirmek

Aynı duvar, aynı yerleşim, üç farklı donatı:

```python
from lythosmsew import forms
from lythosmsew.web.session import Session

session = Session(lang="en")
for kind in ("Strip 50x4", "Geogrid 80", "Geotextile 60"):
    values = forms.defaults()
    values["layout_type"] = kind
    values["layers"] = session.generate(values)["layers"]   # yerleşim kuralını yeniden uygula
    r = session.analyse(values)
    print(f"{kind:14s} {r['headline']}")
```

```text
Strip 50x4     OK · Sliding FS = 2.99 · Bearing capacity FS = 7.51 · Pullout FS = 1.62 · L ≥ 5.13 m
Geogrid 80     NOT OK · Sliding FS = 2.60 · Bearing capacity FS = 7.51 · Pullout FS = 3.42 · L ≥ 4.20 m
Geotextile 60  NOT OK · Sliding FS = 2.60 · Bearing capacity FS = 7.51 · Pullout FS = 2.56 · L ≥ 4.40 m
```

Geosentetiklerde neyin başarısız olduğunu kartlar söyler:

```text
Geogrid 80     Connection        FS = 1.33 ≥ 1.50 · layer z = 0.375 m
Geotextile 60  Tensile strength  FS = 1.08 ≥ 1.50 · layer z = 0.375 m
               Connection        FS = 0.86 ≥ 1.50 · layer z = 0.375 m
```

Geosentetikler **sıyrılmada** çok daha iyidir (sürekli levha: R<sub>c</sub> = 1, oysa şeritlerde R<sub>c</sub> = b/S<sub>h</sub>), ama uzun süreli dayanımları T<sub>ult</sub>/(RF<sub>ID</sub>·RF<sub>CR</sub>·RF<sub>D</sub>) ile düşer ve **yüz bağlantısı** (CR = 0.8) en alt tabakada belirleyici olur. Kayma GS’si de 2.99’dan 2.60’a düşer: artık belirleyici olan, **en alttaki geosentetik boyunca kaymadır** (C<sub>ds</sub>·tan φ<sub>r</sub>). Çözüm: alt tabakalarda daha sık S<sub>v</sub> ya da daha güçlü bir ürün — donatı türü tablosu tabaka başına farklı tür kullanmaya izin verir.

## 3. Daha yüksek duvar ve deprem

```python
values = forms.defaults()
values.update(H=8.0, seismic_enabled=True, A=0.2)
values["layers"] = session.generate(values)["layers"]   # 8 m için yeniden yerleştir
r = session.analyse(values)
print(r["headline"])
```

```text
OK · Sliding FS = 3.05 · Bearing capacity FS = 7.49 · Pullout FS = 1.88 · L ≥ 6.71 m
10 layers, L = 7.2 m
```

Yerleşim kuralı (L = 0.9·H) 8 m için 10 tabaka ve 7.2 m boy verir. A = 0.2 ile deprem durumunda A<sub>m</sub> = (1.45 − 0.2)·0.2 = 0.25; P<sub>AE</sub> 0.6·H’de etkir ve iç ataletin payı L<sub>e</sub>’ye göre tabakalara dağıtılır. Sismik durumda ASD güvenlik sayıları statik değerlerin %75’idir (`seismic_ratio`).

## 4. Yükseklik çalışması

Aynı tasarım kuralını 3–12 m arasında çalıştırın:

```bash
lythos-msew heights duvar.msew -o yukseklik.xlsx
```

```text
HEIGHT STUDY
------------------------------------------------------------------------------------------------
19 heights from 3.00 to 12.00 m · ASD · rule: L = 0.90·H ≥ 2.40 m, Sv = 0.750 m, Strip 50x4
Every check holds for H = 6.00 – 12.00 m; the shaded heights fail.

           H m         L m      layers    L req. m     Sliding Overturning   Tensile     Pullout      status
          3.00        2.70           4        4.23        2.77        4.95      6.18        0.81      NOT OK
          4.00        3.60           5        4.66        2.87        5.43      4.97        1.04      NOT OK
          5.00        4.50           6        5.32        2.94        5.77      4.26        1.18      NOT OK
          5.50        4.95           7        5.11        2.96        5.91      4.01        1.43      NOT OK
          6.00        5.40           8        5.13        2.99        6.02      3.81        1.62          OK
          8.00        7.20          10        6.22        3.05        6.37      2.95        1.88          OK
         10.00        9.00          13        6.46        3.10        6.60      2.37        2.60          OK
         12.00       10.80          16        7.20        3.13        6.76      1.98        3.25          OK
```

Beklenmedik ama öğretici bir sonuç: **alçak duvarlar başarısız olur.** L = 0.9·H kuralı kısa duvarlarda çok kısa donatı verir; üst tabakaların aktif bölge ötesindeki boyu (L<sub>e</sub>) ve örtü gerilmesi sıyrılmaya yetmez. Alçak duvarlar için sabit bir en küçük boy (`layout_rule = "fixed"`) ya da daha büyük `layout_L_min` kullanılmalıdır.

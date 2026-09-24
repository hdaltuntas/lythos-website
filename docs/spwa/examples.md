# Lythos SPWA — örnekler

Bütün çıktılar gerçek çalıştırmalardır. Başlangıç projesi: **iki sıra ankrajlı rıhtım perdesi**.

| Girdi | Değer |
| --- | --- |
| Geometri | kazı yüksekliği H = 8 m, yatay dolgu ve deniz tabanı, duvar sürtünmesi δ = 20° |
| Yükler | sürşarj 15 kPa; su aktif tarafta 4 m, pasif tarafta 7 m derinlikte |
| Zemin | eğimli kumlu çakıl, γ = 19.5, γ<sub>doy</sub> = 21 kN/m³, φ′ = 38°, c = 0, k<sub>s</sub> = 30 000 kN/m³ |
| Ankrajlar | 1.5 m ve 4.0 m’de, 15° eğimli, EA = 117 000 kN, serbest boy 12 m, aralık 2.5 m |
| Kesit | NZ 26, S355 |
| Deprem | k<sub>h</sub> = 0.1, tutulan boşluk suyu, Westergaard açık |
| Güvenlik | GS<sub>φ</sub> = GS<sub>c</sub> = 1.25, eğilmede 1.5; deplasman FHWA H/120 |

## 1. Limit denge ve kiriş-yay

```bash
lythos-spwa example -o rihtim.spwa
lythos-spwa run rihtim.spwa --lang tr
```

```text
--- TASARIM SONUÇLARI ---
Seçilen Kesit: NZ 26 (S355)
------------------------------------------------------------
Teorik Gerekli Gömülme Derinliği (D_req): 4.64 m
Tasarım Gömülme Derinliği (D_design):     6.00 m
Toplam Duvar Uzunluğu (L_total):          14.00 m

--- ANKRAJ KUVVETLERİ ---
  Ankraj 1.50 m (15°): T_h = 39.2 kN/m | eksenel = 101.4 kN/ankraj | V = 10.5 kN/m
  Ankraj 4.00 m (15°): T_h = 292.4 kN/m | eksenel = 756.8 kN/ankraj | V = 78.4 kN/m
  NOT: Çok ankrajlı dağılım yaklaşıktır (serbest zemin desteği yöntemi tek ankraj için kesindir).

--- SONUÇLARIN ÖZETİ ---
(Diyagramlar H + D_req = H + 4.64 m boyunca hesaplanmıştır; D_design imal edilecek boydur.)
Denge kontrolü: M(uç) = -97.93 kNm/m (~0 olmalı)
Net Basınç:        Min=-134.62, Maks=90.16 kPa
Kesme Kuvveti:     Min=-258.00, Maks=151.63 kN/m
Eğilme Momenti:    Min=-559.61, Maks=13.81 kNm/m
Dönme:             Min=-0.0119, Maks=0.0129 rad
Deplasman (mm):    Min=-51.49, Maks=34.07 mm

--- GERİLME KONTROLÜ ---
Maksimum Mutlak Moment: 559.61 kNm/m
Oluşan Gerilme (σ_actual):   214.6 MPa
İzin Verilen Gerilme (f_allowable): 236.7 MPa
DURUM: OK

--- DEPLASMAN KONTROLÜ (FHWA (H/120)) ---
Oluşan Maks. Deplasman (Δ_actual):   51.5 mm
İzin Verilen Deplasman (Δ_allowable): 66.7 mm
DURUM: OK

--- DÜŞEY DENGE (gösterge) ---
Ankrajların düşey bileşeni ΣV: 88.8 kN/m
Gömülü boyda çevre sürtünmesi (iki yüz): 461.5 kN/m
DURUM: OK

--- KİRİŞ-YAY (WINKLER) ANALİZİ ---
Kullanılan gömülme: D = 6.00 m (L = 14.00 m); 5 aşama, 19 Newton iterasyonu
  Kullanılan yatak katsayıları:
    Sloped Sandy Gravel: kₛ = 30,000 kN/m³ (Elle)
  1. 2.00 m'ye kazı: w_maks = 3.6 mm
  2. 1.50 m'de ankraj montajı
  3. 4.50 m'ye kazı: w_maks = 17.9 mm, T(1.5 m)=44
  4. 4.00 m'de ankraj montajı
  5. 8.00 m'ye kazı: w_maks = 73.3 mm, T(1.5 m)=103, T(4.0 m)=208

  Ankraj 1.50 m (15°): T_h = 103.1 kN/m | eksenel = 266.7 kN/ankraj | V = 27.6 kN/m
  Ankraj 4.00 m (15°): T_h = 207.7 kN/m | eksenel = 537.6 kN/ankraj | V = 55.7 kN/m
Maksimum Mutlak Moment: 564.58 kNm/m   (LE: 559.61)
Oluşan Gerilme (σ_actual):   216.5 MPa
DURUM: OK
Maks. Deplasman: 73.3 mm   (LE: 51.5)
DURUM: NOT OK - DEFLECTION EXCEEDED!
Ankrajların düşey bileşeni ΣV: 83.3 kN/m
Gömülü boyda çevre sürtünmesi (iki yüz): 461.5 kN/m
DURUM: OK
Mobilize pasif direnç: 79%   |   arka yüzün aktif sınıra ulaşan kısmı: yüksekliğin 96%'i
```

<div class="result">
<div><small>D<sub>design</sub></small><strong>6.00 m</strong></div>
<div class="ok"><small>Maks. moment (LE / KY)</small><strong>560 / 565</strong></div>
<div class="bad"><small>Deplasman (KY), sınır 66.7</small><strong>73.3 mm</strong></div>
<div><small>Ankrajlar (KY), T<sub>h</sub></small><strong>103 / 208</strong></div>
</div>

### Neden iki analiz?

- **Momentler neredeyse aynı** (559.6 ve 564.6 kNm/m) — kesit seçimi için limit denge yeterli.
- **Ankraj kuvvetleri çok farklı dağılır.** LE üst ankraja yalnızca 39 kN/m, alttakine 292 kN/m verir; aşamalı analizde üst ankraj 1. kazı aşamasından itibaren yük toplar ve 103 kN/m’ye çıkar. Program LE’nin çok ankrajlı dağılımının yaklaşık olduğunu kendisi söyler.
- **Deplasman sınırı yalnızca aşamalı analizde aşılır** (73.3 > 66.7 mm): perde, ikinci ankraj takılmadan önce 4.5 m’ye kadar kazılırken şekil değiştirir ve bu deplasman geri gelmez.

Çözüm seçenekleri: daha rijit bir kesit, ankrajlara ön germe (`prestress`), ya da daha küçük fazla kazı (`bs_overdig`, varsayılan 0.5 m).

## 2. Deprem katsayısının gömülmeye etkisi

```python
from lythosspwa import forms
from lythosspwa.web.session import Session

session = Session(lang="en")
values = forms.defaults()              # 8 m quay wall, two anchors, NZ 26

for kh in (0.0, 0.1, 0.2):
    values["kh"] = kh
    values["is_seismic"] = kh > 0
    r = session.analyse(values)
    print(f"kh = {kh:.1f}   D_req = {r['d_required']:.2f} m   "
          f"D_design = {r['d_design']:.2f} m   L = {r['length']:.2f} m")
```

```text
kh = 0.0   D_req = 3.59 m   D_design = 4.50 m   L = 12.50 m
kh = 0.1   D_req = 4.64 m   D_design = 6.00 m   L = 14.00 m
kh = 0.2   D_req = 6.92 m   D_design = 8.50 m   L = 16.50 m
```

Mononobe-Okabe K<sub>AE</sub> hızla artar, K<sub>PE</sub> düşer; üstelik su tablası altında atalet açısı γ<sub>doy</sub>/γ′ ile büyütülür ve perdenin önündeki 1 m’lik su Westergaard basıncı uygular. k<sub>h</sub> 0’dan 0.2’ye çıkınca perde boyu **4 m** uzar.

## 3. Güvenilirlik çalışması

Arayüzün **Çalışma** sekmesinde (ya da proje dosyasına `study_variables` ekleyerek) herhangi bir zemin, ankraj, geometri, yük, deprem veya katsayı girdisini aralık ya da dağılım (normal, lognormal, düzgün) olarak tanımlayın. Örnekleme birer birer, tam ızgara, Latin hiperküp veya Monte Carlo olabilir; API üzerinden korelasyonlu girdiler de desteklenir:

```python
Study(..., correlation={(a, b): rho})
```

Çalışma paralel çalışır (`study_workers`), ilerlemesi izlenebilir ve iptal edilebilir; sonuçlar CSV/XLSX’e aktarılır ve raporun 7. bölümü olur.

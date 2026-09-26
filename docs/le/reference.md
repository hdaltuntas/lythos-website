---
title: "Lythos LE başvuru — yöntemler, girdiler, doğrulama"
description: "Lythos LE başvuru kılavuzu: Model biçimi, Formülasyon, Komut satırı, Doğrulama, Sınırlar, Proje düzeni."
---

# Lythos LE — başvuru

## Model biçimi

Koordinatlar `[x, y]`, y kottur; herhangi tutarlı bir birim takımında (kN/m³ ve kPa, ya da pcf ve psf). Tam başvuru: [docs/model-format.md](https://github.com/hdaltuntas/lythosle/blob/main/docs/model-format.md).

```json
{
  "name": "Layered slope",
  "units": "metric",
  "profile": [[0, 0], [18, 0], [48, 15], [75, 15]],
  "materials": [
    {"name": "Fill",  "unit_weight": 18, "sat_unit_weight": 19.5,
     "cohesion": 5, "friction_angle": 26, "color": "#C4A883"},
    {"name": "Clay",  "unit_weight": 19, "strength_model": "undrained",
     "su": 40, "su_gradient": 1.5, "su_datum": 0}
  ],
  "layers": [
    {"material": "Fill"},
    {"material": "Clay", "boundary": [[0, -4], [75, 7]]}
  ],
  "water_table": [[0, -2], [30, 3.5], [75, 9.5]],
  "seismic": {"kh": 0.15, "kv": 0},
  "surcharges": [{"x1": 50, "x2": 70, "pressure": 20}],
  "supports": [{"name": "Nail 1", "x1": 14, "y1": 1.5,
                "x2": 28, "y2": -0.2, "capacity": 40}],
  "tension_crack": {"enabled": true, "depth": 3, "water_fill": 1.0}
}
```

- Tabakalar yukarıdan aşağı listelenir. İlki zemin yüzeyinden başlar; altındaki her biri kendi üst sınırını taşır. Sınırlar ve su tablası uç noktalarının ötesine yatay uzatılır.
- Şev her iki yöne bakabilir: çözücü modeli içeride aynalar (tepe sağda) ve her sonucu geri aynalar. İki yüzlü bir dolgunun seçilen yüzü için seçeneklerde `"direction": "left" | "right"`.

## Formülasyon

Her yöntem aynı dilim denklemleri üzerine kuruludur; tek fark hangi denge koşullarının sağlandığı ve dilimler arası kuvvetler hakkında ne varsayıldığıdır, `X = λ·f(x)·E`:

| Yöntem | Moment | Kuvvet | Dilimler arası kesme |
| --- | :-: | :-: | --- |
| Ordinary / Fellenius | ● | | tamamen yok sayılır |
| Bishop basitleştirilmiş | ● | | X = 0 |
| Janbu basitleştirilmiş / düzeltilmiş | | ● | X = 0 (düzeltilmiş Janbu f<sub>0</sub>’ı uygular) |
| Corps of Engineers #1 | | ● | giriş-çıkış kirişine paralel |
| Lowe-Karafiath | | ● | zemin ve taban eğiminin ortalaması |
| Spencer | ● | ● | sabit eğim, çözülür |
| Morgenstern-Price | ● | ● | f(x) şekli, λ çözülür |

Taban normal kuvveti her dilimin düşey dengesinden gelir:

```text
N = [ W (1 + kv) + (X_sağ − X_sol) − (c l − u l tan φ) sin(α) / F ] / m_α
m_α = cos(α) + sin(α) tan(φ) / F
```

Güvenlik sayısı dönme merkezi etrafında moment dengesinden ya da bütün kütlenin yatay kuvvet dengesinden bulunur. Spencer ve Morgenstern-Price, ikisi uyuşana kadar λ üzerinde yinelenir — arayüzdeki λ–GS grafiğinde görülen kesişim noktası.

İşaret kuralları, boşluk suyu, deprem, donatı, çekme çatlakları ve arama algoritmaları: [docs/theory.md](https://github.com/hdaltuntas/lythosle/blob/main/docs/theory.md).

## Komut satırı

| Komut | Ne yapar |
| --- | --- |
| `lythosle serve [--port 8000] [--open]` | tarayıcı arayüzü |
| `lythosle example [ad] [--optimize]` | örnekleri listeler ya da birini çalıştırır |
| `lythosle analyze model.json` | bir modeli analiz eder |
| `lythosle methods` | yöntem anahtarlarını listeler |

`analyze` seçenekleri: `--options`, `--method` (tekrarlanabilir; ilki aramayı yönetir), `--slices`, `--direction {auto,left,right}`, `--optimize`, `--json`, `--csv`, `--no-render`, `--fs-only`, `--quiet`.

Yöntem anahtarları: `ordinary`, `bishop`, `janbu`, `janbu_corrected`, `corps_engineers`, `lowe_karafiath`, `spencer`, `morgenstern_price`.

## Doğrulama

`tests/test_methods.py`, çözücüyü bu koddan gelmeyen sonuçlara karşı sınar:

| Kontrol | Referans | Sonuç |
| --- | --- | --- |
| φ = 0 zeminde dairesel yay | c L R / M’nin doğrudan integrali | kapalı formun 0.002 içinde; Ordinary, Bishop, Spencer ve M-P’de özdeş |
| Uzun düzlemsel yüzey | sonsuz şev, GS = tan φ′ / tan β | Bishop, Janbu, Spencer ve M-P için %1 içinde |
| φ = 0, β = 53–75° topuk daireleri | Taylor (1937) stabilite sayıları | %1.5 içinde |
| ACADS problem 1(a) | yayımlanmış GS = 1.00 | Bishop 0.985, Spencer 0.984 |
| Aynalanmış geometri | ters yöne çizilmiş aynı şev | özdeş GS ve λ |
| Dilim inceltme | 20’den 200 dilime | tekdüze yakınsar, 100 dilimden sonra < 0.002 değişim |

## Sınırlar

- Yalnızca iki boyutlu analiz, düzlem dışında birim genişlik başına.
- Dilim ağırlığı her dilimin orta ordinatını kullanır; güçlü eğrilikli sınırlar daha çok dilim ister (varsayılan 50 tipik kesitler için yeterli).
- Moment-yalnız yöntemler (Ordinary, Bishop) **dairesel olmayan** yüzeyde moment eksenine bağlıdır; sonuç bir uyarıyla raporlanır.
- F<sub>m</sub> ve F<sub>f</sub> hiç kesişmezse (donatı kuvvet dengesini tek başına sağlayacak kadar büyükse) Spencer ve Morgenstern-Price’ın çözümü yoktur; bu, bir sayı uydurulmadan “çözüm yok” olarak, iki değerle birlikte raporlanır.
- Donatı, kayma yüzeyiyle kesiştiği yerde bilinen bir kuvvet olarak uygulanır; ankraj boyundaki sıyrılma kapasitesi hesaplanmaz — tasarım kuvvetini girin.
- Negatif efektif normal kuvvetler sıfıra kırpılır; çok küçük m<sub>α</sub>’lı yüzeyler kötü koşullu olarak işaretlenir.
- Olasılıksal analiz, hızlı su düşümü, anizotropik dayanım ve 3B etkiler yoktur.

## Proje düzeni

```text
main.py          arayüzü ya da CLI’nın yaptığı her şeyi çalıştırır
lythosle/
  geometry.py    poligon ve çizgi yardımcıları
  materials.py   dayanım modelleri
  model.py       geometri, stratigrafi, su, yükleme, aynalama
  slices.py      kayma yüzeyleri ve kayan kütlenin dilimlenmesi
  methods.py     sekiz limit denge çözücüsü
  search.py      ızgara-teğet araması ve dairesel olmayan optimizasyon
  analysis.py    sürücü, raporlama ve çizim verisi
  examples.py    altı çözümlü örnek
  cli.py         komut satırı
  web/           API, standart kütüphane sunucusu, isteğe bağlı FastAPI, ön yüz
tests/           70 test, ~60 s
```

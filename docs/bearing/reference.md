---
title: "Lythos Bearing başvuru — yöntemler, girdiler, doğrulama"
description: "Lythos Bearing başvuru kılavuzu: Genel denklem, Girdiler, Hesaplananlar, Kontroller ve EN 1997-1, Proje dosyası (.bearing), Modüller, Doğrulama, Sınırlar."
---

# Lythos Bearing — başvuru

## Genel denklem

```text
q_ult = c·Nc·sc·dc·ic·bc·gc·Fc  +  q·Nq·sq·dq·iq·bq·gq·Fq  +  ½·γ·B′·Nγ·sγ·dγ·iγ·bγ·gγ·Fγ
```

s, d, i, b, g ve F sırasıyla şekil, derinlik, yük eğimi, taban eğimi, arazi eğimi ve sıkışabilirlik düzeltmeleridir. Her yöntem kendi katsayılarını ve kendi düzeltmelerini getirir; yöntemin tanımlamadığı bir düzeltme 1 alınır ve 1 olarak raporlanır.

| Yöntem | N<sub>q</sub> | N<sub>c</sub> | N<sub>γ</sub> | Düzeltmeler |
| --- | --- | --- | --- | --- |
| Terzaghi (1943) | e<sup>(3π/2 − φ)tan φ</sup> / (2 cos²(45 + φ/2)) | (N<sub>q</sub> − 1)cot φ; φ = 0’da 5.7 | Bowles uyarlaması 2(N<sub>q</sub> + 1)tan φ / (1 + 0.4 sin 4φ) | yalnız şekil |
| Meyerhof (1963) | e<sup>π tan φ</sup>·tan²(45 + φ/2) | (N<sub>q</sub> − 1)cot φ; φ = 0’da π + 2 | (N<sub>q</sub> − 1)tan(1.4φ) | s, d, i |
| Brinch Hansen (1970) | Meyerhof gibi | Meyerhof gibi | 1.5(N<sub>q</sub> − 1)tan φ | s, d, i, b, g |
| Vesić (1973) | Meyerhof gibi | Meyerhof gibi | 2(N<sub>q</sub> + 1)tan φ | s, d, i, b, g, F |
| EN 1997-1 Ek D | Meyerhof gibi | Meyerhof gibi | 2(N<sub>q</sub> − 1)tan φ | s, i, b (istenirse d, g) |
| Skempton (1951) | — | 5(1 + 0.2B/L)(1 + 0.2D/B) ≤ 7.5(1 + 0.2B/L) | — | N<sub>c</sub> içinde |

## Girdiler

| Grup | Alanlar |
| --- | --- |
| **Temel** | şekil (dikdörtgen, kare, şerit, daire), B (dairede çap), L, derinlik D<sub>f</sub>, taban eğimi η, arazi eğimi β |
| **Tabandaki etkiler** | V, B ve L doğrultusunda yatay yükler, iki eksen etrafında momentler, etkilerin değişken payı (Eurocode kısmi katsayıları için) |
| **Yeraltı suyu** | su tablası derinliği, γ<sub>w</sub> |
| **Zemin profili** | yüzeyden aşağı, tabaka başına bir satır: kalınlık, granüler / kohezyonlu, γ, γ<sub>doy</sub>, c′, φ′, c<sub>u</sub>, E, ν |
| **Yöntem** | katsayı takımı; drenajlı / drenajsız / belirleyici; genel veya yerel kayma; her düzeltme ve etkin alan açık/kapalı |
| **Tabakalı zemin** | göçme bölgesinde ortalama (derinlik katsayısıyla) ya da iki tabaka zımbalama (K<sub>s</sub>, c<sub>a</sub>/c<sub>1</sub>) veya yük yayılması (açı) |
| **Deprem** | k<sub>h</sub>, k<sub>v</sub>, zemin ataleti açık/kapalı |
| **Arazi deneyi** | SPT N<sub>60</sub>, CPT q<sub>c</sub> ya da presiyometre p<sub>l</sub>, p<sub>0</sub> ve zemin sınıfı; SPT/CPT kuralları için izin verilen oturma |
| **Kaya** | σ<sub>ci</sub>, GSI, m<sub>i</sub>, D ve kaya kütlesi birim hacim ağırlığı; ya da süreksizlik aralığı ve açıklığı |
| **Doğrulama** | güvenlik sayısı ya da EN 1997-1 DA1 / DA2 / DA3; kaymada gerekli GS; izin verilen dışmerkezlik; taban sürtünmesi δ/φ′ |

## Hesaplananlar

| Büyüklük | Yöntem |
| --- | --- |
| N<sub>c</sub>, N<sub>q</sub>, N<sub>γ</sub> | Terzaghi, Meyerhof, Hansen, Vesić, EN 1997-1 Ek D; Skempton drenajsız N<sub>c</sub> |
| Şekil, derinlik, eğim katsayıları | her yöntemin kendisininki; EN 1997-1 istenirse Hansen’in derinlik katsayılarını ödünç alır |
| Taban eğimi, arazi eğimi | Hansen, Vesić, EN 1997-1 (taban) |
| Sıkışabilirlik | Vesić rijitlik indeksi I<sub>r</sub> ile I<sub>r,cr</sub> karşılaştırması |
| Drenajsız, Hansen | toplamsal 5.14·c<sub>u</sub>·(1 + s′<sub>c</sub> + d′<sub>c</sub> − i′<sub>c</sub> − b′<sub>c</sub> − g′<sub>c</sub>) + q |
| Dışmerkezlik | Meyerhof etkin alanı; daire için Vesić eşdeğer dikdörtgeni |
| Taban basıncı | orta üçte birde trapez, dışında üçgen |
| Tabakalı profil | Prandtl bölgesinde ortalanan dayanım, (B′/2)·cos φ/cos(45 + φ/2)·e<sup>(π/4 + φ/2)tan φ</sup> |
| Zayıf üzerinde sağlam tabaka | Meyerhof & Hanna zımbalama; zayıf tabakaya yük yayılması |
| Deprem | k<sub>h</sub>·V yatay yüke eklenir, V(1 − k<sub>v</sub>); Paolucci & Pecker (1 − k<sub>h</sub>/tan φ)<sup>0.35</sup> |
| SPT / CPT / PMT | Meyerhof (Bowles düzeltmesiyle), Meyerhof, Ménard |
| Kaya | Hoek–Brown 2002 eşdeğer c′, φ′; CFEM K<sub>sp</sub> |
| Kontroller | net kapasitede GS; kayma; e/B; EN 1997-1 DA1 / DA2 / DA3 |
| Gerekli genişlik | kontrol sağlanana dek B üzerinde ikiye bölme; dikdörtgen L/B oranını korur |

## Kontroller ve EN 1997-1

- **Taşıma:** GS = q<sub>net,ult</sub> / q<sub>net</sub>, q<sub>net</sub> = V/A′ − q; q<sub>all</sub> = q<sub>net,ult</sub>/GS + q.
- **Kayma:** R = V·tan δ + A′·c<sub>a</sub> (drenajlı), R = A′·c<sub>u</sub> (drenajsız); GS = R/H.
- **Dışmerkezlik:** e/B, seçilen sınıra karşı (varsayılan B/6).
- **EN 1997-1 Ek A önerilen değerleri:**

| Takım | γ<sub>G</sub> | γ<sub>Q</sub> | γ<sub>φ′</sub> | γ<sub>c′</sub> | γ<sub>cu</sub> | γ<sub>R;v</sub> | γ<sub>R;h</sub> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | 1.35 | 1.50 | | | | | |
| A2 | 1.00 | 1.30 | | | | | |
| M1 | | | 1.00 | 1.00 | 1.00 | | |
| M2 | | | 1.25 | 1.25 | 1.40 | | |
| R1 / R2 / R3 | | | | | | 1.0 / 1.4 / 1.0 | 1.0 / 1.1 / 1.0 |

DA1, A1+M1+R1 ve A2+M2+R1’i; DA2, A1+M1+R2’yi; DA3, A1+M2+R3’ü kontrol eder.

## Proje dosyası (`.bearing`)

JSON. **Kaydet** girdileri ve çalışma tanımını yazar; **Aç…** geri okur. Eksik alanlar varsayılanlarını alır. Anahtarlar `forms.defaults()` ile aynıdır:

```json
{
  "shape": "rectangle", "B": 2.5, "L": 4.0, "Df": 1.5,
  "V": 1700.0, "Hb": 150.0, "Mb": 300.0,
  "water_depth": 2.0, "method": "vesic", "analysis": "both",
  "approach": "fs", "FS": 3.0,
  "soil_profile": [
    {"name": "Fill", "thickness": 1.5, "behaviour": "granular", "gamma": 18.0,
     "gamma_sat": 19.5, "c": 0.0, "phi": 30.0, "cu": 0.0, "E": 15.0, "nu": 0.3}
  ]
}
```

## Modüller

| Dosya | İçerik |
| --- | --- |
| `factors.py` | Taşıma gücü katsayıları ve bütün düzeltmeler, yönteme göre |
| `capacity.py` | Genel denklem, etkin alan, taban basıncı, göçme bölgesi, kayma |
| `layered.py` | İki tabaka zımbalama ve yük yayılması |
| `seismic.py` | Psödo-statik yükler ve zemin ataleti katsayıları |
| `insitu.py`, `rock.py` | SPT / CPT / presiyometre kuralları; Hoek–Brown ve K<sub>sp</sub> |
| `engine.py` | Analiz: profil, bölge üzerinde dayanım, bütün yöntemler, kontroller, Eurocode, genişlik |
| `study.py`, `study_plots.py` | Parametrik ve güvenilirlik çalışmaları |
| `report.py`, `pdf.py` | Hesap raporu: tek HTML derlemesi, PDF / HTML / DOCX |
| `web/` | Yerel HTTP sunucusu, oturum ve tarayıcı arayüzü |

## Doğrulama

Testler katsayıları yayımlanmış tablolara, denklemi el hesaplarına (Prandtl’ın 5.14·c<sub>u</sub>’su, terim terim bir Vesić kare temeli, taban basıncı trapezi ve üçgeni), her yardımcı yöntemi kendi ifadesine, motorun kontrollerini ve reddettiği girdileri, raporu üç biçimde ve arayüzü (oturum ve HTTP katmanı) sınar.

```bash
pip install -e ".[dev]"
pytest -q
```

## Sınırlar

- Sığ temeller: denklemler D/B ≈ 2–4’ün çok ötesinde anlamını yitirir.
- Göçme bölgesinde ortalama, tabakalı profil için bir basitleştirmedir; sınırlı kalınlıkta sağlam bir tabaka zayıf bir tabakanın üzerindeyse iki tabaka kontrolünü kullanın.
- SPT/CPT kuralları dışında oturma kontrol edilmez — bunun için [Lythos Settle](/settle/).
- Terzaghi’nin N<sub>γ</sub>’sı bir uyarlamadır (φ′ = 20°’de tablolardan ~%10 düşük); K<sub>s</sub> varsayılan olarak tutucu bir tahmindir; kaya yöntemleri ampiriktir. Her biri kullanıldığı yerde işaretlenir.

Ayrıntılı türetmeler ve kaynaklar: [docs/theory.md](https://github.com/hdaltuntas/lythos-bearing/blob/main/docs/theory.md).

---
title: "Lythos Settle başvuru — yöntemler, girdiler, doğrulama"
description: "Lythos Settle başvuru kılavuzu: Girdiler, Hesaplananlar, Hesap noktaları, Proje dosyası (.settle), Modüller, Doğrulama, Sınırlar."
---

# Lythos Settle — başvuru

## Girdiler

| Grup | Alanlar |
| --- | --- |
| **Temel** | şekil (dikdörtgen, şerit, daire), B (dairede çap), L, derinlik D<sub>f</sub>, brüt taban basıncı q; isteğe bağlı olarak kazılan örtü düşülür (q<sub>net</sub> = q − σ<sub>v0</sub>(D<sub>f</sub>)) |
| **Dolgu** (şekil “embankment”) | tepe genişliği, yükseklik H, sol ve sağ şev açıları, dolgu birim hacim ağırlığı γ; yük tepe altında γ·H, topuklara doğru doğrusal azalır |
| **Yeraltı suyu** | su tablası derinliği, γ<sub>w</sub> |
| **Zemin profili** | yüzeyden aşağı: kalınlık, granüler / kohezyonlu, γ, γ<sub>doy</sub>, E, ν; killer için C<sub>c</sub>, C<sub>r</sub>, e<sub>0</sub>, OCR, c<sub>v</sub>, C<sub>α</sub> ve tek / çift drenaj. E, kumda drenajlı, kilde drenajsız modüldür |
| **Seçenekler** | gerilme dağılımı, ani oturma yöntemi, esnek / rijit temel, alt tabaka kalınlığı, etki derinliği oranı Δσ/σ′<sub>v0</sub>, tasarım ömrü, Schmertmann krip katsayısı |
| **Ölçütler** | izin verilen toplam oturma ve açısal distorsiyon (1/x) |

## Hesaplananlar

| Büyüklük | Yöntem |
| --- | --- |
| Dikdörtgen altında Δσ | Newmark’ın Boussinesq integrali, herhangi bir nokta için süperpozisyon |
| Şerit / daire altında Δσ | kapalı form / kutup açısı üzerinde kesin tek boyutlu integral |
| Dolgu altında Δσ | kesin: Flamant çizgi yükünün parçalı doğrusal (trapez) yük üzerinde integrali |
| Yaklaşık Δσ | 2:1 yayılma |
| Dolgu, ani | düzlem şekil değiştirmede Steinbrenner; tepe bir şerit, her şev 16 dilim |
| Ani oturma | her tabakada Steinbrenner F<sub>1</sub>, F<sub>2</sub> (tabakalı elastik) ya da C<sub>1</sub>, C<sub>2</sub> ve L/B’ye göre enterpole edilen etki diyagramıyla Schmertmann (1978) |
| Birincil konsolidasyon | σ′<sub>p</sub> = OCR·σ′<sub>v0</sub>’a kadar C<sub>r</sub>, ötesinde C<sub>c</sub>; her noktada alt tabaka alt tabaka |
| İkincil sıkışma | C<sub>α</sub>/(1+e<sub>0</sub>)·H·log(t/t<sub>p</sub>), U = %95’ten tasarım ömrüne; aşırı konsolide kalan kilde C<sub>α</sub>·C<sub>r</sub>/C<sub>c</sub> |
| Zaman | tabaka başına Terzaghi U(T<sub>v</sub>), H<sub>dr</sub> = H/2 veya H |
| Rijit temel | karakteristik noktanın oturması (0.74·B/2, 0.74·L/2; 0.845·R) |
| Açısal distorsiyon | (s<sub>merkez</sub> − s<sub>kenar</sub>) / (B/2) |

## Hesap noktaları

| Temel | Noktalar |
| --- | --- |
| Dikdörtgen, şerit, daire | merkez · karakteristik nokta · uzun kenar ortası · köşe |
| Dolgu | tepe merkezi · tepe kenarı · şev ortası · topuk |

## Proje dosyası (`.settle`)

JSON. **Kaydet** girdileri ve çalışma tanımını yazar; eksik alanlar varsayılanlarını alır.

```json
{
  "shape": "rectangle", "B": 8.0, "L": 16.0, "Df": 1.5, "q": 100.0,
  "net_pressure": true, "water_depth": 2.0,
  "stress_method": "boussinesq", "immediate_method": "elastic", "rigidity": "flexible",
  "design_life": 50.0, "s_allow": 150.0, "distortion_allow": 500.0,
  "soil_profile": [
    {"name": "Soft clay", "thickness": 6.0, "behaviour": "cohesive", "gamma": 17.0,
     "gamma_sat": 17.5, "E": 6.0, "nu": 0.5, "Cc": 0.32, "Cr": 0.05, "e0": 1.05,
     "OCR": 1.3, "cv": 1.5, "Calpha": 0.01, "drainage": "double"}
  ]
}
```

Seçenek değerleri: `stress_method` ∈ {`boussinesq`, `two_to_one`}, `immediate_method` ∈ {`elastic`, `schmertmann`}, `rigidity` ∈ {`flexible`, `rigid`}, `shape` ∈ {`rectangle`, `strip`, `circle`, `embankment`}.

## Modüller

| Dosya | İçerik |
| --- | --- |
| `stress.py` | Boussinesq (dikdörtgen, şerit, daire), 2:1, Steinbrenner |
| `consolidation.py` | Terzaghi U(T<sub>v</sub>) ve tersi, kilin sıkışması, ikincil sıkışma |
| `engine.py` | Oturma analizi: profil, alt tabakalar, noktalar, kontroller, zaman eğrisi |
| `study.py`, `study_plots.py` | Parametrik (birer birer) ve güvenilirlik (LHS / Monte Carlo) çalışmaları, aşılma olasılığı, Spearman duyarlılıkları, CSV / XLSX |
| `plotting.py`, `render.py` | Temaya duyarlı Matplotlib şekilleri |
| `report.py`, `pdf.py` | PDF (ReportLab), HTML veya DOCX hesap raporu |
| `forms.py`, `summary.py`, `i18n.py` | Girdi şeması, sonuç kartları, iki dilli metinler |
| `web/` | Yerel HTTP sunucusu ve tarayıcı arayüzü |

## Doğrulama

Testler gerilme çözümlerini yayımlanmış değerlere ve kaba kuvvet integrallerine, motoru kapalı form durumlara (elastik yarı uzayda kare temel, tek boyutlu kil tabakası, elle Schmertmann), raporu üç biçimde, girdi şemasını ve dosya gidiş-dönüşlerini ve arayüzü (oturum ve HTTP katmanı) sınar.

## Sınırlar

- Konsolidasyon tek boyutludur (Terzaghi, düzgün başlangıç boşluk suyu basıncı). Her kil tabakası bağımsız konsolide olur; ortak drenaj sınırı üzerinden etkileşim yok sayılır. Düşey drenler modellenmez.
- Skempton–Bjerrum düzeltmesi uygulanmaz; tek boyutlu değer, dar bir temel altındaki aşırı konsolide kil için tutucudur.
- Tabakalı elastik ani oturma, her tabakanın kendi E ve ν’süyle Steinbrenner parantezlerinin farkıdır; kilde drenajsız E ve ν ≈ 0.5 ile konsolidasyondan önceki distorsiyon oturmasını verir.
- Schmertmann yalnızca granüler tabakalarda kullanılır; şerit 200·B uzunluğunda bir dikdörtgen, daire aynı alanlı kare olarak alınır.
- Açısal distorsiyon yalnızca esnek temelde kontrol edilir; rijit temelde kontrol edilmez.

Ayrıntılar: [docs/theory.md](https://github.com/hdaltuntas/lythos-settle/blob/main/docs/theory.md).

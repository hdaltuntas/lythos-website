---
title: "Lythos SPWA — palplanş perde ve ankrajlı iksa analizi"
description: "Lythos SPWA: palplanş perde analizi; serbest zemin desteği limit dengesi, aşamalı Winkler kiriş-yay, Mononobe-Okabe deprem basınçları ve ankraj kuvvetleri."
---

# Lythos SPWA

<ProductHero id="spwa" />

Konsol ya da çok ankrajlı bir palplanş perde **iki yoldan** analiz edilir ve sonuçlar yan yana konur:

1. **Limit denge** — Coulomb / Mononobe-Okabe toprak basınçlarıyla serbest zemin desteği yöntemi; *gömülme derinliği, ankraj kuvvetleri ve iç kuvvet diyagramları*.
2. **Kiriş-yay (Winkler)** — perde, aşamalar hâlinde inşa edilen, elastoplastik zemin yayları üzerinde bir kiriş; *inşaat sırasının gerçekte ürettiği deplasmanlar ve momentler*, çekme-yalnız eğik ankrajlarla.

Her ikisinin üzerine bir **parametrik veya güvenilirlik çalışması**: duyarlılıklar, %95 güven aralıklı göçme olasılığı ve güvenilirlik indeksi β.

## Neler hesaplanır

**Limit denge (serbest zemin desteği)**
- Düşey perde için Coulomb (statik) ve Mononobe-Okabe (sismik) toprak basınçları; 2c√K kohezyon terimi ve aktif tarafta çekme kesmesi.
- Gömülme: uç etrafında (konsol, basitleştirilmiş yöntem) ya da en alt ankraj etrafında (serbest zemin) moment dengesi; kök bulmayla. `D_design = yukarı_yuvarla(1.2·D_req)`.
- Ankraj başına yatay ve eksenel kuvvet ile düşey bileşen.
- Net basınç, toprak ve su basınçları, kesme, moment, dönme ve deplasman diyagramları.
- Kontroller: f<sub>y</sub>/GS’ye karşı eğilme gerilmesi, H/120, H/100 veya H/240’a karşı deplasman, gösterge niteliğinde düşey denge.

**Kiriş-yay (Winkler)**
- Aktif ve pasif sınırlarla kırpılan elastoplastik yaylar üzerinde Euler-Bernoulli kirişi; K<sub>0</sub> = 1 − sin φ ile sükûnetten başlar.
- **Aşamalı inşaat kendiliğinden kurulur:** ankraj seviyesi + fazla kazıya kadar kaz, ankrajı yerleştir, son kotta devam et; yaylar aşamalar arasında durumlarını korur.
- Ankrajlar çekme-yalnız yaylar: k<sub>h</sub> = EA/(L<sub>serbest</sub>·s)·cos²α, kilit yüküyle.
- Yatak katsayısı k<sub>s</sub> doğrudan, ya da Ménard-Bourdon veya Schmitt (1995) ile.

**Deprem** — Mononobe-Okabe K<sub>AE</sub> / K<sub>PE</sub>; su tablası altında atalet açısı γ<sub>doy</sub>/γ′’den (tutulan boşluk suyu); perdenin önündeki serbest su için Westergaard hidrodinamik basıncı 7/8·k<sub>h</sub>·γ<sub>w</sub>·√(H<sub>w</sub>·y).

## Ekran görüntüleri

<Gallery :items="[
  { src: '/img/spwa/spwa_summary.png', caption: 'Sonuç özeti: limit denge ve kiriş-yay yan yana' },
  { src: '/img/spwa/spwa_moment_dark.png', caption: 'Eğilme momenti — koyu tema' },
  { src: '/img/spwa/spwa_beam_spring.png', caption: 'Kiriş-yay (Winkler) analizi, aşama aşama' },
  { src: '/img/spwa/spwa_study.png', caption: 'Güvenilirlik çalışması' }
]" />

## Hızlı başlangıç

```bash
pip install lythosspwa
lythos-spwa                                    # arayüz: http://127.0.0.1:8779/
```

```bash
lythos-spwa example -o rihtim.spwa
lythos-spwa run rihtim.spwa --lang tr -o rapor.pdf
lythos-spwa study rihtim.spwa -o ornekler.csv
```

::: info Arka plan
Lythos SPWA, PyQt6 + Matplotlib ile yazılmış masaüstü programı **SPWA**’nın web uygulaması olarak yeniden inşasıdır. Hesap çekirdekleri aynı koddur; Qt arayüzünün yerini yerel sunucu ve tarayıcı sayfası, Qt tabanlı PDF yazıcısının yerini ReportLab almıştır. SPWA v0.1 dosyaları varsayılanlar doldurularak açılır.
:::

## Sonraki adımlar

- [Örnekler](./examples) — iki ankrajlı rıhtım perdesi, deprem etkisi, LE ile kiriş-yayın karşılaştırması.
- [Başvuru](./reference) — yöntem notları, girdiler, modüller.
- Sürekli ortam ve genel duraylılık için [LythosFEA](/fea/).

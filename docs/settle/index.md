---
title: "Lythos Settle — temel ve dolgu oturma hesabı, konsolidasyon"
description: "Lythos Settle: temel ve dolgu oturması; Boussinesq gerilme dağılımı, Steinbrenner ve Schmertmann ani oturma, konsolidasyon, ikincil sıkışma ve zaman–oturma eğrisi."
---

# Lythos Settle

<ProductHero id="settle" />

Tabakalı bir zemin profili üzerindeki **dikdörtgen, şerit ya da dairesel bir temelin** — veya tepe genişliği, yüksekliği ve şev açılarıyla verilen bir **dolgunun** — **ne kadar** ve **ne kadar sürede** oturacağını hesaplar.

## Neler hesaplanır

1. **Gerilmeler** — yerinde σ<sub>v0</sub>, u<sub>0</sub>, σ′<sub>v0</sub> ve σ′<sub>p</sub>; temel altında Boussinesq (Newmark dikdörtgeni, şerit ve daire çözümleri) ya da 2:1 yayılma ile gerilme artışı; merkez, karakteristik nokta, uzun kenar ortası ve köşede. Dolgu altında trapez yük için **kesin** çözüm: tepe merkezi, tepe kenarı, şev ortası ve topuk.
2. **Ani oturma** — her tabakada tabakalı elastik (Steinbrenner), ya da granüler tabakalarda Schmertmann (1978).
3. **Konsolidasyon** — kil tabakalarında C<sub>c</sub>, C<sub>r</sub>, e<sub>0</sub> ve σ′<sub>p</sub>’den birincil oturma; tasarım ömrüne kadar C<sub>α</sub>’dan ikincil sıkışma.
4. **Zaman** — Terzaghi tek boyutlu konsolidasyonu, her kil tabakası kendi drenajıyla; t<sub>50</sub>, t<sub>90</sub> ve zaman–oturma eğrisi.
5. **Kontroller** — toplam oturma ve açısal distorsiyon, izin verilen değerlere karşı.

Bunun üzerine **parametrik veya güvenilirlik çalışması**, izin verilen oturmanın veya distorsiyonun aşılma olasılığını %95 güven aralığı ve β ile verir.

## Ekran görüntüleri

<Gallery :items="[
  { src: '/img/settle/settle_summary.png', caption: 'Sonuç özeti' },
  { src: '/img/settle/settle_time.png', caption: 'Zaman–oturma eğrisi' },
  { src: '/img/settle/settle_depth_dark_tr.png', caption: 'Derinlikle oturma — koyu tema, Türkçe' },
  { src: '/img/settle/settle_study.png', caption: 'Güvenilirlik çalışması' },
  { src: '/img/settle/settle_embankment.png', caption: 'Yumuşak kil üzerinde dolgu' },
  { src: '/img/settle/settle_embankment_profile.png', caption: 'Dolgu boyunca oturma' }
]" />

## Hızlı başlangıç

```bash
pip install lythossettle
lythos-settle                                  # arayüz: http://127.0.0.1:8780/
```

```bash
lythos-settle example -o proje.settle          # başlangıç projesi: yumuşak kil üzerinde radye
lythos-settle run proje.settle --lang tr -o rapor.pdf
lythos-settle study proje.settle -o ornekler.csv
```

## Şekiller

Boussinesq gerilme soğanlı kesit · derinlikle gerilmeler (σ′<sub>v0</sub>, σ′<sub>v0</sub> + Δσ, σ′<sub>p</sub> ve etki derinliği ölçütü) · her noktada etki katsayıları ve Schmertmann I<sub>z</sub> · derinlikle birikimli oturma · zaman–oturma eğrisi · her noktada oturma bileşenleri · kesit boyunca oturma (temel ya da dolgu altındaki oturma çanağı). Çalışma şekilleri: birer birer tarama, histogram, saçılım, tornado.

## Sonraki adımlar

- [Örnekler](./examples) — radye, yöntem karşılaştırması, dolgu ve güvenilirlik çalışması.
- [Başvuru](./reference) — girdiler, bağıntılar, modüller.
- Dolgunun duraylılığı için [Lythos LE](/le/); taşıma gücü için [Lythos Bearing](/bearing/).

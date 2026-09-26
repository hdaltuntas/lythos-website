---
title: "Lythos Bearing — sığ temellerde taşıma gücü hesabı"
description: "Lythos Bearing: sığ temellerin taşıma gücü; Terzaghi, Meyerhof, Hansen, Vesić ve EN 1997-1 yan yana, dışmerkez yük, tabakalı zemin, deprem ve güvenilirlik analizi."
---

# Lythos Bearing

<ProductHero id="bearing" />

Tabakalı bir zemin profili üzerindeki **dikdörtgen, kare, şerit ya da dairesel** bir temel; düşey yük, iki doğrultuda yatay yük ve momentler altında, bir mühendisten istenebilecek **bütün yöntemlerle yan yana** kontrol edilir. Belirleyici yöntem işaretlenir, diğerleri karşılaştırma için tabloda kalır.

## Neler hesaplanır

1. **Genel taşıma gücü denklemi** — Terzaghi (1943), Meyerhof (1963), Brinch Hansen (1970), Vesić (1973), EN 1997-1 Ek D katsayı takımları ve Skempton (1951) drenajsız N<sub>c</sub>; her biri kendi şekil, derinlik, yük eğimi, taban eğimi, arazi eğimi ve (Vesić) sıkışabilirlik katsayılarıyla. Drenajlı, drenajsız ya da hangisi belirleyiciyse; genel veya yerel kayma.
2. **Dışmerkez ve eğik yükler** — Meyerhof etkin alanı B′ × L′, taban basıncı (orta üçte birde trapez, dışında üçgen).
3. **Tabakalı zemin** — Prandtl göçme bölgesi üzerinde ortalanan dayanım; ya da zayıf tabaka üzerindeki sağlam tabaka için Meyerhof & Hanna **zımbalama** ve **yük yayılması** kontrolleri.
4. **Arazi deneyleri** — Meyerhof SPT ve CPT kuralları (Bowles düzeltmesiyle), Ménard presiyometre kuralı.
5. **Kaya** — Hoek–Brown’dan eşdeğer c′, φ′ ve CFEM süreksizlik aralığı yöntemi.
6. **Deprem** — yapının psödo-statik ataleti ve Paolucci & Pecker zemin ataleti azaltması.
7. **Kontroller** — taşıma gücü, kayma ve dışmerkezlik; güvenlik sayısıyla ya da **EN 1997-1 Tasarım Yaklaşımı 1, 2, 3** ile; temelin gerektirdiği **genişlik**.

Bunun üzerine bir **parametrik veya güvenilirlik çalışması**, herhangi bir girdiyi aralık ya da dağılım olarak tarar; taşıma gücü, kayma ve dışmerkezlik için göçme olasılığını %95 güven aralığı ve güvenilirlik indeksi β ile verir.

## Ekran görüntüleri

<Gallery :items="[
  { src: '/img/bearing/bearing_summary.png', caption: 'Sonuç özeti: altı yöntem, kontroller ve gerekli genişlik' },
  { src: '/img/bearing/bearing_comparison.png', caption: 'Yöntemlerin karşılaştırması: nihai ve emniyetli basınç' },
  { src: '/img/bearing/bearing_schematic_dark_tr.png', caption: 'Kesit ve Prandtl göçme mekanizması — koyu tema, Türkçe' },
  { src: '/img/bearing/bearing_width.png', caption: 'Taşıma gücü ve güvenlik sayısının genişlikle değişimi' },
  { src: '/img/bearing/bearing_envelope.png', caption: 'V–H göçme zarfı' },
  { src: '/img/bearing/bearing_study.png', caption: 'Güvenilirlik çalışması' }
]" />

## Hızlı başlangıç

```bash
pip install lythosbearing
lythos-bearing                               # arayüz: http://127.0.0.1:8781/
```

Arayüzde **1 · Temel ve zemin** sekmesinde temeli, yükleri, suyu ve zemin profilini girin; **Analizi çalıştır** düğmesine basın. Sonuçlar **Özet**, **Sonuçlar** ve **Şekiller** sekmelerinde; **2 · Çalışma** sekmesi parametrik ve güvenilirlik çalışmalarını yürütür. Başlıktaki **Rapor al…** PDF, HTML ya da Word üretir.

Aynı şeyi komut satırından:

```bash
lythos-bearing example -o proje.bearing      # başlangıç projesi
lythos-bearing run proje.bearing --lang tr -o rapor.pdf
lythos-bearing study proje.bearing -o ornekler.csv
```

## Şekiller

Prandtl göçme mekanizmalı kesit · her yöntem için φ′’ye karşı taşıma gücü katsayıları · yöntemlerin karşılaştırması · kohezyon, sürşarj ve zati ağırlık terimleri · taban basıncı ve etkin alan · genişliğe ve derinliğe karşı taşıma gücü ve güvenlik sayısı · V–H göçme zarfı. Çalışma şekilleri: birer birer tarama, histogram, saçılım, tornado.

## Sonraki adımlar

- [Örnekler](./examples) — başlangıç projesi, genişlik taraması, EN 1997-1 ve güvenilirlik çalışması.
- [Başvuru](./reference) — bütün girdiler, yöntemler, modüller ve doğrulama.
- Aynı katsayılar [Lythos MSEW](/msew/)’de duvar tabanının taşıma gücü için kullanılır.

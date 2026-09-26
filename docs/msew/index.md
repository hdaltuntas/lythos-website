---
title: "Lythos MSEW — donatılı zemin (MSE) istinat duvarı tasarımı"
description: "Lythos MSEW: donatılı zemin (MSE) duvar tasarımı; FHWA/AASHTO dış ve iç duraylılık, çelik şerit ve geogrid donatı, sıyrılma, korozyon, deprem, ASD veya LRFD."
---

# Lythos MSEW

<ProductHero id="msew" />

Donatılı zemin (MSE) duvarlar — bir yüz, sıkıştırılmış dolgu içinde **çelik şerit, geogrid veya geotekstil** tabakaları ve arkasındaki tutulan zemin — FHWA-NHI-10-024 ve AASHTO LRFD 11.10’un yaptığı ve MSEW programının alıştırdığı şekilde tasarlanır ve kontrol edilir.

## Neler hesaplanır

1. **Toprak basıncı** — tutulan ve donatılı dolgunun Coulomb / Rankine K<sub>a</sub>’sı; eğimli yüz ve eğimli arka dolguyla.
2. **Dış duraylılık** — tabanda kayma (dolgu içinden, temel zemini üzerinde ya da bir geosentetik boyunca), topuk etrafında devrilme, bileşkenin dışmerkezliği.
3. **Taşıma gücü** — etkin genişlik B′ = L − 2e altında **Terzaghi, Meyerhof, Brinch Hansen, Vesić ve EN 1997-1** yan yana (katsayılar [Lythos Bearing](/bearing/)’inkiler); su tablası, gömülme, yük eğimi ve topuk önündeki şevle.
4. **İç duraylılık, tabaka tabaka** — AASHTO Basitleştirilmiş Yöntemi ile en büyük çekme (şeritlerde K<sub>r</sub>/K<sub>a</sub> 1.7 → 1.2, geosentetiklerde 1); ardından her tabakanın **çekme**, **sıyrılma** (aktif bölgenin ötesinde F*, α, L<sub>e</sub>), **bağlantı** ve **kayma** kontrolleri.
5. **Donatı** — şeritlerin **genişlik, kalınlık, akma dayanımı ve aralığı** (tasarım ömrü boyunca çinko ve çelik korozyonundan sonra kalan kesit hesaplanır) ya da bir geosentetiğin **nihai dayanımı ve azaltma katsayıları** RF<sub>ID</sub>·RF<sub>CR</sub>·RF<sub>D</sub>.
6. **Deprem** — psödo-statik yöntem: A<sub>m</sub> = (1.45 − A)·A; dışta dinamik itki P<sub>AE</sub> ve atalet P<sub>IR</sub>, içte aktif bölgenin ataletinin tabakalara paylaştırılması.
7. **ASD veya LRFD** — güvenlik sayıları ya da yük katsayıları (EV, EH, ES, LS) ve direnç katsayıları φ.
8. **Duvarın gerektirdiği boy** — dış ve sıyrılma kontrollerini sağlayan en kısa eşit donatı boyu, FHWA’nın en küçüğüyle (0.7·H, 2.4 m) yan yana.

Üzerine bir **yükseklik çalışması**, aynı tasarım kuralını bir yükseklik aralığında çalıştırır ve bütün kontrollerin hangi yüksekliklerde sağlandığını gösterir.

## Ekran görüntüleri

<Gallery :items="[
  { src: '/img/msew/msew_summary.png', caption: 'Sonuç özeti' },
  { src: '/img/msew/msew_layers.png', caption: 'Tabaka tabaka iç duraylılık' },
  { src: '/img/msew/msew_section_dark_tr.png', caption: 'Kesit — koyu tema, Türkçe' },
  { src: '/img/msew/msew_bearing_dark_tr.png', caption: 'Yöntemlere göre taşıma gücü' },
  { src: '/img/msew/msew_heights_figure.png', caption: 'Yükseklik çalışması' },
  { src: '/img/msew/msew_length.png', caption: 'Donatı boyuna karşı kontroller' },
  { src: '/img/msew/msew_catalog_tr.png', caption: 'Donatı kataloğu' },
  { src: '/img/msew/msew_heights.png', caption: 'Yükseklik çalışması tablosu' }
]" />

## Hızlı başlangıç

Lythos MSEW henüz PyPI’da değil; GitHub’dan kurulur:

```bash
pip install git+https://github.com/hdaltuntas/lythos-msew
lythos-msew                                    # arayüz: http://127.0.0.1:8782/
```

```bash
lythos-msew example -o duvar.msew
lythos-msew run duvar.msew --lang tr -o rapor.pdf
lythos-msew heights duvar.msew -o yukseklik.xlsx
```

## Donatı kataloğu

Tipik piyasa ürünleri tek tıkla tür tablosuna eklenir: nervürlü galvanizli çelik şeritler (S355’te HA 40×4 – 60×5, Grade 65’te 50×4), polimer şeritler (PET çekirdek, PE kılıf, şerit başına 20–100 kN), tek eksenli HDPE ve PET geogridler (35–200 kN/m), dokuma PET ve PP geotekstiller — FHWA’nın tipik azaltma katsayıları ve sıyrılma parametreleriyle.

::: warning
Katalog değerleri genel başlangıç değerleridir; şartnamede belirtilen ürünün teknik föyüyle kontrol edin.
:::

## Kapsam dışı

Global ve bileşik duraylılık, oturma ve drenaj bu programda **yoktur**; bunları ayrıca kontrol edin — global duraylılık için [Lythos LE](/le/), oturma için [Lythos Settle](/settle/).

---
title: "Hangi geoteknik yazılım, ne zaman?"
description: "Geoteknik mühendislik sorularını doğru araca eşleyin: şev stabilitesi, sonlu elemanlar, kaya şevi, taşıma gücü, oturma, kazık, palplanş ve MSE duvar."
---

# Hangi araç, ne zaman?

Lythos ailesinde aynı soruya iki farklı yoldan cevap veren araçlar bilerek bulunur: bir şev hem limit dengeyle (LE) hem de sonlu elemanlarla (FEA) çözülebilir; bir palplanş hem limit dengeyle hem kiriş-yayla. Aşağıdaki tablo tipik mühendislik sorularını doğru araca eşler.

## Soruya göre

| Sorunuz | Araç | Neden |
| --- | --- | --- |
| Bu şevin güvenlik sayısı nedir, kritik kayma yüzeyi nerede? | [Lythos LE](/le/) | Saniyeler içinde sekiz yöntem ve binlerce yüzey; rapor ve karşılaştırma için standart yol. |
| Kayma yüzeyi dairesel değilse, ya da yapı-zemin etkileşimi varsa? | [LythosFEA](/fea/) | Mukavemet azaltmada mekanizma, deviatorik birim deformasyondan kendiliğinden çıkar. |
| Kazı aşamalarında perde ne kadar yer değiştirir, ankraj kuvvetleri ne olur? | [LythosFEA](/fea/) veya [Lythos SPWA](/spwa/) | FEA sürekli ortamı çözer; SPWA daha hızlıdır ve palplanş tasarım kontrollerini yapar. |
| Palplanşın gömülme boyu ve kesiti yeterli mi? | [Lythos SPWA](/spwa/) | Serbest zemin desteği + aşamalı Winkler, gerilme ve deplasman kontrolleri, kesit veritabanı. |
| Kaya şevindeki süreksizlikler hangi göçmeye izin veriyor? | [Lythos Kinematic](/kinematic/) | Markland testi, stereonet, Monte Carlo olasılık. |
| Kritik kaya kaması için kaç bulon, hangi boyda? | [Lythos Kinematic](/kinematic/) | Kama/düzlemsel/devrilme limit dengesi ve bulon aralık × boy matrisi. |
| Bu temel bu yükü taşır mı, genişliği ne olmalı? | [Lythos Bearing](/bearing/) | Altı katsayı takımı yan yana, EN 1997-1 tasarım yaklaşımları, gerekli genişlik. |
| Radye / dolgu ne kadar ve ne kadar sürede oturur? | [Lythos Settle](/settle/) | Ani + konsolidasyon + ikincil, t50/t90, açısal distorsiyon. |
| Kazık kaç metre olmalı, grup ne taşır, ne kadar oturur? | [Lythos Pile](/pile/) | α/β/λ, dört grup verimi, blok göçmesi, gerekli boy, eşdeğer radye. |
| Kaya soketinin boyu ne olmalı? | [Lythos Pile](/pile/) | On iki yayımlanmış korelasyon ve tasarım boyu. |
| Donatılı zemin duvarın donatısı yeterli mi? | [Lythos MSEW](/msew/) | FHWA/AASHTO dış ve iç duraylılık, ASD veya LRFD, gerekli boy. |

## Kardeş araçların ortak noktaları

Aile içinde kod da paylaşılır:

- **MSEW’in taşıma gücü katsayıları Lythos Bearing’inkilerdir.** Duvar tabanının taşıma gücü, Bearing’deki aynı `factors.py` ve `capacity.py` ile hesaplanır.
- **Kinematic’in iki modülü aynı stereonete çizer.** Tarama ve limit denge aynı izdüşüm uygulamasını kullanır; tarama sırasında bulunan en kritik bileşen tek tıkla limit dengeye aktarılır.
- **LE ve FEA birbirini doğrular.** FEA’nın 2:1 şev testi, bağımsız yazılmış bir Bishop aramasına karşı yapılır (1.377’ye karşı 1.381).

## Analiz türüne göre

| | FEA | LE | Kinematic | Bearing | Settle | Pile | SPWA | MSEW |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Limit denge | | ● | ● | ● | | ● | ● | ● |
| Sonlu eleman / yay | ● | | | | | | ● | |
| Deformasyon / oturma | ● | | | | ● | ● | ● | |
| Aşamalı inşaat | ● | | | | | | ● | |
| Deprem (psödo-statik) | | ● | ● | ● | | | ● | ● |
| Yeraltı suyu | ● | ● | ● | ● | ● | ● | ● | ● |
| Güvenilirlik / olasılık | | | ● | ● | ● | ● | ● | |
| PDF / HTML rapor | HTML | JSON/CSV/SVG | PDF | ● | ● | ● | ● | ● |
| Türkçe arayüz | | | ● | ● | ● | ● | ● | ● |
| DXF içe aktarma | ● | | | | | | | |

::: warning Bir hesap yazılımı mühendislik yargısının yerini tutmaz
Her yazılımın **Başvuru** sayfasındaki sınırlamaları okuyun. Örneğin LythosFEA’da konsolidasyon ve pekleşen zemin modeli yoktur; Lythos MSEW global ve bileşik duraylılığı kontrol etmez — bunun için Lythos LE’yi kullanın.
:::

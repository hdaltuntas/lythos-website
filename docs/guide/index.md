# Lythos nedir?

**Lythos**, geoteknik mühendisliğinin günlük hesaplarını yapan sekiz yazılımdan oluşan açık kaynaklı bir ailedir. Adı Yunanca *lithos* (taş) sözcüğünden gelir. Her üye tek bir işi derinlemesine yapar; birlikte bir projenin şev, temel ve istinat yapısı tasarımının tamamını kapsarlar.

<SectionPanorama />

## Aile

| Yazılım | Ne yapar | Paket |
| --- | --- | --- |
| [LythosFEA](/fea/) | 2B sonlu elemanlar: şev güvenlik sayısı (SSR), aşamalı kazı ve dolgu, perde ve ankraj iç kuvvetleri, DXF içe aktarma | `lythosfea` |
| [Lythos LE](/le/) | Dilim yöntemiyle limit denge şev stabilitesi; sekiz yöntem, kritik yüzey araması | `lythosle` |
| [Lythos Kinematic](/kinematic/) | Kaya şevlerinde Markland taraması, Monte Carlo olasılık, kama / düzlemsel / devrilme analizi ve bulon tasarımı | `lythoskinematic` |
| [Lythos Bearing](/bearing/) | Sığ temellerin taşıma gücü; altı katsayı takımı yan yana, EN 1997-1 | `lythosbearing` |
| [Lythos Settle](/settle/) | Temel ve dolgu oturmaları; ani, konsolidasyon, ikincil sıkışma ve zaman | `lythossettle` |
| [Lythos Pile](/pile/) | Kazık taşıma gücü, grup etkisi, oturma ve kaya soketi | `lythospile` |
| [Lythos SPWA](/spwa/) | Palplanş perdeler: serbest zemin desteği ve aşamalı Winkler kiriş-yay | `lythosspwa` |
| [Lythos MSEW](/msew/) | Donatılı zemin (MSE) duvarlarda dış ve iç duraylılık, FHWA / AASHTO | `lythosmsew` |

## Ortak ilkeler

Ailenin bütün üyeleri aynı birkaç ilkeye göre yazılmıştır:

- **Her yöntem yan yana.** Tek bir “doğru” sonuç yerine, bir mühendisten istenebilecek bütün yayımlanmış yöntemler aynı girdilerle hesaplanır ve karşılaştırılır. Belirleyici olan işaretlenir.
- **Kaynağı belli sayılar.** Her bağıntının kaynağı ve geçerlilik sınırı `docs/theory.md` dosyasında yazılıdır; testler bunları yayımlanmış tablolara, el hesaplarına ve kapalı form çözümlere karşı sabitler.
- **Sınırlar açıkça yazılır.** Her yazılımın belgelerinde “sınırlamalar” bölümü vardır: modelin ne yapmadığını bilmeden bir sayıya güvenmeyin.
- **Veriniz sizde kalır.** Arayüz kendi makinenizde çalışan bir sunucudur ve yalnızca yerel adresi dinler; hiçbir şey dışarı gönderilmez.
- **Türkçe ve İngilizce.** Arayüz, sonuç metinleri, şekiller ve raporlar iki dilde; dil çalışırken değişir.

## Nereden başlamalı?

<div class="steps">

### Kurun

[Kurulum](./installation) sayfası her paketin tek satırlık kurulumunu ve klondan çalıştırmayı anlatır.

### Doğru aracı seçin

[Hangi araç, ne zaman?](./choosing) sayfası tipik mühendislik sorularını doğru yazılıma eşler.

### Bir örneği çalıştırın

Her yazılımın **Örnekler** sayfasında, gerçekten çalıştırılmış komutlar ve çıktıları vardır. Örneğin [Lythos Bearing örnekleri](/bearing/examples).

### Bütün resmi görün

[Uçtan uca bir proje](./workflow), aileyi tek bir saha üzerinde birlikte kullanır.

</div>

::: tip Yazar
Lythos, Hasan Deniz Altuntaş tarafından geliştirilir ve MIT lisansıyla yayımlanır. Kaynak kodlar [github.com/hdaltuntas](https://github.com/hdaltuntas) altındadır.
:::

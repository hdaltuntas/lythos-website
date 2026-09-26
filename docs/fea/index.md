---
title: "LythosFEA — 2B sonlu elemanlar ile şev ve derin kazı analizi"
description: "LythosFEA: şevler, dolgular ve derin kazılar için açık kaynaklı 2B sonlu elemanlar yazılımı. Mukavemet azaltmayla güvenlik sayısı, aşamalı inşaat, DXF içe aktarma."
---

# LythosFEA

<ProductHero id="fea" />

Geoteknik mühendisliği için 2B sonlu elemanlar analizi: şevler, dolgular ve derin kazılar; kayma mukavemeti azaltmayla güvenlik sayısı; perde, kazık ve ankrajlarda iç kuvvetler.

![Şev göçme mekanizması](/img/fea/slope_strain.png)

## Kapsam

- **Şev stabilitesi** — kayma mukavemeti azaltmayla (SSR) güvenlik sayısı; kritik kayma yüzeyi dairesel varsayılmaz, deviatorik birim deformasyon alanından kendiliğinden çıkar.
- **Aşamalı inşaat** — kademeler hâlinde yükseltilen dolgular, aşamalar hâlinde kazılan çukurlar, inşa edildikleri anda yerleştirilen yapılar ve ankrajlar.
- **İstinat yapıları** — çap, aralık ve beton sınıfıyla tanımlanan fore kazık perdeler, diyafram duvarlar, palplanşlar ve kaplamalar; eleman boyunca eksenel kuvvet, kesme ve eğilme momenti.
- **Zemin-yapı etkileşimi** — duvar sürtünmeli Mohr-Coulomb arayüzleri, ön germeli zemin ankrajları, destekler ve sürşarj yükleri.
- **Yeraltı suyu** — freatik yüzey altında hidrostatik boşluk suyu basıncı; eğik yüzeyin yatay basınç gradyanı sızma kuvveti olarak.
- **DXF içe aktarma** — kesit *ve inşaat sırası* koordinat yeniden yazılmadan doğrudan CAD çiziminden okunur.

Her şey tarayıcıdaki etkileşimli arayüzden, komut satırından ya da bir Python betiğinden çalışır.

## Ekran görüntüleri

<Gallery :items="[
  { src: '/img/fea/gui.png', caption: 'Tarayıcı arayüzü' },
  { src: '/img/fea/dxf_import.png', caption: 'CAD çiziminden içe aktarılmış kesit' },
  { src: '/img/fea/dxf_staged.png', caption: 'Çizimden okunan aşamalı kazı' },
  { src: '/img/fea/wall_forces.png', caption: 'Perdede eksenel kuvvet, kesme ve moment' },
  { src: '/img/fea/excavation_disp.png', caption: 'Kazıda toplam deplasmanlar' },
  { src: '/img/fea/excavation_mesh.png', caption: 'Kazı ağı' },
  { src: '/img/fea/slope_ssr.png', caption: 'SSR eğrisi: deplasman – azaltma katsayısı' },
  { src: '/img/fea/slope_mesh.png', caption: 'Şev ağı' }
]" />

## Hızlı başlangıç

```bash
pip install lythosfea
lythos gui                          # arayüz: http://127.0.0.1:8777/
lythos import --sample -o m.json    # pakette gelen çizimi deneyin
```

Dağıtım adı `lythosfea`’dır; içe aktarılan ve çalıştırılan `lythos`’tur:

```python
import lythos
```

İkili DXF, spline ve blok referansları için `pip install "lythosfea[dxf]"`; düz ASCII DXF ek bir şey istemez.

Klondan, kurmadan:

```bash
python main.py                                   # arayüz
python main.py run models/slope.json -o out      # = lythos run ...
```

Python 3.10+, NumPy, SciPy ve Matplotlib gerekir; eksikse `main.py` içe aktarma hatası yerine sisteminize uygun komutu söyler.

## Arayüz

Zemin tabakalarını çizin, bir perde bırakın, inşaat aşamalarını belirleyin ve **Run analysis**’e basın. Sunucu yalnızca yerel adresi dinler; hiçbir şey makinenizden çıkmaz. Arayüz masaüstü araç takımı yerine tarayıcıda çalışır, böylece uzak oturumda, konteynerde ya da ekransız bir makinede aynı çalışır.

## İçeride ne var

| Parça | Ne yapar |
| --- | --- |
| `lythos.core.mesher` | Delaunay incelemeli ağ üreteci; çizimi düzlemselleştirir, her tabakaya ve yapı çizgisine uyar, bölge başına eleman boyunu kademelendirir |
| `lythos.core.materials` | Çağrışımsız akışlı ve çekme kesmeli Mohr-Coulomb, doğrusal elastik, beton; asal gerilme uzayında kesin geri dönüş |
| `lythos.core.elements` | 6 düğümlü üçgenler, Timoshenko kirişleri, sıfır kalınlıklı arayüzler, ankrajlar |
| `lythos.core.solver` | Aşamalı inşaat, uyarlanır alt adımlama, mukavemet azaltma |
| `lythos.core.pile` | Çap, aralık ve beton sınıfından kazık ve perde kesitleri |
| `lythos.viz.plots` | Konturlar, şekil değiştirmiş ağlar, plastik noktalar, kesit kuvvet diyagramları |
| `lythos.gui` | Tarayıcı arayüzü |

## Sonraki adımlar

- [Örnekler](./examples) — şev güvenlik sayısı, ankrajlı derin kazı, DXF’ten inşaat sırası, kazık perde kesiti.
- [Başvuru](./reference) — DXF kuralları, doğrulama tablosu ve sınırlar.

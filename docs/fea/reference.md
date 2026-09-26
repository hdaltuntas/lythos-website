---
title: "LythosFEA başvuru — yöntemler, girdiler, doğrulama"
description: "LythosFEA başvuru kılavuzu: Komut satırı, DXF içe aktarma, Doğrulama, Sınırlar."
---

# LythosFEA — başvuru

## Komut satırı

| Komut | Ne yapar |
| --- | --- |
| `lythos gui` | tarayıcı arayüzü (port 8777) |
| `lythos examples -o models` | çözümlü örnekleri model dosyası olarak yazar |
| `lythos mesh model.json` | analiz etmeden ağ istatistikleri |
| `lythos run model.json -o out` | analiz eder, HTML rapor ve JSON yazar |
| `lythos import cizim.dxf -o model.json [--plot p.png] [--keep-coordinates]` | DXF’ten model |
| `lythos import --sample -o model.json` | pakette gelen çizimi içe aktarır |

Klondan her komut `python main.py …` olarak da çalışır.

## DXF içe aktarma

Bir çizim katmanının neye dönüşeceği adından anlaşılır; büyük/küçük harf, tire, alt çizgi ve boşluk yok sayılır — `SU-SEVIYESI` ve `su seviyesi` ikisi de su tablası olarak okunur.

| Katman adı şunu içeriyorsa | olur |
| --- | --- |
| `soil`, `clay`, `sand`, `rock`, `fill`, `zemin`, `kil`, `kum`, `tabaka`, … | zemin tabakası |
| `wall`, `pile`, `sheet`, `diaphragm`, `perde`, `kazık`, … | perde ya da kazık sırası |
| `water`, `phreatic`, `gwl`, `su seviyesi`, … | su tablası |
| `load`, `surcharge`, `yük`, … | çizgi yük |
| `anchor`, `strut`, `prop`, `ankraj`, … | ankraj |
| `text`, `dim`, `hatch`, `grid`, `defpoints`, `ölçü`, … | yok sayılır |
| başka bir şey | kapalıysa zemin, değilse yapı |

Zemin bölgeleri çizgilerin oluşturduğu düzlemsel düzenlemenin yüzleri olarak bulunur; **iki olağan CAD alışkanlığı da çalışır**: her tabaka kendi kapalı çoklu çizgisi olarak ya da bir dış sınır artı ayırıcı çizgiler olarak.

### İnşaat sırası

**Katman adının sonundaki sayı, o şeyin olduğu adımdır:**

| Katman | Anlamı |
| --- | --- |
| `WALL-1` | perde 1. adımda inşa edilir |
| `EXC-2`, `KAZI-2` | bu bölge 2. adımda kazılır |
| `ANCHOR-3` | ankraj 3. adımda kilit yüküne gerilir |
| `SURCHARGE-1` | yük 1. adımda uygulanır |
| `SOIL-CLAY` | sayı yok: baştan beri vardır, hiç kaldırılmaz |

Kazı bölgeleri iki şekilde çizilebilir: her kademenin kapalı ana hatları olarak ya da perdeden dışa doğru çizilmiş kazı **seviyeleri** olarak. Çizim birimleri `$INSUNITS`’ten okunur (milimetre çizim metreye gelir). Harita koordinatları orijine taşınır ve kaydırma raporlanır; `--keep-coordinates` bunu kapatır.

## Doğrulama

Aşağıdaki her iddia `tests/` içinde bir testtir:

| Kontrol | Referans | Lythos |
| --- | --- | --- |
| Mohr-Coulomb göçme deviatörü, düzlem şekil değiştirme | σ<sub>1</sub> = σ<sub>3</sub>K<sub>p</sub> + 2c√K<sub>p</sub> | %0.5 içinde |
| Sıfır yanal şekil değiştirmede aktif basınç | K<sub>a</sub>σ<sub>v</sub> + 2c√K<sub>a</sub> | kesin |
| Öz ağırlık altında jeostatik gerilme ve oturma | γz, γH²/2E | kesin |
| Yama testi, doğrusal deplasman alanı | sabit gerilme | 1e-12’ye kadar kesin |
| Konsol uç sehimi | PL³/3EI + PL/GA | %0.2 içinde |
| Narin kiriş, h/L = 1/1000 | kesme kilitlenmesi yok | %2 içinde |
| 2:1 şev güvenlik sayısı | 1.377, bağımsız Bishop araması | 471 elemanlı ağda 1.381 |
| Algoritmik teğet | sayısal türev | her yerde E’nin 4e-4’ü içinde |

```bash
pytest                    # hızlı paket
pytest -m slow            # tam analizler de
```

Ayrıntılı tablo: [docs/validation.md](https://github.com/hdaltuntas/lythos/blob/main/docs/validation.md); formülasyon: [docs/theory.md](https://github.com/hdaltuntas/lythos/blob/main/docs/theory.md).

## Sınırlar

Bir sayıyı tasarıma güvenmeden önce bilinmesi gerekenler:

- Yalnızca drenajlı ya da toplam gerilme (drenajsız) analizi; konsolidasyon, geçici akım ve bağlaşık boşluk suyu basıncı yoktur. Drenajsız davranış bir tabakaya `phi = 0` ve `c = su` verilerek modellenir.
- Boşluk suyu basıncı freatik yüzey altında hidrostatiktir. Sızma analizi yoktur; eğik freatik yüzeyin yatay gradyanı sızma kütle kuvveti olarak taşınır.
- Baştan sona küçük şekil değiştirme; güncellenen ağ ya da büyük deplasman seçeneği yoktur.
- Elastik-mükemmel plastik zemin. Pekleşme modeli yoktur; çalışma yükleri altındaki oturma tahmini, ilgili gerilme aralığı için seçilen tek rijitlik kadar iyidir.
- Bir kazık sırası eşdeğer bir plağa yayılır (olağan düzlem şekil değiştirme idealleştirmesi); kazıklar arasındaki kemerlenme hakkında bir şey söylemez.
- İkinci dereceden üçgenler sabit hacimli plastik akışta doğrusal olanlardan çok daha iyidir, ama hacimsel kilitlenmeden tamamen muaf değildir. Drenajsız (`phi = 0`) göçme yükleri biraz yüksek çıkar; ağı inceltin ve kaba ağdan gelen drenajsız bir güvenlik sayısına özellikle şüpheyle yaklaşın.
- Mukavemet azaltma, dengenin kaybolduğu katsayıyı raporlar. Her böyle analiz gibi göçme ölçütünün nasıl değerlendirildiğine duyarlıdır; bu yüzden deplasman–katsayı eğrisi de raporlanır ve bakılmalıdır.

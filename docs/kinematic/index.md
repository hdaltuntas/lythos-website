# Lythos Kinematic

<ProductHero id="kinematic" />

Kaya şevi kinematiği ve stabilitesi, iki adımlı tek bir iş akışında:

1. **Kinematik tarama** — stereonet üzerinde Markland testi, kutup yoğunluğu ve Monte Carlo göçme olasılığı: *hangi göçme mekanizmasının mümkün olduğunu* belirler.
2. **Limit denge** — kritik bulunan mekanizma için *güvenlik sayısı, gereken destek ve bulon tasarımı*.

İki adım birbirine bağlıdır: taramada bulunan en kritik süreksizlik ya da kesişim, **tek tıkla** limit denge girdilerine yazılır.

## Neler hesaplanır

**Kinematik tarama**
- **Kinematik testler:** düzlemsel kayma, kama kayması (Markland), eğilmeli devrilme (Goodman & Bray).
- **Stereonet:** eşit alan (Schmidt) alt yarıküre izdüşümü, kutup yoğunluğu konturu (Kamb sayım konisi), kritik bölge taraması, sürtünme / kayma sınır konisi.
- **Monte Carlo:** süreksizlik yönelim belirsizliğini hesaba katan toplam ve bileşen bazında göçme olasılığı; arka planda çalışır, sayfa canlı kalır.

**Limit denge**
- **Kama (Swedge benzeri):** dört yüzlü kama geometrisi, Hoek & Bray vektörel limit denge, 3B görünüm ve stereonet.
- **Düzlemsel (RocPlane benzeri):** çekme çatlağı, su basıncı, deprem yükü, 2B kesit.
- **Devrilme (RocTopple benzeri):** Goodman & Bray blok devrilmesi; su, deprem ve topuk ankrajı.
- **Destek tasarımı:** hedef GS için gereken kuvvet, tıklanabilir **bulon aralık × boy matrisi** ve seçilen tasarımın kapasite/GS kontrolü.

**Köprü** — “→ Kritik sonucu limit dengeye gönder”:

| Tarama modu | Aktarılan girdiler |
| --- | --- |
| Düzlemsel | kayma düzlemi ψ<sub>p</sub>, şev yüzü ψ<sub>f</sub>, sürtünme açısı φ |
| Kama | Eklem 1 ve Eklem 2 eğim/eğim yönü, şev yüzü eğim/eğim yönü, φ |
| Devrilme | süreksizlik eğimi ψ<sub>d</sub>, şev yüzü ψ<sub>f</sub>, φ |

## Ekran görüntüleri

<Gallery :items="[
  { src: '/img/kinematic/screening.png', caption: 'Kinematik tarama ve stereonet' },
  { src: '/img/kinematic/bolts.png', caption: 'Bulon aralık × boy matrisi' },
  { src: '/img/kinematic/probability.png', caption: 'Olasılıksal analiz (Monte Carlo)' },
  { src: '/img/kinematic/wedge.png', caption: 'Kama analizi' },
  { src: '/img/kinematic/english_dark.png', caption: 'İngilizce arayüz, koyu tema' }
]" />

## Hızlı başlangıç

```bash
pip install lythoskinematic
lythos-kinematic                               # arayüz: http://127.0.0.1:8778/
```

```bash
lythos-kinematic example -o girdiler.json
lythos-kinematic screen girdiler.json -o tarama.pdf
lythos-kinematic run girdiler.json --mode wedge -o kama.pdf
lythos-kinematic run girdiler.json --mode planar --lang EN
```

`--lang` burada `TR` veya `EN` alır; varsayılan Türkçedir.

::: info Arka plan
Lythos Kinematic, iki masaüstü programının birleşimidir: **SlopeKinematics** (kinematik ve olasılık, PyQt5) ve **Kinematix** (limit denge, bulonlama ve raporlama, PySide6). Birleştirme sırasında `mplstereonet` bağımlılığı kaldırılıp tek bir ortak stereonet uygulaması yazıldı ve eşit alan izdüşümündeki bir **yarıçap normalizasyonu hatası** düzeltildi: yatay çizgiler (dalım = 0) ilkel daire yerine yarıçapın %70.7’sine düşüyordu. Düzeltme `tests/test_stereonet.py` ile sabitlenmiştir.
:::

## Sonraki adımlar

- [Örnekler](./examples) — tarama, Monte Carlo, kama, düzlemsel kayma ve devrilme; Python API.
- [Başvuru](./reference) — girdi alanları, paket düzeni, doğrulama.

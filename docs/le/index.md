# Lythos LE

<ProductHero id="le" />

Saf Python’da, tarayıcı arayüzlü **limit denge şev stabilitesi**. Şev ve dolguların güvenlik sayısını dilim yöntemiyle hesaplar — Rocscience Slide ya da GeoStudio SLOPE/W ile aynı analiz sınıfı. Kritik kayma yüzeyini arar, bütün klasik yöntemleri o yüzey üzerinde raporlar ve kesiti tarayıcıda çizer.

- **Bağımlılık yok.** Çözücü, web sunucusu ve ön yüz standart kütüphane ve saf JavaScript’tir. `python -m lythosle serve`, hiçbir şey `pip install` edilmemiş çıplak bir Python 3.9+ üzerinde çalışır.
- **Sekiz yöntem**, Fellenius’tan Morgenstern-Price’a; hepsi tek bir dilim formülasyonu üzerine kurulu — aralarındaki farklar kodda değil, varsayımlardadır.
- **Doğrulanmış** — kapalı form çözümler, Taylor’ın stabilite sayıları ve ACADS karşılaştırma problemiyle.

## Neler yapar

| | |
| --- | --- |
| **Yöntemler** | Ordinary (Fellenius), Bishop basitleştirilmiş, Janbu basitleştirilmiş ve düzeltilmiş, Corps of Engineers #1, Lowe-Karafiath, Spencer, Morgenstern-Price (yarım sinüs, sabit ya da trapez dilimler arası fonksiyon) |
| **Yüzeyler** | Dairesel (uyarlanır kutu ve incelemeli ızgara-teğet araması), tek bir belirtilmiş daire, kullanıcı tanımlı dairesel olmayan yüzey, kritik daireden dairesel olmayan optimizasyon |
| **Dayanım** | Efektif gerilme (c′, φ′), drenajsız (s<sub>u</sub>, isteğe bağlı derinlikle doğrusal artan), geçirimsiz ve dayanımsız malzemeler |
| **Yeraltı suyu** | Piyezometrik su tablası, malzeme başına boşluk suyu oranı r<sub>u</sub>, ayrı doygun birim hacim ağırlıklar, şev üzerinde göllenen su |
| **Yükleme** | Yüzey sürşarjları, psödo-statik k<sub>h</sub> ve k<sub>v</sub>, donatı (çivi, ankraj, geosentetik), isteğe bağlı su basınçlı çekme çatlakları |
| **Çıktı** | Yönteme göre güvenlik sayısı, kritik yüzey, tam dilim kuvvet tablosu (CSV), Spencer/Morgenstern-Price için λ–GS grafiği, arama ızgarası, her şey için JSON |

## Ekran görüntüleri

<Gallery :items="[
  { src: '/img/le/screenshot-light.png', caption: 'Tarayıcı arayüzü — açık tema' },
  { src: '/img/le/screenshot-dark.png', caption: 'Tarayıcı arayüzü — koyu tema' }
]" />

## Hızlı başlangıç

```bash
pip install lythosle

lythosle serve --open         # tarayıcı arayüzü: http://127.0.0.1:8000
lythosle example              # yerleşik örnekleri listele
lythosle example homogeneous  # birini çalıştır ve raporu yaz
```

Ya da klondan, hiçbir şey kurmadan:

```bash
git clone https://github.com/hdaltuntas/lythosle
cd lythosle
python main.py                         # aynı arayüz
python main.py example homogeneous     # aynı komutlar
python -m unittest discover -s tests   # test paketi
```

`HOST` ve `PORT` ortam değişkenleri adresi değiştirir. FastAPI tercih ederseniz `uvicorn lythosle.web.app:app` aynı API’yi sunar.

## Tarayıcı arayüzü

Geometriyi bir şablondan ya da koordinatları yazarak kurun; malzemeleri, suyu ve yüklemeyi kenar çubuğunda tanımlayın, sonra **Run analysis** (ya da Ctrl/Cmd + Enter). Kesit görünümü tabakaları, freatik yüzeyi, dönme merkeziyle kritik yüzeyi, güvenlik sayısına göre renklendirilmiş arama ızgarasını, dilimleri ve donatıyı gösterir. Sonuçlar SVG, CSV ve JSON olarak dışa aktarılır. `?example=layered_water` ve `?theme=dark` URL parametreleri çalışır.

Yazı tipleri (Inter ve Newsreader) pakete gömülüdür; çalışırken hiçbir şey CDN’den çekilmez, sayfa çevrimdışı da aynı görünür.

## Sonraki adımlar

- [Örnekler](./examples) — altı yerleşik örnek, komut satırı, Python API ve aşamalı dolgu.
- [Başvuru](./reference) — model biçimi, formülasyon, doğrulama ve sınırlar.

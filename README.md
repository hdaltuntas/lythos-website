# Lythos — web sitesi

Lythos geoteknik mühendisliği yazılım ailesinin tanıtım ve dokümantasyon sitesi. Türkçe ve İngilizce; her yazılım için genel bakış, **gerçekten çalıştırılmış çıktılarla** örnekler ve başvuru sayfaları.

**Canlı site:** https://lythosapp.com

| Yazılım | Depo |
| --- | --- |
| LythosFEA | [hdaltuntas/lythos](https://github.com/hdaltuntas/lythos) |
| Lythos LE | [hdaltuntas/lythosle](https://github.com/hdaltuntas/lythosle) |
| Lythos Kinematic | [hdaltuntas/lythoskinematic](https://github.com/hdaltuntas/lythoskinematic) |
| Lythos Bearing | [hdaltuntas/lythos-bearing](https://github.com/hdaltuntas/lythos-bearing) |
| Lythos Settle | [hdaltuntas/lythos-settle](https://github.com/hdaltuntas/lythos-settle) |
| Lythos Pile | [hdaltuntas/lythos-pile](https://github.com/hdaltuntas/lythos-pile) |
| Lythos SPWA | [hdaltuntas/lythosspwa](https://github.com/hdaltuntas/lythosspwa) |
| Lythos MSEW | [hdaltuntas/lythos-msew](https://github.com/hdaltuntas/lythos-msew) |

## Yerelde çalıştırma

Node.js 18+ gerekir.

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # docs/.vitepress/dist
npm run preview    # derlenmiş siteyi önizle
```

## Yayına alma (Cloudflare Workers)

Site Cloudflare’de statik varlıklı bir Worker (`lythos-website`) olarak, `lythosapp.com` alan adında yayınlanır. Cloudflare depoyu izler; `main`’e her push siteyi birkaç dakika içinde yeniden derleyip yayınlar. Derleme durumu GitHub’daki commit’in yanında “Workers Builds” kontrolü olarak görünür.

Cloudflare panelindeki ayarlar (Workers & Pages → lythos-website → Settings → Build):

| Ayar | Değer |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Root directory | `/` |

Yayınlanacak klasör, 404 sayfası ve derleme adımı `wrangler.jsonc` dosyasında tanımlıdır; Node sürümü `.node-version` dosyasından (22) gelir. Önbellek ve güvenlik başlıkları `docs/public/_headers` dosyasındadır.

Yerelden elle yayın (Cloudflare hesabıyla oturum açmış olarak): `npx wrangler deploy`.

Site kök adreste (`/`) yayınlanır; bir alt yolda yayınlamak gerekirse derlemeye `BASE=/alt-yol/` ortam değişkeni verilir. Pull request’lerde `.github/workflows/check.yml` sitenin kırık bağlantı olmadan derlendiğini doğrular.

## Yapı

```text
docs/
  .vitepress/
    config.mts               site, menüler, kenar çubukları, arama, iki dil
    theme/
      products.ts            ürün verileri — ana sayfa ve ürün başlıkları buradan beslenir
      custom.css             renkler, yazı tipleri, bileşen stilleri
      components/
        HomePage.vue         ana sayfa
        SectionPanorama.vue  ailenin etkileşimli zemin kesiti
        ProductHero.vue      ürün sayfası başlığı (kurulum, komut, port)
        Gallery.vue          büyütmeli ekran görüntüsü ızgarası
        ProductIcon.vue      ürün ikonları
  public/img/<ürün>/         ekran görüntüleri ve örnek şekilleri
  index.md, guide/, <ürün>/  Türkçe sayfalar
  en/                        İngilizce sayfalar (aynı yol yapısı)
```

### Yeni sürüm ya da yeni ürün

- Bir paketin sürümünü, PyPI durumunu veya portunu güncellemek için yalnızca `docs/.vitepress/theme/products.ts` dosyasını düzenleyin.
- Yeni bir ürün için: `products.ts`’ye bir kayıt, `config.mts` içindeki `products` listesine bir satır, `docs/<id>/` ve `docs/en/<id>/` altında `index.md`, `examples.md`, `reference.md`.

### Örneklerin kaynağı

Örnek sayfalarındaki bütün çıktılar, ilgili paketin `example` komutuyla üretilen başlangıç projesinin (ya da sayfada gösterilen küçük değişikliğin) çalıştırılmasıyla elde edilmiştir. Bir paket güncellendiğinde sayfadaki komutları yeniden çalıştırıp çıktıları güncelleyin.

## Lisans

[GNU AGPL-3.0](LICENSE) © Hasan Deniz Altuntaş

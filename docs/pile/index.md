# Lythos Pile

<ProductHero id="pile" />

Tabakalı zeminde kazıkların eksenel taşıma gücü, grup etkisi ve oturması; ayrıca kaya soketinin boyu. Dairesel ya da kare, fore ya da küçük/büyük deplasmanlı çakma bir kazık — tek başına ya da başlık altında dikdörtgen bir grupta — **bir mühendisten istenebilecek bütün yöntemlerle yan yana** kontrol edilir.

## Neler hesaplanır

1. **Çevre sürtünmesi** — kilde API RP 2A, Kulhawy & Phoon ve Sladen **α yöntemleri**, **β yöntemi** (Burland) ve **λ yöntemi** (Vijayvergiya & Focht); kumda Meyerhof **kritik derinliği** ile **K·σ′<sub>v</sub>·tan δ**; Meyerhof **SPT** kuralı.
2. **Uç direnci** — **Meyerhof**, **Vesić** (rijitlik indeksi) ve **Janbu**; kilde 9·c<sub>u</sub>, Vesić ve Janbu N<sub>c</sub>*; Meyerhof SPT kuralı.
3. **Kazık ağırlığı** — su tablası altında batık — nihai kapasiteden düşülür: Q<sub>ult,net</sub> = Q<sub>s</sub> + Q<sub>b</sub> − W, Q<sub>all</sub> = Q<sub>ult,net</sub> / GS.
4. **Grup etkisi** — **Converse–Labarre**, **Los Angeles Group**, **Seiler–Keeney** ve **Feld** verimleri ile **blok göçmesi**; grup kapasitesi küçük olandır.
5. **Gerekli boy** — hem tek kazık hem grup kontrolünü sağlayan en kısa kazık; boya karşı kapasite grafiği.
6. **Oturma** — tek kazık için **Vesić**; grup için 2/3·L’de **eşdeğer radye**, **Vesić** √(B<sub>g</sub>/D) kuralı ve **Meyerhof** SPT kuralı.
7. **Kaya soketli kazıklar** — **on iki yayımlanmış korelasyonla** birim yan sürtünme, altı yöntemle uç direnci, **her korelasyonun gerektirdiği soket boyu**, ortalama/medyan/sınırlardan tasarım boyu ve **Randolph & Wroth** ile Vesić’e göre elastik oturma.

Üzerine **parametrik veya güvenilirlik çalışması**: kazığın, grubun ya da oturmanın göçme olasılığı, güven aralığı ve β ile.

## Ekran görüntüleri

<Gallery :items="[
  { src: '/img/pile/pile_summary.png', caption: 'Kazık grubu — özet' },
  { src: '/img/pile/socket_summary.png', caption: 'Kaya soketi — özet' },
  { src: '/img/pile/pile_profile_dark_tr.png', caption: 'Gerilmeler ve çevre sürtünmesi — koyu tema, Türkçe' },
  { src: '/img/pile/pile_length.png', caption: 'Boya karşı taşıma gücü' },
  { src: '/img/pile/pile_group.png', caption: 'Grup planı ve verimler' },
  { src: '/img/pile/socket_length.png', caption: 'Korelasyonlara göre soket boyu' },
  { src: '/img/pile/pile_section.png', caption: 'Grup kesiti, kritik derinlik ve eşdeğer radye' },
  { src: '/img/pile/pile_settlement.png', caption: 'Radye altındaki gerilmeler ve yöntemlere göre oturma' }
]" />

## Hızlı başlangıç

Lythos Pile henüz PyPI’da değil; GitHub’dan kurulur:

```bash
pip install git+https://github.com/hdaltuntas/lythos-pile
lythos-pile                                    # arayüz: http://127.0.0.1:8783/
```

```bash
lythos-pile example -o proje.pile
lythos-pile run proje.pile --lang tr -o rapor.pdf          # kazık ve grubu
lythos-pile run proje.pile --socket -o rapor.pdf           # … kaya soketiyle birlikte
lythos-pile socket proje.pile -o soket.pdf                 # yalnızca kaya soketi
lythos-pile study proje.pile -o ornekler.csv
```

## Şekiller

Kritik derinlik ve eşdeğer radyeyle grup kesiti · σ′<sub>v</sub>, u<sub>0</sub>, her yöntemin birim çevre sürtünmesi ve gövde boyunca yük · yöntemlere göre çevre ve uç direnci · gerekli boyla birlikte boya karşı kapasite · grup planı ve her yöntemin verimi · radye altındaki gerilmeler ve yöntemlere göre oturma. Kaya soketi: kesit · korelasyonlara göre yan sürtünme · soket boyu · soket boyuna karşı baş oturması.

## Sonraki adımlar

- [Örnekler](./examples) — fore kazık grubu, boy taraması, grup verimleri, kaya soketi.
- [Başvuru](./reference) — bağıntılar, girdiler, modüller.

# Lythos Pile — başvuru

## Çevre sürtünmesi

Q<sub>s</sub> = Σ f<sub>s</sub>·p·Δz; gövde, tabaka sınırını aşmayan en fazla 0.25 m’lik dilimlere bölünür.

**Granüler tabakalar:** f<sub>s</sub> = K·σ′<sub>v</sub>·tan δ, K = (K/K<sub>0</sub>)·K<sub>0</sub>, K<sub>0</sub> = 1 − sin φ′, δ = (δ/φ′)·φ′. K/K<sub>0</sub> fore kazıkta 1.0, küçük deplasmanlı çakmada 1.2, büyük deplasmanlıda 1.4’tür (girilmedikçe). Kritik derinlik açıkken σ′<sub>v</sub> kumda z<sub>c</sub> = 15·D’deki değerinde sabit tutulur.

**Kohezyonlu tabakalar:**

| Yöntem | f<sub>s</sub> |
| --- | --- |
| API RP 2A (1987) | α·c<sub>u</sub>, α = 0.5·ψ<sup>−0.5</sup> (ψ ≤ 1), 0.5·ψ<sup>−0.25</sup> (ψ > 1), ψ = c<sub>u</sub>/σ′<sub>v</sub>, α ≤ 1 |
| Kulhawy & Phoon (1993) | α·c<sub>u</sub>, α = 0.21 + 0.26·p<sub>a</sub>/c<sub>u</sub> ≤ 1 |
| Sladen (1992) | α·c<sub>u</sub>, α = C·(σ′<sub>v</sub>/c<sub>u</sub>)<sup>0.45</sup> ≤ 1; C = 0.4 fore, 0.5 çakma |
| β — Burland (1973) | (1 − sin φ′)·tan φ′·√OCR·σ′<sub>v</sub> |
| λ — Vijayvergiya & Focht (1972) | λ·(σ′<sub>v</sub> + 2c<sub>u</sub>), λ kazığın gömülme boyundan |

**SPT (Meyerhof 1976):** f<sub>s</sub> = 0.02·p<sub>a</sub>·N<sub>60</sub> (büyük deplasmanlı), aksi hâlde 0.01·p<sub>a</sub>·N<sub>60</sub>.

## Uç direnci

| Zemin | Yöntem | q<sub>b</sub> |
| --- | --- | --- |
| Kum | Meyerhof (1976) | σ′<sub>v</sub>·N<sub>q</sub>* ≤ 0.5·p<sub>a</sub>·N<sub>q</sub>*·tan φ′ |
| Kum | Vesić (1977) | σ′<sub>v</sub>·N<sub>q</sub>*(I<sub>rr</sub>) |
| Kum | Janbu (1976) | σ′<sub>v</sub>·N<sub>q</sub>*, N<sub>q</sub>* = (tan φ′ + √(1 + tan²φ′))²·e<sup>2η′·tan φ′</sup> |
| Kil | Skempton / Meyerhof | 9·c<sub>u</sub> |
| Kil | Vesić | N<sub>c</sub>*·c<sub>u</sub>, N<sub>c</sub>* = 4/3·(ln I<sub>r</sub> + 1) + π/2 + 1 |
| Kil | Janbu, φ = 0 | N<sub>c</sub>* = 2 + 2η′ (η′ = 90°’de 5.14) |
| Her ikisi | SPT (Meyerhof 1976) | 0.4·p<sub>a</sub>·N<sub>60</sub>·L<sub>b</sub>/D ≤ 4·p<sub>a</sub>·N<sub>60</sub> |

Uçtan 3·D aşağıdaki daha zayıf bir tabaka raporda belirtilir.

## Ağırlık, kapasite, kontrol

```text
W = Ab·[γp·(su üstündeki boy) + (γp − γw)·(su altındaki boy)]
Qult = Qs + Qb,   Qult,net = Qult − W,   Qall = Qult,net / FS
```

Her çevre yöntemi ile her uç yöntemi birleşimi raporlanır; seçilen çift kontrolleri yapar.

## Gruplar

B<sub>g</sub> × L<sub>g</sub> = [(n<sub>1</sub> − 1)s<sub>x</sub> + D] × [(n<sub>2</sub> − 1)s<sub>y</sub> + D].

| Yöntem | η |
| --- | --- |
| Converse–Labarre | 1 − θ·[(n<sub>1</sub> − 1)n<sub>2</sub> + (n<sub>2</sub> − 1)n<sub>1</sub>]/(90·n<sub>1</sub>·n<sub>2</sub>), θ = arctan(D/s) [°] |
| Los Angeles Group | 1 − D/(π·s·n<sub>1</sub>·n<sub>2</sub>)·[n<sub>1</sub>(n<sub>2</sub> − 1) + n<sub>2</sub>(n<sub>1</sub> − 1) + √2(n<sub>1</sub> − 1)(n<sub>2</sub> − 1)] |
| Seiler–Keeney | 1 − [36s/(75s² − 7)]·(n<sub>1</sub> + n<sub>2</sub> − 2)/(n<sub>1</sub> + n<sub>2</sub> − 1) + 0.3/(n<sub>1</sub> + n<sub>2</sub>) |
| Feld | 1 − (düz ve çapraz komşu sayısı)/16, grup üzerinde ortalama |

**Blok göçmesi:** grup tek bir blok olarak; kilde f<sub>s</sub> = c<sub>u</sub>, kumda K<sub>0</sub>·σ′<sub>v</sub>·tan φ′; taban kilde Skempton N<sub>c</sub>.

```text
Qg,ult = min(η·n·Qult, Qblok),   Qg,all = (Qg,ult − n·W) / FS,   Q ≤ Qg,all
```

## Oturma

| Durum | Yöntem |
| --- | --- |
| Tek kazık | Vesić (1977): s<sub>1</sub> (gövde kısalması) + s<sub>2</sub> (uç) + s<sub>3</sub> (gövde boyunca) |
| Grup | 2/3·L’de eşdeğer radye, 2:1 yayılma; killer C<sub>c</sub>, C<sub>r</sub>, e<sub>0</sub>, OCR ile konsolide olur, diğerleri elastik sıkışır |
| Grup | Vesić s·√(B<sub>g</sub>/D) |
| Grup | Meyerhof SPT kuralı |

## Kaya soketi

| Büyüklük | Yöntem |
| --- | --- |
| Yan sürtünme | 12 korelasyon: Rosenberg & Journeaux, Horvath & Kenney, Meigh & Wolski, Williams vd., Reynolds & Kaderabek, Gupton & Logan, Rowe & Armitage, Carter & Kulhawy, Toh vd., Zhang & Einstein, O’Neill & Reese / AASHTO, Kulhawy vd.; q<sub>u</sub> ≤ f′<sub>c</sub>; zayıf kaya kuralları bir sınırın üzerinde dışarıda bırakılır |
| Uç direnci | Coates, Rowe & Armitage, Carter & Kulhawy (Hoek–Brown), Zhang & Einstein, AASHTO, CFEM |
| Soket boyu | Q<sub>s</sub>/GS<sub>yan</sub> + Q<sub>b</sub>/GS<sub>uç</sub> − W = Q, ikiye bölmeyle, her korelasyon ve tasarım için |
| Kaya kütlesi modülü | RQD’den (Gardner), GSI’den (Hoek & Diederichs) ya da doğrudan |
| Oturma | Randolph & Wroth (uçlu ve uçsuz), Vesić; artı örtü içindeki kısalma |

Tasarım istatistiği `design` ∈ {`mean`, `median`, `lower`, `upper`} ya da tek bir korelasyon; uç için `base_design` ∈ {`none`, `min`, `mean`} ya da tek bir yöntem.

## Girdiler

| Grup | Alanlar |
| --- | --- |
| **Kazık** | dairesel / kare, D, L, kazık başı derinliği, imalat (`bored`, `driven_low`, `driven_high`), γ<sub>p</sub>, E<sub>p</sub> |
| **Yük** | başlık altında gruba gelen düşey yük |
| **Grup** | iki doğrultuda kazık sayısı, aralıklar, verim yöntemi, blok göçme açık/kapalı (1 × 1 tek kazıktır) |
| **Zemin profili** | kalınlık, granüler / kohezyonlu, γ, γ<sub>doy</sub>, φ′, c<sub>u</sub>, OCR, N<sub>60</sub>, E, ν, C<sub>c</sub>, C<sub>r</sub>, e<sub>0</sub> |
| **Yöntemler** | kil yöntemi, uç yöntemi, kumda K/K<sub>0</sub> ve δ/φ′, kritik derinlik, Janbu η′, Sladen C, SPT kuralı; ağırlık düşülür / batık |
| **Oturma** | kontrol yöntemi, eşdeğer radye derinliği, yük yayılması, çevre sürtünmesinin dağılımı |
| **Ölçütler** | GS, izin verilen oturma, boy araması |
| **Kaya soketi** | çap ve boy, baş ve kaya yüzeyi derinlikleri, yük; q<sub>u</sub>, modül (RQD / GSI / doğrudan), GSI, m<sub>i</sub>, D, ν, süreksizlik aralığı ve açıklığı; f′<sub>c</sub>, E<sub>c</sub>; tasarım istatistiği ve güvenlik sayıları |

## Modüller

| Dosya | İçerik |
| --- | --- |
| `profile.py` | Tabakalı kolon, gerilmeler, dilimler, ortalamalar |
| `axial.py` | Birim çevre sürtünmesi ve uç direnci, yönteme göre |
| `group.py` | Grup düzeni, verimler, bloğun Skempton N<sub>c</sub>’si |
| `settlement.py` | Vesić tek kazık oturması, eşdeğer radye, grup kuralları |
| `socket.py` | Kaya soketleri: korelasyonlar, uç, boy, Randolph & Wroth |
| `engine.py` | Kazık analizi: gövde, uç, ağırlık, grup, oturma, boy |
| `study.py`, `report.py`, `web/` | Çalışmalar, rapor, arayüz |

## Doğrulama

Her formül bir el hesabına karşı test edilir: α, β ve λ yöntemleri, Meyerhof tablosu ve sınırı, Vesić ve Janbu katsayıları, dört verim, Feld sayımı, terim terim Vesić oturması, kilin konsolidasyonu, eşdeğer radye, on iki soket korelasyonu ve altı uç yöntemi, Randolph & Wroth’un rijit limitleri. Motor, elle çözülen basit durumlarda (kil kazığı, kum kazığı, ağırlık, su tablası, blok göçmesi, gerekli boy) sınanır.

Ayrıntılar: [docs/theory.md](https://github.com/hdaltuntas/lythos-pile/blob/main/docs/theory.md).

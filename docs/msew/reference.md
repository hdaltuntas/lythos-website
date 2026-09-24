# Lythos MSEW — başvuru

## Hesaplananlar

| Büyüklük | Yöntem |
| --- | --- |
| K<sub>a</sub> | Coulomb (AASHTO 3.11.5.3), 10° yüz eğiminden itibaren θ = 90 + ω; blok arkasında δ = β, blok içinde δ = 0 |
| Kuvvetler | V<sub>1</sub> = γ<sub>r</sub>·H·L, blok üzerindeki şev kaması, F<sub>1</sub> = ½·K<sub>a</sub>·γ·h² ve F<sub>2</sub> = K<sub>a</sub>·q·h, β’da, h = H + L·tan β |
| Kayma | tan φ<sub>r</sub>, tan φ<sub>f</sub> + c·L ve C<sub>ds</sub>·tan φ<sub>r</sub>’nin en zayıfı; blok üzerindeki hareketli yük dışarıda |
| Devrilme, dışmerkezlik | topuk etrafında momentler; e ≤ L/6 (ASD), L/3 (LRFD), L/4 (sismik ASD) |
| Taşıma gücü | B′ = L − 2e, σ<sub>v</sub> = ΣV/B′; Terzaghi, Meyerhof, Hansen, Vesić, EN 1997-1’e göre q<sub>ult</sub> |
| T<sub>max</sub> | K<sub>r</sub>·σ<sub>v</sub>·S<sub>v</sub>, σ<sub>v</sub> = γ<sub>r</sub>·Z + σ<sub>2</sub> + q + Δσ<sub>v</sub> (2:1 şerit yük); şeritlerde K<sub>r</sub>/K<sub>a</sub> 6 m boyunca 1.7 → 1.2 |
| Aktif bölge | Rankine 45 + φ/2 (uzayabilir), çift doğrulu 0.3·H<sub>1</sub> (uzamaz) |
| Sıyrılma | P<sub>r</sub> = F*·α·σ′<sub>v</sub>·L<sub>e</sub>·C·R<sub>c</sub>, C = 2, hareketli yük yok; F* = C<sub>i</sub>·tan φ ya da 6 m boyunca F*<sub>0</sub> → tan φ |
| Dayanım | T<sub>ult</sub>/(RF<sub>ID</sub>·RF<sub>CR</sub>·RF<sub>D</sub>)·R<sub>c</sub>; çinko ve çelik korozyonundan sonra E<sub>c</sub> ile F<sub>y</sub>·b·E<sub>c</sub>/S<sub>h</sub> |
| LRFD | EV 1.00/1.35, EH 1.50, ES 0.75/1.50, LS 1.75; φ girildiği gibi |
| Deprem | A<sub>m</sub> = (1.45 − A)·A; P<sub>AE</sub> = 0.375·A<sub>m</sub>·γ·H² (arka şevde M–O) 0.6·H’de, ½P<sub>AE</sub> + P<sub>IR</sub>; L<sub>e</sub>’ye göre P<sub>i</sub> = A<sub>m</sub>·W<sub>a</sub> |
| Gerekli boy | her dış ve sıyrılma kontrolü sağlanana dek eşit L üzerinde ikiye bölme |

## Girdiler

| Grup | Alanlar |
| --- | --- |
| **Duvar** | tasarım yüksekliği H, gömülme d, yüz eğimi ω, arka şev β, topuk önündeki şev, yüz kalınlığı |
| **Sürşarjlar** | kalıcı ve hareketli üniform sürşarj; şerit yük (P, genişlik, yüzden uzaklık, kalıcı/hareketli) |
| **Zeminler** | donatılı dolgu (γ, φ′), tutulan dolgu (γ, φ′), temel zemini (γ, γ<sub>doy</sub>, φ′, c′ — ya da φ = 0 ve c<sub>u</sub>), taban altındaki su tablası |
| **Donatı türleri** (tablo) | ad, tür (çelik şerit, polimer şerit, geogrid, geotekstil); geosentetikler: T<sub>ult</sub>, RF<sub>ID</sub>, RF<sub>CR</sub>, RF<sub>D</sub>, R<sub>c</sub>, C<sub>i</sub>; çelik şeritler: b, t, F<sub>y</sub>, S<sub>h</sub>, üstte F*<sub>0</sub>; hepsi: ölçek düzeltmesi α ve bağlantı dayanım oranı CR |
| **Tabakalar** (tablo) | tesviye tabanından yükseklik z, boy L, tür — ya da yerleşim üreteci: ilk tabaka, S<sub>v</sub>, L = oran·H (en küçük boyun altına inmez) veya sabit L |
| **Korozyon** | tasarım ömrü, galvaniz kalınlığı, karbon çeliği kayıp hızı |
| **Tasarım yöntemi** | ASD (kayma, devrilme, dışmerkezlik, taşıma, çekme, sıyrılma, bağlantı GS’leri; çelik için 0.55·F<sub>y</sub>) ya da LRFD (φ’ler); aktif bölge ötesinde en küçük boy |
| **Taşıma gücü** | katsayı takımı; gömülme ve yük eğimi açık/kapalı; geosentetiğin doğrudan kayma katsayısı C<sub>ds</sub> |
| **Deprem** | A, sismik yüklemede F* azaltması |
| **Yükseklik çalışması** | aralık ve adım |

## Proje dosyası (`.msew`)

JSON; tablolar dahil her girdiyi içerir. Tabaka listesi ve tür tablosu örneği:

```json
{
  "H": 6.0, "embedment": 0.6, "q_live": 10.0,
  "gamma_r": 19.0, "phi_r": 34.0, "phi_b": 30.0, "phi_f": 30.0, "c_f": 5.0,
  "layout_z1": 0.375, "layout_Sv": 0.75, "layout_rule": "ratio", "layout_ratio": 0.9,
  "design": "asd", "bearing_method": "vesic", "design_life": 75.0,
  "reinforcement_types": [
    {"name": "Geogrid 80", "kind": "geogrid", "Tult": 80.0, "RFID": 1.1, "RFCR": 1.6,
     "RFD": 1.1, "Rc": 1.0, "Ci": 0.67, "alpha": 0.8, "CR": 0.8}
  ],
  "layers": [{"z": 0.375, "L": 5.4, "type": "Geogrid 80"}]
}
```

## Modüller

| Dosya | İçerik |
| --- | --- |
| `earth.py` | Coulomb, Rankine, Mononobe–Okabe, A<sub>m</sub> |
| `reinforcement.py` | Korozyon, uzun süreli dayanım, K<sub>r</sub>/K<sub>a</sub>, F*, sıyrılma |
| `catalog.py` | Tipik piyasa donatıları |
| `factors.py`, `capacity.py` | Taşıma gücü katsayıları ve genel denklem (Lythos Bearing’den) |
| `engine.py` | Duvar: kuvvetler, dış kontroller, taşıma, iç kontroller, deprem, gerekli boy, yerleşim üreteci |
| `heights.py`, `height_plots.py` | Yükseklik çalışması, şekilleri, CSV / XLSX |
| `report.py`, `pdf.py`, `web/` | Rapor ve arayüz |

## Doğrulama

Testler toprak basıncı katsayılarını kapalı formlarına; korozyonu ve dayanımları, kuvvetleri, dış kontrolleri, taşıma gücünü, bir tabakanın çekme ve sıyrılmasını el hesaplarına; LRFD katsayılarını, sismik kuvvetleri, gerekli boyu bir sınır olarak, reddedilen girdileri ve uyarıları, raporu üç biçimde ve arayüzü sınar.

## Kapsam dışı

Global ve bileşik duraylılık, oturma ve drenaj. Ayrıntılar: [docs/theory.md](https://github.com/hdaltuntas/lythos-msew/blob/main/docs/theory.md).

# Lythos SPWA — başvuru

## Yöntem notları

- **Limit denge:** uç etrafında (konsol, basitleştirilmiş yöntem) ya da en alt ankraj etrafında (serbest zemin) moment dengesi. İç kuvvetler teorik derinlik D<sub>req</sub>’de hesaplanır; D<sub>design</sub> = yukarı_yuvarla(1.2·D<sub>req</sub>) imal edilen boydur. Birden fazla ankrajda LE dağılımı yaklaşıktır — kiriş-yay sonuçları belirleyici olmalıdır.
- **Deprem:** düşey perde için Mononobe-Okabe K<sub>AE</sub> / K<sub>PE</sub>; su tablası altında θ, γ<sub>doy</sub>/γ′’den (tutulan boşluk suyu); perdenin önündeki serbest suyun Westergaard hidrodinamik basıncı itici yük olarak uygulanır. İki düzeltme de kapatılabilir.
- **Kiriş-yay:** düğüm başına p = kırp(p<sub>ref</sub> ± k<sub>s</sub>·Δw, p<sub>a</sub>, p<sub>p</sub>), sükûnetten başlangıç; ankrajlar T = maks(0, P<sub>0</sub>·cos α/s + k<sub>h</sub>·Δw); moment eleman eğriliğinden (EI·w″).
- **Düşey kontrol (gösterge):** ΣT<sub>h</sub>·tan α, gömülü boy boyunca ∫(p<sub>a</sub> + p<sub>p</sub>)·tan δ çevre sürtünmesine karşı; uç direnci yok.

## Girdiler

| Grup | Alanlar |
| --- | --- |
| **Geometri** | kazı yüksekliği H, dolgu eğimi β, deniz/kazı tabanı eğimi α, duvar sürtünmesi δ |
| **Yükler ve su** | üniform sürşarj; aktif ve pasif taraftaki su seviyeleri, γ<sub>w</sub> |
| **Zemin profili** | tabaka başına kalınlık, γ, γ<sub>doy</sub>, φ, kohezyon, k<sub>s</sub> ve k<sub>s</sub> yöntemi (elle, Ménard-Bourdon, Schmitt), E<sub>M</sub> |
| **Ankrajlar** | derinlik, açı, EA, serbest boy, yatay aralık, ön germe |
| **Kesit** | üretici, kesit modeli (veritabanından I ve W), çelik sınıfı |
| **Güvenlik** | GS<sub>φ</sub>, GS<sub>c</sub>, eğilme GS, gömülme artırma katsayısı (1.2), yuvarlama adımı |
| **Deprem** | açık/kapalı, k<sub>h</sub>, k<sub>v</sub>, batık θ, hidrodinamik basınç |
| **Kiriş-yay** | açık/kapalı, aşamalı, fazla kazı, gömülme (0 = D<sub>design</sub>), su modu (son aşamada / verildiği gibi) |
| **Deplasman ölçütü** | FHWA H/120, H/100 veya H/240 |

## Proje dosyası (`.spwa`)

```json
{
  "excavation_depth_H": 8.0, "surcharge_load": 15.0, "wall_friction_delta": 20.0,
  "water_level_active": 4.0, "water_level_passive": 7.0,
  "is_seismic": true, "kh": 0.1, "kv": 0.0,
  "selected_section_model": "NZ 26", "selected_steel_grade": "S355",
  "bs_enabled": true, "bs_staged": true, "bs_overdig": 0.5,
  "soil_profile": [
    {"name": "Sloped Sandy Gravel", "thickness": 25.0, "gamma": 19.5, "gamma_sat": 21.0,
     "phi": 38, "cohesion": 0, "k_s": 30000.0, "k_s_method": "manual"}
  ],
  "anchors": [
    {"depth": 1.5, "angle": 15.0, "EA": 117000.0, "free_length": 12.0, "spacing": 2.5, "prestress": 0.0},
    {"depth": 4.0, "angle": 15.0, "EA": 117000.0, "free_length": 12.0, "spacing": 2.5, "prestress": 0.0}
  ]
}
```

## Modüller

| Dosya | İçerik |
| --- | --- |
| `analysis_engine.py` | Serbest zemin desteği: Coulomb / Mononobe-Okabe basınçları, gömülme (brentq), ankraj kuvvetleri, D<sub>req</sub>’de diyagramlar, gerilme / deplasman / düşey kontroller |
| `beam_spring.py` | Aşamalı inşaatlı, çekme-yalnız eğik ankrajlı elastoplastik Winkler kirişi; Ménard-Bourdon veya Schmitt’ten k<sub>s</sub> |
| `study.py`, `study_plots.py` | Parametrik (OAT / ızgara) ve güvenilirlik (LHS / Monte Carlo): isteğe bağlı Gauss kopula korelasyonu, paralel çalıştırıcı, duyarlılıklar, %95 GA ile P<sub>f</sub> ve β |
| `plotting.py`, `plot_style.py` | Şekiller (şema + diyagramlar, 4 panelli kiriş-yay), temaya duyarlı |
| `report.py`, `pdf.py` | Hesap raporu: PDF, HTML, DOCX |
| `config.py`, `section_database.json` | Varsayılanlar, tema, çeviriler; palplanş kesitlerinin I [m⁴/m] ve W [m³/m] değerleri |
| `web/` | Yerel HTTP sunucusu, oturum ve tarayıcı arayüzü |

## Doğrulama

106 test: motor, kiriş-yay, rapor, çalışma, formlar, web ve paketleme. Hesap çekirdekleri kapalı form ve yayımlanmış durumlara karşı; rapor üç biçimde; arayüz oturum ve HTTP katmanıyla sınanır.

```bash
pip install -e ".[dev]"
pytest -q
```

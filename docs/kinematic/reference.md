# Lythos Kinematic — başvuru

## Paket düzeni

```text
main.py                    klondan kurmadan çalıştırma
lythoskinematic/
  cli.py                   komut satırı (web · screen · run · example)
  i18n.py                  dil anahtarı; iki dilli metin yardımcısı T("tr", "en")
  forms.py                 girdi şeması ve okuyucular — alan başına tek tanım
  stereonet.py             ortak alt yarıküre izdüşümü (ek bağımlılık yok)
  render.py                tarayıcı ve rapor için PNG şekiller
  kinematics/              tarama çekirdeği — arayüzden bağımsız
    engine.py              Markland ölçütleri + Monte Carlo
    plots.py               tarama stereoneti
    report.py              tarama PDF raporu
  rockslope/               limit denge çekirdeği — arayüzden bağımsız
    wedge.py planar.py toppling.py bolts.py core.py report.py
  web/
    server.py              HTTP yolları (yalnızca standart kütüphane)
    session.py             çalışma oturumu: analizler, şekiller, raporlar
    static/                index.html · style.css · app.js
```

Formlar `forms.py`’den üretilir: bir alanın anahtarı, etiketi, birimi, aralığı ve varsayılanı bir kez, Python’da yazılır; sayfa sunucunun gönderdiğini çizer. Dil değiştirmek şemayı yeniden istemekten ibarettir.

## Komut satırı

| Komut | Ne yapar |
| --- | --- |
| `lythos-kinematic` | arayüzü açar (port 8778) |
| `lythos-kinematic web --port 9000 --lang EN --no-browser` | arayüz, seçeneklerle |
| `lythos-kinematic example -o girdiler.json` | başlangıç girdi dosyası |
| `lythos-kinematic screen girdiler.json -o tarama.pdf` | kinematik tarama, isteğe bağlı PDF |
| `lythos-kinematic run girdiler.json --mode wedge -o kama.pdf` | limit denge: `wedge`, `planar` veya `toppling` |

## Girdi dosyası

Girdi dosyası arayüzün kaydettiği JSON’un aynısıdır. Öne çıkan alanlar:

| Önek | Anlamı |
| --- | --- |
| `slope_dip`, `slope_dir`, `friction`, `lateral`, `mode`, `trials` | tarama: şev yüzü, sürtünme, yanal sınır, mod, Monte Carlo deneme sayısı |
| `joints[]` | `label`, `dip`, `dipdir`, `std` (yönelim belirsizliği) |
| `j1_*`, `j2_*`, `face_*`, `up_*`, `tc_*`, `H`, `gamma`, `water_mode`, `ah` | kama: iki eklem (eğim, yön, c, φ), yüz, üst şev, çekme çatlağı, yükseklik, su, deprem |
| `p_*` | düzlemsel: H, ψ<sub>f</sub>, ψ<sub>p</sub>, ψ<sub>s</sub>, c, φ, γ, çekme çatlağı, su, deprem, destek |
| `t_*` | devrilme: yüz, üst şev, süreksizlik ve taban açıları, Δx, blok sayıları, φ |
| `b_*` | bulon: kapasite, çap, bağ dayanımı, GS, en küçük boy, aralık sınırları |
| `rp_*` | rapor başlığı: proje, konum, km, hazırlayan, kontrol eden, onaylayan |

## Kinematik ölçütler

| Mod | Kritik koşul |
| --- | --- |
| Düzlemsel | eğim yönü şev yönünün ±yanal sınırı içinde; φ ≤ eğim ≤ şev eğimi |
| Kama | iki düzlemin kesişim çizgisinin dalım yönü ±yanal sınır içinde; φ ≤ dalım ≤ şevin o yöndeki görünür eğimi |
| Eğilmeli devrilme | eğim yönü şevin ters yönünün ±yanal sınırı içinde; normalin dalımı (90° − eğim) ≤ şev eğimi − φ |

Monte Carlo, eğim ve eğim yönüne normal dağılımlı belirsizlik uygular ve her denemede seçilen mekanizmayı tamamen vektörel olarak kontrol eder. Risk sınıfı: P < %5 düşük, < %15 orta, aksi hâlde yüksek.

## Doğrulama

```bash
pip install -e ".[dev]"
pytest
```

- **Kama** — Hoek & Bray kapalı form kısa çözümüyle birebir (kuru 1.696 / dolu 1.065).
- **Düzlemsel** — c = 0, kuru: tan φ / tan ψ<sub>p</sub>.
- **Devrilme** — Wyllie & Mah 9. bölüm örneği (blok yükseklikleri, göçme modları, φ ≈ 38°).
- **Kinematik** — kesişim çizgisi, limit denge çekirdeğindeki bağımsız vektör uygulamasıyla çapraz kontrol edilir; sıfır belirsizlikte Monte Carlo deterministik 0/100 sonucuna inmelidir.
- **Stereonet** — izdüşüm yarıçapları analitik Schmidt/Wulff değerlerine karşı; kutupların eğim vektörüne dikliği.
- **i18n** — her özet dili izler, sabit genişlikli etiket sütunu iki dilde de hizalı kalır, sayılar değişmez.
- **Web** — şema her alanı kapsar; oturumun analizleri doğrulanmış sonuçları üretir; arka plan işleri durum sorgusunu kilitlemeden biter; HTTP yolları PNG, PDF ve yığın izi yerine düz hata mesajları döndürür.

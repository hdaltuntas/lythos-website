---
title: "Ortak mimari — tarayıcı arayüzü, komut satırı, Python"
description: "Lythos ailesinin ortak mimarisi: tarayıcıdan çalıştırılan yerel arayüz, komut satırı, Python betikleri, JSON proje dosyaları, PDF/HTML/Word raporlar."
---

# Ortak mimari

Lythos ailesinin sekiz üyesi de aynı mimariyi paylaşır; Lythos LE aynı fikri bağımlılıksız bir çekirdekle uygular. Birini öğrenen hepsini kullanır.

## Katmanlar

```text
paket/
  engine.py            hesap motoru — arayüzden bağımsız, saf fonksiyonlar
  forms.py             girdi şeması: her alanın anahtarı, etiketi, birimi, aralığı, varsayılanı
  summary.py           sonuçlar kart ve metin olarak — tarayıcı ve komut satırı için ortak
  study.py             parametrik ve güvenilirlik çalışmaları
  plotting.py          Matplotlib şekilleri, temaya duyarlı, ekransız (Agg)
  report.py · pdf.py   tek HTML derlemesi → PDF, HTML, DOCX
  i18n.py              her metin Türkçe ve İngilizce, yan yana
  cli.py               web · run · study · example
  web/
    server.py          yalnızca standart kütüphaneyle HTTP sunucusu
    session.py         tek çalışma oturumu: analizler, şekiller, raporlar
    static/            index.html · style.css · app.js
main.py                klondan kurmadan çalıştırma
```

**Formlar tek yerde tanımlanır.** Bir alanın etiketi, birimi, aralığı ve varsayılanı yalnızca `forms.py`’de, Python’da yazılır; sayfa sunucunun gönderdiğini çizer. JavaScript’te etiketlerin ikinci bir kopyası yoktur; dil değiştirmek şemayı yeniden istemekten ibarettir.

## Neden tarayıcı?

Arayüz, kendi makinenizde çalışan küçük bir HTTP sunucusudur ve yalnızca `127.0.0.1`’i dinler. Bu seçimin nedenleri:

- Masaüstü araç takımı (Qt vb.) bir ekran ister; tarayıcı arayüzü **uzak oturumda, konteynerde ve ekransız sunucuda** aynı çalışır.
- Standart kütüphane dışında hiçbir bağımlılık getirmez.
- Veri makineden çıkmaz: bulut yok, hesap yok, telemetri yok.

Lythos SPWA ve Lythos Kinematic başlangıçta PyQt masaüstü programlarıydı; hesap çekirdekleri aynen korunarak bu mimariye taşındılar.

## Dört komut

Bearing, Settle, Pile, MSEW ve SPWA aynı komut düzenini kullanır (Kinematic ve FEA çok benzer):

```bash
lythos-<ad>                                  # arayüz (varsayılan)
lythos-<ad> web --port 9000 --lang tr --no-browser
lythos-<ad> example -o proje.<uzantı>        # başlangıç proje dosyası
lythos-<ad> run proje.<uzantı> -o rapor.pdf  # analiz et, sonucu yaz, rapor üret
lythos-<ad> study proje.<uzantı> -o ornekler.csv
```

`run` ve `study`, arayüzün **Kaydet** ile yazdığı dosyanın aynısını okur: tarayıcıda kurulan bir durum, gözetimsiz ve tekrar üretilebilir biçimde yeniden çalışır.

## Proje dosyaları

Proje dosyaları okunabilir JSON’dur: `.bearing`, `.settle`, `.pile`, `.msew`, `.spwa`. Eksik alanlar varsayılanlarını alır; böylece eski dosyalar yeni sürümlerde açılır. Dosyaları sürüm kontrolünde tutmak ve `diff` ile karşılaştırmak kolaydır.

## Python’dan betik

Arayüzün kullandığı oturum nesnesi doğrudan içe aktarılabilir. Bütün aile için kalıp aynıdır:

```python
from lythosbearing import forms
from lythosbearing.web.session import Session

values = forms.defaults()          # arayüzün başlangıç projesi, düz bir sözlük
values["B"] = 3.0                  # herhangi bir girdiyi değiştirin

session = Session(lang="tr")
result = session.analyse(values)   # kartlar, tablolar, metin ve sayılar
print(result["headline"])
session.report("pdf", "rapor.pdf") # ya da "html", "docx"
```

`result["text"]` komut satırının yazdığı metnin aynısıdır; `result["cards"]` ve tablolar arayüzdekilerdir; sayısal alanlar (`q_ult`, `FS`, `required_width` …) doğrudan hesaplarda kullanılabilir.

## Raporlar

Raporlar tek bir HTML derlemesinden üretilir ve üç biçime dökülür: **PDF** (ReportLab), **bağımsız HTML** (bütün şekiller gömülü) ve **Word**. Üçü de aynı şeyi söyler. Rapor; girdileri, her yöntemin sonucunu, kontrolleri, şekilleri, uyarıları, yöntem notlarını ve varsa çalışmayı, arayüz hangi dildeyse o dilde içerir.

## Parametrik ve güvenilirlik çalışmaları

Bearing, Settle, Pile ve SPWA’da **Çalışma** sekmesi herhangi bir girdiyi tarar:

- **Aralık** — birer birer (OAT) tarama ya da tam ızgara,
- **Dağılım** — normal, lognormal, düzgün; ortalama ve değişim katsayısı ile; Latin hiperküp (LHS) veya Monte Carlo örnekleme.

Sonuçlar: Spearman sıra korelasyonu ile duyarlılıklar, tornado grafikleri, histogram ve saçılım, %95 güven aralığıyla **göçme (veya aşılma) olasılığı** ve **güvenilirlik indeksi β**. Örnekler CSV veya XLSX olarak dışa aktarılır ve raporun bir bölümü olur. MSEW’de bunun yerine bir **duvar yüksekliği çalışması** vardır.

## Tema ve yazı tipleri

Arayüzler sistemin açık/koyu ayarını izler; başlıktaki düğme bunu sabitler. Şekiller temaya göre çizilir. Aile aynı görsel dili paylaşır: fildişi ve kömür yüzeyler, kil turuncusu vurgu, başlıklarda serif — bu site de aynı dili kullanır.

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { products, categories, type Category, type Lang } from '../products'
import ProductIcon from './ProductIcon.vue'
import SectionPanorama from './SectionPanorama.vue'

const { lang } = useData()
const L = computed<Lang>(() => (lang.value.startsWith('en') ? 'en' : 'tr'))
const p = computed(() => (L.value === 'en' ? '/en' : ''))
const link = (path: string) => withBase(`${p.value}${path}`)

const text = {
  tr: {
    eyebrow: 'Açık kaynak · AGPL-3.0 · Python',
    title1: 'Zemin için hesap,',
    title2: 'tek bir aileden.',
    lead: 'Lythos; şevler, temeller ve istinat yapıları için sekiz geoteknik mühendisliği yazılımından oluşan bir ailedir. Hepsi aynı mimariyle tarayıcıdan sürülür, Türkçe ve İngilizce çalışır, PDF/HTML/Word rapor üretir ve her sonucu kapalı form çözümlere karşı test eder.',
    start: 'Hemen başlayın',
    explore: 'Yazılımları keşfedin',
    termNote: 'Tarayıcıda açılır; veriniz makinenizden çıkmaz.',
    stats: [
      ['8', 'yazılım'],
      ['2', 'dil — Türkçe ve İngilizce'],
      ['3', 'arayüz — tarayıcı, komut satırı, Python'],
      ['3', 'rapor biçimi — PDF, HTML, Word']
    ],
    familyTitle: 'Aile',
    familyLead: 'Her araç tek bir işi derinlemesine yapar; birlikte bir projenin geoteknik tasarımının tamamını kapsar.',
    overview: 'Genel bakış',
    examples: 'Örnekler',
    notOnPypi: 'GitHub’dan kurulur',
    archTitle: 'Tek mimari, sekiz araç',
    archLead: 'Birini öğrenen hepsini kullanır. Aynı arayüz düzeni, aynı dosya mantığı, aynı komutlar.',
    features: [
      ['Tarayıcıdan sürülür', 'Arayüz, kendi makinenizde çalışan küçük bir HTTP sunucusudur. Uzak oturumda, konteynerde ve ekransız sunucuda da çalışır.', 'M4 6h24v16H4z M4 10h24 M12 26h8 M16 22v4'],
      ['Çift dilli', 'Her etiket, sonuç metni, şekil ve rapor Türkçe ve İngilizce; dil çalışırken değişir, sayılar değişmez.', 'M4 8h12 M10 5v3 M6 8c1 5 5 9 9 10 M14 8c-1 5-5 9-9 10 M18 27l5-12 5 12 M20 23h6'],
      ['Tek kaynaktan rapor', 'PDF, bağımsız HTML ve Word raporlar tek bir derlemeden çıkar; üçü de aynı şeyi söyler.', 'M8 3h11l6 6v20H8z M19 3v6h6 M12 15h9 M12 19h9 M12 23h6'],
      ['Proje dosyaları', 'Girdiler okunabilir JSON olarak kaydedilir. Tarayıcıda kurulan bir durum komut satırında gözetimsiz yeniden çalışır.', 'M5 6h8l3 3h11v17H5z M11 17l-3 3 3 3 M21 17l3 3-3 3'],
      ['Güvenilirlik çalışmaları', 'Herhangi bir girdiyi aralık ya da dağılım olarak tarayın: LHS, Monte Carlo, duyarlılık, göçme olasılığı ve β.', 'M4 27h24 M6 27V17 M11 27V9 M16 27V5 M21 27V12 M26 27V20'],
      ['Doğrulanmış', 'Her yöntem yayımlanmış tablolara, el hesaplarına ve kapalı form çözümlere karşı pytest ile sabitlenir.', 'M16 3l10 4v8c0 7-5 11-10 13C11 26 6 22 6 15V7z M11 15l4 4 7-8']
    ],
    waysTitle: 'Üç yoldan erişim',
    waysLead: 'Aynı hesap motoru; ister tarayıcıdan tıklayarak, ister komut satırından, ister kendi Python betiğinizden.',
    tabs: ['Tarayıcı', 'Komut satırı', 'Python'],
    browserCap: 'Lythos Bearing arayüzü: altı yöntem yan yana, kontroller ve gerekli genişlik.',
    cliCap: 'Tarayıcıda kaydedilen proje dosyası, komut satırında aynı sonucu verir.',
    pyCap: 'Genişliği tarayın, her yöntem için güvenlik sayısını görün — gerçek çıktı.',
    workflowTitle: 'Bir projede hepsi birlikte',
    workflowText: 'Bir liman sahasında kazı, dolgu, kazıklı temel ve ankrajlı perdenin tasarımını, her adımda doğru Lythos aracıyla uçtan uca izleyin.',
    workflowCta: 'Uçtan uca örneğe git',
    ctaTitle: 'İlk analizinize beş dakika uzaklıktasınız.',
    ctaText: 'Python 3.10+ ve tek bir pip komutu yeterli.',
    ctaBtn: 'Kurulum rehberi'
  },
  en: {
    eyebrow: 'Open source · AGPL-3.0 · Python',
    title1: 'Geotechnical engineering,',
    title2: 'one family of tools.',
    lead: 'Lythos is a family of eight geotechnical engineering programs for slopes, foundations and retaining structures. They share one architecture: driven from your browser, bilingual in English and Turkish, reporting to PDF, HTML and Word, and tested against closed-form solutions.',
    start: 'Get started',
    explore: 'Explore the software',
    termNote: 'Opens in your browser; your data never leaves your machine.',
    stats: [
      ['8', 'programs'],
      ['2', 'languages — English and Turkish'],
      ['3', 'interfaces — browser, CLI, Python'],
      ['3', 'report formats — PDF, HTML, Word']
    ],
    familyTitle: 'The family',
    familyLead: 'Each tool does one job in depth; together they cover the geotechnical design of a whole project.',
    overview: 'Overview',
    examples: 'Examples',
    notOnPypi: 'installs from GitHub',
    archTitle: 'One architecture, eight tools',
    archLead: 'Learn one and you know them all. Same interface layout, same files, same commands.',
    features: [
      ['Driven from a browser', 'The interface is a small HTTP server on your own machine. It works over a remote session, in a container and on a headless server.', 'M4 6h24v16H4z M4 10h24 M12 26h8 M16 22v4'],
      ['Bilingual', 'Every label, result, figure and report in English and Turkish; switch while it runs — the numbers never change.', 'M4 8h12 M10 5v3 M6 8c1 5 5 9 9 10 M14 8c-1 5-5 9-9 10 M18 27l5-12 5 12 M20 23h6'],
      ['One-source reports', 'PDF, self-contained HTML and Word reports come from one assembly, so all three say the same thing.', 'M8 3h11l6 6v20H8z M19 3v6h6 M12 15h9 M12 19h9 M12 23h6'],
      ['Project files', 'Inputs are saved as readable JSON. A case set up in the browser re-runs unattended from the command line.', 'M5 6h8l3 3h11v17H5z M11 17l-3 3 3 3 M21 17l3 3-3 3'],
      ['Reliability studies', 'Sweep any input as a range or a distribution: LHS, Monte Carlo, sensitivities, probability of failure and β.', 'M4 27h24 M6 27V17 M11 27V9 M16 27V5 M21 27V12 M26 27V20'],
      ['Validated', 'Every method is pinned with pytest against published tables, hand calculations and closed-form solutions.', 'M16 3l10 4v8c0 7-5 11-10 13C11 26 6 22 6 15V7z M11 15l4 4 7-8']
    ],
    waysTitle: 'Three ways in',
    waysLead: 'One engine — click through it in the browser, drive it from the command line, or script it from Python.',
    tabs: ['Browser', 'Command line', 'Python'],
    browserCap: 'The Lythos Bearing interface: six methods side by side, the checks and the width required.',
    cliCap: 'The project file saved in the browser gives the same result on the command line.',
    pyCap: 'Sweep the width and read the factor of safety — real output.',
    workflowTitle: 'All of them, on one project',
    workflowText: 'Follow the design of an excavation, a fill, a piled foundation and an anchored wall on a port site end to end, with the right Lythos tool at every step.',
    workflowCta: 'Go to the end-to-end example',
    ctaTitle: 'Your first analysis is five minutes away.',
    ctaText: 'Python 3.10+ and a single pip command.',
    ctaBtn: 'Installation guide'
  }
}

const t = computed(() => text[L.value])
const cats: Category[] = ['slope', 'foundation', 'retaining']
const tab = ref(0)
const copied = ref(false)
function copy() {
  navigator.clipboard?.writeText('pip install lythosbearing && lythos-bearing')
  copied.value = true
  setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <div class="lx-home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true" />
      <div class="wrap hero-grid">
        <div class="hero-text">
          <p class="eyebrow">{{ t.eyebrow }}</p>
          <h1>
            <span>{{ t.title1 }}</span>
            <span class="accent">{{ t.title2 }}</span>
          </h1>
          <p class="lead">{{ t.lead }}</p>
          <div class="actions">
            <a class="btn primary" :href="link('/guide/')">{{ t.start }} →</a>
            <a class="btn ghost" href="#family">{{ t.explore }}</a>
          </div>
        </div>
        <div class="terminal" role="group" aria-label="terminal">
          <div class="term-bar">
            <span /><span /><span />
            <button class="copy" type="button" @click="copy">{{ copied ? '✓' : '⧉' }}</button>
          </div>
          <pre><code><span class="c">$</span> pip install lythosbearing
<span class="c">$</span> lythos-bearing
<span class="m">Lythos Bearing 0.1.0 — http://127.0.0.1:8781/</span>

<span class="c">$</span> lythos-bearing run project.bearing
<span class="m">Bearing capacity by method</span>
  Terzaghi (1943)        q_ult = <b>516.8</b> kPa
  Meyerhof (1963)        q_ult = <b>466.0</b> kPa
  Brinch Hansen (1970)   q_ult = <b>474.2</b> kPa
  Vesić (1973) *         q_ult = <b>533.5</b> kPa
  EN 1997-1 Annex D      q_ult = <b>517.3</b> kPa
<span class="ok">  Sliding: FS = 5.33 ≥ 1.50 — OK</span></code></pre>
          <p class="term-note">{{ t.termNote }}</p>
        </div>
      </div>
      <div class="wrap pano">
        <SectionPanorama />
      </div>
    </section>

    <!-- STATS -->
    <section class="wrap stats">
      <div v-for="s in t.stats" :key="s[1]" class="stat">
        <strong>{{ s[0] }}</strong>
        <span>{{ s[1] }}</span>
      </div>
    </section>

    <!-- FAMILY -->
    <section id="family" class="wrap block">
      <header class="block-head">
        <h2>{{ t.familyTitle }}</h2>
        <p>{{ t.familyLead }}</p>
      </header>
      <div v-for="c in cats" :key="c" class="cat">
        <div class="cat-head">
          <h3>{{ categories[c][L].title }}</h3>
          <p>{{ categories[c][L].text }}</p>
        </div>
        <div class="cards">
          <article v-for="pr in products.filter((x) => x.category === c)" :key="pr.id" class="card">
            <a class="card-cover" :href="link(`/${pr.id}/`)" tabindex="-1" aria-hidden="true">
              <img :src="withBase(pr.cover)" :alt="pr.name" loading="lazy" />
            </a>
            <div class="card-body">
              <div class="card-title">
                <span class="icon"><ProductIcon :name="pr.icon" /></span>
                <div>
                  <h4><a :href="link(`/${pr.id}/`)">{{ pr.name }}</a></h4>
                  <p class="tag">{{ pr.tagline[L] }}</p>
                </div>
              </div>
              <p class="summary">{{ pr.summary[L] }}</p>
              <ul class="chips">
                <li v-for="h in pr.highlights[L]" :key="h">{{ h }}</li>
              </ul>
              <code class="pip">{{ pr.pypi ? pr.install : `pip install ${pr.pkg}` }}<em v-if="!pr.pypi"> · {{ t.notOnPypi }}</em></code>
              <div class="card-links">
                <a :href="link(`/${pr.id}/`)">{{ t.overview }}</a>
                <a :href="link(`/${pr.id}/examples`)">{{ t.examples }}</a>
                <a :href="pr.repo" target="_blank" rel="noopener">GitHub ↗</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ARCHITECTURE -->
    <section class="band">
      <div class="wrap block">
        <header class="block-head">
          <h2>{{ t.archTitle }}</h2>
          <p>{{ t.archLead }}</p>
        </header>
        <div class="features">
          <div v-for="f in t.features" :key="f[0]" class="feature">
            <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path :d="f[2]" /></svg>
            <h3>{{ f[0] }}</h3>
            <p>{{ f[1] }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WAYS IN -->
    <section class="wrap block">
      <header class="block-head">
        <h2>{{ t.waysTitle }}</h2>
        <p>{{ t.waysLead }}</p>
      </header>
      <div class="tabs" role="tablist">
        <button v-for="(name, i) in t.tabs" :key="name" role="tab" :aria-selected="tab === i" :class="{ on: tab === i }" @click="tab = i">{{ name }}</button>
      </div>
      <div class="tab-panel">
        <figure v-if="tab === 0" class="shot">
          <img :src="withBase('/img/bearing/bearing_summary.png')" :alt="t.browserCap" loading="lazy" />
          <figcaption>{{ t.browserCap }}</figcaption>
        </figure>
        <figure v-else-if="tab === 1" class="code">
          <pre><code><span class="c">$</span> lythos-settle example -o raft.settle
<span class="c">$</span> lythos-settle run raft.settle --lang tr -o rapor.pdf
<span class="m">OTURMA ANALİZİ SONUÇLARI</span>
Hesap noktalarında oturma (mm)
  Nokta                        Ani   Konsol.  İkincil   Toplam
  Merkez                      42.9      76.1     22.7    <b>141.7</b>
  Karakteristik nokta         27.3      32.2     14.7     74.1
  Uzun kenar ortası           24.7      32.6     16.5     73.8
  Köşe                        11.8      10.5      4.0     26.3
Konsolidasyon süresi
  Soft clay: t50 = 1.2 yıl, <b>t90 = 5.1 yıl</b>
<span class="ok">  Toplam oturma 141.7 mm, izin verilen 150.0 mm: UYGUN</span>
<span class="bad">  Açısal distorsiyon 1/59, izin verilen 1/500: UYGUN DEĞİL</span></code></pre>
          <figcaption>{{ t.cliCap }}</figcaption>
        </figure>
        <figure v-else class="code">
          <pre><code><span class="k">from</span> lythosbearing <span class="k">import</span> forms
<span class="k">from</span> lythosbearing.web.session <span class="k">import</span> Session

session = Session(lang=<span class="s">"en"</span>)
values = forms.defaults()        <span class="c"># 2.5 × 4.0 m footing on layered soil</span>

<span class="k">for</span> B <span class="k">in</span> (2.0, 2.5, 3.0, 3.5):
    values[<span class="s">"B"</span>] = B
    r = session.analyse(values)
    print(<span class="s">f"B = {B:.1f} m  q_ult = {r['q_ult']:6.1f} kPa  FS = {r['FS']:.2f}"</span>)

<span class="m">B = 2.0 m  q_ult =  522.7 kPa  FS = 2.15
B = 2.5 m  q_ult =  533.5 kPa  FS = 2.96
B = 3.0 m  q_ult =  550.4 kPa  FS = <b>3.92</b>
B = 3.5 m  q_ult =  569.7 kPa  FS = <b>5.02</b></span></code></pre>
          <figcaption>{{ t.pyCap }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- WORKFLOW -->
    <section class="wrap block">
      <a class="workflow" :href="link('/guide/workflow')">
        <div>
          <h2>{{ t.workflowTitle }}</h2>
          <p>{{ t.workflowText }}</p>
          <span class="btn primary">{{ t.workflowCta }} →</span>
        </div>
        <ol class="steps">
          <li v-for="(pr, i) in ['bearing', 'settle', 'pile', 'spwa', 'le', 'fea']" :key="pr">
            <span class="n">{{ i + 1 }}</span>
            <ProductIcon :name="products.find((x) => x.id === pr)!.icon" :size="22" />
            <span>{{ products.find((x) => x.id === pr)!.name }}</span>
          </li>
        </ol>
      </a>
    </section>

    <!-- CTA -->
    <section class="wrap cta">
      <h2>{{ t.ctaTitle }}</h2>
      <p>{{ t.ctaText }}</p>
      <a class="btn primary" :href="link('/guide/installation')">{{ t.ctaBtn }} →</a>
    </section>
  </div>
</template>

<style scoped>
.lx-home { overflow-x: clip; }
.wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

/* HERO */
.hero { position: relative; padding: 56px 0 24px; }
.hero-bg {
  position: absolute;
  inset: -80px 0 0;
  background:
    radial-gradient(900px 420px at 85% 0%, var(--lx-hero-a), transparent 70%),
    radial-gradient(700px 380px at 5% 30%, var(--lx-hero-b), transparent 70%);
  pointer-events: none;
  z-index: -1;
}
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
.eyebrow {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 4px 12px;
  border-radius: 999px;
  margin: 0 0 18px;
}
h1 {
  font-family: var(--lx-serif);
  font-weight: 500;
  font-size: clamp(38px, 5.4vw, 64px);
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--vp-c-text-1);
}
h1 span { display: block; }
h1 .accent {
  background: linear-gradient(100deg, var(--vp-c-brand-1), var(--lx-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: italic;
}
.lead { font-size: 18px; line-height: 1.65; color: var(--vp-c-text-2); margin: 22px 0 30px; max-width: 600px; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 22px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn.primary { background: var(--vp-c-brand-1); color: #fff; box-shadow: 0 6px 20px -8px var(--vp-c-brand-1); }
.btn.primary:hover { background: var(--vp-c-brand-2); transform: translateY(-1px); }
.btn.ghost { border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); background: var(--vp-c-bg); }
.btn.ghost:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

.terminal {
  background: var(--lx-term-bg);
  border: 1px solid var(--lx-term-border);
  border-radius: 16px;
  box-shadow: 0 30px 60px -30px rgba(31, 30, 29, 0.45);
  overflow: hidden;
}
.term-bar { display: flex; gap: 7px; align-items: center; padding: 12px 14px; border-bottom: 1px solid var(--lx-term-border); }
.term-bar span { width: 11px; height: 11px; border-radius: 50%; background: #5a5753; }
.term-bar span:first-child { background: #d97757; }
.copy { margin-left: auto; color: #a8a29e; font-size: 14px; padding: 0 4px; }
.copy:hover { color: #fff; }
.terminal pre { margin: 0; padding: 16px 18px 6px; overflow-x: auto; }
.terminal code, .code code { font-family: var(--vp-font-family-mono); font-size: 13px; line-height: 1.7; color: #e7e5e4; white-space: pre; }
.term-note { margin: 0; padding: 4px 18px 14px; font-size: 12.5px; color: #a8a29e; }
.c { color: #8a8580; }
.m { color: #e8a27f; }
.k { color: #f0a58a; }
.s { color: #a5d6a7; }
.ok { color: #86c98f; }
.bad { color: #f08a7a; }
b { color: #fff; font-weight: 600; }

.pano { margin-top: 44px; }

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--vp-c-divider);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 28px;
  padding: 0;
}
.stat { background: var(--vp-c-bg); padding: 22px 24px; display: flex; flex-direction: column; gap: 4px; }
.stat strong { font-family: var(--lx-serif); font-size: 40px; font-weight: 500; line-height: 1; color: var(--vp-c-brand-1); }
.stat span { font-size: 14px; color: var(--vp-c-text-2); }

/* BLOCKS */
.block { padding-top: 88px; }
.block-head { max-width: 720px; margin-bottom: 36px; }
.block-head h2, .workflow h2, .cta h2 {
  font-family: var(--lx-serif);
  font-weight: 500;
  font-size: clamp(30px, 3.4vw, 42px);
  letter-spacing: -0.015em;
  line-height: 1.12;
  margin: 0 0 12px;
  border: 0;
  padding: 0;
}
.block-head p { font-size: 17px; color: var(--vp-c-text-2); margin: 0; line-height: 1.6; }

.cat + .cat { margin-top: 48px; }
.cat-head { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 1px solid var(--vp-c-divider); }
.cat-head h3 { margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--vp-c-brand-1); font-weight: 700; }
.cat-head p { margin: 0; color: var(--vp-c-text-3); font-size: 14px; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
}
.card:hover { transform: translateY(-3px); border-color: var(--vp-c-brand-2); box-shadow: 0 22px 40px -28px rgba(31, 30, 29, 0.5); }
.card-cover { display: block; aspect-ratio: 16 / 9; overflow: hidden; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.card-cover img { width: 100%; height: 100%; object-fit: cover; object-position: top left; transition: transform 0.5s ease; }
.card:hover .card-cover img { transform: scale(1.04); }
.card-body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.card-title { display: flex; gap: 12px; align-items: center; }
.icon { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 12px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); flex: none; }
.card h4 { margin: 0; font-size: 18px; font-weight: 650; letter-spacing: -0.01em; }
.card h4 a { color: var(--vp-c-text-1); text-decoration: none; }
.card h4 a:hover { color: var(--vp-c-brand-1); }
.tag { margin: 2px 0 0; font-size: 13.5px; color: var(--vp-c-text-2); }
.summary { margin: 0; font-size: 14px; line-height: 1.6; color: var(--vp-c-text-2); }
.chips { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.chips li { font-size: 12px; padding: 3px 9px; border-radius: 999px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
.pip { font-family: var(--vp-font-family-mono); font-size: 12px; padding: 7px 10px; background: var(--vp-c-bg-soft); border-radius: 8px; color: var(--vp-c-text-1); overflow-wrap: anywhere; margin-top: auto; }
.pip em { font-style: normal; color: var(--vp-c-text-3); font-family: var(--vp-font-family-base); }
.card-links { display: flex; gap: 16px; font-size: 14px; font-weight: 600; }
.card-links a { color: var(--vp-c-brand-1); text-decoration: none; }
.card-links a:hover { text-decoration: underline; }

/* ARCHITECTURE */
.band { background: var(--vp-c-bg-soft); border-top: 1px solid var(--vp-c-divider); border-bottom: 1px solid var(--vp-c-divider); margin-top: 88px; padding-bottom: 88px; }
.features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.feature { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 16px; padding: 24px; }
.feature svg { color: var(--vp-c-brand-1); }
.feature h3 { margin: 14px 0 8px; font-size: 17px; font-weight: 650; }
.feature p { margin: 0; color: var(--vp-c-text-2); font-size: 14.5px; line-height: 1.6; }

/* TABS */
.tabs { display: inline-flex; gap: 4px; padding: 4px; border-radius: 999px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); margin-bottom: 20px; }
.tabs button { padding: 8px 18px; border-radius: 999px; font-size: 14px; font-weight: 600; color: var(--vp-c-text-2); transition: background 0.2s ease, color 0.2s ease; }
.tabs button.on { background: var(--vp-c-bg); color: var(--vp-c-brand-1); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08); }
.tab-panel figure { margin: 0; }
.shot img { width: 100%; border-radius: 16px; border: 1px solid var(--vp-c-divider); box-shadow: 0 30px 60px -40px rgba(31, 30, 29, 0.6); }
.code pre { margin: 0; background: var(--lx-term-bg); border: 1px solid var(--lx-term-border); border-radius: 16px; padding: 22px 24px; overflow-x: auto; }
figcaption { margin-top: 12px; font-size: 14px; color: var(--vp-c-text-3); }

/* WORKFLOW */
.workflow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  padding: 44px;
  border-radius: 24px;
  text-decoration: none;
  color: inherit;
  background: linear-gradient(135deg, var(--lx-hero-a), var(--vp-c-bg-soft) 60%);
  border: 1px solid var(--vp-c-divider);
  transition: border-color 0.2s ease;
}
.workflow:hover { border-color: var(--vp-c-brand-2); }
.workflow p { color: var(--vp-c-text-2); font-size: 16px; line-height: 1.65; margin: 0 0 24px; }
.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.steps li { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 12px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); font-weight: 600; font-size: 14.5px; color: var(--vp-c-text-1); }
.steps svg { color: var(--vp-c-brand-1); }
.n { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; font-size: 12px; background: var(--vp-c-brand-1); color: #fff; }

/* CTA */
.cta { text-align: center; padding: 96px 24px 72px; }
.cta p { color: var(--vp-c-text-2); font-size: 17px; margin: 0 0 24px; }

@media (max-width: 960px) {
  .hero-grid, .workflow { grid-template-columns: 1fr; }
  .cards, .features { grid-template-columns: repeat(2, 1fr); }
  .stats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .wrap { padding: 0 16px; }
  .hero { padding-top: 32px; }
  .cards, .features, .steps { grid-template-columns: 1fr; }
  .workflow { padding: 26px; }
  .terminal code { font-size: 11.5px; }
  .block { padding-top: 64px; }
}
</style>

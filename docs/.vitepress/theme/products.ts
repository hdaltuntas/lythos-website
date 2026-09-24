// Lythos ailesinin tek veri kaynağı: ana sayfadaki kartlar, ürün başlıkları ve
// karşılaştırma tablosu buradan beslenir. Bir ürün eklemek ya da bir sürümü
// güncellemek için yalnızca bu dosyayı değiştirmek yeterlidir.

export type Lang = 'tr' | 'en'
export type Category = 'slope' | 'foundation' | 'retaining'

export interface Product {
  id: string
  name: string
  pkg: string
  install: string
  cli: string
  port: number
  repo: string
  version: string
  python: string
  pypi: boolean
  category: Category
  icon: string
  cover: string
  tagline: Record<Lang, string>
  summary: Record<Lang, string>
  highlights: Record<Lang, string[]>
}

const GH = 'https://github.com/hdaltuntas'

export const categories: Record<Category, Record<Lang, { title: string; text: string }>> = {
  slope: {
    tr: { title: 'Şevler ve kaya', text: 'Sonlu elemanlar, limit denge ve kaya şevi kinematiği.' },
    en: { title: 'Slopes and rock', text: 'Finite elements, limit equilibrium and rock slope kinematics.' }
  },
  foundation: {
    tr: { title: 'Temeller', text: 'Sığ temel taşıma gücü, oturma ve kazıklı temeller.' },
    en: { title: 'Foundations', text: 'Shallow foundation capacity, settlement and piles.' }
  },
  retaining: {
    tr: { title: 'İstinat yapıları', text: 'Palplanş perdeler ve donatılı zemin duvarlar.' },
    en: { title: 'Retaining structures', text: 'Sheet pile walls and mechanically stabilised earth.' }
  }
}

export const products: Product[] = [
  {
    id: 'fea',
    name: 'LythosFEA',
    pkg: 'lythosfea',
    install: 'pip install lythosfea',
    cli: 'lythos',
    port: 8777,
    repo: `${GH}/lythos`,
    version: '0.1.0',
    python: '3.10+',
    pypi: true,
    category: 'slope',
    icon: 'mesh',
    cover: '/img/fea/slope_strain.png',
    tagline: {
      tr: '2B sonlu elemanlar analizi',
      en: '2D finite element analysis'
    },
    summary: {
      tr: 'Şevler, dolgular ve derin kazılar için 2B sonlu elemanlar: kayma mukavemeti azaltmayla güvenlik sayısı, aşamalı inşaat, perde ve kazıklarda iç kuvvetler, DXF’ten kesit ve inşaat sırası.',
      en: '2D finite elements for slopes, embankments and deep excavations: factor of safety by strength reduction, staged construction, internal forces in walls and piles, sections and construction sequence straight from DXF.'
    },
    highlights: {
      tr: ['Mukavemet azaltma (SSR)', 'Aşamalı inşaat', 'DXF içe aktarma', 'Perde ve ankraj iç kuvvetleri'],
      en: ['Strength reduction (SSR)', 'Staged construction', 'DXF import', 'Wall and anchor forces']
    }
  },
  {
    id: 'le',
    name: 'Lythos LE',
    pkg: 'lythosle',
    install: 'pip install lythosle',
    cli: 'lythosle',
    port: 8000,
    repo: `${GH}/lythosle`,
    version: '0.1.0',
    python: '3.9+',
    pypi: true,
    category: 'slope',
    icon: 'slip',
    cover: '/img/le/screenshot-light.png',
    tagline: {
      tr: 'Limit denge şev stabilitesi',
      en: 'Limit equilibrium slope stability'
    },
    summary: {
      tr: 'Dilim yöntemiyle şev ve dolgu stabilitesi: Fellenius’tan Morgenstern-Price’a sekiz yöntem, kritik kayma yüzeyi araması, su, deprem, donatı ve çekme çatlağı — sıfır bağımlılıkla.',
      en: 'Method-of-slices stability of slopes and embankments: eight methods from Fellenius to Morgenstern-Price, critical surface search, water, seismic, reinforcement and tension cracks — with zero dependencies.'
    },
    highlights: {
      tr: ['8 limit denge yöntemi', 'Dairesel ve dairesel olmayan yüzey', 'Bağımlılık yok', 'ACADS ile doğrulanmış'],
      en: ['8 limit equilibrium methods', 'Circular and non-circular', 'No dependencies', 'Validated against ACADS']
    }
  },
  {
    id: 'kinematic',
    name: 'Lythos Kinematic',
    pkg: 'lythoskinematic',
    install: 'pip install lythoskinematic',
    cli: 'lythos-kinematic',
    port: 8778,
    repo: `${GH}/lythoskinematic`,
    version: '0.1.0',
    python: '3.10+',
    pypi: true,
    category: 'slope',
    icon: 'stereonet',
    cover: '/img/kinematic/screening.png',
    tagline: {
      tr: 'Kaya şevi kinematiği ve stabilitesi',
      en: 'Rock slope kinematics and stability'
    },
    summary: {
      tr: 'Stereonet üzerinde Markland taraması ve Monte Carlo göçme olasılığı; ardından kama, düzlemsel ve devrilme limit dengesi, bulon tasarımı ve PDF rapor — tek iş akışında.',
      en: 'Markland screening on a stereonet and Monte Carlo probability of failure, then wedge, planar and toppling limit equilibrium, bolt design and PDF reports — in one workflow.'
    },
    highlights: {
      tr: ['Markland testi + stereonet', 'Monte Carlo olasılık', 'Kama · düzlemsel · devrilme', 'Bulon aralık × boy matrisi'],
      en: ['Markland test + stereonet', 'Monte Carlo probability', 'Wedge · planar · toppling', 'Bolt spacing × length matrix']
    }
  },
  {
    id: 'bearing',
    name: 'Lythos Bearing',
    pkg: 'lythosbearing',
    install: 'pip install lythosbearing',
    cli: 'lythos-bearing',
    port: 8781,
    repo: `${GH}/lythos-bearing`,
    version: '0.1.0',
    python: '3.10+',
    pypi: true,
    category: 'foundation',
    icon: 'footing',
    cover: '/img/bearing/bearing_summary.png',
    tagline: {
      tr: 'Sığ temellerin taşıma gücü',
      en: 'Bearing capacity of shallow foundations'
    },
    summary: {
      tr: 'Terzaghi, Meyerhof, Hansen, Vesić, EN 1997-1 ve Skempton yan yana; dışmerkez ve eğik yük, tabakalı zemin, SPT/CPT/presiyometre, kaya, deprem ve güvenilirlik çalışması.',
      en: 'Terzaghi, Meyerhof, Hansen, Vesić, EN 1997-1 and Skempton side by side; eccentric and inclined loads, layered ground, SPT/CPT/pressuremeter, rock, earthquake and reliability studies.'
    },
    highlights: {
      tr: ['6 katsayı takımı yan yana', 'EN 1997-1 DA1/DA2/DA3', 'Zımbalama ve yük yayılması', 'Göçme olasılığı ve β'],
      en: ['6 factor sets side by side', 'EN 1997-1 DA1/DA2/DA3', 'Punching and load spread', 'Probability of failure and β']
    }
  },
  {
    id: 'settle',
    name: 'Lythos Settle',
    pkg: 'lythossettle',
    install: 'pip install lythossettle',
    cli: 'lythos-settle',
    port: 8780,
    repo: `${GH}/lythos-settle`,
    version: '0.1.0',
    python: '3.10+',
    pypi: true,
    category: 'foundation',
    icon: 'settle',
    cover: '/img/settle/settle_summary.png',
    tagline: {
      tr: 'Temel ve dolgu oturmaları',
      en: 'Settlement of foundations and embankments'
    },
    summary: {
      tr: 'Boussinesq ve 2:1 gerilme dağılımı, Steinbrenner ve Schmertmann ani oturması, birincil konsolidasyon ve ikincil sıkışma, Terzaghi zaman–oturma eğrisi ve açısal distorsiyon kontrolü.',
      en: 'Boussinesq and 2:1 stress distribution, Steinbrenner and Schmertmann immediate settlement, primary consolidation and secondary compression, Terzaghi time–settlement and angular distortion checks.'
    },
    highlights: {
      tr: ['Ani + konsolidasyon + ikincil', 'Dolgu (trapez yük) çözümü', 't50, t90 ve zaman eğrisi', 'Aşılma olasılığı'],
      en: ['Immediate + consolidation + secondary', 'Embankment (trapezoidal) loads', 't50, t90 and time curve', 'Probability of exceedance']
    }
  },
  {
    id: 'pile',
    name: 'Lythos Pile',
    pkg: 'lythospile',
    install: 'pip install git+https://github.com/hdaltuntas/lythos-pile',
    cli: 'lythos-pile',
    port: 8783,
    repo: `${GH}/lythos-pile`,
    version: '0.1.0',
    python: '3.10+',
    pypi: false,
    category: 'foundation',
    icon: 'pile',
    cover: '/img/pile/pile_summary.png',
    tagline: {
      tr: 'Kazık taşıma gücü, grup ve oturma',
      en: 'Pile capacity, groups and settlement'
    },
    summary: {
      tr: 'α, β, λ yöntemleriyle çevre sürtünmesi, Meyerhof/Vesić/Janbu uç direnci, grup verimi ve blok göçmesi, gerekli boy, tekil ve grup oturması; on iki korelasyonla kaya soketi.',
      en: 'Shaft friction by the α, β and λ methods, Meyerhof/Vesić/Janbu base resistance, group efficiency and block failure, required length, single and group settlement; rock sockets by twelve correlations.'
    },
    highlights: {
      tr: ['α · β · λ yöntemleri', '4 grup verimi + blok göçme', 'Eşdeğer radye oturması', '12 kaya soketi korelasyonu'],
      en: ['α · β · λ methods', '4 group efficiencies + block', 'Equivalent raft settlement', '12 rock socket correlations']
    }
  },
  {
    id: 'spwa',
    name: 'Lythos SPWA',
    pkg: 'lythosspwa',
    install: 'pip install lythosspwa',
    cli: 'lythos-spwa',
    port: 8779,
    repo: `${GH}/lythosspwa`,
    version: '0.1.1',
    python: '3.10+',
    pypi: true,
    category: 'retaining',
    icon: 'sheet',
    cover: '/img/spwa/spwa_summary.png',
    tagline: {
      tr: 'Palplanş perde analizi',
      en: 'Sheet pile wall analysis'
    },
    summary: {
      tr: 'Serbest zemin desteği yöntemiyle limit denge ve aşamalı inşaatlı Winkler kiriş-yay analizi yan yana; Mononobe-Okabe deprem basınçları, çekme-yalnız ankrajlar ve güvenilirlik çalışması.',
      en: 'Free-earth support limit equilibrium and staged Winkler beam-spring analysis side by side; Mononobe-Okabe seismic pressures, tension-only anchors and reliability studies.'
    },
    highlights: {
      tr: ['Serbest zemin desteği', 'Aşamalı kiriş-yay (Winkler)', 'Mononobe-Okabe + Westergaard', 'Palplanş kesit veritabanı'],
      en: ['Free-earth support', 'Staged beam-spring (Winkler)', 'Mononobe-Okabe + Westergaard', 'Sheet pile section database']
    }
  },
  {
    id: 'msew',
    name: 'Lythos MSEW',
    pkg: 'lythosmsew',
    install: 'pip install git+https://github.com/hdaltuntas/lythos-msew',
    cli: 'lythos-msew',
    port: 8782,
    repo: `${GH}/lythos-msew`,
    version: '0.1.0',
    python: '3.10+',
    pypi: false,
    category: 'retaining',
    icon: 'msew',
    cover: '/img/msew/msew_summary.png',
    tagline: {
      tr: 'Donatılı zemin (MSE) duvarlar',
      en: 'Mechanically stabilised earth walls'
    },
    summary: {
      tr: 'FHWA-NHI-10-024 ve AASHTO LRFD 11.10’a göre dış ve iç duraylılık: kayma, devrilme, taşıma gücü, çekme, sıyrılma, bağlantı; çelik şerit ve geosentetikler, korozyon, deprem, ASD veya LRFD.',
      en: 'External and internal stability per FHWA-NHI-10-024 and AASHTO LRFD 11.10: sliding, overturning, bearing, tensile, pullout, connection; steel strips and geosynthetics, corrosion, earthquake, ASD or LRFD.'
    },
    highlights: {
      tr: ['Dış + iç duraylılık', 'Çelik şerit ve geosentetik', 'ASD veya LRFD', 'Duvar yüksekliği çalışması'],
      en: ['External + internal stability', 'Steel strips and geosynthetics', 'ASD or LRFD', 'Wall height study']
    }
  }
]

export const byId = (id: string) => products.find((p) => p.id === id)!

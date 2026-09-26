import { defineConfig, type DefaultTheme } from 'vitepress'

// Site https://lythosapp.com kökünde (Cloudflare Pages) yayınlanır. Alt yolda
// yayın gerekirse (örn. GitHub Pages proje sitesi) yol BASE ile verilir.
const base = process.env.BASE || '/'
const site = 'https://lythosapp.com'

const products = [
  ['fea', 'LythosFEA'],
  ['le', 'Lythos LE'],
  ['kinematic', 'Lythos Kinematic'],
  ['bearing', 'Lythos Bearing'],
  ['settle', 'Lythos Settle'],
  ['pile', 'Lythos Pile'],
  ['spwa', 'Lythos SPWA'],
  ['msew', 'Lythos MSEW']
] as const

function productSidebar(prefix: string, t: { overview: string; examples: string; reference: string }) {
  return products.map(([id, name]) => ({
    text: name,
    collapsed: true,
    items: [
      { text: t.overview, link: `${prefix}/${id}/` },
      { text: t.examples, link: `${prefix}/${id}/examples` },
      { text: t.reference, link: `${prefix}/${id}/reference` }
    ]
  }))
}

function sidebar(lang: 'tr' | 'en'): DefaultTheme.Sidebar {
  const p = lang === 'tr' ? '' : '/en'
  const t =
    lang === 'tr'
      ? { overview: 'Genel bakış', examples: 'Örnekler', reference: 'Başvuru' }
      : { overview: 'Overview', examples: 'Examples', reference: 'Reference' }
  const guide =
    lang === 'tr'
      ? {
          text: 'Rehber',
          items: [
            { text: 'Lythos nedir?', link: `${p}/guide/` },
            { text: 'Kurulum', link: `${p}/guide/installation` },
            { text: 'Ortak mimari', link: `${p}/guide/architecture` },
            { text: 'Hangi araç, ne zaman?', link: `${p}/guide/choosing` },
            { text: 'Uçtan uca bir proje', link: `${p}/guide/workflow` }
          ]
        }
      : {
          text: 'Guide',
          items: [
            { text: 'What is Lythos?', link: `${p}/guide/` },
            { text: 'Installation', link: `${p}/guide/installation` },
            { text: 'Shared architecture', link: `${p}/guide/architecture` },
            { text: 'Which tool, when?', link: `${p}/guide/choosing` },
            { text: 'A project end to end', link: `${p}/guide/workflow` }
          ]
        }
  const all = [
    guide,
    { text: lang === 'tr' ? 'Yazılımlar' : 'Software', items: productSidebar(p, t) }
  ]
  return { [`${p}/guide/`]: all, ...Object.fromEntries(products.map(([id]) => [`${p}/${id}/`, all])) }
}

export default defineConfig({
  base,
  title: 'Lythos',
  cleanUrls: true,
  sitemap: { hostname: site },
  lastUpdated: true,
  appearance: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#c6613f' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Lythos — geoteknik mühendisliği yazılım ailesi' }],
    ['meta', { property: 'og:url', content: site }],
    ['meta', { property: 'og:image', content: `${site}/img/fea/slope_strain.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap'
      }
    ]
  ],

  markdown: {
    math: false,
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' }
  },

  locales: {
    root: {
      label: 'Türkçe',
      lang: 'tr-TR',
      description: 'Lythos: şevler, temeller ve istinat yapıları için açık kaynaklı geoteknik mühendisliği yazılım ailesi.',
      themeConfig: {
        nav: [
          { text: 'Rehber', link: '/guide/', activeMatch: '/guide/' },
          {
            text: 'Yazılımlar',
            items: [
              { text: 'Şevler ve kaya', items: [
                { text: 'LythosFEA', link: '/fea/' },
                { text: 'Lythos LE', link: '/le/' },
                { text: 'Lythos Kinematic', link: '/kinematic/' }
              ] },
              { text: 'Temeller', items: [
                { text: 'Lythos Bearing', link: '/bearing/' },
                { text: 'Lythos Settle', link: '/settle/' },
                { text: 'Lythos Pile', link: '/pile/' }
              ] },
              { text: 'İstinat yapıları', items: [
                { text: 'Lythos SPWA', link: '/spwa/' },
                { text: 'Lythos MSEW', link: '/msew/' }
              ] }
            ]
          },
          { text: 'Uçtan uca örnek', link: '/guide/workflow' }
        ],
        sidebar: sidebar('tr'),
        outline: { label: 'Bu sayfada', level: [2, 3] },
        docFooter: { prev: 'Önceki sayfa', next: 'Sonraki sayfa' },
        lastUpdated: { text: 'Son güncelleme' },
        darkModeSwitchLabel: 'Görünüm',
        lightModeSwitchTitle: 'Açık temaya geç',
        darkModeSwitchTitle: 'Koyu temaya geç',
        sidebarMenuLabel: 'Menü',
        returnToTopLabel: 'Başa dön',
        langMenuLabel: 'Dil',
        notFound: {
          title: 'SAYFA BULUNAMADI',
          quote: 'Aradığınız sayfa kaymış olabilir — ama güvenlik sayısı hâlâ 1’in üzerinde.',
          linkLabel: 'ana sayfaya dön',
          linkText: 'Ana sayfaya dön'
        },
        footer: {
          message: 'AGPL-3.0 lisansıyla yayımlanır.',
          copyright: '© 2025–2026 Hasan Deniz Altuntaş'
        },
        editLink: {
          pattern: 'https://github.com/hdaltuntas/lythos-website/edit/main/docs/:path',
          text: 'Bu sayfayı GitHub’da düzenle'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Lythos: an open-source family of geotechnical engineering software for slopes, foundations and retaining structures.',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/', activeMatch: '/en/guide/' },
          {
            text: 'Software',
            items: [
              { text: 'Slopes and rock', items: [
                { text: 'LythosFEA', link: '/en/fea/' },
                { text: 'Lythos LE', link: '/en/le/' },
                { text: 'Lythos Kinematic', link: '/en/kinematic/' }
              ] },
              { text: 'Foundations', items: [
                { text: 'Lythos Bearing', link: '/en/bearing/' },
                { text: 'Lythos Settle', link: '/en/settle/' },
                { text: 'Lythos Pile', link: '/en/pile/' }
              ] },
              { text: 'Retaining structures', items: [
                { text: 'Lythos SPWA', link: '/en/spwa/' },
                { text: 'Lythos MSEW', link: '/en/msew/' }
              ] }
            ]
          },
          { text: 'End-to-end example', link: '/en/guide/workflow' }
        ],
        sidebar: sidebar('en'),
        outline: { label: 'On this page', level: [2, 3] },
        footer: {
          message: 'Released under the AGPL-3.0 licence.',
          copyright: '© 2025–2026 Hasan Deniz Altuntaş'
        },
        editLink: {
          pattern: 'https://github.com/hdaltuntas/lythos-website/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        }
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Lythos',
    socialLinks: [{ icon: 'github', link: 'https://github.com/hdaltuntas' }],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: 'Ara', buttonAriaLabel: 'Ara' },
              modal: {
                displayDetails: 'Ayrıntıları göster',
                resetButtonTitle: 'Aramayı temizle',
                backButtonTitle: 'Kapat',
                noResultsText: 'Sonuç bulunamadı',
                footer: { selectText: 'seç', navigateText: 'gez', closeText: 'kapat' }
              }
            }
          }
        }
      }
    }
  }
})

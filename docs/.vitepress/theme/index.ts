import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import HomePage from './components/HomePage.vue'
import ProductHero from './components/ProductHero.vue'
import Gallery from './components/Gallery.vue'
import ProductIcon from './components/ProductIcon.vue'
import SectionPanorama from './components/SectionPanorama.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('ProductHero', ProductHero)
    app.component('Gallery', Gallery)
    app.component('ProductIcon', ProductIcon)
    app.component('SectionPanorama', SectionPanorama)
  }
} satisfies Theme

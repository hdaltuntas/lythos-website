<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { byId, categories, type Lang } from '../products'
import ProductIcon from './ProductIcon.vue'

const props = defineProps<{ id: string }>()
const { lang } = useData()
const L = computed<Lang>(() => (lang.value.startsWith('en') ? 'en' : 'tr'))
const p = computed(() => byId(props.id))
const pre = computed(() => (L.value === 'en' ? '/en' : ''))

const labels = {
  tr: { install: 'Kurulum', run: 'Çalıştır', port: 'Varsayılan port', python: 'Python', version: 'Sürüm', licence: 'Lisans', repo: 'Kaynak kod', examples: 'Örneklere git', reference: 'Başvuru', github: 'GitHub’dan' },
  en: { install: 'Install', run: 'Run', port: 'Default port', python: 'Python', version: 'Version', licence: 'Licence', repo: 'Source', examples: 'See the examples', reference: 'Reference', github: 'from GitHub' }
}
const t = computed(() => labels[L.value])
const copied = ref(false)
function copy() {
  navigator.clipboard?.writeText(p.value.install)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="phero">
    <div class="top">
      <span class="icon"><ProductIcon :name="p.icon" :size="34" /></span>
      <div>
        <p class="cat">{{ categories[p.category][L].title }}</p>
        <p class="tagline">{{ p.tagline[L] }}</p>
      </div>
    </div>
    <p class="summary">{{ p.summary[L] }}</p>

    <div class="install">
      <code><span class="dollar">$</span> {{ p.install }}</code>
      <button type="button" @click="copy" :aria-label="t.install">{{ copied ? '✓' : '⧉' }}</button>
    </div>

    <dl class="facts">
      <div><dt>{{ t.run }}</dt><dd><code>{{ p.cli }}</code></dd></div>
      <div><dt>{{ t.port }}</dt><dd>{{ p.port }}</dd></div>
      <div><dt>{{ t.python }}</dt><dd>{{ p.python }}</dd></div>
      <div><dt>{{ t.version }}</dt><dd>{{ p.version }}<span v-if="!p.pypi" class="muted"> · {{ t.github }}</span></dd></div>
      <div><dt>{{ t.licence }}</dt><dd>MIT</dd></div>
    </dl>

    <div class="links">
      <a class="btn primary" :href="withBase(`${pre}/${p.id}/examples`)">{{ t.examples }} →</a>
      <a class="btn" :href="withBase(`${pre}/${p.id}/reference`)">{{ t.reference }}</a>
      <a class="btn" :href="p.repo" target="_blank" rel="noopener">{{ t.repo }} ↗</a>
    </div>
  </div>
</template>

<style scoped>
.phero {
  margin: 8px 0 32px;
  padding: 26px 28px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: linear-gradient(135deg, var(--lx-hero-a), var(--vp-c-bg-soft) 70%);
}
.top { display: flex; gap: 16px; align-items: center; }
.icon { display: grid; place-items: center; width: 60px; height: 60px; border-radius: 16px; background: var(--vp-c-brand-1); color: #fff; flex: none; }
.cat { margin: 0 !important; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vp-c-brand-1); line-height: 1.4 !important; }
.tagline { margin: 2px 0 0 !important; font-family: var(--lx-serif); font-size: 24px; line-height: 1.25 !important; color: var(--vp-c-text-1); }
.summary { font-size: 16px; color: var(--vp-c-text-2); margin: 18px 0 !important; }
.install { display: flex; align-items: center; background: var(--lx-term-bg); border-radius: 12px; padding: 4px 6px 4px 16px; border: 1px solid var(--lx-term-border); }
.install code { flex: 1; background: none !important; color: #e7e5e4 !important; font-size: 14px !important; padding: 8px 0 !important; overflow-x: auto; white-space: nowrap; }
.dollar { color: #8a8580; user-select: none; }
.install button { color: #a8a29e; padding: 6px 10px; font-size: 15px; }
.install button:hover { color: #fff; }
.facts { display: grid; grid-template-columns: repeat(5, auto); gap: 10px 24px; margin: 18px 0 !important; justify-content: start; }
.facts div { display: flex; flex-direction: column; }
.facts dt { font-size: 12px; color: var(--vp-c-text-3); margin: 0; }
.facts dd { margin: 2px 0 0; font-weight: 600; font-size: 14.5px; }
.muted { color: var(--vp-c-text-3); font-weight: 400; }
.links { display: flex; flex-wrap: wrap; gap: 10px; }
.btn { padding: 8px 16px; border-radius: 999px; border: 1px solid var(--vp-c-divider); font-weight: 600; font-size: 14px; text-decoration: none !important; color: var(--vp-c-text-1) !important; background: var(--vp-c-bg); transition: border-color 0.2s, color 0.2s; }
.btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1) !important; }
.btn.primary { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff !important; }
.btn.primary:hover { background: var(--vp-c-brand-2); color: #fff !important; }
@media (max-width: 720px) {
  .facts { grid-template-columns: repeat(2, auto); }
  .phero { padding: 20px; }
}
</style>

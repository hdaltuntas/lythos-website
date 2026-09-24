<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { withBase } from 'vitepress'

// Ekran görüntüsü ızgarası; bir görsele tıklamak onu tam ekranda açar,
// ok tuşları gezinir, Esc kapatır.
const props = defineProps<{ items: { src: string; caption: string }[]; cols?: number }>()
const open = ref<number | null>(null)

function onKey(e: KeyboardEvent) {
  if (open.value === null) return
  if (e.key === 'Escape') open.value = null
  if (e.key === 'ArrowRight') open.value = (open.value + 1) % props.items.length
  if (e.key === 'ArrowLeft') open.value = (open.value - 1 + props.items.length) % props.items.length
}
watch(open, (v) => {
  if (typeof window === 'undefined') return
  if (v === null) window.removeEventListener('keydown', onKey)
  else window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => typeof window !== 'undefined' && window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="gallery" :style="{ '--cols': cols ?? 2 }">
    <figure v-for="(it, i) in items" :key="it.src">
      <button type="button" @click="open = i" :aria-label="it.caption">
        <img :src="withBase(it.src)" :alt="it.caption" loading="lazy" />
      </button>
      <figcaption>{{ it.caption }}</figcaption>
    </figure>
  </div>
  <Teleport to="body">
    <div v-if="open !== null" class="lightbox" @click.self="open = null">
      <button class="close" type="button" @click="open = null" aria-label="close">×</button>
      <img :src="withBase(items[open].src)" :alt="items[open].caption" />
      <p>{{ items[open].caption }} <span>{{ open + 1 }} / {{ items.length }}</span></p>
    </div>
  </Teleport>
</template>

<style scoped>
.gallery { display: grid; grid-template-columns: repeat(var(--cols), 1fr); gap: 18px; margin: 20px 0 28px; }
figure { margin: 0; }
figure button { display: block; width: 100%; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); cursor: zoom-in; transition: transform 0.2s ease, box-shadow 0.2s ease; }
figure button:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -24px rgba(0, 0, 0, 0.5); }
figure img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top left; margin: 0 !important; }
figcaption { font-size: 13px; color: var(--vp-c-text-3); margin-top: 8px; line-height: 1.45; }
.lightbox { position: fixed; inset: 0; z-index: 200; background: rgba(20, 19, 18, 0.88); backdrop-filter: blur(6px); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; cursor: zoom-out; }
.lightbox img { max-width: 100%; max-height: 84vh; border-radius: 10px; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5); cursor: default; }
.lightbox p { color: #e7e5e4; margin-top: 14px; font-size: 14px; }
.lightbox p span { color: #a8a29e; margin-left: 10px; }
.close { position: absolute; top: 16px; right: 22px; font-size: 34px; color: #e7e5e4; line-height: 1; }
@media (max-width: 640px) { .gallery { grid-template-columns: 1fr; } }
</style>

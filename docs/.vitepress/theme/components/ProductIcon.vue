<script setup lang="ts">
// Her ürün için elle çizilmiş, tek renkli çizgi ikon. Renk currentColor'dan
// gelir; böylece açık ve koyu temada kendiliğinden doğru görünür.
defineProps<{ name: string; size?: number }>()
</script>

<template>
  <svg
    :width="size ?? 28"
    :height="size ?? 28"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- sonlu eleman ağı -->
    <g v-if="name === 'mesh'">
      <path d="M3 27 L3 17 L12 9 L29 9 L29 27 Z" />
      <path d="M3 17 L12 20 L12 9 M12 20 L21 16 L12 9 M21 16 L29 9 M21 16 L29 20 M12 20 L3 27 M12 20 L14 27 M12 20 L21 27 L21 16 M21 27 L29 20" />
    </g>
    <!-- şev ve kayma dairesi -->
    <g v-else-if="name === 'slip'">
      <path d="M2 26 L10 26 L20 13 L30 13" />
      <path d="M7 26 A 15 15 0 0 0 26 13" stroke-dasharray="2.2 2.4" />
      <circle cx="13" cy="6" r="1.3" fill="currentColor" stroke="none" />
      <path d="M13 6 L7 26 M13 6 L26 13" stroke-width="1" opacity=".55" />
    </g>
    <!-- stereonet -->
    <g v-else-if="name === 'stereonet'">
      <circle cx="16" cy="16" r="12.5" />
      <path d="M16 3.5 C 9 10, 9 22, 16 28.5" />
      <path d="M3.5 16 C 11 12, 21 12, 28.5 16" />
      <path d="M8 6 C 14 13, 22 17, 26 24" opacity=".7" />
      <circle cx="21" cy="11" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="20.5" r="1.4" fill="currentColor" stroke="none" />
    </g>
    <!-- sığ temel ve taşıma gücü -->
    <g v-else-if="name === 'footing'">
      <path d="M2 14 L30 14" />
      <rect x="10" y="12" width="12" height="4" rx=".6" />
      <path d="M16 2 L16 10 M13 7 L16 10 L19 7" />
      <path d="M10 16 L16 22 L22 16 M10 16 C 5 22, 6 27, 3 28 M22 16 C 27 22, 26 27, 29 28" opacity=".75" />
    </g>
    <!-- oturma -->
    <g v-else-if="name === 'settle'">
      <path d="M2 8 L30 8" opacity=".5" />
      <rect x="9" y="6" width="14" height="4" rx=".6" />
      <path d="M3 14 C 9 14, 12 22, 16 22 C 20 22, 23 14, 29 14" />
      <path d="M3 20 C 9 20, 12 27, 16 27 C 20 27, 23 20, 29 20" opacity=".55" />
    </g>
    <!-- kazık grubu -->
    <g v-else-if="name === 'pile'">
      <rect x="5" y="4" width="22" height="4" rx=".6" />
      <path d="M9 8 L9 28 M16 8 L16 28 M23 8 L23 28" />
      <path d="M2 15 L30 15 M2 22 L30 22" stroke-dasharray="1.6 2.6" opacity=".6" />
    </g>
    <!-- palplanş ve ankraj -->
    <g v-else-if="name === 'sheet'">
      <path d="M13 3 L13 29" stroke-width="2.4" />
      <path d="M13 3 L30 3 M2 18 L13 18" />
      <path d="M13 9 L27 14" />
      <path d="M24 12 L29 16" stroke-width="2.4" />
      <path d="M18 8 L18 3 M23 10 L23 3" opacity=".4" />
    </g>
    <!-- donatılı zemin duvar -->
    <g v-else-if="name === 'msew'">
      <path d="M6 4 L6 28 L30 28" />
      <path d="M6 8 L22 8 M6 13 L22 13 M6 18 L22 18 M6 23 L22 23" />
      <path d="M6 28 L20 4" stroke-dasharray="1.8 2.4" opacity=".6" />
      <path d="M3 4 L3 28" stroke-width="2.6" />
    </g>
    <!-- varsayılan -->
    <g v-else>
      <circle cx="16" cy="16" r="10" />
    </g>
  </svg>
</template>

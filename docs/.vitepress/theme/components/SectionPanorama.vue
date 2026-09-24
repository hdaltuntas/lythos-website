<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'

// Bütün aileyi tek bir zemin kesitinde gösteren etkileşimli panorama: her yapı
// kendi yazılımının sayfasına bağlanır.
const { lang } = useData()
const prefix = computed(() => (lang.value.startsWith('en') ? '/en' : ''))
const active = ref<string | null>(null)
const router = useRouter()
// SVG içindeki <a> öğelerinin `pathname` özelliği yoktur ve VitePress'in bağlantı
// ön-yükleyicisi bunlarda hata verir; bu yüzden etiketler rol=link grupları olarak
// yönlendiriciyle gezinir.
const go = (id: string) => router.go(withBase(`${prefix.value}/${id}/`))

interface Spot {
  id: string
  name: string
  lx: number
  ly: number
  px: number
  py: number
  box: [number, number, number, number]
}

const spots: Spot[] = [
  { id: 'kinematic', name: 'Kinematic', lx: 58, ly: 14, px: 70, py: 52, box: [0, 20, 118, 150] },
  { id: 'le', name: 'LE', lx: 262, ly: 30, px: 290, py: 104, box: [230, 40, 150, 120] },
  { id: 'fea', name: 'FEA', lx: 188, ly: 292, px: 210, py: 190, box: [120, 150, 200, 140] },
  { id: 'bearing', name: 'Bearing', lx: 438, ly: 96, px: 438, py: 150, box: [390, 100, 100, 110] },
  { id: 'settle', name: 'Settle', lx: 610, ly: 80, px: 610, py: 124, box: [520, 100, 180, 120] },
  { id: 'pile', name: 'Pile', lx: 762, ly: 96, px: 762, py: 136, box: [715, 110, 95, 180] },
  { id: 'spwa', name: 'SPWA', lx: 900, ly: 96, px: 886, py: 150, box: [830, 110, 150, 170] },
  { id: 'msew', name: 'MSEW', lx: 1100, ly: 46, px: 1080, py: 96, box: [1000, 60, 200, 110] }
]

const hint = computed(() =>
  lang.value.startsWith('en')
    ? 'Every structure in this section is analysed by one of the Lythos tools — point at one.'
    : 'Bu kesitteki her yapı bir Lythos aracıyla çözülür — üzerine gelin.'
)
</script>

<template>
  <figure class="panorama" :class="{ focused: active }">
    <svg viewBox="0 0 1200 300" role="img" aria-label="Lythos family cross-section">
      <defs>
        <clipPath id="ground">
          <path d="M0 30 L60 30 L105 70 L230 70 L360 160 L880 160 L880 225 L960 225 L990 160 L1010 160 L1010 90 L1200 90 L1200 300 L0 300 Z" />
        </clipPath>
        <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 L0 7" class="hatch" />
        </pattern>
      </defs>

      <!-- zemin tabakaları -->
      <g clip-path="url(#ground)">
        <rect x="0" y="0" width="1200" height="300" class="l1" />
        <path d="M0 150 C 200 140, 400 175, 600 185 S 1000 170, 1200 180 V300 H0Z" class="l2" />
        <path d="M0 225 C 250 215, 450 245, 700 240 S 1050 235, 1200 245 V300 H0Z" class="l3" />
        <path d="M0 268 C 300 262, 600 280, 900 272 S 1100 268, 1200 272 V300 H0Z" class="l4" />
        <!-- kaya kütlesi -->
        <path d="M0 30 L60 30 L105 70 L150 300 L0 300Z" class="rock" />
        <path d="M0 60 L90 40 M0 100 L120 70 M0 140 L125 110 M0 180 L135 150 M20 30 L60 120 M50 45 L95 160 M10 150 L40 300" class="joint" />
        <!-- MSE dolgu bölgesi -->
        <rect x="1010" y="90" width="90" height="70" class="reinforced" />
      </g>

      <!-- yüzey çizgisi -->
      <path d="M0 30 L60 30 L105 70 L230 70 L360 160 L880 160 L880 225 L960 225 L990 160 L1010 160 L1010 90 L1200 90" class="surface" />

      <!-- Kinematic: kama -->
      <g class="spot" :class="{ on: active === 'kinematic' }">
        <path d="M60 30 L105 70 L72 70 Z" class="wedge" />
      </g>

      <!-- FEA: sonlu eleman ağı -->
      <g class="spot mesh" :class="{ on: active === 'fea' }">
        <path d="M150 170 L200 150 L250 175 L300 160 M150 170 L180 215 L200 150 L235 210 L250 175 L285 215 L300 160 M180 215 L235 210 L285 215 M150 170 L140 250 L180 215 L200 260 L235 210 L260 262 L285 215 M140 250 L200 260 L260 262" />
      </g>

      <!-- LE: kayma dairesi ve dilimler -->
      <g class="spot" :class="{ on: active === 'le' }">
        <path d="M195 70 A 150 150 0 0 0 372 160" class="slip" />
        <path d="M225 70 L225 100 M255 91 L255 124 M285 111 L285 140 M315 132 L315 152 M345 150 L345 160" class="slices" />
      </g>

      <!-- Bearing: temel ve göçme mekanizması -->
      <g class="spot" :class="{ on: active === 'bearing' }">
        <rect x="410" y="148" width="56" height="14" rx="2" class="struct" />
        <path d="M438 118 L438 144 M432 138 L438 144 L444 138" class="arrow" />
        <path d="M410 162 L438 190 L466 162 M410 162 C 392 185, 380 190, 368 162 M466 162 C 484 185, 496 190, 508 162" class="mech" />
      </g>

      <!-- Settle: dolgu ve oturma çanağı -->
      <g class="spot" :class="{ on: active === 'settle' }">
        <path d="M530 160 L575 126 L645 126 L690 160 Z" class="fill" />
        <path d="M520 160 C 560 160, 575 176, 610 176 C 645 176, 660 160, 700 160" class="trough" />
        <path d="M560 200 C 585 214, 635 214, 660 200" class="bulb" />
        <path d="M545 232 C 580 252, 640 252, 675 232" class="bulb" />
      </g>

      <!-- Pile: kazık grubu -->
      <g class="spot" :class="{ on: active === 'pile' }">
        <rect x="722" y="140" width="80" height="14" rx="2" class="struct" />
        <path d="M735 154 L735 282 M762 154 L762 282 M789 154 L789 282" class="piles" />
        <path d="M740 118 L740 136 M762 118 L762 136 M784 118 L784 136" class="arrow" />
      </g>

      <!-- SPWA: palplanş, ankraj ve kazı -->
      <g class="spot" :class="{ on: active === 'spwa' }">
        <path d="M880 150 L880 282" class="wall" />
        <path d="M880 176 L842 196" class="anchor" />
        <path d="M842 196 L826 204" class="grout" />
        <path d="M896 225 L896 212 M914 225 L914 214 M932 225 L932 212" class="dig" />
      </g>

      <!-- MSEW: donatılı zemin duvar -->
      <g class="spot" :class="{ on: active === 'msew' }">
        <path d="M1010 90 L1010 160" class="wall" />
        <path d="M1010 100 L1090 100 M1010 114 L1090 114 M1010 128 L1090 128 M1010 142 L1090 142 M1010 154 L1090 154" class="strips" />
        <path d="M1010 160 L1050 90" class="active-zone" />
      </g>

      <!-- etiketler -->
      <g
        v-for="s in spots"
        :key="s.id"
        class="hot"
        :class="{ on: active === s.id }"
        role="link"
        tabindex="0"
        :aria-label="`Lythos ${s.name}`"
        @click="go(s.id)"
        @keydown.enter="go(s.id)"
        @mouseenter="active = s.id"
        @mouseleave="active = null"
        @focus="active = s.id"
        @blur="active = null"
      >
        <rect :x="s.box[0]" :y="s.box[1]" :width="s.box[2]" :height="s.box[3]" class="hit" />
        <path :d="`M${s.lx} ${s.ly + 9} L${s.px} ${s.py}`" class="leader" />
        <circle :cx="s.px" :cy="s.py" r="3" class="dot" />
        <g :transform="`translate(${s.lx} ${s.ly})`">
          <rect :x="-(s.name.length * 4.4 + 12)" y="-11" :width="s.name.length * 8.8 + 24" height="22" rx="11" class="pill" />
          <text x="0" y="4.5" text-anchor="middle" class="label">{{ s.name }}</text>
        </g>
      </g>
    </svg>
    <figcaption>{{ hint }}</figcaption>
  </figure>
</template>

<style scoped>
.panorama {
  margin: 0;
  position: relative;
}
svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}
.l1 { fill: var(--lx-soil-1); }
.l2 { fill: var(--lx-soil-2); }
.l3 { fill: var(--lx-soil-3); }
.l4 { fill: var(--lx-soil-4); }
.rock { fill: var(--lx-rock); }
.joint { stroke: var(--lx-rock-line); stroke-width: 1.2; fill: none; }
.reinforced { fill: var(--lx-soil-1); filter: brightness(1.05); }
.hatch { stroke: var(--lx-ink-faint); stroke-width: 1; }
.surface { fill: none; stroke: var(--lx-ink); stroke-width: 2; stroke-linejoin: round; }

.spot { transition: opacity 0.25s ease, filter 0.25s ease; }
.panorama.focused .spot:not(.on) { opacity: 0.35; }
.spot.on { filter: drop-shadow(0 0 6px var(--lx-glow)); }

.wedge { fill: var(--vp-c-brand-1); opacity: 0.85; }
.mesh path { fill: none; stroke: var(--lx-ink); stroke-width: 0.9; opacity: 0.55; }
.mesh.on path { opacity: 1; stroke: var(--vp-c-brand-1); }
.slip {
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 2.6;
  stroke-dasharray: 7 6;
  animation: march 1.6s linear infinite;
}
.slices { stroke: var(--lx-ink); stroke-width: 1; opacity: 0.45; }
.struct { fill: var(--lx-concrete); stroke: var(--lx-ink); stroke-width: 1.4; }
.arrow { fill: none; stroke: var(--vp-c-brand-1); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.mech { fill: none; stroke: var(--vp-c-brand-1); stroke-width: 1.6; stroke-dasharray: 4 4; }
.fill { fill: var(--lx-fill); stroke: var(--lx-ink); stroke-width: 1.4; }
.trough { fill: none; stroke: var(--vp-c-brand-1); stroke-width: 2.2; stroke-dasharray: 6 5; animation: march 2s linear infinite; }
.bulb { fill: none; stroke: var(--lx-ink); stroke-width: 1.1; opacity: 0.5; stroke-dasharray: 3 4; }
.piles { stroke: var(--lx-concrete-dark); stroke-width: 6; stroke-linecap: round; }
.wall { stroke: var(--lx-steel); stroke-width: 5; stroke-linecap: round; }
.anchor { stroke: var(--lx-steel); stroke-width: 2; }
.grout { stroke: var(--vp-c-brand-1); stroke-width: 5; stroke-linecap: round; }
.dig { stroke: var(--lx-ink); stroke-width: 1; opacity: 0.35; }
.strips { stroke: var(--lx-steel); stroke-width: 2.2; }
.active-zone { stroke: var(--vp-c-brand-1); stroke-width: 1.4; stroke-dasharray: 4 4; }

.hot { cursor: pointer; outline: none; }
.hot:focus-visible .pill { stroke: var(--vp-c-brand-1); stroke-width: 2; }
.hit { fill: transparent; }
.leader { stroke: var(--lx-ink); stroke-width: 1; opacity: 0.5; }
.dot { fill: var(--vp-c-bg); stroke: var(--vp-c-brand-1); stroke-width: 2; }
.pill {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-divider);
  stroke-width: 1;
  transition: fill 0.2s ease, stroke 0.2s ease;
}
.label {
  font-family: var(--vp-font-family-base);
  font-size: 12.5px;
  font-weight: 600;
  fill: var(--vp-c-text-1);
  pointer-events: none;
  transition: fill 0.2s ease;
}
.hot.on .pill { fill: var(--vp-c-brand-1); stroke: var(--vp-c-brand-1); }
.hot.on .label { fill: #fff; }
.hot.on .leader { opacity: 1; stroke: var(--vp-c-brand-1); }

figcaption {
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 10px;
}

@keyframes march {
  to { stroke-dashoffset: -26; }
}
@media (prefers-reduced-motion: reduce) {
  .slip, .trough { animation: none; }
}
</style>

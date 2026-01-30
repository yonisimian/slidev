<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const animations = [
    {
      intervals: [
        { s: 0, e: 10, v: 'A' },
        { s: 5, e: 15, v: 'B' },
        { s: 20, e: 30, v: 'C' },
      ],
      query: null,
      results: [],
      action: 'IntervalTree with 3 overlapping intervals',
    },
    {
      intervals: [
        { s: 0, e: 10, v: 'A' },
        { s: 5, e: 15, v: 'B' },
        { s: 20, e: 30, v: 'C' },
      ],
      query: 7,
      results: ['A', 'B'],
      action: 'getContaining(7) → A, B',
    },
    {
      intervals: [
        { s: 0, e: 10, v: 'A' },
        { s: 5, e: 15, v: 'B' },
        { s: 20, e: 30, v: 'C' },
      ],
      query: 12,
      results: ['B'],
      action: 'getContaining(12) → B only',
    },
    {
      intervals: [
        { s: 0, e: 10, v: 'A' },
        { s: 5, e: 15, v: 'B' },
        { s: 20, e: 30, v: 'C' },
      ],
      query: null,
      results: [],
      action: 'Unlike IntervalMap: overlaps allowed!',
    },
    {
      intervals: [
        { s: 0, e: 10, v: 'A', hit: true },
        { s: 5, e: 15, v: 'B', hit: true },
        { s: 20, e: 30, v: 'C', hit: true },
      ],
      query: [8, 25],
      results: ['A', 'B', 'C'],
      action: 'getOverlapping(8,25) → all three!',
    },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % animations.length
    }, 2200)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const current = () => animations[phase.value]

  const isHit = (iv) => {
    const q = current().query
    if (!q) return iv.hit
    if (Array.isArray(q)) {
      return iv.s < q[1] && iv.e > q[0]
    }
    return q >= iv.s && q < iv.e
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-teal-400 mb-4">
      IntervalTree — Overlapping Interval Queries
    </div>

    <!-- Timeline visualization -->
    <div class="relative mb-4" style="width: 320px; height: 100px">
      <!-- Number line -->
      <div class="absolute bottom-0 left-0 right-0 flex">
        <div
          v-for="i in 7"
          :key="i"
          class="w-10 h-4 border-l border-gray-600 text-xs text-gray-500 text-center"
        >
          {{ (i - 1) * 5 }}
        </div>
      </div>

      <!-- Intervals (stacked) -->
      <div
        v-for="(iv, idx) in current().intervals"
        :key="idx"
        class="absolute h-6 border-2 rounded transition-all duration-400 flex items-center justify-center"
        :class="{
          'border-cyan-400 bg-cyan-400/30': isHit(iv) && idx === 0,
          'border-orange-400 bg-orange-400/30': isHit(iv) && idx === 1,
          'border-green-400 bg-green-400/30': isHit(iv) && idx === 2,
          'border-gray-600 bg-gray-800/30': !isHit(iv),
        }"
        :style="{
          left: (iv.s / 5) * 40 + 'px',
          width: ((iv.e - iv.s) / 5) * 40 + 'px',
          top: 20 + idx * 24 + 'px',
        }"
      >
        <span
          class="text-xs font-mono"
          :class="{
            'text-cyan-300': isHit(iv) && idx === 0,
            'text-orange-300': isHit(iv) && idx === 1,
            'text-green-300': isHit(iv) && idx === 2,
            'text-gray-500': !isHit(iv),
          }"
          >{{ iv.v }}</span
        >
      </div>

      <!-- Query point -->
      <div
        v-if="current().query && typeof current().query === 'number'"
        class="absolute w-0.5 bg-yellow-400 transition-all duration-300"
        :style="{
          left: (current().query / 5) * 40 + 'px',
          top: '16px',
          height: '60px',
        }"
      />

      <!-- Query range -->
      <div
        v-if="current().query && Array.isArray(current().query)"
        class="absolute border-2 border-yellow-400 bg-yellow-400/10 rounded transition-all duration-300"
        :style="{
          left: (current().query[0] / 5) * 40 + 'px',
          width: ((current().query[1] - current().query[0]) / 5) * 40 + 'px',
          top: '16px',
          height: '60px',
        }"
      />
    </div>

    <!-- Results -->
    <div v-if="current().results.length > 0" class="flex items-center gap-2 mb-2">
      <span class="text-gray-400 text-sm">Results:</span>
      <div
        v-for="r in current().results"
        :key="r"
        class="px-2 py-1 border rounded text-xs font-mono"
        :class="{
          'border-cyan-400 bg-cyan-400/20 text-cyan-300': r === 'A',
          'border-orange-400 bg-orange-400/20 text-orange-300': r === 'B',
          'border-green-400 bg-green-400/20 text-green-300': r === 'C',
        }"
      >
        {{ r }}
      </div>
    </div>

    <!-- Current action -->
    <div
      class="h-6 text-sm font-mono transition-all duration-300"
      :class="{
        'text-teal-400':
          current().action.includes('IntervalTree') || current().action.includes('Unlike'),
        'text-yellow-400': current().action.includes('get'),
      }"
    >
      {{ current().action }}
    </div>
  </div>
</template>

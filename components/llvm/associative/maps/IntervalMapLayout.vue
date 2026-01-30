<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  // Intervals: [start, end) -> value
  const animations = [
    { intervals: [], action: 'Empty IntervalMap' },
    { intervals: [{ s: 0, e: 20, v: 'A', color: 'cyan' }], action: 'insert([0,20) → A)' },
    {
      intervals: [
        { s: 0, e: 20, v: 'A', color: 'cyan' },
        { s: 50, e: 70, v: 'B', color: 'orange' },
      ],
      action: 'insert([50,70) → B)',
    },
    {
      intervals: [
        { s: 0, e: 20, v: 'A', color: 'cyan' },
        { s: 20, e: 40, v: 'A', color: 'cyan', new: true },
        { s: 50, e: 70, v: 'B', color: 'orange' },
      ],
      action: 'insert([20,40) → A)',
    },
    {
      intervals: [
        { s: 0, e: 40, v: 'A', color: 'cyan', merged: true },
        { s: 50, e: 70, v: 'B', color: 'orange' },
      ],
      action: 'Coalesced! [0,20) + [20,40) → [0,40)',
    },
    {
      intervals: [
        { s: 0, e: 40, v: 'A', color: 'cyan' },
        { s: 40, e: 50, v: 'C', color: 'green', new: true },
        { s: 50, e: 70, v: 'B', color: 'orange' },
      ],
      action: 'insert([40,50) → C)',
    },
    {
      intervals: [
        { s: 0, e: 40, v: 'A', color: 'cyan' },
        { s: 40, e: 50, v: 'C', color: 'green' },
        { s: 50, e: 70, v: 'B', color: 'orange' },
      ],
      action: 'Fully covered timeline with 3 values',
    },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % animations.length
    }, 2000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const current = () => animations[phase.value]

  const getColor = (c, isNew, isMerged) => {
    if (isMerged) return 'border-yellow-400 bg-yellow-400/30'
    if (isNew) return 'border-white bg-white/20'
    const colors = {
      cyan: 'border-cyan-400 bg-cyan-400/30',
      orange: 'border-orange-400 bg-orange-400/30',
      green: 'border-green-400 bg-green-400/30',
    }
    return colors[c] || colors.cyan
  }

  const getTextColor = (c) => {
    const colors = { cyan: 'text-cyan-300', orange: 'text-orange-300', green: 'text-green-300' }
    return colors[c] || 'text-cyan-300'
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-purple-400 mb-6">
      IntervalMap — Disjoint Ranges with Coalescing
    </div>

    <!-- Timeline visualization -->
    <div class="flex flex-col gap-2">
      <div class="text-sm text-gray-400 text-center">Slot Index Timeline</div>

      <!-- Number line -->
      <div class="relative">
        <div class="flex">
          <div
            v-for="i in 15"
            :key="i"
            class="w-6 h-4 border-l border-gray-600 text-xs text-gray-500 text-center"
          >
            {{ (i - 1) * 5 }}
          </div>
        </div>

        <!-- Intervals -->
        <div class="absolute top-6 left-0 right-0 h-10">
          <div
            v-for="(iv, idx) in current().intervals"
            :key="idx"
            class="absolute h-8 border-2 rounded transition-all duration-500 flex items-center justify-center"
            :class="getColor(iv.color, iv.new, iv.merged)"
            :style="{
              left: (iv.s / 5) * 24 + 'px',
              width: ((iv.e - iv.s) / 5) * 24 + 'px',
              opacity: iv.new ? 1 : 0.9,
            }"
          >
            <span class="text-xs font-mono" :class="getTextColor(iv.color)">
              [{{ iv.s }},{{ iv.e }}) → {{ iv.v }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Current action -->
    <div
      class="mt-14 h-6 text-sm font-mono transition-all duration-300"
      :class="{
        'text-gray-400': current().action.includes('Empty'),
        'text-blue-400': current().action.includes('insert'),
        'text-yellow-400': current().action.includes('Coalesced'),
        'text-green-400': current().action.includes('Fully'),
      }"
    >
      {{ current().action }}
    </div>
  </div>
</template>

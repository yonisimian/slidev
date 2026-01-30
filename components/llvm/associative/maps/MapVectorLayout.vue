<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const animations = [
    { vec: [], map: {}, action: 'Empty MapVector' },
    { vec: [{ k: 'A', v: '10' }], map: { A: 0 }, action: 'insert(A,10) — first in order' },
    {
      vec: [
        { k: 'A', v: '10' },
        { k: 'B', v: '20' },
      ],
      map: { A: 0, B: 1 },
      action: 'insert(B,20) — second in order',
    },
    {
      vec: [
        { k: 'A', v: '10' },
        { k: 'B', v: '20' },
        { k: 'C', v: '30' },
      ],
      map: { A: 0, B: 1, C: 2 },
      action: 'insert(C,30) — third in order',
    },
    {
      vec: [
        { k: 'A', v: '10' },
        { k: 'B', v: '99' },
        { k: 'C', v: '30' },
      ],
      map: { A: 0, B: 1, C: 2 },
      action: 'update B=99 — order preserved!',
    },
    {
      vec: [
        { k: 'A', v: '10' },
        { k: 'B', v: '99' },
        { k: 'C', v: '30' },
      ],
      map: { A: 0, B: 1, C: 2 },
      action: 'iterate: A→B→C (insertion order)',
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
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-cyan-400 mb-6">MapVector — Insertion Order Preserved</div>

    <div class="flex gap-12 items-start">
      <!-- Vector Part -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-cyan-300 mb-2">Vector (iteration order)</div>
        <div class="border-2 border-cyan-400 bg-cyan-400/10 rounded-lg p-2 min-h-[120px]">
          <div class="flex flex-col gap-1">
            <div
              v-for="(item, idx) in current().vec"
              :key="idx"
              class="flex items-center gap-2 transition-all duration-300"
            >
              <span class="text-xs text-gray-500 w-4">[{{ idx }}]</span>
              <div
                class="w-20 h-8 border-2 rounded flex items-center justify-center transition-all duration-300"
                :class="
                  phase === 4 && idx === 1
                    ? 'border-yellow-400 bg-yellow-400/20'
                    : 'border-cyan-400 bg-cyan-400/20'
                "
              >
                <span
                  class="font-mono text-sm"
                  :class="phase === 4 && idx === 1 ? 'text-yellow-300' : 'text-cyan-300'"
                >
                  {{ item.k }}:{{ item.v }}
                </span>
              </div>
            </div>
            <div v-if="current().vec.length === 0" class="text-gray-500 text-xs px-4 py-2">
              empty
            </div>
          </div>
        </div>
        <div class="text-xs text-cyan-300 mt-2">→ for (auto &kv : map)</div>
      </div>

      <!-- Plus sign -->
      <div class="text-3xl text-gray-500 mt-10">+</div>

      <!-- Map Part -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-orange-300 mb-2">Map (O(1) lookup)</div>
        <div class="border-2 border-orange-400 bg-orange-400/10 rounded-lg p-2 min-h-[120px]">
          <div class="grid grid-cols-2 gap-1">
            <div
              v-for="i in 4"
              :key="i"
              class="w-16 h-8 border rounded flex items-center justify-center text-xs font-mono transition-all duration-300"
              :class="{
                'border-gray-600 bg-gray-800/30 text-gray-600':
                  Object.keys(current().map).length < i,
                'border-orange-400 bg-orange-400/20 text-orange-300':
                  Object.keys(current().map).length >= i,
              }"
            >
              <span v-if="Object.entries(current().map)[i - 1]">
                {{ Object.entries(current().map)[i - 1][0] }}→{{
                  Object.entries(current().map)[i - 1][1]
                }}
              </span>
              <span v-else>·</span>
            </div>
          </div>
        </div>
        <div class="text-xs text-orange-300 mt-2">→ map.find(key)</div>
      </div>
    </div>

    <!-- Current action -->
    <div
      class="mt-6 h-6 text-sm font-mono transition-all duration-300"
      :class="{
        'text-cyan-400':
          !current().action.includes('update') && !current().action.includes('iterate'),
        'text-yellow-400': current().action.includes('update'),
        'text-green-400': current().action.includes('iterate'),
      }"
    >
      {{ current().action }}
    </div>
  </div>
</template>

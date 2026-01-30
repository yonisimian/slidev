<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const animations = [
    { inline: [], heap: [], action: 'Empty SmallDenseMap<K,V,4>' },
    { inline: [{ k: 'A', v: '1' }], heap: [], action: 'insert(A,1) — inline' },
    {
      inline: [
        { k: 'A', v: '1' },
        { k: 'B', v: '2' },
      ],
      heap: [],
      action: 'insert(B,2) — inline',
    },
    {
      inline: [
        { k: 'A', v: '1' },
        { k: 'B', v: '2' },
        { k: 'C', v: '3' },
      ],
      heap: [],
      action: 'insert(C,3) — inline',
    },
    {
      inline: [
        { k: 'A', v: '1' },
        { k: 'B', v: '2' },
        { k: 'C', v: '3' },
        { k: 'D', v: '4' },
      ],
      heap: [],
      action: 'insert(D,4) — inline FULL',
    },
    {
      inline: [],
      heap: [
        { k: 'A', v: '1' },
        { k: 'B', v: '2' },
        { k: 'C', v: '3' },
        { k: 'D', v: '4' },
        { k: 'E', v: '5' },
      ],
      action: 'insert(E,5) — OVERFLOW to heap!',
    },
    {
      inline: [],
      heap: [
        { k: 'A', v: '1' },
        { k: 'B', v: '2' },
        { k: 'C', v: '3' },
        { k: 'D', v: '4' },
        { k: 'E', v: '5' },
        { k: 'F', v: '6' },
      ],
      action: 'insert(F,6) — heap grows',
    },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % animations.length
    }, 1800)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const current = () => animations[phase.value]
  const isOverflow = () => current().heap.length > 0
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-green-400 mb-6">
      SmallDenseMap — Inline → Heap Transition
    </div>

    <div class="flex gap-8 items-start">
      <!-- Inline Storage -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-gray-400 mb-2">Inline (N=4)</div>
        <div
          class="border-2 rounded-lg p-2 transition-all duration-300"
          :class="
            isOverflow() ? 'border-gray-600 bg-gray-800/30' : 'border-green-400 bg-green-400/10'
          "
        >
          <div class="grid grid-cols-2 gap-1">
            <div
              v-for="i in 4"
              :key="i"
              class="w-16 h-10 border rounded flex items-center justify-center text-xs font-mono transition-all duration-300"
              :class="{
                'border-gray-600 bg-gray-800/30 text-gray-600':
                  isOverflow() || i > current().inline.length,
                'border-green-400 bg-green-400/20 text-green-300':
                  !isOverflow() && i <= current().inline.length,
              }"
            >
              <span v-if="!isOverflow() && current().inline[i - 1]">
                {{ current().inline[i - 1].k }}:{{ current().inline[i - 1].v }}
              </span>
              <span v-else>·</span>
            </div>
          </div>
          <div
            class="text-xs text-center mt-2"
            :class="isOverflow() ? 'text-gray-500' : 'text-green-300'"
          >
            {{ isOverflow() ? 'unused' : `${current().inline.length}/4 — stack` }}
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div
        class="flex flex-col items-center justify-center h-24 transition-all duration-500"
        :class="isOverflow() ? 'opacity-100' : 'opacity-30'"
      >
        <div class="text-2xl text-yellow-400">→</div>
        <div class="text-xs text-yellow-400">overflow</div>
      </div>

      <!-- Heap Storage -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-gray-400 mb-2">Heap</div>
        <div
          class="border-2 rounded-lg p-2 transition-all duration-300"
          :class="
            isOverflow() ? 'border-orange-400 bg-orange-400/10' : 'border-gray-600 bg-gray-800/30'
          "
        >
          <div class="flex gap-1">
            <div
              v-for="i in 8"
              :key="i"
              class="w-10 h-10 border rounded flex items-center justify-center text-xs font-mono transition-all duration-300"
              :class="{
                'border-gray-600 bg-gray-800/30 text-gray-600':
                  !isOverflow() || i > current().heap.length,
                'border-orange-400 bg-orange-400/20 text-orange-300':
                  isOverflow() && i <= current().heap.length,
              }"
            >
              <span v-if="isOverflow() && current().heap[i - 1]">{{
                current().heap[i - 1].k
              }}</span>
              <span v-else>·</span>
            </div>
          </div>
          <div
            class="text-xs text-center mt-2"
            :class="isOverflow() ? 'text-orange-300' : 'text-gray-500'"
          >
            {{ isOverflow() ? `${current().heap.length} entries — heap` : 'not allocated' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Current action -->
    <div
      class="mt-6 h-6 text-sm font-mono transition-all duration-300"
      :class="current().action.includes('OVERFLOW') ? 'text-yellow-400' : 'text-green-400'"
    >
      {{ current().action }}
    </div>
  </div>
</template>

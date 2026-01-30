<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const animations = [
    { entries: [], action: 'Empty IndexedMap' },
    { entries: [{ k: 1024, v: 'A', idx: 0 }], action: 'map[1024] = A  (idx: 1024-1024 = 0)' },
    {
      entries: [
        { k: 1024, v: 'A', idx: 0 },
        { k: 1026, v: 'B', idx: 2 },
      ],
      action: 'map[1026] = B  (idx: 2)',
    },
    {
      entries: [
        { k: 1024, v: 'A', idx: 0 },
        { k: 1026, v: 'B', idx: 2 },
        { k: 1025, v: 'C', idx: 1 },
      ],
      action: 'map[1025] = C  (idx: 1)',
    },
    {
      entries: [
        { k: 1024, v: 'A', idx: 0 },
        { k: 1025, v: 'C', idx: 1 },
        { k: 1026, v: 'B', idx: 2 },
      ],
      action: 'Result: Dense array with O(1) access!',
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

  const slots = () => {
    const arr = [null, null, null, null, null, null, null]
    for (const e of current().entries) {
      arr[e.idx] = e
    }
    return arr
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-purple-400 mb-4">IndexedMap — Array-backed Dense Map</div>

    <!-- Key → Index transformation -->
    <div class="flex items-center gap-4 mb-4">
      <div class="text-sm text-gray-400">ToIndexT:</div>
      <div
        class="px-3 py-1 bg-gray-800/50 border border-gray-600 rounded font-mono text-xs text-cyan-300"
      >
        key - 1024 → index
      </div>
    </div>

    <!-- Array visualization -->
    <div class="flex gap-1 mb-4">
      <div v-for="(slot, idx) in slots()" :key="idx" class="flex flex-col items-center">
        <div
          class="w-10 h-10 border-2 rounded flex items-center justify-center transition-all duration-400"
          :class="slot ? 'border-green-400 bg-green-400/20' : 'border-gray-600 bg-gray-800/30'"
        >
          <span v-if="slot" class="text-green-300 font-mono text-sm">{{ slot.v }}</span>
          <span v-else class="text-gray-500 text-xs">∅</span>
        </div>
        <span class="text-xs text-gray-500 mt-1">[{{ idx }}]</span>
        <span v-if="slot" class="text-xs text-cyan-400">{{ slot.k }}</span>
      </div>
    </div>

    <!-- Current action -->
    <div
      class="h-6 text-sm font-mono transition-all duration-300"
      :class="{
        'text-gray-400': current().action.includes('Empty'),
        'text-blue-400': current().action.includes('map['),
        'text-green-400': current().action.includes('Result'),
      }"
    >
      {{ current().action }}
    </div>

    <!-- Phase indicator -->
    <div class="mt-4 flex gap-1">
      <div
        v-for="i in animations.length"
        :key="i"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="phase === i - 1 ? 'bg-purple-400' : 'bg-gray-600'"
      />
    </div>
  </div>
</template>

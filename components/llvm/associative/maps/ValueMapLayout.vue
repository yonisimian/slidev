<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const animations = [
    {
      entries: [
        { k: '%x', v: 'Data1' },
        { k: '%y', v: 'Data2' },
      ],
      rauw: null,
      action: 'ValueMap with %x and %y',
    },
    {
      entries: [
        { k: '%x', v: 'Data1' },
        { k: '%y', v: 'Data2' },
      ],
      rauw: null,
      action: '%x.replaceAllUsesWith(%z)...',
    },
    {
      entries: [
        { k: '%x', v: 'Data1', fading: true },
        { k: '%y', v: 'Data2' },
      ],
      rauw: { from: '%x', to: '%z' },
      action: 'RAUW detected!',
    },
    {
      entries: [
        { k: '%z', v: 'Data1', highlight: true },
        { k: '%y', v: 'Data2' },
      ],
      rauw: null,
      action: 'Key auto-updated: %x → %z',
    },
    {
      entries: [
        { k: '%z', v: 'Data1' },
        { k: '%y', v: 'Data2' },
      ],
      rauw: null,
      action: 'Original data preserved!',
    },
    {
      entries: [
        { k: '%z', v: 'Data1' },
        { k: '%y', v: 'Data2', deleting: true },
      ],
      rauw: null,
      action: 'delete %y...',
    },
    { entries: [{ k: '%z', v: 'Data1' }], rauw: null, action: 'Entry removed on Value deletion' },
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
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-blue-400 mb-4">ValueMap — Tracks RAUW & Deletion</div>

    <!-- Map entries -->
    <div class="flex gap-4 mb-4">
      <div
        v-for="(entry, idx) in current().entries"
        :key="idx"
        class="flex items-center gap-2 transition-all duration-300"
        :class="{
          'opacity-30': entry.fading,
          'opacity-100': !entry.fading && !entry.deleting,
          'opacity-50 scale-95': entry.deleting,
        }"
      >
        <div
          class="px-3 py-2 border-2 rounded-l flex items-center justify-center transition-all duration-300"
          :class="{
            'border-blue-400 bg-blue-400/20': !entry.highlight && !entry.fading,
            'border-yellow-400 bg-yellow-400/20': entry.highlight,
            'border-red-400 bg-red-400/20': entry.fading || entry.deleting,
          }"
        >
          <span
            class="font-mono text-sm"
            :class="{
              'text-blue-300': !entry.highlight && !entry.fading,
              'text-yellow-300': entry.highlight,
              'text-red-300': entry.fading || entry.deleting,
            }"
            >{{ entry.k }}</span
          >
        </div>
        <div class="text-gray-400">→</div>
        <div class="px-3 py-2 border-2 border-green-400 bg-green-400/20 rounded-r">
          <span class="text-green-300 font-mono text-sm">{{ entry.v }}</span>
        </div>
      </div>
    </div>

    <!-- RAUW arrow visualization -->
    <div
      v-if="current().rauw"
      class="flex items-center gap-2 mb-4 px-4 py-2 border border-yellow-400/50 bg-yellow-400/10 rounded-lg transition-all duration-300"
    >
      <span class="text-red-300 font-mono">{{ current().rauw.from }}</span>
      <span class="text-yellow-400 text-xl">⟹</span>
      <span class="text-cyan-300 font-mono">{{ current().rauw.to }}</span>
    </div>

    <!-- Current action -->
    <div
      class="mt-2 h-6 text-sm font-mono transition-all duration-300"
      :class="{
        'text-blue-400':
          !current().action.includes('RAUW') &&
          !current().action.includes('delete') &&
          !current().action.includes('auto'),
        'text-yellow-400': current().action.includes('RAUW') || current().action.includes('auto'),
        'text-red-400': current().action.includes('delete') || current().action.includes('removed'),
        'text-green-400': current().action.includes('preserved'),
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
        :class="phase === i - 1 ? 'bg-blue-400' : 'bg-gray-600'"
      />
    </div>
  </div>
</template>

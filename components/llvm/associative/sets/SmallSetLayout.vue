<script setup>
  import { ref, onMounted, computed } from 'vue'

  const phase = ref(0)

  onMounted(() => {
    setTimeout(() => (phase.value = 1), 800)
    setTimeout(() => (phase.value = 2), 1600)
    setTimeout(() => (phase.value = 3), 2400)
  })

  const inlineCapacity = 8
  const elements = computed(() => {
    if (phase.value === 0) return []
    if (phase.value === 1) return [3, 7, 1]
    if (phase.value === 2) return [3, 7, 1, 9, 2, 5, 8, 4]
    return [3, 7, 1, 9, 2, 5, 8, 4, 6, 11, 13]
  })

  const isInline = computed(() => elements.value.length <= inlineCapacity)
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Title -->
    <div class="text-lg font-bold text-orange-400 mb-6">
      SmallSet&lt;int, 8&gt; - Small Buffer Optimization
    </div>

    <!-- Mode indicator -->
    <div class="flex gap-4 mb-4">
      <div
        class="px-4 py-2 rounded-lg border-2 transition-all duration-300"
        :class="
          isInline
            ? 'border-green-400 bg-green-400/20 text-green-300'
            : 'border-gray-600 bg-gray-800/30 text-gray-500'
        "
      >
        Linear Array Mode
      </div>
      <div
        class="px-4 py-2 rounded-lg border-2 transition-all duration-300"
        :class="
          !isInline
            ? 'border-purple-400 bg-purple-400/20 text-purple-300'
            : 'border-gray-600 bg-gray-800/30 text-gray-500'
        "
      >
        std::set Mode
      </div>
    </div>

    <!-- Inline Array -->
    <div class="flex flex-col items-center mb-6">
      <div class="text-sm text-gray-400 mb-2">
        Inline Storage ({{ elements.length }}/{{ inlineCapacity }})
      </div>
      <div class="flex gap-1">
        <div
          v-for="i in inlineCapacity"
          :key="i"
          class="w-10 h-10 border-2 rounded flex items-center justify-center text-sm font-mono transition-all duration-300"
          :class="[
            isInline && i <= elements.length
              ? 'border-green-400 bg-green-400/20 text-green-300'
              : 'border-gray-600 bg-gray-800/30 text-gray-600',
            !isInline ? 'opacity-30' : '',
          ]"
        >
          {{ isInline ? (elements[i - 1] ?? '') : '' }}
        </div>
      </div>
    </div>

    <!-- std::set (tree structure when overflowed) -->
    <div
      class="flex flex-col items-center transition-all duration-500"
      :class="isInline ? 'opacity-0 scale-95' : 'opacity-100 scale-100'"
    >
      <div class="text-sm text-purple-400 mb-2">Red-Black Tree (std::set)</div>
      <div class="relative h-24 w-80">
        <!-- Root -->
        <div
          class="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-8 rounded-full border-2 border-purple-400 bg-purple-400/20 flex items-center justify-center text-xs font-mono text-purple-300"
        >
          5
        </div>
        <!-- Level 1 -->
        <div
          class="absolute left-1/4 -translate-x-1/2 top-10 w-8 h-8 rounded-full border-2 border-purple-400 bg-purple-400/20 flex items-center justify-center text-xs font-mono text-purple-300"
        >
          2
        </div>
        <div
          class="absolute left-3/4 -translate-x-1/2 top-10 w-8 h-8 rounded-full border-2 border-purple-400 bg-purple-400/20 flex items-center justify-center text-xs font-mono text-purple-300"
        >
          9
        </div>
        <!-- Lines -->
        <svg class="absolute inset-0 w-full h-full" style="z-index: -1">
          <line x1="160" y1="32" x2="80" y2="40" stroke="#a855f7" stroke-width="2" />
          <line x1="160" y1="32" x2="240" y2="40" stroke="#a855f7" stroke-width="2" />
        </svg>
      </div>
    </div>

    <!-- Phase indicator -->
    <div class="mt-6 flex gap-3">
      <div
        v-for="(label, i) in ['Empty', 'Small (3)', 'Full (8)', 'Overflow (11)']"
        :key="i"
        class="px-3 py-1 rounded text-xs transition-all duration-300"
        :class="phase === i ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-400'"
      >
        {{ label }}
      </div>
    </div>

    <!-- Legend -->
    <div class="mt-4 flex gap-6 text-xs text-gray-500">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 border border-green-400 bg-green-400/20 rounded"></div>
        <span>Inline O(n) lookup</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 border border-purple-400 bg-purple-400/20 rounded"></div>
        <span>Tree O(log n) lookup</span>
      </div>
    </div>
  </div>
</template>

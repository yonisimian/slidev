<script setup>
  import { computed } from 'vue'
  import { useSlideContext } from '@slidev/client'

  const { $clicksContext: clicks } = useSlideContext()

  const currentClick = computed(() => clicks.current)

  const useCases = [
    {
      name: 'Sparse access',
      desc: 'Known size, few elements used',
      bgClass: 'bg-cyan-600',
    },
    {
      name: 'Expensive init',
      desc: 'Lazy construction saves time',
      bgClass: 'bg-blue-600',
    },
    {
      name: 'Large datasets',
      desc: 'Memory savings compound',
      bgClass: 'bg-purple-600',
    },
    {
      name: 'materialized_*',
      desc: 'Iterate only allocated pages',
      bgClass: 'bg-pink-600',
    },
  ]
</script>

<template>
  <div class="flex flex-col items-center gap-4 mt-2">
    <div class="text-gray-300 text-lg">When to use PagedVector?</div>

    <div class="flex gap-4">
      <div
        v-for="(useCase, idx) in useCases"
        :key="useCase.name"
        class="flex flex-col items-center px-4 py-3 rounded-lg border transition-all duration-300 min-w-32"
        :class="[
          currentClick === idx
            ? `${useCase.bgClass} border-white shadow-lg scale-105`
            : 'bg-gray-800 border-gray-600 opacity-70',
        ]"
      >
        <div class="font-semibold text-white text-sm">{{ useCase.name }}</div>
        <div class="text-xs mt-1" :class="currentClick === idx ? 'text-white/80' : 'text-gray-400'">
          {{ useCase.desc }}
        </div>
      </div>
    </div>

    <div class="mt-4 px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-600 max-w-2xl">
      <div class="text-center text-sm">
        <span class="text-gray-400">⚠ No </span>
        <span class="text-red-400 font-mono">begin()</span>
        <span class="text-gray-400">/</span>
        <span class="text-red-400 font-mono">end()</span>
        <span class="text-gray-400"> — use </span>
        <span class="text-cyan-400 font-mono">materialized_begin()</span>
        <span class="text-gray-400">/</span>
        <span class="text-cyan-400 font-mono">materialized_end()</span>
      </div>
    </div>
  </div>
</template>

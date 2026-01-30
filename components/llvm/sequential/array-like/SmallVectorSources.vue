<script setup>
  import { computed } from 'vue'
  import { useSlideContext } from '@slidev/client'

  const { $clicksContext: clicks } = useSlideContext()

  const examples = [
    { type: 'SmallVector<T, 4>', desc: 'Inline up to 4', bgClass: 'bg-green-600' },
    { type: 'SmallVector<T, 8>', desc: 'Inline up to 8', bgClass: 'bg-teal-600' },
    { type: 'SmallVector<T, 16>', desc: 'Inline up to 16', bgClass: 'bg-cyan-600' },
    { type: 'SmallVectorImpl<T>&', desc: 'Any N', bgClass: 'bg-purple-600' },
  ]

  const step = computed(() => Math.min(clicks?.current ?? 0, examples.length - 1))
</script>

<template>
  <div class="flex flex-col items-center gap-8 my-8">
    <div class="flex gap-12 items-center">
      <div class="flex flex-col gap-2">
        <div
          v-for="(ex, idx) in examples"
          :key="idx"
          class="px-3 py-1 rounded font-mono text-sm transition-all duration-500"
          :class="[
            idx === step
              ? [ex.bgClass, 'scale-110 shadow-lg']
              : 'bg-gray-700/50 opacity-50 scale-100',
          ]"
        >
          {{ ex.type }}
        </div>
      </div>
      <div class="text-4xl text-gray-400">→</div>
      <div class="flex flex-col items-center gap-2">
        <div
          class="bg-green-500 px-6 py-4 rounded-xl font-mono text-lg shadow-lg shadow-green-500/30"
        >
          SmallVectorImpl&lt;T&gt;
        </div>
        <div class="text-gray-500 text-xs">Base class for all SmallVector&lt;T, N&gt;</div>
        <!-- TODO: change tip to something more meaningful -->
      </div>
    </div>
  </div>
</template>

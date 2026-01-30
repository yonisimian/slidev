<script setup>
  import { computed } from 'vue'
  import { useSlideContext } from '@slidev/client'

  const { $clicksContext: clicks } = useSlideContext()

  const examples = [
    { type: 'C array', bgClass: 'bg-purple-600' },
    { type: 'std::vector', bgClass: 'bg-orange-600' },
    { type: 'SmallVector', bgClass: 'bg-teal-600' },
    { type: 'initializer_list', bgClass: 'bg-pink-600' },
  ]

  // Just observe the current click, clamped to our range
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
      <div class="bg-blue-500 px-6 py-4 rounded-xl font-mono text-lg shadow-lg shadow-blue-500/30">
        ArrayRef&lt;int&gt;
      </div>
    </div>
  </div>
</template>

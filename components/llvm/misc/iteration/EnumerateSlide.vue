<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const step = ref(0)
  let interval = null

  const items = ['apple', 'banana', 'cherry', 'date']

  onMounted(() => {
    interval = setInterval(() => {
      step.value = (step.value + 1) % 5
    }, 1500)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h2 class="text-2xl font-bold">
      <span class="text-blue-400">llvm::enumerate</span>
      <span class="text-gray-400 text-lg ml-2">— Get index with each element</span>
    </h2>

    <!-- Array with indices -->
    <div class="flex flex-col gap-2 mt-4">
      <!-- Index row -->
      <div class="flex items-center gap-2">
        <span class="text-gray-500 font-mono w-16 text-right text-sm">index:</span>
        <div class="flex gap-1">
          <div
            v-for="(_, idx) in items"
            :key="'idx-' + idx"
            class="w-20 h-8 rounded flex items-center justify-center font-mono text-sm font-bold transition-all duration-300"
            :class="{
              'text-yellow-300 scale-110': step === idx,
              'text-gray-600': step !== idx && step !== 4,
              'text-yellow-400': step === 4,
            }"
          >
            {{ idx }}
          </div>
        </div>
      </div>

      <!-- Values row -->
      <div class="flex items-center gap-2">
        <span class="text-gray-500 font-mono w-16 text-right text-sm">value:</span>
        <div class="flex gap-1">
          <div
            v-for="(item, idx) in items"
            :key="'item-' + idx"
            class="w-20 h-10 border-2 rounded flex items-center justify-center font-mono text-sm transition-all duration-300"
            :class="{
              'border-blue-400 bg-blue-400/20 text-blue-300 scale-110': step === idx,
              'border-gray-600 bg-gray-800/30 text-gray-500': step !== idx && step !== 4,
              'border-blue-400/50 bg-blue-400/10 text-blue-400': step === 4,
            }"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- Arrow -->
    <div class="text-blue-400 text-3xl">⬇</div>

    <!-- Code example -->
    <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 font-mono text-sm">
      <div class="text-gray-500">// Python-like enumerate</div>
      <div>
        <span class="text-purple-400">for</span>
        <span class="text-gray-300"> (</span>
        <span class="text-blue-400">auto</span>
        <span class="text-gray-300"> [idx, val] : </span>
        <span class="text-blue-400">llvm::enumerate</span>
        <span class="text-gray-300">(items)) {</span>
      </div>
      <div class="pl-4">
        <span class="text-cyan-400">print</span>
        <span class="text-gray-300">(idx, val);</span>
      </div>
      <div class="text-gray-300">}</div>
    </div>

    <!-- Current output -->
    <div
      v-if="step < 4"
      class="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700"
    >
      <span class="text-gray-400">output:</span>
      <span class="text-yellow-300 font-mono font-bold">{{ step }}</span>
      <span class="text-gray-500">→</span>
      <span class="text-blue-300 font-mono">"{{ items[step] }}"</span>
    </div>
    <div v-else class="text-gray-400 italic">Index + value pairs for all elements ✓</div>

    <!-- Comparison with manual indexing -->
    <div class="mt-2 text-xs text-gray-500 flex items-center gap-2">
      <span class="text-red-400 line-through">for (size_t i = 0; i &lt; items.size(); ++i)</span>
      <span>→</span>
      <span class="text-green-400">Cleaner & safer!</span>
    </div>
  </div>
</template>

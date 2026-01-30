<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  // Different seq examples
  const examples = [
    { start: 0, end: 5, values: [0, 1, 2, 3, 4], label: 'seq(5)', color: 'purple' },
    { start: 2, end: 7, values: [2, 3, 4, 5, 6], label: 'seq(2, 7)', color: 'cyan' },
    {
      start: 'A',
      end: 'F',
      values: ['A', 'B', 'C', 'D', 'E'],
      label: "seq_inclusive('A', 'E')",
      color: 'pink',
    },
  ]

  const currentExample = computed(() => examples[phase.value % 3])
  const highlightIdx = ref(-1)

  onMounted(() => {
    let tick = 0
    interval = setInterval(() => {
      tick++
      if (tick <= 5) {
        highlightIdx.value = tick - 1
      } else if (tick === 6) {
        highlightIdx.value = -1
      } else {
        tick = 0
        phase.value = (phase.value + 1) % 3
      }
    }, 600)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h2 class="text-2xl font-bold">
      <span class="text-purple-400">llvm::seq</span>
      <span class="text-gray-400 text-lg ml-2">— Generate numeric ranges</span>
    </h2>

    <!-- Current example label -->
    <div
      class="font-mono text-lg font-bold transition-all duration-300"
      :class="{
        'text-purple-400': currentExample.color === 'purple',
        'text-cyan-400': currentExample.color === 'cyan',
        'text-pink-400': currentExample.color === 'pink',
      }"
    >
      {{ currentExample.label }}
    </div>

    <!-- Generated sequence visualization -->
    <div class="flex gap-2 mt-2">
      <div
        v-for="(val, idx) in currentExample.values"
        :key="idx"
        class="w-14 h-14 border-2 rounded-lg flex items-center justify-center font-mono text-lg font-bold transition-all duration-300"
        :class="{
          'border-purple-400 bg-purple-400/20 text-purple-300 scale-110':
            currentExample.color === 'purple' && highlightIdx === idx,
          'border-cyan-400 bg-cyan-400/20 text-cyan-300 scale-110':
            currentExample.color === 'cyan' && highlightIdx === idx,
          'border-pink-400 bg-pink-400/20 text-pink-300 scale-110':
            currentExample.color === 'pink' && highlightIdx === idx,
          'border-gray-600 bg-gray-800/30 text-gray-400': highlightIdx !== idx,
        }"
      >
        {{ val }}
      </div>
    </div>

    <!-- Arrow -->
    <div class="text-purple-400 text-3xl">⬇</div>

    <!-- Code examples -->
    <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 font-mono text-sm space-y-3">
      <div>
        <span class="text-gray-500">// 0 to n-1</span>
        <div>
          <span class="text-purple-400">for</span>
          <span class="text-gray-300"> (</span>
          <span class="text-blue-400">int</span>
          <span class="text-gray-300"> i : </span>
          <span class="text-purple-400">llvm::seq</span>
          <span class="text-gray-300">(5)) { ... }</span>
        </div>
      </div>
      <div>
        <span class="text-gray-500">// start to end-1</span>
        <div>
          <span class="text-purple-400">for</span>
          <span class="text-gray-300"> (</span>
          <span class="text-blue-400">int</span>
          <span class="text-gray-300"> i : </span>
          <span class="text-cyan-400">llvm::seq</span>
          <span class="text-gray-300">(2, 7)) { ... }</span>
        </div>
      </div>
      <div>
        <span class="text-gray-500">// inclusive, works with enums!</span>
        <div>
          <span class="text-purple-400">for</span>
          <span class="text-gray-300"> (</span>
          <span class="text-blue-400">char</span>
          <span class="text-gray-300"> c : </span>
          <span class="text-pink-400">llvm::seq_inclusive</span>
          <span class="text-gray-300">('A', 'E')) { ... }</span>
        </div>
      </div>
    </div>

    <!-- Key benefit -->
    <div class="mt-2 flex items-center gap-4 text-sm">
      <div class="flex items-center gap-2">
        <span class="text-gray-500">No allocations</span>
        <span class="text-green-400">✓</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500">Works with enums</span>
        <span class="text-green-400">✓</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500">Lazy generation</span>
        <span class="text-green-400">✓</span>
      </div>
    </div>
  </div>
</template>

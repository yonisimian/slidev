<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const scenarios = [
    { input: 'Expected<int>{42}', result: '42', status: 'success' },
    { input: 'Expected<int>{Error}', result: 'exit(1)', status: 'error' },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % scenarios.length
    }, 2500)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-6 mt-4">
    <!-- Flow diagram -->
    <div class="flex items-center gap-4">
      <!-- Input -->
      <div
        class="px-4 py-3 border-2 rounded-lg transition-all duration-500"
        :class="
          scenarios[phase].status === 'success'
            ? 'border-green-400 bg-green-400/10'
            : 'border-red-400 bg-red-400/10'
        "
      >
        <span
          class="font-mono text-sm"
          :class="scenarios[phase].status === 'success' ? 'text-green-300' : 'text-red-300'"
          >{{ scenarios[phase].input }}</span
        >
      </div>

      <!-- Arrow through ExitOnError -->
      <div class="flex flex-col items-center">
        <span class="text-gray-500">→</span>
      </div>

      <div class="px-4 py-3 border-2 border-orange-400 bg-orange-400/10 rounded-lg">
        <span class="text-orange-300 font-mono text-sm">ExitOnErr()</span>
      </div>

      <div class="flex flex-col items-center">
        <span class="text-gray-500">→</span>
      </div>

      <!-- Output -->
      <div
        class="px-4 py-3 border-2 rounded-lg transition-all duration-500"
        :class="
          scenarios[phase].status === 'success'
            ? 'border-green-400 bg-green-400/10'
            : 'border-red-400 bg-red-400/10'
        "
      >
        <span
          class="font-mono text-sm"
          :class="scenarios[phase].status === 'success' ? 'text-green-300' : 'text-red-300'"
          >{{ scenarios[phase].result }}</span
        >
      </div>
    </div>

    <!-- Banner example -->
    <div class="bg-gray-900 rounded-lg border border-gray-700 p-3">
      <div class="text-xs text-gray-400 mb-2">Terminal output on error:</div>
      <div class="font-mono text-sm">
        <span class="text-orange-400">llc: error: </span>
        <span class="text-red-300">could not parse input file</span>
      </div>
    </div>

    <!-- How it works -->
    <div class="flex gap-4 text-xs">
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 border border-green-400 bg-green-400/20 rounded" />
        <span class="text-gray-400">Success → return value</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 border border-red-400 bg-red-400/20 rounded" />
        <span class="text-gray-400">Error → print & exit(1)</span>
      </div>
    </div>
  </div>
</template>

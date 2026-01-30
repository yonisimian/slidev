<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const chain = [
    { errors: ['StringError'], label: 'Single error' },
    { errors: ['StringError', 'FileError'], label: 'Joined errors' },
    { errors: ['StringError', 'FileError', 'MyError'], label: 'Error chain' },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % chain.length
    }, 2000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-6 mt-4">
    <!-- Type hierarchy -->
    <div class="flex flex-col items-center">
      <div class="bg-gray-900 rounded-lg border border-gray-700 p-4">
        <div class="flex flex-col items-center gap-2">
          <!-- Base -->
          <div class="px-4 py-2 border-2 border-red-400 bg-red-400/10 rounded-lg">
            <span class="text-red-300 font-mono text-sm">ErrorInfoBase</span>
          </div>
          <div class="text-gray-500">↓</div>
          <!-- Error wrapper -->
          <div class="px-4 py-2 border-2 border-orange-400 bg-orange-400/10 rounded-lg">
            <span class="text-orange-300 font-mono text-sm">Error</span>
            <span class="text-gray-500 text-xs ml-2">(type-erased handle)</span>
          </div>
          <div class="text-gray-500">↓</div>
          <!-- Concrete types -->
          <div class="flex gap-2">
            <div
              v-for="(err, idx) in chain[phase].errors"
              :key="idx"
              class="px-3 py-1 border border-cyan-400 bg-cyan-400/10 rounded transition-all duration-300"
            >
              <span class="text-cyan-300 font-mono text-xs">{{ err }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- joinErrors visualization -->
    <div class="flex items-center gap-3 text-sm">
      <span class="text-gray-400 font-mono">joinErrors(E1, E2)</span>
      <span class="text-gray-500">→</span>
      <div class="px-3 py-1 border border-yellow-400 bg-yellow-400/10 rounded">
        <span class="text-yellow-300 font-mono">ErrorList</span>
      </div>
    </div>

    <!-- Current state -->
    <div class="text-sm text-gray-400">
      {{ chain[phase].label }}
    </div>
  </div>
</template>

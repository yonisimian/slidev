<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const step = ref(0)
  let interval = null

  const states = [
    { isValue: true, value: 42, error: null, label: 'Expected<int>{42}' },
    { isValue: true, value: 0, error: null, label: 'Expected<int>{0}' },
    { isValue: false, value: null, error: 'parse error', label: 'Expected<int>{Error}' },
    { isValue: false, value: null, error: 'file not found', label: 'Expected<int>{Error}' },
  ]

  const current = computed(() => states[step.value])

  onMounted(() => {
    interval = setInterval(() => {
      step.value = (step.value + 1) % states.length
    }, 2000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-6 mt-4">
    <!-- Code block -->
    <div class="flex items-start gap-6">
      <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <pre
          class="px-4 py-3 font-mono text-sm leading-relaxed"
        ><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">T</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">Expected</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#569cd6]">union</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#4ec9b0]">T</span> <span class="text-[#9cdcfe]">Val</span><span class="text-[#d4d4d4]">;</span> <span class="text-[#4ec9b0]">Error</span> <span class="text-[#9cdcfe]">Err</span><span class="text-[#d4d4d4]">; };</span>
    <span class="text-[#569cd6]">bool</span> <span class="text-[#9cdcfe]">HasError</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#569cd6]">{{ !current.isValue }}</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">};</span></pre>
      </div>
      <div class="text-gray-500 text-sm mt-2">← Tagged union</div>
    </div>

    <!-- Visual representation -->
    <div class="flex gap-4 items-center">
      <!-- Value side -->
      <div
        class="flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-500"
        :class="
          current.isValue
            ? 'border-green-400 bg-green-400/10 scale-105'
            : 'border-gray-600 bg-gray-800/30 opacity-40'
        "
      >
        <div class="text-xs text-gray-400 mb-1">Value</div>
        <div class="w-16 h-10 border border-green-400/50 rounded flex items-center justify-center">
          <span class="font-mono text-green-300">{{ current.isValue ? current.value : '—' }}</span>
        </div>
      </div>

      <!-- OR -->
      <div class="text-gray-500 font-bold">OR</div>

      <!-- Error side -->
      <div
        class="flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-500"
        :class="
          !current.isValue
            ? 'border-red-400 bg-red-400/10 scale-105'
            : 'border-gray-600 bg-gray-800/30 opacity-40'
        "
      >
        <div class="text-xs text-gray-400 mb-1">Error</div>
        <div class="w-24 h-10 border border-red-400/50 rounded flex items-center justify-center">
          <span class="font-mono text-red-300 text-xs">{{ current.error || '—' }}</span>
        </div>
      </div>
    </div>

    <!-- Check pattern -->
    <div class="flex items-center gap-4 text-sm">
      <code class="text-gray-400">if (E)</code>
      <span class="text-gray-500">→</span>
      <span :class="current.isValue ? 'text-green-400' : 'text-red-400'">
        {{ current.isValue ? 'use(*E)' : 'handle E.takeError()' }}
      </span>
    </div>

    <!-- Current state -->
    <div
      class="text-sm font-mono transition-all duration-300"
      :class="current.isValue ? 'text-green-400' : 'text-red-400'"
    >
      {{ current.label }}
    </div>
  </div>
</template>

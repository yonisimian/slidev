<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const step = ref(0)
  let interval = null

  const states = [
    { hasValue: false, value: null, label: 'std::nullopt' },
    { hasValue: true, value: 42, label: 'Optional<int>{42}' },
    { hasValue: true, value: 0, label: 'Optional<int>{0}' },
    { hasValue: false, value: null, label: 'std::nullopt' },
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
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">Optional</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#4ec9b0]">T</span> <span class="text-[#9cdcfe]">Storage</span><span class="text-[#d4d4d4]">;</span>
    <span class="text-[#569cd6]">bool</span> <span class="text-[#9cdcfe]">hasVal</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#569cd6]">{{ current.hasValue }}</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">};</span></pre>
      </div>
      <div class="text-gray-500 text-sm mt-2">← sizeof(T) + 1 byte</div>
    </div>

    <!-- Visual representation -->
    <div class="flex gap-8 items-center">
      <!-- hasVal indicator -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-400 mb-1">hasVal</div>
        <div
          class="w-16 h-12 border-2 rounded-lg flex items-center justify-center transition-all duration-500"
          :class="
            current.hasValue ? 'border-green-400 bg-green-400/20' : 'border-red-400 bg-red-400/20'
          "
        >
          <span
            class="font-mono font-bold"
            :class="current.hasValue ? 'text-green-300' : 'text-red-300'"
            >{{ current.hasValue }}</span
          >
        </div>
      </div>

      <!-- Storage -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-400 mb-1">Storage</div>
        <div
          class="w-20 h-12 border-2 rounded-lg flex items-center justify-center transition-all duration-500"
          :class="
            current.hasValue ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-600 bg-gray-800/30'
          "
        >
          <span
            class="font-mono text-lg"
            :class="current.hasValue ? 'text-cyan-300' : 'text-gray-500'"
            >{{ current.hasValue ? current.value : '?' }}</span
          >
        </div>
      </div>

      <!-- Operator* result -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-400 mb-1">*opt</div>
        <div
          class="w-20 h-12 border-2 rounded-lg flex items-center justify-center transition-all duration-500"
          :class="{
            'border-green-400 bg-green-400/20': current.hasValue,
            'border-red-400 bg-red-400/20 animate-pulse': !current.hasValue,
          }"
        >
          <span
            class="font-mono"
            :class="current.hasValue ? 'text-green-300 text-lg' : 'text-red-300 text-sm'"
            >{{ current.hasValue ? current.value : 'UB!' }}</span
          >
        </div>
      </div>
    </div>

    <!-- Current state -->
    <div
      class="text-sm font-mono transition-all duration-300"
      :class="current.hasValue ? 'text-cyan-400' : 'text-gray-500'"
    >
      {{ current.label }}
    </div>
  </div>
</template>

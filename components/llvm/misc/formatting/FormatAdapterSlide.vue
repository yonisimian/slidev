<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const adapters = [
    {
      name: 'fmt_align',
      desc: 'Aligned output',
      example: 'fmt_align("hi", AlignStyle::Center, 10)',
      result: '"    hi    "',
    },
    { name: 'fmt_pad', desc: 'Padded numbers', example: "fmt_pad(42, 5, '0')", result: '"00042"' },
    {
      name: 'fmt_repeat',
      desc: 'Repeated strings',
      example: 'fmt_repeat("=-", 4)',
      result: '"=-=-=-=-"',
    },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % adapters.length
    }, 2500)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <h2 class="text-2xl font-bold">
      <span class="text-orange-400">FormatAdapter</span>
      <span class="text-gray-400 text-lg ml-2">— Runtime formatting helpers</span>
    </h2>

    <!-- Adapter cards -->
    <div class="flex gap-3 mt-4">
      <div
        v-for="(adapter, idx) in adapters"
        :key="idx"
        class="flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300 w-52"
        :class="{
          'border-orange-400 bg-orange-400/10 scale-105': phase === idx,
          'border-gray-700 bg-gray-800/30 opacity-50': phase !== idx,
        }"
      >
        <div
          class="font-mono font-bold transition-all duration-300"
          :class="{ 'text-orange-300': phase === idx, 'text-gray-500': phase !== idx }"
        >
          {{ adapter.name }}
        </div>
        <div class="text-gray-400 text-xs mt-1">{{ adapter.desc }}</div>
      </div>
    </div>

    <!-- Current example -->
    <div class="mt-4 flex flex-col items-center gap-2">
      <div class="bg-gray-900 rounded-lg border border-gray-700 px-4 py-2 font-mono text-sm">
        <span class="text-gray-300">formatv(</span>
        <span class="text-orange-300">"{0}"</span>
        <span class="text-gray-300">, </span>
        <span class="text-orange-400">{{ adapters[phase].example }}</span>
        <span class="text-gray-300">)</span>
      </div>
      <div class="text-gray-500 text-xl">↓</div>
      <div
        class="bg-green-900/30 border border-green-400/50 rounded-lg px-4 py-2 font-mono text-green-300"
      >
        {{ adapters[phase].result }}
      </div>
    </div>

    <!-- Custom adapter example -->
    <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 font-mono text-xs mt-4">
      <div class="text-gray-500">// Create custom adapters by inheriting FormatAdapter</div>
      <div>
        <span class="text-purple-400">struct</span>
        <span class="text-orange-400"> Quoted</span>
        <span class="text-gray-300"> : </span>
        <span class="text-cyan-400">FormatAdapter</span>
        <span class="text-gray-300">&lt;</span>
        <span class="text-blue-400">StringRef</span>
        <span class="text-gray-300">&gt; {</span>
      </div>
      <div class="pl-4">
        <span class="text-purple-400">void</span>
        <span class="text-yellow-300"> format</span>
        <span class="text-gray-300">(</span>
        <span class="text-cyan-400">raw_ostream</span>
        <span class="text-gray-300"> &amp;OS, </span>
        <span class="text-cyan-400">StringRef</span>
        <span class="text-gray-300">) override {</span>
      </div>
      <div class="pl-8">
        <span class="text-gray-300">OS &lt;&lt; </span>
        <span class="text-orange-300">'"'</span>
        <span class="text-gray-300"> &lt;&lt; Item &lt;&lt; </span>
        <span class="text-orange-300">'"'</span>
        <span class="text-gray-300">;</span>
      </div>
      <div class="pl-4 text-gray-300">}</div>
      <div class="text-gray-300">};</div>
    </div>

    <!-- Comparison -->
    <div class="flex gap-6 mt-2 text-xs">
      <div class="flex flex-col items-center text-gray-400">
        <span class="text-green-400 font-mono">format_provider</span>
        <span class="text-gray-500">Static, type-based</span>
      </div>
      <div class="text-gray-600 mt-2">vs</div>
      <div class="flex flex-col items-center text-gray-400">
        <span class="text-orange-400 font-mono">FormatAdapter</span>
        <span class="text-gray-500">Dynamic, runtime helpers</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % 3
    }, 3000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h2 class="text-2xl font-bold">
      <span class="text-green-400">format_provider</span>
      <span class="text-gray-400 text-lg ml-2">— Make your types formattable</span>
    </h2>

    <!-- Type being formatted -->
    <div class="mt-2 flex items-center gap-4">
      <div
        class="bg-gray-900 border-2 border-blue-400/50 rounded-lg px-4 py-3 transition-all duration-500"
        :class="{ 'scale-105 border-blue-400': phase === 0 }"
      >
        <div class="text-blue-300 font-mono text-sm">struct Point { int x, y; };</div>
      </div>
      <div class="text-gray-500 text-2xl">→</div>
      <div
        class="bg-gray-900 border-2 border-green-400/50 rounded-lg px-4 py-3 transition-all duration-500"
        :class="{ 'scale-105 border-green-400': phase === 1 }"
      >
        <div class="text-green-300 font-mono text-sm">"(3, 7)"</div>
      </div>
    </div>

    <!-- Code example -->
    <div
      class="bg-gray-900 rounded-lg border border-gray-700 p-4 font-mono text-xs mt-2 transition-all duration-500"
      :class="{ 'ring-2 ring-green-400/50': phase === 2 }"
    >
      <div class="text-gray-500">// Specialize format_provider for your type</div>
      <div>
        <span class="text-purple-400">template</span>
        <span class="text-gray-300"> &lt;&gt;</span>
      </div>
      <div>
        <span class="text-purple-400">struct</span>
        <span class="text-green-400"> format_provider</span>
        <span class="text-gray-300">&lt;</span>
        <span class="text-blue-400">Point</span>
        <span class="text-gray-300">&gt; {</span>
      </div>
      <div class="pl-4">
        <span class="text-purple-400">static void</span>
        <span class="text-yellow-300"> format</span>
        <span class="text-gray-300">(</span>
        <span class="text-blue-400">const Point</span>
        <span class="text-gray-300"> &amp;P,</span>
      </div>
      <div class="pl-20">
        <span class="text-cyan-400">raw_ostream</span>
        <span class="text-gray-300"> &amp;OS,</span>
      </div>
      <div class="pl-20">
        <span class="text-cyan-400">StringRef</span>
        <span class="text-gray-300"> Style) {</span>
      </div>
      <div class="pl-8">
        <span class="text-gray-300">OS &lt;&lt; </span>
        <span class="text-orange-300">"("</span>
        <span class="text-gray-300"> &lt;&lt; P.x &lt;&lt; </span>
        <span class="text-orange-300">", "</span>
        <span class="text-gray-300"> &lt;&lt; P.y &lt;&lt; </span>
        <span class="text-orange-300">")"</span>
        <span class="text-gray-300">;</span>
      </div>
      <div class="pl-4 text-gray-300">}</div>
      <div class="text-gray-300">};</div>
    </div>

    <!-- Usage -->
    <div class="bg-gray-800 rounded-lg px-4 py-2 font-mono text-sm">
      <span class="text-gray-300">formatv(</span>
      <span class="text-orange-300">"Location: {0}"</span>
      <span class="text-gray-300">, Point{3, 7}); </span>
      <span class="text-gray-500">// "Location: (3, 7)"</span>
    </div>

    <!-- Key points -->
    <div class="flex gap-6 mt-2 text-xs">
      <div class="flex items-center gap-2 text-gray-400">
        <span class="text-green-400">✓</span> Works with formatv automatically
      </div>
      <div class="flex items-center gap-2 text-gray-400">
        <span class="text-green-400">✓</span> Style parameter for custom formats
      </div>
      <div class="flex items-center gap-2 text-gray-400">
        <span class="text-green-400">✓</span> No inheritance required
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const step = ref(0)
  let interval = null

  const streams = [
    { name: 'raw_fd_ostream', target: 'File descriptor', icon: '📄', color: 'cyan' },
    { name: 'raw_string_ostream', target: 'std::string', icon: '📝', color: 'green' },
    { name: 'raw_svector_ostream', target: 'SmallVector<char>', icon: '⚡', color: 'yellow' },
    { name: 'raw_null_ostream', target: '/dev/null', icon: '🕳️', color: 'gray' },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      step.value = (step.value + 1) % streams.length
    }, 2000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h2 class="text-2xl font-bold">
      <span class="text-cyan-400">llvm::raw_ostream</span>
      <span class="text-gray-400 text-lg ml-2">— Fast, unified output stream</span>
    </h2>

    <!-- Stream types visualization -->
    <div class="flex gap-3 mt-4">
      <div
        v-for="(stream, idx) in streams"
        :key="idx"
        class="flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-300 w-36"
        :class="{
          'border-cyan-400 bg-cyan-400/10 scale-105': stream.color === 'cyan' && step === idx,
          'border-green-400 bg-green-400/10 scale-105': stream.color === 'green' && step === idx,
          'border-yellow-400 bg-yellow-400/10 scale-105': stream.color === 'yellow' && step === idx,
          'border-gray-400 bg-gray-400/10 scale-105': stream.color === 'gray' && step === idx,
          'border-gray-700 bg-gray-800/30 opacity-50': step !== idx,
        }"
      >
        <div class="text-2xl">{{ stream.icon }}</div>
        <div
          class="font-mono text-xs mt-1 transition-all duration-300"
          :class="{
            'text-cyan-300': stream.color === 'cyan' && step === idx,
            'text-green-300': stream.color === 'green' && step === idx,
            'text-yellow-300': stream.color === 'yellow' && step === idx,
            'text-gray-300': stream.color === 'gray' && step === idx,
            'text-gray-500': step !== idx,
          }"
        >
          {{ stream.name }}
        </div>
        <div class="text-gray-500 text-xs mt-1">→ {{ stream.target }}</div>
      </div>
    </div>

    <!-- Operator << chain -->
    <div class="mt-4 bg-gray-900 rounded-lg border border-gray-700 p-4">
      <div class="flex items-center gap-2 font-mono text-sm">
        <span class="text-cyan-400">OS</span>
        <span class="text-gray-400">&lt;&lt;</span>
        <span class="text-orange-300">"Value: "</span>
        <span class="text-gray-400">&lt;&lt;</span>
        <span class="text-purple-300">42</span>
        <span class="text-gray-400">&lt;&lt;</span>
        <span class="text-orange-300">" (0x"</span>
        <span class="text-gray-400">&lt;&lt;</span>
        <span class="text-blue-400">format_hex</span>
        <span class="text-gray-300">(42)</span>
        <span class="text-gray-400">&lt;&lt;</span>
        <span class="text-orange-300">")\n"</span>
        <span class="text-gray-300">;</span>
      </div>
    </div>

    <!-- Key benefits -->
    <div class="grid grid-cols-2 gap-4 mt-4 text-sm">
      <div class="flex items-start gap-2 bg-gray-800/50 rounded-lg p-3">
        <span class="text-green-400">⚡</span>
        <div>
          <div class="text-gray-300 font-semibold">Buffered I/O</div>
          <div class="text-gray-500 text-xs">Internal buffer reduces syscalls</div>
        </div>
      </div>
      <div class="flex items-start gap-2 bg-gray-800/50 rounded-lg p-3">
        <span class="text-blue-400">🔗</span>
        <div>
          <div class="text-gray-300 font-semibold">Unified interface</div>
          <div class="text-gray-500 text-xs">Same API for files, strings, vectors</div>
        </div>
      </div>
      <div class="flex items-start gap-2 bg-gray-800/50 rounded-lg p-3">
        <span class="text-purple-400">🎯</span>
        <div>
          <div class="text-gray-300 font-semibold">No virtual dispatch</div>
          <div class="text-gray-500 text-xs">CRTP for zero-overhead</div>
        </div>
      </div>
      <div class="flex items-start gap-2 bg-gray-800/50 rounded-lg p-3">
        <span class="text-orange-400">📊</span>
        <div>
          <div class="text-gray-300 font-semibold">Rich formatters</div>
          <div class="text-gray-500 text-xs">Hex, binary, padded output</div>
        </div>
      </div>
    </div>

    <!-- llvm::outs(), llvm::errs() -->
    <div class="mt-2 text-xs text-gray-500 font-mono">
      Convenience: <span class="text-cyan-400">llvm::outs()</span>,
      <span class="text-red-400">llvm::errs()</span>,
      <span class="text-gray-400">llvm::nulls()</span>
    </div>
  </div>
</template>

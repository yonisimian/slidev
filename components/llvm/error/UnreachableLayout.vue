<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const states = [
    { kind: 'Add', hit: false },
    { kind: 'Sub', hit: false },
    { kind: 'Mul', hit: false },
    { kind: '???', hit: true },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % states.length
    }, 1500)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-6 mt-4">
    <!-- Switch visualization -->
    <div class="bg-gray-900 rounded-lg border border-gray-700 p-4">
      <div class="font-mono text-sm space-y-1">
        <div class="text-gray-300"><span class="text-[#c586c0]">switch</span> (Kind) {</div>
        <div
          class="pl-4 transition-all duration-300"
          :class="
            states[phase].kind === 'Add'
              ? 'text-green-300 bg-green-400/10 -mx-2 px-2 rounded'
              : 'text-gray-300'
          "
        >
          <span class="text-[#c586c0]">case</span> Add: <span class="text-[#c586c0]">return</span>
          <span class="text-[#ce9178]">"+"</span>;
        </div>
        <div
          class="pl-4 transition-all duration-300"
          :class="
            states[phase].kind === 'Sub'
              ? 'text-green-300 bg-green-400/10 -mx-2 px-2 rounded'
              : 'text-gray-300'
          "
        >
          <span class="text-[#c586c0]">case</span> Sub: <span class="text-[#c586c0]">return</span>
          <span class="text-[#ce9178]">"-"</span>;
        </div>
        <div
          class="pl-4 transition-all duration-300"
          :class="
            states[phase].kind === 'Mul'
              ? 'text-green-300 bg-green-400/10 -mx-2 px-2 rounded'
              : 'text-gray-300'
          "
        >
          <span class="text-[#c586c0]">case</span> Mul: <span class="text-[#c586c0]">return</span>
          <span class="text-[#ce9178]">"*"</span>;
        </div>
        <div class="text-gray-300">}</div>
        <div
          class="transition-all duration-300"
          :class="
            states[phase].hit
              ? 'text-red-400 bg-red-400/10 -mx-2 px-2 rounded animate-pulse'
              : 'text-purple-400'
          "
        >
          llvm_unreachable(<span class="text-[#ce9178]">"Unknown op"</span>);
        </div>
      </div>
    </div>

    <!-- Build mode behavior -->
    <div class="flex gap-6">
      <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30 text-center">
        <div class="text-green-400 font-bold text-sm">Debug Build</div>
        <div class="text-gray-400 text-xs mt-1">Prints message</div>
        <div class="text-gray-400 text-xs">and aborts</div>
      </div>
      <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30 text-center">
        <div class="text-red-400 font-bold text-sm">Release Build</div>
        <div class="text-gray-400 text-xs mt-1">Undefined behavior!</div>
        <div class="text-gray-400 text-xs">Compiler hint only</div>
      </div>
    </div>

    <!-- Current state -->
    <div class="text-sm font-mono">
      <span class="text-gray-400">Kind = </span>
      <span :class="states[phase].hit ? 'text-red-400' : 'text-green-400'">{{
        states[phase].kind
      }}</span>
    </div>
  </div>
</template>

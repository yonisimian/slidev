<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const step = ref(0)
  let interval = null

  // Different callables that function_ref can point to
  const callables = [
    { name: '[](int a, int b) { return a + b; }', type: 'lambda', color: 'purple', result: 30 },
    {
      name: '[x](int a, int b) { return a + b + x; }',
      type: 'lambda+capture',
      color: 'pink',
      result: 35,
    },
    { name: 'int multiply(int a, int b)', type: 'function', color: 'cyan', result: 200 },
    { name: 'Adder::operator()', type: 'functor', color: 'orange', result: 42 },
  ]

  const currentCallable = computed(() => callables[step.value])

  onMounted(() => {
    interval = setInterval(() => {
      step.value = (step.value + 1) % callables.length
    }, 2200)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-6 mt-4">
    <!-- function_ref code block -->
    <div class="flex items-start gap-6">
      <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <pre
          class="px-4 py-3 font-mono text-sm leading-relaxed"
        ><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">Fn</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">function_ref</span><span class="text-[#d4d4d4]">;</span>

<span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">Ret</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#569cd6]">typename</span> <span class="text-[#d4d4d4]">...</span><span class="text-[#4ec9b0]">Params</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">function_ref</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Ret</span><span class="text-[#d4d4d4]">(</span><span class="text-[#4ec9b0]">Params</span><span class="text-[#d4d4d4]">...)&gt; {</span>
    <span class="text-[#4ec9b0]">Ret</span> <span class="text-[#d4d4d4]">(*</span><span class="text-[#9cdcfe]">callback</span><span class="text-[#d4d4d4]">)(</span><span class="text-[#569cd6]">intptr_t</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#4ec9b0]">Params</span><span class="text-[#d4d4d4]">...);</span>
    <span class="text-[#569cd6]">intptr_t</span> <span class="text-[#9cdcfe]">callable</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">};</span></pre>
      </div>
      <div class="text-gray-500 text-sm mt-2">← Just 16 bytes!</div>
    </div>

    <!-- Arrow pointing down -->
    <div class="flex flex-col items-center">
      <div class="bg-blue-500 text-white px-3 py-1 rounded font-mono text-sm font-bold shadow-lg">
        callable
      </div>
      <div class="text-blue-400 text-4xl leading-none">↓</div>
    </div>

    <!-- Callable slots -->
    <div class="relative w-full flex justify-center">
      <div class="flex gap-2">
        <div
          v-for="(c, idx) in callables"
          :key="idx"
          class="relative flex flex-col items-center transition-all duration-500"
          :class="{ 'scale-110': step === idx, 'opacity-40': step !== idx }"
        >
          <div
            class="w-48 h-16 border-2 rounded-lg flex items-center justify-center px-2 transition-all duration-500"
            :class="{
              'border-purple-400 bg-purple-400/20': c.color === 'purple' && step === idx,
              'border-pink-400 bg-pink-400/20': c.color === 'pink' && step === idx,
              'border-cyan-400 bg-cyan-400/20': c.color === 'cyan' && step === idx,
              'border-orange-400 bg-orange-400/20': c.color === 'orange' && step === idx,
              'border-gray-600 bg-gray-800/30': step !== idx,
            }"
          >
            <span
              class="text-xs font-mono text-center leading-tight"
              :class="{
                'text-purple-300': c.color === 'purple' && step === idx,
                'text-pink-300': c.color === 'pink' && step === idx,
                'text-cyan-300': c.color === 'cyan' && step === idx,
                'text-orange-300': c.color === 'orange' && step === idx,
                'text-gray-500': step !== idx,
              }"
              >{{ c.name }}</span
            >
          </div>
          <div
            class="text-xs mt-1 transition-all duration-300"
            :class="{
              'text-purple-400': c.color === 'purple' && step === idx,
              'text-pink-400': c.color === 'pink' && step === idx,
              'text-cyan-400': c.color === 'cyan' && step === idx,
              'text-orange-400': c.color === 'orange' && step === idx,
              'text-gray-600': step !== idx,
            }"
          >
            {{ c.type }}
          </div>
        </div>
      </div>
    </div>

    <!-- Call result -->
    <div class="mt-2 flex items-center gap-3">
      <span class="text-gray-400 font-mono text-sm">op(10, 20) =</span>
      <span
        class="font-mono text-xl font-bold transition-all duration-300"
        :class="{
          'text-purple-400': currentCallable.color === 'purple',
          'text-pink-400': currentCallable.color === 'pink',
          'text-cyan-400': currentCallable.color === 'cyan',
          'text-orange-400': currentCallable.color === 'orange',
        }"
        >{{ currentCallable.result }}</span
      >
    </div>
  </div>
</template>

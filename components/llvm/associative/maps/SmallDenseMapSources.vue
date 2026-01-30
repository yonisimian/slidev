<script setup>
  import { ref, onMounted } from 'vue'

  const step = ref(0)

  onMounted(() => {
    setTimeout(() => (step.value = 1), 400)
    setTimeout(() => (step.value = 2), 800)
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Decision flowchart style -->
    <div class="flex flex-col items-center gap-4">
      <!-- Question -->
      <div
        class="bg-blue-900/30 rounded-lg px-4 py-2 border border-blue-500/50 transition-all duration-500"
        :class="step >= 0 ? 'opacity-100' : 'opacity-0'"
      >
        <span class="text-blue-300 font-bold">How many entries?</span>
      </div>

      <!-- Branches -->
      <div class="flex gap-12 items-start">
        <!-- Small case -->
        <div
          class="flex flex-col items-center transition-all duration-500 delay-100"
          :class="step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
        >
          <div class="text-green-400 font-mono text-sm mb-2">≤ N</div>
          <div class="bg-green-900/30 rounded-lg p-3 border border-green-500/50">
            <div class="text-green-300 font-bold text-sm mb-2">Inline Storage</div>
            <div class="flex gap-1">
              <div
                v-for="i in 4"
                :key="i"
                class="w-8 h-8 border border-green-400 bg-green-400/20 rounded flex items-center justify-center text-green-300 text-xs font-mono"
              >
                {{ i <= 3 ? `${i}` : '∅' }}
              </div>
            </div>
            <div class="text-xs text-gray-400 mt-2 text-center">Zero heap allocs!</div>
          </div>
        </div>

        <!-- Large case -->
        <div
          class="flex flex-col items-center transition-all duration-500 delay-200"
          :class="step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
        >
          <div class="text-orange-400 font-mono text-sm mb-2">&gt; N</div>
          <div class="bg-orange-900/30 rounded-lg p-3 border border-orange-500/50">
            <div class="text-orange-300 font-bold text-sm mb-2">Heap Storage</div>
            <div class="flex items-center gap-2">
              <div class="text-gray-400 text-xs">ptr →</div>
              <div class="flex gap-0.5">
                <div
                  v-for="i in 8"
                  :key="i"
                  class="w-5 h-6 border border-orange-400 bg-orange-400/20 rounded-sm flex items-center justify-center text-orange-300 text-xs"
                >
                  {{ i }}
                </div>
              </div>
            </div>
            <div class="text-xs text-gray-400 mt-2 text-center">Full DenseMap behavior</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Use case hint -->
    <div
      class="mt-6 text-center transition-all duration-500 delay-300"
      :class="step >= 2 ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-gray-400 text-sm">
        Perfect for <span class="text-yellow-300 font-mono">SmallDenseMap&lt;K, V, 4&gt;</span> when
        you expect ≤4 entries
      </div>
      <div class="text-gray-500 text-xs mt-1">
        Common: instruction operands, basic block predecessors, function arguments
      </div>
    </div>
  </div>
</template>

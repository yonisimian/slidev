<script setup>
  import { ref, onMounted } from 'vue'

  const showComparison = ref(false)

  onMounted(() => {
    setTimeout(() => (showComparison.value = true), 500)
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center my-6">
    <!-- Comparison -->
    <div
      class="flex gap-8 transition-all duration-700"
      :class="showComparison ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <!-- SmallSet -->
      <div class="flex flex-col items-center">
        <div class="text-base font-bold text-green-400 mb-3">SmallSet&lt;T, N&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30 text-center">
          <div class="text-xs text-gray-400 mb-2">Linear array + std::set fallback</div>
          <div class="flex gap-1 justify-center">
            <div
              v-for="i in 4"
              :key="i"
              class="w-6 h-6 border border-green-400 bg-green-400/20 rounded text-xs flex items-center justify-center text-green-300"
            >
              {{ i }}
            </div>
          </div>
          <div class="text-xs text-green-400 mt-2">General types</div>
        </div>
      </div>

      <!-- SmallPtrSet -->
      <div class="flex flex-col items-center">
        <div class="text-base font-bold text-orange-400 mb-3">SmallPtrSet&lt;T*, N&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-orange-500/30 text-center">
          <div class="text-xs text-gray-400 mb-2">Hash table optimized for pointers</div>
          <div class="flex gap-1 justify-center">
            <div
              v-for="i in 4"
              :key="i"
              class="w-8 h-6 border border-orange-400 bg-orange-400/20 rounded text-xs flex items-center justify-center text-orange-300 font-mono"
            >
              0x{{ i }}
            </div>
          </div>
          <div class="text-xs text-orange-400 mt-2">Pointer types only</div>
        </div>
      </div>
    </div>

    <!-- Key benefits -->
    <div
      class="mt-6 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
      :class="showComparison ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-center">
        <div class="text-2xl mb-1">📦</div>
        <div class="text-sm text-blue-400 font-semibold">Inline Storage</div>
        <div class="text-xs text-gray-500">No heap for small sets</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">🔄</div>
        <div class="text-sm text-yellow-400 font-semibold">Auto Upgrade</div>
        <div class="text-xs text-gray-500">Grows to tree/hash</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">⚡</div>
        <div class="text-sm text-purple-400 font-semibold">Cache Friendly</div>
        <div class="text-xs text-gray-500">Linear scan is fast</div>
      </div>
    </div>

    <!-- Usage tip -->
    <div
      class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 transition-all duration-700 delay-500"
      :class="showComparison ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-xs text-gray-400 font-mono text-center">
        Use SmallPtrSet for Value*, Instruction*, BasicBlock* → faster hashing with pointer
        alignment
      </div>
    </div>
  </div>
</template>

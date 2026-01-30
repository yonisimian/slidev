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
      class="flex gap-10 transition-all duration-700"
      :class="showComparison ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <!-- std::set<std::string> -->
      <div class="flex flex-col items-center">
        <div class="text-base font-bold text-red-400 mb-3">std::set&lt;std::string&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
          <div class="text-xs text-gray-400 mb-2 text-center">
            Separate heap allocation per string
          </div>
          <div class="flex flex-col gap-1">
            <div v-for="i in 3" :key="i" class="flex items-center gap-2">
              <div
                class="w-6 h-5 border border-gray-500 rounded text-xs flex items-center justify-center"
              >
                ptr
              </div>
              <span class="text-gray-500">→</span>
              <div
                class="w-16 h-5 border border-red-400/50 bg-red-400/10 rounded text-xs flex items-center justify-center text-red-300"
              >
                heap
              </div>
            </div>
          </div>
          <div class="text-xs text-red-400 mt-2 text-center">N allocations</div>
        </div>
      </div>

      <!-- StringSet -->
      <div class="flex flex-col items-center">
        <div class="text-base font-bold text-green-400 mb-3">StringSet</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="text-xs text-gray-400 mb-2 text-center">Single contiguous allocation</div>
          <div class="flex gap-0.5">
            <div
              v-for="c in 'if\\0else\\0while'"
              :key="c"
              class="w-4 h-5 border border-green-400 bg-green-400/20 text-xs flex items-center justify-center text-green-300"
            >
              {{ c === '\\' ? '' : c }}
            </div>
          </div>
          <div class="text-xs text-green-400 mt-2 text-center">1 allocation</div>
        </div>
      </div>
    </div>

    <!-- Key benefits -->
    <div
      class="mt-6 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
      :class="showComparison ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-center">
        <div class="text-2xl mb-1">🔤</div>
        <div class="text-sm text-yellow-400 font-semibold">StringRef Lookup</div>
        <div class="text-xs text-gray-500">No copy on query</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">💾</div>
        <div class="text-sm text-blue-400 font-semibold">Memory Dense</div>
        <div class="text-xs text-gray-500">Contiguous storage</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">⚡</div>
        <div class="text-sm text-purple-400 font-semibold">O(1) Average</div>
        <div class="text-xs text-gray-500">Hash table lookup</div>
      </div>
    </div>
  </div>
</template>

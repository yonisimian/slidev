<script setup>
  import { ref, onMounted } from 'vue'

  const showArena = ref(false)

  onMounted(() => {
    setTimeout(() => (showArena.value = true), 400)
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Memory layout comparison -->
    <div class="flex gap-10 items-start">
      <!-- std::map<std::string, T> -->
      <div class="flex flex-col items-center">
        <div class="text-red-400 font-bold text-sm mb-2">std::map&lt;string, T&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
          <div class="flex flex-col gap-2">
            <div v-for="s in ['key1', 'longer_key', 'k3']" :key="s" class="flex items-center gap-2">
              <div
                class="w-8 h-5 border border-gray-500 rounded text-xs flex items-center justify-center text-gray-400"
              >
                node
              </div>
              <div class="text-gray-500 text-xs">→</div>
              <div class="border border-red-400/50 bg-red-400/10 rounded px-2 py-0.5">
                <span class="text-red-300 text-xs font-mono">"{{ s }}"</span>
              </div>
            </div>
          </div>
          <div class="text-xs text-red-400 mt-2 text-center">3 string allocs + 3 nodes</div>
        </div>
      </div>

      <!-- StringMap -->
      <div
        class="flex flex-col items-center transition-all duration-500"
        :class="showArena ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'"
      >
        <div class="text-green-400 font-bold text-sm mb-2">StringMap&lt;T&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <!-- Hash table -->
          <div class="text-xs text-gray-400 mb-1 text-center">Bucket array (pointers)</div>
          <div class="flex gap-0.5 mb-3">
            <div
              v-for="i in 6"
              :key="i"
              class="w-5 h-5 border rounded text-xs flex items-center justify-center"
              :class="
                [1, 3, 4].includes(i)
                  ? 'border-blue-400 bg-blue-400/20 text-blue-300'
                  : 'border-gray-600 text-gray-500'
              "
            >
              {{ [1, 3, 4].includes(i) ? '•' : '∅' }}
            </div>
          </div>

          <!-- Arena entries -->
          <div class="text-xs text-gray-400 mb-1 text-center">StringMapEntry arena</div>
          <div class="flex gap-0.5">
            <div
              v-for="(c, idx) in 'key1\\0longer_key\\0k3\\0'"
              :key="idx"
              class="w-4 h-5 border rounded-sm text-xs flex items-center justify-center"
              :class="
                c === '\\' || c === '0'
                  ? 'border-gray-600 bg-gray-700 text-gray-500'
                  : 'border-green-400 bg-green-400/20 text-green-300'
              "
            >
              {{ c === '\\' ? '' : c === '0' ? '␀' : c }}
            </div>
          </div>
          <div class="text-xs text-green-400 mt-2 text-center">1 arena allocation!</div>
        </div>
      </div>
    </div>

    <!-- Key features -->
    <div
      class="mt-5 flex gap-6 transition-all duration-500 delay-200"
      :class="showArena ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-center">
        <div class="text-2xl mb-1">🔑</div>
        <div class="text-sm text-cyan-400 font-semibold">StringRef lookup</div>
        <div class="text-xs text-gray-400">No temp std::string</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">📦</div>
        <div class="text-sm text-orange-400 font-semibold">Key + Value together</div>
        <div class="text-xs text-gray-400">Cache-friendly</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">♻️</div>
        <div class="text-sm text-purple-400 font-semibold">Bump allocator</div>
        <div class="text-xs text-gray-400">Configurable</div>
      </div>
    </div>
  </div>
</template>

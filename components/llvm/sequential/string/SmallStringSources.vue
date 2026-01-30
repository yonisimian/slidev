<script setup>
  import { ref, onMounted } from 'vue'

  const showComparison = ref(false)

  onMounted(() => {
    setTimeout(() => (showComparison.value = true), 500)
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center my-6">
    <!-- Comparison: std::string vs SmallString -->
    <div
      class="flex gap-12 transition-all duration-700"
      :class="showComparison ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <!-- std::string -->
      <div class="flex flex-col items-center">
        <div class="text-base font-bold text-red-400 mb-4">std::string</div>

        <div class="relative bg-gray-800/50 rounded-lg p-4 border border-gray-600">
          <div class="text-xs text-gray-500 mb-3 text-center">Every string → heap allocation</div>

          <!-- Visualization -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <div
                class="w-20 h-6 border border-gray-500 rounded flex items-center justify-center text-xs text-gray-400"
              >
                ptr
              </div>
              <svg class="w-6 h-4" viewBox="0 0 24 16">
                <line x1="0" y1="8" x2="20" y2="8" stroke="#ef4444" stroke-width="2" />
                <polygon points="20,4 24,8 20,12" fill="#ef4444" />
              </svg>
              <div class="flex">
                <div
                  v-for="c in 'Hello'"
                  :key="c"
                  class="w-4 h-6 border border-red-400/50 bg-red-400/10 flex items-center justify-center text-xs text-red-300"
                >
                  {{ c }}
                </div>
              </div>
            </div>
            <div class="text-center text-xs text-red-400">malloc() called!</div>
          </div>
        </div>
      </div>

      <!-- SmallString -->
      <div class="flex flex-col items-center">
        <div class="text-base font-bold text-green-400 mb-4">SmallString&lt;32&gt;</div>

        <div class="relative bg-gray-800/50 rounded-lg p-4 border border-green-500/30">
          <div class="text-xs text-gray-500 mb-3 text-center">Small strings stay on stack</div>

          <!-- Visualization -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <div class="text-xs text-gray-500">Inline:</div>
              <div class="flex">
                <div
                  v-for="(c, i) in 'Hello'"
                  :key="i"
                  class="w-4 h-6 border border-green-400 bg-green-400/20 flex items-center justify-center text-xs text-green-300"
                >
                  {{ c }}
                </div>
                <div
                  v-for="i in 5"
                  :key="'e' + i"
                  class="w-4 h-6 border border-gray-600 bg-gray-800/30 flex items-center justify-center text-xs text-gray-600"
                ></div>
              </div>
            </div>
            <div class="text-center text-xs text-green-400">No heap allocation!</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Key benefits -->
    <div
      class="mt-8 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
      :class="showComparison ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-center">
        <div class="text-2xl mb-2">🚀</div>
        <div class="text-sm text-blue-400 font-semibold">Cache Friendly</div>
        <div class="text-xs text-gray-500 mt-1">Data stays in stack cache</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-2">🔧</div>
        <div class="text-sm text-yellow-400 font-semibold">std::string API</div>
        <div class="text-xs text-gray-500 mt-1">append, +=, substr, etc.</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-2">🔗</div>
        <div class="text-sm text-purple-400 font-semibold">Twine Target</div>
        <div class="text-xs text-gray-500 mt-1">toVector() destination</div>
      </div>
    </div>

    <!-- Common pattern -->
    <!-- <div class="mt-6 bg-gray-800/30 rounded-lg p-3 border border-gray-700 transition-all duration-700 delay-500"
            :class="showComparison ? 'opacity-100' : 'opacity-0'">
            <div class="text-xs text-gray-400 font-mono text-center">
                SmallString&lt;128&gt; → 128 bytes inline → ~99% of paths fit without malloc
            </div>
        </div> -->
  </div>
</template>

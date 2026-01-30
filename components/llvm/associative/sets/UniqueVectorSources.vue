<script setup>
  import { ref, onMounted } from 'vue'

  const showContent = ref(false)

  onMounted(() => {
    setTimeout(() => (showContent.value = true), 500)
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center my-6">
    <!-- Use case illustration -->
    <div
      class="flex flex-col items-center gap-4 transition-all duration-700"
      :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="text-base font-bold text-amber-400 mb-2">String Table Pattern</div>

      <div class="flex gap-6 items-center">
        <!-- Source -->
        <div class="flex flex-col items-center">
          <div class="text-xs text-gray-400 mb-2">Debug Strings</div>
          <div class="bg-gray-800/50 rounded-lg p-2 border border-gray-600">
            <div class="text-xs text-gray-300">"main"</div>
            <div class="text-xs text-gray-300">"argc"</div>
            <div class="text-xs text-gray-300">"argv"</div>
            <div class="text-xs text-gray-300">"main"</div>
          </div>
        </div>

        <span class="text-gray-500 text-xl">→</span>

        <!-- UniqueVector -->
        <div class="flex flex-col items-center">
          <div class="text-xs text-gray-400 mb-2">UniqueVector</div>
          <div class="bg-gray-800/50 rounded-lg p-2 border border-amber-500/30">
            <div class="flex items-center gap-2 text-xs">
              <span class="text-amber-300">1:</span>
              <span class="text-green-300">"main"</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-amber-300">2:</span>
              <span class="text-green-300">"argc"</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-amber-300">3:</span>
              <span class="text-green-300">"argv"</span>
            </div>
          </div>
        </div>

        <span class="text-gray-500 text-xl">→</span>

        <!-- Output -->
        <div class="flex flex-col items-center">
          <div class="text-xs text-gray-400 mb-2">Output</div>
          <div class="bg-gray-800/50 rounded-lg p-2 border border-blue-500/30">
            <div class="text-xs text-blue-300">ref(1), ref(2)</div>
            <div class="text-xs text-blue-300">ref(3), ref(1)</div>
          </div>
          <div class="text-xs text-green-400 mt-1">Compact!</div>
        </div>
      </div>
    </div>

    <!-- Key benefits -->
    <div
      class="mt-6 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
      :class="showContent ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-center">
        <div class="text-2xl mb-1">🔢</div>
        <div class="text-sm text-amber-400 font-semibold">Stable IDs</div>
        <div class="text-xs text-gray-500">1-based indexing</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">🔄</div>
        <div class="text-sm text-green-400 font-semibold">Bidirectional</div>
        <div class="text-xs text-gray-500">ID↔Element O(1)</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">📦</div>
        <div class="text-sm text-blue-400 font-semibold">Deduplication</div>
        <div class="text-xs text-gray-500">Each value once</div>
      </div>
    </div>

    <!-- Note -->
    <!-- <div class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 transition-all duration-700 delay-500"
            :class="showContent ? 'opacity-100' : 'opacity-0'">
            <div class="text-xs text-gray-400 font-mono text-center">
                No erase() support → IDs remain stable for the lifetime of the container
            </div>
        </div> -->
  </div>
</template>

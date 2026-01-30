<script setup></script>

<template>
  <div class="flex justify-center items-center gap-8 mt-4">
    <div class="flex flex-col items-center gap-4">
      <!-- Structure explanation -->
      <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
        <div class="text-gray-300 mb-3 text-center font-bold">Sparse Storage Structure</div>

        <!-- Visual linked list -->
        <div class="flex items-center gap-2">
          <div class="element-box">
            <div class="text-purple-400 font-mono text-xs">Element 0</div>
            <div class="text-gray-400 text-xs">bits 0-127</div>
            <div class="flex gap-0.5 mt-1">
              <div
                v-for="i in 4"
                :key="i"
                class="w-4 h-3 rounded-sm text-xs flex items-center justify-center"
                :class="i === 2 ? 'bg-purple-500' : 'bg-gray-600'"
              ></div>
              <div class="text-gray-500 text-xs">...</div>
            </div>
          </div>

          <div class="text-purple-400">→</div>

          <div class="element-box">
            <div class="text-purple-400 font-mono text-xs">Element 8</div>
            <div class="text-gray-400 text-xs">bits 1024-1151</div>
            <div class="flex gap-0.5 mt-1">
              <div
                v-for="i in 4"
                :key="i"
                class="w-4 h-3 rounded-sm text-xs flex items-center justify-center"
                :class="i === 1 || i === 4 ? 'bg-purple-500' : 'bg-gray-600'"
              ></div>
              <div class="text-gray-500 text-xs">...</div>
            </div>
          </div>

          <div class="text-purple-400">→</div>

          <div class="text-gray-500 font-mono">nullptr</div>
        </div>
      </div>

      <!-- Complexity comparison -->
      <div class="flex gap-6">
        <div class="bg-gray-800 rounded-lg p-3 border border-gray-600 text-center">
          <div class="text-green-400 font-bold mb-1">O(1)</div>
          <div class="text-gray-400 text-xs">Sequential access</div>
          <div class="text-gray-500 text-xs mt-1">(forward or reverse)</div>
        </div>

        <div class="bg-gray-800 rounded-lg p-3 border border-gray-600 text-center">
          <div class="text-yellow-400 font-bold mb-1">O(1)</div>
          <div class="text-gray-400 text-xs">±128 bits from current</div>
          <div class="text-gray-500 text-xs mt-1">(same element)</div>
        </div>

        <div class="bg-gray-800 rounded-lg p-3 border border-gray-600 text-center">
          <div class="text-red-400 font-bold mb-1">O(n)</div>
          <div class="text-gray-400 text-xs">Random access</div>
          <div class="text-gray-500 text-xs mt-1">(must traverse list)</div>
        </div>
      </div>

      <!-- When to use -->
      <div class="text-gray-400 text-sm text-center mt-2">
        Best for:
        <span class="text-purple-300"
          >very large sparse sets with sequential iteration patterns</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
  .element-box {
    @apply bg-gray-900 rounded-lg p-2 border-2 border-purple-500/50 text-center;
  }
</style>

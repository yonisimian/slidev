<script setup></script>

<template>
  <div class="flex justify-center items-center gap-8 mt-4">
    <div class="flex flex-col items-center gap-4">
      <!-- Comparison with other bit containers -->
      <div class="text-gray-300 font-bold mb-2">When to use which?</div>

      <div class="grid grid-cols-4 gap-4">
        <!-- BitVector -->
        <div class="comparison-box">
          <div class="text-blue-400 font-bold">BitVector</div>
          <div class="text-gray-400 text-xs mt-1">Dense sets, any pattern</div>
          <div class="flex gap-0.5 mt-2 justify-center">
            <div
              v-for="i in 8"
              :key="i"
              class="w-3 h-3 rounded-sm"
              :class="i % 2 === 0 ? 'bg-blue-500' : 'bg-gray-600'"
            ></div>
          </div>
        </div>

        <!-- SparseBitVector -->
        <div class="comparison-box">
          <div class="text-yellow-400 font-bold">SparseBitVector</div>
          <div class="text-gray-400 text-xs mt-1">Sparse, scattered bits</div>
          <div class="flex gap-0.5 mt-2 justify-center">
            <div
              v-for="i in 8"
              :key="i"
              class="w-3 h-3 rounded-sm"
              :class="i === 2 || i === 7 ? 'bg-yellow-500' : 'bg-gray-600'"
            ></div>
          </div>
        </div>

        <!-- SmallBitVector -->
        <div class="comparison-box">
          <div class="text-green-400 font-bold">SmallBitVector</div>
          <div class="text-gray-400 text-xs mt-1">Usually &lt; 25 bits</div>
          <div class="flex gap-0.5 mt-2 justify-center">
            <div
              v-for="i in 6"
              :key="i"
              class="w-3 h-3 rounded-sm"
              :class="i <= 3 ? 'bg-green-500' : 'bg-gray-600'"
            ></div>
          </div>
        </div>

        <!-- CoalescingBitVector -->
        <div class="comparison-box highlight">
          <div class="text-purple-400 font-bold">CoalescingBitVector</div>
          <div class="text-gray-400 text-xs mt-1">Contiguous ranges</div>
          <div class="flex gap-0.5 mt-2 justify-center">
            <div
              v-for="i in 8"
              :key="i"
              class="w-3 h-3 rounded-sm"
              :class="i >= 2 && i <= 5 ? 'bg-purple-500' : 'bg-gray-600'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Key insight -->
      <div class="bg-purple-900/30 rounded-lg p-3 border border-purple-500/50 mt-2 text-center">
        <div class="text-purple-300 text-sm">
          <span class="font-bold">Key insight:</span> If your data has few gaps between set bits,<br />
          CoalescingBitVector can represent millions of bits with just a few intervals
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .comparison-box {
    @apply bg-gray-800 rounded-lg p-3 border border-gray-600 text-center;
  }

  .comparison-box.highlight {
    @apply border-purple-500 bg-purple-900/20;
  }
</style>

<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Concept visualization -->
    <div class="flex gap-8 items-center">
      <!-- Input: arbitrary indices -->
      <div class="flex flex-col items-center">
        <div class="text-gray-400 text-sm mb-2">Virtual Register IDs</div>
        <div class="flex flex-col gap-1">
          <div
            v-for="(vreg, idx) in [1024, 1026, 1025, 1030]"
            :key="idx"
            class="flex items-center gap-2"
          >
            <div
              class="w-16 h-6 border border-cyan-400 bg-cyan-400/20 rounded flex items-center justify-center"
            >
              <span class="text-cyan-300 text-xs font-mono">%{{ vreg }}</span>
            </div>
            <span class="text-gray-500">→</span>
            <div
              class="w-8 h-6 border border-orange-400 bg-orange-400/20 rounded flex items-center justify-center"
            >
              <span class="text-orange-300 text-xs font-mono">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Transform -->
      <div class="flex flex-col items-center">
        <div class="text-yellow-400 text-2xl">⟹</div>
        <div class="text-xs text-gray-400 mt-1">ToIndexT</div>
        <div class="text-xs text-gray-500">(vreg - 1024)</div>
      </div>

      <!-- Underlying vector -->
      <div class="flex flex-col items-center">
        <div class="text-gray-400 text-sm mb-2">Dense Vector Storage</div>
        <div class="flex gap-0.5">
          <div
            v-for="(val, idx) in ['A', 'C', 'B', '∅', '∅', '∅', 'D']"
            :key="idx"
            class="flex flex-col items-center"
          >
            <div
              class="w-8 h-8 border rounded flex items-center justify-center"
              :class="
                val === '∅'
                  ? 'border-gray-600 bg-gray-800/30 text-gray-500'
                  : 'border-green-400 bg-green-400/20 text-green-300'
              "
            >
              <span class="text-xs font-mono">{{ val }}</span>
            </div>
            <span class="text-xs text-gray-500 mt-0.5">[{{ idx }}]</span>
          </div>
        </div>
        <div class="text-xs text-gray-400 mt-2">O(1) access by index</div>
      </div>
    </div>

    <!-- Key insight -->
    <div class="mt-6 bg-gray-800/50 rounded-lg p-3 border border-purple-500/30">
      <div class="flex items-center gap-4">
        <div class="text-center">
          <div class="text-purple-400 font-bold text-sm">Why not DenseMap?</div>
          <div class="text-gray-400 text-xs mt-1">When keys are already "almost dense"</div>
        </div>
        <div class="h-8 w-px bg-gray-600" />
        <div class="flex flex-col gap-1 text-xs">
          <div class="text-green-300">✓ Faster: direct array access</div>
          <div class="text-green-300">✓ Less memory: no hash table overhead</div>
          <div class="text-yellow-300">⚠ Sparse keys waste space</div>
        </div>
      </div>
    </div>
  </div>
</template>

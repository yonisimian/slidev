<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Dual structure visualization -->
    <div class="flex gap-8 items-center">
      <!-- The two parts -->
      <div class="flex flex-col gap-4">
        <!-- DenseMap part -->
        <div class="bg-gray-800/50 rounded-lg p-3 border border-blue-500/30">
          <div class="text-blue-400 font-bold text-sm mb-2 text-center">
            DenseMap&lt;K, size_t&gt;
          </div>
          <div class="flex flex-col gap-1 text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="text-cyan-300">"foo"</span>
              <span class="text-gray-500">→</span>
              <span class="text-yellow-300">0</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-cyan-300">"bar"</span>
              <span class="text-gray-500">→</span>
              <span class="text-yellow-300">1</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-cyan-300">"baz"</span>
              <span class="text-gray-500">→</span>
              <span class="text-yellow-300">2</span>
            </div>
          </div>
          <div class="text-xs text-gray-400 mt-2 text-center">O(1) lookup</div>
        </div>

        <!-- Vector part -->
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="text-green-400 font-bold text-sm mb-2 text-center">
            vector&lt;pair&lt;K, V&gt;&gt;
          </div>
          <div class="flex gap-1">
            <div
              v-for="(item, idx) in [
                ['foo', 1],
                ['bar', 2],
                ['baz', 3],
              ]"
              :key="idx"
              class="border border-green-400 bg-green-400/20 rounded px-2 py-1"
            >
              <div class="text-green-300 text-xs font-mono">{{ item[0] }}</div>
              <div class="text-green-200 text-xs">{{ item[1] }}</div>
            </div>
          </div>
          <div class="text-xs text-gray-400 mt-2 text-center">Insertion order</div>
        </div>
      </div>

      <!-- Equals -->
      <div class="text-3xl text-gray-400">=</div>

      <!-- Result -->
      <div class="bg-purple-900/30 rounded-lg p-4 border border-purple-500/50">
        <div class="text-purple-300 font-bold mb-2 text-center">MapVector</div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            <span class="text-gray-300 text-sm">Deterministic iteration</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            <span class="text-gray-300 text-sm">O(1) key lookup</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-yellow-400">⚠</span>
            <span class="text-gray-300 text-sm">O(n) erase</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Warning box -->
    <div class="mt-4 bg-yellow-900/20 rounded-lg px-4 py-2 border border-yellow-500/30">
      <span class="text-yellow-300 text-sm">
        💡 Use when iteration order matters — common for reproducible compiler output!
      </span>
    </div>
  </div>
</template>

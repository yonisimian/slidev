<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center mb-3">
    <!-- Mutation comparison -->
    <div class="flex gap-8 items-start">
      <!-- Mutable approach -->
      <div class="flex flex-col items-center">
        <div class="text-red-400 font-bold text-sm mb-2">❌ Mutable Map</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
          <div class="font-mono text-xs text-gray-300 space-y-1">
            <div>auto M2 = M1; <span class="text-red-400">// copy all</span></div>
            <div>M2[key] = val; <span class="text-gray-500">// modify</span></div>
            <div class="text-red-400">// O(n) copy cost!</div>
          </div>
        </div>
      </div>

      <!-- Immutable approach -->
      <div class="flex flex-col items-center">
        <div class="text-green-400 font-bold text-sm mb-2">✓ ImmutableMap</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="font-mono text-xs text-gray-300 space-y-1">
            <div>auto M2 = F.add(M1, k, v);</div>
            <div class="text-green-400">// O(log n) path copy</div>
            <div class="text-green-400">// Shares unchanged nodes!</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Memory sharing visualization -->
    <div class="mt-5 bg-gray-800/50 rounded-lg p-3 border border-teal-500/30">
      <div class="text-teal-400 font-bold text-sm mb-2 text-center">Structural Sharing</div>
      <div class="flex gap-6 items-center justify-center">
        <!-- M1 -->
        <div class="flex flex-col items-center">
          <div class="text-xs text-gray-400 mb-1">M1</div>
          <div class="flex gap-0.5">
            <div
              class="w-6 h-6 border border-teal-400 bg-teal-400/20 rounded text-teal-300 text-xs flex items-center justify-center"
            >
              A
            </div>
            <div
              class="w-6 h-6 border border-teal-400 bg-teal-400/20 rounded text-teal-300 text-xs flex items-center justify-center"
            >
              B
            </div>
            <div
              class="w-6 h-6 border border-teal-400 bg-teal-400/20 rounded text-teal-300 text-xs flex items-center justify-center"
            >
              C
            </div>
          </div>
        </div>

        <!-- Shared indicator -->
        <div class="flex flex-col items-center">
          <div class="text-cyan-400 text-xs">shared</div>
          <div class="text-cyan-400">↕</div>
        </div>

        <!-- M2 -->
        <div class="flex flex-col items-center">
          <div class="text-xs text-gray-400 mb-1">M2 = M1.add(D)</div>
          <div class="flex gap-0.5">
            <div
              class="w-6 h-6 border border-cyan-400 bg-cyan-400/10 rounded text-cyan-300 text-xs flex items-center justify-center opacity-50"
            >
              A
            </div>
            <div
              class="w-6 h-6 border border-cyan-400 bg-cyan-400/10 rounded text-cyan-300 text-xs flex items-center justify-center opacity-50"
            >
              B
            </div>
            <div
              class="w-6 h-6 border border-cyan-400 bg-cyan-400/10 rounded text-cyan-300 text-xs flex items-center justify-center opacity-50"
            >
              C
            </div>
            <div
              class="w-6 h-6 border border-green-400 bg-green-400/20 rounded text-green-300 text-xs flex items-center justify-center"
            >
              D
            </div>
          </div>
        </div>
      </div>
      <div class="text-xs text-gray-400 mt-2 text-center">
        Both M1 and M2 valid — functional programming style
      </div>
    </div>

    <!-- Properties -->
    <div class="mt-4 flex gap-4 text-xs">
      <div class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded">
        <span class="text-purple-300">Thread-safe reads</span>
      </div>
      <div class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded">
        <span class="text-purple-300">AVL tree internally</span>
      </div>
      <div class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded">
        <span class="text-purple-300">ImmutableMapFactory</span>
      </div>
    </div>
  </div>
</template>

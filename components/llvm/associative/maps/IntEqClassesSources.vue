<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Union-Find concept -->
    <div class="flex gap-8 items-center">
      <!-- Before compress -->
      <div class="flex flex-col items-center">
        <div class="text-gray-400 text-sm mb-2">After join(0,1), join(1,2)</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-orange-500/30">
          <div class="flex flex-col items-center gap-1">
            <!-- Tree structure -->
            <div
              class="w-8 h-8 border-2 border-orange-400 bg-orange-400/20 rounded-full flex items-center justify-center text-orange-300 font-mono text-sm"
            >
              0
            </div>
            <div class="w-0.5 h-3 bg-orange-400" />
            <div
              class="w-8 h-8 border-2 border-orange-400 bg-orange-400/20 rounded-full flex items-center justify-center text-orange-300 font-mono text-sm"
            >
              1
            </div>
            <div class="w-0.5 h-3 bg-orange-400" />
            <div
              class="w-8 h-8 border-2 border-orange-400 bg-orange-400/20 rounded-full flex items-center justify-center text-orange-300 font-mono text-sm"
            >
              2
            </div>
          </div>
          <div class="text-xs text-orange-400 mt-2 text-center">Path length: 2</div>
        </div>
      </div>

      <!-- compress() arrow -->
      <div class="flex flex-col items-center">
        <div class="text-yellow-400 font-mono text-sm">compress()</div>
        <div class="text-yellow-400 text-2xl">⟹</div>
      </div>

      <!-- After compress -->
      <div class="flex flex-col items-center">
        <div class="text-gray-400 text-sm mb-2">Flattened</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="flex gap-2 items-end">
            <div class="flex flex-col items-center">
              <div
                class="w-8 h-8 border-2 border-green-400 bg-green-400/20 rounded-full flex items-center justify-center text-green-300 font-mono text-sm"
              >
                0
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-0.5 h-6 bg-green-400 -mb-1" />
              <div
                class="w-8 h-8 border-2 border-green-400 bg-green-400/20 rounded-full flex items-center justify-center text-green-300 font-mono text-sm"
              >
                1
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-0.5 h-6 bg-green-400 -mb-1" />
              <div
                class="w-8 h-8 border-2 border-green-400 bg-green-400/20 rounded-full flex items-center justify-center text-green-300 font-mono text-sm"
              >
                2
              </div>
            </div>
          </div>
          <div class="text-xs text-green-400 mt-2 text-center">Path length: 1</div>
        </div>
      </div>
    </div>

    <!-- API table -->
    <div class="mt-5 bg-gray-800/50 rounded-lg p-3 border border-gray-600">
      <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
        <div class="text-cyan-300 font-mono">join(a, b)</div>
        <div class="text-gray-400">Merge classes of a and b</div>
        <div class="text-cyan-300 font-mono">findLeader(x)</div>
        <div class="text-gray-400">Get class representative</div>
        <div class="text-cyan-300 font-mono">compress()</div>
        <div class="text-gray-400">Flatten all paths → O(1) lookup</div>
        <div class="text-cyan-300 font-mono">getNumClasses()</div>
        <div class="text-gray-400">Count equivalence classes</div>
      </div>
    </div>

    <!-- Use cases -->
    <div class="mt-3 text-gray-400 text-sm">
      Used for <span class="text-cyan-300">register coalescing</span> and
      <span class="text-cyan-300">congruence classes</span>
    </div>
  </div>
</template>

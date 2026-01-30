<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Structure overview -->
    <div class="flex gap-8 items-center">
      <!-- B+ tree structure -->
      <div class="flex flex-col items-center">
        <div class="text-gray-400 text-sm mb-2">B+ Tree Structure</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-purple-500/30">
          <!-- Root -->
          <div class="flex justify-center mb-2">
            <div class="flex gap-1">
              <div
                v-for="k in [50, 100]"
                :key="k"
                class="w-8 h-6 border border-purple-400 bg-purple-400/20 rounded text-xs flex items-center justify-center text-purple-300"
              >
                {{ k }}
              </div>
            </div>
          </div>
          <!-- Leaf level -->
          <div class="flex gap-4 justify-center">
            <div class="flex gap-0.5">
              <div
                v-for="range in [
                  [0, 20],
                  [20, 50],
                ]"
                :key="range[0]"
                class="w-12 h-5 border border-cyan-400 bg-cyan-400/20 rounded-sm text-xs flex items-center justify-center text-cyan-300"
              >
                {{ range[0] }}-{{ range[1] }}
              </div>
            </div>
            <div class="flex gap-0.5">
              <div
                v-for="range in [
                  [50, 80],
                  [80, 100],
                ]"
                :key="range[0]"
                class="w-12 h-5 border border-cyan-400 bg-cyan-400/20 rounded-sm text-xs flex items-center justify-center text-cyan-300"
              >
                {{ range[0] }}-{{ range[1] }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Properties -->
      <div class="flex flex-col gap-3">
        <div class="bg-gray-800/50 rounded-lg p-2 border border-green-500/30">
          <div class="text-green-400 font-bold text-xs">Auto-Coalesce</div>
          <div class="text-gray-400 text-xs">[0,10)=A + [10,20)=A → [0,20)=A</div>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-2 border border-orange-500/30">
          <div class="text-orange-400 font-bold text-xs">Overlap Handling</div>
          <div class="text-gray-400 text-xs">New intervals overwrite old</div>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-2 border border-blue-500/30">
          <div class="text-blue-400 font-bold text-xs">O(log n)</div>
          <div class="text-gray-400 text-xs">Insert, lookup, iterate</div>
        </div>
      </div>
    </div>

    <!-- Complexity table -->
    <div class="mt-4 bg-gray-800/50 rounded-lg p-3 border border-gray-600">
      <table class="text-xs">
        <thead>
          <tr class="text-gray-400">
            <th class="px-3 py-1 text-left">Operation</th>
            <th class="px-3 py-1">std::map</th>
            <th class="px-3 py-1">IntervalMap</th>
          </tr>
        </thead>
        <tbody class="font-mono">
          <tr>
            <td class="px-3 py-1 text-gray-300">Point query</td>
            <td class="px-3 py-1 text-yellow-400">O(log n)</td>
            <td class="px-3 py-1 text-green-400">O(log n)</td>
          </tr>
          <tr>
            <td class="px-3 py-1 text-gray-300">Range insert</td>
            <td class="px-3 py-1 text-red-400">O(k log n)</td>
            <td class="px-3 py-1 text-green-400">O(log n)</td>
          </tr>
          <tr>
            <td class="px-3 py-1 text-gray-300">Memory per interval</td>
            <td class="px-3 py-1 text-red-400">2 entries</td>
            <td class="px-3 py-1 text-green-400">1 entry</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Use case -->
    <div class="mt-3 text-gray-400 text-sm">
      Used in <span class="text-cyan-300">LiveIntervals</span>,
      <span class="text-cyan-300">DebugInfo</span>, <span class="text-cyan-300">MemorySSA</span>
    </div>
  </div>
</template>

<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Comparison table -->
    <div class="bg-gray-800/50 rounded-lg p-3 border border-gray-600 mb-4">
      <table class="text-xs">
        <thead>
          <tr class="text-gray-400">
            <th class="px-3 py-1 text-left">Macro/Function</th>
            <th class="px-3 py-1">Debug</th>
            <th class="px-3 py-1">Release</th>
            <th class="px-3 py-1">Use For</th>
          </tr>
        </thead>
        <tbody class="font-mono">
          <tr>
            <td class="px-3 py-1 text-purple-300">llvm_unreachable</td>
            <td class="px-3 py-1 text-red-400">abort</td>
            <td class="px-3 py-1 text-yellow-400">UB</td>
            <td class="px-3 py-1 text-gray-400 font-sans">Impossible paths</td>
          </tr>
          <tr>
            <td class="px-3 py-1 text-cyan-300">assert(false)</td>
            <td class="px-3 py-1 text-red-400">abort</td>
            <td class="px-3 py-1 text-green-400">nothing</td>
            <td class="px-3 py-1 text-gray-400 font-sans">Invariant checks</td>
          </tr>
          <tr>
            <td class="px-3 py-1 text-orange-300">report_fatal_error</td>
            <td class="px-3 py-1 text-red-400">abort</td>
            <td class="px-3 py-1 text-red-400">abort</td>
            <td class="px-3 py-1 text-gray-400 font-sans">Unrecoverable</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Use case guidance -->
    <div class="flex gap-4 mb-4">
      <div class="bg-purple-900/20 rounded-lg p-2 border border-purple-500/30 text-center">
        <div class="text-purple-400 font-bold text-xs">llvm_unreachable</div>
        <div class="text-gray-500 text-xs mt-1">Exhaustive switches</div>
      </div>
      <div class="bg-cyan-900/20 rounded-lg p-2 border border-cyan-500/30 text-center">
        <div class="text-cyan-400 font-bold text-xs">assert</div>
        <div class="text-gray-500 text-xs mt-1">Preconditions</div>
      </div>
      <div class="bg-orange-900/20 rounded-lg p-2 border border-orange-500/30 text-center">
        <div class="text-orange-400 font-bold text-xs">report_fatal_error</div>
        <div class="text-gray-500 text-xs mt-1">Always crash</div>
      </div>
    </div>

    <!-- Warning -->
    <div class="bg-red-900/20 rounded-lg px-4 py-2 border border-red-500/30">
      <span class="text-red-300 text-sm">
        ⚠️ If llvm_unreachable is <span class="font-bold">actually reached</span> in release →
        anything can happen!
      </span>
    </div>
  </div>
</template>

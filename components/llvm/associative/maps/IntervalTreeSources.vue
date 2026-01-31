<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center mb-6">
    <!-- Key difference from IntervalMap -->
    <div class="flex gap-8 items-start">
      <!-- IntervalMap -->
      <div class="flex flex-col items-center">
        <div class="text-purple-400 font-bold text-sm mb-2">IntervalMap</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-purple-500/30">
          <div class="text-xs text-gray-400 mb-2 text-center">Disjoint intervals only</div>
          <div class="flex flex-col gap-1">
            <div class="flex gap-0.5">
              <div class="w-16 h-4 bg-purple-400/30 border border-purple-400 rounded-sm" />
              <div class="w-8 h-4 bg-gray-700" />
              <div class="w-12 h-4 bg-purple-400/30 border border-purple-400 rounded-sm" />
            </div>
          </div>
          <div class="text-xs text-purple-300 mt-2">No overlaps allowed</div>
        </div>
      </div>

      <!-- IntervalTree -->
      <div class="flex flex-col items-center">
        <div class="text-teal-400 font-bold text-sm mb-2">IntervalTree</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-teal-500/30">
          <div class="text-xs text-gray-400 mb-2 text-center">Overlapping intervals OK!</div>
          <div class="flex flex-col gap-1 relative">
            <div class="w-20 h-4 bg-teal-400/30 border border-teal-400 rounded-sm" />
            <div class="w-16 h-4 bg-cyan-400/30 border border-cyan-400 rounded-sm ml-4" />
            <div class="w-12 h-4 bg-green-400/30 border border-green-400 rounded-sm ml-8" />
          </div>
          <div class="text-xs text-teal-300 mt-2">Query all overlapping</div>
        </div>
      </div>
    </div>

    <!-- Tree visualization -->
    <div class="mt-5 bg-gray-800/50 rounded-lg p-3 border border-gray-600">
      <div class="text-gray-400 text-xs text-center mb-2">Augmented Binary Tree (max endpoint)</div>
      <div class="flex flex-col items-center gap-2">
        <!-- Root -->
        <div class="flex flex-col items-center">
          <div class="px-3 py-1 border border-teal-400 bg-teal-400/20 rounded text-xs">
            <span class="text-teal-300">[10,30)</span>
            <span class="text-gray-400 ml-1">max=50</span>
          </div>
        </div>
        <!-- Children -->
        <div class="flex gap-8">
          <div class="px-3 py-1 border border-teal-400 bg-teal-400/20 rounded text-xs">
            <span class="text-teal-300">[5,15)</span>
            <span class="text-gray-400 ml-1">max=15</span>
          </div>
          <div class="px-3 py-1 border border-teal-400 bg-teal-400/20 rounded text-xs">
            <span class="text-teal-300">[20,50)</span>
            <span class="text-gray-400 ml-1">max=50</span>
          </div>
        </div>
      </div>
    </div>

    <!-- API hint -->
    <!-- <div class="mt-4 flex gap-4 text-xs">
      <div class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded">
        <span class="text-blue-300 font-mono">getContaining(Point)</span>
      </div>
      <div class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded">
        <span class="text-blue-300 font-mono">getOverlapping(Start, End)</span>
      </div>
    </div> -->
  </div>
</template>

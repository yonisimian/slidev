<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- The problem it solves -->
    <div class="flex gap-8 items-start">
      <!-- Without ValueMap -->
      <div class="flex flex-col items-center">
        <div class="text-red-400 font-bold text-sm mb-2">❌ DenseMap&lt;Value*, T&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
          <div class="font-mono text-xs text-gray-300 space-y-1">
            <div>Map[OldInst] = Data;</div>
            <div class="text-gray-500">// ...</div>
            <div class="text-yellow-400">OldInst→RAUW(NewInst);</div>
            <div class="text-gray-500">// ...</div>
            <div class="text-red-400">Map[OldInst]; // 💥 dangling!</div>
          </div>
        </div>
        <div class="text-xs text-red-400 mt-2">Manual tracking needed</div>
      </div>

      <!-- With ValueMap -->
      <div class="flex flex-col items-center">
        <div class="text-green-400 font-bold text-sm mb-2">✓ ValueMap&lt;Value*, T&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="font-mono text-xs text-gray-300 space-y-1">
            <div>VMap[OldInst] = Data;</div>
            <div class="text-gray-500">// ...</div>
            <div class="text-yellow-400">OldInst→RAUW(NewInst);</div>
            <div class="text-gray-500">// ...</div>
            <div class="text-green-400">VMap[NewInst]; // ✓ auto-updated!</div>
          </div>
        </div>
        <div class="text-xs text-green-400 mt-2">Key follows Value lifecycle</div>
      </div>
    </div>

    <!-- Callback system -->
    <div class="mt-5 bg-gray-800/50 rounded-lg p-3 border border-blue-500/30">
      <div class="text-blue-400 font-bold text-sm mb-2 text-center">ValueMapConfig Callbacks</div>
      <div class="flex gap-6 justify-center">
        <div class="text-center">
          <div class="text-cyan-300 font-mono text-xs">onRAUW(Old, New)</div>
          <div class="text-gray-400 text-xs mt-1">Key replacement</div>
        </div>
        <div class="text-center">
          <div class="text-orange-300 font-mono text-xs">onDelete(V)</div>
          <div class="text-gray-400 text-xs mt-1">Value destruction</div>
        </div>
      </div>
    </div>

    <!-- Use cases -->
    <div class="mt-4 flex gap-4 text-xs">
      <div class="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300">
        Cloning
      </div>
      <div class="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300">
        Inlining
      </div>
      <div class="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300">
        Loop transforms
      </div>
      <div class="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300">
        VMap in passes
      </div>
    </div>
  </div>
</template>

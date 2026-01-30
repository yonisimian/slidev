<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Use case comparison -->
    <div class="flex gap-6 items-start mb-4">
      <div class="flex flex-col items-center">
        <div class="text-green-400 font-bold text-sm mb-2">✓ Good for</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="text-xs space-y-1">
            <div class="text-gray-300">• Command-line tools</div>
            <div class="text-gray-300">• One-shot programs</div>
            <div class="text-gray-300">• Test drivers</div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="text-red-400 font-bold text-sm mb-2">❌ Bad for</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
          <div class="text-xs space-y-1">
            <div class="text-gray-300">• Libraries</div>
            <div class="text-gray-300">• Recoverable errors</div>
            <div class="text-gray-300">• Long-running services</div>
          </div>
        </div>
      </div>
    </div>

    <!-- API -->
    <div class="bg-gray-800/50 rounded-lg p-3 border border-gray-600 mb-4">
      <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
        <div class="text-orange-300 font-mono">ExitOnError("prefix: ")</div>
        <div class="text-gray-400">Constructor with banner</div>
        <div class="text-orange-300 font-mono">operator()(Expected&lt;T&gt;)</div>
        <div class="text-gray-400">Unwrap or exit</div>
        <div class="text-orange-300 font-mono">operator()(Error)</div>
        <div class="text-gray-400">Check or exit</div>
        <div class="text-orange-300 font-mono">setBanner(str)</div>
        <div class="text-gray-400">Change prefix</div>
      </div>
    </div>

    <!-- Related: cantFail -->
    <div class="bg-yellow-900/20 rounded-lg px-4 py-2 border border-yellow-500/30">
      <span class="text-yellow-300 text-sm">
        See also: <span class="font-mono">cantFail()</span> — asserts instead of exiting (for
        "impossible" errors)
      </span>
    </div>
  </div>
</template>

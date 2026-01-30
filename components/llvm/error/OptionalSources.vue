<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Comparison -->
    <div class="flex gap-8 items-start">
      <!-- Pointer approach -->
      <div class="flex flex-col items-center">
        <div class="text-red-400 font-bold text-sm mb-2">❌ Pointer/nullptr</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
          <div class="font-mono text-xs text-gray-300 space-y-1">
            <div>int* find(Key k);</div>
            <div class="text-red-400">// Heap alloc? Ownership?</div>
            <div>if (ptr) use(*ptr);</div>
            <div class="text-red-400">// Dangling pointer risk!</div>
          </div>
        </div>
      </div>

      <!-- Optional approach -->
      <div class="flex flex-col items-center">
        <div class="text-green-400 font-bold text-sm mb-2">✓ Optional</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="font-mono text-xs text-gray-300 space-y-1">
            <div>Optional&lt;int&gt; find(Key k);</div>
            <div class="text-green-400">// Value semantics, no heap</div>
            <div>if (opt) use(*opt);</div>
            <div class="text-green-400">// Safe, clear ownership</div>
          </div>
        </div>
      </div>
    </div>

    <!-- API summary -->
    <div class="mt-5 bg-gray-800/50 rounded-lg p-3 border border-gray-600">
      <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
        <div class="text-cyan-300 font-mono">operator bool()</div>
        <div class="text-gray-400">Check if value present</div>
        <div class="text-cyan-300 font-mono">*opt / opt.value()</div>
        <div class="text-gray-400">Get value (UB if empty!)</div>
        <div class="text-cyan-300 font-mono">opt.value_or(def)</div>
        <div class="text-gray-400">Get value or default</div>
        <div class="text-cyan-300 font-mono">opt.map(fn)</div>
        <div class="text-gray-400">Transform if present</div>
      </div>
    </div>

    <!-- When to use -->
    <div class="mt-4 flex gap-4 text-xs">
      <div class="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-300">
        Search results
      </div>
      <div class="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-300">
        Parse attempts
      </div>
      <div class="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-300">
        Config lookups
      </div>
    </div>
  </div>
</template>

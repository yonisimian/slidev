<script setup></script>

<template>
  <div class="flex justify-center items-center gap-8 mt-4">
    <div class="flex flex-col items-center gap-4">
      <!-- Comparison: std::string vs Twine -->
      <div class="flex gap-8">
        <!-- std::string way (bad) -->
        <div class="bg-red-900/20 rounded-lg p-3 border border-red-500/50">
          <div class="text-red-400 font-bold text-sm mb-2">❌ std::string</div>
          <div class="font-mono text-xs text-gray-300">
            <div>std::string s = a;</div>
            <div class="text-red-400">// alloc #1</div>
            <div>s += b;</div>
            <div class="text-red-400">// alloc #2</div>
            <div>s += c;</div>
            <div class="text-red-400">// alloc #3</div>
          </div>
        </div>

        <!-- Twine way (good) -->
        <div class="bg-green-900/20 rounded-lg p-3 border border-green-500/50">
          <div class="text-green-400 font-bold text-sm mb-2">✓ Twine</div>
          <div class="font-mono text-xs text-gray-300">
            <div>Twine t = a + b + c;</div>
            <div class="text-green-400">// 0 allocs (stack)</div>
            <div>t.str();</div>
            <div class="text-green-400">// 1 alloc (final)</div>
          </div>
        </div>
      </div>

      <!-- Warning -->
      <div class="bg-yellow-900/30 rounded-lg p-2 border border-yellow-500/50 text-center">
        <div class="text-yellow-400 text-xs">
          ⚠️ <span class="font-bold">Never store a Twine!</span> It holds references to temporaries.
        </div>
      </div>

      <!-- Usage pattern -->
      <div class="text-gray-400 text-sm">
        Use as: <span class="text-green-300 font-mono">void foo(const Twine &msg)</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

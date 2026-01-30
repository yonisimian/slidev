<script setup></script>

<template>
  <div class="flex justify-center items-center gap-8 mt-4 mb-12">
    <div class="flex flex-col items-center gap-0">
      <!-- Source types -->
      <div class="flex gap-4">
        <div class="source-box">
          <div class="text-green-400 font-mono text-sm">"literal"</div>
          <div class="text-xs text-gray-400 mt-1">C string</div>
        </div>
        <div class="source-box">
          <div class="text-green-400 font-mono text-sm">std::string</div>
          <div class="text-xs text-gray-400 mt-1">STL string</div>
        </div>
        <div class="source-box">
          <div class="text-green-400 font-mono text-sm">SmallString</div>
          <div class="text-xs text-gray-400 mt-1">LLVM string</div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="text-green-400 text-2xl mt-2">↓</div>

      <!-- StringRef -->
      <div class="bg-gray-800 rounded-lg p-3 border-2 border-green-500">
        <div class="font-mono text-green-300 text-center mb-2">StringRef</div>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-gray-400">ptr</span>
          <span class="text-green-400">→</span>
          <div class="flex gap-0.5">
            <div
              v-for="c in 'hello'"
              :key="c"
              class="w-5 h-5 bg-green-600 rounded-sm text-xs flex items-center justify-center text-white font-mono"
            >
              {{ c }}
            </div>
          </div>
          <span class="text-gray-400 ml-2">len=5</span>
        </div>
      </div>

      <!-- Arrow -->
      <div class="text-green-400 text-2xl mt-2">↓</div>

      <!-- Common operations -->
      <div class="flex gap-3">
        <div class="op-box">substr()</div>
        <div class="op-box">split()</div>
        <div class="op-box">find()</div>
        <div class="op-box">starts_with()</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .source-box {
    @apply bg-gray-800 rounded-lg px-3 py-2 border border-gray-600 text-center;
  }

  .op-box {
    @apply bg-green-900/50 rounded px-2 py-1 border border-green-500 text-green-300 font-mono text-xs;
  }
</style>

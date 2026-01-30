<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Optional vs Expected -->
    <div class="flex gap-8 items-start">
      <div class="flex flex-col items-center">
        <div class="text-cyan-400 font-bold text-sm mb-2">Optional&lt;T&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-cyan-500/30">
          <div class="text-center text-xs">
            <div class="text-gray-300">Value <span class="text-cyan-300">or</span> Nothing</div>
            <div class="text-gray-500 mt-1">No error details</div>
          </div>
        </div>
      </div>

      <div class="text-gray-500 text-2xl self-center">vs</div>

      <div class="flex flex-col items-center">
        <div class="text-green-400 font-bold text-sm mb-2">Expected&lt;T&gt;</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="text-center text-xs">
            <div class="text-gray-300">Value <span class="text-green-300">or</span> Error</div>
            <div class="text-gray-500 mt-1">Rich error info!</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error handling flow -->
    <div class="mt-5 bg-gray-800/50 rounded-lg p-3 border border-gray-600">
      <div class="text-sm text-gray-400 mb-2 text-center">Error Consumption</div>
      <div class="flex gap-3 items-center justify-center text-xs">
        <div class="px-2 py-1 border border-red-400/50 rounded text-red-300">takeError()</div>
        <span class="text-gray-500">→</span>
        <div class="flex flex-col gap-1">
          <div class="px-2 py-1 border border-yellow-400/50 rounded text-yellow-300">
            handleErrors()
          </div>
          <div class="px-2 py-1 border border-green-400/50 rounded text-green-300">
            consumeError()
          </div>
          <div class="px-2 py-1 border border-cyan-400/50 rounded text-cyan-300">toString()</div>
        </div>
      </div>
    </div>

    <!-- Critical warning -->
    <div class="mt-4 bg-red-900/20 rounded-lg px-4 py-2 border border-red-500/30">
      <span class="text-red-300 text-sm">
        ⚠️ <span class="font-bold">Unchecked Expected asserts in destructor!</span>
        Always handle or consume the error.
      </span>
    </div>
  </div>
</template>

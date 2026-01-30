<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- std::function vs function_ref comparison -->
    <div class="flex gap-8 items-start">
      <!-- std::function -->
      <div class="flex flex-col items-center">
        <div class="text-red-400 font-bold text-sm mb-2">std::function</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
          <div class="flex flex-col gap-1 text-xs font-mono text-gray-300">
            <div class="flex items-center gap-2">
              <div
                class="w-20 h-5 border border-red-400/50 bg-red-400/10 rounded flex items-center justify-center text-red-300"
              >
                vtable ptr
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="w-20 h-5 border border-red-400/50 bg-red-400/10 rounded flex items-center justify-center text-red-300"
              >
                allocator
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="w-20 h-5 border border-gray-500 rounded flex items-center justify-center text-gray-400"
              >
                storage...
              </div>
            </div>
          </div>
          <div class="text-xs text-red-400 mt-2 text-center">32+ bytes, heap alloc</div>
        </div>
      </div>

      <!-- function_ref -->
      <div class="flex flex-col items-center">
        <div class="text-green-400 font-bold text-sm mb-2">function_ref</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="flex flex-col gap-1 text-xs font-mono text-gray-300">
            <div class="flex items-center gap-2">
              <div
                class="w-20 h-5 border border-green-400/50 bg-green-400/10 rounded flex items-center justify-center text-green-300"
              >
                callback
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="w-20 h-5 border border-green-400/50 bg-green-400/10 rounded flex items-center justify-center text-green-300"
              >
                callable
              </div>
            </div>
          </div>
          <div class="text-xs text-green-400 mt-2 text-center">16 bytes, no alloc!</div>
        </div>
      </div>
    </div>

    <!-- Key properties -->
    <div class="mt-5 flex gap-4">
      <div class="bg-gray-800/50 rounded-lg p-2 border border-cyan-500/30 text-center">
        <div class="text-cyan-400 font-bold text-sm">Non-owning</div>
        <div class="text-gray-400 text-xs">Like StringRef/ArrayRef</div>
      </div>
      <div class="bg-gray-800/50 rounded-lg p-2 border border-purple-500/30 text-center">
        <div class="text-purple-400 font-bold text-sm">Type-erased</div>
        <div class="text-gray-400 text-xs">Any matching callable</div>
      </div>
      <div class="bg-gray-800/50 rounded-lg p-2 border border-green-500/30 text-center">
        <div class="text-green-400 font-bold text-sm">Trivially copyable</div>
        <div class="text-gray-400 text-xs">Just 2 pointers</div>
      </div>
    </div>

    <!-- Warning -->
    <div class="mt-4 bg-red-900/20 rounded-lg px-4 py-2 border border-red-500/30">
      <span class="text-red-300 text-sm">
        ⚠️ <span class="font-bold">Never store!</span> Use only as function parameter — callable
        lifetime must outlive the call.
      </span>
    </div>
  </div>
</template>

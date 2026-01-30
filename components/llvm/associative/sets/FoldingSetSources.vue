<script setup>
  import { ref, onMounted } from 'vue'

  const showContent = ref(false)

  onMounted(() => {
    setTimeout(() => (showContent.value = true), 500)
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center my-6">
    <!-- Uniquing pattern -->
    <div
      class="flex flex-col items-center gap-4 transition-all duration-700"
      :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="text-base font-bold text-indigo-400 mb-2">The Uniquing Pattern</div>

      <div class="flex gap-6 items-center">
        <!-- Step 1: Profile -->
        <div class="flex flex-col items-center">
          <div
            class="w-28 h-16 border-2 border-yellow-400 bg-yellow-400/20 rounded-lg flex flex-col items-center justify-center"
          >
            <div class="text-xs text-gray-400">Profile(ID)</div>
            <div class="text-sm text-yellow-300">hash content</div>
          </div>
        </div>

        <span class="text-gray-500">→</span>

        <!-- Step 2: Find -->
        <div class="flex flex-col items-center">
          <div
            class="w-36 h-16 border-2 border-blue-400 bg-blue-400/20 rounded-lg flex flex-col items-center justify-center"
          >
            <div class="text-xs text-gray-400">FindNodeOrInsertPos</div>
            <div class="text-sm text-blue-300">lookup</div>
          </div>
        </div>

        <span class="text-gray-500">→</span>

        <!-- Step 3: Result -->
        <div class="flex flex-col gap-2">
          <div
            class="px-3 py-1 border border-green-400 bg-green-400/20 rounded text-xs text-green-300"
          >
            Found? → Return existing
          </div>
          <div
            class="px-3 py-1 border border-purple-400 bg-purple-400/20 rounded text-xs text-purple-300"
          >
            Not found? → InsertNode()
          </div>
        </div>
      </div>
    </div>

    <!-- Key benefits -->
    <div
      class="mt-6 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
      :class="showContent ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-center">
        <div class="text-2xl mb-1">🔄</div>
        <div class="text-sm text-green-400 font-semibold">Flyweight</div>
        <div class="text-xs text-gray-500">Share identical objects</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">🏷️</div>
        <div class="text-sm text-yellow-400 font-semibold">Intrusive</div>
        <div class="text-xs text-gray-500">Node stores its own link</div>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-1">📋</div>
        <div class="text-sm text-blue-400 font-semibold">Profile()</div>
        <div class="text-xs text-gray-500">Content defines identity</div>
      </div>
    </div>

    <!-- Use cases -->
    <!-- <div class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 transition-all duration-700 delay-500"
            :class="showContent ? 'opacity-100' : 'opacity-0'">
            <div class="text-xs text-gray-400 font-mono text-center">
                Use cases: LLVM Type uniquing, Constant pool, SCEV expressions, AttributeSet
            </div>
        </div> -->
  </div>
</template>

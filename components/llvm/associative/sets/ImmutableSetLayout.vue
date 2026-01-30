<script setup>
  import { ref, onMounted } from 'vue'

  const phase = ref(0)

  onMounted(() => {
    setTimeout(() => (phase.value = 1), 700)
    setTimeout(() => (phase.value = 2), 1400)
    setTimeout(() => (phase.value = 3), 2100)
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Title -->
    <div class="text-lg font-bold text-violet-400 mb-4">ImmutableSet - Persistent AVL Tree</div>

    <!-- Tree visualization with structural sharing -->
    <div class="flex gap-8 items-end">
      <!-- S1: Initial tree {3, 5, 7} -->
      <div v-if="phase >= 1" class="flex flex-col items-center transition-all duration-500">
        <div class="text-xs text-gray-400 mb-2">S1 = {3, 5, 7}</div>
        <div class="relative w-24 h-20">
          <!-- Root: 5 -->
          <div
            class="absolute left-1/2 -translate-x-1/2 top-0 w-7 h-7 rounded-full border-2 border-violet-400 bg-violet-400/20 flex items-center justify-center text-xs text-violet-300"
          >
            5
          </div>
          <!-- Left: 3 -->
          <div
            class="absolute left-2 top-12 w-7 h-7 rounded-full border-2 border-violet-400 bg-violet-400/20 flex items-center justify-center text-xs text-violet-300"
          >
            3
          </div>
          <!-- Right: 7 -->
          <div
            class="absolute right-2 top-12 w-7 h-7 rounded-full border-2 border-violet-400 bg-violet-400/20 flex items-center justify-center text-xs text-violet-300"
          >
            7
          </div>
          <!-- Lines -->
          <svg class="absolute inset-0 w-full h-full" style="z-index: -1">
            <line x1="48" y1="28" x2="22" y2="48" stroke="#8b5cf6" stroke-width="2" />
            <line x1="48" y1="28" x2="74" y2="48" stroke="#8b5cf6" stroke-width="2" />
          </svg>
        </div>
      </div>

      <!-- Arrow -->
      <div v-if="phase >= 2" class="text-gray-500 text-xl mb-8">→</div>

      <!-- S2: After adding 9 (shares left subtree) -->
      <div v-if="phase >= 2" class="flex flex-col items-center transition-all duration-500">
        <div class="text-xs text-gray-400 mb-2">S2 = add(S1, 9)</div>
        <div class="relative w-32 h-24">
          <!-- Root: 5 (new) -->
          <div
            class="absolute left-1/2 -translate-x-1/2 top-0 w-7 h-7 rounded-full border-2 border-green-400 bg-green-400/20 flex items-center justify-center text-xs text-green-300"
          >
            5
          </div>
          <!-- Left: 3 (shared!) -->
          <div
            class="absolute left-3 top-12 w-7 h-7 rounded-full border-2 border-violet-400 bg-violet-400/20 flex items-center justify-center text-xs text-violet-300 opacity-60"
          >
            3
          </div>
          <!-- Right: 7 (new path) -->
          <div
            class="absolute right-6 top-12 w-7 h-7 rounded-full border-2 border-green-400 bg-green-400/20 flex items-center justify-center text-xs text-green-300"
          >
            7
          </div>
          <!-- New: 9 -->
          <div
            class="absolute right-0 top-20 w-7 h-7 rounded-full border-2 border-yellow-400 bg-yellow-400/20 flex items-center justify-center text-xs text-yellow-300"
          >
            9
          </div>
          <!-- Lines -->
          <svg class="absolute inset-0 w-full h-full" style="z-index: -1">
            <line
              x1="64"
              y1="28"
              x2="24"
              y2="48"
              stroke="#8b5cf6"
              stroke-width="2"
              stroke-dasharray="4"
            />
            <line x1="64" y1="28" x2="94" y2="48" stroke="#22c55e" stroke-width="2" />
            <line x1="94" y1="76" x2="114" y2="80" stroke="#22c55e" stroke-width="2" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="mt-6 flex gap-4 text-xs">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full border-2 border-violet-400 bg-violet-400/20"></div>
        <span class="text-gray-400">Original/Shared</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full border-2 border-green-400 bg-green-400/20"></div>
        <span class="text-gray-400">New copy</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full border-2 border-yellow-400 bg-yellow-400/20"></div>
        <span class="text-gray-400">Inserted</span>
      </div>
    </div>

    <!-- Explanation -->
    <div
      class="mt-4 text-sm text-center"
      :class="{
        'text-gray-500': phase === 0,
        'text-violet-400': phase === 1,
        'text-green-400': phase === 2,
      }"
    >
      <span v-if="phase === 0">Immutable trees share structure between versions</span>
      <span v-else-if="phase === 1">S1 = {3, 5, 7} - balanced AVL tree</span>
      <span v-else>S2 = add(S1, 9) - only right path copied, left subtree shared!</span>
    </div>

    <!-- Phase indicator -->
    <div class="mt-4 flex gap-2">
      <div
        v-for="(label, i) in ['Concept', 'Create S1', 'Add 9 → S2']"
        :key="i"
        class="px-2 py-1 rounded text-xs transition-all duration-300"
        :class="phase === i ? 'bg-violet-500 text-white' : 'bg-gray-700 text-gray-400'"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

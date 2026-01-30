<script setup>
  import { ref, onMounted } from 'vue'

  const phase = ref(0)

  onMounted(() => {
    setTimeout(() => (phase.value = 1), 600)
    setTimeout(() => (phase.value = 2), 1200)
    setTimeout(() => (phase.value = 3), 1800)
  })

  const getVector = () => {
    if (phase.value === 0) return []
    if (phase.value === 1) return ['A', 'B']
    if (phase.value === 2) return ['A', 'B', 'C']
    return ['A', 'B', 'C'] // Duplicate 'A' rejected
  }

  const getSet = () => {
    if (phase.value === 0) return new Set()
    if (phase.value === 1) return new Set(['A', 'B'])
    if (phase.value === 2) return new Set(['A', 'B', 'C'])
    return new Set(['A', 'B', 'C'])
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Title -->
    <div class="text-lg font-bold text-teal-400 mb-6">SetVector - Ordered Unique Elements</div>

    <div class="flex gap-12 items-start">
      <!-- Vector (for order) -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-gray-400 mb-2">Vector (order)</div>
        <div class="flex gap-1">
          <div
            v-for="(val, i) in getVector()"
            :key="i"
            class="w-10 h-10 border-2 border-teal-400 bg-teal-400/20 rounded flex flex-col items-center justify-center transition-all duration-300"
          >
            <span class="text-xs text-gray-500">[{{ i }}]</span>
            <span class="text-sm font-mono text-teal-300">{{ val }}</span>
          </div>
          <div v-if="getVector().length === 0" class="text-gray-500 text-sm">(empty)</div>
        </div>
        <div class="text-xs text-gray-500 mt-2">Iteration order →</div>
      </div>

      <!-- Plus sign -->
      <div class="text-2xl text-gray-500 mt-4">+</div>

      <!-- Set (for uniqueness) -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-gray-400 mb-2">Set (uniqueness)</div>
        <div class="flex gap-1">
          <div
            v-for="val in ['A', 'B', 'C']"
            :key="val"
            class="w-10 h-10 border-2 rounded flex items-center justify-center text-sm font-mono transition-all duration-300"
            :class="
              getSet().has(val)
                ? 'border-orange-400 bg-orange-400/20 text-orange-300'
                : 'border-gray-600 bg-gray-800/30 text-gray-600'
            "
          >
            {{ val }}
          </div>
        </div>
        <div class="text-xs text-gray-500 mt-2">O(1) lookup</div>
      </div>
    </div>

    <!-- Duplicate rejection indicator -->
    <div
      v-if="phase === 3"
      class="mt-4 px-4 py-2 bg-red-400/20 border border-red-400 rounded-lg text-sm text-red-300 transition-all duration-300"
    >
      insert(A) → Already in set → Rejected! Order preserved.
    </div>

    <!-- Phase indicator -->
    <div class="mt-6 flex gap-2">
      <div
        v-for="(label, i) in ['Empty', 'insert(A,B)', 'insert(C)', 'insert(A) ✗']"
        :key="i"
        class="px-2 py-1 rounded text-xs transition-all duration-300"
        :class="phase === i ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-400'"
      >
        {{ label }}
      </div>
    </div>

    <!-- Key insight -->
    <div
      class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 text-xs text-gray-400 text-center"
    >
      Vector: O(1) append, O(n) iteration in order | Set: O(1) contains check
    </div>
  </div>
</template>

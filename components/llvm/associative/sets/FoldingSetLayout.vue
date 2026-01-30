<script setup>
  import { ref, onMounted } from 'vue'

  const phase = ref(0)

  onMounted(() => {
    setTimeout(() => (phase.value = 1), 700)
    setTimeout(() => (phase.value = 2), 1400)
    setTimeout(() => (phase.value = 3), 2100)
  })

  const nodes = [
    { id: 'A', content: 'int, 32', bucket: 2 },
    { id: 'B', content: 'ptr, i32', bucket: 5 },
    { id: 'C', content: 'int, 64', bucket: 2 }, // Same bucket as A (collision)
  ]

  const getVisibleNodes = () => nodes.slice(0, phase.value)
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Title -->
    <div class="text-lg font-bold text-indigo-400 mb-4">FoldingSet - Content-Based Uniquing</div>

    <div class="flex gap-8 items-start">
      <!-- Hash Buckets -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-gray-400 mb-2">Hash Buckets</div>
        <div class="flex flex-col gap-1">
          <div
            v-for="i in 8"
            :key="i"
            class="w-10 h-6 border rounded flex items-center justify-center text-xs transition-all duration-300"
            :class="
              getVisibleNodes().some((n) => n.bucket === i - 1)
                ? 'border-indigo-400 bg-indigo-400/20 text-indigo-300'
                : 'border-gray-600 bg-gray-800/30 text-gray-600'
            "
          >
            [{{ i - 1 }}]
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="flex flex-col justify-center h-48 text-gray-500">→</div>

      <!-- Nodes (chained) -->
      <div class="flex flex-col items-start gap-3">
        <div class="text-sm text-gray-400 mb-1">FoldingSetNodes</div>

        <!-- Bucket 2 chain -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500 w-8">[2]:</span>
          <div
            v-if="phase >= 1"
            class="px-3 py-2 border-2 border-green-400 bg-green-400/20 rounded-lg transition-all duration-300"
          >
            <div class="text-xs text-gray-400">Profile:</div>
            <div class="text-sm font-mono text-green-300">int, 32</div>
          </div>
          <span v-if="phase >= 3" class="text-gray-500">→</span>
          <div
            v-if="phase >= 3"
            class="px-3 py-2 border-2 border-yellow-400 bg-yellow-400/20 rounded-lg transition-all duration-300"
          >
            <div class="text-xs text-gray-400">Profile:</div>
            <div class="text-sm font-mono text-yellow-300">int, 64</div>
          </div>
        </div>

        <!-- Bucket 5 -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500 w-8">[5]:</span>
          <div
            v-if="phase >= 2"
            class="px-3 py-2 border-2 border-blue-400 bg-blue-400/20 rounded-lg transition-all duration-300"
          >
            <div class="text-xs text-gray-400">Profile:</div>
            <div class="text-sm font-mono text-blue-300">ptr, i32</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Explanation -->
    <div
      class="mt-6 text-sm text-center"
      :class="{
        'text-gray-500': phase === 0,
        'text-green-400': phase === 1,
        'text-blue-400': phase === 2,
        'text-yellow-400': phase === 3,
      }"
    >
      <span v-if="phase === 0">FoldingSet uniquifies nodes by their Profile()</span>
      <span v-else-if="phase === 1">Insert Type(int, 32) → hash → bucket[2]</span>
      <span v-else-if="phase === 2">Insert Type(ptr, i32) → hash → bucket[5]</span>
      <span v-else>Insert Type(int, 64) → hash collision → chain at bucket[2]</span>
    </div>

    <!-- Phase indicator -->
    <div class="mt-4 flex gap-2">
      <div
        v-for="(label, i) in ['Empty', 'Type(int,32)', 'Type(ptr,i32)', 'Type(int,64)']"
        :key="i"
        class="px-2 py-1 rounded text-xs transition-all duration-300"
        :class="phase === i ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-400'"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

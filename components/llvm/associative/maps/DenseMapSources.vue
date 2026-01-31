<script setup>
  import { ref, onMounted } from 'vue'

  const visible = ref(false)

  onMounted(() => {
    setTimeout(() => (visible.value = true), 300)
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center mb-12">
    <!-- Head-to-head comparison -->
    <div
      class="flex gap-8 transition-all duration-700"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <!-- std::unordered_map -->
      <div class="flex flex-col items-center">
        <div class="text-base font-bold text-red-400 mb-2">std::unordered_map</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
          <div class="text-xs text-gray-400 mb-2 text-center">Chained buckets</div>
          <div class="flex gap-3">
            <div v-for="i in 3" :key="i" class="flex flex-col items-center gap-1">
              <div
                class="w-8 h-6 border border-gray-500 rounded text-xs flex items-center justify-center text-gray-400"
              >
                [{{ i - 1 }}]
              </div>
              <div class="w-1 h-3 bg-gray-500" />
              <div
                class="w-6 h-6 border border-red-400/50 bg-red-400/10 rounded-full text-xs flex items-center justify-center text-red-300"
              >
                ●
              </div>
              <div v-if="i === 2" class="w-1 h-2 bg-gray-500" />
              <div
                v-if="i === 2"
                class="w-6 h-6 border border-red-400/50 bg-red-400/10 rounded-full text-xs flex items-center justify-center text-red-300"
              >
                ●
              </div>
            </div>
          </div>
          <div class="text-xs text-red-400 mt-2 text-center">Pointer chasing 😞</div>
        </div>
      </div>

      <!-- DenseMap -->
      <div class="flex flex-col items-center">
        <div class="text-base font-bold text-green-400 mb-2">DenseMap</div>
        <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
          <div class="text-xs text-gray-400 mb-2 text-center">Flat array + quadratic probe</div>
          <div class="flex gap-0.5">
            <div
              v-for="(slot, idx) in ['K₁', 'V₁', 'K₂', 'V₂', '∅', '∅', 'K₃', 'V₃']"
              :key="idx"
              class="w-6 h-6 border rounded text-xs flex items-center justify-center"
              :class="
                slot === '∅'
                  ? 'border-gray-600 text-gray-500'
                  : 'border-green-400 bg-green-400/20 text-green-300'
              "
            >
              {{ slot }}
            </div>
          </div>
          <div class="text-xs text-green-400 mt-2 text-center">Cache-friendly! 🚀</div>
        </div>
      </div>
    </div>

    <!-- Key insight boxes -->
    <!-- <div
      class="mt-6 flex gap-4 transition-all duration-700 delay-200"
      :class="visible ? 'opacity-100' : 'opacity-0'"
    >
      <div class="bg-gray-800/50 rounded-lg p-2 border border-cyan-500/30 text-center">
        <div class="text-cyan-400 font-bold text-sm">Empty Key</div>
        <div class="text-gray-400 text-xs">Special sentinel value</div>
      </div>
      <div class="bg-gray-800/50 rounded-lg p-2 border border-orange-500/30 text-center">
        <div class="text-orange-400 font-bold text-sm">Tombstone</div>
        <div class="text-gray-400 text-xs">Marks deleted slots</div>
      </div>
      <div class="bg-gray-800/50 rounded-lg p-2 border border-purple-500/30 text-center">
        <div class="text-purple-400 font-bold text-sm">~75% Load</div>
        <div class="text-gray-400 text-xs">Grows at 3/4 full</div>
      </div>
    </div> -->
  </div>
</template>

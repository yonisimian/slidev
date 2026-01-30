<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const step = ref(0)
  let interval = null

  // Three arrays being zipped
  const names = ['Alice', 'Bob', 'Carol']
  const ages = [25, 30, 28]
  const cities = ['NYC', 'LA', 'Chicago']

  onMounted(() => {
    interval = setInterval(() => {
      step.value = (step.value + 1) % 4
    }, 1800)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h2 class="text-2xl font-bold">
      <span class="text-green-400">llvm::zip</span>
      <span class="text-gray-400 text-lg ml-2">— Iterate multiple ranges together</span>
    </h2>

    <!-- Arrays visualization -->
    <div class="flex flex-col gap-3 mt-4">
      <!-- Names array -->
      <div class="flex items-center gap-2">
        <span class="text-gray-500 font-mono w-16 text-right text-sm">names:</span>
        <div class="flex gap-1">
          <div
            v-for="(name, idx) in names"
            :key="'name-' + idx"
            class="w-20 h-10 border-2 rounded flex items-center justify-center font-mono text-sm transition-all duration-300"
            :class="{
              'border-green-400 bg-green-400/20 text-green-300 scale-110': step === idx,
              'border-gray-600 bg-gray-800/30 text-gray-500': step !== idx && step !== 3,
              'border-green-400/50 bg-green-400/10 text-green-400': step === 3,
            }"
          >
            {{ name }}
          </div>
        </div>
      </div>

      <!-- Ages array -->
      <div class="flex items-center gap-2">
        <span class="text-gray-500 font-mono w-16 text-right text-sm">ages:</span>
        <div class="flex gap-1">
          <div
            v-for="(age, idx) in ages"
            :key="'age-' + idx"
            class="w-20 h-10 border-2 rounded flex items-center justify-center font-mono text-sm transition-all duration-300"
            :class="{
              'border-blue-400 bg-blue-400/20 text-blue-300 scale-110': step === idx,
              'border-gray-600 bg-gray-800/30 text-gray-500': step !== idx && step !== 3,
              'border-blue-400/50 bg-blue-400/10 text-blue-400': step === 3,
            }"
          >
            {{ age }}
          </div>
        </div>
      </div>

      <!-- Cities array -->
      <div class="flex items-center gap-2">
        <span class="text-gray-500 font-mono w-16 text-right text-sm">cities:</span>
        <div class="flex gap-1">
          <div
            v-for="(city, idx) in cities"
            :key="'city-' + idx"
            class="w-20 h-10 border-2 rounded flex items-center justify-center font-mono text-sm transition-all duration-300"
            :class="{
              'border-purple-400 bg-purple-400/20 text-purple-300 scale-110': step === idx,
              'border-gray-600 bg-gray-800/30 text-gray-500': step !== idx && step !== 3,
              'border-purple-400/50 bg-purple-400/10 text-purple-400': step === 3,
            }"
          >
            {{ city }}
          </div>
        </div>
      </div>
    </div>

    <!-- Arrow -->
    <div class="text-green-400 text-3xl">⬇</div>

    <!-- Code example -->
    <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 font-mono text-sm">
      <div class="text-gray-500">// Iterate all three together</div>
      <div>
        <span class="text-purple-400">for</span>
        <span class="text-gray-300"> (</span>
        <span class="text-blue-400">auto</span>
        <span class="text-gray-300"> [name, age, city] : </span>
        <span class="text-green-400">llvm::zip</span>
        <span class="text-gray-300">(names, ages, cities)) {</span>
      </div>
      <div class="pl-4">
        <span class="text-cyan-400">print</span>
        <span class="text-gray-300">(name, age, city);</span>
      </div>
      <div class="text-gray-300">}</div>
    </div>

    <!-- Current tuple output -->
    <div
      v-if="step < 3"
      class="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700"
    >
      <span class="text-gray-400">tuple:</span>
      <span class="text-green-300 font-mono">(</span>
      <span class="text-green-300 font-mono">"{{ names[step] }}"</span>
      <span class="text-gray-500">,</span>
      <span class="text-blue-300 font-mono">{{ ages[step] }}</span>
      <span class="text-gray-500">,</span>
      <span class="text-purple-300 font-mono">"{{ cities[step] }}"</span>
      <span class="text-green-300 font-mono">)</span>
    </div>
    <div v-else class="text-gray-400 italic">All elements visited in parallel ✓</div>
  </div>
</template>

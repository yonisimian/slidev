<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const animations = [
    { buckets: [{}, {}, {}, {}, {}, {}, {}, {}], action: 'Empty map' },
    {
      buckets: [{}, { k: 'A', v: '1' }, {}, {}, {}, {}, {}, {}],
      action: 'insert(A,1) → hash(A)=1',
    },
    {
      buckets: [{}, { k: 'A', v: '1' }, {}, {}, {}, { k: 'B', v: '2' }, {}, {}],
      action: 'insert(B,2) → hash(B)=5',
    },
    {
      buckets: [
        {},
        { k: 'A', v: '1' },
        { k: 'C', v: '3', probe: true },
        {},
        {},
        { k: 'B', v: '2' },
        {},
        {},
      ],
      action: 'insert(C,3) → hash(C)=1, probe→2',
    },
    {
      buckets: [
        {},
        { k: 'A', v: '1' },
        { k: 'C', v: '3' },
        { k: 'D', v: '4', probe: true },
        {},
        { k: 'B', v: '2' },
        {},
        {},
      ],
      action: 'insert(D,4) → hash(D)=1, probe→3',
    },
    {
      buckets: [
        {},
        { tomb: true },
        { k: 'C', v: '3' },
        { k: 'D', v: '4' },
        {},
        { k: 'B', v: '2' },
        {},
        {},
      ],
      action: 'erase(A) → tombstone at [1]',
    },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % animations.length
    }, 2000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const getBucket = (index) => animations[phase.value].buckets[index] || {}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-orange-400 mb-4">DenseMap — Quadratic Probing in Action</div>

    <!-- Bucket Array -->
    <div class="flex gap-1 mb-4">
      <div
        v-for="i in 8"
        :key="i"
        class="w-16 h-14 border-2 rounded flex flex-col items-center justify-center transition-all duration-300"
        :class="{
          'border-gray-600 bg-gray-800/30': !getBucket(i - 1).k && !getBucket(i - 1).tomb,
          'border-orange-400 bg-orange-400/20': getBucket(i - 1).k && !getBucket(i - 1).probe,
          'border-yellow-400 bg-yellow-400/20': getBucket(i - 1).probe,
          'border-red-400 bg-red-400/20': getBucket(i - 1).tomb,
        }"
      >
        <span class="text-xs text-gray-500">[{{ i - 1 }}]</span>
        <span
          v-if="getBucket(i - 1).k"
          class="text-xs font-mono"
          :class="getBucket(i - 1).probe ? 'text-yellow-300' : 'text-orange-300'"
        >
          {{ getBucket(i - 1).k }}:{{ getBucket(i - 1).v }}
        </span>
        <span v-else-if="getBucket(i - 1).tomb" class="text-red-400 text-xs">†</span>
      </div>
    </div>

    <!-- Current action -->
    <div
      class="h-6 text-sm font-mono transition-all duration-300"
      :class="{
        'text-orange-400':
          !animations[phase].action.includes('erase') &&
          !animations[phase].action.includes('probe'),
        'text-yellow-400': animations[phase].action.includes('probe'),
        'text-red-400': animations[phase].action.includes('erase'),
      }"
    >
      {{ animations[phase].action }}
    </div>

    <!-- Legend -->
    <div class="mt-4 flex gap-4 text-xs">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 border border-orange-400 bg-orange-400/20 rounded"></div>
        <span class="text-gray-400">Direct</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 border border-yellow-400 bg-yellow-400/20 rounded"></div>
        <span class="text-gray-400">Probed</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 border border-red-400 bg-red-400/20 rounded"></div>
        <span class="text-gray-400">Tombstone</span>
      </div>
    </div>

    <!-- Phase indicator -->
    <div class="mt-4 flex gap-1">
      <div
        v-for="i in animations.length"
        :key="i"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="phase === i - 1 ? 'bg-orange-400' : 'bg-gray-600'"
      />
    </div>
  </div>
</template>

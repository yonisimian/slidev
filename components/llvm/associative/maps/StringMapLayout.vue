<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const animations = [
    { entries: [], action: 'Empty StringMap', lookup: null },
    { entries: [{ k: 'main', v: '0', slot: 1 }], action: 'insert("main",0)', lookup: null },
    {
      entries: [
        { k: 'main', v: '0', slot: 1 },
        { k: 'printf', v: '1', slot: 3 },
      ],
      action: 'insert("printf",1)',
      lookup: null,
    },
    {
      entries: [
        { k: 'main', v: '0', slot: 1 },
        { k: 'printf', v: '1', slot: 3 },
        { k: 'exit', v: '2', slot: 5 },
      ],
      action: 'insert("exit",2)',
      lookup: null,
    },
    {
      entries: [
        { k: 'main', v: '0', slot: 1 },
        { k: 'printf', v: '1', slot: 3, highlight: true },
        { k: 'exit', v: '2', slot: 5 },
      ],
      action: 'find("printf") → 1',
      lookup: 'printf',
    },
    {
      entries: [
        { k: 'main', v: '0', slot: 1 },
        { k: 'printf', v: '1', slot: 3 },
        { k: 'exit', v: '2', slot: 5 },
      ],
      action: 'String stored inline with value!',
      lookup: null,
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

  const current = () => animations[phase.value]
  const getSlot = (idx) => current().entries.find((e) => e.slot === idx)
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-emerald-400 mb-4">
      StringMap — Keys Stored Inline with Values
    </div>

    <!-- Hash Table -->
    <div class="flex gap-1 mb-4">
      <div
        v-for="i in 6"
        :key="i"
        class="border-2 rounded transition-all duration-300 flex items-center justify-center"
        :class="{
          'border-gray-600 bg-gray-800/30 w-12 h-10': !getSlot(i),
          'border-emerald-400 bg-emerald-400/20 px-2 h-10': getSlot(i) && !getSlot(i).highlight,
          'border-yellow-400 bg-yellow-400/20 px-2 h-10': getSlot(i)?.highlight,
        }"
        :style="getSlot(i) ? { minWidth: getSlot(i).k.length * 8 + 50 + 'px' } : {}"
      >
        <span
          v-if="getSlot(i)"
          class="text-xs font-mono"
          :class="getSlot(i).highlight ? 'text-yellow-300' : 'text-emerald-300'"
        >
          "{{ getSlot(i).k }}"→{{ getSlot(i).v }}
        </span>
      </div>
    </div>

    <!-- Entry layout detail -->
    <div class="mt-4 flex flex-col items-center">
      <div class="text-sm text-gray-400 mb-2">Entry Layout (single allocation)</div>
      <div class="flex border-2 border-emerald-400 rounded overflow-hidden">
        <div class="px-2 py-1 bg-blue-400/20 border-r border-emerald-400">
          <div class="text-xs text-blue-300 text-center">hash</div>
        </div>
        <div class="px-2 py-1 bg-purple-400/20 border-r border-emerald-400">
          <div class="text-xs text-purple-300 text-center">len</div>
        </div>
        <div class="px-3 py-1 bg-emerald-400/20 border-r border-emerald-400">
          <div class="text-xs text-emerald-300 text-center">key bytes</div>
        </div>
        <div class="px-2 py-1 bg-orange-400/20">
          <div class="text-xs text-orange-300 text-center">value</div>
        </div>
      </div>
    </div>

    <!-- Current action -->
    <div
      class="mt-4 h-6 text-sm font-mono transition-all duration-300"
      :class="current().lookup ? 'text-yellow-400' : 'text-emerald-400'"
    >
      {{ current().action }}
    </div>

    <!-- Phase indicator -->
    <div class="mt-3 flex gap-1">
      <div
        v-for="i in animations.length"
        :key="i"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="phase === i - 1 ? 'bg-emerald-400' : 'bg-gray-600'"
      />
    </div>
  </div>
</template>

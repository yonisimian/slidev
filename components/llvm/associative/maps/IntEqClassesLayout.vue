<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  // Each phase shows: which nodes are in which class, arrows for join operations
  const animations = [
    { classes: [[0], [1], [2], [3], [4], [5]], join: null, action: 'Individual elements 0-5' },
    { classes: [[0], [1], [2], [3], [4], [5]], join: [1, 2], action: 'join(1, 2)...' },
    { classes: [[0], [1, 2], [3], [4], [5]], join: null, action: '1 and 2 now in same class' },
    { classes: [[0], [1, 2], [3], [4], [5]], join: [1, 4], action: 'join(1, 4)...' },
    { classes: [[0], [1, 2, 4], [3], [5]], join: null, action: '4 joins class of 1,2' },
    { classes: [[0], [1, 2, 4], [3], [5]], join: [3, 5], action: 'join(3, 5)...' },
    { classes: [[0], [1, 2, 4], [3, 5]], join: null, action: '3 and 5 form new class' },
    {
      classes: [[0], [1, 2, 4], [3, 5]],
      join: null,
      action: 'compress() → 3 equivalence classes!',
    },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % animations.length
    }, 1600)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const current = () => animations[phase.value]

  const colors = ['cyan', 'orange', 'green', 'pink', 'yellow', 'purple']

  const getNodeClass = (id) => {
    const cls = current().classes
    for (let i = 0; i < cls.length; i++) {
      if (cls[i].includes(id)) return i
    }
    return 0
  }

  const getNodeColor = (id) => {
    const c = colors[getNodeClass(id) % colors.length]
    const isJoining = current().join && current().join.includes(id)
    if (isJoining) return 'border-white bg-white/20 scale-110'
    return `border-${c}-400 bg-${c}-400/20`
  }

  const getTextColor = (id) => {
    const c = colors[getNodeClass(id) % colors.length]
    return `text-${c}-300`
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-yellow-400 mb-4">IntEqClasses — Union-Find</div>

    <!-- Visual elements -->
    <div class="flex gap-3 mb-4">
      <div
        v-for="i in 6"
        :key="i"
        class="w-10 h-10 border-2 rounded-full flex items-center justify-center transition-all duration-400"
        :class="{
          'border-cyan-400 bg-cyan-400/20':
            getNodeClass(i - 1) === 0 && !current().join?.includes(i - 1),
          'border-orange-400 bg-orange-400/20':
            getNodeClass(i - 1) === 1 && !current().join?.includes(i - 1),
          'border-green-400 bg-green-400/20':
            getNodeClass(i - 1) === 2 && !current().join?.includes(i - 1),
          'border-white bg-white/30 scale-110': current().join?.includes(i - 1),
        }"
      >
        <span
          class="font-mono text-sm transition-all duration-400"
          :class="{
            'text-cyan-300': getNodeClass(i - 1) === 0,
            'text-orange-300': getNodeClass(i - 1) === 1,
            'text-green-300': getNodeClass(i - 1) === 2,
            'text-white': current().join?.includes(i - 1),
          }"
          >{{ i - 1 }}</span
        >
      </div>
    </div>

    <!-- Join arrow visualization -->
    <div
      v-if="current().join"
      class="flex items-center gap-2 px-4 py-2 border border-yellow-400/50 bg-yellow-400/10 rounded-lg mb-4"
    >
      <span class="text-white font-mono">{{ current().join[0] }}</span>
      <span class="text-yellow-400">⟷</span>
      <span class="text-white font-mono">{{ current().join[1] }}</span>
    </div>

    <!-- Equivalence classes summary -->
    <div class="flex gap-4 mb-4">
      <div
        v-for="(cls, idx) in current().classes.filter((c) => c.length > 0)"
        :key="idx"
        class="flex items-center gap-1 px-2 py-1 rounded transition-all duration-300"
        :class="{
          'border border-cyan-400/50 bg-cyan-400/10': idx === 0,
          'border border-orange-400/50 bg-orange-400/10': idx === 1,
          'border border-green-400/50 bg-green-400/10': idx === 2,
        }"
      >
        <span
          class="text-xs font-mono"
          :class="{
            'text-cyan-300': idx === 0,
            'text-orange-300': idx === 1,
            'text-green-300': idx === 2,
          }"
          >{ {{ cls.join(', ') }} }</span
        >
      </div>
    </div>

    <!-- Current action -->
    <div
      class="h-6 text-sm font-mono transition-all duration-300"
      :class="{
        'text-gray-400': current().action.includes('Individual'),
        'text-yellow-400': current().action.includes('join'),
        'text-blue-400':
          current().action.includes('same class') || current().action.includes('joins'),
        'text-green-400':
          current().action.includes('compress') || current().action.includes('form'),
      }"
    >
      {{ current().action }}
    </div>
  </div>
</template>

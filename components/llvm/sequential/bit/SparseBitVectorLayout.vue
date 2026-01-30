<script setup>
  import { ref, onMounted } from 'vue'

  // Sparse representation - only store elements that have bits
  const step = ref(0)
  const elements = ref([
    { start: 0, bits: [5, 12, 45] },
    { start: 1024, bits: [1030, 1055] },
  ])

  // Animation sequence
  const animations = [
    {
      elements: [
        { start: 0, bits: [5, 12, 45] },
        { start: 1024, bits: [1030, 1055] },
      ],
      label: 'Two elements: bits 0-127 and 1024-1151',
    },
    {
      elements: [
        { start: 0, bits: [5, 12, 45, 100] },
        { start: 1024, bits: [1030, 1055] },
      ],
      label: 'set(100) — same element',
    },
    {
      elements: [
        { start: 0, bits: [5, 12, 45, 100] },
        { start: 1024, bits: [1030, 1055] },
        { start: 5000, bits: [5000, 5042] },
      ],
      label: 'set(5000), set(5042) — new element allocated',
    },
    {
      elements: [
        { start: 0, bits: [5, 12, 45] },
        { start: 1024, bits: [1030, 1055] },
      ],
      label: 'Back to initial',
    },
  ]

  const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    elements.value = animations[step.value].elements
  }

  onMounted(() => {
    setTimeout(() => {
      setInterval(animateNext, 2500)
    }, 1500)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-6 mt-4">
    <!-- SparseBitVector code block -->
    <div class="flex items-start gap-6 pl-24">
      <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <pre
          class="px-4 py-3 font-mono text-sm leading-relaxed"
        ><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">unsigned</span> <span class="text-[#9cdcfe]">ElementSize</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#b5cea8]">128</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">SparseBitVector</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#4ec9b0]">ilist</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">SparseBitVectorElement</span><span class="text-[#d4d4d4]">&gt;</span> <span class="text-[#9cdcfe]">Elements</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">};</span></pre>
      </div>
      <div class="text-gray-500 text-sm mt-2">← Linked list of 128-bit chunks</div>
    </div>

    <!-- Operation label -->
    <div class="text-purple-400 font-mono text-lg h-6">
      {{ animations[step].label }}
    </div>

    <!-- Sparse elements visualization -->
    <div class="flex flex-col gap-3 items-start">
      <div
        v-for="(el, idx) in elements"
        :key="idx"
        class="flex items-center gap-3 transition-all duration-500"
      >
        <!-- Element header -->
        <div
          class="bg-purple-900/50 rounded px-2 py-1 border border-purple-500 text-purple-300 font-mono text-xs min-w-[80px] text-center"
        >
          [{{ el.start }}]
        </div>

        <!-- Arrow -->
        <div class="text-purple-400">→</div>

        <!-- Element bits visualization -->
        <div class="bg-gray-800 rounded-lg p-2 border border-gray-600 flex gap-1">
          <!-- Show sparse bits within element -->
          <div
            v-for="bit in el.bits"
            :key="bit"
            class="bg-purple-500 text-white px-2 py-1 rounded text-xs font-mono shadow-lg shadow-purple-500/30"
          >
            {{ bit }}
          </div>
        </div>

        <!-- Next link -->
        <div v-if="idx < elements.length - 1" class="text-gray-500">→</div>
      </div>
    </div>

    <!-- Memory efficiency note -->
    <div class="flex gap-8 mt-4 text-sm">
      <div class="text-gray-400">
        Elements: <span class="text-purple-400 font-bold">{{ elements.length }}</span>
      </div>
      <div class="text-gray-400">
        Total bits set:
        <span class="text-purple-400 font-bold">{{
          elements.reduce((sum, el) => sum + el.bits.length, 0)
        }}</span>
      </div>
      <div class="text-gray-400">
        Universe size: <span class="text-purple-400 font-bold">∞</span> (unbounded)
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const bitNum = 2
  const numElements = 8
  const totalBits = bitNum * numElements

  // Animation state
  const step = ref(0)
  const values = ref([0, 0, 0, 0, 0, 0, 0, 0])
  const highlightedElement = ref(null)

  // Animation sequence
  const animations = [
    {
      values: [0, 0, 0, 0, 0, 0, 0, 0],
      highlighted: null,
      message: 'PackedVector<unsigned, 2> — 8 elements × 2 bits = 16 bits total',
    },
    { values: [3, 0, 0, 0, 0, 0, 0, 0], highlighted: 0, message: 'vec[0] = 3 (binary: 11)' },
    { values: [3, 1, 0, 0, 0, 0, 0, 0], highlighted: 1, message: 'vec[1] = 1 (binary: 01)' },
    { values: [3, 1, 0, 2, 0, 0, 0, 0], highlighted: 3, message: 'vec[3] = 2 (binary: 10)' },
    { values: [3, 1, 0, 2, 0, 0, 0, 1], highlighted: 7, message: 'vec[7] = 1 (binary: 01)' },
    {
      values: [3, 1, 0, 2, 0, 0, 0, 1],
      highlighted: null,
      message: 'All values packed into just 16 bits!',
    },
  ]

  let interval = null

  const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    const anim = animations[step.value]
    values.value = [...anim.values]
    highlightedElement.value = anim.highlighted
  }

  onMounted(() => {
    setTimeout(() => {
      interval = setInterval(animateNext, 2000)
    }, 1500)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  // Convert value to binary string with padding
  const toBinary = (val, bits) => val.toString(2).padStart(bits, '0')

  // Get bits for a specific element
  const getBitsForElement = (idx) => {
    return toBinary(values.value[idx], bitNum)
  }

  // Get all bits as a continuous string
  const getAllBits = () => {
    return values.value.map((v) => toBinary(v, bitNum)).join('')
  }
</script>

<template>
  <div class="flex flex-col items-center gap-4 mt-4">
    <!-- PackedVector code block -->
    <div class="flex items-start gap-6">
      <div class="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <pre
          class="px-4 py-3 font-mono text-sm leading-relaxed"
        ><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">T</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#569cd6]">unsigned</span> <span class="text-[#9cdcfe]">BitNum</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">PackedVector</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#4ec9b0]">BitVector</span> <span class="text-[#9cdcfe]">Bits</span><span class="text-[#d4d4d4]">;</span> <span class="text-[#6a9955]">// {{ totalBits }} bits for {{ numElements }} elements</span>
<span class="text-[#d4d4d4]">};</span> <span class="text-[#6a9955]">// Each element uses exactly BitNum bits!</span></pre>
      </div>
    </div>

    <!-- Logical view: Elements -->
    <div class="flex flex-col items-center">
      <div class="text-gray-400 text-sm mb-2 font-semibold">
        Logical View ({{ numElements }} elements)
      </div>
      <div class="flex gap-1">
        <div v-for="(val, idx) in values" :key="'elem-' + idx" class="flex flex-col items-center">
          <div class="text-xs text-gray-500 mb-1 font-mono">[{{ idx }}]</div>
          <div
            class="w-10 h-10 flex items-center justify-center font-mono text-lg border-2 rounded transition-all duration-300"
            :class="[
              highlightedElement === idx
                ? 'bg-orange-600 border-orange-400 text-white scale-110 shadow-lg'
                : 'bg-gray-800 border-gray-600 text-gray-300',
            ]"
          >
            {{ val }}
          </div>
        </div>
      </div>
    </div>

    <!-- Arrow -->
    <div class="text-gray-500 text-xl">↓ packed as</div>

    <!-- Physical view: BitVector -->
    <div class="flex flex-col items-center">
      <div class="text-gray-400 text-sm mb-2 font-semibold">
        Physical Storage (BitVector — {{ totalBits }} bits)
      </div>
      <div class="flex">
        <div
          v-for="(val, idx) in values"
          :key="'bits-' + idx"
          class="flex border-r-2 last:border-r-0 transition-all duration-300"
          :class="[highlightedElement === idx ? 'border-orange-400' : 'border-gray-600']"
        >
          <div
            v-for="(bit, bitIdx) in getBitsForElement(idx).split('')"
            :key="'bit-' + idx + '-' + bitIdx"
            class="w-6 h-8 flex items-center justify-center font-mono text-sm transition-all duration-300"
            :class="[
              highlightedElement === idx
                ? bit === '1'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-800 text-orange-200'
                : bit === '1'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-800 text-gray-500',
            ]"
          >
            {{ bit }}
          </div>
        </div>
      </div>
      <div class="flex mt-1">
        <div
          v-for="idx in numElements"
          :key="'label-' + idx"
          class="text-xs font-mono transition-all duration-300"
          :class="highlightedElement === idx - 1 ? 'text-orange-400' : 'text-gray-600'"
          :style="{ width: bitNum * 24 + 'px', textAlign: 'center' }"
        >
          {{ bitNum }} bits
        </div>
      </div>
    </div>

    <!-- Status message -->
    <div class="mt-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-600">
      <span class="text-gray-300 font-mono text-sm">
        {{ animations[step].message }}
      </span>
    </div>
  </div>
</template>

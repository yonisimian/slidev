<script setup>
import { ref, computed, onMounted } from 'vue'

const smallSize = 16
const largeSize = 32
const cellWidth = 24

// Animation state
const step = ref(0)
const isSmallMode = ref(true)
const activeBits = ref([3, 7, 12])

// Animation sequence
const animations = [
    { small: true, bits: [3, 7, 12], label: 'Inline mode (16 bits)' },
    { small: true, bits: [3, 7, 12, 1, 15], label: 'set(1), set(15)' },
    { small: false, bits: [3, 7, 12, 1, 15, 20, 28], label: 'resize(32) → heap mode' },
    { small: false, bits: [3, 7, 12, 1, 15, 20, 28, 31], label: 'set(31)' },
    { small: true, bits: [3, 7, 12], label: 'Back to inline' },
]

const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    isSmallMode.value = animations[step.value].small
    activeBits.value = animations[step.value].bits
}

onMounted(() => {
    setTimeout(() => {
        setInterval(animateNext, 2500)
    }, 1500)
})

const currentSize = computed(() => isSmallMode.value ? smallSize : largeSize)
const isBitSet = (idx) => activeBits.value.includes(idx)
</script>

<template>
    <div class="flex flex-col items-center gap-6 mt-4">
        <!-- SmallBitVector code block -->
        <div class="flex items-start gap-6 pl-24">
            <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <pre class="px-4 py-3 font-mono text-sm leading-relaxed"><span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">SmallBitVector</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#569cd6]">uintptr_t</span> <span class="text-[#9cdcfe]">X</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#b5cea8]">1</span><span class="text-[#d4d4d4]">;</span>  <span class="text-[#6a9955]">// Bits OR pointer</span>
<span class="text-[#d4d4d4]">};</span></pre>
            </div>
            <div class="text-gray-500 text-sm mt-2">← Just 8 bytes always!</div>
        </div>

        <!-- Mode indicator -->
        <div class="flex gap-4 items-center">
            <div class="px-4 py-2 rounded-full font-bold transition-all duration-500" :class="isSmallMode
                ? 'bg-green-500/20 text-green-400 border-2 border-green-500'
                : 'bg-gray-700 text-gray-500 border-2 border-gray-600'">
                Inline Mode
            </div>
            <div class="text-gray-500">⟷</div>
            <div class="px-4 py-2 rounded-full font-bold transition-all duration-500" :class="!isSmallMode
                ? 'bg-purple-500/20 text-purple-400 border-2 border-purple-500'
                : 'bg-gray-700 text-gray-500 border-2 border-gray-600'">
                Heap Mode
            </div>
        </div>

        <!-- Operation label -->
        <div class="text-purple-400 font-mono text-lg h-6">
            {{ animations[step].label }}
        </div>

        <!-- Bit array visualization -->
        <div class="relative w-full flex justify-center">
            <div class="grid grid-cols-16 justify-center gap-4" :style="{ maxWidth: (cellWidth * 16 + 16) + 'px' }">
                <div v-for="idx in currentSize" :key="idx - 1">
                    <!-- Bit value -->
                    <div class="font-mono text-xs text-center rounded transition-all duration-300" :class="isBitSet(idx - 1)
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                        : 'bg-gray-700 text-gray-400'"
                        :style="{ width: cellWidth + 'px', height: cellWidth + 'px', lineHeight: cellWidth + 'px' }">
                        {{ isBitSet(idx - 1) ? '1' : '0' }}
                    </div>
                    <!-- Index labels -->
                    <div class="font-mono text-xs text-center text-gray-500" :style="{ width: cellWidth + 'px' }">
                        {{ idx - 1 }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Storage diagram -->
        <!-- <div class="flex items-center gap-4 mt-4">
            <div class="text-gray-400 text-sm">Storage:</div>
            <div class="flex items-center gap-2 transition-all duration-500">
                <div class="bg-gray-800 px-4 py-2 rounded border"
                    :class="isSmallMode ? 'border-green-500' : 'border-purple-500'">
                    <span class="font-mono text-sm" :class="isSmallMode ? 'text-green-400' : 'text-purple-400'">
                        {{ isSmallMode ? 'X = bits (inline)' : 'X = ptr → heap' }}
                    </span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const totalBits = 32
const cellWidth = 26

// Animation state
const step = ref(0)
const activeBits = ref([5, 12, 20, 28])

// Animation sequence - showing set operations
const animations = [
    { bits: [5, 12, 20, 28], label: 'Initial state' },
    { bits: [5, 12, 20, 28, 7], label: 'set(7)' },
    { bits: [5, 7, 20, 28], label: 'reset(12)' },
    { bits: [5, 7, 20, 28, 0, 31], label: 'set(0), set(31)' },
    { bits: [5, 12, 20, 28], label: 'Back to initial' },
]

const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    activeBits.value = animations[step.value].bits
}

onMounted(() => {
    setTimeout(() => {
        setInterval(animateNext, 2000)
    }, 1500)
})

const isBitSet = (idx) => activeBits.value.includes(idx)
const countSet = computed(() => activeBits.value.length)
</script>

<template>
    <div class="flex flex-col items-center gap-6 mt-4">
        <!-- BitVector code block -->
        <div class="flex items-start gap-6 pl-32">
            <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <pre class="px-4 py-3 font-mono text-sm leading-relaxed"><span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">BitVector</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#4ec9b0]">MutableArrayRef</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">BitWord</span><span class="text-[#d4d4d4]">&gt;</span> <span class="text-[#9cdcfe]">Bits</span><span class="text-[#d4d4d4]">;</span>  <span class="text-[#6a9955]">// 64-bit words</span>
    <span class="text-[#4ec9b0]">unsigned</span> <span class="text-[#9cdcfe]">Size</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#b5cea8]">{{ totalBits }}</span><span class="text-[#d4d4d4]">;</span>       <span class="text-[#6a9955]">// bit count</span>
<span class="text-[#d4d4d4]">};</span></pre>
            </div>
            <div class="text-gray-500 text-sm mt-2">← Dynamic allocation</div>
        </div>

        <!-- Operation indicator -->
        <div class="text-purple-400 font-mono text-lg h-8">
            {{ animations[step].label }}
        </div>

        <!-- Bit array visualization -->
        <div class="relative w-full flex justify-center">
            <div class="flex flex-wrap justify-center gap-1" :style="{ maxWidth: (cellWidth * 16 + 16) + 'px' }">
                <div v-for="idx in totalBits" :key="idx - 1"
                    class="font-mono text-xs text-center rounded transition-all duration-300" :class="isBitSet(idx - 1)
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                        : 'bg-gray-700 text-gray-400'"
                    :style="{ width: cellWidth + 'px', height: cellWidth + 'px', lineHeight: cellWidth + 'px' }">
                    {{ isBitSet(idx - 1) ? '1' : '0' }}
                </div>
            </div>
        </div>

        <!-- Index labels row -->
        <div class="flex flex-wrap justify-center gap-1" :style="{ maxWidth: (cellWidth * 16 + 16) + 'px' }">
            <div v-for="idx in totalBits" :key="'label-' + (idx - 1)"
                class="font-mono text-xs text-center text-gray-500" :style="{ width: cellWidth + 'px' }">
                {{ idx - 1 }}
            </div>
        </div>

        <!-- Stats -->
        <div class="flex gap-8 text-sm">
            <div class="text-gray-400">
                Size: <span class="text-purple-400 font-bold">{{ totalBits }}</span> bits
            </div>
            <div class="text-gray-400">
                Set: <span class="text-purple-400 font-bold">{{ countSet }}</span> bits
            </div>
            <div class="text-gray-400">
                Words: <span class="text-purple-400 font-bold">{{ Math.ceil(totalBits / 64) }}</span>
            </div>
        </div>
    </div>
</template>

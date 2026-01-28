<script setup>
import { ref, onMounted, computed } from 'vue'

const step = ref(0)
const intervals = ref([
    { start: 0, end: 15 },
    { start: 50, end: 65 },
    { start: 100, end: 120 },
])

// Animation sequence - showing coalescing
const animations = [
    {
        intervals: [
            { start: 0, end: 15 },
            { start: 50, end: 65 },
            { start: 100, end: 120 },
        ],
        label: 'Three intervals'
    },
    {
        intervals: [
            { start: 0, end: 15 },
            { start: 50, end: 75 },
            { start: 100, end: 120 },
        ],
        label: 'Extend [50,65] → [50,75]'
    },
    {
        intervals: [
            { start: 0, end: 15 },
            { start: 50, end: 120 },
        ],
        label: 'Coalesce! [50,75] + [100,120] → [50,120]'
    },
    {
        intervals: [
            { start: 0, end: 120 },
        ],
        label: 'Full coalesce → single interval!'
    },
    {
        intervals: [
            { start: 0, end: 15 },
            { start: 50, end: 65 },
            { start: 100, end: 120 },
        ],
        label: 'Back to initial'
    },
]

const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    intervals.value = animations[step.value].intervals
}

onMounted(() => {
    setTimeout(() => {
        setInterval(animateNext, 2500)
    }, 1500)
})

const totalBits = computed(() =>
    intervals.value.reduce((sum, iv) => sum + (iv.end - iv.start + 1), 0)
)
</script>

<template>
    <div class="flex flex-col items-center gap-6 mt-4">
        <!-- CoalescingBitVector code block -->
        <div class="flex items-start gap-6 pl-16">
            <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <pre class="px-4 py-3 font-mono text-sm leading-relaxed"><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">IndexT</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">CoalescingBitVector</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#4ec9b0]">IntervalMap</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">IndexT</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#569cd6]">char</span><span class="text-[#d4d4d4]">&gt;</span> <span class="text-[#9cdcfe]">Intervals</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">};</span></pre>
            </div>
            <div class="text-gray-500 text-sm mt-2">← Stores intervals, not bits</div>
        </div>

        <!-- Operation label -->
        <div class="text-purple-400 font-mono text-lg h-6">
            {{ animations[step].label }}
        </div>

        <!-- Timeline visualization -->
        <div class="relative w-full max-w-2xl">
            <!-- Timeline bar -->
            <div class="h-12 bg-gray-800 rounded-lg border border-gray-600 relative overflow-hidden">
                <!-- Intervals -->
                <div v-for="(iv, idx) in intervals" :key="idx"
                    class="absolute h-full bg-purple-500/80 border-x-2 border-purple-300 transition-all duration-700 ease-in-out flex items-center justify-center"
                    :style="{
                        left: (iv.start / 130 * 100) + '%',
                        width: ((iv.end - iv.start + 1) / 130 * 100) + '%'
                    }">
                    <span class="text-white font-mono text-xs font-bold">
                        [{{ iv.start }}, {{ iv.end }}]
                    </span>
                </div>
            </div>

            <!-- Axis labels -->
            <div class="flex justify-between mt-1 text-gray-500 text-xs font-mono">
                <span>0</span>
                <span>32</span>
                <span>64</span>
                <span>96</span>
                <span>128</span>
            </div>
        </div>

        <!-- Stats -->
        <div class="flex gap-8 mt-4 text-sm">
            <div class="text-gray-400">
                Intervals: <span class="text-purple-400 font-bold">{{ intervals.length }}</span>
            </div>
            <div class="text-gray-400">
                Total bits: <span class="text-purple-400 font-bold">{{ totalBits }}</span>
            </div>
            <div class="text-gray-400">
                find() complexity: <span class="text-purple-400 font-bold">O(log {{ intervals.length }})</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const arrayData = [10, 20, 30, 40, 50, 69, 70, 80, 90, 100, 110, 120]
const cellWidth = 70 // px per cell

// Animation state
const step = ref(0)
const dataIndex = ref(2)
const len = ref(4)

// Computed positions
const dataArrowX = computed(() => dataIndex.value * cellWidth + cellWidth / 2)
const lenArrowX = computed(() => (dataIndex.value + len.value - 1) * cellWidth + cellWidth / 2)
const overlayLeft = computed(() => dataIndex.value * cellWidth)
const overlayWidth = computed(() => len.value * cellWidth + 2)

// Animation sequence
const animations = [
    { data: 2, len: 4 },   // Initial: viewing elements 2-5
    { data: 2, len: 6 },   // Expand len to 6
    { data: 4, len: 6 },   // Move data to index 4
    { data: 4, len: 3 },   // Shrink len to 3
    { data: 0, len: 5 },   // Move to beginning
    { data: 2, len: 4 },   // Back to initial
]

const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    dataIndex.value = animations[step.value].data
    len.value = animations[step.value].len
}

onMounted(() => {
    // Start animation cycle after initial delay
    setTimeout(() => {
        setInterval(animateNext, 2000)
    }, 1500)
})
</script>

<template>
    <div class="flex flex-col items-center gap-6 mt-4">
        <!-- ArrayRef code block -->
        <div class="flex items-start gap-6 pl-32">
            <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <pre class="px-4 py-3 font-mono text-sm leading-relaxed"><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">T</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">ArrayRef</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#569cd6]">const</span> <span class="text-[#4ec9b0]">T</span> <span class="text-[#d4d4d4]">*</span><span class="text-[#9cdcfe]">data</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#b5cea8]">{{ dataIndex }}</span><span class="text-[#d4d4d4]">;</span>
    <span class="text-[#4ec9b0]">size_t</span> <span class="text-[#9cdcfe]">len</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#b5cea8]">{{ len }}</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">};</span></pre>
            </div>
            <div class="text-gray-500 text-sm mt-2">← Just 16 bytes!</div>
        </div>

        <!-- Arrows with labels -->
        <div class="relative w-full flex justify-center mt-8 -mb-12">
            <div class="relative" :style="{ width: arrayData.length * cellWidth + 'px', height: '80px' }">
                <!-- data arrow -->
                <div class="absolute flex flex-col items-center transition-all duration-700 ease-in-out"
                    :style="{ left: dataArrowX + 'px', transform: 'translateX(-50%)' }">
                    <div class="bg-blue-500 text-white px-3 py-1 rounded font-mono text-sm font-bold shadow-lg">
                        data
                    </div>
                    <div class="text-blue-400 text-4xl leading-none">↓</div>
                </div>

                <!-- len arrow (points to last element in view) -->
                <div class="absolute flex flex-col items-center transition-all duration-700 ease-in-out"
                    :style="{ left: lenArrowX + 'px', transform: 'translateX(-50%)' }">
                    <div class="bg-blue-500 text-white px-3 py-1 rounded font-mono text-sm font-bold shadow-lg">
                        data + len - 1
                    </div>
                    <div class="text-blue-400 text-4xl leading-none">↓</div>
                </div>
            </div>
        </div>

        <!-- The actual data array with overlay -->
        <div class="relative w-full flex justify-center">
            <div class="relative">
                <!-- Array elements -->
                <div class="flex border-2 border-green-400 rounded overflow-hidden">
                    <div v-for="(val, idx) in arrayData" :key="idx"
                        class="text-white font-mono text-center border-r border-green-400 last:border-r-0 bg-green-800"
                        :style="{ width: cellWidth + 'px', padding: '12px 0' }">
                        {{ val }}
                    </div>
                </div>

                <!-- Semi-transparent overlay for viewed elements -->
                <div class="absolute top-0 h-full bg-blue-400/40 border-2 border-blue-400 rounded transition-all duration-700 ease-in-out pointer-events-none"
                    :style="{
                        left: overlayLeft + 'px',
                        width: overlayWidth + 'px'
                    }"></div>
            </div>
        </div>

        <!-- Index labels -->
        <div class="relative w-full flex justify-center">
            <div class="flex">
                <div v-for="(val, idx) in arrayData" :key="idx" class="text-gray-500 font-mono text-xs text-center"
                    :style="{ width: cellWidth + 'px' }">
                    [{{ idx }}]
                </div>
            </div>
        </div>
    </div>
</template>

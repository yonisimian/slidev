<script setup>
import { ref, computed, onMounted } from 'vue'

const arrayData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
const cellWidth = 70 // px per cell

// Animation state
const step = ref(0)
const ptrIndex = ref(2)
const len = ref(4)

// Computed positions
const ptrArrowX = computed(() => ptrIndex.value * cellWidth + cellWidth / 2)
const lenArrowX = computed(() => (ptrIndex.value + len.value - 1) * cellWidth + cellWidth / 2)
const overlayLeft = computed(() => ptrIndex.value * cellWidth)
const overlayWidth = computed(() => len.value * cellWidth + 2)

// Animation sequence
const animations = [
    { ptr: 2, len: 4 },   // Initial: viewing elements 2-5
    { ptr: 2, len: 6 },   // Expand len to 6
    { ptr: 4, len: 6 },   // Move ptr to index 4
    { ptr: 4, len: 3 },   // Shrink len to 3
    { ptr: 0, len: 5 },   // Move to beginning
    { ptr: 2, len: 4 },   // Back to initial
]

const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    ptrIndex.value = animations[step.value].ptr
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
        <!-- ArrayRef structure label -->
        <div class="flex items-center gap-2">
            <div class="flex border-2 border-blue-400 rounded overflow-hidden">
                <div class="bg-blue-500 px-5 py-3 text-white font-mono font-bold">
                    ptr = {{ ptrIndex }}
                </div>
                <div class="bg-blue-600 px-5 py-3 text-white font-mono font-bold">
                    len = {{ len }}
                </div>
            </div>
            <div class="text-gray-400 text-sm">← Just 2 words!</div>
        </div>

        <!-- Arrows with labels -->
        <div class="relative w-full flex justify-center mt-12 -mb-12">
            <div class="relative" :style="{ width: arrayData.length * cellWidth + 'px', height: '80px' }">
                <!-- ptr arrow -->
                <div class="absolute flex flex-col items-center transition-all duration-700 ease-in-out"
                    :style="{ left: ptrArrowX + 'px', transform: 'translateX(-50%)' }">
                    <div class="bg-blue-500 text-white px-3 py-1 rounded font-mono text-sm font-bold shadow-lg">
                        ptr
                    </div>
                    <div class="text-blue-400 text-4xl leading-none">↓</div>
                </div>

                <!-- len arrow (points to last element in view) -->
                <div class="absolute flex flex-col items-center transition-all duration-700 ease-in-out"
                    :style="{ left: lenArrowX + 'px', transform: 'translateX(-50%)' }">
                    <div class="bg-blue-600 text-white px-3 py-1 rounded font-mono text-sm font-bold shadow-lg">
                        ptr + len - 1
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

        <!-- Description -->
        <div class="text-gray-400 text-sm mt-2">
            ArrayRef views <span class="text-blue-300 font-bold">{{ len }}</span> elements starting at index <span
                class="text-blue-300 font-bold">{{ ptrIndex }}</span>
        </div>
    </div>
</template>

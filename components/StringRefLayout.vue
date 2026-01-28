<script setup>
import { ref, computed, onMounted } from 'vue'

const fullString = "Hello, LLVM World!"
const cellWidth = 22

const step = ref(0)
const startIdx = ref(0)
const length = ref(5)

const animations = [
    { start: 0, len: 5, label: '"Hello"' },
    { start: 7, len: 4, label: '"LLVM"' },
    { start: 0, len: 12, label: '"Hello, LLVM"' },
    { start: 13, len: 5, label: '"World"' },
    { start: 0, len: 5, label: 'Back to "Hello"' },
]

const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    startIdx.value = animations[step.value].start
    length.value = animations[step.value].len
}

onMounted(() => {
    setTimeout(() => {
        setInterval(animateNext, 2000)
    }, 1500)
})

const dataArrowX = computed(() => startIdx.value * cellWidth + cellWidth / 2)
const endArrowX = computed(() => (startIdx.value + length.value - 1) * cellWidth + cellWidth / 2)
const overlayLeft = computed(() => startIdx.value * cellWidth)
const overlayWidth = computed(() => length.value * cellWidth + 2)
</script>

<template>
    <div class="flex flex-col items-center gap-6 mt-4">
        <!-- StringRef code block -->
        <div class="flex items-start gap-6 pl-32">
            <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <pre class="px-4 py-3 font-mono text-sm leading-relaxed"><span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">StringRef</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#569cd6]">const</span> <span class="text-[#569cd6]">char</span> <span class="text-[#d4d4d4]">*</span><span class="text-[#9cdcfe]">Data</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#ce9178]">"{{ fullString.substring(startIdx, startIdx + length) }}"</span><span class="text-[#d4d4d4]">;</span>
    <span class="text-[#4ec9b0]">size_t</span> <span class="text-[#9cdcfe]">Length</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#b5cea8]">{{ length }}</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">};</span></pre>
            </div>
            <div class="text-gray-500 text-sm mt-2">← Just 16 bytes!</div>
        </div>

        <!-- Current view label -->
        <div class="text-green-400 font-mono text-lg h-6">
            {{ animations[step].label }}
        </div>

        <!-- Arrows with labels -->
        <div class="relative w-full flex justify-center -mb-10">
            <div class="relative" :style="{ width: fullString.length * cellWidth + 'px', height: '60px' }">
                <div class="absolute flex flex-col items-center transition-all duration-700 ease-in-out"
                    :style="{ left: dataArrowX + 'px', transform: 'translateX(-50%)' }">
                    <div class="bg-green-500 text-white px-2 py-0.5 rounded font-mono text-xs font-bold shadow-lg">
                        Data
                    </div>
                    <div class="text-green-400 text-2xl leading-none">↓</div>
                </div>

                <div class="absolute flex flex-col items-center transition-all duration-700 ease-in-out"
                    :style="{ left: endArrowX + 'px', transform: 'translateX(-50%)' }">
                    <div class="bg-green-500 text-white px-2 py-0.5 rounded font-mono text-xs font-bold shadow-lg">
                        +Len
                    </div>
                    <div class="text-green-400 text-2xl leading-none">↓</div>
                </div>
            </div>
        </div>

        <!-- The actual string with overlay -->
        <div class="relative w-full flex justify-center">
            <div class="relative">
                <div class="flex border-2 border-green-400 rounded overflow-hidden">
                    <div v-for="(char, idx) in fullString" :key="idx"
                        class="text-white font-mono text-center border-r border-green-400/30 last:border-r-0 bg-green-900"
                        :style="{ width: cellWidth + 'px', padding: '8px 0', fontSize: '14px' }">
                        {{ char }}
                    </div>
                </div>

                <div class="absolute top-0 h-full bg-green-400/40 border-2 border-green-400 rounded transition-all duration-700 ease-in-out pointer-events-none"
                    :style="{
                        left: overlayLeft + 'px',
                        width: overlayWidth + 'px'
                    }"></div>
            </div>
        </div>

        <!-- Features -->
        <div class="flex gap-6 mt-2 text-xs">
            <div class="text-gray-400">✓ No allocation</div>
            <div class="text-gray-400">✓ Implicit from const char*</div>
            <div class="text-gray-400">✓ Implicit from std::string</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const cellWidth = 55
const inlineCapacity = 4

// Animation state
const step = ref(0)
const elements = ref([1, 2])
const isOverflowed = ref(false)

// Animation sequence
const animations = [
    { elements: [1, 2], overflowed: false },           // Start with 2 elements
    { elements: [1, 2, 3], overflowed: false },        // Add element
    { elements: [1, 2, 3, 4], overflowed: false },     // Fill inline storage
    { elements: [1, 2, 3, 4, 5], overflowed: true },   // Overflow to heap!
    { elements: [1, 2, 3, 4, 5, 6], overflowed: true }, // More on heap
    { elements: [1, 2], overflowed: false },           // Back to start
]

let interval = null

const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    elements.value = animations[step.value].elements
    isOverflowed.value = animations[step.value].overflowed
}

onMounted(() => {
    setTimeout(() => {
        interval = setInterval(animateNext, 2000)
    }, 1500)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <div class="flex flex-col items-center gap-6 mt-4">
        <!-- SmallVector code block -->
        <div class="flex items-start gap-6">
            <div class="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <pre class="px-4 py-3 font-mono text-sm leading-relaxed"><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">T</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#569cd6]">unsigned</span> <span class="text-[#9cdcfe]">N</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">SmallVector</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#4ec9b0]">T</span> <span class="text-[#d4d4d4]">*</span><span class="text-[#9cdcfe]">ptr</span><span class="text-[#d4d4d4]">;</span>              <span class="text-[#6a9955]">// → inline or heap</span>
    <span class="text-[#4ec9b0]">size_t</span> <span class="text-[#9cdcfe]">size</span><span class="text-[#d4d4d4]">;</span>         <span class="text-[#6a9955]">// = {{ elements.length }}</span>
    <span class="text-[#4ec9b0]">size_t</span> <span class="text-[#9cdcfe]">capacity</span><span class="text-[#d4d4d4]">;</span>     <span class="text-[#6a9955]">// ≥ N</span>
    <span class="text-[#4ec9b0]">T</span> <span class="text-[#9cdcfe]">inline_storage</span><span class="text-[#d4d4d4]">[</span><span class="text-[#b5cea8]">N</span><span class="text-[#d4d4d4]">];</span> <span class="text-[#6a9955]">// N = {{ inlineCapacity }}</span>
<span class="text-[#d4d4d4]">};</span></pre>
            </div>
        </div>

        <!-- Memory visualization -->
        <div class="flex items-start gap-8 mt-4">
            <!-- Stack section -->
            <div class="flex flex-col items-center">
                <div class="text-gray-400 text-sm mb-2 font-semibold">Stack (inline storage)</div>
                <div class="flex border-2 rounded overflow-hidden transition-all duration-500"
                    :class="isOverflowed ? 'border-gray-600' : 'border-green-400'">
                    <div v-for="i in inlineCapacity" :key="'inline-' + i"
                        class="font-mono text-center border-r last:border-r-0 transition-all duration-500" :class="[
                            isOverflowed ? 'bg-gray-700 text-gray-500 border-gray-600' : 'bg-green-800 text-white border-green-400',
                            !isOverflowed && i <= elements.length ? 'opacity-100' : 'opacity-30'
                        ]" :style="{ width: cellWidth + 'px', padding: '12px 0' }">
                        {{ !isOverflowed && i <= elements.length ? elements[i - 1] : '·' }} </div>
                    </div>
                    <div class="text-xs mt-2 transition-all duration-500"
                        :class="isOverflowed ? 'text-gray-600' : 'text-green-400'">
                        {{ isOverflowed ? 'unused' : `${elements.length}/${inlineCapacity} used` }}
                    </div>
                </div>

                <!-- Arrow -->
                <div class="flex flex-col items-center justify-center h-20 transition-all duration-500"
                    :class="isOverflowed ? 'opacity-100' : 'opacity-30'">
                    <div class="text-2xl text-yellow-400">→</div>
                    <div class="text-xs text-yellow-400 mt-1">overflow</div>
                </div>

                <!-- Heap section -->
                <div class="flex flex-col items-center">
                    <div class="text-gray-400 text-sm mb-2 font-semibold">Heap (dynamic)</div>
                    <div class="flex border-2 rounded overflow-hidden transition-all duration-500"
                        :class="isOverflowed ? 'border-yellow-400' : 'border-gray-600'">
                        <div v-for="i in 6" :key="'heap-' + i"
                            class="font-mono text-center border-r last:border-r-0 transition-all duration-500" :class="[
                                isOverflowed ? 'bg-yellow-800 text-white border-yellow-400' : 'bg-gray-700 text-gray-500 border-gray-600',
                                isOverflowed && i <= elements.length ? 'opacity-100' : 'opacity-30'
                            ]" :style="{ width: cellWidth + 'px', padding: '12px 0' }">
                            {{ isOverflowed && i <= elements.length ? elements[i - 1] : '·' }} </div>
                        </div>
                        <div class="text-xs mt-2 transition-all duration-500"
                            :class="isOverflowed ? 'text-yellow-400' : 'text-gray-600'">
                            {{ isOverflowed ? `${elements.length} elements` : 'not allocated' }}
                        </div>
                    </div>
                </div>

                <!-- Status message -->
                <div class="mt-4 px-4 py-2 rounded-lg transition-all duration-500"
                    :class="isOverflowed ? 'bg-yellow-900/30 border border-yellow-500/50' : 'bg-green-900/30 border border-green-500/50'">
                    <span v-if="!isOverflowed" class="text-green-300">
                        ✓ {{ elements.length }} elements fit in inline storage — no heap allocation!
                    </span>
                    <span v-else class="text-yellow-300">
                        ⚠ Exceeded N={{ inlineCapacity }} — data moved to heap (still works transparently)
                    </span>
                </div>
            </div>
</template>

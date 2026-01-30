<script setup>
import { ref, onMounted, computed } from 'vue'

const mounted = ref(false)
const phase = ref(0)

onMounted(() => {
    mounted.value = true
    // Animate through phases
    setTimeout(() => phase.value = 1, 800)
    setTimeout(() => phase.value = 2, 1600)
    setTimeout(() => phase.value = 3, 2400)
})

const inlineCapacity = 16
const currentString = computed(() => {
    if (phase.value === 0) return ''
    if (phase.value === 1) return 'Hello'
    if (phase.value === 2) return 'Hello, World!'
    return 'Hello, World! This exceeds inline capacity'
})

const isInline = computed(() => currentString.value.length <= inlineCapacity)
const displayChars = computed(() => {
    const chars = currentString.value.split('')
    return chars.slice(0, inlineCapacity)
})
const heapChars = computed(() => {
    if (isInline.value) return []
    return currentString.value.split('')
})
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <!-- Title -->
        <div class="text-lg font-bold text-blue-400 mb-6">
            SmallString&lt;16&gt; - Small Buffer Optimization
        </div>

        <!-- Stack Object -->
        <div class="flex flex-col items-center">
            <div class="text-sm text-gray-400 mb-2">Stack Object</div>

            <!-- Size/Capacity -->
            <div class="flex gap-4 mb-3">
                <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Size:</span>
                    <div
                        class="w-8 h-6 border border-green-400 rounded flex items-center justify-center text-sm font-mono text-green-400 transition-all duration-300">
                        {{ currentString.length }}
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Capacity:</span>
                    <div
                        class="w-8 h-6 border border-yellow-400 rounded flex items-center justify-center text-sm font-mono text-yellow-400 transition-all duration-300">
                        {{ isInline ? 16 : heapChars.length }}
                    </div>
                </div>
            </div>

            <!-- Inline Buffer -->
            <div class="flex flex-col items-center">
                <div class="text-xs text-gray-500 mb-1">Inline Buffer (16 bytes)</div>
                <div class="flex">
                    <div v-for="i in inlineCapacity" :key="i"
                        class="w-6 h-8 border flex items-center justify-center text-xs font-mono transition-all duration-500"
                        :class="[
                            isInline && i <= displayChars.length
                                ? 'border-green-400 bg-green-400/20 text-green-300'
                                : 'border-gray-600 bg-gray-800/30 text-gray-600',
                            !isInline ? 'opacity-30' : ''
                        ]">
                        {{ isInline ? (displayChars[i - 1] || '') : '' }}
                    </div>
                </div>
            </div>

            <!-- Heap Pointer (shown when overflowed) -->
            <div class="mt-4 transition-all duration-500" :class="isInline ? 'opacity-0' : 'opacity-100'">
                <div class="flex items-center gap-2">
                    <div class="text-xs text-gray-500">Heap Ptr:</div>
                    <div
                        class="w-16 h-6 border border-purple-400 rounded flex items-center justify-center text-xs font-mono text-purple-400 bg-purple-400/10">
                        0x7f...
                    </div>
                    <!-- Arrow to heap -->
                    <svg v-if="!isInline" class="w-8 h-6" viewBox="0 0 32 24">
                        <defs>
                            <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5"
                                orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
                            </marker>
                        </defs>
                        <line x1="0" y1="12" x2="28" y2="12" stroke="#a855f7" stroke-width="2"
                            marker-end="url(#arrowhead-purple)" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Heap Memory (shown when overflowed) -->
        <div class="mt-6 flex flex-col items-center transition-all duration-500"
            :class="isInline ? 'opacity-0 scale-95' : 'opacity-100 scale-100'">
            <div class="text-sm text-purple-400 mb-2">Heap Memory</div>
            <div class="flex flex-wrap justify-center max-w-md">
                <div v-for="(char, i) in heapChars" :key="i"
                    class="w-5 h-7 border border-purple-400 bg-purple-400/20 flex items-center justify-center text-xs font-mono text-purple-300 transition-all duration-300"
                    :style="{ transitionDelay: `${i * 20}ms` }">
                    {{ char }}
                </div>
            </div>
        </div>

        <!-- Phase indicator -->
        <div class="mt-8 flex gap-3">
            <div v-for="(label, i) in ['Empty', 'Small (5)', 'Inline (13)', 'Heap (40+)']" :key="i"
                class="px-3 py-1 rounded text-xs transition-all duration-300" :class="phase === i
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-400'">
                {{ label }}
            </div>
        </div>

        <!-- Legend -->
        <div class="mt-6 flex gap-6 text-xs text-gray-500">
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-green-400 bg-green-400/20 rounded"></div>
                <span>Inline storage (stack)</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-purple-400 bg-purple-400/20 rounded"></div>
                <span>Heap storage (overflow)</span>
            </div>
        </div>
    </div>
</template>

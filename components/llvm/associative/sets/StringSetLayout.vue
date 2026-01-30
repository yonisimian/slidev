<script setup>
import { ref, onMounted } from 'vue'

const phase = ref(0)

onMounted(() => {
    setTimeout(() => phase.value = 1, 600)
    setTimeout(() => phase.value = 2, 1200)
    setTimeout(() => phase.value = 3, 1800)
})

const strings = ['if', 'else', 'while', 'for', 'return']
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <!-- Title -->
        <div class="text-lg font-bold text-yellow-400 mb-6">
            StringSet - Hash Table with String Interning
        </div>

        <div class="flex gap-12 items-start">
            <!-- Hash Table (Buckets) -->
            <div class="flex flex-col items-center">
                <div class="text-sm text-gray-400 mb-2">Hash Buckets</div>
                <div class="flex flex-col gap-1">
                    <div v-for="i in 8" :key="i"
                        class="w-12 h-6 border rounded flex items-center justify-center text-xs font-mono transition-all duration-300"
                        :class="[
                            (i === 2 || i === 5 || i === 7) && phase >= 1
                                ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                                : 'border-gray-600 bg-gray-800/30 text-gray-600'
                        ]">
                        [{{ i - 1 }}]
                    </div>
                </div>
            </div>

            <!-- Arrows -->
            <div class="flex flex-col justify-center h-48">
                <svg class="w-16 h-48" viewBox="0 0 64 192">
                    <defs>
                        <marker id="arrow-yellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#facc15" />
                        </marker>
                    </defs>
                    <!-- Arrow from bucket 1 to "if" -->
                    <line v-if="phase >= 1" x1="0" y1="36" x2="56" y2="24" stroke="#facc15" stroke-width="2"
                        marker-end="url(#arrow-yellow)" class="transition-all duration-500" />
                    <!-- Arrow from bucket 4 to "else" -->
                    <line v-if="phase >= 2" x1="0" y1="108" x2="56" y2="48" stroke="#facc15" stroke-width="2"
                        marker-end="url(#arrow-yellow)" class="transition-all duration-500" />
                    <!-- Arrow from bucket 6 to "while" -->
                    <line v-if="phase >= 3" x1="0" y1="156" x2="56" y2="72" stroke="#facc15" stroke-width="2"
                        marker-end="url(#arrow-yellow)" class="transition-all duration-500" />
                </svg>
            </div>

            <!-- String Storage Pool -->
            <div class="flex flex-col items-center">
                <div class="text-sm text-gray-400 mb-2">String Pool (contiguous)</div>
                <div class="flex flex-col gap-1">
                    <div v-for="(str, i) in strings.slice(0, phase)" :key="str"
                        class="flex items-center gap-1 transition-all duration-300"
                        :style="{ transitionDelay: `${i * 100}ms` }">
                        <div v-for="(char, j) in str" :key="j"
                            class="w-5 h-6 border border-green-400 bg-green-400/20 flex items-center justify-center text-xs font-mono text-green-300">
                            {{ char }}
                        </div>
                        <div
                            class="w-5 h-6 border border-gray-500 bg-gray-800/30 flex items-center justify-center text-xs font-mono text-gray-500">
                            \0
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Phase indicator -->
        <div class="mt-8 flex gap-3">
            <div v-for="(label, i) in ['Empty', 'insert if', 'insert else', 'insert while']" :key="i"
                class="px-3 py-1 rounded text-xs transition-all duration-300" :class="phase === i
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-700 text-gray-400'">
                {{ label }}
            </div>
        </div>

        <!-- Legend -->
        <div class="mt-4 flex gap-6 text-xs text-gray-500">
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-yellow-400 bg-yellow-400/20 rounded"></div>
                <span>Hash bucket (pointer)</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-green-400 bg-green-400/20 rounded"></div>
                <span>Interned string data</span>
            </div>
        </div>
    </div>
</template>

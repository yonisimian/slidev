<script setup>
import { ref, onMounted } from 'vue'

const phase = ref(0)

onMounted(() => {
    setTimeout(() => phase.value = 1, 700)
    setTimeout(() => phase.value = 2, 1400)
    setTimeout(() => phase.value = 3, 2100)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <!-- Title -->
        <div class="text-lg font-bold text-emerald-400 mb-4">
            Radix Tree - Compressed Prefix Trie
        </div>

        <!-- Tree visualization -->
        <div class="relative w-96 h-48">
            <!-- Root -->
            <div
                class="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-8 rounded-full border-2 border-gray-500 bg-gray-800 flex items-center justify-center text-sm text-gray-400">
                ⬤
            </div>

            <!-- Edge: "print" -->
            <svg v-if="phase >= 1" class="absolute inset-0 w-full h-full" style="z-index: -1">
                <line x1="192" y1="32" x2="120" y2="80" stroke="#10b981" stroke-width="2" />
                <text x="140" y="60" fill="#10b981" font-size="12" font-family="monospace">print</text>
            </svg>

            <!-- Node after "print" -->
            <div v-if="phase >= 1"
                class="absolute left-1/4 top-20 w-6 h-6 rounded-full border-2 border-emerald-400 bg-emerald-400/20 flex items-center justify-center text-xs text-emerald-300 transition-all duration-300">
                ●
            </div>

            <!-- Edges from "print" node -->
            <svg v-if="phase >= 2" class="absolute inset-0 w-full h-full" style="z-index: -1">
                <!-- "f" edge -->
                <line x1="96" y1="104" x2="60" y2="150" stroke="#3b82f6" stroke-width="2" />
                <text x="65" y="130" fill="#3b82f6" font-size="12" font-family="monospace">f</text>
                <!-- "ln" edge -->
                <line x1="96" y1="104" x2="130" y2="150" stroke="#f59e0b" stroke-width="2" />
                <text x="105" y="130" fill="#f59e0b" font-size="12" font-family="monospace">ln</text>
            </svg>

            <!-- "printf" node (leaf) -->
            <div v-if="phase >= 2"
                class="absolute left-12 top-36 px-2 py-1 rounded border-2 border-blue-400 bg-blue-400/20 text-xs text-blue-300 transition-all duration-300">
                printf ✓
            </div>

            <!-- "println" node (leaf) -->
            <div v-if="phase >= 3"
                class="absolute left-28 top-36 px-2 py-1 rounded border-2 border-yellow-400 bg-yellow-400/20 text-xs text-yellow-300 transition-all duration-300">
                println ✓
            </div>

            <!-- Right side: unrelated key -->
            <svg v-if="phase >= 1" class="absolute inset-0 w-full h-full" style="z-index: -1">
                <line x1="192" y1="32" x2="280" y2="80" stroke="#a855f7" stroke-width="2" />
                <text x="230" y="55" fill="#a855f7" font-size="12" font-family="monospace">scan</text>
            </svg>

            <div v-if="phase >= 1"
                class="absolute right-16 top-20 px-2 py-1 rounded border-2 border-purple-400 bg-purple-400/20 text-xs text-purple-300 transition-all duration-300">
                scan ✓
            </div>
        </div>

        <!-- Explanation -->
        <div class="mt-4 text-sm text-center" :class="{
            'text-gray-500': phase === 0,
            'text-emerald-400': phase === 1,
            'text-blue-400': phase === 2,
            'text-yellow-400': phase === 3,
        }">
            <span v-if="phase === 0">Radix tree compresses common prefixes</span>
            <span v-else-if="phase === 1">Insert "print", "scan" → edges store full strings</span>
            <span v-else-if="phase === 2">Insert "printf" → splits "print" edge, adds "f" child</span>
            <span v-else>Insert "println" → adds "ln" edge from "print" node</span>
        </div>

        <!-- Phase indicator -->
        <div class="mt-4 flex gap-2">
            <div v-for="(label, i) in ['Empty', 'print, scan', '+ printf', '+ println']" :key="i"
                class="px-2 py-1 rounded text-xs transition-all duration-300" :class="phase === i
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-700 text-gray-400'">
                {{ label }}
            </div>
        </div>
    </div>
</template>

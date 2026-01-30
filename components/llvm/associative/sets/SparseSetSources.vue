<script setup>
import { ref, onMounted } from 'vue'

const showComparison = ref(false)

onMounted(() => {
    setTimeout(() => showComparison.value = true, 500)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center my-6">
        <!-- Comparison: SparseSet vs SparseMultiSet -->
        <div class="flex gap-10 transition-all duration-700"
            :class="showComparison ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
            <!-- SparseSet -->
            <div class="flex flex-col items-center">
                <div class="text-base font-bold text-pink-400 mb-3">SparseSet</div>
                <div class="bg-gray-800/50 rounded-lg p-3 border border-pink-500/30">
                    <div class="text-xs text-gray-400 mb-2 text-center">Unique keys only</div>
                    <div class="flex gap-1">
                        <div v-for="v in [3, 7, 1]" :key="v"
                            class="w-8 h-8 border border-pink-400 bg-pink-400/20 rounded flex items-center justify-center text-sm font-mono text-pink-300">
                            {{ v }}
                        </div>
                    </div>
                    <div class="text-xs text-pink-400 mt-2 text-center">Set semantics</div>
                </div>
            </div>

            <!-- SparseMultiSet -->
            <div class="flex flex-col items-center">
                <div class="text-base font-bold text-purple-400 mb-3">SparseMultiSet</div>
                <div class="bg-gray-800/50 rounded-lg p-3 border border-purple-500/30">
                    <div class="text-xs text-gray-400 mb-2 text-center">Allows duplicates</div>
                    <div class="flex gap-1">
                        <div v-for="(v, i) in [3, 7, 3, 1, 3]" :key="i"
                            class="w-8 h-8 border border-purple-400 bg-purple-400/20 rounded flex items-center justify-center text-sm font-mono text-purple-300">
                            {{ v }}
                        </div>
                    </div>
                    <div class="text-xs text-purple-400 mt-2 text-center">Multiset semantics</div>
                </div>
            </div>
        </div>

        <!-- Key benefits -->
        <div class="mt-6 grid grid-cols-4 gap-4 transition-all duration-700 delay-300"
            :class="showComparison ? 'opacity-100' : 'opacity-0'">
            <div class="text-center">
                <div class="text-xl mb-1">⚡</div>
                <div class="text-sm text-green-400 font-semibold">O(1) Insert</div>
            </div>
            <div class="text-center">
                <div class="text-xl mb-1">🎯</div>
                <div class="text-sm text-blue-400 font-semibold">O(1) Lookup</div>
            </div>
            <div class="text-center">
                <div class="text-xl mb-1">🗑️</div>
                <div class="text-sm text-red-400 font-semibold">O(1) Delete</div>
            </div>
            <div class="text-center">
                <div class="text-xl mb-1">🔄</div>
                <div class="text-sm text-yellow-400 font-semibold">O(n) Iterate</div>
            </div>
        </div>

        <!-- Use case -->
        <div class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 transition-all duration-700 delay-500"
            :class="showComparison ? 'opacity-100' : 'opacity-0'">
            <div class="text-xs text-gray-400 font-mono text-center">
                Best for: Register allocation, liveness analysis, small bounded universes
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showComparison = ref(false)

onMounted(() => {
    setTimeout(() => showComparison.value = true, 500)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center h-full -mt-12">
        <!-- Comparison -->
        <div class="flex gap-10 transition-all duration-700"
            :class="showComparison ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
            <!-- std::unordered_set -->
            <div class="flex flex-col items-center">
                <div class="text-base font-bold text-red-400 mb-3">std::unordered_set</div>
                <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
                    <div class="text-xs text-gray-400 mb-2 text-center">Chaining (linked lists)</div>
                    <div class="flex gap-2">
                        <div v-for="i in 3" :key="i" class="flex flex-col items-center gap-1">
                            <div
                                class="w-6 h-5 border border-gray-500 rounded text-xs flex items-center justify-center">
                                [{{ i }}]</div>
                            <div
                                class="w-5 h-5 border border-red-400/50 bg-red-400/10 rounded-full text-xs flex items-center justify-center text-red-300">
                                ●</div>
                            <div v-if="i === 1"
                                class="w-5 h-5 border border-red-400/50 bg-red-400/10 rounded-full text-xs flex items-center justify-center text-red-300">
                                ●</div>
                        </div>
                    </div>
                    <div class="text-xs text-red-400 mt-2 text-center">Cache misses</div>
                </div>
            </div>

            <!-- DenseSet -->
            <div class="flex flex-col items-center">
                <div class="text-base font-bold text-green-400 mb-3">DenseSet</div>
                <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
                    <div class="text-xs text-gray-400 mb-2 text-center">Open addressing</div>
                    <div class="flex gap-0.5">
                        <div v-for="i in 6" :key="i"
                            class="w-6 h-6 border rounded text-xs flex items-center justify-center"
                            :class="i % 2 === 0 ? 'border-green-400 bg-green-400/20 text-green-300' : 'border-gray-600 text-gray-500'">
                            {{ i % 2 === 0 ? '●' : '' }}
                        </div>
                    </div>
                    <div class="text-xs text-green-400 mt-2 text-center">Cache friendly</div>
                </div>
            </div>
        </div>

        <!-- Key benefits -->
        <div class="mt-6 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
            :class="showComparison ? 'opacity-100' : 'opacity-0'">
            <div class="text-center">
                <div class="text-2xl mb-1">🎯</div>
                <div class="text-sm text-cyan-400 font-semibold">Quadratic Probe</div>
                <div class="text-xs text-gray-500">h + 1, h + 4, h + 9...</div>
            </div>
            <div class="text-center">
                <div class="text-2xl mb-1">💀</div>
                <div class="text-sm text-red-400 font-semibold">Tombstones</div>
                <div class="text-xs text-gray-500">Safe deletion</div>
            </div>
            <div class="text-center">
                <div class="text-2xl mb-1">⚡</div>
                <div class="text-sm text-yellow-400 font-semibold">DenseMapInfo</div>
                <div class="text-xs text-gray-500">Custom hash traits</div>
            </div>
        </div>
    </div>
</template>

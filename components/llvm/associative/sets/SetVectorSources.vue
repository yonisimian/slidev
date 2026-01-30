<script setup>
import { ref, onMounted } from 'vue'

const showContent = ref(false)

onMounted(() => {
    setTimeout(() => showContent.value = true, 500)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center my-6">
        <!-- Why determinism matters -->
        <div class="flex flex-col items-center gap-4 transition-all duration-700"
            :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
            <div class="text-base font-bold text-teal-400 mb-2">Why Deterministic Order Matters</div>

            <div class="flex gap-8">
                <!-- Non-deterministic -->
                <div class="flex flex-col items-center">
                    <div class="text-sm text-red-400 mb-2">std::unordered_set</div>
                    <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
                        <div class="text-xs text-gray-400 mb-1">Run 1: A, C, B</div>
                        <div class="text-xs text-gray-400 mb-1">Run 2: B, A, C</div>
                        <div class="text-xs text-gray-400">Run 3: C, B, A</div>
                    </div>
                    <!-- <div class="text-xs text-red-400 mt-2">Non-reproducible builds!</div> -->
                </div>

                <!-- Deterministic -->
                <div class="flex flex-col items-center">
                    <div class="text-sm text-green-400 mb-2">SetVector</div>
                    <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
                        <div class="text-xs text-gray-400 mb-1">Run 1: A, B, C</div>
                        <div class="text-xs text-gray-400 mb-1">Run 2: A, B, C</div>
                        <div class="text-xs text-gray-400">Run 3: A, B, C</div>
                    </div>
                    <!-- <div class="text-xs text-green-400 mt-2">Reproducible builds! ✓</div> -->
                </div>
            </div>
        </div>

        <!-- Key benefits -->
        <div class="mt-6 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
            :class="showContent ? 'opacity-100' : 'opacity-0'">
            <div class="text-center">
                <div class="text-2xl mb-1">🔄</div>
                <div class="text-sm text-teal-400 font-semibold">Deterministic</div>
                <div class="text-xs text-gray-500">Same order always</div>
            </div>
            <div class="text-center">
                <div class="text-2xl mb-1">🎯</div>
                <div class="text-sm text-orange-400 font-semibold">O(1) Lookup</div>
                <div class="text-xs text-gray-500">Via internal set</div>
            </div>
            <div class="text-center">
                <div class="text-2xl mb-1">📋</div>
                <div class="text-sm text-blue-400 font-semibold">Insertion Order</div>
                <div class="text-xs text-gray-500">FIFO iteration</div>
            </div>
        </div>

        <!-- SmallSetVector mention -->
        <!-- <div class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 transition-all duration-700 delay-500"
            :class="showContent ? 'opacity-100' : 'opacity-0'">
            <div class="text-xs text-gray-400 font-mono text-center">
                SmallSetVector&lt;T, N&gt; → uses SmallVector + SmallDenseSet for small-buffer optimization
            </div>
        </div> -->
    </div>
</template>

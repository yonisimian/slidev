<script setup>
import { ref, onMounted } from 'vue'

const showContent = ref(false)

onMounted(() => {
    setTimeout(() => showContent.value = true, 500)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center my-6">
        <!-- Comparison -->
        <div class="flex gap-10 transition-all duration-700"
            :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
            <!-- Regular Trie -->
            <div class="flex flex-col items-center">
                <div class="text-base font-bold text-red-400 mb-3">Regular Trie</div>
                <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30">
                    <div class="text-xs text-gray-400 mb-2 text-center">One node per character</div>
                    <div class="flex flex-col items-center">
                        <div class="text-xs text-gray-500">p→r→i→n→t→f</div>
                        <div class="text-xs text-red-400 mt-1">6 nodes for "printf"</div>
                    </div>
                </div>
            </div>

            <!-- Radix Tree -->
            <div class="flex flex-col items-center">
                <div class="text-base font-bold text-green-400 mb-3">Radix Tree</div>
                <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30">
                    <div class="text-xs text-gray-400 mb-2 text-center">Edges store strings</div>
                    <div class="flex flex-col items-center">
                        <div class="text-xs text-gray-500">●─"print"→●─"f"→✓</div>
                        <div class="text-xs text-green-400 mt-1">2 nodes for "printf"</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Key benefits -->
        <div class="mt-6 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
            :class="showContent ? 'opacity-100' : 'opacity-0'">
            <div class="text-center">
                <div class="text-2xl mb-1">📦</div>
                <div class="text-sm text-emerald-400 font-semibold">Compressed</div>
                <div class="text-xs text-gray-500">Fewer nodes</div>
            </div>
            <div class="text-center">
                <div class="text-2xl mb-1">🔍</div>
                <div class="text-sm text-blue-400 font-semibold">O(key len)</div>
                <div class="text-xs text-gray-500">Lookup time</div>
            </div>
            <div class="text-center">
                <div class="text-2xl mb-1">🌳</div>
                <div class="text-sm text-yellow-400 font-semibold">Prefix Sharing</div>
                <div class="text-xs text-gray-500">Memory efficient</div>
            </div>
        </div>

        <!-- Connection to StringMap -->
        <div class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 transition-all duration-700 delay-500"
            :class="showContent ? 'opacity-100' : 'opacity-0'">
            <div class="text-xs text-gray-400 font-mono text-center">
                StringMap uses radix-tree-like structure for fast string key lookup
            </div>
        </div>
    </div>
</template>

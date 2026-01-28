<script setup>
</script>

<template>
    <div class="flex justify-center items-center gap-8 mt-4">
        <!-- Visual representation of BitVector sources -->
        <div class="flex flex-col items-center gap-4">
            <!-- Source types that can create a BitVector -->
            <div class="flex gap-6">
                <div class="source-box">
                    <div class="text-purple-400 font-mono text-sm">BitVector(n)</div>
                    <div class="text-xs text-gray-400 mt-1">Size constructor</div>
                </div>
                <div class="source-box">
                    <div class="text-purple-400 font-mono text-sm">BitVector(n, init)</div>
                    <div class="text-xs text-gray-400 mt-1">With initial value</div>
                </div>
            </div>

            <!-- Arrow -->
            <div class="text-purple-400 text-2xl">↓</div>

            <!-- BitVector representation -->
            <div class="bg-gray-800 rounded-lg p-4 border-2 border-purple-500">
                <div class="font-mono text-purple-300 text-center mb-2">BitVector</div>
                <div class="flex gap-1">
                    <div v-for="i in 8" :key="i"
                        class="w-6 h-6 rounded text-xs flex items-center justify-center font-mono"
                        :class="[1, 3, 5, 7].includes(i) ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-400'">
                        {{ [1, 3, 5, 7].includes(i) ? '1' : '0' }}
                    </div>
                    <div class="text-gray-400">...</div>
                </div>
            </div>

            <!-- Operations -->
            <div class="text-purple-400 text-2xl">↓</div>

            <div class="flex gap-4">
                <div class="op-box">set(i)</div>
                <div class="op-box">reset(i)</div>
                <div class="op-box">test(i)</div>
                <div class="op-box">&amp; | ^</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.source-box {
    @apply bg-gray-800 rounded-lg px-4 py-2 border border-gray-600 text-center;
}

.op-box {
    @apply bg-purple-900/50 rounded px-3 py-1 border border-purple-500 text-purple-300 font-mono text-sm;
}
</style>

<script setup>
</script>

<template>
    <div class="flex justify-center items-center gap-8 mt-4">
        <div class="flex flex-col items-center gap-4">
            <!-- Threshold explanation -->
            <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-600 text-center">
                <div class="text-gray-300 mb-2">Automatic mode selection based on size:</div>
                <div class="flex gap-8 justify-center">
                    <div class="text-center">
                        <div class="text-green-400 font-bold text-2xl">≤ ~25 bits</div>
                        <div class="text-gray-400 text-sm">Inline in uintptr_t</div>
                    </div>
                    <div class="text-gray-500 text-2xl">|</div>
                    <div class="text-center">
                        <div class="text-purple-400 font-bold text-2xl">&gt; ~25 bits</div>
                        <div class="text-gray-400 text-sm">Heap allocated</div>
                    </div>
                </div>
            </div>

            <!-- Visual comparison -->
            <div class="flex gap-8">
                <!-- Inline mode -->
                <div class="flex flex-col items-center">
                    <div class="text-green-400 font-bold mb-2">Inline Mode</div>
                    <div class="bg-gray-800 rounded-lg p-3 border-2 border-green-500">
                        <div class="font-mono text-xs text-gray-400 mb-1">uintptr_t X:</div>
                        <div class="flex gap-0.5">
                            <div
                                class="w-3 h-4 bg-green-600 rounded-sm text-xs flex items-center justify-center text-white">
                                1</div>
                            <div v-for="i in 7" :key="i"
                                class="w-3 h-4 rounded-sm text-xs flex items-center justify-center"
                                :class="i % 2 === 0 ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-400'">
                                {{ i % 2 === 0 ? '1' : '0' }}
                            </div>
                            <div class="text-gray-500 text-xs ml-1">...</div>
                        </div>
                    </div>
                    <div class="text-gray-500 text-xs mt-2">Bits stored directly</div>
                </div>

                <!-- Heap mode -->
                <div class="flex flex-col items-center">
                    <div class="text-purple-400 font-bold mb-2">Heap Mode</div>
                    <div class="flex items-center gap-2">
                        <div class="bg-gray-800 rounded-lg p-3 border-2 border-purple-500">
                            <div class="font-mono text-xs text-gray-400 mb-1">uintptr_t X:</div>
                            <div class="text-purple-400 font-mono text-sm">0x7fff...</div>
                        </div>
                        <div class="text-purple-400">→</div>
                        <div class="bg-purple-900/50 rounded-lg p-2 border border-purple-500">
                            <div class="flex gap-0.5">
                                <div v-for="i in 8" :key="i"
                                    class="w-3 h-4 rounded-sm text-xs flex items-center justify-center"
                                    :class="i % 3 === 0 ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-400'">
                                    {{ i % 3 === 0 ? '1' : '0' }}
                                </div>
                                <div class="text-gray-500 text-xs">...</div>
                            </div>
                        </div>
                    </div>
                    <div class="text-gray-500 text-xs mt-2">Pointer to BitVector</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

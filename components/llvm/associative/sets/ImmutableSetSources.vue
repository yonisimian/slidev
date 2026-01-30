<script setup>
import { ref, onMounted } from 'vue'

const showContent = ref(false)

onMounted(() => {
    setTimeout(() => showContent.value = true, 500)
})
</script>

<template>
    <div class="flex flex-col items-center justify-center my-6">
        <!-- Use case: Backtracking -->
        <div class="flex flex-col items-center gap-4 transition-all duration-700"
            :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
            <div class="text-base font-bold text-violet-400 mb-2">Perfect for Backtracking Analysis</div>

            <div class="flex gap-4 items-start">
                <!-- Mutable approach -->
                <div class="flex flex-col items-center">
                    <div class="text-sm text-red-400 mb-2">Mutable Set</div>
                    <div class="bg-gray-800/50 rounded-lg p-3 border border-red-500/30 text-xs">
                        <div class="text-gray-400">state.insert(x);</div>
                        <div class="text-gray-400">explore(left);</div>
                        <div class="text-red-400">state.erase(x); // undo!</div>
                        <div class="text-gray-400">explore(right);</div>
                    </div>
                    <!-- <div class="text-xs text-red-400 mt-2">Manual undo required</div> -->
                </div>

                <!-- Immutable approach -->
                <div class="flex flex-col items-center">
                    <div class="text-sm text-green-400 mb-2">ImmutableSet</div>
                    <div class="bg-gray-800/50 rounded-lg p-3 border border-green-500/30 text-xs">
                        <div class="text-gray-400">auto s2 = F.add(s1, x);</div>
                        <div class="text-gray-400">explore(left, s2);</div>
                        <div class="text-green-400">explore(right, s1); // original!</div>
                    </div>
                    <!-- <div class="text-xs text-green-400 mt-2">Automatic backtracking</div> -->
                </div>
            </div>
        </div>

        <!-- Key benefits -->
        <div class="mt-6 grid grid-cols-3 gap-6 transition-all duration-700 delay-300"
            :class="showContent ? 'opacity-100' : 'opacity-0'">
            <div class="text-center">
                <div class="text-2xl mb-1">🔒</div>
                <div class="text-sm text-violet-400 font-semibold">Immutable</div>
                <div class="text-xs text-gray-500">No accidental mutation</div>
            </div>
            <div class="text-center">
                <div class="text-2xl mb-1">🌳</div>
                <div class="text-sm text-green-400 font-semibold">Sharing</div>
                <div class="text-xs text-gray-500">O(log n) space per op</div>
            </div>
            <div class="text-center">
                <div class="text-2xl mb-1">🔄</div>
                <div class="text-sm text-blue-400 font-semibold">Versioning</div>
                <div class="text-xs text-gray-500">Keep all history</div>
            </div>
        </div>

        <!-- Use cases -->
        <!-- <div class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 transition-all duration-700 delay-500"
            :class="showContent ? 'opacity-100' : 'opacity-0'">
            <div class="text-xs text-gray-400 font-mono text-center">
                Use cases: Clang Static Analyzer, data flow analysis, constraint solving
            </div>
        </div> -->
    </div>
</template>

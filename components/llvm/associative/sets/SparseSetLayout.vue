<script setup>
import { ref, onMounted } from 'vue'

const phase = ref(0)

onMounted(() => {
    setTimeout(() => phase.value = 1, 700)
    setTimeout(() => phase.value = 2, 1400)
    setTimeout(() => phase.value = 3, 2100)
})

// Sparse array: index is the value, content is position in dense
const getSparse = (index) => {
    if (phase.value === 0) return { valid: false, pos: '-' }
    if (phase.value === 1) {
        if (index === 3) return { valid: true, pos: 0 }
        if (index === 7) return { valid: true, pos: 1 }
        return { valid: false, pos: '-' }
    }
    if (phase.value === 2) {
        if (index === 3) return { valid: true, pos: 0 }
        if (index === 7) return { valid: true, pos: 1 }
        if (index === 1) return { valid: true, pos: 2 }
        return { valid: false, pos: '-' }
    }
    // Phase 3: after erase(7)
    if (index === 3) return { valid: true, pos: 0 }
    if (index === 1) return { valid: true, pos: 1 } // moved from pos 2
    return { valid: false, pos: '-' }
}

const getDense = () => {
    if (phase.value === 0) return []
    if (phase.value === 1) return [3, 7]
    if (phase.value === 2) return [3, 7, 1]
    return [3, 1] // after erase(7), 1 moved to position 1
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-full -mt-6">
        <!-- Title -->
        <div class="text-lg font-bold text-pink-400 mb-4">
            SparseSet - Two-Array O(1) Set
        </div>

        <div class="flex gap-8 items-start">
            <!-- Sparse Array -->
            <div class="flex flex-col items-center">
                <div class="text-sm text-gray-400 mb-2">Sparse Array (size = universe)</div>
                <div class="flex gap-0.5">
                    <div v-for="i in 8" :key="i"
                        class="w-8 h-10 border rounded flex flex-col items-center justify-center transition-all duration-300"
                        :class="getSparse(i - 1).valid
                            ? 'border-pink-400 bg-pink-400/20'
                            : 'border-gray-600 bg-gray-800/30'">
                        <span class="text-xs text-gray-500">[{{ i - 1 }}]</span>
                        <span class="text-xs font-mono"
                            :class="getSparse(i - 1).valid ? 'text-pink-300' : 'text-gray-600'">
                            {{ getSparse(i - 1).pos }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Arrows -->
            <div class="flex items-center text-gray-500 text-2xl mt-6">↔</div>

            <!-- Dense Array -->
            <div class="flex flex-col items-center">
                <div class="text-sm text-gray-400 mb-2">Dense Array (size = count)</div>
                <div class="flex gap-1">
                    <div v-for="(val, i) in getDense()" :key="i"
                        class="w-10 h-10 border-2 border-green-400 bg-green-400/20 rounded flex flex-col items-center justify-center transition-all duration-300">
                        <span class="text-xs text-gray-500">[{{ i }}]</span>
                        <span class="text-sm font-mono text-green-300">{{ val }}</span>
                    </div>
                    <div v-if="getDense().length === 0" class="text-gray-500 text-sm mt-3">(empty)</div>
                </div>
            </div>
        </div>

        <!-- Explanation -->
        <div class="mt-6 text-sm text-center" :class="{
            'text-gray-500': phase === 0,
            'text-blue-400': phase === 1,
            'text-yellow-400': phase === 2,
            'text-red-400': phase === 3,
        }">
            <span v-if="phase === 0">Empty set (universe = 8)</span>
            <span v-else-if="phase === 1">insert(3), insert(7) → sparse[3]=0, sparse[7]=1</span>
            <span v-else-if="phase === 2">insert(1) → sparse[1]=2, dense[2]=1</span>
            <span v-else>erase(7) → swap dense[1]↔dense[2], pop → O(1)!</span>
        </div>

        <!-- Phase indicator -->
        <div class="mt-4 flex gap-2">
            <div v-for="(label, i) in ['Empty', 'Insert 3,7', 'Insert 1', 'Erase 7']" :key="i"
                class="px-2 py-1 rounded text-xs transition-all duration-300" :class="phase === i
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-700 text-gray-400'">
                {{ label }}
            </div>
        </div>

        <!-- Key insight -->
        <div class="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700 text-xs text-gray-400 text-center">
            Lookup: sparse[v] → if valid, dense[sparse[v]] == v → O(1) | Delete: swap last into hole → O(1)
        </div>
    </div>
</template>

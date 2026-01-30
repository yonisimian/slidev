<script setup>
import { ref, onMounted } from 'vue'

const phase = ref(0)

onMounted(() => {
    setTimeout(() => phase.value = 1, 600)
    setTimeout(() => phase.value = 2, 1200)
    setTimeout(() => phase.value = 3, 1800)
    setTimeout(() => phase.value = 4, 2400)
})

// Bucket states: empty, value, tombstone
const buckets = ref([
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
    { state: 'empty' },
])

const getBucketState = (index) => {
    if (phase.value === 0) return { state: 'empty', value: '' }
    if (phase.value === 1) {
        if (index === 2) return { state: 'value', value: 'A' }
        if (index === 5) return { state: 'value', value: 'B' }
        return { state: 'empty', value: '' }
    }
    if (phase.value === 2) {
        if (index === 2) return { state: 'value', value: 'A' }
        if (index === 5) return { state: 'value', value: 'B' }
        if (index === 3) return { state: 'value', value: 'C' } // collision at 2, probed to 3
        return { state: 'empty', value: '' }
    }
    if (phase.value >= 3) {
        if (index === 2) return { state: 'tombstone', value: '†' }
        if (index === 5) return { state: 'value', value: 'B' }
        if (index === 3) return { state: 'value', value: 'C' }
        return { state: 'empty', value: '' }
    }
    return { state: 'empty', value: '' }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <!-- Title -->
        <div class="text-lg font-bold text-cyan-400 mb-6">
            DenseSet - Open Addressing with Quadratic Probing
        </div>

        <!-- Hash Table -->
        <div class="flex flex-col items-center">
            <div class="text-sm text-gray-400 mb-3">Bucket Array (power of 2)</div>
            <div class="flex gap-1">
                <div v-for="i in 8" :key="i"
                    class="w-12 h-12 border-2 rounded flex flex-col items-center justify-center transition-all duration-300"
                    :class="{
                        'border-gray-600 bg-gray-800/30': getBucketState(i - 1).state === 'empty',
                        'border-cyan-400 bg-cyan-400/20': getBucketState(i - 1).state === 'value',
                        'border-red-400 bg-red-400/20': getBucketState(i - 1).state === 'tombstone',
                    }">
                    <span class="text-xs text-gray-500">[{{ i - 1 }}]</span>
                    <span class="text-sm font-mono" :class="{
                        'text-gray-600': getBucketState(i - 1).state === 'empty',
                        'text-cyan-300': getBucketState(i - 1).state === 'value',
                        'text-red-400': getBucketState(i - 1).state === 'tombstone',
                    }">
                        {{ getBucketState(i - 1).value }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Probing visualization -->
        <div v-if="phase === 2" class="mt-4 text-sm text-yellow-400">
            Collision at [2] → Probe to [2+1²] = [3]
        </div>
        <div v-if="phase >= 3" class="mt-4 text-sm text-red-400">
            erase(A) → Tombstone at [2] (preserves probe chain)
        </div>

        <!-- Phase indicator -->
        <div class="mt-6 flex gap-2">
            <div v-for="(label, i) in ['Empty', 'Insert A,B', 'Insert C (collision)', 'Erase A']" :key="i"
                class="px-2 py-1 rounded text-xs transition-all duration-300" :class="phase === i
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700 text-gray-400'">
                {{ label }}
            </div>
        </div>

        <!-- Legend -->
        <div class="mt-4 flex gap-4 text-xs text-gray-500">
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-gray-600 bg-gray-800/30 rounded"></div>
                <span>Empty</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-cyan-400 bg-cyan-400/20 rounded"></div>
                <span>Occupied</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 border border-red-400 bg-red-400/20 rounded"></div>
                <span>Tombstone</span>
            </div>
        </div>
    </div>
</template>

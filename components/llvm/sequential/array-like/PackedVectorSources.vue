<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $clicksContext: clicks } = useSlideContext()

const currentClick = computed(() => clicks.current)

const features = [
    {
        name: 'Bit-packed',
        desc: 'N bits per value',
        bgClass: 'bg-orange-600'
    },
    {
        name: 'Signed/Unsigned',
        desc: '2 bits → -2..1 or 0..3',
        bgClass: 'bg-amber-600'
    },
    {
        name: 'OR operation',
        desc: 'Combine flags with |=',
        bgClass: 'bg-yellow-600'
    },
    {
        name: 'Memory efficient',
        desc: 'Up to 16× savings',
        bgClass: 'bg-lime-600'
    },
]
</script>

<template>
    <div class="flex flex-col items-center gap-4 mt-2">
        <div class="text-gray-300 text-lg">PackedVector Features</div>

        <div class="flex gap-4">
            <div v-for="(feature, idx) in features" :key="feature.name"
                class="flex flex-col items-center px-4 py-3 rounded-lg border transition-all duration-300 min-w-32"
                :class="[
                    currentClick === idx
                        ? `${feature.bgClass} border-white shadow-lg scale-105`
                        : 'bg-gray-800 border-gray-600 opacity-70'
                ]">
                <div class="font-semibold text-white text-sm">{{ feature.name }}</div>
                <div class="text-xs mt-1" :class="currentClick === idx ? 'text-white/80' : 'text-gray-400'">
                    {{ feature.desc }}
                </div>
            </div>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div class="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-600">
                <span class="text-gray-400">Unsigned 2-bit: </span>
                <span class="text-orange-300 font-mono">0, 1, 2, 3</span>
            </div>
            <div class="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-600">
                <span class="text-gray-400">Signed 2-bit: </span>
                <span class="text-orange-300 font-mono">-2, -1, 0, 1</span>
            </div>
        </div>
    </div>
</template>

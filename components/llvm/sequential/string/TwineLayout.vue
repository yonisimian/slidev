<script setup>
import { ref, onMounted } from 'vue'

const step = ref(0)

const animations = [
    {
        nodes: [{ type: 'str', value: '"Hello"' }],
        label: 'Start with a string'
    },
    {
        nodes: [
            { type: 'concat', left: '"Hello"', right: '", "' }
        ],
        label: '"Hello" + ", "'
    },
    {
        nodes: [
            {
                type: 'concat',
                left: { type: 'concat', left: '"Hello"', right: '", "' },
                right: 'name'
            }
        ],
        label: '... + name'
    },
    {
        nodes: [{ type: 'str', value: '"Hello"' }],
        label: 'Back to start'
    },
]

const animateNext = () => {
    step.value = (step.value + 1) % animations.length
}

onMounted(() => {
    setTimeout(() => {
        setInterval(animateNext, 2500)
    }, 1500)
})
</script>

<template>
    <div class="flex flex-col items-center gap-6 mt-4">
        <!-- Twine code block -->
        <div class="flex items-start gap-6 pl-24">
            <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <pre class="px-4 py-3 font-mono text-sm leading-relaxed"><span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">Twine</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#569cd6]">enum</span> <span class="text-[#4ec9b0]">NodeKind</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Empty</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">CString</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">StdString</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Twine</span><span class="text-[#d4d4d4]">...</span> <span class="text-[#d4d4d4]">};</span>
    <span class="text-[#569cd6]">union</span> <span class="text-[#4ec9b0]">Child</span> <span class="text-[#d4d4d4]">{...}</span> <span class="text-[#9cdcfe]">LHS</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">RHS</span><span class="text-[#d4d4d4]">;</span>  <span class="text-[#6a9955]">// Binary tree!</span>
<span class="text-[#d4d4d4]">};</span></pre>
            </div>
            <div class="text-gray-500 text-sm mt-2">← Rope-like structure</div>
        </div>

        <!-- Animation label -->
        <div class="text-green-400 font-mono text-lg h-6">
            {{ animations[step].label }}
        </div>

        <!-- Tree visualization -->
        <div class="flex flex-col items-center gap-2">
            <!-- Step 0: Single node -->
            <div v-if="step === 0" class="tree-node leaf">
                "Hello"
            </div>

            <!-- Step 1: Two-node concat -->
            <div v-if="step === 1" class="flex flex-col items-center">
                <div class="tree-node concat">+</div>
                <div class="flex gap-8 mt-2">
                    <div class="flex flex-col items-center">
                        <div class="text-green-400">╱</div>
                        <div class="tree-node leaf">"Hello"</div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="text-green-400">╲</div>
                        <div class="tree-node leaf">", "</div>
                    </div>
                </div>
            </div>

            <!-- Step 2: Three-node concat -->
            <div v-if="step === 2" class="flex flex-col items-center">
                <div class="tree-node concat">+</div>
                <div class="flex gap-12 mt-2">
                    <div class="flex flex-col items-center">
                        <div class="text-green-400">╱</div>
                        <div class="tree-node concat">+</div>
                        <div class="flex gap-4 mt-1">
                            <div class="flex flex-col items-center">
                                <div class="text-green-400 text-xs">╱</div>
                                <div class="tree-node leaf small">"Hello"</div>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="text-green-400 text-xs">╲</div>
                                <div class="tree-node leaf small">", "</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="text-green-400">╲</div>
                        <div class="tree-node leaf">name</div>
                    </div>
                </div>
            </div>

            <!-- Step 3: Back to single -->
            <div v-if="step === 3" class="tree-node leaf">
                "Hello"
            </div>
        </div>

        <!-- Key insight -->
        <div class="text-gray-500 text-xs mt-2">
            All nodes live on the stack — flattened only when .str() is called
        </div>
    </div>
</template>

<style scoped>
.tree-node {
    @apply px-3 py-1 rounded font-mono text-sm;
}

.tree-node.leaf {
    @apply bg-green-800 border border-green-500 text-green-200;
}

.tree-node.leaf.small {
    @apply text-xs px-2 py-0.5;
}

.tree-node.concat {
    @apply bg-green-600 border-2 border-green-400 text-white font-bold;
}
</style>

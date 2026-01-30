<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const step = ref(0)
  let interval = null

  const examples = [
    {
      format: '"{0} + {1} = {2}"',
      args: ['10', '20', '30'],
      result: '"10 + 20 = 30"',
      desc: 'Positional arguments',
    },
    {
      format: '"{1} before {0}"',
      args: ['"world"', '"hello"'],
      result: '"hello before world"',
      desc: 'Reordered arguments',
    },
    {
      format: '"0x{0:X8}"',
      args: ['255'],
      result: '"0x000000FF"',
      desc: 'Hex formatting',
    },
    {
      format: '"{0,10}"',
      args: ['"hi"'],
      result: '"        hi"',
      desc: 'Right-aligned padding',
    },
    {
      format: '"{0,-10}"',
      args: ['"hi"'],
      result: '"hi        "',
      desc: 'Left-aligned padding',
    },
  ]

  const currentExample = ref(examples[0])

  onMounted(() => {
    interval = setInterval(() => {
      step.value = (step.value + 1) % examples.length
      currentExample.value = examples[step.value]
    }, 2500)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h2 class="text-2xl font-bold">
      <span class="text-purple-400">llvm::formatv</span>
      <span class="text-gray-400 text-lg ml-2">— Type-safe Python-style formatting</span>
    </h2>

    <!-- Format string visualization -->
    <div class="mt-4 flex flex-col items-center gap-4">
      <!-- Format string -->
      <div class="flex items-center gap-3">
        <span class="text-gray-500 font-mono text-sm">format:</span>
        <div
          class="bg-gray-900 border border-purple-400/50 rounded-lg px-4 py-2 font-mono text-purple-300"
        >
          {{ currentExample.format }}
        </div>
      </div>

      <!-- Arguments -->
      <div class="flex items-center gap-3">
        <span class="text-gray-500 font-mono text-sm">args:</span>
        <div class="flex gap-2">
          <div
            v-for="(arg, idx) in currentExample.args"
            :key="idx"
            class="bg-gray-800 border border-cyan-400/50 rounded px-3 py-1 font-mono text-cyan-300 text-sm"
          >
            {{ arg }}
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="text-purple-400 text-2xl">⬇</div>

      <!-- Result -->
      <div class="flex items-center gap-3">
        <span class="text-gray-500 font-mono text-sm">result:</span>
        <div
          class="bg-green-900/30 border border-green-400/50 rounded-lg px-4 py-2 font-mono text-green-300"
        >
          {{ currentExample.result }}
        </div>
      </div>

      <!-- Description -->
      <div class="text-gray-400 text-sm italic">{{ currentExample.desc }}</div>
    </div>

    <!-- Code example -->
    <div class="bg-gray-900 rounded-lg border border-gray-700 p-4 font-mono text-sm mt-2">
      <div class="text-gray-500">// Type-safe, no format string vulnerabilities</div>
      <div>
        <span class="text-blue-400">std::string</span>
        <span class="text-gray-300"> s = </span>
        <span class="text-purple-400">formatv</span>
        <span class="text-gray-300">(</span>
        <span class="text-orange-300">"Hello {0}, you have {1} messages"</span>
        <span class="text-gray-300">, name, count);</span>
      </div>
    </div>

    <!-- Feature badges -->
    <div class="flex gap-4 mt-2 text-xs">
      <div class="flex items-center gap-1 text-gray-400">
        <span class="text-green-400">✓</span> Type-safe
      </div>
      <div class="flex items-center gap-1 text-gray-400">
        <span class="text-green-400">✓</span> Custom formatters
      </div>
      <div class="flex items-center gap-1 text-gray-400">
        <span class="text-green-400">✓</span> No allocations (with raw_ostream)
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const pageSize = 4
  const numPages = 6
  const totalElements = pageSize * numPages

  // Track which pages are allocated
  const allocatedPages = ref(new Set())
  const accessedElement = ref(null)
  const step = ref(0)

  // Animation sequence
  const animations = [
    { allocated: [], accessed: null, message: 'resize(24) — no allocations yet!' },
    { allocated: [0], accessed: 0, message: 'Accessing [0] → Page 0 allocated' },
    { allocated: [0], accessed: 2, message: 'Accessing [2] → already in Page 0' },
    { allocated: [0, 3], accessed: 12, message: 'Accessing [12] → Page 3 allocated' },
    { allocated: [0, 3, 5], accessed: 21, message: 'Accessing [21] → Page 5 allocated' },
    { allocated: [0, 3, 5], accessed: 13, message: 'Accessing [13] → already in Page 3' },
  ]

  let interval = null

  const animateNext = () => {
    step.value = (step.value + 1) % animations.length
    const anim = animations[step.value]
    allocatedPages.value = new Set(anim.allocated)
    accessedElement.value = anim.accessed
  }

  onMounted(() => {
    setTimeout(() => {
      interval = setInterval(animateNext, 2500)
    }, 1500)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const getPageForElement = (idx) => Math.floor(idx / pageSize)
  const isPageAllocated = (pageIdx) => allocatedPages.value.has(pageIdx)
  const isElementAccessible = (idx) => isPageAllocated(getPageForElement(idx))
</script>

<template>
  <div class="flex flex-col items-center gap-4 mt-4">
    <!-- PagedVector code block -->
    <div class="flex items-start gap-6">
      <div class="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <pre
          class="px-4 py-3 font-mono text-sm leading-relaxed"
        ><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">T</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#569cd6]">size_t</span> <span class="text-[#9cdcfe]">PageSize</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">PagedVector</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#4ec9b0]">SmallVector</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">T</span><span class="text-[#d4d4d4]">*&gt;</span> <span class="text-[#9cdcfe]">pages</span><span class="text-[#d4d4d4]">;</span>  <span class="text-[#6a9955]">// pointers to pages</span>
    <span class="text-[#4ec9b0]">size_t</span> <span class="text-[#9cdcfe]">size</span><span class="text-[#d4d4d4]">;</span>            <span class="text-[#6a9955]">// = {{ totalElements }}</span>
<span class="text-[#d4d4d4]">};</span></pre>
      </div>
    </div>

    <!-- Memory visualization - Pages -->
    <div class="flex flex-col items-center mt-4">
      <div class="text-gray-400 text-sm mb-3 font-semibold">
        Memory Pages (PageSize = {{ pageSize }})
      </div>

      <div class="flex gap-3">
        <div
          v-for="pageIdx in numPages"
          :key="'page-' + pageIdx"
          class="flex flex-col items-center"
        >
          <!-- Page label -->
          <div
            class="text-xs mb-1 font-mono"
            :class="isPageAllocated(pageIdx - 1) ? 'text-cyan-400' : 'text-gray-500'"
          >
            Page {{ pageIdx - 1 }}
          </div>

          <!-- Page content -->
          <div
            class="flex flex-col border-2 rounded overflow-hidden transition-all duration-500"
            :class="
              isPageAllocated(pageIdx - 1)
                ? 'border-cyan-400 shadow-lg shadow-cyan-900/50'
                : 'border-gray-600 border-dashed'
            "
          >
            <div
              v-for="i in pageSize"
              :key="'elem-' + (pageIdx - 1) * pageSize + i"
              class="font-mono text-xs text-center border-b last:border-b-0 transition-all duration-300 w-10 py-1"
              :class="[
                isPageAllocated(pageIdx - 1)
                  ? 'bg-cyan-800 text-white border-cyan-400'
                  : 'bg-gray-800 text-gray-600 border-gray-600',
                accessedElement === (pageIdx - 1) * pageSize + i - 1
                  ? 'ring-2 ring-yellow-400 bg-yellow-700'
                  : '',
              ]"
            >
              {{ (pageIdx - 1) * pageSize + i - 1 }}
            </div>
          </div>

          <!-- Allocation status -->
          <div
            class="text-xs mt-1 transition-all duration-500"
            :class="isPageAllocated(pageIdx - 1) ? 'text-cyan-400' : 'text-gray-600'"
          >
            {{ isPageAllocated(pageIdx - 1) ? '✓' : '○' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Status message -->
    <div class="mt-4 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-600">
      <span class="text-gray-300 font-mono text-sm">
        {{ animations[step].message }}
      </span>
    </div>
  </div>
</template>

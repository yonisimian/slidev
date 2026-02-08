<script setup>
  import { computed } from 'vue'
  import { useSlideContext } from '@slidev/client'

  const { $clicksContext: clicks } = useSlideContext()

  const properties = [
    {
      title: 'Non-owning',
      subtitle: 'Like StringRef/ArrayRef',
      borderClass: 'shadow-[0_0_2px_rgb(6,182,212)]',
      textColor: 'text-cyan-400',
      glowStyle: '0 0 8px rgba(6, 182, 212, 0.9), 0 0 20px rgba(6, 182, 212, 0.6)'
    },
    {
      title: 'Type-erased',
      subtitle: 'Any matching callable',
      borderClass: 'shadow-[0_0_2px_rgb(168,85,247)]',
      textColor: 'text-purple-400',
      glowStyle: '0 0 8px rgba(168, 85, 247, 0.9), 0 0 20px rgba(168, 85, 247, 0.6)'
    },
    {
      title: 'Trivially copyable',
      subtitle: 'Just 2 pointers',
      borderClass: 'shadow-[0_0_2px_rgb(34,197,94)]',
      textColor: 'text-green-400',
      glowStyle: '0 0 8px rgba(34, 197, 94, 0.9), 0 0 20px rgba(34, 197, 94, 0.6)'
    },
  ]

  const currentClick = computed(() => clicks?.current ?? 0)
</script>

<template>
  <div class="flex flex-col items-center gap-6 mt-4">
    <!-- function_ref code block -->
    <div class="flex items-start gap-6">
      <div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <pre
          class="px-4 py-3 font-mono text-sm leading-relaxed"
        ><span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">Fn</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">function_ref</span><span class="text-[#d4d4d4]">;</span>

<span class="text-[#569cd6]">template</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">typename</span> <span class="text-[#4ec9b0]">Ret</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#569cd6]">typename</span> <span class="text-[#d4d4d4]">...</span><span class="text-[#4ec9b0]">Params</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#569cd6]">class</span> <span class="text-[#4ec9b0]">function_ref</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Ret</span><span class="text-[#d4d4d4]">(</span><span class="text-[#4ec9b0]">Params</span><span class="text-[#d4d4d4]">...)&gt; {</span>
    <span class="text-[#4ec9b0]">Ret</span> <span class="text-[#d4d4d4]">(*</span><span class="text-[#9cdcfe]">callback</span><span class="text-[#d4d4d4]">)(</span><span class="text-[#569cd6]">intptr_t</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#4ec9b0]">Params</span><span class="text-[#d4d4d4]">...);</span>
    <span class="text-[#569cd6]">intptr_t</span> <span class="text-[#9cdcfe]">callable</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">};</span></pre>
      </div>
      <div class="text-gray-500 text-sm mt-2">← Just 16 bytes!</div>
    </div>

    <!-- Key properties -->
    <div class="flex gap-8 mt-8">
      <div
        v-for="(prop, idx) in properties"
        :key="idx"
        class="bg-gray-800/50 rounded-lg p-2 text-center transition-all duration-500"
        :class="[
          currentClick === idx + 1 ? 'scale-115' : prop.borderClass
        ]"
        :style="currentClick === idx + 1 ? { boxShadow: prop.glowStyle } : {}"
      >
        <div :class="[prop.textColor, 'font-bold text-sm']">{{ prop.title }}</div>
        <div class="text-gray-400 text-xs">{{ prop.subtitle }}</div>
      </div>
    </div>
  </div>
</template>

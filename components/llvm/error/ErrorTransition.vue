<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    clicks: {
      type: Number,
      default: 0,
    },
  })

  const items = [
    { id: 'optional', icon: '❓', title: 'Optional', subtitle: 'Maybe a value', color: 'cyan' },
    { id: 'expected', icon: '⚖️', title: 'Expected', subtitle: 'Value or Error', color: 'green' },
    { id: 'error', icon: '💥', title: 'Error', subtitle: 'Rich error info', color: 'red' },
    { id: 'exitonerror', icon: '🚪', title: 'ExitOnError', subtitle: 'Fail fast', color: 'orange' },
    {
      id: 'unreachable',
      icon: '🚫',
      title: 'llvm_unreachable',
      subtitle: 'Impossible state',
      color: 'purple',
    },
  ]

  const activeItem = computed(() => Math.min(props.clicks, items.length - 1))
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="text-2xl font-bold text-gray-300 mb-2">
      Error Handling <span class="text-red-400">World</span>
    </div>
    <div class="text-sm text-gray-500 mb-6">No exceptions. No excuses.</div>

    <div class="flex gap-4">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        class="card"
        :class="{
          'card-active': idx <= activeItem,
          'card-dim': idx > activeItem,
          [`card-${item.color}`]: idx <= activeItem,
        }"
      >
        <div class="card-icon">{{ item.icon }}</div>
        <div class="card-title">{{ item.title }}</div>
        <div class="card-subtitle">{{ item.subtitle }}</div>
      </div>
    </div>

    <!-- Flow diagram -->
    <div class="mt-8 flex items-center gap-3 text-sm">
      <div class="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-gray-400">
        Operation
      </div>
      <span class="text-gray-500">→</span>
      <div class="px-3 py-1 bg-cyan-900/30 border border-cyan-500/50 rounded text-cyan-300">
        Optional/Expected
      </div>
      <span class="text-gray-500">→</span>
      <div class="px-3 py-1 bg-green-900/30 border border-green-500/50 rounded text-green-300">
        Handle or Propagate
      </div>
    </div>

    <!-- Progress dots -->
    <div class="flex gap-2 mt-6">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="idx <= activeItem ? 'bg-red-400' : 'bg-gray-600'"
      />
    </div>
  </div>
</template>

<style scoped>
  .card {
    width: 130px;
    height: 110px;
    padding: 0.75rem;
    border-radius: 0.75rem;
    border: 2px solid;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
  }

  .card-dim {
    border-color: #4b5563;
    background: rgba(55, 65, 81, 0.3);
    opacity: 0.4;
    transform: scale(0.95);
  }

  .card-active {
    transform: scale(1);
    opacity: 1;
  }

  .card-cyan {
    border-color: #22d3ee;
    background: rgba(34, 211, 238, 0.1);
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.2);
  }

  .card-green {
    border-color: #4ade80;
    background: rgba(74, 222, 128, 0.1);
    box-shadow: 0 0 15px rgba(74, 222, 128, 0.2);
  }

  .card-red {
    border-color: #f87171;
    background: rgba(248, 113, 113, 0.1);
    box-shadow: 0 0 15px rgba(248, 113, 113, 0.2);
  }

  .card-orange {
    border-color: #fb923c;
    background: rgba(251, 146, 60, 0.1);
    box-shadow: 0 0 15px rgba(251, 146, 60, 0.2);
  }

  .card-purple {
    border-color: #c084fc;
    background: rgba(192, 132, 252, 0.1);
    box-shadow: 0 0 15px rgba(192, 132, 252, 0.2);
  }

  .card-icon {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .card-title {
    font-size: 0.8rem;
    font-weight: bold;
    color: #e5e7eb;
  }

  .card-subtitle {
    font-size: 0.65rem;
    color: #9ca3af;
    margin-top: 0.15rem;
  }
</style>

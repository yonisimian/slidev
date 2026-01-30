<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    clicks: {
      type: Number,
      default: 0,
    },
  })

  const cards = [
    {
      id: 'function_ref',
      icon: '🔗',
      title: 'function_ref',
      subtitle: 'Lightweight Callbacks',
      color: 'cyan',
    },
    {
      id: 'error',
      icon: '⚠️',
      title: 'Error Handling',
      subtitle: 'Optional • Expected • Error',
      color: 'orange',
    },
    {
      id: 'iteration',
      icon: '🔄',
      title: 'Iteration',
      subtitle: 'zip • enumerate • seq',
      color: 'green',
    },
    {
      id: 'formatting',
      icon: '📝',
      title: 'Formatting',
      subtitle: 'formatv • raw_ostream',
      color: 'purple',
    },
  ]

  const activeCard = computed(() => Math.min(props.clicks, cards.length - 1))
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="text-3xl font-bold text-gray-300 mb-8">
      Beyond Containers: <span class="text-yellow-400">Utilities</span>
    </div>

    <div class="grid grid-cols-4 gap-6">
      <div
        v-for="(card, idx) in cards"
        :key="card.id"
        class="card"
        :class="{
          'card-active': idx <= activeCard,
          'card-dim': idx > activeCard,
          [`card-${card.color}`]: idx <= activeCard,
        }"
      >
        <div class="card-icon">{{ card.icon }}</div>
        <div class="card-title">{{ card.title }}</div>
        <div class="card-subtitle">{{ card.subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card {
    width: 160px;
    height: 140px;
    padding: 1rem;
    border-radius: 1rem;
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
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
  }

  .card-orange {
    border-color: #fb923c;
    background: rgba(251, 146, 60, 0.1);
    box-shadow: 0 0 20px rgba(251, 146, 60, 0.2);
  }

  .card-green {
    border-color: #4ade80;
    background: rgba(74, 222, 128, 0.1);
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.2);
  }

  .card-purple {
    border-color: #c084fc;
    background: rgba(192, 132, 252, 0.1);
    box-shadow: 0 0 20px rgba(192, 132, 252, 0.2);
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .card-title {
    font-size: 0.9rem;
    font-weight: bold;
    color: #e5e7eb;
  }

  .card-subtitle {
    font-size: 0.7rem;
    color: #9ca3af;
    margin-top: 0.25rem;
  }
</style>

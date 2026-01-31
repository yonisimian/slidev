<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    phase: {
      type: Number,
      required: true,
    },
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
      color: 'cyan',
      description: 'lightweight callbacks',
    },
    {
      id: 'error',
      icon: '⚠️',
      title: 'Error Handling',
      color: 'orange',
      description: 'Optional • Expected • Error',
    },
    {
      id: 'iteration',
      icon: '🔄',
      title: 'Iteration',
      color: 'green',
      description: 'zip • enumerate • seq',
    },
    {
      id: 'formatting',
      icon: '📝',
      title: 'Formatting',
      color: 'purple',
      description: 'formatv • format_provider • FormatAdapter',
    },
  ]

  const activeCard = computed(() => props.phase + props.clicks - 1)
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-2xl font-bold text-gray-300 mb-8">
      Beyond Containers: <span class="text-yellow-400">Utilities</span>
    </div>

    <div class="grid grid-cols-4 gap-6">
      <div
        v-for="(card, idx) in cards"
        :key="card.id"
        class="card"
        :class="{
          'card-active': idx === activeCard,
          'card-dim': idx !== activeCard,
          [`card-${card.color}`]: true,
        }"
      >
        <div class="card-icon">{{ card.icon }}</div>
        <div class="card-title">{{ card.title }}</div>
        <div class="checkmark" v-if="phase > idx">✓</div>
      </div>
    </div>

    <div class="card-description">
      <span>{{ cards[activeCard]?.description ?? '' }}</span>
    </div>
  </div>
</template>

<style scoped>
  .card {
    width: 160px;
    height: 180px;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 3px solid;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.6s ease-out;
  }

  .card-dim {
    opacity: 0.4;
    transform: scale(0.9);
  }

  .card-active {
    transform: scale(1.1);
    opacity: 1;
  }

  .card-cyan {
    border-color: #22d3ee;
    background: linear-gradient(135deg, #164e63 0%, #0a3a47 100%);
  }

  .card-cyan.card-active {
    box-shadow: 0 0 50px rgba(34, 211, 238, 0.2);
  }

  .card-orange {
    border-color: #fb923c;
    background: linear-gradient(135deg, #78350f 0%, #4b290e 100%);
  }

  .card-orange.card-active {
    box-shadow: 0 0 50px rgba(251, 146, 60, 0.2);
  }

  .card-green {
    border-color: #4ade80;
    background: linear-gradient(135deg, #14532d 0%, #0f3621 100%);
  }

  .card-green.card-active {
    box-shadow: 0 0 50px rgba(74, 222, 128, 0.2);
  }

  .card-purple {
    border-color: #c084fc;
    background: linear-gradient(135deg, #5b21b6 0%, #3b0764 100%);
  }

  .card-purple.card-active {
    box-shadow: 0 0 50px rgba(192, 132, 252, 0.2);
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

  .checkmark {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #22c55e;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .card-description {
    color: #94a3b8;
    margin-top: 2.4rem;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    text-align: center;
  }
</style>

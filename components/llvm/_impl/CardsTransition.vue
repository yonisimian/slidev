<script setup lang="ts">
  import { computed } from 'vue'
  import type { Card } from '../common'

  const props = defineProps<{
    phase: number
    clicks: number
    title: string
    cards: Card[]
  }>()

  const activeCard = computed(() => props.phase + props.clicks - 1)
</script>

<template>
  <div class="grid grid-rows-3">
    <div
      v-if="title"
      class="flex justify-center items-center text-2xl font-bold text-gray-300 mt-8"
    >
      {{ title }}
    </div>

    <div
      class="flex justify-center items-center"
      :class="{
        'gap-16': cards.length === 2,
        'gap-12': cards.length === 3,
        'gap-8': cards.length === 4,
      }"
    >
      <div
        v-for="(card, idx) in cards"
        :key="card.id"
        class="flex flex-col justify-center items-center text-center w-40 h-45 p-6 rounded-2xl border-3 transition-all duration-600 ease-out"
        :class="{
          'opacity-100 scale-110 card-active': idx === activeCard,
          'opacity-40 scale-90': idx !== activeCard,
          [`card-${card.color}`]: true,
        }"
      >
        <div class="text-3xl mb-4">{{ card.icon }}</div>
        <div class="text-sm font-bold text-gray-200">{{ card.title }}</div>
        <div
          v-if="phase > idx"
          class="absolute -top-2.5 -right-2.5 w-7.5 h-7.5 bg-green-500 text-white rounded-full flex items-center justify-center font-bold"
        >
          ✓
        </div>
      </div>
    </div>

    <div class="text-[15px] text-center text-[#94a3b8] mt-12">
      <span>{{ cards[activeCard]?.description ?? '' }}</span>
    </div>
  </div>
</template>

<style scoped>
  .card-blue {
    border-color: #3b82f6;
    background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);
  }

  .card-blue.card-active {
    box-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
  }

  .card-teal {
    border-color: #14b8a6;
    background: linear-gradient(135deg, #134e4a 0%, #0d3330 100%);
  }

  .card-teal.card-active {
    box-shadow: 0 0 50px rgba(20, 184, 166, 0.5);
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
</style>

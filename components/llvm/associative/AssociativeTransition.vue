<script setup lang="ts">
  import { type Card } from '../common'

  defineProps<{
    phase: number
    clicks: number
  }>()

  const cards: Card[] = [
    {
      id: 'sets',
      icon: '🎯',
      title: 'Sets',
      color: 'orange',
      description: 'DenseSet • SmallSet • SmallPtrSet • StringSet • SparseSet • SparseMultiSet',
    },
    {
      id: 'maps',
      icon: '🗺️',
      title: 'Maps',
      color: 'teal',
      description: 'DenseMap • SmallDenseMap • StringMap • IndexedMap • IntervalMap • MapVector',
    },
  ]
</script>

<template>
  <CardsTransition :phase="phase" :clicks="clicks" :cards="cards" title="Associative Containers" />
</template>

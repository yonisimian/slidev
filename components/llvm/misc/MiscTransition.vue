<script setup lang="ts">
  import { type Card } from '../common'

  defineProps<{
    phase: number
    clicks: number
  }>()

  const cards: Card[] = [
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
</script>

<template>
  <CardsTransition :phase="phase" :clicks="clicks" :cards="cards" title="Utilities & Functions" />
</template>

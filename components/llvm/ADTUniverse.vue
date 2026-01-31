<script setup lang="ts">
  import { type Card } from './common'

  defineProps<{
    phase: number
    clicks: number
  }>()

  const cards: Card[] = [
    {
      id: 'sequential',
      icon: '📦',
      title: 'Sequential',
      color: 'blue',
      description: 'array-like • bits • strings',
    },
    {
      id: 'associative',
      icon: '🗂️',
      title: 'Associative',
      color: 'orange',
      description: 'sets • maps',
    },
    {
      id: 'miscellaneous',
      icon: '🧩',
      title: 'Miscellaneous',
      color: 'cyan',
      description: 'function_ref • error handling • iteration • formatting',
    },
  ]
</script>

<template>
  <CardsTransition :phase="phase" :clicks="clicks" :cards="cards" title="LLVM ADT Universe" />
</template>

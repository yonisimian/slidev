<script setup lang="ts">
  import { type Card } from '../../common'

  defineProps<{
    phase: number
    clicks: number
  }>()

  const cards: Card[] = [
    {
      id: 'optional',
      icon: '❓',
      title: 'Optional',
      color: 'cyan',
      description: 'maybe a value',
    },
    {
      id: 'expected',
      icon: '⚖️',
      title: 'Expected',
      color: 'green',
      description: 'Value or Error',
    },
    {
      id: 'error',
      icon: '💥',
      title: 'Error',
      color: 'red',
      description: 'Rich error info',
    },
    {
      id: 'exitonerror',
      icon: '🚪',
      title: 'ExitOnError',
      color: 'orange',
      description: 'Fail fast',
    },
    {
      id: 'unreachable',
      icon: '🚫',
      title: 'llvm_unreachable',
      color: 'purple',
      description: 'Impossible state',
    },
  ]
</script>

<template>
  <CardsTransition :phase="phase" :clicks="clicks" :cards="cards" title="Error Handling" />
</template>

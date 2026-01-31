<script setup lang="ts">
  import { type Card } from '../common'

  defineProps<{
    phase: number
    clicks: number
  }>()

  const cards: Card[] = [
    {
      id: 'array',
      icon: '📦',
      title: 'Array-like',
      color: 'blue',
      description: 'ArrayRef • SmallVector • PagedVector • PackedVector',
    },
    {
      id: 'bit',
      icon: '🔢',
      title: 'Bit',
      color: 'purple',
      description: 'BitVector • SmallBitVector • SparseBitVector • CoalescingBitVector',
    },
    {
      id: 'string',
      icon: '📝',
      title: 'String',
      color: 'green',
      description: 'StringRef • Twine • SmallString',
    },
  ]
</script>

<template>
  <CardsTransition :phase="phase" :clicks="clicks" :cards="cards" title="Sequential Containers" />
</template>

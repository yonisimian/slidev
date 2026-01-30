<script setup>
  defineProps({
    phase: {
      type: Number,
      default: 0, // 0 = showing Sequential, 1 = Sequential→Associative, 2 = Associative→Misc
    },
    clicks: {
      type: Number,
      default: 0,
    },
  })

  const categories = {
    sequential:
      'ArrayRef • SmallVector • PagedVector • PackedVector • BitVector • SmallBitVector • SparseBitVector • CoalescingBitVector • StringRef • Twine • SmallString',
    associative: 'DenseSet • SmallSet • DenseMap • SmallDenseMap • StringMap • ...',
    miscellaneous: 'PointerUnion • TinyPtrVector • IntervalMap • ...',
  }
</script>

<template>
  <div>
    <div class="universe-title">ADT Universe</div>

    <div class="categories-container">
      <!-- Sequential Containers -->
      <div
        class="category-card sequential-card"
        :class="{
          selected: phase === 0 && clicks === 0,
          shrink: phase === 0 && clicks === 1,
          done: phase >= 1,
        }"
      >
        <div class="category-icon">📦</div>
        <div class="category-title">Sequential</div>
        <div class="category-subtitle">Containers</div>
        <div class="category-count">11 classes</div>
        <div class="category-status" v-if="phase >= 1">✓</div>
      </div>

      <!-- Associative Containers -->
      <div
        class="category-card associative-card"
        :class="{
          dim: phase === 0 && clicks === 0,
          grow: phase === 0 && clicks === 1,
          selected: phase === 1 && clicks === 0,
          'shrink-orange': phase === 1 && clicks === 1,
          done: phase >= 2,
        }"
      >
        <div class="category-icon">🗂️</div>
        <div class="category-title">Associative</div>
        <div class="category-subtitle">Containers</div>
        <div class="category-count">Sets & Maps</div>
        <div class="category-status" v-if="phase >= 2">✓</div>
      </div>

      <!-- Miscellaneous -->
      <div
        class="category-card misc-card"
        :class="{
          dim: phase <= 1 && !(phase === 1 && clicks === 1),
          'grow-cyan': phase === 1 && clicks === 1,
        }"
      >
        <div class="category-icon">🧩</div>
        <div class="category-title">Miscellaneous</div>
        <div class="category-subtitle">Utilities</div>
        <div class="category-count">Specialized</div>
      </div>
    </div>

    <div class="category-list">
      <span v-if="phase === 0 && clicks === 0">{{ categories.sequential }}</span>
      <span v-else-if="phase === 0 && clicks === 1">{{ categories.associative }}</span>
      <span v-else-if="phase === 1 && clicks === 0">{{ categories.associative }}</span>
      <span v-else-if="phase === 1 && clicks === 1">{{ categories.miscellaneous }}</span>
    </div>
  </div>
</template>

<style scoped>
  .universe-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e2e8f0;
    text-align: center;
    margin-bottom: 2rem;
    letter-spacing: 0.1em;
  }

  .categories-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }

  .category-card {
    width: 180px;
    height: 200px;
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

  .category-card.dim {
    opacity: 0.4;
    transform: scale(0.9);
  }

  .category-card.done {
    opacity: 0.4;
    transform: scale(0.9);
  }

  .category-card.selected {
    transform: scale(1.1);
  }

  /* Sequential - Blue theme */
  .sequential-card {
    background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);
    border-color: #3b82f6;
  }

  .sequential-card.selected {
    box-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
  }

  /* Associative - Orange theme */
  .associative-card {
    background: linear-gradient(135deg, #5f3a1e 0%, #442710 100%);
    border-color: #f59e0b;
  }

  .associative-card.selected {
    box-shadow: 0 0 50px rgba(245, 158, 11, 0.5);
  }

  /* Miscellaneous - Cyan theme */
  .misc-card {
    background: linear-gradient(135deg, #164e63 0%, #0c3344 100%);
    border-color: #06b6d4;
  }

  .category-status {
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

  .category-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .category-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
  }

  .category-subtitle {
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .category-count {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.5rem;
  }

  .category-list {
    color: #94a3b8;
    margin-top: 3rem;
    font-size: 0.7rem;
    letter-spacing: 0.03em;
    text-align: center;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  /* Animations */
  @keyframes shrinkDown {
    from {
      transform: scale(1.1);
      opacity: 1;
    }

    to {
      transform: scale(0.9);
      opacity: 0.4;
    }
  }

  @keyframes growUp {
    from {
      transform: scale(0.9);
      opacity: 0.4;
    }

    to {
      transform: scale(1.1);
      opacity: 1;
      box-shadow: 0 0 50px rgba(245, 158, 11, 0.5);
    }
  }

  @keyframes growUpCyan {
    from {
      transform: scale(0.9);
      opacity: 0.4;
    }

    to {
      transform: scale(1.1);
      opacity: 1;
      box-shadow: 0 0 50px rgba(6, 182, 212, 0.5);
    }
  }

  .shrink {
    animation: shrinkDown 0.6s ease-out forwards;
  }

  .shrink-orange {
    animation: shrinkDown 0.6s ease-out forwards;
  }

  .grow {
    animation: growUp 0.6s ease-out forwards;
  }

  .grow-cyan {
    animation: growUpCyan 0.6s ease-out forwards;
  }
</style>

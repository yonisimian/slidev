<script setup>
  defineProps({
    phase: {
      type: Number,
      default: 0, // 0 = intro to Sets, 1 = Sets→Maps
    },
    clicks: {
      type: Number,
      default: 0,
    },
  })

  const containers = {
    sets: 'DenseSet • SmallSet • SmallPtrSet • StringSet • SparseSet • SparseMultiSet',
    maps: 'DenseMap • SmallDenseMap • StringMap • IndexedMap • IntervalMap • MapVector',
  }
</script>

<template>
  <div>
    <div class="worlds-container">
      <!-- Sets -->
      <div
        class="world-card set-world"
        :class="{
          dim: phase === 0 && clicks === 0,
          'grow-orange': phase === 0 && clicks === 1,
          selected: phase === 1 && clicks === 0,
          shrink: phase === 1 && clicks === 1,
          done: phase >= 2,
        }"
      >
        <div class="world-icon">🎯</div>
        <div class="world-title">Sets</div>
        <div class="world-subtitle">Unique Keys</div>
        <div class="world-status" v-if="phase >= 1">✓</div>
      </div>

      <!-- Maps -->
      <div
        class="world-card map-world"
        :class="{
          dim: phase === 0 || (phase === 1 && clicks === 0),
          grow: phase === 1 && clicks === 1,
          selected: phase === 2 && clicks === 0,
        }"
      >
        <div class="world-icon">🗺️</div>
        <div class="world-title">Maps</div>
        <div class="world-subtitle">Key-Value Pairs</div>
        <div class="world-status" v-if="phase >= 2">✓</div>
      </div>
    </div>

    <div class="container-list">
      <span v-if="phase === 0">{{ containers.sets }}</span>
      <span v-else-if="phase === 1 && clicks === 0">{{ containers.sets }}</span>
      <span v-else-if="phase === 1 && clicks === 1">{{ containers.maps }}</span>
      <span v-else-if="phase === 2">{{ containers.maps }}</span>
    </div>
  </div>
</template>

<style scoped>
  .worlds-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
  }

  .world-card {
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

  .world-card.dim {
    opacity: 0.4;
    transform: scale(0.9);
  }

  .world-card.done {
    opacity: 0.4;
    transform: scale(0.9);
  }

  .world-card.selected {
    transform: scale(1.1);
  }

  /* Sets - Orange/Amber theme */
  .set-world {
    background: linear-gradient(135deg, #5f3a1e 0%, #442710 100%);
    border-color: #f59e0b;
  }

  .set-world.selected {
    box-shadow: 0 0 50px rgba(245, 158, 11, 0.5);
  }

  /* Maps - Teal theme */
  .map-world {
    background: linear-gradient(135deg, #134e4a 0%, #0d3330 100%);
    border-color: #14b8a6;
  }

  .map-world.selected {
    box-shadow: 0 0 50px rgba(20, 184, 166, 0.5);
  }

  .world-status {
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

  .world-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .world-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
  }

  .world-subtitle {
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .container-list {
    color: #94a3b8;
    margin-top: 4rem;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    text-align: center;
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
      box-shadow: 0 0 50px rgba(20, 184, 166, 0.5);
    }
  }

  @keyframes growUpOrange {
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

  .shrink {
    animation: shrinkDown 0.6s ease-out forwards;
  }

  .grow {
    animation: growUp 0.6s ease-out forwards;
  }

  .grow-orange {
    animation: growUpOrange 0.6s ease-out forwards;
  }
</style>

<script setup>
defineProps({
    phase: {
        type: Number,
        default: 0  // 0 = Sequential→Bit, 1 = Bit→String
    },
    clicks: {
        type: Number,
        default: 0
    }
})

const containers = {
    sequential: 'ArrayRef • SmallVector • PagedVector • PackedVector',
    bit: 'BitVector • SmallBitVector • SparseBitVector • CoalescingBitVector',
    string: 'StringRef • Twine • SmallString'
}
</script>

<template>
    <div>
        <div class="worlds-container">
            <!-- Array-like -->
            <div class="world-card array-world" :class="{
                'selected': phase === 0 && clicks === 0,
                'shrink': phase === 0 && clicks === 1,
                'done': phase >= 1
            }">
                <div class="world-icon">📦</div>
                <div class="world-title">Array-like</div>
                <div class="world-subtitle">Containers</div>
                <div class="world-status">✓</div>
            </div>

            <!-- Bit -->
            <div class="world-card bit-world" :class="{
                'dim': phase === 0 && clicks === 0,
                'grow': phase === 0 && clicks === 1,
                'selected': phase === 1 && clicks === 0,
                'shrink-purple': phase === 1 && clicks === 1,
                'done': phase >= 2
            }">
                <div class="world-icon">🔢</div>
                <div class="world-title">Bit</div>
                <div class="world-subtitle">Containers</div>
                <div v-if="phase >= 1" class="world-status">✓</div>
            </div>

            <!-- String -->
            <div class="world-card string-world" :class="{
                'dim': phase === 0 || (phase === 1 && clicks === 0),
                'grow-green': phase === 1 && clicks === 1
            }">
                <div class="world-icon">📝</div>
                <div class="world-title">String</div>
                <div class="world-subtitle">Containers</div>
            </div>
        </div>

        <div class="container-list">
            <span v-if="phase === 0 && clicks === 0">{{ containers.sequential }}</span>
            <span v-else-if="phase === 0 && clicks === 1">{{ containers.bit }}</span>
            <span v-else-if="phase === 1 && clicks === 0">{{ containers.bit }}</span>
            <span v-else-if="phase === 1 && clicks === 1">{{ containers.string }}</span>
        </div>
    </div>
</template>

<style scoped>
.worlds-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
}

.world-card {
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
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.5);
}

.array-world {
    background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);
    border-color: #3b82f6;
}

.array-world.selected {
    box-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
}

.bit-world {
    background: linear-gradient(135deg, #4a1d6a 0%, #2d1240 100%);
    border-color: #a855f7;
}

.bit-world.selected {
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.5);
}

.string-world {
    background: linear-gradient(135deg, #1a4a3a 0%, #0f2a22 100%);
    border-color: #10b981;
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
    font-size: 1.3rem;
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
        box-shadow: 0 0 50px rgba(168, 85, 247, 0.5);
    }
}

@keyframes growUpGreen {
    from {
        transform: scale(0.9);
        opacity: 0.4;
    }

    to {
        transform: scale(1.1);
        opacity: 1;
        box-shadow: 0 0 50px rgba(16, 185, 129, 0.5);
    }
}

.shrink {
    animation: shrinkDown 0.6s ease-out forwards;
}

.shrink-purple {
    animation: shrinkDown 0.6s ease-out forwards;
}

.grow {
    animation: growUp 0.6s ease-out forwards;
}

.grow-green {
    animation: growUpGreen 0.6s ease-out forwards;
}
</style>

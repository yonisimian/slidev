<script setup>
  import { ref, onMounted } from 'vue'

  const phase = ref(0)

  onMounted(() => {
    setTimeout(() => (phase.value = 1), 600)
    setTimeout(() => (phase.value = 2), 1200)
    setTimeout(() => (phase.value = 3), 1800)
  })

  const getVector = () => {
    if (phase.value === 0) return []
    if (phase.value === 1) return [{ id: 1, val: 'foo' }]
    if (phase.value === 2)
      return [
        { id: 1, val: 'foo' },
        { id: 2, val: 'bar' },
      ]
    return [
      { id: 1, val: 'foo' },
      { id: 2, val: 'bar' },
    ] // "foo" already has ID 1
  }

  const getMap = () => {
    if (phase.value === 0) return {}
    if (phase.value === 1) return { foo: 1 }
    if (phase.value === 2) return { foo: 1, bar: 2 }
    return { foo: 1, bar: 2 }
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Title -->
    <div class="text-lg font-bold text-amber-400 mb-6">UniqueVector - Elements with Stable IDs</div>

    <div class="flex gap-12 items-start">
      <!-- Vector (ID → Element) -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-gray-400 mb-2">Vector (ID → Element)</div>
        <div class="flex flex-col gap-1">
          <div
            v-for="item in getVector()"
            :key="item.id"
            class="flex items-center gap-2 transition-all duration-300"
          >
            <div
              class="w-8 h-8 border-2 border-amber-400 bg-amber-400/20 rounded flex items-center justify-center text-sm font-mono text-amber-300"
            >
              {{ item.id }}
            </div>
            <span class="text-gray-500">→</span>
            <div
              class="px-3 h-8 border-2 border-green-400 bg-green-400/20 rounded flex items-center justify-center text-sm font-mono text-green-300"
            >
              "{{ item.val }}"
            </div>
          </div>
          <div v-if="getVector().length === 0" class="text-gray-500 text-sm">(empty)</div>
        </div>
      </div>

      <!-- Bidirectional arrow -->
      <div class="text-2xl text-gray-500 mt-8">↔</div>

      <!-- Map (Element → ID) -->
      <div class="flex flex-col items-center">
        <div class="text-sm text-gray-400 mb-2">Map (Element → ID)</div>
        <div class="flex flex-col gap-1">
          <div
            v-for="(id, key) in getMap()"
            :key="key"
            class="flex items-center gap-2 transition-all duration-300"
          >
            <div
              class="px-3 h-8 border-2 border-blue-400 bg-blue-400/20 rounded flex items-center justify-center text-sm font-mono text-blue-300"
            >
              "{{ key }}"
            </div>
            <span class="text-gray-500">→</span>
            <div
              class="w-8 h-8 border-2 border-amber-400 bg-amber-400/20 rounded flex items-center justify-center text-sm font-mono text-amber-300"
            >
              {{ id }}
            </div>
          </div>
          <div v-if="Object.keys(getMap()).length === 0" class="text-gray-500 text-sm">(empty)</div>
        </div>
      </div>
    </div>

    <!-- Duplicate handling -->
    <div
      v-if="phase === 3"
      class="mt-4 px-4 py-2 bg-blue-400/20 border border-blue-400 rounded-lg text-sm text-blue-300 transition-all duration-300"
    >
      insert("foo") → Already exists → Returns existing ID: 1
    </div>

    <!-- Phase indicator -->
    <div class="mt-6 flex gap-2">
      <div
        v-for="(label, i) in ['Empty', 'insert foo → 1', 'insert bar → 2', 'insert foo → 1']"
        :key="i"
        class="px-2 py-1 rounded text-xs transition-all duration-300"
        :class="phase === i ? 'bg-amber-500 text-black' : 'bg-gray-700 text-gray-400'"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

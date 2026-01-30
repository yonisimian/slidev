<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const phase = ref(0)
  let interval = null

  const animations = [
    { tree: [{ k: 5, v: 'E' }], newNode: null, action: 'ImmutableMap M1 with root 5:E' },
    {
      tree: [
        {
          k: 5,
          v: 'E',
          c: [
            { k: 2, v: 'B' },
            { k: 8, v: 'H' },
          ],
        },
      ],
      newNode: null,
      action: 'Add children 2:B and 8:H',
    },
    {
      tree: [
        {
          k: 5,
          v: 'E',
          c: [
            { k: 2, v: 'B' },
            { k: 8, v: 'H' },
          ],
        },
      ],
      newNode: null,
      action: 'M2 = M1.add(3, C)...',
    },
    {
      tree: [
        {
          k: 5,
          v: 'E',
          c: [
            { k: 2, v: 'B', c: [null, { k: 3, v: 'C', new: true }] },
            { k: 8, v: 'H', shared: true },
          ],
          modified: true,
        },
      ],
      newNode: { k: 3, v: 'C' },
      action: 'New node 3:C, path copied',
    },
    {
      tree: [
        {
          k: 5,
          v: 'E',
          c: [
            { k: 2, v: 'B', c: [null, { k: 3, v: 'C' }] },
            { k: 8, v: 'H', shared: true },
          ],
        },
      ],
      newNode: null,
      action: 'M1 unchanged! M2 shares 8:H',
    },
    {
      tree: [
        {
          k: 5,
          v: 'E',
          c: [
            { k: 2, v: 'B', c: [null, { k: 3, v: 'C' }] },
            { k: 8, v: 'H' },
          ],
        },
      ],
      newNode: null,
      action: 'Functional updates, O(log n) memory!',
    },
  ]

  onMounted(() => {
    interval = setInterval(() => {
      phase.value = (phase.value + 1) % animations.length
    }, 2000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const current = () => animations[phase.value]
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-lg font-bold text-teal-400 mb-4">ImmutableMap — Structural Sharing</div>

    <!-- Tree visualization -->
    <div class="flex flex-col items-center gap-3">
      <!-- Root level -->
      <div
        class="w-14 h-10 border-2 rounded flex items-center justify-center transition-all duration-500"
        :class="{
          'border-teal-400 bg-teal-400/20': !current().tree[0].modified,
          'border-yellow-400 bg-yellow-400/20': current().tree[0].modified,
        }"
      >
        <span
          class="text-xs font-mono"
          :class="{
            'text-teal-300': !current().tree[0].modified,
            'text-yellow-300': current().tree[0].modified,
          }"
          >{{ current().tree[0].k }}:{{ current().tree[0].v }}</span
        >
      </div>

      <!-- Level 1 children -->
      <div v-if="current().tree[0].c" class="flex gap-12 transition-all duration-500">
        <div
          v-for="(child, idx) in current().tree[0].c"
          :key="idx"
          class="flex flex-col items-center gap-2"
        >
          <div
            class="w-14 h-10 border-2 rounded flex items-center justify-center transition-all duration-500 relative"
            :class="{
              'border-teal-400 bg-teal-400/20': !child.shared && !child.c,
              'border-cyan-400 bg-cyan-400/20': child.shared,
              'border-yellow-400 bg-yellow-400/20': child.c,
            }"
          >
            <span
              class="text-xs font-mono"
              :class="{
                'text-teal-300': !child.shared && !child.c,
                'text-cyan-300': child.shared,
                'text-yellow-300': child.c,
              }"
              >{{ child.k }}:{{ child.v }}</span
            >
            <span v-if="child.shared" class="absolute -top-2 -right-2 text-xs text-cyan-400"
              >↗M1</span
            >
          </div>

          <!-- Level 2 children -->
          <div v-if="child.c" class="flex gap-4 transition-all duration-500">
            <template v-for="(grandchild, gidx) in child.c" :key="gidx">
              <div
                v-if="grandchild"
                class="w-14 h-10 border-2 rounded flex items-center justify-center transition-all duration-500"
                :class="{
                  'border-green-400 bg-green-400/20': grandchild.new,
                  'border-teal-400 bg-teal-400/20': !grandchild.new,
                }"
              >
                <span
                  class="text-xs font-mono"
                  :class="{
                    'text-green-300': grandchild.new,
                    'text-teal-300': !grandchild.new,
                  }"
                  >{{ grandchild.k }}:{{ grandchild.v }}</span
                >
              </div>
              <div
                v-else
                class="w-14 h-10 border border-dashed border-gray-600 rounded opacity-30"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- New node indicator -->
    <div
      v-if="current().newNode"
      class="mt-4 px-3 py-1 border border-green-400/50 bg-green-400/10 rounded-lg flex items-center gap-2 transition-all duration-300"
    >
      <span class="text-green-400">+</span>
      <span class="text-green-300 font-mono text-sm"
        >{{ current().newNode.k }}:{{ current().newNode.v }}</span
      >
      <span class="text-gray-400 text-xs">(new)</span>
    </div>

    <!-- Current action -->
    <div
      class="mt-4 h-6 text-sm font-mono transition-all duration-300"
      :class="{
        'text-teal-400': current().action.includes('root') || current().action.includes('children'),
        'text-yellow-400': current().action.includes('add'),
        'text-green-400':
          current().action.includes('New node') || current().action.includes('Functional'),
        'text-cyan-400':
          current().action.includes('unchanged') || current().action.includes('shares'),
      }"
    >
      {{ current().action }}
    </div>

    <!-- Legend -->
    <div class="mt-4 flex gap-4 text-xs">
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 border border-teal-400 bg-teal-400/20 rounded"></div>
        <span class="text-gray-400">Node</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 border border-yellow-400 bg-yellow-400/20 rounded"></div>
        <span class="text-gray-400">Path copy</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 border border-green-400 bg-green-400/20 rounded"></div>
        <span class="text-gray-400">New</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 border border-cyan-400 bg-cyan-400/20 rounded"></div>
        <span class="text-gray-400">Shared</span>
      </div>
    </div>
  </div>
</template>

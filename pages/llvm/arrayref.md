---
layout: center
---

<h1 class="view-transition-block">ArrayRef</h1>

<div class="text-gray-400 text-xl">A lightweight, non-owning reference to a contiguous array</div>

---

<h1 class="view-transition-block">ArrayRef</h1>

<ArrayRefPtrLen />

---

<h1 class="view-transition-block">ArrayRef</h1>

<div class="h-80 flex items-center justify-center">
  <div class="flex gap-12 items-center">
    <!-- Left side: various sources -->
    <div class="flex flex-col gap-4">
      <div
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
        class="bg-purple-600 px-4 py-2 rounded font-mono text-sm"
      >int arr[5]</div>
      <div
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 400 } }"
        class="bg-orange-600 px-4 py-2 rounded font-mono text-sm"
      >std::vector&lt;int&gt;</div>
      <div
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 600 } }"
        class="bg-teal-600 px-4 py-2 rounded font-mono text-sm"
      >SmallVector&lt;int, 4&gt;</div>
      <div
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 800 } }"
        class="bg-pink-600 px-4 py-2 rounded font-mono text-sm"
      >{1, 2, 3, 4, 5}</div>
    </div>
    <!-- Arrows -->
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0 }"
      :enter="{ opacity: 1, scale: 1, transition: { delay: 1000 } }"
      class="text-4xl text-gray-400"
    >→</div>
    <!-- Right side: ArrayRef -->
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.5 }"
      :enter="{ opacity: 1, scale: 1, transition: { delay: 1200, type: 'spring', stiffness: 100 } }"
      class="bg-blue-500 px-8 py-6 rounded-xl font-mono text-xl shadow-lg shadow-blue-500/30"
    >ArrayRef&lt;int&gt;</div>
  </div>
</div>

<div
  v-motion
  :initial="{ opacity: 0, y: 20 }"
  :enter="{ opacity: 1, y: 0, transition: { delay: 1600 } }"
  class="text-center text-gray-400 mt-4"
>
  Implicit conversions - zero runtime cost
</div>

---

<h1 class="view-transition-block">ArrayRef</h1>

```cpp {all|1-2|4-6|8-10|12-13|all}
// Function signature - accepts ANY contiguous container
void processData(ArrayRef<int> data);

// Called with a C array
int arr[] = {1, 2, 3, 4, 5};
processData(arr);

// Called with a vector - no copy!
std::vector<int> vec = {1, 2, 3};
processData(vec);

// Called with an initializer list
processData({10, 20, 30});
```

<div v-click class="mt-8 p-4 bg-blue-900/30 rounded-lg border border-blue-500/50">
  <div class="text-blue-300 font-semibold">💡 Key Insight</div>
  <div class="text-gray-300 mt-2">Use <code>ArrayRef&lt;T&gt;</code> as a parameter type whenever you need read-only access to contiguous data!</div>
</div>

---
layout: center
---

<h1 class="view-transition-block">CoalescingBitVector</h1>

<div class="text-gray-400 text-xl">Optimized for contiguous ranges — coalesces adjacent set bits</div>

---

<h1 class="view-transition-block">CoalescingBitVector</h1>

<CoalescingBitVectorLayout />

---

<h1 class="view-transition-block">CoalescingBitVector</h1>

<CoalescingBitVectorSources />

````md magic-move
```cpp
CoalescingBitVector<> live;
live.set(100); live.set(101); live.set(102);
// Stored as single interval [100, 102]
```

```cpp
CoalescingBitVector<> live;
for (int i = 0; i < 10000; i++) live.set(i);
// ONE interval: [0, 9999] — O(log 1) lookup!
```

```cpp
CoalescingBitVector<> liveRange;
for (unsigned i = def; i < use; i++) liveRange.set(i);
if (liveRange.test(instIdx)) { /* value live here */ }
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 O(log n) find where n = <span class="text-purple-300 font-semibold">number of gaps</span>, not bits!
</div>

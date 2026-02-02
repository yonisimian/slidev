---
layout: center
---

<h1 class="view-transition-block">IntervalMap</h1>

<div class="text-gray-400 text-xl">Maps disjoint intervals to values with automatic coalescing</div>

<!--
- **Interval Keys**: Map [start, end) ranges to values
- **Coalescing**: Adjacent intervals with same value merge
- **B+ Tree**: Efficient for large numbers of intervals
- **Use Case**: Live ranges, address ranges, debug info
-->

---

<h1 class="view-transition-block">IntervalMap</h1>

<IntervalMapLayout />

---

<h1 class="view-transition-block">IntervalMap</h1>

<IntervalMapSources />

````md magic-move
```cpp
// Map instruction ranges to values
IntervalMap<SlotIndex, unsigned> LiveRanges(Allocator);
LiveRanges.insert(DefSlot, KillSlot, VRegNum);
```

```cpp
// Query at a point
unsigned VReg = LiveRanges.lookup(Slot);
// Or iterate intervals
for (auto I = LiveRanges.begin(); I != LiveRanges.end(); ++I)
  errs() << "[" << I.start() << "," << I.stop() << ") = " << *I;
```

```cpp
// Intervals coalesce automatically
LiveRanges.insert(0, 10, 1);   // [0, 10) → 1
LiveRanges.insert(10, 20, 1);  // [10, 20) → 1
// Result: single interval [0, 20) → 1
```

```cpp
// Overlapping intervals overwrite
LiveRanges.insert(0, 10, 1);
LiveRanges.insert(5, 15, 2);
// [0, 5) → 1, [5, 15) → 2
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 For <span class="text-purple-300 font-semibold">live ranges</span> and 
  <span class="text-purple-300 font-semibold">address intervals</span> in CodeGen!
</div>

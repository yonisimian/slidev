---
layout: center
---

<h1 class="view-transition-block">IntervalTree</h1>

<div class="text-gray-400 text-xl">Query all intervals overlapping a point or range</div>

<!--
- **Overlap Queries**: Find all intervals containing a point
- **Augmented Tree**: Red-black tree with max endpoint tracking
- **Multiple Results**: Returns all overlapping intervals
- **Use Case**: Debug info ranges, memory regions, profile data
-->

---

<h1 class="view-transition-block">IntervalTree</h1>

<IntervalTreeLayout />

---

<h1 class="view-transition-block">IntervalTree</h1>

<IntervalTreeSources />

````md magic-move
```cpp
// Different from IntervalMap: allows overlapping intervals!
IntervalTree<unsigned, StringRef> Ranges;
Ranges.insert(0, 10, "A");
Ranges.insert(5, 15, "B");   // Overlaps with A!
Ranges.insert(20, 30, "C");
```

```cpp
// Query: what intervals contain point 7?
auto Results = Ranges.getContaining(7);
// Returns: ["A", "B"] — both intervals!
```

```cpp
// Query: what intervals overlap [8, 25]?
auto Overlaps = Ranges.getOverlapping(8, 25);
// Returns: ["A", "B", "C"]
```

```cpp
// Real use: find debug info for an address
IntervalTree<uint64_t, DILocation*> DebugRanges;
for (auto &F : M)
  for (auto &I : instructions(F))
    if (auto Loc = I.getDebugLoc())
      DebugRanges.insert(getAddr(&I), getEnd(&I), Loc);
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 <span class="text-cyan-300 font-semibold">IntervalMap</span>: disjoint, single result | 
  <span class="text-purple-300 font-semibold">IntervalTree</span>: overlapping, multiple results
</div>

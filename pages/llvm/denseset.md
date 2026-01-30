---
layout: center
---

<h1 class="view-transition-block">DenseSet</h1>

<div class="text-gray-400 text-xl">A hash set with quadratic probing for cache-friendly lookups</div>

<!--
- **Open Addressing**: Elements stored directly in buckets (no linked lists)
- **Quadratic Probing**: Cache-friendly collision resolution
- **Tombstones**: Supports efficient deletion without rehashing
- **Power-of-2 Size**: Fast modulo via bit masking
-->

---
layout: default
---

<h1 class="view-transition-block">DenseSet</h1>

<DenseSetLayout />

---
layout: default
---

<h1 class="view-transition-block">DenseSet</h1>

<DenseSetSources />

````md magic-move
```cpp
// Creating a DenseSet
DenseSet<Value*> Visited;
DenseSet<unsigned> Indices;

// Custom hash via DenseMapInfo<T>
DenseSet<MyType> Custom;  // Requires DenseMapInfo specialization
```

```cpp
// Insert and query
Visited.insert(V);
if (Visited.count(V))         // O(1) average
  return true;
Visited.erase(V);             // Leaves tombstone
```

```cpp
// Efficient iteration
for (Value *V : Visited) {
  // Skips empty slots and tombstones automatically
  processValue(V);
}
```
````

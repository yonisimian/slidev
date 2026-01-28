---
layout: intro
---

# DenseSet

<div class="text-xl text-gray-400 mt-4">
A hash set with quadratic probing for cache-friendly lookups
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Open Addressing**: Elements stored directly in buckets (no linked lists)
- **Quadratic Probing**: Cache-friendly collision resolution
- **Tombstones**: Supports efficient deletion without rehashing
- **Power-of-2 Size**: Fast modulo via bit masking

</v-clicks>
</div>

---
layout: default
---

# DenseSet Memory Layout

<DenseSetLayout />

---
layout: default
---

# DenseSet API & Usage

<DenseSetSources />

<div class="mt-4 text-sm text-gray-500">
Header: <code>llvm/ADT/DenseSet.h</code>
</div>

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

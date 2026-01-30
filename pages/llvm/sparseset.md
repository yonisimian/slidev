---
layout: center
---

<h1 class="view-transition-block">SparseSet</h1>

<div class="text-gray-400 text-xl">A set with O(1) operations for dense integer universes</div>

<!--
- **Two Arrays**: Sparse (indexed by value) + Dense (compact storage)
- **O(1) Everything**: Insert, delete, lookup, and iteration
- **No Tombstones**: Clean deletion without rehashing
- **SparseMultiSet**: Variant allowing duplicate keys with counts
-->

---
layout: default
---

<h1 class="view-transition-block">SparseSet</h1>

<SparseSetLayout />

---
layout: default
---

<h1 class="view-transition-block">SparseSet</h1>

<SparseSetSources />

````md magic-move
```cpp
// Creating a SparseSet for register numbers
SparseSet<unsigned> LiveRegs;
LiveRegs.setUniverse(NumRegs);  // Max register number

// SparseMultiSet for multiple occurrences
SparseMultiSet<unsigned> Uses;
Uses.setUniverse(NumRegs);
```

```cpp
// O(1) insert and query
LiveRegs.insert(RAX);
if (LiveRegs.count(RAX))
  markLive(RAX);
LiveRegs.erase(RAX);  // O(1) delete!
```

```cpp
// Fast iteration over dense array
for (unsigned Reg : LiveRegs) {
  // Iterates only over present elements
  // No empty slots to skip
  emitSave(Reg);
}
```
````

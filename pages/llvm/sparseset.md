---
layout: intro
---

# SparseSet

<div class="text-xl text-gray-400 mt-4">
A set with O(1) operations for dense integer universes
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Two Arrays**: Sparse (indexed by value) + Dense (compact storage)
- **O(1) Everything**: Insert, delete, lookup, and iteration
- **No Tombstones**: Clean deletion without rehashing
- **SparseMultiSet**: Variant allowing duplicate keys with counts

</v-clicks>
</div>

---
layout: default
---

# SparseSet Memory Layout

<SparseSetLayout />

---
layout: default
---

# SparseSet API & Usage

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

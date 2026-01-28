---
layout: intro
---

# SmallSet

<div class="text-xl text-gray-400 mt-4">
A small set with inline storage optimization
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Inline Storage**: Stores up to N elements in a linear array (no allocation)
- **Automatic Upgrade**: Switches to `std::set` when exceeding threshold
- **Linear Search**: Fast for small sets due to cache locality
- **SmallPtrSet**: Specialized variant for pointer types with better hashing

</v-clicks>
</div>

---
layout: default
---

# SmallSet Memory Layout

<SmallSetLayout />

---
layout: default
---

# SmallSet API & Usage

<SmallSetSources />

<div class="mt-4 text-sm text-gray-500">
Header: <code>llvm/ADT/SmallSet.h</code> • <code>llvm/ADT/SmallPtrSet.h</code>
</div>

````md magic-move
```cpp
// Creating SmallSets with inline capacity
SmallSet<int, 8> Visited;       // 8 elements inline
SmallSet<Value*, 16> Seen;      // 16 pointers inline
SmallPtrSet<Value*, 8> PtrSet;  // Optimized for pointers
```

```cpp
// Insert and query operations
Visited.insert(42);
if (Visited.count(42))          // Returns 0 or 1
  process();
Visited.erase(42);              // Remove element
```

```cpp
// SmallPtrSet for pointer-heavy workloads
SmallPtrSet<BasicBlock*, 16> Reachable;
for (auto *BB : Blocks)
  if (Reachable.insert(BB).second)  // Returns {iter, inserted}
    worklist.push_back(BB);
```
````

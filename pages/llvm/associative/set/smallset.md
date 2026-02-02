---
layout: center
---

<h1 class="view-transition-block">SmallSet</h1>

<div class="text-gray-400 text-xl">A small set with inline storage optimization</div>

<!--
- **Inline Storage**: Stores up to N elements in a linear array (no allocation)
- **Automatic Upgrade**: Switches to `std::set` when exceeding threshold
- **Linear Search**: Fast for small sets due to cache locality
- **SmallPtrSet**: Specialized variant for pointer types with better hashing
-->

---
layout: default
---

<h1 class="view-transition-block">SmallSet</h1>

<SmallSetLayout />

---
layout: default
---

<h1 class="view-transition-block">SmallSet</h1>

<SmallSetSources />

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

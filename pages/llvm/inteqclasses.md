---
layout: center
---

<h1 class="view-transition-block">IntEqClasses</h1>

<div class="text-gray-400 text-xl">Union-Find for grouping integers into equivalence classes</div>

<!--
- **Union-Find**: Classic disjoint set data structure
- **Path Compression**: O(α(n)) amortized operations
- **Equivalence Classes**: Group related integers together
- **Use Case**: Register coalescing, value numbering
-->

---

<h1 class="view-transition-block">IntEqClasses</h1>

<IntEqClassesLayout />

---

<h1 class="view-transition-block">IntEqClasses</h1>

<IntEqClassesSources />

````md magic-move
```cpp
IntEqClasses Classes;
Classes.grow(100);  // Support integers 0-99
```

```cpp
// Join elements into equivalence classes
Classes.join(1, 2);  // 1 and 2 are equivalent
Classes.join(2, 5);  // 5 joins the class
Classes.join(3, 4);  // Separate class
```

```cpp
// Query class membership
Classes.findLeader(1);  // Returns representative
Classes.findLeader(5);  // Same representative as 1!
```

```cpp
// Compress for iteration
Classes.compress();
unsigned NumClasses = Classes.getNumClasses();
for (unsigned i = 0; i < 100; ++i)
  errs() << i << " → class " << Classes[i] << "\n";
```

```cpp
// Register coalescing example
for (auto &Copy : CopyInstrs)
  if (canCoalesce(Copy.src, Copy.dst))
    Classes.join(Copy.src, Copy.dst);
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 After <span class="text-yellow-300 font-semibold">compress()</span>, 
  class IDs become contiguous 0..N-1
</div>

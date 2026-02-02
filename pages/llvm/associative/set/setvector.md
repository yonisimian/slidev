---
layout: center
---

<h1 class="view-transition-block">SetVector</h1>

<div class="text-gray-400 text-xl">A set with deterministic iteration order</div>

<!--
- **Dual Storage**: Vector for order + Set for uniqueness
- **Insertion Order**: Iterates in the order elements were added
- **Deterministic**: Same input → same iteration order
- **Variants**: SmallSetVector for small-buffer optimization
-->

---
layout: default
---

<h1 class="view-transition-block">SetVector</h1>

<SetVectorLayout />

---
layout: default
---

<h1 class="view-transition-block">SetVector</h1>

<SetVectorSources />

````md magic-move
```cpp
// Creating a SetVector
SetVector<Value*> Worklist;
SmallSetVector<BasicBlock*, 8> Visited;  // Small buffer

// Insert maintains order
Worklist.insert(A);  // [A]
Worklist.insert(B);  // [A, B]
Worklist.insert(A);  // [A, B] - no duplicate!
```

```cpp
// Deterministic iteration (insertion order)
for (Value *V : Worklist) {
  // Always iterates in same order
  // Critical for reproducible compilation
  processValue(V);
}
```

```cpp
// Set operations with order preservation
Worklist.remove(A);           // Remove specific element
Value *V = Worklist.pop_back_val();  // LIFO access
if (Worklist.count(B))        // O(1) membership test
  handleValue(B);
```
````

---
layout: intro
---

# SetVector

<div class="text-xl text-gray-400 mt-4">
A set with deterministic iteration order
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Dual Storage**: Vector for order + Set for uniqueness
- **Insertion Order**: Iterates in the order elements were added
- **Deterministic**: Same input → same iteration order
- **Variants**: SmallSetVector for small-buffer optimization

</v-clicks>
</div>

---
layout: default
---

# SetVector Memory Layout

<SetVectorLayout />

---
layout: default
---

# SetVector API & Usage

<SetVectorSources />

<div class="mt-4 text-sm text-gray-500">
Header: <code>llvm/ADT/SetVector.h</code>
</div>

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

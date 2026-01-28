---
layout: intro
---

# ImmutableSet

<div class="text-xl text-gray-400 mt-4">
A persistent set with structural sharing
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Immutable**: Operations return new sets, original unchanged
- **Structural Sharing**: New versions share unchanged subtrees
- **AVL Tree**: Balanced tree with O(log n) operations
- **Memory Efficient**: Only modified paths are copied

</v-clicks>
</div>

---
layout: default
---

# ImmutableSet Memory Layout

<ImmutableSetLayout />

---
layout: default
---

# ImmutableSet API & Usage

<ImmutableSetSources />

<div class="mt-4 text-sm text-gray-500">
Header: <code>llvm/ADT/ImmutableSet.h</code>
</div>

````md magic-move
```cpp
// ImmutableSet uses a Factory for allocation
ImmutableSet<int>::Factory F;
ImmutableSet<int> S1 = F.getEmptySet();

// Operations return new sets
ImmutableSet<int> S2 = F.add(S1, 5);  // S1 unchanged!
ImmutableSet<int> S3 = F.add(S2, 3);
ImmutableSet<int> S4 = F.add(S3, 7);
```

```cpp
// Original sets are preserved
assert(S1.isEmpty());      // Still empty
assert(S2.contains(5));    // Has 5
assert(S4.contains(3));    // Has 3, 5, 7

// Remove also returns new set
ImmutableSet<int> S5 = F.remove(S4, 5);
assert(S4.contains(5));    // S4 still has 5!
```

```cpp
// Perfect for analysis with backtracking
void analyze(ImmutableSet<Value*> State) {
  if (cond) {
    analyze(F.add(State, V1));  // Branch 1
    analyze(F.add(State, V2));  // Branch 2
  }
  // State unchanged - easy backtracking!
}
```
````

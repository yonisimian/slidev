---
layout: center
---

<h1 class="view-transition-block">ImmutableMap</h1>

<div class="text-gray-400 text-xl">A persistent map with structural sharing — perfect for dataflow analysis</div>

<!--
- **Immutable**: Operations return new maps, original unchanged
- **Structural Sharing**: Unchanged subtrees shared between versions
- **AVL Tree**: Balanced tree with O(log n) operations
- **Use Case**: Static analysis, symbolic execution, backtracking
-->

---

<h1 class="view-transition-block">ImmutableMap</h1>

<ImmutableMapLayout />

---

<h1 class="view-transition-block">ImmutableMap</h1>

<ImmutableMapSources />

````md magic-move
```cpp
// Factory manages memory for all map versions
ImmutableMap<int, StringRef>::Factory F;
auto M0 = F.getEmptyMap();
```

```cpp
// add() returns a NEW map
auto M1 = F.add(M0, 1, "one");
auto M2 = F.add(M1, 2, "two");
// M0 still empty, M1 has 1 key, M2 has 2 keys
```

```cpp
// Perfect for dataflow analysis
void transfer(ImmutableMap<Var, Value> In) {
  auto Out = F.add(In, X, V);  // Doesn't modify In
  for (auto *Succ : Successors)
    analyze(Succ, Out);
  // In unchanged — backtrack for free!
}
```

```cpp
// Query operations
if (auto *V = M2.lookup(1))
  use(*V);  // Returns pointer to value or nullptr
for (auto &KV : M2)
  errs() << KV.first << " = " << KV.second;
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Share state across branches — only <span class="text-green-300 font-semibold">O(log n)</span> new nodes per update!
</div>

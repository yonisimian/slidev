---
layout: center
---

<h1 class="view-transition-block">SmallDenseMap</h1>

<div class="text-gray-400 text-xl">DenseMap with inline storage for small sizes</div>

<!--
- **Inline Buffer**: Avoids allocation for N or fewer entries
- **Automatic Upgrade**: Switches to heap when threshold exceeded
- **Same API**: Drop-in replacement for DenseMap
- **Stack Friendly**: Perfect for temporary lookup tables
-->

---

<h1 class="view-transition-block">SmallDenseMap</h1>

<SmallDenseMapLayout />

---

<h1 class="view-transition-block">SmallDenseMap</h1>

<SmallDenseMapSources />

````md magic-move
```cpp
// Inline storage for up to 4 entries
SmallDenseMap<BasicBlock*, unsigned, 4> BlockIds;
```

```cpp
// Same API as DenseMap
SmallDenseMap<BasicBlock*, unsigned, 4> BlockIds;
for (auto &BB : F)
  BlockIds[&BB] = counter++;
```

```cpp
// Common pattern: local lookup table
void processFunction(Function &F) {
  SmallDenseMap<Value*, Value*, 8> Replacements; // All on stack for small functions!
  for (auto &I : instructions(F))
    if (auto *R = simplify(&I))
      Replacements[&I] = R;
}
```
````

<div class="text-center text-gray-400 mt-6 text-sm">
  💡 Like <span class="text-green-300 font-semibold">SmallVector</span> vs vector — 
  same idea, <span class="text-orange-300 font-semibold">inline first</span>, heap later!
</div>

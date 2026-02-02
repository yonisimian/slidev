---
layout: center
---

<h1 class="view-transition-block">SmallBitVector</h1>

<div class="text-gray-400 text-xl">Optimized for small bit counts — stores bits inline when possible</div>

---

<h1 class="view-transition-block">SmallBitVector</h1>

<SmallBitVectorLayout />

---

<h1 class="view-transition-block">SmallBitVector</h1>

<SmallBitVectorSources />

````md magic-move
```cpp
SmallBitVector visited(16);  // No heap allocation!
visited.set(3);  visited.set(7);
```

```cpp
SmallBitVector visited(16);  // Inline storage
visited.resize(100);         // Now uses heap
visited.set(99);             // Same API!
```

```cpp
SmallBitVector liveIn(numRegs), liveOut(numRegs);
liveOut = liveIn | defined;  // Set operations
liveOut.reset(killed);
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 For <span class="text-purple-300 font-semibold">&lt; 25 bits</span>: zero heap allocations, fits in a pointer!
</div>

---
layout: center
---

<h1 class="view-transition-block">SparseBitVector</h1>

<div class="text-gray-400 text-xl">Space-efficient for sparse sets — only stores set bits</div>

---

<h1 class="view-transition-block">SparseBitVector</h1>

<SparseBitVectorLayout />

---

<h1 class="view-transition-block">SparseBitVector</h1>

<SparseBitVectorSources />

````md magic-move
```cpp
SparseBitVector<> active;
active.set(1000000);  // Just one element!
active.set(1000042);  // Same 128-bit chunk
```

```cpp
SparseBitVector<> a, b;
a.set(1000000);  b.set(1000000);  b.set(9999999);
a &= b;  // O(number of set bits)!
```

```cpp
SparseBitVector<> uses;
for (Use &U : V->uses()) uses.set(getInstId(U));
for (unsigned id : uses) processInst(id);  // O(1) each
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 O(1) for <span class="text-purple-300 font-semibold">sorted sequential access</span> — perfect for sparse data!
</div>

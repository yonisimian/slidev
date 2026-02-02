---
layout: center
---

<h1 class="view-transition-block">DenseMap</h1>

<div class="text-gray-400 text-xl">A fast hash map with quadratic probing — the workhorse of LLVM</div>

<!--
- **Open Addressing**: Key-value pairs stored directly in buckets
- **Quadratic Probing**: Cache-friendly collision resolution
- **DenseMapInfo**: Customizable traits for any key type
- **Tombstones**: Efficient deletion without full rehash
-->

---

<h1 class="view-transition-block">DenseMap</h1>

<DenseMapLayout />

---

<h1 class="view-transition-block">DenseMap</h1>

<DenseMapSources />

````md magic-move
```cpp
// The most-used map in LLVM
DenseMap<Value*, unsigned> ValueIds;
ValueIds[V] = 42;
if (auto It = ValueIds.find(V); It != ValueIds.end())
  use(It->second);
```

```cpp
// Must specialize DenseMapInfo for custom keys
template<> struct DenseMapInfo<MyKey> {
  static MyKey getEmptyKey() { return {-1}; }
  static MyKey getTombstoneKey() { return {-2}; }
  static unsigned getHashValue(MyKey K) { return hash(K); }
  static bool isEqual(MyKey L, MyKey R) { return L == R; }
};
```

```cpp
// Efficient lookup + insert pattern
auto [It, Inserted] = Map.try_emplace(Key, ExpensiveValue);
if (!Inserted)
  It->second.update();  // Key existed
```

```cpp
// ⚠ Pointers invalidated on rehash!
DenseMap<int, Data> M;
M[1] = Data();
Data *ptr = &M[1];
M[2] = Data();  // May rehash → ptr dangling!
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Prefer <span class="text-yellow-300 font-semibold">find()</span> over <span class="text-gray-500">operator[]</span> — avoid accidental insertions!
</div>

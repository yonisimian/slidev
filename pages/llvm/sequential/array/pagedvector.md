---
layout: center
---

<h1 class="view-transition-block">PagedVector</h1>

<div class="text-gray-400 text-xl">A lazy-allocating container with page-granular memory management</div>

---

<h1 class="view-transition-block">PagedVector</h1>

<PagedVectorLayout />

---

<h1 class="view-transition-block">PagedVector</h1>

<PagedVectorSources />

````md magic-move
```cpp
// Reserve space for 1000 elements, but allocate lazily
PagedVector<ExpensiveObject, 128> vec;
vec.resize(1000);  // No allocations yet!
```

```cpp
// Reserve space for 1000 elements, but allocate lazily
PagedVector<ExpensiveObject, 128> vec;
vec.resize(1000);  // No allocations yet!

// First access to page 0 allocates elements 0-127
vec[0] = ExpensiveObject(...);
```

```cpp
// Reserve space for 1000 elements, but allocate lazily
PagedVector<ExpensiveObject, 128> vec;
vec.resize(1000);  // No allocations yet!

// Access element 500 → allocates page 3 (384-511)
vec[500] = ExpensiveObject(...);
// Pages 1, 2, 4-7 still not allocated!
```

```cpp
// ⚠ No begin()/end() - would defeat lazy allocation
// for (auto &e : vec) ...  // NOT AVAILABLE

// Use materialized_begin/end for accessed pages only
for (auto it = vec.materialized_begin();
     it != vec.materialized_end(); ++it) {
    // Only iterates over allocated pages
}
```
````

<div class="text-center text-gray-400 mt-8">
  💡 Use when initialization is <span class="text-cyan-300 font-semibold">expensive</span> and access is <span class="text-cyan-300 font-semibold">sparse</span>!
</div>

---
layout: center
---

<h1 class="view-transition-block">SmallVector</h1>

<div class="text-gray-400 text-xl">A vector with inline storage that avoids heap allocation for small sizes</div>

---

<h1 class="view-transition-block">SmallVector</h1>

<SmallVectorLayout />

---

<h1 class="view-transition-block">SmallVector</h1>

<SmallVectorSources />

````md magic-move
```cpp
void processItems(SmallVectorImpl<int> &items);

SmallVector<int, 4> vec;
vec.push_back(1);
vec.push_back(2);
processItems(vec);  // Still on stack!
```

```cpp
void processItems(SmallVectorImpl<int> &items);

SmallVector<int, 4> vec = {1, 2, 3, 4};
vec.push_back(5);   // Overflow to heap
processItems(vec);  // Transparent!
```

```cpp
void processItems(SmallVectorImpl<int> &items);

SmallVector<int, 8> bigger;  // More inline space
for (int i = 0; i < 8; i++)
    bigger.push_back(i);     // All on stack!
```

```cpp
void processItems(SmallVectorImpl<int> &items);

// Use SmallVectorImpl<T>& in function signatures
// Accepts ANY SmallVector<T, N> regardless of N
```
````

<div class="text-center text-gray-400 mt-8">
  💡 Use <span class="text-green-300 font-semibold">SmallVectorImpl&lt;T&gt;&amp;</span> in function signatures for flexibility!
</div>

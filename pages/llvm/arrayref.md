---
layout: center
---

<h1 class="view-transition-block">ArrayRef</h1>

<div class="text-gray-400 text-xl">A lightweight, non-owning reference to a contiguous array</div>

---

<h1 class="view-transition-block">ArrayRef</h1>

<ArrayRefPtrLen />

---

<h1 class="view-transition-block">ArrayRef</h1>

<ArrayRefSources />

````md magic-move
```cpp
void processData(ArrayRef<int> data);

int arr[] = {1, 2, 3, 4, 5};
processData(arr);
```

```cpp
void processData(ArrayRef<int> data);

std::vector<int> vec = {1, 2, 3};
processData(vec);
```

```cpp
void processData(ArrayRef<int> data);

SmallVector<int, 4> sv = {1, 2};
processData(sv);
```

```cpp
void processData(ArrayRef<int> data);


processData({10, 20, 30});
```
````

<div class="text-center text-gray-400 mt-8">
  💡 <span class="text-blue-300 font-semibold">Same function</span> — implicit conversions at zero runtime cost!
</div>

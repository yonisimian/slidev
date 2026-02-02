---
layout: center
---

<h1 class="view-transition-block">PackedVector</h1>

<div class="text-gray-400 text-xl">A vector storing values with a specific number of bits per element</div>

---

<h1 class="view-transition-block">PackedVector</h1>

<PackedVectorLayout />

---

<h1 class="view-transition-block">PackedVector</h1>

<PackedVectorSources />

````md magic-move
```cpp
// Store values using only 2 bits each!
PackedVector<unsigned, 2> flags;  // values: 0, 1, 2, 3
flags.resize(100);
flags[42] = 3;  // Uses 2 bits, not 32!
```

```cpp
// Signed values with 2 bits: -2, -1, 0, 1
PackedVector<signed, 2> states;
states.push_back(-1);
states.push_back(0);
states.push_back(1);
```

```cpp
// Combine vectors with bitwise OR
PackedVector<unsigned, 2> a, b;
a.resize(10); b.resize(10);
a[0] = 1;  // 0b01
b[0] = 2;  // 0b10

a |= b;    // a[0] is now 3 (0b11)
```

```cpp
// Memory comparison:
// std::vector<int> with 1000 elements: 4000 bytes
// PackedVector<unsigned, 2> with 1000 elements: 250 bytes
// That's 16x memory savings!
```
````

<div class="text-center text-gray-400 mt-8">
  💡 Uses <span class="text-orange-300 font-semibold">BitVector</span> internally — perfect for small enum-like values!
</div>

---
layout: center
---

<h1 class="view-transition-block">BitVector</h1>

<div class="text-gray-400 text-xl">A dynamic-size vector of bits for efficient set operations</div>

---

<h1 class="view-transition-block">BitVector</h1>

<BitVectorLayout />

---

<h1 class="view-transition-block">BitVector</h1>

<BitVectorSources />

````md magic-move
```cpp
BitVector alive(128);  // 128 registers
alive.set(5);          // r5 is alive
alive.reset(5);        // r5 is dead
```

```cpp
BitVector alive(128), used(128);
alive.set(5);  used.set(5);  used.set(10);
BitVector result = alive & used;  // O(size/64)
```

```cpp
BitVector alive(128), used(128);
alive.set(5);  used.set(5);  used.set(10);
if ((alive & used).test(5)) { /* alive AND used */ }
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Operations work on <span class="text-purple-300 font-semibold">64 bits at a time</span> — blazingly fast for dense sets!
</div>

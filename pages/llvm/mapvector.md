---
layout: center
---

<h1 class="view-transition-block">MapVector</h1>

<div class="text-gray-400 text-xl">A map that iterates in insertion order</div>

<!--
- **Dual Storage**: Vector for ordering + Map for lookup
- **Deterministic**: Iteration order matches insertion order
- **No Surprises**: Same input → same output every time
- **Use Case**: When hash order would cause non-determinism
-->

---

<h1 class="view-transition-block">MapVector</h1>

<MapVectorLayout />

---

<h1 class="view-transition-block">MapVector</h1>

<MapVectorSources />

````md magic-move
```cpp
// Iteration order = insertion order
MapVector<Value*, unsigned> Numbering;
Numbering[V1] = 1;  // First
Numbering[V2] = 2;  // Second
Numbering[V3] = 3;  // Third
```

```cpp
// Deterministic output!
for (auto &[V, Num] : Numbering)
  errs() << *V << " -> " << Num << "\n";
// Always: V1, V2, V3 (not hash-dependent order)
```

```cpp
// Critical for reproducible builds
MapVector<Function*, Metadata*> FunctionMD;
for (auto &F : M)
  FunctionMD[&F] = computeMetadata(F);
// Emit in consistent order → reproducible output!
```
````

<div class="text-center text-gray-400 mt-6 text-sm">
  💡 Like <span class="text-cyan-300 font-semibold">SetVector</span> but for maps — 
  <span class="text-yellow-300">order matters</span> for reproducibility!
</div>

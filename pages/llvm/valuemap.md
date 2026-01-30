---
layout: center
---

<h1 class="view-transition-block">ValueMap</h1>

<div class="text-gray-400 text-xl">A map that tracks LLVM Value RAUW and deletion</div>

<!--
- **RAUW Aware**: Automatically updates when keys are replaced
- **Deletion Callbacks**: Notified when Value keys are destroyed
- **Safe Iteration**: Handles mutations during traversal
- **Use Case**: Cloning, inlining, and transformation passes
-->

---

<h1 class="view-transition-block">ValueMap</h1>

<ValueMapLayout />

---

<h1 class="view-transition-block">ValueMap</h1>

<ValueMapSources />

````md magic-move
```cpp
// Maps old values to new values during cloning
ValueMap<Value*, Value*> VMap;
CloneFunction(&F, VMap);
```

```cpp
// Key replacement handled automatically!
ValueMap<Value*, Metadata*> ValueMD;
ValueMD[OldInst] = MD;
OldInst->replaceAllUsesWith(NewInst);
// ValueMD now maps NewInst → MD (auto-updated!)
```

```cpp
// Custom callbacks for complex transformations
struct MyConfig : ValueMapConfig<Value*> {
  static void onRAUW(const Value *Old, Value *New) {
    // Custom handling
  }
  static void onDelete(const Value *V) {
    // Cleanup resources
  }
};
ValueMap<Value*, Data, MyConfig> TrackedValues;
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  ⚠️ Only for <span class="text-blue-300 font-semibold">Value*</span> keys — 
  use <span class="text-orange-300">DenseMap</span> for everything else!
</div>

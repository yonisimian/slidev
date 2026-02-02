---
layout: center
---

<h1 class="view-transition-block">llvm_unreachable</h1>

<div class="text-gray-400 text-xl">Mark code paths that should never execute</div>

<!--
- **Optimization Hint**: Compiler assumes this path is dead
- **Debug Crash**: Prints message and aborts in debug builds  
- **Release UB**: Undefined behavior if reached in release
- **Use Case**: Default cases in exhaustive switches
-->

---

<h1 class="view-transition-block">llvm_unreachable</h1>

<UnreachableLayout />

---

<h1 class="view-transition-block">llvm_unreachable</h1>

<UnreachableSources />

````md magic-move
```cpp
switch (Kind) { // Exhaustive switch — compiler knows all cases covered
  case Add: return "+";
  case Sub: return "-";
  case Mul: return "*";
}
llvm_unreachable("Unknown operator kind");
```

```cpp
// Satisfies "must return a value" without dead code
StringRef getName() {
  switch (Type) {
    case Int: return "int";
    case Float: return "float";
  }
  llvm_unreachable("bad type");  // No return needed after
}
```

```cpp
// NOT for runtime errors! Use these instead:
report_fatal_error("Unexpected condition");  // Always crashes
assert(false && "Should not happen");        // Debug only
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  ⚠️ Only for <span class="text-purple-300 font-semibold">truly impossible</span> paths — 
  <span class="text-red-300">undefined behavior</span> if reached in release!
</div>

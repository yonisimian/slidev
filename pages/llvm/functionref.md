---
layout: center
---

<h1 class="view-transition-block">function_ref</h1>

<div class="text-gray-400 text-xl">A lightweight, non-owning reference to any callable</div>

<!--
- **Non-owning**: Like StringRef for functions — just a pointer
- **Type-erased**: Works with lambdas, function pointers, functors
- **Zero overhead**: No heap allocation, no std::function bloat
- **Use Case**: Callback parameters in APIs
-->

---

<h1 class="view-transition-block">function_ref</h1>

<FunctionRefLayout />

---

<h1 class="view-transition-block">function_ref</h1>

<FunctionRefSources />

````md magic-move
```cpp
// Accept any callable with signature: int(int, int)
void compute(function_ref<int(int, int)> op) {
  int result = op(10, 20);
  errs() << "Result: " << result << "\n";
}
```

```cpp
// Works with lambdas
compute([](int a, int b) { return a + b; });  // 30
compute([](int a, int b) { return a * b; });  // 200
```

```cpp
// Works with function pointers
int multiply(int a, int b) { return a * b; }
compute(multiply);  // 200
```

```cpp
// Works with functors (stateful objects)
struct Adder {
  int offset;
  int operator()(int a, int b) { return a + b + offset; }
};
compute(Adder{5});  // 35
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  ⚠️ Like <span class="text-cyan-300 font-semibold">StringRef</span> — 
  <span class="text-red-300">never store</span> a function_ref, the callable may go out of scope!
</div>

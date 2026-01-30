---
layout: center
---

<h1 class="view-transition-block">Optional</h1>

<div class="text-gray-400 text-xl">A value that may or may not be present — like std::optional</div>

<!--
- **Nullable Value**: Represents presence or absence of a value
- **No Exceptions**: Explicit checking required
- **Cheap**: Just the value + a bool, no heap allocation
- **Use Case**: Return values that may fail without "error info"
-->

---

<h1 class="view-transition-block">Optional</h1>

<OptionalLayout />

---

<h1 class="view-transition-block">Optional</h1>

<OptionalSources />

````md magic-move
```cpp
// Function that may fail
Optional<int> tryParse(StringRef S) {
  int Val;
  if (S.getAsInteger(10, Val))
    return std::nullopt;  // Parse failed
  return Val;             // Success
}
```

```cpp
// Check before use
if (Optional<int> V = tryParse("42")) {
  use(*V);      // Dereference with *
  use(V.value()); // Or .value()
}
```

```cpp
// Default value pattern
int Val = tryParse(Input).value_or(-1);
```

```cpp
// Transform if present (monadic operations)
Optional<int> doubled = tryParse("21")
    .map([](int x) { return x * 2; });
// doubled = 42
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Use when failure is <span class="text-cyan-300 font-semibold">expected</span> and needs no explanation — 
  otherwise use <span class="text-green-300">Expected&lt;T&gt;</span>
</div>

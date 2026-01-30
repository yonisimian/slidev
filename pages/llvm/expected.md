---
layout: center
---

<h1 class="view-transition-block">Expected</h1>

<div class="text-gray-400 text-xl">Either a value OR an error — LLVM's Result type</div>

<!--
- **Tagged Union**: Holds either T or Error, never both
- **Must Check**: Compiler warns if error not handled
- **Error Chaining**: Errors can wrap and propagate
- **Use Case**: Operations that can fail with details
-->

---

<h1 class="view-transition-block">Expected</h1>

<ExpectedLayout />

---

<h1 class="view-transition-block">Expected</h1>

<ExpectedSources />

````md magic-move
```cpp
// Function returning Expected
Expected<int> parseNumber(StringRef S) {
  int Val;
  if (S.getAsInteger(10, Val))
    return createStringError(errc::invalid_argument,
                             "not a number: %s", S.data());
  return Val;
}
```

```cpp
// Must handle the error!
Expected<int> Result = parseNumber(Input);
if (!Result) {
  logError(Result.takeError());  // Consume error
  return;
}
use(*Result);  // Safe to dereference
```

```cpp
// Propagate errors with cantFail (asserts on error)
int Val = cantFail(parseNumber("42"));

// Or with ExitOnError for tools
ExitOnError ExitOnErr;
int Val = ExitOnErr(parseNumber(Input));
```

```cpp
// Error must be consumed! This crashes:
Expected<int> E = parseNumber("bad");
// ~Expected() asserts if error not handled!
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  ⚠️ Errors <span class="text-red-300 font-semibold">must be consumed</span> — 
  destructor asserts if you ignore them!
</div>

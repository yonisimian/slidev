---
layout: center
---

<h1 class="view-transition-block">Error</h1>

<div class="text-gray-400 text-xl">A type-erased error with rich information — the E in Expected</div>

<!--
- **Type Erased**: Can hold any ErrorInfo subclass
- **Chainable**: Errors can be joined together
- **Must Consume**: Cannot be silently dropped
- **Use Case**: The error half of Expected<T>
-->

---

<h1 class="view-transition-block">Error</h1>

<ErrorLayout />

---

<h1 class="view-transition-block">Error</h1>

<ErrorSources />

````md magic-move
```cpp
// Creating errors
Error E1 = createStringError(errc::invalid_argument,
                              "bad input: %d", 42);

Error E2 = make_error<MyCustomError>(details...);
```

```cpp
// Error::success() is the "no error" value
Error doSomething() {
  if (failed)
    return createStringError(...);
  return Error::success();
}
```

```cpp
// Handling errors
if (Error E = doSomething()) {
  // Handle specific error type
  handleAllErrors(std::move(E),
    [](const MyError &ME) { ... },
    [](const StringError &SE) { ... }
  );
}
```

```cpp
// Joining multiple errors
Error E = joinErrors(std::move(E1), std::move(E2));
// Creates an ErrorList containing both
```

```cpp
// Consuming without handling (logs to stderr)
consumeError(std::move(E));

// Or convert to string
std::string Msg = toString(std::move(E));
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Use <span class="text-cyan-300 font-semibold">handleErrors</span> for partial handling, 
  <span class="text-green-300 font-semibold">handleAllErrors</span> when all types covered
</div>

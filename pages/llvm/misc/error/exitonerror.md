---
layout: center
---

<h1 class="view-transition-block">ExitOnError</h1>

<div class="text-gray-400 text-xl">A helper that exits on error — perfect for tools and drivers</div>

<!--
- **Fail Fast**: Converts errors to program exit
- **Tool Friendly**: Prints error and returns non-zero
- **Banner Support**: Customizable error prefix
- **Use Case**: llc, opt, and other LLVM tools
-->

---

<h1 class="view-transition-block">ExitOnError</h1>

<ExitOnErrorLayout />

---

<h1 class="view-transition-block">ExitOnError</h1>

<ExitOnErrorSources />

````md magic-move
```cpp
// Create with a banner prefix
ExitOnError ExitOnErr("llc: error: ");
```

```cpp
// Use as a functor to unwrap Expected
Expected<Module*> MOrErr = parseIR(Buffer);
Module *M = ExitOnErr(std::move(MOrErr));
// If error: prints "llc: error: <msg>" and exits
```

```cpp
// Works with Error too (returns void)
ExitOnErr(doSomethingThatMayFail());
```

```cpp
// Typical tool main()
int main(int argc, char **argv) {
  ExitOnError ExitOnErr("mytool: ");
  
  auto MB = ExitOnErr(MemoryBuffer::getFile(Filename));
  auto M = ExitOnErr(parseIR(*MB));
  
  ExitOnErr(runPasses(*M));
  return 0;
}
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Great for <span class="text-orange-300 font-semibold">command-line tools</span> — 
  not for libraries or recoverable errors!
</div>

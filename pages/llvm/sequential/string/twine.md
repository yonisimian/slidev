---
layout: center
---

<h1 class="view-transition-block">Twine</h1>

<div class="text-gray-400 text-xl">Efficient string concatenation without intermediate allocations</div>

---

<h1 class="view-transition-block">Twine</h1>

<TwineLayout />

---

<h1 class="view-transition-block">Twine</h1>

<TwineSources />

````md magic-move
```cpp
void log(const Twine &msg);
log("Value " + V->getName() + " is " + Twine(42));
// No intermediate std::string allocations!
```

```cpp
StringRef prefix = "error";
int code = 404;
Twine msg = prefix + ": code " + Twine(code);
msg.str();  // Materializes only when needed
```

```cpp
// Perfect for naming instructions
Instruction *I = Builder.CreateAdd(A, B,
    V->getName() + ".add");  // Twine from concat
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Builds a <span class="text-green-300 font-semibold">tree of references</span> on the stack — only allocates when you call .str()!
</div>

---
layout: center
---

<h1 class="view-transition-block">StringMap</h1>

<div class="text-gray-400 text-xl">A hash map optimized for string keys with arena allocation</div>

<!--
- **String Interning**: Keys stored in contiguous memory pool
- **Cache Efficient**: String data adjacent to hash entries
- **StringRef Lookup**: Query without copying strings
- **Low Overhead**: Single allocation per entry (key + value together)
-->

---

<h1 class="view-transition-block">StringMap</h1>

<StringMapLayout />

---

<h1 class="view-transition-block">StringMap</h1>

<StringMapSources />

````md magic-move
```cpp
StringMap<int> Symbols;
Symbols["main"] = 0;
Symbols["printf"] = 1;
Symbols["malloc"] = 2;
```

```cpp
// Lookup with StringRef — no allocation!
StringRef Name = getFunctionName();
if (auto It = Symbols.find(Name); It != Symbols.end())
  return It->second;
```

```cpp
// Keys are stored inline with values
for (auto &Entry : Symbols)
  errs() << Entry.getKey() << " = " << Entry.getValue();
// Entry.getKey() returns StringRef to internal storage
```

```cpp
// Perfect for symbol tables, option parsing
StringMap<cl::Option*> Options;
StringMap<GlobalValue*> GlobalSymbols;
StringMap<unsigned> IdentifierIDs;
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Keys are <span class="text-green-300 font-semibold">copied once</span> into the map — 
  no dangling StringRefs!
</div>

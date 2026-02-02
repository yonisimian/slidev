---
layout: center
---

<h1 class="view-transition-block">RadixTree</h1>

<div class="text-gray-400 text-xl">A compressed trie for prefix-based string operations</div>

<!--
- **Path Compression**: Merges single-child chains into edges
- **Prefix Lookup**: Efficiently find all strings with a given prefix
- **Memory Efficient**: Shared prefixes stored once
- **StringMap Backend**: Powers LLVM's StringMap implementation
-->

---
layout: default
---

<h1 class="view-transition-block">RadixTree</h1>

<RadixTreeLayout />

---
layout: default
---

<h1 class="view-transition-block">RadixTree</h1>

<RadixTreeSources />

````md magic-move
```cpp
// StringMap uses radix tree internally
StringMap<int> Symbols;
Symbols["print"] = 1;
Symbols["printf"] = 2;
Symbols["println"] = 3;
// Shares "print" prefix efficiently
```

```cpp
// Prefix-based operations
for (auto &Entry : Symbols) {
  if (Entry.getKey().starts_with("print"))
    processMatch(Entry);
}
```

```cpp
// Longest prefix match (common in routing)
StringRef Input = "printf_debug";
auto It = Symbols.find("printf");  // O(key length)
if (It != Symbols.end())
  return It->second;
```
````

---
layout: intro
---

# RadixTree

<div class="text-xl text-gray-400 mt-4">
A compressed trie for prefix-based string operations
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Path Compression**: Merges single-child chains into edges
- **Prefix Lookup**: Efficiently find all strings with a given prefix
- **Memory Efficient**: Shared prefixes stored once
- **StringMap Backend**: Powers LLVM's StringMap implementation

</v-clicks>
</div>

---
layout: default
---

# RadixTree Memory Layout

<RadixTreeLayout />

---
layout: default
---

# RadixTree API & Usage

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

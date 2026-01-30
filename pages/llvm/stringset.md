---
layout: center
---

<h1 class="view-transition-block">StringSet</h1>

<div class="text-gray-400 text-xl">A set optimized for string keys with efficient storage</div>

<!--
- **String Interning**: Stores strings in a single allocation pool
- **StringRef Keys**: Lookup with StringRef avoids copies
- **Hash Table**: Fast O(1) average lookup and insertion
- **Memory Efficient**: Strings stored contiguously, no per-entry allocation
-->

---
layout: default
---

<h1 class="view-transition-block">StringSet</h1>

<StringSetLayout />

---
layout: default
---

<h1 class="view-transition-block">StringSet</h1>

<StringSetSources />

````md magic-move
```cpp
// Creating and populating a StringSet
StringSet<> Keywords;
Keywords.insert("if");
Keywords.insert("else");
Keywords.insert("while");
```

```cpp
// Fast lookup with StringRef (no allocation)
StringRef Token = getNextToken();
if (Keywords.count(Token))
  return parseKeyword(Token);
else
  return parseIdentifier(Token);
```

```cpp
// Iteration over all strings
for (const auto &Entry : Keywords) {
  StringRef Key = Entry.getKey();
  llvm::outs() << "Keyword: " << Key << "\n";
}
```
````

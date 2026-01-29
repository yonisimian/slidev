---
layout: intro
---

# StringSet

<div class="text-xl text-gray-400 mt-4">
A set optimized for string keys with efficient storage
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **String Interning**: Stores strings in a single allocation pool
- **StringRef Keys**: Lookup with StringRef avoids copies
- **Hash Table**: Fast O(1) average lookup and insertion
- **Memory Efficient**: Strings stored contiguously, no per-entry allocation

</v-clicks>
</div>

---
layout: default
---

# StringSet Memory Layout

<StringSetLayout />

---
layout: default
---

# StringSet API & Usage

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

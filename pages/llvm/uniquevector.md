---
layout: intro
---

# UniqueVector

<div class="text-xl text-gray-400 mt-4">
A vector with unique elements and stable numeric IDs
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Stable IDs**: Each element gets a unique 1-based index
- **ID Lookup**: Fast retrieval by ID (vector access)
- **Element Lookup**: Find ID of element (map lookup)
- **No Removal**: IDs remain stable (no deletion support)

</v-clicks>
</div>

---
layout: default
---

# UniqueVector Memory Layout

<UniqueVectorLayout />

---
layout: default
---

# UniqueVector API & Usage

<UniqueVectorSources />

````md magic-move
```cpp
// Creating a UniqueVector
UniqueVector<StringRef> Strings;

// Insert returns stable ID (1-based)
unsigned IdA = Strings.insert("foo");  // Returns 1
unsigned IdB = Strings.insert("bar");  // Returns 2
unsigned IdC = Strings.insert("foo");  // Returns 1 (same!)
```

```cpp
// Lookup by ID - O(1)
StringRef S = Strings[1];  // Returns "foo"
StringRef T = Strings[2];  // Returns "bar"

// Get ID of element - O(1)
unsigned Id = Strings.idFor("bar");  // Returns 2
```

```cpp
// Common use: debug info string tables
UniqueVector<StringRef> DebugStrings;
for (auto &Var : Variables) {
  unsigned NameId = DebugStrings.insert(Var.getName());
  emitDebugEntry(NameId);  // Compact ID reference
}
```
````

---
layout: intro
---

# SmallString

<div class="text-xl text-gray-400 mt-4">
A stack-allocated string buffer with std::string-like API
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Inline Storage**: Pre-allocated buffer avoids heap for small strings
- **Dynamic Growth**: Falls back to heap when capacity exceeded
- **Compatible API**: Works like `std::string` but with small-buffer optimization
- **Twine Integration**: Can receive materialized Twine results efficiently

</v-clicks>
</div>

---
layout: default
---

# SmallString Memory Layout

<SmallStringLayout />

---
layout: default
---

# SmallString API & Usage

<SmallStringSources />

<div class="mt-4 text-sm text-gray-500">
Header: <code>llvm/ADT/SmallString.h</code>
</div>

````md magic-move
```cpp
// Creating SmallStrings with inline buffer
SmallString<64> Path;           // 64-byte inline buffer
SmallString<128> Buffer;        // 128-byte inline buffer
SmallString<16> Name("file");   // Initialize with content
```

```cpp
// Building paths with append operations
SmallString<128> Path("/home");
Path += "/user";                // Append operator
Path.append("/project");        // Append method
sys::path::append(Path, "src"); // Path utilities
```

```cpp
// Converting from Twine (efficient materialization)
void log(const Twine &Message) {
  SmallString<256> Buffer;
  Message.toVector(Buffer);     // Single allocation
  write(Buffer.str());          // Get StringRef view
}
```
````

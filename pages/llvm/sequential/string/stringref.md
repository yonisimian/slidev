---
layout: center
---

<h1 class="view-transition-block">StringRef</h1>

<div class="text-gray-400 text-xl">A lightweight, non-owning reference to a string</div>

---

<h1 class="view-transition-block">StringRef</h1>

<StringRefLayout />

---

<h1 class="view-transition-block">StringRef</h1>

<StringRefSources />

````md magic-move
```cpp
void process(StringRef name);
process("hello");              // C string
process(std::string("world")); // std::string
```

```cpp
void process(StringRef name);
StringRef s = "hello world";
process(s.substr(0, 5));  // "hello" - no allocation!
```

```cpp
StringRef path = "/usr/local/bin/clang";
path.starts_with("/usr");  // true
path.ends_with(".exe");    // false
path.find('/');            // 0
```
````

<div class="text-center text-gray-400 mt-4 text-sm">
  💡 Like <span class="text-green-300 font-semibold">ArrayRef</span> for strings — just a pointer + length, no ownership!
</div>

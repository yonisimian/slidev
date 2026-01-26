# LLVM Useful Classes - Presentation Outline

## Video Info
- **Title**: LLVM Useful Classes: Data Structures for the Modern Compiler Developer
- **Style**: Motion animations + minimal text + narration (added later)
- **Reference**: https://llvm.org/docs/ProgrammersManual.html

---

## Slide Structure

### 1. Title Slide

- [ ] Animated title entrance
- [ ] LLVM logo or stylized graphic
- [ ] Subtitle: "Data Structures for the Modern Compiler Developer"

### 2. Introduction (Why Custom Containers?)
- [ ] Brief context slide: LLVM's philosophy
- [ ] Key points: Performance, Safety, Ergonomics over STL defaults

---

## Part 1: String Classes

### 3. StringRef
- [ ] Memory layout animation: pointer + length (no ownership)
- [ ] Show implicit conversions from const char*, std::string
- [ ] Code snippet: `StringRef s = "hello";`
- [ ] Key insight: Pass by value, never store

### 4. Twine
- [ ] Rope/tree structure animation (lazy concatenation)
- [ ] Show deferred evaluation, then flattening to buffer
- [ ] Code snippet: `Twine t = name + ".suffix";`
- [ ] Warning: Stack-only, never store!

### 5. SmallString
- [ ] Inline buffer visualization
- [ ] Compare to std::string
- [ ] Code snippet: `SmallString<64> buf;`

---

## Part 2: Sequential Containers

### 6. ArrayRef
- [ ] Read-only view animation (pointer + length)
- [ ] Show multiple sources: C array, vector, SmallVector → ArrayRef
- [ ] Code snippet: `void process(ArrayRef<int> data);`
- [ ] Key insight: The universal read-only parameter type

### 7. SmallVector (⭐ Most Important)
- [ ] Inline storage animation with N elements
- [ ] Animate overflow to heap allocation
- [ ] Show SmallVectorImpl as parameter type
- [ ] Code snippets:
  - `SmallVector<int, 4> vec;`
  - `void process(SmallVectorImpl<int> &out);`
- [ ] When to use: Stack buffers, "usually small" collections

### 8. MutableArrayRef
- [ ] Like ArrayRef but with write capability
- [ ] Brief slide, reference ArrayRef

---

## Part 3: Set Containers

### 9. SmallSet
- [ ] Inline storage for small sets
- [ ] Falls back to std::set when large
- [ ] Code snippet: `SmallSet<int, 8> visited;`

### 10. SmallPtrSet
- [ ] Optimized for pointer types
- [ ] Quadratic probing visualization
- [ ] Code snippet: `SmallPtrSet<Value*, 8> seen;`

### 11. DenseSet
- [ ] Hash table visualization
- [ ] Single allocation, cache-friendly
- [ ] Requires DenseMapInfo specialization

### 12. SetVector
- [ ] Dual structure animation: Set + Vector
- [ ] Maintains insertion order (deterministic iteration)
- [ ] Use case: Pointer sets needing stable iteration

---

## Part 4: Map Containers

### 13. DenseMap (⭐ Important)
- [ ] Quadratic probing animation
- [ ] Tombstones for deletion
- [ ] Empty/tombstone key requirements
- [ ] Code snippet: `DenseMap<Value*, int> valueToIndex;`
- [ ] Warning: Iterators invalidate on insert!

### 14. StringMap
- [ ] String key optimization animation
- [ ] Single allocation per entry (key + value together)
- [ ] Code snippet: `StringMap<int> nameToId;`

### 15. MapVector
- [ ] Like SetVector but for maps
- [ ] Deterministic iteration order
- [ ] Trade-off: 2x memory

---

## Part 5: LLVM RTTI System

### 16. isa<>, cast<>, dyn_cast<>
- [ ] Type hierarchy tree visualization
- [ ] Animation: isa<> check → cast<> conversion
- [ ] Show dyn_cast<> with null check
- [ ] Code snippets:
  ```cpp
  if (isa<CallInst>(V)) { ... }
  auto *CI = cast<CallInst>(V);      // asserts
  if (auto *CI = dyn_cast<CallInst>(V)) { ... }
  ```
- [ ] Key insight: No vtable required!

---

## Part 6: Error Handling

### 17. Error and Expected<T>
- [ ] Error state machine animation
- [ ] Expected<T> as "Result type"
- [ ] Propagation flow visualization
- [ ] Code snippets:
  ```cpp
  Expected<int> parse(StringRef s);
  if (auto E = result.takeError()) return E;
  ```
- [ ] Must check or consume errors!

### 18. cantFail / ExitOnError
- [ ] Brief utility functions
- [ ] When safe to use

---

## Part 7: Utility Classes (Optional/Bonus)

### 19. Optional (now std::optional)
- [ ] Brief mention of migration

### 20. function_ref
- [ ] Lightweight callback type
- [ ] Compare to std::function
- [ ] Code snippet: `void forEach(function_ref<void(int)> fn);`

---

## Closing

### 21. Summary Slide
- [ ] Quick reference table: When to use what
- [ ] Key takeaways

### 22. Resources Slide
- [ ] LLVM Programmer's Manual link
- [ ] Doxygen documentation
- [ ] GitHub links

---

## Animation Techniques to Use

| Technique | Use Case |
|-----------|----------|
| `v-motion` | Memory layouts, element movements |
| `v-click` | Sequential reveals |
| `v-clicks` | List items appearing one by one |
| `v-switch` | Toggling between states (success/error) |
| Shiki Magic Move | Code transformations |

---

## Task Checklist

### Phase 1: Foundation
- [ ] Clear existing demo slides from slides.md
- [ ] Create title slide with animation
- [ ] Create introduction slide
- [ ] Set up consistent styling/CSS

### Phase 2: String Classes (Slides 3-5)
- [ ] StringRef slide with memory layout animation
- [ ] Twine slide with tree animation
- [ ] SmallString slide

### Phase 3: Sequential Containers (Slides 6-8)
- [ ] ArrayRef slide with source arrows animation
- [ ] SmallVector slide with inline→heap animation
- [ ] MutableArrayRef slide

### Phase 4: Set Containers (Slides 9-12)
- [ ] SmallSet slide
- [ ] SmallPtrSet slide with probing animation
- [ ] DenseSet slide
- [ ] SetVector dual-structure slide

### Phase 5: Map Containers (Slides 13-15)
- [ ] DenseMap slide with probing/tombstone animation
- [ ] StringMap slide
- [ ] MapVector slide

### Phase 6: RTTI (Slide 16)
- [ ] Type hierarchy tree animation
- [ ] isa/cast/dyn_cast code examples

### Phase 7: Error Handling (Slides 17-18)
- [ ] Error/Expected state machine animation
- [ ] Utility functions slide

### Phase 8: Closing (Slides 19-22)
- [ ] Optional/function_ref bonus slides
- [ ] Summary table
- [ ] Resources slide

---

## Notes for Narration (to add later)
- Keep explanations conversational
- Emphasize "when to use" and "gotchas"
- Reference STL equivalents where applicable
- Mention performance characteristics

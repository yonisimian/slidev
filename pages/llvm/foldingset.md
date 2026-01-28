---
layout: intro
---

# FoldingSet

<div class="text-xl text-gray-400 mt-4">
A uniquing set for nodes with content-based identity
</div>

<div class="mt-8 text-lg">
<v-clicks>

- **Content-Based Hashing**: Nodes define their own Profile() method
- **Uniquing**: Only one instance per unique content
- **Intrusive**: Nodes inherit from FoldingSetNode
- **Flyweight Pattern**: Ideal for AST nodes, types, and constants

</v-clicks>
</div>

---
layout: default
---

# FoldingSet Memory Layout

<FoldingSetLayout />

---
layout: default
---

# FoldingSet API & Usage

<FoldingSetSources />

<div class="mt-4 text-sm text-gray-500">
Header: <code>llvm/ADT/FoldingSet.h</code>
</div>

````md magic-move
```cpp
// Node must inherit from FoldingSetNode
class MyType : public FoldingSetNode {
  int A, B;
public:
  void Profile(FoldingSetNodeID &ID) const {
    ID.AddInteger(A);
    ID.AddInteger(B);
  }
};
```

```cpp
// Uniquing lookup pattern
FoldingSet<MyType> Types;
FoldingSetNodeID ID;
ID.AddInteger(a); ID.AddInteger(b);

void *InsertPos;
if (MyType *T = Types.FindNodeOrInsertPos(ID, InsertPos))
  return T;  // Already exists
```

```cpp
// Create and insert if not found
MyType *New = new MyType(a, b);
Types.InsertNode(New, InsertPos);
return New;  // Now uniqued
```
````

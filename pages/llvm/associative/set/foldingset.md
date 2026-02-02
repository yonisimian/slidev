---
layout: center
---

<h1 class="view-transition-block">FoldingSet</h1>

<div class="text-gray-400 text-xl">A uniquing set for nodes with content-based identity</div>

<!--
- **Content-Based Hashing**: Nodes define their own Profile() method
- **Uniquing**: Only one instance per unique content
- **Intrusive**: Nodes inherit from FoldingSetNode
- **Flyweight Pattern**: Ideal for AST nodes, types, and constants
-->

---
layout: default
---

<h1 class="view-transition-block">FoldingSet</h1>

<FoldingSetLayout />

---
layout: default
---

<h1 class="view-transition-block">FoldingSet</h1>

<FoldingSetSources />

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

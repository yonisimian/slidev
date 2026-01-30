---
layout: center
---

<h1 class="view-transition-block">IndexedMap</h1>

<div class="text-gray-400 text-xl">A dense map from unsigned integers to values — just an array!</div>

<!--
- **Array Backend**: Direct indexing by unsigned key
- **Sparse-to-Dense**: Handles sparse key sets efficiently
- **Grow on Demand**: Resizes to accommodate largest key
- **Register Allocation**: Maps virtual registers to physical resources
-->

---

<h1 class="view-transition-block">IndexedMap</h1>

<IndexedMapLayout />

---

<h1 class="view-transition-block">IndexedMap</h1>

<IndexedMapSources />

````md magic-move
```cpp
// Map from register numbers to their info
IndexedMap<LiveInterval*> VirtRegInfo;
VirtRegInfo.grow(MRI.getNumVirtRegs());
```

```cpp
// Direct array access — O(1)
VirtRegInfo[VReg] = &LI;
LiveInterval *LI = VirtRegInfo[VReg];
```

```cpp
// Initialized with a null-like value
IndexedMap<unsigned, ZeroFill> RegPressure;
// All entries start at 0, grow as needed
RegPressure[Reg] += Weight;
```

```cpp
// Typical use: register-indexed data
IndexedMap<unsigned> RegClassMap;      // Reg → Class
IndexedMap<SlotIndex> RegDefSlot;      // Reg → Def point  
IndexedMap<MachineInstr*> RegDefMI;    // Reg → Defining MI
```
````

<div class="text-center text-gray-400 mt-6 text-sm">
  💡 When keys are <span class="text-purple-300 font-semibold">dense integers</span> — 
  faster than any hash map!
</div>

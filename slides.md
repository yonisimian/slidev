---
# theme: excali-slide
theme: nord
title: Welcome to Slidev
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
layout: center
class: text-center
drawings:
  persist: false # https://sli.dev/features/drawing
transition: view-transition # https://sli.dev/guide/animations.html#slide-transitions
mdc: true # https://sli.dev/features/mdc
duration: 35min
fonts:
  sans: 'Excalifont'
  mono: 'Fira Code, monospace'
---

<style>
@font-face {
  font-family: 'Excalifont';
  src: url('/fonts/Excalifont-Regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.view-transition-block {
  display: inline-block;
}

::view-transition-old(*),
::view-transition-new(*),
::view-transition-group(*) {
  animation-duration: 1.0s;
  animation-timing-function: ease-in-out;
}

.slidev-code-wrapper {
  overflow: hidden !important;
}

.shiki-magic-move-container {
  overflow: hidden !important;
}
</style>

# 40 LLVM Classes In 10 Minutes

---
src: ./pages/llvm/arrayref.md
---

---
src: ./pages/llvm/smallvector.md
---

---
src: ./pages/llvm/pagedvector.md
---

---
src: ./pages/llvm/packedvector.md
---

---
layout: center
class: text-center
clicks: 1
---

<SequentialTransition :phase="0" :clicks="$clicks" />

---
src: ./pages/llvm/bitvector.md
---

---
src: ./pages/llvm/smallbitvector.md
---

---
src: ./pages/llvm/sparsebitvector.md
---

---
src: ./pages/llvm/coalescingbitvector.md
---

---
layout: center
class: text-center
clicks: 1
---

<SequentialTransition :phase="1" :clicks="$clicks" />

---
src: ./pages/llvm/stringref.md
---

---
src: ./pages/llvm/twine.md
---

---
src: ./pages/llvm/smallstring.md
---

---
layout: center
class: text-center
clicks: 1
---

<ADTUniverse :phase="0" :clicks="$clicks" />

---
layout: center
class: text-center
clicks: 1
---

<AssociativeTransition :phase="0" :clicks="$clicks" />

---
src: ./pages/llvm/smallset.md
---

---
src: ./pages/llvm/stringset.md
---

---
src: ./pages/llvm/denseset.md
---

---
src: ./pages/llvm/sparseset.md
---

---
src: ./pages/llvm/foldingset.md
---

---
src: ./pages/llvm/radixtree.md
---

---
src: ./pages/llvm/setvector.md
---

---
src: ./pages/llvm/uniquevector.md
---

---
src: ./pages/llvm/immutableset.md
---

---
layout: center
class: text-center
clicks: 1
---

<AssociativeTransition :phase="1" :clicks="$clicks" />

---
src: ./pages/llvm/densemap.md
---

---
src: ./pages/llvm/smalldensemap.md
---

---
src: ./pages/llvm/mapvector.md
---

---
src: ./pages/llvm/stringmap.md
---

---
src: ./pages/llvm/indexedmap.md
---

---
src: ./pages/llvm/valuemap.md
---

---
src: ./pages/llvm/intervalmap.md
---

---
src: ./pages/llvm/intervaltree.md
---

---
src: ./pages/llvm/inteqclasses.md
---

---
src: ./pages/llvm/immutablemap.md
---

---
layout: center
class: text-center
clicks: 1
---

<ADTUniverse :phase="1" :clicks="$clicks" />

---
layout: center
class: text-center
clicks: 3
---

<MiscTransition :clicks="$clicks" />

---
layout: center
class: text-center
---

# Thank you!

<br/>

<PoweredBySlidev mt-10 />

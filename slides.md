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
src: ./pages/llvm/sequential/sequential.md
---

---
layout: center
class: text-center
clicks: 1
---

<ADTUniverse :phase="1" :clicks="$clicks" />

---
src: ./pages/llvm/associative/associative.md
---

---
layout: center
class: text-center
clicks: 1
---

<ADTUniverse :phase="2" :clicks="$clicks" />

---
src: ./pages/llvm/misc/misc.md
---

---
layout: center
class: text-center
---

# Thank you!

<br/>

<PoweredBySlidev mt-10 />

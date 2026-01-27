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
</style>

# 40 LLVM Classes In 10 Minutes

---
src: ./pages/llvm/arrayref.md
---

---
src: ./pages/llvm/smallvector.md
---

---
layout: center
class: text-center
---

# Thank you!

<br/>

<PoweredBySlidev mt-10 />

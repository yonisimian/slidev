# TODO

## Slides Fixes

- SmallBitVectorLayout: uncomment the Storage diagram but somewhere else on the screen
- PagedVectorSources: show the "No begin()/end()" only when clicks=3 (last slide)
- PackedVector: make it clearer that top is 8 bytes and bottom is 2 bytes
- ilist: don't forget me (introduce before its first user)
- function_ref: make it like ArrayRef
- remove the ErrorTransition component(?)
- fix the title(s) of the errors / iteration / formatting slides

## Sources Too Large (no place for code)

- IntervalMap: Sources is too large
- IntEqClasses: Sources is too large. might embed into code
- Optional: Sources is too large. remove code
- Error: Sources is too large

## Memes to Include

- 69
- 420
- 80085
- do u know da wae
- SEGA DOES
- "Why function_ref and no FunctionRef? Don't ask me I'm just an AI voice..."

## Prologue / Epilogue

- prologue - disclaimer? (about not having llvm::Module etc.)
- epilogue - list all classes (& functions?)

## Audio Script Reminders

Use the commented-out "use-cases" sections for the audio script:

- FoldingSetSources
- ImmutableSetSources
- SetVectorSources
- SmallStringSources
- SmallBitVectorLayout(?)
- UniqueVectorSources
- DenseMapSources
- MapVectorSources
- ExpectedSources
- ExitOnErrorSources

## Next Video Topics

- basic classes (Module, Function, Instruction, BasicBlock)
- ValueMap (commit: 6c16abc62169b3a2a8aec4cf4289ba382cc3880c)
- Users, RAUW
- ValueMap
- castings (isa<> etc.)
- All kinds of values?
- APInt

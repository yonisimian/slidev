<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Creating custom errors -->
    <div class="bg-gray-800/50 rounded-lg p-3 border border-gray-600 mb-4">
      <div class="text-sm text-gray-400 mb-2 text-center">Custom Error Types</div>
      <div class="font-mono text-xs space-y-1">
        <div class="text-gray-300">
          <span class="text-[#569cd6]">class</span>
          <span class="text-[#4ec9b0]">MyError</span> :
          <span class="text-[#569cd6]">public</span>
          <span class="text-[#4ec9b0]">ErrorInfo</span>&lt;<span class="text-[#4ec9b0]"
            >MyError</span
          >&gt; {
        </div>
        <div class="text-gray-300 pl-4">
          <span class="text-[#569cd6]">static char</span> <span class="text-[#9cdcfe]">ID</span>;
          <span class="text-gray-500">// Required for RTTI</span>
        </div>
        <div class="text-gray-300 pl-4">
          <span class="text-[#569cd6]">void</span>
          <span class="text-[#dcdcaa]">log</span>(raw_ostream &OS)
          <span class="text-[#569cd6]">const override</span>;
        </div>
        <div class="text-gray-300">};</div>
      </div>
    </div>

    <!-- Error creation methods -->
    <div class="flex gap-4 mb-4">
      <div class="bg-gray-800/50 rounded-lg p-2 border border-cyan-500/30 text-center">
        <div class="text-cyan-400 font-mono text-xs">createStringError()</div>
        <div class="text-gray-500 text-xs mt-1">Quick printf-style</div>
      </div>
      <div class="bg-gray-800/50 rounded-lg p-2 border border-orange-500/30 text-center">
        <div class="text-orange-400 font-mono text-xs">make_error&lt;T&gt;()</div>
        <div class="text-gray-500 text-xs mt-1">Custom error type</div>
      </div>
      <div class="bg-gray-800/50 rounded-lg p-2 border border-green-500/30 text-center">
        <div class="text-green-400 font-mono text-xs">Error::success()</div>
        <div class="text-gray-500 text-xs mt-1">No error</div>
      </div>
    </div>

    <!-- Handler pattern -->
    <div class="bg-gray-800/50 rounded-lg p-3 border border-purple-500/30">
      <div class="text-sm text-purple-400 mb-2 text-center">Pattern: handleAllErrors</div>
      <div class="font-mono text-xs text-gray-300">
        handleAllErrors(std::move(E),<br />
        <span class="pl-4"
          >[](const MyError &) { <span class="text-green-400">/* handle */</span> },</span
        ><br />
        <span class="pl-4"
          >[](const StringError &) { <span class="text-green-400">/* handle */</span> }</span
        ><br />
        );
      </div>
    </div>
  </div>
</template>

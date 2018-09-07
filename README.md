# SIMD.js
===============

SIMD.js has been taken out of active development in TC39 and removed
from Stage 3, and is not being pursued by web browsers for
implementation. SIMD operations exposed to the web are under active
development within WebAssembly, with operations based on the SIMD.js
operations. With WebAssembly in advanced development or shipping in
multiple browsers, it seems like an adequate vehicle to subsume asm.js
use cases, which are judged to be the broader cases. Although some
developers have expressed interest in using SIMD.js outside of asm.js,
implementers have found that implementing and optimizing for this case
reliably creates a lot of complexity, and have made the decision to
focus instead on delivering WebAssembly and SIMD instructions in WASM.

See https://github.com/WebAssembly/simd for current development.

This repository retains a historical snapshot of the SIMD.js specification work:
*  The authoritative API reference documentation is generated from tc39/spec.html. You can view a rendered copy at http://tc39.github.io/ecmascript_simd/ .
*  A polyfill at src/ecmascript_simd.js, which can't implement value semantics, but includes a correct implementation of all functions
*  Extensive tests at src/ecmascript_simd_tests.js, which can be run using other files in src/. Benchmarks and example code live in the same directory.
*  A presentation explaining the motivation and outlining the approach at [tc39/SIMD-128 TC-39.pdf](https://github.com/tc39/ecmascript_simd/blob/master/tc39/SIMD-128%20TC-39.pdf)

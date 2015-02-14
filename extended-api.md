SIMD.js Extended API Proposal
=============================

This document proposes an extended API for SIMD.js which is meant provide access
to platforms-specific optimizations. It will sit on top of and complement the
base API.

The expectation is that most users will use the base API most of the time. While
some compromises are being made to serve portability, most of the base API will
still be fast, and it will deliver the most consistent results. The extension API
will offer opportunities for performance tuning, will support specialized code
sequences, and will aid in porting of code from other platforms.

This proposal splits the problem space into two parts:
 - operations which are portable, but with semantic differences
 - operations which are only available on some platforms

Operations which are portable, but with semantic differences
------------------------------------------------------------

Primarily, this will use a new `SIMD.relaxed` namespace:

```
SIMD.relaxed.int32x4.fromFloat32x4     // relaxed on NaN or overflow
SIMD.relaxed.float32x4.max             // relaxed on NaN, 0 and -0 fungible
SIMD.relaxed.int32x4.shiftLeftByScalar // relaxed on shift count overflow
...
```

Functions in `SIMD.relaxed` mimic functions in the base API with corresponding names,
and provide weaker portability with greater potential for performance, for example by
having unspecified results if NaN appear in any part of the (implied) computation, by
treating negative zero as interchangeable with zero, or by having unspecified
results if an overflow occurs.

Note that an implementation in which these are all identical to their corresponding
functions in the base namespace will be fully conforming.

Accompanying this is a new `SIMD.checked` namespace to help developers find errors:

```
SIMD.checked.int32x4.fromFloat32x4
SIMD.checked.float32x4.max
SIMD.checked.int32x4.shiftLeftByScalar
...
```

Functions in `SIMD.checked` all correspond to functions in `SIMD.relaxed` and
throw on any value which would produce unspecified results. They may also
canonicalize negative zero to positive zero. We'll publish a standard polyfill for
these functions which implementations or users can use if they wish.

Operations which are only available on some platforms
-----------------------------------------------------

Operations from all platforms are collected together in a single `SIMD.universe` namespace:

```
SIMD.universe.float32x4.fma
SIMD.universe.int32x4.rotateLeft
SIMD.universe.int32x4.rotateRight
SIMD.universe.int32x4.signMask        // movmskps on x86
SIMD.universe.int32x4.bitInsertIfTrue // vbit on ARM
...
```

Unlike in the `SIMD.relaxed` namespace, these operations all have fairly strict
semantics.

We'll publish a standard polyfill that will fill in all functions in the
`SIMD.universe` namespace that the JIT doesn't predefine. This will ensure that
programs continue to at least execute across platforms, though of course the
performance may vary widely.

Some indication of the performance will be made:

```
SIMD.isFast
```

This function takes a single argument, a function in the `SIMD.universe` API,
and returns a bool indicating whether the given function is "fast" -- roughly
meaning a single operation in the underlying platform.

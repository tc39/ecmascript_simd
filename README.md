# ecmascript_simd
===============

128-bit SIMD numeric value type ECMAScript straw man proposal.

## Recent Changes (Most recent at the top)

* Added full set of operations on SIMD.float64x2, including compares
* Replaced SIMD.XXX.toYYY() conversion operators with SIMD.YYY.fromXXX() operators
* Added corresponding bitwise conversion operators named SIMD.YYY.fromXXXBits()
* Introduced SIMD.XXX.select() operators for float32x4, float64x2, and int32x4
* Made the SIMD.int32x4.fromFloat32x4() and SIMD.int32x4.fromFloat64x2 do proper truncation
* Added tests for all new operators
* Added shiftLeft, shiftRightLogical, shiftRightArithmetic on int32x4.
* Added equals, greaterThan, and lessThan that operate on int32x4.
* Add bit operations (and, or, xor, and not) that operate directly on float32x4.
* Moved constructors into SIMD module.
* API refactor: all operations bucketed by type (SIMD.float32x4 and SIMD.int32x4)
* Replaced Uint32x4 and Uint32x4Array with Int32x4 and Int32x4Array.
* Added Uint32x4Array.
* Support for typed array views on Float32x4Array.
* Support for Float32x4Array views of other typed arrays.
* Support for Float32x4Array copy constructor.
* Initial implementation of Float32x4Array ([] -> getAt, []= -> setAt).
* Added add, subtract, multiply operations for uint32x4.
* Add .signMask getter to uint32x4 and float32x4.
* Added value cast and renamed existing cast to bitCast.
* All operations have been moved from being member methods to module methods
  on the SIMD module.
* Types have been renamed to be lower case.
* The shuffle getters (xxxx...wwww) have been removed. There is now a shuffle SIMD module function.

## API

The authoritative API reference documentation is generated from tc39/spec.html. You can view a rendered copy at http://littledan.github.io/simd.html .

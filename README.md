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

ECMAScript SIMD is implemented in the `SIMD` module. A simple example
adding two `float32x4` instances together:

```
var a = float32x4(1.0, 2.0, 3.0, 4.0);
var b = float32x4(5.0, 6.0, 7.0, 8.0);
var c = SIMD.float32x4.add(a,b);
```

Will result in `c` having the values `[6.0, 8.0, 10.0, 12.0]`.

For the complete and up to date API see the current [polyfill source](https://github.com/johnmccutchan/ecmascript_simd/blob/master/src/ecmascript_simd.js)

## Introduction

ECMAScript provides no programmer accessible access to the Single Instruction
Multiple Data **(SIMD)** instruction sets that are available in common CPU
architectures. In this proposal, the **SIMD** data types and operations are
modeled for both [NEON]
(http://en.wikipedia.org/wiki/ARM_architecture#Advanced_SIMD_.28NEON.29) (ARMv7)
and [SSE](http://en.wikipedia.org/wiki/Streaming_SIMD_Extensions) (IA32/X64)
instruction sets. They should also be compatible with [AltiVec]
(http://en.wikipedia.org/wiki/AltiVec) although no specific consideration for
AltiVec has been made.

**SIMD** instruction sets perform the same operation on multiple values
simultaneously. **SIMD** instructions offer a type of parallel computing. Most
**SIMD** instructions operate on [single precision floating point]
(http://en.wikipedia.org/wiki/Single-precision_floating-point_format) values.
Some instructions operate on 32-bit unsigned integers and there are other more
exotic instructions which operate on 16 single byte values. In this proposal
data types are restricted to single precision floating point and 32-bit
unsigned integer values.

## Overview

This proposal defines two new data types: `float32x4` and `int32x4`. Both data
types are immutable. Meaning, it is not possible to alter the internal state of
an instance. Practically speaking, all operations return a new instance.

A `float32x4` holds 4 32-bit single precision floating point values. Data is
arranged into _lanes_. The lanes are **x**, **y**, **z**, and **w**.

A `int32x4` holds 4 32-bit signed integer values. Data is arranged into
_lanes_. The lanes are **x**, **y**, **z**, and **w**.

<table>
<thead>
<tr>
<td colspan="16"><i>bytes</i></td>
</tr>
<tr>
<td>15</td>
<td>14</td>
<td>13</td>
<td>12</td>
<td>11</td>
<td>10</td>
<td>9</td>
<td>8</td>
<td>7</td>
<td>6</td>
<td>5</td>
<td>4</td>
<td>3</td>
<td>2</td>
<td>1</td>
<td>0</td>
</tr>
<tr>
<td colspan="16"><i>lanes</i></td>
</tr>
<tr>
<td colspan="4"><b>w</b></td>
<td colspan="4"><b>z</b></td>
<td colspan="4"><b>y</b></td>
<td colspan="4"><b>x</b></td>
</table>

## Data Types

`float32x4` 128-bits divided into 4 lanes storing single precision floating
point values.

`Float32x4Array` A [typed array](http://www.khronos.org/registry/typedarray/specs/latest/)
holding float32x4 as packed binary data. Arrays of this type can be aliased using other typed
arrays and individual bytes can be manipulated using a DataView.

`int32x4` 128-bits divided into 4 lanes storing 32-bit signed integer values.

`Int32x4Array` A [typed array](http://www.khronos.org/registry/typedarray/specs/latest/)
holding int32x4 as packed binary data. Arrays of this type can be aliased using other typed
arrays and individual bytes can be manipulated using a DataView.

## float32x4

### Constructors

**float32x4(double x, double y, double z, double w)**

Create a new `float32x4` instance with lane values matching the values
passed in as arguments. The input values are specified in double precision
floating and are converted to single precision floating point values before
being stored.

**float32x4.zero()**

Create a new `float32x4` instance with all lanes being 0.0.


**float32x4.splat(double s)**

Create a new `float32x4` instance with all lanes set to **s**

### Lane Accessors

**getter double x**

Access the value stored in the **x** lane. The value will be converted from
single precision to double precision before being returned.

**getter double y**

Access the value stored in the **y** lane. The value will be converted from
single precision to double precision before being returned.

**getter double z**

Access the value stored in the **z** lane. The value will be converted from
single precision to double precision before being returned.

**getter double w**

Access the value stored in the **w** lane. The value will be converted from
single precision to double precision before being returned.

### Lane Mutators

**float32x4 withX(double x)**

Return a new instance with all lane values matching lane values of **this**
except the the value in the **x** lane being given the value of **x**.

**float32x4 withY(double y)**

Return a new instance with all lane values matching lane values of **this**
except the the value in the **y** lane being given the value of **x**.

**float32x4 withZ(double z)**

Return a new instance with all lane values matching lane values of **this**
except the the value in the **z** lane being given the value of **x**.

**float32x4 withW(double w)**

Return a new instance with all lane values matching lane values of **this**
except the the value in the **w** lane being given the value of **x**.

## int32x4

### Constructors

**int32x4(integer x, integer y, integer z, integer w)**

**int32x4.bool(boolean x, boolean y, boolean z, boolean w)**

**int32x4.splat(integer s)**

### Selection Operation

**float32x4 select(float32x4 trueValue, float32x4 falseValue)**

### Lane Accessors

**getter integer x**

Access the value stored in the **x** lane.

**getter integer y**

Access the value stored in the **y** lane.

**getter integer z**

Access the value stored in the **z** lane.

**getter integer w**

Access the value stored in the **w** lane.

**getter boolean flagX**

Access the boolean value stored in the **x** lane. If the **x** lane is not 0
the boolean value will be true. If the **x** lane is 0 the boolean value will
be false.

**getter boolean flagY**

Access the boolean value stored in the **y** lane. If the **y** lane is not 0
the boolean value will be true. If the **y** lane is 0 the boolean value will
be false.

**getter boolean flagZ**

Access the boolean value stored in the **z** lane. If the **z** lane is not 0
the boolean value will be true. If the **z** lane is 0 the boolean value will
be false.

**getter boolean flagW**

Access the boolean value stored in the **w** lane. If the **w** lane is not 0
the boolean value will be true. If the **w** lane is 0 the boolean value will
be false.

### Lane Mutators

**int32x4 withX(integer x)**

**int32x4 withY(integer y)**

**int32x4 withZ(integer z)**

**int32x4 withW(integer w)**

**int32x4 withFlagX(boolean x)**

**int32x4 withFlagY(boolean y)**

**int32x4 withFlagZ(boolean z)**

**int32x4 withFlagW(boolean w)**


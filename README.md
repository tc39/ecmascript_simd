# ecmascript_simd
===============

128-bit SIMD numeric value type ECMAScript straw man proposal.

## Introduction

ECMAScript provides no programmer accessible access to the Single Instruction
Multiple Data \(**SIMD**\) instruction sets that are available in common CPU
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

This proposal defines two new data types: `Float32x4` and `Uint32x4`. Both data
types are immutable. Meaning, it is not possible to alter the internal state of
an instance. In other words, all operations return new instances.

A `Float32x4` holds 4 32-bit single precision floating point values. Data is
arranged into _lanes_. The lanes are **x**, **y**, **z**, and **w**.

A `Uint32x4` holds 4 32-bit unsigned integer values. Data is arranged into
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

`Float32x4` 128-bits divided into 4 lanes storing single precision floating
point values.

`Uint32x4` 128-bits divided into 4 lanes storing 32-bit unsigned integer values.

## Type Conversion Rules

When converting between a `Float32x4` and a `Uint32x4`, the values cannot
be altered. No observable difference can be introduced when any `Uint32x4`
is converted to `Float32x4` and back to `Uint32x4`. Similarly when any
`Float32x4` is converted to `Uint32x4` and back to `Float32x4`.

## Float32x4

### Constructors

**Float32x4(double x, double y, double z, double w)**

Create a new `Float32x4` instance with lane values matching the values
passed in as arguments. The input values are specified in double precision
floating and are converted to single precision floating point values before
being stored.

**Float32x4.zero()**

Create a new `Float32x4` instance with all lanes being 0.0.

### Arithmetic Operations

**Float32x4 add(Float32x4 a, Float32x4 b)**

Create a new `Float32x4` instance with lane values computed from the lane wise
addition of **a** and **b**.

**Float32x4 sub(Float32x4 a, Float32x4 b)**

Create a new `Float32x4` instance with lane values computed from the lane wise
subtraction of **a** and **b**.

**Float32x4 mul(Float32x4 a, Float32x4 b)**

Create a new `Float32x4` instance with lane values computed from the lane wise
multiplication of **a** and **b**.

**Float32x4 div(Float32x4 a, Float32x4 b)**

Create a new `Float32x4` instance with lane values computed from the lane wise
division of **a** and **b**.

**Float32x4 neg()**

Create a new `Float32x4` instance with lane values computed from the lane wise
negation of **this**.

**Float32x4 abs()**

Create a new `Float32x4` instance with lane values computed from the lane wise
absolute value of **this**.

**Float32x4 reciprocal()**

Create a new `Float32x4` instance with lane values computed from the lane wise
reciprocal **this**.

**Float32x4 reciprocalSqrt()**

Create a new `Float32x4` instance with lane values computed from the lane wise
square root of the reciprocal **this**.

**Float32x4 sqrt()**

Create a new `Float32x4` instance with lane values computed from the lane wise
square root of **this**.

**Float32x4 scale(double s)**

Create a new `Float32x4` instance with lane values computed from the lane wise
multiplication of **this** and the scalar value **s**.

### Comparison Operations

**Uint32x4 lessThan(Float32x4 other)**

Create a new `Uint32x4` instance with lane values computed from the lane wise
comparison of **this** and **other**. Each lane where the comparison is
true will contain `0xFFFFFFFF`. Each lane where the comparison
is false will contain `0x0`.

**Uint32x4 lessThanOrEqual(Float32x4 other)**

Create a new `Uint32x4` instance with lane values computed from the lane wise
comparison of **this** and **other**. Each lane where the comparison is
true will contain `0xFFFFFFFF`. Each lane where the comparison
is false will contain `0x0`.

**Uint32x4 equal(Float32x4 other)**

Create a new `Uint32x4` instance with lane values computed from the lane wise
comparison of **this** and **other**. Each lane where the comparison is
true will contain `0xFFFFFFFF`. Each lane where the comparison
is false will contain `0x0`.

**Uint32x4 notEqual(Float32x4 other)**

Create a new `Uint32x4` instance with lane values computed from the lane wise
comparison of **this** and **other**. Each lane where the comparison is
true will contain `0xFFFFFFFF`. Each lane where the comparison
is false will contain `0x0`.

**Uint32x4 greaterThanOrEqual(Float32x4 other)**

Create a new `Uint32x4` instance with lane values computed from the lane wise
comparison of **this** and **other**. Each lane where the comparison is
true will contain `0xFFFFFFFF`. Each lane where the comparison
is false will contain `0x0`.

**Uint32x4 greaterThan(Float32x4 other)**

Create a new `Uint32x4` instance with lane values computed from the lane wise
comparison of **this** and **other**. Each lane where the comparison is
true will contain `0xFFFFFFFF`. Each lane where the comparison
is false will contain `0x0`.

### Clamping Operations

**Float32x4 clamp(Float32x4 lowerLimit, Float32x4 upperLimit)**

Create a new `Float32x4` instance with lane values computed from the lane
wise clamping of **this** between **lowerLimit** and **upperLimit**. Result is
undefined if any lane in **lowerLimit** is greater than the identical lane
in **upperLimit**.

**Float32x4 max(Float32x4 other)**

Create a new `Float32x4` instance with lane values computed from the lane
wise maximum of **this** and **other**.

**Float32x4 min(Float32x4 other)**

Create a new `Float32x4` instance with lane values computed from the lane
wise minimum of **this** and **other**.

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

### Shuffle Operations

**getter Float32x4 xxxx**

Return a new instance with all lanes having the value of the **x** lane.

**getter Float32x4 yyyy**

Return a new instance with all lanes having the value of the **y** lane.

**getter Float32x4 zzzz**

Return a new instance with all lanes having the value of the **z** lane.

**getter Float32x4 wwww**

Return a new instance with all lanes having the value of the **w** lane.

*NOTE*: All combinations of 4 consecutive **x**, **y**, **z**, or **w** are
valid shuffle getters. (e.g. **wxyz** and **wzyx** are valid shuffle getters.)

## Uint32x4


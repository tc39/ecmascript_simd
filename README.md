# ecmascript_simd
===============

128-bit SIMD numeric type ECMAScript straw man proposal.

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
arranged into _lanes_. The lanes are `x`, `y`, `z`, and `w`.

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
<td><b>w</b></td>
<td><b>z</b></td>
<td><b>y</b></td>
<td><b>x</b></td>
</table>

## Data Types
==========

`Float32x4` -

### Data Type Memory Layout
===============
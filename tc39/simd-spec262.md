<a name="SIMD"></a>
## SIMD
**Kind**: global class  

* [SIMD](#SIMD)
  * [.float32x4](#SIMD.float32x4)
    * [new SIMD.float32x4(value, value, value, value)](#new_SIMD.float32x4_new)
    * [.splat](#SIMD.float32x4.splat)
      * [new SIMD.float32x4.splat(value)](#new_SIMD.float32x4.splat_new)
    * [.extractLane(t, i)](#SIMD.float32x4.extractLane) ⇒ <code>double</code>
    * [.replaceLane(t, i, value)](#SIMD.float32x4.replaceLane) ⇒ <code>float32x4</code>
    * [.check(v)](#SIMD.float32x4.check) ⇒ <code>float32x4</code>
    * [.fromFloat64x2(t)](#SIMD.float32x4.fromFloat64x2) ⇒ <code>float32x4</code>
    * [.fromInt32x4(t)](#SIMD.float32x4.fromInt32x4) ⇒ <code>float32x4</code>
    * [.fromFloat64x2Bits(t)](#SIMD.float32x4.fromFloat64x2Bits) ⇒ <code>float32x4</code>
    * [.fromInt32x4Bits(t)](#SIMD.float32x4.fromInt32x4Bits) ⇒ <code>float32x4</code>
    * [.fromInt16x8Bits(t)](#SIMD.float32x4.fromInt16x8Bits) ⇒ <code>float32x4</code>
    * [.fromInt8x16Bits(t)](#SIMD.float32x4.fromInt8x16Bits) ⇒ <code>float32x4</code>
    * [.abs(t)](#SIMD.float32x4.abs) ⇒ <code>float32x4</code>
    * [.neg(t)](#SIMD.float32x4.neg) ⇒ <code>float32x4</code>
    * [.add(a, b)](#SIMD.float32x4.add) ⇒ <code>float32x4</code>
    * [.sub(a, b)](#SIMD.float32x4.sub) ⇒ <code>float32x4</code>
    * [.mul(a, b)](#SIMD.float32x4.mul) ⇒ <code>float32x4</code>
    * [.div(a, b)](#SIMD.float32x4.div) ⇒ <code>float32x4</code>
    * [.clamp(t, lowerLimit, upperLimit)](#SIMD.float32x4.clamp) ⇒ <code>float32x4</code>
    * [.min(t, other)](#SIMD.float32x4.min) ⇒ <code>float32x4</code>
    * [.max(t, other)](#SIMD.float32x4.max) ⇒ <code>float32x4</code>
    * [.minNum(t, other)](#SIMD.float32x4.minNum) ⇒ <code>float32x4</code>
    * [.maxNum(t, other)](#SIMD.float32x4.maxNum) ⇒ <code>float32x4</code>
    * [.reciprocalApproximation(t)](#SIMD.float32x4.reciprocalApproximation) ⇒ <code>float32x4</code>
    * [.reciprocalSqrtApproximation(t)](#SIMD.float32x4.reciprocalSqrtApproximation) ⇒ <code>float32x4</code>
    * [.sqrt(t)](#SIMD.float32x4.sqrt) ⇒ <code>float32x4</code>
    * [.swizzle(t, x, y, z, w)](#SIMD.float32x4.swizzle) ⇒ <code>float32x4</code>
    * [.shuffle(t1, t2, x, y, z, w)](#SIMD.float32x4.shuffle) ⇒ <code>float32x4</code>
    * [.lessThan(t, other)](#SIMD.float32x4.lessThan) ⇒ <code>int32x4</code>
    * [.lessThanOrEqual(t, other)](#SIMD.float32x4.lessThanOrEqual) ⇒ <code>int32x4</code>
    * [.equal(t, other)](#SIMD.float32x4.equal) ⇒ <code>int32x4</code>
    * [.notEqual(t, other)](#SIMD.float32x4.notEqual) ⇒ <code>int32x4</code>
    * [.greaterThanOrEqual(t, other)](#SIMD.float32x4.greaterThanOrEqual) ⇒ <code>int32x4</code>
    * [.greaterThan(t, other)](#SIMD.float32x4.greaterThan) ⇒ <code>int32x4</code>
    * [.select(t, trueValue, falseValue)](#SIMD.float32x4.select) ⇒ <code>float32x4</code>
    * [.bitselect(t, trueValue, falseValue)](#SIMD.float32x4.bitselect) ⇒ <code>float32x4</code>
    * [.and(a, b)](#SIMD.float32x4.and) ⇒ <code>float32x4</code>
    * [.or(a, b)](#SIMD.float32x4.or) ⇒ <code>float32x4</code>
    * [.xor(a, b)](#SIMD.float32x4.xor) ⇒ <code>float32x4</code>
    * [.not(a)](#SIMD.float32x4.not) ⇒ <code>float32x4</code>
    * [.load(tarray, index)](#SIMD.float32x4.load) ⇒ <code>float32x4</code>
    * [.load1(tarray, index)](#SIMD.float32x4.load1) ⇒ <code>float32x4</code>
    * [.load2(tarray, index)](#SIMD.float32x4.load2) ⇒ <code>float32x4</code>
    * [.load3(tarray, index)](#SIMD.float32x4.load3) ⇒ <code>float32x4</code>
    * [.store(tarray, index, value)](#SIMD.float32x4.store) ⇒ <code>void</code>
    * [.store1(tarray, index, value)](#SIMD.float32x4.store1) ⇒ <code>void</code>
    * [.store2(tarray, index, value)](#SIMD.float32x4.store2) ⇒ <code>void</code>
    * [.store3(tarray, index, value)](#SIMD.float32x4.store3) ⇒ <code>void</code>
  * [.float64x2](#SIMD.float64x2)
    * [new SIMD.float64x2(value, value)](#new_SIMD.float64x2_new)
    * [.splat](#SIMD.float64x2.splat)
      * [new SIMD.float64x2.splat(value)](#new_SIMD.float64x2.splat_new)
    * [.extractLane(t, i)](#SIMD.float64x2.extractLane) ⇒ <code>double</code>
    * [.replaceLane(t, i, value)](#SIMD.float64x2.replaceLane) ⇒ <code>float64x2</code>
    * [.check(v)](#SIMD.float64x2.check) ⇒ <code>float64x2</code>
    * [.fromFloat32x4(t)](#SIMD.float64x2.fromFloat32x4) ⇒ <code>float64x2</code>
    * [.fromInt32x4(t)](#SIMD.float64x2.fromInt32x4) ⇒ <code>float64x2</code>
    * [.fromFloat32x4Bits(t)](#SIMD.float64x2.fromFloat32x4Bits) ⇒ <code>float64x2</code>
    * [.fromInt32x4Bits(t)](#SIMD.float64x2.fromInt32x4Bits) ⇒ <code>float64x2</code>
    * [.fromInt16x8Bits(t)](#SIMD.float64x2.fromInt16x8Bits) ⇒ <code>float64x2</code>
    * [.fromInt8x16Bits(t)](#SIMD.float64x2.fromInt8x16Bits) ⇒ <code>float64x2</code>
    * [.abs(t)](#SIMD.float64x2.abs) ⇒ <code>float64x2</code>
    * [.neg(t)](#SIMD.float64x2.neg) ⇒ <code>float64x2</code>
    * [.add(a, b)](#SIMD.float64x2.add) ⇒ <code>float64x2</code>
    * [.sub(a, b)](#SIMD.float64x2.sub) ⇒ <code>float64x2</code>
    * [.mul(a, b)](#SIMD.float64x2.mul) ⇒ <code>float64x2</code>
    * [.div(a, b)](#SIMD.float64x2.div) ⇒ <code>float64x2</code>
    * [.clamp(t, lowerLimit, upperLimit)](#SIMD.float64x2.clamp) ⇒ <code>float64x2</code>
    * [.min(t, other)](#SIMD.float64x2.min) ⇒ <code>float64x2</code>
    * [.max(t, other)](#SIMD.float64x2.max) ⇒ <code>float64x2</code>
    * [.minNum(t, other)](#SIMD.float64x2.minNum) ⇒ <code>float64x2</code>
    * [.maxNum(t, other)](#SIMD.float64x2.maxNum) ⇒ <code>float64x2</code>
    * [.reciprocalApproximation(t)](#SIMD.float64x2.reciprocalApproximation) ⇒ <code>float64x2</code>
    * [.reciprocalSqrtApproximation(t)](#SIMD.float64x2.reciprocalSqrtApproximation) ⇒ <code>float64x2</code>
    * [.sqrt(t)](#SIMD.float64x2.sqrt) ⇒ <code>float64x2</code>
    * [.swizzle(t, x, y)](#SIMD.float64x2.swizzle) ⇒ <code>float64x2</code>
    * [.shuffle(t1, t2, x, y)](#SIMD.float64x2.shuffle) ⇒ <code>float64x2</code>
    * [.lessThan(t, other)](#SIMD.float64x2.lessThan) ⇒ <code>int32x4</code>
    * [.lessThanOrEqual(t, other)](#SIMD.float64x2.lessThanOrEqual) ⇒ <code>int32x4</code>
    * [.equal(t, other)](#SIMD.float64x2.equal) ⇒ <code>int32x4</code>
    * [.notEqual(t, other)](#SIMD.float64x2.notEqual) ⇒ <code>int32x4</code>
    * [.greaterThanOrEqual(t, other)](#SIMD.float64x2.greaterThanOrEqual) ⇒ <code>int32x4</code>
    * [.greaterThan(t, other)](#SIMD.float64x2.greaterThan) ⇒ <code>int32x4</code>
    * [.select(t, trueValue, falseValue)](#SIMD.float64x2.select) ⇒ <code>float64x2</code>
    * [.bitselect(t, trueValue, falseValue)](#SIMD.float64x2.bitselect) ⇒ <code>float64x2</code>
    * [.load(tarray, index)](#SIMD.float64x2.load) ⇒ <code>float64x2</code>
    * [.load1(tarray, index)](#SIMD.float64x2.load1) ⇒ <code>float64x2</code>
    * [.store(tarray, index, value)](#SIMD.float64x2.store) ⇒ <code>void</code>
    * [.store1(tarray, index, value)](#SIMD.float64x2.store1) ⇒ <code>void</code>
  * [.int32x4](#SIMD.int32x4)
    * [new SIMD.int32x4(32-bit, 32-bit, 32-bit, 32-bit)](#new_SIMD.int32x4_new)
    * [.bool](#SIMD.int32x4.bool)
      * [new SIMD.int32x4.bool(flag, flag, flag, flag)](#new_SIMD.int32x4.bool_new)
    * [.splat](#SIMD.int32x4.splat)
      * [new SIMD.int32x4.splat(value)](#new_SIMD.int32x4.splat_new)
    * [.extractLane(t, i)](#SIMD.int32x4.extractLane) ⇒ <code>integer</code>
    * [.replaceLane(t, i, value)](#SIMD.int32x4.replaceLane) ⇒ <code>int32x4</code>
    * [.allTrue(v)](#SIMD.int32x4.allTrue) ⇒ <code>Boolean</code>
    * [.anyTrue(v)](#SIMD.int32x4.anyTrue) ⇒ <code>Boolean</code>
    * [.check(v)](#SIMD.int32x4.check) ⇒ <code>int32x4</code>
    * [.fromFloat32x4(t)](#SIMD.int32x4.fromFloat32x4) ⇒ <code>int32x4</code>
    * [.fromFloat64x2(t)](#SIMD.int32x4.fromFloat64x2) ⇒ <code>int32x4</code>
    * [.fromFloat32x4Bits(t)](#SIMD.int32x4.fromFloat32x4Bits) ⇒ <code>int32x4</code>
    * [.fromFloat64x2Bits(t)](#SIMD.int32x4.fromFloat64x2Bits) ⇒ <code>int32x4</code>
    * [.fromInt16x8Bits(t)](#SIMD.int32x4.fromInt16x8Bits) ⇒ <code>int32x4</code>
    * [.fromInt8x16Bits(t)](#SIMD.int32x4.fromInt8x16Bits) ⇒ <code>int32x4</code>
    * [.and(a, b)](#SIMD.int32x4.and) ⇒ <code>int32x4</code>
    * [.or(a, b)](#SIMD.int32x4.or) ⇒ <code>int32x4</code>
    * [.xor(a, b)](#SIMD.int32x4.xor) ⇒ <code>int32x4</code>
    * [.not(t)](#SIMD.int32x4.not) ⇒ <code>int32x4</code>
    * [.neg(t)](#SIMD.int32x4.neg) ⇒ <code>int32x4</code>
    * [.add(a, b)](#SIMD.int32x4.add) ⇒ <code>int32x4</code>
    * [.sub(a, b)](#SIMD.int32x4.sub) ⇒ <code>int32x4</code>
    * [.mul(a, b)](#SIMD.int32x4.mul) ⇒ <code>int32x4</code>
    * [.swizzle(t, x, y, z, w)](#SIMD.int32x4.swizzle) ⇒ <code>int32x4</code>
    * [.shuffle(t1, t2, x, y, z, w)](#SIMD.int32x4.shuffle) ⇒ <code>int32x4</code>
    * [.select(t, trueValue, falseValue)](#SIMD.int32x4.select) ⇒ <code>int32x4</code>
    * [.bitselect(t, trueValue, falseValue)](#SIMD.int32x4.bitselect) ⇒ <code>int32x4</code>
    * [.equal(t, other)](#SIMD.int32x4.equal) ⇒ <code>int32x4</code>
    * [.notEqual(t, other)](#SIMD.int32x4.notEqual) ⇒ <code>int32x4</code>
    * [.greaterThan(t, other)](#SIMD.int32x4.greaterThan) ⇒ <code>int32x4</code>
    * [.greaterThanOrEqual(t, other)](#SIMD.int32x4.greaterThanOrEqual) ⇒ <code>int32x4</code>
    * [.lessThan(t, other)](#SIMD.int32x4.lessThan) ⇒ <code>int32x4</code>
    * [.lessThanOrEqual(t, other)](#SIMD.int32x4.lessThanOrEqual) ⇒ <code>int32x4</code>
    * [.shiftLeftByScalar(a, bits)](#SIMD.int32x4.shiftLeftByScalar) ⇒ <code>int32x4</code>
    * [.shiftRightLogicalByScalar(a, bits)](#SIMD.int32x4.shiftRightLogicalByScalar) ⇒ <code>int32x4</code>
    * [.shiftRightArithmeticByScalar(a, bits)](#SIMD.int32x4.shiftRightArithmeticByScalar) ⇒ <code>int32x4</code>
    * [.load(tarray, index)](#SIMD.int32x4.load) ⇒ <code>int32x4</code>
    * [.load1(tarray, index)](#SIMD.int32x4.load1) ⇒ <code>int32x4</code>
    * [.load2(tarray, index)](#SIMD.int32x4.load2) ⇒ <code>int32x4</code>
    * [.load3(tarray, index)](#SIMD.int32x4.load3) ⇒ <code>int32x4</code>
    * [.store(tarray, index, value)](#SIMD.int32x4.store) ⇒ <code>void</code>
    * [.store1(tarray, index, value)](#SIMD.int32x4.store1) ⇒ <code>void</code>
    * [.store2(tarray, index, value)](#SIMD.int32x4.store2) ⇒ <code>void</code>
    * [.store3(tarray, index, value)](#SIMD.int32x4.store3) ⇒ <code>void</code>
  * [.int16x8](#SIMD.int16x8)
    * [new SIMD.int16x8(16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit)](#new_SIMD.int16x8_new)
    * [.bool](#SIMD.int16x8.bool)
      * [new SIMD.int16x8.bool(flag, flag, flag, flag, flag, flag, flag, flag)](#new_SIMD.int16x8.bool_new)
    * [.splat](#SIMD.int16x8.splat)
      * [new SIMD.int16x8.splat(value)](#new_SIMD.int16x8.splat_new)
    * [.extractLane(t, i)](#SIMD.int16x8.extractLane) ⇒ <code>integer</code>
    * [.replaceLane(t, i, value)](#SIMD.int16x8.replaceLane) ⇒ <code>int16x8</code>
    * [.allTrue(v)](#SIMD.int16x8.allTrue) ⇒ <code>Boolean</code>
    * [.anyTrue(v)](#SIMD.int16x8.anyTrue) ⇒ <code>Boolean</code>
    * [.check(v)](#SIMD.int16x8.check) ⇒ <code>int16x8</code>
    * [.fromFloat32x4Bits(t)](#SIMD.int16x8.fromFloat32x4Bits) ⇒ <code>int16x8</code>
    * [.fromFloat64x2Bits(t)](#SIMD.int16x8.fromFloat64x2Bits) ⇒ <code>int16x8</code>
    * [.fromInt32x4Bits(t)](#SIMD.int16x8.fromInt32x4Bits) ⇒ <code>int16x8</code>
    * [.fromInt8x16Bits(t)](#SIMD.int16x8.fromInt8x16Bits) ⇒ <code>int16x8</code>
    * [.and(a, b)](#SIMD.int16x8.and) ⇒ <code>int16x8</code>
    * [.or(a, b)](#SIMD.int16x8.or) ⇒ <code>int16x8</code>
    * [.xor(a, b)](#SIMD.int16x8.xor) ⇒ <code>int16x8</code>
    * [.not(t)](#SIMD.int16x8.not) ⇒ <code>int16x8</code>
    * [.neg(t)](#SIMD.int16x8.neg) ⇒ <code>int16x8</code>
    * [.add(a, b)](#SIMD.int16x8.add) ⇒ <code>int16x8</code>
    * [.sub(a, b)](#SIMD.int16x8.sub) ⇒ <code>int16x8</code>
    * [.mul(a, b)](#SIMD.int16x8.mul) ⇒ <code>int16x8</code>
    * [.swizzle(t, s0, s1, s2, s3, s4, s5, s6, s7)](#SIMD.int16x8.swizzle) ⇒ <code>int16x8</code>
    * [.shuffle(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7)](#SIMD.int16x8.shuffle) ⇒ <code>int16x8</code>
    * [.addSaturate(a, b)](#SIMD.int16x8.addSaturate) ⇒ <code>int16x8</code>
    * [.subSaturating(a, b)](#SIMD.int16x8.subSaturating) ⇒ <code>int16x8</code>
    * [.select(t, trueValue, falseValue)](#SIMD.int16x8.select) ⇒ <code>int16x8</code>
    * [.bitselect(t, trueValue, falseValue)](#SIMD.int16x8.bitselect) ⇒ <code>int16x8</code>
    * [.equal(t, other)](#SIMD.int16x8.equal) ⇒ <code>int16x8</code>
    * [.notEqual(t, other)](#SIMD.int16x8.notEqual) ⇒ <code>int16x8</code>
    * [.greaterThan(t, other)](#SIMD.int16x8.greaterThan) ⇒ <code>int16x8</code>
    * [.greaterThanOrEqual(t, other)](#SIMD.int16x8.greaterThanOrEqual) ⇒ <code>int16x8</code>
    * [.lessThan(t, other)](#SIMD.int16x8.lessThan) ⇒ <code>int16x8</code>
    * [.lessThanOrEqual(t, other)](#SIMD.int16x8.lessThanOrEqual) ⇒ <code>int16x8</code>
    * [.shiftLeftByScalar(a, bits)](#SIMD.int16x8.shiftLeftByScalar) ⇒ <code>int16x8</code>
    * [.shiftRightLogicalByScalar(a, bits)](#SIMD.int16x8.shiftRightLogicalByScalar) ⇒ <code>int16x8</code>
    * [.shiftRightArithmeticByScalar(a, bits)](#SIMD.int16x8.shiftRightArithmeticByScalar) ⇒ <code>int16x8</code>
    * [.load(tarray, index)](#SIMD.int16x8.load) ⇒ <code>int16x8</code>
    * [.store(tarray, index, value)](#SIMD.int16x8.store) ⇒ <code>void</code>
  * [.int8x16](#SIMD.int8x16)
    * [new SIMD.int8x16(8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit)](#new_SIMD.int8x16_new)
    * [.bool](#SIMD.int8x16.bool)
      * [new SIMD.int8x16.bool(flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag)](#new_SIMD.int8x16.bool_new)
    * [.splat](#SIMD.int8x16.splat)
      * [new SIMD.int8x16.splat(value)](#new_SIMD.int8x16.splat_new)
    * [.extractLane(t, i)](#SIMD.int8x16.extractLane) ⇒ <code>integer</code>
    * [.replaceLane(t, i, value)](#SIMD.int8x16.replaceLane) ⇒ <code>int8x16</code>
    * [.allTrue(v)](#SIMD.int8x16.allTrue) ⇒ <code>Boolean</code>
    * [.anyTrue(v)](#SIMD.int8x16.anyTrue) ⇒ <code>Boolean</code>
    * [.check(v)](#SIMD.int8x16.check) ⇒ <code>int8x16</code>
    * [.fromFloat32x4Bits(t)](#SIMD.int8x16.fromFloat32x4Bits) ⇒ <code>int8x16</code>
    * [.fromFloat64x2Bits(t)](#SIMD.int8x16.fromFloat64x2Bits) ⇒ <code>int8x16</code>
    * [.fromInt32x4Bits(t)](#SIMD.int8x16.fromInt32x4Bits) ⇒ <code>int8x16</code>
    * [.fromInt16x8Bits(t)](#SIMD.int8x16.fromInt16x8Bits) ⇒ <code>int8x16</code>
    * [.and(a, b)](#SIMD.int8x16.and) ⇒ <code>int8x16</code>
    * [.or(a, b)](#SIMD.int8x16.or) ⇒ <code>int8x16</code>
    * [.xor(a, b)](#SIMD.int8x16.xor) ⇒ <code>int8x16</code>
    * [.not(t)](#SIMD.int8x16.not) ⇒ <code>int8x16</code>
    * [.neg(t)](#SIMD.int8x16.neg) ⇒ <code>int8x16</code>
    * [.add(a, b)](#SIMD.int8x16.add) ⇒ <code>int8x16</code>
    * [.sub(a, b)](#SIMD.int8x16.sub) ⇒ <code>int8x16</code>
    * [.mul(a, b)](#SIMD.int8x16.mul) ⇒ <code>int8x16</code>
    * [.swizzle(t, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15)](#SIMD.int8x16.swizzle) ⇒ <code>int8x16</code>
    * [.shuffle(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15)](#SIMD.int8x16.shuffle) ⇒ <code>int8x16</code>
    * [.addSaturate(a, b)](#SIMD.int8x16.addSaturate) ⇒ <code>int8x16</code>
    * [.subSaturating(a, b)](#SIMD.int8x16.subSaturating) ⇒ <code>int8x16</code>
    * [.sumOfAbsoluteDifferences(a, b)](#SIMD.int8x16.sumOfAbsoluteDifferences) ⇒ <code>Number</code>
    * [.select(t, trueValue, falseValue)](#SIMD.int8x16.select) ⇒ <code>int8x16</code>
    * [.bitselect(t, trueValue, falseValue)](#SIMD.int8x16.bitselect) ⇒ <code>int8x16</code>
    * [.equal(t, other)](#SIMD.int8x16.equal) ⇒ <code>int8x16</code>
    * [.notEqual(t, other)](#SIMD.int8x16.notEqual) ⇒ <code>int8x16</code>
    * [.greaterThan(t, other)](#SIMD.int8x16.greaterThan) ⇒ <code>int8x16</code>
    * [.greaterThanOrEqual(t, other)](#SIMD.int8x16.greaterThanOrEqual) ⇒ <code>int8x16</code>
    * [.lessThan(t, other)](#SIMD.int8x16.lessThan) ⇒ <code>int8x16</code>
    * [.lessThanOrEqual(t, other)](#SIMD.int8x16.lessThanOrEqual) ⇒ <code>int8x16</code>
    * [.shiftLeftByScalar(a, bits)](#SIMD.int8x16.shiftLeftByScalar) ⇒ <code>int8x16</code>
    * [.shiftRightLogicalByScalar(a, bits)](#SIMD.int8x16.shiftRightLogicalByScalar) ⇒ <code>int8x16</code>
    * [.shiftRightArithmeticByScalar(a, bits)](#SIMD.int8x16.shiftRightArithmeticByScalar) ⇒ <code>int8x16</code>
    * [.load(tarray, index)](#SIMD.int8x16.load) ⇒ <code>int8x16</code>
    * [.store(tarray, index, value)](#SIMD.int8x16.store) ⇒ <code>void</code>

<a name="SIMD.float32x4"></a>
### SIMD.float32x4
**Kind**: static class of <code>[SIMD](#SIMD)</code>  

* [.float32x4](#SIMD.float32x4)
  * [new SIMD.float32x4(value, value, value, value)](#new_SIMD.float32x4_new)
  * [.splat](#SIMD.float32x4.splat)
    * [new SIMD.float32x4.splat(value)](#new_SIMD.float32x4.splat_new)
  * [.extractLane(t, i)](#SIMD.float32x4.extractLane) ⇒ <code>double</code>
  * [.replaceLane(t, i, value)](#SIMD.float32x4.replaceLane) ⇒ <code>float32x4</code>
  * [.check(v)](#SIMD.float32x4.check) ⇒ <code>float32x4</code>
  * [.fromFloat64x2(t)](#SIMD.float32x4.fromFloat64x2) ⇒ <code>float32x4</code>
  * [.fromInt32x4(t)](#SIMD.float32x4.fromInt32x4) ⇒ <code>float32x4</code>
  * [.fromFloat64x2Bits(t)](#SIMD.float32x4.fromFloat64x2Bits) ⇒ <code>float32x4</code>
  * [.fromInt32x4Bits(t)](#SIMD.float32x4.fromInt32x4Bits) ⇒ <code>float32x4</code>
  * [.fromInt16x8Bits(t)](#SIMD.float32x4.fromInt16x8Bits) ⇒ <code>float32x4</code>
  * [.fromInt8x16Bits(t)](#SIMD.float32x4.fromInt8x16Bits) ⇒ <code>float32x4</code>
  * [.abs(t)](#SIMD.float32x4.abs) ⇒ <code>float32x4</code>
  * [.neg(t)](#SIMD.float32x4.neg) ⇒ <code>float32x4</code>
  * [.add(a, b)](#SIMD.float32x4.add) ⇒ <code>float32x4</code>
  * [.sub(a, b)](#SIMD.float32x4.sub) ⇒ <code>float32x4</code>
  * [.mul(a, b)](#SIMD.float32x4.mul) ⇒ <code>float32x4</code>
  * [.div(a, b)](#SIMD.float32x4.div) ⇒ <code>float32x4</code>
  * [.clamp(t, lowerLimit, upperLimit)](#SIMD.float32x4.clamp) ⇒ <code>float32x4</code>
  * [.min(t, other)](#SIMD.float32x4.min) ⇒ <code>float32x4</code>
  * [.max(t, other)](#SIMD.float32x4.max) ⇒ <code>float32x4</code>
  * [.minNum(t, other)](#SIMD.float32x4.minNum) ⇒ <code>float32x4</code>
  * [.maxNum(t, other)](#SIMD.float32x4.maxNum) ⇒ <code>float32x4</code>
  * [.reciprocalApproximation(t)](#SIMD.float32x4.reciprocalApproximation) ⇒ <code>float32x4</code>
  * [.reciprocalSqrtApproximation(t)](#SIMD.float32x4.reciprocalSqrtApproximation) ⇒ <code>float32x4</code>
  * [.sqrt(t)](#SIMD.float32x4.sqrt) ⇒ <code>float32x4</code>
  * [.swizzle(t, x, y, z, w)](#SIMD.float32x4.swizzle) ⇒ <code>float32x4</code>
  * [.shuffle(t1, t2, x, y, z, w)](#SIMD.float32x4.shuffle) ⇒ <code>float32x4</code>
  * [.lessThan(t, other)](#SIMD.float32x4.lessThan) ⇒ <code>int32x4</code>
  * [.lessThanOrEqual(t, other)](#SIMD.float32x4.lessThanOrEqual) ⇒ <code>int32x4</code>
  * [.equal(t, other)](#SIMD.float32x4.equal) ⇒ <code>int32x4</code>
  * [.notEqual(t, other)](#SIMD.float32x4.notEqual) ⇒ <code>int32x4</code>
  * [.greaterThanOrEqual(t, other)](#SIMD.float32x4.greaterThanOrEqual) ⇒ <code>int32x4</code>
  * [.greaterThan(t, other)](#SIMD.float32x4.greaterThan) ⇒ <code>int32x4</code>
  * [.select(t, trueValue, falseValue)](#SIMD.float32x4.select) ⇒ <code>float32x4</code>
  * [.bitselect(t, trueValue, falseValue)](#SIMD.float32x4.bitselect) ⇒ <code>float32x4</code>
  * [.and(a, b)](#SIMD.float32x4.and) ⇒ <code>float32x4</code>
  * [.or(a, b)](#SIMD.float32x4.or) ⇒ <code>float32x4</code>
  * [.xor(a, b)](#SIMD.float32x4.xor) ⇒ <code>float32x4</code>
  * [.not(a)](#SIMD.float32x4.not) ⇒ <code>float32x4</code>
  * [.load(tarray, index)](#SIMD.float32x4.load) ⇒ <code>float32x4</code>
  * [.load1(tarray, index)](#SIMD.float32x4.load1) ⇒ <code>float32x4</code>
  * [.load2(tarray, index)](#SIMD.float32x4.load2) ⇒ <code>float32x4</code>
  * [.load3(tarray, index)](#SIMD.float32x4.load3) ⇒ <code>float32x4</code>
  * [.store(tarray, index, value)](#SIMD.float32x4.store) ⇒ <code>void</code>
  * [.store1(tarray, index, value)](#SIMD.float32x4.store1) ⇒ <code>void</code>
  * [.store2(tarray, index, value)](#SIMD.float32x4.store2) ⇒ <code>void</code>
  * [.store3(tarray, index, value)](#SIMD.float32x4.store3) ⇒ <code>void</code>

<a name="new_SIMD.float32x4_new"></a>
#### new SIMD.float32x4(value, value, value, value)
Construct a new instance of float32x4 number.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>double</code> | used for x lane. |
| value | <code>double</code> | used for y lane. |
| value | <code>double</code> | used for z lane. |
| value | <code>double</code> | used for w lane. |

<a name="SIMD.float32x4.splat"></a>
#### float32x4.splat
**Kind**: static class of <code>[float32x4](#SIMD.float32x4)</code>  
<a name="new_SIMD.float32x4.splat_new"></a>
##### new SIMD.float32x4.splat(value)
Construct a new instance of float32x4 number with the same valuein all lanes.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>double</code> | used for all lanes. |

<a name="SIMD.float32x4.extractLane"></a>
#### float32x4.extractLane(t, i) ⇒ <code>double</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>double</code> - The value in lane i of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| i | <code>integer</code> | Index in concatenation of t for lane i |

<a name="SIMD.float32x4.replaceLane"></a>
#### float32x4.replaceLane(t, i, value) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with the values in t andlane i replaced with {v}.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| i | <code>integer</code> | Index in concatenation of t for lane i |
| value | <code>double</code> | used for lane i. |

<a name="SIMD.float32x4.check"></a>
#### float32x4.check(v) ⇒ <code>float32x4</code>
Check whether the argument is a float32x4.

**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - The float32x4 instance.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.fromFloat64x2"></a>
#### float32x4.fromFloat64x2(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - A float32x4 with .x and .y from t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float32x4.fromInt32x4"></a>
#### float32x4.fromInt32x4(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - An integer to float conversion copy of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.float32x4.fromFloat64x2Bits"></a>
#### float32x4.fromFloat64x2Bits(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - a bit-wise copy of t as a float32x4.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float32x4.fromInt32x4Bits"></a>
#### float32x4.fromInt32x4Bits(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - a bit-wise copy of t as a float32x4.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.float32x4.fromInt16x8Bits"></a>
#### float32x4.fromInt16x8Bits(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - a bit-wise copy of t as a float32x4.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.float32x4.fromInt8x16Bits"></a>
#### float32x4.fromInt8x16Bits(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - a bit-wise copy of t as a float32x4.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.float32x4.abs"></a>
#### float32x4.abs(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with absolute values oft.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.neg"></a>
#### float32x4.neg(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with negated values oft.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.add"></a>
#### float32x4.add(a, b) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with a + b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float32x4</code> | An instance of float32x4. |
| b | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.sub"></a>
#### float32x4.sub(a, b) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with a - b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float32x4</code> | An instance of float32x4. |
| b | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.mul"></a>
#### float32x4.mul(a, b) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with a * b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float32x4</code> | An instance of float32x4. |
| b | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.div"></a>
#### float32x4.div(a, b) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with a / b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float32x4</code> | An instance of float32x4. |
| b | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.clamp"></a>
#### float32x4.clamp(t, lowerLimit, upperLimit) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with t's values clampedbetween lowerLimit and upperLimit.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| lowerLimit | <code>float32x4</code> | An instance of float32x4. |
| upperLimit | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.min"></a>
#### float32x4.min(t, other) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with the minimum value oft and other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.max"></a>
#### float32x4.max(t, other) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with the maximum value oft and other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.minNum"></a>
#### float32x4.minNum(t, other) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with the minimum value oft and other, preferring numbers over NaNs.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.maxNum"></a>
#### float32x4.maxNum(t, other) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with the maximum value oft and other, preferring numbers over NaNs.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.reciprocalApproximation"></a>
#### float32x4.reciprocalApproximation(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with an approximation of thereciprocal value of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.reciprocalSqrtApproximation"></a>
#### float32x4.reciprocalSqrtApproximation(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with an approximation of thereciprocal value of the square root of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.sqrt"></a>
#### float32x4.sqrt(t) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with square root ofvalues of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.swizzle"></a>
#### float32x4.swizzle(t, x, y, z, w) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with lanes swizzled.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4 to be swizzled. |
| x | <code>integer</code> | Index in t for lane x |
| y | <code>integer</code> | Index in t for lane y |
| z | <code>integer</code> | Index in t for lane z |
| w | <code>integer</code> | Index in t for lane w |

<a name="SIMD.float32x4.shuffle"></a>
#### float32x4.shuffle(t1, t2, x, y, z, w) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with lanes shuffled.  

| Param | Type | Description |
| --- | --- | --- |
| t1 | <code>float32x4</code> | An instance of float32x4 to be shuffled. |
| t2 | <code>float32x4</code> | An instance of float32x4 to be shuffled. |
| x | <code>integer</code> | Index in concatenation of t1 and t2 for lane x |
| y | <code>integer</code> | Index in concatenation of t1 and t2 for lane y |
| z | <code>integer</code> | Index in concatenation of t1 and t2 for lane z |
| w | <code>integer</code> | Index in concatenation of t1 and t2 for lane w |

<a name="SIMD.float32x4.lessThan"></a>
#### float32x4.lessThan(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t < other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.lessThanOrEqual"></a>
#### float32x4.lessThanOrEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t <= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.equal"></a>
#### float32x4.equal(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t == other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.notEqual"></a>
#### float32x4.notEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t != other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.greaterThanOrEqual"></a>
#### float32x4.greaterThanOrEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t >= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.greaterThan"></a>
#### float32x4.greaterThan(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t > other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| other | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.select"></a>
#### float32x4.select(t, trueValue, falseValue) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - Mix of lanes from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | Selector mask. An instance of int32x4 |
| trueValue | <code>float32x4</code> | Pick lane from here if corresponding selector lane is true |
| falseValue | <code>float32x4</code> | Pick lane from here if corresponding selector lane is false |

<a name="SIMD.float32x4.bitselect"></a>
#### float32x4.bitselect(t, trueValue, falseValue) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - Mix of bits from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | Selector mask. An instance of int32x4 |
| trueValue | <code>float32x4</code> | Pick bit from here if corresponding selector bit is 1 |
| falseValue | <code>float32x4</code> | Pick bit from here if corresponding selector bit is 0 |

<a name="SIMD.float32x4.and"></a>
#### float32x4.and(a, b) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with values of a & b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float32x4</code> | An instance of float32x4. |
| b | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.or"></a>
#### float32x4.or(a, b) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with values of a | b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float32x4</code> | An instance of float32x4. |
| b | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.xor"></a>
#### float32x4.xor(a, b) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with values of a ^ b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float32x4</code> | An instance of float32x4. |
| b | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.not"></a>
#### float32x4.not(a) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4 with values of ~a.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.load"></a>
#### float32x4.load(tarray, index) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.float32x4.load1"></a>
#### float32x4.load1(tarray, index) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.float32x4.load2"></a>
#### float32x4.load2(tarray, index) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.float32x4.load3"></a>
#### float32x4.load3(tarray, index) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  
**Returns**: <code>float32x4</code> - New instance of float32x4.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.float32x4.store"></a>
#### float32x4.store(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.store1"></a>
#### float32x4.store1(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.store2"></a>
#### float32x4.store2(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float32x4.store3"></a>
#### float32x4.store3(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float64x2"></a>
### SIMD.float64x2
**Kind**: static class of <code>[SIMD](#SIMD)</code>  

* [.float64x2](#SIMD.float64x2)
  * [new SIMD.float64x2(value, value)](#new_SIMD.float64x2_new)
  * [.splat](#SIMD.float64x2.splat)
    * [new SIMD.float64x2.splat(value)](#new_SIMD.float64x2.splat_new)
  * [.extractLane(t, i)](#SIMD.float64x2.extractLane) ⇒ <code>double</code>
  * [.replaceLane(t, i, value)](#SIMD.float64x2.replaceLane) ⇒ <code>float64x2</code>
  * [.check(v)](#SIMD.float64x2.check) ⇒ <code>float64x2</code>
  * [.fromFloat32x4(t)](#SIMD.float64x2.fromFloat32x4) ⇒ <code>float64x2</code>
  * [.fromInt32x4(t)](#SIMD.float64x2.fromInt32x4) ⇒ <code>float64x2</code>
  * [.fromFloat32x4Bits(t)](#SIMD.float64x2.fromFloat32x4Bits) ⇒ <code>float64x2</code>
  * [.fromInt32x4Bits(t)](#SIMD.float64x2.fromInt32x4Bits) ⇒ <code>float64x2</code>
  * [.fromInt16x8Bits(t)](#SIMD.float64x2.fromInt16x8Bits) ⇒ <code>float64x2</code>
  * [.fromInt8x16Bits(t)](#SIMD.float64x2.fromInt8x16Bits) ⇒ <code>float64x2</code>
  * [.abs(t)](#SIMD.float64x2.abs) ⇒ <code>float64x2</code>
  * [.neg(t)](#SIMD.float64x2.neg) ⇒ <code>float64x2</code>
  * [.add(a, b)](#SIMD.float64x2.add) ⇒ <code>float64x2</code>
  * [.sub(a, b)](#SIMD.float64x2.sub) ⇒ <code>float64x2</code>
  * [.mul(a, b)](#SIMD.float64x2.mul) ⇒ <code>float64x2</code>
  * [.div(a, b)](#SIMD.float64x2.div) ⇒ <code>float64x2</code>
  * [.clamp(t, lowerLimit, upperLimit)](#SIMD.float64x2.clamp) ⇒ <code>float64x2</code>
  * [.min(t, other)](#SIMD.float64x2.min) ⇒ <code>float64x2</code>
  * [.max(t, other)](#SIMD.float64x2.max) ⇒ <code>float64x2</code>
  * [.minNum(t, other)](#SIMD.float64x2.minNum) ⇒ <code>float64x2</code>
  * [.maxNum(t, other)](#SIMD.float64x2.maxNum) ⇒ <code>float64x2</code>
  * [.reciprocalApproximation(t)](#SIMD.float64x2.reciprocalApproximation) ⇒ <code>float64x2</code>
  * [.reciprocalSqrtApproximation(t)](#SIMD.float64x2.reciprocalSqrtApproximation) ⇒ <code>float64x2</code>
  * [.sqrt(t)](#SIMD.float64x2.sqrt) ⇒ <code>float64x2</code>
  * [.swizzle(t, x, y)](#SIMD.float64x2.swizzle) ⇒ <code>float64x2</code>
  * [.shuffle(t1, t2, x, y)](#SIMD.float64x2.shuffle) ⇒ <code>float64x2</code>
  * [.lessThan(t, other)](#SIMD.float64x2.lessThan) ⇒ <code>int32x4</code>
  * [.lessThanOrEqual(t, other)](#SIMD.float64x2.lessThanOrEqual) ⇒ <code>int32x4</code>
  * [.equal(t, other)](#SIMD.float64x2.equal) ⇒ <code>int32x4</code>
  * [.notEqual(t, other)](#SIMD.float64x2.notEqual) ⇒ <code>int32x4</code>
  * [.greaterThanOrEqual(t, other)](#SIMD.float64x2.greaterThanOrEqual) ⇒ <code>int32x4</code>
  * [.greaterThan(t, other)](#SIMD.float64x2.greaterThan) ⇒ <code>int32x4</code>
  * [.select(t, trueValue, falseValue)](#SIMD.float64x2.select) ⇒ <code>float64x2</code>
  * [.bitselect(t, trueValue, falseValue)](#SIMD.float64x2.bitselect) ⇒ <code>float64x2</code>
  * [.load(tarray, index)](#SIMD.float64x2.load) ⇒ <code>float64x2</code>
  * [.load1(tarray, index)](#SIMD.float64x2.load1) ⇒ <code>float64x2</code>
  * [.store(tarray, index, value)](#SIMD.float64x2.store) ⇒ <code>void</code>
  * [.store1(tarray, index, value)](#SIMD.float64x2.store1) ⇒ <code>void</code>

<a name="new_SIMD.float64x2_new"></a>
#### new SIMD.float64x2(value, value)
Construct a new instance of float64x2 number.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>double</code> | used for x lane. |
| value | <code>double</code> | used for y lane. |

<a name="SIMD.float64x2.splat"></a>
#### float64x2.splat
**Kind**: static class of <code>[float64x2](#SIMD.float64x2)</code>  
<a name="new_SIMD.float64x2.splat_new"></a>
##### new SIMD.float64x2.splat(value)
Construct a new instance of float64x2 number with the same valuein all lanes.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>double</code> | used for all lanes. |

<a name="SIMD.float64x2.extractLane"></a>
#### float64x2.extractLane(t, i) ⇒ <code>double</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>double</code> - The value in lane i of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| i | <code>integer</code> | Index in concatenation of t for lane i |

<a name="SIMD.float64x2.replaceLane"></a>
#### float64x2.replaceLane(t, i, value) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with the values in t andlane i replaced with {v}.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| i | <code>integer</code> | Index in concatenation of t for lane i |
| value | <code>double</code> | used for lane i. |

<a name="SIMD.float64x2.check"></a>
#### float64x2.check(v) ⇒ <code>float64x2</code>
Check whether the argument is a float64x2.

**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - The float64x2 instance.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.fromFloat32x4"></a>
#### float64x2.fromFloat32x4(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - A float64x2 with .x and .y from t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float64x2.fromInt32x4"></a>
#### float64x2.fromInt32x4(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - A float64x2 with .x and .y from t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.float64x2.fromFloat32x4Bits"></a>
#### float64x2.fromFloat32x4Bits(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - a bit-wise copy of t as a float64x2.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.float64x2.fromInt32x4Bits"></a>
#### float64x2.fromInt32x4Bits(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - a bit-wise copy of t as a float64x2.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.float64x2.fromInt16x8Bits"></a>
#### float64x2.fromInt16x8Bits(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - a bit-wise copy of t as a float64x2.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.float64x2.fromInt8x16Bits"></a>
#### float64x2.fromInt8x16Bits(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - a bit-wise copy of t as a float64x2.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.float64x2.abs"></a>
#### float64x2.abs(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with absolute values oft.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.neg"></a>
#### float64x2.neg(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with negated values oft.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.add"></a>
#### float64x2.add(a, b) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with a + b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float64x2</code> | An instance of float64x2. |
| b | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.sub"></a>
#### float64x2.sub(a, b) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with a - b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float64x2</code> | An instance of float64x2. |
| b | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.mul"></a>
#### float64x2.mul(a, b) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with a * b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float64x2</code> | An instance of float64x2. |
| b | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.div"></a>
#### float64x2.div(a, b) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with a / b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>float64x2</code> | An instance of float64x2. |
| b | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.clamp"></a>
#### float64x2.clamp(t, lowerLimit, upperLimit) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with t's values clampedbetween lowerLimit and upperLimit.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| lowerLimit | <code>float64x2</code> | An instance of float64x2. |
| upperLimit | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.min"></a>
#### float64x2.min(t, other) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with the minimum value oft and other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.max"></a>
#### float64x2.max(t, other) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with the maximum value oft and other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.minNum"></a>
#### float64x2.minNum(t, other) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with the minimum value oft and other, preferring numbers over NaNs.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.maxNum"></a>
#### float64x2.maxNum(t, other) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with the maximum value oft and other, preferring numbers over NaNs.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.reciprocalApproximation"></a>
#### float64x2.reciprocalApproximation(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with an approximation of thereciprocal value of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.reciprocalSqrtApproximation"></a>
#### float64x2.reciprocalSqrtApproximation(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with an approximation of thereciprocal value of the square root of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.sqrt"></a>
#### float64x2.sqrt(t) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with square root ofvalues of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.swizzle"></a>
#### float64x2.swizzle(t, x, y) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with lanes swizzled.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2 to be swizzled. |
| x | <code>integer</code> | Index in t for lane x |
| y | <code>integer</code> | Index in t for lane y |

<a name="SIMD.float64x2.shuffle"></a>
#### float64x2.shuffle(t1, t2, x, y) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2 with lanes shuffled.  

| Param | Type | Description |
| --- | --- | --- |
| t1 | <code>float64x2</code> | An instance of float64x2 to be shuffled. |
| t2 | <code>float64x2</code> | An instance of float64x2 to be shuffled. |
| x | <code>integer</code> | Index in concatenation of t1 and t2 for lane x |
| y | <code>integer</code> | Index in concatenation of t1 and t2 for lane y |

<a name="SIMD.float64x2.lessThan"></a>
#### float64x2.lessThan(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t < other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.lessThanOrEqual"></a>
#### float64x2.lessThanOrEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t <= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.equal"></a>
#### float64x2.equal(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t == other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.notEqual"></a>
#### float64x2.notEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t != other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.greaterThanOrEqual"></a>
#### float64x2.greaterThanOrEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t >= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.greaterThan"></a>
#### float64x2.greaterThan(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t > other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |
| other | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.select"></a>
#### float64x2.select(t, trueValue, falseValue) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - Mix of lanes from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | Selector mask. An instance of int32x4 |
| trueValue | <code>float64x2</code> | Pick lane from here if corresponding selector lane is true |
| falseValue | <code>float64x2</code> | Pick lane from here if corresponding selector lane is false |

<a name="SIMD.float64x2.bitselect"></a>
#### float64x2.bitselect(t, trueValue, falseValue) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - Mix of bits from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | Selector mask. An instance of int32x4 |
| trueValue | <code>float64x2</code> | Pick bit from here if corresponding selector bit is 1 |
| falseValue | <code>float64x2</code> | Pick bit from here if corresponding selector bit is 0 |

<a name="SIMD.float64x2.load"></a>
#### float64x2.load(tarray, index) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.float64x2.load1"></a>
#### float64x2.load1(tarray, index) ⇒ <code>float64x2</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  
**Returns**: <code>float64x2</code> - New instance of float64x2.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.float64x2.store"></a>
#### float64x2.store(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.float64x2.store1"></a>
#### float64x2.store1(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[float64x2](#SIMD.float64x2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.int32x4"></a>
### SIMD.int32x4
**Kind**: static class of <code>[SIMD](#SIMD)</code>  

* [.int32x4](#SIMD.int32x4)
  * [new SIMD.int32x4(32-bit, 32-bit, 32-bit, 32-bit)](#new_SIMD.int32x4_new)
  * [.bool](#SIMD.int32x4.bool)
    * [new SIMD.int32x4.bool(flag, flag, flag, flag)](#new_SIMD.int32x4.bool_new)
  * [.splat](#SIMD.int32x4.splat)
    * [new SIMD.int32x4.splat(value)](#new_SIMD.int32x4.splat_new)
  * [.extractLane(t, i)](#SIMD.int32x4.extractLane) ⇒ <code>integer</code>
  * [.replaceLane(t, i, value)](#SIMD.int32x4.replaceLane) ⇒ <code>int32x4</code>
  * [.allTrue(v)](#SIMD.int32x4.allTrue) ⇒ <code>Boolean</code>
  * [.anyTrue(v)](#SIMD.int32x4.anyTrue) ⇒ <code>Boolean</code>
  * [.check(v)](#SIMD.int32x4.check) ⇒ <code>int32x4</code>
  * [.fromFloat32x4(t)](#SIMD.int32x4.fromFloat32x4) ⇒ <code>int32x4</code>
  * [.fromFloat64x2(t)](#SIMD.int32x4.fromFloat64x2) ⇒ <code>int32x4</code>
  * [.fromFloat32x4Bits(t)](#SIMD.int32x4.fromFloat32x4Bits) ⇒ <code>int32x4</code>
  * [.fromFloat64x2Bits(t)](#SIMD.int32x4.fromFloat64x2Bits) ⇒ <code>int32x4</code>
  * [.fromInt16x8Bits(t)](#SIMD.int32x4.fromInt16x8Bits) ⇒ <code>int32x4</code>
  * [.fromInt8x16Bits(t)](#SIMD.int32x4.fromInt8x16Bits) ⇒ <code>int32x4</code>
  * [.and(a, b)](#SIMD.int32x4.and) ⇒ <code>int32x4</code>
  * [.or(a, b)](#SIMD.int32x4.or) ⇒ <code>int32x4</code>
  * [.xor(a, b)](#SIMD.int32x4.xor) ⇒ <code>int32x4</code>
  * [.not(t)](#SIMD.int32x4.not) ⇒ <code>int32x4</code>
  * [.neg(t)](#SIMD.int32x4.neg) ⇒ <code>int32x4</code>
  * [.add(a, b)](#SIMD.int32x4.add) ⇒ <code>int32x4</code>
  * [.sub(a, b)](#SIMD.int32x4.sub) ⇒ <code>int32x4</code>
  * [.mul(a, b)](#SIMD.int32x4.mul) ⇒ <code>int32x4</code>
  * [.swizzle(t, x, y, z, w)](#SIMD.int32x4.swizzle) ⇒ <code>int32x4</code>
  * [.shuffle(t1, t2, x, y, z, w)](#SIMD.int32x4.shuffle) ⇒ <code>int32x4</code>
  * [.select(t, trueValue, falseValue)](#SIMD.int32x4.select) ⇒ <code>int32x4</code>
  * [.bitselect(t, trueValue, falseValue)](#SIMD.int32x4.bitselect) ⇒ <code>int32x4</code>
  * [.equal(t, other)](#SIMD.int32x4.equal) ⇒ <code>int32x4</code>
  * [.notEqual(t, other)](#SIMD.int32x4.notEqual) ⇒ <code>int32x4</code>
  * [.greaterThan(t, other)](#SIMD.int32x4.greaterThan) ⇒ <code>int32x4</code>
  * [.greaterThanOrEqual(t, other)](#SIMD.int32x4.greaterThanOrEqual) ⇒ <code>int32x4</code>
  * [.lessThan(t, other)](#SIMD.int32x4.lessThan) ⇒ <code>int32x4</code>
  * [.lessThanOrEqual(t, other)](#SIMD.int32x4.lessThanOrEqual) ⇒ <code>int32x4</code>
  * [.shiftLeftByScalar(a, bits)](#SIMD.int32x4.shiftLeftByScalar) ⇒ <code>int32x4</code>
  * [.shiftRightLogicalByScalar(a, bits)](#SIMD.int32x4.shiftRightLogicalByScalar) ⇒ <code>int32x4</code>
  * [.shiftRightArithmeticByScalar(a, bits)](#SIMD.int32x4.shiftRightArithmeticByScalar) ⇒ <code>int32x4</code>
  * [.load(tarray, index)](#SIMD.int32x4.load) ⇒ <code>int32x4</code>
  * [.load1(tarray, index)](#SIMD.int32x4.load1) ⇒ <code>int32x4</code>
  * [.load2(tarray, index)](#SIMD.int32x4.load2) ⇒ <code>int32x4</code>
  * [.load3(tarray, index)](#SIMD.int32x4.load3) ⇒ <code>int32x4</code>
  * [.store(tarray, index, value)](#SIMD.int32x4.store) ⇒ <code>void</code>
  * [.store1(tarray, index, value)](#SIMD.int32x4.store1) ⇒ <code>void</code>
  * [.store2(tarray, index, value)](#SIMD.int32x4.store2) ⇒ <code>void</code>
  * [.store3(tarray, index, value)](#SIMD.int32x4.store3) ⇒ <code>void</code>

<a name="new_SIMD.int32x4_new"></a>
#### new SIMD.int32x4(32-bit, 32-bit, 32-bit, 32-bit)
Construct a new instance of int32x4 number.


| Param | Type | Description |
| --- | --- | --- |
| 32-bit | <code>integer</code> | value used for x lane. |
| 32-bit | <code>integer</code> | value used for y lane. |
| 32-bit | <code>integer</code> | value used for z lane. |
| 32-bit | <code>integer</code> | value used for w lane. |

<a name="SIMD.int32x4.bool"></a>
#### int32x4.bool
**Kind**: static class of <code>[int32x4](#SIMD.int32x4)</code>  
<a name="new_SIMD.int32x4.bool_new"></a>
##### new SIMD.int32x4.bool(flag, flag, flag, flag)
Construct a new instance of int32x4 number with either true or false ineach lane, depending on the truth values in x, y, z, and w.


| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | used for x lane. |
| flag | <code>boolean</code> | used for y lane. |
| flag | <code>boolean</code> | used for z lane. |
| flag | <code>boolean</code> | used for w lane. |

<a name="SIMD.int32x4.splat"></a>
#### int32x4.splat
**Kind**: static class of <code>[int32x4](#SIMD.int32x4)</code>  
<a name="new_SIMD.int32x4.splat_new"></a>
##### new SIMD.int32x4.splat(value)
Construct a new instance of int32x4 number with the same valuein all lanes.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>integer</code> | used for all lanes. |

<a name="SIMD.int32x4.extractLane"></a>
#### int32x4.extractLane(t, i) ⇒ <code>integer</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>integer</code> - The value in lane i of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |
| i | <code>integer</code> | Index in concatenation of t for lane i |

<a name="SIMD.int32x4.replaceLane"></a>
#### int32x4.replaceLane(t, i, value) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with the values in t andlane i replaced with {v}.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |
| i | <code>integer</code> | Index in concatenation of t for lane i |
| value | <code>integer</code> | used for lane i. |

<a name="SIMD.int32x4.allTrue"></a>
#### int32x4.allTrue(v) ⇒ <code>Boolean</code>
Check if all 4 lanes hold a true value (bit 31 == 1)

**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>Boolean</code> - All 4 lanes holds a true value  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.anyTrue"></a>
#### int32x4.anyTrue(v) ⇒ <code>Boolean</code>
Check if any of the 4 lanes hold a true value (bit 31 == 1)

**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>Boolean</code> - Any of the 4 lanes holds a true value  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.check"></a>
#### int32x4.check(v) ⇒ <code>int32x4</code>
Check whether the argument is a int32x4.

**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - The int32x4 instance.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.fromFloat32x4"></a>
#### int32x4.fromFloat32x4(t) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - with a integer to float conversion of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.int32x4.fromFloat64x2"></a>
#### int32x4.fromFloat64x2(t) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - An int32x4 with .x and .y from t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.int32x4.fromFloat32x4Bits"></a>
#### int32x4.fromFloat32x4Bits(t) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - a bit-wise copy of t as a int32x4.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.int32x4.fromFloat64x2Bits"></a>
#### int32x4.fromFloat64x2Bits(t) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - a bit-wise copy of t as an int32x4.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.int32x4.fromInt16x8Bits"></a>
#### int32x4.fromInt16x8Bits(t) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - a bit-wise copy of t as a int32x4.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int32x4.fromInt8x16Bits"></a>
#### int32x4.fromInt8x16Bits(t) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - a bit-wise copy of t as a int32x4.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int32x4.and"></a>
#### int32x4.and(a, b) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with values of a & b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| b | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.or"></a>
#### int32x4.or(a, b) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with values of a | b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| b | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.xor"></a>
#### int32x4.xor(a, b) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with values of a ^ b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| b | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.not"></a>
#### int32x4.not(t) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with values of ~t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.neg"></a>
#### int32x4.neg(t) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with values of -t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.add"></a>
#### int32x4.add(a, b) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with values of a + b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| b | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.sub"></a>
#### int32x4.sub(a, b) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with values of a - b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| b | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.mul"></a>
#### int32x4.mul(a, b) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with values of a * b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| b | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.swizzle"></a>
#### int32x4.swizzle(t, x, y, z, w) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with lanes swizzled.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4 to be swizzled. |
| x | <code>integer</code> | Index in t for lane x |
| y | <code>integer</code> | Index in t for lane y |
| z | <code>integer</code> | Index in t for lane z |
| w | <code>integer</code> | Index in t for lane w |

<a name="SIMD.int32x4.shuffle"></a>
#### int32x4.shuffle(t1, t2, x, y, z, w) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4 with lanes shuffled.  

| Param | Type | Description |
| --- | --- | --- |
| t1 | <code>int32x4</code> | An instance of int32x4 to be shuffled. |
| t2 | <code>int32x4</code> | An instance of int32x4 to be shuffled. |
| x | <code>integer</code> | Index in concatenation of t1 and t2 for lane x |
| y | <code>integer</code> | Index in concatenation of t1 and t2 for lane y |
| z | <code>integer</code> | Index in concatenation of t1 and t2 for lane z |
| w | <code>integer</code> | Index in concatenation of t1 and t2 for lane w |

<a name="SIMD.int32x4.select"></a>
#### int32x4.select(t, trueValue, falseValue) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - Mix of lanes from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | Selector mask. An instance of int32x4 |
| trueValue | <code>int32x4</code> | Pick lane from here if corresponding selector lane is true |
| falseValue | <code>int32x4</code> | Pick lane from here if corresponding selector lane is false |

<a name="SIMD.int32x4.bitselect"></a>
#### int32x4.bitselect(t, trueValue, falseValue) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - Mix of bits from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | Selector mask. An instance of int32x4 |
| trueValue | <code>int32x4</code> | Pick bit from here if corresponding selector bit is 1 |
| falseValue | <code>int32x4</code> | Pick bit from here if corresponding selector bit is 0 |

<a name="SIMD.int32x4.equal"></a>
#### int32x4.equal(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t == other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |
| other | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.notEqual"></a>
#### int32x4.notEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t != other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |
| other | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.greaterThan"></a>
#### int32x4.greaterThan(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t > other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |
| other | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.greaterThanOrEqual"></a>
#### int32x4.greaterThanOrEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t >= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |
| other | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.lessThan"></a>
#### int32x4.lessThan(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t < other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |
| other | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.lessThanOrEqual"></a>
#### int32x4.lessThanOrEqual(t, other) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - true or false in each lane depending onthe result of t <= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |
| other | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.shiftLeftByScalar"></a>
#### int32x4.shiftLeftByScalar(a, bits) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int32x4.shiftRightLogicalByScalar"></a>
#### int32x4.shiftRightLogicalByScalar(a, bits) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int32x4.shiftRightArithmeticByScalar"></a>
#### int32x4.shiftRightArithmeticByScalar(a, bits) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int32x4</code> | An instance of int32x4. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int32x4.load"></a>
#### int32x4.load(tarray, index) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.int32x4.load1"></a>
#### int32x4.load1(tarray, index) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.int32x4.load2"></a>
#### int32x4.load2(tarray, index) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.int32x4.load3"></a>
#### int32x4.load3(tarray, index) ⇒ <code>int32x4</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  
**Returns**: <code>int32x4</code> - New instance of int32x4.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.int32x4.store"></a>
#### int32x4.store(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.store1"></a>
#### int32x4.store1(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.store2"></a>
#### int32x4.store2(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int32x4.store3"></a>
#### int32x4.store3(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[int32x4](#SIMD.int32x4)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int16x8"></a>
### SIMD.int16x8
**Kind**: static class of <code>[SIMD](#SIMD)</code>  

* [.int16x8](#SIMD.int16x8)
  * [new SIMD.int16x8(16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit)](#new_SIMD.int16x8_new)
  * [.bool](#SIMD.int16x8.bool)
    * [new SIMD.int16x8.bool(flag, flag, flag, flag, flag, flag, flag, flag)](#new_SIMD.int16x8.bool_new)
  * [.splat](#SIMD.int16x8.splat)
    * [new SIMD.int16x8.splat(value)](#new_SIMD.int16x8.splat_new)
  * [.extractLane(t, i)](#SIMD.int16x8.extractLane) ⇒ <code>integer</code>
  * [.replaceLane(t, i, value)](#SIMD.int16x8.replaceLane) ⇒ <code>int16x8</code>
  * [.allTrue(v)](#SIMD.int16x8.allTrue) ⇒ <code>Boolean</code>
  * [.anyTrue(v)](#SIMD.int16x8.anyTrue) ⇒ <code>Boolean</code>
  * [.check(v)](#SIMD.int16x8.check) ⇒ <code>int16x8</code>
  * [.fromFloat32x4Bits(t)](#SIMD.int16x8.fromFloat32x4Bits) ⇒ <code>int16x8</code>
  * [.fromFloat64x2Bits(t)](#SIMD.int16x8.fromFloat64x2Bits) ⇒ <code>int16x8</code>
  * [.fromInt32x4Bits(t)](#SIMD.int16x8.fromInt32x4Bits) ⇒ <code>int16x8</code>
  * [.fromInt8x16Bits(t)](#SIMD.int16x8.fromInt8x16Bits) ⇒ <code>int16x8</code>
  * [.and(a, b)](#SIMD.int16x8.and) ⇒ <code>int16x8</code>
  * [.or(a, b)](#SIMD.int16x8.or) ⇒ <code>int16x8</code>
  * [.xor(a, b)](#SIMD.int16x8.xor) ⇒ <code>int16x8</code>
  * [.not(t)](#SIMD.int16x8.not) ⇒ <code>int16x8</code>
  * [.neg(t)](#SIMD.int16x8.neg) ⇒ <code>int16x8</code>
  * [.add(a, b)](#SIMD.int16x8.add) ⇒ <code>int16x8</code>
  * [.sub(a, b)](#SIMD.int16x8.sub) ⇒ <code>int16x8</code>
  * [.mul(a, b)](#SIMD.int16x8.mul) ⇒ <code>int16x8</code>
  * [.swizzle(t, s0, s1, s2, s3, s4, s5, s6, s7)](#SIMD.int16x8.swizzle) ⇒ <code>int16x8</code>
  * [.shuffle(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7)](#SIMD.int16x8.shuffle) ⇒ <code>int16x8</code>
  * [.addSaturate(a, b)](#SIMD.int16x8.addSaturate) ⇒ <code>int16x8</code>
  * [.subSaturating(a, b)](#SIMD.int16x8.subSaturating) ⇒ <code>int16x8</code>
  * [.select(t, trueValue, falseValue)](#SIMD.int16x8.select) ⇒ <code>int16x8</code>
  * [.bitselect(t, trueValue, falseValue)](#SIMD.int16x8.bitselect) ⇒ <code>int16x8</code>
  * [.equal(t, other)](#SIMD.int16x8.equal) ⇒ <code>int16x8</code>
  * [.notEqual(t, other)](#SIMD.int16x8.notEqual) ⇒ <code>int16x8</code>
  * [.greaterThan(t, other)](#SIMD.int16x8.greaterThan) ⇒ <code>int16x8</code>
  * [.greaterThanOrEqual(t, other)](#SIMD.int16x8.greaterThanOrEqual) ⇒ <code>int16x8</code>
  * [.lessThan(t, other)](#SIMD.int16x8.lessThan) ⇒ <code>int16x8</code>
  * [.lessThanOrEqual(t, other)](#SIMD.int16x8.lessThanOrEqual) ⇒ <code>int16x8</code>
  * [.shiftLeftByScalar(a, bits)](#SIMD.int16x8.shiftLeftByScalar) ⇒ <code>int16x8</code>
  * [.shiftRightLogicalByScalar(a, bits)](#SIMD.int16x8.shiftRightLogicalByScalar) ⇒ <code>int16x8</code>
  * [.shiftRightArithmeticByScalar(a, bits)](#SIMD.int16x8.shiftRightArithmeticByScalar) ⇒ <code>int16x8</code>
  * [.load(tarray, index)](#SIMD.int16x8.load) ⇒ <code>int16x8</code>
  * [.store(tarray, index, value)](#SIMD.int16x8.store) ⇒ <code>void</code>

<a name="new_SIMD.int16x8_new"></a>
#### new SIMD.int16x8(16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit, 16-bit)
Construct a new instance of int16x8 number.


| Param | Type | Description |
| --- | --- | --- |
| 16-bit | <code>integer</code> | value used for s0 lane. |
| 16-bit | <code>integer</code> | value used for s1 lane. |
| 16-bit | <code>integer</code> | value used for s2 lane. |
| 16-bit | <code>integer</code> | value used for s3 lane. |
| 16-bit | <code>integer</code> | value used for s4 lane. |
| 16-bit | <code>integer</code> | value used for s5 lane. |
| 16-bit | <code>integer</code> | value used for s6 lane. |
| 16-bit | <code>integer</code> | value used for s7 lane. |

<a name="SIMD.int16x8.bool"></a>
#### int16x8.bool
**Kind**: static class of <code>[int16x8](#SIMD.int16x8)</code>  
<a name="new_SIMD.int16x8.bool_new"></a>
##### new SIMD.int16x8.bool(flag, flag, flag, flag, flag, flag, flag, flag)
Construct a new instance of int16x8 number with true or false in eachlane, depending on the truth value in s0, s1, s2, s3, s4, s5, s6, and s7.


| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | used for s0 lane. |
| flag | <code>boolean</code> | used for s1 lane. |
| flag | <code>boolean</code> | used for s2 lane. |
| flag | <code>boolean</code> | used for s3 lane. |
| flag | <code>boolean</code> | used for s4 lane. |
| flag | <code>boolean</code> | used for s5 lane. |
| flag | <code>boolean</code> | used for s6 lane. |
| flag | <code>boolean</code> | used for s7 lane. |

<a name="SIMD.int16x8.splat"></a>
#### int16x8.splat
**Kind**: static class of <code>[int16x8](#SIMD.int16x8)</code>  
<a name="new_SIMD.int16x8.splat_new"></a>
##### new SIMD.int16x8.splat(value)
Construct a new instance of int16x8 number with the same valuein all lanes.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>integer</code> | used for all lanes. |

<a name="SIMD.int16x8.extractLane"></a>
#### int16x8.extractLane(t, i) ⇒ <code>integer</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>integer</code> - The value in lane i of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |
| i | <code>integer</code> | Index in concatenation of t for lane i |

<a name="SIMD.int16x8.replaceLane"></a>
#### int16x8.replaceLane(t, i, value) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with the values in t andlane i replaced with {v}.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |
| i | <code>integer</code> | Index in concatenation of t for lane i |
| value | <code>integer</code> | used for lane i. |

<a name="SIMD.int16x8.allTrue"></a>
#### int16x8.allTrue(v) ⇒ <code>Boolean</code>
Check if all 8 lanes hold a true value (bit 15 == 1)

**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>Boolean</code> - All 8 lanes holds a true value  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.anyTrue"></a>
#### int16x8.anyTrue(v) ⇒ <code>Boolean</code>
Check if any of the 8 lanes hold a true value (bit 15 == 1)

**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>Boolean</code> - Any of the 8 lanes holds a true value  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.check"></a>
#### int16x8.check(v) ⇒ <code>int16x8</code>
Check whether the argument is a int16x8.

**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - The int16x8 instance.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.fromFloat32x4Bits"></a>
#### int16x8.fromFloat32x4Bits(t) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - a bit-wise copy of t as a int16x8.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.int16x8.fromFloat64x2Bits"></a>
#### int16x8.fromFloat64x2Bits(t) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - a bit-wise copy of t as an int16x8.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.int16x8.fromInt32x4Bits"></a>
#### int16x8.fromInt32x4Bits(t) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - a bit-wise copy of t as a int16x8.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int16x8.fromInt8x16Bits"></a>
#### int16x8.fromInt8x16Bits(t) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - a bit-wise copy of t as a int16x8.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int16x8.and"></a>
#### int16x8.and(a, b) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of a & b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| b | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.or"></a>
#### int16x8.or(a, b) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of a | b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| b | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.xor"></a>
#### int16x8.xor(a, b) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of a ^ b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| b | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.not"></a>
#### int16x8.not(t) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of ~t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.neg"></a>
#### int16x8.neg(t) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of -t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.add"></a>
#### int16x8.add(a, b) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of a + b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| b | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.sub"></a>
#### int16x8.sub(a, b) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of a - b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| b | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.mul"></a>
#### int16x8.mul(a, b) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of a * b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| b | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.swizzle"></a>
#### int16x8.swizzle(t, s0, s1, s2, s3, s4, s5, s6, s7) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with lanes swizzled.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8 to be swizzled. |
| s0 | <code>integer</code> | Index in t for lane s0 |
| s1 | <code>integer</code> | Index in t for lane s1 |
| s2 | <code>integer</code> | Index in t for lane s2 |
| s3 | <code>integer</code> | Index in t for lane s3 |
| s4 | <code>integer</code> | Index in t for lane s4 |
| s5 | <code>integer</code> | Index in t for lane s5 |
| s6 | <code>integer</code> | Index in t for lane s6 |
| s7 | <code>integer</code> | Index in t for lane s7 |

<a name="SIMD.int16x8.shuffle"></a>
#### int16x8.shuffle(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with lanes shuffled.  

| Param | Type | Description |
| --- | --- | --- |
| t0 | <code>int16x8</code> | An instance of int16x8 to be shuffled. |
| t1 | <code>int16x8</code> | An instance of int16x8 to be shuffled. |
| s0 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s0 |
| s1 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s1 |
| s2 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s2 |
| s3 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s3 |
| s4 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s4 |
| s5 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s5 |
| s6 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s6 |
| s7 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s7 |

<a name="SIMD.int16x8.addSaturate"></a>
#### int16x8.addSaturate(a, b) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of a + b withsigned saturating behavior on overflow.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| b | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.subSaturating"></a>
#### int16x8.subSaturating(a, b) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8 with values of a - b withsigned saturating behavior on overflow.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| b | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.select"></a>
#### int16x8.select(t, trueValue, falseValue) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - Mix of lanes from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | Selector mask. An instance of int16x8 |
| trueValue | <code>int16x8</code> | Pick lane from here if corresponding selector lane is true |
| falseValue | <code>int16x8</code> | Pick lane from here if corresponding selector lane is false |

<a name="SIMD.int16x8.bitselect"></a>
#### int16x8.bitselect(t, trueValue, falseValue) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - Mix of lanes from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | Selector mask. An instance of int16x8 |
| trueValue | <code>int16x8</code> | Pick lane from here if corresponding selector bit is 1 |
| falseValue | <code>int16x8</code> | Pick lane from here if corresponding selector bit is 0 |

<a name="SIMD.int16x8.equal"></a>
#### int16x8.equal(t, other) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - true or false in each lane depending onthe result of t == other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |
| other | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.notEqual"></a>
#### int16x8.notEqual(t, other) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - true or false in each lane depending onthe result of t != other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |
| other | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.greaterThan"></a>
#### int16x8.greaterThan(t, other) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - true or false in each lane depending onthe result of t > other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |
| other | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.greaterThanOrEqual"></a>
#### int16x8.greaterThanOrEqual(t, other) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - true or false in each lane depending onthe result of t >= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |
| other | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.lessThan"></a>
#### int16x8.lessThan(t, other) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - true or false in each lane depending onthe result of t < other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |
| other | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.lessThanOrEqual"></a>
#### int16x8.lessThanOrEqual(t, other) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - true or false in each lane depending onthe result of t <= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |
| other | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int16x8.shiftLeftByScalar"></a>
#### int16x8.shiftLeftByScalar(a, bits) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int16x8.shiftRightLogicalByScalar"></a>
#### int16x8.shiftRightLogicalByScalar(a, bits) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int16x8.shiftRightArithmeticByScalar"></a>
#### int16x8.shiftRightArithmeticByScalar(a, bits) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int16x8</code> | An instance of int16x8. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int16x8.load"></a>
#### int16x8.load(tarray, index) ⇒ <code>int16x8</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  
**Returns**: <code>int16x8</code> - New instance of int16x8.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.int16x8.store"></a>
#### int16x8.store(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[int16x8](#SIMD.int16x8)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int8x16"></a>
### SIMD.int8x16
**Kind**: static class of <code>[SIMD](#SIMD)</code>  

* [.int8x16](#SIMD.int8x16)
  * [new SIMD.int8x16(8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit)](#new_SIMD.int8x16_new)
  * [.bool](#SIMD.int8x16.bool)
    * [new SIMD.int8x16.bool(flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag)](#new_SIMD.int8x16.bool_new)
  * [.splat](#SIMD.int8x16.splat)
    * [new SIMD.int8x16.splat(value)](#new_SIMD.int8x16.splat_new)
  * [.extractLane(t, i)](#SIMD.int8x16.extractLane) ⇒ <code>integer</code>
  * [.replaceLane(t, i, value)](#SIMD.int8x16.replaceLane) ⇒ <code>int8x16</code>
  * [.allTrue(v)](#SIMD.int8x16.allTrue) ⇒ <code>Boolean</code>
  * [.anyTrue(v)](#SIMD.int8x16.anyTrue) ⇒ <code>Boolean</code>
  * [.check(v)](#SIMD.int8x16.check) ⇒ <code>int8x16</code>
  * [.fromFloat32x4Bits(t)](#SIMD.int8x16.fromFloat32x4Bits) ⇒ <code>int8x16</code>
  * [.fromFloat64x2Bits(t)](#SIMD.int8x16.fromFloat64x2Bits) ⇒ <code>int8x16</code>
  * [.fromInt32x4Bits(t)](#SIMD.int8x16.fromInt32x4Bits) ⇒ <code>int8x16</code>
  * [.fromInt16x8Bits(t)](#SIMD.int8x16.fromInt16x8Bits) ⇒ <code>int8x16</code>
  * [.and(a, b)](#SIMD.int8x16.and) ⇒ <code>int8x16</code>
  * [.or(a, b)](#SIMD.int8x16.or) ⇒ <code>int8x16</code>
  * [.xor(a, b)](#SIMD.int8x16.xor) ⇒ <code>int8x16</code>
  * [.not(t)](#SIMD.int8x16.not) ⇒ <code>int8x16</code>
  * [.neg(t)](#SIMD.int8x16.neg) ⇒ <code>int8x16</code>
  * [.add(a, b)](#SIMD.int8x16.add) ⇒ <code>int8x16</code>
  * [.sub(a, b)](#SIMD.int8x16.sub) ⇒ <code>int8x16</code>
  * [.mul(a, b)](#SIMD.int8x16.mul) ⇒ <code>int8x16</code>
  * [.swizzle(t, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15)](#SIMD.int8x16.swizzle) ⇒ <code>int8x16</code>
  * [.shuffle(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15)](#SIMD.int8x16.shuffle) ⇒ <code>int8x16</code>
  * [.addSaturate(a, b)](#SIMD.int8x16.addSaturate) ⇒ <code>int8x16</code>
  * [.subSaturating(a, b)](#SIMD.int8x16.subSaturating) ⇒ <code>int8x16</code>
  * [.sumOfAbsoluteDifferences(a, b)](#SIMD.int8x16.sumOfAbsoluteDifferences) ⇒ <code>Number</code>
  * [.select(t, trueValue, falseValue)](#SIMD.int8x16.select) ⇒ <code>int8x16</code>
  * [.bitselect(t, trueValue, falseValue)](#SIMD.int8x16.bitselect) ⇒ <code>int8x16</code>
  * [.equal(t, other)](#SIMD.int8x16.equal) ⇒ <code>int8x16</code>
  * [.notEqual(t, other)](#SIMD.int8x16.notEqual) ⇒ <code>int8x16</code>
  * [.greaterThan(t, other)](#SIMD.int8x16.greaterThan) ⇒ <code>int8x16</code>
  * [.greaterThanOrEqual(t, other)](#SIMD.int8x16.greaterThanOrEqual) ⇒ <code>int8x16</code>
  * [.lessThan(t, other)](#SIMD.int8x16.lessThan) ⇒ <code>int8x16</code>
  * [.lessThanOrEqual(t, other)](#SIMD.int8x16.lessThanOrEqual) ⇒ <code>int8x16</code>
  * [.shiftLeftByScalar(a, bits)](#SIMD.int8x16.shiftLeftByScalar) ⇒ <code>int8x16</code>
  * [.shiftRightLogicalByScalar(a, bits)](#SIMD.int8x16.shiftRightLogicalByScalar) ⇒ <code>int8x16</code>
  * [.shiftRightArithmeticByScalar(a, bits)](#SIMD.int8x16.shiftRightArithmeticByScalar) ⇒ <code>int8x16</code>
  * [.load(tarray, index)](#SIMD.int8x16.load) ⇒ <code>int8x16</code>
  * [.store(tarray, index, value)](#SIMD.int8x16.store) ⇒ <code>void</code>

<a name="new_SIMD.int8x16_new"></a>
#### new SIMD.int8x16(8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit, 8-bit)
Construct a new instance of int8x16 number.


| Param | Type | Description |
| --- | --- | --- |
| 8-bit | <code>integer</code> | value used for s0 lane. |
| 8-bit | <code>integer</code> | value used for s1 lane. |
| 8-bit | <code>integer</code> | value used for s2 lane. |
| 8-bit | <code>integer</code> | value used for s3 lane. |
| 8-bit | <code>integer</code> | value used for s4 lane. |
| 8-bit | <code>integer</code> | value used for s5 lane. |
| 8-bit | <code>integer</code> | value used for s6 lane. |
| 8-bit | <code>integer</code> | value used for s7 lane. |
| 8-bit | <code>integer</code> | value used for s8 lane. |
| 8-bit | <code>integer</code> | value used for s9 lane. |
| 8-bit | <code>integer</code> | value used for s10 lane. |
| 8-bit | <code>integer</code> | value used for s11 lane. |
| 8-bit | <code>integer</code> | value used for s12 lane. |
| 8-bit | <code>integer</code> | value used for s13 lane. |
| 8-bit | <code>integer</code> | value used for s14 lane. |
| 8-bit | <code>integer</code> | value used for s15 lane. |

<a name="SIMD.int8x16.bool"></a>
#### int8x16.bool
**Kind**: static class of <code>[int8x16](#SIMD.int8x16)</code>  
<a name="new_SIMD.int8x16.bool_new"></a>
##### new SIMD.int8x16.bool(flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag, flag)
Construct a new instance of int8x16 number with true or false in eachlane, depending on the truth value in s0, s1, s2, s3, s4, s5, s6, s7,s8, s9, s10, s11, s12, s13, s14, and s15.


| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | used for s0 lane. |
| flag | <code>boolean</code> | used for s1 lane. |
| flag | <code>boolean</code> | used for s2 lane. |
| flag | <code>boolean</code> | used for s3 lane. |
| flag | <code>boolean</code> | used for s4 lane. |
| flag | <code>boolean</code> | used for s5 lane. |
| flag | <code>boolean</code> | used for s6 lane. |
| flag | <code>boolean</code> | used for s7 lane. |
| flag | <code>boolean</code> | used for s8 lane. |
| flag | <code>boolean</code> | used for s9 lane. |
| flag | <code>boolean</code> | used for s10 lane. |
| flag | <code>boolean</code> | used for s11 lane. |
| flag | <code>boolean</code> | used for s12 lane. |
| flag | <code>boolean</code> | used for s13 lane. |
| flag | <code>boolean</code> | used for s14 lane. |
| flag | <code>boolean</code> | used for s15 lane. |

<a name="SIMD.int8x16.splat"></a>
#### int8x16.splat
**Kind**: static class of <code>[int8x16](#SIMD.int8x16)</code>  
<a name="new_SIMD.int8x16.splat_new"></a>
##### new SIMD.int8x16.splat(value)
Construct a new instance of int8x16 number with the same valuein all lanes.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>integer</code> | used for all lanes. |

<a name="SIMD.int8x16.extractLane"></a>
#### int8x16.extractLane(t, i) ⇒ <code>integer</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>integer</code> - The value in lane i of t.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |
| i | <code>integer</code> | Index in concatenation of t for lane i |

<a name="SIMD.int8x16.replaceLane"></a>
#### int8x16.replaceLane(t, i, value) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with the values in t andlane i replaced with {v}.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |
| i | <code>integer</code> | Index in concatenation of t for lane i |
| value | <code>integer</code> | used for lane i. |

<a name="SIMD.int8x16.allTrue"></a>
#### int8x16.allTrue(v) ⇒ <code>Boolean</code>
Check if all 16 lanes hold a true value (bit 7 == 1)

**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>Boolean</code> - All 16 lanes holds a true value  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.anyTrue"></a>
#### int8x16.anyTrue(v) ⇒ <code>Boolean</code>
Check if any of the 16 lanes hold a true value (bit 7 == 1)

**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>Boolean</code> - Any of the 16 lanes holds a true value  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int8x16</code> | An instance of int16x8. |

<a name="SIMD.int8x16.check"></a>
#### int8x16.check(v) ⇒ <code>int8x16</code>
Check whether the argument is a int8x16.

**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - The int8x16 instance.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.fromFloat32x4Bits"></a>
#### int8x16.fromFloat32x4Bits(t) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - a bit-wise copy of t as a int8x16.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |

<a name="SIMD.int8x16.fromFloat64x2Bits"></a>
#### int8x16.fromFloat64x2Bits(t) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - a bit-wise copy of t as an int8x16.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float64x2</code> | An instance of float64x2. |

<a name="SIMD.int8x16.fromInt32x4Bits"></a>
#### int8x16.fromInt32x4Bits(t) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - a bit-wise copy of t as a int8x16.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int32x4</code> | An instance of int32x4. |

<a name="SIMD.int8x16.fromInt16x8Bits"></a>
#### int8x16.fromInt16x8Bits(t) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - a bit-wise copy of t as a int8x16.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int16x8</code> | An instance of int16x8. |

<a name="SIMD.int8x16.and"></a>
#### int8x16.and(a, b) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of a & b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.or"></a>
#### int8x16.or(a, b) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of a | b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.xor"></a>
#### int8x16.xor(a, b) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of a ^ b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.not"></a>
#### int8x16.not(t) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of ~t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.neg"></a>
#### int8x16.neg(t) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of -t  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.add"></a>
#### int8x16.add(a, b) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of a + b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.sub"></a>
#### int8x16.sub(a, b) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of a - b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.mul"></a>
#### int8x16.mul(a, b) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of a * b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.swizzle"></a>
#### int8x16.swizzle(t, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with lanes swizzled.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16 to be swizzled. |
| s0 | <code>integer</code> | Index in t for lane s0 |
| s1 | <code>integer</code> | Index in t for lane s1 |
| s2 | <code>integer</code> | Index in t for lane s2 |
| s3 | <code>integer</code> | Index in t for lane s3 |
| s4 | <code>integer</code> | Index in t for lane s4 |
| s5 | <code>integer</code> | Index in t for lane s5 |
| s6 | <code>integer</code> | Index in t for lane s6 |
| s7 | <code>integer</code> | Index in t for lane s7 |
| s8 | <code>integer</code> | Index in t for lane s8 |
| s9 | <code>integer</code> | Index in t for lane s9 |
| s10 | <code>integer</code> | Index in t for lane s10 |
| s11 | <code>integer</code> | Index in t for lane s11 |
| s12 | <code>integer</code> | Index in t for lane s12 |
| s13 | <code>integer</code> | Index in t for lane s13 |
| s14 | <code>integer</code> | Index in t for lane s14 |
| s15 | <code>integer</code> | Index in t for lane s15 |

<a name="SIMD.int8x16.shuffle"></a>
#### int8x16.shuffle(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with lanes shuffled.  

| Param | Type | Description |
| --- | --- | --- |
| t0 | <code>int8x16</code> | An instance of int8x16 to be shuffled. |
| t1 | <code>int8x16</code> | An instance of int8x16 to be shuffled. |
| s0 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s0 |
| s1 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s1 |
| s2 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s2 |
| s3 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s3 |
| s4 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s4 |
| s5 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s5 |
| s6 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s6 |
| s7 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s7 |
| s8 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s8 |
| s9 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s9 |
| s10 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s10 |
| s11 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s11 |
| s12 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s12 |
| s13 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s13 |
| s14 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s14 |
| s15 | <code>integer</code> | Index in concatenation of t0 and t1 for lane s15 |

<a name="SIMD.int8x16.addSaturate"></a>
#### int8x16.addSaturate(a, b) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of a + b withsigned saturating behavior on overflow.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.subSaturating"></a>
#### int8x16.subSaturating(a, b) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16 with values of a - b withsigned saturating behavior on overflow.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.sumOfAbsoluteDifferences"></a>
#### int8x16.sumOfAbsoluteDifferences(a, b) ⇒ <code>Number</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>Number</code> - The sum of the absolute differences (SAD) of thecorresponding elements of a and b.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| b | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.select"></a>
#### int8x16.select(t, trueValue, falseValue) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - Mix of lanes from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | Selector mask. An instance of int8x16 |
| trueValue | <code>int8x16</code> | Pick lane from here if corresponding selector lane is true |
| falseValue | <code>int8x16</code> | Pick lane from here if corresponding selector lane is false |

<a name="SIMD.int8x16.bitselect"></a>
#### int8x16.bitselect(t, trueValue, falseValue) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - Mix of lanes from trueValue or falseValue asindicated  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | Selector mask. An instance of int8x16 |
| trueValue | <code>int8x16</code> | Pick lane from here if corresponding selector bit is 1 |
| falseValue | <code>int8x16</code> | Pick lane from here if corresponding selector bit is 0 |

<a name="SIMD.int8x16.equal"></a>
#### int8x16.equal(t, other) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - true or false in each lane depending onthe result of t == other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |
| other | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.notEqual"></a>
#### int8x16.notEqual(t, other) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - true or false in each lane depending onthe result of t != other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |
| other | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.greaterThan"></a>
#### int8x16.greaterThan(t, other) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - true or false in each lane depending onthe result of t > other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |
| other | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.greaterThanOrEqual"></a>
#### int8x16.greaterThanOrEqual(t, other) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - true or false in each lane depending onthe result of t >= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |
| other | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.lessThan"></a>
#### int8x16.lessThan(t, other) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - true or false in each lane depending onthe result of t < other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |
| other | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.lessThanOrEqual"></a>
#### int8x16.lessThanOrEqual(t, other) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - true or false in each lane depending onthe result of t <= other.  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>int8x16</code> | An instance of int8x16. |
| other | <code>int8x16</code> | An instance of int8x16. |

<a name="SIMD.int8x16.shiftLeftByScalar"></a>
#### int8x16.shiftLeftByScalar(a, bits) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int8x16.shiftRightLogicalByScalar"></a>
#### int8x16.shiftRightLogicalByScalar(a, bits) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int8x16.shiftRightArithmeticByScalar"></a>
#### int8x16.shiftRightArithmeticByScalar(a, bits) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - lanes in a shifted by bits.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>int8x16</code> | An instance of int8x16. |
| bits | <code>integer</code> | Bit count to shift by. |

<a name="SIMD.int8x16.load"></a>
#### int8x16.load(tarray, index) ⇒ <code>int8x16</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  
**Returns**: <code>int8x16</code> - New instance of int8x16.  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |

<a name="SIMD.int8x16.store"></a>
#### int8x16.store(tarray, index, value) ⇒ <code>void</code>
**Kind**: static method of <code>[int8x16](#SIMD.int8x16)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tarray | <code>TypedArray</code> | An instance of a typed array. |
| index | <code>Number</code> | An instance of Number. |
| value | <code>int8x16</code> | An instance of int8x16. |


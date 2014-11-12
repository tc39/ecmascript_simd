/*
  Copyright (C) 2013

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors be held liable for any damages
  arising from the use of this software.

  Permission is granted to anyone to use this software for any purpose,
  including commercial applications, and to alter it and redistribute it
  freely, subject to the following restrictions:

  1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
  2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
  3. This notice may not be removed or altered from any source distribution.
*/

// SIMD module.
var SIMD = {};

// private stuff.
var _PRIVATE = {}

_PRIVATE._f32x4 = new Float32Array(4);
_PRIVATE._f64x2 = new Float64Array(_PRIVATE._f32x4.buffer);
_PRIVATE._i32x4 = new Int32Array(_PRIVATE._f32x4.buffer);
_PRIVATE._i8x16 = new Int8Array(_PRIVATE._f32x4.buffer);

_PRIVATE._f32x8 = new Float32Array(8);
_PRIVATE._f64x4 = new Float64Array(4);
_PRIVATE._i32x8 = new Int32Array(8);

if (typeof Math.fround != 'undefined') {
  _PRIVATE.truncatef32 = Math.fround;
} else {
  _PRIVATE._f32 = new Float32Array(1);

  _PRIVATE.truncatef32 = function(x) {
    _PRIVATE._f32[0] = x;
    return _PRIVATE._f32[0];
  }
}

_PRIVATE.minNum = function(x, y) {
    return x != x ? y :
           y != y ? x :
           Math.min(x, y);
}

_PRIVATE.maxNum = function(x, y) {
    return x != x ? y :
           y != y ? x :
           Math.max(x, y);

_PRIVATE.tobool = function(x) {
  return x < 0;
}

_PRIVATE.frombool = function(x) {
  return !x - 1;
}

function checkFloat32x4(t) {
  if (!(t instanceof SIMD.float32x4)) {
    throw new TypeError("argument is not a float32x4.");
  }
}

function checkFloat64x2(t) {
  if (!(t instanceof SIMD.float64x2)) {
    throw new TypeError("argument is not a float64x2.");
  }
}

function checkInt32x4(t) {
  if (!(t instanceof SIMD.int32x4)) {
    throw new TypeError("argument is not a int32x4.");
  }
}

/**
  * Construct a new instance of float32x4 number.
  * @param {double} value used for x lane.
  * @param {double} value used for y lane.
  * @param {double} value used for z lane.
  * @param {double} value used for w lane.
  * @constructor
  */
SIMD.float32x4 = function(x, y, z, w) {
  if (arguments.length == 1) {
    checkFloat32x4(x);
    return x;
  }

  if (!(this instanceof SIMD.float32x4)) {
    return new SIMD.float32x4(x, y, z, w);
  }

  this.x_ = _PRIVATE.truncatef32(x);
  this.y_ = _PRIVATE.truncatef32(y);
  this.z_ = _PRIVATE.truncatef32(z);
  this.w_ = _PRIVATE.truncatef32(w);
}

/**
  * Construct a new instance of float32x4 number with the same value
  * in all lanes.
  * @param {double} value used for all lanes.
  * @constructor
  */
SIMD.float32x4.splat = function(s) {
  return SIMD.float32x4(s, s, s, s);
}

/**
  * @param {float64x2} t An instance of float64x2.
  * @return {float32x4} A float32x4 with .x and .y from t
  */
SIMD.float32x4.fromFloat64x2 = function(t) {
  checkFloat64x2(t);
  return SIMD.float32x4(t.x_, t.y_, 0, 0);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @return {float32x4} A float to integer conversion copy of t.
  */
SIMD.float32x4.fromInt32x4 = function(t) {
  checkInt32x4(t);
  return SIMD.float32x4(t.x_, t.y_, t.z_, t.w_);
}

/**
 * @param {float64x2} t An instance of float64x2.
 * @return {float32x4} a bit-wise copy of t as a float32x4.
 */
SIMD.float32x4.fromFloat64x2Bits = function(t) {
  checkFloat64x2(t);
  _PRIVATE._f64x2[0] = t.x_;
  _PRIVATE._f64x2[1] = t.y_;
  return SIMD.float32x4(_PRIVATE._f32x4[0],
                        _PRIVATE._f32x4[1],
                        _PRIVATE._f32x4[2],
                        _PRIVATE._f32x4[3]);
}

/**
 * @param {int32x4} t An instance of int32x4.
 * @return {float32x4} a bit-wise copy of t as a float32x4.
 */
SIMD.float32x4.fromInt32x4Bits = function(t) {
  checkInt32x4(t);
  _PRIVATE._i32x4[0] = t.x_;
  _PRIVATE._i32x4[1] = t.y_;
  _PRIVATE._i32x4[2] = t.z_;
  _PRIVATE._i32x4[3] = t.w_;
  return SIMD.float32x4(_PRIVATE._f32x4[0],
                        _PRIVATE._f32x4[1],
                        _PRIVATE._f32x4[2],
                        _PRIVATE._f32x4[3]);
}

/**
  * Construct a new instance of float64x2 number.
  * @param {double} value used for x lane.
  * @param {double} value used for y lane.
  * @constructor
  */
SIMD.float64x2 = function(x, y) {
  if (arguments.length == 1) {
    checkFloat64x2(x);
    return x;
  }

  if (!(this instanceof SIMD.float64x2)) {
    return new SIMD.float64x2(x, y);
  }

  // Use unary + to force coersion to Number.
  this.x_ = +x;
  this.y_ = +y;
}

/**
  * Construct a new instance of float64x2 number with the same value
  * in all lanes.
  * @param {double} value used for all lanes.
  * @constructor
  */
SIMD.float64x2.splat = function(s) {
  return SIMD.float64x2(s, s);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @return {float64x2} A float64x2 with .x and .y from t
  */
SIMD.float64x2.fromFloat32x4 = function(t) {
  checkFloat32x4(t);
  return SIMD.float64x2(t.x_, t.y_);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @return {float64x2} A float64x2 with .x and .y from t
  */
SIMD.float64x2.fromInt32x4 = function(t) {
  checkInt32x4(t);
  return SIMD.float64x2(t.x_, t.y_);
}

/**
 * @param {float32x4} t An instance of float32x4.
 * @return {float64x2} a bit-wise copy of t as a float64x2.
 */
SIMD.float64x2.fromFloat32x4Bits = function(t) {
  checkFloat32x4(t);
  _PRIVATE._f32x4[0] = t.x_;
  _PRIVATE._f32x4[1] = t.y_;
  _PRIVATE._f32x4[2] = t.z_;
  _PRIVATE._f32x4[3] = t.w_;
  return SIMD.float64x2(_PRIVATE._f64x2[0], _PRIVATE._f64x2[1]);
}

/**
 * @param {int32x4} t An instance of int32x4.
 * @return {float64x2} a bit-wise copy of t as a float64x2.
 */
SIMD.float64x2.fromInt32x4Bits = function(t) {
  checkInt32x4(t);
  _PRIVATE._i32x4[0] = t.x_;
  _PRIVATE._i32x4[1] = t.y_;
  _PRIVATE._i32x4[2] = t.z_;
  _PRIVATE._i32x4[3] = t.w_;
  return SIMD.float64x2(_PRIVATE._f64x2[0], _PRIVATE._f64x2[1]);
}

/**
  * Construct a new instance of int32x4 number.
  * @param {integer} 32-bit value used for x lane.
  * @param {integer} 32-bit value used for y lane.
  * @param {integer} 32-bit value used for z lane.
  * @param {integer} 32-bit value used for w lane.
  * @constructor
  */
SIMD.int32x4 = function(x, y, z, w) {
  if (arguments.length == 1) {
    checkInt32x4(x);
    return x;
  }

  if (!(this instanceof SIMD.int32x4)) {
    return new SIMD.int32x4(x, y, z, w);
  }

  this.x_ = x|0;
  this.y_ = y|0;
  this.z_ = z|0;
  this.w_ = w|0;
}

/**
  * Construct a new instance of int32x4 number with either true or false in each
  * lane, depending on the truth values in x, y, z, and w.
  * @param {boolean} flag used for x lane.
  * @param {boolean} flag used for y lane.
  * @param {boolean} flag used for z lane.
  * @param {boolean} flag used for w lane.
  * @constructor
  */
SIMD.int32x4.bool = function(x, y, z, w) {
  return SIMD.int32x4(_PRIVATE.frombool(x),
                      _PRIVATE.frombool(y),
                      _PRIVATE.frombool(z),
                      _PRIVATE.frombool(w));
}

/**
  * Construct a new instance of int32x4 number with the same value
  * in all lanes.
  * @param {integer} value used for all lanes.
  * @constructor
  */
SIMD.int32x4.splat = function(s) {
  return SIMD.int32x4(s, s, s, s);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @return {int32x4} with a integer to float conversion of t.
  */
SIMD.int32x4.fromFloat32x4 = function(t) {
  checkFloat32x4(t);
  return SIMD.int32x4(t.x_, t.y_, t.z_, t.w_);
}

/**
  * @param {float64x2} t An instance of float64x2.
  * @return {int32x4}  An int32x4 with .x and .y from t
  */
SIMD.int32x4.fromFloat64x2 = function(t) {
  checkFloat64x2(t);
  return SIMD.int32x4(t.x_, t.y_, 0, 0);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @return {int32x4} a bit-wise copy of t as a int32x4.
  */
SIMD.int32x4.fromFloat32x4Bits = function(t) {
  checkFloat32x4(t);
  _PRIVATE._f32x4[0] = t.x_;
  _PRIVATE._f32x4[1] = t.y_;
  _PRIVATE._f32x4[2] = t.z_;
  _PRIVATE._f32x4[3] = t.w_;
  var alias = _PRIVATE._i32x4;
  return SIMD.int32x4(alias[0], alias[1], alias[2], alias[3]);
}

/**
 * @param {float64x2} t An instance of float64x2.
 * @return {int32x4} a bit-wise copy of t as an int32x4.
 */
SIMD.int32x4.fromFloat64x2Bits = function(t) {
  checkFloat64x2(t);
  _PRIVATE._f64x2[0] = t.x_;
  _PRIVATE._f64x2[1] = t.y_;
  var alias = _PRIVATE._i32x4;
  return SIMD.int32x4(alias[0], alias[1], alias[2], alias[3]);
}

/**
* @return {float32x4} New instance of float32x4 with absolute values of
* t.
*/
SIMD.float32x4.abs = function(t) {
  checkFloat32x4(t);
  return SIMD.float32x4(Math.abs(t.x), Math.abs(t.y), Math.abs(t.z),
                        Math.abs(t.w));
}

/**
  * @return {float32x4} New instance of float32x4 with negated values of
  * t.
  */
SIMD.float32x4.neg = function(t) {
  checkFloat32x4(t);
  return SIMD.float32x4(-t.x, -t.y, -t.z, -t.w);
}

/**
  * @return {float32x4} New instance of float32x4 with a + b.
  */
SIMD.float32x4.add = function(a, b) {
  checkFloat32x4(a);
  checkFloat32x4(b);
  return SIMD.float32x4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

/**
  * @return {float32x4} New instance of float32x4 with a - b.
  */
SIMD.float32x4.sub = function(a, b) {
  checkFloat32x4(a);
  checkFloat32x4(b);
  return SIMD.float32x4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

/**
  * @return {float32x4} New instance of float32x4 with a * b.
  */
SIMD.float32x4.mul = function(a, b) {
  checkFloat32x4(a);
  checkFloat32x4(b);
  return SIMD.float32x4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
}

/**
  * @return {float32x4} New instance of float32x4 with a / b.
  */
SIMD.float32x4.div = function(a, b) {
  checkFloat32x4(a);
  checkFloat32x4(b);
  return SIMD.float32x4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
}

/**
  * @return {float32x4} New instance of float32x4 with t's values clamped
  * between lowerLimit and upperLimit.
  */
SIMD.float32x4.clamp = function(t, lowerLimit, upperLimit) {
  checkFloat32x4(t);
  checkFloat32x4(lowerLimit);
  checkFloat32x4(upperLimit);
  var cx = t.x < lowerLimit.x ? lowerLimit.x : t.x;
  var cy = t.y < lowerLimit.y ? lowerLimit.y : t.y;
  var cz = t.z < lowerLimit.z ? lowerLimit.z : t.z;
  var cw = t.w < lowerLimit.w ? lowerLimit.w : t.w;
  cx = cx > upperLimit.x ? upperLimit.x : cx;
  cy = cy > upperLimit.y ? upperLimit.y : cy;
  cz = cz > upperLimit.z ? upperLimit.z : cz;
  cw = cw > upperLimit.w ? upperLimit.w : cw;
  return SIMD.float32x4(cx, cy, cz, cw);
}

/**
  * @return {float32x4} New instance of float32x4 with the minimum value of
  * t and other.
  */
SIMD.float32x4.min = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = Math.min(t.x, other.x);
  var cy = Math.min(t.y, other.y);
  var cz = Math.min(t.z, other.z);
  var cw = Math.min(t.w, other.w);
  return SIMD.float32x4(cx, cy, cz, cw);
}

/**
  * @return {float32x4} New instance of float32x4 with the maximum value of
  * t and other.
  */
SIMD.float32x4.max = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = Math.max(t.x, other.x);
  var cy = Math.max(t.y, other.y);
  var cz = Math.max(t.z, other.z);
  var cw = Math.max(t.w, other.w);
  return SIMD.float32x4(cx, cy, cz, cw);
}

/**
  * @return {float32x4} New instance of float32x4 with the minimum value of
  * t and other, preferring numbers over NaNs.
  */
SIMD.float32x4.minNum = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = _PRIVATE.minNum(t.x, other.x);
  var cy = _PRIVATE.minNum(t.y, other.y);
  var cz = _PRIVATE.minNum(t.z, other.z);
  var cw = _PRIVATE.minNum(t.w, other.w);
  return SIMD.float32x4(cx, cy, cz, cw);
}

/**
  * @return {float32x4} New instance of float32x4 with the maximum value of
  * t and other, preferring numbers over NaNs.
  */
SIMD.float32x4.maxNum = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = _PRIVATE.maxNum(t.x, other.x);
  var cy = _PRIVATE.maxNum(t.y, other.y);
  var cz = _PRIVATE.maxNum(t.z, other.z);
  var cw = _PRIVATE.maxNum(t.w, other.w);
  return SIMD.float32x4(cx, cy, cz, cw);
}

/**
  * @return {float32x4} New instance of float32x4 with reciprocal value of
  * t.
  */
SIMD.float32x4.reciprocal = function(t) {
  checkFloat32x4(t);
  return SIMD.float32x4(1.0 / t.x, 1.0 / t.y, 1.0 / t.z, 1.0 / t.w);
}

/**
  * @return {float32x4} New instance of float32x4 with square root of the
  * reciprocal value of t.
  */
SIMD.float32x4.reciprocalSqrt = function(t) {
  checkFloat32x4(t);
  return SIMD.float32x4(Math.sqrt(1.0 / t.x), Math.sqrt(1.0 / t.y),
                        Math.sqrt(1.0 / t.z), Math.sqrt(1.0 / t.w));
}

/**
  * @return {float32x4} New instance of float32x4 with square root of
  * values of t.
  */
SIMD.float32x4.sqrt = function(t) {
  checkFloat32x4(t);
  return SIMD.float32x4(Math.sqrt(t.x), Math.sqrt(t.y),
                        Math.sqrt(t.z), Math.sqrt(t.w));
}

/**
  * @param {float32x4} t An instance of float32x4 to be swizzled.
  * @param {integer} x - Index in t for lane x
  * @param {integer} y - Index in t for lane y
  * @param {integer} z - Index in t for lane z
  * @param {integer} w - Index in t for lane w
  * @return {float32x4} New instance of float32x4 with lanes swizzled.
  */
SIMD.float32x4.swizzle = function(t, x, y, z, w) {
  checkFloat32x4(t);
  _PRIVATE._f32x4[0] = t.x_;
  _PRIVATE._f32x4[1] = t.y_;
  _PRIVATE._f32x4[2] = t.z_;
  _PRIVATE._f32x4[3] = t.w_;
  var storage = _PRIVATE._f32x4;
  return SIMD.float32x4(storage[x], storage[y], storage[z], storage[w]);
}

/**
  * @param {float32x4} t1 An instance of float32x4 to be shuffled.
  * @param {float32x4} t2 An instance of float32x4 to be shuffled.
  * @param {integer} x - Index in concatenation of t1 and t2 for lane x
  * @param {integer} y - Index in concatenation of t1 and t2 for lane y
  * @param {integer} z - Index in concatenation of t1 and t2 for lane z
  * @param {integer} w - Index in concatenation of t1 and t2 for lane w
  * @return {float32x4} New instance of float32x4 with lanes shuffled.
  */
SIMD.float32x4.shuffle = function(t1, t2, x, y, z, w) {
  checkFloat32x4(t1);
  checkFloat32x4(t2);
  var storage = _PRIVATE._f32x8;
  storage[0] = t1.x_;
  storage[1] = t1.y_;
  storage[2] = t1.z_;
  storage[3] = t1.w_;
  storage[4] = t2.x_;
  storage[5] = t2.y_;
  storage[6] = t2.z_;
  storage[7] = t2.w_;
  return SIMD.float32x4(storage[x], storage[y], storage[z], storage[w]);
}

/**
  * @param {double} value used for x lane.
  * @return {float32x4} New instance of float32x4 with the values in t and
  * x replaced with {x}.
  */
SIMD.float32x4.withX = function(t, x) {
  checkFloat32x4(t);
  return SIMD.float32x4(x, t.y, t.z, t.w);
}

/**
  * @param {double} value used for y lane.
  * @return {float32x4} New instance of float32x4 with the values in t and
  * y replaced with {y}.
  */
SIMD.float32x4.withY = function(t, y) {
  checkFloat32x4(t);
  return SIMD.float32x4(t.x, y, t.z, t.w);
}

/**
  * @param {double} value used for z lane.
  * @return {float32x4} New instance of float32x4 with the values in t and
  * z replaced with {z}.
  */
SIMD.float32x4.withZ = function(t, z) {
  checkFloat32x4(t);
  return SIMD.float32x4(t.x, t.y, z, t.w);
}

/**
  * @param {double} value used for w lane.
  * @return {float32x4} New instance of float32x4 with the values in t and
  * w replaced with {w}.
  */
SIMD.float32x4.withW = function(t, w) {
  checkFloat32x4(t);
  return SIMD.float32x4(t.x, t.y, t.z, w);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @param {float32x4} other An instance of float32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t < other.
  */
SIMD.float32x4.lessThan = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = t.x < other.x;
  var cy = t.y < other.y;
  var cz = t.z < other.z;
  var cw = t.w < other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @param {float32x4} other An instance of float32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t <= other.
  */
SIMD.float32x4.lessThanOrEqual = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = t.x <= other.x;
  var cy = t.y <= other.y;
  var cz = t.z <= other.z;
  var cw = t.w <= other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @param {float32x4} other An instance of float32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t == other.
  */
SIMD.float32x4.equal = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = t.x == other.x;
  var cy = t.y == other.y;
  var cz = t.z == other.z;
  var cw = t.w == other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @param {float32x4} other An instance of float32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t != other.
  */
SIMD.float32x4.notEqual = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = t.x != other.x;
  var cy = t.y != other.y;
  var cz = t.z != other.z;
  var cw = t.w != other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @param {float32x4} other An instance of float32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t >= other.
  */
SIMD.float32x4.greaterThanOrEqual = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = t.x >= other.x;
  var cy = t.y >= other.y;
  var cz = t.z >= other.z;
  var cw = t.w >= other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {float32x4} t An instance of float32x4.
  * @param {float32x4} other An instance of float32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t > other.
  */
SIMD.float32x4.greaterThan = function(t, other) {
  checkFloat32x4(t);
  checkFloat32x4(other);
  var cx = t.x > other.x;
  var cy = t.y > other.y;
  var cz = t.z > other.z;
  var cw = t.w > other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {int32x4} t Selector mask. An instance of int32x4
  * @param {float32x4} trueValue Pick lane from here if corresponding
  * selector lane is true
  * @param {float32x4} falseValue Pick lane from here if corresponding
  * selector lane is false
  * @return {float32x4} Mix of lanes from trueValue or falseValue as
  * indicated
  */
SIMD.float32x4.select = function(t, trueValue, falseValue) {
  checkInt32x4(t);
  checkFloat32x4(trueValue);
  checkFloat32x4(falseValue);
  return SIMD.float32x4(_PRIVATE.tobool(t.x) ? trueValue.x : falseValue.x,
                        _PRIVATE.tobool(t.y) ? trueValue.y : falseValue.y,
                        _PRIVATE.tobool(t.z) ? trueValue.z : falseValue.z,
                        _PRIVATE.tobool(t.w) ? trueValue.w : falseValue.w);
}

/**
  * @param {int32x4} t Selector mask. An instance of int32x4
  * @param {float32x4} trueValue Pick bit from here if corresponding
  * selector bit is 1
  * @param {float32x4} falseValue Pick bit from here if corresponding
  * selector bit is 0
  * @return {float32x4} Mix of bits from trueValue or falseValue as
  * indicated
  */
SIMD.float32x4.bitselect = function(t, trueValue, falseValue) {
  checkInt32x4(t);
  checkFloat32x4(trueValue);
  checkFloat32x4(falseValue);
  var tv = SIMD.int32x4.fromFloat32x4Bits(trueValue);
  var fv = SIMD.int32x4.fromFloat32x4Bits(falseValue);
  var tr = SIMD.int32x4.and(t, tv);
  var fr = SIMD.int32x4.and(SIMD.int32x4.not(t), fv);
  return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.or(tr, fr));
}

/**
  * @param {float32x4} a An instance of float32x4.
  * @param {float32x4} b An instance of float32x4.
  * @return {float32x4} New instance of float32x4 with values of a & b.
  */
SIMD.float32x4.and = function(a, b) {
  checkFloat32x4(a);
  checkFloat32x4(b);
  var aInt = SIMD.int32x4.fromFloat32x4Bits(a);
  var bInt = SIMD.int32x4.fromFloat32x4Bits(b);
  return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.and(aInt, bInt));
}

/**
  * @param {float32x4} a An instance of float32x4.
  * @param {float32x4} b An instance of float32x4.
  * @return {float32x4} New instance of float32x4 with values of a | b.
  */
SIMD.float32x4.or = function(a, b) {
  checkFloat32x4(a);
  checkFloat32x4(b);
  var aInt = SIMD.int32x4.fromFloat32x4Bits(a);
  var bInt = SIMD.int32x4.fromFloat32x4Bits(b);
  return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.or(aInt, bInt));
}

/**
  * @param {float32x4} a An instance of float32x4.
  * @param {float32x4} b An instance of float32x4.
  * @return {float32x4} New instance of float32x4 with values of a ^ b.
  */
SIMD.float32x4.xor = function(a, b) {
  checkFloat32x4(a);
  checkFloat32x4(b);
  var aInt = SIMD.int32x4.fromFloat32x4Bits(a);
  var bInt = SIMD.int32x4.fromFloat32x4Bits(b);
  return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.xor(aInt, bInt));
}

/**
  * @param {float32x4} a An instance of float32x4.
  * @return {float32x4} New instance of float32x4 with values of ~a.
  */
SIMD.float32x4.not = function(a) {
  checkFloat32x4(a);
  var aInt = SIMD.int32x4.fromFloat32x4Bits(a);
  return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.not(aInt));
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {float32x4} New instance of float32x4.
  */
SIMD.float32x4.load = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 16) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 16 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  var f32temp = _PRIVATE._f32x4;
  return new SIMD.float32x4(f32temp[0], f32temp[1], f32temp[2], f32temp[3]);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {float32x4} New instance of float32x4.
  */
SIMD.float32x4.loadX = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 4) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 4 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  var f32temp = _PRIVATE._f32x4;
  return new SIMD.float32x4(f32temp[0], 0.0, 0.0, 0.0);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {float32x4} New instance of float32x4.
  */
SIMD.float32x4.loadXY = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 8) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 8 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  var f32temp = _PRIVATE._f32x4;
  return new SIMD.float32x4(f32temp[0], f32temp[1], 0.0, 0.0);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {float32x4} New instance of float32x4.
  */
SIMD.float32x4.loadXYZ = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 12) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 12 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  var f32temp = _PRIVATE._f32x4;
  return new SIMD.float32x4(f32temp[0], f32temp[1], f32temp[2], 0.0);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {float32x4} value An instance of float32x4.
  * @return {void}
  */
SIMD.float32x4.store = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 16) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkFloat32x4(value);
  _PRIVATE._f32x4[0] = value.x;
  _PRIVATE._f32x4[1] = value.y;
  _PRIVATE._f32x4[2] = value.z;
  _PRIVATE._f32x4[3] = value.w;
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 16 / bpe;
  for (var i = 0; i < n; ++i)
    tarray[index + i] = array[i];
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {float32x4} value An instance of float32x4.
  * @return {void}
  */
SIMD.float32x4.storeX = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 4) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkFloat32x4(value);
  if (bpe == 8) {
    // tarray's elements are too wide. Just create a new view; this is rare.
    var view = new Float32Array(tarray.buffer, tarray.byteOffset + index * 8, 1);
    view[0] = value.x;
  } else {
    _PRIVATE._f32x4[0] = value.x;
    var array = bpe == 1 ? _PRIVATE._i8x16 :
                bpe == 2 ? _PRIVATE._i16x8 :
                (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4);
    var n = 4 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {float32x4} value An instance of float32x4.
  * @return {void}
  */
SIMD.float32x4.storeXY = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 8) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkFloat32x4(value);
  _PRIVATE._f32x4[0] = value.x;
  _PRIVATE._f32x4[1] = value.y;
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 8 / bpe;
  for (var i = 0; i < n; ++i)
    tarray[index + i] = array[i];
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {float32x4} value An instance of float32x4.
  * @return {void}
  */
SIMD.float32x4.storeXYZ = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 12) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkFloat32x4(value);
  if (bpe == 8) {
    // tarray's elements are too wide. Just create a new view; this is rare.
    var view = new Float32Array(tarray.buffer, tarray.byteOffset + index * 8, 3);
    view[0] = value.x;
    view[1] = value.y;
    view[2] = value.z;
  } else {
    _PRIVATE._f32x4[0] = value.x;
    _PRIVATE._f32x4[1] = value.y;
    _PRIVATE._f32x4[2] = value.z;
    var array = bpe == 1 ? _PRIVATE._i8x16 :
                bpe == 2 ? _PRIVATE._i16x8 :
                (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4);
    var n = 12 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

/**
* @return {float64x2} New instance of float64x2 with absolute values of
* t.
*/
SIMD.float64x2.abs = function(t) {
  checkFloat64x2(t);
  return SIMD.float64x2(Math.abs(t.x), Math.abs(t.y));
}

/**
  * @return {float64x2} New instance of float64x2 with negated values of
  * t.
  */
SIMD.float64x2.neg = function(t) {
  checkFloat64x2(t);
  return SIMD.float64x2(-t.x, -t.y);
}

/**
  * @return {float64x2} New instance of float64x2 with a + b.
  */
SIMD.float64x2.add = function(a, b) {
  checkFloat64x2(a);
  checkFloat64x2(b);
  return SIMD.float64x2(a.x + b.x, a.y + b.y);
}

/**
  * @return {float64x2} New instance of float64x2 with a - b.
  */
SIMD.float64x2.sub = function(a, b) {
  checkFloat64x2(a);
  checkFloat64x2(b);
  return SIMD.float64x2(a.x - b.x, a.y - b.y);
}

/**
  * @return {float64x2} New instance of float64x2 with a * b.
  */
SIMD.float64x2.mul = function(a, b) {
  checkFloat64x2(a);
  checkFloat64x2(b);
  return SIMD.float64x2(a.x * b.x, a.y * b.y);
}

/**
  * @return {float64x2} New instance of float64x2 with a / b.
  */
SIMD.float64x2.div = function(a, b) {
  checkFloat64x2(a);
  checkFloat64x2(b);
  return SIMD.float64x2(a.x / b.x, a.y / b.y);
}

/**
  * @return {float64x2} New instance of float64x2 with t's values clamped
  * between lowerLimit and upperLimit.
  */
SIMD.float64x2.clamp = function(t, lowerLimit, upperLimit) {
  checkFloat64x2(t);
  checkFloat64x2(lowerLimit);
  checkFloat64x2(upperLimit);
  var cx = t.x < lowerLimit.x ? lowerLimit.x : t.x;
  var cy = t.y < lowerLimit.y ? lowerLimit.y : t.y;
  cx = cx > upperLimit.x ? upperLimit.x : cx;
  cy = cy > upperLimit.y ? upperLimit.y : cy;
  return SIMD.float64x2(cx, cy);
}

/**
  * @return {float64x2} New instance of float64x2 with the minimum value of
  * t and other.
  */
SIMD.float64x2.min = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = Math.min(t.x, other.x);
  var cy = Math.min(t.y, other.y);
  return SIMD.float64x2(cx, cy);
}

/**
  * @return {float64x2} New instance of float64x2 with the maximum value of
  * t and other.
  */
SIMD.float64x2.max = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = Math.max(t.x, other.x);
  var cy = Math.max(t.y, other.y);
  return SIMD.float64x2(cx, cy);
}

/**
  * @return {float64x2} New instance of float64x2 with the minimum value of
  * t and other, preferring numbers over NaNs.
  */
SIMD.float64x2.minNum = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = _PRIVATE.minNum(t.x, other.x);
  var cy = _PRIVATE.minNum(t.y, other.y);
  return SIMD.float64x2(cx, cy);
}

/**
  * @return {float64x2} New instance of float64x2 with the maximum value of
  * t and other, preferring numbers over NaNs.
  */
SIMD.float64x2.maxNum = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = _PRIVATE.maxNum(t.x, other.x);
  var cy = _PRIVATE.maxNum(t.y, other.y);
  return SIMD.float64x2(cx, cy);
}

/**
  * @return {float64x2} New instance of float64x2 with reciprocal value of
  * t.
  */
SIMD.float64x2.reciprocal = function(t) {
  checkFloat64x2(t);
  return SIMD.float64x2(1.0 / t.x, 1.0 / t.y);
}

/**
  * @return {float64x2} New instance of float64x2 with square root of the
  * reciprocal value of t.
  */
SIMD.float64x2.reciprocalSqrt = function(t) {
  checkFloat64x2(t);
  return SIMD.float64x2(Math.sqrt(1.0 / t.x), Math.sqrt(1.0 / t.y));
}

/**
  * @return {float64x2} New instance of float32x4 with square root of
  * values of t.
  */
SIMD.float64x2.sqrt = function(t) {
  checkFloat64x2(t);
  return SIMD.float64x2(Math.sqrt(t.x), Math.sqrt(t.y));
}

/**
  * @param {float64x2} t An instance of float64x2 to be swizzled.
  * @param {integer} x - Index in t for lane x
  * @param {integer} y - Index in t for lane y
  * @return {float64x2} New instance of float64x2 with lanes swizzled.
  */
SIMD.float64x2.swizzle = function(t, x, y) {
  checkFloat64x2(t);
  var storage = _PRIVATE._f64x2;
  storage[0] = t.x_;
  storage[1] = t.y_;
  return SIMD.float64x2(storage[x], storage[y]);
}

/**
  * @param {float64x2} t1 An instance of float64x2 to be shuffled.
  * @param {float64x2} t2 An instance of float64x2 to be shuffled.
  * @param {integer} x - Index in concatenation of t1 and t2 for lane x
  * @param {integer} y - Index in concatenation of t1 and t2 for lane y
  * @return {float64x2} New instance of float64x2 with lanes shuffled.
  */
SIMD.float64x2.shuffle = function(t1, t2, x, y) {
  checkFloat64x2(t1);
  checkFloat64x2(t2);
  var storage = _PRIVATE._f64x4;
  storage[0] = t1.x_;
  storage[1] = t1.y_;
  storage[2] = t2.x_;
  storage[3] = t2.y_;
  return SIMD.float64x2(storage[x], storage[y]);
}

/**
  * @param {double} value used for x lane.
  * @return {float64x2} New instance of float64x2 with the values in t and
  * x replaced with {x}.
  */
SIMD.float64x2.withX = function(t, x) {
  checkFloat64x2(t);
  return SIMD.float64x2(x, t.y);
}

/**
  * @param {double} value used for y lane.
  * @return {float64x2} New instance of float64x2 with the values in t and
  * y replaced with {y}.
  */
SIMD.float64x2.withY = function(t, y) {
  checkFloat64x2(t);
  return SIMD.float64x2(t.x, y);
}

/**
  * @param {float64x2} t An instance of float64x2.
  * @param {float64x2} other An instance of float64x2.
  * @return {int32x4} true or false in each lane depending on
  * the result of t < other.
  */
SIMD.float64x2.lessThan = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = t.x < other.x;
  var cy = t.y < other.y;
  return SIMD.int32x4.bool(cx, cx, cy, cy);
}

/**
  * @param {float64x2} t An instance of float64x2.
  * @param {float64x2} other An instance of float64x2.
  * @return {int32x4} true or false in each lane depending on
  * the result of t <= other.
  */
SIMD.float64x2.lessThanOrEqual = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = t.x <= other.x;
  var cy = t.y <= other.y;
  return SIMD.int32x4.bool(cx, cx, cy, cy);
}

/**
  * @param {float64x2} t An instance of float64x2.
  * @param {float64x2} other An instance of float64x2.
  * @return {int32x4} true or false in each lane depending on
  * the result of t == other.
  */
SIMD.float64x2.equal = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = t.x == other.x;
  var cy = t.y == other.y;
  return SIMD.int32x4.bool(cx, cx, cy, cy);
}

/**
  * @param {float64x2} t An instance of float64x2.
  * @param {float64x2} other An instance of float64x2.
  * @return {int32x4} true or false in each lane depending on
  * the result of t != other.
  */
SIMD.float64x2.notEqual = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = t.x != other.x;
  var cy = t.y != other.y;
  return SIMD.int32x4.bool(cx, cx, cy, cy);
}

/**
  * @param {float64x2} t An instance of float64x2.
  * @param {float64x2} other An instance of float64x2.
  * @return {int32x4} true or false in each lane depending on
  * the result of t >= other.
  */
SIMD.float64x2.greaterThanOrEqual = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = t.x >= other.x;
  var cy = t.y >= other.y;
  return SIMD.int32x4.bool(cx, cx, cy, cy);
}

/**
  * @param {float64x2} t An instance of float64x2.
  * @param {float64x2} other An instance of float64x2.
  * @return {int32x4} true or false in each lane depending on
  * the result of t > other.
  */
SIMD.float64x2.greaterThan = function(t, other) {
  checkFloat64x2(t);
  checkFloat64x2(other);
  var cx = t.x > other.x;
  var cy = t.y > other.y;
  return SIMD.int32x4.bool(cx, cx, cy, cy);
}

/**
  * @param {int32x4} t Selector mask. An instance of int32x4
  * @param {float64x2} trueValue Pick lane from here if corresponding
  * selector lane is true
  * @param {float64x2} falseValue Pick lane from here if corresponding
  * selector lane is false
  * @return {float64x2} Mix of lanes from trueValue or falseValue as
  * indicated
  */
SIMD.float64x2.select = function(t, trueValue, falseValue) {
  checkInt32x4(t);
  checkFloat64x2(trueValue);
  checkFloat64x2(falseValue);
  return SIMD.float32x4(_PRIVATE.tobool(t.x) ? trueValue.x : falseValue.x,
                        _PRIVATE.tobool(t.y) ? trueValue.y : falseValue.y);
}

/**
  * @param {int32x4} t Selector mask. An instance of int32x4
  * @param {float64x2} trueValue Pick bit from here if corresponding
  * selector bit is 1
  * @param {float64x2} falseValue Pick bit from here if corresponding
  * selector bit is 0
  * @return {float64x2} Mix of bits from trueValue or falseValue as
  * indicated
  */
SIMD.float64x2.bitselect = function(t, trueValue, falseValue) {
  checkInt32x4(t);
  checkFloat64x2(trueValue);
  checkFloat64x2(falseValue);
  var tv = SIMD.int32x4.fromFloat64x2Bits(trueValue);
  var fv = SIMD.int32x4.fromFloat64x2Bits(falseValue);
  var tr = SIMD.int32x4.and(t, tv);
  var fr = SIMD.int32x4.and(SIMD.int32x4.not(t), fv);
  return SIMD.float64x2.fromInt32x4Bits(SIMD.int32x4.or(tr, fr));
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {float64x2} New instance of float64x2.
  */
SIMD.float64x2.load = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 16) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var f64temp = _PRIVATE._f64x2;
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              f64temp;
  var n = 16 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  return new SIMD.float64x2(f64temp[0], f64temp[1]);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {float64x2} New instance of float64x2.
  */
SIMD.float64x2.loadX = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 8) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var f64temp = _PRIVATE._f64x2;
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              f64temp;
  var n = 8 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  return new SIMD.float64x2(f64temp[0], 0.0);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {float64x2} value An instance of float64x2.
  * @return {void}
  */
SIMD.float64x2.store = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 16) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkFloat64x2(value);
  _PRIVATE._f64x2[0] = value.x;
  _PRIVATE._f64x2[1] = value.y;
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 16 / bpe;
  for (var i = 0; i < n; ++i)
    tarray[index + i] = array[i];
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {float64x2} value An instance of float64x2.
  * @return {void}
  */
SIMD.float64x2.storeX = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 8) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkFloat64x2(value);
  _PRIVATE._f64x2[0] = value.x;
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 8 / bpe;
  for (var i = 0; i < n; ++i)
    tarray[index + i] = array[i];
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int32x4} b An instance of int32x4.
  * @return {int32x4} New instance of int32x4 with values of a & b.
  */
SIMD.int32x4.and = function(a, b) {
  checkInt32x4(a);
  checkInt32x4(b);
  return SIMD.int32x4(a.x & b.x, a.y & b.y, a.z & b.z, a.w & b.w);
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int32x4} b An instance of int32x4.
  * @return {int32x4} New instance of int32x4 with values of a | b.
  */
SIMD.int32x4.or = function(a, b) {
  checkInt32x4(a);
  checkInt32x4(b);
  return SIMD.int32x4(a.x | b.x, a.y | b.y, a.z | b.z, a.w | b.w);
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int32x4} b An instance of int32x4.
  * @return {int32x4} New instance of int32x4 with values of a ^ b.
  */
SIMD.int32x4.xor = function(a, b) {
  checkInt32x4(a);
  checkInt32x4(b);
  return SIMD.int32x4(a.x ^ b.x, a.y ^ b.y, a.z ^ b.z, a.w ^ b.w);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @return {int32x4} New instance of int32x4 with values of ~t
  */
SIMD.int32x4.not = function(t) {
  checkInt32x4(t);
  return SIMD.int32x4(~t.x, ~t.y, ~t.z, ~t.w);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @return {int32x4} New instance of int32x4 with values of -t
  */
SIMD.int32x4.neg = function(t) {
  checkInt32x4(t);
  return SIMD.int32x4(-t.x, -t.y, -t.z, -t.w);
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int32x4} b An instance of int32x4.
  * @return {int32x4} New instance of int32x4 with values of a + b.
  */
SIMD.int32x4.add = function(a, b) {
  checkInt32x4(a);
  checkInt32x4(b);
  return SIMD.int32x4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int32x4} b An instance of int32x4.
  * @return {int32x4} New instance of int32x4 with values of a - b.
  */
SIMD.int32x4.sub = function(a, b) {
  checkInt32x4(a);
  checkInt32x4(b);
  return SIMD.int32x4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int32x4} b An instance of int32x4.
  * @return {int32x4} New instance of int32x4 with values of a * b.
  */
SIMD.int32x4.mul = function(a, b) {
  checkInt32x4(a);
  checkInt32x4(b);
  return SIMD.int32x4(Math.imul(a.x, b.x), Math.imul(a.y, b.y),
                      Math.imul(a.z, b.z), Math.imul(a.w, b.w));
}

/**
  * @param {int32x4} t An instance of float32x4 to be swizzled.
  * @param {integer} x - Index in t for lane x
  * @param {integer} y - Index in t for lane y
  * @param {integer} z - Index in t for lane z
  * @param {integer} w - Index in t for lane w
  * @return {int32x4} New instance of float32x4 with lanes swizzled.
  */
SIMD.int32x4.swizzle = function(t, x, y, z, w) {
  checkInt32x4(t);
  var storage = _PRIVATE._i32x4;
  storage[0] = t.x_;
  storage[1] = t.y_;
  storage[2] = t.z_;
  storage[3] = t.w_;
  return SIMD.int32x4(storage[x], storage[y], storage[z], storage[w]);
}

/**
  * @param {int32x4} t1 An instance of float32x4 to be shuffled.
  * @param {int32x4} t2 An instance of float32x4 to be shuffled.
  * @param {integer} x - Index in concatenation of t1 and t2 for lane x
  * @param {integer} y - Index in concatenation of t1 and t2 for lane y
  * @param {integer} z - Index in concatenation of t1 and t2 for lane z
  * @param {integer} w - Index in concatenation of t1 and t2 for lane w
  * @return {int32x4} New instance of float32x4 with lanes shuffled.
  */
SIMD.int32x4.shuffle = function(t1, t2, x, y, z, w) {
  checkInt32x4(t1);
  checkInt32x4(t2);
  var storage = _PRIVATE._i32x8;
  storage[0] = t1.x_;
  storage[1] = t1.y_;
  storage[2] = t1.z_;
  storage[3] = t1.w_;
  storage[4] = t2.x_;
  storage[5] = t2.y_;
  storage[6] = t2.z_;
  storage[7] = t2.w_;
  return SIMD.float32x4(storage[x], storage[y], storage[z], storage[w]);
}

/**
  * @param {int32x4} t Selector mask. An instance of int32x4
  * @param {int32x4} trueValue Pick lane from here if corresponding
  * selector lane is true
  * @param {int32x4} falseValue Pick lane from here if corresponding
  * selector lane is false
  * @return {int32x4} Mix of lanes from trueValue or falseValue as
  * indicated
  */
SIMD.int32x4.select = function(t, trueValue, falseValue) {
  checkInt32x4(t);
  checkInt32x4(trueValue);
  checkInt32x4(falseValue);
  return SIMD.int32x4(_PRIVATE.tobool(t.x) ? trueValue.x : falseValue.x,
                      _PRIVATE.tobool(t.y) ? trueValue.y : falseValue.y,
                      _PRIVATE.tobool(t.z) ? trueValue.z : falseValue.z,
                      _PRIVATE.tobool(t.w) ? trueValue.w : falseValue.w);
}

/**
  * @param {int32x4} t Selector mask. An instance of int32x4
  * @param {int32x4} trueValue Pick bit from here if corresponding
  * selector bit is 1
  * @param {int32x4} falseValue Pick bit from here if corresponding
  * selector bit is 0
  * @return {int32x4} Mix of bits from trueValue or falseValue as
  * indicated
  */
SIMD.int32x4.bitselect = function(t, trueValue, falseValue) {
  checkInt32x4(t);
  checkInt32x4(trueValue);
  checkInt32x4(falseValue);
  var tr = SIMD.int32x4.and(t, trueValue);
  var fr = SIMD.int32x4.and(SIMD.int32x4.not(t), falseValue);
  return SIMD.int32x4.or(tr, fr);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @param {integer} 32-bit value used for x lane.
  * @return {int32x4} New instance of int32x4 with the values in t and
  * x lane replaced with {x}.
  */
SIMD.int32x4.withX = function(t, x) {
  checkInt32x4(t);
  return SIMD.int32x4(x, t.y, t.z, t.w);
}

/**
  * param {int32x4} t An instance of int32x4.
  * @param {integer} 32-bit value used for y lane.
  * @return {int32x4} New instance of int32x4 with the values in t and
  * y lane replaced with {y}.
  */
SIMD.int32x4.withY = function(t, y) {
  checkInt32x4(t);
  return SIMD.int32x4(t.x, y, t.z, t.w);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @param {integer} 32-bit value used for z lane.
  * @return {int32x4} New instance of int32x4 with the values in t and
  * z lane replaced with {z}.
  */
SIMD.int32x4.withZ = function(t, z) {
  checkInt32x4(t);
  return SIMD.int32x4(t.x, t.y, z, t.w);
}

/**
  * @param {integer} 32-bit value used for w lane.
  * @return {int32x4} New instance of int32x4 with the values in t and
  * w lane replaced with {w}.
  */
SIMD.int32x4.withW = function(t, w) {
  checkInt32x4(t);
  return SIMD.int32x4(t.x, t.y, t.z, w);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @param {int32x4} other An instance of int32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t == other.
  */
SIMD.int32x4.equal = function(t, other) {
  checkInt32x4(t);
  checkInt32x4(other);
  var cx = t.x == other.x;
  var cy = t.y == other.y;
  var cz = t.z == other.z;
  var cw = t.w == other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @param {int32x4} other An instance of int32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t > other.
  */
SIMD.int32x4.greaterThan = function(t, other) {
  checkInt32x4(t);
  checkInt32x4(other);
  var cx = t.x > other.x;
  var cy = t.y > other.y;
  var cz = t.z > other.z;
  var cw = t.w > other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {int32x4} t An instance of int32x4.
  * @param {int32x4} other An instance of int32x4.
  * @return {int32x4} true or false in each lane depending on
  * the result of t < other.
  */
SIMD.int32x4.lessThan = function(t, other) {
  checkInt32x4(t);
  checkInt32x4(other);
  var cx = t.x < other.x;
  var cy = t.y < other.y;
  var cz = t.z < other.z;
  var cw = t.w < other.w;
  return SIMD.int32x4.bool(cx, cy, cz, cw);
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int} bits Bit count to shift by.
  * @return {int32x4} lanes in a shifted by bits.
  */
SIMD.int32x4.shiftLeftByScalar = function(a, bits) {
  checkInt32x4(a);
  var x = a.x << bits;
  var y = a.y << bits;
  var z = a.z << bits;
  var w = a.w << bits;
  return SIMD.int32x4(x, y, z, w);
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int} bits Bit count to shift by.
  * @return {int32x4} lanes in a shifted by bits.
  */
SIMD.int32x4.shiftRightLogicalByScalar = function(a, bits) {
  checkInt32x4(a);
  var x = a.x >>> bits;
  var y = a.y >>> bits;
  var z = a.z >>> bits;
  var w = a.w >>> bits;
  return SIMD.int32x4(x, y, z, w);
}

/**
  * @param {int32x4} a An instance of int32x4.
  * @param {int} bits Bit count to shift by.
  * @return {int32x4} lanes in a shifted by bits.
  */
SIMD.int32x4.shiftRightArithmeticByScalar = function(a, bits) {
  checkInt32x4(a);
  var x = a.x >> bits;
  var y = a.y >> bits;
  var z = a.z >> bits;
  var w = a.w >> bits;
  return SIMD.int32x4(x, y, z, w);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {int32x4} New instance of int32x4.
  */
SIMD.int32x4.load = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 16) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 16 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  var i32temp = _PRIVATE._i32x4;
  return new SIMD.int32x4(i32temp[0], i32temp[1], i32temp[2], i32temp[3]);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {int32x4} New instance of int32x4.
  */
SIMD.int32x4.loadX = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 4) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 4 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  var i32temp = _PRIVATE._i32x4;
  return new SIMD.int32x4(i32temp[0], 0, 0, 0);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {int32x4} New instance of int32x4.
  */
SIMD.int32x4.loadXY = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 8) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 8 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  var i32temp = _PRIVATE._i32x4;
  return new SIMD.int32x4(i32temp[0], i32temp[1], 0, 0);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @return {int32x4} New instance of int32x4.
  */
SIMD.int32x4.loadXYZ = function(tarray, index) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 12) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 12 / bpe;
  for (var i = 0; i < n; ++i)
    array[i] = tarray[index + i];
  var i32temp = _PRIVATE._i32x4;
  return new SIMD.int32x4(i32temp[0], i32temp[1], i32temp[2], 0);
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {int32x4} value An instance of int32x4.
  * @return {void}
  */
SIMD.int32x4.store = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 16) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkInt32x4(value);
  _PRIVATE._i32x4[0] = value.x;
  _PRIVATE._i32x4[1] = value.y;
  _PRIVATE._i32x4[2] = value.z;
  _PRIVATE._i32x4[3] = value.w;
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 16 / bpe;
  for (var i = 0; i < n; ++i)
    tarray[index + i] = array[i];
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {int32x4} value An instance of int32x4.
  * @return {void}
  */
SIMD.int32x4.storeX = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 4) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkInt32x4(value);
  if (bpe == 8) {
    // tarray's elements are too wide. Just create a new view; this is rare.
    var view = new Int32Array(tarray.buffer, tarray.byteOffset + index * 8, 1);
    view[0] = value.x;
  } else {
    _PRIVATE._i32x4[0] = value.x;
    var array = bpe == 1 ? _PRIVATE._i8x16 :
                bpe == 2 ? _PRIVATE._i16x8 :
                (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4);
    var n = 4 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {int32x4} value An instance of int32x4.
  * @return {void}
  */
SIMD.int32x4.storeXY = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 8) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkInt32x4(value);
  _PRIVATE._i32x4[0] = value.x;
  _PRIVATE._i32x4[1] = value.y;
  var array = bpe == 1 ? _PRIVATE._i8x16 :
              bpe == 2 ? _PRIVATE._i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4) :
              _PRIVATE._f64x2;
  var n = 8 / bpe;
  for (var i = 0; i < n; ++i)
    tarray[index + i] = array[i];
}

/**
  * @param {Typed array} tarray An instance of a typed array.
  * @param {Number} index An instance of Number.
  * @param {int32x4} value An instance of int32x4.
  * @return {void}
  */
SIMD.int32x4.storeXYZ = function(tarray, index, value) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isNumber(index))
    throw new TypeError("The 2nd argument must be a Number.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  if (index < 0 || (index * bpe + 12) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");
  checkInt32x4(value);
  if (bpe == 8) {
    // tarray's elements are too wide. Just create a new view; this is rare.
    var view = new Int32Array(tarray.buffer, tarray.byteOffset + index * 8, 3);
    view[0] = value.x;
    view[1] = value.y;
    view[2] = value.z;
  } else {
    _PRIVATE._i32x4[0] = value.x;
    _PRIVATE._i32x4[1] = value.y;
    _PRIVATE._i32x4[2] = value.z;
    var array = bpe == 1 ? _PRIVATE._i8x16 :
                bpe == 2 ? _PRIVATE._i16x8 :
                (tarray instanceof Float32Array ? _PRIVATE._f32x4 : _PRIVATE._i32x4);
    var n = 12 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

Object.defineProperty(SIMD.float32x4.prototype, 'x', {
  get: function() { return this.x_; }
});

Object.defineProperty(SIMD.float32x4.prototype, 'y', {
  get: function() { return this.y_; }
});

Object.defineProperty(SIMD.float32x4.prototype, 'z', {
  get: function() { return this.z_; }
});

Object.defineProperty(SIMD.float32x4.prototype, 'w', {
  get: function() { return this.w_; }
});

/**
  * Extract the sign bit from each lane return them in the first 4 bits.
  */
Object.defineProperty(SIMD.float32x4.prototype, 'signMask', {
  get: function() {
    var mx = (this.x < 0.0 || 1/this.x === -Infinity);
    var my = (this.y < 0.0 || 1/this.y === -Infinity);
    var mz = (this.z < 0.0 || 1/this.z === -Infinity);
    var mw = (this.w < 0.0 || 1/this.w === -Infinity);
    return mx | my << 1 | mz << 2 | mw << 3;
  }
});

Object.defineProperty(SIMD.float64x2.prototype, 'x', {
  get: function() { return this.x_; }
});

Object.defineProperty(SIMD.float64x2.prototype, 'y', {
  get: function() { return this.y_; }
});

/**
  * Extract the sign bit from each lane return them in the first 2 bits.
  */
Object.defineProperty(SIMD.float64x2.prototype, 'signMask', {
  get: function() {
    var mx = (this.x < 0.0 || 1/this.x === -Infinity);
    var my = (this.y < 0.0 || 1/this.y === -Infinity);
    return mx | my << 1;
  }
});

Object.defineProperty(SIMD.int32x4.prototype, 'x', {
  get: function() { return this.x_; }
});

Object.defineProperty(SIMD.int32x4.prototype, 'y', {
  get: function() { return this.y_; }
});

Object.defineProperty(SIMD.int32x4.prototype, 'z', {
  get: function() { return this.z_; }
});

Object.defineProperty(SIMD.int32x4.prototype, 'w', {
  get: function() { return this.w_; }
});

Object.defineProperty(SIMD.int32x4.prototype, 'flagX', {
  get: function() { return _PRIVATE.tobool(this.x_); }
});

Object.defineProperty(SIMD.int32x4.prototype, 'flagY', {
  get: function() { return _PRIVATE.tobool(this.y_); }
});

Object.defineProperty(SIMD.int32x4.prototype, 'flagZ', {
  get: function() { return _PRIVATE.tobool(this.z_); }
});

Object.defineProperty(SIMD.int32x4.prototype, 'flagW', {
  get: function() { return _PRIVATE.tobool(this.w_); }
});

/**
  * Extract the sign bit from each lane return them in the first 4 bits.
  */
Object.defineProperty(SIMD.int32x4.prototype, 'signMask', {
  get: function() {
    var mx = _PRIVATE.tobool(this.x_);
    var my = _PRIVATE.tobool(this.y_);
    var mz = _PRIVATE.tobool(this.z_);
    var mw = _PRIVATE.tobool(this.w_);
    return mx | my << 1 | mz << 2 | mw << 3;
  }
});

function isNumber(o) {
    return typeof o == "number" || (typeof o == "object" && o.constructor === Number);
}

function isTypedArray(o) {
  return (o instanceof Int8Array) ||
         (o instanceof Uint8Array) ||
         (o instanceof Uint8ClampedArray) ||
         (o instanceof Int16Array) ||
         (o instanceof Uint16Array) ||
         (o instanceof Int32Array) ||
         (o instanceof Uint32Array) ||
         (o instanceof Float32Array) ||
         (o instanceof Float64Array) ||
         (o instanceof Int32x4Array) ||
         (o instanceof Float32x4Array);
}

function isArrayBuffer(o) {
  return (o instanceof ArrayBuffer);
}

function Float32x4Array(a, b, c) {
  if (isNumber(a)) {
    this.storage_ = new Float32Array(a*4);
    this.length_ = a;
    this.byteOffset_ = 0;
    return;
  } else if (isTypedArray(a)) {
    if (!(a instanceof Float32x4Array)) {
      throw "Copying typed array of non-Float32x4Array is unimplemented.";
    }
    this.storage_ = new Float32Array(a.length * 4);
    this.length_ = a.length;
    this.byteOffset_ = 0;
    // Copy floats.
    for (var i = 0; i < a.length*4; i++) {
      this.storage_[i] = a.storage_[i];
    }
  } else if (isArrayBuffer(a)) {
    if ((b != undefined) && (b % Float32x4Array.BYTES_PER_ELEMENT) != 0) {
      throw "byteOffset must be a multiple of 16.";
    }
    if (c != undefined) {
      c *= 4;
      this.storage_ = new Float32Array(a, b, c);
    }
    else {
      // Note: new Float32Array(a, b) is NOT equivalent to new Float32Array(a, b, undefined)
      this.storage_ = new Float32Array(a, b);
    }
    this.length_ = this.storage_.length / 4;
    this.byteOffset_ = b != undefined ? b : 0;
  } else {
    throw "Unknown type of first argument.";
  }
}

Object.defineProperty(Float32x4Array.prototype, 'length', {
  get: function() { return this.length_; }
});

Object.defineProperty(Float32x4Array.prototype, 'byteLength', {
  get: function() { return this.length_ * Float32x4Array.BYTES_PER_ELEMENT; }
});

Object.defineProperty(Float32x4Array, 'BYTES_PER_ELEMENT', {
  get: function() { return 16; }
});

Object.defineProperty(Float32x4Array.prototype, 'BYTES_PER_ELEMENT', {
  get: function() { return 16; }
});

Object.defineProperty(Float32x4Array.prototype, 'byteOffset', {
  get: function() { return this.byteOffset_; }
});

Object.defineProperty(Float32x4Array.prototype, 'buffer', {
  get: function() { return this.storage_.buffer; }
});

Float32x4Array.prototype.getAt = function(i) {
  if (i < 0) {
    throw "Index must be >= 0.";
  }
  if (i >= this.length) {
    throw "Index out of bounds.";
  }
  var x = this.storage_[i*4+0];
  var y = this.storage_[i*4+1];
  var z = this.storage_[i*4+2];
  var w = this.storage_[i*4+3];
  return SIMD.float32x4(x, y, z, w);
}

Float32x4Array.prototype.setAt = function(i, v) {
  if (i < 0) {
    throw "Index must be >= 0.";
  }
  if (i >= this.length) {
    throw "Index out of bounds.";
  }
  if (!(v instanceof SIMD.float32x4)) {
    throw "Value is not a float32x4.";
  }
  this.storage_[i*4+0] = v.x;
  this.storage_[i*4+1] = v.y;
  this.storage_[i*4+2] = v.z;
  this.storage_[i*4+3] = v.w;
}


function Int32x4Array(a, b, c) {

  function isNumber(o) {
      return typeof o == "number" || (typeof o == "object" && o.constructor === Number);
  }

  function isTypedArray(o) {
    return (o instanceof Int8Array) ||
           (o instanceof Uint8Array) ||
           (o instanceof Uint8ClampedArray) ||
           (o instanceof Int16Array) ||
           (o instanceof Uint16Array) ||
           (o instanceof Int32Array) ||
           (o instanceof Uint32Array) ||
           (o instanceof Float32Array) ||
           (o instanceof Float64Array) ||
           (o instanceof Int32x4Array) ||
           (o instanceof Float32x4Array);
  }

  function isArrayBuffer(o) {
    return (o instanceof ArrayBuffer);
  }

  if (isNumber(a)) {
    this.storage_ = new Int32Array(a*4);
    this.length_ = a;
    this.byteOffset_ = 0;
    return;
  } else if (isTypedArray(a)) {
    if (!(a instanceof Int32x4Array)) {
      throw "Copying typed array of non-Int32x4Array is unimplemented.";
    }
    this.storage_ = new Int32Array(a.length * 4);
    this.length_ = a.length;
    this.byteOffset_ = 0;
    // Copy ints.
    for (var i = 0; i < a.length*4; i++) {
      this.storage_[i] = a.storage_[i];
    }
  } else if (isArrayBuffer(a)) {
    if ((b != undefined) && (b % Int32x4Array.BYTES_PER_ELEMENT) != 0) {
      throw "byteOffset must be a multiple of 16.";
    }
    if (c != undefined) {
      c *= 4;
      this.storage_ = new Int32Array(a, b, c);
    }
    else {
      // Note: new Int32Array(a, b) is NOT equivalent to new Int32Array(a, b, undefined)
      this.storage_ = new Int32Array(a, b);
    }
    this.length_ = this.storage_.length / 4;
    this.byteOffset_ = b != undefined ? b : 0;
  } else {
    throw "Unknown type of first argument.";
  }
}

Object.defineProperty(Int32x4Array.prototype, 'length', {
  get: function() { return this.length_; }
});

Object.defineProperty(Int32x4Array.prototype, 'byteLength', {
  get: function() { return this.length_ * Int32x4Array.BYTES_PER_ELEMENT; }
});

Object.defineProperty(Int32x4Array, 'BYTES_PER_ELEMENT', {
  get: function() { return 16; }
});

Object.defineProperty(Int32x4Array.prototype, 'BYTES_PER_ELEMENT', {
  get: function() { return 16; }
});

Object.defineProperty(Int32x4Array.prototype, 'byteOffset', {
  get: function() { return this.byteOffset_; }
});

Object.defineProperty(Int32x4Array.prototype, 'buffer', {
  get: function() { return this.storage_.buffer; }
});

Int32x4Array.prototype.getAt = function(i) {
  if (i < 0) {
    throw "Index must be >= 0.";
  }
  if (i >= this.length) {
    throw "Index out of bounds.";
  }
  var x = this.storage_[i*4+0];
  var y = this.storage_[i*4+1];
  var z = this.storage_[i*4+2];
  var w = this.storage_[i*4+3];
  return SIMD.int32x4(x, y, z, w);
}

Int32x4Array.prototype.setAt = function(i, v) {
  if (i < 0) {
    throw "Index must be >= 0.";
  }
  if (i >= this.length) {
    throw "Index out of bounds.";
  }
  if (!(v instanceof SIMD.int32x4)) {
    throw "Value is not a int32x4.";
  }
  this.storage_[i*4+0] = v.x;
  this.storage_[i*4+1] = v.y;
  this.storage_[i*4+2] = v.z;
  this.storage_[i*4+3] = v.w;
}

function isDataView(v) {
  return v instanceof DataView;
}

DataView.prototype.getFloat32x4 = function(byteOffset, littleEndian) {
  if (!isDataView(this))
    throw new TypeError("This is not a DataView.");
  if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
    throw new RangeError("The value of byteOffset is invalid.");
  if (typeof littleEndian == 'undefined')
    littleEndian = false;
  return SIMD.float32x4(this.getFloat32(byteOffset, littleEndian),
                        this.getFloat32(byteOffset + 4, littleEndian),
                        this.getFloat32(byteOffset + 8, littleEndian),
                        this.getFloat32(byteOffset + 12, littleEndian));
}

DataView.prototype.getFloat64x2 = function(byteOffset, littleEndian) {
  if (!isDataView(this))
    throw new TypeError("This is not a DataView.");
  if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
    throw new RangeError("The value of byteOffset is invalid.");
  if (typeof littleEndian == 'undefined')
    littleEndian = false;
  return SIMD.float64x2(this.getFloat64(byteOffset, littleEndian),
                        this.getFloat64(byteOffset + 8, littleEndian));
}

DataView.prototype.getInt32x4 = function(byteOffset, littleEndian) {
  if (!isDataView(this))
    throw new TypeError("This is not a DataView.");
  if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
    throw new RangeError("The value of byteOffset is invalid.");
  if (typeof littleEndian == 'undefined')
    littleEndian = false;
  return SIMD.int32x4(this.getInt32(byteOffset, littleEndian),
                      this.getInt32(byteOffset + 4, littleEndian),
                      this.getInt32(byteOffset + 8, littleEndian),
                      this.getInt32(byteOffset + 12, littleEndian));
}

DataView.prototype.setFloat32x4 = function(byteOffset, value, littleEndian) {
  if (!isDataView(this))
    throw new TypeError("This is not a DataView.");
  if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
    throw new RangeError("The value of byteOffset is invalid.");
  checkFloat32x4(value);
  if (typeof littleEndian == 'undefined')
    littleEndian = false;
  this.setFloat32(byteOffset, value.x, littleEndian);
  this.setFloat32(byteOffset + 4, value.y, littleEndian);
  this.setFloat32(byteOffset + 8, value.z, littleEndian);
  this.setFloat32(byteOffset + 12, value.w, littleEndian);
}

DataView.prototype.setFloat64x2 = function(byteOffset, value, littleEndian) {
  if (!isDataView(this))
    throw new TypeError("This is not a DataView.");
  if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
    throw new RangeError("The value of byteOffset is invalid.");
  checkFloat64x2(value);
  if (typeof littleEndian == 'undefined')
    littleEndian = false;
  this.setFloat64(byteOffset, value.x, littleEndian);
  this.setFloat64(byteOffset + 8, value.y, littleEndian);
}

DataView.prototype.setInt32x4 = function(byteOffset, value, littleEndian) {
  if (!isDataView(this))
    throw new TypeError("This is not a DataView.");
  if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
    throw new RangeError("The value of byteOffset is invalid.");
  checkInt32x4(value);
  if (typeof littleEndian == 'undefined')
    littleEndian = false;
  this.setInt32(byteOffset, value.x, littleEndian);
  this.setInt32(byteOffset + 4, value.y, littleEndian);
  this.setInt32(byteOffset + 8, value.z, littleEndian);
  this.setInt32(byteOffset + 12, value.w, littleEndian);
}

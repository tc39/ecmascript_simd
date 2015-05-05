/*
  vim: set ts=8 sts=2 et sw=2 tw=79:
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

// A conforming SIMD.js implementation may contain the following deviations to
// normal JS numeric behavior:
//  - Subnormal numbers may or may not be flushed to zero on input or output of
//    any SIMD operation.

// Many of the operations in SIMD.js have semantics which correspond to scalar
// operations in JS, however there are a few differences:
//  - The conversion of integers to booleans uses <0 rather than !=0.
//  - Vector shifts don't mask the shift count.
//  - Conversions from float to int32 throw on error.
//  - Load and store operations throw when out of bounds.

(function(global) {

if (typeof global.SIMD === "undefined") {
  // SIMD module. We don't use the var keyword here, so that we put the
  // SIMD object in the global scope even if this polyfill code is included
  // within some other scope. The theory is that we're anticipating a
  // future where SIMD is predefined in the global scope.
  global.SIMD = {};
}

if (typeof module !== "undefined") {
  // For CommonJS modules
  module.exports = global.SIMD;
}

var SIMD = global.SIMD;

// private stuff.
// Temporary buffers for swizzles and bitcasts.
var _f32x4 = new Float32Array(4);
var _f64x2 = new Float64Array(_f32x4.buffer);
var _i32x4 = new Int32Array(_f32x4.buffer);
var _i16x8 = new Int16Array(_f32x4.buffer);
var _i8x16 = new Int8Array(_f32x4.buffer);

var _f32;
var truncatef32;
if (typeof Math.fround !== 'undefined') {
  truncatef32 = Math.fround;
} else {
  _f32 = new Float32Array(1);

  truncatef32 = function(x) {
    _f32[0] = x;
    return _f32[0];
  }
}

// Type checking functions.

function isInt32(o) {
  return (o | 0) === o;
}

function isNumber(o) {
  return typeof o === "number" ||
      (typeof o === "object" && o.constructor === Number);
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
         (o instanceof Float64Array);
}

function isArrayBuffer(o) {
  return (o instanceof ArrayBuffer);
}

function minNum(x, y) {
  return x != x ? y :
         y != y ? x :
         Math.min(x, y);
}

function maxNum(x, y) {
  return x != x ? y :
         y != y ? x :
         Math.max(x, y);
}

function toBool(x) {
  return x < 0;
}

function fromBool(x) {
  return !x - 1;
}

function int32FromFloat(x) {
  if (x > -2147483649.0 && x < 2147483648.0)
    return x|0;
  throw new RangeError("Conversion from floating-point to integer failed");
}

function checkLaneIndex(numLanes) {
  return function(lane) {
    if (!isInt32(lane))
      throw new TypeError('lane index must be an int32');
    if (lane < 0 || lane >= numLanes)
      throw new RangeError('lane index must be in bounds');
  }
}

// Save/Restore utilities for implementing bitwise conversions.

function saveFloat64x2(x) {
  x = SIMD.float64x2.check(x);
  _f64x2[0] = SIMD.float64x2.extractLane(x, 0);
  _f64x2[1] = SIMD.float64x2.extractLane(x, 1);
}

function saveFloat32x4(x) {
  x = SIMD.float32x4.check(x);
  _f32x4[0] = SIMD.float32x4.extractLane(x, 0);
  _f32x4[1] = SIMD.float32x4.extractLane(x, 1);
  _f32x4[2] = SIMD.float32x4.extractLane(x, 2);
  _f32x4[3] = SIMD.float32x4.extractLane(x, 3);
}

function saveInt32x4(x) {
  x = SIMD.int32x4.check(x);
  _i32x4[0] = SIMD.int32x4.extractLane(x, 0);
  _i32x4[1] = SIMD.int32x4.extractLane(x, 1);
  _i32x4[2] = SIMD.int32x4.extractLane(x, 2);
  _i32x4[3] = SIMD.int32x4.extractLane(x, 3);
}

function saveInt16x8(x) {
  x = SIMD.int16x8.check(x);
  _i16x8[0] = SIMD.int16x8.extractLane(x, 0);
  _i16x8[1] = SIMD.int16x8.extractLane(x, 1);
  _i16x8[2] = SIMD.int16x8.extractLane(x, 2);
  _i16x8[3] = SIMD.int16x8.extractLane(x, 3);
  _i16x8[4] = SIMD.int16x8.extractLane(x, 4);
  _i16x8[5] = SIMD.int16x8.extractLane(x, 5);
  _i16x8[6] = SIMD.int16x8.extractLane(x, 6);
  _i16x8[7] = SIMD.int16x8.extractLane(x, 7);
}

function saveInt8x16(x) {
  x = SIMD.int8x16.check(x);
  _i8x16[0] = SIMD.int8x16.extractLane(x, 0);
  _i8x16[1] = SIMD.int8x16.extractLane(x, 1);
  _i8x16[2] = SIMD.int8x16.extractLane(x, 2);
  _i8x16[3] = SIMD.int8x16.extractLane(x, 3);
  _i8x16[4] = SIMD.int8x16.extractLane(x, 4);
  _i8x16[5] = SIMD.int8x16.extractLane(x, 5);
  _i8x16[6] = SIMD.int8x16.extractLane(x, 6);
  _i8x16[7] = SIMD.int8x16.extractLane(x, 7);
  _i8x16[8] = SIMD.int8x16.extractLane(x, 8);
  _i8x16[9] = SIMD.int8x16.extractLane(x, 9);
  _i8x16[10] = SIMD.int8x16.extractLane(x, 10);
  _i8x16[11] = SIMD.int8x16.extractLane(x, 11);
  _i8x16[12] = SIMD.int8x16.extractLane(x, 12);
  _i8x16[13] = SIMD.int8x16.extractLane(x, 13);
  _i8x16[14] = SIMD.int8x16.extractLane(x, 14);
  _i8x16[15] = SIMD.int8x16.extractLane(x, 15);
}

function restoreFloat64x2() {
  var alias = _f64x2;
  return SIMD.float64x2(alias[0], alias[1]);
}

function restoreFloat32x4() {
  var alias = _f32x4;
  return SIMD.float32x4(alias[0], alias[1], alias[2], alias[3]);
}

function restoreInt32x4() {
  var alias = _i32x4;
  return SIMD.int32x4(alias[0], alias[1], alias[2], alias[3]);
}

function restoreInt16x8() {
  var alias = _i16x8;
  return SIMD.int16x8(alias[0], alias[1], alias[2], alias[3],
                      alias[4], alias[5], alias[6], alias[7]);
}

function restoreInt8x16() {
  var alias = _i8x16;
  return SIMD.int8x16(alias[0], alias[1], alias[2], alias[3],
                      alias[4], alias[5], alias[6], alias[7],
                      alias[8], alias[9], alias[10], alias[11],
                      alias[12], alias[13], alias[14], alias[15]);
}

if (typeof SIMD.float32x4 === "undefined") {
  /**
    * Construct a new instance of float32x4 number.
    * @param {double} value used for x lane.
    * @param {double} value used for y lane.
    * @param {double} value used for z lane.
    * @param {double} value used for w lane.
    * @constructor
    */
  SIMD.float32x4 = function(x, y, z, w) {
    if (!(this instanceof SIMD.float32x4)) {
      return new SIMD.float32x4(x, y, z, w);
    }

    this.x_ = truncatef32(x);
    this.y_ = truncatef32(y);
    this.z_ = truncatef32(z);
    this.w_ = truncatef32(w);
  }
}

if (typeof SIMD.float32x4.extractLane === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {integer} i Index in concatenation of t for lane i
    * @return {double} The value in lane i of t.
    */
  SIMD.float32x4.extractLane = function(t, i) {
    t = SIMD.float32x4.check(t);
    var check = checkLaneIndex(4);
    check(i);
    switch(i) {
      case 0: return t.x_;
      case 1: return t.y_;
      case 2: return t.z_;
      case 3: return t.w_;
    }
  }
}

if (typeof SIMD.float32x4.replaceLane === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {integer} i Index in concatenation of t for lane i
    * @param {double} value used for lane i.
    * @return {float32x4} New instance of float32x4 with the values in t and
    * lane i replaced with {v}.
    */
  SIMD.float32x4.replaceLane = function(t, i, v) {
    t = SIMD.float32x4.check(t);
    var check = checkLaneIndex(4);
    check(i);
    saveFloat32x4(t);
    _f32x4[i] = v;
    return restoreFloat32x4();
  }
}

if (typeof SIMD.float32x4.check === "undefined") {
  /**
    * Check whether the argument is a float32x4.
    * @param {float32x4} v An instance of float32x4.
    * @return {float32x4} The float32x4 instance.
    */
  SIMD.float32x4.check = function(v) {
    if (!(v instanceof SIMD.float32x4)) {
      throw new TypeError("argument is not a float32x4.");
    }
    return v;
  }
}

if (typeof SIMD.float32x4.splat === "undefined") {
  /**
    * Construct a new instance of float32x4 number with the same value
    * in all lanes.
    * @param {double} value used for all lanes.
    * @constructor
    */
  SIMD.float32x4.splat = function(s) {
    return SIMD.float32x4(s, s, s, s);
  }
}

if (typeof SIMD.float32x4.fromFloat64x2 === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @return {float32x4} A float32x4 with .x and .y from t
    */
  SIMD.float32x4.fromFloat64x2 = function(t) {
    t = SIMD.float64x2.check(t);
    return SIMD.float32x4(SIMD.float64x2.extractLane(t, 0),
                          SIMD.float64x2.extractLane(t, 1), 0, 0);
  }
}

if (typeof SIMD.float32x4.fromInt32x4 === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @return {float32x4} An integer to float conversion copy of t.
    */
  SIMD.float32x4.fromInt32x4 = function(t) {
    t = SIMD.int32x4.check(t);
    return SIMD.float32x4(SIMD.int32x4.extractLane(t, 0),
                          SIMD.int32x4.extractLane(t, 1),
                          SIMD.int32x4.extractLane(t, 2),
                          SIMD.int32x4.extractLane(t, 3));
  }
}

if (typeof SIMD.float32x4.fromFloat64x2Bits === "undefined") {
  /**
   * @param {float64x2} t An instance of float64x2.
   * @return {float32x4} a bit-wise copy of t as a float32x4.
   */
  SIMD.float32x4.fromFloat64x2Bits = function(t) {
    saveFloat64x2(t);
    return restoreFloat32x4();
  }
}

if (typeof SIMD.float32x4.fromInt32x4Bits === "undefined") {
  /**
   * @param {int32x4} t An instance of int32x4.
   * @return {float32x4} a bit-wise copy of t as a float32x4.
   */
  SIMD.float32x4.fromInt32x4Bits = function(t) {
    saveInt32x4(t);
    return restoreFloat32x4();
  }
}

if (typeof SIMD.float32x4.fromInt16x8Bits === "undefined") {
  /**
   * @param {int16x8} t An instance of int16x8.
   * @return {float32x4} a bit-wise copy of t as a float32x4.
   */
  SIMD.float32x4.fromInt16x8Bits = function(t) {
    saveInt16x8(t);
    return restoreFloat32x4();
  }
}

if (typeof SIMD.float32x4.fromInt8x16Bits === "undefined") {
  /**
   * @param {int8x16} t An instance of int8x16.
   * @return {float32x4} a bit-wise copy of t as a float32x4.
   */
  SIMD.float32x4.fromInt8x16Bits = function(t) {
    saveInt8x16(t);
    return restoreFloat32x4();
  }
}

if (typeof SIMD.float64x2 === "undefined") {
  /**
    * Construct a new instance of float64x2 number.
    * @param {double} value used for x lane.
    * @param {double} value used for y lane.
    * @constructor
    */
  SIMD.float64x2 = function(x, y) {
    if (!(this instanceof SIMD.float64x2)) {
      return new SIMD.float64x2(x, y);
    }

    // Use unary + to force coercion to Number.
    this.x_ = +x;
    this.y_ = +y;
  }
}

if (typeof SIMD.float64x2.extractLane === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {integer} i Index in concatenation of t for lane i
    * @return {double} The value in lane i of t.
    */
  SIMD.float64x2.extractLane = function(t, i) {
    t = SIMD.float64x2.check(t);
    var check = checkLaneIndex(2);
    check(i);
    switch(i) {
      case 0: return t.x_;
      case 1: return t.y_;
    }
  }
}

if (typeof SIMD.float64x2.replaceLane === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {integer} i Index in concatenation of t for lane i
    * @param {double} value used for lane i.
    * @return {float64x2} New instance of float64x2 with the values in t and
    * lane i replaced with {v}.
    */
  SIMD.float64x2.replaceLane = function(t, i, v) {
    t = SIMD.float64x2.check(t);
    var check = checkLaneIndex(2);
    check(i);
    saveFloat64x2(t);
    _f64x2[i] = v;
    return restoreFloat64x2();
  }
}

if (typeof SIMD.float64x2.check === "undefined") {
  /**
    * Check whether the argument is a float64x2.
    * @param {float64x2} v An instance of float64x2.
    * @return {float64x2} The float64x2 instance.
    */
  SIMD.float64x2.check = function(v) {
    if (!(v instanceof SIMD.float64x2)) {
      throw new TypeError("argument is not a float64x2.");
    }
    return v;
  }
}

if (typeof SIMD.float64x2.splat === "undefined") {
  /**
    * Construct a new instance of float64x2 number with the same value
    * in all lanes.
    * @param {double} value used for all lanes.
    * @constructor
    */
  SIMD.float64x2.splat = function(s) {
    return SIMD.float64x2(s, s);
  }
}

if (typeof SIMD.float64x2.fromFloat32x4 === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {float64x2} A float64x2 with .x and .y from t
    */
  SIMD.float64x2.fromFloat32x4 = function(t) {
    t = SIMD.float32x4.check(t);
    return SIMD.float64x2(SIMD.float32x4.extractLane(t, 0),
                          SIMD.float32x4.extractLane(t, 1));
  }
}

if (typeof SIMD.float64x2.fromInt32x4 === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @return {float64x2} A float64x2 with .x and .y from t
    */
  SIMD.float64x2.fromInt32x4 = function(t) {
    t = SIMD.int32x4.check(t);
    return SIMD.float64x2(SIMD.int32x4.extractLane(t, 0),
                          SIMD.int32x4.extractLane(t, 1));
  }
}

if (typeof SIMD.float64x2.fromFloat32x4Bits === "undefined") {
  /**
   * @param {float32x4} t An instance of float32x4.
   * @return {float64x2} a bit-wise copy of t as a float64x2.
   */
  SIMD.float64x2.fromFloat32x4Bits = function(t) {
    saveFloat32x4(t);
    return restoreFloat64x2();
  }
}

if (typeof SIMD.float64x2.fromInt32x4Bits === "undefined") {
  /**
   * @param {int32x4} t An instance of int32x4.
   * @return {float64x2} a bit-wise copy of t as a float64x2.
   */
  SIMD.float64x2.fromInt32x4Bits = function(t) {
    saveInt32x4(t);
    return restoreFloat64x2();
  }
}

if (typeof SIMD.float64x2.fromInt16x8Bits === "undefined") {
  /**
   * @param {int16x8} t An instance of int16x8.
   * @return {float64x2} a bit-wise copy of t as a float64x2.
   */
  SIMD.float64x2.fromInt16x8Bits = function(t) {
    saveInt16x8(t);
    return restoreFloat64x2();
  }
}

if (typeof SIMD.float64x2.fromInt8x16Bits === "undefined") {
  /**
   * @param {int8x16} t An instance of int8x16.
   * @return {float64x2} a bit-wise copy of t as a float64x2.
   */
  SIMD.float64x2.fromInt8x16Bits = function(t) {
    saveInt8x16(t);
    return restoreFloat64x2();
  }
}

if (typeof SIMD.int32x4 === "undefined") {
  /**
    * Construct a new instance of int32x4 number.
    * @param {integer} 32-bit value used for x lane.
    * @param {integer} 32-bit value used for y lane.
    * @param {integer} 32-bit value used for z lane.
    * @param {integer} 32-bit value used for w lane.
    * @constructor
    */
  SIMD.int32x4 = function(x, y, z, w) {
    if (!(this instanceof SIMD.int32x4)) {
      return new SIMD.int32x4(x, y, z, w);
    }

    this.x_ = x|0;
    this.y_ = y|0;
    this.z_ = z|0;
    this.w_ = w|0;
  }

  Object.defineProperty(SIMD.int32x4.prototype, 'flagX', {
    get: function() { return toBool(this.x_); }
  });

  Object.defineProperty(SIMD.int32x4.prototype, 'flagY', {
    get: function() { return toBool(this.y_); }
  });

  Object.defineProperty(SIMD.int32x4.prototype, 'flagZ', {
    get: function() { return toBool(this.z_); }
  });

  Object.defineProperty(SIMD.int32x4.prototype, 'flagW', {
    get: function() { return toBool(this.w_); }
  });
}

if (typeof SIMD.int32x4.extractLane === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @param {integer} i Index in concatenation of t for lane i
    * @return {integer} The value in lane i of t.
    */
  SIMD.int32x4.extractLane = function(t, i) {
    t = SIMD.int32x4.check(t);
    var check = checkLaneIndex(4);
    check(i);
    switch(i) {
      case 0: return t.x_;
      case 1: return t.y_;
      case 2: return t.z_;
      case 3: return t.w_;
    }
  }
}

if (typeof SIMD.int32x4.replaceLane === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @param {integer} i Index in concatenation of t for lane i
    * @param {integer} value used for lane i.
    * @return {int32x4} New instance of int32x4 with the values in t and
    * lane i replaced with {v}.
    */
  SIMD.int32x4.replaceLane = function(t, i, v) {
    t = SIMD.int32x4.check(t);
    var check = checkLaneIndex(4);
    check(i);
    saveInt32x4(t);
    _i32x4[i] = v;
    return restoreInt32x4();
  }
}

if (typeof SIMD.int32x4.allTrue === "undefined") {
  /**
    * Check if all 4 lanes hold a true value (bit 31 == 1)
    * @param {int32x4} v An instance of int32x4.
    * @return {Boolean} All 4 lanes holds a true value
    */
  SIMD.int32x4.allTrue = function(v) {
    if (!(v instanceof SIMD.int32x4)) {
      throw new TypeError("argument is not a int32x4.");
    }
    return toBool(SIMD.int32x4.extractLane(v, 0)) &&
        toBool(SIMD.int32x4.extractLane(v, 1)) &&
        toBool(SIMD.int32x4.extractLane(v, 2)) &&
        toBool(SIMD.int32x4.extractLane(v, 3));
  }
}

if (typeof SIMD.int32x4.anyTrue === "undefined") {
  /**
    * Check if any of the 4 lanes hold a true value (bit 31 == 1)
    * @param {int32x4} v An instance of int32x4.
    * @return {Boolean} Any of the 4 lanes holds a true value
    */
  SIMD.int32x4.anyTrue = function(v) {
    if (!(v instanceof SIMD.int32x4)) {
      throw new TypeError("argument is not a int32x4.");
    }
    return toBool(SIMD.int32x4.extractLane(v, 0)) ||
        toBool(SIMD.int32x4.extractLane(v, 1)) ||
        toBool(SIMD.int32x4.extractLane(v, 2)) ||
        toBool(SIMD.int32x4.extractLane(v, 3));
  }
}

if (typeof SIMD.int32x4.check === "undefined") {
  /**
    * Check whether the argument is a int32x4.
    * @param {int32x4} v An instance of int32x4.
    * @return {int32x4} The int32x4 instance.
    */
  SIMD.int32x4.check = function(v) {
    if (!(v instanceof SIMD.int32x4)) {
      throw new TypeError("argument is not a int32x4.");
    }
    return v;
  }
}

if (typeof SIMD.int32x4.bool === "undefined") {
  /**
    * Construct a new instance of int32x4 number with either true or false in
    * each lane, depending on the truth values in x, y, z, and w.
    * @param {boolean} flag used for x lane.
    * @param {boolean} flag used for y lane.
    * @param {boolean} flag used for z lane.
    * @param {boolean} flag used for w lane.
    * @constructor
    */
  SIMD.int32x4.bool = function(x, y, z, w) {
    return SIMD.int32x4(fromBool(x),
                        fromBool(y),
                        fromBool(z),
                        fromBool(w));
  }
}

if (typeof SIMD.int32x4.splat === "undefined") {
  /**
    * Construct a new instance of int32x4 number with the same value
    * in all lanes.
    * @param {integer} value used for all lanes.
    * @constructor
    */
  SIMD.int32x4.splat = function(s) {
    return SIMD.int32x4(s, s, s, s);
  }
}

if (typeof SIMD.int32x4.fromFloat32x4 === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {int32x4} with a integer to float conversion of t.
    */
  SIMD.int32x4.fromFloat32x4 = function(t) {
    t = SIMD.float32x4.check(t);
    return SIMD.int32x4(int32FromFloat(SIMD.float32x4.extractLane(t, 0)),
                        int32FromFloat(SIMD.float32x4.extractLane(t, 1)),
                        int32FromFloat(SIMD.float32x4.extractLane(t, 2)),
                        int32FromFloat(SIMD.float32x4.extractLane(t, 3)));
  }
}

if (typeof SIMD.int32x4.fromFloat64x2 === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @return {int32x4}  An int32x4 with .x and .y from t
    */
  SIMD.int32x4.fromFloat64x2 = function(t) {
    t = SIMD.float64x2.check(t);
    return SIMD.int32x4(int32FromFloat(SIMD.float64x2.extractLane(t, 0)),
                        int32FromFloat(SIMD.float64x2.extractLane(t, 1)),
                        0,
                        0);
  }
}

if (typeof SIMD.int32x4.fromFloat32x4Bits === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {int32x4} a bit-wise copy of t as a int32x4.
    */
  SIMD.int32x4.fromFloat32x4Bits = function(t) {
    saveFloat32x4(t);
    return restoreInt32x4();
  }
}

if (typeof SIMD.int32x4.fromFloat64x2Bits === "undefined") {
  /**
   * @param {float64x2} t An instance of float64x2.
   * @return {int32x4} a bit-wise copy of t as an int32x4.
   */
  SIMD.int32x4.fromFloat64x2Bits = function(t) {
    saveFloat64x2(t);
    return restoreInt32x4();
  }
}

if (typeof SIMD.int32x4.fromInt16x8Bits === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @return {int32x4} a bit-wise copy of t as a int32x4.
    */
  SIMD.int32x4.fromInt16x8Bits = function(t) {
    saveInt16x8(t);
    return restoreInt32x4();
  }
}

if (typeof SIMD.int32x4.fromInt8x16Bits === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @return {int32x4} a bit-wise copy of t as a int32x4.
    */
  SIMD.int32x4.fromInt8x16Bits = function(t) {
    saveInt8x16(t);
    return restoreInt32x4();
  }
}

if (typeof SIMD.int16x8 === "undefined") {
  /**
    * Construct a new instance of int16x8 number.
    * @param {integer} 16-bit value used for s0 lane.
    * @param {integer} 16-bit value used for s1 lane.
    * @param {integer} 16-bit value used for s2 lane.
    * @param {integer} 16-bit value used for s3 lane.
    * @param {integer} 16-bit value used for s4 lane.
    * @param {integer} 16-bit value used for s5 lane.
    * @param {integer} 16-bit value used for s6 lane.
    * @param {integer} 16-bit value used for s7 lane.
    * @constructor
    */
  SIMD.int16x8 = function(s0, s1, s2, s3, s4, s5, s6, s7) {
    if (!(this instanceof SIMD.int16x8)) {
      return new SIMD.int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
    }

    this.s0_ = s0 << 16 >> 16;
    this.s1_ = s1 << 16 >> 16;
    this.s2_ = s2 << 16 >> 16;
    this.s3_ = s3 << 16 >> 16;
    this.s4_ = s4 << 16 >> 16;
    this.s5_ = s5 << 16 >> 16;
    this.s6_ = s6 << 16 >> 16;
    this.s7_ = s7 << 16 >> 16;
  }
}

if (typeof SIMD.int16x8.extractLane === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @param {integer} i Index in concatenation of t for lane i
    * @return {integer} The value in lane i of t.
    */
  SIMD.int16x8.extractLane = function(t, i) {
    t = SIMD.int16x8.check(t);
    var check = checkLaneIndex(8);
    check(i);
    switch(i) {
      case 0: return t.s0_;
      case 1: return t.s1_;
      case 2: return t.s2_;
      case 3: return t.s3_;
      case 4: return t.s4_;
      case 5: return t.s5_;
      case 6: return t.s6_;
      case 7: return t.s7_;
    }
  }
}

if (typeof SIMD.int16x8.replaceLane === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @param {integer} i Index in concatenation of t for lane i
    * @param {integer} value used for lane i.
    * @return {int16x8} New instance of int16x8 with the values in t and
    * lane i replaced with {v}.
    */
  SIMD.int16x8.replaceLane = function(t, i, v) {
    t = SIMD.int16x8.check(t);
    var check = checkLaneIndex(8);
    check(i);
    saveInt16x8(t);
    _i16x8[i] = v;
    return restoreInt16x8();
  }
}

if (typeof SIMD.int16x8.allTrue === "undefined") {
  /**
    * Check if all 8 lanes hold a true value (bit 15 == 1)
    * @param {int16x8} v An instance of int16x8.
    * @return {Boolean} All 8 lanes holds a true value
    */
  SIMD.int16x8.allTrue = function(v) {
    if (!(v instanceof SIMD.int16x8)) {
      throw new TypeError("argument is not a int16x8.");
    }
    return toBool(SIMD.int16x8.extractLane(v, 0)) &&
           toBool(SIMD.int16x8.extractLane(v, 1)) &&
           toBool(SIMD.int16x8.extractLane(v, 2)) &&
           toBool(SIMD.int16x8.extractLane(v, 3)) &&
           toBool(SIMD.int16x8.extractLane(v, 4)) &&
           toBool(SIMD.int16x8.extractLane(v, 5)) &&
           toBool(SIMD.int16x8.extractLane(v, 6)) &&
           toBool(SIMD.int16x8.extractLane(v, 7));
  }
}

if (typeof SIMD.int16x8.anyTrue === "undefined") {
  /**
    * Check if any of the 8 lanes hold a true value (bit 15 == 1)
    * @param {int16x8} v An instance of int16x8.
    * @return {Boolean} Any of the 8 lanes holds a true value
    */
  SIMD.int16x8.anyTrue = function(v) {
    if (!(v instanceof SIMD.int16x8)) {
      throw new TypeError("argument is not a int16x8.");
    }
    return toBool(SIMD.int16x8.extractLane(v, 0)) ||
           toBool(SIMD.int16x8.extractLane(v, 1)) ||
           toBool(SIMD.int16x8.extractLane(v, 2)) ||
           toBool(SIMD.int16x8.extractLane(v, 3)) ||
           toBool(SIMD.int16x8.extractLane(v, 4)) ||
           toBool(SIMD.int16x8.extractLane(v, 5)) ||
           toBool(SIMD.int16x8.extractLane(v, 6)) ||
           toBool(SIMD.int16x8.extractLane(v, 7));
  }
}

if (typeof SIMD.int16x8.check === "undefined") {
  /**
    * Check whether the argument is a int16x8.
    * @param {int16x8} v An instance of int16x8.
    * @return {int16x8} The int16x8 instance.
    */
  SIMD.int16x8.check = function(v) {
    if (!(v instanceof SIMD.int16x8)) {
      throw new TypeError("argument is not a int16x8.");
    }
    return v;
  }
}

if (typeof SIMD.int16x8.bool === "undefined") {
  /**
    * Construct a new instance of int16x8 number with true or false in each
    * lane, depending on the truth value in s0, s1, s2, s3, s4, s5, s6, and s7.
    * @param {boolean} flag used for s0 lane.
    * @param {boolean} flag used for s1 lane.
    * @param {boolean} flag used for s2 lane.
    * @param {boolean} flag used for s3 lane.
    * @param {boolean} flag used for s4 lane.
    * @param {boolean} flag used for s5 lane.
    * @param {boolean} flag used for s6 lane.
    * @param {boolean} flag used for s7 lane.
    * @constructor
    */
  SIMD.int16x8.bool = function(s0, s1, s2, s3, s4, s5, s6, s7) {
    return SIMD.int16x8(s0 ? -1 : 0x0,
                        s1 ? -1 : 0x0,
                        s2 ? -1 : 0x0,
                        s3 ? -1 : 0x0,
                        s4 ? -1 : 0x0,
                        s5 ? -1 : 0x0,
                        s6 ? -1 : 0x0,
                        s7 ? -1 : 0x0);
  }
}

if (typeof SIMD.int16x8.splat === "undefined") {
  /**
    * Construct a new instance of int16x8 number with the same value
    * in all lanes.
    * @param {integer} value used for all lanes.
    * @constructor
    */
  SIMD.int16x8.splat = function(s) {
    return SIMD.int16x8(s, s, s, s, s, s, s, s);
  }
}

if (typeof SIMD.int16x8.fromFloat32x4Bits === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {int16x8} a bit-wise copy of t as a int16x8.
    */
  SIMD.int16x8.fromFloat32x4Bits = function(t) {
    saveFloat32x4(t);
    return restoreInt16x8();
  }
}

if (typeof SIMD.int16x8.fromFloat64x2Bits === "undefined") {
  /**
   * @param {float64x2} t An instance of float64x2.
   * @return {int16x8} a bit-wise copy of t as an int16x8.
   */
  SIMD.int16x8.fromFloat64x2Bits = function(t) {
    saveFloat64x2(t);
    return restoreInt16x8();
  }
}

if (typeof SIMD.int16x8.fromInt32x4Bits === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @return {int16x8} a bit-wise copy of t as a int16x8.
    */
  SIMD.int16x8.fromInt32x4Bits = function(t) {
    saveInt32x4(t);
    return restoreInt16x8();
  }
}

if (typeof SIMD.int16x8.fromInt8x16Bits === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @return {int16x8} a bit-wise copy of t as a int16x8.
    */
  SIMD.int16x8.fromInt8x16Bits = function(t) {
    saveInt8x16(t);
    return restoreInt16x8();
  }
}

if (typeof SIMD.int8x16 === "undefined") {
  /**
    * Construct a new instance of int8x16 number.
    * @param {integer} 8-bit value used for s0 lane.
    * @param {integer} 8-bit value used for s1 lane.
    * @param {integer} 8-bit value used for s2 lane.
    * @param {integer} 8-bit value used for s3 lane.
    * @param {integer} 8-bit value used for s4 lane.
    * @param {integer} 8-bit value used for s5 lane.
    * @param {integer} 8-bit value used for s6 lane.
    * @param {integer} 8-bit value used for s7 lane.
    * @param {integer} 8-bit value used for s8 lane.
    * @param {integer} 8-bit value used for s9 lane.
    * @param {integer} 8-bit value used for s10 lane.
    * @param {integer} 8-bit value used for s11 lane.
    * @param {integer} 8-bit value used for s12 lane.
    * @param {integer} 8-bit value used for s13 lane.
    * @param {integer} 8-bit value used for s14 lane.
    * @param {integer} 8-bit value used for s15 lane.
    * @constructor
    */
  SIMD.int8x16 = function(s0, s1, s2, s3, s4, s5, s6, s7,
                          s8, s9, s10, s11, s12, s13, s14, s15) {
    if (!(this instanceof SIMD.int8x16)) {
      return new SIMD.int8x16(s0, s1, s2, s3, s4, s5, s6, s7,
                              s8, s9, s10, s11, s12, s13, s14, s15);
    }

    this.s0_ = s0 << 24 >> 24;
    this.s1_ = s1 << 24 >> 24;
    this.s2_ = s2 << 24 >> 24;
    this.s3_ = s3 << 24 >> 24;
    this.s4_ = s4 << 24 >> 24;
    this.s5_ = s5 << 24 >> 24;
    this.s6_ = s6 << 24 >> 24;
    this.s7_ = s7 << 24 >> 24;
    this.s8_ = s8 << 24 >> 24;
    this.s9_ = s9 << 24 >> 24;
    this.s10_ = s10 << 24 >> 24;
    this.s11_ = s11 << 24 >> 24;
    this.s12_ = s12 << 24 >> 24;
    this.s13_ = s13 << 24 >> 24;
    this.s14_ = s14 << 24 >> 24;
    this.s15_ = s15 << 24 >> 24;
  }
}

if (typeof SIMD.int8x16.extractLane === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @param {integer} i Index in concatenation of t for lane i
    * @return {integer} The value in lane i of t.
    */
  SIMD.int8x16.extractLane = function(t, i) {
    t = SIMD.int8x16.check(t);
    var check = checkLaneIndex(16);
    check(i);
    switch(i) {
      case 0: return t.s0_;
      case 1: return t.s1_;
      case 2: return t.s2_;
      case 3: return t.s3_;
      case 4: return t.s4_;
      case 5: return t.s5_;
      case 6: return t.s6_;
      case 7: return t.s7_;
      case 8: return t.s8_;
      case 9: return t.s9_;
      case 10: return t.s10_;
      case 11: return t.s11_;
      case 12: return t.s12_;
      case 13: return t.s13_;
      case 14: return t.s14_;
      case 15: return t.s15_;
    }
  }
}

if (typeof SIMD.int8x16.replaceLane === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @param {integer} i Index in concatenation of t for lane i
    * @param {integer} value used for lane i.
    * @return {int8x16} New instance of int8x16 with the values in t and
    * lane i replaced with {v}.
    */
  SIMD.int8x16.replaceLane = function(t, i, v) {
    t = SIMD.int8x16.check(t);
    var check = checkLaneIndex(16);
    check(i);
    saveInt8x16(t);
    _i8x16[i] = v;
    return restoreInt8x16();
  }
}

if (typeof SIMD.int8x16.allTrue === "undefined") {
  /**
    * Check if all 16 lanes hold a true value (bit 7 == 1)
    * @param {int8x16} v An instance of int8x16.
    * @return {Boolean} All 16 lanes holds a true value
    */
  SIMD.int8x16.allTrue = function(v) {
    if (!(v instanceof SIMD.int8x16)) {
      throw new TypeError("argument is not a int8x16.");
    }
    return toBool(SIMD.int8x16.extractLane(v, 0)) &&
           toBool(SIMD.int8x16.extractLane(v, 1)) &&
           toBool(SIMD.int8x16.extractLane(v, 2)) &&
           toBool(SIMD.int8x16.extractLane(v, 3)) &&
           toBool(SIMD.int8x16.extractLane(v, 4)) &&
           toBool(SIMD.int8x16.extractLane(v, 5)) &&
           toBool(SIMD.int8x16.extractLane(v, 6)) &&
           toBool(SIMD.int8x16.extractLane(v, 7)) &&
           toBool(SIMD.int8x16.extractLane(v, 8)) &&
           toBool(SIMD.int8x16.extractLane(v, 9)) &&
           toBool(SIMD.int8x16.extractLane(v, 10)) &&
           toBool(SIMD.int8x16.extractLane(v, 11)) &&
           toBool(SIMD.int8x16.extractLane(v, 12)) &&
           toBool(SIMD.int8x16.extractLane(v, 13)) &&
           toBool(SIMD.int8x16.extractLane(v, 14)) &&
           toBool(SIMD.int8x16.extractLane(v, 15));
  }
}

if (typeof SIMD.int8x16.anyTrue === "undefined") {
  /**
    * Check if any of the 16 lanes hold a true value (bit 7 == 1)
    * @param {int8x16} v An instance of int16x8.
    * @return {Boolean} Any of the 16 lanes holds a true value
    */
  SIMD.int8x16.anyTrue = function(v) {
    if (!(v instanceof SIMD.int8x16)) {
      throw new TypeError("argument is not a int8x16.");
    }
    return toBool(SIMD.int8x16.extractLane(v, 0)) ||
           toBool(SIMD.int8x16.extractLane(v, 1)) ||
           toBool(SIMD.int8x16.extractLane(v, 2)) ||
           toBool(SIMD.int8x16.extractLane(v, 3)) ||
           toBool(SIMD.int8x16.extractLane(v, 4)) ||
           toBool(SIMD.int8x16.extractLane(v, 5)) ||
           toBool(SIMD.int8x16.extractLane(v, 6)) ||
           toBool(SIMD.int8x16.extractLane(v, 7)) ||
           toBool(SIMD.int8x16.extractLane(v, 8)) ||
           toBool(SIMD.int8x16.extractLane(v, 9)) ||
           toBool(SIMD.int8x16.extractLane(v, 10)) ||
           toBool(SIMD.int8x16.extractLane(v, 11)) ||
           toBool(SIMD.int8x16.extractLane(v, 12)) ||
           toBool(SIMD.int8x16.extractLane(v, 13)) ||
           toBool(SIMD.int8x16.extractLane(v, 14)) ||
           toBool(SIMD.int8x16.extractLane(v, 15));
  }
}

if (typeof SIMD.int8x16.check === "undefined") {
  /**
    * Check whether the argument is a int8x16.
    * @param {int8x16} v An instance of int8x16.
    * @return {int8x16} The int8x16 instance.
    */
  SIMD.int8x16.check = function(v) {
    if (!(v instanceof SIMD.int8x16)) {
      throw new TypeError("argument is not a int8x16.");
    }
    return v;
  }
}

if (typeof SIMD.int8x16.bool === "undefined") {
  /**
    * Construct a new instance of int8x16 number with true or false in each
    * lane, depending on the truth value in s0, s1, s2, s3, s4, s5, s6, s7,
    * s8, s9, s10, s11, s12, s13, s14, and s15.
    * @param {boolean} flag used for s0 lane.
    * @param {boolean} flag used for s1 lane.
    * @param {boolean} flag used for s2 lane.
    * @param {boolean} flag used for s3 lane.
    * @param {boolean} flag used for s4 lane.
    * @param {boolean} flag used for s5 lane.
    * @param {boolean} flag used for s6 lane.
    * @param {boolean} flag used for s7 lane.
    * @param {boolean} flag used for s8 lane.
    * @param {boolean} flag used for s9 lane.
    * @param {boolean} flag used for s10 lane.
    * @param {boolean} flag used for s11 lane.
    * @param {boolean} flag used for s12 lane.
    * @param {boolean} flag used for s13 lane.
    * @param {boolean} flag used for s14 lane.
    * @param {boolean} flag used for s15 lane.
    * @constructor
    */
  SIMD.int8x16.bool = function(s0, s1, s2, s3, s4, s5, s6, s7,
                               s8, s9, s10, s11, s12, s13, s14, s15) {
    return SIMD.int8x16(s0 ? -1 : 0x0,
                        s1 ? -1 : 0x0,
                        s2 ? -1 : 0x0,
                        s3 ? -1 : 0x0,
                        s4 ? -1 : 0x0,
                        s5 ? -1 : 0x0,
                        s6 ? -1 : 0x0,
                        s7 ? -1 : 0x0,
                        s8 ? -1 : 0x0,
                        s9 ? -1 : 0x0,
                        s10 ? -1 : 0x0,
                        s11 ? -1 : 0x0,
                        s12 ? -1 : 0x0,
                        s13 ? -1 : 0x0,
                        s14 ? -1 : 0x0,
                        s15 ? -1 : 0x0);
  }
}

if (typeof SIMD.int8x16.splat === "undefined") {
  /**
    * Construct a new instance of int8x16 number with the same value
    * in all lanes.
    * @param {integer} value used for all lanes.
    * @constructor
    */
  SIMD.int8x16.splat = function(s) {
    return SIMD.int8x16(s, s, s, s, s, s, s, s,
                        s, s, s, s, s, s, s, s);
  }
}

if (typeof SIMD.int8x16.fromFloat32x4Bits === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {int8x16} a bit-wise copy of t as a int8x16.
    */
  SIMD.int8x16.fromFloat32x4Bits = function(t) {
    saveFloat32x4(t);
    return restoreInt8x16();
  }
}

if (typeof SIMD.int8x16.fromFloat64x2Bits === "undefined") {
  /**
   * @param {float64x2} t An instance of float64x2.
   * @return {int8x16} a bit-wise copy of t as an int8x16.
   */
  SIMD.int8x16.fromFloat64x2Bits = function(t) {
    saveFloat64x2(t);
    return restoreInt8x16();
  }
}

if (typeof SIMD.int8x16.fromInt32x4Bits === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @return {int8x16} a bit-wise copy of t as a int8x16.
    */
  SIMD.int8x16.fromInt32x4Bits = function(t) {
    saveInt32x4(t);
    return restoreInt8x16();
  }
}

if (typeof SIMD.int8x16.fromInt16x8Bits === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @return {int8x16} a bit-wise copy of t as a int8x16.
    */
  SIMD.int8x16.fromInt16x8Bits = function(t) {
    saveInt16x8(t);
    return restoreInt8x16();
  }
}

if (typeof SIMD.float32x4.abs === "undefined") {
  /**
   * @param {float32x4} t An instance of float32x4.
   * @return {float32x4} New instance of float32x4 with absolute values of
   * t.
   */
  SIMD.float32x4.abs = function(t) {
    t = SIMD.float32x4.check(t);
    return SIMD.float32x4(Math.abs(SIMD.float32x4.extractLane(t, 0)),
                          Math.abs(SIMD.float32x4.extractLane(t, 1)),
                          Math.abs(SIMD.float32x4.extractLane(t, 2)),
                          Math.abs(SIMD.float32x4.extractLane(t, 3)));
  }
}

if (typeof SIMD.float32x4.neg === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with negated values of
    * t.
    */
  SIMD.float32x4.neg = function(t) {
    t = SIMD.float32x4.check(t);
    return SIMD.float32x4(-SIMD.float32x4.extractLane(t, 0),
                          -SIMD.float32x4.extractLane(t, 1),
                          -SIMD.float32x4.extractLane(t, 2),
                          -SIMD.float32x4.extractLane(t, 3));
  }
}

if (typeof SIMD.float32x4.add === "undefined") {
  /**
    * @param {float32x4} a An instance of float32x4.
    * @param {float32x4} b An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with a + b.
    */
  SIMD.float32x4.add = function(a, b) {
    a = SIMD.float32x4.check(a);
    b = SIMD.float32x4.check(b);
    return SIMD.float32x4(
        SIMD.float32x4.extractLane(a, 0) + SIMD.float32x4.extractLane(b, 0),
        SIMD.float32x4.extractLane(a, 1) + SIMD.float32x4.extractLane(b, 1),
        SIMD.float32x4.extractLane(a, 2) + SIMD.float32x4.extractLane(b, 2),
        SIMD.float32x4.extractLane(a, 3) + SIMD.float32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.float32x4.sub === "undefined") {
  /**
    * @param {float32x4} a An instance of float32x4.
    * @param {float32x4} b An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with a - b.
    */
  SIMD.float32x4.sub = function(a, b) {
    a = SIMD.float32x4.check(a);
    b = SIMD.float32x4.check(b);
    return SIMD.float32x4(
        SIMD.float32x4.extractLane(a, 0) - SIMD.float32x4.extractLane(b, 0),
        SIMD.float32x4.extractLane(a, 1) - SIMD.float32x4.extractLane(b, 1),
        SIMD.float32x4.extractLane(a, 2) - SIMD.float32x4.extractLane(b, 2),
        SIMD.float32x4.extractLane(a, 3) - SIMD.float32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.float32x4.mul === "undefined") {
  /**
    * @param {float32x4} a An instance of float32x4.
    * @param {float32x4} b An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with a * b.
    */
  SIMD.float32x4.mul = function(a, b) {
    a = SIMD.float32x4.check(a);
    b = SIMD.float32x4.check(b);
    return SIMD.float32x4(
        SIMD.float32x4.extractLane(a, 0) * SIMD.float32x4.extractLane(b, 0),
        SIMD.float32x4.extractLane(a, 1) * SIMD.float32x4.extractLane(b, 1),
        SIMD.float32x4.extractLane(a, 2) * SIMD.float32x4.extractLane(b, 2),
        SIMD.float32x4.extractLane(a, 3) * SIMD.float32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.float32x4.div === "undefined") {
  /**
    * @param {float32x4} a An instance of float32x4.
    * @param {float32x4} b An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with a / b.
    */
  SIMD.float32x4.div = function(a, b) {
    a = SIMD.float32x4.check(a);
    b = SIMD.float32x4.check(b);
    return SIMD.float32x4(
        SIMD.float32x4.extractLane(a, 0) / SIMD.float32x4.extractLane(b, 0),
        SIMD.float32x4.extractLane(a, 1) / SIMD.float32x4.extractLane(b, 1),
        SIMD.float32x4.extractLane(a, 2) / SIMD.float32x4.extractLane(b, 2),
        SIMD.float32x4.extractLane(a, 3) / SIMD.float32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.float32x4.clamp === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} lowerLimit An instance of float32x4.
    * @param {float32x4} upperLimit An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with t's values clamped
    * between lowerLimit and upperLimit.
    */
  SIMD.float32x4.clamp = function(t, lowerLimit, upperLimit) {
    t = SIMD.float32x4.check(t);
    lowerLimit = SIMD.float32x4.check(lowerLimit);
    upperLimit = SIMD.float32x4.check(upperLimit);
    var cx = SIMD.float32x4.extractLane(t, 0) <
        SIMD.float32x4.extractLane(lowerLimit, 0) ?
            SIMD.float32x4.extractLane(lowerLimit, 0) :
                SIMD.float32x4.extractLane(t, 0);
    var cy = SIMD.float32x4.extractLane(t, 1) <
        SIMD.float32x4.extractLane(lowerLimit, 1) ?
            SIMD.float32x4.extractLane(lowerLimit, 1) :
                SIMD.float32x4.extractLane(t, 1);
    var cz = SIMD.float32x4.extractLane(t, 2) <
        SIMD.float32x4.extractLane(lowerLimit, 2) ?
            SIMD.float32x4.extractLane(lowerLimit, 2) :
                SIMD.float32x4.extractLane(t, 2);
    var cw = SIMD.float32x4.extractLane(t, 3) <
        SIMD.float32x4.extractLane(lowerLimit, 3) ?
            SIMD.float32x4.extractLane(lowerLimit, 3) :
                SIMD.float32x4.extractLane(t, 3);
    cx = cx > SIMD.float32x4.extractLane(upperLimit, 0) ?
        SIMD.float32x4.extractLane(upperLimit, 0) : cx;
    cy = cy > SIMD.float32x4.extractLane(upperLimit, 1) ?
        SIMD.float32x4.extractLane(upperLimit, 1) : cy;
    cz = cz > SIMD.float32x4.extractLane(upperLimit, 2) ?
        SIMD.float32x4.extractLane(upperLimit, 2) : cz;
    cw = cw > SIMD.float32x4.extractLane(upperLimit, 3) ?
        SIMD.float32x4.extractLane(upperLimit, 3) : cw;
    return SIMD.float32x4(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.min === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with the minimum value of
    * t and other.
    */
  SIMD.float32x4.min = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx = Math.min(SIMD.float32x4.extractLane(t, 0),
                      SIMD.float32x4.extractLane(other, 0));
    var cy = Math.min(SIMD.float32x4.extractLane(t, 1),
                      SIMD.float32x4.extractLane(other, 1));
    var cz = Math.min(SIMD.float32x4.extractLane(t, 2),
                      SIMD.float32x4.extractLane(other, 2));
    var cw = Math.min(SIMD.float32x4.extractLane(t, 3),
                      SIMD.float32x4.extractLane(other, 3));
    return SIMD.float32x4(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.max === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with the maximum value of
    * t and other.
    */
  SIMD.float32x4.max = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx = Math.max(SIMD.float32x4.extractLane(t, 0),
                      SIMD.float32x4.extractLane(other, 0));
    var cy = Math.max(SIMD.float32x4.extractLane(t, 1),
                      SIMD.float32x4.extractLane(other, 1));
    var cz = Math.max(SIMD.float32x4.extractLane(t, 2),
                      SIMD.float32x4.extractLane(other, 2));
    var cw = Math.max(SIMD.float32x4.extractLane(t, 3),
                      SIMD.float32x4.extractLane(other, 3));
    return SIMD.float32x4(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.minNum === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with the minimum value of
    * t and other, preferring numbers over NaNs.
    */
  SIMD.float32x4.minNum = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx = minNum(SIMD.float32x4.extractLane(t, 0),
                    SIMD.float32x4.extractLane(other, 0));
    var cy = minNum(SIMD.float32x4.extractLane(t, 1),
                    SIMD.float32x4.extractLane(other, 1));
    var cz = minNum(SIMD.float32x4.extractLane(t, 2),
                    SIMD.float32x4.extractLane(other, 2));
    var cw = minNum(SIMD.float32x4.extractLane(t, 3),
                    SIMD.float32x4.extractLane(other, 3));
    return SIMD.float32x4(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.maxNum === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with the maximum value of
    * t and other, preferring numbers over NaNs.
    */
  SIMD.float32x4.maxNum = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx = maxNum(SIMD.float32x4.extractLane(t, 0),
                    SIMD.float32x4.extractLane(other, 0));
    var cy = maxNum(SIMD.float32x4.extractLane(t, 1),
                    SIMD.float32x4.extractLane(other, 1));
    var cz = maxNum(SIMD.float32x4.extractLane(t, 2),
                    SIMD.float32x4.extractLane(other, 2));
    var cw = maxNum(SIMD.float32x4.extractLane(t, 3),
                    SIMD.float32x4.extractLane(other, 3));
    return SIMD.float32x4(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.reciprocalApproximation === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with an approximation of the
    * reciprocal value of t.
    */
  SIMD.float32x4.reciprocalApproximation = function(t) {
    t = SIMD.float32x4.check(t);
    return SIMD.float32x4.div(SIMD.float32x4.splat(1.0), t);
  }
}

if (typeof SIMD.float32x4.reciprocalSqrtApproximation === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with an approximation of the
    * reciprocal value of the square root of t.
    */
  SIMD.float32x4.reciprocalSqrtApproximation = function(t) {
    t = SIMD.float32x4.check(t);
    return SIMD.float32x4.reciprocalApproximation(SIMD.float32x4.sqrt(t));
  }
}

if (typeof SIMD.float32x4.sqrt === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with square root of
    * values of t.
    */
  SIMD.float32x4.sqrt = function(t) {
    t = SIMD.float32x4.check(t);
    return SIMD.float32x4(Math.sqrt(SIMD.float32x4.extractLane(t, 0)),
                          Math.sqrt(SIMD.float32x4.extractLane(t, 1)),
                          Math.sqrt(SIMD.float32x4.extractLane(t, 2)),
                          Math.sqrt(SIMD.float32x4.extractLane(t, 3)));
  }
}

if (typeof SIMD.float32x4.swizzle === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4 to be swizzled.
    * @param {integer} x - Index in t for lane x
    * @param {integer} y - Index in t for lane y
    * @param {integer} z - Index in t for lane z
    * @param {integer} w - Index in t for lane w
    * @return {float32x4} New instance of float32x4 with lanes swizzled.
    */
  SIMD.float32x4.swizzle = function(t, x, y, z, w) {
    t = SIMD.float32x4.check(t);
    var check = checkLaneIndex(4);
    check(x);
    check(y);
    check(z);
    check(w);
    _f32x4[0] = SIMD.float32x4.extractLane(t, 0);
    _f32x4[1] = SIMD.float32x4.extractLane(t, 1);
    _f32x4[2] = SIMD.float32x4.extractLane(t, 2);
    _f32x4[3] = SIMD.float32x4.extractLane(t, 3);
    var storage = _f32x4;
    return SIMD.float32x4(storage[x], storage[y], storage[z], storage[w]);
  }
}

if (typeof SIMD.float32x4.shuffle === "undefined") {

  _f32x8 = new Float32Array(8);

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
    t1 = SIMD.float32x4.check(t1);
    t2 = SIMD.float32x4.check(t2);
    var check = checkLaneIndex(8);
    check(x);
    check(y);
    check(z);
    check(w);
    var storage = _f32x8;
    storage[0] = SIMD.float32x4.extractLane(t1, 0);
    storage[1] = SIMD.float32x4.extractLane(t1, 1);
    storage[2] = SIMD.float32x4.extractLane(t1, 2);
    storage[3] = SIMD.float32x4.extractLane(t1, 3);
    storage[4] = SIMD.float32x4.extractLane(t2, 0);
    storage[5] = SIMD.float32x4.extractLane(t2, 1);
    storage[6] = SIMD.float32x4.extractLane(t2, 2);
    storage[7] = SIMD.float32x4.extractLane(t2, 3);
    return SIMD.float32x4(storage[x], storage[y], storage[z], storage[w]);
  }
}

if (typeof SIMD.float32x4.lessThan === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t < other.
    */
  SIMD.float32x4.lessThan = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx =
        SIMD.float32x4.extractLane(t, 0) < SIMD.float32x4.extractLane(other, 0);
    var cy =
        SIMD.float32x4.extractLane(t, 1) < SIMD.float32x4.extractLane(other, 1);
    var cz =
        SIMD.float32x4.extractLane(t, 2) < SIMD.float32x4.extractLane(other, 2);
    var cw =
        SIMD.float32x4.extractLane(t, 3) < SIMD.float32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.lessThanOrEqual === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t <= other.
    */
  SIMD.float32x4.lessThanOrEqual = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx = SIMD.float32x4.extractLane(t, 0) <=
        SIMD.float32x4.extractLane(other, 0);
    var cy = SIMD.float32x4.extractLane(t, 1) <=
        SIMD.float32x4.extractLane(other, 1);
    var cz = SIMD.float32x4.extractLane(t, 2) <=
        SIMD.float32x4.extractLane(other, 2);
    var cw = SIMD.float32x4.extractLane(t, 3) <=
        SIMD.float32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.equal === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t == other.
    */
  SIMD.float32x4.equal = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx = SIMD.float32x4.extractLane(t, 0) ==
        SIMD.float32x4.extractLane(other, 0);
    var cy = SIMD.float32x4.extractLane(t, 1) ==
        SIMD.float32x4.extractLane(other, 1);
    var cz = SIMD.float32x4.extractLane(t, 2) ==
        SIMD.float32x4.extractLane(other, 2);
    var cw = SIMD.float32x4.extractLane(t, 3) ==
        SIMD.float32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.notEqual === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t != other.
    */
  SIMD.float32x4.notEqual = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx = SIMD.float32x4.extractLane(t, 0) !=
        SIMD.float32x4.extractLane(other, 0);
    var cy = SIMD.float32x4.extractLane(t, 1) !=
        SIMD.float32x4.extractLane(other, 1);
    var cz = SIMD.float32x4.extractLane(t, 2) !=
        SIMD.float32x4.extractLane(other, 2);
    var cw = SIMD.float32x4.extractLane(t, 3) !=
        SIMD.float32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.greaterThanOrEqual === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t >= other.
    */
  SIMD.float32x4.greaterThanOrEqual = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx = SIMD.float32x4.extractLane(t, 0) >=
        SIMD.float32x4.extractLane(other, 0);
    var cy = SIMD.float32x4.extractLane(t, 1) >=
        SIMD.float32x4.extractLane(other, 1);
    var cz = SIMD.float32x4.extractLane(t, 2) >=
        SIMD.float32x4.extractLane(other, 2);
    var cw = SIMD.float32x4.extractLane(t, 3) >=
        SIMD.float32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.greaterThan === "undefined") {
  /**
    * @param {float32x4} t An instance of float32x4.
    * @param {float32x4} other An instance of float32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t > other.
    */
  SIMD.float32x4.greaterThan = function(t, other) {
    t = SIMD.float32x4.check(t);
    other = SIMD.float32x4.check(other);
    var cx =
        SIMD.float32x4.extractLane(t, 0) > SIMD.float32x4.extractLane(other, 0);
    var cy =
        SIMD.float32x4.extractLane(t, 1) > SIMD.float32x4.extractLane(other, 1);
    var cz =
        SIMD.float32x4.extractLane(t, 2) > SIMD.float32x4.extractLane(other, 2);
    var cw =
        SIMD.float32x4.extractLane(t, 3) > SIMD.float32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.float32x4.select === "undefined") {
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
    t = SIMD.int32x4.check(t);
    trueValue = SIMD.float32x4.check(trueValue);
    falseValue = SIMD.float32x4.check(falseValue);
    return SIMD.float32x4(
        toBool(SIMD.int32x4.extractLane(t, 0)) ?
            SIMD.float32x4.extractLane(trueValue, 0) :
                SIMD.float32x4.extractLane(falseValue, 0),
        toBool(SIMD.int32x4.extractLane(t, 1)) ?
            SIMD.float32x4.extractLane(trueValue, 1) :
                SIMD.float32x4.extractLane(falseValue, 1),
        toBool(SIMD.int32x4.extractLane(t, 2)) ?
            SIMD.float32x4.extractLane(trueValue, 2) :
                SIMD.float32x4.extractLane(falseValue, 2),
        toBool(SIMD.int32x4.extractLane(t, 3)) ?
            SIMD.float32x4.extractLane(trueValue, 3) :
                SIMD.float32x4.extractLane(falseValue, 3));
  }
}

if (typeof SIMD.float32x4.bitselect === "undefined") {
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
    t = SIMD.int32x4.check(t);
    trueValue = SIMD.float32x4.check(trueValue);
    falseValue = SIMD.float32x4.check(falseValue);
    var tv = SIMD.int32x4.fromFloat32x4Bits(trueValue);
    var fv = SIMD.int32x4.fromFloat32x4Bits(falseValue);
    var tr = SIMD.int32x4.and(t, tv);
    var fr = SIMD.int32x4.and(SIMD.int32x4.not(t), fv);
    return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.or(tr, fr));
  }
}

if (typeof SIMD.float32x4.and === "undefined") {
  /**
    * @param {float32x4} a An instance of float32x4.
    * @param {float32x4} b An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with values of a & b.
    */
  SIMD.float32x4.and = function(a, b) {
    a = SIMD.float32x4.check(a);
    b = SIMD.float32x4.check(b);
    var aInt = SIMD.int32x4.fromFloat32x4Bits(a);
    var bInt = SIMD.int32x4.fromFloat32x4Bits(b);
    return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.and(aInt, bInt));
  }
}

if (typeof SIMD.float32x4.or === "undefined") {
  /**
    * @param {float32x4} a An instance of float32x4.
    * @param {float32x4} b An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with values of a | b.
    */
  SIMD.float32x4.or = function(a, b) {
    a = SIMD.float32x4.check(a);
    b = SIMD.float32x4.check(b);
    var aInt = SIMD.int32x4.fromFloat32x4Bits(a);
    var bInt = SIMD.int32x4.fromFloat32x4Bits(b);
    return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.or(aInt, bInt));
  }
}

if (typeof SIMD.float32x4.xor === "undefined") {
  /**
    * @param {float32x4} a An instance of float32x4.
    * @param {float32x4} b An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with values of a ^ b.
    */
  SIMD.float32x4.xor = function(a, b) {
    a = SIMD.float32x4.check(a);
    b = SIMD.float32x4.check(b);
    var aInt = SIMD.int32x4.fromFloat32x4Bits(a);
    var bInt = SIMD.int32x4.fromFloat32x4Bits(b);
    return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.xor(aInt, bInt));
  }
}

if (typeof SIMD.float32x4.not === "undefined") {
  /**
    * @param {float32x4} a An instance of float32x4.
    * @return {float32x4} New instance of float32x4 with values of ~a.
    */
  SIMD.float32x4.not = function(a) {
    a = SIMD.float32x4.check(a);
    var aInt = SIMD.int32x4.fromFloat32x4Bits(a);
    return SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4.not(aInt));
  }
}

if (typeof SIMD.float32x4.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {float32x4} New instance of float32x4.
    */
  SIMD.float32x4.load = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var f32temp = _f32x4;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? f32temp : _i32x4) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.float32x4(f32temp[0], f32temp[1], f32temp[2], f32temp[3]);
  }
}

if (typeof SIMD.float32x4.load1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {float32x4} New instance of float32x4.
    */
  SIMD.float32x4.load1 = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 4) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var f32temp = _f32x4;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? f32temp : _i32x4) :
                _f64x2;
    var n = 4 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.float32x4(f32temp[0], 0.0, 0.0, 0.0);
  }
}

if (typeof SIMD.float32x4.load2 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {float32x4} New instance of float32x4.
    */
  SIMD.float32x4.load2 = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 8) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var f32temp = _f32x4;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? f32temp : _i32x4) :
                _f64x2;
    var n = 8 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.float32x4(f32temp[0], f32temp[1], 0.0, 0.0);
  }
}

if (typeof SIMD.float32x4.load3 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {float32x4} New instance of float32x4.
    */
  SIMD.float32x4.load3 = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 12) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var f32temp = _f32x4;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? f32temp : _i32x4) :
                _f64x2;
    var n = 12 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.float32x4(f32temp[0], f32temp[1], f32temp[2], 0.0);
  }
}

if (typeof SIMD.float32x4.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {float32x4} value An instance of float32x4.
    * @return {void}
    */
  SIMD.float32x4.store = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.float32x4.check(value);
    _f32x4[0] = SIMD.float32x4.extractLane(value, 0);
    _f32x4[1] = SIMD.float32x4.extractLane(value, 1);
    _f32x4[2] = SIMD.float32x4.extractLane(value, 2);
    _f32x4[3] = SIMD.float32x4.extractLane(value, 3);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

if (typeof SIMD.float32x4.store1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {float32x4} value An instance of float32x4.
    * @return {void}
    */
  SIMD.float32x4.store1 = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 4) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.float32x4.check(value);
    if (bpe == 8) {
      // tarray's elements are too wide. Just create a new view; this is rare.
      var view = new Float32Array(tarray.buffer,
                                  tarray.byteOffset + index * 8, 1);
      view[0] = SIMD.float32x4.extractLane(value, 0);
    } else {
      _f32x4[0] = SIMD.float32x4.extractLane(value, 0);
      var array = bpe == 1 ? _i8x16 :
                  bpe == 2 ? _i16x8 :
                  (tarray instanceof Float32Array ? _f32x4 : _i32x4);
      var n = 4 / bpe;
      for (var i = 0; i < n; ++i)
        tarray[index + i] = array[i];
    }
  }
}

if (typeof SIMD.float32x4.store2 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {float32x4} value An instance of float32x4.
    * @return {void}
    */
  SIMD.float32x4.store2 = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 8) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.float32x4.check(value);
    _f32x4[0] = SIMD.float32x4.extractLane(value, 0);
    _f32x4[1] = SIMD.float32x4.extractLane(value, 1);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 8 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

if (typeof SIMD.float32x4.store3 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {float32x4} value An instance of float32x4.
    * @return {void}
    */
  SIMD.float32x4.store3 = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 12) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.float32x4.check(value);
    if (bpe == 8) {
      // tarray's elements are too wide. Just create a new view; this is rare.
      var view = new Float32Array(tarray.buffer,
                                  tarray.byteOffset + index * 8, 3);
      view[0] = SIMD.float32x4.extractLane(value, 0);
      view[1] = SIMD.float32x4.extractLane(value, 1);
      view[2] = SIMD.float32x4.extractLane(value, 2);
    } else {
      _f32x4[0] = SIMD.float32x4.extractLane(value, 0);
      _f32x4[1] = SIMD.float32x4.extractLane(value, 1);
      _f32x4[2] = SIMD.float32x4.extractLane(value, 2);
      var array = bpe == 1 ? _i8x16 :
                  bpe == 2 ? _i16x8 :
                  (tarray instanceof Float32Array ? _f32x4 : _i32x4);
      var n = 12 / bpe;
      for (var i = 0; i < n; ++i)
        tarray[index + i] = array[i];
    }
  }
}

if (typeof SIMD.float64x2.abs === "undefined") {
  /**
   * @param {float64x2} t An instance of float64x2.
   * @return {float64x2} New instance of float64x2 with absolute values of
   * t.
   */
  SIMD.float64x2.abs = function(t) {
    t = SIMD.float64x2.check(t);
    return SIMD.float64x2(Math.abs(SIMD.float64x2.extractLane(t, 0)),
                          Math.abs(SIMD.float64x2.extractLane(t, 1)));
  }
}

if (typeof SIMD.float64x2.neg === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with negated values of
    * t.
    */
  SIMD.float64x2.neg = function(t) {
    t = SIMD.float64x2.check(t);
    return SIMD.float64x2(-SIMD.float64x2.extractLane(t, 0),
                          -SIMD.float64x2.extractLane(t, 1));
  }
}

if (typeof SIMD.float64x2.add === "undefined") {
  /**
    * @param {float64x2} a An instance of float64x2.
    * @param {float64x2} b An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with a + b.
    */
  SIMD.float64x2.add = function(a, b) {
    a = SIMD.float64x2.check(a);
    b = SIMD.float64x2.check(b);
    return SIMD.float64x2(
        SIMD.float64x2.extractLane(a, 0) + SIMD.float64x2.extractLane(b, 0),
        SIMD.float64x2.extractLane(a, 1) + SIMD.float64x2.extractLane(b, 1));
  }
}

if (typeof SIMD.float64x2.sub === "undefined") {
  /**
    * @param {float64x2} a An instance of float64x2.
    * @param {float64x2} b An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with a - b.
    */
  SIMD.float64x2.sub = function(a, b) {
    a = SIMD.float64x2.check(a);
    b = SIMD.float64x2.check(b);
    return SIMD.float64x2(
        SIMD.float64x2.extractLane(a, 0) - SIMD.float64x2.extractLane(b, 0),
        SIMD.float64x2.extractLane(a, 1) - SIMD.float64x2.extractLane(b, 1));
  }
}

if (typeof SIMD.float64x2.mul === "undefined") {
  /**
    * @param {float64x2} a An instance of float64x2.
    * @param {float64x2} b An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with a * b.
    */
  SIMD.float64x2.mul = function(a, b) {
    a = SIMD.float64x2.check(a);
    b = SIMD.float64x2.check(b);
    return SIMD.float64x2(
        SIMD.float64x2.extractLane(a, 0) * SIMD.float64x2.extractLane(b, 0),
        SIMD.float64x2.extractLane(a, 1) * SIMD.float64x2.extractLane(b, 1));
  }
}

if (typeof SIMD.float64x2.div === "undefined") {
  /**
    * @param {float64x2} a An instance of float64x2.
    * @param {float64x2} b An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with a / b.
    */
  SIMD.float64x2.div = function(a, b) {
    a = SIMD.float64x2.check(a);
    b = SIMD.float64x2.check(b);
    return SIMD.float64x2(
        SIMD.float64x2.extractLane(a, 0) / SIMD.float64x2.extractLane(b, 0),
        SIMD.float64x2.extractLane(a, 1) / SIMD.float64x2.extractLane(b, 1));
  }
}

if (typeof SIMD.float64x2.clamp === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} lowerLimit An instance of float64x2.
    * @param {float64x2} upperLimit An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with t's values clamped
    * between lowerLimit and upperLimit.
    */
  SIMD.float64x2.clamp = function(t, lowerLimit, upperLimit) {
    t = SIMD.float64x2.check(t);
    lowerLimit = SIMD.float64x2.check(lowerLimit);
    upperLimit = SIMD.float64x2.check(upperLimit);
    var cx = SIMD.float64x2.extractLane(t, 0) <
        SIMD.float64x2.extractLane(lowerLimit, 0) ?
            SIMD.float64x2.extractLane(lowerLimit, 0) :
                SIMD.float64x2.extractLane(t, 0);
    var cy = SIMD.float64x2.extractLane(t, 1) <
        SIMD.float64x2.extractLane(lowerLimit, 1) ?
            SIMD.float64x2.extractLane(lowerLimit, 1) :
                SIMD.float64x2.extractLane(t, 1);
    cx = cx > SIMD.float64x2.extractLane(upperLimit, 0) ?
        SIMD.float64x2.extractLane(upperLimit, 0) : cx;
    cy = cy > SIMD.float64x2.extractLane(upperLimit, 1) ?
        SIMD.float64x2.extractLane(upperLimit, 1) : cy;
    return SIMD.float64x2(cx, cy);
  }
}

if (typeof SIMD.float64x2.min === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with the minimum value of
    * t and other.
    */
  SIMD.float64x2.min = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx = Math.min(SIMD.float64x2.extractLane(t, 0),
                      SIMD.float64x2.extractLane(other, 0));
    var cy = Math.min(SIMD.float64x2.extractLane(t, 1),
                      SIMD.float64x2.extractLane(other, 1));
    return SIMD.float64x2(cx, cy);
  }
}

if (typeof SIMD.float64x2.max === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with the maximum value of
    * t and other.
    */
  SIMD.float64x2.max = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx = Math.max(SIMD.float64x2.extractLane(t, 0),
                      SIMD.float64x2.extractLane(other, 0));
    var cy = Math.max(SIMD.float64x2.extractLane(t, 1),
                      SIMD.float64x2.extractLane(other, 1));
    return SIMD.float64x2(cx, cy);
  }
}

if (typeof SIMD.float64x2.minNum === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with the minimum value of
    * t and other, preferring numbers over NaNs.
    */
  SIMD.float64x2.minNum = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx = minNum(SIMD.float64x2.extractLane(t, 0),
                    SIMD.float64x2.extractLane(other, 0));
    var cy = minNum(SIMD.float64x2.extractLane(t, 1),
                    SIMD.float64x2.extractLane(other, 1));
    return SIMD.float64x2(cx, cy);
  }
}

if (typeof SIMD.float64x2.maxNum === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with the maximum value of
    * t and other, preferring numbers over NaNs.
    */
  SIMD.float64x2.maxNum = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx = maxNum(SIMD.float64x2.extractLane(t, 0),
                    SIMD.float64x2.extractLane(other, 0));
    var cy = maxNum(SIMD.float64x2.extractLane(t, 1),
                    SIMD.float64x2.extractLane(other, 1));
    return SIMD.float64x2(cx, cy);
  }
}

if (typeof SIMD.float64x2.reciprocalApproximation === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with an approximation of the
    * reciprocal value of t.
    */
  SIMD.float64x2.reciprocalApproximation = function(t) {
    t = SIMD.float64x2.check(t);
    return SIMD.float64x2.div(SIMD.float64x2.splat(1.0), t);
  }
}

if (typeof SIMD.float64x2.reciprocalSqrtApproximation === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with an approximation of the
    * reciprocal value of the square root of t.
    */
  SIMD.float64x2.reciprocalSqrtApproximation = function(t) {
    t = SIMD.float64x2.check(t);
    return SIMD.float64x2.reciprocalApproximation(SIMD.float64x2.sqrt(t));
  }
}

if (typeof SIMD.float64x2.sqrt === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @return {float64x2} New instance of float64x2 with square root of
    * values of t.
    */
  SIMD.float64x2.sqrt = function(t) {
    t = SIMD.float64x2.check(t);
    return SIMD.float64x2(Math.sqrt(SIMD.float64x2.extractLane(t, 0)),
                          Math.sqrt(SIMD.float64x2.extractLane(t, 1)));
  }
}

if (typeof SIMD.float64x2.swizzle === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2 to be swizzled.
    * @param {integer} x - Index in t for lane x
    * @param {integer} y - Index in t for lane y
    * @return {float64x2} New instance of float64x2 with lanes swizzled.
    */
  SIMD.float64x2.swizzle = function(t, x, y) {
    t = SIMD.float64x2.check(t);
    var check = checkLaneIndex(2);
    check(x);
    check(y);
    var storage = _f64x2;
    storage[0] = SIMD.float64x2.extractLane(t, 0);
    storage[1] = SIMD.float64x2.extractLane(t, 1);
    return SIMD.float64x2(storage[x], storage[y]);
  }
}

if (typeof SIMD.float64x2.shuffle === "undefined") {

  _f64x4 = new Float64Array(4);

  /**
    * @param {float64x2} t1 An instance of float64x2 to be shuffled.
    * @param {float64x2} t2 An instance of float64x2 to be shuffled.
    * @param {integer} x - Index in concatenation of t1 and t2 for lane x
    * @param {integer} y - Index in concatenation of t1 and t2 for lane y
    * @return {float64x2} New instance of float64x2 with lanes shuffled.
    */
  SIMD.float64x2.shuffle = function(t1, t2, x, y) {
    t1 = SIMD.float64x2.check(t1);
    t2 = SIMD.float64x2.check(t2);
    var check = checkLaneIndex(4);
    check(x);
    check(y);
    var storage = _f64x4;
    storage[0] = SIMD.float64x2.extractLane(t1, 0);
    storage[1] = SIMD.float64x2.extractLane(t1, 1);
    storage[2] = SIMD.float64x2.extractLane(t2, 0);
    storage[3] = SIMD.float64x2.extractLane(t2, 1);
    return SIMD.float64x2(storage[x], storage[y]);
  }
}

if (typeof SIMD.float64x2.lessThan === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {int32x4} true or false in each lane depending on
    * the result of t < other.
    */
  SIMD.float64x2.lessThan = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx =
        SIMD.float64x2.extractLane(t, 0) < SIMD.float64x2.extractLane(other, 0);
    var cy =
        SIMD.float64x2.extractLane(t, 1) < SIMD.float64x2.extractLane(other, 1);
    return SIMD.int32x4.bool(cx, cx, cy, cy);
  }
}

if (typeof SIMD.float64x2.lessThanOrEqual === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {int32x4} true or false in each lane depending on
    * the result of t <= other.
    */
  SIMD.float64x2.lessThanOrEqual = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx = SIMD.float64x2.extractLane(t, 0) <=
        SIMD.float64x2.extractLane(other, 0);
    var cy = SIMD.float64x2.extractLane(t, 1) <=
        SIMD.float64x2.extractLane(other, 1);
    return SIMD.int32x4.bool(cx, cx, cy, cy);
  }
}

if (typeof SIMD.float64x2.equal === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {int32x4} true or false in each lane depending on
    * the result of t == other.
    */
  SIMD.float64x2.equal = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx = SIMD.float64x2.extractLane(t, 0) ==
        SIMD.float64x2.extractLane(other, 0);
    var cy = SIMD.float64x2.extractLane(t, 1) ==
        SIMD.float64x2.extractLane(other, 1);
    return SIMD.int32x4.bool(cx, cx, cy, cy);
  }
}

if (typeof SIMD.float64x2.notEqual === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {int32x4} true or false in each lane depending on
    * the result of t != other.
    */
  SIMD.float64x2.notEqual = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx = SIMD.float64x2.extractLane(t, 0) !=
        SIMD.float64x2.extractLane(other, 0);
    var cy = SIMD.float64x2.extractLane(t, 1) !=
        SIMD.float64x2.extractLane(other, 1);
    return SIMD.int32x4.bool(cx, cx, cy, cy);
  }
}

if (typeof SIMD.float64x2.greaterThanOrEqual === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {int32x4} true or false in each lane depending on
    * the result of t >= other.
    */
  SIMD.float64x2.greaterThanOrEqual = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx = SIMD.float64x2.extractLane(t, 0) >=
        SIMD.float64x2.extractLane(other, 0);
    var cy = SIMD.float64x2.extractLane(t, 1) >=
        SIMD.float64x2.extractLane(other, 1);
    return SIMD.int32x4.bool(cx, cx, cy, cy);
  }
}

if (typeof SIMD.float64x2.greaterThan === "undefined") {
  /**
    * @param {float64x2} t An instance of float64x2.
    * @param {float64x2} other An instance of float64x2.
    * @return {int32x4} true or false in each lane depending on
    * the result of t > other.
    */
  SIMD.float64x2.greaterThan = function(t, other) {
    t = SIMD.float64x2.check(t);
    other = SIMD.float64x2.check(other);
    var cx =
        SIMD.float64x2.extractLane(t, 0) > SIMD.float64x2.extractLane(other, 0);
    var cy =
        SIMD.float64x2.extractLane(t, 1) > SIMD.float64x2.extractLane(other, 1);
    return SIMD.int32x4.bool(cx, cx, cy, cy);
  }
}

if (typeof SIMD.float64x2.select === "undefined") {
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
    t = SIMD.int32x4.check(t);
    trueValue = SIMD.float64x2.check(trueValue);
    falseValue = SIMD.float64x2.check(falseValue);
    // We use t.z_ for the second element because t is an int32x4, because
    // int64x2 isn't available.
    return SIMD.float64x2(
        toBool(SIMD.int32x4.extractLane(t, 0)) ?
            SIMD.float64x2.extractLane(trueValue, 0) :
                SIMD.float64x2.extractLane(falseValue, 0),
        toBool(SIMD.int32x4.extractLane(t, 2)) ?
            SIMD.float64x2.extractLane(trueValue, 1) :
                SIMD.float64x2.extractLane(falseValue, 1));
  }
}

if (typeof SIMD.float64x2.bitselect === "undefined") {
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
    t = SIMD.int32x4.check(t);
    trueValue = SIMD.float64x2.check(trueValue);
    falseValue = SIMD.float64x2.check(falseValue);
    var tv = SIMD.int32x4.fromFloat64x2Bits(trueValue);
    var fv = SIMD.int32x4.fromFloat64x2Bits(falseValue);
    var tr = SIMD.int32x4.and(t, tv);
    var fr = SIMD.int32x4.and(SIMD.int32x4.not(t), fv);
    return SIMD.float64x2.fromInt32x4Bits(SIMD.int32x4.or(tr, fr));
  }
}

if (typeof SIMD.float64x2.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {float64x2} New instance of float64x2.
    */
  SIMD.float64x2.load = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var f64temp = _f64x2;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                f64temp;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.float64x2(f64temp[0], f64temp[1]);
  }
}

if (typeof SIMD.float64x2.load1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {float64x2} New instance of float64x2.
    */
  SIMD.float64x2.load1 = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 8) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var f64temp = _f64x2;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                f64temp;
    var n = 8 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.float64x2(f64temp[0], 0.0);
  }
}

if (typeof SIMD.float64x2.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {float64x2} value An instance of float64x2.
    * @return {void}
    */
  SIMD.float64x2.store = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.float64x2.check(value);
    _f64x2[0] = SIMD.float64x2.extractLane(value, 0);
    _f64x2[1] = SIMD.float64x2.extractLane(value, 1);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

if (typeof SIMD.float64x2.store1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {float64x2} value An instance of float64x2.
    * @return {void}
    */
  SIMD.float64x2.store1 = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 8) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.float64x2.check(value);
    _f64x2[0] = SIMD.float64x2.extractLane(value, 0);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 8 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

if (typeof SIMD.int32x4.and === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {int32x4} b An instance of int32x4.
    * @return {int32x4} New instance of int32x4 with values of a & b.
    */
  SIMD.int32x4.and = function(a, b) {
    a = SIMD.int32x4.check(a);
    b = SIMD.int32x4.check(b);
    return SIMD.int32x4(
        SIMD.int32x4.extractLane(a, 0) & SIMD.int32x4.extractLane(b, 0),
        SIMD.int32x4.extractLane(a, 1) & SIMD.int32x4.extractLane(b, 1),
        SIMD.int32x4.extractLane(a, 2) & SIMD.int32x4.extractLane(b, 2),
        SIMD.int32x4.extractLane(a, 3) & SIMD.int32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.int32x4.or === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {int32x4} b An instance of int32x4.
    * @return {int32x4} New instance of int32x4 with values of a | b.
    */
  SIMD.int32x4.or = function(a, b) {
    a = SIMD.int32x4.check(a);
    b = SIMD.int32x4.check(b);
    return SIMD.int32x4(
        SIMD.int32x4.extractLane(a, 0) | SIMD.int32x4.extractLane(b, 0),
        SIMD.int32x4.extractLane(a, 1) | SIMD.int32x4.extractLane(b, 1),
        SIMD.int32x4.extractLane(a, 2) | SIMD.int32x4.extractLane(b, 2),
        SIMD.int32x4.extractLane(a, 3) | SIMD.int32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.int32x4.xor === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {int32x4} b An instance of int32x4.
    * @return {int32x4} New instance of int32x4 with values of a ^ b.
    */
  SIMD.int32x4.xor = function(a, b) {
    a = SIMD.int32x4.check(a);
    b = SIMD.int32x4.check(b);
    return SIMD.int32x4(
        SIMD.int32x4.extractLane(a, 0) ^ SIMD.int32x4.extractLane(b, 0),
        SIMD.int32x4.extractLane(a, 1) ^ SIMD.int32x4.extractLane(b, 1),
        SIMD.int32x4.extractLane(a, 2) ^ SIMD.int32x4.extractLane(b, 2),
        SIMD.int32x4.extractLane(a, 3) ^ SIMD.int32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.int32x4.not === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @return {int32x4} New instance of int32x4 with values of ~t
    */
  SIMD.int32x4.not = function(t) {
    t = SIMD.int32x4.check(t);
    return SIMD.int32x4(~SIMD.int32x4.extractLane(t, 0),
                        ~SIMD.int32x4.extractLane(t, 1),
                        ~SIMD.int32x4.extractLane(t, 2),
                        ~SIMD.int32x4.extractLane(t, 3));
  }
}

if (typeof SIMD.int32x4.neg === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @return {int32x4} New instance of int32x4 with values of -t
    */
  SIMD.int32x4.neg = function(t) {
    t = SIMD.int32x4.check(t);
    return SIMD.int32x4(-SIMD.int32x4.extractLane(t, 0),
                        -SIMD.int32x4.extractLane(t, 1),
                        -SIMD.int32x4.extractLane(t, 2),
                        -SIMD.int32x4.extractLane(t, 3));
  }
}

if (typeof SIMD.int32x4.add === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {int32x4} b An instance of int32x4.
    * @return {int32x4} New instance of int32x4 with values of a + b.
    */
  SIMD.int32x4.add = function(a, b) {
    a = SIMD.int32x4.check(a);
    b = SIMD.int32x4.check(b);
    return SIMD.int32x4(
        SIMD.int32x4.extractLane(a, 0) + SIMD.int32x4.extractLane(b, 0),
        SIMD.int32x4.extractLane(a, 1) + SIMD.int32x4.extractLane(b, 1),
        SIMD.int32x4.extractLane(a, 2) + SIMD.int32x4.extractLane(b, 2),
        SIMD.int32x4.extractLane(a, 3) + SIMD.int32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.int32x4.sub === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {int32x4} b An instance of int32x4.
    * @return {int32x4} New instance of int32x4 with values of a - b.
    */
  SIMD.int32x4.sub = function(a, b) {
    a = SIMD.int32x4.check(a);
    b = SIMD.int32x4.check(b);
    return SIMD.int32x4(
        SIMD.int32x4.extractLane(a, 0) - SIMD.int32x4.extractLane(b, 0),
        SIMD.int32x4.extractLane(a, 1) - SIMD.int32x4.extractLane(b, 1),
        SIMD.int32x4.extractLane(a, 2) - SIMD.int32x4.extractLane(b, 2),
        SIMD.int32x4.extractLane(a, 3) - SIMD.int32x4.extractLane(b, 3));
  }
}

if (typeof SIMD.int32x4.mul === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {int32x4} b An instance of int32x4.
    * @return {int32x4} New instance of int32x4 with values of a * b.
    */
  SIMD.int32x4.mul = function(a, b) {
    a = SIMD.int32x4.check(a);
    b = SIMD.int32x4.check(b);
    return SIMD.int32x4(
        Math.imul(SIMD.int32x4.extractLane(a, 0),
                  SIMD.int32x4.extractLane(b, 0)),
        Math.imul(SIMD.int32x4.extractLane(a, 1),
                  SIMD.int32x4.extractLane(b, 1)),
        Math.imul(SIMD.int32x4.extractLane(a, 2),
                  SIMD.int32x4.extractLane(b, 2)),
        Math.imul(SIMD.int32x4.extractLane(a, 3),
                  SIMD.int32x4.extractLane(b, 3)));
  }
}

if (typeof SIMD.int32x4.swizzle === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4 to be swizzled.
    * @param {integer} x - Index in t for lane x
    * @param {integer} y - Index in t for lane y
    * @param {integer} z - Index in t for lane z
    * @param {integer} w - Index in t for lane w
    * @return {int32x4} New instance of int32x4 with lanes swizzled.
    */
  SIMD.int32x4.swizzle = function(t, x, y, z, w) {
    t = SIMD.int32x4.check(t);
    var check = checkLaneIndex(4);
    check(x);
    check(y);
    check(z);
    check(w);
    var storage = _i32x4;
    storage[0] = SIMD.int32x4.extractLane(t, 0);
    storage[1] = SIMD.int32x4.extractLane(t, 1);
    storage[2] = SIMD.int32x4.extractLane(t, 2);
    storage[3] = SIMD.int32x4.extractLane(t, 3);
    return SIMD.int32x4(storage[x], storage[y], storage[z], storage[w]);
  }
}

if (typeof SIMD.int32x4.shuffle === "undefined") {

  _i32x8 = new Int32Array(8);

  /**
    * @param {int32x4} t1 An instance of int32x4 to be shuffled.
    * @param {int32x4} t2 An instance of int32x4 to be shuffled.
    * @param {integer} x - Index in concatenation of t1 and t2 for lane x
    * @param {integer} y - Index in concatenation of t1 and t2 for lane y
    * @param {integer} z - Index in concatenation of t1 and t2 for lane z
    * @param {integer} w - Index in concatenation of t1 and t2 for lane w
    * @return {int32x4} New instance of int32x4 with lanes shuffled.
    */
  SIMD.int32x4.shuffle = function(t1, t2, x, y, z, w) {
    t1 = SIMD.int32x4.check(t1);
    t2 = SIMD.int32x4.check(t2);
    var check = checkLaneIndex(8);
    check(x);
    check(y);
    check(z);
    check(w);
    var storage = _i32x8;
    storage[0] = SIMD.int32x4.extractLane(t1, 0);
    storage[1] = SIMD.int32x4.extractLane(t1, 1);
    storage[2] = SIMD.int32x4.extractLane(t1, 2);
    storage[3] = SIMD.int32x4.extractLane(t1, 3);
    storage[4] = SIMD.int32x4.extractLane(t2, 0);
    storage[5] = SIMD.int32x4.extractLane(t2, 1);
    storage[6] = SIMD.int32x4.extractLane(t2, 2);
    storage[7] = SIMD.int32x4.extractLane(t2, 3);
    return SIMD.int32x4(storage[x], storage[y], storage[z], storage[w]);
  }
}

if (typeof SIMD.int32x4.select === "undefined") {
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
    t = SIMD.int32x4.check(t);
    trueValue = SIMD.int32x4.check(trueValue);
    falseValue = SIMD.int32x4.check(falseValue);
    return SIMD.int32x4(
        toBool(SIMD.int32x4.extractLane(t, 0)) ?
            SIMD.int32x4.extractLane(trueValue, 0) :
                SIMD.int32x4.extractLane(falseValue, 0),
        toBool(SIMD.int32x4.extractLane(t, 1)) ?
            SIMD.int32x4.extractLane(trueValue, 1) :
                SIMD.int32x4.extractLane(falseValue, 1),
        toBool(SIMD.int32x4.extractLane(t, 2)) ?
            SIMD.int32x4.extractLane(trueValue, 2) :
                SIMD.int32x4.extractLane(falseValue, 2),
        toBool(SIMD.int32x4.extractLane(t, 3)) ?
            SIMD.int32x4.extractLane(trueValue, 3) :
                SIMD.int32x4.extractLane(falseValue, 3));
  }
}

if (typeof SIMD.int32x4.bitselect === "undefined") {
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
    t = SIMD.int32x4.check(t);
    trueValue = SIMD.int32x4.check(trueValue);
    falseValue = SIMD.int32x4.check(falseValue);
    var tr = SIMD.int32x4.and(t, trueValue);
    var fr = SIMD.int32x4.and(SIMD.int32x4.not(t), falseValue);
    return SIMD.int32x4.or(tr, fr);
  }
}

if (typeof SIMD.int32x4.equal === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @param {int32x4} other An instance of int32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t == other.
    */
  SIMD.int32x4.equal = function(t, other) {
    t = SIMD.int32x4.check(t);
    other = SIMD.int32x4.check(other);
    var cx =
        SIMD.int32x4.extractLane(t, 0) == SIMD.int32x4.extractLane(other, 0);
    var cy =
        SIMD.int32x4.extractLane(t, 1) == SIMD.int32x4.extractLane(other, 1);
    var cz =
        SIMD.int32x4.extractLane(t, 2) == SIMD.int32x4.extractLane(other, 2);
    var cw =
        SIMD.int32x4.extractLane(t, 3) == SIMD.int32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.int32x4.notEqual === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @param {int32x4} other An instance of int32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t != other.
    */
  SIMD.int32x4.notEqual = function(t, other) {
    t = SIMD.int32x4.check(t);
    other = SIMD.int32x4.check(other);
    var cx =
        SIMD.int32x4.extractLane(t, 0) != SIMD.int32x4.extractLane(other, 0);
    var cy =
        SIMD.int32x4.extractLane(t, 1) != SIMD.int32x4.extractLane(other, 1);
    var cz =
        SIMD.int32x4.extractLane(t, 2) != SIMD.int32x4.extractLane(other, 2);
    var cw =
        SIMD.int32x4.extractLane(t, 3) != SIMD.int32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.int32x4.greaterThan === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @param {int32x4} other An instance of int32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t > other.
    */
  SIMD.int32x4.greaterThan = function(t, other) {
    t = SIMD.int32x4.check(t);
    other = SIMD.int32x4.check(other);
    var cx =
        SIMD.int32x4.extractLane(t, 0) > SIMD.int32x4.extractLane(other, 0);
    var cy =
        SIMD.int32x4.extractLane(t, 1) > SIMD.int32x4.extractLane(other, 1);
    var cz =
        SIMD.int32x4.extractLane(t, 2) > SIMD.int32x4.extractLane(other, 2);
    var cw =
        SIMD.int32x4.extractLane(t, 3) > SIMD.int32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.int32x4.greaterThanOrEqual === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @param {int32x4} other An instance of int32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t >= other.
    */
  SIMD.int32x4.greaterThanOrEqual = function(t, other) {
    t = SIMD.int32x4.check(t);
    other = SIMD.int32x4.check(other);
    var cx =
        SIMD.int32x4.extractLane(t, 0) >= SIMD.int32x4.extractLane(other, 0);
    var cy =
        SIMD.int32x4.extractLane(t, 1) >= SIMD.int32x4.extractLane(other, 1);
    var cz =
        SIMD.int32x4.extractLane(t, 2) >= SIMD.int32x4.extractLane(other, 2);
    var cw =
        SIMD.int32x4.extractLane(t, 3) >= SIMD.int32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.int32x4.lessThan === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @param {int32x4} other An instance of int32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t < other.
    */
  SIMD.int32x4.lessThan = function(t, other) {
    t = SIMD.int32x4.check(t);
    other = SIMD.int32x4.check(other);
    var cx =
        SIMD.int32x4.extractLane(t, 0) < SIMD.int32x4.extractLane(other, 0);
    var cy =
        SIMD.int32x4.extractLane(t, 1) < SIMD.int32x4.extractLane(other, 1);
    var cz =
        SIMD.int32x4.extractLane(t, 2) < SIMD.int32x4.extractLane(other, 2);
    var cw =
        SIMD.int32x4.extractLane(t, 3) < SIMD.int32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.int32x4.lessThanOrEqual === "undefined") {
  /**
    * @param {int32x4} t An instance of int32x4.
    * @param {int32x4} other An instance of int32x4.
    * @return {int32x4} true or false in each lane depending on
    * the result of t <= other.
    */
  SIMD.int32x4.lessThanOrEqual = function(t, other) {
    t = SIMD.int32x4.check(t);
    other = SIMD.int32x4.check(other);
    var cx =
        SIMD.int32x4.extractLane(t, 0) <= SIMD.int32x4.extractLane(other, 0);
    var cy =
        SIMD.int32x4.extractLane(t, 1) <= SIMD.int32x4.extractLane(other, 1);
    var cz =
        SIMD.int32x4.extractLane(t, 2) <= SIMD.int32x4.extractLane(other, 2);
    var cw =
        SIMD.int32x4.extractLane(t, 3) <= SIMD.int32x4.extractLane(other, 3);
    return SIMD.int32x4.bool(cx, cy, cz, cw);
  }
}

if (typeof SIMD.int32x4.shiftLeftByScalar === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {integer} bits Bit count to shift by.
    * @return {int32x4} lanes in a shifted by bits.
    */
  SIMD.int32x4.shiftLeftByScalar = function(a, bits) {
    a = SIMD.int32x4.check(a);
    if (bits>>>0 >= 32)
      return SIMD.int32x4.splat(0.0);
    var x = SIMD.int32x4.extractLane(a, 0) << bits;
    var y = SIMD.int32x4.extractLane(a, 1) << bits;
    var z = SIMD.int32x4.extractLane(a, 2) << bits;
    var w = SIMD.int32x4.extractLane(a, 3) << bits;
    return SIMD.int32x4(x, y, z, w);
  }
}

if (typeof SIMD.int32x4.shiftRightLogicalByScalar === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {integer} bits Bit count to shift by.
    * @return {int32x4} lanes in a shifted by bits.
    */
  SIMD.int32x4.shiftRightLogicalByScalar = function(a, bits) {
    a = SIMD.int32x4.check(a);
    if (bits>>>0 >= 32)
      return SIMD.int32x4.splat(0.0);
    var x = SIMD.int32x4.extractLane(a, 0) >>> bits;
    var y = SIMD.int32x4.extractLane(a, 1) >>> bits;
    var z = SIMD.int32x4.extractLane(a, 2) >>> bits;
    var w = SIMD.int32x4.extractLane(a, 3) >>> bits;
    return SIMD.int32x4(x, y, z, w);
  }
}

if (typeof SIMD.int32x4.shiftRightArithmeticByScalar === "undefined") {
  /**
    * @param {int32x4} a An instance of int32x4.
    * @param {integer} bits Bit count to shift by.
    * @return {int32x4} lanes in a shifted by bits.
    */
  SIMD.int32x4.shiftRightArithmeticByScalar = function(a, bits) {
    a = SIMD.int32x4.check(a);
    if (bits>>>0 >= 32)
      bits = 31;
    var x = SIMD.int32x4.extractLane(a, 0) >> bits;
    var y = SIMD.int32x4.extractLane(a, 1) >> bits;
    var z = SIMD.int32x4.extractLane(a, 2) >> bits;
    var w = SIMD.int32x4.extractLane(a, 3) >> bits;
    return SIMD.int32x4(x, y, z, w);
  }
}

if (typeof SIMD.int32x4.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {int32x4} New instance of int32x4.
    */
  SIMD.int32x4.load = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var i32temp = _i32x4;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : i32temp) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.int32x4(i32temp[0], i32temp[1], i32temp[2], i32temp[3]);
  }
}

if (typeof SIMD.int32x4.load1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {int32x4} New instance of int32x4.
    */
  SIMD.int32x4.load1 = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 4) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var i32temp = _i32x4;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : i32temp) :
                _f64x2;
    var n = 4 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.int32x4(i32temp[0], 0, 0, 0);
  }
}

if (typeof SIMD.int32x4.load2 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {int32x4} New instance of int32x4.
    */
  SIMD.int32x4.load2 = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 8) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var i32temp = _i32x4;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : i32temp) :
                _f64x2;
    var n = 8 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.int32x4(i32temp[0], i32temp[1], 0, 0);
  }
}

if (typeof SIMD.int32x4.load3 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {int32x4} New instance of int32x4.
    */
  SIMD.int32x4.load3 = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 12) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var i32temp = _i32x4;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : i32temp) :
                _f64x2;
    var n = 12 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.int32x4(i32temp[0], i32temp[1], i32temp[2], 0);
  }
}

if (typeof SIMD.int32x4.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {int32x4} value An instance of int32x4.
    * @return {void}
    */
  SIMD.int32x4.store = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.int32x4.check(value);
    _i32x4[0] = SIMD.int32x4.extractLane(value, 0);
    _i32x4[1] = SIMD.int32x4.extractLane(value, 1);
    _i32x4[2] = SIMD.int32x4.extractLane(value, 2);
    _i32x4[3] = SIMD.int32x4.extractLane(value, 3);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

if (typeof SIMD.int32x4.store1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {int32x4} value An instance of int32x4.
    * @return {void}
    */
  SIMD.int32x4.store1 = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 4) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.int32x4.check(value);
    if (bpe == 8) {
      // tarray's elements are too wide. Just create a new view; this is rare.
      var view = new Int32Array(tarray.buffer,
                                tarray.byteOffset + index * 8, 1);
      view[0] = SIMD.int32x4.extractLane(value, 0);
    } else {
      _i32x4[0] = SIMD.int32x4.extractLane(value, 0);
      var array = bpe == 1 ? _i8x16 :
                  bpe == 2 ? _i16x8 :
                  (tarray instanceof Float32Array ? _f32x4 : _i32x4);
      var n = 4 / bpe;
      for (var i = 0; i < n; ++i)
        tarray[index + i] = array[i];
    }
  }
}

if (typeof SIMD.int32x4.store2 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {int32x4} value An instance of int32x4.
    * @return {void}
    */
  SIMD.int32x4.store2 = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 8) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.int32x4.check(value);
    _i32x4[0] = SIMD.int32x4.extractLane(value, 0);
    _i32x4[1] = SIMD.int32x4.extractLane(value, 1);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 8 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

if (typeof SIMD.int32x4.store3 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {int32x4} value An instance of int32x4.
    * @return {void}
    */
  SIMD.int32x4.store3 = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 12) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.int32x4.check(value);
    if (bpe == 8) {
      // tarray's elements are too wide. Just create a new view; this is rare.
      var view = new Int32Array(tarray.buffer,
                                tarray.byteOffset + index * 8, 3);
      view[0] = SIMD.int32x4.extractLane(value, 0);
      view[1] = SIMD.int32x4.extractLane(value, 1);
      view[2] = SIMD.int32x4.extractLane(value, 2);
    } else {
      _i32x4[0] = SIMD.int32x4.extractLane(value, 0);
      _i32x4[1] = SIMD.int32x4.extractLane(value, 1);
      _i32x4[2] = SIMD.int32x4.extractLane(value, 2);
      var array = bpe == 1 ? _i8x16 :
                  bpe == 2 ? _i16x8 :
                  (tarray instanceof Float32Array ? _f32x4 : _i32x4);
      var n = 12 / bpe;
      for (var i = 0; i < n; ++i)
        tarray[index + i] = array[i];
    }
  }
}

if (typeof SIMD.int16x8.and === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {int16x8} b An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of a & b.
    */
  SIMD.int16x8.and = function(a, b) {
    a = SIMD.int16x8.check(a);
    b = SIMD.int16x8.check(b);
    return SIMD.int16x8(
        SIMD.int16x8.extractLane(a, 0) & SIMD.int16x8.extractLane(b, 0),
        SIMD.int16x8.extractLane(a, 1) & SIMD.int16x8.extractLane(b, 1),
        SIMD.int16x8.extractLane(a, 2) & SIMD.int16x8.extractLane(b, 2),
        SIMD.int16x8.extractLane(a, 3) & SIMD.int16x8.extractLane(b, 3),
        SIMD.int16x8.extractLane(a, 4) & SIMD.int16x8.extractLane(b, 4),
        SIMD.int16x8.extractLane(a, 5) & SIMD.int16x8.extractLane(b, 5),
        SIMD.int16x8.extractLane(a, 6) & SIMD.int16x8.extractLane(b, 6),
        SIMD.int16x8.extractLane(a, 7) & SIMD.int16x8.extractLane(b, 7));
  }
}

if (typeof SIMD.int16x8.or === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {int16x8} b An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of a | b.
    */
  SIMD.int16x8.or = function(a, b) {
    a = SIMD.int16x8.check(a);
    b = SIMD.int16x8.check(b);
    return SIMD.int16x8(
        SIMD.int16x8.extractLane(a, 0) | SIMD.int16x8.extractLane(b, 0),
        SIMD.int16x8.extractLane(a, 1) | SIMD.int16x8.extractLane(b, 1),
        SIMD.int16x8.extractLane(a, 2) | SIMD.int16x8.extractLane(b, 2),
        SIMD.int16x8.extractLane(a, 3) | SIMD.int16x8.extractLane(b, 3),
        SIMD.int16x8.extractLane(a, 4) | SIMD.int16x8.extractLane(b, 4),
        SIMD.int16x8.extractLane(a, 5) | SIMD.int16x8.extractLane(b, 5),
        SIMD.int16x8.extractLane(a, 6) | SIMD.int16x8.extractLane(b, 6),
        SIMD.int16x8.extractLane(a, 7) | SIMD.int16x8.extractLane(b, 7));
  }
}

if (typeof SIMD.int16x8.xor === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {int16x8} b An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of a ^ b.
    */
  SIMD.int16x8.xor = function(a, b) {
    a = SIMD.int16x8.check(a);
    b = SIMD.int16x8.check(b);
    return SIMD.int16x8(
        SIMD.int16x8.extractLane(a, 0) ^ SIMD.int16x8.extractLane(b, 0),
        SIMD.int16x8.extractLane(a, 1) ^ SIMD.int16x8.extractLane(b, 1),
        SIMD.int16x8.extractLane(a, 2) ^ SIMD.int16x8.extractLane(b, 2),
        SIMD.int16x8.extractLane(a, 3) ^ SIMD.int16x8.extractLane(b, 3),
        SIMD.int16x8.extractLane(a, 4) ^ SIMD.int16x8.extractLane(b, 4),
        SIMD.int16x8.extractLane(a, 5) ^ SIMD.int16x8.extractLane(b, 5),
        SIMD.int16x8.extractLane(a, 6) ^ SIMD.int16x8.extractLane(b, 6),
        SIMD.int16x8.extractLane(a, 7) ^ SIMD.int16x8.extractLane(b, 7));
  }
}

if (typeof SIMD.int16x8.not === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of ~t
    */
  SIMD.int16x8.not = function(t) {
    t = SIMD.int16x8.check(t);
    return SIMD.int16x8(~SIMD.int16x8.extractLane(t, 0),
                        ~SIMD.int16x8.extractLane(t, 1),
                        ~SIMD.int16x8.extractLane(t, 2),
                        ~SIMD.int16x8.extractLane(t, 3),
                        ~SIMD.int16x8.extractLane(t, 4),
                        ~SIMD.int16x8.extractLane(t, 5),
                        ~SIMD.int16x8.extractLane(t, 6),
                        ~SIMD.int16x8.extractLane(t, 7));
  }
}

if (typeof SIMD.int16x8.neg === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of -t
    */
  SIMD.int16x8.neg = function(t) {
    t = SIMD.int16x8.check(t);
    return SIMD.int16x8(-SIMD.int16x8.extractLane(t, 0),
                        -SIMD.int16x8.extractLane(t, 1),
                        -SIMD.int16x8.extractLane(t, 2),
                        -SIMD.int16x8.extractLane(t, 3),
                        -SIMD.int16x8.extractLane(t, 4),
                        -SIMD.int16x8.extractLane(t, 5),
                        -SIMD.int16x8.extractLane(t, 6),
                        -SIMD.int16x8.extractLane(t, 7));
  }
}

if (typeof SIMD.int16x8.add === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {int16x8} b An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of a + b.
    */
  SIMD.int16x8.add = function(a, b) {
    a = SIMD.int16x8.check(a);
    b = SIMD.int16x8.check(b);
    return SIMD.int16x8(
        SIMD.int16x8.extractLane(a, 0) + SIMD.int16x8.extractLane(b, 0),
        SIMD.int16x8.extractLane(a, 1) + SIMD.int16x8.extractLane(b, 1),
        SIMD.int16x8.extractLane(a, 2) + SIMD.int16x8.extractLane(b, 2),
        SIMD.int16x8.extractLane(a, 3) + SIMD.int16x8.extractLane(b, 3),
        SIMD.int16x8.extractLane(a, 4) + SIMD.int16x8.extractLane(b, 4),
        SIMD.int16x8.extractLane(a, 5) + SIMD.int16x8.extractLane(b, 5),
        SIMD.int16x8.extractLane(a, 6) + SIMD.int16x8.extractLane(b, 6),
        SIMD.int16x8.extractLane(a, 7) + SIMD.int16x8.extractLane(b, 7));
  }
}

if (typeof SIMD.int16x8.sub === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {int16x8} b An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of a - b.
    */
  SIMD.int16x8.sub = function(a, b) {
    a = SIMD.int16x8.check(a);
    b = SIMD.int16x8.check(b);
    return SIMD.int16x8(
        SIMD.int16x8.extractLane(a, 0) - SIMD.int16x8.extractLane(b, 0),
        SIMD.int16x8.extractLane(a, 1) - SIMD.int16x8.extractLane(b, 1),
        SIMD.int16x8.extractLane(a, 2) - SIMD.int16x8.extractLane(b, 2),
        SIMD.int16x8.extractLane(a, 3) - SIMD.int16x8.extractLane(b, 3),
        SIMD.int16x8.extractLane(a, 4) - SIMD.int16x8.extractLane(b, 4),
        SIMD.int16x8.extractLane(a, 5) - SIMD.int16x8.extractLane(b, 5),
        SIMD.int16x8.extractLane(a, 6) - SIMD.int16x8.extractLane(b, 6),
        SIMD.int16x8.extractLane(a, 7) - SIMD.int16x8.extractLane(b, 7));
  }
}

if (typeof SIMD.int16x8.mul === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {int16x8} b An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of a * b.
    */
  SIMD.int16x8.mul = function(a, b) {
    a = SIMD.int16x8.check(a);
    b = SIMD.int16x8.check(b);
    return SIMD.int16x8(Math.imul(SIMD.int16x8.extractLane(a, 0),
                                  SIMD.int16x8.extractLane(b, 0)),
                        Math.imul(SIMD.int16x8.extractLane(a, 1),
                                  SIMD.int16x8.extractLane(b, 1)),
                        Math.imul(SIMD.int16x8.extractLane(a, 2),
                                  SIMD.int16x8.extractLane(b, 2)),
                        Math.imul(SIMD.int16x8.extractLane(a, 3),
                                  SIMD.int16x8.extractLane(b, 3)),
                        Math.imul(SIMD.int16x8.extractLane(a, 4),
                                  SIMD.int16x8.extractLane(b, 4)),
                        Math.imul(SIMD.int16x8.extractLane(a, 5),
                                  SIMD.int16x8.extractLane(b, 5)),
                        Math.imul(SIMD.int16x8.extractLane(a, 6),
                                  SIMD.int16x8.extractLane(b, 6)),
                        Math.imul(SIMD.int16x8.extractLane(a, 7),
                                  SIMD.int16x8.extractLane(b, 7)));
  }
}

if (typeof SIMD.int16x8.swizzle === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8 to be swizzled.
    * @param {integer} s0 - Index in t for lane s0
    * @param {integer} s1 - Index in t for lane s1
    * @param {integer} s2 - Index in t for lane s2
    * @param {integer} s3 - Index in t for lane s3
    * @param {integer} s4 - Index in t for lane s4
    * @param {integer} s5 - Index in t for lane s5
    * @param {integer} s6 - Index in t for lane s6
    * @param {integer} s7 - Index in t for lane s7
    * @return {int16x8} New instance of int16x8 with lanes swizzled.
    */
  SIMD.int16x8.swizzle = function(t, s0, s1, s2, s3, s4, s5, s6, s7) {
    t = SIMD.int16x8.check(t);
    var check = checkLaneIndex(8);
    check(s0);
    check(s1);
    check(s2);
    check(s3);
    check(s4);
    check(s5);
    check(s6);
    check(s7);
    var storage = _i16x8;
    storage[0] = SIMD.int16x8.extractLane(t, 0);
    storage[1] = SIMD.int16x8.extractLane(t, 1);
    storage[2] = SIMD.int16x8.extractLane(t, 2);
    storage[3] = SIMD.int16x8.extractLane(t, 3);
    storage[4] = SIMD.int16x8.extractLane(t, 4);
    storage[5] = SIMD.int16x8.extractLane(t, 5);
    storage[6] = SIMD.int16x8.extractLane(t, 6);
    storage[7] = SIMD.int16x8.extractLane(t, 7);
    return SIMD.int16x8(storage[s0], storage[s1], storage[s2], storage[s3],
                        storage[s4], storage[s5], storage[s6], storage[s7]);
  }
}

if (typeof SIMD.int16x8.shuffle === "undefined") {

  _i16x16 = new Int16Array(16);

  /**
    * @param {int16x8} t0 An instance of int16x8 to be shuffled.
    * @param {int16x8} t1 An instance of int16x8 to be shuffled.
    * @param {integer} s0 - Index in concatenation of t0 and t1 for lane s0
    * @param {integer} s1 - Index in concatenation of t0 and t1 for lane s1
    * @param {integer} s2 - Index in concatenation of t0 and t1 for lane s2
    * @param {integer} s3 - Index in concatenation of t0 and t1 for lane s3
    * @param {integer} s4 - Index in concatenation of t0 and t1 for lane s4
    * @param {integer} s5 - Index in concatenation of t0 and t1 for lane s5
    * @param {integer} s6 - Index in concatenation of t0 and t1 for lane s6
    * @param {integer} s7 - Index in concatenation of t0 and t1 for lane s7
    * @return {int16x8} New instance of int16x8 with lanes shuffled.
    */
  SIMD.int16x8.shuffle = function(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7) {
    t0 = SIMD.int16x8.check(t0);
    t1 = SIMD.int16x8.check(t1);
    var check = checkLaneIndex(16);
    check(s0);
    check(s1);
    check(s2);
    check(s3);
    check(s4);
    check(s5);
    check(s6);
    check(s7);
    var storage = _i16x16;
    storage[0] = SIMD.int16x8.extractLane(t0, 0);
    storage[1] = SIMD.int16x8.extractLane(t0, 1);
    storage[2] = SIMD.int16x8.extractLane(t0, 2);
    storage[3] = SIMD.int16x8.extractLane(t0, 3);
    storage[4] = SIMD.int16x8.extractLane(t0, 4);
    storage[5] = SIMD.int16x8.extractLane(t0, 5);
    storage[6] = SIMD.int16x8.extractLane(t0, 6);
    storage[7] = SIMD.int16x8.extractLane(t0, 7);
    storage[8] = SIMD.int16x8.extractLane(t1, 0);
    storage[9] = SIMD.int16x8.extractLane(t1, 1);
    storage[10] = SIMD.int16x8.extractLane(t1, 2);
    storage[11] = SIMD.int16x8.extractLane(t1, 3);
    storage[12] = SIMD.int16x8.extractLane(t1, 4);
    storage[13] = SIMD.int16x8.extractLane(t1, 5);
    storage[14] = SIMD.int16x8.extractLane(t1, 6);
    storage[15] = SIMD.int16x8.extractLane(t1, 7);
    return SIMD.int16x8(storage[s0], storage[s1], storage[s2], storage[s3],
                        storage[s4], storage[s5], storage[s6], storage[s7]);
  }
}

if (typeof SIMD.int16x8.addSaturate === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {int16x8} b An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of a + b with
    * signed saturating behavior on overflow.
    */
  SIMD.int16x8.addSaturate = function(a, b) {
    a = SIMD.int16x8.check(a);
    b = SIMD.int16x8.check(b);
    var c = SIMD.int16x8.add(a, b);
    var max = SIMD.int16x8.splat(0x7fff);
    var min = SIMD.int16x8.splat(0x8000);
    var mask = SIMD.int16x8.lessThan(c, a);
    return SIMD.int16x8.select(SIMD.int16x8.and(mask, SIMD.int16x8.not(b)), max,
             SIMD.int16x8.select(SIMD.int16x8.and(SIMD.int16x8.not(mask), b), min,
               c));
  }
}

if (typeof SIMD.int16x8.subSaturating === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {int16x8} b An instance of int16x8.
    * @return {int16x8} New instance of int16x8 with values of a - b with
    * signed saturating behavior on overflow.
    */
  SIMD.int16x8.subSaturating = function(a, b) {
    a = SIMD.int16x8.check(a);
    b = SIMD.int16x8.check(b);
    var c = SIMD.int16x8.sub(a, b);
    var max = SIMD.int16x8.splat(0x7fff);
    var min = SIMD.int16x8.splat(0x8000);
    var mask = SIMD.int16x8.greaterThan(c, a);
    return SIMD.int16x8.select(SIMD.int16x8.and(mask, SIMD.int16x8.not(b)), min,
             SIMD.int16x8.select(SIMD.int16x8.and(SIMD.int16x8.not(mask), b), max,
               c));
  }
}

if (typeof SIMD.int16x8.select === "undefined") {
  /**
    * @param {int16x8} t Selector mask. An instance of int16x8
    * @param {int16x8} trueValue Pick lane from here if corresponding
    * selector lane is true
    * @param {int16x8} falseValue Pick lane from here if corresponding
    * selector lane is false
    * @return {int16x8} Mix of lanes from trueValue or falseValue as
    * indicated
    */
  SIMD.int16x8.select = function(t, trueValue, falseValue) {
    t = SIMD.int16x8.check(t);
    trueValue = SIMD.int16x8.check(trueValue);
    falseValue = SIMD.int16x8.check(falseValue);
    return SIMD.int16x8(
        toBool(SIMD.int16x8.extractLane(t, 0)) ?
            SIMD.int16x8.extractLane(trueValue, 0) :
                SIMD.int16x8.extractLane(falseValue, 0),
        toBool(SIMD.int16x8.extractLane(t, 1)) ?
            SIMD.int16x8.extractLane(trueValue, 1) :
                SIMD.int16x8.extractLane(falseValue, 1),
        toBool(SIMD.int16x8.extractLane(t, 2)) ?
            SIMD.int16x8.extractLane(trueValue, 2) :
                SIMD.int16x8.extractLane(falseValue, 2),
        toBool(SIMD.int16x8.extractLane(t, 3)) ?
            SIMD.int16x8.extractLane(trueValue, 3) :
                SIMD.int16x8.extractLane(falseValue, 3),
        toBool(SIMD.int16x8.extractLane(t, 4)) ?
            SIMD.int16x8.extractLane(trueValue, 4) :
                SIMD.int16x8.extractLane(falseValue, 4),
        toBool(SIMD.int16x8.extractLane(t, 5)) ?
            SIMD.int16x8.extractLane(trueValue, 5) :
                SIMD.int16x8.extractLane(falseValue, 5),
        toBool(SIMD.int16x8.extractLane(t, 6)) ?
            SIMD.int16x8.extractLane(trueValue, 6) :
                SIMD.int16x8.extractLane(falseValue, 6),
        toBool(SIMD.int16x8.extractLane(t, 7)) ?
            SIMD.int16x8.extractLane(trueValue, 7) :
                SIMD.int16x8.extractLane(falseValue, 7));
  }
}

if (typeof SIMD.int16x8.bitselect === "undefined") {
  /**
    * @param {int16x8} t Selector mask. An instance of int16x8
    * @param {int16x8} trueValue Pick lane from here if corresponding
    * selector bit is 1
    * @param {int16x8} falseValue Pick lane from here if corresponding
    * selector bit is 0
    * @return {int16x8} Mix of lanes from trueValue or falseValue as
    * indicated
    */
  SIMD.int16x8.bitselect = function(t, trueValue, falseValue) {
    t = SIMD.int16x8.check(t);
    trueValue = SIMD.int16x8.check(trueValue);
    falseValue = SIMD.int16x8.check(falseValue);
    var tr = SIMD.int16x8.and(t, trueValue);
    var fr = SIMD.int16x8.and(SIMD.int16x8.not(t), falseValue);
    return SIMD.int16x8.or(tr, fr);
  }
}

if (typeof SIMD.int16x8.equal === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @param {int16x8} other An instance of int16x8.
    * @return {int16x8} true or false in each lane depending on
    * the result of t == other.
    */
  SIMD.int16x8.equal = function(t, other) {
    t = SIMD.int16x8.check(t);
    other = SIMD.int16x8.check(other);
    var cs0 =
        SIMD.int16x8.extractLane(t, 0) == SIMD.int16x8.extractLane(other, 0);
    var cs1 =
        SIMD.int16x8.extractLane(t, 1) == SIMD.int16x8.extractLane(other, 1);
    var cs2 =
        SIMD.int16x8.extractLane(t, 2) == SIMD.int16x8.extractLane(other, 2);
    var cs3 =
        SIMD.int16x8.extractLane(t, 3) == SIMD.int16x8.extractLane(other, 3);
    var cs4 =
        SIMD.int16x8.extractLane(t, 4) == SIMD.int16x8.extractLane(other, 4);
    var cs5 =
        SIMD.int16x8.extractLane(t, 5) == SIMD.int16x8.extractLane(other, 5);
    var cs6 =
        SIMD.int16x8.extractLane(t, 6) == SIMD.int16x8.extractLane(other, 6);
    var cs7 =
        SIMD.int16x8.extractLane(t, 7) == SIMD.int16x8.extractLane(other, 7);
    return SIMD.int16x8.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
  }
}

if (typeof SIMD.int16x8.notEqual === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @param {int16x8} other An instance of int16x8.
    * @return {int16x8} true or false in each lane depending on
    * the result of t != other.
    */
  SIMD.int16x8.notEqual = function(t, other) {
    t = SIMD.int16x8.check(t);
    other = SIMD.int16x8.check(other);
    var cs0 =
        SIMD.int16x8.extractLane(t, 0) != SIMD.int16x8.extractLane(other, 0);
    var cs1 =
        SIMD.int16x8.extractLane(t, 1) != SIMD.int16x8.extractLane(other, 1);
    var cs2 =
        SIMD.int16x8.extractLane(t, 2) != SIMD.int16x8.extractLane(other, 2);
    var cs3 =
        SIMD.int16x8.extractLane(t, 3) != SIMD.int16x8.extractLane(other, 3);
    var cs4 =
        SIMD.int16x8.extractLane(t, 4) != SIMD.int16x8.extractLane(other, 4);
    var cs5 =
        SIMD.int16x8.extractLane(t, 5) != SIMD.int16x8.extractLane(other, 5);
    var cs6 =
        SIMD.int16x8.extractLane(t, 6) != SIMD.int16x8.extractLane(other, 6);
    var cs7 =
        SIMD.int16x8.extractLane(t, 7) != SIMD.int16x8.extractLane(other, 7);
    return SIMD.int16x8.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
  }
}

if (typeof SIMD.int16x8.greaterThan === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @param {int16x8} other An instance of int16x8.
    * @return {int16x8} true or false in each lane depending on
    * the result of t > other.
    */
  SIMD.int16x8.greaterThan = function(t, other) {
    t = SIMD.int16x8.check(t);
    other = SIMD.int16x8.check(other);
    var cs0 =
        SIMD.int16x8.extractLane(t, 0) > SIMD.int16x8.extractLane(other, 0);
    var cs1 =
        SIMD.int16x8.extractLane(t, 1) > SIMD.int16x8.extractLane(other, 1);
    var cs2 =
        SIMD.int16x8.extractLane(t, 2) > SIMD.int16x8.extractLane(other, 2);
    var cs3 =
        SIMD.int16x8.extractLane(t, 3) > SIMD.int16x8.extractLane(other, 3);
    var cs4 =
        SIMD.int16x8.extractLane(t, 4) > SIMD.int16x8.extractLane(other, 4);
    var cs5 =
        SIMD.int16x8.extractLane(t, 5) > SIMD.int16x8.extractLane(other, 5);
    var cs6 =
        SIMD.int16x8.extractLane(t, 6) > SIMD.int16x8.extractLane(other, 6);
    var cs7 =
        SIMD.int16x8.extractLane(t, 7) > SIMD.int16x8.extractLane(other, 7);
    return SIMD.int16x8.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
  }
}

if (typeof SIMD.int16x8.greaterThanOrEqual === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @param {int16x8} other An instance of int16x8.
    * @return {int16x8} true or false in each lane depending on
    * the result of t >= other.
    */
  SIMD.int16x8.greaterThanOrEqual = function(t, other) {
    t = SIMD.int16x8.check(t);
    other = SIMD.int16x8.check(other);
    var cs0 =
        SIMD.int16x8.extractLane(t, 0) >= SIMD.int16x8.extractLane(other, 0);
    var cs1 =
        SIMD.int16x8.extractLane(t, 1) >= SIMD.int16x8.extractLane(other, 1);
    var cs2 =
        SIMD.int16x8.extractLane(t, 2) >= SIMD.int16x8.extractLane(other, 2);
    var cs3 =
        SIMD.int16x8.extractLane(t, 3) >= SIMD.int16x8.extractLane(other, 3);
    var cs4 =
        SIMD.int16x8.extractLane(t, 4) >= SIMD.int16x8.extractLane(other, 4);
    var cs5 =
        SIMD.int16x8.extractLane(t, 5) >= SIMD.int16x8.extractLane(other, 5);
    var cs6 =
        SIMD.int16x8.extractLane(t, 6) >= SIMD.int16x8.extractLane(other, 6);
    var cs7 =
        SIMD.int16x8.extractLane(t, 7) >= SIMD.int16x8.extractLane(other, 7);
    return SIMD.int16x8.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
  }
}

if (typeof SIMD.int16x8.lessThan === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @param {int16x8} other An instance of int16x8.
    * @return {int16x8} true or false in each lane depending on
    * the result of t < other.
    */
  SIMD.int16x8.lessThan = function(t, other) {
    t = SIMD.int16x8.check(t);
    other = SIMD.int16x8.check(other);
    var cs0 =
        SIMD.int16x8.extractLane(t, 0) < SIMD.int16x8.extractLane(other, 0);
    var cs1 =
        SIMD.int16x8.extractLane(t, 1) < SIMD.int16x8.extractLane(other, 1);
    var cs2 =
        SIMD.int16x8.extractLane(t, 2) < SIMD.int16x8.extractLane(other, 2);
    var cs3 =
        SIMD.int16x8.extractLane(t, 3) < SIMD.int16x8.extractLane(other, 3);
    var cs4 =
        SIMD.int16x8.extractLane(t, 4) < SIMD.int16x8.extractLane(other, 4);
    var cs5 =
        SIMD.int16x8.extractLane(t, 5) < SIMD.int16x8.extractLane(other, 5);
    var cs6 =
        SIMD.int16x8.extractLane(t, 6) < SIMD.int16x8.extractLane(other, 6);
    var cs7 =
        SIMD.int16x8.extractLane(t, 7) < SIMD.int16x8.extractLane(other, 7);
    return SIMD.int16x8.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
  }
}

if (typeof SIMD.int16x8.lessThanOrEqual === "undefined") {
  /**
    * @param {int16x8} t An instance of int16x8.
    * @param {int16x8} other An instance of int16x8.
    * @return {int16x8} true or false in each lane depending on
    * the result of t <= other.
    */
  SIMD.int16x8.lessThanOrEqual = function(t, other) {
    t = SIMD.int16x8.check(t);
    other = SIMD.int16x8.check(other);
    var cs0 =
        SIMD.int16x8.extractLane(t, 0) <= SIMD.int16x8.extractLane(other, 0);
    var cs1 =
        SIMD.int16x8.extractLane(t, 1) <= SIMD.int16x8.extractLane(other, 1);
    var cs2 =
        SIMD.int16x8.extractLane(t, 2) <= SIMD.int16x8.extractLane(other, 2);
    var cs3 =
        SIMD.int16x8.extractLane(t, 3) <= SIMD.int16x8.extractLane(other, 3);
    var cs4 =
        SIMD.int16x8.extractLane(t, 4) <= SIMD.int16x8.extractLane(other, 4);
    var cs5 =
        SIMD.int16x8.extractLane(t, 5) <= SIMD.int16x8.extractLane(other, 5);
    var cs6 =
        SIMD.int16x8.extractLane(t, 6) <= SIMD.int16x8.extractLane(other, 6);
    var cs7 =
        SIMD.int16x8.extractLane(t, 7) <= SIMD.int16x8.extractLane(other, 7);
    return SIMD.int16x8.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
  }
}

if (typeof SIMD.int16x8.shiftLeftByScalar === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {integer} bits Bit count to shift by.
    * @return {int16x8} lanes in a shifted by bits.
    */
  SIMD.int16x8.shiftLeftByScalar = function(a, bits) {
    a = SIMD.int16x8.check(a);
    if (bits>>>0 > 16)
      bits = 16;
    var s0 = SIMD.int16x8.extractLane(a, 0) << bits;
    var s1 = SIMD.int16x8.extractLane(a, 1) << bits;
    var s2 = SIMD.int16x8.extractLane(a, 2) << bits;
    var s3 = SIMD.int16x8.extractLane(a, 3) << bits;
    var s4 = SIMD.int16x8.extractLane(a, 4) << bits;
    var s5 = SIMD.int16x8.extractLane(a, 5) << bits;
    var s6 = SIMD.int16x8.extractLane(a, 6) << bits;
    var s7 = SIMD.int16x8.extractLane(a, 7) << bits;
    return SIMD.int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
  }
}

if (typeof SIMD.int16x8.shiftRightLogicalByScalar === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {integer} bits Bit count to shift by.
    * @return {int16x8} lanes in a shifted by bits.
    */
  SIMD.int16x8.shiftRightLogicalByScalar = function(a, bits) {
    a = SIMD.int16x8.check(a);
    if (bits>>>0 > 16)
      bits = 16;
    var s0 = (SIMD.int16x8.extractLane(a, 0) & 0xffff) >>> bits;
    var s1 = (SIMD.int16x8.extractLane(a, 1) & 0xffff) >>> bits;
    var s2 = (SIMD.int16x8.extractLane(a, 2) & 0xffff) >>> bits;
    var s3 = (SIMD.int16x8.extractLane(a, 3) & 0xffff) >>> bits;
    var s4 = (SIMD.int16x8.extractLane(a, 4) & 0xffff) >>> bits;
    var s5 = (SIMD.int16x8.extractLane(a, 5) & 0xffff) >>> bits;
    var s6 = (SIMD.int16x8.extractLane(a, 6) & 0xffff) >>> bits;
    var s7 = (SIMD.int16x8.extractLane(a, 7) & 0xffff) >>> bits;
    return SIMD.int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
  }
}

if (typeof SIMD.int16x8.shiftRightArithmeticByScalar === "undefined") {
  /**
    * @param {int16x8} a An instance of int16x8.
    * @param {integer} bits Bit count to shift by.
    * @return {int16x8} lanes in a shifted by bits.
    */
  SIMD.int16x8.shiftRightArithmeticByScalar = function(a, bits) {
    a = SIMD.int16x8.check(a);
    if (bits>>>0 > 16)
      bits = 16;
    var s0 = SIMD.int16x8.extractLane(a, 0) >> bits;
    var s1 = SIMD.int16x8.extractLane(a, 1) >> bits;
    var s2 = SIMD.int16x8.extractLane(a, 2) >> bits;
    var s3 = SIMD.int16x8.extractLane(a, 3) >> bits;
    var s4 = SIMD.int16x8.extractLane(a, 4) >> bits;
    var s5 = SIMD.int16x8.extractLane(a, 5) >> bits;
    var s6 = SIMD.int16x8.extractLane(a, 6) >> bits;
    var s7 = SIMD.int16x8.extractLane(a, 7) >> bits;
    return SIMD.int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
  }
}

if (typeof SIMD.int16x8.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {int16x8} New instance of int16x8.
    */
  SIMD.int16x8.load = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var i16temp = _i16x8;
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? i16temp :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.int16x8(i16temp[0], i16temp[1], i16temp[2], i16temp[3],
                        i16temp[4], i16temp[5], i16temp[6], i16temp[7]);
  }
}

if (typeof SIMD.int16x8.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {int16x8} value An instance of int16x8.
    * @return {void}
    */
  SIMD.int16x8.store = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.int16x8.check(value);
    _i16x8[0] = SIMD.int16x8.extractLane(value, 0);
    _i16x8[1] = SIMD.int16x8.extractLane(value, 1);
    _i16x8[2] = SIMD.int16x8.extractLane(value, 2);
    _i16x8[3] = SIMD.int16x8.extractLane(value, 3);
    _i16x8[4] = SIMD.int16x8.extractLane(value, 4);
    _i16x8[5] = SIMD.int16x8.extractLane(value, 5);
    _i16x8[6] = SIMD.int16x8.extractLane(value, 6);
    _i16x8[7] = SIMD.int16x8.extractLane(value, 7);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

if (typeof SIMD.int8x16.and === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of a & b.
    */
  SIMD.int8x16.and = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    return SIMD.int8x16(
        SIMD.int8x16.extractLane(a, 0) & SIMD.int8x16.extractLane(b, 0),
        SIMD.int8x16.extractLane(a, 1) & SIMD.int8x16.extractLane(b, 1),
        SIMD.int8x16.extractLane(a, 2) & SIMD.int8x16.extractLane(b, 2),
        SIMD.int8x16.extractLane(a, 3) & SIMD.int8x16.extractLane(b, 3),
        SIMD.int8x16.extractLane(a, 4) & SIMD.int8x16.extractLane(b, 4),
        SIMD.int8x16.extractLane(a, 5) & SIMD.int8x16.extractLane(b, 5),
        SIMD.int8x16.extractLane(a, 6) & SIMD.int8x16.extractLane(b, 6),
        SIMD.int8x16.extractLane(a, 7) & SIMD.int8x16.extractLane(b, 7),
        SIMD.int8x16.extractLane(a, 8) & SIMD.int8x16.extractLane(b, 8),
        SIMD.int8x16.extractLane(a, 9) & SIMD.int8x16.extractLane(b, 9),
        SIMD.int8x16.extractLane(a, 10) & SIMD.int8x16.extractLane(b, 10),
        SIMD.int8x16.extractLane(a, 11) & SIMD.int8x16.extractLane(b, 11),
        SIMD.int8x16.extractLane(a, 12) & SIMD.int8x16.extractLane(b, 12),
        SIMD.int8x16.extractLane(a, 13) & SIMD.int8x16.extractLane(b, 13),
        SIMD.int8x16.extractLane(a, 14) & SIMD.int8x16.extractLane(b, 14),
        SIMD.int8x16.extractLane(a, 15) & SIMD.int8x16.extractLane(b, 15));
  }
}

if (typeof SIMD.int8x16.or === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of a | b.
    */
  SIMD.int8x16.or = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    return SIMD.int8x16(
        SIMD.int8x16.extractLane(a, 0) | SIMD.int8x16.extractLane(b, 0),
        SIMD.int8x16.extractLane(a, 1) | SIMD.int8x16.extractLane(b, 1),
        SIMD.int8x16.extractLane(a, 2) | SIMD.int8x16.extractLane(b, 2),
        SIMD.int8x16.extractLane(a, 3) | SIMD.int8x16.extractLane(b, 3),
        SIMD.int8x16.extractLane(a, 4) | SIMD.int8x16.extractLane(b, 4),
        SIMD.int8x16.extractLane(a, 5) | SIMD.int8x16.extractLane(b, 5),
        SIMD.int8x16.extractLane(a, 6) | SIMD.int8x16.extractLane(b, 6),
        SIMD.int8x16.extractLane(a, 7) | SIMD.int8x16.extractLane(b, 7),
        SIMD.int8x16.extractLane(a, 8) | SIMD.int8x16.extractLane(b, 8),
        SIMD.int8x16.extractLane(a, 9) | SIMD.int8x16.extractLane(b, 9),
        SIMD.int8x16.extractLane(a, 10) | SIMD.int8x16.extractLane(b, 10),
        SIMD.int8x16.extractLane(a, 11) | SIMD.int8x16.extractLane(b, 11),
        SIMD.int8x16.extractLane(a, 12) | SIMD.int8x16.extractLane(b, 12),
        SIMD.int8x16.extractLane(a, 13) | SIMD.int8x16.extractLane(b, 13),
        SIMD.int8x16.extractLane(a, 14) | SIMD.int8x16.extractLane(b, 14),
        SIMD.int8x16.extractLane(a, 15) | SIMD.int8x16.extractLane(b, 15));
  }
}

if (typeof SIMD.int8x16.xor === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of a ^ b.
    */
  SIMD.int8x16.xor = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    return SIMD.int8x16(
        SIMD.int8x16.extractLane(a, 0) ^ SIMD.int8x16.extractLane(b, 0),
        SIMD.int8x16.extractLane(a, 1) ^ SIMD.int8x16.extractLane(b, 1),
        SIMD.int8x16.extractLane(a, 2) ^ SIMD.int8x16.extractLane(b, 2),
        SIMD.int8x16.extractLane(a, 3) ^ SIMD.int8x16.extractLane(b, 3),
        SIMD.int8x16.extractLane(a, 4) ^ SIMD.int8x16.extractLane(b, 4),
        SIMD.int8x16.extractLane(a, 5) ^ SIMD.int8x16.extractLane(b, 5),
        SIMD.int8x16.extractLane(a, 6) ^ SIMD.int8x16.extractLane(b, 6),
        SIMD.int8x16.extractLane(a, 7) ^ SIMD.int8x16.extractLane(b, 7),
        SIMD.int8x16.extractLane(a, 8) ^ SIMD.int8x16.extractLane(b, 8),
        SIMD.int8x16.extractLane(a, 9) ^ SIMD.int8x16.extractLane(b, 9),
        SIMD.int8x16.extractLane(a, 10) ^ SIMD.int8x16.extractLane(b, 10),
        SIMD.int8x16.extractLane(a, 11) ^ SIMD.int8x16.extractLane(b, 11),
        SIMD.int8x16.extractLane(a, 12) ^ SIMD.int8x16.extractLane(b, 12),
        SIMD.int8x16.extractLane(a, 13) ^ SIMD.int8x16.extractLane(b, 13),
        SIMD.int8x16.extractLane(a, 14) ^ SIMD.int8x16.extractLane(b, 14),
        SIMD.int8x16.extractLane(a, 15) ^ SIMD.int8x16.extractLane(b, 15));
  }
}

if (typeof SIMD.int8x16.not === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of ~t
    */
  SIMD.int8x16.not = function(t) {
    t = SIMD.int8x16.check(t);
    return SIMD.int8x16(~SIMD.int8x16.extractLane(t, 0),
                        ~SIMD.int8x16.extractLane(t, 1),
                        ~SIMD.int8x16.extractLane(t, 2),
                        ~SIMD.int8x16.extractLane(t, 3),
                        ~SIMD.int8x16.extractLane(t, 4),
                        ~SIMD.int8x16.extractLane(t, 5),
                        ~SIMD.int8x16.extractLane(t, 6),
                        ~SIMD.int8x16.extractLane(t, 7),
                        ~SIMD.int8x16.extractLane(t, 8),
                        ~SIMD.int8x16.extractLane(t, 9),
                        ~SIMD.int8x16.extractLane(t, 10),
                        ~SIMD.int8x16.extractLane(t, 11),
                        ~SIMD.int8x16.extractLane(t, 12),
                        ~SIMD.int8x16.extractLane(t, 13),
                        ~SIMD.int8x16.extractLane(t, 14),
                        ~SIMD.int8x16.extractLane(t, 15));
  }
}

if (typeof SIMD.int8x16.neg === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of -t
    */
  SIMD.int8x16.neg = function(t) {
    t = SIMD.int8x16.check(t);
    return SIMD.int8x16(-SIMD.int8x16.extractLane(t, 0),
                        -SIMD.int8x16.extractLane(t, 1),
                        -SIMD.int8x16.extractLane(t, 2),
                        -SIMD.int8x16.extractLane(t, 3),
                        -SIMD.int8x16.extractLane(t, 4),
                        -SIMD.int8x16.extractLane(t, 5),
                        -SIMD.int8x16.extractLane(t, 6),
                        -SIMD.int8x16.extractLane(t, 7),
                        -SIMD.int8x16.extractLane(t, 8),
                        -SIMD.int8x16.extractLane(t, 9),
                        -SIMD.int8x16.extractLane(t, 10),
                        -SIMD.int8x16.extractLane(t, 11),
                        -SIMD.int8x16.extractLane(t, 12),
                        -SIMD.int8x16.extractLane(t, 13),
                        -SIMD.int8x16.extractLane(t, 14),
                        -SIMD.int8x16.extractLane(t, 15));
  }
}

if (typeof SIMD.int8x16.add === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of a + b.
    */
  SIMD.int8x16.add = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    return SIMD.int8x16(
        SIMD.int8x16.extractLane(a, 0) + SIMD.int8x16.extractLane(b, 0),
        SIMD.int8x16.extractLane(a, 1) + SIMD.int8x16.extractLane(b, 1),
        SIMD.int8x16.extractLane(a, 2) + SIMD.int8x16.extractLane(b, 2),
        SIMD.int8x16.extractLane(a, 3) + SIMD.int8x16.extractLane(b, 3),
        SIMD.int8x16.extractLane(a, 4) + SIMD.int8x16.extractLane(b, 4),
        SIMD.int8x16.extractLane(a, 5) + SIMD.int8x16.extractLane(b, 5),
        SIMD.int8x16.extractLane(a, 6) + SIMD.int8x16.extractLane(b, 6),
        SIMD.int8x16.extractLane(a, 7) + SIMD.int8x16.extractLane(b, 7),
        SIMD.int8x16.extractLane(a, 8) + SIMD.int8x16.extractLane(b, 8),
        SIMD.int8x16.extractLane(a, 9) + SIMD.int8x16.extractLane(b, 9),
        SIMD.int8x16.extractLane(a, 10) + SIMD.int8x16.extractLane(b, 10),
        SIMD.int8x16.extractLane(a, 11) + SIMD.int8x16.extractLane(b, 11),
        SIMD.int8x16.extractLane(a, 12) + SIMD.int8x16.extractLane(b, 12),
        SIMD.int8x16.extractLane(a, 13) + SIMD.int8x16.extractLane(b, 13),
        SIMD.int8x16.extractLane(a, 14) + SIMD.int8x16.extractLane(b, 14),
        SIMD.int8x16.extractLane(a, 15) + SIMD.int8x16.extractLane(b, 15));
  }
}

if (typeof SIMD.int8x16.sub === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of a - b.
    */
  SIMD.int8x16.sub = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    return SIMD.int8x16(
        SIMD.int8x16.extractLane(a, 0) - SIMD.int8x16.extractLane(b, 0),
        SIMD.int8x16.extractLane(a, 1) - SIMD.int8x16.extractLane(b, 1),
        SIMD.int8x16.extractLane(a, 2) - SIMD.int8x16.extractLane(b, 2),
        SIMD.int8x16.extractLane(a, 3) - SIMD.int8x16.extractLane(b, 3),
        SIMD.int8x16.extractLane(a, 4) - SIMD.int8x16.extractLane(b, 4),
        SIMD.int8x16.extractLane(a, 5) - SIMD.int8x16.extractLane(b, 5),
        SIMD.int8x16.extractLane(a, 6) - SIMD.int8x16.extractLane(b, 6),
        SIMD.int8x16.extractLane(a, 7) - SIMD.int8x16.extractLane(b, 7),
        SIMD.int8x16.extractLane(a, 8) - SIMD.int8x16.extractLane(b, 8),
        SIMD.int8x16.extractLane(a, 9) - SIMD.int8x16.extractLane(b, 9),
        SIMD.int8x16.extractLane(a, 10) - SIMD.int8x16.extractLane(b, 10),
        SIMD.int8x16.extractLane(a, 11) - SIMD.int8x16.extractLane(b, 11),
        SIMD.int8x16.extractLane(a, 12) - SIMD.int8x16.extractLane(b, 12),
        SIMD.int8x16.extractLane(a, 13) - SIMD.int8x16.extractLane(b, 13),
        SIMD.int8x16.extractLane(a, 14) - SIMD.int8x16.extractLane(b, 14),
        SIMD.int8x16.extractLane(a, 15) - SIMD.int8x16.extractLane(b, 15));
  }
}

if (typeof SIMD.int8x16.mul === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of a * b.
    */
  SIMD.int8x16.mul = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    return SIMD.int8x16(Math.imul(SIMD.int8x16.extractLane(a, 0),
                                  SIMD.int8x16.extractLane(b, 0)),
                        Math.imul(SIMD.int8x16.extractLane(a, 1),
                                  SIMD.int8x16.extractLane(b, 1)),
                        Math.imul(SIMD.int8x16.extractLane(a, 2),
                                  SIMD.int8x16.extractLane(b, 2)),
                        Math.imul(SIMD.int8x16.extractLane(a, 3),
                                  SIMD.int8x16.extractLane(b, 3)),
                        Math.imul(SIMD.int8x16.extractLane(a, 4),
                                  SIMD.int8x16.extractLane(b, 4)),
                        Math.imul(SIMD.int8x16.extractLane(a, 5),
                                  SIMD.int8x16.extractLane(b, 5)),
                        Math.imul(SIMD.int8x16.extractLane(a, 6),
                                  SIMD.int8x16.extractLane(b, 6)),
                        Math.imul(SIMD.int8x16.extractLane(a, 7),
                                  SIMD.int8x16.extractLane(b, 7)),
                        Math.imul(SIMD.int8x16.extractLane(a, 8),
                                  SIMD.int8x16.extractLane(b, 8)),
                        Math.imul(SIMD.int8x16.extractLane(a, 9),
                                  SIMD.int8x16.extractLane(b, 9)),
                        Math.imul(SIMD.int8x16.extractLane(a, 10),
                                  SIMD.int8x16.extractLane(b, 10)),
                        Math.imul(SIMD.int8x16.extractLane(a, 11),
                                  SIMD.int8x16.extractLane(b, 11)),
                        Math.imul(SIMD.int8x16.extractLane(a, 12),
                                  SIMD.int8x16.extractLane(b, 12)),
                        Math.imul(SIMD.int8x16.extractLane(a, 13),
                                  SIMD.int8x16.extractLane(b, 13)),
                        Math.imul(SIMD.int8x16.extractLane(a, 14),
                                  SIMD.int8x16.extractLane(b, 14)),
                        Math.imul(SIMD.int8x16.extractLane(a, 15),
                                  SIMD.int8x16.extractLane(b, 15)));
  }
}

if (typeof SIMD.int8x16.swizzle === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16 to be swizzled.
    * @param {integer} s0 - Index in t for lane s0
    * @param {integer} s1 - Index in t for lane s1
    * @param {integer} s2 - Index in t for lane s2
    * @param {integer} s3 - Index in t for lane s3
    * @param {integer} s4 - Index in t for lane s4
    * @param {integer} s5 - Index in t for lane s5
    * @param {integer} s6 - Index in t for lane s6
    * @param {integer} s7 - Index in t for lane s7
    * @param {integer} s8 - Index in t for lane s8
    * @param {integer} s9 - Index in t for lane s9
    * @param {integer} s10 - Index in t for lane s10
    * @param {integer} s11 - Index in t for lane s11
    * @param {integer} s12 - Index in t for lane s12
    * @param {integer} s13 - Index in t for lane s13
    * @param {integer} s14 - Index in t for lane s14
    * @param {integer} s15 - Index in t for lane s15
    * @return {int8x16} New instance of int8x16 with lanes swizzled.
    */
  SIMD.int8x16.swizzle = function(t, s0, s1, s2, s3, s4, s5, s6, s7,
                                     s8, s9, s10, s11, s12, s13, s14, s15) {
    t = SIMD.int8x16.check(t);
    var check = checkLaneIndex(16);
    check(s0);
    check(s1);
    check(s2);
    check(s3);
    check(s4);
    check(s5);
    check(s6);
    check(s7);
    check(s8);
    check(s9);
    check(s10);
    check(s11);
    check(s12);
    check(s13);
    check(s14);
    check(s15);
    var storage = _i8x16;
    storage[0] = SIMD.int8x16.extractLane(t, 0);
    storage[1] = SIMD.int8x16.extractLane(t, 1);
    storage[2] = SIMD.int8x16.extractLane(t, 2);
    storage[3] = SIMD.int8x16.extractLane(t, 3);
    storage[4] = SIMD.int8x16.extractLane(t, 4);
    storage[5] = SIMD.int8x16.extractLane(t, 5);
    storage[6] = SIMD.int8x16.extractLane(t, 6);
    storage[7] = SIMD.int8x16.extractLane(t, 7);
    storage[8] = SIMD.int8x16.extractLane(t, 8);
    storage[9] = SIMD.int8x16.extractLane(t, 9);
    storage[10] = SIMD.int8x16.extractLane(t, 10);
    storage[11] = SIMD.int8x16.extractLane(t, 11);
    storage[12] = SIMD.int8x16.extractLane(t, 12);
    storage[13] = SIMD.int8x16.extractLane(t, 13);
    storage[14] = SIMD.int8x16.extractLane(t, 14);
    storage[15] = SIMD.int8x16.extractLane(t, 15);
    return SIMD.int8x16(storage[s0], storage[s1], storage[s2], storage[s3],
                        storage[s4], storage[s5], storage[s6], storage[s7],
                        storage[s8], storage[s9], storage[s10], storage[s11],
                        storage[s12], storage[s13], storage[s14], storage[s15]);
  }
}

if (typeof SIMD.int8x16.shuffle === "undefined") {

  _i8x32 = new Int8Array(32);

  /**
    * @param {int8x16} t0 An instance of int8x16 to be shuffled.
    * @param {int8x16} t1 An instance of int8x16 to be shuffled.
    * @param {integer} s0 - Index in concatenation of t0 and t1 for lane s0
    * @param {integer} s1 - Index in concatenation of t0 and t1 for lane s1
    * @param {integer} s2 - Index in concatenation of t0 and t1 for lane s2
    * @param {integer} s3 - Index in concatenation of t0 and t1 for lane s3
    * @param {integer} s4 - Index in concatenation of t0 and t1 for lane s4
    * @param {integer} s5 - Index in concatenation of t0 and t1 for lane s5
    * @param {integer} s6 - Index in concatenation of t0 and t1 for lane s6
    * @param {integer} s7 - Index in concatenation of t0 and t1 for lane s7
    * @param {integer} s8 - Index in concatenation of t0 and t1 for lane s8
    * @param {integer} s9 - Index in concatenation of t0 and t1 for lane s9
    * @param {integer} s10 - Index in concatenation of t0 and t1 for lane s10
    * @param {integer} s11 - Index in concatenation of t0 and t1 for lane s11
    * @param {integer} s12 - Index in concatenation of t0 and t1 for lane s12
    * @param {integer} s13 - Index in concatenation of t0 and t1 for lane s13
    * @param {integer} s14 - Index in concatenation of t0 and t1 for lane s14
    * @param {integer} s15 - Index in concatenation of t0 and t1 for lane s15
    * @return {int8x16} New instance of int8x16 with lanes shuffled.
    */
  SIMD.int8x16.shuffle = function(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7,
                                          s8, s9, s10, s11, s12, s13, s14, s15) {
    t0 = SIMD.int8x16.check(t0);
    t1 = SIMD.int8x16.check(t1);
    var check = checkLaneIndex(32);
    check(s0);
    check(s1);
    check(s2);
    check(s3);
    check(s4);
    check(s5);
    check(s6);
    check(s7);
    check(s8);
    check(s9);
    check(s10);
    check(s11);
    check(s12);
    check(s13);
    check(s14);
    check(s15);
    var storage = _i8x32;
    storage[0] = SIMD.int8x16.extractLane(t0, 0);
    storage[1] = SIMD.int8x16.extractLane(t0, 1);
    storage[2] = SIMD.int8x16.extractLane(t0, 2);
    storage[3] = SIMD.int8x16.extractLane(t0, 3);
    storage[4] = SIMD.int8x16.extractLane(t0, 4);
    storage[5] = SIMD.int8x16.extractLane(t0, 5);
    storage[6] = SIMD.int8x16.extractLane(t0, 6);
    storage[7] = SIMD.int8x16.extractLane(t0, 7);
    storage[8] = SIMD.int8x16.extractLane(t0, 8);
    storage[9] = SIMD.int8x16.extractLane(t0, 9);
    storage[10] = SIMD.int8x16.extractLane(t0, 10);
    storage[11] = SIMD.int8x16.extractLane(t0, 11);
    storage[12] = SIMD.int8x16.extractLane(t0, 12);
    storage[13] = SIMD.int8x16.extractLane(t0, 13);
    storage[14] = SIMD.int8x16.extractLane(t0, 14);
    storage[15] = SIMD.int8x16.extractLane(t0, 15);
    storage[16] = SIMD.int8x16.extractLane(t1, 0);
    storage[17] = SIMD.int8x16.extractLane(t1, 1);
    storage[18] = SIMD.int8x16.extractLane(t1, 2);
    storage[19] = SIMD.int8x16.extractLane(t1, 3);
    storage[20] = SIMD.int8x16.extractLane(t1, 4);
    storage[21] = SIMD.int8x16.extractLane(t1, 5);
    storage[22] = SIMD.int8x16.extractLane(t1, 6);
    storage[23] = SIMD.int8x16.extractLane(t1, 7);
    storage[24] = SIMD.int8x16.extractLane(t1, 8);
    storage[25] = SIMD.int8x16.extractLane(t1, 9);
    storage[26] = SIMD.int8x16.extractLane(t1, 10);
    storage[27] = SIMD.int8x16.extractLane(t1, 11);
    storage[28] = SIMD.int8x16.extractLane(t1, 12);
    storage[29] = SIMD.int8x16.extractLane(t1, 13);
    storage[30] = SIMD.int8x16.extractLane(t1, 14);
    storage[31] = SIMD.int8x16.extractLane(t1, 15);
    return SIMD.int8x16(storage[s0], storage[s1], storage[s2], storage[s3],
                        storage[s4], storage[s5], storage[s6], storage[s7],
                        storage[s8], storage[s9], storage[s10], storage[s11],
                        storage[s12], storage[s13], storage[s14], storage[s15]);
  }
}

if (typeof SIMD.int8x16.addSaturate === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of a + b with
    * signed saturating behavior on overflow.
    */
  SIMD.int8x16.addSaturate = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    var c = SIMD.int8x16.add(a, b);
    var max = SIMD.int8x16.splat(0x7f);
    var min = SIMD.int8x16.splat(0x80);
    var mask = SIMD.int8x16.lessThan(c, a);
    return SIMD.int8x16.select(SIMD.int8x16.and(mask, SIMD.int8x16.not(b)), max,
             SIMD.int8x16.select(SIMD.int8x16.and(SIMD.int8x16.not(mask), b), min,
               c));
  }
}

if (typeof SIMD.int8x16.subSaturating === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {int8x16} New instance of int8x16 with values of a - b with
    * signed saturating behavior on overflow.
    */
  SIMD.int8x16.subSaturating = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    var c = SIMD.int8x16.sub(a, b);
    var max = SIMD.int8x16.splat(0x7f);
    var min = SIMD.int8x16.splat(0x80);
    var mask = SIMD.int8x16.greaterThan(c, a);
    return SIMD.int8x16.select(SIMD.int8x16.and(mask, SIMD.int8x16.not(b)), min,
             SIMD.int8x16.select(SIMD.int8x16.and(SIMD.int8x16.not(mask), b), max,
               c));
  }
}

if (typeof SIMD.int8x16.sumOfAbsoluteDifferences === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {int8x16} b An instance of int8x16.
    * @return {Number} The sum of the absolute differences (SAD) of the
    * corresponding elements of a and b.
    */
  SIMD.int8x16.sumOfAbsoluteDifferences = function(a, b) {
    a = SIMD.int8x16.check(a);
    b = SIMD.int8x16.check(b);
    return Math.abs(
        SIMD.int8x16.extractLane(a, 0) - SIMD.int8x16.extractLane(b, 0)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 1) - SIMD.int8x16.extractLane(b, 1)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 2) - SIMD.int8x16.extractLane(b, 2)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 3) - SIMD.int8x16.extractLane(b, 3)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 4) - SIMD.int8x16.extractLane(b, 4)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 5) - SIMD.int8x16.extractLane(b, 5)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 6) - SIMD.int8x16.extractLane(b, 6)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 7) - SIMD.int8x16.extractLane(b, 7)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 8) - SIMD.int8x16.extractLane(b, 8)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 9) - SIMD.int8x16.extractLane(b, 9)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 10) - SIMD.int8x16.extractLane(b, 10)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 11) - SIMD.int8x16.extractLane(b, 11)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 12) - SIMD.int8x16.extractLane(b, 12)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 13) - SIMD.int8x16.extractLane(b, 13)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 14) - SIMD.int8x16.extractLane(b, 14)) +
        Math.abs(
            SIMD.int8x16.extractLane(a, 15) - SIMD.int8x16.extractLane(b, 15));
  }
}

if (typeof SIMD.int8x16.select === "undefined") {
  /**
    * @param {int8x16} t Selector mask. An instance of int8x16
    * @param {int8x16} trueValue Pick lane from here if corresponding
    * selector lane is true
    * @param {int8x16} falseValue Pick lane from here if corresponding
    * selector lane is false
    * @return {int8x16} Mix of lanes from trueValue or falseValue as
    * indicated
    */
  SIMD.int8x16.select = function(t, trueValue, falseValue) {
    t = SIMD.int8x16.check(t);
    trueValue = SIMD.int8x16.check(trueValue);
    falseValue = SIMD.int8x16.check(falseValue);
    return SIMD.int8x16(
        toBool(SIMD.int8x16.extractLane(t, 0)) ?
            SIMD.int8x16.extractLane(trueValue, 0) :
                SIMD.int8x16.extractLane(falseValue, 0),
        toBool(SIMD.int8x16.extractLane(t, 1)) ?
            SIMD.int8x16.extractLane(trueValue, 1) :
                SIMD.int8x16.extractLane(falseValue, 1),
        toBool(SIMD.int8x16.extractLane(t, 2)) ?
            SIMD.int8x16.extractLane(trueValue, 2) :
                SIMD.int8x16.extractLane(falseValue, 2),
        toBool(SIMD.int8x16.extractLane(t, 3)) ?
            SIMD.int8x16.extractLane(trueValue, 3) :
                SIMD.int8x16.extractLane(falseValue, 3),
        toBool(SIMD.int8x16.extractLane(t, 4)) ?
            SIMD.int8x16.extractLane(trueValue, 4) :
                SIMD.int8x16.extractLane(falseValue, 4),
        toBool(SIMD.int8x16.extractLane(t, 5)) ?
            SIMD.int8x16.extractLane(trueValue, 5) :
                SIMD.int8x16.extractLane(falseValue, 5),
        toBool(SIMD.int8x16.extractLane(t, 6)) ?
            SIMD.int8x16.extractLane(trueValue, 6) :
                SIMD.int8x16.extractLane(falseValue, 6),
        toBool(SIMD.int8x16.extractLane(t, 7)) ?
            SIMD.int8x16.extractLane(trueValue, 7) :
                SIMD.int8x16.extractLane(falseValue, 7),
        toBool(SIMD.int8x16.extractLane(t, 8)) ?
            SIMD.int8x16.extractLane(trueValue, 8) :
                SIMD.int8x16.extractLane(falseValue, 8),
        toBool(SIMD.int8x16.extractLane(t, 9)) ?
            SIMD.int8x16.extractLane(trueValue, 9) :
                SIMD.int8x16.extractLane(falseValue, 9),
        toBool(SIMD.int8x16.extractLane(t, 10)) ?
            SIMD.int8x16.extractLane(trueValue, 10) :
                SIMD.int8x16.extractLane(falseValue, 10),
        toBool(SIMD.int8x16.extractLane(t, 11)) ?
            SIMD.int8x16.extractLane(trueValue, 11) :
                SIMD.int8x16.extractLane(falseValue, 11),
        toBool(SIMD.int8x16.extractLane(t, 12)) ?
            SIMD.int8x16.extractLane(trueValue, 12) :
                SIMD.int8x16.extractLane(falseValue, 12),
        toBool(SIMD.int8x16.extractLane(t, 13)) ?
            SIMD.int8x16.extractLane(trueValue, 13) :
                SIMD.int8x16.extractLane(falseValue, 13),
        toBool(SIMD.int8x16.extractLane(t, 14)) ?
            SIMD.int8x16.extractLane(trueValue, 14) :
                SIMD.int8x16.extractLane(falseValue, 14),
        toBool(SIMD.int8x16.extractLane(t, 15)) ?
            SIMD.int8x16.extractLane(trueValue, 15) :
                SIMD.int8x16.extractLane(falseValue, 15));
  }
}

if (typeof SIMD.int8x16.bitselect === "undefined") {
  /**
    * @param {int8x16} t Selector mask. An instance of int8x16
    * @param {int8x16} trueValue Pick lane from here if corresponding
    * selector bit is 1
    * @param {int8x16} falseValue Pick lane from here if corresponding
    * selector bit is 0
    * @return {int8x16} Mix of lanes from trueValue or falseValue as
    * indicated
    */
  SIMD.int8x16.bitselect = function(t, trueValue, falseValue) {
    t = SIMD.int8x16.check(t);
    trueValue = SIMD.int8x16.check(trueValue);
    falseValue = SIMD.int8x16.check(falseValue);
    var tr = SIMD.int8x16.and(t, trueValue);
    var fr = SIMD.int8x16.and(SIMD.int8x16.not(t), falseValue);
    return SIMD.int8x16.or(tr, fr);
  }
}

if (typeof SIMD.int8x16.equal === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @param {int8x16} other An instance of int8x16.
    * @return {int8x16} true or false in each lane depending on
    * the result of t == other.
    */
  SIMD.int8x16.equal = function(t, other) {
    t = SIMD.int8x16.check(t);
    other = SIMD.int8x16.check(other);
    var cs0 =
        SIMD.int8x16.extractLane(t, 0) == SIMD.int8x16.extractLane(other, 0);
    var cs1 =
        SIMD.int8x16.extractLane(t, 1) == SIMD.int8x16.extractLane(other, 1);
    var cs2 =
        SIMD.int8x16.extractLane(t, 2) == SIMD.int8x16.extractLane(other, 2);
    var cs3 =
        SIMD.int8x16.extractLane(t, 3) == SIMD.int8x16.extractLane(other, 3);
    var cs4 =
        SIMD.int8x16.extractLane(t, 4) == SIMD.int8x16.extractLane(other, 4);
    var cs5 =
        SIMD.int8x16.extractLane(t, 5) == SIMD.int8x16.extractLane(other, 5);
    var cs6 =
        SIMD.int8x16.extractLane(t, 6) == SIMD.int8x16.extractLane(other, 6);
    var cs7 =
        SIMD.int8x16.extractLane(t, 7) == SIMD.int8x16.extractLane(other, 7);
    var cs8 =
        SIMD.int8x16.extractLane(t, 8) == SIMD.int8x16.extractLane(other, 8);
    var cs9 =
        SIMD.int8x16.extractLane(t, 9) == SIMD.int8x16.extractLane(other, 9);
    var cs10 =
        SIMD.int8x16.extractLane(t, 10) == SIMD.int8x16.extractLane(other, 10);
    var cs11 =
        SIMD.int8x16.extractLane(t, 11) == SIMD.int8x16.extractLane(other, 11);
    var cs12 =
        SIMD.int8x16.extractLane(t, 12) == SIMD.int8x16.extractLane(other, 12);
    var cs13 =
        SIMD.int8x16.extractLane(t, 13) == SIMD.int8x16.extractLane(other, 13);
    var cs14 =
        SIMD.int8x16.extractLane(t, 14) == SIMD.int8x16.extractLane(other, 14);
    var cs15 =
        SIMD.int8x16.extractLane(t, 15) == SIMD.int8x16.extractLane(other, 15);
    return SIMD.int8x16.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7,
                             cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
  }
}

if (typeof SIMD.int8x16.notEqual === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @param {int8x16} other An instance of int8x16.
    * @return {int8x16} true or false in each lane depending on
    * the result of t != other.
    */
  SIMD.int8x16.notEqual = function(t, other) {
    t = SIMD.int8x16.check(t);
    other = SIMD.int8x16.check(other);
    var cs0 =
        SIMD.int8x16.extractLane(t, 0) != SIMD.int8x16.extractLane(other, 0);
    var cs1 =
        SIMD.int8x16.extractLane(t, 1) != SIMD.int8x16.extractLane(other, 1);
    var cs2 =
        SIMD.int8x16.extractLane(t, 2) != SIMD.int8x16.extractLane(other, 2);
    var cs3 =
        SIMD.int8x16.extractLane(t, 3) != SIMD.int8x16.extractLane(other, 3);
    var cs4 =
        SIMD.int8x16.extractLane(t, 4) != SIMD.int8x16.extractLane(other, 4);
    var cs5 =
        SIMD.int8x16.extractLane(t, 5) != SIMD.int8x16.extractLane(other, 5);
    var cs6 =
        SIMD.int8x16.extractLane(t, 6) != SIMD.int8x16.extractLane(other, 6);
    var cs7 =
        SIMD.int8x16.extractLane(t, 7) != SIMD.int8x16.extractLane(other, 7);
    var cs8 =
        SIMD.int8x16.extractLane(t, 8) != SIMD.int8x16.extractLane(other, 8);
    var cs9 =
        SIMD.int8x16.extractLane(t, 9) != SIMD.int8x16.extractLane(other, 9);
    var cs10 =
        SIMD.int8x16.extractLane(t, 10) != SIMD.int8x16.extractLane(other, 10);
    var cs11 =
        SIMD.int8x16.extractLane(t, 11) != SIMD.int8x16.extractLane(other, 11);
    var cs12 =
        SIMD.int8x16.extractLane(t, 12) != SIMD.int8x16.extractLane(other, 12);
    var cs13 =
        SIMD.int8x16.extractLane(t, 13) != SIMD.int8x16.extractLane(other, 13);
    var cs14 =
        SIMD.int8x16.extractLane(t, 14) != SIMD.int8x16.extractLane(other, 14);
    var cs15 =
        SIMD.int8x16.extractLane(t, 15) != SIMD.int8x16.extractLane(other, 15);
    return SIMD.int8x16.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7,
                             cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
  }
}

if (typeof SIMD.int8x16.greaterThan === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @param {int8x16} other An instance of int8x16.
    * @return {int8x16} true or false in each lane depending on
    * the result of t > other.
    */
  SIMD.int8x16.greaterThan = function(t, other) {
    t = SIMD.int8x16.check(t);
    other = SIMD.int8x16.check(other);
    var cs0 =
        SIMD.int8x16.extractLane(t, 0) > SIMD.int8x16.extractLane(other, 0);
    var cs1 =
        SIMD.int8x16.extractLane(t, 1) > SIMD.int8x16.extractLane(other, 1);
    var cs2 =
        SIMD.int8x16.extractLane(t, 2) > SIMD.int8x16.extractLane(other, 2);
    var cs3 =
        SIMD.int8x16.extractLane(t, 3) > SIMD.int8x16.extractLane(other, 3);
    var cs4 =
        SIMD.int8x16.extractLane(t, 4) > SIMD.int8x16.extractLane(other, 4);
    var cs5 =
        SIMD.int8x16.extractLane(t, 5) > SIMD.int8x16.extractLane(other, 5);
    var cs6 =
        SIMD.int8x16.extractLane(t, 6) > SIMD.int8x16.extractLane(other, 6);
    var cs7 =
        SIMD.int8x16.extractLane(t, 7) > SIMD.int8x16.extractLane(other, 7);
    var cs8 =
        SIMD.int8x16.extractLane(t, 8) > SIMD.int8x16.extractLane(other, 8);
    var cs9 =
        SIMD.int8x16.extractLane(t, 9) > SIMD.int8x16.extractLane(other, 9);
    var cs10 =
        SIMD.int8x16.extractLane(t, 10) > SIMD.int8x16.extractLane(other, 10);
    var cs11 =
        SIMD.int8x16.extractLane(t, 11) > SIMD.int8x16.extractLane(other, 11);
    var cs12 =
        SIMD.int8x16.extractLane(t, 12) > SIMD.int8x16.extractLane(other, 12);
    var cs13 =
        SIMD.int8x16.extractLane(t, 13) > SIMD.int8x16.extractLane(other, 13);
    var cs14 =
        SIMD.int8x16.extractLane(t, 14) > SIMD.int8x16.extractLane(other, 14);
    var cs15 =
        SIMD.int8x16.extractLane(t, 15) > SIMD.int8x16.extractLane(other, 15);
    return SIMD.int8x16.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7,
                             cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
  }
}

if (typeof SIMD.int8x16.greaterThanOrEqual === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @param {int8x16} other An instance of int8x16.
    * @return {int8x16} true or false in each lane depending on
    * the result of t >= other.
    */
  SIMD.int8x16.greaterThanOrEqual = function(t, other) {
    t = SIMD.int8x16.check(t);
    other = SIMD.int8x16.check(other);
    var cs0 =
        SIMD.int8x16.extractLane(t, 0) >= SIMD.int8x16.extractLane(other, 0);
    var cs1 =
        SIMD.int8x16.extractLane(t, 1) >= SIMD.int8x16.extractLane(other, 1);
    var cs2 =
        SIMD.int8x16.extractLane(t, 2) >= SIMD.int8x16.extractLane(other, 2);
    var cs3 =
        SIMD.int8x16.extractLane(t, 3) >= SIMD.int8x16.extractLane(other, 3);
    var cs4 =
        SIMD.int8x16.extractLane(t, 4) >= SIMD.int8x16.extractLane(other, 4);
    var cs5 =
        SIMD.int8x16.extractLane(t, 5) >= SIMD.int8x16.extractLane(other, 5);
    var cs6 =
        SIMD.int8x16.extractLane(t, 6) >= SIMD.int8x16.extractLane(other, 6);
    var cs7 =
        SIMD.int8x16.extractLane(t, 7) >= SIMD.int8x16.extractLane(other, 7);
    var cs8 =
        SIMD.int8x16.extractLane(t, 8) >= SIMD.int8x16.extractLane(other, 8);
    var cs9 =
        SIMD.int8x16.extractLane(t, 9) >= SIMD.int8x16.extractLane(other, 9);
    var cs10 =
        SIMD.int8x16.extractLane(t, 10) >= SIMD.int8x16.extractLane(other, 10);
    var cs11 =
        SIMD.int8x16.extractLane(t, 11) >= SIMD.int8x16.extractLane(other, 11);
    var cs12 =
        SIMD.int8x16.extractLane(t, 12) >= SIMD.int8x16.extractLane(other, 12);
    var cs13 =
        SIMD.int8x16.extractLane(t, 13) >= SIMD.int8x16.extractLane(other, 13);
    var cs14 =
        SIMD.int8x16.extractLane(t, 14) >= SIMD.int8x16.extractLane(other, 14);
    var cs15 =
        SIMD.int8x16.extractLane(t, 15) >= SIMD.int8x16.extractLane(other, 15);
    return SIMD.int8x16.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7,
                             cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
  }
}

if (typeof SIMD.int8x16.lessThan === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @param {int8x16} other An instance of int8x16.
    * @return {int8x16} true or false in each lane depending on
    * the result of t < other.
    */
  SIMD.int8x16.lessThan = function(t, other) {
    t = SIMD.int8x16.check(t);
    other = SIMD.int8x16.check(other);
    var cs0 =
        SIMD.int8x16.extractLane(t, 0) < SIMD.int8x16.extractLane(other, 0);
    var cs1 =
        SIMD.int8x16.extractLane(t, 1) < SIMD.int8x16.extractLane(other, 1);
    var cs2 =
        SIMD.int8x16.extractLane(t, 2) < SIMD.int8x16.extractLane(other, 2);
    var cs3 =
        SIMD.int8x16.extractLane(t, 3) < SIMD.int8x16.extractLane(other, 3);
    var cs4 =
        SIMD.int8x16.extractLane(t, 4) < SIMD.int8x16.extractLane(other, 4);
    var cs5 =
        SIMD.int8x16.extractLane(t, 5) < SIMD.int8x16.extractLane(other, 5);
    var cs6 =
        SIMD.int8x16.extractLane(t, 6) < SIMD.int8x16.extractLane(other, 6);
    var cs7 =
        SIMD.int8x16.extractLane(t, 7) < SIMD.int8x16.extractLane(other, 7);
    var cs8 =
        SIMD.int8x16.extractLane(t, 8) < SIMD.int8x16.extractLane(other, 8);
    var cs9 =
        SIMD.int8x16.extractLane(t, 9) < SIMD.int8x16.extractLane(other, 9);
    var cs10 =
        SIMD.int8x16.extractLane(t, 10) < SIMD.int8x16.extractLane(other, 10);
    var cs11 =
        SIMD.int8x16.extractLane(t, 11) < SIMD.int8x16.extractLane(other, 11);
    var cs12 =
        SIMD.int8x16.extractLane(t, 12) < SIMD.int8x16.extractLane(other, 12);
    var cs13 =
        SIMD.int8x16.extractLane(t, 13) < SIMD.int8x16.extractLane(other, 13);
    var cs14 =
        SIMD.int8x16.extractLane(t, 14) < SIMD.int8x16.extractLane(other, 14);
    var cs15 =
        SIMD.int8x16.extractLane(t, 15) < SIMD.int8x16.extractLane(other, 15);
    return SIMD.int8x16.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7,
                             cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
  }
}

if (typeof SIMD.int8x16.lessThanOrEqual === "undefined") {
  /**
    * @param {int8x16} t An instance of int8x16.
    * @param {int8x16} other An instance of int8x16.
    * @return {int8x16} true or false in each lane depending on
    * the result of t <= other.
    */
  SIMD.int8x16.lessThanOrEqual = function(t, other) {
    t = SIMD.int8x16.check(t);
    other = SIMD.int8x16.check(other);
    var cs0 =
        SIMD.int8x16.extractLane(t, 0) <= SIMD.int8x16.extractLane(other, 0);
    var cs1 =
        SIMD.int8x16.extractLane(t, 1) <= SIMD.int8x16.extractLane(other, 1);
    var cs2 =
        SIMD.int8x16.extractLane(t, 2) <= SIMD.int8x16.extractLane(other, 2);
    var cs3 =
        SIMD.int8x16.extractLane(t, 3) <= SIMD.int8x16.extractLane(other, 3);
    var cs4 =
        SIMD.int8x16.extractLane(t, 4) <= SIMD.int8x16.extractLane(other, 4);
    var cs5 =
        SIMD.int8x16.extractLane(t, 5) <= SIMD.int8x16.extractLane(other, 5);
    var cs6 =
        SIMD.int8x16.extractLane(t, 6) <= SIMD.int8x16.extractLane(other, 6);
    var cs7 =
        SIMD.int8x16.extractLane(t, 7) <= SIMD.int8x16.extractLane(other, 7);
    var cs8 =
        SIMD.int8x16.extractLane(t, 8) <= SIMD.int8x16.extractLane(other, 8);
    var cs9 =
        SIMD.int8x16.extractLane(t, 9) <= SIMD.int8x16.extractLane(other, 9);
    var cs10 =
        SIMD.int8x16.extractLane(t, 10) <= SIMD.int8x16.extractLane(other, 10);
    var cs11 =
        SIMD.int8x16.extractLane(t, 11) <= SIMD.int8x16.extractLane(other, 11);
    var cs12 =
        SIMD.int8x16.extractLane(t, 12) <= SIMD.int8x16.extractLane(other, 12);
    var cs13 =
        SIMD.int8x16.extractLane(t, 13) <= SIMD.int8x16.extractLane(other, 13);
    var cs14 =
        SIMD.int8x16.extractLane(t, 14) <= SIMD.int8x16.extractLane(other, 14);
    var cs15 =
        SIMD.int8x16.extractLane(t, 15) <= SIMD.int8x16.extractLane(other, 15);
    return SIMD.int8x16.bool(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7,
                             cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
  }
}

if (typeof SIMD.int8x16.shiftLeftByScalar === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {integer} bits Bit count to shift by.
    * @return {int8x16} lanes in a shifted by bits.
    */
  SIMD.int8x16.shiftLeftByScalar = function(a, bits) {
    a = SIMD.int8x16.check(a);
    if (bits>>>0 > 8)
      bits = 8;
    var s0 = SIMD.int8x16.extractLane(a, 0) << bits;
    var s1 = SIMD.int8x16.extractLane(a, 1) << bits;
    var s2 = SIMD.int8x16.extractLane(a, 2) << bits;
    var s3 = SIMD.int8x16.extractLane(a, 3) << bits;
    var s4 = SIMD.int8x16.extractLane(a, 4) << bits;
    var s5 = SIMD.int8x16.extractLane(a, 5) << bits;
    var s6 = SIMD.int8x16.extractLane(a, 6) << bits;
    var s7 = SIMD.int8x16.extractLane(a, 7) << bits;
    var s8 = SIMD.int8x16.extractLane(a, 8) << bits;
    var s9 = SIMD.int8x16.extractLane(a, 9) << bits;
    var s10 = SIMD.int8x16.extractLane(a, 10) << bits;
    var s11 = SIMD.int8x16.extractLane(a, 11) << bits;
    var s12 = SIMD.int8x16.extractLane(a, 12) << bits;
    var s13 = SIMD.int8x16.extractLane(a, 13) << bits;
    var s14 = SIMD.int8x16.extractLane(a, 14) << bits;
    var s15 = SIMD.int8x16.extractLane(a, 15) << bits;
    return SIMD.int8x16(s0, s1, s2, s3, s4, s5, s6, s7,
                        s8, s9, s10, s11, s12, s13, s14, s15);
  }
}

if (typeof SIMD.int8x16.shiftRightLogicalByScalar === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {integer} bits Bit count to shift by.
    * @return {int8x16} lanes in a shifted by bits.
    */
  SIMD.int8x16.shiftRightLogicalByScalar = function(a, bits) {
    a = SIMD.int8x16.check(a);
    if (bits>>>0 > 8)
      bits = 8;
    var s0 = (SIMD.int8x16.extractLane(a, 0) & 0xff) >>> bits;
    var s1 = (SIMD.int8x16.extractLane(a, 1) & 0xff) >>> bits;
    var s2 = (SIMD.int8x16.extractLane(a, 2) & 0xff) >>> bits;
    var s3 = (SIMD.int8x16.extractLane(a, 3) & 0xff) >>> bits;
    var s4 = (SIMD.int8x16.extractLane(a, 4) & 0xff) >>> bits;
    var s5 = (SIMD.int8x16.extractLane(a, 5) & 0xff) >>> bits;
    var s6 = (SIMD.int8x16.extractLane(a, 6) & 0xff) >>> bits;
    var s7 = (SIMD.int8x16.extractLane(a, 7) & 0xff) >>> bits;
    var s8 = (SIMD.int8x16.extractLane(a, 8) & 0xff) >>> bits;
    var s9 = (SIMD.int8x16.extractLane(a, 9) & 0xff) >>> bits;
    var s10 = (SIMD.int8x16.extractLane(a, 10) & 0xff) >>> bits;
    var s11 = (SIMD.int8x16.extractLane(a, 11) & 0xff) >>> bits;
    var s12 = (SIMD.int8x16.extractLane(a, 12) & 0xff) >>> bits;
    var s13 = (SIMD.int8x16.extractLane(a, 13) & 0xff) >>> bits;
    var s14 = (SIMD.int8x16.extractLane(a, 14) & 0xff) >>> bits;
    var s15 = (SIMD.int8x16.extractLane(a, 15) & 0xff) >>> bits;
    return SIMD.int8x16(s0, s1, s2, s3, s4, s5, s6, s7,
                        s8, s9, s10, s11, s12, s13, s14, s15);
  }
}

if (typeof SIMD.int8x16.shiftRightArithmeticByScalar === "undefined") {
  /**
    * @param {int8x16} a An instance of int8x16.
    * @param {integer} bits Bit count to shift by.
    * @return {int8x16} lanes in a shifted by bits.
    */
  SIMD.int8x16.shiftRightArithmeticByScalar = function(a, bits) {
    a = SIMD.int8x16.check(a);
    if (bits>>>0 > 8)
      bits = 8;
    var s0 = SIMD.int8x16.extractLane(a, 0) >> bits;
    var s1 = SIMD.int8x16.extractLane(a, 1) >> bits;
    var s2 = SIMD.int8x16.extractLane(a, 2) >> bits;
    var s3 = SIMD.int8x16.extractLane(a, 3) >> bits;
    var s4 = SIMD.int8x16.extractLane(a, 4) >> bits;
    var s5 = SIMD.int8x16.extractLane(a, 5) >> bits;
    var s6 = SIMD.int8x16.extractLane(a, 6) >> bits;
    var s7 = SIMD.int8x16.extractLane(a, 7) >> bits;
    var s8 = SIMD.int8x16.extractLane(a, 8) >> bits;
    var s9 = SIMD.int8x16.extractLane(a, 9) >> bits;
    var s10 = SIMD.int8x16.extractLane(a, 10) >> bits;
    var s11 = SIMD.int8x16.extractLane(a, 11) >> bits;
    var s12 = SIMD.int8x16.extractLane(a, 12) >> bits;
    var s13 = SIMD.int8x16.extractLane(a, 13) >> bits;
    var s14 = SIMD.int8x16.extractLane(a, 14) >> bits;
    var s15 = SIMD.int8x16.extractLane(a, 15) >> bits;
    return SIMD.int8x16(s0, s1, s2, s3, s4, s5, s6, s7,
                        s8, s9, s10, s11, s12, s13, s14, s15);
  }
}

if (typeof SIMD.int8x16.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {int8x16} New instance of int8x16.
    */
  SIMD.int8x16.load = function(tarray, index) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    var i8temp = _i8x16;
    var array = bpe == 1 ? i8temp :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      array[i] = tarray[index + i];
    return SIMD.int8x16(i8temp[0], i8temp[1], i8temp[2], i8temp[3],
                        i8temp[4], i8temp[5], i8temp[6], i8temp[7],
                        i8temp[8], i8temp[9], i8temp[10], i8temp[11],
                        i8temp[12], i8temp[13], i8temp[14], i8temp[15]);
  }
}

if (typeof SIMD.int8x16.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {int8x16} value An instance of int8x16.
    * @return {void}
    */
  SIMD.int8x16.store = function(tarray, index, value) {
    if (!isTypedArray(tarray))
      throw new TypeError("The 1st argument must be a typed array.");
    if (!isInt32(index))
      throw new TypeError("The 2nd argument must be an Int32.");
    var bpe = tarray.BYTES_PER_ELEMENT;
    if (index < 0 || (index * bpe + 16) > tarray.byteLength)
      throw new RangeError("The value of index is invalid.");
    value = SIMD.int8x16.check(value);
    _i8x16[0] = SIMD.int8x16.extractLane(value, 0);
    _i8x16[1] = SIMD.int8x16.extractLane(value, 1);
    _i8x16[2] = SIMD.int8x16.extractLane(value, 2);
    _i8x16[3] = SIMD.int8x16.extractLane(value, 3);
    _i8x16[4] = SIMD.int8x16.extractLane(value, 4);
    _i8x16[5] = SIMD.int8x16.extractLane(value, 5);
    _i8x16[6] = SIMD.int8x16.extractLane(value, 6);
    _i8x16[7] = SIMD.int8x16.extractLane(value, 7);
    _i8x16[8] = SIMD.int8x16.extractLane(value, 8);
    _i8x16[9] = SIMD.int8x16.extractLane(value, 9);
    _i8x16[10] = SIMD.int8x16.extractLane(value, 10);
    _i8x16[11] = SIMD.int8x16.extractLane(value, 11);
    _i8x16[12] = SIMD.int8x16.extractLane(value, 12);
    _i8x16[13] = SIMD.int8x16.extractLane(value, 13);
    _i8x16[14] = SIMD.int8x16.extractLane(value, 14);
    _i8x16[15] = SIMD.int8x16.extractLane(value, 15);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = 16 / bpe;
    for (var i = 0; i < n; ++i)
      tarray[index + i] = array[i];
  }
}

if (typeof DataView.prototype.getFloat32x4 === "undefined") {
  function isDataView(v) {
    return v instanceof DataView;
  }

  DataView.prototype.getFloat32x4 = function(byteOffset, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    if (typeof littleEndian === 'undefined')
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
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    return SIMD.float64x2(this.getFloat64(byteOffset, littleEndian),
                          this.getFloat64(byteOffset + 8, littleEndian));
  }

  DataView.prototype.getInt32x4 = function(byteOffset, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    return SIMD.int32x4(this.getInt32(byteOffset, littleEndian),
                        this.getInt32(byteOffset + 4, littleEndian),
                        this.getInt32(byteOffset + 8, littleEndian),
                        this.getInt32(byteOffset + 12, littleEndian));
  }

  DataView.prototype.getInt16x8 = function(byteOffset, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    return SIMD.int16x8(this.getInt16(byteOffset, littleEndian),
                        this.getInt16(byteOffset + 2, littleEndian),
                        this.getInt16(byteOffset + 4, littleEndian),
                        this.getInt16(byteOffset + 6, littleEndian),
                        this.getInt16(byteOffset + 8, littleEndian),
                        this.getInt16(byteOffset + 10, littleEndian),
                        this.getInt16(byteOffset + 12, littleEndian),
                        this.getInt16(byteOffset + 14, littleEndian));
  }

  DataView.prototype.getInt8x16 = function(byteOffset, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    return SIMD.int8x16(this.getInt8(byteOffset, littleEndian),
                        this.getInt8(byteOffset + 1, littleEndian),
                        this.getInt8(byteOffset + 2, littleEndian),
                        this.getInt8(byteOffset + 3, littleEndian),
                        this.getInt8(byteOffset + 4, littleEndian),
                        this.getInt8(byteOffset + 5, littleEndian),
                        this.getInt8(byteOffset + 6, littleEndian),
                        this.getInt8(byteOffset + 7, littleEndian),
                        this.getInt8(byteOffset + 8, littleEndian),
                        this.getInt8(byteOffset + 9, littleEndian),
                        this.getInt8(byteOffset + 10, littleEndian),
                        this.getInt8(byteOffset + 11, littleEndian),
                        this.getInt8(byteOffset + 12, littleEndian),
                        this.getInt8(byteOffset + 13, littleEndian),
                        this.getInt8(byteOffset + 14, littleEndian),
                        this.getInt8(byteOffset + 15, littleEndian));
  }

  DataView.prototype.setFloat32x4 = function(byteOffset, value, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    value = SIMD.float32x4.check(value);
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    this.setFloat32(byteOffset, SIMD.float32x4.extractLane(value, 0),
                    littleEndian);
    this.setFloat32(byteOffset + 4, SIMD.float32x4.extractLane(value, 1),
                    littleEndian);
    this.setFloat32(byteOffset + 8, SIMD.float32x4.extractLane(value, 2),
                    littleEndian);
    this.setFloat32(byteOffset + 12, SIMD.float32x4.extractLane(value, 3),
                    littleEndian);
  }

  DataView.prototype.setFloat64x2 = function(byteOffset, value, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    value = SIMD.float64x2.check(value);
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    this.setFloat64(byteOffset, SIMD.float64x2.extractLane(value, 0),
                    littleEndian);
    this.setFloat64(byteOffset + 8, SIMD.float64x2.extractLane(value, 1),
                    littleEndian);
  }

  DataView.prototype.setInt32x4 = function(byteOffset, value, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    value = SIMD.int32x4.check(value);
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    this.setInt32(byteOffset, SIMD.int32x4.extractLane(value, 0),
                  littleEndian);
    this.setInt32(byteOffset + 4, SIMD.int32x4.extractLane(value, 1),
                  littleEndian);
    this.setInt32(byteOffset + 8, SIMD.int32x4.extractLane(value, 2),
                  littleEndian);
    this.setInt32(byteOffset + 12, SIMD.int32x4.extractLane(value, 3),
                  littleEndian);
  }

  DataView.prototype.setInt16x8 = function(byteOffset, value, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    value = SIMD.int16x8.check(value);
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    this.setInt16(byteOffset, SIMD.int16x8.extractLane(value, 0),
                  littleEndian);
    this.setInt16(byteOffset + 2, SIMD.int16x8.extractLane(value, 1),
                  littleEndian);
    this.setInt16(byteOffset + 4, SIMD.int16x8.extractLane(value, 2),
                  littleEndian);
    this.setInt16(byteOffset + 6, SIMD.int16x8.extractLane(value, 3),
                  littleEndian);
    this.setInt16(byteOffset + 8, SIMD.int16x8.extractLane(value, 4),
                  littleEndian);
    this.setInt16(byteOffset + 10, SIMD.int16x8.extractLane(value, 5),
                  littleEndian);
    this.setInt16(byteOffset + 12, SIMD.int16x8.extractLane(value, 6),
                  littleEndian);
    this.setInt16(byteOffset + 14, SIMD.int16x8.extractLane(value, 7),
                  littleEndian);
  }

  DataView.prototype.setInt8x16 = function(byteOffset, value, littleEndian) {
    if (!isDataView(this))
      throw new TypeError("This is not a DataView.");
    if (byteOffset < 0 || (byteOffset + 16) > this.buffer.byteLength)
      throw new RangeError("The value of byteOffset is invalid.");
    value = SIMD.int8x16.check(value);
    if (typeof littleEndian === 'undefined')
      littleEndian = false;
    this.setInt8(byteOffset, SIMD.int8x16.extractLane(value, 0),
                 littleEndian);
    this.setInt8(byteOffset + 1, SIMD.int8x16.extractLane(value, 1),
                 littleEndian);
    this.setInt8(byteOffset + 2, SIMD.int8x16.extractLane(value, 2),
                 littleEndian);
    this.setInt8(byteOffset + 3, SIMD.int8x16.extractLane(value, 3),
                 littleEndian);
    this.setInt8(byteOffset + 4, SIMD.int8x16.extractLane(value, 4),
                 littleEndian);
    this.setInt8(byteOffset + 5, SIMD.int8x16.extractLane(value, 5),
                 littleEndian);
    this.setInt8(byteOffset + 6, SIMD.int8x16.extractLane(value, 6),
                 littleEndian);
    this.setInt8(byteOffset + 7, SIMD.int8x16.extractLane(value, 7),
                 littleEndian);
    this.setInt8(byteOffset + 8, SIMD.int8x16.extractLane(value, 8),
                 littleEndian);
    this.setInt8(byteOffset + 9, SIMD.int8x16.extractLane(value, 9),
                 littleEndian);
    this.setInt8(byteOffset + 10, SIMD.int8x16.extractLane(value, 10),
                 littleEndian);
    this.setInt8(byteOffset + 11, SIMD.int8x16.extractLane(value, 11),
                 littleEndian);
    this.setInt8(byteOffset + 12, SIMD.int8x16.extractLane(value, 12),
                 littleEndian);
    this.setInt8(byteOffset + 13, SIMD.int8x16.extractLane(value, 13),
                 littleEndian);
    this.setInt8(byteOffset + 14, SIMD.int8x16.extractLane(value, 14),
                 littleEndian);
    this.setInt8(byteOffset + 15, SIMD.int8x16.extractLane(value, 15),
                 littleEndian);
  }
}

})(typeof window !== "undefined" ? window : this);

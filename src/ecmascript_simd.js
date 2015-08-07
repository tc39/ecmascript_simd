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
//  - Vector shifts don't mask the shift count.
//  - Conversions from float to int32 throw on error.
//  - Load and store operations throw when out of bounds.

(function(global) {

if (typeof global.SIMD === "undefined") {
  // SIMD module.
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

function int32FromFloat(x) {
  if (x > -2147483649.0 && x < 2147483648.0)
    return x|0;
  throw new RangeError("Conversion from floating-point to integer failed");
}

// SIMD utility functions

function simdCheckLaneIndex(index, lanes) {
  if (!isInt32(index))
    throw new TypeError('lane index must be an int32');
  if (index < 0 || index >= lanes)
    throw new RangeError('lane index must be in bounds');
}

function simdCreate(info, lanes) {
  switch (info.lanes) {
    case 4:
      return info.fn(lanes[0], lanes[1], lanes[2], lanes[3]);
    case 8:
      return info.fn(lanes[0], lanes[1], lanes[2], lanes[3],
                     lanes[4], lanes[5], lanes[6], lanes[7]);
    case 16:
      return info.fn(lanes[0], lanes[1], lanes[2], lanes[3],
                     lanes[4], lanes[5], lanes[6], lanes[7],
                     lanes[8], lanes[9], lanes[10], lanes[11],
                     lanes[12], lanes[13], lanes[14], lanes[15]);
  }
}

function simdSave(info, a) {
  a = info.fn.check(a);
  for (var i = 0; i < info.lanes; i++)
    info.buffer[i] = info.fn.extractLane(a, i);
}

function simdRestore(info) {
  return simdCreate(info, info.buffer);
}

function simdToString(type, value) {
  var info = simdInfo[type];
  value = info.fn.check(value);
  var str = "SIMD." + info.type + "(";
  str += info.fn.extractLane(value, 0);
  for (var i = 1; i < info.lanes; i++) {
    str += ", " + info.fn.extractLane(value, i);
  }
  return str + ")";
}

function simdToLocaleString(type, value) {
  var info = simdInfo[type];
  value = info.fn.check(value);
  var str = "SIMD." + info.type + "(";
  str += info.fn.extractLane(value, 0).toLocaleString();
  for (var i = 1; i < info.lanes; i++) {
    str += ", " + info.fn.extractLane(value, i).toLocaleString();
  }
  return str + ")";
}

function simdSplat(type, s) {
  var info = simdInfo[type];
  var lanes = [];
  for (var i = 0; i < info.lanes; i++)
    lanes[i] = s;
  return simdCreate(info, lanes);
}

function simdReplaceLane(type, a, i, s) {
  var info = simdInfo[type];
  a = info.fn.check(a);
  simdCheckLaneIndex(i, info.lanes);
  simdSave(info, a);
  info.buffer[i] = s;
  return simdRestore(info);
}

function simdFrom(to, from, a) {
  var toInfo = simdInfo[to];
  var fromInfo = simdInfo[from];
  a = fromInfo.fn.check(a);
  var lanes = [];
  for (var i = 0; i < fromInfo.lanes; i++)
    lanes[i] = fromInfo.fn.extractLane(a, i);
  return simdCreate(toInfo, lanes);
}

function simdFromBits(to, from, a) {
  var toInfo = simdInfo[to];
  var fromInfo = simdInfo[from];
  a = fromInfo.fn.check(a);
  simdSave(fromInfo, a);
  return simdRestore(toInfo);
}

function simdSelect(type, selector, a, b) {
  var info = simdInfo[type];
  selector = info.boolInfo.fn.check(selector);
  a = info.fn.check(a);
  b = info.fn.check(b);
  var lanes = [];
  for (var i = 0; i < info.lanes; i++) {
    lanes[i] = info.boolInfo.fn.extractLane(selector, i) ?
               info.fn.extractLane(a, i) : info.fn.extractLane(b, i);
  }
  return simdCreate(info, lanes);
}

function simdSwizzle(type, a, indices) {
  var info = simdInfo[type];
  a = info.fn.check(a);
  for (var i = 0; i < indices.length; i++) {
    simdCheckLaneIndex(indices[i], info.lanes);
    info.buffer[i] = info.fn.extractLane(a, indices[i]);
  }
  return simdRestore(info);
}

function simdShuffle(type, a, b, indices) {
  var info = simdInfo[type];
  a = info.fn.check(a);
  b = info.fn.check(b);
  for (var i = 0; i < indices.length; i++) {
    simdCheckLaneIndex(indices[i], 2 * info.lanes);
    info.buffer[i] = indices[i] < info.lanes ?
                     info.fn.extractLane(a, indices[i]) :
                     info.fn.extractLane(b, indices[i] - info.lanes);
  }
  return simdRestore(info);
}

function unaryNeg(a) { return -a; }
function unaryBitwiseNot(a) { return ~a; }
function unaryLogicalNot(a) { return !a; }

function simdUnaryOp(type, op, a) {
  var info = simdInfo[type];
  a = info.fn.check(a);
  var lanes = [];
  for (var i = 0; i < info.lanes; i++)
    lanes[i] = op(info.fn.extractLane(a, i));
  return simdCreate(info, lanes);
}

function binaryAnd(a, b) { return a & b; }
function binaryOr(a, b) { return a | b; }
function binaryXor(a, b) { return a ^ b; }
function binaryAdd(a, b) { return a + b; }
function binarySub(a, b) { return a - b; }
function binaryMul(a, b) { return a * b; }
function binaryDiv(a, b) { return a / b; }

function simdBinaryOp(type, op, a, b) {
  var info = simdInfo[type];
  a = info.fn.check(a);
  b = info.fn.check(b);
  var lanes = [];
  for (var i = 0; i < info.lanes; i++)
    lanes[i] = op(info.fn.extractLane(a, i), info.fn.extractLane(b, i));
  return simdCreate(info, lanes);
}

function binaryEqual(a, b) { return a == b; }
function binaryNotEqual(a, b) { return a != b; }
function binaryLess(a, b) { return a < b; }
function binaryLessEqual(a, b) { return a <= b; }
function binaryGreater(a, b) { return a > b; }
function binaryGreaterEqual(a, b) { return a >= b; }

function simdRelationalOp(type, op, a, b) {
  var info = simdInfo[type];
  a = info.fn.check(a);
  b = info.fn.check(b);
  var lanes = [];
  for (var i = 0; i < info.lanes; i++)
    lanes[i] = op(info.fn.extractLane(a, i), info.fn.extractLane(b, i));
  return simdCreate(info.boolInfo, lanes);
}

function simdAnyTrue(type, a) {
  var info = simdInfo[type];
  a = info.fn.check(a);
  for (var i = 0; i < info.lanes; i++)
    if (info.fn.extractLane(a, i)) return true;
  return false;
}

function simdAllTrue(type, a) {
  var info = simdInfo[type];
  a = info.fn.check(a);
  for (var i = 0; i < info.lanes; i++)
    if (!info.fn.extractLane(a, i)) return false;
  return true;
}

function binaryShiftLeft(a, bits) { return a << bits; }
function binaryShiftRightLogical8(a, bits) { return (a & 0xff) >>> bits; }
function binaryShiftRightLogical16(a, bits) { return (a & 0xffff) >>> bits; }
function binaryShiftRightLogical32(a, bits) { return a >>> bits; }
function binaryShiftRightArithmetic(a, bits) { return a >> bits; }

function simdShiftOp(type, op, a, bits) {
  var info = simdInfo[type];
  // Shift functions check their arguments.
  var lanes = [];
  for (var i = 0; i < info.lanes; i++)
    lanes[i] = op(info.fn.extractLane(a, i), bits);
  return simdCreate(info, lanes);
}

function simdLoad(type, tarray, index, count) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isInt32(index))
    throw new TypeError("The 2nd argument must be an Int32.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  var info = simdInfo[type];
  var bytes = count * info.laneSize;
  if (index < 0 || (index * bpe + bytes) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");

  var buf = info.buffer;
  var array = bpe == 1 ? _i8x16 :
              bpe == 2 ? _i16x8 :
              bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
              _f64x2;
  var n = bytes / bpe;
  for (var i = 0; i < n; i++)
    array[i] = tarray[index + i];
  for (var i = info.lanes - 1; i >= count; i--)
    buf[i] = 0;
  return simdCreate(info, buf);
}

function simdStore(type, tarray, index, a, count) {
  if (!isTypedArray(tarray))
    throw new TypeError("The 1st argument must be a typed array.");
  if (!isInt32(index))
    throw new TypeError("The 2nd argument must be an Int32.");
  var bpe = tarray.BYTES_PER_ELEMENT;
  var info = simdInfo[type];
  var bytes = count * info.laneSize;
  if (index < 0 || (index * bpe + bytes) > tarray.byteLength)
    throw new RangeError("The value of index is invalid.");

  a = info.fn.check(a);
  // If count is odd and tarray's elements are 8 bytes wide, we have to create
  // a new view.
  if ((count % 2 != 0) && bpe == 8) {
    var view = new info.view(tarray.buffer,
                             tarray.byteOffset + index * 8, count);
    for (var i = 0; i < count; i++)
      view[i] = info.fn.extractLane(a, i);
  } else {
    for (var i = 0; i < count; i++)
      info.buffer[i] = info.fn.extractLane(a, i);
    var array = bpe == 1 ? _i8x16 :
                bpe == 2 ? _i16x8 :
                bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) :
                _f64x2;
    var n = bytes / bpe;
    for (var i = 0; i < n; i++)
      tarray[index + i] = array[i];
  }
  return a;
}


if (typeof SIMD.Bool32x4 === "undefined") {
  /**
    * Construct a new instance of Bool32x4 number.
    * @param {double} value used for lane 0.
    * @param {double} value used for lane 1.
    * @param {double} value used for lane 2.
    * @param {double} value used for lane 3.
    * @constructor
    */
  SIMD.Bool32x4 = function(s0, s1, s2, s3) {
    if (!(this instanceof SIMD.Bool32x4)) {
      return new SIMD.Bool32x4(s0, s1, s2, s3);
    }
    this.s_ = [!!s0, !!s1, !!s2, !!s3];
  }
}

if (typeof SIMD.Bool32x4.check === "undefined") {
  /**
    * Check whether the argument is a Bool32x4.
    * @param {Bool32x4} v An instance of Bool32x4.
    * @return {Bool32x4} The Bool32x4 instance.
    */
  SIMD.Bool32x4.check = function(v) {
    if (!(v instanceof SIMD.Bool32x4)) {
      throw new TypeError("argument is not a Bool32x4.");
    }
    return v;
  }
}

if (typeof SIMD.Bool32x4.splat === "undefined") {
  /**
    * Construct a new instance of Bool32x4 with the same value
    * in all lanes.
    * @param {double} value used for all lanes.
    * @constructor
    */
  SIMD.Bool32x4.splat = function(s) {
    return simdSplat("Bool32x4", s);
  }
}

if (typeof SIMD.Bool32x4.extractLane === "undefined") {
  /**
    * @param {Bool32x4} v An instance of Bool32x4.
    * @param {integer} i Index in v for lane i
    * @return {Boolean} The value in lane i of v.
    */
  SIMD.Bool32x4.extractLane = function(v, i) {
    v = SIMD.Bool32x4.check(v);
    simdCheckLaneIndex(i, 4);
    return v.s_[i];
  }
}

if (typeof SIMD.Bool32x4.replaceLane === "undefined") {
  /**
    * @param {Bool32x4} a An instance of Bool32x4.
    * @param {integer} i Index in a for lane i
    * @param {double} value used for lane i.
    * @return {Bool32x4} New instance of Bool32x4 with the values in a and
    * lane i replaced with {s}.
    */
  SIMD.Bool32x4.replaceLane = function(a, i, s) {
    return simdReplaceLane("Bool32x4", a, i, s);
  }
}

if (typeof SIMD.Bool32x4.allTrue === "undefined") {
  /**
    * Check if all 4 lanes hold a true value
    * @param {Bool32x4} a An instance of Bool32x4.
    * @return {Boolean} All 4 lanes holds a true value
    */
  SIMD.Bool32x4.allTrue = function(a) {
    return simdAllTrue("Bool32x4", a);
  }
}

if (typeof SIMD.Bool32x4.anyTrue === "undefined") {
  /**
    * Check if any of the 4 lanes hold a true value
    * @param {Bool32x4} a An instance of Bool32x4.
    * @return {Boolean} Any of the 4 lanes holds a true value
    */
  SIMD.Bool32x4.anyTrue = function(a) {
    return simdAnyTrue("Bool32x4", a);
  }
}

if (typeof SIMD.Bool32x4.and === "undefined") {
  /**
    * @param {Bool32x4} a An instance of Bool32x4.
    * @param {Bool32x4} b An instance of Bool32x4.
    * @return {Bool32x4} New instance of Bool32x4 with values of a & b.
    */
  SIMD.Bool32x4.and = function(a, b) {
    return simdBinaryOp("Bool32x4", binaryAnd, a, b);
  }
}

if (typeof SIMD.Bool32x4.or === "undefined") {
  /**
    * @param {Bool32x4} a An instance of Bool32x4.
    * @param {Bool32x4} b An instance of Bool32x4.
    * @return {Bool32x4} New instance of Bool32x4 with values of a | b.
    */
  SIMD.Bool32x4.or = function(a, b) {
    return simdBinaryOp("Bool32x4", binaryOr, a, b);
  }
}

if (typeof SIMD.Bool32x4.xor === "undefined") {
  /**
    * @param {Bool32x4} a An instance of Bool32x4.
    * @param {Bool32x4} b An instance of Bool32x4.
    * @return {Bool32x4} New instance of Bool32x4 with values of a ^ b.
    */
  SIMD.Bool32x4.xor = function(a, b) {
    return simdBinaryOp("Bool32x4", binaryXor, a, b);
  }
}

if (typeof SIMD.Bool32x4.not === "undefined") {
  /**
    * @param {Bool32x4} a An instance of Bool32x4.
    * @return {Bool32x4} New instance of Bool32x4 with values of !a
    */
  SIMD.Bool32x4.not = function(a) {
    return simdUnaryOp("Bool32x4", unaryLogicalNot, a);
  }
}

if (typeof SIMD.Bool32x4.equal === "undefined") {
  /**
    * @param {Bool32x4} a An instance of Bool32x4.
    * @param {Bool32x4} b An instance of Bool32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a == b.
    */
  SIMD.Bool32x4.equal = function(a, b) {
    return simdRelationalOp("Bool32x4", binaryEqual, a, b);
  }
}

if (typeof SIMD.Bool32x4.notEqual === "undefined") {
  /**
    * @param {Bool32x4} a An instance of Bool32x4.
    * @param {Bool32x4} b An instance of Bool32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a != b.
    */
  SIMD.Bool32x4.notEqual = function(a, b) {
    return simdRelationalOp("Bool32x4", binaryNotEqual, a, b);
  }
}

if (!SIMD.Bool32x4.prototype.hasOwnProperty('valueOf')) {
  SIMD.Bool32x4.prototype.valueOf = function() {
    throw new TypeError("Bool32x4 cannot be converted to a number");
  }
}

if (!SIMD.Bool32x4.prototype.hasOwnProperty('toString')) {
  /**
   * @return {String} a string representing the Bool32x4.
   */
  SIMD.Bool32x4.prototype.toString = function() {
    return simdToString("Bool32x4", this);
  }
}

if (!SIMD.Bool32x4.prototype.hasOwnProperty('toLocaleString')) {
  /**
   * @return {String} a locale-sensitive string representing the Bool32x4.
   */
  SIMD.Bool32x4.prototype.toLocaleString = function() {
    return simdToLocaleString("Bool32x4", this);
  }
}

if (typeof SIMD.Bool16x8 === "undefined") {
  /**
    * Construct a new instance of Bool16x8 number.
    * @constructor
    */
  SIMD.Bool16x8 = function(s0, s1, s2, s3, s4, s5, s6, s7) {
    if (!(this instanceof SIMD.Bool16x8)) {
      return new SIMD.Bool16x8(s0, s1, s2, s3, s4, s5, s6, s7);
    }

    this.s_ = [!!s0, !!s1, !!s2, !!s3, !!s4, !!s5, !!s6, !!s7];
  }
}

if (typeof SIMD.Bool16x8.check === "undefined") {
  /**
    * Check whether the argument is a Bool16x8.
    * @param {Bool16x8} v An instance of Bool16x8.
    * @return {Bool16x8} The Bool16x8 instance.
    */
  SIMD.Bool16x8.check = function(v) {
    if (!(v instanceof SIMD.Bool16x8)) {
      throw new TypeError("argument is not a Bool16x8.");
    }
    return v;
  }
}

if (typeof SIMD.Bool16x8.splat === "undefined") {
  /**
    * Construct a new instance of Bool16x8 with the same value
    * in all lanes.
    * @param {double} value used for all lanes.
    * @constructor
    */
  SIMD.Bool16x8.splat = function(s) {
    return simdSplat("Bool16x8", s);
  }
}

if (typeof SIMD.Bool16x8.extractLane === "undefined") {
  /**
    * @param {Bool16x8} v An instance of Bool16x8.
    * @param {integer} i Index in v for lane i
    * @return {Boolean} The value in lane i of v.
    */
  SIMD.Bool16x8.extractLane = function(v, i) {
    v = SIMD.Bool16x8.check(v);
    simdCheckLaneIndex(i, 8);
    return v.s_[i];
  }
}

if (typeof SIMD.Bool16x8.replaceLane === "undefined") {
  /**
    * @param {Bool16x8} a An instance of Bool16x8.
    * @param {integer} i Index in a for lane i
    * @param {double} value used for lane i.
    * @return {Bool16x8} New instance of Bool16x8 with the values in a and
    * lane i replaced with {s}.
    */
  SIMD.Bool16x8.replaceLane = function(a, i, s) {
    return simdReplaceLane("Bool16x8", a, i, s);
  }
}

if (typeof SIMD.Bool16x8.allTrue === "undefined") {
  /**
    * Check if all 8 lanes hold a true value
    * @param {Bool16x8} a An instance of Bool16x8.
    * @return {Boolean} All 8 lanes holds a true value
    */
  SIMD.Bool16x8.allTrue = function(a) {
    return simdAllTrue("Bool16x8", a);
  }
}

if (typeof SIMD.Bool16x8.anyTrue === "undefined") {
  /**
    * Check if any of the 8 lanes hold a true value
    * @param {Bool16x8} a An instance of Int16x8.
    * @return {Boolean} Any of the 8 lanes holds a true value
    */
  SIMD.Bool16x8.anyTrue = function(a) {
    return simdAnyTrue("Bool16x8", a);
  }
}

if (typeof SIMD.Bool16x8.and === "undefined") {
  /**
    * @param {Bool16x8} a An instance of Bool16x8.
    * @param {Bool16x8} b An instance of Bool16x8.
    * @return {Bool16x8} New instance of Bool16x8 with values of a & b.
    */
  SIMD.Bool16x8.and = function(a, b) {
    return simdBinaryOp("Bool16x8", binaryAnd, a, b);
  }
}

if (typeof SIMD.Bool16x8.or === "undefined") {
  /**
    * @param {Bool16x8} a An instance of Bool16x8.
    * @param {Bool16x8} b An instance of Bool16x8.
    * @return {Bool16x8} New instance of Bool16x8 with values of a | b.
    */
  SIMD.Bool16x8.or = function(a, b) {
    return simdBinaryOp("Bool16x8", binaryOr, a, b);
  }
}

if (typeof SIMD.Bool16x8.xor === "undefined") {
  /**
    * @param {Bool16x8} a An instance of Bool16x8.
    * @param {Bool16x8} b An instance of Bool16x8.
    * @return {Bool16x8} New instance of Bool16x8 with values of a ^ b.
    */
  SIMD.Bool16x8.xor = function(a, b) {
    return simdBinaryOp("Bool16x8", binaryXor, a, b);
  }
}

if (typeof SIMD.Bool16x8.not === "undefined") {
  /**
    * @param {Bool16x8} a An instance of Bool16x8.
    * @return {Bool16x8} New instance of Bool16x8 with values of !a
    */
  SIMD.Bool16x8.not = function(a) {
    return simdUnaryOp("Bool16x8", unaryLogicalNot, a);
  }
}

if (typeof SIMD.Bool16x8.equal === "undefined") {
  /**
    * @param {Bool16x8} a An instance of Bool16x8.
    * @param {Bool16x8} b An instance of Bool16x8.
    * @return {Bool16x8} true or false in each lane depending on
    * the result of a == b.
    */
  SIMD.Bool16x8.equal = function(a, b) {
    return simdRelationalOp("Bool16x8", binaryEqual, a, b);
  }
}

if (typeof SIMD.Bool16x8.notEqual === "undefined") {
  /**
    * @param {Bool16x8} a An instance of Bool16x8.
    * @param {Bool16x8} b An instance of Bool16x8.
    * @return {Bool16x8} true or false in each lane depending on
    * the result of a != b.
    */
  SIMD.Bool16x8.notEqual = function(a, b) {
    return simdRelationalOp("Bool16x8", binaryNotEqual, a, b);
  }
}

if (!SIMD.Bool16x8.prototype.hasOwnProperty('valueOf')) {
  SIMD.Bool16x8.prototype.valueOf = function() {
    throw new TypeError("Bool16x8 cannot be converted to a number");
  }
}

if (!SIMD.Bool16x8.prototype.hasOwnProperty('toString')) {
  /**
   * @return {String} a string representing the Bool32x4.
   */
  SIMD.Bool16x8.prototype.toString = function() {
    return simdToString("Bool16x8", this);
  }
}

if (!SIMD.Bool16x8.prototype.hasOwnProperty('toLocaleString')) {
  /**
   * @return {String} a locale-sensitive string representing the Bool16x8.
   */
  SIMD.Bool16x8.prototype.toLocaleString = function() {
    return simdToLocaleString("Bool16x8", this);
  }
}

if (typeof SIMD.Bool8x16 === "undefined") {
  /**
    * Construct a new instance of Bool8x16 number.
    * @constructor
    */
  SIMD.Bool8x16 = function(s0, s1, s2, s3, s4, s5, s6, s7,
                           s8, s9, s10, s11, s12, s13, s14, s15) {
    if (!(this instanceof SIMD.Bool8x16)) {
      return new SIMD.Bool8x16(s0, s1, s2, s3, s4, s5, s6, s7,
                               s8, s9, s10, s11, s12, s13, s14, s15);
    }

    this.s_ = [!!s0, !!s1, !!s2, !!s3, !!s4, !!s5, !!s6, !!s7,
               !!s8, !!s9, !!s10, !!s11, !!s12, !!s13, !!s14, !!s15];
  }
}

if (typeof SIMD.Bool8x16.check === "undefined") {
  /**
    * Check whether the argument is a Bool8x16.
    * @param {Bool8x16} v An instance of Bool8x16.
    * @return {Bool8x16} The Bool8x16 instance.
    */
  SIMD.Bool8x16.check = function(v) {
    if (!(v instanceof SIMD.Bool8x16)) {
      throw new TypeError("argument is not a Bool8x16.");
    }
    return v;
  }
}

if (typeof SIMD.Bool8x16.splat === "undefined") {
  /**
    * Construct a new instance of Bool8x16 with the same value
    * in all lanes.
    * @param {double} value used for all lanes.
    * @constructor
    */
  SIMD.Bool8x16.splat = function(s) {
    return simdSplat("Bool8x16", s);
  }
}

if (typeof SIMD.Bool8x16.extractLane === "undefined") {
  /**
    * @param {Bool8x16} v An instance of Bool8x16.
    * @param {integer} i Index in v for lane i
    * @return {Boolean} The value in lane i of v.
    */
  SIMD.Bool8x16.extractLane = function(v, i) {
    v = SIMD.Bool8x16.check(v);
    simdCheckLaneIndex(i, 16);
    return v.s_[i];
  }
}

if (typeof SIMD.Bool8x16.replaceLane === "undefined") {
  /**
    * @param {Bool8x16} a An instance of Bool8x16.
    * @param {integer} i Index in a for lane i
    * @param {double} value used for lane i.
    * @return {Bool8x16} New instance of Bool8x16 with the values in a and
    * lane i replaced with {s}.
    */
  SIMD.Bool8x16.replaceLane = function(a, i, s) {
    return simdReplaceLane("Bool8x16", a, i, s);
  }
}

if (typeof SIMD.Bool8x16.allTrue === "undefined") {
  /**
    * Check if all 16 lanes hold a true value
    * @param {Bool8x16} v An instance of Bool8x16.
    * @return {Boolean} All 16 lanes holds a true value
    */
  SIMD.Bool8x16.allTrue = function(a) {
    return simdAllTrue("Bool8x16", a);
  }
}

if (typeof SIMD.Bool8x16.anyTrue === "undefined") {
  /**
    * Check if any of the 16 lanes hold a true value
    * @param {Bool8x16} v An instance of Bool16x8.
    * @return {Boolean} Any of the 16 lanes holds a true value
    */
  SIMD.Bool8x16.anyTrue = function(a) {
    return simdAnyTrue("Bool8x16", a);
  }
}

if (typeof SIMD.Bool8x16.and === "undefined") {
  /**
    * @param {Bool8x16} a An instance of Bool8x16.
    * @param {Bool8x16} b An instance of Bool8x16.
    * @return {Bool8x16} New instance of Bool8x16 with values of a & b.
    */
  SIMD.Bool8x16.and = function(a, b) {
    return simdBinaryOp("Bool8x16", binaryAnd, a, b);
  }
}

if (typeof SIMD.Bool8x16.or === "undefined") {
  /**
    * @param {Bool8x16} a An instance of Bool8x16.
    * @param {Bool8x16} b An instance of Bool8x16.
    * @return {Bool8x16} New instance of Bool8x16 with values of a | b.
    */
  SIMD.Bool8x16.or = function(a, b) {
    return simdBinaryOp("Bool8x16", binaryOr, a, b);
  }
}

if (typeof SIMD.Bool8x16.xor === "undefined") {
  /**
    * @param {Bool8x16} a An instance of Bool8x16.
    * @param {Bool8x16} b An instance of Bool8x16.
    * @return {Bool8x16} New instance of Bool8x16 with values of a ^ b.
    */
  SIMD.Bool8x16.xor = function(a, b) {
    return simdBinaryOp("Bool8x16", binaryXor, a, b);
  }
}

if (typeof SIMD.Bool8x16.not === "undefined") {
  /**
    * @param {Bool8x16} a An instance of Bool8x16.
    * @return {Bool8x16} New instance of Bool8x16 with values of !a
    */
  SIMD.Bool8x16.not = function(a) {
    return simdUnaryOp("Bool8x16", unaryLogicalNot, a);
  }
}

if (typeof SIMD.Bool8x16.equal === "undefined") {
  /**
    * @param {Bool8x16} a An instance of Bool8x16.
    * @param {Bool8x16} b An instance of Bool8x16.
    * @return {Bool8x16} true or false in each lane depending on
    * the result of a == b.
    */
  SIMD.Bool8x16.equal = function(a, b) {
    return simdRelationalOp("Bool8x16", binaryEqual, a, b);
  }
}

if (typeof SIMD.Bool8x16.notEqual === "undefined") {
  /**
    * @param {Bool8x16} a An instance of Bool8x16.
    * @param {Bool8x16} b An instance of Bool8x16.
    * @return {Bool8x16} true or false in each lane depending on
    * the result of a != b.
    */
  SIMD.Bool8x16.notEqual = function(a, b) {
    return simdRelationalOp("Bool8x16", binaryNotEqual, a, b);
  }
}

if (!SIMD.Bool8x16.prototype.hasOwnProperty('valueOf')) {
  SIMD.Bool8x16.prototype.valueOf = function() {
    throw new TypeError("Bool8x16 cannot be converted to a number");
  }
}

if (!SIMD.Bool8x16.prototype.hasOwnProperty('toString')) {
  /**
   * @return {String} a string representing the Bool32x4.
   */
  SIMD.Bool8x16.prototype.toString = function() {
    return simdToString("Bool8x16", this);
  }
}

if (!SIMD.Bool8x16.prototype.hasOwnProperty('toLocaleString')) {
  /**
   * @return {String} a locale-sensitive string representing the Bool8x16.
   */
  SIMD.Bool8x16.prototype.toLocaleString = function() {
    return simdToLocaleString("Bool8x16", this);
  }
}


if (typeof SIMD.Float32x4 === "undefined") {
  /**
    * Construct a new instance of Float32x4 number.
    * @param {double} value used for lane 0.
    * @param {double} value used for lane 1.
    * @param {double} value used for lane 2.
    * @param {double} value used for lane 3.
    * @constructor
    */
  SIMD.Float32x4 = function(s0, s1, s2, s3) {
    if (!(this instanceof SIMD.Float32x4)) {
      return new SIMD.Float32x4(s0, s1, s2, s3);
    }

    this.s_ = [truncatef32(s0), truncatef32(s1), truncatef32(s2),
               truncatef32(s3)];
  }
}

if (typeof SIMD.Float32x4.extractLane === "undefined") {
  /**
    * @param {Float32x4} v An instance of Float32x4.
    * @param {integer} i Index in v for lane i
    * @return {double} The value in lane i of v.
    */
  SIMD.Float32x4.extractLane = function(v, i) {
    v = SIMD.Float32x4.check(v);
    simdCheckLaneIndex(i, 4);
    return v.s_[i];
  }
}

if (typeof SIMD.Float32x4.replaceLane === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {integer} i Index in a for lane i
    * @param {double} value used for lane i.
    * @return {Float32x4} New instance of Float32x4 with the values in a and
    * lane i replaced with {s}.
    */
  SIMD.Float32x4.replaceLane = function(a, i, s) {
    return simdReplaceLane("Float32x4", a, i, s);
  }
}

if (typeof SIMD.Float32x4.check === "undefined") {
  /**
    * Check whether the argument is a Float32x4.
    * @param {Float32x4} v An instance of Float32x4.
    * @return {Float32x4} The Float32x4 instance.
    */
  SIMD.Float32x4.check = function(v) {
    if (!(v instanceof SIMD.Float32x4)) {
      throw new TypeError("argument is not a Float32x4.");
    }
    return v;
  }
}

if (typeof SIMD.Float32x4.splat === "undefined") {
  /**
    * Construct a new instance of Float32x4 with the same value
    * in all lanes.
    * @param {double} value used for all lanes.
    * @constructor
    */
  SIMD.Float32x4.splat = function(s) {
    return simdSplat("Float32x4", s);
  }
}

if (typeof SIMD.Float32x4.fromInt32x4 === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Float32x4} An integer to float conversion copy of a.
    */
  SIMD.Float32x4.fromInt32x4 = function(a) {
    return simdFrom("Float32x4", "Int32x4", a);
  }
}

if (typeof SIMD.Float32x4.fromInt32x4Bits === "undefined") {
  /**
   * @param {Int32x4} a An instance of Int32x4.
   * @return {Float32x4} a bit-wise copy of a as a Float32x4.
   */
  SIMD.Float32x4.fromInt32x4Bits = function(a) {
    return simdFromBits("Float32x4", "Int32x4", a);
  }
}

if (typeof SIMD.Float32x4.fromInt16x8Bits === "undefined") {
  /**
   * @param {Int16x8} a An instance of Int16x8.
   * @return {Float32x4} a bit-wise copy of a as a Float32x4.
   */
  SIMD.Float32x4.fromInt16x8Bits = function(a) {
    return simdFromBits("Float32x4", "Int16x8", a);
  }
}

if (typeof SIMD.Float32x4.fromInt8x16Bits === "undefined") {
  /**
   * @param {Int8x16} a An instance of Int8x16.
   * @return {Float32x4} a bit-wise copy of a as a Float32x4.
   */
  SIMD.Float32x4.fromInt8x16Bits = function(a) {
    return simdFromBits("Float32x4", "Int8x16", a);
  }
}

if (!SIMD.Float32x4.prototype.hasOwnProperty('toString')) {
  /**
   * @return {String} a string representing the Float32x4.
   */
  SIMD.Float32x4.prototype.toString = function() {
    return simdToString("Float32x4", this);
  }
}

if (!SIMD.Float32x4.prototype.hasOwnProperty('toLocaleString')) {
  /**
   * @return {String} a locale-sensitive string representing the Float32x4.
   */
  SIMD.Float32x4.prototype.toLocaleString = function() {
    return simdToLocaleString("Float32x4", this);
  }
}

if (!SIMD.Float32x4.prototype.hasOwnProperty('valueOf')) {
  SIMD.Float32x4.prototype.valueOf = function() {
    throw new TypeError("Float32x4 cannot be converted to a number");
  }
}

if (typeof SIMD.Int32x4 === "undefined") {
  /**
    * Construct a new instance of Int32x4 number.
    * @param {integer} 32-bit value used for lane 0.
    * @param {integer} 32-bit value used for lane 1.
    * @param {integer} 32-bit value used for lane 2.
    * @param {integer} 32-bit value used for lane 3.
    * @constructor
    */
  SIMD.Int32x4 = function(s0, s1, s2, s3) {
    if (!(this instanceof SIMD.Int32x4)) {
      return new SIMD.Int32x4(s0, s1, s2, s3);
    }

    this.s_ = [s0|0, s1|0, s2|0, s3|0];
  }
}

if (typeof SIMD.Int32x4.extractLane === "undefined") {
  /**
    * @param {Int32x4} v An instance of Int32x4.
    * @param {integer} i Index in v for lane i
    * @return {integer} The value in lane i of v.
    */
  SIMD.Int32x4.extractLane = function(v, i) {
    v = SIMD.Int32x4.check(v);
    simdCheckLaneIndex(i, 4);
    return v.s_[i];
  }
}

if (typeof SIMD.Int32x4.replaceLane === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {integer} i Index in a for lane i
    * @param {integer} value used for lane i.
    * @return {Int32x4} New instance of Int32x4 with the values in a and
    * lane i replaced with {s}.
    */
  SIMD.Int32x4.replaceLane = function(a, i, s) {
    return simdReplaceLane("Int32x4", a, i, s);
  }
}

if (typeof SIMD.Int32x4.check === "undefined") {
  /**
    * Check whether the argument is a Int32x4.
    * @param {Int32x4} v An instance of Int32x4.
    * @return {Int32x4} The Int32x4 instance.
    */
  SIMD.Int32x4.check = function(v) {
    if (!(v instanceof SIMD.Int32x4)) {
      throw new TypeError("argument is not a Int32x4.");
    }
    return v;
  }
}

if (typeof SIMD.Int32x4.splat === "undefined") {
  /**
    * Construct a new instance of Int32x4 with the same value
    * in all lanes.
    * @param {integer} value used for all lanes.
    * @constructor
    */
  SIMD.Int32x4.splat = function(s) {
    return simdSplat("Int32x4", s);
  }
}

if (typeof SIMD.Int32x4.fromFloat32x4 === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @return {Int32x4} with a integer to float conversion of a.
    */
  SIMD.Int32x4.fromFloat32x4 = function(a) {
    a = SIMD.Float32x4.check(a);
    return SIMD.Int32x4(int32FromFloat(SIMD.Float32x4.extractLane(a, 0)),
                        int32FromFloat(SIMD.Float32x4.extractLane(a, 1)),
                        int32FromFloat(SIMD.Float32x4.extractLane(a, 2)),
                        int32FromFloat(SIMD.Float32x4.extractLane(a, 3)));
  }
}

if (typeof SIMD.Int32x4.fromFloat32x4Bits === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @return {Int32x4} a bit-wise copy of a as a Int32x4.
    */
  SIMD.Int32x4.fromFloat32x4Bits = function(a) {
    return simdFromBits("Int32x4", "Float32x4", a);
  }
}

if (typeof SIMD.Int32x4.fromInt16x8Bits === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @return {Int32x4} a bit-wise copy of a as a Int32x4.
    */
  SIMD.Int32x4.fromInt16x8Bits = function(a) {
    return simdFromBits("Int32x4", "Int16x8", a);
  }
}

if (typeof SIMD.Int32x4.fromInt8x16Bits === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @return {Int32x4} a bit-wise copy of a as a Int32x4.
    */
  SIMD.Int32x4.fromInt8x16Bits = function(a) {
    return simdFromBits("Int32x4", "Int8x16", a);
  }
}

if (!SIMD.Int32x4.prototype.hasOwnProperty('toString')) {
  /**
   * @return {String} a string representing the Int32x4.
   */
  SIMD.Int32x4.prototype.toString = function() {
    return simdToString("Int32x4", this);
  }
}

if (!SIMD.Int32x4.prototype.hasOwnProperty('toLocaleString')) {
  /**
   * @return {String} a locale-sensitive string representing the Int32x4.
   */
  SIMD.Int32x4.prototype.toLocaleString = function() {
    return simdToLocaleString("Int32x4", this);
  }
}

if (!SIMD.Int32x4.prototype.hasOwnProperty('valueOf')) {
  SIMD.Int32x4.prototype.valueOf = function() {
    throw new TypeError("Int32x4 cannot be converted to a number");
  }
}

if (typeof SIMD.Int16x8 === "undefined") {
  /**
    * Construct a new instance of Int16x8 number.
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
  SIMD.Int16x8 = function(s0, s1, s2, s3, s4, s5, s6, s7) {
    if (!(this instanceof SIMD.Int16x8)) {
      return new SIMD.Int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
    }

    this.s_ = [s0 << 16 >> 16, s1 << 16 >> 16, s2 << 16 >> 16,
               s3 << 16 >> 16, s4 << 16 >> 16, s5 << 16 >> 16,
               s6 << 16 >> 16, s7 << 16 >> 16];
  }
}

if (typeof SIMD.Int16x8.extractLane === "undefined") {
  /**
    * @param {Int16x8} v An instance of Int16x8.
    * @param {integer} i Index in v for lane i
    * @return {integer} The value in lane i of v.
    */
  SIMD.Int16x8.extractLane = function(v, i) {
    v = SIMD.Int16x8.check(v);
    simdCheckLaneIndex(i, 8);
    return v.s_[i];
  }
}

if (typeof SIMD.Int16x8.unsignedExtractLane === "undefined") {
  /**
    * @param {Int16x8} v An instance of Int16x8.
    * @param {integer} i Index in concatenation of v for lane i
    * @return {integer} The value in lane i of v extracted as an unsigned value.
    */
  SIMD.Int16x8.unsignedExtractLane = function(v, i) {
    v = SIMD.Int16x8.check(v);
    simdCheckLaneIndex(i, 8);
    return v.s_[i] & 0xffff;
  }
}

if (typeof SIMD.Int16x8.replaceLane === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {integer} i Index in a for lane i
    * @param {integer} value used for lane i.
    * @return {Int16x8} New instance of Int16x8 with the values in a and
    * lane i replaced with {s}.
    */
  SIMD.Int16x8.replaceLane = function(a, i, s) {
    return simdReplaceLane("Int16x8", a, i, s);
  }
}

if (typeof SIMD.Int16x8.check === "undefined") {
  /**
    * Check whether the argument is a Int16x8.
    * @param {Int16x8} v An instance of Int16x8.
    * @return {Int16x8} The Int16x8 instance.
    */
  SIMD.Int16x8.check = function(v) {
    if (!(v instanceof SIMD.Int16x8)) {
      throw new TypeError("argument is not a Int16x8.");
    }
    return v;
  }
}

if (typeof SIMD.Int16x8.splat === "undefined") {
  /**
    * Construct a new instance of Int16x8 with the same value
    * in all lanes.
    * @param {integer} value used for all lanes.
    * @constructor
    */
  SIMD.Int16x8.splat = function(s) {
    return simdSplat("Int16x8", s);
  }
}

if (typeof SIMD.Int16x8.fromFloat32x4Bits === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @return {Int16x8} a bit-wise copy of a as a Int16x8.
    */
  SIMD.Int16x8.fromFloat32x4Bits = function(a) {
    return simdFromBits("Int16x8", "Float32x4", a);
  }
}

if (typeof SIMD.Int16x8.fromInt32x4Bits === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Int16x8} a bit-wise copy of a as a Int16x8.
    */
  SIMD.Int16x8.fromInt32x4Bits = function(a) {
    return simdFromBits("Int16x8", "Int32x4", a);
  }
}

if (typeof SIMD.Int16x8.fromInt8x16Bits === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @return {Int16x8} a bit-wise copy of a as a Int16x8.
    */
  SIMD.Int16x8.fromInt8x16Bits = function(a) {
    return simdFromBits("Int16x8", "Int8x16", a);
  }
}

if (!SIMD.Int16x8.prototype.hasOwnProperty('toString')) {
  /**
   * @return {String} a string representing the Int16x8.
   */
  SIMD.Int16x8.prototype.toString = function() {
    return simdToString("Int16x8", this);
  }
}

if (!SIMD.Int16x8.prototype.hasOwnProperty('toLocaleString')) {
  /**
   * @return {String} a locale-sensitive string representing the Int16x8.
   */
  SIMD.Int16x8.prototype.toLocaleString = function() {
    return simdToLocaleString("Int16x8", this);
  }
}

if (!SIMD.Int16x8.prototype.hasOwnProperty('valueOf')) {
  SIMD.Int16x8.prototype.valueOf = function() {
    throw new TypeError("Int16x8 cannot be converted to a number");
  }
}

if (typeof SIMD.Int8x16 === "undefined") {
  /**
    * Construct a new instance of Int8x16 number.
    * @param {integer} 8-bit value used for lane 0.
    * @param {integer} 8-bit value used for lane 1.
    * @param {integer} 8-bit value used for lane 2.
    * @param {integer} 8-bit value used for lane 3.
    * @param {integer} 8-bit value used for lane 4.
    * @param {integer} 8-bit value used for lane 5.
    * @param {integer} 8-bit value used for lane 6.
    * @param {integer} 8-bit value used for lane 7.
    * @param {integer} 8-bit value used for lane 8.
    * @param {integer} 8-bit value used for lane 9.
    * @param {integer} 8-bit value used for lane 10.
    * @param {integer} 8-bit value used for lane 11.
    * @param {integer} 8-bit value used for lane 12.
    * @param {integer} 8-bit value used for lane 13.
    * @param {integer} 8-bit value used for lane 14.
    * @param {integer} 8-bit value used for lane 15.
    * @constructor
    */
  SIMD.Int8x16 = function(s0, s1, s2, s3, s4, s5, s6, s7,
                          s8, s9, s10, s11, s12, s13, s14, s15) {
    if (!(this instanceof SIMD.Int8x16)) {
      return new SIMD.Int8x16(s0, s1, s2, s3, s4, s5, s6, s7,
                              s8, s9, s10, s11, s12, s13, s14, s15);
    }

    this.s_ = [s0 << 24 >> 24, s1 << 24 >> 24, s2 << 24 >> 24,
               s3 << 24 >> 24, s4 << 24 >> 24, s5 << 24 >> 24,
               s6 << 24 >> 24, s7 << 24 >> 24, s8 << 24 >> 24,
               s9 << 24 >> 24, s10 << 24 >> 24, s11 << 24 >> 24,
               s12 << 24 >> 24, s13 << 24 >> 24, s14 << 24 >> 24,
               s15 << 24 >> 24];
  }
}

if (typeof SIMD.Int8x16.extractLane === "undefined") {
  /**
    * @param {Int8x16} v An instance of Int8x16.
    * @param {integer} i Index in v for lane i
    * @return {integer} The value in lane i of v.
    */
  SIMD.Int8x16.extractLane = function(v, i) {
    v = SIMD.Int8x16.check(v);
    simdCheckLaneIndex(i, 16);
    return v.s_[i];
  }
}

if (typeof SIMD.Int8x16.unsignedExtractLane === "undefined") {
  /**
    * @param {Int8x16} v An instance of Int8x16.
    * @param {integer} i Index in concatenation of v for lane i
    * @return {integer} The value in lane i of v extracted as an unsigned value.
    */
  SIMD.Int8x16.unsignedExtractLane = function(v, i) {
    v = SIMD.Int8x16.check(v);
    simdCheckLaneIndex(i, 16);
    return v.s_[i] & 0xff;
  }
}

if (typeof SIMD.Int8x16.replaceLane === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {integer} i Index in a for lane i
    * @param {integer} value used for lane i.
    * @return {Int8x16} New instance of Int8x16 with the values in a and
    * lane i replaced with {s}.
    */
  SIMD.Int8x16.replaceLane = function(a, i, s) {
    return simdReplaceLane("Int8x16", a, i, s);
  }
}

if (typeof SIMD.Int8x16.check === "undefined") {
  /**
    * Check whether the argument is a Int8x16.
    * @param {Int8x16} v An instance of Int8x16.
    * @return {Int8x16} The Int8x16 instance.
    */
  SIMD.Int8x16.check = function(v) {
    if (!(v instanceof SIMD.Int8x16)) {
      throw new TypeError("argument is not a Int8x16.");
    }
    return v;
  }
}

if (typeof SIMD.Int8x16.splat === "undefined") {
  /**
    * Construct a new instance of Int8x16 with the same value
    * in all lanes.
    * @param {integer} value used for all lanes.
    * @constructor
    */
  SIMD.Int8x16.splat = function(s) {
    return simdSplat("Int8x16", s);
  }
}

if (typeof SIMD.Int8x16.fromFloat32x4Bits === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @return {Int8x16} a bit-wise copy of a as a Int8x16.
    */
  SIMD.Int8x16.fromFloat32x4Bits = function(a) {
    return simdFromBits("Int8x16", "Float32x4", a);
  }
}

if (typeof SIMD.Int8x16.fromInt32x4Bits === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Int8x16} a bit-wise copy of a as a Int8x16.
    */
  SIMD.Int8x16.fromInt32x4Bits = function(a) {
    return simdFromBits("Int8x16", "Int32x4", a);
  }
}

if (typeof SIMD.Int8x16.fromInt16x8Bits === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @return {Int8x16} a bit-wise copy of a as a Int8x16.
    */
  SIMD.Int8x16.fromInt16x8Bits = function(a) {
    return simdFromBits("Int8x16", "Int16x8", a);
  }
}

if (!SIMD.Int8x16.prototype.hasOwnProperty('toString')) {
  /**
   * @return {String} a string representing the Int8x16.
   */
  SIMD.Int8x16.prototype.toString = function() {
    return simdToString("Int8x16", this);
  }
}

if (!SIMD.Int8x16.prototype.hasOwnProperty('toLocaleString')) {
  /**
   * @return {String} a locale-sensitive string representing the Int8x16.
   */
  SIMD.Int8x16.prototype.toLocaleString = function() {
    return simdToLocaleString("Int8x16", this);
  }
}

if (!SIMD.Int8x16.prototype.hasOwnProperty('valueOf')) {
  SIMD.Int8x16.prototype.valueOf = function() {
    throw new TypeError("Int8x16 cannot be converted to a number");
  }
}

if (typeof SIMD.Float32x4.abs === "undefined") {
  /**
   * @param {Float32x4} a An instance of Float32x4.
   * @return {Float32x4} New instance of Float32x4 with absolute values of
   * a.
   */
  SIMD.Float32x4.abs = function(a) {
    return simdUnaryOp("Float32x4", Math.abs, a);
  }
}

if (typeof SIMD.Float32x4.neg === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with -a.
    */
  SIMD.Float32x4.neg = function(a) {
    return simdUnaryOp("Float32x4", unaryNeg, a);
  }
}

if (typeof SIMD.Float32x4.add === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with a + b.
    */
  SIMD.Float32x4.add = function(a, b) {
    return simdBinaryOp("Float32x4", binaryAdd, a, b);
  }
}

if (typeof SIMD.Float32x4.sub === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with a - b.
    */
  SIMD.Float32x4.sub = function(a, b) {
    return simdBinaryOp("Float32x4", binarySub, a, b);
  }
}

if (typeof SIMD.Float32x4.mul === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with a * b.
    */
  SIMD.Float32x4.mul = function(a, b) {
    return simdBinaryOp("Float32x4", binaryMul, a, b);
  }
}

if (typeof SIMD.Float32x4.div === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with a / b.
    */
  SIMD.Float32x4.div = function(a, b) {
    return simdBinaryOp("Float32x4", binaryDiv, a, b);
  }
}

if (typeof SIMD.Float32x4.min === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with the minimum value of
    * a and b.
    */
  SIMD.Float32x4.min = function(a, b) {
    return simdBinaryOp("Float32x4", Math.min, a, b);
  }
}

if (typeof SIMD.Float32x4.max === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with the maximum value of
    * a and b.
    */
  SIMD.Float32x4.max = function(a, b) {
    return simdBinaryOp("Float32x4", Math.max, a, b);
  }
}

if (typeof SIMD.Float32x4.minNum === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with the minimum value of
    * a and b, preferring numbers over NaNs.
    */
  SIMD.Float32x4.minNum = function(a, b) {
    return simdBinaryOp("Float32x4", minNum, a, b);
  }
}

if (typeof SIMD.Float32x4.maxNum === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with the maximum value of
    * a and b, preferring numbers over NaNs.
    */
  SIMD.Float32x4.maxNum = function(a, b) {
    return simdBinaryOp("Float32x4", maxNum, a, b);
  }
}

if (typeof SIMD.Float32x4.reciprocalApproximation === "undefined") {
  /**
    * @param {Float32x4} t An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with an approximation of the
    * reciprocal value of t.
    */
  SIMD.Float32x4.reciprocalApproximation = function(t) {
    t = SIMD.Float32x4.check(t);
    return SIMD.Float32x4.div(SIMD.Float32x4.splat(1.0), t);
  }
}

if (typeof SIMD.Float32x4.reciprocalSqrtApproximation === "undefined") {
  /**
    * @param {Float32x4} t An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with an approximation of the
    * reciprocal value of the square root of t.
    */
  SIMD.Float32x4.reciprocalSqrtApproximation = function(t) {
    t = SIMD.Float32x4.check(t);
    return SIMD.Float32x4.reciprocalApproximation(SIMD.Float32x4.sqrt(t));
  }
}

if (typeof SIMD.Float32x4.sqrt === "undefined") {
  /**
    * @param {Float32x4} t An instance of Float32x4.
    * @return {Float32x4} New instance of Float32x4 with square root of
    * values of t.
    */
  SIMD.Float32x4.sqrt = function(t) {
    t = SIMD.Float32x4.check(t);
    return SIMD.Float32x4(Math.sqrt(SIMD.Float32x4.extractLane(t, 0)),
                          Math.sqrt(SIMD.Float32x4.extractLane(t, 1)),
                          Math.sqrt(SIMD.Float32x4.extractLane(t, 2)),
                          Math.sqrt(SIMD.Float32x4.extractLane(t, 3)));
  }
}

if (typeof SIMD.Float32x4.swizzle === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4 to be swizzled.
    * @param {integer} s0 - Index in a for lane 0
    * @param {integer} s1 - Index in a for lane 1
    * @param {integer} s2 - Index in a for lane 2
    * @param {integer} s3 - Index in a for lane 3
    * @return {Float32x4} New instance of Float32x4 with lanes swizzled.
    */
  SIMD.Float32x4.swizzle = function(a, s0, s1, s2, s3) {
    return simdSwizzle("Float32x4", a, [s0, s1, s2, s3]);
  }
}

if (typeof SIMD.Float32x4.shuffle === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4 to be shuffled.
    * @param {Float32x4} b An instance of Float32x4 to be shuffled.
    * @param {integer} s0 - Index in concatenation of a and b for lane 0
    * @param {integer} s1 - Index in concatenation of a and b for lane 1
    * @param {integer} s2 - Index in concatenation of a and b for lane 2
    * @param {integer} s3 - Index in concatenation of a and b for lane 3
    * @return {Float32x4} New instance of Float32x4 with lanes shuffled.
    */
  SIMD.Float32x4.shuffle = function(a, b, s0, s1, s2, s3) {
    return simdShuffle("Float32x4", a, b, [s0, s1, s2, s3]);
  }
}

if (typeof SIMD.Float32x4.lessThan === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a < b.
    */
  SIMD.Float32x4.lessThan = function(a, b) {
    return simdRelationalOp("Float32x4", binaryLess, a, b);
  }
}

if (typeof SIMD.Float32x4.lessThanOrEqual === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a <= b.
    */
  SIMD.Float32x4.lessThanOrEqual = function(a, b) {
    return simdRelationalOp("Float32x4", binaryLessEqual, a, b);
  }
}

if (typeof SIMD.Float32x4.equal === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a == b.
    */
  SIMD.Float32x4.equal = function(a, b) {
    return simdRelationalOp("Float32x4", binaryEqual, a, b);
  }
}

if (typeof SIMD.Float32x4.notEqual === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a != b.
    */
  SIMD.Float32x4.notEqual = function(a, b) {
    return simdRelationalOp("Float32x4", binaryNotEqual, a, b);
  }
}

if (typeof SIMD.Float32x4.greaterThanOrEqual === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} v An instance of Float32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a >= b.
    */
  SIMD.Float32x4.greaterThanOrEqual = function(a, b) {
    return simdRelationalOp("Float32x4", binaryGreaterEqual, a, b);
  }
}

if (typeof SIMD.Float32x4.greaterThan === "undefined") {
  /**
    * @param {Float32x4} a An instance of Float32x4.
    * @param {Float32x4} b An instance of Float32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a > b.
    */
  SIMD.Float32x4.greaterThan = function(a, b) {
    return simdRelationalOp("Float32x4", binaryGreater, a, b);
  }
}

if (typeof SIMD.Float32x4.select === "undefined") {
  /**
    * @param {Bool32x4} t Selector mask. An instance of Bool32x4
    * @param {Float32x4} trueValue Pick lane from here if corresponding
    * selector lane is true
    * @param {Float32x4} falseValue Pick lane from here if corresponding
    * selector lane is false
    * @return {Float32x4} Mix of lanes from trueValue or falseValue as
    * indicated
    */
  SIMD.Float32x4.select = function(t, trueValue, falseValue) {
    return simdSelect("Float32x4", t, trueValue, falseValue);
  }
}

if (typeof SIMD.Float32x4.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Float32x4} New instance of Float32x4.
    */
  SIMD.Float32x4.load = function(tarray, index) {
    return simdLoad("Float32x4", tarray, index, 4);
  }
}

if (typeof SIMD.Float32x4.load1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Float32x4} New instance of Float32x4.
    */
  SIMD.Float32x4.load1 = function(tarray, index) {
    return simdLoad("Float32x4", tarray, index, 1);
  }
}

if (typeof SIMD.Float32x4.load2 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Float32x4} New instance of Float32x4.
    */
  SIMD.Float32x4.load2 = function(tarray, index) {
    return simdLoad("Float32x4", tarray, index, 2);
  }
}

if (typeof SIMD.Float32x4.load3 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Float32x4} New instance of Float32x4.
    */
  SIMD.Float32x4.load3 = function(tarray, index) {
    return simdLoad("Float32x4", tarray, index, 3);
  }
}

if (typeof SIMD.Float32x4.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Float32x4} a An instance of Float32x4.
    * @return {Float32x4} a
    */
  SIMD.Float32x4.store = function(tarray, index, a) {
    return simdStore("Float32x4", tarray, index, a, 4);
  }
}

if (typeof SIMD.Float32x4.store1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Float32x4} value An instance of Float32x4.
    * @return {Float32x4} value
    */
  SIMD.Float32x4.store1 = function(tarray, index, a) {
    return simdStore("Float32x4", tarray, index, a, 1);
  }
}

if (typeof SIMD.Float32x4.store2 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Float32x4} a An instance of Float32x4.
    * @return {Float32x4} a
    */
  SIMD.Float32x4.store2 = function(tarray, index, a) {
    return simdStore("Float32x4", tarray, index, a, 2);
  }
}

if (typeof SIMD.Float32x4.store3 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Float32x4} a An instance of Float32x4.
    * @return {Float32x4} a
    */
  SIMD.Float32x4.store3 = function(tarray, index, a) {
    return simdStore("Float32x4", tarray, index, a, 3);
  }
}


if (typeof SIMD.Int32x4.and === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Int32x4} New instance of Int32x4 with values of a & b.
    */
  SIMD.Int32x4.and = function(a, b) {
    return simdBinaryOp("Int32x4", binaryAnd, a, b);
  }
}

if (typeof SIMD.Int32x4.or === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Int32x4} New instance of Int32x4 with values of a | b.
    */
  SIMD.Int32x4.or = function(a, b) {
    return simdBinaryOp("Int32x4", binaryOr, a, b);
  }
}

if (typeof SIMD.Int32x4.xor === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Int32x4} New instance of Int32x4 with values of a ^ b.
    */
  SIMD.Int32x4.xor = function(a, b) {
    return simdBinaryOp("Int32x4", binaryXor, a, b);
  }
}

if (typeof SIMD.Int32x4.not === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Int32x4} New instance of Bool8x16 with values of ~a.
    */
  SIMD.Int32x4.not = function(a) {
    return simdUnaryOp("Int32x4", unaryBitwiseNot, a);
  }
}

if (typeof SIMD.Int32x4.neg === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Int32x4} New instance of Bool8x16 with values of -a.
    */
  SIMD.Int32x4.neg = function(a) {
    return simdUnaryOp("Int32x4", unaryNeg, a);
  }
}

if (typeof SIMD.Int32x4.add === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Int32x4} New instance of Int32x4 with values of a + b.
    */
  SIMD.Int32x4.add = function(a, b) {
    return simdBinaryOp("Int32x4", binaryAdd, a, b);
  }
}

if (typeof SIMD.Int32x4.sub === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Int32x4} New instance of Int32x4 with values of a - b.
    */
  SIMD.Int32x4.sub = function(a, b) {
    return simdBinaryOp("Int32x4", binarySub, a, b);
  }
}

if (typeof SIMD.Int32x4.mul === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Int32x4} New instance of Int32x4 with values of a * b.
    */
  SIMD.Int32x4.mul = function(a, b) {
    return simdBinaryOp("Int32x4", Math.imul, a, b);
  }
}

if (typeof SIMD.Int32x4.swizzle === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4 to be swizzled.
    * @param {integer} s0 - Index in a for lane 0
    * @param {integer} s1 - Index in a for lane 1
    * @param {integer} s2 - Index in a for lane 2
    * @param {integer} s3 - Index in a for lane 3
    * @return {Int32x4} New instance of Int32x4 with lanes swizzled.
    */
  SIMD.Int32x4.swizzle = function(a, s0, s1, s2, s3) {
    return simdSwizzle("Int32x4", a, [s0, s1, s2, s3]);
  }
}

if (typeof SIMD.Int32x4.shuffle === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4 to be shuffled.
    * @param {Int32x4} b An instance of Int32x4 to be shuffled.
    * @param {integer} s0 - Index in concatenation of a and b for lane 0
    * @param {integer} s1 - Index in concatenation of a and b for lane 1
    * @param {integer} s2 - Index in concatenation of a and b for lane 2
    * @param {integer} s3 - Index in concatenation of a and b for lane 3
    * @return {Int32x4} New instance of Int32x4 with lanes shuffled.
    */
  SIMD.Int32x4.shuffle = function(a, b, s0, s1, s2, s3) {
    return simdShuffle("Int32x4", a, b, [s0, s1, s2, s3]);
  }
}

if (typeof SIMD.Int32x4.unsignedHorizontalSum === "undefined") {
  /**
    * @param {Int32x4} a An instance of 32x4.
    * @return {Number} The sum of all the lanes in a, extracted as unsigned values.
    */
  SIMD.Int32x4.unsignedHorizontalSum = function(a) {
    a = SIMD.Int32x4.check(a);
    return (SIMD.Int32x4.extractLane(a, 0)>>>0) +
           (SIMD.Int32x4.extractLane(a, 1)>>>0) +
           (SIMD.Int32x4.extractLane(a, 2)>>>0) +
           (SIMD.Int32x4.extractLane(a, 3)>>>0);
  }
}

if (typeof SIMD.Int32x4.select === "undefined") {
  /**
    * @param {Bool32x4} t Selector mask. An instance of Bool32x4
    * @param {Int32x4} trueValue Pick lane from here if corresponding
    * selector lane is true
    * @param {Int32x4} falseValue Pick lane from here if corresponding
    * selector lane is false
    * @return {Int32x4} Mix of lanes from trueValue or falseValue as
    * indicated
    */
  SIMD.Int32x4.select = function(t, trueValue, falseValue) {
    return simdSelect("Int32x4", t, trueValue, falseValue);
  }
}

if (typeof SIMD.Int32x4.equal === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a == b.
    */
  SIMD.Int32x4.equal = function(a, b) {
    return simdRelationalOp("Int32x4", binaryEqual, a, b);
  }
}

if (typeof SIMD.Int32x4.notEqual === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a != b.
    */
  SIMD.Int32x4.notEqual = function(a, b) {
    return simdRelationalOp("Int32x4", binaryNotEqual, a, b);
  }
}

if (typeof SIMD.Int32x4.greaterThan === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a > b.
    */
  SIMD.Int32x4.greaterThan = function(a, b) {
    return simdRelationalOp("Int32x4", binaryGreater, a, b);
  }
}

if (typeof SIMD.Int32x4.greaterThanOrEqual === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a >= b.
    */
  SIMD.Int32x4.greaterThanOrEqual = function(a, b) {
    return simdRelationalOp("Int32x4", binaryGreaterEqual, a, b);
  }
}

if (typeof SIMD.Int32x4.lessThan === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a < b.
    */
  SIMD.Int32x4.lessThan = function(a, b) {
    return simdRelationalOp("Int32x4", binaryLess, a, b);
  }
}

if (typeof SIMD.Int32x4.lessThanOrEqual === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {Int32x4} b An instance of Int32x4.
    * @return {Bool32x4} true or false in each lane depending on
    * the result of a <= b.
    */
  SIMD.Int32x4.lessThanOrEqual = function(a, b) {
    return simdRelationalOp("Int32x4", binaryLessEqual, a, b);
  }
}

if (typeof SIMD.Int32x4.shiftLeftByScalar === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {integer} bits Bit count to shift by.
    * @return {Int32x4} lanes in a shifted by bits.
    */
  SIMD.Int32x4.shiftLeftByScalar = function(a, bits) {
    a = SIMD.Int32x4.check(a);
    if (bits>>>0 >= 32)
      return SIMD.Int32x4.splat(0.0);
    return simdShiftOp("Int32x4", binaryShiftLeft, a, bits);
  }
}

if (typeof SIMD.Int32x4.shiftRightLogicalByScalar === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {integer} bits Bit count to shift by.
    * @return {Int32x4} lanes in a shifted by bits.
    */
  SIMD.Int32x4.shiftRightLogicalByScalar = function(a, bits) {
    a = SIMD.Int32x4.check(a);
    if (bits>>>0 >= 32)
      return SIMD.Int32x4.splat(0.0);
    return simdShiftOp("Int32x4", binaryShiftRightLogical32, a, bits);
  }
}

if (typeof SIMD.Int32x4.shiftRightArithmeticByScalar === "undefined") {
  /**
    * @param {Int32x4} a An instance of Int32x4.
    * @param {integer} bits Bit count to shift by.
    * @return {Int32x4} lanes in a shifted by bits.
    */
  SIMD.Int32x4.shiftRightArithmeticByScalar = function(a, bits) {
    a = SIMD.Int32x4.check(a);
    if (bits>>>0 >= 32)
      bits = 31;
    return simdShiftOp("Int32x4", binaryShiftRightArithmetic, a, bits);
  }
}

if (typeof SIMD.Int32x4.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Int32x4} New instance of Int32x4.
    */
  SIMD.Int32x4.load = function(tarray, index) {
    return simdLoad("Int32x4", tarray, index, 4);
  }
}

if (typeof SIMD.Int32x4.load1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Int32x4} New instance of Int32x4.
    */
  SIMD.Int32x4.load1 = function(tarray, index) {
    return simdLoad("Int32x4", tarray, index, 1);
  }
}

if (typeof SIMD.Int32x4.load2 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Int32x4} New instance of Int32x4.
    */
  SIMD.Int32x4.load2 = function(tarray, index) {
    return simdLoad("Int32x4", tarray, index, 2);
  }
}

if (typeof SIMD.Int32x4.load3 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Int32x4} New instance of Int32x4.
    */
  SIMD.Int32x4.load3 = function(tarray, index) {
    return simdLoad("Int32x4", tarray, index, 3);
  }
}

if (typeof SIMD.Int32x4.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Int32x4} a
    */
  SIMD.Int32x4.store = function(tarray, index, a) {
    return simdStore("Int32x4", tarray, index, a, 4);
  }
}

if (typeof SIMD.Int32x4.store1 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Int32x4} a
    */
  SIMD.Int32x4.store1 = function(tarray, index, a) {
    return simdStore("Int32x4", tarray, index, a, 1);
  }
}

if (typeof SIMD.Int32x4.store2 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Int32x4} a
    */
  SIMD.Int32x4.store2 = function(tarray, index, a) {
    return simdStore("Int32x4", tarray, index, a, 2);
  }
}

if (typeof SIMD.Int32x4.store3 === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Int32x4} a An instance of Int32x4.
    * @return {Int32x4} a
    */
  SIMD.Int32x4.store3 = function(tarray, index, a) {
    return simdStore("Int32x4", tarray, index, a, 3);
  }
}

if (typeof SIMD.Int16x8.and === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of a & b.
    */
  SIMD.Int16x8.and = function(a, b) {
    return simdBinaryOp("Int16x8", binaryAnd, a, b);
  }
}

if (typeof SIMD.Int16x8.or === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of a | b.
    */
  SIMD.Int16x8.or = function(a, b) {
    return simdBinaryOp("Int16x8", binaryOr, a, b);
  }
}

if (typeof SIMD.Int16x8.xor === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of a ^ b.
    */
  SIMD.Int16x8.xor = function(a, b) {
    return simdBinaryOp("Int16x8", binaryXor, a, b);
  }
}

if (typeof SIMD.Int16x8.not === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of ~a.
    */
  SIMD.Int16x8.not = function(a) {
    return simdUnaryOp("Int16x8", unaryBitwiseNot, a);
  }
}

if (typeof SIMD.Int16x8.neg === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of -a.
    */
  SIMD.Int16x8.neg = function(a) {
    return simdUnaryOp("Int16x8", unaryNeg, a);
  }
}

if (typeof SIMD.Int16x8.add === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of a + b.
    */
  SIMD.Int16x8.add = function(a, b) {
    return simdBinaryOp("Int16x8", binaryAdd, a, b);
  }
}

if (typeof SIMD.Int16x8.sub === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of a - b.
    */
  SIMD.Int16x8.sub = function(a, b) {
    return simdBinaryOp("Int16x8", binarySub, a, b);
  }
}

if (typeof SIMD.Int16x8.mul === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of a * b.
    */
  SIMD.Int16x8.mul = function(a, b) {
    return simdBinaryOp("Int16x8", Math.imul, a, b);
  }
}

if (typeof SIMD.Int16x8.swizzle === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8 to be swizzled.
    * @param {integer} s0 - Index in a for lane s0
    * @param {integer} s1 - Index in a for lane s1
    * @param {integer} s2 - Index in a for lane s2
    * @param {integer} s3 - Index in a for lane s3
    * @param {integer} s4 - Index in a for lane s4
    * @param {integer} s5 - Index in a for lane s5
    * @param {integer} s6 - Index in a for lane s6
    * @param {integer} s7 - Index in a for lane s7
    * @return {Int16x8} New instance of Int16x8 with lanes swizzled.
    */
  SIMD.Int16x8.swizzle = function(a, s0, s1, s2, s3, s4, s5, s6, s7) {
    return simdSwizzle("Int16x8", a, [s0, s1, s2, s3, s4, s5, s6, s7]);
  }
}

if (typeof SIMD.Int16x8.shuffle === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8 to be shuffled.
    * @param {Int16x8} b An instance of Int16x8 to be shuffled.
    * @param {integer} s0 - Index in concatenation of a and b for lane 0
    * @param {integer} s1 - Index in concatenation of a and b for lane 1
    * @param {integer} s2 - Index in concatenation of a and b for lane 2
    * @param {integer} s3 - Index in concatenation of a and b for lane 3
    * @param {integer} s4 - Index in concatenation of a and b for lane 4
    * @param {integer} s5 - Index in concatenation of a and b for lane 5
    * @param {integer} s6 - Index in concatenation of a and b for lane 6
    * @param {integer} s7 - Index in concatenation of a and b for lane 7
    * @return {Int16x8} New instance of Int16x8 with lanes shuffled.
    */
  SIMD.Int16x8.shuffle = function(a, b, s0, s1, s2, s3, s4, s5, s6, s7) {
    return simdShuffle("Int16x8", a, b, [s0, s1, s2, s3, s4, s5, s6, s7]);
  }
}

if (typeof SIMD.Int16x8.addSaturate === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of a + b with
    * signed saturating behavior on overflow.
    */
  SIMD.Int16x8.addSaturate = function(a, b) {
    a = SIMD.Int16x8.check(a);
    b = SIMD.Int16x8.check(b);
    var c = SIMD.Int16x8.add(a, b);
    var max = SIMD.Int16x8.splat(0x7fff);
    var min = SIMD.Int16x8.splat(0x8000);
    var mask = SIMD.Int16x8.lessThan(c, a);
    var bneg = SIMD.Int16x8.lessThan(b, SIMD.Int16x8.splat(0));
    return SIMD.Int16x8.select(SIMD.Bool16x8.and(mask, SIMD.Bool16x8.not(bneg)), max,
             SIMD.Int16x8.select(SIMD.Bool16x8.and(SIMD.Bool16x8.not(mask), bneg), min,
               c));
  }
}

if (typeof SIMD.Int16x8.subSaturate === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int16x8} New instance of Int16x8 with values of a - b with
    * signed saturating behavior on overflow.
    */
  SIMD.Int16x8.subSaturate = function(a, b) {
    a = SIMD.Int16x8.check(a);
    b = SIMD.Int16x8.check(b);
    var c = SIMD.Int16x8.sub(a, b);
    var max = SIMD.Int16x8.splat(0x7fff);
    var min = SIMD.Int16x8.splat(0x8000);
    var mask = SIMD.Int16x8.greaterThan(c, a);
    var bneg = SIMD.Int16x8.lessThan(b, SIMD.Int16x8.splat(0));
    return SIMD.Int16x8.select(SIMD.Bool16x8.and(mask, SIMD.Bool16x8.not(bneg)), min,
             SIMD.Int16x8.select(SIMD.Bool16x8.and(SIMD.Bool16x8.not(mask), bneg), max,
               c));
  }
}

if (typeof SIMD.Int16x8.unsignedAbsoluteDifference === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int8x16.
    * @param {Int16x8} b An instance of Int8x16.
    * @return {Int16x8} The absolute differences (abs(x - y)) of the
    * corresponding elements of a and b. x and y are interpreted as unsigned
    * integers.
    */
  SIMD.Int16x8.unsignedAbsoluteDifference = function(a, b) {
    a = SIMD.Int16x8.check(a);
    b = SIMD.Int16x8.check(b);
    var x = SIMD.Int16x8(
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 0) - SIMD.Int16x8.unsignedExtractLane(b, 0)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 1) - SIMD.Int16x8.unsignedExtractLane(b, 1)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 2) - SIMD.Int16x8.unsignedExtractLane(b, 2)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 3) - SIMD.Int16x8.unsignedExtractLane(b, 3)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 4) - SIMD.Int16x8.unsignedExtractLane(b, 4)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 5) - SIMD.Int16x8.unsignedExtractLane(b, 5)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 6) - SIMD.Int16x8.unsignedExtractLane(b, 6)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 7) - SIMD.Int16x8.unsignedExtractLane(b, 7)));
    return x;
  }
}

if (typeof SIMD.Int16x8.widenedUnsignedAbsoluteDifference === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Int32x4} The absolute differences (abs(x - y)) of the
    * first 4 corresponding elements of a and b, returning 32-bit results.
    * x and y are interpreted as unsigned integers.
    */
  SIMD.Int16x8.widenedUnsignedAbsoluteDifference = function(a, b) {
    a = SIMD.Int16x8.check(a);
    b = SIMD.Int16x8.check(b);
    return SIMD.Int32x4(
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 0) - SIMD.Int16x8.unsignedExtractLane(b, 0)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 1) - SIMD.Int16x8.unsignedExtractLane(b, 1)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 2) - SIMD.Int16x8.unsignedExtractLane(b, 2)),
        Math.abs(
            SIMD.Int16x8.unsignedExtractLane(a, 3) - SIMD.Int16x8.unsignedExtractLane(b, 3)));
  }
}

if (typeof SIMD.Int16x8.unsignedHorizontalSum === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @return {Number} The sum of all the lanes in a, extracted as unsigned values.
    */
  SIMD.Int16x8.unsignedHorizontalSum = function(a) {
    a = SIMD.Int16x8.check(a);
    return SIMD.Int16x8.unsignedExtractLane(a, 0) +
           SIMD.Int16x8.unsignedExtractLane(a, 1) +
           SIMD.Int16x8.unsignedExtractLane(a, 2) +
           SIMD.Int16x8.unsignedExtractLane(a, 3) +
           SIMD.Int16x8.unsignedExtractLane(a, 4) +
           SIMD.Int16x8.unsignedExtractLane(a, 5) +
           SIMD.Int16x8.unsignedExtractLane(a, 6) +
           SIMD.Int16x8.unsignedExtractLane(a, 7);
  }
}

if (typeof SIMD.Int16x8.select === "undefined") {
  /**
    * @param {Bool16x8} t Selector mask. An instance of Bool16x8
    * @param {Int16x8} trueValue Pick lane from here if corresponding
    * selector lane is true
    * @param {Int16x8} falseValue Pick lane from here if corresponding
    * selector lane is false
    * @return {Int16x8} Mix of lanes from trueValue or falseValue as
    * indicated
    */
  SIMD.Int16x8.select = function(t, trueValue, falseValue) {
    return simdSelect("Int16x8", t, trueValue, falseValue);
  }
}

if (typeof SIMD.Int16x8.equal === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Bool16x8} true or false in each lane depending on
    * the result of a == b.
    */
  SIMD.Int16x8.equal = function(a, b) {
    return simdRelationalOp("Int16x8", binaryEqual, a, b);
  }
}

if (typeof SIMD.Int16x8.notEqual === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Bool16x8} true or false in each lane depending on
    * the result of a != b.
    */
  SIMD.Int16x8.notEqual = function(a, b) {
    return simdRelationalOp("Int16x8", binaryNotEqual, a, b);
  }
}

if (typeof SIMD.Int16x8.greaterThan === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Bool16x8} true or false in each lane depending on
    * the result of a > b.
    */
  SIMD.Int16x8.greaterThan = function(a, b) {
    return simdRelationalOp("Int16x8", binaryGreater, a, b);
  }
}

if (typeof SIMD.Int16x8.greaterThanOrEqual === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Bool16x8} true or false in each lane depending on
    * the result of a >= b.
    */
  SIMD.Int16x8.greaterThanOrEqual = function(a, b) {
    return simdRelationalOp("Int16x8", binaryGreaterEqual, a, b);
  }
}

if (typeof SIMD.Int16x8.lessThan === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Bool16x8} true or false in each lane depending on
    * the result of a < b.
    */
  SIMD.Int16x8.lessThan = function(a, b) {
    return simdRelationalOp("Int16x8", binaryLess, a, b);
  }
}

if (typeof SIMD.Int16x8.lessThanOrEqual === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {Int16x8} b An instance of Int16x8.
    * @return {Bool16x8} true or false in each lane depending on
    * the result of a <= b.
    */
  SIMD.Int16x8.lessThanOrEqual = function(a, b) {
    return simdRelationalOp("Int16x8", binaryLessEqual, a, b);
  }
}

if (typeof SIMD.Int16x8.shiftLeftByScalar === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {integer} bits Bit count to shift by.
    * @return {Int16x8} lanes in a shifted by bits.
    */
  SIMD.Int16x8.shiftLeftByScalar = function(a, bits) {
    a = SIMD.Int16x8.check(a);
    if (bits>>>0 > 16)
      bits = 16;
    return simdShiftOp("Int16x8", binaryShiftLeft, a, bits);
  }
}

if (typeof SIMD.Int16x8.shiftRightLogicalByScalar === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {integer} bits Bit count to shift by.
    * @return {Int16x8} lanes in a shifted by bits.
    */
  SIMD.Int16x8.shiftRightLogicalByScalar = function(a, bits) {
    a = SIMD.Int16x8.check(a);
    if (bits>>>0 >= 16)
      return SIMD.Int16x8.splat(0.0);
    return simdShiftOp("Int16x8", binaryShiftRightLogical16, a, bits);
  }
}

if (typeof SIMD.Int16x8.shiftRightArithmeticByScalar === "undefined") {
  /**
    * @param {Int16x8} a An instance of Int16x8.
    * @param {integer} bits Bit count to shift by.
    * @return {Int16x8} lanes in a shifted by bits.
    */
  SIMD.Int16x8.shiftRightArithmeticByScalar = function(a, bits) {
    a = SIMD.Int16x8.check(a);
    if (bits>>>0 > 16)
      bits = 16;
    return simdShiftOp("Int16x8", binaryShiftRightArithmetic, a, bits);
  }
}

if (typeof SIMD.Int16x8.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Int16x8} New instance of Int16x8.
    */
  SIMD.Int16x8.load = function(tarray, index) {
    return simdLoad("Int16x8", tarray, index, 8);
  }
}

if (typeof SIMD.Int16x8.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Int16x8} a An instance of Int16x8.
    * @return {Int16x8} a
    */
  SIMD.Int16x8.store = function(tarray, index, a) {
    return simdStore("Int16x8", tarray, index, a, 8);
  }
}

if (typeof SIMD.Int8x16.and === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of a & b.
    */
  SIMD.Int8x16.and = function(a, b) {
    return simdBinaryOp("Int8x16", binaryAnd, a, b);
  }
}

if (typeof SIMD.Int8x16.or === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of a | b.
    */
  SIMD.Int8x16.or = function(a, b) {
    return simdBinaryOp("Int8x16", binaryOr, a, b);
  }
}

if (typeof SIMD.Int8x16.xor === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of a ^ b.
    */
  SIMD.Int8x16.xor = function(a, b) {
    return simdBinaryOp("Int8x16", binaryXor, a, b);
  }
}

if (typeof SIMD.Int8x16.not === "undefined") {
  /**
    * @param {Int8x16} t An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of ~t
    */
  SIMD.Int8x16.not = function(t) {
    return simdUnaryOp("Int8x16", unaryBitwiseNot, a);
  }
}

if (typeof SIMD.Int8x16.neg === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with negated values of a.
    */
  SIMD.Int8x16.neg = function(a) {
    return simdUnaryOp("Int8x16", unaryNeg, a);
  }
}

if (typeof SIMD.Int8x16.add === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of a + b.
    */
  SIMD.Int8x16.add = function(a, b) {
    return simdBinaryOp("Int8x16", binaryAdd, a, b);
  }
}

if (typeof SIMD.Int8x16.sub === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of a - b.
    */
  SIMD.Int8x16.sub = function(a, b) {
    return simdBinaryOp("Int8x16", binarySub, a, b);
  }
}

if (typeof SIMD.Int8x16.mul === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of a * b.
    */
  SIMD.Int8x16.mul = function(a, b) {
    return simdBinaryOp("Int8x16", Math.imul, a, b);
  }
}

if (typeof SIMD.Int8x16.swizzle === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16 to be swizzled.
    * @param {integer} s0 - Index in a for lane s0
    * @param {integer} s1 - Index in a for lane s1
    * @param {integer} s2 - Index in a for lane s2
    * @param {integer} s3 - Index in a for lane s3
    * @param {integer} s4 - Index in a for lane s4
    * @param {integer} s5 - Index in a for lane s5
    * @param {integer} s6 - Index in a for lane s6
    * @param {integer} s7 - Index in a for lane s7
    * @param {integer} s8 - Index in a for lane s8
    * @param {integer} s9 - Index in a for lane s9
    * @param {integer} s10 - Index in a for lane s10
    * @param {integer} s11 - Index in a for lane s11
    * @param {integer} s12 - Index in a for lane s12
    * @param {integer} s13 - Index in a for lane s13
    * @param {integer} s14 - Index in a for lane s14
    * @param {integer} s15 - Index in a for lane s15
    * @return {Int8x16} New instance of Int8x16 with lanes swizzled.
    */
  SIMD.Int8x16.swizzle = function(a, s0, s1, s2, s3, s4, s5, s6, s7,
                                     s8, s9, s10, s11, s12, s13, s14, s15) {
    return simdSwizzle("Int8x16", a, [s0, s1, s2, s3, s4, s5, s6, s7,
                                      s8, s9, s10, s11, s12, s13, s14, s15]);
  }
}

if (typeof SIMD.Int8x16.shuffle === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16 to be shuffled.
    * @param {Int8x16} b An instance of Int8x16 to be shuffled.
    * @param {integer} s0 - Index in concatenation of a and b for lane 0
    * @param {integer} s1 - Index in concatenation of a and b for lane 1
    * @param {integer} s2 - Index in concatenation of a and b for lane 2
    * @param {integer} s3 - Index in concatenation of a and b for lane 3
    * @param {integer} s4 - Index in concatenation of a and b for lane 4
    * @param {integer} s5 - Index in concatenation of a and b for lane 5
    * @param {integer} s6 - Index in concatenation of a and b for lane 6
    * @param {integer} s7 - Index in concatenation of a and b for lane 7
    * @param {integer} s8 - Index in concatenation of a and b for lane 8
    * @param {integer} s9 - Index in concatenation of a and b for lane 9
    * @param {integer} s10 - Index in concatenation of a and b for lane 10
    * @param {integer} s11 - Index in concatenation of a and b for lane 11
    * @param {integer} s12 - Index in concatenation of a and b for lane 12
    * @param {integer} s13 - Index in concatenation of a and b for lane 13
    * @param {integer} s14 - Index in concatenation of a and b for lane 14
    * @param {integer} s15 - Index in concatenation of a and b for lane 15
    * @return {Int8x16} New instance of Int8x16 with lanes shuffled.
    */
  SIMD.Int8x16.shuffle = function(a, b, s0, s1, s2, s3, s4, s5, s6, s7,
                                        s8, s9, s10, s11, s12, s13, s14, s15) {
    return simdShuffle("Int8x16", a, b, [s0, s1, s2, s3, s4, s5, s6, s7,
                                         s8, s9, s10, s11, s12, s13, s14, s15]);
  }
}

if (typeof SIMD.Int8x16.addSaturate === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of a + b with
    * signed saturating behavior on overflow.
    */
  SIMD.Int8x16.addSaturate = function(a, b) {
    a = SIMD.Int8x16.check(a);
    b = SIMD.Int8x16.check(b);
    var c = SIMD.Int8x16.add(a, b);
    var max = SIMD.Int8x16.splat(0x7f);
    var min = SIMD.Int8x16.splat(0x80);
    var mask = SIMD.Int8x16.lessThan(c, a);
    var bneg = SIMD.Int8x16.lessThan(b, SIMD.Int8x16.splat(0));
    return SIMD.Int8x16.select(SIMD.Bool8x16.and(mask, SIMD.Bool8x16.not(bneg)), max,
             SIMD.Int8x16.select(SIMD.Bool8x16.and(SIMD.Bool8x16.not(mask), bneg), min,
               c));
  }
}

if (typeof SIMD.Int8x16.subSaturate === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} New instance of Int8x16 with values of a - b with
    * signed saturating behavior on overflow.
    */
  SIMD.Int8x16.subSaturate = function(a, b) {
    a = SIMD.Int8x16.check(a);
    b = SIMD.Int8x16.check(b);
    var c = SIMD.Int8x16.sub(a, b);
    var max = SIMD.Int8x16.splat(0x7f);
    var min = SIMD.Int8x16.splat(0x80);
    var mask = SIMD.Int8x16.greaterThan(c, a);
    var bneg = SIMD.Int8x16.lessThan(b, SIMD.Int8x16.splat(0));
    return SIMD.Int8x16.select(SIMD.Bool8x16.and(mask, SIMD.Bool8x16.not(bneg)), min,
             SIMD.Int8x16.select(SIMD.Bool8x16.and(SIMD.Bool8x16.not(mask), bneg), max,
               c));
  }
}

if (typeof SIMD.Int8x16.unsignedAbsoluteDifference === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int8x16} The absolute differences (abs(x - y)) of the
    * corresponding elements of a and b. x and y are interpreted as unsigned
    * integers.
    */
  SIMD.Int8x16.unsignedAbsoluteDifference = function(a, b) {
    a = SIMD.Int8x16.check(a);
    b = SIMD.Int8x16.check(b);
    var x = SIMD.Int8x16(
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 0) - SIMD.Int8x16.unsignedExtractLane(b, 0)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 1) - SIMD.Int8x16.unsignedExtractLane(b, 1)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 2) - SIMD.Int8x16.unsignedExtractLane(b, 2)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 3) - SIMD.Int8x16.unsignedExtractLane(b, 3)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 4) - SIMD.Int8x16.unsignedExtractLane(b, 4)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 5) - SIMD.Int8x16.unsignedExtractLane(b, 5)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 6) - SIMD.Int8x16.unsignedExtractLane(b, 6)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 7) - SIMD.Int8x16.unsignedExtractLane(b, 7)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 8) - SIMD.Int8x16.unsignedExtractLane(b, 8)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 9) - SIMD.Int8x16.unsignedExtractLane(b, 9)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 10) - SIMD.Int8x16.unsignedExtractLane(b, 10)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 11) - SIMD.Int8x16.unsignedExtractLane(b, 11)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 12) - SIMD.Int8x16.unsignedExtractLane(b, 12)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 13) - SIMD.Int8x16.unsignedExtractLane(b, 13)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 14) - SIMD.Int8x16.unsignedExtractLane(b, 14)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 15) - SIMD.Int8x16.unsignedExtractLane(b, 15)));
    return x;
  }
}

if (typeof SIMD.Int8x16.widenedUnsignedAbsoluteDifference === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Int16x8} The absolute differences (abs(x - y)) of the
    * first 8 corresponding elements of a and b, returning 16-bit results.
    * x and y are interpreted as unsigned integers.
    */
  SIMD.Int8x16.widenedUnsignedAbsoluteDifference = function(a, b) {
    a = SIMD.Int8x16.check(a);
    b = SIMD.Int8x16.check(b);
    return SIMD.Int16x8(
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 0) - SIMD.Int8x16.unsignedExtractLane(b, 0)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 1) - SIMD.Int8x16.unsignedExtractLane(b, 1)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 2) - SIMD.Int8x16.unsignedExtractLane(b, 2)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 3) - SIMD.Int8x16.unsignedExtractLane(b, 3)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 4) - SIMD.Int8x16.unsignedExtractLane(b, 4)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 5) - SIMD.Int8x16.unsignedExtractLane(b, 5)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 6) - SIMD.Int8x16.unsignedExtractLane(b, 6)),
        Math.abs(
            SIMD.Int8x16.unsignedExtractLane(a, 7) - SIMD.Int8x16.unsignedExtractLane(b, 7)));
  }
}

if (typeof SIMD.Int8x16.unsignedHorizontalSum === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @return {Number} The sum of all the lanes in a, extracted as unsigned values.
    */
  SIMD.Int8x16.unsignedHorizontalSum = function(a) {
    a = SIMD.Int8x16.check(a);
    return SIMD.Int8x16.unsignedExtractLane(a, 0) +
           SIMD.Int8x16.unsignedExtractLane(a, 1) +
           SIMD.Int8x16.unsignedExtractLane(a, 2) +
           SIMD.Int8x16.unsignedExtractLane(a, 3) +
           SIMD.Int8x16.unsignedExtractLane(a, 4) +
           SIMD.Int8x16.unsignedExtractLane(a, 5) +
           SIMD.Int8x16.unsignedExtractLane(a, 6) +
           SIMD.Int8x16.unsignedExtractLane(a, 7) +
           SIMD.Int8x16.unsignedExtractLane(a, 8) +
           SIMD.Int8x16.unsignedExtractLane(a, 9) +
           SIMD.Int8x16.unsignedExtractLane(a, 10) +
           SIMD.Int8x16.unsignedExtractLane(a, 11) +
           SIMD.Int8x16.unsignedExtractLane(a, 12) +
           SIMD.Int8x16.unsignedExtractLane(a, 13) +
           SIMD.Int8x16.unsignedExtractLane(a, 14) +
           SIMD.Int8x16.unsignedExtractLane(a, 15);
  }
}

if (typeof SIMD.Int8x16.select === "undefined") {
  /**
    * @param {Bool8x16} t Selector mask. An instance of Bool8x16
    * @param {Int8x16} trueValue Pick lane from here if corresponding
    * selector lane is true
    * @param {Int8x16} falseValue Pick lane from here if corresponding
    * selector lane is false
    * @return {Int8x16} Mix of lanes from trueValue or falseValue as
    * indicated
    */
  SIMD.Int8x16.select = function(t, trueValue, falseValue) {
    return simdSelect("Int8x16", t, trueValue, falseValue);
  }
}

if (typeof SIMD.Int8x16.equal === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Bool8x16} true or false in each lane depending on
    * the result of a == b.
    */
  SIMD.Int8x16.equal = function(a, b) {
    return simdRelationalOp("Int8x16", binaryEqual, a, b);
  }
}

if (typeof SIMD.Int8x16.notEqual === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Bool8x16} true or false in each lane depending on
    * the result of a != b.
    */
  SIMD.Int8x16.notEqual = function(a, b) {
    return simdRelationalOp("Int8x16", binaryNotEqual, a, b);
  }
}

if (typeof SIMD.Int8x16.greaterThan === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Bool8x16} true or false in each lane depending on
    * the result of a > b.
    */
  SIMD.Int8x16.greaterThan = function(a, b) {
    return simdRelationalOp("Int8x16", binaryGreater, a, b);
  }
}

if (typeof SIMD.Int8x16.greaterThanOrEqual === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Bool8x16} true or false in each lane depending on
    * the result of a >= b.
    */
  SIMD.Int8x16.greaterThanOrEqual = function(a, b) {
    return simdRelationalOp("Int8x16", binaryGreaterEqual, a, b);
  }
}

if (typeof SIMD.Int8x16.lessThan === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Bool8x16} true or false in each lane depending on
    * the result of a < b.
    */
  SIMD.Int8x16.lessThan = function(a, b) {
    return simdRelationalOp("Int8x16", binaryLess, a, b);
  }
}

if (typeof SIMD.Int8x16.lessThanOrEqual === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {Int8x16} b An instance of Int8x16.
    * @return {Bool8x16} true or false in each lane depending on
    * the result of a <= b.
    */
  SIMD.Int8x16.lessThanOrEqual = function(a, b) {
    return simdRelationalOp("Int8x16", binaryLessEqual, a, b);
  }
}

if (typeof SIMD.Int8x16.shiftLeftByScalar === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {integer} bits Bit count to shift by.
    * @return {Int8x16} lanes in a shifted by bits.
    */
  SIMD.Int8x16.shiftLeftByScalar = function(a, bits) {
    a = SIMD.Int8x16.check(a);
    if (bits>>>0 > 8)
      bits = 8;
    return simdShiftOp("Int8x16", binaryShiftLeft, a, bits);
  }
}

if (typeof SIMD.Int8x16.shiftRightLogicalByScalar === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {integer} bits Bit count to shift by.
    * @return {Int8x16} lanes in a shifted by bits.
    */
  SIMD.Int8x16.shiftRightLogicalByScalar = function(a, bits) {
    a = SIMD.Int8x16.check(a);
    if (bits>>>0 >= 8)
      return SIMD.Int8x16.splat(0.0);
    return simdShiftOp("Int8x16", binaryShiftRightLogical8, a, bits);
  }
}

if (typeof SIMD.Int8x16.shiftRightArithmeticByScalar === "undefined") {
  /**
    * @param {Int8x16} a An instance of Int8x16.
    * @param {integer} bits Bit count to shift by.
    * @return {Int8x16} lanes in a shifted by bits.
    */
  SIMD.Int8x16.shiftRightArithmeticByScalar = function(a, bits) {
    a = SIMD.Int8x16.check(a);
    if (bits>>>0 > 8)
      bits = 8;
    return simdShiftOp("Int8x16", binaryShiftRightArithmetic, a, bits);
  }
}

if (typeof SIMD.Int8x16.load === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @return {Int8x16} New instance of Int8x16.
    */
  SIMD.Int8x16.load = function(tarray, index) {
    return simdLoad("Int8x16", tarray, index, 16);
  }
}

if (typeof SIMD.Int8x16.store === "undefined") {
  /**
    * @param {Typed array} tarray An instance of a typed array.
    * @param {Number} index An instance of Number.
    * @param {Int8x16} a An instance of Int8x16.
    * @return {Int8x16} a
    */
  SIMD.Int8x16.store = function(tarray, index, a) {
    return simdStore("Int8x16", tarray, index, a, 16);
  }
}

function _boolNot(a) { return !a; }
function _intNot(a) { return ~a; }

var simdInfo = {
  "Float32x4": {
    type: "Float32x4",
    lanes: 4,
    laneSize: 4,
    fn: SIMD.Float32x4,
    buffer: _f32x4,
    view: Float32Array,
  },
  "Int32x4": {
    type:
    "Int32x4",
    lanes: 4,
    laneSize: 4,
    fn: SIMD.Int32x4,
    buffer: _i32x4,
    view: Int32Array,
  },
  "Bool32x4": {
    type: "Bool32x4",
    lanes: 4,
    laneSize: 4,
    fn: SIMD.Bool32x4,
    buffer: _i32x4,
  },
  "Int16x8": {
    type: "Int16x8",
    lanes: 8,
    laneSize: 2,
    fn: SIMD.Int16x8,
    buffer: _i16x8,
  },
  "Bool16x8": {
    type: "Bool16x8",
    lanes: 8,
    laneSize: 2,
    fn: SIMD.Bool16x8,
    buffer: _i16x8,
  },
  "Int8x16": {
    type: "Int8x16",
    lanes: 16,
    laneSize: 1,
    fn: SIMD.Int8x16,
    buffer: _i8x16,
  },
  "Bool8x16": {
    type: "Bool8x16",
    lanes: 16,
    laneSize: 1,
    fn: SIMD.Bool8x16,
    buffer: _i8x16,
  },
}

simdInfo.Float32x4.boolInfo =
simdInfo.Int32x4.boolInfo =
simdInfo.Bool32x4.boolInfo = simdInfo.Bool32x4;

simdInfo.Int16x8.boolInfo =
simdInfo.Bool16x8.boolInfo = simdInfo.Bool16x8;

simdInfo.Int8x16.boolInfo =
simdInfo.Bool8x16.boolInfo = simdInfo.Bool8x16;

// If we're in a browser, the global namespace is named 'window'. If we're
// in node, it's named 'global'. If we're in a shell, 'this' might work.
})(typeof window !== "undefined"
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

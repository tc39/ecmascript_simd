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

function almostEqual(a, b) {
  ok(Math.abs(a - b) < 0.00001);
}

function isPositiveZero(x) {
  ok(x == 0 && 1/x == Infinity);
}

function isNegativeZero(x) {
  ok(x == 0 && 1/x == -Infinity);
}

function isNaN(x) {
  ok(x != x);
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

function sameValue(x, y) {
  if (x == y)
    return x != 0 || y != 0 || (1/x == 1/y);

  return x != x && y != y;
}

function sameValueZero(x, y) {
  if (x == y) return true;
  return x != x & y != y;
}

var _f32x4 = new Float32Array(4);
var _f64x2 = new Float64Array(_f32x4.buffer);
var _i32x4 = new Int32Array(_f32x4.buffer);
var _i16x8 = new Int16Array(_f32x4.buffer);
var _i8x16 = new Int8Array(_f32x4.buffer);

var float32x4 = {
  name: "Float32x4",
  fn: SIMD.Float32x4,
  lanes: 4,
  laneSize: 4,
  minVal: Number.MIN_VALUE,
  maxVal: Number.MAX_VALUE,
  interestingValues: [0, -0, 1, -1, 1.414, Infinity, -Infinity, NaN],
  view: Float32Array,
  buffer: _f32x4,
}

var int32x4 = {
  name: "Int32x4",
  fn: SIMD.Int32x4,
  lanes: 4,
  laneSize: 4,
  minVal: -0x80000000,
  maxVal: 0x7fffffff,
  interestingValues: [0, 1, -1, 0xFFFFFFFF, 0x7FFFFFFF, 0x80000000],
  view: Int32Array,
  buffer: _i32x4,
}

var int16x8 = {
  name: "Int16x8",
  fn: SIMD.Int16x8,
  lanes: 8,
  laneSize: 2,
  laneMask: 0xffff,
  minVal: -0x8000,
  maxVal: 0x7fff,
  interestingValues: [0, 1, -1, 0xFFFF, 0x7FFF, 0x8000],
  view: Int16Array,
  buffer: _i16x8,
}

var int8x16 = {
  name: "Int8x16",
  fn: SIMD.Int8x16,
  lanes: 16,
  laneSize: 1,
  laneMask: 0xff,
  minVal: -0x80,
  maxVal: 0x7f,
  interestingValues: [0, 1, -1, 0xFF, 0x7F, 0x80],
  view: Int8Array,
  buffer: _i8x16,
}

var bool32x4 = {
  name: "Bool32x4",
  fn: SIMD.Bool32x4,
  lanes: 4,
  laneSize: 4,
  interestingValues: [true, false],
}

var bool16x8 = {
  name: "Bool16x8",
  fn: SIMD.Bool16x8,
  lanes: 8,
  laneSize: 2,
  interestingValues: [true, false],
}

var bool8x16 = {
  name: "Bool8x16",
  fn: SIMD.Bool8x16,
  lanes: 16,
  laneSize: 1,
  interestingValues: [true, false],
}

// Each SIMD type has a corresponding Boolean SIMD type, which is returned by
// relational ops.
float32x4.boolType = int32x4.boolType = bool32x4.boolType = bool32x4;
int16x8.boolType = bool16x8.boolType = bool16x8;
int8x16.boolType = bool8x16.boolType = bool8x16;

// SIMD from types.
float32x4.from = [int32x4];

int32x4.from = [float32x4];
int32x4.fromFn = function(x) {
  if (x > -2147483649.0 && x < 2147483648.0)
    return x|0;
  return NaN;
}

// SIMD fromBits types.
float32x4.fromBits = [int32x4, int16x8, int8x16];
int32x4.fromBits = [float32x4, int16x8, int8x16];
int16x8.fromBits = [float32x4, int32x4, int8x16];
int8x16.fromBits = [float32x4, int32x4, int16x8];

// Simd widening types.
int16x8.wideType = int32x4;
int8x16.wideType = int16x8;

var floatTypes = [float32x4];

var intTypes = [int32x4, int16x8, int8x16];

var smallIntTypes = [int16x8, int8x16];

var boolTypes = [bool32x4, bool16x8, bool8x16];

var numericalTypes = [float32x4,
                      int32x4, int16x8, int8x16];

var logicalTypes = [int32x4, int16x8, int8x16,
                    bool32x4, bool16x8, bool8x16];

var allTypes = [float32x4,
                int32x4, int16x8, int8x16,
                bool32x4, bool16x8, bool8x16];

// SIMD reference functions.

function simdCoerce(type, value) {
  if (!type.buffer) return value;  // bool.
  type.buffer[0] = value;
  return type.buffer[0];
}

function simdSave(type, value) {
  for (var i = 0; i < type.lanes; i++)
    type.buffer[i] = type.fn.extractLane(value, i);
}

// Reference implementation of toString.
function simdToString(type, value) {
  value = type.fn.check(value);
  var str = "SIMD." + type.name + "(";
  str += type.fn.extractLane(value, 0);
  for (var i = 1; i < type.lanes; i++) {
    str += ", " + type.fn.extractLane(value, i);
  }
  return str + ")";
}

// Reference implementation of toLocaleString.
function simdToLocaleString(type, value) {
  value = type.fn.check(value);
  var str = "SIMD." + type.name + "(";
  str += type.fn.extractLane(value, 0).toLocaleString();
  for (var i = 1; i < type.lanes; i++) {
    str += ", " + type.fn.extractLane(value, i).toLocaleString();
  }
  return str + ")";
}

// Utility functions.

function createTestValue(type) {
  // Create a value for testing.
  switch (type.lanes) {
    case 4: return type.fn(0, 1, 2, 3);
    case 8: return type.fn(0, 1, 2, 3, 4, 5, 6, 7);
    case 16: return type.fn(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  }
}

function createSplatValue(type, v) {
  var result;
  switch (type.lanes) {
    case 4: return type.fn(v, v, v, v);
    case 8: return type.fn(v, v, v, v, v, v, v, v);
    case 16: return type.fn(v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v);
  }
}

function checkValue(type, a, expect) {
  var same = true;
  for (var i = 0; i < type.lanes; i++) {
    if (!sameValue(expect(i), type.fn.extractLane(a, i))) same = false;
  }
  if (!same) {
    var lanes = []
    for (var i = 0; i < type.lanes; i++) lanes.push(expect(i));
    fail('expected SIMD.' + type.name + '(' + lanes + ') but found ' + a.toString());
  }
}


// Test the constructor and splat with the given lane values.
function testConstructor(type) {
  equal('function', typeof type.fn);
  equal('function', typeof type.fn.splat);
  for (var v of type.interestingValues) {
    var expected = simdCoerce(type, v);
    var result = createSplatValue(type, v);
    checkValue(type, result, function(index) { return expected; });
    // splat.
    result = type.fn.splat(v);
    checkValue(type, result, function(index) { return expected; });
  }
}

function testCheck(type) {
  equal('function', typeof type.fn.check);
  // Other SIMD types shouldn't check for this type.
  var a = type.fn();
  for (var otherType of allTypes) {
    if (otherType === type)
      equal(a, type.fn.check(a));
    else
      throws(function() { otherType.check(a); });
  }
  // Neither should other types.
  for (var x of [ {}, "", 0, 1, true, false, undefined, null, NaN, Infinity]) {
    throws(function() { type.fn.check(x); });
  }
}

function testReplaceLane(type) {
  equal('function', typeof type.fn.replaceLane);
  a = createTestValue(type);
  for (var v of type.interestingValues) {
    var expected = simdCoerce(type, v);
    for (var i = 0; i < type.lanes; i++) {
      var result = type.fn.replaceLane(a, i, v);
      checkValue(type, result,
                 function(index) {
                   return index == i ? expected : type.fn.extractLane(a, index);
                 });
    }
  }

  function testIndexCheck(index) {
    throws(function() { type.fn.replaceLane(a, index, 0); });
  }
  testIndexCheck(type.lanes);
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(128);
}

// Compare unary op's behavior to ref op at each lane.
function testUnaryOp(type, op, refOp) {
  equal('function', typeof type.fn[op]);
  for (var v of type.interestingValues) {
    var expected = simdCoerce(type, refOp(simdCoerce(type, v)));
    var a = type.fn.splat(v);
    var result = type.fn[op](a);
    checkValue(type, result, function(index) { return expected; });
  }
}

// Compare binary op's behavior to ref op at each lane with the Cartesian
// product of the given values.
function testBinaryOp(type, op, refOp) {
  equal('function', typeof type.fn[op]);
  var zero = type.fn();
  for (var av of type.interestingValues) {
    for (var bv of type.interestingValues) {
      var expected = simdCoerce(type, refOp(simdCoerce(type, av), simdCoerce(type, bv)));
      var a = type.fn.splat(av);
      var b = type.fn.splat(bv);
      var result = type.fn[op](a, b);
      checkValue(type, result, function(index) { return expected; });
    }
  }
}

// Compare relational op's behavior to ref op at each lane with the Cartesian
// product of the given values.
function testRelationalOp(type, op, refOp) {
  equal('function', typeof type.fn[op]);
  var zero = type.fn();
  for (var av of type.interestingValues) {
    for (var bv of type.interestingValues) {
      var expected = refOp(simdCoerce(type, av), simdCoerce(type, bv));
      var a = type.fn.splat(av);
      var b = type.fn.splat(bv);
      var result = type.fn[op](a, b);
      checkValue(type.boolType, result, function(index) { return expected; });
    }
  }
}

// Compare shift op's behavior to ref op at each lane.
function testShiftOp(type, op, refOp) {
  equal('function', typeof type.fn[op]);
  var zero = type.fn();
  for (var v of type.interestingValues) {
    var s = type.laneSize * 8;
    for (var bits of [-1, 0, 1, 2, s - 1, s, s + 1]) {
      var expected = simdCoerce(type, refOp(simdCoerce(type, v), bits));
      var a = type.fn.splat(v);
      var result = type.fn[op](a, bits);
      checkValue(type, result, function(index) { return expected; });
    }
  }
}

function testFrom(toType, fromType, name) {
  equal('function', typeof toType.fn[name]);
  for (var v of fromType.interestingValues) {
    var fromValue = createSplatValue(fromType, v);
    var expected = toType.fromFn ? toType.fromFn(v) :
                   simdCoerce(toType, simdCoerce(fromType, v));
    if (expected != expected) {  // NaN signals failure.
      throws(function() { toType.fn[name](fromValue) });
    } else {
      var result = toType.fn[name](fromValue);
      checkValue(toType, result, function(index) { return expected; });
    }
  }
}

function testFromBits(toType, fromType, name) {
  equal('function', typeof toType.fn[name]);
  for (var v of fromType.interestingValues) {
    var fromValue = createSplatValue(fromType, v);
    simdSave(fromType, fromValue);
    var result = toType.fn[name](fromValue);
    checkValue(toType, result, function(index) { return toType.buffer[index]; });
  }
}

function testAnyTrue(type) {
  equal('function', typeof type.fn.anyTrue);
  // All lanes 'false'.
  var a = type.fn.splat(false);
  ok(!type.fn.anyTrue(a));
  // One lane 'true'.
  for (var i = 0; i < type.lanes; i++) {
    a = type.fn.replaceLane(a, i, true);
    ok(type.fn.anyTrue(a));
  }
  // All lanes 'true'.
  a = type.fn.splat(true);
  ok(type.fn.anyTrue(a));
}

function testAllTrue(type) {
  equal('function', typeof type.fn.allTrue);
  // All lanes 'true'.
  var a = type.fn.splat(true);
  ok(type.fn.allTrue(a));
  // One lane 'false'.
  for (var i = 0; i < type.lanes; i++) {
    a = type.fn.replaceLane(a, i, false);
    ok(!type.fn.allTrue(a));
  }
  // All lanes 'false'.
  a = type.fn.splat(false);
  ok(!type.fn.allTrue(a));
}

function testSelect(type) {
  equal('function', typeof type.fn.select);
  // set a and b to values that are different for all numerical types.
  var av = 1;
  var bv = 2;
  var a = type.fn.splat(av);
  var b = type.fn.splat(bv);
  // test all selectors with a single 'true' lane.
  for (var i = 0; i < type.lanes; i++) {
    var selector = type.boolType.fn();
    selector = type.boolType.fn.replaceLane(selector, i, true);
    var result = type.fn.select(selector, a, b);
    checkValue(type, result, function(index) { return index == i ? av : bv; });
  }
}

function testSwizzle(type) {
  equal('function', typeof type.fn.swizzle);
  var a = createTestValue(type);  // 0, 1, 2, 3, 4, 5, 6, ...
  var indices = [];
  // Identity swizzle.
  for (var i = 0; i < type.lanes; i++) indices.push(i);
  var result = type.fn.swizzle.apply(type.fn, [a].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(a, index); });
  // Reverse swizzle.
  indices.reverse();
  var result = type.fn.swizzle.apply(type.fn, [a].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(a, type.lanes - index - 1); });

  function testIndexCheck(index) {
    for (var i = 0; i < type.lanes; i++) {
      var args = [a].concat(indices);
      args[i + 1] = index;
      throws(function() { type.fn.swizzle.apply(type.fn, args); });
    }
  }
  testIndexCheck(type.lanes);
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(128);
}

function testShuffle(type) {
  var indices = [];
  for (var i = 0; i < type.lanes; i++) indices.push(i);

  var a = type.fn.apply(type.fn, indices);            // 0, 1, 2, 3, 4 ...
  var b = type.fn.add(a, type.fn.splat(type.lanes));  // lanes, lanes+1 ...
  // All lanes from a.
  var result = type.fn.shuffle.apply(type.fn, [a, b].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(a, index); });
  // One lane from b.
  for (var i = 0; i < type.lanes; i++) {
    var args = [a, b].concat(indices);
    args[2 + i] += type.lanes;
    var result = type.fn.shuffle.apply(type.fn, args);
    checkValue(type, result, function(index) {
      var val = index == i ? b : a;
      return type.fn.extractLane(val, index);
    });
  }
  // All lanes from b.
  for (var i = 0; i < type.lanes; i++) indices[i] += type.lanes;
  var result = type.fn.shuffle.apply(type.fn, [a, b].concat(indices));
  checkValue(type, result, function(index) { return type.fn.extractLane(b, index); });

  function testIndexCheck(index) {
    for (var i = 0; i < type.lanes; i++) {
      var args = [a, b].concat(indices);
      args[i + 2] = index;
      throws(function() { type.fn.shuffle.apply(type.fn, args); });
    }
  }
  testIndexCheck(2 * type.lanes);
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(128);
}

function testOperators(type) {
  var inst = createTestValue(type);
  throws(function() { Number(inst) });
  throws(function() { +inst });
  throws(function() { -inst });
  throws(function() { ~inst });
  throws(function() { Math.fround(inst) });
  throws(function() { inst|0} );
  throws(function() { inst&0 });
  throws(function() { inst^0 });
  throws(function() { inst>>>0 });
  throws(function() { inst>>0 });
  throws(function() { inst<<0 });
  throws(function() { (inst + inst) });
  throws(function() { inst - inst });
  throws(function() { inst * inst });
  throws(function() { inst / inst });
  throws(function() { inst % inst });
  throws(function() { inst < inst });
  throws(function() { inst > inst });
  throws(function() { inst <= inst });
  throws(function() { inst >= inst });
  throws(function() { inst(); });

  equal(inst[0], undefined);
  equal(inst.a, undefined);
  equal(!inst, false);
  equal(!inst, false);
  equal(inst ? 1 : 2, 1);
  equal(inst ? 1 : 2, 1);

  equal('function', typeof inst.toString);
  equal(inst.toString(), simdToString(type, inst));
  equal('function', typeof inst.toLocaleString);
  equal(inst.toLocaleString(), simdToLocaleString(type, inst));
  // TODO: test valueOf?
}

// Tests value semantics for a given type.
// TODO: more complete tests for Object wrappers, sameValue, sameValueZero, etc.
function testValueSemantics(type) {
  var y = createTestValue(type);
  for (var x of [ {}, "", 0, 1, undefined, null, NaN, Infinity]) {
      equal(y == x, false);
      equal(x == y, false);
      equal(y != x, true);
      equal(x != y, true);
      equal(y === x, false);
      equal(x === y, false);
      equal(y !== x, true);
      equal(x !== y, true);
  }
  equal(y == type.fn(), true);
  equal(y == type.fn(1), false);
  equal(y != type.fn(), false);
  equal(y != type.fn(1), true);
  equal(y === type.fn(0), true);
  equal(y === type.fn(1), false);
  equal(y !== type.fn(0), false);
  equal(y !== type.fn(1), true);
}


for (var type of allTypes) {
  test(type.name + ' constructor', function() {
    testConstructor(type);
  });
  test(type.name + ' check', function() {
    testCheck(type);
  });
  test(type.name + ' operators', function() {
    testOperators(type);
  });
  // Note: This fails in the polyfill due to the lack of value semantics.
  test(type.name + ' value semantics', function() {
    testValueSemantics(type);
  });
  test(type.name + ' replaceLane', function() {
    testReplaceLane(type);
  });
  test(type.name + ' equal', function() {
    testRelationalOp(type, 'equal', function(a, b) { return a == b; });
  });
  test(type.name + ' notEqual', function() {
    testRelationalOp(type, 'notEqual', function(a, b) { return a != b; });
  });
}

for (var type of numericalTypes) {
  test(type.name + ' lessThan', function() {
    testRelationalOp(type, 'lessThan', function(a, b) { return a < b; });
  });
  test(type.name + ' lessThanOrEqual', function() {
    testRelationalOp(type, 'lessThanOrEqual', function(a, b) { return a <= b; });
  });
  test(type.name + ' greaterThan', function() {
    testRelationalOp(type, 'greaterThan', function(a, b) { return a > b; });
  });
  test(type.name + ' greaterThanOrEqual', function() {
    testRelationalOp(type, 'greaterThanOrEqual', function(a, b) { return a >= b; });
  });
  test(type.name + ' neg', function() {
    testUnaryOp(type, 'neg', function(a) { return -a; });
  });
  test(type.name + ' add', function() {
    testBinaryOp(type, 'add', function(a, b) { return a + b; });
  });
  test(type.name + ' sub', function() {
    testBinaryOp(type, 'sub', function(a, b) { return a - b; });
  });
  test(type.name + ' mul', function() {
    testBinaryOp(type, 'mul', function(a, b) { return a * b; });
  });
  test(type.name + ' min', function() {
    testBinaryOp(type, 'min', Math.min);
  });
  test(type.name + ' max', function() {
    testBinaryOp(type, 'max', Math.max);
  });
  test(type.name + ' select', function() {
    testSelect(type);
  });
  test(type.name + ' swizzle', function() {
    testSwizzle(type);
  });
  test(type.name + ' shuffle', function() {
    testShuffle(type);
  });
}

for (var type of logicalTypes) {
  test(type.name + ' and', function() {
    testBinaryOp(type, 'and', function(a, b) { return a & b; });
  });
  test(type.name + ' or', function() {
    testBinaryOp(type, 'or', function(a, b) { return a | b; });
  });
  test(type.name + ' xor', function() {
    testBinaryOp(type, 'xor', function(a, b) { return a ^ b; });
  });
}

for (var type of floatTypes) {
  test(type.name + ' div', function() {
    testBinaryOp(type, 'div', function(a, b) { return a / b; });
  });
  test(type.name + ' abs', function() {
    testBinaryOp(type, 'abs', Math.abs);
  });
  test(type.name + ' minNum', function() {
    testBinaryOp(type, 'minNum', minNum);
  });
  test(type.name + ' maxNum', function() {
    testBinaryOp(type, 'maxNum', maxNum);
  });
  test(type.name + ' sqrt', function() {
    testUnaryOp(type, 'sqrt', function(a) { return Math.sqrt(a); });
  });
  test(type.name + ' reciprocalApproximation', function() {
    testUnaryOp(type, 'reciprocalApproximation', function(a) { return 1 / a; });
  });
  test(type.name + ' reciprocalSqrtApproximation', function() {
    testUnaryOp(type, 'reciprocalSqrtApproximation', function(a) { return 1 / Math.sqrt(a); });
  });
}

for (var type of intTypes) {
  test(type.name + ' not', function() {
    testUnaryOp(type, 'not', function(a) { return ~a; });
  });
  test(type.name + ' shiftLeftByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8) return 0;
      return a << bits;
    }

    testShiftOp(type, 'shiftLeftByScalar', shift);
  });
  test(type.name + ' shiftRightLogicalByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8) return 0;
      if (type.laneMask)
        a &= type.laneMask;
      return a >>> bits;
    }

    testShiftOp(type, 'shiftRightLogicalByScalar', shift);
  });
  test(type.name + ' shiftRightArithmeticByScalar', function() {
    function shift(a, bits) {
      if (bits>>>0 >= type.laneSize * 8)
        bits = type.laneSize * 8 - 1;
      return a >> bits;
    }

    testShiftOp(type, 'shiftRightArithmeticByScalar', shift);
  });
}

for (var type of smallIntTypes) {
  function saturate(type, a) {
    if (a < type.minVal) return type.minVal;
    if (a > type.maxVal) return type.maxVal;
    return a;
  }
  test(type.name + ' addSaturate', function() {
    testBinaryOp(type, 'addSaturate', function(a, b) { return simdCoerce(type, saturate(type, a + b)); });
  });
  test(type.name + ' subSaturate', function() {
    testBinaryOp(type, 'subSaturate', function(a, b) { return simdCoerce(type, saturate(type, a - b)); });
  });
}

for (var type of boolTypes) {
  test(type.name + ' not', function() {
    testUnaryOp(type, 'not', function(a) { return !a; });
  });
  test(type.name + ' anyTrue', function() {
    testAnyTrue(type, 'anyTrue');
  });
  test(type.name + ' allTrue', function() {
    testAllTrue(type, 'allTrue');
  });
}

// From<type> functions.
for (var type of allTypes) {
  if (!type.from) continue;
  for (var fromType of type.from) {
    var fn = 'from' + fromType.name;
    test(type.name + ' ' + fn, function() {
      testFrom(type, fromType, fn);
    });
  }
}

// From<type>Bits functions.
for (var type of allTypes) {
  if (!type.fromBits) continue;
  for (var fromType of type.fromBits) {
    var fn = 'from' + fromType.name + 'Bits';
    test(type.name + ' ' + fn, function() {
      testFromBits(type, fromType, fn);
    });
  }
}




test('Float32x4 load', function() {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.Float32x4.load(a, i);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    equal(i+2, SIMD.Float32x4.extractLane(v, 2));
    equal(i+3, SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 overaligned load', function() {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i += 2) {
    var v = SIMD.Float32x4.load(af, i / 2);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    equal(i+2, SIMD.Float32x4.extractLane(v, 2));
    equal(i+3, SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 unaligned load', function() {
  var a = new Float32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.Float32x4.load(b, i * 4 + 1);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    equal(i+2, SIMD.Float32x4.extractLane(v, 2));
    equal(i+3, SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 load1', function() {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.Float32x4.load1(a, i);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 1));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 overaligned load1', function() {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i += 2) {
    var v = SIMD.Float32x4.load1(af, i / 2);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 1));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 unaligned load1', function() {
  var a = new Float32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.Float32x4.load1(b, i * 4 + 1);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 1));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 load2', function() {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.Float32x4.load2(a, i);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 overaligned load2', function() {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i += 2) {
    var v = SIMD.Float32x4.load2(af, i / 2);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 unaligned load2', function() {
  var a = new Float32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.Float32x4.load2(b, i * 4 + 1);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 load3', function() {
  var a = new Float32Array(9);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.Float32x4.load3(a, i);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    equal(i+2, SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 overaligned load3', function() {
  var b = new ArrayBuffer(48);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i += 2) {
    var v = SIMD.Float32x4.load3(af, i / 2);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    equal(i+2, SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 unaligned load3', function() {
  var a = new Float32Array(9);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.Float32x4.load3(b, i * 4 + 1);
    equal(i, SIMD.Float32x4.extractLane(v, 0));
    equal(i+1, SIMD.Float32x4.extractLane(v, 1));
    equal(i+2, SIMD.Float32x4.extractLane(v, 2));
    isPositiveZero(SIMD.Float32x4.extractLane(v, 3));
  }
});

test('Float32x4 store', function() {
  var a = new Float32Array(12);
  SIMD.Float32x4.store(a, 0, SIMD.Float32x4(0, 1, 2, 3));
  SIMD.Float32x4.store(a, 4, SIMD.Float32x4(4, 5, 6, 7));
  SIMD.Float32x4.store(a, 8, SIMD.Float32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Float32x4(0, 1, 2, 3);
  equal(true, SIMD.Bool32x4.allTrue(SIMD.Float32x4.equal(SIMD.Float32x4.store(a, 0, v), v)));
});

test('Float32x4 overaligned store', function() {
  var b = new ArrayBuffer(56);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.Float32x4.store(af, 0, SIMD.Float32x4(0, 1, 2, 3));
  SIMD.Float32x4.store(af, 2, SIMD.Float32x4(4, 5, 6, 7));
  SIMD.Float32x4.store(af, 4, SIMD.Float32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Float32x4 unaligned store', function() {
  var c = new Int8Array(48 + 1);
  SIMD.Float32x4.store(c, 0 + 1, SIMD.Float32x4(0, 1, 2, 3));
  SIMD.Float32x4.store(c, 16 + 1, SIMD.Float32x4(4, 5, 6, 7));
  SIMD.Float32x4.store(c, 32 + 1, SIMD.Float32x4(8, 9, 10, 11));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Float32x4 store1', function() {
  var a = new Float32Array(4);
  SIMD.Float32x4.store1(a, 0, SIMD.Float32x4(0, -1, -1, -1));
  SIMD.Float32x4.store1(a, 1, SIMD.Float32x4(1, -1, -1, -1));
  SIMD.Float32x4.store1(a, 2, SIMD.Float32x4(2, -1, -1, -1));
  SIMD.Float32x4.store1(a, 3, SIMD.Float32x4(3, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Float32x4(0, 1, 2, 3);
  equal(true, SIMD.Bool32x4.allTrue(SIMD.Float32x4.equal(SIMD.Float32x4.store1(a, 0, v), v)));
});

test('Float32x4 overaligned store1', function() {
  var b = new ArrayBuffer(24);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[1] = -2;
  a[3] = -2;
  SIMD.Float32x4.store1(af, 0, SIMD.Float32x4(0, -1, -1, -1));
  SIMD.Float32x4.store1(af, 1, SIMD.Float32x4(2, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 2 == 0) {
      equal(i, a[i]);
    } else {
      equal(-2, a[i]);
    }
  }
});

test('Float32x4 unaligned store1', function() {
  var c = new Int8Array(16 + 1);
  SIMD.Float32x4.store1(c, 0 + 1, SIMD.Float32x4(0, -1, -1, -1));
  SIMD.Float32x4.store1(c, 4 + 1, SIMD.Float32x4(1, -1, -1, -1));
  SIMD.Float32x4.store1(c, 8 + 1, SIMD.Float32x4(2, -1, -1, -1));
  SIMD.Float32x4.store1(c, 12 + 1, SIMD.Float32x4(3, -1, -1, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Float32x4 store2', function() {
  var a = new Float32Array(8);
  SIMD.Float32x4.store2(a, 0, SIMD.Float32x4(0, 1, -1, -1));
  SIMD.Float32x4.store2(a, 2, SIMD.Float32x4(2, 3, -1, -1));
  SIMD.Float32x4.store2(a, 4, SIMD.Float32x4(4, 5, -1, -1));
  SIMD.Float32x4.store2(a, 6, SIMD.Float32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Float32x4(0, 1, 2, 3);
  equal(true, SIMD.Bool32x4.allTrue(SIMD.Float32x4.equal(SIMD.Float32x4.store2(a, 0, v), v)));
});

test('Float32x4 overaligned store2', function() {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.Float32x4.store2(af, 0, SIMD.Float32x4(0, 1, -1, -1));
  SIMD.Float32x4.store2(af, 1, SIMD.Float32x4(2, 3, -1, -1));
  SIMD.Float32x4.store2(af, 2, SIMD.Float32x4(4, 5, -1, -1));
  SIMD.Float32x4.store2(af, 3, SIMD.Float32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Float32x4 unaligned store2', function() {
  var c = new Int8Array(32 + 1);
  SIMD.Float32x4.store2(c, 0 + 1, SIMD.Float32x4(0, 1, -1, -1));
  SIMD.Float32x4.store2(c, 8 + 1, SIMD.Float32x4(2, 3, -1, -1));
  SIMD.Float32x4.store2(c, 16 + 1, SIMD.Float32x4(4, 5, -1, -1));
  SIMD.Float32x4.store2(c, 24 + 1, SIMD.Float32x4(6, 7, -1, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Float32x4 store3', function() {
  var a = new Float32Array(9);
  SIMD.Float32x4.store3(a, 0, SIMD.Float32x4(0, 1, 2, -1));
  SIMD.Float32x4.store3(a, 3, SIMD.Float32x4(3, 4, 5, -1));
  SIMD.Float32x4.store3(a, 6, SIMD.Float32x4(6, 7, 8, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Float32x4(0, 1, 2, 3);
  equal(true, SIMD.Bool32x4.allTrue(SIMD.Float32x4.equal(SIMD.Float32x4.store3(a, 0, v), v)));
});

test('Float32x4 overaligned store3', function() {
  var b = new ArrayBuffer(56);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[3] = -2;
  a[7] = -2;
  a[11] = -2;
  SIMD.Float32x4.store3(af, 0, SIMD.Float32x4(0, 1, 2, -1));
  SIMD.Float32x4.store3(af, 2, SIMD.Float32x4(4, 5, 6, -1));
  SIMD.Float32x4.store3(af, 4, SIMD.Float32x4(8, 9, 10, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 4 != 3) {
      equal(i, a[i]);
    } else {
      equal(-2, a[i]);
    }
  }
});

test('Float32x4 unaligned store3', function() {
  var c = new Int8Array(36 + 1);
  SIMD.Float32x4.store3(c, 0 + 1, SIMD.Float32x4(0, 1, 2, -1));
  SIMD.Float32x4.store3(c, 12 + 1, SIMD.Float32x4(3, 4, 5, -1));
  SIMD.Float32x4.store3(c, 24 + 1, SIMD.Float32x4(6, 7, 8, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Float32x4 load exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.Float32x4.load(a, -1);
  });
  throws(function () {
    var f = SIMD.Float32x4.load(a, 5);
  });
  throws(function () {
    var f = SIMD.Float32x4.load(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Float32x4.load(a, "a");
  });
});

test('Float32x4 load1 exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.Float32x4.load1(a, -1);
  });
  throws(function () {
    var f = SIMD.Float32x4.load1(a, 8);
  });
  throws(function () {
    var f = SIMD.Float32x4.load1(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Float32x4.load1(a, "a");
  });
});

test('Float32x4 load2 exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.Float32x4.load2(a, -1);
  });
  throws(function () {
    var f = SIMD.Float32x4.load2(a, 7);
  });
  throws(function () {
    var f = SIMD.Float32x4.load2(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Float32x4.load2(a, "a");
  });
});

test('Float32x4 load3 exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.Float32x4.load3(a, -1);
  });
  throws(function () {
    var f = SIMD.Float32x4.load3(a, 6);
  });
  throws(function () {
    var f = SIMD.Float32x4.load3(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Float32x4.load3(a, "a");
  });
});

test('Float32x4 store exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.Float32x4(1, 2, 3, 4);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Float32x4.store(a, -1, f);
  });
  throws(function () {
    SIMD.Float32x4.store(a, 5, f);
  });
  throws(function () {
    SIMD.Float32x4.store(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.Float32x4.store(a, "a", f);
  });
  throws(function () {
    SIMD.Float32x4.store(a, 1, i);
  });
});

test('Float32x4 store1 exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.Float32x4(1, 2, 3, 4);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Float32x4.store1(a, -1, f);
  });
  throws(function () {
    SIMD.Float32x4.store1(a, 8, f);
  });
  throws(function () {
    SIMD.Float32x4.store1(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.Float32x4.store1(a, "a", f);
  });
  throws(function () {
    SIMD.Float32x4.store1(a, 1, i);
  });
});

test('Float32x4 store2 exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.Float32x4(1, 2, 3, 4);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Float32x4.store2(a, -1, f);
  });
  throws(function () {
    SIMD.Float32x4.store2(a, 7, f);
  });
  throws(function () {
    SIMD.Float32x4.store2(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.Float32x4.store2(a, "a", f);
  });
  throws(function () {
    SIMD.Float32x4.store2(a, 1, i);
  });
});

test('Float32x4 store3 exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.Float32x4(1, 2, 3, 4);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Float32x4.store3(a, -1, f);
  });
  throws(function () {
    SIMD.Float32x4.store3(a, 6, f);
  });
  throws(function () {
    SIMD.Float32x4.store3(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.Float32x4.store3(a, "a", f);
  });
  throws(function () {
    SIMD.Float32x4.store3(a, 1, i);
  });
});


test('Int32x4 load', function() {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.Int32x4.load(a, i);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(i+2, SIMD.Int32x4.extractLane(v, 2));
    equal(i+3, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 overaligned load', function() {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i += 2) {
    var v = SIMD.Int32x4.load(af, i / 2);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(i+2, SIMD.Int32x4.extractLane(v, 2));
    equal(i+3, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 unaligned load', function() {
  var a = new Int32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.Int32x4.load(b, i * 4 + 1);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(i+2, SIMD.Int32x4.extractLane(v, 2));
    equal(i+3, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 load1', function() {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length ; i++) {
    var v = SIMD.Int32x4.load1(a, i);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(0, SIMD.Int32x4.extractLane(v, 1));
    equal(0, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 overaligned load1', function() {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Int32Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.Int32x4.load1(af, i);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(0, SIMD.Int32x4.extractLane(v, 1));
    equal(0, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 unaligned load1', function() {
  var a = new Int32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length ; i++) {
    var v = SIMD.Int32x4.load1(b, i * 4 + 1);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(0, SIMD.Int32x4.extractLane(v, 1));
    equal(0, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 load2', function() {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.Int32x4.load2(a, i);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(0, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 overaligned load2', function() {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i += 2) {
    var v = SIMD.Int32x4.load2(af, i / 2);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(0, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 unaligned load2', function() {
  var a = new Int32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.Int32x4.load2(b, i * 4 + 1);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(0, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 load3', function() {
  var a = new Int32Array(9);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.Int32x4.load3(a, i);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(i+2, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 overaligned load3', function() {
  var b = new ArrayBuffer(48);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i += 2) {
    var v = SIMD.Int32x4.load3(af, i / 2);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(i+2, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 load3', function() {
  var a = new Int32Array(9);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.Int32x4.load3(b, i * 4 + 1);
    equal(i, SIMD.Int32x4.extractLane(v, 0));
    equal(i+1, SIMD.Int32x4.extractLane(v, 1));
    equal(i+2, SIMD.Int32x4.extractLane(v, 2));
    equal(0, SIMD.Int32x4.extractLane(v, 3));
  }
});

test('Int32x4 store', function() {
  var a = new Int32Array(12);
  SIMD.Int32x4.store(a, 0, SIMD.Int32x4(0, 1, 2, 3));
  SIMD.Int32x4.store(a, 4, SIMD.Int32x4(4, 5, 6, 7));
  SIMD.Int32x4.store(a, 8, SIMD.Int32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Int32x4(0, 1, 2, 3);
  equal(true, SIMD.Bool32x4.allTrue(SIMD.Int32x4.equal(SIMD.Int32x4.store(a, 0, v), v)));
});

test('Int32x4 overaligned store', function() {
  var b = new ArrayBuffer(56);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.Int32x4.store(af, 0, SIMD.Int32x4(0, 1, 2, 3));
  SIMD.Int32x4.store(af, 2, SIMD.Int32x4(4, 5, 6, 7));
  SIMD.Int32x4.store(af, 4, SIMD.Int32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Int32x4 unaligned store', function() {
  var c = new Int8Array(48 + 1);
  SIMD.Int32x4.store(c, 0 + 1, SIMD.Int32x4(0, 1, 2, 3));
  SIMD.Int32x4.store(c, 16 + 1, SIMD.Int32x4(4, 5, 6, 7));
  SIMD.Int32x4.store(c, 32 + 1, SIMD.Int32x4(8, 9, 10, 11));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Int32x4 store1', function() {
  var a = new Int32Array(4);
  SIMD.Int32x4.store1(a, 0, SIMD.Int32x4(0, -1, -1, -1));
  SIMD.Int32x4.store1(a, 1, SIMD.Int32x4(1, -1, -1, -1));
  SIMD.Int32x4.store1(a, 2, SIMD.Int32x4(2, -1, -1, -1));
  SIMD.Int32x4.store1(a, 3, SIMD.Int32x4(3, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Int32x4(0, 1, 2, 3);
  equal(true, SIMD.Bool32x4.allTrue(SIMD.Int32x4.equal(SIMD.Int32x4.store1(a, 0, v), v)));
});

test('Int32x4 overaligned store1', function() {
  var b = new ArrayBuffer(24);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[1] = -2;
  a[3] = -2;
  SIMD.Int32x4.store1(af, 0, SIMD.Int32x4(0, -1, -1, -1));
  SIMD.Int32x4.store1(af, 1, SIMD.Int32x4(2, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 2 == 0) {
      equal(i, a[i]);
    } else {
      equal(-2, a[i]);
    }
  }
});

test('Int32x4 unaligned store1', function() {
  var c = new Int8Array(16 + 1);
  SIMD.Int32x4.store1(c, 0 + 1, SIMD.Int32x4(0, -1, -1, -1));
  SIMD.Int32x4.store1(c, 4 + 1, SIMD.Int32x4(1, -1, -1, -1));
  SIMD.Int32x4.store1(c, 8 + 1, SIMD.Int32x4(2, -1, -1, -1));
  SIMD.Int32x4.store1(c, 12 + 1, SIMD.Int32x4(3, -1, -1, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Int32x4(0, 1, 2, 3);
  equal(true, SIMD.Bool32x4.allTrue(SIMD.Int32x4.equal(SIMD.Int32x4.store2(a, 0, v), v)));
});

test('Int32x4 store2', function() {
  var a = new Int32Array(8);
  SIMD.Int32x4.store2(a, 0, SIMD.Int32x4(0, 1, -1, -1));
  SIMD.Int32x4.store2(a, 2, SIMD.Int32x4(2, 3, -1, -1));
  SIMD.Int32x4.store2(a, 4, SIMD.Int32x4(4, 5, -1, -1));
  SIMD.Int32x4.store2(a, 6, SIMD.Int32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Int32x4 store2', function() {
  var a = new Int32Array(8);
  var af = new Float64Array(a.buffer);
  SIMD.Int32x4.store2(af, 0, SIMD.Int32x4(0, 1, -1, -1));
  SIMD.Int32x4.store2(af, 1, SIMD.Int32x4(2, 3, -1, -1));
  SIMD.Int32x4.store2(af, 2, SIMD.Int32x4(4, 5, -1, -1));
  SIMD.Int32x4.store2(af, 3, SIMD.Int32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Int32x4 unaligned store2', function() {
  var c = new Int8Array(32 + 1);
  SIMD.Int32x4.store2(c, 0 + 1, SIMD.Int32x4(0, 1, -1, -1));
  SIMD.Int32x4.store2(c, 8 + 1, SIMD.Int32x4(2, 3, -1, -1));
  SIMD.Int32x4.store2(c, 16 + 1, SIMD.Int32x4(4, 5, -1, -1));
  SIMD.Int32x4.store2(c, 24 + 1, SIMD.Int32x4(6, 7, -1, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Int32x4 store3', function() {
  var a = new Int32Array(9);
  SIMD.Int32x4.store3(a, 0, SIMD.Int32x4(0, 1, 2, -1));
  SIMD.Int32x4.store3(a, 3, SIMD.Int32x4(3, 4, 5, -1));
  SIMD.Int32x4.store3(a, 6, SIMD.Int32x4(6, 7, 8, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Int32x4(0, 1, 2, 3);
  equal(true, SIMD.Bool32x4.allTrue(SIMD.Int32x4.equal(SIMD.Int32x4.store3(a, 0, v), v)));
});

test('Int32x4 overaligned store3', function() {
  var b = new ArrayBuffer(56);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[3] = -2;
  a[7] = -2;
  a[11] = -2;
  SIMD.Int32x4.store3(af, 0, SIMD.Int32x4(0, 1, 2, -1));
  SIMD.Int32x4.store3(af, 2, SIMD.Int32x4(4, 5, 6, -1));
  SIMD.Int32x4.store3(af, 4, SIMD.Int32x4(8, 9, 10, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 4 != 3) {
      equal(i, a[i]);
    } else {
      equal(-2, a[i]);
    }
  }
});

test('Int32x4 unaligned store3', function() {
  var c = new Int8Array(36 + 1);
  SIMD.Int32x4.store3(c, 0 + 1, SIMD.Int32x4(0, 1, 2, -1));
  SIMD.Int32x4.store3(c, 12 + 1, SIMD.Int32x4(3, 4, 5, -1));
  SIMD.Int32x4.store3(c, 24 + 1, SIMD.Int32x4(6, 7, 8, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('Int32x4 load exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.Int32x4.load(a, -1);
  });
  throws(function () {
    var f = SIMD.Int32x4.load(a, 5);
  });
  throws(function () {
    var f = SIMD.Int32x4.load(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Int32x4.load(a, "a");
  });
});

test('Int32x4 load1 exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.Int32x4.load1(a, -1);
  });
  throws(function () {
    var f = SIMD.Int32x4.load1(a, 8);
  });
  throws(function () {
    var f = SIMD.Int32x4.load1(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Int32x4.load1(a, "a");
  });
});

test('Int32x4 load2 exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.Int32x4.load2(a, -1);
  });
  throws(function () {
    var f = SIMD.Int32x4.load2(a, 7);
  });
  throws(function () {
    var f = SIMD.Int32x4.load2(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Int32x4.load2(a, "a");
  });
});

test('Int32x4 load3 exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.Int32x4.load3(a, -1);
  });
  throws(function () {
    var f = SIMD.Int32x4.load3(a, 6);
  });
  throws(function () {
    var f = SIMD.Int32x4.load3(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Int32x4.load3(a, "a");
  });
});

test('Int32x4 store exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.Float32x4(1, 2, 3, 4);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Int32x4.store(a, -1, i);
  });
  throws(function () {
    SIMD.Int32x4.store(a, 5, i);
  });
  throws(function () {
    SIMD.Int32x4.store(a.buffer, 1, i);
  });
  throws(function () {
    SIMD.Int32x4.store(a, "a", i);
  });
  throws(function () {
    SIMD.Int32x4.store(a, 1, f);
  });
});

test('Int32x4 store1 exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.Float32x4(1, 2, 3, 4);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Int32x4.store1(a, -1, i);
  });
  throws(function () {
    SIMD.Int32x4.store1(a, 8, i);
  });
  throws(function () {
    SIMD.Int32x4.store1(a.buffer, 1, i);
  });
  throws(function () {
    SIMD.Int32x4.store1(a, "a", i);
  });
  throws(function () {
    SIMD.Int32x4.store1(a, 1, f);
  });
});

test('Int32x4 store2 exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.Float32x4(1, 2, 3, 4);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Int32x4.store2(a, -1, i);
  });
  throws(function () {
    SIMD.Int32x4.store2(a, 7, i);
  });
  throws(function () {
    SIMD.Int32x4.store2(a.buffer, 1, i);
  });
  throws(function () {
    SIMD.Int32x4.store2(a, "a", i);
  });
  throws(function () {
    SIMD.Int32x4.store2(a, 1, f);
  });
});

test('Int32x4 store3 exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.Float32x4(1, 2, 3, 4);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Int32x4.store3(a, -1, i);
  });
  throws(function () {
    SIMD.Int32x4.store3(a, 6, i);
  });
  throws(function () {
    SIMD.Int32x4.store3(a.buffer, 1, i);
  });
  throws(function () {
    SIMD.Int32x4.store3(a, "a", i);
  });
  throws(function () {
    SIMD.Int32x4.store3(a, 1, f);
  });
});



test('Float32x4 Int32x4 bit conversion', function() {
  var m = SIMD.Int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.Float32x4.fromInt32x4Bits(m);
  equal(1.0, SIMD.Float32x4.extractLane(n, 0));
  equal(2.0, SIMD.Float32x4.extractLane(n, 1));
  equal(3.0, SIMD.Float32x4.extractLane(n, 2));
  equal(4.0, SIMD.Float32x4.extractLane(n, 3));
  n = SIMD.Float32x4(5.0, 6.0, 7.0, 8.0);
  m = SIMD.Int32x4.fromFloat32x4Bits(n);
  equal(0x40A00000, SIMD.Int32x4.extractLane(m, 0));
  equal(0x40C00000, SIMD.Int32x4.extractLane(m, 1));
  equal(0x40E00000, SIMD.Int32x4.extractLane(m, 2));
  equal(0x41000000, SIMD.Int32x4.extractLane(m, 3));
  // Flip sign using bit-wise operators.
  n = SIMD.Float32x4(9.0, 10.0, 11.0, 12.0);
  m = SIMD.Int32x4(0x80000000, 0x80000000, 0x80000000, 0x80000000);
  var nMask = SIMD.Int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.Int32x4.xor(nMask, m); // flip sign.
  n = SIMD.Float32x4.fromInt32x4Bits(nMask);
  equal(-9.0, SIMD.Float32x4.extractLane(n, 0));
  equal(-10.0, SIMD.Float32x4.extractLane(n, 1));
  equal(-11.0, SIMD.Float32x4.extractLane(n, 2));
  equal(-12.0, SIMD.Float32x4.extractLane(n, 3));
  nMask = SIMD.Int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.Int32x4.xor(nMask, m); // flip sign.
  n = SIMD.Float32x4.fromInt32x4Bits(nMask);
  equal(9.0, SIMD.Float32x4.extractLane(n, 0));
  equal(10.0, SIMD.Float32x4.extractLane(n, 1));
  equal(11.0, SIMD.Float32x4.extractLane(n, 2));
  equal(12.0, SIMD.Float32x4.extractLane(n, 3));
  // Should stay unmodified across bit conversions
  m = SIMD.Int32x4(0xFFFFFFFF, 0xFFFF0000, 0x80000000, 0x0);
  var m2 = SIMD.Int32x4.fromFloat32x4Bits(SIMD.Float32x4.fromInt32x4Bits(m));
  //equal(SIMD.Float32x4.extractLane(m, 0), m2SIMD.Float32x4.extractLane(m2, 0)); // FIXME: These get NaN-canonicalized
  //equal(SIMD.Float32x4.extractLane(m, 1), m2SIMD.Float32x4.extractLane(m2, 1)); // FIXME: These get NaN-canonicalized
  equal(SIMD.Int32x4.extractLane(m, 2), SIMD.Int32x4.extractLane(m2, 2));
  equal(SIMD.Int32x4.extractLane(m, 3), SIMD.Int32x4.extractLane(m2, 3));
});





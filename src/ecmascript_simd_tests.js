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

almostEqual = function(a, b) {
  if (Math.abs(a - b) < 0.00001) {
    ok(true);
    return;
  }
  ok(false);
}

test('float32x4 constructor', function() {
  notEqual(undefined, SIMD.float32x4);  // Type.
  notEqual(undefined, SIMD.float32x4(1.0, 2.0, 3.0, 4.0));  // New object.
});

test('float32x4 fromFloat64x2 constructor', function() {
  var m = SIMD.float64x2(1.0, 2.0);
  var n = SIMD.float32x4.fromFloat64x2(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(0.0, n.z);
  equal(0.0, n.w);
});

test('float32x4 fromInt32x4 constructor', function() {
  var m = SIMD.int32x4(1, 2, 3, 4);
  var n = SIMD.float32x4.fromInt32x4(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(3.0, n.z);
  equal(4.0, n.w);
});

test('float32x4 fromFloat64x2Bits constructor', function() {
  var m = SIMD.float64x2.fromInt32x4Bits(SIMD.int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000));
  var n = SIMD.float32x4.fromFloat64x2Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(3.0, n.z);
  equal(4.0, n.w);
});

test('float32x4 fromInt32x4Bits constructor', function() {
  var m = SIMD.int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.float32x4.fromInt32x4Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(3.0, n.z);
  equal(4.0, n.w);
});

test('float32x4 scalar getters', function() {
  var a = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  equal(1.0, a.x);
  equal(2.0, a.y);
  equal(3.0, a.z);
  equal(4.0, a.w);
});

test('float32x4 signMask getter', function() {
  var a = SIMD.float32x4(-1.0, -2.0, -3.0, -4.0);
  equal(0xf, a.signMask);
  var b = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  equal(0x0, b.signMask);
  var c = SIMD.float32x4(1.0, -2.0, -3.0, 4.0);
  equal(0x6, c.signMask);
});

test('float32x4 vector getters', function() {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var xxxx = SIMD.float32x4.shuffle(a, SIMD.XXXX);
  var yyyy = SIMD.float32x4.shuffle(a, SIMD.YYYY);
  var zzzz = SIMD.float32x4.shuffle(a, SIMD.ZZZZ);
  var wwww = SIMD.float32x4.shuffle(a, SIMD.WWWW);
  var wzyx = SIMD.float32x4.shuffle(a, SIMD.WZYX);
  equal(4.0, xxxx.x);
  equal(4.0, xxxx.y);
  equal(4.0, xxxx.z);
  equal(4.0, xxxx.w);
  equal(3.0, yyyy.x);
  equal(3.0, yyyy.y);
  equal(3.0, yyyy.z);
  equal(3.0, yyyy.w);
  equal(2.0, zzzz.x);
  equal(2.0, zzzz.y);
  equal(2.0, zzzz.z);
  equal(2.0, zzzz.w);
  equal(1.0, wwww.x);
  equal(1.0, wwww.y);
  equal(1.0, wwww.z);
  equal(1.0, wwww.w);
  equal(1.0, wzyx.x);
  equal(2.0, wzyx.y);
  equal(3.0, wzyx.z);
  equal(4.0, wzyx.w);
});

test('float32x4 abs', function() {
  var a = SIMD.float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.float32x4.abs(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
  c = SIMD.float32x4.abs(SIMD.float32x4(4.0, 3.0, 2.0, 1.0));
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
});

test('float32x4 neg', function() {
  var a = SIMD.float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.float32x4.neg(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
  c = SIMD.float32x4.neg(SIMD.float32x4(4.0, 3.0, 2.0, 1.0));
  equal(-4.0, c.x);
  equal(-3.0, c.y);
  equal(-2.0, c.z);
  equal(-1.0, c.w);
});


test('float32x4 add', function() {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.float32x4.add(a, b);
  equal(14.0, c.x);
  equal(23.0, c.y);
  equal(32.0, c.z);
  equal(41.0, c.w);
});

test('float32x4 sub', function() {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.float32x4.sub(a, b);
  equal(-6.0, c.x);
  equal(-17.0, c.y);
  equal(-28.0, c.z);
  equal(-39.0, c.w);
});

test('float32x4 mul', function() {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.float32x4.mul(a, b);
  equal(40.0, c.x);
  equal(60.0, c.y);
  equal(60.0, c.z);
  equal(40.0, c.w);
});

test('float32x4 div', function() {
  var a = SIMD.float32x4(4.0, 9.0, 8.0, 1.0);
  var b = SIMD.float32x4(2.0, 3.0, 1.0, 0.5);
  var c = SIMD.float32x4.div(a, b);
  equal(2.0, c.x);
  equal(3.0, c.y);
  equal(8.0, c.z);
  equal(2.0, c.w);
});

test('float32x4 clamp', function() {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = SIMD.float32x4(2.0, 1.0, 50.0, 0.0);
  var upper = SIMD.float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.float32x4.clamp(a, lower, upper);
  equal(2.0, c.x);
  equal(5.0, c.y);
  equal(50.0, c.z);
  equal(0.5, c.w);
});

test('float32x4 min', function() {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = SIMD.float32x4(2.0, 1.0, 50.0, 0.0);
  var c = SIMD.float32x4.min(a, lower);
  equal(-20.0, c.x);
  equal(1.0, c.y);
  equal(30.0, c.z);
  equal(0.0, c.w);
});

test('float32x4 max', function() {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = SIMD.float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.float32x4.max(a, upper);
  equal(2.5, c.x);
  equal(10.0, c.y);
  equal(55.0, c.z);
  equal(1.0, c.w);
});

test('float32x4 reciprocal', function() {
  var a = SIMD.float32x4(8.0, 4.0, 2.0, -2.0);
  var c = SIMD.float32x4.reciprocal(a);
  equal(0.125, c.x);
  equal(0.250, c.y);
  equal(0.5, c.z);
  equal(-0.5, c.w);
});

test('float32x4 reciprocal sqrt', function() {
  var a = SIMD.float32x4(1.0, 0.25, 0.111111, 0.0625);
  var c = SIMD.float32x4.reciprocalSqrt(a);
  almostEqual(1.0, c.x);
  almostEqual(2.0, c.y);
  almostEqual(3.0, c.z);
  almostEqual(4.0, c.w);
});

test('float32x4 scale', function() {
  var a = SIMD.float32x4(8.0, 4.0, 2.0, -2.0);
  var c = SIMD.float32x4.scale(a, 0.5);
  equal(4.0, c.x);
  equal(2.0, c.y);
  equal(1.0, c.z);
  equal(-1.0, c.w);
});

test('float32x4 sqrt', function() {
  var a = SIMD.float32x4(16.0, 9.0, 4.0, 1.0);
  var c = SIMD.float32x4.sqrt(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
});

test('float32x4 shuffleMix', function() {
  var a    = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var b    = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  var xyxy = SIMD.float32x4.shuffleMix(a, b, SIMD.XYXY);
  var zwzw = SIMD.float32x4.shuffleMix(a, b, SIMD.ZWZW);
  var xxxx = SIMD.float32x4.shuffleMix(a, b, SIMD.XXXX);
  equal(1.0, xyxy.x);
  equal(2.0, xyxy.y);
  equal(5.0, xyxy.z);
  equal(6.0, xyxy.w);
  equal(3.0, zwzw.x);
  equal(4.0, zwzw.y);
  equal(7.0, zwzw.z);
  equal(8.0, zwzw.w);
  equal(1.0, xxxx.x);
  equal(1.0, xxxx.y);
  equal(5.0, xxxx.z);
  equal(5.0, xxxx.w);
});

test('float32x4 withX', function() {
    var a = SIMD.float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.float32x4.withX(a, 20.0);
    equal(20.0, c.x);
    equal(9.0, c.y);
    equal(4.0, c.z);
    equal(1.0, c.w);
});

test('float32x4 withY', function() {
    var a = SIMD.float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.float32x4.withY(a, 20.0);
    equal(16.0, c.x);
    equal(20.0, c.y);
    equal(4.0, c.z);
    equal(1.0, c.w);
});

test('float32x4 withZ', function() {
    var a = SIMD.float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.float32x4.withZ(a, 20.0);
    equal(16.0, c.x);
    equal(9.0, c.y);
    equal(20.0, c.z);
    equal(1.0, c.w);
});

test('float32x4 withW', function() {
    var a = SIMD.float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.float32x4.withW(a, 20.0);
    equal(16.0, c.x);
    equal(9.0, c.y);
    equal(4.0, c.z);
    equal(20.0, c.w);
});

test('float32x4 comparisons', function() {
  var m = SIMD.float32x4(1.0, 2.0, 0.1, 0.001);
  var n = SIMD.float32x4(2.0, 2.0, 0.001, 0.1);
  var cmp;
  cmp = SIMD.float32x4.lessThan(m, n);
  equal(-1, cmp.x);
  equal(0x0, cmp.y);
  equal(0x0, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.float32x4.lessThanOrEqual(m, n);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.float32x4.equal(m, n);
  equal(0x0, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.float32x4.notEqual(m, n);
  equal(-1, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.float32x4.greaterThanOrEqual(m, n);
  equal(0x0, cmp.x);
  equal(-1, cmp.y);
  equal(-1, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.float32x4.greaterThan(m, n);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(0x0, cmp.w);
});

test('float32x4 select', function() {
  var m = SIMD.int32x4.bool(true, true, false, false);
  var t = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var f = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  var s = SIMD.float32x4.select(m, t, f);
  equal(1.0, s.x);
  equal(2.0, s.y);
  equal(7.0, s.z);
  equal(8.0, s.w);
});

test('float32x4 int32x4 bit conversion', function() {
  var m = SIMD.int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.float32x4.fromInt32x4Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(3.0, n.z);
  equal(4.0, n.w);
  n = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  m = SIMD.int32x4.fromFloat32x4Bits(n);
  equal(0x40A00000, m.x);
  equal(0x40C00000, m.y);
  equal(0x40E00000, m.z);
  equal(0x41000000, m.w);
  // Flip sign using bit-wise operators.
  n = SIMD.float32x4(9.0, 10.0, 11.0, 12.0);
  m = SIMD.int32x4(0x80000000, 0x80000000, 0x80000000, 0x80000000);
  var nMask = SIMD.int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.int32x4.xor(nMask, m); // flip sign.
  n = SIMD.float32x4.fromInt32x4Bits(nMask);
  equal(-9.0, n.x);
  equal(-10.0, n.y);
  equal(-11.0, n.z);
  equal(-12.0, n.w);
  nMask = SIMD.int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.int32x4.xor(nMask, m); // flip sign.
  n = SIMD.float32x4.fromInt32x4Bits(nMask);
  equal(9.0, n.x);
  equal(10.0, n.y);
  equal(11.0, n.z);
  equal(12.0, n.w);
  // Should stay unmodified across bit conversions
  m = SIMD.int32x4(0xFFFFFFFF, 0xFFFF0000, 0x80000000, 0x0);
  var m2 = SIMD.int32x4.fromFloat32x4Bits(SIMD.float32x4.fromInt32x4Bits(m));
  equal(m.x, m2.x);
  equal(m.y, m2.y);
  equal(m.z, m2.z);
  equal(m.w, m2.w);
});

test('float32x4 float64x2 conversion', function() {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
   var n = SIMD.float64x2.fromFloat32x4(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
});

test('float32x4 load', function() {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 4; i++) {
    var v = SIMD.float32x4.load(a.buffer, i * 4);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(i+3, v.w);
  }
});

test('float32x4 store', function() {
  var a = new Float32Array(10);
  SIMD.float32x4.store(a.buffer, 0, SIMD.float32x4(0, 1, 2, -1));
  SIMD.float32x4.store(a.buffer, 12, SIMD.float32x4(3, 4, 5, -1));
  SIMD.float32x4.store(a.buffer, 24, SIMD.float32x4(6, 7, 8, 9));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float32x4 load exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.float32x4.load(a.buffer, -1);
  });
  throws(function () {
    var f = SIMD.float32x4.load(a.buffer, 28);
  });
  throws(function () {
    var f = SIMD.float32x4.load(a, 1);
  });
  throws(function () {
    var f = SIMD.float32x4.load(a.buffer, "a");
  });
});

test('float32x4 store exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.float32x4.store(a.buffer, -1, f);
  });
  throws(function () {
    SIMD.float32x4.store(a.buffer, 28, f);
  });
  throws(function () {
    SIMD.float32x4.store(a, 1, f);
  });
  throws(function () {
    SIMD.float32x4.store(a.buffer, "a", f);
  });
  throws(function () {
    SIMD.float32x4.store(a.buffer, 1, i);
  });
});

test('float64x2 constructor', function() {
  equal('function', typeof SIMD.float64x2);
  var m = SIMD.float64x2(1.0, 2.0);
  equal(1.0, m.x);
  equal(2.0, m.y);
});

test('float64x2 splat constructor', function() {
  equal('function', typeof SIMD.float64x2.splat);
  var m = SIMD.float64x2.splat(3.0);
  equal(3.0, m.x);
  equal(m.x, m.y);
});

test('float64x2 zero constructor', function() {
  equal('function', typeof SIMD.float64x2.zero);
  var m = SIMD.float64x2.zero();
  equal(0.0, m.x);
  equal(0.0, m.y);
});

test('float64x2 fromFloat32x4 constructor', function() {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.float64x2.fromFloat32x4(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
});

test('float64x2 fromInt32x4 constructor', function() {
  var m = SIMD.int32x4(1, 2, 3, 4);
  var n = SIMD.float64x2.fromInt32x4(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
});

test('float64x2 fromFloat32x4Bits constructor', function() {
  var m = SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x3ff00000, 0x0000000, 0x40000000));
  var n = SIMD.float64x2.fromFloat32x4Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
});

test('float64x2 fromInt32x4Bits constructor', function() {
  var m = SIMD.int32x4(0x00000000, 0x3ff00000, 0x0000000, 0x40000000);
  var n = SIMD.float64x2.fromInt32x4Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
});

test('float64x2 scalar getters', function() {
  var m = SIMD.float64x2(1.0, 2.0);
  equal(1.0, m.x);
  equal(2.0, m.y);
});

test('float64x2 signMask getter', function() {
  var a = SIMD.float32x4(1.0, 2.0);
  equal(0x0, a.signMask);
  var b = SIMD.float32x4(-1.0, 2.0);
  equal(0x1, b.signMask);
  var c = SIMD.float64x2(1.0, -2.0);
  equal(0x2, c.signMask);
  var d = SIMD.float64x2(-1.0, -2.0);
  equal(0x3, d.signMask);
});

test('float64x2 abs', function() {
  var a = SIMD.float64x2(-2.0, -1.0);
  var c = SIMD.float64x2.abs(a);
  equal(2.0, c.x);
  equal(1.0, c.y);
  c = SIMD.float64x2.abs(SIMD.float64x2(2.0, 1.0));
  equal(2.0, c.x);
  equal(1.0, c.y);
});

test('float64x2 neg', function() {
  var a = SIMD.float64x2(-2.0, -1.0);
  var c = SIMD.float64x2.neg(a);
  equal(2.0, c.x);
  equal(1.0, c.y);
  c = SIMD.float64x2.neg(SIMD.float64x2(2.0, 1.0));
  equal(-2.0, c.x);
  equal(-1.0, c.y);
});

test('float64x2 add', function() {
  var a = SIMD.float64x2(2.0, 1.0);
  var b = SIMD.float64x2(10.0, 20.0);
  var c = SIMD.float64x2.add(a, b);
  equal(12.0, c.x);
  equal(21.0, c.y);
});

test('float64x2 sub', function() {
  var a = SIMD.float64x2(2.0, 1.0);
  var b = SIMD.float64x2(10.0, 20.0);
  var c = SIMD.float64x2.sub(a, b);
  equal(-8.0, c.x);
  equal(-19.0, c.y);
});

test('float64x2 mul', function() {
  var a = SIMD.float64x2(2.0, 1.0);
  var b = SIMD.float64x2(10.0, 20.0);
  var c = SIMD.float64x2.mul(a, b);
  equal(20.0, c.x);
  equal(20.0, c.y);
});

test('float64x2 div', function() {
  var a = SIMD.float64x2(4.0, 9.0);
  var b = SIMD.float64x2(2.0, 3.0);
  var c = SIMD.float64x2.div(a, b);
  equal(2.0, c.x);
  equal(3.0, c.y);
});
  
test('float64x2 clamp', function() {
  var a = SIMD.float64x2(-20.0, 10.0);
  var b = SIMD.float64x2(2.125, 3.0);
  var lower = SIMD.float64x2(2.0, 1.0);
  var upper = SIMD.float64x2(2.5, 5.0);
  var c = SIMD.float64x2.clamp(a, lower, upper);
  equal(2.0, c.x);
  equal(5.0, c.y);
  c = SIMD.float64x2.clamp(b, lower, upper);
  equal(2.125, c.x);
  equal(3.0, c.y);
  a = SIMD.float64x2(-3.4e200, 3.4e250);
  b = SIMD.float64x2(3.4e100, 3.4e200);
  lower = SIMD.float64x2(3.4e50, 3.4e100);
  upper = SIMD.float64x2(3.4e150, 3.4e300);
  c = SIMD.float64x2.clamp(a, lower, upper);
  equal(3.4e50, c.x);
  equal(3.4e250, c.y);
  c = SIMD.float64x2.clamp(b, lower, upper);
  equal(3.4e100, c.x);
  equal(3.4e200, c.y);
});

test('float64x2 min', function() {
  var a = SIMD.float64x2(-20.0, 10.0);
  var lower = SIMD.float64x2(2.0, 1.0);
  var c = SIMD.float64x2.min(a, lower);
  equal(-20.0, c.x);
  equal(1.0, c.y);
});

test('float64x2 max', function() {
  var a = SIMD.float64x2(-20.0, 10.0);
  var upper = SIMD.float64x2(2.5, 5.0);
  var c = SIMD.float64x2.max(a, upper);
  equal(2.5, c.x);
  equal(10.0, c.y);
});

test('float64x2 reciprocal', function() {
  var a = SIMD.float64x2(2.0, -2.0);
  var c = SIMD.float64x2.reciprocal(a);
  equal(0.5, c.x);
  equal(-0.5, c.y);
});

test('float64x2 reciprocal sqrt', function() {
  var a = SIMD.float64x2(1.0, 0.25);
  var c = SIMD.float64x2.reciprocalSqrt(a);
  almostEqual(1.0, c.x);
  almostEqual(2.0, c.y);
});

test('float64x2 scale', function() {
  var a = SIMD.float64x2(8.0, -2.0);
  var c = SIMD.float64x2.scale(a, 0.5);
  equal(4.0, c.x);
  equal(-1.0, c.y);
});

test('float64x2 sqrt', function() {
  var a = SIMD.float64x2(16.0, 9.0);
  var c = SIMD.float64x2.sqrt(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
});

test('float64x2 shuffle', function() {
  var a  = SIMD.float64x2(1.0, 2.0);
  var xx = SIMD.float64x2.shuffle(a, SIMD.XX);
  var xy = SIMD.float64x2.shuffle(a, SIMD.XY);
  var yx = SIMD.float64x2.shuffle(a, SIMD.YX);
  var yy = SIMD.float64x2.shuffle(a, SIMD.YY);
  equal(1.0, xx.x);
  equal(1.0, xx.y);
  equal(1.0, xy.x);
  equal(2.0, xy.y);
  equal(2.0, yx.x);
  equal(1.0, yx.y);
  equal(2.0, yy.x);
  equal(2.0, yy.y);
});

test('float64x2 shuffleMix', function() {
  var a  = SIMD.float64x2(1.0, 2.0);
  var b  = SIMD.float64x2(3.0, 4.0);
  var xx = SIMD.float64x2.shuffleMix(a, b, SIMD.XX);
  var xy = SIMD.float64x2.shuffleMix(a, b, SIMD.XY);
  var yx = SIMD.float64x2.shuffleMix(a, b, SIMD.YX);
  var yy = SIMD.float64x2.shuffleMix(a, b, SIMD.YY);
  equal(1.0, xx.x);
  equal(3.0, xx.y);
  equal(1.0, xy.x);
  equal(4.0, xy.y);
  equal(2.0, yx.x);
  equal(3.0, yx.y);
  equal(2.0, yy.x);
  equal(4.0, yy.y);
});

test('float64x2 withX', function() {
    var a = SIMD.float64x2(16.0, 9.0);
    var c = SIMD.float64x2.withX(a, 20.0);
    equal(20.0, c.x);
    equal(9.0, c.y);
});

test('float64x2 withY', function() {
    var a = SIMD.float64x2(16.0, 9.0);
    var c = SIMD.float64x2.withY(a, 20.0);
    equal(16.0, c.x);
    equal(20.0, c.y);
});

test('float64x2 comparisons', function() {
  var m = SIMD.float64x2(1.0, 2.0);
  var n = SIMD.float64x2(2.0, 2.0);
  var o = SIMD.float64x2(0.1, 0.001);
  var p = SIMD.float64x2(0.001, 0.1);

  var cmp;
  cmp = SIMD.float64x2.lessThan(m, n);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);
  cmp = SIMD.float64x2.lessThan(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.float64x2.lessThanOrEqual(m, n);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);
  cmp = SIMD.float64x2.lessThanOrEqual(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.float64x2.equal(m, n);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);
  cmp = SIMD.float64x2.equal(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.float64x2.notEqual(m, n);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);
  cmp = SIMD.float64x2.notEqual(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.float64x2.greaterThanOrEqual(m, n);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);
  cmp = SIMD.float64x2.greaterThanOrEqual(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.float64x2.greaterThan(m, n);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);
  cmp = SIMD.float64x2.greaterThan(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);
});

test('float64x2 select', function() {
  var m = SIMD.int32x4.bool(true, true, false, false);
  var t = SIMD.float64x2(1.0, 2.0);
  var f = SIMD.float64x2(3.0, 4.0);
  var s = SIMD.float64x2.select(m, t, f);
  equal(1.0, s.x);
  equal(4.0, s.y);
});

test('float64x2 load', function() {
  var a = new Float64Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.float64x2.load(a.buffer, i * 8);
    equal(i, v.x);
    equal(i+1, v.y);
  }
});

test('float64x2 store', function() {
  var a = new Float64Array(6);
  SIMD.float64x2.store(a.buffer, 0, SIMD.float64x2(0, 1));
  SIMD.float64x2.store(a.buffer, 16, SIMD.float64x2(2, 3));
  SIMD.float64x2.store(a.buffer, 32, SIMD.float64x2(4, 5));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float64x2 load exceptions', function () {
  var a = new Float64Array(8);
  throws(function () {
    var f = SIMD.float64x2.load(a.buffer, -1);
  });
  throws(function () {
    var f = SIMD.float64x2.load(a.buffer, 112);
  });
  throws(function () {
    var f = SIMD.float64x2.load(a, 1);
  });
  throws(function () {
    var f = SIMD.float64x2.load(a.buffer, "a");
  });
});

test('float64x2 store exceptions', function () {
  var a = new Float64Array(8);
  var f = SIMD.float64x2(1, 2);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.float64x2.store(a.buffer, -1, f);
  });
  throws(function () {
    SIMD.float64x2.store(a.buffer, 112, f);
  });
  throws(function () {
    SIMD.float64x2.store(a, 1, f);
  });
  throws(function () {
    SIMD.float64x2.store(a.buffer, "a", f);
  });
  throws(function () {
    SIMD.float64x2.store(a.buffer, 1, i);
  });
});

test('int32x4 fromFloat32x4 constructor', function() {
  var m = SIMD.float32x4(1.0, 2.2, 3.6, 4.8);
  var n = SIMD.int32x4.fromFloat32x4(m);
  equal(1, n.x);
  equal(2, n.y);
  equal(3, n.z);
  equal(4, n.w);
});

test('int32x4 fromFloat64x2 constructor', function() {
  var m = SIMD.float64x2(1.0, 2.2);
  var n = SIMD.int32x4.fromFloat64x2(m);
  equal(1, n.x);
  equal(2, n.y);
  equal(0, n.z);
  equal(0, n.w);
});

test('int32x4 fromFloat32x4Bits constructor', function() {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.int32x4.fromFloat32x4Bits(m);
  equal(0x3F800000, n.x);
  equal(0x40000000, n.y);
  equal(0x40400000, n.z);
  equal(0x40800000, n.w);
});

test('int32x4 fromFloat64x2Bits constructor', function() {
  var m = SIMD.float64x2(1.0, 2.0);
  var n = SIMD.int32x4.fromFloat64x2Bits(m);
  equal(0x00000000, n.x);
  equal(0x3FF00000, n.y);
  equal(0x00000000, n.z);
  equal(0x40000000, n.w);
});

test('int32x4 withX', function() {
    var a = SIMD.int32x4(1, 2, 3, 4);
    var c = SIMD.int32x4.withX(a, 20);
    equal(20, c.x);
    equal(2, c.y);
    equal(3, c.z);
    equal(4, c.w);
});

test('int32x4 withY', function() {
    var a = SIMD.int32x4(1, 2, 3, 4);
    var c = SIMD.int32x4.withY(a, 20);
    equal(1, c.x);
    equal(20, c.y);
    equal(3, c.z);
    equal(4, c.w);
});

test('int32x4 withZ', function() {
    var a = SIMD.int32x4(1, 2, 3, 4);
    var c = SIMD.int32x4.withZ(a, 20);
    equal(1, c.x);
    equal(2, c.y);
    equal(20, c.z);
    equal(4, c.w);
});

test('int32x4 withW', function() {
    var a = SIMD.int32x4(1, 2, 3, 4);
    var c = SIMD.int32x4.withW(a, 20);
    equal(1, c.x);
    equal(2, c.y);
    equal(3, c.z);
    equal(20, c.w);
});

test('int32x4 withFlagX', function() {
    var a = SIMD.int32x4.bool(true, false, true, false);
    var c = SIMD.int32x4.withFlagX(a, true);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    c = SIMD.int32x4.withFlagX(a, false);
    equal(false, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    equal(0x0, c.x);
    equal(0x0, c.y);
    equal(-1, c.z);
    equal(0x0, c.w);
});

test('int32x4 withFlagY', function() {
    var a = SIMD.int32x4.bool(true, false, true, false);
    var c = SIMD.int32x4.withFlagY(a, true);
    equal(true, c.flagX);
    equal(true, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    c = SIMD.int32x4.withFlagY(a, false);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    equal(-1, c.x);
    equal(0x0, c.y);
    equal(-1, c.z);
    equal(0x0, c.w);
});

test('int32x4 withFlagZ', function() {
    var a = SIMD.int32x4.bool(true, false, true, false);
    var c = SIMD.int32x4.withFlagZ(a, true);
    equal(-1, c.x);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    c = SIMD.int32x4.withFlagZ(a, false);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(false, c.flagZ);
    equal(false, c.flagW);
    equal(-1, c.x);
    equal(0x0, c.y);
    equal(0x0, c.z);
    equal(0x0, c.w);
});

test('int32x4 withFlagW', function() {
    var a = SIMD.int32x4.bool(true, false, true, false);
    var c = SIMD.int32x4.withFlagW(a, true);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(true, c.flagW);
    c = SIMD.int32x4.withFlagW(a, false);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    equal(-1, c.x);
    equal(0x0, c.y);
    equal(-1, c.z);
    equal(0x0, c.w);
});

test('int32x4 and', function() {
  var m = SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, -1431655766, 0xAAAAAAAA);
  var n = SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  equal(-1431655766, m.x);
  equal(-1431655766, m.y);
  equal(-1431655766, m.z);
  equal(-1431655766, m.w);
  equal(0x55555555, n.x);
  equal(0x55555555, n.y);
  equal(0x55555555, n.z);
  equal(0x55555555, n.w);
  equal(true, n.flagX);
  equal(true, n.flagY);
  equal(true, n.flagZ);
  equal(true, n.flagW);
  var o = SIMD.int32x4.and(m,n);  // and
  equal(0x0, o.x);
  equal(0x0, o.y);
  equal(0x0, o.z);
  equal(0x0, o.w);
  equal(false, o.flagX);
  equal(false, o.flagY);
  equal(false, o.flagZ);
  equal(false, o.flagW);
});

test('int32x4 or', function() {
  var m = SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  var o = SIMD.int32x4.or(m,n);  // or
  equal(-1, o.x);
  equal(-1, o.y);
  equal(-1, o.z);
  equal(-1, o.w);
  equal(true, o.flagX);
  equal(true, o.flagY);
  equal(true, o.flagZ);
  equal(true, o.flagW);
});

test('int32x4 xor', function() {
  var m = SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  n = SIMD.int32x4.withX(n, 0xAAAAAAAA);
  n = SIMD.int32x4.withY(n, 0xAAAAAAAA);
  n = SIMD.int32x4.withZ(n, 0xAAAAAAAA);
  n = SIMD.int32x4.withW(n, 0xAAAAAAAA);
  equal(-1431655766, n.x);
  equal(-1431655766, n.y);
  equal(-1431655766, n.z);
  equal(-1431655766, n.w);
  var o = SIMD.int32x4.xor(m,n);  // xor
  equal(0x0, o.x);
  equal(0x0, o.y);
  equal(0x0, o.z);
  equal(0x0, o.w);
  equal(false, o.flagX);
  equal(false, o.flagY);
  equal(false, o.flagZ);
  equal(false, o.flagW);
});

test('int32x4 neg', function() {
  var m = SIMD.int32x4(16, 32, 64, 128);
  var n = SIMD.int32x4(-1, -2, -3, -4);
  m = SIMD.int32x4.neg(m);
  n = SIMD.int32x4.neg(n);
  equal(-16, m.x);
  equal(-32, m.y);
  equal(-64, m.z);
  equal(-128, m.w);
  equal(1, n.x);
  equal(2, n.y);
  equal(3, n.z);
  equal(4, n.w);
});

test('int32x4 signMask getter', function() {
  var a = SIMD.int32x4(0x80000000, 0x7000000, 0xFFFFFFFF, 0x0);
  equal(0x5, a.signMask);
  var b = SIMD.int32x4(0x0, 0x0, 0x0, 0x0);
  equal(0x0, b.signMask);
  var c = SIMD.int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF);
  equal(0xf, c.signMask);
});


test('int32x4 add', function() {
  var a = SIMD.int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x7fffffff, 0x0);
  var b = SIMD.int32x4(0x1, 0xFFFFFFFF, 0x1, 0xFFFFFFFF);
  var c = SIMD.int32x4.add(a, b);
  equal(0x0, c.x);
  equal(-2, c.y);
  equal(-0x80000000, c.z);
  equal(-1, c.w);
});

test('int32x4 sub', function() {
  var a = SIMD.int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x80000000, 0x0);
  var b = SIMD.int32x4(0x1, 0xFFFFFFFF, 0x1, 0xFFFFFFFF);
  var c = SIMD.int32x4.sub(a, b);
  equal(-2, c.x);
  equal(0x0, c.y);
  equal(0x7FFFFFFF, c.z);
  equal(0x1, c.w);
});

test('int32x4 mul', function() {
  var a = SIMD.int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x80000000, 0x0);
  var b = SIMD.int32x4(0x1, 0xFFFFFFFF, 0x80000000, 0xFFFFFFFF);
  var c = SIMD.int32x4.mul(a, b);
  equal(-1, c.x);
  equal(0x1, c.y);
  equal(0x0, c.z);
  equal(0x0, c.w);
});

test('int32x4 select', function() {
  var m = SIMD.int32x4.bool(true, true, false, false);
  var t = SIMD.int32x4(1, 2, 3, 4);
  var f = SIMD.int32x4(5, 6, 7, 8);
  var s = SIMD.int32x4.select(m, t, f);
  equal(1, s.x);
  equal(2, s.y);
  equal(7, s.z);
  equal(8, s.w);
});

test('int32x4 load', function() {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 4; i++) {
    var v = SIMD.int32x4.load(a.buffer, i * 4);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(i+3, v.w);
  }
});

test('int32x4 store', function() {
  var a = new Int32Array(10);
  SIMD.int32x4.store(a.buffer, 0, SIMD.int32x4(0, 1, 2, -1));
  SIMD.int32x4.store(a.buffer, 12, SIMD.int32x4(3, 4, 5, -1));
  SIMD.int32x4.store(a.buffer, 24, SIMD.int32x4(6, 7, 8, 9));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('int32x4 load exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.int32x4.load(a.buffer, -1);
  });
  throws(function () {
    var f = SIMD.int32x4.load(a.buffer, 28);
  });
  throws(function () {
    var f = SIMD.int32x4.load(a, 1);
  });
  throws(function () {
    var f = SIMD.int32x4.load(a.buffer, "a");
  });
});

test('int32x4 store exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.int32x4.store(a.buffer, -1, i);
  });
  throws(function () {
    SIMD.int32x4.store(a.buffer, 28, i);
  });
  throws(function () {
    SIMD.int32x4.store(a, 1, i);
  });
  throws(function () {
    SIMD.int32x4.store(a.buffer, "a", i);
  });
  throws(function () {
    SIMD.int32x4.store(a.buffer, 1, f);
  });
});

test('Float32x4Array simple', function() {
  var a = new Float32x4Array(1);
  equal(1, a.length);
  equal(16, a.byteLength);
  equal(16, a.BYTES_PER_ELEMENT);
  equal(16, Float32x4Array.BYTES_PER_ELEMENT);
  equal(0, a.byteOffset);
  notEqual(undefined, a.buffer);
  var b = new Float32x4Array(4);
  equal(4, b.length);
  equal(64, b.byteLength);
  equal(16, b.BYTES_PER_ELEMENT);
  equal(16, Float32x4Array.BYTES_PER_ELEMENT);
  equal(0, b.byteOffset);
  notEqual(undefined, b.buffer);
});

test('Float32x4Array set and get', function() {
  var a = new Float32x4Array(4);
  a.setAt(0, SIMD.float32x4(1, 2, 3, 4));
  a.setAt(1, SIMD.float32x4(5, 6, 7, 8));
  a.setAt(2, SIMD.float32x4(9, 10, 11, 12));
  a.setAt(3, SIMD.float32x4(13, 14, 15, 16));
  equal(a.getAt(0).x, 1);
  equal(a.getAt(0).y, 2);
  equal(a.getAt(0).z, 3);
  equal(a.getAt(0).w, 4);

  equal(a.getAt(1).x, 5);
  equal(a.getAt(1).y, 6);
  equal(a.getAt(1).z, 7);
  equal(a.getAt(1).w, 8);

  equal(a.getAt(2).x, 9);
  equal(a.getAt(2).y, 10);
  equal(a.getAt(2).z, 11);
  equal(a.getAt(2).w, 12);

  equal(a.getAt(3).x, 13);
  equal(a.getAt(3).y, 14);
  equal(a.getAt(3).z, 15);
  equal(a.getAt(3).w, 16);
});

test('Float32x4Array swap', function() {
  var a = new Float32x4Array(4);
  a.setAt(0, SIMD.float32x4(1, 2, 3, 4));
  a.setAt(1, SIMD.float32x4(5, 6, 7, 8));
  a.setAt(2, SIMD.float32x4(9, 10, 11, 12));
  a.setAt(3, SIMD.float32x4(13, 14, 15, 16));

  // Swap element 0 and element 3
  var t = a.getAt(0);
  a.setAt(0, a.getAt(3));
  a.setAt(3, t);

  equal(a.getAt(3).x, 1);
  equal(a.getAt(3).y, 2);
  equal(a.getAt(3).z, 3);
  equal(a.getAt(3).w, 4);

  equal(a.getAt(1).x, 5);
  equal(a.getAt(1).y, 6);
  equal(a.getAt(1).z, 7);
  equal(a.getAt(1).w, 8);

  equal(a.getAt(2).x, 9);
  equal(a.getAt(2).y, 10);
  equal(a.getAt(2).z, 11);
  equal(a.getAt(2).w, 12);

  equal(a.getAt(0).x, 13);
  equal(a.getAt(0).y, 14);
  equal(a.getAt(0).z, 15);
  equal(a.getAt(0).w, 16);
});

test('Float32x4Array copy', function() {
  var a = new Float32x4Array(4);
  a.setAt(0, SIMD.float32x4(1, 2, 3, 4));
  a.setAt(1, SIMD.float32x4(5, 6, 7, 8));
  a.setAt(2, SIMD.float32x4(9, 10, 11, 12));
  a.setAt(3, SIMD.float32x4(13, 14, 15, 16));
  var b = new Float32x4Array(a);
  equal(a.getAt(0).x, b.getAt(0).x);
  equal(a.getAt(0).y, b.getAt(0).y);
  equal(a.getAt(0).z, b.getAt(0).z);
  equal(a.getAt(0).w, b.getAt(0).w);

  equal(a.getAt(1).x, b.getAt(1).x);
  equal(a.getAt(1).y, b.getAt(1).y);
  equal(a.getAt(1).z, b.getAt(1).z);
  equal(a.getAt(1).w, b.getAt(1).w);

  equal(a.getAt(2).x, b.getAt(2).x);
  equal(a.getAt(2).y, b.getAt(2).y);
  equal(a.getAt(2).z, b.getAt(2).z);
  equal(a.getAt(2).w, b.getAt(2).w);

  equal(a.getAt(3).x, b.getAt(3).x);
  equal(a.getAt(3).y, b.getAt(3).y);
  equal(a.getAt(3).z, b.getAt(3).z);
  equal(a.getAt(3).w, b.getAt(3).w);

  a.setAt(2, SIMD.float32x4(17, 18, 19, 20));

  equal(a.getAt(2).x, 17);
  equal(a.getAt(2).y, 18);
  equal(a.getAt(2).z, 19);
  equal(a.getAt(2).w, 20);

  notEqual(a.getAt(2).x, b.getAt(2).x);
  notEqual(a.getAt(2).y, b.getAt(2).y);
  notEqual(a.getAt(2).z, b.getAt(2).z);
  notEqual(a.getAt(2).w, b.getAt(2).w);
});

test('Float32Array view basic', function() {
  var a = new Float32Array(8);
  // view with no offset.
  var b = new Float32x4Array(a.buffer, 0);
  // view with offset.
  var c = new Float32x4Array(a.buffer, 16);
  // view with no offset but shorter than original list.
  var d = new Float32x4Array(a.buffer, 0, 1);
  equal(a.length, 8);
  equal(b.length, 2);
  equal(c.length, 1);
  equal(d.length, 1);
  equal(a.byteLength, 32);
  equal(b.byteLength, 32);
  equal(c.byteLength, 16);
  equal(d.byteLength, 16)
  equal(a.byteOffset, 0);
  equal(b.byteOffset, 0);
  equal(c.byteOffset, 16);
  equal(d.byteOffset, 0);

});

test('Float32Array view values', function() {
  var a = new Float32Array(8);
  var b = new Float32x4Array(a.buffer, 0);
  var c = new Float32x4Array(a.buffer, 16);
  var d = new Float32x4Array(a.buffer, 0, 1);
  var start = 100;
  for (var i = 0; i < b.length; i++) {
    equal(0.0, b.getAt(i).x);
    equal(0.0, b.getAt(i).y);
    equal(0.0, b.getAt(i).z);
    equal(0.0, b.getAt(i).w);
  }
  for (var i = 0; i < c.length; i++) {
    equal(0.0, c.getAt(i).x);
    equal(0.0, c.getAt(i).y);
    equal(0.0, c.getAt(i).z);
    equal(0.0, c.getAt(i).w);
  }
  for (var i = 0; i < d.length; i++) {
    equal(0.0, d.getAt(i).x);
    equal(0.0, d.getAt(i).y);
    equal(0.0, d.getAt(i).z);
    equal(0.0, d.getAt(i).w);
  }
  for (var i = 0; i < a.length; i++) {
    a[i] = i+start;
  }
  for (var i = 0; i < b.length; i++) {
    notEqual(0.0, b.getAt(i).x);
    notEqual(0.0, b.getAt(i).y);
    notEqual(0.0, b.getAt(i).z);
    notEqual(0.0, b.getAt(i).w);
  }
  for (var i = 0; i < c.length; i++) {
    notEqual(0.0, c.getAt(i).x);
    notEqual(0.0, c.getAt(i).y);
    notEqual(0.0, c.getAt(i).z);
    notEqual(0.0, c.getAt(i).w);
  }
  for (var i = 0; i < d.length; i++) {
    notEqual(0.0, d.getAt(i).x);
    notEqual(0.0, d.getAt(i).y);
    notEqual(0.0, d.getAt(i).z);
    notEqual(0.0, d.getAt(i).w);
  }
  equal(start+0, b.getAt(0).x);
  equal(start+1, b.getAt(0).y);
  equal(start+2, b.getAt(0).z);
  equal(start+3, b.getAt(0).w);
  equal(start+4, b.getAt(1).x);
  equal(start+5, b.getAt(1).y);
  equal(start+6, b.getAt(1).z);
  equal(start+7, b.getAt(1).w);

  equal(start+4, c.getAt(0).x);
  equal(start+5, c.getAt(0).y);
  equal(start+6, c.getAt(0).z);
  equal(start+7, c.getAt(0).w);

  equal(start+0, d.getAt(0).x);
  equal(start+1, d.getAt(0).y);
  equal(start+2, d.getAt(0).z);
  equal(start+3, d.getAt(0).w);
});

test('Float32x4Array exceptions', function () {
  var a = new Float32x4Array(4);
  var b = a.getAt(0);
  var c = a.getAt(1);
  var d = a.getAt(2);
  var e = a.getAt(3);
  throws(function () {
    var f = a.getAt(4);
  });
  throws(function () {
    var f = a.getAt(-1);
  });
  throws(function () {
    // Unaligned byte offset.
    var f = new Float32x4Array(a.buffer, 15);
  });
  throws(function () {
    // Unaligned byte offset, but aligned on 4.  Bug
    var f = new Float32x4Array(a.buffer, 4);
  });
});

test('View on Float32x4Array', function() {
  var a = new Float32x4Array(4);
  a.setAt(0, SIMD.float32x4(1, 2, 3, 4));
  a.setAt(1, SIMD.float32x4(5, 6, 7, 8));
  a.setAt(2, SIMD.float32x4(9, 10, 11, 12));
  a.setAt(3, SIMD.float32x4(13, 14, 15, 16));
  equal(a.getAt(0).x, 1);
  equal(a.getAt(0).y, 2);
  equal(a.getAt(0).z, 3);
  equal(a.getAt(0).w, 4);

  equal(a.getAt(1).x, 5);
  equal(a.getAt(1).y, 6);
  equal(a.getAt(1).z, 7);
  equal(a.getAt(1).w, 8);

  equal(a.getAt(2).x, 9);
  equal(a.getAt(2).y, 10);
  equal(a.getAt(2).z, 11);
  equal(a.getAt(2).w, 12);

  equal(a.getAt(3).x, 13);
  equal(a.getAt(3).y, 14);
  equal(a.getAt(3).z, 15);
  equal(a.getAt(3).w, 16);

  // Create view on a.
  var b = new Float32Array(a.buffer);
  equal(b.length, 16);
  equal(b.byteLength, 64);
  b[2] = 99.0;
  b[6] = 1.0;

  // Observe changes in "a"
  equal(a.getAt(0).x, 1);
  equal(a.getAt(0).y, 2);
  equal(a.getAt(0).z, 99);
  equal(a.getAt(0).w, 4);

  equal(a.getAt(1).x, 5);
  equal(a.getAt(1).y, 6);
  equal(a.getAt(1).z, 1);
  equal(a.getAt(1).w, 8);

  equal(a.getAt(2).x, 9);
  equal(a.getAt(2).y, 10);
  equal(a.getAt(2).z, 11);
  equal(a.getAt(2).w, 12);

  equal(a.getAt(3).x, 13);
  equal(a.getAt(3).y, 14);
  equal(a.getAt(3).z, 15);
  equal(a.getAt(3).w, 16);
});

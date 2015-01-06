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

test('coercive constructors', function() {
  var x = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  equal(SIMD.float32x4(x), x);
  throws(function() {SIMD.float32x4(1)});
  throws(function() {SIMD.float32x4('hi')});

  var y = SIMD.int32x4(1, 2, 3, 4);
  equal(SIMD.int32x4(y), y);
  throws(function() {SIMD.int32x4(1)});
  throws(function() {SIMD.int32x4('hi')});

  var z = SIMD.float64x2(1.0, 2.0);
  equal(SIMD.float64x2(z), z);
  throws(function() {SIMD.float64x2(1)});
  throws(function() {SIMD.float64x2('hi')});

  var u = SIMD.int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  equal(SIMD.int16x8(u), u);
  throws(function() {SIMD.int16x8(1)});
  throws(function() {SIMD.int16x8('hi')});

  var v = SIMD.int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  equal(SIMD.int8x16(v), v);
  throws(function() {SIMD.int8x16(1)});
  throws(function() {SIMD.int8x16('hi')});
});

test('float32x4 fromFloat64x2 constructor', function() {
  var m = SIMD.float64x2(1.0, 2.0);
  var n = SIMD.float32x4.fromFloat64x2(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(0.0, n.z);
  equal(0.0, n.w);

  m = SIMD.float64x2(3.402824e+38, 7.006492e-46);
  n = SIMD.float32x4.fromFloat64x2(m);
  equal(Infinity, n.x);
  equal(0.0, n.y);
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

  m = SIMD.int32x4(0, 2147483647, -2147483648, -1);
  n = SIMD.float32x4.fromInt32x4(m);
  equal(0, n.x);
  equal(2147483648, n.y);
  equal(-2147483648, n.z);
  equal(-1, n.w);
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

test('float32x4 fromInt16x8Bits constructor', function() {
  var m = SIMD.int16x8(0x0000, 0x3F80, 0x0000, 0x4000, 0x0000, 0x4040, 0x0000, 0x4080);
  var n = SIMD.float32x4.fromInt16x8Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(3.0, n.z);
  equal(4.0, n.w);
});

test('float32x4 fromInt8x16Bits constructor', function() {
  var m = SIMD.int8x16(0x0, 0x0, 0x80, 0x3F, 0x0, 0x0, 0x00, 0x40, 0x00, 0x00, 0x40, 0x40, 0x00, 0x00, 0x80, 0x40);
  var n = SIMD.float32x4.fromInt8x16Bits(m);
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
  var d = SIMD.float32x4(-0.0, 0.0, 0.0, -0.0);
  equal(0x9, d.signMask);
  var e = SIMD.float32x4(0.0, -0.0, -0.0, 0.0);
  equal(0x6, e.signMask);
});

test('float32x4 vector getters', function() {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var xxxx = SIMD.float32x4.swizzle(a, 0, 0, 0, 0);
  var yyyy = SIMD.float32x4.swizzle(a, 1, 1, 1, 1);
  var zzzz = SIMD.float32x4.swizzle(a, 2, 2, 2, 2);
  var wwww = SIMD.float32x4.swizzle(a, 3, 3, 3, 3);
  var wzyx = SIMD.float32x4.swizzle(a, 3, 2, 1, 0);
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

  var d = SIMD.float32x4(NaN, Infinity, 0.0, 1.0);
  var e = SIMD.float32x4.abs(d);
  var f = SIMD.float32x4(-NaN, -Infinity, -0.0, -1.0);
  var g = SIMD.float32x4.abs(f);
  notEqual(e.x, e.x);
  equal(e.y, Infinity);
  equal(e.z, 0.0);
  equal(1 / e.z, Infinity);
  equal(e.w, 1.0);
  notEqual(g.x, g.x);
  equal(g.y, Infinity);
  equal(g.z, 0.0);
  equal(1 / g.z, Infinity);
  equal(g.w, 1.0);
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

  var d = SIMD.float32x4(Infinity, -Infinity, 0.0, -0.0);
  var f = SIMD.float32x4.neg(d);
  equal(-Infinity, f.x);
  equal(Infinity, f.y);
  equal(0.0, f.z);
  equal(-Infinity, 1 / f.z);
  equal(0.0, f.w);
  equal(Infinity, 1 / f.w);

  var g = SIMD.float32x4.neg(SIMD.float32x4.splat(NaN));
  notEqual(g.x, g.x);
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

  var d = SIMD.float32x4(1.0, 0.0, Infinity, NaN);
  var e = SIMD.float32x4(Infinity, 0.0, Infinity, 1.0);
  var f = SIMD.float32x4.div(d, e);
  equal(f.x, 0.0);
  notEqual(f.y, f.y);
  notEqual(f.z, f.z);
  notEqual(f.w, f.w);

  var g = SIMD.float32x4(1.0, 1.0, -1.0, -1.0);
  var h = SIMD.float32x4(0.0, -0.0, 0.0, -0.0);
  var i = SIMD.float32x4.div(g, h);
  equal(i.x, Infinity);
  equal(i.y, -Infinity);
  equal(i.z, -Infinity);
  equal(i.w, Infinity);
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

  var x = SIMD.float32x4(-0, 0, NaN, 0);
  var y = SIMD.float32x4(0, -0, 0, NaN);
  var z = SIMD.float32x4.min(x, y);
  equal(0, z.x);
  equal(1 / z.x, -Infinity);
  equal(0, z.y);
  equal(1 / z.y, -Infinity);
  notEqual(z.z, z.z);
  notEqual(z.w, z.w);
});

test('float32x4 minNum', function() {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = SIMD.float32x4(2.0, 1.0, 50.0, 0.0);
  var c = SIMD.float32x4.minNum(a, lower);
  equal(-20.0, c.x);
  equal(1.0, c.y);
  equal(30.0, c.z);
  equal(0.0, c.w);

  var x = SIMD.float32x4(-0, 0, NaN, 0);
  var y = SIMD.float32x4(0, -0, 0, NaN);
  var z = SIMD.float32x4.minNum(x, y);
  equal(0, z.x);
  equal(1 / z.x, -Infinity);
  equal(0, z.y);
  equal(1 / z.y, -Infinity);
  equal(0, z.z);
  equal(0, z.w);
});

test('float32x4 min exceptions', function() {
  var ok    = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var notOk = 1;
  throws(function () {
    SIMD.float32x4.min(ok, notOk);
  });
  throws(function () {
    SIMD.float32x4.min(notOk, ok);
  });
});

test('float32x4 max', function() {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = SIMD.float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.float32x4.max(a, upper);
  equal(2.5, c.x);
  equal(10.0, c.y);
  equal(55.0, c.z);
  equal(1.0, c.w);

  var x = SIMD.float32x4(-0, 0, NaN, 0);
  var y = SIMD.float32x4(0, -0, 0, NaN);
  var z = SIMD.float32x4.max(x, y);
  equal(0, z.x);
  equal(1 / z.x, Infinity);
  equal(0, z.y);
  equal(1 / z.y, Infinity);
  notEqual(z.z, z.z);
  notEqual(z.w, z.w);
});

test('float32x4 maxNum', function() {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = SIMD.float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.float32x4.maxNum(a, upper);
  equal(2.5, c.x);
  equal(10.0, c.y);
  equal(55.0, c.z);
  equal(1.0, c.w);

  var x = SIMD.float32x4(-0, 0, NaN, 0);
  var y = SIMD.float32x4(0, -0, 0, NaN);
  var z = SIMD.float32x4.maxNum(x, y);
  equal(0, z.x);
  equal(1 / z.x, Infinity);
  equal(0, z.y);
  equal(1 / z.y, Infinity);
  equal(0, z.z);
  equal(0, z.w);
});

test('float32x4 max exceptions', function() {
  var ok    = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var notOk = 1;
  throws(function () {
    SIMD.float32x4.max(ok, notOk);
  });
  throws(function () {
    SIMD.float32x4.max(notOk, ok);
  });
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

test('float32x4 sqrt', function() {
  var a = SIMD.float32x4(16.0, 9.0, 4.0, 1.0);
  var c = SIMD.float32x4.sqrt(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
});

test('float32x4 shuffle', function() {
  var a    = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var b    = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  var xyxy = SIMD.float32x4.shuffle(a, b, 0, 1, 4, 5);
  var zwzw = SIMD.float32x4.shuffle(a, b, 2, 3, 6, 7);
  var xxxx = SIMD.float32x4.shuffle(a, b, 0, 0, 4, 4);
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

  var c = SIMD.float32x4.shuffle(a, b, 0, 4, 5, 1);
  var d = SIMD.float32x4.shuffle(a, b, 2, 6, 3, 7);
  var e = SIMD.float32x4.shuffle(a, b, 0, 4, 0, 4);
  equal(1.0, c.x);
  equal(5.0, c.y);
  equal(6.0, c.z);
  equal(2.0, c.w);
  equal(3.0, d.x);
  equal(7.0, d.y);
  equal(4.0, d.z);
  equal(8.0, d.w);
  equal(1.0, e.x);
  equal(5.0, e.y);
  equal(1.0, e.z);
  equal(5.0, e.w);
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

  var o = SIMD.float32x4(0.0, -0.0, 0.0, NaN);
  var p = SIMD.float32x4(-0.0, 0.0, NaN, 0.0);
  cmp = SIMD.float32x4.lessThan(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.float32x4.lessThanOrEqual(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.float32x4.equal(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.float32x4.notEqual(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.float32x4.greaterThanOrEqual(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.float32x4.greaterThan(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);
});

test('float32x4 select', function() {
  var m = SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var f = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  var s = SIMD.float32x4.select(m, t, f);
  equal(1.0, s.x);
  equal(2.0, s.y);
  equal(7.0, s.z);
  equal(8.0, s.w);
});

test('float32x4 bitselect', function() {
  var m = SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var f = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  var s = SIMD.float32x4.bitselect(m, t, f);
  equal(7.737125245533627e+25, s.x);
  equal(3.0, s.y);
  equal(7.0, s.z);
  equal(2.0, s.w);
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
  //equal(m.x, m2.x); // FIXME: These get NaN-canonicalized
  //equal(m.y, m2.y); // FIXME: These get NaN-canonicalized
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
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.float32x4.load(a, i);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(i+3, v.w);
  }
});

test('float32x4 overaligned load', function() {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i += 2) {
    var v = SIMD.float32x4.load(af, i / 2);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(i+3, v.w);
  }
});

test('float32x4 unaligned load', function() {
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
    var v = SIMD.float32x4.load(b, i * 4 + 1);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(i+3, v.w);
  }
});

test('float32x4 loadX', function() {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.float32x4.loadX(a, i);
    equal(i, v.x);
    equal(0.0, v.y);
    equal(0.0, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 overaligned loadX', function() {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i += 2) {
    var v = SIMD.float32x4.loadX(af, i / 2);
    equal(i, v.x);
    equal(0.0, v.y);
    equal(0.0, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 unaligned loadX', function() {
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
    var v = SIMD.float32x4.loadX(b, i * 4 + 1);
    equal(i, v.x);
    equal(0.0, v.y);
    equal(0.0, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 loadXY', function() {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.float32x4.loadXY(a, i);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(0.0, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 overaligned loadXY', function() {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i += 2) {
    var v = SIMD.float32x4.loadXY(af, i / 2);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(0.0, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 unaligned loadXY', function() {
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
    var v = SIMD.float32x4.loadXY(b, i * 4 + 1);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(0.0, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 loadXYZ', function() {
  var a = new Float32Array(9);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.float32x4.loadXYZ(a, i);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 overaligned loadXYZ', function() {
  var b = new ArrayBuffer(48);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i += 2) {
    var v = SIMD.float32x4.loadXYZ(af, i / 2);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 unaligned loadXYZ', function() {
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
    var v = SIMD.float32x4.loadXYZ(b, i * 4 + 1);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(0.0, v.w);
  }
});

test('float32x4 store', function() {
  var a = new Float32Array(12);
  SIMD.float32x4.store(a, 0, SIMD.float32x4(0, 1, 2, 3));
  SIMD.float32x4.store(a, 4, SIMD.float32x4(4, 5, 6, 7));
  SIMD.float32x4.store(a, 8, SIMD.float32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float32x4 overaligned store', function() {
  var b = new ArrayBuffer(56);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.float32x4.store(af, 0, SIMD.float32x4(0, 1, 2, 3));
  SIMD.float32x4.store(af, 2, SIMD.float32x4(4, 5, 6, 7));
  SIMD.float32x4.store(af, 4, SIMD.float32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float32x4 unaligned store', function() {
  var c = new Int8Array(48 + 1);
  SIMD.float32x4.store(c, 0 + 1, SIMD.float32x4(0, 1, 2, 3));
  SIMD.float32x4.store(c, 16 + 1, SIMD.float32x4(4, 5, 6, 7));
  SIMD.float32x4.store(c, 32 + 1, SIMD.float32x4(8, 9, 10, 11));

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

test('float32x4 storeX', function() {
  var a = new Float32Array(4);
  SIMD.float32x4.storeX(a, 0, SIMD.float32x4(0, -1, -1, -1));
  SIMD.float32x4.storeX(a, 1, SIMD.float32x4(1, -1, -1, -1));
  SIMD.float32x4.storeX(a, 2, SIMD.float32x4(2, -1, -1, -1));
  SIMD.float32x4.storeX(a, 3, SIMD.float32x4(3, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float32x4 overaligned storeX', function() {
  var b = new ArrayBuffer(24);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[1] = -2;
  a[3] = -2;
  SIMD.float32x4.storeX(af, 0, SIMD.float32x4(0, -1, -1, -1));
  SIMD.float32x4.storeX(af, 1, SIMD.float32x4(2, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 2 == 0) {
      equal(i, a[i]);
    } else {
      equal(-2, a[i]);
    }
  }
});

test('float32x4 unaligned storeX', function() {
  var c = new Int8Array(16 + 1);
  SIMD.float32x4.storeX(c, 0 + 1, SIMD.float32x4(0, -1, -1, -1));
  SIMD.float32x4.storeX(c, 4 + 1, SIMD.float32x4(1, -1, -1, -1));
  SIMD.float32x4.storeX(c, 8 + 1, SIMD.float32x4(2, -1, -1, -1));
  SIMD.float32x4.storeX(c, 12 + 1, SIMD.float32x4(3, -1, -1, -1));

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

test('float32x4 storeXY', function() {
  var a = new Float32Array(8);
  SIMD.float32x4.storeXY(a, 0, SIMD.float32x4(0, 1, -1, -1));
  SIMD.float32x4.storeXY(a, 2, SIMD.float32x4(2, 3, -1, -1));
  SIMD.float32x4.storeXY(a, 4, SIMD.float32x4(4, 5, -1, -1));
  SIMD.float32x4.storeXY(a, 6, SIMD.float32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float32x4 overaligned storeXY', function() {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.float32x4.storeXY(af, 0, SIMD.float32x4(0, 1, -1, -1));
  SIMD.float32x4.storeXY(af, 1, SIMD.float32x4(2, 3, -1, -1));
  SIMD.float32x4.storeXY(af, 2, SIMD.float32x4(4, 5, -1, -1));
  SIMD.float32x4.storeXY(af, 3, SIMD.float32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float32x4 unaligned storeXY', function() {
  var c = new Int8Array(32 + 1);
  SIMD.float32x4.storeXY(c, 0 + 1, SIMD.float32x4(0, 1, -1, -1));
  SIMD.float32x4.storeXY(c, 8 + 1, SIMD.float32x4(2, 3, -1, -1));
  SIMD.float32x4.storeXY(c, 16 + 1, SIMD.float32x4(4, 5, -1, -1));
  SIMD.float32x4.storeXY(c, 24 + 1, SIMD.float32x4(6, 7, -1, -1));

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

test('float32x4 storeXYZ', function() {
  var a = new Float32Array(9);
  SIMD.float32x4.storeXYZ(a, 0, SIMD.float32x4(0, 1, 2, -1));
  SIMD.float32x4.storeXYZ(a, 3, SIMD.float32x4(3, 4, 5, -1));
  SIMD.float32x4.storeXYZ(a, 6, SIMD.float32x4(6, 7, 8, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float32x4 overaligned storeXYZ', function() {
  var b = new ArrayBuffer(56);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[3] = -2;
  a[7] = -2;
  a[11] = -2;
  SIMD.float32x4.storeXYZ(af, 0, SIMD.float32x4(0, 1, 2, -1));
  SIMD.float32x4.storeXYZ(af, 2, SIMD.float32x4(4, 5, 6, -1));
  SIMD.float32x4.storeXYZ(af, 4, SIMD.float32x4(8, 9, 10, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 4 != 3) {
      equal(i, a[i]);
    } else {
      equal(-2, a[i]);
    }
  }
});

test('float32x4 unaligned storeXYZ', function() {
  var c = new Int8Array(36 + 1);
  SIMD.float32x4.storeXYZ(c, 0 + 1, SIMD.float32x4(0, 1, 2, -1));
  SIMD.float32x4.storeXYZ(c, 12 + 1, SIMD.float32x4(3, 4, 5, -1));
  SIMD.float32x4.storeXYZ(c, 24 + 1, SIMD.float32x4(6, 7, 8, -1));

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

test('float32x4 load exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.float32x4.load(a, -1);
  });
  throws(function () {
    var f = SIMD.float32x4.load(a, 5);
  });
  throws(function () {
    var f = SIMD.float32x4.load(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.float32x4.load(a, "a");
  });
});

test('float32x4 loadX exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.float32x4.loadX(a, -1);
  });
  throws(function () {
    var f = SIMD.float32x4.loadX(a, 8);
  });
  throws(function () {
    var f = SIMD.float32x4.loadX(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.float32x4.loadX(a, "a");
  });
});

test('float32x4 loadXY exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.float32x4.loadXY(a, -1);
  });
  throws(function () {
    var f = SIMD.float32x4.loadXY(a, 7);
  });
  throws(function () {
    var f = SIMD.float32x4.loadXY(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.float32x4.loadXY(a, "a");
  });
});

test('float32x4 loadXYZ exceptions', function () {
  var a = new Float32Array(8);
  throws(function () {
    var f = SIMD.float32x4.loadXYZ(a, -1);
  });
  throws(function () {
    var f = SIMD.float32x4.loadXYZ(a, 6);
  });
  throws(function () {
    var f = SIMD.float32x4.loadXYZ(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.float32x4.loadXYZ(a, "a");
  });
});

test('float32x4 store exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.float32x4.store(a, -1, f);
  });
  throws(function () {
    SIMD.float32x4.store(a, 5, f);
  });
  throws(function () {
    SIMD.float32x4.store(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.float32x4.store(a, "a", f);
  });
  throws(function () {
    SIMD.float32x4.store(a, 1, i);
  });
});

test('float32x4 storeX exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.float32x4.storeX(a, -1, f);
  });
  throws(function () {
    SIMD.float32x4.storeX(a, 8, f);
  });
  throws(function () {
    SIMD.float32x4.storeX(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.float32x4.storeX(a, "a", f);
  });
  throws(function () {
    SIMD.float32x4.storeX(a, 1, i);
  });
});

test('float32x4 storeXY exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.float32x4.storeXY(a, -1, f);
  });
  throws(function () {
    SIMD.float32x4.storeXY(a, 7, f);
  });
  throws(function () {
    SIMD.float32x4.storeXY(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.float32x4.storeXY(a, "a", f);
  });
  throws(function () {
    SIMD.float32x4.storeXY(a, 1, i);
  });
});

test('float32x4 storeXYZ exceptions', function () {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.float32x4.storeXYZ(a, -1, f);
  });
  throws(function () {
    SIMD.float32x4.storeXYZ(a, 6, f);
  });
  throws(function () {
    SIMD.float32x4.storeXYZ(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.float32x4.storeXYZ(a, "a", f);
  });
  throws(function () {
    SIMD.float32x4.storeXYZ(a, 1, i);
  });
});

test('float64x2 constructor', function() {
  equal('function', typeof SIMD.float64x2);
  var m = SIMD.float64x2(1.0, 2.0);
  equal(1.0, m.x);
  equal(2.0, m.y);

  m = SIMD.float64x2('hello', 'world');
  notEqual(m.x, m.x);
  notEqual(m.y, m.y);
});

test('float64x2 splat constructor', function() {
  equal('function', typeof SIMD.float64x2.splat);
  var m = SIMD.float64x2.splat(3.0);
  equal(3.0, m.x);
  equal(m.x, m.y);
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
  var m = SIMD.int32x4(0x00000000, 0x3ff00000, 0x00000000, 0x40000000);
  var n = SIMD.float64x2.fromInt32x4Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
});

test('float64x2 fromInt16x8Bits constructor', function() {
  var m = SIMD.int16x8(0x0000, 0x0000, 0x0000, 0x3ff0, 0x0000, 0x0000, 0x0000, 0x4000);
  var n = SIMD.float64x2.fromInt16x8Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
});

test('float64x2 fromInt8x16Bits constructor', function() {
  var m = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40);
  var n = SIMD.float64x2.fromInt8x16Bits(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
});

test('float64x2 scalar getters', function() {
  var m = SIMD.float64x2(1.0, 2.0);
  equal(1.0, m.x);
  equal(2.0, m.y);
});

test('float64x2 signMask getter', function() {
  var a = SIMD.float64x2(1.0, 2.0);
  equal(0x0, a.signMask);
  var b = SIMD.float64x2(-1.0, 2.0);
  equal(0x1, b.signMask);
  var c = SIMD.float64x2(1.0, -2.0);
  equal(0x2, c.signMask);
  var d = SIMD.float64x2(-1.0, -2.0);
  equal(0x3, d.signMask);
  var e = SIMD.float64x2(0.0, -0.0);
  equal(0x2, e.signMask);
  var f = SIMD.float64x2(-0.0, 0.0);
  equal(0x1, f.signMask);
});

test('float64x2 abs', function() {
  var a = SIMD.float64x2(-2.0, -1.0);
  var c = SIMD.float64x2.abs(a);
  equal(2.0, c.x);
  equal(1.0, c.y);
  c = SIMD.float64x2.abs(SIMD.float64x2(2.0, 1.0));
  equal(2.0, c.x);
  equal(1.0, c.y);

  var d0 = SIMD.float64x2(NaN, Infinity);
  var d1 = SIMD.float64x2(0.0, 1.0);
  var e0 = SIMD.float64x2.abs(d0);
  var e1 = SIMD.float64x2.abs(d1);
  var f0 = SIMD.float64x2(-NaN, -Infinity);
  var f1 = SIMD.float64x2(-0.0, -1.0);
  var g0 = SIMD.float64x2.abs(f0);
  var g1 = SIMD.float64x2.abs(f1);
  notEqual(e0.x, e0.x);
  equal(e0.y, Infinity);
  equal(e1.x, 0.0);
  equal(1 / e1.x, Infinity);
  equal(e1.y, 1.0);
  notEqual(g0.x, g0.x);
  equal(g0.y, Infinity);
  equal(g1.x, 0.0);
  equal(1 / g1.x, Infinity);
  equal(g1.y, 1.0);
});

test('float64x2 neg', function() {
  var a = SIMD.float64x2(-2.0, -1.0);
  var c = SIMD.float64x2.neg(a);
  equal(2.0, c.x);
  equal(1.0, c.y);
  c = SIMD.float64x2.neg(SIMD.float64x2(2.0, 1.0));
  equal(-2.0, c.x);
  equal(-1.0, c.y);

  var d0 = SIMD.float64x2(Infinity, -Infinity);
  var d1 = SIMD.float64x2(0.0, -0.0);
  var f0 = SIMD.float64x2.neg(d0);
  var f1 = SIMD.float64x2.neg(d1);
  equal(-Infinity, f0.x);
  equal(Infinity, f0.y);
  equal(0.0, f1.x);
  equal(-Infinity, 1 / f1.x);
  equal(0.0, f1.y);
  equal(Infinity, 1 / f1.y);

  var g = SIMD.float64x2.neg(SIMD.float64x2.splat(NaN));
  notEqual(g.x, g.x);
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

  var d0 = SIMD.float64x2(1.0, 0.0);
  var d1 = SIMD.float64x2(Infinity, NaN);
  var e0 = SIMD.float64x2(0.0, 0.0);
  var e1 = SIMD.float64x2(Infinity, 1.0);
  var f0 = SIMD.float64x2.div(d0, e0);
  var f1 = SIMD.float64x2.div(d1, e1);
  equal(f0.x, Infinity);
  notEqual(f0.y, f0.y);
  notEqual(f1.x, f1.x);
  notEqual(f1.y, f1.y);

  var g0 = SIMD.float64x2(1.0, 1.0);
  var g1 = SIMD.float64x2(-1.0, -1.0);
  var h0 = SIMD.float64x2(0.0, -0.0);
  var h1 = SIMD.float64x2(0.0, -0.0);
  var i0 = SIMD.float64x2.div(g0, h0);
  var i1 = SIMD.float64x2.div(g1, h1);
  equal(i0.x, Infinity);
  equal(i0.y, -Infinity);
  equal(i1.x, -Infinity);
  equal(i1.y, Infinity);
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

  var x = SIMD.float64x2(-0, 0);
  var y = SIMD.float64x2(0, -0);
  var z = SIMD.float64x2.min(x, y);
  equal(0, z.x);
  equal(1 / z.x, -Infinity);
  equal(0, z.y);
  equal(1 / z.y, -Infinity);
  x = SIMD.float64x2(NaN, 0);
  y = SIMD.float64x2(0, NaN);
  z = SIMD.float64x2.min(x, y);
  notEqual(z.x, z.x);
  notEqual(z.y, z.y);
});

test('float64x2 minNum', function() {
  var a = SIMD.float64x2(-20.0, 10.0);
  var lower = SIMD.float64x2(2.0, 1.0);
  var c = SIMD.float64x2.minNum(a, lower);
  equal(-20.0, c.x);
  equal(1.0, c.y);

  var x = SIMD.float64x2(-0, 0);
  var y = SIMD.float64x2(0, -0);
  var z = SIMD.float64x2.minNum(x, y);
  equal(0, z.x);
  equal(1 / z.x, -Infinity);
  equal(0, z.y);
  equal(1 / z.y, -Infinity);
  x = SIMD.float64x2(NaN, 0);
  y = SIMD.float64x2(0, NaN);
  z = SIMD.float64x2.minNum(x, y);
  equal(0, z.x);
  equal(0, z.y);
});

test('float64x2 min exceptions', function() {
  var ok    = SIMD.float64x2(1.0, 2.0);
  var notOk = 1;
  throws(function() {
    SIMD.float64x2.min(ok, notOk);
  });
  throws(function() {
    SIMD.float64x2.min(notOk, ok);
  });
});

test('float64x2 max', function() {
  var a = SIMD.float64x2(-20.0, 10.0);
  var upper = SIMD.float64x2(2.5, 5.0);
  var c = SIMD.float64x2.max(a, upper);
  equal(2.5, c.x);
  equal(10.0, c.y);

  var x = SIMD.float64x2(-0, 0);
  var y = SIMD.float64x2(0, -0);
  var z = SIMD.float64x2.max(x, y);
  equal(0, z.x);
  equal(1 / z.x, Infinity);
  equal(0, z.y);
  equal(1 / z.y, Infinity);
  x = SIMD.float64x2(NaN, 0);
  y = SIMD.float64x2(0, NaN);
  z = SIMD.float64x2.max(x, y);
  notEqual(z.x, z.x);
  notEqual(z.y, z.y);
});

test('float64x2 maxNum', function() {
  var a = SIMD.float64x2(-20.0, 10.0);
  var upper = SIMD.float64x2(2.5, 5.0);
  var c = SIMD.float64x2.maxNum(a, upper);
  equal(2.5, c.x);
  equal(10.0, c.y);

  var x = SIMD.float64x2(-0, 0);
  var y = SIMD.float64x2(0, -0);
  var z = SIMD.float64x2.maxNum(x, y);
  equal(0, z.x);
  equal(1 / z.x, Infinity);
  equal(0, z.y);
  equal(1 / z.y, Infinity);
  x = SIMD.float64x2(NaN, 0);
  y = SIMD.float64x2(0, NaN);
  z = SIMD.float64x2.maxNum(x, y);
  equal(0, z.x);
  equal(0, z.y);
});

test('float64x2 max exceptions', function() {
  var ok    = SIMD.float64x2(1.0, 2.0);
  var notOk = 1;
  throws(function() {
    SIMD.float64x2.max(ok, notOk);
  });
  throws(function() {
    SIMD.float64x2.max(notOk, ok);
  });
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

test('float64x2 sqrt', function() {
  var a = SIMD.float64x2(16.0, 9.0);
  var c = SIMD.float64x2.sqrt(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
});

test('float64x2 swizzle', function() {
  var a  = SIMD.float64x2(1.0, 2.0);
  var xx = SIMD.float64x2.swizzle(a, 0, 0);
  var xy = SIMD.float64x2.swizzle(a, 0, 1);
  var yx = SIMD.float64x2.swizzle(a, 1, 0);
  var yy = SIMD.float64x2.swizzle(a, 1, 1);
  equal(1.0, xx.x);
  equal(1.0, xx.y);
  equal(1.0, xy.x);
  equal(2.0, xy.y);
  equal(2.0, yx.x);
  equal(1.0, yx.y);
  equal(2.0, yy.x);
  equal(2.0, yy.y);
});

test('float64x2 shuffle', function() {
  var a  = SIMD.float64x2(1.0, 2.0);
  var b  = SIMD.float64x2(3.0, 4.0);
  var xx = SIMD.float64x2.shuffle(a, b, 0, 2);
  var xy = SIMD.float64x2.shuffle(a, b, 0, 3);
  var yx = SIMD.float64x2.shuffle(a, b, 1, 0);
  var yy = SIMD.float64x2.shuffle(a, b, 1, 3);
  equal(1.0, xx.x);
  equal(3.0, xx.y);
  equal(1.0, xy.x);
  equal(4.0, xy.y);
  equal(2.0, yx.x);
  equal(1.0, yx.y);
  equal(2.0, yy.x);
  equal(4.0, yy.y);

  var c = SIMD.float64x2.shuffle(a, b, 1, 0);
  var d = SIMD.float64x2.shuffle(a, b, 3, 2);
  var e = SIMD.float64x2.shuffle(a, b, 0, 1);
  var f = SIMD.float64x2.shuffle(a, b, 0, 2);
  equal(2.0, c.x);
  equal(1.0, c.y);
  equal(4.0, d.x);
  equal(3.0, d.y);
  equal(1.0, e.x);
  equal(2.0, e.y);
  equal(1.0, f.x);
  equal(3.0, f.y);
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

  var o = SIMD.float64x2(0.0, -0.0);
  var p = SIMD.float64x2(-0.0, 0.0);
  var q = SIMD.float64x2(0.0, NaN);
  var r = SIMD.float64x2(NaN, 0.0);
  cmp = SIMD.float64x2.lessThan(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  cmp = SIMD.float64x2.lessThan(q, r);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);

  cmp = SIMD.float64x2.lessThanOrEqual(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  cmp = SIMD.float64x2.lessThanOrEqual(q, r);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);

  cmp = SIMD.float64x2.equal(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  cmp = SIMD.float64x2.equal(q, r);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);

  cmp = SIMD.float64x2.notEqual(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  cmp = SIMD.float64x2.notEqual(q, r);
  equal(-1, cmp.x);
  equal(-1, cmp.y);

  cmp = SIMD.float64x2.greaterThanOrEqual(o, p);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  cmp = SIMD.float64x2.greaterThanOrEqual(q, r);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);

  cmp = SIMD.float64x2.greaterThan(o, p);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  cmp = SIMD.float64x2.greaterThan(q, r);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
});

test('float64x2 select', function() {
  var m = SIMD.int32x4(0xaaaaaaaa, 0x55555555);
  var t = SIMD.float64x2(1.0, 2.0);
  var f = SIMD.float64x2(3.0, 4.0);
  var s = SIMD.float64x2.select(m, t, f);
  equal(1.0, s.x);
  equal(4.0, s.y);
});

test('float64x2 bitselect', function() {
  var m = SIMD.int32x4(0xaaaaaaaa, 0x55555555);
  var t = SIMD.float64x2(1.0, 2.0);
  var f = SIMD.float64x2(3.0, 4.0);
  var s = SIMD.float64x2.bitselect(m, t, f);
  equal(7.475396213323176e-206, s.x);
  equal(4.0, s.y);
});

test('float64x2 load', function() {
  var a = new Float64Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.float64x2.load(a, i);
    equal(i, v.x);
    equal(i+1, v.y);
  }
});

test('float64x2 unaligned load', function() {
  var a = new Float64Array(8);
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
    var v = SIMD.float64x2.load(b, i * 8 + 1);
    equal(i, v.x);
    equal(i+1, v.y);
  }
});

test('float64x2 loadX', function() {
  var a = new Float64Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.float64x2.loadX(a, i);
    equal(i, v.x);
    equal(0.0, v.y);
  }
});

test('float64x2 unaligned loadX', function() {
  var a = new Float64Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Copy the values unaligned.
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.float64x2.loadX(b, i * 8 + 1);
    equal(i, v.x);
    equal(0.0, v.y);
  }
});

test('float64x2 store', function() {
  var a = new Float64Array(6);
  SIMD.float64x2.store(a, 0, SIMD.float64x2(0, 1));
  SIMD.float64x2.store(a, 2, SIMD.float64x2(2, 3));
  SIMD.float64x2.store(a, 4, SIMD.float64x2(4, 5));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float64x2 unaligned store', function() {
  var c = new Int8Array(48 + 1);
  SIMD.float64x2.store(c, 0 + 1, SIMD.float64x2(0, 1));
  SIMD.float64x2.store(c, 16 + 1, SIMD.float64x2(2, 3));
  SIMD.float64x2.store(c, 32 + 1, SIMD.float64x2(4, 5));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float64Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float64x2 storeX', function() {
  var a = new Float64Array(4);
  SIMD.float64x2.storeX(a, 0, SIMD.float64x2(0, -1));
  SIMD.float64x2.storeX(a, 1, SIMD.float64x2(1, -1));
  SIMD.float64x2.storeX(a, 2, SIMD.float64x2(2, -1));
  SIMD.float64x2.storeX(a, 3, SIMD.float64x2(3, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float64x2 unaligned storeX', function() {
  var c = new Int8Array(32 + 1);
  SIMD.float64x2.storeX(c, 0 + 1, SIMD.float64x2(0, -1));
  SIMD.float64x2.storeX(c, 8 + 1, SIMD.float64x2(1, -1));
  SIMD.float64x2.storeX(c, 16 + 1, SIMD.float64x2(2, -1));
  SIMD.float64x2.storeX(c, 24 + 1, SIMD.float64x2(3, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float64Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('float64x2 load exceptions', function () {
  var a = new Float64Array(8);
  throws(function () {
    var f = SIMD.float64x2.load(a, -1);
  });
  throws(function () {
    var f = SIMD.float64x2.load(a, 7);
  });
  throws(function () {
    var f = SIMD.float64x2.load(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.float64x2.load(a, "a");
  });
});

test('float64x2 loadX exceptions', function () {
  var a = new Float64Array(8);
  throws(function () {
    var f = SIMD.float64x2.loadX(a, -1);
  });
  throws(function () {
    var f = SIMD.float64x2.loadX(a, 8);
  });
  throws(function () {
    var f = SIMD.float64x2.loadX(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.float64x2.loadX(a, "a");
  });
});

test('float64x2 store exceptions', function () {
  var a = new Float64Array(8);
  var f = SIMD.float64x2(1, 2);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.float64x2.store(a, -1, f);
  });
  throws(function () {
    SIMD.float64x2.store(a, 7, f);
  });
  throws(function () {
    SIMD.float64x2.store(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.float64x2.store(a, "a", f);
  });
  throws(function () {
    SIMD.float64x2.store(a, 1, i);
  });
});

test('float64x2 storeX exceptions', function () {
  var a = new Float64Array(8);
  var f = SIMD.float64x2(1, 2);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.float64x2.storeX(a, -1, f);
  });
  throws(function () {
    SIMD.float64x2.storeX(a, 8, f);
  });
  throws(function () {
    SIMD.float64x2.storeX(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.float64x2.storeX(a, "a", f);
  });
  throws(function () {
    SIMD.float64x2.storeX(a, 1, i);
  });
});

test('int32x4 fromFloat32x4 constructor', function() {
  var m = SIMD.float32x4(1.0, 2.2, 3.6, 4.8);
  var n = SIMD.int32x4.fromFloat32x4(m);
  equal(1, n.x);
  equal(2, n.y);
  equal(3, n.z);
  equal(4, n.w);

  m = SIMD.float32x4(0.0, -0.0, -1.2, -3.8);
  n = SIMD.int32x4.fromFloat32x4(m);
  equal(0, n.x);
  equal(0, n.y);
  equal(-1, n.z);
  equal(-3, n.w);
});

test('int32x4 fromFloat64x2 constructor', function() {
  var m = SIMD.float64x2(1.0, 2.2);
  var n = SIMD.int32x4.fromFloat64x2(m);
  equal(1, n.x);
  equal(2, n.y);
  equal(0, n.z);
  equal(0, n.w);

  m = SIMD.float64x2(3.6, 4.8);
  n = SIMD.int32x4.fromFloat64x2(m);
  equal(3, n.x);
  equal(4, n.y);
  equal(0, n.z);
  equal(0, n.w);

  m = SIMD.float64x2(0.0, -0.0);
  n = SIMD.int32x4.fromFloat64x2(m);
  equal(0, n.x);
  equal(0, n.y);
  equal(0, n.z);
  equal(0, n.w);

  m = SIMD.float64x2(-1.2, -3.8);
  n = SIMD.int32x4.fromFloat64x2(m);
  equal(-1, n.x);
  equal(-3, n.y);
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

test('int32x4 shuffle', function() {
  var a    = SIMD.int32x4(1, 2, 3, 4);
  var b    = SIMD.int32x4(5, 6, 7, 8);
  var xyxy = SIMD.int32x4.shuffle(a, b, 0, 1, 4, 5);
  var zwzw = SIMD.int32x4.shuffle(a, b, 2, 3, 6, 7);
  var xxxx = SIMD.int32x4.shuffle(a, b, 0, 0, 4, 4);
  equal(1, xyxy.x);
  equal(2, xyxy.y);
  equal(5, xyxy.z);
  equal(6, xyxy.w);
  equal(3, zwzw.x);
  equal(4, zwzw.y);
  equal(7, zwzw.z);
  equal(8, zwzw.w);
  equal(1, xxxx.x);
  equal(1, xxxx.y);
  equal(5, xxxx.z);
  equal(5, xxxx.w);

  var c = SIMD.int32x4.shuffle(a, b, 0, 4, 5, 1);
  var d = SIMD.int32x4.shuffle(a, b, 2, 6, 3, 7);
  var e = SIMD.int32x4.shuffle(a, b, 0, 4, 0, 4);
  equal(1, c.x);
  equal(5, c.y);
  equal(6, c.z);
  equal(2, c.w);
  equal(3, d.x);
  equal(7, d.y);
  equal(4, d.z);
  equal(8, d.w);
  equal(1, e.x);
  equal(5, e.y);
  equal(1, e.z);
  equal(5, e.w);
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
  equal(true, m.flagX);
  equal(true, m.flagY);
  equal(true, m.flagZ);
  equal(true, m.flagW);
  equal(false, n.flagX);
  equal(false, n.flagY);
  equal(false, n.flagZ);
  equal(false, n.flagW);
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
  var m = SIMD.int32x4(16, -32, 64, -128);
  m = SIMD.int32x4.neg(m);
  equal(-16, m.x);
  equal(32, m.y);
  equal(-64, m.z);
  equal(128, m.w);

  var n = SIMD.int32x4(0, 0x7fffffff, -1, 0x80000000);
  n = SIMD.int32x4.neg(n);
  equal(0, n.x);
  equal(-2147483647, n.y);
  equal(1, n.z);
  equal(-2147483648, n.w);
});

test('int32x4 signMask getter', function() {
  var a = SIMD.int32x4(0x80000000, 0x7000000, 0xFFFFFFFF, 0x0);
  equal(0x5, a.signMask);
  var b = SIMD.int32x4(0x0, 0x0, 0x0, 0x0);
  equal(0x0, b.signMask);
  var c = SIMD.int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF);
  equal(0xf, c.signMask);
});

test('int32x4 vector getters', function() {
  var a = SIMD.int32x4(4, 3, 2, 1);
  var xxxx = SIMD.int32x4.swizzle(a, 0, 0, 0, 0);
  var yyyy = SIMD.int32x4.swizzle(a, 1, 1, 1, 1);
  var zzzz = SIMD.int32x4.swizzle(a, 2, 2, 2, 2);
  var wwww = SIMD.int32x4.swizzle(a, 3, 3, 3, 3);
  var wzyx = SIMD.int32x4.swizzle(a, 3, 2, 1, 0);
  equal(4, xxxx.x);
  equal(4, xxxx.y);
  equal(4, xxxx.z);
  equal(4, xxxx.w);
  equal(3, yyyy.x);
  equal(3, yyyy.y);
  equal(3, yyyy.z);
  equal(3, yyyy.w);
  equal(2, zzzz.x);
  equal(2, zzzz.y);
  equal(2, zzzz.z);
  equal(2, zzzz.w);
  equal(1, wwww.x);
  equal(1, wwww.y);
  equal(1, wwww.z);
  equal(1, wwww.w);
  equal(1, wzyx.x);
  equal(2, wzyx.y);
  equal(3, wzyx.z);
  equal(4, wzyx.w);
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

test('int32x4 comparisons', function() {
  var m = SIMD.int32x4(1000, 2000, 100, 1);
  var n = SIMD.int32x4(-2000, 2000, 1, 100);
  var cmp;
  cmp = SIMD.int32x4.lessThan(m, n);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(0x0, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.int32x4.lessThanOrEqual(m, n);
  equal(0x0, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.int32x4.equal(m, n);
  equal(0x0, cmp.x);
  equal(-1, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.int32x4.notEqual(m, n);
  equal(-1, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(-1, cmp.w);

  cmp = SIMD.int32x4.greaterThan(m, n);
  equal(-1, cmp.x);
  equal(0x0, cmp.y);
  equal(-1, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.int32x4.greaterThanOrEqual(m, n);
  equal(-1, cmp.x);
  equal(-1, cmp.y);
  equal(-1, cmp.z);
  equal(0x0, cmp.w);
});

test('int32x4 shiftLeftByScalar', function() {
  var a = SIMD.int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.int32x4.shiftLeftByScalar(a, 1);
  equal(b.x, 0xfffffffe|0);
  equal(b.y, 0xfffffffe|0);
  equal(b.z, 0x00000002);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftLeftByScalar(a, 2);
  equal(b.x, 0xfffffffc|0);
  equal(b.y, 0xfffffffc|0);
  equal(b.z, 0x00000004);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftLeftByScalar(a, 30);
  equal(b.x, 0xc0000000|0);
  equal(b.y, 0xc0000000|0);
  equal(b.z, 0x40000000);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftLeftByScalar(a, 31);
  equal(b.x, 0x80000000|0);
  equal(b.y, 0x80000000|0);
  equal(b.z, 0x80000000|0);
  equal(b.w, 0x0);
});

test('int32x4 shiftRightArithmeticByScalar', function() {
  var a = SIMD.int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 1);
  equal(b.x, 0xffffffff|0);
  equal(b.y, 0x3fffffff);
  equal(b.z, 0x00000000);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 2);
  equal(b.x, 0xffffffff|0);
  equal(b.y, 0x1fffffff);
  equal(b.z, 0x00000000);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 30);
  equal(b.x, 0xffffffff|0);
  equal(b.y, 0x00000001);
  equal(b.z, 0x00000000);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 31);
  equal(b.x, 0xffffffff|0);
  equal(b.y, 0x00000000);
  equal(b.z, 0x00000000);
  equal(b.w, 0x00000000);
});

test('int32x4 shiftRightLogicalByScalar', function() {
  var a = SIMD.int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 1);
  equal(b.x, 0x7fffffff);
  equal(b.y, 0x3fffffff);
  equal(b.z, 0x00000000);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 2);
  equal(b.x, 0x3fffffff);
  equal(b.y, 0x1fffffff);
  equal(b.z, 0x00000000);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 30);
  equal(b.x, 0x00000003);
  equal(b.y, 0x00000001);
  equal(b.z, 0x00000000);
  equal(b.w, 0x00000000);
  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 31);
  equal(b.x, 0x00000001);
  equal(b.y, 0x00000000);
  equal(b.z, 0x00000000);
  equal(b.w, 0x00000000);
});

test('int32x4 select', function() {
  var m = SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.int32x4(1, 2, 3, 4);
  var f = SIMD.int32x4(5, 6, 7, 8);
  var s = SIMD.int32x4.select(m, t, f);
  equal(1, s.x);
  equal(2, s.y);
  equal(7, s.z);
  equal(8, s.w);
});

test('int32x4 bitselect', function() {
  var m = SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.int32x4(1, 2, 3, 4);
  var f = SIMD.int32x4(5, 6, 7, 8);
  var s = SIMD.int32x4.bitselect(m, t, f);
  equal(5, s.x);
  equal(6, s.y);
  equal(3, s.z);
  equal(12, s.w);
});

test('int32x4 load', function() {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.int32x4.load(a, i);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(i+3, v.w);
  }
});

test('int32x4 overaligned load', function() {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i += 2) {
    var v = SIMD.int32x4.load(af, i / 2);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(i+3, v.w);
  }
});

test('int32x4 unaligned load', function() {
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
    var v = SIMD.int32x4.load(b, i * 4 + 1);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(i+3, v.w);
  }
});

test('int32x4 loadX', function() {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length ; i++) {
    var v = SIMD.int32x4.loadX(a, i);
    equal(i, v.x);
    equal(0, v.y);
    equal(0, v.z);
    equal(0, v.w);
  }
});

test('int32x4 overaligned loadX', function() {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Int32Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.int32x4.loadX(af, i);
    equal(i, v.x);
    equal(0, v.y);
    equal(0, v.z);
    equal(0, v.w);
  }
});

test('int32x4 unaligned loadX', function() {
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
    var v = SIMD.int32x4.loadX(b, i * 4 + 1);
    equal(i, v.x);
    equal(0, v.y);
    equal(0, v.z);
    equal(0, v.w);
  }
});

test('int32x4 loadXY', function() {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.int32x4.loadXY(a, i);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(0, v.z);
    equal(0, v.w);
  }
});

test('int32x4 overaligned loadXY', function() {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i += 2) {
    var v = SIMD.int32x4.loadXY(af, i / 2);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(0, v.z);
    equal(0, v.w);
  }
});

test('int32x4 unaligned loadXY', function() {
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
    var v = SIMD.int32x4.loadXY(b, i * 4 + 1);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(0, v.z);
    equal(0, v.w);
  }
});

test('int32x4 loadXYZ', function() {
  var a = new Int32Array(9);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.int32x4.loadXYZ(a, i);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(0, v.w);
  }
});

test('int32x4 overaligned loadXYZ', function() {
  var b = new ArrayBuffer(48);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i += 2) {
    var v = SIMD.int32x4.loadXYZ(af, i / 2);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(0, v.w);
  }
});

test('int32x4 loadXYZ', function() {
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
    var v = SIMD.int32x4.loadXYZ(b, i * 4 + 1);
    equal(i, v.x);
    equal(i+1, v.y);
    equal(i+2, v.z);
    equal(0, v.w);
  }
});

test('int32x4 store', function() {
  var a = new Int32Array(12);
  SIMD.int32x4.store(a, 0, SIMD.int32x4(0, 1, 2, 3));
  SIMD.int32x4.store(a, 4, SIMD.int32x4(4, 5, 6, 7));
  SIMD.int32x4.store(a, 8, SIMD.int32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('int32x4 overaligned store', function() {
  var b = new ArrayBuffer(56);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.int32x4.store(af, 0, SIMD.int32x4(0, 1, 2, 3));
  SIMD.int32x4.store(af, 2, SIMD.int32x4(4, 5, 6, 7));
  SIMD.int32x4.store(af, 4, SIMD.int32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('int32x4 unaligned store', function() {
  var c = new Int8Array(48 + 1);
  SIMD.int32x4.store(c, 0 + 1, SIMD.int32x4(0, 1, 2, 3));
  SIMD.int32x4.store(c, 16 + 1, SIMD.int32x4(4, 5, 6, 7));
  SIMD.int32x4.store(c, 32 + 1, SIMD.int32x4(8, 9, 10, 11));

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

test('int32x4 storeX', function() {
  var a = new Int32Array(4);
  SIMD.int32x4.storeX(a, 0, SIMD.int32x4(0, -1, -1, -1));
  SIMD.int32x4.storeX(a, 1, SIMD.int32x4(1, -1, -1, -1));
  SIMD.int32x4.storeX(a, 2, SIMD.int32x4(2, -1, -1, -1));
  SIMD.int32x4.storeX(a, 3, SIMD.int32x4(3, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('int32x4 overaligned storeX', function() {
  var b = new ArrayBuffer(24);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[1] = -2;
  a[3] = -2;
  SIMD.int32x4.storeX(af, 0, SIMD.int32x4(0, -1, -1, -1));
  SIMD.int32x4.storeX(af, 1, SIMD.int32x4(2, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 2 == 0) {
      equal(i, a[i]);
    } else {
      equal(-2, a[i]);
    }
  }
});

test('int32x4 unaligned storeX', function() {
  var c = new Int8Array(16 + 1);
  SIMD.int32x4.storeX(c, 0 + 1, SIMD.int32x4(0, -1, -1, -1));
  SIMD.int32x4.storeX(c, 4 + 1, SIMD.int32x4(1, -1, -1, -1));
  SIMD.int32x4.storeX(c, 8 + 1, SIMD.int32x4(2, -1, -1, -1));
  SIMD.int32x4.storeX(c, 12 + 1, SIMD.int32x4(3, -1, -1, -1));

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

test('int32x4 storeXY', function() {
  var a = new Int32Array(8);
  SIMD.int32x4.storeXY(a, 0, SIMD.int32x4(0, 1, -1, -1));
  SIMD.int32x4.storeXY(a, 2, SIMD.int32x4(2, 3, -1, -1));
  SIMD.int32x4.storeXY(a, 4, SIMD.int32x4(4, 5, -1, -1));
  SIMD.int32x4.storeXY(a, 6, SIMD.int32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('int32x4 storeXY', function() {
  var a = new Int32Array(8);
  var af = new Float64Array(a.buffer);
  SIMD.int32x4.storeXY(af, 0, SIMD.int32x4(0, 1, -1, -1));
  SIMD.int32x4.storeXY(af, 1, SIMD.int32x4(2, 3, -1, -1));
  SIMD.int32x4.storeXY(af, 2, SIMD.int32x4(4, 5, -1, -1));
  SIMD.int32x4.storeXY(af, 3, SIMD.int32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('int32x4 unaligned storeXY', function() {
  var c = new Int8Array(32 + 1);
  SIMD.int32x4.storeXY(c, 0 + 1, SIMD.int32x4(0, 1, -1, -1));
  SIMD.int32x4.storeXY(c, 8 + 1, SIMD.int32x4(2, 3, -1, -1));
  SIMD.int32x4.storeXY(c, 16 + 1, SIMD.int32x4(4, 5, -1, -1));
  SIMD.int32x4.storeXY(c, 24 + 1, SIMD.int32x4(6, 7, -1, -1));

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

test('int32x4 storeXYZ', function() {
  var a = new Int32Array(9);
  SIMD.int32x4.storeXYZ(a, 0, SIMD.int32x4(0, 1, 2, -1));
  SIMD.int32x4.storeXYZ(a, 3, SIMD.int32x4(3, 4, 5, -1));
  SIMD.int32x4.storeXYZ(a, 6, SIMD.int32x4(6, 7, 8, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }
});

test('int32x4 overaligned storeXYZ', function() {
  var b = new ArrayBuffer(56);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[3] = -2;
  a[7] = -2;
  a[11] = -2;
  SIMD.int32x4.storeXYZ(af, 0, SIMD.int32x4(0, 1, 2, -1));
  SIMD.int32x4.storeXYZ(af, 2, SIMD.int32x4(4, 5, 6, -1));
  SIMD.int32x4.storeXYZ(af, 4, SIMD.int32x4(8, 9, 10, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 4 != 3) {
      equal(i, a[i]);
    } else {
      equal(-2, a[i]);
    }
  }
});

test('int32x4 unaligned storeXYZ', function() {
  var c = new Int8Array(36 + 1);
  SIMD.int32x4.storeXYZ(c, 0 + 1, SIMD.int32x4(0, 1, 2, -1));
  SIMD.int32x4.storeXYZ(c, 12 + 1, SIMD.int32x4(3, 4, 5, -1));
  SIMD.int32x4.storeXYZ(c, 24 + 1, SIMD.int32x4(6, 7, 8, -1));

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

test('int32x4 load exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.int32x4.load(a, -1);
  });
  throws(function () {
    var f = SIMD.int32x4.load(a, 5);
  });
  throws(function () {
    var f = SIMD.int32x4.load(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.int32x4.load(a, "a");
  });
});

test('int32x4 loadX exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.int32x4.loadX(a, -1);
  });
  throws(function () {
    var f = SIMD.int32x4.loadX(a, 8);
  });
  throws(function () {
    var f = SIMD.int32x4.loadX(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.int32x4.loadX(a, "a");
  });
});

test('int32x4 loadXY exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.int32x4.loadXY(a, -1);
  });
  throws(function () {
    var f = SIMD.int32x4.loadXY(a, 7);
  });
  throws(function () {
    var f = SIMD.int32x4.loadXY(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.int32x4.loadXY(a, "a");
  });
});

test('int32x4 loadXYZ exceptions', function () {
  var a = new Int32Array(8);
  throws(function () {
    var f = SIMD.int32x4.loadXYZ(a, -1);
  });
  throws(function () {
    var f = SIMD.int32x4.loadXYZ(a, 6);
  });
  throws(function () {
    var f = SIMD.int32x4.loadXYZ(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.int32x4.loadXYZ(a, "a");
  });
});

test('int32x4 store exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.int32x4.store(a, -1, i);
  });
  throws(function () {
    SIMD.int32x4.store(a, 5, i);
  });
  throws(function () {
    SIMD.int32x4.store(a.buffer, 1, i);
  });
  throws(function () {
    SIMD.int32x4.store(a, "a", i);
  });
  throws(function () {
    SIMD.int32x4.store(a, 1, f);
  });
});

test('int32x4 storeX exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.int32x4.storeX(a, -1, i);
  });
  throws(function () {
    SIMD.int32x4.storeX(a, 8, i);
  });
  throws(function () {
    SIMD.int32x4.storeX(a.buffer, 1, i);
  });
  throws(function () {
    SIMD.int32x4.storeX(a, "a", i);
  });
  throws(function () {
    SIMD.int32x4.storeX(a, 1, f);
  });
});

test('int32x4 storeXY exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.int32x4.storeXY(a, -1, i);
  });
  throws(function () {
    SIMD.int32x4.storeXY(a, 7, i);
  });
  throws(function () {
    SIMD.int32x4.storeXY(a.buffer, 1, i);
  });
  throws(function () {
    SIMD.int32x4.storeXY(a, "a", i);
  });
  throws(function () {
    SIMD.int32x4.storeXY(a, 1, f);
  });
});

test('int32x4 storeXYZ exceptions', function () {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.int32x4.storeXYZ(a, -1, i);
  });
  throws(function () {
    SIMD.int32x4.storeXYZ(a, 6, i);
  });
  throws(function () {
    SIMD.int32x4.storeXYZ(a.buffer, 1, i);
  });
  throws(function () {
    SIMD.int32x4.storeXYZ(a, "a", i);
  });
  throws(function () {
    SIMD.int32x4.storeXYZ(a, 1, f);
  });
});

test('int16x8 fromFloat32x4Bits constructor', function() {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.int16x8.fromFloat32x4Bits(m);
  equal(0x0000, n.s0);
  equal(0x3F80, n.s1);
  equal(0x0000, n.s2);
  equal(0x4000, n.s3);
  equal(0x0000, n.s4);
  equal(0x4040, n.s5);
  equal(0x0000, n.s6);
  equal(0x4080, n.s7);
});

test('int16x8 and', function() {
  var m = SIMD.int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 43690, 43690, 0xAAAA, 0xAAAA);
  var n = SIMD.int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  equal(-21846, m.s0);
  equal(-21846, m.s1);
  equal(-21846, m.s2);
  equal(-21846, m.s3);
  equal(-21846, m.s4);
  equal(-21846, m.s5);
  equal(-21846, m.s6);
  equal(-21846, m.s7);
  equal(0x5555, n.s0);
  equal(0x5555, n.s1);
  equal(0x5555, n.s2);
  equal(0x5555, n.s3);
  equal(0x5555, n.s4);
  equal(0x5555, n.s5);
  equal(0x5555, n.s6);
  equal(0x5555, n.s7);
  var o = SIMD.int16x8.and(m,n);  // and
  equal(0x0, o.s0);
  equal(0x0, o.s1);
  equal(0x0, o.s2);
  equal(0x0, o.s3);
  equal(0x0, o.s4);
  equal(0x0, o.s5);
  equal(0x0, o.s6);
  equal(0x0, o.s7);
});

test('int16x8 or', function() {
  var m = SIMD.int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA);
  var n = SIMD.int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  var o = SIMD.int16x8.or(m,n);  // or
  equal(-1, o.s0);
  equal(-1, o.s1);
  equal(-1, o.s2);
  equal(-1, o.s3);
  equal(-1, o.s4);
  equal(-1, o.s5);
  equal(-1, o.s6);
  equal(-1, o.s7);
});

test('int16x8 xor', function() {
  var m = SIMD.int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA);
  var n = SIMD.int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  var o = SIMD.int16x8.xor(m,n);  // xor
  equal(-1, o.s0);
  equal(-1, o.s1);
  equal(-1, o.s2);
  equal(-1, o.s3);
  equal(-1, o.s4);
  equal(-1, o.s5);
  equal(-1, o.s6);
  equal(-1, o.s7);
  o = SIMD.int16x8.xor(m,m);  // xor
  equal(0x0, o.s0);
  equal(0x0, o.s1);
  equal(0x0, o.s2);
  equal(0x0, o.s3);
  equal(0x0, o.s4);
  equal(0x0, o.s5);
  equal(0x0, o.s6);
  equal(0x0, o.s7);
});

test('int16x8 neg', function() {
  var m = SIMD.int16x8(16, -32, 64, -128, 256, -512, 1024, -2048);
  m = SIMD.int16x8.neg(m);
  equal(-16, m.s0);
  equal(32, m.s1);
  equal(-64, m.s2);
  equal(128, m.s3);
  equal(-256, m.s4);
  equal(512, m.s5);
  equal(-1024, m.s6);
  equal(2048, m.s7);

  var n = SIMD.int16x8(0, 0, 0x7fff, 0xffff, -1, -1, 0x8000, 0x0000);
  n = SIMD.int16x8.neg(n);
  equal(0, n.s0);
  equal(0, n.s1);
  equal(-32767, n.s2);
  equal(1, n.s3);
  equal(1, n.s4);
  equal(1, n.s5);
  equal(-32768, n.s6);
  equal(0, n.s7);
});

test('int16x8 signMask getter', function() {
  var a = SIMD.int16x8(0x8000, 0x0000, 0x700, 0x0000, 0xFFFF, 0xFFFF, 0x0, 0x0);
  equal(0x31, a.signMask);
  var b = SIMD.int16x8(0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0);
  equal(0x0, b.signMask);
  var c = SIMD.int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF);
  equal(0xff, c.signMask);
});


test('int16x8 add', function() {
  var a = SIMD.int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x7fff, 0xffff, 0x0, 0x0);
  var b = SIMD.int16x8(0x0, 0x1, 0xFFFF, 0xFFFF, 0x0, 0x1, 0xFFFF, 0xFFFF);
  var c = SIMD.int16x8.add(a, b);
  equal(-1, c.s0);
  equal(0, c.s1);
  equal(-2, c.s2);
  equal(-2, c.s3);
  equal(0x7fff, c.s4);
  equal(0, c.s5);
  equal(-1, c.s6);
  equal(-1, c.s7);
});

test('int16x8 sub', function() {
  var a = SIMD.int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0x0, 0x0);
  var b = SIMD.int16x8(0x0, 0x1, 0xFFFF, 0x0FFFF, 0x0, 0x1, 0xFFFF, 0xFFFF);
  var c = SIMD.int16x8.sub(a, b);
  equal(-1, c.s0);
  equal(-2, c.s1);
  equal(0, c.s2);
  equal(0, c.s3);
  equal(-32768, c.s4);
  equal(-1, c.s5);
  equal(1, c.s6);
  equal(1, c.s7);
});

test('int16x8 mul', function() {
  var a = SIMD.int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0x0, 0x0);
  var b = SIMD.int16x8(0x0, 0x1, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0xFFFF, 0xFFFF);
  var c = SIMD.int16x8.mul(a, b);
  equal(0, c.s0);
  equal(-1, c.s1);
  equal(1, c.s2);
  equal(1, c.s3);
  equal(0, c.s4);
  equal(0, c.s5);
  equal(0, c.s6);
  equal(0, c.s7);
});

test('int16x8 comparisons', function() {
  var m = SIMD.int16x8(1000, 2000, 100, 1, -1000, -2000, -100, 1);
  var n = SIMD.int16x8(-2000, 2000, 1, 100, 2000, -2000, -1, -100);
  var cmp;
  cmp = SIMD.int16x8.lessThan(m, n);
  equal(0x0, cmp.s0);
  equal(0x0, cmp.s1);
  equal(0x0, cmp.s2);
  equal(-1, cmp.s3);
  equal(-1, cmp.s4);
  equal(0x0, cmp.s5);
  equal(-1, cmp.s6);
  equal(0x0, cmp.s7);

  cmp = SIMD.int16x8.equal(m, n);
  equal(0x0, cmp.s0);
  equal(-1, cmp.s1);
  equal(0x0, cmp.s2);
  equal(0x0, cmp.s3);
  equal(0x0, cmp.s4);
  equal(-1, cmp.s5);
  equal(0x0, cmp.s6);
  equal(0x0, cmp.s7);

  cmp = SIMD.int16x8.greaterThan(m, n);
  equal(-1, cmp.s0);
  equal(0, cmp.s1);
  equal(-1, cmp.s2);
  equal(0, cmp.s3);
  equal(0, cmp.s4);
  equal(0, cmp.s5);
  equal(0, cmp.s6);
  equal(-1, cmp.s7);
});

test('int16x8 shiftLeftByScalar', function() {
  var a = SIMD.int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.int16x8.shiftLeftByScalar(a, 1);
  equal(b.s0, -2);
  equal(b.s1, -2);
  equal(b.s2, -2);
  equal(b.s3, -2);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0002);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftLeftByScalar(a, 2);
  equal(b.s0, -4);
  equal(b.s1, -4);
  equal(b.s2, -4);
  equal(b.s3, -4);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0004);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftLeftByScalar(a, 14);
  equal(b.s0, -16384);
  equal(b.s1, -16384);
  equal(b.s2, -16384);
  equal(b.s3, -16384);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x4000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftLeftByScalar(a, 15);
  equal(b.s0, -32768);
  equal(b.s1, -32768);
  equal(b.s2, -32768);
  equal(b.s3, -32768);
  equal(b.s4, 0x0000);
  equal(b.s5, -32768);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
});

test('int16x8 shiftRightArithmeticByScalar', function() {
  var a = SIMD.int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 1);
  equal(b.s0, -1);
  equal(b.s1, -1);
  equal(b.s2, 0x3fff);
  equal(b.s3, -1);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 2);
  equal(b.s0, -1);
  equal(b.s1, -1);
  equal(b.s2, 0x1fff);
  equal(b.s3, -1);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 14);
  equal(b.s0, -1);
  equal(b.s1, -1);
  equal(b.s2, 0x0001);
  equal(b.s3, -1);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 15);
  equal(b.s0, -1);
  equal(b.s1, -1);
  equal(b.s2, 0x0000);
  equal(b.s3, -1);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
});

test('int16x8 shiftRightLogicalByScalar', function() {
  var a = SIMD.int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 1);
  equal(b.s0, 0x7fff);
  equal(b.s1, 0x7fff);
  equal(b.s2, 0x3fff);
  equal(b.s3, 0x7fff);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 2);
  equal(b.s0, 0x3fff);
  equal(b.s1, 0x3fff);
  equal(b.s2, 0x1fff);
  equal(b.s3, 0x3fff);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 14);
  equal(b.s0, 0x0003);
  equal(b.s1, 0x0003);
  equal(b.s2, 0x0001);
  equal(b.s3, 0x0003);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 15);
  equal(b.s0, 0x0001);
  equal(b.s1, 0x0001);
  equal(b.s2, 0x0000);
  equal(b.s3, 0x0001);
  equal(b.s4, 0x0000);
  equal(b.s5, 0x0000);
  equal(b.s6, 0x0000);
  equal(b.s7, 0x0000);
});

test('int16x8 select', function() {
  var m = SIMD.int16x8.bool(true, true, true, true, false, false, false, false);
  var t = SIMD.int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var f = SIMD.int16x8(9, 10, 11, 12, 13, 14, 15, 16);
  var s = SIMD.int16x8.select(m, t, f);
  equal(1, s.s0);
  equal(2, s.s1);
  equal(3, s.s2);
  equal(4, s.s3);
  equal(13, s.s4);
  equal(14, s.s5);
  equal(15, s.s6);
  equal(16, s.s7);
});

test('int8x16 and', function() {
  var m = SIMD.int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 170, 170, 170, 170, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  equal(-86, m.s0);
  equal(-86, m.s1);
  equal(-86, m.s2);
  equal(-86, m.s3);
  equal(-86, m.s4);
  equal(-86, m.s5);
  equal(-86, m.s6);
  equal(-86, m.s7);
  equal(-86, m.s8);
  equal(-86, m.s9);
  equal(-86, m.s10);
  equal(-86, m.s11);
  equal(-86, m.s12);
  equal(-86, m.s13);
  equal(-86, m.s14);
  equal(-86, m.s15);
  equal(85, n.s0);
  equal(85, n.s1);
  equal(85, n.s2);
  equal(85, n.s3);
  equal(85, n.s4);
  equal(85, n.s5);
  equal(85, n.s6);
  equal(85, n.s7);
  equal(85, n.s8);
  equal(85, n.s9);
  equal(85, n.s10);
  equal(85, n.s11);
  equal(85, n.s12);
  equal(85, n.s13);
  equal(85, n.s14);
  equal(85, n.s15);
  var o = SIMD.int8x16.and(m,n);  // and
  equal(0x0, o.s0);
  equal(0x0, o.s1);
  equal(0x0, o.s2);
  equal(0x0, o.s3);
  equal(0x0, o.s4);
  equal(0x0, o.s5);
  equal(0x0, o.s6);
  equal(0x0, o.s7);
  equal(0x0, o.s8);
  equal(0x0, o.s9);
  equal(0x0, o.s10);
  equal(0x0, o.s11);
  equal(0x0, o.s12);
  equal(0x0, o.s13);
  equal(0x0, o.s14);
  equal(0x0, o.s15);
});

test('int8x16 or', function() {
  var m = SIMD.int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  var o = SIMD.int8x16.or(m,n);  // or
  equal(-1, o.s0);
  equal(-1, o.s1);
  equal(-1, o.s2);
  equal(-1, o.s3);
  equal(-1, o.s4);
  equal(-1, o.s5);
  equal(-1, o.s6);
  equal(-1, o.s7);
  equal(-1, o.s8);
  equal(-1, o.s9);
  equal(-1, o.s10);
  equal(-1, o.s11);
  equal(-1, o.s12);
  equal(-1, o.s13);
  equal(-1, o.s14);
  equal(-1, o.s15);
});

test('int8x16 xor', function() {
  var m = SIMD.int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  var o = SIMD.int8x16.xor(m,n);  // xor
  equal(-1, o.s0);
  equal(-1, o.s1);
  equal(-1, o.s2);
  equal(-1, o.s3);
  equal(-1, o.s4);
  equal(-1, o.s5);
  equal(-1, o.s6);
  equal(-1, o.s7);
  equal(-1, o.s8);
  equal(-1, o.s9);
  equal(-1, o.s10);
  equal(-1, o.s11);
  equal(-1, o.s12);
  equal(-1, o.s13);
  equal(-1, o.s14);
  equal(-1, o.s15);
  o = SIMD.int8x16.xor(m,m);  // xor
  equal(0x0, o.s0);
  equal(0x0, o.s1);
  equal(0x0, o.s2);
  equal(0x0, o.s3);
  equal(0x0, o.s4);
  equal(0x0, o.s5);
  equal(0x0, o.s6);
  equal(0x0, o.s7);
  equal(0x0, o.s8);
  equal(0x0, o.s9);
  equal(0x0, o.s10);
  equal(0x0, o.s11);
  equal(0x0, o.s12);
  equal(0x0, o.s13);
  equal(0x0, o.s14);
  equal(0x0, o.s15);
});

test('int8x16 neg', function() {
  var m = SIMD.int8x16(16, -32, 64, -128, 256, -512, 1024, -2048, 4096, -8192, 16384, -32768, 65536, -131072, 262144, -524288);
  m = SIMD.int8x16.neg(m);
  equal(-16, m.s0);
  equal(32, m.s1);
  equal(-64, m.s2);
  equal(-128, m.s3);
  equal(0, m.s4);
  equal(0, m.s5);
  equal(0, m.s6);
  equal(0, m.s7);
  equal(0, m.s8);
  equal(0, m.s9);
  equal(0, m.s10);
  equal(0, m.s11);
  equal(0, m.s12);
  equal(0, m.s13);
  equal(0, m.s14);
  equal(0, m.s15);

  var n = SIMD.int8x16(0, 0, 0, 0, 0x7f, 0xff, 0xff, 0xff, -1, -1, -1, -1, 0x80, 0x00, 0x00, 0x00);
  n = SIMD.int8x16.neg(n);
  equal(0, n.s0);
  equal(0, n.s1);
  equal(0, n.s2);
  equal(0, n.s3);
  equal(-127, n.s4);
  equal(1, n.s5);
  equal(1, n.s6);
  equal(1, n.s7);
  equal(1, n.s8);
  equal(1, n.s9);
  equal(1, n.s10);
  equal(1, n.s11);
  equal(-128, n.s12);
  equal(0, n.s13);
  equal(0, n.s14);
  equal(0, n.s15);
});

test('int8x16 signMask getter', function() {
  var a = SIMD.int8x16(0x80, 0x00, 0x00, 0x00, 0x7, 0x02, 0x01, 0x00, 0xFF, 0xF0, 0xF2, 0xFc, 0x0, 0x0, 0x0, 0x0);
  equal(0xf01, a.signMask);
  var b = SIMD.int8x16(0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0);
  equal(0x0, b.signMask);
  var c = SIMD.int8x16(0xFF, 0xFE, 0xF0, 0xF1, 0xF2, 0xF3, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xF1, 0xF0, 0xFE);
  equal(0xffff, c.signMask);
});


test('int8x16 add', function() {
  var a = SIMD.int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.int8x16.add(a, b);
  equal(-1, c.s0);
  equal(-1, c.s1);
  equal(-1, c.s2);
  equal(0x0, c.s3);
  equal(-2, c.s4);
  equal(-2, c.s5);
  equal(-2, c.s6);
  equal(-2, c.s7);
  equal(0x7f, c.s8);
  equal(-1, c.s9);
  equal(-1, c.s10);
  equal(0x0, c.s11);
  equal(-1, c.s12);
  equal(-1, c.s13);
  equal(-1, c.s14);
  equal(-1, c.s15);
});

test('int8x16 sub', function() {
  var a = SIMD.int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.int8x16.sub(a, b);
  equal(-1, c.s0);
  equal(-1, c.s1);
  equal(-1, c.s2);
  equal(-2, c.s3);
  equal(0, c.s4);
  equal(0, c.s5);
  equal(0, c.s6);
  equal(0, c.s7);
  equal(0x7f, c.s8);
  equal(-1, c.s9);
  equal(-1, c.s10);
  equal(-2, c.s11);
  equal(1, c.s12);
  equal(1, c.s13);
  equal(1, c.s14);
  equal(1, c.s15);
});

test('int8x16 mul', function() {
  var a = SIMD.int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.int8x16.mul(a, b);
  equal(0x0, c.s0);
  equal(0x0, c.s1);
  equal(0x0, c.s2);
  equal(-1, c.s3);
  equal(1, c.s4);
  equal(1, c.s5);
  equal(1, c.s6);
  equal(1, c.s7);
  equal(0, c.s8);
  equal(0, c.s9);
  equal(0, c.s10);
  equal(-1, c.s11);
  equal(0, c.s12);
  equal(0, c.s13);
  equal(0, c.s14);
  equal(0, c.s15);
});

test('int8x16 comparisons', function() {
  var m = SIMD.int8x16(1000, 2000, 100, 1, -1000, -2000, -100, 1, 0, 0, 0, 0, -1, 1, -2, 2);
  var n = SIMD.int8x16(-2000, 2000, 1, 100, 2000, -2000, -1, -100, -1, 1, -2, 2, 0, 0, 0, 0);
  var cmp;
  cmp = SIMD.int8x16.lessThan(m, n);
  equal(-1, cmp.s0);
  equal(0x0, cmp.s1);
  equal(0x0, cmp.s2);
  equal(-1, cmp.s3);
  equal(0x0, cmp.s4);
  equal(0x0, cmp.s5);
  equal(-1, cmp.s6);
  equal(0x0, cmp.s7);
  equal(0x0, cmp.s8);
  equal(-1, cmp.s9);
  equal(0x0, cmp.s10);
  equal(-1, cmp.s11);
  equal(-1, cmp.s12);
  equal(0x0, cmp.s13);
  equal(-1, cmp.s14);
  equal(0x0, cmp.s15);

  cmp = SIMD.int8x16.equal(m, n);
  equal(0x0, cmp.s0);
  equal(-1, cmp.s1);
  equal(0x0, cmp.s2);
  equal(0x0, cmp.s3);
  equal(0x0, cmp.s4);
  equal(-1, cmp.s5);
  equal(0x0, cmp.s6);
  equal(0x0, cmp.s7);
  equal(0x0, cmp.s8);
  equal(0x0, cmp.s9);
  equal(0x0, cmp.s10);
  equal(0x0, cmp.s11);
  equal(0x0, cmp.s12);
  equal(0x0, cmp.s13);
  equal(0x0, cmp.s14);
  equal(0x0, cmp.s15);

  cmp = SIMD.int8x16.greaterThan(m, n);
  equal(0x0, cmp.s0);
  equal(0x0, cmp.s1);
  equal(-1, cmp.s2);
  equal(0x0, cmp.s3);
  equal(-1, cmp.s4);
  equal(0x0, cmp.s5);
  equal(0x0, cmp.s6);
  equal(-1, cmp.s7);
  equal(-1, cmp.s8);
  equal(0x0, cmp.s9);
  equal(-1, cmp.s10);
  equal(0x0, cmp.s11);
  equal(0x0, cmp.s12);
  equal(-1, cmp.s13);
  equal(0x0, cmp.s14);
  equal(-1, cmp.s15);
});

test('int8x16 shiftLeftByScalar', function() {
  var a = SIMD.int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.int8x16.shiftLeftByScalar(a, 1);
  equal(b.s0, -2);
  equal(b.s1, -2);
  equal(b.s2, -2);
  equal(b.s3, -2);
  equal(b.s4, -2);
  equal(b.s5, -2);
  equal(b.s6, -2);
  equal(b.s7, -2);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x02);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftLeftByScalar(a, 2);
  equal(b.s0, -4);
  equal(b.s1, -4);
  equal(b.s2, -4);
  equal(b.s3, -4);
  equal(b.s4, -4);
  equal(b.s5, -4);
  equal(b.s6, -4);
  equal(b.s7, -4);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x04);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftLeftByScalar(a, 6);
  equal(b.s0, -64);
  equal(b.s1, -64);
  equal(b.s2, -64);
  equal(b.s3, -64);
  equal(b.s4, -64);
  equal(b.s5, -64);
  equal(b.s6, -64);
  equal(b.s7, -64);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x40);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftLeftByScalar(a, 7);
  equal(b.s0, -128);
  equal(b.s1, -128);
  equal(b.s2, -128);
  equal(b.s3, -128);
  equal(b.s4, -128);
  equal(b.s5, -128);
  equal(b.s6, -128);
  equal(b.s7, -128);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, -128);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
});

test('int8x16 shiftRightArithmeticByScalar', function() {
  var a = SIMD.int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 1);
  equal(b.s0, -1);
  equal(b.s1, -1);
  equal(b.s2, -1);
  equal(b.s3, -1);
  equal(b.s4, 0x3f);
  equal(b.s5, -1);
  equal(b.s6, -1);
  equal(b.s7, -1);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x00);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 2);
  equal(b.s0, -1);
  equal(b.s1, -1);
  equal(b.s2, -1);
  equal(b.s3, -1);
  equal(b.s4, 0x1f);
  equal(b.s5, -1);
  equal(b.s6, -1);
  equal(b.s7, -1);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x00);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 6);
  equal(b.s0, -1);
  equal(b.s1, -1);
  equal(b.s2, -1);
  equal(b.s3, -1);
  equal(b.s4, 0x01);
  equal(b.s5, -1);
  equal(b.s6, -1);
  equal(b.s7, -1);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x00);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 7);
  equal(b.s0, -1);
  equal(b.s1, -1);
  equal(b.s2, -1);
  equal(b.s3, -1);
  equal(b.s4, 0x0);
  equal(b.s5, -1);
  equal(b.s6, -1);
  equal(b.s7, -1);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x00);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
});

test('int8x16 shiftRightLogicalByScalar', function() {
  var a = SIMD.int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 1);
  equal(b.s0, 0x7f);
  equal(b.s1, 0x7f);
  equal(b.s2, 0x7f);
  equal(b.s3, 0x7f);
  equal(b.s4, 0x3f);
  equal(b.s5, 0x7f);
  equal(b.s6, 0x7f);
  equal(b.s7, 0x7f);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x00);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 2);
  equal(b.s0, 0x3f);
  equal(b.s1, 0x3f);
  equal(b.s2, 0x3f);
  equal(b.s3, 0x3f);
  equal(b.s4, 0x1f);
  equal(b.s5, 0x3f);
  equal(b.s6, 0x3f);
  equal(b.s7, 0x3f);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x00);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 6);
  equal(b.s0, 0x03);
  equal(b.s1, 0x03);
  equal(b.s2, 0x03);
  equal(b.s3, 0x03);
  equal(b.s4, 0x01);
  equal(b.s5, 0x03);
  equal(b.s6, 0x03);
  equal(b.s7, 0x03);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x00);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 7);
  equal(b.s0, 0x01);
  equal(b.s1, 0x01);
  equal(b.s2, 0x01);
  equal(b.s3, 0x01);
  equal(b.s4, 0x00);
  equal(b.s5, 0x01);
  equal(b.s6, 0x01);
  equal(b.s7, 0x01);
  equal(b.s8, 0x00);
  equal(b.s9, 0x00);
  equal(b.s10, 0x00);
  equal(b.s11, 0x00);
  equal(b.s12, 0x00);
  equal(b.s13, 0x00);
  equal(b.s14, 0x00);
  equal(b.s15, 0x00);
});

test('int8x16 select', function() {
  var m = SIMD.int8x16.bool(true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false);
  var t = SIMD.int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var f = SIMD.int8x16(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32);
  var s = SIMD.int8x16.select(m, t, f);
  equal(1, s.s0);
  equal(2, s.s1);
  equal(3, s.s2);
  equal(4, s.s3);
  equal(5, s.s4);
  equal(6, s.s5);
  equal(7, s.s6);
  equal(8, s.s7);
  equal(25, s.s8);
  equal(26, s.s9);
  equal(27, s.s10);
  equal(28, s.s11);
  equal(29, s.s12);
  equal(30, s.s13);
  equal(31, s.s14);
  equal(32, s.s15);
});

test('int8x16 fromFloat32x4Bits constructor', function() {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.int8x16.fromFloat32x4Bits(m);
  equal(0x00, n.s0);
  equal(0x00, n.s1);
  equal(-128, n.s2);
  equal(0x3f, n.s3);
  equal(0x00, n.s4);
  equal(0x00, n.s5);
  equal(0x00, n.s6);
  equal(0x40, n.s7);
  equal(0x00, n.s8);
  equal(0x00, n.s9);
  equal(0x40, n.s10);
  equal(0x40, n.s11);
  equal(0x00, n.s12);
  equal(0x00, n.s13);
  equal(-128, n.s14);
  equal(0x40, n.s15);
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

test('DataView.getFloat32x4', function() {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat32(i * 4, i);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getFloat32x4(i * 4);
    equal(f32x4.x, v.getFloat32(i * 4));
    equal(f32x4.y, v.getFloat32((i + 1) * 4));
    equal(f32x4.z, v.getFloat32((i + 2) * 4));
    equal(f32x4.w, v.getFloat32((i + 3) * 4));
  }
});

test('DataView.getFloat32x4 with littleEndian as false', function() {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat32(i * 4, i, false);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getFloat32x4(i * 4, false);
    equal(f32x4.x, v.getFloat32(i * 4, false));
    equal(f32x4.y, v.getFloat32((i + 1) * 4, false));
    equal(f32x4.z, v.getFloat32((i + 2) * 4, false));
    equal(f32x4.w, v.getFloat32((i + 3) * 4, false));
  }
});


test('DataView.getFloat32x4 with littleEndian as true', function() {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat32(i * 4, i, true);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getFloat32x4(i * 4, true);
    equal(f32x4.x, v.getFloat32(i * 4, true));
    equal(f32x4.y, v.getFloat32((i + 1) * 4, true));
    equal(f32x4.z, v.getFloat32((i + 2) * 4, true));
    equal(f32x4.w, v.getFloat32((i + 3) * 4, true));
  }
});

test('DataView.getFloat32x4 exceptions', function() {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  throws(function () {
    v.getFloat32x4(-1);
  });
  throws(function () {
    v.getFloat32x4(28);
  });
});

test('DataView.getFloat64x2', function() {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat64(i * 8, i);
  }
  for (var i = 0; i < a.length - 2; i++) {
    var f32x4 = v.getFloat64x2(i * 8);
    equal(f32x4.x, v.getFloat64(i * 8));
    equal(f32x4.y, v.getFloat64((i + 1) * 8));
  }
});

test('DataView.getFloat64x2 with littleEndian as false', function() {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat64(i * 8, i, false);
  }
  for (var i = 0; i < a.length - 2; i++) {
    var f32x4 = v.getFloat64x2(i * 8, false);
    equal(f32x4.x, v.getFloat64(i * 8, false));
    equal(f32x4.y, v.getFloat64((i + 1) * 8, false));
  }
});


test('DataView.getFloat64x2 with littleEndian as true', function() {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat64(i * 8, i, true);
  }
  for (var i = 0; i < a.length - 2; i++) {
    var f32x4 = v.getFloat64x2(i * 8, true);
    equal(f32x4.x, v.getFloat64(i * 8, true));
    equal(f32x4.y, v.getFloat64((i + 1) * 8, true));
  }
});

test('DataView.getFloat64x2 exceptions', function() {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  throws(function () {
    v.getFloat64x2(-1);
  });
  throws(function () {
    v.getFloat64x2(60);
  });
});

test('DataView.getInt32x4', function() {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setInt32(i * 4, i);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getInt32x4(i * 4);
    equal(f32x4.x, v.getInt32(i * 4));
    equal(f32x4.y, v.getInt32((i + 1) * 4));
    equal(f32x4.z, v.getInt32((i + 2) * 4));
    equal(f32x4.w, v.getInt32((i + 3) * 4));
  }
});

test('DataView.getInt32x4 with littleEndian as false', function() {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setInt32(i * 4, i, false);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getInt32x4(i * 4, false);
    equal(f32x4.x, v.getInt32(i * 4, false));
    equal(f32x4.y, v.getInt32((i + 1) * 4, false));
    equal(f32x4.z, v.getInt32((i + 2) * 4, false));
    equal(f32x4.w, v.getInt32((i + 3) * 4, false));
  }
});


test('DataView.getInt32x4 with littleEndian as true', function() {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setInt32(i * 4, i, true);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getInt32x4(i * 4, true);
    equal(f32x4.x, v.getInt32(i * 4, true));
    equal(f32x4.y, v.getInt32((i + 1) * 4, true));
    equal(f32x4.z, v.getInt32((i + 2) * 4, true));
    equal(f32x4.w, v.getInt32((i + 3) * 4, true));
  }
});

test('DataView.getInt32x4 exceptions', function() {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  throws(function () {
    v.getInt32x4(-1);
  });
  throws(function () {
    v.getInt32x4(28);
  });
});

test('DataView.setFloat32x4', function() {
  var a = new Float32Array(8);
  var b = new Float32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat32(i * 4, i);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setFloat32x4(i * 4, SIMD.float32x4(i, i+1, i+2, i+3));
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getFloat32(i*4), v.getFloat32(i*4));

  }
});

test('DataView.setFloat32x4 with littleEndian as false', function() {
  var a = new Float32Array(8);
  var b = new Float32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat32(i * 4, i, false);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setFloat32x4(i * 4, SIMD.float32x4(i, i+1, i+2, i+3), false);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getFloat32(i*4, false), v.getFloat32(i*4, false));
  }
});


test('DataView.setFloat32x4 with littleEndian as true', function() {
  var a = new Float32Array(8);
  var b = new Float32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat32(i * 4, i, true);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setFloat32x4(i * 4, SIMD.float32x4(i, i+1, i+2, i+3), true);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getFloat32(i*4, true), v.getFloat32(i*4, true));
  }
});

test('DataView.setFloat32x4 exceptions', function() {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  var f4 = SIMD.float32x4(0, 1, 2, 3);
  var i4 = SIMD.int32x4(0, 1, 2, 3);
  throws(function () {
    v.setFloat32x4(-1, f4);
  });
  throws(function () {
    v.setFloat32x4(28, f4);
  });
  throws(function () {
    v.setFloat32x4(1, i4);
  });
});

test('DataView.setFloat64x2', function() {
  var a = new Float64Array(8);
  var b = new Float64Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat64(i * 8, i);
  }
  for (var i = 0; i < b.length; i+=2) {
    v.setFloat64x2(i * 8, SIMD.float64x2(i, i+1));
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getFloat64(i*8), v.getFloat64(i*8));

  }
});

test('DataView.setFloat64x2 with littleEndian as false', function() {
  var a = new Float64Array(8);
  var b = new Float64Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat64(i * 8, i, false);
  }
  for (var i = 0; i < b.length; i+=2) {
    v.setFloat64x2(i * 8, SIMD.float64x2(i, i+1), false);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getFloat64(i*8, false), v.getFloat64(i*8, false));
  }
});


test('DataView.setFloat64x2 with littleEndian as true', function() {
  var a = new Float64Array(8);
  var b = new Float64Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat64(i * 8, i, true);
  }
  for (var i = 0; i < b.length; i+=2) {
    v.setFloat64x2(i * 8, SIMD.float64x2(i, i+1), true);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getFloat64(i*8, true), v.getFloat64(i*8, true));
  }
});

test('DataView.setFloat64x2 exceptions', function() {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  var f2 = SIMD.float64x2(0, 1);
  var i4 = SIMD.int32x4(0, 1, 2, 3);
  throws(function () {
    v.setFloat64x2(-1, f2);
  });
  throws(function () {
    v.setFloat64x2(60, f2);
  });
  throws(function () {
    v.setFloat64x2(1, i4);
  });
});

test('DataView.setInt32x4', function() {
  var a = new Int32Array(8);
  var b = new Int32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt32(i * 4, i);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setInt32x4(i * 4, SIMD.int32x4(i, i+1, i+2, i+3));
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt32(i*4), v.getInt32(i*4));

  }
});

test('DataView.setInt32x4 with littleEndian as false', function() {
  var a = new Int32Array(8);
  var b = new Int32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt32(i * 4, i, false);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setInt32x4(i * 4, SIMD.int32x4(i, i+1, i+2, i+3), false);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt32(i*4, false), v.getInt32(i*4, false));
  }
});


test('DataView.setInt32x4 with littleEndian as true', function() {
  var a = new Int32Array(8);
  var b = new Int32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt32(i * 4, i, true);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setInt32x4(i * 4, SIMD.int32x4(i, i+1, i+2, i+3), true);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt32(i*4, true), v.getInt32(i*4, true));
  }
});

test('DataView.setInt32x4 exceptions', function() {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  var f4 = SIMD.float32x4(0, 1, 2, 3);
  var i4 = SIMD.int32x4(0, 1, 2, 3);
  throws(function () {
    v.setInt32x4(-1, i4);
  });
  throws(function () {
    v.setInt32x4(28, i4);
  });
  throws(function () {
    v.setInt32x4(1, f4);
  });
});

test('DataView.setInt16x8', function() {
  var a = new Int16Array(16);
  var b = new Int16Array(16);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt16(i * 2, i);
  }
  for (var i = 0; i < b.length; i+=8) {
    v.setInt16x8(i * 2, SIMD.int16x8(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7));
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt16(i*2), v.getInt16(i*2));
  }
});

test('DataView.setInt16x8 with littleEndian as false', function() {
  var a = new Int16Array(16);
  var b = new Int16Array(16);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt16(i * 2, i, false);
  }
  for (var i = 0; i < b.length; i+=8) {
    v.setInt16x8(i * 2, SIMD.int16x8(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7), false);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt16(i*2, false), v.getInt16(i*2, false));
  }
});


test('DataView.setInt16x8 with littleEndian as true', function() {
  var a = new Int16Array(16);
  var b = new Int16Array(16);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt16(i * 2, i, true);
  }
  for (var i = 0; i < b.length; i+=8) {
    v.setInt16x8(i * 2, SIMD.int16x8(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7), true);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt16(i*2, true), v.getInt16(i*2, true));
  }
});

test('DataView.setInt16x8 exceptions', function() {
  var a = new Int16Array(16);
  var v = new DataView(a.buffer);
  var f4 = SIMD.float32x4(0, 1, 2, 3);
  var i2 = SIMD.int16x8(0, 1, 2, 3, 4, 5, 6, 7);
  throws(function () {
    v.setInt16x8(-1, i2);
  });
  throws(function () {
    v.setInt16x8(28, i2);
  });
  throws(function () {
    v.setInt16x8(1, f4);
  });
});

test('DataView.setInt8x16', function() {
  var a = new Int8Array(32);
  var b = new Int8Array(32);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt8(i, i);
  }
  for (var i = 0; i < b.length; i+=16) {
    v.setInt8x16(i, SIMD.int8x16(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9, i+10, i+11, i+12, i+13, i+14, i+15));
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt8(i), v.getInt8(i));
  }
});

test('DataView.setInt8x16 with littleEndian as false', function() {
  var a = new Int8Array(32);
  var b = new Int8Array(32);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt8(i, i, false);
  }
  for (var i = 0; i < b.length; i+=16) {
    v.setInt8x16(i, SIMD.int8x16(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9, i+10, i+11, i+12, i+13, i+14, i+15), false);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt8(i, false), v.getInt8(i, false));
  }
});


test('DataView.setInt8x16 with littleEndian as true', function() {
  var a = new Int8Array(32);
  var b = new Int8Array(32);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt8(i, i, true);
  }
  for (var i = 0; i < b.length; i+=16) {
    v.setInt8x16(i, SIMD.int8x16(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9, i+10, i+11, i+12, i+13, i+14, i+15), true);
  }
  for (var i = 0; i < a.length; i++) {
    equal(u.getInt8(i, true), v.getInt8(i, true));
  }
});

test('DataView.setInt8x16 exceptions', function() {
  var a = new Int8Array(32);
  var v = new DataView(a.buffer);
  var f4 = SIMD.float32x4(0, 1, 2, 3);
  var i2 = SIMD.int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  throws(function () {
    v.setInt8x16(-1, i2);
  });
  throws(function () {
    v.setInt8x16(28, i2);
  });
  throws(function () {
    v.setInt8x16(1, f4);
  });
});

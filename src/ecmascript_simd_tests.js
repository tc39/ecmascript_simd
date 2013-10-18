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
  notEqual(undefined, float32x4);  // Type.
  notEqual(undefined, new float32x4(1.0, 2.0, 3.0, 4.0));  // New object.
});

test('float32x4 scalar getters', function() {
  var a = float32x4(1.0, 2.0, 3.0, 4.0);
  equal(1.0, a.x);
  equal(2.0, a.y);
  equal(3.0, a.z);
  equal(4.0, a.w);
});

test('float32x4 signMask getter', function() {
  var a = float32x4(-1.0, -2.0, -3.0, -4.0);
  equal(0xf, a.signMask);
  var b = float32x4(1.0, 2.0, 3.0, 4.0);
  equal(0x0, b.signMask);
  var c = float32x4(1.0, -2.0, -3.0, 4.0);
  equal(0x6, c.signMask);
});

test('float32x4 vector getters', function() {
  var a = new float32x4(4.0, 3.0, 2.0, 1.0);
  var xxxx = SIMD.shuffle(a, SIMD.XXXX);
  var yyyy = SIMD.shuffle(a, SIMD.YYYY);
  var zzzz = SIMD.shuffle(a, SIMD.ZZZZ);
  var wwww = SIMD.shuffle(a, SIMD.WWWW);
  var wzyx = SIMD.shuffle(a, SIMD.WZYX);
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
  var a = new float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.abs(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
  c = SIMD.abs(new float32x4(4.0, 3.0, 2.0, 1.0));
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
});

test('float32x4 neg', function() {
  var a = new float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.neg(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
  c = SIMD.neg(new float32x4(4.0, 3.0, 2.0, 1.0));
  equal(-4.0, c.x);
  equal(-3.0, c.y);
  equal(-2.0, c.z);
  equal(-1.0, c.w);
});


test('float32x4 add', function() {
  var a = new float32x4(4.0, 3.0, 2.0, 1.0);
  var b = new float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.add(a, b);
  equal(14.0, c.x);
  equal(23.0, c.y);
  equal(32.0, c.z);
  equal(41.0, c.w);
});

test('float32x4 sub', function() {
  var a = new float32x4(4.0, 3.0, 2.0, 1.0);
  var b = new float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.sub(a, b);
  equal(-6.0, c.x);
  equal(-17.0, c.y);
  equal(-28.0, c.z);
  equal(-39.0, c.w);
});

test('float32x4 mul', function() {
  var a = new float32x4(4.0, 3.0, 2.0, 1.0);
  var b = new float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.mul(a, b);
  equal(40.0, c.x);
  equal(60.0, c.y);
  equal(60.0, c.z);
  equal(40.0, c.w);
});

test('float32x4 div', function() {
  var a = new float32x4(4.0, 9.0, 8.0, 1.0);
  var b = new float32x4(2.0, 3.0, 1.0, 0.5);
  var c = SIMD.div(a, b);
  equal(2.0, c.x);
  equal(3.0, c.y);
  equal(8.0, c.z);
  equal(2.0, c.w);
});

test('float32x4 clamp', function() {
  var a = new float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = new float32x4(2.0, 1.0, 50.0, 0.0);
  var upper = new float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.clamp(a, lower, upper);
  equal(2.0, c.x);
  equal(5.0, c.y);
  equal(50.0, c.z);
  equal(0.5, c.w);
});

test('float32x4 min', function() {
  var a = new float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = new float32x4(2.0, 1.0, 50.0, 0.0);
  var c = SIMD.min(a, lower);
  equal(-20.0, c.x);
  equal(1.0, c.y);
  equal(30.0, c.z);
  equal(0.0, c.w);
});

test('float32x4 max', function() {
  var a = new float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = new float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.max(a, upper);
  equal(2.5, c.x);
  equal(10.0, c.y);
  equal(55.0, c.z);
  equal(1.0, c.w);
});

test('float32x4 reciprocal', function() {
  var a = new float32x4(8.0, 4.0, 2.0, -2.0);
  var c = SIMD.reciprocal(a);
  equal(0.125, c.x);
  equal(0.250, c.y);
  equal(0.5, c.z);
  equal(-0.5, c.w);
});

test('float32x4 reciprocal sqrt', function() {
  var a = new float32x4(1.0, 0.25, 0.111111, 0.0625);
  var c = SIMD.reciprocalSqrt(a);
  almostEqual(1.0, c.x);
  almostEqual(2.0, c.y);
  almostEqual(3.0, c.z);
  almostEqual(4.0, c.w);
});

test('float32x4 scale', function() {
  var a = new float32x4(8.0, 4.0, 2.0, -2.0);
  var c = SIMD.scale(a, 0.5);
  equal(4.0, c.x);
  equal(2.0, c.y);
  equal(1.0, c.z);
  equal(-1.0, c.w);
});

test('float32x4 sqrt', function() {
  var a = new float32x4(16.0, 9.0, 4.0, 1.0);
  var c = SIMD.sqrt(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
});

test('float32x4 withX', function() {
    var a = new float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.withX(a, 20.0);
    equal(20.0, c.x);
    equal(9.0, c.y);
    equal(4.0, c.z);
    equal(1.0, c.w);
});

test('float32x4 withY', function() {
    var a = new float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.withY(a, 20.0);
    equal(16.0, c.x);
    equal(20.0, c.y);
    equal(4.0, c.z);
    equal(1.0, c.w);
});

test('float32x4 withZ', function() {
    var a = new float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.withZ(a, 20.0);
    equal(16.0, c.x);
    equal(9.0, c.y);
    equal(20.0, c.z);
    equal(1.0, c.w);
});

test('float32x4 withW', function() {
    var a = new float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.withW(a, 20.0);
    equal(16.0, c.x);
    equal(9.0, c.y);
    equal(4.0, c.z);
    equal(20.0, c.w);
});

test('float32x4 uint32x4 conversion', function() {
  var m = new uint32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.uint32x4BitsToFloat32x4(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(3.0, n.z);
  equal(4.0, n.w);
  n = new float32x4(5.0, 6.0, 7.0, 8.0);
  m = SIMD.float32x4BitsToUint32x4(n);
  equal(0x40A00000, m.x);
  equal(0x40C00000, m.y);
  equal(0x40E00000, m.z);
  equal(0x41000000, m.w);
  // Flip sign using bit-wise operators.
  n = new float32x4(9.0, 10.0, 11.0, 12.0);
  m = new uint32x4(0x80000000, 0x80000000, 0x80000000, 0x80000000);
  var nMask = SIMD.float32x4BitsToUint32x4(n);
  nMask = SIMD.xor(nMask, m); // flip sign.
  n = SIMD.uint32x4BitsToFloat32x4(nMask);
  equal(-9.0, n.x);
  equal(-10.0, n.y);
  equal(-11.0, n.z);
  equal(-12.0, n.w);
  nMask = SIMD.float32x4BitsToUint32x4(n);
  nMask = SIMD.xor(nMask, m); // flip sign.
  n = SIMD.uint32x4BitsToFloat32x4(nMask);
  equal(9.0, n.x);
  equal(10.0, n.y);
  equal(11.0, n.z);
  equal(12.0, n.w);
});

test('float32x4 comparisons', function() {
  var m = new float32x4(1.0, 2.0, 0.1, 0.001);
  var n = new float32x4(2.0, 2.0, 0.001, 0.1);
  var cmp;
  cmp = SIMD.lessThan(m, n);
  equal(0xFFFFFFFF, cmp.x);
  equal(0x0, cmp.y);
  equal(0x0, cmp.z);
  equal(0xFFFFFFFF, cmp.w);

  cmp = SIMD.lessThanOrEqual(m, n);
  equal(0xFFFFFFFF, cmp.x);
  equal(0xFFFFFFFF, cmp.y);
  equal(0x0, cmp.z);
  equal(0xFFFFFFFF, cmp.w);

  cmp = SIMD.equal(m, n);
  equal(0x0, cmp.x);
  equal(0xFFFFFFFF, cmp.y);
  equal(0x0, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.notEqual(m, n);
  equal(0xFFFFFFFF, cmp.x);
  equal(0x0, cmp.y);
  equal(0xFFFFFFFF, cmp.z);
  equal(0xFFFFFFFF, cmp.w);

  cmp = SIMD.greaterThanOrEqual(m, n);
  equal(0x0, cmp.x);
  equal(0xFFFFFFFF, cmp.y);
  equal(0xFFFFFFFF, cmp.z);
  equal(0x0, cmp.w);

  cmp = SIMD.greaterThan(m, n);
  equal(0x0, cmp.x);
  equal(0x0, cmp.y);
  equal(0xFFFFFFFF, cmp.z);
  equal(0x0, cmp.w);
});

test('uint32x4 select', function() {
  var m = uint32x4.bool(true, true, false, false);
  var t = new float32x4(1.0, 2.0, 3.0, 4.0);
  var f = new float32x4(5.0, 6.0, 7.0, 8.0);
  var s = SIMD.select(m, t, f);
  equal(1.0, s.x);
  equal(2.0, s.y);
  equal(7.0, s.z);
  equal(8.0, s.w);
});

test('uint32x4 withX', function() {
    var a = new uint32x4(1, 2, 3, 4);
    var c = SIMD.withXu32(a, 20);
    equal(20, c.x);
    equal(2, c.y);
    equal(3, c.z);
    equal(4, c.w);
});

test('uint32x4 withY', function() {
    var a = new uint32x4(1, 2, 3, 4);
    var c = SIMD.withYu32(a, 20);
    equal(1, c.x);
    equal(20, c.y);
    equal(3, c.z);
    equal(4, c.w);
});

test('uint32x4 withZ', function() {
    var a = new uint32x4(1, 2, 3, 4);
    var c = SIMD.withZu32(a, 20);
    equal(1, c.x);
    equal(2, c.y);
    equal(20, c.z);
    equal(4, c.w);
});

test('uint32x4 withW', function() {
    var a = new uint32x4(1, 2, 3, 4);
    var c = SIMD.withWu32(a, 20);
    equal(1, c.x);
    equal(2, c.y);
    equal(3, c.z);
    equal(20, c.w);
});

test('uint32x4 withFlagX', function() {
    var a = uint32x4.bool(true, false, true, false);
    var c = SIMD.withFlagX(a, true);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    c = SIMD.withFlagX(a, false);
    equal(false, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    equal(0x0, c.x);
    equal(0x0, c.y);
    equal(0xFFFFFFFF, c.z);
    equal(0x0, c.w);
});

test('uint32x4 withFlagY', function() {
    var a = uint32x4.bool(true, false, true, false);
    var c = SIMD.withFlagY(a, true);
    equal(true, c.flagX);
    equal(true, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    c = SIMD.withFlagY(a, false);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    equal(0xFFFFFFFF, c.x);
    equal(0x0, c.y);
    equal(0xFFFFFFFF, c.z);
    equal(0x0, c.w);
});

test('uint32x4 withFlagZ', function() {
    var a = uint32x4.bool(true, false, true, false);
    var c = SIMD.withFlagZ(a, true);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    c = SIMD.withFlagZ(a, false);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(false, c.flagZ);
    equal(false, c.flagW);
    equal(0xFFFFFFFF, c.x);
    equal(0x0, c.y);
    equal(0x0, c.z);
    equal(0x0, c.w);
});

test('uint32x4 withFlagW', function() {
    var a = uint32x4.bool(true, false, true, false);
    var c = SIMD.withFlagW(a, true);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(true, c.flagW);
    c = SIMD.withFlagW(a, false);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.flagW);
    equal(0xFFFFFFFF, c.x);
    equal(0x0, c.y);
    equal(0xFFFFFFFF, c.z);
    equal(0x0, c.w);
});

test('uint32x4 and', function() {
  var m = new uint32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = new uint32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  equal(0xAAAAAAAA, m.x);
  equal(0xAAAAAAAA, m.y);
  equal(0xAAAAAAAA, m.z);
  equal(0xAAAAAAAA, m.w);
  equal(0x55555555, n.x);
  equal(0x55555555, n.y);
  equal(0x55555555, n.z);
  equal(0x55555555, n.w);
  equal(true, n.flagX);
  equal(true, n.flagY);
  equal(true, n.flagZ);
  equal(true, n.flagW);
  var o = SIMD.and(m,n);  // and
  equal(0x0, o.x);
  equal(0x0, o.y);
  equal(0x0, o.z);
  equal(0x0, o.w);
  equal(false, o.flagX);
  equal(false, o.flagY);
  equal(false, o.flagZ);
  equal(false, o.flagW);
});

test('uint32x4 or', function() {
  var m = new uint32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = new uint32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  var o = SIMD.or(m,n);  // or
  equal(0xFFFFFFFF, o.x);
  equal(0xFFFFFFFF, o.y);
  equal(0xFFFFFFFF, o.z);
  equal(0xFFFFFFFF, o.w);
  equal(true, o.flagX);
  equal(true, o.flagY);
  equal(true, o.flagZ);
  equal(true, o.flagW);
});

test('uint32x4 xor', function() {
  var m = new uint32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = new uint32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  n = SIMD.withXu32(n, 0xAAAAAAAA);
  n = SIMD.withYu32(n, 0xAAAAAAAA);
  n = SIMD.withZu32(n, 0xAAAAAAAA);
  n = SIMD.withWu32(n, 0xAAAAAAAA);
  equal(0xAAAAAAAA, n.x);
  equal(0xAAAAAAAA, n.y);
  equal(0xAAAAAAAA, n.z);
  equal(0xAAAAAAAA, n.w);
  var o = SIMD.xor(m,n);  // xor
  equal(0x0, o.x);
  equal(0x0, o.y);
  equal(0x0, o.z);
  equal(0x0, o.w);
  equal(false, o.flagX);
  equal(false, o.flagY);
  equal(false, o.flagZ);
  equal(false, o.flagW);
});

test('uint32x4 neg', function() {
  var m = new uint32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = new uint32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  m = SIMD.negu32(m);
  n = SIMD.negu32(n);
  equal(0xAAAAAAAA, n.x);
  equal(0xAAAAAAAA, n.y);
  equal(0xAAAAAAAA, n.z);
  equal(0xAAAAAAAA, n.w);
  equal(0x55555555, m.x);
  equal(0x55555555, m.y);
  equal(0x55555555, m.z);
  equal(0x55555555, m.w);
});

test('uint32x4 signMask getter', function() {
  var a = uint32x4(0x80000000, 0x7000000, 0xFFFFFFFF, 0x0);
  equal(0x5, a.signMask);
  var b = uint32x4(0x0, 0x0, 0x0, 0x0);
  equal(0x0, b.signMask);
  var c = uint32x4(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF);
  equal(0xf, c.signMask);
});


test('uint32x4 add', function() {
  var a = new uint32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x7fffffff, 0x0);
  var b = uint32x4(0x1, 0xFFFFFFFF, 0x1, 0xFFFFFFFF);
  var c = SIMD.addu32(a, b);
  equal(0x0, c.x);
  equal(0xFFFFFFFE, c.y);
  equal(0x80000000, c.z);
  equal(0xFFFFFFFF, c.w);
});

test('uint32x4 sub', function() {
  var a = new uint32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x80000000, 0x0);
  var b = uint32x4(0x1, 0xFFFFFFFF, 0x1, 0xFFFFFFFF);
  var c = SIMD.subu32(a, b);
  equal(0xFFFFFFFE, c.x);
  equal(0x0, c.y);
  equal(0x7FFFFFFF, c.z);
  equal(0x1, c.w);
});

test('uint32x4 mul', function() {
  var a = new uint32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x80000000, 0x0);
  var b = uint32x4(0x1, 0xFFFFFFFF, 0x80000000, 0xFFFFFFFF);
  var c = SIMD.mulu32(a, b);
  equal(0xFFFFFFFF, c.x);
  equal(0x1, c.y);
  equal(0x0, c.z);
  equal(0x0, c.w);
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
  a.setAt(0, float32x4(1, 2, 3, 4));
  a.setAt(1, float32x4(5, 6, 7, 8));
  a.setAt(2, float32x4(9, 10, 11, 12));
  a.setAt(3, float32x4(13, 14, 15, 16));
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
  a.setAt(0, float32x4(1, 2, 3, 4));
  a.setAt(1, float32x4(5, 6, 7, 8));
  a.setAt(2, float32x4(9, 10, 11, 12));
  a.setAt(3, float32x4(13, 14, 15, 16));

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
  a.setAt(0, float32x4(1, 2, 3, 4));
  a.setAt(1, float32x4(5, 6, 7, 8));
  a.setAt(2, float32x4(9, 10, 11, 12));
  a.setAt(3, float32x4(13, 14, 15, 16));
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

  a.setAt(2, float32x4(17, 18, 19, 20));

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
  a.setAt(0, float32x4(1, 2, 3, 4));
  a.setAt(1, float32x4(5, 6, 7, 8));
  a.setAt(2, float32x4(9, 10, 11, 12));
  a.setAt(3, float32x4(13, 14, 15, 16));
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

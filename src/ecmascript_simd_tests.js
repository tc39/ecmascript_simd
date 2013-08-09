almostEqual = function(a, b) {
  if (Math.abs(a - b) < 0.00001) {
    ok(true);
    return;
  }
  ok(false);
}

test('Float32x4 constructor', function() {
  notEqual(undefined, Float32x4);  // Type.
  notEqual(undefined, new Float32x4(1.0, 2.0, 3.0, 4.0));  // New object.
});

test('Float32x4 scalar getters', function() {
  var a = new Float32x4(1.0, 2.0, 3.0, 4.0);
  equal(1.0, a.x);
  equal(2.0, a.y);
  equal(3.0, a.z);
  equal(4.0, a.w);
});

test('Float32x4 vector getters', function() {
  var a = new Float32x4(4.0, 3.0, 2.0, 1.0);
  var xxxx = a.xxxx;
  var yyyy = a.yyyy;
  var zzzz = a.zzzz;
  var wwww = a.wwww;
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
});

test('Float32x4 abs', function() {
  var a = new Float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.abs(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
  c = SIMD.abs(new Float32x4(4.0, 3.0, 2.0, 1.0));
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
});

test('Float32x4 neg', function() {
  var a = new Float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.neg(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
  c = SIMD.neg(new Float32x4(4.0, 3.0, 2.0, 1.0));
  equal(-4.0, c.x);
  equal(-3.0, c.y);
  equal(-2.0, c.z);
  equal(-1.0, c.w);
});


test('Float32x4 add', function() {
  var a = new Float32x4(4.0, 3.0, 2.0, 1.0);
  var b = new Float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.add(a, b);
  equal(14.0, c.x);
  equal(23.0, c.y);
  equal(32.0, c.z);
  equal(41.0, c.w);
});

test('Float32x4 sub', function() {
  var a = new Float32x4(4.0, 3.0, 2.0, 1.0);
  var b = new Float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.sub(a, b);
  equal(-6.0, c.x);
  equal(-17.0, c.y);
  equal(-28.0, c.z);
  equal(-39.0, c.w);
});

test('Float32x4 mul', function() {
  var a = new Float32x4(4.0, 3.0, 2.0, 1.0);
  var b = new Float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.mul(a, b);
  equal(40.0, c.x);
  equal(60.0, c.y);
  equal(60.0, c.z);
  equal(40.0, c.w);
});

test('Float32x4 div', function() {
  var a = new Float32x4(4.0, 9.0, 8.0, 1.0);
  var b = new Float32x4(2.0, 3.0, 1.0, 0.5);
  var c = SIMD.div(a, b);
  equal(2.0, c.x);
  equal(3.0, c.y);
  equal(8.0, c.z);
  equal(2.0, c.w);
});

test('Float32x4 clamp', function() {
  var a = new Float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = new Float32x4(2.0, 1.0, 50.0, 0.0);
  var upper = new Float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.clamp(a, lower, upper);
  equal(2.0, c.x);
  equal(5.0, c.y);
  equal(50.0, c.z);
  equal(0.5, c.w);
});

test('Float32x4 min', function() {
  var a = new Float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = new Float32x4(2.0, 1.0, 50.0, 0.0);
  var c = SIMD.min(a, lower);
  equal(-20.0, c.x);
  equal(1.0, c.y);
  equal(30.0, c.z);
  equal(0.0, c.w);
});

test('Float32x4 max', function() {
  var a = new Float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = new Float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.max(a, upper);
  equal(2.5, c.x);
  equal(10.0, c.y);
  equal(55.0, c.z);
  equal(1.0, c.w);
});

test('Float32x4 reciprocal', function() {
  var a = new Float32x4(8.0, 4.0, 2.0, -2.0);
  var c = SIMD.reciprocal(a);
  equal(0.125, c.x);
  equal(0.250, c.y);
  equal(0.5, c.z);
  equal(-0.5, c.w);
});

test('Float32x4 reciprocal sqrt', function() {
  var a = new Float32x4(1.0, 0.25, 0.111111, 0.0625);
  var c = SIMD.reciprocalSqrt(a);
  almostEqual(1.0, c.x);
  almostEqual(2.0, c.y);
  almostEqual(3.0, c.z);
  almostEqual(4.0, c.w);
});

test('Float32x4 scale', function() {
  var a = new Float32x4(8.0, 4.0, 2.0, -2.0);
  var c = SIMD.scale(a, 0.5);
  equal(4.0, c.x);
  equal(2.0, c.y);
  equal(1.0, c.z);
  equal(-1.0, c.w);
});

test('Float32x4 sqrt', function() {
  var a = new Float32x4(16.0, 9.0, 4.0, 1.0);
  var c = SIMD.sqrt(a);
  equal(4.0, c.x);
  equal(3.0, c.y);
  equal(2.0, c.z);
  equal(1.0, c.w);
});

test('Float32x4 withX', function() {
    var a = new Float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.withX(a, 20.0);
    equal(20.0, c.x);
    equal(9.0, c.y);
    equal(4.0, c.z);
    equal(1.0, c.w);
});

test('Float32x4 withY', function() {
    var a = new Float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.withY(a, 20.0);
    equal(16.0, c.x);
    equal(20.0, c.y);
    equal(4.0, c.z);
    equal(1.0, c.w);
});

test('Float32x4 withZ', function() {
    var a = new Float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.withZ(a, 20.0);
    equal(16.0, c.x);
    equal(9.0, c.y);
    equal(20.0, c.z);
    equal(1.0, c.w);
});

test('Float32x4 withW', function() {
    var a = new Float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.withW(a, 20.0);
    equal(16.0, c.x);
    equal(9.0, c.y);
    equal(4.0, c.z);
    equal(20.0, c.w);
});

test('Float32x4 Uint32x4 conversion', function() {
  var m = new Uint32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.toFloat32x4(m);
  equal(1.0, n.x);
  equal(2.0, n.y);
  equal(3.0, n.z);
  equal(4.0, n.w);
  n = new Float32x4(5.0, 6.0, 7.0, 8.0);
  m = SIMD.toUint32x4(n);
  equal(0x40A00000, m.x);
  equal(0x40C00000, m.y);
  equal(0x40E00000, m.z);
  equal(0x41000000, m.w);
  // Flip sign using bit-wise operators.
  n = new Float32x4(9.0, 10.0, 11.0, 12.0);
  m = new Uint32x4(0x80000000, 0x80000000, 0x80000000, 0x80000000);
  var nMask = SIMD.toUint32x4(n);
  nMask = SIMD.xor(nMask, m); // flip sign.
  n = SIMD.toFloat32x4(nMask);
  equal(-9.0, n.x);
  equal(-10.0, n.y);
  equal(-11.0, n.z);
  equal(-12.0, n.w);
  nMask = SIMD.toUint32x4(n);
  nMask = SIMD.xor(nMask, m); // flip sign.
  n = SIMD.toFloat32x4(nMask);
  equal(9.0, n.x);
  equal(10.0, n.y);
  equal(11.0, n.z);
  equal(12.0, n.w);
});

test('Float32x4 comparisons', function() {
  var m = new Float32x4(1.0, 2.0, 0.1, 0.001);
  var n = new Float32x4(2.0, 2.0, 0.001, 0.1);
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

test('Uint32x4 select', function() {
  var m = Uint32x4.bool(true, true, false, false);
  var t = new Float32x4(1.0, 2.0, 3.0, 4.0);
  var f = new Float32x4(5.0, 6.0, 7.0, 8.0);
  var s = SIMD.select(m, t, f);
  equal(1.0, s.x);
  equal(2.0, s.y);
  equal(7.0, s.z);
  equal(8.0, s.w);
});

test('Uint32x4 withX', function() {
    var a = new Uint32x4(1, 2, 3, 4);
    var c = SIMD.withXu32(a, 20);
    equal(20, c.x);
    equal(2, c.y);
    equal(3, c.z);
    equal(4, c.w);
});

test('Uint32x4 withY', function() {
    var a = new Uint32x4(1, 2, 3, 4);
    var c = SIMD.withYu32(a, 20);
    equal(1, c.x);
    equal(20, c.y);
    equal(3, c.z);
    equal(4, c.w);
});

test('Uint32x4 withZ', function() {
    var a = new Uint32x4(1, 2, 3, 4);
    var c = SIMD.withZu32(a, 20);
    equal(1, c.x);
    equal(2, c.y);
    equal(20, c.z);
    equal(4, c.w);
});

test('Uint32x4 withW', function() {
    var a = new Uint32x4(1, 2, 3, 4);
    var c = SIMD.withWu32(a, 20);
    equal(1, c.x);
    equal(2, c.y);
    equal(3, c.z);
    equal(20, c.w);
});

test('Uint32x4 withFlagX', function() {
    var a = Uint32x4.bool(true, false, true, false);
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

test('Uint32x4 withFlagY', function() {
    var a = Uint32x4.bool(true, false, true, false);
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

test('Uint32x4 withFlagZ', function() {
    var a = Uint32x4.bool(true, false, true, false);
    var c = SIMD.withFlagZ(a, true);
    equal(true, c.flagX);
    equal(false, c.flagY);
    equal(true, c.flagZ);
    equal(false, c.w);
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

test('Uint32x4 withFlagW', function() {
    var a = Uint32x4.bool(true, false, true, false);
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

test('Uint32x4 and', function() {
  var m = new Uint32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = new Uint32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
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
  o = SIMD.and(m,n);  // and
  equal(0x0, o.x);
  equal(0x0, o.y);
  equal(0x0, o.z);
  equal(0x0, o.w);
  equal(false, o.flagX);
  equal(false, o.flagY);
  equal(false, o.flagZ);
  equal(false, o.flagW);
});

test('Uint32x4 or', function() {
  var m = new Uint32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = new Uint32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
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

test('Uint32x4 xor', function() {
  var m = new Uint32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = new Uint32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  n = SIMD.withXu32(n, 0xAAAAAAAA);
  n = SIMD.withYu32(n, 0xAAAAAAAA);
  n = SIMD.withZu32(n, 0xAAAAAAAA);
  n = SIMD.withWu32(n, 0xAAAAAAAA);
  equal(0xAAAAAAAA, n.x);
  equal(0xAAAAAAAA, n.y);
  equal(0xAAAAAAAA, n.z);
  equal(0xAAAAAAAA, n.w);
  o = SIMD.xor(m,n);  // xor
  equal(0x0, o.x);
  equal(0x0, o.y);
  equal(0x0, o.z);
  equal(0x0, o.w);
  equal(false, o.flagX);
  equal(false, o.flagY);
  equal(false, o.flagZ);
  equal(false, o.flagW);
});

test('Uint32x4 neg', function() {
  var m = new Uint32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = new Uint32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
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

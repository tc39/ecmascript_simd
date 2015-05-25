/*
  Copyright (C) 2015

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

test('utils.float32x4.clamp', function() {
    var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
    var lower = SIMD.float32x4(2.0, 1.0, 50.0, 0.0);
    var upper = SIMD.float32x4(2.5, 5.0, 55.0, 1.0);
    var c = SIMDUtils.float32x4.clamp(a, lower, upper);
    equal(2.0, SIMD.float32x4.extractLane(c, 0));
    equal(5.0, SIMD.float32x4.extractLane(c, 1));
    equal(50.0, SIMD.float32x4.extractLane(c, 2));
    equal(0.5, SIMD.float32x4.extractLane(c, 3));
});

test('utils.float64x2.clamp', function() {
  var a = SIMD.float64x2(-20.0, 10.0);
  var b = SIMD.float64x2(2.125, 3.0);
  var lower = SIMD.float64x2(2.0, 1.0);
  var upper = SIMD.float64x2(2.5, 5.0);
  var c = SIMDUtils.float64x2.clamp(a, lower, upper);
  equal(2.0, SIMD.float64x2.extractLane(c, 0));
  equal(5.0, SIMD.float64x2.extractLane(c, 1));
  c = SIMDUtils.float64x2.clamp(b, lower, upper);
  equal(2.125, SIMD.float64x2.extractLane(c, 0));
  equal(3.0, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(-3.4e200, 3.4e250);
  b = SIMD.float64x2(3.4e100, 3.4e200);
  lower = SIMD.float64x2(3.4e50, 3.4e100);
  upper = SIMD.float64x2(3.4e150, 3.4e300);
  c = SIMDUtils.float64x2.clamp(a, lower, upper);
  equal(3.4e50, SIMD.float64x2.extractLane(c, 0));
  equal(3.4e250, SIMD.float64x2.extractLane(c, 1));
  c = SIMDUtils.float64x2.clamp(b, lower, upper);
  equal(3.4e100, SIMD.float64x2.extractLane(c, 0));
  equal(3.4e200, SIMD.float64x2.extractLane(c, 1));
});

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

(function (global) {

global.SIMDUtils = {};

if (typeof module !== "undefined") {
    module.exports = global.SIMDUtils;
}

var utils = global.SIMDUtils;

utils.int32x4 = {};

utils.int32x4.zero = SIMD.int32x4(0, 0, 0, 0);

utils.float32x4 = {};

utils.float32x4.zero = SIMD.float32x4(0, 0, 0, 0);

utils.float32x4.clamp = function(v, min, max) {
    v = SIMD.float32x4.check(v);
    min = SIMD.float32x4.check(min);
    max = SIMD.float32x4.check(max);
    var t1 = SIMD.float32x4.lessThanOrEqual(v, min);
    var t2 = SIMD.float32x4.select(t1, min, v);
    var t3 = SIMD.float32x4.greaterThanOrEqual(t2, max);
    return SIMD.float32x4.select(t3, max, t2);
}

utils.float64x2 = {};

utils.float64x2.zero = SIMD.float64x2(0, 0);

utils.float64x2.clamp = function(v, min, max) {
    v = SIMD.float64x2.check(v);
    min = SIMD.float64x2.check(min);
    max = SIMD.float64x2.check(max);
    var t1 = SIMD.float64x2.lessThanOrEqual(v, min);
    var t2 = SIMD.float64x2.select(t1, min, v);
    var t3 = SIMD.float64x2.greaterThanOrEqual(t2, max);
    return SIMD.float64x2.select(t3, max, t2);
}

})(typeof window !== "undefined" ? window : this);

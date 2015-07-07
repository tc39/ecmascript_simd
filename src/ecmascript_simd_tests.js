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

test('Float32x4 operators', function() {
    throws(function() {Number(SIMD.Float32x4(0, 1, 2, 3))});
    throws(function() {+SIMD.Float32x4(0, 1, 2, 3)});
    throws(function() {-SIMD.Float32x4(0, 1, 2, 3)});
    throws(function() {~SIMD.Float32x4(0, 1, 2, 3), -1});
    throws(function() {Math.fround(SIMD.Float32x4(0, 1, 2, 3))});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3)|0});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3)&0});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3)^0});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3)>>>0});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3)>>0});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3)<<0});
    throws(function() {(SIMD.Float32x4(0, 1, 2, 3) + SIMD.Float32x4(4, 5, 6, 7))});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3) - SIMD.Float32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3) * SIMD.Float32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3) / SIMD.Float32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3) % SIMD.Float32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3) < SIMD.Float32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3) > SIMD.Float32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3) <= SIMD.Float32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Float32x4(0, 1, 2, 3) >= SIMD.Float32x4(4, 5, 6, 7)});
    equal(SIMD.Float32x4(0, 1, 2, 3).toString(), "Float32x4(0, 1, 2, 3)");
    equal(SIMD.Float32x4(0, 1, 2, 3).toLocaleString(), "Float32x4(0, 1, 2, 3)");
    throws(function() { SIMD.Float32x4(0, 1, 2, 3)(); });
    equal(SIMD.Float32x4(0, 1, 2, 3)[0], undefined);
    equal(SIMD.Float32x4(0, 1, 2, 3).a, undefined);
    equal(!SIMD.Float32x4(0, 1, 2, 3), false);
    equal(!SIMD.Float32x4(0, 0, 0, 0), false);
    equal(SIMD.Float32x4(0, 1, 2, 3) ? 1 : 2, 1);
    equal(SIMD.Float32x4(0, 0, 0, 0) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Float32x4 value semantics', function() {
    var y = SIMD.Float32x4(0, 0, 0, 0);
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
    equal(y == SIMD.Float32x4(0, 0, 0, 0), true);
    equal(y == SIMD.Float32x4(0, 0, 0, 1), false);
    equal(y != SIMD.Float32x4(0, 0, 0, 0), false);
    equal(y != SIMD.Float32x4(0, 0, 0, 1), true);
    equal(y === SIMD.Float32x4(0, 0, 0, 0), true);
    equal(y === SIMD.Float32x4(0, 0, 0, 1), false);
    equal(y !== SIMD.Float32x4(0, 0, 0, 0), false);
    equal(y !== SIMD.Float32x4(0, 0, 0, 1), true);
});

test('Int32x4 operators', function() {
    throws(function() {Number(SIMD.Int32x4(0, 1, 2, 3))});
    throws(function() {+SIMD.Int32x4(0, 1, 2, 3)});
    throws(function() {-SIMD.Int32x4(0, 1, 2, 3)});
    throws(function() {~SIMD.Int32x4(0, 1, 2, 3), -1});
    throws(function() {Math.fround(SIMD.Int32x4(0, 1, 2, 3))});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3)|0});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3)&0});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3)^0});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3)>>>0});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3)>>0});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3)<<0});
    throws(function() {(SIMD.Int32x4(0, 1, 2, 3) + SIMD.Int32x4(4, 5, 6, 7))});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3) - SIMD.Int32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3) * SIMD.Int32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3) / SIMD.Int32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3) % SIMD.Int32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3) < SIMD.Int32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3) > SIMD.Int32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3) <= SIMD.Int32x4(4, 5, 6, 7)});
    throws(function() {SIMD.Int32x4(0, 1, 2, 3) >= SIMD.Int32x4(4, 5, 6, 7)});
    equal(SIMD.Int32x4(0, 1, 2, 3).toString(), "Int32x4(0, 1, 2, 3)");
    equal(SIMD.Int32x4(0, 1, 2, 3).toLocaleString(), "Int32x4(0, 1, 2, 3)");
    throws(function() { SIMD.Int32x4(0, 1, 2, 3)(); });
    equal(SIMD.Int32x4(0, 1, 2, 3)[0], undefined);
    equal(SIMD.Int32x4(0, 1, 2, 3).a, undefined);
    equal(!SIMD.Int32x4(0, 1, 2, 3), false);
    equal(!SIMD.Int32x4(0, 0, 0, 0), false);
    equal(SIMD.Int32x4(0, 1, 2, 3) ? 1 : 2, 1);
    equal(SIMD.Int32x4(0, 0, 0, 0) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Int32x4 value semantics', function() {
    var y = SIMD.Int32x4(0, 0, 0, 0);
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
    equal(y == SIMD.Int32x4(0, 0, 0, 0), true);
    equal(y == SIMD.Int32x4(0, 0, 0, 1), false);
    equal(y != SIMD.Int32x4(0, 0, 0, 0), false);
    equal(y != SIMD.Int32x4(0, 0, 0, 1), true);
    equal(y === SIMD.Int32x4(0, 0, 0, 0), true);
    equal(y === SIMD.Int32x4(0, 0, 0, 1), false);
    equal(y !== SIMD.Int32x4(0, 0, 0, 0), false);
    equal(y !== SIMD.Int32x4(0, 0, 0, 1), true);
});

test('Float64x2 operators', function() {
    throws(function() {Number(SIMD.Float64x2(0, 1))});
    throws(function() {+SIMD.Float64x2(0, 1)});
    throws(function() {-SIMD.Float64x2(0, 1)});
    throws(function() {~SIMD.Float64x2(0, 1), -1});
    throws(function() {Math.fround(SIMD.Float64x2(0, 1))});
    throws(function() {SIMD.Float64x2(0, 1)|0});
    throws(function() {SIMD.Float64x2(0, 1)&0});
    throws(function() {SIMD.Float64x2(0, 1)^0});
    throws(function() {SIMD.Float64x2(0, 1)>>>0});
    throws(function() {SIMD.Float64x2(0, 1)>>0});
    throws(function() {SIMD.Float64x2(0, 1)<<0});
    throws(function() {(SIMD.Float64x2(0, 1) + SIMD.Float64x2(0, 1))});
    throws(function() {SIMD.Float64x2(0, 1) - SIMD.Float64x2(0, 1)});
    throws(function() {SIMD.Float64x2(0, 1) * SIMD.Float64x2(0, 1)});
    throws(function() {SIMD.Float64x2(0, 1) / SIMD.Float64x2(0, 1)});
    throws(function() {SIMD.Float64x2(0, 1) % SIMD.Float64x2(0, 1)});
    throws(function() {SIMD.Float64x2(0, 1) < SIMD.Float64x2(0, 1)});
    throws(function() {SIMD.Float64x2(0, 1) > SIMD.Float64x2(0, 1)});
    throws(function() {SIMD.Float64x2(0, 1) <= SIMD.Float64x2(0, 1)});
    throws(function() {SIMD.Float64x2(0, 1) >= SIMD.Float64x2(0, 1)});
    equal(SIMD.Float64x2(0, 1).toString(), "Float64x2(0, 1)");
    equal(SIMD.Float64x2(0, 1).toLocaleString(), "Float64x2(0, 1)");
    throws(function() { SIMD.Float64x2(0, 1)(); });
    equal(SIMD.Float64x2(0, 1)[0], undefined);
    equal(SIMD.Float64x2(0, 1).a, undefined);
    equal(!SIMD.Float64x2(0, 1), false);
    equal(!SIMD.Float64x2(0, 1), false);
    equal(SIMD.Float64x2(0, 1) ? 1 : 2, 1);
    equal(SIMD.Float64x2(0, 1) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Float64x2 value semantics', function() {
    var y = SIMD.Float64x2(0, 0);
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
    equal(y == SIMD.Float64x2(0, 0), true);
    equal(y == SIMD.Float64x2(0, 1), false);
    equal(y != SIMD.Float64x2(0, 0), false);
    equal(y != SIMD.Float64x2(0, 1), true);
    equal(y === SIMD.Float64x2(0, 0), true);
    equal(y === SIMD.Float64x2(0, 1), false);
    equal(y !== SIMD.Float64x2(0, 0), false);
    equal(y !== SIMD.Float64x2(0, 1), true);
});

test('Int8x16 operators', function() {
    throws(function() {Number(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15))});
    throws(function() {+SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {-SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {~SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15), -1});
    throws(function() {Math.fround(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15))});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)|0});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)&0});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)^0});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)>>>0});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)>>0});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)<<0});
    throws(function() {(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) + SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15))});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) - SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) * SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) / SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) % SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) < SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) > SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) <= SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    throws(function() {SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) >= SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)});
    equal(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15).toString(), "Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)");
    equal(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15).toLocaleString(), "Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)");
    throws(function() { SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)(); });
    equal(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)[0], undefined);
    equal(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15).a, undefined);
    equal(!SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15), false);
    equal(!SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15), false);
    equal(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) ? 1 : 2, 1);
    equal(SIMD.Int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Int8x16 value semantics', function() {
    var y = SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
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
    equal(y == SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), true);
    equal(y == SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1), false);
    equal(y != SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), false);
    equal(y != SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1), true);
    equal(y === SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), true);
    equal(y === SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1), false);
    equal(y !== SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), false);
    equal(y !== SIMD.Int8x16(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1), true);
});

test('Int16x8 operators', function() {
    throws(function() {Number(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7))});
    throws(function() {+SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {-SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {~SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7), -1});
    throws(function() {Math.fround(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7))});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)|0});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)&0});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)^0});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)>>>0});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)>>0});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)<<0});
    throws(function() {(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) + SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7))});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) - SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) * SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) / SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) % SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) < SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) > SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) <= SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    throws(function() {SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) >= SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)});
    equal(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7).toString(), "Int16x8(0, 1, 2, 3, 4, 5, 6, 7)");
    equal(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7).toLocaleString(), "Int16x8(0, 1, 2, 3, 4, 5, 6, 7)");
    throws(function() { SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)(); });
    equal(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7)[0], undefined);
    equal(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7).a, undefined);
    equal(!SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7), false);
    equal(!SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7), false);
    equal(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) ? 1 : 2, 1);
    equal(SIMD.Int16x8(0, 1, 2, 3, 4, 5, 6, 7) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Int16x8 value semantics', function() {
    var y = SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 0);
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
    equal(y == SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 0), true);
    equal(y == SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 1), false);
    equal(y != SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 0), false);
    equal(y != SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 1), true);
    equal(y === SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 0), true);
    equal(y === SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 1), false);
    equal(y !== SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 0), false);
    equal(y !== SIMD.Int16x8(0, 0, 0, 0, 0, 0, 0, 1), true);
});

test('Bool64x2 operators', function() {
    throws(function() {Number(SIMD.Bool64x2(true, false))});
    throws(function() {+SIMD.Bool64x2(true, false)});
    throws(function() {-SIMD.Bool64x2(true, false)});
    throws(function() {~SIMD.Bool64x2(true, false), -1});
    throws(function() {Math.fround(SIMD.Bool64x2(true, false))});
    throws(function() {SIMD.Bool64x2(true, false)|0});
    throws(function() {SIMD.Bool64x2(true, false)&0});
    throws(function() {SIMD.Bool64x2(true, false)^0});
    throws(function() {SIMD.Bool64x2(true, false)>>>0});
    throws(function() {SIMD.Bool64x2(true, false)>>0});
    throws(function() {SIMD.Bool64x2(true, false)<<0});
    throws(function() {(SIMD.Bool64x2(true, false) + SIMD.Bool64x2(false, true))});
    throws(function() {SIMD.Bool64x2(true, false) - SIMD.Bool64x2(false, true)});
    throws(function() {SIMD.Bool64x2(true, false) * SIMD.Bool64x2(false, true)});
    throws(function() {SIMD.Bool64x2(true, false) / SIMD.Bool64x2(false, true)});
    throws(function() {SIMD.Bool64x2(true, false) % SIMD.Bool64x2(false, true)});
    throws(function() {SIMD.Bool64x2(true, false) < SIMD.Bool64x2(false, true)});
    throws(function() {SIMD.Bool64x2(true, false) > SIMD.Bool64x2(false, true)});
    throws(function() {SIMD.Bool64x2(true, false) <= SIMD.Bool64x2(false, true)});
    throws(function() {SIMD.Bool64x2(true, false) >= SIMD.Bool64x2(false, true)});
    equal(SIMD.Bool64x2(true, false).toString(), "Bool64x2(true, false)");
    equal(SIMD.Bool64x2(true, false).toLocaleString(), "Bool64x2(true, false)");
    throws(function() { SIMD.Bool64x2(true, false)(); });
    equal(SIMD.Bool64x2(true, false)[0], undefined);
    equal(SIMD.Bool64x2(true, false).a, undefined);
    equal(!SIMD.Bool64x2(true, false), false);
    equal(!SIMD.Bool64x2(false, false), false);
    equal(SIMD.Bool64x2(true, false) ? 1 : 2, 1);
    equal(SIMD.Bool64x2(false, false) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Bool64x2 value semantics', function() {
    var y = SIMD.Bool64x2(false, false, false, false);
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
    equal(y == SIMD.Bool64x2(false, false), true);
    equal(y == SIMD.Bool64x2(false, true), false);
    equal(y != SIMD.Bool64x2(false, false), false);
    equal(y != SIMD.Bool64x2(false, true), true);
    equal(y === SIMD.Bool64x2(false, false), true);
    equal(y === SIMD.Bool64x2(false, true), false);
    equal(y !== SIMD.Bool64x2(false, false), false);
    equal(y !== SIMD.Bool64x2(false, true), true);
});

test('Bool32x4 operators', function() {
    throws(function() {Number(SIMD.Bool32x4(true, false, false, true))});
    throws(function() {+SIMD.Bool32x4(true, false, false, true)});
    throws(function() {-SIMD.Bool32x4(true, false, false, true)});
    throws(function() {~SIMD.Bool32x4(true, false, false, true), -1});
    throws(function() {Math.fround(SIMD.Bool32x4(true, false, false, true))});
    throws(function() {SIMD.Bool32x4(true, false, false, true)|0});
    throws(function() {SIMD.Bool32x4(true, false, false, true)&0});
    throws(function() {SIMD.Bool32x4(true, false, false, true)^0});
    throws(function() {SIMD.Bool32x4(true, false, false, true)>>>0});
    throws(function() {SIMD.Bool32x4(true, false, false, true)>>0});
    throws(function() {SIMD.Bool32x4(true, false, false, true)<<0});
    throws(function() {(SIMD.Bool32x4(true, false, false, true) + SIMD.Bool32x4(false, true, false, true))});
    throws(function() {SIMD.Bool32x4(true, false, false, true) - SIMD.Bool32x4(false, true, false, true)});
    throws(function() {SIMD.Bool32x4(true, false, false, true) * SIMD.Bool32x4(false, true, false, true)});
    throws(function() {SIMD.Bool32x4(true, false, false, true) / SIMD.Bool32x4(false, true, false, true)});
    throws(function() {SIMD.Bool32x4(true, false, false, true) % SIMD.Bool32x4(false, true, false, true)});
    throws(function() {SIMD.Bool32x4(true, false, false, true) < SIMD.Bool32x4(false, true, false, true)});
    throws(function() {SIMD.Bool32x4(true, false, false, true) > SIMD.Bool32x4(false, true, false, true)});
    throws(function() {SIMD.Bool32x4(true, false, false, true) <= SIMD.Bool32x4(false, true, false, true)});
    throws(function() {SIMD.Bool32x4(true, false, false, true) >= SIMD.Bool32x4(false, true, false, true)});
    equal(SIMD.Bool32x4(true, false, false, true).toString(), "Bool32x4(true, false, false, true)");
    equal(SIMD.Bool32x4(true, false, false, true).toLocaleString(), "Bool32x4(true, false, false, true)");
    throws(function() { SIMD.Bool32x4(true, false, false, true)(); });
    equal(SIMD.Bool32x4(true, false, false, true)[0], undefined);
    equal(SIMD.Bool32x4(true, false, false, true).a, undefined);
    equal(!SIMD.Bool32x4(true, false, false, true), false);
    equal(!SIMD.Bool32x4(false, false, false, false), false);
    equal(SIMD.Bool32x4(true, false, false, true) ? 1 : 2, 1);
    equal(SIMD.Bool32x4(false, false, false, false) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Bool32x4 value semantics', function() {
    var y = SIMD.Bool32x4(false, false, false, false);
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
    equal(y == SIMD.Bool32x4(false, false, false, false), true);
    equal(y == SIMD.Bool32x4(false, false, false, true), false);
    equal(y != SIMD.Bool32x4(false, false, false, false), false);
    equal(y != SIMD.Bool32x4(false, false, false, true), true);
    equal(y === SIMD.Bool32x4(false, false, false, false), true);
    equal(y === SIMD.Bool32x4(false, false, false, true), false);
    equal(y !== SIMD.Bool32x4(false, false, false, false), false);
    equal(y !== SIMD.Bool32x4(false, false, false, true), true);
});

test('Bool16x8 operators', function() {
    throws(function() {Number(SIMD.Bool16x8(true, false, false, true, true, false, true, false))});
    throws(function() {+SIMD.Bool16x8(true, false, false, true, true, false, true, false)});
    throws(function() {-SIMD.Bool16x8(true, false, false, true, true, false, true, false)});
    throws(function() {~SIMD.Bool16x8(true, false, false, true, true, false, true, false), -1});
    throws(function() {Math.fround(SIMD.Bool16x8(true, false, false, true, true, false, true, false))});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false)|0});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false)&0});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false)^0});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false)>>>0});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false)>>0});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false)<<0});
    throws(function() {(SIMD.Bool16x8(true, false, false, true, true, false, true, false) + SIMD.Bool16x8(false, true, false, true, false, true, false, true))});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false) - SIMD.Bool16x8(false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false) * SIMD.Bool16x8(false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false) / SIMD.Bool16x8(false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false) % SIMD.Bool16x8(false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false) < SIMD.Bool16x8(false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false) > SIMD.Bool16x8(false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false) <= SIMD.Bool16x8(false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool16x8(true, false, false, true, true, false, true, false) >= SIMD.Bool16x8(false, true, false, true, false, true, false, true)});
    equal(SIMD.Bool16x8(true, false, false, true, true, false, true, false).toString(), "Bool16x8(true, false, false, true, true, false, true, false)");
    equal(SIMD.Bool16x8(true, false, false, true, true, false, true, false).toLocaleString(), "Bool16x8(true, false, false, true, true, false, true, false)");
    throws(function() { SIMD.Bool16x8(true, false, false, true, true, false, true, false)(); });
    equal(SIMD.Bool16x8(true, false, false, true, true, false, true, false)[0], undefined);
    equal(SIMD.Bool16x8(true, false, false, true, true, false, true, false).a, undefined);
    equal(!SIMD.Bool16x8(true, false, false, true, true, false, true, false), false);
    equal(!SIMD.Bool16x8(false, false, false, false, false, false, false, false), false);
    equal(SIMD.Bool16x8(true, false, false, true, true, false, true, false) ? 1 : 2, 1);
    equal(SIMD.Bool16x8(false, false, false, false, false, false, false, false) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Bool16x8 value semantics', function() {
    var y = SIMD.Bool16x8(false, false, false, false, false, false, false, false);
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
    equal(y == SIMD.Bool16x8(false, false, false, false, false, false, false, false), true);
    equal(y == SIMD.Bool16x8(false, false, false, false, false, false, false, true), false);
    equal(y != SIMD.Bool16x8(false, false, false, false, false, false, false, false), false);
    equal(y != SIMD.Bool16x8(false, false, false, false, false, false, false, true), true);
    equal(y === SIMD.Bool16x8(false, false, false, false, false, false, false, false), true);
    equal(y === SIMD.Bool16x8(false, false, false, false, false, false, false, true), false);
    equal(y !== SIMD.Bool16x8(false, false, false, false, false, false, false, false), false);
    equal(y !== SIMD.Bool16x8(false, false, false, false, false, false, false, true), true);
});

test('Bool8x16 operators', function() {
    throws(function() {Number(SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false))});
    throws(function() {+SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)});
    throws(function() {-SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)});
    throws(function() {~SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false), -1});
    throws(function() {Math.fround(SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false))});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)|0});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)&0});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)^0});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)>>>0});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)>>0});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)<<0});
    throws(function() {(SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) + SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true))});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) - SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) * SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) / SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) % SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) < SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) > SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) <= SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true)});
    throws(function() {SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) >= SIMD.Bool8x16(false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true)});
    equal(SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false).toString(), "Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false)");
    equal(SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false).toLocaleString(), "Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false)");
    throws(function() { SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)(); });
    equal(SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false)[0], undefined);
    equal(SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false).a, undefined);
    equal(!SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false), false);
    equal(!SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false), false);
    equal(SIMD.Bool8x16(true, false, false, true, true, false, true, false, true, false, true, false, true, false, true, false) ? 1 : 2, 1);
    equal(SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false) ? 1 : 2, 1);
});

// Note: This fails in the polyfill due to the lack of value semantics.
test('Bool8x16 value semantics', function() {
    var y = SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);
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
    equal(y == SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false), true);
    equal(y == SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true), false);
    equal(y != SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false), false);
    equal(y != SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true), true);
    equal(y === SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false), true);
    equal(y === SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true), false);
    equal(y !== SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false), false);
    equal(y !== SIMD.Bool8x16(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true), true);
});

test('Bool64x2 constructor', function() {
  equal('function', typeof SIMD.Bool64x2);
  var m = SIMD.Bool64x2(false, true);
  equal(false, SIMD.Bool64x2.extractLane(m, 0));
  equal(true, SIMD.Bool64x2.extractLane(m, 1));

  throws(function() { SIMD.Bool32x4.check(m); });
  throws(function() { SIMD.Bool16x8.check(m); });
  throws(function() { SIMD.Bool8x16.check(m); });
});

test('Bool64x2 splat constructor', function() {
  equal('function', typeof SIMD.Bool64x2.splat);
  var m = SIMD.Bool64x2.splat(true);
  equal(true, SIMD.Bool64x2.extractLane(m, 0));
  equal(true, SIMD.Bool64x2.extractLane(m, 1));
  m = SIMD.Bool64x2.splat(false);
  equal(false, SIMD.Bool64x2.extractLane(m, 0));
  equal(false, SIMD.Bool64x2.extractLane(m, 1));
});

test('Bool64x2 scalar getters', function() {
  var m = SIMD.Bool64x2(true, false);
  equal(true, SIMD.Bool64x2.extractLane(m, 0));
  equal(false, SIMD.Bool64x2.extractLane(m, 1));
});

test('Bool64x2 replaceLane', function() {
  var a = SIMD.Bool64x2(false, false);
  var c = SIMD.Bool64x2.replaceLane(a, 0, true);
  equal(true, SIMD.Bool64x2.extractLane(c, 0));
  equal(false, SIMD.Bool64x2.extractLane(c, 1));
  c = SIMD.Bool64x2.replaceLane(c, 1, true);
  equal(true, SIMD.Bool64x2.extractLane(c, 0));
  equal(true, SIMD.Bool64x2.extractLane(c, 1));
  c = SIMD.Bool64x2.replaceLane(c, 0, false);
  equal(false, SIMD.Bool64x2.extractLane(c, 0));
  equal(true, SIMD.Bool64x2.extractLane(c, 1));

  function testIndexCheck(index) {
    throws(function() { SIMD.Bool64x2.replaceLane(a, index, false); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(2);
});

test('Bool64x2 allTrue', function () {
  var v00 = SIMD.Bool64x2(false, false);
  var v01 = SIMD.Bool64x2(false, true);
  var v10 = SIMD.Bool64x2(true, false);
  var v11 = SIMD.Bool64x2(true, true);
  equal(SIMD.Bool64x2.allTrue(v00), false);
  equal(SIMD.Bool64x2.allTrue(v01), false);
  equal(SIMD.Bool64x2.allTrue(v10), false);
  equal(SIMD.Bool64x2.allTrue(v11), true);
});

test('Bool64x2 anyTrue', function () {
  var v00 = SIMD.Bool64x2(false, false);
  var v01 = SIMD.Bool64x2(false, true);
  var v10 = SIMD.Bool64x2(true, false);
  var v11 = SIMD.Bool64x2(true, true);
  equal(SIMD.Bool64x2.anyTrue(v00), false);
  equal(SIMD.Bool64x2.anyTrue(v01), true);
  equal(SIMD.Bool64x2.anyTrue(v10), true);
  equal(SIMD.Bool64x2.anyTrue(v11), true);
});

test('Bool64x2 and', function() {
  var m = SIMD.Bool64x2(true, true);
  var n = SIMD.Bool64x2(true, false);
  var o = SIMD.Bool64x2.and(m,n);
  equal(true, SIMD.Bool64x2.extractLane(o, 0));
  equal(false, SIMD.Bool64x2.extractLane(o, 1));
  m = SIMD.Bool64x2(false, false);
  n = SIMD.Bool64x2(true, false);
  o = SIMD.Bool64x2.and(m,n);
  equal(false, SIMD.Bool64x2.extractLane(o, 0));
  equal(false, SIMD.Bool64x2.extractLane(o, 1));
});

test('Bool64x2 or', function() {
  var m = SIMD.Bool64x2(true, true);
  var n = SIMD.Bool64x2(true, false);
  var o = SIMD.Bool64x2.or(m,n);
  equal(true, SIMD.Bool64x2.extractLane(o, 0));
  equal(true, SIMD.Bool64x2.extractLane(o, 1));
  m = SIMD.Bool64x2(false, false);
  n = SIMD.Bool64x2(true, false);
  o = SIMD.Bool64x2.or(m,n);
  equal(true, SIMD.Bool64x2.extractLane(o, 0));
  equal(false, SIMD.Bool64x2.extractLane(o, 1));
});

test('Bool64x2 xor', function() {
  var m = SIMD.Bool64x2(true, true);
  var n = SIMD.Bool64x2(true, false);
  var o = SIMD.Bool64x2.xor(m,n);
  equal(false, SIMD.Bool64x2.extractLane(o, 0));
  equal(true, SIMD.Bool64x2.extractLane(o, 1));
  m = SIMD.Bool64x2(false, false);
  n = SIMD.Bool64x2(true, false);
  o = SIMD.Bool64x2.xor(m,n);
  equal(true, SIMD.Bool64x2.extractLane(o, 0));
  equal(false, SIMD.Bool64x2.extractLane(o, 1));
});

test('Bool64x2 not', function() {
  var m = SIMD.Bool64x2(true, false);
  var o = SIMD.Bool64x2.not(m);
  equal(false, SIMD.Bool64x2.extractLane(o, 0));
  equal(true, SIMD.Bool64x2.extractLane(o, 1));
});

test('Bool64x2 comparisons', function() {
  var m = SIMD.Bool64x2(true, true);
  var n = SIMD.Bool64x2(false, true);
  var cmp;

  cmp = SIMD.Bool64x2.equal(m, n);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Bool64x2.notEqual(m, n);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));
});

test('Bool64x2 select', function() {
  var m = SIMD.Bool64x2(true, false);
  var t = SIMD.Bool64x2(true, true);
  var f = SIMD.Bool64x2(false, false);
  var s = SIMD.Bool64x2.select(m, t, f);
  equal(true, SIMD.Bool64x2.extractLane(s, 0));
  equal(false, SIMD.Bool64x2.extractLane(s, 1));
});

test('Bool32x4 constructor', function() {
  equal('function', typeof SIMD.Bool32x4);
  var m = SIMD.Bool32x4(false, true, true, false);
  equal(false, SIMD.Bool32x4.extractLane(m, 0));
  equal(true, SIMD.Bool32x4.extractLane(m, 1));
  equal(true, SIMD.Bool32x4.extractLane(m, 2));
  equal(false, SIMD.Bool32x4.extractLane(m, 3));

  throws(function() { SIMD.Bool64x2.check(m); });
  throws(function() { SIMD.Bool16x8.check(m); });
  throws(function() { SIMD.Bool8x16.check(m); });
});

test('Bool32x4 splat constructor', function() {
  equal('function', typeof SIMD.Bool32x4.splat);
  var m = SIMD.Bool32x4.splat(true);
  equal(true, SIMD.Bool32x4.extractLane(m, 0));
  equal(true, SIMD.Bool32x4.extractLane(m, 1));
  equal(true, SIMD.Bool32x4.extractLane(m, 2));
  equal(true, SIMD.Bool32x4.extractLane(m, 3));
  m = SIMD.Bool32x4.splat(false);
  equal(false, SIMD.Bool32x4.extractLane(m, 0));
  equal(false, SIMD.Bool32x4.extractLane(m, 1));
  equal(false, SIMD.Bool32x4.extractLane(m, 2));
  equal(false, SIMD.Bool32x4.extractLane(m, 3));
});

test('Bool32x4 scalar getters', function() {
  var m = SIMD.Bool32x4(true, false, true, false);
  equal(true, SIMD.Bool32x4.extractLane(m, 0));
  equal(false, SIMD.Bool32x4.extractLane(m, 1));
  equal(true, SIMD.Bool32x4.extractLane(m, 2));
  equal(false, SIMD.Bool32x4.extractLane(m, 3));
});

test('Bool32x4 replaceLane', function() {
  var a = SIMD.Bool32x4(false, false, false, false);
  var c = SIMD.Bool32x4.replaceLane(a, 0, true);
  equal(true, SIMD.Bool32x4.extractLane(c, 0));
  equal(false, SIMD.Bool32x4.extractLane(c, 1));
  equal(false, SIMD.Bool32x4.extractLane(c, 2));
  equal(false, SIMD.Bool32x4.extractLane(c, 3));
  c = SIMD.Bool32x4.replaceLane(c, 3, true);
  equal(true, SIMD.Bool32x4.extractLane(c, 0));
  equal(false, SIMD.Bool32x4.extractLane(c, 1));
  equal(false, SIMD.Bool32x4.extractLane(c, 2));
  equal(true, SIMD.Bool32x4.extractLane(c, 3));
  c = SIMD.Bool32x4.replaceLane(c, 0, false);
  equal(false, SIMD.Bool32x4.extractLane(c, 0));
  equal(false, SIMD.Bool32x4.extractLane(c, 1));
  equal(false, SIMD.Bool32x4.extractLane(c, 2));
  equal(true, SIMD.Bool32x4.extractLane(c, 3));

  function testIndexCheck(index) {
    throws(function() { SIMD.Bool32x4.replaceLane(a, index, false); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(4);
});

test('Bool32x4 allTrue', function () {
  var v00 = SIMD.Bool32x4(false, false, false, false);
  var v01 = SIMD.Bool32x4(false, true, false, false);
  var v10 = SIMD.Bool32x4(false, false, false, true);
  var v11 = SIMD.Bool32x4(true, true, true, true);
  equal(SIMD.Bool32x4.allTrue(v00), false);
  equal(SIMD.Bool32x4.allTrue(v01), false);
  equal(SIMD.Bool32x4.allTrue(v10), false);
  equal(SIMD.Bool32x4.allTrue(v11), true);
});

test('Bool32x4 anyTrue', function () {
  var v00 = SIMD.Bool32x4(false, false, false, false);
  var v01 = SIMD.Bool32x4(false, true, false, false);
  var v10 = SIMD.Bool32x4(false, false, false, true);
  var v11 = SIMD.Bool32x4(true, true, true, true);
  equal(SIMD.Bool32x4.anyTrue(v00), false);
  equal(SIMD.Bool32x4.anyTrue(v01), true);
  equal(SIMD.Bool32x4.anyTrue(v10), true);
  equal(SIMD.Bool32x4.anyTrue(v11), true);
});

test('Bool32x4 and', function() {
  var m = SIMD.Bool32x4(true, true, true, false);
  var n = SIMD.Bool32x4(true, false, true, false);
  var o = SIMD.Bool32x4.and(m,n);
  equal(true, SIMD.Bool32x4.extractLane(o, 0));
  equal(false, SIMD.Bool32x4.extractLane(o, 1));
  equal(true, SIMD.Bool32x4.extractLane(o, 2));
  equal(false, SIMD.Bool32x4.extractLane(o, 3));
  m = SIMD.Bool32x4(false, false, false, true);
  n = SIMD.Bool32x4(true, false, true, true);
  o = SIMD.Bool32x4.and(m,n);
  equal(false, SIMD.Bool32x4.extractLane(o, 0));
  equal(false, SIMD.Bool32x4.extractLane(o, 1));
  equal(false, SIMD.Bool32x4.extractLane(o, 2));
  equal(true, SIMD.Bool32x4.extractLane(o, 3));
});

test('Bool32x4 or', function() {
  var m = SIMD.Bool32x4(true, true, true, false);
  var n = SIMD.Bool32x4(true, false, true, false);
  var o = SIMD.Bool32x4.or(m,n);
  equal(true, SIMD.Bool32x4.extractLane(o, 0));
  equal(true, SIMD.Bool32x4.extractLane(o, 1));
  equal(true, SIMD.Bool32x4.extractLane(o, 2));
  equal(false, SIMD.Bool32x4.extractLane(o, 3));
  m = SIMD.Bool32x4(false, false, false, true);
  n = SIMD.Bool32x4(true, false, true, true);
  o = SIMD.Bool32x4.or(m,n);
  equal(true, SIMD.Bool32x4.extractLane(o, 0));
  equal(false, SIMD.Bool32x4.extractLane(o, 1));
  equal(true, SIMD.Bool32x4.extractLane(o, 2));
  equal(true, SIMD.Bool32x4.extractLane(o, 3));
});

test('Bool32x4 xor', function() {
  var m = SIMD.Bool32x4(true, true, true, false);
  var n = SIMD.Bool32x4(true, false, true, false);
  var o = SIMD.Bool32x4.xor(m,n);
  equal(false, SIMD.Bool32x4.extractLane(o, 0));
  equal(true, SIMD.Bool32x4.extractLane(o, 1));
  equal(false, SIMD.Bool32x4.extractLane(o, 2));
  equal(false, SIMD.Bool32x4.extractLane(o, 3));
  m = SIMD.Bool32x4(false, false, false, true);
  n = SIMD.Bool32x4(true, false, true, true);
  o = SIMD.Bool32x4.xor(m,n);
  equal(true, SIMD.Bool32x4.extractLane(o, 0));
  equal(false, SIMD.Bool32x4.extractLane(o, 1));
  equal(true, SIMD.Bool32x4.extractLane(o, 2));
  equal(false, SIMD.Bool32x4.extractLane(o, 3));
});

test('Bool32x4 not', function() {
  var m = SIMD.Bool32x4(true, false, true, false);
  var o = SIMD.Bool32x4.not(m);
  equal(false, SIMD.Bool32x4.extractLane(o, 0));
  equal(true, SIMD.Bool32x4.extractLane(o, 1));
  equal(false, SIMD.Bool32x4.extractLane(o, 2));
  equal(true, SIMD.Bool32x4.extractLane(o, 3));
});

test('Bool32x4 comparisons', function() {
  var m = SIMD.Bool32x4(true, true, false, false);
  var n = SIMD.Bool32x4(false, true, false, true);
  var cmp;

  cmp = SIMD.Bool32x4.equal(m, n);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Bool32x4.notEqual(m, n);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 3));
});

test('Bool32x4 select', function() {
  var m = SIMD.Bool32x4(true, false, true, false);
  var t = SIMD.Bool32x4(true, true, false, false);
  var f = SIMD.Bool32x4(false, false, false, true);
  var s = SIMD.Bool32x4.select(m, t, f);
  equal(true, SIMD.Bool32x4.extractLane(s, 0));
  equal(false, SIMD.Bool32x4.extractLane(s, 1));
  equal(false, SIMD.Bool32x4.extractLane(s, 2));
  equal(true, SIMD.Bool32x4.extractLane(s, 3));
});

test('Bool16x8 constructor', function() {
  equal('function', typeof SIMD.Bool16x8);
  var m = SIMD.Bool16x8(false, true, true, false, true, false, true, false);
  equal(false, SIMD.Bool16x8.extractLane(m, 0));
  equal(true, SIMD.Bool16x8.extractLane(m, 1));
  equal(true, SIMD.Bool16x8.extractLane(m, 2));
  equal(false, SIMD.Bool16x8.extractLane(m, 3));
  equal(true, SIMD.Bool16x8.extractLane(m, 4));
  equal(false, SIMD.Bool16x8.extractLane(m, 5));
  equal(true, SIMD.Bool16x8.extractLane(m, 6));
  equal(false, SIMD.Bool16x8.extractLane(m, 7));

  throws(function() { SIMD.Bool64x2.check(m); });
  throws(function() { SIMD.Bool32x4.check(m); });
  throws(function() { SIMD.Bool8x16.check(m); });
});

test('Bool16x8 splat constructor', function() {
  equal('function', typeof SIMD.Bool16x8.splat);
  var m = SIMD.Bool16x8.splat(true);
  equal(true, SIMD.Bool16x8.extractLane(m, 0));
  equal(true, SIMD.Bool16x8.extractLane(m, 1));
  equal(true, SIMD.Bool16x8.extractLane(m, 2));
  equal(true, SIMD.Bool16x8.extractLane(m, 3));
  equal(true, SIMD.Bool16x8.extractLane(m, 4));
  equal(true, SIMD.Bool16x8.extractLane(m, 5));
  equal(true, SIMD.Bool16x8.extractLane(m, 6));
  equal(true, SIMD.Bool16x8.extractLane(m, 7));
  m = SIMD.Bool16x8.splat(false);
  equal(false, SIMD.Bool16x8.extractLane(m, 0));
  equal(false, SIMD.Bool16x8.extractLane(m, 1));
  equal(false, SIMD.Bool16x8.extractLane(m, 2));
  equal(false, SIMD.Bool16x8.extractLane(m, 3));
  equal(false, SIMD.Bool16x8.extractLane(m, 4));
  equal(false, SIMD.Bool16x8.extractLane(m, 5));
  equal(false, SIMD.Bool16x8.extractLane(m, 6));
  equal(false, SIMD.Bool16x8.extractLane(m, 7));
});

test('Bool16x8 scalar getters', function() {
  var m = SIMD.Bool16x8(true, false, true, false, true, true, false, false);
  equal(true, SIMD.Bool16x8.extractLane(m, 0));
  equal(false, SIMD.Bool16x8.extractLane(m, 1));
  equal(true, SIMD.Bool16x8.extractLane(m, 2));
  equal(false, SIMD.Bool16x8.extractLane(m, 3));
  equal(true, SIMD.Bool16x8.extractLane(m, 4));
  equal(true, SIMD.Bool16x8.extractLane(m, 5));
  equal(false, SIMD.Bool16x8.extractLane(m, 6));
  equal(false, SIMD.Bool16x8.extractLane(m, 7));
});

test('Bool16x8 replaceLane', function() {
  var a = SIMD.Bool16x8(false, false, false, false, false, false, false, false);
  var c = SIMD.Bool16x8.replaceLane(a, 0, true);
  equal(true, SIMD.Bool16x8.extractLane(c, 0));
  equal(false, SIMD.Bool16x8.extractLane(c, 1));
  equal(false, SIMD.Bool16x8.extractLane(c, 2));
  equal(false, SIMD.Bool16x8.extractLane(c, 3));
  equal(false, SIMD.Bool16x8.extractLane(c, 4));
  equal(false, SIMD.Bool16x8.extractLane(c, 5));
  equal(false, SIMD.Bool16x8.extractLane(c, 6));
  equal(false, SIMD.Bool16x8.extractLane(c, 7));
  c = SIMD.Bool16x8.replaceLane(c, 3, true);
  equal(true, SIMD.Bool16x8.extractLane(c, 0));
  equal(false, SIMD.Bool16x8.extractLane(c, 1));
  equal(false, SIMD.Bool16x8.extractLane(c, 2));
  equal(true, SIMD.Bool16x8.extractLane(c, 3));
  equal(false, SIMD.Bool16x8.extractLane(c, 4));
  equal(false, SIMD.Bool16x8.extractLane(c, 5));
  equal(false, SIMD.Bool16x8.extractLane(c, 6));
  equal(false, SIMD.Bool16x8.extractLane(c, 7));
  c = SIMD.Bool16x8.replaceLane(c, 6, true);
  equal(true, SIMD.Bool16x8.extractLane(c, 0));
  equal(false, SIMD.Bool16x8.extractLane(c, 1));
  equal(false, SIMD.Bool16x8.extractLane(c, 2));
  equal(true, SIMD.Bool16x8.extractLane(c, 3));
  equal(false, SIMD.Bool16x8.extractLane(c, 4));
  equal(false, SIMD.Bool16x8.extractLane(c, 5));
  equal(true, SIMD.Bool16x8.extractLane(c, 6));
  equal(false, SIMD.Bool16x8.extractLane(c, 7));
  c = SIMD.Bool16x8.replaceLane(c, 0, false);
  equal(false, SIMD.Bool16x8.extractLane(c, 0));
  equal(false, SIMD.Bool16x8.extractLane(c, 1));
  equal(false, SIMD.Bool16x8.extractLane(c, 2));
  equal(true, SIMD.Bool16x8.extractLane(c, 3));
  equal(false, SIMD.Bool16x8.extractLane(c, 4));
  equal(false, SIMD.Bool16x8.extractLane(c, 5));
  equal(true, SIMD.Bool16x8.extractLane(c, 6));
  equal(false, SIMD.Bool16x8.extractLane(c, 7));

  function testIndexCheck(index) {
    throws(function() { SIMD.Bool16x8.replaceLane(a, index, false); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(8);
});

test('Bool16x8 allTrue', function () {
  var v00 = SIMD.Bool16x8(false, false, false, false, false, false, false, false);
  var v01 = SIMD.Bool16x8(false, true, false, false, true, true, true, true);
  var v10 = SIMD.Bool16x8(false, false, false, true, true, true, true, true);
  var v11 = SIMD.Bool16x8(true, true, true, true, true, true, true, true);
  equal(SIMD.Bool16x8.allTrue(v00), false);
  equal(SIMD.Bool16x8.allTrue(v01), false);
  equal(SIMD.Bool16x8.allTrue(v10), false);
  equal(SIMD.Bool16x8.allTrue(v11), true);
});

test('Bool16x8 anyTrue', function () {
  var v00 = SIMD.Bool16x8(false, false, false, false, false, false, false, false);
  var v01 = SIMD.Bool16x8(false, true, false, false, false, false, false, false);
  var v10 = SIMD.Bool16x8(false, false, false, false, false, false, false, true);
  var v11 = SIMD.Bool16x8(true, true, true, true, true, true, true, true);
  equal(SIMD.Bool16x8.anyTrue(v00), false);
  equal(SIMD.Bool16x8.anyTrue(v01), true);
  equal(SIMD.Bool16x8.anyTrue(v10), true);
  equal(SIMD.Bool16x8.anyTrue(v11), true);
});

test('Bool16x8 and', function() {
  var m = SIMD.Bool16x8(true, true, true, true, false, false, false, false);
  var n = SIMD.Bool16x8(true, false, true, false, true, true, false, false);
  var o = SIMD.Bool16x8.and(m,n);
  equal(true, SIMD.Bool16x8.extractLane(o, 0));
  equal(false, SIMD.Bool16x8.extractLane(o, 1));
  equal(true, SIMD.Bool16x8.extractLane(o, 2));
  equal(false, SIMD.Bool16x8.extractLane(o, 3));
  equal(false, SIMD.Bool16x8.extractLane(o, 4));
  equal(false, SIMD.Bool16x8.extractLane(o, 5));
  equal(false, SIMD.Bool16x8.extractLane(o, 6));
  equal(false, SIMD.Bool16x8.extractLane(o, 7));
  m = SIMD.Bool16x8(false, false, false, true, true, true, true, false);
  n = SIMD.Bool16x8(true, false, true, true, false, true, false, false);
  o = SIMD.Bool16x8.and(m,n);
  equal(false, SIMD.Bool16x8.extractLane(o, 0));
  equal(false, SIMD.Bool16x8.extractLane(o, 1));
  equal(false, SIMD.Bool16x8.extractLane(o, 2));
  equal(true, SIMD.Bool16x8.extractLane(o, 3));
  equal(false, SIMD.Bool16x8.extractLane(o, 4));
  equal(true, SIMD.Bool16x8.extractLane(o, 5));
  equal(false, SIMD.Bool16x8.extractLane(o, 6));
  equal(false, SIMD.Bool16x8.extractLane(o, 7));
});

test('Bool16x8 or', function() {
  var m = SIMD.Bool16x8(true, true, true, true, false, false, false, false);
  var n = SIMD.Bool16x8(true, false, true, false, true, true, false, false);
  var o = SIMD.Bool16x8.or(m,n);
  equal(true, SIMD.Bool16x8.extractLane(o, 0));
  equal(true, SIMD.Bool16x8.extractLane(o, 1));
  equal(true, SIMD.Bool16x8.extractLane(o, 2));
  equal(true, SIMD.Bool16x8.extractLane(o, 3));
  equal(true, SIMD.Bool16x8.extractLane(o, 4));
  equal(true, SIMD.Bool16x8.extractLane(o, 5));
  equal(false, SIMD.Bool16x8.extractLane(o, 6));
  equal(false, SIMD.Bool16x8.extractLane(o, 7));
  m = SIMD.Bool16x8(false, false, false, true, true, true, true, false);
  n = SIMD.Bool16x8(true, false, true, true, false, true, false, false);
  o = SIMD.Bool16x8.or(m,n);
  equal(true, SIMD.Bool16x8.extractLane(o, 0));
  equal(false, SIMD.Bool16x8.extractLane(o, 1));
  equal(true, SIMD.Bool16x8.extractLane(o, 2));
  equal(true, SIMD.Bool16x8.extractLane(o, 3));
  equal(true, SIMD.Bool16x8.extractLane(o, 4));
  equal(true, SIMD.Bool16x8.extractLane(o, 5));
  equal(true, SIMD.Bool16x8.extractLane(o, 6));
  equal(false, SIMD.Bool16x8.extractLane(o, 7));
});

test('Bool16x8 xor', function() {
  var m = SIMD.Bool16x8(true, true, true, true, false, false, false, false);
  var n = SIMD.Bool16x8(true, false, true, false, true, true, false, false);
  var o = SIMD.Bool16x8.xor(m,n);
  equal(false, SIMD.Bool16x8.extractLane(o, 0));
  equal(true, SIMD.Bool16x8.extractLane(o, 1));
  equal(false, SIMD.Bool16x8.extractLane(o, 2));
  equal(true, SIMD.Bool16x8.extractLane(o, 3));
  equal(true, SIMD.Bool16x8.extractLane(o, 4));
  equal(true, SIMD.Bool16x8.extractLane(o, 5));
  equal(false, SIMD.Bool16x8.extractLane(o, 6));
  equal(false, SIMD.Bool16x8.extractLane(o, 7));
  m = SIMD.Bool16x8(false, false, false, true, true, true, true, false);
  n = SIMD.Bool16x8(true, false, true, true, false, true, false, false);
  o = SIMD.Bool16x8.xor(m,n);
  equal(true, SIMD.Bool16x8.extractLane(o, 0));
  equal(false, SIMD.Bool16x8.extractLane(o, 1));
  equal(true, SIMD.Bool16x8.extractLane(o, 2));
  equal(false, SIMD.Bool16x8.extractLane(o, 3));
  equal(true, SIMD.Bool16x8.extractLane(o, 4));
  equal(false, SIMD.Bool16x8.extractLane(o, 5));
  equal(true, SIMD.Bool16x8.extractLane(o, 6));
  equal(false, SIMD.Bool16x8.extractLane(o, 7));
});

test('Bool16x8 not', function() {
  var m = SIMD.Bool16x8(true, false, true, false, true, true, false, false);
  var o = SIMD.Bool16x8.not(m);
  equal(false, SIMD.Bool16x8.extractLane(o, 0));
  equal(true, SIMD.Bool16x8.extractLane(o, 1));
  equal(false, SIMD.Bool16x8.extractLane(o, 2));
  equal(true, SIMD.Bool16x8.extractLane(o, 3));
  equal(false, SIMD.Bool16x8.extractLane(o, 4));
  equal(false, SIMD.Bool16x8.extractLane(o, 5));
  equal(true, SIMD.Bool16x8.extractLane(o, 6));
  equal(true, SIMD.Bool16x8.extractLane(o, 7));
});

test('Bool16x8 comparisons', function() {
  var m = SIMD.Bool16x8(true, true, false, false, true, true, true, true);
  var n = SIMD.Bool16x8(false, true, false, true, false, true, false, true);
  var cmp;

  cmp = SIMD.Bool16x8.equal(m, n);
  equal(false, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Bool16x8.notEqual(m, n);
  equal(true, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 7));
});

test('Bool16x8 select', function() {
  var m = SIMD.Bool16x8(true, false, true, false, true, false, true, false);
  var t = SIMD.Bool16x8(true, true, false, false, true, true, false, false);
  var f = SIMD.Bool16x8(false, false, false, true, true, true, true, false);
  var s = SIMD.Bool16x8.select(m, t, f);
  equal(true, SIMD.Bool16x8.extractLane(s, 0));
  equal(false, SIMD.Bool16x8.extractLane(s, 1));
  equal(false, SIMD.Bool16x8.extractLane(s, 2));
  equal(true, SIMD.Bool16x8.extractLane(s, 3));
  equal(true, SIMD.Bool16x8.extractLane(s, 4));
  equal(true, SIMD.Bool16x8.extractLane(s, 5));
  equal(false, SIMD.Bool16x8.extractLane(s, 6));
  equal(false, SIMD.Bool16x8.extractLane(s, 7));
});

test('Bool8x16 constructor', function() {
  equal('function', typeof SIMD.Bool8x16);
  var m = SIMD.Bool8x16(false, true, true, false, true, false, true, false,
                        true, false, false, true, false, true, false, true);
  equal(false, SIMD.Bool8x16.extractLane(m, 0));
  equal(true, SIMD.Bool8x16.extractLane(m, 1));
  equal(true, SIMD.Bool8x16.extractLane(m, 2));
  equal(false, SIMD.Bool8x16.extractLane(m, 3));
  equal(true, SIMD.Bool8x16.extractLane(m, 4));
  equal(false, SIMD.Bool8x16.extractLane(m, 5));
  equal(true, SIMD.Bool8x16.extractLane(m, 6));
  equal(false, SIMD.Bool8x16.extractLane(m, 7));
  equal(true, SIMD.Bool8x16.extractLane(m, 8));
  equal(false, SIMD.Bool8x16.extractLane(m, 9));
  equal(false, SIMD.Bool8x16.extractLane(m, 10));
  equal(true, SIMD.Bool8x16.extractLane(m, 11));
  equal(false, SIMD.Bool8x16.extractLane(m, 12));
  equal(true, SIMD.Bool8x16.extractLane(m, 13));
  equal(false, SIMD.Bool8x16.extractLane(m, 14));
  equal(true, SIMD.Bool8x16.extractLane(m, 15));

  throws(function() { SIMD.Bool64x2.check(m); });
  throws(function() { SIMD.Bool32x4.check(m); });
  throws(function() { SIMD.Bool16x8.check(m); });
});

test('Bool8x16 splat constructor', function() {
  equal('function', typeof SIMD.Bool8x16.splat);
  var m = SIMD.Bool8x16.splat(true);
  equal(true, SIMD.Bool8x16.extractLane(m, 0));
  equal(true, SIMD.Bool8x16.extractLane(m, 1));
  equal(true, SIMD.Bool8x16.extractLane(m, 2));
  equal(true, SIMD.Bool8x16.extractLane(m, 3));
  equal(true, SIMD.Bool8x16.extractLane(m, 4));
  equal(true, SIMD.Bool8x16.extractLane(m, 5));
  equal(true, SIMD.Bool8x16.extractLane(m, 6));
  equal(true, SIMD.Bool8x16.extractLane(m, 7));
  equal(true, SIMD.Bool8x16.extractLane(m, 8));
  equal(true, SIMD.Bool8x16.extractLane(m, 9));
  equal(true, SIMD.Bool8x16.extractLane(m, 10));
  equal(true, SIMD.Bool8x16.extractLane(m, 11));
  equal(true, SIMD.Bool8x16.extractLane(m, 12));
  equal(true, SIMD.Bool8x16.extractLane(m, 13));
  equal(true, SIMD.Bool8x16.extractLane(m, 14));
  equal(true, SIMD.Bool8x16.extractLane(m, 15));
  m = SIMD.Bool8x16.splat(false);
  equal(false, SIMD.Bool8x16.extractLane(m, 0));
  equal(false, SIMD.Bool8x16.extractLane(m, 1));
  equal(false, SIMD.Bool8x16.extractLane(m, 2));
  equal(false, SIMD.Bool8x16.extractLane(m, 3));
  equal(false, SIMD.Bool8x16.extractLane(m, 4));
  equal(false, SIMD.Bool8x16.extractLane(m, 5));
  equal(false, SIMD.Bool8x16.extractLane(m, 6));
  equal(false, SIMD.Bool8x16.extractLane(m, 7));
  equal(false, SIMD.Bool8x16.extractLane(m, 8));
  equal(false, SIMD.Bool8x16.extractLane(m, 9));
  equal(false, SIMD.Bool8x16.extractLane(m, 10));
  equal(false, SIMD.Bool8x16.extractLane(m, 11));
  equal(false, SIMD.Bool8x16.extractLane(m, 12));
  equal(false, SIMD.Bool8x16.extractLane(m, 13));
  equal(false, SIMD.Bool8x16.extractLane(m, 14));
  equal(false, SIMD.Bool8x16.extractLane(m, 15));
});

test('Bool8x16 scalar getters', function() {
  var m = SIMD.Bool8x16(true, false, true, false, true, true, false, false,
                        false, true, false, true, false, false, true, true);
  equal(true, SIMD.Bool8x16.extractLane(m, 0));
  equal(false, SIMD.Bool8x16.extractLane(m, 1));
  equal(true, SIMD.Bool8x16.extractLane(m, 2));
  equal(false, SIMD.Bool8x16.extractLane(m, 3));
  equal(true, SIMD.Bool8x16.extractLane(m, 4));
  equal(true, SIMD.Bool8x16.extractLane(m, 5));
  equal(false, SIMD.Bool8x16.extractLane(m, 6));
  equal(false, SIMD.Bool8x16.extractLane(m, 7));
  equal(false, SIMD.Bool8x16.extractLane(m, 8));
  equal(true, SIMD.Bool8x16.extractLane(m, 9));
  equal(false, SIMD.Bool8x16.extractLane(m, 10));
  equal(true, SIMD.Bool8x16.extractLane(m, 11));
  equal(false, SIMD.Bool8x16.extractLane(m, 12));
  equal(false, SIMD.Bool8x16.extractLane(m, 13));
  equal(true, SIMD.Bool8x16.extractLane(m, 14));
  equal(true, SIMD.Bool8x16.extractLane(m, 15));
});

test('Bool8x16 replaceLane', function() {
  var a = SIMD.Bool8x16(false, false, false, false, false, false, false, false,
                        false, false, false, false, false, false, false, false);
  var c = SIMD.Bool8x16.replaceLane(a, 0, true);
  equal(true, SIMD.Bool8x16.extractLane(c, 0));
  equal(false, SIMD.Bool8x16.extractLane(c, 1));
  equal(false, SIMD.Bool8x16.extractLane(c, 2));
  equal(false, SIMD.Bool8x16.extractLane(c, 3));
  equal(false, SIMD.Bool8x16.extractLane(c, 4));
  equal(false, SIMD.Bool8x16.extractLane(c, 5));
  equal(false, SIMD.Bool8x16.extractLane(c, 6));
  equal(false, SIMD.Bool8x16.extractLane(c, 7));
  equal(false, SIMD.Bool8x16.extractLane(c, 8));
  equal(false, SIMD.Bool8x16.extractLane(c, 9));
  equal(false, SIMD.Bool8x16.extractLane(c, 10));
  equal(false, SIMD.Bool8x16.extractLane(c, 11));
  equal(false, SIMD.Bool8x16.extractLane(c, 12));
  equal(false, SIMD.Bool8x16.extractLane(c, 13));
  equal(false, SIMD.Bool8x16.extractLane(c, 14));
  equal(false, SIMD.Bool8x16.extractLane(c, 15));
  c = SIMD.Bool8x16.replaceLane(c, 7, true);
  equal(true, SIMD.Bool8x16.extractLane(c, 0));
  equal(false, SIMD.Bool8x16.extractLane(c, 1));
  equal(false, SIMD.Bool8x16.extractLane(c, 2));
  equal(false, SIMD.Bool8x16.extractLane(c, 3));
  equal(false, SIMD.Bool8x16.extractLane(c, 4));
  equal(false, SIMD.Bool8x16.extractLane(c, 5));
  equal(false, SIMD.Bool8x16.extractLane(c, 6));
  equal(true, SIMD.Bool8x16.extractLane(c, 7));
  equal(false, SIMD.Bool8x16.extractLane(c, 8));
  equal(false, SIMD.Bool8x16.extractLane(c, 9));
  equal(false, SIMD.Bool8x16.extractLane(c, 10));
  equal(false, SIMD.Bool8x16.extractLane(c, 11));
  equal(false, SIMD.Bool8x16.extractLane(c, 12));
  equal(false, SIMD.Bool8x16.extractLane(c, 13));
  equal(false, SIMD.Bool8x16.extractLane(c, 14));
  equal(false, SIMD.Bool8x16.extractLane(c, 15));
  c = SIMD.Bool8x16.replaceLane(c, 13, true);
  equal(true, SIMD.Bool8x16.extractLane(c, 0));
  equal(false, SIMD.Bool8x16.extractLane(c, 1));
  equal(false, SIMD.Bool8x16.extractLane(c, 2));
  equal(false, SIMD.Bool8x16.extractLane(c, 3));
  equal(false, SIMD.Bool8x16.extractLane(c, 4));
  equal(false, SIMD.Bool8x16.extractLane(c, 5));
  equal(false, SIMD.Bool8x16.extractLane(c, 6));
  equal(true, SIMD.Bool8x16.extractLane(c, 7));
  equal(false, SIMD.Bool8x16.extractLane(c, 8));
  equal(false, SIMD.Bool8x16.extractLane(c, 9));
  equal(false, SIMD.Bool8x16.extractLane(c, 10));
  equal(false, SIMD.Bool8x16.extractLane(c, 11));
  equal(false, SIMD.Bool8x16.extractLane(c, 12));
  equal(true, SIMD.Bool8x16.extractLane(c, 13));
  equal(false, SIMD.Bool8x16.extractLane(c, 14));
  equal(false, SIMD.Bool8x16.extractLane(c, 15));
  c = SIMD.Bool8x16.replaceLane(c, 0, false);
  equal(false, SIMD.Bool8x16.extractLane(c, 0));
  equal(false, SIMD.Bool8x16.extractLane(c, 1));
  equal(false, SIMD.Bool8x16.extractLane(c, 2));
  equal(false, SIMD.Bool8x16.extractLane(c, 3));
  equal(false, SIMD.Bool8x16.extractLane(c, 4));
  equal(false, SIMD.Bool8x16.extractLane(c, 5));
  equal(false, SIMD.Bool8x16.extractLane(c, 6));
  equal(true, SIMD.Bool8x16.extractLane(c, 7));
  equal(false, SIMD.Bool8x16.extractLane(c, 8));
  equal(false, SIMD.Bool8x16.extractLane(c, 9));
  equal(false, SIMD.Bool8x16.extractLane(c, 10));
  equal(false, SIMD.Bool8x16.extractLane(c, 11));
  equal(false, SIMD.Bool8x16.extractLane(c, 12));
  equal(true, SIMD.Bool8x16.extractLane(c, 13));
  equal(false, SIMD.Bool8x16.extractLane(c, 14));
  equal(false, SIMD.Bool8x16.extractLane(c, 15));

  function testIndexCheck(index) {
    throws(function() { SIMD.Bool8x16.replaceLane(a, index, false); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(16);
});

test('Bool8x16 allTrue', function () {
  var v00 = SIMD.Bool8x16(false, false, false, false, false, false, false, false,
                          false, false, false, false, false, false, false, false);
  var v01 = SIMD.Bool8x16(false, true, false, false, true, true, true, true,
                          false, true, false, false, true, true, true, true);
  var v10 = SIMD.Bool8x16(false, false, false, true, true, true, true, true,
                          false, false, false, true, true, true, true, true);
  var v11 = SIMD.Bool8x16(true, true, true, true, true, true, true, true,
                          true, true, true, true, true, true, true, true);
  equal(SIMD.Bool8x16.allTrue(v00), false);
  equal(SIMD.Bool8x16.allTrue(v01), false);
  equal(SIMD.Bool8x16.allTrue(v10), false);
  equal(SIMD.Bool8x16.allTrue(v11), true);
});

test('Bool8x16 anyTrue', function () {
  var v00 = SIMD.Bool8x16(false, false, false, false, false, false, false, false,
                          false, false, false, false, false, false, false, false);
  var v01 = SIMD.Bool8x16(false, true, false, false, true, true, true, true,
                          false, true, false, false, true, true, true, true);
  var v10 = SIMD.Bool8x16(false, false, false, true, true, true, true, true,
                          false, false, false, true, true, true, true, true);
  var v11 = SIMD.Bool8x16(true, true, true, true, true, true, true, true,
                          true, true, true, true, true, true, true, true);
  equal(SIMD.Bool8x16.anyTrue(v00), false);
  equal(SIMD.Bool8x16.anyTrue(v01), true);
  equal(SIMD.Bool8x16.anyTrue(v10), true);
  equal(SIMD.Bool8x16.anyTrue(v11), true);
});

test('Bool8x16 and', function() {
  var m = SIMD.Bool8x16(true, true, true, true, false, false, false, false,
                        true, true, true, true, false, false, false, false);
  var n = SIMD.Bool8x16(true, false, true, false, true, true, false, false,
                        true, false, true, false, true, true, false, false);
  var o = SIMD.Bool8x16.and(m,n);
  equal(true, SIMD.Bool8x16.extractLane(o, 0));
  equal(false, SIMD.Bool8x16.extractLane(o, 1));
  equal(true, SIMD.Bool8x16.extractLane(o, 2));
  equal(false, SIMD.Bool8x16.extractLane(o, 3));
  equal(false, SIMD.Bool8x16.extractLane(o, 4));
  equal(false, SIMD.Bool8x16.extractLane(o, 5));
  equal(false, SIMD.Bool8x16.extractLane(o, 6));
  equal(false, SIMD.Bool8x16.extractLane(o, 7));
  equal(true, SIMD.Bool8x16.extractLane(o, 8));
  equal(false, SIMD.Bool8x16.extractLane(o, 9));
  equal(true, SIMD.Bool8x16.extractLane(o, 10));
  equal(false, SIMD.Bool8x16.extractLane(o, 11));
  equal(false, SIMD.Bool8x16.extractLane(o, 12));
  equal(false, SIMD.Bool8x16.extractLane(o, 13));
  equal(false, SIMD.Bool8x16.extractLane(o, 14));
  equal(false, SIMD.Bool8x16.extractLane(o, 15));
  m = SIMD.Bool8x16(false, false, false, true, true, true, true, false,
                    false, false, false, true, true, true, true, false);
  n = SIMD.Bool8x16(true, false, true, true, false, true, false, false,
                    true, false, true, true, false, true, false, false);
  o = SIMD.Bool8x16.and(m,n);
  equal(false, SIMD.Bool8x16.extractLane(o, 0));
  equal(false, SIMD.Bool8x16.extractLane(o, 1));
  equal(false, SIMD.Bool8x16.extractLane(o, 2));
  equal(true, SIMD.Bool8x16.extractLane(o, 3));
  equal(false, SIMD.Bool8x16.extractLane(o, 4));
  equal(true, SIMD.Bool8x16.extractLane(o, 5));
  equal(false, SIMD.Bool8x16.extractLane(o, 6));
  equal(false, SIMD.Bool8x16.extractLane(o, 7));
  equal(false, SIMD.Bool8x16.extractLane(o, 8));
  equal(false, SIMD.Bool8x16.extractLane(o, 9));
  equal(false, SIMD.Bool8x16.extractLane(o, 10));
  equal(true, SIMD.Bool8x16.extractLane(o, 11));
  equal(false, SIMD.Bool8x16.extractLane(o, 12));
  equal(true, SIMD.Bool8x16.extractLane(o, 13));
  equal(false, SIMD.Bool8x16.extractLane(o, 14));
  equal(false, SIMD.Bool8x16.extractLane(o, 15));
});

test('Bool8x16 or', function() {
  var m = SIMD.Bool8x16(true, true, true, true, false, false, false, false,
                        true, true, true, true, false, false, false, false);
  var n = SIMD.Bool8x16(true, false, true, false, true, true, false, false,
                        true, false, true, false, true, true, false, false);
  var o = SIMD.Bool8x16.or(m,n);
  equal(true, SIMD.Bool8x16.extractLane(o, 0));
  equal(true, SIMD.Bool8x16.extractLane(o, 1));
  equal(true, SIMD.Bool8x16.extractLane(o, 2));
  equal(true, SIMD.Bool8x16.extractLane(o, 3));
  equal(true, SIMD.Bool8x16.extractLane(o, 4));
  equal(true, SIMD.Bool8x16.extractLane(o, 5));
  equal(false, SIMD.Bool8x16.extractLane(o, 6));
  equal(false, SIMD.Bool8x16.extractLane(o, 7));
  equal(true, SIMD.Bool8x16.extractLane(o, 8));
  equal(true, SIMD.Bool8x16.extractLane(o, 9));
  equal(true, SIMD.Bool8x16.extractLane(o, 10));
  equal(true, SIMD.Bool8x16.extractLane(o, 11));
  equal(true, SIMD.Bool8x16.extractLane(o, 12));
  equal(true, SIMD.Bool8x16.extractLane(o, 13));
  equal(false, SIMD.Bool8x16.extractLane(o, 14));
  equal(false, SIMD.Bool8x16.extractLane(o, 15));
  m = SIMD.Bool8x16(false, false, false, true, true, true, true, false,
                    false, false, false, true, true, true, true, false);
  n = SIMD.Bool8x16(true, false, true, true, false, true, false, false,
                    true, false, true, true, false, true, false, false);
  o = SIMD.Bool8x16.or(m,n);
  equal(true, SIMD.Bool8x16.extractLane(o, 0));
  equal(false, SIMD.Bool8x16.extractLane(o, 1));
  equal(true, SIMD.Bool8x16.extractLane(o, 2));
  equal(true, SIMD.Bool8x16.extractLane(o, 3));
  equal(true, SIMD.Bool8x16.extractLane(o, 4));
  equal(true, SIMD.Bool8x16.extractLane(o, 5));
  equal(true, SIMD.Bool8x16.extractLane(o, 6));
  equal(false, SIMD.Bool8x16.extractLane(o, 7));
  equal(true, SIMD.Bool8x16.extractLane(o, 8));
  equal(false, SIMD.Bool8x16.extractLane(o, 9));
  equal(true, SIMD.Bool8x16.extractLane(o, 10));
  equal(true, SIMD.Bool8x16.extractLane(o, 11));
  equal(true, SIMD.Bool8x16.extractLane(o, 12));
  equal(true, SIMD.Bool8x16.extractLane(o, 13));
  equal(true, SIMD.Bool8x16.extractLane(o, 14));
  equal(false, SIMD.Bool8x16.extractLane(o, 15));
});

test('Bool8x16 xor', function() {
  var m = SIMD.Bool8x16(true, true, true, true, false, false, false, false,
                        true, true, true, true, false, false, false, false);
  var n = SIMD.Bool8x16(true, false, true, false, true, true, false, false,
                        true, false, true, false, true, true, false, false);
  var o = SIMD.Bool8x16.xor(m,n);
  equal(false, SIMD.Bool8x16.extractLane(o, 0));
  equal(true, SIMD.Bool8x16.extractLane(o, 1));
  equal(false, SIMD.Bool8x16.extractLane(o, 2));
  equal(true, SIMD.Bool8x16.extractLane(o, 3));
  equal(true, SIMD.Bool8x16.extractLane(o, 4));
  equal(true, SIMD.Bool8x16.extractLane(o, 5));
  equal(false, SIMD.Bool8x16.extractLane(o, 6));
  equal(false, SIMD.Bool8x16.extractLane(o, 7));
  equal(false, SIMD.Bool8x16.extractLane(o, 8));
  equal(true, SIMD.Bool8x16.extractLane(o, 9));
  equal(false, SIMD.Bool8x16.extractLane(o, 10));
  equal(true, SIMD.Bool8x16.extractLane(o, 11));
  equal(true, SIMD.Bool8x16.extractLane(o, 12));
  equal(true, SIMD.Bool8x16.extractLane(o, 13));
  equal(false, SIMD.Bool8x16.extractLane(o, 14));
  equal(false, SIMD.Bool8x16.extractLane(o, 15));
  m = SIMD.Bool8x16(false, false, false, true, true, true, true, false,
                    false, false, false, true, true, true, true, false);
  n = SIMD.Bool8x16(true, false, true, true, false, true, false, false,
                    true, false, true, true, false, true, false, false);
  o = SIMD.Bool8x16.xor(m,n);
  equal(true, SIMD.Bool8x16.extractLane(o, 0));
  equal(false, SIMD.Bool8x16.extractLane(o, 1));
  equal(true, SIMD.Bool8x16.extractLane(o, 2));
  equal(false, SIMD.Bool8x16.extractLane(o, 3));
  equal(true, SIMD.Bool8x16.extractLane(o, 4));
  equal(false, SIMD.Bool8x16.extractLane(o, 5));
  equal(true, SIMD.Bool8x16.extractLane(o, 6));
  equal(false, SIMD.Bool8x16.extractLane(o, 7));
  equal(true, SIMD.Bool8x16.extractLane(o, 8));
  equal(false, SIMD.Bool8x16.extractLane(o, 9));
  equal(true, SIMD.Bool8x16.extractLane(o, 10));
  equal(false, SIMD.Bool8x16.extractLane(o, 11));
  equal(true, SIMD.Bool8x16.extractLane(o, 12));
  equal(false, SIMD.Bool8x16.extractLane(o, 13));
  equal(true, SIMD.Bool8x16.extractLane(o, 14));
  equal(false, SIMD.Bool8x16.extractLane(o, 15));
});

test('Bool8x16 not', function() {
  var m = SIMD.Bool8x16(true, false, true, false, true, true, false, false,
                        true, false, true, false, true, true, false, false);
  var o = SIMD.Bool8x16.not(m);
  equal(false, SIMD.Bool8x16.extractLane(o, 0));
  equal(true, SIMD.Bool8x16.extractLane(o, 1));
  equal(false, SIMD.Bool8x16.extractLane(o, 2));
  equal(true, SIMD.Bool8x16.extractLane(o, 3));
  equal(false, SIMD.Bool8x16.extractLane(o, 4));
  equal(false, SIMD.Bool8x16.extractLane(o, 5));
  equal(true, SIMD.Bool8x16.extractLane(o, 6));
  equal(true, SIMD.Bool8x16.extractLane(o, 7));
  equal(false, SIMD.Bool8x16.extractLane(o, 8));
  equal(true, SIMD.Bool8x16.extractLane(o, 9));
  equal(false, SIMD.Bool8x16.extractLane(o, 10));
  equal(true, SIMD.Bool8x16.extractLane(o, 11));
  equal(false, SIMD.Bool8x16.extractLane(o, 12));
  equal(false, SIMD.Bool8x16.extractLane(o, 13));
  equal(true, SIMD.Bool8x16.extractLane(o, 14));
  equal(true, SIMD.Bool8x16.extractLane(o, 15));
});

test('Bool8x16 comparisons', function() {
  var m = SIMD.Bool8x16(true, true, false, false, true, true, true, true,
                        false, false, true, true, false, false, false, false);
  var n = SIMD.Bool8x16(false, true, false, true, false, true, false, true,
                        true, false, true, false, true, false, true, false);
  var cmp;

  cmp = SIMD.Bool8x16.equal(m, n);
  equal(false, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Bool8x16.notEqual(m, n);
  equal(true, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 15));
});

test('Bool8x16 select', function() {
  var m = SIMD.Bool8x16(true, false, true, false, true, false, true, false,
                        true, false, true, false, true, false, true, false);
  var t = SIMD.Bool8x16(true, true, false, false, true, true, false, false,
                        true, true, false, false, true, true, false, false);
  var f = SIMD.Bool8x16(false, false, false, true, true, true, true, false,
                        false, false, false, true, true, true, true, false);
  var s = SIMD.Bool8x16.select(m, t, f);
  equal(true, SIMD.Bool8x16.extractLane(s, 0));
  equal(false, SIMD.Bool8x16.extractLane(s, 1));
  equal(false, SIMD.Bool8x16.extractLane(s, 2));
  equal(true, SIMD.Bool8x16.extractLane(s, 3));
  equal(true, SIMD.Bool8x16.extractLane(s, 4));
  equal(true, SIMD.Bool8x16.extractLane(s, 5));
  equal(false, SIMD.Bool8x16.extractLane(s, 6));
  equal(false, SIMD.Bool8x16.extractLane(s, 7));
  equal(true, SIMD.Bool8x16.extractLane(s, 8));
  equal(false, SIMD.Bool8x16.extractLane(s, 9));
  equal(false, SIMD.Bool8x16.extractLane(s, 10));
  equal(true, SIMD.Bool8x16.extractLane(s, 11));
  equal(true, SIMD.Bool8x16.extractLane(s, 12));
  equal(true, SIMD.Bool8x16.extractLane(s, 13));
  equal(false, SIMD.Bool8x16.extractLane(s, 14));
  equal(false, SIMD.Bool8x16.extractLane(s, 15));
});

test('Float32x4 constructor', function() {
  notEqual(undefined, SIMD.Float32x4);  // Type.
  notEqual(undefined, SIMD.Float32x4(1.0, 2.0, 3.0, 4.0));  // New object.
});

test('simd128 types check', function() {
  var x = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var a = SIMD.Float32x4.check(x);
  equal(SIMD.Float32x4.extractLane(a, 0), SIMD.Float32x4.extractLane(x, 0));
  equal(SIMD.Float32x4.extractLane(a, 1), SIMD.Float32x4.extractLane(x, 1));
  equal(SIMD.Float32x4.extractLane(a, 2), SIMD.Float32x4.extractLane(x, 2));
  equal(SIMD.Float32x4.extractLane(a, 3), SIMD.Float32x4.extractLane(x, 3));
  throws(function() {SIMD.Float32x4.check(1)});
  throws(function() {SIMD.Float32x4.check('hi')});

  var y = SIMD.Int32x4(1, 2, 3, 4);
  var b = SIMD.Int32x4.check(y);
  equal(SIMD.Int32x4.extractLane(b, 0), SIMD.Int32x4.extractLane(y, 0));
  equal(SIMD.Int32x4.extractLane(b, 1), SIMD.Int32x4.extractLane(y, 1));
  equal(SIMD.Int32x4.extractLane(b, 2), SIMD.Int32x4.extractLane(y, 2));
  equal(SIMD.Int32x4.extractLane(b, 3), SIMD.Int32x4.extractLane(y, 3));
  throws(function() {SIMD.Int32x4.check(1)});
  throws(function() {SIMD.Int32x4.check('hi')});

  var z = SIMD.Float64x2(1.0, 2.0);
  var c = SIMD.Float64x2.check(z);
  equal(SIMD.Float64x2.extractLane(c, 0), SIMD.Float64x2.extractLane(z, 0));
  equal(SIMD.Float64x2.extractLane(c, 1), SIMD.Float64x2.extractLane(z, 1));
  throws(function() {SIMD.Float64x2.check(1)});
  throws(function() {SIMD.Float64x2.check('hi')});

  var u = SIMD.Int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var d = SIMD.Int16x8.check(u);
  equal(SIMD.Int16x8.extractLane(d, 0), SIMD.Int16x8.extractLane(u, 0));
  equal(SIMD.Int16x8.extractLane(d, 1), SIMD.Int16x8.extractLane(u, 1));
  equal(SIMD.Int16x8.extractLane(d, 2), SIMD.Int16x8.extractLane(u, 2));
  equal(SIMD.Int16x8.extractLane(d, 3), SIMD.Int16x8.extractLane(u, 3));
  equal(SIMD.Int16x8.extractLane(d, 4), SIMD.Int16x8.extractLane(u, 4));
  equal(SIMD.Int16x8.extractLane(d, 5), SIMD.Int16x8.extractLane(u, 5));
  equal(SIMD.Int16x8.extractLane(d, 6), SIMD.Int16x8.extractLane(u, 6));
  equal(SIMD.Int16x8.extractLane(d, 7), SIMD.Int16x8.extractLane(u, 7));
  throws(function() {SIMD.Int16x8.check(1)});
  throws(function() {SIMD.Int16x8.check('hi')});

  var v = SIMD.Int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var e = SIMD.Int8x16.check(v);
  equal(SIMD.Int8x16.extractLane(e, 0), SIMD.Int8x16.extractLane(v, 0));
  equal(SIMD.Int8x16.extractLane(e, 1), SIMD.Int8x16.extractLane(v, 1));
  equal(SIMD.Int8x16.extractLane(e, 2), SIMD.Int8x16.extractLane(v, 2));
  equal(SIMD.Int8x16.extractLane(e, 3), SIMD.Int8x16.extractLane(v, 3));
  equal(SIMD.Int8x16.extractLane(e, 4), SIMD.Int8x16.extractLane(v, 4));
  equal(SIMD.Int8x16.extractLane(e, 5), SIMD.Int8x16.extractLane(v, 5));
  equal(SIMD.Int8x16.extractLane(e, 6), SIMD.Int8x16.extractLane(v, 6));
  equal(SIMD.Int8x16.extractLane(e, 7), SIMD.Int8x16.extractLane(v, 7));
  equal(SIMD.Int8x16.extractLane(e, 8), SIMD.Int8x16.extractLane(v, 8));
  equal(SIMD.Int8x16.extractLane(e, 9), SIMD.Int8x16.extractLane(v, 9));
  equal(SIMD.Int8x16.extractLane(e, 10), SIMD.Int8x16.extractLane(v, 10));
  equal(SIMD.Int8x16.extractLane(e, 11), SIMD.Int8x16.extractLane(v, 11));
  equal(SIMD.Int8x16.extractLane(e, 12), SIMD.Int8x16.extractLane(v, 12));
  equal(SIMD.Int8x16.extractLane(e, 13), SIMD.Int8x16.extractLane(v, 13));
  equal(SIMD.Int8x16.extractLane(e, 14), SIMD.Int8x16.extractLane(v, 14));
  equal(SIMD.Int8x16.extractLane(e, 15), SIMD.Int8x16.extractLane(v, 15));
  throws(function() {SIMD.Int8x16.check(1)});
  throws(function() {SIMD.Int8x16.check('hi')});
});

test('Float32x4 fromFloat64x2 constructor', function() {
  var m = SIMD.Float64x2(1.0, 2.0);
  var n = SIMD.Float32x4.fromFloat64x2(m);
  equal(1.0, SIMD.Float32x4.extractLane(n, 0));
  equal(2.0, SIMD.Float32x4.extractLane(n, 1));
  isPositiveZero(SIMD.Float32x4.extractLane(n, 2));
  isPositiveZero(SIMD.Float32x4.extractLane(n, 3));

  m = SIMD.Float64x2(3.402824e+38, 7.006492e-46);
  n = SIMD.Float32x4.fromFloat64x2(m);
  equal(Infinity, SIMD.Float32x4.extractLane(n, 0));
  isPositiveZero(SIMD.Float32x4.extractLane(n, 1));
  isPositiveZero(SIMD.Float32x4.extractLane(n, 2));
  isPositiveZero(SIMD.Float32x4.extractLane(n, 3));
});

test('Float32x4 fromInt32x4 constructor', function() {
  var m = SIMD.Int32x4(1, 2, 3, 4);
  var n = SIMD.Float32x4.fromInt32x4(m);
  equal(1.0, SIMD.Float32x4.extractLane(n, 0));
  equal(2.0, SIMD.Float32x4.extractLane(n, 1));
  equal(3.0, SIMD.Float32x4.extractLane(n, 2));
  equal(4.0, SIMD.Float32x4.extractLane(n, 3));

  m = SIMD.Int32x4(0, 2147483647, -2147483648, -1);
  n = SIMD.Float32x4.fromInt32x4(m);
  isPositiveZero(SIMD.Float32x4.extractLane(n, 0));
  equal(2147483648, SIMD.Float32x4.extractLane(n, 1));
  equal(-2147483648, SIMD.Float32x4.extractLane(n, 2));
  equal(-1, SIMD.Float32x4.extractLane(n, 3));
});

test('Float32x4 fromFloat64x2Bits constructor', function() {
  var m = SIMD.Float64x2.fromInt32x4Bits(SIMD.Int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000));
  var n = SIMD.Float32x4.fromFloat64x2Bits(m);
  equal(1.0, SIMD.Float32x4.extractLane(n, 0));
  equal(2.0, SIMD.Float32x4.extractLane(n, 1));
  equal(3.0, SIMD.Float32x4.extractLane(n, 2));
  equal(4.0, SIMD.Float32x4.extractLane(n, 3));
});

test('Float32x4 fromInt32x4Bits constructor', function() {
  var m = SIMD.Int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.Float32x4.fromInt32x4Bits(m);
  equal(1.0, SIMD.Float32x4.extractLane(n, 0));
  equal(2.0, SIMD.Float32x4.extractLane(n, 1));
  equal(3.0, SIMD.Float32x4.extractLane(n, 2));
  equal(4.0, SIMD.Float32x4.extractLane(n, 3));
});

test('Float32x4 fromInt16x8Bits constructor', function() {
  var m = SIMD.Int16x8(0x0000, 0x3F80, 0x0000, 0x4000, 0x0000, 0x4040, 0x0000, 0x4080);
  var n = SIMD.Float32x4.fromInt16x8Bits(m);
  equal(1.0, SIMD.Float32x4.extractLane(n, 0));
  equal(2.0, SIMD.Float32x4.extractLane(n, 1));
  equal(3.0, SIMD.Float32x4.extractLane(n, 2));
  equal(4.0, SIMD.Float32x4.extractLane(n, 3));
});

test('Float32x4 fromInt8x16Bits constructor', function() {
  var m = SIMD.Int8x16(0x0, 0x0, 0x80, 0x3F, 0x0, 0x0, 0x00, 0x40, 0x00, 0x00, 0x40, 0x40, 0x00, 0x00, 0x80, 0x40);
  var n = SIMD.Float32x4.fromInt8x16Bits(m);
  equal(1.0, SIMD.Float32x4.extractLane(n, 0));
  equal(2.0, SIMD.Float32x4.extractLane(n, 1));
  equal(3.0, SIMD.Float32x4.extractLane(n, 2));
  equal(4.0, SIMD.Float32x4.extractLane(n, 3));
});

test('Float32x4 extract lane', function() {
  var a = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  equal(1.0, SIMD.Float32x4.extractLane(a, 0));
  equal(2.0, SIMD.Float32x4.extractLane(a, 1));
  equal(3.0, SIMD.Float32x4.extractLane(a, 2));
  equal(4.0, SIMD.Float32x4.extractLane(a, 3));
});

test('Float32x4 vector getters', function() {
  var a = SIMD.Float32x4(4.0, 3.0, 2.0, 1.0);
  var xxxx = SIMD.Float32x4.swizzle(a, 0, 0, 0, 0);
  var yyyy = SIMD.Float32x4.swizzle(a, 1, 1, 1, 1);
  var zzzz = SIMD.Float32x4.swizzle(a, 2, 2, 2, 2);
  var wwww = SIMD.Float32x4.swizzle(a, 3, 3, 3, 3);
  var wzyx = SIMD.Float32x4.swizzle(a, 3, 2, 1, 0);
  equal(4.0, SIMD.Float32x4.extractLane(xxxx, 0));
  equal(4.0, SIMD.Float32x4.extractLane(xxxx, 1));
  equal(4.0, SIMD.Float32x4.extractLane(xxxx, 2));
  equal(4.0, SIMD.Float32x4.extractLane(xxxx, 3));
  equal(3.0, SIMD.Float32x4.extractLane(yyyy, 0));
  equal(3.0, SIMD.Float32x4.extractLane(yyyy, 1));
  equal(3.0, SIMD.Float32x4.extractLane(yyyy, 2));
  equal(3.0, SIMD.Float32x4.extractLane(yyyy, 3));
  equal(2.0, SIMD.Float32x4.extractLane(zzzz, 0));
  equal(2.0, SIMD.Float32x4.extractLane(zzzz, 1));
  equal(2.0, SIMD.Float32x4.extractLane(zzzz, 2));
  equal(2.0, SIMD.Float32x4.extractLane(zzzz, 3));
  equal(1.0, SIMD.Float32x4.extractLane(wwww, 0));
  equal(1.0, SIMD.Float32x4.extractLane(wwww, 1));
  equal(1.0, SIMD.Float32x4.extractLane(wwww, 2));
  equal(1.0, SIMD.Float32x4.extractLane(wwww, 3));
  equal(1.0, SIMD.Float32x4.extractLane(wzyx, 0));
  equal(2.0, SIMD.Float32x4.extractLane(wzyx, 1));
  equal(3.0, SIMD.Float32x4.extractLane(wzyx, 2));
  equal(4.0, SIMD.Float32x4.extractLane(wzyx, 3));
});

test('Float32x4 abs', function() {
  var a = SIMD.Float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.Float32x4.abs(a);
  equal(4.0, SIMD.Float32x4.extractLane(c, 0));
  equal(3.0, SIMD.Float32x4.extractLane(c, 1));
  equal(2.0, SIMD.Float32x4.extractLane(c, 2));
  equal(1.0, SIMD.Float32x4.extractLane(c, 3));
  c = SIMD.Float32x4.abs(SIMD.Float32x4(4.0, 3.0, 2.0, 1.0));
  equal(4.0, SIMD.Float32x4.extractLane(c, 0));
  equal(3.0, SIMD.Float32x4.extractLane(c, 1));
  equal(2.0, SIMD.Float32x4.extractLane(c, 2));
  equal(1.0, SIMD.Float32x4.extractLane(c, 3));

  var d = SIMD.Float32x4(NaN, Infinity, 0.0, 1.0);
  var e = SIMD.Float32x4.abs(d);
  var f = SIMD.Float32x4(-NaN, -Infinity, -0.0, -1.0);
  var g = SIMD.Float32x4.abs(f);
  isNaN(SIMD.Float32x4.extractLane(e, 0))
  equal(SIMD.Float32x4.extractLane(e, 1), Infinity);
  isPositiveZero(SIMD.Float32x4.extractLane(e, 2));
  equal(SIMD.Float32x4.extractLane(e, 3), 1.0);
  isNaN(SIMD.Float32x4.extractLane(g, 0))
  equal(SIMD.Float32x4.extractLane(g, 1), Infinity);
  isPositiveZero(SIMD.Float32x4.extractLane(g, 2));
  equal(SIMD.Float32x4.extractLane(g, 3), 1.0);
});

test('Float32x4 neg', function() {
  var a = SIMD.Float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.Float32x4.neg(a);
  equal(4.0, SIMD.Float32x4.extractLane(c, 0));
  equal(3.0, SIMD.Float32x4.extractLane(c, 1));
  equal(2.0, SIMD.Float32x4.extractLane(c, 2));
  equal(1.0, SIMD.Float32x4.extractLane(c, 3));
  c = SIMD.Float32x4.neg(SIMD.Float32x4(4.0, 3.0, 2.0, 1.0));
  equal(-4.0, SIMD.Float32x4.extractLane(c, 0));
  equal(-3.0, SIMD.Float32x4.extractLane(c, 1));
  equal(-2.0, SIMD.Float32x4.extractLane(c, 2));
  equal(-1.0, SIMD.Float32x4.extractLane(c, 3));

  var d = SIMD.Float32x4(Infinity, -Infinity, 0.0, -0.0);
  var f = SIMD.Float32x4.neg(d);
  equal(-Infinity, SIMD.Float32x4.extractLane(f, 0));
  equal(Infinity, SIMD.Float32x4.extractLane(f, 1));
  isNegativeZero(SIMD.Float32x4.extractLane(f, 2));
  isPositiveZero(SIMD.Float32x4.extractLane(f, 3));

  var g = SIMD.Float32x4.neg(SIMD.Float32x4.splat(NaN));
  isNaN(SIMD.Float32x4.extractLane(g, 0))
});

test('Float32x4 add', function() {
  var a = SIMD.Float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.Float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.Float32x4.add(a, b);
  equal(14.0, SIMD.Float32x4.extractLane(c, 0));
  equal(23.0, SIMD.Float32x4.extractLane(c, 1));
  equal(32.0, SIMD.Float32x4.extractLane(c, 2));
  equal(41.0, SIMD.Float32x4.extractLane(c, 3));
});

test('Float32x4 sub', function() {
  var a = SIMD.Float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.Float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.Float32x4.sub(a, b);
  equal(-6.0, SIMD.Float32x4.extractLane(c, 0));
  equal(-17.0, SIMD.Float32x4.extractLane(c, 1));
  equal(-28.0, SIMD.Float32x4.extractLane(c, 2));
  equal(-39.0, SIMD.Float32x4.extractLane(c, 3));
});

test('Float32x4 mul', function() {
  var a = SIMD.Float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.Float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.Float32x4.mul(a, b);
  equal(40.0, SIMD.Float32x4.extractLane(c, 0));
  equal(60.0, SIMD.Float32x4.extractLane(c, 1));
  equal(60.0, SIMD.Float32x4.extractLane(c, 2));
  equal(40.0, SIMD.Float32x4.extractLane(c, 3));
});

test('Float32x4 div', function() {
  var a = SIMD.Float32x4(4.0, 9.0, 8.0, 1.0);
  var b = SIMD.Float32x4(2.0, 3.0, 1.0, 0.5);
  var c = SIMD.Float32x4.div(a, b);
  equal(2.0, SIMD.Float32x4.extractLane(c, 0));
  equal(3.0, SIMD.Float32x4.extractLane(c, 1));
  equal(8.0, SIMD.Float32x4.extractLane(c, 2));
  equal(2.0, SIMD.Float32x4.extractLane(c, 3));

  var d = SIMD.Float32x4(1.0, 0.0, Infinity, NaN);
  var e = SIMD.Float32x4(Infinity, 0.0, Infinity, 1.0);
  var f = SIMD.Float32x4.div(d, e);
  isPositiveZero(SIMD.Float32x4.extractLane(f, 0));
  isNaN(SIMD.Float32x4.extractLane(f, 1))
  isNaN(SIMD.Float32x4.extractLane(f, 2))
  isNaN(SIMD.Float32x4.extractLane(f, 3))

  var g = SIMD.Float32x4(1.0, 1.0, -1.0, -1.0);
  var h = SIMD.Float32x4(0.0, -0.0, 0.0, -0.0);
  var i = SIMD.Float32x4.div(g, h);
  equal(SIMD.Float32x4.extractLane(i, 0), Infinity);
  equal(SIMD.Float32x4.extractLane(i, 1), -Infinity);
  equal(SIMD.Float32x4.extractLane(i, 2), -Infinity);
  equal(SIMD.Float32x4.extractLane(i, 3), Infinity);
});

test('Float32x4 min', function() {
  var a = SIMD.Float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = SIMD.Float32x4(2.0, 1.0, 50.0, 0.0);
  var c = SIMD.Float32x4.min(a, lower);
  equal(-20.0, SIMD.Float32x4.extractLane(c, 0));
  equal(1.0, SIMD.Float32x4.extractLane(c, 1));
  equal(30.0, SIMD.Float32x4.extractLane(c, 2));
  isPositiveZero(SIMD.Float32x4.extractLane(c, 3));

  var x = SIMD.Float32x4(-0, 0, NaN, 0);
  var y = SIMD.Float32x4(0, -0, 0, NaN);
  var z = SIMD.Float32x4.min(x, y);
  isNegativeZero(SIMD.Float32x4.extractLane(z, 0));
  isNegativeZero(SIMD.Float32x4.extractLane(z, 1));
  isNaN(SIMD.Float32x4.extractLane(z, 2))
  isNaN(SIMD.Float32x4.extractLane(z, 3))
});

test('Float32x4 minNum', function() {
  var a = SIMD.Float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = SIMD.Float32x4(2.0, 1.0, 50.0, 0.0);
  var c = SIMD.Float32x4.minNum(a, lower);
  equal(-20.0, SIMD.Float32x4.extractLane(c, 0));
  equal(1.0, SIMD.Float32x4.extractLane(c, 1));
  equal(30.0, SIMD.Float32x4.extractLane(c, 2));
  isPositiveZero(SIMD.Float32x4.extractLane(c, 3));

  var x = SIMD.Float32x4(-0, 0, NaN, 0);
  var y = SIMD.Float32x4(0, -0, 0, NaN);
  var z = SIMD.Float32x4.minNum(x, y);
  isNegativeZero(SIMD.Float32x4.extractLane(z, 0));
  isNegativeZero(SIMD.Float32x4.extractLane(z, 1));
  isPositiveZero(SIMD.Float32x4.extractLane(z, 2));
  isPositiveZero(SIMD.Float32x4.extractLane(z, 3));
});

test('Float32x4 min exceptions', function() {
  var ok    = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var notOk = 1;
  throws(function () {
    SIMD.Float32x4.min(ok, notOk);
  });
  throws(function () {
    SIMD.Float32x4.min(notOk, ok);
  });
});

test('Float32x4 max', function() {
  var a = SIMD.Float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = SIMD.Float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.Float32x4.max(a, upper);
  equal(2.5, SIMD.Float32x4.extractLane(c, 0));
  equal(10.0, SIMD.Float32x4.extractLane(c, 1));
  equal(55.0, SIMD.Float32x4.extractLane(c, 2));
  equal(1.0, SIMD.Float32x4.extractLane(c, 3));

  var x = SIMD.Float32x4(-0, 0, NaN, 0);
  var y = SIMD.Float32x4(0, -0, 0, NaN);
  var z = SIMD.Float32x4.max(x, y);
  isPositiveZero(SIMD.Float32x4.extractLane(z, 0));
  isPositiveZero(SIMD.Float32x4.extractLane(z, 1));
  isNaN(SIMD.Float32x4.extractLane(z, 2))
  isNaN(SIMD.Float32x4.extractLane(z, 3))
});

test('Float32x4 maxNum', function() {
  var a = SIMD.Float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = SIMD.Float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.Float32x4.maxNum(a, upper);
  equal(2.5, SIMD.Float32x4.extractLane(c, 0));
  equal(10.0, SIMD.Float32x4.extractLane(c, 1));
  equal(55.0, SIMD.Float32x4.extractLane(c, 2));
  equal(1.0, SIMD.Float32x4.extractLane(c, 3));

  var x = SIMD.Float32x4(-0, 0, NaN, 0);
  var y = SIMD.Float32x4(0, -0, 0, NaN);
  var z = SIMD.Float32x4.maxNum(x, y);
  isPositiveZero(SIMD.Float32x4.extractLane(z, 0));
  isPositiveZero(SIMD.Float32x4.extractLane(z, 1));
  isPositiveZero(SIMD.Float32x4.extractLane(z, 2));
  isPositiveZero(SIMD.Float32x4.extractLane(z, 3));
});

test('Float32x4 max exceptions', function() {
  var ok    = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var notOk = 1;
  throws(function () {
    SIMD.Float32x4.max(ok, notOk);
  });
  throws(function () {
    SIMD.Float32x4.max(notOk, ok);
  });
});

test('Float32x4 reciprocal approximation', function() {
  var a = SIMD.Float32x4(8.0, 4.0, 2.0, -2.0);
  var c = SIMD.Float32x4.reciprocalApproximation(a);
  almostEqual(0.125, SIMD.Float32x4.extractLane(c, 0));
  almostEqual(0.250, SIMD.Float32x4.extractLane(c, 1));
  almostEqual(0.5, SIMD.Float32x4.extractLane(c, 2));
  almostEqual(-0.5, SIMD.Float32x4.extractLane(c, 3));
  a = SIMD.Float32x4(NaN, Infinity, -Infinity, -0);
  c = SIMD.Float32x4.reciprocalApproximation(a);
  isNaN(SIMD.Float32x4.extractLane(c, 0))
  isPositiveZero(SIMD.Float32x4.extractLane(c, 1));
  isNegativeZero(SIMD.Float32x4.extractLane(c, 2));
  equal(-Infinity, SIMD.Float32x4.extractLane(c, 3));
  a = SIMD.Float32x4(0, 2.3, -4.5, 7.8);
  c = SIMD.Float32x4.reciprocalApproximation(a);
  equal(Infinity, SIMD.Float32x4.extractLane(c, 0));
  almostEqual(1/SIMD.Float32x4.extractLane(a, 1), SIMD.Float32x4.extractLane(c, 1));
  almostEqual(1/SIMD.Float32x4.extractLane(a, 2), SIMD.Float32x4.extractLane(c, 2));
  almostEqual(1/SIMD.Float32x4.extractLane(a, 3), SIMD.Float32x4.extractLane(c, 3));
});

test('Float32x4 reciprocal sqrt approximation', function() {
  var a = SIMD.Float32x4(1.0, 0.25, 0.111111, 0.0625);
  var c = SIMD.Float32x4.reciprocalSqrtApproximation(a);
  almostEqual(1.0, SIMD.Float32x4.extractLane(c, 0));
  almostEqual(2.0, SIMD.Float32x4.extractLane(c, 1));
  almostEqual(3.0, SIMD.Float32x4.extractLane(c, 2));
  almostEqual(4.0, SIMD.Float32x4.extractLane(c, 3));
  a = SIMD.Float32x4(-Infinity, Infinity, NaN, 0);
  c = SIMD.Float32x4.reciprocalSqrtApproximation(a);
  isNaN(SIMD.Float32x4.extractLane(c, 0))
  isPositiveZero(SIMD.Float32x4.extractLane(c, 1));
  isNaN(SIMD.Float32x4.extractLane(c, 2))
  equal(Infinity, SIMD.Float32x4.extractLane(c, 3));
  a = SIMD.Float32x4(-0, -1, 121, 144);
  c = SIMD.Float32x4.reciprocalSqrtApproximation(a);
  equal(-Infinity, SIMD.Float32x4.extractLane(c, 0));
  isNaN(SIMD.Float32x4.extractLane(c, 1))
  almostEqual(1/11, SIMD.Float32x4.extractLane(c, 2));
  almostEqual(1/12, SIMD.Float32x4.extractLane(c, 3));
});

test('Float32x4 sqrt', function() {
  var a = SIMD.Float32x4(16.0, 9.0, 4.0, 1.0);
  var c = SIMD.Float32x4.sqrt(a);
  equal(4.0, SIMD.Float32x4.extractLane(c, 0));
  equal(3.0, SIMD.Float32x4.extractLane(c, 1));
  equal(2.0, SIMD.Float32x4.extractLane(c, 2));
  equal(1.0, SIMD.Float32x4.extractLane(c, 3));
  a = SIMD.Float32x4(0.0, -0.0, Infinity, -Infinity);
  c = SIMD.Float32x4.sqrt(a);
  isPositiveZero(SIMD.Float32x4.extractLane(c, 0));
  isNegativeZero(SIMD.Float32x4.extractLane(c, 1));
  equal(Infinity, SIMD.Float32x4.extractLane(c, 2));
  isNaN(SIMD.Float32x4.extractLane(c, 3))
  a = SIMD.Float32x4(NaN, 2.0, 0.5, 121.0);
  c = SIMD.Float32x4.sqrt(a);
  isNaN(SIMD.Float32x4.extractLane(c, 0))
  equal(Math.fround(Math.SQRT2), SIMD.Float32x4.extractLane(c, 1));
  equal(Math.fround(Math.SQRT1_2), SIMD.Float32x4.extractLane(c, 2));
  equal(11.0, SIMD.Float32x4.extractLane(c, 3));
});

test('Float32x4 shuffle', function() {
  var a    = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var b    = SIMD.Float32x4(5.0, 6.0, 7.0, 8.0);
  var xyxy = SIMD.Float32x4.shuffle(a, b, 0, 1, 4, 5);
  var zwzw = SIMD.Float32x4.shuffle(a, b, 2, 3, 6, 7);
  var xxxx = SIMD.Float32x4.shuffle(a, b, 0, 0, 4, 4);
  equal(1.0, SIMD.Float32x4.extractLane(xyxy, 0));
  equal(2.0, SIMD.Float32x4.extractLane(xyxy, 1));
  equal(5.0, SIMD.Float32x4.extractLane(xyxy, 2));
  equal(6.0, SIMD.Float32x4.extractLane(xyxy, 3));
  equal(3.0, SIMD.Float32x4.extractLane(zwzw, 0));
  equal(4.0, SIMD.Float32x4.extractLane(zwzw, 1));
  equal(7.0, SIMD.Float32x4.extractLane(zwzw, 2));
  equal(8.0, SIMD.Float32x4.extractLane(zwzw, 3));
  equal(1.0, SIMD.Float32x4.extractLane(xxxx, 0));
  equal(1.0, SIMD.Float32x4.extractLane(xxxx, 1));
  equal(5.0, SIMD.Float32x4.extractLane(xxxx, 2));
  equal(5.0, SIMD.Float32x4.extractLane(xxxx, 3));

  var c = SIMD.Float32x4.shuffle(a, b, 0, 4, 5, 1);
  var d = SIMD.Float32x4.shuffle(a, b, 2, 6, 3, 7);
  var e = SIMD.Float32x4.shuffle(a, b, 0, 4, 0, 4);
  equal(1.0, SIMD.Float32x4.extractLane(c, 0));
  equal(5.0, SIMD.Float32x4.extractLane(c, 1));
  equal(6.0, SIMD.Float32x4.extractLane(c, 2));
  equal(2.0, SIMD.Float32x4.extractLane(c, 3));
  equal(3.0, SIMD.Float32x4.extractLane(d, 0));
  equal(7.0, SIMD.Float32x4.extractLane(d, 1));
  equal(4.0, SIMD.Float32x4.extractLane(d, 2));
  equal(8.0, SIMD.Float32x4.extractLane(d, 3));
  equal(1.0, SIMD.Float32x4.extractLane(e, 0));
  equal(5.0, SIMD.Float32x4.extractLane(e, 1));
  equal(1.0, SIMD.Float32x4.extractLane(e, 2));
  equal(5.0, SIMD.Float32x4.extractLane(e, 3));

  function testIndexCheck(index) {
      throws(function() { SIMD.Float32x4.shuffle(a, b, index, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(8);
});

test('Float32x4 replaceLane', function() {
    var a = SIMD.Float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.Float32x4.replaceLane(a, 0, 20.0);
    equal(20.0, SIMD.Float32x4.extractLane(c, 0));
    equal(9.0, SIMD.Float32x4.extractLane(c, 1));
    equal(4.0, SIMD.Float32x4.extractLane(c, 2));
    equal(1.0, SIMD.Float32x4.extractLane(c, 3));
    c = SIMD.Float32x4.replaceLane(a, 1, 20.0);
    equal(16.0, SIMD.Float32x4.extractLane(c, 0));
    equal(20.0, SIMD.Float32x4.extractLane(c, 1));
    equal(4.0, SIMD.Float32x4.extractLane(c, 2));
    equal(1.0, SIMD.Float32x4.extractLane(c, 3));
    c = SIMD.Float32x4.replaceLane(a, 2, 20.0);
    equal(16.0, SIMD.Float32x4.extractLane(c, 0));
    equal(9.0, SIMD.Float32x4.extractLane(c, 1));
    equal(20.0, SIMD.Float32x4.extractLane(c, 2));
    equal(1.0, SIMD.Float32x4.extractLane(c, 3));
    c = SIMD.Float32x4.replaceLane(a, 3, 20.0);
    equal(16.0, SIMD.Float32x4.extractLane(c, 0));
    equal(9.0, SIMD.Float32x4.extractLane(c, 1));
    equal(4.0, SIMD.Float32x4.extractLane(c, 2));
    equal(20.0, SIMD.Float32x4.extractLane(c, 3));

    function testIndexCheck(index) {
      throws(function() { SIMD.Float32x4.replaceLane(a, index, 0.0); });
    }
    testIndexCheck(13.37);
    testIndexCheck(null);
    testIndexCheck(undefined);
    testIndexCheck({});
    testIndexCheck(true);
    testIndexCheck('yo');
    testIndexCheck(-1);
    testIndexCheck(8);
});

test('Float32x4 comparisons', function() {
  var m = SIMD.Float32x4(1.0, 2.0, 0.1, 0.001);
  var n = SIMD.Float32x4(2.0, 2.0, 0.001, 0.1);
  var cmp;
  cmp = SIMD.Float32x4.lessThan(m, n);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.lessThanOrEqual(m, n);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.equal(m, n);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.notEqual(m, n);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.greaterThanOrEqual(m, n);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.greaterThan(m, n);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  var o = SIMD.Float32x4(0.0, -0.0, 0.0, NaN);
  var p = SIMD.Float32x4(-0.0, 0.0, NaN, 0.0);
  cmp = SIMD.Float32x4.lessThan(o, p);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.lessThanOrEqual(o, p);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.equal(o, p);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.notEqual(o, p);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.greaterThanOrEqual(o, p);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Float32x4.greaterThan(o, p);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));
});

test('Float32x4 select', function() {
  var m = SIMD.Bool32x4(true, true, false, false);
  var t = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var f = SIMD.Float32x4(5.0, 6.0, 7.0, 8.0);
  var s = SIMD.Float32x4.select(m, t, f);
  equal(1.0, SIMD.Float32x4.extractLane(s, 0));
  equal(2.0, SIMD.Float32x4.extractLane(s, 1));
  equal(7.0, SIMD.Float32x4.extractLane(s, 2));
  equal(8.0, SIMD.Float32x4.extractLane(s, 3));
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

test('Float32x4 Float64x2 conversion', function() {
  var m = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.Float64x2.fromFloat32x4(m);
  equal(1.0, SIMD.Float64x2.extractLane(n, 0));
  equal(2.0, SIMD.Float64x2.extractLane(n, 1));
});

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

test('Float64x2 constructor', function() {
  equal('function', typeof SIMD.Float64x2);
  var m = SIMD.Float64x2(1.0, 2.0);
  equal(1.0, SIMD.Float64x2.extractLane(m, 0));
  equal(2.0, SIMD.Float64x2.extractLane(m, 1));

  m = SIMD.Float64x2('hello', 'world');
  isNaN(SIMD.Float64x2.extractLane(m, 0))
  isNaN(SIMD.Float64x2.extractLane(m, 1))
});

test('Float64x2 splat constructor', function() {
  equal('function', typeof SIMD.Float64x2.splat);
  var m = SIMD.Float64x2.splat(3.0);
  equal(3.0, SIMD.Float64x2.extractLane(m, 0));
  equal(SIMD.Float64x2.extractLane(m, 0), SIMD.Float64x2.extractLane(m, 1));
});

test('Float64x2 fromFloat32x4 constructor', function() {
  var m = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.Float64x2.fromFloat32x4(m);
  equal(1.0, SIMD.Float64x2.extractLane(n, 0));
  equal(2.0, SIMD.Float64x2.extractLane(n, 1));
});

test('Float64x2 fromInt32x4 constructor', function() {
  var m = SIMD.Int32x4(1, 2, 3, 4);
  var n = SIMD.Float64x2.fromInt32x4(m);
  equal(1.0, SIMD.Float64x2.extractLane(n, 0));
  equal(2.0, SIMD.Float64x2.extractLane(n, 1));
});

test('Float64x2 fromFloat32x4Bits constructor', function() {
  var m = SIMD.Float32x4.fromInt32x4Bits(SIMD.Int32x4(0x00000000, 0x3ff00000, 0x0000000, 0x40000000));
  var n = SIMD.Float64x2.fromFloat32x4Bits(m);
  equal(1.0, SIMD.Float64x2.extractLane(n, 0));
  equal(2.0, SIMD.Float64x2.extractLane(n, 1));
});

test('Float64x2 fromInt32x4Bits constructor', function() {
  var m = SIMD.Int32x4(0x00000000, 0x3ff00000, 0x00000000, 0x40000000);
  var n = SIMD.Float64x2.fromInt32x4Bits(m);
  equal(1.0, SIMD.Float64x2.extractLane(n, 0));
  equal(2.0, SIMD.Float64x2.extractLane(n, 1));
});

test('Float64x2 fromInt16x8Bits constructor', function() {
  var m = SIMD.Int16x8(0x0000, 0x0000, 0x0000, 0x3ff0, 0x0000, 0x0000, 0x0000, 0x4000);
  var n = SIMD.Float64x2.fromInt16x8Bits(m);
  equal(1.0, SIMD.Float64x2.extractLane(n, 0));
  equal(2.0, SIMD.Float64x2.extractLane(n, 1));
});

test('Float64x2 fromInt8x16Bits constructor', function() {
  var m = SIMD.Int8x16(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40);
  var n = SIMD.Float64x2.fromInt8x16Bits(m);
  equal(1.0, SIMD.Float64x2.extractLane(n, 0));
  equal(2.0, SIMD.Float64x2.extractLane(n, 1));
});

test('Float64x2 scalar getters', function() {
  var m = SIMD.Float64x2(1.0, 2.0);
  equal(1.0, SIMD.Float64x2.extractLane(m, 0));
  equal(2.0, SIMD.Float64x2.extractLane(m, 1));
});

test('Float64x2 abs', function() {
  var a = SIMD.Float64x2(-2.0, -1.0);
  var c = SIMD.Float64x2.abs(a);
  equal(2.0, SIMD.Float64x2.extractLane(c, 0));
  equal(1.0, SIMD.Float64x2.extractLane(c, 1));
  c = SIMD.Float64x2.abs(SIMD.Float64x2(2.0, 1.0));
  equal(2.0, SIMD.Float64x2.extractLane(c, 0));
  equal(1.0, SIMD.Float64x2.extractLane(c, 1));

  var d0 = SIMD.Float64x2(NaN, Infinity);
  var d1 = SIMD.Float64x2(0.0, 1.0);
  var e0 = SIMD.Float64x2.abs(d0);
  var e1 = SIMD.Float64x2.abs(d1);
  var f0 = SIMD.Float64x2(-NaN, -Infinity);
  var f1 = SIMD.Float64x2(-0.0, -1.0);
  var g0 = SIMD.Float64x2.abs(f0);
  var g1 = SIMD.Float64x2.abs(f1);
  isNaN(SIMD.Float64x2.extractLane(e0, 0))
  equal(SIMD.Float64x2.extractLane(e0, 1), Infinity);
  isPositiveZero(SIMD.Float64x2.extractLane(e1, 0), 0.0);
  equal(SIMD.Float64x2.extractLane(e1, 1), 1.0);
  isNaN(SIMD.Float64x2.extractLane(g0, 0))
  equal(SIMD.Float64x2.extractLane(g0, 1), Infinity);
  isPositiveZero(SIMD.Float64x2.extractLane(g1, 0));
  equal(SIMD.Float64x2.extractLane(g1, 1), 1.0);
});

test('Float64x2 neg', function() {
  var a = SIMD.Float64x2(-2.0, -1.0);
  var c = SIMD.Float64x2.neg(a);
  equal(2.0, SIMD.Float64x2.extractLane(c, 0));
  equal(1.0, SIMD.Float64x2.extractLane(c, 1));
  c = SIMD.Float64x2.neg(SIMD.Float64x2(2.0, 1.0));
  equal(-2.0, SIMD.Float64x2.extractLane(c, 0));
  equal(-1.0, SIMD.Float64x2.extractLane(c, 1));

  var d0 = SIMD.Float64x2(Infinity, -Infinity);
  var d1 = SIMD.Float64x2(0.0, -0.0);
  var f0 = SIMD.Float64x2.neg(d0);
  var f1 = SIMD.Float64x2.neg(d1);
  equal(-Infinity, SIMD.Float64x2.extractLane(f0, 0));
  equal(Infinity, SIMD.Float64x2.extractLane(f0, 1));
  isNegativeZero(SIMD.Float64x2.extractLane(f1, 0));
  isPositiveZero(SIMD.Float64x2.extractLane(f1, 1));

  var g = SIMD.Float64x2.neg(SIMD.Float64x2.splat(NaN));
  isNaN(SIMD.Float64x2.extractLane(g, 0))
});

test('Float64x2 add', function() {
  var a = SIMD.Float64x2(2.0, 1.0);
  var b = SIMD.Float64x2(10.0, 20.0);
  var c = SIMD.Float64x2.add(a, b);
  equal(12.0, SIMD.Float64x2.extractLane(c, 0));
  equal(21.0, SIMD.Float64x2.extractLane(c, 1));
});

test('Float64x2 sub', function() {
  var a = SIMD.Float64x2(2.0, 1.0);
  var b = SIMD.Float64x2(10.0, 20.0);
  var c = SIMD.Float64x2.sub(a, b);
  equal(-8.0, SIMD.Float64x2.extractLane(c, 0));
  equal(-19.0, SIMD.Float64x2.extractLane(c, 1));
});

test('Float64x2 mul', function() {
  var a = SIMD.Float64x2(2.0, 1.0);
  var b = SIMD.Float64x2(10.0, 20.0);
  var c = SIMD.Float64x2.mul(a, b);
  equal(20.0, SIMD.Float64x2.extractLane(c, 0));
  equal(20.0, SIMD.Float64x2.extractLane(c, 1));
});

test('Float64x2 div', function() {
  var a = SIMD.Float64x2(4.0, 9.0);
  var b = SIMD.Float64x2(2.0, 3.0);
  var c = SIMD.Float64x2.div(a, b);
  equal(2.0, SIMD.Float64x2.extractLane(c, 0));
  equal(3.0, SIMD.Float64x2.extractLane(c, 1));

  var d0 = SIMD.Float64x2(1.0, 0.0);
  var d1 = SIMD.Float64x2(Infinity, NaN);
  var e0 = SIMD.Float64x2(0.0, 0.0);
  var e1 = SIMD.Float64x2(Infinity, 1.0);
  var f0 = SIMD.Float64x2.div(d0, e0);
  var f1 = SIMD.Float64x2.div(d1, e1);
  equal(SIMD.Float64x2.extractLane(f0, 0), Infinity);
  isNaN(SIMD.Float64x2.extractLane(f0, 1))
  isNaN(SIMD.Float64x2.extractLane(f1, 0))
  isNaN(SIMD.Float64x2.extractLane(f1, 1))

  var g0 = SIMD.Float64x2(1.0, 1.0);
  var g1 = SIMD.Float64x2(-1.0, -1.0);
  var h0 = SIMD.Float64x2(0.0, -0.0);
  var h1 = SIMD.Float64x2(0.0, -0.0);
  var i0 = SIMD.Float64x2.div(g0, h0);
  var i1 = SIMD.Float64x2.div(g1, h1);
  equal(SIMD.Float64x2.extractLane(i0, 0), Infinity);
  equal(SIMD.Float64x2.extractLane(i0, 1), -Infinity);
  equal(SIMD.Float64x2.extractLane(i1, 0), -Infinity);
  equal(SIMD.Float64x2.extractLane(i1, 1), Infinity);
});

test('Float64x2 min', function() {
  var a = SIMD.Float64x2(-20.0, 10.0);
  var lower = SIMD.Float64x2(2.0, 1.0);
  var c = SIMD.Float64x2.min(a, lower);
  equal(-20.0, SIMD.Float64x2.extractLane(c, 0));
  equal(1.0, SIMD.Float64x2.extractLane(c, 1));

  var x = SIMD.Float64x2(-0, 0);
  var y = SIMD.Float64x2(0, -0);
  var z = SIMD.Float64x2.min(x, y);
  isNegativeZero(SIMD.Float64x2.extractLane(z, 0));
  isNegativeZero(SIMD.Float64x2.extractLane(z, 1));
  x = SIMD.Float64x2(NaN, 0);
  y = SIMD.Float64x2(0, NaN);
  z = SIMD.Float64x2.min(x, y);
  isNaN(SIMD.Float64x2.extractLane(z, 0))
  isNaN(SIMD.Float64x2.extractLane(z, 1))
});

test('Float64x2 minNum', function() {
  var a = SIMD.Float64x2(-20.0, 10.0);
  var lower = SIMD.Float64x2(2.0, 1.0);
  var c = SIMD.Float64x2.minNum(a, lower);
  equal(-20.0, SIMD.Float64x2.extractLane(c, 0));
  equal(1.0, SIMD.Float64x2.extractLane(c, 1));

  var x = SIMD.Float64x2(-0, 0);
  var y = SIMD.Float64x2(0, -0);
  var z = SIMD.Float64x2.minNum(x, y);
  isNegativeZero(SIMD.Float64x2.extractLane(z, 0));
  isNegativeZero(SIMD.Float64x2.extractLane(z, 1));
  x = SIMD.Float64x2(NaN, 0);
  y = SIMD.Float64x2(0, NaN);
  z = SIMD.Float64x2.minNum(x, y);
  isPositiveZero(SIMD.Float64x2.extractLane(z, 0));
  isPositiveZero(SIMD.Float64x2.extractLane(z, 1));
});

test('Float64x2 min exceptions', function() {
  var ok    = SIMD.Float64x2(1.0, 2.0);
  var notOk = 1;
  throws(function() {
    SIMD.Float64x2.min(ok, notOk);
  });
  throws(function() {
    SIMD.Float64x2.min(notOk, ok);
  });
});

test('Float64x2 max', function() {
  var a = SIMD.Float64x2(-20.0, 10.0);
  var upper = SIMD.Float64x2(2.5, 5.0);
  var c = SIMD.Float64x2.max(a, upper);
  equal(2.5, SIMD.Float64x2.extractLane(c, 0));
  equal(10.0, SIMD.Float64x2.extractLane(c, 1));

  var x = SIMD.Float64x2(-0, 0);
  var y = SIMD.Float64x2(0, -0);
  var z = SIMD.Float64x2.max(x, y);
  isPositiveZero(SIMD.Float64x2.extractLane(z, 0));
  isPositiveZero(SIMD.Float64x2.extractLane(z, 1));
  x = SIMD.Float64x2(NaN, 0);
  y = SIMD.Float64x2(0, NaN);
  z = SIMD.Float64x2.max(x, y);
  isNaN(SIMD.Float64x2.extractLane(z, 0))
  isNaN(SIMD.Float64x2.extractLane(z, 1))
});

test('Float64x2 maxNum', function() {
  var a = SIMD.Float64x2(-20.0, 10.0);
  var upper = SIMD.Float64x2(2.5, 5.0);
  var c = SIMD.Float64x2.maxNum(a, upper);
  equal(2.5, SIMD.Float64x2.extractLane(c, 0));
  equal(10.0, SIMD.Float64x2.extractLane(c, 1));

  var x = SIMD.Float64x2(-0, 0);
  var y = SIMD.Float64x2(0, -0);
  var z = SIMD.Float64x2.maxNum(x, y);
  isPositiveZero(SIMD.Float64x2.extractLane(z, 0));
  isPositiveZero(SIMD.Float64x2.extractLane(z, 1));
  x = SIMD.Float64x2(NaN, 0);
  y = SIMD.Float64x2(0, NaN);
  z = SIMD.Float64x2.maxNum(x, y);
  isPositiveZero(SIMD.Float64x2.extractLane(z, 0));
  isPositiveZero(SIMD.Float64x2.extractLane(z, 1));
});

test('Float64x2 max exceptions', function() {
  var ok    = SIMD.Float64x2(1.0, 2.0);
  var notOk = 1;
  throws(function() {
    SIMD.Float64x2.max(ok, notOk);
  });
  throws(function() {
    SIMD.Float64x2.max(notOk, ok);
  });
});

test('Float64x2 reciprocal approximation', function() {
  var a = SIMD.Float64x2(2.0, -2.0);
  var c = SIMD.Float64x2.reciprocalApproximation(a);
  almostEqual(0.5, SIMD.Float64x2.extractLane(c, 0));
  almostEqual(-0.5, SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(NaN, Infinity);
  c = SIMD.Float64x2.reciprocalApproximation(a);
  isNaN(SIMD.Float64x2.extractLane(c, 0))
  isPositiveZero(SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(-Infinity, -0);
  c = SIMD.Float64x2.reciprocalApproximation(a);
  isNegativeZero(SIMD.Float64x2.extractLane(c, 0));
  equal(-Infinity, SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(0, 2.3);
  c = SIMD.Float64x2.reciprocalApproximation(a);
  equal(Infinity, SIMD.Float64x2.extractLane(c, 0));
  almostEqual(1/SIMD.Float64x2.extractLane(a, 1), SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(-4.5, 7.8);
  c = SIMD.Float64x2.reciprocalApproximation(a);
  almostEqual(1/SIMD.Float64x2.extractLane(a, 0), SIMD.Float64x2.extractLane(c, 0));
  almostEqual(1/SIMD.Float64x2.extractLane(a, 1), SIMD.Float64x2.extractLane(c, 1));
});

test('Float64x2 reciprocal sqrt approximation', function() {
  var a = SIMD.Float64x2(1.0, 0.25);
  var c = SIMD.Float64x2.reciprocalSqrtApproximation(a);
  almostEqual(1.0, SIMD.Float64x2.extractLane(c, 0));
  almostEqual(2.0, SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(-Infinity, Infinity);
  c = SIMD.Float64x2.reciprocalSqrtApproximation(a);
  isNaN(SIMD.Float64x2.extractLane(c, 0))
  isPositiveZero(SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(NaN, 0);
  c = SIMD.Float64x2.reciprocalSqrtApproximation(a);
  isNaN(SIMD.Float64x2.extractLane(c, 0))
  equal(Infinity, SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(-0, -1);
  c = SIMD.Float64x2.reciprocalSqrtApproximation(a);
  equal(-Infinity, SIMD.Float64x2.extractLane(c, 0));
  isNaN(SIMD.Float64x2.extractLane(c, 1))
  a = SIMD.Float64x2(121, 144);
  c = SIMD.Float64x2.reciprocalSqrtApproximation(a);
  almostEqual(1/11, SIMD.Float64x2.extractLane(c, 0));
  almostEqual(1/12, SIMD.Float64x2.extractLane(c, 1));
});

test('Float64x2 sqrt', function() {
  var a = SIMD.Float64x2(16.0, 9.0);
  var c = SIMD.Float64x2.sqrt(a);
  equal(4.0, SIMD.Float64x2.extractLane(c, 0));
  equal(3.0, SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(0.0, -0.0);
  c = SIMD.Float64x2.sqrt(a);
  isPositiveZero(SIMD.Float64x2.extractLane(c, 0));
  isNegativeZero(SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(Infinity, -Infinity);
  c = SIMD.Float64x2.sqrt(a);
  equal(Infinity, SIMD.Float64x2.extractLane(c, 0));
  isNaN(SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(NaN, 2.0);
  c = SIMD.Float64x2.sqrt(a);
  isNaN(SIMD.Float64x2.extractLane(c, 0));
  equal(Math.SQRT2, SIMD.Float64x2.extractLane(c, 1));
  a = SIMD.Float64x2(0.5, 121.0);
  c = SIMD.Float64x2.sqrt(a);
  equal(Math.SQRT1_2, SIMD.Float64x2.extractLane(c, 0));
  equal(11.0, SIMD.Float64x2.extractLane(c, 1));
});

test('Float64x2 swizzle', function() {
  var a  = SIMD.Float64x2(1.0, 2.0);
  var xx = SIMD.Float64x2.swizzle(a, 0, 0);
  var xy = SIMD.Float64x2.swizzle(a, 0, 1);
  var yx = SIMD.Float64x2.swizzle(a, 1, 0);
  var yy = SIMD.Float64x2.swizzle(a, 1, 1);
  equal(1.0, SIMD.Float64x2.extractLane(xx, 0));
  equal(1.0, SIMD.Float64x2.extractLane(xx, 1));
  equal(1.0, SIMD.Float64x2.extractLane(xy, 0));
  equal(2.0, SIMD.Float64x2.extractLane(xy, 1));
  equal(2.0, SIMD.Float64x2.extractLane(yx, 0));
  equal(1.0, SIMD.Float64x2.extractLane(yx, 1));
  equal(2.0, SIMD.Float64x2.extractLane(yy, 0));
  equal(2.0, SIMD.Float64x2.extractLane(yy, 1));

  function testIndexCheck(index) {
      throws(function() { SIMD.Float64x2.swizzle(a, index, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(2);
});

test('Float64x2 shuffle', function() {
  var a  = SIMD.Float64x2(1.0, 2.0);
  var b  = SIMD.Float64x2(3.0, 4.0);
  var xx = SIMD.Float64x2.shuffle(a, b, 0, 2);
  var xy = SIMD.Float64x2.shuffle(a, b, 0, 3);
  var yx = SIMD.Float64x2.shuffle(a, b, 1, 0);
  var yy = SIMD.Float64x2.shuffle(a, b, 1, 3);
  equal(1.0, SIMD.Float64x2.extractLane(xx, 0));
  equal(3.0, SIMD.Float64x2.extractLane(xx, 1));
  equal(1.0, SIMD.Float64x2.extractLane(xy, 0));
  equal(4.0, SIMD.Float64x2.extractLane(xy, 1));
  equal(2.0, SIMD.Float64x2.extractLane(yx, 0));
  equal(1.0, SIMD.Float64x2.extractLane(yx, 1));
  equal(2.0, SIMD.Float64x2.extractLane(yy, 0));
  equal(4.0, SIMD.Float64x2.extractLane(yy, 1));

  var c = SIMD.Float64x2.shuffle(a, b, 1, 0);
  var d = SIMD.Float64x2.shuffle(a, b, 3, 2);
  var e = SIMD.Float64x2.shuffle(a, b, 0, 1);
  var f = SIMD.Float64x2.shuffle(a, b, 0, 2);
  equal(2.0, SIMD.Float64x2.extractLane(c, 0));
  equal(1.0, SIMD.Float64x2.extractLane(c, 1));
  equal(4.0, SIMD.Float64x2.extractLane(d, 0));
  equal(3.0, SIMD.Float64x2.extractLane(d, 1));
  equal(1.0, SIMD.Float64x2.extractLane(e, 0));
  equal(2.0, SIMD.Float64x2.extractLane(e, 1));
  equal(1.0, SIMD.Float64x2.extractLane(f, 0));
  equal(3.0, SIMD.Float64x2.extractLane(f, 1));

  function testIndexCheck(index) {
      throws(function() { SIMD.Float64x2.shuffle(a, b, index, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(4);
});

test('Float64x2 replaceLane', function() {
    var a = SIMD.Float64x2(16.0, 9.0);
    var c = SIMD.Float64x2.replaceLane(a, 0, 20.0);
    equal(20.0, SIMD.Float64x2.extractLane(c, 0));
    equal(9.0, SIMD.Float64x2.extractLane(c, 1));
    c = SIMD.Float64x2.replaceLane(a, 1, 20.0);
    equal(16.0, SIMD.Float64x2.extractLane(c, 0));
    equal(20.0, SIMD.Float64x2.extractLane(c, 1));

    function testIndexCheck(index) {
      throws(function() { SIMD.Float64x2.replaceLane(a, index, 0.0); });
    }
    testIndexCheck(13.37);
    testIndexCheck(null);
    testIndexCheck(undefined);
    testIndexCheck({});
    testIndexCheck(true);
    testIndexCheck('yo');
    testIndexCheck(-1);
    testIndexCheck(8);
});

test('Float64x2 comparisons', function() {
  var m = SIMD.Float64x2(1.0, 2.0);
  var n = SIMD.Float64x2(2.0, 2.0);
  var o = SIMD.Float64x2(0.1, 0.001);
  var p = SIMD.Float64x2(0.001, 0.1);

  var cmp;
  cmp = SIMD.Float64x2.lessThan(m, n);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.lessThan(o, p);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.lessThanOrEqual(m, n);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.lessThanOrEqual(o, p);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.equal(m, n);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.equal(o, p);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.notEqual(m, n);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.notEqual(o, p);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.greaterThanOrEqual(m, n);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.greaterThanOrEqual(o, p);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.greaterThan(m, n);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.greaterThan(o, p);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));

  var o = SIMD.Float64x2(0.0, -0.0);
  var p = SIMD.Float64x2(-0.0, 0.0);
  var q = SIMD.Float64x2(0.0, NaN);
  var r = SIMD.Float64x2(NaN, 0.0);
  cmp = SIMD.Float64x2.lessThan(o, p);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.lessThan(q, r);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.lessThanOrEqual(o, p);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.lessThanOrEqual(q, r);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.equal(o, p);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.equal(q, r);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.notEqual(o, p);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.notEqual(q, r);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.greaterThanOrEqual(o, p);
  equal(true, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(true, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.greaterThanOrEqual(q, r);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));

  cmp = SIMD.Float64x2.greaterThan(o, p);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));
  cmp = SIMD.Float64x2.greaterThan(q, r);
  equal(false, SIMD.Bool64x2.extractLane(cmp, 0));
  equal(false, SIMD.Bool64x2.extractLane(cmp, 1));
});

test('Float64x2 select', function() {
  var m = SIMD.Bool64x2(true, false);
  var t = SIMD.Float64x2(1.0, 2.0);
  var f = SIMD.Float64x2(3.0, 4.0);
  var s = SIMD.Float64x2.select(m, t, f);
  equal(1.0, SIMD.Float64x2.extractLane(s, 0));
  equal(4.0, SIMD.Float64x2.extractLane(s, 1));
});

test('Float64x2 load', function() {
  var a = new Float64Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.Float64x2.load(a, i);
    equal(i, SIMD.Float64x2.extractLane(v, 0));
    equal(i+1, SIMD.Float64x2.extractLane(v, 1));
  }
});

test('Float64x2 unaligned load', function() {
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
    var v = SIMD.Float64x2.load(b, i * 8 + 1);
    equal(i, SIMD.Float64x2.extractLane(v, 0));
    equal(i+1, SIMD.Float64x2.extractLane(v, 1));
  }
});

test('Float64x2 load1', function() {
  var a = new Float64Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.Float64x2.load1(a, i);
    equal(i, SIMD.Float64x2.extractLane(v, 0));
    isPositiveZero(SIMD.Float64x2.extractLane(v, 1));
  }
});

test('Float64x2 unaligned load1', function() {
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
    var v = SIMD.Float64x2.load1(b, i * 8 + 1);
    equal(i, SIMD.Float64x2.extractLane(v, 0));
    isPositiveZero(SIMD.Float64x2.extractLane(v, 1));
  }
});

test('Float64x2 store', function() {
  var a = new Float64Array(6);
  SIMD.Float64x2.store(a, 0, SIMD.Float64x2(0, 1));
  SIMD.Float64x2.store(a, 2, SIMD.Float64x2(2, 3));
  SIMD.Float64x2.store(a, 4, SIMD.Float64x2(4, 5));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Float64x2(0, 1);
  equal(true, SIMD.Bool64x2.allTrue(SIMD.Float64x2.equal(SIMD.Float64x2.store(a, 0, v), v)));
});

test('Float64x2 unaligned store', function() {
  var c = new Int8Array(48 + 1);
  SIMD.Float64x2.store(c, 0 + 1, SIMD.Float64x2(0, 1));
  SIMD.Float64x2.store(c, 16 + 1, SIMD.Float64x2(2, 3));
  SIMD.Float64x2.store(c, 32 + 1, SIMD.Float64x2(4, 5));

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

test('Float64x2 store1', function() {
  var a = new Float64Array(4);
  SIMD.Float64x2.store1(a, 0, SIMD.Float64x2(0, -1));
  SIMD.Float64x2.store1(a, 1, SIMD.Float64x2(1, -1));
  SIMD.Float64x2.store1(a, 2, SIMD.Float64x2(2, -1));
  SIMD.Float64x2.store1(a, 3, SIMD.Float64x2(3, -1));
  for (var i = 0; i < a.length; i++) {
    equal(i, a[i]);
  }

  var v = SIMD.Float64x2(0, 1);
  equal(true, SIMD.Bool64x2.allTrue(SIMD.Float64x2.equal(SIMD.Float64x2.store1(a, 0, v), v)));
});

test('Float64x2 unaligned store1', function() {
  var c = new Int8Array(32 + 1);
  SIMD.Float64x2.store1(c, 0 + 1, SIMD.Float64x2(0, -1));
  SIMD.Float64x2.store1(c, 8 + 1, SIMD.Float64x2(1, -1));
  SIMD.Float64x2.store1(c, 16 + 1, SIMD.Float64x2(2, -1));
  SIMD.Float64x2.store1(c, 24 + 1, SIMD.Float64x2(3, -1));

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

test('Float64x2 load exceptions', function () {
  var a = new Float64Array(8);
  throws(function () {
    var f = SIMD.Float64x2.load(a, -1);
  });
  throws(function () {
    var f = SIMD.Float64x2.load(a, 7);
  });
  throws(function () {
    var f = SIMD.Float64x2.load(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Float64x2.load(a, "a");
  });
});

test('Float64x2 load1 exceptions', function () {
  var a = new Float64Array(8);
  throws(function () {
    var f = SIMD.Float64x2.load1(a, -1);
  });
  throws(function () {
    var f = SIMD.Float64x2.load1(a, 8);
  });
  throws(function () {
    var f = SIMD.Float64x2.load1(a.buffer, 1);
  });
  throws(function () {
    var f = SIMD.Float64x2.load1(a, "a");
  });
});

test('Float64x2 store exceptions', function () {
  var a = new Float64Array(8);
  var f = SIMD.Float64x2(1, 2);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Float64x2.store(a, -1, f);
  });
  throws(function () {
    SIMD.Float64x2.store(a, 7, f);
  });
  throws(function () {
    SIMD.Float64x2.store(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.Float64x2.store(a, "a", f);
  });
  throws(function () {
    SIMD.Float64x2.store(a, 1, i);
  });
});

test('Float64x2 store1 exceptions', function () {
  var a = new Float64Array(8);
  var f = SIMD.Float64x2(1, 2);
  var i = SIMD.Int32x4(1, 2, 3, 4);
  throws(function () {
    SIMD.Float64x2.store1(a, -1, f);
  });
  throws(function () {
    SIMD.Float64x2.store1(a, 8, f);
  });
  throws(function () {
    SIMD.Float64x2.store1(a.buffer, 1, f);
  });
  throws(function () {
    SIMD.Float64x2.store1(a, "a", f);
  });
  throws(function () {
    SIMD.Float64x2.store1(a, 1, i);
  });
});

test('Int32x4 fromFloat32x4 constructor', function() {
  var m = SIMD.Float32x4(1.0, 2.2, 3.6, 4.8);
  var n = SIMD.Int32x4.fromFloat32x4(m);
  equal(1, SIMD.Int32x4.extractLane(n, 0));
  equal(2, SIMD.Int32x4.extractLane(n, 1));
  equal(3, SIMD.Int32x4.extractLane(n, 2));
  equal(4, SIMD.Int32x4.extractLane(n, 3));

  m = SIMD.Float32x4(0.0, -0.0, -1.2, -3.8);
  n = SIMD.Int32x4.fromFloat32x4(m);
  equal(0, SIMD.Int32x4.extractLane(n, 0));
  equal(0, SIMD.Int32x4.extractLane(n, 1));
  equal(-1, SIMD.Int32x4.extractLane(n, 2));
  equal(-3, SIMD.Int32x4.extractLane(n, 3));

  throws(function() {
    SIMD.Int32x4.fromFloat32x4(SIMD.Float32x4(0x7fffffff, 0, 0, 0));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat32x4(SIMD.Float32x4(0, -0x80000081, 0, 0));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat32x4(SIMD.Float32x4(0, 0, 2147483648, 0));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat32x4(SIMD.Float32x4(0, 0, 0, -2147483904));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat32x4(SIMD.Float32x4(Infinity, 0, 0, 0));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat32x4(SIMD.Float32x4(0, -Infinity, 0, 0));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat32x4(SIMD.Float32x4(0, 0, NaN, 0));
  });
});

test('Int32x4 fromFloat64x2 constructor', function() {
  var m = SIMD.Float64x2(1.0, 2.2);
  var n = SIMD.Int32x4.fromFloat64x2(m);
  equal(1, SIMD.Int32x4.extractLane(n, 0));
  equal(2, SIMD.Int32x4.extractLane(n, 1));
  equal(0, SIMD.Int32x4.extractLane(n, 2));
  equal(0, SIMD.Int32x4.extractLane(n, 3));

  m = SIMD.Float64x2(3.6, 4.8);
  n = SIMD.Int32x4.fromFloat64x2(m);
  equal(3, SIMD.Int32x4.extractLane(n, 0));
  equal(4, SIMD.Int32x4.extractLane(n, 1));
  equal(0, SIMD.Int32x4.extractLane(n, 2));
  equal(0, SIMD.Int32x4.extractLane(n, 3));

  m = SIMD.Float64x2(0.0, -0.0);
  n = SIMD.Int32x4.fromFloat64x2(m);
  equal(0, SIMD.Int32x4.extractLane(n, 0));
  equal(0, SIMD.Int32x4.extractLane(n, 1));
  equal(0, SIMD.Int32x4.extractLane(n, 2));
  equal(0, SIMD.Int32x4.extractLane(n, 3));

  m = SIMD.Float64x2(-1.2, -3.8);
  n = SIMD.Int32x4.fromFloat64x2(m);
  equal(-1, SIMD.Int32x4.extractLane(n, 0));
  equal(-3, SIMD.Int32x4.extractLane(n, 1));
  equal(0, SIMD.Int32x4.extractLane(n, 2));
  equal(0, SIMD.Int32x4.extractLane(n, 3));

  m = SIMD.Float64x2(2147483647.9, -2147483648.9);
  n = SIMD.Int32x4.fromFloat64x2(m);
  equal(2147483647, SIMD.Int32x4.extractLane(n, 0));
  equal(-2147483648, SIMD.Int32x4.extractLane(n, 1));

  throws(function() {
    SIMD.Int32x4.fromFloat64x2(SIMD.Float64x2(0x80000000, 0));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat64x2(SIMD.Float64x2(0, -0x80000001));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat64x2(SIMD.Float64x2(Infinity, 0));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat64x2(SIMD.Float64x2(0, -Infinity));
  });
  throws(function() {
    SIMD.Int32x4.fromFloat64x2(SIMD.Float64x2(NaN, 0));
  });
});

test('Int32x4 fromFloat32x4Bits constructor', function() {
  var m = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.Int32x4.fromFloat32x4Bits(m);
  equal(0x3F800000, SIMD.Int32x4.extractLane(n, 0));
  equal(0x40000000, SIMD.Int32x4.extractLane(n, 1));
  equal(0x40400000, SIMD.Int32x4.extractLane(n, 2));
  equal(0x40800000, SIMD.Int32x4.extractLane(n, 3));
});

test('Int32x4 fromFloat64x2Bits constructor', function() {
  var m = SIMD.Float64x2(1.0, 2.0);
  var n = SIMD.Int32x4.fromFloat64x2Bits(m);
  equal(0x00000000, SIMD.Int32x4.extractLane(n, 0));
  equal(0x3FF00000, SIMD.Int32x4.extractLane(n, 1));
  equal(0x00000000, SIMD.Int32x4.extractLane(n, 2));
  equal(0x40000000, SIMD.Int32x4.extractLane(n, 3));
});

test('Int32x4 swizzle', function() {
  var a    = SIMD.Int32x4(1, 2, 3, 2147483647);
  var xyxy = SIMD.Int32x4.swizzle(a, 0, 1, 0, 1);
  var zwzw = SIMD.Int32x4.swizzle(a, 2, 3, 2, 3);
  var xxxx = SIMD.Int32x4.swizzle(a, 0, 0, 0, 0);
  equal(1, SIMD.Int32x4.extractLane(xyxy, 0));
  equal(2, SIMD.Int32x4.extractLane(xyxy, 1));
  equal(1, SIMD.Int32x4.extractLane(xyxy, 2));
  equal(2, SIMD.Int32x4.extractLane(xyxy, 3));
  equal(3, SIMD.Int32x4.extractLane(zwzw, 0));
  equal(2147483647, SIMD.Int32x4.extractLane(zwzw, 1));
  equal(3, SIMD.Int32x4.extractLane(zwzw, 2));
  equal(2147483647, SIMD.Int32x4.extractLane(zwzw, 3));
  equal(1, SIMD.Int32x4.extractLane(xxxx, 0));
  equal(1, SIMD.Int32x4.extractLane(xxxx, 1));
  equal(1, SIMD.Int32x4.extractLane(xxxx, 2));
  equal(1, SIMD.Int32x4.extractLane(xxxx, 3));

  function testIndexCheck(index) {
      throws(function() { SIMD.Int32x4.swizzle(a, index, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(4);
});

test('Int32x4 shuffle', function() {
  var a    = SIMD.Int32x4(1, 2, 3, 4);
  var b    = SIMD.Int32x4(5, 6, 7, 2147483647);
  var xyxy = SIMD.Int32x4.shuffle(a, b, 0, 1, 4, 5);
  var zwzw = SIMD.Int32x4.shuffle(a, b, 2, 3, 6, 7);
  var xxxx = SIMD.Int32x4.shuffle(a, b, 0, 0, 4, 4);
  equal(1, SIMD.Int32x4.extractLane(xyxy, 0));
  equal(2, SIMD.Int32x4.extractLane(xyxy, 1));
  equal(5, SIMD.Int32x4.extractLane(xyxy, 2));
  equal(6, SIMD.Int32x4.extractLane(xyxy, 3));
  equal(3, SIMD.Int32x4.extractLane(zwzw, 0));
  equal(4, SIMD.Int32x4.extractLane(zwzw, 1));
  equal(7, SIMD.Int32x4.extractLane(zwzw, 2));
  equal(2147483647, SIMD.Int32x4.extractLane(zwzw, 3));
  equal(1, SIMD.Int32x4.extractLane(xxxx, 0));
  equal(1, SIMD.Int32x4.extractLane(xxxx, 1));
  equal(5, SIMD.Int32x4.extractLane(xxxx, 2));
  equal(5, SIMD.Int32x4.extractLane(xxxx, 3));

  var c = SIMD.Int32x4.shuffle(a, b, 0, 4, 5, 1);
  var d = SIMD.Int32x4.shuffle(a, b, 2, 6, 3, 7);
  var e = SIMD.Int32x4.shuffle(a, b, 0, 4, 0, 4);
  equal(1, SIMD.Int32x4.extractLane(c, 0));
  equal(5, SIMD.Int32x4.extractLane(c, 1));
  equal(6, SIMD.Int32x4.extractLane(c, 2));
  equal(2, SIMD.Int32x4.extractLane(c, 3));
  equal(3, SIMD.Int32x4.extractLane(d, 0));
  equal(7, SIMD.Int32x4.extractLane(d, 1));
  equal(4, SIMD.Int32x4.extractLane(d, 2));
  equal(2147483647, SIMD.Int32x4.extractLane(d, 3));
  equal(1, SIMD.Int32x4.extractLane(e, 0));
  equal(5, SIMD.Int32x4.extractLane(e, 1));
  equal(1, SIMD.Int32x4.extractLane(e, 2));
  equal(5, SIMD.Int32x4.extractLane(e, 3));

  function testIndexCheck(index) {
      throws(function() { SIMD.Int32x4.shuffle(a, b, index, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(8);
});

test('Int32x4 replaceLane', function() {
    var a = SIMD.Int32x4(1, 2, 3, 4);
    var c = SIMD.Int32x4.replaceLane(a, 0, 20);
    equal(20, SIMD.Int32x4.extractLane(c, 0));
    equal(2, SIMD.Int32x4.extractLane(c, 1));
    equal(3, SIMD.Int32x4.extractLane(c, 2));
    equal(4, SIMD.Int32x4.extractLane(c, 3));
    c = SIMD.Int32x4.replaceLane(a, 1, 20);
    equal(1, SIMD.Int32x4.extractLane(c, 0));
    equal(20, SIMD.Int32x4.extractLane(c, 1));
    equal(3, SIMD.Int32x4.extractLane(c, 2));
    equal(4, SIMD.Int32x4.extractLane(c, 3));
    c = SIMD.Int32x4.replaceLane(a, 2, 20);
    equal(1, SIMD.Int32x4.extractLane(c, 0));
    equal(2, SIMD.Int32x4.extractLane(c, 1));
    equal(20, SIMD.Int32x4.extractLane(c, 2));
    equal(4, SIMD.Int32x4.extractLane(c, 3));
    c = SIMD.Int32x4.replaceLane(a, 3, 20);
    equal(1, SIMD.Int32x4.extractLane(c, 0));
    equal(2, SIMD.Int32x4.extractLane(c, 1));
    equal(3, SIMD.Int32x4.extractLane(c, 2));
    equal(20, SIMD.Int32x4.extractLane(c, 3));

    function testIndexCheck(index) {
      throws(function() { SIMD.Int32x4.replaceLane(a, index, 0.0); });
    }
    testIndexCheck(13.37);
    testIndexCheck(null);
    testIndexCheck(undefined);
    testIndexCheck({});
    testIndexCheck(true);
    testIndexCheck('yo');
    testIndexCheck(-1);
    testIndexCheck(8);
});

test('Int32x4 and', function() {
  var m = SIMD.Int32x4(0xAAAAAAAA, 0xAAAAAAAA, -1431655766, 0xAAAAAAAA);
  var n = SIMD.Int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  equal(-1431655766, SIMD.Int32x4.extractLane(m, 0));
  equal(-1431655766, SIMD.Int32x4.extractLane(m, 1));
  equal(-1431655766, SIMD.Int32x4.extractLane(m, 2));
  equal(-1431655766, SIMD.Int32x4.extractLane(m, 3));
  equal(0x55555555, SIMD.Int32x4.extractLane(n, 0));
  equal(0x55555555, SIMD.Int32x4.extractLane(n, 1));
  equal(0x55555555, SIMD.Int32x4.extractLane(n, 2));
  equal(0x55555555, SIMD.Int32x4.extractLane(n, 3));
  var o = SIMD.Int32x4.and(m,n);  // and
  equal(0x0, SIMD.Int32x4.extractLane(o, 0));
  equal(0x0, SIMD.Int32x4.extractLane(o, 1));
  equal(0x0, SIMD.Int32x4.extractLane(o, 2));
  equal(0x0, SIMD.Int32x4.extractLane(o, 3));
});

test('Int32x4 or', function() {
  var m = SIMD.Int32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = SIMD.Int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  var o = SIMD.Int32x4.or(m,n);  // or
  equal(-1, SIMD.Int32x4.extractLane(o, 0));
  equal(-1, SIMD.Int32x4.extractLane(o, 1));
  equal(-1, SIMD.Int32x4.extractLane(o, 2));
  equal(-1, SIMD.Int32x4.extractLane(o, 3));
});

test('Int32x4 xor', function() {
  var m = SIMD.Int32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = SIMD.Int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  n = SIMD.Int32x4.replaceLane(n, 0, 0xAAAAAAAA);
  n = SIMD.Int32x4.replaceLane(n, 1, 0xAAAAAAAA);
  n = SIMD.Int32x4.replaceLane(n, 2, 0xAAAAAAAA);
  n = SIMD.Int32x4.replaceLane(n, 3, 0xAAAAAAAA);
  equal(-1431655766, SIMD.Int32x4.extractLane(n, 0));
  equal(-1431655766, SIMD.Int32x4.extractLane(n, 1));
  equal(-1431655766, SIMD.Int32x4.extractLane(n, 2));
  equal(-1431655766, SIMD.Int32x4.extractLane(n, 3));
  var o = SIMD.Int32x4.xor(m,n);  // xor
  equal(0x0, SIMD.Int32x4.extractLane(o, 0));
  equal(0x0, SIMD.Int32x4.extractLane(o, 1));
  equal(0x0, SIMD.Int32x4.extractLane(o, 2));
  equal(0x0, SIMD.Int32x4.extractLane(o, 3));
});

test('Int32x4 neg', function() {
  var m = SIMD.Int32x4(16, -32, 64, -128);
  m = SIMD.Int32x4.neg(m);
  equal(-16, SIMD.Int32x4.extractLane(m, 0));
  equal(32, SIMD.Int32x4.extractLane(m, 1));
  equal(-64, SIMD.Int32x4.extractLane(m, 2));
  equal(128, SIMD.Int32x4.extractLane(m, 3));

  var n = SIMD.Int32x4(0, 0x7fffffff, -1, 0x80000000);
  n = SIMD.Int32x4.neg(n);
  equal(0, SIMD.Int32x4.extractLane(n, 0));
  equal(-2147483647, SIMD.Int32x4.extractLane(n, 1));
  equal(1, SIMD.Int32x4.extractLane(n, 2));
  equal(-2147483648, SIMD.Int32x4.extractLane(n, 3));
});

test('Int32x4 vector getters', function () {
  var a = SIMD.Int32x4(4, 3, 2, 1);
  var xxxx = SIMD.Int32x4.swizzle(a, 0, 0, 0, 0);
  var yyyy = SIMD.Int32x4.swizzle(a, 1, 1, 1, 1);
  var zzzz = SIMD.Int32x4.swizzle(a, 2, 2, 2, 2);
  var wwww = SIMD.Int32x4.swizzle(a, 3, 3, 3, 3);
  var wzyx = SIMD.Int32x4.swizzle(a, 3, 2, 1, 0);
  equal(4, SIMD.Int32x4.extractLane(xxxx, 0));
  equal(4, SIMD.Int32x4.extractLane(xxxx, 1));
  equal(4, SIMD.Int32x4.extractLane(xxxx, 2));
  equal(4, SIMD.Int32x4.extractLane(xxxx, 3));
  equal(3, SIMD.Int32x4.extractLane(yyyy, 0));
  equal(3, SIMD.Int32x4.extractLane(yyyy, 1));
  equal(3, SIMD.Int32x4.extractLane(yyyy, 2));
  equal(3, SIMD.Int32x4.extractLane(yyyy, 3));
  equal(2, SIMD.Int32x4.extractLane(zzzz, 0));
  equal(2, SIMD.Int32x4.extractLane(zzzz, 1));
  equal(2, SIMD.Int32x4.extractLane(zzzz, 2));
  equal(2, SIMD.Int32x4.extractLane(zzzz, 3));
  equal(1, SIMD.Int32x4.extractLane(wwww, 0));
  equal(1, SIMD.Int32x4.extractLane(wwww, 1));
  equal(1, SIMD.Int32x4.extractLane(wwww, 2));
  equal(1, SIMD.Int32x4.extractLane(wwww, 3));
  equal(1, SIMD.Int32x4.extractLane(wzyx, 0));
  equal(2, SIMD.Int32x4.extractLane(wzyx, 1));
  equal(3, SIMD.Int32x4.extractLane(wzyx, 2));
  equal(4, SIMD.Int32x4.extractLane(wzyx, 3));
});

test('Int32x4 add', function() {
  var a = SIMD.Int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x7fffffff, 0x0);
  var b = SIMD.Int32x4(0x1, 0xFFFFFFFF, 0x1, 0xFFFFFFFF);
  var c = SIMD.Int32x4.add(a, b);
  equal(0x0, SIMD.Int32x4.extractLane(c, 0));
  equal(-2, SIMD.Int32x4.extractLane(c, 1));
  equal(-0x80000000, SIMD.Int32x4.extractLane(c, 2));
  equal(-1, SIMD.Int32x4.extractLane(c, 3));
});

test('Int32x4 sub', function() {
  var a = SIMD.Int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x80000000, 0x0);
  var b = SIMD.Int32x4(0x1, 0xFFFFFFFF, 0x1, 0xFFFFFFFF);
  var c = SIMD.Int32x4.sub(a, b);
  equal(-2, SIMD.Int32x4.extractLane(c, 0));
  equal(0x0, SIMD.Int32x4.extractLane(c, 1));
  equal(0x7FFFFFFF, SIMD.Int32x4.extractLane(c, 2));
  equal(0x1, SIMD.Int32x4.extractLane(c, 3));
});

test('Int32x4 mul', function() {
  var a = SIMD.Int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x80000000, 0x0);
  var b = SIMD.Int32x4(0x1, 0xFFFFFFFF, 0x80000000, 0xFFFFFFFF);
  var c = SIMD.Int32x4.mul(a, b);
  equal(-1, SIMD.Int32x4.extractLane(c, 0));
  equal(0x1, SIMD.Int32x4.extractLane(c, 1));
  equal(0x0, SIMD.Int32x4.extractLane(c, 2));
  equal(0x0, SIMD.Int32x4.extractLane(c, 3));
});

test('Int32x4 unsignedHorizontalSum', function() {
  var a = SIMD.Int32x4.splat(0);
  var b = SIMD.Int32x4.unsignedHorizontalSum(a);
  equal(0, b);

  var a = SIMD.Int32x4.splat(-1);
  var b = SIMD.Int32x4.unsignedHorizontalSum(a);
  equal(17179869180, b);

  a = SIMD.Int32x4(0xFF, 0, 0xFF, 1);
  b = SIMD.Int32x4.unsignedHorizontalSum(a);
  equal(511, b);
});

test('Int32x4 comparisons', function() {
  var m = SIMD.Int32x4(1000, 2000, 100, 1);
  var n = SIMD.Int32x4(-2000, 2000, 1, 100);
  var cmp;
  cmp = SIMD.Int32x4.lessThan(m, n);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Int32x4.lessThanOrEqual(m, n);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Int32x4.equal(m, n);
  equal(false, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Int32x4.notEqual(m, n);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Int32x4.greaterThan(m, n);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));

  cmp = SIMD.Int32x4.greaterThanOrEqual(m, n);
  equal(true, SIMD.Bool32x4.extractLane(cmp, 0));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 1));
  equal(true, SIMD.Bool32x4.extractLane(cmp, 2));
  equal(false, SIMD.Bool32x4.extractLane(cmp, 3));
});

test('Int32x4 shiftLeftByScalar', function() {
  var a = SIMD.Int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.Int32x4.shiftLeftByScalar(a, 1);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xfffffffe|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0xfffffffe|0);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000002);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftLeftByScalar(a, 2);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xfffffffc|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0xfffffffc|0);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000004);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftLeftByScalar(a, 30);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xc0000000|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0xc0000000|0);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x40000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftLeftByScalar(a, 31);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x80000000|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x80000000|0);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x80000000|0);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x0);
  b = SIMD.Int32x4.shiftLeftByScalar(a, 32);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x0);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x0);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x0);
  b = SIMD.Int32x4.shiftLeftByScalar(a, -1);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x0);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x0);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x0);
});

test('Int32x4 shiftRightArithmeticByScalar', function() {
  var a = SIMD.Int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.Int32x4.shiftRightArithmeticByScalar(a, 1);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xffffffff|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x3fffffff);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightArithmeticByScalar(a, 2);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xffffffff|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x1fffffff);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightArithmeticByScalar(a, 30);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xffffffff|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x00000001);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightArithmeticByScalar(a, 31);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xffffffff|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightArithmeticByScalar(a, 32);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xffffffff|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightArithmeticByScalar(a, -1);
  equal(SIMD.Int32x4.extractLane(b, 0), 0xffffffff|0);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
});

test('Int32x4 shiftRightLogicalByScalar', function() {
  var a = SIMD.Int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.Int32x4.shiftRightLogicalByScalar(a, 1);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x7fffffff);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x3fffffff);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightLogicalByScalar(a, 2);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x3fffffff);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x1fffffff);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightLogicalByScalar(a, 30);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x00000003);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x00000001);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightLogicalByScalar(a, 31);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x00000001);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightLogicalByScalar(a, 32);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.Int32x4.shiftRightLogicalByScalar(a, -1);
  equal(SIMD.Int32x4.extractLane(b, 0), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 1), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 2), 0x00000000);
  equal(SIMD.Int32x4.extractLane(b, 3), 0x00000000);
});

test('Int32x4 select', function() {
  var m = SIMD.Bool32x4(true, true, false, false);
  var t = SIMD.Int32x4(1, 2, 3, 4);
  var f = SIMD.Int32x4(5, 6, 7, 8);
  var s = SIMD.Int32x4.select(m, t, f);
  equal(1, SIMD.Int32x4.extractLane(s, 0));
  equal(2, SIMD.Int32x4.extractLane(s, 1));
  equal(7, SIMD.Int32x4.extractLane(s, 2));
  equal(8, SIMD.Int32x4.extractLane(s, 3));
});

test('Int32x4 selectBits', function() {
  var m = SIMD.Int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.Int32x4(1, 2, 3, 4);
  var f = SIMD.Int32x4(5, 6, 7, 8);
  var s = SIMD.Int32x4.selectBits(m, t, f);
  equal(5, SIMD.Int32x4.extractLane(s, 0));
  equal(6, SIMD.Int32x4.extractLane(s, 1));
  equal(3, SIMD.Int32x4.extractLane(s, 2));
  equal(12, SIMD.Int32x4.extractLane(s, 3));
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

test('Int16x8 fromFloat32x4Bits constructor', function() {
  var m = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.Int16x8.fromFloat32x4Bits(m);
  equal(0x0000, SIMD.Int16x8.extractLane(n, 0));
  equal(0x3F80, SIMD.Int16x8.extractLane(n, 1));
  equal(0x0000, SIMD.Int16x8.extractLane(n, 2));
  equal(0x4000, SIMD.Int16x8.extractLane(n, 3));
  equal(0x0000, SIMD.Int16x8.extractLane(n, 4));
  equal(0x4040, SIMD.Int16x8.extractLane(n, 5));  
  equal(0x0000, SIMD.Int16x8.extractLane(n, 6));
  equal(0x4080, SIMD.Int16x8.extractLane(n, 7));
});

test('Int16x8 swizzle', function() {
  var a    = SIMD.Int16x8(1, 2, 3, 2147483647, 5, 6, 7, -37);
  var xyxy = SIMD.Int16x8.swizzle(a, 0, 1, 0, 1, 0, 1, 0, 1);
  var zwzw = SIMD.Int16x8.swizzle(a, 4, 5, 4, 5, 4, 5, 4, 5);
  var xxxx = SIMD.Int16x8.swizzle(a, 0, 0, 0, 0, 0, 0, 0, 0);
  equal(1, SIMD.Int16x8.extractLane(xyxy, 0));
  equal(2, SIMD.Int16x8.extractLane(xyxy, 1));
  equal(1, SIMD.Int16x8.extractLane(xyxy, 2));
  equal(2, SIMD.Int16x8.extractLane(xyxy, 3));
  equal(1, SIMD.Int16x8.extractLane(xyxy, 4));
  equal(2, SIMD.Int16x8.extractLane(xyxy, 5));
  equal(1, SIMD.Int16x8.extractLane(xyxy, 6));
  equal(2, SIMD.Int16x8.extractLane(xyxy, 7));
  equal(5, SIMD.Int16x8.extractLane(zwzw, 0));
  equal(6, SIMD.Int16x8.extractLane(zwzw, 1));
  equal(5, SIMD.Int16x8.extractLane(zwzw, 2));
  equal(6, SIMD.Int16x8.extractLane(zwzw, 3));
  equal(5, SIMD.Int16x8.extractLane(zwzw, 4));
  equal(6, SIMD.Int16x8.extractLane(zwzw, 5));
  equal(5, SIMD.Int16x8.extractLane(zwzw, 6));
  equal(6, SIMD.Int16x8.extractLane(zwzw, 7));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 0));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 1));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 2));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 3));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 4));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 5));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 6));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 7));

  function testIndexCheck(index) {
      throws(function() { SIMD.Int16x8.swizzle(a, index, 0, 0, 0, 0, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(8);
});

test('Int16x8 shuffle', function() {
  var a    = SIMD.Int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var b    = SIMD.Int16x8(9, 10, 11, 12, 13, 14, 15, 32767);
  var xyxy = SIMD.Int16x8.shuffle(a, b, 0, 1, 2, 3, 8, 9, 10, 11);
  var zwzw = SIMD.Int16x8.shuffle(a, b, 4, 5, 6, 7, 12, 13, 14, 15);
  var xxxx = SIMD.Int16x8.shuffle(a, b, 0, 0, 0, 0, 8, 8, 8, 8);
  equal(1, SIMD.Int16x8.extractLane(xyxy, 0));
  equal(2, SIMD.Int16x8.extractLane(xyxy, 1));
  equal(3, SIMD.Int16x8.extractLane(xyxy, 2));
  equal(4, SIMD.Int16x8.extractLane(xyxy, 3));
  equal(9, SIMD.Int16x8.extractLane(xyxy, 4));
  equal(10, SIMD.Int16x8.extractLane(xyxy, 5));
  equal(11, SIMD.Int16x8.extractLane(xyxy, 6));
  equal(12, SIMD.Int16x8.extractLane(xyxy, 7));
  equal(5, SIMD.Int16x8.extractLane(zwzw, 0));
  equal(6, SIMD.Int16x8.extractLane(zwzw, 1));
  equal(7, SIMD.Int16x8.extractLane(zwzw, 2));
  equal(8, SIMD.Int16x8.extractLane(zwzw, 3));
  equal(13, SIMD.Int16x8.extractLane(zwzw, 4));
  equal(14, SIMD.Int16x8.extractLane(zwzw, 5));
  equal(15, SIMD.Int16x8.extractLane(zwzw, 6));
  equal(32767, SIMD.Int16x8.extractLane(zwzw, 7));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 0));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 1));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 2));
  equal(1, SIMD.Int16x8.extractLane(xxxx, 3));
  equal(9, SIMD.Int16x8.extractLane(xxxx, 4));
  equal(9, SIMD.Int16x8.extractLane(xxxx, 5));
  equal(9, SIMD.Int16x8.extractLane(xxxx, 6));
  equal(9, SIMD.Int16x8.extractLane(xxxx, 7));

  function testIndexCheck(index) {
      throws(function() { SIMD.Int16x8.shuffle(a, b, index, 0, 0, 0, 0, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(16);
});

test('Int16x8 and', function() {
  var m = SIMD.Int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 43690, 43690, 0xAAAA, 0xAAAA);
  var n = SIMD.Int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  equal(-21846, SIMD.Int16x8.extractLane(m, 0));
  equal(-21846, SIMD.Int16x8.extractLane(m, 1));
  equal(-21846, SIMD.Int16x8.extractLane(m, 2));
  equal(-21846, SIMD.Int16x8.extractLane(m, 3));
  equal(-21846, SIMD.Int16x8.extractLane(m, 4));
  equal(-21846, SIMD.Int16x8.extractLane(m, 5));
  equal(-21846, SIMD.Int16x8.extractLane(m, 6));
  equal(-21846, SIMD.Int16x8.extractLane(m, 7));
  equal(0x5555, SIMD.Int16x8.extractLane(n, 0));
  equal(0x5555, SIMD.Int16x8.extractLane(n, 1));
  equal(0x5555, SIMD.Int16x8.extractLane(n, 2));
  equal(0x5555, SIMD.Int16x8.extractLane(n, 3));
  equal(0x5555, SIMD.Int16x8.extractLane(n, 4));
  equal(0x5555, SIMD.Int16x8.extractLane(n, 5));
  equal(0x5555, SIMD.Int16x8.extractLane(n, 6));
  equal(0x5555, SIMD.Int16x8.extractLane(n, 7));
  var o = SIMD.Int16x8.and(m,n);  // and
  equal(0x0, SIMD.Int16x8.extractLane(o, 0));
  equal(0x0, SIMD.Int16x8.extractLane(o, 1));
  equal(0x0, SIMD.Int16x8.extractLane(o, 2));
  equal(0x0, SIMD.Int16x8.extractLane(o, 3));
  equal(0x0, SIMD.Int16x8.extractLane(o, 4));
  equal(0x0, SIMD.Int16x8.extractLane(o, 5));
  equal(0x0, SIMD.Int16x8.extractLane(o, 6));
  equal(0x0, SIMD.Int16x8.extractLane(o, 7));
});

test('Int16x8 or', function() {
  var m = SIMD.Int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA);
  var n = SIMD.Int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  var o = SIMD.Int16x8.or(m,n);  // or
  equal(-1, SIMD.Int16x8.extractLane(o, 0));
  equal(-1, SIMD.Int16x8.extractLane(o, 1));
  equal(-1, SIMD.Int16x8.extractLane(o, 2));
  equal(-1, SIMD.Int16x8.extractLane(o, 3));
  equal(-1, SIMD.Int16x8.extractLane(o, 4));
  equal(-1, SIMD.Int16x8.extractLane(o, 5));
  equal(-1, SIMD.Int16x8.extractLane(o, 6));
  equal(-1, SIMD.Int16x8.extractLane(o, 7));
});

test('Int16x8 xor', function() {
  var m = SIMD.Int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA);
  var n = SIMD.Int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  var o = SIMD.Int16x8.xor(m,n);  // xor
  equal(-1, SIMD.Int16x8.extractLane(o, 0));
  equal(-1, SIMD.Int16x8.extractLane(o, 1));
  equal(-1, SIMD.Int16x8.extractLane(o, 2));
  equal(-1, SIMD.Int16x8.extractLane(o, 3));
  equal(-1, SIMD.Int16x8.extractLane(o, 4));
  equal(-1, SIMD.Int16x8.extractLane(o, 5));
  equal(-1, SIMD.Int16x8.extractLane(o, 6));
  equal(-1, SIMD.Int16x8.extractLane(o, 7));
  o = SIMD.Int16x8.xor(m,m);  // xor
  equal(0x0, SIMD.Int16x8.extractLane(o, 0));
  equal(0x0, SIMD.Int16x8.extractLane(o, 1));
  equal(0x0, SIMD.Int16x8.extractLane(o, 2));
  equal(0x0, SIMD.Int16x8.extractLane(o, 3));
  equal(0x0, SIMD.Int16x8.extractLane(o, 4));
  equal(0x0, SIMD.Int16x8.extractLane(o, 5));
  equal(0x0, SIMD.Int16x8.extractLane(o, 6));
  equal(0x0, SIMD.Int16x8.extractLane(o, 7));
});

test('Int16x8 neg', function() {
  var m = SIMD.Int16x8(16, -32, 64, -128, 256, -512, 1024, -2048);
  m = SIMD.Int16x8.neg(m);
  equal(-16, SIMD.Int16x8.extractLane(m, 0));
  equal(32, SIMD.Int16x8.extractLane(m, 1));
  equal(-64, SIMD.Int16x8.extractLane(m, 2));
  equal(128, SIMD.Int16x8.extractLane(m, 3));
  equal(-256, SIMD.Int16x8.extractLane(m, 4));
  equal(512, SIMD.Int16x8.extractLane(m, 5));
  equal(-1024, SIMD.Int16x8.extractLane(m, 6));
  equal(2048, SIMD.Int16x8.extractLane(m, 7));

  var n = SIMD.Int16x8(0, 0, 0x7fff, 0xffff, -1, -1, 0x8000, 0x0000);
  n = SIMD.Int16x8.neg(n);
  equal(0, SIMD.Int16x8.extractLane(n, 0));
  equal(0, SIMD.Int16x8.extractLane(n, 1));
  equal(-32767, SIMD.Int16x8.extractLane(n, 2));
  equal(1, SIMD.Int16x8.extractLane(n, 3));
  equal(1, SIMD.Int16x8.extractLane(n, 4));
  equal(1, SIMD.Int16x8.extractLane(n, 5));
  equal(-32768, SIMD.Int16x8.extractLane(n, 6));
  equal(0, SIMD.Int16x8.extractLane(n, 7));
});

test('Int16x8 scalar getters', function () {
  var a = SIMD.Int16x8(0, 1, -1, -2, 65535, 255, 65536, -500);
  equal(0, SIMD.Int16x8.extractLane(a, 0));
  equal(1, SIMD.Int16x8.extractLane(a, 1));
  equal(-1, SIMD.Int16x8.extractLane(a, 2));
  equal(-2, SIMD.Int16x8.extractLane(a, 3));
  equal(-1, SIMD.Int16x8.extractLane(a, 4));
  equal(255, SIMD.Int16x8.extractLane(a, 5));
  equal(0, SIMD.Int16x8.extractLane(a, 6));
  equal(-500, SIMD.Int16x8.extractLane(a, 7));

  equal(0, SIMD.Int16x8.unsignedExtractLane(a, 0));
  equal(1, SIMD.Int16x8.unsignedExtractLane(a, 1));
  equal(65535, SIMD.Int16x8.unsignedExtractLane(a, 2));
  equal(65534, SIMD.Int16x8.unsignedExtractLane(a, 3));
  equal(65535, SIMD.Int16x8.unsignedExtractLane(a, 4));
  equal(255, SIMD.Int16x8.unsignedExtractLane(a, 5));
  equal(0, SIMD.Int16x8.unsignedExtractLane(a, 6));
  equal(65036, SIMD.Int16x8.unsignedExtractLane(a, 7));
});

test('Int16x8 add', function() {
  var a = SIMD.Int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x7fff, 0xffff, 0x0, 0x0);
  var b = SIMD.Int16x8(0x0, 0x1, 0xFFFF, 0xFFFF, 0x0, 0x1, 0xFFFF, 0xFFFF);
  var c = SIMD.Int16x8.add(a, b);
  equal(-1, SIMD.Int16x8.extractLane(c, 0));
  equal(0, SIMD.Int16x8.extractLane(c, 1));
  equal(-2, SIMD.Int16x8.extractLane(c, 2));
  equal(-2, SIMD.Int16x8.extractLane(c, 3));
  equal(0x7fff, SIMD.Int16x8.extractLane(c, 4));
  equal(0, SIMD.Int16x8.extractLane(c, 5));
  equal(-1, SIMD.Int16x8.extractLane(c, 6));
  equal(-1, SIMD.Int16x8.extractLane(c, 7));
});

test('Int16x8 sub', function() {
  var a = SIMD.Int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0x0, 0x0);
  var b = SIMD.Int16x8(0x0, 0x1, 0xFFFF, 0x0FFFF, 0x0, 0x1, 0xFFFF, 0xFFFF);
  var c = SIMD.Int16x8.sub(a, b);
  equal(-1, SIMD.Int16x8.extractLane(c, 0));
  equal(-2, SIMD.Int16x8.extractLane(c, 1));
  equal(0, SIMD.Int16x8.extractLane(c, 2));
  equal(0, SIMD.Int16x8.extractLane(c, 3));
  equal(-32768, SIMD.Int16x8.extractLane(c, 4));
  equal(-1, SIMD.Int16x8.extractLane(c, 5));
  equal(1, SIMD.Int16x8.extractLane(c, 6));
  equal(1, SIMD.Int16x8.extractLane(c, 7));
});

test('Int16x8 mul', function() {
  var a = SIMD.Int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0x0, 0x0);
  var b = SIMD.Int16x8(0x0, 0x1, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0xFFFF, 0xFFFF);
  var c = SIMD.Int16x8.mul(a, b);
  equal(0, SIMD.Int16x8.extractLane(c, 0));
  equal(-1, SIMD.Int16x8.extractLane(c, 1));
  equal(1, SIMD.Int16x8.extractLane(c, 2));
  equal(1, SIMD.Int16x8.extractLane(c, 3));
  equal(0, SIMD.Int16x8.extractLane(c, 4));
  equal(0, SIMD.Int16x8.extractLane(c, 5));
  equal(0, SIMD.Int16x8.extractLane(c, 6));
  equal(0, SIMD.Int16x8.extractLane(c, 7));
});

test('Int16x8 addSaturate', function() {
  var a = SIMD.Int16x8(0, 1, 0x7fff, 0x8000, -1, 0x7ffe, 0x8001, 10);
  var b = SIMD.Int16x8.splat(1);
  var c = SIMD.Int16x8.splat(-1);
  var d = SIMD.Int16x8.addSaturate(a, b);
  var e = SIMD.Int16x8.addSaturate(a, c);
  equal(1, SIMD.Int16x8.extractLane(d, 0));
  equal(2, SIMD.Int16x8.extractLane(d, 1));
  equal(0x7fff, SIMD.Int16x8.extractLane(d, 2));
  equal(-0x7fff, SIMD.Int16x8.extractLane(d, 3));
  equal(0, SIMD.Int16x8.extractLane(d, 4));
  equal(0x7fff, SIMD.Int16x8.extractLane(d, 5));
  equal(-0x7ffe, SIMD.Int16x8.extractLane(d, 6));
  equal(11, SIMD.Int16x8.extractLane(d, 7));
  equal(-1, SIMD.Int16x8.extractLane(e, 0));
  equal(0, SIMD.Int16x8.extractLane(e, 1));
  equal(0x7ffe, SIMD.Int16x8.extractLane(e, 2));
  equal(-0x8000, SIMD.Int16x8.extractLane(e, 3));
  equal(-2, SIMD.Int16x8.extractLane(e, 4));
  equal(0x7ffd, SIMD.Int16x8.extractLane(e, 5));
  equal(-0x8000, SIMD.Int16x8.extractLane(e, 6));
  equal(9, SIMD.Int16x8.extractLane(e, 7));
});

test('Int16x8 unsignedAddSaturate', function() {
  var a = SIMD.Int16x8(0, 1, 0x7fff, 0x8000, -1, 0x7ffe, 0x8001, 10);
  var b = SIMD.Int16x8.splat(1);
  var d = SIMD.Int16x8.unsignedAddSaturate(a, b);
  equal(1, SIMD.Int16x8.unsignedExtractLane(d, 0));
  equal(2, SIMD.Int16x8.unsignedExtractLane(d, 1));
  equal(0x8000, SIMD.Int16x8.unsignedExtractLane(d, 2));
  equal(0x8001, SIMD.Int16x8.unsignedExtractLane(d, 3));
  equal(0xffff, SIMD.Int16x8.unsignedExtractLane(d, 4));
  equal(0x7fff, SIMD.Int16x8.unsignedExtractLane(d, 5));
  equal(0x8002, SIMD.Int16x8.unsignedExtractLane(d, 6));
});

test('Int16x8 subSaturate', function() {
  var a = SIMD.Int16x8(0, 1, 0x7fff, 0x8000, -1, 0x7ffe, 0x8001, 10);
  var b = SIMD.Int16x8.splat(1);
  var c = SIMD.Int16x8.splat(-1);
  var d = SIMD.Int16x8.subSaturate(a, b);
  var e = SIMD.Int16x8.subSaturate(a, c);
  equal(-1, SIMD.Int16x8.extractLane(d, 0));
  equal(0, SIMD.Int16x8.extractLane(d, 1));
  equal(0x7ffe, SIMD.Int16x8.extractLane(d, 2));
  equal(-0x8000, SIMD.Int16x8.extractLane(d, 3));
  equal(-2, SIMD.Int16x8.extractLane(d, 4));
  equal(0x7ffd, SIMD.Int16x8.extractLane(d, 5));
  equal(-0x8000, SIMD.Int16x8.extractLane(d, 6));
  equal(9, SIMD.Int16x8.extractLane(d, 7));
  equal(1, SIMD.Int16x8.extractLane(e, 0));
  equal(2, SIMD.Int16x8.extractLane(e, 1));
  equal(0x7fff, SIMD.Int16x8.extractLane(e, 2));
  equal(-0x7fff, SIMD.Int16x8.extractLane(e, 3));
  equal(0, SIMD.Int16x8.extractLane(e, 4));
  equal(0x7fff, SIMD.Int16x8.extractLane(e, 5));
  equal(-0x7ffe, SIMD.Int16x8.extractLane(e, 6));
  equal(11, SIMD.Int16x8.extractLane(e, 7));
});

test('Int16x8 unsignedSubSaturate', function() {
  var a = SIMD.Int16x8(0, 1, 0x7fff, 0x8000, -1, 0x7ffe, 0x8001, 10);
  var b = SIMD.Int16x8.splat(1);
  var d = SIMD.Int16x8.unsignedSubSaturate(a, b);
  equal(0, SIMD.Int16x8.unsignedExtractLane(d, 0));
  equal(0, SIMD.Int16x8.unsignedExtractLane(d, 1));
  equal(0x7ffe, SIMD.Int16x8.unsignedExtractLane(d, 2));
  equal(0x7fff, SIMD.Int16x8.unsignedExtractLane(d, 3));
  equal(0xfffe, SIMD.Int16x8.unsignedExtractLane(d, 4));
  equal(0x7ffd, SIMD.Int16x8.unsignedExtractLane(d, 5));
  equal(0x8000, SIMD.Int16x8.unsignedExtractLane(d, 6));
  equal(9, SIMD.Int16x8.unsignedExtractLane(d, 7));
});

test('Int16x8 unsignedAbsoluteDifference', function() {
  var a = SIMD.Int16x8(0xFF, 0, 0xFF, 1, 2, 1, -1, 3);
  var b = SIMD.Int16x8(0x0, 0xFF, 1, 0xFF, 1, 2, 3, -1);
  var c = SIMD.Int16x8.unsignedAbsoluteDifference(a, b);
  equal(0xff, SIMD.Int16x8.unsignedExtractLane(c, 0));
  equal(0xff, SIMD.Int16x8.unsignedExtractLane(c, 1));
  equal(0xfe, SIMD.Int16x8.unsignedExtractLane(c, 2));
  equal(0xfe, SIMD.Int16x8.unsignedExtractLane(c, 3));
  equal(1, SIMD.Int16x8.unsignedExtractLane(c, 4));
  equal(1, SIMD.Int16x8.unsignedExtractLane(c, 5));
  equal(0xfffc, SIMD.Int16x8.unsignedExtractLane(c, 6));
  equal(0xfffc, SIMD.Int16x8.unsignedExtractLane(c, 7));
});

test('Int16x8 widenedUnsignedAbsoluteDifference', function() {
  var a = SIMD.Int16x8(0xFF, 0, 0xFF, 1, 2, 1, -1, 3);
  var b = SIMD.Int16x8(0x0, 0xFF, 1, 0xFF, 1, 2, 3, -1);
  var c = SIMD.Int16x8.widenedUnsignedAbsoluteDifference(a, b);
  equal(255, SIMD.Int32x4.extractLane(c, 0));
  equal(255, SIMD.Int32x4.extractLane(c, 1));
  equal(254, SIMD.Int32x4.extractLane(c, 2));
  equal(254, SIMD.Int32x4.extractLane(c, 3));
});

test('Int16x8 unsignedHorizontalSum', function() {
  var a = SIMD.Int16x8.splat(0);
  var b = SIMD.Int16x8.unsignedHorizontalSum(a);
  equal(0, b);

  var a = SIMD.Int16x8.splat(-1);
  var b = SIMD.Int16x8.unsignedHorizontalSum(a);
  equal(524280, b);

  a = SIMD.Int16x8(0xFF, 0, 0xFF, 1, 2, 1, -1, 3);
  b = SIMD.Int16x8.unsignedHorizontalSum(a);
  equal(66052, b);
});

test('Int16x8 comparisons', function() {
  var m = SIMD.Int16x8(1000, 2000, 100, 1, -1000, -2000, -100, 1);
  var n = SIMD.Int16x8(-2000, 2000, 1, 100, 2000, -2000, -1, -100);
  var cmp;
  cmp = SIMD.Int16x8.lessThan(m, n);
  equal(false, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.unsignedLessThan(m, n);
  equal(true, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.lessThanOrEqual(m, n);
  equal(false, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.unsignedLessThanOrEqual(m, n);
  equal(true, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.equal(m, n);
  equal(false, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.notEqual(m, n);
  equal(true, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.greaterThan(m, n);
  equal(true, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.unsignedGreaterThan(m, n);
  equal(false, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.greaterThanOrEqual(m, n);
  equal(true, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 7));

  cmp = SIMD.Int16x8.unsignedGreaterThanOrEqual(m, n);
  equal(false, SIMD.Bool16x8.extractLane(cmp, 0));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 1));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 2));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 3));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 4));
  equal(true, SIMD.Bool16x8.extractLane(cmp, 5));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 6));
  equal(false, SIMD.Bool16x8.extractLane(cmp, 7));
});

test('Int16x8 shiftLeftByScalar', function() {
  var a = SIMD.Int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.Int16x8.shiftLeftByScalar(a, 1);
  equal(SIMD.Int16x8.extractLane(b, 0), -2);
  equal(SIMD.Int16x8.extractLane(b, 1), -2);
  equal(SIMD.Int16x8.extractLane(b, 2), -2);
  equal(SIMD.Int16x8.extractLane(b, 3), -2);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0002);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftLeftByScalar(a, 2);
  equal(SIMD.Int16x8.extractLane(b, 0), -4);
  equal(SIMD.Int16x8.extractLane(b, 1), -4);
  equal(SIMD.Int16x8.extractLane(b, 2), -4);
  equal(SIMD.Int16x8.extractLane(b, 3), -4);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0004);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftLeftByScalar(a, 14);
  equal(SIMD.Int16x8.extractLane(b, 0), -16384);
  equal(SIMD.Int16x8.extractLane(b, 1), -16384);
  equal(SIMD.Int16x8.extractLane(b, 2), -16384);
  equal(SIMD.Int16x8.extractLane(b, 3), -16384);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x4000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftLeftByScalar(a, 15);
  equal(SIMD.Int16x8.extractLane(b, 0), -32768);
  equal(SIMD.Int16x8.extractLane(b, 1), -32768);
  equal(SIMD.Int16x8.extractLane(b, 2), -32768);
  equal(SIMD.Int16x8.extractLane(b, 3), -32768);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), -32768);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftLeftByScalar(a, 16);
  equal(SIMD.Int16x8.extractLane(b, 0), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 1), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 3), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0);
  b = SIMD.Int16x8.shiftLeftByScalar(a, -1);
  equal(SIMD.Int16x8.extractLane(b, 0), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 1), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 3), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0);
});

test('Int16x8 shiftRightArithmeticByScalar', function() {
  var a = SIMD.Int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.Int16x8.shiftRightArithmeticByScalar(a, 1);
  equal(SIMD.Int16x8.extractLane(b, 0), -1);
  equal(SIMD.Int16x8.extractLane(b, 1), -1);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x3fff);
  equal(SIMD.Int16x8.extractLane(b, 3), -1);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftRightArithmeticByScalar(a, 2);
  equal(SIMD.Int16x8.extractLane(b, 0), -1);
  equal(SIMD.Int16x8.extractLane(b, 1), -1);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x1fff);
  equal(SIMD.Int16x8.extractLane(b, 3), -1);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftRightArithmeticByScalar(a, 14);
  equal(SIMD.Int16x8.extractLane(b, 0), -1);
  equal(SIMD.Int16x8.extractLane(b, 1), -1);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0001);
  equal(SIMD.Int16x8.extractLane(b, 3), -1);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftRightArithmeticByScalar(a, 15);
  equal(SIMD.Int16x8.extractLane(b, 0), -1);
  equal(SIMD.Int16x8.extractLane(b, 1), -1);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 3), -1);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftRightArithmeticByScalar(a, 16);
  equal(SIMD.Int16x8.extractLane(b, 0), -1);
  equal(SIMD.Int16x8.extractLane(b, 1), -1);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 3), -1);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0);
  b = SIMD.Int16x8.shiftRightArithmeticByScalar(a, -1);
  equal(SIMD.Int16x8.extractLane(b, 0), -1);
  equal(SIMD.Int16x8.extractLane(b, 1), -1);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 3), -1);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0);
});

test('Int16x8 shiftRightLogicalByScalar', function() {
  var a = SIMD.Int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.Int16x8.shiftRightLogicalByScalar(a, 1);
  equal(SIMD.Int16x8.extractLane(b, 0), 0x7fff);
  equal(SIMD.Int16x8.extractLane(b, 1), 0x7fff);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x3fff);
  equal(SIMD.Int16x8.extractLane(b, 3), 0x7fff);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftRightLogicalByScalar(a, 2);
  equal(SIMD.Int16x8.extractLane(b, 0), 0x3fff);
  equal(SIMD.Int16x8.extractLane(b, 1), 0x3fff);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x1fff);
  equal(SIMD.Int16x8.extractLane(b, 3), 0x3fff);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftRightLogicalByScalar(a, 14);
  equal(SIMD.Int16x8.extractLane(b, 0), 0x0003);
  equal(SIMD.Int16x8.extractLane(b, 1), 0x0003);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0001);
  equal(SIMD.Int16x8.extractLane(b, 3), 0x0003);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftRightLogicalByScalar(a, 15);
  equal(SIMD.Int16x8.extractLane(b, 0), 0x0001);
  equal(SIMD.Int16x8.extractLane(b, 1), 0x0001);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 3), 0x0001);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0000);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.Int16x8.shiftRightLogicalByScalar(a, 16);
  equal(SIMD.Int16x8.extractLane(b, 0), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 1), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 3), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0);
  b = SIMD.Int16x8.shiftRightLogicalByScalar(a, -1);
  equal(SIMD.Int16x8.extractLane(b, 0), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 1), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 2), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 3), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 4), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 5), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 6), 0x0);
  equal(SIMD.Int16x8.extractLane(b, 7), 0x0);
});

test('Int16x8 select', function() {
  var m = SIMD.Bool16x8(true, true, true, true, false, false, false, false);
  var t = SIMD.Int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var f = SIMD.Int16x8(9, 10, 11, 12, 13, 14, 15, 16);
  var s = SIMD.Int16x8.select(m, t, f);
  equal(1, SIMD.Int16x8.extractLane(s, 0));
  equal(2, SIMD.Int16x8.extractLane(s, 1));
  equal(3, SIMD.Int16x8.extractLane(s, 2));
  equal(4, SIMD.Int16x8.extractLane(s, 3));
  equal(13, SIMD.Int16x8.extractLane(s, 4));
  equal(14, SIMD.Int16x8.extractLane(s, 5));
  equal(15, SIMD.Int16x8.extractLane(s, 6));
  equal(16, SIMD.Int16x8.extractLane(s, 7));
});

test('Int16x8 selectBits', function() {
  var m = SIMD.Int16x8(0xaaaaaaaa, 0xbbbbbbbb, 0xcccccccc, 0xdddddddd, 0xeeeeeeee, 0xffffffff, 0x00000000, 0x55555555);
  var t = SIMD.Int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var f = SIMD.Int16x8(9, 10, 11, 12, 13, 14, 15, 16);
  var s = SIMD.Int16x8.selectBits(m, t, f);
  equal(1, SIMD.Int16x8.extractLane(s, 0));
  equal(2, SIMD.Int16x8.extractLane(s, 1));
  equal(3, SIMD.Int16x8.extractLane(s, 2));
  equal(4, SIMD.Int16x8.extractLane(s, 3));
  equal(5, SIMD.Int16x8.extractLane(s, 4));
  equal(6, SIMD.Int16x8.extractLane(s, 5));
  equal(15, SIMD.Int16x8.extractLane(s, 6));
  equal(0, SIMD.Int16x8.extractLane(s, 7));
});

test('Int8x16 swizzle', function() {
  var a    = SIMD.Int8x16(1, 2, 3, 2147483647, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -37);
  var xyxy = SIMD.Int8x16.swizzle(a, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1);
  var zwzw = SIMD.Int8x16.swizzle(a, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9);
  var xxxx = SIMD.Int8x16.swizzle(a, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  equal(1, SIMD.Int8x16.extractLane(xyxy, 0));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 1));
  equal(1, SIMD.Int8x16.extractLane(xyxy, 2));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 3));
  equal(1, SIMD.Int8x16.extractLane(xyxy, 4));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 5));
  equal(1, SIMD.Int8x16.extractLane(xyxy, 6));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 7));
  equal(1, SIMD.Int8x16.extractLane(xyxy, 8));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 9));
  equal(1, SIMD.Int8x16.extractLane(xyxy, 10));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 11));
  equal(1, SIMD.Int8x16.extractLane(xyxy, 12));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 13));
  equal(1, SIMD.Int8x16.extractLane(xyxy, 14));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 15));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 0));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 1));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 2));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 3));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 4));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 5));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 6));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 7));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 8));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 9));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 10));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 11));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 12));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 13));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 14));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 15));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 0));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 1));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 2));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 3));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 4));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 5));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 6));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 7));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 8));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 9));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 10));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 11));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 12));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 13));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 14));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 15));

  function testIndexCheck(index) {
      throws(function() { SIMD.Int8x16.swizzle(a, index, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(16);
});

test('Int8x16 shuffle', function() {
  var a    = SIMD.Int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var b    = SIMD.Int8x16(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127);
  var xyxy = SIMD.Int8x16.shuffle(a, b, 0, 1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23);
  var zwzw = SIMD.Int8x16.shuffle(a, b, 8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31);
  var xxxx = SIMD.Int8x16.shuffle(a, b, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 16, 16, 16, 16);
  equal(1, SIMD.Int8x16.extractLane(xyxy, 0));
  equal(2, SIMD.Int8x16.extractLane(xyxy, 1));
  equal(3, SIMD.Int8x16.extractLane(xyxy, 2));
  equal(4, SIMD.Int8x16.extractLane(xyxy, 3));
  equal(5, SIMD.Int8x16.extractLane(xyxy, 4));
  equal(6, SIMD.Int8x16.extractLane(xyxy, 5));
  equal(7, SIMD.Int8x16.extractLane(xyxy, 6));
  equal(8, SIMD.Int8x16.extractLane(xyxy, 7));
  equal(17, SIMD.Int8x16.extractLane(xyxy, 8));
  equal(18, SIMD.Int8x16.extractLane(xyxy, 9));
  equal(19, SIMD.Int8x16.extractLane(xyxy, 10));
  equal(20, SIMD.Int8x16.extractLane(xyxy, 11));
  equal(21, SIMD.Int8x16.extractLane(xyxy, 12));
  equal(22, SIMD.Int8x16.extractLane(xyxy, 13));
  equal(23, SIMD.Int8x16.extractLane(xyxy, 14));
  equal(24, SIMD.Int8x16.extractLane(xyxy, 15));
  equal(9, SIMD.Int8x16.extractLane(zwzw, 0));
  equal(10, SIMD.Int8x16.extractLane(zwzw, 1));
  equal(11, SIMD.Int8x16.extractLane(zwzw, 2));
  equal(12, SIMD.Int8x16.extractLane(zwzw, 3));
  equal(13, SIMD.Int8x16.extractLane(zwzw, 4));
  equal(14, SIMD.Int8x16.extractLane(zwzw, 5));
  equal(15, SIMD.Int8x16.extractLane(zwzw, 6));
  equal(16, SIMD.Int8x16.extractLane(zwzw, 7));
  equal(25, SIMD.Int8x16.extractLane(zwzw, 8));
  equal(26, SIMD.Int8x16.extractLane(zwzw, 9));
  equal(27, SIMD.Int8x16.extractLane(zwzw, 10));
  equal(28, SIMD.Int8x16.extractLane(zwzw, 11));
  equal(29, SIMD.Int8x16.extractLane(zwzw, 12));
  equal(30, SIMD.Int8x16.extractLane(zwzw, 13));
  equal(31, SIMD.Int8x16.extractLane(zwzw, 14));
  equal(127, SIMD.Int8x16.extractLane(zwzw, 15));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 0));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 1));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 2));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 3));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 4));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 5));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 6));
  equal(1, SIMD.Int8x16.extractLane(xxxx, 7));
  equal(17, SIMD.Int8x16.extractLane(xxxx, 8));
  equal(17, SIMD.Int8x16.extractLane(xxxx, 9));
  equal(17, SIMD.Int8x16.extractLane(xxxx, 10));
  equal(17, SIMD.Int8x16.extractLane(xxxx, 11));
  equal(17, SIMD.Int8x16.extractLane(xxxx, 12));
  equal(17, SIMD.Int8x16.extractLane(xxxx, 13));
  equal(17, SIMD.Int8x16.extractLane(xxxx, 14));
  equal(17, SIMD.Int8x16.extractLane(xxxx, 15));

  function testIndexCheck(index) {
      throws(function() { SIMD.Int8x16.shuffle(a, b, index, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(32);
});

test('Int8x16 and', function() {
  var m = SIMD.Int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 170, 170, 170, 170, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.Int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  equal(-86, SIMD.Int8x16.extractLane(m, 0));
  equal(-86, SIMD.Int8x16.extractLane(m, 1));
  equal(-86, SIMD.Int8x16.extractLane(m, 2));
  equal(-86, SIMD.Int8x16.extractLane(m, 3));
  equal(-86, SIMD.Int8x16.extractLane(m, 4));
  equal(-86, SIMD.Int8x16.extractLane(m, 5));
  equal(-86, SIMD.Int8x16.extractLane(m, 6));
  equal(-86, SIMD.Int8x16.extractLane(m, 7));
  equal(-86, SIMD.Int8x16.extractLane(m, 8));
  equal(-86, SIMD.Int8x16.extractLane(m, 9));
  equal(-86, SIMD.Int8x16.extractLane(m, 10));
  equal(-86, SIMD.Int8x16.extractLane(m, 11));
  equal(-86, SIMD.Int8x16.extractLane(m, 12));
  equal(-86, SIMD.Int8x16.extractLane(m, 13));
  equal(-86, SIMD.Int8x16.extractLane(m, 14));
  equal(-86, SIMD.Int8x16.extractLane(m, 15));
  equal(85, SIMD.Int8x16.extractLane(n, 0));
  equal(85, SIMD.Int8x16.extractLane(n, 1));
  equal(85, SIMD.Int8x16.extractLane(n, 2));
  equal(85, SIMD.Int8x16.extractLane(n, 3));
  equal(85, SIMD.Int8x16.extractLane(n, 4));
  equal(85, SIMD.Int8x16.extractLane(n, 5));
  equal(85, SIMD.Int8x16.extractLane(n, 6));
  equal(85, SIMD.Int8x16.extractLane(n, 7));
  equal(85, SIMD.Int8x16.extractLane(n, 8));
  equal(85, SIMD.Int8x16.extractLane(n, 9));
  equal(85, SIMD.Int8x16.extractLane(n, 10));
  equal(85, SIMD.Int8x16.extractLane(n, 11));
  equal(85, SIMD.Int8x16.extractLane(n, 12));
  equal(85, SIMD.Int8x16.extractLane(n, 13));
  equal(85, SIMD.Int8x16.extractLane(n, 14));
  equal(85, SIMD.Int8x16.extractLane(n, 15));
  var o = SIMD.Int8x16.and(m,n);  // and
  equal(0x0, SIMD.Int8x16.extractLane(o, 0));
  equal(0x0, SIMD.Int8x16.extractLane(o, 1));
  equal(0x0, SIMD.Int8x16.extractLane(o, 2));
  equal(0x0, SIMD.Int8x16.extractLane(o, 3));
  equal(0x0, SIMD.Int8x16.extractLane(o, 4));
  equal(0x0, SIMD.Int8x16.extractLane(o, 5));
  equal(0x0, SIMD.Int8x16.extractLane(o, 6));
  equal(0x0, SIMD.Int8x16.extractLane(o, 7));
  equal(0x0, SIMD.Int8x16.extractLane(o, 8));
  equal(0x0, SIMD.Int8x16.extractLane(o, 9));
  equal(0x0, SIMD.Int8x16.extractLane(o, 10));
  equal(0x0, SIMD.Int8x16.extractLane(o, 11));
  equal(0x0, SIMD.Int8x16.extractLane(o, 12));
  equal(0x0, SIMD.Int8x16.extractLane(o, 13));
  equal(0x0, SIMD.Int8x16.extractLane(o, 14));
  equal(0x0, SIMD.Int8x16.extractLane(o, 15));
});

test('Int8x16 or', function() {
  var m = SIMD.Int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.Int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  var o = SIMD.Int8x16.or(m,n);  // or
  equal(-1, SIMD.Int8x16.extractLane(o, 0));
  equal(-1, SIMD.Int8x16.extractLane(o, 1));
  equal(-1, SIMD.Int8x16.extractLane(o, 2));
  equal(-1, SIMD.Int8x16.extractLane(o, 3));
  equal(-1, SIMD.Int8x16.extractLane(o, 4));
  equal(-1, SIMD.Int8x16.extractLane(o, 5));
  equal(-1, SIMD.Int8x16.extractLane(o, 6));
  equal(-1, SIMD.Int8x16.extractLane(o, 7));
  equal(-1, SIMD.Int8x16.extractLane(o, 8));
  equal(-1, SIMD.Int8x16.extractLane(o, 9));
  equal(-1, SIMD.Int8x16.extractLane(o, 10));
  equal(-1, SIMD.Int8x16.extractLane(o, 11));
  equal(-1, SIMD.Int8x16.extractLane(o, 12));
  equal(-1, SIMD.Int8x16.extractLane(o, 13));
  equal(-1, SIMD.Int8x16.extractLane(o, 14));
  equal(-1, SIMD.Int8x16.extractLane(o, 15));
});

test('Int8x16 xor', function() {
  var m = SIMD.Int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.Int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  var o = SIMD.Int8x16.xor(m,n);  // xor
  equal(-1, SIMD.Int8x16.extractLane(o, 0));
  equal(-1, SIMD.Int8x16.extractLane(o, 1));
  equal(-1, SIMD.Int8x16.extractLane(o, 2));
  equal(-1, SIMD.Int8x16.extractLane(o, 3));
  equal(-1, SIMD.Int8x16.extractLane(o, 4));
  equal(-1, SIMD.Int8x16.extractLane(o, 5));
  equal(-1, SIMD.Int8x16.extractLane(o, 6));
  equal(-1, SIMD.Int8x16.extractLane(o, 7));
  equal(-1, SIMD.Int8x16.extractLane(o, 8));
  equal(-1, SIMD.Int8x16.extractLane(o, 9));
  equal(-1, SIMD.Int8x16.extractLane(o, 10));
  equal(-1, SIMD.Int8x16.extractLane(o, 11));
  equal(-1, SIMD.Int8x16.extractLane(o, 12));
  equal(-1, SIMD.Int8x16.extractLane(o, 13));
  equal(-1, SIMD.Int8x16.extractLane(o, 14));
  equal(-1, SIMD.Int8x16.extractLane(o, 15));
  o = SIMD.Int8x16.xor(m,m);  // xor
  equal(0x0, SIMD.Int8x16.extractLane(o, 0));
  equal(0x0, SIMD.Int8x16.extractLane(o, 1));
  equal(0x0, SIMD.Int8x16.extractLane(o, 2));
  equal(0x0, SIMD.Int8x16.extractLane(o, 3));
  equal(0x0, SIMD.Int8x16.extractLane(o, 4));
  equal(0x0, SIMD.Int8x16.extractLane(o, 5));
  equal(0x0, SIMD.Int8x16.extractLane(o, 6));
  equal(0x0, SIMD.Int8x16.extractLane(o, 7));
  equal(0x0, SIMD.Int8x16.extractLane(o, 8));
  equal(0x0, SIMD.Int8x16.extractLane(o, 9));
  equal(0x0, SIMD.Int8x16.extractLane(o, 10));
  equal(0x0, SIMD.Int8x16.extractLane(o, 11));
  equal(0x0, SIMD.Int8x16.extractLane(o, 12));
  equal(0x0, SIMD.Int8x16.extractLane(o, 13));
  equal(0x0, SIMD.Int8x16.extractLane(o, 14));
  equal(0x0, SIMD.Int8x16.extractLane(o, 15));
});

test('Int8x16 neg', function() {
  var m = SIMD.Int8x16(16, -32, 64, -128, 256, -512, 1024, -2048, 4096, -8192, 16384, -32768, 65536, -131072, 262144, -524288);
  m = SIMD.Int8x16.neg(m);
  equal(-16, SIMD.Int8x16.extractLane(m, 0));
  equal(32, SIMD.Int8x16.extractLane(m, 1));
  equal(-64, SIMD.Int8x16.extractLane(m, 2));
  equal(-128, SIMD.Int8x16.extractLane(m, 3));
  equal(0, SIMD.Int8x16.extractLane(m, 4));
  equal(0, SIMD.Int8x16.extractLane(m, 5));
  equal(0, SIMD.Int8x16.extractLane(m, 6));
  equal(0, SIMD.Int8x16.extractLane(m, 7));
  equal(0, SIMD.Int8x16.extractLane(m, 8));
  equal(0, SIMD.Int8x16.extractLane(m, 9));
  equal(0, SIMD.Int8x16.extractLane(m, 10));
  equal(0, SIMD.Int8x16.extractLane(m, 11));
  equal(0, SIMD.Int8x16.extractLane(m, 12));
  equal(0, SIMD.Int8x16.extractLane(m, 13));
  equal(0, SIMD.Int8x16.extractLane(m, 14));
  equal(0, SIMD.Int8x16.extractLane(m, 15));

  var n = SIMD.Int8x16(0, 0, 0, 0, 0x7f, 0xff, 0xff, 0xff, -1, -1, -1, -1, 0x80, 0x00, 0x00, 0x00);
  n = SIMD.Int8x16.neg(n);
  equal(0, SIMD.Int8x16.extractLane(n, 0));
  equal(0, SIMD.Int8x16.extractLane(n, 1));
  equal(0, SIMD.Int8x16.extractLane(n, 2));
  equal(0, SIMD.Int8x16.extractLane(n, 3));
  equal(-127, SIMD.Int8x16.extractLane(n, 4));
  equal(1, SIMD.Int8x16.extractLane(n, 5));
  equal(1, SIMD.Int8x16.extractLane(n, 6));
  equal(1, SIMD.Int8x16.extractLane(n, 7));
  equal(1, SIMD.Int8x16.extractLane(n, 8));
  equal(1, SIMD.Int8x16.extractLane(n, 9));
  equal(1, SIMD.Int8x16.extractLane(n, 10));
  equal(1, SIMD.Int8x16.extractLane(n, 11));
  equal(-128, SIMD.Int8x16.extractLane(n, 12));
  equal(0, SIMD.Int8x16.extractLane(n, 13));
  equal(0, SIMD.Int8x16.extractLane(n, 14));
  equal(0, SIMD.Int8x16.extractLane(n, 15));
});

test('Int8x16 scalar getters', function () {
  var a = SIMD.Int8x16(0, 1, -1, -2, 65535, 255, 65536, -500,
                       2, -3, 4, -5, 6, -7, 8, -9);
  equal(0, SIMD.Int8x16.extractLane(a, 0));
  equal(1, SIMD.Int8x16.extractLane(a, 1));
  equal(-1, SIMD.Int8x16.extractLane(a, 2));
  equal(-2, SIMD.Int8x16.extractLane(a, 3));
  equal(-1, SIMD.Int8x16.extractLane(a, 4));
  equal(-1, SIMD.Int8x16.extractLane(a, 5));
  equal(0, SIMD.Int8x16.extractLane(a, 6));
  equal(12, SIMD.Int8x16.extractLane(a, 7));
  equal(2, SIMD.Int8x16.extractLane(a, 8));
  equal(-3, SIMD.Int8x16.extractLane(a, 9));
  equal(4, SIMD.Int8x16.extractLane(a, 10));
  equal(-5, SIMD.Int8x16.extractLane(a, 11));
  equal(6, SIMD.Int8x16.extractLane(a, 12));
  equal(-7, SIMD.Int8x16.extractLane(a, 13));
  equal(8, SIMD.Int8x16.extractLane(a, 14));
  equal(-9, SIMD.Int8x16.extractLane(a, 15));

  equal(0, SIMD.Int8x16.unsignedExtractLane(a, 0));
  equal(1, SIMD.Int8x16.unsignedExtractLane(a, 1));
  equal(255, SIMD.Int8x16.unsignedExtractLane(a, 2));
  equal(254, SIMD.Int8x16.unsignedExtractLane(a, 3));
  equal(255, SIMD.Int8x16.unsignedExtractLane(a, 4));
  equal(255, SIMD.Int8x16.unsignedExtractLane(a, 5));
  equal(0, SIMD.Int8x16.unsignedExtractLane(a, 6));
  equal(12, SIMD.Int8x16.unsignedExtractLane(a, 7));
  equal(2, SIMD.Int8x16.unsignedExtractLane(a, 8));
  equal(253, SIMD.Int8x16.unsignedExtractLane(a, 9));
  equal(4, SIMD.Int8x16.unsignedExtractLane(a, 10));
  equal(251, SIMD.Int8x16.unsignedExtractLane(a, 11));
  equal(6, SIMD.Int8x16.unsignedExtractLane(a, 12));
  equal(249, SIMD.Int8x16.unsignedExtractLane(a, 13));
  equal(8, SIMD.Int8x16.unsignedExtractLane(a, 14));
  equal(247, SIMD.Int8x16.unsignedExtractLane(a, 15));
});

test('Int8x16 add', function () {
  var a = SIMD.Int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.Int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.Int8x16.add(a, b);
  equal(-1, SIMD.Int8x16.extractLane(c, 0));
  equal(-1, SIMD.Int8x16.extractLane(c, 1));
  equal(-1, SIMD.Int8x16.extractLane(c, 2));
  equal(0x0, SIMD.Int8x16.extractLane(c, 3));
  equal(-2, SIMD.Int8x16.extractLane(c, 4));
  equal(-2, SIMD.Int8x16.extractLane(c, 5));
  equal(-2, SIMD.Int8x16.extractLane(c, 6));
  equal(-2, SIMD.Int8x16.extractLane(c, 7));
  equal(0x7f, SIMD.Int8x16.extractLane(c, 8));
  equal(-1, SIMD.Int8x16.extractLane(c, 9));
  equal(-1, SIMD.Int8x16.extractLane(c, 10));
  equal(0x0, SIMD.Int8x16.extractLane(c, 11));
  equal(-1, SIMD.Int8x16.extractLane(c, 12));
  equal(-1, SIMD.Int8x16.extractLane(c, 13));
  equal(-1, SIMD.Int8x16.extractLane(c, 14));
  equal(-1, SIMD.Int8x16.extractLane(c, 15));
});

test('Int8x16 sub', function() {
  var a = SIMD.Int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.Int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.Int8x16.sub(a, b);
  equal(-1, SIMD.Int8x16.extractLane(c, 0));
  equal(-1, SIMD.Int8x16.extractLane(c, 1));
  equal(-1, SIMD.Int8x16.extractLane(c, 2));
  equal(-2, SIMD.Int8x16.extractLane(c, 3));
  equal(0, SIMD.Int8x16.extractLane(c, 4));
  equal(0, SIMD.Int8x16.extractLane(c, 5));
  equal(0, SIMD.Int8x16.extractLane(c, 6));
  equal(0, SIMD.Int8x16.extractLane(c, 7));
  equal(0x7f, SIMD.Int8x16.extractLane(c, 8));
  equal(-1, SIMD.Int8x16.extractLane(c, 9));
  equal(-1, SIMD.Int8x16.extractLane(c, 10));
  equal(-2, SIMD.Int8x16.extractLane(c, 11));
  equal(1, SIMD.Int8x16.extractLane(c, 12));
  equal(1, SIMD.Int8x16.extractLane(c, 13));
  equal(1, SIMD.Int8x16.extractLane(c, 14));
  equal(1, SIMD.Int8x16.extractLane(c, 15));
});

test('Int8x16 mul', function() {
  var a = SIMD.Int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.Int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.Int8x16.mul(a, b);
  equal(0x0, SIMD.Int8x16.extractLane(c, 0));
  equal(0x0, SIMD.Int8x16.extractLane(c, 1));
  equal(0x0, SIMD.Int8x16.extractLane(c, 2));
  equal(-1, SIMD.Int8x16.extractLane(c, 3));
  equal(1, SIMD.Int8x16.extractLane(c, 4));
  equal(1, SIMD.Int8x16.extractLane(c, 5));
  equal(1, SIMD.Int8x16.extractLane(c, 6));
  equal(1, SIMD.Int8x16.extractLane(c, 7));
  equal(0, SIMD.Int8x16.extractLane(c, 8));
  equal(0, SIMD.Int8x16.extractLane(c, 9));
  equal(0, SIMD.Int8x16.extractLane(c, 10));
  equal(-1, SIMD.Int8x16.extractLane(c, 11));
  equal(0, SIMD.Int8x16.extractLane(c, 12));
  equal(0, SIMD.Int8x16.extractLane(c, 13));
  equal(0, SIMD.Int8x16.extractLane(c, 14));
  equal(0, SIMD.Int8x16.extractLane(c, 15));
});

test('Int8x16 addSaturate', function() {
  var a = SIMD.Int8x16(0, 1, 0x7f, 0x80, -1, 0x7e, 0x81, 10, 11, 12, 13, 14, 15, 16, 17, 18);
  var b = SIMD.Int8x16.splat(1);
  var c = SIMD.Int8x16.splat(-1);
  var d = SIMD.Int8x16.addSaturate(a, b);
  var e = SIMD.Int8x16.addSaturate(a, c);
  equal(1, SIMD.Int8x16.extractLane(d, 0));
  equal(2, SIMD.Int8x16.extractLane(d, 1));
  equal(0x7f, SIMD.Int8x16.extractLane(d, 2));
  equal(-0x7f, SIMD.Int8x16.extractLane(d, 3));
  equal(0, SIMD.Int8x16.extractLane(d, 4));
  equal(0x7f, SIMD.Int8x16.extractLane(d, 5));
  equal(-0x7e, SIMD.Int8x16.extractLane(d, 6));
  equal(11, SIMD.Int8x16.extractLane(d, 7));
  equal(12, SIMD.Int8x16.extractLane(d, 8));
  equal(13, SIMD.Int8x16.extractLane(d, 9));
  equal(14, SIMD.Int8x16.extractLane(d, 10));
  equal(15, SIMD.Int8x16.extractLane(d, 11));
  equal(16, SIMD.Int8x16.extractLane(d, 12));
  equal(17, SIMD.Int8x16.extractLane(d, 13));
  equal(18, SIMD.Int8x16.extractLane(d, 14));
  equal(19, SIMD.Int8x16.extractLane(d, 15));
  equal(-1, SIMD.Int8x16.extractLane(e, 0));
  equal(0, SIMD.Int8x16.extractLane(e, 1));
  equal(0x7e, SIMD.Int8x16.extractLane(e, 2));
  equal(-0x80, SIMD.Int8x16.extractLane(e, 3));
  equal(-2, SIMD.Int8x16.extractLane(e, 4));
  equal(0x7d, SIMD.Int8x16.extractLane(e, 5));
  equal(-0x80, SIMD.Int8x16.extractLane(e, 6));
  equal(9, SIMD.Int8x16.extractLane(e, 7));
  equal(10, SIMD.Int8x16.extractLane(e, 8));
  equal(11, SIMD.Int8x16.extractLane(e, 9));
  equal(12, SIMD.Int8x16.extractLane(e, 10));
  equal(13, SIMD.Int8x16.extractLane(e, 11));
  equal(14, SIMD.Int8x16.extractLane(e, 12));
  equal(15, SIMD.Int8x16.extractLane(e, 13));
  equal(16, SIMD.Int8x16.extractLane(e, 14));
  equal(17, SIMD.Int8x16.extractLane(e, 15));
});

test('Int8x16 unsignedAddSaturate', function() {
  var a = SIMD.Int8x16(0, 1, 0x7f, 0x80, -1, 0x7e, 0x81, 10, 11, 12, 13, 14, 15, 16, 17, 18);
  var b = SIMD.Int8x16.splat(1);
  var d = SIMD.Int8x16.unsignedAddSaturate(a, b);
  equal(1, SIMD.Int8x16.unsignedExtractLane(d, 0));
  equal(2, SIMD.Int8x16.unsignedExtractLane(d, 1));
  equal(0x80, SIMD.Int8x16.unsignedExtractLane(d, 2));
  equal(0x81, SIMD.Int8x16.unsignedExtractLane(d, 3));
  equal(0xff, SIMD.Int8x16.unsignedExtractLane(d, 4));
  equal(0x7f, SIMD.Int8x16.unsignedExtractLane(d, 5));
  equal(0x82, SIMD.Int8x16.unsignedExtractLane(d, 6));
  equal(11, SIMD.Int8x16.unsignedExtractLane(d, 7));
  equal(12, SIMD.Int8x16.unsignedExtractLane(d, 8));
  equal(13, SIMD.Int8x16.unsignedExtractLane(d, 9));
  equal(14, SIMD.Int8x16.unsignedExtractLane(d, 10));
  equal(15, SIMD.Int8x16.unsignedExtractLane(d, 11));
  equal(16, SIMD.Int8x16.unsignedExtractLane(d, 12));
  equal(17, SIMD.Int8x16.unsignedExtractLane(d, 13));
  equal(18, SIMD.Int8x16.unsignedExtractLane(d, 14));
  equal(19, SIMD.Int8x16.unsignedExtractLane(d, 15));
});

test('Int8x16 subSaturate', function() {
  var a = SIMD.Int8x16(0, 1, 0x7f, 0x80, -1, 0x7e, 0x81, 10, 11, 12, 13, 14, 15, 16, 17, 18);
  var b = SIMD.Int8x16.splat(1);
  var c = SIMD.Int8x16.splat(-1);
  var d = SIMD.Int8x16.subSaturate(a, b);
  var e = SIMD.Int8x16.subSaturate(a, c);
  equal(-1, SIMD.Int8x16.extractLane(d, 0));
  equal(0, SIMD.Int8x16.extractLane(d, 1));
  equal(0x7e, SIMD.Int8x16.extractLane(d, 2));
  equal(-0x80, SIMD.Int8x16.extractLane(d, 3));
  equal(-2, SIMD.Int8x16.extractLane(d, 4));
  equal(0x7d, SIMD.Int8x16.extractLane(d, 5));
  equal(-0x80, SIMD.Int8x16.extractLane(d, 6));
  equal(9, SIMD.Int8x16.extractLane(d, 7));
  equal(10, SIMD.Int8x16.extractLane(d, 8));
  equal(11, SIMD.Int8x16.extractLane(d, 9));
  equal(12, SIMD.Int8x16.extractLane(d, 10));
  equal(13, SIMD.Int8x16.extractLane(d, 11));
  equal(14, SIMD.Int8x16.extractLane(d, 12));
  equal(15, SIMD.Int8x16.extractLane(d, 13));
  equal(16, SIMD.Int8x16.extractLane(d, 14));
  equal(17, SIMD.Int8x16.extractLane(d, 15));
  equal(1, SIMD.Int8x16.extractLane(e, 0));
  equal(2, SIMD.Int8x16.extractLane(e, 1));
  equal(0x7f, SIMD.Int8x16.extractLane(e, 2));
  equal(-0x7f, SIMD.Int8x16.extractLane(e, 3));
  equal(0, SIMD.Int8x16.extractLane(e, 4));
  equal(0x7f, SIMD.Int8x16.extractLane(e, 5));
  equal(-0x7e, SIMD.Int8x16.extractLane(e, 6));
  equal(11, SIMD.Int8x16.extractLane(e, 7));
  equal(12, SIMD.Int8x16.extractLane(e, 8));
  equal(13, SIMD.Int8x16.extractLane(e, 9));
  equal(14, SIMD.Int8x16.extractLane(e, 10));
  equal(15, SIMD.Int8x16.extractLane(e, 11));
  equal(16, SIMD.Int8x16.extractLane(e, 12));
  equal(17, SIMD.Int8x16.extractLane(e, 13));
  equal(18, SIMD.Int8x16.extractLane(e, 14));
  equal(19, SIMD.Int8x16.extractLane(e, 15));
});

test('Int8x16 unsignedSubSaturate', function() {
  var a = SIMD.Int8x16(0, 1, 0x7f, 0x80, -1, 0x7e, 0x81, 10, 11, 12, 13, 14, 15, 16, 17, 18);
  var b = SIMD.Int8x16.splat(1);
  var d = SIMD.Int8x16.unsignedSubSaturate(a, b);
  equal(0, SIMD.Int8x16.unsignedExtractLane(d, 0));
  equal(0, SIMD.Int8x16.unsignedExtractLane(d, 1));
  equal(0x7e, SIMD.Int8x16.unsignedExtractLane(d, 2));
  equal(0x7f, SIMD.Int8x16.unsignedExtractLane(d, 3));
  equal(0xfe, SIMD.Int8x16.unsignedExtractLane(d, 4));
  equal(0x7d, SIMD.Int8x16.unsignedExtractLane(d, 5));
  equal(0x80, SIMD.Int8x16.unsignedExtractLane(d, 6));
  equal(9, SIMD.Int8x16.unsignedExtractLane(d, 7));
  equal(10, SIMD.Int8x16.unsignedExtractLane(d, 8));
  equal(11, SIMD.Int8x16.unsignedExtractLane(d, 9));
  equal(12, SIMD.Int8x16.unsignedExtractLane(d, 10));
  equal(13, SIMD.Int8x16.unsignedExtractLane(d, 11));
  equal(14, SIMD.Int8x16.unsignedExtractLane(d, 12));
  equal(15, SIMD.Int8x16.unsignedExtractLane(d, 13));
  equal(16, SIMD.Int8x16.unsignedExtractLane(d, 14));
  equal(17, SIMD.Int8x16.unsignedExtractLane(d, 15));
});

test('Int8x16 unsignedAbsoluteDifference', function() {
  var a = SIMD.Int8x16(0xFF, 0, 0xFF, 1, 2, 1, -1, 3, 0x7f, 0, 0xf0, 0xe0, 10, 9, -10, 9);
  var b = SIMD.Int8x16(0x0, 0xFF, 1, 0xFF, 1, 2, 3, -1, 0, 0x7f, 0xe0, 0xf0, 9, 10, 9, -10);
  var c = SIMD.Int8x16.unsignedAbsoluteDifference(a, b);
  equal(255, SIMD.Int8x16.unsignedExtractLane(c, 0));
  equal(255, SIMD.Int8x16.unsignedExtractLane(c, 1));
  equal(254, SIMD.Int8x16.unsignedExtractLane(c, 2));
  equal(254, SIMD.Int8x16.unsignedExtractLane(c, 3));
  equal(1, SIMD.Int8x16.unsignedExtractLane(c, 4));
  equal(1, SIMD.Int8x16.unsignedExtractLane(c, 5));
  equal(252, SIMD.Int8x16.unsignedExtractLane(c, 6));
  equal(252, SIMD.Int8x16.unsignedExtractLane(c, 7));
  equal(127, SIMD.Int8x16.unsignedExtractLane(c, 8));
  equal(127, SIMD.Int8x16.unsignedExtractLane(c, 9));
  equal(16, SIMD.Int8x16.unsignedExtractLane(c, 10));
  equal(16, SIMD.Int8x16.unsignedExtractLane(c, 11));
  equal(1, SIMD.Int8x16.unsignedExtractLane(c, 12));
  equal(1, SIMD.Int8x16.unsignedExtractLane(c, 13));
  equal(237, SIMD.Int8x16.unsignedExtractLane(c, 14));
  equal(237, SIMD.Int8x16.unsignedExtractLane(c, 15));
});

test('Int8x16 widenedUnsignedAbsoluteDifference', function() {
  var a = SIMD.Int8x16(0xFF, 0, 0xFF, 1, 2, 1, -1, 3, 0x7f, 0, 0xf0, 0xe0, 10, 9, -10, 9);
  var b = SIMD.Int8x16(0x0, 0xFF, 1, 0xFF, 1, 2, 3, -1, 0, 0x7f, 0xe0, 0xf0, 9, 10, 9, -10);
  var c = SIMD.Int8x16.widenedUnsignedAbsoluteDifference(a, b);
  equal(255, SIMD.Int16x8.extractLane(c, 0));
  equal(255, SIMD.Int16x8.extractLane(c, 1));
  equal(254, SIMD.Int16x8.extractLane(c, 2));
  equal(254, SIMD.Int16x8.extractLane(c, 3));
  equal(1, SIMD.Int16x8.extractLane(c, 4));
  equal(1, SIMD.Int16x8.extractLane(c, 5));
  equal(252, SIMD.Int16x8.extractLane(c, 6));
  equal(252, SIMD.Int16x8.extractLane(c, 7));
});

test('Int8x16 unsignedHorizontalSum', function() {
  var a = SIMD.Int8x16.splat(0);
  var b = SIMD.Int8x16.unsignedHorizontalSum(a);
  equal(0, b);

  var a = SIMD.Int8x16.splat(-1);
  var b = SIMD.Int8x16.unsignedHorizontalSum(a);
  equal(4080, b);

  a = SIMD.Int8x16(0xFF, 0, 0xFF, 1, 2, 1, -1, 3, 0x7f, 0, 0xf0, 0xe0, 10, 9, -10, 9);
  b = SIMD.Int8x16.unsignedHorizontalSum(a);
  equal(1637, b);
});

test('Int8x16 comparisons', function() {
  var m = SIMD.Int8x16(1000, 2000, 100, 1, -1000, -2000, -100, 1, 0, 0, 0, 0, -1, 1, -2, 2);
  var n = SIMD.Int8x16(-2000, 2000, 1, 100, 2000, -2000, -1, -100, -1, 1, -2, 2, 0, 0, 0, 0);
  var cmp;
  cmp = SIMD.Int8x16.lessThan(m, n);
  equal(true, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.unsignedLessThan(m, n);
  equal(false, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.lessThanOrEqual(m, n);
  equal(true, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.unsignedLessThanOrEqual(m, n);
  equal(false, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.equal(m, n);
  equal(false, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.notEqual(m, n);
  equal(true, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.greaterThan(m, n);
  equal(false, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.unsignedGreaterThan(m, n);
  equal(true, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.greaterThanOrEqual(m, n);
  equal(false, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 15));

  cmp = SIMD.Int8x16.unsignedGreaterThanOrEqual(m, n);
  equal(true, SIMD.Bool8x16.extractLane(cmp, 0));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 1));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 2));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 3));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 4));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 5));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 6));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 7));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 8));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 9));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 10));
  equal(false, SIMD.Bool8x16.extractLane(cmp, 11));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 12));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 13));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 14));
  equal(true, SIMD.Bool8x16.extractLane(cmp, 15));
});

test('Int8x16 shiftLeftByScalar', function() {
  var a = SIMD.Int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.Int8x16.shiftLeftByScalar(a, 1);
  equal(SIMD.Int8x16.extractLane(b, 0), -2);
  equal(SIMD.Int8x16.extractLane(b, 1), -2);
  equal(SIMD.Int8x16.extractLane(b, 2), -2);
  equal(SIMD.Int8x16.extractLane(b, 3), -2);
  equal(SIMD.Int8x16.extractLane(b, 4), -2);
  equal(SIMD.Int8x16.extractLane(b, 5), -2);
  equal(SIMD.Int8x16.extractLane(b, 6), -2);
  equal(SIMD.Int8x16.extractLane(b, 7), -2);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x02);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftLeftByScalar(a, 2);
  equal(SIMD.Int8x16.extractLane(b, 0), -4);
  equal(SIMD.Int8x16.extractLane(b, 1), -4);
  equal(SIMD.Int8x16.extractLane(b, 2), -4);
  equal(SIMD.Int8x16.extractLane(b, 3), -4);
  equal(SIMD.Int8x16.extractLane(b, 4), -4);
  equal(SIMD.Int8x16.extractLane(b, 5), -4);
  equal(SIMD.Int8x16.extractLane(b, 6), -4);
  equal(SIMD.Int8x16.extractLane(b, 7), -4);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x04);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftLeftByScalar(a, 6);
  equal(SIMD.Int8x16.extractLane(b, 0), -64);
  equal(SIMD.Int8x16.extractLane(b, 1), -64);
  equal(SIMD.Int8x16.extractLane(b, 2), -64);
  equal(SIMD.Int8x16.extractLane(b, 3), -64);
  equal(SIMD.Int8x16.extractLane(b, 4), -64);
  equal(SIMD.Int8x16.extractLane(b, 5), -64);
  equal(SIMD.Int8x16.extractLane(b, 6), -64);
  equal(SIMD.Int8x16.extractLane(b, 7), -64);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x40);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftLeftByScalar(a, 7);
  equal(SIMD.Int8x16.extractLane(b, 0), -128);
  equal(SIMD.Int8x16.extractLane(b, 1), -128);
  equal(SIMD.Int8x16.extractLane(b, 2), -128);
  equal(SIMD.Int8x16.extractLane(b, 3), -128);
  equal(SIMD.Int8x16.extractLane(b, 4), -128);
  equal(SIMD.Int8x16.extractLane(b, 5), -128);
  equal(SIMD.Int8x16.extractLane(b, 6), -128);
  equal(SIMD.Int8x16.extractLane(b, 7), -128);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), -128);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftLeftByScalar(a, 16);
  equal(SIMD.Int8x16.extractLane(b, 0), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 1), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 2), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 3), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 5), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 6), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 7), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x0);
  b = SIMD.Int8x16.shiftLeftByScalar(a, -1);
  equal(SIMD.Int8x16.extractLane(b, 0), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 1), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 2), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 3), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 5), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 6), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 7), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x0);
});

test('Int8x16 shiftRightArithmeticByScalar', function() {
  var a = SIMD.Int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.Int8x16.shiftRightArithmeticByScalar(a, 1);
  equal(SIMD.Int8x16.extractLane(b, 0), -1);
  equal(SIMD.Int8x16.extractLane(b, 1), -1);
  equal(SIMD.Int8x16.extractLane(b, 2), -1);
  equal(SIMD.Int8x16.extractLane(b, 3), -1);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 5), -1);
  equal(SIMD.Int8x16.extractLane(b, 6), -1);
  equal(SIMD.Int8x16.extractLane(b, 7), -1);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftRightArithmeticByScalar(a, 2);
  equal(SIMD.Int8x16.extractLane(b, 0), -1);
  equal(SIMD.Int8x16.extractLane(b, 1), -1);
  equal(SIMD.Int8x16.extractLane(b, 2), -1);
  equal(SIMD.Int8x16.extractLane(b, 3), -1);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x1f);
  equal(SIMD.Int8x16.extractLane(b, 5), -1);
  equal(SIMD.Int8x16.extractLane(b, 6), -1);
  equal(SIMD.Int8x16.extractLane(b, 7), -1);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftRightArithmeticByScalar(a, 6);
  equal(SIMD.Int8x16.extractLane(b, 0), -1);
  equal(SIMD.Int8x16.extractLane(b, 1), -1);
  equal(SIMD.Int8x16.extractLane(b, 2), -1);
  equal(SIMD.Int8x16.extractLane(b, 3), -1);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 5), -1);
  equal(SIMD.Int8x16.extractLane(b, 6), -1);
  equal(SIMD.Int8x16.extractLane(b, 7), -1);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftRightArithmeticByScalar(a, 7);
  equal(SIMD.Int8x16.extractLane(b, 0), -1);
  equal(SIMD.Int8x16.extractLane(b, 1), -1);
  equal(SIMD.Int8x16.extractLane(b, 2), -1);
  equal(SIMD.Int8x16.extractLane(b, 3), -1);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 5), -1);
  equal(SIMD.Int8x16.extractLane(b, 6), -1);
  equal(SIMD.Int8x16.extractLane(b, 7), -1);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftRightArithmeticByScalar(a, 8);
  equal(SIMD.Int8x16.extractLane(b, 0), -1);
  equal(SIMD.Int8x16.extractLane(b, 1), -1);
  equal(SIMD.Int8x16.extractLane(b, 2), -1);
  equal(SIMD.Int8x16.extractLane(b, 3), -1);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 5), -1);
  equal(SIMD.Int8x16.extractLane(b, 6), -1);
  equal(SIMD.Int8x16.extractLane(b, 7), -1);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x0);
  b = SIMD.Int8x16.shiftRightArithmeticByScalar(a, -1);
  equal(SIMD.Int8x16.extractLane(b, 0), -1);
  equal(SIMD.Int8x16.extractLane(b, 1), -1);
  equal(SIMD.Int8x16.extractLane(b, 2), -1);
  equal(SIMD.Int8x16.extractLane(b, 3), -1);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 5), -1);
  equal(SIMD.Int8x16.extractLane(b, 6), -1);
  equal(SIMD.Int8x16.extractLane(b, 7), -1);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x0);
});

test('Int8x16 shiftRightLogicalByScalar', function() {
  var a = SIMD.Int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.Int8x16.shiftRightLogicalByScalar(a, 1);
  equal(SIMD.Int8x16.extractLane(b, 0), 0x7f);
  equal(SIMD.Int8x16.extractLane(b, 1), 0x7f);
  equal(SIMD.Int8x16.extractLane(b, 2), 0x7f);
  equal(SIMD.Int8x16.extractLane(b, 3), 0x7f);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 5), 0x7f);
  equal(SIMD.Int8x16.extractLane(b, 6), 0x7f);
  equal(SIMD.Int8x16.extractLane(b, 7), 0x7f);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftRightLogicalByScalar(a, 2);
  equal(SIMD.Int8x16.extractLane(b, 0), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 1), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 2), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 3), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x1f);
  equal(SIMD.Int8x16.extractLane(b, 5), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 6), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 7), 0x3f);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftRightLogicalByScalar(a, 6);
  equal(SIMD.Int8x16.extractLane(b, 0), 0x03);
  equal(SIMD.Int8x16.extractLane(b, 1), 0x03);
  equal(SIMD.Int8x16.extractLane(b, 2), 0x03);
  equal(SIMD.Int8x16.extractLane(b, 3), 0x03);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 5), 0x03);
  equal(SIMD.Int8x16.extractLane(b, 6), 0x03);
  equal(SIMD.Int8x16.extractLane(b, 7), 0x03);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftRightLogicalByScalar(a, 7);
  equal(SIMD.Int8x16.extractLane(b, 0), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 1), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 2), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 3), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 5), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 6), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 7), 0x01);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x00);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x00);
  b = SIMD.Int8x16.shiftRightLogicalByScalar(a, 8);
  equal(SIMD.Int8x16.extractLane(b, 0), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 1), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 2), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 3), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 5), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 6), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 7), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x0);
  b = SIMD.Int8x16.shiftRightLogicalByScalar(a, -1);
  equal(SIMD.Int8x16.extractLane(b, 0), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 1), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 2), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 3), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 4), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 5), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 6), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 7), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 8), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 9), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 10), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 11), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 12), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 13), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 14), 0x0);
  equal(SIMD.Int8x16.extractLane(b, 15), 0x0);
});

test('Int8x16 select', function() {
  var m = SIMD.Bool8x16(true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false);
  var t = SIMD.Int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var f = SIMD.Int8x16(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32);
  var s = SIMD.Int8x16.select(m, t, f);
  equal(1, SIMD.Int8x16.extractLane(s, 0));
  equal(2, SIMD.Int8x16.extractLane(s, 1));
  equal(3, SIMD.Int8x16.extractLane(s, 2));
  equal(4, SIMD.Int8x16.extractLane(s, 3));
  equal(5, SIMD.Int8x16.extractLane(s, 4));
  equal(6, SIMD.Int8x16.extractLane(s, 5));
  equal(7, SIMD.Int8x16.extractLane(s, 6));
  equal(8, SIMD.Int8x16.extractLane(s, 7));
  equal(25, SIMD.Int8x16.extractLane(s, 8));
  equal(26, SIMD.Int8x16.extractLane(s, 9));
  equal(27, SIMD.Int8x16.extractLane(s, 10));
  equal(28, SIMD.Int8x16.extractLane(s, 11));
  equal(29, SIMD.Int8x16.extractLane(s, 12));
  equal(30, SIMD.Int8x16.extractLane(s, 13));
  equal(31, SIMD.Int8x16.extractLane(s, 14));
  equal(32, SIMD.Int8x16.extractLane(s, 15));
});

test('Int8x16 selectBits', function() {
  var m = SIMD.Int8x16(0xaaaaaaaa, 0xbbbbbbbb, 0xcccccccc, 0xdddddddd, 0xeeeeeeee, 0xffffffff, 0x00000000, 0x11111111,
                       0x22222222, 0x33333333, 0x44444444, 0x55555555, 0x66666666, 0x77777777, 0x88888888, 0x99999999);
  var t = SIMD.Int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var f = SIMD.Int8x16(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32);
  var s = SIMD.Int8x16.selectBits(m, t, f);
  equal(17, SIMD.Int8x16.extractLane(s, 0));
  equal(2, SIMD.Int8x16.extractLane(s, 1));
  equal(19, SIMD.Int8x16.extractLane(s, 2));
  equal(4, SIMD.Int8x16.extractLane(s, 3));
  equal(21, SIMD.Int8x16.extractLane(s, 4));
  equal(6, SIMD.Int8x16.extractLane(s, 5));
  equal(23, SIMD.Int8x16.extractLane(s, 6));
  equal(8, SIMD.Int8x16.extractLane(s, 7));
  equal(25, SIMD.Int8x16.extractLane(s, 8));
  equal(10, SIMD.Int8x16.extractLane(s, 9));
  equal(27, SIMD.Int8x16.extractLane(s, 10));
  equal(12, SIMD.Int8x16.extractLane(s, 11));
  equal(29, SIMD.Int8x16.extractLane(s, 12));
  equal(14, SIMD.Int8x16.extractLane(s, 13));
  equal(31, SIMD.Int8x16.extractLane(s, 14));
  equal(48, SIMD.Int8x16.extractLane(s, 15));
});

test('Int8x16 fromFloat32x4Bits constructor', function() {
  var m = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.Int8x16.fromFloat32x4Bits(m);
  equal(0x00, SIMD.Int8x16.extractLane(n, 0));
  equal(0x00, SIMD.Int8x16.extractLane(n, 1));
  equal(-128, SIMD.Int8x16.extractLane(n, 2));
  equal(0x3f, SIMD.Int8x16.extractLane(n, 3));
  equal(0x00, SIMD.Int8x16.extractLane(n, 4));
  equal(0x00, SIMD.Int8x16.extractLane(n, 5));
  equal(0x00, SIMD.Int8x16.extractLane(n, 6));
  equal(0x40, SIMD.Int8x16.extractLane(n, 7));
  equal(0x00, SIMD.Int8x16.extractLane(n, 8));
  equal(0x00, SIMD.Int8x16.extractLane(n, 9));
  equal(0x40, SIMD.Int8x16.extractLane(n, 10));
  equal(0x40, SIMD.Int8x16.extractLane(n, 11));
  equal(0x00, SIMD.Int8x16.extractLane(n, 12));
  equal(0x00, SIMD.Int8x16.extractLane(n, 13));
  equal(-128, SIMD.Int8x16.extractLane(n, 14));
  equal(0x40, SIMD.Int8x16.extractLane(n, 15));
});

"use strict";

/**
  * Construct a new instance of a Float32x4 number.
  * @param {double} value used for x lane.
  * @param {double} value used for y lane.
  * @param {double} value used for z lane.
  * @param {double} value used for w lane.
  * @constructor
  */
function Float32x4(x,y,z,w) {
  this.storage_ = new Float32Array(4);
  this.storage_[0] = x;
  this.storage_[1] = y;
  this.storage_[2] = z;
  this.storage_[3] = w;
}

/**
  * Construct a new instance of a Float32x4 number with 0.0 in all lanes.
  * @constructor
  */
Float32x4.zero = function() {
  return new Float32x4(0.0, 0.0, 0.0, 0.0);
}

Object.defineProperty(Float32x4.prototype, 'x', {
  get: function() { return this.storage_[0]; }
});

Object.defineProperty(Float32x4.prototype, 'y', {
  get: function() { return this.storage_[1]; }
});

Object.defineProperty(Float32x4.prototype, 'z', {
  get: function() { return this.storage_[2]; }
});

Object.defineProperty(Float32x4.prototype, 'w',
  { get: function() { return this.storage_[3]; }
});

Object.defineProperty(Float32x4.prototype, 'xxxx', { get: function() {
    return new Float32x4(this.x, this.x, this.x, this.x);
  }
});
Object.defineProperty(Float32x4.prototype, 'yyyy', { get: function() {
    return new Float32x4(this.y, this.y, this.y, this.y);
  }
});
Object.defineProperty(Float32x4.prototype, 'zzzz', { get: function() {
    return new Float32x4(this.z, this.z, this.z, this.z);
  }
});
Object.defineProperty(Float32x4.prototype, 'wwww', { get: function() {
    return new Float32x4(this.w, this.w, this.w, this.w);
  }
});

/**
  * Construct a new instance of a Uint32x4 number.
  * @param {integer} 32-bit unsigned value used for x lane.
  * @param {integer} 32-bit unsigned value used for y lane.
  * @param {integer} 32-bit unsigned value used for z lane.
  * @param {integer} 32-bit unsigned value used for w lane.
  * @constructor
  */
function Uint32x4(x, y, z, w) {
  this.storage_ = new Uint32Array(4);
  this.storage_[0] = x;
  this.storage_[1] = y;
  this.storage_[2] = z;
  this.storage_[3] = w;
}

/**
  * Construct a new instance of a Uint32x4 number with 0xFFFFFFFF or 0x0 in each
  * lane, depending on the truth value in x, y, z, and w.
  * @constructor
  */
Uint32x4.bool = function(x, y, z, w) {
  return new Uint32x4(x ? 0xFFFFFFFF : 0x0,
                      y ? 0xFFFFFFFF : 0x0,
                      z ? 0xFFFFFFFF : 0x0,
                      w ? 0xFFFFFFFF : 0x0);
}

Object.defineProperty(Uint32x4.prototype, 'x', {
  get: function() { return this.storage_[0]; }
});

Object.defineProperty(Uint32x4.prototype, 'y', {
  get: function() { return this.storage_[1]; }
});

Object.defineProperty(Uint32x4.prototype, 'z', {
  get: function() { return this.storage_[2]; }
});

Object.defineProperty(Uint32x4.prototype, 'w',
  { get: function() { return this.storage_[3]; }
});

Object.defineProperty(Uint32x4.prototype, 'flagX', {
  get: function() { return this.storage_[0] != 0x0; }
});

Object.defineProperty(Uint32x4.prototype, 'flagY', {
  get: function() { return this.storage_[1] != 0x0; }
});

Object.defineProperty(Uint32x4.prototype, 'flagZ', {
  get: function() { return this.storage_[2] != 0x0; }
});

Object.defineProperty(Uint32x4.prototype, 'flagW',
  { get: function() { return this.storage_[3] != 0x0; }
});

var SIMD = (function () {
  return {
    /**
      * @return {Float32x4} New instance of Float32x4 with absolute values of
      * t.
      */
    abs: function(t) {
      return new Float32x4(Math.abs(t.x), Math.abs(t.y), Math.abs(t.z),
                           Math.abs(t.w));
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with negated values of
      * t.
      */
    neg: function(t) {
      return new Float32x4(-t.x, -t.y, -t.z, -t.w);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with a + b.
      */
    add: function(a, b) {
      return new Float32x4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with a - b.
      */
    sub: function(a, b) {
      return new Float32x4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with a * b.
      */
    mul: function(a, b) {
      return new Float32x4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with a / b.
      */
    div: function(a, b) {
      return new Float32x4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with t's values clamped
      * between lowerLimit and upperLimit.
      */
    clamp: function(t, lowerLimit, upperLimit) {
      var cx = t.x < lowerLimit.x ? lowerLimit.x : t.x;
      var cy = t.y < lowerLimit.y ? lowerLimit.y : t.y;
      var cz = t.z < lowerLimit.z ? lowerLimit.z : t.z;
      var cw = t.w < lowerLimit.w ? lowerLimit.w : t.w;
      cx = cx > upperLimit.x ? upperLimit.x : cx;
      cy = cy > upperLimit.y ? upperLimit.y : cy;
      cz = cz > upperLimit.z ? upperLimit.z : cz;
      cw = cw > upperLimit.w ? upperLimit.w : cw;
      return new Float32x4(cx, cy, cz, cw);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with the minimum value of
      * t and other.
      */
    min: function(t, other) {
      var cx = t.x > other.x ? other.x : t.x;
      var cy = t.y > other.y ? other.y : t.y;
      var cz = t.z > other.z ? other.z : t.z;
      var cw = t.w > other.w ? other.w : t.w;
      return new Float32x4(cx, cy, cz, cw);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with the maximum value of
      * t and other.
      */
    max: function(t, other) {
      var cx = t.x < other.x ? other.x : t.x;
      var cy = t.y < other.y ? other.y : t.y;
      var cz = t.z < other.z ? other.z : t.z;
      var cw = t.w < other.w ? other.w : t.w;
      return new Float32x4(cx, cy, cz, cw);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with reciprocal value of
      * t.
      */
    reciprocal: function(t) {
      return new Float32x4(1.0 / t.x, 1.0 / t.y, 1.0 / t.z, 1.0 / t.w);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with square root of the
      * reciprocal value of t.
      */
    reciprocalSqrt: function(t) {
      return new Float32x4(Math.sqrt(1.0 / t.x), Math.sqrt(1.0 / t.y),
                           Math.sqrt(1.0 / t.z), Math.sqrt(1.0 / t.w));
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with values of t
      * scaled by s.
      */
    scale: function(t, s) {
      return new Float32x4(s * t.x, s * t.y, s * t.z, s * t.w);
    },
    /**
      * @return {Float32x4} New instance of Float32x4 with square root of
      * values of t.
      */
    sqrt: function(t) {
      return new Float32x4(Math.sqrt(t.x), Math.sqrt(t.y),
                           Math.sqrt(t.z), Math.sqrt(t.w));
    },
    /**
      * @param {double} value used for x lane.
      * @return {Float32x4} New instance of Float32x4 with the values in t and
      * x replaced with {x}.
      */
    withX: function(t, x) {
      return new Float32x4(x, t.y, t.z, t.w);
    },
    /**
      * @param {double} value used for y lane.
      * @return {Float32x4} New instance of Float32x4 with the values in t and
      * y replaced with {y}.
      */
    withY: function(t, y) {
      return new Float32x4(t.x, y, t.z, t.w);
    },
    /**
      * @param {double} value used for z lane.
      * @return {Float32x4} New instance of Float32x4 with the values in t and
      * z replaced with {z}.
      */
    withZ: function(t, z) {
      return new Float32x4(t.x, t.y, z, t.w);
    },
    /**
      * @param {double} value used for w lane.
      * @return {Float32x4} New instance of Float32x4 with the values in t and
      * w replaced with {w}.
      */
    withW: function(t, w) {
      return new Float32x4(t.x, t.y, t.z, w);
    },
    /**
      * @return {Uint32x4} a bit-wise copy of t as a Uint32x4.
      */
    toUint32x4: function(t) {
      var alias = new Uint32Array(t.storage_.buffer);
      return new Uint32x4(alias[0], alias[1], alias[2], alias[3]);
    },
    /**
      * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
      * the result of t < other.
      */
    lessThan: function(t, other) {
      var cx = t.x < other.x;
      var cy = t.y < other.y;
      var cz = t.z < other.z;
      var cw = t.w < other.w;
      return Uint32x4.bool(cx, cy, cz, cw);
    },
    /**
      * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
      * the result of t <= other.
      */
    lessThanOrEqual: function(t, other) {
      var cx = t.x <= other.x;
      var cy = t.y <= other.y;
      var cz = t.z <= other.z;
      var cw = t.w <= other.w;
      return Uint32x4.bool(cx, cy, cz, cw);
    },
    /**
      * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
      * the result of t == other.
      */
    equal: function(t, other) {
      var cx = t.x == other.x;
      var cy = t.y == other.y;
      var cz = t.z == other.z;
      var cw = t.w == other.w;
      return Uint32x4.bool(cx, cy, cz, cw);
    },
    /**
      * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
      * the result of t != other.
      */
    notEqual: function(t, other) {
      var cx = t.x != other.x;
      var cy = t.y != other.y;
      var cz = t.z != other.z;
      var cw = t.w != other.w;
      return Uint32x4.bool(cx, cy, cz, cw);
    },
    /**
      * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
      * the result of t >= other.
      */
    greaterThanOrEqual: function(t, other) {
      var cx = t.x >= other.x;
      var cy = t.y >= other.y;
      var cz = t.z >= other.z;
      var cw = t.w >= other.w;
      return Uint32x4.bool(cx, cy, cz, cw);
    },
    /**
      * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
      * the result of t > other.
      */
    greaterThan: function(t, other) {
      var cx = t.x > other.x;
      var cy = t.y > other.y;
      var cz = t.z > other.z;
      var cw = t.w > other.w;
      return Uint32x4.bool(cx, cy, cz, cw);
    },
    /**
      * @return {Uint32x4} New instance of Uint32x4 with values of a & b.
      */
    and: function(a, b) {
      return new Uint32x4(a.x & b.x, a.y & b.y, a.z & b.z, a.w & b.w);
    },
    /**
      * @return {Uint32x4} New instance of Uint32x4 with values of a | b.
      */
    or: function(a, b) {
      return new Uint32x4(a.x | b.x, a.y | b.y, a.z | b.z, a.w | b.w);
    },
    /**
      * @return {Uint32x4} New instance of Uint32x4 with values of a ^ b.
      */
    xor: function(a, b) {
      return new Uint32x4(a.x ^ b.x, a.y ^ b.y, a.z ^ b.z, a.w ^ b.w);
    },
    /**
      * @return {Uint32x4} New instance of Uint32x4 with values of ~a
      */
    negu32: function(t) {
      return new Uint32x4(~t.x, ~t.y, ~t.z, ~t.w);
    },
    select: function(t, trueValue, falseValue) {
      var tv = SIMD.toUint32x4(trueValue);
      var fv = SIMD.toUint32x4(falseValue);
      var tr = SIMD.and(t, tv);
      var fr = SIMD.and(SIMD.negu32(t), fv);
      return SIMD.toFloat32x4(SIMD.or(tr, fr));
    },
    /**
      * @param {integer} 32-bit value used for x lane.
      * @param {integer} 32-bit value used for y lane.
      * @param {integer} 32-bit value used for z lane.
      * @param {integer} 32-bit value used for w lane.
      * @return {Uint32x4} New instance of Uint32x4 with the values in t and
      * x lane replaced with {x}.
      */
    withXu32: function(t, x) {
      return new Uint32x4(x, t.y, t.z, t.w);
    },
    /**
      * @param {integer} 32-bit value used for y lane.
      * @return {Uint32x4} New instance of Uint32x4 with the values in t and
      * y lane replaced with {y}.
      */
    withYu32: function(t, y) {
      return new Uint32x4(t.x, y, t.z, t.w);
    },
    /**
      * @param {integer} 32-bit value used for z lane.
      * @return {Uint32x4} New instance of Uint32x4 with the values in t and
      * z lane replaced with {z}.
      */

    withZu32: function(t, z) {
      return new Uint32x4(t.x, t.y, z, t.w);
    },
    /**
      * @param {integer} 32-bit value used for w lane.
      * @return {Uint32x4} New instance of Uint32x4 with the values in t and
      * w lane replaced with {w}.
      */
    withWu32: function(t, w) {
      return new Uint32x4(t.x, t.y, t.z, w);
    },
    /**
      * @param {boolean} x
      * @return {Uint32x4} New instance of Uint32x4 with the values in t and
      * x lane replaced with {x}.
      */
    withFlagX: function(t, flagX) {
      var x = flagX ? 0xFFFFFFFF : 0x0;
      return new Uint32x4(x, t.y, t.z, t.w);
    },
    /**
      * @param {boolean} y
      * @return {Uint32x4} New instance of Uint32x4 with the values in t and
      * y lane replaced with {y}.
      */
    withFlagY: function(t, flagY) {
      var y = flagY ? 0xFFFFFFFF : 0x0;
      return new Uint32x4(t.x, y, t.z, t.w);
    },
    /**
      * @param {boolean} z
      * @return {Uint32x4} New instance of Uint32x4 with the values in t and
      * z lane replaced with {z}.
      */
    withFlagZ: function(t, flagZ) {
      var z = flagZ ? 0xFFFFFFFF : 0x0;
      return new Uint32x4(t.x, t.y, z, t.w);
    },
    /**
      * @param {boolean} w
      * @return {Uint32x4} New instance of Uint32x4 with the values in t and
      * w lane replaced with {w}.
      */
    withFlagW: function(t, flagW) {
      var w = flagW ? 0xFFFFFFFF : 0x0;
      return new Uint32x4(t.x, t.y, t.z, w);
    },
    /**
      * @return {Float32x4} a bit-wise copy of t as a Float32x4.
      */
    toFloat32x4: function(t) {
      var alias = new Float32Array(t.storage_.buffer);
      return new Float32x4(alias[0], alias[1], alias[2], alias[3]);
    }
  }
})();
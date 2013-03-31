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
  * @return {Float32x4} New instance of Float32x4 with absolute values of this.
  */
Float32x4.prototype.abs = function() {
  return new Float32x4(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z),
                       Math.abs(this.w))
}

/**
  * @return {Float32x4} New instance of Float32x4 with negated values of this.
  */
Float32x4.prototype.neg = function() {
  return new Float32x4(-this.x, -this.y, -this.z, -this.w);
}

/**
  * @return {Float32x4} New instance of Float32x4 with a + b.
  */
Float32x4.add = function(a, b) {
  return new Float32x4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

/**
  * @return {Float32x4} New instance of Float32x4 with a - b.
  */
Float32x4.sub = function(a, b) {
  return new Float32x4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

/**
  * @return {Float32x4} New instance of Float32x4 with a * b.
  */
Float32x4.mul = function(a, b) {
  return new Float32x4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
}

/**
  * @return {Float32x4} New instance of Float32x4 with a / b.
  */
Float32x4.div = function(a, b) {
  return new Float32x4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
}

/**
  * @return {Float32x4} New instance of Float32x4 with the values clamped
  * between lowerLimit and upperLimit.
  */
Float32x4.prototype.clamp = function(lowerLimit, upperLimit) {
  var cx = this.x < lowerLimit.x ? lowerLimit.x : this.x;
  var cy = this.y < lowerLimit.y ? lowerLimit.y : this.y;
  var cz = this.z < lowerLimit.z ? lowerLimit.z : this.z;
  var cw = this.w < lowerLimit.w ? lowerLimit.w : this.w;
  cx = cx > upperLimit.x ? upperLimit.x : cx;
  cy = cy > upperLimit.y ? upperLimit.y : cy;
  cz = cz > upperLimit.z ? upperLimit.z : cz;
  cw = cw > upperLimit.w ? upperLimit.w : cw;
  return new Float32x4(cx, cy, cz, cw);
}

/**
  * @return {Float32x4} New instance of Float32x4 with the minimum value of
  * this and other.
  */
Float32x4.prototype.min = function(other) {
  var cx = this.x > other.x ? other.x : this.x;
  var cy = this.y > other.y ? other.y : this.y;
  var cz = this.z > other.z ? other.z : this.z;
  var cw = this.w > other.w ? other.w : this.w;
  return new Float32x4(cx, cy, cz, cw);
}

/**
  * @return {Float32x4} New instance of Float32x4 with the maximum value of
  * this and other.
  */
Float32x4.prototype.max = function(other) {
  var cx = this.x < other.x ? other.x : this.x;
  var cy = this.y < other.y ? other.y : this.y;
  var cz = this.z < other.z ? other.z : this.z;
  var cw = this.w < other.w ? other.w : this.w;
  return new Float32x4(cx, cy, cz, cw);
}

/**
  * @return {Float32x4} New instance of Float32x4 with reciprocal value of this.
  */
Float32x4.prototype.reciprocal = function() {
  return new Float32x4(1.0 / this.x, 1.0 / this.y, 1.0 / this.z, 1.0 / this.w);
}

/**
  * @return {Float32x4} New instance of Float32x4 with square root of the
  * reciprocal value of this.
  */
Float32x4.prototype.reciprocalSqrt = function() {
  return new Float32x4(Math.sqrt(1.0 / this.x), Math.sqrt(1.0 / this.y),
                       Math.sqrt(1.0 / this.z), Math.sqrt(1.0 / this.w));
}

/**
  * @return {Float32x4} New instance of Float32x4 with values of this scaled by
  * s.
  */
Float32x4.prototype.scale = function(s) {
  return new Float32x4(s * this.x, s * this.y, s * this.z, s * this.w);
}

/**
  * @return {Float32x4} New instance of Float32x4 with square root of values of
  * this.
  */
Float32x4.prototype.sqrt = function() {
  return new Float32x4(Math.sqrt(this.x), Math.sqrt(this.y), Math.sqrt(this.z),
                       Math.sqrt(this.w));
}

/**
  * @param {double} value used for x lane.
  * @return {Float32x4} New instance of Float32x4 with the values in this and
  * x replaced with {x}.
  */
Float32x4.prototype.withX = function(x) {
  return new Float32x4(x, this.y, this.z, this.w);
}

/**
  * @param {double} value used for y lane.
  * @return {Float32x4} New instance of Float32x4 with the values in this and
  * y replaced with {y}.
  */
Float32x4.prototype.withY = function(y) {
  return new Float32x4(this.x, y, this.z, this.w);
}

/**
  * @param {double} value used for z lane.
  * @return {Float32x4} New instance of Float32x4 with the values in this and
  * z replaced with {z}.
  */
Float32x4.prototype.withZ = function(z) {
  return new Float32x4(this.x, this.y, z, this.w);
}

/**
  * @param {double} value used for w lane.
  * @return {Float32x4} New instance of Float32x4 with the values in this and
  * w replaced with {w}.
  */
Float32x4.prototype.withW = function(w) {
  return new Float32x4(this.x, this.y, this.z, w);
}

/**
  * @return {Uint32x4} a bit-wise copy of this as a Uint32x4.
  */
Float32x4.prototype.toUint32x4 = function() {
  var alias = new Uint32Array(this.storage_.buffer);
  return new Uint32x4(alias[0], alias[1], alias[2], alias[3]);
}

/**
  * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
  * the result of this < other.
  */
Float32x4.prototype.lessThan = function(other) {
  var cx = this.x < other.x;
  var cy = this.y < other.y;
  var cz = this.z < other.z;
  var cw = this.w < other.w;
  return Uint32x4.bool(cx, cy, cz, cw);
}

/**
  * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
  * the result of this <= other.
  */
Float32x4.prototype.lessThanOrEqual = function(other) {
  var cx = this.x <= other.x;
  var cy = this.y <= other.y;
  var cz = this.z <= other.z;
  var cw = this.w <= other.w;
  return Uint32x4.bool(cx, cy, cz, cw);
}

/**
  * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
  * the result of this == other.
  */
Float32x4.prototype.equal = function(other) {
  var cx = this.x == other.x;
  var cy = this.y == other.y;
  var cz = this.z == other.z;
  var cw = this.w == other.w;
  return Uint32x4.bool(cx, cy, cz, cw);
}

/**
  * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
  * the result of this != other.
  */
Float32x4.prototype.notEqual = function(other) {
  var cx = this.x != other.x;
  var cy = this.y != other.y;
  var cz = this.z != other.z;
  var cw = this.w != other.w;
  return Uint32x4.bool(cx, cy, cz, cw);
}

/**
  * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
  * the result of this >= other.
  */
Float32x4.prototype.greaterThanOrEqual = function(other) {
  var cx = this.x >= other.x;
  var cy = this.y >= other.y;
  var cz = this.z >= other.z;
  var cw = this.w >= other.w;
  return Uint32x4.bool(cx, cy, cz, cw);
}

/**
  * @return {Uint32x4} 0xFFFFFFFF or 0x0 in each lane depending on
  * the result of this > other.
  */
Float32x4.prototype.greaterThan = function(other) {
  var cx = this.x > other.x;
  var cy = this.y > other.y;
  var cz = this.z > other.z;
  var cw = this.w > other.w;
  return Uint32x4.bool(cx, cy, cz, cw);
}

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


/**
  * @return {Uint32x4} New instance of Uint32x4 with values of a & b.
  */
Uint32x4.and = function(a, b) {
  return new Uint32x4(a.x & b.x, a.y & b.y, a.z & b.z, a.w & b.w);
}

/**
  * @return {Uint32x4} New instance of Uint32x4 with values of a | b.
  */
Uint32x4.or = function(a, b) {
  return new Uint32x4(a.x | b.x, a.y | b.y, a.z | b.z, a.w | b.w);
}

/**
  * @return {Uint32x4} New instance of Uint32x4 with values of a ^ b.
  */
Uint32x4.xor = function(a, b) {
  return new Uint32x4(a.x ^ b.x, a.y ^ b.y, a.z ^ b.z, a.w ^ b.w);
}

/**
  * @return {Uint32x4} New instance of Uint32x4 with values of ~a
  */
Uint32x4.prototype.neg = function() {
  return new Uint32x4(~this.x, ~this.y, ~this.z, ~this.w);
}

Uint32x4.prototype.select = function(trueValue, falseValue) {
  var tv = trueValue.toUint32x4();
  var fv = falseValue.toUint32x4();
  var tr = Uint32x4.and(this, tv);
  var fr = Uint32x4.and(this.neg(), fv);
  return Uint32x4.or(tr, fr).toFloat32x4();
}

/**
  * @param {integer} 32-bit value used for x lane.
  * @param {integer} 32-bit value used for y lane.
  * @param {integer} 32-bit value used for z lane.
  * @param {integer} 32-bit value used for w lane.
  * @return {Uint32x4} New instance of Uint32x4 with the values in this and
  * x lane replaced with {x}.
  */
Uint32x4.prototype.withX = function(x) {
  return new Uint32x4(x, this.y, this.z, this.w);
}

/**
  * @param {integer} 32-bit value used for y lane.
  * @return {Uint32x4} New instance of Uint32x4 with the values in this and
  * y lane replaced with {y}.
  */

Uint32x4.prototype.withY = function(y) {
  return new Uint32x4(this.x, y, this.z, this.w);
}

/**
  * @param {integer} 32-bit value used for z lane.
  * @return {Uint32x4} New instance of Uint32x4 with the values in this and
  * z lane replaced with {z}.
  */

Uint32x4.prototype.withZ = function(z) {
  return new Uint32x4(this.x, this.y, z, this.w);
}

/**
  * @param {integer} 32-bit value used for w lane.
  * @return {Uint32x4} New instance of Uint32x4 with the values in this and
  * w lane replaced with {w}.
  */
Uint32x4.prototype.withW = function(w) {
  return new Uint32x4(this.x, this.y, this.z, w);
}

/**
  * @param {boolean} x
  * @return {Uint32x4} New instance of Uint32x4 with the values in this and
  * x lane replaced with {x}.
  */
Uint32x4.prototype.withFlagX = function(flagX) {
  var x = flagX ? 0xFFFFFFFF : 0x0;
  return new Uint32x4(x, this.y, this.z, this.w);
}

/**
  * @param {boolean} y
  * @return {Uint32x4} New instance of Uint32x4 with the values in this and
  * y lane replaced with {y}.
  */
Uint32x4.prototype.withFlagY = function(flagY) {
  var y = flagY ? 0xFFFFFFFF : 0x0;
  return new Uint32x4(this.x, y, this.z, this.w);
}

/**
  * @param {boolean} z
  * @return {Uint32x4} New instance of Uint32x4 with the values in this and
  * z lane replaced with {z}.
  */
Uint32x4.prototype.withFlagZ = function(flagZ) {
  var z = flagZ ? 0xFFFFFFFF : 0x0;
  return new Uint32x4(this.x, this.y, z, this.w);
}

/**
  * @param {boolean} w
  * @return {Uint32x4} New instance of Uint32x4 with the values in this and
  * w lane replaced with {w}.
  */
Uint32x4.prototype.withFlagW = function(flagW) {
  var w = flagW ? 0xFFFFFFFF : 0x0;
  return new Uint32x4(this.x, this.y, this.z, w);
}

/**
  * @return {Float32x4} a bit-wise copy of this as a Float32x4.
  */
Uint32x4.prototype.toFloat32x4 = function() {
  var alias = new Float32Array(this.storage_.buffer);
  return new Float32x4(alias[0], alias[1], alias[2], alias[3]);
}
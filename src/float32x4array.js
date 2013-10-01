float32x4.splat = function(s) {
  return float32x4(s, s, s, s);
}

function isNumber(o) {
    return typeof o == "number" || (typeof o == "object" && o.constructor === Number);
}

function isTypedArray(o) {
  return (o instanceof Int8Array) ||
         (o instanceof Uint8Array) ||
         (o instanceof Uint8ClampedArray) ||
         (o instanceof Int16Array) ||
         (o instanceof Uint16Array) ||
         (o instanceof Int32Array) ||
         (o instanceof Uint32Array) ||
         (o instanceof Float32Array) ||
         (o instanceof Float64Array) ||
         (o instanceof Float32x4Array);
}

function isArrayBuffer(o) {
  return (o instanceof ArrayBuffer);
}

function Float32x4Array(a, b, c) {
  if (isNumber(a)) {
    this.storage_ = new Float32Array(a*4);
    this.length_ = a;
    this.byteOffset_ = 0;
    return;
  } else if (isTypedArray(a)) {
    if (!(a instanceof Float32x4Array)) {
      throw "Copying typed array of non-Float32x4Array is unimplemented.";
    }
    this.storage_ = new Float32Array(a.length * 4);
    this.length_ = a.length;
    this.byteOffset_ = 0;
    // Copy floats.
    for (var i = 0; i < a.length*4; i++) {
      this.storage_[i] = a.storage_[i];
    }
  } else if (isArrayBuffer(a)) {
    if ((b != undefined) && (b % Float32x4Array.BYTES_PER_ELEMENT) != 0) {
      throw "byteOffset must be a multiple of 16.";
    }
    if (c != undefined) {
      c *= 4;
      this.storage_ = new Float32Array(a, b, c);
    }
    else {
      // Note: new Float32Array(a, b) is NOT equivalent to new Float32Array(a, b, undefined)
      this.storage_ = new Float32Array(a, b);
    }
    this.length_ = this.storage_.length / 4;
    this.byteOffset_ = b != undefined ? b : 0;
  } else {
    throw "Unknown type of first argument.";
  }
}

Object.defineProperty(Float32x4Array.prototype, 'length',
  { get: function() { return this.length_; }
});

Object.defineProperty(Float32x4Array.prototype, 'byteLength',
  { get: function() { return this.length_ * Float32x4Array.BYTES_PER_ELEMENT; }
});

Object.defineProperty(Float32x4Array, 'BYTES_PER_ELEMENT',
  { get: function() { return 16; }
});

Object.defineProperty(Float32x4Array.prototype, 'BYTES_PER_ELEMENT',
  { get: function() { return 16; }
});

Object.defineProperty(Float32x4Array.prototype, 'byteOffset',
  { get: function() { return this.byteOffset_; }
});

Object.defineProperty(Float32x4Array.prototype, 'buffer',
  { get: function() { return this.storage_.buffer; }
});

Float32x4Array.prototype.getAt = function(i) {
  if (i < 0) {
    throw "Index must be >= 0.";
  }
  if (i >= this.length) {
    throw "Index out of bounds.";
  }
  var x = this.storage_[i*4+0];
  var y = this.storage_[i*4+1];
  var z = this.storage_[i*4+2];
  var w = this.storage_[i*4+3];
  return float32x4(x, y, z, w);
}

Float32x4Array.prototype.setAt = function(i, v) {
  if (i < 0) {
    throw "Index must be >= 0.";
  }
  if (i >= this.length) {
    throw "Index out of bounds.";
  }
  if (!(v instanceof float32x4)) {
    throw "Value is not a float32x4.";
  }
  this.storage_[i*4+0] = v.x;
  this.storage_[i*4+1] = v.y;
  this.storage_[i*4+2] = v.z;
  this.storage_[i*4+3] = v.w;
}

// Simple performance test of SIMD.add operation.  Use SIMD.add to average up elements in a Float32Array.
// Compare to scalar implementation of same function.
// Author: Peter Jensen

(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "Average",
    kernelInit:       initArray,
    kernelSimd:       simdAverage,
    kernelNonSimd:    average,
    kernelIterations: 1000
  };

  // Hook up to the harness
  benchmarks.add (new Benchmark (kernelConfig));

  // Benchmark data, initialization and kernel functions
  var a = new Float32Array (10000);

  function initArray () {
    for (var i = 0, l = a.length; i < l; ++i) {
      a[i] = i;
    }
    // Check that the two kernel functions yields the same result
    return average(1) === simdAverage(1);
  }

  function average (n) {
    for (var i = 0; i < n; ++i) {
      var sum = 0.0;
      for (var j = 0, l = a.length; j < l; ++j) {
        sum += a[j];
      }
    }
    return sum/a.length;
  }

  function simdAverage (n) {
    for (var i = 0; i < n; ++i) {
      var a4   = new Float32x4Array (a.buffer);
      var sum4 = float32x4.splat (0.0);
      for (var j = 0, l = a4.length; j < l; ++j) {
        sum4 = SIMD.add(sum4, a4.getAt(j));
      }
    }
    return (sum4.x + sum4.y + sum4.z + sum4.w) / a.length;
  }

} ());

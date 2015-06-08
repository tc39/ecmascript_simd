// Simple performance test of SIMD.add operation.  Use SIMD.add to average up elements
// in a Float32Array. Compare to scalar implementation of same function.
// Author: Peter Jensen

(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "AverageFloat64x2Load",
    kernelInit:       initArray,
    kernelCleanup:    cleanup,
    kernelSimd:       simdAverage,
    kernelNonSimd:    average,
    kernelIterations: 1000
  };

  // Hook up to the harness
  benchmarks.add(new Benchmark(kernelConfig));

  // Benchmark data, initialization and kernel functions
  var a   = new Float64Array(10000);

  function sanityCheck() {
     return Math.abs(average(1) - simdAverage(1)) < 0.0001;
  }

  function initArray() {
    var j = 0;
    for (var i = 0, l = a.length; i < l; ++i) {
      a[i] = 0.1;
    }
    // Check that the two kernel functions yields the same result, roughly
    // Account for the fact that the simdAverage() is computed using float32
    // precision and the average() is using double precision
    return sanityCheck();
  }

  function cleanup() {
    return sanityCheck();
  }

  function average(n) {
    var l = a.length;
    for (var i = 0; i < n; ++i) {
      var sum = 0.0;
      for (var j = 0; j < l; ++j) {
        sum += a[j];
      }
    }
    return sum/a.length;
  }

  function simdAverage(n) {
    for (var i = 0; i < n; ++i) {
      var sum2 = SIMD.Float64x2.splat(0.0);
      for (var j = 0; j < a.length / 2; ++j) {
        sum2 = SIMD.Float64x2.add(sum2, SIMD.Float64x2.load(a, j << 1));
      }
    }
    return (SIMD.Float64x2.extractLane(sum2, 0) +
        SIMD.Float64x2.extractLane(sum2, 1)) / a.length;
  }

} ());

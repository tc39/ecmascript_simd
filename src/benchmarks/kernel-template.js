// Kernel template
// Author: Peter Jensen
(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "Test",
    kernelInit:       init,
    kernelSimd:       simd,
    kernelNonSimd:    nonSimd,
    kernelIterations: 100000000
  };

  // Hook up to the harness
  benchmarks.add (new Benchmark (kernelConfig));

  // Kernel Initializer
  function init () {
    // Do sanity checking.  Check that simd and nonSimd results are the same.
    // returns:
    //   true:  OK to run the test
    //   false: Not OK to run the test
    return simd (1) === nonSimd (1);
  }

  // SIMD version of the kernel
  function simd (n) {
    var s = 0;
    for (var i = 0; i < n; ++i) {
      s += i;
    }
    return s;
  }

  // Non SIMD version of the kernel
  function nonSimd (n) {
    var s = 0;
    for (var i = 0; i < n; ++i) {
      s += i;
    }
    return s;
  }

} ());

// 4x4 matrix multiplication
// Author: John McCutchan

(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "MatrixMultiplication",
    kernelInit:       init,
    kernelSimd:       simdMultiply,
    kernelNonSimd:    multiply,
    kernelIterations: 1000
  };

  // Hook up to the harness
  benchmarks.add(new Benchmark(kernelConfig));

  // Benchmark data, initialization and kernel functions
  var T1 = new Float32Array(16);
  var T2 = new Float32Array(16);
  var Out = new Float32Array(16);
  var T1x4 = new Float32x4Array(4);
  var T2x4 = new Float32x4Array(4);
  var Outx4 = new Float32x4Array(4);

  function init() {
    T[0] = 1.0;
    T[5] = 1.0;
    T[10] = 1.0;
    T[15] = 1.0;
    return true;
  }

  function multiply(n) {
    for (var i = 0; i < n; i++) {
    }
  }

  function simdMultiply(n) {
    for (var i = 0; i < n; i++) {
    }
  }

} ());

// Transform vertex by 4x4 transformation matrix.
// Author: John McCutchan

(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "VertexTransform",
    kernelInit:       init,
    kernelSimd:       simdVertexTransform,
    kernelNonSimd:    vertexTransform,
    kernelIterations: 1000
  };

  // Hook up to the harness
  benchmarks.add(new Benchmark(kernelConfig));

  // Benchmark data, initialization and kernel functions
  var T = new Float32Array(16);
  var V = new Float32Array(4);
  var Out = new Float32Array(4);
  var Tx4 = new Float32x4Array(4);
  var Vx4 = new Float32x4Array(1);
  var Outx4 = new Float32x4Array(1);

  function init() {
    T[0] = 1.0;
    T[5] = 1.0;
    T[10] = 1.0;
    T[15] = 1.0;
    V[0] = 1.0;
    V[1] = 2.0;
    V[2] = 3.0;
    V[3] = 1.0;
    Tx4.setAt(0, float32x4(1.0, 0.0, 0.0, 0.0));
    Tx4.setAt(1, float32x4(0.0, 1.0, 0.0, 0.0));
    Tx4.setAt(2, float32x4(0.0, 0.0, 1.0, 0.0));
    Tx4.setAt(3, float32x4(0.0, 0.0, 0.0, 1.0));
    Vx4.setAt(0, float32x4(1.0, 2.0, 3.0, 1.0));
    simdVertexTransform(1);
    vertexTransform(1);
    return (Outx4.getAt(0).x == Out[0]) && (Outx4.getAt(0).y == Out[1]) &&
           (Outx4.getAt(0).z == Out[2]) && (Outx4.getAt(0).w == Out[3]);
  }

  function vertexTransform(n) {
    for (var i = 0; i < n; i++) {
      var x = V[0];
      var y = V[1];
      var z = V[2];
      var w = V[3];
      var m0 = T[0];
      var m4 = T[4];
      var m8 = T[8];
      var m12 = T[12];
      Out[0] = (m0 * x + m4 * y + m8 * z + m12 * w);
      var m1 = T[1];
      var m5 = T[5];
      var m9 = T[9];
      var m13 = T[13];
      Out[1] = (m1 * x + m5 * y + m9 * z + m13 * w);
      var m2 = T[2];
      var m6 = T[6];
      var m10 = T[10];
      var m14 = T[14];
      Out[2] = (m2 * x + m6 * y + m10 * z + m14 * w);
      var m3 = T[3];
      var m7 = T[7];
      var m11 = T[11];
      var m15 = T[15];
      Out[3] = (m3 * x + m7 * y + m11 * z + m15 * w);
    }
  }

  function simdVertexTransform(n) {
    for (var i = 0; i < n; i++) {
      var xxxx = SIMD.shuffle(Vx4.getAt(0), SIMD.XXXX);
      var z = float32x4.zero();
      z = SIMD.add(z, SIMD.mul(xxxx, Tx4.getAt(0)));
      var yyyy = SIMD.shuffle(Vx4.getAt(0), SIMD.YYYY);
      z = SIMD.add(z, SIMD.mul(yyyy, Tx4.getAt(1)));
      var zzzz = SIMD.shuffle(Vx4.getAt(0), SIMD.ZZZZ);
      z = SIMD.add(z, SIMD.mul(zzzz, Tx4.getAt(2)));
      var wwww = SIMD.shuffle(Vx4.getAt(0), SIMD.WWWW);
      z = SIMD.add(z, SIMD.mul(wwww, Tx4.getAt(3)));
      Outx4.setAt(0, z);
    }
  }

} ());

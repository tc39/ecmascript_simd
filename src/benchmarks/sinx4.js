// Compute sin() in 4 lanes:
// Algorithm adopted from: http://gruntthepeon.free.fr/ssemath/
// Author: Peter Jensen
(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "Sine",
    kernelInit:       init,
    kernelCleanup:    cleanup,
    kernelSimd:       simd,
    kernelNonSimd:    nonSimd,
    kernelIterations: 100000000
  };

  // Hook up to the harness
  benchmarks.add (new Benchmark (kernelConfig));

  // Kernel Initializer
  function init () {
    // Do initial sanity check and initialize data for the kernels.
    // The sanity check should verify that the simd and nonSimd results
    // are the same.
    // It is recommended to do minimal object creation in the kernels
    // themselves.  If global data needs to be initialized, here would
    // be the place to do it.
    // If the sanity checks fails the kernels will not be executed
    // Returns:
    //   true:  First run (unoptimized) of the kernels passed
    //   false: First run (unoptimized) of the kernels failed
    var simdResult    = simd(1);
    var nonSimdResult = nonSimd(1);
    return almostEqual (simdResult, nonSimdResult);
  }

  // Kernel Cleanup
  function cleanup () {
    // Do final sanity check and perform cleanup.
    // This function is called when all the kernel iterations have been
    // executed, so they should be in their final optimized version.  The
    // sanity check done during initialization will probably be of the
    // initial unoptimized version.
    // Returns:
    //   true:  Last run (optimized) of the kernels passed
    //   false: last run (optimized) of the kernels failed
    var simdResult    = simd(1);
    var nonSimdResult = nonSimd(1);
    return almostEqual (simdResult, nonSimdResult);
  }

  function almostEqual(a, b) {
    for (var i = 0; i < 4; ++i) {
      if (Math.abs (a - b) > 0.00001) {
        return false;
      }
    }
    return true;
  }

  function printFloat32x4(msg, v) {
    print (msg, v.x.toFixed(6), v.y.toFixed(6), v.z.toFixed(6), v.w.toFixed(6));
  }

  function printInt32x4(msg, v) {
    print (msg, v.x, v.y, v.z, v.w);
  }

  function sinx4Test() {
    var x = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
    var sinx4 = simdSin(x);
    print (sinx4.x, sinx4.y, sinx4.z, sinx4.w);
    print (Math.sin(x.x), Math.sin(x.y), Math.sin(x.z), Math.sin(x.w));
  }

  var _ps_sign_mask        = SIMD.int32x4.splat(0x80000000);
  var _ps_inv_sign_mask    = SIMD.int32x4.not(_ps_sign_mask);
  var _ps_cephes_FOPI      = SIMD.float32x4.splat(1.27323954473516);
  var _pi32_1              = SIMD.int32x4.splat(1);
  var _pi32_inv1           = SIMD.int32x4.not(_pi32_1);
  var _pi32_4              = SIMD.int32x4.splat(4);
  var _pi32_2              = SIMD.int32x4.splat(2);
  var _ps_minus_cephes_DP1 = SIMD.float32x4.splat(-0.78515625);
  var _ps_minus_cephes_DP2 = SIMD.float32x4.splat(-2.4187564849853515625E-4);
  var _ps_minus_cephes_DP3 = SIMD.float32x4.splat(-3.77489497744594108E-8);
  var _ps_coscof_p0        = SIMD.float32x4.splat(2.443315711809948E-5);
  var _ps_coscof_p1        = SIMD.float32x4.splat(-1.388731625493765E-3);
  var _ps_coscof_p2        = SIMD.float32x4.splat(4.166664568298827E-2);
  var _ps_0p5              = SIMD.float32x4.splat(0.5);
  var _ps_1                = SIMD.float32x4.splat(1.0);
  var _ps_sincof_p0        = SIMD.float32x4.splat(-1.9515295891E-4);
  var _ps_sincof_p1        = SIMD.float32x4.splat(8.3321608736E-3);
  var _ps_sincof_p2        = SIMD.float32x4.splat(-1.6666654611E-1);

  function sinx4 (x) {
    var xmm1;
    var xmm2;
    var xmm3;
    var sign_bit;
    var swap_sign_bit;
    var poly_mask;
    var y;
    var y2;
    var z;
    var tmp;

    var emm0;
    var emm2;

    sign_bit = x;
    x        = SIMD.int32x4.bitsToFloat32x4(SIMD.int32x4.and(SIMD.float32x4.bitsToInt32x4(x), _ps_inv_sign_mask));
    sign_bit = SIMD.int32x4.bitsToFloat32x4(SIMD.int32x4.and(SIMD.float32x4.bitsToInt32x4(sign_bit), _ps_sign_mask));
    y        = SIMD.float32x4.mul(x, _ps_cephes_FOPI);
    //printFloat32x4 ("Probe 6", y);
    emm2     = SIMD.float32x4.toInt32x4(y);
    emm2     = SIMD.int32x4.add(emm2, _pi32_1);
    emm2     = SIMD.int32x4.and(emm2, _pi32_inv1);
    //printInt32x4 ("Probe 8", emm2);
    y        = SIMD.int32x4.toFloat32x4(emm2);
    //printFloat32x4 ("Probe 7", y);
    emm0     = SIMD.int32x4.and(emm2, _pi32_4);
    emm0     = SIMD.int32x4.shiftLeft(emm0, 29);

    emm2     = SIMD.int32x4.and(emm2, _pi32_2);
    emm2     = SIMD.int32x4.equal(emm2, SIMD.int32x4.zero());

    swap_sign_bit = SIMD.int32x4.bitsToFloat32x4(emm0);
    poly_mask     = SIMD.int32x4.bitsToFloat32x4(emm2);
    sign_bit      = SIMD.int32x4.bitsToFloat32x4(SIMD.int32x4.xor(SIMD.float32x4.bitsToInt32x4(sign_bit), SIMD.float32x4.bitsToInt32x4(swap_sign_bit)));
    //printFloat32x4 ("Probe 1", sign_bit);

    //printFloat32x4 ("Probe 4", y);
    //printFloat32x4 ("Probe 5", _ps_minus_cephes_DP1);
    xmm1 = SIMD.float32x4.mul(y, _ps_minus_cephes_DP1);
    //printFloat32x4 ("Probe 3", xmm1);
    xmm2 = SIMD.float32x4.mul(y, _ps_minus_cephes_DP2);
    xmm3 = SIMD.float32x4.mul(y, _ps_minus_cephes_DP3);
    x    = SIMD.float32x4.add(x, xmm1);
    x    = SIMD.float32x4.add(x, xmm2);
    x    = SIMD.float32x4.add(x, xmm3);
    //printFloat32x4 ("Probe 2", x);

    y    = _ps_coscof_p0;
    z    = SIMD.float32x4.mul(x, x);
    y    = SIMD.float32x4.mul(y, z);
    y    = SIMD.float32x4.add(y, _ps_coscof_p1);
    y    = SIMD.float32x4.mul(y, z);
    y    = SIMD.float32x4.add(y, _ps_coscof_p2);
    y    = SIMD.float32x4.mul(y, z);
    y    = SIMD.float32x4.mul(y, z);
    tmp  = SIMD.float32x4.mul(z, _ps_0p5);
    y    = SIMD.float32x4.sub(y, tmp);
    y    = SIMD.float32x4.add(y, _ps_1);

    y2   = _ps_sincof_p0;
    //printFloat32x4 ("Probe 11", y2);
    //printFloat32x4 ("Probe 12", z);
    y2   = SIMD.float32x4.mul(y2, z);
    y2   = SIMD.float32x4.add(y2, _ps_sincof_p1);
    //printFloat32x4 ("Probe 13", y2);
    y2   = SIMD.float32x4.mul(y2, z);
    y2   = SIMD.float32x4.add(y2, _ps_sincof_p2);
    y2   = SIMD.float32x4.mul(y2, z);
    y2   = SIMD.float32x4.mul(y2, x);
    y2   = SIMD.float32x4.add(y2, x);

    xmm3 = poly_mask;
    y2   = SIMD.int32x4.bitsToFloat32x4(SIMD.int32x4.and(SIMD.float32x4.bitsToInt32x4(xmm3), SIMD.float32x4.bitsToInt32x4(y2)));
    //printFloat32x4 ("Probe 10", y2);
    y    = SIMD.int32x4.bitsToFloat32x4(SIMD.int32x4.and(SIMD.int32x4.not(SIMD.float32x4.bitsToInt32x4(xmm3)), SIMD.float32x4.bitsToInt32x4(y)));
    y    = SIMD.float32x4.add(y, y2);

    //printFloat32x4 ("Probe 9", y);
    y    = SIMD.int32x4.bitsToFloat32x4(SIMD.int32x4.xor(SIMD.float32x4.bitsToInt32x4(y), SIMD.float32x4.bitsToInt32x4(sign_bit)));
    return y;
  }

  var simdInput    = SIMD.float32x4 (1.0, 2.0, 3.0, 4.0);
  var nonSimdInput = [1.0, 2.0, 3.0, 4.0];

  // SIMD version of the kernel
  function simd (n) {
    var result ;
    for (var i = 0; i < n; ++i) {
      result = sinx4 (simdInput);
    }
    return [result.x, result.y, result.z, result.w];
  }

  // Non SIMD version of the kernel
  function nonSimd (n) {
    var s = 0;
    var x = nonSimdInput[0];
    var y = nonSimdInput[1];
    var z = nonSimdInput[2];
    var w = nonSimdInput[3];
    var rx, ry, rz, rw;
    for (var i = 0; i < n; ++i) {
      rx = Math.sin(x);
      ry = Math.sin(y);
      rz = Math.sin(z);
      rw = Math.sin(w);
    }
    return [rx, ry, rz, rw];
  }

} ());

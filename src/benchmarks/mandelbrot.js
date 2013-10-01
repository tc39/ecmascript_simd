// Mandelbrot Benchmark
// Author: Peter Jensen
(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "Mandelbrot",
    kernelInit:       initMandelbrot,
    kernelSimd:       simdMandelbrot,
    kernelNonSimd:    nonSimdMandelbrot,
    kernelIterations: 10000
  };

  // Hook up to the harness
  benchmarks.add (new Benchmark (kernelConfig));

  function float32x4ToString (f4) {
    return "[" + f4.x + "," + f4.y + "," + f4.z + "," + f4.w + "]";
  }

  function uint32x4ToString (i4) {
    return "[" + i4.x + "," + i4.y + "," + i4.z + "," + i4.w + "]";
  }

  function mandelx1 (c_re, c_im, max_iterations) {
    var z_re = c_re,
        z_im = c_im,
        i;
    for (i = 0; i < max_iterations; i++) {
      var z_re2 = z_re*z_re;
      var z_im2 = z_im*z_im;
      if (z_re2 + z_im2 > 4.0)
        break;

      var new_re = z_re2 - z_im2;
      var new_im = 2.0 * z_re * z_im;
      z_re = c_re + new_re;
      z_im = c_im + new_im;
    }
    return i;
  }

  function mandelx4(c_re4, c_im4, max_iterations) {
    var z_re4  = SIMD.toFloat32x4 (c_re4);  // create a clone, rename to .clone() ???
    var z_im4  = SIMD.toFloat32x4 (c_im4);  // create a clone
    var four4  = float32x4.splat (4.0);
    var two4   = float32x4.splat (2.0);
    var count4 = uint32x4.splat (0);
    var one4   = uint32x4.splat (1);

    for (var i = 0; i < max_iterations; ++i) {
      var z_re24 = SIMD.mul (z_re4, z_re4);
      var z_im24 = SIMD.mul (z_im4, z_im4);

      var mi4    = SIMD.lessThanOrEqual (SIMD.add (z_re24, z_im24), four4);
      // if all 4 values are greater than 4.0, there's no reason to continue
      if (mi4.signMask === 0x00) {
        break;
      }

      var new_re4 = SIMD.sub (z_re24, z_im24);
      var new_im4 = SIMD.mul (SIMD.mul (two4, z_re4), z_im4);
      z_re4       = SIMD.add (c_re4, new_re4);
      z_im4       = SIMD.add (c_im4, new_im4);
      count4      = SIMD.add (count4, SIMD.and (mi4, one4));
    }
    return count4;
  }

  function initMandelbrot () {
    var simd    = simdMandelbrot (1);
    var nonSimd = nonSimdMandelbrot (1);
    if (simd.length !== nonSimd.length) {
      return false;
    }
    for (var i = 0, n = simd.length; i < n; ++i) {
      if (simd[i] !== nonSimd[i]) {
        return false;
      }
    }
    return true;
  }

  // Non SIMD version of the kernel
  function nonSimdMandelbrot (n) {
    var result = new Array (4);
    for (var i = 0; i < n; ++i) {
      result [0] = mandelx1 (0.0, 0.0, 100);
      result [1] = mandelx1 (0.0, 0.0, 100);
      result [2] = mandelx1 (0.0, 0.0, 100);
      result [3] = mandelx1 (0.0, 0.0, 100);
    }
    return result;
  }

  // SIMD version of the kernel
  function simdMandelbrot (n) {
    var result = new Array (4);
    var zero4  = float32x4.zero ();
    for (var i = 0; i < n; ++i) {
      var r = mandelx4 (zero4, zero4, 100);
      result [0] = r.x;
      result [1] = r.y;
      result [2] = r.z;
      result [3] = r.w;
    }
    return result;
  }

} ());

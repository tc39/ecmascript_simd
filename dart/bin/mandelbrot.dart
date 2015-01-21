/*
  Copyright (C) 2013 John McCutchan <john@johnmccutchan.com>

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors be held liable for any damages
  arising from the use of this software.

  Permission is granted to anyone to use this software for any purpose,
  including commercial applications, and to alter it and redistribute it
  freely, subject to the following restrictions:

  1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
  2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
  3. This notice may not be removed or altered from any source distribution.

*/

library vector_math_matrix_bench;

import 'dart:typed_data';
import 'package:vector_math/vector_math_operations.dart';
import 'package:benchmark_harness/benchmark_harness.dart';
import 'benchmark_contrast.dart';

class NonSIMDMandelbrotBenchmark extends BenchmarkBase {
  const NonSIMDMandelbrotBenchmark() : super("NonSIMDMandelbrot");

  static void main() {
    new NonSIMDMandelbrotBenchmark().report();
  }

  int mandelx1 (double c_re, double c_im, int max_iterations) {
    double z_re = c_re;
    double z_im = c_im;
    int    i;
    for (i = 0; i < max_iterations; i++) {
      double z_re2 = z_re*z_re;
      double z_im2 = z_im*z_im;
      if (z_re2 + z_im2 > 4.0)
        break;

      double new_re = z_re2 - z_im2;
      double new_im = 2.0 * z_re * z_im;
      z_re = c_re + new_re;
      z_im = c_im + new_im;
    }
    return i;
  }

  void run() {
    float c_real = -0.50075;
    float c_imagine = 0.003;
    int max_iterations = 100;
    for (int i = 0; i < 80000; i++) {
      mandelx1(c_real, c_imagine, max_iterations);
    }
  }
}

class SIMDMandelbrotBenchmark extends BenchmarkBase {
  const SIMDMandelbrotBenchmark() : super("SIMDMandelbrot");
  final Int32x4 one4 = new Int32x4(1, 1, 1, 1);

  static void main() {
    new SIMDMandelbrotBenchmark().report();
  }

  Int32x4 mandelx4(Float32x4 c_re4, Float32x4 c_im4, int max_iterations) {
    Float32x4 z_re4  = c_re4;
    Float32x4 z_im4  = c_im4;
    Float32x4 four4  = new Float32x4.splat(4.0);
    Float32x4 two4   = new Float32x4.splat(2.0);
    Int32x4 count4  = new Int32x4(0, 0, 0, 0);

    int i;
    bool done = false;
    for (i = 0; !done && i < max_iterations; ++i) {
      Float32x4 z_re24 = z_re4 * z_re4;
      Float32x4 z_im24 = z_im4 * z_im4;
      Int32x4 mi4 = (z_re24 + z_im24).lessThan(four4);
      done = mi4.signMask == 0x0;
      Float32x4 new_re4 = z_re24 - z_im24;
      Float32x4 new_im4 = two4 * z_re4 * z_im4;
      z_re4 = c_re4 + new_re4;
      z_im4 = c_im4 + new_im4;
      Int32x4 add01 = mi4 & one4;
      count4 = count4 + add01;
    }
    return count4;
  }

  void run() {
    Float32x4 c_real = new Float32x4(-0.50075, -0.50075, -0.50075, -0.50075);
    Float32x4 c_imagine = new Float32x4(0.003, 0.003, 0.003, 0.003);
    int max_iterations = 100;
    for (int i = 0; i < 20000; i++) {
      mandelx4(c_real, c_imagine, max_iterations);
    }
  }
}

class MandelbrotBenchmark {
  static Object create() {
    return new BenchmarkContrast("Mandelbrot",
                                 new NonSIMDMandelbrotBenchmark(),
                                 new SIMDMandelbrotBenchmark());
  }
}

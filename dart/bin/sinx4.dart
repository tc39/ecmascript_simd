/*
  Copyright (C) 2014 Zachary Anderson (zanderso@gmail.com)

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

import 'dart:math';
import 'dart:typed_data';
import 'package:vector_math/vector_math_operations.dart';
import 'package:benchmark_harness/benchmark_harness.dart';
import 'benchmark_contrast.dart';


class NonSIMDSineBenchmark extends BenchmarkBase {
  const NonSIMDSineBenchmark() : super("NonSIMDSine");
  final Float32List nonSimdInput = [1.0, 2.0, 3.0, 4.0];

  // Non SIMD version of the kernel
  Float32List nonSimd (n) {
    var s = 0;
    var x = nonSimdInput[0];
    var y = nonSimdInput[1];
    var z = nonSimdInput[2];
    var w = nonSimdInput[3];
    var rx, ry, rz, rw;
    for (var i = 0; i < n; ++i) {
      rx = sin(x);
      ry = sin(y);
      rz = sin(z);
      rw = sin(w);
    }
    return [rx, ry, rz, rw];
  }

  void run() {
    nonSimd(1000);
  }
}

class SIMDSineBenchmark extends BenchmarkBase {
  const SIMDSineBenchmark() : super("SIMDSine");
  final Float32x4 simdInput = new Float32x4(1.0, 2.0, 3.0, 4.0);

  final Int32x4 _ps_sign_mask     =
      new Int32x4(0x80000000, 0x80000000, 0x80000000, 0x80000000);
  final Int32x4 _ps_inv_sign_mask =
      new Int32x4(0x7FFFFFFF, 0x7FFFFFFF, 0x7FFFFFFF, 0x7FFFFFFF);
  final Float32x4 _ps_cephes_FOPI = new Float32x4.splat(1.27323954473516);
  final Int32x4 _pi32_1           = new Int32x4(1, 1, 1, 1);
  final Int32x4 _pi32_inv1        =
      new Int32x4(0xFFFFFFFE, 0xFFFFFFFE, 0xFFFFFFFE, 0xFFFFFFFE);
  final Int32x4 notmask =
      new Int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF);
  final Int32x4 _pi32_4           = new Int32x4(4, 4, 4, 4);
  final Int32x4 _pi32_2           = new Int32x4(2, 2, 2, 2);
  final Float32x4 _ps_minus_cephes_DP1 = new Float32x4.splat(-0.78515625);
  final Float32x4 _ps_minus_cephes_DP2 = new Float32x4.splat(-2.4187564849853515625E-4);
  final Float32x4 _ps_minus_cephes_DP3 = new Float32x4.splat(-3.77489497744594108E-8);
  final Float32x4 _ps_coscof_p0        = new Float32x4.splat(2.443315711809948E-5);
  final Float32x4 _ps_coscof_p1        = new Float32x4.splat(-1.388731625493765E-3);
  final Float32x4 _ps_coscof_p2        = new Float32x4.splat(4.166664568298827E-2);
  final Float32x4 _ps_0p5              = new Float32x4.splat(0.5);
  final Float32x4 _ps_1                = new Float32x4.splat(1.0);
  final Float32x4 _ps_sincof_p0        = new Float32x4.splat(-1.9515295891E-4);
  final Float32x4 _ps_sincof_p1        = new Float32x4.splat(8.3321608736E-3);
  final Float32x4 _ps_sincof_p2        = new Float32x4.splat(-1.6666654611E-1);

  Float32x4 sinx4 (Float32x4 x) {
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
    x = new Float32x4.fromInt32x4Bits(
        new Int32x4.fromFloat32x4Bits(x) & _ps_inv_sign_mask);
    sign_bit = new Float32x4.fromInt32x4Bits(
        new Int32x4.fromFloat32x4Bits(sign_bit) & _ps_sign_mask);
    y        = x * _ps_cephes_FOPI;
    //printFloat32x4 ("Probe 6", y);
    emm2     = new Int32x4(y.x.toInt(), y.y.toInt(), y.z.toInt(), y.w.toInt());
    emm2     = emm2 + _pi32_1;
    emm2     = emm2 & _pi32_inv1;
    //printInt32x4 ("Probe 8", emm2);
    y        = new Float32x4(emm2.x.toDouble(), emm2.y.toDouble(),
                             emm2.z.toDouble(), emm2.w.toDouble());
    //printFloat32x4 ("Probe 7", y);
    emm0     = emm2 & _pi32_4;
    emm0     = new Int32x4(emm0.x << 29, emm0.y << 29,
                           emm0.z << 29, emm0.w << 29);

    emm2     = emm2 & _pi32_2;
    emm2 = (new Float32x4.fromInt32x4Bits(emm2)).equal(new Float32x4.zero());

    swap_sign_bit = new Float32x4.fromInt32x4Bits(emm0);
    poly_mask = new Float32x4.fromInt32x4Bits(emm2);
    sign_bit = new Float32x4.fromInt32x4Bits(
        (new Int32x4.fromFloat32x4Bits(sign_bit) ^
        (new Int32x4.fromFloat32x4Bits(swap_sign_bit))));

    //printFloat32x4 ("Probe 1", sign_bit);

    //printFloat32x4 ("Probe 4", y);
    //printFloat32x4 ("Probe 5", _ps_minus_cephes_DP1);
    xmm1 = y * _ps_minus_cephes_DP1;
    //printFloat32x4 ("Probe 3", xmm1);
    xmm2 = y * _ps_minus_cephes_DP2;
    xmm3 = y * _ps_minus_cephes_DP3;
    x    = x + xmm1;
    x    = x + xmm2;
    x    = x + xmm3;
    //printFloat32x4 ("Probe 2", x);

    y    = _ps_coscof_p0;
    z    = x * x;
    y    = y * z;
    y    = y * _ps_coscof_p1;
    y    = y * z;
    y    = y + _ps_coscof_p2;
    y    = y * z;
    y    = y * z;
    tmp  = z * _ps_0p5;
    y    = y - tmp;
    y    = y + _ps_1;

    y2   = _ps_sincof_p0;
    //printFloat32x4 ("Probe 11", y2);
    //printFloat32x4 ("Probe 12", z);
    y2   = y2 * z;
    y2   = y2 + _ps_sincof_p1;
    //printFloat32x4 ("Probe 13", y2);
    y2   = y2 * z;
    y2   = y2 + _ps_sincof_p2;
    y2   = y2 * z;
    y2   = y2 * x;
    y2   = y2 + x;

    //xmm3 = poly_mask;
    Int32x4 xmm3_bits = new Int32x4.fromFloat32x4Bits(poly_mask);
    y2   = new Float32x4.fromInt32x4Bits(xmm3_bits &
        (new Int32x4.fromFloat32x4Bits(y2)));
    //printFloat32x4 ("Probe 10", y2);
    y    = new Float32x4.fromInt32x4Bits(
             (xmm3_bits ^ notmask) &
             (new Int32x4.fromFloat32x4Bits(y)));
    y    = y + y2;

    //printFloat32x4 ("Probe 9", y);
    y    = new Float32x4.fromInt32x4Bits(
        (new Int32x4.fromFloat32x4Bits(y)) ^
        (new Int32x4.fromFloat32x4Bits(sign_bit)));
    return y;
  }

  // SIMD version of the kernel
  Float32List simd (n) {
    var result ;
    for (var i = 0; i < n; ++i) {
      result = sinx4 (simdInput);
    }
    return [result.x, result.y, result.z, result.w];
  }

  void run() {
    simd(1000);
  }
}

class SineBenchmark {
  static Object create() {
    return new BenchmarkContrast("Sine",
                                 new NonSIMDSineBenchmark(),
                                 new SIMDSineBenchmark());
  }
}
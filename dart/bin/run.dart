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

import 'averageFloat32.dart';
import 'averageFloat64.dart';
import 'mandelbrot.dart';
import 'matrix_multiply.dart';
import 'vector_transform.dart';

main() {
  var Benchmarks = [];

  Benchmarks.add(AverageFloat32Benchmark.create());
  Benchmarks.add(AverageFloat64Benchmark.create());
  Benchmarks.add(MandelbrotBenchmark.create());
  Benchmarks.add(MatrixMultiplyBenchmark.create());
  Benchmarks.add(VectorTransformBenchmark.create());

  var max_name_length = 0;
  for (var i = 0; i < Benchmarks.length; i++) {
    if (Benchmarks[i].name.length > max_name_length) {
      max_name_length = Benchmarks[i].name.length;
    }
  }

  for (var i = 0; i < Benchmarks.length; i++) {
    String name = Benchmarks[i].name;
    double non_simd_us = Benchmarks[i].NonSIMDBench.measure();
    double simd_us = Benchmarks[i].SIMDBench.measure();
    double speedup = non_simd_us / simd_us;
    String spaces = '';
    int paddings = max_name_length - name.length;
    for (int i = 0; i < paddings; i++) spaces += ' ';
    print("$name$spaces : Non-SIMD($non_simd_us) SIMD($simd_us) Speedup($speedup)");
  }
}

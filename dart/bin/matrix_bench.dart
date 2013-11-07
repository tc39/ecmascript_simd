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

class MatrixMultiplyBenchmark extends BenchmarkBase {
  const MatrixMultiplyBenchmark() : super("MatrixMultiply");
  final Float32List A = new Float32List(16);
  final Float32List B = new Float32List(16);
  final Float32List C = new Float32List(16);

  static void main() {
    new MatrixMultiplyBenchmark().report();
  }

  void run() {
    for (int i = 0; i < 200; i++) {
      Matrix44Operations.multiply(C, 0, A, 0, B, 0);
    }
  }
}

class SIMDMatrixMultiplyBenchmark extends BenchmarkBase {
  const SIMDMatrixMultiplyBenchmark() : super("SIMDMatrixMultiply");
  final Float32x4List A = new Float32x4List(4);
  final Float32x4List B = new Float32x4List(4);
  final Float32x4List C = new Float32x4List(4);

  static void main() {
    new SIMDMatrixMultiplyBenchmark().report();
  }

  void run() {
    for (int i = 0; i < 200; i++) {
      Matrix44SIMDOperations.multiply(C, 0, A, 0, B, 0);
    }
  }
}

class VectorTransformBenchmark extends BenchmarkBase {
  const VectorTransformBenchmark() : super("VectorTransform");
  final Float32List A = new Float32List(16);
  final Float32List B = new Float32List(4);
  final Float32List C = new Float32List(4);

  static void main() {
    new VectorTransformBenchmark().report();
  }

  void run() {
    for (int i = 0; i < 200; i++) {
      Matrix44Operations.transform4(C, 0, A, 0, B, 0);
    }
  }
}

class SIMDVectorTransformBenchmark extends BenchmarkBase {
  const SIMDVectorTransformBenchmark() : super("SIMDVectorTransform");
  final Float32x4List A = new Float32x4List(4);
  final Float32x4List B = new Float32x4List(1);
  final Float32x4List C = new Float32x4List(1);

  static void main() {
    new SIMDVectorTransformBenchmark().report();
  }

  void run() {
    for (int i = 0; i < 200; i++) {
      Matrix44SIMDOperations.transform4(C, 0, A, 0, B, 0);
    }
  }
}

main() {
  MatrixMultiplyBenchmark.main();
  SIMDMatrixMultiplyBenchmark.main();
  VectorTransformBenchmark.main();
  SIMDVectorTransformBenchmark.main();
}

// Transpose a 4x4 matrix
// Author: Peter Jensen
(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "Transpose4x4",
    kernelInit:       init,
    kernelCleanup:    cleanup,
    kernelSimd:       simdTransposeN,
    kernelNonSimd:    transposeN,
    kernelIterations: 100000000
  };

  // Hook up to the harness
  benchmarks.add (new Benchmark (kernelConfig));

  // Global object allocations

  var src    = new Float32Array(16);
  var srcx4  = new Float32x4Array(src.buffer);
  var dst    = new Float32Array(16);
  var dstx4  = new Float32x4Array(dst.buffer);
  var tsrc   = new Float32Array(16);
  var tsrcx4 = new Float32x4Array(tsrc.buffer);

  var sel_ttff = uint32x4.bool(true, true, false, false);

  function initMatrix(matrix, matrixTransposed) {
    for (var r = 0; r < 4; ++r) {
      var r4 = 4*r;
      for (var c = 0; c < 4; ++c) {
        matrix[r4 + c]            = r4 + c;
        matrixTransposed[r + c*4] = r4 + c;
      }
    }
  }

  function printMatrix(matrix) {
    for (var r = 0; r < 4; ++r) {
      var str = "";
      var ri = r*4;
      for (var c = 0; c < 4; ++c) {
        var value = matrix[ri + c];
        str += " " + value.toFixed(2);
      }
      print(str);
    }
  }

  function compareEqualMatrix(m1, m2) {
    for (var i = 0; i < 16; ++i) {
      if (m1[i] !== m2[i]) {
        return false;
      }
    }
    return true;
  }
      
  // Kernel Initializer
  function init () {
    initMatrix(src, tsrc);
    transposeN(1);
    if (!compareEqualMatrix (tsrc, dst)) {
      return false;
    }

    simdTransposeN(1);
//    printMatrix(dst);
    if (!compareEqualMatrix (tsrc, dst)) {
      return false;
    }

    return true;
  }

  // Kernel Cleanup
  function cleanup () {
    return init();
  }

  // SIMD version of the kernel with SIMD.shuffleMix operation
  function simdTransposeMix() {
    var src0     = srcx4.getAt(0);
    var src1     = srcx4.getAt(1);
    var src2     = srcx4.getAt(2);
    var src3     = srcx4.getAt(3);
    var dst0;
    var dst1;
    var dst2;
    var dst3;
    var tmp01;
    var tmp23;

    tmp01 = SIMD.shuffleMix(src0, src1, SIMD.XYXY);
    tmp23 = SIMD.shuffleMix(src2, src3, SIMD.XYXY);
    dst0  = SIMD.shuffleMix(tmp01, tmp23, SIMD.XZXZ);
    dst1  = SIMD.shuffleMix(tmp01, tmp23, SIMD.YWYW);

    tmp01 = SIMD.shuffleMix(src0, src1, SIMD.ZWZW);
    tmp23 = SIMD.shuffleMix(src2, src3, SIMD.ZWZW);
    dst2  = SIMD.shuffleMix(tmp01, tmp23, SIMD.XZXZ);
    dst3  = SIMD.shuffleMix(tmp01, tmp23, SIMD.YWYW);
    
    dstx4.setAt(0, dst0);
    dstx4.setAt(1, dst1);
    dstx4.setAt(2, dst2);
    dstx4.setAt(3, dst3);
  }

  // SIMD version of the kernel
  function simdTranspose() {
    var src0     = srcx4.getAt(0);
    var src1     = srcx4.getAt(1);
    var src2     = srcx4.getAt(2);
    var src3     = srcx4.getAt(3);
    var tmp01;
    var tmp23;

    tmp01 = SIMD.select(sel_ttff, src0, SIMD.shuffle(src1, SIMD.XXXY));
    tmp23 = SIMD.select(sel_ttff, src2, SIMD.shuffle(src3, SIMD.XXXY));
    dst0  = SIMD.select(sel_ttff, SIMD.shuffle(tmp01, SIMD.XZXX), SIMD.shuffle(tmp23, SIMD.XXXZ));
    dst1  = SIMD.select(sel_ttff, SIMD.shuffle(tmp01, SIMD.YWXX), SIMD.shuffle(tmp23, SIMD.XXYW));

    tmp01 = SIMD.select(sel_ttff, SIMD.shuffle(src0, SIMD.ZWXX), src1);
    tmp23 = SIMD.select(sel_ttff, SIMD.shuffle(src2, SIMD.ZWXX), src3);
    dst2  = SIMD.select(sel_ttff, SIMD.shuffle(tmp01, SIMD.XZXX), SIMD.shuffle(tmp23, SIMD.XXXZ));
    dst3  = SIMD.select(sel_ttff, SIMD.shuffle(tmp01, SIMD.YWXX), SIMD.shuffle(tmp23, SIMD.XXYW));
    
    dstx4.setAt(0, dst0);
    dstx4.setAt(1, dst1);
    dstx4.setAt(2, dst2);
    dstx4.setAt(3, dst3);
  }

  // Non SIMD version of the kernel
  function transpose() {
    dst[0]  = src[0];
    dst[1]  = src[4];
    dst[2]  = src[8];
    dst[3]  = src[12];
    dst[4]  = src[1];
    dst[5]  = src[5];
    dst[6]  = src[9];
    dst[7]  = src[13];
    dst[8]  = src[2];
    dst[9]  = src[6];
    dst[10] = src[10];
    dst[11] = src[14];
    dst[12] = src[3];
    dst[13] = src[7];
    dst[14] = src[11];
    dst[15] = src[15];
  }

  function simdTransposeN(n) {
    for (var i = 0; i < n; ++i) {
      simdTranspose();
//      simdTransposeMix();
    }
  }

  function transposeN(n) {
    for (var i = 0; i < n; ++i) {
      transpose();
    }
  }

} ());

"use strict"

if (typeof SIMD === "undefined") {
  load ('../ecmascript_simd.js');
}
if (typeof Float32x4Array === "undefined") {
  load ('../float32x4array.js');
}
if (typeof Int32x4Array === "undefined") {
  load ('../int32x4array.js');
}

load ('base.js');

// load individual benchmarks
load ('kernel-template.js');
load ('averageFloat32x4.js');
load ('averageFloat64x2.js');
load ('mandelbrot.js');
load ('matrix-multiplication.js');
load ('transform.js');
load ('shiftrows.js');
load ('aobench.js');
load ('transpose4x4.js');
load ('inverse4x4.js');
load ('sinx4.js');

function printResult (str) {
  print (str);
}

function printError (str) {
  print (str);
}

function printScore (str) {
  print (str);
}

benchmarks.runAll ({notifyResult: printResult,
                    notifyError:  printError,
                    notifyScore:  printScore},
                   true);

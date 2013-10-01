// SIMD Kernel Benchmark Harness
// Author: Peter Jensen

function Benchmark (config) {
  this.config         = config;
  this.ok             = true;
}

function Benchmarks () {
  this.benchmarks = [];
}

Benchmarks.prototype.add = function (benchmark) {
  this.benchmarks.push (benchmark);
  return this.benchmarks.length - 1;
}

Benchmarks.prototype.runOne = function (benchmark) {
  var start, stop;
  if (!benchmark.config.kernelInit ()) {
    benchmark.ok = false;
    return false;
  }
  start = Date.now ();
  benchmark.config.kernelSimd (benchmark.config.kernelIterations);
  stop = Date.now ();
  benchmark.simdTime = stop - start;

  start = Date.now ();
  benchmark.config.kernelNonSimd (benchmark.config.kernelIterations);
  stop = Date.now ();
  benchmark.nonSimdTime = stop - start;

  benchmark.ok = true;
  return true;
}

Benchmarks.prototype.report = function (benchmark, outputFunctions) {

  function fillRight (str, width) {
    while (str.length < width) {
      str += " ";
    }
    return str;
  }

  function fillLeft (str, width) {
    while (str.length < width) {
      str = " " + str;
    }
    return str;
  }

  if (!benchmark.ok) {
    outputFunctions.notifyError (fillRight (benchmark.config.kernelName + ": ", 20) + "FAIL");
    return;
  }
  var ratio = benchmark.nonSimdTime/benchmark.simdTime;
  outputFunctions.notifyResult (fillRight (benchmark.config.kernelName + ": ", 20) +
         "SIMD(" + fillLeft (benchmark.simdTime + "ms)", 8) +
         ", Non-SIMD(" + fillLeft (benchmark.nonSimdTime + "ms)", 8) +
         ", Speedup(" + ratio.toFixed(3) + ")");
}  

Benchmarks.prototype.runAll = function (outputFunctions) {
  for (var i = 0, n = this.benchmarks.length; i < n; ++i) {
    var benchmark = this.benchmarks [i];
    this.runOne (benchmark);
    this.report (benchmark, outputFunctions);
  }
}

var benchmarks = new Benchmarks ();

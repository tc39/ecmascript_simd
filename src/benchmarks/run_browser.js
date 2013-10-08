function printResult(str) {
  console.log(str);
}

function printError(str) {
  console.log(str);
}

function printScore(str) {
  console.log(str);
}

window.onload = function() {
  console.log('Running benchmarks.');
  benchmarks.runAll({notifyResult: printResult,
                     notifyError:  printError,
                     notifyScore:  printScore}, true);
  console.log('Benchmarks completed.');
}
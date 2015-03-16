// This is a simple script for running the tests from a standalone JS shell.

load("ecmascript_simd.js");

var currentName = '';
var anyFailures = false;

function fail(str)
{
  var e = Error(str);
  console.log(e.toString());
  console.log(e.stack);
  anyFailures = true;
}

function test(name, func) {
  currentName = name;
  try {
    func();
  } catch (e) {
    fail('exception thrown from ' + currentName);
  }
}

function equal(a, b) {
  if (a == b)
    return;
  fail('equal(' + a + ', ' + b + ') failed in ' + currentName);
}

function notEqual(a, b) {
  if (a != b)
    return;
  fail('notEqual(' + a + ', ' + b + ') failed in ' + currentName);
}

function throws(func) {
  var pass = false;
  try {
    func();
  } catch (e) {
    pass = true;
  }
  if (!pass)
    fail('throws failed in ' + currentName);
}

function ok(x) {
  if (!x)
    fail('not ok in ' + currentName);
}

load("ecmascript_simd_tests.js");

if (anyFailures)
    quit(1);

var test = require('tape');
var clipPolygon = require('../clip');

var subject = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
  [0, 0]
];

var clip = [
  [90, 90],
  [110, 90],
  [110, 110],
  [90, 110],
  [90, 9]
];

var clip2 = [
  [85, 95],
  [95, 95],
  [95, 105],
  [85, 10]
];

test('diff polys and return the remainder of the subject', function(t) {
  var difference = clipPolygon(subject, clip, 'difference')[0];

  console.log(difference)

  t.deepEqual(difference[0], [100, 90]);
  t.deepEqual(difference[1], [100, 0]);
  t.deepEqual(difference[2], [0, 0]);
  t.deepEqual(difference[3], [0, 100]);
  t.deepEqual(difference[4], [90, 100]);
  t.deepEqual(difference[5], [90, 90]);
  t.end();
});

test('return the union of `subject` and `clip`', function(t) {
  var union = clipPolygon(subject, clip, 'union')[0];
  t.deepEqual(union[0], [100, 90]);
  t.deepEqual(union[1], [100, 100]);
  t.deepEqual(union[2], [90, 100]);
  t.deepEqual(union[3], [90, 90]);
  t.end();
});

test('return the union of `subject` and `clip2`', function(t) {
  var union2 = clipPolygon(subject, clip2, 'union')[0];
  t.deepEqual(union2[0], [95, 100]);
  t.deepEqual(union2[1], [85, 100]);
  t.deepEqual(union2[2], [85, 95]);
  t.deepEqual(union2[3], [95, 95]);
  t.end();
});

test('return the union of `clip` and `clip2`', function(t) {
  var union3 = clipPolygon(clip2, 'union')[0];
  t.deepEqual(union3[0], [90, 105]);
  t.deepEqual(union3[1], [90, 95]);
  t.deepEqual(union3[2], [95, 95]);
  t.deepEqual(union3[3], [95, 105]);
  t.end();
});

test('reuse polygons', function(t) {
  var union = clipPolygon(subject, clip, 'union')[0];
  var union2 = union.clip(clip2, 'union')[0];
  t.deepEqual(union2[0], [95, 100]);
  t.deepEqual(union2[1], [90, 100]);
  t.deepEqual(union2[2], [90, 95]);
  t.deepEqual(union2[3], [95, 95]);
  t.end();
});

QUnit.test("s.arr.js Unit test", function (assert) {

  var testArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    a, b, c,
    lastIndex,
    counter = 0,
    tmp;

  var bigArray = [];
  for (var i = 0; i <= 1000000; i++) {
    bigArray.push(i);
  }

  //each
  s.each(testArray, function (val, i) {
    if (val === 'a')
      a = testArray[i];
    else if (val === 'b')
      b = testArray[i];
    else if (val === 'c')
      c = testArray[i];

  });


  s.each(bigArray, function (val, i) {
    lastIndex = i;
  });

  var lastValue;
  s.each(testArray, function (val, i) {
    lastValue = val;
    return false;
  });

  assert.equal(a, testArray[0], '1. array value is a');
  assert.equal(b, testArray[1], '2. array value is b');
  assert.equal(c, testArray[2], '3 array value is c!');
  assert.equal(lastValue, 'a', 'break (return false) is working.');
  assert.equal(lastIndex, 1000000, 'last index is a million');


  //iterate
  s.iterate(1000000, function (i) {
    counter++;
  });
  assert.equal(lastIndex, 1000000, "counter is a million");

  s.iterate(1000000, function (i) {
    tmp = i;
    if (i === 3) return false;
  });
  assert.equal(tmp, 3, "return false in iteration is working");


  //remove
  assert.deepEqual(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c'), ['a', 'b', 'd'], "all c occurances are removed from array");
  assert.deepEqual(s.remove([1, 2, 2, 3, 4], 2), [1, 3, 4], "all 2 are removed from array");
  assert.deepEqual(s.remove([1, 2, '2', 3, 4], 2), [1, '2', 3, 4], "string two is not removed from array");
  assert.deepEqual(s.remove([1, 2, 3], 5), [1, 2, 3], "there is nop value in array to be removed array is intacted.");


  assert.deepEqual(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', 1), ['a', 'b', 'c', 'd', 'c'], "first c is removed from array");
  assert.deepEqual(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', 2), ['a', 'b', 'd', 'c'], "first 2 c are removed from array");
  assert.deepEqual(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', -1), ['c', 'a', 'b', 'c', 'd'], "last c is removed from array");
  assert.deepEqual(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', -2), ['c', 'a', 'b', 'd'], "last 2 c are removed from array");

  var exceptionIsThrown = false;
  try {
    assert.deepEqual(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', 10.1), ['a', 'b', 'd'], "all c are removed from array");
  } catch (e) {
    exceptionIsThrown = true;
  }
  assert.equal(exceptionIsThrown, true, "exception was trowed as expected");


  //shuffle
  var beforeShuffle = testArray.join();
  s.shuffle(testArray);
  var afterShuffle = testArray.join();

  assert.equal(beforeShuffle.length, afterShuffle.length, "shuffled array is the same size as startArray");
  assert.notEqual(beforeShuffle, afterShuffle, "shuffled array is not same as test array ");
  assert.notEqual(testArray.indexOf("a"), -1, "shuffled array has a in it");
  assert.notEqual(testArray.indexOf("b"), -1, "shuffled array has b in it");
  assert.notEqual(testArray.indexOf("c"), -1, "shuffled array has c in it");


  //getFilledArray
  assert.deepEqual(s.getFilledArray(0, 3), [0, 0, 0], "array is filed with 0");
  assert.deepEqual(s.getFilledArray("b", 4), ["b", "b", "b", "b"], "array is filed with b");
  assert.deepEqual(s.getFilledArray({ a: "b" }, 2), [{ a: "b" }, { a: "b" }], "array is filed with {a:b}");
  assert.deepEqual(s.getFilledArray(null, 2), [null, null], "array is filed with null");

  //unique
  assert.deepEqual(s.unique([1, 1, 2, 3, 2, 1, 3]), [1, 2, 3], "[1,2,3 is unique]");
  assert.deepEqual(s.unique(["a", "b", "a"]), ["a", "b"], '["a","b"] is unique');

});

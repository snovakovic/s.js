describe('s.array', function() {
  var testArray;
  var testObjArray;
  var a;
  var b;
  var c;
  var lastIndex;
  var lastValue;
  var counter;
  var tmp;
  var bigArray;


  beforeEach(function() {
    testArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    testObjArray = [
      {
        id: 1,
        name: 'first'
      }, {
        id: 2,
        name: 'second'
      }, {
        id: 3,
        name: 'third'
      }
    ];

    counter = 0;
    a = b = c = lastIndex = lastValue = null;
    bigArray = [];
    for (var i = 0; i <= 1000000; i++) {
      bigArray.push(i);
    }
  });

  describe('each', function() {

    it('should loop correctly', function() {
      s.each(testArray, function(val, i) {
        if (val === 'a') {
          a = testArray[i];
        } else if (val === 'b') {
          b = testArray[i];
        } else if (val === 'c') {
          c = testArray[i];
        }

      });

      s.each(bigArray, function(val, i) {
        lastIndex = i;
      });

      s.each(testArray, function(val) {
        lastValue = val;
        return false;
      });

      expect(a).toEqual(testArray[0]);
      expect(b).toEqual(b, testArray[1]);
      expect(c).toEqual(c, testArray[2]);
      expect(lastValue).toEqual('a');
      expect(lastIndex).toEqual(bigArray.length - 1);
    });

  });

  describe('iterate', function() {

    it('should iterate correctly', function() {
      s.iterate(1000000, function() {
        counter++;
      });
      expect(counter).toEqual(1000000);

      s.iterate(1000000, function(i) {
        tmp = i;
        if (i === 3) {
          return false;
        }
      });
      expect(tmp).toEqual(3);
    });

  });

  describe('remove', function() {
    it('should remove items correctly', function() {
      expect(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c')).toEqual(['a', 'b', 'd']);
      expect(s.remove([1, 2, 2, 3, 4], 2)).toEqual([1, 3, 4]);
      expect(s.remove([1, 2, '2', 3, 4], 2)).toEqual([1, '2', 3, 4]);
      expect(s.remove([1, 2, 3], 5)).toEqual([1, 2, 3]);

      expect(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', 1)).toEqual(['a', 'b', 'c', 'd', 'c']);
      expect(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', 2)).toEqual(['a', 'b', 'd', 'c']);
      expect(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', -1)).toEqual(['c', 'a', 'b', 'c', 'd']);
      expect(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', -2)).toEqual(['c', 'a', 'b', 'd']);

      expect(function() {
        s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', 10.1);
      }).toThrow(new Error('Invalid argument exception'));

    });
  });

  describe('shuffle', function() {
    it('should shuffle array', function() {
      var beforeShuffle = testArray.join();
      s.shuffle(testArray);
      var afterShuffle = testArray.join();

      expect(beforeShuffle.length).toEqual(afterShuffle.length);
      //in reare cases this could fail
      expect(beforeShuffle).not.toEqual(afterShuffle);
      expect(testArray.indexOf('a')).not.toEqual(-1);
      expect(testArray.indexOf('b')).not.toEqual(-1);
      expect(testArray.indexOf('c')).not.toEqual(-1);
    });
  });

  describe('getFilledArray', function() {
    it('should returned filled array', function() {
      expect(s.getFilledArray(0, 3)).toEqual([0, 0, 0]);
      expect(s.getFilledArray('b', 4)).toEqual(['b', 'b', 'b', 'b']);
      expect(s.getFilledArray({ a: 'b' }, 2)).toEqual([{ a: 'b' }, { a: 'b' }]);
      expect(s.getFilledArray(null, 2)).toEqual([null, null]);
    });
  });

  describe('unique', function() {
    it('should return unique values', function() {
      expect(s.unique([1, 1, 2, 3, 2, 1, 3])).toEqual([1, 2, 3]);
      expect(s.unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });
  });

  describe('first', function() {
    it('should return first array value', function() {
      expect(s.first(testArray)).toEqual('a');
      expect(s.first(testObjArray)).toEqual(testObjArray[0]);
      expect(s.first(undefined)).toEqual(undefined);

      expect(s.first(testArray, function(letter) {
        return letter === 'c';
      })).toEqual('c');

      expect(s.first(testObjArray, function(obj) {
        return obj.id === 2;
      })).toEqual(testObjArray[1]);
    });
  });

  describe('last', function() {
    it('should return last array value', function() {
      expect(s.last(testArray)).toEqual('h');
      expect(s.last(testObjArray)).toEqual(testObjArray[testObjArray.length - 1]);
      expect(s.last(undefined)).toEqual(undefined);

      expect(s.last(testArray, function(letter) {
        return letter === 'c';
      })).toEqual('c');

      expect(s.last(testObjArray, function(obj) {
        return obj.id === 3;
      })).toEqual(testObjArray[2]);
    });
  });


  describe('stack', function() {
    it('should operate with stack correctly', function() {
      var stack = s.stack();
      stack.add(2);         // stack is now [2]
      stack.add(5);         // stack is now [2, 5]
      expect(stack.array).toEqual([2, 5]);
      var i = stack.remove(); // stack is now [2]
      expect(i).toEqual(5);
      expect(stack.array).toEqual([2]);
      i = stack.remove();
      expect(i).toEqual(2);
      expect(stack.array).toEqual([]);
      i = stack.remove();
      expect(i).toEqual(null);
      i = stack.remove();
      expect(i).toEqual(null);
      expect(stack.array).toEqual([]);
    });

    it('should operate with default stack correctly', function() {
      var stack = s.stack([1, 2, 3]);
      stack.add(2);
      expect(stack.array).toEqual([1, 2, 3, 2]);
      expect(stack.length()).toEqual(4);
      expect(stack.peek()).toEqual(2);
      expect(stack.length()).toEqual(4);
      expect(stack.remove()).toEqual(2);
      expect(stack.length()).toEqual(3);
      expect(stack.remove()).toEqual(3);
    });

    it('stack arrays should operate independently', function() {
      var stack1 = s.stack([1]);
      var stack2 = s.stack();
      var stack3 = s.stack();

      stack1.add(5);
      stack2.add(6);
      stack3.add(7);
      stack3.add(8);

      expect(stack1.array).toEqual([1, 5]);
      expect(stack2.array).toEqual([6]);
      expect(stack3.array).toEqual([7, 8]);
    });

    it('add multiple values should work as expected', function() {
      var stack = s.stack([1]);
      stack.add(2);
      stack.add([3, 4]);
      expect(stack.array).toEqual([1, 2, 3, 4]);
      expect(stack.peek()).toEqual(4);
    });

    it('readme example should be correct', function() {
      var stack = s.stack();
      stack.add(2);
      stack.add(3);
      expect(stack.length()).toEqual(2);
      expect(stack.array).toEqual([2, 3]);
      expect(stack.peek()).toEqual(3);
      var val = stack.remove();
      expect(val).toEqual(3);
      expect(stack.length()).toEqual(1);
      expect(stack.array).toEqual([2]);

      var stack2 = s.stack();
      expect(stack2.remove()).toEqual(null);
      expect(stack2.array).toEqual([]);

      var stack3 = s.stack([1, 2]);
      stack3.add([3, 4]);
      expect(stack3.array).toEqual([1, 2, 3, 4]);
      expect(stack3.remove()).toEqual(4);
      expect(stack3.remove()).toEqual(3);
      expect(stack3.array).toEqual([1, 2]);
    });
  });


  describe('queue', function() {
    it('should operate with queue correctly', function() {
      var queue = s.queue();
      queue.add(2);         // queue is now [2]
      queue.add(5);         // queue is now [2, 5]
      expect(queue.array).toEqual([2, 5]);
      var i = queue.remove(); // queue is now [5]
      expect(i).toEqual(2);
      expect(queue.array).toEqual([5]);
      i = queue.remove();
      expect(i).toEqual(5);
      expect(queue.array).toEqual([]);
      i = queue.remove();
      expect(i).toEqual(null);
      i = queue.remove();
      expect(i).toEqual(null);
      expect(queue.array).toEqual([]);
    });

    it('should operate with default queue correctly', function() {
      var queue = s.queue([1, 2, 3]);
      queue.add(2);
      expect(queue.array).toEqual([1, 2, 3, 2]);
      expect(queue.length()).toEqual(4);
      expect(queue.peek()).toEqual(1);
      expect(queue.length()).toEqual(4);
      expect(queue.remove()).toEqual(1);
      expect(queue.length()).toEqual(3);
      expect(queue.peek()).toEqual(2);
      expect(queue.remove()).toEqual(2);
    });

    it('queue arrays should operate independently', function() {
      var queue1 = s.queue([1]);
      var queue2 = s.queue();
      var queue3 = s.queue();

      queue1.add(5);
      queue2.add(6);
      queue3.add(7);
      queue3.add(8);

      expect(queue1.array).toEqual([1, 5]);
      expect(queue2.array).toEqual([6]);
      expect(queue3.array).toEqual([7, 8]);
    });

    it('add multiple values should work as expected', function() {
      var queue = s.queue([1]);
      queue.add(2);
      queue.add([3, 4]);
      expect(queue.array).toEqual([1, 2, 3, 4]);
      expect(queue.peek()).toEqual(1);
    });

    it('readme example should be correct', function() {
      var queue = s.queue();
      queue.add(2);
      queue.add(3);
      expect(queue.length()).toEqual(2);
      expect(queue.array).toEqual([2, 3]);
      expect(queue.peek()).toEqual(2);
      var val = queue.remove();
      expect(val).toEqual(2);
      expect(queue.length()).toEqual(1);
      expect(queue.array).toEqual([3]);

      var queue2 = s.queue();
      expect(queue2.remove()).toEqual(null);
      expect(queue2.array).toEqual([]);

      var queue3 = s.queue([1, 2]);
      queue3.add([3, 4]);
      expect(queue3.array).toEqual([1, 2, 3, 4]);
      expect(queue3.remove()).toEqual(1);
      expect(queue3.remove()).toEqual(2);
      expect(queue3.array).toEqual([3, 4]);
    });
  });



});

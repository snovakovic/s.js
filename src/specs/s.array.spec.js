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

  fdescribe('first', function() {
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

});

describe('s.array', function() {
  var obj1;
  var obj2;
  var obj3;

  beforeEach(function() {
    obj1 = {
      prop1: 'obj1 prop1',
      prop2: 'obj1 prop2',
      obj: { a: 'a1', b: 'b1' },
      arr: [3, 3, 3],
      upd: [
        { prop1: 2, prop2: 3 },
        { prop1: 4, prop2: 8 }
      ]
    };
    obj2 = {
      prop1: 'obj2 prop1',
      prop3: 'obj2 prop3',
      obj: { a: 'a2' },
      arr: 1,
      upd: [{ prop1: 4 }]
    };
    obj3 = {
      prop3: 'obj3 prop3',
      prop5: 3
    };
  });

  describe('getProperties', function() {

    it('should get properties of object', function() {
      var testString1 = '';
      var testString2 = '';

      var testObj = {
        prop1: 'val1',
        prop2: 'val2'
      };

      s.getProperties(testObj, function(key, value) {
        testString1 += key + value;
      });

      s.getProperties(testObj, function(key, value) {
        testString2 += key + value;
        if (key === 'prop1') {
          return false;
        }
      });

      expect(testString1).toEqual('prop1val1prop2val2');
      expect(testString2).toEqual('prop1val1');
    });

  });

  describe('merge', function() {

    it('should merge objects', function() {
      var mergedObject = s.merge(obj1, obj2, obj3);
      var expectedObj = {
        prop1: 'obj2 prop1',
        prop2: 'obj1 prop2',
        obj: { a: 'a2' },
        prop3: 'obj3 prop3',
        prop5: 3,
        arr: 1,
        upd: [{ prop1: 4 }]
      };

      expect(mergedObject).toEqual(expectedObj);

    });

    it('should deep merge objects', function() {
      var deepMergeObject = s.deepMerge(obj1, obj2, obj3);

      var deepMergeExpected = {
        prop1: 'obj2 prop1',
        prop2: 'obj1 prop2',
        prop3: 'obj3 prop3',
        prop5: 3,
        obj: {
          a: 'a2',
          b: 'b1'
        },
        arr: 1,
        upd: [{ 'prop1': 4 }]
      };

      expect(deepMergeObject).toEqual(deepMergeExpected);

    });

  });

});

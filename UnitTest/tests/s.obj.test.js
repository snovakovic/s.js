QUnit.test("s.obj.js Unit Test", function (assert) {

    //getProperties
    var testObj = {
        prop1: 'val1',
        prop2: 'val2'
    };
    var testString1 = '';
    s.getProperties(testObj, function (key, value) {
        testString1 += key + value;
    });
    var testString2 = '';

    s.getProperties(testObj, function (key, value) {
        testString2 += key + value;
        if (key === 'prop1')
            return false;
    });

    assert.equal(testString1, 'prop1val1prop2val2', "we have successfully loop over all object properties");
    assert.equal(testString2, 'prop1val1', "we have successfully break the properties loop");


    //merge
    var obj1 = {
        prop1: "obj1 prop1",
        prop2: "obj1 prop2",
        obj: {
            a: 'a1',
            b: 'b1'
        },
        arr: [3, 3, 3],
        upd: [
			{
			    prop1: 2,
			    prop2: 3
			},
			{
			    prop1: 4,
			    prop2: 8,
			}
        ]
    };

    var obj2 = {
        prop1: "obj2 prop1",
        prop3: "obj2 prop3",
        obj: {
            a: 'a2',
        },
        arr: 1,
        upd: [
			{
			    prop1: 4,
			}
        ]
    };


    var obj3 = {
        prop3: "obj3 prop3",
        prop5: 3,
    };


    var mergedObject = s.merge(obj1, obj2, obj3);

    var expectedObj = {
        prop1: "obj2 prop1",
        prop2: "obj1 prop2",
        obj: {
            a: 'a2',
        },
        prop3: "obj3 prop3",
        prop5: 3,
        arr: 1,
        upd: [
			{
			    prop1: 4,
			}
        ]
    }

    assert.deepEqual(mergedObject, expectedObj, "two objects are merged together");


    //Deep Merge
   
    var deepMergeObject = s.deepMerge(obj1, obj2, obj3);

    var deepMergeExpected = {
        prop1: "obj2 prop1",
        prop2: "obj1 prop2",
        prop3: "obj3 prop3",
        prop5: 3,
        obj: {
            a: 'a2',
            b: 'b1'
        },
        arr: 1,
        upd: [
            {
                "prop1": 4
            }
        ]
    }

    assert.deepEqual(deepMergeObject, deepMergeExpected, "deep merge is as expected");

});
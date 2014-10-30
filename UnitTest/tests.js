QUnit.test("s.js String Modification", function (assert) {

	var string1 = "unit";
	var string2 = "test";
	var merge1 = "Hi " + string1 + " you are " + string2;
	var merge2 = s.format("Hi {0} you are {1}", string1, string2);

	//s.replaceAll
	var replacedString = s.replaceAll("this is old value in old string old old", "old", "new");
	assert.equal(replacedString, "this is new value in new string new new", "old values has been replaced with new values.");


	//s.format
	assert.equal(merge1, merge2, "strings are equal.");
	assert.equal(s.format("this is {0} and {0}-{1} {0}", string1, string2), "this is unit and unit-test unit", "strings are equal.");

});


QUnit.test("s.js Array and Object Modification", function (assert) {

	var testArray = ["a", "b", "c", "d", "e", "f", "g", "h"],
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
		if (val === "a")
			a = testArray[i];
		else if (val === "b")
			b = testArray[i];
		else if (val === "c")
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

	assert.equal(a, testArray[0], "1. array value is a");
	assert.equal(b, testArray[1], "2. array value is b");
	assert.equal(c, testArray[2], "3 array value is c!");
	assert.equal(lastValue, "a", "break (return false) is working.");
	assert.equal(lastIndex, 1000000, "last index is a million");


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
	assert.deepEqual(s.remove(['c', 'a', 'b', 'c', 'd', 'c'], 'c', 10), ['a', 'b', 'd'], "all c are removed from array");



	//shuffle
	var beforeShuffle = testArray.join();
	s.shuffle(testArray);
	var afterShuffle = testArray.join();

	assert.equal(beforeShuffle.length, afterShuffle.length, "shuffled array is the same size as startArray");
	assert.notEqual(beforeShuffle, afterShuffle, "shuffled array is not same as test array ");
	assert.notEqual(testArray.indexOf("a"), -1, "shuffled array has a in it");
	assert.notEqual(testArray.indexOf("b"), -1, "shuffled array has b in it");
	assert.notEqual(testArray.indexOf("c"), -1, "shuffled array has c in it");


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

	var mergedObject = s.merge(obj1, obj2);

	var expectedObj = {
		prop1: "obj2 prop1",
		prop2: "obj1 prop2",
		obj: {
			a: 'a2',
		},
		prop3: "obj2 prop3",
		arr: 1,
		upd: [
			{
				prop1: 4,
			}
		]
	}

	//var aa = [1, 2, 4];
	//var bb = [1, 3, 4];
	//var mm = s.merge(aa, bb);

	//assert.deepEqual(mm, [1, 2, 3, 4], "two arrays are merged");
	assert.deepEqual(mergedObject, expectedObj, "two objects are merged together");

});


/**
* s.isDefined method unit test
*/
QUnit.test("s.js test module part unit tests", function (assert) {
	var notDefined,
		obj = {},
		obj1 = { test: "test" },
		arr = [],
		arr1 = ["1"],
		num = 3,
		zero = 0,
		empty = null,
		str = "string",
		emptyString = "",
		spacesOnly = "    ",
		bool = true,
		falseBool = false;

	//isDefined
	assert.equal(s.isDefined(notDefined), false, "notDefined is not defined!");
	assert.equal(s.isDefined(obj), true, "obj is defined!");
	assert.equal(s.isDefined(num), true, "num is defined!");
	assert.equal(s.isDefined(empty), true, "null is defined!");
	assert.equal(s.isDefined(str), true, "string is defined!");
	assert.equal(s.isDefined(emptyString), true, "emptyString is defined!");
	assert.equal(s.isDefined(bool), true, "bool is defined!");

	//hasValue
	assert.equal(s.hasValue(notDefined), false, "notDefined doesn't have value!");
	assert.equal(s.hasValue(obj), false, "empty obj doesn't have value!");
	assert.equal(s.hasValue(obj1), true, "obj1 has value!");
	assert.equal(s.hasValue(arr), false, "empty arr doesn't have value!");
	assert.equal(s.hasValue(arr1), true, "arr1 has value!");
	assert.equal(s.hasValue(num), true, "num have value!");
	assert.equal(s.hasValue(zero), true, "zero have value!");
	assert.equal(s.hasValue(empty), false, "null doesn't have value!");
	assert.equal(s.hasValue(str), true, "string have value!");
	assert.equal(s.hasValue(emptyString), false, "emptyString doesn't have value!");
	assert.equal(s.hasValue(spacesOnly), false, "string with only spaces doesn't have value!");
	assert.equal(s.hasValue(bool), true, "bool have value!");
	assert.equal(s.hasValue(falseBool), true, "false bool have value!");

	//isNumber
	assert.equal(s.isNumber(notDefined), false, "notDefined is not number!");
	assert.equal(s.isNumber(obj), false, "obj is not number!");
	assert.equal(s.isNumber(num), true, "num is number!");
	assert.equal(s.isNumber(empty), false, "null is not number!");
	assert.equal(s.isNumber(str), false, "string is not number!");
	assert.equal(s.isNumber(emptyString), false, "emptyString is not number!");
	assert.equal(s.isNumber(bool), false, "bool is not number!");

	//isString
	assert.equal(s.isString(notDefined), false, "notDefined is not string!");
	assert.equal(s.isString(obj), false, "obj is not string!");
	assert.equal(s.isString(num), false, "num is not string!");
	assert.equal(s.isString(empty), false, "null is not string!");
	assert.equal(s.isString(str), true, "string is string!");
	assert.equal(s.isString(emptyString), true, "emptyString is string!");
	assert.equal(s.isString(bool), false, "bool is not string!");

	//isBoolean
	assert.equal(s.isBoolean(notDefined), false, "notDefined is not boolean!");
	assert.equal(s.isBoolean(obj), false, "obj is not boolean!");
	assert.equal(s.isBoolean(num), false, "num is not boolean!");
	assert.equal(s.isBoolean(empty), false, "null is not boolean!");
	assert.equal(s.isBoolean(str), false, "string is not boolean!");
	assert.equal(s.isBoolean(emptyString), false, "emptyString is not boolean!");
	assert.equal(s.isBoolean(bool), true, "bool is boolean!");

	//isObject
	assert.equal(s.isObject(notDefined), false, "notDefined is not object!");
	assert.equal(s.isObject(obj), true, "obj is object!");
	assert.equal(s.isObject(num), false, "num is not object!");
	assert.equal(s.isObject(empty), false, "null is not object!");
	assert.equal(s.isObject(str), false, "string is not object!");
	assert.equal(s.isObject(emptyString), false, "emptyString is not object!");
	assert.equal(s.isObject(bool), false, "bool is not object!");
	assert.equal(s.isObject(arr), true, "arr is object!");

	//isArray
	assert.equal(s.isArray(notDefined), false, "notDefined is not array!");
	assert.equal(s.isArray(obj), false, "obj is not array!");
	assert.equal(s.isArray(num), false, "num is not array!");
	assert.equal(s.isArray(empty), false, "null is not array!");
	assert.equal(s.isArray(str), false, "string is not array!");
	assert.equal(s.isArray(emptyString), false, "emptyString is not array!");
	assert.equal(s.isArray(bool), false, "bool is not array!");
	assert.equal(s.isArray(arr), true, "arr is array!");


	//is test regex expresion for email
	assert.equal(s.is("stefan.novakovich@gmail.com", /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), true, "reg-ex email is working for true email");
	assert.equal(s.is("stefan.novakovich@gmail", /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), false, "reg-ex email is working for false email");

	//is - alphabetic
	assert.equal(s.is("abc", "Alphabetic"), true, "abc contain only alphabetic characters");
	assert.equal(s.is("a b c", "AlphaBetic"), true, "a b c contain only alphabetic characters spaces are ignored");
	assert.equal(s.is("", "AlphaBetic"), true, "empty string will return true for alphabetic");
	assert.equal(s.is("  ", "alphabetic"), true, "string containing only spaces will return true for alphabetic");
	assert.equal(s.is("asd12", "Alphabetic"), false, "this is not alphabetic as it contains digits");
	assert.equal(s.is("asd.", "Alphabetic"), false, "this is not alphabetic as it contains period");


	//is - alphanumeric
	assert.equal(s.is("abc", "alphanumeric"), true, "abc is alphanumeric");
	assert.equal(s.is("a b c", "alphanumeric"), true, "a b c is alphanumeric");
	assert.equal(s.is("", "alphanumeric"), true, "empty string is alphanumeric");
	assert.equal(s.is("  ", "alphanumeric"), true, "string containing only spaces is alphanumeric");
	assert.equal(s.is("asd12", "alphanumeric"), true, "asd12 is alphanumeric");
	assert.equal(s.is("12345", "alphanumeric"), true, "12345 is alphanumeric");
	assert.equal(s.is("asd.", "alphanumeric"), false, "this is not is alphanumeric as it contains period");

	//is - numeric
	assert.equal(s.is("abc", "numeric"), false, "abc is not numeric");
	assert.equal(s.is("a b c", "numeric"), false, "a b c is numeric");
	assert.equal(s.is("", "numeric"), true, "empty string is numeric");
	assert.equal(s.is("  ", "numeric"), true, "string containing only spaces is numeric");
	assert.equal(s.is("asd12", "numeric"), false, "asd12 is numeric");
	assert.equal(s.is("12345", "numeric"), true, "12345 is numeric");
	assert.equal(s.is("12345.456", "numeric"), false, "12345,45545 is not numeric as it contains .");


	//is - lowercase
	assert.equal(s.is("abc", "lowercase"), true, "abc is lowercase");
	assert.equal(s.is("a b c", "lowercase"), true, "a b c is lowercase");
	assert.equal(s.is("abC", "lowercase"), false, "abC is not lowercase");
	assert.equal(s.is("", "lowercase"), true, "empty string is lowercase");
	assert.equal(s.is("  ", "lowercase"), true, "string containing only spaces is lowercase");
	assert.equal(s.is("asd12", "lowercase"), false, "asd12 is not lowercase");


	//is - uppercase
	assert.equal(s.is("ABC", "uppercase"), true, "ABC is uppercase");
	assert.equal(s.is("A B C", "uppercase"), true, "A B C is uppercase");
	assert.equal(s.is("abC", "uppercase"), false, "abC is not uppercase");
	assert.equal(s.is("", "uppercase"), true, "empty string is uppercase");
	assert.equal(s.is("  ", "uppercase"), true, "string containing only spaces is uppercase");
	assert.equal(s.is("asd12", "uppercase"), false, "asd12 is not uppercase");

	

	//is - email
	assert.equal(s.is(notDefined, "email"), false, "notDefined is not email!");
	assert.equal(s.is(obj, "email"), false, "obj is not email!");
	assert.equal(s.is(num, "email"), false, "num is not email!");
	assert.equal(s.is(empty, "email"), false, "null is not email!");
	assert.equal(s.is(str, "email"), false, "string is not email!");
	assert.equal(s.is(emptyString, "email"), false, "emptyString is not email!");
	assert.equal(s.is(bool, "email"), false, "bool is not email!");
	assert.equal(s.is("stefan.novakovich@gmail.com", "email"), true, "stefan.novakovich@gmail.com is email!");
	assert.equal(s.is("test22@net.hr", "email"), true, "stefan.novakovich@gmail.com is email!");
	assert.equal(s.is("test22@net@hr", "email"), false, "test22@net@hr is not email");
	assert.equal(s.is("test22@net", "email"), false, "test22@net is not email");
	assert.equal(s.is("a@net.bc", "email"), true, "a@net.bc is email");

	//is - strongPassword
	assert.equal(s.is("ABC", "strongPassword"), false, "ABC is not strongPassword");
	assert.equal(s.is("StrongPassword1", "strongPassword"), true, "StrongPassword1 is strongPassword");
	assert.equal(s.is("abC1s", "strongPassword"), false, "abC1s is not strongPassword");
	assert.equal(s.is("", "strongPassword"), false, "empty string is not strongPassword");
	assert.equal(s.is("  ", "strongPassword"), false, "string containing only spaces is not strongPassword");
	assert.equal(s.is("asd12", "strongPassword"), false, "asd12 is not strongPassword");

});



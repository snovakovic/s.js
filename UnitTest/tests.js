/**
* s.isDefined method unit test
*/
QUnit.test( "s.js test module part unit tests", function( assert ) {
	var notDefined,
		obj = {},
		obj1 = {test:"test"},
		arr = [],
		arr1 = ["1"],
		num = 3,
		empty = null,
		string = "string",
		emptyString = "",
		bool = true;

	//isDefined
	assert.equal(s.isDefined(notDefined), false , "notDefined is not defined!" );
	assert.equal(s.isDefined(obj), true , "obj is defined!" );
	assert.equal(s.isDefined(num), true , "num is defined!" );
	assert.equal(s.isDefined(empty), true , "null is defined!" );
	assert.equal(s.isDefined(string), true , "string is defined!" );
	assert.equal(s.isDefined(emptyString), true , "emptyString is defined!" );
	assert.equal(s.isDefined(bool), true , "bool is defined!" );

	//hasValue
	assert.equal(s.hasValue(notDefined), false , "notDefined doesn't have value!" );
	assert.equal(s.hasValue(obj), false , "obj doesn't have value!" );
	assert.equal(s.hasValue(obj1), true , "obj1 has value!" );
	assert.equal(s.hasValue(arr), false , "arr doesn't have value!" );
	assert.equal(s.hasValue(arr1), true , "arr1 has value!" );
	assert.equal(s.hasValue(num), true , "num have value!" );
	assert.equal(s.hasValue(empty), false , "null doesn't have value!" );
	assert.equal(s.hasValue(string), true , "string have value!" );
	assert.equal(s.hasValue(emptyString), false , "emptyString doesn't have value!" );
	assert.equal(s.hasValue(bool), true , "bool have value!" );

	//isNumber
	assert.equal(s.isNumber(notDefined), false , "notDefined is not number!" );
	assert.equal(s.isNumber(obj), false , "obj is not number!" );
	assert.equal(s.isNumber(num), true , "num is number!" );
	assert.equal(s.isNumber(empty), false , "null is not number!" );
	assert.equal(s.isNumber(string), false , "string is not number!" );
	assert.equal(s.isNumber(emptyString), false , "emptyString is not number!" );
	assert.equal(s.isNumber(bool), false , "bool is not number!" );

	//isString
	assert.equal(s.isString(notDefined), false , "notDefined is not string!" );
	assert.equal(s.isString(obj), false , "obj is not string!" );
	assert.equal(s.isString(num), false , "num is not string!" );
	assert.equal(s.isString(empty), false , "null is not string!" );
	assert.equal(s.isString(string), true , "string is string!" );
	assert.equal(s.isString(emptyString), true , "emptyString is string!" );
	assert.equal(s.isString(bool), false , "bool is not string!" );

	//isBoolean
	assert.equal(s.isBoolean(notDefined), false , "notDefined is not boolean!" );
	assert.equal(s.isBoolean(obj), false , "obj is not boolean!" );
	assert.equal(s.isBoolean(num), false , "num is not boolean!" );
	assert.equal(s.isBoolean(empty), false , "null is not boolean!" );
	assert.equal(s.isBoolean(string), false , "string is not boolean!" );
	assert.equal(s.isBoolean(emptyString), false , "emptyString is not boolean!" );
	assert.equal(s.isBoolean(bool), true , "bool is boolean!" );

	//isEmail
	assert.equal(s.isEmail(notDefined), false , "notDefined is not email!" );
	assert.equal(s.isEmail(obj), false , "obj is not email!" );
	assert.equal(s.isEmail(num), false , "num is not email!" );
	assert.equal(s.isEmail(empty), false , "null is not email!" );
	assert.equal(s.isEmail(string), false , "string is not email!" );
	assert.equal(s.isEmail(emptyString), false , "emptyString is not email!" );
	assert.equal(s.isEmail(bool), false , "bool is not email!" );
	assert.equal(s.isEmail("stefan.novakovich@gmail.com"), true , "stefan.novakovich@gmail.com is email!" );
	assert.equal(s.isEmail("test22@net.hr"), true , "stefan.novakovich@gmail.com is email!" );
	assert.equal(s.isEmail("test22@net@hr"), false , "test22@net@hr is not email" );
	assert.equal(s.isEmail("test22@net"), false , "test22@net is not email" );
	assert.equal(s.isEmail("a@net.bc"), true , "a@net.bc is email" );

});


QUnit.test( "s.js Array and objects module part", function( assert ) {

	var testArray = ["a","b","c","d","e","f","g","h"];
	var a,b,c;
	var lastIndex;
	var counter = 0;

	var bigArray = [];
    for (var i = 0; i <= 1000000; i++ ) {
    	bigArray.push(i);
    }

    //each
  	s.each(testArray, function(val, i){
    	if(val === "a")
    		a = testArray[i];
    	else if (val === "b")
    		b = testArray[i];
    	else if (val === "c")
    		c = testArray[i];

	});

  	s.each(bigArray, function(val, i){
    	lastIndex = i;
	});

	assert.equal(a, testArray[0] , "1. array value is a" );
	assert.equal(b, testArray[1] , "2. array value is b" );
	assert.equal(c, testArray[2] , "3 array value is c!" );
	assert.equal(lastIndex, 1000000 , "last index is a million" );


	//iterate
	s.iterate(1000000, function(i){
		counter++;
	});

	assert.equal( lastIndex, 1000000 , "counter is a million" );

	//merge
	var obj1 = {
		prop1: "obj1 prop1",
		prop2: "obj1 prop2"
	};

	var obj2 = {
		prop1 : "obj2 prop1",
		prop3 : "obj2 prop3"
	};

	var mergedObject = s.merge(obj1, obj2);
	
	assert.equal( mergedObject.prop1, "obj2 prop1" , "prop1 is equal to obj2 prop1");
	assert.equal( mergedObject.prop2, "obj1 prop2" , "prop2 is equal to obj1 prop2");
	assert.equal(mergedObject.prop3, "obj2 prop3", "prop3 is equal to obj2 prop3");

	//shuffle
	var beforeShuffle = testArray.join();
	s.shuffle(testArray);
	var afterShuffle = testArray.join();

	assert.equal(beforeShuffle.length, afterShuffle.length, "shuffled array is the same size as startArray");
	assert.notEqual(beforeShuffle, afterShuffle, "shuffled array is not same as test array ");
	assert.notEqual(testArray.indexOf("a"), -1, "shuffled array has a in it");
	assert.notEqual(testArray.indexOf("b"), -1, "shuffled array has b in it");
	assert.notEqual(testArray.indexOf("c"), -1, "shuffled array has c in it");


});

QUnit.test( "s.js modifiers module part tests", function( assert ) {
	var string1 = "unit";
	var string2 = "test";
	var merge1 = "Hi " + string1 + " you are " + string2;
	var merge2 = s.format("Hi {0} you are {1}", string1, string2);
	
	assert.equal( merge1, merge2 , "strings are equal!");

});
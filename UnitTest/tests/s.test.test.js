QUnit.test("s.test Unit Test", function (assert) {
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
    assert.equal(s.isNumber(1.23), true, "1.23 is number!");
    assert.equal(s.isNumber(-1.23), true, "-1.23 is number!");
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
    assert.equal(s.is("a@net.bc nije", "email"), false, "a@net.bc nije is not email");

    //is - strongPassword
    assert.equal(s.is("ABC", "strongPassword"), false, "ABC is not strongPassword");
    assert.equal(s.is("StrongPassword1", "strongPassword"), true, "StrongPassword1 is strongPassword");
    assert.equal(s.is("abC1s", "strongPassword"), false, "abC1s is not strongPassword");
    assert.equal(s.is("", "strongPassword"), false, "empty string is not strongPassword");
    assert.equal(s.is("  ", "strongPassword"), false, "string containing only spaces is not strongPassword");
    assert.equal(s.is("asd12", "strongPassword"), false, "asd12 is not strongPassword");

    //is - ip
    assert.equal(s.is("73.60.124.136", "ip"), true, "this is valid ip address");
    assert.equal(s.is("256.60.124.136", "ip"), false, "this is not valid ip address");

});
QUnit.test("s.string.js Unit Test", function (assert) {

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
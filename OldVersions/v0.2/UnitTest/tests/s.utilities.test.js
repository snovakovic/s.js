QUnit.test("s.utilities.js Unit Test", function (assert) {

    var random = s.random(1, 5);
    var inrange = random >= 1 && random <= 5;

    assert.equal(s.random(1, 1), 1, "random number returns 1");
    assert.equal(inrange, true, "random number is in range");

});
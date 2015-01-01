QUnit.test("s.html.js Unit Test", function (assert) {

    //Insert test html to page
    document.querySelector('body').innerHTML += "<div id='test-span-element' class='class1 class2 class3'></div>";

    var elem = document.querySelector('#test-span-element');

    //haveClass
    assert.equal(s.haveClass(elem, 'class2'), true, "element have class testClass");
    assert.equal(s.haveClass(elem, 'no'), false, "element does not have class invalid class ");
    assert.equal(s.haveClass(elem, 'class1 class3'), true, "element have 2 classes ");
    assert.equal(s.haveClass(elem, 'class1 no'), false, "element don't have one of specified class ");

    //addClass
    s.addClass(elem, 'newClass');
    assert.equal(s.haveClass(elem, 'newClass'), true, "We have added new class to element");

    //removeClass
    s.removeClass(elem, 'class1')
    assert.equal(s.haveClass(elem, 'class1'), false, "we have removed class from element");

    //toggleClass
    s.toggleClass(elem, 'newClass');
    assert.equal(s.haveClass(elem, 'newClass'), false, "toggle have removed class");
    s.toggleClass(elem, 'newClass');
    assert.equal(s.haveClass(elem, 'newClass'), true, "toggle have created class");

    //getHeight
    elem.style.height = '222px'; // Set height
    assert.equal(s.getHeight(elem), 222, "the height of elem is 222px");


});
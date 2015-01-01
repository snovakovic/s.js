QUnit.test("s.html.js Unit Test", function (assert) {

    //Insert test html to page
    document.querySelector('body').innerHTML += "<div id='test-span-element' class='class1 class2 class3'>" +
            "<section id='level1' class='getClosest' demo-attr='demo2'>" +
                "<div id='level2' class='getClosest' demo-attr='demo1'>" +
                    "<div id='startClosestSearch' class='getClosest'><div>" +
                "<div>" +
            "<section>" +
        "</div>";

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
    assert.equal(s.height(elem), 222, "the height of elem is 222px");

    //getClosest
    var startElement = s.first("#startClosestSearch");
    var c1 = s.closest(startElement, ".getClosest");
    var c2 = s.closest(startElement.parentNode, ".getClosest");
    var c3 = s.closest(startElement, "section");
    var c4 = s.closest(startElement, "[demo-attr]");

    assert.equal(c1.id, 'startClosestSearch', "it will include itself");
    assert.equal(c2.id, 'level2', "exclude itself by searching by using parent node");
    assert.equal(c3.id, 'level1', "find by element");
    assert.equal(c4.id, 'level2', "find by attribute");



});
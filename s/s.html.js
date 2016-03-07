'use strict';

/*****************************************************
   HTML modifications module part
 ***************************************************/
(function (s) {

  /**
* Alias for document.querySelectorAll()
* @param selector DOM selector recognizable with document.querySelectorAll
* @example s.all('p'); select all paragraphs in page
*/
  s.all = function (selector) {
    return document.querySelectorAll(selector);
  };

  /**
  * Alias for document.querySelector()
  * @param selector DOM selector recognizable with document.querySelector
  * @example s.first('p'); select first paragraphs in page
  */
  s.first = function (selector) {
    return document.querySelector(selector);
  };

  /**
  * Check if element have specified class
  * We can check for class combination by separating names with spaces "class1 class2"
  * @param elem html element that we are checking
  * @param className name of the class
  * @return bool
  * example s.haveClass(s.first('p'), 'testClass');
  */
  s.haveClass = function (elem, className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i++) {
      if (elem.className.indexOf(classes[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  /**
  * Add class to element
  * @param elem that we are adding the class
  * @param className name of the class
  */
  s.addClass = function (elem, className) {
    if (!s.haveClass(elem, className)) {
      elem.className = elem.className.length === 0 ? className : elem.className + ' ' + className;
    }
  };

  /**
  * Add class to element
  * @param elem that we are adding the class
  * @param className name of the class
  */
  s.removeClass = function (elem, className) {
    elem.className = elem.className.replace(className, '');
  };

  /**
  * Toggle class
  * @param elem that we are toggling class
  * @param className name of the class
  */
  s.toggleClass = function (elem, className) {
    if (s.haveClass(elem, className)) {
      s.removeClass(elem, className);
    }
    else {
      s.addClass(elem, className);
    }
  };

  /**
  * Get and set height. It’s a lot trickier in native JS than it should be, 
  * because there are multiple APIs for getting height, and they all return slightly different measurements. 
  * The getHeight() method provided below returns the largest measurement.
  * @param elem which height we want to get
  * @return height in px
  */
  s.height = function (elem) {
    return Math.max(elem.scrollHeight, elem.offsetHeight, elem.clientHeight);
  };

  /**
  * Get closest DOM element up the tree that contains a class, ID, data attribute, or tag. Includes the element itself. Supported back to IE6.
  * @param elem html element
  * @param selector css selector
  * @return html element that match condition or false
  */
  s.closest = function (elem, selector) {

    var firstChar = selector.charAt(0);

    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {

      // If selector is a class
      if (firstChar === '.') {
        if (s.haveClass(elem, selector.substr(1))) {
          return elem;
        }
      }

      // If selector is an ID
      if (firstChar === '#') {
        if (elem.id === selector.substr(1)) {
          return elem;
        }
      }

      // If selector is a data attribute
      if (firstChar === '[') {
        if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
          return elem;
        }
      }

      // If selector is a tag
      if (elem.tagName.toLowerCase() === selector) {
        return elem;
      }

    }

    return false;

  };

  /**
  * Get all siblings of the selected element
  * @param elem html element
  * @return list of html elements
  */
  s.siblings = function (elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    for (; sibling; sibling = sibling.nextSibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
    }
    return siblings;
  };

})(window.s = window.s || {});

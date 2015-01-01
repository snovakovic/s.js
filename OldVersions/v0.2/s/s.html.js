/*****************************************************
   HTML modifications module part
 ***************************************************/
(function (s, undefined) {

    /**
	* Alias for document.querySelectorAll()
	* @param selector DOM selector recognizable with document.querySelectorAll
	* @example s.all('p'); select all paragraphs in page
	*/
    s.all = function (selector) {
        return document.querySelectorAll(selector);
    }

    /**
    * Alias for document.querySelector()
    * @param selector DOM selector recognizable with document.querySelector
    * @example s.first('p'); select first paragraphs in page
    */
    s.first = function (selector) {
        return document.querySelector(selector);
    }

    /**
    * Check if element have specified class
    * We can check for class combination by separating names with spaces "class1 class2"
    * @param elem html element that we are checking
    * @param className name of the class
    * @return bool
    * example s.haveClass(s.first('p'), 'testClass');
    */
    s.haveClass = function (elem, className) {
        var classes = className.split(" ");
        for (var i = 0; i < classes.length; i++) {
            if (elem.className.indexOf(classes[i]) === -1)
                return false;
        }
        return true;
    }

    /**
    * Add class to element
    * @param elem that we are adding the class
    * @param className name of the class
    */
    s.addClass = function (elem, className) {
        if (!s.haveClass(elem, className))
            elem.className = elem.className.length === 0 ? className : elem.className + ' ' + className;
    }

    /**
    * Add class to element
    * @param elem that we are adding the class
    * @param className name of the class
    */
    s.removeClass = function (elem, className) {
        elem.className = elem.className.replace(className, '');
    }

    /**
    * Toggle class
    * @param elem that we are toggling class
    * @param className name of the class
    */
    s.toggleClass = function (elem, className) {
        if (s.haveClass(elem, className))
            s.removeClass(elem, className);
        else
            s.addClass(elem, className);
    }

    /**
    * Get and set height. It’s a lot trickier in native JS than it should be, 
    * because there are multiple APIs for getting height, and they all return slightly different measurements. 
    * The getHeight() method provided below returns the largest measurement.
    * @param elem which height we want to get
    * @return height in px
    */
    s.getHeight = function (elem) {
        return Math.max(elem.scrollHeight, elem.offsetHeight, elem.clientHeight);
    };


})(window.s = window.s || {});

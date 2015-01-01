/*****************************************************
 		s.js v0.12
 ***************************************************/

/*****************************************************
 		Shared
 ***************************************************/
(function (_s, undefined) {

    _s.exception = {
        invalidArgument: "Invalid argument exception"
    }

})(window.s = window.s || {});


/*****************************************************
 			  String Modification.
 ***************************************************/
(function (_s, undefined) {

    /**
	 * Replace all occurrences in a string with a new value   
	 * @param  str {String} string where occurrences will be replaced
	 * @param find {String} string that we want to replace with new value    
	 * @param replace {String} new string value which will replace old value   
	 * @return {[string]} new string with replaced values
	 * @example console.log(s.replaceAll("this is old value in old string", "old", "new"))
	*/
    _s.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    };

    /**
 	 * String concatenation variation based on .net   
 	 * Don't use in high intensive loops as it is much slower than normal string concatenation         
 	 * @return {[string]} formatted  string
 	 * @example console.log(s.format("Hi {0}, your rank is {1}.", "Foo", 100))
 	 */
    _s.format = function () {
        var str = arguments[0],
			 length = arguments.length - 1;
        for (var i = 0; i < length; i++) {
            str = _s.replaceAll(str, "{" + i + "}", arguments[i + 1]);
        }
        return str;
    };


})(window.s = window.s || {});



/*****************************************************
	  Array and Object Modification
 ***************************************************/

(function (_s, undefined) {

    /**
	 * foreach polyfil
	 */
    _s.each = function (arr, callback) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (callback(arr[i], i) === false)
                break;
        }
    };

    /**
	 * Iterate specific number of times
	 * @param  {Integer}   n  number of iterations
	 * @param  {Function} callback function that will be call per each iteration. use return false to break from iterations
	 * @example s.iterate(10, function(i) { console.log(i); } );
	 */
    _s.iterate = function (l, callback) {
        for (var i = 0 ; i < l; i++) {
            if (callback(i) === false)
                break;
        }
    };

    /**
	 * Remove all occurrences of element from array
	 * @param arr {Array} array from where we want  to remove the values
	 * @param elToRemove {...} element that we want to remove from array
	 * @param max {whole number integer} max number of occurrences to remove. 1 - remove first, -1 remove last.
	  * @return {Array} new array without the removed values
	 * @example s.remove(['a', 'b', 'c', 'd', 'c'], 'c');
	 */
    _s.remove = function (arr, elToRemove, max) {
        var pos;
        if (max && (typeof max !== "number" || max % 1 !== 0))
            throw new Error(s.exception.invalidArgument);

        while (pos !== -1 && max !== 0) {
            if (max) {
                if (max >= 1) {
                    pos = arr.indexOf(elToRemove);
                    max--;
                } else {
                    pos = arr.lastIndexOf(elToRemove);
                    max++;
                }

            } else {
                pos = arr.indexOf(elToRemove);
            }

            pos > -1 && arr.splice(pos, 1);
        }
        return arr;
    };

    /**
	 * Shuffle values in the array
	 * @param arr {Array} input array that we want to shuffle
	 * @return {Array} shuffled array
	 * @example s.shuffle(['a', 'b', 'c', 'd', 'c']);
	 */
    _s.shuffle = function (arr) {
        for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    };


    /**
	 * Get the new array filled with default values
	 * @param val {....} default value that will fill the array
	 * @return len {Integer} size of the new array
	 * @example s.getFilledArray(0, 5);
	 */
    _s.getFilledArray = function (val, len) {
        var rv = new Array(len);
        while (--len >= 0) {
            rv[len] = val;
        }
        return rv;
    };

    /**
	 * Returns new array containing only unique values from original array
	 * Doesn't support nested objects and array
	 */
    _s.unique = function (originalArr) {
        var arr = [];
        for (var i = 0; i < originalArr.length; i++) {
            if (arr.indexOf(originalArr[i]) === -1) {
                arr.push(originalArr[i]);
            }
        }
        return arr;
    }

    /**
	 * Merge properties of the second object to the first object.
	 * In case of the same property value from second object will override the value in the first object
	 * @param  {Object} obj1 properties will be merged in this object
	 * @param  {Object} obj2 object from where we will merge properties
	 * @example s.merge({prop1:1,prop2:2}, {prop1:0,prop3:3});
	*/
    _s.merge = function (obj1, obj2) {
        for (var key in obj2) {
            if (obj2.hasOwnProperty(key))
                obj1[key] = obj2[key];
        }
        return obj1;
    };


})(window.s = window.s || {});



/*****************************************************
	  Test Module part
 ***************************************************/
(function (_s, undefined) {

    /**
	* Check if variable is initialized
	*/
    _s.isDefined = function (testVar) {
        return typeof testVar !== 'undefined';
    };

    /**
	* Test if variable has been defined and is not empty, 
   * Things that are treated as if they don't have value:
   *     1) null
   *     2) not initialized variable
   *     3) empty array
   *     4) empty object
   *     5) empty string
   *     6) string with only spaces
	*/
    _s.hasValue = function (testVar) {
        if (typeof testVar === 'undefined' || testVar === null
			|| (typeof testVar === 'string' && testVar.trim().length === 0)) return false;

        //Array and object only
        if (typeof testVar === 'object') {
            for (var key in testVar) {
                if (hasOwnProperty.call(testVar, key)) return true;
            }
            return false;
        }

        return true;
    };

    /**
	* Check if variable type is string
	*/
    _s.isString = function (testVar) {
        return typeof testVar === 'string';
    };

    /**
	* Check if variable type is number
	*/
    _s.isNumber = function (testVar) {
        return typeof testVar === 'number';
    };

    /**
	* Check if variable type is boolean
	*/
    _s.isBoolean = function (testVar) {
        return typeof testVar === 'boolean';
    };

    /**
	* Check if variable type is object
	* variable type of array is also object
	* type for null returns object, but is object will return false for null
	*/
    _s.isObject = function (testVar) {
        return typeof testVar === 'object' && testVar != null;
    };

    /**
	* Check if variable is array. 
	*/
    _s.isArray = function (testVar) {
        return Array.isArray(testVar);
    };

    /**
	 * Test string using any regular expression or by using any of defined keywords
	 * @param str {string} string that will be tested
	 * @param expr {string|regExpresion} expression can be defined keyword in string format or any regular expression.
	 * @example s.is("test", alphabetic); same as s.is("test", /^[a-zA-Z ]*$/)
	*/
    _s.is = function (str, expr) {
        var re = expr;
        if (typeof str !== 'string') return false;


        //look for keywords
        if (typeof expr === 'string') {
            expr = expr.trim().toLowerCase();

            switch (expr) {
                case "alphabetic":
                    re = /^[a-zA-Z ]*$/;
                    break;
                case "alphanumeric":
                    re = /^[a-zA-Z0-9 ]*$/;
                    break;
                case "numeric":
                    re = /^[0-9 ]*$/;
                    break;
                case "lowercase":
                    re = /^[a-z ]*$/;
                    break;
                case "uppercase":
                    re = /^[A-Z ]*$/;
                    break;
                case "email":
                    re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    break;
                case "strongpassword":
                    re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
                    break;
                case "ip":
                    re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    break;
                default:
                    throw new Error(s.exception.invalidArgument);
            }
        }

        return re.test(str);
    }

})(window.s = window.s || {});


/*****************************************************
   Utilities
 ***************************************************/
(function (_s, undefined) {

    /**
	* Returns random number using Math.random() between 2 numbers
	* @param from {string} min number
	* @param to {string|regExpresion} max number
	* @example s.random(1, 10); get random number between 1 and 10 (1 and 10 are included)
	*/
    _s.random = function (from, to) {
        return Math.floor((Math.random() * to) + from);
    }
    
    /**
	* Alias for document.querySelectorAll()
	* @param selector DOM selector recognizable with document.querySelectorAll
	* @param to {string|regExpresion} max number
	* @example s.select('p'); select all paragraphs in page
	*/
    _s.s = function( selector ) {
        return document.querySelectorAll( selector );
    }

    /**
	* Get the parameter from URL by the name
	* @param key {string} the key for which value will be retrieved
	* @example s.getUrlParameter("firstName"); 
	*/
    _s.getUrlParameter = function (key) {
        var val = RegExp(key + '=' + '(.+?)(&|$)').exec(location.search) || null;
        if (val === null) return null;

        return decodeURI(val[1]);
    }

})(window.s = window.s || {});


/*****************************************************
   HTML modifications module part
 ***************************************************/
(function (_s, undefined) {


    /**
	* Alias for document.querySelectorAll()
	* @param selector DOM selector recognizable with document.querySelectorAll
	* @param to {string|regExpresion} max number
	* @example s.select('p'); select all paragraphs in page
	*/
    _s.s = function (selector) {
        return document.querySelectorAll(selector);
    }

    /**
    * Check if element have specified class
    * We can check for class combination by separating names with spaces "class1 class2"
    * @param elem html element that we are checking
    * @param className name of the class
    * @return bool
    */
    _s.haveClass = function (elem, className) {
        var classes = className.split(" ");
        for (var i = 0; i < classes.length; i++) {
            if(elem.className.indexOf(classes[i]) === -1 )
                return false;
        }
        return true;
    }

    /**
    * Add class to element
    * @param elem that we are adding the class
    * @param className name of the class
    */
    _s.addClass = function (elem, className) {
        if(!_s.haveClass(elem, className))
            elem.className = elem.className.length === 0 ? className : elem.className + ' ' + className;
    }

    /**
    * Add class to element
    * @param elem that we are adding the class
    * @param className name of the class
    */
    _s.removeClass = function (elem, className) {
        elem.className = elem.className.replace(className, '');
    }

    /**
    * Toggle class
    * @param elem that we are toggling class
    * @param className name of the class
    */
    _s.toggleClass = function(elem, className) {
        if(_s.haveClass(elem, className))
            _s.removeClass(elem, className);
        else
            _s.addClass(elem, className);
    }

    /**
    * Get and set height. It’s a lot trickier in native JS than it should be, 
    * because there are multiple APIs for getting height, and they all return slightly different measurements. 
    * The getHeight() method provided below returns the largest measurement.
    * @param elem which height we want to get
    * @return height in px
    */
    _s.getHeight = function (elem) {
        return Math.max(elem.scrollHeight, elem.offsetHeight, elem.clientHeight);
    };


})(window.s = window.s || {});




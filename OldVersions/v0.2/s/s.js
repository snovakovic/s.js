///#source 1 1 /s/s.version.js

/*****************************************************
 		s.js v0.22
 ***************************************************/





///#source 1 1 /s/s.utilities.js
/*****************************************************
   Utilities
 ***************************************************/
(function (s, undefined) {

    /**
	* Returns random number using Math.random() between 2 numbers
	* @param from {string} min number
	* @param to {string|regExpresion} max number
	* @example s.random(1, 10); get random number between 1 and 10 (1 and 10 are included)
	*/
    s.random = function (from, to) {
        return Math.floor((Math.random() * to) + from);
    }

    /**
	* Get the parameter from URL by the name
	* @param key {string} the key for which value will be retrieved
	* @example s.getUrlParameter("firstName"); 
	*/
    s.getUrlParameter = function (key) {
        var val = RegExp(key + '=' + '(.+?)(&|$)').exec(location.search) || null;
        if (val === null) return null;

        return decodeURI(val[1]);
    }

})(window.s = window.s || {});
///#source 1 1 /s/s.arr.js

/*****************************************************
	  Array Modification
 ***************************************************/

(function (s, undefined) {

    /**
	 * Loop through any array
	 * @example s.each([1,2,3,4,5,6,7], function(val, i) { console.log(val); } );
	 */
    s.each = function (arr, callback) {
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
    s.iterate = function (l, callback) {
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
	 * @example s.remove( ['a', 'b', 'c', 'd', 'c'], 'c' );
	 */
    s.remove = function (arr, elToRemove, max) {
        var pos;
        if (max && (typeof max !== "number" || max % 1 !== 0))
            throw new Error("Invalid argument exception");

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
    s.shuffle = function (arr) {
        for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    };


    /**
	 * Get the new array filled with default values
	 * @param val {....} default value that will fill the array
	 * @return len {Integer} size of the new array
	 * @example s.getFilledArray(0, 5);
	 */
    s.getFilledArray = function (val, len) {
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
    s.unique = function (originalArr) {
        var arr = [];
        for (var i = 0; i < originalArr.length; i++) {
            if (arr.indexOf(originalArr[i]) === -1) {
                arr.push(originalArr[i]);
            }
        }
        return arr;
    }



})(window.s = window.s || {});
///#source 1 1 /s/s.obj.js
/*****************************************************
	  Array Modification
 ***************************************************/

(function (s, undefined) {

    /**
      * Loop over object properties. 
      * @param arr {Object} object which properties will be looped over
      * @example s.getProperties({prop1:'val1', prop2:'val2'}, function(key, value){console.log(key + ' >> ' + value);});
      */
    s.getProperties = function (obj, callback) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                if (callback(prop, obj[prop]) === false)
                    break;
            }
        }
    }


    /**
     * Shallow merge provided objects
     * In case of the same property value from second object will override the value in the first object
     * @param  {Objects} arbitrary number of objects that we want to merge
     * @example s.merge({prop1:1,prop2:2}, {prop1:0,prop3:3}, {prop4: '4'});
    */
    s.merge = function ( ) {
        var merged = {};
        var _merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    merged[prop] = obj[prop];
                }
            }
        };
        _merge(arguments[0]);
        for (var i = 1; i < arguments.length; i++) {
            _merge(arguments[i]);
        }
        return merged;
    };

    /**
     * Same as merge. But with support for merging nested objects
    */
    s.deepMerge = function ( ) {
        var merged = {};
        var _merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        merged[prop] = s.deepMerge(merged[prop], obj[prop]);
                    }
                    else {
                        merged[prop] = obj[prop];
                    }
                }
            }
        };
        _merge(arguments[0]);
        for (var i = 1; i < arguments.length; i++) {
            _merge(arguments[i]);
        }
        return merged;
    };



})(window.s = window.s || {});





///#source 1 1 /s/s.html.js
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
                if (s.haveClass(elem, selector.substr(1)))
                    return elem;
            }

            // If selector is an ID
            if (firstChar === '#') {
                if (elem.id === selector.substr(1))
                    return elem;
            }

            // If selector is a data attribute
            if (firstChar === '[') {
                if (elem.hasAttribute(selector.substr(1, selector.length - 2)))
                    return elem;
            }

            // If selector is a tag
            if (elem.tagName.toLowerCase() === selector) {
                return elem;
            }

        }

        return false;

    };


})(window.s = window.s || {});

///#source 1 1 /s/s.string.js
/*****************************************************
 			  String Modification.
 ***************************************************/
(function (s, undefined) {

    /**
	 * Replace all occurrences in a string with a new value   
	 * @param  str {String} string where occurrences will be replaced
	 * @param find {String} string that we want to replace with new value    
	 * @param replace {String} new string value which will replace old value   
	 * @return {[string]} new string with replaced values
	 * @example console.log(s.replaceAll("this is old value in old string", "old", "new"))
	*/
    s.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    };

    /**
 	 * String concatenation variation based on .net   
 	 * Don't use in high intensive loops as it is much slower than normal string concatenation         
 	 * @return {[string]} formatted  string
 	 * @example console.log(s.format("Hi {0}, your rank is {1}.", "Foo", 100))
 	 */
    s.format = function () {
        var str = arguments[0],
			 length = arguments.length - 1;
        for (var i = 0; i < length; i++) {
            str = s.replaceAll(str, "{" + i + "}", arguments[i + 1]);
        }
        return str;
    };


})(window.s = window.s || {});
///#source 1 1 /s/s.test.js
/*****************************************************
	  Test Module part
 ***************************************************/
(function (s, undefined) {

    /**
	* Check if variable is initialized
	*/
    s.isDefined = function (testVar) {
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
    s.hasValue = function (testVar) {
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
    s.isString = function (testVar) {
        return typeof testVar === 'string';
    };

    /**
	* Check if variable type is number
	*/
    s.isNumber = function (testVar) {
        return typeof testVar === 'number';
    };

    /**
	* Check if variable type is boolean
	*/
    s.isBoolean = function (testVar) {
        return typeof testVar === 'boolean';
    };

    /**
	* Check if variable type is object
	* variable type of array is also object
	* type for null returns object, but is object will return false for null
	*/
    s.isObject = function (testVar) {
        return typeof testVar === 'object' && testVar != null;
    };

    /**
	* Check if variable is array. 
	*/
    s.isArray = function (testVar) {
        return Array.isArray(testVar);
    };

    /**
	 * Test string using any regular expression or by using any of defined keywords
	 * @param str {string} string that will be tested
	 * @param expr {string|regExpresion} expression can be defined keyword in string format or any regular expression.
	 * @example s.is("test", alphabetic); same as s.is("test", /^[a-zA-Z ]*$/)
	*/
    s.is = function (str, expr) {
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
